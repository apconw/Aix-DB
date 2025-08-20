import asyncio
import json
import logging
import traceback

from agent.text2sql.analysis.data_render import data_render
from agent.text2sql.analysis.graph import create_graph
from agent.text2sql.state.agent_state import AgentState
from langgraph.graph.state import CompiledStateGraph

from constants.code_enum import DataTypeEnum

logger = logging.getLogger(__name__)


class Text2SqlAgent:
    """
    文本语言转sql
    """

    def __init__(self):
        pass

    async def run_agent(self, text, response):
        """
        :param text:
        :param response:
        :return:
        """
        try:
            initial_state = AgentState(user_query=text, attempts=0, correct_attempts=0)
            graph: CompiledStateGraph = create_graph()
            # for chunk, metadata in graph.stream(initial_state, stream_mode="messages"):
            #     if chunk.content:
            #         logger.info(f"metadata->: {metadata}")
            #         logger.info(f"chunk->: {chunk.content}")
            #         await response.write(self._create_response(chunk.content))
            #         if hasattr(response, "flush"):
            #             await response.flush()
            #         await asyncio.sleep(0)
            final_state = graph.invoke(input=initial_state, stream_mode="values")
            print(final_state)
            char_url = await data_render(final_state["execution_result"], final_state["char_type"])
            # await response.write(self._create_response(final_state["sql_reasoning"]))
            await response.write(self._create_response(char_url))
            # if hasattr(response, "flush"):
            #     await response.flush()
            # await asyncio.sleep(0)
        except Exception as e:
            traceback.print_exception(e)
            error_msg = f"处理过程中发生错误: {str(e)}"
            await response.write(self._create_response(error_msg, "error"))
            if hasattr(response, "flush"):
                await response.flush()

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
