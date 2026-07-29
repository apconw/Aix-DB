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
from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.database.sql_error import MAX_SQL_ATTEMPTS, SqlErrorType

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
    """
    sql_executor 之后的条件判断（SQL 自纠错循环）：
    - 执行成功 → parallel_collector
    - 执行失败+不可重试 → error_handler（快速失败）
    - 执行失败+可重试+未达上限 → sql_generator（重试）
    - 执行失败+可重试+已达上限 → error_handler（耗尽重试）
    """
    result = state.get("execution_result")
    attempts = state.get("attempts", 0)

    if result and result.success:
        state["correct_attempts"] = state.get("correct_attempts", 0) + 1
        logger.info(
            "SQL 执行成功（ attempts=%s, correct_attempts=%s ）",
            attempts,
            state["correct_attempts"],
        )
        return "parallel_collector"

    is_retryable = state.get("is_retryable_error", False)
    last_error = state.get("last_error_type", "unknown")

    if not is_retryable:
        logger.warning(
            "SQL 执行失败（错误类型: %s），不可重试，进入错误处理",
            last_error,
        )
        return "error_handler"

    if attempts >= MAX_SQL_ATTEMPTS:
        state["error_message"] = (
            f"SQL 执行失败，已尝试 {MAX_SQL_ATTEMPTS} 次仍未能成功生成可执行的 SQL，"
            "请换个问题或联系管理员。"
        )
        logger.warning(
            "SQL 执行失败，已达到最大尝试次数 %s，进入错误处理",
            MAX_SQL_ATTEMPTS,
        )
        return "error_handler"

    state["attempts"] = attempts + 1
    logger.info(
        "SQL 执行失败（错误类型: %s），正在重新生成（第 %s/%s 次尝试）",
        last_error,
        state["attempts"],
        MAX_SQL_ATTEMPTS,
    )
    return "sql_generator"


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
    
    # 表关系补充已在 get_table_schema 中完成，不再需要单独的 table_relationship 节点
    # 优化：在 schema_inspector 之后立即启动推荐问题生成（不阻塞主流程）
    graph.add_edge("schema_inspector", "early_recommender")
    graph.add_edge("early_recommender", "sql_generator")
    graph.add_edge("sql_generator", "permission_filter")
    graph.add_edge("permission_filter", "sql_executor")
    # SQL 自纠错循环：sql_executor 之后根据执行结果路由
    graph.add_conditional_edges(
        "sql_executor",
        should_retry_sql,
        {
            "parallel_collector": "parallel_collector",
            "sql_generator": "sql_generator",  # 重试回到 SQL 生成
            "error_handler": "error_handler",
        },
    )
    # 统一收集：按顺序收集 summarize → 图表数据 → 推荐问题
    graph.add_edge("parallel_collector", "unified_collector")
    graph.add_edge("unified_collector", END)

    graph_compiled: CompiledStateGraph = graph.compile()
    return graph_compiled
