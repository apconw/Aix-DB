import logging
import os
from datetime import datetime, date
import json
import re
from decimal import Decimal

from langchain_core.messages import SystemMessage, HumanMessage

from common.llm_util import get_llm
from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.template.prompt_builder import PromptBuilder

logger = logging.getLogger(__name__)

# 总结时最多带入的数据行数，避免 prompt 过大拖慢 LLM（可配置）
SUMMARIZE_MAX_ROWS = int(os.getenv("SUMMARIZE_MAX_ROWS", "25"))
# 总结时数据 JSON 最大字符数，超出则截断并注明（可配置）
SUMMARIZE_MAX_CHARS = int(os.getenv("SUMMARIZE_MAX_CHARS", "12000"))
"""
大模型数据总结节点
"""


class DecimalEncoder(json.JSONEncoder):
    """自定义JSON编码器，处理Decimal和其他不可序列化类型"""
    def default(self, obj):
        if isinstance(obj, Decimal):
            # 将Decimal转换为float，保持数值精度
            return float(obj)
        elif isinstance(obj, (date, datetime)):
            # 处理日期时间类型
            return obj.isoformat()
        return super().default(obj)


def remove_code_block_markers(text: str) -> str:
    """
    去除文本中的代码块标记（```）
    
    Args:
        text: 可能包含代码块标记的文本
        
    Returns:
        去除代码块标记后的纯文本
    """
    if not text:
        return text
    
    # 去除开头的代码块标记（可能包含语言标识符，如 ```markdown, ```python 等）
    text = re.sub(r'^```[\w]*\n?', '', text, flags=re.MULTILINE)
    # 去除结尾的代码块标记
    text = re.sub(r'\n?```$', '', text, flags=re.MULTILINE)
    # 去除首尾空白字符
    text = text.strip()
    
    return text


def summarize(state: AgentState):
    """
    使用模板系统构建提示词并调用LLM进行数据总结
    
    Args:
        state: AgentState 包含 execution_result 和 user_query
        
    Returns:
        更新后的 state，包含 report_summary
    """
    llm = get_llm()
    prompt_builder = PromptBuilder()

    try:
        # 获取数据结果，限制行数与长度以加快 LLM 总结
        data_result = state["execution_result"].data
        if isinstance(data_result, list) and len(data_result) > SUMMARIZE_MAX_ROWS:
            data_result = data_result[:SUMMARIZE_MAX_ROWS]
        if isinstance(data_result, (dict, list)):
            data_result_str = json.dumps(data_result, ensure_ascii=False, indent=2, cls=DecimalEncoder)
        else:
            data_result_str = str(data_result)
        if len(data_result_str) > SUMMARIZE_MAX_CHARS:
            data_result_str = data_result_str[:SUMMARIZE_MAX_CHARS] + "\n\n...（数据已截断，仅展示前一部分供总结）"
        
        # 获取当前时间
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # 从模板中获取系统提示词和用户提示词
        summarizer_template = prompt_builder.base_template['template']['summarizer']
        system_prompt = summarizer_template['system']
        user_prompt = summarizer_template['user'].format(
            data_result=data_result_str,
            user_query=state["user_query"],
            current_time=current_time,
        )
        
        # 构建消息列表
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt),
        ]
        
        # 调用 LLM
        response = llm.invoke(messages)
        # 去除代码块标记，返回纯文本
        state["report_summary"] = remove_code_block_markers(response.content)

    except Exception as e:
        logger.error(f"Error in Summarizer: {e}", exc_info=True)
        state["report_summary"] = "数据总结生成失败，请稍后重试"

    return state
