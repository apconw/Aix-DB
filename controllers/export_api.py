import logging

from sanic import Blueprint, Request, response
from sanic_ext import openapi

from common.exception import MyException
from common.token_decorator import check_token
from common.param_parser import parse_params
from constants.code_enum import SysCodeEnum
from common.res_decorator import async_json_resp
from model.schemas import ExportTableRequest, TablePageRequest, get_schema
from services.export_table_service import run_sql_for_export, run_sql_page, data_to_csv
from services.user_service import decode_jwt_token


logger = logging.getLogger(__name__)

bp = Blueprint("exportApi", url_prefix="/export")


@bp.post("/table_csv")
@openapi.summary("导出表格数据为 CSV")
@openapi.description("根据 SQL 与数据源执行查询（应用权限过滤），并返回 CSV 文件。")
@openapi.tag("数据导出")
@openapi.body(
    {
        "application/json": {
            "schema": get_schema(ExportTableRequest),
        }
    },
    description="导出请求体",
    required=True,
)
@check_token
@parse_params
async def export_table_csv(request: Request, body: ExportTableRequest):
    """
    表格数据导出接口（CSV）
    - 使用与数据问答相同的数据源与权限体系；
    - SQL 可以为无限制条数查询，导出全部匹配数据；
    - 返回 text/csv 响应，前端可直接触发下载。
    """
    try:
        token = request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ")[1]
        user_dict = await decode_jwt_token(token)
        user_id = user_dict.get("id", 1)

        sql = body.sql
        datasource_id = body.datasource_id
        filename = (body.filename or "export").strip() or "export"

        data, err = run_sql_for_export(sql, datasource_id=datasource_id, user_id=user_id)
        if err is not None:
            raise MyException(SysCodeEnum.c_9999, msg=err)

        csv_body = data_to_csv(data or [])
        headers = {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": f'attachment; filename="{filename}.csv"',
        }
        return response.text(csv_body, headers=headers)
    except MyException:
        raise
    except Exception as e:
        logger.error(f"导出表格数据失败: {e}")
        raise MyException(SysCodeEnum.c_9999)


@bp.post("/table_page")
@openapi.summary("表格数据分页查询")
@openapi.description("根据 SQL 与数据源执行分页查询（应用权限过滤），返回当前页数据。")
@openapi.tag("数据导出")
@openapi.body(
    {
        "application/json": {
            "schema": get_schema(TablePageRequest),
        }
    },
    description="分页查询请求体",
    required=True,
)
@openapi.response(
    200,
    {
        "application/json": {
            "schema": {"type": "object"},
        }
    },
    description="分页查询结果",
)
@check_token
@async_json_resp
@parse_params
async def table_page(request: Request, body: TablePageRequest):
    """
    表格数据分页查询接口（JSON）
    - 用于前端 NDataTable 翻页；
    - 会应用与数据问答相同的权限体系；
    - 不对原始 SQL 强制添加 LIMIT，分页逻辑在子查询外层完成。
    """
    token = request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.split(" ")[1]

    from services.user_service import decode_jwt_token

    user_dict = await decode_jwt_token(token)
    user_id = user_dict.get("id", 1)

    data, err = run_sql_page(
        body.sql,
        datasource_id=body.datasource_id,
        user_id=user_id,
        page=body.page,
        size=body.size,
    )
    if err is not None:
        raise MyException(SysCodeEnum.c_9999, msg=err)
    return data

