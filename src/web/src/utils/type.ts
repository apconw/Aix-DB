const originToString = Object.prototype.toString

export function isFunction(obj: any***REMOVED*** {
  return typeof (obj***REMOVED*** === 'function'
***REMOVED***

export function isObject(obj: any***REMOVED*** {
  return obj === Object(obj***REMOVED***
***REMOVED***

export function isArray(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object Array]'
***REMOVED***

export function isDate(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object Date]'
***REMOVED***

export function isRegExp(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object RegExp]'
***REMOVED***

export function isBoolean(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object Boolean]'
***REMOVED***

export function isString(obj: any***REMOVED***: obj is string {
  return originToString.call(obj***REMOVED*** === '[object String]'
***REMOVED***

export function isUndefined(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object Undefined]'
***REMOVED***

export function isNull(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object Null]'
***REMOVED***

export function isBigInt(obj: any***REMOVED*** {
  return originToString.call(obj***REMOVED*** === '[object BigInt]'
***REMOVED***

export function isNumberical(obj: any***REMOVED*** {
  return !isNaN(Number.parseFloat(obj***REMOVED******REMOVED*** && isFinite(obj***REMOVED***
***REMOVED***
