import type { AxiosRequestConfig ***REMOVED*** from 'axios'

import type router from '@/router'
import type { getFilterResponse ***REMOVED*** from '@/store/utils/mixin'

declare module 'vue' {
  /**
   *
   */
  interface ComponentCustomProperties extends Window {
    // ...

  ***REMOVED***
***REMOVED***

declare module 'axios' {
  /**
   * Costom Axios Field.
   */
  export interface AxiosRequestConfig {
    redirect?: string
    /**
     * 是否触发浏览器下载弹框，默认会触发（仅限 blob type）
     */
    autoDownLoadFile?: boolean
  ***REMOVED***
***REMOVED***

declare module 'pinia' {
  export interface PiniaCustomProperties {
    filterResponse: typeof getFilterResponse
    router: typeof router
  ***REMOVED***
***REMOVED***

declare module 'vue-router' {
  export interface RouteMeta {
    title?: string
  ***REMOVED***
***REMOVED***

declare global {

  /**
   * General Object Types.
   */
  type ObjectValueSuite<T = any> = { [key in any]: T ***REMOVED***

  /**
   * `error`: Response Status Code.
   *
   * `data`: Response Body.
   *
   * `msg`: Response Message.
   */
  export interface IRequestData {
    error: number
    data: any
    msg: string
    aborted?: boolean
  ***REMOVED***

  interface IRequestSuite {
    get(uri: string, params?: ObjectValueSuite, config?: AxiosRequestConfig***REMOVED***: Promise<IRequestData>
    post(uri: string, data?: any, config?: AxiosRequestConfig***REMOVED***: Promise<IRequestData>
    put(uri: string, data?: any, config?: AxiosRequestConfig***REMOVED***: Promise<IRequestData>
    patch(uri: string, data?: any, config?: AxiosRequestConfig***REMOVED***: Promise<IRequestData>
    delete(uri: string, config?: AxiosRequestConfig***REMOVED***: Promise<IRequestData>
  ***REMOVED***

  type IModulesApiSuite = ObjectValueSuite<(...args: any***REMOVED*** => Promise<IRequestData>>

  /**
   * Store FilterResponse Callback Type.
   */
  type IStoreFilterCallBack = (res: IRequestData***REMOVED*** => Promise<IRequestData> | void

***REMOVED***
export { ***REMOVED***
