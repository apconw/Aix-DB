import App from '@/App.vue'

import InstallGlobalComponents from '@/components'
import { setupRouter ***REMOVED*** from '@/router'

import { setupStore ***REMOVED*** from '@/store'

import 'virtual:uno.css'

const app = createApp(App***REMOVED***

function setupPlugins(***REMOVED*** {
  app.use(InstallGlobalComponents***REMOVED***
***REMOVED***

async function setupApp(***REMOVED*** {
  setupStore(app***REMOVED***
  await setupRouter(app***REMOVED***
  app.mount('#app'***REMOVED***
***REMOVED***

setupPlugins(***REMOVED***
setupApp(***REMOVED***

// 初始化用户状态
const userStore = useUserStore(***REMOVED***
userStore.init(***REMOVED***

export default app
