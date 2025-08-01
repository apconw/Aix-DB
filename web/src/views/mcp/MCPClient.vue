<script lang="tsx" setup>
***REMOVED***
***REMOVED***

const message = ref(''***REMOVED***
const messages = ref(''***REMOVED***
const connectionStatus = ref('Disconnected'***REMOVED***
// https://github.com/modelcontextprotocol/typescript-sdk
***REMOVED***
  new URL(`${location.origin***REMOVED***/sse`***REMOVED***,
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***,
***REMOVED***
***REMOVED***
      prompts: {***REMOVED***,
      resources: {***REMOVED***,
      tools: {***REMOVED***,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***

onMounted(async (***REMOVED*** => {
  await client.connect(transport***REMOVED***
  connectionStatus.value = 'Connected'
  const tools = await client.listTools(***REMOVED***
  console.log(tools***REMOVED***
***REMOVED******REMOVED***

const sendMessage = async (***REMOVED*** => {
  const result = await client.callTool({
    name: 'amap-maps_weather',
    arguments: {
      city: message.value,
    ***REMOVED***,
  ***REMOVED******REMOVED***
  messages.value = JSON.stringify(result.content***REMOVED***
  console.log(result.content***REMOVED***
***REMOVED***




// List prompts
// const prompts = await client.listPrompts(***REMOVED***
// console.log(prompts***REMOVED***

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
***REMOVED***
    <div class="mcp-client">
      <h1>MCP Client</h1>
      <p>Connection Status: {{ connectionStatus ***REMOVED******REMOVED***</p>

      <!-- 输入框和按钮 -->
      <div>
        <input
          v-model="message"
          style="width: 280px; height: 25px"
          placeholder="Enter message to send"
        >
        <button
          style="height: 25px; margin-left: 2px; width: 80px"
          @click="sendMessage"
        >
          Send
        </button>
***REMOVED***

      <!-- 消息日志 -->
      <div class="message-log">
        <h3>Message Log:</h3>
        <ul>
        ***REMOVED***{
            messages
          ***REMOVED******REMOVED***
        </ul>
***REMOVED***
***REMOVED***
***REMOVED***
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
***REMOVED***
***REMOVED***
***REMOVED***
