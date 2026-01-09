<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import {
  NButton,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NPopover,
  NSelect,
  NSwitch,
  NTooltip,
  useDialog,
  useMessage,
} from 'naive-ui'
import { computed, h, nextTick, onMounted, provide, reactive, ref } from 'vue'
import Add from '~icons/material-symbols/add'
import Close from '~icons/material-symbols/close'
import Trash from '~icons/material-symbols/delete-outline'
import Create from '~icons/material-symbols/edit-outline'
import ChevronDown from '~icons/material-symbols/keyboard-arrow-down'
import Search from '~icons/material-symbols/search'
import {
  fetch_datasource_field_list,
  fetch_datasource_list,
  fetch_datasource_table_list,
} from '@/api/datasource'
import { delPermissions, getList, savePermissions } from '@/api/permission'
import AuthTree from './auth-tree/row-auth.vue'
import Card from './permission-card.vue'
import SelectPermission from './select-permission.vue'

const t = (key: string, args?: any) => {
  const map: Record<string, string> = {
    'workspace.permission_configuration': '权限配置',
    'permission.search_rule_group': '搜索规则组',
    'permission.add_rule_group': '添加规则组',
    'datasource.relevant_content_found': '未找到相关内容',
    'permission.no_permission_rule': '暂无权限规则',
    'permission.rule_name': '规则名称',
    'permission.type': '类型',
    'permission.row_permission': '行权限',
    'permission.column_permission': '列权限',
    'permission.data_source': '数据源',
    'permission.data_table': '数据表',
    'ds.actions': '操作',
    'datasource.edit': '编辑',
    'dashboard.delete': '删除',
    'datasource.field_name': '字段名称',
    'datasource.field_notes': '字段备注',
    'permission.set_permission_rule': '设置权限规则',
    'permission.select_restricted_user': '选择受限用户',
    'ds.form.base_info': '基本信息',
    'permission.rule_group_name': '规则组名称',
    'datasource.please_enter': '请输入',
    'common.empty': '不能为空',
    'permission.permission_rule': '权限规则',
    'model.add': '添加',
    'common.cancel': '取消',
    'ds.previous': '上一步',
    'common.next': '下一步',
    'common.save': '保存',
    'permission.set_rule': '设置规则',
    'datasource.Please_select': '请选择',
    'embedded.duplicate_name': '名称重复',
    'common.save_success': '保存成功',
    'permission.edit_row_permission': '编辑行权限',
    'permission.add_row_permission': '添加行权限',
    'permission.edit_column_permission': '编辑列权限',
    'permission.add_column_permission': '添加列权限',
    'permission.rule_rule_1': '确认删除规则 {msg} 吗？',
    'permission.rule_group_1': '确认删除规则组 {msg} 吗？',
    'dashboard.delete_success': '删除成功',
  }
  let text = map[key] || key
  if (args) {
    Object.keys(args).forEach((k) => {
      text = text.replace(`{${k}}`, args[k])
    })
  }
  return text
}
const message = useMessage()
const dialog = useDialog()

const keywords = ref('')
const ruleConfigvVisible = ref(false)
const editRule = ref(0)
const termFormRef = ref()
const columnFormRef = ref()
const drawerTitle = ref('')
const dialogFormVisible = ref(false)
const dialogTitle = ref('')
const activeDsId = ref<number | null>(null)
const activeTableId = ref<number | null>(null)
const ruleList = ref<any[]>([])

const defaultPermission = {
  id: '',
  name: '',
  permissions: [],
  users: [],
}
const currentPermission = reactive<any>(cloneDeep(defaultPermission))

const searchColumn = ref('')
const isCreate = ref(false)
const defaultForm = {
  name: '',
  id: '',
  table_id: null as number | null,
  type: 'row',
  ds_id: null as number | null,
  table_name: '',
  ds_name: '',
  permissions: [] as any[],
  expression_tree: {},
}
const columnForm = reactive(cloneDeep(defaultForm))
const selectPermissionRef = ref()
const tableListOptions = ref<any[]>([])
const fieldListOptions = ref<any[]>([])
const dsListOptions = ref<any[]>([])

const ruleListWithSearch = computed(() => {
  if (!keywords.value) {
    return ruleList.value
  }
  return ruleList.value.filter((ele) =>
    ele.name.toLowerCase().includes(keywords.value.toLowerCase()),
  )
})

