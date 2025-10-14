import json
import logging
import traceback

import pandas as pd

from agent.excel.excel_agent_state import ExcelAgentState
from common.minio_util import MinioUtils

minio_utils = MinioUtils()

# 日志配置
logger = logging.getLogger(__name__)

# 支持的文件扩展名
SUPPORTED_EXTENSIONS = {"xlsx", "xls", "csv"}


# 数据类型映射
def map_pandas_dtype_to_sql(dtype: str) -> str:
    """
    将 pandas 数据类型映射到 SQL 数据类型

    :param dtype: pandas 数据类型
    :return: SQL 数据类型
    """
    dtype_mapping = {
        "object": "VARCHAR(255)",
        "int64": "BIGINT",
        "int32": "INTEGER",
        "float64": "FLOAT",
        "float32": "FLOAT",
        "bool": "BOOLEAN",
        "datetime64[ns]": "DATETIME",
        "timedelta64[ns]": "VARCHAR(50)",
    }

    # 处理字符串类型
    if dtype.startswith("object"):
        return "VARCHAR(255)"
    # 处理整数类型
    elif dtype.startswith("int"):
        return dtype_mapping.get(dtype, "BIGINT")
    # 处理浮点数类型
    elif dtype.startswith("float"):
        return dtype_mapping.get(dtype, "FLOAT")
    # 处理日期时间类型
    elif dtype.startswith("datetime"):
        return "DATETIME"
    else:
        return "VARCHAR(255)"


def read_excel_columns(state: ExcelAgentState) -> None:
    """
        读取Excel文件的所有sheet，生成表结构信息
        [{
        "table_name": "手机销售数据",
        "columns": {
          "商品名称": {
            "comment": "商品名称",
            "type": "VARCHAR(255)"
          },
          "价格": {
            "comment": "价格",
            "type": "FLOAT"
          },
          "产地": {
            "comment": "产地",
            "type": "VARCHAR(255)"
          },
          "月份": {
            "comment": "月份",
            "type": "DATETIME"
          }
        },
        "foreign_keys": [],
        "table_comment": "销售数据"
      },
      {
        "table_name": "电脑销售数据",
        "columns": {
          "商品名称": {
            "comment": "商品名称",
            "type": "VARCHAR(255)"
          },
          "价格": {
            "comment": "价格",
            "type": "FLOAT"
          },
          "产地": {
            "comment": "产地",
            "type": "VARCHAR(255)"
          },
          "月份": {
            "comment": "月份",
            "type": "DATETIME"
          }
        },
        "foreign_keys": [],
        "table_comment": "销售数据"
      }
    ]
        :param state: ExcelAgentState对象，包含file_list等信息
        :return: None，直接修改state中的db_schema
    """
    file_list_ = state["file_list"]
    try:

        # 检查文件列表是否为空
        if not file_list_ or len(file_list_) == 0:
            raise ValueError("文件列表为空")

        # 获取第一个文件
        excel_file: dict = file_list_[0]
        source_file_key = excel_file.get("source_file_key")

        if not source_file_key:
            raise ValueError("缺少source_file_key字段")

        # 解析文件扩展名
        path_parts = source_file_key.split(".")
        extension = path_parts[-1].lower() if len(path_parts) > 1 else ""

        # 验证文件扩展名
        if extension not in SUPPORTED_EXTENSIONS:
            raise ValueError(f"不支持的文件扩展名: {extension}，仅支持: {', '.join(SUPPORTED_EXTENSIONS)}")

        # 获取文件URL
        file_url = minio_utils.get_file_url_by_key(object_key=source_file_key)

        # 生成表结构信息
        schema_info = []

        if extension in ["xlsx", "xls"]:
            # 读取Excel文件所有sheet
            excel_file_data = pd.ExcelFile(file_url)
            table_comment = ".".join(path_parts[:-1])  # 使用文件名作为表注释

            for sheet_name in excel_file_data.sheet_names:
                # 读取每个sheet的前几行数据以推断数据类型
                df = pd.read_excel(file_url, sheet_name=sheet_name, nrows=5)

                # 生成表名（使用sheet名称）
                table_name = sheet_name.lower().replace(" ", "_").replace("-", "_")

                # 生成列信息
                columns_info = {}
                for column in df.columns:
                    # 获取列的数据类型
                    sample_data = df[column].dropna()
                    if len(sample_data) > 0:
                        dtype = str(sample_data.dtype)
                    else:
                        dtype = "object"  # 默认类型

                    sql_type = map_pandas_dtype_to_sql(dtype)
                    column_name = str(column).lower().replace(" ", "_").replace("-", "_")

                    columns_info[column_name] = {"comment": str(column), "type": sql_type}  # 使用原始列名作为注释

                # 修改结构为指定格式
                schema_info.append(
                    {
                        "table_name": table_name,
                        "columns": columns_info,
                        "foreign_keys": [],
                        "table_comment": table_comment,
                    }
                )

        elif extension == "csv":
            # 读取CSV文件
            df = pd.read_csv(file_url, nrows=5)
            table_comment = ".".join(path_parts[:-1])  # 使用文件名作为表注释
            table_name = "_".join(path_parts[:-1]).lower()  # 使用文件名作为表名

            # 生成列信息
            columns_info = {}
            for column in df.columns:
                # 获取列的数据类型
                sample_data = df[column].dropna()
                if len(sample_data) > 0:
                    dtype = str(sample_data.dtype)
                else:
                    dtype = "object"  # 默认类型

                sql_type = map_pandas_dtype_to_sql(dtype)
                column_name = str(column).lower().replace(" ", "_").replace("-", "_")

                columns_info[column_name] = {"comment": str(column), "type": sql_type}  # 使用原始列名作为注释

            # 修改结构为指定格式
            schema_info.append(
                {"table_name": table_name, "columns": columns_info, "foreign_keys": [], "table_comment": table_comment}
            )

        # 输出结果
        logger.info(json.dumps(schema_info, ensure_ascii=False, indent=2))
        # 目前只处理第一个sheet todo
        state["db_info"] = schema_info[0]
    except Exception as e:
        traceback.print_exception(e)
        logger.error(f"读取Excel表列信息出错file_key:{file_list_}", exc_info=True)
        raise ValueError(f"读取文件列信息时发生错误: {str(e)}") from e

    return state
