import os

from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

from agent.text2sql.state.agent_state import AgentState

"""
AntV mcp 数据渲染节点
"""


async def data_render_ant(state: AgentState):
    """
    蚂蚁antV数据图表渲染
    mcphub 按group指定查询AntV-chart工具 减少上下文token
    :return:
    """
    client = MultiServerMCPClient(
        {
            "mcphub-sse": {
                "url": os.getenv("MCP_HUB_DATABASE_QA_GROUP_URL"),
                "transport": "streamable_http",
            }
        }
    )

    # 过滤工具减少token和大模型幻觉问题
    chart_type = state["chart_type"]
    tools = await client.get_tools()
    tools = [tool for tool in tools if tool.name == chart_type]

    llm = ChatOpenAI(
        model=os.getenv("MODEL_NAME", "qwen-plus"),
        temperature=float(os.getenv("MODEL_TEMPERATURE", 0.75)),
        base_url=os.getenv("MODEL_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1"),
        api_key=os.getenv("MODEL_API_KEY"),
        # max_tokens=int(os.getenv("MAX_TOKENS", 20000)),
        top_p=float(os.getenv("TOP_P", 0.8)),
        frequency_penalty=float(os.getenv("FREQUENCY_PENALTY", 0.0)),
        presence_penalty=float(os.getenv("PRESENCE_PENALTY", 0.0)),
        timeout=float(os.getenv("REQUEST_TIMEOUT", 30.0)),
        max_retries=int(os.getenv("MAX_RETRIES", 3)),
        streaming=os.getenv("STREAMING", "True").lower() == "true",
        # 将额外参数通过 extra_body 传递
        extra_body={},
    )

    result_data = state["execution_result"]
    chart_agent = create_react_agent(
        model=llm,
        tools=tools,
        prompt=f"""
            你是一位经验丰富的BI专家，擅长根据数据特征自动选择最合适的MCP图表工具，并完成图表渲染。

            ### 任务步骤
            1. **分析数据特征**：理解输入的原始数据结构（如维度、指标、数据类型、数据量等）。
            2. **选择最优图表类型**：基于数据特征，从MCP图表库中选择最适合的图表工具（如柱状图、折线图、饼图、散点图、表格等）。
            3. **读取工具Schema**：获取所选MCP图表工具的参数配置规范（JSON Schema）。
            4. **填充参数**：根据原始数据和可视化目标，按Schema要求填充图表参数（如xAxis, yAxis, series, title等）。
            5. **生成图表**：调用MCP工具渲染图表，并返回图表链接。
            
            ### 输入数据
            {result_data}
            
            ### 要求
            - 不要解释图表内容或生成文字说明。
            - 必须返回符合格式的图表链接。
            - 图表需清晰表达数据关系，符合可视化最佳实践。
            - x轴和y轴的标签必须使用中文显示。
            
            ### 返回格式
             ![图表](https://example.com/chart.png)
            
          """,
    )

    result = await chart_agent.ainvoke(
        {"messages": [("user", "根据输入数据选择合适的MCP图表工具进行渲染")]},
        config={"configurable": {"thread_id": "chart-render"}},
    )

    state["chart_url"] = result["messages"][-1].content

    return state
