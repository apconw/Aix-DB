"""
会话级工具调用管理器
解决死循环和重复调用问题，每个会话独立管理工具调用状态
"""

import logging
import time
import hashlib
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set
from threading import Lock
from collections import deque

logger = logging.getLogger(__name__)


@dataclass
class ToolCallStats:
    """工具调用统计"""
    total_calls: int = 0
    successful_calls: int = 0
    failed_calls: int = 0
    last_call_time: float = 0
    consecutive_failures: int = 0
    consecutive_same_tool: int = 0  # 连续调用同一工具的次数
    last_tool_name: str = ""


@dataclass
class SessionContext:
    """会话上下文，存储每个会话的工具调用状态"""
    session_id: str
    created_at: float = field(default_factory=time.time)
    
    # 工具调用计数 {tool_name: count}
    tool_call_counts: Dict[str, int] = field(default_factory=dict)
    
    # 最近执行的 SQL 查询（用于检测重复）
    recent_queries: deque = field(default_factory=lambda: deque(maxlen=20))
    
    # 最近的工具调用序列（用于检测循环模式）
    recent_tool_calls: deque = field(default_factory=lambda: deque(maxlen=30))
    
    # 统计信息
    stats: ToolCallStats = field(default_factory=ToolCallStats)
    
    # 循环检测
    detected_patterns: Set[str] = field(default_factory=set)
    
    # 是否已触发终止
    should_terminate: bool = False
    termination_reason: str = ""


