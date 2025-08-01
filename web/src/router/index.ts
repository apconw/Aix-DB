import { createWebHashHistory ***REMOVED*** from 'vue-router'
import { isMockDevelopment ***REMOVED*** from '@/config'
import { createRouterGuards ***REMOVED*** from '@/router/permission'
import routes from './routes'

const history = isMockDevelopment ? createWebHashHistory(***REMOVED*** : createWebHistory(***REMOVED***

const router = createRouter({
  history,
  routes,
***REMOVED******REMOVED***

// 全局前置守卫
router.beforeEach((to, from, next***REMOVED*** => {
  const userStore = useUserStore(***REMOVED***
  if (to.meta.requiresAuth && !userStore.isLoggedIn***REMOVED*** {
    // 如果目标路由需要认证且用户未登录，则重定向到登录页面
    next('/login'***REMOVED***
  ***REMOVED*** else {
    next(***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

export async function setupRouter(app: App***REMOVED*** {
  createRouterGuards(router***REMOVED***
  app.use(router***REMOVED***

  await router.isReady(***REMOVED***
***REMOVED***

export default router
