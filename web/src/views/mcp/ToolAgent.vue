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
  ***REMOVED***v-if="message.role === 'user'"  class="content">
***REMOVED***
***REMOVED***
   ***REMOVED***v-else-if="message.role === 'assistant'" class="content">
    ***REMOVED***class="markdown-wrapper" v-html="renderedMarkdown(message.content || ''***REMOVED***"></div>
***REMOVED***
  ***REMOVED***v-else-if="message.role === 'tool'" class="content">
***REMOVED***
***REMOVED***
  ***REMOVED***v-if="message.tool_calls" class="tool-calls">
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
const availableTools = ref<Tool[]>([]***REMOVED***
const messages = ref<Message[]>([]***REMOVED***
const userInput = ref(''***REMOVED***
const loading = ref(false***REMOVED***

***REMOVED***
onMounted(async (***REMOVED*** => {
  await client.connect(transport***REMOVED***
  const tools = await client.listTools(***REMOVED***
  console.log(tools***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED***

***REMOVED***
const callTool = async (toolName: string, parameters: any***REMOVED*** => {
***REMOVED***
***REMOVED***
***REMOVED***
   ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***


***REMOVED***
const callLLM = async (messages: Message[], tools: Tool[]***REMOVED***: Promise<any> => {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***, {
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
***REMOVED***

***REMOVED***
***REMOVED***
      ***REMOVED***]


***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        ...(msg.tool_calls ? { tool_calls: msg.tool_calls ***REMOVED*** : {***REMOVED******REMOVED***,
        ...(msg.tool_call_id ? { tool_call_id: msg.tool_call_id ***REMOVED*** : {***REMOVED******REMOVED***
      ***REMOVED******REMOVED******REMOVED***

     
***REMOVED***
***REMOVED***
    ***REMOVED***,
    ***REMOVED***
    ***REMOVED***
***REMOVED***
        parameters: tool.inputSchema || {***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED******REMOVED***


    ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        'Authorization': 'Bearer ***REMOVED***'
      ***REMOVED***,
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED******REMOVED***

    if (!response.ok***REMOVED*** {
      throw new Error(`API请求失败: ${response.status***REMOVED*** ${response.statusText***REMOVED***`***REMOVED***
    ***REMOVED***

    const result = await response.json(***REMOVED***
    
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
  ***REMOVED*** catch (error***REMOVED*** {
    console.error('调用通义千问API时出错:', error***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***

const call_llm_format_msg = async (message***REMOVED*** => {
***REMOVED***
      ***REMOVED***'role': 'system', 'content': '你是一个信息整理高手,请根据输入整理成markdown格式信息'***REMOVED***,
      ***REMOVED***'role': 'user', 'content': message***REMOVED***
***REMOVED***

  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        'Authorization': 'Bearer ***REMOVED***'
      ***REMOVED***,
***REMOVED***
***REMOVED***
***REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED******REMOVED***

    if (!response.ok***REMOVED*** {
      throw new Error(`API请求失败: ${response.status***REMOVED*** ${response.statusText***REMOVED***`***REMOVED***
    ***REMOVED***

    const result =  await response.json(***REMOVED***
    
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
***REMOVED***

***REMOVED***
const sendMessage = async (***REMOVED*** => {
  if (!userInput.value.trim(***REMOVED*** || loading.value***REMOVED*** return

***REMOVED***
***REMOVED***
    id: Date.now(***REMOVED***.toString(***REMOVED***,
***REMOVED***
***REMOVED***
  ***REMOVED***

***REMOVED***
***REMOVED***
    id: Date.now(***REMOVED***.toString(***REMOVED*** + '_system',
***REMOVED***
***REMOVED***
  ***REMOVED***
  messages.value.push(userMessage***REMOVED***
  messages.value.push(systemMessage***REMOVED***
***REMOVED***
  
***REMOVED***
***REMOVED***
***REMOVED***
    
***REMOVED***
    let response = await callLLM(conversationHistory, availableTools.value***REMOVED***
    
***REMOVED***
***REMOVED***
      id: Date.now(***REMOVED***.toString(***REMOVED*** + '_assistant',
***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
    
    messages.value.push(assistantMessage***REMOVED***
    
***REMOVED***
    while (response.tool_calls && response.tool_calls.length > 0***REMOVED*** {
***REMOVED***
      for (const toolCall of response.tool_calls***REMOVED*** {
      ***REMOVED***
***REMOVED***
***REMOVED***
            JSON.parse(toolCall.function.arguments***REMOVED***
          ***REMOVED***
          
***REMOVED***
***REMOVED***
            id: `${Date.now(***REMOVED***.toString(***REMOVED******REMOVED***_tool_${toolCall.id***REMOVED***`,
***REMOVED***
***REMOVED***
***REMOVED***
          ***REMOVED***
          
          messages.value.push(toolMessage***REMOVED***

***REMOVED***
        response = await callLLM(messages.value, availableTools.value***REMOVED***
***REMOVED***
          id: Date.now(***REMOVED***.toString(***REMOVED*** + '_final',
    ***REMOVED***
    ***REMOVED***
        ***REMOVED***
        
          messages.value.push(finalMessage***REMOVED***
        
        ***REMOVED*** catch (toolError***REMOVED*** {
***REMOVED***
***REMOVED***
            id: `${Date.now(***REMOVED***.toString(***REMOVED******REMOVED***_tool_error_${toolCall.id***REMOVED***`,
***REMOVED***
            content: '工具执行失败: ' + (toolError as Error***REMOVED***.message,
***REMOVED***
          ***REMOVED***
          
          messages.value.push(toolErrorMessage***REMOVED***
        ***REMOVED***

      ***REMOVED***
      
    ***REMOVED***
  ***REMOVED*** catch (error***REMOVED*** {
    console.error('处理消息时出错:', error***REMOVED***
***REMOVED***
      id: Date.now(***REMOVED***.toString(***REMOVED*** + '_error',
***REMOVED***
      content: '抱歉，处理您的请求时出现错误：' + (error as Error***REMOVED***.message
    ***REMOVED******REMOVED***
  ***REMOVED*** finally {
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
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(h1***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(h2***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(h3***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(p***REMOVED*** {
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(ul***REMOVED***, .markdown-wrapper :deep(ol***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(li***REMOVED*** {
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(code***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(pre***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(pre > code***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(blockquote***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(table***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(th***REMOVED***, .markdown-wrapper :deep(td***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.markdown-wrapper :deep(th***REMOVED*** {
***REMOVED***
***REMOVED***
.markdown-wrapper :deep(img***REMOVED*** {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***