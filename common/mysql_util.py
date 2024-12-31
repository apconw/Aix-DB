import datetime
import json
import logging
import os

import pymysql

logger = logging.getLogger(__name__***REMOVED***


class MysqlUtil:
    """
    mysql工具类
    """

    def _get_connect(self***REMOVED***:
        """
        获取mysql链接
        :return:
        """
        host = os.getenv("MYSQL_HOST"***REMOVED***
        port = int(os.getenv("MYSQL_PORT"***REMOVED******REMOVED***
        user = os.getenv("MYSQL_USER"***REMOVED***
        password = os.getenv("MYSQL_PASSWORD"***REMOVED***
        database = os.getenv("MYSQL_DATABASE"***REMOVED***

        conn = pymysql.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database,
        ***REMOVED***
        return conn

    """
     连接 MySQL 数据库，执行查询，并将查询结果转化为 Pandas DataFrame 对象。
    :param sql_query: SQL 查询语句
    :param mysql_host: 主机名，默认为 None
    :param port: 端口号，默认为 None
    :param user: 用户名，默认为 None
    :param password: 密码，默认为 None
    :param database: 数据库名称，默认为 None
    :param engine: SQLAlchemy 的数据库引擎对象，默认为 None

    :return: Pandas DataFrame 对象
    """

    # 如果未提供数据库连接引擎，则使用 pymysql 库连接 MySQL 数据库

    def query_mysql(self, sql_query***REMOVED***:
        """
        @param: sql_query 查询的sql语句
        @return 查询结果
        """
        # 获得链接
        conn = self._get_connect(***REMOVED***
        # 获得游标
        cursor = conn.cursor(***REMOVED***
        # 执行 SQL 查询语句
        cursor.execute(sql_query***REMOVED***
        # 获取查询结果
        result = cursor.fetchall(***REMOVED***
        # 关闭游标和数据库连接
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return result

    def insert(self, sql: str, params: []***REMOVED***:
        conn = self._get_connect(***REMOVED***
        cursor = conn.cursor(***REMOVED***
        cursor.execute(sql, params***REMOVED***
        data = cursor.fetchall(***REMOVED***
        conn.commit(***REMOVED***
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return data

    def update_params(self, sql: str, params: []***REMOVED***:
        # 获得链接
        conn = self._get_connect(***REMOVED***
        # 获得游标
        cursor = conn.cursor(***REMOVED***
        # 执行 SQL 查询语句
        cursor.execute(sql, params***REMOVED***
        # 获取查询结果
        result = cursor.fetchall(***REMOVED***
        # 将查询结果转化为 Pandas DataFrame 对象
        # df = pd.DataFrame(result, columns=[i[0] for i in cursor.description]***REMOVED***
        conn.commit(***REMOVED***
        # 关闭游标和数据库连接
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return result

    def update(self, sql: str***REMOVED***:
        # 获得链接
        conn = self._get_connect(***REMOVED***
        # 获得游标
        cursor = conn.cursor(***REMOVED***
        # 执行 SQL 查询语句
        cursor.execute(sql***REMOVED***
        # 获取查询结果
        result = cursor.fetchall(***REMOVED***
        # 将查询结果转化为 Pandas DataFrame 对象
        # df = pd.DataFrame(result, columns=[i[0] for i in cursor.description]***REMOVED***
        conn.commit(***REMOVED***
        # 关闭游标和数据库连接
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return result

    def query_mysql_dict(self, sql_query***REMOVED***:
        """
        @param: sql_query 查询的sql语句
        @return 查询结果
        """
        # 获得链接
        conn = self._get_connect(***REMOVED***
        # 获得游标
        cursor = conn.cursor(***REMOVED***
        # 执行 SQL 查询语句
        cursor.execute(sql_query***REMOVED***
        # 获取查询结果
        rows = cursor.fetchall(***REMOVED***
        index = cursor.description
        result = []
        for res in rows:
            row = {***REMOVED***
            for i in range(len(index***REMOVED******REMOVED***:
                if isinstance(res[i], datetime.datetime***REMOVED***:
                    value = res[i].strftime("%Y-%m-%d %H:%M:%S"***REMOVED***
                    row[index[i][0]] = value
                else:
                    row[index[i][0]] = res[i]

            result.append(row***REMOVED***

        # 关闭游标和数据库连接
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return result

    def execute_mysql(self, sql***REMOVED***:
        """
        @param: sql_query 查询的sql语句
        @return 查询结果
        """
        # 获得链接
        conn = self._get_connect(***REMOVED***
        # 获得游标
        cursor = conn.cursor(***REMOVED***
        # 执行 SQL 查询语句
        cursor.execute(sql***REMOVED***
        # 获取查询结果
        result = cursor.fetchall(***REMOVED***
        # 将查询结果转化为 Pandas DataFrame 对象
        # df = pd.DataFrame(result, columns=[i[0] for i in cursor.description]***REMOVED***
        conn.commit(***REMOVED***
        # 关闭游标和数据库连接
        cursor.close(***REMOVED***
        conn.close(***REMOVED***
        return result

    def get_multiple_tables_column_comments(self, tables, dbname="dap"***REMOVED***:
        """
        获取mysql表schema信息

        Args:
            tables 表名称
            dbname 数据库名称

        Return:
          ***REMOVED***
              "schema": [
              ***REMOVED***
                  "tableName": "table_1",
                  "schema": [
                  ***REMOVED***
                      "column": "name",
                      "comment": "姓名"
                    ***REMOVED***
              ***REMOVED***
                ***REMOVED***
          ***REMOVED***
            ***REMOVED***
        """
        connection = None
        try:
            # 连接数据库
            connection = self._get_connect(***REMOVED***
            result_data = {"schema": []***REMOVED***
            with connection.cursor(***REMOVED*** as cursor:
                for table in tables:
                    # 查询每个表的列信息及注释
                    sql = f"""
                            SELECT COLUMN_NAME AS `column`, COLUMN_COMMENT AS `comment`
                            FROM INFORMATION_SCHEMA.COLUMNS
                            WHERE TABLE_SCHEMA = '{dbname***REMOVED***' AND TABLE_NAME = '{table***REMOVED***';
                            """
                    cursor.execute(sql***REMOVED***

                    # 获取查询结果并构造字典
                    columns_info = [{"column": col, "comment": comment***REMOVED*** for col, comment in cursor.fetchall(***REMOVED***]

                    # 将当前表的列信息添加到结果数据中
                    result_data["schema"].append({"tableName": table, "schemaData": columns_info***REMOVED******REMOVED***

            # return json.dumps(result_data, ensure_ascii=False***REMOVED***
            return result_data
        except pymysql.MySQLError as e:
            logger.error(f"get_multiple_tables_column_comments error {e***REMOVED***"***REMOVED***
        finally:
            if connection:
                connection.close(***REMOVED***

    def query_ex(self, query: str***REMOVED***:
        """
        Execute SQL and return column desc and result

        Args:
            query SQL query to run

        Returns:
            Json: {"column":[],result:[]***REMOVED***
        """
        logger.info(f"query_sql: {query***REMOVED***"***REMOVED***
        if not query:
            return json.dumps({"column": [], "result": []***REMOVED******REMOVED***

        connection = None
        try:
            connection = self._get_connect(***REMOVED***
            with connection.cursor(***REMOVED*** as cursor:
                # 执行SQL查询
                cursor.execute(query***REMOVED***
                # 获取查询结果的字段名称
                column_names = [desc[0] for desc in cursor.description]
                # 获取查询结果
                rows = cursor.fetchall(***REMOVED***

                # 将查询结果转换为指定格式
                result = []
                index = cursor.description
                for res in rows:
                    row = {***REMOVED***
                    for i in range(len(index***REMOVED******REMOVED***:
                        if isinstance(res[i], datetime.datetime***REMOVED***:
                            value = res[i].strftime("%Y-%m-%d %H:%M:%S"***REMOVED***
                            row[index[i][0]] = value
                        else:
                            row[index[i][0]] = res[i]
                    result.append(row***REMOVED***

                    # return json.dumps({"column": column_names, "result": result***REMOVED******REMOVED***
            ***REMOVED***"column": column_names, "result": result***REMOVED***
        except pymysql.MySQLError as e:
            logger.error(f"query_ex error query_sql: {query***REMOVED***,{e***REMOVED***"***REMOVED***
            return None
        finally:
            if connection:
                connection.close(***REMOVED***
