export function useCopyCode(***REMOVED*** {
  const timeoutIdMap: WeakMap<HTMLElement, NodeJS.Timeout> = new WeakMap(***REMOVED***
  window.addEventListener('click', (e***REMOVED*** => {
    const el = e.target as HTMLElement
    if (!el.matches('div[class*="language-"] button.markdown-code-copy'***REMOVED******REMOVED*** {
      return
    ***REMOVED***

    const parent = el.parentElement
    const sibling = parent?.nextElementSibling
    if (!parent || !sibling***REMOVED*** {
      return
    ***REMOVED***

    const isShell = /language-(shellscript|shell|bash|sh|zsh***REMOVED***/.test(
      parent.className,
    ***REMOVED***

    const ignoredNodes = []

    // Clone the node and remove the ignored nodes
    const clone = sibling.cloneNode(true***REMOVED*** as HTMLElement
    if (ignoredNodes.length***REMOVED*** {
      clone
        .querySelectorAll(ignoredNodes.join(','***REMOVED******REMOVED***
        .forEach((node***REMOVED*** => node.remove(***REMOVED******REMOVED***
    ***REMOVED***

    let text = clone.textContent || ''

    if (isShell***REMOVED*** {
      text = text.replace(/^ *(\$|>***REMOVED*** /gm, ''***REMOVED***.trim(***REMOVED***
    ***REMOVED***

    copyToClipboard(text***REMOVED***.then((***REMOVED*** => {
      el.classList.add('copied'***REMOVED***
      clearTimeout(timeoutIdMap.get(el***REMOVED******REMOVED***
      const timeoutId = setTimeout((***REMOVED*** => {
        el.classList.remove('copied'***REMOVED***
        el.blur(***REMOVED***
        timeoutIdMap.delete(el***REMOVED***
      ***REMOVED***, 2000***REMOVED***
      timeoutIdMap.set(el, timeoutId***REMOVED***
    ***REMOVED******REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***

async function copyToClipboard(text: string***REMOVED*** {
***REMOVED***
    return navigator.clipboard.writeText(text***REMOVED***
  ***REMOVED*** catch {
    const element = document.createElement('textarea'***REMOVED***
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', ''***REMOVED***

    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection(***REMOVED***
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0***REMOVED***
      : null

    document.body.appendChild(element***REMOVED***
    element.select(***REMOVED***

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand('copy'***REMOVED***
    document.body.removeChild(element***REMOVED***

    if (originalRange***REMOVED*** {
      selection!.removeAllRanges(***REMOVED*** // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange***REMOVED***
    ***REMOVED***

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement***REMOVED*** {
      (previouslyFocusedElement as HTMLElement***REMOVED***.focus(***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
