import logging
import re
import traceback
from typing import List
import jieba
import pandas as pd
from sqlalchemy.inspection import inspect
from sqlalchemy.sql.expression import text
from rank_bm25 import BM25Okapi
from agent.text2sql.state.agent_state import AgentState, ExecutionResult
from model.db_connection_pool import get_db_pool

db_pool = get_db_pool()
logger = logging.getLogger(__name__)


class DatabaseService:
    """
    数据库服务类
    """

    def __init__(self):
        pass

    @staticmethod
    def _build_document(table_name: str, table_info: dict) -> str:
        """
        将表结构拼接成一段文本，用于匹配
        """
        parts = []

        # 添加表名和注释
        table_comment = table_info.get("table_comment", "")
        parts.append(f"{table_name} {table_comment}")

        # 添加列信息
        for col_name, col_info in table_info.get("columns", {}).items():
            col_comment = col_info.get("comment", "")
            col_cn_name = col_info.get("cn_name", "")
            parts.append(f"{col_name} {col_cn_name} {col_comment}")

        return " ".join(parts)

    @staticmethod
    def _tokenize_text(text: str) -> List[str]:
        """
         :param text
        对文本进行分词
        """
        # 过滤掉标点符号和特殊字符，只保留中文、英文和数字
        filtered_text = re.sub(r"[^\u4e00-\u9fa5a-zA-Z0-9]", " ", text)
        tokens = list(jieba.cut(filtered_text))
        # 过滤空字符串
        return [token.strip() for token in tokens if token.strip()]

    @staticmethod
    def get_table_schema(state: AgentState):
        """
        @:param state
        :param state:
        :return:
        获取数据中所有表schema信息
        使用BM25算法过滤出相关表信息
        :return: 表schema信息
        """
        try:
            logger.info("获取数据库表schema信息")
            inspector = inspect(db_pool.get_engine())
            table_info = {}

            for table_name in inspector.get_table_names():
                columns = {
                    col["name"]: {"type": str(col["type"]), "comment": str(col["comment"])}
                    for col in inspector.get_columns(table_name)
                }
                foreign_keys = [
                    f"{fk['constrained_columns'][0]} -> {fk['referred_table']}.{fk['referred_columns'][0]}"
                    for fk in inspector.get_foreign_keys(table_name)
                ]

                table_info[table_name] = {"columns": columns, "foreign_keys": foreign_keys}

            # 如果有用户查询，则根据查询过滤表信息
            user_query = state.get("user_query", "")
            if user_query and table_info:
                # 构建表文档
                corpus = []
                table_names = []
                table_comments = []
                for table_name, info in table_info.items():
                    doc = DatabaseService._build_document(table_name, info)
                    corpus.append(doc)
                    table_names.append(table_name)
                    table_comments.append(info.get("table_comment", ""))

                # 对文档进行分词
                tokenized_corpus = [DatabaseService._tokenize_text(doc) for doc in corpus]

                # 使用BM25算法训练模型
                bm25 = BM25Okapi(tokenized_corpus)

                # 对查询进行分词
                query_tokens = DatabaseService._tokenize_text(user_query)

                # 计算文档得分
                doc_scores = bm25.get_scores(query_tokens)

                # 优化算法：提高表注释匹配的优先级
                # 如果查询内容直接匹配表注释，则给予更高的权重
                for i, (table_comment, score) in enumerate(zip(table_comments, doc_scores)):
                    if score > 0 and table_comment:
                        # 检查查询是否直接包含表注释中的关键词
                        comment_tokens = DatabaseService._tokenize_text(table_comment)
                        query_text = "".join(query_tokens)
                        comment_text = "".join(comment_tokens)

                        # 如果查询中包含表注释的关键内容，增加权重
                        if comment_text and (comment_text in query_text or query_text in comment_text):
                            doc_scores[i] *= 2  # 给予两倍权重

                # 按得分排序，取前3个最相关的表
                top_indices = sorted(range(len(doc_scores)), key=lambda i: doc_scores[i], reverse=True)[:3]

                # 只保留最相关的表
                filtered_table_info = {
                    table_names[idx]: table_info[table_names[idx]]
                    for idx in top_indices
                    if doc_scores[idx] > 0  # 只保留得分大于0的表
                }

                state["db_info"] = filtered_table_info
            else:
                state["db_info"] = table_info

            logger.info(f"获取数据库表信息成功: {state.get('db_info')}")
        except Exception as e:
            logger.error(f"获取数据库表信息失败: {e}")
            state["db_info"] = {}

        return state

    @staticmethod
    def execute_sql(state: AgentState):
        """
        执行SQL
        :param state
        :return: 查询结果
        """
        logger.info("执行SQL语句")
        try:
            with db_pool.get_session() as connection:
                result = connection.execute(text(state["generated_sql"]))
                result_data = result.fetchall()
                column_key = result.keys()
                frame = pd.DataFrame(result_data, columns=column_key)
                state["execution_result"] = ExecutionResult(success=True, data=frame.to_dict(orient="records"))
        except Exception as e:
            traceback.print_exception(e)
            logger.error(f"执行SQL语句失败: {e}")
            state["execution_result"] = ExecutionResult(success=False, error=str(e))
        return state

    def execute_correction_sql(self, state: AgentState):
        """
        执行修正后的SQL
        :param state
        :return: 查询结果
        """
        logger.info("执行修正后的SQL")
        try:
            with self.engine.connect() as connection:
                result = connection.execute(state["correction_result"].corrected_sql_query)
                result_data = result.fetchall()
                column_key = result.keys()
                frame = pd.DataFrame(result_data, columns=column_key)
                state["execution_result"] = ExecutionResult(success=True, data=frame.to_dict(orient="records"))
        except Exception as e:
            logger.error(f"执行修正后的SQL语句失败: {e}")
            state["execution_result"] = ExecutionResult(success=False, error=str(e))
        return state
