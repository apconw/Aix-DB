<script lang="tsx" setup>
import type { InputInst, UploadFileInfo } from 'naive-ui'
// Import Cookies to clear token on logout
import { UAParser } from 'ua-parser-js'
import * as GlobalAPI from '@/api'
import { fetch_model_list, set_default_model } from '@/api/aimodel'
import { fetch_datasource_list } from '@/api/datasource'
import { isMockDevelopment } from '@/config'
import SideBar from '@/components/Navigation/SideBar.vue'
import DefaultPage from './default-page.vue'
import FileListItem from '@/views/file/file-list-item.vue'
import FileUploadManager from '@/views/file/file-upload-manager.vue'

import SuggestedView from './suggested-page.vue'
import TableModal from '@/views/datasource/table-modal.vue'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

// 显示默认页面
const showDefaultPage = ref(true)

// 全局存储
const businessStore = useBusinessStore()

// 是否是刚登录到系统 批量渲染对话记录
const isInit = ref(true)

// 是否查看历史消息标识
const isView = ref(false)

// 使用 onMounted 生命周期钩子加载历史对话
// 新增：加载历史对话的状态
const isLoadingHistory = ref(false)
const isLoadingMoreHistory = ref(false)
const historyPage = ref(1)
const historyTotalPages = ref(1)
const historyPageSize = 20
const hasMoreHistory = computed(
  () => historyPage.value <= historyTotalPages.value,
)
// 根据分页信息判断是否需要强制显示滚动条
// 当总页数大于1时，即使内容不够高也要显示滚动条，以便触发滚动加载
const shouldForceScrollbar = computed(
  () => historyTotalPages.value > 1,
)

// 对话历史分页状态（点击某个对话记录时使用）
const conversationHistoryPage = ref(1)
const conversationHistoryTotalPages = ref(1)
const conversationHistoryPageSize = 3
const currentConversationChatId = ref<string | null>(null)
const isLoadingConversationHistory = ref(false)
const isLoadingMoreConversationHistory = ref(false)
// 当前已加载的最大页码（用于判断是否还有更多页面）
const conversationHistoryCurrentLoadedPage = ref(1)
// 已加载的页面集合，用于避免重复加载
const loadedPages = ref<Set<number>>(new Set())
// 已加载的最小页码（用于向前加载时判断）
const conversationHistoryMinLoadedPage = ref(1)
const hasMoreConversationHistory = computed(
  () => conversationHistoryCurrentLoadedPage.value < conversationHistoryTotalPages.value,
)

// 新增：专门用于控制转场动画的Key，避免因 currentConversationChatId 变化（如追加消息时）导致组件重载
const chatTransitionKey = ref('chat-list')

// 技能中心：跳转独立页面
function handleSkillCenterClick() {
  router.push({ name: 'SkillCenter' })
}

// 管理对话
const isModalOpen = ref(false)
function openModal() {
  // 对话进行中时禁用
  if (stylizingLoading.value) {
    return
  }
  isModalOpen.value = true
}
// 模态框关闭
function handleModalClose(value) {
  isModalOpen.value = value
  // 仅在关闭弹窗时刷新历史列表，保持当前页面状态，避免默认页/对话区来回切换产生抖动
  if (!value) {
    isInit.value = true
    // 重新加载对话记录
    loadHistoryList({ reset: true })
    // 恢复到新对话页面
    if (!showDefaultPage.value) {
      newChat()
    }
  }
}

// 新建对话
function newChat() {
  // 对话进行中时禁用
  if (stylizingLoading.value) {
    return
  }
  backgroundColorVariable.value = '#ffffff'

  // 更新转场Key，确保如果是从聊天页切回默认页（虽然这里是切到默认页，动画由v-if控制，但重置Key是个好习惯）
  // 或者如果直接在当前页重置（假设逻辑允许），Key变化会触发动画
  chatTransitionKey.value = `new-chat-${Date.now()}`

  if (showDefaultPage.value) {
    window.$ModalMessage.success(`已经是最新对话`)
    return
  }
  showDefaultPage.value = true
  isInit.value = true
  conversationItems.value = []
  stylizingLoading.value = false
  suggested_array.value = []

  // 清除表格选中状态
  currentIndex.value = null

  // 重置查看历史消息标识
  isView.value = false

  // 重置内容加载状态
  contentLoadingStates.value = []
  currentRenderIndex.value = 0

  // 清除所有步骤信息
  stepProgressStates.value = {}

  // 重置对话类型为默认值（智能问答）
  qa_type.value = 'COMMON_QA'
  businessStore.update_qa_type('COMMON_QA')

  // 清空选中的数据源
  selectedDatasource.value = null

  // 清空文件列表
  businessStore.clear_file_list()

  // 清空 writerList，避免显示旧对话类型的数据
  businessStore.clearWriterList()

  // 清空记录ID
  businessStore.clear_record_id()

  // 重置所有问答类型的uuid
  uuids.value = {}
  uuids.value['COMMON_QA'] = uuidv4()
}

/**
 * 默认大模型显示名称（从 t_ai_model 动态查询，用于页面显示）
 * 约定：model_type = 1 表示大语言模型，default_model = true 表示默认模型
 */
const defaultLLMTypeName = ref('')

/**
 * 数据流转换模型类型（用于 MarkdownPreview 组件的数据流处理）
 * 固定为 'qwen2'，因为这是数据流转换所需的类型标识符
 */
const defaultLLMTypeForStream = 'qwen2'

// 大语言模型列表与当前选中模型（用于下拉选择）
const llmModels = ref<any[]>([])
const selectedLLMModelId = ref<number | null>(null)

const llmModelOptions = computed(() =>
  llmModels.value.map((m) => ({
    label: m.name,
    value: m.id,
  })),
)

// Dropdown 组件需要的选项格式
const llmModelDropdownOptions = computed(() =>
  llmModels.value.map((m) => ({
    label: () => m.name,
    key: m.id,
  })),
)

// 当前选中模型的名称
const selectedLLMModelName = computed(() => {
  if (!selectedLLMModelId.value) return ''
  const model = llmModels.value.find((m) => m.id === selectedLLMModelId.value)
  return model?.name || ''
})

// 查询所有大语言模型，并确定当前默认模型
const loadLLMModels = async () => {
  try {
    // 1 = LLM，大语言模型
    const res = await fetch_model_list(undefined, 1)
    const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []
    llmModels.value = list

    if (list.length > 0) {
      // 优先找 default_model = true 的
      const defaultItem = list.find((m: any) => m.default_model)
      const model = defaultItem || list[0]
      if (model) {
        selectedLLMModelId.value = model.id
        if (model.name) {
          defaultLLMTypeName.value = model.name
        }
      }
    }
  } catch (e) {
    console.error('加载大语言模型列表失败:', e)
    // 失败时保持初始占位名称，不打断页面
  }
}

// 修改默认大模型（适配 Dropdown 的 select 事件，参数是 key）
const handleLLMModelChange = async (key: number | string) => {
  const modelId = typeof key === 'string' ? parseInt(key) : key
  selectedLLMModelId.value = modelId
  const target = llmModels.value.find((m: any) => m.id === modelId)
  if (target?.name) {
    defaultLLMTypeName.value = target.name
  }
  try {
    await set_default_model(modelId)
    window.$ModalMessage?.success?.('默认模型已更新')
  } catch (e) {
    console.error('更新默认模型失败:', e)
    window.$ModalMessage?.error?.('更新默认模型失败，请重试')
  }
}
const currentChatId = computed(() => {
  return route.params.chatId
})


// 对话等待提示词图标
const stylizingLoading = ref(false)

// 输入字符串
const inputTextString = ref('')
const refInputTextString = ref<InputInst | null>()

// 输出字符串 Reader 流（风格化的）
const outputTextReader = ref<ReadableStreamDefaultReader | null>()

// markdown对象
const refReaderMarkdownPreview = ref<any>()

// 主内容区域
const messagesContainer = ref<HTMLElement | null>(null)

// 读取失败
const onFailedReader = (index: number) => {
  if (conversationItems.value[index]) {
    conversationItems.value[index].reader = null
    stylizingLoading.value = false
    // 取消推荐问题按钮和重新对话按钮的禁用状态（请求失败时）
    businessStore.set_suggested_disabled(false)
    if (refReaderMarkdownPreview.value) {
      refReaderMarkdownPreview.value.initializeEnd()
    }
    window.$ModalMessage.error('请求失败，请重试')
    setTimeout(() => {
      if (refInputTextString.value) {
        refInputTextString.value.select()
      }
    })
  }
}

const onCompletedReader = (index: number) => {
  if (conversationItems.value[index]) {
    stylizingLoading.value = false
    // 取消推荐问题按钮和重新对话按钮的禁用状态
    businessStore.set_suggested_disabled(false)
    // 清除步骤信息：对话完成后清除该对话的步骤进度信息
    if (stepProgressStates.value[index] !== undefined) {
      delete stepProgressStates.value[index]
    }
    // 隐藏加载动画（找到对应的 visibleIndex）
    const item = conversationItems.value[index]
    const visibleIndex = visibleConversationItems.value.findIndex(vi => vi.uuid === item.uuid)
    if (visibleIndex >= 0) {
      // 设置所有对应同一个 originalIndex 的 visibleIndex 的加载状态为 false
      const assistantVisibleIndexes: number[] = [visibleIndex]
      for (let i = 0; i < visibleConversationItems.value.length; i++) {
        const vi = visibleConversationItems.value[i]
        if (vi && vi.uuid === item.uuid && i !== visibleIndex) {
          assistantVisibleIndexes.push(i)
        }
      }
      assistantVisibleIndexes.forEach(vi => {
        if (contentLoadingStates.value[vi] !== undefined) {
          contentLoadingStates.value[vi] = false
        }
      })
    }
    setTimeout(() => {
      if (refInputTextString.value) {
        refInputTextString.value.select()
      }
    })
  }
}

// 当前索引位置
const currentRenderIndex = ref(0)
// 图表子组件渲染完毕
const onChartReady = (index) => {
  if (index < conversationItems.value.length) {
    currentRenderIndex.value = index
    stylizingLoading.value = false
    // 取消推荐问题按钮和重新对话按钮的禁用状态（数据问答图表渲染完成后）
    businessStore.set_suggested_disabled(false)
  }
}

const onRecycleQa = async (index: number) => {
  // 设置当前选中的问答类型
  const item = conversationItems.value[index - 1]
  onAqtiveChange(item.qa_type, item.chat_id)


  // 清空推荐列表
  suggested_array.value = []
  // 发送问题重新生成
  handleCreateStylized(item.question, item.file_key)
  scrollToBottom()
}

// 赞 结果反馈
const onPraiseFeadBack = async (index: number) => {
  const item = conversationItems.value[index]
  const res = await GlobalAPI.fead_back(item.chat_id, 'like')
  if (res.ok) {
    window.$ModalMessage.destroyAll()
    window.$ModalMessage.success('感谢反馈', {
      duration: 1500,
    })
  }
}

// 开始输出时隐藏加载提示
const onBeginRead = async (index: number) => {
  // 设置最上面的滚动提示图标隐藏
  contentLoadingStates.value[currentRenderIndex.value - 1] = false
}

// 踩 结果反馈
const onBelittleFeedback = async (index: number) => {
  const item = conversationItems.value[index]
  const res = await GlobalAPI.fead_back(item.chat_id, 'dislike')
  if (res.ok) {
    window.$ModalMessage.destroyAll()
    window.$ModalMessage.success('感谢反馈', {
      duration: 1500,
    })
  }
}

