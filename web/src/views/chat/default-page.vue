<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { fetch_datasource_list } from '@/api/datasource'
import { fetch_model_list, set_default_model } from '@/api/aimodel'
import { fetch_skill_list } from '@/api/skill'
import FileUploadManager from '@/views/file/file-upload-manager.vue'

const props = defineProps<{
  collapsed?: boolean
}>()

const emit = defineEmits(['submit'])

const inputValue = ref('')
const selectedMode = ref<{ label: string, value: string, icon: string, color: string } | null>(null)
const datasourceList = ref<any[]>([])
const selectedDatasource = ref<any>(null)
const showDatasourcePopover = ref(false)
const showReportQaDatasourcePopover = ref(false)
const showSkillModal = ref(false)
const skillList = ref<Array<{ name: string; description: string }>>([])
const loadingSkills = ref(false)

// LLM 模型列表（下拉选择）
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

const loadLLMModels = async () => {
  try {
    const res = await fetch_model_list(undefined, 1)
    const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []
    llmModels.value = list
    if (list.length > 0) {
      const defaultItem = list.find((m: any) => m.default_model)
      const model = defaultItem || list[0]
      if (model) {
        selectedLLMModelId.value = model.id
      }
    }
  } catch (e) {
    console.error('加载大语言模型列表失败:', e)
  }
}

// 修改默认大模型（适配 Dropdown 的 select 事件，参数是 key）
const handleLLMModelChange = async (key: number | string) => {
  const modelId = typeof key === 'string' ? parseInt(key) : key
  selectedLLMModelId.value = modelId
  try {
    await set_default_model(modelId)
    window.$ModalMessage?.success?.('默认模型已更新')
  } catch (e) {
    console.error('更新默认模型失败:', e)
    window.$ModalMessage?.error?.('更新默认模型失败，请重试')
  }
}

onMounted(async () => {
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

  // 加载大语言模型列表（用于顶部下拉选择）
  await loadLLMModels()
})

const handleDatasourceSelect = (ds: any) => {
  selectedDatasource.value = ds
  // 根据哪个弹窗是打开的来判断应该设置哪个模式
  if (showReportQaDatasourcePopover.value) {
    // 从深度问数弹窗中选择，设置为深度问数模式
    selectedMode.value = chips.find((c) => c.value === 'REPORT_QA')!
    showReportQaDatasourcePopover.value = false
  } else if (showDatasourcePopover.value) {
    // 从数据问答弹窗中选择，设置为数据问答模式
    selectedMode.value = chips.find((c) => c.value === 'DATABASE_QA')!
    showDatasourcePopover.value = false
  } else {
    // 如果都没有打开，根据当前模式判断
    if (selectedMode.value?.value === 'REPORT_QA') {
      selectedMode.value = chips.find((c) => c.value === 'REPORT_QA')!
    } else {
      selectedMode.value = chips.find((c) => c.value === 'DATABASE_QA')!
    }
  }
}


// File Upload Logic
const fileUploadRef = ref<InstanceType<typeof FileUploadManager> | null>(null)
const pendingUploadFileInfoList = ref<UploadFileInfo[]>([])

// 检查是否是有效的 Excel 文件
const isValidExcelFile = (file: UploadFileInfo): boolean => {
  const fileName = file.name?.toLowerCase() || ''
  return fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')
}

// 检查表格问答模式是否满足发送条件
const canSubmitTableQA = computed(() => {
  if (selectedMode.value?.value !== 'FILEDATA_QA') {
    return true // 非表格问答模式，不限制
  }

  // 表格问答模式：必须至少有一个已完成的 Excel 文件
  const finishedFiles = pendingUploadFileInfoList.value.filter(
    (f) => f.status === 'finished' && isValidExcelFile(f)
  )
  return finishedFiles.length > 0
})

// 检查是否可以发送（综合判断）
const canSubmit = computed(() => {
  // 基础条件：有文本输入或有文件
  const hasContent = inputValue.value.trim() || pendingUploadFileInfoList.value.length > 0

  if (!hasContent) {
    return false
  }

  // 表格问答模式特殊检查
  if (selectedMode.value?.value === 'FILEDATA_QA') {
    return canSubmitTableQA.value
  }

  return true
})

