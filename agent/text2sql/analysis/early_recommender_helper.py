"""
早期推荐问题生成辅助模块
用于在 schema_inspector 之后提前启动推荐问题生成
"""
import logging
import threading
from typing import Optional, List
from concurrent.futures import Future, ThreadPoolExecutor, TimeoutError as FutureTimeoutError

from agent.text2sql.state.agent_state import AgentState
from agent.text2sql.question.recommender import question_recommender
from copy import deepcopy

logger = logging.getLogger(__name__)

# 全局线程池。Future 本身保存在请求状态中，避免失败请求在模块级字典中永久残留。
_recommender_executor: Optional[ThreadPoolExecutor] = None
_recommender_lock = threading.Lock()


def get_recommender_executor() -> ThreadPoolExecutor:
    """获取或创建推荐问题生成的线程池"""
    global _recommender_executor
    if _recommender_executor is None:
        with _recommender_lock:
            if _recommender_executor is None:
                _recommender_executor = ThreadPoolExecutor(max_workers=2, thread_name_prefix="early_recommender")
                logger.info("✅ 创建早期推荐问题生成线程池")
    return _recommender_executor


def start_early_recommender(state: AgentState) -> AgentState:
    """
    早期启动推荐问题生成（在 schema_inspector 之后立即开始）
    
    Args:
        state: Agent 状态对象
        
    Returns:
        更新后的 state（推荐问题可能还未完成）
    """
    try:
        # 检查是否有必要的依赖
        datasource_id = state.get("datasource_id")
        db_info = state.get("db_info", {})
        user_query = state.get("user_query", "")
        
        if not datasource_id or not db_info or not user_query:
            logger.debug("推荐问题生成所需数据不完整，跳过早期启动")
            return state
        
        logger.info("🚀 早期启动推荐问题生成（后台并行执行）")

        # 在线程池中异步执行推荐问题生成。在线程启动前复制状态，避免闭包
        # 捕获随后被 LangGraph 持续修改的请求对象。
        executor = get_recommender_executor()
        state_copy = deepcopy(state)

        def run_recommender() -> List[str]:
            """在线程中运行 question_recommender"""
            try:
                result_state = question_recommender(state_copy)
                recommended_questions = result_state.get("recommended_questions", [])
                logger.info(
                    "✅ 早期推荐问题生成完成，生成 %s 个问题",
                    len(recommended_questions),
                )
                return recommended_questions
            except Exception as e:
                logger.error(f"❌ 早期推荐问题生成失败: {e}", exc_info=True)
                return []

        # Future 的生命周期与当前 LangGraph 请求状态绑定。若下游节点异常，
        # 请求状态释放后 Future 也会在任务完成时被线程池正常释放。
        state["_early_recommender_future"] = executor.submit(run_recommender)
        
    except Exception as e:
        logger.error(f"❌ 早期启动推荐问题生成失败: {e}", exc_info=True)
        state["_early_recommender_future"] = None
    
    return state


def wait_for_early_recommender(
    future: Optional[Future], timeout: int = 5
) -> Optional[List[str]]:
    """
    等待早期推荐问题生成任务完成
    
    Args:
        future: 当前请求状态中的后台任务
        timeout: 超时时间（秒）
        
    Returns:
        推荐问题列表，如果超时或失败则返回 None
    """
    if future is None:
        return None

    try:
        result = future.result(timeout=timeout)
        return result if result else None
    except FutureTimeoutError:
        logger.warning("等待推荐问题生成超时")
        future.cancel()
    except Exception as e:
        logger.error(f"等待推荐问题生成异常: {e}", exc_info=True)

    return None
