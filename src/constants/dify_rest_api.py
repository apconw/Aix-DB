import os


class DiFyRestApi:
    """
    dify 接口定义
    """

    # 对话接口
    DIFY_REST_CHAT = "/v1/chat-messages"

    # 对话反馈接口
    DIFY_REST_FEEDBACK = "/v1/messages/:message_id/feedbacks"

    # 获取下一轮建议问题列表
    DIFY_REST_SUGGESTED = "/v1/messages/:message_id/suggested"

    # 停止对话
    DIFY_REST_STOP = "/v1/chat-messages/:task_id/stop"

    @classmethod
    def _get_env(cls, name***REMOVED***:
        value = os.getenv(name***REMOVED***
        if not value:
            raise Exception(f"{name***REMOVED*** is not set"***REMOVED***
        return value

    @classmethod
    def build_url(cls, api_path***REMOVED***:
        """
        构建请求地址
        :param api_path:
        :return:
        """
        base_url = cls._get_env("DIFY_SERVER_URL"***REMOVED***
        return f"{base_url***REMOVED***{api_path***REMOVED***"

    @classmethod
    def replace_path_params(cls, api_path, path_params***REMOVED***:
        """
        替换API路径中的占位符为实际的路径参数值
        :param cls
        :param api_path: 包含占位符的API路径模板
        :param path_params: 一个字典，键是占位符名称（不包含前缀冒号），值是要替换的路径参数值
        :return: 替换后的API路径
        """
        for key, value in path_params.items(***REMOVED***:
            # 使用 :key 格式的占位符以匹配路径参数
            placeholder = ":{***REMOVED***".format(key***REMOVED***
            if placeholder in api_path:
                api_path = api_path.replace(placeholder, str(value***REMOVED******REMOVED***
        return cls.build_url(api_path***REMOVED***
