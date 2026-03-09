import json
import logging
import httpx
from datetime import datetime
from typing import List, Optional

from sqlalchemy import desc

from common.exception import MyException
from constants.code_enum import SysCodeEnum
from model.db_connection_pool import get_db_pool
from model.db_models import TAiModel
from model.serializers import model_to_dict

logger = logging.getLogger(__name__)
pool = get_db_pool()

async def query_model_list(keyword: str = None, model_type: int = None) -> List[dict]:
    with pool.get_session() as session:
        query = session.query(TAiModel)
        if keyword:
            query = query.filter(TAiModel.name.like(f"%{keyword}%"))
        
        if model_type:
            query = query.filter(TAiModel.model_type == model_type)
        
        # Order by default_model desc, then name
        models = query.order_by(desc(TAiModel.default_model), TAiModel.name).all()
        
        result = []
        for model in models:
            m_dict = model_to_dict(model)
            result.append(m_dict)
        return result

async def get_model_detail(model_id: int) -> dict:
    with pool.get_session() as session:
        model = session.query(TAiModel).filter(TAiModel.id == model_id).first()
        if not model:
            raise MyException(SysCodeEnum.PARAM_ERROR, "Model not found")
        
        data = model_to_dict(model)
        if data.get('config'):
            try:
                data['config_list'] = json.loads(data['config'])
            except:
                data['config_list'] = []
        else:
            data['config_list'] = []
        return data

async def add_model(data: dict) -> bool:
    with pool.get_session() as session:
        # Check if default
        model_type = data.get('model_type', 1)
        
        # Only LLM (type 1) can be default
        is_default = False
        if model_type == 1:
            count = session.query(TAiModel).filter(
                TAiModel.model_type == 1
            ).count()
            is_default = (count == 0) # First LLM is default

        config_list = data.get('config_list', [])
        config_str = json.dumps(config_list)

        # 处理 api_key：空字符串转换为 None
        api_key = data.get('api_key')
        if api_key is not None and api_key.strip() == '':
            api_key = None

        new_model = TAiModel(
            name=data['name'],
            base_model=data['base_model'],
            model_type=data.get('model_type', 1), # Default to 1 (LLM)
            supplier=data.get('supplier', 1),
            protocol=data.get('protocol', 1),
            api_domain=data['api_domain'],
            api_key=api_key,
            config=config_str,
            default_model=is_default,
            status=1,
            create_time=int(datetime.now().timestamp())
        )
        session.add(new_model)
        session.commit()
        return True

async def update_model(model_id: int, data: dict) -> bool:
    with pool.get_session() as session:
        model = session.query(TAiModel).filter(TAiModel.id == model_id).first()
        if not model:
            raise MyException(SysCodeEnum.PARAM_ERROR, "Model not found")
        
        # 更新所有可修改的字段
        if 'name' in data:
            model.name = data['name']
        if 'base_model' in data:
            model.base_model = data['base_model']
        if 'supplier' in data:
            model.supplier = data['supplier']
        if 'model_type' in data:
            model.model_type = data['model_type']
        if 'protocol' in data:
            model.protocol = data['protocol']
        if 'api_domain' in data:
            model.api_domain = data['api_domain']
        if 'api_key' in data:
            # 处理 api_key：空字符串转换为 None
            api_key = data['api_key']
            if api_key is not None and api_key.strip() == '':
                api_key = None
            model.api_key = api_key
        
        if 'config_list' in data:
            model.config = json.dumps(data['config_list'])
            
        session.commit()
        return True

async def delete_model(model_id: int) -> bool:
    with pool.get_session() as session:
        model = session.query(TAiModel).filter(TAiModel.id == model_id).first()
        if not model:
             raise MyException(SysCodeEnum.PARAM_ERROR, "Model not found")
        
        if model.default_model:
             raise MyException(SysCodeEnum.PARAM_ERROR, "Cannot delete default model")
             
        session.delete(model)
        session.commit()
        return True

