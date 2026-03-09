"""
表格数据导出服务
根据 SQL + 数据源执行查询（含权限过滤），返回可导出为 CSV/Excel 的数据。
"""

import io
import logging
from typing import List, Dict, Any, Tuple, Optional

from sqlalchemy import text

from agent.text2sql.database.db_service import DatabaseService
from agent.text2sql.permission.filter_injector import permission_filter_injector
from agent.text2sql.analysis.data_render_antv import extract_table_names_sqlglot
from services.datasource_service import DatasourceService
from model.db_connection_pool import get_db_pool
from common.datasource_util import DatasourceConfigUtil, DatasourceConnectionUtil, DB, ConnectType

logger = logging.getLogger(__name__)


def run_sql_for_export(
    sql: str,
    datasource_id: int,
    user_id: int,
) -> Tuple[Optional[List[Dict[str, Any]]], Optional[str]]:
    """
    执行 SQL（应用权限过滤）并返回结果数据，供导出使用。

    Args:
        sql: 原始 SQL（可为无 LIMIT 的查询）
        datasource_id: 数据源 ID
        user_id: 当前用户 ID（用于权限过滤）

    Returns:
        (data_list, error_message)。成功时 data_list 为 list of dict，失败时 data_list 为 None、error_message 为错误信息。
    """
    if not sql or not sql.strip() or sql.strip() == "No SQL query generated":
        return None, "SQL 为空，无法导出"

    sql = sql.strip()
    db_type = "mysql"
    try:
        with get_db_pool().get_session() as session:
            ds = DatasourceService.get_datasource_by_id(session, datasource_id)
            if not ds:
                return None, "数据源不存在"
            db_type = ds.type or "mysql"
    except Exception as e:
        logger.warning(f"获取数据源类型失败: {e}")
    table_names = extract_table_names_sqlglot(sql, db_type)
    db_info = {t: {} for t in table_names} if table_names else {}

    state = {
        "generated_sql": sql,
        "filtered_sql": None,
        "datasource_id": datasource_id,
        "user_id": user_id,
        "db_info": db_info,
        "used_tables": table_names,
        # 导出场景显式关闭预览限制，执行完整 SQL
        "preview_limit_rows": 0,
    }
    try:
        permission_filter_injector(state)
    except Exception as e:
        logger.warning(f"权限过滤失败: {e}", exc_info=True)
    db_service = DatabaseService(datasource_id)
    db_service.execute_sql(state)
    result = state.get("execution_result")
    if not result:
        return None, "执行结果为空"
    if not result.success:
        return None, result.error or "执行失败"
    data = result.data
    if not data:
        return [], None
    if isinstance(data, list):
        return data, None
    return list(data), None


def run_sql_page(
    sql: str,
    datasource_id: int,
    user_id: int,
    page: int,
    size: int,
) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    带分页的 SQL 查询，用于前端表格翻页。
    - 会应用权限过滤；
    - 不对原始 SQL 追加 LIMIT，而是通过子查询包装实现分页；
    - 返回 {total, page, size, rows}。
    """
    if not sql or not sql.strip() or sql.strip() == "No SQL query generated":
        return None, "SQL 为空，无法查询"

    if page <= 0:
        page = 1
    if size <= 0:
        size = 20

    sql = sql.strip()
    db_type = "mysql"
    try:
        with get_db_pool().get_session() as session:
            ds = DatasourceService.get_datasource_by_id(session, datasource_id)
            if not ds:
                return None, "数据源不存在"
            db_type = ds.type or "mysql"
    except Exception as e:
        logger.warning(f"获取数据源类型失败: {e}")

    table_names = extract_table_names_sqlglot(sql, db_type)
    db_info = {t: {} for t in table_names} if table_names else {}

    # 通过权限注入节点获取 filtered_sql（关闭预览限制，保证分页在完整 SQL 上进行）
    state: Dict[str, Any] = {
        "generated_sql": sql,
        "filtered_sql": None,
        "datasource_id": datasource_id,
        "user_id": user_id,
        "db_info": db_info,
        "used_tables": table_names,
        "preview_limit_rows": 0,
    }
    try:
        permission_filter_injector(state)
    except Exception as e:
        logger.warning(f"权限过滤失败: {e}", exc_info=True)

    filtered_sql = state.get("filtered_sql") or state.get("generated_sql", "")
    if not filtered_sql:
        return None, "权限过滤后 SQL 为空"

    base_sql = filtered_sql.strip().rstrip(";")
    offset = (page - 1) * size

    count_sql = f"SELECT COUNT(*) AS cnt FROM ({base_sql}) AS t_count"
    page_sql = f"SELECT * FROM ({base_sql}) AS t_page LIMIT {size} OFFSET {offset}"

    # 使用 DatabaseService 中的数据源信息来判断驱动类型
    db_service = DatabaseService(datasource_id)
    rows: List[Dict[str, Any]] = []
    total: int = 0

    try:
        use_native_driver = False
        if db_service._datasource_type and datasource_id:
            db_enum = DB.get_db(db_service._datasource_type, default_if_none=True)
            use_native_driver = db_enum.connect_type == ConnectType.py_driver

        if use_native_driver and db_service._datasource_config:
            # 原生驱动：使用 DatasourceConnectionUtil 执行
            config = DatasourceConfigUtil.decrypt_config(db_service._datasource_config)
            count_result = DatasourceConnectionUtil.execute_query(
                db_service._datasource_type, config, count_sql
            )
            if count_result and isinstance(count_result, list):
                first_row = count_result[0]
                total = int(first_row.get("cnt") or 0)
            page_result = DatasourceConnectionUtil.execute_query(
                db_service._datasource_type, config, page_sql
            )
            rows = page_result or []
        else:
            # SQLAlchemy 驱动
            if not db_service._engine:
                return None, "数据源未正确初始化（缺少 SQLAlchemy engine）"
            with db_service._engine.connect() as connection:
                count_result = connection.execute(text(count_sql)).fetchone()
                if count_result is not None:
                    # count(*) 可能通过索引 0 或键 'cnt' 访问
                    total = int(getattr(count_result, "cnt", count_result[0]))

                result = connection.execute(text(page_sql))
                result_rows = result.fetchall()
                columns = list(result.keys())
                for row in result_rows:
                    row_dict: Dict[str, Any] = {}
                    for i, col in enumerate(columns):
                        row_dict[col] = row[i]
                    rows.append(row_dict)
    except Exception as e:
        logger.error(f"分页查询失败: {e}", exc_info=True)
        return None, f"分页查询失败: {e}"

    return {
        "total": total,
        "page": page,
        "size": size,
        "rows": rows,
    }, None


def data_to_csv(data: List[Dict[str, Any]], add_bom: bool = True) -> str:
    """将 list of dict 转为 CSV 字符串（表头为所有出现过的 key，BOM 便于 Excel 识别 UTF-8）。"""
    import csv
    if not data:
        return ""
    all_keys = []
    seen = set()
    for row in data:
        for k in row:
            if k not in seen:
                seen.add(k)
                all_keys.append(k)
    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames=all_keys, extrasaction="ignore")
    writer.writeheader()
    for row in data:
        writer.writerow(row)
    body = out.getvalue()
    if add_bom:
        body = "\ufeff" + body
    return body
