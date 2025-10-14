<script lang="ts" setup>
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { useBusinessStore } from '@/store/business'

// 定义 emit
const emit = defineEmits<{
  (e: 'tableRendered'): void
}>()

// 使用 store
const businessStore = useBusinessStore()

// 响应式数据：从 store 获取表格数据
const tableData = ref<RowData[]>(
  businessStore.writerList.data?.data || [],
)

// 类型定义
interface RowData {
  [key: string]: any // 动态字段支持，如 name, age, address 等
  key?: DataTableRowKey
}

// 动态生成列（响应式）
const columns = computed<DataTableColumns<RowData>>(() => {
  const firstRow = tableData.value[0]
  if (!firstRow) {
    return []
  }

  return Object.keys(firstRow).map((key) => ({
    title: key,
    key,
    width: 120,
    minWidth: 80,
    maxWidth: 200,
    render(row: RowData) {
      const value = row[key] ?? ''
      // 将过长的文本内容用省略号显示
      return h('div', {
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        title: value, // 鼠标悬停时显示完整内容
      }, String(value))
    },
  }))
})

// 使用 computed 保持数据响应性
const data = computed(() => tableData.value)

// 分页配置
const pagination = ref({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page: number) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  },
})

// 组件挂载后触发事件并可选清空 store
onMounted(() => {
  emit('tableRendered')
  // 可按需保留或清除
  businessStore.clearWriterList()
})
</script>

<template>
  <div class="table-container">
    <!-- <n-card
      title="表格"
      embedded
      bordered
      :content-style="{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%)' }"
      :header-style="{
        'color': '#fff',
        'height': '50px',
        'background': 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        'text-align': 'left',
        'font-size': '18px',
        'font-weight': 'bold',
        'border-radius': '8px 8px 0 0',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }"
      :footer-style="{
        'color': '#5d5d5d',
        'background': 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 100%)',
        'text-align': 'left',
        'font-size': '14px',
        'font-style': 'italic',
        'border-radius': '0 0 8px 8px',
        'padding': '10px',
      }"
    ></n-card> -->
    <div flex="~ space-between" mb-10></div>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :striped="true"
      :single-line="false"
      size="small"
      :rowClassName="(row, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')"
      :style="{ textAlign: 'left' }"
    />
    <!-- <template #footer>
      数据来源: 大模型生成的数据, 以上信息仅供参考
    </template> -->
  </div>
</template>

<style scoped>
.table-container {
  background: linear-gradient(135deg, #f0f2f5 0%, #e6e9f0 100%);
  padding: 10px;
  border-radius: 0;
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);
}

:deep(.n-data-table .even-row) {
  background-color: rgb(248 249 254 / 80%) !important;
  transition: background-color 0.3s ease;
}

:deep(.n-data-table .odd-row) {
  background-color: rgb(255 255 255 / 80%) !important;
  transition: background-color 0.3s ease;
}

:deep(.n-data-table .even-row:hover),
:deep(.n-data-table .odd-row:hover) {
  background-color: #e0e7ff !important;
  transform: scale(1.01);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

:deep(.n-data-table th) {
  background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%) !important;
  color: white !important;
  font-weight: bold !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(.n-data-table td) {
  color: #333 !important;
  border-bottom: 1px solid #e5e7eb !important;
}

:deep(.n-pagination) {
  margin-top: 20px;
}

/* 表格内容靠左对齐 */

:deep(.n-data-table) {
  text-align: left;
}
</style>
