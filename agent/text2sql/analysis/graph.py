import logging

from langgraph.graph import StateGraph, END
from langgraph.graph.state import CompiledStateGraph

from agent.text2sql.analysis.data_render_antv import data_render_ant
from agent.text2sql.analysis.llm_summarizer import summarize
from agent.text2sql.analysis.parallel_collector import (
    parallel_collect_after_sql_executor,
)
from agent.text2sql.analysis.early_recommender_helper import start_early_recommender
from agent.text2sql.analysis.unified_collector import unified_collect
from agent.text2sql.database.db_service import DatabaseService
from agent.text2sql.sql.generator import sql_generate
from agent.text2sql.permission.filter_injector import permission_filter_injector
from agent.text2sql.chart.generator import chart_generator
from agent.text2sql.datasource.selector import datasource_selector
from agent.text2sql.database.sql_error import MAX_SQL_ATTEMPTS, sql_execution_route
from agent.text2sql.state.agent_state import AgentState

logger = logging.getLogger(__name__)


def data_render_condition(state: AgentState) -> str:
    """
    数据渲染条件判断
    统一使用 data_render 节点
    """
    return "data_render"


def should_continue_after_datasource_selector(state: AgentState) -> str:
    """
    数据源选择节点后的条件判断
    如果 datasource_id 仍然为空，说明选择失败，进入异常处理节点
    否则进入 schema_inspector
    """
    datasource_id = state.get("datasource_id")
    if not datasource_id:
        logger.warning("数据源选择失败，进入异常处理节点")
        return "error_handler"
    return "schema_inspector"


def should_retry_sql(state: AgentState) -> str:
    """Route after SQL execution without mutating LangGraph state."""
    result = state.get("execution_result")
    route = sql_execution_route(
        success=bool(result and result.success),
        retryable=state.get("is_retryable_error", False),
        attempts=state.get("attempts", 0),
    )
    if route == "retry":
        logger.info(
            "SQL 执行失败，准备第 %s/%s 次执行",
            state.get("attempts", 0) + 1,
            MAX_SQL_ATTEMPTS,
        )
    return route


def handle_sql_error(state: AgentState) -> AgentState:
    """Persist the real SQL failure message and release request background work."""
    result = state.get("execution_result")
    detail = result.error if result and result.error else "未知 SQL 执行错误"
    attempts = state.get("attempts", 0)

    if state.get("is_retryable_error") and attempts >= MAX_SQL_ATTEMPTS:
        state["error_message"] = (
            f"SQL 执行失败，已尝试 {attempts} 次：{detail}"
        )
    else:
        state["error_message"] = f"SQL 执行失败：{detail}"

    future = state.get("_early_recommender_future")
    state["_early_recommender_future"] = None
    if future is not None and not future.done():
        future.cancel()

    logger.warning("SQL 错误处理节点: %s", state["error_message"])
    return state


def handle_datasource_error(state: AgentState) -> AgentState:
    """
    数据源异常处理节点

    场景：
    - 原对话绑定的数据源已被删除；
    - 当前空间下没有可用的数据源；
    - LLM 无法选择合适的数据源等。

    该节点不再向后执行，仅负责将友好的错误信息写入状态，
    由上层 Agent 统一以 t02 文本形式返回给前端。
    """
    if not state.get("error_message"):
        state["error_message"] = "当前没有可用的数据源，请先在数据源管理中配置或重新选择数据源后再进行数据问答。"
    logger.warning(f"数据源异常处理节点: {state.get('error_message')}")
    return state


def create_graph(datasource_id: int = None):
    """
    :return:
    """
    graph = StateGraph(AgentState)
    db_service = DatabaseService(datasource_id)

    graph.add_node("datasource_selector", datasource_selector)
    graph.add_node("error_handler", handle_datasource_error)
    graph.add_node("sql_error_handler", handle_sql_error)
    graph.add_node("schema_inspector", db_service.get_table_schema)
    # 优化：早期启动推荐问题生成（在后台并行执行）
    graph.add_node("early_recommender", start_early_recommender)
    graph.add_node("sql_generator", sql_generate)
    graph.add_node("permission_filter", permission_filter_injector)
    graph.add_node("sql_executor", db_service.execute_sql)
    # 优化：并行执行 chart_generator 和 summarize（如果推荐问题已提前启动，则不包含）
    graph.add_node("parallel_collector", parallel_collect_after_sql_executor)
    # 统一收集节点：按顺序收集 summarize → 图表数据 → 推荐问题
    graph.add_node("unified_collector", unified_collect)

    # 入口：根据是否有 datasource_id 决定是否进入数据源选择节点
    # 如果已有 datasource_id，则直接进入 schema_inspector
    # 否则先进入 datasource_selector
    graph.set_entry_point("datasource_selector")
    graph.add_conditional_edges(
        "datasource_selector",
        should_continue_after_datasource_selector,
        {
            "error_handler": "error_handler",
            "schema_inspector": "schema_inspector",
        },
    )
    # 异常节点执行完毕后直接结束
    graph.add_edge("error_handler", END)
    graph.add_edge("sql_error_handler", END)
    
    # 表关系补充已在 get_table_schema 中完成，不再需要单独的 table_relationship 节点
    # 优化：在 schema_inspector 之后立即启动推荐问题生成（不阻塞主流程）
    graph.add_edge("schema_inspector", "early_recommender")
    graph.add_edge("early_recommender", "sql_generator")
    graph.add_edge("sql_generator", "permission_filter")
    graph.add_edge("permission_filter", "sql_executor")
    graph.add_conditional_edges(
        "sql_executor",
        should_retry_sql,
        {
            "success": "parallel_collector",
            "retry": "sql_generator",
            "error": "sql_error_handler",
        },
    )
    # 统一收集：按顺序收集 summarize → 图表数据 → 推荐问题
    graph.add_edge("parallel_collector", "unified_collector")
    graph.add_edge("unified_collector", END)

    graph_compiled: CompiledStateGraph = graph.compile()
    return graph_compiled
