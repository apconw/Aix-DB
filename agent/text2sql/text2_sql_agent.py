import asyncio
import json
import logging
from typing import Dict, Any, Optional

from langgraph.graph.state import CompiledStateGraph

from agent.text2sql.analysis.graph import create_graph
from agent.text2sql.state.agent_state import AgentState
from constants.code_enum import DataTypeEnum, DiFyAppEnum
from services.user_service import add_user_record

logger = logging.getLogger(__name__)


class Text2SqlAgent:
    """
    文本语言转SQL代理
    """

    def __init__(self):
        pass

    async def run_agent(
        self, query: str, response=None, chat_id: str = None, uuid_str: str = None, user_token=None
    ) -> None:
        """
        运行智能体，支持多轮对话记忆
        :param query: 用户输入
        :param response: 响应对象
        :param chat_id: 会话ID，用于区分同一轮对话
        :param uuid_str: 自定义ID，用于唯一标识一次问答
        :param user_token: 用户登录的token
        "summarize", "data_render", "data_render_apache" 节点数据正常显示不包裹在<details>中
        :return: None
        """
        t02_answer_data = []
        t04_answer_data = {}
        current_step = None

        try:
            initial_state = AgentState(user_query=query, attempts=0, correct_attempts=0)
            graph: CompiledStateGraph = create_graph()

            # async for chunk in graph.astream(initial_state, stream_mode="values"):
            #
            #     # if metadata["langgraph_node"] == "tools":
            #     #     tool_name = message_chunk.name or "未知工具"
            #     #     # logger.info(f"工具调用结果:{message_chunk.content}")
            #     #     tool_use = "> 调用工具:" + tool_name + "\n\n"
            #     #     await response.write(self._create_response(tool_use))
            #     #     t02_answer_data.append(tool_use)
            #     #     continue
            #     print(chunk)
            #     # if chunk.content:
            #     #     logger.info(f"chuck>{chunk}")
            #     #     logger.info(f"metadata>{metadata}")
            #     #     await response.write(self._create_response(chunk.content))
            #     #     if hasattr(response, "flush"):
            #     #         await response.flush()
            #     #     await asyncio.sleep(0)

            async for chunk_dict in graph.astream(initial_state, stream_mode="updates"):
                logger.info(f"Processing chunk: {chunk_dict}")

                langgraph_step, step_value = next(iter(chunk_dict.items()))

                # 处理步骤变更
                current_step, t02_answer_data = await self._handle_step_change(
                    response, current_step, langgraph_step, t02_answer_data
                )

                # 处理具体步骤内容
                if step_value:
                    await self._process_step_content(
                        response, langgraph_step, step_value, t02_answer_data, t04_answer_data
                    )

            # 流结束时关闭最后的details标签
            if current_step is not None and current_step not in ["summarize", "data_render", "data_render_apache"]:
                await self._close_current_step(response, t02_answer_data)

            # 保存用户记录
            await add_user_record(
                uuid_str, chat_id, query, t02_answer_data, t04_answer_data, DiFyAppEnum.DATABASE_QA.value[0], user_token
            )

        except Exception as e:
            logger.error(f"Error in run_agent: {str(e)}", exc_info=True)
            error_msg = f"处理过程中发生错误: {str(e)}"
            await self._send_response(response, error_msg, "error")

    async def _handle_step_change(
        self,
        response,
        current_step: Optional[str],
        new_step: str,
        t02_answer_data: list,
    ) -> tuple:
        """
        处理步骤变更
        """
        if new_step != current_step:
            # 如果之前有打开的步骤，先关闭它
            if current_step is not None and current_step not in ["summarize", "data_render", "data_render_apache"]:
                await self._close_current_step(response, t02_answer_data)

            # 打开新的步骤 (除了 summarize 和 data_render)
            if new_step not in ["summarize", "data_render", "data_render_apache"]:
                think_html = f"""<details style="color:gray;background-color: #f8f8f8;padding: 2px;border-radius: 
                6px;margin-top:5px;" open>
                             <summary>{new_step}...</summary>"""
                await self._send_response(response, think_html, "continue", "t02")
                t02_answer_data.append(think_html)

        return new_step, t02_answer_data

    async def _close_current_step(self, response, t02_answer_data: list) -> None:
        """
        关闭当前步骤的details标签
        """
        close_tag = "</details>\n\n"
        await self._send_response(response, close_tag, "continue", "t02")
        t02_answer_data.append(close_tag)

    async def _process_step_content(
        self,
        response,
        step_name: str,
        step_value: Dict[str, Any],
        t02_answer_data: list,
        t04_answer_data: Dict[str, Any],
    ) -> None:
        """
        处理各个步骤的内容
        """
        content_map = {
            "schema_inspector": lambda: f"共检索{len(step_value['db_info'])}张表.",
            "llm_reasoning": lambda: step_value["sql_reasoning"],
            "sql_generator": lambda: step_value["generated_sql"],
            "sql_executor": lambda: "执行sql语句成功",
            "summarize": lambda: step_value["report_summary"],
            "data_render": lambda: step_value["chart_url"],
            "data_render_apache": lambda: step_value["apache_chart_data"],
        }

        if step_name in content_map:
            content = content_map[step_name]()
            if step_name == "data_render":
                content = "\n---\n" + content

            # 适配EChart表格
            data_type = (
                DataTypeEnum.ANSWER.value[0] if step_name != "data_render_apache" else DataTypeEnum.BUS_DATA.value[0]
            )

            await self._send_response(response=response, content=content, data_type=data_type)

            if data_type == DataTypeEnum.ANSWER.value[0]:
                t02_answer_data.append(content)

            # 这里设置 Apache 表格数据
            if step_name == "data_render_apache" and data_type == DataTypeEnum.BUS_DATA.value[0]:
                t04_answer_data.clear()
                t04_answer_data.update({"data": step_value["apache_chart_data"], "dataType": data_type})

            # 对于非渲染步骤，刷新响应
            if step_name not in ["data_render", "data_render_apache"]:
                if hasattr(response, "flush"):
                    await response.flush()
                await asyncio.sleep(0)

    @staticmethod
    async def _send_response(
        response, content: str, message_type: str = "continue", data_type: str = DataTypeEnum.ANSWER.value[0]
    ) -> None:
        """
        发送响应数据
        """
        if response:
            if data_type == DataTypeEnum.ANSWER.value[0]:
                formatted_message = {
                    "data": {
                        "messageType": message_type,
                        "content": content,
                    },
                    "dataType": data_type,
                }
            else:
                # 适配EChart表格
                formatted_message = {"data": content, "dataType": data_type}

            await response.write("data:" + json.dumps(formatted_message, ensure_ascii=False) + "\n\n")

    @staticmethod
    def _create_response(
        content: str, message_type: str = "continue", data_type: str = DataTypeEnum.ANSWER.value[0]
    ) -> str:
        """
        封装响应结构（保持向后兼容）
        """
        res = {
            "data": {"messageType": message_type, "content": content},
            "dataType": data_type,
        }
        return "data:" + json.dumps(res, ensure_ascii=False) + "\n\n"
