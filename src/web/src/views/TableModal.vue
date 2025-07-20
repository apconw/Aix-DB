<script setup>
import * as GlobalAPI from '@/api'

const props = defineProps({
  show: Boolean,
***REMOVED******REMOVED***

const emit = defineEmits(['update:show', 'delete']***REMOVED***

const localShow = ref(props.show***REMOVED***
const tableData = ref([]***REMOVED***
const columns = ref([
***REMOVED***
    type: 'selection',
  ***REMOVED***,
***REMOVED***
    title: '用户问题',
    key: 'question',
    ellipsis: true,
  ***REMOVED***,
***REMOVED***
    title: '创建时间',
    key: 'create_time',
  ***REMOVED***,
]***REMOVED***
const loading = ref(false***REMOVED***
const checkedRowKeys = ref([]***REMOVED***

// 分页配置
const pagination = ref({
  page: 1,
  pageSize: 8,
  total: 0, // 总记录数
  pageCount: 0, // 总页数
  onChange: (page***REMOVED*** => handlePageChange(page***REMOVED***,
  onUpdatePageSize: (pageSize***REMOVED*** => handlePageSizeChange(pageSize***REMOVED***,
***REMOVED******REMOVED***

async function fetchData(***REMOVED*** {
***REMOVED***
***REMOVED***
    const res = await GlobalAPI.query_user_qa_record(
      pagination.value.page,
      pagination.value.pageSize,
    ***REMOVED***
    if (res.ok***REMOVED*** {
      const data = await res.json(***REMOVED***
      if (data && data.data***REMOVED*** {
        tableData.value = data.data.records || []
        pagination.value.total = data.data.total_count || 0
        pagination.value.pageCount = data.data.total_pages || 0
      ***REMOVED*** else {
        console.error('Unexpected data format:', data***REMOVED***
        tableData.value = []
        pagination.value.total = 0
        pagination.value.pageCount = 0
      ***REMOVED***
    ***REMOVED*** else {
      console.error('API request failed with status:', res.status***REMOVED***
      tableData.value = []
      pagination.value.total = 0
      pagination.value.pageCount = 0
    ***REMOVED***
  ***REMOVED*** catch (error***REMOVED*** {
    console.error('Error fetching data:', error***REMOVED***
    tableData.value = []
    pagination.value.total = 0
    pagination.value.pageCount = 0
  ***REMOVED*** finally {
***REMOVED***
  ***REMOVED***
***REMOVED***
function close(***REMOVED*** {
  localShow.value = false
  emit('update:show', false***REMOVED***
  pagination.value.page = 1
***REMOVED***

const rowKey = (row***REMOVED*** => row.id

function handleCheck(rowKeys***REMOVED*** {
  checkedRowKeys.value = rowKeys
***REMOVED***

async function deleteSelectedData(***REMOVED*** {
  if (checkedRowKeys.value.length === 0***REMOVED*** {
    return
  ***REMOVED***
  const res = await GlobalAPI.delete_user_record(checkedRowKeys.value***REMOVED***
  if (res.ok***REMOVED*** {
    fetchData(***REMOVED***
  ***REMOVED***
***REMOVED***

function handlePageChange(page***REMOVED*** {
  pagination.value.page = page
  fetchData(***REMOVED***
***REMOVED***

function handlePageSizeChange(newPageSize***REMOVED*** {
  pagination.value.pageSize = newPageSize
  pagination.value.page = 1 // 重置到第一页
  fetchData(***REMOVED***
***REMOVED***

const modalTitle = computed(
  (***REMOVED*** => `管理对话记录 · 共${pagination.value.total***REMOVED***条`,
***REMOVED***

watch(
  (***REMOVED*** => props.show,
  (newVal***REMOVED*** => {
    if (newVal !== localShow.value***REMOVED*** {
      localShow.value = newVal
      if (newVal***REMOVED*** {
        fetchData(***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED***

const tableRef = useTemplateRef('tableRef'***REMOVED***
***REMOVED***

***REMOVED***
  <n-modal
    v-model:show="localShow"
    :mask-closable="false"
    :on-after-leave="close"
    preset="card"
    :title="modalTitle"
    class="w-900 h-600 flex flex-col"
  >
    <div
      class="modal-content"
      style="flex: 1; display: flex; flex-direction: column"
    >
      <n-spin :show="loading" style="flex: 1; overflow: auto">
        <n-data-table
          ref="tableRef"
          :data="tableData"
          :columns="columns"
          :row-key="rowKey"
          :checked-row-keys="checkedRowKeys"
          style="height: 100%; width: 100%"
          @update:checked-row-keys="handleCheck"
        >
          <template #bodyCell="{ column, row ***REMOVED***">
            <td :key="column.key">{{ row[column.key] ***REMOVED******REMOVED***</td>
          ***REMOVED***
        </n-data-table>
      </n-spin>
      <div
        class="footer"
        style="
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: var(--n-modal-footer-bg***REMOVED***;
border-top: 1px solid var(--n-modal-border-color***REMOVED***;
                "
      >
        <n-pagination
          v-model:page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-count="pagination.pageCount"
          :page-size="pagination.pageSize"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
        <div>
          <n-button style="margin-right: 10px" @click="close">
            取消
          </n-button>
          <n-button
            type="error"
            :disabled="checkedRowKeys.length === 0"
            @click="deleteSelectedData"
***REMOVED***
            删除所选
          </n-button>
***REMOVED***
***REMOVED***
***REMOVED***
  </n-modal>
***REMOVED***

***REMOVED***
.modal-content {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

.footer {
***REMOVED***
  gap: 10px;
***REMOVED***
***REMOVED***
  background-color: var(--n-modal-footer-bg***REMOVED***;
  border-top: 1px solid var(--n-modal-border-color***REMOVED***;
  justify-content: flex-end;
***REMOVED***

/* 确保分页组件在新的一行 */

.n-pagination {
***REMOVED***
***REMOVED***
***REMOVED***
