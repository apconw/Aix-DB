<script lang="tsx" setup>
import type { InputInst, UploadFileInfo } from 'naive-ui'
// Import Cookies to clear token on logout
import { UAParser } from 'ua-parser-js'
import * as GlobalAPI from '@/api'
import { fetch_datasource_list } from '@/api/datasource'
import { isMockDevelopment } from '@/config'
import SideBar from '../components/Navigation/SideBar.vue'
import DefaultPage from './DefaultPage.vue'
import FileListItem from './FileListItem.vue'
import FileUploadManager from './FileUploadManager.vue'

import SuggestedView from './SuggestedPage.vue'
import TableModal from './TableModal.vue'

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

// 管理对话
const isModalOpen = ref(false)
function openModal() {
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
  }
}

// 新建对话
function newChat() {
  backgroundColorVariable.value = '#ffffff'

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

  // 新增：生成当前问答类型的新uuid
  uuids.value[qa_type.value] = uuidv4()
}

/**
 * 默认大模型
 */
const defaultLLMTypeName = 'qwen2'
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
    // console.log('onChartReady', index)
    currentRenderIndex.value = index
    stylizingLoading.value = false
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
  }>
>([])

// 这里子组件 chart渲染慢需要子组件渲染完毕后通知父组件
const visibleConversationItems = computed(() => {
  return conversationItems.value.slice(0, currentRenderIndex.value + 2)
})
// 这里控制内容加载状态
const contentLoadingStates = ref(
  visibleConversationItems.value.map(() => false),
)


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
    window.$ModalMessage.warning('深度搜索暂不支持文件上传')
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

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
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
    conversationItems.value.push({
      uuid: uuid_str,
      chat_id: uuids.value[currentQaType],
      qa_type: currentQaType,
      question: textContent,
      file_key: upload_file_list,
      role: 'user',
      reader: null,
    })
    // 更新 currentRenderIndex 以包含新添加的项
    currentRenderIndex.value = conversationItems.value.length - 1
    contentLoadingStates.value[currentRenderIndex.value] = true

    // 清空文件上传列表
    pendingUploadFileInfoList.value = []
    businessStore.clear_file_list()
  }

  // 调用大模型
  const { error, reader, needLogin }
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
    })

    // 更新 currentRenderIndex 以包含新添加的项
    currentRenderIndex.value = conversationItems.value.length - 1

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
  handleCreateStylized(suggested_array.value[index])
}

// 侧边表格滚动条数 动态显示隐藏设置 - REMOVED
// const scrollableContainer = useTemplateRef('scrollableContainer')
// const showScrollbar = ...
// const hideScrollbar = ...

