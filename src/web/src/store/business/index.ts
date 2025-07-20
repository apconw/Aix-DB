import { defineStore ***REMOVED*** from 'pinia'
import * as GlobalAPI from '@/api'
import * as TransformUtils from '@/components/MarkdownPreview/transform'

export interface BusinessState {
  writerList: any
  qa_type: any
  file_url: any,
  task_id: any
***REMOVED***

export const useBusinessStore = defineStore('business-store', {
  state: (***REMOVED***: BusinessState => {
***REMOVED***
      writerList: {***REMOVED***,
      // 全局报错问答类型
      qa_type: 'COMMON_QA',
      // 全局保存文件问答地址
      file_url: '',
      // 全局保存dify 任务id
      task_id: '',
    ***REMOVED***
  ***REMOVED***,
  actions: {
    /**
     * 更新 问答类型
     */
    update_qa_type(qa_type***REMOVED*** {
      this.qa_type = qa_type
    ***REMOVED***,
    /**
     * 更新文件url
     */
    update_file_url(file_url***REMOVED*** {
      this.file_url = file_url
    ***REMOVED***,
    update_writerList(writerList***REMOVED*** {
      this.writerList = writerList
    ***REMOVED***,
    clearWriterList(***REMOVED*** {
      this.writerList = []
    ***REMOVED***,
    update_task_id(task_id***REMOVED*** {
      this.task_id = task_id
    ***REMOVED***,
    clear_task_id(***REMOVED*** {
      this.task_id = ''
    ***REMOVED***,
    /**
     * Event Stream 调用大模型python服务接口
     */
    async createAssistantWriterStylized(
      uuid,
      chat_id,
      writerOid,
      data,
    ***REMOVED***: Promise<{
        error: number
        reader: ReadableStreamDefaultReader<string> | null
        needLogin: boolean
      ***REMOVED***> {
      return new Promise((resolve***REMOVED*** => {
        const query_str = data.text
        const processResponse = (res***REMOVED*** => {
          if (res.status === 401***REMOVED*** {
            // 登录失效
        ***REMOVED***
              error: 1,
              reader: null,
              needLogin: true,
            ***REMOVED***
          ***REMOVED*** else if (res.status === 200***REMOVED*** {
            const reader = res.body
              .pipeThrough(new TextDecoderStream(***REMOVED******REMOVED***
              .pipeThrough(TransformUtils.splitStream('\n'***REMOVED******REMOVED***
              .pipeThrough(
                new TransformStream({
                  transform: (chunk, controller***REMOVED*** => {
                  ***REMOVED***
                      const jsonChunk = JSON.parse(
                        chunk.split('data:'***REMOVED***[1],
                      ***REMOVED***
                      if (jsonChunk.task_id***REMOVED*** {
                        // 调用已有的更新方法来更新 task_id
                        this.update_task_id(
                          jsonChunk.task_id,
                        ***REMOVED***
                      ***REMOVED***
                      switch (jsonChunk.dataType***REMOVED*** {
                        case 't11':
                          controller.enqueue(
                            JSON.stringify({
                        ***REMOVED***问题: ${query_str***REMOVED***`,
                            ***REMOVED******REMOVED***,
                          ***REMOVED***
                          break
                        case 't02':
                          if (
                            jsonChunk.data
                            && jsonChunk.data.content
                          ***REMOVED*** {
                            controller.enqueue(
                              JSON.stringify(
                                jsonChunk.data,
                              ***REMOVED***,
                            ***REMOVED***
                          ***REMOVED***
                          break
                        case 't04':
                          this.writerList = jsonChunk
                          break
                        default:
                                                // 可以在这里处理其他类型的 dataType
                      ***REMOVED***
                    ***REMOVED*** catch (e***REMOVED*** {
                      console.error(
                        'Error processing chunk:',
                        e,
                      ***REMOVED***
                    ***REMOVED***
                  ***REMOVED***,
                  flush: (controller***REMOVED*** => {
                    controller.terminate(***REMOVED***
                  ***REMOVED***,
                ***REMOVED******REMOVED***,
              ***REMOVED***
              .getReader(***REMOVED***

        ***REMOVED***
              error: 0,
              reader,
              needLogin: false,
            ***REMOVED***
          ***REMOVED*** else {
        ***REMOVED***
              error: 1,
              reader: null,
              needLogin: false,
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        // 调用后端接口拿大模型结果
        GlobalAPI.createOllama3Stylized(query_str, this.qa_type, uuid,chat_id***REMOVED***
          .then((res***REMOVED*** => resolve(processResponse(res***REMOVED******REMOVED******REMOVED***
          .catch((err***REMOVED*** => {
            console.error('Request failed:', err***REMOVED***
            resolve({
              error: 1,
              reader: null,
              needLogin: false,
            ***REMOVED******REMOVED***
          ***REMOVED******REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED***,
  ***REMOVED***,
***REMOVED******REMOVED***