const tableColumnData = computed<any[]>(() => {
  if (!searchColumn.value) {
    return columnForm.permissions
  }
  return columnForm.permissions.filter((ele) =>
    ele.field_name.toLowerCase().includes(searchColumn.value.toLowerCase()),
  )
})

provide('filedList', fieldListOptions)

const setDrawerTitle = () => {
  if (isCreate.value) {
    drawerTitle.value = t('permission.add_rule_group')
  } else {
    drawerTitle.value = t('permission.set_permission_rule')
  }
}

const userTypeList = [
  {
    name: t('permission.row_permission'),
    value: 1,
  },
  {
    name: t('permission.column_permission'),
    value: 0,
  },
]

const ruleType = ref(0)

const handleAddPermission = (val: any) => {
  ruleType.value = val
  Object.assign(columnForm, cloneDeep(defaultForm))
  if (val === 1) {
    handleRowPermission(null)
  } else {
    handleColumnPermission(null)
  }
}

const saveAuthTree = (val: any) => {
  if (val.errorMessage) {
    message.error(val.errorMessage)
    return
  }
  delete val.errorMessage
  columnForm.expression_tree = cloneDeep(val)
  savePermissionEntry()
}

const savePermissionEntry = () => {
  const { expression_tree, table_id, ds_id, type, name, ds_name, table_name, permissions } = columnForm

  // Find if we are editing an existing permission in the temporary list
  let found = false
  if (columnForm.id) {
    for (const key in currentPermission.permissions) {
      if (currentPermission.permissions[key].id === columnForm.id) {
        Object.assign(
          currentPermission.permissions[key],
          cloneDeep({
            expression_tree,
            tree: expression_tree,
            permissions,
            permission_list: permissions,
            table_id,
            ds_id,
            type,
            name,
            ds_name,
            table_name,
          }),
        )
        found = true
        break
      }
    }
  }

  if (!found) {
    currentPermission.permissions.push(
      cloneDeep({
        expression_tree,
        tree: expression_tree,
        permissions,
        permission_list: permissions,
        table_id,
        ds_id,
        type,
        name,
        ds_name,
        table_name,
        id: +new Date(), // Temp ID
      }),
    )
  }
  dialogFormVisible.value = false
}

const getDsList = async (row: any) => {
  activeDsId.value = null
  activeTableId.value = null
  try {
    const res = await fetch_datasource_list()
    const json = await res.json()
    if (json.code === 200) {
      dsListOptions.value = json.data
      if (row?.ds_id) {
        const ds = dsListOptions.value.find((ele) => +ele.id === +row.ds_id)
        if (ds) {
          activeDsId.value = ds.id
        }
      }
    }
  } catch (e) {
    console.error(e)
  }

  if (row) {
    await handleDsIdChange(row.ds_id, row.ds_name)
    await handleEditeTable(row.table_id)
  } else if (columnForm.type === 'row' && authTreeRef.value) {
    // Init empty tree
    authTreeRef.value.init({})
  }
}

const handleRowPermission = (row: any) => {
  columnForm.type = 'row'
  getDsList(row)
  if (row) {
    const { name, ds_id, table_id, tree, expression_tree, id, ds_name, table_name } = row
    Object.assign(columnForm, {
      id,
      name,
      ds_id,
      table_id,
      ds_name,
      table_name,
      expression_tree: expression_tree || (typeof tree === 'object' ? tree : JSON.parse(tree || '{}')),
    })
  }
  dialogFormVisible.value = true
  dialogTitle.value = row?.id
    ? t('permission.edit_row_permission')
    : t('permission.add_row_permission')
}

const handleColumnPermission = (row: any) => {
  columnForm.type = 'column'
  getDsList(row)
  if (row) {
    const { name, ds_id, table_id, id, permission_list, permissions, ds_name, table_name } = row
    Object.assign(columnForm, {
      id,
      name,
      ds_id,
      ds_name,
      table_id,
      table_name,
      permissions: permissions || permission_list,
    })
  }
  dialogFormVisible.value = true
  dialogTitle.value = row?.id
    ? t('permission.edit_column_permission')
    : t('permission.add_column_permission')
}

