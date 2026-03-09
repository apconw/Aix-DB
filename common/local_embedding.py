"""
离线 Embedding 模型支持
当没有配置在线 embedding 模型时，使用本地 CPU 模式模型作为回退
"""

import logging
import os
import threading
from typing import List, Optional

logger = logging.getLogger(__name__)

# 全局锁，用于线程安全的模型初始化
_lock = threading.Lock()
_embedding_model: Optional[object] = None

# 默认模型配置
DEFAULT_LOCAL_MODEL_PATH = os.getenv("LOCAL_MODEL_PATH", "./models")
DEFAULT_EMBEDDING_MODEL_ID = os.getenv(
    "DEFAULT_EMBEDDING_MODEL", "shibing624/text2vec-base-chinese"
)


# 模型会下载到: {LOCAL_MODEL_PATH}/embedding/{model_name}/ 或标准 HuggingFace 缓存目录
def _get_local_model_path():
    """获取本地模型路径，支持多种路径格式"""
    model_id = DEFAULT_EMBEDDING_MODEL_ID

    # 1. 检查 HuggingFace 标准缓存目录结构: models/models--namespace--name/
    hf_cache_name = model_id.replace(
        "/", "--"
    )  # shibing624/text2vec-base-chinese -> shibing624--text2vec-base-chinese
    hf_cache_path = os.path.join(DEFAULT_LOCAL_MODEL_PATH, f"models--{hf_cache_name}")
    if os.path.exists(hf_cache_path):
        # 查找 snapshots 目录下的实际模型路径
        snapshots_dir = os.path.join(hf_cache_path, "snapshots")
        if os.path.exists(snapshots_dir):
            # 获取第一个快照目录
            snapshots = [
                d
                for d in os.listdir(snapshots_dir)
                if os.path.isdir(os.path.join(snapshots_dir, d))
            ]
            if snapshots:
                return os.path.join(snapshots_dir, snapshots[0])
        return hf_cache_path

    # 2. 检查自定义路径: models/embedding/shibing624_text2vec-base-chinese/
    custom_name = model_id.replace(
        "/", "_"
    )  # shibing624/text2vec-base-chinese -> shibing624_text2vec-base-chinese
    custom_path = os.path.join(DEFAULT_LOCAL_MODEL_PATH, "embedding", custom_name)
    if os.path.exists(custom_path):
        return custom_path

    # 3. 如果都找不到，返回 None（让 HuggingFace 使用模型 ID）
    return None


