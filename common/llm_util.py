import os
from langchain_community.chat_models import ChatOpenAI
from langchain_community.chat_models.tongyi import ChatTongyi


def get_llm():
    model_type = os.getenv("MODEL_TYPE", "qwen").strip()
    model_name = os.getenv("MODEL_NAME", "qwen-plus")
    temperature_str = os.getenv("MODEL_TEMPERATURE", "0.75")
    model_api_key = os.getenv("MODEL_API_KEY")
    model_base_url = os.getenv("MODEL_BASE_URL")

    # 校验必要参数
    if not model_type:
        raise ValueError("Environment variable MODEL_TYPE is not set or is empty.")

    if not model_api_key:
        raise ValueError("Environment variable MODEL_API_KEY is required.")

    # 安全转换 temperature
    try:
        temperature = float(temperature_str)
    except ValueError:
        raise ValueError(f"Invalid MODEL_TEMPERATURE value: {temperature_str}. Must be a float.")

    model_map = {
        "openai": lambda: ChatOpenAI(
            model=model_name,
            temperature=temperature,
            base_url=model_base_url,
            api_key=model_api_key,
        ),
        "qwen": lambda: ChatTongyi(
            model=model_name,
            api_key=model_api_key,
            # temperature=0.7,
            streaming=True,
        ),
    }

    if model_type in model_map:
        return model_map[model_type]()
    else:
        raise ValueError(f"Unsupported MODEL_TYPE: {model_type}. Supported types: {', '.join(model_map.keys())}")
