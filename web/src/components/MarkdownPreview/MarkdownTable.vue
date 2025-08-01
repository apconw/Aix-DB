***REMOVED***
import type { DataTableColumns ***REMOVED*** from 'naive-ui'
import { useBusinessStore ***REMOVED*** from '@/store/business'

// 每页显示条目数

// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['tableRendered']***REMOVED***
const businessStore = useBusinessStore(***REMOVED***
const tableData = ref(businessStore.writerList.data.data || []***REMOVED***
const currentPage = ref(1***REMOVED*** // 当前页
const pageSize = ref(5***REMOVED***// 分页设置
const pagination = computed((***REMOVED*** => ({
  page: currentPage.value,
  pageSize: pageSize.value,
  total: tableData.value.length, // 总条目数
  onPageChange: (page: number***REMOVED*** => {
    currentPage.value = page
  ***REMOVED***,
  onPageSizeChange: (size: number***REMOVED*** => {
    pageSize.value = size
  ***REMOVED***,
***REMOVED******REMOVED******REMOVED***

// 计算 scrollX 的值
const scrollX = computed((***REMOVED*** => {
  if (tableData.value.length > 0***REMOVED*** {
    const keys = Object.keys(tableData.value[0]***REMOVED***
    const totalWidth = keys.length * 120 // 每列宽度120px
    return totalWidth
  ***REMOVED***
  return 0
***REMOVED******REMOVED***

const minRowHeight = 48
const heightForRow = (***REMOVED*** => 48

// 动态生成表格列定义
const columns = computed<DataTableColumns>((***REMOVED*** => {
  if (tableData.value.length > 0***REMOVED*** {
    const keys = Object.keys(tableData.value[0]***REMOVED***
    return keys.map((key, index***REMOVED*** => ({
      title: key,
      key,
      width: 120, // 每列宽度调整为 120px
      // 固定前三个列
      fixed: index < 3 ? 'left' : undefined,
      render(row: any***REMOVED*** {
        return row[key]
      ***REMOVED***,
    ***REMOVED******REMOVED******REMOVED***
  ***REMOVED***
  return []
***REMOVED******REMOVED***

// 根据当前页和每页大小计算分页数据
const pagedTableData = computed((***REMOVED*** => {
  const start = (currentPage.value - 1***REMOVED*** * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end***REMOVED***
***REMOVED******REMOVED***

onMounted((***REMOVED*** => {
  emit('tableRendered'***REMOVED*** // 触发父组件事件通知已渲染完毕
  businessStore.clearWriterList(***REMOVED***
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <div style="background-color: #fff">
    <n-card
      title="表格"
      embedded
      bordered
      :content-style="{ 'background-color': '#ffffff' ***REMOVED***"
      :header-style="{
        'color': '#26244c',
        'height': '10px',
        'background-color': '#f0effe',
        'text-align': 'left',
        'font-size': '14px',
        'font-family': 'PMingLiU',
      ***REMOVED***"
      :footer-style="{
        'color': '#666',
        'background-color': '#ffffff',
        'text-align': 'left',
        'font-size': '14px',
        'font-family': 'PMingLiU',
      ***REMOVED***"
    >
      <div
        flex="~ space-between"
        mb-10
      ></div>
      <n-data-table
        :style="{
          // 调整高度
          'height': `auto`, 
          'width': `98%`,
          'margin': `0 5px`,
          'background-color': `#fff`,
          // 确保横向滚动条在需要时显示
          'overflow-x': 'auto' 
        ***REMOVED***"
        :columns="columns"
        :data="pagedTableData"
        :pagination="pagination"
        :scroll-x="scrollX" 
        :min-row-height="minRowHeight"
        :height-for-row="heightForRow"
        :header-height="48"
      />
      <template #footer>
        数据来源: 大模型生成的数据, 以上信息仅供参考
      ***REMOVED***
    </n-card>
  </div>
***REMOVED***
