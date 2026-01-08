const LayoutDefault = () => import('@/components/Layout/default.vue')

const childrenRoutes: Array<RouteRecordRaw> = [
  {
    path: 'chat',
    meta: { requiresAuth: true },
    name: 'ChatRoot',
    redirect: {
      name: 'ChatIndex',
    },
    children: [
      {
        path: '',
        name: 'ChatIndex',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
  {
    path: 'datasource',
    name: 'DatasourceManager',
    component: () => import('@/views/datasource/datasource-manager.vue'),
    meta: { requiresAuth: true }, // 标记需要认证
  },
  {
    path: 'datasource/table/:dsId/:dsName',
    name: 'DatasourceTableList',
    component: () => import('@/views/datasource/datasource-table-list.vue'),
    meta: { requiresAuth: true }, // 标记需要认证
  },
  {
    path: 'user-manager',
    name: 'UserManager',
    component: () => import('@/views/user/user-manager.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'knowledge-manager',
    name: 'KnowledgeManager',
    component: () => import('@/views/knowledge/knowledge-manager.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'llm-config',
    name: 'LLMConfig',
    component: () => import('@/views/system/config/llm-config.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'permission-config',
    name: 'PermissionConfig',
    component: () => import('@/views/system/permission/permission-list.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'terminology-config',
    name: 'TerminologyConfig',
    component: () => import('@/views/system/config/terminology-config.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'set/training',
    name: 'SqlExampleLibrary',
    component: () => import('@/views/system/config/sql-example-library.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'system-settings',
    name: 'SystemSettings',
    component: () => import('@/views/system/system-settings.vue'),
    meta: { requiresAuth: true },
  },
]

export default childrenRoutes
