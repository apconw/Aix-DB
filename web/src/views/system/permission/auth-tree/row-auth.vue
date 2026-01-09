<script lang="ts" setup>
import { computed, ref } from 'vue'
import AuthTree from './auth-tree.vue'

const t = (key: string, args?: any) => {
  const map: Record<string, string> = {
    'permission.cannot_be_empty_': '不能为空',
    'permission.cannot_be_empty_de_ruler': '过滤规则不能为空',
    'permission.filter_value_can_null': '过滤值不能为空',
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
const errorMessage = ref('')
const logic = ref<'or' | 'and'>('or')
const relationList = ref<any[]>([])

const svgRealinePath = computed(() => {
  const lg = relationList.value.length
  let a = { x: 0, y: 0, child: relationList.value }
  a.y = Math.floor(dfsXY(a, 0) / 2)
  if (!lg) return ''
  let path = calculateDepth(a)
  return path
})

const svgDashinePath = computed(() => {
  const lg = relationList.value.length
  let a = { x: 0, y: 0, child: relationList.value }
  a.y = Math.floor(dfsXY(a, 0) / 2)
  if (!lg) return `M48 20 L68 20`
  let path = calculateDepthDash(a)
  return path
})

const init = (expressionTree: any) => {
  const { logic: lg = 'or', items = [] } = expressionTree
  logic.value = lg
  relationList.value = dfsInit(items)
}
const submit = () => {
  errorMessage.value = ''
  emits('save', {
    logic: logic.value,
    items: dfsSubmit(relationList.value),
    errorMessage: errorMessage.value,
  })
}
const errorDetected = ({ filter_type, field_id, term, value }: any) => {
  if (!field_id) {
    errorMessage.value = t('permission.cannot_be_empty_')
    return
  }
  if (filter_type === 'logic') {
    if (!term) {
      errorMessage.value = t('permission.cannot_be_empty_de_ruler')
      return
    }
    if (!term.includes('null') && !term.includes('empty') && value === '') {
      errorMessage.value = t('permission.filter_value_can_null')
      return
    }
  }
}
const dfsInit = (arr: any[]) => {
  const elementList: any[] = []
  arr.forEach((ele: any) => {
    const { sub_tree } = ele
    if (sub_tree) {
      const { items, logic } = sub_tree
      const child = dfsInit(items)
      elementList.push({ logic, child })
    } else {
      const { enum_value, field_id, filter_type, term, value, field } = ele
      const { name } = field || {}
      elementList.push({
        enum_value: enum_value ? enum_value.join(',') : '',
        field_id,
        filter_type,
        term,
        value,
        name,
      })
    }
  })
  return elementList
}
const dfsSubmit = (arr: any[]) => {
  const items: any[] = []
  arr.forEach((ele) => {
    const { child = [] } = ele
    if (child.length) {
      const { logic } = ele
      const sub_tree = dfsSubmit(child)
      items.push({
        enum_value: [],
        field_id: '',
        filter_type: '',
        term: '',
        type: 'tree',
        value: '',
        sub_tree: { logic, items: sub_tree },
      })
    } else {
      const { enum_value, field_id, filter_type, term, value, name } = ele
      errorDetected({ enum_value, field_id, filter_type, term, value, name })
      if (field_id) {
        items.push({
          enum_value: enum_value ? enum_value.split(',') : [],
          field_id,
          filter_type,
          term,
          value,
          type: 'item',
          sub_tree: null,
        })
      }
    }
  })
  return items
}
const removeRelationList = () => {
  relationList.value = []
}
const getY: any = (arr: any[]) => {
  const [a] = arr
  if (a.child?.length) {
    return getY(a.child)
  }
  return a.y
}
const calculateDepthDash = (obj: any) => {
  const lg = obj.child?.length
  let path = ''
  if (!lg && Array.isArray(obj.child)) {
    const { x, y } = obj
    path += `M${48 + x * 68} ${y * 41.4 + 20} L${88 + x * 68} ${y * 41.4 + 20}`
  } else if (obj.child?.length) {
    let y = Math.max(dfsY(obj, 0), dfs(obj.child, 0) + getY(obj.child) - 1)
    let parent = (dfs(obj.child, 0) * 41.4) / 2 + (getY(obj.child) || 0) * 41.4
    const { x } = obj
    path += `M${24 + x * 68} ${parent} L${24 + x * 68} ${y * 41.4 + 20} L${
      64 + x * 68
    } ${y * 41.4 + 20}`
    obj.child.forEach((item: any) => {
      path += calculateDepthDash(item)
    })
  }

  return path
}
const calculateDepth = (obj: any) => {
  const lg = obj.child.length
  if (!lg) return ''
  let path = ''
  const { x: depth, y } = obj
  obj.child.forEach((item: any, index: any) => {
    const { y: sibingLg, z } = item
    if (item.child?.length) {
      let parent = (dfs(obj.child, 0) * 41.4) / 2 + (getY(obj.child) || 0) * 41.4
      let children = (dfs(item.child, 0) * 41.4) / 2 + getY(item.child) * 41.4
      let path1 = 0
      let path2 = 0
      if (parent < children) {
        path1 = parent
        path2 = children
      } else {
        ;[path1, path2] = [children, parent]
      }
      if (y >= sibingLg) {
        path1 = parent
        path2 = children
      }
      path += `M${24 + depth * 68} ${path1} L${24 + depth * 68} ${path2} L${
        68 + depth * 68
      } ${path2}`
      // path += a;
      path += calculateDepth(item)
    }
    if (!item.child?.length) {
      if (sibingLg >= y) {
        path += `M${24 + depth * 68} ${y * 40} L${24 + depth * 68} ${
          (sibingLg + 1) * 41.4 - 20.69921875
        } L${68 + depth * 68} ${(sibingLg + 1) * 41.4 - 20.69921875}`
      } else {
        path += `M${24 + depth * 68} ${
          (sibingLg +
            (lg === 1 && index === 0 ? 0 : 1) +
            (obj.child[index + 1]?.child?.length ? y - sibingLg - 1 : 0)) *
            41.4 +
          20 +
          (lg === 1 && index === 0 ? 26 : 0)
        } L${24 + depth * 68} ${
          (sibingLg + 1) * 41.4 - 20.69921875 - (lg === 1 && index === 0 ? (z || 0) * 1.4 : 0)
        } L${68 + depth * 68} ${
          (sibingLg + 1) * 41.4 - 20.69921875 - (lg === 1 && index === 0 ? (z || 0) * 1.4 : 0)
        }`
      }
    }
  })
  return path
}
const changeAndOrDfs = (arr: any, logic: any) => {
  arr.forEach((ele: any) => {
    if (ele.child) {
      ele.logic = logic === 'and' ? 'or' : 'and'
      changeAndOrDfs(ele.child, ele.logic)
    }
  })
}
const dfs = (arr: any[], count: any) => {
  arr.forEach((ele) => {
    if (ele.child?.length) {
      count = dfs(ele.child, count)
    } else {
      count += 1
    }
  })
  count += 1
  return count
}
const dfsY = (obj: any, count: any) => {
  obj.child.forEach((ele: any) => {
    if (ele.child?.length) {
      count = dfsY(ele, count)
    } else {
      count = Math.max(count, ele.y, obj.y)
    }
  })
  return count
}
const dfsXY = (obj: any, count: any) => {
  obj.child.forEach((ele: any) => {
    ele.x = obj.x + 1
    if (ele.child?.length) {
      let l = dfs(ele.child, 0)
      ele.y = Math.floor(l / 2) + count
      count = dfsXY(ele, count)
    } else {
      count += 1
      ele.y = count - 1
    }
  })
  count += 1
  return count
}
const addCondReal = (type: any, logic: any) => {
  relationList.value.push(
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
const del = (index: any) => {
  relationList.value.splice(index, 1)
}

defineExpose({
  init,
  submit,
})
const emits = defineEmits(['save'])
</script>

<template>
  <div class="rowAuth">
    <auth-tree
      v-model:logic="logic"
      :relation-list="relationList"
      @del="(idx) => del(idx)"
      @add-cond-real="addCondReal"
      @remove-relation-list="removeRelationList"
      @change-and-or-dfs="(type) => changeAndOrDfs(relationList, type)"
    />
    <svg width="388" height="100%" class="real-line">
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        :d="svgRealinePath"
        fill="none"
        stroke="#D9DCDF"
        stroke-width="0.5"
      ></path>
    </svg>
    <svg width="388" height="100%" class="dash-line">
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        :d="svgDashinePath"
        fill="none"
        stroke="#D9DCDF"
        stroke-width="0.5"
        stroke-dasharray="4,4"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;

.rowAuth {
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: $line-height-normal;
  letter-spacing: $letter-spacing-normal;
  text-align: center;
  color: $text-color-primary;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.real-line,
.dash-line {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
}
</style>
