import * as GlobalAPI from '@/api'
import * as TransformUtils from '@/components/MarkdownPreview/transform'

import router from '@/router'

const businessStore = useBusinessStore()
const userStore = useUserStore()
// const router = useRouter() // Removed to avoid inject() warning outside setup

type StreamData = {
  dataType: string
  content?: string
  data?: any
}

// 历史对话记录数据渲染转换逻辑
const processSingleResponse = (res) => {
  if (res.body) {
    const reader = res.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(TransformUtils.splitStream('\n'))
      .pipeThrough(
        new TransformStream<string, string>({
          transform: (
            chunk: string,
            controller: TransformStreamDefaultController,
          ) => {
            try {
              const jsonChunk = JSON.parse(chunk)
              switch (jsonChunk.dataType) {
                case 't11':
                  controller.enqueue(
                    JSON.stringify(jsonChunk),
                  )
                  break
                case 't02':
                  if (jsonChunk.data) {
                    controller.enqueue(
                      JSON.stringify(jsonChunk.data),
                    )
                  }
                  break
                case 't04':
                  businessStore.update_writerList(
                    JSON.parse(jsonChunk.data),
                  )
                  break
                default:
                  break
              }
            } catch (e) {
              // 处理 chunk 时出错，忽略继续处理
            }
          },
          flush: (controller: TransformStreamDefaultController) => {
            controller.terminate()
          },
        }),
      )
      .getReader()

    return {
      error: 0,
      reader,
    }
  } else {
    return {
      error: 1,
      reader: null,
    }
  }
}

interface TableItem {
  uuid: string
  key: string
  chat_id: string
  qa_type: string
  datasource_id?: number
  datasource_name?: string
}

