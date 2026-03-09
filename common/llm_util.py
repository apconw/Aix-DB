import json
import os

from model.db_connection_pool import get_db_pool
from model.db_models import TAiModel

pool = get_db_pool()

# 默认超时时间:30分钟
# 与 deep_research_agent.py 的 DEFAULT_LLM_TIMEOUT 保持一致
# 超时链路：LLM(15min) < TASK(30min) < Sanic RESPONSE(35min) < 前端 fetch(36min)
DEFAULT_LLM_TIMEOUT = int(os.getenv("LLM_TIMEOUT", 30 * 60))


def get_llm(temperature=0.75, timeout=None):
    """
    获取LLM模型
    :param temperature: 温度参数
    :param timeout: 超时时间（秒），默认使用环境变量 LLM_TIMEOUT 或 18分钟
    :return: LLM模型实例
    """
    with pool.get_session() as session:
        # Fetch default model
        model = (
            session.query(TAiModel)
            .filter(TAiModel.default_model == True, TAiModel.model_type == 1)
            .first()
        )
        if not model:
            raise ValueError("No default AI model configured in database.")

        # Map supplier to model type string used in map
        # 1:OpenAI, 2:Azure, 3:Ollama, 4:vLLM, 5:DeepSeek, 6:Qwen, 7:Moonshot, 8:ZhipuAI, 9:Other
        supplier = model.supplier

        # 目前统一将 Qwen 也视为通过 OpenAI 协议接入，避免 ChatTongyi 及其 LangSmith/OpenTelemetry 依赖
        if supplier == 3:
            model_type = "ollama"
        else:
            # Default to openai for others (OpenAI, Qwen, DeepSeek, Moonshot, Zhipu, vLLM, etc.)
            model_type = "openai"

        model_name = model.base_model
        model_api_key = model.api_key
        model_base_url = model.api_domain

        try:
            temperature = float(temperature)
        except ValueError:
            temperature = 0.75

        # 确定超时时间：优先使用参数，其次环境变量，最后使用默认值
        if timeout is None:
            timeout = DEFAULT_LLM_TIMEOUT
        else:
            try:
                timeout = int(timeout)
            except (ValueError, TypeError):
                timeout = DEFAULT_LLM_TIMEOUT

        # 为了避免在模块加载时就触发第三方依赖（如 OpenTelemetry/LangSmith）的副作用，
        # 对各类模型做统一的延迟导入和降级处理
        def _get_openai():
            """
            延迟导入 ChatOpenAI，避免在应用启动阶段因 langsmith/opentelemetry 初始化失败导致进程退出。
            如果导入失败，直接抛异常，由上层决定如何处理（通常是显式配置问题）。
            """
            try:
                from langchain_openai import ChatOpenAI
            except Exception as e:
                # 这里打印日志而不是在导入阶段崩溃
                print(
                    f"[ERROR] Failed to import ChatOpenAI, please check langchain-openai/langsmith/opentelemetry installation: {e}"
                )
                raise
            # 构造额外参数，强制关闭 thinking 模式以适配非流式请求
            # 某些后端通过 default_headers 传递，某些通过 extra_body
            # 这里优先使用 default_headers 覆盖，防止默认开启 thinking 导致报错
            extra_headers = {
                "enable_thinking": "false",
                # 如果后端需要布尔值而不是字符串，可能需要特定处理，但 HTTP 头通常是字符串
                # 对于某些兼容层，可能需要放在 extra_body 中
            }

            # 针对部分后端（如 volcengine, some vLLM setups），参数可能在 body 里
            extra_body = {
                "enable_thinking": False
            }
            return ChatOpenAI(
                model=model_name,
                temperature=temperature,
                base_url=model_base_url,
                api_key=model_api_key or "empty",  # Ensure not None
                timeout=timeout,  # 设置超时时间（秒）
                # 关键修改：传入额外参数以禁用 thinking
                default_headers=extra_headers,
                extra_body=extra_body,
            )

        def _get_ollama():
            """
            延迟导入 ChatOllama，避免在模块加载阶段触发不必要的依赖。
            """
            try:
                from langchain_ollama import ChatOllama
            except Exception as e:
                print(
                    f"[WARN] Failed to import ChatOllama, fallback to ChatOpenAI: {e}"
                )
                return _get_openai()

            return ChatOllama(
                model=model_name,
                temperature=temperature,
                base_url=model_base_url,
                timeout=timeout,  # 设置超时时间（秒）
            )

        # Qwen 也统一走 OpenAI 协议客户端，避免引入 ChatTongyi 及其 LangSmith/OpenTelemetry 依赖
        model_map = {
            "openai": _get_openai,
            "ollama": _get_ollama,
        }

        if model_type in model_map:
            return model_map[model_type]()
        else:
            # Should not happen given logic above, but fallback to openai
            return model_map["openai"]()
