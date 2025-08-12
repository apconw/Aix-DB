import json
import os
import traceback
from typing import Optional

from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.messages.utils import trim_messages
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.prebuilt import create_react_agent

from constants.code_enum import DataTypeEnum
from services.user_service import add_user_record


class LangGraphReactAgent:
    """
    基于LangGraph的React智能体，支持多轮对话记忆
    """

    def __init__(self):
        # 校验并获取环境变量
        required_env_vars = ["MODEL_NAME", "MODEL_TEMPERATURE", "MODEL_BASE_URL", "MODEL_API_KEY", "MCP_HUB_URL"]
        for var in required_env_vars:
            if not os.getenv(var):
                raise ValueError(f"Missing required environment variable: {var}")

        self.llm = init_chat_model(
            model=os.getenv("MODEL_NAME"),
            temperature=float(os.getenv("MODEL_TEMPERATURE", 0.75)),
            base_url=os.getenv("MODEL_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1"),
            api_key=os.getenv("MODEL_API_KEY"),
        )

        # 使用 os.path 构建路径
        # current_dir = os.path.dirname(os.path.abspath(__file__))
        # mcp_tool_path = os.path.join(current_dir, "query_db_tool.py")
        self.client = MultiServerMCPClient(
            {
                "mcp-hub": {
                    "url": os.getenv("MCP_HUB_URL"),
                    "transport": "streamable_http",
                },
                # "query_qa_record": {
                #     "command": "python",
                #     "args": [mcp_tool_path],
                #     "transport": "stdio",
                # },
                # "undoom-douyin-data-analysis": {
                #     "command": "uvx",
                #     "transport": "stdio",
                #     "args": [
                #         "--index-url",
                #         "https://mirrors.aliyun.com/pypi/simple/",
                #         "--from",
                #         "undoom-douyin-data-analysis",
                #         "undoom-douyin-mcp",
                #     ],
                # },
            }
        )

        # 全局checkpointer用于持久化所有用户的对话状态
        self.checkpointer = InMemorySaver()

    @staticmethod
    def _create_response(
        content: str, message_type: str = "continue", data_type: str = DataTypeEnum.ANSWER.value[0]
    ) -> str:
        """封装响应结构"""
        res = {
            "data": {"messageType": message_type, "content": content},
            "dataType": data_type,
        }
        return "data:" + json.dumps(res, ensure_ascii=False) + "\n\n"

    @staticmethod
    def short_trim_messages(state):
        """
        模型调用前的消息清理的钩子函数
        短期记忆：限制模型调用前的消息数量，只保留最近的若干条消息
        :param state: 状态对象，包含对话消息
        :return: 修剪后的消息列表
        """
        trimmed_messages = trim_messages(
            messages=state["messages"],
            max_tokens=20000,  # 设置更合理的token限制（根据模型上下文窗口调整）
            token_counter=lambda messages: sum(len(msg.content or "") for msg in messages),  # 更准确的token计算方式
            strategy="last",  # 保留最新的消息
            allow_partial=False,
            start_on="human",  # 确保从人类消息开始
            include_system=True,  # 包含系统消息
            text_splitter=None,  # 不使用文本分割器
        )
        return {"llm_input_messages": trimmed_messages}

    async def run_agent(
        self, query: str, response, session_id: Optional[str] = None, uuid_str: str = None, user_token=None
    ):
        """
        运行智能体，支持多轮对话记忆
        :param query: 用户输入
        :param response: 响应对象
        :param session_id: 会话ID，用于区分同一轮对话
        :param uuid_str: 自定义ID，用于唯一标识一次问答
        :param user_token:
        :return:
        """
        try:
            t02_answer_data = []

            tools = await self.client.get_tools()

            # 使用用户会话ID作为thread_id，如果未提供则使用默认值
            thread_id = session_id if session_id else "default_thread"
            config = {"configurable": {"thread_id": thread_id}}

            system_message = SystemMessage(content="""You are an advanced AI assistant""")

            agent = create_react_agent(
                model=self.llm,
                tools=tools,
                prompt=system_message,
                checkpointer=self.checkpointer,  # 使用全局checkpointer
                pre_model_hook=self.short_trim_messages,
            )

            async for message_chunk, metadata in agent.astream(
                input={"messages": [HumanMessage(content=query)]},
                config=config,
                stream_mode="messages",
            ):
                # 工具输出
                if metadata["langgraph_node"] == "tools":
                    tool_name = message_chunk.name or "未知工具"
                    tool_use = "> 调用工具:" + tool_name + "\n\n"
                    await response.write(self._create_response(tool_use))
                    t02_answer_data.append(tool_use)
                    continue

                # await response.write(self._create_response(agent.get_graph().draw_mermaid_png()))
                # 输出最终结果
                # print(message_chunk)
                if message_chunk.content:
                    content = message_chunk.content
                    t02_answer_data.append(content)
                    await response.write(self._create_response(content))

            await add_user_record(
                uuid_str, session_id, query, t02_answer_data, DataTypeEnum.ANSWER.value[0], user_token
            )
        except Exception as e:
            print(f"[ERROR] Agent运行异常: {e}")
            traceback.print_exception(e)
            await response.write(self._create_response("[ERROR] 智能体运行异常", "error", DataTypeEnum.ANSWER.value[0]))