let time: any
const handleInitDsIdChange = (val: number, option: any) => {
  columnForm.ds_id = val
  columnForm.ds_name = option.label
  time = setTimeout(() => {
    clearTimeout(time)
    // Clear table selection
    activeTableId.value = null
    columnForm.table_id = null
  }, 0)

  fetch_datasource_table_list(val).then(async (res) => {
    const json = await res.json()
    tableListOptions.value = json.data || []
    activeTableId.value = null
    fieldListOptions.value = []
    columnForm.permissions = []
    if (authTreeRef.value) {
      authTreeRef.value.init({})
    }
  })
}

const handleDsIdChange = async (val: number, name?: string) => {
  columnForm.ds_id = val
  if (name) {
    columnForm.ds_name = name
  }

  const res = await fetch_datasource_table_list(val)
  const json = await res.json()
  tableListOptions.value = json.data || []

  if (columnForm.table_id) {
    const table = tableListOptions.value.find((ele) => +ele.id === +columnForm.table_id)
    if (table) {
      activeTableId.value = table.id
    }
  }
}

const handleTableIdChange = (val: number, option: any) => {
  columnForm.table_id = val
  columnForm.table_name = option.label
  fetch_datasource_field_list(val).then(async (res) => {
    const json = await res.json()
    fieldListOptions.value = json.data || []
    if (columnForm.type === 'row') {
      return
    }
    columnForm.permissions = fieldListOptions.value.map((ele) => {
      const { id, field_name, field_comment } = ele
      return { field_id: id, field_name, field_comment, enable: true }
    })
  })
}

const handleEditeTable = async (val: number) => {
  const res = await fetch_datasource_field_list(val)
  const json = await res.json()
  fieldListOptions.value = json.data || []

  if (columnForm.type === 'row') {
    if (authTreeRef.value) {
      authTreeRef.value.init(columnForm.expression_tree)
    }
    return
  }

  const enableMap = (columnForm.permissions || []).reduce((pre: any, next: any) => {
    pre[next.field_id] = next.enable
    return pre
  }, {})

  columnForm.permissions = fieldListOptions.value.map((ele) => {
    const { id, field_name, field_comment } = ele
    return { field_id: id, field_name, field_comment, enable: enableMap[id] ?? false }
  })
}

const beforeClose = () => {
  ruleConfigvVisible.value = false
  isCreate.value = false
}

const searchLoading = ref(false)
const handleSearch = () => {
  searchLoading.value = true
  getList()
    .then(async (res) => {
      const json = await res.json()
      ruleList.value = json.data || []
    })
    .finally(() => {
      searchLoading.value = false
    })
}

const addHandler = () => {
  editRule.value = 0
  isCreate.value = true
  setDrawerTitle()
  Object.assign(currentPermission, cloneDeep(defaultPermission))
  // Ensure permissions array is fresh
  currentPermission.permissions = []
  currentPermission.users = []

  ruleConfigvVisible.value = true
  nextTick(() => {
    selectPermissionRef.value?.open([])
  })
}

const editForm = (row: any) => {
  if (row.type === 'row') {
    ruleType.value = 1
    handleRowPermission(row)
  } else {
    ruleType.value = 0
    handleColumnPermission(row)
  }
}

const handleEditRule = (row: any) => {
  editRule.value = 1
  isCreate.value = false
  setDrawerTitle()
  Object.assign(currentPermission, cloneDeep(row))
  ruleConfigvVisible.value = true
  nextTick(() => {
    selectPermissionRef.value?.open(row.users)
  })
}

const deleteRuleHandler = (row: any) => {
  dialog.warning({
    title: t('dashboard.delete'),
    content: t('permission.rule_rule_1', { msg: row.name }),
    positiveText: t('dashboard.delete'),
    negativeText: t('common.cancel'),
    onPositiveClick: () => {
      currentPermission.permissions = currentPermission.permissions.filter(
        (ele: any) => ele.id !== row.id,
      )
    },
  })
}

const deleteHandler = (row: any) => {
  dialog.warning({
    title: t('dashboard.delete'),
    content: t('permission.rule_group_1', { msg: row.name }),
    positiveText: t('dashboard.delete'),
    negativeText: t('common.cancel'),
    onPositiveClick: () => {
      delPermissions(row.id).then(async (res) => {
        const json = await res.json()
        if (json.code === 200) {
          message.success(t('dashboard.delete_success'))
          handleSearch()
        } else {
          message.error(json.msg || 'Error')
        }
      })
    },
  })
}

