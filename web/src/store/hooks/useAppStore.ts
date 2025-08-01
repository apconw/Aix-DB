import { defineStore ***REMOVED*** from 'pinia'
import { store ***REMOVED*** from '@/store'

export const useAppStore = defineStore('app-store', (***REMOVED*** => {
  const areaLoading = ref(false***REMOVED***

  return {
    areaLoading,
  ***REMOVED***
***REMOVED******REMOVED***

export function useAppStoreWithOut(***REMOVED*** {
  return useAppStore(store***REMOVED***
***REMOVED***
