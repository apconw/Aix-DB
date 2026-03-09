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
                # SQL执行成功但无数据，仍然返回表格模板（temp01），这样前端可以显示表格结构和分页控件
                logger.info("📊 SQL执行成功但无数据，生成空表格")
                # 尝试从 SQL 中提取列名
                columns = []
                generated_sql = state.get("generated_sql", "") or state.get("filtered_sql", "")
                if generated_sql:
                    try:
                        # 简单的列名提取：从 SELECT 和 FROM 之间提取
                        import re
                        select_match = re.search(r'SELECT\s+(.*?)\s+FROM', generated_sql, re.IGNORECASE | re.DOTALL)
                        if select_match:
                            select_clause = select_match.group(1)
                            # 分割列名（简单处理，不考虑复杂的子查询）
                            col_parts = [c.strip() for c in select_clause.split(',')]
                            for col in col_parts:
                                # 提取别名或列名
                                if ' AS ' in col.upper():
                                    alias = col.split(' AS ')[-1].strip().strip('`').strip('"').strip("'")
                                    columns.append(alias)
                                else:
                                    # 提取最后一个点号后面的部分（表名.列名 -> 列名）
                                    col_name = col.strip().strip('`').strip('"').strip("'")
                                    if '.' in col_name:
                                        col_name = col_name.split('.')[-1]
                                    columns.append(col_name)
                    except Exception as e:
                        logger.warning(f"从 SQL 提取列名失败: {e}")
                
                state["render_data"] = {
                    "template_code": "temp01",  # 改为 temp01，显示表格
                    "columns": columns if columns else [],
                    "data": [],
                }
            else:
                logger.warning("⚠️ chart_config 为空，跳过图表数据生成")
    except Exception as e:
        logger.error(f"❌ 生成图表数据失败: {e}", exc_info=True)
    
    # 3. 等待并合并推荐问题（如果早期任务存在）
    try:
        if "_early_recommender_task_id" in state and state.get("_early_recommender_task_id"):
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