const setUser = (row: any) => {
  handleEditRule(row)
}

const rules = {
  name: [
    {
      required: true,
      message: t('datasource.please_enter') + t('common.empty') + t('permission.rule_group_name'),
      trigger: 'blur',
    },
  ],
}

const columnRules = {
  name: [
    {
      required: true,
      message: t('datasource.please_enter') + t('common.empty') + t('permission.rule_name'),
      trigger: 'blur',
    },
  ],
  table_id: [
    {
      required: true,
      type: 'number',
      message: t('datasource.Please_select') + t('common.empty') + t('permission.data_table'),
      trigger: 'change',
    },
  ],
}

const closeForm = () => {
  dialogFormVisible.value = false
}
const authTreeRef = ref()

const saveHandler = () => {
  columnFormRef.value?.validate((errors: any) => {
    if (!errors) {
      const names = currentPermission.permissions
        .filter((ele: any) => ele.id !== columnForm.id)
        .map((ele: any) => ele.name)
      if (names.includes(columnForm.name)) {
        message.error(t('embedded.duplicate_name'))
        return
      }

      if (columnForm.type === 'row') {
        authTreeRef.value.submit()
      } else {
        savePermissionEntry()
      }
    }
  })
}

const saveLoading = ref(false)
const save = () => {
  const { id, name, permissions, users } = cloneDeep(currentPermission)

  const permissionsObj = permissions.map((ele: any) => {
    return {
      ...cloneDeep(ele),
      permissions:
        ele.type !== 'row'
          ? (ele.permissions || [])
          : [],
      permission_list: [],
      expression_tree:
        ele.type === 'row'
          ? (ele.expression_tree || {})
          : {},
    }
  })

  // Get users from ref
  const finalUsers = selectPermissionRef.value
    ? selectPermissionRef.value.checkTableList.map((ele: any) => ele.id)
    : users

  const obj = {
    id,
    name,
    permissions: permissionsObj,
    users: finalUsers,
  }
  if (!id) {
    delete obj.id
  }

  if (saveLoading.value) {
    return
  }
  saveLoading.value = true
  savePermissions(obj)
    .then(async (res) => {
      const json = await res.json()
      if (json.code === 200) {
        message.success(t('common.save_success'))
        beforeClose()
        handleSearch()
      } else {
        message.error(json.msg || 'Error')
      }
    })
    .catch((err) => {
      message.error(String(err))
    })
    .finally(() => {
      saveLoading.value = false
    })
}

const savePermission = () => {
  termFormRef.value?.validate((errors: any) => {
    if (!errors) {
      save()
    }
  })
}

// Columns definition for permissions table
const permissionColumns = [
  { title: t('permission.rule_name'), key: 'name' },
  {
    title: t('permission.type'),
    key: 'type',
    render(row: any) {
      return row.type === 'row' ? t('permission.row_permission') : t('permission.column_permission')
    },
  },
  { title: t('permission.data_source'), key: 'ds_name' },
  { title: t('permission.data_table'), key: 'table_name' },
  {
    title: t('ds.actions'),
    key: 'actions',
    width: 80,
    render(row: any) {
      return h('div', { class: 'actions' }, [
        h(NTooltip, { trigger: 'hover' }, {
          trigger: () => h(NIcon, {
            class: 'action-btn mr-2 cursor-pointer',
            size: 18,
            onClick: () => editForm(row),
          }, { default: () => h(Create) }),
          default: () => t('datasource.edit'),
        }),
        h(NTooltip, { trigger: 'hover' }, {
          trigger: () => h(NIcon, {
            class: 'action-btn cursor-pointer',
            size: 18,
            onClick: () => deleteRuleHandler(row),
          }, { default: () => h(Trash) }),
          default: () => t('dashboard.delete'),
        }),
      ])
    },
  },
]

// Columns for column permission table
const columnPermColumns = [
  { title: t('datasource.field_name'), key: 'field_name' },
  { title: t('datasource.field_notes'), key: 'field_comment' },
  {
    title: t('ds.actions'),
    key: 'actions',
    width: 150,
    render(row: any, index: number) {
      return h(NSwitch, {
        value: row.enable,
        size: 'small',
        onUpdateValue: (v) => {
          tableColumnData.value[index].enable = v
        },
      })
    },
  },
]

