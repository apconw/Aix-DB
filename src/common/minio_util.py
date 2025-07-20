import asyncio
import io
import logging
import os
from concurrent.futures import ThreadPoolExecutor
from datetime import timedelta
from minio import Minio, S3Error
import traceback
from sanic import Request
from constants.code_enum import SysCodeEnum as SysCode
from uuid import uuid4
import mimetypes
from common.exception import MyException

logger = logging.getLogger(__name__***REMOVED***


class MinioUtils:
    """
    上传文件工具类
    """

    def __init__(self***REMOVED***:
        self.client = self._build_client(***REMOVED***
        self.executor = ThreadPoolExecutor(max_workers=5***REMOVED***  # 多线程上传控制最大并发数

    @staticmethod
    def _build_client(***REMOVED***:
        """初始化MinIO客户端"""
        minio_endpoint = os.getenv("MINIO_ENDPOINT"***REMOVED***
        access_key = os.getenv("MINIO_ACCESS_KEY"***REMOVED***
        secret_key = os.getenv("MiNIO_SECRET_KEY"***REMOVED***
        if not all([minio_endpoint, access_key, secret_key]***REMOVED***:
            raise MyException(SysCode.c_9999, "MinIO环境变量未正确配置"***REMOVED***
        return Minio(endpoint=minio_endpoint, access_key=access_key, secret_key=secret_key, secure=False***REMOVED***

    def ensure_bucket(self, bucket_name: str***REMOVED*** -> None:
        """确保bucket存在，不存在则创建"""
        try:
            found = self.client.bucket_exists(bucket_name***REMOVED***
            if not found:
                self.client.make_bucket(bucket_name***REMOVED***
                logger.info(f"Bucket '{bucket_name***REMOVED***' created."***REMOVED***
            else:
                logger.info(f"Bucket '{bucket_name***REMOVED***' already exists."***REMOVED***
        except S3Error as err:
            logger.error(f"Error checking or creating bucket {bucket_name***REMOVED***: {err***REMOVED***"***REMOVED***
            raise MyException(SysCode.c_9999***REMOVED***

    def upload_file_from_request(self, request: Request, bucket_name: str = "filedata", expires: timedelta = timedelta(days=7***REMOVED******REMOVED*** -> dict:
        """
        从请求中读取文件数据并上传到MinIO服务器，返回预签名URL。

        参数:
        - request: Sanic请求对象
        - bucket_name: 存储桶名称
        - expires: 链接过期时间，默认为7天

        返回:
        - 包含object_key的字典
        """
        try:
            file_data = request.files.get("file"***REMOVED***
            if not file_data:
                raise MyException(SysCode.c_9999, "未找到文件数据"***REMOVED***

            file_stream = io.BytesIO(file_data.body***REMOVED***
            file_length = len(file_data.body***REMOVED***
            object_name = file_data.name

            self.ensure_bucket(bucket_name***REMOVED***
            self.client.put_object(bucket_name, object_name, file_stream, file_length, content_type=file_data.type***REMOVED***
            logger.info(f"File successfully uploaded as {object_name***REMOVED***."***REMOVED***

        ***REMOVED***"object_key": object_name***REMOVED***
        except Exception as err:
            logger.error(f"Error uploading file from request: {err***REMOVED***"***REMOVED***
            traceback.print_exception(err***REMOVED***
            raise MyException(SysCode.c_9999***REMOVED***

    def upload_to_minio_form_stream(self, file_stream: io.BytesIO, bucket_name: str = "filedata", file_name: str | None = None***REMOVED*** -> str | None:
        """
        将给定的字节流上传到MinIO，并返回上传文件的键（key）。

        :param file_stream: 文件的字节流 (BytesIO***REMOVED***
        :param bucket_name: MinIO存储桶名称
        :param file_name: 上传文件的名称（可选）
        :return: 上传文件的键（key）或None如果上传失败
        """
        try:
            self.ensure_bucket(bucket_name***REMOVED***

            if not file_name:
                file_extension = mimetypes.guess_extension(mimetypes.guess_type(file_stream.getvalue(***REMOVED******REMOVED***[0]***REMOVED*** or ""
                file_name = f"{uuid4(***REMOVED******REMOVED***{file_extension***REMOVED***"

            file_stream.seek(0***REMOVED***
            file_length = len(file_stream.getvalue(***REMOVED******REMOVED***
            content_type, _ = mimetypes.guess_type(file_name***REMOVED*** or ("application/octet-stream", None***REMOVED***

            self.client.put_object(bucket_name, file_name, file_stream, file_length, content_type=content_type***REMOVED***
            logger.info(f"File uploaded successfully with key: {file_name***REMOVED***"***REMOVED***
            return file_name
        except Exception as e:
            logger.error(f"An error occurred while uploading to MinIO: {e***REMOVED***"***REMOVED***
            return None

    def get_file_url_by_key(self, bucket_name: str = "filedata", object_key: str | None = None***REMOVED*** -> str:
        """
        通过object_key获取文件url
        """
        try:
            if not object_key:
                raise MyException(SysCode.c_9999, "object_key不能为空"***REMOVED***
            return self.client.presigned_get_object(bucket_name, object_key, expires=timedelta(days=7***REMOVED******REMOVED***
        except Exception as err:
            logger.error(f"Error getting file URL by key: {err***REMOVED***"***REMOVED***
            traceback.print_exception(err***REMOVED***
            raise MyException(SysCode.c_9999***REMOVED***
