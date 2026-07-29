from typing import Optional, Dict, List, Any
from pydantic import BaseModel
from typing_extensions import TypedDict


class ExecutionResult(BaseModel):
    """
    sql执行结果
    """

    success: bool
    data: Optional[List[Dict[str, Any]]] = None  # 执行结果
    error: Optional[str] = None


class AgentState(TypedDict):
    """
    Graph/Sate定义
    """

    user_query: str  # 用户问题
    db_info: Optional[Dict]  # 数据库信息
    table_relationship: Optional[List[Dict[str, Any]]]  # 表关系
    generated_sql: Optional[str]  # 生成的 SQL
    execution_result: Optional[ExecutionResult]  # SQL 执行结果
    report_summary: Optional[str]  # 报告摘要
    attempts: int = 0  # 尝试次数
    correct_attempts: int = 0  # 正确尝试次数
    chart_type: Optional[str]  # 图表类型
    chart_config: Optional[Dict[str, Any]]  # 图表配置（AntV 格式）
    render_data: Optional[Dict[str, Any]]  # 渲染数据(包含 columns 和 data)
    datasource_id: Optional[int]  # 数据源ID
    user_id: Optional[int]  # 用户ID（用于权限过滤）
    filtered_sql: Optional[str]  # 权限过滤后的SQL
    recommended_questions: Optional[List[str]]  # 推荐问题列表
    used_tables: Optional[List[str]]  # SQL 使用的表名列表
    bm25_tokens: Optional[List[str]]  # BM25 对用户问题的分词结果
    error_message: Optional[str]  # 异常信息（如数据源选择失败时的提示）
    # ── SQL 自纠错循环新增字段 ──────────────────────────────────────
    error_msg: Optional[str] = ""  # 最近一次 SQL 执行错误（传给 LLM 用于自纠错）
    is_retryable_error: bool = False  # 该错误是否可重试
    last_error_type: Optional[str] = None  # SqlErrorType.value 字符串，供路由判断
