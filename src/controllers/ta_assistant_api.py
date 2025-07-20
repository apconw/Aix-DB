"""
测试助手api
"""
import asyncio
import logging

from sanic import Blueprint
from sanic.response import ResponseStream

from common.exception import MyException
from common.res_decorator import async_json_resp
from common.token_decorator import check_token
from constants.code_enum import SysCodeEnum
from services.ta_assistant_service import (
    extract_toc_to_markdown,
    insert_demand_manager_to_db,
    query_demand_records,
    delete_demand_records,
    abstract_doc_func,
***REMOVED***
from services.user_service import get_user_info

bp = Blueprint("testAssistant", url_prefix="/ta"***REMOVED***


@bp.post("/insert_demand_manager"***REMOVED***
@async_json_resp
async def insert_demand_manager(request***REMOVED***:
    """
    保存项目信息
    :param request:
    :return:
    """
    form_data = request.json.get("project_data"***REMOVED***
    file_key = form_data.get("file_key"***REMOVED***
    doc_name = form_data.get("doc_name"***REMOVED***
    doc_desc = form_data.get("doc_desc"***REMOVED***
    user_info = await get_user_info(request***REMOVED***
    result = await insert_demand_manager_to_db(user_info["id"], doc_name, doc_desc, file_key***REMOVED***
    return result


@bp.post("/word_to_md"***REMOVED***
@check_token
@async_json_resp
async def convert_doc_to_markdown_api(request***REMOVED***:
    """
    转换word文档 markdown
    :param request:
    :return:
    """
    file_key = request.json.get("file_key"***REMOVED***
    # result = await convert_word_to_md(file_key***REMOVED***
    user_info = await get_user_info(request***REMOVED***
    result = await extract_toc_to_markdown(user_info["id"], file_key***REMOVED***
    return result


@bp.post("/query_demand_records", name="query_demand_records"***REMOVED***
@check_token
@async_json_resp
async def query_demand_records_api(request***REMOVED***:
    """
    查询t_test_assistant表中的记录，支持分页。

    :param request: 请求对象
    :return: JSON格式的查询结果
    """
    # 解析请求参数
    page = int(request.json.get("page", 1***REMOVED******REMOVED***
    limit = int(request.json.get("limit", 10***REMOVED******REMOVED***
    file_key = request.json.get("file_key"***REMOVED***  # 可选参数，用于过滤查询结果

    # 获取用户信息
    user_info = await get_user_info(request***REMOVED***

    # 调用查询函数并返回结果
    return await query_demand_records(user_info["id"], file_key=file_key, page=page, limit=limit***REMOVED***


@bp.post("/delete_demand_records", name="delete_demand_records"***REMOVED***
@check_token
@async_json_resp
async def delete_demand_records_api(request***REMOVED***:
    """
    删除项目信息
    :param request:
    :return:
    """
    return await delete_demand_records(request.json.get("id"***REMOVED******REMOVED***


@bp.route("/abstract_doc_func/<item_id>", name="abstract_doc_func", methods=["GET"]***REMOVED***
async def abstract_doc_func_api(req, item_id***REMOVED***:
    """
    抽取功能点信息
    :param req:
    :param item_id
    :return:
    """
    try:
        return ResponseStream(lambda response: abstract_doc_func(response, item_id***REMOVED***, content_type="text/event-stream"***REMOVED***
    except Exception as e:
        logging.error(f"Error Invoke diFy: {e***REMOVED***"***REMOVED***
        raise MyException(SysCodeEnum.c_9999***REMOVED***