const handleEnter = (e?: KeyboardEvent) => {
  if (e && e.shiftKey) {
    return
  }

  // 检查是否可以发送
  if (!canSubmit.value) {
    if (selectedMode.value?.value === 'FILEDATA_QA') {
      window.$ModalMessage.warning('表格问答需要上传Excel文件（.xlsx, .xls, .csv）才能发送')
    }
    return
  }

  // Check if files are uploading
  const hasPendingFiles = pendingUploadFileInfoList.value.some((f) => f.status === 'uploading' || (f.status === 'finished' && f.percentage !== 100))
  if (hasPendingFiles) {
    window.$ModalMessage.warning('请等待文件上传完成')
    return
  }

  // Check if files failed
  const hasErrorFiles = pendingUploadFileInfoList.value.some((f) => f.status === 'error')
  if (hasErrorFiles) {
    window.$ModalMessage.warning('存在上传失败的文件，请移除后重试')
    return
  }

  // 表格问答模式：验证文件格式
  if (selectedMode.value?.value === 'FILEDATA_QA') {
    const finishedFiles = pendingUploadFileInfoList.value.filter((f) => f.status === 'finished')
    if (finishedFiles.length === 0) {
      window.$ModalMessage.warning('表格问答需要上传Excel文件（.xlsx, .xls, .csv）才能发送')
      return
    }

    const invalidFiles = finishedFiles.filter((f) => !isValidExcelFile(f))
    if (invalidFiles.length > 0) {
      window.$ModalMessage.warning('表格问答只支持Excel文件格式(.xlsx, .xls, .csv)')
      return
    }
  }

  emit('submit', {
    text: inputValue.value,
    mode: selectedMode.value?.value || 'COMMON_QA', // Default to Smart QA if nothing selected
    datasource_id: selectedDatasource.value?.id,
  })
  // We don't clear inputValue here immediately because parent might handle it,
  // but typically we should.
  // However, pendingUploadFileInfoList should probably be cleared by parent or here?
  // Let's clear them here to reset state for next time if we stay on this page (unlikely)
  inputValue.value = ''
  pendingUploadFileInfoList.value = []
  // Clear datasource selection if needed, or keep it?
  // Requirement says "Input box shows selected datasource", so maybe keep it until cleared.
  // But typically submit resets the input area.
  // Let's reset it for now as we are likely navigating away or resetting the view.
  // selectedDatasource.value = null
}

const chips = [
  { icon: 'i-hugeicons:ai-chat-02', label: '智能问答', value: 'COMMON_QA', color: '#7E6BF2', placeholder: '先思考后回答，解决更有难度的问题' },
  { icon: 'i-hugeicons:database-01', label: '数据问答', value: 'DATABASE_QA', color: '#10b981', placeholder: '连接数据源，进行自然语言查询' },
  { icon: 'i-hugeicons:table-01', label: '表格问答', value: 'FILEDATA_QA', color: '#f59e0b', placeholder: '上传表格文件，进行数据分析和图表生成' },
  { icon: 'i-hugeicons:search-02', label: '深度问数', value: 'REPORT_QA', color: '#8b5cf6', placeholder: '基于Skill模式，进行深度数据问答与分析' },
]

const placeholderText = computed(() => {
  if (selectedMode.value) {
    const mode = chips.find((c) => c.value === selectedMode.value?.value)
    return mode?.placeholder || '先思考后回答，解决更有难度的问题'
  }
  return '先思考后回答，解决更有难度的问题'
})

const handleChipClick = (chip: typeof chips[0]) => {
  if (chip.value === 'DATABASE_QA') {
    showDatasourcePopover.value = true
    showReportQaDatasourcePopover.value = false
    return
  }
  if (chip.value === 'REPORT_QA') {
    showReportQaDatasourcePopover.value = true
    showDatasourcePopover.value = false
    return
  }
  selectedMode.value = chip
  if (chip.value !== 'DATABASE_QA' && chip.value !== 'REPORT_QA') {
    selectedDatasource.value = null
  }
}

const clearMode = () => {
  // 如果是表格问答模式，清空已上传的文件
  if (selectedMode.value?.value === 'FILEDATA_QA') {
    pendingUploadFileInfoList.value = []
  }
  selectedMode.value = null
  selectedDatasource.value = null
  // 关闭所有数据源弹窗
  showDatasourcePopover.value = false
  showReportQaDatasourcePopover.value = false
}

const loadSkills = async () => {
  if (loadingSkills.value) return
  loadingSkills.value = true
  try {
    const res = await fetch_skill_list()
    const data = await res.json()

    if (res.ok && data.code === 200) {
      // 装饰器已经包装了响应，data.data 就是技能数组
      if (Array.isArray(data.data)) {
        skillList.value = data.data
      } else {
        skillList.value = []
      }
    } else {
      window.$ModalMessage?.error?.(data.msg || '加载技能列表失败')
      skillList.value = []
    }
  } catch (e) {
    window.$ModalMessage?.error?.('加载技能列表失败')
    skillList.value = []
  } finally {
    loadingSkills.value = false
  }
}

