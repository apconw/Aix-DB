import asyncio
import json
import logging
import os
import traceback
from typing import Optional, Dict, Any

from langgraph.graph.state import CompiledStateGraph

from agent.excel.excel_agent_state import ExcelAgentState
from agent.excel.excel_graph import create_excel_graph
from constants.code_enum import DataTypeEnum
from services.user_service import decode_jwt_token, add_user_record, query_user_qa_record

logger = logging.getLogger(__name__)


class ExcelAgent:
    """
    表格问答智能体
    """

    def __init__(self):
        # 存储运行中的任务
        self.running_tasks = {}
        # 获取环境变量控制是否显示思考过程，默认为开启
        self.show_thinking_process = os.getenv("SHOW_THINKING_PROCESS", "true").lower() == "true"

    async def run_excel_agent(
        self,
        query: str,
        response=None,
        chat_id: str = None,
        uuid_str: str = None,
        user_token=None,
        file_list: list = None,
    ) -> None:
        """
        运行表格智能体
        :param query:
        :param response:
        :param chat_id:
        :param uuid_str:
        :param user_token:
        :param file_list
        :return:
        """
        t02_answer_data = []
        t04_answer_data = {}
        current_step = None

        # 实现上传一次多次对话的效果 默认单轮对话取最新上传的文件
        if file_list is None:
            user_qa_record = query_user_qa_record(chat_id)[0]
            if user_qa_record:
                file_list = json.loads(user_qa_record["file_key"])
        try:
            initial_state = ExcelAgentState(
                user_query=query,
                file_list=file_list,
                db_info="",
                generated_sql="",
                chart_url="",
                chart_type="",
                apache_chart_data={},
                execution_result=[],
                report_summary="",
            )
            graph: CompiledStateGraph = create_excel_graph()

            # 获取用户信息 标识对话状态
            user_dict = await decode_jwt_token(user_token)
            task_id = user_dict["id"]
            task_context = {"cancelled": False}
            self.running_tasks[task_id] = task_context

            async for chunk_dict in graph.astream(initial_state, stream_mode="updates"):
                # 检查是否已取消
                if self.running_tasks[task_id]["cancelled"]:
                    if self.show_thinking_process:
                        await self._send_response(response, "</details>\n\n", "continue", DataTypeEnum.ANSWER.value[0])
                    await response.write(
                        self._create_response("\n> 这条消息已停止", "info", DataTypeEnum.ANSWER.value[0])
                    )
                    # 发送最终停止确认消息
                    await response.write(self._create_response("", "end", DataTypeEnum.STREAM_END.value[0]))
                    break

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
            if self.show_thinking_process:
                if current_step is not None and current_step not in ["summarize", "data_render", "data_render_apache"]:
                    await self._close_current_step(response, t02_answer_data)

            # 只有在未取消的情况下才保存记录
            if not self.running_tasks[task_id]["cancelled"]:
                await add_user_record(
                    uuid_str,
                    chat_id,
                    query,
                    t02_answer_data,
                    t04_answer_data,
                    "FILEDATA_QA",
                    user_token,
                    file_list,
                )

        except asyncio.CancelledError:
            await response.write(self._create_response("\n> 这条消息已停止", "info", DataTypeEnum.ANSWER.value[0]))
            await response.write(self._create_response("", "end", DataTypeEnum.STREAM_END.value[0]))
        except Exception as e:
            traceback.print_exception(e)
            logger.error(f"表格问答智能体运行异常: {e}")
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
        if self.show_thinking_process:
            if new_step != current_step:
                # 如果之前有打开的步骤，先关闭它
                if current_step is not None and current_step not in ["summarize", "data_render", "data_render_apache"]:
                    await self._close_current_step(response, t02_answer_data)

                # 打开新的步骤 (除了 summarize 和 data_render) think_html 标签里面添加open属性控制思考过程是否默认展开显示
                if new_step not in ["summarize", "data_render", "data_render_apache"]:
                    think_html = f"""<details style="color:gray;background-color: #f8f8f8;padding: 2px;border-radius: 
                    6px;margin-top:5px;">
                                 <summary>{new_step}...</summary>"""
                    await self._send_response(response, think_html, "continue", "t02")
                    t02_answer_data.append(think_html)
        else:
            # 如果不显示思考过程，则只处理特定的步骤
            if new_step in ["summarize", "data_render", "data_render_apache"]:
                # 对于需要显示的步骤，确保之前的步骤已关闭
                if current_step is not None and current_step not in ["summarize", "data_render", "data_render_apache"]:
                    pass  # 不需要关闭details标签，因为我们根本没有打开它

        return new_step, t02_answer_data

    async def _close_current_step(self, response, t02_answer_data: list) -> None:
        """
        关闭当前步骤的details标签
        """
        if self.show_thinking_process:
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
            "excel_parsing": lambda: self._format_table_columns_info(step_value),
            "sql_generator": lambda: step_value["generated_sql"],
            "sql_executor": lambda: "执行sql语句成功" if step_value["execution_result"].success else "执行sql语句失败",
            "summarize": lambda: step_value.get("report_summary", ""),
            "data_render": lambda: step_value.get("chart_url", ""),
            "data_render_apache": lambda: step_value.get("apache_chart_data", {}),
        }

        if step_name in content_map:
            content = content_map[step_name]()
            if step_name == "data_render":
                content = "\n---\n" + content

            # 适配EChart表格
            data_type = (
                DataTypeEnum.ANSWER.value[0] if step_name != "data_render_apache" else DataTypeEnum.BUS_DATA.value[0]
            )

            # 根据环境变量决定是否发送非关键步骤的内容
            should_send = self.show_thinking_process or step_name in ["summarize", "data_render", "data_render_apache"]

            if should_send:
                await self._send_response(response=response, content=content, data_type=data_type)

                if data_type == DataTypeEnum.ANSWER.value[0]:
                    t02_answer_data.append(content)

            # 这里设置 Apache 表格数据
            if step_name == "data_render_apache" and data_type == DataTypeEnum.BUS_DATA.value[0]:
                t04_answer_data.clear()
                t04_answer_data.update({"data": step_value.get("apache_chart_data", {}), "dataType": data_type})

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

    async def cancel_task(self, task_id: str) -> bool:
        """
        取消指定的任务
        :param task_id: 任务ID
        :return: 是否成功取消
        """
        if task_id in self.running_tasks:
            self.running_tasks[task_id]["cancelled"] = True
            return True
        return False

    @staticmethod
    def _format_table_columns_info(db_info: Dict[str, Any]) -> str:
        """
        格式化表格列信息为HTML details标签格式
        :param db_info: 数据库信息字典
        :return: 格式化后的HTML字符串
        """
        db_info = db_info["db_info"]
        if not db_info or "columns" not in db_info:
            return ""

        columns_info = db_info["columns"]

        html_content = """
        <ul>
        """
        for column_name, column_details in columns_info.items():
            comment = column_details.get("comment", column_name)
            type_ = column_details.get("type", "未知")
            html_content += f"<li><strong>{column_name}</strong>: {comment} (类型: {type_})</li>\n"

        html_content += """</ul>"""

        return html_content
