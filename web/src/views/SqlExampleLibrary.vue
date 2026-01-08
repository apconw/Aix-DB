<script lang="ts" setup>
import { onMounted, ref, reactive, h, resolveComponent } from 'vue'
import { trainingApi } from '@/api/training'
import { useMessage, useDialog, NButton, NSwitch, NSpace, FormInst, NTooltip } from 'naive-ui'
import { fetch_datasource_list } from '@/api/datasource'
import { formatSQL } from '@/utils/sqlFormatter'

const message = useMessage()
const dialog = useDialog()

interface DataTrainingItem {
  id: number
  question: string
  description: string
  datasource: number
  datasource_name: string
  advanced_application: number
  advanced_application_name: string
  enabled: boolean
  create_time: string
}

const loading = ref(false)
const list = ref<DataTrainingItem[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const searchQuestion = ref('')

const showModal = ref(false)
const modalLoading = ref(false)
const modalType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInst | null>(null)
const formModel = reactive({
  id: undefined as number | undefined,
  question: '',
  description: '',
  datasource: null as number | null,
  advanced_application: null as number | null,
  enabled: true
})

const datasourceList = ref<any[]>([])

const rules = {
  question: {
    required: true,
    message: '请输入问题描述',
    trigger: ['input', 'blur']
  },
  description: {
    required: true,
    message: '请输入示例SQL',
    trigger: ['input', 'blur']
  }
}

const columns = [
  {
    title: '问题描述',
    key: 'question',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '示例SQL',
    key: 'description',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '数据源',
    key: 'datasource_name',
    width: 150,
    render(row: DataTrainingItem) {
        return row.datasource_name || '全部数据源'
    }
  },
  {
    title: '高级应用',
    key: 'advanced_application_name',
    width: 150
  },
  {
    title: '状态',
    key: 'enabled',
    width: 100,
    render(row: DataTrainingItem) {
      return h(
        NSwitch,
        {
          value: row.enabled,
          onUpdateValue: (value: boolean) => handleStatusChange(row, value)
        }
      )
    }
  },
  {
    title: '创建时间',
    key: 'create_time',
    width: 180
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render(row: DataTrainingItem) {
      return h(
        NSpace,
        {},
        {
            default: () => [
                h(
                    NButton,
                    {
                    size: 'small',
                    type: 'primary',
                    secondary: true,
                    onClick: () => handleEdit(row)
                    },
                    { default: () => '编辑' }
                ),
                h(
                    NButton,
                    {
                    size: 'small',
                    type: 'error',
                    secondary: true,
                    onClick: () => handleDelete(row)
                    },
                    { default: () => '删除' }
                )
            ]
        }
      )
    }
  }
]

// Data fetching
const fetchData = async () => {
  loading.value = true
  try {
    const res = await trainingApi.getList(page.value, pageSize.value, {
      question: searchQuestion.value
    })
    const result = await res.json()
    if (result.code === 200) {
      list.value = result.data.records
      total.value = result.data.total_count
    } else {
      message.error(result.msg || '获取数据失败')
    }
  } catch (error) {
    console.error(error)
    message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const fetchDatasources = async () => {
    try {
        const res = await fetch_datasource_list()
        const result = await res.json()
        if (result.code === 200) {
            datasourceList.value = result.data.map((ds: any) => ({
                label: ds.name,
                value: ds.id
            }))
        }
    } catch (e) {
        console.error(e)
    }
}

const handlePageChange = (p: number) => {
  page.value = p
  fetchData()
}

const handleSearch = () => {
  page.value = 1
  fetchData()
}

// Status Change
const handleStatusChange = async (row: DataTrainingItem, value: boolean) => {
  try {
    const res = await trainingApi.enable(row.id, value)
    const result = await res.json()
    if (result.code === 200) {
        row.enabled = value
        message.success('状态更新成功')
    } else {
        message.error(result.msg || '状态更新失败')
    }
  } catch (error) {
    message.error('状态更新失败')
  }
}

// Edit/Add
const handleAdd = () => {
  modalType.value = 'add'
  formModel.id = undefined
  formModel.question = ''
  formModel.description = ''
  formModel.datasource = null
  formModel.advanced_application = null
  formModel.enabled = true
  showModal.value = true
}

const handleEdit = (row: DataTrainingItem) => {
  modalType.value = 'edit'
  formModel.id = row.id
  formModel.question = row.question
  formModel.description = row.description
  formModel.datasource = row.datasource
  formModel.advanced_application = row.advanced_application
  formModel.enabled = row.enabled
  showModal.value = true
}

const handleSave = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      modalLoading.value = true
      try {
        const res = await trainingApi.updateEmbedded(formModel)
        const result = await res.json()
        if (result.code === 200) {
             message.success('保存成功')
             showModal.value = false
             fetchData()
        } else {
             message.error(result.msg || '保存失败')
        }
      } catch (error) {
        message.error('保存失败')
      } finally {
        modalLoading.value = false
      }
    }
  })
}

