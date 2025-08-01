import * as TransformUtils from '@/components/MarkdownPreview/transform'
import { mockEventStreamText ***REMOVED*** from '@/data'

export const bytesToKB = (bytes***REMOVED*** => {
  return bytes / 1024
***REMOVED***

export const bytesToMB = (bytes***REMOVED*** => {
  return bytes / (1024 * 1024***REMOVED*** // 1048576 = 1024 * 1024
***REMOVED***

export const bytesToGB = (bytes***REMOVED*** => {
  return bytes / (1024 * 1024 * 1024***REMOVED*** // 1073741824 = 1024 * 1024 * 1024
***REMOVED***

export const bytesToTB = (bytes***REMOVED*** => {
  return bytes / (1024 * 1024 * 1024 * 1024***REMOVED*** // 1099511627776 = 1024 * 1024 * 1024 * 1024
***REMOVED***

export const formatBytes = (bytes***REMOVED*** => {
  if (bytes === 0***REMOVED*** {
    return '0 Bytes'
  ***REMOVED***
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes***REMOVED*** / Math.log(k***REMOVED******REMOVED***
  return `≈ ${Number.parseFloat((bytes / k ** i***REMOVED***.toFixed(0***REMOVED******REMOVED******REMOVED*** ${sizes[i]***REMOVED***`
***REMOVED***

/**
 * 将文本内容转换为 .txt 文件
 */
export const convertTextToFile = (textContent, fileName***REMOVED*** => {
  const blob = new Blob([textContent], {
    type: 'text/plain',
  ***REMOVED******REMOVED***
  const file = new File([blob], fileName, {
    type: 'text/plain',
  ***REMOVED******REMOVED***
  return file
***REMOVED***


/**
 * 将文本中的非法文件名字符替换为 '-'，并在末尾追加或替换为 .txt 后缀
 * @param {string***REMOVED*** text - 要处理的文本
 * @returns {string***REMOVED*** - 处理后的文件名
 */
export const sanitizeAndAppendTxtExtension = (text***REMOVED*** => {
  // 替换非法文件名字符为 '-'，包括 '.', 逗号和其他非法字符
  const sanitizedText = text.replace(/[/\\:*?"<>|.,;]/g, '-'***REMOVED***

  // 使用正则表达式检查并替换最后的后缀
  return `${sanitizedText.replace(/\.[^/.]+$/, ''***REMOVED******REMOVED***.txt`
***REMOVED***


export const createMockReader = (delay = 5***REMOVED***: ReadableStreamDefaultReader<string> => {
  const chunkSize = 10
  const originData = mockEventStreamText
  const contentData = originData.repeat(1***REMOVED***
  const encoder = new TextEncoder(***REMOVED***
  const encodedData = encoder.encode(contentData***REMOVED***
  let offset = 0

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller***REMOVED*** {
      if (offset < encodedData.length***REMOVED*** {
        await new Promise((resolve***REMOVED*** => setTimeout(resolve, delay***REMOVED******REMOVED***
        const end = Math.min(offset + chunkSize, encodedData.length***REMOVED*** // 确保不超出边界
        controller.enqueue(encodedData.subarray(offset, end***REMOVED******REMOVED***
        offset = end
      ***REMOVED*** else {
        controller.close(***REMOVED***
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED******REMOVED***

  return stream.pipeThrough(new TextDecoderStream(***REMOVED******REMOVED***
    .pipeThrough(TransformUtils.splitStream('\n'***REMOVED******REMOVED***
    .getReader(***REMOVED***
***REMOVED***

export function parseMultiJson(jsonStr: string***REMOVED***: any[] {
  const jsonArr: any[] = []
  let startIndex = 0

  while (startIndex < jsonStr.length***REMOVED*** {
    // 寻找潜在 JSON 对象的开始位置
    const objectStart = jsonStr.indexOf('{', startIndex***REMOVED***
    if (objectStart === -1***REMOVED*** {
      // 如果没有找到更多的 JSON 对象，将剩余部分作为单个项添加
      if (startIndex === 0***REMOVED*** {
        return [jsonStr] // 整个字符串不是 JSON
      ***REMOVED***
      break
    ***REMOVED***

    // 寻找 JSON 对象的结束位置
    let openBrackets = 1
    let objectEnd = objectStart + 1
    while (openBrackets > 0 && objectEnd < jsonStr.length***REMOVED*** {
      if (jsonStr[objectEnd] === '{'***REMOVED*** {
        openBrackets++
      ***REMOVED*** else if (jsonStr[objectEnd] === '***REMOVED***'***REMOVED*** {
        openBrackets--
      ***REMOVED***
      objectEnd++
    ***REMOVED***

    // 提取潜在的 JSON 对象
    const potentialJson = jsonStr.substring(objectStart, objectEnd***REMOVED***

  ***REMOVED***
      const parsedJson = JSON.parse(potentialJson***REMOVED***
      jsonArr.push(parsedJson***REMOVED***
      startIndex = objectEnd
    ***REMOVED*** catch (error***REMOVED*** {
      // 如果解析失败，移动到下一个字符并继续搜索
      if (jsonArr.length === 0***REMOVED*** {
        return [jsonStr] // 整个字符串不是有效的 JSON
      ***REMOVED***
      startIndex = objectStart + 1
    ***REMOVED***
  ***REMOVED***

  return jsonArr.length > 0 ? jsonArr : [jsonStr]
***REMOVED***
