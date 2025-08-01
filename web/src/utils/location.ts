const locationHost = {
  hostname: 'localhost',
  baseApiIp: 'http://10.30.10.54:10001',
  baseApi: 'http://10.30.10.54:10001/api',
***REMOVED***

const hostList = [
  locationHost,
]

/**
 *  获取当前服务的 host 前缀
 */
export const currentHost = hostList.find((hostItem***REMOVED*** => {
  return window.location.hostname === hostItem.hostname
***REMOVED******REMOVED*** || locationHost
