export function useClipText(***REMOVED*** {
  const copied = ref(false***REMOVED***
  const copyDuration = 1500

  const handleCopied = (***REMOVED*** => {
    copied.value = true
    setTimeout((***REMOVED*** => {
      copied.value = false
    ***REMOVED***, copyDuration***REMOVED***
  ***REMOVED***

  function copy(textToCopy***REMOVED*** {
    if (navigator.clipboard && window.isSecureContext***REMOVED*** {
      return navigator.clipboard.writeText(textToCopy***REMOVED***.then((***REMOVED*** => {
        handleCopied(***REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED*** else {
      const textArea = document.createElement('textarea'***REMOVED***
      textArea.value = textToCopy
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea***REMOVED***
      textArea.focus(***REMOVED***
      textArea.select(***REMOVED***
      return new Promise((resolve, reject***REMOVED*** => {
        setTimeout((***REMOVED*** => {
          const exec = document.execCommand('copy'***REMOVED***
          if (exec***REMOVED*** {
            handleCopied(***REMOVED***
            resolve(''***REMOVED***
          ***REMOVED*** else {
            reject(new Error(***REMOVED******REMOVED***
          ***REMOVED***
          textArea.remove(***REMOVED***
        ***REMOVED******REMOVED***
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED***

  return {
    copy,
    copied,
    copyDuration,
  ***REMOVED***
***REMOVED***
