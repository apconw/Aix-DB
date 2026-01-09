<script lang="ts" setup>
import { useDialog } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { delete_model, fetch_model_list, set_default_model } from '@/api/aimodel'
import LLMForm from '@/components/llm/llm-form.vue'

const dialog = useDialog()
const router = useRouter()

const loading = ref(false)
const modelList = ref<any[]>([])
const keywords = ref('')
const showForm = ref(false)
const currentModelId = ref<number | null>(null)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await fetch_model_list(keywords.value)
    if (res.data) {
      modelList.value = res.data
    } else if (Array.isArray(res)) {
      modelList.value = res
    }
  } catch (e) {
    window.$ModalMessage.error('获取模型列表失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  currentModelId.value = null
  showForm.value = true
}

const handleEdit = (item: any) => {
  currentModelId.value = item.id
  showForm.value = true
}

const handleDelete = (item: any) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除模型 "${item.name}" 吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await delete_model(item.id)
        window.$ModalMessage.success('删除成功')
        fetchData()
      } catch (e) {
        window.$ModalMessage.error('删除失败')
      }
    },
  })
}

const handleSetDefault = async (item: any) => {
  try {
    await set_default_model(item.id)
    window.$ModalMessage.success('设置成功')
    fetchData()
  } catch (e) {
    window.$ModalMessage.error('设置失败')
  }
}

const handleSuccess = () => {
  fetchData()
}

const handleBack = () => {
  router.push('/')
}

const getSupplierName = (supplier: number) => {
  const map: Record<number, string> = {
    1: 'OpenAI',
    2: 'Azure OpenAI',
    3: 'Ollama',
    4: 'vLLM',
    5: 'DeepSeek',
    6: 'Qwen',
    7: 'Moonshot',
    8: 'ZhipuAI',
    9: 'Other',
  }
  return map[supplier] || 'Unknown'
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="llm-config">
    <div class="header">
      <div class="title-section">
        <div
          class="back-btn"
          @click="handleBack"
        >
          <div class="i-hugeicons:arrow-left-01 text-24"></div>
        </div>
        <h2>大模型配置</h2>
      </div>
      <div class="actions">
        <n-input
          v-model:value="keywords"
          placeholder="搜索模型"
          class="search-input"
          @keyup.enter="fetchData"
        >
          <template #prefix>
            <div class="i-carbon-search"></div>
          </template>
        </n-input>
        <n-button
          secondary
          @click="fetchData"
        >
          <template #icon>
            <div class="i-carbon-renew"></div>
          </template>
        </n-button>
        <n-button
          type="primary"
          @click="handleAdd"
        >
          <template #icon>
            <div class="i-carbon-add"></div>
          </template>
          添加模型
        </n-button>
      </div>
    </div>

    <n-spin :show="loading">
      <div
        v-if="modelList.length > 0"
        class="content"
      >
        <n-grid
          :x-gap="24"
          :y-gap="24"
          cols="1 600:2 900:3 1200:4"
        >
          <n-grid-item
            v-for="item in modelList"
            :key="item.id"
          >
            <n-card
              hoverable
              class="model-card"
              :bordered="false"
              content-style="padding: 0;"
            >
              <div class="card-body">
                <div class="card-top">
                  <div class="icon-wrapper">
                    <div class="i-carbon-ai-status text-24"></div>
                  </div>
                  <div class="info">
                    <div class="name-row">
                      <h3
                        class="name"
                        :title="item.name"
                      >
                        {{ item.name }}
                      </h3>
                      <n-tag
                        v-if="item.default_model"
                        type="success"
                        size="small"
                        round
                      >
                        默认
                      </n-tag>
                    </div>
                    <span class="supplier">{{ getSupplierName(item.supplier) }}</span>
                  </div>
                </div>

                <div class="card-meta">
                  <div class="meta-item">
                    <span class="label">模型类型</span>
                    <span class="value">{{ item.model_type === 1 ? '大语言模型' : (item.model_type === 2 ? 'Embedding' : 'Rerank') }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="label">基础模型</span>
                    <span
                      class="value"
                      :title="item.base_model"
                    >{{ item.base_model }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="label">API域名</span>
                    <span
                      class="value"
                      :title="item.api_domain"
                    >{{ item.api_domain }}</span>
                  </div>
                </div>
              </div>

              <div class="card-actions">
                <div class="left-actions">
                  <n-button
                    v-if="!item.default_model && item.model_type === 1"
                    size="small"
                    text
                    type="primary"
                    @click.stop="handleSetDefault(item)"
                  >
                    设为默认模型
                  </n-button>
                </div>
                <div class="right-actions">
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
                    size="small"
                    type="error"
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
          description="暂无模型配置"
          size="large"
        >
          <template #extra>
            <n-button
              type="primary"
              @click="handleAdd"
            >
              添加模型
            </n-button>
          </template>
        </n-empty>
      </div>
    </n-spin>

    <LLMForm
      v-model:show="showForm"
      :model-id="currentModelId"
      @success="handleSuccess"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.llm-config {
  padding: 24px 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    }

    .actions {
      display: flex;
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

  .model-card {
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
        background: #e0e7ff;
        color: #4f46e5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
        min-width: 0;

        .name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;

          .name {
            margin: 0;
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
        }

        .supplier {
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
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .meta-item {
        display: flex;
        align-items: center;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        line-height: $line-height-sm;
        letter-spacing: $letter-spacing-normal;
        color: $text-color-secondary;
        overflow: hidden;

        .label {
          color: $text-color-tertiary;
          width: 60px;
          flex-shrink: 0;
        }

        .value {
          @include code-style;
          background: #f9fafb;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

      .right-actions {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
