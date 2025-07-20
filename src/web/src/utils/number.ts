// 千分符函数 【判断是否四舍五入】
export const comma = (num: any, suffix = ''***REMOVED*** => {
  if (!num***REMOVED*** {
    return
  ***REMOVED***

  const strNum = _.isString(num***REMOVED*** ? num : String(num***REMOVED***
  const intNum = _.isString(num***REMOVED*** ? Number(num***REMOVED*** : num

  if (isNaN(intNum***REMOVED******REMOVED*** {
    return num
  ***REMOVED***

  let source = [] as Array<any>
  if (strNum.includes('.'***REMOVED******REMOVED*** {
    source = String(intNum.toFixed(2***REMOVED******REMOVED***.split('.'***REMOVED*** // 保留两位(四舍五入***REMOVED***; 按小数点分成2部分
    source[0] = source[0].replace(/(\d***REMOVED***(?=(\d{3***REMOVED******REMOVED***+$***REMOVED***/g, '$1,'***REMOVED***// 只将整数部分进行都好分割
    return source.join('.'***REMOVED*** + suffix // 再将小数部分合并进来
  ***REMOVED***

  return strNum.replace(/(\d***REMOVED***(?=(\d{3***REMOVED******REMOVED***+$***REMOVED***/g, '$1,'***REMOVED*** + suffix
***REMOVED***

export const generateYears = (startYear***REMOVED*** => {
  const currentYear = new Date(***REMOVED***.getFullYear(***REMOVED***
  const endYear = currentYear + 1 // 明年
  const years: string[] = []

  let year = startYear
  for (; year <= endYear; year++***REMOVED*** {
    years.push(year***REMOVED***
  ***REMOVED***

  return years
***REMOVED***
