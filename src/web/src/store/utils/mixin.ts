
export function getFilterResponse(
  res: globalThis.IRequestData,
  successCallback?: globalThis.IStoreFilterCallBack | null,
  errorCallback?: globalThis.IStoreFilterCallBack | null,
***REMOVED***: Promise<globalThis.IRequestData> {
  return new Promise((resolve***REMOVED*** => {
    if (res && res.error === 0***REMOVED*** {
      successCallback && successCallback(res***REMOVED***
    ***REMOVED*** else {
      errorCallback
        ? errorCallback(res***REMOVED***
        : window.$ModalMessage.error(res.msg!, {
            closable: true,
          ***REMOVED******REMOVED***
    ***REMOVED***
    resolve(res***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***
