import json
import logging
import os
import traceback
from datetime import datetime, timedelta

import jwt
import requests

from common.exception import MyException
from common.mysql_util import MysqlUtil
from constants.code_enum import SysCodeEnum, DiFyAppEnum
from constants.dify_rest_api import DiFyRestApi

logger = logging.getLogger(__name__***REMOVED***

mysql_client = MysqlUtil(***REMOVED***


async def authenticate_user(username, password***REMOVED***:
    """验证用户凭据并返回用户信息或 None"""
    sql = f"""select * from t_user where userName='{username***REMOVED***' and password='{password***REMOVED***'"""
    report_dict = MysqlUtil(***REMOVED***.query_mysql_dict(sql***REMOVED***
    if len(report_dict***REMOVED*** > 0:
        return report_dict[0]
    else:
        return False


async def generate_jwt_token(user_id, username***REMOVED***:
    """生成 JWT token"""
    payload = {"id": str(user_id***REMOVED***, "username": username, "exp": datetime.utcnow(***REMOVED*** + timedelta(hours=24***REMOVED******REMOVED***  # Token 过期时间
    token = jwt.encode(payload, os.getenv("JWT_SECRET_KEY"***REMOVED***, algorithm="HS256"***REMOVED***
    return token


async def decode_jwt_token(token***REMOVED***:
    """解析 JWT token 并返回 payload"""
    try:
        # 使用与生成 token 时相同的密钥和算法来解码 token
        payload = jwt.decode(token, key=os.getenv("JWT_SECRET_KEY"***REMOVED***, algorithms=["HS256"]***REMOVED***
        # 检查 token 是否过期
        if "exp" in payload and datetime.utcfromtimestamp(payload["exp"]***REMOVED*** < datetime.utcnow(***REMOVED***:
            raise jwt.ExpiredSignatureError("Token has expired"***REMOVED***
        return payload
    except jwt.ExpiredSignatureError as e:
        # 处理过期的 token
        return None, 401, str(e***REMOVED***
    except jwt.InvalidTokenError as e:
        # 处理无效的 token
        return None, 400, str(e***REMOVED***
    except Exception as e:
        # 处理其他可能的错误
        return None, 500, str(e***REMOVED***


async def get_user_info(request***REMOVED*** -> dict:
    """获取登录用户信息"""
    token = request.headers.get("Authorization"***REMOVED***

    # 检查 Authorization 头是否存在
    if not token:
        logging.error("Authorization header is missing"***REMOVED***
        raise MyException(SysCodeEnum.c_401***REMOVED***

    # 检查 Authorization 头格式是否正确
    if not token.startswith("Bearer "***REMOVED***:
        logging.error("Invalid Authorization header format"***REMOVED***
        raise MyException(SysCodeEnum.c_400***REMOVED***

    # 提取 token
    token = token.split(" "***REMOVED***[1].strip(***REMOVED***

    # 检查 token 是否为空
    if not token:
        logging.error("Token is empty or whitespace"***REMOVED***
        raise MyException(SysCodeEnum.c_400***REMOVED***

    try:
        # 解码 JWT token
        user_info = await decode_jwt_token(token***REMOVED***
    except Exception as e:
        logging.error(f"Failed to decode JWT token: {e***REMOVED***"***REMOVED***
        raise MyException(SysCodeEnum.c_401***REMOVED***

    return user_info


async def add_question_record(uuid_str, user_token, conversation_id, message_id, task_id, chat_id, question, t02_answer, t04_answer, qa_type***REMOVED***:
    """
    @:param uuid_str: 唯一ID
    @param user_token: 用户token
    @param conversation_id: dify会话ID
    @param message_id: 消息ID
    @param task_id: 任务ID
    @param chat_id: 聊天ID
    @param question: 问题
    @param t02_answer: 回答
    @param t04_answer: 回答
    @param qa_type: 问答类型
    记录用户问答记录，如果记录已存在，则更新之；否则，创建新记录。
    """
    try:
        # 解析token信息
        user_dict = await decode_jwt_token(user_token***REMOVED***
        user_id = user_dict["id"]

        # 文件问答时保存 minio/key
        file_key = ""
        if qa_type == DiFyAppEnum.FILEDATA_QA.value[0]:
            file_key = question.split("|"***REMOVED***[0]
            question = question.split("|"***REMOVED***[1]

        sql = f"select * from t_user_qa_record where user_id={user_id***REMOVED*** and chat_id='{chat_id***REMOVED***' and message_id='{message_id***REMOVED***'"
        log_dict = mysql_client.query_mysql_dict(sql***REMOVED***

        # 根据 message_id 判断是否是同一个问题
        if len(log_dict***REMOVED*** > 0:
            sql = f"""update t_user_qa_record set to4_answer='{json.dumps(t04_answer, ensure_ascii=False***REMOVED******REMOVED***' 
                    where user_id={user_id***REMOVED*** and chat_id='{chat_id***REMOVED***' and message_id='{message_id***REMOVED***'"""
            mysql_client.update(sql***REMOVED***
        else:
            insert_params = [
                uuid_str,
                user_id,
                conversation_id,
                message_id,
                task_id,
                chat_id,
                question,
                json.dumps(t02_answer, ensure_ascii=False***REMOVED***,
                qa_type,
                file_key,
        ***REMOVED***
            sql = (
                f" insert into t_user_qa_record(uuid,user_id,conversation_id, message_id, task_id,chat_id,question,to2_answer,qa_type,file_key***REMOVED*** "
                f"values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s***REMOVED***"
            ***REMOVED***
            mysql_client.insert(sql=sql, params=insert_params***REMOVED***

    except Exception as e:
        traceback.print_exception(e***REMOVED***
        logger.error(f"保存用户问答日志失败: {e***REMOVED***"***REMOVED***


async def delete_user_record(user_id, record_ids***REMOVED***:
    """
    删除用户问答记录
    :param user_id: 用户ID
    :param record_ids: 要删除的记录ID列表
    :return: None
    """
    # 确保 record_ids 是一个非空列表
    if not isinstance(record_ids, list***REMOVED*** or not record_ids:
        raise ValueError("record_ids 必须是非空列表"***REMOVED***

    # 创建 IN 子句和对应的参数列表
    in_clause = ", ".join(["%s"] * len(record_ids***REMOVED******REMOVED***
    sql = f"""
        DELETE FROM t_user_qa_record
        WHERE user_id = %s AND id IN ({in_clause***REMOVED******REMOVED***
    """

    # 将 user_id 添加到参数列表的开头
    params = [user_id] + record_ids

    # 执行更新操作
    mysql_client.update_params(sql=sql, params=params***REMOVED***


async def query_user_record(user_id, page, limit, search_text, chat_id***REMOVED***:
    """
    根据用户id查询用户问答记录
    :param page
    :param limit
    :param user_id
    :param search_text
    :param chat_id
    :return:
    """
    conditions = []
    if chat_id:
        conditions.append(f"chat_id = '{chat_id***REMOVED***'"***REMOVED***
    if search_text:
        conditions.append(f"question LIKE '%{search_text***REMOVED***%'"***REMOVED***
    elif user_id:
        conditions.append(f"user_id = {user_id***REMOVED***"***REMOVED***

    count_sql = "select count(1***REMOVED*** as count from t_user_qa_record"
    if conditions:
        count_sql += " where " + " and ".join(conditions***REMOVED***
    total_count = mysql_client.query_mysql_dict(count_sql***REMOVED***[0]["count"]
    total_pages = (total_count + limit - 1***REMOVED*** // limit  # 计算总页数

    # 计算偏移量
    offset = (page - 1***REMOVED*** * limit
    records_sql = f"""select * from t_user_qa_record"""
    if conditions:
        records_sql += " where " + " and ".join(conditions***REMOVED***
    records_sql += " order by id desc LIMIT {limit***REMOVED*** OFFSET {offset***REMOVED***".format(limit=limit, offset=offset***REMOVED***
    records = mysql_client.query_mysql_dict(records_sql***REMOVED***

***REMOVED***"records": records, "current_page": page, "total_pages": total_pages, "total_count": total_count***REMOVED***


def query_user_qa_record(chat_id***REMOVED***:
    """
    根据chat_id查询对话记录
    :param chat_id:
    :return:
    """
    sql = f"select * from t_user_qa_record where chat_id='{chat_id***REMOVED***' order by id desc limit 1"
    return mysql_client.query_mysql_dict(sql***REMOVED***


async def send_dify_feedback(chat_id, rating***REMOVED***:
    """
    发送反馈给指定的消息ID。

    :param chat_id: 消息的唯一标识符。
    :param rating: 反馈评级（例如："like" 或 "dislike"）。
    :return: 返回服务器响应。
    """
    # 查询对话记录
    qa_record = query_user_qa_record(chat_id***REMOVED***
    url = DiFyRestApi.replace_path_params(DiFyRestApi.DIFY_REST_FEEDBACK, {"message_id": qa_record[0]["message_id"]***REMOVED******REMOVED***
    api_key = os.getenv("DIFY_DATABASE_QA_API_KEY"***REMOVED***
    headers = {"Authorization": f"Bearer {api_key***REMOVED***", "Content-Type": "application/json"***REMOVED***
    payload = {"rating": rating, "user": "abc-123"***REMOVED***

    response = requests.post(url, headers=headers, json=payload***REMOVED***

    # 检查请求是否成功
    if response.status_code == 200:
        logger.info("Feedback successfully sent."***REMOVED***
    else:
        logger.error(f"Failed to send feedback. Status code: {response.status_code***REMOVED***,Response body: {response.text***REMOVED***"***REMOVED***
        raise