// 侧边栏对话历史
interface TableItem {
  uuid: string
  key: string
  chat_id: string
  qa_type: string
  datasource_id?: number
  datasource_name?: string
}
const tableData = ref<TableItem[]>([])
const tableRef = ref(null)
const historyScrollRef = useTemplateRef('historyScrollRef')

// 保存对话历史记录
const conversationItems = ref<
  Array<{
    uuid: string
    chat_id: string
    qa_type: string
    question: string
    role: 'user' | 'assistant'
    reader: ReadableStreamDefaultReader | null
    file_key: {
      source_file_key: string
      parse_file_key: string
      file_size: string
    }[]
    datasource_id?: number
    chartData?: { // 图表数据，用于多轮对话数据隔离
      template_code?: string
      columns?: string[]
      data?: any[]
      recommended_questions?: string[]
    } | null
    record_id?: number // 记录ID，用于查询SQL语句
  }>
>([])

// 这里子组件 chart渲染慢需要子组件渲染完毕后通知父组件
// 但是，当查看历史记录时（isView=true），所有数据都是静态的，不需要渐进式渲染，应该显示全部
const visibleConversationItems = computed(() => {
  if (isView.value) {
    // 查看历史记录时，显示所有项目
    return conversationItems.value
  } else {
    // 实时对话时，使用渐进式渲染
    return conversationItems.value.slice(0, currentRenderIndex.value + 2)
  }
})
// 这里控制内容加载状态
// 使用函数确保每次访问时都能获取最新的长度
const contentLoadingStates = ref<boolean[]>([])

// 确保 contentLoadingStates 数组长度与 visibleConversationItems 同步
watch(
  () => visibleConversationItems.value.length,
  (newLength, oldLength) => {
    // 当 visibleConversationItems 长度变化时，扩展 contentLoadingStates
    while (contentLoadingStates.value.length < newLength) {
      contentLoadingStates.value.push(false)
    }
  },
  { immediate: true }
)

// 控制每个对话项的进度显示状态（用于隐藏 bars-scale）
const progressDisplayStates = ref<Record<number, boolean>>({})

// 处理进度显示状态变化
// 注意：这个事件用于隐藏旧的 bars-scale loading，但现在我们使用 SVG 图标
// 只有当内容真正开始渲染时（hasProgress=true），才隐藏 SVG
// 但是，如果后端推送了步骤信息，我们不应该隐藏 SVG，而是继续显示 SVG 和步骤信息
const onProgressDisplayChange = (index: number, hasProgress: boolean) => {
  // 如果后端推送了步骤信息，不要隐藏 SVG（继续显示 SVG 和步骤信息）
  // 只有当没有步骤信息且内容开始渲染时，才隐藏 SVG
  const hasStepProgress = !!getStepProgressForIndex(index)
  if (hasStepProgress) {
    // 有步骤信息时，不隐藏 SVG，继续显示 SVG 和步骤信息
    progressDisplayStates.value[index] = false
  } else {
    // 没有步骤信息时，按原逻辑处理
    progressDisplayStates.value[index] = hasProgress
  }
}

// 存储每个对话项的步骤进度信息（使用 conversationItems 的索引作为键）
const stepProgressStates = ref<Record<number, { stepName: string; status: string; progressId: string }>>({})

// 监控 contentLoadingStates 和 progressDisplayStates 的变化，用于调试
watch(
  () => visibleConversationItems.value.map((item, idx) => ({
    index: idx,
    uuid: item.uuid,
    role: item.role,
    contentLoading: contentLoadingStates.value[idx],
    progressDisplay: progressDisplayStates.value[idx],
    condition: contentLoadingStates.value[idx] && !progressDisplayStates.value[idx],
  })),
  (newStates) => {
    // 监控状态变化（用于调试，已移除调试日志）
  },
  { deep: true }
)

// 计算属性：根据 visibleConversationItems 的索引获取对应的步骤进度信息
const getStepProgressForIndex = (visibleIndex: number) => {
  // 获取 visibleConversationItems 中对应索引的 item
  const item = visibleConversationItems.value[visibleIndex]
  if (!item) return undefined

  // 找到该 item 在 conversationItems 中的原始索引
  const originalIndex = conversationItems.value.findIndex(ci => ci.uuid === item.uuid)

  if (originalIndex >= 0) {
    return stepProgressStates.value[originalIndex]
  }
  return undefined
}

// 处理步骤进度信息（接收的是 visibleConversationItems 的索引）
const onStepProgress = (visibleIndex: number, progress: any) => {
  // 获取 visibleConversationItems 中对应索引的 item，找到其在 conversationItems 中的原始索引
  const item = visibleConversationItems.value[visibleIndex]
  if (!item) {
    return
  }

  const originalIndex = conversationItems.value.findIndex(ci => ci.uuid === item.uuid)
  if (originalIndex < 0) {
    return
  }

  if (progress && progress.type === 'step_progress' && progress.stepName && progress.progressId) {
    // 过滤掉"统一收集（结果总结→图表数据→推荐问题）"步骤，不显示
    if (progress.stepName && progress.stepName.includes('统一收集（结果总结→图表数据→推荐问题）')) {
      return
    }
    // 过滤掉"并行处理（图表配置与结果总结）..."步骤，不显示
    if (progress.stepName && progress.stepName.includes('并行处理（图表配置与结果总结）')) {
      return
    }
    // 只有当状态为 start 时才显示/替换步骤信息
    // complete 状态不做任何操作，等待下一个步骤的 start 来替换
    if (progress.status === 'start') {
      // 确保加载状态为 true（使用 visibleIndex，因为 contentLoadingStates 是基于 visibleConversationItems 的）
      // 确保数组长度足够
      while (contentLoadingStates.value.length <= visibleIndex) {
        contentLoadingStates.value.push(false)
      }
      // 同时设置 visibleIndex 和 originalIndex 对应的 visibleIndex（如果有的话）
      // 因为同一个 assistant 消息可能在 visibleConversationItems 中有不同的索引
      const assistantVisibleIndexes: number[] = [visibleIndex]
      // 查找所有对应同一个 originalIndex 的 visibleIndex
      for (let i = 0; i < visibleConversationItems.value.length; i++) {
        const vi = visibleConversationItems.value[i]
        if (vi && vi.uuid === item.uuid && i !== visibleIndex) {
          assistantVisibleIndexes.push(i)
        }
      }

      // 为所有相关的 visibleIndex 设置 contentLoadingStates
      assistantVisibleIndexes.forEach(vi => {
        while (contentLoadingStates.value.length <= vi) {
          contentLoadingStates.value.push(false)
        }
        if (!contentLoadingStates.value[vi]) {
          contentLoadingStates.value[vi] = true
        }
        // 确保 progressDisplayStates 为 false（显式设置，即使之前是 undefined）
        progressDisplayStates.value[vi] = false
      })

      // 使用原始索引存储步骤状态（直接替换之前的步骤信息）
      stepProgressStates.value = {
        ...stepProgressStates.value,
        [originalIndex]: {
          stepName: progress.stepName,
          status: progress.status,
          progressId: progress.progressId,
        }
      }

      // 使用 nextTick 确保 DOM 更新
      nextTick(() => {
        scrollToBottom()
      })
    }
    // complete 状态不做任何操作，步骤信息会一直显示直到下一个步骤的 start 来替换
  }
}


// 改为对象存储不同问答类型的uuid
const uuids = ref<Record<string, string>>({})

// 校验文件上传状态和业务处理逻辑
const checkAllFilesUploaded = () => {
  const pendingFiles = fileUploadRef.value?.pendingUploadFileInfoList || []

  // 新增：数据问答不支持文件上传
  if (qa_type.value === 'DATABASE_QA' && pendingFiles.length > 0) {
    window.$ModalMessage.warning('数据问答不支持文件上传，请切换到智能问答和表格问答')
    return false
  }
  if (qa_type.value === 'REPORT_QA' && pendingFiles.length > 0) {
    window.$ModalMessage.warning('深度问数暂不支持文件上传')
    return false
  }

  // 新增：表格问答只支持单个excel文件
  if (qa_type.value === 'FILEDATA_QA') {
    if (pendingFiles.length === 1) {
      const file = pendingFiles[0]
      const fileName = file.name?.toLowerCase() || ''
      const isExcelFile = fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')

      if (!isExcelFile) {
        window.$ModalMessage.warning('表格问答只支持Excel文件格式(.xlsx, .xls ,.csv)')
        return false
      }
    }
  }

  for (const file of pendingFiles) {
    if (file.status !== 'finished') {
      window.$ModalMessage.warning('存在未完成上传或解析失败的文件，请检查后重试')
      return false
    }
  }
  return true
}


