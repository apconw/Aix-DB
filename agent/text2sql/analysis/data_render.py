import os

from langchain.chat_models import init_chat_model
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent


async def data_render(result_data, char_type):
    """
    数据图表渲染
    :return:
    """
    client = MultiServerMCPClient(
        {
            "mcphub-sse": {
                "url": "http://localhost:3300/mcp/f635fd21-2f44-4a99-8a92-f778b4d3607f",
                "transport": "streamable_http",
            }
        }
    )

    tools = await client.get_tools()
    llm = init_chat_model(
        model="openai:qwen-plus",
        temperature=0.5,
        base_url=os.getenv("MODEL_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1"),
        api_key=os.getenv("MODEL_API_KEY"),
    )

    chart_agent = create_react_agent(
        model=llm,
        tools=tools,
        prompt=f"""
            你是一个经验丰富的BI专家,擅长根据原始数据选择合适的mcp图表工具进行渲染.
            ----
            {result_data}
            ----
          """,
    )

    result = await chart_agent.ainvoke(
        {"messages": [("user", "根据原始数据选择合适的mcp图表工具进行渲染")]},
        config={"configurable": {"thread_id": "chart-render"}},
    )

    return result["messages"][-1].content

    # async for message_chunk, metadata in chart_agent.astream(
    #     input={"messages": [("user", "根据原始数据选择合适的mcp图表工具进行渲染")]},
    #     config={"configurable": {"thread_id": "chart-render"}},
    #     stream_mode="messages",
    # ):
    #     # print(message_chunk)
    #     # 工具输出
    #     if metadata["langgraph_node"] == "tools":
    #         tool_name = message_chunk.name or "未知工具"
    #         tool_use = "> 调用工具:" + tool_name + "\n\n"
    #         print(tool_use)
    #         continue
    #
    #     if message_chunk.content:
    #         content = message_chunk.content
    #         print(message_chunk)
    #
    # return state
