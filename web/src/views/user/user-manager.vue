<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { NButton, NSpace, useDialog, useMessage } from 'naive-ui'
import { h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addUser, deleteUser, queryUserList, updateUser } from '@/api/user'

const router = useRouter()
const dialog = useDialog()
const message = useMessage()

// State
const loading = ref(false)
const userList = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const searchName = ref('')

const showModal = ref(false)
const modalType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInst | null>(null)
const formModel = reactive({
  id: 0,
  userName: '',
  mobile: '',
  password: '',
})

const rules = {
  userName: { required: true, message: '请输入用户名', trigger: 'blur' },
}

// Columns
const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '用户名', key: 'userName' },
  { title: '手机号', key: 'mobile' },
  { title: '创建时间', key: 'createTime' },
  { title: '修改时间', key: 'updateTime' },
  {
    title: '操作',
    key: 'actions',
    render(row: any) {
      return h(NSpace, {}, {
        default: () => [
          h(NButton, {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleEdit(row),
          }, { default: () => '编辑' }),
          h(NButton, {
            size: 'small',
            type: 'error',
            secondary: true,
            onClick: () => handleDelete(row),
          }, { default: () => '删除' }),
        ],
      })
    },
  },
]

// Methods
const fetchData = async () => {
  loading.value = true
  try {
    const res = await queryUserList(page.value, pageSize.value, searchName.value)
    const result = await res.json()
    if (result.code === 200) {
      userList.value = result.data.records
      total.value = result.data.total_count
    } else {
      message.error(result.msg || '查询失败')
    }
  } catch (e) {
    console.error(e)
    message.error('网络错误')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  page.value = 1
  fetchData()
}

const handlePageChange = (p: number) => {
  page.value = p
  fetchData()
}

const handleAdd = () => {
  modalType.value = 'add'
  formModel.id = 0
  formModel.userName = ''
  formModel.mobile = ''
  formModel.password = ''
  showModal.value = true
}

const handleEdit = (row: any) => {
  modalType.value = 'edit'
  formModel.id = row.id
  formModel.userName = row.userName
  formModel.mobile = row.mobile
  formModel.password = '' // Don't show password
  showModal.value = true
}

const handleDelete = (row: any) => {
  dialog.warning({
    title: '警告',
    content: `确定删除用户 ${row.userName} 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const res = await deleteUser(row.id)
        const result = await res.json()
        if (result.code === 200) {
          message.success('删除成功')
          fetchData()
        } else {
          message.error(result.msg || '删除失败')
        }
      } catch (e) {
        console.error(e)
        message.error('网络错误')
      }
    },
  })
}

const handleSave = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // Custom validation for password
      if (modalType.value === 'add' && !formModel.password) {
        message.error('请输入密码')
        return
      }

      try {
        let res
        if (modalType.value === 'add') {
          res = await addUser(formModel)
        } else {
          res = await updateUser(formModel)
        }
        const result = await res.json()
        if (result.code === 200) {
          message.success('保存成功')
          showModal.value = false
          fetchData()
        } else {
          message.error(result.msg || '保存失败')
        }
      } catch (e) {
        console.error(e)
        message.error('网络错误')
      }
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="user-manager">
    <div class="header">
      <div class="title-section">
        <div class="i-carbon-user-multiple text-24 text-primary mr-2"></div>
        <h2>用户管理</h2>
      </div>
      <div class="actions">
        <n-input
          v-model:value="searchName"
          placeholder="搜索用户名..."
          clearable
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <div class="i-carbon-search text-gray-400"></div>
          </template>
        </n-input>
        <n-button
          secondary
          @click="handleSearch"
        >
          <template #icon>
            <div class="i-carbon-search"></div>
          </template>
          搜索
        </n-button>
        <n-button
          type="primary"
          @click="handleAdd"
        >
          <template #icon>
            <div class="i-carbon-add"></div>
          </template>
          添加用户
        </n-button>
      </div>
    </div>

    <div class="content">
      <n-data-table
        :columns="columns"
        :data="userList"
        :loading="loading"
        :pagination="false"
        class="user-table"
      />
      <div
        v-if="total > 0"
        class="pagination-container"
      >
        <n-pagination
          v-model:page="page"
          :page-size="pageSize"
          :item-count="total"
          @update:page="handlePageChange"
        />
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="modalType === 'add' ? '添加用户' : '编辑用户'"
    >
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-placement="left"
        label-width="80"
        require-mark-placement="right-hanging"
        class="mt-4"
      >
        <n-form-item
          label="用户名"
          path="userName"
        >
          <n-input
            v-model:value="formModel.userName"
            placeholder="请输入用户名"
          />
        </n-form-item>
        <n-form-item
          label="手机号"
          path="mobile"
        >
          <n-input
            v-model:value="formModel.mobile"
            placeholder="请输入手机号"
          />
        </n-form-item>
        <n-form-item
          label="密码"
          path="password"
        >
          <n-input
            v-model:value="formModel.password"
            type="password"
            show-password-on="click"
            :placeholder="modalType === 'add' ? '请输入密码' : '留空则不修改'"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showModal = false">
            取消
          </n-button>
          <n-button
            type="primary"
            @click="handleSave"
          >
            保存
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.user-manager {
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
        @include h3-style;
        margin: 0;
        color: $heading-color;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

    .user-table {
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