// 提交对话
const handleCreateStylized = async (
  send_text = '',
  file_key: {
    source_file_key: string
    parse_file_key: string
    file_size: string
  }[] = [],
  qa_type_arg: string | null = null,
) => {
  // Use passed qa_type or current reactive value
  const currentQaType = qa_type_arg || qa_type.value

  // 设置背景颜色
  backgroundColorVariable.value = '#f6f7fb'

  // 滚动到底部
  scrollToBottom()

  // 设置初始化数据标识为false
  isInit.value = false

  // 设置查看历史消息标识为false
  isView.value = false

  // 如果之前是在查看历史对话，现在输入新问题，需要清除历史对话的分页状态
  // 因为新问题会产生新的对话数据，不应该再触发历史对话的分页加载
  if (currentConversationChatId.value) {
    currentConversationChatId.value = null
    conversationHistoryPage.value = 1
    conversationHistoryTotalPages.value = 1
    conversationHistoryCurrentLoadedPage.value = 1
  }

  // 清空推荐列表
  suggested_array.value = []

  // 若正在加载，则点击后恢复初始状态
  if (stylizingLoading.value) {
    // 停止dify 对话
    await GlobalAPI.stop_chat(businessStore.$state.task_id, currentQaType)
    onCompletedReader(conversationItems.value.length - 1)
    // 隐藏加载提示动画
    contentLoadingStates.value = contentLoadingStates.value.map(() => false)
    return
  }

  // 如果输入为空，则直接返回
  if (send_text === '') {
    if (refInputTextString.value && !inputTextString.value.trim()) {
      inputTextString.value = ''
      refInputTextString.value?.select()
      return
    }
  }

  let upload_file_list
  // 判断是否有未上传的文件
  if (fileUploadRef.value?.pendingUploadFileInfoList && fileUploadRef.value.pendingUploadFileInfoList.length > 0) {
    // 有一个文件解析失败不允许提交
    if (!checkAllFilesUploaded()) {
      return
    }
    upload_file_list = businessStore.file_list
  }

  // 点击重新跑时 如果有文件key 则使用文件key
  if (file_key.length > 0) {
    upload_file_list = file_key
  }

  // 表格问答 则使用 上传的文件key实现 上传一次多轮对话的效果
  if (currentQaType === 'FILEDATA_QA' && businessStore.file_list.length > 0) {
    upload_file_list = businessStore.file_list
  }

  if (showDefaultPage.value) {
    // 新建对话 时输入新问题 清空历史数据
    conversationItems.value = []
    showDefaultPage.value = false

    // 清除所有步骤信息
    stepProgressStates.value = {}

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []

    // 清空 writerList，确保不会显示旧对话类型的数据
    businessStore.clearWriterList()

    // businessStore.clear_file_list()
  }

  // 自定义id
  const uuid_str = uuidv4()
  // 加入对话历史用于左边表格渲染
  const newItem = {
    uuid: uuid_str, // 或者根据你的需求计算新的索引
    key: inputTextString.value ? inputTextString.value : send_text,
    chat_id: uuids.value[currentQaType],
    qa_type: currentQaType,
  }

  // 如果有相同的chat_id 则不添加 使用 unshift 方法将新元素添加到数组的最前面
  const hasSameChatId = tableData.value.some((item) => item.chat_id === uuids.value[currentQaType])
  if (!hasSameChatId) {
    tableData.value.unshift(newItem)
  }

  // 调用大模型后台服务接口
  stylizingLoading.value = true
  const textContent = inputTextString.value
    ? inputTextString.value
    : send_text
  inputTextString.value = ''

  if (!uuids.value[currentQaType]) {
    uuids.value[currentQaType] = uuidv4()
  }

  // 存储该轮用户对话消息
  if (textContent) {
    const newChatId = uuids.value[currentQaType]

    // 如果之前是在查看历史对话，检查新数据的 chat_id 是否与历史对话的 chat_id 匹配
    // 如果不匹配，说明是新对话，应该清除历史对话的分页状态
    if (currentConversationChatId.value && newChatId !== currentConversationChatId.value) {
      currentConversationChatId.value = null
      conversationHistoryPage.value = 1
      conversationHistoryTotalPages.value = 1
      conversationHistoryCurrentLoadedPage.value = 1
    }

    conversationItems.value.push({
      uuid: uuid_str,
      chat_id: newChatId,
      qa_type: currentQaType,
      question: textContent,
      file_key: upload_file_list,
      role: 'user',
      reader: null,
      datasource_id: selectedDatasource.value?.id,
    })
    // 更新 currentRenderIndex 以包含新添加的项
    currentRenderIndex.value = conversationItems.value.length - 1
    contentLoadingStates.value[currentRenderIndex.value] = true

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()
    // 清空记录ID，准备接收新的record_id
    businessStore.record_id = null
  }

  // 调用大模型
  const { error, reader, needLogin, permissionDenied, errorMessage }
    = await businessStore.createAssistantWriterStylized(
      uuid_str,
      uuids.value[currentQaType],
      currentChatId.value,
      {
        text: textContent,
        writer_oid: currentChatId.value,
        file_list: upload_file_list,
        qa_type: currentQaType, // Pass qa_type explicitly
        datasource_id: selectedDatasource.value?.id,
      },
    )

  if (needLogin) {
    message.error('登录已失效，请重新登录')

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()

    // 跳转至登录页面
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  // 处理权限被拒绝的情况
  if (permissionDenied) {
    // 显示权限错误消息提醒
    message.warning(errorMessage || '您没有访问该数据源的权限，请联系管理员授权。')

    // 重置对话状态
    stylizingLoading.value = false
    onCompletedReader(conversationItems.value.length - 1)

    // 移除最后添加的用户消息（因为权限检查失败，不应该保留这次对话）
    if (conversationItems.value.length > 0 && conversationItems.value[conversationItems.value.length - 1].role === 'user') {
      conversationItems.value.pop()
    }

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()
    return
  }

  if (error) {
    stylizingLoading.value = false
    onCompletedReader(conversationItems.value.length - 1)

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()
    return
  }

  if (reader) {
    // 存储该轮AI回复的消息
    outputTextReader.value = reader
    conversationItems.value.push({
      uuid: uuid_str,
      chat_id: uuids.value[currentQaType],
      qa_type: currentQaType,
      question: textContent,
      file_key: [],
      role: 'assistant',
      reader,
      chartData: null, // 初始化为 null，数据到达时更新
      datasource_id: selectedDatasource.value?.id,
    })

    // 更新 currentRenderIndex 以包含新添加的项
    const assistantIndex = conversationItems.value.length - 1
    currentRenderIndex.value = assistantIndex

    // 确保 SVG 加载图标显示（所有问答类型默认都显示）
    // 使用 nextTick 等待 computed 更新
    nextTick(() => {
      // visibleConversationItems 是 computed，现在已经更新了
      // 找到新添加的 assistant 消息在 visibleConversationItems 中的索引
      // 必须同时匹配 uuid 和 role === 'assistant'，因为用户消息和 assistant 消息可能有相同的 uuid
      const visibleIndex = visibleConversationItems.value.findIndex(vi => vi.uuid === uuid_str && vi.role === 'assistant')

      if (visibleIndex >= 0) {
        // 确保数组长度足够
        while (contentLoadingStates.value.length <= visibleIndex) {
          contentLoadingStates.value.push(false)
        }
        // 设置加载状态为 true，显示 SVG 图标
        contentLoadingStates.value[visibleIndex] = true
        // 确保 progressDisplayStates 为 false，这样 SVG 才会显示
        progressDisplayStates.value[visibleIndex] = false
      }
    })

    // 监听 writerList 变化，将数据保存到对应的对话项中
    // 注意：不要过早停止 watcher，因为推荐问题可能在图表数据之后到达
    const stopWatcher = watch(
      () => businessStore.writerList,
      (newWriterList) => {
        if (newWriterList?.dataType === 't04' && newWriterList?.data) {
          if (assistantIndex < conversationItems.value.length && conversationItems.value[assistantIndex].role === 'assistant') {
            // 合并数据：如果已有 chartData，则合并推荐问题；否则直接赋值
            const currentChartData = conversationItems.value[assistantIndex].chartData
            if (currentChartData && newWriterList.data.recommended_questions) {
              // 如果已有 chartData 且新数据包含推荐问题，则合并
              conversationItems.value[assistantIndex].chartData = {
                ...currentChartData,
                recommended_questions: newWriterList.data.recommended_questions
              }
            } else {
              // 否则直接赋值（第一次或没有推荐问题时）
              conversationItems.value[assistantIndex].chartData = newWriterList.data
            }
            // 只有在数据完整（包含推荐问题或确定不会有推荐问题）时才停止监听
            // 如果新数据包含推荐问题，说明数据已完整，可以停止监听
            if (newWriterList.data.recommended_questions && newWriterList.data.recommended_questions.length > 0) {
              stopWatcher()
            }
          }
        }
      },
      { deep: true, immediate: false },
    )

    // 监听 record_id 变化，更新对应的 conversationItem
    const stopRecordIdWatcher = watch(
      () => businessStore.record_id,
      (newRecordId) => {
        if (newRecordId && assistantIndex < conversationItems.value.length) {
          // 更新对应的 conversationItem 的 record_id
          if (conversationItems.value[assistantIndex].role === 'assistant') {
            conversationItems.value[assistantIndex].record_id = newRecordId
          }
          // 更新完成后停止监听
          stopRecordIdWatcher()
        }
      },
      { immediate: false },
    )

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()
  }

  // 滚动到底部
  scrollToBottom()
}

// 滚动到底部
const scrollToBottom = () => {
  if (isView.value === false) {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }
}

const keys = useMagicKeys()
const enterCommand = keys.Enter
const enterCtrl = keys.Enter

const activeElement = useActiveElement()
const notUsingInput = computed(
  () => activeElement.value?.tagName !== 'TEXTAREA',
)

const parser = new UAParser()
const isMacos = parser.getOS().name.includes('Mac')

const placeholder = computed(() => {
  if (stylizingLoading.value) {
    return `输入任意问题...`
  }
  return `输入任意问题, 按 ${
    isMacos ? 'Command' : 'Ctrl'
  } + Enter 键快捷开始...`
})

const generateRandomSuffix = function () {
  return Math.floor(Math.random() * 10000) // 生成0到9999之间的随机整数
}

watch(
  () => enterCommand.value,
  () => {
    if (!isMacos || notUsingInput.value) {
      return
    }

    if (stylizingLoading.value) {
      return
    }

    if (!enterCommand.value) {
      handleCreateStylized()
    }
  },
  {
    deep: true,
  },
)

watch(
  () => enterCtrl.value,
  () => {
    if (isMacos || notUsingInput.value) {
      return
    }

    if (stylizingLoading.value) {
      return
    }

    if (!enterCtrl.value) {
      handleCreateStylized()
    }
  },
  {
    deep: true,
  },
)

// 重置状态
const handleResetState = () => {
  if (isMockDevelopment) {
    inputTextString.value = ''
  } else {
    inputTextString.value = ''
  }

  stylizingLoading.value = false
  nextTick(() => {
    refInputTextString.value?.select()
  })
  refReaderMarkdownPreview.value?.abortReader()
  refReaderMarkdownPreview.value?.resetStatus()
}
handleResetState()


// 左侧对话列表点击
// const markdownPreviews = ref<Array<HTMLElement | null>>([]) // 初始化为空数组
const markdownPreviews = ref<Map<string, HTMLElement | null>>(new Map())

// 表格行点击事件 (Updated type to string | null)
const currentIndex = ref<string | null>(null)

// 递归查找最底层的元素
const findDeepestElement = (element: HTMLElement): HTMLElement => {
  if (element.children.length === 0) {
    return element
  }
  return findDeepestElement(element.lastElementChild as HTMLElement)
}

// 设置 markdownPreviews 数组中的元素
const setMarkdownPreview = (uuid: string, role: string, el: any) => {
  if (role === 'user') {
    if (el && el instanceof HTMLElement) {
      // 查找最下面的元素
      const deepestElement = findDeepestElement(el)
      markdownPreviews.value.set(uuid, deepestElement)
    }
  }
}

// 滚动到指定位置的方法
const scrollToItem = async (uuid: string) => {
  // 等待 DOM 更新完成
  await nextTick()
  await nextTick()

  const element = markdownPreviews.value.get(uuid)

  if (element && element instanceof HTMLElement) {
    try {
      // 强制重排，确保元素位置和尺寸正确
      void element.offsetWidth
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    } catch (error) {
      console.error('滚动到指定元素时出错:', error)
    }
  }
}

// 默认选中的对话类型
const qa_type = ref('COMMON_QA')
const onAqtiveChange = (val, chat_id) => {
  qa_type.value = val
  businessStore.update_qa_type(val)

  // 切换问答类型时清除所有步骤信息
  stepProgressStates.value = {}

  // 新增：切换类型时生成新uuid
  if (chat_id) {
    uuids.value[val] = chat_id
  } else {
    uuids.value[val] = uuidv4()
  }
}

// 获取建议问题
const suggested_array = ref([])

// 建议问题点击事件
const onSuggested = (index: number) => {
  // 如果是报告问答的建议问题点击后切换到通用对话
  if (qa_type.value === 'REPORT_QA') {
    onAqtiveChange('COMMON_QA', '')
  }

  // 获取当前对话的file_key（从最后一个用户消息中获取）
  let currentFileKey: { source_file_key: string; parse_file_key: string; file_size: string }[] = []
  if (conversationItems.value.length > 0) {
    // 从后往前查找最后一个用户消息的file_key
    for (let i = conversationItems.value.length - 1; i >= 0; i--) {
      const item = conversationItems.value[i]
      if (item.role === 'user' && item.file_key && item.file_key.length > 0) {
        currentFileKey = item.file_key
        break
      }
    }
  }

  // 如果当前问答类型是表格问答，且没有找到file_key，尝试从businessStore获取
  if (qa_type.value === 'FILEDATA_QA' && currentFileKey.length === 0 && businessStore.file_list.length > 0) {
    currentFileKey = businessStore.file_list
  }

  handleCreateStylized(suggested_array.value[index], currentFileKey)
}

// 侧边表格滚动条数 动态显示隐藏设置 - REMOVED
// const scrollableContainer = useTemplateRef('scrollableContainer')
// const showScrollbar = ...
// const hideScrollbar = ...

const searchText = ref('')
const searchChatRef = useTemplateRef('searchChatRef')
const isFocusSearchChat = ref(false)
const onFocusSearchChat = () => {
  // 对话进行中时禁用
  if (stylizingLoading.value) {
    return
  }
  if (isFocusSearchChat.value) {
    isFocusSearchChat.value = false
    searchText.value = ''
    loadHistoryList({ reset: true, search: '' })
    return
  }
  if (!showDefaultPage.value) {
    newChat()
  }
  isFocusSearchChat.value = true
  nextTick(() => {
    searchChatRef.value?.focus()
  })
}
const onBlurSearchChat = () => {
  if (searchText.value) {
    return
  }
  isFocusSearchChat.value = false
}

// 加载对话历史（支持滚动分页）
async function loadHistoryList(
  options: { reset?: boolean, search?: string } = {},
) {
  const { reset = false, search = searchText.value } = options
  if (isLoadingHistory.value || isLoadingMoreHistory.value) {
    return
  }
  if (reset) {
    historyPage.value = 1
    historyTotalPages.value = 1
    tableData.value = []
  }

  const pageToLoad = historyPage.value
  const append = pageToLoad > 1
  if (append) {
    isLoadingMoreHistory.value = true
  } else {
    isLoadingHistory.value = true
  }

  try {
    const meta = await fetchConversationHistory(
      isInit,
      conversationItems,
      tableData,
      currentRenderIndex,
      null,
      search,
      pageToLoad,
      historyPageSize,
      append,
    )
    if (meta) {
      historyTotalPages.value = meta.totalPages
      historyPage.value = meta.currentPage + 1
      // 确保当有多页数据时，容器可以滚动触发加载
      ensureScrollable()
    }
  } catch (error) {
    console.error('加载历史对话失败:', error)
    window.$ModalMessage.error('加载历史对话失败，请重试')
  } finally {
    isLoadingHistory.value = false
    isLoadingMoreHistory.value = false
  }
}

// 在script部分添加搜索处理函数
const handleSearch = () => {
  loadHistoryList({ reset: true })
}

const handleClear = () => {
  // 主动清空输入并带着空搜索刷新历史，确保搜索条件被移除
  searchText.value = ''
  if (!showDefaultPage.value) {
    newChat()
  }
  loadHistoryList({ reset: true, search: '' })
}

// 对话历史滚动加载
const handleHistoryScroll = () => {
  const el = historyScrollRef.value as unknown as HTMLElement
  if (!el || !hasMoreHistory.value || isLoadingMoreHistory.value) {
    return
  }
  const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
  if (isNearBottom) {
    loadHistoryList()
  }
}

// 确保当有多页数据时，容器可以滚动触发加载
const ensureScrollable = () => {
  if (!shouldForceScrollbar.value) {
    return
  }
  nextTick(() => {
    const el = historyScrollRef.value as unknown as HTMLElement
    if (!el || !hasMoreHistory.value) {
      return
    }
    // 检查内容高度是否小于等于容器高度
    // 如果内容高度不足以滚动，需要添加占位元素来确保可以滚动
    // 占位元素已经在模板中实现，这里主要是确保逻辑正确
    const needsPadding = el.scrollHeight <= el.clientHeight
    if (needsPadding) {
      // 模板中的占位元素会确保可以滚动
      // 如果需要，可以在这里动态调整占位元素的高度
    }
  })
}

// 首次进入加载历史列表
onBeforeMount(() => {
  loadHistoryList({ reset: true })
})

const collapsed = ref(false)

// 背景颜色 默认页面和内容页面动态调整
const backgroundColorVariable = ref('#ffffff')


// 添加一键滚动到底部功能的相关代码
const showScrollToBottom = ref(false)
const scrollThreshold = 1000 // 滚动超过100px时显示按钮

const datasourceList = ref<any[]>([])
const selectedDatasource = ref<any>(null)
const showDatasourcePopover = ref(false)
const showReportQaDatasourcePopover = ref(false)

// 用户点击图标滚动到底部
const clickScrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      showScrollToBottom.value = false // 滚动到底部后隐藏按钮
    }
  })
}

