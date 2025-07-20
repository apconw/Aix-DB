from enum import Enum


class SysCodeEnum(Enum***REMOVED***:
    """
    系统状态码定义
    """

    c_200 = (200, "ok", "ok"***REMOVED***

    c_401 = (401, "登录异常", "登录异常"***REMOVED***

    c_400 = (401, "无效Token", "无效Token"***REMOVED***

    c_9999 = (9999, "系统异常", "系统异常"***REMOVED***


class DiFyAppEnum(Enum***REMOVED***:
    """
    DiFy app-key 枚举
    """

    DATABASE_QA = ("DATABASE_QA", "数据问答"***REMOVED***

    FILEDATA_QA = ("FILEDATA_QA", "表格问答"***REMOVED***

    COMMON_QA = ("COMMON_QA", "通用问答"***REMOVED***

    REPORT_QA = ("REPORT_QA", "报告问答"***REMOVED***


class DataTypeEnum(Enum***REMOVED***:
    """
    自定义数据类型枚举
    """

    ANSWER = ("t02", "答案"***REMOVED***

    LOCATION = ("t03", "溯源"***REMOVED***

    BUS_DATA = ("t04", "业务数据"***REMOVED***

    TASK_ID = ("t11", "任务ID,方便后续点赞等操作"***REMOVED***

    STREAM_END = ("t99", "流式推流结束"***REMOVED***


class DiFyCodeEnum(Enum***REMOVED***:
    """
    DiFy 返回数据流定义
    """

    MESSAGE = ("message", "答案"***REMOVED***

    MESSAGE_END = ("message_end", "结束"***REMOVED***

    MESSAGE_ERROR = ("error", "错误"***REMOVED***
