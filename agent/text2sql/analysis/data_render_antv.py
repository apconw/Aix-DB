"""
数据渲染节点 - AntV 格式
根据当前项目前后端协议,返回格式化后的数据
"""
import json
import logging
import os
import traceback
from decimal import Decimal
from datetime import datetime, date
from typing import Dict, Any, List, Optional, Tuple

import sqlglot
from sqlglot import parse

from agent.text2sql.state.agent_state import AgentState, ExecutionResult

logger = logging.getLogger(__name__)

# 数据库类型到 sqlglot 方言的映射
# 对于 sqlglot 不直接支持的数据源，映射到最接近的兼容方言
DB_TYPE_TO_DIALECT = {
    "mysql": "mysql",
    "postgresql": "postgres",
    "pg": "postgres",
    "oracle": "oracle",
    "sqlserver": "tsql",
    "mssql": "tsql",
    "clickhouse": "clickhouse",
    "ck": "clickhouse",
    "redshift": "redshift",
    "elasticsearch": "mysql",  # Elasticsearch 使用 MySQL 兼容语法
    "es": "mysql",
    "starrocks": "mysql",  # StarRocks 兼容 MySQL 协议
    "doris": "mysql",  # Doris 兼容 MySQL 协议
    "dm": "oracle",  # 达梦数据库兼容 Oracle
    "kingbase": "postgres",  # 人大金仓兼容 PostgreSQL
    "excel": "postgres",  # Excel 使用 PostgreSQL 规则
}

# 前端表格预览最大行数（避免一次性返回全部数据导致页面卡顿）
TABLE_PREVIEW_MAX_ROWS = int(os.getenv("TABLE_PREVIEW_MAX_ROWS", "100"))


def convert_value(v):
    """转换数据类型"""
    if isinstance(v, Decimal):
        return float(v)
    elif isinstance(v, (datetime,)):
        return v.strftime("%Y-%m-%d %H:%M:%S")
    elif isinstance(v, date):
        return v.strftime("%Y-%m-%d")
    else:
        return v


def extract_table_names_sqlglot(sql: str, db_type: str = "mysql") -> List[str]:
    """
    使用 sqlglot 提取 SQL 中的所有表名
    
    Args:
        sql: SQL 语句
        db_type: 数据库类型，默认为 mysql
    """
    try:
        # 将数据库类型映射到 sqlglot 方言
        dialect = DB_TYPE_TO_DIALECT.get(db_type.lower(), "mysql")
        
        expression = parse(sql, read=dialect)[0]
        tables = set()
        for table in expression.find_all(sqlglot.exp.Table):
            tables.add(table.name)
        return list(tables)
    except Exception as e:
        logger.warning(f"SQL 解析错误: {e}")
        return []


def extract_table_alias_mapping(sql: str, db_type: str = "mysql") -> Dict[str, str]:
    """
    提取SQL中的表别名映射关系
    
    Args:
        sql: SQL语句
        db_type: 数据库类型，默认为 mysql
    
    Returns:
        别名到真实表名的映射字典 {alias: table_name}
    """
    alias_mapping = {}
    try:
        # 将数据库类型映射到 sqlglot 方言
        dialect = DB_TYPE_TO_DIALECT.get(db_type.lower(), "mysql")
        
        expressions = parse(sql, read=dialect)
        
        # 方法1: 直接从表表达式中提取
        for expression in expressions:
            if expression:
                for table_exp in expression.find_all(sqlglot.exp.Table):
                    if hasattr(table_exp, "alias") and table_exp.alias:
                        alias_mapping[table_exp.alias] = table_exp.name
        
        # 方法2: 从FROM和JOIN子句中提取（更可靠的方法）
        for expression in expressions:
            if expression:
                # 处理 FROM 子句
                for from_exp in expression.find_all(sqlglot.exp.From):
                    if hasattr(from_exp, "expressions"):
                        for expr in from_exp.expressions:
                            if isinstance(expr, sqlglot.exp.Alias) and hasattr(expr.this, "name"):
                                alias_mapping[expr.alias] = expr.this.name
                            elif hasattr(expr, "name") and hasattr(expr, "alias") and expr.alias:
                                alias_mapping[expr.alias] = expr.name
                
                # 处理 JOIN 子句
                for join_exp in expression.find_all(sqlglot.exp.Join):
                    if hasattr(join_exp, "this"):
                        join_table = join_exp.this
                        if isinstance(join_table, sqlglot.exp.Alias) and hasattr(join_table.this, "name"):
                            alias_mapping[join_table.alias] = join_table.this.name
                        elif hasattr(join_table, "name") and hasattr(join_table, "alias") and join_table.alias:
                            alias_mapping[join_table.alias] = join_table.name
    except Exception as e:
        logger.warning(f"提取表别名映射失败: {e}")
    
    logger.debug(f"表别名映射: {alias_mapping}")
    return alias_mapping


