import asyncio
import base64
import json
import logging
import os
import traceback
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from io import BytesIO
from math import ceil

import mammoth
import markdownify
import requests
from docx import Document

from common.exception import MyException
from common.minio_util import MinioUtils
from common.mysql_util import MysqlUtil
from common.pdf_util import PdfUtil
from common.word_util import WordUtil
from constants.code_enum import SysCodeEnum

logger = logging.getLogger(__name__***REMOVED***

"""
测试助手服务类
目前未使用
"""


def convert_img(image***REMOVED***:
    """
    将Word文档中的图片转换为Markdown中可以使用的链接或嵌入内容。
    :param image:
    :return: 图片标签字典
    """
    with image.open(***REMOVED*** as image_bytes:
    ***REMOVED***"src": "data:{0***REMOVED***;base64,{1***REMOVED***".format(image.content_type, base64.b64encode(image_bytes.read(***REMOVED******REMOVED***.decode(***REMOVED******REMOVED******REMOVED***


async def convert_word_to_md(file_key***REMOVED***:
    """

    :param file_key:
    :return:
    """
    html_path = file_key + "_to_html.html"
    docx_filename = file_key + ".docx"

    try:
        # 获取文件URL
        file_url = MinioUtils(***REMOVED***.get_file_url_by_key(object_key=file_key***REMOVED***

        # 从URL下载Word文档并读取其内容
        response = requests.get(file_url***REMOVED***
        response.raise_for_status(***REMOVED***  # 检查请求是否成功

        # 使用BytesIO来处理内存中的二进制数据流，避免创建临时文件
        docx_content = BytesIO(response.content***REMOVED***

        # 转化Word文档为HTML和Markdown
        result = mammoth.convert_to_html(docx_content, convert_image=mammoth.images.img_element(convert_img***REMOVED******REMOVED***
        html = result.value
        md = markdownify.markdownify(html, heading_style="ATX"***REMOVED***

        messages = result.messages
        if messages:
            for message in messages:
                print(f"警告或错误信息: {message***REMOVED***"***REMOVED***

        return md  # 直接返回Markdown文本

    except requests.RequestException as e:
        print(f"请求文件时发生错误：{e***REMOVED***"***REMOVED***
        raise MyException(SysCodeEnum.c_9999***REMOVED***
    except Exception as e:
        print(f"转换过程中发生错误：{e***REMOVED***"***REMOVED***
        raise MyException(SysCodeEnum.c_9999***REMOVED***
    finally:
        # 清理临时文件
        for path in [html_path, docx_filename]:
            if os.path.exists(path***REMOVED***:
                os.remove(path***REMOVED***


async def extract_toc_to_markdown(user_id, file_key***REMOVED***:
    """
    从Word文档中提取目录信息并转成Markdown格式。
    :param user_id
    :param file_key
    :return: Markdown格式的目录字符串
    """
    # 获取文件URL
    file_url = MinioUtils(***REMOVED***.get_file_url_by_key(object_key=file_key***REMOVED***

    # 从URL下载Word文档并读取其内容
    response = requests.get(file_url***REMOVED***
    response.raise_for_status(***REMOVED***  # 检查请求是否成功

    # 使用BytesIO来处理内存中的二进制数据流，避免创建临时文件
    docx_content = BytesIO(response.content***REMOVED***

    toc_md = []
    document = Document(docx_content***REMOVED***

    for paragraph in document.paragraphs:
        if paragraph.style and paragraph.style.name.startswith("Heading"***REMOVED***:
            level = int(paragraph.style.name[-1]***REMOVED***  # 获取标题级别
            markdown_heading = "#" * level + " " + paragraph.text
            toc_md.append(markdown_heading***REMOVED***

    md = "\n".join(toc_md***REMOVED***

    # 转换word to pdf 并上传至minio
    file_key = PdfUtil(***REMOVED***.convert_document_to_pdf_from_minio(file_key***REMOVED***
    file_url = MinioUtils(***REMOVED***.get_file_url_by_key(object_key=file_key***REMOVED***
    # insert_markdown_to_db(user_id=user_id, file_key=file_key, file_url=file_url, markdown=md***REMOVED***

    return md


mysql_client = MysqlUtil(***REMOVED***


async def insert_demand_manager_to_db(user_id, doc_name, doc_desc, file_key***REMOVED*** -> int:
    """
    将Markdown内容插入到数据库表t_test_assistant中。
    :param user_id
    :param file_key: 文件的MinIO key
    :param doc_name: 需求文档名称
    :param doc_desc: 需求文档描述
    """
    try:
        # 插入数据
        sql = "INSERT INTO t_demand_manager (user_id,doc_name,doc_desc,file_key,create_time, update_time***REMOVED*** VALUES (%s,%s,%s, %s, %s, %s***REMOVED***"
        current_time = datetime.now(***REMOVED***
        data = (user_id, doc_name, doc_desc, file_key, current_time, current_time***REMOVED***
        record_id = mysql_client.insert(sql, data***REMOVED***

        # 保存文档元信息
        await insert_demand_doc_meta(user_id, record_id, file_key***REMOVED***

        return record_id
    except Exception as e:
        traceback.print_exception(e***REMOVED***
        logger.error(f"保存测试助手记录失败: {e***REMOVED***"***REMOVED***
        return False


async def insert_demand_doc_meta(user_id, demand_id, file_key***REMOVED*** -> bool:
    """
        保存文档元信息
    :param user_id:
    :param demand_id:
    :param file_key:
    :return:
    """
    try:
        outline_with_content = WordUtil(***REMOVED***.read_target_content(file_key***REMOVED***
        outline_dict_list = [
          ***REMOVED***"功能模块": heading, "功能点详息说明": [f"***REMOVED***line***REMOVED***" for line in content]***REMOVED*** for heading, content in outline_with_content
    ***REMOVED***

        for outline_dict in outline_dict_list:
            page_title = outline_dict["功能模块"]
            page_content = json.dumps(outline_dict["功能点详息说明"]***REMOVED***
            sql = "INSERT INTO t_demand_doc_meta (user_id,demand_id,page_title,page_content,create_time, update_time***REMOVED*** VALUES (%s,%s,%s,%s, %s, %s***REMOVED***"
            current_time = datetime.now(***REMOVED***
            data = (user_id, demand_id, page_title, page_content, current_time, current_time***REMOVED***
            mysql_client.insert(sql, data***REMOVED***

    except Exception as e:
        traceback.print_exception(e***REMOVED***
        logger.error(f"保存文档元信息失败: {e***REMOVED***"***REMOVED***
        raise Exception(f"保存文档元信息失败: {e***REMOVED***"***REMOVED***


async def query_demand_records(user_id, file_key=None, page=1, limit=10***REMOVED***:
    """
    根据文件key查询t_test_assistant表中的记录，并支持分页。

    :param user_id
    :param file_key: 文件的MinIO key，用于过滤查询结果。如果为None，则不应用此过滤条件。
    :param page: 当前页码，默认为第一页。
    :param limit: 每页显示的记录数，默认为10条。
    :return: 包含分页信息和记录列表的字典。
    """
    # 构建SQL查询语句的基础部分
    base_sql = "SELECT * FROM t_demand_manager"
    where_clause = f" WHERE 1=1 and user_id={user_id***REMOVED*** "
    params = []

    # 如果提供了file_key，则添加到WHERE子句中
    if file_key:
        where_clause = " AND file_key=%s"
        params.append(file_key***REMOVED***

    # 获取总记录数
    count_sql = f"SELECT COUNT(1***REMOVED*** AS count FROM t_demand_manager{where_clause***REMOVED***"
    total_count = mysql_client.query_mysql_dict_params(count_sql, params***REMOVED***[0]["count"]
    total_pages = ceil(total_count / limit***REMOVED***  # 计算总页数

    # 计算偏移量
    offset = (page - 1***REMOVED*** * limit

    # 添加LIMIT和OFFSET子句
    fetch_sql = f"{base_sql***REMOVED***{where_clause***REMOVED*** ORDER BY id DESC LIMIT %s OFFSET %s"
    params.extend([limit, offset]***REMOVED***

    # 执行查询并获取结果
    records = mysql_client.query_mysql_dict_params(fetch_sql, params***REMOVED***

***REMOVED***"records": records, "current_page": page, "total_pages": total_pages, "total_count": total_count***REMOVED***


async def delete_demand_records(record_id***REMOVED***:
    """
    删除t_test_assistant表中的记录。
    :param record_id: 要删除的记录的ID。
    """
    # 构建SQL删除语句
    delete_sql = f"DELETE FROM t_demand_manager WHERE id={record_id***REMOVED***"
    mysql_client.execute_mysql(delete_sql***REMOVED***

    delete_sql = f"DELETE FROM t_demand_doc_meta WHERE demand_id={record_id***REMOVED***"
    mysql_client.execute_mysql(delete_sql***REMOVED***


executor = ThreadPoolExecutor(***REMOVED***


async def abstract_doc_func(response, doc_id***REMOVED***:
    """
    抽取功能点信息
    :param response
    :param doc_id
    :return:
    """
    try:
        logging.info(f"query param: {doc_id***REMOVED***"***REMOVED***

        sql = f"select * from t_demand_doc_meta where demand_id='{doc_id***REMOVED***'"
        meta_dict = mysql_client.query_mysql_dict(sql***REMOVED***
        total_steps = len(meta_dict***REMOVED***

        # 确定每个步骤应该增加的百分比
        step_percentage = 10 if total_steps <= 10 else (100 / total_steps***REMOVED***

        function_array = []
        for step, item in enumerate(meta_dict***REMOVED***:
            # 计算当前进度，如果是最后一步，则直接设为100%
            current_progress = min(100, int((step + 1***REMOVED*** * step_percentage***REMOVED******REMOVED***
            await response.write(f'data: {{"type": "progress", "progress": {current_progress***REMOVED***, "total": 100***REMOVED******REMOVED***\n\n'***REMOVED***
            await response.write(f'data: {{"type": "log", "message": "{"#### 模块: " + item["page_title"]***REMOVED***"***REMOVED******REMOVED***\n\n'***REMOVED***

            # 这里避免阻塞主线程
            loop = asyncio.get_running_loop(***REMOVED***
            answer = await loop.run_in_executor(executor, extract_function, item["page_content"]***REMOVED***

            case_info = {
                "demand_id": item["demand_id"],
                "section_id": item["id"],
                "section_name": item["page_title"],
                "fun_names": [],
            ***REMOVED***

            logger.info(answer***REMOVED***
            answer_arr = json.loads(answer.strip("```json\n"***REMOVED***.strip("\n```"***REMOVED******REMOVED***
            case_info["fun_names"].extend(answer_arr***REMOVED***
            function_array.append(case_info***REMOVED***

            for index, func in enumerate(answer_arr***REMOVED***:
                await response.write(
                    "data:"
                    + json.dumps(
                      ***REMOVED***"type": "log", "message": f"- {func***REMOVED*** </br>"***REMOVED***,
                        ensure_ascii=False,
                    ***REMOVED***
                    + "\n\n"
                ***REMOVED***

            await response.write(
                "data:"
                + json.dumps(
                  ***REMOVED***"type": "log", "message": "---"***REMOVED***,
                    ensure_ascii=False,
                ***REMOVED***
                + "\n\n"
            ***REMOVED***
        # 完成后发送完成标志
        await response.write('data: {"type": "complete"***REMOVED***\n\n'***REMOVED***
        await response.write("\n\n"***REMOVED***

        logger.info(function_array***REMOVED***
        update_functions(doc_id, function_array***REMOVED***
        insert_demand_case(doc_id, function_array***REMOVED***
    except Exception as e:
        logging.error(f"Error Invoke diFy: {e***REMOVED***"***REMOVED***
        traceback.print_exception(e***REMOVED***


def update_functions(doc_id, function_array***REMOVED***:
    """
    更新功能点数量
    :param doc_id:
    :param function_array:
    :return:
    """
    functions = sum(len(item["fun_names"]***REMOVED*** for item in function_array***REMOVED***
    sql = f"""update t_demand_manager set fun_num={functions***REMOVED***,update_time='{datetime.now(***REMOVED******REMOVED***' where id={doc_id***REMOVED***"""
    mysql_client.update(sql***REMOVED***


def insert_demand_case(doc_id, function_array***REMOVED***:
    """
        添加功能点信息
    :param doc_id:
    :param function_array:
    :return:
    """

    # 先删除数据
    delete_sql = f"""delete from t_demand_case where demand_id={doc_id***REMOVED***"""
    mysql_client.execute_mysql(delete_sql***REMOVED***

    # 插入数据的SQL语句
    insert_query = """
    INSERT INTO t_demand_case (demand_id, section_id, section_name, fun_name, create_time, update_time***REMOVED***
    VALUES (%s, %s, %s, %s, %s, %s***REMOVED***
    """

    # 准备批量插入的数据
    values_to_insert = []
    for item in function_array:
        for fun_name in item["fun_names"]:
            values_to_insert.append(
                (doc_id, item["section_id"], item["section_name"], fun_name, datetime.now(***REMOVED***, datetime.now(***REMOVED******REMOVED***
            ***REMOVED***

    mysql_client.batch_insert(insert_query, values_to_insert***REMOVED***


result_format = """["功能点1","功能点2"]"""


def build_prompt(doc_content***REMOVED*** -> str:
    """
    构建提示词

    :return:
    """
    prompt_content = f"""
    # system: 你是一个测试专家精通从需求文档内容中抽取具体功能点
    # 任务: 从需求文档内容中抽取具体功能点
    -----------
    # 需求文档内容: {doc_content***REMOVED***
    -----------

    # 约束:
    - 严格依据需求文档内容回答不要虚构
    - 每个功能点信息字数限制在30字以内
    - 根据需求文档内容尽量列举出所有功能点信息
    - 不要输出思考过程信息
    # 返回格式
    请一步步思考并按照以下JSON格式回复：{result_format***REMOVED***
    确保返回正确的json并且可以被Python json.loads方法解析.
    """
    return prompt_content


def extract_function(doc_content***REMOVED***:
    """

    :return:
    """
    # Ollama 服务器地址
    url = "http://127.0.0.1:11434/api/generate"

    # 构建请求体
    payload = {
        "prompt": build_prompt(doc_content***REMOVED***,
        "model": "qwen2.5",
        "stream": False,
        "think_output": False,
        "max_tokens": 8192,
        "temperature": 0,
        "top_k": 1,
        "top_p": 0.9,
        "repeat_penalty": 1.1,
    ***REMOVED***

    headers = {"Content-Type": "application/json"***REMOVED***

    response = requests.post(url, data=json.dumps(payload***REMOVED***, headers=headers***REMOVED***
    if response.status_code == 200:
        # 解析响应中的结果
        result = response.text
        return json.loads(result***REMOVED***["response"]
    else:
        logger.error(f"Error: {response.status_code***REMOVED***"***REMOVED***