onMounted(() => {
  handleSearch()
})
</script>

<template>
  <div class="permission no-padding">
    <div class="tool-left">
      <span class="page-title">{{ t('workspace.permission_configuration') }}</span>
      <div class="flex">
        <n-input
          v-model:value="keywords"
          clearable
          style="width: 240px; margin-right: 12px"
          :placeholder="t('permission.search_rule_group')"
        >
          <template #prefix>
            <n-icon>
              <Search />
            </n-icon>
          </template>
        </n-input>

        <n-button
          type="primary"
          @click="addHandler()"
        >
          <template #icon>
            <n-icon><Add /></n-icon>
          </template>
          {{ t('permission.add_rule_group') }}
        </n-button>
      </div>
    </div>

    <div
      v-if="!ruleListWithSearch.length"
      class="empty-state"
    >
      <div class="text-center">
        {{ keywords ? t('datasource.relevant_content_found') : t('permission.no_permission_rule') }}
      </div>
      <div
        v-if="!keywords"
        class="text-center mt-4"
      >
        <n-button
          type="primary"
          @click="addHandler()"
        >
          <template #icon>
            <n-icon><Add /></n-icon>
          </template>
          {{ t('permission.add_rule_group') }}
        </n-button>
      </div>
    </div>

    <div
      v-else
      class="card-content"
    >
      <n-grid
        :x-gap="16"
        :y-gap="16"
        cols="1 s:2 m:2 l:3 xl:4"
        responsive="screen"
      >
        <n-grid-item
          v-for="ele in ruleListWithSearch"
          :key="ele.id"
        >
          <Card
            :id="ele.id"
            :name="ele.name"
            :type="ele.users.length"
            :num="ele.permissions.length"
            @edit="handleEditRule(ele)"
            @del="deleteHandler(ele)"
            @set-user="setUser(ele)"
          />
        </n-grid-item>
      </n-grid>
    </div>

    <!-- Main Drawer -->
    <n-drawer
      v-model:show="ruleConfigvVisible"
      width="100%"
      height="calc(100% - 100px)"
      placement="bottom"
      :trap-focus="false"
      :block-scroll="false"
      to="body"
    >
      <n-drawer-content
        :title="drawerTitle"
        closable
      >
        <template #header>
          <div class="flex-between w-full">
            <span>{{ drawerTitle }}</span>
          </div>
        </template>

        <div class="drawer-content">
          <div class="scroll-content">
            <div class="title">
              {{ t('ds.form.base_info') }}
            </div>

            <n-form
              ref="termFormRef"
              :model="currentPermission"
              label-placement="top"
              :rules="rules"
            >
              <n-form-item
                path="name"
                :label="t('permission.rule_group_name')"
              >
                <n-input
                  v-model:value="currentPermission.name"
                  maxlength="50"
                  clearable
                  :placeholder="t('datasource.please_enter') + t('common.empty') + t('permission.rule_group_name')"
                />
              </n-form-item>

              <n-form-item>
                <template #label>
                  <div class="flex-between w-full">
                    {{ t('permission.permission_rule') }}
                    <n-popover
                      trigger="click"
                      placement="bottom"
                    >
                      <template #trigger>
                        <n-button
                          type="primary"
                          size="small"
                        >
                          {{ t('model.add') }}
                          <n-icon class="ml-1">
                            <ChevronDown />
                          </n-icon>
                        </n-button>
                      </template>
                      <div class="popover-menu">
                        <div
                          v-for="ele in userTypeList"
                          :key="ele.name"
                          class="popover-item"
                          @click="handleAddPermission(ele.value)"
                        >
                          {{ ele.name }}
                        </div>
                      </div>
                    </n-popover>
                  </div>
                </template>
                <div class="table-content">
                  <n-data-table
                    :columns="permissionColumns"
                    :data="currentPermission.permissions"
                    :bordered="false"
                  />
                </div>
              </n-form-item>
            </n-form>

            <div class="title mt-4">
              {{ t('permission.select_restricted_user') }}
            </div>
            <div class="select-permission_content">
               <SelectPermission ref="selectPermissionRef" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex-end">
            <n-button @click="beforeClose">
              {{ t('common.cancel') }}
            </n-button>
            <n-button
              type="primary"
              class="ml-2"
              :loading="saveLoading"
              @click="savePermission"
            >
              {{ t('common.save') }}
            </n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>

    <!-- Rule Drawer (Side) -->
    <n-drawer
      v-model:show="dialogFormVisible"
      width="896"
      placement="right"
    >
      <n-drawer-content
        :title="dialogTitle"
        closable
      >
        <n-form
          ref="columnFormRef"
          :model="columnForm"
          label-placement="top"
          :rules="columnRules"
        >
          <n-form-item
            path="name"
            :label="t('permission.rule_name')"
          >
            <n-input
              v-model:value="columnForm.name"
              maxlength="50"
              clearable
              :placeholder="t('datasource.please_enter') + t('common.empty') + t('permission.rule_name')"
            />
          </n-form-item>
          <n-form-item
            path="table_id"
            :label="t('permission.data_table')"
          >
            <div class="flex w-full">
              <n-select
                v-model:value="activeDsId"
                filterable
                style="width: 50%"
                :options="dsListOptions.map(d => ({ label: d.name, value: d.id }))"
                :placeholder="t('datasource.Please_select') + t('common.empty') + t('permission.data_source')"
                @update:value="handleInitDsIdChange"
              />
              <n-select
                v-model:value="activeTableId"
                filterable
                style="width: 50%; margin-left: 12px;"
                :disabled="!columnForm.ds_id"
                :options="tableListOptions.map(t => ({ label: t.table_name, value: t.id }))"
                :placeholder="t('datasource.Please_select') + t('common.empty') + t('permission.data_table')"
                @update:value="handleTableIdChange"
              />
            </div>
          </n-form-item>
          <n-form-item :label="t('permission.set_rule')">
            <n-input
              v-if="ruleType !== 1"
              v-model:value="searchColumn"
              :placeholder="t('permission.search_rule_group')"
              clearable
            >
              <template #prefix>
                <n-icon><Search /></n-icon>
              </template>
            </n-input>
          </n-form-item>
        </n-form>

        <div
          v-if="ruleType === 1"
          class="auth-tree_content"
        >
          <AuthTree
            ref="authTreeRef"
            @save="saveAuthTree"
          />
        </div>
        <div
          v-else
          class="table-content"
        >
          <n-data-table
            :columns="columnPermColumns"
            :data="tableColumnData"
            :max-height="500"
          />
        </div>

        <template #footer>
          <div class="flex-end">
            <n-button @click="closeForm">
              {{ t('common.cancel') }}
            </n-button>
            <n-button
              type="primary"
              class="ml-2"
              @click="saveHandler"
            >
              {{ t('common.save') }}
            </n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/typography.scss" as *;
