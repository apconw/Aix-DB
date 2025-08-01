from sanic import Blueprint

from common.exception import MyException
from common.res_decorator import async_json_resp
from common.token_decorator import check_token
from constants.code_enum import SysCodeEnum
from services.user_service import (
    authenticate_user,
    generate_jwt_token,
    query_user_record,
    get_user_info,
    delete_user_record,
    send_dify_feedback,
***REMOVED***

bp = Blueprint("userService", url_prefix="/user"***REMOVED***


@bp.post("/login"***REMOVED***
@async_json_resp
async def login(request***REMOVED***:
    """
    用户登录
    :param request:
    :return:
    """
    username = request.json.get("username"***REMOVED***
    password = request.json.get("password"***REMOVED***

    # 调用用户服务进行验证
    user = await authenticate_user(username, password***REMOVED***
    if user:
        # 如果验证通过，生成 JWT token
        token = await generate_jwt_token(user["id"], user["userName"]***REMOVED***
    ***REMOVED***"token": token***REMOVED***
    else:
        # 如果验证失败，返回错误信息
        raise MyException(SysCodeEnum.c_401***REMOVED***


@bp.post("/query_user_record", name="query_user_record"***REMOVED***
@check_token
@async_json_resp
async def query_user_qa_record(request***REMOVED***:
    """
    查询用户聊天记录
    :param request:
    :return:
    """
    page = int(request.json.get("page", 1***REMOVED******REMOVED***
    limit = int(request.json.get("limit", 10***REMOVED******REMOVED***
    search_text = request.json.get("search_text"***REMOVED***
    chat_id = request.json.get("chat_id"***REMOVED***
    user_info = await get_user_info(request***REMOVED***
    return await query_user_record(user_info["id"], page, limit, search_text, chat_id***REMOVED***


@bp.post("/delete_user_record"***REMOVED***
@check_token
@async_json_resp
async def delete_user_qa_record(request***REMOVED***:
    """
    删除用户聊天记录
    :param request:
    :return:
    """
    record_ids = request.json.get("record_ids"***REMOVED***
    user_info = await get_user_info(request***REMOVED***
    return await delete_user_record(user_info["id"], record_ids***REMOVED***


@bp.post("/dify_fead_back", name="dify_fead_back"***REMOVED***
@check_token
@async_json_resp
async def fead_back(request***REMOVED***:
    """
    用户反馈
    :param request:
    :return:
    """
    chat_id = request.json.get("chat_id"***REMOVED***
    rating = request.json.get("rating"***REMOVED***
    return await send_dify_feedback(chat_id, rating***REMOVED***
