"""
统一收集器
按顺序收集并推送：summarize → 图表数据 → 推荐问题
"""
import logging

from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.analysis.parallel_collector import wait_and_merge_early_recommender
from agent.text2sql.analysis.data_render_antv import data_render_ant

logger = logging.getLogger(__name__)


async def unified_collect(state: AgentState) -> AgentState:
    """
    统一收集节点
    按顺序收集：summarize → 图表数据 → 推荐问题
    
    这个节点会：
    1. 确保 summarize 结果已准备好
    2. 调用 data_render 生成图表数据
    3. 等待并合并推荐问题
    
    Args:
        state: Agent 状态对象（包含 parallel_collector 的结果）
        
    Returns:
        更新后的 state，包含所有收集的数据
    """
    logger.info("📦 开始统一收集：summarize → 图表数据 → 推荐问题")
    
    # 1. 确保 summarize 结果已准备好（应该已经在 parallel_collector 中完成）
    if "report_summary" not in state or not state.get("report_summary"):
        logger.warning("⚠️ summarize 结果为空，跳过")
    
    # 2. 生成图表数据（使用 chart_config 生成 render_data）
    try:
        if "chart_config" in state and state.get("chart_config"):
            logger.info("📊 生成图表数据...")
            # data_render_ant 是异步函数，需要使用 await
            state = await data_render_ant(state)
            logger.info("✅ 图表数据生成完成")
        else:
            # chart_config 为空，检查是否是因为查询结果为空
            execution_result = state.get("execution_result")
            if execution_result and execution_result.success and not execution_result.data:
                # SQL执行成功但无数据，生成空结果卡片，让前端显示空结果提示并可查看SQL
                logger.info("📊 SQL执行成功但无数据，生成空结果卡片")
                state["render_data"] = {
                    "template_code": "temp05",
                    "columns": [],
                    "data": [],
                }
            else:
                logger.warning("⚠️ chart_config 为空，跳过图表数据生成")
    except Exception as e:
        logger.error(f"❌ 生成图表数据失败: {e}", exc_info=True)
    
    # 3. 等待并合并推荐问题（如果早期任务存在）
    try:
        if state.get("_early_recommender_future"):
            logger.info("📋 等待并合并推荐问题...")
            state = wait_and_merge_early_recommender(state)
            logger.info("✅ 推荐问题合并完成")
        else:
            # 如果没有早期任务，推荐问题应该在 parallel_collector 中已经生成
            if "recommended_questions" not in state or not state.get("recommended_questions"):
                logger.warning("⚠️ 推荐问题为空")
    except Exception as e:
        logger.error(f"❌ 合并推荐问题失败: {e}", exc_info=True)
        if "recommended_questions" not in state:
            state["recommended_questions"] = []
    
    logger.info("✅ 统一收集完成")
    return state
