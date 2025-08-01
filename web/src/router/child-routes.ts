const LayoutDefault = (***REMOVED*** => import('@/components/Layout/default.vue'***REMOVED***

const childrenRoutes: Array<RouteRecordRaw> = [
***REMOVED***
    path: 'chat',
    meta: { requiresAuth: true ***REMOVED***,
    name: 'ChatRoot',
    redirect: {
      name: 'ChatIndex',
    ***REMOVED***,
    children: [
    ***REMOVED***
        path: '',
        name: 'ChatIndex',
        component: (***REMOVED*** => import('@/views/chat.vue'***REMOVED***,
      ***REMOVED***,
***REMOVED***,
  ***REMOVED***,
***REMOVED***
    path: 'testAssitant',
    name: 'TestAssitant',
    component: (***REMOVED*** => import('@/views/DemandManager.vue'***REMOVED***,
    meta: { requiresAuth: true ***REMOVED***, // 标记需要认证
  ***REMOVED***,
***REMOVED***
    path: 'uaDetail/:id',
    name: 'UaDetail',
    component: (***REMOVED*** => import('@/views/usassistant/UsDetail.vue'***REMOVED***,
    meta: { requiresAuth: true ***REMOVED***,
  ***REMOVED***,
  // {
  //     path: '/testAssitant',
  //     name: 'TestAssitant',
  //     component: (***REMOVED*** => import('@/views/TestAssistant.vue'***REMOVED***,
  //     meta: { requiresAuth: true ***REMOVED*** // 标记需要认证
  // ***REMOVED***,
***REMOVED***
    path: 'mcpChat',
    name: 'McpChat',
    component: (***REMOVED*** => import('@/views/mcp/ToolAgent.vue'***REMOVED***,
    meta: { requiresAuth: true ***REMOVED***, // 标记需要认证
  ***REMOVED***,
]

export default childrenRoutes
