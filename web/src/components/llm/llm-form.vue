<script lang="ts" setup>
import type { FormInst, FormRules } from 'naive-ui'
import { reactive, ref, watch } from 'vue'
import { add_model, check_model_status, fetch_model_detail, update_model } from '@/api/aimodel'

interface Props {
  show: boolean
  modelId?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  modelId: null,
})

const emit = defineEmits(['update:show', 'success'])

const formRef = ref<FormInst | null>(null)
const loading = ref(false)
const testing = ref(false)

const formData = reactive({
  name: '',
  supplier: 1, // Default OpenAI
  model_type: 1, // 1: LLM
  base_model: '',
  protocol: 1, // 1: OpenAI
  api_domain: '',
  api_key: '',
  config_list: [] as { key: string, val: string }[],
})

const supplierOptions = [
  { label: 'OpenAI', value: 1 },
  { label: 'Azure OpenAI', value: 2 },
  { label: 'Ollama', value: 3 },
  { label: 'vLLM', value: 4 },
  { label: 'DeepSeek', value: 5 },
  { label: 'Qwen', value: 6 },
  { label: 'Moonshot', value: 7 },
  { label: 'ZhipuAI', value: 8 },
  { label: 'MiniMax', value: 10 },
  { label: 'Other', value: 9 },
]

const modelTypeOptions = [
  { label: '大语言模型', value: 1 },
  { label: 'Embedding', value: 2 },
  { label: 'Rerank', value: 3 },
]

const protocolOptions = [
  { label: 'OpenAI', value: 1 },
  { label: 'vLLM', value: 2 },
  // Add more as needed
]

const rules: FormRules = {
  name: [{ required: true, message: '请输入模型名称', trigger: 'blur' }],
  supplier: [{ required: true, message: '请选择供应商', trigger: 'change', type: 'number' }],
  model_type: [{ required: true, message: '请选择模型类型', trigger: 'change', type: 'number' }],
  base_model: [{ required: true, message: '请输入基础模型名称', trigger: 'blur' }],
  api_domain: [{ required: true, message: '请输入API域名', trigger: 'blur' }],
  // API Key 不是必填项，某些模型（如本地 Ollama）不需要 API Key
}

// Watch supplier change to auto-fill defaults
watch(() => formData.supplier, (val) => {
  if (val === 1) { // OpenAI
    if (!formData.api_domain) {
      formData.api_domain = 'https://api.openai.com/v1'
    }
    formData.protocol = 1
  } else if (val === 3) { // Ollama
    if (!formData.api_domain) {
      formData.api_domain = 'http://localhost:11434/v1'
    }
    formData.protocol = 2
  } else if (val === 5) { // DeepSeek
    if (!formData.api_domain) {
      formData.api_domain = 'https://api.deepseek.com'
    }
    formData.protocol = 1
  } else if (val === 7) { // Moonshot
    if (!formData.api_domain) {
      formData.api_domain = 'https://api.moonshot.cn/v1'
    }
    formData.protocol = 1
  } else if (val === 8) { // ZhipuAI
    if (!formData.api_domain) {
      formData.api_domain = 'https://open.bigmodel.cn/api/paas/v4/'
    }
    formData.protocol = 1
  } else if (val === 10) { // MiniMax
    if (!formData.api_domain) {
      formData.api_domain = 'https://api.minimaxi.com/v1'
    }
    formData.protocol = 1
  }
})

