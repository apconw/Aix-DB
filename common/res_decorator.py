import json
import logging
import traceback
from datetime import date, datetime
from functools import wraps

from sanic import response

from common.exception import MyException
from constants.code_enum import SysCodeEnum


class CustomJSONEncoder(json.JSONEncoder***REMOVED***:
    """
    自定义的 JSON 编码器，用于处理日期类型
    """

    def default(self, obj***REMOVED***:
        """

        :param obj:
        :return:
        """
        if isinstance(obj, date***REMOVED***:
            # 处理 date 类型
            return obj.strftime("%Y-%m-%d"***REMOVED***
        elif isinstance(obj, datetime***REMOVED***:
            # 处理 datetime 类型
            return obj.strftime("%Y-%m-%d %H:%M:%S"***REMOVED***
        return super(***REMOVED***.default(obj***REMOVED***


def async_json_resp(func***REMOVED***:
    """
    Decorator for asynchronous json response
    """

    @wraps(func***REMOVED***
    async def http_res_wrapper(request, *args, **kwargs***REMOVED***:
        """
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        data = None
        # 获取请求方法和参数
        method = request.method
        path = request.path
        params = request.args
        content_type = request.content_type
        content_types = ["application/json"]
        if content_type in content_types:
            json_body = request.json if request.json else {***REMOVED***
        else:
            json_body = ""

        try:
            data = await func(request, *args, **kwargs***REMOVED***
            body = {
                "code": SysCodeEnum.c_200.value[0],
                "msg": SysCodeEnum.c_200.value[1],
                "data": data,
            ***REMOVED***
            res = response.json(body, dumps=CustomJSONEncoder(***REMOVED***.encode***REMOVED***

            logging.info(f"Request Path: {path***REMOVED***,Method: {method***REMOVED***, Params: {params***REMOVED***, JSON Body: {json_body***REMOVED***, Response: {body***REMOVED***"***REMOVED***

            return res

        except MyException as e:
            body = {
                "code": e.code,
                "msg": e.message,
                "data": data,
            ***REMOVED***

            res = response.json(body, dumps=CustomJSONEncoder(***REMOVED***.encode***REMOVED***

            logging.info(f"Request Path: {path***REMOVED***, Method: {method***REMOVED***,Params: {params***REMOVED***, JSON Body: {json_body***REMOVED***, Response: {body***REMOVED***"***REMOVED***
            return res

        except Exception as e:
            body = {
                "code": SysCodeEnum.c_9999.value[0],
                "msg": SysCodeEnum.c_9999.value[1],
                "data": data,
            ***REMOVED***
            res = response.json(body, dumps=CustomJSONEncoder(***REMOVED***.encode***REMOVED***

            logging.info(f"Request Path: {path***REMOVED***, Method: {method***REMOVED***,Params: {params***REMOVED***, JSON Body: {json_body***REMOVED***, Response: {body***REMOVED***"***REMOVED***

            traceback.print_exception(e***REMOVED***
            return res

    return http_res_wrapper
