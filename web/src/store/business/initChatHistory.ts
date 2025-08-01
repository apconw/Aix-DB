import * as GlobalAPI from '@/api'
import * as TransformUtils from '@/components/MarkdownPreview/transform'

const businessStore = useBusinessStore(***REMOVED***
const userStore = useUserStore(***REMOVED***
const router = useRouter(***REMOVED***

type StreamData = {
  dataType: string
***REMOVED***
  data?: any
***REMOVED***

// 历史对话记录数据渲染转换逻辑
const processSingleResponse = (res***REMOVED*** => {
  if (res.body***REMOVED*** {
    const reader = res.body
      .pipeThrough(new TextDecoderStream(***REMOVED******REMOVED***
      .pipeThrough(TransformUtils.splitStream('\n'***REMOVED******REMOVED***
      .pipeThrough(
        new TransformStream<string, string>({
          transform: (
            chunk: string,
            controller: TransformStreamDefaultController,
          ***REMOVED*** => {
          ***REMOVED***
              const jsonChunk = JSON.parse(chunk***REMOVED***
              switch (jsonChunk.dataType***REMOVED*** {
                case 't11':
                  controller.enqueue(
                    JSON.stringify(jsonChunk***REMOVED***,
                  ***REMOVED***
                  break
                case 't02':
                  if (jsonChunk.data***REMOVED*** {
                    controller.enqueue(
                      JSON.stringify(jsonChunk.data***REMOVED***,
                    ***REMOVED***
                  ***REMOVED***
                  break
                case 't04':
                  businessStore.update_writerList(
                    JSON.parse(jsonChunk.data***REMOVED***,
                  ***REMOVED***
                  break
                default:
                  break
              ***REMOVED***
            ***REMOVED*** catch (e***REMOVED*** {
              console.log('Error processing chunk:', e***REMOVED***
            ***REMOVED***
          ***REMOVED***,
          flush: (controller: TransformStreamDefaultController***REMOVED*** => {
            controller.terminate(***REMOVED***
          ***REMOVED***,
        ***REMOVED******REMOVED***,
      ***REMOVED***
      .getReader(***REMOVED***

***REMOVED***
      error: 0,
      reader,
    ***REMOVED***
  ***REMOVED*** else {
***REMOVED***
      error: 1,
      reader: null,
    ***REMOVED***
  ***REMOVED***
***REMOVED***

interface TableItem {
  uuid: string
  key: string
  chat_id: string
***REMOVED***

// 请求接口查询对话历史记录
export const fetchConversationHistory = async function fetchConversationHistory(
  isInit: Ref<boolean>,
  conversationItems: Ref<
    Array<{
      chat_id: string
      qa_type: string
      question: string
      file_key: string
      role: 'user' | 'assistant'
      reader: ReadableStreamDefaultReader | null
    ***REMOVED***>
  >,
  tableData: Ref<TableItem[]>,
  currentRenderIndex: Ref<number>,
  row,
  searchText: string,
***REMOVED*** {
***REMOVED***
    // // 初始化对话历史记录
    // isInit.value = true

    // 清空现有的 conversationItems
    conversationItems.value = []

    const res = await GlobalAPI.query_user_qa_record(1, 999999, searchText, row?.chat_id***REMOVED***
    if (res.status === 401***REMOVED*** {
      userStore.logout(***REMOVED***
      setTimeout((***REMOVED*** => {
        router.replace('/login'***REMOVED***
      ***REMOVED***, 500***REMOVED***
    ***REMOVED*** else if (res.ok***REMOVED*** {
      const data = await res.json(***REMOVED***
      if (data && Array.isArray(data.data?.records***REMOVED******REMOVED*** {
        const records = data.data.records

        // 初始化左右对话侧列表数据
        if (isInit.value***REMOVED*** {
          tableData.value = records.map((chat: any, index: number***REMOVED*** => ({
            uuid: chat.uuid,
            key: chat.question.trim(***REMOVED***,
            chat_id: chat.chat_id,
          ***REMOVED******REMOVED******REMOVED***
        ***REMOVED***

        const itemsToAdd: any[] = []
        // 用户问题
        let question_str = ''
        for (const record of records***REMOVED*** {
          // 问答类型
          let qa_type_str = ''
          // 对话id
          let chat_id_str = ''
          // 文件key
          let file_key_str = ''
          // 自定义id
          let uuid_str = ''
          const streamDataArray: StreamData[] = [];
          [
            'question',
            'to2_answer',
            'to4_answer',
            'qa_type',
            'chat_id',
            'file_key',
            'uuid',
      ***REMOVED***.forEach((key: string***REMOVED*** => {
            if (record.hasOwnProperty(key***REMOVED******REMOVED*** {
              switch (key***REMOVED*** {
                case 'uuid':
                  uuid_str = record[key]
                  break
                case 'qa_type':
                  qa_type_str = record[key]
                  break
                case 'chat_id':
                  chat_id_str = record[key]
                  break
                case 'file_key':
                  file_key_str = record[key]
                  break
                case 'question':
                  question_str = record[key]
                  // streamDataArray.push({
                  //     dataType: 't11',
                  //     content: `问题:${record[key]***REMOVED***`
                  // ***REMOVED******REMOVED***
                  break
                case 'to2_answer':
                ***REMOVED***
                    streamDataArray.push({
                      dataType: 't02',
                      data: {
                        content: JSON.parse(record[key]***REMOVED***
                          .data
                          .content,
                      ***REMOVED***,
                    ***REMOVED******REMOVED***
                  ***REMOVED*** catch (e***REMOVED*** {
                    console.log(e***REMOVED***
                  ***REMOVED***
                  break
                case 'to4_answer':
                  if (
                    record[key] !== null
                    && record[key] !== undefined
                  ***REMOVED*** {
                    streamDataArray.push({
                      dataType: 't04',
                      data: record[key],
                    ***REMOVED******REMOVED***
                  ***REMOVED***
                  break
              ***REMOVED***
            ***REMOVED***
          ***REMOVED******REMOVED***

          if (streamDataArray.length > 0***REMOVED*** {
            const stream = createStreamFromValue(streamDataArray***REMOVED*** // 创建新的流
            const { error, reader ***REMOVED*** = processSingleResponse({
              status: 200, // 假设状态码总是 200
              body: stream,
            ***REMOVED******REMOVED***

            if (error === 0 && reader***REMOVED*** {
              itemsToAdd.push({
                uuid: uuid_str,
                chat_id: chat_id_str,
                qa_type: qa_type_str,
                question: question_str,
                file_key: '',
          ***REMOVED***
                reader: null,
              ***REMOVED******REMOVED***

              itemsToAdd.push({
                chat_id: chat_id_str,
                qa_type: qa_type_str,
                question: question_str,
                file_key: file_key_str,
          ***REMOVED***
                reader,
              ***REMOVED******REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        conversationItems.value = itemsToAdd
        // 这里删除对话后需要重置当前渲染索引
        // currentRenderIndex.value = conversationItems.value.length - 1
        // console.log(conversationItems.value***REMOVED***
        currentRenderIndex.value = 0
      ***REMOVED***
    ***REMOVED*** else {
      console.log('Request failed with status:', res.status***REMOVED***
    ***REMOVED***
  ***REMOVED*** catch (error***REMOVED*** {
    console.log('An error occurred while querying QA records:', error***REMOVED***
  ***REMOVED***
***REMOVED***

function createStreamFromValue(valueArray: StreamData[]***REMOVED*** {
  const encoder = new TextEncoder(***REMOVED***
  return new ReadableStream({
    start(controller: ReadableStreamDefaultController***REMOVED*** {
      valueArray.forEach((value***REMOVED*** => {
        controller.enqueue(encoder.encode(`${JSON.stringify(value***REMOVED******REMOVED***\n`***REMOVED******REMOVED***
      ***REMOVED******REMOVED***
      controller.close(***REMOVED***
    ***REMOVED***,
  ***REMOVED******REMOVED***
***REMOVED***
