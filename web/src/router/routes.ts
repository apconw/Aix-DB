import childRoutes from '@/router/child-routes'

const routes: Array<RouteRecordRaw> = [
***REMOVED***
    path: '/',
    name: 'Root',
    redirect: {
      name: 'ChatRoot',
    ***REMOVED***,
    component: (***REMOVED*** => import('@/components/Layout/SlotCenterPanel.vue'***REMOVED***,
    meta: { requiresAuth: true ***REMOVED***, // 标记需要认证
    children: childRoutes,
  ***REMOVED***,
***REMOVED***
    path: '/login',
    name: 'Login',
    component: (***REMOVED*** => import('@/views/Login.vue'***REMOVED***,
  ***REMOVED***,
***REMOVED***
    path: '/:pathMatch(.****REMOVED***',
    name: '404',
    component: (***REMOVED*** => import('@/components/404.vue'***REMOVED***,
  ***REMOVED***,
]

export default routes
