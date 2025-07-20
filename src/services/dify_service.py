import json
import logging
import os
import re
import traceback

import aiohttp
import requests

from common.exception import MyException
from constants.code_enum import (
    DiFyAppEnum,
    DataTypeEnum,
    DiFyCodeEnum,
    SysCodeEnum,
***REMOVED***
from constants.dify_rest_api import DiFyRestApi
from services.db_qadata_process import process
from services.user_service import add_question_record, query_user_qa_record

logger = logging.getLogger(__name__***REMOVED***


class QaContext:
    """问答上下文信息"""

    def __init__(self, token, question, chat_id***REMOVED***:
        self.token = token
        self.question = question
        self.chat_id = chat_id


class DiFyRequest:
    """
    DiFy操作服务类
    """

    def __init__(self***REMOVED***:
        pass

    async def exec_query(self, res***REMOVED***:
        """

        :return:
        """
        try:
            # 获取请求体内容 从res流对象获取request-body
            req_body_content = res.request.body
            # 将字节流解码为字符串
            body_str = req_body_content.decode("utf-8"***REMOVED***

            req_obj = json.loads(body_str***REMOVED***
            logging.info(f"query param: {body_str***REMOVED***"***REMOVED***

            # str(uuid.uuid4(***REMOVED******REMOVED***
            chat_id = req_obj.get("chat_id"***REMOVED***
            qa_type = req_obj.get("qa_type"***REMOVED***
            # 自定义id
            uuid_str = req_obj.get("uuid"***REMOVED***

            #  使用正则表达式移除所有空白字符（包括空格、制表符、换行符等）
            query = req_obj.get("query"***REMOVED***
            cleaned_query = re.sub(r"\s+", "", query***REMOVED***

            # 获取登录用户信息
            token = res.request.headers.get("Authorization"***REMOVED***
            if not token:
                raise MyException(SysCodeEnum.c_401***REMOVED***
            if token.startswith("Bearer "***REMOVED***:
                token = token.split(" "***REMOVED***[1]

            # 封装问答上下文信息
            qa_context = QaContext(token, cleaned_query, chat_id***REMOVED***

            # 判断请求类别
            app_key = self._get_authorization_token(qa_type***REMOVED***

            # 构建请求参数
            dify_service_url, body_params, headers = self._build_request(chat_id, cleaned_query, app_key, qa_type***REMOVED***

            # 收集流式输出结果
            t02_answer_data = []
            # 收集业务数据流式输出结果
            t04_answer_data = {***REMOVED***

            async with aiohttp.ClientSession(read_bufsize=1024 * 16***REMOVED*** as session:
                async with session.post(
                    dify_service_url,
                    headers=headers,
                    json=body_params,
                    timeout=aiohttp.ClientTimeout(total=60 * 2***REMOVED***,  # 等待2分钟超时
                ***REMOVED*** as response:
                    logging.info(f"dify response status: {response.status***REMOVED***"***REMOVED***
                    if response.status == 200:
                        # await self.res_begin(res, chat_id***REMOVED***
                        data_type = ""
                        bus_data = ""
                        while True:
                            reader = response.content
                            reader._high_water = 10 * 1024 * 1024  # 设置为10MB
                            chunk = await reader.readline(***REMOVED***
                            if not chunk:
                                break
                            str_chunk = chunk.decode("utf-8"***REMOVED***
                            # print(str_chunk***REMOVED***
                            if str_chunk.startswith("data"***REMOVED***:
                                str_data = str_chunk[5:]
                                data_json = json.loads(str_data***REMOVED***
                                event_name = data_json.get("event"***REMOVED***
                                conversation_id = data_json.get("conversation_id"***REMOVED***
                                message_id = data_json.get("message_id"***REMOVED***
                                task_id = data_json.get("task_id"***REMOVED***

                                if DiFyCodeEnum.MESSAGE.value[0] == event_name:
                                    answer = data_json.get("answer"***REMOVED***
                                    if answer and answer.startswith("dify_"***REMOVED***:
                                        event_list = answer.split("_"***REMOVED***
                                        if event_list[1] == "0":
                                            # 输出开始
                                            data_type = event_list[2]
                                            if data_type == DataTypeEnum.ANSWER.value[0]:
                                                await self.send_message(
                                                    res,
                                                  ***REMOVED***"data": {"messageType": "begin"***REMOVED***, "dataType": data_type***REMOVED***,
                                                ***REMOVED***
                                        elif event_list[1] == "1":
                                            # 输出结束
                                            data_type = event_list[2]
                                            if data_type == DataTypeEnum.ANSWER.value[0]:
                                                await self.send_message(
                                                    res,
                                                  ***REMOVED***"data": {"messageType": "end"***REMOVED***, "dataType": data_type***REMOVED***,
                                                ***REMOVED***

                                            # 输出业务数据
                                            elif bus_data and data_type == DataTypeEnum.BUS_DATA.value[0]:
                                                res_data = process(json.loads(bus_data***REMOVED***["data"]***REMOVED***
                                                await self.send_message(
                                                    res,
                                                  ***REMOVED***"data": res_data, "dataType": data_type***REMOVED***,
                                                ***REMOVED***
                                                t04_answer_data = {"data": res_data, "dataType": data_type***REMOVED***

                                            data_type = ""

                                    elif len(data_type***REMOVED*** > 0:
                                        # 这里输出 t02之间的内容
                                        if data_type == DataTypeEnum.ANSWER.value[0]:
                                            await self.send_message(
                                                res,
                                              ***REMOVED***"data": {"messageType": "continue", "content": answer***REMOVED***, "dataType": data_type, "task_id": task_id***REMOVED***,
                                            ***REMOVED***

                                            t02_answer_data.append(answer***REMOVED***

                                        # 这里设置业务数据
                                        if data_type == DataTypeEnum.BUS_DATA.value[0]:
                                            bus_data = answer

                                elif DiFyCodeEnum.MESSAGE_ERROR.value[0] == event_name:
                                    # 输出异常情况日志
                                    error_msg = data_json.get("message"***REMOVED***
                                    logging.error(f"Error 调用dify失败错误信息: {data_json***REMOVED***"***REMOVED***
                                    await res.write(
                                        "data:"
                                        + json.dumps(
                                          ***REMOVED***
                                                "data": {"messageType": "error", "content": "调用失败请查看dify日志,错误信息: " + error_msg***REMOVED***,
                                                "dataType": DataTypeEnum.ANSWER.value[0],
                                            ***REMOVED***,
                                            ensure_ascii=False,
                                        ***REMOVED***
                                        + "\n\n"
                                    ***REMOVED***

                                elif DiFyCodeEnum.MESSAGE_END.value[0] == event_name:
                                    t02_message_json = {
                                        "data": {"messageType": "continue", "content": "".join(t02_answer_data***REMOVED******REMOVED***,
                                        "dataType": DataTypeEnum.ANSWER.value[0],
                                    ***REMOVED***

                                    if t02_message_json:
                                        await self._save_message(
                                            t02_message_json, qa_context, conversation_id, message_id, task_id, qa_type, uuid_str
                                        ***REMOVED***
                                    if t04_answer_data:
                                        await self._save_message(t04_answer_data, qa_context, conversation_id, message_id, task_id, qa_type, uuid_str***REMOVED***

                                    t02_answer_data = []
                                    t04_answer_data = {***REMOVED***

        except Exception as e:
            logging.error(f"Error during get_answer: {e***REMOVED***"***REMOVED***
            traceback.print_exception(e***REMOVED***
        ***REMOVED***"error": str(e***REMOVED******REMOVED***  # 返回错误信息作为字典
        finally:
            await self.res_end(res***REMOVED***

    @staticmethod
    async def _save_message(message, qa_context, conversation_id, message_id, task_id, qa_type, uuid_str***REMOVED***:
        """
            保存消息记录并发送SSE数据
        :param message:
        :param qa_context:
        :param conversation_id:
        :param message_id:
        :param task_id:
        :param qa_type:
        :return:
        """
        # 保存用户问答记录 1.保存用户问题 2.保存用户答案 t02 和 t04
        if "content" in message["data"]:
            await add_question_record(
                uuid_str, qa_context.token, conversation_id, message_id, task_id, qa_context.chat_id, qa_context.question, message, "", qa_type
            ***REMOVED***
        elif message["dataType"] == DataTypeEnum.BUS_DATA.value[0]:
            await add_question_record(
                uuid_str, qa_context.token, conversation_id, message_id, task_id, qa_context.chat_id, qa_context.question, "", message, qa_type
            ***REMOVED***

    @staticmethod
    async def send_message(response, message***REMOVED***:
        """
        SSE 格式发送数据，每一行以 data: 开头
        #"""
        await response.write("data:" + json.dumps(message, ensure_ascii=False***REMOVED*** + "\n\n"***REMOVED***

    @staticmethod
    async def res_begin(res, chat_id***REMOVED***:
        """

        :param res:
        :param chat_id:
        :return:
        """
        await res.write(
            "data:"
            + json.dumps(
              ***REMOVED***
                    "data": {"id": chat_id***REMOVED***,
                    "dataType": DataTypeEnum.TASK_ID.value[0],
                ***REMOVED***
            ***REMOVED***
            + "\n\n"
        ***REMOVED***

    @staticmethod
    async def res_end(res***REMOVED***:
        """
        :param res:
        :return:
        """
        await res.write(
            "data:"
            + json.dumps(
              ***REMOVED***
                    "data": "DONE",
                    "dataType": DataTypeEnum.STREAM_END.value[0],
                ***REMOVED***
            ***REMOVED***
            + "\n\n"
        ***REMOVED***

    @staticmethod
    def _build_request(chat_id, query, app_key, qa_type***REMOVED***:
        """
        构建请求参数
        :param chat_id: 对话id
        :param app_key: api key
        :param query: 用户问题
        :param qa_type: 问答类型
        :return:
        """

        # 通用问答时，使用上次会话id 实现多轮对话效果
        conversation_id = ""
        if qa_type == DiFyAppEnum.COMMON_QA.value[0]:
            qa_record = query_user_qa_record(chat_id***REMOVED***
            if qa_record and len(qa_record***REMOVED*** > 0:
                conversation_id = qa_record[0]["conversation_id"]

        body_params = {
            "query": query,
            "inputs": {"qa_type": qa_type***REMOVED***,
            "response_mode": "streaming",
            "conversation_id": conversation_id,
            "user": "abc-123",
        ***REMOVED***
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {app_key***REMOVED***",
        ***REMOVED***

        dify_service_url = DiFyRestApi.build_url(DiFyRestApi.DIFY_REST_CHAT***REMOVED***
        return dify_service_url, body_params, headers

    @staticmethod
    def _get_authorization_token(qa_type: str***REMOVED***:
        """
            根据请求类别获取api/token
            固定走一个dify流
             app-IzudxfuN8uO2bvuCpUHpWhvH master分支默认的数据问答key
            :param qa_type
        :return:
        """
        # 遍历枚举成员并检查第一个元素是否与测试字符串匹配
        for member in DiFyAppEnum:
            if member.value[0] == qa_type:
                return os.getenv("DIFY_DATABASE_QA_API_KEY"***REMOVED***
        else:
            raise ValueError(f"问答类型 '{qa_type***REMOVED***' 不支持"***REMOVED***


async def query_dify_suggested(chat_id***REMOVED*** -> dict:
    """
    发送反馈给指定的消息ID。

    :param chat_id: 消息的唯一标识符。
    :return: 返回服务器响应。
    """
    # 查询对话记录
    qa_record = query_user_qa_record(chat_id***REMOVED***
    url = DiFyRestApi.replace_path_params(DiFyRestApi.DIFY_REST_SUGGESTED, {"message_id": qa_record[0]["message_id"]***REMOVED******REMOVED***
    logger.info(f"query dify suggested url: {url***REMOVED***"***REMOVED***
    api_key = os.getenv("DIFY_DATABASE_QA_API_KEY"***REMOVED***
    headers = {"Authorization": f"Bearer {api_key***REMOVED***", "Content-Type": "application/json"***REMOVED***

    response = requests.get(url + "?user=abc-123", headers=headers***REMOVED***

    # 检查请求是否成功
    if response.status_code == 200:
        logger.info("Feedback successfully sent."***REMOVED***
        return response.json(***REMOVED***
    else:
        logger.error(f"Failed to send feedback. Status code: {response.status_code***REMOVED***,Response body: {response.text***REMOVED***"***REMOVED***
        raise


async def stop_dify_chat(task_id, qa_type***REMOVED*** -> dict:
    """
    停止dify对话流输出

    :param task_id: 任务id。
    :param qa_type: 问答类型
    :return: 返回服务器响应。
    """
    # 查询对话记录
    url = DiFyRestApi.replace_path_params(DiFyRestApi.DIFY_REST_STOP, {"task_id": task_id***REMOVED******REMOVED***

    api_key = os.getenv("DIFY_DATABASE_QA_API_KEY"***REMOVED***
    # 行业报告走的是 报告问答的key
    if DiFyAppEnum.FILEDATA_QA.value[0] == qa_type:
        api_key = os.getenv("DIFY_ENTERPRISE_REPORT_API_KEY"***REMOVED***

    headers = {"Authorization": f"Bearer {api_key***REMOVED***", "Content-Type": "application/json"***REMOVED***
    body = {"user": "abc-123"***REMOVED***

    logger.info(url***REMOVED***

    """
    data：若传入字典或元组列表，requests 库会把数据编码为表单数据格式（key1=value1&key2=value2）；若传入字节或类文件对象，则直接发送。
    json：requests 库会自动把传入的 Python 对象序列化为 JSON 字符串，然后发送。
    """
    response = requests.post(url, json=body, headers=headers***REMOVED***

    # 检查请求是否成功
    if response.status_code == 200:
        logger.info("Stop chat successfully sent."***REMOVED***
        return response.json(***REMOVED***
    else:
        logger.error(f"Failed to stop chat. Status code: {response.status_code***REMOVED***,Response body: {response.text***REMOVED***"***REMOVED***
        raise
