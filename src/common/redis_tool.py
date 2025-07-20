import redis
from redis.exceptions import ConnectionError
from config import serv


class RedisTool:
    """
    redis 工具类
    """

    def __init__(
        self, host=serv.host, port=serv.port, db=0, password=serv.redis_password
    ***REMOVED***:
        self.redis_client = redis.Redis(
            host=host, port=port, db=db, password=password, decode_responses=True
        ***REMOVED***

    def set_key(self, key, value***REMOVED***:
        try:
            return self.redis_client.set(key, value***REMOVED***
        except ConnectionError as e:
            print(f"Connection error: {e***REMOVED***"***REMOVED***
            return False

    def get_key(self, key***REMOVED***:
        try:
            return self.redis_client.get(key***REMOVED***
        except ConnectionError as e:
            print(f"Connection error: {e***REMOVED***"***REMOVED***
            return None

    def delete_key(self, key***REMOVED***:
        try:
            return self.redis_client.delete(key***REMOVED***
        except ConnectionError as e:
            print(f"Connection error: {e***REMOVED***"***REMOVED***
            return False

    def exists(self, key***REMOVED***:
        try:
            return self.redis_client.exists(key***REMOVED***
        except ConnectionError as e:
            print(f"Connection error: {e***REMOVED***"***REMOVED***
            return False

    def ping(self***REMOVED***:
        try:
            return self.redis_client.ping(***REMOVED***
        except ConnectionError as e:
            print(f"Connection error: {e***REMOVED***"***REMOVED***
            return False

    def close(self***REMOVED***:
        self.redis_client.close(***REMOVED***


# 使用示例
if __name__ == "__main__":
    redis_tool = RedisTool(host="localhost", port=16379, password="difyai123456"***REMOVED***

    # 设置键值对
    result = redis_tool.set_key("test_key", "Hello, Redis!"***REMOVED***
    print(f"Set key: {result***REMOVED***"***REMOVED***

    # 获取键值对
    value = redis_tool.get_key("test_key"***REMOVED***
    print(f"Get key: {value***REMOVED***"***REMOVED***

    # 删除键
    deleted = redis_tool.delete_key("test_key"***REMOVED***
    print(f"Deleted key: {deleted***REMOVED***"***REMOVED***

    # 检查键是否存在
    exists = redis_tool.exists("test_key"***REMOVED***
    print(f"Key exists: {exists***REMOVED***"***REMOVED***

    # 测试连接
    ping_result = redis_tool.ping(***REMOVED***
    print(f"Ping: {ping_result***REMOVED***"***REMOVED***

    # 关闭连接
    redis_tool.close(***REMOVED***