const handleFormatSQL = () => {
  if (formModel.description) {
    formModel.description = formatSQL(formModel.description)
    message.success('格式化完成')
  }
}

// Delete
const handleDelete = (row: DataTrainingItem) => {
  dialog.warning({
    title: '警告',
    content: '确定要删除这条记录吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const res = await trainingApi.deleteEmbedded({ ids: [row.id] })
        const result = await res.json()
        if (result.code === 200) {
            message.success('删除成功')
            fetchData()
        } else {
            message.error(result.msg || '删除失败')
        }
      } catch (error) {
        message.error('删除失败')
      }
    }
  })
}

onMounted(() => {
  fetchData()
  fetchDatasources()
})
</script>

<template>
  <div class="sql-example-library">
    <div class="header">
      <div class="title-section">
        <div class="i-carbon-code text-24 text-primary mr-2"></div>
        <h2>SQL 示例库</h2>
      </div>
      <div class="actions">
        <n-input
          v-model:value="searchQuestion"
          placeholder="搜索问题描述..."
          clearable
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <div class="i-carbon-search text-gray-400"></div>
          </template>
        </n-input>
        <n-button secondary @click="handleSearch">
          <template #icon>
            <div class="i-carbon-search"></div>
          </template>
          搜索
        </n-button>
        <n-button type="primary" @click="handleAdd">
          <template #icon>
            <div class="i-carbon-add"></div>
          </template>
          新增
        </n-button>
      </div>
    </div>

    <div class="content">
      <n-data-table
        :columns="columns"
        :data="list"
        :loading="loading"
        :pagination="false"
        class="data-table"
        flex-height
      />
      <div v-if="total > 0" class="pagination-container">
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="total"
          show-size-picker
          :page-sizes="[10, 20, 50]"
          @update:page="handlePageChange"
          @update:page-size="(s) => { pageSize = s; page = 1; fetchData() }"
        />
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="modalType === 'add' ? '新增 SQL 示例' : '编辑 SQL 示例'"
      style="width: 600px"
    >
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-placement="left"
        label-width="100"
        require-mark-placement="right-hanging"
        class="mt-4"
      >
        <n-form-item label="问题描述" path="question">
          <n-input v-model:value="formModel.question" placeholder="请输入问题描述" />
        </n-form-item>
        <n-form-item label="示例SQL" path="description">
          <div class="relative w-full">
            <n-input
              v-model:value="formModel.description"
              type="textarea"
              placeholder="请输入示例SQL"
              :autosize="{ minRows: 5, maxRows: 10 }"
            />
            <div class="absolute top-2 right-2 z-10">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button size="tiny" secondary circle @click="handleFormatSQL">
                    <template #icon>
                      <div class="i-carbon-clean"></div>
                    </template>
                  </n-button>
                </template>
                格式化 SQL
              </n-tooltip>
            </div>
          </div>
        </n-form-item>
        <n-form-item label="数据源" path="datasource">
           <n-select
                v-model:value="formModel.datasource"
                filterable
                clearable
                placeholder="请选择数据源（留空则为通用）"
                :options="datasourceList"
            />
        </n-form-item>
        <!-- 高级应用暂未实现获取列表，保留输入框或暂时隐藏，这里先隐藏或者使用InputNumber -->
        <!--
        <n-form-item label="高级应用ID" path="advanced_application">
           <n-input-number v-model:value="formModel.advanced_application" placeholder="请输入高级应用ID" class="w-full" />
        </n-form-item>
        -->
        <n-form-item label="是否启用" path="enabled">
          <n-switch v-model:value="formModel.enabled" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" :loading="modalLoading" @click="handleSave">保存</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>
.sql-example-library {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #f3f4f6;

    .title-section {
      display: flex;
      align-items: center;

      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 12px;

      .search-input {
        width: 260px;
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px 24px;

    .data-table {
      flex: 1;
    }

    .pagination-container {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