const handleSkillDotClick = () => {
  if (!showSkillModal.value) {
    // 打开弹框时加载数据
    if (skillList.value.length === 0) {
      loadSkills()
    }
    showSkillModal.value = true
  } else {
    showSkillModal.value = false
  }
}

const bottomIcons = [
  // Define if needed, or remove if not used in new design
]
</script>

<template>
  <div class="default-page-container">
    <!-- 模型选择：固定在页面左上角，与对话页位置保持一致 -->
    <!-- 当侧边栏折叠时，隐藏此处的模型选择器，因为 top-header 已经显示了 -->
    <div
      v-if="llmModelDropdownOptions.length && !props.collapsed"
      class="model-select-top-left"
    >
      <n-dropdown
        :options="llmModelDropdownOptions"
        placement="bottom-start"
        @select="handleLLMModelChange"
      >
        <div class="model-dropdown-trigger">
          <span class="model-dropdown-label">
            {{ selectedLLMModelName || '选择大语言模型' }}
          </span>
          <div class="model-dropdown-icon i-hugeicons:arrow-down-01"></div>
        </div>
      </n-dropdown>
    </div>

    <div class="content-wrapper">
      <!-- Title -->
      <div class="header-section">
        <div class="logo-wrapper">
          <div class="page-title">
            <span class="gradient-text">A</span>
            <span class="gradient-text i-container">
              i
              <svg
                class="star-icon"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="starGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stop-color="#822dff"
                    />
                    <stop
                      offset="50%"
                      stop-color="#3e45ff"
                    />
                    <stop
                      offset="100%"
                      stop-color="#3ec4fa"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"
                  fill="url(#starGradient)"
                />
              </svg>
            </span>
            <span class="gradient-text">x</span>
          </div>
        </div>
      </div>

      <!-- Search Box -->
      <div class="input-card">
        <!-- Top: File Uploads -->
        <FileUploadManager
          ref="fileUploadRef"
          v-model="pendingUploadFileInfoList"
          class="w-full"
        />

        <!-- 表格问答模式提示：需要上传Excel文件 -->
        <div
          v-if="selectedMode?.value === 'FILEDATA_QA' && !canSubmitTableQA"
          class="table-qa-hint"
        >
          <div class="hint-icon i-hugeicons:info-circle-01"></div>
          <span class="hint-text">表格问答需要上传Excel文件（.xlsx, .xls, .csv）才能发送</span>
        </div>

        <!-- Middle: Input -->
        <div class="input-wrapper w-full">
          <n-input
            v-model:value="inputValue"
            type="textarea"
            :placeholder="placeholderText"
            :autosize="{ minRows: 3, maxRows: 8 }"
            class="custom-input"
            @keydown.enter.prevent="handleEnter"
          />
        </div>

        <!-- Bottom: Footer Actions -->
        <div class="input-footer flex justify-between items-center mt-3">
          <!-- Left: Mode Pill or Chips -->
          <div class="left-actions flex items-center gap-2">
            <!-- If mode is selected, show it as a pill -->
            <template v-if="selectedMode">
              <div
                class="mode-pill"
                :style="{
                  color: selectedMode.color,
                  borderColor: `${selectedMode.color}30`,
                  backgroundColor: `${selectedMode.color}10`,
                }"
              >
                <div
                  :class="selectedMode.icon"
                  class="text-16"
                ></div>
                <span class="font-medium">{{ selectedMode.label }}</span>
                <span
                  v-if="(selectedMode.value === 'DATABASE_QA' || selectedMode.value === 'REPORT_QA') && selectedDatasource"
                  class="font-medium ml-1"
                >
                  | {{ selectedDatasource.name }}
                </span>
                <div
                  class="i-hugeicons:cancel-01 text-14 ml-1 cursor-pointer opacity-60 hover:opacity-100"
                  @click.stop="clearMode"
                ></div>
              </div>
              <!-- 深度问数模式显示技能小点 - 独立显示在右侧 -->
              <n-popover
                v-if="selectedMode.value === 'REPORT_QA'"
                trigger="manual"
                v-model:show="showSkillModal"
                placement="bottom-start"
                :show-arrow="true"
                style="padding: 0; max-width: 320px;"
                @clickoutside="showSkillModal = false"
              >
                <template #trigger>
                  <div
                    class="skill-dot-wrapper"
                    :style="{ color: selectedMode.color }"
                    @click.stop="handleSkillDotClick"
                  >
                    <div class="skill-dot"></div>
                  </div>
                </template>
                <div class="skill-popover-content">
                  <div class="skill-popover-header">
                    <div class="skill-popover-title">
                      <div class="i-hugeicons:magic-wand-01 text-18 mr-2" style="color: #8b5cf6;"></div>
                      <span class="font-semibold">可用技能</span>
                    </div>
                  </div>
                  <div class="skill-list-container">
                    <div
                      v-if="loadingSkills"
                      class="flex items-center justify-center py-8"
                    >
                      <n-spin size="small" />
                      <span class="ml-2 text-gray-500">加载中...</span>
                    </div>
                    <div
                      v-else-if="skillList.length === 0"
                      class="flex flex-col items-center justify-center py-8 text-gray-400"
                    >
                      <div class="i-hugeicons:search-02 text-24 opacity-20 mb-2"></div>
                      <span class="text-13">暂无可用技能</span>
                    </div>
                    <div
                      v-else
                      class="skill-list"
                    >
                      <div
                        v-for="skill in skillList"
                        :key="skill.name"
                        class="skill-item"
                      >
                        <div class="skill-item-header">
                          <div class="skill-icon i-hugeicons:magic-wand-01 text-16"></div>
                          <span class="skill-name">{{ skill.name }}</span>
                        </div>
                        <div class="skill-description">
                          {{ skill.description || '暂无描述' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </n-popover>
            </template>

            <!-- If NO mode selected, show chips row inside -->
            <div
              v-else
              class="flex items-center gap-2"
            >
              <template v-for="chip in chips" :key="chip.label">
                <!-- 数据问答弹窗 -->
                <n-popover
                  v-if="chip.value === 'DATABASE_QA'"
                  trigger="click"
                  v-model:show="showDatasourcePopover"
                  placement="bottom"
                  :show-arrow="false"
                  class="!p-0"
                  style="padding: 0;"
                  @clickoutside="showDatasourcePopover = false"
                >
                  <template #trigger>
                    <div
                      class="inner-chip"
                      @click="handleChipClick(chip)"
                    >
                      <div
                        :class="chip.icon"
                        class="text-14"
                        :style="{ color: chip.color }"
                      ></div>
                      <span>{{ chip.label }}</span>
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
                  v-else-if="chip.value === 'REPORT_QA'"
                  trigger="click"
                  v-model:show="showReportQaDatasourcePopover"
                  placement="bottom"
                  :show-arrow="false"
                  class="!p-0"
                  style="padding: 0;"
                  @clickoutside="showReportQaDatasourcePopover = false"
                >
                  <template #trigger>
                    <div
                      class="inner-chip"
                      @click="handleChipClick(chip)"
                    >
                      <div
                        :class="chip.icon"
                        class="text-14"
                        :style="{ color: chip.color }"
                      ></div>
                      <span>{{ chip.label }}</span>
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

                <!-- 其他选项（智能问答、表格问答） -->
                <div
                  v-else
                  class="inner-chip"
                  @click="handleChipClick(chip)"
                >
                  <div
                    :class="chip.icon"
                    class="text-14"
                    :style="{ color: chip.color }"
                  ></div>
                  <span>{{ chip.label }}</span>
                </div>
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
              :class="{ disabled: !canSubmit }"
              @click="handleEnter()"
            >
              <div class="i-hugeicons:arrow-up-01 text-white text-20 font-bold"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Removed External Chips Row -->
    </div>

  </div>
</template>

<style scoped lang="scss">
@use "sass:color";
// ============================================
// 设计系统变量
// ============================================
$font-family-base: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
$font-family-display: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;

// 主题色系
$primary-color: #6366f1;  // Indigo 500 - 主色调
$primary-light: #818cf8;  // Indigo 400
$primary-dark: #4f46e5;   // Indigo 600
$primary-bg: rgba(99, 102, 241, 0.08);
$primary-border: rgba(99, 102, 241, 0.2);

// 功能色
$success-color: #10b981;
$warning-color: #f59e0b;
$info-color: #8b5cf6;

// 中性色
$text-primary: #1e293b;
$text-secondary: #64748b;
$text-muted: #94a3b8;
$border-color: #e2e8f0;
$bg-subtle: #f8fafc;

// 圆角
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-full: 9999px;

// 阴影
$shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
$shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
$shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
$shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

// ============================================
// 基础布局
// ============================================
.default-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
  position: relative;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 0 24px;
  position: relative;
  top: -40px;
}

// ============================================
// 模型选择器
// ============================================
.model-select-top-left {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
}

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
// 标题区域
// ============================================
.header-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
}