// 请求接口查询对话历史记录
export const fetchConversationHistory = async function fetchConversationHistory(
  isInit: Ref<boolean>,
  conversationItems: Ref<
    Array<{
      chat_id: string
      qa_type: string
      question: string
      file_key: {
        source_file_key: string
        parse_file_key: string
        file_size: string
      }[]
      role: 'user' | 'assistant'
      reader: ReadableStreamDefaultReader | null
    }>
  >,
  tableData: Ref<TableItem[]>,
  currentRenderIndex: Ref<number>,
  row,
  searchText: string,
  page = 1,
  limit = 20,
  append = false,
  loadOlder = false,
) {
  try {
    // 清空现有的 conversationItems（仅在重置时，即 append=false 且 loadOlder=false）
    // 注意：loadOlder=true 时，append=false，但不应该清空，因为要从前面插入
    if (!append && !loadOlder && row?.chat_id) {
      conversationItems.value = []
    }

    // 如果只是加载列表（没有指定 chat_id），使用优化接口（只返回必要字段）
    // 如果需要加载详细对话记录（有 chat_id），使用原接口（返回所有字段）
    let res
    if (!row?.chat_id) {
      // 列表加载：使用优化接口，只返回必要字段，提升加载速度
      res = await GlobalAPI.query_user_record_list(
        page,
        limit,
        searchText,
      )
    } else {
      // 详细对话加载：使用原接口，返回所有字段
      res = await GlobalAPI.query_user_qa_record(
        page,
        limit,
        searchText,
        row?.chat_id,
      )
    }
    if (res.status === 401) {
      userStore.logout()
      setTimeout(() => {
        router.replace('/login')
      }, 500)
    } else if (res.ok) {
      const data = await res.json()
      if (data && Array.isArray(data.data?.records)) {
        let records = data.data.records
        
        // 确保 records 按 uuid 去重（防止后端返回重复数据）
        const uniqueRecords = new Map<string, any>()
        for (const record of records) {
          if (record.uuid && !uniqueRecords.has(record.uuid)) {
            uniqueRecords.set(record.uuid, record)
          }
        }
        records = Array.from(uniqueRecords.values())

        // 初始化左右对话侧列表数据
        if (isInit.value || !row?.chat_id) {
          const nextTableRows = records.map((chat: any) => ({
            uuid: chat.uuid,
            key: chat.question.trim(),
            chat_id: chat.chat_id,
            qa_type: chat.qa_type,
            datasource_id: chat.datasource_id,
            datasource_name: chat.datasource_name,
          }))

          if (append) {
            const exists = new Set(tableData.value.map((item) => item.chat_id))
            const filtered = nextTableRows.filter(
              (item) => !exists.has(item.chat_id),
            )
            tableData.value = [...tableData.value, ...filtered]
          } else {
            tableData.value = nextTableRows
          }
        }

        const itemsToAdd: any[] = []
        // 用户问题
        let question_str = ''
        const processedUuids = new Set<string>() // 用于追踪已处理的 uuid，防止重复
        for (const record of records) {
          // 问答类型
          let qa_type_str = ''
          // 对话id
          let chat_id_str = ''
          // 文件keys
          let file_key_json = []
          // 自定义id
          let uuid_str = ''
          const streamDataArray: StreamData[] = [];
          // 如果已经处理过这个 uuid，跳过
          if (record.uuid && processedUuids.has(record.uuid)) {
            continue
          }
          if (record.uuid) {
            processedUuids.add(record.uuid)
          }
          [
            'question',
            'to2_answer',
            'to4_answer',
            'qa_type',
            'chat_id',
            'file_key',
            'uuid',
          ].forEach((key: string) => {
            if (record.hasOwnProperty(key)) {
              switch (key) {
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
                  if (record[key]) {
                    file_key_json = JSON.parse(record[key])
                  }
                  break
                case 'question':
                  question_str = record[key]
                  break
                case 'to2_answer':
                  try {
                    streamDataArray.push({
                      dataType: 't02',
                      data: {
                        content: JSON.parse(record[key])
                          .data
                          .content,
                      },
                    })
                  } catch (e) {
                    // 解析数据时出错，忽略继续处理
                  }
                  break
                case 'to4_answer':
                  if (
                    record[key] !== null
                    && record[key] !== undefined
                  ) {
                    streamDataArray.push({
                      dataType: 't04',
                      data: record[key],
                    })
                  }
                  break
              }
            }
          })

          if (streamDataArray.length > 0 && row?.chat_id) {
            const stream = createStreamFromValue(streamDataArray) // 创建新的流
            const { error, reader } = processSingleResponse({
              status: 200, // 假设状态码总是 200
              body: stream,
            })

            // 从 to4_answer 中提取图表数据
            let chartData = null
            const t04Data = streamDataArray.find(item => item.dataType === 't04')
            if (t04Data && t04Data.data) {
              try {
                const parsedData = typeof t04Data.data === 'string' ? JSON.parse(t04Data.data) : t04Data.data
                if (parsedData && parsedData.data) {
                  chartData = parsedData.data
                }
              } catch (e) {
                // 解析图表数据时出错，忽略继续处理
              }
            }

            if (error === 0 && reader) {
              itemsToAdd.push({
                uuid: uuid_str,
                chat_id: chat_id_str,
                qa_type: qa_type_str,
                question: question_str,
                file_key: file_key_json,
                role: 'user',
                reader: null,
                record_id: record.id,
                datasource_id: record.datasource_id,
              })

              itemsToAdd.push({
                chat_id: chat_id_str,
                qa_type: qa_type_str,
                question: '',
                file_key: [],
                role: 'assistant',
                reader,
                chartData,
                record_id: record.id,
                datasource_id: record.datasource_id,
              })
            }
          }
        }

        // 只有在查看具体对话时才更新右侧内容
        if (row?.chat_id) {
          if (loadOlder) {
            // 加载更旧的消息时，从前面插入
            conversationItems.value = [...itemsToAdd, ...conversationItems.value]
            // 保持滚动位置（需要在前端处理）
            currentRenderIndex.value = itemsToAdd.length
          } else if (append) {
            // 向后加载时，从后面追加
            conversationItems.value = [...conversationItems.value, ...itemsToAdd]
            currentRenderIndex.value = conversationItems.value.length - 1
          } else {
            // 重置时，直接替换（只有在reset=true时才会到这里）
            conversationItems.value = itemsToAdd
            currentRenderIndex.value = 0
          }
        }

        return {
          currentPage: data.data?.current_page ?? page,
          totalPages: data.data?.total_pages ?? 1,
          totalCount: data.data?.total_count ?? records.length,
        }
      }
    }
  } catch (error) {
    // 查询 QA 记录时出错，忽略
  }
}

function createStreamFromValue(valueArray: StreamData[]) {
  const encoder = new TextEncoder()
  return new ReadableStream({
    start(controller: ReadableStreamDefaultController) {
      valueArray.forEach((value) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(value)}\n`))
      })
      controller.close()
    },
  })
}
