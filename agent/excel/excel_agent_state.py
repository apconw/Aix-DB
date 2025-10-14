from typing import TypedDict, Optional, Dict, Any, List

from pydantic import BaseModel


class ExecutionResult(BaseModel):
    """
    sql执行结果
    """

    success: bool
    columns: List[str]  # 表格列名
    data: Optional[List[Dict[str, Any]]] = None  # 执行结果
    error: Optional[str] = None


class ExcelAgentState(TypedDict):
    """
    表格问答
    """

    user_query: str  # 用户问题
    file_list: list  # 文件列表
    db_info: list[dict]  # 把表格映射成数据库表结构
    generated_sql: Optional[str]  # 生成的 SQL
    chart_url: Optional[str]  # AntV MCP图表地址
    chart_type: Optional[str]  # 图表类型
    apache_chart_data: Optional[Dict[str, Any]]  # Apache图表数据
    execution_result: Optional[ExecutionResult]  # SQL 执行结果
    report_summary: Optional[str]  # 报告摘要
