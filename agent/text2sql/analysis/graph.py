import logging

from langgraph.graph import StateGraph, END
from langgraph.graph.state import CompiledStateGraph

from agent.text2sql.analysis.data_render_antv import data_render_ant
from agent.text2sql.analysis.data_render_apache import data_render_apache
from agent.text2sql.analysis.llm_summarizer import summarize
from agent.text2sql.database.db_service import DatabaseService
from agent.text2sql.database.neo4j_search import get_table_relationship
from agent.text2sql.sql.generator import sql_generate
from agent.text2sql.state.agent_state import AgentState

logger = logging.getLogger(__name__)


def data_render_condition(state: AgentState) -> str:
    """
    根据 chart_type 判断如果是表格则使用eChart进行渲染
    否则使用antV进行渲染
    """
    chart_type = state.get("chart_type")
    logger.info(f"chart_type: {chart_type}")
    if not chart_type or chart_type.lower() in ["mcp-server-chart-generate_table"]:
        return "data_render_apache"  # 直接跳转到总结节点

    return "data_render"


def create_graph(datasource_id: int = None):
    """
    :return:
    """
    graph = StateGraph(AgentState)
    db_service = DatabaseService(datasource_id)

    graph.add_node("schema_inspector", db_service.get_table_schema)
    # graph.add_node("llm_reasoning", create_reasoning_steps)
    graph.add_node("table_relationship", get_table_relationship)
    graph.add_node("sql_generator", sql_generate)
    graph.add_node("sql_executor", db_service.execute_sql)
    graph.add_node("data_render", data_render_ant)
    graph.add_node("data_render_apache", data_render_apache)
    graph.add_node("summarize", summarize)

    graph.set_entry_point("schema_inspector")
    # graph.add_edge("schema_inspector", "llm_reasoning")
    graph.add_edge("schema_inspector", "table_relationship")
    graph.add_edge("table_relationship", "sql_generator")
    graph.add_edge("sql_generator", "sql_executor")
    graph.add_edge("sql_executor", "summarize")

    graph.add_conditional_edges(
        "summarize", data_render_condition, {"data_render": "data_render", "data_render_apache": "data_render_apache"}
    )

    graph.add_edge("data_render", END)

    graph_compiled: CompiledStateGraph = graph.compile()
    return graph_compiled