def extract_select_columns(sql: str, db_type: str = "mysql", table_alias_mapping: Optional[Dict[str, str]] = None) -> List[Dict[str, Any]]:
    """
    从 SQL 中提取 SELECT 列的详细信息
    返回格式: [{"name": "column_name", "alias": "alias_name", "table": "table_name", "is_aggregate": False}, ...]
    
    Args:
        sql: SQL 语句
        db_type: 数据库类型，默认为 mysql
        table_alias_mapping: 表别名映射字典，如果提供，会将别名转换为真实表名
    """
    try:
        # 将数据库类型映射到 sqlglot 方言
        dialect = DB_TYPE_TO_DIALECT.get(db_type.lower(), "mysql")
        
        expressions = parse(sql, read=dialect)
        column_info_list = []

        for expression in expressions:
            if not expression:
                continue

            # 查找 SELECT 表达式
            selects = expression.find_all(sqlglot.exp.Select)
            for select in selects:
                projections = select.expressions
                for proj in projections:
                    col_info = {
                        "name": "",
                        "alias": "",
                        "table": "",
                        "is_aggregate": False,
                    }

                    # 检查是否是聚合函数
                    if isinstance(proj, (sqlglot.exp.AggFunc, sqlglot.exp.Sum, sqlglot.exp.Count, sqlglot.exp.Avg, sqlglot.exp.Max, sqlglot.exp.Min)):
                        col_info["is_aggregate"] = True
                        col_info["name"] = str(proj)
                    elif isinstance(proj, sqlglot.exp.Column):
                        col_info["name"] = proj.name
                        table_ref = proj.table or ""
                        # 如果有表别名映射，将别名转换为真实表名
                        if table_ref and table_alias_mapping:
                            col_info["table"] = table_alias_mapping.get(table_ref, table_ref)
                        else:
                            col_info["table"] = table_ref
                    elif isinstance(proj, sqlglot.exp.Star):
                        col_info["name"] = "*"
                    else:
                        col_info["name"] = str(proj)

                    # 获取别名（去掉外层的反引号、双引号、方括号）
                    def clean_alias(alias_str: str) -> str:
                        """清理别名：去掉反引号、双引号、方括号"""
                        if not alias_str:
                            return alias_str
                        # 去掉反引号、双引号、方括号
                        alias_str = alias_str.strip()
                        # 去掉外层的反引号
                        if alias_str.startswith('`') and alias_str.endswith('`'):
                            alias_str = alias_str[1:-1]
                        # 去掉外层的双引号
                        if alias_str.startswith('"') and alias_str.endswith('"'):
                            alias_str = alias_str[1:-1]
                        # 去掉外层的方括号（SQL Server）
                        if alias_str.startswith('[') and alias_str.endswith(']'):
                            alias_str = alias_str[1:-1]
                        return alias_str.strip()
                    
                    if isinstance(proj, sqlglot.exp.Alias):
                        col_info["alias"] = clean_alias(proj.alias)
                        # 检查内部的表达式是否为聚合函数
                        if hasattr(proj, "this"):
                            if isinstance(proj.this, (sqlglot.exp.AggFunc, sqlglot.exp.Sum, sqlglot.exp.Count, sqlglot.exp.Avg, sqlglot.exp.Max, sqlglot.exp.Min)):
                                col_info["is_aggregate"] = True
                                if isinstance(proj.this, sqlglot.exp.Column):
                                    col_info["name"] = proj.this.name
                                    table_ref = proj.this.table or ""
                                    # 如果有表别名映射，将别名转换为真实表名
                                    if table_ref and table_alias_mapping:
                                        col_info["table"] = table_alias_mapping.get(table_ref, table_ref)
                                    else:
                                        col_info["table"] = table_ref
                    elif hasattr(proj, "alias") and proj.alias:
                        col_info["alias"] = clean_alias(proj.alias)

                    column_info_list.append(col_info)

        return column_info_list
    except Exception as e:
        logger.warning(f"提取 SELECT 列信息失败: {e}")
        return []


