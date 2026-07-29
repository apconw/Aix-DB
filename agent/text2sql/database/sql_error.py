"""
SQL 错误分类模块。

将 SQL 执行异常分类为 SqlErrorType 枚举，并为路由决策提供
is_retryable_error() 判断。错误信息同时传回 LLM 用于自纠错。
"""

from enum import Enum
from typing import Tuple

from agent.text2sql.state.agent_state import AgentState


class SqlErrorType(Enum):
    """
    SQL 错误分类，供 should_retry_sql 路由函数使用。

    不可重试（快速失败）：
      SECURITY_VIOLATION  — SQL 安检失败（INSERT/UPDATE/DELETE 等危险操作）
      PERMISSION_DENIED   — 数据库权限不足
      EMPTY_SQL           — SQL 为空（生成逻辑 bug）

    可重试（自纠错核心场景）：
      SQL_SYNTAX_ERROR    — 语法错误，错误信息直接指导 LLM 修正
      CONNECTION_TIMEOUT  — 连接超时
      CONNECTION_REFUSED  — 连接被拒绝
      TEMPORARY_UNAVAILABLE — 数据库临时不可用
      LOCK_WAIT_TIMEOUT   — 锁等待超时
      DEADLOCK            — 死锁
      TABLE_NOT_EXIST     — 表不存在（可能是 LLM 打错字）
      COLUMN_NOT_EXIST    — 列不存在（可能是 LLM 打错字）
      UNKNOWN_ERROR       — 其他未知错误（保守策略，给 LLM 机会尝试）
    """

    # 不可重试
    SECURITY_VIOLATION = "security_violation"
    PERMISSION_DENIED = "permission_denied"
    EMPTY_SQL = "empty_sql"

    # 可重试
    SQL_SYNTAX_ERROR = "sql_syntax_error"
    CONNECTION_TIMEOUT = "connection_timeout"
    CONNECTION_REFUSED = "connection_refused"
    TEMPORARY_UNAVAILABLE = "temporary_unavailable"
    LOCK_WAIT_TIMEOUT = "lock_wait_timeout"
    DEADLOCK = "deadlock"
    TABLE_NOT_EXIST = "table_not_exist"
    COLUMN_NOT_EXIST = "column_not_exist"
    UNKNOWN_ERROR = "unknown_error"


# 最大 SQL 生成 + 执行尝试次数（含首次）
MAX_SQL_ATTEMPTS = 3


# ---------------------------------------------------------------------------
# 连接错误检测（复用 deepagent / enhanced_common_agent 的成熟模式）
# ---------------------------------------------------------------------------
_CONNECTION_ERROR_TYPES = frozenset({
    "ConnectionClosed",
    "ConnectionResetError",
    "BrokenPipeError",
    "ConnectionError",
    "OSError",
    "TimeoutError",
    "ConnectTimeoutError",
    "PoolTimeoutError",
})

_CONNECTION_ERROR_KEYWORDS = frozenset({
    "connection closed",
    "connection reset",
    "broken pipe",
    "client disconnected",
    "connection aborted",
    "transport closed",
    "connection refused",
})


def _is_connection_error(exception: Exception) -> bool:
    """判断是否为连接类错误（复用 deepagent 模式）"""
    error_type = type(exception).__name__
    error_msg = str(exception).lower()
    return (
        error_type in _CONNECTION_ERROR_TYPES
        or any(kw in error_msg for kw in _CONNECTION_ERROR_KEYWORDS)
    )


# ---------------------------------------------------------------------------
# 错误分类
# ---------------------------------------------------------------------------

