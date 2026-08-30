"""SQL execution error classification used by the Text2SQL retry loop."""

from enum import Enum


MAX_SQL_ATTEMPTS = 3  # Total executions, including the initial attempt.


class SqlErrorType(str, Enum):
    SECURITY_VIOLATION = "security_violation"
    PERMISSION_DENIED = "permission_denied"
    EMPTY_SQL = "empty_sql"
    SQL_SYNTAX_ERROR = "sql_syntax_error"
    CONNECTION_ERROR = "connection_error"
    DEADLOCK = "deadlock"
    TABLE_NOT_EXIST = "table_not_exist"
    COLUMN_NOT_EXIST = "column_not_exist"
    UNKNOWN_ERROR = "unknown_error"


_NON_RETRYABLE = {
    SqlErrorType.SECURITY_VIOLATION,
    SqlErrorType.PERMISSION_DENIED,
    SqlErrorType.EMPTY_SQL,
    # Regenerating SQL cannot repair credentials or an unavailable database.
    SqlErrorType.CONNECTION_ERROR,
}


def classify_sql_error(exception: Exception) -> tuple[SqlErrorType, str]:
    """Return a stable category and a concise error message for an exception."""
    message = str(exception)
    normalized = message.lower()

    if "deadlock" in normalized or "lock wait timeout" in normalized:
        return SqlErrorType.DEADLOCK, message

    if any(
        keyword in normalized
        for keyword in (
            "permission denied",
            "access denied",
            "denied to user",
            "insufficient privilege",
            "not authorized",
        )
    ):
        return SqlErrorType.PERMISSION_DENIED, message

    if any(
        keyword in normalized
        for keyword in (
            "connection refused",
            "connection reset",
            "connection closed",
            "could not connect",
            "server closed the connection",
            "network is unreachable",
            "timed out",
            "timeout",
        )
    ) or isinstance(exception, (ConnectionError, TimeoutError)):
        return SqlErrorType.CONNECTION_ERROR, message

    if any(
        keyword in normalized
        for keyword in (
            "syntax error",
            "sql syntax",
            "parse error",
            "invalid syntax",
            "near \"",
        )
    ):
        return SqlErrorType.SQL_SYNTAX_ERROR, message

    if (
        any(keyword in normalized for keyword in ("table", "relation"))
        and any(
            keyword in normalized
            for keyword in ("does not exist", "doesn't exist", "not found", "no such")
        )
    ):
        return SqlErrorType.TABLE_NOT_EXIST, message

    if (
        "column" in normalized
        and any(
            keyword in normalized
            for keyword in (
                "does not exist",
                "doesn't exist",
                "not found",
                "unknown column",
                "no such",
            )
        )
    ):
        return SqlErrorType.COLUMN_NOT_EXIST, message

    # Unknown database errors get a bounded correction attempt. The graph-level
    # attempt counter prevents this fallback from looping indefinitely.
    return SqlErrorType.UNKNOWN_ERROR, message


def is_retryable_error(error_type: SqlErrorType) -> bool:
    """Whether regenerating SQL may correct this category of failure."""
    return error_type not in _NON_RETRYABLE


def sql_execution_route(
    *, success: bool, retryable: bool, attempts: int
) -> str:
    """Return the next graph route using persisted execution state."""
    if success:
        return "success"
    if retryable and attempts < MAX_SQL_ATTEMPTS:
        return "retry"
    return "error"