.permission {
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;

  .tool-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .page-title {
      font-weight: $font-weight-medium;
      font-size: $font-size-xl;
      line-height: $line-height-xl;
      letter-spacing: $letter-spacing-tight;
      color: $heading-color;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  .card-content {
    height: calc(100% - 60px);
    overflow-y: auto;
  }

  .empty-state {
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #999;
  }
}

.flex {
  display: flex;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  align-items: center;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.w-full {
  width: 100%;
}
.ml-1 { margin-left: 4px; }
.ml-2 { margin-left: 8px; }
.mr-2 { margin-right: 8px; }
.mt-4 { margin-top: 16px; }
.text-center { text-align: center; }
.cursor-pointer { cursor: pointer; }

.popover-menu {

  .popover-item {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.scroll-content {
  width: 800px;
  margin: 0 auto;
}

.title {
  font-weight: $font-weight-medium;
  font-size: $font-size-md;
  line-height: $line-height-md;
  letter-spacing: $letter-spacing-normal;
  color: $heading-color;
  margin-top: 8px;
  margin-bottom: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.table-content {
  width: 100%;
  margin-top: 16px;
  border: 1px solid #efeff5;
  border-radius: 3px;
}

.auth-tree_content {
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #dee0e3;
  min-height: 64px;
  display: flex;
  align-items: center;
  overflow-y: auto;
  margin-top: -16px;
}
</style>
