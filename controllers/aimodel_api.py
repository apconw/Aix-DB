from sanic import Blueprint, Request
from sanic_ext import openapi

from common.res_decorator import async_json_resp
from common.token_decorator import check_token
from common.param_parser import parse_params
from services.aimodel_service import (
    query_model_list,
    get_model_detail,
    add_model,
    update_model,
    delete_model,
    set_default_model,
    check_llm_status,
    fetch_base_models,
)
from model.schemas import get_schema, AiModelListResponse, AiModelDetailResponse, AiModelCreator, AiModelEditor

bp = Blueprint("aiModelService", url_prefix="/system/aimodel")


@bp.get("/")
@openapi.summary("查询模型列表")
@openapi.tag("模型管理")
@openapi.parameter("keyword", str, description="搜索关键词")
@openapi.parameter("model_type", int, description="模型类型")
@openapi.response(200, {"application/json": {"schema": get_schema(AiModelListResponse)}})
@check_token
@async_json_resp
async def list_models(request: Request):
    keyword = request.args.get("keyword")
    model_type = request.args.get("model_type")
    if model_type:
        try:
            model_type = int(model_type)
        except ValueError:
            model_type = None
    return await query_model_list(keyword, model_type)


@bp.get("/<id:int>")
@openapi.summary("获取模型详情")
@openapi.tag("模型管理")
@openapi.response(200, {"application/json": {"schema": get_schema(AiModelDetailResponse)}})
@check_token
@async_json_resp
async def get_model(request: Request, id: int):
    return await get_model_detail(id)


@bp.post("/")
@openapi.summary("添加模型")
@openapi.tag("模型管理")
@openapi.body({"application/json": {"schema": get_schema(AiModelCreator)}})
@check_token
@async_json_resp
@parse_params
async def create_model(request: Request, body: AiModelCreator):
    return await add_model(body.model_dump())


@bp.put("/")
@openapi.summary("更新模型")
@openapi.tag("模型管理")
@openapi.body({"application/json": {"schema": get_schema(AiModelEditor)}})
@check_token
@async_json_resp
@parse_params
async def modify_model(request: Request, body: AiModelEditor):
    return await update_model(body.id, body.model_dump())


@bp.delete("/<id:int>")
@openapi.summary("删除模型")
@openapi.tag("模型管理")
@check_token
@async_json_resp
async def remove_model(request: Request, id: int):
    return await delete_model(id)


@bp.put("/default/<id:int>")
@openapi.summary("设为默认模型")
@openapi.tag("模型管理")
@check_token
@async_json_resp
async def set_default(request: Request, id: int):
    return await set_default_model(id)


@bp.post("/status")
@openapi.summary("测试模型连接")
@openapi.tag("模型管理")
@openapi.body({"application/json": {"schema": get_schema(AiModelCreator)}})
@check_token
@async_json_resp
@parse_params
async def check_status(request: Request, body: AiModelCreator):
    return await check_llm_status(body.model_dump())


@bp.post("/models")
@openapi.summary("获取基础模型列表")
@openapi.tag("模型管理")
@openapi.body({"application/json": {"schema": get_schema(AiModelCreator)}})
@check_token
@async_json_resp
@parse_params
async def get_base_model_list(request: Request, body: AiModelCreator):
    return await fetch_base_models(body.supplier, body.api_key, body.api_domain)
