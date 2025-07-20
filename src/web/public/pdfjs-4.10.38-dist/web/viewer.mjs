/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2024 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License"***REMOVED***;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */

/******/ // The require scope
/******/ var __webpack_require__ = {***REMOVED***;
/******/
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ ((***REMOVED*** => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition***REMOVED*** => {
/******/ 		for (var key in definition***REMOVED*** {
/******/ 			if (__webpack_require__.o(definition, key***REMOVED*** && !__webpack_require__.o(exports, key***REMOVED******REMOVED*** {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] ***REMOVED******REMOVED***;
        /******/
***REMOVED***
      /******/
***REMOVED***
    /******/
***REMOVED***;
  /******/
***REMOVED******REMOVED***(***REMOVED***;
/******/
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ ((***REMOVED*** => {
/******/ 	__webpack_require__.o = (obj, prop***REMOVED*** => (Object.prototype.hasOwnProperty.call(obj, prop***REMOVED******REMOVED***
  /******/
***REMOVED******REMOVED***(***REMOVED***;
/******/
/************************************************************************/
var __webpack_exports__ = {***REMOVED***;

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PDFViewerApplication: (***REMOVED*** => (/* reexport */ PDFViewerApplication***REMOVED***,
  PDFViewerApplicationConstants: (***REMOVED*** => (/* binding */ AppConstants***REMOVED***,
  PDFViewerApplicationOptions: (***REMOVED*** => (/* reexport */ AppOptions***REMOVED***
***REMOVED******REMOVED***;

;// ./web/ui_utils.js
const DEFAULT_SCALE_VALUE = "auto";
const DEFAULT_SCALE = 1.0;
const DEFAULT_SCALE_DELTA = 1.1;
const MIN_SCALE = 0.1;
const MAX_SCALE = 10.0;
const UNKNOWN_SCALE = 0;
const MAX_AUTO_SCALE = 1.25;
const SCROLLBAR_PADDING = 40;
const VERTICAL_PADDING = 5;
const RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
***REMOVED***;
const PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
***REMOVED***;
const SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
***REMOVED***;
const TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_PERMISSIONS: 2
***REMOVED***;
const ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2,
  PAGE: 3
***REMOVED***;
const SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
***REMOVED***;
const CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
***REMOVED***;
const AutoPrintRegExp = /\bprint\s*\(/;
function scrollIntoView(element, spot, scrollMatches = false***REMOVED*** {
  let parent = element.offsetParent;
  if (!parent***REMOVED*** {
    console.error("offsetParent is not set -- cannot scroll"***REMOVED***;
    return;
  ***REMOVED***
  let offsetY = element.offsetTop + element.clientTop;
  let offsetX = element.offsetLeft + element.clientLeft;
  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || scrollMatches && (parent.classList.contains("markedContent"***REMOVED*** || getComputedStyle(parent***REMOVED***.overflow === "hidden"***REMOVED******REMOVED*** {
    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;
    if (!parent***REMOVED*** {
      return;
    ***REMOVED***
  ***REMOVED***
  if (spot***REMOVED*** {
    if (spot.top !== undefined***REMOVED*** {
      offsetY += spot.top;
    ***REMOVED***
    if (spot.left !== undefined***REMOVED*** {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    ***REMOVED***
  ***REMOVED***
  parent.scrollTop = offsetY;
***REMOVED***
function watchScroll(viewAreaElement, callback, abortSignal = undefined***REMOVED*** {
  const debounceScroll = function (evt***REMOVED*** {
    if (rAF***REMOVED*** {
      return;
    ***REMOVED***
    rAF = window.requestAnimationFrame(function viewAreaElementScrolled(***REMOVED*** {
      rAF = null;
      const currentX = viewAreaElement.scrollLeft;
      const lastX = state.lastX;
      if (currentX !== lastX***REMOVED*** {
        state.right = currentX > lastX;
      ***REMOVED***
      state.lastX = currentX;
      const currentY = viewAreaElement.scrollTop;
      const lastY = state.lastY;
      if (currentY !== lastY***REMOVED*** {
        state.down = currentY > lastY;
      ***REMOVED***
      state.lastY = currentY;
      callback(state***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***;
  const state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  ***REMOVED***;
  let rAF = null;
  viewAreaElement.addEventListener("scroll", debounceScroll, {
    useCapture: true,
    signal: abortSignal
  ***REMOVED******REMOVED***;
  abortSignal?.addEventListener("abort", (***REMOVED*** => window.cancelAnimationFrame(rAF***REMOVED***, {
    once: true
  ***REMOVED******REMOVED***;
  return state;
***REMOVED***
function parseQueryString(query***REMOVED*** {
  const params = new Map(***REMOVED***;
  for (const [key, value] of new URLSearchParams(query***REMOVED******REMOVED*** {
    params.set(key.toLowerCase(***REMOVED***, value***REMOVED***;
  ***REMOVED***
  return params;
***REMOVED***
const InvisibleCharsRegExp = /[\x00-\x1F]/g;
function removeNullCharacters(str, replaceInvisible = false***REMOVED*** {
  if (!InvisibleCharsRegExp.test(str***REMOVED******REMOVED*** {
    return str;
  ***REMOVED***
  if (replaceInvisible***REMOVED*** {
    return str.replaceAll(InvisibleCharsRegExp, m => m === "\x00" ? "" : " "***REMOVED***;
  ***REMOVED***
  return str.replaceAll("\x00", ""***REMOVED***;
***REMOVED***
function binarySearchFirstItem(items, condition, start = 0***REMOVED*** {
  let minIndex = start;
  let maxIndex = items.length - 1;
  if (maxIndex < 0 || !condition(items[maxIndex]***REMOVED******REMOVED*** {
    return items.length;
  ***REMOVED***
  if (condition(items[minIndex]***REMOVED******REMOVED*** {
    return minIndex;
  ***REMOVED***
  while (minIndex < maxIndex***REMOVED*** {
    const currentIndex = minIndex + maxIndex >> 1;
    const currentItem = items[currentIndex];
    if (condition(currentItem***REMOVED******REMOVED*** {
      maxIndex = currentIndex;
    ***REMOVED*** else {
      minIndex = currentIndex + 1;
    ***REMOVED***
  ***REMOVED***
  return minIndex;
***REMOVED***
function approximateFraction(x***REMOVED*** {
  if (Math.floor(x***REMOVED*** === x***REMOVED*** {
    return [x, 1];
  ***REMOVED***
  const xinv = 1 / x;
  const limit = 8;
  if (xinv > limit***REMOVED*** {
    return [1, limit];
  ***REMOVED*** else if (Math.floor(xinv***REMOVED*** === xinv***REMOVED*** {
    return [1, xinv];
  ***REMOVED***
  const x_ = x > 1 ? xinv : x;
  let a = 0,
    b = 1,
    c = 1,
    d = 1;
  while (true***REMOVED*** {
    const p = a + c,
      q = b + d;
    if (q > limit***REMOVED*** {
      break;
    ***REMOVED***
    if (x_ <= p / q***REMOVED*** {
      c = p;
      d = q;
    ***REMOVED*** else {
      a = p;
      b = q;
    ***REMOVED***
  ***REMOVED***
  let result;
  if (x_ - a / b < c / d - x_***REMOVED*** {
    result = x_ === x ? [a, b] : [b, a];
  ***REMOVED*** else {
    result = x_ === x ? [c, d] : [d, c];
  ***REMOVED***
  return result;
***REMOVED***
function floorToDivide(x, div***REMOVED*** {
  return x - x % div;
***REMOVED***
function getPageSizeInches({
  view,
  userUnit,
  rotate
***REMOVED******REMOVED*** {
  const [x1, y1, x2, y2] = view;
  const changeOrientation = rotate % 180 !== 0;
  const width = (x2 - x1***REMOVED*** / 72 * userUnit;
  const height = (y2 - y1***REMOVED*** / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  ***REMOVED***;
***REMOVED***
function backtrackBeforeAllVisibleElements(index, views, top***REMOVED*** {
  if (index < 2***REMOVED*** {
    return index;
  ***REMOVED***
  let elt = views[index].div;
  let pageTop = elt.offsetTop + elt.clientTop;
  if (pageTop >= top***REMOVED*** {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  ***REMOVED***
  for (let i = index - 2; i >= 0; --i***REMOVED*** {
    elt = views[i].div;
    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop***REMOVED*** {
      break;
    ***REMOVED***
    index = i;
  ***REMOVED***
  return index;
***REMOVED***
function getVisibleElements({
  scrollEl,
  views,
  sortByVisibility = false,
  horizontal = false,
  rtl = false
***REMOVED******REMOVED*** {
  const top = scrollEl.scrollTop,
    bottom = top + scrollEl.clientHeight;
  const left = scrollEl.scrollLeft,
    right = left + scrollEl.clientWidth;
  function isElementBottomAfterViewTop(view***REMOVED*** {
    const element = view.div;
    const elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  ***REMOVED***
  function isElementNextAfterViewHorizontally(view***REMOVED*** {
    const element = view.div;
    const elementLeft = element.offsetLeft + element.clientLeft;
    const elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  ***REMOVED***
  const visible = [],
    ids = new Set(***REMOVED***,
    numViews = views.length;
  let firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop***REMOVED***;
  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal***REMOVED*** {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top***REMOVED***;
  ***REMOVED***
  let lastEdge = horizontal ? right : -1;
  for (let i = firstVisibleElementInd; i < numViews; i++***REMOVED*** {
    const view = views[i],
      element = view.div;
    const currentWidth = element.offsetLeft + element.clientLeft;
    const currentHeight = element.offsetTop + element.clientTop;
    const viewWidth = element.clientWidth,
      viewHeight = element.clientHeight;
    const viewRight = currentWidth + viewWidth;
    const viewBottom = currentHeight + viewHeight;
    if (lastEdge === -1***REMOVED*** {
      if (viewBottom >= bottom***REMOVED*** {
        lastEdge = viewBottom;
      ***REMOVED***
    ***REMOVED*** else if ((horizontal ? currentWidth : currentHeight***REMOVED*** > lastEdge***REMOVED*** {
      break;
    ***REMOVED***
    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right***REMOVED*** {
      continue;
    ***REMOVED***
    const hiddenHeight = Math.max(0, top - currentHeight***REMOVED*** + Math.max(0, viewBottom - bottom***REMOVED***;
    const hiddenWidth = Math.max(0, left - currentWidth***REMOVED*** + Math.max(0, viewRight - right***REMOVED***;
    const fractionHeight = (viewHeight - hiddenHeight***REMOVED*** / viewHeight,
      fractionWidth = (viewWidth - hiddenWidth***REMOVED*** / viewWidth;
    const percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view,
      percent,
      widthPercent: fractionWidth * 100 | 0
    ***REMOVED******REMOVED***;
    ids.add(view.id***REMOVED***;
  ***REMOVED***
  const first = visible[0],
    last = visible.at(-1***REMOVED***;
  if (sortByVisibility***REMOVED*** {
    visible.sort(function (a, b***REMOVED*** {
      const pc = a.percent - b.percent;
      if (Math.abs(pc***REMOVED*** > 0.001***REMOVED*** {
        return -pc;
      ***REMOVED***
      return a.id - b.id;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  return {
    first,
    last,
    views: visible,
    ids
  ***REMOVED***;
***REMOVED***
function normalizeWheelEventDirection(evt***REMOVED*** {
  let delta = Math.hypot(evt.deltaX, evt.deltaY***REMOVED***;
  const angle = Math.atan2(evt.deltaY, evt.deltaX***REMOVED***;
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI***REMOVED*** {
    delta = -delta;
  ***REMOVED***
  return delta;
***REMOVED***
function normalizeWheelEventDelta(evt***REMOVED*** {
  const deltaMode = evt.deltaMode;
  let delta = normalizeWheelEventDirection(evt***REMOVED***;
  const MOUSE_PIXELS_PER_LINE = 30;
  const MOUSE_LINES_PER_PAGE = 30;
  if (deltaMode === WheelEvent.DOM_DELTA_PIXEL***REMOVED*** {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  ***REMOVED*** else if (deltaMode === WheelEvent.DOM_DELTA_LINE***REMOVED*** {
    delta /= MOUSE_LINES_PER_PAGE;
  ***REMOVED***
  return delta;
***REMOVED***
function isValidRotation(angle***REMOVED*** {
  return Number.isInteger(angle***REMOVED*** && angle % 90 === 0;
***REMOVED***
function isValidScrollMode(mode***REMOVED*** {
  return Number.isInteger(mode***REMOVED*** && Object.values(ScrollMode***REMOVED***.includes(mode***REMOVED*** && mode !== ScrollMode.UNKNOWN;
***REMOVED***
function isValidSpreadMode(mode***REMOVED*** {
  return Number.isInteger(mode***REMOVED*** && Object.values(SpreadMode***REMOVED***.includes(mode***REMOVED*** && mode !== SpreadMode.UNKNOWN;
***REMOVED***
function isPortraitOrientation(size***REMOVED*** {
  return size.width <= size.height;
***REMOVED***
const animationStarted = new Promise(function (resolve***REMOVED*** {
  window.requestAnimationFrame(resolve***REMOVED***;
***REMOVED******REMOVED***;
const docStyle = document.documentElement.style;
function clamp(v, min, max***REMOVED*** {
  return Math.min(Math.max(v, min***REMOVED***, max***REMOVED***;
***REMOVED***
class ProgressBar {
  #classList = null;
  #disableAutoFetchTimeout = null;
  #percent = 0;
  #style = null;
  #visible = true;
  constructor(bar***REMOVED*** {
    this.#classList = bar.classList;
    this.#style = bar.style;
  ***REMOVED***
  get percent(***REMOVED*** {
    return this.#percent;
  ***REMOVED***
  set percent(val***REMOVED*** {
    this.#percent = clamp(val, 0, 100***REMOVED***;
    if (isNaN(val***REMOVED******REMOVED*** {
      this.#classList.add("indeterminate"***REMOVED***;
      return;
    ***REMOVED***
    this.#classList.remove("indeterminate"***REMOVED***;
    this.#style.setProperty("--progressBar-percent", `${this.#percent***REMOVED***%`***REMOVED***;
  ***REMOVED***
  setWidth(viewer***REMOVED*** {
    if (!viewer***REMOVED*** {
      return;
    ***REMOVED***
    const container = viewer.parentNode;
    const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
    if (scrollbarWidth > 0***REMOVED*** {
      this.#style.setProperty("--progressBar-end-offset", `${scrollbarWidth***REMOVED***px`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setDisableAutoFetch(delay = 5000***REMOVED*** {
    if (this.#percent === 100 || isNaN(this.#percent***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    if (this.#disableAutoFetchTimeout***REMOVED*** {
      clearTimeout(this.#disableAutoFetchTimeout***REMOVED***;
    ***REMOVED***
    this.show(***REMOVED***;
    this.#disableAutoFetchTimeout = setTimeout((***REMOVED*** => {
      this.#disableAutoFetchTimeout = null;
      this.hide(***REMOVED***;
    ***REMOVED***, delay***REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.#visible***REMOVED*** {
      return;
    ***REMOVED***
    this.#visible = false;
    this.#classList.add("hidden"***REMOVED***;
  ***REMOVED***
  show(***REMOVED*** {
    if (this.#visible***REMOVED*** {
      return;
    ***REMOVED***
    this.#visible = true;
    this.#classList.remove("hidden"***REMOVED***;
  ***REMOVED***
***REMOVED***
function getActiveOrFocusedElement(***REMOVED*** {
  let curRoot = document;
  let curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus"***REMOVED***;
  while (curActiveOrFocused?.shadowRoot***REMOVED*** {
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus"***REMOVED***;
  ***REMOVED***
  return curActiveOrFocused;
***REMOVED***
function apiPageLayoutToViewerModes(layout***REMOVED*** {
  let scrollMode = ScrollMode.VERTICAL,
    spreadMode = SpreadMode.NONE;
  switch (layout***REMOVED*** {
    case "SinglePage":
      scrollMode = ScrollMode.PAGE;
      break;
    case "OneColumn":
      break;
    case "TwoPageLeft":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnLeft":
      spreadMode = SpreadMode.ODD;
      break;
    case "TwoPageRight":
      scrollMode = ScrollMode.PAGE;
    case "TwoColumnRight":
      spreadMode = SpreadMode.EVEN;
      break;
  ***REMOVED***
  return {
    scrollMode,
    spreadMode
  ***REMOVED***;
***REMOVED***
function apiPageModeToSidebarView(mode***REMOVED*** {
  switch (mode***REMOVED*** {
    case "UseNone":
      return SidebarView.NONE;
    case "UseThumbs":
      return SidebarView.THUMBS;
    case "UseOutlines":
      return SidebarView.OUTLINE;
    case "UseAttachments":
      return SidebarView.ATTACHMENTS;
    case "UseOC":
      return SidebarView.LAYERS;
  ***REMOVED***
  return SidebarView.NONE;
***REMOVED***
function toggleCheckedBtn(button, toggle, view = null***REMOVED*** {
  button.classList.toggle("toggled", toggle***REMOVED***;
  button.setAttribute("aria-checked", toggle***REMOVED***;
  view?.classList.toggle("hidden", !toggle***REMOVED***;
***REMOVED***
function toggleExpandedBtn(button, toggle, view = null***REMOVED*** {
  button.classList.toggle("toggled", toggle***REMOVED***;
  button.setAttribute("aria-expanded", toggle***REMOVED***;
  view?.classList.toggle("hidden", !toggle***REMOVED***;
***REMOVED***
const calcRound = function (***REMOVED*** {
  const e = document.createElement("div"***REMOVED***;
  e.style.width = "round(down, calc(1.6666666666666665 * 792px***REMOVED***, 1px***REMOVED***";
  return e.style.width === "calc(1320px***REMOVED***" ? Math.fround : x => x;
***REMOVED***(***REMOVED***;

;// ./web/app_options.js
{
  var compatParams = new Map(***REMOVED***;
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const maxTouchPoints = navigator.maxTouchPoints || 1;
  const isAndroid = /Android/.test(userAgent***REMOVED***;
  const isIOS = /\b(iPad|iPhone|iPod***REMOVED***(?=;***REMOVED***/.test(userAgent***REMOVED*** || platform === "MacIntel" && maxTouchPoints > 1;
  (function (***REMOVED*** {
    if (isIOS || isAndroid***REMOVED*** {
      compatParams.set("maxCanvasPixels", 5242880***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***(***REMOVED***;
  (function (***REMOVED*** {
    if (isAndroid***REMOVED*** {
      compatParams.set("useSystemFonts", false***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***(***REMOVED***;
***REMOVED***
const OptionKind = {
  BROWSER: 0x01,
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  EVENT_DISPATCH: 0x10,
  PREFERENCE: 0x80
***REMOVED***;
const Type = {
  BOOLEAN: 0x01,
  NUMBER: 0x02,
  OBJECT: 0x04,
  STRING: 0x08,
  UNDEFINED: 0x10
***REMOVED***;
const defaultOptions = {
  allowedGlobalEvents: {
    value: null,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  canvasMaxAreaInBytes: {
    value: -1,
    kind: OptionKind.BROWSER + OptionKind.API
  ***REMOVED***,
  isInAutomation: {
    value: false,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  localeProperties: {
    value: {
      lang: navigator.language || "en-US"
    ***REMOVED***,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  nimbusDataStr: {
    value: "",
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsCaretBrowsingMode: {
    value: false,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsDocumentFonts: {
    value: true,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsIntegratedFind: {
    value: false,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsMouseWheelZoomCtrlKey: {
    value: true,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsMouseWheelZoomMetaKey: {
    value: true,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  supportsPinchToZoom: {
    value: true,
    kind: OptionKind.BROWSER
  ***REMOVED***,
  toolbarDensity: {
    value: 0,
    kind: OptionKind.BROWSER + OptionKind.EVENT_DISPATCH
  ***REMOVED***,
  altTextLearnMoreUrl: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  annotationEditorMode: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  annotationMode: {
    value: 2,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  debuggerSrc: {
    value: "./debugger.mjs",
    kind: OptionKind.VIEWER
  ***REMOVED***,
  defaultZoomDelay: {
    value: 400,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  defaultZoomValue: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  ***REMOVED***,
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableAltText: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableAltTextModelDownload: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  ***REMOVED***,
  enableGuessAltText: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE + OptionKind.EVENT_DISPATCH
  ***REMOVED***,
  enableHighlightFloatingButton: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableNewAltTextWhenAddingImage: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enablePrintAutoRotate: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableScripting: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableUpdatedAddImage: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  externalLinkRel: {
    value: "noopener noreferrer nofollow",
    kind: OptionKind.VIEWER
  ***REMOVED***,
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  highlightEditorColors: {
    value: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  imageResourcesPath: {
    value: "./images/",
    kind: OptionKind.VIEWER
  ***REMOVED***,
  maxCanvasPixels: {
    value: 2 ** 25,
    kind: OptionKind.VIEWER
  ***REMOVED***,
  forcePageColors: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  pageColorsBackground: {
    value: "Canvas",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  pageColorsForeground: {
    value: "CanvasText",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  ***REMOVED***,
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  ***REMOVED***,
  cMapUrl: {
    value: "../web/cmaps/",
    kind: OptionKind.API
  ***REMOVED***,
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  ***REMOVED***,
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  ***REMOVED***,
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  ***REMOVED***,
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  ***REMOVED***,
  docBaseUrl: {
    value: "",
    kind: OptionKind.API
  ***REMOVED***,
  enableHWA: {
    value: true,
    kind: OptionKind.API + OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***,
  enableXfa: {
    value: true,
    kind: OptionKind.API + OptionKind.PREFERENCE
  ***REMOVED***,
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  ***REMOVED***,
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  ***REMOVED***,
  isOffscreenCanvasSupported: {
    value: true,
    kind: OptionKind.API
  ***REMOVED***,
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  ***REMOVED***,
  pdfBug: {
    value: false,
    kind: OptionKind.API
  ***REMOVED***,
  standardFontDataUrl: {
    value: "../web/standard_fonts/",
    kind: OptionKind.API
  ***REMOVED***,
  useSystemFonts: {
    value: undefined,
    kind: OptionKind.API,
    type: Type.BOOLEAN + Type.UNDEFINED
  ***REMOVED***,
  verbosity: {
    value: 1,
    kind: OptionKind.API
  ***REMOVED***,
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  ***REMOVED***,
  workerSrc: {
    value: "../build/pdf.worker.mjs",
    kind: OptionKind.WORKER
  ***REMOVED***
***REMOVED***;
{
  defaultOptions.defaultUrl = {
    value: "compressed.tracemonkey-pldi-09.pdf",
    kind: OptionKind.VIEWER
  ***REMOVED***;
  defaultOptions.sandboxBundleSrc = {
    value: "../build/pdf.sandbox.mjs",
    kind: OptionKind.VIEWER
  ***REMOVED***;
  defaultOptions.viewerCssTheme = {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  ***REMOVED***;
  defaultOptions.enableFakeMLManager = {
    value: true,
    kind: OptionKind.VIEWER
  ***REMOVED***;
***REMOVED***
{
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  ***REMOVED***;
***REMOVED***
class AppOptions {
  static eventBus;
  static #opts = new Map(***REMOVED***;
  static {
    for (const name in defaultOptions***REMOVED*** {
      this.#opts.set(name, defaultOptions[name].value***REMOVED***;
    ***REMOVED***
    for (const [name, value] of compatParams***REMOVED*** {
      this.#opts.set(name, value***REMOVED***;
    ***REMOVED***
    this._hasInvokedSet = false;
    this._checkDisablePreferences = (***REMOVED*** => {
      if (this.get("disablePreferences"***REMOVED******REMOVED*** {
        return true;
      ***REMOVED***
      if (this._hasInvokedSet***REMOVED*** {
        console.warn("The Preferences may override manually set AppOptions; " + 'please use the "disablePreferences"-option to prevent that.'***REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***;
  ***REMOVED***
  static get(name***REMOVED*** {
    return this.#opts.get(name***REMOVED***;
  ***REMOVED***
  static getAll(kind = null, defaultOnly = false***REMOVED*** {
    const options = Object.create(null***REMOVED***;
    for (const name in defaultOptions***REMOVED*** {
      const defaultOpt = defaultOptions[name];
      if (kind && !(kind & defaultOpt.kind***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      options[name] = !defaultOnly ? this.#opts.get(name***REMOVED*** : defaultOpt.value;
    ***REMOVED***
    return options;
  ***REMOVED***
  static set(name, value***REMOVED*** {
    this.setAll({
      [name]: value
    ***REMOVED******REMOVED***;
  ***REMOVED***
  static setAll(options, prefs = false***REMOVED*** {
    this._hasInvokedSet ||= true;
    let events;
    for (const name in options***REMOVED*** {
      const defaultOpt = defaultOptions[name],
        userOpt = options[name];
      if (!defaultOpt || !(typeof userOpt === typeof defaultOpt.value || Type[(typeof userOpt***REMOVED***.toUpperCase(***REMOVED***] & defaultOpt.type***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      const {
        kind
      ***REMOVED*** = defaultOpt;
      if (prefs && !(kind & OptionKind.BROWSER || kind & OptionKind.PREFERENCE***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      if (this.eventBus && kind & OptionKind.EVENT_DISPATCH***REMOVED*** {
        (events ||= new Map(***REMOVED******REMOVED***.set(name, userOpt***REMOVED***;
      ***REMOVED***
      this.#opts.set(name, userOpt***REMOVED***;
    ***REMOVED***
    if (events***REMOVED*** {
      for (const [name, value] of events***REMOVED*** {
        this.eventBus.dispatch(name.toLowerCase(***REMOVED***, {
          source: this,
          value
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/pdf_link_service.js

const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
const LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
***REMOVED***;
class PDFLinkService {
  externalLinkEnabled = true;
  constructor({
    eventBus,
    externalLinkTarget = null,
    externalLinkRel = null,
    ignoreDestinationZoom = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
  ***REMOVED***
  setDocument(pdfDocument, baseUrl = null***REMOVED*** {
    this.baseUrl = baseUrl;
    this.pdfDocument = pdfDocument;
  ***REMOVED***
  setViewer(pdfViewer***REMOVED*** {
    this.pdfViewer = pdfViewer;
  ***REMOVED***
  setHistory(pdfHistory***REMOVED*** {
    this.pdfHistory = pdfHistory;
  ***REMOVED***
  get pagesCount(***REMOVED*** {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  ***REMOVED***
  get page(***REMOVED*** {
    return this.pdfDocument ? this.pdfViewer.currentPageNumber : 1;
  ***REMOVED***
  set page(value***REMOVED*** {
    if (this.pdfDocument***REMOVED*** {
      this.pdfViewer.currentPageNumber = value;
    ***REMOVED***
  ***REMOVED***
  get rotation(***REMOVED*** {
    return this.pdfDocument ? this.pdfViewer.pagesRotation : 0;
  ***REMOVED***
  set rotation(value***REMOVED*** {
    if (this.pdfDocument***REMOVED*** {
      this.pdfViewer.pagesRotation = value;
    ***REMOVED***
  ***REMOVED***
  get isInPresentationMode(***REMOVED*** {
    return this.pdfDocument ? this.pdfViewer.isInPresentationMode : false;
  ***REMOVED***
  async goToDestination(dest***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    let namedDest, explicitDest, pageNumber;
    if (typeof dest === "string"***REMOVED*** {
      namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest***REMOVED***;
    ***REMOVED*** else {
      namedDest = null;
      explicitDest = await dest;
    ***REMOVED***
    if (!Array.isArray(explicitDest***REMOVED******REMOVED*** {
      console.error(`goToDestination: "${explicitDest***REMOVED***" is not a valid destination array, for dest="${dest***REMOVED***".`***REMOVED***;
      return;
    ***REMOVED***
    const [destRef] = explicitDest;
    if (destRef && typeof destRef === "object"***REMOVED*** {
      pageNumber = this.pdfDocument.cachedPageNumber(destRef***REMOVED***;
      if (!pageNumber***REMOVED*** {
      ***REMOVED***
          pageNumber = (await this.pdfDocument.getPageIndex(destRef***REMOVED******REMOVED*** + 1;
        ***REMOVED*** catch {
          console.error(`goToDestination: "${destRef***REMOVED***" is not a valid page reference, for dest="${dest***REMOVED***".`***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (Number.isInteger(destRef***REMOVED******REMOVED*** {
      pageNumber = destRef + 1;
    ***REMOVED***
    if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount***REMOVED*** {
      console.error(`goToDestination: "${pageNumber***REMOVED***" is not a valid page number, for dest="${dest***REMOVED***".`***REMOVED***;
      return;
    ***REMOVED***
    if (this.pdfHistory***REMOVED*** {
      this.pdfHistory.pushCurrentPosition(***REMOVED***;
      this.pdfHistory.push({
        namedDest,
        explicitDest,
        pageNumber
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.pdfViewer.scrollPageIntoView({
      pageNumber,
      destArray: explicitDest,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    ***REMOVED******REMOVED***;
  ***REMOVED***
  goToPage(val***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val***REMOVED*** || val | 0;
    if (!(Number.isInteger(pageNumber***REMOVED*** && pageNumber > 0 && pageNumber <= this.pagesCount***REMOVED******REMOVED*** {
      console.error(`PDFLinkService.goToPage: "${val***REMOVED***" is not a valid page.`***REMOVED***;
      return;
    ***REMOVED***
    if (this.pdfHistory***REMOVED*** {
      this.pdfHistory.pushCurrentPosition(***REMOVED***;
      this.pdfHistory.pushPage(pageNumber***REMOVED***;
    ***REMOVED***
    this.pdfViewer.scrollPageIntoView({
      pageNumber
    ***REMOVED******REMOVED***;
  ***REMOVED***
  addLinkAttributes(link, url, newWindow = false***REMOVED*** {
    if (!url || typeof url !== "string"***REMOVED*** {
      throw new Error('A valid "url" parameter must provided.'***REMOVED***;
    ***REMOVED***
    const target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget,
      rel = this.externalLinkRel;
    if (this.externalLinkEnabled***REMOVED*** {
      link.href = link.title = url;
    ***REMOVED*** else {
      link.href = "";
      link.title = `Disabled: ${url***REMOVED***`;
      link.onclick = (***REMOVED*** => false;
    ***REMOVED***
    let targetStr = "";
    switch (target***REMOVED*** {
      case LinkTarget.NONE:
        break;
      case LinkTarget.SELF:
        targetStr = "_self";
        break;
      case LinkTarget.BLANK:
        targetStr = "_blank";
        break;
      case LinkTarget.PARENT:
        targetStr = "_parent";
        break;
      case LinkTarget.TOP:
        targetStr = "_top";
        break;
    ***REMOVED***
    link.target = targetStr;
    link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
  ***REMOVED***
  getDestinationHash(dest***REMOVED*** {
    if (typeof dest === "string"***REMOVED*** {
      if (dest.length > 0***REMOVED*** {
        return this.getAnchorUrl("#" + escape(dest***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (Array.isArray(dest***REMOVED******REMOVED*** {
      const str = JSON.stringify(dest***REMOVED***;
      if (str.length > 0***REMOVED*** {
        return this.getAnchorUrl("#" + escape(str***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return this.getAnchorUrl(""***REMOVED***;
  ***REMOVED***
  getAnchorUrl(anchor***REMOVED*** {
    return this.baseUrl ? this.baseUrl + anchor : anchor;
  ***REMOVED***
  setHash(hash***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    let pageNumber, dest;
    if (hash.includes("="***REMOVED******REMOVED*** {
      const params = parseQueryString(hash***REMOVED***;
      if (params.has("search"***REMOVED******REMOVED*** {
        const query = params.get("search"***REMOVED***.replaceAll('"', ""***REMOVED***,
          phrase = params.get("phrase"***REMOVED*** === "true";
        this.eventBus.dispatch("findfromurlhash", {
          source: this,
          query: phrase ? query : query.match(/\S+/g***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (params.has("page"***REMOVED******REMOVED*** {
        pageNumber = params.get("page"***REMOVED*** | 0 || 1;
      ***REMOVED***
      if (params.has("zoom"***REMOVED******REMOVED*** {
        const zoomArgs = params.get("zoom"***REMOVED***.split(","***REMOVED***;
        const zoomArg = zoomArgs[0];
        const zoomArgNumber = parseFloat(zoomArg***REMOVED***;
        if (!zoomArg.includes("Fit"***REMOVED******REMOVED*** {
          dest = [null, {
            name: "XYZ"
          ***REMOVED***, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        ***REMOVED*** else if (zoomArg === "Fit" || zoomArg === "FitB"***REMOVED*** {
          dest = [null, {
            name: zoomArg
          ***REMOVED***];
        ***REMOVED*** else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV"***REMOVED*** {
          dest = [null, {
            name: zoomArg
          ***REMOVED***, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
        ***REMOVED*** else if (zoomArg === "FitR"***REMOVED*** {
          if (zoomArgs.length !== 5***REMOVED*** {
            console.error('PDFLinkService.setHash: Not enough parameters for "FitR".'***REMOVED***;
          ***REMOVED*** else {
            dest = [null, {
              name: zoomArg
            ***REMOVED***, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
          ***REMOVED***
        ***REMOVED*** else {
          console.error(`PDFLinkService.setHash: "${zoomArg***REMOVED***" is not a valid zoom value.`***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      if (dest***REMOVED*** {
        this.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber || this.page,
          destArray: dest,
          allowNegativeOffset: true
        ***REMOVED******REMOVED***;
      ***REMOVED*** else if (pageNumber***REMOVED*** {
        this.page = pageNumber;
      ***REMOVED***
      if (params.has("pagemode"***REMOVED******REMOVED*** {
        this.eventBus.dispatch("pagemode", {
          source: this,
          mode: params.get("pagemode"***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (params.has("nameddest"***REMOVED******REMOVED*** {
        this.goToDestination(params.get("nameddest"***REMOVED******REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    dest = unescape(hash***REMOVED***;
  ***REMOVED***
      dest = JSON.parse(dest***REMOVED***;
      if (!Array.isArray(dest***REMOVED******REMOVED*** {
        dest = dest.toString(***REMOVED***;
      ***REMOVED***
    ***REMOVED*** catch { ***REMOVED***
    if (typeof dest === "string" || PDFLinkService.#isValidExplicitDest(dest***REMOVED******REMOVED*** {
      this.goToDestination(dest***REMOVED***;
      return;
    ***REMOVED***
    console.error(`PDFLinkService.setHash: "${unescape(hash***REMOVED******REMOVED***" is not a valid destination.`***REMOVED***;
  ***REMOVED***
  executeNamedAction(action***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    switch (action***REMOVED*** {
      case "GoBack":
        this.pdfHistory?.back(***REMOVED***;
        break;
      case "GoForward":
        this.pdfHistory?.forward(***REMOVED***;
        break;
      case "NextPage":
        this.pdfViewer.nextPage(***REMOVED***;
        break;
      case "PrevPage":
        this.pdfViewer.previousPage(***REMOVED***;
        break;
      case "LastPage":
        this.page = this.pagesCount;
        break;
      case "FirstPage":
        this.page = 1;
        break;
      default:
        break;
    ***REMOVED***
    this.eventBus.dispatch("namedaction", {
      source: this,
      action
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async executeSetOCGState(action***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const pdfDocument = this.pdfDocument,
      optionalContentConfig = await this.pdfViewer.optionalContentConfigPromise;
    if (pdfDocument !== this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    optionalContentConfig.setOCGState(action***REMOVED***;
    this.pdfViewer.optionalContentConfigPromise = Promise.resolve(optionalContentConfig***REMOVED***;
  ***REMOVED***
  static #isValidExplicitDest(dest***REMOVED*** {
    if (!Array.isArray(dest***REMOVED*** || dest.length < 2***REMOVED*** {
      return false;
    ***REMOVED***
    const [page, zoom, ...args] = dest;
    if (!(typeof page === "object" && Number.isInteger(page?.num***REMOVED*** && Number.isInteger(page?.gen***REMOVED******REMOVED*** && !Number.isInteger(page***REMOVED******REMOVED*** {
      return false;
    ***REMOVED***
    if (!(typeof zoom === "object" && typeof zoom?.name === "string"***REMOVED******REMOVED*** {
      return false;
    ***REMOVED***
    const argsLen = args.length;
    let allowNull = true;
    switch (zoom.name***REMOVED*** {
      case "XYZ":
        if (argsLen < 2 || argsLen > 3***REMOVED*** {
          return false;
        ***REMOVED***
        break;
      case "Fit":
      case "FitB":
        return argsLen === 0;
      case "FitH":
      case "FitBH":
      case "FitV":
      case "FitBV":
        if (argsLen > 1***REMOVED*** {
          return false;
        ***REMOVED***
        break;
      case "FitR":
        if (argsLen !== 4***REMOVED*** {
          return false;
        ***REMOVED***
        allowNull = false;
        break;
      default:
        return false;
    ***REMOVED***
    for (const arg of args***REMOVED*** {
      if (!(typeof arg === "number" || allowNull && arg === null***REMOVED******REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    return true;
  ***REMOVED***
***REMOVED***
class SimpleLinkService extends PDFLinkService {
  setDocument(pdfDocument, baseUrl = null***REMOVED*** { ***REMOVED***
***REMOVED***

;// ./web/pdfjs.js
const {
  AbortException,
  AnnotationEditorLayer,
  AnnotationEditorParamsType,
  AnnotationEditorType,
  AnnotationEditorUIManager,
  AnnotationLayer,
  AnnotationMode,
  build,
  ColorPicker,
  createValidAbsoluteUrl,
  DOMSVGFactory,
  DrawLayer,
  FeatureTest,
  fetchData,
  getDocument,
  getFilenameFromUrl,
  getPdfFilenameFromUrl: pdfjs_getPdfFilenameFromUrl,
  getXfaPageViewport,
  GlobalWorkerOptions,
  ImageKind,
  InvalidPDFException,
  isDataScheme,
  isPdfFile,
  MissingPDFException,
  noContextMenu,
  normalizeUnicode,
  OPS,
  OutputScale,
  PasswordResponses,
  PDFDataRangeTransport,
  PDFDateString,
  PDFWorker,
  PermissionFlag,
  PixelsPerInch,
  RenderingCancelledException,
  setLayerDimensions,
  shadow,
  stopEvent,
  TextLayer,
  TouchManager,
  UnexpectedResponseException,
  Util,
  VerbosityLevel,
  version,
  XfaLayer
***REMOVED*** = globalThis.pdfjsLib;

;// ./web/event_utils.js
const WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
***REMOVED***;
async function waitOnEventOrTimeout({
  target,
  name,
  delay = 0
***REMOVED******REMOVED*** {
  if (typeof target !== "object" || !(name && typeof name === "string"***REMOVED*** || !(Number.isInteger(delay***REMOVED*** && delay >= 0***REMOVED******REMOVED*** {
    throw new Error("waitOnEventOrTimeout - invalid parameters."***REMOVED***;
  ***REMOVED***
  const {
    promise,
    resolve
  ***REMOVED*** = Promise.withResolvers(***REMOVED***;
  const ac = new AbortController(***REMOVED***;
  function handler(type***REMOVED*** {
    ac.abort(***REMOVED***;
    clearTimeout(timeout***REMOVED***;
    resolve(type***REMOVED***;
  ***REMOVED***
  const evtMethod = target instanceof EventBus ? "_on" : "addEventListener";
  target[evtMethod](name, handler.bind(null, WaitOnType.EVENT***REMOVED***, {
    signal: ac.signal
  ***REMOVED******REMOVED***;
  const timeout = setTimeout(handler.bind(null, WaitOnType.TIMEOUT***REMOVED***, delay***REMOVED***;
  return promise;
***REMOVED***
class EventBus {
  #listeners = Object.create(null***REMOVED***;
  on(eventName, listener, options = null***REMOVED*** {
    this._on(eventName, listener, {
      external: true,
      once: options?.once,
      signal: options?.signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  off(eventName, listener, options = null***REMOVED*** {
    this._off(eventName, listener***REMOVED***;
  ***REMOVED***
  dispatch(eventName, data***REMOVED*** {
    const eventListeners = this.#listeners[eventName];
    if (!eventListeners || eventListeners.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    let externalListeners;
    for (const {
      listener,
      external,
      once
    ***REMOVED*** of eventListeners.slice(0***REMOVED******REMOVED*** {
      if (once***REMOVED*** {
        this._off(eventName, listener***REMOVED***;
      ***REMOVED***
      if (external***REMOVED*** {
        (externalListeners ||= []***REMOVED***.push(listener***REMOVED***;
        continue;
      ***REMOVED***
      listener(data***REMOVED***;
    ***REMOVED***
    if (externalListeners***REMOVED*** {
      for (const listener of externalListeners***REMOVED*** {
        listener(data***REMOVED***;
      ***REMOVED***
      externalListeners = null;
    ***REMOVED***
  ***REMOVED***
  _on(eventName, listener, options = null***REMOVED*** {
    let rmAbort = null;
    if (options?.signal instanceof AbortSignal***REMOVED*** {
      const {
        signal
      ***REMOVED*** = options;
      if (signal.aborted***REMOVED*** {
        console.error("Cannot use an `aborted` signal."***REMOVED***;
        return;
      ***REMOVED***
      const onAbort = (***REMOVED*** => this._off(eventName, listener***REMOVED***;
      rmAbort = (***REMOVED*** => signal.removeEventListener("abort", onAbort***REMOVED***;
      signal.addEventListener("abort", onAbort***REMOVED***;
    ***REMOVED***
    const eventListeners = this.#listeners[eventName] ||= [];
    eventListeners.push({
      listener,
      external: options?.external === true,
      once: options?.once === true,
      rmAbort
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _off(eventName, listener, options = null***REMOVED*** {
    const eventListeners = this.#listeners[eventName];
    if (!eventListeners***REMOVED*** {
      return;
    ***REMOVED***
    for (let i = 0, ii = eventListeners.length; i < ii; i++***REMOVED*** {
      const evt = eventListeners[i];
      if (evt.listener === listener***REMOVED*** {
        evt.rmAbort?.(***REMOVED***;
        eventListeners.splice(i, 1***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class FirefoxEventBus extends EventBus {
  #externalServices;
  #globalEventNames;
  #isInAutomation;
  constructor(globalEventNames, externalServices, isInAutomation***REMOVED*** {
    super(***REMOVED***;
    this.#globalEventNames = globalEventNames;
    this.#externalServices = externalServices;
    this.#isInAutomation = isInAutomation;
  ***REMOVED***
  dispatch(eventName, data***REMOVED*** {
    throw new Error("Not implemented: FirefoxEventBus.dispatch"***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/external_services.js
class BaseExternalServices {
  updateFindControlState(data***REMOVED*** { ***REMOVED***
  updateFindMatchesCount(data***REMOVED*** { ***REMOVED***
  initPassiveLoading(***REMOVED*** { ***REMOVED***
  reportTelemetry(data***REMOVED*** { ***REMOVED***
  async createL10n(***REMOVED*** {
    throw new Error("Not implemented: createL10n"***REMOVED***;
  ***REMOVED***
  createScripting(***REMOVED*** {
    throw new Error("Not implemented: createScripting"***REMOVED***;
  ***REMOVED***
  updateEditorStates(data***REMOVED*** {
    throw new Error("Not implemented: updateEditorStates"***REMOVED***;
  ***REMOVED***
  dispatchGlobalEvent(_event***REMOVED*** { ***REMOVED***
***REMOVED***

;// ./web/preferences.js

class BasePreferences {
  #defaults = Object.freeze({
    altTextLearnMoreUrl: "",
    annotationEditorMode: 0,
    annotationMode: 2,
    cursorToolOnLoad: 0,
    defaultZoomDelay: 400,
    defaultZoomValue: "",
    disablePageLabels: false,
    enableAltText: false,
    enableAltTextModelDownload: true,
    enableGuessAltText: true,
    enableHighlightFloatingButton: false,
    enableNewAltTextWhenAddingImage: true,
    enablePermissions: false,
    enablePrintAutoRotate: true,
    enableScripting: true,
    enableUpdatedAddImage: false,
    externalLinkTarget: 0,
    highlightEditorColors: "yellow=#FFFF98,green=#53FFBC,blue=#80EBFF,pink=#FFCBE6,red=#FF4F5F",
    historyUpdateUrl: false,
    ignoreDestinationZoom: false,
    forcePageColors: false,
    pageColorsBackground: "Canvas",
    pageColorsForeground: "CanvasText",
    pdfBugEnabled: false,
    sidebarViewOnLoad: -1,
    scrollModeOnLoad: -1,
    spreadModeOnLoad: -1,
    textLayerMode: 1,
    viewOnLoad: 0,
    disableAutoFetch: false,
    disableFontFace: false,
    disableRange: false,
    disableStream: false,
    enableHWA: true,
    enableXfa: true,
    viewerCssTheme: 0
  ***REMOVED******REMOVED***;
  #initializedPromise = null;
  constructor(***REMOVED*** {
    this.#initializedPromise = this._readFromStorage(this.#defaults***REMOVED***.then(({
      browserPrefs,
      prefs
    ***REMOVED******REMOVED*** => {
      if (AppOptions._checkDisablePreferences(***REMOVED******REMOVED*** {
        return;
      ***REMOVED***
      AppOptions.setAll({
        ...browserPrefs,
        ...prefs
      ***REMOVED***, true***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async _writeToStorage(prefObj***REMOVED*** {
    throw new Error("Not implemented: _writeToStorage"***REMOVED***;
  ***REMOVED***
  async _readFromStorage(prefObj***REMOVED*** {
    throw new Error("Not implemented: _readFromStorage"***REMOVED***;
  ***REMOVED***
  async reset(***REMOVED*** {
    await this.#initializedPromise;
    AppOptions.setAll(this.#defaults, true***REMOVED***;
    await this._writeToStorage(this.#defaults***REMOVED***;
  ***REMOVED***
  async set(name, value***REMOVED*** {
    await this.#initializedPromise;
    AppOptions.setAll({
      [name]: value
    ***REMOVED***, true***REMOVED***;
    await this._writeToStorage(AppOptions.getAll(OptionKind.PREFERENCE***REMOVED******REMOVED***;
  ***REMOVED***
  async get(name***REMOVED*** {
    await this.#initializedPromise;
    return AppOptions.get(name***REMOVED***;
  ***REMOVED***
  get initializedPromise(***REMOVED*** {
    return this.#initializedPromise;
  ***REMOVED***
***REMOVED***

;// ./node_modules/@fluent/bundle/esm/types.js
class FluentType {
  constructor(value***REMOVED*** {
    this.value = value;
  ***REMOVED***
  valueOf(***REMOVED*** {
    return this.value;
  ***REMOVED***
***REMOVED***
class FluentNone extends FluentType {
  constructor(value = "???"***REMOVED*** {
    super(value***REMOVED***;
  ***REMOVED***
  toString(scope***REMOVED*** {
    return `{${this.value***REMOVED******REMOVED***`;
  ***REMOVED***
***REMOVED***
class FluentNumber extends FluentType {
  constructor(value, opts = {***REMOVED******REMOVED*** {
    super(value***REMOVED***;
    this.opts = opts;
  ***REMOVED***
  toString(scope***REMOVED*** {
  ***REMOVED***
      const nf = scope.memoizeIntlObject(Intl.NumberFormat, this.opts***REMOVED***;
      return nf.format(this.value***REMOVED***;
    ***REMOVED*** catch (err***REMOVED*** {
      scope.reportError(err***REMOVED***;
      return this.value.toString(10***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class FluentDateTime extends FluentType {
  constructor(value, opts = {***REMOVED******REMOVED*** {
    super(value***REMOVED***;
    this.opts = opts;
  ***REMOVED***
  toString(scope***REMOVED*** {
  ***REMOVED***
      const dtf = scope.memoizeIntlObject(Intl.DateTimeFormat, this.opts***REMOVED***;
      return dtf.format(this.value***REMOVED***;
    ***REMOVED*** catch (err***REMOVED*** {
      scope.reportError(err***REMOVED***;
      return new Date(this.value***REMOVED***.toISOString(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/resolver.js

const MAX_PLACEABLES = 100;
const FSI = "\u2068";
const PDI = "\u2069";
function match(scope, selector, key***REMOVED*** {
  if (key === selector***REMOVED*** {
    return true;
  ***REMOVED***
  if (key instanceof FluentNumber && selector instanceof FluentNumber && key.value === selector.value***REMOVED*** {
    return true;
  ***REMOVED***
  if (selector instanceof FluentNumber && typeof key === "string"***REMOVED*** {
    let category = scope.memoizeIntlObject(Intl.PluralRules, selector.opts***REMOVED***.select(selector.value***REMOVED***;
    if (key === category***REMOVED*** {
      return true;
    ***REMOVED***
  ***REMOVED***
  return false;
***REMOVED***
function getDefault(scope, variants, star***REMOVED*** {
  if (variants[star]***REMOVED*** {
    return resolvePattern(scope, variants[star].value***REMOVED***;
  ***REMOVED***
  scope.reportError(new RangeError("No default"***REMOVED******REMOVED***;
  return new FluentNone(***REMOVED***;
***REMOVED***
function getArguments(scope, args***REMOVED*** {
  const positional = [];
  const named = Object.create(null***REMOVED***;
  for (const arg of args***REMOVED*** {
    if (arg.type === "narg"***REMOVED*** {
      named[arg.name] = resolveExpression(scope, arg.value***REMOVED***;
    ***REMOVED*** else {
      positional.push(resolveExpression(scope, arg***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return {
    positional,
    named
  ***REMOVED***;
***REMOVED***
function resolveExpression(scope, expr***REMOVED*** {
  switch (expr.type***REMOVED*** {
    case "str":
      return expr.value;
    case "num":
      return new FluentNumber(expr.value, {
        minimumFractionDigits: expr.precision
      ***REMOVED******REMOVED***;
    case "var":
      return resolveVariableReference(scope, expr***REMOVED***;
    case "mesg":
      return resolveMessageReference(scope, expr***REMOVED***;
    case "term":
      return resolveTermReference(scope, expr***REMOVED***;
    case "func":
      return resolveFunctionReference(scope, expr***REMOVED***;
    case "select":
      return resolveSelectExpression(scope, expr***REMOVED***;
    default:
      return new FluentNone(***REMOVED***;
  ***REMOVED***
***REMOVED***
function resolveVariableReference(scope, {
  name
***REMOVED******REMOVED*** {
  let arg;
  if (scope.params***REMOVED*** {
    if (Object.prototype.hasOwnProperty.call(scope.params, name***REMOVED******REMOVED*** {
      arg = scope.params[name];
    ***REMOVED*** else {
      return new FluentNone(`$${name***REMOVED***`***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else if (scope.args && Object.prototype.hasOwnProperty.call(scope.args, name***REMOVED******REMOVED*** {
    arg = scope.args[name];
  ***REMOVED*** else {
    scope.reportError(new ReferenceError(`Unknown variable: $${name***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(`$${name***REMOVED***`***REMOVED***;
  ***REMOVED***
  if (arg instanceof FluentType***REMOVED*** {
    return arg;
  ***REMOVED***
  switch (typeof arg***REMOVED*** {
    case "string":
      return arg;
    case "number":
      return new FluentNumber(arg***REMOVED***;
    case "object":
      if (arg instanceof Date***REMOVED*** {
        return new FluentDateTime(arg.getTime(***REMOVED******REMOVED***;
      ***REMOVED***
    default:
      scope.reportError(new TypeError(`Variable type not supported: $${name***REMOVED***, ${typeof arg***REMOVED***`***REMOVED******REMOVED***;
      return new FluentNone(`$${name***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
function resolveMessageReference(scope, {
  name,
  attr
***REMOVED******REMOVED*** {
  const message = scope.bundle._messages.get(name***REMOVED***;
  if (!message***REMOVED*** {
    scope.reportError(new ReferenceError(`Unknown message: ${name***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(name***REMOVED***;
  ***REMOVED***
  if (attr***REMOVED*** {
    const attribute = message.attributes[attr];
    if (attribute***REMOVED*** {
      return resolvePattern(scope, attribute***REMOVED***;
    ***REMOVED***
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(`${name***REMOVED***.${attr***REMOVED***`***REMOVED***;
  ***REMOVED***
  if (message.value***REMOVED*** {
    return resolvePattern(scope, message.value***REMOVED***;
  ***REMOVED***
  scope.reportError(new ReferenceError(`No value: ${name***REMOVED***`***REMOVED******REMOVED***;
  return new FluentNone(name***REMOVED***;
***REMOVED***
function resolveTermReference(scope, {
  name,
  attr,
  args
***REMOVED******REMOVED*** {
  const id = `-${name***REMOVED***`;
  const term = scope.bundle._terms.get(id***REMOVED***;
  if (!term***REMOVED*** {
    scope.reportError(new ReferenceError(`Unknown term: ${id***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(id***REMOVED***;
  ***REMOVED***
  if (attr***REMOVED*** {
    const attribute = term.attributes[attr];
    if (attribute***REMOVED*** {
      scope.params = getArguments(scope, args***REMOVED***.named;
      const resolved = resolvePattern(scope, attribute***REMOVED***;
      scope.params = null;
      return resolved;
    ***REMOVED***
    scope.reportError(new ReferenceError(`Unknown attribute: ${attr***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(`${id***REMOVED***.${attr***REMOVED***`***REMOVED***;
  ***REMOVED***
  scope.params = getArguments(scope, args***REMOVED***.named;
  const resolved = resolvePattern(scope, term.value***REMOVED***;
  scope.params = null;
  return resolved;
***REMOVED***
function resolveFunctionReference(scope, {
  name,
  args
***REMOVED******REMOVED*** {
  let func = scope.bundle._functions[name];
  if (!func***REMOVED*** {
    scope.reportError(new ReferenceError(`Unknown function: ${name***REMOVED***(***REMOVED***`***REMOVED******REMOVED***;
    return new FluentNone(`${name***REMOVED***(***REMOVED***`***REMOVED***;
  ***REMOVED***
  if (typeof func !== "function"***REMOVED*** {
    scope.reportError(new TypeError(`Function ${name***REMOVED***(***REMOVED*** is not callable`***REMOVED******REMOVED***;
    return new FluentNone(`${name***REMOVED***(***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
    let resolved = getArguments(scope, args***REMOVED***;
    return func(resolved.positional, resolved.named***REMOVED***;
  ***REMOVED*** catch (err***REMOVED*** {
    scope.reportError(err***REMOVED***;
    return new FluentNone(`${name***REMOVED***(***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
function resolveSelectExpression(scope, {
  selector,
  variants,
  star
***REMOVED******REMOVED*** {
  let sel = resolveExpression(scope, selector***REMOVED***;
  if (sel instanceof FluentNone***REMOVED*** {
    return getDefault(scope, variants, star***REMOVED***;
  ***REMOVED***
  for (const variant of variants***REMOVED*** {
    const key = resolveExpression(scope, variant.key***REMOVED***;
    if (match(scope, sel, key***REMOVED******REMOVED*** {
      return resolvePattern(scope, variant.value***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return getDefault(scope, variants, star***REMOVED***;
***REMOVED***
function resolveComplexPattern(scope, ptn***REMOVED*** {
  if (scope.dirty.has(ptn***REMOVED******REMOVED*** {
    scope.reportError(new RangeError("Cyclic reference"***REMOVED******REMOVED***;
    return new FluentNone(***REMOVED***;
  ***REMOVED***
  scope.dirty.add(ptn***REMOVED***;
  const result = [];
  const useIsolating = scope.bundle._useIsolating && ptn.length > 1;
  for (const elem of ptn***REMOVED*** {
    if (typeof elem === "string"***REMOVED*** {
      result.push(scope.bundle._transform(elem***REMOVED******REMOVED***;
      continue;
    ***REMOVED***
    scope.placeables++;
    if (scope.placeables > MAX_PLACEABLES***REMOVED*** {
      scope.dirty.delete(ptn***REMOVED***;
      throw new RangeError(`Too many placeables expanded: ${scope.placeables***REMOVED***, ` + `max allowed is ${MAX_PLACEABLES***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (useIsolating***REMOVED*** {
      result.push(FSI***REMOVED***;
    ***REMOVED***
    result.push(resolveExpression(scope, elem***REMOVED***.toString(scope***REMOVED******REMOVED***;
    if (useIsolating***REMOVED*** {
      result.push(PDI***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  scope.dirty.delete(ptn***REMOVED***;
  return result.join(""***REMOVED***;
***REMOVED***
function resolvePattern(scope, value***REMOVED*** {
  if (typeof value === "string"***REMOVED*** {
    return scope.bundle._transform(value***REMOVED***;
  ***REMOVED***
  return resolveComplexPattern(scope, value***REMOVED***;
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/scope.js
class Scope {
  constructor(bundle, errors, args***REMOVED*** {
    this.dirty = new WeakSet(***REMOVED***;
    this.params = null;
    this.placeables = 0;
    this.bundle = bundle;
    this.errors = errors;
    this.args = args;
  ***REMOVED***
  reportError(error***REMOVED*** {
    if (!this.errors || !(error instanceof Error***REMOVED******REMOVED*** {
  ***REMOVED***;
    ***REMOVED***
    this.errors.push(error***REMOVED***;
  ***REMOVED***
  memoizeIntlObject(ctor, opts***REMOVED*** {
    let cache = this.bundle._intls.get(ctor***REMOVED***;
    if (!cache***REMOVED*** {
      cache = {***REMOVED***;
      this.bundle._intls.set(ctor, cache***REMOVED***;
    ***REMOVED***
    let id = JSON.stringify(opts***REMOVED***;
    if (!cache[id]***REMOVED*** {
      cache[id] = new ctor(this.bundle.locales, opts***REMOVED***;
    ***REMOVED***
    return cache[id];
  ***REMOVED***
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/builtins.js

function values(opts, allowed***REMOVED*** {
  const unwrapped = Object.create(null***REMOVED***;
  for (const [name, opt] of Object.entries(opts***REMOVED******REMOVED*** {
    if (allowed.includes(name***REMOVED******REMOVED*** {
      unwrapped[name] = opt.valueOf(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return unwrapped;
***REMOVED***
const NUMBER_ALLOWED = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
function NUMBER(args, opts***REMOVED*** {
  let arg = args[0];
  if (arg instanceof FluentNone***REMOVED*** {
    return new FluentNone(`NUMBER(${arg.valueOf(***REMOVED******REMOVED******REMOVED***`***REMOVED***;
  ***REMOVED***
  if (arg instanceof FluentNumber***REMOVED*** {
    return new FluentNumber(arg.valueOf(***REMOVED***, {
      ...arg.opts,
      ...values(opts, NUMBER_ALLOWED***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  if (arg instanceof FluentDateTime***REMOVED*** {
    return new FluentNumber(arg.valueOf(***REMOVED***, {
      ...values(opts, NUMBER_ALLOWED***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  throw new TypeError("Invalid argument to NUMBER"***REMOVED***;
***REMOVED***
const DATETIME_ALLOWED = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];
function DATETIME(args, opts***REMOVED*** {
  let arg = args[0];
  if (arg instanceof FluentNone***REMOVED*** {
    return new FluentNone(`DATETIME(${arg.valueOf(***REMOVED******REMOVED******REMOVED***`***REMOVED***;
  ***REMOVED***
  if (arg instanceof FluentDateTime***REMOVED*** {
    return new FluentDateTime(arg.valueOf(***REMOVED***, {
      ...arg.opts,
      ...values(opts, DATETIME_ALLOWED***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  if (arg instanceof FluentNumber***REMOVED*** {
    return new FluentDateTime(arg.valueOf(***REMOVED***, {
      ...values(opts, DATETIME_ALLOWED***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  throw new TypeError("Invalid argument to DATETIME"***REMOVED***;
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/memoizer.js
const cache = new Map(***REMOVED***;
function getMemoizerForLocale(locales***REMOVED*** {
  const stringLocale = Array.isArray(locales***REMOVED*** ? locales.join(" "***REMOVED*** : locales;
  let memoizer = cache.get(stringLocale***REMOVED***;
  if (memoizer === undefined***REMOVED*** {
    memoizer = new Map(***REMOVED***;
    cache.set(stringLocale, memoizer***REMOVED***;
  ***REMOVED***
  return memoizer;
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/bundle.js





class FluentBundle {
  constructor(locales, {
    functions,
    useIsolating = true,
    transform = v => v
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    this._terms = new Map(***REMOVED***;
    this._messages = new Map(***REMOVED***;
    this.locales = Array.isArray(locales***REMOVED*** ? locales : [locales];
    this._functions = {
      NUMBER: NUMBER,
      DATETIME: DATETIME,
      ...functions
    ***REMOVED***;
    this._useIsolating = useIsolating;
    this._transform = transform;
    this._intls = getMemoizerForLocale(locales***REMOVED***;
  ***REMOVED***
  hasMessage(id***REMOVED*** {
    return this._messages.has(id***REMOVED***;
  ***REMOVED***
  getMessage(id***REMOVED*** {
    return this._messages.get(id***REMOVED***;
  ***REMOVED***
  addResource(res, {
    allowOverrides = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const errors = [];
    for (let i = 0; i < res.body.length; i++***REMOVED*** {
      let entry = res.body[i];
      if (entry.id.startsWith("-"***REMOVED******REMOVED*** {
        if (allowOverrides === false && this._terms.has(entry.id***REMOVED******REMOVED*** {
          errors.push(new Error(`Attempt to override an existing term: "${entry.id***REMOVED***"`***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        this._terms.set(entry.id, entry***REMOVED***;
      ***REMOVED*** else {
        if (allowOverrides === false && this._messages.has(entry.id***REMOVED******REMOVED*** {
          errors.push(new Error(`Attempt to override an existing message: "${entry.id***REMOVED***"`***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        this._messages.set(entry.id, entry***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return errors;
  ***REMOVED***
  formatPattern(pattern, args = null, errors = null***REMOVED*** {
    if (typeof pattern === "string"***REMOVED*** {
      return this._transform(pattern***REMOVED***;
    ***REMOVED***
    let scope = new Scope(this, errors, args***REMOVED***;
  ***REMOVED***
      let value = resolveComplexPattern(scope, pattern***REMOVED***;
      return value.toString(scope***REMOVED***;
    ***REMOVED*** catch (err***REMOVED*** {
      if (scope.errors && err instanceof Error***REMOVED*** {
        scope.errors.push(err***REMOVED***;
        return new FluentNone(***REMOVED***.toString(scope***REMOVED***;
      ***REMOVED***
      throw err;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/resource.js
const RE_MESSAGE_START = /^(-?[a-zA-Z][\w-]****REMOVED*** *= */gm;
const RE_ATTRIBUTE_START = /\.([a-zA-Z][\w-]****REMOVED*** *= */y;
const RE_VARIANT_START = /\*?\[/y;
const RE_NUMBER_LITERAL = /(-?[0-9]+(?:\.([0-9]+***REMOVED******REMOVED***?***REMOVED***/y;
const RE_IDENTIFIER = /([a-zA-Z][\w-]****REMOVED***/y;
const RE_REFERENCE = /([$-]***REMOVED***?([a-zA-Z][\w-]****REMOVED***(?:\.([a-zA-Z][\w-]****REMOVED******REMOVED***?/y;
const RE_FUNCTION_NAME = /^[A-Z][A-Z0-9_-]*$/;
const RE_TEXT_RUN = /([^{***REMOVED***\n\r]+***REMOVED***/y;
const RE_STRING_RUN = /([^\\"\n\r]****REMOVED***/y;
const RE_STRING_ESCAPE = /\\([\\"]***REMOVED***/y;
const RE_UNICODE_ESCAPE = /\\u([a-fA-F0-9]{4***REMOVED******REMOVED***|\\U([a-fA-F0-9]{6***REMOVED******REMOVED***/y;
const RE_LEADING_NEWLINES = /^\n+/;
const RE_TRAILING_SPACES = / +$/;
const RE_BLANK_LINES = / *\r?\n/g;
const RE_INDENT = /( ****REMOVED***$/;
const TOKEN_BRACE_OPEN = /{\s*/y;
const TOKEN_BRACE_CLOSE = /\s****REMOVED***/y;
const TOKEN_BRACKET_OPEN = /\[\s*/y;
const TOKEN_BRACKET_CLOSE = /\s*] */y;
const TOKEN_PAREN_OPEN = /\s*\(\s*/y;
const TOKEN_ARROW = /\s*->\s*/y;
const TOKEN_COLON = /\s*:\s*/y;
const TOKEN_COMMA = /\s*,?\s*/y;
const TOKEN_BLANK = /\s+/y;
class FluentResource {
  constructor(source***REMOVED*** {
    this.body = [];
    RE_MESSAGE_START.lastIndex = 0;
    let cursor = 0;
    while (true***REMOVED*** {
      let next = RE_MESSAGE_START.exec(source***REMOVED***;
      if (next === null***REMOVED*** {
        break;
      ***REMOVED***
      cursor = RE_MESSAGE_START.lastIndex;
    ***REMOVED***
        this.body.push(parseMessage(next[1]***REMOVED******REMOVED***;
      ***REMOVED*** catch (err***REMOVED*** {
        if (err instanceof SyntaxError***REMOVED*** {
          continue;
        ***REMOVED***
        throw err;
      ***REMOVED***
    ***REMOVED***
    function test(re***REMOVED*** {
      re.lastIndex = cursor;
      return re.test(source***REMOVED***;
    ***REMOVED***
    function consumeChar(char, errorClass***REMOVED*** {
      if (source[cursor] === char***REMOVED*** {
        cursor++;
        return true;
      ***REMOVED***
      if (errorClass***REMOVED*** {
        throw new errorClass(`Expected ${char***REMOVED***`***REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***
    function consumeToken(re, errorClass***REMOVED*** {
      if (test(re***REMOVED******REMOVED*** {
        cursor = re.lastIndex;
        return true;
      ***REMOVED***
      if (errorClass***REMOVED*** {
        throw new errorClass(`Expected ${re.toString(***REMOVED******REMOVED***`***REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***
    function match(re***REMOVED*** {
      re.lastIndex = cursor;
      let result = re.exec(source***REMOVED***;
      if (result === null***REMOVED*** {
        throw new SyntaxError(`Expected ${re.toString(***REMOVED******REMOVED***`***REMOVED***;
      ***REMOVED***
      cursor = re.lastIndex;
      return result;
    ***REMOVED***
    function match1(re***REMOVED*** {
      return match(re***REMOVED***[1];
    ***REMOVED***
    function parseMessage(id***REMOVED*** {
      let value = parsePattern(***REMOVED***;
      let attributes = parseAttributes(***REMOVED***;
      if (value === null && Object.keys(attributes***REMOVED***.length === 0***REMOVED*** {
        throw new SyntaxError("Expected message value or attributes"***REMOVED***;
      ***REMOVED***
  ***REMOVED***
        id,
        value,
        attributes
      ***REMOVED***;
    ***REMOVED***
    function parseAttributes(***REMOVED*** {
      let attrs = Object.create(null***REMOVED***;
      while (test(RE_ATTRIBUTE_START***REMOVED******REMOVED*** {
        let name = match1(RE_ATTRIBUTE_START***REMOVED***;
        let value = parsePattern(***REMOVED***;
        if (value === null***REMOVED*** {
          throw new SyntaxError("Expected attribute value"***REMOVED***;
        ***REMOVED***
        attrs[name] = value;
      ***REMOVED***
      return attrs;
    ***REMOVED***
    function parsePattern(***REMOVED*** {
      let first;
      if (test(RE_TEXT_RUN***REMOVED******REMOVED*** {
        first = match1(RE_TEXT_RUN***REMOVED***;
      ***REMOVED***
      if (source[cursor] === "{" || source[cursor] === "***REMOVED***"***REMOVED*** {
        return parsePatternElements(first ? [first] : [], Infinity***REMOVED***;
      ***REMOVED***
      let indent = parseIndent(***REMOVED***;
      if (indent***REMOVED*** {
        if (first***REMOVED*** {
          return parsePatternElements([first, indent], indent.length***REMOVED***;
        ***REMOVED***
        indent.value = trim(indent.value, RE_LEADING_NEWLINES***REMOVED***;
        return parsePatternElements([indent], indent.length***REMOVED***;
      ***REMOVED***
      if (first***REMOVED*** {
        return trim(first, RE_TRAILING_SPACES***REMOVED***;
      ***REMOVED***
      return null;
    ***REMOVED***
    function parsePatternElements(elements = [], commonIndent***REMOVED*** {
      while (true***REMOVED*** {
        if (test(RE_TEXT_RUN***REMOVED******REMOVED*** {
          elements.push(match1(RE_TEXT_RUN***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        if (source[cursor] === "{"***REMOVED*** {
          elements.push(parsePlaceable(***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        if (source[cursor] === "***REMOVED***"***REMOVED*** {
          throw new SyntaxError("Unbalanced closing brace"***REMOVED***;
        ***REMOVED***
        let indent = parseIndent(***REMOVED***;
        if (indent***REMOVED*** {
          elements.push(indent***REMOVED***;
          commonIndent = Math.min(commonIndent, indent.length***REMOVED***;
          continue;
        ***REMOVED***
        break;
      ***REMOVED***
      let lastIndex = elements.length - 1;
      let lastElement = elements[lastIndex];
      if (typeof lastElement === "string"***REMOVED*** {
        elements[lastIndex] = trim(lastElement, RE_TRAILING_SPACES***REMOVED***;
      ***REMOVED***
      let baked = [];
      for (let element of elements***REMOVED*** {
        if (element instanceof Indent***REMOVED*** {
          element = element.value.slice(0, element.value.length - commonIndent***REMOVED***;
        ***REMOVED***
        if (element***REMOVED*** {
          baked.push(element***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      return baked;
    ***REMOVED***
    function parsePlaceable(***REMOVED*** {
      consumeToken(TOKEN_BRACE_OPEN, SyntaxError***REMOVED***;
      let selector = parseInlineExpression(***REMOVED***;
      if (consumeToken(TOKEN_BRACE_CLOSE***REMOVED******REMOVED*** {
        return selector;
      ***REMOVED***
      if (consumeToken(TOKEN_ARROW***REMOVED******REMOVED*** {
        let variants = parseVariants(***REMOVED***;
        consumeToken(TOKEN_BRACE_CLOSE, SyntaxError***REMOVED***;
    ***REMOVED***
          type: "select",
          selector,
          ...variants
        ***REMOVED***;
      ***REMOVED***
      throw new SyntaxError("Unclosed placeable"***REMOVED***;
    ***REMOVED***
    function parseInlineExpression(***REMOVED*** {
      if (source[cursor] === "{"***REMOVED*** {
        return parsePlaceable(***REMOVED***;
      ***REMOVED***
      if (test(RE_REFERENCE***REMOVED******REMOVED*** {
        let [, sigil, name, attr = null] = match(RE_REFERENCE***REMOVED***;
        if (sigil === "$"***REMOVED*** {
      ***REMOVED***
            type: "var",
            name
          ***REMOVED***;
        ***REMOVED***
        if (consumeToken(TOKEN_PAREN_OPEN***REMOVED******REMOVED*** {
          let args = parseArguments(***REMOVED***;
          if (sigil === "-"***REMOVED*** {
        ***REMOVED***
              type: "term",
              name,
              attr,
              args
            ***REMOVED***;
          ***REMOVED***
          if (RE_FUNCTION_NAME.test(name***REMOVED******REMOVED*** {
        ***REMOVED***
              type: "func",
              name,
              args
            ***REMOVED***;
          ***REMOVED***
          throw new SyntaxError("Function names must be all upper-case"***REMOVED***;
        ***REMOVED***
        if (sigil === "-"***REMOVED*** {
      ***REMOVED***
            type: "term",
            name,
            attr,
            args: []
          ***REMOVED***;
        ***REMOVED***
    ***REMOVED***
          type: "mesg",
          name,
          attr
        ***REMOVED***;
      ***REMOVED***
      return parseLiteral(***REMOVED***;
    ***REMOVED***
    function parseArguments(***REMOVED*** {
      let args = [];
      while (true***REMOVED*** {
        switch (source[cursor]***REMOVED*** {
          case "***REMOVED***":
            cursor++;
            return args;
          case undefined:
            throw new SyntaxError("Unclosed argument list"***REMOVED***;
        ***REMOVED***
        args.push(parseArgument(***REMOVED******REMOVED***;
        consumeToken(TOKEN_COMMA***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    function parseArgument(***REMOVED*** {
      let expr = parseInlineExpression(***REMOVED***;
      if (expr.type !== "mesg"***REMOVED*** {
        return expr;
      ***REMOVED***
      if (consumeToken(TOKEN_COLON***REMOVED******REMOVED*** {
    ***REMOVED***
          type: "narg",
          name: expr.name,
          value: parseLiteral(***REMOVED***
        ***REMOVED***;
      ***REMOVED***
      return expr;
    ***REMOVED***
    function parseVariants(***REMOVED*** {
      let variants = [];
      let count = 0;
      let star;
      while (test(RE_VARIANT_START***REMOVED******REMOVED*** {
        if (consumeChar("*"***REMOVED******REMOVED*** {
          star = count;
        ***REMOVED***
        let key = parseVariantKey(***REMOVED***;
        let value = parsePattern(***REMOVED***;
        if (value === null***REMOVED*** {
          throw new SyntaxError("Expected variant value"***REMOVED***;
        ***REMOVED***
        variants[count++] = {
          key,
          value
        ***REMOVED***;
      ***REMOVED***
      if (count === 0***REMOVED*** {
        return null;
      ***REMOVED***
      if (star === undefined***REMOVED*** {
        throw new SyntaxError("Expected default variant"***REMOVED***;
      ***REMOVED***
  ***REMOVED***
        variants,
        star
      ***REMOVED***;
    ***REMOVED***
    function parseVariantKey(***REMOVED*** {
      consumeToken(TOKEN_BRACKET_OPEN, SyntaxError***REMOVED***;
      let key;
      if (test(RE_NUMBER_LITERAL***REMOVED******REMOVED*** {
        key = parseNumberLiteral(***REMOVED***;
      ***REMOVED*** else {
        key = {
          type: "str",
          value: match1(RE_IDENTIFIER***REMOVED***
        ***REMOVED***;
      ***REMOVED***
      consumeToken(TOKEN_BRACKET_CLOSE, SyntaxError***REMOVED***;
      return key;
    ***REMOVED***
    function parseLiteral(***REMOVED*** {
      if (test(RE_NUMBER_LITERAL***REMOVED******REMOVED*** {
        return parseNumberLiteral(***REMOVED***;
      ***REMOVED***
      if (source[cursor] === '"'***REMOVED*** {
        return parseStringLiteral(***REMOVED***;
      ***REMOVED***
      throw new SyntaxError("Invalid expression"***REMOVED***;
    ***REMOVED***
    function parseNumberLiteral(***REMOVED*** {
      let [, value, fraction = ""] = match(RE_NUMBER_LITERAL***REMOVED***;
      let precision = fraction.length;
  ***REMOVED***
        type: "num",
        value: parseFloat(value***REMOVED***,
        precision
      ***REMOVED***;
    ***REMOVED***
    function parseStringLiteral(***REMOVED*** {
      consumeChar('"', SyntaxError***REMOVED***;
      let value = "";
      while (true***REMOVED*** {
        value += match1(RE_STRING_RUN***REMOVED***;
        if (source[cursor] === "\\"***REMOVED*** {
          value += parseEscapeSequence(***REMOVED***;
          continue;
        ***REMOVED***
        if (consumeChar('"'***REMOVED******REMOVED*** {
      ***REMOVED***
            type: "str",
            value
          ***REMOVED***;
        ***REMOVED***
        throw new SyntaxError("Unclosed string literal"***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    function parseEscapeSequence(***REMOVED*** {
      if (test(RE_STRING_ESCAPE***REMOVED******REMOVED*** {
        return match1(RE_STRING_ESCAPE***REMOVED***;
      ***REMOVED***
      if (test(RE_UNICODE_ESCAPE***REMOVED******REMOVED*** {
        let [, codepoint4, codepoint6] = match(RE_UNICODE_ESCAPE***REMOVED***;
        let codepoint = parseInt(codepoint4 || codepoint6, 16***REMOVED***;
        return codepoint <= 0xd7ff || 0xe000 <= codepoint ? String.fromCodePoint(codepoint***REMOVED*** : "�";
      ***REMOVED***
      throw new SyntaxError("Unknown escape sequence"***REMOVED***;
    ***REMOVED***
    function parseIndent(***REMOVED*** {
      let start = cursor;
      consumeToken(TOKEN_BLANK***REMOVED***;
      switch (source[cursor]***REMOVED*** {
        case ".":
        case "[":
        case "*":
        case "***REMOVED***":
        case undefined:
          return false;
        case "{":
          return makeIndent(source.slice(start, cursor***REMOVED******REMOVED***;
      ***REMOVED***
      if (source[cursor - 1] === " "***REMOVED*** {
        return makeIndent(source.slice(start, cursor***REMOVED******REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***
    function trim(text, re***REMOVED*** {
      return text.replace(re, ""***REMOVED***;
    ***REMOVED***
    function makeIndent(blank***REMOVED*** {
      let value = blank.replace(RE_BLANK_LINES, "\n"***REMOVED***;
      let length = RE_INDENT.exec(blank***REMOVED***[1].length;
      return new Indent(value, length***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class Indent {
  constructor(value, length***REMOVED*** {
    this.value = value;
    this.length = length;
  ***REMOVED***
***REMOVED***
;// ./node_modules/@fluent/bundle/esm/index.js



;// ./node_modules/@fluent/dom/esm/overlay.js
const reOverlay = /<|&#?\w+;/;
const TEXT_LEVEL_ELEMENTS = {
  "http://www.w3.org/1999/xhtml": ["em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr"]
***REMOVED***;
const LOCALIZABLE_ATTRIBUTES = {
  "http://www.w3.org/1999/xhtml": {
    global: ["title", "aria-label", "aria-valuetext"],
    a: ["download"],
    area: ["download", "alt"],
    input: ["alt", "placeholder"],
    menuitem: ["label"],
    menu: ["label"],
    optgroup: ["label"],
    option: ["label"],
    track: ["label"],
    img: ["alt"],
    textarea: ["placeholder"],
    th: ["abbr"]
  ***REMOVED***,
  "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul": {
    global: ["accesskey", "aria-label", "aria-valuetext", "label", "title", "tooltiptext"],
    description: ["value"],
    key: ["key", "keycode"],
    label: ["value"],
    textbox: ["placeholder", "value"]
  ***REMOVED***
***REMOVED***;
function translateElement(element, translation***REMOVED*** {
  const {
    value
  ***REMOVED*** = translation;
  if (typeof value === "string"***REMOVED*** {
    if (element.localName === "title" && element.namespaceURI === "http://www.w3.org/1999/xhtml"***REMOVED*** {
      element.textContent = value;
    ***REMOVED*** else if (!reOverlay.test(value***REMOVED******REMOVED*** {
      element.textContent = value;
    ***REMOVED*** else {
      const templateElement = element.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "template"***REMOVED***;
      templateElement.innerHTML = value;
      overlayChildNodes(templateElement.content, element***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  overlayAttributes(translation, element***REMOVED***;
***REMOVED***
function overlayChildNodes(fromFragment, toElement***REMOVED*** {
  for (const childNode of fromFragment.childNodes***REMOVED*** {
    if (childNode.nodeType === childNode.TEXT_NODE***REMOVED*** {
      continue;
    ***REMOVED***
    if (childNode.hasAttribute("data-l10n-name"***REMOVED******REMOVED*** {
      const sanitized = getNodeForNamedElement(toElement, childNode***REMOVED***;
      fromFragment.replaceChild(sanitized, childNode***REMOVED***;
      continue;
    ***REMOVED***
    if (isElementAllowed(childNode***REMOVED******REMOVED*** {
      const sanitized = createSanitizedElement(childNode***REMOVED***;
      fromFragment.replaceChild(sanitized, childNode***REMOVED***;
      continue;
    ***REMOVED***
    console.warn(`An element of forbidden type "${childNode.localName***REMOVED***" was found in ` + "the translation. Only safe text-level elements and elements with " + "data-l10n-name are allowed."***REMOVED***;
    fromFragment.replaceChild(createTextNodeFromTextContent(childNode***REMOVED***, childNode***REMOVED***;
  ***REMOVED***
  toElement.textContent = "";
  toElement.appendChild(fromFragment***REMOVED***;
***REMOVED***
function hasAttribute(attributes, name***REMOVED*** {
  if (!attributes***REMOVED*** {
    return false;
  ***REMOVED***
  for (let attr of attributes***REMOVED*** {
    if (attr.name === name***REMOVED*** {
      return true;
    ***REMOVED***
  ***REMOVED***
  return false;
***REMOVED***
function overlayAttributes(fromElement, toElement***REMOVED*** {
  const explicitlyAllowed = toElement.hasAttribute("data-l10n-attrs"***REMOVED*** ? toElement.getAttribute("data-l10n-attrs"***REMOVED***.split(","***REMOVED***.map(i => i.trim(***REMOVED******REMOVED*** : null;
  for (const attr of Array.from(toElement.attributes***REMOVED******REMOVED*** {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed***REMOVED*** && !hasAttribute(fromElement.attributes, attr.name***REMOVED******REMOVED*** {
      toElement.removeAttribute(attr.name***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  if (!fromElement.attributes***REMOVED*** {
    return;
  ***REMOVED***
  for (const attr of Array.from(fromElement.attributes***REMOVED******REMOVED*** {
    if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed***REMOVED*** && toElement.getAttribute(attr.name***REMOVED*** !== attr.value***REMOVED*** {
      toElement.setAttribute(attr.name, attr.value***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function getNodeForNamedElement(sourceElement, translatedChild***REMOVED*** {
  const childName = translatedChild.getAttribute("data-l10n-name"***REMOVED***;
  const sourceChild = sourceElement.querySelector(`[data-l10n-name="${childName***REMOVED***"]`***REMOVED***;
  if (!sourceChild***REMOVED*** {
    console.warn(`An element named "${childName***REMOVED***" wasn't found in the source.`***REMOVED***;
    return createTextNodeFromTextContent(translatedChild***REMOVED***;
  ***REMOVED***
  if (sourceChild.localName !== translatedChild.localName***REMOVED*** {
    console.warn(`An element named "${childName***REMOVED***" was found in the translation ` + `but its type ${translatedChild.localName***REMOVED*** didn't match the ` + `element found in the source (${sourceChild.localName***REMOVED******REMOVED***.`***REMOVED***;
    return createTextNodeFromTextContent(translatedChild***REMOVED***;
  ***REMOVED***
  sourceElement.removeChild(sourceChild***REMOVED***;
  const clone = sourceChild.cloneNode(false***REMOVED***;
  return shallowPopulateUsing(translatedChild, clone***REMOVED***;
***REMOVED***
function createSanitizedElement(element***REMOVED*** {
  const clone = element.ownerDocument.createElement(element.localName***REMOVED***;
  return shallowPopulateUsing(element, clone***REMOVED***;
***REMOVED***
function createTextNodeFromTextContent(element***REMOVED*** {
  return element.ownerDocument.createTextNode(element.textContent***REMOVED***;
***REMOVED***
function isElementAllowed(element***REMOVED*** {
  const allowed = TEXT_LEVEL_ELEMENTS[element.namespaceURI];
  return allowed && allowed.includes(element.localName***REMOVED***;
***REMOVED***
function isAttrNameLocalizable(name, element, explicitlyAllowed = null***REMOVED*** {
  if (explicitlyAllowed && explicitlyAllowed.includes(name***REMOVED******REMOVED*** {
    return true;
  ***REMOVED***
  const allowed = LOCALIZABLE_ATTRIBUTES[element.namespaceURI];
  if (!allowed***REMOVED*** {
    return false;
  ***REMOVED***
  const attrName = name.toLowerCase(***REMOVED***;
  const elemName = element.localName;
  if (allowed.global.includes(attrName***REMOVED******REMOVED*** {
    return true;
  ***REMOVED***
  if (!allowed[elemName]***REMOVED*** {
    return false;
  ***REMOVED***
  if (allowed[elemName].includes(attrName***REMOVED******REMOVED*** {
    return true;
  ***REMOVED***
  if (element.namespaceURI === "http://www.w3.org/1999/xhtml" && elemName === "input" && attrName === "value"***REMOVED*** {
    const type = element.type.toLowerCase(***REMOVED***;
    if (type === "submit" || type === "button" || type === "reset"***REMOVED*** {
      return true;
    ***REMOVED***
  ***REMOVED***
  return false;
***REMOVED***
function shallowPopulateUsing(fromElement, toElement***REMOVED*** {
  toElement.textContent = fromElement.textContent;
  overlayAttributes(fromElement, toElement***REMOVED***;
  return toElement;
***REMOVED***
;// ./node_modules/cached-iterable/src/cached_iterable.mjs
class CachedIterable extends Array {
  static from(iterable***REMOVED*** {
    if (iterable instanceof this***REMOVED*** {
      return iterable;
    ***REMOVED***
    return new this(iterable***REMOVED***;
  ***REMOVED***
***REMOVED***
;// ./node_modules/cached-iterable/src/cached_sync_iterable.mjs

class CachedSyncIterable extends CachedIterable {
  constructor(iterable***REMOVED*** {
    super(***REMOVED***;
    if (Symbol.iterator in Object(iterable***REMOVED******REMOVED*** {
      this.iterator = iterable[Symbol.iterator](***REMOVED***;
    ***REMOVED*** else {
      throw new TypeError("Argument must implement the iteration protocol."***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  [Symbol.iterator](***REMOVED*** {
    const cached = this;
    let cur = 0;
***REMOVED***
      next(***REMOVED*** {
        if (cached.length <= cur***REMOVED*** {
          cached.push(cached.iterator.next(***REMOVED******REMOVED***;
        ***REMOVED***
        return cached[cur++];
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  touchNext(count = 1***REMOVED*** {
    let idx = 0;
    while (idx++ < count***REMOVED*** {
      const last = this[this.length - 1];
      if (last && last.done***REMOVED*** {
        break;
      ***REMOVED***
      this.push(this.iterator.next(***REMOVED******REMOVED***;
    ***REMOVED***
    return this[this.length - 1];
  ***REMOVED***
***REMOVED***
;// ./node_modules/cached-iterable/src/cached_async_iterable.mjs

class CachedAsyncIterable extends CachedIterable {
  constructor(iterable***REMOVED*** {
    super(***REMOVED***;
    if (Symbol.asyncIterator in Object(iterable***REMOVED******REMOVED*** {
      this.iterator = iterable[Symbol.asyncIterator](***REMOVED***;
    ***REMOVED*** else if (Symbol.iterator in Object(iterable***REMOVED******REMOVED*** {
      this.iterator = iterable[Symbol.iterator](***REMOVED***;
    ***REMOVED*** else {
      throw new TypeError("Argument must implement the iteration protocol."***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  [Symbol.asyncIterator](***REMOVED*** {
    const cached = this;
    let cur = 0;
***REMOVED***
      async next(***REMOVED*** {
        if (cached.length <= cur***REMOVED*** {
          cached.push(cached.iterator.next(***REMOVED******REMOVED***;
        ***REMOVED***
        return cached[cur++];
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  async touchNext(count = 1***REMOVED*** {
    let idx = 0;
    while (idx++ < count***REMOVED*** {
      const last = this[this.length - 1];
      if (last && (await last***REMOVED***.done***REMOVED*** {
        break;
      ***REMOVED***
      this.push(this.iterator.next(***REMOVED******REMOVED***;
    ***REMOVED***
    return this[this.length - 1];
  ***REMOVED***
***REMOVED***
;// ./node_modules/cached-iterable/src/index.mjs


;// ./node_modules/@fluent/dom/esm/localization.js

class Localization {
  constructor(resourceIds = [], generateBundles***REMOVED*** {
    this.resourceIds = resourceIds;
    this.generateBundles = generateBundles;
    this.onChange(true***REMOVED***;
  ***REMOVED***
  addResourceIds(resourceIds, eager = false***REMOVED*** {
    this.resourceIds.push(...resourceIds***REMOVED***;
    this.onChange(eager***REMOVED***;
    return this.resourceIds.length;
  ***REMOVED***
  removeResourceIds(resourceIds***REMOVED*** {
    this.resourceIds = this.resourceIds.filter(r => !resourceIds.includes(r***REMOVED******REMOVED***;
    this.onChange(***REMOVED***;
    return this.resourceIds.length;
  ***REMOVED***
  async formatWithFallback(keys, method***REMOVED*** {
    const translations = [];
    let hasAtLeastOneBundle = false;
    for await (const bundle of this.bundles***REMOVED*** {
      hasAtLeastOneBundle = true;
      const missingIds = keysFromBundle(method, bundle, keys, translations***REMOVED***;
      if (missingIds.size === 0***REMOVED*** {
        break;
      ***REMOVED***
      if (typeof console !== "undefined"***REMOVED*** {
        const locale = bundle.locales[0];
        const ids = Array.from(missingIds***REMOVED***.join(", "***REMOVED***;
        console.warn(`[fluent] Missing translations in ${locale***REMOVED***: ${ids***REMOVED***`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (!hasAtLeastOneBundle && typeof console !== "undefined"***REMOVED*** {
      console.warn(`[fluent] Request for keys failed because no resource bundles got generated.
  keys: ${JSON.stringify(keys***REMOVED******REMOVED***.
  resourceIds: ${JSON.stringify(this.resourceIds***REMOVED******REMOVED***.`***REMOVED***;
    ***REMOVED***
    return translations;
  ***REMOVED***
  formatMessages(keys***REMOVED*** {
    return this.formatWithFallback(keys, messageFromBundle***REMOVED***;
  ***REMOVED***
  formatValues(keys***REMOVED*** {
    return this.formatWithFallback(keys, valueFromBundle***REMOVED***;
  ***REMOVED***
  async formatValue(id, args***REMOVED*** {
    const [val] = await this.formatValues([{
      id,
      args
    ***REMOVED***]***REMOVED***;
    return val;
  ***REMOVED***
  handleEvent(***REMOVED*** {
    this.onChange(***REMOVED***;
  ***REMOVED***
  onChange(eager = false***REMOVED*** {
    this.bundles = CachedAsyncIterable.from(this.generateBundles(this.resourceIds***REMOVED******REMOVED***;
    if (eager***REMOVED*** {
      this.bundles.touchNext(2***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function valueFromBundle(bundle, errors, message, args***REMOVED*** {
  if (message.value***REMOVED*** {
    return bundle.formatPattern(message.value, args, errors***REMOVED***;
  ***REMOVED***
  return null;
***REMOVED***
function messageFromBundle(bundle, errors, message, args***REMOVED*** {
  const formatted = {
    value: null,
    attributes: null
  ***REMOVED***;
  if (message.value***REMOVED*** {
    formatted.value = bundle.formatPattern(message.value, args, errors***REMOVED***;
  ***REMOVED***
  let attrNames = Object.keys(message.attributes***REMOVED***;
  if (attrNames.length > 0***REMOVED*** {
    formatted.attributes = new Array(attrNames.length***REMOVED***;
    for (let [i, name] of attrNames.entries(***REMOVED******REMOVED*** {
      let value = bundle.formatPattern(message.attributes[name], args, errors***REMOVED***;
      formatted.attributes[i] = {
        name,
        value
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return formatted;
***REMOVED***
function keysFromBundle(method, bundle, keys, translations***REMOVED*** {
  const messageErrors = [];
  const missingIds = new Set(***REMOVED***;
  keys.forEach(({
    id,
    args
  ***REMOVED***, i***REMOVED*** => {
    if (translations[i] !== undefined***REMOVED*** {
      return;
    ***REMOVED***
    let message = bundle.getMessage(id***REMOVED***;
    if (message***REMOVED*** {
      messageErrors.length = 0;
      translations[i] = method(bundle, messageErrors, message, args***REMOVED***;
      if (messageErrors.length > 0 && typeof console !== "undefined"***REMOVED*** {
        const locale = bundle.locales[0];
        const errors = messageErrors.join(", "***REMOVED***;
        console.warn(`[fluent][resolver] errors in ${locale***REMOVED***/${id***REMOVED***: ${errors***REMOVED***.`***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      missingIds.add(id***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
  return missingIds;
***REMOVED***
;// ./node_modules/@fluent/dom/esm/dom_localization.js


const L10NID_ATTR_NAME = "data-l10n-id";
const L10NARGS_ATTR_NAME = "data-l10n-args";
const L10N_ELEMENT_QUERY = `[${L10NID_ATTR_NAME***REMOVED***]`;
class DOMLocalization extends Localization {
  constructor(resourceIds, generateBundles***REMOVED*** {
    super(resourceIds, generateBundles***REMOVED***;
    this.roots = new Set(***REMOVED***;
    this.pendingrAF = null;
    this.pendingElements = new Set(***REMOVED***;
    this.windowElement = null;
    this.mutationObserver = null;
    this.observerConfig = {
      attributes: true,
      characterData: false,
      childList: true,
      subtree: true,
      attributeFilter: [L10NID_ATTR_NAME, L10NARGS_ATTR_NAME]
    ***REMOVED***;
  ***REMOVED***
  onChange(eager = false***REMOVED*** {
    super.onChange(eager***REMOVED***;
    if (this.roots***REMOVED*** {
      this.translateRoots(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setAttributes(element, id, args***REMOVED*** {
    element.setAttribute(L10NID_ATTR_NAME, id***REMOVED***;
    if (args***REMOVED*** {
      element.setAttribute(L10NARGS_ATTR_NAME, JSON.stringify(args***REMOVED******REMOVED***;
    ***REMOVED*** else {
      element.removeAttribute(L10NARGS_ATTR_NAME***REMOVED***;
    ***REMOVED***
    return element;
  ***REMOVED***
  getAttributes(element***REMOVED*** {
***REMOVED***
      id: element.getAttribute(L10NID_ATTR_NAME***REMOVED***,
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME***REMOVED*** || null***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  connectRoot(newRoot***REMOVED*** {
    for (const root of this.roots***REMOVED*** {
      if (root === newRoot || root.contains(newRoot***REMOVED*** || newRoot.contains(root***REMOVED******REMOVED*** {
        throw new Error("Cannot add a root that overlaps with existing root."***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (this.windowElement***REMOVED*** {
      if (this.windowElement !== newRoot.ownerDocument.defaultView***REMOVED*** {
        throw new Error(`Cannot connect a root:
          DOMLocalization already has a root from a different window.`***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      this.windowElement = newRoot.ownerDocument.defaultView;
      this.mutationObserver = new this.windowElement.MutationObserver(mutations => this.translateMutations(mutations***REMOVED******REMOVED***;
    ***REMOVED***
    this.roots.add(newRoot***REMOVED***;
    this.mutationObserver.observe(newRoot, this.observerConfig***REMOVED***;
  ***REMOVED***
  disconnectRoot(root***REMOVED*** {
    this.roots.delete(root***REMOVED***;
    this.pauseObserving(***REMOVED***;
    if (this.roots.size === 0***REMOVED*** {
      this.mutationObserver = null;
      if (this.windowElement && this.pendingrAF***REMOVED*** {
        this.windowElement.cancelAnimationFrame(this.pendingrAF***REMOVED***;
      ***REMOVED***
      this.windowElement = null;
      this.pendingrAF = null;
      this.pendingElements.clear(***REMOVED***;
      return true;
    ***REMOVED***
    this.resumeObserving(***REMOVED***;
    return false;
  ***REMOVED***
  translateRoots(***REMOVED*** {
    const roots = Array.from(this.roots***REMOVED***;
    return Promise.all(roots.map(root => this.translateFragment(root***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  pauseObserving(***REMOVED*** {
    if (!this.mutationObserver***REMOVED*** {
      return;
    ***REMOVED***
    this.translateMutations(this.mutationObserver.takeRecords(***REMOVED******REMOVED***;
    this.mutationObserver.disconnect(***REMOVED***;
  ***REMOVED***
  resumeObserving(***REMOVED*** {
    if (!this.mutationObserver***REMOVED*** {
      return;
    ***REMOVED***
    for (const root of this.roots***REMOVED*** {
      this.mutationObserver.observe(root, this.observerConfig***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  translateMutations(mutations***REMOVED*** {
    for (const mutation of mutations***REMOVED*** {
      switch (mutation.type***REMOVED*** {
        case "attributes":
          if (mutation.target.hasAttribute("data-l10n-id"***REMOVED******REMOVED*** {
            this.pendingElements.add(mutation.target***REMOVED***;
          ***REMOVED***
          break;
        case "childList":
          for (const addedNode of mutation.addedNodes***REMOVED*** {
            if (addedNode.nodeType === addedNode.ELEMENT_NODE***REMOVED*** {
              if (addedNode.childElementCount***REMOVED*** {
                for (const element of this.getTranslatables(addedNode***REMOVED******REMOVED*** {
                  this.pendingElements.add(element***REMOVED***;
                ***REMOVED***
              ***REMOVED*** else if (addedNode.hasAttribute(L10NID_ATTR_NAME***REMOVED******REMOVED*** {
                this.pendingElements.add(addedNode***REMOVED***;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
          break;
      ***REMOVED***
    ***REMOVED***
    if (this.pendingElements.size > 0***REMOVED*** {
      if (this.pendingrAF === null***REMOVED*** {
        this.pendingrAF = this.windowElement.requestAnimationFrame((***REMOVED*** => {
          this.translateElements(Array.from(this.pendingElements***REMOVED******REMOVED***;
          this.pendingElements.clear(***REMOVED***;
          this.pendingrAF = null;
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  translateFragment(frag***REMOVED*** {
    return this.translateElements(this.getTranslatables(frag***REMOVED******REMOVED***;
  ***REMOVED***
  async translateElements(elements***REMOVED*** {
    if (!elements.length***REMOVED*** {
      return undefined;
    ***REMOVED***
    const keys = elements.map(this.getKeysForElement***REMOVED***;
    const translations = await this.formatMessages(keys***REMOVED***;
    return this.applyTranslations(elements, translations***REMOVED***;
  ***REMOVED***
  applyTranslations(elements, translations***REMOVED*** {
    this.pauseObserving(***REMOVED***;
    for (let i = 0; i < elements.length; i++***REMOVED*** {
      if (translations[i] !== undefined***REMOVED*** {
        translateElement(elements[i], translations[i]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.resumeObserving(***REMOVED***;
  ***REMOVED***
  getTranslatables(element***REMOVED*** {
    const nodes = Array.from(element.querySelectorAll(L10N_ELEMENT_QUERY***REMOVED******REMOVED***;
    if (typeof element.hasAttribute === "function" && element.hasAttribute(L10NID_ATTR_NAME***REMOVED******REMOVED*** {
      nodes.push(element***REMOVED***;
    ***REMOVED***
    return nodes;
  ***REMOVED***
  getKeysForElement(element***REMOVED*** {
***REMOVED***
      id: element.getAttribute(L10NID_ATTR_NAME***REMOVED***,
      args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME***REMOVED*** || null***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
;// ./node_modules/@fluent/dom/esm/index.js


;// ./web/l10n.js
class L10n {
  #dir;
  #elements;
  #lang;
  #l10n;
  constructor({
    lang,
    isRTL
  ***REMOVED***, l10n = null***REMOVED*** {
    this.#lang = L10n.#fixupLangCode(lang***REMOVED***;
    this.#l10n = l10n;
    this.#dir = isRTL ?? L10n.#isRTL(this.#lang***REMOVED*** ? "rtl" : "ltr";
  ***REMOVED***
  _setL10n(l10n***REMOVED*** {
    this.#l10n = l10n;
  ***REMOVED***
  getLanguage(***REMOVED*** {
    return this.#lang;
  ***REMOVED***
  getDirection(***REMOVED*** {
    return this.#dir;
  ***REMOVED***
  async get(ids, args = null, fallback***REMOVED*** {
    if (Array.isArray(ids***REMOVED******REMOVED*** {
      ids = ids.map(id => ({
        id
      ***REMOVED******REMOVED******REMOVED***;
      const messages = await this.#l10n.formatMessages(ids***REMOVED***;
      return messages.map(message => message.value***REMOVED***;
    ***REMOVED***
    const messages = await this.#l10n.formatMessages([{
      id: ids,
      args
    ***REMOVED***]***REMOVED***;
    return messages[0]?.value || fallback;
  ***REMOVED***
  async translate(element***REMOVED*** {
    (this.#elements ||= new Set(***REMOVED******REMOVED***.add(element***REMOVED***;
  ***REMOVED***
      this.#l10n.connectRoot(element***REMOVED***;
      await this.#l10n.translateRoots(***REMOVED***;
    ***REMOVED*** catch { ***REMOVED***
  ***REMOVED***
  async translateOnce(element***REMOVED*** {
  ***REMOVED***
      await this.#l10n.translateElements([element]***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("translateOnce:", ex***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async destroy(***REMOVED*** {
    if (this.#elements***REMOVED*** {
      for (const element of this.#elements***REMOVED*** {
        this.#l10n.disconnectRoot(element***REMOVED***;
      ***REMOVED***
      this.#elements.clear(***REMOVED***;
      this.#elements = null;
    ***REMOVED***
    this.#l10n.pauseObserving(***REMOVED***;
  ***REMOVED***
  pause(***REMOVED*** {
    this.#l10n.pauseObserving(***REMOVED***;
  ***REMOVED***
  resume(***REMOVED*** {
    this.#l10n.resumeObserving(***REMOVED***;
  ***REMOVED***
  static #fixupLangCode(langCode***REMOVED*** {
    langCode = langCode?.toLowerCase(***REMOVED*** || "en-us";
    const PARTIAL_LANG_CODES = {
      en: "en-us",
      es: "es-es",
      fy: "fy-nl",
      ga: "ga-ie",
      gu: "gu-in",
      hi: "hi-in",
      hy: "hy-am",
      nb: "nb-no",
      ne: "ne-np",
      nn: "nn-no",
      pa: "pa-in",
      pt: "pt-pt",
      sv: "sv-se",
      zh: "zh-cn"
    ***REMOVED***;
    return PARTIAL_LANG_CODES[langCode] || langCode;
  ***REMOVED***
  static #isRTL(lang***REMOVED*** {
    const shortCode = lang.split("-", 1***REMOVED***[0];
    return ["ar", "he", "fa", "ps", "ur"].includes(shortCode***REMOVED***;
  ***REMOVED***
***REMOVED***
const GenericL10n = null;

;// ./web/genericl10n.js




function createBundle(lang, text***REMOVED*** {
  const resource = new FluentResource(text***REMOVED***;
  const bundle = new FluentBundle(lang***REMOVED***;
  const errors = bundle.addResource(resource***REMOVED***;
  if (errors.length***REMOVED*** {
    console.error("L10n errors", errors***REMOVED***;
  ***REMOVED***
  return bundle;
***REMOVED***
class genericl10n_GenericL10n extends L10n {
  constructor(lang***REMOVED*** {
    super({
      lang
    ***REMOVED******REMOVED***;
    const generateBundles = !lang ? genericl10n_GenericL10n.#generateBundlesFallback.bind(genericl10n_GenericL10n, this.getLanguage(***REMOVED******REMOVED*** : genericl10n_GenericL10n.#generateBundles.bind(genericl10n_GenericL10n, "en-us", this.getLanguage(***REMOVED******REMOVED***;
    this._setL10n(new DOMLocalization([], generateBundles***REMOVED******REMOVED***;
  ***REMOVED***
  static async *#generateBundles(defaultLang, baseLang***REMOVED*** {
    const {
      baseURL,
      paths
    ***REMOVED*** = await this.#getPaths(***REMOVED***;
    const langs = [baseLang];
    if (defaultLang !== baseLang***REMOVED*** {
      const shortLang = baseLang.split("-", 1***REMOVED***[0];
      if (shortLang !== baseLang***REMOVED*** {
        langs.push(shortLang***REMOVED***;
      ***REMOVED***
      langs.push(defaultLang***REMOVED***;
    ***REMOVED***
    for (const lang of langs***REMOVED*** {
      const bundle = await this.#createBundle(lang, baseURL, paths***REMOVED***;
      if (bundle***REMOVED*** {
        yield bundle;
      ***REMOVED*** else if (lang === "en-us"***REMOVED*** {
        yield this.#createBundleFallback(lang***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  static async #createBundle(lang, baseURL, paths***REMOVED*** {
    const path = paths[lang];
    if (!path***REMOVED*** {
      return null;
    ***REMOVED***
    const url = new URL(path, baseURL***REMOVED***;
    const text = await fetchData(url, "text"***REMOVED***;
    return createBundle(lang, text***REMOVED***;
  ***REMOVED***
  static async #getPaths(***REMOVED*** {
  ***REMOVED***
      const {
        href
      ***REMOVED*** = document.querySelector(`link[type="application/l10n"]`***REMOVED***;
      const paths = await fetchData(href, "json"***REMOVED***;
  ***REMOVED***
        baseURL: href.replace(/[^/]*$/, ""***REMOVED*** || "./",
        paths
      ***REMOVED***;
    ***REMOVED*** catch { ***REMOVED***
***REMOVED***
      baseURL: "./",
      paths: Object.create(null***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  static async *#generateBundlesFallback(lang***REMOVED*** {
    yield this.#createBundleFallback(lang***REMOVED***;
  ***REMOVED***
  static async #createBundleFallback(lang***REMOVED*** {
    const text = "pdfjs-previous-button =\n    .title = Previous Page\npdfjs-previous-button-label = Previous\npdfjs-next-button =\n    .title = Next Page\npdfjs-next-button-label = Next\npdfjs-page-input =\n    .title = Page\npdfjs-of-pages = of { $pagesCount ***REMOVED***\npdfjs-page-of-pages = ({ $pageNumber ***REMOVED*** of { $pagesCount ***REMOVED******REMOVED***\npdfjs-zoom-out-button =\n    .title = Zoom Out\npdfjs-zoom-out-button-label = Zoom Out\npdfjs-zoom-in-button =\n    .title = Zoom In\npdfjs-zoom-in-button-label = Zoom In\npdfjs-zoom-select =\n    .title = Zoom\npdfjs-presentation-mode-button =\n    .title = Switch to Presentation Mode\npdfjs-presentation-mode-button-label = Presentation Mode\npdfjs-open-file-button =\n    .title = Open File\npdfjs-open-file-button-label = Open\npdfjs-print-button =\n    .title = Print\npdfjs-print-button-label = Print\npdfjs-save-button =\n    .title = Save\npdfjs-save-button-label = Save\npdfjs-download-button =\n    .title = Download\npdfjs-download-button-label = Download\npdfjs-bookmark-button =\n    .title = Current Page (View URL from Current Page***REMOVED***\npdfjs-bookmark-button-label = Current Page\npdfjs-tools-button =\n    .title = Tools\npdfjs-tools-button-label = Tools\npdfjs-first-page-button =\n    .title = Go to First Page\npdfjs-first-page-button-label = Go to First Page\npdfjs-last-page-button =\n    .title = Go to Last Page\npdfjs-last-page-button-label = Go to Last Page\npdfjs-page-rotate-cw-button =\n    .title = Rotate Clockwise\npdfjs-page-rotate-cw-button-label = Rotate Clockwise\npdfjs-page-rotate-ccw-button =\n    .title = Rotate Counterclockwise\npdfjs-page-rotate-ccw-button-label = Rotate Counterclockwise\npdfjs-cursor-text-select-tool-button =\n    .title = Enable Text Selection Tool\npdfjs-cursor-text-select-tool-button-label = Text Selection Tool\npdfjs-cursor-hand-tool-button =\n    .title = Enable Hand Tool\npdfjs-cursor-hand-tool-button-label = Hand Tool\npdfjs-scroll-page-button =\n    .title = Use Page Scrolling\npdfjs-scroll-page-button-label = Page Scrolling\npdfjs-scroll-vertical-button =\n    .title = Use Vertical Scrolling\npdfjs-scroll-vertical-button-label = Vertical Scrolling\npdfjs-scroll-horizontal-button =\n    .title = Use Horizontal Scrolling\npdfjs-scroll-horizontal-button-label = Horizontal Scrolling\npdfjs-scroll-wrapped-button =\n    .title = Use Wrapped Scrolling\npdfjs-scroll-wrapped-button-label = Wrapped Scrolling\npdfjs-spread-none-button =\n    .title = Do not join page spreads\npdfjs-spread-none-button-label = No Spreads\npdfjs-spread-odd-button =\n    .title = Join page spreads starting with odd-numbered pages\npdfjs-spread-odd-button-label = Odd Spreads\npdfjs-spread-even-button =\n    .title = Join page spreads starting with even-numbered pages\npdfjs-spread-even-button-label = Even Spreads\npdfjs-document-properties-button =\n    .title = Document Properties\u2026\npdfjs-document-properties-button-label = Document Properties\u2026\npdfjs-document-properties-file-name = File name:\npdfjs-document-properties-file-size = File size:\npdfjs-document-properties-size-kb = { NUMBER($kb, maximumSignificantDigits: 3***REMOVED*** ***REMOVED*** KB ({ $b ***REMOVED*** bytes***REMOVED***\npdfjs-document-properties-size-mb = { NUMBER($mb, maximumSignificantDigits: 3***REMOVED*** ***REMOVED*** MB ({ $b ***REMOVED*** bytes***REMOVED***\npdfjs-document-properties-title = Title:\npdfjs-document-properties-author = Author:\npdfjs-document-properties-subject = Subject:\npdfjs-document-properties-keywords = Keywords:\npdfjs-document-properties-creation-date = Creation Date:\npdfjs-document-properties-modification-date = Modification Date:\npdfjs-document-properties-date-time-string = { DATETIME($dateObj, dateStyle: \"short\", timeStyle: \"medium\"***REMOVED*** ***REMOVED***\npdfjs-document-properties-creator = Creator:\npdfjs-document-properties-producer = PDF Producer:\npdfjs-document-properties-version = PDF Version:\npdfjs-document-properties-page-count = Page Count:\npdfjs-document-properties-page-size = Page Size:\npdfjs-document-properties-page-size-unit-inches = in\npdfjs-document-properties-page-size-unit-millimeters = mm\npdfjs-document-properties-page-size-orientation-portrait = portrait\npdfjs-document-properties-page-size-orientation-landscape = landscape\npdfjs-document-properties-page-size-name-a-three = A3\npdfjs-document-properties-page-size-name-a-four = A4\npdfjs-document-properties-page-size-name-letter = Letter\npdfjs-document-properties-page-size-name-legal = Legal\npdfjs-document-properties-page-size-dimension-string = { $width ***REMOVED*** \xD7 { $height ***REMOVED*** { $unit ***REMOVED*** ({ $orientation ***REMOVED******REMOVED***\npdfjs-document-properties-page-size-dimension-name-string = { $width ***REMOVED*** \xD7 { $height ***REMOVED*** { $unit ***REMOVED*** ({ $name ***REMOVED***, { $orientation ***REMOVED******REMOVED***\npdfjs-document-properties-linearized = Fast Web View:\npdfjs-document-properties-linearized-yes = Yes\npdfjs-document-properties-linearized-no = No\npdfjs-document-properties-close-button = Close\npdfjs-print-progress-message = Preparing document for printing\u2026\npdfjs-print-progress-percent = { $progress ***REMOVED***%\npdfjs-print-progress-close-button = Cancel\npdfjs-printing-not-supported = Warning: Printing is not fully supported by this browser.\npdfjs-printing-not-ready = Warning: The PDF is not fully loaded for printing.\npdfjs-toggle-sidebar-button =\n    .title = Toggle Sidebar\npdfjs-toggle-sidebar-notification-button =\n    .title = Toggle Sidebar (document contains outline/attachments/layers***REMOVED***\npdfjs-toggle-sidebar-button-label = Toggle Sidebar\npdfjs-document-outline-button =\n    .title = Show Document Outline (double-click to expand/collapse all items***REMOVED***\npdfjs-document-outline-button-label = Document Outline\npdfjs-attachments-button =\n    .title = Show Attachments\npdfjs-attachments-button-label = Attachments\npdfjs-layers-button =\n    .title = Show Layers (double-click to reset all layers to the default state***REMOVED***\npdfjs-layers-button-label = Layers\npdfjs-thumbs-button =\n    .title = Show Thumbnails\npdfjs-thumbs-button-label = Thumbnails\npdfjs-current-outline-item-button =\n    .title = Find Current Outline Item\npdfjs-current-outline-item-button-label = Current Outline Item\npdfjs-findbar-button =\n    .title = Find in Document\npdfjs-findbar-button-label = Find\npdfjs-additional-layers = Additional Layers\npdfjs-thumb-page-title =\n    .title = Page { $page ***REMOVED***\npdfjs-thumb-page-canvas =\n    .aria-label = Thumbnail of Page { $page ***REMOVED***\npdfjs-find-input =\n    .title = Find\n    .placeholder = Find in document\u2026\npdfjs-find-previous-button =\n    .title = Find the previous occurrence of the phrase\npdfjs-find-previous-button-label = Previous\npdfjs-find-next-button =\n    .title = Find the next occurrence of the phrase\npdfjs-find-next-button-label = Next\npdfjs-find-highlight-checkbox = Highlight All\npdfjs-find-match-case-checkbox-label = Match Case\npdfjs-find-match-diacritics-checkbox-label = Match Diacritics\npdfjs-find-entire-word-checkbox-label = Whole Words\npdfjs-find-reached-top = Reached top of document, continued from bottom\npdfjs-find-reached-bottom = Reached end of document, continued from top\npdfjs-find-match-count =\n  ***REMOVED*** $total ->\n        [one] { $current ***REMOVED*** of { $total ***REMOVED*** match\n       *[other] { $current ***REMOVED*** of { $total ***REMOVED*** matches\n    ***REMOVED***\npdfjs-find-match-count-limit =\n  ***REMOVED*** $limit ->\n        [one] More than { $limit ***REMOVED*** match\n       *[other] More than { $limit ***REMOVED*** matches\n    ***REMOVED***\npdfjs-find-not-found = Phrase not found\npdfjs-page-scale-width = Page Width\npdfjs-page-scale-fit = Page Fit\npdfjs-page-scale-auto = Automatic Zoom\npdfjs-page-scale-actual = Actual Size\npdfjs-page-scale-percent = { $scale ***REMOVED***%\npdfjs-page-landmark =\n    .aria-label = Page { $page ***REMOVED***\npdfjs-loading-error = An error occurred while loading the PDF.\npdfjs-invalid-file-error = Invalid or corrupted PDF file.\npdfjs-missing-file-error = Missing PDF file.\npdfjs-unexpected-response-error = Unexpected server response.\npdfjs-rendering-error = An error occurred while rendering the page.\npdfjs-annotation-date-time-string = { DATETIME($dateObj, dateStyle: \"short\", timeStyle: \"medium\"***REMOVED*** ***REMOVED***\npdfjs-text-annotation-type =\n    .alt = [{ $type ***REMOVED*** Annotation]\npdfjs-password-label = Enter the password to open this PDF file.\npdfjs-password-invalid = Invalid password. Please try again.\npdfjs-password-ok-button = OK\npdfjs-password-cancel-button = Cancel\npdfjs-web-fonts-disabled = Web fonts are disabled: unable to use embedded PDF fonts.\npdfjs-editor-free-text-button =\n    .title = Text\npdfjs-editor-free-text-button-label = Text\npdfjs-editor-ink-button =\n    .title = Draw\npdfjs-editor-ink-button-label = Draw\npdfjs-editor-stamp-button =\n    .title = Add or edit images\npdfjs-editor-stamp-button-label = Add or edit images\npdfjs-editor-highlight-button =\n    .title = Highlight\npdfjs-editor-highlight-button-label = Highlight\npdfjs-highlight-floating-button1 =\n    .title = Highlight\n    .aria-label = Highlight\npdfjs-highlight-floating-button-label = Highlight\npdfjs-editor-remove-ink-button =\n    .title = Remove drawing\npdfjs-editor-remove-freetext-button =\n    .title = Remove text\npdfjs-editor-remove-stamp-button =\n    .title = Remove image\npdfjs-editor-remove-highlight-button =\n    .title = Remove highlight\npdfjs-editor-free-text-color-input = Color\npdfjs-editor-free-text-size-input = Size\npdfjs-editor-ink-color-input = Color\npdfjs-editor-ink-thickness-input = Thickness\npdfjs-editor-ink-opacity-input = Opacity\npdfjs-editor-stamp-add-image-button =\n    .title = Add image\npdfjs-editor-stamp-add-image-button-label = Add image\npdfjs-editor-free-highlight-thickness-input = Thickness\npdfjs-editor-free-highlight-thickness-title =\n    .title = Change thickness when highlighting items other than text\npdfjs-free-text2 =\n    .aria-label = Text Editor\n    .default-content = Start typing\u2026\npdfjs-ink =\n    .aria-label = Draw Editor\npdfjs-ink-canvas =\n    .aria-label = User-created image\npdfjs-editor-alt-text-button =\n    .aria-label = Alt text\npdfjs-editor-alt-text-button-label = Alt text\npdfjs-editor-alt-text-edit-button =\n    .aria-label = Edit alt text\npdfjs-editor-alt-text-dialog-label = Choose an option\npdfjs-editor-alt-text-dialog-description = Alt text (alternative text***REMOVED*** helps when people can\u2019t see the image or when it doesn\u2019t load.\npdfjs-editor-alt-text-add-description-label = Add a description\npdfjs-editor-alt-text-add-description-description = Aim for 1-2 sentences that describe the subject, setting, or actions.\npdfjs-editor-alt-text-mark-decorative-label = Mark as decorative\npdfjs-editor-alt-text-mark-decorative-description = This is used for ornamental images, like borders or watermarks.\npdfjs-editor-alt-text-cancel-button = Cancel\npdfjs-editor-alt-text-save-button = Save\npdfjs-editor-alt-text-decorative-tooltip = Marked as decorative\npdfjs-editor-alt-text-textarea =\n    .placeholder = For example, \u201CA young man sits down at a table to eat a meal\u201D\npdfjs-editor-resizer-top-left =\n    .aria-label = Top left corner \u2014 resize\npdfjs-editor-resizer-top-middle =\n    .aria-label = Top middle \u2014 resize\npdfjs-editor-resizer-top-right =\n    .aria-label = Top right corner \u2014 resize\npdfjs-editor-resizer-middle-right =\n    .aria-label = Middle right \u2014 resize\npdfjs-editor-resizer-bottom-right =\n    .aria-label = Bottom right corner \u2014 resize\npdfjs-editor-resizer-bottom-middle =\n    .aria-label = Bottom middle \u2014 resize\npdfjs-editor-resizer-bottom-left =\n    .aria-label = Bottom left corner \u2014 resize\npdfjs-editor-resizer-middle-left =\n    .aria-label = Middle left \u2014 resize\npdfjs-editor-highlight-colorpicker-label = Highlight color\npdfjs-editor-colorpicker-button =\n    .title = Change color\npdfjs-editor-colorpicker-dropdown =\n    .aria-label = Color choices\npdfjs-editor-colorpicker-yellow =\n    .title = Yellow\npdfjs-editor-colorpicker-green =\n    .title = Green\npdfjs-editor-colorpicker-blue =\n    .title = Blue\npdfjs-editor-colorpicker-pink =\n    .title = Pink\npdfjs-editor-colorpicker-red =\n    .title = Red\npdfjs-editor-highlight-show-all-button-label = Show all\npdfjs-editor-highlight-show-all-button =\n    .title = Show all\npdfjs-editor-new-alt-text-dialog-edit-label = Edit alt text (image description***REMOVED***\npdfjs-editor-new-alt-text-dialog-add-label = Add alt text (image description***REMOVED***\npdfjs-editor-new-alt-text-textarea =\n    .placeholder = Write your description here\u2026\npdfjs-editor-new-alt-text-description = Short description for people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-new-alt-text-disclaimer1 = This alt text was created automatically and may be inaccurate.\npdfjs-editor-new-alt-text-disclaimer-learn-more-url = Learn more\npdfjs-editor-new-alt-text-create-automatically-button-label = Create alt text automatically\npdfjs-editor-new-alt-text-not-now-button = Not now\npdfjs-editor-new-alt-text-error-title = Couldn\u2019t create alt text automatically\npdfjs-editor-new-alt-text-error-description = Please write your own alt text or try again later.\npdfjs-editor-new-alt-text-error-close-button = Close\npdfjs-editor-new-alt-text-ai-model-downloading-progress = Downloading alt text AI model ({ $downloadedSize ***REMOVED*** of { $totalSize ***REMOVED*** MB***REMOVED***\n    .aria-valuetext = Downloading alt text AI model ({ $downloadedSize ***REMOVED*** of { $totalSize ***REMOVED*** MB***REMOVED***\npdfjs-editor-new-alt-text-added-button =\n    .aria-label = Alt text added\npdfjs-editor-new-alt-text-added-button-label = Alt text added\npdfjs-editor-new-alt-text-missing-button =\n    .aria-label = Missing alt text\npdfjs-editor-new-alt-text-missing-button-label = Missing alt text\npdfjs-editor-new-alt-text-to-review-button =\n    .aria-label = Review alt text\npdfjs-editor-new-alt-text-to-review-button-label = Review alt text\npdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer = Created automatically: { $generatedAltText ***REMOVED***\npdfjs-image-alt-text-settings-button =\n    .title = Image alt text settings\npdfjs-image-alt-text-settings-button-label = Image alt text settings\npdfjs-editor-alt-text-settings-dialog-label = Image alt text settings\npdfjs-editor-alt-text-settings-automatic-title = Automatic alt text\npdfjs-editor-alt-text-settings-create-model-button-label = Create alt text automatically\npdfjs-editor-alt-text-settings-create-model-description = Suggests descriptions to help people who can\u2019t see the image or when the image doesn\u2019t load.\npdfjs-editor-alt-text-settings-download-model-label = Alt text AI model ({ $totalSize ***REMOVED*** MB***REMOVED***\npdfjs-editor-alt-text-settings-ai-model-description = Runs locally on your device so your data stays private. Required for automatic alt text.\npdfjs-editor-alt-text-settings-delete-model-button = Delete\npdfjs-editor-alt-text-settings-download-model-button = Download\npdfjs-editor-alt-text-settings-downloading-model-button = Downloading\u2026\npdfjs-editor-alt-text-settings-editor-title = Alt text editor\npdfjs-editor-alt-text-settings-show-dialog-button-label = Show alt text editor right away when adding an image\npdfjs-editor-alt-text-settings-show-dialog-description = Helps you make sure all your images have alt text.\npdfjs-editor-alt-text-settings-close-button = Close\npdfjs-editor-undo-bar-message-highlight = Highlight removed\npdfjs-editor-undo-bar-message-freetext = Text removed\npdfjs-editor-undo-bar-message-ink = Drawing removed\npdfjs-editor-undo-bar-message-stamp = Image removed\npdfjs-editor-undo-bar-message-multiple =\n  ***REMOVED*** $count ->\n        [one] { $count ***REMOVED*** annotation removed\n       *[other] { $count ***REMOVED*** annotations removed\n    ***REMOVED***\npdfjs-editor-undo-bar-undo-button =\n    .title = Undo\npdfjs-editor-undo-bar-undo-button-label = Undo\npdfjs-editor-undo-bar-close-button =\n    .title = Close\npdfjs-editor-undo-bar-close-button-label = Close";
    return createBundle(lang, text***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/generic_scripting.js

async function docProperties(pdfDocument***REMOVED*** {
  const url = "",
    baseUrl = url.split("#", 1***REMOVED***[0];
  let {
    info,
    metadata,
    contentDispositionFilename,
    contentLength
  ***REMOVED*** = await pdfDocument.getMetadata(***REMOVED***;
  if (!contentLength***REMOVED*** {
    const {
      length
    ***REMOVED*** = await pdfDocument.getDownloadInfo(***REMOVED***;
    contentLength = length;
  ***REMOVED***
  return {
    ...info,
    baseURL: baseUrl,
    filesize: contentLength,
    filename: contentDispositionFilename || getPdfFilenameFromUrl(url***REMOVED***,
    metadata: metadata?.getRaw(***REMOVED***,
    authors: metadata?.get("dc:creator"***REMOVED***,
    numPages: pdfDocument.numPages,
    URL: url
  ***REMOVED***;
***REMOVED***
class GenericScripting {
  constructor(sandboxBundleSrc***REMOVED*** {
    this._ready = new Promise((resolve, reject***REMOVED*** => {
      const sandbox = import(/*webpackIgnore: true*/sandboxBundleSrc***REMOVED***;
      sandbox.then(pdfjsSandbox => {
        resolve(pdfjsSandbox.QuickJSSandbox(***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***.catch(reject***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async createSandbox(data***REMOVED*** {
    const sandbox = await this._ready;
    sandbox.create(data***REMOVED***;
  ***REMOVED***
  async dispatchEventInSandbox(event***REMOVED*** {
    const sandbox = await this._ready;
    setTimeout((***REMOVED*** => sandbox.dispatchEvent(event***REMOVED***, 0***REMOVED***;
  ***REMOVED***
  async destroySandbox(***REMOVED*** {
    const sandbox = await this._ready;
    sandbox.nukeSandbox(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/genericcom.js





function initCom(app***REMOVED*** { ***REMOVED***
class Preferences extends BasePreferences {
  async _writeToStorage(prefObj***REMOVED*** {
    localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj***REMOVED******REMOVED***;
  ***REMOVED***
  async _readFromStorage(prefObj***REMOVED*** {
***REMOVED***
      prefs: JSON.parse(localStorage.getItem("pdfjs.preferences"***REMOVED******REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
class ExternalServices extends BaseExternalServices {
  async createL10n(***REMOVED*** {
    return new genericl10n_GenericL10n(AppOptions.get("localeProperties"***REMOVED***?.lang***REMOVED***;
  ***REMOVED***
  createScripting(***REMOVED*** {
    return new GenericScripting(AppOptions.get("sandboxBundleSrc"***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
class MLManager {
  async isEnabledFor(_name***REMOVED*** {
    return false;
  ***REMOVED***
  async deleteModel(_service***REMOVED*** {
    return null;
  ***REMOVED***
  isReady(_name***REMOVED*** {
    return false;
  ***REMOVED***
  guess(_data***REMOVED*** { ***REMOVED***
  toggleService(_name, _enabled***REMOVED*** { ***REMOVED***
  static getFakeMLManager(options***REMOVED*** {
    return new FakeMLManager(options***REMOVED***;
  ***REMOVED***
***REMOVED***
class FakeMLManager {
  eventBus = null;
  hasProgress = false;
  constructor({
    enableGuessAltText,
    enableAltTextModelDownload
  ***REMOVED******REMOVED*** {
    this.enableGuessAltText = enableGuessAltText;
    this.enableAltTextModelDownload = enableAltTextModelDownload;
  ***REMOVED***
  setEventBus(eventBus, abortSignal***REMOVED*** {
    this.eventBus = eventBus;
  ***REMOVED***
  async isEnabledFor(_name***REMOVED*** {
    return this.enableGuessAltText;
  ***REMOVED***
  async deleteModel(_name***REMOVED*** {
    this.enableAltTextModelDownload = false;
    return null;
  ***REMOVED***
  async loadModel(_name***REMOVED*** { ***REMOVED***
  async downloadModel(_name***REMOVED*** {
    this.hasProgress = true;
    const {
      promise,
      resolve
    ***REMOVED*** = Promise.withResolvers(***REMOVED***;
    const total = 1e8;
    const end = 1.5 * total;
    const increment = 5e6;
    let loaded = 0;
    const id = setInterval((***REMOVED*** => {
      loaded += increment;
      if (loaded <= end***REMOVED*** {
        this.eventBus.dispatch("loadaiengineprogress", {
          source: this,
          detail: {
            total,
            totalLoaded: loaded,
            finished: loaded + increment >= end
          ***REMOVED***
        ***REMOVED******REMOVED***;
        return;
      ***REMOVED***
      clearInterval(id***REMOVED***;
      this.hasProgress = false;
      this.enableAltTextModelDownload = true;
      resolve(true***REMOVED***;
    ***REMOVED***, 900***REMOVED***;
    return promise;
  ***REMOVED***
  isReady(_name***REMOVED*** {
    return this.enableAltTextModelDownload;
  ***REMOVED***
  guess({
    request: {
      data
    ***REMOVED***
  ***REMOVED******REMOVED*** {
    return new Promise(resolve => {
      setTimeout((***REMOVED*** => {
        resolve(data ? {
          output: "Fake alt text."
        ***REMOVED*** : {
          error: true
        ***REMOVED******REMOVED***;
      ***REMOVED***, 3000***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  toggleService(_name, enabled***REMOVED*** {
    this.enableGuessAltText = enabled;
  ***REMOVED***
***REMOVED***

;// ./web/new_alt_text_manager.js

class NewAltTextManager {
  #boundCancel = this.#cancel.bind(this***REMOVED***;
  #createAutomaticallyButton;
  #currentEditor = null;
  #cancelButton;
  #descriptionContainer;
  #dialog;
  #disclaimer;
  #downloadModel;
  #downloadModelDescription;
  #eventBus;
  #firstTime = false;
  #guessedAltText;
  #hasAI = null;
  #isEditing = null;
  #imagePreview;
  #imageData;
  #isAILoading = false;
  #wasAILoading = false;
  #learnMore;
  #notNowButton;
  #overlayManager;
  #textarea;
  #title;
  #uiManager;
  #previousAltText = null;
  constructor({
    descriptionContainer,
    dialog,
    imagePreview,
    cancelButton,
    disclaimer,
    notNowButton,
    saveButton,
    textarea,
    learnMore,
    errorCloseButton,
    createAutomaticallyButton,
    downloadModel,
    downloadModelDescription,
    title
  ***REMOVED***, overlayManager, eventBus***REMOVED*** {
    this.#cancelButton = cancelButton;
    this.#createAutomaticallyButton = createAutomaticallyButton;
    this.#descriptionContainer = descriptionContainer;
    this.#dialog = dialog;
    this.#disclaimer = disclaimer;
    this.#notNowButton = notNowButton;
    this.#imagePreview = imagePreview;
    this.#textarea = textarea;
    this.#learnMore = learnMore;
    this.#title = title;
    this.#downloadModel = downloadModel;
    this.#downloadModelDescription = downloadModelDescription;
    this.#overlayManager = overlayManager;
    this.#eventBus = eventBus;
    dialog.addEventListener("close", this.#close.bind(this***REMOVED******REMOVED***;
    dialog.addEventListener("contextmenu", event => {
      if (event.target !== this.#textarea***REMOVED*** {
        event.preventDefault(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    cancelButton.addEventListener("click", this.#boundCancel***REMOVED***;
    notNowButton.addEventListener("click", this.#boundCancel***REMOVED***;
    saveButton.addEventListener("click", this.#save.bind(this***REMOVED******REMOVED***;
    errorCloseButton.addEventListener("click", (***REMOVED*** => {
      this.#toggleError(false***REMOVED***;
    ***REMOVED******REMOVED***;
    createAutomaticallyButton.addEventListener("click", async (***REMOVED*** => {
      const checked = createAutomaticallyButton.getAttribute("aria-pressed"***REMOVED*** !== "true";
      this.#currentEditor._reportTelemetry({
        action: "pdfjs.image.alt_text.ai_generation_check",
        data: {
          status: checked
        ***REMOVED***
      ***REMOVED******REMOVED***;
      if (this.#uiManager***REMOVED*** {
        this.#uiManager.setPreference("enableGuessAltText", checked***REMOVED***;
        await this.#uiManager.mlManager.toggleService("altText", checked***REMOVED***;
      ***REMOVED***
      this.#toggleGuessAltText(checked, false***REMOVED***;
    ***REMOVED******REMOVED***;
    textarea.addEventListener("focus", (***REMOVED*** => {
      this.#wasAILoading = this.#isAILoading;
      this.#toggleLoading(false***REMOVED***;
      this.#toggleTitleAndDisclaimer(***REMOVED***;
    ***REMOVED******REMOVED***;
    textarea.addEventListener("blur", (***REMOVED*** => {
      if (!textarea.value***REMOVED*** {
        this.#toggleLoading(this.#wasAILoading***REMOVED***;
      ***REMOVED***
      this.#toggleTitleAndDisclaimer(***REMOVED***;
    ***REMOVED******REMOVED***;
    textarea.addEventListener("input", (***REMOVED*** => {
      this.#toggleTitleAndDisclaimer(***REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("enableguessalttext", ({
      value
    ***REMOVED******REMOVED*** => {
      this.#toggleGuessAltText(value, false***REMOVED***;
    ***REMOVED******REMOVED***;
    this.#overlayManager.register(dialog***REMOVED***;
    this.#learnMore.addEventListener("click", (***REMOVED*** => {
      this.#currentEditor._reportTelemetry({
        action: "pdfjs.image.alt_text.info",
        data: {
          topic: "alt_text"
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #toggleLoading(value***REMOVED*** {
    if (!this.#uiManager || this.#isAILoading === value***REMOVED*** {
      return;
    ***REMOVED***
    this.#isAILoading = value;
    this.#descriptionContainer.classList.toggle("loading", value***REMOVED***;
  ***REMOVED***
  #toggleError(value***REMOVED*** {
    if (!this.#uiManager***REMOVED*** {
      return;
    ***REMOVED***
    this.#dialog.classList.toggle("error", value***REMOVED***;
  ***REMOVED***
  async #toggleGuessAltText(value, isInitial = false***REMOVED*** {
    if (!this.#uiManager***REMOVED*** {
      return;
    ***REMOVED***
    this.#dialog.classList.toggle("aiDisabled", !value***REMOVED***;
    this.#createAutomaticallyButton.setAttribute("aria-pressed", value***REMOVED***;
    if (value***REMOVED*** {
      const {
        altTextLearnMoreUrl
      ***REMOVED*** = this.#uiManager.mlManager;
      if (altTextLearnMoreUrl***REMOVED*** {
        this.#learnMore.href = altTextLearnMoreUrl;
      ***REMOVED***
      this.#mlGuessAltText(isInitial***REMOVED***;
    ***REMOVED*** else {
      this.#toggleLoading(false***REMOVED***;
      this.#isAILoading = false;
      this.#toggleTitleAndDisclaimer(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #toggleNotNow(***REMOVED*** {
    this.#notNowButton.classList.toggle("hidden", !this.#firstTime***REMOVED***;
    this.#cancelButton.classList.toggle("hidden", this.#firstTime***REMOVED***;
  ***REMOVED***
  #toggleAI(value***REMOVED*** {
    if (!this.#uiManager || this.#hasAI === value***REMOVED*** {
      return;
    ***REMOVED***
    this.#hasAI = value;
    this.#dialog.classList.toggle("noAi", !value***REMOVED***;
    this.#toggleTitleAndDisclaimer(***REMOVED***;
  ***REMOVED***
  #toggleTitleAndDisclaimer(***REMOVED*** {
    const visible = this.#isAILoading || this.#guessedAltText && this.#guessedAltText === this.#textarea.value;
    this.#disclaimer.hidden = !visible;
    const isEditing = this.#isAILoading || !!this.#textarea.value;
    if (this.#isEditing === isEditing***REMOVED*** {
      return;
    ***REMOVED***
    this.#isEditing = isEditing;
    this.#title.setAttribute("data-l10n-id", isEditing ? "pdfjs-editor-new-alt-text-dialog-edit-label" : "pdfjs-editor-new-alt-text-dialog-add-label"***REMOVED***;
  ***REMOVED***
  async #mlGuessAltText(isInitial***REMOVED*** {
    if (this.#isAILoading***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#textarea.value***REMOVED*** {
      return;
    ***REMOVED***
    if (isInitial && this.#previousAltText !== null***REMOVED*** {
      return;
    ***REMOVED***
    this.#guessedAltText = this.#currentEditor.guessedAltText;
    if (this.#previousAltText === null && this.#guessedAltText***REMOVED*** {
      this.#addAltText(this.#guessedAltText***REMOVED***;
      return;
    ***REMOVED***
    this.#toggleLoading(true***REMOVED***;
    this.#toggleTitleAndDisclaimer(***REMOVED***;
    let hasError = false;
  ***REMOVED***
      const altText = await this.#currentEditor.mlGuessAltText(this.#imageData, false***REMOVED***;
      if (altText***REMOVED*** {
        this.#guessedAltText = altText;
        this.#wasAILoading = this.#isAILoading;
        if (this.#isAILoading***REMOVED*** {
          this.#addAltText(altText***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** catch (e***REMOVED*** {
      console.error(e***REMOVED***;
      hasError = true;
    ***REMOVED***
    this.#toggleLoading(false***REMOVED***;
    this.#toggleTitleAndDisclaimer(***REMOVED***;
    if (hasError && this.#uiManager***REMOVED*** {
      this.#toggleError(true***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #addAltText(altText***REMOVED*** {
    if (!this.#uiManager || this.#textarea.value***REMOVED*** {
      return;
    ***REMOVED***
    this.#textarea.value = altText;
    this.#toggleTitleAndDisclaimer(***REMOVED***;
  ***REMOVED***
  #setProgress(***REMOVED*** {
    this.#downloadModel.classList.toggle("hidden", false***REMOVED***;
    const callback = async ({
      detail: {
        finished,
        total,
        totalLoaded
      ***REMOVED***
    ***REMOVED******REMOVED*** => {
      const ONE_MEGA_BYTES = 1e6;
      totalLoaded = Math.min(0.99 * total, totalLoaded***REMOVED***;
      const totalSize = this.#downloadModelDescription.ariaValueMax = Math.round(total / ONE_MEGA_BYTES***REMOVED***;
      const downloadedSize = this.#downloadModelDescription.ariaValueNow = Math.round(totalLoaded / ONE_MEGA_BYTES***REMOVED***;
      this.#downloadModelDescription.setAttribute("data-l10n-args", JSON.stringify({
        totalSize,
        downloadedSize
      ***REMOVED******REMOVED******REMOVED***;
      if (!finished***REMOVED*** {
        return;
      ***REMOVED***
      this.#eventBus._off("loadaiengineprogress", callback***REMOVED***;
      this.#downloadModel.classList.toggle("hidden", true***REMOVED***;
      this.#toggleAI(true***REMOVED***;
      if (!this.#uiManager***REMOVED*** {
        return;
      ***REMOVED***
      const {
        mlManager
      ***REMOVED*** = this.#uiManager;
      mlManager.toggleService("altText", true***REMOVED***;
      this.#toggleGuessAltText(await mlManager.isEnabledFor("altText"***REMOVED***, true***REMOVED***;
    ***REMOVED***;
    this.#eventBus._on("loadaiengineprogress", callback***REMOVED***;
  ***REMOVED***
  async editAltText(uiManager, editor, firstTime***REMOVED*** {
    if (this.#currentEditor || !editor***REMOVED*** {
      return;
    ***REMOVED***
    if (firstTime && editor.hasAltTextData(***REMOVED******REMOVED*** {
      editor.altTextFinish(***REMOVED***;
      return;
    ***REMOVED***
    this.#firstTime = firstTime;
    let {
      mlManager
    ***REMOVED*** = uiManager;
    let hasAI = !!mlManager;
    this.#toggleTitleAndDisclaimer(***REMOVED***;
    if (mlManager && !mlManager.isReady("altText"***REMOVED******REMOVED*** {
      hasAI = false;
      if (mlManager.hasProgress***REMOVED*** {
        this.#setProgress(***REMOVED***;
      ***REMOVED*** else {
        mlManager = null;
      ***REMOVED***
    ***REMOVED*** else {
      this.#downloadModel.classList.toggle("hidden", true***REMOVED***;
    ***REMOVED***
    const isAltTextEnabledPromise = mlManager?.isEnabledFor("altText"***REMOVED***;
    this.#currentEditor = editor;
    this.#uiManager = uiManager;
    this.#uiManager.removeEditListeners(***REMOVED***;
    ({
      altText: this.#previousAltText
    ***REMOVED*** = editor.altTextData***REMOVED***;
    this.#textarea.value = this.#previousAltText ?? "";
    const AI_MAX_IMAGE_DIMENSION = 224;
    const MAX_PREVIEW_DIMENSION = 180;
    let canvas, width, height;
    if (mlManager***REMOVED*** {
      ({
        canvas,
        width,
        height,
        imageData: this.#imageData
      ***REMOVED*** = editor.copyCanvas(AI_MAX_IMAGE_DIMENSION, MAX_PREVIEW_DIMENSION, true***REMOVED******REMOVED***;
      if (hasAI***REMOVED*** {
        this.#toggleGuessAltText(await isAltTextEnabledPromise, true***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      ({
        canvas,
        width,
        height
      ***REMOVED*** = editor.copyCanvas(AI_MAX_IMAGE_DIMENSION, MAX_PREVIEW_DIMENSION, false***REMOVED******REMOVED***;
    ***REMOVED***
    canvas.setAttribute("role", "presentation"***REMOVED***;
    const {
      style
    ***REMOVED*** = canvas;
    style.width = `${width***REMOVED***px`;
    style.height = `${height***REMOVED***px`;
    this.#imagePreview.append(canvas***REMOVED***;
    this.#toggleNotNow(***REMOVED***;
    this.#toggleAI(hasAI***REMOVED***;
    this.#toggleError(false***REMOVED***;
  ***REMOVED***
      await this.#overlayManager.open(this.#dialog***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      this.#close(***REMOVED***;
      throw ex;
    ***REMOVED***
  ***REMOVED***
  #cancel(***REMOVED*** {
    this.#currentEditor.altTextData = {
      cancel: true
    ***REMOVED***;
    const altText = this.#textarea.value.trim(***REMOVED***;
    this.#currentEditor._reportTelemetry({
      action: "pdfjs.image.alt_text.dismiss",
      data: {
        alt_text_type: altText ? "present" : "empty",
        flow: this.#firstTime ? "image_add" : "alt_text_edit"
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.#currentEditor._reportTelemetry({
      action: "pdfjs.image.image_added",
      data: {
        alt_text_modal: true,
        alt_text_type: "skipped"
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.#finish(***REMOVED***;
  ***REMOVED***
  #finish(***REMOVED*** {
    if (this.#overlayManager.active === this.#dialog***REMOVED*** {
      this.#overlayManager.close(this.#dialog***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #close(***REMOVED*** {
    const canvas = this.#imagePreview.firstChild;
    canvas.remove(***REMOVED***;
    canvas.width = canvas.height = 0;
    this.#imageData = null;
    this.#toggleLoading(false***REMOVED***;
    this.#uiManager?.addEditListeners(***REMOVED***;
    this.#currentEditor.altTextFinish(***REMOVED***;
    this.#uiManager?.setSelected(this.#currentEditor***REMOVED***;
    this.#currentEditor = null;
    this.#uiManager = null;
  ***REMOVED***
  #extractWords(text***REMOVED*** {
    return new Set(text.toLowerCase(***REMOVED***.split(/[^\p{L***REMOVED***\p{N***REMOVED***]+/gu***REMOVED***.filter(x => !!x***REMOVED******REMOVED***;
  ***REMOVED***
  #save(***REMOVED*** {
    const altText = this.#textarea.value.trim(***REMOVED***;
    this.#currentEditor.altTextData = {
      altText,
      decorative: false
    ***REMOVED***;
    this.#currentEditor.altTextData.guessedAltText = this.#guessedAltText;
    if (this.#guessedAltText && this.#guessedAltText !== altText***REMOVED*** {
      const guessedWords = this.#extractWords(this.#guessedAltText***REMOVED***;
      const words = this.#extractWords(altText***REMOVED***;
      this.#currentEditor._reportTelemetry({
        action: "pdfjs.image.alt_text.user_edit",
        data: {
          total_words: guessedWords.size,
          words_removed: guessedWords.difference(words***REMOVED***.size,
          words_added: words.difference(guessedWords***REMOVED***.size
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.#currentEditor._reportTelemetry({
      action: "pdfjs.image.image_added",
      data: {
        alt_text_modal: true,
        alt_text_type: altText ? "present" : "empty"
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.#currentEditor._reportTelemetry({
      action: "pdfjs.image.alt_text.save",
      data: {
        alt_text_type: altText ? "present" : "empty",
        flow: this.#firstTime ? "image_add" : "alt_text_edit"
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.#finish(***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#uiManager = null;
    this.#finish(***REMOVED***;
  ***REMOVED***
***REMOVED***
class ImageAltTextSettings {
  #aiModelSettings;
  #createModelButton;
  #downloadModelButton;
  #dialog;
  #eventBus;
  #mlManager;
  #overlayManager;
  #showAltTextDialogButton;
  constructor({
    dialog,
    createModelButton,
    aiModelSettings,
    learnMore,
    closeButton,
    deleteModelButton,
    downloadModelButton,
    showAltTextDialogButton
  ***REMOVED***, overlayManager, eventBus, mlManager***REMOVED*** {
    this.#dialog = dialog;
    this.#aiModelSettings = aiModelSettings;
    this.#createModelButton = createModelButton;
    this.#downloadModelButton = downloadModelButton;
    this.#showAltTextDialogButton = showAltTextDialogButton;
    this.#overlayManager = overlayManager;
    this.#eventBus = eventBus;
    this.#mlManager = mlManager;
    const {
      altTextLearnMoreUrl
    ***REMOVED*** = mlManager;
    if (altTextLearnMoreUrl***REMOVED*** {
      learnMore.href = altTextLearnMoreUrl;
    ***REMOVED***
    dialog.addEventListener("contextmenu", noContextMenu***REMOVED***;
    createModelButton.addEventListener("click", async e => {
      const checked = this.#togglePref("enableGuessAltText", e***REMOVED***;
      await mlManager.toggleService("altText", checked***REMOVED***;
      this.#reportTelemetry({
        type: "stamp",
        action: "pdfjs.image.alt_text.settings_ai_generation_check",
        data: {
          status: checked
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    showAltTextDialogButton.addEventListener("click", e => {
      const checked = this.#togglePref("enableNewAltTextWhenAddingImage", e***REMOVED***;
      this.#reportTelemetry({
        type: "stamp",
        action: "pdfjs.image.alt_text.settings_edit_alt_text_check",
        data: {
          status: checked
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    deleteModelButton.addEventListener("click", this.#delete.bind(this, true***REMOVED******REMOVED***;
    downloadModelButton.addEventListener("click", this.#download.bind(this, true***REMOVED******REMOVED***;
    closeButton.addEventListener("click", this.#finish.bind(this***REMOVED******REMOVED***;
    learnMore.addEventListener("click", (***REMOVED*** => {
      this.#reportTelemetry({
        type: "stamp",
        action: "pdfjs.image.alt_text.info",
        data: {
          topic: "ai_generation"
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("enablealttextmodeldownload", ({
      value
    ***REMOVED******REMOVED*** => {
      if (value***REMOVED*** {
        this.#download(false***REMOVED***;
      ***REMOVED*** else {
        this.#delete(false***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.#overlayManager.register(dialog***REMOVED***;
  ***REMOVED***
  #reportTelemetry(data***REMOVED*** {
    this.#eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async #download(isFromUI = false***REMOVED*** {
    if (isFromUI***REMOVED*** {
      this.#downloadModelButton.disabled = true;
      const span = this.#downloadModelButton.firstChild;
      span.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-settings-downloading-model-button"***REMOVED***;
      await this.#mlManager.downloadModel("altText"***REMOVED***;
      span.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-settings-download-model-button"***REMOVED***;
      this.#createModelButton.disabled = false;
      this.#setPref("enableGuessAltText", true***REMOVED***;
      this.#mlManager.toggleService("altText", true***REMOVED***;
      this.#setPref("enableAltTextModelDownload", true***REMOVED***;
      this.#downloadModelButton.disabled = false;
    ***REMOVED***
    this.#aiModelSettings.classList.toggle("download", false***REMOVED***;
    this.#createModelButton.setAttribute("aria-pressed", true***REMOVED***;
  ***REMOVED***
  async #delete(isFromUI = false***REMOVED*** {
    if (isFromUI***REMOVED*** {
      await this.#mlManager.deleteModel("altText"***REMOVED***;
      this.#setPref("enableGuessAltText", false***REMOVED***;
      this.#setPref("enableAltTextModelDownload", false***REMOVED***;
    ***REMOVED***
    this.#aiModelSettings.classList.toggle("download", true***REMOVED***;
    this.#createModelButton.disabled = true;
    this.#createModelButton.setAttribute("aria-pressed", false***REMOVED***;
  ***REMOVED***
  async open({
    enableGuessAltText,
    enableNewAltTextWhenAddingImage
  ***REMOVED******REMOVED*** {
    const {
      enableAltTextModelDownload
    ***REMOVED*** = this.#mlManager;
    this.#createModelButton.disabled = !enableAltTextModelDownload;
    this.#createModelButton.setAttribute("aria-pressed", enableAltTextModelDownload && enableGuessAltText***REMOVED***;
    this.#showAltTextDialogButton.setAttribute("aria-pressed", enableNewAltTextWhenAddingImage***REMOVED***;
    this.#aiModelSettings.classList.toggle("download", !enableAltTextModelDownload***REMOVED***;
    await this.#overlayManager.open(this.#dialog***REMOVED***;
    this.#reportTelemetry({
      type: "stamp",
      action: "pdfjs.image.alt_text.settings_displayed"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #togglePref(name, {
    target
  ***REMOVED******REMOVED*** {
    const checked = target.getAttribute("aria-pressed"***REMOVED*** !== "true";
    this.#setPref(name, checked***REMOVED***;
    target.setAttribute("aria-pressed", checked***REMOVED***;
    return checked;
  ***REMOVED***
  #setPref(name, value***REMOVED*** {
    this.#eventBus.dispatch("setpreference", {
      source: this,
      name,
      value
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #finish(***REMOVED*** {
    if (this.#overlayManager.active === this.#dialog***REMOVED*** {
      this.#overlayManager.close(this.#dialog***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/alt_text_manager.js

class AltTextManager {
  #clickAC = null;
  #currentEditor = null;
  #cancelButton;
  #dialog;
  #eventBus;
  #hasUsedPointer = false;
  #optionDescription;
  #optionDecorative;
  #overlayManager;
  #saveButton;
  #textarea;
  #uiManager;
  #previousAltText = null;
  #resizeAC = null;
  #svgElement = null;
  #rectElement = null;
  #container;
  #telemetryData = null;
  constructor({
    dialog,
    optionDescription,
    optionDecorative,
    textarea,
    cancelButton,
    saveButton
  ***REMOVED***, container, overlayManager, eventBus***REMOVED*** {
    this.#dialog = dialog;
    this.#optionDescription = optionDescription;
    this.#optionDecorative = optionDecorative;
    this.#textarea = textarea;
    this.#cancelButton = cancelButton;
    this.#saveButton = saveButton;
    this.#overlayManager = overlayManager;
    this.#eventBus = eventBus;
    this.#container = container;
    const onUpdateUIState = this.#updateUIState.bind(this***REMOVED***;
    dialog.addEventListener("close", this.#close.bind(this***REMOVED******REMOVED***;
    dialog.addEventListener("contextmenu", event => {
      if (event.target !== this.#textarea***REMOVED*** {
        event.preventDefault(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    cancelButton.addEventListener("click", this.#finish.bind(this***REMOVED******REMOVED***;
    saveButton.addEventListener("click", this.#save.bind(this***REMOVED******REMOVED***;
    optionDescription.addEventListener("change", onUpdateUIState***REMOVED***;
    optionDecorative.addEventListener("change", onUpdateUIState***REMOVED***;
    this.#overlayManager.register(dialog***REMOVED***;
  ***REMOVED***
  #createSVGElement(***REMOVED*** {
    if (this.#svgElement***REMOVED*** {
      return;
    ***REMOVED***
    const svgFactory = new DOMSVGFactory(***REMOVED***;
    const svg = this.#svgElement = svgFactory.createElement("svg"***REMOVED***;
    svg.setAttribute("width", "0"***REMOVED***;
    svg.setAttribute("height", "0"***REMOVED***;
    const defs = svgFactory.createElement("defs"***REMOVED***;
    svg.append(defs***REMOVED***;
    const mask = svgFactory.createElement("mask"***REMOVED***;
    defs.append(mask***REMOVED***;
    mask.setAttribute("id", "alttext-manager-mask"***REMOVED***;
    mask.setAttribute("maskContentUnits", "objectBoundingBox"***REMOVED***;
    let rect = svgFactory.createElement("rect"***REMOVED***;
    mask.append(rect***REMOVED***;
    rect.setAttribute("fill", "white"***REMOVED***;
    rect.setAttribute("width", "1"***REMOVED***;
    rect.setAttribute("height", "1"***REMOVED***;
    rect.setAttribute("x", "0"***REMOVED***;
    rect.setAttribute("y", "0"***REMOVED***;
    rect = this.#rectElement = svgFactory.createElement("rect"***REMOVED***;
    mask.append(rect***REMOVED***;
    rect.setAttribute("fill", "black"***REMOVED***;
    this.#dialog.append(svg***REMOVED***;
  ***REMOVED***
  async editAltText(uiManager, editor***REMOVED*** {
    if (this.#currentEditor || !editor***REMOVED*** {
      return;
    ***REMOVED***
    this.#createSVGElement(***REMOVED***;
    this.#hasUsedPointer = false;
    this.#clickAC = new AbortController(***REMOVED***;
    const clickOpts = {
      signal: this.#clickAC.signal
    ***REMOVED***,
      onClick = this.#onClick.bind(this***REMOVED***;
    for (const element of [this.#optionDescription, this.#optionDecorative, this.#textarea, this.#saveButton, this.#cancelButton]***REMOVED*** {
      element.addEventListener("click", onClick, clickOpts***REMOVED***;
    ***REMOVED***
    const {
      altText,
      decorative
    ***REMOVED*** = editor.altTextData;
    if (decorative === true***REMOVED*** {
      this.#optionDecorative.checked = true;
      this.#optionDescription.checked = false;
    ***REMOVED*** else {
      this.#optionDecorative.checked = false;
      this.#optionDescription.checked = true;
    ***REMOVED***
    this.#previousAltText = this.#textarea.value = altText?.trim(***REMOVED*** || "";
    this.#updateUIState(***REMOVED***;
    this.#currentEditor = editor;
    this.#uiManager = uiManager;
    this.#uiManager.removeEditListeners(***REMOVED***;
    this.#resizeAC = new AbortController(***REMOVED***;
    this.#eventBus._on("resize", this.#setPosition.bind(this***REMOVED***, {
      signal: this.#resizeAC.signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
      await this.#overlayManager.open(this.#dialog***REMOVED***;
      this.#setPosition(***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      this.#close(***REMOVED***;
      throw ex;
    ***REMOVED***
  ***REMOVED***
  #setPosition(***REMOVED*** {
    if (!this.#currentEditor***REMOVED*** {
      return;
    ***REMOVED***
    const dialog = this.#dialog;
    const {
      style
    ***REMOVED*** = dialog;
    const {
      x: containerX,
      y: containerY,
      width: containerW,
      height: containerH
    ***REMOVED*** = this.#container.getBoundingClientRect(***REMOVED***;
    const {
      innerWidth: windowW,
      innerHeight: windowH
    ***REMOVED*** = window;
    const {
      width: dialogW,
      height: dialogH
    ***REMOVED*** = dialog.getBoundingClientRect(***REMOVED***;
    const {
      x,
      y,
      width,
      height
    ***REMOVED*** = this.#currentEditor.getClientDimensions(***REMOVED***;
    const MARGIN = 10;
    const isLTR = this.#uiManager.direction === "ltr";
    const xs = Math.max(x, containerX***REMOVED***;
    const xe = Math.min(x + width, containerX + containerW***REMOVED***;
    const ys = Math.max(y, containerY***REMOVED***;
    const ye = Math.min(y + height, containerY + containerH***REMOVED***;
    this.#rectElement.setAttribute("width", `${(xe - xs***REMOVED*** / windowW***REMOVED***`***REMOVED***;
    this.#rectElement.setAttribute("height", `${(ye - ys***REMOVED*** / windowH***REMOVED***`***REMOVED***;
    this.#rectElement.setAttribute("x", `${xs / windowW***REMOVED***`***REMOVED***;
    this.#rectElement.setAttribute("y", `${ys / windowH***REMOVED***`***REMOVED***;
    let left = null;
    let top = Math.max(y, 0***REMOVED***;
    top += Math.min(windowH - (top + dialogH***REMOVED***, 0***REMOVED***;
    if (isLTR***REMOVED*** {
      if (x + width + MARGIN + dialogW < windowW***REMOVED*** {
        left = x + width + MARGIN;
      ***REMOVED*** else if (x > dialogW + MARGIN***REMOVED*** {
        left = x - dialogW - MARGIN;
      ***REMOVED***
    ***REMOVED*** else if (x > dialogW + MARGIN***REMOVED*** {
      left = x - dialogW - MARGIN;
    ***REMOVED*** else if (x + width + MARGIN + dialogW < windowW***REMOVED*** {
      left = x + width + MARGIN;
    ***REMOVED***
    if (left === null***REMOVED*** {
      top = null;
      left = Math.max(x, 0***REMOVED***;
      left += Math.min(windowW - (left + dialogW***REMOVED***, 0***REMOVED***;
      if (y > dialogH + MARGIN***REMOVED*** {
        top = y - dialogH - MARGIN;
      ***REMOVED*** else if (y + height + MARGIN + dialogH < windowH***REMOVED*** {
        top = y + height + MARGIN;
      ***REMOVED***
    ***REMOVED***
    if (top !== null***REMOVED*** {
      dialog.classList.add("positioned"***REMOVED***;
      if (isLTR***REMOVED*** {
        style.left = `${left***REMOVED***px`;
      ***REMOVED*** else {
        style.right = `${windowW - left - dialogW***REMOVED***px`;
      ***REMOVED***
      style.top = `${top***REMOVED***px`;
    ***REMOVED*** else {
      dialog.classList.remove("positioned"***REMOVED***;
      style.left = "";
      style.top = "";
    ***REMOVED***
  ***REMOVED***
  #finish(***REMOVED*** {
    if (this.#overlayManager.active === this.#dialog***REMOVED*** {
      this.#overlayManager.close(this.#dialog***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #close(***REMOVED*** {
    this.#currentEditor._reportTelemetry(this.#telemetryData || {
      action: "alt_text_cancel",
      alt_text_keyboard: !this.#hasUsedPointer
    ***REMOVED******REMOVED***;
    this.#telemetryData = null;
    this.#removeOnClickListeners(***REMOVED***;
    this.#uiManager?.addEditListeners(***REMOVED***;
    this.#resizeAC?.abort(***REMOVED***;
    this.#resizeAC = null;
    this.#currentEditor.altTextFinish(***REMOVED***;
    this.#currentEditor = null;
    this.#uiManager = null;
  ***REMOVED***
  #updateUIState(***REMOVED*** {
    this.#textarea.disabled = this.#optionDecorative.checked;
  ***REMOVED***
  #save(***REMOVED*** {
    const altText = this.#textarea.value.trim(***REMOVED***;
    const decorative = this.#optionDecorative.checked;
    this.#currentEditor.altTextData = {
      altText,
      decorative
    ***REMOVED***;
    this.#telemetryData = {
      action: "alt_text_save",
      alt_text_description: !!altText,
      alt_text_edit: !!this.#previousAltText && this.#previousAltText !== altText,
      alt_text_decorative: decorative,
      alt_text_keyboard: !this.#hasUsedPointer
    ***REMOVED***;
    this.#finish(***REMOVED***;
  ***REMOVED***
  #onClick(evt***REMOVED*** {
    if (evt.detail === 0***REMOVED*** {
      return;
    ***REMOVED***
    this.#hasUsedPointer = true;
    this.#removeOnClickListeners(***REMOVED***;
  ***REMOVED***
  #removeOnClickListeners(***REMOVED*** {
    this.#clickAC?.abort(***REMOVED***;
    this.#clickAC = null;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#uiManager = null;
    this.#finish(***REMOVED***;
    this.#svgElement?.remove(***REMOVED***;
    this.#svgElement = this.#rectElement = null;
  ***REMOVED***
***REMOVED***

;// ./web/annotation_editor_params.js

class AnnotationEditorParams {
  constructor(options, eventBus***REMOVED*** {
    this.eventBus = eventBus;
    this.#bindListeners(options***REMOVED***;
  ***REMOVED***
  #bindListeners({
    editorFreeTextFontSize,
    editorFreeTextColor,
    editorInkColor,
    editorInkThickness,
    editorInkOpacity,
    editorStampAddImage,
    editorFreeHighlightThickness,
    editorHighlightShowAll
  ***REMOVED******REMOVED*** {
    const dispatchEvent = (typeStr, value***REMOVED*** => {
      this.eventBus.dispatch("switchannotationeditorparams", {
        source: this,
        type: AnnotationEditorParamsType[typeStr],
        value
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    editorFreeTextFontSize.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("FREETEXT_SIZE", this.valueAsNumber***REMOVED***;
    ***REMOVED******REMOVED***;
    editorFreeTextColor.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("FREETEXT_COLOR", this.value***REMOVED***;
    ***REMOVED******REMOVED***;
    editorInkColor.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("INK_COLOR", this.value***REMOVED***;
    ***REMOVED******REMOVED***;
    editorInkThickness.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("INK_THICKNESS", this.valueAsNumber***REMOVED***;
    ***REMOVED******REMOVED***;
    editorInkOpacity.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("INK_OPACITY", this.valueAsNumber***REMOVED***;
    ***REMOVED******REMOVED***;
    editorStampAddImage.addEventListener("click", (***REMOVED*** => {
      this.eventBus.dispatch("reporttelemetry", {
        source: this,
        details: {
          type: "editing",
          data: {
            action: "pdfjs.image.add_image_click"
          ***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
      dispatchEvent("CREATE"***REMOVED***;
    ***REMOVED******REMOVED***;
    editorFreeHighlightThickness.addEventListener("input", function (***REMOVED*** {
      dispatchEvent("HIGHLIGHT_THICKNESS", this.valueAsNumber***REMOVED***;
    ***REMOVED******REMOVED***;
    editorHighlightShowAll.addEventListener("click", function (***REMOVED*** {
      const checked = this.getAttribute("aria-pressed"***REMOVED*** === "true";
      this.setAttribute("aria-pressed", !checked***REMOVED***;
      dispatchEvent("HIGHLIGHT_SHOW_ALL", !checked***REMOVED***;
    ***REMOVED******REMOVED***;
    this.eventBus._on("annotationeditorparamschanged", evt => {
      for (const [type, value] of evt.details***REMOVED*** {
        switch (type***REMOVED*** {
          case AnnotationEditorParamsType.FREETEXT_SIZE:
            editorFreeTextFontSize.value = value;
            break;
          case AnnotationEditorParamsType.FREETEXT_COLOR:
            editorFreeTextColor.value = value;
            break;
          case AnnotationEditorParamsType.INK_COLOR:
            editorInkColor.value = value;
            break;
          case AnnotationEditorParamsType.INK_THICKNESS:
            editorInkThickness.value = value;
            break;
          case AnnotationEditorParamsType.INK_OPACITY:
            editorInkOpacity.value = value;
            break;
          case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
            editorFreeHighlightThickness.value = value;
            break;
          case AnnotationEditorParamsType.HIGHLIGHT_FREE:
            editorFreeHighlightThickness.disabled = !value;
            break;
          case AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
            editorHighlightShowAll.setAttribute("aria-pressed", value***REMOVED***;
            break;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/caret_browsing.js
const PRECISION = 1e-1;
class CaretBrowsingMode {
  #mainContainer;
  #toolBarHeight = 0;
  #viewerContainer;
  constructor(abortSignal, mainContainer, viewerContainer, toolbarContainer***REMOVED*** {
    this.#mainContainer = mainContainer;
    this.#viewerContainer = viewerContainer;
    if (!toolbarContainer***REMOVED*** {
      return;
    ***REMOVED***
    this.#toolBarHeight = toolbarContainer.getBoundingClientRect(***REMOVED***.height;
    const toolbarObserver = new ResizeObserver(entries => {
      for (const entry of entries***REMOVED*** {
        if (entry.target === toolbarContainer***REMOVED*** {
          this.#toolBarHeight = Math.floor(entry.borderBoxSize[0].blockSize***REMOVED***;
          break;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***;
    toolbarObserver.observe(toolbarContainer***REMOVED***;
    abortSignal.addEventListener("abort", (***REMOVED*** => toolbarObserver.disconnect(***REMOVED***, {
      once: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #isOnSameLine(rect1, rect2***REMOVED*** {
    const top1 = rect1.y;
    const bot1 = rect1.bottom;
    const mid1 = rect1.y + rect1.height / 2;
    const top2 = rect2.y;
    const bot2 = rect2.bottom;
    const mid2 = rect2.y + rect2.height / 2;
    return top1 <= mid2 && mid2 <= bot1 || top2 <= mid1 && mid1 <= bot2;
  ***REMOVED***
  #isUnderOver(rect, x, y, isUp***REMOVED*** {
    const midY = rect.y + rect.height / 2;
    return (isUp ? y >= midY : y <= midY***REMOVED*** && rect.x - PRECISION <= x && x <= rect.right + PRECISION;
  ***REMOVED***
  #isVisible(rect***REMOVED*** {
    return rect.top >= this.#toolBarHeight && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight***REMOVED*** && rect.right <= (window.innerWidth || document.documentElement.clientWidth***REMOVED***;
  ***REMOVED***
  #getCaretPosition(selection, isUp***REMOVED*** {
    const {
      focusNode,
      focusOffset
    ***REMOVED*** = selection;
    const range = document.createRange(***REMOVED***;
    range.setStart(focusNode, focusOffset***REMOVED***;
    range.setEnd(focusNode, focusOffset***REMOVED***;
    const rect = range.getBoundingClientRect(***REMOVED***;
    return [rect.x, isUp ? rect.top : rect.bottom];
  ***REMOVED***
  static #caretPositionFromPoint(x, y***REMOVED*** {
    if (!document.caretPositionFromPoint***REMOVED*** {
      const {
        startContainer: offsetNode,
        startOffset: offset
      ***REMOVED*** = document.caretRangeFromPoint(x, y***REMOVED***;
  ***REMOVED***
        offsetNode,
        offset
      ***REMOVED***;
    ***REMOVED***
    return document.caretPositionFromPoint(x, y***REMOVED***;
  ***REMOVED***
  #setCaretPositionHelper(selection, caretX, select, element, rect***REMOVED*** {
    rect ||= element.getBoundingClientRect(***REMOVED***;
    if (caretX <= rect.x + PRECISION***REMOVED*** {
      if (select***REMOVED*** {
        selection.extend(element.firstChild, 0***REMOVED***;
      ***REMOVED*** else {
        selection.setPosition(element.firstChild, 0***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    if (rect.right - PRECISION <= caretX***REMOVED*** {
      const {
        lastChild
      ***REMOVED*** = element;
      if (select***REMOVED*** {
        selection.extend(lastChild, lastChild.length***REMOVED***;
      ***REMOVED*** else {
        selection.setPosition(lastChild, lastChild.length***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    const midY = rect.y + rect.height / 2;
    let caretPosition = CaretBrowsingMode.#caretPositionFromPoint(caretX, midY***REMOVED***;
    let parentElement = caretPosition.offsetNode?.parentElement;
    if (parentElement && parentElement !== element***REMOVED*** {
      const elementsAtPoint = document.elementsFromPoint(caretX, midY***REMOVED***;
      const savedVisibilities = [];
      for (const el of elementsAtPoint***REMOVED*** {
        if (el === element***REMOVED*** {
          break;
        ***REMOVED***
        const {
          style
        ***REMOVED*** = el;
        savedVisibilities.push([el, style.visibility]***REMOVED***;
        style.visibility = "hidden";
      ***REMOVED***
      caretPosition = CaretBrowsingMode.#caretPositionFromPoint(caretX, midY***REMOVED***;
      parentElement = caretPosition.offsetNode?.parentElement;
      for (const [el, visibility] of savedVisibilities***REMOVED*** {
        el.style.visibility = visibility;
      ***REMOVED***
    ***REMOVED***
    if (parentElement !== element***REMOVED*** {
      if (select***REMOVED*** {
        selection.extend(element.firstChild, 0***REMOVED***;
      ***REMOVED*** else {
        selection.setPosition(element.firstChild, 0***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    if (select***REMOVED*** {
      selection.extend(caretPosition.offsetNode, caretPosition.offset***REMOVED***;
    ***REMOVED*** else {
      selection.setPosition(caretPosition.offsetNode, caretPosition.offset***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #setCaretPosition(select, selection, newLineElement, newLineElementRect, caretX***REMOVED*** {
    if (this.#isVisible(newLineElementRect***REMOVED******REMOVED*** {
      this.#setCaretPositionHelper(selection, caretX, select, newLineElement, newLineElementRect***REMOVED***;
      return;
    ***REMOVED***
    this.#mainContainer.addEventListener("scrollend", this.#setCaretPositionHelper.bind(this, selection, caretX, select, newLineElement, null***REMOVED***, {
      once: true
    ***REMOVED******REMOVED***;
    newLineElement.scrollIntoView(***REMOVED***;
  ***REMOVED***
  #getNodeOnNextPage(textLayer, isUp***REMOVED*** {
    while (true***REMOVED*** {
      const page = textLayer.closest(".page"***REMOVED***;
      const pageNumber = parseInt(page.getAttribute("data-page-number"***REMOVED******REMOVED***;
      const nextPage = isUp ? pageNumber - 1 : pageNumber + 1;
      textLayer = this.#viewerContainer.querySelector(`.page[data-page-number="${nextPage***REMOVED***"] .textLayer`***REMOVED***;
      if (!textLayer***REMOVED*** {
        return null;
      ***REMOVED***
      const walker = document.createTreeWalker(textLayer, NodeFilter.SHOW_TEXT***REMOVED***;
      const node = isUp ? walker.lastChild(***REMOVED*** : walker.firstChild(***REMOVED***;
      if (node***REMOVED*** {
        return node;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  moveCaret(isUp, select***REMOVED*** {
    const selection = document.getSelection(***REMOVED***;
    if (selection.rangeCount === 0***REMOVED*** {
      return;
    ***REMOVED***
    const {
      focusNode
    ***REMOVED*** = selection;
    const focusElement = focusNode.nodeType !== Node.ELEMENT_NODE ? focusNode.parentElement : focusNode;
    const root = focusElement.closest(".textLayer"***REMOVED***;
    if (!root***REMOVED*** {
      return;
    ***REMOVED***
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT***REMOVED***;
    walker.currentNode = focusNode;
    const focusRect = focusElement.getBoundingClientRect(***REMOVED***;
    let newLineElement = null;
    const nodeIterator = (isUp ? walker.previousSibling : walker.nextSibling***REMOVED***.bind(walker***REMOVED***;
    while (nodeIterator(***REMOVED******REMOVED*** {
      const element = walker.currentNode.parentElement;
      if (!this.#isOnSameLine(focusRect, element.getBoundingClientRect(***REMOVED******REMOVED******REMOVED*** {
        newLineElement = element;
        break;
      ***REMOVED***
    ***REMOVED***
    if (!newLineElement***REMOVED*** {
      const node = this.#getNodeOnNextPage(root, isUp***REMOVED***;
      if (!node***REMOVED*** {
        return;
      ***REMOVED***
      if (select***REMOVED*** {
        const lastNode = (isUp ? walker.firstChild(***REMOVED*** : walker.lastChild(***REMOVED******REMOVED*** || focusNode;
        selection.extend(lastNode, isUp ? 0 : lastNode.length***REMOVED***;
        const range = document.createRange(***REMOVED***;
        range.setStart(node, isUp ? node.length : 0***REMOVED***;
        range.setEnd(node, isUp ? node.length : 0***REMOVED***;
        selection.addRange(range***REMOVED***;
        return;
      ***REMOVED***
      const [caretX] = this.#getCaretPosition(selection, isUp***REMOVED***;
      const {
        parentElement
      ***REMOVED*** = node;
      this.#setCaretPosition(select, selection, parentElement, parentElement.getBoundingClientRect(***REMOVED***, caretX***REMOVED***;
      return;
    ***REMOVED***
    const [caretX, caretY] = this.#getCaretPosition(selection, isUp***REMOVED***;
    const newLineElementRect = newLineElement.getBoundingClientRect(***REMOVED***;
    if (this.#isUnderOver(newLineElementRect, caretX, caretY, isUp***REMOVED******REMOVED*** {
      this.#setCaretPosition(select, selection, newLineElement, newLineElementRect, caretX***REMOVED***;
      return;
    ***REMOVED***
    while (nodeIterator(***REMOVED******REMOVED*** {
      const element = walker.currentNode.parentElement;
      const elementRect = element.getBoundingClientRect(***REMOVED***;
      if (!this.#isOnSameLine(newLineElementRect, elementRect***REMOVED******REMOVED*** {
        break;
      ***REMOVED***
      if (this.#isUnderOver(elementRect, caretX, caretY, isUp***REMOVED******REMOVED*** {
        this.#setCaretPosition(select, selection, element, elementRect, caretX***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    this.#setCaretPosition(select, selection, newLineElement, newLineElementRect, caretX***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/download_manager.js

function download(blobUrl, filename***REMOVED*** {
  const a = document.createElement("a"***REMOVED***;
  if (!a.click***REMOVED*** {
    throw new Error('DownloadManager: "a.click(***REMOVED***" is not supported.'***REMOVED***;
  ***REMOVED***
  a.href = blobUrl;
  a.target = "_parent";
  if ("download" in a***REMOVED*** {
    a.download = filename;
  ***REMOVED***
  (document.body || document.documentElement***REMOVED***.append(a***REMOVED***;
  a.click(***REMOVED***;
  a.remove(***REMOVED***;
***REMOVED***
class DownloadManager {
  #openBlobUrls = new WeakMap(***REMOVED***;
  downloadData(data, filename, contentType***REMOVED*** {
    const blobUrl = URL.createObjectURL(new Blob([data], {
      type: contentType
    ***REMOVED******REMOVED******REMOVED***;
    download(blobUrl, filename***REMOVED***;
  ***REMOVED***
  openOrDownloadData(data, filename, dest = null***REMOVED*** {
    const isPdfData = isPdfFile(filename***REMOVED***;
    const contentType = isPdfData ? "application/pdf" : "";
    if (isPdfData***REMOVED*** {
      let blobUrl = this.#openBlobUrls.get(data***REMOVED***;
      if (!blobUrl***REMOVED*** {
        blobUrl = URL.createObjectURL(new Blob([data], {
          type: contentType
        ***REMOVED******REMOVED******REMOVED***;
        this.#openBlobUrls.set(data, blobUrl***REMOVED***;
      ***REMOVED***
      let viewerUrl;
      viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename***REMOVED***;
      if (dest***REMOVED*** {
        viewerUrl += `#${escape(dest***REMOVED******REMOVED***`;
      ***REMOVED***
    ***REMOVED***
        window.open(viewerUrl***REMOVED***;
        return true;
      ***REMOVED*** catch (ex***REMOVED*** {
        console.error("openOrDownloadData:", ex***REMOVED***;
        URL.revokeObjectURL(blobUrl***REMOVED***;
        this.#openBlobUrls.delete(data***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.downloadData(data, filename, contentType***REMOVED***;
    return false;
  ***REMOVED***
  download(data, url, filename***REMOVED*** {
    let blobUrl;
    if (data***REMOVED*** {
      blobUrl = URL.createObjectURL(new Blob([data], {
        type: "application/pdf"
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED*** else {
      if (!createValidAbsoluteUrl(url, "http://example.com"***REMOVED******REMOVED*** {
        console.error(`download - not a valid URL: ${url***REMOVED***`***REMOVED***;
        return;
      ***REMOVED***
      blobUrl = url + "#pdfjs.action=download";
    ***REMOVED***
    download(blobUrl, filename***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/editor_undo_bar.js

class EditorUndoBar {
  #closeButton = null;
  #container;
  #eventBus = null;
  #focusTimeout = null;
  #initController = null;
  isOpen = false;
  #message;
  #showController = null;
  #undoButton;
  static #l10nMessages = Object.freeze({
    highlight: "pdfjs-editor-undo-bar-message-highlight",
    freetext: "pdfjs-editor-undo-bar-message-freetext",
    stamp: "pdfjs-editor-undo-bar-message-stamp",
    ink: "pdfjs-editor-undo-bar-message-ink",
    _multiple: "pdfjs-editor-undo-bar-message-multiple"
  ***REMOVED******REMOVED***;
  constructor({
    container,
    message,
    undoButton,
    closeButton
  ***REMOVED***, eventBus***REMOVED*** {
    this.#container = container;
    this.#message = message;
    this.#undoButton = undoButton;
    this.#closeButton = closeButton;
    this.#eventBus = eventBus;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#initController?.abort(***REMOVED***;
    this.#initController = null;
    this.hide(***REMOVED***;
  ***REMOVED***
  show(undoAction, messageData***REMOVED*** {
    if (!this.#initController***REMOVED*** {
      this.#initController = new AbortController(***REMOVED***;
      const opts = {
        signal: this.#initController.signal
      ***REMOVED***;
      const boundHide = this.hide.bind(this***REMOVED***;
      this.#container.addEventListener("contextmenu", noContextMenu, opts***REMOVED***;
      this.#closeButton.addEventListener("click", boundHide, opts***REMOVED***;
      this.#eventBus._on("beforeprint", boundHide, opts***REMOVED***;
      this.#eventBus._on("download", boundHide, opts***REMOVED***;
    ***REMOVED***
    this.hide(***REMOVED***;
    if (typeof messageData === "string"***REMOVED*** {
      this.#message.setAttribute("data-l10n-id", EditorUndoBar.#l10nMessages[messageData]***REMOVED***;
    ***REMOVED*** else {
      this.#message.setAttribute("data-l10n-id", EditorUndoBar.#l10nMessages._multiple***REMOVED***;
      this.#message.setAttribute("data-l10n-args", JSON.stringify({
        count: messageData
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED***
    this.isOpen = true;
    this.#container.hidden = false;
    this.#showController = new AbortController(***REMOVED***;
    this.#undoButton.addEventListener("click", (***REMOVED*** => {
      undoAction(***REMOVED***;
      this.hide(***REMOVED***;
    ***REMOVED***, {
      signal: this.#showController.signal
    ***REMOVED******REMOVED***;
    this.#focusTimeout = setTimeout((***REMOVED*** => {
      this.#container.focus(***REMOVED***;
      this.#focusTimeout = null;
    ***REMOVED***, 100***REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.isOpen***REMOVED*** {
      return;
    ***REMOVED***
    this.isOpen = false;
    this.#container.hidden = true;
    this.#showController?.abort(***REMOVED***;
    this.#showController = null;
    if (this.#focusTimeout***REMOVED*** {
      clearTimeout(this.#focusTimeout***REMOVED***;
      this.#focusTimeout = null;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/overlay_manager.js
class OverlayManager {
  #overlays = new WeakMap(***REMOVED***;
  #active = null;
  get active(***REMOVED*** {
    return this.#active;
  ***REMOVED***
  async register(dialog, canForceClose = false***REMOVED*** {
    if (typeof dialog !== "object"***REMOVED*** {
      throw new Error("Not enough parameters."***REMOVED***;
    ***REMOVED*** else if (this.#overlays.has(dialog***REMOVED******REMOVED*** {
      throw new Error("The overlay is already registered."***REMOVED***;
    ***REMOVED***
    this.#overlays.set(dialog, {
      canForceClose
    ***REMOVED******REMOVED***;
    dialog.addEventListener("cancel", evt => {
      this.#active = null;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async open(dialog***REMOVED*** {
    if (!this.#overlays.has(dialog***REMOVED******REMOVED*** {
      throw new Error("The overlay does not exist."***REMOVED***;
    ***REMOVED*** else if (this.#active***REMOVED*** {
      if (this.#active === dialog***REMOVED*** {
        throw new Error("The overlay is already active."***REMOVED***;
      ***REMOVED*** else if (this.#overlays.get(dialog***REMOVED***.canForceClose***REMOVED*** {
        await this.close(***REMOVED***;
      ***REMOVED*** else {
        throw new Error("Another overlay is currently active."***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#active = dialog;
    dialog.showModal(***REMOVED***;
  ***REMOVED***
  async close(dialog = this.#active***REMOVED*** {
    if (!this.#overlays.has(dialog***REMOVED******REMOVED*** {
      throw new Error("The overlay does not exist."***REMOVED***;
    ***REMOVED*** else if (!this.#active***REMOVED*** {
      throw new Error("The overlay is currently not active."***REMOVED***;
    ***REMOVED*** else if (this.#active !== dialog***REMOVED*** {
      throw new Error("Another overlay is currently active."***REMOVED***;
    ***REMOVED***
    dialog.close(***REMOVED***;
    this.#active = null;
  ***REMOVED***
***REMOVED***

;// ./web/password_prompt.js

class PasswordPrompt {
  #activeCapability = null;
  #updateCallback = null;
  #reason = null;
  constructor(options, overlayManager, isViewerEmbedded = false***REMOVED*** {
    this.dialog = options.dialog;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.overlayManager = overlayManager;
    this._isViewerEmbedded = isViewerEmbedded;
    this.submitButton.addEventListener("click", this.#verify.bind(this***REMOVED******REMOVED***;
    this.cancelButton.addEventListener("click", this.close.bind(this***REMOVED******REMOVED***;
    this.input.addEventListener("keydown", e => {
      if (e.keyCode === 13***REMOVED*** {
        this.#verify(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.overlayManager.register(this.dialog, true***REMOVED***;
    this.dialog.addEventListener("close", this.#cancel.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
  async open(***REMOVED*** {
    await this.#activeCapability?.promise;
    this.#activeCapability = Promise.withResolvers(***REMOVED***;
  ***REMOVED***
      await this.overlayManager.open(this.dialog***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      this.#activeCapability.resolve(***REMOVED***;
      throw ex;
    ***REMOVED***
    const passwordIncorrect = this.#reason === PasswordResponses.INCORRECT_PASSWORD;
    if (!this._isViewerEmbedded || passwordIncorrect***REMOVED*** {
      this.input.focus(***REMOVED***;
    ***REMOVED***
    this.label.setAttribute("data-l10n-id", passwordIncorrect ? "pdfjs-password-invalid" : "pdfjs-password-label"***REMOVED***;
  ***REMOVED***
  async close(***REMOVED*** {
    if (this.overlayManager.active === this.dialog***REMOVED*** {
      this.overlayManager.close(this.dialog***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #verify(***REMOVED*** {
    const password = this.input.value;
    if (password?.length > 0***REMOVED*** {
      this.#invokeCallback(password***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #cancel(***REMOVED*** {
    this.#invokeCallback(new Error("PasswordPrompt cancelled."***REMOVED******REMOVED***;
    this.#activeCapability.resolve(***REMOVED***;
  ***REMOVED***
  #invokeCallback(password***REMOVED*** {
    if (!this.#updateCallback***REMOVED*** {
      return;
    ***REMOVED***
    this.close(***REMOVED***;
    this.input.value = "";
    this.#updateCallback(password***REMOVED***;
    this.#updateCallback = null;
  ***REMOVED***
  async setUpdateCallback(updateCallback, reason***REMOVED*** {
    if (this.#activeCapability***REMOVED*** {
      await this.#activeCapability.promise;
    ***REMOVED***
    this.#updateCallback = updateCallback;
    this.#reason = reason;
  ***REMOVED***
***REMOVED***

;// ./web/base_tree_viewer.js

const TREEITEM_OFFSET_TOP = -100;
const TREEITEM_SELECTED_CLASS = "selected";
class BaseTreeViewer {
  constructor(options***REMOVED*** {
    this.container = options.container;
    this.eventBus = options.eventBus;
    this._l10n = options.l10n;
    this.reset(***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this._pdfDocument = null;
    this._lastToggleIsShow = true;
    this._currentTreeItem = null;
    this.container.textContent = "";
    this.container.classList.remove("treeWithDeepNesting"***REMOVED***;
  ***REMOVED***
  _dispatchEvent(count***REMOVED*** {
    throw new Error("Not implemented: _dispatchEvent"***REMOVED***;
  ***REMOVED***
  _bindLink(element, params***REMOVED*** {
    throw new Error("Not implemented: _bindLink"***REMOVED***;
  ***REMOVED***
  _normalizeTextContent(str***REMOVED*** {
    return removeNullCharacters(str, true***REMOVED*** || "\u2013";
  ***REMOVED***
  _addToggleButton(div, hidden = false***REMOVED*** {
    const toggler = document.createElement("div"***REMOVED***;
    toggler.className = "treeItemToggler";
    if (hidden***REMOVED*** {
      toggler.classList.add("treeItemsHidden"***REMOVED***;
    ***REMOVED***
    toggler.onclick = evt => {
      evt.stopPropagation(***REMOVED***;
      toggler.classList.toggle("treeItemsHidden"***REMOVED***;
      if (evt.shiftKey***REMOVED*** {
        const shouldShowAll = !toggler.classList.contains("treeItemsHidden"***REMOVED***;
        this._toggleTreeItem(div, shouldShowAll***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    div.prepend(toggler***REMOVED***;
  ***REMOVED***
  _toggleTreeItem(root, show = false***REMOVED*** {
    this._l10n.pause(***REMOVED***;
    this._lastToggleIsShow = show;
    for (const toggler of root.querySelectorAll(".treeItemToggler"***REMOVED******REMOVED*** {
      toggler.classList.toggle("treeItemsHidden", !show***REMOVED***;
    ***REMOVED***
    this._l10n.resume(***REMOVED***;
  ***REMOVED***
  _toggleAllTreeItems(***REMOVED*** {
    this._toggleTreeItem(this.container, !this._lastToggleIsShow***REMOVED***;
  ***REMOVED***
  _finishRendering(fragment, count, hasAnyNesting = false***REMOVED*** {
    if (hasAnyNesting***REMOVED*** {
      this.container.classList.add("treeWithDeepNesting"***REMOVED***;
      this._lastToggleIsShow = !fragment.querySelector(".treeItemsHidden"***REMOVED***;
    ***REMOVED***
    this._l10n.pause(***REMOVED***;
    this.container.append(fragment***REMOVED***;
    this._l10n.resume(***REMOVED***;
    this._dispatchEvent(count***REMOVED***;
  ***REMOVED***
  render(params***REMOVED*** {
    throw new Error("Not implemented: render"***REMOVED***;
  ***REMOVED***
  _updateCurrentTreeItem(treeItem = null***REMOVED*** {
    if (this._currentTreeItem***REMOVED*** {
      this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS***REMOVED***;
      this._currentTreeItem = null;
    ***REMOVED***
    if (treeItem***REMOVED*** {
      treeItem.classList.add(TREEITEM_SELECTED_CLASS***REMOVED***;
      this._currentTreeItem = treeItem;
    ***REMOVED***
  ***REMOVED***
  _scrollToCurrentTreeItem(treeItem***REMOVED*** {
    if (!treeItem***REMOVED*** {
      return;
    ***REMOVED***
    this._l10n.pause(***REMOVED***;
    let currentNode = treeItem.parentNode;
    while (currentNode && currentNode !== this.container***REMOVED*** {
      if (currentNode.classList.contains("treeItem"***REMOVED******REMOVED*** {
        const toggler = currentNode.firstElementChild;
        toggler?.classList.remove("treeItemsHidden"***REMOVED***;
      ***REMOVED***
      currentNode = currentNode.parentNode;
    ***REMOVED***
    this._l10n.resume(***REMOVED***;
    this._updateCurrentTreeItem(treeItem***REMOVED***;
    this.container.scrollTo(treeItem.offsetLeft, treeItem.offsetTop + TREEITEM_OFFSET_TOP***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_attachment_viewer.js


class PDFAttachmentViewer extends BaseTreeViewer {
  constructor(options***REMOVED*** {
    super(options***REMOVED***;
    this.downloadManager = options.downloadManager;
    this.eventBus._on("fileattachmentannotation", this.#appendAttachment.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
  reset(keepRenderedCapability = false***REMOVED*** {
    super.reset(***REMOVED***;
    this._attachments = null;
    if (!keepRenderedCapability***REMOVED*** {
      this._renderedCapability = Promise.withResolvers(***REMOVED***;
    ***REMOVED***
    this._pendingDispatchEvent = false;
  ***REMOVED***
  async _dispatchEvent(attachmentsCount***REMOVED*** {
    this._renderedCapability.resolve(***REMOVED***;
    if (attachmentsCount === 0 && !this._pendingDispatchEvent***REMOVED*** {
      this._pendingDispatchEvent = true;
      await waitOnEventOrTimeout({
        target: this.eventBus,
        name: "annotationlayerrendered",
        delay: 1000
      ***REMOVED******REMOVED***;
      if (!this._pendingDispatchEvent***REMOVED*** {
        return;
      ***REMOVED***
    ***REMOVED***
    this._pendingDispatchEvent = false;
    this.eventBus.dispatch("attachmentsloaded", {
      source: this,
      attachmentsCount
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _bindLink(element, {
    content,
    description,
    filename
  ***REMOVED******REMOVED*** {
    if (description***REMOVED*** {
      element.title = description;
    ***REMOVED***
    element.onclick = (***REMOVED*** => {
      this.downloadManager.openOrDownloadData(content, filename***REMOVED***;
      return false;
    ***REMOVED***;
  ***REMOVED***
  render({
    attachments,
    keepRenderedCapability = false
  ***REMOVED******REMOVED*** {
    if (this._attachments***REMOVED*** {
      this.reset(keepRenderedCapability***REMOVED***;
    ***REMOVED***
    this._attachments = attachments || null;
    if (!attachments***REMOVED*** {
      this._dispatchEvent(0***REMOVED***;
      return;
    ***REMOVED***
    const fragment = document.createDocumentFragment(***REMOVED***;
    let attachmentsCount = 0;
    for (const name in attachments***REMOVED*** {
      const item = attachments[name];
      const div = document.createElement("div"***REMOVED***;
      div.className = "treeItem";
      const element = document.createElement("a"***REMOVED***;
      this._bindLink(element, item***REMOVED***;
      element.textContent = this._normalizeTextContent(item.filename***REMOVED***;
      div.append(element***REMOVED***;
      fragment.append(div***REMOVED***;
      attachmentsCount++;
    ***REMOVED***
    this._finishRendering(fragment, attachmentsCount***REMOVED***;
  ***REMOVED***
  #appendAttachment(item***REMOVED*** {
    const renderedPromise = this._renderedCapability.promise;
    renderedPromise.then((***REMOVED*** => {
      if (renderedPromise !== this._renderedCapability.promise***REMOVED*** {
        return;
      ***REMOVED***
      const attachments = this._attachments || Object.create(null***REMOVED***;
      for (const name in attachments***REMOVED*** {
        if (item.filename === name***REMOVED*** {
          return;
        ***REMOVED***
      ***REMOVED***
      attachments[item.filename] = item;
      this.render({
        attachments,
        keepRenderedCapability: true
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/grab_to_pan.js

const CSS_CLASS_GRAB = "grab-to-pan-grab";
class GrabToPan {
  #activateAC = null;
  #mouseDownAC = null;
  #scrollAC = null;
  constructor({
    element
  ***REMOVED******REMOVED*** {
    this.element = element;
    this.document = element.ownerDocument;
    const overlay = this.overlay = document.createElement("div"***REMOVED***;
    overlay.className = "grab-to-pan-grabbing";
  ***REMOVED***
  activate(***REMOVED*** {
    if (!this.#activateAC***REMOVED*** {
      this.#activateAC = new AbortController(***REMOVED***;
      this.element.addEventListener("mousedown", this.#onMouseDown.bind(this***REMOVED***, {
        capture: true,
        signal: this.#activateAC.signal
      ***REMOVED******REMOVED***;
      this.element.classList.add(CSS_CLASS_GRAB***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  deactivate(***REMOVED*** {
    if (this.#activateAC***REMOVED*** {
      this.#activateAC.abort(***REMOVED***;
      this.#activateAC = null;
      this.#endPan(***REMOVED***;
      this.element.classList.remove(CSS_CLASS_GRAB***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  toggle(***REMOVED*** {
    if (this.#activateAC***REMOVED*** {
      this.deactivate(***REMOVED***;
    ***REMOVED*** else {
      this.activate(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  ignoreTarget(node***REMOVED*** {
    return node.matches("a[href], a[href] *, input, textarea, button, button *, select, option"***REMOVED***;
  ***REMOVED***
  #onMouseDown(event***REMOVED*** {
    if (event.button !== 0 || this.ignoreTarget(event.target***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    if (event.originalTarget***REMOVED*** {
    ***REMOVED***
        event.originalTarget.tagName;
      ***REMOVED*** catch {
        return;
      ***REMOVED***
    ***REMOVED***
    this.scrollLeftStart = this.element.scrollLeft;
    this.scrollTopStart = this.element.scrollTop;
    this.clientXStart = event.clientX;
    this.clientYStart = event.clientY;
    this.#mouseDownAC = new AbortController(***REMOVED***;
    const boundEndPan = this.#endPan.bind(this***REMOVED***,
      mouseOpts = {
        capture: true,
        signal: this.#mouseDownAC.signal
      ***REMOVED***;
    this.document.addEventListener("mousemove", this.#onMouseMove.bind(this***REMOVED***, mouseOpts***REMOVED***;
    this.document.addEventListener("mouseup", boundEndPan, mouseOpts***REMOVED***;
    this.#scrollAC = new AbortController(***REMOVED***;
    this.element.addEventListener("scroll", boundEndPan, {
      capture: true,
      signal: this.#scrollAC.signal
    ***REMOVED******REMOVED***;
    stopEvent(event***REMOVED***;
    const focusedElement = document.activeElement;
    if (focusedElement && !focusedElement.contains(event.target***REMOVED******REMOVED*** {
      focusedElement.blur(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #onMouseMove(event***REMOVED*** {
    this.#scrollAC?.abort(***REMOVED***;
    this.#scrollAC = null;
    if (!(event.buttons & 1***REMOVED******REMOVED*** {
      this.#endPan(***REMOVED***;
      return;
    ***REMOVED***
    const xDiff = event.clientX - this.clientXStart;
    const yDiff = event.clientY - this.clientYStart;
    this.element.scrollTo({
      top: this.scrollTopStart - yDiff,
      left: this.scrollLeftStart - xDiff,
      behavior: "instant"
    ***REMOVED******REMOVED***;
    if (!this.overlay.parentNode***REMOVED*** {
      document.body.append(this.overlay***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #endPan(***REMOVED*** {
    this.#mouseDownAC?.abort(***REMOVED***;
    this.#mouseDownAC = null;
    this.#scrollAC?.abort(***REMOVED***;
    this.#scrollAC = null;
    this.overlay.remove(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_cursor_tools.js



class PDFCursorTools {
  #active = CursorTool.SELECT;
  #prevActive = null;
  constructor({
    container,
    eventBus,
    cursorToolOnLoad = CursorTool.SELECT
  ***REMOVED******REMOVED*** {
    this.container = container;
    this.eventBus = eventBus;
    this.#addEventListeners(***REMOVED***;
    Promise.resolve(***REMOVED***.then((***REMOVED*** => {
      this.switchTool(cursorToolOnLoad***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get activeTool(***REMOVED*** {
    return this.#active;
  ***REMOVED***
  switchTool(tool***REMOVED*** {
    if (this.#prevActive !== null***REMOVED*** {
      return;
    ***REMOVED***
    this.#switchTool(tool***REMOVED***;
  ***REMOVED***
  #switchTool(tool, disabled = false***REMOVED*** {
    if (tool === this.#active***REMOVED*** {
      if (this.#prevActive !== null***REMOVED*** {
        this.eventBus.dispatch("cursortoolchanged", {
          source: this,
          tool,
          disabled
        ***REMOVED******REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    const disableActiveTool = (***REMOVED*** => {
      switch (this.#active***REMOVED*** {
        case CursorTool.SELECT:
          break;
        case CursorTool.HAND:
          this._handTool.deactivate(***REMOVED***;
          break;
        case CursorTool.ZOOM:
      ***REMOVED***
    ***REMOVED***;
    switch (tool***REMOVED*** {
      case CursorTool.SELECT:
        disableActiveTool(***REMOVED***;
        break;
      case CursorTool.HAND:
        disableActiveTool(***REMOVED***;
        this._handTool.activate(***REMOVED***;
        break;
      case CursorTool.ZOOM:
      default:
        console.error(`switchTool: "${tool***REMOVED***" is an unsupported value.`***REMOVED***;
        return;
    ***REMOVED***
    this.#active = tool;
    this.eventBus.dispatch("cursortoolchanged", {
      source: this,
      tool,
      disabled
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #addEventListeners(***REMOVED*** {
    this.eventBus._on("switchcursortool", evt => {
      if (!evt.reset***REMOVED*** {
        this.switchTool(evt.tool***REMOVED***;
      ***REMOVED*** else if (this.#prevActive !== null***REMOVED*** {
        annotationEditorMode = AnnotationEditorType.NONE;
        presentationModeState = PresentationModeState.NORMAL;
        enableActive(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    let annotationEditorMode = AnnotationEditorType.NONE,
      presentationModeState = PresentationModeState.NORMAL;
    const disableActive = (***REMOVED*** => {
      this.#prevActive ??= this.#active;
      this.#switchTool(CursorTool.SELECT, true***REMOVED***;
    ***REMOVED***;
    const enableActive = (***REMOVED*** => {
      if (this.#prevActive !== null && annotationEditorMode === AnnotationEditorType.NONE && presentationModeState === PresentationModeState.NORMAL***REMOVED*** {
        this.#switchTool(this.#prevActive***REMOVED***;
        this.#prevActive = null;
      ***REMOVED***
    ***REMOVED***;
    this.eventBus._on("annotationeditormodechanged", ({
      mode
    ***REMOVED******REMOVED*** => {
      annotationEditorMode = mode;
      if (mode === AnnotationEditorType.NONE***REMOVED*** {
        enableActive(***REMOVED***;
      ***REMOVED*** else {
        disableActive(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.eventBus._on("presentationmodechanged", ({
      state
    ***REMOVED******REMOVED*** => {
      presentationModeState = state;
      if (state === PresentationModeState.NORMAL***REMOVED*** {
        enableActive(***REMOVED***;
      ***REMOVED*** else if (state === PresentationModeState.FULLSCREEN***REMOVED*** {
        disableActive(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get _handTool(***REMOVED*** {
    return shadow(this, "_handTool", new GrabToPan({
      element: this.container
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_document_properties.js


const NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];
const US_PAGE_NAMES = {
  "8.5x11": "pdfjs-document-properties-page-size-name-letter",
  "8.5x14": "pdfjs-document-properties-page-size-name-legal"
***REMOVED***;
const METRIC_PAGE_NAMES = {
  "297x420": "pdfjs-document-properties-page-size-name-a-three",
  "210x297": "pdfjs-document-properties-page-size-name-a-four"
***REMOVED***;
function getPageName(size, isPortrait, pageNames***REMOVED*** {
  const width = isPortrait ? size.width : size.height;
  const height = isPortrait ? size.height : size.width;
  return pageNames[`${width***REMOVED***x${height***REMOVED***`];
***REMOVED***
class PDFDocumentProperties {
  #fieldData = null;
  constructor({
    dialog,
    fields,
    closeButton
  ***REMOVED***, overlayManager, eventBus, l10n, fileNameLookup***REMOVED*** {
    this.dialog = dialog;
    this.fields = fields;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this._fileNameLookup = fileNameLookup;
    this.#reset(***REMOVED***;
    closeButton.addEventListener("click", this.close.bind(this***REMOVED******REMOVED***;
    this.overlayManager.register(this.dialog***REMOVED***;
    eventBus._on("pagechanging", evt => {
      this._currentPageNumber = evt.pageNumber;
    ***REMOVED******REMOVED***;
    eventBus._on("rotationchanging", evt => {
      this._pagesRotation = evt.pagesRotation;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async open(***REMOVED*** {
    await Promise.all([this.overlayManager.open(this.dialog***REMOVED***, this._dataAvailableCapability.promise]***REMOVED***;
    const currentPageNumber = this._currentPageNumber;
    const pagesRotation = this._pagesRotation;
    if (this.#fieldData && currentPageNumber === this.#fieldData._currentPageNumber && pagesRotation === this.#fieldData._pagesRotation***REMOVED*** {
      this.#updateUI(***REMOVED***;
      return;
    ***REMOVED***
    const [{
      info,
      contentLength
    ***REMOVED***, pdfPage] = await Promise.all([this.pdfDocument.getMetadata(***REMOVED***, this.pdfDocument.getPage(currentPageNumber***REMOVED***]***REMOVED***;
    const [fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized] = await Promise.all([this._fileNameLookup(***REMOVED***, this.#parseFileSize(contentLength***REMOVED***, this.#parseDate(info.CreationDate***REMOVED***, this.#parseDate(info.ModDate***REMOVED***, this.#parsePageSize(getPageSizeInches(pdfPage***REMOVED***, pagesRotation***REMOVED***, this.#parseLinearization(info.IsLinearized***REMOVED***]***REMOVED***;
    this.#fieldData = Object.freeze({
      fileName,
      fileSize,
      title: info.Title,
      author: info.Author,
      subject: info.Subject,
      keywords: info.Keywords,
      creationDate,
      modificationDate,
      creator: info.Creator,
      producer: info.Producer,
      version: info.PDFFormatVersion,
      pageCount: this.pdfDocument.numPages,
      pageSize,
      linearized: isLinearized,
      _currentPageNumber: currentPageNumber,
      _pagesRotation: pagesRotation
    ***REMOVED******REMOVED***;
    this.#updateUI(***REMOVED***;
    const {
      length
    ***REMOVED*** = await this.pdfDocument.getDownloadInfo(***REMOVED***;
    if (contentLength === length***REMOVED*** {
      return;
    ***REMOVED***
    const data = Object.assign(Object.create(null***REMOVED***, this.#fieldData***REMOVED***;
    data.fileSize = await this.#parseFileSize(length***REMOVED***;
    this.#fieldData = Object.freeze(data***REMOVED***;
    this.#updateUI(***REMOVED***;
  ***REMOVED***
  async close(***REMOVED*** {
    this.overlayManager.close(this.dialog***REMOVED***;
  ***REMOVED***
  setDocument(pdfDocument***REMOVED*** {
    if (this.pdfDocument***REMOVED*** {
      this.#reset(***REMOVED***;
      this.#updateUI(***REMOVED***;
    ***REMOVED***
    if (!pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this.pdfDocument = pdfDocument;
    this._dataAvailableCapability.resolve(***REMOVED***;
  ***REMOVED***
  #reset(***REMOVED*** {
    this.pdfDocument = null;
    this.#fieldData = null;
    this._dataAvailableCapability = Promise.withResolvers(***REMOVED***;
    this._currentPageNumber = 1;
    this._pagesRotation = 0;
  ***REMOVED***
  #updateUI(***REMOVED*** {
    if (this.#fieldData && this.overlayManager.active !== this.dialog***REMOVED*** {
      return;
    ***REMOVED***
    for (const id in this.fields***REMOVED*** {
      const content = this.#fieldData?.[id];
      this.fields[id].textContent = content || content === 0 ? content : "-";
    ***REMOVED***
  ***REMOVED***
  async #parseFileSize(b = 0***REMOVED*** {
    const kb = b / 1024,
      mb = kb / 1024;
    return kb ? this.l10n.get(mb >= 1 ? "pdfjs-document-properties-size-mb" : "pdfjs-document-properties-size-kb", {
      mb,
      kb,
      b
    ***REMOVED******REMOVED*** : undefined;
  ***REMOVED***
  async #parsePageSize(pageSizeInches, pagesRotation***REMOVED*** {
    if (!pageSizeInches***REMOVED*** {
      return undefined;
    ***REMOVED***
    if (pagesRotation % 180 !== 0***REMOVED*** {
      pageSizeInches = {
        width: pageSizeInches.height,
        height: pageSizeInches.width
      ***REMOVED***;
    ***REMOVED***
    const isPortrait = isPortraitOrientation(pageSizeInches***REMOVED***,
      nonMetric = NON_METRIC_LOCALES.includes(this.l10n.getLanguage(***REMOVED******REMOVED***;
    let sizeInches = {
      width: Math.round(pageSizeInches.width * 100***REMOVED*** / 100,
      height: Math.round(pageSizeInches.height * 100***REMOVED*** / 100
    ***REMOVED***;
    let sizeMillimeters = {
      width: Math.round(pageSizeInches.width * 25.4 * 10***REMOVED*** / 10,
      height: Math.round(pageSizeInches.height * 25.4 * 10***REMOVED*** / 10
    ***REMOVED***;
    let nameId = getPageName(sizeInches, isPortrait, US_PAGE_NAMES***REMOVED*** || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES***REMOVED***;
    if (!nameId && !(Number.isInteger(sizeMillimeters.width***REMOVED*** && Number.isInteger(sizeMillimeters.height***REMOVED******REMOVED******REMOVED*** {
      const exactMillimeters = {
        width: pageSizeInches.width * 25.4,
        height: pageSizeInches.height * 25.4
      ***REMOVED***;
      const intMillimeters = {
        width: Math.round(sizeMillimeters.width***REMOVED***,
        height: Math.round(sizeMillimeters.height***REMOVED***
      ***REMOVED***;
      if (Math.abs(exactMillimeters.width - intMillimeters.width***REMOVED*** < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height***REMOVED*** < 0.1***REMOVED*** {
        nameId = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES***REMOVED***;
        if (nameId***REMOVED*** {
          sizeInches = {
            width: Math.round(intMillimeters.width / 25.4 * 100***REMOVED*** / 100,
            height: Math.round(intMillimeters.height / 25.4 * 100***REMOVED*** / 100
          ***REMOVED***;
          sizeMillimeters = intMillimeters;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    const [{
      width,
      height
    ***REMOVED***, unit, name, orientation] = await Promise.all([nonMetric ? sizeInches : sizeMillimeters, this.l10n.get(nonMetric ? "pdfjs-document-properties-page-size-unit-inches" : "pdfjs-document-properties-page-size-unit-millimeters"***REMOVED***, nameId && this.l10n.get(nameId***REMOVED***, this.l10n.get(isPortrait ? "pdfjs-document-properties-page-size-orientation-portrait" : "pdfjs-document-properties-page-size-orientation-landscape"***REMOVED***]***REMOVED***;
    return this.l10n.get(name ? "pdfjs-document-properties-page-size-dimension-name-string" : "pdfjs-document-properties-page-size-dimension-string", {
      width,
      height,
      unit,
      name,
      orientation
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async #parseDate(inputDate***REMOVED*** {
    const dateObj = PDFDateString.toDateObject(inputDate***REMOVED***;
    return dateObj ? this.l10n.get("pdfjs-document-properties-date-time-string", {
      dateObj: dateObj.valueOf(***REMOVED***
    ***REMOVED******REMOVED*** : undefined;
  ***REMOVED***
  #parseLinearization(isLinearized***REMOVED*** {
    return this.l10n.get(isLinearized ? "pdfjs-document-properties-linearized-yes" : "pdfjs-document-properties-linearized-no"***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_find_utils.js
const CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
***REMOVED***;
function isAlphabeticalScript(charCode***REMOVED*** {
  return charCode < 0x2e80;
***REMOVED***
function isAscii(charCode***REMOVED*** {
  return (charCode & 0xff80***REMOVED*** === 0;
***REMOVED***
function isAsciiAlpha(charCode***REMOVED*** {
  return charCode >= 0x61 && charCode <= 0x7a || charCode >= 0x41 && charCode <= 0x5a;
***REMOVED***
function isAsciiDigit(charCode***REMOVED*** {
  return charCode >= 0x30 && charCode <= 0x39;
***REMOVED***
function isAsciiSpace(charCode***REMOVED*** {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
***REMOVED***
function isHan(charCode***REMOVED*** {
  return charCode >= 0x3400 && charCode <= 0x9fff || charCode >= 0xf900 && charCode <= 0xfaff;
***REMOVED***
function isKatakana(charCode***REMOVED*** {
  return charCode >= 0x30a0 && charCode <= 0x30ff;
***REMOVED***
function isHiragana(charCode***REMOVED*** {
  return charCode >= 0x3040 && charCode <= 0x309f;
***REMOVED***
function isHalfwidthKatakana(charCode***REMOVED*** {
  return charCode >= 0xff60 && charCode <= 0xff9f;
***REMOVED***
function isThai(charCode***REMOVED*** {
  return (charCode & 0xff80***REMOVED*** === 0x0e00;
***REMOVED***
function getCharacterType(charCode***REMOVED*** {
  if (isAlphabeticalScript(charCode***REMOVED******REMOVED*** {
    if (isAscii(charCode***REMOVED******REMOVED*** {
      if (isAsciiSpace(charCode***REMOVED******REMOVED*** {
        return CharacterType.SPACE;
      ***REMOVED*** else if (isAsciiAlpha(charCode***REMOVED*** || isAsciiDigit(charCode***REMOVED*** || charCode === 0x5f***REMOVED*** {
        return CharacterType.ALPHA_LETTER;
      ***REMOVED***
      return CharacterType.PUNCT;
    ***REMOVED*** else if (isThai(charCode***REMOVED******REMOVED*** {
      return CharacterType.THAI_LETTER;
    ***REMOVED*** else if (charCode === 0xa0***REMOVED*** {
      return CharacterType.SPACE;
    ***REMOVED***
    return CharacterType.ALPHA_LETTER;
  ***REMOVED***
  if (isHan(charCode***REMOVED******REMOVED*** {
    return CharacterType.HAN_LETTER;
  ***REMOVED*** else if (isKatakana(charCode***REMOVED******REMOVED*** {
    return CharacterType.KATAKANA_LETTER;
  ***REMOVED*** else if (isHiragana(charCode***REMOVED******REMOVED*** {
    return CharacterType.HIRAGANA_LETTER;
  ***REMOVED*** else if (isHalfwidthKatakana(charCode***REMOVED******REMOVED*** {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  ***REMOVED***
  return CharacterType.ALPHA_LETTER;
***REMOVED***
let NormalizeWithNFKC;
function getNormalizeWithNFKC(***REMOVED*** {
  NormalizeWithNFKC ||= ` ¨ª¯²-µ¸-º¼-¾Ĳ-ĳĿ-ŀŉſǄ-ǌǱ-ǳʰ-ʸ˘-˝ˠ-ˤʹͺ;΄-΅·ϐ-ϖϰ-ϲϴ-ϵϹևٵ-ٸक़-य़ড়-ঢ়য়ਲ਼ਸ਼ਖ਼-ਜ਼ਫ਼ଡ଼-ଢ଼ำຳໜ-ໝ༌གྷཌྷདྷབྷཛྷཀྵჼᴬ-ᴮᴰ-ᴺᴼ-ᵍᵏ-ᵪᵸᶛ-ᶿẚ-ẛάέήίόύώΆ᾽-῁ΈΉ῍-῏ΐΊ῝-῟ΰΎ῭-`ΌΏ´-῾ - ‑‗․-… ″-‴‶-‷‼‾⁇-⁉⁗ ⁰-ⁱ⁴-₎ₐ-ₜ₨℀-℃℅-ℇ℉-ℓℕ-№ℙ-ℝ℠-™ℤΩℨK-ℭℯ-ℱℳ-ℹ℻-⅀ⅅ-ⅉ⅐-ⅿ↉∬-∭∯-∰〈-〉①-⓪⨌⩴-⩶⫝̸ⱼ-ⱽⵯ⺟⻳⼀-⿕　〶〸-〺゛-゜ゟヿㄱ-ㆎ㆒-㆟㈀-㈞㈠-㉇㉐-㉾㊀-㏿ꚜ-ꚝꝰꟲ-ꟴꟸ-ꟹꭜ-ꭟꭩ豈-嗀塚晴凞-羽蘒諸逸-都飯-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-﷼︐-︙︰-﹄﹇-﹒﹔-﹦﹨-﹫ﹰ-ﹲﹴﹶ-ﻼ！-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ￠-￦`;
  return NormalizeWithNFKC;
***REMOVED***

;// ./web/pdf_find_controller.js


const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
***REMOVED***;
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
  "\u2010": "-",
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\u00BC": "1/4",
  "\u00BD": "1/2",
  "\u00BE": "3/4"
***REMOVED***;
const DIACRITICS_EXCEPTION = new Set([0x3099, 0x309a, 0x094d, 0x09cd, 0x0a4d, 0x0acd, 0x0b4d, 0x0bcd, 0x0c4d, 0x0ccd, 0x0d3b, 0x0d3c, 0x0d4d, 0x0dca, 0x0e3a, 0x0eba, 0x0f84, 0x1039, 0x103a, 0x1714, 0x1734, 0x17d2, 0x1a60, 0x1b44, 0x1baa, 0x1bab, 0x1bf2, 0x1bf3, 0x2d7f, 0xa806, 0xa82c, 0xa8c4, 0xa953, 0xa9c0, 0xaaf6, 0xabed, 0x0c56, 0x0f71, 0x0f72, 0x0f7a, 0x0f7b, 0x0f7c, 0x0f7d, 0x0f80, 0x0f74]***REMOVED***;
let DIACRITICS_EXCEPTION_STR;
const DIACRITICS_REG_EXP = /\p{M***REMOVED***+/gu;
const SPECIAL_CHARS_REG_EXP = /([.*+?^${***REMOVED***(***REMOVED***|[\]\\]***REMOVED***|(\p{P***REMOVED******REMOVED***|(\s+***REMOVED***|(\p{M***REMOVED******REMOVED***|(\p{L***REMOVED******REMOVED***/gu;
const NOT_DIACRITIC_FROM_END_REG_EXP = /([^\p{M***REMOVED***]***REMOVED***\p{M***REMOVED****$/u;
const NOT_DIACRITIC_FROM_START_REG_EXP = /^\p{M***REMOVED****([^\p{M***REMOVED***]***REMOVED***/u;
const SYLLABLES_REG_EXP = /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g;
const SYLLABLES_LENGTHS = new Map(***REMOVED***;
const FIRST_CHAR_SYLLABLES_REG_EXP = "[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]";
const NFKC_CHARS_TO_NORMALIZE = new Map(***REMOVED***;
let noSyllablesRegExp = null;
let withSyllablesRegExp = null;
function normalize(text***REMOVED*** {
  const syllablePositions = [];
  let m;
  while ((m = SYLLABLES_REG_EXP.exec(text***REMOVED******REMOVED*** !== null***REMOVED*** {
    let {
      index
    ***REMOVED*** = m;
    for (const char of m[0]***REMOVED*** {
      let len = SYLLABLES_LENGTHS.get(char***REMOVED***;
      if (!len***REMOVED*** {
        len = char.normalize("NFD"***REMOVED***.length;
        SYLLABLES_LENGTHS.set(char, len***REMOVED***;
      ***REMOVED***
      syllablePositions.push([len, index++]***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  let normalizationRegex;
  if (syllablePositions.length === 0 && noSyllablesRegExp***REMOVED*** {
    normalizationRegex = noSyllablesRegExp;
  ***REMOVED*** else if (syllablePositions.length > 0 && withSyllablesRegExp***REMOVED*** {
    normalizationRegex = withSyllablesRegExp;
  ***REMOVED*** else {
    const replace = Object.keys(CHARACTERS_TO_NORMALIZE***REMOVED***.join(""***REMOVED***;
    const toNormalizeWithNFKC = getNormalizeWithNFKC(***REMOVED***;
    const CJK = "(?:\\p{Ideographic***REMOVED***|[\u3040-\u30FF]***REMOVED***";
    const HKDiacritics = "(?:\u3099|\u309A***REMOVED***";
    const CompoundWord = "\\p{Ll***REMOVED***-\\n\\p{Lu***REMOVED***";
    const regexp = `([${replace***REMOVED***]***REMOVED***|([${toNormalizeWithNFKC***REMOVED***]***REMOVED***|(${HKDiacritics***REMOVED***\\n***REMOVED***|(\\p{M***REMOVED***+(?:-\\n***REMOVED***?***REMOVED***|(${CompoundWord***REMOVED******REMOVED***|(\\S-\\n***REMOVED***|(${CJK***REMOVED***\\n***REMOVED***|(\\n***REMOVED***`;
    if (syllablePositions.length === 0***REMOVED*** {
      normalizationRegex = noSyllablesRegExp = new RegExp(regexp + "|(\\u0000***REMOVED***", "gum"***REMOVED***;
    ***REMOVED*** else {
      normalizationRegex = withSyllablesRegExp = new RegExp(regexp + `|(${FIRST_CHAR_SYLLABLES_REG_EXP***REMOVED******REMOVED***`, "gum"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  const rawDiacriticsPositions = [];
  while ((m = DIACRITICS_REG_EXP.exec(text***REMOVED******REMOVED*** !== null***REMOVED*** {
    rawDiacriticsPositions.push([m[0].length, m.index]***REMOVED***;
  ***REMOVED***
  let normalized = text.normalize("NFD"***REMOVED***;
  const positions = [0, 0];
  let rawDiacriticsIndex = 0;
  let syllableIndex = 0;
  let shift = 0;
  let shiftOrigin = 0;
  let eol = 0;
  let hasDiacritics = false;
  normalized = normalized.replace(normalizationRegex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, i***REMOVED*** => {
    i -= shiftOrigin;
    if (p1***REMOVED*** {
      const replacement = CHARACTERS_TO_NORMALIZE[p1];
      const jj = replacement.length;
      for (let j = 1; j < jj; j++***REMOVED*** {
        positions.push(i - shift + j, shift - j***REMOVED***;
      ***REMOVED***
      shift -= jj - 1;
      return replacement;
    ***REMOVED***
    if (p2***REMOVED*** {
      let replacement = NFKC_CHARS_TO_NORMALIZE.get(p2***REMOVED***;
      if (!replacement***REMOVED*** {
        replacement = p2.normalize("NFKC"***REMOVED***;
        NFKC_CHARS_TO_NORMALIZE.set(p2, replacement***REMOVED***;
      ***REMOVED***
      const jj = replacement.length;
      for (let j = 1; j < jj; j++***REMOVED*** {
        positions.push(i - shift + j, shift - j***REMOVED***;
      ***REMOVED***
      shift -= jj - 1;
      return replacement;
    ***REMOVED***
    if (p3***REMOVED*** {
      hasDiacritics = true;
      if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]***REMOVED*** {
        ++rawDiacriticsIndex;
      ***REMOVED*** else {
        positions.push(i - 1 - shift + 1, shift - 1***REMOVED***;
        shift -= 1;
        shiftOrigin += 1;
      ***REMOVED***
      positions.push(i - shift + 1, shift***REMOVED***;
      shiftOrigin += 1;
      eol += 1;
      return p3.charAt(0***REMOVED***;
    ***REMOVED***
    if (p4***REMOVED*** {
      const hasTrailingDashEOL = p4.endsWith("\n"***REMOVED***;
      const len = hasTrailingDashEOL ? p4.length - 2 : p4.length;
      hasDiacritics = true;
      let jj = len;
      if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]***REMOVED*** {
        jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
        ++rawDiacriticsIndex;
      ***REMOVED***
      for (let j = 1; j <= jj; j++***REMOVED*** {
        positions.push(i - 1 - shift + j, shift - j***REMOVED***;
      ***REMOVED***
      shift -= jj;
      shiftOrigin += jj;
      if (hasTrailingDashEOL***REMOVED*** {
        i += len - 1;
        positions.push(i - shift + 1, 1 + shift***REMOVED***;
        shift += 1;
        shiftOrigin += 1;
        eol += 1;
        return p4.slice(0, len***REMOVED***;
      ***REMOVED***
      return p4;
    ***REMOVED***
    if (p5***REMOVED*** {
      shiftOrigin += 1;
      eol += 1;
      return p5.replace("\n", ""***REMOVED***;
    ***REMOVED***
    if (p6***REMOVED*** {
      const len = p6.length - 2;
      positions.push(i - shift + len, 1 + shift***REMOVED***;
      shift += 1;
      shiftOrigin += 1;
      eol += 1;
      return p6.slice(0, -2***REMOVED***;
    ***REMOVED***
    if (p7***REMOVED*** {
      const len = p7.length - 1;
      positions.push(i - shift + len, shift***REMOVED***;
      shiftOrigin += 1;
      eol += 1;
      return p7.slice(0, -1***REMOVED***;
    ***REMOVED***
    if (p8***REMOVED*** {
      positions.push(i - shift + 1, shift - 1***REMOVED***;
      shift -= 1;
      shiftOrigin += 1;
      eol += 1;
      return " ";
    ***REMOVED***
    if (i + eol === syllablePositions[syllableIndex]?.[1]***REMOVED*** {
      const newCharLen = syllablePositions[syllableIndex][0] - 1;
      ++syllableIndex;
      for (let j = 1; j <= newCharLen; j++***REMOVED*** {
        positions.push(i - (shift - j***REMOVED***, shift - j***REMOVED***;
      ***REMOVED***
      shift -= newCharLen;
      shiftOrigin += newCharLen;
    ***REMOVED***
    return p9;
  ***REMOVED******REMOVED***;
  positions.push(normalized.length, shift***REMOVED***;
  const starts = new Uint32Array(positions.length >> 1***REMOVED***;
  const shifts = new Int32Array(positions.length >> 1***REMOVED***;
  for (let i = 0, ii = positions.length; i < ii; i += 2***REMOVED*** {
    starts[i >> 1] = positions[i];
    shifts[i >> 1] = positions[i + 1];
  ***REMOVED***
  return [normalized, [starts, shifts], hasDiacritics];
***REMOVED***
function getOriginalIndex(diffs, pos, len***REMOVED*** {
  if (!diffs***REMOVED*** {
    return [pos, len];
  ***REMOVED***
  const [starts, shifts] = diffs;
  const start = pos;
  const end = pos + len - 1;
  let i = binarySearchFirstItem(starts, x => x >= start***REMOVED***;
  if (starts[i] > start***REMOVED*** {
    --i;
  ***REMOVED***
  let j = binarySearchFirstItem(starts, x => x >= end, i***REMOVED***;
  if (starts[j] > end***REMOVED*** {
    --j;
  ***REMOVED***
  const oldStart = start + shifts[i];
  const oldEnd = end + shifts[j];
  const oldLen = oldEnd + 1 - oldStart;
  return [oldStart, oldLen];
***REMOVED***
class PDFFindController {
  #state = null;
  #updateMatchesCountOnProgress = true;
  #visitedPagesCount = 0;
  constructor({
    linkService,
    eventBus,
    updateMatchesCountOnProgress = true
  ***REMOVED******REMOVED*** {
    this._linkService = linkService;
    this._eventBus = eventBus;
    this.#updateMatchesCountOnProgress = updateMatchesCountOnProgress;
    this.onIsPageVisible = null;
    this.#reset(***REMOVED***;
    eventBus._on("find", this.#onFind.bind(this***REMOVED******REMOVED***;
    eventBus._on("findbarclose", this.#onFindBarClose.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
  get highlightMatches(***REMOVED*** {
    return this._highlightMatches;
  ***REMOVED***
  get pageMatches(***REMOVED*** {
    return this._pageMatches;
  ***REMOVED***
  get pageMatchesLength(***REMOVED*** {
    return this._pageMatchesLength;
  ***REMOVED***
  get selected(***REMOVED*** {
    return this._selected;
  ***REMOVED***
  get state(***REMOVED*** {
    return this.#state;
  ***REMOVED***
  setDocument(pdfDocument***REMOVED*** {
    if (this._pdfDocument***REMOVED*** {
      this.#reset(***REMOVED***;
    ***REMOVED***
    if (!pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this._pdfDocument = pdfDocument;
    this._firstPageCapability.resolve(***REMOVED***;
  ***REMOVED***
  #onFind(state***REMOVED*** {
    if (!state***REMOVED*** {
      return;
    ***REMOVED***
    const pdfDocument = this._pdfDocument;
    const {
      type
    ***REMOVED*** = state;
    if (this.#state === null || this.#shouldDirtyMatch(state***REMOVED******REMOVED*** {
      this._dirtyMatch = true;
    ***REMOVED***
    this.#state = state;
    if (type !== "highlightallchange"***REMOVED*** {
      this.#updateUIState(FindState.PENDING***REMOVED***;
    ***REMOVED***
    this._firstPageCapability.promise.then((***REMOVED*** => {
      if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument***REMOVED*** {
        return;
      ***REMOVED***
      this.#extractText(***REMOVED***;
      const findbarClosed = !this._highlightMatches;
      const pendingTimeout = !!this._findTimeout;
      if (this._findTimeout***REMOVED*** {
        clearTimeout(this._findTimeout***REMOVED***;
        this._findTimeout = null;
      ***REMOVED***
      if (!type***REMOVED*** {
        this._findTimeout = setTimeout((***REMOVED*** => {
          this.#nextMatch(***REMOVED***;
          this._findTimeout = null;
        ***REMOVED***, FIND_TIMEOUT***REMOVED***;
      ***REMOVED*** else if (this._dirtyMatch***REMOVED*** {
        this.#nextMatch(***REMOVED***;
      ***REMOVED*** else if (type === "again"***REMOVED*** {
        this.#nextMatch(***REMOVED***;
        if (findbarClosed && this.#state.highlightAll***REMOVED*** {
          this.#updateAllPages(***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else if (type === "highlightallchange"***REMOVED*** {
        if (pendingTimeout***REMOVED*** {
          this.#nextMatch(***REMOVED***;
        ***REMOVED*** else {
          this._highlightMatches = true;
        ***REMOVED***
        this.#updateAllPages(***REMOVED***;
      ***REMOVED*** else {
        this.#nextMatch(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  scrollMatchIntoView({
    element = null,
    selectedLeft = 0,
    pageIndex = -1,
    matchIndex = -1
  ***REMOVED******REMOVED*** {
    if (!this._scrollMatches || !element***REMOVED*** {
      return;
    ***REMOVED*** else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx***REMOVED*** {
      return;
    ***REMOVED*** else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx***REMOVED*** {
      return;
    ***REMOVED***
    this._scrollMatches = false;
    const spot = {
      top: MATCH_SCROLL_OFFSET_TOP,
      left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT
    ***REMOVED***;
    scrollIntoView(element, spot, true***REMOVED***;
  ***REMOVED***
  #reset(***REMOVED*** {
    this._highlightMatches = false;
    this._scrollMatches = false;
    this._pdfDocument = null;
    this._pageMatches = [];
    this._pageMatchesLength = [];
    this.#visitedPagesCount = 0;
    this.#state = null;
    this._selected = {
      pageIdx: -1,
      matchIdx: -1
    ***REMOVED***;
    this._offset = {
      pageIdx: null,
      matchIdx: null,
      wrapped: false
    ***REMOVED***;
    this._extractTextPromises = [];
    this._pageContents = [];
    this._pageDiffs = [];
    this._hasDiacritics = [];
    this._matchesCountTotal = 0;
    this._pagesToSearch = null;
    this._pendingFindMatches = new Set(***REMOVED***;
    this._resumePageIdx = null;
    this._dirtyMatch = false;
    clearTimeout(this._findTimeout***REMOVED***;
    this._findTimeout = null;
    this._firstPageCapability = Promise.withResolvers(***REMOVED***;
  ***REMOVED***
  get #query(***REMOVED*** {
    const {
      query
    ***REMOVED*** = this.#state;
    if (typeof query === "string"***REMOVED*** {
      if (query !== this._rawQuery***REMOVED*** {
        this._rawQuery = query;
        [this._normalizedQuery] = normalize(query***REMOVED***;
      ***REMOVED***
      return this._normalizedQuery;
    ***REMOVED***
    return (query || []***REMOVED***.filter(q => !!q***REMOVED***.map(q => normalize(q***REMOVED***[0]***REMOVED***;
  ***REMOVED***
  #shouldDirtyMatch(state***REMOVED*** {
    const newQuery = state.query,
      prevQuery = this.#state.query;
    const newType = typeof newQuery,
      prevType = typeof prevQuery;
    if (newType !== prevType***REMOVED*** {
      return true;
    ***REMOVED***
    if (newType === "string"***REMOVED*** {
      if (newQuery !== prevQuery***REMOVED*** {
        return true;
      ***REMOVED***
    ***REMOVED*** else if (JSON.stringify(newQuery***REMOVED*** !== JSON.stringify(prevQuery***REMOVED******REMOVED*** {
      return true;
    ***REMOVED***
    switch (state.type***REMOVED*** {
      case "again":
        const pageNumber = this._selected.pageIdx + 1;
        const linkService = this._linkService;
        return pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !(this.onIsPageVisible?.(pageNumber***REMOVED*** ?? true***REMOVED***;
      case "highlightallchange":
        return false;
    ***REMOVED***
    return true;
  ***REMOVED***
  #isEntireWord(content, startIdx, length***REMOVED*** {
    let match = content.slice(0, startIdx***REMOVED***.match(NOT_DIACRITIC_FROM_END_REG_EXP***REMOVED***;
    if (match***REMOVED*** {
      const first = content.charCodeAt(startIdx***REMOVED***;
      const limit = match[1].charCodeAt(0***REMOVED***;
      if (getCharacterType(first***REMOVED*** === getCharacterType(limit***REMOVED******REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    match = content.slice(startIdx + length***REMOVED***.match(NOT_DIACRITIC_FROM_START_REG_EXP***REMOVED***;
    if (match***REMOVED*** {
      const last = content.charCodeAt(startIdx + length - 1***REMOVED***;
      const limit = match[1].charCodeAt(0***REMOVED***;
      if (getCharacterType(last***REMOVED*** === getCharacterType(limit***REMOVED******REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    return true;
  ***REMOVED***
  #convertToRegExpString(query, hasDiacritics***REMOVED*** {
    const {
      matchDiacritics
    ***REMOVED*** = this.#state;
    let isUnicode = false;
    query = query.replaceAll(SPECIAL_CHARS_REG_EXP, (match, p1, p2, p3, p4, p5***REMOVED*** => {
      if (p1***REMOVED*** {
        return `[ ]*\\${p1***REMOVED***[ ]*`;
      ***REMOVED***
      if (p2***REMOVED*** {
        return `[ ]*${p2***REMOVED***[ ]*`;
      ***REMOVED***
      if (p3***REMOVED*** {
        return "[ ]+";
      ***REMOVED***
      if (matchDiacritics***REMOVED*** {
        return p4 || p5;
      ***REMOVED***
      if (p4***REMOVED*** {
        return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0***REMOVED******REMOVED*** ? p4 : "";
      ***REMOVED***
      if (hasDiacritics***REMOVED*** {
        isUnicode = true;
        return `${p5***REMOVED***\\p{M***REMOVED****`;
      ***REMOVED***
      return p5;
    ***REMOVED******REMOVED***;
    const trailingSpaces = "[ ]*";
    if (query.endsWith(trailingSpaces***REMOVED******REMOVED*** {
      query = query.slice(0, query.length - trailingSpaces.length***REMOVED***;
    ***REMOVED***
    if (matchDiacritics***REMOVED*** {
      if (hasDiacritics***REMOVED*** {
        DIACRITICS_EXCEPTION_STR ||= String.fromCharCode(...DIACRITICS_EXCEPTION***REMOVED***;
        isUnicode = true;
        query = `${query***REMOVED***(?=[${DIACRITICS_EXCEPTION_STR***REMOVED***]|[^\\p{M***REMOVED***]|$***REMOVED***`;
      ***REMOVED***
    ***REMOVED***
    return [isUnicode, query];
  ***REMOVED***
  #calculateMatch(pageIndex***REMOVED*** {
    const query = this.#query;
    if (query.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    const pageContent = this._pageContents[pageIndex];
    const matcherResult = this.match(query, pageContent, pageIndex***REMOVED***;
    const matches = this._pageMatches[pageIndex] = [];
    const matchesLength = this._pageMatchesLength[pageIndex] = [];
    const diffs = this._pageDiffs[pageIndex];
    matcherResult?.forEach(({
      index,
      length
    ***REMOVED******REMOVED*** => {
      const [matchPos, matchLen] = getOriginalIndex(diffs, index, length***REMOVED***;
      if (matchLen***REMOVED*** {
        matches.push(matchPos***REMOVED***;
        matchesLength.push(matchLen***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    if (this.#state.highlightAll***REMOVED*** {
      this.#updatePage(pageIndex***REMOVED***;
    ***REMOVED***
    if (this._resumePageIdx === pageIndex***REMOVED*** {
      this._resumePageIdx = null;
      this.#nextPageMatch(***REMOVED***;
    ***REMOVED***
    const pageMatchesCount = matches.length;
    this._matchesCountTotal += pageMatchesCount;
    if (this.#updateMatchesCountOnProgress***REMOVED*** {
      if (pageMatchesCount > 0***REMOVED*** {
        this.#updateUIResultsCount(***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (++this.#visitedPagesCount === this._linkService.pagesCount***REMOVED*** {
      this.#updateUIResultsCount(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  match(query, pageContent, pageIndex***REMOVED*** {
    const hasDiacritics = this._hasDiacritics[pageIndex];
    let isUnicode = false;
    if (typeof query === "string"***REMOVED*** {
      [isUnicode, query] = this.#convertToRegExpString(query, hasDiacritics***REMOVED***;
    ***REMOVED*** else {
      query = query.sort(***REMOVED***.reverse(***REMOVED***.map(q => {
        const [isUnicodePart, queryPart] = this.#convertToRegExpString(q, hasDiacritics***REMOVED***;
        isUnicode ||= isUnicodePart;
        return `(${queryPart***REMOVED******REMOVED***`;
      ***REMOVED******REMOVED***.join("|"***REMOVED***;
    ***REMOVED***
    if (!query***REMOVED*** {
      return undefined;
    ***REMOVED***
    const {
      caseSensitive,
      entireWord
    ***REMOVED*** = this.#state;
    const flags = `g${isUnicode ? "u" : ""***REMOVED***${caseSensitive ? "" : "i"***REMOVED***`;
    query = new RegExp(query, flags***REMOVED***;
    const matches = [];
    let match;
    while ((match = query.exec(pageContent***REMOVED******REMOVED*** !== null***REMOVED*** {
      if (entireWord && !this.#isEntireWord(pageContent, match.index, match[0].length***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      matches.push({
        index: match.index,
        length: match[0].length
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return matches;
  ***REMOVED***
  #extractText(***REMOVED*** {
    if (this._extractTextPromises.length > 0***REMOVED*** {
      return;
    ***REMOVED***
    let deferred = Promise.resolve(***REMOVED***;
    const textOptions = {
      disableNormalization: true
    ***REMOVED***;
    for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++***REMOVED*** {
      const {
        promise,
        resolve
      ***REMOVED*** = Promise.withResolvers(***REMOVED***;
      this._extractTextPromises[i] = promise;
      deferred = deferred.then((***REMOVED*** => {
        return this._pdfDocument.getPage(i + 1***REMOVED***.then(pdfPage => pdfPage.getTextContent(textOptions***REMOVED******REMOVED***.then(textContent => {
          const strBuf = [];
          for (const textItem of textContent.items***REMOVED*** {
            strBuf.push(textItem.str***REMOVED***;
            if (textItem.hasEOL***REMOVED*** {
              strBuf.push("\n"***REMOVED***;
            ***REMOVED***
          ***REMOVED***
          [this._pageContents[i], this._pageDiffs[i], this._hasDiacritics[i]] = normalize(strBuf.join(""***REMOVED******REMOVED***;
          resolve(***REMOVED***;
        ***REMOVED***, reason => {
          console.error(`Unable to get text content for page ${i + 1***REMOVED***`, reason***REMOVED***;
          this._pageContents[i] = "";
          this._pageDiffs[i] = null;
          this._hasDiacritics[i] = false;
          resolve(***REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #updatePage(index***REMOVED*** {
    if (this._scrollMatches && this._selected.pageIdx === index***REMOVED*** {
      this._linkService.page = index + 1;
    ***REMOVED***
    this._eventBus.dispatch("updatetextlayermatches", {
      source: this,
      pageIndex: index
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #updateAllPages(***REMOVED*** {
    this._eventBus.dispatch("updatetextlayermatches", {
      source: this,
      pageIndex: -1
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #nextMatch(***REMOVED*** {
    const previous = this.#state.findPrevious;
    const currentPageIndex = this._linkService.page - 1;
    const numPages = this._linkService.pagesCount;
    this._highlightMatches = true;
    if (this._dirtyMatch***REMOVED*** {
      this._dirtyMatch = false;
      this._selected.pageIdx = this._selected.matchIdx = -1;
      this._offset.pageIdx = currentPageIndex;
      this._offset.matchIdx = null;
      this._offset.wrapped = false;
      this._resumePageIdx = null;
      this._pageMatches.length = 0;
      this._pageMatchesLength.length = 0;
      this.#visitedPagesCount = 0;
      this._matchesCountTotal = 0;
      this.#updateAllPages(***REMOVED***;
      for (let i = 0; i < numPages; i++***REMOVED*** {
        if (this._pendingFindMatches.has(i***REMOVED******REMOVED*** {
          continue;
        ***REMOVED***
        this._pendingFindMatches.add(i***REMOVED***;
        this._extractTextPromises[i].then((***REMOVED*** => {
          this._pendingFindMatches.delete(i***REMOVED***;
          this.#calculateMatch(i***REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const query = this.#query;
    if (query.length === 0***REMOVED*** {
      this.#updateUIState(FindState.FOUND***REMOVED***;
      return;
    ***REMOVED***
    if (this._resumePageIdx***REMOVED*** {
      return;
    ***REMOVED***
    const offset = this._offset;
    this._pagesToSearch = numPages;
    if (offset.matchIdx !== null***REMOVED*** {
      const numPageMatches = this._pageMatches[offset.pageIdx].length;
      if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0***REMOVED*** {
        offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
        this.#updateMatch(true***REMOVED***;
        return;
      ***REMOVED***
      this.#advanceOffsetPage(previous***REMOVED***;
    ***REMOVED***
    this.#nextPageMatch(***REMOVED***;
  ***REMOVED***
  #matchesReady(matches***REMOVED*** {
    const offset = this._offset;
    const numMatches = matches.length;
    const previous = this.#state.findPrevious;
    if (numMatches***REMOVED*** {
      offset.matchIdx = previous ? numMatches - 1 : 0;
      this.#updateMatch(true***REMOVED***;
      return true;
    ***REMOVED***
    this.#advanceOffsetPage(previous***REMOVED***;
    if (offset.wrapped***REMOVED*** {
      offset.matchIdx = null;
      if (this._pagesToSearch < 0***REMOVED*** {
        this.#updateMatch(false***REMOVED***;
        return true;
      ***REMOVED***
    ***REMOVED***
    return false;
  ***REMOVED***
  #nextPageMatch(***REMOVED*** {
    if (this._resumePageIdx !== null***REMOVED*** {
      console.error("There can only be one pending page."***REMOVED***;
    ***REMOVED***
    let matches = null;
    do {
      const pageIdx = this._offset.pageIdx;
      matches = this._pageMatches[pageIdx];
      if (!matches***REMOVED*** {
        this._resumePageIdx = pageIdx;
        break;
      ***REMOVED***
    ***REMOVED*** while (!this.#matchesReady(matches***REMOVED******REMOVED***;
  ***REMOVED***
  #advanceOffsetPage(previous***REMOVED*** {
    const offset = this._offset;
    const numPages = this._linkService.pagesCount;
    offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
    offset.matchIdx = null;
    this._pagesToSearch--;
    if (offset.pageIdx >= numPages || offset.pageIdx < 0***REMOVED*** {
      offset.pageIdx = previous ? numPages - 1 : 0;
      offset.wrapped = true;
    ***REMOVED***
  ***REMOVED***
  #updateMatch(found = false***REMOVED*** {
    let state = FindState.NOT_FOUND;
    const wrapped = this._offset.wrapped;
    this._offset.wrapped = false;
    if (found***REMOVED*** {
      const previousPage = this._selected.pageIdx;
      this._selected.pageIdx = this._offset.pageIdx;
      this._selected.matchIdx = this._offset.matchIdx;
      state = wrapped ? FindState.WRAPPED : FindState.FOUND;
      if (previousPage !== -1 && previousPage !== this._selected.pageIdx***REMOVED*** {
        this.#updatePage(previousPage***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#updateUIState(state, this.#state.findPrevious***REMOVED***;
    if (this._selected.pageIdx !== -1***REMOVED*** {
      this._scrollMatches = true;
      this.#updatePage(this._selected.pageIdx***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #onFindBarClose(evt***REMOVED*** {
    const pdfDocument = this._pdfDocument;
    this._firstPageCapability.promise.then((***REMOVED*** => {
      if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument***REMOVED*** {
        return;
      ***REMOVED***
      if (this._findTimeout***REMOVED*** {
        clearTimeout(this._findTimeout***REMOVED***;
        this._findTimeout = null;
      ***REMOVED***
      if (this._resumePageIdx***REMOVED*** {
        this._resumePageIdx = null;
        this._dirtyMatch = true;
      ***REMOVED***
      this.#updateUIState(FindState.FOUND***REMOVED***;
      this._highlightMatches = false;
      this.#updateAllPages(***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #requestMatchesCount(***REMOVED*** {
    const {
      pageIdx,
      matchIdx
    ***REMOVED*** = this._selected;
    let current = 0,
      total = this._matchesCountTotal;
    if (matchIdx !== -1***REMOVED*** {
      for (let i = 0; i < pageIdx; i++***REMOVED*** {
        current += this._pageMatches[i]?.length || 0;
      ***REMOVED***
      current += matchIdx + 1;
    ***REMOVED***
    if (current < 1 || current > total***REMOVED*** {
      current = total = 0;
    ***REMOVED***
***REMOVED***
      current,
      total
    ***REMOVED***;
  ***REMOVED***
  #updateUIResultsCount(***REMOVED*** {
    this._eventBus.dispatch("updatefindmatchescount", {
      source: this,
      matchesCount: this.#requestMatchesCount(***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #updateUIState(state, previous = false***REMOVED*** {
    if (!this.#updateMatchesCountOnProgress && (this.#visitedPagesCount !== this._linkService.pagesCount || state === FindState.PENDING***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this._eventBus.dispatch("updatefindcontrolstate", {
      source: this,
      state,
      previous,
      entireWord: this.#state?.entireWord ?? null,
      matchesCount: this.#requestMatchesCount(***REMOVED***,
      rawQuery: this.#state?.query ?? null
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_find_bar.js


const MATCHES_COUNT_LIMIT = 1000;
class PDFFindBar {
  #mainContainer;
  #resizeObserver = new ResizeObserver(this.#resizeObserverCallback.bind(this***REMOVED******REMOVED***;
  constructor(options, mainContainer, eventBus***REMOVED*** {
    this.opened = false;
    this.bar = options.bar;
    this.toggleButton = options.toggleButton;
    this.findField = options.findField;
    this.highlightAll = options.highlightAllCheckbox;
    this.caseSensitive = options.caseSensitiveCheckbox;
    this.matchDiacritics = options.matchDiacriticsCheckbox;
    this.entireWord = options.entireWordCheckbox;
    this.findMsg = options.findMsg;
    this.findResultsCount = options.findResultsCount;
    this.findPreviousButton = options.findPreviousButton;
    this.findNextButton = options.findNextButton;
    this.eventBus = eventBus;
    this.#mainContainer = mainContainer;
    const checkedInputs = new Map([[this.highlightAll, "highlightallchange"], [this.caseSensitive, "casesensitivitychange"], [this.entireWord, "entirewordchange"], [this.matchDiacritics, "diacriticmatchingchange"]]***REMOVED***;
    this.toggleButton.addEventListener("click", (***REMOVED*** => {
      this.toggle(***REMOVED***;
    ***REMOVED******REMOVED***;
    this.findField.addEventListener("input", (***REMOVED*** => {
      this.dispatchEvent(""***REMOVED***;
    ***REMOVED******REMOVED***;
    this.bar.addEventListener("keydown", ({
      keyCode,
      shiftKey,
      target
    ***REMOVED******REMOVED*** => {
      switch (keyCode***REMOVED*** {
        case 13:
          if (target === this.findField***REMOVED*** {
            this.dispatchEvent("again", shiftKey***REMOVED***;
          ***REMOVED*** else if (checkedInputs.has(target***REMOVED******REMOVED*** {
            target.checked = !target.checked;
            this.dispatchEvent(checkedInputs.get(target***REMOVED******REMOVED***;
          ***REMOVED***
          break;
        case 27:
          this.close(***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.findPreviousButton.addEventListener("click", (***REMOVED*** => {
      this.dispatchEvent("again", true***REMOVED***;
    ***REMOVED******REMOVED***;
    this.findNextButton.addEventListener("click", (***REMOVED*** => {
      this.dispatchEvent("again", false***REMOVED***;
    ***REMOVED******REMOVED***;
    for (const [elem, evtName] of checkedInputs***REMOVED*** {
      elem.addEventListener("click", (***REMOVED*** => {
        this.dispatchEvent(evtName***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  reset(***REMOVED*** {
    this.updateUIState(***REMOVED***;
  ***REMOVED***
  dispatchEvent(type, findPrev = false***REMOVED*** {
    this.eventBus.dispatch("find", {
      source: this,
      type,
      query: this.findField.value,
      caseSensitive: this.caseSensitive.checked,
      entireWord: this.entireWord.checked,
      highlightAll: this.highlightAll.checked,
      findPrevious: findPrev,
      matchDiacritics: this.matchDiacritics.checked
    ***REMOVED******REMOVED***;
  ***REMOVED***
  updateUIState(state, previous, matchesCount***REMOVED*** {
    const {
      findField,
      findMsg
    ***REMOVED*** = this;
    let findMsgId = "",
      status = "";
    switch (state***REMOVED*** {
      case FindState.FOUND:
        break;
      case FindState.PENDING:
        status = "pending";
        break;
      case FindState.NOT_FOUND:
        findMsgId = "pdfjs-find-not-found";
        status = "notFound";
        break;
      case FindState.WRAPPED:
        findMsgId = previous ? "pdfjs-find-reached-top" : "pdfjs-find-reached-bottom";
        break;
    ***REMOVED***
    findField.setAttribute("data-status", status***REMOVED***;
    findField.setAttribute("aria-invalid", state === FindState.NOT_FOUND***REMOVED***;
    findMsg.setAttribute("data-status", status***REMOVED***;
    if (findMsgId***REMOVED*** {
      findMsg.setAttribute("data-l10n-id", findMsgId***REMOVED***;
    ***REMOVED*** else {
      findMsg.removeAttribute("data-l10n-id"***REMOVED***;
      findMsg.textContent = "";
    ***REMOVED***
    this.updateResultsCount(matchesCount***REMOVED***;
  ***REMOVED***
  updateResultsCount({
    current = 0,
    total = 0
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const {
      findResultsCount
    ***REMOVED*** = this;
    if (total > 0***REMOVED*** {
      const limit = MATCHES_COUNT_LIMIT;
      findResultsCount.setAttribute("data-l10n-id", total > limit ? "pdfjs-find-match-count-limit" : "pdfjs-find-match-count"***REMOVED***;
      findResultsCount.setAttribute("data-l10n-args", JSON.stringify({
        limit,
        current,
        total
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED*** else {
      findResultsCount.removeAttribute("data-l10n-id"***REMOVED***;
      findResultsCount.textContent = "";
    ***REMOVED***
  ***REMOVED***
  open(***REMOVED*** {
    if (!this.opened***REMOVED*** {
      this.#resizeObserver.observe(this.#mainContainer***REMOVED***;
      this.#resizeObserver.observe(this.bar***REMOVED***;
      this.opened = true;
      toggleExpandedBtn(this.toggleButton, true, this.bar***REMOVED***;
    ***REMOVED***
    this.findField.select(***REMOVED***;
    this.findField.focus(***REMOVED***;
  ***REMOVED***
  close(***REMOVED*** {
    if (!this.opened***REMOVED*** {
      return;
    ***REMOVED***
    this.#resizeObserver.disconnect(***REMOVED***;
    this.opened = false;
    toggleExpandedBtn(this.toggleButton, false, this.bar***REMOVED***;
    this.eventBus.dispatch("findbarclose", {
      source: this
    ***REMOVED******REMOVED***;
  ***REMOVED***
  toggle(***REMOVED*** {
    if (this.opened***REMOVED*** {
      this.close(***REMOVED***;
    ***REMOVED*** else {
      this.open(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #resizeObserverCallback(***REMOVED*** {
    const {
      bar
    ***REMOVED*** = this;
    bar.classList.remove("wrapContainers"***REMOVED***;
    const findbarHeight = bar.clientHeight;
    const inputContainerHeight = bar.firstElementChild.clientHeight;
    if (findbarHeight > inputContainerHeight***REMOVED*** {
      bar.classList.add("wrapContainers"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/pdf_history.js


const HASH_CHANGE_TIMEOUT = 1000;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1000;
function getCurrentHash(***REMOVED*** {
  return document.location.hash;
***REMOVED***
class PDFHistory {
  #eventAbortController = null;
  constructor({
    linkService,
    eventBus
  ***REMOVED******REMOVED*** {
    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset(***REMOVED***;
    this.eventBus._on("pagesinit", (***REMOVED*** => {
      this._isPagesLoaded = false;
      this.eventBus._on("pagesloaded", evt => {
        this._isPagesLoaded = !!evt.pagesCount;
      ***REMOVED***, {
        once: true
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  ***REMOVED******REMOVED*** {
    if (!fingerprint || typeof fingerprint !== "string"***REMOVED*** {
      console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.'***REMOVED***;
      return;
    ***REMOVED***
    if (this._initialized***REMOVED*** {
      this.reset(***REMOVED***;
    ***REMOVED***
    const reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
    this._fingerprint = fingerprint;
    this._updateUrl = updateUrl === true;
    this._initialized = true;
    this.#bindEvents(***REMOVED***;
    const state = window.history.state;
    this._popStateInProgress = false;
    this._blockHashChange = 0;
    this._currentHash = getCurrentHash(***REMOVED***;
    this._numPositionUpdates = 0;
    this._uid = this._maxUid = 0;
    this._destination = null;
    this._position = null;
    if (!this.#isValidState(state, true***REMOVED*** || resetHistory***REMOVED*** {
      const {
        hash,
        page,
        rotation
      ***REMOVED*** = this.#parseCurrentHash(true***REMOVED***;
      if (!hash || reInitialized || resetHistory***REMOVED*** {
        this.#pushOrReplaceState(null, true***REMOVED***;
        return;
      ***REMOVED***
      this.#pushOrReplaceState({
        hash,
        page,
        rotation
      ***REMOVED***, true***REMOVED***;
      return;
    ***REMOVED***
    const destination = state.destination;
    this.#updateInternalState(destination, state.uid, true***REMOVED***;
    if (destination.rotation !== undefined***REMOVED*** {
      this._initialRotation = destination.rotation;
    ***REMOVED***
    if (destination.dest***REMOVED*** {
      this._initialBookmark = JSON.stringify(destination.dest***REMOVED***;
      this._destination.page = null;
    ***REMOVED*** else if (destination.hash***REMOVED*** {
      this._initialBookmark = destination.hash;
    ***REMOVED*** else if (destination.page***REMOVED*** {
      this._initialBookmark = `page=${destination.page***REMOVED***`;
    ***REMOVED***
  ***REMOVED***
  reset(***REMOVED*** {
    if (this._initialized***REMOVED*** {
      this.#pageHide(***REMOVED***;
      this._initialized = false;
      this.#unbindEvents(***REMOVED***;
    ***REMOVED***
    if (this._updateViewareaTimeout***REMOVED*** {
      clearTimeout(this._updateViewareaTimeout***REMOVED***;
      this._updateViewareaTimeout = null;
    ***REMOVED***
    this._initialBookmark = null;
    this._initialRotation = null;
  ***REMOVED***
  push({
    namedDest = null,
    explicitDest,
    pageNumber
  ***REMOVED******REMOVED*** {
    if (!this._initialized***REMOVED*** {
      return;
    ***REMOVED***
    if (namedDest && typeof namedDest !== "string"***REMOVED*** {
      console.error("PDFHistory.push: " + `"${namedDest***REMOVED***" is not a valid namedDest parameter.`***REMOVED***;
      return;
    ***REMOVED*** else if (!Array.isArray(explicitDest***REMOVED******REMOVED*** {
      console.error("PDFHistory.push: " + `"${explicitDest***REMOVED***" is not a valid explicitDest parameter.`***REMOVED***;
      return;
    ***REMOVED*** else if (!this.#isValidPage(pageNumber***REMOVED******REMOVED*** {
      if (pageNumber !== null || this._destination***REMOVED*** {
        console.error("PDFHistory.push: " + `"${pageNumber***REMOVED***" is not a valid pageNumber parameter.`***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    const hash = namedDest || JSON.stringify(explicitDest***REMOVED***;
    if (!hash***REMOVED*** {
      return;
    ***REMOVED***
    let forceReplace = false;
    if (this._destination && (isDestHashesEqual(this._destination.hash, hash***REMOVED*** || isDestArraysEqual(this._destination.dest, explicitDest***REMOVED******REMOVED******REMOVED*** {
      if (this._destination.page***REMOVED*** {
        return;
      ***REMOVED***
      forceReplace = true;
    ***REMOVED***
    if (this._popStateInProgress && !forceReplace***REMOVED*** {
      return;
    ***REMOVED***
    this.#pushOrReplaceState({
      dest: explicitDest,
      hash,
      page: pageNumber,
      rotation: this.linkService.rotation
    ***REMOVED***, forceReplace***REMOVED***;
    if (!this._popStateInProgress***REMOVED*** {
      this._popStateInProgress = true;
      Promise.resolve(***REMOVED***.then((***REMOVED*** => {
        this._popStateInProgress = false;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  pushPage(pageNumber***REMOVED*** {
    if (!this._initialized***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#isValidPage(pageNumber***REMOVED******REMOVED*** {
      console.error(`PDFHistory.pushPage: "${pageNumber***REMOVED***" is not a valid page number.`***REMOVED***;
      return;
    ***REMOVED***
    if (this._destination?.page === pageNumber***REMOVED*** {
      return;
    ***REMOVED***
    if (this._popStateInProgress***REMOVED*** {
      return;
    ***REMOVED***
    this.#pushOrReplaceState({
      dest: null,
      hash: `page=${pageNumber***REMOVED***`,
      page: pageNumber,
      rotation: this.linkService.rotation
    ***REMOVED******REMOVED***;
    if (!this._popStateInProgress***REMOVED*** {
      this._popStateInProgress = true;
      Promise.resolve(***REMOVED***.then((***REMOVED*** => {
        this._popStateInProgress = false;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  pushCurrentPosition(***REMOVED*** {
    if (!this._initialized || this._popStateInProgress***REMOVED*** {
      return;
    ***REMOVED***
    this.#tryPushCurrentPosition(***REMOVED***;
  ***REMOVED***
  back(***REMOVED*** {
    if (!this._initialized || this._popStateInProgress***REMOVED*** {
      return;
    ***REMOVED***
    const state = window.history.state;
    if (this.#isValidState(state***REMOVED*** && state.uid > 0***REMOVED*** {
      window.history.back(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  forward(***REMOVED*** {
    if (!this._initialized || this._popStateInProgress***REMOVED*** {
      return;
    ***REMOVED***
    const state = window.history.state;
    if (this.#isValidState(state***REMOVED*** && state.uid < this._maxUid***REMOVED*** {
      window.history.forward(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get popStateInProgress(***REMOVED*** {
    return this._initialized && (this._popStateInProgress || this._blockHashChange > 0***REMOVED***;
  ***REMOVED***
  get initialBookmark(***REMOVED*** {
    return this._initialized ? this._initialBookmark : null;
  ***REMOVED***
  get initialRotation(***REMOVED*** {
    return this._initialized ? this._initialRotation : null;
  ***REMOVED***
  #pushOrReplaceState(destination, forceReplace = false***REMOVED*** {
    const shouldReplace = forceReplace || !this._destination;
    const newState = {
      fingerprint: this._fingerprint,
      uid: shouldReplace ? this._uid : this._uid + 1,
      destination
    ***REMOVED***;
    this.#updateInternalState(destination, newState.uid***REMOVED***;
    let newUrl;
    if (this._updateUrl && destination?.hash***REMOVED*** {
      const baseUrl = document.location.href.split("#", 1***REMOVED***[0];
      if (!baseUrl.startsWith("file://"***REMOVED******REMOVED*** {
        newUrl = `${baseUrl***REMOVED***#${destination.hash***REMOVED***`;
      ***REMOVED***
    ***REMOVED***
    if (shouldReplace***REMOVED*** {
      window.history.replaceState(newState, "", newUrl***REMOVED***;
    ***REMOVED*** else {
      window.history.pushState(newState, "", newUrl***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #tryPushCurrentPosition(temporary = false***REMOVED*** {
    if (!this._position***REMOVED*** {
      return;
    ***REMOVED***
    let position = this._position;
    if (temporary***REMOVED*** {
      position = Object.assign(Object.create(null***REMOVED***, this._position***REMOVED***;
      position.temporary = true;
    ***REMOVED***
    if (!this._destination***REMOVED*** {
      this.#pushOrReplaceState(position***REMOVED***;
      return;
    ***REMOVED***
    if (this._destination.temporary***REMOVED*** {
      this.#pushOrReplaceState(position, true***REMOVED***;
      return;
    ***REMOVED***
    if (this._destination.hash === position.hash***REMOVED*** {
      return;
    ***REMOVED***
    if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    let forceReplace = false;
    if (this._destination.page >= position.first && this._destination.page <= position.page***REMOVED*** {
      if (this._destination.dest !== undefined || !this._destination.first***REMOVED*** {
        return;
      ***REMOVED***
      forceReplace = true;
    ***REMOVED***
    this.#pushOrReplaceState(position, forceReplace***REMOVED***;
  ***REMOVED***
  #isValidPage(val***REMOVED*** {
    return Number.isInteger(val***REMOVED*** && val > 0 && val <= this.linkService.pagesCount;
  ***REMOVED***
  #isValidState(state, checkReload = false***REMOVED*** {
    if (!state***REMOVED*** {
      return false;
    ***REMOVED***
    if (state.fingerprint !== this._fingerprint***REMOVED*** {
      if (checkReload***REMOVED*** {
        if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length***REMOVED*** {
          return false;
        ***REMOVED***
        const [perfEntry] = performance.getEntriesByType("navigation"***REMOVED***;
        if (perfEntry?.type !== "reload"***REMOVED*** {
          return false;
        ***REMOVED***
      ***REMOVED*** else {
        return false;
      ***REMOVED***
    ***REMOVED***
    if (!Number.isInteger(state.uid***REMOVED*** || state.uid < 0***REMOVED*** {
      return false;
    ***REMOVED***
    if (state.destination === null || typeof state.destination !== "object"***REMOVED*** {
      return false;
    ***REMOVED***
    return true;
  ***REMOVED***
  #updateInternalState(destination, uid, removeTemporary = false***REMOVED*** {
    if (this._updateViewareaTimeout***REMOVED*** {
      clearTimeout(this._updateViewareaTimeout***REMOVED***;
      this._updateViewareaTimeout = null;
    ***REMOVED***
    if (removeTemporary && destination?.temporary***REMOVED*** {
      delete destination.temporary;
    ***REMOVED***
    this._destination = destination;
    this._uid = uid;
    this._maxUid = Math.max(this._maxUid, uid***REMOVED***;
    this._numPositionUpdates = 0;
  ***REMOVED***
  #parseCurrentHash(checkNameddest = false***REMOVED*** {
    const hash = unescape(getCurrentHash(***REMOVED******REMOVED***.substring(1***REMOVED***;
    const params = parseQueryString(hash***REMOVED***;
    const nameddest = params.get("nameddest"***REMOVED*** || "";
    let page = params.get("page"***REMOVED*** | 0;
    if (!this.#isValidPage(page***REMOVED*** || checkNameddest && nameddest.length > 0***REMOVED*** {
      page = null;
    ***REMOVED***
***REMOVED***
      hash,
      page,
      rotation: this.linkService.rotation
    ***REMOVED***;
  ***REMOVED***
  #updateViewarea({
    location
  ***REMOVED******REMOVED*** {
    if (this._updateViewareaTimeout***REMOVED*** {
      clearTimeout(this._updateViewareaTimeout***REMOVED***;
      this._updateViewareaTimeout = null;
    ***REMOVED***
    this._position = {
      hash: location.pdfOpenParams.substring(1***REMOVED***,
      page: this.linkService.page,
      first: location.pageNumber,
      rotation: location.rotation
    ***REMOVED***;
    if (this._popStateInProgress***REMOVED*** {
      return;
    ***REMOVED***
    if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page***REMOVED*** {
      this._numPositionUpdates++;
    ***REMOVED***
    if (UPDATE_VIEWAREA_TIMEOUT > 0***REMOVED*** {
      this._updateViewareaTimeout = setTimeout((***REMOVED*** => {
        if (!this._popStateInProgress***REMOVED*** {
          this.#tryPushCurrentPosition(true***REMOVED***;
        ***REMOVED***
        this._updateViewareaTimeout = null;
      ***REMOVED***, UPDATE_VIEWAREA_TIMEOUT***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #popState({
    state
  ***REMOVED******REMOVED*** {
    const newHash = getCurrentHash(***REMOVED***,
      hashChanged = this._currentHash !== newHash;
    this._currentHash = newHash;
    if (!state***REMOVED*** {
      this._uid++;
      const {
        hash,
        page,
        rotation
      ***REMOVED*** = this.#parseCurrentHash(***REMOVED***;
      this.#pushOrReplaceState({
        hash,
        page,
        rotation
      ***REMOVED***, true***REMOVED***;
      return;
    ***REMOVED***
    if (!this.#isValidState(state***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this._popStateInProgress = true;
    if (hashChanged***REMOVED*** {
      this._blockHashChange++;
      waitOnEventOrTimeout({
        target: window,
        name: "hashchange",
        delay: HASH_CHANGE_TIMEOUT
      ***REMOVED******REMOVED***.then((***REMOVED*** => {
        this._blockHashChange--;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const destination = state.destination;
    this.#updateInternalState(destination, state.uid, true***REMOVED***;
    if (isValidRotation(destination.rotation***REMOVED******REMOVED*** {
      this.linkService.rotation = destination.rotation;
    ***REMOVED***
    if (destination.dest***REMOVED*** {
      this.linkService.goToDestination(destination.dest***REMOVED***;
    ***REMOVED*** else if (destination.hash***REMOVED*** {
      this.linkService.setHash(destination.hash***REMOVED***;
    ***REMOVED*** else if (destination.page***REMOVED*** {
      this.linkService.page = destination.page;
    ***REMOVED***
    Promise.resolve(***REMOVED***.then((***REMOVED*** => {
      this._popStateInProgress = false;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #pageHide(***REMOVED*** {
    if (!this._destination || this._destination.temporary***REMOVED*** {
      this.#tryPushCurrentPosition(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #bindEvents(***REMOVED*** {
    if (this.#eventAbortController***REMOVED*** {
      return;
    ***REMOVED***
    this.#eventAbortController = new AbortController(***REMOVED***;
    const {
      signal
    ***REMOVED*** = this.#eventAbortController;
    this.eventBus._on("updateviewarea", this.#updateViewarea.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("popstate", this.#popState.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("pagehide", this.#pageHide.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #unbindEvents(***REMOVED*** {
    this.#eventAbortController?.abort(***REMOVED***;
    this.#eventAbortController = null;
  ***REMOVED***
***REMOVED***
function isDestHashesEqual(destHash, pushHash***REMOVED*** {
  if (typeof destHash !== "string" || typeof pushHash !== "string"***REMOVED*** {
    return false;
  ***REMOVED***
  if (destHash === pushHash***REMOVED*** {
    return true;
  ***REMOVED***
  const nameddest = parseQueryString(destHash***REMOVED***.get("nameddest"***REMOVED***;
  if (nameddest === pushHash***REMOVED*** {
    return true;
  ***REMOVED***
  return false;
***REMOVED***
function isDestArraysEqual(firstDest, secondDest***REMOVED*** {
  function isEntryEqual(first, second***REMOVED*** {
    if (typeof first !== typeof second***REMOVED*** {
      return false;
    ***REMOVED***
    if (Array.isArray(first***REMOVED*** || Array.isArray(second***REMOVED******REMOVED*** {
      return false;
    ***REMOVED***
    if (first !== null && typeof first === "object" && second !== null***REMOVED*** {
      if (Object.keys(first***REMOVED***.length !== Object.keys(second***REMOVED***.length***REMOVED*** {
        return false;
      ***REMOVED***
      for (const key in first***REMOVED*** {
        if (!isEntryEqual(first[key], second[key]***REMOVED******REMOVED*** {
          return false;
        ***REMOVED***
      ***REMOVED***
      return true;
    ***REMOVED***
    return first === second || Number.isNaN(first***REMOVED*** && Number.isNaN(second***REMOVED***;
  ***REMOVED***
  if (!(Array.isArray(firstDest***REMOVED*** && Array.isArray(secondDest***REMOVED******REMOVED******REMOVED*** {
    return false;
  ***REMOVED***
  if (firstDest.length !== secondDest.length***REMOVED*** {
    return false;
  ***REMOVED***
  for (let i = 0, ii = firstDest.length; i < ii; i++***REMOVED*** {
    if (!isEntryEqual(firstDest[i], secondDest[i]***REMOVED******REMOVED*** {
      return false;
    ***REMOVED***
  ***REMOVED***
  return true;
***REMOVED***

;// ./web/pdf_layer_viewer.js

class PDFLayerViewer extends BaseTreeViewer {
  constructor(options***REMOVED*** {
    super(options***REMOVED***;
    this.eventBus._on("optionalcontentconfigchanged", evt => {
      this.#updateLayers(evt.promise***REMOVED***;
    ***REMOVED******REMOVED***;
    this.eventBus._on("resetlayers", (***REMOVED*** => {
      this.#updateLayers(***REMOVED***;
    ***REMOVED******REMOVED***;
    this.eventBus._on("togglelayerstree", this._toggleAllTreeItems.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    super.reset(***REMOVED***;
    this._optionalContentConfig = null;
    this._optionalContentVisibility?.clear(***REMOVED***;
    this._optionalContentVisibility = null;
  ***REMOVED***
  _dispatchEvent(layersCount***REMOVED*** {
    this.eventBus.dispatch("layersloaded", {
      source: this,
      layersCount
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _bindLink(element, {
    groupId,
    input
  ***REMOVED******REMOVED*** {
    const setVisibility = (***REMOVED*** => {
      const visible = input.checked;
      this._optionalContentConfig.setVisibility(groupId, visible***REMOVED***;
      const cached = this._optionalContentVisibility.get(groupId***REMOVED***;
      if (cached***REMOVED*** {
        cached.visible = visible;
      ***REMOVED***
      this.eventBus.dispatch("optionalcontentconfig", {
        source: this,
        promise: Promise.resolve(this._optionalContentConfig***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    element.onclick = evt => {
      if (evt.target === input***REMOVED*** {
        setVisibility(***REMOVED***;
        return true;
      ***REMOVED*** else if (evt.target !== element***REMOVED*** {
        return true;
      ***REMOVED***
      input.checked = !input.checked;
      setVisibility(***REMOVED***;
      return false;
    ***REMOVED***;
  ***REMOVED***
  _setNestedName(element, {
    name = null
  ***REMOVED******REMOVED*** {
    if (typeof name === "string"***REMOVED*** {
      element.textContent = this._normalizeTextContent(name***REMOVED***;
      return;
    ***REMOVED***
    element.setAttribute("data-l10n-id", "pdfjs-additional-layers"***REMOVED***;
    element.style.fontStyle = "italic";
    this._l10n.translateOnce(element***REMOVED***;
  ***REMOVED***
  _addToggleButton(div, {
    name = null
  ***REMOVED******REMOVED*** {
    super._addToggleButton(div, name === null***REMOVED***;
  ***REMOVED***
  _toggleAllTreeItems(***REMOVED*** {
    if (!this._optionalContentConfig***REMOVED*** {
      return;
    ***REMOVED***
    super._toggleAllTreeItems(***REMOVED***;
  ***REMOVED***
  render({
    optionalContentConfig,
    pdfDocument
  ***REMOVED******REMOVED*** {
    if (this._optionalContentConfig***REMOVED*** {
      this.reset(***REMOVED***;
    ***REMOVED***
    this._optionalContentConfig = optionalContentConfig || null;
    this._pdfDocument = pdfDocument || null;
    const groups = optionalContentConfig?.getOrder(***REMOVED***;
    if (!groups***REMOVED*** {
      this._dispatchEvent(0***REMOVED***;
      return;
    ***REMOVED***
    this._optionalContentVisibility = new Map(***REMOVED***;
    const fragment = document.createDocumentFragment(***REMOVED***,
      queue = [{
        parent: fragment,
        groups
      ***REMOVED***];
    let layersCount = 0,
      hasAnyNesting = false;
    while (queue.length > 0***REMOVED*** {
      const levelData = queue.shift(***REMOVED***;
      for (const groupId of levelData.groups***REMOVED*** {
        const div = document.createElement("div"***REMOVED***;
        div.className = "treeItem";
        const element = document.createElement("a"***REMOVED***;
        div.append(element***REMOVED***;
        if (typeof groupId === "object"***REMOVED*** {
          hasAnyNesting = true;
          this._addToggleButton(div, groupId***REMOVED***;
          this._setNestedName(element, groupId***REMOVED***;
          const itemsDiv = document.createElement("div"***REMOVED***;
          itemsDiv.className = "treeItems";
          div.append(itemsDiv***REMOVED***;
          queue.push({
            parent: itemsDiv,
            groups: groupId.order
          ***REMOVED******REMOVED***;
        ***REMOVED*** else {
          const group = optionalContentConfig.getGroup(groupId***REMOVED***;
          const input = document.createElement("input"***REMOVED***;
          this._bindLink(element, {
            groupId,
            input
          ***REMOVED******REMOVED***;
          input.type = "checkbox";
          input.checked = group.visible;
          this._optionalContentVisibility.set(groupId, {
            input,
            visible: input.checked
          ***REMOVED******REMOVED***;
          const label = document.createElement("label"***REMOVED***;
          label.textContent = this._normalizeTextContent(group.name***REMOVED***;
          label.append(input***REMOVED***;
          element.append(label***REMOVED***;
          layersCount++;
        ***REMOVED***
        levelData.parent.append(div***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this._finishRendering(fragment, layersCount, hasAnyNesting***REMOVED***;
  ***REMOVED***
  async #updateLayers(promise = null***REMOVED*** {
    if (!this._optionalContentConfig***REMOVED*** {
      return;
    ***REMOVED***
    const pdfDocument = this._pdfDocument;
    const optionalContentConfig = await (promise || pdfDocument.getOptionalContentConfig({
      intent: "display"
    ***REMOVED******REMOVED******REMOVED***;
    if (pdfDocument !== this._pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (promise***REMOVED*** {
      for (const [groupId, cached] of this._optionalContentVisibility***REMOVED*** {
        const group = optionalContentConfig.getGroup(groupId***REMOVED***;
        if (group && cached.visible !== group.visible***REMOVED*** {
          cached.input.checked = cached.visible = !cached.visible;
        ***REMOVED***
      ***REMOVED***
      return;
    ***REMOVED***
    this.eventBus.dispatch("optionalcontentconfig", {
      source: this,
      promise: Promise.resolve(optionalContentConfig***REMOVED***
    ***REMOVED******REMOVED***;
    this.render({
      optionalContentConfig,
      pdfDocument: this._pdfDocument
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_outline_viewer.js


class PDFOutlineViewer extends BaseTreeViewer {
  constructor(options***REMOVED*** {
    super(options***REMOVED***;
    this.linkService = options.linkService;
    this.downloadManager = options.downloadManager;
    this.eventBus._on("toggleoutlinetree", this._toggleAllTreeItems.bind(this***REMOVED******REMOVED***;
    this.eventBus._on("currentoutlineitem", this._currentOutlineItem.bind(this***REMOVED******REMOVED***;
    this.eventBus._on("pagechanging", evt => {
      this._currentPageNumber = evt.pageNumber;
    ***REMOVED******REMOVED***;
    this.eventBus._on("pagesloaded", evt => {
      this._isPagesLoaded = !!evt.pagesCount;
      this._currentOutlineItemCapability?.resolve(this._isPagesLoaded***REMOVED***;
    ***REMOVED******REMOVED***;
    this.eventBus._on("sidebarviewchanged", evt => {
      this._sidebarView = evt.view;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    super.reset(***REMOVED***;
    this._outline = null;
    this._pageNumberToDestHashCapability = null;
    this._currentPageNumber = 1;
    this._isPagesLoaded = null;
    this._currentOutlineItemCapability?.resolve(false***REMOVED***;
    this._currentOutlineItemCapability = null;
  ***REMOVED***
  _dispatchEvent(outlineCount***REMOVED*** {
    this._currentOutlineItemCapability = Promise.withResolvers(***REMOVED***;
    if (outlineCount === 0 || this._pdfDocument?.loadingParams.disableAutoFetch***REMOVED*** {
      this._currentOutlineItemCapability.resolve(false***REMOVED***;
    ***REMOVED*** else if (this._isPagesLoaded !== null***REMOVED*** {
      this._currentOutlineItemCapability.resolve(this._isPagesLoaded***REMOVED***;
    ***REMOVED***
    this.eventBus.dispatch("outlineloaded", {
      source: this,
      outlineCount,
      currentOutlineItemPromise: this._currentOutlineItemCapability.promise
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _bindLink(element, {
    url,
    newWindow,
    action,
    attachment,
    dest,
    setOCGState
  ***REMOVED******REMOVED*** {
    const {
      linkService
    ***REMOVED*** = this;
    if (url***REMOVED*** {
      linkService.addLinkAttributes(element, url, newWindow***REMOVED***;
      return;
    ***REMOVED***
    if (action***REMOVED*** {
      element.href = linkService.getAnchorUrl(""***REMOVED***;
      element.onclick = (***REMOVED*** => {
        linkService.executeNamedAction(action***REMOVED***;
        return false;
      ***REMOVED***;
      return;
    ***REMOVED***
    if (attachment***REMOVED*** {
      element.href = linkService.getAnchorUrl(""***REMOVED***;
      element.onclick = (***REMOVED*** => {
        this.downloadManager.openOrDownloadData(attachment.content, attachment.filename***REMOVED***;
        return false;
      ***REMOVED***;
      return;
    ***REMOVED***
    if (setOCGState***REMOVED*** {
      element.href = linkService.getAnchorUrl(""***REMOVED***;
      element.onclick = (***REMOVED*** => {
        linkService.executeSetOCGState(setOCGState***REMOVED***;
        return false;
      ***REMOVED***;
      return;
    ***REMOVED***
    element.href = linkService.getDestinationHash(dest***REMOVED***;
    element.onclick = evt => {
      this._updateCurrentTreeItem(evt.target.parentNode***REMOVED***;
      if (dest***REMOVED*** {
        linkService.goToDestination(dest***REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***;
  ***REMOVED***
  _setStyles(element, {
    bold,
    italic
  ***REMOVED******REMOVED*** {
    if (bold***REMOVED*** {
      element.style.fontWeight = "bold";
    ***REMOVED***
    if (italic***REMOVED*** {
      element.style.fontStyle = "italic";
    ***REMOVED***
  ***REMOVED***
  _addToggleButton(div, {
    count,
    items
  ***REMOVED******REMOVED*** {
    let hidden = false;
    if (count < 0***REMOVED*** {
      let totalCount = items.length;
      if (totalCount > 0***REMOVED*** {
        const queue = [...items];
        while (queue.length > 0***REMOVED*** {
          const {
            count: nestedCount,
            items: nestedItems
          ***REMOVED*** = queue.shift(***REMOVED***;
          if (nestedCount > 0 && nestedItems.length > 0***REMOVED*** {
            totalCount += nestedItems.length;
            queue.push(...nestedItems***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      if (Math.abs(count***REMOVED*** === totalCount***REMOVED*** {
        hidden = true;
      ***REMOVED***
    ***REMOVED***
    super._addToggleButton(div, hidden***REMOVED***;
  ***REMOVED***
  _toggleAllTreeItems(***REMOVED*** {
    if (!this._outline***REMOVED*** {
      return;
    ***REMOVED***
    super._toggleAllTreeItems(***REMOVED***;
  ***REMOVED***
  render({
    outline,
    pdfDocument
  ***REMOVED******REMOVED*** {
    if (this._outline***REMOVED*** {
      this.reset(***REMOVED***;
    ***REMOVED***
    this._outline = outline || null;
    this._pdfDocument = pdfDocument || null;
    if (!outline***REMOVED*** {
      this._dispatchEvent(0***REMOVED***;
      return;
    ***REMOVED***
    const fragment = document.createDocumentFragment(***REMOVED***;
    const queue = [{
      parent: fragment,
      items: outline
    ***REMOVED***];
    let outlineCount = 0,
      hasAnyNesting = false;
    while (queue.length > 0***REMOVED*** {
      const levelData = queue.shift(***REMOVED***;
      for (const item of levelData.items***REMOVED*** {
        const div = document.createElement("div"***REMOVED***;
        div.className = "treeItem";
        const element = document.createElement("a"***REMOVED***;
        this._bindLink(element, item***REMOVED***;
        this._setStyles(element, item***REMOVED***;
        element.textContent = this._normalizeTextContent(item.title***REMOVED***;
        div.append(element***REMOVED***;
        if (item.items.length > 0***REMOVED*** {
          hasAnyNesting = true;
          this._addToggleButton(div, item***REMOVED***;
          const itemsDiv = document.createElement("div"***REMOVED***;
          itemsDiv.className = "treeItems";
          div.append(itemsDiv***REMOVED***;
          queue.push({
            parent: itemsDiv,
            items: item.items
          ***REMOVED******REMOVED***;
        ***REMOVED***
        levelData.parent.append(div***REMOVED***;
        outlineCount++;
      ***REMOVED***
    ***REMOVED***
    this._finishRendering(fragment, outlineCount, hasAnyNesting***REMOVED***;
  ***REMOVED***
  async _currentOutlineItem(***REMOVED*** {
    if (!this._isPagesLoaded***REMOVED*** {
      throw new Error("_currentOutlineItem: All pages have not been loaded."***REMOVED***;
    ***REMOVED***
    if (!this._outline || !this._pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const pageNumberToDestHash = await this._getPageNumberToDestHash(this._pdfDocument***REMOVED***;
    if (!pageNumberToDestHash***REMOVED*** {
      return;
    ***REMOVED***
    this._updateCurrentTreeItem(null***REMOVED***;
    if (this._sidebarView !== SidebarView.OUTLINE***REMOVED*** {
      return;
    ***REMOVED***
    for (let i = this._currentPageNumber; i > 0; i--***REMOVED*** {
      const destHash = pageNumberToDestHash.get(i***REMOVED***;
      if (!destHash***REMOVED*** {
        continue;
      ***REMOVED***
      const linkElement = this.container.querySelector(`a[href="${destHash***REMOVED***"]`***REMOVED***;
      if (!linkElement***REMOVED*** {
        continue;
      ***REMOVED***
      this._scrollToCurrentTreeItem(linkElement.parentNode***REMOVED***;
      break;
    ***REMOVED***
  ***REMOVED***
  async _getPageNumberToDestHash(pdfDocument***REMOVED*** {
    if (this._pageNumberToDestHashCapability***REMOVED*** {
      return this._pageNumberToDestHashCapability.promise;
    ***REMOVED***
    this._pageNumberToDestHashCapability = Promise.withResolvers(***REMOVED***;
    const pageNumberToDestHash = new Map(***REMOVED***,
      pageNumberNesting = new Map(***REMOVED***;
    const queue = [{
      nesting: 0,
      items: this._outline
    ***REMOVED***];
    while (queue.length > 0***REMOVED*** {
      const levelData = queue.shift(***REMOVED***,
        currentNesting = levelData.nesting;
      for (const {
        dest,
        items
      ***REMOVED*** of levelData.items***REMOVED*** {
        let explicitDest, pageNumber;
        if (typeof dest === "string"***REMOVED*** {
          explicitDest = await pdfDocument.getDestination(dest***REMOVED***;
          if (pdfDocument !== this._pdfDocument***REMOVED*** {
            return null;
          ***REMOVED***
        ***REMOVED*** else {
          explicitDest = dest;
        ***REMOVED***
        if (Array.isArray(explicitDest***REMOVED******REMOVED*** {
          const [destRef] = explicitDest;
          if (destRef && typeof destRef === "object"***REMOVED*** {
            pageNumber = pdfDocument.cachedPageNumber(destRef***REMOVED***;
          ***REMOVED*** else if (Number.isInteger(destRef***REMOVED******REMOVED*** {
            pageNumber = destRef + 1;
          ***REMOVED***
          if (Number.isInteger(pageNumber***REMOVED*** && (!pageNumberToDestHash.has(pageNumber***REMOVED*** || currentNesting > pageNumberNesting.get(pageNumber***REMOVED******REMOVED******REMOVED*** {
            const destHash = this.linkService.getDestinationHash(dest***REMOVED***;
            pageNumberToDestHash.set(pageNumber, destHash***REMOVED***;
            pageNumberNesting.set(pageNumber, currentNesting***REMOVED***;
          ***REMOVED***
        ***REMOVED***
        if (items.length > 0***REMOVED*** {
          queue.push({
            nesting: currentNesting + 1,
            items
          ***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null***REMOVED***;
    return this._pageNumberToDestHashCapability.promise;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_presentation_mode.js


const DELAY_BEFORE_HIDING_CONTROLS = 3000;
const ACTIVE_SELECTOR = "pdfPresentationMode";
const CONTROLS_SELECTOR = "pdfPresentationModeControls";
const MOUSE_SCROLL_COOLDOWN_TIME = 50;
const PAGE_SWITCH_THRESHOLD = 0.1;
const SWIPE_MIN_DISTANCE_THRESHOLD = 50;
const SWIPE_ANGLE_THRESHOLD = Math.PI / 6;
class PDFPresentationMode {
  #state = PresentationModeState.UNKNOWN;
  #args = null;
  #fullscreenChangeAbortController = null;
  #windowAbortController = null;
  constructor({
    container,
    pdfViewer,
    eventBus
  ***REMOVED******REMOVED*** {
    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
  ***REMOVED***
  async request(***REMOVED*** {
    const {
      container,
      pdfViewer
    ***REMOVED*** = this;
    if (this.active || !pdfViewer.pagesCount || !container.requestFullscreen***REMOVED*** {
      return false;
    ***REMOVED***
    this.#addFullscreenChangeListeners(***REMOVED***;
    this.#notifyStateChange(PresentationModeState.CHANGING***REMOVED***;
    const promise = container.requestFullscreen(***REMOVED***;
    this.#args = {
      pageNumber: pdfViewer.currentPageNumber,
      scaleValue: pdfViewer.currentScaleValue,
      scrollMode: pdfViewer.scrollMode,
      spreadMode: null,
      annotationEditorMode: null
    ***REMOVED***;
    if (pdfViewer.spreadMode !== SpreadMode.NONE && !(pdfViewer.pageViewsReady && pdfViewer.hasEqualPageSizes***REMOVED******REMOVED*** {
      console.warn("Ignoring Spread modes when entering PresentationMode, " + "since the document may contain varying page sizes."***REMOVED***;
      this.#args.spreadMode = pdfViewer.spreadMode;
    ***REMOVED***
    if (pdfViewer.annotationEditorMode !== AnnotationEditorType.DISABLE***REMOVED*** {
      this.#args.annotationEditorMode = pdfViewer.annotationEditorMode;
    ***REMOVED***
  ***REMOVED***
      await promise;
      pdfViewer.focus(***REMOVED***;
      return true;
    ***REMOVED*** catch {
      this.#removeFullscreenChangeListeners(***REMOVED***;
      this.#notifyStateChange(PresentationModeState.NORMAL***REMOVED***;
    ***REMOVED***
    return false;
  ***REMOVED***
  get active(***REMOVED*** {
    return this.#state === PresentationModeState.CHANGING || this.#state === PresentationModeState.FULLSCREEN;
  ***REMOVED***
  #mouseWheel(evt***REMOVED*** {
    if (!this.active***REMOVED*** {
      return;
    ***REMOVED***
    evt.preventDefault(***REMOVED***;
    const delta = normalizeWheelEventDelta(evt***REMOVED***;
    const currentTime = Date.now(***REMOVED***;
    const storedTime = this.mouseScrollTimeStamp;
    if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME***REMOVED*** {
      return;
    ***REMOVED***
    if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0***REMOVED*** {
      this.#resetMouseScrollState(***REMOVED***;
    ***REMOVED***
    this.mouseScrollDelta += delta;
    if (Math.abs(this.mouseScrollDelta***REMOVED*** >= PAGE_SWITCH_THRESHOLD***REMOVED*** {
      const totalDelta = this.mouseScrollDelta;
      this.#resetMouseScrollState(***REMOVED***;
      const success = totalDelta > 0 ? this.pdfViewer.previousPage(***REMOVED*** : this.pdfViewer.nextPage(***REMOVED***;
      if (success***REMOVED*** {
        this.mouseScrollTimeStamp = currentTime;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #notifyStateChange(state***REMOVED*** {
    this.#state = state;
    this.eventBus.dispatch("presentationmodechanged", {
      source: this,
      state
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #enter(***REMOVED*** {
    this.#notifyStateChange(PresentationModeState.FULLSCREEN***REMOVED***;
    this.container.classList.add(ACTIVE_SELECTOR***REMOVED***;
    setTimeout((***REMOVED*** => {
      this.pdfViewer.scrollMode = ScrollMode.PAGE;
      if (this.#args.spreadMode !== null***REMOVED*** {
        this.pdfViewer.spreadMode = SpreadMode.NONE;
      ***REMOVED***
      this.pdfViewer.currentPageNumber = this.#args.pageNumber;
      this.pdfViewer.currentScaleValue = "page-fit";
      if (this.#args.annotationEditorMode !== null***REMOVED*** {
        this.pdfViewer.annotationEditorMode = {
          mode: AnnotationEditorType.NONE
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED***, 0***REMOVED***;
    this.#addWindowListeners(***REMOVED***;
    this.#showControls(***REMOVED***;
    this.contextMenuOpen = false;
    document.getSelection(***REMOVED***.empty(***REMOVED***;
  ***REMOVED***
  #exit(***REMOVED*** {
    const pageNumber = this.pdfViewer.currentPageNumber;
    this.container.classList.remove(ACTIVE_SELECTOR***REMOVED***;
    setTimeout((***REMOVED*** => {
      this.#removeFullscreenChangeListeners(***REMOVED***;
      this.#notifyStateChange(PresentationModeState.NORMAL***REMOVED***;
      this.pdfViewer.scrollMode = this.#args.scrollMode;
      if (this.#args.spreadMode !== null***REMOVED*** {
        this.pdfViewer.spreadMode = this.#args.spreadMode;
      ***REMOVED***
      this.pdfViewer.currentScaleValue = this.#args.scaleValue;
      this.pdfViewer.currentPageNumber = pageNumber;
      if (this.#args.annotationEditorMode !== null***REMOVED*** {
        this.pdfViewer.annotationEditorMode = {
          mode: this.#args.annotationEditorMode
        ***REMOVED***;
      ***REMOVED***
      this.#args = null;
    ***REMOVED***, 0***REMOVED***;
    this.#removeWindowListeners(***REMOVED***;
    this.#hideControls(***REMOVED***;
    this.#resetMouseScrollState(***REMOVED***;
    this.contextMenuOpen = false;
  ***REMOVED***
  #mouseDown(evt***REMOVED*** {
    if (this.contextMenuOpen***REMOVED*** {
      this.contextMenuOpen = false;
      evt.preventDefault(***REMOVED***;
      return;
    ***REMOVED***
    if (evt.button !== 0***REMOVED*** {
      return;
    ***REMOVED***
    if (evt.target.href && evt.target.parentNode?.hasAttribute("data-internal-link"***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    evt.preventDefault(***REMOVED***;
    if (evt.shiftKey***REMOVED*** {
      this.pdfViewer.previousPage(***REMOVED***;
    ***REMOVED*** else {
      this.pdfViewer.nextPage(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #contextMenu(***REMOVED*** {
    this.contextMenuOpen = true;
  ***REMOVED***
  #showControls(***REMOVED*** {
    if (this.controlsTimeout***REMOVED*** {
      clearTimeout(this.controlsTimeout***REMOVED***;
    ***REMOVED*** else {
      this.container.classList.add(CONTROLS_SELECTOR***REMOVED***;
    ***REMOVED***
    this.controlsTimeout = setTimeout((***REMOVED*** => {
      this.container.classList.remove(CONTROLS_SELECTOR***REMOVED***;
      delete this.controlsTimeout;
    ***REMOVED***, DELAY_BEFORE_HIDING_CONTROLS***REMOVED***;
  ***REMOVED***
  #hideControls(***REMOVED*** {
    if (!this.controlsTimeout***REMOVED*** {
      return;
    ***REMOVED***
    clearTimeout(this.controlsTimeout***REMOVED***;
    this.container.classList.remove(CONTROLS_SELECTOR***REMOVED***;
    delete this.controlsTimeout;
  ***REMOVED***
  #resetMouseScrollState(***REMOVED*** {
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
  ***REMOVED***
  #touchSwipe(evt***REMOVED*** {
    if (!this.active***REMOVED*** {
      return;
    ***REMOVED***
    if (evt.touches.length > 1***REMOVED*** {
      this.touchSwipeState = null;
      return;
    ***REMOVED***
    switch (evt.type***REMOVED*** {
      case "touchstart":
        this.touchSwipeState = {
          startX: evt.touches[0].pageX,
          startY: evt.touches[0].pageY,
          endX: evt.touches[0].pageX,
          endY: evt.touches[0].pageY
        ***REMOVED***;
        break;
      case "touchmove":
        if (this.touchSwipeState === null***REMOVED*** {
          return;
        ***REMOVED***
        this.touchSwipeState.endX = evt.touches[0].pageX;
        this.touchSwipeState.endY = evt.touches[0].pageY;
        evt.preventDefault(***REMOVED***;
        break;
      case "touchend":
        if (this.touchSwipeState === null***REMOVED*** {
          return;
        ***REMOVED***
        let delta = 0;
        const dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
        const dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
        const absAngle = Math.abs(Math.atan2(dy, dx***REMOVED******REMOVED***;
        if (Math.abs(dx***REMOVED*** > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD***REMOVED******REMOVED*** {
          delta = dx;
        ***REMOVED*** else if (Math.abs(dy***REMOVED*** > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2***REMOVED*** <= SWIPE_ANGLE_THRESHOLD***REMOVED*** {
          delta = dy;
        ***REMOVED***
        if (delta > 0***REMOVED*** {
          this.pdfViewer.previousPage(***REMOVED***;
        ***REMOVED*** else if (delta < 0***REMOVED*** {
          this.pdfViewer.nextPage(***REMOVED***;
        ***REMOVED***
        break;
    ***REMOVED***
  ***REMOVED***
  #addWindowListeners(***REMOVED*** {
    if (this.#windowAbortController***REMOVED*** {
      return;
    ***REMOVED***
    this.#windowAbortController = new AbortController(***REMOVED***;
    const {
      signal
    ***REMOVED*** = this.#windowAbortController;
    const touchSwipeBind = this.#touchSwipe.bind(this***REMOVED***;
    window.addEventListener("mousemove", this.#showControls.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("mousedown", this.#mouseDown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("wheel", this.#mouseWheel.bind(this***REMOVED***, {
      passive: false,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("keydown", this.#resetMouseScrollState.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("contextmenu", this.#contextMenu.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("touchstart", touchSwipeBind, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("touchmove", touchSwipeBind, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("touchend", touchSwipeBind, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #removeWindowListeners(***REMOVED*** {
    this.#windowAbortController?.abort(***REMOVED***;
    this.#windowAbortController = null;
  ***REMOVED***
  #addFullscreenChangeListeners(***REMOVED*** {
    if (this.#fullscreenChangeAbortController***REMOVED*** {
      return;
    ***REMOVED***
    this.#fullscreenChangeAbortController = new AbortController(***REMOVED***;
    window.addEventListener("fullscreenchange", (***REMOVED*** => {
      if (document.fullscreenElement***REMOVED*** {
        this.#enter(***REMOVED***;
      ***REMOVED*** else {
        this.#exit(***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal: this.#fullscreenChangeAbortController.signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #removeFullscreenChangeListeners(***REMOVED*** {
    this.#fullscreenChangeAbortController?.abort(***REMOVED***;
    this.#fullscreenChangeAbortController = null;
  ***REMOVED***
***REMOVED***

;// ./web/xfa_layer_builder.js

class XfaLayerBuilder {
  constructor({
    pdfPage,
    annotationStorage = null,
    linkService,
    xfaHtml = null
  ***REMOVED******REMOVED*** {
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.linkService = linkService;
    this.xfaHtml = xfaHtml;
    this.div = null;
    this._cancelled = false;
  ***REMOVED***
  async render(viewport, intent = "display"***REMOVED*** {
    if (intent === "print"***REMOVED*** {
      const parameters = {
        viewport: viewport.clone({
          dontFlip: true
        ***REMOVED******REMOVED***,
        div: this.div,
        xfaHtml: this.xfaHtml,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent
      ***REMOVED***;
      this.div = document.createElement("div"***REMOVED***;
      parameters.div = this.div;
      return XfaLayer.render(parameters***REMOVED***;
    ***REMOVED***
    const xfaHtml = await this.pdfPage.getXfa(***REMOVED***;
    if (this._cancelled || !xfaHtml***REMOVED*** {
  ***REMOVED***
        textDivs: []
      ***REMOVED***;
    ***REMOVED***
    const parameters = {
      viewport: viewport.clone({
        dontFlip: true
      ***REMOVED******REMOVED***,
      div: this.div,
      xfaHtml,
      annotationStorage: this.annotationStorage,
      linkService: this.linkService,
      intent
    ***REMOVED***;
    if (this.div***REMOVED*** {
      return XfaLayer.update(parameters***REMOVED***;
    ***REMOVED***
    this.div = document.createElement("div"***REMOVED***;
    parameters.div = this.div;
    return XfaLayer.render(parameters***REMOVED***;
  ***REMOVED***
  cancel(***REMOVED*** {
    this._cancelled = true;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.div.hidden = true;
  ***REMOVED***
***REMOVED***

;// ./web/print_utils.js



function getXfaHtmlForPrinting(printContainer, pdfDocument***REMOVED*** {
  const xfaHtml = pdfDocument.allXfaHtml;
  const linkService = new SimpleLinkService(***REMOVED***;
  const scale = Math.round(PixelsPerInch.PDF_TO_CSS_UNITS * 100***REMOVED*** / 100;
  for (const xfaPage of xfaHtml.children***REMOVED*** {
    const page = document.createElement("div"***REMOVED***;
    page.className = "xfaPrintedPage";
    printContainer.append(page***REMOVED***;
    const builder = new XfaLayerBuilder({
      pdfPage: null,
      annotationStorage: pdfDocument.annotationStorage,
      linkService,
      xfaHtml: xfaPage
    ***REMOVED******REMOVED***;
    const viewport = getXfaPageViewport(xfaPage, {
      scale
    ***REMOVED******REMOVED***;
    builder.render(viewport, "print"***REMOVED***;
    page.append(builder.div***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_print_service.js


let activeService = null;
let dialog = null;
let overlayManager = null;
let viewerApp = {
  initialized: false
***REMOVED***;
function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise, printAnnotationStoragePromise***REMOVED*** {
  const scratchCanvas = activeService.scratchCanvas;
  const PRINT_UNITS = printResolution / PixelsPerInch.PDF;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS***REMOVED***;
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS***REMOVED***;
  const ctx = scratchCanvas.getContext("2d"***REMOVED***;
  ctx.save(***REMOVED***;
  ctx.fillStyle = "rgb(255, 255, 255***REMOVED***";
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height***REMOVED***;
  ctx.restore(***REMOVED***;
  return Promise.all([pdfDocument.getPage(pageNumber***REMOVED***, printAnnotationStoragePromise]***REMOVED***.then(function ([pdfPage, printAnnotationStorage]***REMOVED*** {
    const renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      ***REMOVED******REMOVED***,
      intent: "print",
      annotationMode: AnnotationMode.ENABLE_STORAGE,
      optionalContentConfigPromise,
      printAnnotationStorage
    ***REMOVED***;
    const renderTask = pdfPage.render(renderContext***REMOVED***;
    return renderTask.promise.catch(reason => {
      if (!(reason instanceof RenderingCancelledException***REMOVED******REMOVED*** {
        console.error(reason***REMOVED***;
      ***REMOVED***
      throw reason;
    ***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***
class PDFPrintService {
  constructor({
    pdfDocument,
    pagesOverview,
    printContainer,
    printResolution,
    printAnnotationStoragePromise = null
  ***REMOVED******REMOVED*** {
    this.pdfDocument = pdfDocument;
    this.pagesOverview = pagesOverview;
    this.printContainer = printContainer;
    this._printResolution = printResolution || 150;
    this._optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "print"
    ***REMOVED******REMOVED***;
    this._printAnnotationStoragePromise = printAnnotationStoragePromise || Promise.resolve(***REMOVED***;
    this.currentPage = -1;
    this.scratchCanvas = document.createElement("canvas"***REMOVED***;
  ***REMOVED***
  layout(***REMOVED*** {
    this.throwIfInactive(***REMOVED***;
    const body = document.querySelector("body"***REMOVED***;
    body.setAttribute("data-pdfjsprinting", true***REMOVED***;
    const {
      width,
      height
    ***REMOVED*** = this.pagesOverview[0];
    const hasEqualPageSizes = this.pagesOverview.every(size => size.width === width && size.height === height***REMOVED***;
    if (!hasEqualPageSizes***REMOVED*** {
      console.warn("Not all pages have the same size. The printed result may be incorrect!"***REMOVED***;
    ***REMOVED***
    this.pageStyleSheet = document.createElement("style"***REMOVED***;
    this.pageStyleSheet.textContent = `@page { size: ${width***REMOVED***pt ${height***REMOVED***pt;***REMOVED***`;
    body.append(this.pageStyleSheet***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    if (activeService !== this***REMOVED*** {
      return;
    ***REMOVED***
    this.printContainer.textContent = "";
    const body = document.querySelector("body"***REMOVED***;
    body.removeAttribute("data-pdfjsprinting"***REMOVED***;
    if (this.pageStyleSheet***REMOVED*** {
      this.pageStyleSheet.remove(***REMOVED***;
      this.pageStyleSheet = null;
    ***REMOVED***
    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay(***REMOVED***.then(function (***REMOVED*** {
      if (overlayManager.active === dialog***REMOVED*** {
        overlayManager.close(dialog***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  renderPages(***REMOVED*** {
    if (this.pdfDocument.isPureXfa***REMOVED*** {
      getXfaHtmlForPrinting(this.printContainer, this.pdfDocument***REMOVED***;
      return Promise.resolve(***REMOVED***;
    ***REMOVED***
    const pageCount = this.pagesOverview.length;
    const renderNextPage = (resolve, reject***REMOVED*** => {
      this.throwIfInactive(***REMOVED***;
      if (++this.currentPage >= pageCount***REMOVED*** {
        renderProgress(pageCount, pageCount***REMOVED***;
        resolve(***REMOVED***;
        return;
      ***REMOVED***
      const index = this.currentPage;
      renderProgress(index, pageCount***REMOVED***;
      renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index], this._printResolution, this._optionalContentConfigPromise, this._printAnnotationStoragePromise***REMOVED***.then(this.useRenderedPage.bind(this***REMOVED******REMOVED***.then(function (***REMOVED*** {
        renderNextPage(resolve, reject***REMOVED***;
      ***REMOVED***, reject***REMOVED***;
    ***REMOVED***;
    return new Promise(renderNextPage***REMOVED***;
  ***REMOVED***
  useRenderedPage(***REMOVED*** {
    this.throwIfInactive(***REMOVED***;
    const img = document.createElement("img"***REMOVED***;
    this.scratchCanvas.toBlob(blob => {
      img.src = URL.createObjectURL(blob***REMOVED***;
    ***REMOVED******REMOVED***;
    const wrapper = document.createElement("div"***REMOVED***;
    wrapper.className = "printedPage";
    wrapper.append(img***REMOVED***;
    this.printContainer.append(wrapper***REMOVED***;
    const {
      promise,
      resolve,
      reject
    ***REMOVED*** = Promise.withResolvers(***REMOVED***;
    img.onload = resolve;
    img.onerror = reject;
    promise.catch((***REMOVED*** => { ***REMOVED******REMOVED***.then((***REMOVED*** => {
      URL.revokeObjectURL(img.src***REMOVED***;
    ***REMOVED******REMOVED***;
    return promise;
  ***REMOVED***
  performPrint(***REMOVED*** {
    this.throwIfInactive(***REMOVED***;
    return new Promise(resolve => {
      setTimeout((***REMOVED*** => {
        if (!this.active***REMOVED*** {
          resolve(***REMOVED***;
          return;
        ***REMOVED***
        print.call(window***REMOVED***;
        setTimeout(resolve, 20***REMOVED***;
      ***REMOVED***, 0***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get active(***REMOVED*** {
    return this === activeService;
  ***REMOVED***
  throwIfInactive(***REMOVED*** {
    if (!this.active***REMOVED*** {
      throw new Error("This print request was cancelled or completed."***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
const print = window.print;
window.print = function (***REMOVED*** {
  if (activeService***REMOVED*** {
    console.warn("Ignored window.print(***REMOVED*** because of a pending print job."***REMOVED***;
    return;
  ***REMOVED***
  ensureOverlay(***REMOVED***.then(function (***REMOVED*** {
    if (activeService***REMOVED*** {
      overlayManager.open(dialog***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***
    dispatchEvent("beforeprint"***REMOVED***;
  ***REMOVED*** finally {
    if (!activeService***REMOVED*** {
      console.error("Expected print service to be initialized."***REMOVED***;
      ensureOverlay(***REMOVED***.then(function (***REMOVED*** {
        if (overlayManager.active === dialog***REMOVED*** {
          overlayManager.close(dialog***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    const activeServiceOnEntry = activeService;
    activeService.renderPages(***REMOVED***.then(function (***REMOVED*** {
      return activeServiceOnEntry.performPrint(***REMOVED***;
    ***REMOVED******REMOVED***.catch(function (***REMOVED*** { ***REMOVED******REMOVED***.then(function (***REMOVED*** {
      if (activeServiceOnEntry.active***REMOVED*** {
        abort(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***;
function dispatchEvent(eventType***REMOVED*** {
  const event = new CustomEvent(eventType, {
    bubbles: false,
    cancelable: false,
    detail: "custom"
  ***REMOVED******REMOVED***;
  window.dispatchEvent(event***REMOVED***;
***REMOVED***
function abort(***REMOVED*** {
  if (activeService***REMOVED*** {
    activeService.destroy(***REMOVED***;
    dispatchEvent("afterprint"***REMOVED***;
  ***REMOVED***
***REMOVED***
function renderProgress(index, total***REMOVED*** {
  dialog ||= document.getElementById("printServiceDialog"***REMOVED***;
  const progress = Math.round(100 * index / total***REMOVED***;
  const progressBar = dialog.querySelector("progress"***REMOVED***;
  const progressPerc = dialog.querySelector(".relative-progress"***REMOVED***;
  progressBar.value = progress;
  progressPerc.setAttribute("data-l10n-args", JSON.stringify({
    progress
  ***REMOVED******REMOVED******REMOVED***;
***REMOVED***
window.addEventListener("keydown", function (event***REMOVED*** {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey***REMOVED*** && !event.altKey && (!event.shiftKey || window.chrome || window.opera***REMOVED******REMOVED*** {
    window.print(***REMOVED***;
    event.preventDefault(***REMOVED***;
    event.stopImmediatePropagation(***REMOVED***;
  ***REMOVED***
***REMOVED***, true***REMOVED***;
if ("onbeforeprint" in window***REMOVED*** {
  const stopPropagationIfNeeded = function (event***REMOVED*** {
    if (event.detail !== "custom"***REMOVED*** {
      event.stopImmediatePropagation(***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
  window.addEventListener("beforeprint", stopPropagationIfNeeded***REMOVED***;
  window.addEventListener("afterprint", stopPropagationIfNeeded***REMOVED***;
***REMOVED***
let overlayPromise;
function ensureOverlay(***REMOVED*** {
  if (!overlayPromise***REMOVED*** {
    overlayManager = viewerApp.overlayManager;
    if (!overlayManager***REMOVED*** {
      throw new Error("The overlay manager has not yet been initialized."***REMOVED***;
    ***REMOVED***
    dialog ||= document.getElementById("printServiceDialog"***REMOVED***;
    overlayPromise = overlayManager.register(dialog, true***REMOVED***;
    document.getElementById("printCancel"***REMOVED***.onclick = abort;
    dialog.addEventListener("close", abort***REMOVED***;
  ***REMOVED***
  return overlayPromise;
***REMOVED***
class PDFPrintServiceFactory {
  static initGlobals(app***REMOVED*** {
    viewerApp = app;
  ***REMOVED***
  static get supportsPrinting(***REMOVED*** {
    return shadow(this, "supportsPrinting", true***REMOVED***;
  ***REMOVED***
  static createPrintService(params***REMOVED*** {
    if (activeService***REMOVED*** {
      throw new Error("The print service is created and active."***REMOVED***;
    ***REMOVED***
    return activeService = new PDFPrintService(params***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_rendering_queue.js


const CLEANUP_TIMEOUT = 30000;
class PDFRenderingQueue {
  constructor(***REMOVED*** {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
    Object.defineProperty(this, "hasViewer", {
      value: (***REMOVED*** => !!this.pdfViewer
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setViewer(pdfViewer***REMOVED*** {
    this.pdfViewer = pdfViewer;
  ***REMOVED***
  setThumbnailViewer(pdfThumbnailViewer***REMOVED*** {
    this.pdfThumbnailViewer = pdfThumbnailViewer;
  ***REMOVED***
  isHighestPriority(view***REMOVED*** {
    return this.highestPriorityPage === view.renderingId;
  ***REMOVED***
  renderHighestPriority(currentlyVisiblePages***REMOVED*** {
    if (this.idleTimeout***REMOVED*** {
      clearTimeout(this.idleTimeout***REMOVED***;
      this.idleTimeout = null;
    ***REMOVED***
    if (this.pdfViewer.forceRendering(currentlyVisiblePages***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    if (this.isThumbnailViewEnabled && this.pdfThumbnailViewer?.forceRendering(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    if (this.printing***REMOVED*** {
      return;
    ***REMOVED***
    if (this.onIdle***REMOVED*** {
      this.idleTimeout = setTimeout(this.onIdle.bind(this***REMOVED***, CLEANUP_TIMEOUT***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getHighestPriority(visible, views, scrolledDown, preRenderExtra = false***REMOVED*** {
    const visibleViews = visible.views,
      numVisible = visibleViews.length;
    if (numVisible === 0***REMOVED*** {
      return null;
    ***REMOVED***
    for (let i = 0; i < numVisible; i++***REMOVED*** {
      const view = visibleViews[i].view;
      if (!this.isViewFinished(view***REMOVED******REMOVED*** {
        return view;
      ***REMOVED***
    ***REMOVED***
    const firstId = visible.first.id,
      lastId = visible.last.id;
    if (lastId - firstId + 1 > numVisible***REMOVED*** {
      const visibleIds = visible.ids;
      for (let i = 1, ii = lastId - firstId; i < ii; i++***REMOVED*** {
        const holeId = scrolledDown ? firstId + i : lastId - i;
        if (visibleIds.has(holeId***REMOVED******REMOVED*** {
          continue;
        ***REMOVED***
        const holeView = views[holeId - 1];
        if (!this.isViewFinished(holeView***REMOVED******REMOVED*** {
          return holeView;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    let preRenderIndex = scrolledDown ? lastId : firstId - 2;
    let preRenderView = views[preRenderIndex];
    if (preRenderView && !this.isViewFinished(preRenderView***REMOVED******REMOVED*** {
      return preRenderView;
    ***REMOVED***
    if (preRenderExtra***REMOVED*** {
      preRenderIndex += scrolledDown ? 1 : -1;
      preRenderView = views[preRenderIndex];
      if (preRenderView && !this.isViewFinished(preRenderView***REMOVED******REMOVED*** {
        return preRenderView;
      ***REMOVED***
    ***REMOVED***
    return null;
  ***REMOVED***
  isViewFinished(view***REMOVED*** {
    return view.renderingState === RenderingStates.FINISHED;
  ***REMOVED***
  renderView(view***REMOVED*** {
    switch (view.renderingState***REMOVED*** {
      case RenderingStates.FINISHED:
        return false;
      case RenderingStates.PAUSED:
        this.highestPriorityPage = view.renderingId;
        view.resume(***REMOVED***;
        break;
      case RenderingStates.RUNNING:
        this.highestPriorityPage = view.renderingId;
        break;
      case RenderingStates.INITIAL:
        this.highestPriorityPage = view.renderingId;
        view.draw(***REMOVED***.finally((***REMOVED*** => {
          this.renderHighestPriority(***REMOVED***;
        ***REMOVED******REMOVED***.catch(reason => {
          if (reason instanceof RenderingCancelledException***REMOVED*** {
            return;
          ***REMOVED***
          console.error("renderView:", reason***REMOVED***;
        ***REMOVED******REMOVED***;
        break;
    ***REMOVED***
    return true;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_scripting_manager.js


class PDFScriptingManager {
  #closeCapability = null;
  #destroyCapability = null;
  #docProperties = null;
  #eventAbortController = null;
  #eventBus = null;
  #externalServices = null;
  #pdfDocument = null;
  #pdfViewer = null;
  #ready = false;
  #scripting = null;
  #willPrintCapability = null;
  constructor({
    eventBus,
    externalServices = null,
    docProperties = null
  ***REMOVED******REMOVED*** {
    this.#eventBus = eventBus;
    this.#externalServices = externalServices;
    this.#docProperties = docProperties;
  ***REMOVED***
  setViewer(pdfViewer***REMOVED*** {
    this.#pdfViewer = pdfViewer;
  ***REMOVED***
  async setDocument(pdfDocument***REMOVED*** {
    if (this.#pdfDocument***REMOVED*** {
      await this.#destroyScripting(***REMOVED***;
    ***REMOVED***
    this.#pdfDocument = pdfDocument;
    if (!pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const [objects, calculationOrder, docActions] = await Promise.all([pdfDocument.getFieldObjects(***REMOVED***, pdfDocument.getCalculationOrderIds(***REMOVED***, pdfDocument.getJSActions(***REMOVED***]***REMOVED***;
    if (!objects && !docActions***REMOVED*** {
      await this.#destroyScripting(***REMOVED***;
      return;
    ***REMOVED***
    if (pdfDocument !== this.#pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
  ***REMOVED***
      this.#scripting = this.#initScripting(***REMOVED***;
    ***REMOVED*** catch (error***REMOVED*** {
      console.error("setDocument:", error***REMOVED***;
      await this.#destroyScripting(***REMOVED***;
      return;
    ***REMOVED***
    const eventBus = this.#eventBus;
    this.#eventAbortController = new AbortController(***REMOVED***;
    const {
      signal
    ***REMOVED*** = this.#eventAbortController;
    eventBus._on("updatefromsandbox", event => {
      if (event?.source === window***REMOVED*** {
        this.#updateFromSandbox(event.detail***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("dispatcheventinsandbox", event => {
      this.#scripting?.dispatchEventInSandbox(event.detail***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("pagechanging", ({
      pageNumber,
      previous
    ***REMOVED******REMOVED*** => {
      if (pageNumber === previous***REMOVED*** {
        return;
      ***REMOVED***
      this.#dispatchPageClose(previous***REMOVED***;
      this.#dispatchPageOpen(pageNumber***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("pagerendered", ({
      pageNumber
    ***REMOVED******REMOVED*** => {
      if (!this._pageOpenPending.has(pageNumber***REMOVED******REMOVED*** {
        return;
      ***REMOVED***
      if (pageNumber !== this.#pdfViewer.currentPageNumber***REMOVED*** {
        return;
      ***REMOVED***
      this.#dispatchPageOpen(pageNumber***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("pagesdestroy", async (***REMOVED*** => {
      await this.#dispatchPageClose(this.#pdfViewer.currentPageNumber***REMOVED***;
      await this.#scripting?.dispatchEventInSandbox({
        id: "doc",
        name: "WillClose"
      ***REMOVED******REMOVED***;
      this.#closeCapability?.resolve(***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
      const docProperties = await this.#docProperties(pdfDocument***REMOVED***;
      if (pdfDocument !== this.#pdfDocument***REMOVED*** {
        return;
      ***REMOVED***
      await this.#scripting.createSandbox({
        objects,
        calculationOrder,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        ***REMOVED***,
        docInfo: {
          ...docProperties,
          actions: docActions
        ***REMOVED***
      ***REMOVED******REMOVED***;
      eventBus.dispatch("sandboxcreated", {
        source: this
      ***REMOVED******REMOVED***;
    ***REMOVED*** catch (error***REMOVED*** {
      console.error("setDocument:", error***REMOVED***;
      await this.#destroyScripting(***REMOVED***;
      return;
    ***REMOVED***
    await this.#scripting?.dispatchEventInSandbox({
      id: "doc",
      name: "Open"
    ***REMOVED******REMOVED***;
    await this.#dispatchPageOpen(this.#pdfViewer.currentPageNumber, true***REMOVED***;
    Promise.resolve(***REMOVED***.then((***REMOVED*** => {
      if (pdfDocument === this.#pdfDocument***REMOVED*** {
        this.#ready = true;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async dispatchWillSave(***REMOVED*** {
    return this.#scripting?.dispatchEventInSandbox({
      id: "doc",
      name: "WillSave"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async dispatchDidSave(***REMOVED*** {
    return this.#scripting?.dispatchEventInSandbox({
      id: "doc",
      name: "DidSave"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async dispatchWillPrint(***REMOVED*** {
    if (!this.#scripting***REMOVED*** {
      return;
    ***REMOVED***
    await this.#willPrintCapability?.promise;
    this.#willPrintCapability = Promise.withResolvers(***REMOVED***;
  ***REMOVED***
      await this.#scripting.dispatchEventInSandbox({
        id: "doc",
        name: "WillPrint"
      ***REMOVED******REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      this.#willPrintCapability.resolve(***REMOVED***;
      this.#willPrintCapability = null;
      throw ex;
    ***REMOVED***
    await this.#willPrintCapability.promise;
  ***REMOVED***
  async dispatchDidPrint(***REMOVED*** {
    return this.#scripting?.dispatchEventInSandbox({
      id: "doc",
      name: "DidPrint"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get destroyPromise(***REMOVED*** {
    return this.#destroyCapability?.promise || null;
  ***REMOVED***
  get ready(***REMOVED*** {
    return this.#ready;
  ***REMOVED***
  get _pageOpenPending(***REMOVED*** {
    return shadow(this, "_pageOpenPending", new Set(***REMOVED******REMOVED***;
  ***REMOVED***
  get _visitedPages(***REMOVED*** {
    return shadow(this, "_visitedPages", new Map(***REMOVED******REMOVED***;
  ***REMOVED***
  async #updateFromSandbox(detail***REMOVED*** {
    const pdfViewer = this.#pdfViewer;
    const isInPresentationMode = pdfViewer.isInPresentationMode || pdfViewer.isChangingPresentationMode;
    const {
      id,
      siblings,
      command,
      value
    ***REMOVED*** = detail;
    if (!id***REMOVED*** {
      switch (command***REMOVED*** {
        case "clear":
          console.clear(***REMOVED***;
          break;
        case "error":
          console.error(value***REMOVED***;
          break;
        case "layout":
          if (!isInPresentationMode***REMOVED*** {
            const modes = apiPageLayoutToViewerModes(value***REMOVED***;
            pdfViewer.spreadMode = modes.spreadMode;
          ***REMOVED***
          break;
        case "page-num":
          pdfViewer.currentPageNumber = value + 1;
          break;
        case "print":
          await pdfViewer.pagesPromise;
          this.#eventBus.dispatch("print", {
            source: this
          ***REMOVED******REMOVED***;
          break;
        case "println":
          console.log(value***REMOVED***;
          break;
        case "zoom":
          if (!isInPresentationMode***REMOVED*** {
            pdfViewer.currentScaleValue = value;
          ***REMOVED***
          break;
        case "SaveAs":
          this.#eventBus.dispatch("download", {
            source: this
          ***REMOVED******REMOVED***;
          break;
        case "FirstPage":
          pdfViewer.currentPageNumber = 1;
          break;
        case "LastPage":
          pdfViewer.currentPageNumber = pdfViewer.pagesCount;
          break;
        case "NextPage":
          pdfViewer.nextPage(***REMOVED***;
          break;
        case "PrevPage":
          pdfViewer.previousPage(***REMOVED***;
          break;
        case "ZoomViewIn":
          if (!isInPresentationMode***REMOVED*** {
            pdfViewer.increaseScale(***REMOVED***;
          ***REMOVED***
          break;
        case "ZoomViewOut":
          if (!isInPresentationMode***REMOVED*** {
            pdfViewer.decreaseScale(***REMOVED***;
          ***REMOVED***
          break;
        case "WillPrintFinished":
          this.#willPrintCapability?.resolve(***REMOVED***;
          this.#willPrintCapability = null;
          break;
      ***REMOVED***
      return;
    ***REMOVED***
    if (isInPresentationMode && detail.focus***REMOVED*** {
      return;
    ***REMOVED***
    delete detail.id;
    delete detail.siblings;
    const ids = siblings ? [id, ...siblings] : [id];
    for (const elementId of ids***REMOVED*** {
      const element = document.querySelector(`[data-element-id="${elementId***REMOVED***"]`***REMOVED***;
      if (element***REMOVED*** {
        element.dispatchEvent(new CustomEvent("updatefromsandbox", {
          detail
        ***REMOVED******REMOVED******REMOVED***;
      ***REMOVED*** else {
        this.#pdfDocument?.annotationStorage.setValue(elementId, detail***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  async #dispatchPageOpen(pageNumber, initialize = false***REMOVED*** {
    const pdfDocument = this.#pdfDocument,
      visitedPages = this._visitedPages;
    if (initialize***REMOVED*** {
      this.#closeCapability = Promise.withResolvers(***REMOVED***;
    ***REMOVED***
    if (!this.#closeCapability***REMOVED*** {
      return;
    ***REMOVED***
    const pageView = this.#pdfViewer.getPageView(pageNumber - 1***REMOVED***;
    if (pageView?.renderingState !== RenderingStates.FINISHED***REMOVED*** {
      this._pageOpenPending.add(pageNumber***REMOVED***;
      return;
    ***REMOVED***
    this._pageOpenPending.delete(pageNumber***REMOVED***;
    const actionsPromise = (async (***REMOVED*** => {
      const actions = await (!visitedPages.has(pageNumber***REMOVED*** ? pageView.pdfPage?.getJSActions(***REMOVED*** : null***REMOVED***;
      if (pdfDocument !== this.#pdfDocument***REMOVED*** {
        return;
      ***REMOVED***
      await this.#scripting?.dispatchEventInSandbox({
        id: "page",
        name: "PageOpen",
        pageNumber,
        actions
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***(***REMOVED***;
    visitedPages.set(pageNumber, actionsPromise***REMOVED***;
  ***REMOVED***
  async #dispatchPageClose(pageNumber***REMOVED*** {
    const pdfDocument = this.#pdfDocument,
      visitedPages = this._visitedPages;
    if (!this.#closeCapability***REMOVED*** {
      return;
    ***REMOVED***
    if (this._pageOpenPending.has(pageNumber***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    const actionsPromise = visitedPages.get(pageNumber***REMOVED***;
    if (!actionsPromise***REMOVED*** {
      return;
    ***REMOVED***
    visitedPages.set(pageNumber, null***REMOVED***;
    await actionsPromise;
    if (pdfDocument !== this.#pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    await this.#scripting?.dispatchEventInSandbox({
      id: "page",
      name: "PageClose",
      pageNumber
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #initScripting(***REMOVED*** {
    this.#destroyCapability = Promise.withResolvers(***REMOVED***;
    if (this.#scripting***REMOVED*** {
      throw new Error("#initScripting: Scripting already exists."***REMOVED***;
    ***REMOVED***
    return this.#externalServices.createScripting(***REMOVED***;
  ***REMOVED***
  async #destroyScripting(***REMOVED*** {
    if (!this.#scripting***REMOVED*** {
      this.#pdfDocument = null;
      this.#destroyCapability?.resolve(***REMOVED***;
      return;
    ***REMOVED***
    if (this.#closeCapability***REMOVED*** {
      await Promise.race([this.#closeCapability.promise, new Promise(resolve => {
        setTimeout(resolve, 1000***REMOVED***;
      ***REMOVED******REMOVED***]***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
      this.#closeCapability = null;
    ***REMOVED***
    this.#pdfDocument = null;
  ***REMOVED***
      await this.#scripting.destroySandbox(***REMOVED***;
    ***REMOVED*** catch { ***REMOVED***
    this.#willPrintCapability?.reject(new Error("Scripting destroyed."***REMOVED******REMOVED***;
    this.#willPrintCapability = null;
    this.#eventAbortController?.abort(***REMOVED***;
    this.#eventAbortController = null;
    this._pageOpenPending.clear(***REMOVED***;
    this._visitedPages.clear(***REMOVED***;
    this.#scripting = null;
    this.#ready = false;
    this.#destroyCapability?.resolve(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_sidebar.js

const SIDEBAR_WIDTH_VAR = "--sidebar-width";
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_RESIZING_CLASS = "sidebarResizing";
const UI_NOTIFICATION_CLASS = "pdfSidebarNotification";
class PDFSidebar {
  #isRTL = false;
  #mouseAC = null;
  #outerContainerWidth = null;
  #width = null;
  constructor({
    elements,
    eventBus,
    l10n
  ***REMOVED******REMOVED*** {
    this.isOpen = false;
    this.active = SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    this.onToggled = null;
    this.onUpdateThumbnails = null;
    this.outerContainer = elements.outerContainer;
    this.sidebarContainer = elements.sidebarContainer;
    this.toggleButton = elements.toggleButton;
    this.resizer = elements.resizer;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    this.#isRTL = l10n.getDirection(***REMOVED*** === "rtl";
    this.#addEventListeners(***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    this.#hideUINotification(true***REMOVED***;
    this.switchView(SidebarView.THUMBS***REMOVED***;
    this.outlineButton.disabled = false;
    this.attachmentsButton.disabled = false;
    this.layersButton.disabled = false;
    this._currentOutlineItemButton.disabled = true;
  ***REMOVED***
  get visibleView(***REMOVED*** {
    return this.isOpen ? this.active : SidebarView.NONE;
  ***REMOVED***
  setInitialView(view = SidebarView.NONE***REMOVED*** {
    if (this.isInitialViewSet***REMOVED*** {
      return;
    ***REMOVED***
    this.isInitialViewSet = true;
    if (view === SidebarView.NONE || view === SidebarView.UNKNOWN***REMOVED*** {
      this.#dispatchEvent(***REMOVED***;
      return;
    ***REMOVED***
    this.switchView(view, true***REMOVED***;
    if (!this.isInitialEventDispatched***REMOVED*** {
      this.#dispatchEvent(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  switchView(view, forceOpen = false***REMOVED*** {
    const isViewChanged = view !== this.active;
    let forceRendering = false;
    switch (view***REMOVED*** {
      case SidebarView.NONE:
        if (this.isOpen***REMOVED*** {
          this.close(***REMOVED***;
        ***REMOVED***
        return;
      case SidebarView.THUMBS:
        if (this.isOpen && isViewChanged***REMOVED*** {
          forceRendering = true;
        ***REMOVED***
        break;
      case SidebarView.OUTLINE:
        if (this.outlineButton.disabled***REMOVED*** {
          return;
        ***REMOVED***
        break;
      case SidebarView.ATTACHMENTS:
        if (this.attachmentsButton.disabled***REMOVED*** {
          return;
        ***REMOVED***
        break;
      case SidebarView.LAYERS:
        if (this.layersButton.disabled***REMOVED*** {
          return;
        ***REMOVED***
        break;
      default:
        console.error(`PDFSidebar.switchView: "${view***REMOVED***" is not a valid view.`***REMOVED***;
        return;
    ***REMOVED***
    this.active = view;
    toggleCheckedBtn(this.thumbnailButton, view === SidebarView.THUMBS, this.thumbnailView***REMOVED***;
    toggleCheckedBtn(this.outlineButton, view === SidebarView.OUTLINE, this.outlineView***REMOVED***;
    toggleCheckedBtn(this.attachmentsButton, view === SidebarView.ATTACHMENTS, this.attachmentsView***REMOVED***;
    toggleCheckedBtn(this.layersButton, view === SidebarView.LAYERS, this.layersView***REMOVED***;
    if (forceOpen && !this.isOpen***REMOVED*** {
      this.open(***REMOVED***;
      return;
    ***REMOVED***
    if (forceRendering***REMOVED*** {
      this.onUpdateThumbnails(***REMOVED***;
      this.onToggled(***REMOVED***;
    ***REMOVED***
    if (isViewChanged***REMOVED*** {
      this.#dispatchEvent(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  open(***REMOVED*** {
    if (this.isOpen***REMOVED*** {
      return;
    ***REMOVED***
    this.isOpen = true;
    toggleExpandedBtn(this.toggleButton, true***REMOVED***;
    this.outerContainer.classList.add("sidebarMoving", "sidebarOpen"***REMOVED***;
    if (this.active === SidebarView.THUMBS***REMOVED*** {
      this.onUpdateThumbnails(***REMOVED***;
    ***REMOVED***
    this.onToggled(***REMOVED***;
    this.#dispatchEvent(***REMOVED***;
    this.#hideUINotification(***REMOVED***;
  ***REMOVED***
  close(evt = null***REMOVED*** {
    if (!this.isOpen***REMOVED*** {
      return;
    ***REMOVED***
    this.isOpen = false;
    toggleExpandedBtn(this.toggleButton, false***REMOVED***;
    this.outerContainer.classList.add("sidebarMoving"***REMOVED***;
    this.outerContainer.classList.remove("sidebarOpen"***REMOVED***;
    this.onToggled(***REMOVED***;
    this.#dispatchEvent(***REMOVED***;
    if (evt?.detail > 0***REMOVED*** {
      this.toggleButton.blur(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  toggle(evt = null***REMOVED*** {
    if (this.isOpen***REMOVED*** {
      this.close(evt***REMOVED***;
    ***REMOVED*** else {
      this.open(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #dispatchEvent(***REMOVED*** {
    if (this.isInitialViewSet***REMOVED*** {
      this.isInitialEventDispatched ||= true;
    ***REMOVED***
    this.eventBus.dispatch("sidebarviewchanged", {
      source: this,
      view: this.visibleView
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #showUINotification(***REMOVED*** {
    this.toggleButton.setAttribute("data-l10n-id", "pdfjs-toggle-sidebar-notification-button"***REMOVED***;
    if (!this.isOpen***REMOVED*** {
      this.toggleButton.classList.add(UI_NOTIFICATION_CLASS***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #hideUINotification(reset = false***REMOVED*** {
    if (this.isOpen || reset***REMOVED*** {
      this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS***REMOVED***;
    ***REMOVED***
    if (reset***REMOVED*** {
      this.toggleButton.setAttribute("data-l10n-id", "pdfjs-toggle-sidebar-button"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #addEventListeners(***REMOVED*** {
    const {
      eventBus,
      outerContainer
    ***REMOVED*** = this;
    this.sidebarContainer.addEventListener("transitionend", evt => {
      if (evt.target === this.sidebarContainer***REMOVED*** {
        outerContainer.classList.remove("sidebarMoving"***REMOVED***;
        eventBus.dispatch("resize", {
          source: this
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.toggleButton.addEventListener("click", evt => {
      this.toggle(evt***REMOVED***;
    ***REMOVED******REMOVED***;
    this.thumbnailButton.addEventListener("click", (***REMOVED*** => {
      this.switchView(SidebarView.THUMBS***REMOVED***;
    ***REMOVED******REMOVED***;
    this.outlineButton.addEventListener("click", (***REMOVED*** => {
      this.switchView(SidebarView.OUTLINE***REMOVED***;
    ***REMOVED******REMOVED***;
    this.outlineButton.addEventListener("dblclick", (***REMOVED*** => {
      eventBus.dispatch("toggleoutlinetree", {
        source: this
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    this.attachmentsButton.addEventListener("click", (***REMOVED*** => {
      this.switchView(SidebarView.ATTACHMENTS***REMOVED***;
    ***REMOVED******REMOVED***;
    this.layersButton.addEventListener("click", (***REMOVED*** => {
      this.switchView(SidebarView.LAYERS***REMOVED***;
    ***REMOVED******REMOVED***;
    this.layersButton.addEventListener("dblclick", (***REMOVED*** => {
      eventBus.dispatch("resetlayers", {
        source: this
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    this._currentOutlineItemButton.addEventListener("click", (***REMOVED*** => {
      eventBus.dispatch("currentoutlineitem", {
        source: this
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    const onTreeLoaded = (count, button, view***REMOVED*** => {
      button.disabled = !count;
      if (count***REMOVED*** {
        this.#showUINotification(***REMOVED***;
      ***REMOVED*** else if (this.active === view***REMOVED*** {
        this.switchView(SidebarView.THUMBS***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    eventBus._on("outlineloaded", evt => {
      onTreeLoaded(evt.outlineCount, this.outlineButton, SidebarView.OUTLINE***REMOVED***;
      evt.currentOutlineItemPromise.then(enabled => {
        if (!this.isInitialViewSet***REMOVED*** {
          return;
        ***REMOVED***
        this._currentOutlineItemButton.disabled = !enabled;
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("attachmentsloaded", evt => {
      onTreeLoaded(evt.attachmentsCount, this.attachmentsButton, SidebarView.ATTACHMENTS***REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("layersloaded", evt => {
      onTreeLoaded(evt.layersCount, this.layersButton, SidebarView.LAYERS***REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("presentationmodechanged", evt => {
      if (evt.state === PresentationModeState.NORMAL && this.visibleView === SidebarView.THUMBS***REMOVED*** {
        this.onUpdateThumbnails(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this.resizer.addEventListener("mousedown", evt => {
      if (evt.button !== 0***REMOVED*** {
        return;
      ***REMOVED***
      outerContainer.classList.add(SIDEBAR_RESIZING_CLASS***REMOVED***;
      this.#mouseAC = new AbortController(***REMOVED***;
      const opts = {
        signal: this.#mouseAC.signal
      ***REMOVED***;
      window.addEventListener("mousemove", this.#mouseMove.bind(this***REMOVED***, opts***REMOVED***;
      window.addEventListener("mouseup", this.#mouseUp.bind(this***REMOVED***, opts***REMOVED***;
      window.addEventListener("blur", this.#mouseUp.bind(this***REMOVED***, opts***REMOVED***;
    ***REMOVED******REMOVED***;
    eventBus._on("resize", evt => {
      if (evt.source !== window***REMOVED*** {
        return;
      ***REMOVED***
      this.#outerContainerWidth = null;
      if (!this.#width***REMOVED*** {
        return;
      ***REMOVED***
      if (!this.isOpen***REMOVED*** {
        this.#updateWidth(this.#width***REMOVED***;
        return;
      ***REMOVED***
      outerContainer.classList.add(SIDEBAR_RESIZING_CLASS***REMOVED***;
      const updated = this.#updateWidth(this.#width***REMOVED***;
      Promise.resolve(***REMOVED***.then((***REMOVED*** => {
        outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS***REMOVED***;
        if (updated***REMOVED*** {
          eventBus.dispatch("resize", {
            source: this
          ***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get outerContainerWidth(***REMOVED*** {
    return this.#outerContainerWidth ||= this.outerContainer.clientWidth;
  ***REMOVED***
  #updateWidth(width = 0***REMOVED*** {
    const maxWidth = Math.floor(this.outerContainerWidth / 2***REMOVED***;
    if (width > maxWidth***REMOVED*** {
      width = maxWidth;
    ***REMOVED***
    if (width < SIDEBAR_MIN_WIDTH***REMOVED*** {
      width = SIDEBAR_MIN_WIDTH;
    ***REMOVED***
    if (width === this.#width***REMOVED*** {
      return false;
    ***REMOVED***
    this.#width = width;
    docStyle.setProperty(SIDEBAR_WIDTH_VAR, `${width***REMOVED***px`***REMOVED***;
    return true;
  ***REMOVED***
  #mouseMove(evt***REMOVED*** {
    let width = evt.clientX;
    if (this.#isRTL***REMOVED*** {
      width = this.outerContainerWidth - width;
    ***REMOVED***
    this.#updateWidth(width***REMOVED***;
  ***REMOVED***
  #mouseUp(evt***REMOVED*** {
    this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS***REMOVED***;
    this.eventBus.dispatch("resize", {
      source: this
    ***REMOVED******REMOVED***;
    this.#mouseAC?.abort(***REMOVED***;
    this.#mouseAC = null;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_thumbnail_view.js


const DRAW_UPSCALE_FACTOR = 2;
const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_WIDTH = 98;
class TempImageFactory {
  static #tempCanvas = null;
  static getCanvas(width, height***REMOVED*** {
    const tempCanvas = this.#tempCanvas ||= document.createElement("canvas"***REMOVED***;
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d", {
      alpha: false
    ***REMOVED******REMOVED***;
    ctx.save(***REMOVED***;
    ctx.fillStyle = "rgb(255, 255, 255***REMOVED***";
    ctx.fillRect(0, 0, width, height***REMOVED***;
    ctx.restore(***REMOVED***;
    return [tempCanvas, tempCanvas.getContext("2d"***REMOVED***];
  ***REMOVED***
  static destroyCanvas(***REMOVED*** {
    const tempCanvas = this.#tempCanvas;
    if (tempCanvas***REMOVED*** {
      tempCanvas.width = 0;
      tempCanvas.height = 0;
    ***REMOVED***
    this.#tempCanvas = null;
  ***REMOVED***
***REMOVED***
class PDFThumbnailView {
  constructor({
    container,
    eventBus,
    id,
    defaultViewport,
    optionalContentConfigPromise,
    linkService,
    renderingQueue,
    pageColors,
    enableHWA
  ***REMOVED******REMOVED*** {
    this.id = id;
    this.renderingId = "thumbnail" + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.pageColors = pageColors || null;
    this.enableHWA = enableHWA || false;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = RenderingStates.INITIAL;
    this.resume = null;
    const anchor = document.createElement("a"***REMOVED***;
    anchor.href = linkService.getAnchorUrl("#page=" + id***REMOVED***;
    anchor.setAttribute("data-l10n-id", "pdfjs-thumb-page-title"***REMOVED***;
    anchor.setAttribute("data-l10n-args", this.#pageL10nArgs***REMOVED***;
    anchor.onclick = function (***REMOVED*** {
      linkService.goToPage(id***REMOVED***;
      return false;
    ***REMOVED***;
    this.anchor = anchor;
    const div = document.createElement("div"***REMOVED***;
    div.className = "thumbnail";
    div.setAttribute("data-page-number", this.id***REMOVED***;
    this.div = div;
    this.#updateDims(***REMOVED***;
    const img = document.createElement("div"***REMOVED***;
    img.className = "thumbnailImage";
    this._placeholderImg = img;
    div.append(img***REMOVED***;
    anchor.append(div***REMOVED***;
    container.append(anchor***REMOVED***;
  ***REMOVED***
  #updateDims(***REMOVED*** {
    const {
      width,
      height
    ***REMOVED*** = this.viewport;
    const ratio = width / height;
    this.canvasWidth = THUMBNAIL_WIDTH;
    this.canvasHeight = this.canvasWidth / ratio | 0;
    this.scale = this.canvasWidth / width;
    const {
      style
    ***REMOVED*** = this.div;
    style.setProperty("--thumbnail-width", `${this.canvasWidth***REMOVED***px`***REMOVED***;
    style.setProperty("--thumbnail-height", `${this.canvasHeight***REMOVED***px`***REMOVED***;
  ***REMOVED***
  setPdfPage(pdfPage***REMOVED*** {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate***REMOVED*** % 360;
    this.viewport = pdfPage.getViewport({
      scale: 1,
      rotation: totalRotation
    ***REMOVED******REMOVED***;
    this.reset(***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this.cancelRendering(***REMOVED***;
    this.renderingState = RenderingStates.INITIAL;
    this.div.removeAttribute("data-loaded"***REMOVED***;
    this.image?.replaceWith(this._placeholderImg***REMOVED***;
    this.#updateDims(***REMOVED***;
    if (this.image***REMOVED*** {
      this.image.removeAttribute("src"***REMOVED***;
      delete this.image;
    ***REMOVED***
  ***REMOVED***
  update({
    rotation = null
  ***REMOVED******REMOVED*** {
    if (typeof rotation === "number"***REMOVED*** {
      this.rotation = rotation;
    ***REMOVED***
    const totalRotation = (this.rotation + this.pdfPageRotate***REMOVED*** % 360;
    this.viewport = this.viewport.clone({
      scale: 1,
      rotation: totalRotation
    ***REMOVED******REMOVED***;
    this.reset(***REMOVED***;
  ***REMOVED***
  cancelRendering(***REMOVED*** {
    if (this.renderTask***REMOVED*** {
      this.renderTask.cancel(***REMOVED***;
      this.renderTask = null;
    ***REMOVED***
    this.resume = null;
  ***REMOVED***
  #getPageDrawContext(upscaleFactor = 1, enableHWA = this.enableHWA***REMOVED*** {
    const canvas = document.createElement("canvas"***REMOVED***;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: !enableHWA
    ***REMOVED******REMOVED***;
    const outputScale = new OutputScale(***REMOVED***;
    canvas.width = upscaleFactor * this.canvasWidth * outputScale.sx | 0;
    canvas.height = upscaleFactor * this.canvasHeight * outputScale.sy | 0;
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
***REMOVED***
      ctx,
      canvas,
      transform
    ***REMOVED***;
  ***REMOVED***
  #convertCanvasToImage(canvas***REMOVED*** {
    if (this.renderingState !== RenderingStates.FINISHED***REMOVED*** {
      throw new Error("#convertCanvasToImage: Rendering has not finished."***REMOVED***;
    ***REMOVED***
    const reducedCanvas = this.#reduceImage(canvas***REMOVED***;
    const image = document.createElement("img"***REMOVED***;
    image.className = "thumbnailImage";
    image.setAttribute("data-l10n-id", "pdfjs-thumb-page-canvas"***REMOVED***;
    image.setAttribute("data-l10n-args", this.#pageL10nArgs***REMOVED***;
    image.src = reducedCanvas.toDataURL(***REMOVED***;
    this.image = image;
    this.div.setAttribute("data-loaded", true***REMOVED***;
    this._placeholderImg.replaceWith(image***REMOVED***;
    reducedCanvas.width = 0;
    reducedCanvas.height = 0;
  ***REMOVED***
  async #finishRenderTask(renderTask, canvas, error = null***REMOVED*** {
    if (renderTask === this.renderTask***REMOVED*** {
      this.renderTask = null;
    ***REMOVED***
    if (error instanceof RenderingCancelledException***REMOVED*** {
      return;
    ***REMOVED***
    this.renderingState = RenderingStates.FINISHED;
    this.#convertCanvasToImage(canvas***REMOVED***;
    if (error***REMOVED*** {
  ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async draw(***REMOVED*** {
    if (this.renderingState !== RenderingStates.INITIAL***REMOVED*** {
      console.error("Must be in new state before drawing"***REMOVED***;
      return undefined;
    ***REMOVED***
    const {
      pdfPage
    ***REMOVED*** = this;
    if (!pdfPage***REMOVED*** {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded"***REMOVED***;
    ***REMOVED***
    this.renderingState = RenderingStates.RUNNING;
    const {
      ctx,
      canvas,
      transform
    ***REMOVED*** = this.#getPageDrawContext(DRAW_UPSCALE_FACTOR***REMOVED***;
    const drawViewport = this.viewport.clone({
      scale: DRAW_UPSCALE_FACTOR * this.scale
    ***REMOVED******REMOVED***;
    const renderContinueCallback = cont => {
      if (!this.renderingQueue.isHighestPriority(this***REMOVED******REMOVED*** {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = (***REMOVED*** => {
          this.renderingState = RenderingStates.RUNNING;
          cont(***REMOVED***;
        ***REMOVED***;
        return;
      ***REMOVED***
      cont(***REMOVED***;
    ***REMOVED***;
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: drawViewport,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      pageColors: this.pageColors
    ***REMOVED***;
    const renderTask = this.renderTask = pdfPage.render(renderContext***REMOVED***;
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then((***REMOVED*** => this.#finishRenderTask(renderTask, canvas***REMOVED***, error => this.#finishRenderTask(renderTask, canvas, error***REMOVED******REMOVED***;
    resultPromise.finally((***REMOVED*** => {
      canvas.width = 0;
      canvas.height = 0;
      this.eventBus.dispatch("thumbnailrendered", {
        source: this,
        pageNumber: this.id,
        pdfPage: this.pdfPage
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    return resultPromise;
  ***REMOVED***
  setImage(pageView***REMOVED*** {
    if (this.renderingState !== RenderingStates.INITIAL***REMOVED*** {
      return;
    ***REMOVED***
    const {
      thumbnailCanvas: canvas,
      pdfPage,
      scale
    ***REMOVED*** = pageView;
    if (!canvas***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.pdfPage***REMOVED*** {
      this.setPdfPage(pdfPage***REMOVED***;
    ***REMOVED***
    if (scale < this.scale***REMOVED*** {
      return;
    ***REMOVED***
    this.renderingState = RenderingStates.FINISHED;
    this.#convertCanvasToImage(canvas***REMOVED***;
  ***REMOVED***
  #reduceImage(img***REMOVED*** {
    const {
      ctx,
      canvas
    ***REMOVED*** = this.#getPageDrawContext(1, true***REMOVED***;
    if (img.width <= 2 * canvas.width***REMOVED*** {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height***REMOVED***;
      return canvas;
    ***REMOVED***
    let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
    let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
    const [reducedImage, reducedImageCtx] = TempImageFactory.getCanvas(reducedWidth, reducedHeight***REMOVED***;
    while (reducedWidth > img.width || reducedHeight > img.height***REMOVED*** {
      reducedWidth >>= 1;
      reducedHeight >>= 1;
    ***REMOVED***
    reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight***REMOVED***;
    while (reducedWidth > 2 * canvas.width***REMOVED*** {
      reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1***REMOVED***;
      reducedWidth >>= 1;
      reducedHeight >>= 1;
    ***REMOVED***
    ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height***REMOVED***;
    return canvas;
  ***REMOVED***
  get #pageL10nArgs(***REMOVED*** {
    return JSON.stringify({
      page: this.pageLabel ?? this.id
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setPageLabel(label***REMOVED*** {
    this.pageLabel = typeof label === "string" ? label : null;
    this.anchor.setAttribute("data-l10n-args", this.#pageL10nArgs***REMOVED***;
    if (this.renderingState !== RenderingStates.FINISHED***REMOVED*** {
      return;
    ***REMOVED***
    this.image?.setAttribute("data-l10n-args", this.#pageL10nArgs***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_thumbnail_viewer.js


const THUMBNAIL_SCROLL_MARGIN = -19;
const THUMBNAIL_SELECTED_CLASS = "selected";
class PDFThumbnailViewer {
  constructor({
    container,
    eventBus,
    linkService,
    renderingQueue,
    pageColors,
    abortSignal,
    enableHWA
  ***REMOVED******REMOVED*** {
    this.container = container;
    this.eventBus = eventBus;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.pageColors = pageColors || null;
    this.enableHWA = enableHWA || false;
    this.scroll = watchScroll(this.container, this.#scrollUpdated.bind(this***REMOVED***, abortSignal***REMOVED***;
    this.#resetView(***REMOVED***;
  ***REMOVED***
  #scrollUpdated(***REMOVED*** {
    this.renderingQueue.renderHighestPriority(***REMOVED***;
  ***REMOVED***
  getThumbnail(index***REMOVED*** {
    return this._thumbnails[index];
  ***REMOVED***
  #getVisibleThumbs(***REMOVED*** {
    return getVisibleElements({
      scrollEl: this.container,
      views: this._thumbnails
    ***REMOVED******REMOVED***;
  ***REMOVED***
  scrollThumbnailIntoView(pageNumber***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const thumbnailView = this._thumbnails[pageNumber - 1];
    if (!thumbnailView***REMOVED*** {
      console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.'***REMOVED***;
      return;
    ***REMOVED***
    if (pageNumber !== this._currentPageNumber***REMOVED*** {
      const prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
      prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS***REMOVED***;
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS***REMOVED***;
    ***REMOVED***
    const {
      first,
      last,
      views
    ***REMOVED*** = this.#getVisibleThumbs(***REMOVED***;
    if (views.length > 0***REMOVED*** {
      let shouldScroll = false;
      if (pageNumber <= first.id || pageNumber >= last.id***REMOVED*** {
        shouldScroll = true;
      ***REMOVED*** else {
        for (const {
          id,
          percent
        ***REMOVED*** of views***REMOVED*** {
          if (id !== pageNumber***REMOVED*** {
            continue;
          ***REMOVED***
          shouldScroll = percent < 100;
          break;
        ***REMOVED***
      ***REMOVED***
      if (shouldScroll***REMOVED*** {
        scrollIntoView(thumbnailView.div, {
          top: THUMBNAIL_SCROLL_MARGIN
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this._currentPageNumber = pageNumber;
  ***REMOVED***
  get pagesRotation(***REMOVED*** {
    return this._pagesRotation;
  ***REMOVED***
  set pagesRotation(rotation***REMOVED*** {
    if (!isValidRotation(rotation***REMOVED******REMOVED*** {
      throw new Error("Invalid thumbnails rotation angle."***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (this._pagesRotation === rotation***REMOVED*** {
      return;
    ***REMOVED***
    this._pagesRotation = rotation;
    const updateArgs = {
      rotation
    ***REMOVED***;
    for (const thumbnail of this._thumbnails***REMOVED*** {
      thumbnail.update(updateArgs***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  cleanup(***REMOVED*** {
    for (const thumbnail of this._thumbnails***REMOVED*** {
      if (thumbnail.renderingState !== RenderingStates.FINISHED***REMOVED*** {
        thumbnail.reset(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    TempImageFactory.destroyCanvas(***REMOVED***;
  ***REMOVED***
  #resetView(***REMOVED*** {
    this._thumbnails = [];
    this._currentPageNumber = 1;
    this._pageLabels = null;
    this._pagesRotation = 0;
    this.container.textContent = "";
  ***REMOVED***
  setDocument(pdfDocument***REMOVED*** {
    if (this.pdfDocument***REMOVED*** {
      this.#cancelRendering(***REMOVED***;
      this.#resetView(***REMOVED***;
    ***REMOVED***
    this.pdfDocument = pdfDocument;
    if (!pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const firstPagePromise = pdfDocument.getPage(1***REMOVED***;
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    ***REMOVED******REMOVED***;
    firstPagePromise.then(firstPdfPage => {
      const pagesCount = pdfDocument.numPages;
      const viewport = firstPdfPage.getViewport({
        scale: 1
      ***REMOVED******REMOVED***;
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum***REMOVED*** {
        const thumbnail = new PDFThumbnailView({
          container: this.container,
          eventBus: this.eventBus,
          id: pageNum,
          defaultViewport: viewport.clone(***REMOVED***,
          optionalContentConfigPromise,
          linkService: this.linkService,
          renderingQueue: this.renderingQueue,
          pageColors: this.pageColors,
          enableHWA: this.enableHWA
        ***REMOVED******REMOVED***;
        this._thumbnails.push(thumbnail***REMOVED***;
      ***REMOVED***
      this._thumbnails[0]?.setPdfPage(firstPdfPage***REMOVED***;
      const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS***REMOVED***;
    ***REMOVED******REMOVED***.catch(reason => {
      console.error("Unable to initialize thumbnail viewer", reason***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #cancelRendering(***REMOVED*** {
    for (const thumbnail of this._thumbnails***REMOVED*** {
      thumbnail.cancelRendering(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setPageLabels(labels***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (!labels***REMOVED*** {
      this._pageLabels = null;
    ***REMOVED*** else if (!(Array.isArray(labels***REMOVED*** && this.pdfDocument.numPages === labels.length***REMOVED******REMOVED*** {
      this._pageLabels = null;
      console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels."***REMOVED***;
    ***REMOVED*** else {
      this._pageLabels = labels;
    ***REMOVED***
    for (let i = 0, ii = this._thumbnails.length; i < ii; i++***REMOVED*** {
      this._thumbnails[i].setPageLabel(this._pageLabels?.[i] ?? null***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #ensurePdfPageLoaded(thumbView***REMOVED*** {
    if (thumbView.pdfPage***REMOVED*** {
      return thumbView.pdfPage;
    ***REMOVED***
  ***REMOVED***
      const pdfPage = await this.pdfDocument.getPage(thumbView.id***REMOVED***;
      if (!thumbView.pdfPage***REMOVED*** {
        thumbView.setPdfPage(pdfPage***REMOVED***;
      ***REMOVED***
      return pdfPage;
    ***REMOVED*** catch (reason***REMOVED*** {
      console.error("Unable to get page for thumb view", reason***REMOVED***;
      return null;
    ***REMOVED***
  ***REMOVED***
  #getScrollAhead(visible***REMOVED*** {
    if (visible.first?.id === 1***REMOVED*** {
      return true;
    ***REMOVED*** else if (visible.last?.id === this._thumbnails.length***REMOVED*** {
      return false;
    ***REMOVED***
    return this.scroll.down;
  ***REMOVED***
  forceRendering(***REMOVED*** {
    const visibleThumbs = this.#getVisibleThumbs(***REMOVED***;
    const scrollAhead = this.#getScrollAhead(visibleThumbs***REMOVED***;
    const thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, scrollAhead***REMOVED***;
    if (thumbView***REMOVED*** {
      this.#ensurePdfPageLoaded(thumbView***REMOVED***.then((***REMOVED*** => {
        this.renderingQueue.renderView(thumbView***REMOVED***;
      ***REMOVED******REMOVED***;
      return true;
    ***REMOVED***
    return false;
  ***REMOVED***
***REMOVED***

;// ./web/annotation_editor_layer_builder.js


class AnnotationEditorLayerBuilder {
  #annotationLayer = null;
  #drawLayer = null;
  #onAppend = null;
  #structTreeLayer = null;
  #textLayer = null;
  #uiManager;
  constructor(options***REMOVED*** {
    this.pdfPage = options.pdfPage;
    this.accessibilityManager = options.accessibilityManager;
    this.l10n = options.l10n;
    this.l10n ||= new genericl10n_GenericL10n(***REMOVED***;
    this.annotationEditorLayer = null;
    this.div = null;
    this._cancelled = false;
    this.#uiManager = options.uiManager;
    this.#annotationLayer = options.annotationLayer || null;
    this.#textLayer = options.textLayer || null;
    this.#drawLayer = options.drawLayer || null;
    this.#onAppend = options.onAppend || null;
    this.#structTreeLayer = options.structTreeLayer || null;
  ***REMOVED***
  async render(viewport, intent = "display"***REMOVED*** {
    if (intent !== "display"***REMOVED*** {
      return;
    ***REMOVED***
    if (this._cancelled***REMOVED*** {
      return;
    ***REMOVED***
    const clonedViewport = viewport.clone({
      dontFlip: true
    ***REMOVED******REMOVED***;
    if (this.div***REMOVED*** {
      this.annotationEditorLayer.update({
        viewport: clonedViewport
      ***REMOVED******REMOVED***;
      this.show(***REMOVED***;
      return;
    ***REMOVED***
    const div = this.div = document.createElement("div"***REMOVED***;
    div.className = "annotationEditorLayer";
    div.hidden = true;
    div.dir = this.#uiManager.direction;
    this.#onAppend?.(div***REMOVED***;
    this.annotationEditorLayer = new AnnotationEditorLayer({
      uiManager: this.#uiManager,
      div,
      structTreeLayer: this.#structTreeLayer,
      accessibilityManager: this.accessibilityManager,
      pageIndex: this.pdfPage.pageNumber - 1,
      l10n: this.l10n,
      viewport: clonedViewport,
      annotationLayer: this.#annotationLayer,
      textLayer: this.#textLayer,
      drawLayer: this.#drawLayer
    ***REMOVED******REMOVED***;
    const parameters = {
      viewport: clonedViewport,
      div,
      annotations: null,
      intent
    ***REMOVED***;
    this.annotationEditorLayer.render(parameters***REMOVED***;
    this.show(***REMOVED***;
  ***REMOVED***
  cancel(***REMOVED*** {
    this._cancelled = true;
    if (!this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.annotationEditorLayer.destroy(***REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.annotationEditorLayer.pause(true***REMOVED***;
    this.div.hidden = true;
  ***REMOVED***
  show(***REMOVED*** {
    if (!this.div || this.annotationEditorLayer.isInvisible***REMOVED*** {
      return;
    ***REMOVED***
    this.div.hidden = false;
    this.annotationEditorLayer.pause(false***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/annotation_layer_builder.js


class AnnotationLayerBuilder {
  #onAppend = null;
  #eventAbortController = null;
  constructor({
    pdfPage,
    linkService,
    downloadManager,
    annotationStorage = null,
    imageResourcesPath = "",
    renderForms = true,
    enableScripting = false,
    hasJSActionsPromise = null,
    fieldObjectsPromise = null,
    annotationCanvasMap = null,
    accessibilityManager = null,
    annotationEditorUIManager = null,
    onAppend = null
  ***REMOVED******REMOVED*** {
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderForms = renderForms;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise || Promise.resolve(false***REMOVED***;
    this._fieldObjectsPromise = fieldObjectsPromise || Promise.resolve(null***REMOVED***;
    this._annotationCanvasMap = annotationCanvasMap;
    this._accessibilityManager = accessibilityManager;
    this._annotationEditorUIManager = annotationEditorUIManager;
    this.#onAppend = onAppend;
    this.annotationLayer = null;
    this.div = null;
    this._cancelled = false;
    this._eventBus = linkService.eventBus;
  ***REMOVED***
  async render(viewport, options, intent = "display"***REMOVED*** {
    if (this.div***REMOVED*** {
      if (this._cancelled || !this.annotationLayer***REMOVED*** {
        return;
      ***REMOVED***
      this.annotationLayer.update({
        viewport: viewport.clone({
          dontFlip: true
        ***REMOVED******REMOVED***
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    const [annotations, hasJSActions, fieldObjects] = await Promise.all([this.pdfPage.getAnnotations({
      intent
    ***REMOVED******REMOVED***, this._hasJSActionsPromise, this._fieldObjectsPromise]***REMOVED***;
    if (this._cancelled***REMOVED*** {
      return;
    ***REMOVED***
    const div = this.div = document.createElement("div"***REMOVED***;
    div.className = "annotationLayer";
    this.#onAppend?.(div***REMOVED***;
    if (annotations.length === 0***REMOVED*** {
      this.hide(***REMOVED***;
      return;
    ***REMOVED***
    this.annotationLayer = new AnnotationLayer({
      div,
      accessibilityManager: this._accessibilityManager,
      annotationCanvasMap: this._annotationCanvasMap,
      annotationEditorUIManager: this._annotationEditorUIManager,
      page: this.pdfPage,
      viewport: viewport.clone({
        dontFlip: true
      ***REMOVED******REMOVED***,
      structTreeLayer: options?.structTreeLayer || null
    ***REMOVED******REMOVED***;
    await this.annotationLayer.render({
      annotations,
      imageResourcesPath: this.imageResourcesPath,
      renderForms: this.renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      annotationStorage: this.annotationStorage,
      enableScripting: this.enableScripting,
      hasJSActions,
      fieldObjects
    ***REMOVED******REMOVED***;
    if (this.linkService.isInPresentationMode***REMOVED*** {
      this.#updatePresentationModeState(PresentationModeState.FULLSCREEN***REMOVED***;
    ***REMOVED***
    if (!this.#eventAbortController***REMOVED*** {
      this.#eventAbortController = new AbortController(***REMOVED***;
      this._eventBus?._on("presentationmodechanged", evt => {
        this.#updatePresentationModeState(evt.state***REMOVED***;
      ***REMOVED***, {
        signal: this.#eventAbortController.signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  cancel(***REMOVED*** {
    this._cancelled = true;
    this.#eventAbortController?.abort(***REMOVED***;
    this.#eventAbortController = null;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.div.hidden = true;
  ***REMOVED***
  hasEditableAnnotations(***REMOVED*** {
    return !!this.annotationLayer?.hasEditableAnnotations(***REMOVED***;
  ***REMOVED***
  #updatePresentationModeState(state***REMOVED*** {
    if (!this.div***REMOVED*** {
      return;
    ***REMOVED***
    let disableFormElements = false;
    switch (state***REMOVED*** {
      case PresentationModeState.FULLSCREEN:
        disableFormElements = true;
        break;
      case PresentationModeState.NORMAL:
        break;
      default:
        return;
    ***REMOVED***
    for (const section of this.div.childNodes***REMOVED*** {
      if (section.hasAttribute("data-internal-link"***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      section.inert = disableFormElements;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/draw_layer_builder.js

class DrawLayerBuilder {
  #drawLayer = null;
  constructor(options***REMOVED*** {
    this.pageIndex = options.pageIndex;
  ***REMOVED***
  async render(intent = "display"***REMOVED*** {
    if (intent !== "display" || this.#drawLayer || this._cancelled***REMOVED*** {
      return;
    ***REMOVED***
    this.#drawLayer = new DrawLayer({
      pageIndex: this.pageIndex
    ***REMOVED******REMOVED***;
  ***REMOVED***
  cancel(***REMOVED*** {
    this._cancelled = true;
    if (!this.#drawLayer***REMOVED*** {
      return;
    ***REMOVED***
    this.#drawLayer.destroy(***REMOVED***;
    this.#drawLayer = null;
  ***REMOVED***
  setParent(parent***REMOVED*** {
    this.#drawLayer?.setParent(parent***REMOVED***;
  ***REMOVED***
  getDrawLayer(***REMOVED*** {
    return this.#drawLayer;
  ***REMOVED***
***REMOVED***

;// ./web/struct_tree_layer_builder.js

const PDF_ROLE_TO_HTML_ROLE = {
  Document: null,
  DocumentFragment: null,
  Part: "group",
  Sect: "group",
  Div: "group",
  Aside: "note",
  NonStruct: "none",
  P: null,
  H: "heading",
  Title: null,
  FENote: "note",
  Sub: "group",
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: "link",
  Annot: "note",
  Form: "form",
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: "list",
  LI: "listitem",
  LBody: null,
  Table: "table",
  TR: "row",
  TH: "columnheader",
  TD: "cell",
  THead: "columnheader",
  TBody: null,
  TFoot: null,
  Caption: null,
  Figure: "figure",
  Formula: null,
  Artifact: null
***REMOVED***;
const HEADING_PATTERN = /^H(\d+***REMOVED***$/;
class StructTreeLayerBuilder {
  #promise;
  #treeDom = null;
  #treePromise;
  #elementAttributes = new Map(***REMOVED***;
  #rawDims;
  #elementsToAddToTextLayer = null;
  constructor(pdfPage, rawDims***REMOVED*** {
    this.#promise = pdfPage.getStructTree(***REMOVED***;
    this.#rawDims = rawDims;
  ***REMOVED***
  async render(***REMOVED*** {
    if (this.#treePromise***REMOVED*** {
      return this.#treePromise;
    ***REMOVED***
    const {
      promise,
      resolve,
      reject
    ***REMOVED*** = Promise.withResolvers(***REMOVED***;
    this.#treePromise = promise;
  ***REMOVED***
      this.#treeDom = this.#walk(await this.#promise***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      reject(ex***REMOVED***;
    ***REMOVED***
    this.#promise = null;
    this.#treeDom?.classList.add("structTree"***REMOVED***;
    resolve(this.#treeDom***REMOVED***;
    return promise;
  ***REMOVED***
  async getAriaAttributes(annotationId***REMOVED*** {
  ***REMOVED***
      await this.render(***REMOVED***;
      return this.#elementAttributes.get(annotationId***REMOVED***;
    ***REMOVED*** catch { ***REMOVED***
    return null;
  ***REMOVED***
  hide(***REMOVED*** {
    if (this.#treeDom && !this.#treeDom.hidden***REMOVED*** {
      this.#treeDom.hidden = true;
    ***REMOVED***
  ***REMOVED***
  show(***REMOVED*** {
    if (this.#treeDom?.hidden***REMOVED*** {
      this.#treeDom.hidden = false;
    ***REMOVED***
  ***REMOVED***
  #setAttributes(structElement, htmlElement***REMOVED*** {
    const {
      alt,
      id,
      lang
    ***REMOVED*** = structElement;
    if (alt !== undefined***REMOVED*** {
      let added = false;
      const label = removeNullCharacters(alt***REMOVED***;
      for (const child of structElement.children***REMOVED*** {
        if (child.type === "annotation"***REMOVED*** {
          let attrs = this.#elementAttributes.get(child.id***REMOVED***;
          if (!attrs***REMOVED*** {
            attrs = new Map(***REMOVED***;
            this.#elementAttributes.set(child.id, attrs***REMOVED***;
          ***REMOVED***
          attrs.set("aria-label", label***REMOVED***;
          added = true;
        ***REMOVED***
      ***REMOVED***
      if (!added***REMOVED*** {
        htmlElement.setAttribute("aria-label", label***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (id !== undefined***REMOVED*** {
      htmlElement.setAttribute("aria-owns", id***REMOVED***;
    ***REMOVED***
    if (lang !== undefined***REMOVED*** {
      htmlElement.setAttribute("lang", removeNullCharacters(lang, true***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #addImageInTextLayer(node, element***REMOVED*** {
    const {
      alt,
      bbox,
      children
    ***REMOVED*** = node;
    const child = children?.[0];
    if (!this.#rawDims || !alt || !bbox || child?.type !== "content"***REMOVED*** {
      return false;
    ***REMOVED***
    const {
      id
    ***REMOVED*** = child;
    if (!id***REMOVED*** {
      return false;
    ***REMOVED***
    element.setAttribute("aria-owns", id***REMOVED***;
    const img = document.createElement("span"***REMOVED***;
    (this.#elementsToAddToTextLayer ||= new Map(***REMOVED******REMOVED***.set(id, img***REMOVED***;
    img.setAttribute("role", "img"***REMOVED***;
    img.setAttribute("aria-label", removeNullCharacters(alt***REMOVED******REMOVED***;
    const {
      pageHeight,
      pageX,
      pageY
    ***REMOVED*** = this.#rawDims;
    const calc = "calc(var(--scale-factor***REMOVED****";
    const {
      style
    ***REMOVED*** = img;
    style.width = `${calc***REMOVED***${bbox[2] - bbox[0]***REMOVED***px***REMOVED***`;
    style.height = `${calc***REMOVED***${bbox[3] - bbox[1]***REMOVED***px***REMOVED***`;
    style.left = `${calc***REMOVED***${bbox[0] - pageX***REMOVED***px***REMOVED***`;
    style.top = `${calc***REMOVED***${pageHeight - bbox[3] + pageY***REMOVED***px***REMOVED***`;
    return true;
  ***REMOVED***
  addElementsToTextLayer(***REMOVED*** {
    if (!this.#elementsToAddToTextLayer***REMOVED*** {
      return;
    ***REMOVED***
    for (const [id, img] of this.#elementsToAddToTextLayer***REMOVED*** {
      document.getElementById(id***REMOVED***?.append(img***REMOVED***;
    ***REMOVED***
    this.#elementsToAddToTextLayer.clear(***REMOVED***;
    this.#elementsToAddToTextLayer = null;
  ***REMOVED***
  #walk(node***REMOVED*** {
    if (!node***REMOVED*** {
      return null;
    ***REMOVED***
    const element = document.createElement("span"***REMOVED***;
    if ("role" in node***REMOVED*** {
      const {
        role
      ***REMOVED*** = node;
      const match = role.match(HEADING_PATTERN***REMOVED***;
      if (match***REMOVED*** {
        element.setAttribute("role", "heading"***REMOVED***;
        element.setAttribute("aria-level", match[1]***REMOVED***;
      ***REMOVED*** else if (PDF_ROLE_TO_HTML_ROLE[role]***REMOVED*** {
        element.setAttribute("role", PDF_ROLE_TO_HTML_ROLE[role]***REMOVED***;
      ***REMOVED***
      if (role === "Figure" && this.#addImageInTextLayer(node, element***REMOVED******REMOVED*** {
        return element;
      ***REMOVED***
    ***REMOVED***
    this.#setAttributes(node, element***REMOVED***;
    if (node.children***REMOVED*** {
      if (node.children.length === 1 && "id" in node.children[0]***REMOVED*** {
        this.#setAttributes(node.children[0], element***REMOVED***;
      ***REMOVED*** else {
        for (const kid of node.children***REMOVED*** {
          element.append(this.#walk(kid***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return element;
  ***REMOVED***
***REMOVED***

;// ./web/text_accessibility.js

class TextAccessibilityManager {
  #enabled = false;
  #textChildren = null;
  #textNodes = new Map(***REMOVED***;
  #waitingElements = new Map(***REMOVED***;
  setTextMapping(textDivs***REMOVED*** {
    this.#textChildren = textDivs;
  ***REMOVED***
  static #compareElementPositions(e1, e2***REMOVED*** {
    const rect1 = e1.getBoundingClientRect(***REMOVED***;
    const rect2 = e2.getBoundingClientRect(***REMOVED***;
    if (rect1.width === 0 && rect1.height === 0***REMOVED*** {
      return +1;
    ***REMOVED***
    if (rect2.width === 0 && rect2.height === 0***REMOVED*** {
      return -1;
    ***REMOVED***
    const top1 = rect1.y;
    const bot1 = rect1.y + rect1.height;
    const mid1 = rect1.y + rect1.height / 2;
    const top2 = rect2.y;
    const bot2 = rect2.y + rect2.height;
    const mid2 = rect2.y + rect2.height / 2;
    if (mid1 <= top2 && mid2 >= bot1***REMOVED*** {
      return -1;
    ***REMOVED***
    if (mid2 <= top1 && mid1 >= bot2***REMOVED*** {
      return +1;
    ***REMOVED***
    const centerX1 = rect1.x + rect1.width / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    return centerX1 - centerX2;
  ***REMOVED***
  enable(***REMOVED*** {
    if (this.#enabled***REMOVED*** {
      throw new Error("TextAccessibilityManager is already enabled."***REMOVED***;
    ***REMOVED***
    if (!this.#textChildren***REMOVED*** {
      throw new Error("Text divs and strings have not been set."***REMOVED***;
    ***REMOVED***
    this.#enabled = true;
    this.#textChildren = this.#textChildren.slice(***REMOVED***;
    this.#textChildren.sort(TextAccessibilityManager.#compareElementPositions***REMOVED***;
    if (this.#textNodes.size > 0***REMOVED*** {
      const textChildren = this.#textChildren;
      for (const [id, nodeIndex] of this.#textNodes***REMOVED*** {
        const element = document.getElementById(id***REMOVED***;
        if (!element***REMOVED*** {
          this.#textNodes.delete(id***REMOVED***;
          continue;
        ***REMOVED***
        this.#addIdToAriaOwns(id, textChildren[nodeIndex]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    for (const [element, isRemovable] of this.#waitingElements***REMOVED*** {
      this.addPointerInTextLayer(element, isRemovable***REMOVED***;
    ***REMOVED***
    this.#waitingElements.clear(***REMOVED***;
  ***REMOVED***
  disable(***REMOVED*** {
    if (!this.#enabled***REMOVED*** {
      return;
    ***REMOVED***
    this.#waitingElements.clear(***REMOVED***;
    this.#textChildren = null;
    this.#enabled = false;
  ***REMOVED***
  removePointerInTextLayer(element***REMOVED*** {
    if (!this.#enabled***REMOVED*** {
      this.#waitingElements.delete(element***REMOVED***;
      return;
    ***REMOVED***
    const children = this.#textChildren;
    if (!children || children.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    const {
      id
    ***REMOVED*** = element;
    const nodeIndex = this.#textNodes.get(id***REMOVED***;
    if (nodeIndex === undefined***REMOVED*** {
      return;
    ***REMOVED***
    const node = children[nodeIndex];
    this.#textNodes.delete(id***REMOVED***;
    let owns = node.getAttribute("aria-owns"***REMOVED***;
    if (owns?.includes(id***REMOVED******REMOVED*** {
      owns = owns.split(" "***REMOVED***.filter(x => x !== id***REMOVED***.join(" "***REMOVED***;
      if (owns***REMOVED*** {
        node.setAttribute("aria-owns", owns***REMOVED***;
      ***REMOVED*** else {
        node.removeAttribute("aria-owns"***REMOVED***;
        node.setAttribute("role", "presentation"***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #addIdToAriaOwns(id, node***REMOVED*** {
    const owns = node.getAttribute("aria-owns"***REMOVED***;
    if (!owns?.includes(id***REMOVED******REMOVED*** {
      node.setAttribute("aria-owns", owns ? `${owns***REMOVED*** ${id***REMOVED***` : id***REMOVED***;
    ***REMOVED***
    node.removeAttribute("role"***REMOVED***;
  ***REMOVED***
  addPointerInTextLayer(element, isRemovable***REMOVED*** {
    const {
      id
    ***REMOVED*** = element;
    if (!id***REMOVED*** {
      return null;
    ***REMOVED***
    if (!this.#enabled***REMOVED*** {
      this.#waitingElements.set(element, isRemovable***REMOVED***;
      return null;
    ***REMOVED***
    if (isRemovable***REMOVED*** {
      this.removePointerInTextLayer(element***REMOVED***;
    ***REMOVED***
    const children = this.#textChildren;
    if (!children || children.length === 0***REMOVED*** {
      return null;
    ***REMOVED***
    const index = binarySearchFirstItem(children, node => TextAccessibilityManager.#compareElementPositions(element, node***REMOVED*** < 0***REMOVED***;
    const nodeIndex = Math.max(0, index - 1***REMOVED***;
    const child = children[nodeIndex];
    this.#addIdToAriaOwns(id, child***REMOVED***;
    this.#textNodes.set(id, nodeIndex***REMOVED***;
    const parent = child.parentNode;
    return parent?.classList.contains("markedContent"***REMOVED*** ? parent.id : null;
  ***REMOVED***
  moveElementInDOM(container, element, contentElement, isRemovable***REMOVED*** {
    const id = this.addPointerInTextLayer(contentElement, isRemovable***REMOVED***;
    if (!container.hasChildNodes(***REMOVED******REMOVED*** {
      container.append(element***REMOVED***;
      return id;
    ***REMOVED***
    const children = Array.from(container.childNodes***REMOVED***.filter(node => node !== element***REMOVED***;
    if (children.length === 0***REMOVED*** {
      return id;
    ***REMOVED***
    const elementToCompare = contentElement || element;
    const index = binarySearchFirstItem(children, node => TextAccessibilityManager.#compareElementPositions(elementToCompare, node***REMOVED*** < 0***REMOVED***;
    if (index === 0***REMOVED*** {
      children[0].before(element***REMOVED***;
    ***REMOVED*** else {
      children[index - 1].after(element***REMOVED***;
    ***REMOVED***
    return id;
  ***REMOVED***
***REMOVED***

;// ./web/text_highlighter.js
class TextHighlighter {
  #eventAbortController = null;
  constructor({
    findController,
    eventBus,
    pageIndex
  ***REMOVED******REMOVED*** {
    this.findController = findController;
    this.matches = [];
    this.eventBus = eventBus;
    this.pageIdx = pageIndex;
    this.textDivs = null;
    this.textContentItemsStr = null;
    this.enabled = false;
  ***REMOVED***
  setTextMapping(divs, texts***REMOVED*** {
    this.textDivs = divs;
    this.textContentItemsStr = texts;
  ***REMOVED***
  enable(***REMOVED*** {
    if (!this.textDivs || !this.textContentItemsStr***REMOVED*** {
      throw new Error("Text divs and strings have not been set."***REMOVED***;
    ***REMOVED***
    if (this.enabled***REMOVED*** {
      throw new Error("TextHighlighter is already enabled."***REMOVED***;
    ***REMOVED***
    this.enabled = true;
    if (!this.#eventAbortController***REMOVED*** {
      this.#eventAbortController = new AbortController(***REMOVED***;
      this.eventBus._on("updatetextlayermatches", evt => {
        if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1***REMOVED*** {
          this._updateMatches(***REMOVED***;
        ***REMOVED***
      ***REMOVED***, {
        signal: this.#eventAbortController.signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._updateMatches(***REMOVED***;
  ***REMOVED***
  disable(***REMOVED*** {
    if (!this.enabled***REMOVED*** {
      return;
    ***REMOVED***
    this.enabled = false;
    this.#eventAbortController?.abort(***REMOVED***;
    this.#eventAbortController = null;
    this._updateMatches(true***REMOVED***;
  ***REMOVED***
  _convertMatches(matches, matchesLength***REMOVED*** {
    if (!matches***REMOVED*** {
      return [];
    ***REMOVED***
    const {
      textContentItemsStr
    ***REMOVED*** = this;
    let i = 0,
      iIndex = 0;
    const end = textContentItemsStr.length - 1;
    const result = [];
    for (let m = 0, mm = matches.length; m < mm; m++***REMOVED*** {
      let matchIdx = matches[m];
      while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length***REMOVED*** {
        iIndex += textContentItemsStr[i].length;
        i++;
      ***REMOVED***
      if (i === textContentItemsStr.length***REMOVED*** {
        console.error("Could not find a matching mapping"***REMOVED***;
      ***REMOVED***
      const match = {
        begin: {
          divIdx: i,
          offset: matchIdx - iIndex
        ***REMOVED***
      ***REMOVED***;
      matchIdx += matchesLength[m];
      while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length***REMOVED*** {
        iIndex += textContentItemsStr[i].length;
        i++;
      ***REMOVED***
      match.end = {
        divIdx: i,
        offset: matchIdx - iIndex
      ***REMOVED***;
      result.push(match***REMOVED***;
    ***REMOVED***
    return result;
  ***REMOVED***
  _renderMatches(matches***REMOVED*** {
    if (matches.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    const {
      findController,
      pageIdx
    ***REMOVED*** = this;
    const {
      textContentItemsStr,
      textDivs
    ***REMOVED*** = this;
    const isSelectedPage = pageIdx === findController.selected.pageIdx;
    const selectedMatchIdx = findController.selected.matchIdx;
    const highlightAll = findController.state.highlightAll;
    let prevEnd = null;
    const infinity = {
      divIdx: -1,
      offset: undefined
    ***REMOVED***;
    function beginText(begin, className***REMOVED*** {
      const divIdx = begin.divIdx;
      textDivs[divIdx].textContent = "";
      return appendTextToDiv(divIdx, 0, begin.offset, className***REMOVED***;
    ***REMOVED***
    function appendTextToDiv(divIdx, fromOffset, toOffset, className***REMOVED*** {
      let div = textDivs[divIdx];
      if (div.nodeType === Node.TEXT_NODE***REMOVED*** {
        const span = document.createElement("span"***REMOVED***;
        div.before(span***REMOVED***;
        span.append(div***REMOVED***;
        textDivs[divIdx] = span;
        div = span;
      ***REMOVED***
      const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset***REMOVED***;
      const node = document.createTextNode(content***REMOVED***;
      if (className***REMOVED*** {
        const span = document.createElement("span"***REMOVED***;
        span.className = `${className***REMOVED*** appended`;
        span.append(node***REMOVED***;
        div.append(span***REMOVED***;
        if (className.includes("selected"***REMOVED******REMOVED*** {
          const {
            left
          ***REMOVED*** = span.getClientRects(***REMOVED***[0];
          const parentLeft = div.getBoundingClientRect(***REMOVED***.left;
          return left - parentLeft;
        ***REMOVED***
        return 0;
      ***REMOVED***
      div.append(node***REMOVED***;
      return 0;
    ***REMOVED***
    let i0 = selectedMatchIdx,
      i1 = i0 + 1;
    if (highlightAll***REMOVED*** {
      i0 = 0;
      i1 = matches.length;
    ***REMOVED*** else if (!isSelectedPage***REMOVED*** {
      return;
    ***REMOVED***
    let lastDivIdx = -1;
    let lastOffset = -1;
    for (let i = i0; i < i1; i++***REMOVED*** {
      const match = matches[i];
      const begin = match.begin;
      if (begin.divIdx === lastDivIdx && begin.offset === lastOffset***REMOVED*** {
        continue;
      ***REMOVED***
      lastDivIdx = begin.divIdx;
      lastOffset = begin.offset;
      const end = match.end;
      const isSelected = isSelectedPage && i === selectedMatchIdx;
      const highlightSuffix = isSelected ? " selected" : "";
      let selectedLeft = 0;
      if (!prevEnd || begin.divIdx !== prevEnd.divIdx***REMOVED*** {
        if (prevEnd !== null***REMOVED*** {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset***REMOVED***;
        ***REMOVED***
        beginText(begin***REMOVED***;
      ***REMOVED*** else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset***REMOVED***;
      ***REMOVED***
      if (begin.divIdx === end.divIdx***REMOVED*** {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix***REMOVED***;
      ***REMOVED*** else {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix***REMOVED***;
        for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++***REMOVED*** {
          textDivs[n0].className = "highlight middle" + highlightSuffix;
        ***REMOVED***
        beginText(end, "highlight end" + highlightSuffix***REMOVED***;
      ***REMOVED***
      prevEnd = end;
      if (isSelected***REMOVED*** {
        findController.scrollMatchIntoView({
          element: textDivs[begin.divIdx],
          selectedLeft,
          pageIndex: pageIdx,
          matchIndex: selectedMatchIdx
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (prevEnd***REMOVED*** {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _updateMatches(reset = false***REMOVED*** {
    if (!this.enabled && !reset***REMOVED*** {
      return;
    ***REMOVED***
    const {
      findController,
      matches,
      pageIdx
    ***REMOVED*** = this;
    const {
      textContentItemsStr,
      textDivs
    ***REMOVED*** = this;
    let clearedUntilDivIdx = -1;
    for (const match of matches***REMOVED*** {
      const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx***REMOVED***;
      for (let n = begin, end = match.end.divIdx; n <= end; n++***REMOVED*** {
        const div = textDivs[n];
        div.textContent = textContentItemsStr[n];
        div.className = "";
      ***REMOVED***
      clearedUntilDivIdx = match.end.divIdx + 1;
    ***REMOVED***
    if (!findController?.highlightMatches || reset***REMOVED*** {
      return;
    ***REMOVED***
    const pageMatches = findController.pageMatches[pageIdx] || null;
    const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
    this.matches = this._convertMatches(pageMatches, pageMatchesLength***REMOVED***;
    this._renderMatches(this.matches***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/text_layer_builder.js


class TextLayerBuilder {
  #enablePermissions = false;
  #onAppend = null;
  #renderingDone = false;
  #textLayer = null;
  static #textLayers = new Map(***REMOVED***;
  static #selectionChangeAbortController = null;
  constructor({
    pdfPage,
    highlighter = null,
    accessibilityManager = null,
    enablePermissions = false,
    onAppend = null
  ***REMOVED******REMOVED*** {
    this.pdfPage = pdfPage;
    this.highlighter = highlighter;
    this.accessibilityManager = accessibilityManager;
    this.#enablePermissions = enablePermissions === true;
    this.#onAppend = onAppend;
    this.div = document.createElement("div"***REMOVED***;
    this.div.tabIndex = 0;
    this.div.className = "textLayer";
  ***REMOVED***
  async render(viewport, textContentParams = null***REMOVED*** {
    if (this.#renderingDone && this.#textLayer***REMOVED*** {
      this.#textLayer.update({
        viewport,
        onBefore: this.hide.bind(this***REMOVED***
      ***REMOVED******REMOVED***;
      this.show(***REMOVED***;
      return;
    ***REMOVED***
    this.cancel(***REMOVED***;
    this.#textLayer = new TextLayer({
      textContentSource: this.pdfPage.streamTextContent(textContentParams || {
        includeMarkedContent: true,
        disableNormalization: true
      ***REMOVED******REMOVED***,
      container: this.div,
      viewport
    ***REMOVED******REMOVED***;
    const {
      textDivs,
      textContentItemsStr
    ***REMOVED*** = this.#textLayer;
    this.highlighter?.setTextMapping(textDivs, textContentItemsStr***REMOVED***;
    this.accessibilityManager?.setTextMapping(textDivs***REMOVED***;
    await this.#textLayer.render(***REMOVED***;
    this.#renderingDone = true;
    const endOfContent = document.createElement("div"***REMOVED***;
    endOfContent.className = "endOfContent";
    this.div.append(endOfContent***REMOVED***;
    this.#bindMouse(endOfContent***REMOVED***;
    this.#onAppend?.(this.div***REMOVED***;
    this.highlighter?.enable(***REMOVED***;
    this.accessibilityManager?.enable(***REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    if (!this.div.hidden && this.#renderingDone***REMOVED*** {
      this.highlighter?.disable(***REMOVED***;
      this.div.hidden = true;
    ***REMOVED***
  ***REMOVED***
  show(***REMOVED*** {
    if (this.div.hidden && this.#renderingDone***REMOVED*** {
      this.div.hidden = false;
      this.highlighter?.enable(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  cancel(***REMOVED*** {
    this.#textLayer?.cancel(***REMOVED***;
    this.#textLayer = null;
    this.highlighter?.disable(***REMOVED***;
    this.accessibilityManager?.disable(***REMOVED***;
    TextLayerBuilder.#removeGlobalSelectionListener(this.div***REMOVED***;
  ***REMOVED***
  #bindMouse(end***REMOVED*** {
    const {
      div
    ***REMOVED*** = this;
    div.addEventListener("mousedown", (***REMOVED*** => {
      div.classList.add("selecting"***REMOVED***;
    ***REMOVED******REMOVED***;
    div.addEventListener("copy", event => {
      if (!this.#enablePermissions***REMOVED*** {
        const selection = document.getSelection(***REMOVED***;
        event.clipboardData.setData("text/plain", removeNullCharacters(normalizeUnicode(selection.toString(***REMOVED******REMOVED******REMOVED******REMOVED***;
      ***REMOVED***
      stopEvent(event***REMOVED***;
    ***REMOVED******REMOVED***;
    TextLayerBuilder.#textLayers.set(div, end***REMOVED***;
    TextLayerBuilder.#enableGlobalSelectionListener(***REMOVED***;
  ***REMOVED***
  static #removeGlobalSelectionListener(textLayerDiv***REMOVED*** {
    this.#textLayers.delete(textLayerDiv***REMOVED***;
    if (this.#textLayers.size === 0***REMOVED*** {
      this.#selectionChangeAbortController?.abort(***REMOVED***;
      this.#selectionChangeAbortController = null;
    ***REMOVED***
  ***REMOVED***
  static #enableGlobalSelectionListener(***REMOVED*** {
    if (this.#selectionChangeAbortController***REMOVED*** {
      return;
    ***REMOVED***
    this.#selectionChangeAbortController = new AbortController(***REMOVED***;
    const {
      signal
    ***REMOVED*** = this.#selectionChangeAbortController;
    const reset = (end, textLayer***REMOVED*** => {
      textLayer.append(end***REMOVED***;
      end.style.width = "";
      end.style.height = "";
      textLayer.classList.remove("selecting"***REMOVED***;
    ***REMOVED***;
    let isPointerDown = false;
    document.addEventListener("pointerdown", (***REMOVED*** => {
      isPointerDown = true;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    document.addEventListener("pointerup", (***REMOVED*** => {
      isPointerDown = false;
      this.#textLayers.forEach(reset***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("blur", (***REMOVED*** => {
      isPointerDown = false;
      this.#textLayers.forEach(reset***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    document.addEventListener("keyup", (***REMOVED*** => {
      if (!isPointerDown***REMOVED*** {
        this.#textLayers.forEach(reset***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    var isFirefox, prevRange;
    document.addEventListener("selectionchange", (***REMOVED*** => {
      const selection = document.getSelection(***REMOVED***;
      if (selection.rangeCount === 0***REMOVED*** {
        this.#textLayers.forEach(reset***REMOVED***;
        return;
      ***REMOVED***
      const activeTextLayers = new Set(***REMOVED***;
      for (let i = 0; i < selection.rangeCount; i++***REMOVED*** {
        const range = selection.getRangeAt(i***REMOVED***;
        for (const textLayerDiv of this.#textLayers.keys(***REMOVED******REMOVED*** {
          if (!activeTextLayers.has(textLayerDiv***REMOVED*** && range.intersectsNode(textLayerDiv***REMOVED******REMOVED*** {
            activeTextLayers.add(textLayerDiv***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      for (const [textLayerDiv, endDiv] of this.#textLayers***REMOVED*** {
        if (activeTextLayers.has(textLayerDiv***REMOVED******REMOVED*** {
          textLayerDiv.classList.add("selecting"***REMOVED***;
        ***REMOVED*** else {
          reset(endDiv, textLayerDiv***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      isFirefox ??= getComputedStyle(this.#textLayers.values(***REMOVED***.next(***REMOVED***.value***REMOVED***.getPropertyValue("-moz-user-select"***REMOVED*** === "none";
      if (isFirefox***REMOVED*** {
        return;
      ***REMOVED***
      const range = selection.getRangeAt(0***REMOVED***;
      const modifyStart = prevRange && (range.compareBoundaryPoints(Range.END_TO_END, prevRange***REMOVED*** === 0 || range.compareBoundaryPoints(Range.START_TO_END, prevRange***REMOVED*** === 0***REMOVED***;
      let anchor = modifyStart ? range.startContainer : range.endContainer;
      if (anchor.nodeType === Node.TEXT_NODE***REMOVED*** {
        anchor = anchor.parentNode;
      ***REMOVED***
      const parentTextLayer = anchor.parentElement?.closest(".textLayer"***REMOVED***;
      const endDiv = this.#textLayers.get(parentTextLayer***REMOVED***;
      if (endDiv***REMOVED*** {
        endDiv.style.width = parentTextLayer.style.width;
        endDiv.style.height = parentTextLayer.style.height;
        anchor.parentElement.insertBefore(endDiv, modifyStart ? anchor : anchor.nextSibling***REMOVED***;
      ***REMOVED***
      prevRange = range.cloneRange(***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_page_view.js













const DEFAULT_LAYER_PROPERTIES = null;
const LAYERS_ORDER = new Map([["canvasWrapper", 0], ["textLayer", 1], ["annotationLayer", 2], ["annotationEditorLayer", 3], ["xfaLayer", 3]]***REMOVED***;
class PDFPageView {
  #annotationMode = AnnotationMode.ENABLE_FORMS;
  #canvasWrapper = null;
  #enableHWA = false;
  #hasRestrictedScaling = false;
  #isEditing = false;
  #layerProperties = null;
  #loadingId = null;
  #originalViewport = null;
  #previousRotation = null;
  #scaleRoundX = 1;
  #scaleRoundY = 1;
  #renderError = null;
  #renderingState = RenderingStates.INITIAL;
  #textLayerMode = TextLayerMode.ENABLE;
  #useThumbnailCanvas = {
    directDrawing: true,
    initialOptionalContent: true,
    regularAnnotations: true
  ***REMOVED***;
  #layers = [null, null, null, null];
  constructor(options***REMOVED*** {
    const container = options.container;
    const defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    this.#layerProperties = options.layerProperties || DEFAULT_LAYER_PROPERTIES;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.#textLayerMode = options.textLayerMode ?? TextLayerMode.ENABLE;
    this.#annotationMode = options.annotationMode ?? AnnotationMode.ENABLE_FORMS;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.maxCanvasPixels = options.maxCanvasPixels ?? AppOptions.get("maxCanvasPixels"***REMOVED***;
    this.pageColors = options.pageColors || null;
    this.#enableHWA = options.enableHWA || false;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.l10n = options.l10n;
    this.l10n ||= new genericl10n_GenericL10n(***REMOVED***;
    this.renderTask = null;
    this.resume = null;
    this._isStandalone = !this.renderingQueue?.hasViewer(***REMOVED***;
    this._container = container;
    this._annotationCanvasMap = null;
    this.annotationLayer = null;
    this.annotationEditorLayer = null;
    this.textLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    this.drawLayer = null;
    const div = document.createElement("div"***REMOVED***;
    div.className = "page";
    div.setAttribute("data-page-number", this.id***REMOVED***;
    div.setAttribute("role", "region"***REMOVED***;
    div.setAttribute("data-l10n-id", "pdfjs-page-landmark"***REMOVED***;
    div.setAttribute("data-l10n-args", JSON.stringify({
      page: this.id
    ***REMOVED******REMOVED******REMOVED***;
    this.div = div;
    this.#setDimensions(***REMOVED***;
    container?.append(div***REMOVED***;
    if (this._isStandalone***REMOVED*** {
      container?.style.setProperty("--scale-factor", this.scale * PixelsPerInch.PDF_TO_CSS_UNITS***REMOVED***;
      if (this.pageColors?.background***REMOVED*** {
        container?.style.setProperty("--page-bg-color", this.pageColors.background***REMOVED***;
      ***REMOVED***
      const {
        optionalContentConfigPromise
      ***REMOVED*** = options;
      if (optionalContentConfigPromise***REMOVED*** {
        optionalContentConfigPromise.then(optionalContentConfig => {
          if (optionalContentConfigPromise !== this._optionalContentConfigPromise***REMOVED*** {
            return;
          ***REMOVED***
          this.#useThumbnailCanvas.initialOptionalContent = optionalContentConfig.hasInitialVisibility;
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (!options.l10n***REMOVED*** {
        this.l10n.translate(this.div***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #addLayer(div, name***REMOVED*** {
    const pos = LAYERS_ORDER.get(name***REMOVED***;
    const oldDiv = this.#layers[pos];
    this.#layers[pos] = div;
    if (oldDiv***REMOVED*** {
      oldDiv.replaceWith(div***REMOVED***;
      return;
    ***REMOVED***
    for (let i = pos - 1; i >= 0; i--***REMOVED*** {
      const layer = this.#layers[i];
      if (layer***REMOVED*** {
        layer.after(div***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    this.div.prepend(div***REMOVED***;
  ***REMOVED***
  get renderingState(***REMOVED*** {
    return this.#renderingState;
  ***REMOVED***
  set renderingState(state***REMOVED*** {
    if (state === this.#renderingState***REMOVED*** {
      return;
    ***REMOVED***
    this.#renderingState = state;
    if (this.#loadingId***REMOVED*** {
      clearTimeout(this.#loadingId***REMOVED***;
      this.#loadingId = null;
    ***REMOVED***
    switch (state***REMOVED*** {
      case RenderingStates.PAUSED:
        this.div.classList.remove("loading"***REMOVED***;
        break;
      case RenderingStates.RUNNING:
        this.div.classList.add("loadingIcon"***REMOVED***;
        this.#loadingId = setTimeout((***REMOVED*** => {
          this.div.classList.add("loading"***REMOVED***;
          this.#loadingId = null;
        ***REMOVED***, 0***REMOVED***;
        break;
      case RenderingStates.INITIAL:
      case RenderingStates.FINISHED:
        this.div.classList.remove("loadingIcon", "loading"***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  #setDimensions(***REMOVED*** {
    const {
      viewport
    ***REMOVED*** = this;
    if (this.pdfPage***REMOVED*** {
      if (this.#previousRotation === viewport.rotation***REMOVED*** {
        return;
      ***REMOVED***
      this.#previousRotation = viewport.rotation;
    ***REMOVED***
    setLayerDimensions(this.div, viewport, true, false***REMOVED***;
  ***REMOVED***
  setPdfPage(pdfPage***REMOVED*** {
    if (this._isStandalone && (this.pageColors?.foreground === "CanvasText" || this.pageColors?.background === "Canvas"***REMOVED******REMOVED*** {
      this._container?.style.setProperty("--hcm-highlight-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"***REMOVED******REMOVED***;
      this._container?.style.setProperty("--hcm-highlight-selected-filter", pdfPage.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "Highlight"***REMOVED******REMOVED***;
    ***REMOVED***
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate***REMOVED*** % 360;
    this.viewport = pdfPage.getViewport({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    ***REMOVED******REMOVED***;
    this.#setDimensions(***REMOVED***;
    this.reset(***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.reset(***REMOVED***;
    this.pdfPage?.cleanup(***REMOVED***;
  ***REMOVED***
  hasEditableAnnotations(***REMOVED*** {
    return !!this.annotationLayer?.hasEditableAnnotations(***REMOVED***;
  ***REMOVED***
  get _textHighlighter(***REMOVED*** {
    return shadow(this, "_textHighlighter", new TextHighlighter({
      pageIndex: this.id - 1,
      eventBus: this.eventBus,
      findController: this.#layerProperties.findController
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  #dispatchLayerRendered(name, error***REMOVED*** {
    this.eventBus.dispatch(name, {
      source: this,
      pageNumber: this.id,
      error
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async #renderAnnotationLayer(***REMOVED*** {
    let error = null;
  ***REMOVED***
      await this.annotationLayer.render(this.viewport, {
        structTreeLayer: this.structTreeLayer
      ***REMOVED***, "display"***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("#renderAnnotationLayer:", ex***REMOVED***;
      error = ex;
    ***REMOVED*** finally {
      this.#dispatchLayerRendered("annotationlayerrendered", error***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #renderAnnotationEditorLayer(***REMOVED*** {
    let error = null;
  ***REMOVED***
      await this.annotationEditorLayer.render(this.viewport, "display"***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("#renderAnnotationEditorLayer:", ex***REMOVED***;
      error = ex;
    ***REMOVED*** finally {
      this.#dispatchLayerRendered("annotationeditorlayerrendered", error***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #renderDrawLayer(***REMOVED*** {
  ***REMOVED***
      await this.drawLayer.render("display"***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("#renderDrawLayer:", ex***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #renderXfaLayer(***REMOVED*** {
    let error = null;
  ***REMOVED***
      const result = await this.xfaLayer.render(this.viewport, "display"***REMOVED***;
      if (result?.textDivs && this._textHighlighter***REMOVED*** {
        this.#buildXfaTextContentItems(result.textDivs***REMOVED***;
      ***REMOVED***
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("#renderXfaLayer:", ex***REMOVED***;
      error = ex;
    ***REMOVED*** finally {
      if (this.xfaLayer?.div***REMOVED*** {
        this.l10n.pause(***REMOVED***;
        this.#addLayer(this.xfaLayer.div, "xfaLayer"***REMOVED***;
        this.l10n.resume(***REMOVED***;
      ***REMOVED***
      this.#dispatchLayerRendered("xfalayerrendered", error***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #renderTextLayer(***REMOVED*** {
    if (!this.textLayer***REMOVED*** {
      return;
    ***REMOVED***
    let error = null;
  ***REMOVED***
      await this.textLayer.render(this.viewport***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      if (ex instanceof AbortException***REMOVED*** {
        return;
      ***REMOVED***
      console.error("#renderTextLayer:", ex***REMOVED***;
      error = ex;
    ***REMOVED***
    this.#dispatchLayerRendered("textlayerrendered", error***REMOVED***;
    this.#renderStructTreeLayer(***REMOVED***;
  ***REMOVED***
  async #renderStructTreeLayer(***REMOVED*** {
    if (!this.textLayer***REMOVED*** {
      return;
    ***REMOVED***
    const treeDom = await this.structTreeLayer?.render(***REMOVED***;
    if (treeDom***REMOVED*** {
      this.l10n.pause(***REMOVED***;
      this.structTreeLayer?.addElementsToTextLayer(***REMOVED***;
      if (this.canvas && treeDom.parentNode !== this.canvas***REMOVED*** {
        this.canvas.append(treeDom***REMOVED***;
      ***REMOVED***
      this.l10n.resume(***REMOVED***;
    ***REMOVED***
    this.structTreeLayer?.show(***REMOVED***;
  ***REMOVED***
  async #buildXfaTextContentItems(textDivs***REMOVED*** {
    const text = await this.pdfPage.getTextContent(***REMOVED***;
    const items = [];
    for (const item of text.items***REMOVED*** {
      items.push(item.str***REMOVED***;
    ***REMOVED***
    this._textHighlighter.setTextMapping(textDivs, items***REMOVED***;
    this._textHighlighter.enable(***REMOVED***;
  ***REMOVED***
  #resetCanvas(***REMOVED*** {
    const {
      canvas
    ***REMOVED*** = this;
    if (!canvas***REMOVED*** {
      return;
    ***REMOVED***
    canvas.remove(***REMOVED***;
    canvas.width = canvas.height = 0;
    this.canvas = null;
    this.#originalViewport = null;
  ***REMOVED***
  reset({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false,
    keepCanvasWrapper = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    this.cancelRendering({
      keepAnnotationLayer,
      keepAnnotationEditorLayer,
      keepXfaLayer,
      keepTextLayer
    ***REMOVED******REMOVED***;
    this.renderingState = RenderingStates.INITIAL;
    const div = this.div;
    const childNodes = div.childNodes,
      annotationLayerNode = keepAnnotationLayer && this.annotationLayer?.div || null,
      annotationEditorLayerNode = keepAnnotationEditorLayer && this.annotationEditorLayer?.div || null,
      xfaLayerNode = keepXfaLayer && this.xfaLayer?.div || null,
      textLayerNode = keepTextLayer && this.textLayer?.div || null,
      canvasWrapperNode = keepCanvasWrapper && this.#canvasWrapper || null;
    for (let i = childNodes.length - 1; i >= 0; i--***REMOVED*** {
      const node = childNodes[i];
      switch (node***REMOVED*** {
        case annotationLayerNode:
        case annotationEditorLayerNode:
        case xfaLayerNode:
        case textLayerNode:
        case canvasWrapperNode:
          continue;
      ***REMOVED***
      node.remove(***REMOVED***;
      const layerIndex = this.#layers.indexOf(node***REMOVED***;
      if (layerIndex >= 0***REMOVED*** {
        this.#layers[layerIndex] = null;
      ***REMOVED***
    ***REMOVED***
    div.removeAttribute("data-loaded"***REMOVED***;
    if (annotationLayerNode***REMOVED*** {
      this.annotationLayer.hide(***REMOVED***;
    ***REMOVED***
    if (annotationEditorLayerNode***REMOVED*** {
      this.annotationEditorLayer.hide(***REMOVED***;
    ***REMOVED***
    if (xfaLayerNode***REMOVED*** {
      this.xfaLayer.hide(***REMOVED***;
    ***REMOVED***
    if (textLayerNode***REMOVED*** {
      this.textLayer.hide(***REMOVED***;
    ***REMOVED***
    this.structTreeLayer?.hide(***REMOVED***;
    if (!keepCanvasWrapper && this.#canvasWrapper***REMOVED*** {
      this.#canvasWrapper = null;
      this.#resetCanvas(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  toggleEditingMode(isEditing***REMOVED*** {
    if (!this.hasEditableAnnotations(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this.#isEditing = isEditing;
    this.reset({
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true,
      keepCanvasWrapper: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  update({
    scale = 0,
    rotation = null,
    optionalContentConfigPromise = null,
    drawingDelay = -1
  ***REMOVED******REMOVED*** {
    this.scale = scale || this.scale;
    if (typeof rotation === "number"***REMOVED*** {
      this.rotation = rotation;
    ***REMOVED***
    if (optionalContentConfigPromise instanceof Promise***REMOVED*** {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      optionalContentConfigPromise.then(optionalContentConfig => {
        if (optionalContentConfigPromise !== this._optionalContentConfigPromise***REMOVED*** {
          return;
        ***REMOVED***
        this.#useThumbnailCanvas.initialOptionalContent = optionalContentConfig.hasInitialVisibility;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.#useThumbnailCanvas.directDrawing = true;
    const totalRotation = (this.rotation + this.pdfPageRotate***REMOVED*** % 360;
    this.viewport = this.viewport.clone({
      scale: this.scale * PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    ***REMOVED******REMOVED***;
    this.#setDimensions(***REMOVED***;
    if (this._isStandalone***REMOVED*** {
      this._container?.style.setProperty("--scale-factor", this.viewport.scale***REMOVED***;
    ***REMOVED***
    if (this.canvas***REMOVED*** {
      let onlyCssZoom = false;
      if (this.#hasRestrictedScaling***REMOVED*** {
        if (this.maxCanvasPixels === 0***REMOVED*** {
          onlyCssZoom = true;
        ***REMOVED*** else if (this.maxCanvasPixels > 0***REMOVED*** {
          const {
            width,
            height
          ***REMOVED*** = this.viewport;
          const {
            sx,
            sy
          ***REMOVED*** = this.outputScale;
          onlyCssZoom = (Math.floor(width***REMOVED*** * sx | 0***REMOVED*** * (Math.floor(height***REMOVED*** * sy | 0***REMOVED*** > this.maxCanvasPixels;
        ***REMOVED***
      ***REMOVED***
      const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1000;
      if (postponeDrawing || onlyCssZoom***REMOVED*** {
        if (postponeDrawing && !onlyCssZoom && this.renderingState !== RenderingStates.FINISHED***REMOVED*** {
          this.cancelRendering({
            keepAnnotationLayer: true,
            keepAnnotationEditorLayer: true,
            keepXfaLayer: true,
            keepTextLayer: true,
            cancelExtraDelay: drawingDelay
          ***REMOVED******REMOVED***;
          this.renderingState = RenderingStates.FINISHED;
          this.#useThumbnailCanvas.directDrawing = false;
        ***REMOVED***
        this.cssTransform({
          redrawAnnotationLayer: true,
          redrawAnnotationEditorLayer: true,
          redrawXfaLayer: true,
          redrawTextLayer: !postponeDrawing,
          hideTextLayer: postponeDrawing
        ***REMOVED******REMOVED***;
        if (postponeDrawing***REMOVED*** {
          return;
        ***REMOVED***
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(***REMOVED***,
          error: this.#renderError
        ***REMOVED******REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    this.cssTransform({***REMOVED******REMOVED***;
    this.reset({
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true,
      keepTextLayer: true,
      keepCanvasWrapper: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  cancelRendering({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false,
    keepTextLayer = false,
    cancelExtraDelay = 0
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    if (this.renderTask***REMOVED*** {
      this.renderTask.cancel(cancelExtraDelay***REMOVED***;
      this.renderTask = null;
    ***REMOVED***
    this.resume = null;
    if (this.textLayer && (!keepTextLayer || !this.textLayer.div***REMOVED******REMOVED*** {
      this.textLayer.cancel(***REMOVED***;
      this.textLayer = null;
    ***REMOVED***
    if (this.annotationLayer && (!keepAnnotationLayer || !this.annotationLayer.div***REMOVED******REMOVED*** {
      this.annotationLayer.cancel(***REMOVED***;
      this.annotationLayer = null;
      this._annotationCanvasMap = null;
    ***REMOVED***
    if (this.structTreeLayer && !this.textLayer***REMOVED*** {
      this.structTreeLayer = null;
    ***REMOVED***
    if (this.annotationEditorLayer && (!keepAnnotationEditorLayer || !this.annotationEditorLayer.div***REMOVED******REMOVED*** {
      if (this.drawLayer***REMOVED*** {
        this.drawLayer.cancel(***REMOVED***;
        this.drawLayer = null;
      ***REMOVED***
      this.annotationEditorLayer.cancel(***REMOVED***;
      this.annotationEditorLayer = null;
    ***REMOVED***
    if (this.xfaLayer && (!keepXfaLayer || !this.xfaLayer.div***REMOVED******REMOVED*** {
      this.xfaLayer.cancel(***REMOVED***;
      this.xfaLayer = null;
      this._textHighlighter?.disable(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  cssTransform({
    redrawAnnotationLayer = false,
    redrawAnnotationEditorLayer = false,
    redrawXfaLayer = false,
    redrawTextLayer = false,
    hideTextLayer = false
  ***REMOVED******REMOVED*** {
    const {
      canvas
    ***REMOVED*** = this;
    if (!canvas***REMOVED*** {
      return;
    ***REMOVED***
    const originalViewport = this.#originalViewport;
    if (this.viewport !== originalViewport***REMOVED*** {
      const relativeRotation = (360 + this.viewport.rotation - originalViewport.rotation***REMOVED*** % 360;
      if (relativeRotation === 90 || relativeRotation === 270***REMOVED*** {
        const {
          width,
          height
        ***REMOVED*** = this.viewport;
        const scaleX = height / width;
        const scaleY = width / height;
        canvas.style.transform = `rotate(${relativeRotation***REMOVED***deg***REMOVED*** scale(${scaleX***REMOVED***,${scaleY***REMOVED******REMOVED***`;
      ***REMOVED*** else {
        canvas.style.transform = relativeRotation === 0 ? "" : `rotate(${relativeRotation***REMOVED***deg***REMOVED***`;
      ***REMOVED***
    ***REMOVED***
    if (redrawAnnotationLayer && this.annotationLayer***REMOVED*** {
      this.#renderAnnotationLayer(***REMOVED***;
    ***REMOVED***
    if (redrawAnnotationEditorLayer && this.annotationEditorLayer***REMOVED*** {
      if (this.drawLayer***REMOVED*** {
        this.#renderDrawLayer(***REMOVED***;
      ***REMOVED***
      this.#renderAnnotationEditorLayer(***REMOVED***;
    ***REMOVED***
    if (redrawXfaLayer && this.xfaLayer***REMOVED*** {
      this.#renderXfaLayer(***REMOVED***;
    ***REMOVED***
    if (this.textLayer***REMOVED*** {
      if (hideTextLayer***REMOVED*** {
        this.textLayer.hide(***REMOVED***;
        this.structTreeLayer?.hide(***REMOVED***;
      ***REMOVED*** else if (redrawTextLayer***REMOVED*** {
        this.#renderTextLayer(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  get width(***REMOVED*** {
    return this.viewport.width;
  ***REMOVED***
  get height(***REMOVED*** {
    return this.viewport.height;
  ***REMOVED***
  getPagePoint(x, y***REMOVED*** {
    return this.viewport.convertToPdfPoint(x, y***REMOVED***;
  ***REMOVED***
  async #finishRenderTask(renderTask, error = null***REMOVED*** {
    if (renderTask === this.renderTask***REMOVED*** {
      this.renderTask = null;
    ***REMOVED***
    if (error instanceof RenderingCancelledException***REMOVED*** {
      this.#renderError = null;
      return;
    ***REMOVED***
    this.#renderError = error;
    this.renderingState = RenderingStates.FINISHED;
    this.#useThumbnailCanvas.regularAnnotations = !renderTask.separateAnnots;
    this.eventBus.dispatch("pagerendered", {
      source: this,
      pageNumber: this.id,
      cssTransform: false,
      timestamp: performance.now(***REMOVED***,
      error: this.#renderError
    ***REMOVED******REMOVED***;
    if (error***REMOVED*** {
  ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async draw(***REMOVED*** {
    if (this.renderingState !== RenderingStates.INITIAL***REMOVED*** {
      console.error("Must be in new state before drawing"***REMOVED***;
      this.reset(***REMOVED***;
    ***REMOVED***
    const {
      div,
      l10n,
      pageColors,
      pdfPage,
      viewport
    ***REMOVED*** = this;
    if (!pdfPage***REMOVED*** {
      this.renderingState = RenderingStates.FINISHED;
      throw new Error("pdfPage is not loaded"***REMOVED***;
    ***REMOVED***
    this.renderingState = RenderingStates.RUNNING;
    let canvasWrapper = this.#canvasWrapper;
    if (!canvasWrapper***REMOVED*** {
      canvasWrapper = this.#canvasWrapper = document.createElement("div"***REMOVED***;
      canvasWrapper.classList.add("canvasWrapper"***REMOVED***;
      this.#addLayer(canvasWrapper, "canvasWrapper"***REMOVED***;
    ***REMOVED***
    if (!this.textLayer && this.#textLayerMode !== TextLayerMode.DISABLE && !pdfPage.isPureXfa***REMOVED*** {
      this._accessibilityManager ||= new TextAccessibilityManager(***REMOVED***;
      this.textLayer = new TextLayerBuilder({
        pdfPage,
        highlighter: this._textHighlighter,
        accessibilityManager: this._accessibilityManager,
        enablePermissions: this.#textLayerMode === TextLayerMode.ENABLE_PERMISSIONS,
        onAppend: textLayerDiv => {
          this.l10n.pause(***REMOVED***;
          this.#addLayer(textLayerDiv, "textLayer"***REMOVED***;
          this.l10n.resume(***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (!this.annotationLayer && this.#annotationMode !== AnnotationMode.DISABLE***REMOVED*** {
      const {
        annotationStorage,
        annotationEditorUIManager,
        downloadManager,
        enableScripting,
        fieldObjectsPromise,
        hasJSActionsPromise,
        linkService
      ***REMOVED*** = this.#layerProperties;
      this._annotationCanvasMap ||= new Map(***REMOVED***;
      this.annotationLayer = new AnnotationLayerBuilder({
        pdfPage,
        annotationStorage,
        imageResourcesPath: this.imageResourcesPath,
        renderForms: this.#annotationMode === AnnotationMode.ENABLE_FORMS,
        linkService,
        downloadManager,
        enableScripting,
        hasJSActionsPromise,
        fieldObjectsPromise,
        annotationCanvasMap: this._annotationCanvasMap,
        accessibilityManager: this._accessibilityManager,
        annotationEditorUIManager,
        onAppend: annotationLayerDiv => {
          this.#addLayer(annotationLayerDiv, "annotationLayer"***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const renderContinueCallback = cont => {
      showCanvas?.(false***REMOVED***;
      if (this.renderingQueue && !this.renderingQueue.isHighestPriority(this***REMOVED******REMOVED*** {
        this.renderingState = RenderingStates.PAUSED;
        this.resume = (***REMOVED*** => {
          this.renderingState = RenderingStates.RUNNING;
          cont(***REMOVED***;
        ***REMOVED***;
        return;
      ***REMOVED***
      cont(***REMOVED***;
    ***REMOVED***;
    const {
      width,
      height
    ***REMOVED*** = viewport;
    const canvas = document.createElement("canvas"***REMOVED***;
    canvas.setAttribute("role", "presentation"***REMOVED***;
    const hasHCM = !!(pageColors?.background && pageColors?.foreground***REMOVED***;
    const prevCanvas = this.canvas;
    const updateOnFirstShow = !prevCanvas && !hasHCM;
    this.canvas = canvas;
    this.#originalViewport = viewport;
    let showCanvas = isLastShow => {
      if (updateOnFirstShow***REMOVED*** {
        canvasWrapper.prepend(canvas***REMOVED***;
        showCanvas = null;
        return;
      ***REMOVED***
      if (!isLastShow***REMOVED*** {
        return;
      ***REMOVED***
      if (prevCanvas***REMOVED*** {
        prevCanvas.replaceWith(canvas***REMOVED***;
        prevCanvas.width = prevCanvas.height = 0;
      ***REMOVED*** else {
        canvasWrapper.prepend(canvas***REMOVED***;
      ***REMOVED***
      showCanvas = null;
    ***REMOVED***;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: !this.#enableHWA
    ***REMOVED******REMOVED***;
    const outputScale = this.outputScale = new OutputScale(***REMOVED***;
    if (this.maxCanvasPixels === 0***REMOVED*** {
      const invScale = 1 / this.scale;
      outputScale.sx *= invScale;
      outputScale.sy *= invScale;
      this.#hasRestrictedScaling = true;
    ***REMOVED*** else if (this.maxCanvasPixels > 0***REMOVED*** {
      const pixelsInViewport = width * height;
      const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport***REMOVED***;
      if (outputScale.sx > maxScale || outputScale.sy > maxScale***REMOVED*** {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        this.#hasRestrictedScaling = true;
      ***REMOVED*** else {
        this.#hasRestrictedScaling = false;
      ***REMOVED***
    ***REMOVED***
    const sfx = approximateFraction(outputScale.sx***REMOVED***;
    const sfy = approximateFraction(outputScale.sy***REMOVED***;
    const canvasWidth = canvas.width = floorToDivide(calcRound(width * outputScale.sx***REMOVED***, sfx[0]***REMOVED***;
    const canvasHeight = canvas.height = floorToDivide(calcRound(height * outputScale.sy***REMOVED***, sfy[0]***REMOVED***;
    const pageWidth = floorToDivide(calcRound(width***REMOVED***, sfx[1]***REMOVED***;
    const pageHeight = floorToDivide(calcRound(height***REMOVED***, sfy[1]***REMOVED***;
    outputScale.sx = canvasWidth / pageWidth;
    outputScale.sy = canvasHeight / pageHeight;
    if (this.#scaleRoundX !== sfx[1]***REMOVED*** {
      div.style.setProperty("--scale-round-x", `${sfx[1]***REMOVED***px`***REMOVED***;
      this.#scaleRoundX = sfx[1];
    ***REMOVED***
    if (this.#scaleRoundY !== sfy[1]***REMOVED*** {
      div.style.setProperty("--scale-round-y", `${sfy[1]***REMOVED***px`***REMOVED***;
      this.#scaleRoundY = sfy[1];
    ***REMOVED***
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport,
      annotationMode: this.#annotationMode,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      annotationCanvasMap: this._annotationCanvasMap,
      pageColors,
      isEditing: this.#isEditing
    ***REMOVED***;
    const renderTask = this.renderTask = pdfPage.render(renderContext***REMOVED***;
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(async (***REMOVED*** => {
      showCanvas?.(true***REMOVED***;
      await this.#finishRenderTask(renderTask***REMOVED***;
      this.structTreeLayer ||= new StructTreeLayerBuilder(pdfPage, viewport.rawDims***REMOVED***;
      this.#renderTextLayer(***REMOVED***;
      if (this.annotationLayer***REMOVED*** {
        await this.#renderAnnotationLayer(***REMOVED***;
      ***REMOVED***
      const {
        annotationEditorUIManager
      ***REMOVED*** = this.#layerProperties;
      if (!annotationEditorUIManager***REMOVED*** {
        return;
      ***REMOVED***
      this.drawLayer ||= new DrawLayerBuilder({
        pageIndex: this.id
      ***REMOVED******REMOVED***;
      await this.#renderDrawLayer(***REMOVED***;
      this.drawLayer.setParent(canvasWrapper***REMOVED***;
      this.annotationEditorLayer ||= new AnnotationEditorLayerBuilder({
        uiManager: annotationEditorUIManager,
        pdfPage,
        l10n,
        structTreeLayer: this.structTreeLayer,
        accessibilityManager: this._accessibilityManager,
        annotationLayer: this.annotationLayer?.annotationLayer,
        textLayer: this.textLayer,
        drawLayer: this.drawLayer.getDrawLayer(***REMOVED***,
        onAppend: annotationEditorLayerDiv => {
          this.#addLayer(annotationEditorLayerDiv, "annotationEditorLayer"***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
      this.#renderAnnotationEditorLayer(***REMOVED***;
    ***REMOVED***, error => {
      if (!(error instanceof RenderingCancelledException***REMOVED******REMOVED*** {
        showCanvas?.(true***REMOVED***;
      ***REMOVED*** else {
        prevCanvas?.remove(***REMOVED***;
        this.#resetCanvas(***REMOVED***;
      ***REMOVED***
      return this.#finishRenderTask(renderTask, error***REMOVED***;
    ***REMOVED******REMOVED***;
    if (pdfPage.isPureXfa***REMOVED*** {
      if (!this.xfaLayer***REMOVED*** {
        const {
          annotationStorage,
          linkService
        ***REMOVED*** = this.#layerProperties;
        this.xfaLayer = new XfaLayerBuilder({
          pdfPage,
          annotationStorage,
          linkService
        ***REMOVED******REMOVED***;
      ***REMOVED***
      this.#renderXfaLayer(***REMOVED***;
    ***REMOVED***
    div.setAttribute("data-loaded", true***REMOVED***;
    this.eventBus.dispatch("pagerender", {
      source: this,
      pageNumber: this.id
    ***REMOVED******REMOVED***;
    return resultPromise;
  ***REMOVED***
  setPageLabel(label***REMOVED*** {
    this.pageLabel = typeof label === "string" ? label : null;
    this.div.setAttribute("data-l10n-args", JSON.stringify({
      page: this.pageLabel ?? this.id
    ***REMOVED******REMOVED******REMOVED***;
    if (this.pageLabel !== null***REMOVED*** {
      this.div.setAttribute("data-page-label", this.pageLabel***REMOVED***;
    ***REMOVED*** else {
      this.div.removeAttribute("data-page-label"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get thumbnailCanvas(***REMOVED*** {
    const {
      directDrawing,
      initialOptionalContent,
      regularAnnotations
    ***REMOVED*** = this.#useThumbnailCanvas;
    return directDrawing && initialOptionalContent && regularAnnotations ? this.canvas : null;
  ***REMOVED***
***REMOVED***

;// ./web/pdf_viewer.js






const DEFAULT_CACHE_SIZE = 10;
const PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 10000,
  FORCE_LAZY_PAGE_INIT: 5000,
  PAUSE_EAGER_PAGE_INIT: 250
***REMOVED***;
function isValidAnnotationEditorMode(mode***REMOVED*** {
  return Object.values(AnnotationEditorType***REMOVED***.includes(mode***REMOVED*** && mode !== AnnotationEditorType.DISABLE;
***REMOVED***
class PDFPageViewBuffer {
  #buf = new Set(***REMOVED***;
  #size = 0;
  constructor(size***REMOVED*** {
    this.#size = size;
  ***REMOVED***
  push(view***REMOVED*** {
    const buf = this.#buf;
    if (buf.has(view***REMOVED******REMOVED*** {
      buf.delete(view***REMOVED***;
    ***REMOVED***
    buf.add(view***REMOVED***;
    if (buf.size > this.#size***REMOVED*** {
      this.#destroyFirstView(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  resize(newSize, idsToKeep = null***REMOVED*** {
    this.#size = newSize;
    const buf = this.#buf;
    if (idsToKeep***REMOVED*** {
      const ii = buf.size;
      let i = 1;
      for (const view of buf***REMOVED*** {
        if (idsToKeep.has(view.id***REMOVED******REMOVED*** {
          buf.delete(view***REMOVED***;
          buf.add(view***REMOVED***;
        ***REMOVED***
        if (++i > ii***REMOVED*** {
          break;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    while (buf.size > this.#size***REMOVED*** {
      this.#destroyFirstView(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  has(view***REMOVED*** {
    return this.#buf.has(view***REMOVED***;
  ***REMOVED***
  [Symbol.iterator](***REMOVED*** {
    return this.#buf.keys(***REMOVED***;
  ***REMOVED***
  #destroyFirstView(***REMOVED*** {
    const firstView = this.#buf.keys(***REMOVED***.next(***REMOVED***.value;
    firstView?.destroy(***REMOVED***;
    this.#buf.delete(firstView***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFViewer {
  #buffer = null;
  #altTextManager = null;
  #annotationEditorHighlightColors = null;
  #annotationEditorMode = AnnotationEditorType.NONE;
  #annotationEditorUIManager = null;
  #annotationMode = AnnotationMode.ENABLE_FORMS;
  #containerTopLeft = null;
  #editorUndoBar = null;
  #enableHWA = false;
  #enableHighlightFloatingButton = false;
  #enablePermissions = false;
  #enableUpdatedAddImage = false;
  #enableNewAltTextWhenAddingImage = false;
  #eventAbortController = null;
  #mlManager = null;
  #switchAnnotationEditorModeAC = null;
  #switchAnnotationEditorModeTimeoutId = null;
  #getAllTextInProgress = false;
  #hiddenCopyElement = null;
  #interruptCopyCondition = false;
  #previousContainerHeight = 0;
  #resizeObserver = new ResizeObserver(this.#resizeObserverCallback.bind(this***REMOVED******REMOVED***;
  #scrollModePageState = null;
  #scaleTimeoutId = null;
  #supportsPinchToZoom = true;
  #textLayerMode = TextLayerMode.ENABLE;
  constructor(options***REMOVED*** {
    const viewerVersion = "4.10.38";
    if (version !== viewerVersion***REMOVED*** {
      throw new Error(`The API version "${version***REMOVED***" does not match the Viewer version "${viewerVersion***REMOVED***".`***REMOVED***;
    ***REMOVED***
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    if (this.container?.tagName !== "DIV" || this.viewer?.tagName !== "DIV"***REMOVED*** {
      throw new Error("Invalid `container` and/or `viewer` option."***REMOVED***;
    ***REMOVED***
    if (this.container.offsetParent && getComputedStyle(this.container***REMOVED***.position !== "absolute"***REMOVED*** {
      throw new Error("The `container` must be absolutely positioned."***REMOVED***;
    ***REMOVED***
    this.#resizeObserver.observe(this.container***REMOVED***;
    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new SimpleLinkService(***REMOVED***;
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this.#altTextManager = options.altTextManager || null;
    this.#editorUndoBar = options.editorUndoBar || null;
    if (this.findController***REMOVED*** {
      this.findController.onIsPageVisible = pageNumber => this._getVisiblePages(***REMOVED***.ids.has(pageNumber***REMOVED***;
    ***REMOVED***
    this._scriptingManager = options.scriptingManager || null;
    this.#textLayerMode = options.textLayerMode ?? TextLayerMode.ENABLE;
    this.#annotationMode = options.annotationMode ?? AnnotationMode.ENABLE_FORMS;
    this.#annotationEditorMode = options.annotationEditorMode ?? AnnotationEditorType.NONE;
    this.#annotationEditorHighlightColors = options.annotationEditorHighlightColors || null;
    this.#enableHighlightFloatingButton = options.enableHighlightFloatingButton === true;
    this.#enableUpdatedAddImage = options.enableUpdatedAddImage === true;
    this.#enableNewAltTextWhenAddingImage = options.enableNewAltTextWhenAddingImage === true;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.removePageBorders = options.removePageBorders || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n;
    this.l10n ||= new genericl10n_GenericL10n(***REMOVED***;
    this.#enablePermissions = options.enablePermissions || false;
    this.pageColors = options.pageColors || null;
    this.#mlManager = options.mlManager || null;
    this.#enableHWA = options.enableHWA || false;
    this.#supportsPinchToZoom = options.supportsPinchToZoom !== false;
    this.defaultRenderingQueue = !options.renderingQueue;
    if (this.defaultRenderingQueue***REMOVED*** {
      this.renderingQueue = new PDFRenderingQueue(***REMOVED***;
      this.renderingQueue.setViewer(this***REMOVED***;
    ***REMOVED*** else {
      this.renderingQueue = options.renderingQueue;
    ***REMOVED***
    const {
      abortSignal
    ***REMOVED*** = options;
    abortSignal?.addEventListener("abort", (***REMOVED*** => {
      this.#resizeObserver.disconnect(***REMOVED***;
      this.#resizeObserver = null;
    ***REMOVED***, {
      once: true
    ***REMOVED******REMOVED***;
    this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this***REMOVED***, abortSignal***REMOVED***;
    this.presentationModeState = PresentationModeState.UNKNOWN;
    this._resetView(***REMOVED***;
    if (this.removePageBorders***REMOVED*** {
      this.viewer.classList.add("removePageBorders"***REMOVED***;
    ***REMOVED***
    this.#updateContainerHeightCss(***REMOVED***;
    this.eventBus._on("thumbnailrendered", ({
      pageNumber,
      pdfPage
    ***REMOVED******REMOVED*** => {
      const pageView = this._pages[pageNumber - 1];
      if (!this.#buffer.has(pageView***REMOVED******REMOVED*** {
        pdfPage?.cleanup(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    if (!options.l10n***REMOVED*** {
      this.l10n.translate(this.container***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get pagesCount(***REMOVED*** {
    return this._pages.length;
  ***REMOVED***
  getPageView(index***REMOVED*** {
    return this._pages[index];
  ***REMOVED***
  getCachedPageViews(***REMOVED*** {
    return new Set(this.#buffer***REMOVED***;
  ***REMOVED***
  get pageViewsReady(***REMOVED*** {
    return this._pages.every(pageView => pageView?.pdfPage***REMOVED***;
  ***REMOVED***
  get renderForms(***REMOVED*** {
    return this.#annotationMode === AnnotationMode.ENABLE_FORMS;
  ***REMOVED***
  get enableScripting(***REMOVED*** {
    return !!this._scriptingManager;
  ***REMOVED***
  get currentPageNumber(***REMOVED*** {
    return this._currentPageNumber;
  ***REMOVED***
  set currentPageNumber(val***REMOVED*** {
    if (!Number.isInteger(val***REMOVED******REMOVED*** {
      throw new Error("Invalid page number."***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (!this._setCurrentPageNumber(val, true***REMOVED******REMOVED*** {
      console.error(`currentPageNumber: "${val***REMOVED***" is not a valid page.`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _setCurrentPageNumber(val, resetCurrentPageView = false***REMOVED*** {
    if (this._currentPageNumber === val***REMOVED*** {
      if (resetCurrentPageView***REMOVED*** {
        this.#resetCurrentPageView(***REMOVED***;
      ***REMOVED***
      return true;
    ***REMOVED***
    if (!(0 < val && val <= this.pagesCount***REMOVED******REMOVED*** {
      return false;
    ***REMOVED***
    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: val,
      pageLabel: this._pageLabels?.[val - 1] ?? null,
      previous
    ***REMOVED******REMOVED***;
    if (resetCurrentPageView***REMOVED*** {
      this.#resetCurrentPageView(***REMOVED***;
    ***REMOVED***
    return true;
  ***REMOVED***
  get currentPageLabel(***REMOVED*** {
    return this._pageLabels?.[this._currentPageNumber - 1] ?? null;
  ***REMOVED***
  set currentPageLabel(val***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    let page = val | 0;
    if (this._pageLabels***REMOVED*** {
      const i = this._pageLabels.indexOf(val***REMOVED***;
      if (i >= 0***REMOVED*** {
        page = i + 1;
      ***REMOVED***
    ***REMOVED***
    if (!this._setCurrentPageNumber(page, true***REMOVED******REMOVED*** {
      console.error(`currentPageLabel: "${val***REMOVED***" is not a valid page.`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get currentScale(***REMOVED*** {
    return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
  ***REMOVED***
  set currentScale(val***REMOVED*** {
    if (isNaN(val***REMOVED******REMOVED*** {
      throw new Error("Invalid numeric scale."***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this.#setScale(val, {
      noScroll: false
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get currentScaleValue(***REMOVED*** {
    return this._currentScaleValue;
  ***REMOVED***
  set currentScaleValue(val***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this.#setScale(val, {
      noScroll: false
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get pagesRotation(***REMOVED*** {
    return this._pagesRotation;
  ***REMOVED***
  set pagesRotation(rotation***REMOVED*** {
    if (!isValidRotation(rotation***REMOVED******REMOVED*** {
      throw new Error("Invalid pages rotation angle."***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    rotation %= 360;
    if (rotation < 0***REMOVED*** {
      rotation += 360;
    ***REMOVED***
    if (this._pagesRotation === rotation***REMOVED*** {
      return;
    ***REMOVED***
    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;
    this.refresh(true, {
      rotation
    ***REMOVED******REMOVED***;
    if (this._currentScaleValue***REMOVED*** {
      this.#setScale(this._currentScaleValue, {
        noScroll: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: rotation,
      pageNumber
    ***REMOVED******REMOVED***;
    if (this.defaultRenderingQueue***REMOVED*** {
      this.update(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get firstPagePromise(***REMOVED*** {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  ***REMOVED***
  get onePageRendered(***REMOVED*** {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  ***REMOVED***
  get pagesPromise(***REMOVED*** {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  ***REMOVED***
  get _layerProperties(***REMOVED*** {
    const self = this;
    return shadow(this, "_layerProperties", {
      get annotationEditorUIManager(***REMOVED*** {
        return self.#annotationEditorUIManager;
      ***REMOVED***,
      get annotationStorage(***REMOVED*** {
        return self.pdfDocument?.annotationStorage;
      ***REMOVED***,
      get downloadManager(***REMOVED*** {
        return self.downloadManager;
      ***REMOVED***,
      get enableScripting(***REMOVED*** {
        return !!self._scriptingManager;
      ***REMOVED***,
      get fieldObjectsPromise(***REMOVED*** {
        return self.pdfDocument?.getFieldObjects(***REMOVED***;
      ***REMOVED***,
      get findController(***REMOVED*** {
        return self.findController;
      ***REMOVED***,
      get hasJSActionsPromise(***REMOVED*** {
        return self.pdfDocument?.hasJSActions(***REMOVED***;
      ***REMOVED***,
      get linkService(***REMOVED*** {
        return self.linkService;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #initializePermissions(permissions***REMOVED*** {
    const params = {
      annotationEditorMode: this.#annotationEditorMode,
      annotationMode: this.#annotationMode,
      textLayerMode: this.#textLayerMode
    ***REMOVED***;
    if (!permissions***REMOVED*** {
      return params;
    ***REMOVED***
    if (!permissions.includes(PermissionFlag.COPY***REMOVED*** && this.#textLayerMode === TextLayerMode.ENABLE***REMOVED*** {
      params.textLayerMode = TextLayerMode.ENABLE_PERMISSIONS;
    ***REMOVED***
    if (!permissions.includes(PermissionFlag.MODIFY_CONTENTS***REMOVED******REMOVED*** {
      params.annotationEditorMode = AnnotationEditorType.DISABLE;
    ***REMOVED***
    if (!permissions.includes(PermissionFlag.MODIFY_ANNOTATIONS***REMOVED*** && !permissions.includes(PermissionFlag.FILL_INTERACTIVE_FORMS***REMOVED*** && this.#annotationMode === AnnotationMode.ENABLE_FORMS***REMOVED*** {
      params.annotationMode = AnnotationMode.ENABLE;
    ***REMOVED***
    return params;
  ***REMOVED***
  async #onePageRenderedOrForceFetch(signal***REMOVED*** {
    if (document.visibilityState === "hidden" || !this.container.offsetParent || this._getVisiblePages(***REMOVED***.views.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    const hiddenCapability = Promise.withResolvers(***REMOVED***,
      ac = new AbortController(***REMOVED***;
    document.addEventListener("visibilitychange", (***REMOVED*** => {
      if (document.visibilityState === "hidden"***REMOVED*** {
        hiddenCapability.resolve(***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal: typeof AbortSignal.any === "function" ? AbortSignal.any([signal, ac.signal]***REMOVED*** : signal
    ***REMOVED******REMOVED***;
    await Promise.race([this._onePageRenderedCapability.promise, hiddenCapability.promise]***REMOVED***;
    ac.abort(***REMOVED***;
  ***REMOVED***
  async getAllText(***REMOVED*** {
    const texts = [];
    const buffer = [];
    for (let pageNum = 1, pagesCount = this.pdfDocument.numPages; pageNum <= pagesCount; ++pageNum***REMOVED*** {
      if (this.#interruptCopyCondition***REMOVED*** {
        return null;
      ***REMOVED***
      buffer.length = 0;
      const page = await this.pdfDocument.getPage(pageNum***REMOVED***;
      const {
        items
      ***REMOVED*** = await page.getTextContent(***REMOVED***;
      for (const item of items***REMOVED*** {
        if (item.str***REMOVED*** {
          buffer.push(item.str***REMOVED***;
        ***REMOVED***
        if (item.hasEOL***REMOVED*** {
          buffer.push("\n"***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      texts.push(removeNullCharacters(buffer.join(""***REMOVED******REMOVED******REMOVED***;
    ***REMOVED***
    return texts.join("\n"***REMOVED***;
  ***REMOVED***
  #copyCallback(textLayerMode, event***REMOVED*** {
    const selection = document.getSelection(***REMOVED***;
    const {
      focusNode,
      anchorNode
    ***REMOVED*** = selection;
    if (anchorNode && focusNode && selection.containsNode(this.#hiddenCopyElement***REMOVED******REMOVED*** {
      if (this.#getAllTextInProgress || textLayerMode === TextLayerMode.ENABLE_PERMISSIONS***REMOVED*** {
        stopEvent(event***REMOVED***;
        return;
      ***REMOVED***
      this.#getAllTextInProgress = true;
      const {
        classList
      ***REMOVED*** = this.viewer;
      classList.add("copyAll"***REMOVED***;
      const ac = new AbortController(***REMOVED***;
      window.addEventListener("keydown", ev => this.#interruptCopyCondition = ev.key === "Escape", {
        signal: ac.signal
      ***REMOVED******REMOVED***;
      this.getAllText(***REMOVED***.then(async text => {
        if (text !== null***REMOVED*** {
          await navigator.clipboard.writeText(text***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***.catch(reason => {
        console.warn(`Something goes wrong when extracting the text: ${reason.message***REMOVED***`***REMOVED***;
      ***REMOVED******REMOVED***.finally((***REMOVED*** => {
        this.#getAllTextInProgress = false;
        this.#interruptCopyCondition = false;
        ac.abort(***REMOVED***;
        classList.remove("copyAll"***REMOVED***;
      ***REMOVED******REMOVED***;
      stopEvent(event***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setDocument(pdfDocument***REMOVED*** {
    if (this.pdfDocument***REMOVED*** {
      this.eventBus.dispatch("pagesdestroy", {
        source: this
      ***REMOVED******REMOVED***;
      this._cancelRendering(***REMOVED***;
      this._resetView(***REMOVED***;
      this.findController?.setDocument(null***REMOVED***;
      this._scriptingManager?.setDocument(null***REMOVED***;
      this.#annotationEditorUIManager?.destroy(***REMOVED***;
      this.#annotationEditorUIManager = null;
    ***REMOVED***
    this.pdfDocument = pdfDocument;
    if (!pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1***REMOVED***;
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig({
      intent: "display"
    ***REMOVED******REMOVED***;
    const permissionsPromise = this.#enablePermissions ? pdfDocument.getPermissions(***REMOVED*** : Promise.resolve(***REMOVED***;
    const {
      eventBus,
      pageColors,
      viewer
    ***REMOVED*** = this;
    this.#eventAbortController = new AbortController(***REMOVED***;
    const {
      signal
    ***REMOVED*** = this.#eventAbortController;
    if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE***REMOVED*** {
      console.warn("Forcing PAGE-scrolling for performance reasons, given the length of the document."***REMOVED***;
      const mode = this._scrollMode = ScrollMode.PAGE;
      eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._pagesCapability.promise.then((***REMOVED*** => {
      eventBus.dispatch("pagesloaded", {
        source: this,
        pagesCount
      ***REMOVED******REMOVED***;
    ***REMOVED***, (***REMOVED*** => { ***REMOVED******REMOVED***;
    const onBeforeDraw = evt => {
      const pageView = this._pages[evt.pageNumber - 1];
      if (!pageView***REMOVED*** {
        return;
      ***REMOVED***
      this.#buffer.push(pageView***REMOVED***;
    ***REMOVED***;
    eventBus._on("pagerender", onBeforeDraw, {
      signal
    ***REMOVED******REMOVED***;
    const onAfterDraw = evt => {
      if (evt.cssTransform***REMOVED*** {
        return;
      ***REMOVED***
      this._onePageRenderedCapability.resolve({
        timestamp: evt.timestamp
      ***REMOVED******REMOVED***;
      eventBus._off("pagerendered", onAfterDraw***REMOVED***;
    ***REMOVED***;
    eventBus._on("pagerendered", onAfterDraw, {
      signal
    ***REMOVED******REMOVED***;
    Promise.all([firstPagePromise, permissionsPromise]***REMOVED***.then(([firstPdfPage, permissions]***REMOVED*** => {
      if (pdfDocument !== this.pdfDocument***REMOVED*** {
        return;
      ***REMOVED***
      this._firstPageCapability.resolve(firstPdfPage***REMOVED***;
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const {
        annotationEditorMode,
        annotationMode,
        textLayerMode
      ***REMOVED*** = this.#initializePermissions(permissions***REMOVED***;
      if (textLayerMode !== TextLayerMode.DISABLE***REMOVED*** {
        const element = this.#hiddenCopyElement = document.createElement("div"***REMOVED***;
        element.id = "hiddenCopyElement";
        viewer.before(element***REMOVED***;
      ***REMOVED***
      if (typeof AbortSignal.any === "function" && annotationEditorMode !== AnnotationEditorType.DISABLE***REMOVED*** {
        const mode = annotationEditorMode;
        if (pdfDocument.isPureXfa***REMOVED*** {
          console.warn("Warning: XFA-editing is not implemented."***REMOVED***;
        ***REMOVED*** else if (isValidAnnotationEditorMode(mode***REMOVED******REMOVED*** {
          this.#annotationEditorUIManager = new AnnotationEditorUIManager(this.container, viewer, this.#altTextManager, eventBus, pdfDocument, pageColors, this.#annotationEditorHighlightColors, this.#enableHighlightFloatingButton, this.#enableUpdatedAddImage, this.#enableNewAltTextWhenAddingImage, this.#mlManager, this.#editorUndoBar, this.#supportsPinchToZoom***REMOVED***;
          eventBus.dispatch("annotationeditoruimanager", {
            source: this,
            uiManager: this.#annotationEditorUIManager
          ***REMOVED******REMOVED***;
          if (mode !== AnnotationEditorType.NONE***REMOVED*** {
            if (mode === AnnotationEditorType.STAMP***REMOVED*** {
              this.#mlManager?.loadModel("altText"***REMOVED***;
            ***REMOVED***
            this.#annotationEditorUIManager.updateMode(mode***REMOVED***;
          ***REMOVED***
        ***REMOVED*** else {
          console.error(`Invalid AnnotationEditor mode: ${mode***REMOVED***`***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      const viewerElement = this._scrollMode === ScrollMode.PAGE ? null : viewer;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * PixelsPerInch.PDF_TO_CSS_UNITS
      ***REMOVED******REMOVED***;
      viewer.style.setProperty("--scale-factor", viewport.scale***REMOVED***;
      if (pageColors?.background***REMOVED*** {
        viewer.style.setProperty("--page-bg-color", pageColors.background***REMOVED***;
      ***REMOVED***
      if (pageColors?.foreground === "CanvasText" || pageColors?.background === "Canvas"***REMOVED*** {
        viewer.style.setProperty("--hcm-highlight-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight", "CanvasText", "Canvas", "HighlightText", "Highlight"***REMOVED******REMOVED***;
        viewer.style.setProperty("--hcm-highlight-selected-filter", pdfDocument.filterFactory.addHighlightHCMFilter("highlight_selected", "CanvasText", "Canvas", "HighlightText", "ButtonText"***REMOVED******REMOVED***;
      ***REMOVED***
      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum***REMOVED*** {
        const pageView = new PDFPageView({
          container: viewerElement,
          eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(***REMOVED***,
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerMode,
          annotationMode,
          imageResourcesPath: this.imageResourcesPath,
          maxCanvasPixels: this.maxCanvasPixels,
          pageColors,
          l10n: this.l10n,
          layerProperties: this._layerProperties,
          enableHWA: this.#enableHWA
        ***REMOVED******REMOVED***;
        this._pages.push(pageView***REMOVED***;
      ***REMOVED***
      this._pages[0]?.setPdfPage(firstPdfPage***REMOVED***;
      if (this._scrollMode === ScrollMode.PAGE***REMOVED*** {
        this.#ensurePageViewVisible(***REMOVED***;
      ***REMOVED*** else if (this._spreadMode !== SpreadMode.NONE***REMOVED*** {
        this._updateSpreadMode(***REMOVED***;
      ***REMOVED***
      this.#onePageRenderedOrForceFetch(signal***REMOVED***.then(async (***REMOVED*** => {
        if (pdfDocument !== this.pdfDocument***REMOVED*** {
          return;
        ***REMOVED***
        this.findController?.setDocument(pdfDocument***REMOVED***;
        this._scriptingManager?.setDocument(pdfDocument***REMOVED***;
        if (this.#hiddenCopyElement***REMOVED*** {
          document.addEventListener("copy", this.#copyCallback.bind(this, textLayerMode***REMOVED***, {
            signal
          ***REMOVED******REMOVED***;
        ***REMOVED***
        if (this.#annotationEditorUIManager***REMOVED*** {
          eventBus.dispatch("annotationeditormodechanged", {
            source: this,
            mode: this.#annotationEditorMode
          ***REMOVED******REMOVED***;
        ***REMOVED***
        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT***REMOVED*** {
          this._pagesCapability.resolve(***REMOVED***;
          return;
        ***REMOVED***
        let getPagesLeft = pagesCount - 1;
        if (getPagesLeft <= 0***REMOVED*** {
          this._pagesCapability.resolve(***REMOVED***;
          return;
        ***REMOVED***
        for (let pageNum = 2; pageNum <= pagesCount; ++pageNum***REMOVED*** {
          const promise = pdfDocument.getPage(pageNum***REMOVED***.then(pdfPage => {
            const pageView = this._pages[pageNum - 1];
            if (!pageView.pdfPage***REMOVED*** {
              pageView.setPdfPage(pdfPage***REMOVED***;
            ***REMOVED***
            if (--getPagesLeft === 0***REMOVED*** {
              this._pagesCapability.resolve(***REMOVED***;
            ***REMOVED***
          ***REMOVED***, reason => {
            console.error(`Unable to get page ${pageNum***REMOVED*** to initialize viewer`, reason***REMOVED***;
            if (--getPagesLeft === 0***REMOVED*** {
              this._pagesCapability.resolve(***REMOVED***;
            ***REMOVED***
          ***REMOVED******REMOVED***;
          if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0***REMOVED*** {
            await promise;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
      eventBus.dispatch("pagesinit", {
        source: this
      ***REMOVED******REMOVED***;
      pdfDocument.getMetadata(***REMOVED***.then(({
        info
      ***REMOVED******REMOVED*** => {
        if (pdfDocument !== this.pdfDocument***REMOVED*** {
          return;
        ***REMOVED***
        if (info.Language***REMOVED*** {
          viewer.lang = info.Language;
        ***REMOVED***
      ***REMOVED******REMOVED***;
      if (this.defaultRenderingQueue***REMOVED*** {
        this.update(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***.catch(reason => {
      console.error("Unable to initialize viewer", reason***REMOVED***;
      this._pagesCapability.reject(reason***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setPageLabels(labels***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (!labels***REMOVED*** {
      this._pageLabels = null;
    ***REMOVED*** else if (!(Array.isArray(labels***REMOVED*** && this.pdfDocument.numPages === labels.length***REMOVED******REMOVED*** {
      this._pageLabels = null;
      console.error(`setPageLabels: Invalid page labels.`***REMOVED***;
    ***REMOVED*** else {
      this._pageLabels = labels;
    ***REMOVED***
    for (let i = 0, ii = this._pages.length; i < ii; i++***REMOVED*** {
      this._pages[i].setPageLabel(this._pageLabels?.[i] ?? null***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _resetView(***REMOVED*** {
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    this.#buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE***REMOVED***;
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._firstPageCapability = Promise.withResolvers(***REMOVED***;
    this._onePageRenderedCapability = Promise.withResolvers(***REMOVED***;
    this._pagesCapability = Promise.withResolvers(***REMOVED***;
    this._scrollMode = ScrollMode.VERTICAL;
    this._previousScrollMode = ScrollMode.UNKNOWN;
    this._spreadMode = SpreadMode.NONE;
    this.#scrollModePageState = {
      previousPageNumber: 1,
      scrollDown: true,
      pages: []
    ***REMOVED***;
    this.#eventAbortController?.abort(***REMOVED***;
    this.#eventAbortController = null;
    this.viewer.textContent = "";
    this._updateScrollMode(***REMOVED***;
    this.viewer.removeAttribute("lang"***REMOVED***;
    this.#hiddenCopyElement?.remove(***REMOVED***;
    this.#hiddenCopyElement = null;
    this.#cleanupSwitchAnnotationEditorMode(***REMOVED***;
  ***REMOVED***
  #ensurePageViewVisible(***REMOVED*** {
    if (this._scrollMode !== ScrollMode.PAGE***REMOVED*** {
      throw new Error("#ensurePageViewVisible: Invalid scrollMode value."***REMOVED***;
    ***REMOVED***
    const pageNumber = this._currentPageNumber,
      state = this.#scrollModePageState,
      viewer = this.viewer;
    viewer.textContent = "";
    state.pages.length = 0;
    if (this._spreadMode === SpreadMode.NONE && !this.isInPresentationMode***REMOVED*** {
      const pageView = this._pages[pageNumber - 1];
      viewer.append(pageView.div***REMOVED***;
      state.pages.push(pageView***REMOVED***;
    ***REMOVED*** else {
      const pageIndexSet = new Set(***REMOVED***,
        parity = this._spreadMode - 1;
      if (parity === -1***REMOVED*** {
        pageIndexSet.add(pageNumber - 1***REMOVED***;
      ***REMOVED*** else if (pageNumber % 2 !== parity***REMOVED*** {
        pageIndexSet.add(pageNumber - 1***REMOVED***;
        pageIndexSet.add(pageNumber***REMOVED***;
      ***REMOVED*** else {
        pageIndexSet.add(pageNumber - 2***REMOVED***;
        pageIndexSet.add(pageNumber - 1***REMOVED***;
      ***REMOVED***
      const spread = document.createElement("div"***REMOVED***;
      spread.className = "spread";
      if (this.isInPresentationMode***REMOVED*** {
        const dummyPage = document.createElement("div"***REMOVED***;
        dummyPage.className = "dummyPage";
        spread.append(dummyPage***REMOVED***;
      ***REMOVED***
      for (const i of pageIndexSet***REMOVED*** {
        const pageView = this._pages[i];
        if (!pageView***REMOVED*** {
          continue;
        ***REMOVED***
        spread.append(pageView.div***REMOVED***;
        state.pages.push(pageView***REMOVED***;
      ***REMOVED***
      viewer.append(spread***REMOVED***;
    ***REMOVED***
    state.scrollDown = pageNumber >= state.previousPageNumber;
    state.previousPageNumber = pageNumber;
  ***REMOVED***
  _scrollUpdate(***REMOVED*** {
    if (this.pagesCount === 0***REMOVED*** {
      return;
    ***REMOVED***
    this.update(***REMOVED***;
  ***REMOVED***
  #scrollIntoView(pageView, pageSpot = null***REMOVED*** {
    const {
      div,
      id
    ***REMOVED*** = pageView;
    if (this._currentPageNumber !== id***REMOVED*** {
      this._setCurrentPageNumber(id***REMOVED***;
    ***REMOVED***
    if (this._scrollMode === ScrollMode.PAGE***REMOVED*** {
      this.#ensurePageViewVisible(***REMOVED***;
      this.update(***REMOVED***;
    ***REMOVED***
    if (!pageSpot && !this.isInPresentationMode***REMOVED*** {
      const left = div.offsetLeft + div.clientLeft,
        right = left + div.clientWidth;
      const {
        scrollLeft,
        clientWidth
      ***REMOVED*** = this.container;
      if (this._scrollMode === ScrollMode.HORIZONTAL || left < scrollLeft || right > scrollLeft + clientWidth***REMOVED*** {
        pageSpot = {
          left: 0,
          top: 0
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    scrollIntoView(div, pageSpot***REMOVED***;
    if (!this._currentScaleValue && this._location***REMOVED*** {
      this._location = null;
    ***REMOVED***
  ***REMOVED***
  #isSameScale(newScale***REMOVED*** {
    return newScale === this._currentScale || Math.abs(newScale - this._currentScale***REMOVED*** < 1e-15;
  ***REMOVED***
  #setScaleUpdatePages(newScale, newValue, {
    noScroll = false,
    preset = false,
    drawingDelay = -1,
    origin = null
  ***REMOVED******REMOVED*** {
    this._currentScaleValue = newValue.toString(***REMOVED***;
    if (this.#isSameScale(newScale***REMOVED******REMOVED*** {
      if (preset***REMOVED*** {
        this.eventBus.dispatch("scalechanging", {
          source: this,
          scale: newScale,
          presetValue: newValue
        ***REMOVED******REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    this.viewer.style.setProperty("--scale-factor", newScale * PixelsPerInch.PDF_TO_CSS_UNITS***REMOVED***;
    const postponeDrawing = drawingDelay >= 0 && drawingDelay < 1000;
    this.refresh(true, {
      scale: newScale,
      drawingDelay: postponeDrawing ? drawingDelay : -1
    ***REMOVED******REMOVED***;
    if (postponeDrawing***REMOVED*** {
      this.#scaleTimeoutId = setTimeout((***REMOVED*** => {
        this.#scaleTimeoutId = null;
        this.refresh(***REMOVED***;
      ***REMOVED***, drawingDelay***REMOVED***;
    ***REMOVED***
    const previousScale = this._currentScale;
    this._currentScale = newScale;
    if (!noScroll***REMOVED*** {
      let page = this._currentPageNumber,
        dest;
      if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode***REMOVED******REMOVED*** {
        page = this._location.pageNumber;
        dest = [null, {
          name: "XYZ"
        ***REMOVED***, this._location.left, this._location.top, null];
      ***REMOVED***
      this.scrollPageIntoView({
        pageNumber: page,
        destArray: dest,
        allowNegativeOffset: true
      ***REMOVED******REMOVED***;
      if (Array.isArray(origin***REMOVED******REMOVED*** {
        const scaleDiff = newScale / previousScale - 1;
        const [top, left] = this.containerTopLeft;
        this.container.scrollLeft += (origin[0] - left***REMOVED*** * scaleDiff;
        this.container.scrollTop += (origin[1] - top***REMOVED*** * scaleDiff;
      ***REMOVED***
    ***REMOVED***
    this.eventBus.dispatch("scalechanging", {
      source: this,
      scale: newScale,
      presetValue: preset ? newValue : undefined
    ***REMOVED******REMOVED***;
    if (this.defaultRenderingQueue***REMOVED*** {
      this.update(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get #pageWidthScaleFactor(***REMOVED*** {
    if (this._spreadMode !== SpreadMode.NONE && this._scrollMode !== ScrollMode.HORIZONTAL***REMOVED*** {
      return 2;
    ***REMOVED***
    return 1;
  ***REMOVED***
  #setScale(value, options***REMOVED*** {
    let scale = parseFloat(value***REMOVED***;
    if (scale > 0***REMOVED*** {
      options.preset = false;
      this.#setScaleUpdatePages(scale, value, options***REMOVED***;
    ***REMOVED*** else {
      const currentPage = this._pages[this._currentPageNumber - 1];
      if (!currentPage***REMOVED*** {
        return;
      ***REMOVED***
      let hPadding = SCROLLBAR_PADDING,
        vPadding = VERTICAL_PADDING;
      if (this.isInPresentationMode***REMOVED*** {
        hPadding = vPadding = 4;
        if (this._spreadMode !== SpreadMode.NONE***REMOVED*** {
          hPadding *= 2;
        ***REMOVED***
      ***REMOVED*** else if (this.removePageBorders***REMOVED*** {
        hPadding = vPadding = 0;
      ***REMOVED*** else if (this._scrollMode === ScrollMode.HORIZONTAL***REMOVED*** {
        [hPadding, vPadding] = [vPadding, hPadding];
      ***REMOVED***
      const pageWidthScale = (this.container.clientWidth - hPadding***REMOVED*** / currentPage.width * currentPage.scale / this.#pageWidthScaleFactor;
      const pageHeightScale = (this.container.clientHeight - vPadding***REMOVED*** / currentPage.height * currentPage.scale;
      switch (value***REMOVED*** {
        case "page-actual":
          scale = 1;
          break;
        case "page-width":
          scale = pageWidthScale;
          break;
        case "page-height":
          scale = pageHeightScale;
          break;
        case "page-fit":
          scale = Math.min(pageWidthScale, pageHeightScale***REMOVED***;
          break;
        case "auto":
          const horizontalScale = isPortraitOrientation(currentPage***REMOVED*** ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale***REMOVED***;
          scale = Math.min(MAX_AUTO_SCALE, horizontalScale***REMOVED***;
          break;
        default:
          console.error(`#setScale: "${value***REMOVED***" is an unknown zoom value.`***REMOVED***;
          return;
      ***REMOVED***
      options.preset = true;
      this.#setScaleUpdatePages(scale, value, options***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #resetCurrentPageView(***REMOVED*** {
    const pageView = this._pages[this._currentPageNumber - 1];
    if (this.isInPresentationMode***REMOVED*** {
      this.#setScale(this._currentScaleValue, {
        noScroll: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.#scrollIntoView(pageView***REMOVED***;
  ***REMOVED***
  pageLabelToPageNumber(label***REMOVED*** {
    if (!this._pageLabels***REMOVED*** {
      return null;
    ***REMOVED***
    const i = this._pageLabels.indexOf(label***REMOVED***;
    if (i < 0***REMOVED*** {
      return null;
    ***REMOVED***
    return i + 1;
  ***REMOVED***
  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  ***REMOVED******REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const pageView = Number.isInteger(pageNumber***REMOVED*** && this._pages[pageNumber - 1];
    if (!pageView***REMOVED*** {
      console.error(`scrollPageIntoView: "${pageNumber***REMOVED***" is not a valid pageNumber parameter.`***REMOVED***;
      return;
    ***REMOVED***
    if (this.isInPresentationMode || !destArray***REMOVED*** {
      this._setCurrentPageNumber(pageNumber, true***REMOVED***;
      return;
    ***REMOVED***
    let x = 0,
      y = 0;
    let width = 0,
      height = 0,
      widthScale,
      heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width***REMOVED*** / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height***REMOVED*** / pageView.scale / PixelsPerInch.PDF_TO_CSS_UNITS;
    let scale = 0;
    switch (destArray[1].name***REMOVED*** {
      case "XYZ":
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;
      case "Fit":
      case "FitB":
        scale = "page-fit";
        break;
      case "FitH":
      case "FitBH":
        y = destArray[2];
        scale = "page-width";
        if (y === null && this._location***REMOVED*** {
          x = this._location.left;
          y = this._location.top;
        ***REMOVED*** else if (typeof y !== "number" || y < 0***REMOVED*** {
          y = pageHeight;
        ***REMOVED***
        break;
      case "FitV":
      case "FitBV":
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = "page-height";
        break;
      case "FitR":
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        let hPadding = SCROLLBAR_PADDING,
          vPadding = VERTICAL_PADDING;
        if (this.removePageBorders***REMOVED*** {
          hPadding = vPadding = 0;
        ***REMOVED***
        widthScale = (this.container.clientWidth - hPadding***REMOVED*** / width / PixelsPerInch.PDF_TO_CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding***REMOVED*** / height / PixelsPerInch.PDF_TO_CSS_UNITS;
        scale = Math.min(Math.abs(widthScale***REMOVED***, Math.abs(heightScale***REMOVED******REMOVED***;
        break;
      default:
        console.error(`scrollPageIntoView: "${destArray[1].name***REMOVED***" is not a valid destination type.`***REMOVED***;
        return;
    ***REMOVED***
    if (!ignoreDestinationZoom***REMOVED*** {
      if (scale && scale !== this._currentScale***REMOVED*** {
        this.currentScaleValue = scale;
      ***REMOVED*** else if (this._currentScale === UNKNOWN_SCALE***REMOVED*** {
        this.currentScaleValue = DEFAULT_SCALE_VALUE;
      ***REMOVED***
    ***REMOVED***
    if (scale === "page-fit" && !destArray[4]***REMOVED*** {
      this.#scrollIntoView(pageView***REMOVED***;
      return;
    ***REMOVED***
    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y***REMOVED***, pageView.viewport.convertToViewportPoint(x + width, y + height***REMOVED***];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]***REMOVED***;
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]***REMOVED***;
    if (!allowNegativeOffset***REMOVED*** {
      left = Math.max(left, 0***REMOVED***;
      top = Math.max(top, 0***REMOVED***;
    ***REMOVED***
    this.#scrollIntoView(pageView, {
      left,
      top
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _updateLocation(firstPage***REMOVED*** {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue***REMOVED*** === currentScale ? Math.round(currentScale * 10000***REMOVED*** / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y***REMOVED***;
    const intLeft = Math.round(topLeft[0]***REMOVED***;
    const intTop = Math.round(topLeft[1]***REMOVED***;
    let pdfOpenParams = `#page=${pageNumber***REMOVED***`;
    if (!this.isInPresentationMode***REMOVED*** {
      pdfOpenParams += `&zoom=${normalizedScaleValue***REMOVED***,${intLeft***REMOVED***,${intTop***REMOVED***`;
    ***REMOVED***
    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    ***REMOVED***;
  ***REMOVED***
  update(***REMOVED*** {
    const visible = this._getVisiblePages(***REMOVED***;
    const visiblePages = visible.views,
      numVisiblePages = visiblePages.length;
    if (numVisiblePages === 0***REMOVED*** {
      return;
    ***REMOVED***
    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1***REMOVED***;
    this.#buffer.resize(newCacheSize, visible.ids***REMOVED***;
    this.renderingQueue.renderHighestPriority(visible***REMOVED***;
    const isSimpleLayout = this._spreadMode === SpreadMode.NONE && (this._scrollMode === ScrollMode.PAGE || this._scrollMode === ScrollMode.VERTICAL***REMOVED***;
    const currentId = this._currentPageNumber;
    let stillFullyVisible = false;
    for (const page of visiblePages***REMOVED*** {
      if (page.percent < 100***REMOVED*** {
        break;
      ***REMOVED***
      if (page.id === currentId && isSimpleLayout***REMOVED*** {
        stillFullyVisible = true;
        break;
      ***REMOVED***
    ***REMOVED***
    this._setCurrentPageNumber(stillFullyVisible ? currentId : visiblePages[0].id***REMOVED***;
    this._updateLocation(visible.first***REMOVED***;
    this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #switchToEditAnnotationMode(***REMOVED*** {
    const visible = this._getVisiblePages(***REMOVED***;
    const pagesToRefresh = [];
    const {
      ids,
      views
    ***REMOVED*** = visible;
    for (const page of views***REMOVED*** {
      const {
        view
      ***REMOVED*** = page;
      if (!view.hasEditableAnnotations(***REMOVED******REMOVED*** {
        ids.delete(view.id***REMOVED***;
        continue;
      ***REMOVED***
      pagesToRefresh.push(page***REMOVED***;
    ***REMOVED***
    if (pagesToRefresh.length === 0***REMOVED*** {
      return null;
    ***REMOVED***
    this.renderingQueue.renderHighestPriority({
      first: pagesToRefresh[0],
      last: pagesToRefresh.at(-1***REMOVED***,
      views: pagesToRefresh,
      ids
    ***REMOVED******REMOVED***;
    return ids;
  ***REMOVED***
  containsElement(element***REMOVED*** {
    return this.container.contains(element***REMOVED***;
  ***REMOVED***
  focus(***REMOVED*** {
    this.container.focus(***REMOVED***;
  ***REMOVED***
  get _isContainerRtl(***REMOVED*** {
    return getComputedStyle(this.container***REMOVED***.direction === "rtl";
  ***REMOVED***
  get isInPresentationMode(***REMOVED*** {
    return this.presentationModeState === PresentationModeState.FULLSCREEN;
  ***REMOVED***
  get isChangingPresentationMode(***REMOVED*** {
    return this.presentationModeState === PresentationModeState.CHANGING;
  ***REMOVED***
  get isHorizontalScrollbarEnabled(***REMOVED*** {
    return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  ***REMOVED***
  get isVerticalScrollbarEnabled(***REMOVED*** {
    return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
  ***REMOVED***
  _getVisiblePages(***REMOVED*** {
    const views = this._scrollMode === ScrollMode.PAGE ? this.#scrollModePageState.pages : this._pages,
      horizontal = this._scrollMode === ScrollMode.HORIZONTAL,
      rtl = horizontal && this._isContainerRtl;
    return getVisibleElements({
      scrollEl: this.container,
      views,
      sortByVisibility: true,
      horizontal,
      rtl
    ***REMOVED******REMOVED***;
  ***REMOVED***
  cleanup(***REMOVED*** {
    for (const pageView of this._pages***REMOVED*** {
      if (pageView.renderingState !== RenderingStates.FINISHED***REMOVED*** {
        pageView.reset(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  _cancelRendering(***REMOVED*** {
    for (const pageView of this._pages***REMOVED*** {
      pageView.cancelRendering(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #ensurePdfPageLoaded(pageView***REMOVED*** {
    if (pageView.pdfPage***REMOVED*** {
      return pageView.pdfPage;
    ***REMOVED***
  ***REMOVED***
      const pdfPage = await this.pdfDocument.getPage(pageView.id***REMOVED***;
      if (!pageView.pdfPage***REMOVED*** {
        pageView.setPdfPage(pdfPage***REMOVED***;
      ***REMOVED***
      return pdfPage;
    ***REMOVED*** catch (reason***REMOVED*** {
      console.error("Unable to get page for page view", reason***REMOVED***;
      return null;
    ***REMOVED***
  ***REMOVED***
  #getScrollAhead(visible***REMOVED*** {
    if (visible.first?.id === 1***REMOVED*** {
      return true;
    ***REMOVED*** else if (visible.last?.id === this.pagesCount***REMOVED*** {
      return false;
    ***REMOVED***
    switch (this._scrollMode***REMOVED*** {
      case ScrollMode.PAGE:
        return this.#scrollModePageState.scrollDown;
      case ScrollMode.HORIZONTAL:
        return this.scroll.right;
    ***REMOVED***
    return this.scroll.down;
  ***REMOVED***
  forceRendering(currentlyVisiblePages***REMOVED*** {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages(***REMOVED***;
    const scrollAhead = this.#getScrollAhead(visiblePages***REMOVED***;
    const preRenderExtra = this._spreadMode !== SpreadMode.NONE && this._scrollMode !== ScrollMode.HORIZONTAL;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra***REMOVED***;
    if (pageView***REMOVED*** {
      this.#ensurePdfPageLoaded(pageView***REMOVED***.then((***REMOVED*** => {
        this.renderingQueue.renderView(pageView***REMOVED***;
      ***REMOVED******REMOVED***;
      return true;
    ***REMOVED***
    return false;
  ***REMOVED***
  get hasEqualPageSizes(***REMOVED*** {
    const firstPageView = this._pages[0];
    for (let i = 1, ii = this._pages.length; i < ii; ++i***REMOVED*** {
      const pageView = this._pages[i];
      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height***REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    return true;
  ***REMOVED***
  getPagesOverview(***REMOVED*** {
    let initialOrientation;
    return this._pages.map(pageView => {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      ***REMOVED******REMOVED***;
      const orientation = isPortraitOrientation(viewport***REMOVED***;
      if (initialOrientation === undefined***REMOVED*** {
        initialOrientation = orientation;
      ***REMOVED*** else if (this.enablePrintAutoRotate && orientation !== initialOrientation***REMOVED*** {
    ***REMOVED***
          width: viewport.height,
          height: viewport.width,
          rotation: (viewport.rotation - 90***REMOVED*** % 360
        ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
        width: viewport.width,
        height: viewport.height,
        rotation: viewport.rotation
      ***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get optionalContentConfigPromise(***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return Promise.resolve(null***REMOVED***;
    ***REMOVED***
    if (!this._optionalContentConfigPromise***REMOVED*** {
      console.error("optionalContentConfigPromise: Not initialized yet."***REMOVED***;
      return this.pdfDocument.getOptionalContentConfig({
        intent: "display"
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return this._optionalContentConfigPromise;
  ***REMOVED***
  set optionalContentConfigPromise(promise***REMOVED*** {
    if (!(promise instanceof Promise***REMOVED******REMOVED*** {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (!this._optionalContentConfigPromise***REMOVED*** {
      return;
    ***REMOVED***
    this._optionalContentConfigPromise = promise;
    this.refresh(false, {
      optionalContentConfigPromise: promise
    ***REMOVED******REMOVED***;
    this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get scrollMode(***REMOVED*** {
    return this._scrollMode;
  ***REMOVED***
  set scrollMode(mode***REMOVED*** {
    if (this._scrollMode === mode***REMOVED*** {
      return;
    ***REMOVED***
    if (!isValidScrollMode(mode***REMOVED******REMOVED*** {
      throw new Error(`Invalid scroll mode: ${mode***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE***REMOVED*** {
      return;
    ***REMOVED***
    this._previousScrollMode = this._scrollMode;
    this._scrollMode = mode;
    this.eventBus.dispatch("scrollmodechanged", {
      source: this,
      mode
    ***REMOVED******REMOVED***;
    this._updateScrollMode(this._currentPageNumber***REMOVED***;
  ***REMOVED***
  _updateScrollMode(pageNumber = null***REMOVED*** {
    const scrollMode = this._scrollMode,
      viewer = this.viewer;
    viewer.classList.toggle("scrollHorizontal", scrollMode === ScrollMode.HORIZONTAL***REMOVED***;
    viewer.classList.toggle("scrollWrapped", scrollMode === ScrollMode.WRAPPED***REMOVED***;
    if (!this.pdfDocument || !pageNumber***REMOVED*** {
      return;
    ***REMOVED***
    if (scrollMode === ScrollMode.PAGE***REMOVED*** {
      this.#ensurePageViewVisible(***REMOVED***;
    ***REMOVED*** else if (this._previousScrollMode === ScrollMode.PAGE***REMOVED*** {
      this._updateSpreadMode(***REMOVED***;
    ***REMOVED***
    if (this._currentScaleValue && isNaN(this._currentScaleValue***REMOVED******REMOVED*** {
      this.#setScale(this._currentScaleValue, {
        noScroll: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._setCurrentPageNumber(pageNumber, true***REMOVED***;
    this.update(***REMOVED***;
  ***REMOVED***
  get spreadMode(***REMOVED*** {
    return this._spreadMode;
  ***REMOVED***
  set spreadMode(mode***REMOVED*** {
    if (this._spreadMode === mode***REMOVED*** {
      return;
    ***REMOVED***
    if (!isValidSpreadMode(mode***REMOVED******REMOVED*** {
      throw new Error(`Invalid spread mode: ${mode***REMOVED***`***REMOVED***;
    ***REMOVED***
    this._spreadMode = mode;
    this.eventBus.dispatch("spreadmodechanged", {
      source: this,
      mode
    ***REMOVED******REMOVED***;
    this._updateSpreadMode(this._currentPageNumber***REMOVED***;
  ***REMOVED***
  _updateSpreadMode(pageNumber = null***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const viewer = this.viewer,
      pages = this._pages;
    if (this._scrollMode === ScrollMode.PAGE***REMOVED*** {
      this.#ensurePageViewVisible(***REMOVED***;
    ***REMOVED*** else {
      viewer.textContent = "";
      if (this._spreadMode === SpreadMode.NONE***REMOVED*** {
        for (const pageView of this._pages***REMOVED*** {
          viewer.append(pageView.div***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else {
        const parity = this._spreadMode - 1;
        let spread = null;
        for (let i = 0, ii = pages.length; i < ii; ++i***REMOVED*** {
          if (spread === null***REMOVED*** {
            spread = document.createElement("div"***REMOVED***;
            spread.className = "spread";
            viewer.append(spread***REMOVED***;
          ***REMOVED*** else if (i % 2 === parity***REMOVED*** {
            spread = spread.cloneNode(false***REMOVED***;
            viewer.append(spread***REMOVED***;
          ***REMOVED***
          spread.append(pages[i].div***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    if (!pageNumber***REMOVED*** {
      return;
    ***REMOVED***
    if (this._currentScaleValue && isNaN(this._currentScaleValue***REMOVED******REMOVED*** {
      this.#setScale(this._currentScaleValue, {
        noScroll: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._setCurrentPageNumber(pageNumber, true***REMOVED***;
    this.update(***REMOVED***;
  ***REMOVED***
  _getPageAdvance(currentPageNumber, previous = false***REMOVED*** {
    switch (this._scrollMode***REMOVED*** {
      case ScrollMode.WRAPPED:
      ***REMOVED***
          const {
            views
          ***REMOVED*** = this._getVisiblePages(***REMOVED***,
            pageLayout = new Map(***REMOVED***;
          for (const {
            id,
            y,
            percent,
            widthPercent
          ***REMOVED*** of views***REMOVED*** {
            if (percent === 0 || widthPercent < 100***REMOVED*** {
              continue;
            ***REMOVED***
            let yArray = pageLayout.get(y***REMOVED***;
            if (!yArray***REMOVED*** {
              pageLayout.set(y, yArray ||= []***REMOVED***;
            ***REMOVED***
            yArray.push(id***REMOVED***;
          ***REMOVED***
          for (const yArray of pageLayout.values(***REMOVED******REMOVED*** {
            const currentIndex = yArray.indexOf(currentPageNumber***REMOVED***;
            if (currentIndex === -1***REMOVED*** {
              continue;
            ***REMOVED***
            const numPages = yArray.length;
            if (numPages === 1***REMOVED*** {
              break;
            ***REMOVED***
            if (previous***REMOVED*** {
              for (let i = currentIndex - 1, ii = 0; i >= ii; i--***REMOVED*** {
                const currentId = yArray[i],
                  expectedId = yArray[i + 1] - 1;
                if (currentId < expectedId***REMOVED*** {
                  return currentPageNumber - expectedId;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED*** else {
              for (let i = currentIndex + 1, ii = numPages; i < ii; i++***REMOVED*** {
                const currentId = yArray[i],
                  expectedId = yArray[i - 1] + 1;
                if (currentId > expectedId***REMOVED*** {
                  return expectedId - currentPageNumber;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
            if (previous***REMOVED*** {
              const firstId = yArray[0];
              if (firstId < currentPageNumber***REMOVED*** {
                return currentPageNumber - firstId + 1;
              ***REMOVED***
            ***REMOVED*** else {
              const lastId = yArray[numPages - 1];
              if (lastId > currentPageNumber***REMOVED*** {
                return lastId - currentPageNumber + 1;
              ***REMOVED***
            ***REMOVED***
            break;
          ***REMOVED***
          break;
        ***REMOVED***
      case ScrollMode.HORIZONTAL:
      ***REMOVED***
          break;
        ***REMOVED***
      case ScrollMode.PAGE:
      case ScrollMode.VERTICAL:
      ***REMOVED***
          if (this._spreadMode === SpreadMode.NONE***REMOVED*** {
            break;
          ***REMOVED***
          const parity = this._spreadMode - 1;
          if (previous && currentPageNumber % 2 !== parity***REMOVED*** {
            break;
          ***REMOVED*** else if (!previous && currentPageNumber % 2 === parity***REMOVED*** {
            break;
          ***REMOVED***
          const {
            views
          ***REMOVED*** = this._getVisiblePages(***REMOVED***,
            expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;
          for (const {
            id,
            percent,
            widthPercent
          ***REMOVED*** of views***REMOVED*** {
            if (id !== expectedId***REMOVED*** {
              continue;
            ***REMOVED***
            if (percent > 0 && widthPercent === 100***REMOVED*** {
              return 2;
            ***REMOVED***
            break;
          ***REMOVED***
          break;
        ***REMOVED***
    ***REMOVED***
    return 1;
  ***REMOVED***
  nextPage(***REMOVED*** {
    const currentPageNumber = this._currentPageNumber,
      pagesCount = this.pagesCount;
    if (currentPageNumber >= pagesCount***REMOVED*** {
      return false;
    ***REMOVED***
    const advance = this._getPageAdvance(currentPageNumber, false***REMOVED*** || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount***REMOVED***;
    return true;
  ***REMOVED***
  previousPage(***REMOVED*** {
    const currentPageNumber = this._currentPageNumber;
    if (currentPageNumber <= 1***REMOVED*** {
      return false;
    ***REMOVED***
    const advance = this._getPageAdvance(currentPageNumber, true***REMOVED*** || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1***REMOVED***;
    return true;
  ***REMOVED***
  updateScale({
    drawingDelay,
    scaleFactor = null,
    steps = null,
    origin
  ***REMOVED******REMOVED*** {
    if (steps === null && scaleFactor === null***REMOVED*** {
      throw new Error("Invalid updateScale options: either `steps` or `scaleFactor` must be provided."***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    let newScale = this._currentScale;
    if (scaleFactor > 0 && scaleFactor !== 1***REMOVED*** {
      newScale = Math.round(newScale * scaleFactor * 100***REMOVED*** / 100;
    ***REMOVED*** else if (steps***REMOVED*** {
      const delta = steps > 0 ? DEFAULT_SCALE_DELTA : 1 / DEFAULT_SCALE_DELTA;
      const round = steps > 0 ? Math.ceil : Math.floor;
      steps = Math.abs(steps***REMOVED***;
      do {
        newScale = round((newScale * delta***REMOVED***.toFixed(2***REMOVED*** * 10***REMOVED*** / 10;
      ***REMOVED*** while (--steps > 0***REMOVED***;
    ***REMOVED***
    newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale***REMOVED******REMOVED***;
    this.#setScale(newScale, {
      noScroll: false,
      drawingDelay,
      origin
    ***REMOVED******REMOVED***;
  ***REMOVED***
  increaseScale(options = {***REMOVED******REMOVED*** {
    this.updateScale({
      ...options,
      steps: options.steps ?? 1
    ***REMOVED******REMOVED***;
  ***REMOVED***
  decreaseScale(options = {***REMOVED******REMOVED*** {
    this.updateScale({
      ...options,
      steps: -(options.steps ?? 1***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #updateContainerHeightCss(height = this.container.clientHeight***REMOVED*** {
    if (height !== this.#previousContainerHeight***REMOVED*** {
      this.#previousContainerHeight = height;
      docStyle.setProperty("--viewer-container-height", `${height***REMOVED***px`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #resizeObserverCallback(entries***REMOVED*** {
    for (const entry of entries***REMOVED*** {
      if (entry.target === this.container***REMOVED*** {
        this.#updateContainerHeightCss(Math.floor(entry.borderBoxSize[0].blockSize***REMOVED******REMOVED***;
        this.#containerTopLeft = null;
        break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  get containerTopLeft(***REMOVED*** {
    return this.#containerTopLeft ||= [this.container.offsetTop, this.container.offsetLeft];
  ***REMOVED***
  #cleanupSwitchAnnotationEditorMode(***REMOVED*** {
    this.#switchAnnotationEditorModeAC?.abort(***REMOVED***;
    this.#switchAnnotationEditorModeAC = null;
    if (this.#switchAnnotationEditorModeTimeoutId !== null***REMOVED*** {
      clearTimeout(this.#switchAnnotationEditorModeTimeoutId***REMOVED***;
      this.#switchAnnotationEditorModeTimeoutId = null;
    ***REMOVED***
  ***REMOVED***
  get annotationEditorMode(***REMOVED*** {
    return this.#annotationEditorUIManager ? this.#annotationEditorMode : AnnotationEditorType.DISABLE;
  ***REMOVED***
  set annotationEditorMode({
    mode,
    editId = null,
    isFromKeyboard = false
  ***REMOVED******REMOVED*** {
    if (!this.#annotationEditorUIManager***REMOVED*** {
      throw new Error(`The AnnotationEditor is not enabled.`***REMOVED***;
    ***REMOVED***
    if (this.#annotationEditorMode === mode***REMOVED*** {
      return;
    ***REMOVED***
    if (!isValidAnnotationEditorMode(mode***REMOVED******REMOVED*** {
      throw new Error(`Invalid AnnotationEditor mode: ${mode***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (mode === AnnotationEditorType.STAMP***REMOVED*** {
      this.#mlManager?.loadModel("altText"***REMOVED***;
    ***REMOVED***
    const {
      eventBus
    ***REMOVED*** = this;
    const updater = (***REMOVED*** => {
      this.#cleanupSwitchAnnotationEditorMode(***REMOVED***;
      this.#annotationEditorMode = mode;
      this.#annotationEditorUIManager.updateMode(mode, editId, isFromKeyboard***REMOVED***;
      eventBus.dispatch("annotationeditormodechanged", {
        source: this,
        mode
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    if (mode === AnnotationEditorType.NONE || this.#annotationEditorMode === AnnotationEditorType.NONE***REMOVED*** {
      const isEditing = mode !== AnnotationEditorType.NONE;
      if (!isEditing***REMOVED*** {
        this.pdfDocument.annotationStorage.resetModifiedIds(***REMOVED***;
      ***REMOVED***
      for (const pageView of this._pages***REMOVED*** {
        pageView.toggleEditingMode(isEditing***REMOVED***;
      ***REMOVED***
      const idsToRefresh = this.#switchToEditAnnotationMode(***REMOVED***;
      if (isEditing && idsToRefresh***REMOVED*** {
        this.#cleanupSwitchAnnotationEditorMode(***REMOVED***;
        this.#switchAnnotationEditorModeAC = new AbortController(***REMOVED***;
        const signal = AbortSignal.any([this.#eventAbortController.signal, this.#switchAnnotationEditorModeAC.signal]***REMOVED***;
        eventBus._on("pagerendered", ({
          pageNumber
        ***REMOVED******REMOVED*** => {
          idsToRefresh.delete(pageNumber***REMOVED***;
          if (idsToRefresh.size === 0***REMOVED*** {
            this.#switchAnnotationEditorModeTimeoutId = setTimeout(updater, 0***REMOVED***;
          ***REMOVED***
        ***REMOVED***, {
          signal
        ***REMOVED******REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    updater(***REMOVED***;
  ***REMOVED***
  refresh(noUpdate = false, updateArgs = Object.create(null***REMOVED******REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    for (const pageView of this._pages***REMOVED*** {
      pageView.update(updateArgs***REMOVED***;
    ***REMOVED***
    if (this.#scaleTimeoutId !== null***REMOVED*** {
      clearTimeout(this.#scaleTimeoutId***REMOVED***;
      this.#scaleTimeoutId = null;
    ***REMOVED***
    if (!noUpdate***REMOVED*** {
      this.update(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/secondary_toolbar.js


class SecondaryToolbar {
  #opts;
  constructor(options, eventBus***REMOVED*** {
    this.#opts = options;
    const buttons = [{
      element: options.presentationModeButton,
      eventName: "presentationmode",
      close: true
    ***REMOVED***, {
      element: options.printButton,
      eventName: "print",
      close: true
    ***REMOVED***, {
      element: options.downloadButton,
      eventName: "download",
      close: true
    ***REMOVED***, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    ***REMOVED***, {
      element: options.firstPageButton,
      eventName: "firstpage",
      close: true
    ***REMOVED***, {
      element: options.lastPageButton,
      eventName: "lastpage",
      close: true
    ***REMOVED***, {
      element: options.pageRotateCwButton,
      eventName: "rotatecw",
      close: false
    ***REMOVED***, {
      element: options.pageRotateCcwButton,
      eventName: "rotateccw",
      close: false
    ***REMOVED***, {
      element: options.cursorSelectToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: CursorTool.SELECT
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.cursorHandToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: CursorTool.HAND
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.scrollPageButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.PAGE
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.scrollVerticalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.VERTICAL
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.scrollHorizontalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.HORIZONTAL
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.scrollWrappedButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: ScrollMode.WRAPPED
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.spreadNoneButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.NONE
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.spreadOddButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.ODD
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.spreadEvenButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: SpreadMode.EVEN
      ***REMOVED***,
      close: true
    ***REMOVED***, {
      element: options.imageAltTextSettingsButton,
      eventName: "imagealttextsettings",
      close: true
    ***REMOVED***, {
      element: options.documentPropertiesButton,
      eventName: "documentproperties",
      close: true
    ***REMOVED***];
    buttons.push({
      element: options.openFileButton,
      eventName: "openfile",
      close: true
    ***REMOVED******REMOVED***;
    this.eventBus = eventBus;
    this.opened = false;
    this.#bindListeners(buttons***REMOVED***;
    this.reset(***REMOVED***;
  ***REMOVED***
  get isOpen(***REMOVED*** {
    return this.opened;
  ***REMOVED***
  setPageNumber(pageNumber***REMOVED*** {
    this.pageNumber = pageNumber;
    this.#updateUIState(***REMOVED***;
  ***REMOVED***
  setPagesCount(pagesCount***REMOVED*** {
    this.pagesCount = pagesCount;
    this.#updateUIState(***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this.pageNumber = 0;
    this.pagesCount = 0;
    this.#updateUIState(***REMOVED***;
    this.eventBus.dispatch("switchcursortool", {
      source: this,
      reset: true
    ***REMOVED******REMOVED***;
    this.#scrollModeChanged({
      mode: ScrollMode.VERTICAL
    ***REMOVED******REMOVED***;
    this.#spreadModeChanged({
      mode: SpreadMode.NONE
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #updateUIState(***REMOVED*** {
    const {
      firstPageButton,
      lastPageButton,
      pageRotateCwButton,
      pageRotateCcwButton
    ***REMOVED*** = this.#opts;
    firstPageButton.disabled = this.pageNumber <= 1;
    lastPageButton.disabled = this.pageNumber >= this.pagesCount;
    pageRotateCwButton.disabled = this.pagesCount === 0;
    pageRotateCcwButton.disabled = this.pagesCount === 0;
  ***REMOVED***
  #bindListeners(buttons***REMOVED*** {
    const {
      eventBus
    ***REMOVED*** = this;
    const {
      toggleButton
    ***REMOVED*** = this.#opts;
    toggleButton.addEventListener("click", this.toggle.bind(this***REMOVED******REMOVED***;
    for (const {
      element,
      eventName,
      close,
      eventDetails
    ***REMOVED*** of buttons***REMOVED*** {
      element.addEventListener("click", evt => {
        if (eventName !== null***REMOVED*** {
          eventBus.dispatch(eventName, {
            source: this,
            ...eventDetails
          ***REMOVED******REMOVED***;
        ***REMOVED***
        if (close***REMOVED*** {
          this.close(***REMOVED***;
        ***REMOVED***
        eventBus.dispatch("reporttelemetry", {
          source: this,
          details: {
            type: "buttons",
            data: {
              id: element.id
            ***REMOVED***
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    eventBus._on("cursortoolchanged", this.#cursorToolChanged.bind(this***REMOVED******REMOVED***;
    eventBus._on("scrollmodechanged", this.#scrollModeChanged.bind(this***REMOVED******REMOVED***;
    eventBus._on("spreadmodechanged", this.#spreadModeChanged.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
  #cursorToolChanged({
    tool,
    disabled
  ***REMOVED******REMOVED*** {
    const {
      cursorSelectToolButton,
      cursorHandToolButton
    ***REMOVED*** = this.#opts;
    toggleCheckedBtn(cursorSelectToolButton, tool === CursorTool.SELECT***REMOVED***;
    toggleCheckedBtn(cursorHandToolButton, tool === CursorTool.HAND***REMOVED***;
    cursorSelectToolButton.disabled = disabled;
    cursorHandToolButton.disabled = disabled;
  ***REMOVED***
  #scrollModeChanged({
    mode
  ***REMOVED******REMOVED*** {
    const {
      scrollPageButton,
      scrollVerticalButton,
      scrollHorizontalButton,
      scrollWrappedButton,
      spreadNoneButton,
      spreadOddButton,
      spreadEvenButton
    ***REMOVED*** = this.#opts;
    toggleCheckedBtn(scrollPageButton, mode === ScrollMode.PAGE***REMOVED***;
    toggleCheckedBtn(scrollVerticalButton, mode === ScrollMode.VERTICAL***REMOVED***;
    toggleCheckedBtn(scrollHorizontalButton, mode === ScrollMode.HORIZONTAL***REMOVED***;
    toggleCheckedBtn(scrollWrappedButton, mode === ScrollMode.WRAPPED***REMOVED***;
    const forceScrollModePage = this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE;
    scrollPageButton.disabled = forceScrollModePage;
    scrollVerticalButton.disabled = forceScrollModePage;
    scrollHorizontalButton.disabled = forceScrollModePage;
    scrollWrappedButton.disabled = forceScrollModePage;
    const isHorizontal = mode === ScrollMode.HORIZONTAL;
    spreadNoneButton.disabled = isHorizontal;
    spreadOddButton.disabled = isHorizontal;
    spreadEvenButton.disabled = isHorizontal;
  ***REMOVED***
  #spreadModeChanged({
    mode
  ***REMOVED******REMOVED*** {
    const {
      spreadNoneButton,
      spreadOddButton,
      spreadEvenButton
    ***REMOVED*** = this.#opts;
    toggleCheckedBtn(spreadNoneButton, mode === SpreadMode.NONE***REMOVED***;
    toggleCheckedBtn(spreadOddButton, mode === SpreadMode.ODD***REMOVED***;
    toggleCheckedBtn(spreadEvenButton, mode === SpreadMode.EVEN***REMOVED***;
  ***REMOVED***
  open(***REMOVED*** {
    if (this.opened***REMOVED*** {
      return;
    ***REMOVED***
    this.opened = true;
    const {
      toggleButton,
      toolbar
    ***REMOVED*** = this.#opts;
    toggleExpandedBtn(toggleButton, true, toolbar***REMOVED***;
  ***REMOVED***
  close(***REMOVED*** {
    if (!this.opened***REMOVED*** {
      return;
    ***REMOVED***
    this.opened = false;
    const {
      toggleButton,
      toolbar
    ***REMOVED*** = this.#opts;
    toggleExpandedBtn(toggleButton, false, toolbar***REMOVED***;
  ***REMOVED***
  toggle(***REMOVED*** {
    if (this.opened***REMOVED*** {
      this.close(***REMOVED***;
    ***REMOVED*** else {
      this.open(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./web/toolbar.js


class Toolbar {
  #opts;
  constructor(options, eventBus, toolbarDensity = 0***REMOVED*** {
    this.#opts = options;
    this.eventBus = eventBus;
    const buttons = [{
      element: options.previous,
      eventName: "previouspage"
    ***REMOVED***, {
      element: options.next,
      eventName: "nextpage"
    ***REMOVED***, {
      element: options.zoomIn,
      eventName: "zoomin"
    ***REMOVED***, {
      element: options.zoomOut,
      eventName: "zoomout"
    ***REMOVED***, {
      element: options.print,
      eventName: "print"
    ***REMOVED***, {
      element: options.download,
      eventName: "download"
    ***REMOVED***, {
      element: options.editorFreeTextButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode(***REMOVED*** {
          const {
            classList
          ***REMOVED*** = options.editorFreeTextButton;
          return classList.contains("toggled"***REMOVED*** ? AnnotationEditorType.NONE : AnnotationEditorType.FREETEXT;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***, {
      element: options.editorHighlightButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode(***REMOVED*** {
          const {
            classList
          ***REMOVED*** = options.editorHighlightButton;
          return classList.contains("toggled"***REMOVED*** ? AnnotationEditorType.NONE : AnnotationEditorType.HIGHLIGHT;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***, {
      element: options.editorInkButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode(***REMOVED*** {
          const {
            classList
          ***REMOVED*** = options.editorInkButton;
          return classList.contains("toggled"***REMOVED*** ? AnnotationEditorType.NONE : AnnotationEditorType.INK;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***, {
      element: options.editorStampButton,
      eventName: "switchannotationeditormode",
      eventDetails: {
        get mode(***REMOVED*** {
          const {
            classList
          ***REMOVED*** = options.editorStampButton;
          return classList.contains("toggled"***REMOVED*** ? AnnotationEditorType.NONE : AnnotationEditorType.STAMP;
        ***REMOVED***
      ***REMOVED***,
      telemetry: {
        type: "editing",
        data: {
          action: "pdfjs.image.icon_click"
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***];
    this.#bindListeners(buttons***REMOVED***;
    this.#updateToolbarDensity({
      value: toolbarDensity
    ***REMOVED******REMOVED***;
    this.reset(***REMOVED***;
  ***REMOVED***
  #updateToolbarDensity({
    value
  ***REMOVED******REMOVED*** {
    let name = "normal";
    switch (value***REMOVED*** {
      case 1:
        name = "compact";
        break;
      case 2:
        name = "touch";
        break;
    ***REMOVED***
    document.documentElement.setAttribute("data-toolbar-density", name***REMOVED***;
  ***REMOVED***
  #setAnnotationEditorUIManager(uiManager, parentContainer***REMOVED*** {
    const colorPicker = new ColorPicker({
      uiManager
    ***REMOVED******REMOVED***;
    uiManager.setMainHighlightColorPicker(colorPicker***REMOVED***;
    parentContainer.append(colorPicker.renderMainDropdown(***REMOVED******REMOVED***;
  ***REMOVED***
  setPageNumber(pageNumber, pageLabel***REMOVED*** {
    this.pageNumber = pageNumber;
    this.pageLabel = pageLabel;
    this.#updateUIState(false***REMOVED***;
  ***REMOVED***
  setPagesCount(pagesCount, hasPageLabels***REMOVED*** {
    this.pagesCount = pagesCount;
    this.hasPageLabels = hasPageLabels;
    this.#updateUIState(true***REMOVED***;
  ***REMOVED***
  setPageScale(pageScaleValue, pageScale***REMOVED*** {
    this.pageScaleValue = (pageScaleValue || pageScale***REMOVED***.toString(***REMOVED***;
    this.pageScale = pageScale;
    this.#updateUIState(false***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this.pageNumber = 0;
    this.pageLabel = null;
    this.hasPageLabels = false;
    this.pagesCount = 0;
    this.pageScaleValue = DEFAULT_SCALE_VALUE;
    this.pageScale = DEFAULT_SCALE;
    this.#updateUIState(true***REMOVED***;
    this.updateLoadingIndicatorState(***REMOVED***;
    this.#editorModeChanged({
      mode: AnnotationEditorType.DISABLE
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #bindListeners(buttons***REMOVED*** {
    const {
      eventBus
    ***REMOVED*** = this;
    const {
      editorHighlightColorPicker,
      editorHighlightButton,
      pageNumber,
      scaleSelect
    ***REMOVED*** = this.#opts;
    const self = this;
    for (const {
      element,
      eventName,
      eventDetails,
      telemetry
    ***REMOVED*** of buttons***REMOVED*** {
      element.addEventListener("click", evt => {
        if (eventName !== null***REMOVED*** {
          eventBus.dispatch(eventName, {
            source: this,
            ...eventDetails,
            isFromKeyboard: evt.detail === 0
          ***REMOVED******REMOVED***;
        ***REMOVED***
        if (telemetry***REMOVED*** {
          eventBus.dispatch("reporttelemetry", {
            source: this,
            details: telemetry
          ***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    pageNumber.addEventListener("click", function (***REMOVED*** {
      this.select(***REMOVED***;
    ***REMOVED******REMOVED***;
    pageNumber.addEventListener("change", function (***REMOVED*** {
      eventBus.dispatch("pagenumberchanged", {
        source: self,
        value: this.value
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    scaleSelect.addEventListener("change", function (***REMOVED*** {
      if (this.value === "custom"***REMOVED*** {
        return;
      ***REMOVED***
      eventBus.dispatch("scalechanged", {
        source: self,
        value: this.value
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    scaleSelect.addEventListener("click", function ({
      target
    ***REMOVED******REMOVED*** {
      if (this.value === self.pageScaleValue && target.tagName.toUpperCase(***REMOVED*** === "OPTION"***REMOVED*** {
        this.blur(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    scaleSelect.oncontextmenu = noContextMenu;
    eventBus._on("annotationeditormodechanged", this.#editorModeChanged.bind(this***REMOVED******REMOVED***;
    eventBus._on("showannotationeditorui", ({
      mode
    ***REMOVED******REMOVED*** => {
      switch (mode***REMOVED*** {
        case AnnotationEditorType.HIGHLIGHT:
          editorHighlightButton.click(***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    eventBus._on("toolbardensity", this.#updateToolbarDensity.bind(this***REMOVED******REMOVED***;
    if (editorHighlightColorPicker***REMOVED*** {
      eventBus._on("annotationeditoruimanager", ({
        uiManager
      ***REMOVED******REMOVED*** => {
        this.#setAnnotationEditorUIManager(uiManager, editorHighlightColorPicker***REMOVED***;
      ***REMOVED***, {
        once: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #editorModeChanged({
    mode
  ***REMOVED******REMOVED*** {
    const {
      editorFreeTextButton,
      editorFreeTextParamsToolbar,
      editorHighlightButton,
      editorHighlightParamsToolbar,
      editorInkButton,
      editorInkParamsToolbar,
      editorStampButton,
      editorStampParamsToolbar
    ***REMOVED*** = this.#opts;
    toggleExpandedBtn(editorFreeTextButton, mode === AnnotationEditorType.FREETEXT, editorFreeTextParamsToolbar***REMOVED***;
    toggleExpandedBtn(editorHighlightButton, mode === AnnotationEditorType.HIGHLIGHT, editorHighlightParamsToolbar***REMOVED***;
    toggleExpandedBtn(editorInkButton, mode === AnnotationEditorType.INK, editorInkParamsToolbar***REMOVED***;
    toggleExpandedBtn(editorStampButton, mode === AnnotationEditorType.STAMP, editorStampParamsToolbar***REMOVED***;
    const isDisable = mode === AnnotationEditorType.DISABLE;
    editorFreeTextButton.disabled = isDisable;
    editorHighlightButton.disabled = isDisable;
    editorInkButton.disabled = isDisable;
    editorStampButton.disabled = isDisable;
  ***REMOVED***
  #updateUIState(resetNumPages = false***REMOVED*** {
    const {
      pageNumber,
      pagesCount,
      pageScaleValue,
      pageScale
    ***REMOVED*** = this;
    const opts = this.#opts;
    if (resetNumPages***REMOVED*** {
      if (this.hasPageLabels***REMOVED*** {
        opts.pageNumber.type = "text";
        opts.numPages.setAttribute("data-l10n-id", "pdfjs-page-of-pages"***REMOVED***;
      ***REMOVED*** else {
        opts.pageNumber.type = "number";
        opts.numPages.setAttribute("data-l10n-id", "pdfjs-of-pages"***REMOVED***;
        opts.numPages.setAttribute("data-l10n-args", JSON.stringify({
          pagesCount
        ***REMOVED******REMOVED******REMOVED***;
      ***REMOVED***
      opts.pageNumber.max = pagesCount;
    ***REMOVED***
    if (this.hasPageLabels***REMOVED*** {
      opts.pageNumber.value = this.pageLabel;
      opts.numPages.setAttribute("data-l10n-args", JSON.stringify({
        pageNumber,
        pagesCount
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED*** else {
      opts.pageNumber.value = pageNumber;
    ***REMOVED***
    opts.previous.disabled = pageNumber <= 1;
    opts.next.disabled = pageNumber >= pagesCount;
    opts.zoomOut.disabled = pageScale <= MIN_SCALE;
    opts.zoomIn.disabled = pageScale >= MAX_SCALE;
    let predefinedValueFound = false;
    for (const option of opts.scaleSelect.options***REMOVED*** {
      if (option.value !== pageScaleValue***REMOVED*** {
        option.selected = false;
        continue;
      ***REMOVED***
      option.selected = true;
      predefinedValueFound = true;
    ***REMOVED***
    if (!predefinedValueFound***REMOVED*** {
      opts.customScaleOption.selected = true;
      opts.customScaleOption.setAttribute("data-l10n-args", JSON.stringify({
        scale: Math.round(pageScale * 10000***REMOVED*** / 100
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateLoadingIndicatorState(loading = false***REMOVED*** {
    const {
      pageNumber
    ***REMOVED*** = this.#opts;
    pageNumber.classList.toggle("loading", loading***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./web/view_history.js
const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;
class ViewHistory {
  constructor(fingerprint, cacheSize = DEFAULT_VIEW_HISTORY_CACHE_SIZE***REMOVED*** {
    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage(***REMOVED***.then(databaseStr => {
      const database = JSON.parse(databaseStr || "{***REMOVED***"***REMOVED***;
      let index = -1;
      if (!Array.isArray(database.files***REMOVED******REMOVED*** {
        database.files = [];
      ***REMOVED*** else {
        while (database.files.length >= this.cacheSize***REMOVED*** {
          database.files.shift(***REMOVED***;
        ***REMOVED***
        for (let i = 0, ii = database.files.length; i < ii; i++***REMOVED*** {
          const branch = database.files[i];
          if (branch.fingerprint === this.fingerprint***REMOVED*** {
            index = i;
            break;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      if (index === -1***REMOVED*** {
        index = database.files.push({
          fingerprint: this.fingerprint
        ***REMOVED******REMOVED*** - 1;
      ***REMOVED***
      this.file = database.files[index];
      this.database = database;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async _writeToStorage(***REMOVED*** {
    const databaseStr = JSON.stringify(this.database***REMOVED***;
    localStorage.setItem("pdfjs.history", databaseStr***REMOVED***;
  ***REMOVED***
  async _readFromStorage(***REMOVED*** {
    return localStorage.getItem("pdfjs.history"***REMOVED***;
  ***REMOVED***
  async set(name, val***REMOVED*** {
    await this._initializedPromise;
    this.file[name] = val;
    return this._writeToStorage(***REMOVED***;
  ***REMOVED***
  async setMultiple(properties***REMOVED*** {
    await this._initializedPromise;
    for (const name in properties***REMOVED*** {
      this.file[name] = properties[name];
    ***REMOVED***
    return this._writeToStorage(***REMOVED***;
  ***REMOVED***
  async get(name, defaultValue***REMOVED*** {
    await this._initializedPromise;
    const val = this.file[name];
    return val !== undefined ? val : defaultValue;
  ***REMOVED***
  async getMultiple(properties***REMOVED*** {
    await this._initializedPromise;
    const values = Object.create(null***REMOVED***;
    for (const name in properties***REMOVED*** {
      const val = this.file[name];
      values[name] = val !== undefined ? val : properties[name];
    ***REMOVED***
    return values;
  ***REMOVED***
***REMOVED***

;// ./web/app.js

































const FORCE_PAGES_LOADED_TIMEOUT = 10000;
const ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
***REMOVED***;
const PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1***REMOVED***,
  _initializedCapability: {
    ...Promise.withResolvers(***REMOVED***,
    settled: false
  ***REMOVED***,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  pdfScriptingManager: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: new Preferences(***REMOVED***,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  annotationEditorParams: null,
  imageAltTextSettings: null,
  isInitialViewSet: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  mlManager: null,
  _downloadUrl: "",
  _eventBusAbortController: null,
  _windowAbortController: null,
  _globalAbortController: new AbortController(***REMOVED***,
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  _saveInProgress: false,
  _wheelUnusedTicks: 0,
  _wheelUnusedFactor: 1,
  _touchManager: null,
  _touchUnusedTicks: 0,
  _touchUnusedFactor: 1,
  _PDFBug: null,
  _hasAnnotationEditors: false,
  _title: document.title,
  _printAnnotationStoragePromise: null,
  _isCtrlKeyDown: false,
  _caretBrowsing: null,
  _isScrolling: false,
  editorUndoBar: null,
  async initialize(appConfig***REMOVED*** {
    this.appConfig = appConfig;
  ***REMOVED***
      await this.preferences.initializedPromise;
    ***REMOVED*** catch (ex***REMOVED*** {
      console.error("initialize:", ex***REMOVED***;
    ***REMOVED***
    if (AppOptions.get("pdfBugEnabled"***REMOVED******REMOVED*** {
      await this._parseHashParams(***REMOVED***;
    ***REMOVED***
    let mode;
    switch (AppOptions.get("viewerCssTheme"***REMOVED******REMOVED*** {
      case 1:
        mode = "is-light";
        break;
      case 2:
        mode = "is-dark";
        break;
    ***REMOVED***
    if (mode***REMOVED*** {
      document.documentElement.classList.add(mode***REMOVED***;
    ***REMOVED***
    this.l10n = await this.externalServices.createL10n(***REMOVED***;
    document.getElementsByTagName("html"***REMOVED***[0].dir = this.l10n.getDirection(***REMOVED***;
    this.l10n.translate(appConfig.appContainer || document.documentElement***REMOVED***;
    if (this.isViewerEmbedded && AppOptions.get("externalLinkTarget"***REMOVED*** === LinkTarget.NONE***REMOVED*** {
      AppOptions.set("externalLinkTarget", LinkTarget.TOP***REMOVED***;
    ***REMOVED***
    await this._initializeViewerComponents(***REMOVED***;
    this.bindEvents(***REMOVED***;
    this.bindWindowEvents(***REMOVED***;
    this._initializedCapability.settled = true;
    this._initializedCapability.resolve(***REMOVED***;
  ***REMOVED***,
  async _parseHashParams(***REMOVED*** {
    const hash = document.location.hash.substring(1***REMOVED***;
    if (!hash***REMOVED*** {
      return;
    ***REMOVED***
    const {
      mainContainer,
      viewerContainer
    ***REMOVED*** = this.appConfig,
      params = parseQueryString(hash***REMOVED***;
    const loadPDFBug = async (***REMOVED*** => {
      if (this._PDFBug***REMOVED*** {
        return;
      ***REMOVED***
      const {
        PDFBug
      ***REMOVED*** = await import(/*webpackIgnore: true*/AppOptions.get("debuggerSrc"***REMOVED******REMOVED***;
      this._PDFBug = PDFBug;
    ***REMOVED***;
    if (params.get("disableworker"***REMOVED*** === "true"***REMOVED*** {
    ***REMOVED***
        GlobalWorkerOptions.workerSrc ||= AppOptions.get("workerSrc"***REMOVED***;
        await import(/*webpackIgnore: true*/PDFWorker.workerSrc***REMOVED***;
      ***REMOVED*** catch (ex***REMOVED*** {
        console.error("_parseHashParams:", ex***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (params.has("textlayer"***REMOVED******REMOVED*** {
      switch (params.get("textlayer"***REMOVED******REMOVED*** {
        case "off":
          AppOptions.set("textLayerMode", TextLayerMode.DISABLE***REMOVED***;
          break;
        case "visible":
        case "shadow":
        case "hover":
          viewerContainer.classList.add(`textLayer-${params.get("textlayer"***REMOVED******REMOVED***`***REMOVED***;
        ***REMOVED***
            await loadPDFBug(***REMOVED***;
            this._PDFBug.loadCSS(***REMOVED***;
          ***REMOVED*** catch (ex***REMOVED*** {
            console.error("_parseHashParams:", ex***REMOVED***;
          ***REMOVED***
          break;
      ***REMOVED***
    ***REMOVED***
    if (params.has("pdfbug"***REMOVED******REMOVED*** {
      AppOptions.setAll({
        pdfBug: true,
        fontExtraProperties: true
      ***REMOVED******REMOVED***;
      const enabled = params.get("pdfbug"***REMOVED***.split(","***REMOVED***;
    ***REMOVED***
        await loadPDFBug(***REMOVED***;
        this._PDFBug.init(mainContainer, enabled***REMOVED***;
      ***REMOVED*** catch (ex***REMOVED*** {
        console.error("_parseHashParams:", ex***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (params.has("locale"***REMOVED******REMOVED*** {
      AppOptions.set("localeProperties", {
        lang: params.get("locale"***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const opts = {
      disableAutoFetch: x => x === "true",
      disableFontFace: x => x === "true",
      disableHistory: x => x === "true",
      disableRange: x => x === "true",
      disableStream: x => x === "true",
      verbosity: x => x | 0
    ***REMOVED***;
    for (const name in opts***REMOVED*** {
      const check = opts[name],
        key = name.toLowerCase(***REMOVED***;
      if (params.has(key***REMOVED******REMOVED*** {
        AppOptions.set(name, check(params.get(key***REMOVED******REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
  async _initializeViewerComponents(***REMOVED*** {
    const {
      appConfig,
      externalServices,
      l10n
    ***REMOVED*** = this;
    const eventBus = new EventBus(***REMOVED***;
    this.eventBus = AppOptions.eventBus = eventBus;
    this.mlManager?.setEventBus(eventBus, this._globalAbortController.signal***REMOVED***;
    this.overlayManager = new OverlayManager(***REMOVED***;
    const pdfRenderingQueue = new PDFRenderingQueue(***REMOVED***;
    pdfRenderingQueue.onIdle = this._cleanup.bind(this***REMOVED***;
    this.pdfRenderingQueue = pdfRenderingQueue;
    const pdfLinkService = new PDFLinkService({
      eventBus,
      externalLinkTarget: AppOptions.get("externalLinkTarget"***REMOVED***,
      externalLinkRel: AppOptions.get("externalLinkRel"***REMOVED***,
      ignoreDestinationZoom: AppOptions.get("ignoreDestinationZoom"***REMOVED***
    ***REMOVED******REMOVED***;
    this.pdfLinkService = pdfLinkService;
    const downloadManager = this.downloadManager = new DownloadManager(***REMOVED***;
    const findController = new PDFFindController({
      linkService: pdfLinkService,
      eventBus,
      updateMatchesCountOnProgress: true
    ***REMOVED******REMOVED***;
    this.findController = findController;
    const pdfScriptingManager = new PDFScriptingManager({
      eventBus,
      externalServices,
      docProperties: this._scriptingDocProperties.bind(this***REMOVED***
    ***REMOVED******REMOVED***;
    this.pdfScriptingManager = pdfScriptingManager;
    const container = appConfig.mainContainer,
      viewer = appConfig.viewerContainer;
    const annotationEditorMode = AppOptions.get("annotationEditorMode"***REMOVED***;
    const pageColors = AppOptions.get("forcePageColors"***REMOVED*** || window.matchMedia("(forced-colors: active***REMOVED***"***REMOVED***.matches ? {
      background: AppOptions.get("pageColorsBackground"***REMOVED***,
      foreground: AppOptions.get("pageColorsForeground"***REMOVED***
    ***REMOVED*** : null;
    let altTextManager;
    if (AppOptions.get("enableUpdatedAddImage"***REMOVED******REMOVED*** {
      altTextManager = appConfig.newAltTextDialog ? new NewAltTextManager(appConfig.newAltTextDialog, this.overlayManager, eventBus***REMOVED*** : null;
    ***REMOVED*** else {
      altTextManager = appConfig.altTextDialog ? new AltTextManager(appConfig.altTextDialog, container, this.overlayManager, eventBus***REMOVED*** : null;
    ***REMOVED***
    if (appConfig.editorUndoBar***REMOVED*** {
      this.editorUndoBar = new EditorUndoBar(appConfig.editorUndoBar, eventBus***REMOVED***;
    ***REMOVED***
    const enableHWA = AppOptions.get("enableHWA"***REMOVED***;
    const pdfViewer = new PDFViewer({
      container,
      viewer,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      downloadManager,
      altTextManager,
      editorUndoBar: this.editorUndoBar,
      findController,
      scriptingManager: AppOptions.get("enableScripting"***REMOVED*** && pdfScriptingManager,
      l10n,
      textLayerMode: AppOptions.get("textLayerMode"***REMOVED***,
      annotationMode: AppOptions.get("annotationMode"***REMOVED***,
      annotationEditorMode,
      annotationEditorHighlightColors: AppOptions.get("highlightEditorColors"***REMOVED***,
      enableHighlightFloatingButton: AppOptions.get("enableHighlightFloatingButton"***REMOVED***,
      enableUpdatedAddImage: AppOptions.get("enableUpdatedAddImage"***REMOVED***,
      enableNewAltTextWhenAddingImage: AppOptions.get("enableNewAltTextWhenAddingImage"***REMOVED***,
      imageResourcesPath: AppOptions.get("imageResourcesPath"***REMOVED***,
      enablePrintAutoRotate: AppOptions.get("enablePrintAutoRotate"***REMOVED***,
      maxCanvasPixels: AppOptions.get("maxCanvasPixels"***REMOVED***,
      enablePermissions: AppOptions.get("enablePermissions"***REMOVED***,
      pageColors,
      mlManager: this.mlManager,
      abortSignal: this._globalAbortController.signal,
      enableHWA,
      supportsPinchToZoom: this.supportsPinchToZoom
    ***REMOVED******REMOVED***;
    this.pdfViewer = pdfViewer;
    pdfRenderingQueue.setViewer(pdfViewer***REMOVED***;
    pdfLinkService.setViewer(pdfViewer***REMOVED***;
    pdfScriptingManager.setViewer(pdfViewer***REMOVED***;
    if (appConfig.sidebar?.thumbnailView***REMOVED*** {
      this.pdfThumbnailViewer = new PDFThumbnailViewer({
        container: appConfig.sidebar.thumbnailView,
        eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        pageColors,
        abortSignal: this._globalAbortController.signal,
        enableHWA
      ***REMOVED******REMOVED***;
      pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer***REMOVED***;
    ***REMOVED***
    if (!this.isViewerEmbedded && !AppOptions.get("disableHistory"***REMOVED******REMOVED*** {
      this.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus
      ***REMOVED******REMOVED***;
      pdfLinkService.setHistory(this.pdfHistory***REMOVED***;
    ***REMOVED***
    if (!this.supportsIntegratedFind && appConfig.findBar***REMOVED*** {
      this.findBar = new PDFFindBar(appConfig.findBar, appConfig.principalContainer, eventBus***REMOVED***;
    ***REMOVED***
    if (appConfig.annotationEditorParams***REMOVED*** {
      if (typeof AbortSignal.any === "function" && annotationEditorMode !== AnnotationEditorType.DISABLE***REMOVED*** {
        this.annotationEditorParams = new AnnotationEditorParams(appConfig.annotationEditorParams, eventBus***REMOVED***;
      ***REMOVED*** else {
        for (const id of ["editorModeButtons", "editorModeSeparator"]***REMOVED*** {
          document.getElementById(id***REMOVED***?.classList.add("hidden"***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    if (this.mlManager && appConfig.secondaryToolbar?.imageAltTextSettingsButton***REMOVED*** {
      this.imageAltTextSettings = new ImageAltTextSettings(appConfig.altTextSettingsDialog, this.overlayManager, eventBus, this.mlManager***REMOVED***;
    ***REMOVED***
    if (appConfig.documentProperties***REMOVED*** {
      this.pdfDocumentProperties = new PDFDocumentProperties(appConfig.documentProperties, this.overlayManager, eventBus, l10n, (***REMOVED*** => this._docFilename***REMOVED***;
    ***REMOVED***
    if (appConfig.secondaryToolbar?.cursorHandToolButton***REMOVED*** {
      this.pdfCursorTools = new PDFCursorTools({
        container,
        eventBus,
        cursorToolOnLoad: AppOptions.get("cursorToolOnLoad"***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.toolbar***REMOVED*** {
      this.toolbar = new Toolbar(appConfig.toolbar, eventBus, AppOptions.get("toolbarDensity"***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.secondaryToolbar***REMOVED*** {
      if (AppOptions.get("enableAltText"***REMOVED******REMOVED*** {
        appConfig.secondaryToolbar.imageAltTextSettingsButton?.classList.remove("hidden"***REMOVED***;
        appConfig.secondaryToolbar.imageAltTextSettingsSeparator?.classList.remove("hidden"***REMOVED***;
      ***REMOVED***
      this.secondaryToolbar = new SecondaryToolbar(appConfig.secondaryToolbar, eventBus***REMOVED***;
    ***REMOVED***
    if (this.supportsFullscreen && appConfig.secondaryToolbar?.presentationModeButton***REMOVED*** {
      this.pdfPresentationMode = new PDFPresentationMode({
        container,
        pdfViewer,
        eventBus
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.passwordOverlay***REMOVED*** {
      this.passwordPrompt = new PasswordPrompt(appConfig.passwordOverlay, this.overlayManager, this.isViewerEmbedded***REMOVED***;
    ***REMOVED***
    if (appConfig.sidebar?.outlineView***REMOVED*** {
      this.pdfOutlineViewer = new PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus,
        l10n,
        linkService: pdfLinkService,
        downloadManager
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.sidebar?.attachmentsView***REMOVED*** {
      this.pdfAttachmentViewer = new PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus,
        l10n,
        downloadManager
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.sidebar?.layersView***REMOVED*** {
      this.pdfLayerViewer = new PDFLayerViewer({
        container: appConfig.sidebar.layersView,
        eventBus,
        l10n
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (appConfig.sidebar***REMOVED*** {
      this.pdfSidebar = new PDFSidebar({
        elements: appConfig.sidebar,
        eventBus,
        l10n
      ***REMOVED******REMOVED***;
      this.pdfSidebar.onToggled = this.forceRendering.bind(this***REMOVED***;
      this.pdfSidebar.onUpdateThumbnails = (***REMOVED*** => {
        for (const pageView of pdfViewer.getCachedPageViews(***REMOVED******REMOVED*** {
          if (pageView.renderingState === RenderingStates.FINISHED***REMOVED*** {
            this.pdfThumbnailViewer.getThumbnail(pageView.id - 1***REMOVED***?.setImage(pageView***REMOVED***;
          ***REMOVED***
        ***REMOVED***
        this.pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber***REMOVED***;
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  async run(config***REMOVED*** {
    await this.initialize(config***REMOVED***;
    const {
      appConfig,
      eventBus
    ***REMOVED*** = this;
    let file;
    const queryString = document.location.search.substring(1***REMOVED***;
    const params = parseQueryString(queryString***REMOVED***;
    file = params.get("file"***REMOVED*** ?? AppOptions.get("defaultUrl"***REMOVED***;
    validateFileURL(file***REMOVED***;
    const fileInput = this._openFileInput = document.createElement("input"***REMOVED***;
    fileInput.id = "fileInput";
    fileInput.hidden = true;
    fileInput.type = "file";
    fileInput.value = null;
    document.body.append(fileInput***REMOVED***;
    fileInput.addEventListener("change", function (evt***REMOVED*** {
      const {
        files
      ***REMOVED*** = evt.target;
      if (!files || files.length === 0***REMOVED*** {
        return;
      ***REMOVED***
      eventBus.dispatch("fileinputchange", {
        source: this,
        fileInput: evt.target
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    appConfig.mainContainer.addEventListener("dragover", function (evt***REMOVED*** {
      for (const item of evt.dataTransfer.items***REMOVED*** {
        if (item.type === "application/pdf"***REMOVED*** {
          evt.dataTransfer.dropEffect = evt.dataTransfer.effectAllowed === "copy" ? "copy" : "move";
          stopEvent(evt***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***;
    appConfig.mainContainer.addEventListener("drop", function (evt***REMOVED*** {
      if (evt.dataTransfer.files?.[0].type !== "application/pdf"***REMOVED*** {
        return;
      ***REMOVED***
      stopEvent(evt***REMOVED***;
      eventBus.dispatch("fileinputchange", {
        source: this,
        fileInput: evt.dataTransfer
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    if (!AppOptions.get("supportsDocumentFonts"***REMOVED******REMOVED*** {
      AppOptions.set("disableFontFace", true***REMOVED***;
      this.l10n.get("pdfjs-web-fonts-disabled"***REMOVED***.then(msg => {
        console.warn(msg***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (!this.supportsPrinting***REMOVED*** {
      appConfig.toolbar?.print?.classList.add("hidden"***REMOVED***;
      appConfig.secondaryToolbar?.printButton.classList.add("hidden"***REMOVED***;
    ***REMOVED***
    if (!this.supportsFullscreen***REMOVED*** {
      appConfig.secondaryToolbar?.presentationModeButton.classList.add("hidden"***REMOVED***;
    ***REMOVED***
    if (this.supportsIntegratedFind***REMOVED*** {
      appConfig.findBar?.toggleButton?.classList.add("hidden"***REMOVED***;
    ***REMOVED***
    if (file***REMOVED*** {
      this.open({
        url: file
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this._hideViewBookmark(***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  get externalServices(***REMOVED*** {
    return shadow(this, "externalServices", new ExternalServices(***REMOVED******REMOVED***;
  ***REMOVED***,
  get initialized(***REMOVED*** {
    return this._initializedCapability.settled;
  ***REMOVED***,
  get initializedPromise(***REMOVED*** {
    return this._initializedCapability.promise;
  ***REMOVED***,
  updateZoom(steps, scaleFactor, origin***REMOVED*** {
    if (this.pdfViewer.isInPresentationMode***REMOVED*** {
      return;
    ***REMOVED***
    this.pdfViewer.updateScale({
      drawingDelay: AppOptions.get("defaultZoomDelay"***REMOVED***,
      steps,
      scaleFactor,
      origin
    ***REMOVED******REMOVED***;
  ***REMOVED***,
  zoomIn(***REMOVED*** {
    this.updateZoom(1***REMOVED***;
  ***REMOVED***,
  zoomOut(***REMOVED*** {
    this.updateZoom(-1***REMOVED***;
  ***REMOVED***,
  zoomReset(***REMOVED*** {
    if (this.pdfViewer.isInPresentationMode***REMOVED*** {
      return;
    ***REMOVED***
    this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
  ***REMOVED***,
  touchPinchCallback(origin, prevDistance, distance***REMOVED*** {
    if (this.supportsPinchToZoom***REMOVED*** {
      const newScaleFactor = this._accumulateFactor(this.pdfViewer.currentScale, distance / prevDistance, "_touchUnusedFactor"***REMOVED***;
      this.updateZoom(null, newScaleFactor, origin***REMOVED***;
    ***REMOVED*** else {
      const PIXELS_PER_LINE_SCALE = 30;
      const ticks = this._accumulateTicks((distance - prevDistance***REMOVED*** / PIXELS_PER_LINE_SCALE, "_touchUnusedTicks"***REMOVED***;
      this.updateZoom(ticks, null, origin***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  touchPinchEndCallback(***REMOVED*** {
    this._touchUnusedTicks = 0;
    this._touchUnusedFactor = 1;
  ***REMOVED***,
  get pagesCount(***REMOVED*** {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  ***REMOVED***,
  get page(***REMOVED*** {
    return this.pdfViewer.currentPageNumber;
  ***REMOVED***,
  set page(val***REMOVED*** {
    this.pdfViewer.currentPageNumber = val;
  ***REMOVED***,
  get supportsPrinting(***REMOVED*** {
    return PDFPrintServiceFactory.supportsPrinting;
  ***REMOVED***,
  get supportsFullscreen(***REMOVED*** {
    return shadow(this, "supportsFullscreen", document.fullscreenEnabled***REMOVED***;
  ***REMOVED***,
  get supportsPinchToZoom(***REMOVED*** {
    return shadow(this, "supportsPinchToZoom", AppOptions.get("supportsPinchToZoom"***REMOVED******REMOVED***;
  ***REMOVED***,
  get supportsIntegratedFind(***REMOVED*** {
    return shadow(this, "supportsIntegratedFind", AppOptions.get("supportsIntegratedFind"***REMOVED******REMOVED***;
  ***REMOVED***,
  get loadingBar(***REMOVED*** {
    const barElement = document.getElementById("loadingBar"***REMOVED***;
    const bar = barElement ? new ProgressBar(barElement***REMOVED*** : null;
    return shadow(this, "loadingBar", bar***REMOVED***;
  ***REMOVED***,
  get supportsMouseWheelZoomCtrlKey(***REMOVED*** {
    return shadow(this, "supportsMouseWheelZoomCtrlKey", AppOptions.get("supportsMouseWheelZoomCtrlKey"***REMOVED******REMOVED***;
  ***REMOVED***,
  get supportsMouseWheelZoomMetaKey(***REMOVED*** {
    return shadow(this, "supportsMouseWheelZoomMetaKey", AppOptions.get("supportsMouseWheelZoomMetaKey"***REMOVED******REMOVED***;
  ***REMOVED***,
  get supportsCaretBrowsingMode(***REMOVED*** {
    return AppOptions.get("supportsCaretBrowsingMode"***REMOVED***;
  ***REMOVED***,
  moveCaret(isUp, select***REMOVED*** {
    this._caretBrowsing ||= new CaretBrowsingMode(this._globalAbortController.signal, this.appConfig.mainContainer, this.appConfig.viewerContainer, this.appConfig.toolbar?.container***REMOVED***;
    this._caretBrowsing.moveCaret(isUp, select***REMOVED***;
  ***REMOVED***,
  setTitleUsingUrl(url = "", downloadUrl = null***REMOVED*** {
    this.url = url;
    this.baseUrl = url.split("#", 1***REMOVED***[0];
    if (downloadUrl***REMOVED*** {
      this._downloadUrl = downloadUrl === url ? this.baseUrl : downloadUrl.split("#", 1***REMOVED***[0];
    ***REMOVED***
    if (isDataScheme(url***REMOVED******REMOVED*** {
      this._hideViewBookmark(***REMOVED***;
    ***REMOVED***
    let title = pdfjs_getPdfFilenameFromUrl(url, ""***REMOVED***;
    if (!title***REMOVED*** {
    ***REMOVED***
        title = decodeURIComponent(getFilenameFromUrl(url***REMOVED******REMOVED***;
      ***REMOVED*** catch { ***REMOVED***
    ***REMOVED***
    this.setTitle(title || url***REMOVED***;
  ***REMOVED***,
  setTitle(title = this._title***REMOVED*** {
    this._title = title;
    if (this.isViewerEmbedded***REMOVED*** {
      return;
    ***REMOVED***
    const editorIndicator = this._hasAnnotationEditors && !this.pdfRenderingQueue.printing;
    document.title = `${editorIndicator ? "* " : ""***REMOVED***${title***REMOVED***`;
  ***REMOVED***,
  get _docFilename(***REMOVED*** {
    return this._contentDispositionFilename || pdfjs_getPdfFilenameFromUrl(this.url***REMOVED***;
  ***REMOVED***,
  _hideViewBookmark(***REMOVED*** {
    const {
      secondaryToolbar
    ***REMOVED*** = this.appConfig;
    secondaryToolbar?.viewBookmarkButton.classList.add("hidden"***REMOVED***;
    if (secondaryToolbar?.presentationModeButton.classList.contains("hidden"***REMOVED******REMOVED*** {
      document.getElementById("viewBookmarkSeparator"***REMOVED***?.classList.add("hidden"***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  async close(***REMOVED*** {
    this._unblockDocumentLoadEvent(***REMOVED***;
    this._hideViewBookmark(***REMOVED***;
    if (!this.pdfLoadingTask***REMOVED*** {
      return;
    ***REMOVED***
    if (this.pdfDocument?.annotationStorage.size > 0 && this._annotationStorageModified***REMOVED*** {
    ***REMOVED***
        await this.save(***REMOVED***;
      ***REMOVED*** catch { ***REMOVED***
    ***REMOVED***
    const promises = [];
    promises.push(this.pdfLoadingTask.destroy(***REMOVED******REMOVED***;
    this.pdfLoadingTask = null;
    if (this.pdfDocument***REMOVED*** {
      this.pdfDocument = null;
      this.pdfThumbnailViewer?.setDocument(null***REMOVED***;
      this.pdfViewer.setDocument(null***REMOVED***;
      this.pdfLinkService.setDocument(null***REMOVED***;
      this.pdfDocumentProperties?.setDocument(null***REMOVED***;
    ***REMOVED***
    this.pdfLinkService.externalLinkEnabled = true;
    this.store = null;
    this.isInitialViewSet = false;
    this.url = "";
    this.baseUrl = "";
    this._downloadUrl = "";
    this.documentInfo = null;
    this.metadata = null;
    this._contentDispositionFilename = null;
    this._contentLength = null;
    this._saveInProgress = false;
    this._hasAnnotationEditors = false;
    promises.push(this.pdfScriptingManager.destroyPromise, this.passwordPrompt.close(***REMOVED******REMOVED***;
    this.setTitle(***REMOVED***;
    this.pdfSidebar?.reset(***REMOVED***;
    this.pdfOutlineViewer?.reset(***REMOVED***;
    this.pdfAttachmentViewer?.reset(***REMOVED***;
    this.pdfLayerViewer?.reset(***REMOVED***;
    this.pdfHistory?.reset(***REMOVED***;
    this.findBar?.reset(***REMOVED***;
    this.toolbar?.reset(***REMOVED***;
    this.secondaryToolbar?.reset(***REMOVED***;
    this._PDFBug?.cleanup(***REMOVED***;
    await Promise.all(promises***REMOVED***;
  ***REMOVED***,
  async open(args***REMOVED*** {
    if (this.pdfLoadingTask***REMOVED*** {
      await this.close(***REMOVED***;
    ***REMOVED***
    const workerParams = AppOptions.getAll(OptionKind.WORKER***REMOVED***;
    Object.assign(GlobalWorkerOptions, workerParams***REMOVED***;
    if (args.url***REMOVED*** {
      this.setTitleUsingUrl(args.originalUrl || args.url, args.url***REMOVED***;
    ***REMOVED***
    const apiParams = AppOptions.getAll(OptionKind.API***REMOVED***;
    const loadingTask = getDocument({
      ...apiParams,
      ...args
    ***REMOVED******REMOVED***;
    this.pdfLoadingTask = loadingTask;
    loadingTask.onPassword = (updateCallback, reason***REMOVED*** => {
      if (this.isViewerEmbedded***REMOVED*** {
        this._unblockDocumentLoadEvent(***REMOVED***;
      ***REMOVED***
      this.pdfLinkService.externalLinkEnabled = false;
      this.passwordPrompt.setUpdateCallback(updateCallback, reason***REMOVED***;
      this.passwordPrompt.open(***REMOVED***;
    ***REMOVED***;
    loadingTask.onProgress = ({
      loaded,
      total
    ***REMOVED******REMOVED*** => {
      this.progress(loaded / total***REMOVED***;
    ***REMOVED***;
    return loadingTask.promise.then(pdfDocument => {
      this.load(pdfDocument***REMOVED***;
    ***REMOVED***, reason => {
      if (loadingTask !== this.pdfLoadingTask***REMOVED*** {
        return undefined;
      ***REMOVED***
      let key = "pdfjs-loading-error";
      if (reason instanceof InvalidPDFException***REMOVED*** {
        key = "pdfjs-invalid-file-error";
      ***REMOVED*** else if (reason instanceof MissingPDFException***REMOVED*** {
        key = "pdfjs-missing-file-error";
      ***REMOVED*** else if (reason instanceof UnexpectedResponseException***REMOVED*** {
        key = "pdfjs-unexpected-response-error";
      ***REMOVED***
      return this._documentError(key, {
        message: reason.message
      ***REMOVED******REMOVED***.then((***REMOVED*** => {
        throw reason;
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***,
  async download(***REMOVED*** {
    let data;
  ***REMOVED***
      data = await this.pdfDocument.getData(***REMOVED***;
    ***REMOVED*** catch { ***REMOVED***
    this.downloadManager.download(data, this._downloadUrl, this._docFilename***REMOVED***;
  ***REMOVED***,
  async save(***REMOVED*** {
    if (this._saveInProgress***REMOVED*** {
      return;
    ***REMOVED***
    this._saveInProgress = true;
    await this.pdfScriptingManager.dispatchWillSave(***REMOVED***;
  ***REMOVED***
      const data = await this.pdfDocument.saveDocument(***REMOVED***;
      this.downloadManager.download(data, this._downloadUrl, this._docFilename***REMOVED***;
    ***REMOVED*** catch (reason***REMOVED*** {
      console.error(`Error when saving the document:`, reason***REMOVED***;
      await this.download(***REMOVED***;
    ***REMOVED*** finally {
      await this.pdfScriptingManager.dispatchDidSave(***REMOVED***;
      this._saveInProgress = false;
    ***REMOVED***
    if (this._hasAnnotationEditors***REMOVED*** {
      this.externalServices.reportTelemetry({
        type: "editing",
        data: {
          type: "save",
          stats: this.pdfDocument?.annotationStorage.editorStats
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  async downloadOrSave(***REMOVED*** {
    const {
      classList
    ***REMOVED*** = this.appConfig.appContainer;
    classList.add("wait"***REMOVED***;
    await (this.pdfDocument?.annotationStorage.size > 0 ? this.save(***REMOVED*** : this.download(***REMOVED******REMOVED***;
    classList.remove("wait"***REMOVED***;
  ***REMOVED***,
  async _documentError(key, moreInfo = null***REMOVED*** {
    this._unblockDocumentLoadEvent(***REMOVED***;
    const message = await this._otherError(key || "pdfjs-loading-error", moreInfo***REMOVED***;
    this.eventBus.dispatch("documenterror", {
      source: this,
      message,
      reason: moreInfo?.message ?? null
    ***REMOVED******REMOVED***;
  ***REMOVED***,
  async _otherError(key, moreInfo = null***REMOVED*** {
    const message = await this.l10n.get(key***REMOVED***;
    const moreInfoText = [`PDF.js v${version || "?"***REMOVED*** (build: ${build || "?"***REMOVED******REMOVED***`];
    if (moreInfo***REMOVED*** {
      moreInfoText.push(`Message: ${moreInfo.message***REMOVED***`***REMOVED***;
      if (moreInfo.stack***REMOVED*** {
        moreInfoText.push(`Stack: ${moreInfo.stack***REMOVED***`***REMOVED***;
      ***REMOVED*** else {
        if (moreInfo.filename***REMOVED*** {
          moreInfoText.push(`File: ${moreInfo.filename***REMOVED***`***REMOVED***;
        ***REMOVED***
        if (moreInfo.lineNumber***REMOVED*** {
          moreInfoText.push(`Line: ${moreInfo.lineNumber***REMOVED***`***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    console.error(`${message***REMOVED***\n\n${moreInfoText.join("\n"***REMOVED******REMOVED***`***REMOVED***;
    return message;
  ***REMOVED***,
  progress(level***REMOVED*** {
    const percent = Math.round(level * 100***REMOVED***;
    if (!this.loadingBar || percent <= this.loadingBar.percent***REMOVED*** {
      return;
    ***REMOVED***
    this.loadingBar.percent = percent;
    if (this.pdfDocument?.loadingParams.disableAutoFetch ?? AppOptions.get("disableAutoFetch"***REMOVED******REMOVED*** {
      this.loadingBar.setDisableAutoFetch(***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  load(pdfDocument***REMOVED*** {
    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo(***REMOVED***.then(({
      length
    ***REMOVED******REMOVED*** => {
      this._contentLength = length;
      this.loadingBar?.hide(***REMOVED***;
      firstPagePromise.then((***REMOVED*** => {
        this.eventBus.dispatch("documentloaded", {
          source: this
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    const pageLayoutPromise = pdfDocument.getPageLayout(***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
    const pageModePromise = pdfDocument.getPageMode(***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
    const openActionPromise = pdfDocument.getOpenAction(***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
    this.toolbar?.setPagesCount(pdfDocument.numPages, false***REMOVED***;
    this.secondaryToolbar?.setPagesCount(pdfDocument.numPages***REMOVED***;
    this.pdfLinkService.setDocument(pdfDocument***REMOVED***;
    this.pdfDocumentProperties?.setDocument(pdfDocument***REMOVED***;
    const pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument***REMOVED***;
    const {
      firstPagePromise,
      onePageRendered,
      pagesPromise
    ***REMOVED*** = pdfViewer;
    this.pdfThumbnailViewer?.setDocument(pdfDocument***REMOVED***;
    const storedPromise = (this.store = new ViewHistory(pdfDocument.fingerprints[0]***REMOVED******REMOVED***.getMultiple({
      page: null,
      zoom: DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: SidebarView.UNKNOWN,
      scrollMode: ScrollMode.UNKNOWN,
      spreadMode: SpreadMode.UNKNOWN
    ***REMOVED******REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
    firstPagePromise.then(pdfPage => {
      this.loadingBar?.setWidth(this.appConfig.viewerContainer***REMOVED***;
      this._initializeAnnotationStorageCallbacks(pdfDocument***REMOVED***;
      Promise.all([animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]***REMOVED***.then(async ([timeStamp, stored, pageLayout, pageMode, openAction]***REMOVED*** => {
        const viewOnLoad = AppOptions.get("viewOnLoad"***REMOVED***;
        this._initializePdfHistory({
          fingerprint: pdfDocument.fingerprints[0],
          viewOnLoad,
          initialDest: openAction?.dest
        ***REMOVED******REMOVED***;
        const initialBookmark = this.initialBookmark;
        const zoom = AppOptions.get("defaultZoomValue"***REMOVED***;
        let hash = zoom ? `zoom=${zoom***REMOVED***` : null;
        let rotation = null;
        let sidebarView = AppOptions.get("sidebarViewOnLoad"***REMOVED***;
        let scrollMode = AppOptions.get("scrollModeOnLoad"***REMOVED***;
        let spreadMode = AppOptions.get("spreadModeOnLoad"***REMOVED***;
        if (stored?.page && viewOnLoad !== ViewOnLoad.INITIAL***REMOVED*** {
          hash = `page=${stored.page***REMOVED***&zoom=${zoom || stored.zoom***REMOVED***,` + `${stored.scrollLeft***REMOVED***,${stored.scrollTop***REMOVED***`;
          rotation = parseInt(stored.rotation, 10***REMOVED***;
          if (sidebarView === SidebarView.UNKNOWN***REMOVED*** {
            sidebarView = stored.sidebarView | 0;
          ***REMOVED***
          if (scrollMode === ScrollMode.UNKNOWN***REMOVED*** {
            scrollMode = stored.scrollMode | 0;
          ***REMOVED***
          if (spreadMode === SpreadMode.UNKNOWN***REMOVED*** {
            spreadMode = stored.spreadMode | 0;
          ***REMOVED***
        ***REMOVED***
        if (pageMode && sidebarView === SidebarView.UNKNOWN***REMOVED*** {
          sidebarView = apiPageModeToSidebarView(pageMode***REMOVED***;
        ***REMOVED***
        if (pageLayout && scrollMode === ScrollMode.UNKNOWN && spreadMode === SpreadMode.UNKNOWN***REMOVED*** {
          const modes = apiPageLayoutToViewerModes(pageLayout***REMOVED***;
          spreadMode = modes.spreadMode;
        ***REMOVED***
        this.setInitialView(hash, {
          rotation,
          sidebarView,
          scrollMode,
          spreadMode
        ***REMOVED******REMOVED***;
        this.eventBus.dispatch("documentinit", {
          source: this
        ***REMOVED******REMOVED***;
        if (!this.isViewerEmbedded***REMOVED*** {
          pdfViewer.focus(***REMOVED***;
        ***REMOVED***
        await Promise.race([pagesPromise, new Promise(resolve => {
          setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT***REMOVED***;
        ***REMOVED******REMOVED***]***REMOVED***;
        if (!initialBookmark && !hash***REMOVED*** {
          return;
        ***REMOVED***
        if (pdfViewer.hasEqualPageSizes***REMOVED*** {
          return;
        ***REMOVED***
        this.initialBookmark = initialBookmark;
        pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
        this.setInitialView(hash***REMOVED***;
      ***REMOVED******REMOVED***.catch((***REMOVED*** => {
        this.setInitialView(***REMOVED***;
      ***REMOVED******REMOVED***.then(function (***REMOVED*** {
        pdfViewer.update(***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    pagesPromise.then((***REMOVED*** => {
      this._unblockDocumentLoadEvent(***REMOVED***;
      this._initializeAutoPrint(pdfDocument, openActionPromise***REMOVED***;
    ***REMOVED***, reason => {
      this._documentError("pdfjs-loading-error", {
        message: reason.message
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    onePageRendered.then(data => {
      this.externalServices.reportTelemetry({
        type: "pageInfo",
        timestamp: data.timestamp
      ***REMOVED******REMOVED***;
      if (this.pdfOutlineViewer***REMOVED*** {
        pdfDocument.getOutline(***REMOVED***.then(outline => {
          if (pdfDocument !== this.pdfDocument***REMOVED*** {
            return;
          ***REMOVED***
          this.pdfOutlineViewer.render({
            outline,
            pdfDocument
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (this.pdfAttachmentViewer***REMOVED*** {
        pdfDocument.getAttachments(***REMOVED***.then(attachments => {
          if (pdfDocument !== this.pdfDocument***REMOVED*** {
            return;
          ***REMOVED***
          this.pdfAttachmentViewer.render({
            attachments
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (this.pdfLayerViewer***REMOVED*** {
        pdfViewer.optionalContentConfigPromise.then(optionalContentConfig => {
          if (pdfDocument !== this.pdfDocument***REMOVED*** {
            return;
          ***REMOVED***
          this.pdfLayerViewer.render({
            optionalContentConfig,
            pdfDocument
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    this._initializePageLabels(pdfDocument***REMOVED***;
    this._initializeMetadata(pdfDocument***REMOVED***;
  ***REMOVED***,
  async _scriptingDocProperties(pdfDocument***REMOVED*** {
    if (!this.documentInfo***REMOVED*** {
      await new Promise(resolve => {
        this.eventBus._on("metadataloaded", resolve, {
          once: true
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
      if (pdfDocument !== this.pdfDocument***REMOVED*** {
        return null;
      ***REMOVED***
    ***REMOVED***
    if (!this._contentLength***REMOVED*** {
      await new Promise(resolve => {
        this.eventBus._on("documentloaded", resolve, {
          once: true
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
      if (pdfDocument !== this.pdfDocument***REMOVED*** {
        return null;
      ***REMOVED***
    ***REMOVED***
***REMOVED***
      ...this.documentInfo,
      baseURL: this.baseUrl,
      filesize: this._contentLength,
      filename: this._docFilename,
      metadata: this.metadata?.getRaw(***REMOVED***,
      authors: this.metadata?.get("dc:creator"***REMOVED***,
      numPages: this.pagesCount,
      URL: this.url
    ***REMOVED***;
  ***REMOVED***,
  async _initializeAutoPrint(pdfDocument, openActionPromise***REMOVED*** {
    const [openAction, jsActions] = await Promise.all([openActionPromise, this.pdfViewer.enableScripting ? null : pdfDocument.getJSActions(***REMOVED***]***REMOVED***;
    if (pdfDocument !== this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    let triggerAutoPrint = openAction?.action === "Print";
    if (jsActions***REMOVED*** {
      console.warn("Warning: JavaScript support is not enabled"***REMOVED***;
      for (const name in jsActions***REMOVED*** {
        if (triggerAutoPrint***REMOVED*** {
          break;
        ***REMOVED***
        switch (name***REMOVED*** {
          case "WillClose":
          case "WillSave":
          case "DidSave":
          case "WillPrint":
          case "DidPrint":
            continue;
        ***REMOVED***
        triggerAutoPrint = jsActions[name].some(js => AutoPrintRegExp.test(js***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (triggerAutoPrint***REMOVED*** {
      this.triggerPrinting(***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  async _initializeMetadata(pdfDocument***REMOVED*** {
    const {
      info,
      metadata,
      contentDispositionFilename,
      contentLength
    ***REMOVED*** = await pdfDocument.getMetadata(***REMOVED***;
    if (pdfDocument !== this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this.documentInfo = info;
    this.metadata = metadata;
    this._contentDispositionFilename ??= contentDispositionFilename;
    this._contentLength ??= contentLength;
    console.log(`PDF ${pdfDocument.fingerprints[0]***REMOVED*** [${info.PDFFormatVersion***REMOVED*** ` + `${(info.Producer || "-"***REMOVED***.trim(***REMOVED******REMOVED*** / ${(info.Creator || "-"***REMOVED***.trim(***REMOVED******REMOVED***] ` + `(PDF.js: ${version || "?"***REMOVED*** [${build || "?"***REMOVED***]***REMOVED***`***REMOVED***;
    let pdfTitle = info.Title;
    const metadataTitle = metadata?.get("dc:title"***REMOVED***;
    if (metadataTitle***REMOVED*** {
      if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle***REMOVED******REMOVED*** {
        pdfTitle = metadataTitle;
      ***REMOVED***
    ***REMOVED***
    if (pdfTitle***REMOVED*** {
      this.setTitle(`${pdfTitle***REMOVED*** - ${this._contentDispositionFilename || this._title***REMOVED***`***REMOVED***;
    ***REMOVED*** else if (this._contentDispositionFilename***REMOVED*** {
      this.setTitle(this._contentDispositionFilename***REMOVED***;
    ***REMOVED***
    if (info.IsXFAPresent && !info.IsAcroFormPresent && !pdfDocument.isPureXfa***REMOVED*** {
      if (pdfDocument.loadingParams.enableXfa***REMOVED*** {
        console.warn("Warning: XFA Foreground documents are not supported"***REMOVED***;
      ***REMOVED*** else {
        console.warn("Warning: XFA support is not enabled"***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if ((info.IsAcroFormPresent || info.IsXFAPresent***REMOVED*** && !this.pdfViewer.renderForms***REMOVED*** {
      console.warn("Warning: Interactive form support is not enabled"***REMOVED***;
    ***REMOVED***
    if (info.IsSignaturesPresent***REMOVED*** {
      console.warn("Warning: Digital signatures validation is not supported"***REMOVED***;
    ***REMOVED***
    this.eventBus.dispatch("metadataloaded", {
      source: this
    ***REMOVED******REMOVED***;
  ***REMOVED***,
  async _initializePageLabels(pdfDocument***REMOVED*** {
    const labels = await pdfDocument.getPageLabels(***REMOVED***;
    if (pdfDocument !== this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    if (!labels || AppOptions.get("disablePageLabels"***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    const numLabels = labels.length;
    let standardLabels = 0,
      emptyLabels = 0;
    for (let i = 0; i < numLabels; i++***REMOVED*** {
      const label = labels[i];
      if (label === (i + 1***REMOVED***.toString(***REMOVED******REMOVED*** {
        standardLabels++;
      ***REMOVED*** else if (label === ""***REMOVED*** {
        emptyLabels++;
      ***REMOVED*** else {
        break;
      ***REMOVED***
    ***REMOVED***
    if (standardLabels >= numLabels || emptyLabels >= numLabels***REMOVED*** {
      return;
    ***REMOVED***
    const {
      pdfViewer,
      pdfThumbnailViewer,
      toolbar
    ***REMOVED*** = this;
    pdfViewer.setPageLabels(labels***REMOVED***;
    pdfThumbnailViewer?.setPageLabels(labels***REMOVED***;
    toolbar?.setPagesCount(numLabels, true***REMOVED***;
    toolbar?.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel***REMOVED***;
  ***REMOVED***,
  _initializePdfHistory({
    fingerprint,
    viewOnLoad,
    initialDest = null
  ***REMOVED******REMOVED*** {
    if (!this.pdfHistory***REMOVED*** {
      return;
    ***REMOVED***
    this.pdfHistory.initialize({
      fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: AppOptions.get("historyUpdateUrl"***REMOVED***
    ***REMOVED******REMOVED***;
    if (this.pdfHistory.initialBookmark***REMOVED*** {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    ***REMOVED***
    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN***REMOVED*** {
      this.initialBookmark = JSON.stringify(initialDest***REMOVED***;
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  _initializeAnnotationStorageCallbacks(pdfDocument***REMOVED*** {
    if (pdfDocument !== this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    const {
      annotationStorage
    ***REMOVED*** = pdfDocument;
    annotationStorage.onSetModified = (***REMOVED*** => {
      window.addEventListener("beforeunload", beforeUnload***REMOVED***;
      this._annotationStorageModified = true;
    ***REMOVED***;
    annotationStorage.onResetModified = (***REMOVED*** => {
      window.removeEventListener("beforeunload", beforeUnload***REMOVED***;
      delete this._annotationStorageModified;
    ***REMOVED***;
    annotationStorage.onAnnotationEditor = typeStr => {
      this._hasAnnotationEditors = !!typeStr;
      this.setTitle(***REMOVED***;
    ***REMOVED***;
  ***REMOVED***,
  setInitialView(storedHash, {
    rotation,
    sidebarView,
    scrollMode,
    spreadMode
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const setRotation = angle => {
      if (isValidRotation(angle***REMOVED******REMOVED*** {
        this.pdfViewer.pagesRotation = angle;
      ***REMOVED***
    ***REMOVED***;
    const setViewerModes = (scroll, spread***REMOVED*** => {
      if (isValidScrollMode(scroll***REMOVED******REMOVED*** {
        this.pdfViewer.scrollMode = scroll;
      ***REMOVED***
      if (isValidSpreadMode(spread***REMOVED******REMOVED*** {
        this.pdfViewer.spreadMode = spread;
      ***REMOVED***
    ***REMOVED***;
    this.isInitialViewSet = true;
    this.pdfSidebar?.setInitialView(sidebarView***REMOVED***;
    setViewerModes(scrollMode, spreadMode***REMOVED***;
    if (this.initialBookmark***REMOVED*** {
      setRotation(this.initialRotation***REMOVED***;
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark***REMOVED***;
      this.initialBookmark = null;
    ***REMOVED*** else if (storedHash***REMOVED*** {
      setRotation(rotation***REMOVED***;
      this.pdfLinkService.setHash(storedHash***REMOVED***;
    ***REMOVED***
    this.toolbar?.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel***REMOVED***;
    this.secondaryToolbar?.setPageNumber(this.pdfViewer.currentPageNumber***REMOVED***;
    if (!this.pdfViewer.currentScaleValue***REMOVED*** {
      this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    ***REMOVED***
  ***REMOVED***,
  _cleanup(***REMOVED*** {
    if (!this.pdfDocument***REMOVED*** {
      return;
    ***REMOVED***
    this.pdfViewer.cleanup(***REMOVED***;
    this.pdfThumbnailViewer?.cleanup(***REMOVED***;
    this.pdfDocument.cleanup(AppOptions.get("fontExtraProperties"***REMOVED******REMOVED***;
  ***REMOVED***,
  forceRendering(***REMOVED*** {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar?.visibleView === SidebarView.THUMBS;
    this.pdfRenderingQueue.renderHighestPriority(***REMOVED***;
  ***REMOVED***,
  beforePrint(***REMOVED*** {
    this._printAnnotationStoragePromise = this.pdfScriptingManager.dispatchWillPrint(***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***.then((***REMOVED*** => this.pdfDocument?.annotationStorage.print***REMOVED***;
    if (this.printService***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.supportsPrinting***REMOVED*** {
      this._otherError("pdfjs-printing-not-supported"***REMOVED***;
      return;
    ***REMOVED***
    if (!this.pdfViewer.pageViewsReady***REMOVED*** {
      this.l10n.get("pdfjs-printing-not-ready"***REMOVED***.then(msg => {
        window.alert(msg***REMOVED***;
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    this.printService = PDFPrintServiceFactory.createPrintService({
      pdfDocument: this.pdfDocument,
      pagesOverview: this.pdfViewer.getPagesOverview(***REMOVED***,
      printContainer: this.appConfig.printContainer,
      printResolution: AppOptions.get("printResolution"***REMOVED***,
      printAnnotationStoragePromise: this._printAnnotationStoragePromise
    ***REMOVED******REMOVED***;
    this.forceRendering(***REMOVED***;
    this.setTitle(***REMOVED***;
    this.printService.layout(***REMOVED***;
    if (this._hasAnnotationEditors***REMOVED*** {
      this.externalServices.reportTelemetry({
        type: "editing",
        data: {
          type: "print",
          stats: this.pdfDocument?.annotationStorage.editorStats
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  afterPrint(***REMOVED*** {
    if (this._printAnnotationStoragePromise***REMOVED*** {
      this._printAnnotationStoragePromise.then((***REMOVED*** => {
        this.pdfScriptingManager.dispatchDidPrint(***REMOVED***;
      ***REMOVED******REMOVED***;
      this._printAnnotationStoragePromise = null;
    ***REMOVED***
    if (this.printService***REMOVED*** {
      this.printService.destroy(***REMOVED***;
      this.printService = null;
      this.pdfDocument?.annotationStorage.resetModified(***REMOVED***;
    ***REMOVED***
    this.forceRendering(***REMOVED***;
    this.setTitle(***REMOVED***;
  ***REMOVED***,
  rotatePages(delta***REMOVED*** {
    this.pdfViewer.pagesRotation += delta;
  ***REMOVED***,
  requestPresentationMode(***REMOVED*** {
    this.pdfPresentationMode?.request(***REMOVED***;
  ***REMOVED***,
  triggerPrinting(***REMOVED*** {
    if (this.supportsPrinting***REMOVED*** {
      window.print(***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
  bindEvents(***REMOVED*** {
    if (this._eventBusAbortController***REMOVED*** {
      return;
    ***REMOVED***
    const ac = this._eventBusAbortController = new AbortController(***REMOVED***;
    const opts = {
      signal: ac.signal
    ***REMOVED***;
    const {
      eventBus,
      externalServices,
      pdfDocumentProperties,
      pdfViewer,
      preferences
    ***REMOVED*** = this;
    eventBus._on("resize", onResize.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("hashchange", onHashchange.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("beforeprint", this.beforePrint.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("afterprint", this.afterPrint.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("pagerender", onPageRender.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("pagerendered", onPageRendered.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("updateviewarea", onUpdateViewarea.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("pagechanging", onPageChanging.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("scalechanging", onScaleChanging.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("rotationchanging", onRotationChanging.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("sidebarviewchanged", onSidebarViewChanged.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("pagemode", onPageMode.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("namedaction", onNamedAction.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("presentationmodechanged", evt => pdfViewer.presentationModeState = evt.state, opts***REMOVED***;
    eventBus._on("presentationmode", this.requestPresentationMode.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("switchannotationeditormode", evt => pdfViewer.annotationEditorMode = evt, opts***REMOVED***;
    eventBus._on("print", this.triggerPrinting.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("download", this.downloadOrSave.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("firstpage", (***REMOVED*** => this.page = 1, opts***REMOVED***;
    eventBus._on("lastpage", (***REMOVED*** => this.page = this.pagesCount, opts***REMOVED***;
    eventBus._on("nextpage", (***REMOVED*** => pdfViewer.nextPage(***REMOVED***, opts***REMOVED***;
    eventBus._on("previouspage", (***REMOVED*** => pdfViewer.previousPage(***REMOVED***, opts***REMOVED***;
    eventBus._on("zoomin", this.zoomIn.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("zoomout", this.zoomOut.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("zoomreset", this.zoomReset.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("pagenumberchanged", onPageNumberChanged.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("scalechanged", evt => pdfViewer.currentScaleValue = evt.value, opts***REMOVED***;
    eventBus._on("rotatecw", this.rotatePages.bind(this, 90***REMOVED***, opts***REMOVED***;
    eventBus._on("rotateccw", this.rotatePages.bind(this, -90***REMOVED***, opts***REMOVED***;
    eventBus._on("optionalcontentconfig", evt => pdfViewer.optionalContentConfigPromise = evt.promise, opts***REMOVED***;
    eventBus._on("switchscrollmode", evt => pdfViewer.scrollMode = evt.mode, opts***REMOVED***;
    eventBus._on("scrollmodechanged", onViewerModesChanged.bind(this, "scrollMode"***REMOVED***, opts***REMOVED***;
    eventBus._on("switchspreadmode", evt => pdfViewer.spreadMode = evt.mode, opts***REMOVED***;
    eventBus._on("spreadmodechanged", onViewerModesChanged.bind(this, "spreadMode"***REMOVED***, opts***REMOVED***;
    eventBus._on("imagealttextsettings", onImageAltTextSettings.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("documentproperties", (***REMOVED*** => pdfDocumentProperties?.open(***REMOVED***, opts***REMOVED***;
    eventBus._on("findfromurlhash", onFindFromUrlHash.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("updatefindmatchescount", onUpdateFindMatchesCount.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("updatefindcontrolstate", onUpdateFindControlState.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("fileinputchange", onFileInputChange.bind(this***REMOVED***, opts***REMOVED***;
    eventBus._on("openfile", onOpenFile.bind(this***REMOVED***, opts***REMOVED***;
  ***REMOVED***,
  bindWindowEvents(***REMOVED*** {
    if (this._windowAbortController***REMOVED*** {
      return;
    ***REMOVED***
    this._windowAbortController = new AbortController(***REMOVED***;
    const {
      eventBus,
      appConfig: {
        mainContainer
      ***REMOVED***,
      pdfViewer,
      _windowAbortController: {
        signal
      ***REMOVED***
    ***REMOVED*** = this;
    if (typeof AbortSignal.any === "function"***REMOVED*** {
      this._touchManager = new TouchManager({
        container: window,
        isPinchingDisabled: (***REMOVED*** => pdfViewer.isInPresentationMode,
        isPinchingStopped: (***REMOVED*** => this.overlayManager?.active,
        onPinching: this.touchPinchCallback.bind(this***REMOVED***,
        onPinchEnd: this.touchPinchEndCallback.bind(this***REMOVED***,
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    function addWindowResolutionChange(evt = null***REMOVED*** {
      if (evt***REMOVED*** {
        pdfViewer.refresh(***REMOVED***;
      ***REMOVED***
      const mediaQueryList = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1***REMOVED***dppx***REMOVED***`***REMOVED***;
      mediaQueryList.addEventListener("change", addWindowResolutionChange, {
        once: true,
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    addWindowResolutionChange(***REMOVED***;
    window.addEventListener("wheel", onWheel.bind(this***REMOVED***, {
      passive: false,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("click", onClick.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("keydown", onKeyDown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("keyup", onKeyUp.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("resize", (***REMOVED*** => eventBus.dispatch("resize", {
      source: window
    ***REMOVED******REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("hashchange", (***REMOVED*** => {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("beforeprint", (***REMOVED*** => eventBus.dispatch("beforeprint", {
      source: window
    ***REMOVED******REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("afterprint", (***REMOVED*** => eventBus.dispatch("afterprint", {
      source: window
    ***REMOVED******REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("updatefromsandbox", evt => {
      eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: evt.detail
      ***REMOVED******REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    if (!("onscrollend" in document.documentElement***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    ({
      scrollTop: this._lastScrollTop,
      scrollLeft: this._lastScrollLeft
    ***REMOVED*** = mainContainer***REMOVED***;
    const scrollend = (***REMOVED*** => {
      ({
        scrollTop: this._lastScrollTop,
        scrollLeft: this._lastScrollLeft
      ***REMOVED*** = mainContainer***REMOVED***;
      this._isScrolling = false;
      mainContainer.addEventListener("scroll", scroll, {
        passive: true,
        signal
      ***REMOVED******REMOVED***;
      mainContainer.removeEventListener("scrollend", scrollend***REMOVED***;
      mainContainer.removeEventListener("blur", scrollend***REMOVED***;
    ***REMOVED***;
    const scroll = (***REMOVED*** => {
      if (this._isCtrlKeyDown***REMOVED*** {
        return;
      ***REMOVED***
      if (this._lastScrollTop === mainContainer.scrollTop && this._lastScrollLeft === mainContainer.scrollLeft***REMOVED*** {
        return;
      ***REMOVED***
      mainContainer.removeEventListener("scroll", scroll***REMOVED***;
      this._isScrolling = true;
      mainContainer.addEventListener("scrollend", scrollend, {
        signal
      ***REMOVED******REMOVED***;
      mainContainer.addEventListener("blur", scrollend, {
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    mainContainer.addEventListener("scroll", scroll, {
      passive: true,
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***,
  unbindEvents(***REMOVED*** {
    this._eventBusAbortController?.abort(***REMOVED***;
    this._eventBusAbortController = null;
  ***REMOVED***,
  unbindWindowEvents(***REMOVED*** {
    this._windowAbortController?.abort(***REMOVED***;
    this._windowAbortController = null;
    this._touchManager = null;
  ***REMOVED***,
  async testingClose(***REMOVED*** {
    this.unbindEvents(***REMOVED***;
    this.unbindWindowEvents(***REMOVED***;
    this._globalAbortController?.abort(***REMOVED***;
    this._globalAbortController = null;
    this.findBar?.close(***REMOVED***;
    await Promise.all([this.l10n?.destroy(***REMOVED***, this.close(***REMOVED***]***REMOVED***;
  ***REMOVED***,
  _accumulateTicks(ticks, prop***REMOVED*** {
    if (this[prop] > 0 && ticks < 0 || this[prop] < 0 && ticks > 0***REMOVED*** {
      this[prop] = 0;
    ***REMOVED***
    this[prop] += ticks;
    const wholeTicks = Math.trunc(this[prop]***REMOVED***;
    this[prop] -= wholeTicks;
    return wholeTicks;
  ***REMOVED***,
  _accumulateFactor(previousScale, factor, prop***REMOVED*** {
    if (factor === 1***REMOVED*** {
      return 1;
    ***REMOVED***
    if (this[prop] > 1 && factor < 1 || this[prop] < 1 && factor > 1***REMOVED*** {
      this[prop] = 1;
    ***REMOVED***
    const newFactor = Math.floor(previousScale * factor * this[prop] * 100***REMOVED*** / (100 * previousScale***REMOVED***;
    this[prop] = factor / newFactor;
    return newFactor;
  ***REMOVED***,
  _unblockDocumentLoadEvent(***REMOVED*** {
    document.blockUnblockOnload?.(false***REMOVED***;
    this._unblockDocumentLoadEvent = (***REMOVED*** => { ***REMOVED***;
  ***REMOVED***,
  get scriptingReady(***REMOVED*** {
    return this.pdfScriptingManager.ready;
  ***REMOVED***
***REMOVED***;
initCom(PDFViewerApplication***REMOVED***;
{
  PDFPrintServiceFactory.initGlobals(PDFViewerApplication***REMOVED***;
***REMOVED***
{
  const HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];
  var validateFileURL = function (file***REMOVED*** {
    if (!file***REMOVED*** {
      return;
    ***REMOVED***
  ***REMOVED***
      const viewerOrigin = new URL(window.location.href***REMOVED***.origin || "null";
      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin***REMOVED******REMOVED*** {
        return;
      ***REMOVED***
      const fileOrigin = new URL(file, window.location.href***REMOVED***.origin;
      // if (fileOrigin !== viewerOrigin***REMOVED*** {
      //   throw new Error("file origin does not match viewer's"***REMOVED***;
      // ***REMOVED***
    ***REMOVED*** catch (ex***REMOVED*** {
      PDFViewerApplication._documentError("pdfjs-loading-error", {
        message: ex.message
      ***REMOVED******REMOVED***;
      throw ex;
    ***REMOVED***
  ***REMOVED***;
  var onFileInputChange = function (evt***REMOVED*** {
    if (this.pdfViewer?.isInPresentationMode***REMOVED*** {
      return;
    ***REMOVED***
    const file = evt.fileInput.files[0];
    this.open({
      url: URL.createObjectURL(file***REMOVED***,
      originalUrl: file.name
    ***REMOVED******REMOVED***;
  ***REMOVED***;
  var onOpenFile = function (evt***REMOVED*** {
    this._openFileInput?.click(***REMOVED***;
  ***REMOVED***;
***REMOVED***
function onPageRender({
  pageNumber
***REMOVED******REMOVED*** {
  if (pageNumber === this.page***REMOVED*** {
    this.toolbar?.updateLoadingIndicatorState(true***REMOVED***;
  ***REMOVED***
***REMOVED***
function onPageRendered({
  pageNumber,
  error
***REMOVED******REMOVED*** {
  if (pageNumber === this.page***REMOVED*** {
    this.toolbar?.updateLoadingIndicatorState(false***REMOVED***;
  ***REMOVED***
  if (this.pdfSidebar?.visibleView === SidebarView.THUMBS***REMOVED*** {
    const pageView = this.pdfViewer.getPageView(pageNumber - 1***REMOVED***;
    const thumbnailView = this.pdfThumbnailViewer?.getThumbnail(pageNumber - 1***REMOVED***;
    if (pageView***REMOVED*** {
      thumbnailView?.setImage(pageView***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  if (error***REMOVED*** {
    this._otherError("pdfjs-rendering-error", error***REMOVED***;
  ***REMOVED***
***REMOVED***
function onPageMode({
  mode
***REMOVED******REMOVED*** {
  let view;
  switch (mode***REMOVED*** {
    case "thumbs":
      view = SidebarView.THUMBS;
      break;
    case "bookmarks":
    case "outline":
      view = SidebarView.OUTLINE;
      break;
    case "attachments":
      view = SidebarView.ATTACHMENTS;
      break;
    case "layers":
      view = SidebarView.LAYERS;
      break;
    case "none":
      view = SidebarView.NONE;
      break;
    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode***REMOVED***;
      return;
  ***REMOVED***
  this.pdfSidebar?.switchView(view, true***REMOVED***;
***REMOVED***
function onNamedAction(evt***REMOVED*** {
  switch (evt.action***REMOVED*** {
    case "GoToPage":
      this.appConfig.toolbar?.pageNumber.select(***REMOVED***;
      break;
    case "Find":
      if (!this.supportsIntegratedFind***REMOVED*** {
        this.findBar?.toggle(***REMOVED***;
      ***REMOVED***
      break;
    case "Print":
      this.triggerPrinting(***REMOVED***;
      break;
    case "SaveAs":
      this.downloadOrSave(***REMOVED***;
      break;
  ***REMOVED***
***REMOVED***
function onSidebarViewChanged({
  view
***REMOVED******REMOVED*** {
  this.pdfRenderingQueue.isThumbnailViewEnabled = view === SidebarView.THUMBS;
  if (this.isInitialViewSet***REMOVED*** {
    this.store?.set("sidebarView", view***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
function onUpdateViewarea({
  location
***REMOVED******REMOVED*** {
  if (this.isInitialViewSet***REMOVED*** {
    this.store?.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    ***REMOVED******REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
  ***REMOVED***
  if (this.appConfig.secondaryToolbar***REMOVED*** {
    this.appConfig.secondaryToolbar.viewBookmarkButton.href = this.pdfLinkService.getAnchorUrl(location.pdfOpenParams***REMOVED***;
  ***REMOVED***
***REMOVED***
function onViewerModesChanged(name, evt***REMOVED*** {
  if (this.isInitialViewSet && !this.pdfViewer.isInPresentationMode***REMOVED*** {
    this.store?.set(name, evt.mode***REMOVED***.catch((***REMOVED*** => { ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
function onResize(***REMOVED*** {
  const {
    pdfDocument,
    pdfViewer,
    pdfRenderingQueue
  ***REMOVED*** = this;
  if (pdfRenderingQueue.printing && window.matchMedia("print"***REMOVED***.matches***REMOVED*** {
    return;
  ***REMOVED***
  if (!pdfDocument***REMOVED*** {
    return;
  ***REMOVED***
  const currentScaleValue = pdfViewer.currentScaleValue;
  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width"***REMOVED*** {
    pdfViewer.currentScaleValue = currentScaleValue;
  ***REMOVED***
  pdfViewer.update(***REMOVED***;
***REMOVED***
function onHashchange(evt***REMOVED*** {
  const hash = evt.hash;
  if (!hash***REMOVED*** {
    return;
  ***REMOVED***
  if (!this.isInitialViewSet***REMOVED*** {
    this.initialBookmark = hash;
  ***REMOVED*** else if (!this.pdfHistory?.popStateInProgress***REMOVED*** {
    this.pdfLinkService.setHash(hash***REMOVED***;
  ***REMOVED***
***REMOVED***
function onPageNumberChanged(evt***REMOVED*** {
  const {
    pdfViewer
  ***REMOVED*** = this;
  if (evt.value !== ""***REMOVED*** {
    this.pdfLinkService.goToPage(evt.value***REMOVED***;
  ***REMOVED***
  if (evt.value !== pdfViewer.currentPageNumber.toString(***REMOVED*** && evt.value !== pdfViewer.currentPageLabel***REMOVED*** {
    this.toolbar?.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel***REMOVED***;
  ***REMOVED***
***REMOVED***
function onImageAltTextSettings(***REMOVED*** {
  this.imageAltTextSettings?.open({
    enableGuessAltText: AppOptions.get("enableGuessAltText"***REMOVED***,
    enableNewAltTextWhenAddingImage: AppOptions.get("enableNewAltTextWhenAddingImage"***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***
function onFindFromUrlHash(evt***REMOVED*** {
  this.eventBus.dispatch("find", {
    source: evt.source,
    type: "",
    query: evt.query,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false,
    matchDiacritics: true
  ***REMOVED******REMOVED***;
***REMOVED***
function onUpdateFindMatchesCount({
  matchesCount
***REMOVED******REMOVED*** {
  if (this.supportsIntegratedFind***REMOVED*** {
    this.externalServices.updateFindMatchesCount(matchesCount***REMOVED***;
  ***REMOVED*** else {
    this.findBar?.updateResultsCount(matchesCount***REMOVED***;
  ***REMOVED***
***REMOVED***
function onUpdateFindControlState({
  state,
  previous,
  entireWord,
  matchesCount,
  rawQuery
***REMOVED******REMOVED*** {
  if (this.supportsIntegratedFind***REMOVED*** {
    this.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      entireWord,
      matchesCount,
      rawQuery
    ***REMOVED******REMOVED***;
  ***REMOVED*** else {
    this.findBar?.updateUIState(state, previous, matchesCount***REMOVED***;
  ***REMOVED***
***REMOVED***
function onScaleChanging(evt***REMOVED*** {
  this.toolbar?.setPageScale(evt.presetValue, evt.scale***REMOVED***;
  this.pdfViewer.update(***REMOVED***;
***REMOVED***
function onRotationChanging(evt***REMOVED*** {
  if (this.pdfThumbnailViewer***REMOVED*** {
    this.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  ***REMOVED***
  this.forceRendering(***REMOVED***;
  this.pdfViewer.currentPageNumber = evt.pageNumber;
***REMOVED***
function onPageChanging({
  pageNumber,
  pageLabel
***REMOVED******REMOVED*** {
  this.toolbar?.setPageNumber(pageNumber, pageLabel***REMOVED***;
  this.secondaryToolbar?.setPageNumber(pageNumber***REMOVED***;
  if (this.pdfSidebar?.visibleView === SidebarView.THUMBS***REMOVED*** {
    this.pdfThumbnailViewer?.scrollThumbnailIntoView(pageNumber***REMOVED***;
  ***REMOVED***
  const currentPage = this.pdfViewer.getPageView(pageNumber - 1***REMOVED***;
  this.toolbar?.updateLoadingIndicatorState(currentPage?.renderingState === RenderingStates.RUNNING***REMOVED***;
***REMOVED***
function onWheel(evt***REMOVED*** {
  const {
    pdfViewer,
    supportsMouseWheelZoomCtrlKey,
    supportsMouseWheelZoomMetaKey,
    supportsPinchToZoom
  ***REMOVED*** = this;
  if (pdfViewer.isInPresentationMode***REMOVED*** {
    return;
  ***REMOVED***
  const deltaMode = evt.deltaMode;
  let scaleFactor = Math.exp(-evt.deltaY / 100***REMOVED***;
  const isBuiltInMac = false;
  const isPinchToZoom = evt.ctrlKey && !this._isCtrlKeyDown && deltaMode === WheelEvent.DOM_DELTA_PIXEL && evt.deltaX === 0 && (Math.abs(scaleFactor - 1***REMOVED*** < 0.05 || isBuiltInMac***REMOVED*** && evt.deltaZ === 0;
  const origin = [evt.clientX, evt.clientY];
  if (isPinchToZoom || evt.ctrlKey && supportsMouseWheelZoomCtrlKey || evt.metaKey && supportsMouseWheelZoomMetaKey***REMOVED*** {
    evt.preventDefault(***REMOVED***;
    if (this._isScrolling || document.visibilityState === "hidden" || this.overlayManager.active***REMOVED*** {
      return;
    ***REMOVED***
    if (isPinchToZoom && supportsPinchToZoom***REMOVED*** {
      scaleFactor = this._accumulateFactor(pdfViewer.currentScale, scaleFactor, "_wheelUnusedFactor"***REMOVED***;
      this.updateZoom(null, scaleFactor, origin***REMOVED***;
    ***REMOVED*** else {
      const delta = normalizeWheelEventDirection(evt***REMOVED***;
      let ticks = 0;
      if (deltaMode === WheelEvent.DOM_DELTA_LINE || deltaMode === WheelEvent.DOM_DELTA_PAGE***REMOVED*** {
        ticks = Math.abs(delta***REMOVED*** >= 1 ? Math.sign(delta***REMOVED*** : this._accumulateTicks(delta, "_wheelUnusedTicks"***REMOVED***;
      ***REMOVED*** else {
        const PIXELS_PER_LINE_SCALE = 30;
        ticks = this._accumulateTicks(delta / PIXELS_PER_LINE_SCALE, "_wheelUnusedTicks"***REMOVED***;
      ***REMOVED***
      this.updateZoom(ticks, null, origin***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function closeSecondaryToolbar(evt***REMOVED*** {
  if (!this.secondaryToolbar?.isOpen***REMOVED*** {
    return;
  ***REMOVED***
  const appConfig = this.appConfig;
  if (this.pdfViewer.containsElement(evt.target***REMOVED*** || appConfig.toolbar?.container.contains(evt.target***REMOVED*** && !appConfig.secondaryToolbar?.toggleButton.contains(evt.target***REMOVED******REMOVED*** {
    this.secondaryToolbar.close(***REMOVED***;
  ***REMOVED***
***REMOVED***
function closeEditorUndoBar(evt***REMOVED*** {
  if (!this.editorUndoBar?.isOpen***REMOVED*** {
    return;
  ***REMOVED***
  if (this.appConfig.secondaryToolbar?.toolbar.contains(evt.target***REMOVED******REMOVED*** {
    this.editorUndoBar.hide(***REMOVED***;
  ***REMOVED***
***REMOVED***
function onClick(evt***REMOVED*** {
  closeSecondaryToolbar.call(this, evt***REMOVED***;
  closeEditorUndoBar.call(this, evt***REMOVED***;
***REMOVED***
function onKeyUp(evt***REMOVED*** {
  if (evt.key === "Control"***REMOVED*** {
    this._isCtrlKeyDown = false;
  ***REMOVED***
***REMOVED***
function onKeyDown(evt***REMOVED*** {
  this._isCtrlKeyDown = evt.key === "Control";
  if (this.editorUndoBar?.isOpen && evt.keyCode !== 9 && evt.keyCode !== 16 && !((evt.keyCode === 13 || evt.keyCode === 32***REMOVED*** && getActiveOrFocusedElement(***REMOVED*** === this.appConfig.editorUndoBar.undoButton***REMOVED******REMOVED*** {
    this.editorUndoBar.hide(***REMOVED***;
  ***REMOVED***
  if (this.overlayManager.active***REMOVED*** {
    return;
  ***REMOVED***
  const {
    eventBus,
    pdfViewer
  ***REMOVED*** = this;
  const isViewerInPresentationMode = pdfViewer.isInPresentationMode;
  let handled = false,
    ensureViewerFocused = false;
  const cmd = (evt.ctrlKey ? 1 : 0***REMOVED*** | (evt.altKey ? 2 : 0***REMOVED*** | (evt.shiftKey ? 4 : 0***REMOVED*** | (evt.metaKey ? 8 : 0***REMOVED***;
  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12***REMOVED*** {
    switch (evt.keyCode***REMOVED*** {
      case 70:
        if (!this.supportsIntegratedFind && !evt.shiftKey***REMOVED*** {
          this.findBar?.open(***REMOVED***;
          handled = true;
        ***REMOVED***
        break;
      case 71:
        if (!this.supportsIntegratedFind***REMOVED*** {
          const {
            state
          ***REMOVED*** = this.findController;
          if (state***REMOVED*** {
            const newState = {
              source: window,
              type: "again",
              findPrevious: cmd === 5 || cmd === 12
            ***REMOVED***;
            eventBus.dispatch("find", {
              ...state,
              ...newState
            ***REMOVED******REMOVED***;
          ***REMOVED***
          handled = true;
        ***REMOVED***
        break;
      case 61:
      case 107:
      case 187:
      case 171:
        this.zoomIn(***REMOVED***;
        handled = true;
        break;
      case 173:
      case 109:
      case 189:
        this.zoomOut(***REMOVED***;
        handled = true;
        break;
      case 48:
      case 96:
        if (!isViewerInPresentationMode***REMOVED*** {
          setTimeout((***REMOVED*** => {
            this.zoomReset(***REMOVED***;
          ***REMOVED******REMOVED***;
          handled = false;
        ***REMOVED***
        break;
      case 38:
        if (isViewerInPresentationMode || this.page > 1***REMOVED*** {
          this.page = 1;
          handled = true;
          ensureViewerFocused = true;
        ***REMOVED***
        break;
      case 40:
        if (isViewerInPresentationMode || this.page < this.pagesCount***REMOVED*** {
          this.page = this.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        ***REMOVED***
        break;
    ***REMOVED***
  ***REMOVED***
  if (cmd === 1 || cmd === 8***REMOVED*** {
    switch (evt.keyCode***REMOVED*** {
      case 83:
        eventBus.dispatch("download", {
          source: window
        ***REMOVED******REMOVED***;
        handled = true;
        break;
      case 79:
      ***REMOVED***
          eventBus.dispatch("openfile", {
            source: window
          ***REMOVED******REMOVED***;
          handled = true;
        ***REMOVED***
        break;
    ***REMOVED***
  ***REMOVED***
  if (cmd === 3 || cmd === 10***REMOVED*** {
    switch (evt.keyCode***REMOVED*** {
      case 80:
        this.requestPresentationMode(***REMOVED***;
        handled = true;
        this.externalServices.reportTelemetry({
          type: "buttons",
          data: {
            id: "presentationModeKeyboard"
          ***REMOVED***
        ***REMOVED******REMOVED***;
        break;
      case 71:
        if (this.appConfig.toolbar***REMOVED*** {
          this.appConfig.toolbar.pageNumber.select(***REMOVED***;
          handled = true;
        ***REMOVED***
        break;
    ***REMOVED***
  ***REMOVED***
  if (handled***REMOVED*** {
    if (ensureViewerFocused && !isViewerInPresentationMode***REMOVED*** {
      pdfViewer.focus(***REMOVED***;
    ***REMOVED***
    evt.preventDefault(***REMOVED***;
    return;
  ***REMOVED***
  const curElement = getActiveOrFocusedElement(***REMOVED***;
  const curElementTagName = curElement?.tagName.toUpperCase(***REMOVED***;
  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElementTagName === "BUTTON" && (evt.keyCode === 13 || evt.keyCode === 32***REMOVED*** || curElement?.isContentEditable***REMOVED*** {
    if (evt.keyCode !== 27***REMOVED*** {
      return;
    ***REMOVED***
  ***REMOVED***
  if (cmd === 0***REMOVED*** {
    let turnPage = 0,
      turnOnlyIfPageFit = false;
    switch (evt.keyCode***REMOVED*** {
      case 38:
        if (this.supportsCaretBrowsingMode***REMOVED*** {
          this.moveCaret(true, false***REMOVED***;
          handled = true;
          break;
        ***REMOVED***
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
        turnPage = -1;
        break;
      case 8:
        if (!isViewerInPresentationMode***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
        turnPage = -1;
        break;
      case 37:
        if (this.supportsCaretBrowsingMode***REMOVED*** {
          return;
        ***REMOVED***
        if (pdfViewer.isHorizontalScrollbarEnabled***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
      case 75:
      case 80:
        turnPage = -1;
        break;
      case 27:
        if (this.secondaryToolbar?.isOpen***REMOVED*** {
          this.secondaryToolbar.close(***REMOVED***;
          handled = true;
        ***REMOVED***
        if (!this.supportsIntegratedFind && this.findBar?.opened***REMOVED*** {
          this.findBar.close(***REMOVED***;
          handled = true;
        ***REMOVED***
        break;
      case 40:
        if (this.supportsCaretBrowsingMode***REMOVED*** {
          this.moveCaret(false, false***REMOVED***;
          handled = true;
          break;
        ***REMOVED***
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
        turnPage = 1;
        break;
      case 13:
      case 32:
        if (!isViewerInPresentationMode***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
        turnPage = 1;
        break;
      case 39:
        if (this.supportsCaretBrowsingMode***REMOVED*** {
          return;
        ***REMOVED***
        if (pdfViewer.isHorizontalScrollbarEnabled***REMOVED*** {
          turnOnlyIfPageFit = true;
        ***REMOVED***
      case 74:
      case 78:
        turnPage = 1;
        break;
      case 36:
        if (isViewerInPresentationMode || this.page > 1***REMOVED*** {
          this.page = 1;
          handled = true;
          ensureViewerFocused = true;
        ***REMOVED***
        break;
      case 35:
        if (isViewerInPresentationMode || this.page < this.pagesCount***REMOVED*** {
          this.page = this.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        ***REMOVED***
        break;
      case 83:
        this.pdfCursorTools?.switchTool(CursorTool.SELECT***REMOVED***;
        break;
      case 72:
        this.pdfCursorTools?.switchTool(CursorTool.HAND***REMOVED***;
        break;
      case 82:
        this.rotatePages(90***REMOVED***;
        break;
      case 115:
        this.pdfSidebar?.toggle(***REMOVED***;
        break;
    ***REMOVED***
    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit"***REMOVED******REMOVED*** {
      if (turnPage > 0***REMOVED*** {
        pdfViewer.nextPage(***REMOVED***;
      ***REMOVED*** else {
        pdfViewer.previousPage(***REMOVED***;
      ***REMOVED***
      handled = true;
    ***REMOVED***
  ***REMOVED***
  if (cmd === 4***REMOVED*** {
    switch (evt.keyCode***REMOVED*** {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit"***REMOVED*** {
          break;
        ***REMOVED***
        pdfViewer.previousPage(***REMOVED***;
        handled = true;
        break;
      case 38:
        this.moveCaret(true, true***REMOVED***;
        handled = true;
        break;
      case 40:
        this.moveCaret(false, true***REMOVED***;
        handled = true;
        break;
      case 82:
        this.rotatePages(-90***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  if (!handled && !isViewerInPresentationMode***REMOVED*** {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== "BUTTON"***REMOVED*** {
      ensureViewerFocused = true;
    ***REMOVED***
  ***REMOVED***
  if (ensureViewerFocused && !pdfViewer.containsElement(curElement***REMOVED******REMOVED*** {
    pdfViewer.focus(***REMOVED***;
  ***REMOVED***
  if (handled***REMOVED*** {
    evt.preventDefault(***REMOVED***;
  ***REMOVED***
***REMOVED***
function beforeUnload(evt***REMOVED*** {
  evt.preventDefault(***REMOVED***;
  evt.returnValue = "";
  return false;
***REMOVED***

;// ./web/viewer.js




const pdfjsVersion = "4.10.38";
const pdfjsBuild = "f9bea397f";
const AppConstants = {
  LinkTarget: LinkTarget,
  RenderingStates: RenderingStates,
  ScrollMode: ScrollMode,
  SpreadMode: SpreadMode
***REMOVED***;
window.PDFViewerApplication = PDFViewerApplication;
window.PDFViewerApplicationConstants = AppConstants;
window.PDFViewerApplicationOptions = AppOptions;
function getViewerConfiguration(***REMOVED*** {
  return {
    appContainer: document.body,
    principalContainer: document.getElementById("mainContainer"***REMOVED***,
    mainContainer: document.getElementById("viewerContainer"***REMOVED***,
    viewerContainer: document.getElementById("viewer"***REMOVED***,
    toolbar: {
      container: document.getElementById("toolbarContainer"***REMOVED***,
      numPages: document.getElementById("numPages"***REMOVED***,
      pageNumber: document.getElementById("pageNumber"***REMOVED***,
      scaleSelect: document.getElementById("scaleSelect"***REMOVED***,
      customScaleOption: document.getElementById("customScaleOption"***REMOVED***,
      previous: document.getElementById("previous"***REMOVED***,
      next: document.getElementById("next"***REMOVED***,
      zoomIn: document.getElementById("zoomInButton"***REMOVED***,
      zoomOut: document.getElementById("zoomOutButton"***REMOVED***,
      print: document.getElementById("printButton"***REMOVED***,
      editorFreeTextButton: document.getElementById("editorFreeTextButton"***REMOVED***,
      editorFreeTextParamsToolbar: document.getElementById("editorFreeTextParamsToolbar"***REMOVED***,
      editorHighlightButton: document.getElementById("editorHighlightButton"***REMOVED***,
      editorHighlightParamsToolbar: document.getElementById("editorHighlightParamsToolbar"***REMOVED***,
      editorHighlightColorPicker: document.getElementById("editorHighlightColorPicker"***REMOVED***,
      editorInkButton: document.getElementById("editorInkButton"***REMOVED***,
      editorInkParamsToolbar: document.getElementById("editorInkParamsToolbar"***REMOVED***,
      editorStampButton: document.getElementById("editorStampButton"***REMOVED***,
      editorStampParamsToolbar: document.getElementById("editorStampParamsToolbar"***REMOVED***,
      download: document.getElementById("downloadButton"***REMOVED***
    ***REMOVED***,
    secondaryToolbar: {
      toolbar: document.getElementById("secondaryToolbar"***REMOVED***,
      toggleButton: document.getElementById("secondaryToolbarToggleButton"***REMOVED***,
      presentationModeButton: document.getElementById("presentationMode"***REMOVED***,
      openFileButton: document.getElementById("secondaryOpenFile"***REMOVED***,
      printButton: document.getElementById("secondaryPrint"***REMOVED***,
      downloadButton: document.getElementById("secondaryDownload"***REMOVED***,
      viewBookmarkButton: document.getElementById("viewBookmark"***REMOVED***,
      firstPageButton: document.getElementById("firstPage"***REMOVED***,
      lastPageButton: document.getElementById("lastPage"***REMOVED***,
      pageRotateCwButton: document.getElementById("pageRotateCw"***REMOVED***,
      pageRotateCcwButton: document.getElementById("pageRotateCcw"***REMOVED***,
      cursorSelectToolButton: document.getElementById("cursorSelectTool"***REMOVED***,
      cursorHandToolButton: document.getElementById("cursorHandTool"***REMOVED***,
      scrollPageButton: document.getElementById("scrollPage"***REMOVED***,
      scrollVerticalButton: document.getElementById("scrollVertical"***REMOVED***,
      scrollHorizontalButton: document.getElementById("scrollHorizontal"***REMOVED***,
      scrollWrappedButton: document.getElementById("scrollWrapped"***REMOVED***,
      spreadNoneButton: document.getElementById("spreadNone"***REMOVED***,
      spreadOddButton: document.getElementById("spreadOdd"***REMOVED***,
      spreadEvenButton: document.getElementById("spreadEven"***REMOVED***,
      imageAltTextSettingsButton: document.getElementById("imageAltTextSettings"***REMOVED***,
      imageAltTextSettingsSeparator: document.getElementById("imageAltTextSettingsSeparator"***REMOVED***,
      documentPropertiesButton: document.getElementById("documentProperties"***REMOVED***
    ***REMOVED***,
    sidebar: {
      outerContainer: document.getElementById("outerContainer"***REMOVED***,
      sidebarContainer: document.getElementById("sidebarContainer"***REMOVED***,
      toggleButton: document.getElementById("sidebarToggleButton"***REMOVED***,
      resizer: document.getElementById("sidebarResizer"***REMOVED***,
      thumbnailButton: document.getElementById("viewThumbnail"***REMOVED***,
      outlineButton: document.getElementById("viewOutline"***REMOVED***,
      attachmentsButton: document.getElementById("viewAttachments"***REMOVED***,
      layersButton: document.getElementById("viewLayers"***REMOVED***,
      thumbnailView: document.getElementById("thumbnailView"***REMOVED***,
      outlineView: document.getElementById("outlineView"***REMOVED***,
      attachmentsView: document.getElementById("attachmentsView"***REMOVED***,
      layersView: document.getElementById("layersView"***REMOVED***,
      currentOutlineItemButton: document.getElementById("currentOutlineItem"***REMOVED***
    ***REMOVED***,
    findBar: {
      bar: document.getElementById("findbar"***REMOVED***,
      toggleButton: document.getElementById("viewFindButton"***REMOVED***,
      findField: document.getElementById("findInput"***REMOVED***,
      highlightAllCheckbox: document.getElementById("findHighlightAll"***REMOVED***,
      caseSensitiveCheckbox: document.getElementById("findMatchCase"***REMOVED***,
      matchDiacriticsCheckbox: document.getElementById("findMatchDiacritics"***REMOVED***,
      entireWordCheckbox: document.getElementById("findEntireWord"***REMOVED***,
      findMsg: document.getElementById("findMsg"***REMOVED***,
      findResultsCount: document.getElementById("findResultsCount"***REMOVED***,
      findPreviousButton: document.getElementById("findPreviousButton"***REMOVED***,
      findNextButton: document.getElementById("findNextButton"***REMOVED***
    ***REMOVED***,
    passwordOverlay: {
      dialog: document.getElementById("passwordDialog"***REMOVED***,
      label: document.getElementById("passwordText"***REMOVED***,
      input: document.getElementById("password"***REMOVED***,
      submitButton: document.getElementById("passwordSubmit"***REMOVED***,
      cancelButton: document.getElementById("passwordCancel"***REMOVED***
    ***REMOVED***,
    documentProperties: {
      dialog: document.getElementById("documentPropertiesDialog"***REMOVED***,
      closeButton: document.getElementById("documentPropertiesClose"***REMOVED***,
      fields: {
        fileName: document.getElementById("fileNameField"***REMOVED***,
        fileSize: document.getElementById("fileSizeField"***REMOVED***,
        title: document.getElementById("titleField"***REMOVED***,
        author: document.getElementById("authorField"***REMOVED***,
        subject: document.getElementById("subjectField"***REMOVED***,
        keywords: document.getElementById("keywordsField"***REMOVED***,
        creationDate: document.getElementById("creationDateField"***REMOVED***,
        modificationDate: document.getElementById("modificationDateField"***REMOVED***,
        creator: document.getElementById("creatorField"***REMOVED***,
        producer: document.getElementById("producerField"***REMOVED***,
        version: document.getElementById("versionField"***REMOVED***,
        pageCount: document.getElementById("pageCountField"***REMOVED***,
        pageSize: document.getElementById("pageSizeField"***REMOVED***,
        linearized: document.getElementById("linearizedField"***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    altTextDialog: {
      dialog: document.getElementById("altTextDialog"***REMOVED***,
      optionDescription: document.getElementById("descriptionButton"***REMOVED***,
      optionDecorative: document.getElementById("decorativeButton"***REMOVED***,
      textarea: document.getElementById("descriptionTextarea"***REMOVED***,
      cancelButton: document.getElementById("altTextCancel"***REMOVED***,
      saveButton: document.getElementById("altTextSave"***REMOVED***
    ***REMOVED***,
    newAltTextDialog: {
      dialog: document.getElementById("newAltTextDialog"***REMOVED***,
      title: document.getElementById("newAltTextTitle"***REMOVED***,
      descriptionContainer: document.getElementById("newAltTextDescriptionContainer"***REMOVED***,
      textarea: document.getElementById("newAltTextDescriptionTextarea"***REMOVED***,
      disclaimer: document.getElementById("newAltTextDisclaimer"***REMOVED***,
      learnMore: document.getElementById("newAltTextLearnMore"***REMOVED***,
      imagePreview: document.getElementById("newAltTextImagePreview"***REMOVED***,
      createAutomatically: document.getElementById("newAltTextCreateAutomatically"***REMOVED***,
      createAutomaticallyButton: document.getElementById("newAltTextCreateAutomaticallyButton"***REMOVED***,
      downloadModel: document.getElementById("newAltTextDownloadModel"***REMOVED***,
      downloadModelDescription: document.getElementById("newAltTextDownloadModelDescription"***REMOVED***,
      error: document.getElementById("newAltTextError"***REMOVED***,
      errorCloseButton: document.getElementById("newAltTextCloseButton"***REMOVED***,
      cancelButton: document.getElementById("newAltTextCancel"***REMOVED***,
      notNowButton: document.getElementById("newAltTextNotNow"***REMOVED***,
      saveButton: document.getElementById("newAltTextSave"***REMOVED***
    ***REMOVED***,
    altTextSettingsDialog: {
      dialog: document.getElementById("altTextSettingsDialog"***REMOVED***,
      createModelButton: document.getElementById("createModelButton"***REMOVED***,
      aiModelSettings: document.getElementById("aiModelSettings"***REMOVED***,
      learnMore: document.getElementById("altTextSettingsLearnMore"***REMOVED***,
      deleteModelButton: document.getElementById("deleteModelButton"***REMOVED***,
      downloadModelButton: document.getElementById("downloadModelButton"***REMOVED***,
      showAltTextDialogButton: document.getElementById("showAltTextDialogButton"***REMOVED***,
      altTextSettingsCloseButton: document.getElementById("altTextSettingsCloseButton"***REMOVED***,
      closeButton: document.getElementById("altTextSettingsCloseButton"***REMOVED***
    ***REMOVED***,
    annotationEditorParams: {
      editorFreeTextFontSize: document.getElementById("editorFreeTextFontSize"***REMOVED***,
      editorFreeTextColor: document.getElementById("editorFreeTextColor"***REMOVED***,
      editorInkColor: document.getElementById("editorInkColor"***REMOVED***,
      editorInkThickness: document.getElementById("editorInkThickness"***REMOVED***,
      editorInkOpacity: document.getElementById("editorInkOpacity"***REMOVED***,
      editorStampAddImage: document.getElementById("editorStampAddImage"***REMOVED***,
      editorFreeHighlightThickness: document.getElementById("editorFreeHighlightThickness"***REMOVED***,
      editorHighlightShowAll: document.getElementById("editorHighlightShowAll"***REMOVED***
    ***REMOVED***,
    printContainer: document.getElementById("printContainer"***REMOVED***,
    editorUndoBar: {
      container: document.getElementById("editorUndoBar"***REMOVED***,
      message: document.getElementById("editorUndoBarMessage"***REMOVED***,
      undoButton: document.getElementById("editorUndoBarUndoButton"***REMOVED***,
      closeButton: document.getElementById("editorUndoBarCloseButton"***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
function webViewerLoad(***REMOVED*** {
  const config = getViewerConfiguration(***REMOVED***;
  const event = new CustomEvent("webviewerloaded", {
    bubbles: true,
    cancelable: true,
    detail: {
      source: window
    ***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***
    parent.document.dispatchEvent(event***REMOVED***;
  ***REMOVED*** catch (ex***REMOVED*** {
    console.error("webviewerloaded:", ex***REMOVED***;
    document.dispatchEvent(event***REMOVED***;
  ***REMOVED***
  PDFViewerApplication.run(config***REMOVED***;
***REMOVED***
document.blockUnblockOnload?.(true***REMOVED***;
if (document.readyState === "interactive" || document.readyState === "complete"***REMOVED*** {
  webViewerLoad(***REMOVED***;
***REMOVED*** else {
  document.addEventListener("DOMContentLoaded", webViewerLoad, true***REMOVED***;
***REMOVED***

var __webpack_exports__PDFViewerApplication = __webpack_exports__.PDFViewerApplication;
var __webpack_exports__PDFViewerApplicationConstants = __webpack_exports__.PDFViewerApplicationConstants;
var __webpack_exports__PDFViewerApplicationOptions = __webpack_exports__.PDFViewerApplicationOptions;
export { __webpack_exports__PDFViewerApplication as PDFViewerApplication, __webpack_exports__PDFViewerApplicationConstants as PDFViewerApplicationConstants, __webpack_exports__PDFViewerApplicationOptions as PDFViewerApplicationOptions ***REMOVED***;

//# sourceMappingURL=viewer.mjs.map