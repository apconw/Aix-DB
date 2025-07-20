type ContentResult = {
  content: string
  done?: never
***REMOVED***

type DoneResult = {
  done: true
  content?: never
***REMOVED***

type TransformResult = ContentResult | DoneResult
type TransformFunction<T = any> = (rawValue: T, ...args: any***REMOVED*** => TransformResult

/**
 * 转义处理响应值为 data: 的 json 字符串
 * 如: 科大讯飞星火大模型的 response
 */
export const parseJsonLikeData = (content***REMOVED*** => {
  if (content.startsWith('data: '***REMOVED******REMOVED*** {
    const dataString = content.substring(6***REMOVED***.trim(***REMOVED***
    if (dataString === '[DONE]'***REMOVED*** {
  ***REMOVED***
        done: true,
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      return JSON.parse(dataString***REMOVED***
    ***REMOVED*** catch (error***REMOVED*** {
      console.error('JSON parsing error:', error***REMOVED***
    ***REMOVED***
  ***REMOVED***
  return null
***REMOVED***

/**
 * 大模型映射列表
 */
export const LLMTypes = [
***REMOVED***
    label: '模拟数据模型',
    modelName: 'standard',
  ***REMOVED***,
***REMOVED***
    label: 'Spark 星火大模型',
    modelName: 'spark',
  ***REMOVED***,
***REMOVED***
    label: 'Qwen 2大模型',
    modelName: 'qwen2',
  ***REMOVED***,
***REMOVED***
    label: 'SiliconFlow 硅基流动大模型',
    modelName: 'siliconflow',
  ***REMOVED***,
] as const

export type TransformStreamModelTypes = (typeof LLMTypes***REMOVED***[number]['modelName']

/**
 * 用于处理不同类型流的值转换器
 */
export const transformStreamValue: Record<
  TransformStreamModelTypes,
  TransformFunction
> = {
  standard(readValue: Uint8Array, textDecoder: TextDecoder***REMOVED*** {
    let content = ''
    if (readValue instanceof Uint8Array***REMOVED*** {
      content = textDecoder.decode(readValue, {
        stream: true,
      ***REMOVED******REMOVED***
    ***REMOVED*** else {
      content = readValue
    ***REMOVED***
***REMOVED***
      content,
    ***REMOVED***
  ***REMOVED***,
  spark(readValue***REMOVED*** {
    const stream = parseJsonLikeData(readValue***REMOVED***
    if (stream.done***REMOVED*** {
  ***REMOVED***
        done: true,
      ***REMOVED***
    ***REMOVED***
***REMOVED***
      content: stream.choices[0].delta.content || '',
    ***REMOVED***
  ***REMOVED***,
  siliconflow(readValue***REMOVED*** {
    // 与 spark 类似，直接复用
    return this.spark(readValue***REMOVED***
  ***REMOVED***,
  qwen2(readValue***REMOVED*** {
    const stream = JSON.parse(readValue***REMOVED***
***REMOVED***
      content: stream.content,
    ***REMOVED***
  ***REMOVED***,
***REMOVED***

const processParts = (
  buffer,
  controller: TransformStreamDefaultController,
  splitOn,
***REMOVED*** => {
  const parts = buffer.split(splitOn***REMOVED***
  parts.slice(0, -1***REMOVED***.forEach((part***REMOVED*** => {
    if (part.trim(***REMOVED*** !== ''***REMOVED*** {
      controller.enqueue(part***REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
  return parts[parts.length - 1]
***REMOVED***

export const splitStream = (splitOn***REMOVED***: TransformStream<string, string> => {
  let buffer = ''
  return new TransformStream({
    transform(chunk, controller***REMOVED*** {
      buffer += chunk

      if (buffer.trim(***REMOVED***.startsWith('data:'***REMOVED******REMOVED*** {
        buffer = processParts(buffer, controller, splitOn***REMOVED***
      ***REMOVED*** else {
        // 尝试是否能够直接解析为 JSON
      ***REMOVED***
          JSON.parse(buffer***REMOVED***
          buffer = processParts(buffer, controller, splitOn***REMOVED***
        ***REMOVED*** catch (error***REMOVED*** {
          // 如果解析失败，按原文本处理
          controller.enqueue(chunk***REMOVED***
          buffer = ''
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    flush(controller***REMOVED*** {
      if (buffer.trim(***REMOVED*** !== ''***REMOVED*** {
        controller.enqueue(buffer***REMOVED***
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED******REMOVED***
***REMOVED***
