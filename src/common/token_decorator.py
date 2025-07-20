import os
from datetime import datetime

import jwt
from sanic import response


def check_token(f***REMOVED***:
    """
    jwt token 校验注解
    """

    async def wrapper(request, *args, **kwargs***REMOVED***:
        token = request.headers.get("Authorization"***REMOVED***
        if not token:
            return response.json({"message": "无效Token", "code": 401***REMOVED***, status=401***REMOVED***
        try:
            # 去掉 Bearer 前缀（如果有的话）
            if token.startswith("Bearer "***REMOVED***:
                token = token.split(" "***REMOVED***[1]

            # 解码 JWT token
            payload = jwt.decode(token, key=os.getenv("JWT_SECRET_KEY"***REMOVED***, algorithms=["HS256"]***REMOVED***
            # 检查 token 是否过期
            if "exp" in payload and datetime.utcfromtimestamp(payload["exp"]***REMOVED*** < datetime.utcnow(***REMOVED***:
                return response.json({"message": "Token已过期", "code": 401***REMOVED***, status=401***REMOVED***

            request.ctx.user_payload = payload
        except jwt.ExpiredSignatureError as e:
            return response.json({"message": "Token已过期", "code": 401***REMOVED***, status=401***REMOVED***
        except Exception as e:
            return response.json({"message": "无效Token", "code": 401***REMOVED***, status=401***REMOVED***

        # 继续处理请求
        return await f(request, *args, **kwargs***REMOVED***

    return wrapper