const searchText = ref('')
const searchChatRef = useTemplateRef('searchChatRef')
const isFocusSearchChat = ref(false)
const onFocusSearchChat = () => {
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
// 新增：监听滚动事件
const handleScroll = () => {
  checkScrollPosition()
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
  onAqtiveChange(payload.mode, '') // Switch mode
  inputTextString.value = payload.text // Set text
  
  if (payload.datasource_id) {
     const ds = datasourceList.value.find((d) => d.id === payload.datasource_id)
     if (ds) {
         selectedDatasource.value = ds
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
  { icon: 'i-hugeicons:search-02', label: '深度搜索', value: 'REPORT_QA', color: '#8b5cf6' },
]

const currentQaOption = computed(() => {
  return qaOptions.find((opt) => opt.value === qa_type.value)
})

const showModeSelector = ref(false)

const clearMode = () => {
  // Switch to selection mode
  showModeSelector.value = true
  selectedDatasource.value = null
}

const selectMode = (mode: string) => {
  onAqtiveChange(mode, '')
  showModeSelector.value = false
}

const handleDatasourceSelect = (ds: any) => {
  selectedDatasource.value = ds
  selectMode('DATABASE_QA')
  showDatasourcePopover.value = false
}

// Navigation Rail Items - REMOVED
// const navRailItems = ...

// Handle History Item Click (Replaces rowProps)
const handleHistoryClick = async (item: any) => {
  backgroundColorVariable.value = '#fff'

  currentIndex.value = item.uuid
  suggested_array.value = []

  isInit.value = false
  isView.value = true

  // 这里根据chat_id 过滤同一轮对话数据
  await fetchConversationHistory(
    isInit,
    conversationItems,
    tableData,
    currentRenderIndex,
    item,
    '',
    1,
    999999,
    false,
  )

  // 关闭默认页面
  showDefaultPage.value = false

  //   等待 DOM 更新完成
  await nextTick()
  //  滚动到指定位置
  scrollToItem(item.uuid)

  onAqtiveChange(item.qa_type, item.chat_id)
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
        <div class="sidebar-container flex flex-col h-full bg-[#F6F6F8]">
          <!-- Header: Logo & Icons -->
          <div class="sidebar-header px-6 py-6 flex justify-between items-center">
            <div
              class="logo-area flex items-center gap-3 cursor-pointer"
              @click="showDefaultPage = true"
            >
              <div class="i-hugeicons:ai-chat-02 text-32 c-[#3B5CFF]"></div>
              <span class="text-24 font-bold text-[#111111] tracking-tight font-sans">助手</span>
            </div>
            <div class="header-actions flex items-center gap-5">
              <div
                class="action-icon i-hugeicons:search-01 text-24 text-[#8A8A8A] hover:text-[#333] cursor-pointer mr-4"
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
            <span class="text-[#7A7A7A] text-[13px] font-semibold tracking-wide">最近对话</span>
            <div
              class="i-hugeicons:settings-04 text-18 text-[#7A7A7A] cursor-pointer hover:text-gray-600"
              @click="openModal"
            ></div>
          </div>

          <!-- History List -->
          <div
            ref="historyScrollRef"
            class="flex-1 overflow-y-auto custom-scrollbar px-4"
            @scroll.passive="handleHistoryScroll"
          >
            <div
              v-if="isLoadingHistory && !tableData.length"
              class="p-4 text-center text-gray-400 text-xs"
            >
              加载中...
            </div>

            <div
              v-for="(item, index) in tableData"
              :key="item.uuid"
              class="history-item px-2 py-3.5 mb-1 rounded-lg cursor-pointer flex items-center justify-between group transition-all duration-200"
              :class="currentIndex === item.uuid ? 'bg-[#F2F0FF] text-[#7E6BF2] font-medium' : 'text-[#555] hover:bg-[#EAEBED] hover:text-[#333]'"
              @click="handleHistoryClick(item)"
            >
              <div class="flex items-center gap-2 overflow-hidden w-full">
                <div class="truncate text-[14px] w-full leading-relaxed ml-10 mt-10">
                  {{ item.key || '无标题对话' }}
                </div>
              </div>
              <!-- Attachment Icon Placeholder -->
              <div
                v-if="index % 4 === 0"
                class="i-hugeicons:attachment-01 text-14 text-[#9ca3af] shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </div>

            <div
              v-if="isLoadingMoreHistory"
              class="py-2 text-center text-gray-400 text-xs"
            >
              加载更多...
            </div>
          </div>

          <!-- Sidebar Footer -->
          <div class="sidebar-footer px-6 py-5 flex items-center justify-between bg-[#F6F6F8] mt-auto">
            <SideBar
              mode="avatar"
              theme="light"
            />

            <div
              class="my-space flex items-center gap-2 text-[#6A6A6A] hover:text-[#7E6BF2] cursor-pointer text-[14px] font-normal transition-colors"
            >
              <div class="i-hugeicons:folder-01 text-18"></div>
              <span>我的空间</span>
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
                  class="i-hugeicons:comment-add-01 text-20 text-[#4A4A4A] cursor-pointer hover:text-[#111]"
                  @click="newChat"
                ></div>
              </div>

              <div class="model-info flex items-center gap-1.5 cursor-pointer">
                <span class="text-[16px] font-medium text-[#111]">Qwen3-Max</span>
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
            <!-- 默认对话页面 -->
            <transition name="fade">
              <div
                v-if="showDefaultPage"
                class="h-full"
              >
                <DefaultPage @submit="handleSubmitFromDefaultPage" />
              </div>
            </transition>

            <template
              v-if="!showDefaultPage"
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
                          'fontFamily': `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
                          'fontWeight': '400',
                          'color': '#1a1a1a',
                          'backgroundColor': '#f5f7ff',
                          'borderRadius': '12px',
                          'max-width': '800px',
                          'text-align': 'left',
                          'padding': '12px 20px',
                          'line-height': 1.6,
                          'word-wrap': 'break-word',
                          'word-break': 'break-all',
                          'white-space': 'pre-wrap',
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

                  <!-- 加载动画：紧跟在消息下方，但对齐到左边 -->
                  <div
                    v-if="contentLoadingStates[index]"
                    class="i-svg-spinners:bars-scale"
                    :style="{
                      'width': `24px`,
                      'height': `24px`,
                      'color': `#b1adf3`,
                      'border-left-color': `#b1adf3`,
                      'animation': `spin 1s linear infinite`,
                      'margin-top': '10px',
                      'align-self': 'flex-start', // 让此元素在交叉轴（水平轴）上靠左对齐
                      'margin-left': '0', // 与上面的消息保持一致的缩进
                    }"
                  ></div>
                </div>

                <div
                  v-if="item.role === 'assistant'"
                  class="max-w-[890px] w-full mx-auto"
                >
                  <MarkdownPreview
                    :reader="item.reader"
                    :model="defaultLLMTypeName"
                    :is-init="isInit"
                    :is-view="isView"
                    :qa-type="`${item.qa_type}`"
                    :chart-id="`${index}devID${generateRandomSuffix()}`"
                    :parent-scoll-bottom-method="scrollToBottom"
                    @failed="() => onFailedReader(index)"
                    @completed="() => onCompletedReader(index)"
                    @chartready="() => onChartReady(index + 1)"
                    @recycle-qa="() => onRecycleQa(index)"
                    @praise-fead-back="() => onPraiseFeadBack(index)"
                    @belittle-feedback="
                      () => onBelittleFeedback(index)
                    "
                    @begin-read="() => onBeginRead(index)"
                  />
                </div>
              </div>
            </template>

            <div
              v-if="!isInit && !stylizingLoading"
              class="w-70% ml-11% mt-[-20] bg-#f6f7fb"
            >
              <SuggestedView
                :labels="suggested_array"
                @suggested="onSuggested"
              />
            </div>
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
                    v-if="!showModeSelector && currentQaOption"
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
                      v-if="currentQaOption.value === 'DATABASE_QA' && selectedDatasource"
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
                    v-else
                    class="flex items-center gap-2"
                  >
                    <template
                      v-for="opt in qaOptions"
                      :key="opt.value"
                    >
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
                              @click.stop="showDatasourcePopover = true"
                            >
                              <div
                                :class="opt.icon"
                                class="text-14"
                                :style="{ color: opt.color }"
                              ></div>
                              <span class="mode-icon-label">{{ opt.label }}</span>
                              <div v-if="opt.value === 'DATABASE_QA'" class="i-hugeicons:arrow-down-01 text-12 text-gray-400 ml-1"></div>
                            </div>
                          </template>
                          <div class="flex flex-col min-w-[180px] max-w-[240px] bg-white rounded-xl shadow-2xl border border-gray-100 p-2">
                            <div class="max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                              <div
                                v-for="ds in datasourceList"
                                :key="ds.id"
                                class="group flex items-center gap-3 px-3 py-2.5 mb-1 last:mb-0 hover:bg-[#F5F3FF] cursor-pointer rounded-lg transition-all duration-200 border border-transparent hover:border-[#DDD6FE]"
                                :class="{ 'bg-[#F5F3FF] border-[#DDD6FE]': selectedDatasource?.id === ds.id }"
                                @click="handleDatasourceSelect(ds)"
                              >
                                <div 
                                  class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors"
                                  :class="{ 'bg-white': selectedDatasource?.id === ds.id }"
                                >
                                  <div class="i-hugeicons:database-01 text-16 text-gray-400 group-hover:text-[#7E6BF2]" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }"></div>
                                </div>
                                <div class="flex flex-col flex-1 min-w-0">
                                  <span class="text-14 text-gray-700 font-semibold group-hover:text-[#7E6BF2] truncate" :class="{ 'text-[#7E6BF2]': selectedDatasource?.id === ds.id }" :title="ds.name">
                                    {{ ds.name }}
                                  </span>
                                  <span class="text-11 text-gray-400 truncate">{{ ds.type || 'Datasource' }}</span>
                                </div>
                                <div v-if="selectedDatasource?.id === ds.id" class="flex-shrink-0">
                                  <div class="i-hugeicons:tick-02 text-16 text-[#7E6BF2]"></div>
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
                        v-else
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
/* Sidebar Styles */

.qianwen-sidebar {
  background-color: #fff;
  border-right: 1px solid #fff;
}

.new-chat-btn {
  transition: all 0.2s ease;
}

.new-chat-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgb(99 102 241 / 20%);
}

.history-item {
  transition: all 0.2s;
}

/* Custom Scrollbar for History List */

.custom-scrollbar {
  overflow-y: auto;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Top Header Styles */

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #fff;

  /* border-bottom: 1px solid #f0f0f0; */

  /* Image shows no obvious border, or very subtle. Removing for cleaner look matching image */
}

.model-info {
  display: flex;
  align-items: center;

  /* gap: 8px; */

  color: #333;

  /* font-weight: 600; */
}

.model-icon {
  color: #8b5cf6;
  font-size: 16px;
}

.badge {
  background-color: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

/* Bottom Input Area Styles (C Style) */

.bottom-input-container {
  padding: 20px 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-card {
  width: 100%;
  max-width: 890px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 8%);
  border: 1px solid #e5e7eb;
  padding: 16px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  /* display: flex; align-items: flex-start; gap: 8px; */

  width: 100%;
}

.mode-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid transparent;
  transition: all 0.2s;
  cursor: default;
}

.mode-icon-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #f8fafc;
    border: 1px solid transparent;
  
    &:hover, &.active {
      background-color: #f1f5f9;
      color: #334155;
    }
  
    &.active {
      color: var(--active-color);
      background-color: var(--active-bg);
    }
  }