def _get_local_embedding_model():
    """
    获取本地 embedding 模型实例（单例模式，线程安全）

    Returns:
        Embeddings 实例，如果加载失败则返回 None
    """
    global _embedding_model

    if _embedding_model is not None:
        return _embedding_model

    with _lock:
        # 双重检查锁定
        if _embedding_model is not None:
            return _embedding_model

        try:
            # 设置环境变量，避免 tokenizers 并行警告
            os.environ["TOKENIZERS_PARALLELISM"] = "false"

            # 禁用 HuggingFace Hub 连接，避免网络不可达时的连接错误
            # 使用离线模式，仅使用本地缓存的模型
            os.environ["HF_HUB_OFFLINE"] = "1"
            logger.debug("Set HF_HUB_OFFLINE=1 to disable HuggingFace Hub connections")

            # 设置 HuggingFace 缓存目录到可写位置，避免在只读文件系统中写入错误
            # 固定使用 /tmp/huggingface_cache 作为缓存目录（容器内可写）
            cache_dir = "/tmp/huggingface_cache"
            os.environ["HF_HOME"] = cache_dir
            os.environ["HF_HUB_CACHE"] = cache_dir  # 设置 Hub 缓存目录
            os.environ["TRANSFORMERS_CACHE"] = cache_dir
            os.environ["SENTENCE_TRANSFORMERS_HOME"] = (
                cache_dir  # Sentence Transformers 缓存目录
            )
            # 确保缓存目录存在
            os.makedirs(cache_dir, exist_ok=True)
            logger.debug(f"Set HuggingFace cache directory to: {cache_dir}")

            # 优先使用本地路径，如果不存在则使用模型 ID（会自动下载）
            local_model_path = _get_local_model_path()
            # 将 cache_folder 设置为可写目录，避免在只读模型目录中写入缓存文件
            cache_folder = cache_dir
            model_id = DEFAULT_EMBEDDING_MODEL_ID

            # 检查本地路径是否存在
            if local_model_path and os.path.exists(local_model_path):
                model_name = local_model_path
                logger.info(f"Using local model path: {model_name}")
            else:
                # 使用模型 ID，会自动下载到 cache_folder
                # 注意：由于设置了 HF_HUB_OFFLINE=1，如果模型不存在会失败
                model_name = model_id
                logger.warning(
                    f"Model not found locally at {local_model_path or 'any path'}, "
                    f"will try to use model ID: {model_id} (offline mode enabled, download will fail if model not cached)"
                )

            # 尝试导入 HuggingFaceEmbeddings
            # 优先使用 langchain_huggingface（推荐，避免弃用警告）
            HuggingFaceEmbeddings = None
            try:
                from langchain_huggingface import HuggingFaceEmbeddings

                logger.debug("Using langchain_huggingface for local embedding model")
            except ImportError as e1:
                logger.warning(
                    f"langchain_huggingface not available: {e1}. "
                    "Falling back to langchain_community (deprecated). "
                    "Please install: pip install langchain-huggingface sentence-transformers"
                )
                # 回退到 langchain_community（已弃用，但作为备选）
                try:
                    from langchain_community.embeddings import HuggingFaceEmbeddings

                    logger.warning(
                        "Using deprecated langchain_community.embeddings.HuggingFaceEmbeddings"
                    )
                except ImportError as e2:
                    logger.error(
                        f"HuggingFaceEmbeddings not available. "
                        f"langchain_huggingface error: {e1}, "
                        f"langchain_community error: {e2}. "
                        "Please install: pip install langchain-huggingface sentence-transformers"
                    )
                    return None

            if HuggingFaceEmbeddings is None:
                return None

            # 创建模型实例（CPU 模式）
            # HuggingFaceEmbeddings 会自动处理：
            # - 如果 model_name 是本地路径，直接使用
            # - 如果 model_name 是模型 ID，会自动下载到 cache_folder
            try:
                _embedding_model = HuggingFaceEmbeddings(
                    model_name=model_name,
                    cache_folder=cache_folder,
                    model_kwargs={"device": "cpu"},
                    encode_kwargs={"normalize_embeddings": True},
                )

                logger.info("✅ Local embedding model loaded successfully")
                return _embedding_model
            except ImportError as import_err:
                # 捕获缺少依赖的错误（如 sentence-transformers）
                error_msg = str(import_err)
                if (
                    "sentence_transformers" in error_msg
                    or "sentence-transformers" in error_msg
                ):
                    logger.error(
                        f"Missing required dependency: sentence-transformers. "
                        f"Please install it with: pip install sentence-transformers"
                    )
                else:
                    logger.error(
                        f"Import error when loading embedding model: {import_err}"
                    )
                return None

        except Exception as e:
            # 本地 embedding 模型加载失败时只输出简要错误，避免在控制台刷堆栈
            logger.warning("Failed to load local embedding model: %s", e)
            return None


async def generate_embedding_local(text: str) -> Optional[List[float]]:
    """
    使用本地模型生成 embedding（异步包装）

    Args:
        text: 要生成 embedding 的文本

    Returns:
        embedding 向量列表，如果失败则返回 None
    """
    if not text:
        return None

    model = _get_local_embedding_model()
    if not model:
        logger.warning("Local embedding model not available")
        return None

    try:
        # embed_query 是同步方法，在异步环境中需要在线程池中执行
        import asyncio

        loop = asyncio.get_event_loop()
        embedding = await loop.run_in_executor(None, model.embed_query, text)
        return embedding
    except Exception as e:
        logger.error(
            f"Failed to generate embedding with local model: {e}", exc_info=True
        )
        return None


def generate_embedding_local_sync(text: str) -> Optional[List[float]]:
    """
    使用本地模型生成 embedding（同步版本）

    Args:
        text: 要生成 embedding 的文本

    Returns:
        embedding 向量列表，如果失败则返回 None
    """
    if not text:
        return None

    model = _get_local_embedding_model()
    if not model:
        logger.warning("Local embedding model not available")
        return None

    try:
        embedding = model.embed_query(text)
        return embedding
    except Exception as e:
        logger.error(
            f"Failed to generate embedding with local model: {e}", exc_info=True
        )
        return None
        return None