def extract_chart_config_mapping(chart_config: Optional[Dict[str, Any]]) -> Dict[str, str]:
    """
    从chart_config中提取列名映射（value -> name）
    chart_config中的columns/axis包含name和value字段
    
    Args:
        chart_config: 图表配置字典
    
    Returns:
        {value: name} 的映射字典，value是SQL中的列名/别名，name是中文名称
    """
    mapping = {}
    if not chart_config or not isinstance(chart_config, dict):
        return mapping
    
    try:
        # 处理columns字段（表格类型）
        columns = chart_config.get("columns", [])
        if isinstance(columns, list):
            for col in columns:
                if isinstance(col, dict):
                    value = col.get("value", "").strip().lower()
                    name = col.get("name", "").strip()
                    if value and name:
                        mapping[value] = name
        
        # 处理axis字段（图表类型）
        axis = chart_config.get("axis", {})
        if isinstance(axis, dict):
            for axis_key in ["x", "y", "series"]:
                axis_item = axis.get(axis_key)
                if isinstance(axis_item, dict):
                    value = axis_item.get("value", "").strip().lower()
                    name = axis_item.get("name", "").strip()
                    if value and name:
                        mapping[value] = name
        
        logger.debug(f"从chart_config提取的映射: {mapping}")
    except Exception as e:
        logger.warning(f"从chart_config提取映射失败: {e}", exc_info=True)
    
    return mapping


def get_column_comment_from_schema(db_info: Dict[str, Dict[str, Any]], table_name: str, column_name: str) -> str:
    """
    从 db_info 中获取字段注释（支持大小写不敏感匹配）
    """
    try:
        table_info = db_info.get(table_name, {})
        if not table_info:
            logger.debug(f"表 {table_name} 不在 db_info 中，可用表: {list(db_info.keys())[:5]}")
            return ""

        columns = table_info.get("columns", {})
        if not columns:
            logger.debug(f"表 {table_name} 没有 columns 字段")
            return ""

        # 先尝试精确匹配
        col_info = columns.get(column_name, {})
        if col_info:
            if isinstance(col_info, dict):
                comment = col_info.get("comment", "")
                if comment and comment != "None" and comment.strip():
                    logger.info(f"找到列注释: {table_name}.{column_name} -> {comment}")
                    return comment
                else:
                    logger.debug(f"列 {table_name}.{column_name} 的注释为空或无效: '{comment}'")
            else:
                logger.debug(f"列 {table_name}.{column_name} 的信息不是字典格式: {type(col_info)}, 值: {col_info}")
        else:
            # 如果精确匹配失败，尝试大小写不敏感匹配（MySQL在某些配置下大小写不敏感）
            column_name_lower = column_name.lower()
            for col_key, col_val in columns.items():
                if col_key.lower() == column_name_lower:
                    if isinstance(col_val, dict):
                        comment = col_val.get("comment", "")
                        if comment and comment != "None" and comment.strip():
                            logger.info(f"找到列注释（大小写不敏感匹配）: {table_name}.{col_key} (查找: {column_name}) -> {comment}")
                            return comment
            logger.debug(f"列 {column_name} 不在表 {table_name} 的列列表中（大小写敏感和不敏感都不匹配），可用列: {list(columns.keys())[:5]}")
        return ""
    except Exception as e:
        logger.warning(f"获取字段注释失败: {e}", exc_info=True)
        return ""


