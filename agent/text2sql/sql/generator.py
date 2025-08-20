import json
import traceback

from langchain.prompts import ChatPromptTemplate
from datetime import datetime
import logging

from agent.text2sql.analysis.llm_util import get_llm

logger = logging.getLogger(__name__)


def sql_generate(state):
    # logger.info("Creating sql query")
    # logger.info(f"User query: {state['user_query']}")
    # logger.info(f"Reasoning: {state['sql_reasoning']}")

    llm = get_llm()

    prompt = ChatPromptTemplate.from_template(
        """
        ### DATABASE SCHEMA ###
        {db_schema}

        ### QUESTION ###
        User's Question: {user_query}
        Current Time: {current_time}

        ### REASONING PLAN ###
        {sql_generation_reasoning}

        Your task:
        - Generate an optimized SQL query that directly answers the user's question.
        - The SQL query must be fully formed, valid, and executable.
        - Do NOT include any explanations, markdown formatting, or comments.
        - Select the right chart based on the sql_generation_reasoning
        
        ### Chart definition
        - generate_area_chart: used to display the trend of data under a continuous independent variable, allowing observation 
        of overall data trends.
        - generate_bar_chart: used to compare values across different categories, suitable for horizontal comparisons.
        - generate_boxplot_chart: used to display the distribution of data, including the median, quartiles, and outliers.
        - generate_column_chart: used to compare values across different categories, suitable for vertical comparisons.
        
        ### RESPONSE FORMAT (strict JSON) ###
        Respond only in the following JSON format:
        {{
            "sql_query": "Generated SQL query here",
            "char_type": "Generated chart_type here"
        }}
    """
    )

    chain = prompt | llm

    try:
        response = chain.invoke(
            {
                "db_schema": state["db_info"],
                "user_query": state["user_query"],
                "current_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "sql_generation_reasoning": state["sql_reasoning"],
            }
        )
        # logger.info(f"Db Schema: {state['db_info']}")
        # logger.info(f"Raw LLM response: {response.content}")
        # logger.info(f"Attempts: {state['attempts']}")

        state["attempts"] += 1
        clean_json_str = response.content.strip().removeprefix("```json").strip().removesuffix("```").strip()
        state["generated_sql"] = json.loads(clean_json_str)["sql_query"]
        state["char_type"] = json.loads(clean_json_str)["char_type"]

    except Exception as e:
        traceback.print_exception(e)
        logger.error(f"Error in generating: {e}")
        state["generated_sql"] = "No SQL query generated"

    return state
