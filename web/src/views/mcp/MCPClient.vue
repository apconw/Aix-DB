***REMOVED***
    <LayoutCenterPanel>
      ***REMOVED***
            <!-- 移动说明区块到 n-layout 外部 -->
  ***REMOVED***class="note-box">
                <p>MCP功能说明：</p>
                <ul>
                    <li>
                        目前该功能只做了简单的客户端对接示例;
                        下一版本对接qwen3mcp能力实现多工具协调调用
                    </li>
                    <li>
                        第一步 申请高德API-KEY 并启动高德 MCP Server，命令如下：
                    </li>
                    <li>
                        npx -y supergateway --stdio
                        "AMAP_MAPS_API_KEY=高德API-KEY npx -y
                        @amap/amap-maps-mcp-server" --cors
                    </li>
                    <li>
                        通过 maps_weather 工具查询实时天气,输出城市名称如:杭州
                    </li>
                </ul>
***REMOVED***

  ***REMOVED***class="mcp-client">
                <h1>MCP Client</h1>
                <p>Connection Status: {{ connectionStatus ***REMOVED******REMOVED***</p>

                <!-- 输入框和按钮 -->
                <div>
                    <input
                        v-model="message"
                        style="width: 280px; height: 25px"
                        placeholder="Enter message to send"
          ***REMOVED***
                    <button
                        @click="sendMessage"
                        style="height: 25px; margin-left: 2px; width: 80px"
          ***REMOVED***
                        Send
          ***REMOVED***
    ***REMOVED***

                <!-- 消息日志 -->
      ***REMOVED***class="message-log">
                    <h3>Message Log:</h3>
                    <ul>
                      ***REMOVED***{
                            messages
                        ***REMOVED******REMOVED***
                    </ul>
    ***REMOVED***
***REMOVED***
      ***REMOVED***
    </LayoutCenterPanel>
***REMOVED***

<script lang="tsx" setup>
***REMOVED***
***REMOVED*** // 假设存在 SseClientTransport

const message = ref(''***REMOVED***
const messages = ref(''***REMOVED***
const connectionStatus = ref('Disconnected'***REMOVED***
//https://github.com/modelcontextprotocol/typescript-sdk
// StdioClientTransport
***REMOVED***new URL('http://localhost:8000/sse'***REMOVED******REMOVED***

***REMOVED***
  ***REMOVED***
    ***REMOVED***
        version: '1.0.0'
    ***REMOVED***,
  ***REMOVED***
    ***REMOVED***
            prompts: {***REMOVED***,
            resources: {***REMOVED***,
            tools: {***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***

onMounted(async (***REMOVED*** => {
    await client.connect(transport***REMOVED***
    connectionStatus.value = 'Connected'
    const tools = await client.listTools(***REMOVED***
    console.log(tools***REMOVED***

    // const prompts = await client.listPrompts(***REMOVED***
    // console.log(prompts***REMOVED***
***REMOVED******REMOVED***

const sendMessage = async (***REMOVED*** => {
 ***REMOVED***
        name: 'maps_weather',
        arguments: {
            city: message.value
        ***REMOVED***
    ***REMOVED******REMOVED***
    messages.value = JSON.stringify(result.content***REMOVED***
    console.log(result.content***REMOVED***
***REMOVED***

// List prompts
// const prompts = await client.listPrompts(***REMOVED***

// // Get a prompt
// const prompt = await client.getPrompt('example-prompt', {
//     arg1: 'value'
// ***REMOVED******REMOVED***

// List resources
// const resources = await client.listResources(***REMOVED***

// // Read a resource
// const resource = await client.readResource('file:///example.txt'***REMOVED***
***REMOVED***

***REMOVED***
/* 全局样式 */
.note-box {
    max-width: 600px;
    margin: 20px auto 0;
    background: #f8f9fa;
    border-left: 4px solid #3b82f6;
  ***REMOVED***
    padding: 15px;
***REMOVED***
.note-box ul {
    margin: 10px 0 0 20px;
***REMOVED***
.note-box li {
    list-style-type: disc;
    margin: 5px 0;
***REMOVED***

/* 保持原有 scoped 样式 */
.mcp-client {
    font-family: Arial, sans-serif;
    max-width: 600px;
  ***REMOVED***
  ***REMOVED***
    border: 1px solid #ccc;
  ***REMOVED***
    margin-top: 20px;
***REMOVED***

.message-log {
    margin-top: 20px;
***REMOVED***

ul {
    list-style-type: none;
  ***REMOVED***
***REMOVED***

li {
    background: #f9f9f9;
    margin: 5px 0;
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
    margin-right: 2px;
    background-color: #ffffff;
***REMOVED***
***REMOVED***