.mode-icon-label {
  font-size: 13px;
  font-weight: 500;
}

.custom-chat-input {
  --n-border: none !important;
  --n-border-hover: none !important;
  --n-border-focus: none !important;
  --n-box-shadow: none !important;
  --n-box-shadow-focus: none !important;

  background-color: transparent !important;
  font-size: 16px;
  padding: 0;
  flex: 1;

  :deep(.n-input__textarea-el) {
    padding: 0;
    min-height: 40px;
    line-height: 1.6;
  }

  :deep(.n-input__placeholder) {
    color: #9ca3af;
  }
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.action-icon {
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #374151;
  }
}

.send-btn-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #7E6BF2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgb(126 107 242 / 30%);

  &:hover {
    background-color: #6b5ae0;
    transform: scale(1.05);
  }

  &.disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
    box-shadow: none;

    .i-hugeicons:arrow-up-01 {
      color: #9ca3af;
    }
  }
}

.footer-note {
  font-size: 12px;
  color: #d1d5db;
  margin-top: 8px;
  text-align: center;
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

.scrollable-container {
  overflow-y: auto; // 添加纵向滚动条
  height: 100%;
  padding-bottom: 20px; // 底部内边距，防止内容被遮挡
  background-color: #fff;
}

/* 滚动条整体部分 */

::-webkit-scrollbar {
  width: 4px; /* 竖向滚动条宽度 */
  height: 4px; /* 横向滚动条高度 */
}

/* 滚动条的轨道 */

::-webkit-scrollbar-track {
  background: #fff; /* 轨道背景色 */
}

/* 滚动条的滑块 */

::-webkit-scrollbar-thumb {
  background: #cac9f9; /* 滑块颜色 */
  border-radius: 10px; /* 滑块圆角 */
}

/* 滚动条的滑块在悬停状态下的样式 */

::-webkit-scrollbar-thumb:hover {
  background: #cac9f9; /* 悬停时滑块颜色 */
}

:deep(.custom-table .n-data-table-thead) {
  display: none;
}

:deep(.custom-table .n-data-table-table) {
  border-collapse: collapse;
}

:deep(.custom-table .n-data-table-th),
:deep(.custom-table .n-data-table-td) {
  border: none;
}

:deep(.custom-table td) {
  color: #113;
  padding: 12px 30px;
  background-color:  #fff;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* 优化后的系统字体栈：优先使用系统原生字体 */

  font-family:
    /* macOS */ -apple-system,
    /* Windows */ BlinkMacSystemFont,
    /* 通用系统UI */ 'Segoe UI',
    /* 开源跨平台 */ Roboto,
    /* Linux */ Oxygen, Ubuntu, Cantarell,
    /* fallback */ 'Open Sans', 'Helvetica Neue', Arial,
    /* 终极兜底 */ sans-serif,
    /* 现代浏览器推荐 */ system-ui,
    /* 苹果新字体支持 */ "SF Pro Text";

  /* 可选：基础字体大小与行高，提升可读性 */

  font-size: 14px;

  /* 优化字体渲染 */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizelegibility;
}

:deep(.custom-table .selected-row td) {
  color: #615ced !important;
  font-weight: bold;
  padding: 12px 30px !important;
  background: linear-gradient(to bottom, #fff, #f9f9ff);
  transform: scale(1.001);
  transition: all 0.3s ease;
}

.default-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器高度占满整个视口 */
  background-color: #f6f7fb; /* 可选：设置背景颜色 */
}

.active-tab {
  // background: linear-gradient(to left, #f3f2ff, #e1e7fe);

  background: linear-gradient(to left, #f0effe, #d4eefc);
  border-color: #635eed;
  color: #635eed;
}

/* 新建对话框的淡入淡出动画样式 */

.fade-enter-active {
  transition: opacity 1s; /* 出现时较慢 */
}

.fade-leave-active {
  transition: opacity 0s; /* 隐藏时较快 */
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@keyframes spin {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.custom-layout {
  border-top-left-radius: 10px;
  background-color: #fff;
}

.header,
.footer {
  background-color: #fff;
}

.content {
  border-right:1px solid #fff;
  background-color: #fff;
}

.footer {
  border-bottom-left-radius: 10px;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; /* 可根据需要调整 */
  height: 38px; /* 与宽度相同，形成圆形 */
  border-radius: 100%; /* 圆形 */
  border: 1px solid #e8eaf3;
  background-color: #fff; /* 按钮背景颜色 */
  cursor: pointer;
  transition: background-color 0.3s; /* 平滑过渡效果 */
  position: relative; /* 相对定位 */
}

.icon-button.selected {
  border: 1px solid #a48ef4;
}

.icon-button:hover {
  border: 1px solid #a48ef4; /* 鼠标悬停时的颜色 */
}


/** 自定义对话历史表格滚动条样式 */

.scrollable-table-container {
  overflow-y: hidden; /* 默认隐藏滚动条 */
  height: 100%; /* 根据实际情况调整高度 */
  background-color: #fff;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scrollable-table-container:hover {
  overflow-y: auto; /* 鼠标悬停时显示滚动条 */
}

/* 隐藏滚动条轨道 */

.scrollable-table-container::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

.scrollable-table-container::-webkit-scrollbar-track {
  background: transparent; /* 滚动条轨道背景透明 */
}

.scrollable-table-container::-webkit-scrollbar-thumb {
  background-color: #e8eaf3; /* 滚动条颜色 */
  border-radius: 4px; /* 滚动条圆角 */
}

/* 一键到底部按钮样式，底部居中显示 */

.scroll-to-bottom-btn {
  position: absolute;
  bottom: 145px; /* 距离底部的距离 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 4px 15px rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  border: 1px solid #e8eaf3;
  backdrop-filter: blur(5px);
}

.scroll-to-bottom-btn:hover {
  background-color: #f6f7fb;
  transform: translateX(-50%) scale(1.1); /* 悬停时放大 */
  box-shadow: 0 6px 20px rgb(0 0 0 / 25%);
}

.scroll-to-bottom-btn::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1);
    opacity: 0.2;
  }

  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.upload-wrapper-list {
  --at-apply: flex flex-wrap gap-10 items-center;
  --at-apply: pb-12;
}

.search-input-custom {
  --n-border: 1px solid #E6E6E6 !important;
  --n-border-hover: 1px solid #7E6BF2 !important;
  --n-border-focus: 1px solid #7E6BF2 !important;
  --n-box-shadow-focus: 0 0 0 2px rgb(126 107 242 / 10%) !important;
  --n-caret-color: #7E6BF2 !important;

  :deep(.n-input__input-el) {
    height: 38px !important;
  }

  :deep(.n-input__border) {
    border-radius: 8px !important;
  }

  :deep(.n-input__state-border) {
    border-radius: 8px !important;
  }
}
</style>
