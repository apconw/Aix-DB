from concurrent.futures import Future

from agent.text2sql.analysis import early_recommender_helper
from agent.text2sql.analysis.graph import should_retry_sql
from agent.text2sql.database.db_service import DatabaseService
from agent.text2sql.database.sql_error import (
    MAX_SQL_ATTEMPTS,
    SqlErrorType,
    classify_sql_error,
    is_retryable_error,
    sql_execution_route,
)
from agent.text2sql.state.agent_state import ExecutionResult


class ImmediateExecutor:
    def submit(self, function):
        future = Future()
        try:
            future.set_result(function())
        except Exception as exc:  # pragma: no cover - mirrors Executor behavior
            future.set_exception(exc)
        return future


def test_early_recommender_future_is_request_scoped(monkeypatch):
    monkeypatch.setattr(
        early_recommender_helper,
        "get_recommender_executor",
        lambda: ImmediateExecutor(),
    )
    monkeypatch.setattr(
        early_recommender_helper,
        "question_recommender",
        lambda state: {**state, "recommended_questions": ["next question"]},
    )

    state = {
        "datasource_id": 1,
        "db_info": {"users": {}},
        "user_query": "count users",
    }
    result = early_recommender_helper.start_early_recommender(state)

    future = result["_early_recommender_future"]
    assert future.result() == ["next question"]
    assert not hasattr(early_recommender_helper, "_recommender_futures")


def test_sql_error_classification_and_retry_policy():
    error_type, message = classify_sql_error(
        RuntimeError('column "missing" does not exist')
    )
    assert error_type is SqlErrorType.COLUMN_NOT_EXIST
    assert "missing" in message
    assert is_retryable_error(error_type)

    connection_type, _ = classify_sql_error(ConnectionError("connection refused"))
    assert connection_type is SqlErrorType.CONNECTION_ERROR
    assert not is_retryable_error(connection_type)


def test_max_attempts_counts_initial_execution():
    assert MAX_SQL_ATTEMPTS == 3
    assert sql_execution_route(success=False, retryable=True, attempts=1) == "retry"
    assert sql_execution_route(success=False, retryable=True, attempts=2) == "retry"
    assert sql_execution_route(success=False, retryable=True, attempts=3) == "error"
    assert sql_execution_route(success=False, retryable=False, attempts=1) == "error"
    assert sql_execution_route(success=True, retryable=False, attempts=1) == "success"


def test_langgraph_router_does_not_mutate_state():
    state = {
        "execution_result": ExecutionResult(success=False, error="syntax error"),
        "attempts": 1,
        "is_retryable_error": True,
    }
    original = dict(state)

    assert should_retry_sql(state) == "retry"
    assert state == original


def test_executor_persists_initial_attempt_for_empty_sql():
    service = object.__new__(DatabaseService)
    state = {"generated_sql": "", "attempts": 0, "correct_attempts": 0}

    result = service.execute_sql(state)

    assert result["attempts"] == 1
    assert result["last_error_type"] == SqlErrorType.EMPTY_SQL.value
    assert result["is_retryable_error"] is False
