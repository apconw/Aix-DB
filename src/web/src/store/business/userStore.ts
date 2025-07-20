// src/store/userStore.ts
import { defineStore ***REMOVED*** from 'pinia'

export const useUserStore = defineStore('user', {
  state: (***REMOVED*** => ({
    user: null as null | { token: string ***REMOVED***,
  ***REMOVED******REMOVED***,
  actions: {
    login(user: { token: string ***REMOVED******REMOVED*** {
      this.user = user
      // 将用户信息存储到 sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user***REMOVED******REMOVED***
    ***REMOVED***,
    logout(***REMOVED*** {
      this.user = null
      // 清除 sessionStorage 中的用户信息
      sessionStorage.removeItem('user'***REMOVED***
    ***REMOVED***,
    init(***REMOVED*** {
      // 从 sessionStorage 中恢复用户信息
      const storedUser = sessionStorage.getItem('user'***REMOVED***
      if (storedUser***REMOVED*** {
        this.user = JSON.parse(storedUser***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    getUserToken(***REMOVED*** {
      const storedUser = sessionStorage.getItem('user'***REMOVED***
      if (storedUser***REMOVED*** {
        this.user = JSON.parse(storedUser***REMOVED***
      ***REMOVED***
      return this.user?.token
    ***REMOVED***,
  ***REMOVED***,
  getters: {
    isLoggedIn: (state***REMOVED*** => !!state.user,
  ***REMOVED***,
***REMOVED******REMOVED***
