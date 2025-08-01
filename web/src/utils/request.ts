/* global
  IRequestSuite
*/
import type { AxiosInstance ***REMOVED*** from 'axios'
import axios from 'axios'
import Cookie from 'js-cookie'

import Router from '@/router'
import { currentHost ***REMOVED*** from '@/utils/location'

// redirect error
function errorRedirect(url: string***REMOVED*** {
  Router.push(`/${url***REMOVED***`***REMOVED***
***REMOVED***
// code Message
const codeMessage: {
  [key: number]: string
***REMOVED*** = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  206: '进行范围请求成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求不允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
***REMOVED***

// 创建axios实例
const service: AxiosInstance = axios.create({
  // api 的 base_url
  baseURL: currentHost.baseApi,
  // 请求超时时间
  timeout: 200000,
***REMOVED******REMOVED***

// request拦截器
service.interceptors.request.use(
  (request***REMOVED*** => {
    const token: string | undefined = Cookie.get('token'***REMOVED***

    // Conversion of hump nomenclature

    /**
     * 让每个请求携带自定义 token
     * 请根据实际情况自行修改
     */
    if (request.url === '/login'***REMOVED*** {
      return request
    ***REMOVED***
    request.headers!.Authorization = token as string
    return request
  ***REMOVED***,
  (error***REMOVED*** => {
    return Promise.reject(error***REMOVED***
  ***REMOVED***,
***REMOVED***

// respone拦截器
service.interceptors.response.use(
  (response***REMOVED*** => {
    /**
     * response data
     * ***REMOVED***
     *     data: {***REMOVED***,
     *     msg: "",
     *     error: 0      0 success | 1 error | 5000 failed | HTTP code
     *  ***REMOVED***
     */

    const data: any = response.data
    const msg: string = data.msg || ''
    if (msg.indexOf('user not log in'***REMOVED*** !== -1 && data.error === -1***REMOVED*** {
      // TODO 写死的  之后要根据语言跳转
      errorRedirect('login'***REMOVED***
      return
    ***REMOVED***
    if (response.config.autoDownLoadFile === undefined || response.config.autoDownLoadFile***REMOVED*** {
      Promise.resolve(***REMOVED***.then((***REMOVED*** => {
        useResHeadersAPI(response.headers, data***REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED***

    if (
      response.request.responseType === 'blob'
      && /json$/i.test(response.headers['content-type']***REMOVED***
    ***REMOVED*** {
      return new Promise((resolve***REMOVED*** => {
        const reader = new FileReader(***REMOVED***
        reader.readAsText(<Blob>response.data***REMOVED***

        reader.onload = (***REMOVED*** => {
          if (!reader.result || typeof reader.result !== 'string'***REMOVED*** {
            return resolve(response.data***REMOVED***
          ***REMOVED***

          response.data = JSON.parse(reader.result***REMOVED***
          resolve(response.data***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED*** else if (data instanceof Blob***REMOVED*** {
  ***REMOVED***
        data,
        msg: '',
        error: 0,
      ***REMOVED***
    ***REMOVED***

    if (data.code && data.data***REMOVED*** {
  ***REMOVED***
        data: data.data,
        error: data.code === 200 ? 0 : -1,
        msg: 'ok',
      ***REMOVED***
    ***REMOVED***


    if (!data.data && !data.msg && !data.error***REMOVED*** {
  ***REMOVED***
        data,
        error: 0,
        msg: 'ok',
      ***REMOVED***
    ***REMOVED***


    if (data.msg === null***REMOVED*** {
      data.msg = 'Unknown error'
    ***REMOVED***
    return data
  ***REMOVED***,
  (error***REMOVED*** => {
    /**
     * 某些特定的接口 404 500 需要跳转
     * 在需要重定向的接口中传入 redirect字段  值为要跳转的路由
     *   redirect之后  调用接口的地方会继续执行
     *   因为此时 response error
     *   所以需要前端返回一个前端构造好的数据结构 避免前端业务部分逻辑出错
     * 不重定向的接口则不需要传
     */
    if (error.config.redirect***REMOVED*** {
      errorRedirect(error.config.redirect***REMOVED***
    ***REMOVED***
    if (error.response***REMOVED*** {
  ***REMOVED***
        data: {***REMOVED***,
        error: error.response.status,
        msg: codeMessage[error.response.status] || error.response.data.message,
      ***REMOVED***
    ***REMOVED*** else {
      // 某些特定的接口 failed 需要跳转
      console.log(error***REMOVED***
  ***REMOVED***
        data: {***REMOVED***,
        error: 5000,
        aborted: error.config.signal?.aborted,
        msg: '服务请求不可用，请重试或检查您的网络。',
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED***

export function sleep(time = 0***REMOVED*** {
  return new Promise((resolve***REMOVED*** => {
    setTimeout((***REMOVED*** => {
      resolve({***REMOVED******REMOVED***
    ***REMOVED***, time***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***

function extractFileNameFromContentDispositionHeader(value: string***REMOVED*** {
  const patterns = [
    /filename\*=[^']+'\w*'"([^"]+***REMOVED***";?/i,
    /filename\*=[^']+'\w*'([^;]+***REMOVED***;?/i,
    /filename="([^;]****REMOVED***;?"/i,
    /filename=([^;]****REMOVED***;?/i,
  ]

  let responseFilename: any = null
  patterns.some((regex***REMOVED*** => {
    responseFilename = regex.exec(value***REMOVED***
    return responseFilename !== null
  ***REMOVED******REMOVED***

  if (responseFilename !== null && responseFilename.length > 1***REMOVED*** {
  ***REMOVED***
      return decodeURIComponent(responseFilename[1]***REMOVED***
    ***REMOVED*** catch (e***REMOVED*** {
      console.error(e***REMOVED***
    ***REMOVED***
  ***REMOVED***

  return null
***REMOVED***

export function downloadFile(boldData: BlobPart, filename = '预设文件名称', type: any***REMOVED*** {
  const blob = boldData instanceof Blob
    ? boldData
    : new Blob([boldData], {
      type,
    ***REMOVED******REMOVED***
  const url = window.URL.createObjectURL(blob***REMOVED***

  const link = document.createElement('a'***REMOVED***
  link.style.display = 'none'
  link.href = url
  link.download = filename
  document.body.appendChild(link***REMOVED***

  link.click(***REMOVED***

  document.body.removeChild(link***REMOVED***
***REMOVED***

export function useResHeadersAPI(headers: any, resData: any***REMOVED*** {
  const disposition = headers['content-disposition']
  if (disposition***REMOVED*** {
    let filename: string | null = ''

    filename = extractFileNameFromContentDispositionHeader(disposition***REMOVED***
    filename && downloadFile(resData, filename, headers['content-type']***REMOVED***
  ***REMOVED***
***REMOVED***

const requestSuite: IRequestSuite = {
  get(uri, params, config***REMOVED*** {
    return service.get(uri, {
      params,
      ...config,
    ***REMOVED******REMOVED***
  ***REMOVED***,
  post(uri, data, config***REMOVED*** {
    return service.post(uri, data, config***REMOVED***
  ***REMOVED***,
  put(uri, data, config***REMOVED*** {
    return service.put(uri, data, config***REMOVED***
  ***REMOVED***,
  patch(uri, data, config***REMOVED*** {
    return service.patch(uri, data, config***REMOVED***
  ***REMOVED***,
  delete(uri, config***REMOVED*** {
    return service.delete(uri, config***REMOVED***
  ***REMOVED***,
***REMOVED***

export default requestSuite
