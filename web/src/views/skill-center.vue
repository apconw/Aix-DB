<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetch_skill_list } from '@/api/skill'

defineOptions({ name: 'SkillCenter' })

const router = useRouter()
const skillList = ref<Array<{ name: string; description: string }>>([])
const loadingSkills = ref(false)
const skillSearchKeyword = ref('')

const filteredSkillList = computed(() => {
  const kw = skillSearchKeyword.value.trim().toLowerCase()
  if (!kw) return skillList.value
  return skillList.value.filter(
    (s) =>
      s.name.toLowerCase().includes(kw) ||
      (s.description && s.description.toLowerCase().includes(kw)),
  )
})

async function loadSkills() {
  if (loadingSkills.value) return
  loadingSkills.value = true
  try {
    const res = await fetch_skill_list()
    const data = await res.json().catch(() => ({}))
    if (data?.code === 200 && Array.isArray(data?.data)) {
      skillList.value = data.data
    } else {
      skillList.value = []
    }
  } catch {
    skillList.value = []
  } finally {
    loadingSkills.value = false
  }
}

function handleBack() {
  router.push({ name: 'ChatIndex' })
}

onMounted(() => {
  loadSkills()
})
</script>

<template>
  <div class="skill-center-page">
    <div class="skill-center-header">
      <div
        class="skill-center-back"
        @click="handleBack"
      >
        <div class="i-hugeicons:arrow-left-01 text-20"></div>
        <span>返回</span>
      </div>
      <h1 class="skill-center-title">
        <div class="skill-center-title-icon i-hugeicons:magic-wand-01 text-22 mr-2"></div>
        技能中心
      </h1>
    </div>
    <div class="skill-center-search-wrap">
      <n-input
        v-model:value="skillSearchKeyword"
        placeholder="搜索技能名称或描述..."
        clearable
        size="large"
        class="skill-center-search"
      >
        <template #prefix>
          <div class="i-hugeicons:search-01 text-18 text-muted"></div>
        </template>
      </n-input>
    </div>
    <div class="skill-center-body">
      <div
        v-if="loadingSkills"
        class="skill-center-loading"
      >
        <n-spin size="medium" />
        <span class="ml-2 text-gray-500">加载中...</span>
      </div>
      <div
        v-else-if="filteredSkillList.length === 0"
        class="skill-center-empty"
      >
        <div class="i-hugeicons:magic-wand-01 text-40 text-gray-300 mb-3"></div>
        <span class="text-gray-400">{{ skillSearchKeyword ? '未找到匹配技能' : '暂无可用技能' }}</span>
      </div>
      <div
        v-else
        class="skill-center-cards"
      >
        <div
          v-for="skill in filteredSkillList"
          :key="skill.name"
          class="skill-center-card"
        >
          <div class="skill-center-card-header">
            <div class="skill-center-card-icon">
              <div class="i-hugeicons:magic-wand-01 text-18"></div>
            </div>
            <span class="skill-center-card-name">{{ skill.name }}</span>
          </div>
          <div class="skill-center-card-desc">
            {{ skill.description || '暂无描述' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-family-base: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
$text-primary: #1e293b;
$text-secondary: #64748b;
$text-muted: #94a3b8;
$border-color: #e2e8f0;
$radius-md: 12px;
$radius-lg: 16px;
$primary-color: #7e6bf2;

.skill-center-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  font-family: $font-family-base;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.6) 0%, rgba(255, 255, 255, 0) 24px);
}

.skill-center-header {
  flex-shrink: 0;
  padding: 20px 24px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
}

.skill-center-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin: -8px 0 -8px -12px;
  border-radius: $radius-md;
  color: $text-secondary;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: $primary-color;
    background: rgba(126, 107, 242, 0.08);
  }
}

.skill-center-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
  display: flex;
  align-items: center;
}

.skill-center-title-icon {
  color: $primary-color;
}

.skill-center-search-wrap {
  flex-shrink: 0;
  padding: 16px 24px;
}

.skill-center-search {
  max-width: 360px;

  :deep(.n-input__input-el)::placeholder {
    color: $text-muted;
  }
}

.text-muted {
  color: $text-muted;
}

.skill-center-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0 24px 32px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $border-color;
    border-radius: 3px;
  }
}

.skill-center-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.skill-center-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  color: $text-muted;
  font-size: 14px;
}

.skill-center-cards {
  display: grid;
  gap: 14px;
  padding-top: 4px;
}

.skill-center-card {
  padding: 18px 20px;
  border-radius: $radius-lg;
  border: 1px solid rgba(226, 232, 240, 0.7);
  background: transparent;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: rgba(126, 107, 242, 0.4);
    box-shadow: 0 4px 20px rgba(126, 107, 242, 0.08);
  }
}

.skill-center-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.skill-center-card-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(126, 107, 242, 0.12) 0%,
    rgba(126, 107, 242, 0.06) 100%
  );
  color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-center-card-name {
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
  letter-spacing: 0.01em;
}

.skill-center-card-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.55;
  margin-left: 48px;
  word-break: break-word;
}
</style>