class ToolCallManager:
    """
    工具调用管理器
    - 每个会话独立管理
    - 检测重复调用和死循环
    - 提供调用限制和早期终止机制
    """
    
    # 配置参数
    MAX_CALLS_PER_TOOL = 15  # 每个工具最大调用次数
    MAX_TOTAL_CALLS = 50  # 总调用次数上限
    MAX_CONSECUTIVE_SAME_TOOL = 5  # 连续调用同一工具的最大次数
    MAX_CONSECUTIVE_FAILURES = 3  # 连续失败的最大次数
    PATTERN_DETECTION_WINDOW = 10  # 模式检测窗口大小
    SESSION_TIMEOUT = 30 * 60  # 会话超时时间（30分钟）
    
    def __init__(self):
        self._sessions: Dict[str, SessionContext] = {}
        self._lock = Lock()
    
    def get_session(self, session_id: str) -> SessionContext:
        """获取或创建会话上下文"""
        with self._lock:
            if session_id not in self._sessions:
                self._sessions[session_id] = SessionContext(session_id=session_id)
                logger.info(f"创建新会话上下文: {session_id}")
            return self._sessions[session_id]
    
    def clear_session(self, session_id: str) -> None:
        """清理会话"""
        with self._lock:
            if session_id in self._sessions:
                del self._sessions[session_id]
                logger.info(f"清理会话上下文: {session_id}")
    
    def cleanup_expired_sessions(self) -> None:
        """清理过期会话"""
        current_time = time.time()
        with self._lock:
            expired = [
                sid for sid, ctx in self._sessions.items()
                if current_time - ctx.created_at > self.SESSION_TIMEOUT
            ]
            for sid in expired:
                del self._sessions[sid]
                logger.info(f"清理过期会话: {sid}")
    
    def check_before_call(
        self, 
        session_id: str, 
        tool_name: str, 
        query: Optional[str] = None
    ) -> tuple[bool, str]:
        """
        在工具调用前进行检查
        
        Returns:
            tuple[bool, str]: (是否允许调用, 如果不允许则返回原因)
        """
        ctx = self.get_session(session_id)
        
        # 检查是否已触发终止
        if ctx.should_terminate:
            return False, ctx.termination_reason
        
        # 检查总调用次数
        if ctx.stats.total_calls >= self.MAX_TOTAL_CALLS:
            reason = self._terminate_session(
                ctx, 
                f"工具调用总次数已达上限 ({self.MAX_TOTAL_CALLS} 次)。"
                "建议简化查询或重新描述需求。"
            )
            return False, reason
        
        # 检查单个工具调用次数
        tool_count = ctx.tool_call_counts.get(tool_name, 0)
        if tool_count >= self.MAX_CALLS_PER_TOOL:
            reason = self._terminate_session(
                ctx,
                f"工具 '{tool_name}' 调用次数已达上限 ({self.MAX_CALLS_PER_TOOL} 次)。"
                "请使用已获取的信息，无需重复查询。"
            )
            return False, reason
        
        # 检查连续调用同一工具
        if ctx.stats.last_tool_name == tool_name:
            ctx.stats.consecutive_same_tool += 1
            if ctx.stats.consecutive_same_tool >= self.MAX_CONSECUTIVE_SAME_TOOL:
                reason = self._terminate_session(
                    ctx,
                    f"连续 {self.MAX_CONSECUTIVE_SAME_TOOL} 次调用同一工具 '{tool_name}'，"
                    "可能陷入循环。请检查查询逻辑或使用已获取的数据。"
                )
                return False, reason
        else:
            ctx.stats.consecutive_same_tool = 1
        
        # 检查连续失败
        if ctx.stats.consecutive_failures >= self.MAX_CONSECUTIVE_FAILURES:
            reason = self._terminate_session(
                ctx,
                f"连续 {self.MAX_CONSECUTIVE_FAILURES} 次工具调用失败。"
                "请检查查询语法或表结构是否正确。"
            )
            return False, reason
        
        # 检查重复 SQL 查询
        if query and tool_name == "sql_db_query":
            normalized_query = self._normalize_query(query)
            if normalized_query in ctx.recent_queries:
                return False, (
                    "⚠️ **重复查询检测**: 此查询刚刚已执行过。\n\n"
                    "**请停止重复执行相同查询。**\n"
                    "如需分析结果，请直接使用已获取的数据，或提出新的查询需求。"
                )
        
        # 检查循环模式
        pattern_detected, pattern_msg = self._detect_loop_pattern(ctx, tool_name)
        if pattern_detected:
            reason = self._terminate_session(ctx, pattern_msg)
            return False, reason
        
        return True, ""
    
    def record_call(
        self, 
        session_id: str, 
        tool_name: str, 
        success: bool,
        query: Optional[str] = None
    ) -> None:
        """记录工具调用"""
        ctx = self.get_session(session_id)
        
        # 更新计数
        ctx.tool_call_counts[tool_name] = ctx.tool_call_counts.get(tool_name, 0) + 1
        ctx.stats.total_calls += 1
        ctx.stats.last_call_time = time.time()
        ctx.stats.last_tool_name = tool_name
        
        if success:
            ctx.stats.successful_calls += 1
            ctx.stats.consecutive_failures = 0
        else:
            ctx.stats.failed_calls += 1
            ctx.stats.consecutive_failures += 1
        
        # 记录工具调用序列
        ctx.recent_tool_calls.append((tool_name, time.time()))
        
        # 记录 SQL 查询
        if query and tool_name == "sql_db_query" and success:
            normalized_query = self._normalize_query(query)
            ctx.recent_queries.append(normalized_query)
        
        logger.debug(
            f"记录工具调用 - 会话: {session_id}, 工具: {tool_name}, "
            f"成功: {success}, 总调用: {ctx.stats.total_calls}"
        )
    
    def get_stats(self, session_id: str) -> Dict:
        """获取会话统计信息"""
        ctx = self.get_session(session_id)
        return {
            "session_id": session_id,
            "total_calls": ctx.stats.total_calls,
            "successful_calls": ctx.stats.successful_calls,
            "failed_calls": ctx.stats.failed_calls,
            "consecutive_failures": ctx.stats.consecutive_failures,
            "tool_call_counts": dict(ctx.tool_call_counts),
            "should_terminate": ctx.should_terminate,
            "termination_reason": ctx.termination_reason,
        }
    
    def _normalize_query(self, query: str) -> str:
        """标准化 SQL 查询用于比较"""
        # 移除多余空白，转为大写
        normalized = " ".join(query.split()).upper()
        # 使用 hash 减少内存占用
        return hashlib.md5(normalized.encode()).hexdigest()
    
    def _detect_loop_pattern(self, ctx: SessionContext, current_tool: str) -> tuple[bool, str]:
        """
        检测循环调用模式
        
        检测策略:
        1. 检测短循环: A-B-A-B 或 A-A-A
        2. 检测中等循环: A-B-C-A-B-C
        """
        if len(ctx.recent_tool_calls) < self.PATTERN_DETECTION_WINDOW:
            return False, ""
        
        # 获取最近的工具调用名称
        recent_tools = [t[0] for t in list(ctx.recent_tool_calls)[-self.PATTERN_DETECTION_WINDOW:]]
        recent_tools.append(current_tool)
        
        # 检测短循环模式 (长度 2-4)
        for pattern_len in range(2, 5):
            if len(recent_tools) >= pattern_len * 2:
                pattern = tuple(recent_tools[-pattern_len:])
                prev_pattern = tuple(recent_tools[-pattern_len*2:-pattern_len])
                
                if pattern == prev_pattern:
                    pattern_str = "->".join(pattern)
                    if pattern_str not in ctx.detected_patterns:
                        ctx.detected_patterns.add(pattern_str)
                        # 第一次检测到模式，只警告
                        logger.warning(f"检测到循环模式: {pattern_str}")
                    else:
                        # 重复检测到相同模式，终止
                        return True, (
                            f"⚠️ **检测到重复调用模式**: {pattern_str}\n\n"
                            "Agent 可能陷入循环。请：\n"
                            "1. 检查之前的查询结果\n"
                            "2. 简化查询需求\n"
                            "3. 明确说明想要的分析目标"
                        )
        
        return False, ""
    
    def _terminate_session(self, ctx: SessionContext, reason: str) -> str:
        """标记会话需要终止"""
        ctx.should_terminate = True
        ctx.termination_reason = reason
        logger.warning(f"会话 {ctx.session_id} 触发终止: {reason}")
        return reason
    
    def reset_session(self, session_id: str) -> None:
        """重置会话状态（用于新的问题）"""
        with self._lock:
            if session_id in self._sessions:
                old_ctx = self._sessions[session_id]
                # 创建新的会话上下文，但保留部分信息用于调试
                self._sessions[session_id] = SessionContext(session_id=session_id)
                logger.info(
                    f"重置会话 {session_id} - "
                    f"之前调用次数: {old_ctx.stats.total_calls}"
                )


# 全局管理器实例
_manager: Optional[ToolCallManager] = None
_manager_lock = Lock()

# 使用 contextvars 替代 threading.local，正确处理异步上下文
from contextvars import ContextVar

_current_session_var: ContextVar[Optional[str]] = ContextVar('current_session', default=None)


def get_tool_call_manager() -> ToolCallManager:
    """获取全局工具调用管理器实例"""
    global _manager
    if _manager is None:
        with _manager_lock:
            if _manager is None:
                _manager = ToolCallManager()
    return _manager


def set_current_session(session_id: str) -> None:
    """设置当前上下文的会话 ID（供工具使用）- 支持异步"""
    _current_session_var.set(session_id)
    logger.debug(f"设置当前会话: {session_id}")


def get_current_session() -> Optional[str]:
    """获取当前上下文的会话 ID - 支持异步"""
    return _current_session_var.get()
