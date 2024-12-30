import json
import logging
import os
import traceback
from sys import platform

import matplotlib
from matplotlib import font_manager
from pandasai.helpers import path

import pandas as pd
from pandasai import Agent
from pandasai.llm.local_llm import LocalLLM
import requests

from common.date_util import DateEncoder
from component.pandasai.pandas_ai_response import PandasaiCustomResponse
from urllib.parse import urlparse

logger = logging.getLogger(__name__***REMOVED***


def summary_excel_data(file_url: str***REMOVED*** -> str:
    """
        分析总结excel文件内容
    :return:
    """
    """
       初始化智能数据框
       :return:
       """
    display_json = """
       [
           "sheet1":{
                 "DataAnalysis": "数据内容分析总结",
                 "ColumnAnalysis": ["字段1"],
                 "AnalysisProgram": [
                   "1.分析方案1",
                   "2.分析方案2"
             ***REMOVED***
           ***REMOVED***,
           "sheet2":{
                 "DataAnalysis": "数据内容分析总结",
                 "ColumnAnalysis": ["字段1"],
                 "AnalysisProgram": [
                   "1.分析方案1",
                   "2.分析方案2"
             ***REMOVED***
           ***REMOVED***
   ***REMOVED***
       """

    file_data = read_excel(file_url***REMOVED***
    prompt = f"""
           system: 你是一个数据分析专家.
           下面是用户Excel文件的一部分数据，请学习理解该数据的结构和内容，按要求输出解析结果:
         ***REMOVED***file_data***REMOVED***
           将列名组成json数组，并输出在返回json内容的ColumnAnalysis属性中.
           请不要修改或者翻译列名，确保和给出数据列名一致.
           针对数据从不同维度提供一些有用的分析思路给用户.
           多个sheet需要分开分析并进行单独返回.
           请一步一步思考,确保只以JSON格式回答，具体格式如下：
         ***REMOVED***display_json***REMOVED***
           """

    payload = pyload_build(
        system_prompt=prompt,
        model="qwen2",
        user_prompt="",
        temperature=0.5,
        top_p=1,
    ***REMOVED***
    headers = {"Content-Type": "application/json"***REMOVED***
    try:
        response = requests.post(
            "http://127.0.0.1:11434/v1/chat/completions",
            data=json.dumps(payload, ensure_ascii=False***REMOVED***.encode("utf-8"***REMOVED***,
            headers=headers,
        ***REMOVED***
        llm_json = response.json(***REMOVED***
        content = llm_json.get("choices"***REMOVED***[0]["message"].get("content"***REMOVED***
        print(content***REMOVED***
    except requests.RequestException as e:
        traceback.print_exception(e***REMOVED***
        logger.error(f"Request failed: {e***REMOVED***"***REMOVED***
        return None
    except (json.JSONDecodeError, KeyError***REMOVED*** as e:
        logger.error(f"Failed to parse response JSON: {e***REMOVED***"***REMOVED***
        return None

    return ""


def init_agent(file_url: str***REMOVED*** -> Agent:
    """
    初始化智能数据框
    :return:
    """

    extension = file_url.split("/"***REMOVED***[-1].split("."***REMOVED***[-1].split("?"***REMOVED***[0]  # 移除可能的查询参数
    if extension in ["xlsx", "xls"]:
        df = pd.read_excel(file_url, sheet_name=None***REMOVED***
    elif extension in "csv":
        df = pd.read_csv(file_url, encoding="utf-8"***REMOVED***
    else:
        raise ValueError("Unsupported file extension"***REMOVED***

    llm = LocalLLM(
        api_base="http://127.0.0.1:11434/v1",
        model="qwen2.5",
        temperature=0.5,
        max_tokens=40960,
    ***REMOVED***

    try:
        user_defined_path = path.find_project_root(***REMOVED***
    except ValueError:
        user_defined_path = os.getcwd(***REMOVED***

    user_defined_path = os.path.join(user_defined_path, "exports", "charts"***REMOVED***

    agent = Agent(
        [df[sheet] for sheet in df],
        config={
            "max_retries": 1,
            "open_charts": False,
            "enable_cache": False,  # 相同问题是否使用缓存
            "save_charts_path": user_defined_path,
            "save_charts": True,
            "verbose": True,
            "response_parser": PandasaiCustomResponse,
            "llm": llm,
        ***REMOVED***,
    ***REMOVED***

    return agent


def set_language_style(***REMOVED***:
    """
    Matplotlib 图形框架参数设置
    设置中文展示
    设置表格样式
    :return:
    """

    # 获取当前操作系统
    system = platform.system(***REMOVED***

    # 用于存储可用的中文字体
    chinese_fonts = []

    # 在字体列表中查找含有 "SC" (SimSun, SimHei 等***REMOVED*** 的字体
    for font in font_manager.fontManager.ttflist:
        if "SC" in font.name:
            chinese_fonts.append(font***REMOVED***

    # 根据操作系统选择合适的字体
    if system == "Windows":
        # Windows 系统中常见的中文字体
        matplotlib.rcParams["font.sans-serif"] = [chinese_fonts[0].name]
    elif system == "Linux":
        # CentOS 或其他 Linux 发行版中的中文字体
        if chinese_fonts:
            # 选择第一个可用的中文字体
            matplotlib.rcParams["font.sans-serif"] = [chinese_fonts[0].name]
        else:
            # 如果没有找到合适的字体，则尝试使用默认字体
            matplotlib.rcParams["font.sans-serif"] = ["SimHei"]
    elif system == "Darwin":  # macOS
        # 尝试使用系统默认的 sans-serif 字体
        matplotlib.rcParams["font.sans-serif"] = [chinese_fonts[4].name]

    # 确保负号能够正常显示
    matplotlib.rcParams["axes.unicode_minus"] = False

    # 使用 ggplot 风格
    matplotlib.style.use("ggplot"***REMOVED***

    yield

    # 清理工作
    matplotlib.style.use("default"***REMOVED***
    matplotlib.rcParams.update(matplotlib.rcParamsDefault***REMOVED***


async def query_excel(file_url: str, query: str***REMOVED*** -> str:
    """

    :param file_url:
    :param query:
    :return:
    """

    set_language_style(***REMOVED***

    agent = init_agent(file_url***REMOVED***
    message = agent.chat(f" {query***REMOVED*** 使用中文回答"***REMOVED***
    # 打印日志
    for log in agent.logs:
        print(json.dumps(log, ensure_ascii=False***REMOVED******REMOVED***

    print(message***REMOVED***
    return message


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


def read_file_columns(file_url: str***REMOVED***:
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
        return json.dumps({"file_header": columns***REMOVED***, ensure_ascii=False***REMOVED***

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
