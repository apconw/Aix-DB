<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem, NButton, NDataTable, NGrid, NGridItem, NIcon, NInput, NLayout, NLayoutContent, NLayoutSider, NMessageProvider, NModal, NSpin, NSwitch, NTable, NTabPane, NTabs, NTag, NTooltip, useMessage } from 'naive-ui'
import { computed, h, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetch_datasource_detail, fetch_datasource_field_list, fetch_datasource_preview_data, fetch_datasource_table_list, save_datasource_field, save_datasource_table } from '@/api/datasource'
import TableRelationship from './table-relationship.vue'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const dsId = ref<number>(Number.parseInt(route.params.dsId as string))
const dsName = ref<string>(decodeURIComponent(route.params.dsName as string))

const loading = ref(false)
const initLoading = ref(false)
const searchValue = ref('')
const tableList = ref<any[]>([])
const currentTable = ref<any>({})
const fieldList = ref<any[]>([])
const previewData = ref<any>({ data: [], fields: [] })
const activeName = ref('schema')
const tableDialog = ref(false)
const fieldDialog = ref(false)
const mappingDialog = ref(false)
const tableComment = ref('')
const fieldComment = ref('')
const mappingValue = ref('')
const currentField = ref<any>({})
const activeRelationship = ref(false)
const relationshipRef = ref<any>(null)
const isDrag = ref(false)
const datasourceInfo = ref<any>({})

// 搜索过滤
const tableListWithSearch = computed(() => {
  if (!searchValue.value) {
    return tableList.value
  }
  return tableList.value.filter((item) => {
    const name = item.table_name || item.tableName || ''
    return name.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})

// Schema 表格列定义
const schemaColumns = [
  { title: '字段名', key: 'field_name', width: 180, fixed: 'left' },
  { title: '字段类型', key: 'field_type', width: 120 },
  {
    title: '字段注释',
    key: 'field_comment',
    width: 150,
    render(row: any) {
      return h(NTooltip, { trigger: 'hover' }, {
        trigger: () => h('span', { class: 'text-ellipsis' }, row.field_comment || row.fieldComment || '-'),
        default: () => row.field_comment || row.fieldComment || '-',
      })
    },
  },
  {
    title: '自定义注释',
    key: 'custom_comment',
    width: 200,
    render(row: any) {
      return h('div', { class: 'editable-cell' }, [
        h('span', { class: 'cell-value' }, row.custom_comment || '-'),
        h(NButton, {
          text: true,
          size: 'tiny',
          type: 'primary',
          class: 'edit-icon',
          onClick: () => editField(row),
        }, { default: () => h('div', { class: 'i-carbon-edit' }) }),
      ])
    },
  },
  {
    title: '数据映射',
    key: 'data_mapping',
    width: 200,
    render(row: any) {
      return h('div', { class: 'editable-cell' }, [
        h('span', { class: 'cell-value' }, row.data_mapping || '-'),
        h(NButton, {
          text: true,
          size: 'tiny',
          type: 'primary',
          class: 'edit-icon',
          onClick: () => editMapping(row),
        }, { default: () => h('div', { class: 'i-carbon-edit' }) }),
      ])
    },
  },
  {
    title: '状态',
    key: 'checked',
    width: 80,
    fixed: 'right',
    render(row: any) {
      return h(NSwitch, {
        value: row.checked,
        size: 'small',
        onUpdateValue: (val) => {
          row.checked = val
          changeStatus(row)
        },
      })
    },
  },
]

// 获取数据源详情
const fetchDatasourceInfo = async () => {
  try {
    const response = await fetch_datasource_detail(dsId.value)
    if (response.ok) {
      const result = await response.json()
      if (result.code === 200) {
        datasourceInfo.value = result.data || {}
      }
    }
  } catch (error) {
    console.error('获取数据源详情失败:', error)
  }
}

// 获取数据源表列表
const fetchTableList = async () => {
  initLoading.value = true
  try {
    const response = await fetch_datasource_table_list(dsId.value)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      tableList.value = result.data || []
    } else {
      message.error(result.msg || '获取表列表失败')
    }
  } catch (error) {
    console.error('获取表列表失败:', error)
    message.error('获取表列表失败')
  } finally {
    initLoading.value = false
  }
}

// 点击表
const clickTable = async (table: any) => {
  if (activeRelationship.value) {
    return
  }
  loading.value = true
  currentTable.value = table
  fieldList.value = []
  previewData.value = { data: [], fields: [] }

  try {
    // 获取字段列表
    const response = await fetch_datasource_field_list(table.id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      // 适配字段名
      fieldList.value = (result.data || []).map((item: any) => ({
        ...item,
        field_name: item.field_name || item.fieldName,
        field_type: item.field_type || item.fieldType,
      }))

      // 获取预览数据
      await fetchPreviewData()
    } else {
      message.error(result.msg || '获取字段列表失败')
    }
  } catch (error) {
    console.error('获取字段列表失败:', error)
    message.error('获取字段列表失败')
  } finally {
    loading.value = false
  }
}

// 获取预览数据
const fetchPreviewData = async () => {
  try {
    const buildData = {
      table: currentTable.value,
      fields: fieldList.value,
    }

    const response = await fetch_datasource_preview_data(dsId.value, buildData)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      previewData.value = result.data || { data: [], fields: [] }
    }
  } catch (error) {
    console.error('获取预览数据失败:', error)
  }
}

