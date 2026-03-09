"""
SQL 生成节点
使用模板系统生成 SQL 语句
"""

import json
import logging
import traceback
from datetime import datetime
from typing import Dict, Any, Optional

from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate

from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.template.prompt_builder import PromptBuilder
from agent.text2sql.template.schema_formatter import format_schema_to_m_schema, get_database_engine_info
from common.llm_util import get_llm
from model.db_connection_pool import get_db_pool
from model.datasource_models import Datasource
from services.datasource_service import DatasourceService

logger = logging.getLogger(__name__)

# 用户明确要求「全部数据/导出/不限制条数」时的关键词，命中则生成 SQL 时不强制 LIMIT
_FULL_DATA_OR_EXPORT_KEYWORDS = (
    "不要限制",
    "不限制条数",
    "不要使用限制",
    "无需限制",
    "全部数据",
    "所有数据",
    "所有明细",
    "全部明细",
    "可以导出",
    "需要导出",
    "导出",
    "无限制",
    "不限条数",
    "去掉限制",
)


def _user_wants_full_data_or_export(user_query: str) -> bool:
    """判断用户是否明确要求查看全部数据或导出（不限制条数）。"""
    if not (user_query and user_query.strip()):
        return False
    q = user_query.strip()
    return any(kw in q for kw in _FULL_DATA_OR_EXPORT_KEYWORDS)


