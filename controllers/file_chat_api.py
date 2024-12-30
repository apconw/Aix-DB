from urllib.parse import unquote
from sanic import Blueprint, Request

from common.minio_util import MinioUtils
from common.res_decorator import async_json_resp
from services.pandas_ai_service import read_excel, query_excel

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


@bp.get("/query_excel"***REMOVED***
@async_json_resp
async def process_query(req: Request***REMOVED***:
    """
     通过object_key获取文件url
    :param req:
    :return:
    """
    query_str = unquote(req.query_string***REMOVED***
    if not query_str:
        return None

    try:
        str_split = query_str.replace("&", ""***REMOVED***.replace("=", ""***REMOVED***.split("@@@@"***REMOVED***
        query_text = str_split[0]
        file_key = str_split[1]
        file_url = minio_utils.get_file_url_by_key(object_key=file_key***REMOVED***

        result = await query_excel(file_url, query_text***REMOVED***
        return result
    except IndexError:
        raise ValueError("Invalid query string format"***REMOVED***
    except Exception as e:
        raise RuntimeError(f"An error occurred: {e***REMOVED***"***REMOVED***


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
