from constants.code_enum import SysCodeEnum


class MyException(Exception***REMOVED***:
    """
    自定义异常类，用于处理特定业务逻辑中的异常情况。

    该类继承自内置的 Exception 类，接收一个 SysCodeEnum 类型的参数，
    从中提取错误代码、错误消息和详细信息。
    """

    def __init__(self, ex_code: SysCodeEnum, detail: str = ""***REMOVED***:
        """
        初始化自定义异常实例。

        Args:
            ex_code (SysCodeEnum***REMOVED***: 错误代码枚举值，包含错误代码、错误消息和详细信息。
            detail (str, optional***REMOVED***: 额外的错误详细信息，默认为空字符串。
        """
        self.code = ex_code.value[0]
        self.message = ex_code.value[1]
        self.detail = ex_code.value[2] if not detail else detail
        super(***REMOVED***.__init__(f"{ex_code.name***REMOVED***({self.code***REMOVED******REMOVED***: {self.message***REMOVED*** - {self.detail***REMOVED***"***REMOVED***

    def __str__(self***REMOVED*** -> str:
        """
        返回异常的字符串表示形式，包含错误代码、错误消息和详细信息。

        Returns:
            str: 异常的字符串表示。
        """
        return f"MyException: code: {self.code***REMOVED***, message: {self.message***REMOVED*** - detail: {self.detail***REMOVED***"

    def to_dict(self***REMOVED*** -> dict:
        """
        将异常信息转换为字典格式，方便在 API 响应中返回。

        Returns:
            dict: 包含错误代码和错误消息的字典。
        """
    ***REMOVED***"code": self.code, "message": self.message***REMOVED***