// ======新增：检查是否需要显示滚动到底部按钮==========//
const checkScrollPosition = () => {
  if (messagesContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px的容差
    showScrollToBottom.value = !isAtBottom && scrollTop > scrollThreshold
  }
}
// 新增：监听滚动事件（统一入口，内部根据isView判断）
const handleScroll = () => {
  // 如果是查看历史消息模式，调用handleConversationScroll
  if (isView.value) {
    handleConversationScroll()
  } else {
    checkScrollPosition()
  }
}

// 在 onMounted 或 onBeforeMount 中添加事件监听
onMounted(async () => {
  if (messagesContainer.value) {
    messagesContainer.value.addEventListener('scroll', handleScroll)
  }
  try {
    const res = await fetch_datasource_list()
    if (res.ok) {
      const data = await res.json()
      datasourceList.value = data.data || []
    }
  }
  catch (e) {
    console.error(e)
  }

})

// 在组件卸载前移除事件监听
onBeforeUnmount(() => {
  if (messagesContainer.value) {
    messagesContainer.value.removeEventListener('scroll', handleScroll)
  }
  // 清除滚动防抖定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer)
    scrollTimer = null
  }
})

// ============================== 文件上传 ============================//
interface FileUploadRef {
  pendingUploadFileInfoList: UploadFileInfo[] | null | undefined
  options?: any[]
  reset?: () => void
}
const fileUploadRef = ref<FileUploadRef | null>(null)

// 用于绑定文件上传信息列表
const pendingUploadFileInfoList = ref([])

// 新增：处理从DefaultPage来的提交
const handleSubmitFromDefaultPage = (payload: { text: string, mode: string, datasource_id?: number }) => {
  // 先清空之前的对话数据，确保切换类型时不会显示旧数据
  conversationItems.value = []

  // 清空 writerList，避免显示旧对话类型的数据
  businessStore.clearWriterList()

  // 清空记录ID
  businessStore.clear_record_id()

  // 切换对话类型
  onAqtiveChange(payload.mode, '') // Switch mode
  inputTextString.value = payload.text // Set text

  // 从默认页开始新对话，更新Key
  chatTransitionKey.value = `new-chat-${Date.now()}`

  if (payload.datasource_id) {
     const ds = datasourceList.value.find((d) => d.id === payload.datasource_id)
     if (ds) {
         selectedDatasource.value = ds
     }
  } else {
    // 如果不是数据问答或深度问数，清空选中的数据源
    if (payload.mode !== 'DATABASE_QA' && payload.mode !== 'REPORT_QA') {
      selectedDatasource.value = null
    }
  }

  // Pass a copy of the file list to avoid it being cleared if store is cleared
  const currentFiles = [...businessStore.file_list]
  handleCreateStylized(payload.text, currentFiles, payload.mode) // Submit with explicit mode and files
}

// QA Options configuration (duplicated from DefaultPage for consistency in pill display)
const qaOptions = [
  { icon: 'i-hugeicons:ai-chat-02', label: '智能问答', value: 'COMMON_QA', color: '#7E6BF2' },
  { icon: 'i-hugeicons:database-01', label: '数据问答', value: 'DATABASE_QA', color: '#10b981' },
  { icon: 'i-hugeicons:table-01', label: '表格问答', value: 'FILEDATA_QA', color: '#f59e0b' },
  { icon: 'i-hugeicons:search-02', label: '深度问数', value: 'REPORT_QA', color: '#8b5cf6' },
]

const currentQaOption = computed(() => {
  return qaOptions.find((opt) => opt.value === qa_type.value)
})

const showModeSelector = ref(false)

const clearMode = () => {
  // 点击删除图标后，设置成新对话并显示默认页面
  // newChat() 已经会重置 qa_type 和 selectedDatasource，所以这里只需要调用它
  newChat()
  showModeSelector.value = false
  // 关闭所有数据源弹窗
  showDatasourcePopover.value = false
  showReportQaDatasourcePopover.value = false
}

const selectMode = (mode: string) => {
  onAqtiveChange(mode, '')
  showModeSelector.value = false
  // 关闭所有数据源弹窗
  showDatasourcePopover.value = false
  showReportQaDatasourcePopover.value = false
}

const handleDatasourceSelect = (ds: any) => {
  selectedDatasource.value = ds
  // 根据哪个弹窗是打开的来判断应该设置哪个模式
  if (showReportQaDatasourcePopover.value) {
    // 从深度问数弹窗中选择，设置为深度问数模式
    selectMode('REPORT_QA')
    showReportQaDatasourcePopover.value = false
  } else if (showDatasourcePopover.value) {
    // 从数据问答弹窗中选择，设置为数据问答模式
    selectMode('DATABASE_QA')
    showDatasourcePopover.value = false
  } else {
    // 如果都没有打开，根据当前模式判断
    if (qa_type.value === 'REPORT_QA') {
      selectMode('REPORT_QA')
    } else {
      selectMode('DATABASE_QA')
    }
  }
}

// Navigation Rail Items - REMOVED
// const navRailItems = ...

