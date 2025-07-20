import { createPinia ***REMOVED*** from 'pinia'
import { pluginPinia ***REMOVED*** from '@/store/plugins'

const store = createPinia(***REMOVED***

export function setupStore(app: App<Element>***REMOVED*** {
  app.use(store***REMOVED***
***REMOVED***

store.use(pluginPinia***REMOVED***
export { store ***REMOVED***
