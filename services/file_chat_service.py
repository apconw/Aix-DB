import json
import logging
import traceback
from sys import platform
from urllib.parse import urlparse

import matplotlib
import pandas as pd
from common.date_util import DateEncoder
from matplotlib import font_manager

logger = logging.getLogger(__name__***REMOVED***

"""
文件问答服务类
"""


async def read_excel(file_url: str***REMOVED***:
    """
    读取excel前两行内容
    :return:
    """
    try:
        # 分割URL以获取文件名部分
        extension = file_url.split("/"***REMOVED***[-1].split("."***REMOVED***[-1].split("?"***REMOVED***[0]
        if extension in ["xlsx", "xls"]:
            with pd.ExcelFile(file_url***REMOVED*** as xls:
                sheets_data = {sheet_name: xls.parse(sheet_name***REMOVED***.head(1***REMOVED*** for sheet_name in xls.sheet_names***REMOVED***
        elif extension in "csv":
            xls = pd.read_csv(file_url***REMOVED***
            sheets_data = {"sheet1": xls.head(1***REMOVED******REMOVED***
        else:
            raise ValueError("Unsupported file extension"***REMOVED***

        # 遍历每个工作表并转换为所需的列表格式
        sheets_data_list_format = {***REMOVED***
        for sheet_name, df in sheets_data.items(***REMOVED***:
            sheets_data_list_format[sheet_name] = {"excel表头": df.columns.tolist(***REMOVED***, "excel数据": df.values.tolist(***REMOVED******REMOVED***
        return json.dumps(sheets_data_list_format, ensure_ascii=False, cls=DateEncoder***REMOVED***
    except Exception as e:
        traceback.print_exception(e***REMOVED***


async def read_file_columns(file_url: str***REMOVED***:
    """
    仅读取并返回文件的第一个工作表或CSV文件的列名称（表头）

    :param file_url: 文件的URL或路径
    :return: 包含列名称的JSON字符串
    """
    try:
        # 确认文件扩展名是否为Excel或CSV文件类型
        parsed = urlparse(file_url***REMOVED***
        path_parts = parsed.path.split("."***REMOVED***
        extension = path_parts[-1] if len(path_parts***REMOVED*** > 1 else ""

        if extension not in ["xlsx", "xls", "csv"]:
            raise ValueError("Unsupported file extension"***REMOVED***

        if extension in ["xlsx", "xls"]:
            # 只读取Excel文件第一个sheet的表头
            df = pd.read_excel(file_url, sheet_name=0, nrows=0***REMOVED***
        elif extension == "csv":
            # 读取CSV文件的表头
            df = pd.read_csv(file_url, nrows=0***REMOVED***

        # 获取列名称并转换为列表
        columns = df.columns.tolist(***REMOVED***

        # 将列名称转为JSON格式返回
        return json.dumps(columns, ensure_ascii=False***REMOVED***

    except Exception as e:
        print(f"An error occurred: {e***REMOVED***"***REMOVED***
        return json.dumps({"error": str(e***REMOVED******REMOVED***, ensure_ascii=False***REMOVED***


def pyload_build(
    system_prompt,
    user_prompt,
    model,
    stream=False,
    dialog_history=None,
    temperature=None,
    frequency_penalty=None,
    max_tokens=None,
    n=None,
    presence_penalty=None,
    stop=None,
    top_p=None,
***REMOVED***:
    """
    构建llm请求参数
    :param system_prompt:
    :param user_prompt:
    :param model:
    :param stream:
    :param dialog_history:
    :param temperature:
    :param frequency_penalty:
    :param max_tokens:
    :param n:
    :param presence_penalty:
    :param stop:
    :param top_p:
    :return:
    """
    msg = []
    if system_prompt:
        msg.append({"role": "system", "content": system_prompt***REMOVED******REMOVED***

    if dialog_history:
        for dialog in dialog_history:
            if dialog.get("role"***REMOVED*** == "user":
                msg.append({"role": "user", "content": dialog.get("content", ""***REMOVED******REMOVED******REMOVED***
            else:
                msg.append({"role": "assistant", "content": dialog.get("content", ""***REMOVED******REMOVED******REMOVED***
    if user_prompt:
        msg.append({"role": "user", "content": user_prompt***REMOVED******REMOVED***

    payload = {"messages": msg***REMOVED***
    if temperature is not None and temperature >= 0:
        payload.update({"temperature": temperature***REMOVED******REMOVED***
    if top_p is not None and top_p >= 0:
        payload.update({"top_p": top_p***REMOVED******REMOVED***
    if model:
        payload.update({"model": model***REMOVED******REMOVED***
    if stream:
        payload.update({"stream": stream***REMOVED******REMOVED***
    if n:
        payload.update({"n": n***REMOVED******REMOVED***
    if stop:
        payload.update({"stop": stop***REMOVED******REMOVED***
    if max_tokens:
        payload.update({"max_tokens": max_tokens***REMOVED******REMOVED***
    if presence_penalty is not None and presence_penalty >= 0:
        payload.update({"presence_penalty": presence_penalty***REMOVED******REMOVED***
    if frequency_penalty is not None and frequency_penalty >= 0:
        payload.update({"frequency_penalty": frequency_penalty***REMOVED******REMOVED***
    logger.info(f"gpt payload:{json.dumps(payload, ensure_ascii=False***REMOVED******REMOVED***"***REMOVED***
    return payload