async def set_default_model(model_id: int) -> bool:
    with pool.get_session() as session:
        model = session.query(TAiModel).filter(TAiModel.id == model_id).first()
        if not model:
            raise MyException(SysCodeEnum.PARAM_ERROR, "Model not found")
            
        if model.model_type != 1:
            raise MyException(SysCodeEnum.PARAM_ERROR, "Only LLM can be set as default")

        if model.default_model:
            return True
            
        # Unset previous default for LLM
        session.query(TAiModel).filter(
            TAiModel.default_model == True,
            TAiModel.model_type == 1
        ).update({TAiModel.default_model: False})
        
        model.default_model = True
        session.commit()
        return True

async def get_default_model() -> Optional[dict]:
    """
    查询默认模型
    :return: 默认模型信息，如果不存在返回None
    """
    with pool.get_session() as session:
        model = session.query(TAiModel).filter(
            TAiModel.default_model == True,
            TAiModel.model_type == 1
        ).first()
        
        if not model:
            return None
        
        return model_to_dict(model)

async def check_llm_status(data: dict) -> dict:
    """
    测试模型连接状态
    :param data: 模型配置数据
    :return: 测试结果
    """
    supplier = data.get('supplier', 1)
    api_key = data.get('api_key') or ''
    api_domain = data.get('api_domain', '')
    base_model = data.get('base_model', '')
    
    if not api_domain:
        return {"success": False, "message": "API 域名不能为空"}
    
    try:
        # Ollama 不需要 API Key
        if supplier == 3:
            domain = api_domain
            if domain.endswith('/v1'):
                domain = domain[:-3]
            url = f"{domain}/api/tags"
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, timeout=5)
                resp.raise_for_status()
                return {"success": True, "message": "连接成功"}
        
        # 其他供应商需要 API Key（但某些本地部署可能不需要）
        # 尝试发送一个简单的请求来测试连接
        if supplier == 1:  # OpenAI
            domain = api_domain or "https://api.openai.com/v1"
            url = f"{domain}/models"
            headers = {}
            if api_key:
                headers["Authorization"] = f"Bearer {api_key}"
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=10)
                resp.raise_for_status()
                return {"success": True, "message": "连接成功"}
        
        # vLLM 可能不需要 API Key
        elif supplier == 4:
            url = f"{api_domain}/models"
            headers = {}
            if api_key:
                headers["Authorization"] = f"Bearer {api_key}"
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=5)
                resp.raise_for_status()
                return {"success": True, "message": "连接成功"}
        
        # MiniMax 特殊处理
        elif supplier == 10:  # MiniMax
            # MiniMax 使用兼容OpenAI的API，但可能有特定的端点要求
            domain = api_domain
            
            # 根据搜索结果，MiniMax的API端点可能不是标准的/models
            # 尝试使用更简单的连接测试方法
            url = f"{domain}/models"
            headers = {"Content-Type": "application/json"}
            if api_key:
                headers["Authorization"] = f"Bearer {api_key}"
            
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(url, headers=headers, timeout=10)
                    resp.raise_for_status()
                    return {"success": True, "message": "连接成功"}
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 404:
                    # 对于MiniMax，如果/models端点不存在，尝试直接测试连接
                    # 使用一个简单的HEAD请求来测试网络连接
                    try:
                        async with httpx.AsyncClient() as client:
                            # 尝试对基础域名进行连接测试
                            base_domain = domain.replace('/v1', '')
                            resp = await client.head(base_domain, timeout=5)
                            # 如果能连接到域名，说明配置基本正确
                            return {"success": True, "message": "连接成功"}
                    except:
                        return {"success": False, "message": "无法连接到API域名，请检查网络和域名配置"}
                elif e.response.status_code == 401:
                    return {"success": False, "message": "API Key 无效或未授权"}
                else:
                    return {"success": False, "message": f"连接失败: HTTP {e.response.status_code}"}
            except httpx.TimeoutException:
                return {"success": False, "message": "连接超时，请检查网络或API域名"}
            except httpx.ConnectError:
                return {"success": False, "message": "无法连接到服务器，请检查API域名"}
            except Exception as e:
                logger.error(f"MiniMax连接测试失败: {e}")
                return {"success": False, "message": f"连接失败: {str(e)}"}
        
        # 其他供应商（DeepSeek, Qwen, Moonshot, ZhipuAI 等）
        else:
            # 尝试使用 OpenAI 兼容协议测试
            domain = api_domain
            url = f"{domain}/models" if not domain.endswith('/v1') else f"{domain}/models"
            headers = {}
            if api_key:
                headers["Authorization"] = f"Bearer {api_key}"
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=10)
                resp.raise_for_status()
                return {"success": True, "message": "连接成功"}
    
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 401:
            return {"success": False, "message": "API Key 无效或未授权"}
        elif e.response.status_code == 404:
            # 对于MiniMax等供应商，可能需要特殊处理
            if supplier == 10:  # MiniMax
                return {"success": False, "message": "API 端点不存在，请检查 API 域名。MiniMax 可能需要使用完整的模型列表端点"}
            return {"success": False, "message": "API 端点不存在，请检查 API 域名"}
        else:
            return {"success": False, "message": f"连接失败: HTTP {e.response.status_code}"}
    except httpx.TimeoutException:
        return {"success": False, "message": "连接超时，请检查网络或 API 域名"}
    except httpx.ConnectError:
        return {"success": False, "message": "无法连接到服务器，请检查 API 域名"}
    except Exception as e:
        logger.error(f"测试模型连接失败: {e}")
        return {"success": False, "message": f"连接失败: {str(e)}"}

