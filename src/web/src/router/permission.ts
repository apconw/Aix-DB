import type { Router ***REMOVED*** from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
***REMOVED******REMOVED***

export function createRouterGuards(router: Router***REMOVED*** {
  router.beforeEach(async (to, from, next***REMOVED*** => {
    NProgress.start(***REMOVED***
    next(***REMOVED***
  ***REMOVED******REMOVED***

  router.afterEach((***REMOVED*** => {
    NProgress.done(***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***
