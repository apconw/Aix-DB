<script lang="ts">
export default {
  name: 'LogicRelation',
}
</script>
<script lang="ts" setup>
import { computed, type PropType, toRefs } from 'vue'
import { NDropdown, NIcon } from 'naive-ui'
import FilterFiled from './filter-field.vue'
import type { Item } from './filter-field.vue'
import Add from '~icons/material-symbols/add'
import ChevronDown from '~icons/material-symbols/keyboard-arrow-down'
import Close from '~icons/material-symbols/close'

export type Logic = 'or' | 'and'
export type Relation = {
  child?: Relation[]
  logic: Logic
  x: number
} & Item
const t = (key: string, args?: any) => {
  const map: Record<string, string> = {
    'permission.add_conditions': '添加条件',
    'permission.add_relationships': '添加关系',
  }
  let text = map[key] || key
  if (args) {
    Object.keys(args).forEach(k => {
      text = text.replace(`{${k}}`, args[k])
    })
  }
  return text
}

const props = defineProps({
  relationList: {
    type: Array as PropType<Relation[]>,
    default: () => [],
  },
  x: {
    type: Number,
    default: 0,
  },
  logic: {
    type: String as PropType<Logic>,
    default: 'or',
  },
})

const marginLeft = computed(() => {
  return {
    marginLeft: props.x ? '20px' : 0,
  }
})

const emits = defineEmits([
  'addCondReal',
  'changeAndOrDfs',
  'update:logic',
  'removeRelationList',
  'del',
])

const { relationList } = toRefs(props)

const handleCommand = (type: any) => {
  emits('update:logic', type)
  emits('changeAndOrDfs', type)
}

const dropdownOptions = [
    { label: 'AND', key: 'and' },
    { label: 'OR', key: 'or' }
]

const removeRelationList = (index: any) => {
  relationList.value.splice(index, 1)
}
const addCondReal = (type: any) => {
  emits('addCondReal', type, props.logic === 'or' ? 'and' : 'or')
}
const add = (type: any, child: any, logic: any) => {
  child.push(
    type === 'condition'
      ? {
          field_id: '',
          value: '',
          enum_value: '',
          term: '',
          filter_type: 'logic',
          name: '',
        }
      : { child: [], logic }
  )
}
const del = (index: any, child: any) => {
  child.splice(index, 1)
}
</script>

<template>
  <div class="logic" :style="marginLeft">
    <div class="logic-left">
      <div class="operate-title">
        <span v-if="x" class="mrg-title">
          {{ logic === 'or' ? 'OR' : 'AND' }}
        </span>
        <n-dropdown v-else trigger="click" :options="dropdownOptions" @select="handleCommand">
          <span class="mrg-title">
            {{ logic === 'or' ? 'OR' : 'AND' }}
            <n-icon size="12">
              <ChevronDown />
            </n-icon>
          </span>
        </n-dropdown>
      </div>
      <span v-if="x" class="operate-icon">
        <n-icon size="12" @click="emits('removeRelationList')">
          <Close />
        </n-icon>
      </span>
    </div>
    <div class="logic-right">
      <template v-for="(item, index) in relationList" :key="index">
        <logic-relation
          v-if="item.child"
          :x="item.x"
          :logic="item.logic"
          :relation-list="item.child"
          @del="(idx) => del(idx, item.child)"
          @add-cond-real="(type, logic) => add(type, item.child, logic)"
          @remove-relation-list="removeRelationList(index)"
        >
        </logic-relation>
        <filter-filed v-else :item="item" :index="index" @del="emits('del', index)"></filter-filed>
      </template>
      <div class="logic-right-add">
        <button class="operand-btn" @click="addCondReal('condition')">
          <n-icon style="margin-right: 4px" size="16">
            <Add />
          </n-icon>
          {{ t('permission.add_conditions') }}
        </button>
        <button class="operand-btn" @click="addCondReal('relation')">
          <n-icon style="margin-right: 4px" size="16">
            <Add />
          </n-icon>
          {{ t('permission.add_relationships') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.logic {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;

  .logic-left {
    box-sizing: border-box;
    width: 48px;
    display: flex;
    position: relative;
    align-items: center;
    z-index: 10;
    background: #fff;
    width: 48px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &::after {
      width: 100%;
      height: 100%;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1f23291a;
      z-index: 1;
      border-radius: 4px;
      user-select: none;
      pointer-events: none;
    }

    .operate-title {
      word-wrap: break-word;
      box-sizing: border-box;
      color: $text-color-secondary;
      font-size: $font-size-sm;
      font-weight: $font-weight-normal;
      line-height: $line-height-sm;
      letter-spacing: $letter-spacing-normal;
      display: inline-block;
      white-space: nowrap;
      margin: 0;
      padding: 0;
      position: relative;
      z-index: 1;
      height: 20px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      .mrg-title {
        text-align: left;
        box-sizing: border-box;
        position: relative;
        display: flex;
        height: 20px;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        line-height: $line-height-sm;
        align-items: center;
        justify-content: center;
      }
    }

    &:hover {
      .operate-icon {
        display: inline-block;
      }

      .mrg-title {
        margin-right: 0;
      }
    }

    .operate-icon {
      height: 20px;
      line-height: $line-height-sm;
      z-index: 1;
    }
  }

  .logic-right-add {
    display: flex;
    height: 41.4px;
    align-items: center;
    padding-left: 26px;

    .operand-btn {
      box-sizing: border-box;
      font-weight: $font-weight-normal;
      font-size: $font-size-base;
      line-height: $line-height-base;
      letter-spacing: $letter-spacing-normal;
      text-align: center;
      outline: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 32px;
      padding: 0 10px;
      margin-right: 10px;
      color: var(--n-primary-color);
      background: #fff;
      border: 1px solid var(--n-primary-color);
      border-radius: 6px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
}
</style>