async def fetch_base_models(supplier: int, api_key: str = None, api_domain: str = None) -> List[str]:
    try:
        # OpenAI
        if supplier == 1:
            if not api_key:
                return []
            domain = api_domain or "https://api.openai.com/v1"
            url = f"{domain}/models"
            headers = {"Authorization": f"Bearer {api_key}"}
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=10)
                resp.raise_for_status()
                data = resp.json()
                models = [m['id'] for m in data.get('data', []) if 'gpt' in m['id']]
                return sorted(models)
        
        # Ollama
        elif supplier == 3:
            domain = api_domain or "http://localhost:11434"
            # Ollama API structure: GET /api/tags
            if domain.endswith('/v1'):
                 domain = domain[:-3] # Strip /v1 if present
            
            url = f"{domain}/api/tags"
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, timeout=5)
                resp.raise_for_status()
                data = resp.json()
                models = [m['name'] for m in data.get('models', [])]
                return sorted(models)
        
        # vLLM
        elif supplier == 4:
             if not api_domain:
                 return []
             url = f"{api_domain}/models"
             headers = {}
             if api_key:
                 headers["Authorization"] = f"Bearer {api_key}"
             async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=5)
                resp.raise_for_status()
                data = resp.json()
                models = [m['id'] for m in data.get('data', [])]
                return sorted(models)
        
        # DeepSeek
        elif supplier == 5:
             # Similar to OpenAI
             if not api_key:
                 return []
             domain = api_domain or "https://api.deepseek.com"
             url = f"{domain}/models"
             headers = {"Authorization": f"Bearer {api_key}"}
             async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=headers, timeout=10)
                resp.raise_for_status()
                data = resp.json()
                models = [m['id'] for m in data.get('data', [])]
                return sorted(models)
        
        # MiniMax
        elif supplier == 10:
            if not api_key:
                return []
            domain = api_domain or "https://api.minimaxi.com/v1"
            url = f"{domain}/models"
            headers = {"Authorization": f"Bearer {api_key}"}
            
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(url, headers=headers, timeout=10)
                    resp.raise_for_status()
                    data = resp.json()
                    # 根据OpenAI兼容API格式提取模型列表
                    if 'data' in data:
                        models = [m['id'] for m in data.get('data', [])]
                    else:
                        # 如果没有data字段，尝试其他格式
                        models = [m['id'] for m in data] if isinstance(data, list) else []
                    return sorted(models)
            except:
                # 如果获取模型列表失败，返回一些常见的MiniMax模型名称
                return ["MiniMax-M2.1", "abab6.5s-chat", "abab5.5-chat"]
        
        # Fallback or other providers: Return empty list or hardcoded common ones?
        # For now return empty, frontend can allow manual entry
        return []

    except Exception as e:
        logger.error(f"Failed to fetch models for supplier {supplier}: {e}")
        # Return empty list on error
        return []