// 编辑表注释
const editTable = () => {
  tableComment.value = currentTable.value.custom_comment || ''
  tableDialog.value = true
}

// 保存表注释
const saveTable = async () => {
  try {
    const response = await save_datasource_table({
      ...currentTable.value,
      custom_comment: tableComment.value,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      currentTable.value.custom_comment = tableComment.value
      tableDialog.value = false
      message.success('保存成功')
    } else {
      message.error(result.msg || '保存失败')
    }
  } catch (error) {
    console.error('保存表注释失败:', error)
    message.error('保存表注释失败')
  }
}

// 编辑字段注释
const editField = (row: any) => {
  currentField.value = row
  fieldComment.value = row.custom_comment || ''
  fieldDialog.value = true
}

// 保存字段注释
const saveField = async () => {
  try {
    const response = await save_datasource_field({
      ...currentField.value,
      custom_comment: fieldComment.value,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      const index = fieldList.value.findIndex((f) => f.id === currentField.value.id)
      if (index !== -1) {
        fieldList.value[index].custom_comment = fieldComment.value
      }
      fieldDialog.value = false
      message.success('保存成功')
    } else {
      message.error(result.msg || '保存失败')
    }
  } catch (error) {
    console.error('保存字段注释失败:', error)
    message.error('保存字段注释失败')
  }
}

// 编辑数据映射
const editMapping = (row: any) => {
  currentField.value = row
  mappingValue.value = row.data_mapping || ''
  mappingDialog.value = true
}

// 保存数据映射
const saveMapping = async () => {
  try {
    const response = await save_datasource_field({
      ...currentField.value,
      data_mapping: mappingValue.value,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      const index = fieldList.value.findIndex((f) => f.id === currentField.value.id)
      if (index !== -1) {
        fieldList.value[index].data_mapping = mappingValue.value
      }
      mappingDialog.value = false
      message.success('保存成功')
    } else {
      message.error(result.msg || '保存失败')
    }
  } catch (error) {
    console.error('保存数据映射失败:', error)
    message.error('保存数据映射失败')
  }
}

// 切换字段状态
const changeStatus = async (row: any) => {
  try {
    const response = await save_datasource_field(row)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      message.success('保存成功')
    } else {
      message.error(result.msg || '保存失败')
    }
  } catch (error) {
    console.error('保存字段状态失败:', error)
    message.error('保存字段状态失败')
  }
}

// 切换标签页
const handleTabChange = (name: string) => {
  if (name === 'preview' && previewData.value.data.length === 0) {
    fetchPreviewData()
  }
}

// 返回
const back = () => {
  router.back()
}

// 切换表关系维护
const handleRelationship = async () => {
  activeRelationship.value = !activeRelationship.value
  if (!activeRelationship.value) {
    currentTable.value = {}
    fieldList.value = []
  } else {
    await nextTick()
    if (relationshipRef.value?.loadRelation) {
      relationshipRef.value.loadRelation()
    }
  }
}

// 处理拖拽放置
const handleDrop = (e: DragEvent) => {
  const tableData = e.dataTransfer?.getData('table')
  if (tableData && relationshipRef.value) {
    try {
      const table = JSON.parse(tableData)
      relationshipRef.value.clickTable(table)
    } catch (error) {
      console.error('解析表数据失败:', error)
    }
  }
}

onMounted(() => {
  fetchDatasourceInfo()
  fetchTableList()
})
</script>

<template>
  <n-message-provider>
    <div class="table-list-layout">
      <n-layout
        has-sider
        style="height: 100vh"
      >
        <n-layout-sider
          :width="280"
          :collapsed-width="0"
          collapse-mode="width"
          bordered
          class="sidebar"
        >
          <div class="sidebar-header">
            <div class="header-top">
              <n-button
                text
                class="back-btn"
                @click="back"
              >
                <template #icon>
                  <div class="i-carbon-arrow-left"></div>
                </template>
                返回
              </n-button>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <div class="ds-name">
                    {{ dsName }}
                  </div>
                </template>
                <div class="ds-tooltip-info">
                  <div>主机: {{ datasourceInfo.host || '-' }}</div>
                  <div>数据库: {{ datasourceInfo.database || '-' }}</div>
                </div>
              </n-tooltip>
            </div>
          </div>

          <div class="search-area">
            <n-input
              v-model:value="searchValue"
              placeholder="搜索数据表..."
              clearable
              size="small"
            >
              <template #prefix>
                <div class="i-carbon-search text-gray-400"></div>
              </template>
            </n-input>
          </div>

          <div class="list-content">
            <n-spin :show="initLoading">
              <div
                v-if="tableListWithSearch.length > 0"
                class="table-list"
              >
                <div
                  v-for="item in tableListWithSearch"
                  :key="item.id"
                  class="list-item"
                  :class="{ active: currentTable.id === item.id && !activeRelationship }"
                  :draggable="activeRelationship"
                  @click="activeRelationship ? null : clickTable(item)"
                  @dragstart="(e) => { if (!e.dataTransfer) return; isDrag = true; e.dataTransfer.setData('table', JSON.stringify(item)) }"
                  @dragend="() => { isDrag = false }"
                >
                  <div class="item-icon">
                    <div class="i-carbon-data-table"></div>
                  </div>
                  <div class="item-info">
                    <span
                      class="table-name"
                      :title="item.table_name || item.tableName"
                    >{{ item.table_name || item.tableName || '-' }}</span>
                    <span
                      v-if="item.tableComment || item.custom_comment"
                      class="table-comment"
                    >{{ item.custom_comment || item.tableComment }}</span>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="empty-state"
              >
                <n-empty description="暂无数据表" />
              </div>
            </n-spin>
          </div>

          <div class="sidebar-footer">
            <n-button
              block
              secondary
              :type="activeRelationship ? 'primary' : 'default'"
              @click="handleRelationship"
            >
              <template #icon>
                <div class="i-carbon-ibm-data-product-exchange"></div>
              </template>
              {{ activeRelationship ? '返回列表' : '表关系管理' }}
            </n-button>
          </div>
        </n-layout-sider>

        <n-layout-content class="main-content">
          <div
            v-if="activeRelationship"
            class="relationship-content"
            @drop.prevent="handleDrop"
            @dragover.prevent
          >
            <TableRelationship
              ref="relationshipRef"
              :ds-id="dsId"
              :dragging="isDrag"
            />
          </div>

          <div
            v-else-if="currentTable.table_name"
            class="table-detail"
          >
            <div class="detail-header">
              <div class="title-row">
                <h2 class="table-title">
                  {{ currentTable.table_name }}
                </h2>
                <n-tag
                  size="small"
                  type="info"
                  :bordered="false"
                >
                  TABLE
                </n-tag>
              </div>
              <div class="desc-row">
                <span class="label">备注:</span>
                <span class="value">{{ currentTable.custom_comment || '暂无备注' }}</span>
                <n-button
                  text
                  size="small"
                  type="primary"
                  class="edit-btn"
                  @click="editTable"
                >
                  <template #icon>
                    <div class="i-carbon-edit"></div>
                  </template>
                  编辑
                </n-button>
              </div>
            </div>

            <div class="detail-body">
              <n-tabs
                v-model:value="activeName"
                type="line"
                animated
                @update:value="handleTabChange"
              >
                <n-tab-pane
                  name="schema"
                  tab="表结构"
                >
                  <div class="table-wrapper">
                    <n-data-table
                      :columns="schemaColumns"
                      :data="fieldList"
                      :loading="loading"
                      :bordered="false"
                      flex-height
                      :style="{ height: '100%' }"
                      :scroll-x="1000"
                    />
                  </div>
                </n-tab-pane>
                <n-tab-pane
                  name="preview"
                  tab="数据预览"
                >
                  <div class="preview-wrapper">
                    <div class="preview-header">
                      显示前 100 条数据
                    </div>
                    <n-data-table
                      v-if="previewData.data.length > 0"
                      :columns="previewData.fields.map((field: any) => ({ title: field, key: field, width: 150, ellipsis: { tooltip: true } }))"
                      :data="previewData.data"
                      :bordered="false"
                      flex-height
                      :style="{ height: '100%' }"
                      :scroll-x="previewData.fields.length * 150"
                    />
                    <n-empty
                      v-else
                      description="暂无预览数据"
                      class="empty-preview"
                    />
                  </div>
                </n-tab-pane>
              </n-tabs>
            </div>
          </div>

          <div
            v-else
            class="empty-content"
          >
            <n-empty
              description="请选择左侧数据表查看详情"
              size="large"
            />
          </div>
        </n-layout-content>
      </n-layout>
    </div>

    <!-- 表注释对话框 -->
    <n-modal
      v-model:show="tableDialog"
      preset="dialog"
      title="编辑表注释"
      positive-text="保存"
      negative-text="取消"
      @positive-click="saveTable"
    >
      <n-input
        v-model:value="tableComment"
        type="textarea"
        placeholder="请输入表注释"
        :rows="3"
      />
    </n-modal>

    <!-- 字段注释对话框 -->
    <n-modal
      v-model:show="fieldDialog"
      preset="dialog"
      title="编辑字段注释"
      positive-text="保存"
      negative-text="取消"
      @positive-click="saveField"
    >
      <n-input
        v-model:value="fieldComment"
        type="textarea"
        placeholder="请输入字段注释"
        :rows="3"
      />
    </n-modal>

    <!-- 数据映射对话框 -->
    <n-modal
      v-model:show="mappingDialog"
      preset="dialog"
      title="编辑数据映射"
      positive-text="保存"
      negative-text="取消"
      @positive-click="saveMapping"
    >
      <n-input
        v-model:value="mappingValue"
        type="textarea"
        placeholder="请输入数据映射规则，例如：0=未知,1=男,2=女"
        :rows="3"
      />
      <div class="mapping-hint">
        格式参考：原始值=映射值，多个映射用逗号分隔
      </div>
    </n-modal>
  </n-message-provider>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.table-list-layout {
  height: 100vh;
  background-color: #f9fafb;
}

.sidebar {
  background-color: #fff;
  display: flex;
  flex-direction: column;

  :deep(.n-layout-sider-scroll-container) {
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    padding: 16px;
    border-bottom: 1px solid #f3f4f6;
    background: #fff;
    flex-shrink: 0;

    .header-top {
      display: flex;
      align-items: center;

      .back-btn {
        margin-right: 8px;
        color: #6b7280;

        &:hover {
          color: #111827;
        }
      }

      .ds-name {
        font-size: $font-size-md;
        font-weight: $font-weight-semibold;
        line-height: $line-height-normal;
        letter-spacing: $letter-spacing-tight;
        color: $heading-color;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
        cursor: pointer;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }

  .search-area {
    padding: 12px 16px;
    background: #fff;
    flex-shrink: 0;
  }

  .list-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 8px 16px;

    .list-item {
      display: flex;
      align-items: flex-start;
      padding: 10px 12px;
      cursor: pointer;
      border-radius: 6px;
      margin-bottom: 2px;
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      line-height: $line-height-base;
      letter-spacing: $letter-spacing-normal;
      color: $text-color-primary;
      transition: all 0.2s;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      .item-icon {
        margin-right: 10px;
        color: #9ca3af;
        display: flex;
        align-items: center;
        margin-top: 3px;
      }

      .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .table-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: $line-height-normal;
          font-weight: $font-weight-medium;
        }

        .table-comment {
          font-size: $font-size-sm;
          font-weight: $font-weight-normal;
          line-height: $line-height-sm;
          letter-spacing: $letter-spacing-normal;
          color: $text-color-tertiary;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }
      }

      &:hover {
        background-color: #f3f4f6;
        color: #111827;

        .item-icon {
          color: #4b5563;
        }
      }

      &.active {
        background-color: #eff6ff;
        color: #2563eb;
        font-weight: 500;

        .item-icon {
          color: #2563eb;
        }
      }
    }
  }

  .sidebar-footer {
    padding: 20px;
    margin-bottom: 10px;
    border-top: 1px solid #fff;
    background: #fff;
    display: flex;
    justify-content: center;
  }
}

.main-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.relationship-content {
  height: 100%;
  padding: 16px;
  background-color: #f9fafb;
}

.table-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .detail-header {
    padding: 24px 32px;
    border-bottom: 1px solid #f3f4f6;
    flex-shrink: 0;

    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .table-title {
        @include h2-style;
        margin: 0;
        color: $heading-color;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    .desc-row {
      display: flex;
      align-items: center;
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      line-height: $line-height-base;
      letter-spacing: $letter-spacing-normal;
      color: $text-color-secondary;

      .label {
        margin-right: 8px;
      }

      .value {
        color: #374151;
        margin-right: 16px;
      }

      .edit-btn {
        padding: 0 4px;
      }
    }
  }

  .detail-body {
    flex: 1;
    padding: 0 32px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    :deep(.n-tabs) {
      height: 100%;
      display: flex;
      flex-direction: column;

      .n-tabs-pane-wrapper {
        flex: 1;
        overflow: hidden;
      }

      .n-tab-pane {
        height: 100%;
        padding: 16px 0;
      }
    }
  }
}

.table-wrapper {
  height: 100%;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.preview-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  overflow: hidden;

  .preview-header {
    padding: 12px 16px;
    background: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    line-height: $line-height-sm;
    letter-spacing: $letter-spacing-wide;
    color: $text-color-secondary;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .empty-preview {
    margin: auto;
  }
}

.empty-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}

.editable-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .cell-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  }

  .edit-icon {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .edit-icon {
    opacity: 1;
  }
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mapping-hint {
  margin-top: 8px;
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  line-height: $line-height-sm;
  letter-spacing: $letter-spacing-normal;
  color: $text-color-tertiary;
}

.ds-tooltip-info {
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-normal;

  div {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
