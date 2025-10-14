import io
import logging
import traceback
import duckdb
import requests
import pandas as pd

from agent.excel.excel_agent_state import ExecutionResult
from common.minio_util import MinioUtils

logger = logging.getLogger(__name__)

minio_util = MinioUtils()


def exe_sql_excel_query(state):
    """
    执行sql语句
    :param state:
    :return:
    """
    file_list_ = state["file_list"]
    try:

        # 获取文件信息
        excel_file: dict = file_list_[0]
        file_key = excel_file.get("source_file_key")

        # 获取文件URL
        file_url = minio_util.get_file_url_by_key(object_key=file_key)
        extension = file_key.split(".")[-1].lower()

        # 根据文件类型读取数据
        if extension in ["xlsx", "xls"]:
            response = requests.get(file_url)
            df = pd.read_excel(io.BytesIO(response.content), engine="openpyxl")
        elif extension == "csv":
            df = pd.read_csv(file_url)
        else:
            logger.error(f"不支持的文件扩展名: {extension}")

        # 连接到DuckDB (这里使用内存数据库) 并注册DataFrame
        con = duckdb.connect(database=":memory:")

        # 注册DataFrame
        table_name = state["db_info"]["table_name"]
        con.register(table_name, df)
        if table_name != "excel_table":
            con.register("excel_table", df)

        # 解析模型输出并获取SQL语句
        sql = state["generated_sql"].replace("`", "")  # 移除反引号以避免SQL语法错误

        # 执行SQL查询
        cursor = con.execute(sql)

        # 获取列名称和查询结果的数据行
        columns = [description[0] for description in cursor.description]
        rows = cursor.fetchall()

        # 构建结果字典
        result = [dict(zip(columns, row)) for row in rows]

        # 成功情况
        state["execution_result"] = ExecutionResult(success=True, columns=columns, data=result)

    except Exception as e:
        state["execution_result"] = ExecutionResult(success=False, columns=[], data=[], error=str(e))
        traceback.print_exception(e)
        logging.error(f"Error in executing SQL query: {e}")

    return state
