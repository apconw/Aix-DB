import logging
import traceback
from typing import List, Optional

from openai import AsyncOpenAI

from model.db_connection_pool import get_db_pool
from model.db_models import TAiModel

logger = logging.getLogger(__name__)
pool = get_db_pool()


async def get_default_embedding_model():
    """
    获取默认的 embedding 模型配置
    只查找 Embedding 类型的模型（model_type=2），不回退到 LLM
    """
    with pool.get_session() as session:
        # 优先查找默认的 embedding 模型 (model_type=2)
        model = session.query(TAiModel).filter(
            TAiModel.model_type == 2,
            TAiModel.default_model == True
        ).first()

        # 如果没有默认的，查找任何可用的 embedding 模型
        if not model:
            model = session.query(TAiModel).filter(TAiModel.model_type == 2).first()

        # 如果找到了 embedding 模型，返回配置
        if model:
            return {
                "supplier": model.supplier,
                "api_key": model.api_key,
                "api_domain": model.api_domain,
                "base_model": model.base_model
            }
        
        # 没有配置 embedding 模型，返回 None（将使用离线模型）
        return None


async def generate_embedding(text: str) -> Optional[List[float]]:
    """Generate embedding for the given text"""
    if not text:
        return None

    model = await get_default_embedding_model()
    
    # 如果没有配置 embedding 模型，使用离线本地模型
    if not model:
        logger.info("No embedding model configured, falling back to local CPU model")
        from common.local_embedding import generate_embedding_local
        return await generate_embedding_local(text)

    try:
        api_key = model["api_key"] or "empty"
        base_url = model.get("api_domain") or ""

        # 验证 base_url 是否有效
        if not base_url or not base_url.strip():
            logger.warning("API domain is empty, falling back to local CPU model")
            from common.local_embedding import generate_embedding_local
            return await generate_embedding_local(text)

        # 确保 base_url 包含协议前缀
        base_url = base_url.strip()
        if not base_url.startswith(("http://", "https://")):
            # 默认使用 https，如果是本地地址则使用 http
            if base_url.startswith(("localhost", "127.0.0.1", "0.0.0.0")):
                base_url = f"http://{base_url}"
            else:
                base_url = f"https://{base_url}"

        # Special handling for Ollama to ensure OpenAI compatibility
        if model["supplier"] == 3:  # Ollama
            if not base_url.endswith("/v1"):
                base_url = f"{base_url.rstrip('/')}/v1"

        # 使用 async with 确保客户端被正确关闭
        async with AsyncOpenAI(api_key=api_key, base_url=base_url) as client:
            response = await client.embeddings.create(model=model["base_model"], input=text)

            if response.data:
                return response.data[0].embedding

    except Exception as e:
        # 在线 embedding 失败时降级为本地模型，避免在控制台打印完整异常堆栈
        logger.warning(
            "Failed to generate embedding with online model: %s, falling back to local CPU model",
            e,
        )
        # 在线模型失败时，回退到本地模型
        from common.local_embedding import generate_embedding_local
        return await generate_embedding_local(text)

    return None
