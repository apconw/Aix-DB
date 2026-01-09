<script lang="ts" setup>
import { useDialog } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { delete_datasource, fetch_datasource_detail, fetch_datasource_list } from '@/api/datasource'
import DatasourceForm from '@/components/datasource/datasource-form.vue'

const dialog = useDialog()
const router = useRouter()

const loading = ref(false)
const datasourceList = ref<any[]>([])
const keywords = ref('')
const showForm = ref(false)
const currentDatasource = ref<any>(null)

// 获取数据源列表
const fetchDatasourceList = async () => {
  loading.value = true
  try {
    const response = await fetch_datasource_list()

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      datasourceList.value = result.data || []
    } else {
      window.$ModalMessage.error(result.msg || '获取数据源列表失败')
    }
  } catch (error) {
    console.error('获取数据源列表失败:', error)
    window.$ModalMessage.error('获取数据源列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索过滤
const filteredList = computed(() => {
  if (!keywords.value) {
    return datasourceList.value
  }
  return datasourceList.value.filter((item) =>
    item.name.toLowerCase().includes(keywords.value.toLowerCase()),
  )
})

// 添加数据源
const handleAdd = () => {
  currentDatasource.value = null
  showForm.value = true
}

// 编辑数据源
const handleEdit = async (item: any) => {
  try {
    // 获取完整的数据源信息
    const response = await fetch_datasource_detail(item.id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    if (result.code === 200) {
      currentDatasource.value = result.data
      showForm.value = true
    } else {
      window.$ModalMessage.error(result.msg || '获取数据源信息失败')
    }
  } catch (error) {
    console.error('获取数据源信息失败:', error)
    window.$ModalMessage.error('获取数据源信息失败')
  }
}

// 删除数据源
const handleDelete = (item: any) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除数据源"${item.name}"吗？此操作不可恢复。`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const response = await delete_datasource(item.id)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        if (result.code === 200) {
          window.$ModalMessage.success('删除成功')
          fetchDatasourceList()
        } else {
          window.$ModalMessage.error(result.msg || '删除失败')
        }
      } catch (error) {
        console.error('删除数据源失败:', error)
        window.$ModalMessage.error('删除数据源失败')
      }
    },
  })
}

// 表单保存成功回调
const handleFormSuccess = () => {
  fetchDatasourceList()
}

// 跳转到数据表页面
const handleViewTables = (item: any) => {
  router.push(`/datasource/table/${item.id}/${encodeURIComponent(item.name)}`)
}

// 返回对话页面
const handleBack = () => {
  router.push({ name: 'ChatIndex' })
}

// 获取图标 (这里假设只有 mysql 图标，实际应根据 type 返回不同图标)
const getIcon = (type: string) => {
  // 可以根据 type 返回不同的图片路径
  // 目前代码中只看到了 mysql-icon.svg
  return new URL('@/assets/svg/mysql-icon.svg', import.meta.url).href
}

onMounted(() => {
  fetchDatasourceList()
})
</script>

<template>
  <div class="datasource-manager">
    <div class="header">
      <div class="title-section">
        <div
          class="back-btn"
          @click="handleBack"
        >
          <div class="i-hugeicons:arrow-left-01 text-24"></div>
        </div>
        <h2>数据源管理</h2>
        <!-- <p class="subtitle">
          管理您的数据库连接，支持 MySQL, PostgreSQL, Oracle 等多种数据源
        </p> -->
      </div>
      <div class="actions">
        <n-input
          v-model:value="keywords"
          placeholder="搜索数据源..."
          clearable
          class="search-input"
        >
          <template #prefix>
            <div class="i-carbon-search text-gray-400"></div>
          </template>
        </n-input>
        <n-button
          secondary
          @click="fetchDatasourceList"
        >
          <template #icon>
            <div class="i-carbon-renew"></div>
          </template>
          刷新
        </n-button>
        <n-button
          type="primary"
          @click="handleAdd"
        >
          <template #icon>
            <div class="i-carbon-add"></div>
          </template>
          新建数据源
        </n-button>
      </div>
    </div>

    <n-spin :show="loading">
      <div
        v-if="filteredList.length > 0"
        class="content"
      >
        <n-grid
          :x-gap="24"
          :y-gap="24"
          cols="1 600:2 900:3 1200:4"
        >
          <n-grid-item
            v-for="item in filteredList"
            :key="item.id"
          >
            <n-card
              hoverable
              class="datasource-card"
              :bordered="false"
              content-style="padding: 0;"
              @click="handleViewTables(item)"
            >
              <div class="card-body">
                <div class="card-top">
                  <div class="icon-wrapper">
                    <img
                      :src="getIcon(item.type)"
                      :alt="item.type"
                      class="datasource-icon"
                    >
                  </div>
                  <div class="info">
                    <h3 class="name">
                      {{ item.name }}
                    </h3>
                    <span class="type">{{ item.type_name || item.type }}</span>
                  </div>
                  <div class="status-badge">
                    <span
                      class="dot"
                      :class="item.status === 'Success' ? 'success' : 'failed'"
                    ></span>
                  </div>
                </div>

                <div class="card-desc">
                  {{ item.description || '暂无描述' }}
                </div>

                <div class="card-meta">
                  <div class="meta-item">
                    <span class="label">主机</span>
                    <span class="value">{{ item.host || '-' }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="label">数据库</span>
                    <span class="value">{{ item.database || '-' }}</span>
                  </div>
                </div>
              </div>

              <div class="card-actions">
                <div class="stats">
                  <span class="count">{{ item.num || 0 }}</span>
                  <span class="label">表</span>
                </div>
                <div class="buttons">
                  <n-button
                    text
                    size="small"
                    @click.stop="handleEdit(item)"
                  >
                    编辑
                  </n-button>
                  <n-divider vertical />
                  <n-button
                    text
                    type="error"
                    size="small"
                    @click.stop="handleDelete(item)"
                  >
                    删除
                  </n-button>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
      <div
        v-else
        class="empty-container"
      >
        <n-empty
          description="暂无数据源"
          size="large"
        >
          <template #extra>
            <n-button
              type="primary"
              @click="handleAdd"
            >
              新建数据源
            </n-button>
          </template>
        </n-empty>
      </div>
    </n-spin>

    <!-- 数据源表单对话框 -->
    <DatasourceForm
      v-model:show="showForm"
      :datasource="currentDatasource"
      @success="handleFormSuccess"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.datasource-manager {
  padding: 24px 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;

    .title-section {
      display: flex;
      align-items: center;
      gap: 12px;

      .back-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        color: #4b5563;

        &:hover {
          background-color: #f3f4f6;
          color: #111827;
        }
      }

      h2 {
        @include h2-style;
        margin: 0;
        color: $heading-color;
      }

      .subtitle {
        margin: 0;
        color: $text-color-secondary;
        font-size: $font-size-base;
        font-weight: $font-weight-normal;
        line-height: $line-height-base;
        letter-spacing: $letter-spacing-normal;
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
    overflow-y: auto;
    padding-bottom: 24px;
  }

  .empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    background: #fff;
    border-radius: 12px;
    border: 1px dashed #e5e7eb;
  }

  .datasource-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #f3f4f6;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -8px rgb(0 0 0 / 12%);
      border-color: transparent;
    }

    .card-body {
      padding: 20px;
    }

    .card-top {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;

      .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .datasource-icon {
          width: 28px;
          height: 28px;
        }
      }

      .info {
        flex: 1;
        min-width: 0;

        .name {
          margin: 0 0 4px;
          font-size: $font-size-md;
          font-weight: $font-weight-semibold;
          line-height: $line-height-normal;
          letter-spacing: $letter-spacing-tight;
          color: $heading-color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .type {
          font-size: $font-size-sm;
          font-weight: $font-weight-medium;
          line-height: $line-height-sm;
          letter-spacing: $letter-spacing-wide;
          color: $text-color-secondary;
          background: #f3f4f6;
          padding: 2px 8px;
          border-radius: 999px;
        }
      }

      .status-badge {

        .dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;

          &.success {
            background: #10b981;
            box-shadow: 0 0 0 4px rgb(16 185 129 / 10%);
          }

          &.failed {
            background: #ef4444;
            box-shadow: 0 0 0 4px rgb(239 68 68 / 10%);
          }
        }
      }
    }

    .card-desc {
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      line-height: $line-height-normal;
      letter-spacing: $letter-spacing-normal;
      color: $text-color-secondary;
      margin-bottom: 16px;
      height: 42px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;

      .meta-item {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #4b5563;

        .label {
          color: #9ca3af;
          width: 48px;
        }

        .value {
          @include code-style;
          background: #f9fafb;
          padding: 2px 6px;
          border-radius: 4px;
        }
      }
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: #f9fafb;
      border-top: 1px solid #f3f4f6;

      .stats {
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        line-height: $line-height-sm;
        letter-spacing: $letter-spacing-normal;
        color: $text-color-secondary;

        .count {
          font-weight: $font-weight-semibold;
          color: #111827;
          margin-right: 2px;
        }
      }

      .buttons {
        display: flex;
        align-items: center;
        opacity: 0.8;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