.page-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  height: auto;
  margin: 0;
  letter-spacing: -0.03em;
  font-family: $font-family-display;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.gradient-text {
  background: linear-gradient(135deg, $primary-color 0%, $primary-light 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  z-index: 1;
}

.i-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4px;
}

.star-icon {
  position: absolute;
  top: -10px;
  right: -6px;
  left: auto;
  transform: rotate(12deg);
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: rotate(12deg) translateY(0); }
  50% { transform: rotate(12deg) translateY(-4px); }
}

// ============================================
// 输入卡片
// ============================================
.input-card {
  width: 100%;
  max-width: 880px;
  background-color: #fff;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
  border: 1px solid $border-color;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: $shadow-xl;
    border-color: color.adjust($border-color, $lightness: -5%);
    transform: translateY(-2px);
  }

  &:focus-within {
    border-color: $primary-light;
    box-shadow: $shadow-xl, 0 0 0 3px $primary-bg;
  }
}

.input-wrapper {
  width: 100%;
  margin: 8px 0;
}

.custom-input {
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :deep(.n-input__textarea-el) {
    padding: 0;
    min-height: 80px;
    line-height: 1.7;
    color: $text-primary;
    font-family: $font-family-base;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  :deep(.n-input__placeholder) {
    color: $text-muted;
  }
}

// ============================================
// 底部操作区
// ============================================
.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba($border-color, 0.5);
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .text-16 {
    font-size: 16px;
  }
}