// 加载对话历史（根据chat_id分页加载）
const loadConversationHistory = async (item: any, reset: boolean = true, loadOlder: boolean = false) => {
  if (isLoadingConversationHistory.value || isLoadingMoreConversationHistory.value) {
    return
  }

  if (reset) {
    conversationHistoryPage.value = 1
    conversationHistoryTotalPages.value = 1
    conversationHistoryCurrentLoadedPage.value = 1
    conversationHistoryMinLoadedPage.value = 1
    conversationItems.value = []
    currentConversationChatId.value = item.chat_id
    loadedPages.value.clear()
  }

  let pageToLoad = conversationHistoryPage.value
  const append = !reset && !loadOlder // 向后加载时append=true，向前加载时append=false

  // 如果是加载更旧的消息，需要加载前面的页面
  if (loadOlder) {
    // 计算要加载的页码：当前最小已加载页码 - 1
    pageToLoad = conversationHistoryMinLoadedPage.value - 1
    // 如果页码小于1或已经加载过，则不加载
    if (pageToLoad < 1 || loadedPages.value.has(pageToLoad)) {
      return
    }
  } else if (!reset) {
    // 向后加载时，检查是否已经加载过
    if (loadedPages.value.has(pageToLoad)) {
      return
    }
  }

  // 检查是否已经加载过（防止重复加载）
  if (loadedPages.value.has(pageToLoad)) {
    return
  }

  // 记录即将加载的页面（在加载前标记，防止并发加载同一页）
  loadedPages.value.add(pageToLoad)

  // 保存滚动位置（用于从前面插入数据时保持位置）
  let previousScrollHeight = 0
  let previousScrollTop = 0
  if (loadOlder && messagesContainer.value) {
    previousScrollHeight = messagesContainer.value.scrollHeight
    previousScrollTop = messagesContainer.value.scrollTop
  }

  // 提前设置加载状态，使用 requestAnimationFrame 优化渲染
  if (!reset && !loadOlder) {
    requestAnimationFrame(() => {
      isLoadingMoreConversationHistory.value = true
    })
  } else if (!reset && loadOlder) {
    requestAnimationFrame(() => {
      isLoadingConversationHistory.value = true
    })
  } else {
    isLoadingConversationHistory.value = true
  }

  try {
    const meta = await fetchConversationHistory(
    isInit,
    conversationItems,
    tableData,
    currentRenderIndex,
    item,
    '',
      pageToLoad,
      conversationHistoryPageSize,
      append,
      loadOlder, // 传递loadOlder参数，用于从前面插入
    )
    if (meta) {
      conversationHistoryTotalPages.value = meta.totalPages
      if (loadOlder) {
        // 加载更旧的页面时，更新最小已加载页码
        conversationHistoryMinLoadedPage.value = pageToLoad
        conversationHistoryPage.value = pageToLoad
      } else {
        // 加载更新的页面时，确保 conversationHistoryPage 不超过 totalPages
        const nextPage = meta.currentPage + 1
        conversationHistoryPage.value = nextPage > meta.totalPages ? meta.totalPages : nextPage
        // 加载更新的页面时，更新已加载的最大页码
        if (meta.currentPage > conversationHistoryCurrentLoadedPage.value) {
          conversationHistoryCurrentLoadedPage.value = meta.currentPage
        }
      }

      // 从前面插入数据后，恢复滚动位置
      if (loadOlder && messagesContainer.value) {
        // 使用双重 nextTick 和 requestAnimationFrame 确保 DOM 完全更新
        await nextTick()
        await nextTick()
        requestAnimationFrame(() => {
          if (messagesContainer.value) {
            const newScrollHeight = messagesContainer.value.scrollHeight
            const heightDifference = newScrollHeight - previousScrollHeight
            messagesContainer.value.scrollTop = previousScrollTop + heightDifference
          }
        })
      }
    }
  } catch (error) {
    console.error('加载对话历史失败:', error)
    window.$ModalMessage.error('加载对话历史失败，请重试')
    // 加载失败时，从已加载页面集合中移除
    loadedPages.value.delete(pageToLoad)
  } finally {
    // 使用 requestAnimationFrame 延迟清除加载状态，确保 UI 平滑过渡
    requestAnimationFrame(() => {
      isLoadingConversationHistory.value = false
      isLoadingMoreConversationHistory.value = false
    })
  }
}

// 对话内容区域滚动加载更多（滚动到顶部时加载更旧的消息，滚动到底部时加载更新的消息）
// 添加防抖，避免频繁触发
let scrollTimer: NodeJS.Timeout | null = null
const handleConversationScroll = () => {
  if (!messagesContainer.value || !currentConversationChatId.value) {
    return
  }

  // 如果正在加载，直接返回，但允许检查滚动位置以提前显示加载状态
  if (isLoadingMoreConversationHistory.value || isLoadingConversationHistory.value) {
    return
  }

  const el = messagesContainer.value
  const scrollTop = el.scrollTop
  const scrollHeight = el.scrollHeight
  const clientHeight = el.clientHeight

  // 使用更严格的触发条件，避免在边界附近频繁触发
  const isNearTop = scrollTop <= 100 // 滚动到顶部附近时加载更旧的消息（阈值增大）
  const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50 // 滚动到底部附近时加载更新的消息（阈值增大）

  // 防抖处理：清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  scrollTimer = setTimeout(() => {
    if (!messagesContainer.value || !currentConversationChatId.value) {
      return
    }

    // 检查当前对话的 chat_id 是否与 currentConversationChatId 匹配
    // 如果 conversationItems 中有数据，检查最新的 chat_id 是否匹配
    // 如果不匹配，说明是新对话，不应该触发历史对话的分页加载
    if (conversationItems.value.length > 0) {
      const latestChatId = conversationItems.value[conversationItems.value.length - 1]?.chat_id
      if (latestChatId && latestChatId !== currentConversationChatId.value) {
        // 当前对话的 chat_id 与历史对话的 chat_id 不匹配，说明是新对话
        // 清除历史对话的分页状态，避免错误触发分页
        currentConversationChatId.value = null
        return
      }
    }

    const currentItem = tableData.value.find(item => item.chat_id === currentConversationChatId.value)
    if (!currentItem) {
      return
    }

    // 如果还有更旧的页面，加载更旧的页面
    // 检查：最小已加载页码大于1，且不在加载中
    if (isNearTop && conversationHistoryMinLoadedPage.value > 1) {
      loadConversationHistory(currentItem, false, true) // loadOlder=true，加载更旧的页面
    }
    // 如果还有更新的页面，加载更新的页面
    else if (isNearBottom && hasMoreConversationHistory.value) {
      loadConversationHistory(currentItem, false, false) // loadOlder=false，加载更新的页面（向后追加）
    }

    scrollTimer = null
  }, 100) // 100ms 防抖延迟，减少延迟提升响应速度
}

// Handle History Item Click (Replaces rowProps)
const handleHistoryClick = async (item: any) => {
  backgroundColorVariable.value = '#fff'

  currentIndex.value = item.uuid
  suggested_array.value = []

  isInit.value = false
  isView.value = true

  // 每次点击历史记录时，刷新一次大语言模型列表和当前默认模型
  loadLLMModels()

  // 切换到历史对话，更新Key以触发转场动画
  chatTransitionKey.value = item.chat_id || `history-${item.uuid}`

  // 这里根据chat_id 过滤同一轮对话数据，使用分页加载
  await loadConversationHistory(item, true)

  // 关闭默认页面
  showDefaultPage.value = false

  //   等待 DOM 更新完成
  await nextTick()
  //  滚动到底部（显示最新消息）
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }

  // 先设置对话类型
  onAqtiveChange(item.qa_type, item.chat_id)

  // 确保模式选择器关闭，显示模式标签（这样数据源才能显示）
  showModeSelector.value = false

  // 恢复选中的数据源（和数据问答显示逻辑一样）
  // 等待 DOM 更新后再设置数据源，确保响应式更新
  await nextTick()

  if (item.qa_type === 'DATABASE_QA' || item.qa_type === 'REPORT_QA') {
    if (item.datasource_id) {
       // 先尝试从数据源列表中找到
       const ds = datasourceList.value.find((d) => d.id === item.datasource_id)
       if (ds) {
           selectedDatasource.value = ds
       } else if (item.datasource_name) {
           // 如果数据源列表中找不到，使用历史记录中的名称创建临时对象
           // 确保对象有 name 属性，用于显示
           selectedDatasource.value = {
             id: item.datasource_id,
             name: item.datasource_name,
             type: item.datasource_type || 'Datasource'
           }
       } else {
           // 如果既找不到数据源，也没有名称，尝试使用数据源ID创建临时对象
           selectedDatasource.value = {
             id: item.datasource_id,
             name: `数据源 ${item.datasource_id}`,
             type: 'Datasource'
           }
       }
    } else {
      // 如果没有数据源ID，清空选中的数据源
      selectedDatasource.value = null
    }
  } else {
    selectedDatasource.value = null
  }

  // 再次等待 DOM 更新，确保数据源显示
  await nextTick()

  // 调试日志（开发环境）
  if (import.meta.env.DEV) {
    console.log('恢复数据源:', {
      qa_type: item.qa_type,
      datasource_id: item.datasource_id,
      datasource_name: item.datasource_name,
      selectedDatasource: selectedDatasource.value,
      currentQaOption: currentQaOption.value,
      showModeSelector: showModeSelector.value
    })
  }
}
</script>

