import logging

from common.exception import MyException
from common.minio_util import MinioUtils
from common.res_decorator import async_json_resp
from constants.code_enum import SysCodeEnum
from sanic import Blueprint, Request
from services.file_chat_service import read_excel, read_file_columns
from services.text2_sql_service import exe_file_sql_query

bp = Blueprint("fileChatApi", url_prefix="/file"***REMOVED***

minio_utils = MinioUtils(***REMOVED***


@bp.post("/read_file"***REMOVED***
@async_json_resp
async def read_file(req: Request***REMOVED***:
    """
    读取excel文件第一行内容
    :param req:
    :return:
    """

    file_key = req.args.get("file_qa_str"***REMOVED***
    if not file_key:
        file_key = req.json.get("file_qa_str"***REMOVED***

    file_key = file_key.split("|"***REMOVED***[0]  # 取文档地址

    file_url = minio_utils.get_file_url_by_key(object_key=file_key***REMOVED***
    result = await read_excel(file_url***REMOVED***
    return result


@bp.post("/read_file_column"***REMOVED***
@async_json_resp
async def read_file_column(req: Request***REMOVED***:
    """
    读取excel文件第一行内容
    :param req:
    :return:
    """

    file_key = req.args.get("file_qa_str"***REMOVED***
    if not file_key:
        file_key = req.json.get("file_qa_str"***REMOVED***

    file_key = file_key.split("|"***REMOVED***[0]  # 取文档地址

    file_url = minio_utils.get_file_url_by_key(object_key=file_key***REMOVED***
    result = await read_file_columns(file_url***REMOVED***
    return result


@bp.post("/upload_file"***REMOVED***
@async_json_resp
async def upload_file(request: Request***REMOVED***:
    """
    上传附件
    :param request:
    :return:
    """
    file_url = minio_utils.upload_file_from_request(request=request***REMOVED***
    return file_url


@bp.post("/process_file_llm_out"***REMOVED***
@async_json_resp
async def process_file_llm_out(req***REMOVED***:
    """
    文件问答处理大模型返回SQL语句
    """
    try:
        # 获取请求体内容
        body_content = req.body
        # # 将字节流解码为字符串
        body_str = body_content.decode("utf-8"***REMOVED***

        # 文件key
        file_key = req.args.get("file_key"***REMOVED***
        logging.info(f"query param: {body_str***REMOVED***"***REMOVED***

        result = await exe_file_sql_query(file_key, body_str***REMOVED***
        return result
    except Exception as e:
        logging.error(f"Error processing LLM output: {e***REMOVED***"***REMOVED***
        raise MyException(SysCodeEnum.c_9999***REMOVED***