.inner-chip {
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
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: $bg-subtle;
  border: 1px solid transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .text-14 {
    font-size: 16px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: color.adjust($bg-subtle, $lightness: -3%);
    color: $text-primary;
    border-color: $border-color;
    transform: translateY(-1px);

    .text-14 {
      transform: scale(1.1);
    }
  }

  &.active-chip {
    background-color: $primary-bg;
    color: $primary-color;
    border-color: $primary-border;
  }
}

// ============================================
// 操作图标
// ============================================
.action-icon {
  font-size: 22px;
  color: $text-secondary;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 6px;
  border-radius: $radius-sm;

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

  .text-20 {
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
    opacity: 0.6;

    .i-hugeicons\\:arrow-up-01 {
      color: $text-muted;
    }
  }
}

// ============================================
// 表格问答提示
// ============================================
.table-qa-hint {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-top: 12px;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: $radius-md;
  font-family: $font-family-base;
  font-size: 13px;
  color: #92400e;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .hint-icon {
    font-size: 18px;
    color: $warning-color;
    flex-shrink: 0;
  }

  .hint-text {
    line-height: 1.5;
    flex: 1;
    font-weight: 450;
  }
}

// ============================================
// 滚动条
// ============================================
.custom-scrollbar {
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
      background: color.adjust($border-color, $lightness: -10%);
    }
  }
}

// ============================================
// 技能相关样式
// ============================================
.skill-dot-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
  background-color: transparent;

  &:hover {
    background-color: rgba(139, 92, 246, 0.1);
    transform: scale(1.1);
  }
}

.skill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0 0 4px currentColor;
}

.skill-popover-content {
  background: white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-xl;
  width: 100%;
  max-width: 320px;
}

.skill-popover-header {
  padding: 12px 16px;
  border-bottom: 1px solid $border-color;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%);
  flex-shrink: 0;
}

.skill-popover-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: $text-primary;
  font-family: $font-family-base;
}

.skill-list-container {
  max-height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 12px;
  background: white;
  -webkit-overflow-scrolling: touch;

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
      background: color.adjust($border-color, $lightness: -10%);
    }
  }
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-item {
  padding: 12px 14px;
  border-radius: $radius-md;
  border: 1px solid $border-color;
  background-color: $bg-subtle;
  transition: all 0.2s ease;
  cursor: default;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    background-color: rgba(139, 92, 246, 0.05);
    transform: translateY(-1px);
    box-shadow: $shadow-sm;
  }
}

.skill-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.skill-icon {
  color: $info-color;
  flex-shrink: 0;
  font-size: 14px;
}

.skill-name {
  font-size: 13px;
  font-weight: 600;
  color: $text-primary;
  font-family: $font-family-base;
  text-transform: capitalize;
  word-break: break-word;
}

.skill-description {
  font-size: 12px;
  color: $text-secondary;
  line-height: 1.5;
  margin-left: 22px;
  font-family: $font-family-base;
  word-break: break-word;
}
</style>