const initForm = async () => {
  if (props.modelId) {
    try {
      const response = await fetch_model_detail(props.modelId)
      // Adapt to response structure. Assuming standard { code: 200, data: ... } from request.ts
      if (response && response.data) {
        const data = response.data
        Object.assign(formData, data)
        // Ensure config_list is array
        if (!formData.config_list) {
          formData.config_list = []
        }
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    // Reset form
    formData.name = ''
    formData.supplier = 1
    formData.model_type = 1
    formData.base_model = ''
    formData.protocol = 1
    formData.api_domain = ''
    formData.api_key = ''
    formData.config_list = []
  }
}

watch(() => props.show, (val) => {
  if (val) {
    initForm()
  }
})

const handleClose = () => {
  emit('update:show', false)
}

const handleTest = async () => {
  testing.value = true
  try {
    const res = await check_model_status(formData)
    // 处理响应结果 - 后端返回格式: {code: 200, msg: 'ok', data: {success: true, message: '...'}}
    const result = res?.data || res
    if (result && result.success) {
      window.$ModalMessage.success(result.message || '连接成功')
    } else {
      window.$ModalMessage.error(result?.message || res?.msg || '连接失败')
    }
  } catch (e: any) {
    const errorMsg = e?.msg || e?.message || '连接失败'
    window.$ModalMessage.error(errorMsg)
  } finally {
    testing.value = false
  }
}


const handleSave = async () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      try {
        if (props.modelId) {
          await update_model({ ...formData, id: props.modelId })
        } else {
          await add_model(formData)
        }
        emit('success')
        handleClose()
      } catch (e) {
        window.$ModalMessage.error('保存失败')
      } finally {
        loading.value = false
      }
    }
  })
}

const onCreateConfig = () => {
  return {
    key: '',
    val: '',
  }
}
</script>

<template>
  <n-modal
    :show="show"
    :mask-closable="false"
    preset="card"
    :title="modelId ? '编辑模型' : '添加模型'"
    style="width: 600px"
    @update:show="(val) => emit('update:show', val)"
  >
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      label-width="100px"
      require-mark-placement="right-hanging"
    >
      <n-form-item
        label="模型名称"
        path="name"
      >
        <n-input
          v-model:value="formData.name"
          placeholder="请输入模型名称"
        />
      </n-form-item>
      <n-form-item
        label="供应商"
        path="supplier"
      >
        <n-select
          v-model:value="formData.supplier"
          :options="supplierOptions"
          placeholder="请选择供应商"
        />
      </n-form-item>
      <n-form-item
        label="模型类型"
        path="model_type"
      >
        <n-select
          v-model:value="formData.model_type"
          :options="modelTypeOptions"
          placeholder="请选择模型类型"
        />
      </n-form-item>
      <n-form-item
        label="基础模型"
        path="base_model"
      >
        <n-input
          v-model:value="formData.base_model"
          placeholder="请输入基础模型名称，如：gpt-4、qwen3-max 等"
        />
      </n-form-item>
      <n-form-item
        label="协议类型"
        path="protocol"
      >
        <n-select
          v-model:value="formData.protocol"
          :options="protocolOptions"
        />
      </n-form-item>
      <n-form-item
        label="API 域名"
        path="api_domain"
      >
        <n-input
          v-model:value="formData.api_domain"
          placeholder="https://api.openai.com"
        />
      </n-form-item>
      <n-form-item
        label="API Key"
        path="api_key"
      >
        <n-input
          v-model:value="formData.api_key"
          type="password"
          show-password-on="click"
          placeholder="请输入API Key"
        />
      </n-form-item>
      <n-divider dashed>
        额外配置
      </n-divider>
      <n-dynamic-input
        v-model:value="formData.config_list"
        :on-create="onCreateConfig"
      >
        <template #default="{ value }">
          <div style="display: flex; gap: 8px; width: 100%">
            <n-input
              v-model:value="value.key"
              placeholder="Key"
            />
            <n-input
              v-model:value="value.val"
              placeholder="Value"
            />
          </div>
        </template>
      </n-dynamic-input>
    </n-form>
    <template #footer>
      <div style="display: flex; justify-content: space-between;">
        <n-button
          secondary
          :loading="testing"
          @click="handleTest"
        >
          测试连接
        </n-button>
        <div>
          <n-button
            style="margin-right: 12px"
            @click="handleClose"
          >
            取消
          </n-button>
          <n-button
            type="primary"
            :loading="loading"
            @click="handleSave"
          >
            保存
          </n-button>
        </div>
      </div>
    </template>
  </n-modal>
</template>
