import decimal
import json
from datetime import date, datetime


class DateEncoder(json.JSONEncoder***REMOVED***:
    """
    日期格式
    """

    def default(self, obj***REMOVED***:
        """

        :param obj:
        :return:
        """
        # 处理返回数据中有date类型的数据
        if isinstance(obj, date***REMOVED***:
            return obj.strftime("%Y-%m-%d"***REMOVED***
        # 处理返回数据中有datetime类型的数据
        elif isinstance(obj, datetime***REMOVED***:
            return obj.strftime("%Y-%m-%d %H:%M:%S"***REMOVED***
        # 处理返回数据中有decimal类型的数据
        elif isinstance(obj, decimal.Decimal***REMOVED***:
            return float(obj***REMOVED***
        else:
            return json.JSONEncoder.default(self, obj***REMOVED***