def map_columns_to_comments(
    sql: str, db_info: Dict[str, Dict[str, Any]], actual_columns: List[str], 
    db_type: str = "mysql", chart_config: Optional[Dict[str, Any]] = None
) -> Tuple[List[str], Dict[str, str]]:
    """
    将 SQL 查询结果的列名映射为中文注释（优先使用chart_config中的name）
    
    映射优先级（从高到低）：
    1. chart_config中的name字段（LLM在chart配置生成时根据语义推断生成的中文名称）
    2. 数据库字段注释（COMMENT）
    3. SQL中的中文别名
    4. 原列名（如果以上都没有，不进行智能推断，依赖LLM生成）
    
    Args:
        sql: SQL 语句
        db_info: 数据库信息
        actual_columns: 实际列名列表
        db_type: 数据库类型，默认为 mysql
        chart_config: 图表配置（可选），包含columns/axis中的name和value映射
    
    Returns:
        (column_names_chinese, column_mapping)
        column_names_chinese: 中文列名列表
        column_mapping: {实际列名: 中文列名} 的映射
    """
    try:
        # 优先从chart_config中提取映射
        chart_config_mapping = extract_chart_config_mapping(chart_config)
        
        # 提取表别名映射（将别名转换为真实表名）
        table_alias_mapping = extract_table_alias_mapping(sql, db_type)
        
        # 提取 SELECT 列的详细信息（使用表别名映射）
        column_info_list = extract_select_columns(sql, db_type, table_alias_mapping)
        
        # 获取表名（真实表名）
        table_names = extract_table_names_sqlglot(sql, db_type)
        
        column_mapping = {}
        column_names_chinese = []

        # 如果有 SELECT * 的情况,需要特殊处理
        has_select_all = any(info.get("name") == "*" for info in column_info_list)

        if has_select_all:
            # SELECT * 的情况,使用第一个表的 schema
            if table_names:
                target_table = table_names[0]
                table_info = db_info.get(target_table, {})
                columns = table_info.get("columns", {})
                
                for col_name in actual_columns:
                    comment = get_column_comment_from_schema(db_info, target_table, col_name)
                    chinese_name = comment if comment else col_name
                    column_mapping[col_name] = chinese_name
                    column_names_chinese.append(chinese_name)
        else:
            # 正常 SELECT 的情况
            # 如果 column_info_list 为空,说明解析失败,使用 actual_columns
            if not column_info_list:
                for col_name in actual_columns:
                    column_mapping[col_name] = col_name
                    column_names_chinese.append(col_name)
            else:
                for i, col_info in enumerate(column_info_list):
                    if i >= len(actual_columns):
                        break

                    actual_col_name = actual_columns[i]
                    col_name = col_info.get("name", "")
                    alias = col_info.get("alias", "")
                    table_name = col_info.get("table", "")
                    is_aggregate = col_info.get("is_aggregate", False)

                    # 如果是聚合函数,按照优先级映射（中文名称由LLM在chart配置生成时根据语义推断生成）
                    if is_aggregate:
                        # 优先级1: chart_config中的name（LLM生成的中文名称）
                        chinese_name = chart_config_mapping.get(actual_col_name.lower()) or chart_config_mapping.get(alias.lower() if alias else "")
                        
                        # 优先级2: SQL中的中文别名
                        if not chinese_name and alias:
                            # 检查别名是否是中文
                            if any('\u4e00' <= char <= '\u9fff' for char in alias):
                                chinese_name = alias
                        
                        # 如果以上都没有，使用实际列名（不进行智能推断，依赖LLM生成）
                        if not chinese_name:
                            chinese_name = actual_col_name
                        
                        logger.debug(f"聚合函数列映射: actual_col_name={actual_col_name}, alias={alias}, chinese_name={chinese_name}")
                    # 普通列,优先使用表的COMMENT，如果没有COMMENT才使用别名
                    else:
                        comment = ""
                        # 优先使用SQL解析出的原始列名（col_name）来查找COMMENT
                        # 因为actual_col_name是查询结果的列名（可能是别名），而COMMENT是存储在原始列名上的
                        # 但如果col_name为空或解析失败，则使用actual_col_name作为备选
                        
                        # 先尝试使用表名查找（表名已经通过别名映射转换为真实表名）
                        if table_name and table_name in db_info:
                            # 优先使用解析出的列名查找COMMENT（get_column_comment_from_schema已经支持大小写不敏感匹配）
                            if col_name:
                                comment = get_column_comment_from_schema(db_info, table_name, col_name)
                                logger.debug(f"尝试使用col_name查找COMMENT: table={table_name}, col_name={col_name}, comment={comment}")
                            # 如果col_name为空或找不到，尝试使用actual_col_name作为备选（处理SQL解析失败的情况）
                            if not comment and actual_col_name:
                                comment = get_column_comment_from_schema(db_info, table_name, actual_col_name)
                                logger.debug(f"尝试使用actual_col_name查找COMMENT: table={table_name}, actual_col_name={actual_col_name}, comment={comment}")
                        else:
                            logger.debug(f"表名未找到: table_name={table_name}, db_info中的表: {list(db_info.keys())[:5] if db_info else []}")
                        # 如果表名没找到或没有注释（可能列名没有指定表前缀），尝试在所有表中查找
                        # 但在多表查询时，这可能导致混淆，所以优先使用第一个找到注释的表
                        if not comment:
                            # 在多表查询时，按表名顺序查找，找到第一个匹配的就停止
                            for tbl_name in table_names:
                                # 优先使用解析出的列名查找（get_column_comment_from_schema已经支持大小写不敏感匹配）
                                if col_name:
                                    comment = get_column_comment_from_schema(db_info, tbl_name, col_name)
                                    if comment:
                                        break
                                # 如果col_name为空或找不到，尝试使用actual_col_name作为备选
                                if not comment and actual_col_name and actual_col_name != col_name:
                                    comment = get_column_comment_from_schema(db_info, tbl_name, actual_col_name)
                                    if comment:
                                        break
                        
                        # 按照优先级确定中文名称（中文名称由LLM在chart配置生成时根据语义推断生成）
                        # 优先级1: chart_config中的name（LLM生成的中文名称）
                        chinese_name = chart_config_mapping.get(actual_col_name.lower()) or chart_config_mapping.get(alias.lower() if alias else "")
                        
                        # 优先级2: 数据库字段注释（COMMENT）
                        if not chinese_name and comment:
                            chinese_name = comment
                        
                        # 优先级3: SQL中的中文别名
                        if not chinese_name and alias and alias != actual_col_name and alias != col_name:
                            # 检查别名是否是中文
                            if any('\u4e00' <= char <= '\u9fff' for char in alias):
                                chinese_name = alias
                        
                        # 如果以上都没有，使用实际列名（不进行智能推断，依赖LLM生成）
                        if not chinese_name:
                            chinese_name = actual_col_name
                            if not comment:
                                logger.debug(f"列 {actual_col_name} (SQL中的列名: {col_name}, 表名: {table_name}, 别名: {alias}) 在所有表中都没有找到注释，使用列名")

                    column_mapping[actual_col_name] = chinese_name
                    column_names_chinese.append(chinese_name)

        return column_names_chinese, column_mapping
    except Exception as e:
        logger.error(f"映射列名为中文注释失败: {e}", exc_info=True)
        # 失败时返回原列名
        column_mapping = {col: col for col in actual_columns}
        return actual_columns, column_mapping