<template>
  <div class="flex h-full w-full bg-[#fff]">
    <n-layout
      class="h-full w-full"
      has-sider
    >
      <n-layout-sider
        v-model:collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="0"
        :width="280"
        :show-collapsed-content="false"
        bordered
        class="qianwen-sidebar"
      >
        <div class="sidebar-container flex flex-col h-full bg-[#fcfcfc]">
          <!-- Header: Logo & Icons -->
          <div class="sidebar-header px-6 py-6 flex justify-between items-center">
            <div
              class="logo-area flex items-center gap-3 cursor-pointer"
              @click="showDefaultPage = true"
            >
              <div class="i-hugeicons:ai-chat-02 text-32 c-[#3B5CFF]"></div>
              <span class="text-24 font-bold text-[#111111] tracking-tight font-sans">智能助手</span>
            </div>
            <div class="header-actions flex items-center gap-5">
              <div
                class="action-icon i-hugeicons:search-01 text-24 mr-4"
                :class="stylizingLoading ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#8A8A8A] hover:text-[#333] cursor-pointer'"
                @click="onFocusSearchChat"
              ></div>
              <div
                class="action-icon i-hugeicons:sidebar-left-01 text-24 text-[#8A8A8A] hover:text-[#333] cursor-pointer"
                @click="collapsed = true"
              ></div>
            </div>
          </div>

          <!-- New Chat Button -->
          <div class="px-6 pb-6">
            <div
              v-if="isFocusSearchChat"
              class="h-[40px] flex items-center"
            >
              <n-input
                ref="searchChatRef"
                v-model:value="searchText"
                placeholder="搜索历史记录..."
                class="w-full !rounded-[8px] search-input-custom"
                size="medium"
                clearable
                @blur="onBlurSearchChat"
                @input="handleSearch"
                @clear="handleClear"
              >
                <template #prefix>
                  <div class="i-hugeicons:search-01 text-[#999] text-16"></div>
                </template>
              </n-input>
            </div>
            <button
              v-else
              class="new-chat-btn group w-full h-[40px] rounded-[8px] bg-white border border-[#E6E6E6] hover:border-[#7E6BF2] text-[#333] hover:text-[#7E6BF2] font-medium text-[14px] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-[0_2px_12px_rgba(126,107,242,0.1)]"
              :disabled="stylizingLoading"
              @click="newChat"
            >
              <div class="i-hugeicons:comment-add-01 text-18"></div>
              <span>新对话</span>
            </button>
          </div>

          <!-- Recent Chats Label -->
          <div class="px-6 py-4 flex justify-between items-center mt-10 ml-10 mb-5">
            <span class="text-[#7A7A7A] text-[13px] font-semibold tracking-wide history-label">最近对话</span>
            <div
              class="i-hugeicons:settings-04 text-18"
              :class="stylizingLoading ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#7A7A7A] cursor-pointer hover:text-gray-600'"
              @click="openModal"
            ></div>
          </div>

          <!-- History List -->
          <div
            ref="historyScrollRef"
            class="flex-1 custom-scrollbar history-list-scrollbar px-4 bg-[#fcfcfc]"
            :class="shouldForceScrollbar ? 'overflow-y-scroll' : 'overflow-y-auto'"
            @scroll.passive="handleHistoryScroll"
          >
            <div
              v-if="isLoadingHistory && !tableData.length"
              class="p-4 text-center text-gray-400 text-xs loading-text"
            >
              加载中...
            </div>

            <TransitionGroup name="list" tag="div" class="relative">
              <div
                v-for="(item, index) in tableData"
                :key="item.uuid"
                class="history-item px-2 py-3.5 mb-1 rounded-lg cursor-pointer flex items-center justify-between group transition-all duration-200"
                :class="currentIndex === item.uuid ? 'bg-[#F2F0FF] text-[#7E6BF2] font-medium' : 'text-[#555] hover:bg-[#EAEBED] hover:text-[#333]'"
                @click="handleHistoryClick(item)"
              >
                <div class="flex items-center gap-2 overflow-hidden w-full">
                  <div class="truncate text-[14px] w-full leading-[1.45] ml-10 mt-10 history-item-text">
                    {{ item.key || '无标题对话' }}
                  </div>
                </div>
                <!-- Attachment Icon Placeholder -->
                <div
                  v-if="index % 4 === 0"
                  class="i-hugeicons:attachment-01 text-[14px] text-[#9ca3af] shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
              </div>
            </TransitionGroup>

            <div
              v-if="isLoadingMoreHistory"
              class="py-2 text-center text-gray-400 text-xs loading-text"
            >
              加载更多...
            </div>
            <!-- 占位元素：当有多页数据时，确保可以滚动触发加载 -->
            <!-- 当总页数大于1且有更多数据时，添加一个占位元素确保可以滚动 -->
            <div
              v-if="shouldForceScrollbar && hasMoreHistory && !isLoadingMoreHistory"
              class="scroll-trigger-placeholder"
              style="height: 50px; min-height: 50px;"
            ></div>
          </div>

          <!-- Sidebar Footer -->
          <div class="sidebar-footer px-6 py-5 flex items-center justify-between bg-[#fcfcfc] mt-auto">
            <SideBar
              mode="avatar"
              theme="light"
            />

            <div
              class="my-space flex items-center gap-2 text-[#6A6A6A] hover:text-[#7E6BF2] cursor-pointer text-[14px] font-normal transition-colors history-item-text"
              @click="handleSkillCenterClick"
            >
              <div class="i-hugeicons:magic-wand-01 text-18"></div>
              <span>技能中心</span>
            </div>
          </div>
        </div>
      </n-layout-sider>

      <n-layout-content class="content h-full bg-[#fff]">
        <!-- 内容区域 -->
        <div
          flex="~ 1 col"
          min-w-0
          h-full
        >
          <!-- Top Header -->
          <div
            v-if="!showDefaultPage || collapsed"
            class="top-header"
          >
            <div class="flex items-center gap-5">
              <!-- Collapsed State Icons -->
              <div
                v-if="collapsed"
                class="flex items-center gap-5"
              >
                <div
                  class="i-hugeicons:sidebar-right-01 text-20 text-[#4A4A4A] cursor-pointer hover:text-[#111]"
                  @click="collapsed = false"
                ></div>
                <div
                  class="i-hugeicons:comment-add-01 text-20"
                  :class="stylizingLoading ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#4A4A4A] cursor-pointer hover:text-[#111]'"
                  @click="newChat"
                ></div>
              </div>

              <div class="model-info flex items-center gap-1.5">
                <n-dropdown
                  v-if="llmModelDropdownOptions.length"
                  :options="llmModelDropdownOptions"
                  placement="bottom-start"
                  @select="handleLLMModelChange"
                >
                  <div class="model-dropdown-trigger">
                    <span class="model-dropdown-label">
                      {{ selectedLLMModelName || '选择大模型' }}
                    </span>
                    <div class="model-dropdown-icon i-hugeicons:arrow-down-01"></div>
                  </div>
                </n-dropdown>
                <span
                  v-if="!llmModelDropdownOptions.length"
                  class="text-[16px] font-medium text-[#111] model-name"
                >
                  {{ defaultLLMTypeName }}
                </span>
              </div>
            </div>
            <!--
            <div class="badges">
              <div class="badge">test</div>
            </div>
            -->
          </div>

          <!-- 这里循环渲染即可实现多轮对话 -->
          <div
            ref="messagesContainer"
            flex="1 ~ col"
            min-h-0
            pb-20
            class="scrollable-container"
            @scroll="handleScroll"
          >
            <transition name="page-fade" mode="out-in">
              <div
                v-if="showDefaultPage"
                key="default-page"
                class="h-full"
              >
                <DefaultPage
                  :collapsed="collapsed"
                  @submit="handleSubmitFromDefaultPage"
                />
              </div>

              <div
                v-else
                :key="chatTransitionKey"
                class="min-h-full"
              >
              <div
                v-for="(item, index) in visibleConversationItems"
                :key="index"
                :ref="(el) => setMarkdownPreview(item.uuid, item.role, el)"
                class="mb-4"
              >
                <div
                  v-if="item.role === 'user'"
                  class="flex flex-col items-end space-y-2 w-full max-w-[890px] mx-auto"
                >
                  <!-- 用户消息 -->
                  <div
                    :style="{
                      'margin-left': `0`,
                      'margin-right': `0`,
                      'padding': `15px 0`,
                      'border-radius': `5px`,
                      'text-align': `center`,
                      'max-width': '100%',
                    }"
                  >
                    <n-space justify="center">
                      <div
                        :style="{
                          'fontSize': '16px',
                          'fontFamily': `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
                          'fontWeight': '400',
                          'color': '#1a1a1a',
                          'backgroundColor': '#f5f7ff',
                          'borderRadius': '12px',
                          'max-width': '800px',
                          'text-align': 'left',
                          'padding': '12px 20px',
                          'line-height': 1.625,
                          'letter-spacing': '0',
                          'word-wrap': 'break-word',
                          'word-break': 'break-all',
                          'white-space': 'pre-wrap',
                          '-webkit-font-smoothing': 'antialiased',
                          '-moz-osx-font-smoothing': 'grayscale',
                        }"
                      >
                        {{ item.question }}
                      </div>
                    </n-space>
                  </div>

                  <!-- 用户上传的文件列表 -->
                  <div
                    v-if="item.file_key && item.file_key.length > 0"
                    class="upload-wrapper-list flex flex-wrap gap-10 items-center pb-5"
                    style="margin-left: 0; margin-right: 0; width: 100%; justify-content: flex-end;"
                  >
                    <FileListItem
                      v-for="(file, fileIndex) in item.file_key"
                      :key="fileIndex"
                      :file="file"
                    />
                  </div>
                </div>

                <div
                  v-if="item.role === 'assistant'"
                  class="max-w-[890px] w-full mx-auto"
                >
                  <!-- Assistant 消息的加载动画和步骤信息 -->
                  <div
                    v-if="contentLoadingStates[index] && !progressDisplayStates[index]"
                    class="flex items-center gap-2 mb-2"
                    :data-debug-svg="JSON.stringify({index,itemRole:item.role,itemUuid:item.uuid,contentLoadingState:contentLoadingStates[index],progressDisplayState:progressDisplayStates[index],conditionResult:contentLoadingStates[index] && !progressDisplayStates[index],contentLoadingStatesLength:contentLoadingStates.length})"
                  >
                    <!-- 星星动画 -->
                    <div
                      class="star-spinner"
                      :style="{
                        'width': `24px`,
                        'height': `24px`,
                      }"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!-- 中心星星 -->
                        <g class="star-group star-center">
                          <path
                            d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                            fill="#b1adf3"
                            class="star-path"
                          />
                        </g>
                        <!-- 围绕中心旋转的星星1 (上方) -->
                        <g class="star-group star-1" transform="translate(12, 12)">
                          <path
                            d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                            fill="#b1adf3"
                            class="star-path"
                            transform="scale(0.5) translate(0, -16)"
                          />
                        </g>
                        <!-- 围绕中心旋转的星星2 (右侧) -->
                        <g class="star-group star-2" transform="translate(12, 12)">
                          <path
                            d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                            fill="#b1adf3"
                            class="star-path"
                            transform="scale(0.5) translate(16, 0)"
                          />
                        </g>
                        <!-- 围绕中心旋转的星星3 (下方) -->
                        <g class="star-group star-3" transform="translate(12, 12)">
                          <path
                            d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                            fill="#b1adf3"
                            class="star-path"
                            transform="scale(0.5) translate(0, 16)"
                          />
                        </g>
                        <!-- 围绕中心旋转的星星4 (左侧) -->
                        <g class="star-group star-4" transform="translate(12, 12)">
                          <path
                            d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                            fill="#b1adf3"
                            class="star-path"
                            transform="scale(0.5) translate(-16, 0)"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- 步骤信息显示 -->
                    <transition name="step-fade" mode="out-in">
                      <div
                        v-if="getStepProgressForIndex(index)"
                        :key="`step-${index}-${getStepProgressForIndex(index)?.progressId}`"
                        class="step-progress-text"
                      >
                        {{ getStepProgressForIndex(index)?.stepName }}
                      </div>
                    </transition>
                  </div>
                  <!-- 单独显示步骤信息（当进度组件显示时，只显示步骤信息，不显示星星） -->
                  <div
                    v-else-if="getStepProgressForIndex(index) && progressDisplayStates[index]"
                    class="flex items-center gap-2 mb-2"
                  >
                    <transition name="step-fade" mode="out-in">
                      <div
                        :key="`step-${index}-${getStepProgressForIndex(index)?.progressId}`"
                        class="step-progress-text"
                      >
                        {{ getStepProgressForIndex(index)?.stepName }}
                      </div>
                    </transition>
                  </div>
                  <MarkdownPreview
                    :reader="item.reader"
                    :model="defaultLLMTypeForStream"
                    :is-init="isInit"
                    :is-view="isView"
                    :qa-type="`${item.qa_type}`"
                    :chart-id="`${index}devID${generateRandomSuffix()}`"
                    :chart-data="item.chartData"
                    :record-id="item.record_id"
                    :datasource-id="item.datasource_id"
                    :parent-scoll-bottom-method="scrollToBottom"
                    @failed="() => onFailedReader(index)"
                    @completed="() => onCompletedReader(index)"
                    @chartready="() => onChartReady(index + 1)"
                    @recycle-qa="() => onRecycleQa(index)"
                    @praise-fead-back="() => onPraiseFeadBack(index)"
                    @progress-display-change="(hasProgress: boolean) => onProgressDisplayChange(index, hasProgress)"
                    @step-progress="(progress: any) => onStepProgress(index, progress)"
                    @belittle-feedback="
                      () => onBelittleFeedback(index)
                    "
                    @begin-read="() => onBeginRead(index)"
                    @suggested="(question) => handleCreateStylized(question)"
                  />
                </div>
              </div>

            <!-- 底部加载更多提示（滚动到底部加载时显示） -->
            <transition name="fade">
              <div
                v-if="isView && isLoadingMoreConversationHistory"
                class="flex justify-center items-center py-2 conversation-loading-indicator conversation-loading-indicator--bottom"
              >
                <div class="flex items-center gap-2 text-[#999] text-[13px]">
                  <div class="i-svg-spinners:dots-scale-middle text-14 text-[#7E6BF2]"></div>
                  <span>加载更多...</span>
                </div>
              </div>
            </transition>

            <!-- 顶部加载更旧消息提示（滚动到顶部加载时显示） -->
            <transition name="fade">
              <div
                v-if="isView && isLoadingConversationHistory && conversationHistoryMinLoadedPage > 1"
                class="flex justify-center items-center py-2 conversation-loading-indicator conversation-loading-indicator--top"
              >
                <div class="flex items-center gap-2 text-[#999] text-[13px]">
                  <div class="i-svg-spinners:dots-scale-middle text-14 text-[#7E6BF2]"></div>
                  <span>加载更早的消息...</span>
                </div>
              </div>
            </transition>

            <div
              v-if="!isInit && !stylizingLoading"
              class="w-70% ml-11% mt-[-20] bg-#f6f7fb"
            >
              <SuggestedView
                :labels="suggested_array"
                @suggested="onSuggested"
              />
            </div>

            <!-- 底部等待动画（智能问答和深度问数） -->
            <transition name="fade">
              <div
                v-if="stylizingLoading && (qa_type === 'COMMON_QA' || qa_type === 'REPORT_QA') && !isView"
                class="flex items-center justify-start pt-2 pb-2 bottom-loading-indicator max-w-[890px] w-full mx-auto"
                style="padding-left: 15px;"
              >
                <div class="flex items-center gap-2">
                  <div class="star-spinner" :style="{ width: '24px', height: '24px' }">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- 中心星星 -->
                      <g class="star-group star-center">
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#b1adf3"
                          class="star-path"
                        />
                      </g>
                      <!-- 围绕中心旋转的星星1 (上方) -->
                      <g class="star-group star-1" transform="translate(12, 12)">
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#b1adf3"
                          class="star-path"
                          transform="scale(0.5) translate(0, -16)"
                        />
                      </g>
                      <!-- 围绕中心旋转的星星2 (右侧) -->
                      <g class="star-group star-2" transform="translate(12, 12)">
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#b1adf3"
                          class="star-path"
                          transform="scale(0.5) translate(16, 0)"
                        />
                      </g>
                      <!-- 围绕中心旋转的星星3 (下方) -->
                      <g class="star-group star-3" transform="translate(12, 12)">
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#b1adf3"
                          class="star-path"
                          transform="scale(0.5) translate(0, 16)"
                        />
                      </g>
                      <!-- 围绕中心旋转的星星4 (左侧) -->
                      <g class="star-group star-4" transform="translate(12, 12)">
                        <path
                          d="M12 2L14.09 8.26L20 9.27L15 13.14L16.18 19.02L12 15.77L7.82 19.02L9 13.14L4 9.27L9.91 8.26L12 2Z"
                          fill="#b1adf3"
                          class="star-path"
                          transform="scale(0.5) translate(-16, 0)"
                        />
                      </g>
                    </svg>
                  </div>
                  <span class="text-[#999] text-[13px]">正在思考中...</span>
                </div>
              </div>
            </transition>
              </div>
            </transition>
          </div>

          <div
            v-show="showScrollToBottom"
            class="scroll-to-bottom-btn"
            @click="clickScrollToBottom"
          >
            <div class="i-mingcute:arrow-down-fill"></div>
          </div>

          <!-- Bottom Input Area (C Style) -->
          <div
            v-if="!showDefaultPage"
            class="bottom-input-container"
          >
            <div class="input-card">
              <!-- Top: File Uploads -->
              <FileUploadManager
                ref="fileUploadRef"
                v-model="pendingUploadFileInfoList"
                class="w-full"
              />

              <!-- Middle: Input -->
              <div class="input-wrapper w-full">
                <n-input
                  ref="refInputTextString"
                  v-model:value="inputTextString"
                  type="textarea"
                  placeholder="先思考后回答，解决更有难度的问题"
                  :autosize="{ minRows: 1, maxRows: 6 }"
                  class="custom-chat-input"
                  @keydown.enter.prevent="handleCreateStylized()"
                />
              </div>

              <!-- Bottom: Footer Actions -->
              <div class="input-footer flex justify-between items-center mt-3">
                <!-- Left: Mode Pill (Deep Thinking) -->
                <div class="left-actions">
                  <div
                    v-if="currentQaOption && !showModeSelector"
                    class="mode-pill"
                    :style="{
                      color: currentQaOption.color,
                      borderColor: `${currentQaOption.color}30`,
                      backgroundColor: `${currentQaOption.color}10`,
                    }"
                  >
                    <div
                      :class="currentQaOption.icon"
                      class="text-16"
                    ></div>
                    <span class="font-medium">{{ currentQaOption.label }}</span>
                    <span
                      v-if="(currentQaOption.value === 'DATABASE_QA' || currentQaOption.value === 'REPORT_QA') && selectedDatasource"
                      class="font-medium ml-1"
                    >
                      | {{ selectedDatasource.name }}
                    </span>
                    <div
                      class="i-hugeicons:cancel-01 text-14 ml-1 cursor-pointer opacity-60 hover:opacity-100"
                      @click="clearMode"
                    ></div>
                  </div>
                  <div
                    v-else-if="showModeSelector || !currentQaOption"
                    class="flex items-center gap-2"
                  >
                    <template
                      v-for="opt in qaOptions"
                      :key="opt.value"
                    >
                        <!-- 数据问答弹窗 -->
                        <n-popover
                          v-if="opt.value === 'DATABASE_QA'"
                          trigger="manual"
                          v-model:show="showDatasourcePopover"
                          placement="top"
                          :show-arrow="false"
                          class="!p-0"
                          style="padding: 0;"
                          @clickoutside="showDatasourcePopover = false"
                        >
                          <template #trigger>
                            <div
                              class="mode-icon-btn"
                              :class="{ active: qa_type === opt.value || showDatasourcePopover }"
                              :style="{
                                '--active-color': opt.color,
                                '--active-bg': `${opt.color}15`,
                              }"
                              @click.stop="showDatasourcePopover = true; showReportQaDatasourcePopover = false"
                            >
                              <div
                                :class="opt.icon"
                                class="text-14"
                                :style="{ color: opt.color }"
                              ></div>
                              <span class="mode-icon-label">{{ opt.label }}</span>
                              <div class="i-hugeicons:arrow-down-01 text-12 text-gray-400 ml-1"></div>
                            </div>
                          </template>
                          <div class="flex flex-col min-w-[200px] max-w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
                            <div class="max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                              <div
                                v-for="ds in datasourceList"
                                :key="ds.id"
                                class="group flex items-center gap-2.5 px-3 py-2.5 mb-1.5 last:mb-0 hover:bg-[#F5F3FF] cursor-pointer rounded-lg transition-all duration-200 border border-transparent hover:border-[#DDD6FE]"
                                :class="{ 'bg-[#F5F3FF] border-[#DDD6FE]': selectedDatasource?.id === ds.id }"
                                @click="handleDatasourceSelect(ds)"
                              >
                                <div
                                  class="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors"
                                  :class="{ 'bg-white': selectedDatasource?.id === ds.id }"
                                >
                                  <div class="i-hugeicons:database-01 text-15 text-gray-400 group-hover:text-[#7E6BF2]" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }"></div>
                                </div>
                                <span class="text-14 text-gray-700 font-medium group-hover:text-[#7E6BF2] truncate flex-1 min-w-0" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }" :title="`${ds.name}-${ds.type || 'Datasource'}`">
                                  {{ ds.name }}-{{ ds.type || 'Datasource' }}
                                </span>
                                <div v-if="selectedDatasource?.id === ds.id" class="flex-shrink-0">
                                  <div class="i-hugeicons:tick-02 text-15 text-[#7E6BF2]"></div>
                                </div>
                              </div>

                              <div v-if="!datasourceList.length" class="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                                <div class="i-hugeicons:database-01 text-24 opacity-20"></div>
                                <span class="text-13">暂无可用数据源</span>
                              </div>
                            </div>
                          </div>
                        </n-popover>

                        <!-- 深度问数弹窗 -->
                        <n-popover
                          v-if="opt.value === 'REPORT_QA'"
                          trigger="manual"
                          v-model:show="showReportQaDatasourcePopover"
                          placement="top"
                          :show-arrow="false"
                          class="!p-0"
                          style="padding: 0;"
                          @clickoutside="showReportQaDatasourcePopover = false"
                        >
                          <template #trigger>
                            <div
                              class="mode-icon-btn"
                              :class="{ active: qa_type === opt.value || showReportQaDatasourcePopover }"
                              :style="{
                                '--active-color': opt.color,
                                '--active-bg': `${opt.color}15`,
                              }"
                              @click.stop="showReportQaDatasourcePopover = true; showDatasourcePopover = false"
                            >
                              <div
                                :class="opt.icon"
                                class="text-14"
                                :style="{ color: opt.color }"
                              ></div>
                              <span class="mode-icon-label">{{ opt.label }}</span>
                              <div class="i-hugeicons:arrow-down-01 text-12 text-gray-400 ml-1"></div>
                            </div>
                          </template>
                          <div class="flex flex-col min-w-[200px] max-w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
                            <div class="max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                              <div
                                v-for="ds in datasourceList"
                                :key="ds.id"
                                class="group flex items-center gap-2.5 px-3 py-2.5 mb-1.5 last:mb-0 hover:bg-[#F5F3FF] cursor-pointer rounded-lg transition-all duration-200 border border-transparent hover:border-[#DDD6FE]"
                                :class="{ 'bg-[#F5F3FF] border-[#DDD6FE]': selectedDatasource?.id === ds.id }"
                                @click="handleDatasourceSelect(ds)"
                              >
                                <div
                                  class="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors"
                                  :class="{ 'bg-white': selectedDatasource?.id === ds.id }"
                                >
                                  <div class="i-hugeicons:database-01 text-15 text-gray-400 group-hover:text-[#7E6BF2]" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }"></div>
                                </div>
                                <span class="text-14 text-gray-700 font-medium group-hover:text-[#7E6BF2] truncate flex-1 min-w-0" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }" :title="`${ds.name}-${ds.type || 'Datasource'}`">
                                  {{ ds.name }}-{{ ds.type || 'Datasource' }}
                                </span>
                                <div v-if="selectedDatasource?.id === ds.id" class="flex-shrink-0">
                                  <div class="i-hugeicons:tick-02 text-15 text-[#7E6BF2]"></div>
                                </div>
                              </div>

                              <div v-if="!datasourceList.length" class="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                                <div class="i-hugeicons:database-01 text-24 opacity-20"></div>
                                <span class="text-13">暂无可用数据源</span>
                              </div>
                            </div>
                          </div>
                        </n-popover>

                      <n-tooltip
                        v-if="opt.value !== 'DATABASE_QA' && opt.value !== 'REPORT_QA'"
                        trigger="hover"
                      >
                        <template #trigger>
                          <div
                            class="mode-icon-btn"
                            :class="{ active: qa_type === opt.value }"
                            :style="{
                              '--active-color': opt.color,
                              '--active-bg': `${opt.color}15`,
                            }"
                            @click.stop="selectMode(opt.value)"
                          >
                            <div
                              :class="opt.icon"
                              class="text-14"
                              :style="{ color: opt.color }"
                            ></div>
                            <span class="mode-icon-label">{{ opt.label }}</span>
                          </div>
                        </template>
                        {{ opt.label }}
                      </n-tooltip>
                    </template>
                  </div>
                </div>

                <!-- Right: Attachment + Send -->
                <div class="right-actions flex items-center gap-3">
                  <!-- Attachment (Paperclip) -->
                  <n-dropdown
                    :options="fileUploadRef?.options || []"
                    trigger="click"
                    placement="top-end"
                  >
                    <div class="action-icon i-hugeicons:attachment-01 text-20 text-gray-400 hover:text-gray-600 cursor-pointer"></div>
                  </n-dropdown>

                  <!-- Send Button (Purple Circle) -->
                  <div
                    class="send-btn-circle"
                    :class="{ disabled: !inputTextString && !pendingUploadFileInfoList?.length }"
                    @click="handleCreateStylized()"
                  >
                    <div
                      v-if="stylizingLoading"
                      class="i-svg-spinners:pulse-2 text-white text-18"
                    ></div>
                    <div
                      v-else
                      class="i-hugeicons:arrow-up-01 text-white text-20 font-bold"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-note">
              内容由AI生成，仅供参考
            </div>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
    <TableModal
      v-model:show="isModalOpen"
      @update:show="handleModalClose"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
// ============================================
// 设计系统变量 - 与 default-page.vue 保持一致
// ============================================
$font-family-base: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
$font-family-display: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;

// 主题色系
$primary-color: #6366f1;
$primary-light: #818cf8;
$primary-dark: #4f46e5;
$primary-bg: rgba(99, 102, 241, 0.08);
$primary-border: rgba(99, 102, 241, 0.2);

// 中性色
$text-primary: #1e293b;
$text-secondary: #64748b;
$text-muted: #94a3b8;
$border-color: #e2e8f0;
$bg-subtle: #f8fafc;
$bg-sidebar: #fafbfc;

// 圆角
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 20px;
$radius-full: 9999px;

// 阴影
$shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
$shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
$shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

// ============================================
// 侧边栏样式
// ============================================
.qianwen-sidebar {
  background-color: $bg-sidebar;
  // border-right: 0.1px solid rgba(0, 0, 0, 0.06) !important;
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // Firefox 滚动条样式（置于嵌套规则之前，避免 mixed-decls 警告）
  scrollbar-width: thin;
  scrollbar-color: rgba(138, 138, 138, 0.2) transparent;

  * {
    font-family: $font-family-base;
  }

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(138, 138, 138, 0.2);
    border-radius: 2px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(138, 138, 138, 0.4);
    }
  }
}

.new-chat-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: $font-family-base;
  font-weight: 500;
  letter-spacing: -0.01em;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba($primary-color, 0.2);
    border-color: $primary-light;
    color: $primary-color;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.history-item {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: $font-family-base;
  font-weight: 400;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  border-radius: $radius-md;

  * {
    font-family: $font-family-base;
  }

  &:hover {
    background-color: color.adjust($bg-subtle, $lightness: -2%);
  }
}

.history-label {
  font-family: $font-family-base;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 11px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.loading-text,
.history-item-text {
  font-family: $font-family-base;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.model-name {
  font-family: $font-family-base;
  font-weight: 500;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ============================================
// 模型下拉框
// ============================================
.model-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: $radius-sm;
  border: 1px solid transparent;

  &:hover {
    background-color: $bg-subtle;
    border-color: $border-color;

    .model-dropdown-icon {
      color: $text-secondary;
      transform: translateY(1px);
    }
  }
}

.model-dropdown-label {
  font-size: 14px;
  font-weight: 500;
  color: $text-primary;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.model-dropdown-icon {
  font-size: 16px;
  color: $text-muted;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

// ============================================
// 对话内容区域
// ============================================
.conversation-item {
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  > div {
    font-family: $font-family-base;
  }
}

// ============================================
// 滚动条样式
// ============================================
.custom-scrollbar {
  overflow-y: auto;

  &.overflow-y-scroll {
    overflow-y: scroll;
    min-height: 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $border-color;
    border-radius: 3px;

    &:hover {
      background: color.adjust($border-color, $lightness: -15%);
    }
  }
}

// 历史记录列表滚动条 - hover 显示
.custom-scrollbar.history-list-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    transition: width 0.2s ease;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }

  &:hover {
    scrollbar-width: thin;
    -ms-overflow-style: auto;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: $border-color;

      &:hover {
        background: color.adjust($border-color, $lightness: -15%);
      }
    }
  }
}

// ============================================
// 顶部头部
// ============================================
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  // border-bottom: 1px solid rgba($border-color, 0.5);
}

.model-info {
  display: flex;
  align-items: center;
  color: $text-primary;
}

.model-icon {
  color: $primary-color;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.badge {
  background-color: $bg-subtle;
  padding: 4px 10px;
  border-radius: $radius-sm;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  color: $text-secondary;
  font-family: $font-family-base;
}

// ============================================
// 底部输入区域
// ============================================
.bottom-input-container {
  padding: 12px 0 6px 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-card {
  width: 100%;
  max-width: 880px;
  background-color: #fff;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  border: 1px solid $border-color;
  padding: 12px 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-within {
    border-color: $primary-light;
    box-shadow: $shadow-lg, 0 0 0 3px $primary-bg;
  }
}

.input-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}

.mode-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: $radius-full;
  font-family: $font-family-base;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  border: 1px solid transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;

  .text-16 {
    font-size: 16px;
  }
}

.mode-icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: $radius-full;
  font-family: $font-family-base;
  font-size: 13px;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: $bg-subtle;
  border: 1px solid transparent;

  .text-14 {
    font-size: 16px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: color.adjust($bg-subtle, $lightness: -3%);
    color: $text-primary;
    border-color: $border-color;

    .text-14 {
      transform: scale(1.1);
    }
  }

  &.active {
    color: var(--active-color);
    background-color: var(--active-bg);
    border-color: transparent;
  }
}

.mode-icon-label {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
}

.custom-chat-input {
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
  --n-box-shadow: none !important;
  --n-box-shadow-focus: none !important;

  background-color: transparent !important;
  font-family: $font-family-base;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: -0.01em;
  padding: 0;
  flex: 1;
  margin: 0;

  :deep(.n-input__textarea-el) {
    font-family: $font-family-base;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: -0.01em;
    padding: 0;
    color: $text-primary;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 36px;
  }

  :deep(.n-input__placeholder) {
    color: $text-muted;
  }
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba($border-color, 0.5);
}

.action-icon {
  font-size: 22px;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 6px;
  border-radius: $radius-sm;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover {
    color: $text-primary;
    background-color: $bg-subtle;
  }
}

.send-btn-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba($primary-color, 0.35);

  .text-20, .text-18 {
    font-size: 18px;
  }

  &:hover:not(.disabled) {
    transform: scale(1.08) translateY(-1px);
    box-shadow: 0 6px 16px rgba($primary-color, 0.45);
  }

  &:active:not(.disabled) {
    transform: scale(0.95);
  }

  &.disabled {
    background: $border-color;
    cursor: not-allowed;
    box-shadow: none;

    .i-hugeicons\\:arrow-up-01 {
      color: $text-muted;
    }
  }
}

.footer-note {
  font-family: $font-family-base;
  font-size: 12px;
  color: $text-muted;
  margin-top: 5px;
  text-align: center;
  letter-spacing: 0;
}


/* Existing Styles */

.create-chat-box {
  width: 168px;
  overflow: hidden;
  transition: all 0.3s;
  margin-right: 10px;

  &.hide {
    width: 0;
    margin-right: 0;
  }
}

.create-chat {
  width: 100%;
  height: 36px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  border-radius: 20px;
}

.search-chat {
  width: 36px;
  height: 36px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;

  &.focus {
    width: 100%;
    border-radius: 20px;
  }
}

// ============================================
// 主滚动容器
// ============================================
.scrollable-container {
  overflow-y: auto;
  height: 100%;
  padding-bottom: 20px;
  background-color: #fff;
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  *:not(code):not(pre):not(kbd):not(samp) {
    font-family: $font-family-base;
  }
}

// 全局滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: color.adjust($primary-color, $lightness: 30%);
  border-radius: 3px;

  &:hover {
    background: color.adjust($primary-color, $lightness: 20%);
  }
}

// ============================================
// 自定义表格
// ============================================
:deep(.custom-table) {
  .n-data-table-thead {
    display: none;
  }

  .n-data-table-table {
    border-collapse: collapse;
  }

  .n-data-table-th,
  .n-data-table-td {
    border: none;
  }

  td {
    color: $text-primary;
    padding: 12px 24px;
    background-color: #fff;
    transition: background-color 0.2s ease;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .selected-row td {
    color: $primary-color !important;
    font-weight: 500;
    padding: 12px 24px !important;
    background: linear-gradient(to bottom, #fff, $primary-bg);
    transition: all 0.2s ease;
  }
}

// ============================================
// 页面布局
// ============================================
.default-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $bg-subtle;
}

.active-tab {
  background: linear-gradient(to left, $primary-bg, rgba($primary-light, 0.15));
  border-color: $primary-color;
  color: $primary-color;
}

.custom-layout {
  border-top-left-radius: $radius-md;
  background-color: #fff;
}

.header,
.footer {
  background-color: #fff;
}

.content {
  border-right: 1px solid rgba($border-color, 0.5);
  background-color: #fff;
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.footer {
  border-bottom-left-radius: $radius-md;
}

// ============================================
// 动画
// ============================================
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// ============================================
// 图标按钮
// ============================================
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid $border-color;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &.selected,
  &:hover {
    border-color: $primary-light;
    box-shadow: 0 0 0 3px $primary-bg;
  }
}

// ============================================
// 表格容器滚动条
// ============================================
.scrollable-table-container {
  overflow-y: hidden;
  height: 100%;
  background-color: #fff;
  transition: background-color 0.2s ease;

  &:hover {
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $border-color;
    border-radius: 3px;

    &:hover {
      background-color: color.adjust($border-color, $lightness: -15%);
    }
  }
}

// ============================================
// 滚动到底部按钮
// ============================================
.scroll-to-bottom-btn {
  position: absolute;
  bottom: 145px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: $shadow-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid $border-color;
  backdrop-filter: blur(8px);

  &:hover {
    background-color: $bg-subtle;
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: $primary-light;
  }

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 0.15;
    background: $primary-bg;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

// ============================================
// 文件上传列表
// ============================================
.upload-wrapper-list {
  --at-apply: flex flex-wrap gap-10 items-center;
  --at-apply: pb-12;
}

// ============================================
// 搜索输入框
// ============================================
.search-input-custom {
  --n-border: 1px solid #{$border-color} !important;
  --n-border-hover: 1px solid #{$primary-light} !important;
  --n-border-focus: 1px solid #{$primary-color} !important;
  --n-box-shadow-focus: 0 0 0 3px #{$primary-bg} !important;
  --n-caret-color: #{$primary-color} !important;

  :deep(.n-input__input-el) {
    height: 38px !important;
    font-family: $font-family-base;
  }

  :deep(.n-input__border),
  :deep(.n-input__state-border) {
    border-radius: $radius-sm !important;
  }
}

// ============================================
// 加载指示器
// ============================================
.conversation-loading-indicator {
  animation: fadeIn 0.2s ease-in;
  will-change: opacity;
  font-family: $font-family-base;
}

.conversation-loading-indicator--bottom {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  background: linear-gradient(to top, #fff 80%, rgba(255, 255, 255, 0));
}

.conversation-loading-indicator--top {
  width: 100%;
  justify-content: center;
  background: linear-gradient(to bottom, #fff 80%, rgba(255, 255, 255, 0));
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// ============================================
// 星星加载动画
// ============================================
.star-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    transform-origin: 12px 12px;
  }

  .star-center {
    transform-origin: 12px 12px;
    animation: starTwinkle 1.5s ease-in-out infinite;
  }

  .star-1,
  .star-2,
  .star-3,
  .star-4 {
    transform-origin: 0 0;
    animation: starOrbit 3s linear infinite, starTwinkle 1.5s ease-in-out infinite;
  }

  .star-1 { animation-delay: 0s, 0s; }
  .star-2 { animation-delay: 0s, 0.3s; }
  .star-3 { animation-delay: 0s, 0.6s; }
  .star-4 { animation-delay: 0s, 0.9s; }

  .star-path {
    transform-origin: center;
    fill: $primary-light;
  }
}

@keyframes starOrbit {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes starTwinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

// ============================================
// 步骤进度
// ============================================
.step-progress-text {
  color: $primary-light;
  font-family: $font-family-base;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 24px;
  letter-spacing: -0.01em;
}

.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.step-fade-enter-to,
.step-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

// ============================================
// 底部等待动画
// ============================================
.bottom-loading-indicator {
  width: 100%;
  min-height: auto;
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
