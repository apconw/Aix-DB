"""
并行执行收集器
并行执行 chart_generator、summarize 和 question_recommender
最后统一收集结果，按顺序返回
"""

import logging
import threading
from typing import Dict, Any, Optional
from concurrent.futures import ThreadPoolExecutor
from copy import deepcopy

from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.chart.generator import chart_generator
from agent.text2sql.analysis.llm_summarizer import summarize
from agent.text2sql.question.recommender import question_recommender

logger = logging.getLogger(__name__)

# 全局线程池，用于并行执行任务
_executor: Optional[ThreadPoolExecutor] = None
_executor_lock = threading.Lock()


def get_executor() -> ThreadPoolExecutor:
    """获取或创建线程池"""
    global _executor
    if _executor is None:
        with _executor_lock:
            if _executor is None:
                _executor = ThreadPoolExecutor(
                    max_workers=3, thread_name_prefix="parallel_collector"
                )
                logger.info("✅ 创建并行执行线程池")
    return _executor


def parallel_collect(state: AgentState, tasks: list[str] = None) -> AgentState:
    """
    并行执行多个任务并收集结果

    Args:
        state: Agent 状态对象
        tasks: 要执行的任务列表，默认为 ['chart_generator', 'summarize', 'question_recommender']

    Returns:
        更新后的 state，包含所有任务的结果
    """
    if tasks is None:
        tasks = ["chart_generator", "summarize", "question_recommender"]

    logger.info(f"🔄 开始并行执行任务: {tasks}")

    # 创建状态的深拷贝，确保并行任务不会互相影响
    state_copies = {}
    for task in tasks:
        state_copies[task] = deepcopy(state)

    # 定义任务函数映射
    task_functions = {
        "chart_generator": chart_generator,
        "summarize": summarize,
        "question_recommender": question_recommender,
    }

    # 提交所有任务到线程池
    executor = get_executor()
    futures = {}

    for task in tasks:
        if task in task_functions:
            task_func = task_functions[task]
            future = executor.submit(task_func, state_copies[task])
            futures[task] = future
            logger.info(f"📤 提交任务: {task}")

    # 等待所有任务完成并收集结果
    results = {}
    errors = {}

    for task, future in futures.items():
        try:
            result_state = future.result(timeout=60)  # 单任务最多等待 60 秒，避免整体过慢
            results[task] = result_state
            logger.info(f"✅ 任务完成: {task}")
        except Exception as e:
            logger.error(f"❌ 任务失败: {task}, 错误: {e}", exc_info=True)
            errors[task] = str(e)
            results[task] = None

    # 按顺序合并结果到原始 state
    # 顺序：summarize → chart_config → recommended_questions
    merge_order = ["summarize", "chart_generator", "question_recommender"]

    for task in merge_order:
        if task in results and results[task] is not None:
            result_state = results[task]

            if task == "summarize":
                if "report_summary" in result_state and result_state.get(
                    "report_summary"
                ):
                    state["report_summary"] = result_state["report_summary"]
                    logger.info(f"✅ 合并 summarize 结果")

            elif task == "chart_generator":
                if "chart_config" in result_state and result_state.get("chart_config"):
                    state["chart_config"] = result_state["chart_config"]
                    if "chart_type" in result_state:
                        state["chart_type"] = result_state["chart_type"]
                    logger.info(f"✅ 合并 chart_generator 结果")

            elif task == "question_recommender":
                if "recommended_questions" in result_state:
                    state["recommended_questions"] = result_state.get(
                        "recommended_questions", []
                    )
                    logger.info(
                        f"✅ 合并 question_recommender 结果，推荐问题数量: {len(state.get('recommended_questions', []))}"
                    )

    # 记录错误（如果有）
    if errors:
        logger.warning(f"⚠️ 部分任务执行失败: {errors}")

    logger.info("✅ 并行执行完成，所有结果已合并")
    return state


def parallel_collect_after_sql_executor(state: AgentState) -> AgentState:
    """
    在 sql_executor 之后并行执行 chart_generator 和 summarize

    question_recommender 可以提前在 schema_inspector 之后启动（如果有早期启动）
    否则在这里并行执行

    Args:
        state: Agent 状态对象（包含 sql_executor 的结果）

    Returns:
        更新后的 state
    """
    # 检查是否已经有早期启动的推荐问题生成任务
    early_task_id = state.get("_early_recommender_task_id")

    if early_task_id:
        # 如果有早期启动的任务，只并行执行 chart_generator 和 summarize
        # question_recommender 会在后续节点中等待并合并
        logger.info("🔄 并行执行 chart_generator 和 summarize（推荐问题已在后台执行）")
        return parallel_collect(state, tasks=["chart_generator", "summarize"])
    else:
        # 否则并行执行所有三个任务
        logger.info("🔄 并行执行 chart_generator、summarize 和 question_recommender")
        return parallel_collect(
            state, tasks=["chart_generator", "summarize", "question_recommender"]
        )


def wait_and_merge_early_recommender(state: AgentState) -> AgentState:
    """
    等待早期启动的推荐问题生成任务并合并结果

    如果早期任务已完成，直接合并结果
    如果未完成，等待完成（最多5秒）后合并
    如果超时或失败，回退到直接调用 question_recommender

    Args:
        state: Agent 状态对象

    Returns:
        更新后的 state
    """
    from agent.text2sql.analysis.early_recommender_helper import (
        wait_for_early_recommender,
    )

    task_id = state.get("_early_recommender_task_id")

    if not task_id:
        logger.debug("没有早期启动的推荐问题任务")
        # 如果 state 中已有推荐问题，直接使用
        if "recommended_questions" in state and state.get("recommended_questions"):
            return state
        # 否则直接生成
        try:
            result_state = question_recommender(deepcopy(state))
            if "recommended_questions" in result_state:
                state["recommended_questions"] = result_state.get(
                    "recommended_questions", []
                )
        except Exception as e:
            logger.error(f"生成推荐问题失败: {e}", exc_info=True)
            state["recommended_questions"] = []
        return state

    # 等待早期任务完成
    recommended_questions = wait_for_early_recommender(task_id, timeout=5)

    if recommended_questions is not None:
        state["recommended_questions"] = recommended_questions
        logger.info(f"✅ 合并早期生成的推荐问题，数量: {len(recommended_questions)}")
    else:
        # 超时或失败，回退到直接生成
        logger.warning("⚠️ 早期推荐问题任务超时或失败，回退到直接生成")
        try:
            result_state = question_recommender(deepcopy(state))
            if "recommended_questions" in result_state:
                state["recommended_questions"] = result_state.get(
                    "recommended_questions", []
                )
            else:
                state["recommended_questions"] = []
        except Exception as e:
            logger.error(f"回退生成推荐问题失败: {e}", exc_info=True)
            state["recommended_questions"] = []

    return state