def classify_sql_error(
    exception: Exception, security_error: str = None
) -> Tuple[SqlErrorType, str]:
    """
    将 SQL 执行异常分类为 (SqlErrorType, 详细消息)。

    Args:
        exception:  执行阶段捕获的原始异常
        security_error: 如果安检在执行前已失败，传入安检错误消息

    Returns:
        (SqlErrorType, 人类可读的错误消息)
    """
    error_msg_lower = str(exception).lower()
    error_type_name = type(exception).__name__

    # ── 1. 安检失败（不可重试，安全策略）───────────────────────────────
    if security_error:
        return SqlErrorType.SECURITY_VIOLATION, security_error

    # ── 2. 空 SQL（不可重试，生成逻辑 bug）─────────────────────────────
    if "sql 为空" in error_msg_lower or "sql is empty" in error_msg_lower:
        return SqlErrorType.EMPTY_SQL, "SQL 为空，无法执行"

    # ── 3. 语法错误（可重试，这是自纠错的核心场景）────────────────────
    # 覆盖主流数据库的语法错误关键词
    _SYNTAX_KEYWORDS = (
        "syntax error",
        "syntax error at",
        "you have an error in your sql syntax",
        "parse error",
        "near \"",
        "unexpected",
        "invalid syntax",
    )
    if any(kw in error_msg_lower for kw in _SYNTAX_KEYWORDS):
        return SqlErrorType.SQL_SYNTAX_ERROR, str(exception)

    # ── 4. 权限不足（不可重试）────────────────────────────────────────
    _PERMISSION_KEYWORDS = (
        "permission denied",
        "access denied",
        "denied to user",
        "not allowed to access",
        "insufficient privilege",
    )
    if any(kw in error_msg_lower for kw in _PERMISSION_KEYWORDS):
        return SqlErrorType.PERMISSION_DENIED, str(exception)

    # ── 5. 连接类错误（可重试）────────────────────────────────────────
    if _is_connection_error(exception):
        if "timeout" in error_msg_lower or error_type_name in (
            "TimeoutError",
            "ConnectTimeoutError",
            "PoolTimeoutError",
        ):
            return SqlErrorType.CONNECTION_TIMEOUT, str(exception)
        if "refused" in error_msg_lower:
            return SqlErrorType.CONNECTION_REFUSED, str(exception)
        return SqlErrorType.TEMPORARY_UNAVAILABLE, str(exception)

    # ── 6. 锁 / 死锁（可重试）────────────────────────────────────────
    # 必须在独立 timeout 检查之前，因为 "lock wait timeout" 同时包含 "lock" 和 "timeout"
    if "deadlock" in error_msg_lower:
        return SqlErrorType.DEADLOCK, str(exception)
    if "lock" in error_msg_lower or "lock wait" in error_msg_lower:
        return SqlErrorType.LOCK_WAIT_TIMEOUT, str(exception)

    # ── 7. 独立超时检查（不受 _is_connection_error 限制）────────────
    # 覆盖 "timeout connecting to database" 等消息（不在连接错误类型中的超时）
    if "timeout" in error_msg_lower or error_type_name in (
        "TimeoutError",
        "ConnectTimeoutError",
        "PoolTimeoutError",
    ):
        return SqlErrorType.CONNECTION_TIMEOUT, str(exception)

    # ── 8. 表 / 列不存在（可重试，可能是 LLM 打错字）─────────────────
    # "relation" 是 PostgreSQL 对表的术语（如 "relation 'xxx' does not exist"）
    if ("table" in error_msg_lower or "relation" in error_msg_lower) and (
        "not exist" in error_msg_lower
        or "doesn't exist" in error_msg_lower
        or "不存在" in error_msg_lower
        or "not found" in error_msg_lower
    ):
        return SqlErrorType.TABLE_NOT_EXIST, str(exception)

    if "column" in error_msg_lower and (
        "not exist" in error_msg_lower
        or "doesn't exist" in error_msg_lower
        or "不存在" in error_msg_lower
        or "not found" in error_msg_lower
        or "unknown column" in error_msg_lower
    ):
        return SqlErrorType.COLUMN_NOT_EXIST, str(exception)

    # ── 8. 默认：未知但可重试（保守策略）─────────────────────────────
    return SqlErrorType.UNKNOWN_ERROR, str(exception)


# ---------------------------------------------------------------------------
# 可重试判断
# ---------------------------------------------------------------------------

_NON_RETRYABLE = frozenset({
    SqlErrorType.SECURITY_VIOLATION,
    SqlErrorType.PERMISSION_DENIED,
    SqlErrorType.EMPTY_SQL,
})


def is_retryable_error(error_type: SqlErrorType) -> bool:
    """判断某错误类型是否可重试。"""
    return error_type not in _NON_RETRYABLE
