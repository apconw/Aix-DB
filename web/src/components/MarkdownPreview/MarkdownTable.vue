***REMOVED***
    <div style="background-color: #ffffff">
        <n-card
            title="表格"
            embedded
            bordered
            :content-style="{ 'background-color': '#ffffff' ***REMOVED***"
            :header-style="{
                color: '#666',
                height: '10px',
                'background-color': '#f0effe',
                'text-align': 'left',
                'font-size': '14px',
                'font-family': 'PMingLiU'
            ***REMOVED***"
            :footer-style="{
                color: '#666',
                'background-color': '#ffffff',
                'text-align': 'left',
                'font-size': '14px',
                'font-family': 'PMingLiU'
            ***REMOVED***"
        >
            <div
                style="
                  ***REMOVED***
                    justify-content: space-between;
                    margin-bottom: 10`px;
                "
  ***REMOVED***</div>
            <n-data-table
                style="
                    height: 550px;
                  ***REMOVED***
                    background-color: #ffffff;
                  ***REMOVED***
                "
                :columns="columns"
                :data="pagedTableData"
                :pagination="pagination"
                :max-height="550"
                virtual-scroll
                virtual-scroll-x
                :scroll-x="scrollX"
                :min-row-height="minRowHeight"
                :height-for-row="heightForRow"
                virtual-scroll-header
                :header-height="48"
  ***REMOVED***
            <template #footer>
                数据来源: 大模型生成的数据, 以上信息仅供参考
            ***REMOVED***
        </n-card>
***REMOVED***
***REMOVED***

***REMOVED***
import { ref, computed, onMounted ***REMOVED*** from 'vue'
import type { DataTableColumns ***REMOVED*** from 'naive-ui'
import { useBusinessStore ***REMOVED*** from '@/store/business'

const businessStore = useBusinessStore(***REMOVED***
const tableData = ref(businessStore.writerList.data.data || []***REMOVED***
const currentPage = ref(1***REMOVED*** // 当前页
const pageSize = ref(5***REMOVED*** // 每页显示条目数

// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['tableRendered']***REMOVED***

// 分页设置
const pagination = computed((***REMOVED*** => ({
    page: currentPage.value,
    pageSize: pageSize.value,
    total: tableData.value.length, // 总条目数
    onPageChange: (page: number***REMOVED*** => {
        currentPage.value = page
    ***REMOVED***,
    onPageSizeChange: (size: number***REMOVED*** => {
        pageSize.value = size
    ***REMOVED***
***REMOVED******REMOVED******REMOVED***

// 计算 scrollX 的值
const scrollX = computed((***REMOVED*** => {
    if (tableData.value.length > 0***REMOVED*** {
        const keys = Object.keys(tableData.value[0]***REMOVED***
        const totalWidth = keys.length * 100 // 每列宽度100px
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
            key: key,
            width: 100,
            fixed:
                index <= 1
                    ? 'left'
                    : index > keys.length - 3
                    ? 'right'
                    : undefined,
            render(row: any***REMOVED*** {
                return row[key]
            ***REMOVED***
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
