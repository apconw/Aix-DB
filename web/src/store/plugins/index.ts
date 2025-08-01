/**
 * Plugins for Pinia
 */

import router from '@/router'
import { getFilterResponse ***REMOVED*** from '@/store/utils/mixin'

export const pluginPinia = ({ store ***REMOVED******REMOVED*** => {
  store.filterResponse = getFilterResponse
  store.router = router
***REMOVED***