def sql_generate(state: AgentState) -> AgentState:
    """
    使用模板系统生成 SQL 语句
    
    Args:
        state: Agent 状态对象
        
    Returns:
        更新后的 state
    """
    try:
        # 获取数据库信息
        db_info = state.get("db_info", {})
        if not db_info:
            logger.error("db_info 为空，无法生成 SQL")
            state["generated_sql"] = "No SQL query generated"
            return state
        
        # 获取数据源信息
        datasource_id = state.get("datasource_id")
        db_type = "mysql"  # 默认类型
        db_name = "database"  # 默认数据库名
        
        if datasource_id:
            try:
                db_pool = get_db_pool()
                with db_pool.get_session() as session:
                    ds = DatasourceService.get_datasource_by_id(session, datasource_id)
                    if ds:
                        db_type = ds.type
                        # 尝试从配置中获取数据库名 / Schema
                        try:
                            from common.datasource_util import DatasourceConfigUtil
                            config = DatasourceConfigUtil.decrypt_config(ds.configuration)
                            database = config.get("database")
                            db_schema = config.get("dbSchema")
                            # 对于需要 Schema 的数据库（如 PostgreSQL），优先使用 dbSchema
                            if db_type in ["pg", "oracle", "sqlServer", "kingbase", "redshift", "dm"] and db_schema:
                                db_name = db_schema
                            else:
                                db_name = database or db_schema or "database"
                        except Exception:
                            pass
            except Exception as e:
                logger.warning(f"获取数据源信息失败: {e}，使用默认值")
        
        # 表关系补充：多表时才拉取全量表信息并补充关联表；单表时直接用 state 中的 db_info 以节省耗时
        if len(db_info) > 1:
            try:
                from agent.text2sql.database.db_service import DatabaseService
                user_id = state.get("user_id")
                db_service = DatabaseService(datasource_id)
                all_table_info = db_service._fetch_all_table_info(user_id=user_id, use_cache=True)
                selected_table_names = list(db_info.keys())
                supplemented_table_names = db_service.supplement_related_tables(
                    selected_table_names,
                    all_table_info
                )
                new_db_info = {}
                for table_name in supplemented_table_names:
                    if table_name in all_table_info:
                        new_db_info[table_name] = all_table_info[table_name]
                    elif table_name in db_info:
                        new_db_info[table_name] = db_info[table_name]
                db_info = new_db_info
                state["db_info"] = db_info
                logger.debug(f"表关系补充完成，当前 db_info 包含 {len(db_info)} 张表")
            except Exception as e:
                logger.warning(f"表关系补充失败: {e}，继续使用原始表列表", exc_info=True)
        
        # 格式化 schema 为 M-Schema 格式（包含补充的关联表）
        schema_str = format_schema_to_m_schema(
            db_info=db_info,
            db_name=db_name,
            db_type=db_type,
        )
        
        logger.debug(f"Schema 格式化完成，包含 {len(db_info)} 张表")
        
        # 获取数据库引擎信息
        engine = get_database_engine_info(db_type)
        
        # 使用 PromptBuilder 构建提示词
        prompt_builder = PromptBuilder()
        
        # RAG 增强检索：检索术语和训练示例（带超时，避免拖慢整体）
        terminologies = ""
        data_training = ""
        try:
            from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError
            RAG_TIMEOUT = int(__import__("os").getenv("SQL_RAG_TIMEOUT", "4"))

            def _do_rag():
                from agent.text2sql.rag.terminology_retriever import retrieve_terminologies
                from agent.text2sql.rag.training_retriever import retrieve_training_examples
                t = retrieve_terminologies(
                    question=state["user_query"],
                    datasource_id=datasource_id,
                    oid=1,
                    top_k=5,
                )
                d = retrieve_training_examples(
                    question=state["user_query"],
                    datasource_id=datasource_id,
                    oid=1,
                    top_k=3,
                )
                return t, d

            with ThreadPoolExecutor(max_workers=1) as ex:
                f = ex.submit(_do_rag)
                terminologies, data_training = f.result(timeout=RAG_TIMEOUT)
        except (FuturesTimeoutError, Exception) as e:
            if "Timeout" in type(e).__name__ or "timeout" in str(e).lower():
                logger.debug("RAG 检索超时，跳过术语与训练示例")
            else:
                logger.warning(f"RAG 检索失败: {e}，使用空字符串")
        
        custom_prompt = ""  # 自定义提示词（暂时为空）
        error_msg = ""  # 错误消息（暂时为空）
        
        # 获取系统提示词和用户提示词
        # 用户明确要求全部数据/导出时不强制 LIMIT，否则默认限制 40 条
        enable_query_limit = not _user_wants_full_data_or_export(state.get("user_query", ""))
        system_prompt, user_prompt = prompt_builder.build_sql_prompt(
            db_type=db_type,
            schema=schema_str,
            question=state["user_query"],
            engine=engine,
            lang="简体中文",
            terminologies=terminologies,
            data_training=data_training,
            custom_prompt=custom_prompt,
            enable_query_limit=enable_query_limit,
            error_msg=error_msg,
            current_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            change_title=False,  # 暂时不生成对话标题
        )
        
        # 构建消息列表
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt),
        ]
        
        # 调用 LLM
        llm = get_llm(0)
        response = llm.invoke(messages)
        
        # 解析响应（JSON 格式）
        response_content = response.content.strip()
        
        # 清理 JSON 字符串（移除可能的 markdown 代码块标记）
        if "```json" in response_content:
            response_content = response_content.split("```json")[1]
        if "```" in response_content:
            response_content = response_content.split("```")[0]
        response_content = response_content.strip()
        
        # 解析 JSON
        import re
        result = None
        try:
            # 先尝试直接解析
            result = json.loads(response_content)
        except json.JSONDecodeError as e:
            # 如果失败，可能是 SQL 字符串中包含了无效的转义序列（如 `\` + 换行符）
            # 尝试修复：将 SQL 字段中的 `\` + 换行符替换为空格
            logger.warning(f"首次 JSON 解析失败: {e}，尝试修复转义序列")
            try:
                # 使用正则表达式匹配 "sql": "..." 字段并修复其中的转义问题
                def fix_sql_field(match):
                    """修复 SQL 字段中的无效转义序列"""
                    prefix = match.group(1)  # "sql": "
                    sql_content = match.group(2)  # SQL 内容
                    suffix = match.group(3)  # "
                    
                    # 将 `\` + 换行符 + 空白字符替换为单个空格
                    # 这修复了 LLM 使用 `\` 作为行继续符的问题
                    # 注意：不转义双引号，因为 JSON 解析器会处理已转义的双引号
                    fixed_sql = re.sub(r'\\\s*\n\s*', ' ', sql_content)
                    
                    return f'{prefix}{fixed_sql}{suffix}'
                
                # 匹配 "sql": "..." 字段（支持多行）
                fixed_content = re.sub(
                    r'("sql"\s*:\s*")(.*?)(")',
                    fix_sql_field,
                    response_content,
                    flags=re.DOTALL
                )
                
                result = json.loads(fixed_content)
                logger.info("通过修复转义序列成功解析 JSON")
            except (json.JSONDecodeError, Exception) as e2:
                # 如果修复后仍然失败，记录错误并尝试备用方法
                logger.error(f"修复转义序列后仍然失败: {e2}")
                # 尝试使用正则表达式提取 JSON 对象
                try:
                    json_match = re.search(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', response_content, re.DOTALL)
                    if json_match:
                        # 对提取的 JSON 再次尝试修复
                        extracted_json = json_match.group(0)
                        def fix_extracted_sql(m):
                            prefix = m.group(1)
                            sql_content = m.group(2)
                            suffix = m.group(3)
                            # 将 `\` + 换行符 + 空白字符替换为单个空格
                            fixed_sql = re.sub(r'\\\s*\n\s*', ' ', sql_content, flags=re.MULTILINE)
                            return f'{prefix}{fixed_sql}{suffix}'
                        
                        fixed_extracted = re.sub(
                            r'("sql"\s*:\s*")(.*?)(")',
                            fix_extracted_sql,
                            extracted_json,
                            flags=re.DOTALL
                        )
                        result = json.loads(fixed_extracted)
                        logger.info("通过提取并修复 JSON 对象成功解析")
                    else:
                        raise e2
                except Exception as e3:
                    logger.error(f"所有解析尝试都失败: {e3}")
                    result = None
        
        # 处理解析结果
        if result and result.get("success", True):
            # 成功生成 SQL
            sql = result.get("sql", "")
            # 处理 SQL 中的转义字符（如 \n, \t 等）
            if isinstance(sql, str):
                # json.loads 已经处理了转义字符，但如果 SQL 中包含字面量 \n，需要额外处理
                # 这里直接使用解析后的字符串即可，因为 json.loads 已经正确处理了转义
                state["generated_sql"] = sql
            else:
                state["generated_sql"] = str(sql) if sql else ""
            
            chart_type = result.get("chart-type", result.get("chart_type", "table"))
            state["chart_type"] = chart_type
            
            # 保存使用的表名（如果模板返回了 tables 字段）
            if "tables" in result:
                tables = result.get("tables", [])
                if isinstance(tables, list):
                    # 保存到 state 中，以备后用（例如用于权限过滤、日志记录等）
                    state["used_tables"] = tables
                    logger.info(f"SQL 使用的表: {tables}")
        elif result:
            # 生成失败（success 为 false）
            error_message = result.get("message", "无法生成 SQL")
            logger.warning(f"SQL 生成失败: {error_message}")
            state["generated_sql"] = "No SQL query generated"
            state["chart_type"] = None
        else:
            # 解析完全失败
            logger.error(f"解析 LLM 响应 JSON 失败，响应内容: {response_content[:500]}")
            state["generated_sql"] = "No SQL query generated"
            state["chart_type"] = None

    except Exception as e:
        traceback.print_exception(e)
        logger.error(f"SQL 生成过程中发生错误: {e}", exc_info=True)
        state["generated_sql"] = "No SQL query generated"
        state["chart_type"] = None

    return state
