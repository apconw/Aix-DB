<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { fetch_datasource_list } from '@/api/datasource'
import FileUploadManager from '@/views/file/file-upload-manager.vue'

const emit = defineEmits(['submit'])

const inputValue = ref('')
const selectedMode = ref<{ label: string, value: string, icon: string, color: string } | null>(null)
const datasourceList = ref<any[]>([])
const selectedDatasource = ref<any>(null)
const showDatasourcePopover = ref(false)

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
})

const handleDatasourceSelect = (ds: any) => {
  selectedDatasource.value = ds
  selectedMode.value = chips.find((c) => c.value === 'DATABASE_QA')!
  showDatasourcePopover.value = false
}


// File Upload Logic
const fileUploadRef = ref<InstanceType<typeof FileUploadManager> | null>(null)
const pendingUploadFileInfoList = ref<UploadFileInfo[]>([])

const handleEnter = (e?: KeyboardEvent) => {
  if (e && e.shiftKey) {
    return
  }

  // Allow submit if there is text OR files
  if (!inputValue.value.trim() && pendingUploadFileInfoList.value.length === 0) {
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
  { icon: 'i-hugeicons:search-02', label: '深度搜索', value: 'REPORT_QA', color: '#8b5cf6', placeholder: '输入研究主题，生成深度研究报告' },
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
    return
  }
  selectedMode.value = chip
  if (chip.value !== 'DATABASE_QA') {
    selectedDatasource.value = null
  }
}

const clearMode = () => {
  selectedMode.value = null
  selectedDatasource.value = null
}

const bottomIcons = [
  // Define if needed, or remove if not used in new design
]
</script>

<template>
  <div class="default-page-container">
    <div class="content-wrapper">
      <!-- Title -->
      <div class="header-section">
        <div class="logo-wrapper">
          <h1 class="page-title">
            <span class="gradient-text">Aix</span>
          </h1>
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
          <div class="left-actions flex items-center">
            <!-- If mode is selected, show it as a pill -->
            <div
              v-if="selectedMode"
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
                v-if="selectedMode.value === 'DATABASE_QA' && selectedDatasource"
                class="font-medium ml-1"
              >
                | {{ selectedDatasource.name }}
              </span>
              <div
                class="i-hugeicons:cancel-01 text-14 ml-1 cursor-pointer opacity-60 hover:opacity-100"
                @click.stop="clearMode"
              ></div>
            </div>

            <!-- If NO mode selected, show chips row inside -->
            <div
              v-else
              class="flex items-center gap-2"
            >
              <template v-for="chip in chips" :key="chip.label">
                <n-popover
                  v-if="chip.value === 'DATABASE_QA'"
                  trigger="click"
                  v-model:show="showDatasourcePopover"
                  placement="bottom"
                  :show-arrow="false"
                  class="!p-0"
                  style="padding: 0;"
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
              :class="{ disabled: !inputValue && !pendingUploadFileInfoList.length }"
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
.default-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
  position: relative;
  top: -40px; /* Visual optical adjustment to move slightly up */
}

.header-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.page-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.04em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.gradient-text {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); /* Electric Indigo -> Violet -> Pink */
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 40px rgb(124 58 237 / 15%)); /* Soft glow */
}

/* Input Card Styles matching chat.vue */

.input-card {
  width: 100%;
  max-width: 890px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgb(0 0 0 / 8%);
  border: 1px solid #f1f5f9;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 20px 50px -12px rgb(0 0 0 / 12%);
    border-color: #e2e8f0;
    transform: translateY(-2px);
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
  font-size: 16px;
  font-weight: 400;
  line-height: 1.625;
  letter-spacing: 0;
  padding: 0;
  flex: 1;

  :deep(.n-input__textarea-el) {
    padding: 0;
    min-height: 80px;
    line-height: 1.625;
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
  }

  :deep(.n-input__placeholder) {
    color: #94a3b8;
  }
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.mode-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  transition: all 0.2s;
  cursor: default;
}

.inner-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f8fafc;
  border: 1px solid transparent;

  &:hover, &.active-chip {
    background-color: #f1f5f9;
    color: #334155;
    border-color: #e2e8f0;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

.action-icon {
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

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
</style>
