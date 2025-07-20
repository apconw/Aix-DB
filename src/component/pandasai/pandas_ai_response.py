from typing import Any

import pandas as pd
from pandasai.responses.response_parser import ResponseParser
from pandasai.responses.response_serializer import ResponseSerializer


class PandasaiCustomResponse(ResponseParser***REMOVED***:
    """
    自定义返回值解析类型
    """

    def _init__(self, context***REMOVED*** -> None:
        super(***REMOVED***.__init__(context***REMOVED***

    def parse(self, result: dict***REMOVED*** -> Any:
        """

        :param result:
        :return:
        """
        if not isinstance(result, dict***REMOVED*** or any(
            key not in result for key in ["type", "value"]
        ***REMOVED***:
            raise ValueError("Unsupported result format"***REMOVED***

        return ResponseSerializer.serialize(result***REMOVED***