async def data_render_ant(state: AgentState):
    """
    数据渲染节点 - 按照当前项目前后端协议返回格式化数据
    
    1. 列表时取表字段注释,自动映射返回中文信息
    2. 统计场景时生成的 SQL 也需要自动添加中文注解(在数据渲染阶段实现映射)
    """
    logger.info("---进入数据渲染节点---")

    try:
        # 获取执行结果
        execution_result: Optional[ExecutionResult] = state.get("execution_result")
        if not execution_result or not execution_result.success or not execution_result.data:
            logger.warning("SQL 执行结果为空或失败,跳过数据渲染")
            return state

        data: List[Dict[str, Any]] = execution_result.data
        if not data:
            logger.warning("数据为空,跳过数据渲染")
            return state

        # 获取数据库信息和 SQL
        db_info = state.get("db_info", {})
        generated_sql = state.get("generated_sql", "") or state.get("filtered_sql", "")
        
        logger.info(f"db_info 中的表数量: {len(db_info)}, 表名列表: {list(db_info.keys())[:5]}")
        if db_info:
            # 检查第一个表的结构
            first_table = list(db_info.keys())[0]
            first_table_info = db_info.get(first_table, {})
            first_table_columns = first_table_info.get("columns", {})
            logger.info(f"示例表 {first_table} 的列数量: {len(first_table_columns)}, 前3个列: {list(first_table_columns.keys())[:3]}")
            if first_table_columns:
                sample_col = list(first_table_columns.keys())[0]
                sample_col_info = first_table_columns.get(sample_col, {})
                logger.info(f"示例列 {sample_col} 的信息: {sample_col_info}")
        
        # 获取数据库类型（用于 SQL 解析）
        datasource_id = state.get("datasource_id")
        db_type = "mysql"  # 默认类型
        if datasource_id:
            try:
                from model.db_connection_pool import get_db_pool
                from services.datasource_service import DatasourceService
                db_pool = get_db_pool()
                with db_pool.get_session() as session:
                    ds = DatasourceService.get_datasource_by_id(session, datasource_id)
                    if ds:
                        db_type = ds.type
            except Exception as e:
                logger.warning(f"获取数据源类型失败: {e}，使用默认值 mysql")

        # 视图侧仅预览前 TABLE_PREVIEW_MAX_ROWS 行，避免一次性渲染全部数据导致前端卡顿
        preview_data = data[:TABLE_PREVIEW_MAX_ROWS]

        # 获取实际的列名(从第一条数据中提取)
        actual_columns = list(preview_data[0].keys()) if preview_data else []
        
        if not actual_columns:
            logger.warning("无法从数据中提取列名，跳过数据渲染")
            return state

        logger.info(f"提取到实际列名: {actual_columns}")

        # 获取chart_config（优先使用chart_config中的name字段作为中文名称）
        chart_config = state.get("chart_config", {})
        
        # 映射列名为中文注释（优先使用chart_config中的name）
        column_names_chinese, column_mapping = map_columns_to_comments(
            generated_sql, db_info, actual_columns, db_type, chart_config
        )
        
        logger.info(f"列名映射结果: 中文列名数量={len(column_names_chinese)}, 映射字典大小={len(column_mapping)}")
        if column_names_chinese and len(column_names_chinese) > 0:
            logger.info(f"前3个中文列名示例: {column_names_chinese[:3]}")
        else:
            logger.warning(f"列名映射失败或返回空，使用原始列名。actual_columns={actual_columns[:3]}")

        # 转换数据格式: 将英文列名映射为中文列名（仅对预览数据执行）
        formatted_data = []
        for row in preview_data:
            formatted_row = {}
            for col_name, value in row.items():
                chinese_col_name = column_mapping.get(col_name, col_name)
                formatted_row[chinese_col_name] = convert_value(value)
            formatted_data.append(formatted_row)

        # 确保 columns 字段与 formatted_data 的 key 一致（使用中文列名）
        # 从 formatted_data 的第一行提取实际使用的中文列名，确保顺序和内容完全匹配
        if formatted_data and len(formatted_data) > 0:
            actual_chinese_columns = list(formatted_data[0].keys())
            # 使用 formatted_data 中的实际列名，确保与数据完全匹配
            column_names_chinese = actual_chinese_columns
            logger.info(f"从 formatted_data 提取的实际中文列名: {actual_chinese_columns[:5] if len(actual_chinese_columns) > 5 else actual_chinese_columns}")

        # 确定图表类型 (template_code)
        chart_type = state.get("chart_type", "")
        chart_config = state.get("chart_config", {})
        template_code = "temp01"  # 默认为表格
        
        # 优先从 chart_config 中获取类型
        if chart_config and isinstance(chart_config, dict):
            chart_type_from_config = chart_config.get("type", "").lower()
            if chart_type_from_config == "pie":
                template_code = "temp02"
            elif chart_type_from_config == "bar" or chart_type_from_config == "column":
                template_code = "temp03"
            elif chart_type_from_config == "line":
                template_code = "temp04"
        # 其次从 chart_type 中推断
        elif chart_type:
            chart_type_lower = chart_type.lower()
            if chart_type_lower == "table":
                template_code = "temp01"
            elif chart_type_lower == "pie":
                template_code = "temp02"
            elif chart_type_lower in ["bar", "column"]:
                template_code = "temp03"
            elif chart_type_lower == "line":
                template_code = "temp04"
        
        # 构建返回数据格式
        # 按照当前项目协议,返回格式: {"template_code": "...", "columns": [...], "data": [...]}
        render_data = {
            "template_code": template_code,
            "columns": column_names_chinese,
            "data": formatted_data,
        }

        # 保存到 state
        state["render_data"] = render_data

        logger.info(f"数据渲染完成,共 {len(formatted_data)} 条记录, {len(column_names_chinese)} 列, template_code: {template_code}")
        logger.info(f"列名映射详情: actual_columns={actual_columns[:5] if len(actual_columns) > 5 else actual_columns}, "
                   f"column_names_chinese={column_names_chinese[:5] if len(column_names_chinese) > 5 else column_names_chinese}")
        logger.info(f"render_data keys: {list(render_data.keys())}, columns count: {len(render_data.get('columns', []))}")

    except Exception as e:
        logger.error(f"数据渲染过程中发生错误: {e}", exc_info=True)
        traceback.print_exception(e)

    return state
