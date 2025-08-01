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
/******/ 		for(var key in definition***REMOVED*** {
/******/ 			if(__webpack_require__.o(definition, key***REMOVED*** && !__webpack_require__.o(exports, key***REMOVED******REMOVED*** {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] ***REMOVED******REMOVED***;
/******/ 			***REMOVED***
/******/ 		***REMOVED***
/******/ 	***REMOVED***;
/******/ ***REMOVED******REMOVED***(***REMOVED***;
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ ((***REMOVED*** => {
/******/ 	__webpack_require__.o = (obj, prop***REMOVED*** => (Object.prototype.hasOwnProperty.call(obj, prop***REMOVED******REMOVED***
/******/ ***REMOVED******REMOVED***(***REMOVED***;
/******/ 
/************************************************************************/
var __webpack_exports__ = globalThis.pdfjsLib = {***REMOVED***;

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AbortException: (***REMOVED*** => (/* reexport */ AbortException***REMOVED***,
  AnnotationEditorLayer: (***REMOVED*** => (/* reexport */ AnnotationEditorLayer***REMOVED***,
  AnnotationEditorParamsType: (***REMOVED*** => (/* reexport */ AnnotationEditorParamsType***REMOVED***,
  AnnotationEditorType: (***REMOVED*** => (/* reexport */ AnnotationEditorType***REMOVED***,
  AnnotationEditorUIManager: (***REMOVED*** => (/* reexport */ AnnotationEditorUIManager***REMOVED***,
  AnnotationLayer: (***REMOVED*** => (/* reexport */ AnnotationLayer***REMOVED***,
  AnnotationMode: (***REMOVED*** => (/* reexport */ AnnotationMode***REMOVED***,
  ColorPicker: (***REMOVED*** => (/* reexport */ ColorPicker***REMOVED***,
  DOMSVGFactory: (***REMOVED*** => (/* reexport */ DOMSVGFactory***REMOVED***,
  DrawLayer: (***REMOVED*** => (/* reexport */ DrawLayer***REMOVED***,
  FeatureTest: (***REMOVED*** => (/* reexport */ util_FeatureTest***REMOVED***,
  GlobalWorkerOptions: (***REMOVED*** => (/* reexport */ GlobalWorkerOptions***REMOVED***,
  ImageKind: (***REMOVED*** => (/* reexport */ util_ImageKind***REMOVED***,
  InvalidPDFException: (***REMOVED*** => (/* reexport */ InvalidPDFException***REMOVED***,
  MissingPDFException: (***REMOVED*** => (/* reexport */ MissingPDFException***REMOVED***,
  OPS: (***REMOVED*** => (/* reexport */ OPS***REMOVED***,
  OutputScale: (***REMOVED*** => (/* reexport */ OutputScale***REMOVED***,
  PDFDataRangeTransport: (***REMOVED*** => (/* reexport */ PDFDataRangeTransport***REMOVED***,
  PDFDateString: (***REMOVED*** => (/* reexport */ PDFDateString***REMOVED***,
  PDFWorker: (***REMOVED*** => (/* reexport */ PDFWorker***REMOVED***,
  PasswordResponses: (***REMOVED*** => (/* reexport */ PasswordResponses***REMOVED***,
  PermissionFlag: (***REMOVED*** => (/* reexport */ PermissionFlag***REMOVED***,
  PixelsPerInch: (***REMOVED*** => (/* reexport */ PixelsPerInch***REMOVED***,
  RenderingCancelledException: (***REMOVED*** => (/* reexport */ RenderingCancelledException***REMOVED***,
  TextLayer: (***REMOVED*** => (/* reexport */ TextLayer***REMOVED***,
  TouchManager: (***REMOVED*** => (/* reexport */ TouchManager***REMOVED***,
  UnexpectedResponseException: (***REMOVED*** => (/* reexport */ UnexpectedResponseException***REMOVED***,
  Util: (***REMOVED*** => (/* reexport */ Util***REMOVED***,
  VerbosityLevel: (***REMOVED*** => (/* reexport */ VerbosityLevel***REMOVED***,
  XfaLayer: (***REMOVED*** => (/* reexport */ XfaLayer***REMOVED***,
  build: (***REMOVED*** => (/* reexport */ build***REMOVED***,
  createValidAbsoluteUrl: (***REMOVED*** => (/* reexport */ createValidAbsoluteUrl***REMOVED***,
  fetchData: (***REMOVED*** => (/* reexport */ fetchData***REMOVED***,
  getDocument: (***REMOVED*** => (/* reexport */ getDocument***REMOVED***,
  getFilenameFromUrl: (***REMOVED*** => (/* reexport */ getFilenameFromUrl***REMOVED***,
  getPdfFilenameFromUrl: (***REMOVED*** => (/* reexport */ getPdfFilenameFromUrl***REMOVED***,
  getXfaPageViewport: (***REMOVED*** => (/* reexport */ getXfaPageViewport***REMOVED***,
  isDataScheme: (***REMOVED*** => (/* reexport */ isDataScheme***REMOVED***,
  isPdfFile: (***REMOVED*** => (/* reexport */ isPdfFile***REMOVED***,
  noContextMenu: (***REMOVED*** => (/* reexport */ noContextMenu***REMOVED***,
  normalizeUnicode: (***REMOVED*** => (/* reexport */ normalizeUnicode***REMOVED***,
  setLayerDimensions: (***REMOVED*** => (/* reexport */ setLayerDimensions***REMOVED***,
  shadow: (***REMOVED*** => (/* reexport */ shadow***REMOVED***,
  stopEvent: (***REMOVED*** => (/* reexport */ stopEvent***REMOVED***,
  version: (***REMOVED*** => (/* reexport */ version***REMOVED***
***REMOVED******REMOVED***;

;// ./src/shared/util.js
const isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"***REMOVED***;
const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
const FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
const MAX_IMAGE_SIZE_TO_CACHE = 10e6;
const LINE_FACTOR = 1.35;
const LINE_DESCENT_FACTOR = 0.35;
const BASELINE_FACTOR = LINE_DESCENT_FACTOR / LINE_FACTOR;
const RenderingIntentFlag = {
  ANY: 0x01,
  DISPLAY: 0x02,
  PRINT: 0x04,
  SAVE: 0x08,
  ANNOTATIONS_FORMS: 0x10,
  ANNOTATIONS_STORAGE: 0x20,
  ANNOTATIONS_DISABLE: 0x40,
  IS_EDITING: 0x80,
  OPLIST: 0x100
***REMOVED***;
const AnnotationMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
***REMOVED***;
const AnnotationEditorPrefix = "pdfjs_internal_editor_";
const AnnotationEditorType = {
  DISABLE: -1,
  NONE: 0,
  FREETEXT: 3,
  HIGHLIGHT: 9,
  STAMP: 13,
  INK: 15
***REMOVED***;
const AnnotationEditorParamsType = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_DEFAULT_COLOR: 32,
  HIGHLIGHT_THICKNESS: 33,
  HIGHLIGHT_FREE: 34,
  HIGHLIGHT_SHOW_ALL: 35,
  DRAW_STEP: 41
***REMOVED***;
const PermissionFlag = {
  PRINT: 0x04,
  MODIFY_CONTENTS: 0x08,
  COPY: 0x10,
  MODIFY_ANNOTATIONS: 0x20,
  FILL_INTERACTIVE_FORMS: 0x100,
  COPY_FOR_ACCESSIBILITY: 0x200,
  ASSEMBLE: 0x400,
  PRINT_HIGH_QUALITY: 0x800
***REMOVED***;
const TextRenderingMode = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
***REMOVED***;
const util_ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
***REMOVED***;
const AnnotationType = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
***REMOVED***;
const AnnotationReplyType = {
  GROUP: "Group",
  REPLY: "R"
***REMOVED***;
const AnnotationFlag = {
  INVISIBLE: 0x01,
  HIDDEN: 0x02,
  PRINT: 0x04,
  NOZOOM: 0x08,
  NOROTATE: 0x10,
  NOVIEW: 0x20,
  READONLY: 0x40,
  LOCKED: 0x80,
  TOGGLENOVIEW: 0x100,
  LOCKEDCONTENTS: 0x200
***REMOVED***;
const AnnotationFieldFlag = {
  READONLY: 0x0000001,
  REQUIRED: 0x0000002,
  NOEXPORT: 0x0000004,
  MULTILINE: 0x0001000,
  PASSWORD: 0x0002000,
  NOTOGGLETOOFF: 0x0004000,
  RADIO: 0x0008000,
  PUSHBUTTON: 0x0010000,
  COMBO: 0x0020000,
  EDIT: 0x0040000,
  SORT: 0x0080000,
  FILESELECT: 0x0100000,
  MULTISELECT: 0x0200000,
  DONOTSPELLCHECK: 0x0400000,
  DONOTSCROLL: 0x0800000,
  COMB: 0x1000000,
  RICHTEXT: 0x2000000,
  RADIOSINUNISON: 0x2000000,
  COMMITONSELCHANGE: 0x4000000
***REMOVED***;
const AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
***REMOVED***;
const AnnotationActionEventType = {
  E: "Mouse Enter",
  X: "Mouse Exit",
  D: "Mouse Down",
  U: "Mouse Up",
  Fo: "Focus",
  Bl: "Blur",
  PO: "PageOpen",
  PC: "PageClose",
  PV: "PageVisible",
  PI: "PageInvisible",
  K: "Keystroke",
  F: "Format",
  V: "Validate",
  C: "Calculate"
***REMOVED***;
const DocumentActionEventType = {
  WC: "WillClose",
  WS: "WillSave",
  DS: "DidSave",
  WP: "WillPrint",
  DP: "DidPrint"
***REMOVED***;
const PageActionEventType = {
  O: "PageOpen",
  C: "PageClose"
***REMOVED***;
const VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
***REMOVED***;
const OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91,
  setStrokeTransparent: 92,
  setFillTransparent: 93
***REMOVED***;
const PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
***REMOVED***;
let verbosity = VerbosityLevel.WARNINGS;
function setVerbosityLevel(level***REMOVED*** {
  if (Number.isInteger(level***REMOVED******REMOVED*** {
    verbosity = level;
  ***REMOVED***
***REMOVED***
function getVerbosityLevel(***REMOVED*** {
  return verbosity;
***REMOVED***
function info(msg***REMOVED*** {
  if (verbosity >= VerbosityLevel.INFOS***REMOVED*** {
    console.log(`Info: ${msg***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
function warn(msg***REMOVED*** {
  if (verbosity >= VerbosityLevel.WARNINGS***REMOVED*** {
    console.log(`Warning: ${msg***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
function unreachable(msg***REMOVED*** {
  throw new Error(msg***REMOVED***;
***REMOVED***
function assert(cond, msg***REMOVED*** {
  if (!cond***REMOVED*** {
    unreachable(msg***REMOVED***;
  ***REMOVED***
***REMOVED***
function _isValidProtocol(url***REMOVED*** {
  switch (url?.protocol***REMOVED*** {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return true;
    default:
      return false;
  ***REMOVED***
***REMOVED***
function createValidAbsoluteUrl(url, baseUrl = null, options = null***REMOVED*** {
  if (!url***REMOVED*** {
    return null;
  ***REMOVED***
***REMOVED***
    if (options && typeof url === "string"***REMOVED*** {
      if (options.addDefaultProtocol && url.startsWith("www."***REMOVED******REMOVED*** {
        const dots = url.match(/\./g***REMOVED***;
        if (dots?.length >= 2***REMOVED*** {
          url = `http://${url***REMOVED***`;
        ***REMOVED***
      ***REMOVED***
      if (options.tryConvertEncoding***REMOVED*** {
      ***REMOVED***
          url = stringToUTF8String(url***REMOVED***;
        ***REMOVED*** catch {***REMOVED***
      ***REMOVED***
    ***REMOVED***
    const absoluteUrl = baseUrl ? new URL(url, baseUrl***REMOVED*** : new URL(url***REMOVED***;
    if (_isValidProtocol(absoluteUrl***REMOVED******REMOVED*** {
      return absoluteUrl;
    ***REMOVED***
  ***REMOVED*** catch {***REMOVED***
  return null;
***REMOVED***
function shadow(obj, prop, value, nonSerializable = false***REMOVED*** {
  Object.defineProperty(obj, prop, {
    value,
    enumerable: !nonSerializable,
    configurable: true,
    writable: false
  ***REMOVED******REMOVED***;
  return value;
***REMOVED***
const BaseException = function BaseExceptionClosure(***REMOVED*** {
  function BaseException(message, name***REMOVED*** {
    this.message = message;
    this.name = name;
  ***REMOVED***
  BaseException.prototype = new Error(***REMOVED***;
  BaseException.constructor = BaseException;
  return BaseException;
***REMOVED***(***REMOVED***;
class PasswordException extends BaseException {
  constructor(msg, code***REMOVED*** {
    super(msg, "PasswordException"***REMOVED***;
    this.code = code;
  ***REMOVED***
***REMOVED***
class UnknownErrorException extends BaseException {
  constructor(msg, details***REMOVED*** {
    super(msg, "UnknownErrorException"***REMOVED***;
    this.details = details;
  ***REMOVED***
***REMOVED***
class InvalidPDFException extends BaseException {
  constructor(msg***REMOVED*** {
    super(msg, "InvalidPDFException"***REMOVED***;
  ***REMOVED***
***REMOVED***
class MissingPDFException extends BaseException {
  constructor(msg***REMOVED*** {
    super(msg, "MissingPDFException"***REMOVED***;
  ***REMOVED***
***REMOVED***
class UnexpectedResponseException extends BaseException {
  constructor(msg, status***REMOVED*** {
    super(msg, "UnexpectedResponseException"***REMOVED***;
    this.status = status;
  ***REMOVED***
***REMOVED***
class FormatError extends BaseException {
  constructor(msg***REMOVED*** {
    super(msg, "FormatError"***REMOVED***;
  ***REMOVED***
***REMOVED***
class AbortException extends BaseException {
  constructor(msg***REMOVED*** {
    super(msg, "AbortException"***REMOVED***;
  ***REMOVED***
***REMOVED***
function bytesToString(bytes***REMOVED*** {
  if (typeof bytes !== "object" || bytes?.length === undefined***REMOVED*** {
    unreachable("Invalid argument for bytesToString"***REMOVED***;
  ***REMOVED***
  const length = bytes.length;
  const MAX_ARGUMENT_COUNT = 8192;
  if (length < MAX_ARGUMENT_COUNT***REMOVED*** {
    return String.fromCharCode.apply(null, bytes***REMOVED***;
  ***REMOVED***
  const strBuf = [];
  for (let i = 0; i < length; i += MAX_ARGUMENT_COUNT***REMOVED*** {
    const chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length***REMOVED***;
    const chunk = bytes.subarray(i, chunkEnd***REMOVED***;
    strBuf.push(String.fromCharCode.apply(null, chunk***REMOVED******REMOVED***;
  ***REMOVED***
  return strBuf.join(""***REMOVED***;
***REMOVED***
function stringToBytes(str***REMOVED*** {
  if (typeof str !== "string"***REMOVED*** {
    unreachable("Invalid argument for stringToBytes"***REMOVED***;
  ***REMOVED***
  const length = str.length;
  const bytes = new Uint8Array(length***REMOVED***;
  for (let i = 0; i < length; ++i***REMOVED*** {
    bytes[i] = str.charCodeAt(i***REMOVED*** & 0xff;
  ***REMOVED***
  return bytes;
***REMOVED***
function string32(value***REMOVED*** {
  return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff***REMOVED***;
***REMOVED***
function objectSize(obj***REMOVED*** {
  return Object.keys(obj***REMOVED***.length;
***REMOVED***
function objectFromMap(map***REMOVED*** {
  const obj = Object.create(null***REMOVED***;
  for (const [key, value] of map***REMOVED*** {
    obj[key] = value;
  ***REMOVED***
  return obj;
***REMOVED***
function isLittleEndian(***REMOVED*** {
  const buffer8 = new Uint8Array(4***REMOVED***;
  buffer8[0] = 1;
  const view32 = new Uint32Array(buffer8.buffer, 0, 1***REMOVED***;
  return view32[0] === 1;
***REMOVED***
function isEvalSupported(***REMOVED*** {
***REMOVED***
    new Function(""***REMOVED***;
    return true;
  ***REMOVED*** catch {
    return false;
  ***REMOVED***
***REMOVED***
class util_FeatureTest {
  static get isLittleEndian(***REMOVED*** {
    return shadow(this, "isLittleEndian", isLittleEndian(***REMOVED******REMOVED***;
  ***REMOVED***
  static get isEvalSupported(***REMOVED*** {
    return shadow(this, "isEvalSupported", isEvalSupported(***REMOVED******REMOVED***;
  ***REMOVED***
  static get isOffscreenCanvasSupported(***REMOVED*** {
    return shadow(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas !== "undefined"***REMOVED***;
  ***REMOVED***
  static get isImageDecoderSupported(***REMOVED*** {
    return shadow(this, "isImageDecoderSupported", typeof ImageDecoder !== "undefined"***REMOVED***;
  ***REMOVED***
  static get platform(***REMOVED*** {
    if (typeof navigator !== "undefined" && typeof navigator?.platform === "string"***REMOVED*** {
      return shadow(this, "platform", {
        isMac: navigator.platform.includes("Mac"***REMOVED***,
        isWindows: navigator.platform.includes("Win"***REMOVED***,
        isFirefox: typeof navigator?.userAgent === "string" && navigator.userAgent.includes("Firefox"***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return shadow(this, "platform", {
      isMac: false,
      isWindows: false,
      isFirefox: false
    ***REMOVED******REMOVED***;
  ***REMOVED***
  static get isCSSRoundSupported(***REMOVED*** {
    return shadow(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px***REMOVED***"***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
const hexNumbers = Array.from(Array(256***REMOVED***.keys(***REMOVED***, n => n.toString(16***REMOVED***.padStart(2, "0"***REMOVED******REMOVED***;
class Util {
  static makeHexColor(r, g, b***REMOVED*** {
    return `#${hexNumbers[r]***REMOVED***${hexNumbers[g]***REMOVED***${hexNumbers[b]***REMOVED***`;
  ***REMOVED***
  static scaleMinMax(transform, minMax***REMOVED*** {
    let temp;
    if (transform[0]***REMOVED*** {
      if (transform[0] < 0***REMOVED*** {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      ***REMOVED***
      minMax[0] *= transform[0];
      minMax[2] *= transform[0];
      if (transform[3] < 0***REMOVED*** {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      ***REMOVED***
      minMax[1] *= transform[3];
      minMax[3] *= transform[3];
    ***REMOVED*** else {
      temp = minMax[0];
      minMax[0] = minMax[1];
      minMax[1] = temp;
      temp = minMax[2];
      minMax[2] = minMax[3];
      minMax[3] = temp;
      if (transform[1] < 0***REMOVED*** {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      ***REMOVED***
      minMax[1] *= transform[1];
      minMax[3] *= transform[1];
      if (transform[2] < 0***REMOVED*** {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      ***REMOVED***
      minMax[0] *= transform[2];
      minMax[2] *= transform[2];
    ***REMOVED***
    minMax[0] += transform[4];
    minMax[1] += transform[5];
    minMax[2] += transform[4];
    minMax[3] += transform[5];
  ***REMOVED***
  static transform(m1, m2***REMOVED*** {
    return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
  ***REMOVED***
  static applyTransform(p, m***REMOVED*** {
    const xt = p[0] * m[0] + p[1] * m[2] + m[4];
    const yt = p[0] * m[1] + p[1] * m[3] + m[5];
    return [xt, yt];
  ***REMOVED***
  static applyInverseTransform(p, m***REMOVED*** {
    const d = m[0] * m[3] - m[1] * m[2];
    const xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]***REMOVED*** / d;
    const yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]***REMOVED*** / d;
    return [xt, yt];
  ***REMOVED***
  static getAxialAlignedBoundingBox(r, m***REMOVED*** {
    const p1 = this.applyTransform(r, m***REMOVED***;
    const p2 = this.applyTransform(r.slice(2, 4***REMOVED***, m***REMOVED***;
    const p3 = this.applyTransform([r[0], r[3]], m***REMOVED***;
    const p4 = this.applyTransform([r[2], r[1]], m***REMOVED***;
    return [Math.min(p1[0], p2[0], p3[0], p4[0]***REMOVED***, Math.min(p1[1], p2[1], p3[1], p4[1]***REMOVED***, Math.max(p1[0], p2[0], p3[0], p4[0]***REMOVED***, Math.max(p1[1], p2[1], p3[1], p4[1]***REMOVED***];
  ***REMOVED***
  static inverseTransform(m***REMOVED*** {
    const d = m[0] * m[3] - m[1] * m[2];
    return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]***REMOVED*** / d, (m[4] * m[1] - m[5] * m[0]***REMOVED*** / d];
  ***REMOVED***
  static singularValueDecompose2dScale(m***REMOVED*** {
    const transpose = [m[0], m[2], m[1], m[3]];
    const a = m[0] * transpose[0] + m[1] * transpose[2];
    const b = m[0] * transpose[1] + m[1] * transpose[3];
    const c = m[2] * transpose[0] + m[3] * transpose[2];
    const d = m[2] * transpose[1] + m[3] * transpose[3];
    const first = (a + d***REMOVED*** / 2;
    const second = Math.sqrt((a + d***REMOVED*** ** 2 - 4 * (a * d - c * b***REMOVED******REMOVED*** / 2;
    const sx = first + second || 1;
    const sy = first - second || 1;
    return [Math.sqrt(sx***REMOVED***, Math.sqrt(sy***REMOVED***];
  ***REMOVED***
  static normalizeRect(rect***REMOVED*** {
    const r = rect.slice(0***REMOVED***;
    if (rect[0] > rect[2]***REMOVED*** {
      r[0] = rect[2];
      r[2] = rect[0];
    ***REMOVED***
    if (rect[1] > rect[3]***REMOVED*** {
      r[1] = rect[3];
      r[3] = rect[1];
    ***REMOVED***
    return r;
  ***REMOVED***
  static intersect(rect1, rect2***REMOVED*** {
    const xLow = Math.max(Math.min(rect1[0], rect1[2]***REMOVED***, Math.min(rect2[0], rect2[2]***REMOVED******REMOVED***;
    const xHigh = Math.min(Math.max(rect1[0], rect1[2]***REMOVED***, Math.max(rect2[0], rect2[2]***REMOVED******REMOVED***;
    if (xLow > xHigh***REMOVED*** {
      return null;
    ***REMOVED***
    const yLow = Math.max(Math.min(rect1[1], rect1[3]***REMOVED***, Math.min(rect2[1], rect2[3]***REMOVED******REMOVED***;
    const yHigh = Math.min(Math.max(rect1[1], rect1[3]***REMOVED***, Math.max(rect2[1], rect2[3]***REMOVED******REMOVED***;
    if (yLow > yHigh***REMOVED*** {
      return null;
    ***REMOVED***
    return [xLow, yLow, xHigh, yHigh];
  ***REMOVED***
  static #getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, t, minMax***REMOVED*** {
    if (t <= 0 || t >= 1***REMOVED*** {
      return;
    ***REMOVED***
    const mt = 1 - t;
    const tt = t * t;
    const ttt = tt * t;
    const x = mt * (mt * (mt * x0 + 3 * t * x1***REMOVED*** + 3 * tt * x2***REMOVED*** + ttt * x3;
    const y = mt * (mt * (mt * y0 + 3 * t * y1***REMOVED*** + 3 * tt * y2***REMOVED*** + ttt * y3;
    minMax[0] = Math.min(minMax[0], x***REMOVED***;
    minMax[1] = Math.min(minMax[1], y***REMOVED***;
    minMax[2] = Math.max(minMax[2], x***REMOVED***;
    minMax[3] = Math.max(minMax[3], y***REMOVED***;
  ***REMOVED***
  static #getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, a, b, c, minMax***REMOVED*** {
    if (Math.abs(a***REMOVED*** < 1e-12***REMOVED*** {
      if (Math.abs(b***REMOVED*** >= 1e-12***REMOVED*** {
        this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, -c / b, minMax***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    const delta = b ** 2 - 4 * c * a;
    if (delta < 0***REMOVED*** {
      return;
    ***REMOVED***
    const sqrtDelta = Math.sqrt(delta***REMOVED***;
    const a2 = 2 * a;
    this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, (-b + sqrtDelta***REMOVED*** / a2, minMax***REMOVED***;
    this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, (-b - sqrtDelta***REMOVED*** / a2, minMax***REMOVED***;
  ***REMOVED***
  static bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3, minMax***REMOVED*** {
    if (minMax***REMOVED*** {
      minMax[0] = Math.min(minMax[0], x0, x3***REMOVED***;
      minMax[1] = Math.min(minMax[1], y0, y3***REMOVED***;
      minMax[2] = Math.max(minMax[2], x0, x3***REMOVED***;
      minMax[3] = Math.max(minMax[3], y0, y3***REMOVED***;
    ***REMOVED*** else {
      minMax = [Math.min(x0, x3***REMOVED***, Math.min(y0, y3***REMOVED***, Math.max(x0, x3***REMOVED***, Math.max(y0, y3***REMOVED***];
    ***REMOVED***
    this.#getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-x0 + 3 * (x1 - x2***REMOVED*** + x3***REMOVED***, 6 * (x0 - 2 * x1 + x2***REMOVED***, 3 * (x1 - x0***REMOVED***, minMax***REMOVED***;
    this.#getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-y0 + 3 * (y1 - y2***REMOVED*** + y3***REMOVED***, 6 * (y0 - 2 * y1 + y2***REMOVED***, 3 * (y1 - y0***REMOVED***, minMax***REMOVED***;
    return minMax;
  ***REMOVED***
***REMOVED***
const PDFStringTranslateTable = (/* unused pure expression or super */ null && ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2d8, 0x2c7, 0x2c6, 0x2d9, 0x2dd, 0x2db, 0x2da, 0x2dc, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203a, 0x2212, 0x2030, 0x201e, 0x201c, 0x201d, 0x2018, 0x2019, 0x201a, 0x2122, 0xfb01, 0xfb02, 0x141, 0x152, 0x160, 0x178, 0x17d, 0x131, 0x142, 0x153, 0x161, 0x17e, 0, 0x20ac]***REMOVED******REMOVED***;
function stringToPDFString(str***REMOVED*** {
  if (str[0] >= "\xEF"***REMOVED*** {
    let encoding;
    if (str[0] === "\xFE" && str[1] === "\xFF"***REMOVED*** {
      encoding = "utf-16be";
      if (str.length % 2 === 1***REMOVED*** {
        str = str.slice(0, -1***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (str[0] === "\xFF" && str[1] === "\xFE"***REMOVED*** {
      encoding = "utf-16le";
      if (str.length % 2 === 1***REMOVED*** {
        str = str.slice(0, -1***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (str[0] === "\xEF" && str[1] === "\xBB" && str[2] === "\xBF"***REMOVED*** {
      encoding = "utf-8";
    ***REMOVED***
    if (encoding***REMOVED*** {
    ***REMOVED***
        const decoder = new TextDecoder(encoding, {
          fatal: true
        ***REMOVED******REMOVED***;
        const buffer = stringToBytes(str***REMOVED***;
        const decoded = decoder.decode(buffer***REMOVED***;
        if (!decoded.includes("\x1b"***REMOVED******REMOVED*** {
          return decoded;
        ***REMOVED***
        return decoded.replaceAll(/\x1b[^\x1b]*(?:\x1b|$***REMOVED***/g, ""***REMOVED***;
      ***REMOVED*** catch (ex***REMOVED*** {
        warn(`stringToPDFString: "${ex***REMOVED***".`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  const strBuf = [];
  for (let i = 0, ii = str.length; i < ii; i++***REMOVED*** {
    const charCode = str.charCodeAt(i***REMOVED***;
    if (charCode === 0x1b***REMOVED*** {
      while (++i < ii && str.charCodeAt(i***REMOVED*** !== 0x1b***REMOVED*** {***REMOVED***
      continue;
    ***REMOVED***
    const code = PDFStringTranslateTable[charCode];
    strBuf.push(code ? String.fromCharCode(code***REMOVED*** : str.charAt(i***REMOVED******REMOVED***;
  ***REMOVED***
  return strBuf.join(""***REMOVED***;
***REMOVED***
function stringToUTF8String(str***REMOVED*** {
  return decodeURIComponent(escape(str***REMOVED******REMOVED***;
***REMOVED***
function utf8StringToString(str***REMOVED*** {
  return unescape(encodeURIComponent(str***REMOVED******REMOVED***;
***REMOVED***
function isArrayEqual(arr1, arr2***REMOVED*** {
  if (arr1.length !== arr2.length***REMOVED*** {
    return false;
  ***REMOVED***
  for (let i = 0, ii = arr1.length; i < ii; i++***REMOVED*** {
    if (arr1[i] !== arr2[i]***REMOVED*** {
      return false;
    ***REMOVED***
  ***REMOVED***
  return true;
***REMOVED***
function getModificationDate(date = new Date(***REMOVED******REMOVED*** {
  const buffer = [date.getUTCFullYear(***REMOVED***.toString(***REMOVED***, (date.getUTCMonth(***REMOVED*** + 1***REMOVED***.toString(***REMOVED***.padStart(2, "0"***REMOVED***, date.getUTCDate(***REMOVED***.toString(***REMOVED***.padStart(2, "0"***REMOVED***, date.getUTCHours(***REMOVED***.toString(***REMOVED***.padStart(2, "0"***REMOVED***, date.getUTCMinutes(***REMOVED***.toString(***REMOVED***.padStart(2, "0"***REMOVED***, date.getUTCSeconds(***REMOVED***.toString(***REMOVED***.padStart(2, "0"***REMOVED***];
  return buffer.join(""***REMOVED***;
***REMOVED***
let NormalizeRegex = null;
let NormalizationMap = null;
function normalizeUnicode(str***REMOVED*** {
  if (!NormalizeRegex***REMOVED*** {
    NormalizeRegex = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+***REMOVED***|(\ufb05+***REMOVED***/gu;
    NormalizationMap = new Map([["ﬅ", "ſt"]]***REMOVED***;
  ***REMOVED***
  return str.replaceAll(NormalizeRegex, (_, p1, p2***REMOVED*** => p1 ? p1.normalize("NFKC"***REMOVED*** : NormalizationMap.get(p2***REMOVED******REMOVED***;
***REMOVED***
function getUuid(***REMOVED*** {
  if (typeof crypto.randomUUID === "function"***REMOVED*** {
    return crypto.randomUUID(***REMOVED***;
  ***REMOVED***
  const buf = new Uint8Array(32***REMOVED***;
  crypto.getRandomValues(buf***REMOVED***;
  return bytesToString(buf***REMOVED***;
***REMOVED***
const AnnotationPrefix = "pdfjs_internal_id_";
function toHexUtil(arr***REMOVED*** {
  if (Uint8Array.prototype.toHex***REMOVED*** {
    return arr.toHex(***REMOVED***;
  ***REMOVED***
  return Array.from(arr, num => hexNumbers[num]***REMOVED***.join(""***REMOVED***;
***REMOVED***
function toBase64Util(arr***REMOVED*** {
  if (Uint8Array.prototype.toBase64***REMOVED*** {
    return arr.toBase64(***REMOVED***;
  ***REMOVED***
  return btoa(bytesToString(arr***REMOVED******REMOVED***;
***REMOVED***
function fromBase64Util(str***REMOVED*** {
  if (Uint8Array.fromBase64***REMOVED*** {
    return Uint8Array.fromBase64(str***REMOVED***;
  ***REMOVED***
  return stringToBytes(atob(str***REMOVED******REMOVED***;
***REMOVED***
if (typeof Promise.try !== "function"***REMOVED*** {
  Promise.try = function (fn, ...args***REMOVED*** {
    return new Promise(resolve => {
      resolve(fn(...args***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***;
***REMOVED***

;// ./src/display/display_utils.js

const SVG_NS = "http://www.w3.org/2000/svg";
class PixelsPerInch {
  static CSS = 96.0;
  static PDF = 72.0;
  static PDF_TO_CSS_UNITS = this.CSS / this.PDF;
***REMOVED***
async function fetchData(url, type = "text"***REMOVED*** {
  if (isValidFetchUrl(url, document.baseURI***REMOVED******REMOVED*** {
    const response = await fetch(url***REMOVED***;
    if (!response.ok***REMOVED*** {
      throw new Error(response.statusText***REMOVED***;
    ***REMOVED***
    switch (type***REMOVED*** {
      case "arraybuffer":
        return response.arrayBuffer(***REMOVED***;
      case "blob":
        return response.blob(***REMOVED***;
      case "json":
        return response.json(***REMOVED***;
    ***REMOVED***
    return response.text(***REMOVED***;
  ***REMOVED***
  return new Promise((resolve, reject***REMOVED*** => {
    const request = new XMLHttpRequest(***REMOVED***;
    request.open("GET", url, true***REMOVED***;
    request.responseType = type;
    request.onreadystatechange = (***REMOVED*** => {
      if (request.readyState !== XMLHttpRequest.DONE***REMOVED*** {
        return;
      ***REMOVED***
      if (request.status === 200 || request.status === 0***REMOVED*** {
        switch (type***REMOVED*** {
          case "arraybuffer":
          case "blob":
          case "json":
            resolve(request.response***REMOVED***;
            return;
        ***REMOVED***
        resolve(request.responseText***REMOVED***;
        return;
      ***REMOVED***
      reject(new Error(request.statusText***REMOVED******REMOVED***;
    ***REMOVED***;
    request.send(null***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***
class PageViewport {
  constructor({
    viewBox,
    userUnit,
    scale,
    rotation,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  ***REMOVED******REMOVED*** {
    this.viewBox = viewBox;
    this.userUnit = userUnit;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    scale *= userUnit;
    const centerX = (viewBox[2] + viewBox[0]***REMOVED*** / 2;
    const centerY = (viewBox[3] + viewBox[1]***REMOVED*** / 2;
    let rotateA, rotateB, rotateC, rotateD;
    rotation %= 360;
    if (rotation < 0***REMOVED*** {
      rotation += 360;
    ***REMOVED***
    switch (rotation***REMOVED*** {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;
      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;
      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;
      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees."***REMOVED***;
    ***REMOVED***
    if (dontFlip***REMOVED*** {
      rotateC = -rotateC;
      rotateD = -rotateD;
    ***REMOVED***
    let offsetCanvasX, offsetCanvasY;
    let width, height;
    if (rotateA === 0***REMOVED*** {
      offsetCanvasX = Math.abs(centerY - viewBox[1]***REMOVED*** * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]***REMOVED*** * scale + offsetY;
      width = (viewBox[3] - viewBox[1]***REMOVED*** * scale;
      height = (viewBox[2] - viewBox[0]***REMOVED*** * scale;
    ***REMOVED*** else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]***REMOVED*** * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]***REMOVED*** * scale + offsetY;
      width = (viewBox[2] - viewBox[0]***REMOVED*** * scale;
      height = (viewBox[3] - viewBox[1]***REMOVED*** * scale;
    ***REMOVED***
    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  ***REMOVED***
  get rawDims(***REMOVED*** {
    const {
      userUnit,
      viewBox
    ***REMOVED*** = this;
    const dims = viewBox.map(x => x * userUnit***REMOVED***;
    return shadow(this, "rawDims", {
      pageWidth: dims[2] - dims[0],
      pageHeight: dims[3] - dims[1],
      pageX: dims[0],
      pageY: dims[1]
    ***REMOVED******REMOVED***;
  ***REMOVED***
  clone({
    scale = this.scale,
    rotation = this.rotation,
    offsetX = this.offsetX,
    offsetY = this.offsetY,
    dontFlip = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    return new PageViewport({
      viewBox: this.viewBox.slice(***REMOVED***,
      userUnit: this.userUnit,
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    ***REMOVED******REMOVED***;
  ***REMOVED***
  convertToViewportPoint(x, y***REMOVED*** {
    return Util.applyTransform([x, y], this.transform***REMOVED***;
  ***REMOVED***
  convertToViewportRectangle(rect***REMOVED*** {
    const topLeft = Util.applyTransform([rect[0], rect[1]], this.transform***REMOVED***;
    const bottomRight = Util.applyTransform([rect[2], rect[3]], this.transform***REMOVED***;
    return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
  ***REMOVED***
  convertToPdfPoint(x, y***REMOVED*** {
    return Util.applyInverseTransform([x, y], this.transform***REMOVED***;
  ***REMOVED***
***REMOVED***
class RenderingCancelledException extends BaseException {
  constructor(msg, extraDelay = 0***REMOVED*** {
    super(msg, "RenderingCancelledException"***REMOVED***;
    this.extraDelay = extraDelay;
  ***REMOVED***
***REMOVED***
function isDataScheme(url***REMOVED*** {
  const ii = url.length;
  let i = 0;
  while (i < ii && url[i].trim(***REMOVED*** === ""***REMOVED*** {
    i++;
  ***REMOVED***
  return url.substring(i, i + 5***REMOVED***.toLowerCase(***REMOVED*** === "data:";
***REMOVED***
function isPdfFile(filename***REMOVED*** {
  return typeof filename === "string" && /\.pdf$/i.test(filename***REMOVED***;
***REMOVED***
function getFilenameFromUrl(url***REMOVED*** {
  [url] = url.split(/[#?]/, 1***REMOVED***;
  return url.substring(url.lastIndexOf("/"***REMOVED*** + 1***REMOVED***;
***REMOVED***
function getPdfFilenameFromUrl(url, defaultFilename = "document.pdf"***REMOVED*** {
  if (typeof url !== "string"***REMOVED*** {
    return defaultFilename;
  ***REMOVED***
  if (isDataScheme(url***REMOVED******REMOVED*** {
    warn('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'***REMOVED***;
    return defaultFilename;
  ***REMOVED***
  const reURI = /^(?:(?:[^:]+:***REMOVED***?\/\/[^/]+***REMOVED***?([^?#]****REMOVED***(\?[^#]****REMOVED***?(#.****REMOVED***?$/;
  const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b***REMOVED***/i;
  const splitURI = reURI.exec(url***REMOVED***;
  let suggestedFilename = reFilename.exec(splitURI[1]***REMOVED*** || reFilename.exec(splitURI[2]***REMOVED*** || reFilename.exec(splitURI[3]***REMOVED***;
  if (suggestedFilename***REMOVED*** {
    suggestedFilename = suggestedFilename[0];
    if (suggestedFilename.includes("%"***REMOVED******REMOVED*** {
    ***REMOVED***
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename***REMOVED******REMOVED***[0];
      ***REMOVED*** catch {***REMOVED***
    ***REMOVED***
  ***REMOVED***
  return suggestedFilename || defaultFilename;
***REMOVED***
class StatTimer {
  started = Object.create(null***REMOVED***;
  times = [];
  time(name***REMOVED*** {
    if (name in this.started***REMOVED*** {
      warn(`Timer is already running for ${name***REMOVED***`***REMOVED***;
    ***REMOVED***
    this.started[name] = Date.now(***REMOVED***;
  ***REMOVED***
  timeEnd(name***REMOVED*** {
    if (!(name in this.started***REMOVED******REMOVED*** {
      warn(`Timer has not been started for ${name***REMOVED***`***REMOVED***;
    ***REMOVED***
    this.times.push({
      name,
      start: this.started[name],
      end: Date.now(***REMOVED***
    ***REMOVED******REMOVED***;
    delete this.started[name];
  ***REMOVED***
  toString(***REMOVED*** {
    const outBuf = [];
    let longest = 0;
    for (const {
      name
    ***REMOVED*** of this.times***REMOVED*** {
      longest = Math.max(name.length, longest***REMOVED***;
    ***REMOVED***
    for (const {
      name,
      start,
      end
    ***REMOVED*** of this.times***REMOVED*** {
      outBuf.push(`${name.padEnd(longest***REMOVED******REMOVED*** ${end - start***REMOVED***ms\n`***REMOVED***;
    ***REMOVED***
    return outBuf.join(""***REMOVED***;
  ***REMOVED***
***REMOVED***
function isValidFetchUrl(url, baseUrl***REMOVED*** {
***REMOVED***
    const {
      protocol
    ***REMOVED*** = baseUrl ? new URL(url, baseUrl***REMOVED*** : new URL(url***REMOVED***;
    return protocol === "http:" || protocol === "https:";
  ***REMOVED*** catch {
    return false;
  ***REMOVED***
***REMOVED***
function noContextMenu(e***REMOVED*** {
  e.preventDefault(***REMOVED***;
***REMOVED***
function stopEvent(e***REMOVED*** {
  e.preventDefault(***REMOVED***;
  e.stopPropagation(***REMOVED***;
***REMOVED***
function deprecated(details***REMOVED*** {
  console.log("Deprecated API usage: " + details***REMOVED***;
***REMOVED***
class PDFDateString {
  static #regex;
  static toDateObject(input***REMOVED*** {
    if (!input || typeof input !== "string"***REMOVED*** {
      return null;
    ***REMOVED***
    this.#regex ||= new RegExp("^D:" + "(\\d{4***REMOVED******REMOVED***" + "(\\d{2***REMOVED******REMOVED***?" + "(\\d{2***REMOVED******REMOVED***?" + "(\\d{2***REMOVED******REMOVED***?" + "(\\d{2***REMOVED******REMOVED***?" + "(\\d{2***REMOVED******REMOVED***?" + "([Z|+|-]***REMOVED***?" + "(\\d{2***REMOVED******REMOVED***?" + "'?" + "(\\d{2***REMOVED******REMOVED***?" + "'?"***REMOVED***;
    const matches = this.#regex.exec(input***REMOVED***;
    if (!matches***REMOVED*** {
      return null;
    ***REMOVED***
    const year = parseInt(matches[1], 10***REMOVED***;
    let month = parseInt(matches[2], 10***REMOVED***;
    month = month >= 1 && month <= 12 ? month - 1 : 0;
    let day = parseInt(matches[3], 10***REMOVED***;
    day = day >= 1 && day <= 31 ? day : 1;
    let hour = parseInt(matches[4], 10***REMOVED***;
    hour = hour >= 0 && hour <= 23 ? hour : 0;
    let minute = parseInt(matches[5], 10***REMOVED***;
    minute = minute >= 0 && minute <= 59 ? minute : 0;
    let second = parseInt(matches[6], 10***REMOVED***;
    second = second >= 0 && second <= 59 ? second : 0;
    const universalTimeRelation = matches[7] || "Z";
    let offsetHour = parseInt(matches[8], 10***REMOVED***;
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10***REMOVED*** || 0;
    offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;
    if (universalTimeRelation === "-"***REMOVED*** {
      hour += offsetHour;
      minute += offsetMinute;
    ***REMOVED*** else if (universalTimeRelation === "+"***REMOVED*** {
      hour -= offsetHour;
      minute -= offsetMinute;
    ***REMOVED***
    return new Date(Date.UTC(year, month, day, hour, minute, second***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
function getXfaPageViewport(xfaPage, {
  scale = 1,
  rotation = 0
***REMOVED******REMOVED*** {
  const {
    width,
    height
  ***REMOVED*** = xfaPage.attributes.style;
  const viewBox = [0, 0, parseInt(width***REMOVED***, parseInt(height***REMOVED***];
  return new PageViewport({
    viewBox,
    userUnit: 1,
    scale,
    rotation
  ***REMOVED******REMOVED***;
***REMOVED***
function getRGB(color***REMOVED*** {
  if (color.startsWith("#"***REMOVED******REMOVED*** {
    const colorRGB = parseInt(color.slice(1***REMOVED***, 16***REMOVED***;
    return [(colorRGB & 0xff0000***REMOVED*** >> 16, (colorRGB & 0x00ff00***REMOVED*** >> 8, colorRGB & 0x0000ff];
  ***REMOVED***
  if (color.startsWith("rgb("***REMOVED******REMOVED*** {
    return color.slice(4, -1***REMOVED***.split(","***REMOVED***.map(x => parseInt(x***REMOVED******REMOVED***;
  ***REMOVED***
  if (color.startsWith("rgba("***REMOVED******REMOVED*** {
    return color.slice(5, -1***REMOVED***.split(","***REMOVED***.map(x => parseInt(x***REMOVED******REMOVED***.slice(0, 3***REMOVED***;
  ***REMOVED***
  warn(`Not a valid color format: "${color***REMOVED***"`***REMOVED***;
  return [0, 0, 0];
***REMOVED***
function getColorValues(colors***REMOVED*** {
  const span = document.createElement("span"***REMOVED***;
  span.style.visibility = "hidden";
  document.body.append(span***REMOVED***;
  for (const name of colors.keys(***REMOVED******REMOVED*** {
    span.style.color = name;
    const computedColor = window.getComputedStyle(span***REMOVED***.color;
    colors.set(name, getRGB(computedColor***REMOVED******REMOVED***;
  ***REMOVED***
  span.remove(***REMOVED***;
***REMOVED***
function getCurrentTransform(ctx***REMOVED*** {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  ***REMOVED*** = ctx.getTransform(***REMOVED***;
  return [a, b, c, d, e, f];
***REMOVED***
function getCurrentTransformInverse(ctx***REMOVED*** {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  ***REMOVED*** = ctx.getTransform(***REMOVED***.invertSelf(***REMOVED***;
  return [a, b, c, d, e, f];
***REMOVED***
function setLayerDimensions(div, viewport, mustFlip = false, mustRotate = true***REMOVED*** {
  if (viewport instanceof PageViewport***REMOVED*** {
    const {
      pageWidth,
      pageHeight
    ***REMOVED*** = viewport.rawDims;
    const {
      style
    ***REMOVED*** = div;
    const useRound = util_FeatureTest.isCSSRoundSupported;
    const w = `var(--scale-factor***REMOVED*** * ${pageWidth***REMOVED***px`,
      h = `var(--scale-factor***REMOVED*** * ${pageHeight***REMOVED***px`;
    const widthStr = useRound ? `round(down, ${w***REMOVED***, var(--scale-round-x, 1px***REMOVED******REMOVED***` : `calc(${w***REMOVED******REMOVED***`,
      heightStr = useRound ? `round(down, ${h***REMOVED***, var(--scale-round-y, 1px***REMOVED******REMOVED***` : `calc(${h***REMOVED******REMOVED***`;
    if (!mustFlip || viewport.rotation % 180 === 0***REMOVED*** {
      style.width = widthStr;
      style.height = heightStr;
    ***REMOVED*** else {
      style.width = heightStr;
      style.height = widthStr;
    ***REMOVED***
  ***REMOVED***
  if (mustRotate***REMOVED*** {
    div.setAttribute("data-main-rotation", viewport.rotation***REMOVED***;
  ***REMOVED***
***REMOVED***
class OutputScale {
  constructor(***REMOVED*** {
    const pixelRatio = window.devicePixelRatio || 1;
    this.sx = pixelRatio;
    this.sy = pixelRatio;
  ***REMOVED***
  get scaled(***REMOVED*** {
    return this.sx !== 1 || this.sy !== 1;
  ***REMOVED***
  get symmetric(***REMOVED*** {
    return this.sx === this.sy;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/toolbar.js

class EditorToolbar {
  #toolbar = null;
  #colorPicker = null;
  #editor;
  #buttons = null;
  #altText = null;
  static #l10nRemove = null;
  constructor(editor***REMOVED*** {
    this.#editor = editor;
    EditorToolbar.#l10nRemove ||= Object.freeze({
      freetext: "pdfjs-editor-remove-freetext-button",
      highlight: "pdfjs-editor-remove-highlight-button",
      ink: "pdfjs-editor-remove-ink-button",
      stamp: "pdfjs-editor-remove-stamp-button"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    const editToolbar = this.#toolbar = document.createElement("div"***REMOVED***;
    editToolbar.classList.add("editToolbar", "hidden"***REMOVED***;
    editToolbar.setAttribute("role", "toolbar"***REMOVED***;
    const signal = this.#editor._uiManager._signal;
    editToolbar.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    editToolbar.addEventListener("pointerdown", EditorToolbar.#pointerDown, {
      signal
    ***REMOVED******REMOVED***;
    const buttons = this.#buttons = document.createElement("div"***REMOVED***;
    buttons.className = "buttons";
    editToolbar.append(buttons***REMOVED***;
    const position = this.#editor.toolbarPosition;
    if (position***REMOVED*** {
      const {
        style
      ***REMOVED*** = editToolbar;
      const x = this.#editor._uiManager.direction === "ltr" ? 1 - position[0] : position[0];
      style.insetInlineEnd = `${100 * x***REMOVED***%`;
      style.top = `calc(${100 * position[1]***REMOVED***% + var(--editor-toolbar-vert-offset***REMOVED******REMOVED***`;
    ***REMOVED***
    this.#addDeleteButton(***REMOVED***;
    return editToolbar;
  ***REMOVED***
  get div(***REMOVED*** {
    return this.#toolbar;
  ***REMOVED***
  static #pointerDown(e***REMOVED*** {
    e.stopPropagation(***REMOVED***;
  ***REMOVED***
  #focusIn(e***REMOVED*** {
    this.#editor._focusEventsAllowed = false;
    stopEvent(e***REMOVED***;
  ***REMOVED***
  #focusOut(e***REMOVED*** {
    this.#editor._focusEventsAllowed = true;
    stopEvent(e***REMOVED***;
  ***REMOVED***
  #addListenersToElement(element***REMOVED*** {
    const signal = this.#editor._uiManager._signal;
    element.addEventListener("focusin", this.#focusIn.bind(this***REMOVED***, {
      capture: true,
      signal
    ***REMOVED******REMOVED***;
    element.addEventListener("focusout", this.#focusOut.bind(this***REMOVED***, {
      capture: true,
      signal
    ***REMOVED******REMOVED***;
    element.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    this.#toolbar.classList.add("hidden"***REMOVED***;
    this.#colorPicker?.hideDropdown(***REMOVED***;
  ***REMOVED***
  show(***REMOVED*** {
    this.#toolbar.classList.remove("hidden"***REMOVED***;
    this.#altText?.shown(***REMOVED***;
  ***REMOVED***
  #addDeleteButton(***REMOVED*** {
    const {
      editorType,
      _uiManager
    ***REMOVED*** = this.#editor;
    const button = document.createElement("button"***REMOVED***;
    button.className = "delete";
    button.tabIndex = 0;
    button.setAttribute("data-l10n-id", EditorToolbar.#l10nRemove[editorType]***REMOVED***;
    this.#addListenersToElement(button***REMOVED***;
    button.addEventListener("click", e => {
      _uiManager.delete(***REMOVED***;
    ***REMOVED***, {
      signal: _uiManager._signal
    ***REMOVED******REMOVED***;
    this.#buttons.append(button***REMOVED***;
  ***REMOVED***
  get #divider(***REMOVED*** {
    const divider = document.createElement("div"***REMOVED***;
    divider.className = "divider";
    return divider;
  ***REMOVED***
  async addAltText(altText***REMOVED*** {
    const button = await altText.render(***REMOVED***;
    this.#addListenersToElement(button***REMOVED***;
    this.#buttons.prepend(button, this.#divider***REMOVED***;
    this.#altText = altText;
  ***REMOVED***
  addColorPicker(colorPicker***REMOVED*** {
    this.#colorPicker = colorPicker;
    const button = colorPicker.renderButton(***REMOVED***;
    this.#addListenersToElement(button***REMOVED***;
    this.#buttons.prepend(button, this.#divider***REMOVED***;
  ***REMOVED***
  remove(***REMOVED*** {
    this.#toolbar.remove(***REMOVED***;
    this.#colorPicker?.destroy(***REMOVED***;
    this.#colorPicker = null;
  ***REMOVED***
***REMOVED***
class HighlightToolbar {
  #buttons = null;
  #toolbar = null;
  #uiManager;
  constructor(uiManager***REMOVED*** {
    this.#uiManager = uiManager;
  ***REMOVED***
  #render(***REMOVED*** {
    const editToolbar = this.#toolbar = document.createElement("div"***REMOVED***;
    editToolbar.className = "editToolbar";
    editToolbar.setAttribute("role", "toolbar"***REMOVED***;
    editToolbar.addEventListener("contextmenu", noContextMenu, {
      signal: this.#uiManager._signal
    ***REMOVED******REMOVED***;
    const buttons = this.#buttons = document.createElement("div"***REMOVED***;
    buttons.className = "buttons";
    editToolbar.append(buttons***REMOVED***;
    this.#addHighlightButton(***REMOVED***;
    return editToolbar;
  ***REMOVED***
  #getLastPoint(boxes, isLTR***REMOVED*** {
    let lastY = 0;
    let lastX = 0;
    for (const box of boxes***REMOVED*** {
      const y = box.y + box.height;
      if (y < lastY***REMOVED*** {
        continue;
      ***REMOVED***
      const x = box.x + (isLTR ? box.width : 0***REMOVED***;
      if (y > lastY***REMOVED*** {
        lastX = x;
        lastY = y;
        continue;
      ***REMOVED***
      if (isLTR***REMOVED*** {
        if (x > lastX***REMOVED*** {
          lastX = x;
        ***REMOVED***
      ***REMOVED*** else if (x < lastX***REMOVED*** {
        lastX = x;
      ***REMOVED***
    ***REMOVED***
    return [isLTR ? 1 - lastX : lastX, lastY];
  ***REMOVED***
  show(parent, boxes, isLTR***REMOVED*** {
    const [x, y] = this.#getLastPoint(boxes, isLTR***REMOVED***;
    const {
      style
    ***REMOVED*** = this.#toolbar ||= this.#render(***REMOVED***;
    parent.append(this.#toolbar***REMOVED***;
    style.insetInlineEnd = `${100 * x***REMOVED***%`;
    style.top = `calc(${100 * y***REMOVED***% + var(--editor-toolbar-vert-offset***REMOVED******REMOVED***`;
  ***REMOVED***
  hide(***REMOVED*** {
    this.#toolbar.remove(***REMOVED***;
  ***REMOVED***
  #addHighlightButton(***REMOVED*** {
    const button = document.createElement("button"***REMOVED***;
    button.className = "highlightButton";
    button.tabIndex = 0;
    button.setAttribute("data-l10n-id", `pdfjs-highlight-floating-button1`***REMOVED***;
    const span = document.createElement("span"***REMOVED***;
    button.append(span***REMOVED***;
    span.className = "visuallyHidden";
    span.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button-label"***REMOVED***;
    const signal = this.#uiManager._signal;
    button.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    button.addEventListener("click", (***REMOVED*** => {
      this.#uiManager.highlightSelection("floating_button"***REMOVED***;
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.#buttons.append(button***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/tools.js



function bindEvents(obj, element, names***REMOVED*** {
  for (const name of names***REMOVED*** {
    element.addEventListener(name, obj[name].bind(obj***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
function opacityToHex(opacity***REMOVED*** {
  return Math.round(Math.min(255, Math.max(1, 255 * opacity***REMOVED******REMOVED******REMOVED***.toString(16***REMOVED***.padStart(2, "0"***REMOVED***;
***REMOVED***
class IdManager {
  #id = 0;
  get id(***REMOVED*** {
    return `${AnnotationEditorPrefix***REMOVED***${this.#id++***REMOVED***`;
  ***REMOVED***
***REMOVED***
class ImageManager {
  #baseId = getUuid(***REMOVED***;
  #id = 0;
  #cache = null;
  static get _isSVGFittingCanvas(***REMOVED*** {
    const svg = `data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>`;
    const canvas = new OffscreenCanvas(1, 3***REMOVED***;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true
    ***REMOVED******REMOVED***;
    const image = new Image(***REMOVED***;
    image.src = svg;
    const promise = image.decode(***REMOVED***.then((***REMOVED*** => {
      ctx.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 3***REMOVED***;
      return new Uint32Array(ctx.getImageData(0, 0, 1, 1***REMOVED***.data.buffer***REMOVED***[0] === 0;
    ***REMOVED******REMOVED***;
    return shadow(this, "_isSVGFittingCanvas", promise***REMOVED***;
  ***REMOVED***
  async #get(key, rawData***REMOVED*** {
    this.#cache ||= new Map(***REMOVED***;
    let data = this.#cache.get(key***REMOVED***;
    if (data === null***REMOVED*** {
      return null;
    ***REMOVED***
    if (data?.bitmap***REMOVED*** {
      data.refCounter += 1;
      return data;
    ***REMOVED***
  ***REMOVED***
      data ||= {
        bitmap: null,
        id: `image_${this.#baseId***REMOVED***_${this.#id++***REMOVED***`,
        refCounter: 0,
        isSvg: false
      ***REMOVED***;
      let image;
      if (typeof rawData === "string"***REMOVED*** {
        data.url = rawData;
        image = await fetchData(rawData, "blob"***REMOVED***;
      ***REMOVED*** else if (rawData instanceof File***REMOVED*** {
        image = data.file = rawData;
      ***REMOVED*** else if (rawData instanceof Blob***REMOVED*** {
        image = rawData;
      ***REMOVED***
      if (image.type === "image/svg+xml"***REMOVED*** {
        const mustRemoveAspectRatioPromise = ImageManager._isSVGFittingCanvas;
        const fileReader = new FileReader(***REMOVED***;
        const imageElement = new Image(***REMOVED***;
        const imagePromise = new Promise((resolve, reject***REMOVED*** => {
          imageElement.onload = (***REMOVED*** => {
            data.bitmap = imageElement;
            data.isSvg = true;
            resolve(***REMOVED***;
          ***REMOVED***;
          fileReader.onload = async (***REMOVED*** => {
            const url = data.svgUrl = fileReader.result;
            imageElement.src = (await mustRemoveAspectRatioPromise***REMOVED*** ? `${url***REMOVED***#svgView(preserveAspectRatio(none***REMOVED******REMOVED***` : url;
          ***REMOVED***;
          imageElement.onerror = fileReader.onerror = reject;
        ***REMOVED******REMOVED***;
        fileReader.readAsDataURL(image***REMOVED***;
        await imagePromise;
      ***REMOVED*** else {
        data.bitmap = await createImageBitmap(image***REMOVED***;
      ***REMOVED***
      data.refCounter = 1;
    ***REMOVED*** catch (e***REMOVED*** {
      warn(e***REMOVED***;
      data = null;
    ***REMOVED***
    this.#cache.set(key, data***REMOVED***;
    if (data***REMOVED*** {
      this.#cache.set(data.id, data***REMOVED***;
    ***REMOVED***
    return data;
  ***REMOVED***
  async getFromFile(file***REMOVED*** {
    const {
      lastModified,
      name,
      size,
      type
    ***REMOVED*** = file;
    return this.#get(`${lastModified***REMOVED***_${name***REMOVED***_${size***REMOVED***_${type***REMOVED***`, file***REMOVED***;
  ***REMOVED***
  async getFromUrl(url***REMOVED*** {
    return this.#get(url, url***REMOVED***;
  ***REMOVED***
  async getFromBlob(id, blobPromise***REMOVED*** {
    const blob = await blobPromise;
    return this.#get(id, blob***REMOVED***;
  ***REMOVED***
  async getFromId(id***REMOVED*** {
    this.#cache ||= new Map(***REMOVED***;
    const data = this.#cache.get(id***REMOVED***;
    if (!data***REMOVED*** {
      return null;
    ***REMOVED***
    if (data.bitmap***REMOVED*** {
      data.refCounter += 1;
      return data;
    ***REMOVED***
    if (data.file***REMOVED*** {
      return this.getFromFile(data.file***REMOVED***;
    ***REMOVED***
    if (data.blobPromise***REMOVED*** {
      const {
        blobPromise
      ***REMOVED*** = data;
      delete data.blobPromise;
      return this.getFromBlob(data.id, blobPromise***REMOVED***;
    ***REMOVED***
    return this.getFromUrl(data.url***REMOVED***;
  ***REMOVED***
  getFromCanvas(id, canvas***REMOVED*** {
    this.#cache ||= new Map(***REMOVED***;
    let data = this.#cache.get(id***REMOVED***;
    if (data?.bitmap***REMOVED*** {
      data.refCounter += 1;
      return data;
    ***REMOVED***
    const offscreen = new OffscreenCanvas(canvas.width, canvas.height***REMOVED***;
    const ctx = offscreen.getContext("2d"***REMOVED***;
    ctx.drawImage(canvas, 0, 0***REMOVED***;
    data = {
      bitmap: offscreen.transferToImageBitmap(***REMOVED***,
      id: `image_${this.#baseId***REMOVED***_${this.#id++***REMOVED***`,
      refCounter: 1,
      isSvg: false
    ***REMOVED***;
    this.#cache.set(id, data***REMOVED***;
    this.#cache.set(data.id, data***REMOVED***;
    return data;
  ***REMOVED***
  getSvgUrl(id***REMOVED*** {
    const data = this.#cache.get(id***REMOVED***;
    if (!data?.isSvg***REMOVED*** {
      return null;
    ***REMOVED***
    return data.svgUrl;
  ***REMOVED***
  deleteId(id***REMOVED*** {
    this.#cache ||= new Map(***REMOVED***;
    const data = this.#cache.get(id***REMOVED***;
    if (!data***REMOVED*** {
      return;
    ***REMOVED***
    data.refCounter -= 1;
    if (data.refCounter !== 0***REMOVED*** {
      return;
    ***REMOVED***
    const {
      bitmap
    ***REMOVED*** = data;
    if (!data.url && !data.file***REMOVED*** {
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height***REMOVED***;
      const ctx = canvas.getContext("bitmaprenderer"***REMOVED***;
      ctx.transferFromImageBitmap(bitmap***REMOVED***;
      data.blobPromise = canvas.convertToBlob(***REMOVED***;
    ***REMOVED***
    bitmap.close?.(***REMOVED***;
    data.bitmap = null;
  ***REMOVED***
  isValidId(id***REMOVED*** {
    return id.startsWith(`image_${this.#baseId***REMOVED***_`***REMOVED***;
  ***REMOVED***
***REMOVED***
class CommandManager {
  #commands = [];
  #locked = false;
  #maxSize;
  #position = -1;
  constructor(maxSize = 128***REMOVED*** {
    this.#maxSize = maxSize;
  ***REMOVED***
  add({
    cmd,
    undo,
    post,
    mustExec,
    type = NaN,
    overwriteIfSameType = false,
    keepUndo = false
  ***REMOVED******REMOVED*** {
    if (mustExec***REMOVED*** {
      cmd(***REMOVED***;
    ***REMOVED***
    if (this.#locked***REMOVED*** {
      return;
    ***REMOVED***
    const save = {
      cmd,
      undo,
      post,
      type
    ***REMOVED***;
    if (this.#position === -1***REMOVED*** {
      if (this.#commands.length > 0***REMOVED*** {
        this.#commands.length = 0;
      ***REMOVED***
      this.#position = 0;
      this.#commands.push(save***REMOVED***;
      return;
    ***REMOVED***
    if (overwriteIfSameType && this.#commands[this.#position].type === type***REMOVED*** {
      if (keepUndo***REMOVED*** {
        save.undo = this.#commands[this.#position].undo;
      ***REMOVED***
      this.#commands[this.#position] = save;
      return;
    ***REMOVED***
    const next = this.#position + 1;
    if (next === this.#maxSize***REMOVED*** {
      this.#commands.splice(0, 1***REMOVED***;
    ***REMOVED*** else {
      this.#position = next;
      if (next < this.#commands.length***REMOVED*** {
        this.#commands.splice(next***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#commands.push(save***REMOVED***;
  ***REMOVED***
  undo(***REMOVED*** {
    if (this.#position === -1***REMOVED*** {
      return;
    ***REMOVED***
    this.#locked = true;
    const {
      undo,
      post
    ***REMOVED*** = this.#commands[this.#position];
    undo(***REMOVED***;
    post?.(***REMOVED***;
    this.#locked = false;
    this.#position -= 1;
  ***REMOVED***
  redo(***REMOVED*** {
    if (this.#position < this.#commands.length - 1***REMOVED*** {
      this.#position += 1;
      this.#locked = true;
      const {
        cmd,
        post
      ***REMOVED*** = this.#commands[this.#position];
      cmd(***REMOVED***;
      post?.(***REMOVED***;
      this.#locked = false;
    ***REMOVED***
  ***REMOVED***
  hasSomethingToUndo(***REMOVED*** {
    return this.#position !== -1;
  ***REMOVED***
  hasSomethingToRedo(***REMOVED*** {
    return this.#position < this.#commands.length - 1;
  ***REMOVED***
  cleanType(type***REMOVED*** {
    if (this.#position === -1***REMOVED*** {
      return;
    ***REMOVED***
    for (let i = this.#position; i >= 0; i--***REMOVED*** {
      if (this.#commands[i].type !== type***REMOVED*** {
        this.#commands.splice(i + 1, this.#position - i***REMOVED***;
        this.#position = i;
        return;
      ***REMOVED***
    ***REMOVED***
    this.#commands.length = 0;
    this.#position = -1;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#commands = null;
  ***REMOVED***
***REMOVED***
class KeyboardManager {
  constructor(callbacks***REMOVED*** {
    this.buffer = [];
    this.callbacks = new Map(***REMOVED***;
    this.allKeys = new Set(***REMOVED***;
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    for (const [keys, callback, options = {***REMOVED***] of callbacks***REMOVED*** {
      for (const key of keys***REMOVED*** {
        const isMacKey = key.startsWith("mac+"***REMOVED***;
        if (isMac && isMacKey***REMOVED*** {
          this.callbacks.set(key.slice(4***REMOVED***, {
            callback,
            options
          ***REMOVED******REMOVED***;
          this.allKeys.add(key.split("+"***REMOVED***.at(-1***REMOVED******REMOVED***;
        ***REMOVED*** else if (!isMac && !isMacKey***REMOVED*** {
          this.callbacks.set(key, {
            callback,
            options
          ***REMOVED******REMOVED***;
          this.allKeys.add(key.split("+"***REMOVED***.at(-1***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #serialize(event***REMOVED*** {
    if (event.altKey***REMOVED*** {
      this.buffer.push("alt"***REMOVED***;
    ***REMOVED***
    if (event.ctrlKey***REMOVED*** {
      this.buffer.push("ctrl"***REMOVED***;
    ***REMOVED***
    if (event.metaKey***REMOVED*** {
      this.buffer.push("meta"***REMOVED***;
    ***REMOVED***
    if (event.shiftKey***REMOVED*** {
      this.buffer.push("shift"***REMOVED***;
    ***REMOVED***
    this.buffer.push(event.key***REMOVED***;
    const str = this.buffer.join("+"***REMOVED***;
    this.buffer.length = 0;
    return str;
  ***REMOVED***
  exec(self, event***REMOVED*** {
    if (!this.allKeys.has(event.key***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    const info = this.callbacks.get(this.#serialize(event***REMOVED******REMOVED***;
    if (!info***REMOVED*** {
      return;
    ***REMOVED***
    const {
      callback,
      options: {
        bubbles = false,
        args = [],
        checker = null
      ***REMOVED***
    ***REMOVED*** = info;
    if (checker && !checker(self, event***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    callback.bind(self, ...args, event***REMOVED***(***REMOVED***;
    if (!bubbles***REMOVED*** {
      stopEvent(event***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class ColorManager {
  static _colorsMapping = new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]***REMOVED***;
  get _colors(***REMOVED*** {
    const colors = new Map([["CanvasText", null], ["Canvas", null]]***REMOVED***;
    getColorValues(colors***REMOVED***;
    return shadow(this, "_colors", colors***REMOVED***;
  ***REMOVED***
  convert(color***REMOVED*** {
    const rgb = getRGB(color***REMOVED***;
    if (!window.matchMedia("(forced-colors: active***REMOVED***"***REMOVED***.matches***REMOVED*** {
      return rgb;
    ***REMOVED***
    for (const [name, RGB] of this._colors***REMOVED*** {
      if (RGB.every((x, i***REMOVED*** => x === rgb[i]***REMOVED******REMOVED*** {
        return ColorManager._colorsMapping.get(name***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return rgb;
  ***REMOVED***
  getHexCode(name***REMOVED*** {
    const rgb = this._colors.get(name***REMOVED***;
    if (!rgb***REMOVED*** {
      return name;
    ***REMOVED***
    return Util.makeHexColor(...rgb***REMOVED***;
  ***REMOVED***
***REMOVED***
class AnnotationEditorUIManager {
  #abortController = new AbortController(***REMOVED***;
  #activeEditor = null;
  #allEditors = new Map(***REMOVED***;
  #allLayers = new Map(***REMOVED***;
  #altTextManager = null;
  #annotationStorage = null;
  #changedExistingAnnotations = null;
  #commandManager = new CommandManager(***REMOVED***;
  #copyPasteAC = null;
  #currentDrawingSession = null;
  #currentPageIndex = 0;
  #deletedAnnotationsElementIds = new Set(***REMOVED***;
  #draggingEditors = null;
  #editorTypes = null;
  #editorsToRescale = new Set(***REMOVED***;
  _editorUndoBar = null;
  #enableHighlightFloatingButton = false;
  #enableUpdatedAddImage = false;
  #enableNewAltTextWhenAddingImage = false;
  #filterFactory = null;
  #focusMainContainerTimeoutId = null;
  #focusManagerAC = null;
  #highlightColors = null;
  #highlightWhenShiftUp = false;
  #highlightToolbar = null;
  #idManager = new IdManager(***REMOVED***;
  #isEnabled = false;
  #isWaiting = false;
  #keyboardManagerAC = null;
  #lastActiveElement = null;
  #mainHighlightColorPicker = null;
  #mlManager = null;
  #mode = AnnotationEditorType.NONE;
  #selectedEditors = new Set(***REMOVED***;
  #selectedTextNode = null;
  #pageColors = null;
  #showAllStates = null;
  #previousStates = {
    isEditing: false,
    isEmpty: true,
    hasSomethingToUndo: false,
    hasSomethingToRedo: false,
    hasSelectedEditor: false,
    hasSelectedText: false
  ***REMOVED***;
  #translation = [0, 0];
  #translationTimeoutId = null;
  #container = null;
  #viewer = null;
  #updateModeCapability = null;
  static TRANSLATE_SMALL = 1;
  static TRANSLATE_BIG = 10;
  static get _keyboardManager(***REMOVED*** {
    const proto = AnnotationEditorUIManager.prototype;
    const arrowChecker = self => self.#container.contains(document.activeElement***REMOVED*** && document.activeElement.tagName !== "BUTTON" && self.hasSomethingToControl(***REMOVED***;
    const textInputChecker = (_self, {
      target: el
    ***REMOVED******REMOVED*** => {
      if (el instanceof HTMLInputElement***REMOVED*** {
        const {
          type
        ***REMOVED*** = el;
        return type !== "text" && type !== "number";
      ***REMOVED***
      return true;
    ***REMOVED***;
    const small = this.TRANSLATE_SMALL;
    const big = this.TRANSLATE_BIG;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ctrl+a", "mac+meta+a"], proto.selectAll, {
      checker: textInputChecker
    ***REMOVED***], [["ctrl+z", "mac+meta+z"], proto.undo, {
      checker: textInputChecker
    ***REMOVED***], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], proto.redo, {
      checker: textInputChecker
    ***REMOVED***], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], proto.delete, {
      checker: textInputChecker
    ***REMOVED***], [["Enter", "mac+Enter"], proto.addNewEditorFromKeyboard, {
      checker: (self, {
        target: el
      ***REMOVED******REMOVED*** => !(el instanceof HTMLButtonElement***REMOVED*** && self.#container.contains(el***REMOVED*** && !self.isEnterHandled
    ***REMOVED***], [[" ", "mac+ "], proto.addNewEditorFromKeyboard, {
      checker: (self, {
        target: el
      ***REMOVED******REMOVED*** => !(el instanceof HTMLButtonElement***REMOVED*** && self.#container.contains(document.activeElement***REMOVED***
    ***REMOVED***], [["Escape", "mac+Escape"], proto.unselectAll], [["ArrowLeft", "mac+ArrowLeft"], proto.translateSelectedEditors, {
      args: [-small, 0],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], proto.translateSelectedEditors, {
      args: [-big, 0],
      checker: arrowChecker
    ***REMOVED***], [["ArrowRight", "mac+ArrowRight"], proto.translateSelectedEditors, {
      args: [small, 0],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], proto.translateSelectedEditors, {
      args: [big, 0],
      checker: arrowChecker
    ***REMOVED***], [["ArrowUp", "mac+ArrowUp"], proto.translateSelectedEditors, {
      args: [0, -small],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], proto.translateSelectedEditors, {
      args: [0, -big],
      checker: arrowChecker
    ***REMOVED***], [["ArrowDown", "mac+ArrowDown"], proto.translateSelectedEditors, {
      args: [0, small],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], proto.translateSelectedEditors, {
      args: [0, big],
      checker: arrowChecker
    ***REMOVED***]]***REMOVED******REMOVED***;
  ***REMOVED***
  constructor(container, viewer, altTextManager, eventBus, pdfDocument, pageColors, highlightColors, enableHighlightFloatingButton, enableUpdatedAddImage, enableNewAltTextWhenAddingImage, mlManager, editorUndoBar, supportsPinchToZoom***REMOVED*** {
    const signal = this._signal = this.#abortController.signal;
    this.#container = container;
    this.#viewer = viewer;
    this.#altTextManager = altTextManager;
    this._eventBus = eventBus;
    eventBus._on("editingaction", this.onEditingAction.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("pagechanging", this.onPageChanging.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("scalechanging", this.onScaleChanging.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("rotationchanging", this.onRotationChanging.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("setpreference", this.onSetPreference.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    eventBus._on("switchannotationeditorparams", evt => this.updateParams(evt.type, evt.value***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.#addSelectionListener(***REMOVED***;
    this.#addDragAndDropListeners(***REMOVED***;
    this.#addKeyboardManager(***REMOVED***;
    this.#annotationStorage = pdfDocument.annotationStorage;
    this.#filterFactory = pdfDocument.filterFactory;
    this.#pageColors = pageColors;
    this.#highlightColors = highlightColors || null;
    this.#enableHighlightFloatingButton = enableHighlightFloatingButton;
    this.#enableUpdatedAddImage = enableUpdatedAddImage;
    this.#enableNewAltTextWhenAddingImage = enableNewAltTextWhenAddingImage;
    this.#mlManager = mlManager || null;
    this.viewParameters = {
      realScale: PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: 0
    ***REMOVED***;
    this.isShiftKeyDown = false;
    this._editorUndoBar = editorUndoBar || null;
    this._supportsPinchToZoom = supportsPinchToZoom !== false;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#updateModeCapability?.resolve(***REMOVED***;
    this.#updateModeCapability = null;
    this.#abortController?.abort(***REMOVED***;
    this.#abortController = null;
    this._signal = null;
    for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
      layer.destroy(***REMOVED***;
    ***REMOVED***
    this.#allLayers.clear(***REMOVED***;
    this.#allEditors.clear(***REMOVED***;
    this.#editorsToRescale.clear(***REMOVED***;
    this.#activeEditor = null;
    this.#selectedEditors.clear(***REMOVED***;
    this.#commandManager.destroy(***REMOVED***;
    this.#altTextManager?.destroy(***REMOVED***;
    this.#highlightToolbar?.hide(***REMOVED***;
    this.#highlightToolbar = null;
    if (this.#focusMainContainerTimeoutId***REMOVED*** {
      clearTimeout(this.#focusMainContainerTimeoutId***REMOVED***;
      this.#focusMainContainerTimeoutId = null;
    ***REMOVED***
    if (this.#translationTimeoutId***REMOVED*** {
      clearTimeout(this.#translationTimeoutId***REMOVED***;
      this.#translationTimeoutId = null;
    ***REMOVED***
    this._editorUndoBar?.destroy(***REMOVED***;
  ***REMOVED***
  combinedSignal(ac***REMOVED*** {
    return AbortSignal.any([this._signal, ac.signal]***REMOVED***;
  ***REMOVED***
  get mlManager(***REMOVED*** {
    return this.#mlManager;
  ***REMOVED***
  get useNewAltTextFlow(***REMOVED*** {
    return this.#enableUpdatedAddImage;
  ***REMOVED***
  get useNewAltTextWhenAddingImage(***REMOVED*** {
    return this.#enableNewAltTextWhenAddingImage;
  ***REMOVED***
  get hcmFilter(***REMOVED*** {
    return shadow(this, "hcmFilter", this.#pageColors ? this.#filterFactory.addHCMFilter(this.#pageColors.foreground, this.#pageColors.background***REMOVED*** : "none"***REMOVED***;
  ***REMOVED***
  get direction(***REMOVED*** {
    return shadow(this, "direction", getComputedStyle(this.#container***REMOVED***.direction***REMOVED***;
  ***REMOVED***
  get highlightColors(***REMOVED*** {
    return shadow(this, "highlightColors", this.#highlightColors ? new Map(this.#highlightColors.split(","***REMOVED***.map(pair => pair.split("="***REMOVED***.map(x => x.trim(***REMOVED******REMOVED******REMOVED******REMOVED*** : null***REMOVED***;
  ***REMOVED***
  get highlightColorNames(***REMOVED*** {
    return shadow(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, e => e.reverse(***REMOVED******REMOVED******REMOVED*** : null***REMOVED***;
  ***REMOVED***
  setCurrentDrawingSession(layer***REMOVED*** {
    if (layer***REMOVED*** {
      this.unselectAll(***REMOVED***;
      this.disableUserSelect(true***REMOVED***;
    ***REMOVED*** else {
      this.disableUserSelect(false***REMOVED***;
    ***REMOVED***
    this.#currentDrawingSession = layer;
  ***REMOVED***
  setMainHighlightColorPicker(colorPicker***REMOVED*** {
    this.#mainHighlightColorPicker = colorPicker;
  ***REMOVED***
  editAltText(editor, firstTime = false***REMOVED*** {
    this.#altTextManager?.editAltText(this, editor, firstTime***REMOVED***;
  ***REMOVED***
  switchToMode(mode, callback***REMOVED*** {
    this._eventBus.on("annotationeditormodechanged", callback, {
      once: true,
      signal: this._signal
    ***REMOVED******REMOVED***;
    this._eventBus.dispatch("showannotationeditorui", {
      source: this,
      mode
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setPreference(name, value***REMOVED*** {
    this._eventBus.dispatch("setpreference", {
      source: this,
      name,
      value
    ***REMOVED******REMOVED***;
  ***REMOVED***
  onSetPreference({
    name,
    value
  ***REMOVED******REMOVED*** {
    switch (name***REMOVED*** {
      case "enableNewAltTextWhenAddingImage":
        this.#enableNewAltTextWhenAddingImage = value;
        break;
    ***REMOVED***
  ***REMOVED***
  onPageChanging({
    pageNumber
  ***REMOVED******REMOVED*** {
    this.#currentPageIndex = pageNumber - 1;
  ***REMOVED***
  focusMainContainer(***REMOVED*** {
    this.#container.focus(***REMOVED***;
  ***REMOVED***
  findParent(x, y***REMOVED*** {
    for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
      const {
        x: layerX,
        y: layerY,
        width,
        height
      ***REMOVED*** = layer.div.getBoundingClientRect(***REMOVED***;
      if (x >= layerX && x <= layerX + width && y >= layerY && y <= layerY + height***REMOVED*** {
        return layer;
      ***REMOVED***
    ***REMOVED***
    return null;
  ***REMOVED***
  disableUserSelect(value = false***REMOVED*** {
    this.#viewer.classList.toggle("noUserSelect", value***REMOVED***;
  ***REMOVED***
  addShouldRescale(editor***REMOVED*** {
    this.#editorsToRescale.add(editor***REMOVED***;
  ***REMOVED***
  removeShouldRescale(editor***REMOVED*** {
    this.#editorsToRescale.delete(editor***REMOVED***;
  ***REMOVED***
  onScaleChanging({
    scale
  ***REMOVED******REMOVED*** {
    this.commitOrRemove(***REMOVED***;
    this.viewParameters.realScale = scale * PixelsPerInch.PDF_TO_CSS_UNITS;
    for (const editor of this.#editorsToRescale***REMOVED*** {
      editor.onScaleChanging(***REMOVED***;
    ***REMOVED***
    this.#currentDrawingSession?.onScaleChanging(***REMOVED***;
  ***REMOVED***
  onRotationChanging({
    pagesRotation
  ***REMOVED******REMOVED*** {
    this.commitOrRemove(***REMOVED***;
    this.viewParameters.rotation = pagesRotation;
  ***REMOVED***
  #getAnchorElementForSelection({
    anchorNode
  ***REMOVED******REMOVED*** {
    return anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode;
  ***REMOVED***
  #getLayerForTextLayer(textLayer***REMOVED*** {
    const {
      currentLayer
    ***REMOVED*** = this;
    if (currentLayer.hasTextLayer(textLayer***REMOVED******REMOVED*** {
      return currentLayer;
    ***REMOVED***
    for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
      if (layer.hasTextLayer(textLayer***REMOVED******REMOVED*** {
        return layer;
      ***REMOVED***
    ***REMOVED***
    return null;
  ***REMOVED***
  highlightSelection(methodOfCreation = ""***REMOVED*** {
    const selection = document.getSelection(***REMOVED***;
    if (!selection || selection.isCollapsed***REMOVED*** {
      return;
    ***REMOVED***
    const {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    ***REMOVED*** = selection;
    const text = selection.toString(***REMOVED***;
    const anchorElement = this.#getAnchorElementForSelection(selection***REMOVED***;
    const textLayer = anchorElement.closest(".textLayer"***REMOVED***;
    const boxes = this.getSelectionBoxes(textLayer***REMOVED***;
    if (!boxes***REMOVED*** {
      return;
    ***REMOVED***
    selection.empty(***REMOVED***;
    const layer = this.#getLayerForTextLayer(textLayer***REMOVED***;
    const isNoneMode = this.#mode === AnnotationEditorType.NONE;
    const callback = (***REMOVED*** => {
      layer?.createAndAddNewEditor({
        x: 0,
        y: 0
      ***REMOVED***, false, {
        methodOfCreation,
        boxes,
        anchorNode,
        anchorOffset,
        focusNode,
        focusOffset,
        text
      ***REMOVED******REMOVED***;
      if (isNoneMode***REMOVED*** {
        this.showAllEditors("highlight", true, true***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    if (isNoneMode***REMOVED*** {
      this.switchToMode(AnnotationEditorType.HIGHLIGHT, callback***REMOVED***;
      return;
    ***REMOVED***
    callback(***REMOVED***;
  ***REMOVED***
  #displayHighlightToolbar(***REMOVED*** {
    const selection = document.getSelection(***REMOVED***;
    if (!selection || selection.isCollapsed***REMOVED*** {
      return;
    ***REMOVED***
    const anchorElement = this.#getAnchorElementForSelection(selection***REMOVED***;
    const textLayer = anchorElement.closest(".textLayer"***REMOVED***;
    const boxes = this.getSelectionBoxes(textLayer***REMOVED***;
    if (!boxes***REMOVED*** {
      return;
    ***REMOVED***
    this.#highlightToolbar ||= new HighlightToolbar(this***REMOVED***;
    this.#highlightToolbar.show(textLayer, boxes, this.direction === "ltr"***REMOVED***;
  ***REMOVED***
  addToAnnotationStorage(editor***REMOVED*** {
    if (!editor.isEmpty(***REMOVED*** && this.#annotationStorage && !this.#annotationStorage.has(editor.id***REMOVED******REMOVED*** {
      this.#annotationStorage.setValue(editor.id, editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #selectionChange(***REMOVED*** {
    const selection = document.getSelection(***REMOVED***;
    if (!selection || selection.isCollapsed***REMOVED*** {
      if (this.#selectedTextNode***REMOVED*** {
        this.#highlightToolbar?.hide(***REMOVED***;
        this.#selectedTextNode = null;
        this.#dispatchUpdateStates({
          hasSelectedText: false
        ***REMOVED******REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    const {
      anchorNode
    ***REMOVED*** = selection;
    if (anchorNode === this.#selectedTextNode***REMOVED*** {
      return;
    ***REMOVED***
    const anchorElement = this.#getAnchorElementForSelection(selection***REMOVED***;
    const textLayer = anchorElement.closest(".textLayer"***REMOVED***;
    if (!textLayer***REMOVED*** {
      if (this.#selectedTextNode***REMOVED*** {
        this.#highlightToolbar?.hide(***REMOVED***;
        this.#selectedTextNode = null;
        this.#dispatchUpdateStates({
          hasSelectedText: false
        ***REMOVED******REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    this.#highlightToolbar?.hide(***REMOVED***;
    this.#selectedTextNode = anchorNode;
    this.#dispatchUpdateStates({
      hasSelectedText: true
    ***REMOVED******REMOVED***;
    if (this.#mode !== AnnotationEditorType.HIGHLIGHT && this.#mode !== AnnotationEditorType.NONE***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#mode === AnnotationEditorType.HIGHLIGHT***REMOVED*** {
      this.showAllEditors("highlight", true, true***REMOVED***;
    ***REMOVED***
    this.#highlightWhenShiftUp = this.isShiftKeyDown;
    if (!this.isShiftKeyDown***REMOVED*** {
      const activeLayer = this.#mode === AnnotationEditorType.HIGHLIGHT ? this.#getLayerForTextLayer(textLayer***REMOVED*** : null;
      activeLayer?.toggleDrawing(***REMOVED***;
      const ac = new AbortController(***REMOVED***;
      const signal = this.combinedSignal(ac***REMOVED***;
      const pointerup = e => {
        if (e.type === "pointerup" && e.button !== 0***REMOVED*** {
          return;
        ***REMOVED***
        ac.abort(***REMOVED***;
        activeLayer?.toggleDrawing(true***REMOVED***;
        if (e.type === "pointerup"***REMOVED*** {
          this.#onSelectEnd("main_toolbar"***REMOVED***;
        ***REMOVED***
      ***REMOVED***;
      window.addEventListener("pointerup", pointerup, {
        signal
      ***REMOVED******REMOVED***;
      window.addEventListener("blur", pointerup, {
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #onSelectEnd(methodOfCreation = ""***REMOVED*** {
    if (this.#mode === AnnotationEditorType.HIGHLIGHT***REMOVED*** {
      this.highlightSelection(methodOfCreation***REMOVED***;
    ***REMOVED*** else if (this.#enableHighlightFloatingButton***REMOVED*** {
      this.#displayHighlightToolbar(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #addSelectionListener(***REMOVED*** {
    document.addEventListener("selectionchange", this.#selectionChange.bind(this***REMOVED***, {
      signal: this._signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #addFocusManager(***REMOVED*** {
    if (this.#focusManagerAC***REMOVED*** {
      return;
    ***REMOVED***
    this.#focusManagerAC = new AbortController(***REMOVED***;
    const signal = this.combinedSignal(this.#focusManagerAC***REMOVED***;
    window.addEventListener("focus", this.focus.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("blur", this.blur.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #removeFocusManager(***REMOVED*** {
    this.#focusManagerAC?.abort(***REMOVED***;
    this.#focusManagerAC = null;
  ***REMOVED***
  blur(***REMOVED*** {
    this.isShiftKeyDown = false;
    if (this.#highlightWhenShiftUp***REMOVED*** {
      this.#highlightWhenShiftUp = false;
      this.#onSelectEnd("main_toolbar"***REMOVED***;
    ***REMOVED***
    if (!this.hasSelection***REMOVED*** {
      return;
    ***REMOVED***
    const {
      activeElement
    ***REMOVED*** = document;
    for (const editor of this.#selectedEditors***REMOVED*** {
      if (editor.div.contains(activeElement***REMOVED******REMOVED*** {
        this.#lastActiveElement = [editor, activeElement];
        editor._focusEventsAllowed = false;
        break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  focus(***REMOVED*** {
    if (!this.#lastActiveElement***REMOVED*** {
      return;
    ***REMOVED***
    const [lastEditor, lastActiveElement] = this.#lastActiveElement;
    this.#lastActiveElement = null;
    lastActiveElement.addEventListener("focusin", (***REMOVED*** => {
      lastEditor._focusEventsAllowed = true;
    ***REMOVED***, {
      once: true,
      signal: this._signal
    ***REMOVED******REMOVED***;
    lastActiveElement.focus(***REMOVED***;
  ***REMOVED***
  #addKeyboardManager(***REMOVED*** {
    if (this.#keyboardManagerAC***REMOVED*** {
      return;
    ***REMOVED***
    this.#keyboardManagerAC = new AbortController(***REMOVED***;
    const signal = this.combinedSignal(this.#keyboardManagerAC***REMOVED***;
    window.addEventListener("keydown", this.keydown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("keyup", this.keyup.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #removeKeyboardManager(***REMOVED*** {
    this.#keyboardManagerAC?.abort(***REMOVED***;
    this.#keyboardManagerAC = null;
  ***REMOVED***
  #addCopyPasteListeners(***REMOVED*** {
    if (this.#copyPasteAC***REMOVED*** {
      return;
    ***REMOVED***
    this.#copyPasteAC = new AbortController(***REMOVED***;
    const signal = this.combinedSignal(this.#copyPasteAC***REMOVED***;
    document.addEventListener("copy", this.copy.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    document.addEventListener("cut", this.cut.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    document.addEventListener("paste", this.paste.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #removeCopyPasteListeners(***REMOVED*** {
    this.#copyPasteAC?.abort(***REMOVED***;
    this.#copyPasteAC = null;
  ***REMOVED***
  #addDragAndDropListeners(***REMOVED*** {
    const signal = this._signal;
    document.addEventListener("dragover", this.dragOver.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    document.addEventListener("drop", this.drop.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  addEditListeners(***REMOVED*** {
    this.#addKeyboardManager(***REMOVED***;
    this.#addCopyPasteListeners(***REMOVED***;
  ***REMOVED***
  removeEditListeners(***REMOVED*** {
    this.#removeKeyboardManager(***REMOVED***;
    this.#removeCopyPasteListeners(***REMOVED***;
  ***REMOVED***
  dragOver(event***REMOVED*** {
    for (const {
      type
    ***REMOVED*** of event.dataTransfer.items***REMOVED*** {
      for (const editorType of this.#editorTypes***REMOVED*** {
        if (editorType.isHandlingMimeForPasting(type***REMOVED******REMOVED*** {
          event.dataTransfer.dropEffect = "copy";
          event.preventDefault(***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  drop(event***REMOVED*** {
    for (const item of event.dataTransfer.items***REMOVED*** {
      for (const editorType of this.#editorTypes***REMOVED*** {
        if (editorType.isHandlingMimeForPasting(item.type***REMOVED******REMOVED*** {
          editorType.paste(item, this.currentLayer***REMOVED***;
          event.preventDefault(***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  copy(event***REMOVED*** {
    event.preventDefault(***REMOVED***;
    this.#activeEditor?.commitOrRemove(***REMOVED***;
    if (!this.hasSelection***REMOVED*** {
      return;
    ***REMOVED***
    const editors = [];
    for (const editor of this.#selectedEditors***REMOVED*** {
      const serialized = editor.serialize(true***REMOVED***;
      if (serialized***REMOVED*** {
        editors.push(serialized***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (editors.length === 0***REMOVED*** {
      return;
    ***REMOVED***
    event.clipboardData.setData("application/pdfjs", JSON.stringify(editors***REMOVED******REMOVED***;
  ***REMOVED***
  cut(event***REMOVED*** {
    this.copy(event***REMOVED***;
    this.delete(***REMOVED***;
  ***REMOVED***
  async paste(event***REMOVED*** {
    event.preventDefault(***REMOVED***;
    const {
      clipboardData
    ***REMOVED*** = event;
    for (const item of clipboardData.items***REMOVED*** {
      for (const editorType of this.#editorTypes***REMOVED*** {
        if (editorType.isHandlingMimeForPasting(item.type***REMOVED******REMOVED*** {
          editorType.paste(item, this.currentLayer***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    let data = clipboardData.getData("application/pdfjs"***REMOVED***;
    if (!data***REMOVED*** {
      return;
    ***REMOVED***
  ***REMOVED***
      data = JSON.parse(data***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      warn(`paste: "${ex.message***REMOVED***".`***REMOVED***;
      return;
    ***REMOVED***
    if (!Array.isArray(data***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this.unselectAll(***REMOVED***;
    const layer = this.currentLayer;
  ***REMOVED***
      const newEditors = [];
      for (const editor of data***REMOVED*** {
        const deserializedEditor = await layer.deserialize(editor***REMOVED***;
        if (!deserializedEditor***REMOVED*** {
          return;
        ***REMOVED***
        newEditors.push(deserializedEditor***REMOVED***;
      ***REMOVED***
      const cmd = (***REMOVED*** => {
        for (const editor of newEditors***REMOVED*** {
          this.#addEditorToLayer(editor***REMOVED***;
        ***REMOVED***
        this.#selectEditors(newEditors***REMOVED***;
      ***REMOVED***;
      const undo = (***REMOVED*** => {
        for (const editor of newEditors***REMOVED*** {
          editor.remove(***REMOVED***;
        ***REMOVED***
      ***REMOVED***;
      this.addCommands({
        cmd,
        undo,
        mustExec: true
      ***REMOVED******REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      warn(`paste: "${ex.message***REMOVED***".`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  keydown(event***REMOVED*** {
    if (!this.isShiftKeyDown && event.key === "Shift"***REMOVED*** {
      this.isShiftKeyDown = true;
    ***REMOVED***
    if (this.#mode !== AnnotationEditorType.NONE && !this.isEditorHandlingKeyboard***REMOVED*** {
      AnnotationEditorUIManager._keyboardManager.exec(this, event***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  keyup(event***REMOVED*** {
    if (this.isShiftKeyDown && event.key === "Shift"***REMOVED*** {
      this.isShiftKeyDown = false;
      if (this.#highlightWhenShiftUp***REMOVED*** {
        this.#highlightWhenShiftUp = false;
        this.#onSelectEnd("main_toolbar"***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  onEditingAction({
    name
  ***REMOVED******REMOVED*** {
    switch (name***REMOVED*** {
      case "undo":
      case "redo":
      case "delete":
      case "selectAll":
        this[name](***REMOVED***;
        break;
      case "highlightSelection":
        this.highlightSelection("context_menu"***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  #dispatchUpdateStates(details***REMOVED*** {
    const hasChanged = Object.entries(details***REMOVED***.some(([key, value]***REMOVED*** => this.#previousStates[key] !== value***REMOVED***;
    if (hasChanged***REMOVED*** {
      this._eventBus.dispatch("annotationeditorstateschanged", {
        source: this,
        details: Object.assign(this.#previousStates, details***REMOVED***
      ***REMOVED******REMOVED***;
      if (this.#mode === AnnotationEditorType.HIGHLIGHT && details.hasSelectedEditor === false***REMOVED*** {
        this.#dispatchUpdateUI([[AnnotationEditorParamsType.HIGHLIGHT_FREE, true]]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #dispatchUpdateUI(details***REMOVED*** {
    this._eventBus.dispatch("annotationeditorparamschanged", {
      source: this,
      details
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setEditingState(isEditing***REMOVED*** {
    if (isEditing***REMOVED*** {
      this.#addFocusManager(***REMOVED***;
      this.#addCopyPasteListeners(***REMOVED***;
      this.#dispatchUpdateStates({
        isEditing: this.#mode !== AnnotationEditorType.NONE,
        isEmpty: this.#isEmpty(***REMOVED***,
        hasSomethingToUndo: this.#commandManager.hasSomethingToUndo(***REMOVED***,
        hasSomethingToRedo: this.#commandManager.hasSomethingToRedo(***REMOVED***,
        hasSelectedEditor: false
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this.#removeFocusManager(***REMOVED***;
      this.#removeCopyPasteListeners(***REMOVED***;
      this.#dispatchUpdateStates({
        isEditing: false
      ***REMOVED******REMOVED***;
      this.disableUserSelect(false***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  registerEditorTypes(types***REMOVED*** {
    if (this.#editorTypes***REMOVED*** {
      return;
    ***REMOVED***
    this.#editorTypes = types;
    for (const editorType of this.#editorTypes***REMOVED*** {
      this.#dispatchUpdateUI(editorType.defaultPropertiesToUpdate***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getId(***REMOVED*** {
    return this.#idManager.id;
  ***REMOVED***
  get currentLayer(***REMOVED*** {
    return this.#allLayers.get(this.#currentPageIndex***REMOVED***;
  ***REMOVED***
  getLayer(pageIndex***REMOVED*** {
    return this.#allLayers.get(pageIndex***REMOVED***;
  ***REMOVED***
  get currentPageIndex(***REMOVED*** {
    return this.#currentPageIndex;
  ***REMOVED***
  addLayer(layer***REMOVED*** {
    this.#allLayers.set(layer.pageIndex, layer***REMOVED***;
    if (this.#isEnabled***REMOVED*** {
      layer.enable(***REMOVED***;
    ***REMOVED*** else {
      layer.disable(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  removeLayer(layer***REMOVED*** {
    this.#allLayers.delete(layer.pageIndex***REMOVED***;
  ***REMOVED***
  async updateMode(mode, editId = null, isFromKeyboard = false***REMOVED*** {
    if (this.#mode === mode***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#updateModeCapability***REMOVED*** {
      await this.#updateModeCapability.promise;
      if (!this.#updateModeCapability***REMOVED*** {
        return;
      ***REMOVED***
    ***REMOVED***
    this.#updateModeCapability = Promise.withResolvers(***REMOVED***;
    this.#mode = mode;
    if (mode === AnnotationEditorType.NONE***REMOVED*** {
      this.setEditingState(false***REMOVED***;
      this.#disableAll(***REMOVED***;
      this._editorUndoBar?.hide(***REMOVED***;
      this.#updateModeCapability.resolve(***REMOVED***;
      return;
    ***REMOVED***
    this.setEditingState(true***REMOVED***;
    await this.#enableAll(***REMOVED***;
    this.unselectAll(***REMOVED***;
    for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
      layer.updateMode(mode***REMOVED***;
    ***REMOVED***
    if (!editId***REMOVED*** {
      if (isFromKeyboard***REMOVED*** {
        this.addNewEditorFromKeyboard(***REMOVED***;
      ***REMOVED***
      this.#updateModeCapability.resolve(***REMOVED***;
      return;
    ***REMOVED***
    for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
      if (editor.annotationElementId === editId***REMOVED*** {
        this.setSelected(editor***REMOVED***;
        editor.enterInEditMode(***REMOVED***;
      ***REMOVED*** else {
        editor.unselect(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#updateModeCapability.resolve(***REMOVED***;
  ***REMOVED***
  addNewEditorFromKeyboard(***REMOVED*** {
    if (this.currentLayer.canCreateNewEmptyEditor(***REMOVED******REMOVED*** {
      this.currentLayer.addNewEditor(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateToolbar(mode***REMOVED*** {
    if (mode === this.#mode***REMOVED*** {
      return;
    ***REMOVED***
    this._eventBus.dispatch("switchannotationeditormode", {
      source: this,
      mode
    ***REMOVED******REMOVED***;
  ***REMOVED***
  updateParams(type, value***REMOVED*** {
    if (!this.#editorTypes***REMOVED*** {
      return;
    ***REMOVED***
    switch (type***REMOVED*** {
      case AnnotationEditorParamsType.CREATE:
        this.currentLayer.addNewEditor(***REMOVED***;
        return;
      case AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
        this.#mainHighlightColorPicker?.updateColor(value***REMOVED***;
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
        this._eventBus.dispatch("reporttelemetry", {
          source: this,
          details: {
            type: "editing",
            data: {
              type: "highlight",
              action: "toggle_visibility"
            ***REMOVED***
          ***REMOVED***
        ***REMOVED******REMOVED***;
        (this.#showAllStates ||= new Map(***REMOVED******REMOVED***.set(type, value***REMOVED***;
        this.showAllEditors("highlight", value***REMOVED***;
        break;
    ***REMOVED***
    for (const editor of this.#selectedEditors***REMOVED*** {
      editor.updateParams(type, value***REMOVED***;
    ***REMOVED***
    for (const editorType of this.#editorTypes***REMOVED*** {
      editorType.updateDefaultParams(type, value***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  showAllEditors(type, visible, updateButton = false***REMOVED*** {
    for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
      if (editor.editorType === type***REMOVED*** {
        editor.show(visible***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const state = this.#showAllStates?.get(AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL***REMOVED*** ?? true;
    if (state !== visible***REMOVED*** {
      this.#dispatchUpdateUI([[AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, visible]]***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  enableWaiting(mustWait = false***REMOVED*** {
    if (this.#isWaiting === mustWait***REMOVED*** {
      return;
    ***REMOVED***
    this.#isWaiting = mustWait;
    for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
      if (mustWait***REMOVED*** {
        layer.disableClick(***REMOVED***;
      ***REMOVED*** else {
        layer.enableClick(***REMOVED***;
      ***REMOVED***
      layer.div.classList.toggle("waiting", mustWait***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #enableAll(***REMOVED*** {
    if (!this.#isEnabled***REMOVED*** {
      this.#isEnabled = true;
      const promises = [];
      for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
        promises.push(layer.enable(***REMOVED******REMOVED***;
      ***REMOVED***
      await Promise.all(promises***REMOVED***;
      for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
        editor.enable(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #disableAll(***REMOVED*** {
    this.unselectAll(***REMOVED***;
    if (this.#isEnabled***REMOVED*** {
      this.#isEnabled = false;
      for (const layer of this.#allLayers.values(***REMOVED******REMOVED*** {
        layer.disable(***REMOVED***;
      ***REMOVED***
      for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
        editor.disable(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  getEditors(pageIndex***REMOVED*** {
    const editors = [];
    for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
      if (editor.pageIndex === pageIndex***REMOVED*** {
        editors.push(editor***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return editors;
  ***REMOVED***
  getEditor(id***REMOVED*** {
    return this.#allEditors.get(id***REMOVED***;
  ***REMOVED***
  addEditor(editor***REMOVED*** {
    this.#allEditors.set(editor.id, editor***REMOVED***;
  ***REMOVED***
  removeEditor(editor***REMOVED*** {
    if (editor.div.contains(document.activeElement***REMOVED******REMOVED*** {
      if (this.#focusMainContainerTimeoutId***REMOVED*** {
        clearTimeout(this.#focusMainContainerTimeoutId***REMOVED***;
      ***REMOVED***
      this.#focusMainContainerTimeoutId = setTimeout((***REMOVED*** => {
        this.focusMainContainer(***REMOVED***;
        this.#focusMainContainerTimeoutId = null;
      ***REMOVED***, 0***REMOVED***;
    ***REMOVED***
    this.#allEditors.delete(editor.id***REMOVED***;
    this.unselect(editor***REMOVED***;
    if (!editor.annotationElementId || !this.#deletedAnnotationsElementIds.has(editor.annotationElementId***REMOVED******REMOVED*** {
      this.#annotationStorage?.remove(editor.id***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  addDeletedAnnotationElement(editor***REMOVED*** {
    this.#deletedAnnotationsElementIds.add(editor.annotationElementId***REMOVED***;
    this.addChangedExistingAnnotation(editor***REMOVED***;
    editor.deleted = true;
  ***REMOVED***
  isDeletedAnnotationElement(annotationElementId***REMOVED*** {
    return this.#deletedAnnotationsElementIds.has(annotationElementId***REMOVED***;
  ***REMOVED***
  removeDeletedAnnotationElement(editor***REMOVED*** {
    this.#deletedAnnotationsElementIds.delete(editor.annotationElementId***REMOVED***;
    this.removeChangedExistingAnnotation(editor***REMOVED***;
    editor.deleted = false;
  ***REMOVED***
  #addEditorToLayer(editor***REMOVED*** {
    const layer = this.#allLayers.get(editor.pageIndex***REMOVED***;
    if (layer***REMOVED*** {
      layer.addOrRebuild(editor***REMOVED***;
    ***REMOVED*** else {
      this.addEditor(editor***REMOVED***;
      this.addToAnnotationStorage(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setActiveEditor(editor***REMOVED*** {
    if (this.#activeEditor === editor***REMOVED*** {
      return;
    ***REMOVED***
    this.#activeEditor = editor;
    if (editor***REMOVED*** {
      this.#dispatchUpdateUI(editor.propertiesToUpdate***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get #lastSelectedEditor(***REMOVED*** {
    let ed = null;
    for (ed of this.#selectedEditors***REMOVED*** {***REMOVED***
    return ed;
  ***REMOVED***
  updateUI(editor***REMOVED*** {
    if (this.#lastSelectedEditor === editor***REMOVED*** {
      this.#dispatchUpdateUI(editor.propertiesToUpdate***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateUIForDefaultProperties(editorType***REMOVED*** {
    this.#dispatchUpdateUI(editorType.defaultPropertiesToUpdate***REMOVED***;
  ***REMOVED***
  toggleSelected(editor***REMOVED*** {
    if (this.#selectedEditors.has(editor***REMOVED******REMOVED*** {
      this.#selectedEditors.delete(editor***REMOVED***;
      editor.unselect(***REMOVED***;
      this.#dispatchUpdateStates({
        hasSelectedEditor: this.hasSelection
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    this.#selectedEditors.add(editor***REMOVED***;
    editor.select(***REMOVED***;
    this.#dispatchUpdateUI(editor.propertiesToUpdate***REMOVED***;
    this.#dispatchUpdateStates({
      hasSelectedEditor: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setSelected(editor***REMOVED*** {
    this.#currentDrawingSession?.commitOrRemove(***REMOVED***;
    for (const ed of this.#selectedEditors***REMOVED*** {
      if (ed !== editor***REMOVED*** {
        ed.unselect(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#selectedEditors.clear(***REMOVED***;
    this.#selectedEditors.add(editor***REMOVED***;
    editor.select(***REMOVED***;
    this.#dispatchUpdateUI(editor.propertiesToUpdate***REMOVED***;
    this.#dispatchUpdateStates({
      hasSelectedEditor: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  isSelected(editor***REMOVED*** {
    return this.#selectedEditors.has(editor***REMOVED***;
  ***REMOVED***
  get firstSelectedEditor(***REMOVED*** {
    return this.#selectedEditors.values(***REMOVED***.next(***REMOVED***.value;
  ***REMOVED***
  unselect(editor***REMOVED*** {
    editor.unselect(***REMOVED***;
    this.#selectedEditors.delete(editor***REMOVED***;
    this.#dispatchUpdateStates({
      hasSelectedEditor: this.hasSelection
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get hasSelection(***REMOVED*** {
    return this.#selectedEditors.size !== 0;
  ***REMOVED***
  get isEnterHandled(***REMOVED*** {
    return this.#selectedEditors.size === 1 && this.firstSelectedEditor.isEnterHandled;
  ***REMOVED***
  undo(***REMOVED*** {
    this.#commandManager.undo(***REMOVED***;
    this.#dispatchUpdateStates({
      hasSomethingToUndo: this.#commandManager.hasSomethingToUndo(***REMOVED***,
      hasSomethingToRedo: true,
      isEmpty: this.#isEmpty(***REMOVED***
    ***REMOVED******REMOVED***;
    this._editorUndoBar?.hide(***REMOVED***;
  ***REMOVED***
  redo(***REMOVED*** {
    this.#commandManager.redo(***REMOVED***;
    this.#dispatchUpdateStates({
      hasSomethingToUndo: true,
      hasSomethingToRedo: this.#commandManager.hasSomethingToRedo(***REMOVED***,
      isEmpty: this.#isEmpty(***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  addCommands(params***REMOVED*** {
    this.#commandManager.add(params***REMOVED***;
    this.#dispatchUpdateStates({
      hasSomethingToUndo: true,
      hasSomethingToRedo: false,
      isEmpty: this.#isEmpty(***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  cleanUndoStack(type***REMOVED*** {
    this.#commandManager.cleanType(type***REMOVED***;
  ***REMOVED***
  #isEmpty(***REMOVED*** {
    if (this.#allEditors.size === 0***REMOVED*** {
      return true;
    ***REMOVED***
    if (this.#allEditors.size === 1***REMOVED*** {
      for (const editor of this.#allEditors.values(***REMOVED******REMOVED*** {
        return editor.isEmpty(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return false;
  ***REMOVED***
  delete(***REMOVED*** {
    this.commitOrRemove(***REMOVED***;
    const drawingEditor = this.currentLayer?.endDrawingSession(true***REMOVED***;
    if (!this.hasSelection && !drawingEditor***REMOVED*** {
      return;
    ***REMOVED***
    const editors = drawingEditor ? [drawingEditor] : [...this.#selectedEditors];
    const cmd = (***REMOVED*** => {
      this._editorUndoBar?.show(undo, editors.length === 1 ? editors[0].editorType : editors.length***REMOVED***;
      for (const editor of editors***REMOVED*** {
        editor.remove(***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    const undo = (***REMOVED*** => {
      for (const editor of editors***REMOVED*** {
        this.#addEditorToLayer(editor***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    this.addCommands({
      cmd,
      undo,
      mustExec: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  commitOrRemove(***REMOVED*** {
    this.#activeEditor?.commitOrRemove(***REMOVED***;
  ***REMOVED***
  hasSomethingToControl(***REMOVED*** {
    return this.#activeEditor || this.hasSelection;
  ***REMOVED***
  #selectEditors(editors***REMOVED*** {
    for (const editor of this.#selectedEditors***REMOVED*** {
      editor.unselect(***REMOVED***;
    ***REMOVED***
    this.#selectedEditors.clear(***REMOVED***;
    for (const editor of editors***REMOVED*** {
      if (editor.isEmpty(***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      this.#selectedEditors.add(editor***REMOVED***;
      editor.select(***REMOVED***;
    ***REMOVED***
    this.#dispatchUpdateStates({
      hasSelectedEditor: this.hasSelection
    ***REMOVED******REMOVED***;
  ***REMOVED***
  selectAll(***REMOVED*** {
    for (const editor of this.#selectedEditors***REMOVED*** {
      editor.commit(***REMOVED***;
    ***REMOVED***
    this.#selectEditors(this.#allEditors.values(***REMOVED******REMOVED***;
  ***REMOVED***
  unselectAll(***REMOVED*** {
    if (this.#activeEditor***REMOVED*** {
      this.#activeEditor.commitOrRemove(***REMOVED***;
      if (this.#mode !== AnnotationEditorType.NONE***REMOVED*** {
        return;
      ***REMOVED***
    ***REMOVED***
    if (this.#currentDrawingSession?.commitOrRemove(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    if (!this.hasSelection***REMOVED*** {
      return;
    ***REMOVED***
    for (const editor of this.#selectedEditors***REMOVED*** {
      editor.unselect(***REMOVED***;
    ***REMOVED***
    this.#selectedEditors.clear(***REMOVED***;
    this.#dispatchUpdateStates({
      hasSelectedEditor: false
    ***REMOVED******REMOVED***;
  ***REMOVED***
  translateSelectedEditors(x, y, noCommit = false***REMOVED*** {
    if (!noCommit***REMOVED*** {
      this.commitOrRemove(***REMOVED***;
    ***REMOVED***
    if (!this.hasSelection***REMOVED*** {
      return;
    ***REMOVED***
    this.#translation[0] += x;
    this.#translation[1] += y;
    const [totalX, totalY] = this.#translation;
    const editors = [...this.#selectedEditors];
    const TIME_TO_WAIT = 1000;
    if (this.#translationTimeoutId***REMOVED*** {
      clearTimeout(this.#translationTimeoutId***REMOVED***;
    ***REMOVED***
    this.#translationTimeoutId = setTimeout((***REMOVED*** => {
      this.#translationTimeoutId = null;
      this.#translation[0] = this.#translation[1] = 0;
      this.addCommands({
        cmd: (***REMOVED*** => {
          for (const editor of editors***REMOVED*** {
            if (this.#allEditors.has(editor.id***REMOVED******REMOVED*** {
              editor.translateInPage(totalX, totalY***REMOVED***;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***,
        undo: (***REMOVED*** => {
          for (const editor of editors***REMOVED*** {
            if (this.#allEditors.has(editor.id***REMOVED******REMOVED*** {
              editor.translateInPage(-totalX, -totalY***REMOVED***;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***,
        mustExec: false
      ***REMOVED******REMOVED***;
    ***REMOVED***, TIME_TO_WAIT***REMOVED***;
    for (const editor of editors***REMOVED*** {
      editor.translateInPage(x, y***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setUpDragSession(***REMOVED*** {
    if (!this.hasSelection***REMOVED*** {
      return;
    ***REMOVED***
    this.disableUserSelect(true***REMOVED***;
    this.#draggingEditors = new Map(***REMOVED***;
    for (const editor of this.#selectedEditors***REMOVED*** {
      this.#draggingEditors.set(editor, {
        savedX: editor.x,
        savedY: editor.y,
        savedPageIndex: editor.pageIndex,
        newX: 0,
        newY: 0,
        newPageIndex: -1
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  endDragSession(***REMOVED*** {
    if (!this.#draggingEditors***REMOVED*** {
      return false;
    ***REMOVED***
    this.disableUserSelect(false***REMOVED***;
    const map = this.#draggingEditors;
    this.#draggingEditors = null;
    let mustBeAddedInUndoStack = false;
    for (const [{
      x,
      y,
      pageIndex
    ***REMOVED***, value] of map***REMOVED*** {
      value.newX = x;
      value.newY = y;
      value.newPageIndex = pageIndex;
      mustBeAddedInUndoStack ||= x !== value.savedX || y !== value.savedY || pageIndex !== value.savedPageIndex;
    ***REMOVED***
    if (!mustBeAddedInUndoStack***REMOVED*** {
      return false;
    ***REMOVED***
    const move = (editor, x, y, pageIndex***REMOVED*** => {
      if (this.#allEditors.has(editor.id***REMOVED******REMOVED*** {
        const parent = this.#allLayers.get(pageIndex***REMOVED***;
        if (parent***REMOVED*** {
          editor._setParentAndPosition(parent, x, y***REMOVED***;
        ***REMOVED*** else {
          editor.pageIndex = pageIndex;
          editor.x = x;
          editor.y = y;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
    this.addCommands({
      cmd: (***REMOVED*** => {
        for (const [editor, {
          newX,
          newY,
          newPageIndex
        ***REMOVED***] of map***REMOVED*** {
          move(editor, newX, newY, newPageIndex***REMOVED***;
        ***REMOVED***
      ***REMOVED***,
      undo: (***REMOVED*** => {
        for (const [editor, {
          savedX,
          savedY,
          savedPageIndex
        ***REMOVED***] of map***REMOVED*** {
          move(editor, savedX, savedY, savedPageIndex***REMOVED***;
        ***REMOVED***
      ***REMOVED***,
      mustExec: true
    ***REMOVED******REMOVED***;
    return true;
  ***REMOVED***
  dragSelectedEditors(tx, ty***REMOVED*** {
    if (!this.#draggingEditors***REMOVED*** {
      return;
    ***REMOVED***
    for (const editor of this.#draggingEditors.keys(***REMOVED******REMOVED*** {
      editor.drag(tx, ty***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  rebuild(editor***REMOVED*** {
    if (editor.parent === null***REMOVED*** {
      const parent = this.getLayer(editor.pageIndex***REMOVED***;
      if (parent***REMOVED*** {
        parent.changeParent(editor***REMOVED***;
        parent.addOrRebuild(editor***REMOVED***;
      ***REMOVED*** else {
        this.addEditor(editor***REMOVED***;
        this.addToAnnotationStorage(editor***REMOVED***;
        editor.rebuild(***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      editor.parent.addOrRebuild(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get isEditorHandlingKeyboard(***REMOVED*** {
    return this.getActive(***REMOVED***?.shouldGetKeyboardEvents(***REMOVED*** || this.#selectedEditors.size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents(***REMOVED***;
  ***REMOVED***
  isActive(editor***REMOVED*** {
    return this.#activeEditor === editor;
  ***REMOVED***
  getActive(***REMOVED*** {
    return this.#activeEditor;
  ***REMOVED***
  getMode(***REMOVED*** {
    return this.#mode;
  ***REMOVED***
  get imageManager(***REMOVED*** {
    return shadow(this, "imageManager", new ImageManager(***REMOVED******REMOVED***;
  ***REMOVED***
  getSelectionBoxes(textLayer***REMOVED*** {
    if (!textLayer***REMOVED*** {
      return null;
    ***REMOVED***
    const selection = document.getSelection(***REMOVED***;
    for (let i = 0, ii = selection.rangeCount; i < ii; i++***REMOVED*** {
      if (!textLayer.contains(selection.getRangeAt(i***REMOVED***.commonAncestorContainer***REMOVED******REMOVED*** {
        return null;
      ***REMOVED***
    ***REMOVED***
    const {
      x: layerX,
      y: layerY,
      width: parentWidth,
      height: parentHeight
    ***REMOVED*** = textLayer.getBoundingClientRect(***REMOVED***;
    let rotator;
    switch (textLayer.getAttribute("data-main-rotation"***REMOVED******REMOVED*** {
      case "90":
        rotator = (x, y, w, h***REMOVED*** => ({
          x: (y - layerY***REMOVED*** / parentHeight,
          y: 1 - (x + w - layerX***REMOVED*** / parentWidth,
          width: h / parentHeight,
          height: w / parentWidth
        ***REMOVED******REMOVED***;
        break;
      case "180":
        rotator = (x, y, w, h***REMOVED*** => ({
          x: 1 - (x + w - layerX***REMOVED*** / parentWidth,
          y: 1 - (y + h - layerY***REMOVED*** / parentHeight,
          width: w / parentWidth,
          height: h / parentHeight
        ***REMOVED******REMOVED***;
        break;
      case "270":
        rotator = (x, y, w, h***REMOVED*** => ({
          x: 1 - (y + h - layerY***REMOVED*** / parentHeight,
          y: (x - layerX***REMOVED*** / parentWidth,
          width: h / parentHeight,
          height: w / parentWidth
        ***REMOVED******REMOVED***;
        break;
      default:
        rotator = (x, y, w, h***REMOVED*** => ({
          x: (x - layerX***REMOVED*** / parentWidth,
          y: (y - layerY***REMOVED*** / parentHeight,
          width: w / parentWidth,
          height: h / parentHeight
        ***REMOVED******REMOVED***;
        break;
    ***REMOVED***
    const boxes = [];
    for (let i = 0, ii = selection.rangeCount; i < ii; i++***REMOVED*** {
      const range = selection.getRangeAt(i***REMOVED***;
      if (range.collapsed***REMOVED*** {
        continue;
      ***REMOVED***
      for (const {
        x,
        y,
        width,
        height
      ***REMOVED*** of range.getClientRects(***REMOVED******REMOVED*** {
        if (width === 0 || height === 0***REMOVED*** {
          continue;
        ***REMOVED***
        boxes.push(rotator(x, y, width, height***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return boxes.length === 0 ? null : boxes;
  ***REMOVED***
  addChangedExistingAnnotation({
    annotationElementId,
    id
  ***REMOVED******REMOVED*** {
    (this.#changedExistingAnnotations ||= new Map(***REMOVED******REMOVED***.set(annotationElementId, id***REMOVED***;
  ***REMOVED***
  removeChangedExistingAnnotation({
    annotationElementId
  ***REMOVED******REMOVED*** {
    this.#changedExistingAnnotations?.delete(annotationElementId***REMOVED***;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    const editorId = this.#changedExistingAnnotations?.get(annotation.data.id***REMOVED***;
    if (!editorId***REMOVED*** {
      return;
    ***REMOVED***
    const editor = this.#annotationStorage.getRawValue(editorId***REMOVED***;
    if (!editor***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#mode === AnnotationEditorType.NONE && !editor.hasBeenModified***REMOVED*** {
      return;
    ***REMOVED***
    editor.renderAnnotationElement(annotation***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/alt_text.js

class AltText {
  #altText = null;
  #altTextDecorative = false;
  #altTextButton = null;
  #altTextButtonLabel = null;
  #altTextTooltip = null;
  #altTextTooltipTimeout = null;
  #altTextWasFromKeyBoard = false;
  #badge = null;
  #editor = null;
  #guessedText = null;
  #textWithDisclaimer = null;
  #useNewAltTextFlow = false;
  static #l10nNewButton = null;
  static _l10n = null;
  constructor(editor***REMOVED*** {
    this.#editor = editor;
    this.#useNewAltTextFlow = editor._uiManager.useNewAltTextFlow;
    AltText.#l10nNewButton ||= Object.freeze({
      added: "pdfjs-editor-new-alt-text-added-button",
      "added-label": "pdfjs-editor-new-alt-text-added-button-label",
      missing: "pdfjs-editor-new-alt-text-missing-button",
      "missing-label": "pdfjs-editor-new-alt-text-missing-button-label",
      review: "pdfjs-editor-new-alt-text-to-review-button",
      "review-label": "pdfjs-editor-new-alt-text-to-review-button-label"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  static initialize(l10n***REMOVED*** {
    AltText._l10n ??= l10n;
  ***REMOVED***
  async render(***REMOVED*** {
    const altText = this.#altTextButton = document.createElement("button"***REMOVED***;
    altText.className = "altText";
    altText.tabIndex = "0";
    const label = this.#altTextButtonLabel = document.createElement("span"***REMOVED***;
    altText.append(label***REMOVED***;
    if (this.#useNewAltTextFlow***REMOVED*** {
      altText.classList.add("new"***REMOVED***;
      altText.setAttribute("data-l10n-id", AltText.#l10nNewButton.missing***REMOVED***;
      label.setAttribute("data-l10n-id", AltText.#l10nNewButton["missing-label"]***REMOVED***;
    ***REMOVED*** else {
      altText.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button"***REMOVED***;
      label.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button-label"***REMOVED***;
    ***REMOVED***
    const signal = this.#editor._uiManager._signal;
    altText.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    altText.addEventListener("pointerdown", event => event.stopPropagation(***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    const onClick = event => {
      event.preventDefault(***REMOVED***;
      this.#editor._uiManager.editAltText(this.#editor***REMOVED***;
      if (this.#useNewAltTextFlow***REMOVED*** {
        this.#editor._reportTelemetry({
          action: "pdfjs.image.alt_text.image_status_label_clicked",
          data: {
            label: this.#label
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    altText.addEventListener("click", onClick, {
      capture: true,
      signal
    ***REMOVED******REMOVED***;
    altText.addEventListener("keydown", event => {
      if (event.target === altText && event.key === "Enter"***REMOVED*** {
        this.#altTextWasFromKeyBoard = true;
        onClick(event***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    await this.#setState(***REMOVED***;
    return altText;
  ***REMOVED***
  get #label(***REMOVED*** {
    return this.#altText && "added" || this.#altText === null && this.guessedText && "review" || "missing";
  ***REMOVED***
  finish(***REMOVED*** {
    if (!this.#altTextButton***REMOVED*** {
      return;
    ***REMOVED***
    this.#altTextButton.focus({
      focusVisible: this.#altTextWasFromKeyBoard
    ***REMOVED******REMOVED***;
    this.#altTextWasFromKeyBoard = false;
  ***REMOVED***
  isEmpty(***REMOVED*** {
    if (this.#useNewAltTextFlow***REMOVED*** {
      return this.#altText === null;
    ***REMOVED***
    return !this.#altText && !this.#altTextDecorative;
  ***REMOVED***
  hasData(***REMOVED*** {
    if (this.#useNewAltTextFlow***REMOVED*** {
      return this.#altText !== null || !!this.#guessedText;
    ***REMOVED***
    return this.isEmpty(***REMOVED***;
  ***REMOVED***
  get guessedText(***REMOVED*** {
    return this.#guessedText;
  ***REMOVED***
  async setGuessedText(guessedText***REMOVED*** {
    if (this.#altText !== null***REMOVED*** {
      return;
    ***REMOVED***
    this.#guessedText = guessedText;
    this.#textWithDisclaimer = await AltText._l10n.get("pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer", {
      generatedAltText: guessedText
    ***REMOVED******REMOVED***;
    this.#setState(***REMOVED***;
  ***REMOVED***
  toggleAltTextBadge(visibility = false***REMOVED*** {
    if (!this.#useNewAltTextFlow || this.#altText***REMOVED*** {
      this.#badge?.remove(***REMOVED***;
      this.#badge = null;
      return;
    ***REMOVED***
    if (!this.#badge***REMOVED*** {
      const badge = this.#badge = document.createElement("div"***REMOVED***;
      badge.className = "noAltTextBadge";
      this.#editor.div.append(badge***REMOVED***;
    ***REMOVED***
    this.#badge.classList.toggle("hidden", !visibility***REMOVED***;
  ***REMOVED***
  serialize(isForCopying***REMOVED*** {
    let altText = this.#altText;
    if (!isForCopying && this.#guessedText === altText***REMOVED*** {
      altText = this.#textWithDisclaimer;
    ***REMOVED***
***REMOVED***
      altText,
      decorative: this.#altTextDecorative,
      guessedText: this.#guessedText,
      textWithDisclaimer: this.#textWithDisclaimer
    ***REMOVED***;
  ***REMOVED***
  get data(***REMOVED*** {
***REMOVED***
      altText: this.#altText,
      decorative: this.#altTextDecorative
    ***REMOVED***;
  ***REMOVED***
  set data({
    altText,
    decorative,
    guessedText,
    textWithDisclaimer,
    cancel = false
  ***REMOVED******REMOVED*** {
    if (guessedText***REMOVED*** {
      this.#guessedText = guessedText;
      this.#textWithDisclaimer = textWithDisclaimer;
    ***REMOVED***
    if (this.#altText === altText && this.#altTextDecorative === decorative***REMOVED*** {
      return;
    ***REMOVED***
    if (!cancel***REMOVED*** {
      this.#altText = altText;
      this.#altTextDecorative = decorative;
    ***REMOVED***
    this.#setState(***REMOVED***;
  ***REMOVED***
  toggle(enabled = false***REMOVED*** {
    if (!this.#altTextButton***REMOVED*** {
      return;
    ***REMOVED***
    if (!enabled && this.#altTextTooltipTimeout***REMOVED*** {
      clearTimeout(this.#altTextTooltipTimeout***REMOVED***;
      this.#altTextTooltipTimeout = null;
    ***REMOVED***
    this.#altTextButton.disabled = !enabled;
  ***REMOVED***
  shown(***REMOVED*** {
    this.#editor._reportTelemetry({
      action: "pdfjs.image.alt_text.image_status_label_displayed",
      data: {
        label: this.#label
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#altTextButton?.remove(***REMOVED***;
    this.#altTextButton = null;
    this.#altTextButtonLabel = null;
    this.#altTextTooltip = null;
    this.#badge?.remove(***REMOVED***;
    this.#badge = null;
  ***REMOVED***
  async #setState(***REMOVED*** {
    const button = this.#altTextButton;
    if (!button***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#useNewAltTextFlow***REMOVED*** {
      button.classList.toggle("done", !!this.#altText***REMOVED***;
      button.setAttribute("data-l10n-id", AltText.#l10nNewButton[this.#label]***REMOVED***;
      this.#altTextButtonLabel?.setAttribute("data-l10n-id", AltText.#l10nNewButton[`${this.#label***REMOVED***-label`]***REMOVED***;
      if (!this.#altText***REMOVED*** {
        this.#altTextTooltip?.remove(***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED*** else {
      if (!this.#altText && !this.#altTextDecorative***REMOVED*** {
        button.classList.remove("done"***REMOVED***;
        this.#altTextTooltip?.remove(***REMOVED***;
        return;
      ***REMOVED***
      button.classList.add("done"***REMOVED***;
      button.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-edit-button"***REMOVED***;
    ***REMOVED***
    let tooltip = this.#altTextTooltip;
    if (!tooltip***REMOVED*** {
      this.#altTextTooltip = tooltip = document.createElement("span"***REMOVED***;
      tooltip.className = "tooltip";
      tooltip.setAttribute("role", "tooltip"***REMOVED***;
      tooltip.id = `alt-text-tooltip-${this.#editor.id***REMOVED***`;
      const DELAY_TO_SHOW_TOOLTIP = 100;
      const signal = this.#editor._uiManager._signal;
      signal.addEventListener("abort", (***REMOVED*** => {
        clearTimeout(this.#altTextTooltipTimeout***REMOVED***;
        this.#altTextTooltipTimeout = null;
      ***REMOVED***, {
        once: true
      ***REMOVED******REMOVED***;
      button.addEventListener("mouseenter", (***REMOVED*** => {
        this.#altTextTooltipTimeout = setTimeout((***REMOVED*** => {
          this.#altTextTooltipTimeout = null;
          this.#altTextTooltip.classList.add("show"***REMOVED***;
          this.#editor._reportTelemetry({
            action: "alt_text_tooltip"
          ***REMOVED******REMOVED***;
        ***REMOVED***, DELAY_TO_SHOW_TOOLTIP***REMOVED***;
      ***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
      button.addEventListener("mouseleave", (***REMOVED*** => {
        if (this.#altTextTooltipTimeout***REMOVED*** {
          clearTimeout(this.#altTextTooltipTimeout***REMOVED***;
          this.#altTextTooltipTimeout = null;
        ***REMOVED***
        this.#altTextTooltip?.classList.remove("show"***REMOVED***;
      ***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (this.#altTextDecorative***REMOVED*** {
      tooltip.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-decorative-tooltip"***REMOVED***;
    ***REMOVED*** else {
      tooltip.removeAttribute("data-l10n-id"***REMOVED***;
      tooltip.textContent = this.#altText;
    ***REMOVED***
    if (!tooltip.parentNode***REMOVED*** {
      button.append(tooltip***REMOVED***;
    ***REMOVED***
    const element = this.#editor.getImageForAltText(***REMOVED***;
    element?.setAttribute("aria-describedby", tooltip.id***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/touch_manager.js


class TouchManager {
  #container;
  #isPinching = false;
  #isPinchingStopped = null;
  #isPinchingDisabled;
  #onPinchStart;
  #onPinching;
  #onPinchEnd;
  #signal;
  #touchInfo = null;
  #touchManagerAC;
  #touchMoveAC = null;
  constructor({
    container,
    isPinchingDisabled = null,
    isPinchingStopped = null,
    onPinchStart = null,
    onPinching = null,
    onPinchEnd = null,
    signal
  ***REMOVED******REMOVED*** {
    this.#container = container;
    this.#isPinchingStopped = isPinchingStopped;
    this.#isPinchingDisabled = isPinchingDisabled;
    this.#onPinchStart = onPinchStart;
    this.#onPinching = onPinching;
    this.#onPinchEnd = onPinchEnd;
    this.#touchManagerAC = new AbortController(***REMOVED***;
    this.#signal = AbortSignal.any([signal, this.#touchManagerAC.signal]***REMOVED***;
    container.addEventListener("touchstart", this.#onTouchStart.bind(this***REMOVED***, {
      passive: false,
      signal: this.#signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get MIN_TOUCH_DISTANCE_TO_PINCH(***REMOVED*** {
    return shadow(this, "MIN_TOUCH_DISTANCE_TO_PINCH", 35 / (window.devicePixelRatio || 1***REMOVED******REMOVED***;
  ***REMOVED***
  #onTouchStart(evt***REMOVED*** {
    if (this.#isPinchingDisabled?.(***REMOVED*** || evt.touches.length < 2***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#touchMoveAC***REMOVED*** {
      this.#touchMoveAC = new AbortController(***REMOVED***;
      const signal = AbortSignal.any([this.#signal, this.#touchMoveAC.signal]***REMOVED***;
      const container = this.#container;
      const opt = {
        signal,
        passive: false
      ***REMOVED***;
      container.addEventListener("touchmove", this.#onTouchMove.bind(this***REMOVED***, opt***REMOVED***;
      container.addEventListener("touchend", this.#onTouchEnd.bind(this***REMOVED***, opt***REMOVED***;
      container.addEventListener("touchcancel", this.#onTouchEnd.bind(this***REMOVED***, opt***REMOVED***;
      this.#onPinchStart?.(***REMOVED***;
    ***REMOVED***
    stopEvent(evt***REMOVED***;
    if (evt.touches.length !== 2 || this.#isPinchingStopped?.(***REMOVED******REMOVED*** {
      this.#touchInfo = null;
      return;
    ***REMOVED***
    let [touch0, touch1] = evt.touches;
    if (touch0.identifier > touch1.identifier***REMOVED*** {
      [touch0, touch1] = [touch1, touch0];
    ***REMOVED***
    this.#touchInfo = {
      touch0X: touch0.screenX,
      touch0Y: touch0.screenY,
      touch1X: touch1.screenX,
      touch1Y: touch1.screenY
    ***REMOVED***;
  ***REMOVED***
  #onTouchMove(evt***REMOVED*** {
    if (!this.#touchInfo || evt.touches.length !== 2***REMOVED*** {
      return;
    ***REMOVED***
    let [touch0, touch1] = evt.touches;
    if (touch0.identifier > touch1.identifier***REMOVED*** {
      [touch0, touch1] = [touch1, touch0];
    ***REMOVED***
    const {
      screenX: screen0X,
      screenY: screen0Y
    ***REMOVED*** = touch0;
    const {
      screenX: screen1X,
      screenY: screen1Y
    ***REMOVED*** = touch1;
    const touchInfo = this.#touchInfo;
    const {
      touch0X: pTouch0X,
      touch0Y: pTouch0Y,
      touch1X: pTouch1X,
      touch1Y: pTouch1Y
    ***REMOVED*** = touchInfo;
    const prevGapX = pTouch1X - pTouch0X;
    const prevGapY = pTouch1Y - pTouch0Y;
    const currGapX = screen1X - screen0X;
    const currGapY = screen1Y - screen0Y;
    const distance = Math.hypot(currGapX, currGapY***REMOVED*** || 1;
    const pDistance = Math.hypot(prevGapX, prevGapY***REMOVED*** || 1;
    if (!this.#isPinching && Math.abs(pDistance - distance***REMOVED*** <= TouchManager.MIN_TOUCH_DISTANCE_TO_PINCH***REMOVED*** {
      return;
    ***REMOVED***
    touchInfo.touch0X = screen0X;
    touchInfo.touch0Y = screen0Y;
    touchInfo.touch1X = screen1X;
    touchInfo.touch1Y = screen1Y;
    evt.preventDefault(***REMOVED***;
    if (!this.#isPinching***REMOVED*** {
      this.#isPinching = true;
      return;
    ***REMOVED***
    const origin = [(screen0X + screen1X***REMOVED*** / 2, (screen0Y + screen1Y***REMOVED*** / 2];
    this.#onPinching?.(origin, pDistance, distance***REMOVED***;
  ***REMOVED***
  #onTouchEnd(evt***REMOVED*** {
    this.#touchMoveAC.abort(***REMOVED***;
    this.#touchMoveAC = null;
    this.#onPinchEnd?.(***REMOVED***;
    if (!this.#touchInfo***REMOVED*** {
      return;
    ***REMOVED***
    evt.preventDefault(***REMOVED***;
    this.#touchInfo = null;
    this.#isPinching = false;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#touchManagerAC?.abort(***REMOVED***;
    this.#touchManagerAC = null;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/editor.js






class AnnotationEditor {
  #accessibilityData = null;
  #allResizerDivs = null;
  #altText = null;
  #disabled = false;
  #dragPointerId = null;
  #dragPointerType = "";
  #keepAspectRatio = false;
  #resizersDiv = null;
  #lastPointerCoords = null;
  #savedDimensions = null;
  #focusAC = null;
  #focusedResizerName = "";
  #hasBeenClicked = false;
  #initialRect = null;
  #isEditing = false;
  #isInEditMode = false;
  #isResizerEnabledForKeyboard = false;
  #moveInDOMTimeout = null;
  #prevDragX = 0;
  #prevDragY = 0;
  #telemetryTimeouts = null;
  #touchManager = null;
  _editToolbar = null;
  _initialOptions = Object.create(null***REMOVED***;
  _initialData = null;
  _isVisible = true;
  _uiManager = null;
  _focusEventsAllowed = true;
  static _l10n = null;
  static _l10nResizer = null;
  #isDraggable = false;
  #zIndex = AnnotationEditor._zIndex++;
  static _borderLineWidth = -1;
  static _colorManager = new ColorManager(***REMOVED***;
  static _zIndex = 1;
  static _telemetryTimeout = 1000;
  static get _resizerKeyboardManager(***REMOVED*** {
    const resize = AnnotationEditor.prototype._resizeWithKeyboard;
    const small = AnnotationEditorUIManager.TRANSLATE_SMALL;
    const big = AnnotationEditorUIManager.TRANSLATE_BIG;
    return shadow(this, "_resizerKeyboardManager", new KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], resize, {
      args: [-small, 0]
    ***REMOVED***], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], resize, {
      args: [-big, 0]
    ***REMOVED***], [["ArrowRight", "mac+ArrowRight"], resize, {
      args: [small, 0]
    ***REMOVED***], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], resize, {
      args: [big, 0]
    ***REMOVED***], [["ArrowUp", "mac+ArrowUp"], resize, {
      args: [0, -small]
    ***REMOVED***], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], resize, {
      args: [0, -big]
    ***REMOVED***], [["ArrowDown", "mac+ArrowDown"], resize, {
      args: [0, small]
    ***REMOVED***], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], resize, {
      args: [0, big]
    ***REMOVED***], [["Escape", "mac+Escape"], AnnotationEditor.prototype._stopResizingWithKeyboard]]***REMOVED******REMOVED***;
  ***REMOVED***
  constructor(parameters***REMOVED*** {
    this.parent = parameters.parent;
    this.id = parameters.id;
    this.width = this.height = null;
    this.pageIndex = parameters.parent.pageIndex;
    this.name = parameters.name;
    this.div = null;
    this._uiManager = parameters.uiManager;
    this.annotationElementId = null;
    this._willKeepAspectRatio = false;
    this._initialOptions.isCentered = parameters.isCentered;
    this._structTreeParentId = null;
    const {
      rotation,
      rawDims: {
        pageWidth,
        pageHeight,
        pageX,
        pageY
      ***REMOVED***
    ***REMOVED*** = this.parent.viewport;
    this.rotation = rotation;
    this.pageRotation = (360 + rotation - this._uiManager.viewParameters.rotation***REMOVED*** % 360;
    this.pageDimensions = [pageWidth, pageHeight];
    this.pageTranslation = [pageX, pageY];
    const [width, height] = this.parentDimensions;
    this.x = parameters.x / width;
    this.y = parameters.y / height;
    this.isAttachedToDOM = false;
    this.deleted = false;
  ***REMOVED***
  get editorType(***REMOVED*** {
    return Object.getPrototypeOf(this***REMOVED***.constructor._type;
  ***REMOVED***
  static get isDrawer(***REMOVED*** {
    return false;
  ***REMOVED***
  static get _defaultLineColor(***REMOVED*** {
    return shadow(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"***REMOVED******REMOVED***;
  ***REMOVED***
  static deleteAnnotationElement(editor***REMOVED*** {
    const fakeEditor = new FakeEditor({
      id: editor.parent.getNextId(***REMOVED***,
      parent: editor.parent,
      uiManager: editor._uiManager
    ***REMOVED******REMOVED***;
    fakeEditor.annotationElementId = editor.annotationElementId;
    fakeEditor.deleted = true;
    fakeEditor._uiManager.addToAnnotationStorage(fakeEditor***REMOVED***;
  ***REMOVED***
  static initialize(l10n, _uiManager***REMOVED*** {
    AnnotationEditor._l10n ??= l10n;
    AnnotationEditor._l10nResizer ||= Object.freeze({
      topLeft: "pdfjs-editor-resizer-top-left",
      topMiddle: "pdfjs-editor-resizer-top-middle",
      topRight: "pdfjs-editor-resizer-top-right",
      middleRight: "pdfjs-editor-resizer-middle-right",
      bottomRight: "pdfjs-editor-resizer-bottom-right",
      bottomMiddle: "pdfjs-editor-resizer-bottom-middle",
      bottomLeft: "pdfjs-editor-resizer-bottom-left",
      middleLeft: "pdfjs-editor-resizer-middle-left"
    ***REMOVED******REMOVED***;
    if (AnnotationEditor._borderLineWidth !== -1***REMOVED*** {
      return;
    ***REMOVED***
    const style = getComputedStyle(document.documentElement***REMOVED***;
    AnnotationEditor._borderLineWidth = parseFloat(style.getPropertyValue("--outline-width"***REMOVED******REMOVED*** || 0;
  ***REMOVED***
  static updateDefaultParams(_type, _value***REMOVED*** {***REMOVED***
  static get defaultPropertiesToUpdate(***REMOVED*** {
    return [];
  ***REMOVED***
  static isHandlingMimeForPasting(mime***REMOVED*** {
    return false;
  ***REMOVED***
  static paste(item, parent***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
  get propertiesToUpdate(***REMOVED*** {
    return [];
  ***REMOVED***
  get _isDraggable(***REMOVED*** {
    return this.#isDraggable;
  ***REMOVED***
  set _isDraggable(value***REMOVED*** {
    this.#isDraggable = value;
    this.div?.classList.toggle("draggable", value***REMOVED***;
  ***REMOVED***
  get isEnterHandled(***REMOVED*** {
    return true;
  ***REMOVED***
  center(***REMOVED*** {
    const [pageWidth, pageHeight] = this.pageDimensions;
    switch (this.parentRotation***REMOVED*** {
      case 90:
        this.x -= this.height * pageHeight / (pageWidth * 2***REMOVED***;
        this.y += this.width * pageWidth / (pageHeight * 2***REMOVED***;
        break;
      case 180:
        this.x += this.width / 2;
        this.y += this.height / 2;
        break;
      case 270:
        this.x += this.height * pageHeight / (pageWidth * 2***REMOVED***;
        this.y -= this.width * pageWidth / (pageHeight * 2***REMOVED***;
        break;
      default:
        this.x -= this.width / 2;
        this.y -= this.height / 2;
        break;
    ***REMOVED***
    this.fixAndSetPosition(***REMOVED***;
  ***REMOVED***
  addCommands(params***REMOVED*** {
    this._uiManager.addCommands(params***REMOVED***;
  ***REMOVED***
  get currentLayer(***REMOVED*** {
    return this._uiManager.currentLayer;
  ***REMOVED***
  setInBackground(***REMOVED*** {
    this.div.style.zIndex = 0;
  ***REMOVED***
  setInForeground(***REMOVED*** {
    this.div.style.zIndex = this.#zIndex;
  ***REMOVED***
  setParent(parent***REMOVED*** {
    if (parent !== null***REMOVED*** {
      this.pageIndex = parent.pageIndex;
      this.pageDimensions = parent.pageDimensions;
    ***REMOVED*** else {
      this.#stopResizing(***REMOVED***;
    ***REMOVED***
    this.parent = parent;
  ***REMOVED***
  focusin(event***REMOVED*** {
    if (!this._focusEventsAllowed***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#hasBeenClicked***REMOVED*** {
      this.parent.setSelected(this***REMOVED***;
    ***REMOVED*** else {
      this.#hasBeenClicked = false;
    ***REMOVED***
  ***REMOVED***
  focusout(event***REMOVED*** {
    if (!this._focusEventsAllowed***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.isAttachedToDOM***REMOVED*** {
      return;
    ***REMOVED***
    const target = event.relatedTarget;
    if (target?.closest(`#${this.id***REMOVED***`***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    event.preventDefault(***REMOVED***;
    if (!this.parent?.isMultipleSelection***REMOVED*** {
      this.commitOrRemove(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  commitOrRemove(***REMOVED*** {
    if (this.isEmpty(***REMOVED******REMOVED*** {
      this.remove(***REMOVED***;
    ***REMOVED*** else {
      this.commit(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  commit(***REMOVED*** {
    this.addToAnnotationStorage(***REMOVED***;
  ***REMOVED***
  addToAnnotationStorage(***REMOVED*** {
    this._uiManager.addToAnnotationStorage(this***REMOVED***;
  ***REMOVED***
  setAt(x, y, tx, ty***REMOVED*** {
    const [width, height] = this.parentDimensions;
    [tx, ty] = this.screenToPageTranslation(tx, ty***REMOVED***;
    this.x = (x + tx***REMOVED*** / width;
    this.y = (y + ty***REMOVED*** / height;
    this.fixAndSetPosition(***REMOVED***;
  ***REMOVED***
  #translate([width, height], x, y***REMOVED*** {
    [x, y] = this.screenToPageTranslation(x, y***REMOVED***;
    this.x += x / width;
    this.y += y / height;
    this._onTranslating(this.x, this.y***REMOVED***;
    this.fixAndSetPosition(***REMOVED***;
  ***REMOVED***
  translate(x, y***REMOVED*** {
    this.#translate(this.parentDimensions, x, y***REMOVED***;
  ***REMOVED***
  translateInPage(x, y***REMOVED*** {
    this.#initialRect ||= [this.x, this.y, this.width, this.height];
    this.#translate(this.pageDimensions, x, y***REMOVED***;
    this.div.scrollIntoView({
      block: "nearest"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  drag(tx, ty***REMOVED*** {
    this.#initialRect ||= [this.x, this.y, this.width, this.height];
    const {
      div,
      parentDimensions: [parentWidth, parentHeight]
    ***REMOVED*** = this;
    this.x += tx / parentWidth;
    this.y += ty / parentHeight;
    if (this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1***REMOVED******REMOVED*** {
      const {
        x,
        y
      ***REMOVED*** = this.div.getBoundingClientRect(***REMOVED***;
      if (this.parent.findNewParent(this, x, y***REMOVED******REMOVED*** {
        this.x -= Math.floor(this.x***REMOVED***;
        this.y -= Math.floor(this.y***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    let {
      x,
      y
    ***REMOVED*** = this;
    const [bx, by] = this.getBaseTranslation(***REMOVED***;
    x += bx;
    y += by;
    const {
      style
    ***REMOVED*** = div;
    style.left = `${(100 * x***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    style.top = `${(100 * y***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    this._onTranslating(x, y***REMOVED***;
    div.scrollIntoView({
      block: "nearest"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _onTranslating(x, y***REMOVED*** {***REMOVED***
  _onTranslated(x, y***REMOVED*** {***REMOVED***
  get _hasBeenMoved(***REMOVED*** {
    return !!this.#initialRect && (this.#initialRect[0] !== this.x || this.#initialRect[1] !== this.y***REMOVED***;
  ***REMOVED***
  get _hasBeenResized(***REMOVED*** {
    return !!this.#initialRect && (this.#initialRect[2] !== this.width || this.#initialRect[3] !== this.height***REMOVED***;
  ***REMOVED***
  getBaseTranslation(***REMOVED*** {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const {
      _borderLineWidth
    ***REMOVED*** = AnnotationEditor;
    const x = _borderLineWidth / parentWidth;
    const y = _borderLineWidth / parentHeight;
    switch (this.rotation***REMOVED*** {
      case 90:
        return [-x, y];
      case 180:
        return [x, y];
      case 270:
        return [x, -y];
      default:
        return [-x, -y];
    ***REMOVED***
  ***REMOVED***
  get _mustFixPosition(***REMOVED*** {
    return true;
  ***REMOVED***
  fixAndSetPosition(rotation = this.rotation***REMOVED*** {
    const {
      div: {
        style
      ***REMOVED***,
      pageDimensions: [pageWidth, pageHeight]
    ***REMOVED*** = this;
    let {
      x,
      y,
      width,
      height
    ***REMOVED*** = this;
    width *= pageWidth;
    height *= pageHeight;
    x *= pageWidth;
    y *= pageHeight;
    if (this._mustFixPosition***REMOVED*** {
      switch (rotation***REMOVED*** {
        case 0:
          x = Math.max(0, Math.min(pageWidth - width, x***REMOVED******REMOVED***;
          y = Math.max(0, Math.min(pageHeight - height, y***REMOVED******REMOVED***;
          break;
        case 90:
          x = Math.max(0, Math.min(pageWidth - height, x***REMOVED******REMOVED***;
          y = Math.min(pageHeight, Math.max(width, y***REMOVED******REMOVED***;
          break;
        case 180:
          x = Math.min(pageWidth, Math.max(width, x***REMOVED******REMOVED***;
          y = Math.min(pageHeight, Math.max(height, y***REMOVED******REMOVED***;
          break;
        case 270:
          x = Math.min(pageWidth, Math.max(height, x***REMOVED******REMOVED***;
          y = Math.max(0, Math.min(pageHeight - width, y***REMOVED******REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED***
    this.x = x /= pageWidth;
    this.y = y /= pageHeight;
    const [bx, by] = this.getBaseTranslation(***REMOVED***;
    x += bx;
    y += by;
    style.left = `${(100 * x***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    style.top = `${(100 * y***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    this.moveInDOM(***REMOVED***;
  ***REMOVED***
  static #rotatePoint(x, y, angle***REMOVED*** {
    switch (angle***REMOVED*** {
      case 90:
        return [y, -x];
      case 180:
        return [-x, -y];
      case 270:
        return [-y, x];
      default:
        return [x, y];
    ***REMOVED***
  ***REMOVED***
  screenToPageTranslation(x, y***REMOVED*** {
    return AnnotationEditor.#rotatePoint(x, y, this.parentRotation***REMOVED***;
  ***REMOVED***
  pageTranslationToScreen(x, y***REMOVED*** {
    return AnnotationEditor.#rotatePoint(x, y, 360 - this.parentRotation***REMOVED***;
  ***REMOVED***
  #getRotationMatrix(rotation***REMOVED*** {
    switch (rotation***REMOVED*** {
      case 90:
      ***REMOVED***
          const [pageWidth, pageHeight] = this.pageDimensions;
          return [0, -pageWidth / pageHeight, pageHeight / pageWidth, 0];
        ***REMOVED***
      case 180:
        return [-1, 0, 0, -1];
      case 270:
      ***REMOVED***
          const [pageWidth, pageHeight] = this.pageDimensions;
          return [0, pageWidth / pageHeight, -pageHeight / pageWidth, 0];
        ***REMOVED***
      default:
        return [1, 0, 0, 1];
    ***REMOVED***
  ***REMOVED***
  get parentScale(***REMOVED*** {
    return this._uiManager.viewParameters.realScale;
  ***REMOVED***
  get parentRotation(***REMOVED*** {
    return (this._uiManager.viewParameters.rotation + this.pageRotation***REMOVED*** % 360;
  ***REMOVED***
  get parentDimensions(***REMOVED*** {
    const {
      parentScale,
      pageDimensions: [pageWidth, pageHeight]
    ***REMOVED*** = this;
    return [pageWidth * parentScale, pageHeight * parentScale];
  ***REMOVED***
  setDims(width, height***REMOVED*** {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const {
      style
    ***REMOVED*** = this.div;
    style.width = `${(100 * width / parentWidth***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    if (!this.#keepAspectRatio***REMOVED*** {
      style.height = `${(100 * height / parentHeight***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    ***REMOVED***
  ***REMOVED***
  fixDims(***REMOVED*** {
    const {
      style
    ***REMOVED*** = this.div;
    const {
      height,
      width
    ***REMOVED*** = style;
    const widthPercent = width.endsWith("%"***REMOVED***;
    const heightPercent = !this.#keepAspectRatio && height.endsWith("%"***REMOVED***;
    if (widthPercent && heightPercent***REMOVED*** {
      return;
    ***REMOVED***
    const [parentWidth, parentHeight] = this.parentDimensions;
    if (!widthPercent***REMOVED*** {
      style.width = `${(100 * parseFloat(width***REMOVED*** / parentWidth***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    ***REMOVED***
    if (!this.#keepAspectRatio && !heightPercent***REMOVED*** {
      style.height = `${(100 * parseFloat(height***REMOVED*** / parentHeight***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    ***REMOVED***
  ***REMOVED***
  getInitialTranslation(***REMOVED*** {
    return [0, 0];
  ***REMOVED***
  #createResizers(***REMOVED*** {
    if (this.#resizersDiv***REMOVED*** {
      return;
    ***REMOVED***
    this.#resizersDiv = document.createElement("div"***REMOVED***;
    this.#resizersDiv.classList.add("resizers"***REMOVED***;
    const classes = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"];
    const signal = this._uiManager._signal;
    for (const name of classes***REMOVED*** {
      const div = document.createElement("div"***REMOVED***;
      this.#resizersDiv.append(div***REMOVED***;
      div.classList.add("resizer", name***REMOVED***;
      div.setAttribute("data-resizer-name", name***REMOVED***;
      div.addEventListener("pointerdown", this.#resizerPointerdown.bind(this, name***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
      div.addEventListener("contextmenu", noContextMenu, {
        signal
      ***REMOVED******REMOVED***;
      div.tabIndex = -1;
    ***REMOVED***
    this.div.prepend(this.#resizersDiv***REMOVED***;
  ***REMOVED***
  #resizerPointerdown(name, event***REMOVED*** {
    event.preventDefault(***REMOVED***;
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac***REMOVED*** {
      return;
    ***REMOVED***
    this.#altText?.toggle(false***REMOVED***;
    const savedDraggable = this._isDraggable;
    this._isDraggable = false;
    this.#lastPointerCoords = [event.screenX, event.screenY];
    const ac = new AbortController(***REMOVED***;
    const signal = this._uiManager.combinedSignal(ac***REMOVED***;
    this.parent.togglePointerEvents(false***REMOVED***;
    window.addEventListener("pointermove", this.#resizerPointermove.bind(this, name***REMOVED***, {
      passive: true,
      capture: true,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("touchmove", stopEvent, {
      passive: false,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    this.#savedDimensions = {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    ***REMOVED***;
    const savedParentCursor = this.parent.div.style.cursor;
    const savedCursor = this.div.style.cursor;
    this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(event.target***REMOVED***.cursor;
    const pointerUpCallback = (***REMOVED*** => {
      ac.abort(***REMOVED***;
      this.parent.togglePointerEvents(true***REMOVED***;
      this.#altText?.toggle(true***REMOVED***;
      this._isDraggable = savedDraggable;
      this.parent.div.style.cursor = savedParentCursor;
      this.div.style.cursor = savedCursor;
      this.#addResizeToUndoStack(***REMOVED***;
    ***REMOVED***;
    window.addEventListener("pointerup", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("blur", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #resize(x, y, width, height***REMOVED*** {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(parentWidth * width, parentHeight * height***REMOVED***;
    this.fixAndSetPosition(***REMOVED***;
    this._onResized(***REMOVED***;
  ***REMOVED***
  _onResized(***REMOVED*** {***REMOVED***
  #addResizeToUndoStack(***REMOVED*** {
    if (!this.#savedDimensions***REMOVED*** {
      return;
    ***REMOVED***
    const {
      savedX,
      savedY,
      savedWidth,
      savedHeight
    ***REMOVED*** = this.#savedDimensions;
    this.#savedDimensions = null;
    const newX = this.x;
    const newY = this.y;
    const newWidth = this.width;
    const newHeight = this.height;
    if (newX === savedX && newY === savedY && newWidth === savedWidth && newHeight === savedHeight***REMOVED*** {
      return;
    ***REMOVED***
    this.addCommands({
      cmd: this.#resize.bind(this, newX, newY, newWidth, newHeight***REMOVED***,
      undo: this.#resize.bind(this, savedX, savedY, savedWidth, savedHeight***REMOVED***,
      mustExec: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  static _round(x***REMOVED*** {
    return Math.round(x * 10000***REMOVED*** / 10000;
  ***REMOVED***
  #resizerPointermove(name, event***REMOVED*** {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const savedX = this.x;
    const savedY = this.y;
    const savedWidth = this.width;
    const savedHeight = this.height;
    const minWidth = AnnotationEditor.MIN_SIZE / parentWidth;
    const minHeight = AnnotationEditor.MIN_SIZE / parentHeight;
    const rotationMatrix = this.#getRotationMatrix(this.rotation***REMOVED***;
    const transf = (x, y***REMOVED*** => [rotationMatrix[0] * x + rotationMatrix[2] * y, rotationMatrix[1] * x + rotationMatrix[3] * y];
    const invRotationMatrix = this.#getRotationMatrix(360 - this.rotation***REMOVED***;
    const invTransf = (x, y***REMOVED*** => [invRotationMatrix[0] * x + invRotationMatrix[2] * y, invRotationMatrix[1] * x + invRotationMatrix[3] * y];
    let getPoint;
    let getOpposite;
    let isDiagonal = false;
    let isHorizontal = false;
    switch (name***REMOVED*** {
      case "topLeft":
        isDiagonal = true;
        getPoint = (w, h***REMOVED*** => [0, 0];
        getOpposite = (w, h***REMOVED*** => [w, h];
        break;
      case "topMiddle":
        getPoint = (w, h***REMOVED*** => [w / 2, 0];
        getOpposite = (w, h***REMOVED*** => [w / 2, h];
        break;
      case "topRight":
        isDiagonal = true;
        getPoint = (w, h***REMOVED*** => [w, 0];
        getOpposite = (w, h***REMOVED*** => [0, h];
        break;
      case "middleRight":
        isHorizontal = true;
        getPoint = (w, h***REMOVED*** => [w, h / 2];
        getOpposite = (w, h***REMOVED*** => [0, h / 2];
        break;
      case "bottomRight":
        isDiagonal = true;
        getPoint = (w, h***REMOVED*** => [w, h];
        getOpposite = (w, h***REMOVED*** => [0, 0];
        break;
      case "bottomMiddle":
        getPoint = (w, h***REMOVED*** => [w / 2, h];
        getOpposite = (w, h***REMOVED*** => [w / 2, 0];
        break;
      case "bottomLeft":
        isDiagonal = true;
        getPoint = (w, h***REMOVED*** => [0, h];
        getOpposite = (w, h***REMOVED*** => [w, 0];
        break;
      case "middleLeft":
        isHorizontal = true;
        getPoint = (w, h***REMOVED*** => [0, h / 2];
        getOpposite = (w, h***REMOVED*** => [w, h / 2];
        break;
    ***REMOVED***
    const point = getPoint(savedWidth, savedHeight***REMOVED***;
    const oppositePoint = getOpposite(savedWidth, savedHeight***REMOVED***;
    let transfOppositePoint = transf(...oppositePoint***REMOVED***;
    const oppositeX = AnnotationEditor._round(savedX + transfOppositePoint[0]***REMOVED***;
    const oppositeY = AnnotationEditor._round(savedY + transfOppositePoint[1]***REMOVED***;
    let ratioX = 1;
    let ratioY = 1;
    let deltaX, deltaY;
    if (!event.fromKeyboard***REMOVED*** {
      const {
        screenX,
        screenY
      ***REMOVED*** = event;
      const [lastScreenX, lastScreenY] = this.#lastPointerCoords;
      [deltaX, deltaY] = this.screenToPageTranslation(screenX - lastScreenX, screenY - lastScreenY***REMOVED***;
      this.#lastPointerCoords[0] = screenX;
      this.#lastPointerCoords[1] = screenY;
    ***REMOVED*** else {
      ({
        deltaX,
        deltaY
      ***REMOVED*** = event***REMOVED***;
    ***REMOVED***
    [deltaX, deltaY] = invTransf(deltaX / parentWidth, deltaY / parentHeight***REMOVED***;
    if (isDiagonal***REMOVED*** {
      const oldDiag = Math.hypot(savedWidth, savedHeight***REMOVED***;
      ratioX = ratioY = Math.max(Math.min(Math.hypot(oppositePoint[0] - point[0] - deltaX, oppositePoint[1] - point[1] - deltaY***REMOVED*** / oldDiag, 1 / savedWidth, 1 / savedHeight***REMOVED***, minWidth / savedWidth, minHeight / savedHeight***REMOVED***;
    ***REMOVED*** else if (isHorizontal***REMOVED*** {
      ratioX = Math.max(minWidth, Math.min(1, Math.abs(oppositePoint[0] - point[0] - deltaX***REMOVED******REMOVED******REMOVED*** / savedWidth;
    ***REMOVED*** else {
      ratioY = Math.max(minHeight, Math.min(1, Math.abs(oppositePoint[1] - point[1] - deltaY***REMOVED******REMOVED******REMOVED*** / savedHeight;
    ***REMOVED***
    const newWidth = AnnotationEditor._round(savedWidth * ratioX***REMOVED***;
    const newHeight = AnnotationEditor._round(savedHeight * ratioY***REMOVED***;
    transfOppositePoint = transf(...getOpposite(newWidth, newHeight***REMOVED******REMOVED***;
    const newX = oppositeX - transfOppositePoint[0];
    const newY = oppositeY - transfOppositePoint[1];
    this.#initialRect ||= [this.x, this.y, this.width, this.height];
    this.width = newWidth;
    this.height = newHeight;
    this.x = newX;
    this.y = newY;
    this.setDims(parentWidth * newWidth, parentHeight * newHeight***REMOVED***;
    this.fixAndSetPosition(***REMOVED***;
    this._onResizing(***REMOVED***;
  ***REMOVED***
  _onResizing(***REMOVED*** {***REMOVED***
  altTextFinish(***REMOVED*** {
    this.#altText?.finish(***REMOVED***;
  ***REMOVED***
  async addEditToolbar(***REMOVED*** {
    if (this._editToolbar || this.#isInEditMode***REMOVED*** {
      return this._editToolbar;
    ***REMOVED***
    this._editToolbar = new EditorToolbar(this***REMOVED***;
    this.div.append(this._editToolbar.render(***REMOVED******REMOVED***;
    if (this.#altText***REMOVED*** {
      await this._editToolbar.addAltText(this.#altText***REMOVED***;
    ***REMOVED***
    return this._editToolbar;
  ***REMOVED***
  removeEditToolbar(***REMOVED*** {
    if (!this._editToolbar***REMOVED*** {
      return;
    ***REMOVED***
    this._editToolbar.remove(***REMOVED***;
    this._editToolbar = null;
    this.#altText?.destroy(***REMOVED***;
  ***REMOVED***
  addContainer(container***REMOVED*** {
    const editToolbarDiv = this._editToolbar?.div;
    if (editToolbarDiv***REMOVED*** {
      editToolbarDiv.before(container***REMOVED***;
    ***REMOVED*** else {
      this.div.append(container***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getClientDimensions(***REMOVED*** {
    return this.div.getBoundingClientRect(***REMOVED***;
  ***REMOVED***
  async addAltTextButton(***REMOVED*** {
    if (this.#altText***REMOVED*** {
      return;
    ***REMOVED***
    AltText.initialize(AnnotationEditor._l10n***REMOVED***;
    this.#altText = new AltText(this***REMOVED***;
    if (this.#accessibilityData***REMOVED*** {
      this.#altText.data = this.#accessibilityData;
      this.#accessibilityData = null;
    ***REMOVED***
    await this.addEditToolbar(***REMOVED***;
  ***REMOVED***
  get altTextData(***REMOVED*** {
    return this.#altText?.data;
  ***REMOVED***
  set altTextData(data***REMOVED*** {
    if (!this.#altText***REMOVED*** {
      return;
    ***REMOVED***
    this.#altText.data = data;
  ***REMOVED***
  get guessedAltText(***REMOVED*** {
    return this.#altText?.guessedText;
  ***REMOVED***
  async setGuessedAltText(text***REMOVED*** {
    await this.#altText?.setGuessedText(text***REMOVED***;
  ***REMOVED***
  serializeAltText(isForCopying***REMOVED*** {
    return this.#altText?.serialize(isForCopying***REMOVED***;
  ***REMOVED***
  hasAltText(***REMOVED*** {
    return !!this.#altText && !this.#altText.isEmpty(***REMOVED***;
  ***REMOVED***
  hasAltTextData(***REMOVED*** {
    return this.#altText?.hasData(***REMOVED*** ?? false;
  ***REMOVED***
  render(***REMOVED*** {
    this.div = document.createElement("div"***REMOVED***;
    this.div.setAttribute("data-editor-rotation", (360 - this.rotation***REMOVED*** % 360***REMOVED***;
    this.div.className = this.name;
    this.div.setAttribute("id", this.id***REMOVED***;
    this.div.tabIndex = this.#disabled ? -1 : 0;
    if (!this._isVisible***REMOVED*** {
      this.div.classList.add("hidden"***REMOVED***;
    ***REMOVED***
    this.setInForeground(***REMOVED***;
    this.#addFocusListeners(***REMOVED***;
    const [parentWidth, parentHeight] = this.parentDimensions;
    if (this.parentRotation % 180 !== 0***REMOVED*** {
      this.div.style.maxWidth = `${(100 * parentHeight / parentWidth***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
      this.div.style.maxHeight = `${(100 * parentWidth / parentHeight***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    ***REMOVED***
    const [tx, ty] = this.getInitialTranslation(***REMOVED***;
    this.translate(tx, ty***REMOVED***;
    bindEvents(this, this.div, ["pointerdown"]***REMOVED***;
    if (this.isResizable && this._uiManager._supportsPinchToZoom***REMOVED*** {
      this.#touchManager ||= new TouchManager({
        container: this.div,
        isPinchingDisabled: (***REMOVED*** => !this.isSelected,
        onPinchStart: this.#touchPinchStartCallback.bind(this***REMOVED***,
        onPinching: this.#touchPinchCallback.bind(this***REMOVED***,
        onPinchEnd: this.#touchPinchEndCallback.bind(this***REMOVED***,
        signal: this._uiManager._signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._uiManager._editorUndoBar?.hide(***REMOVED***;
    return this.div;
  ***REMOVED***
  #touchPinchStartCallback(***REMOVED*** {
    this.#savedDimensions = {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    ***REMOVED***;
    this.#altText?.toggle(false***REMOVED***;
    this.parent.togglePointerEvents(false***REMOVED***;
  ***REMOVED***
  #touchPinchCallback(_origin, prevDistance, distance***REMOVED*** {
    const slowDownFactor = 0.7;
    let factor = slowDownFactor * (distance / prevDistance***REMOVED*** + 1 - slowDownFactor;
    if (factor === 1***REMOVED*** {
      return;
    ***REMOVED***
    const rotationMatrix = this.#getRotationMatrix(this.rotation***REMOVED***;
    const transf = (x, y***REMOVED*** => [rotationMatrix[0] * x + rotationMatrix[2] * y, rotationMatrix[1] * x + rotationMatrix[3] * y];
    const [parentWidth, parentHeight] = this.parentDimensions;
    const savedX = this.x;
    const savedY = this.y;
    const savedWidth = this.width;
    const savedHeight = this.height;
    const minWidth = AnnotationEditor.MIN_SIZE / parentWidth;
    const minHeight = AnnotationEditor.MIN_SIZE / parentHeight;
    factor = Math.max(Math.min(factor, 1 / savedWidth, 1 / savedHeight***REMOVED***, minWidth / savedWidth, minHeight / savedHeight***REMOVED***;
    const newWidth = AnnotationEditor._round(savedWidth * factor***REMOVED***;
    const newHeight = AnnotationEditor._round(savedHeight * factor***REMOVED***;
    if (newWidth === savedWidth && newHeight === savedHeight***REMOVED*** {
      return;
    ***REMOVED***
    this.#initialRect ||= [savedX, savedY, savedWidth, savedHeight];
    const transfCenterPoint = transf(savedWidth / 2, savedHeight / 2***REMOVED***;
    const centerX = AnnotationEditor._round(savedX + transfCenterPoint[0]***REMOVED***;
    const centerY = AnnotationEditor._round(savedY + transfCenterPoint[1]***REMOVED***;
    const newTransfCenterPoint = transf(newWidth / 2, newHeight / 2***REMOVED***;
    this.x = centerX - newTransfCenterPoint[0];
    this.y = centerY - newTransfCenterPoint[1];
    this.width = newWidth;
    this.height = newHeight;
    this.setDims(parentWidth * newWidth, parentHeight * newHeight***REMOVED***;
    this.fixAndSetPosition(***REMOVED***;
    this._onResizing(***REMOVED***;
  ***REMOVED***
  #touchPinchEndCallback(***REMOVED*** {
    this.#altText?.toggle(true***REMOVED***;
    this.parent.togglePointerEvents(true***REMOVED***;
    this.#addResizeToUndoStack(***REMOVED***;
  ***REMOVED***
  pointerdown(event***REMOVED*** {
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac***REMOVED*** {
      event.preventDefault(***REMOVED***;
      return;
    ***REMOVED***
    this.#hasBeenClicked = true;
    if (this._isDraggable***REMOVED*** {
      this.#setUpDragSession(event***REMOVED***;
      return;
    ***REMOVED***
    this.#selectOnPointerEvent(event***REMOVED***;
  ***REMOVED***
  get isSelected(***REMOVED*** {
    return this._uiManager.isSelected(this***REMOVED***;
  ***REMOVED***
  #selectOnPointerEvent(event***REMOVED*** {
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    if (event.ctrlKey && !isMac || event.shiftKey || event.metaKey && isMac***REMOVED*** {
      this.parent.toggleSelected(this***REMOVED***;
    ***REMOVED*** else {
      this.parent.setSelected(this***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #setUpDragSession(event***REMOVED*** {
    const {
      isSelected
    ***REMOVED*** = this;
    this._uiManager.setUpDragSession(***REMOVED***;
    let hasDraggingStarted = false;
    const ac = new AbortController(***REMOVED***;
    const signal = this._uiManager.combinedSignal(ac***REMOVED***;
    const opts = {
      capture: true,
      passive: false,
      signal
    ***REMOVED***;
    const cancelDrag = e => {
      ac.abort(***REMOVED***;
      this.#dragPointerId = null;
      this.#hasBeenClicked = false;
      if (!this._uiManager.endDragSession(***REMOVED******REMOVED*** {
        this.#selectOnPointerEvent(e***REMOVED***;
      ***REMOVED***
      if (hasDraggingStarted***REMOVED*** {
        this._onStopDragging(***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
    if (isSelected***REMOVED*** {
      this.#prevDragX = event.clientX;
      this.#prevDragY = event.clientY;
      this.#dragPointerId = event.pointerId;
      this.#dragPointerType = event.pointerType;
      window.addEventListener("pointermove", e => {
        if (!hasDraggingStarted***REMOVED*** {
          hasDraggingStarted = true;
          this._onStartDragging(***REMOVED***;
        ***REMOVED***
        const {
          clientX: x,
          clientY: y,
          pointerId
        ***REMOVED*** = e;
        if (pointerId !== this.#dragPointerId***REMOVED*** {
          stopEvent(e***REMOVED***;
          return;
        ***REMOVED***
        const [tx, ty] = this.screenToPageTranslation(x - this.#prevDragX, y - this.#prevDragY***REMOVED***;
        this.#prevDragX = x;
        this.#prevDragY = y;
        this._uiManager.dragSelectedEditors(tx, ty***REMOVED***;
      ***REMOVED***, opts***REMOVED***;
      window.addEventListener("touchmove", stopEvent, opts***REMOVED***;
      window.addEventListener("pointerdown", e => {
        if (e.pointerType === this.#dragPointerType***REMOVED*** {
          if (this.#touchManager || e.isPrimary***REMOVED*** {
            cancelDrag(e***REMOVED***;
          ***REMOVED***
        ***REMOVED***
        stopEvent(e***REMOVED***;
      ***REMOVED***, opts***REMOVED***;
    ***REMOVED***
    const pointerUpCallback = e => {
      if (!this.#dragPointerId || this.#dragPointerId === e.pointerId***REMOVED*** {
        cancelDrag(e***REMOVED***;
        return;
      ***REMOVED***
      stopEvent(e***REMOVED***;
    ***REMOVED***;
    window.addEventListener("pointerup", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("blur", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _onStartDragging(***REMOVED*** {***REMOVED***
  _onStopDragging(***REMOVED*** {***REMOVED***
  moveInDOM(***REMOVED*** {
    if (this.#moveInDOMTimeout***REMOVED*** {
      clearTimeout(this.#moveInDOMTimeout***REMOVED***;
    ***REMOVED***
    this.#moveInDOMTimeout = setTimeout((***REMOVED*** => {
      this.#moveInDOMTimeout = null;
      this.parent?.moveEditorInDOM(this***REMOVED***;
    ***REMOVED***, 0***REMOVED***;
  ***REMOVED***
  _setParentAndPosition(parent, x, y***REMOVED*** {
    parent.changeParent(this***REMOVED***;
    this.x = x;
    this.y = y;
    this.fixAndSetPosition(***REMOVED***;
    this._onTranslated(***REMOVED***;
  ***REMOVED***
  getRect(tx, ty, rotation = this.rotation***REMOVED*** {
    const scale = this.parentScale;
    const [pageWidth, pageHeight] = this.pageDimensions;
    const [pageX, pageY] = this.pageTranslation;
    const shiftX = tx / scale;
    const shiftY = ty / scale;
    const x = this.x * pageWidth;
    const y = this.y * pageHeight;
    const width = this.width * pageWidth;
    const height = this.height * pageHeight;
    switch (rotation***REMOVED*** {
      case 0:
        return [x + shiftX + pageX, pageHeight - y - shiftY - height + pageY, x + shiftX + width + pageX, pageHeight - y - shiftY + pageY];
      case 90:
        return [x + shiftY + pageX, pageHeight - y + shiftX + pageY, x + shiftY + height + pageX, pageHeight - y + shiftX + width + pageY];
      case 180:
        return [x - shiftX - width + pageX, pageHeight - y + shiftY + pageY, x - shiftX + pageX, pageHeight - y + shiftY + height + pageY];
      case 270:
        return [x - shiftY - height + pageX, pageHeight - y - shiftX - width + pageY, x - shiftY + pageX, pageHeight - y - shiftX + pageY];
      default:
        throw new Error("Invalid rotation"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getRectInCurrentCoords(rect, pageHeight***REMOVED*** {
    const [x1, y1, x2, y2] = rect;
    const width = x2 - x1;
    const height = y2 - y1;
    switch (this.rotation***REMOVED*** {
      case 0:
        return [x1, pageHeight - y2, width, height];
      case 90:
        return [x1, pageHeight - y1, height, width];
      case 180:
        return [x2, pageHeight - y1, width, height];
      case 270:
        return [x2, pageHeight - y2, height, width];
      default:
        throw new Error("Invalid rotation"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  onceAdded(focus***REMOVED*** {***REMOVED***
  isEmpty(***REMOVED*** {
    return false;
  ***REMOVED***
  enableEditMode(***REMOVED*** {
    this.#isInEditMode = true;
  ***REMOVED***
  disableEditMode(***REMOVED*** {
    this.#isInEditMode = false;
  ***REMOVED***
  isInEditMode(***REMOVED*** {
    return this.#isInEditMode;
  ***REMOVED***
  shouldGetKeyboardEvents(***REMOVED*** {
    return this.#isResizerEnabledForKeyboard;
  ***REMOVED***
  needsToBeRebuilt(***REMOVED*** {
    return this.div && !this.isAttachedToDOM;
  ***REMOVED***
  get isOnScreen(***REMOVED*** {
    const {
      top,
      left,
      bottom,
      right
    ***REMOVED*** = this.getClientDimensions(***REMOVED***;
    const {
      innerHeight,
      innerWidth
    ***REMOVED*** = window;
    return left < innerWidth && right > 0 && top < innerHeight && bottom > 0;
  ***REMOVED***
  #addFocusListeners(***REMOVED*** {
    if (this.#focusAC || !this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.#focusAC = new AbortController(***REMOVED***;
    const signal = this._uiManager.combinedSignal(this.#focusAC***REMOVED***;
    this.div.addEventListener("focusin", this.focusin.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.div.addEventListener("focusout", this.focusout.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  rebuild(***REMOVED*** {
    this.#addFocusListeners(***REMOVED***;
  ***REMOVED***
  rotate(_angle***REMOVED*** {***REMOVED***
  resize(***REMOVED*** {***REMOVED***
  serializeDeleted(***REMOVED*** {
***REMOVED***
      id: this.annotationElementId,
      deleted: true,
      pageIndex: this.pageIndex,
      popupRef: this._initialData?.popupRef || ""
    ***REMOVED***;
  ***REMOVED***
  serialize(isForCopying = false, context = null***REMOVED*** {
    unreachable("An editor must be serializable"***REMOVED***;
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    const editor = new this.prototype.constructor({
      parent,
      id: parent.getNextId(***REMOVED***,
      uiManager
    ***REMOVED******REMOVED***;
    editor.rotation = data.rotation;
    editor.#accessibilityData = data.accessibilityData;
    const [pageWidth, pageHeight] = editor.pageDimensions;
    const [x, y, width, height] = editor.getRectInCurrentCoords(data.rect, pageHeight***REMOVED***;
    editor.x = x / pageWidth;
    editor.y = y / pageHeight;
    editor.width = width / pageWidth;
    editor.height = height / pageHeight;
    return editor;
  ***REMOVED***
  get hasBeenModified(***REMOVED*** {
    return !!this.annotationElementId && (this.deleted || this.serialize(***REMOVED*** !== null***REMOVED***;
  ***REMOVED***
  remove(***REMOVED*** {
    this.#focusAC?.abort(***REMOVED***;
    this.#focusAC = null;
    if (!this.isEmpty(***REMOVED******REMOVED*** {
      this.commit(***REMOVED***;
    ***REMOVED***
    if (this.parent***REMOVED*** {
      this.parent.remove(this***REMOVED***;
    ***REMOVED*** else {
      this._uiManager.removeEditor(this***REMOVED***;
    ***REMOVED***
    if (this.#moveInDOMTimeout***REMOVED*** {
      clearTimeout(this.#moveInDOMTimeout***REMOVED***;
      this.#moveInDOMTimeout = null;
    ***REMOVED***
    this.#stopResizing(***REMOVED***;
    this.removeEditToolbar(***REMOVED***;
    if (this.#telemetryTimeouts***REMOVED*** {
      for (const timeout of this.#telemetryTimeouts.values(***REMOVED******REMOVED*** {
        clearTimeout(timeout***REMOVED***;
      ***REMOVED***
      this.#telemetryTimeouts = null;
    ***REMOVED***
    this.parent = null;
    this.#touchManager?.destroy(***REMOVED***;
    this.#touchManager = null;
  ***REMOVED***
  get isResizable(***REMOVED*** {
    return false;
  ***REMOVED***
  makeResizable(***REMOVED*** {
    if (this.isResizable***REMOVED*** {
      this.#createResizers(***REMOVED***;
      this.#resizersDiv.classList.remove("hidden"***REMOVED***;
      bindEvents(this, this.div, ["keydown"]***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get toolbarPosition(***REMOVED*** {
    return null;
  ***REMOVED***
  keydown(event***REMOVED*** {
    if (!this.isResizable || event.target !== this.div || event.key !== "Enter"***REMOVED*** {
      return;
    ***REMOVED***
    this._uiManager.setSelected(this***REMOVED***;
    this.#savedDimensions = {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    ***REMOVED***;
    const children = this.#resizersDiv.children;
    if (!this.#allResizerDivs***REMOVED*** {
      this.#allResizerDivs = Array.from(children***REMOVED***;
      const boundResizerKeydown = this.#resizerKeydown.bind(this***REMOVED***;
      const boundResizerBlur = this.#resizerBlur.bind(this***REMOVED***;
      const signal = this._uiManager._signal;
      for (const div of this.#allResizerDivs***REMOVED*** {
        const name = div.getAttribute("data-resizer-name"***REMOVED***;
        div.setAttribute("role", "spinbutton"***REMOVED***;
        div.addEventListener("keydown", boundResizerKeydown, {
          signal
        ***REMOVED******REMOVED***;
        div.addEventListener("blur", boundResizerBlur, {
          signal
        ***REMOVED******REMOVED***;
        div.addEventListener("focus", this.#resizerFocus.bind(this, name***REMOVED***, {
          signal
        ***REMOVED******REMOVED***;
        div.setAttribute("data-l10n-id", AnnotationEditor._l10nResizer[name]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const first = this.#allResizerDivs[0];
    let firstPosition = 0;
    for (const div of children***REMOVED*** {
      if (div === first***REMOVED*** {
        break;
      ***REMOVED***
      firstPosition++;
    ***REMOVED***
    const nextFirstPosition = (360 - this.rotation + this.parentRotation***REMOVED*** % 360 / 90 * (this.#allResizerDivs.length / 4***REMOVED***;
    if (nextFirstPosition !== firstPosition***REMOVED*** {
      if (nextFirstPosition < firstPosition***REMOVED*** {
        for (let i = 0; i < firstPosition - nextFirstPosition; i++***REMOVED*** {
          this.#resizersDiv.append(this.#resizersDiv.firstChild***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else if (nextFirstPosition > firstPosition***REMOVED*** {
        for (let i = 0; i < nextFirstPosition - firstPosition; i++***REMOVED*** {
          this.#resizersDiv.firstChild.before(this.#resizersDiv.lastChild***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      let i = 0;
      for (const child of children***REMOVED*** {
        const div = this.#allResizerDivs[i++];
        const name = div.getAttribute("data-resizer-name"***REMOVED***;
        child.setAttribute("data-l10n-id", AnnotationEditor._l10nResizer[name]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#setResizerTabIndex(0***REMOVED***;
    this.#isResizerEnabledForKeyboard = true;
    this.#resizersDiv.firstChild.focus({
      focusVisible: true
    ***REMOVED******REMOVED***;
    event.preventDefault(***REMOVED***;
    event.stopImmediatePropagation(***REMOVED***;
  ***REMOVED***
  #resizerKeydown(event***REMOVED*** {
    AnnotationEditor._resizerKeyboardManager.exec(this, event***REMOVED***;
  ***REMOVED***
  #resizerBlur(event***REMOVED*** {
    if (this.#isResizerEnabledForKeyboard && event.relatedTarget?.parentNode !== this.#resizersDiv***REMOVED*** {
      this.#stopResizing(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #resizerFocus(name***REMOVED*** {
    this.#focusedResizerName = this.#isResizerEnabledForKeyboard ? name : "";
  ***REMOVED***
  #setResizerTabIndex(value***REMOVED*** {
    if (!this.#allResizerDivs***REMOVED*** {
      return;
    ***REMOVED***
    for (const div of this.#allResizerDivs***REMOVED*** {
      div.tabIndex = value;
    ***REMOVED***
  ***REMOVED***
  _resizeWithKeyboard(x, y***REMOVED*** {
    if (!this.#isResizerEnabledForKeyboard***REMOVED*** {
      return;
    ***REMOVED***
    this.#resizerPointermove(this.#focusedResizerName, {
      deltaX: x,
      deltaY: y,
      fromKeyboard: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #stopResizing(***REMOVED*** {
    this.#isResizerEnabledForKeyboard = false;
    this.#setResizerTabIndex(-1***REMOVED***;
    this.#addResizeToUndoStack(***REMOVED***;
  ***REMOVED***
  _stopResizingWithKeyboard(***REMOVED*** {
    this.#stopResizing(***REMOVED***;
    this.div.focus(***REMOVED***;
  ***REMOVED***
  select(***REMOVED*** {
    this.makeResizable(***REMOVED***;
    this.div?.classList.add("selectedEditor"***REMOVED***;
    if (!this._editToolbar***REMOVED*** {
      this.addEditToolbar(***REMOVED***.then((***REMOVED*** => {
        if (this.div?.classList.contains("selectedEditor"***REMOVED******REMOVED*** {
          this._editToolbar?.show(***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    this._editToolbar?.show(***REMOVED***;
    this.#altText?.toggleAltTextBadge(false***REMOVED***;
  ***REMOVED***
  unselect(***REMOVED*** {
    this.#resizersDiv?.classList.add("hidden"***REMOVED***;
    this.div?.classList.remove("selectedEditor"***REMOVED***;
    if (this.div?.contains(document.activeElement***REMOVED******REMOVED*** {
      this._uiManager.currentLayer.div.focus({
        preventScroll: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._editToolbar?.hide(***REMOVED***;
    this.#altText?.toggleAltTextBadge(true***REMOVED***;
  ***REMOVED***
  updateParams(type, value***REMOVED*** {***REMOVED***
  disableEditing(***REMOVED*** {***REMOVED***
  enableEditing(***REMOVED*** {***REMOVED***
  enterInEditMode(***REMOVED*** {***REMOVED***
  getImageForAltText(***REMOVED*** {
    return null;
  ***REMOVED***
  get contentDiv(***REMOVED*** {
    return this.div;
  ***REMOVED***
  get isEditing(***REMOVED*** {
    return this.#isEditing;
  ***REMOVED***
  set isEditing(value***REMOVED*** {
    this.#isEditing = value;
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    if (value***REMOVED*** {
      this.parent.setSelected(this***REMOVED***;
      this.parent.setActiveEditor(this***REMOVED***;
    ***REMOVED*** else {
      this.parent.setActiveEditor(null***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setAspectRatio(width, height***REMOVED*** {
    this.#keepAspectRatio = true;
    const aspectRatio = width / height;
    const {
      style
    ***REMOVED*** = this.div;
    style.aspectRatio = aspectRatio;
    style.height = "auto";
  ***REMOVED***
  static get MIN_SIZE(***REMOVED*** {
    return 16;
  ***REMOVED***
  static canCreateNewEmptyEditor(***REMOVED*** {
    return true;
  ***REMOVED***
  get telemetryInitialData(***REMOVED*** {
***REMOVED***
      action: "added"
    ***REMOVED***;
  ***REMOVED***
  get telemetryFinalData(***REMOVED*** {
    return null;
  ***REMOVED***
  _reportTelemetry(data, mustWait = false***REMOVED*** {
    if (mustWait***REMOVED*** {
      this.#telemetryTimeouts ||= new Map(***REMOVED***;
      const {
        action
      ***REMOVED*** = data;
      let timeout = this.#telemetryTimeouts.get(action***REMOVED***;
      if (timeout***REMOVED*** {
        clearTimeout(timeout***REMOVED***;
      ***REMOVED***
      timeout = setTimeout((***REMOVED*** => {
        this._reportTelemetry(data***REMOVED***;
        this.#telemetryTimeouts.delete(action***REMOVED***;
        if (this.#telemetryTimeouts.size === 0***REMOVED*** {
          this.#telemetryTimeouts = null;
        ***REMOVED***
      ***REMOVED***, AnnotationEditor._telemetryTimeout***REMOVED***;
      this.#telemetryTimeouts.set(action, timeout***REMOVED***;
      return;
    ***REMOVED***
    data.type ||= this.editorType;
    this._uiManager._eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  show(visible = this._isVisible***REMOVED*** {
    this.div.classList.toggle("hidden", !visible***REMOVED***;
    this._isVisible = visible;
  ***REMOVED***
  enable(***REMOVED*** {
    if (this.div***REMOVED*** {
      this.div.tabIndex = 0;
    ***REMOVED***
    this.#disabled = false;
  ***REMOVED***
  disable(***REMOVED*** {
    if (this.div***REMOVED*** {
      this.div.tabIndex = -1;
    ***REMOVED***
    this.#disabled = true;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    let content = annotation.container.querySelector(".annotationContent"***REMOVED***;
    if (!content***REMOVED*** {
      content = document.createElement("div"***REMOVED***;
      content.classList.add("annotationContent", this.editorType***REMOVED***;
      annotation.container.prepend(content***REMOVED***;
    ***REMOVED*** else if (content.nodeName === "CANVAS"***REMOVED*** {
      const canvas = content;
      content = document.createElement("div"***REMOVED***;
      content.classList.add("annotationContent", this.editorType***REMOVED***;
      canvas.before(content***REMOVED***;
    ***REMOVED***
    return content;
  ***REMOVED***
  resetAnnotationElement(annotation***REMOVED*** {
    const {
      firstChild
    ***REMOVED*** = annotation.container;
    if (firstChild?.nodeName === "DIV" && firstChild.classList.contains("annotationContent"***REMOVED******REMOVED*** {
      firstChild.remove(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class FakeEditor extends AnnotationEditor {
  constructor(params***REMOVED*** {
    super(params***REMOVED***;
    this.annotationElementId = params.annotationElementId;
    this.deleted = true;
  ***REMOVED***
  serialize(***REMOVED*** {
    return this.serializeDeleted(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/shared/murmurhash3.js
const SEED = 0xc3d2e1f0;
const MASK_HIGH = 0xffff0000;
const MASK_LOW = 0xffff;
class MurmurHash3_64 {
  constructor(seed***REMOVED*** {
    this.h1 = seed ? seed & 0xffffffff : SEED;
    this.h2 = seed ? seed & 0xffffffff : SEED;
  ***REMOVED***
  update(input***REMOVED*** {
    let data, length;
    if (typeof input === "string"***REMOVED*** {
      data = new Uint8Array(input.length * 2***REMOVED***;
      length = 0;
      for (let i = 0, ii = input.length; i < ii; i++***REMOVED*** {
        const code = input.charCodeAt(i***REMOVED***;
        if (code <= 0xff***REMOVED*** {
          data[length++] = code;
        ***REMOVED*** else {
          data[length++] = code >>> 8;
          data[length++] = code & 0xff;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else if (ArrayBuffer.isView(input***REMOVED******REMOVED*** {
      data = input.slice(***REMOVED***;
      length = data.byteLength;
    ***REMOVED*** else {
      throw new Error("Invalid data format, must be a string or TypedArray."***REMOVED***;
    ***REMOVED***
    const blockCounts = length >> 2;
    const tailLength = length - blockCounts * 4;
    const dataUint32 = new Uint32Array(data.buffer, 0, blockCounts***REMOVED***;
    let k1 = 0,
      k2 = 0;
    let h1 = this.h1,
      h2 = this.h2;
    const C1 = 0xcc9e2d51,
      C2 = 0x1b873593;
    const C1_LOW = C1 & MASK_LOW,
      C2_LOW = C2 & MASK_LOW;
    for (let i = 0; i < blockCounts; i++***REMOVED*** {
      if (i & 1***REMOVED*** {
        k1 = dataUint32[i];
        k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1 = h1 * 5 + 0xe6546b64;
      ***REMOVED*** else {
        k2 = dataUint32[i];
        k2 = k2 * C1 & MASK_HIGH | k2 * C1_LOW & MASK_LOW;
        k2 = k2 << 15 | k2 >>> 17;
        k2 = k2 * C2 & MASK_HIGH | k2 * C2_LOW & MASK_LOW;
        h2 ^= k2;
        h2 = h2 << 13 | h2 >>> 19;
        h2 = h2 * 5 + 0xe6546b64;
      ***REMOVED***
    ***REMOVED***
    k1 = 0;
    switch (tailLength***REMOVED*** {
      case 3:
        k1 ^= data[blockCounts * 4 + 2] << 16;
      case 2:
        k1 ^= data[blockCounts * 4 + 1] << 8;
      case 1:
        k1 ^= data[blockCounts * 4];
        k1 = k1 * C1 & MASK_HIGH | k1 * C1_LOW & MASK_LOW;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = k1 * C2 & MASK_HIGH | k1 * C2_LOW & MASK_LOW;
        if (blockCounts & 1***REMOVED*** {
          h1 ^= k1;
        ***REMOVED*** else {
          h2 ^= k1;
        ***REMOVED***
    ***REMOVED***
    this.h1 = h1;
    this.h2 = h2;
  ***REMOVED***
  hexdigest(***REMOVED*** {
    let h1 = this.h1,
      h2 = this.h2;
    h1 ^= h2 >>> 1;
    h1 = h1 * 0xed558ccd & MASK_HIGH | h1 * 0x8ccd & MASK_LOW;
    h2 = h2 * 0xff51afd7 & MASK_HIGH | ((h2 << 16 | h1 >>> 16***REMOVED*** * 0xafd7ed55 & MASK_HIGH***REMOVED*** >>> 16;
    h1 ^= h2 >>> 1;
    h1 = h1 * 0x1a85ec53 & MASK_HIGH | h1 * 0xec53 & MASK_LOW;
    h2 = h2 * 0xc4ceb9fe & MASK_HIGH | ((h2 << 16 | h1 >>> 16***REMOVED*** * 0xb9fe1a85 & MASK_HIGH***REMOVED*** >>> 16;
    h1 ^= h2 >>> 1;
    return (h1 >>> 0***REMOVED***.toString(16***REMOVED***.padStart(8, "0"***REMOVED*** + (h2 >>> 0***REMOVED***.toString(16***REMOVED***.padStart(8, "0"***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/annotation_storage.js



const SerializableEmpty = Object.freeze({
  map: null,
  hash: "",
  transfer: undefined
***REMOVED******REMOVED***;
class AnnotationStorage {
  #modified = false;
  #modifiedIds = null;
  #storage = new Map(***REMOVED***;
  constructor(***REMOVED*** {
    this.onSetModified = null;
    this.onResetModified = null;
    this.onAnnotationEditor = null;
  ***REMOVED***
  getValue(key, defaultValue***REMOVED*** {
    const value = this.#storage.get(key***REMOVED***;
    if (value === undefined***REMOVED*** {
      return defaultValue;
    ***REMOVED***
    return Object.assign(defaultValue, value***REMOVED***;
  ***REMOVED***
  getRawValue(key***REMOVED*** {
    return this.#storage.get(key***REMOVED***;
  ***REMOVED***
  remove(key***REMOVED*** {
    this.#storage.delete(key***REMOVED***;
    if (this.#storage.size === 0***REMOVED*** {
      this.resetModified(***REMOVED***;
    ***REMOVED***
    if (typeof this.onAnnotationEditor === "function"***REMOVED*** {
      for (const value of this.#storage.values(***REMOVED******REMOVED*** {
        if (value instanceof AnnotationEditor***REMOVED*** {
          return;
        ***REMOVED***
      ***REMOVED***
      this.onAnnotationEditor(null***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setValue(key, value***REMOVED*** {
    const obj = this.#storage.get(key***REMOVED***;
    let modified = false;
    if (obj !== undefined***REMOVED*** {
      for (const [entry, val] of Object.entries(value***REMOVED******REMOVED*** {
        if (obj[entry] !== val***REMOVED*** {
          modified = true;
          obj[entry] = val;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else {
      modified = true;
      this.#storage.set(key, value***REMOVED***;
    ***REMOVED***
    if (modified***REMOVED*** {
      this.#setModified(***REMOVED***;
    ***REMOVED***
    if (value instanceof AnnotationEditor && typeof this.onAnnotationEditor === "function"***REMOVED*** {
      this.onAnnotationEditor(value.constructor._type***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  has(key***REMOVED*** {
    return this.#storage.has(key***REMOVED***;
  ***REMOVED***
  getAll(***REMOVED*** {
    return this.#storage.size > 0 ? objectFromMap(this.#storage***REMOVED*** : null;
  ***REMOVED***
  setAll(obj***REMOVED*** {
    for (const [key, val] of Object.entries(obj***REMOVED******REMOVED*** {
      this.setValue(key, val***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get size(***REMOVED*** {
    return this.#storage.size;
  ***REMOVED***
  #setModified(***REMOVED*** {
    if (!this.#modified***REMOVED*** {
      this.#modified = true;
      if (typeof this.onSetModified === "function"***REMOVED*** {
        this.onSetModified(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  resetModified(***REMOVED*** {
    if (this.#modified***REMOVED*** {
      this.#modified = false;
      if (typeof this.onResetModified === "function"***REMOVED*** {
        this.onResetModified(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  get print(***REMOVED*** {
    return new PrintAnnotationStorage(this***REMOVED***;
  ***REMOVED***
  get serializable(***REMOVED*** {
    if (this.#storage.size === 0***REMOVED*** {
      return SerializableEmpty;
    ***REMOVED***
    const map = new Map(***REMOVED***,
      hash = new MurmurHash3_64(***REMOVED***,
      transfer = [];
    const context = Object.create(null***REMOVED***;
    let hasBitmap = false;
    for (const [key, val] of this.#storage***REMOVED*** {
      const serialized = val instanceof AnnotationEditor ? val.serialize(false, context***REMOVED*** : val;
      if (serialized***REMOVED*** {
        map.set(key, serialized***REMOVED***;
        hash.update(`${key***REMOVED***:${JSON.stringify(serialized***REMOVED******REMOVED***`***REMOVED***;
        hasBitmap ||= !!serialized.bitmap;
      ***REMOVED***
    ***REMOVED***
    if (hasBitmap***REMOVED*** {
      for (const value of map.values(***REMOVED******REMOVED*** {
        if (value.bitmap***REMOVED*** {
          transfer.push(value.bitmap***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return map.size > 0 ? {
      map,
      hash: hash.hexdigest(***REMOVED***,
      transfer
    ***REMOVED*** : SerializableEmpty;
  ***REMOVED***
  get editorStats(***REMOVED*** {
    let stats = null;
    const typeToEditor = new Map(***REMOVED***;
    for (const value of this.#storage.values(***REMOVED******REMOVED*** {
      if (!(value instanceof AnnotationEditor***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      const editorStats = value.telemetryFinalData;
      if (!editorStats***REMOVED*** {
        continue;
      ***REMOVED***
      const {
        type
      ***REMOVED*** = editorStats;
      if (!typeToEditor.has(type***REMOVED******REMOVED*** {
        typeToEditor.set(type, Object.getPrototypeOf(value***REMOVED***.constructor***REMOVED***;
      ***REMOVED***
      stats ||= Object.create(null***REMOVED***;
      const map = stats[type] ||= new Map(***REMOVED***;
      for (const [key, val] of Object.entries(editorStats***REMOVED******REMOVED*** {
        if (key === "type"***REMOVED*** {
          continue;
        ***REMOVED***
        let counters = map.get(key***REMOVED***;
        if (!counters***REMOVED*** {
          counters = new Map(***REMOVED***;
          map.set(key, counters***REMOVED***;
        ***REMOVED***
        const count = counters.get(val***REMOVED*** ?? 0;
        counters.set(val, count + 1***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    for (const [type, editor] of typeToEditor***REMOVED*** {
      stats[type] = editor.computeTelemetryFinalData(stats[type]***REMOVED***;
    ***REMOVED***
    return stats;
  ***REMOVED***
  resetModifiedIds(***REMOVED*** {
    this.#modifiedIds = null;
  ***REMOVED***
  get modifiedIds(***REMOVED*** {
    if (this.#modifiedIds***REMOVED*** {
      return this.#modifiedIds;
    ***REMOVED***
    const ids = [];
    for (const value of this.#storage.values(***REMOVED******REMOVED*** {
      if (!(value instanceof AnnotationEditor***REMOVED*** || !value.annotationElementId || !value.serialize(***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      ids.push(value.annotationElementId***REMOVED***;
    ***REMOVED***
    return this.#modifiedIds = {
      ids: new Set(ids***REMOVED***,
      hash: ids.join(","***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
class PrintAnnotationStorage extends AnnotationStorage {
  #serializable;
  constructor(parent***REMOVED*** {
    super(***REMOVED***;
    const {
      map,
      hash,
      transfer
    ***REMOVED*** = parent.serializable;
    const clone = structuredClone(map, transfer ? {
      transfer
    ***REMOVED*** : null***REMOVED***;
    this.#serializable = {
      map: clone,
      hash,
      transfer
    ***REMOVED***;
  ***REMOVED***
  get print(***REMOVED*** {
    unreachable("Should not call PrintAnnotationStorage.print"***REMOVED***;
  ***REMOVED***
  get serializable(***REMOVED*** {
    return this.#serializable;
  ***REMOVED***
  get modifiedIds(***REMOVED*** {
    return shadow(this, "modifiedIds", {
      ids: new Set(***REMOVED***,
      hash: ""
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/font_loader.js

class FontLoader {
  #systemFonts = new Set(***REMOVED***;
  constructor({
    ownerDocument = globalThis.document,
    styleElement = null
  ***REMOVED******REMOVED*** {
    this._document = ownerDocument;
    this.nativeFontFaces = new Set(***REMOVED***;
    this.styleElement = null;
    this.loadingRequests = [];
    this.loadTestFontId = 0;
  ***REMOVED***
  addNativeFontFace(nativeFontFace***REMOVED*** {
    this.nativeFontFaces.add(nativeFontFace***REMOVED***;
    this._document.fonts.add(nativeFontFace***REMOVED***;
  ***REMOVED***
  removeNativeFontFace(nativeFontFace***REMOVED*** {
    this.nativeFontFaces.delete(nativeFontFace***REMOVED***;
    this._document.fonts.delete(nativeFontFace***REMOVED***;
  ***REMOVED***
  insertRule(rule***REMOVED*** {
    if (!this.styleElement***REMOVED*** {
      this.styleElement = this._document.createElement("style"***REMOVED***;
      this._document.documentElement.getElementsByTagName("head"***REMOVED***[0].append(this.styleElement***REMOVED***;
    ***REMOVED***
    const styleSheet = this.styleElement.sheet;
    styleSheet.insertRule(rule, styleSheet.cssRules.length***REMOVED***;
  ***REMOVED***
  clear(***REMOVED*** {
    for (const nativeFontFace of this.nativeFontFaces***REMOVED*** {
      this._document.fonts.delete(nativeFontFace***REMOVED***;
    ***REMOVED***
    this.nativeFontFaces.clear(***REMOVED***;
    this.#systemFonts.clear(***REMOVED***;
    if (this.styleElement***REMOVED*** {
      this.styleElement.remove(***REMOVED***;
      this.styleElement = null;
    ***REMOVED***
  ***REMOVED***
  async loadSystemFont({
    systemFontInfo: info,
    _inspectFont
  ***REMOVED******REMOVED*** {
    if (!info || this.#systemFonts.has(info.loadedName***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    assert(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set."***REMOVED***;
    if (this.isFontLoadingAPISupported***REMOVED*** {
      const {
        loadedName,
        src,
        style
      ***REMOVED*** = info;
      const fontFace = new FontFace(loadedName, src, style***REMOVED***;
      this.addNativeFontFace(fontFace***REMOVED***;
    ***REMOVED***
        await fontFace.load(***REMOVED***;
        this.#systemFonts.add(loadedName***REMOVED***;
        _inspectFont?.(info***REMOVED***;
      ***REMOVED*** catch {
        warn(`Cannot load system font: ${info.baseFontName***REMOVED***, installing it could help to improve PDF rendering.`***REMOVED***;
        this.removeNativeFontFace(fontFace***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    unreachable("Not implemented: loadSystemFont without the Font Loading API."***REMOVED***;
  ***REMOVED***
  async bind(font***REMOVED*** {
    if (font.attached || font.missingFile && !font.systemFontInfo***REMOVED*** {
      return;
    ***REMOVED***
    font.attached = true;
    if (font.systemFontInfo***REMOVED*** {
      await this.loadSystemFont(font***REMOVED***;
      return;
    ***REMOVED***
    if (this.isFontLoadingAPISupported***REMOVED*** {
      const nativeFontFace = font.createNativeFontFace(***REMOVED***;
      if (nativeFontFace***REMOVED*** {
        this.addNativeFontFace(nativeFontFace***REMOVED***;
      ***REMOVED***
          await nativeFontFace.loaded;
        ***REMOVED*** catch (ex***REMOVED*** {
          warn(`Failed to load font '${nativeFontFace.family***REMOVED***': '${ex***REMOVED***'.`***REMOVED***;
          font.disableFontFace = true;
          throw ex;
        ***REMOVED***
      ***REMOVED***
      return;
    ***REMOVED***
    const rule = font.createFontFaceRule(***REMOVED***;
    if (rule***REMOVED*** {
      this.insertRule(rule***REMOVED***;
      if (this.isSyncFontLoadingSupported***REMOVED*** {
        return;
      ***REMOVED***
      await new Promise(resolve => {
        const request = this._queueLoadingCallback(resolve***REMOVED***;
        this._prepareFontLoadEvent(font, request***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get isFontLoadingAPISupported(***REMOVED*** {
    const hasFonts = !!this._document?.fonts;
    return shadow(this, "isFontLoadingAPISupported", hasFonts***REMOVED***;
  ***REMOVED***
  get isSyncFontLoadingSupported(***REMOVED*** {
    let supported = false;
    if (isNodeJS***REMOVED*** {
      supported = true;
    ***REMOVED*** else if (typeof navigator !== "undefined" && typeof navigator?.userAgent === "string" && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent***REMOVED******REMOVED*** {
      supported = true;
    ***REMOVED***
    return shadow(this, "isSyncFontLoadingSupported", supported***REMOVED***;
  ***REMOVED***
  _queueLoadingCallback(callback***REMOVED*** {
    function completeRequest(***REMOVED*** {
      assert(!request.done, "completeRequest(***REMOVED*** cannot be called twice."***REMOVED***;
      request.done = true;
      while (loadingRequests.length > 0 && loadingRequests[0].done***REMOVED*** {
        const otherRequest = loadingRequests.shift(***REMOVED***;
        setTimeout(otherRequest.callback, 0***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const {
      loadingRequests
    ***REMOVED*** = this;
    const request = {
      done: false,
      complete: completeRequest,
      callback
    ***REMOVED***;
    loadingRequests.push(request***REMOVED***;
    return request;
  ***REMOVED***
  get _loadTestFont(***REMOVED*** {
    const testFont = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA" + "FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA" + "ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA" + "AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1" + "AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD" + "6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM" + "AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D" + "IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA" + "AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA" + "AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB" + "AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY" + "AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA" + "AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA" + "AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC" + "AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3" + "Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj" + "FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="***REMOVED***;
    return shadow(this, "_loadTestFont", testFont***REMOVED***;
  ***REMOVED***
  _prepareFontLoadEvent(font, request***REMOVED*** {
    function int32(data, offset***REMOVED*** {
      return data.charCodeAt(offset***REMOVED*** << 24 | data.charCodeAt(offset + 1***REMOVED*** << 16 | data.charCodeAt(offset + 2***REMOVED*** << 8 | data.charCodeAt(offset + 3***REMOVED*** & 0xff;
    ***REMOVED***
    function spliceString(s, offset, remove, insert***REMOVED*** {
      const chunk1 = s.substring(0, offset***REMOVED***;
      const chunk2 = s.substring(offset + remove***REMOVED***;
      return chunk1 + insert + chunk2;
    ***REMOVED***
    let i, ii;
    const canvas = this._document.createElement("canvas"***REMOVED***;
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d"***REMOVED***;
    let called = 0;
    function isFontReady(name, callback***REMOVED*** {
      if (++called > 30***REMOVED*** {
        warn("Load test font never loaded."***REMOVED***;
        callback(***REMOVED***;
        return;
      ***REMOVED***
      ctx.font = "30px " + name;
      ctx.fillText(".", 0, 20***REMOVED***;
      const imageData = ctx.getImageData(0, 0, 1, 1***REMOVED***;
      if (imageData.data[3] > 0***REMOVED*** {
        callback(***REMOVED***;
        return;
      ***REMOVED***
      setTimeout(isFontReady.bind(null, name, callback***REMOVED******REMOVED***;
    ***REMOVED***
    const loadTestFontId = `lt${Date.now(***REMOVED******REMOVED***${this.loadTestFontId++***REMOVED***`;
    let data = this._loadTestFont;
    const COMMENT_OFFSET = 976;
    data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId***REMOVED***;
    const CFF_CHECKSUM_OFFSET = 16;
    const XXXX_VALUE = 0x58585858;
    let checksum = int32(data, CFF_CHECKSUM_OFFSET***REMOVED***;
    for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4***REMOVED*** {
      checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i***REMOVED*** | 0;
    ***REMOVED***
    if (i < loadTestFontId.length***REMOVED*** {
      checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i***REMOVED*** | 0;
    ***REMOVED***
    data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, string32(checksum***REMOVED******REMOVED***;
    const url = `url(data:font/opentype;base64,${btoa(data***REMOVED******REMOVED******REMOVED***;`;
    const rule = `@font-face {font-family:"${loadTestFontId***REMOVED***";src:${url***REMOVED******REMOVED***`;
    this.insertRule(rule***REMOVED***;
    const div = this._document.createElement("div"***REMOVED***;
    div.style.visibility = "hidden";
    div.style.width = div.style.height = "10px";
    div.style.position = "absolute";
    div.style.top = div.style.left = "0px";
    for (const name of [font.loadedName, loadTestFontId]***REMOVED*** {
      const span = this._document.createElement("span"***REMOVED***;
      span.textContent = "Hi";
      span.style.fontFamily = name;
      div.append(span***REMOVED***;
    ***REMOVED***
    this._document.body.append(div***REMOVED***;
    isFontReady(loadTestFontId, (***REMOVED*** => {
      div.remove(***REMOVED***;
      request.complete(***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
class FontFaceObject {
  constructor(translatedData, {
    disableFontFace = false,
    fontExtraProperties = false,
    inspectFont = null
  ***REMOVED******REMOVED*** {
    this.compiledGlyphs = Object.create(null***REMOVED***;
    for (const i in translatedData***REMOVED*** {
      this[i] = translatedData[i];
    ***REMOVED***
    this.disableFontFace = disableFontFace === true;
    this.fontExtraProperties = fontExtraProperties === true;
    this._inspectFont = inspectFont;
  ***REMOVED***
  createNativeFontFace(***REMOVED*** {
    if (!this.data || this.disableFontFace***REMOVED*** {
      return null;
    ***REMOVED***
    let nativeFontFace;
    if (!this.cssFontInfo***REMOVED*** {
      nativeFontFace = new FontFace(this.loadedName, this.data, {***REMOVED******REMOVED***;
    ***REMOVED*** else {
      const css = {
        weight: this.cssFontInfo.fontWeight
      ***REMOVED***;
      if (this.cssFontInfo.italicAngle***REMOVED*** {
        css.style = `oblique ${this.cssFontInfo.italicAngle***REMOVED***deg`;
      ***REMOVED***
      nativeFontFace = new FontFace(this.cssFontInfo.fontFamily, this.data, css***REMOVED***;
    ***REMOVED***
    this._inspectFont?.(this***REMOVED***;
    return nativeFontFace;
  ***REMOVED***
  createFontFaceRule(***REMOVED*** {
    if (!this.data || this.disableFontFace***REMOVED*** {
      return null;
    ***REMOVED***
    const url = `url(data:${this.mimetype***REMOVED***;base64,${toBase64Util(this.data***REMOVED******REMOVED******REMOVED***;`;
    let rule;
    if (!this.cssFontInfo***REMOVED*** {
      rule = `@font-face {font-family:"${this.loadedName***REMOVED***";src:${url***REMOVED******REMOVED***`;
    ***REMOVED*** else {
      let css = `font-weight: ${this.cssFontInfo.fontWeight***REMOVED***;`;
      if (this.cssFontInfo.italicAngle***REMOVED*** {
        css += `font-style: oblique ${this.cssFontInfo.italicAngle***REMOVED***deg;`;
      ***REMOVED***
      rule = `@font-face {font-family:"${this.cssFontInfo.fontFamily***REMOVED***";${css***REMOVED***src:${url***REMOVED******REMOVED***`;
    ***REMOVED***
    this._inspectFont?.(this, url***REMOVED***;
    return rule;
  ***REMOVED***
  getPathGenerator(objs, character***REMOVED*** {
    if (this.compiledGlyphs[character] !== undefined***REMOVED*** {
      return this.compiledGlyphs[character];
    ***REMOVED***
    const objId = this.loadedName + "_path_" + character;
    let cmds;
  ***REMOVED***
      cmds = objs.get(objId***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      warn(`getPathGenerator - ignoring character: "${ex***REMOVED***".`***REMOVED***;
    ***REMOVED***
    const path = new Path2D(cmds || ""***REMOVED***;
    if (!this.fontExtraProperties***REMOVED*** {
      objs.delete(objId***REMOVED***;
    ***REMOVED***
    return this.compiledGlyphs[character] = path;
  ***REMOVED***
***REMOVED***

;// ./src/shared/message_handler.js

const CallbackKind = {
  DATA: 1,
  ERROR: 2
***REMOVED***;
const StreamKind = {
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
***REMOVED***;
function onFn(***REMOVED*** {***REMOVED***
function wrapReason(ex***REMOVED*** {
  if (ex instanceof AbortException || ex instanceof InvalidPDFException || ex instanceof MissingPDFException || ex instanceof PasswordException || ex instanceof UnexpectedResponseException || ex instanceof UnknownErrorException***REMOVED*** {
    return ex;
  ***REMOVED***
  if (!(ex instanceof Error || typeof ex === "object" && ex !== null***REMOVED******REMOVED*** {
    unreachable('wrapReason: Expected "reason" to be a (possibly cloned***REMOVED*** Error.'***REMOVED***;
  ***REMOVED***
  switch (ex.name***REMOVED*** {
    case "AbortException":
      return new AbortException(ex.message***REMOVED***;
    case "InvalidPDFException":
      return new InvalidPDFException(ex.message***REMOVED***;
    case "MissingPDFException":
      return new MissingPDFException(ex.message***REMOVED***;
    case "PasswordException":
      return new PasswordException(ex.message, ex.code***REMOVED***;
    case "UnexpectedResponseException":
      return new UnexpectedResponseException(ex.message, ex.status***REMOVED***;
    case "UnknownErrorException":
      return new UnknownErrorException(ex.message, ex.details***REMOVED***;
  ***REMOVED***
  return new UnknownErrorException(ex.message, ex.toString(***REMOVED******REMOVED***;
***REMOVED***
class MessageHandler {
  #messageAC = new AbortController(***REMOVED***;
  constructor(sourceName, targetName, comObj***REMOVED*** {
    this.sourceName = sourceName;
    this.targetName = targetName;
    this.comObj = comObj;
    this.callbackId = 1;
    this.streamId = 1;
    this.streamSinks = Object.create(null***REMOVED***;
    this.streamControllers = Object.create(null***REMOVED***;
    this.callbackCapabilities = Object.create(null***REMOVED***;
    this.actionHandler = Object.create(null***REMOVED***;
    comObj.addEventListener("message", this.#onMessage.bind(this***REMOVED***, {
      signal: this.#messageAC.signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #onMessage({
    data
  ***REMOVED******REMOVED*** {
    if (data.targetName !== this.sourceName***REMOVED*** {
      return;
    ***REMOVED***
    if (data.stream***REMOVED*** {
      this.#processStreamMessage(data***REMOVED***;
      return;
    ***REMOVED***
    if (data.callback***REMOVED*** {
      const callbackId = data.callbackId;
      const capability = this.callbackCapabilities[callbackId];
      if (!capability***REMOVED*** {
        throw new Error(`Cannot resolve callback ${callbackId***REMOVED***`***REMOVED***;
      ***REMOVED***
      delete this.callbackCapabilities[callbackId];
      if (data.callback === CallbackKind.DATA***REMOVED*** {
        capability.resolve(data.data***REMOVED***;
      ***REMOVED*** else if (data.callback === CallbackKind.ERROR***REMOVED*** {
        capability.reject(wrapReason(data.reason***REMOVED******REMOVED***;
      ***REMOVED*** else {
        throw new Error("Unexpected callback case"***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    const action = this.actionHandler[data.action];
    if (!action***REMOVED*** {
      throw new Error(`Unknown action from worker: ${data.action***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (data.callbackId***REMOVED*** {
      const sourceName = this.sourceName,
        targetName = data.sourceName,
        comObj = this.comObj;
      Promise.try(action, data.data***REMOVED***.then(function (result***REMOVED*** {
        comObj.postMessage({
          sourceName,
          targetName,
          callback: CallbackKind.DATA,
          callbackId: data.callbackId,
          data: result
        ***REMOVED******REMOVED***;
      ***REMOVED***, function (reason***REMOVED*** {
        comObj.postMessage({
          sourceName,
          targetName,
          callback: CallbackKind.ERROR,
          callbackId: data.callbackId,
          reason: wrapReason(reason***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    if (data.streamId***REMOVED*** {
      this.#createStreamSink(data***REMOVED***;
      return;
    ***REMOVED***
    action(data.data***REMOVED***;
  ***REMOVED***
  on(actionName, handler***REMOVED*** {
    const ah = this.actionHandler;
    if (ah[actionName]***REMOVED*** {
      throw new Error(`There is already an actionName called "${actionName***REMOVED***"`***REMOVED***;
    ***REMOVED***
    ah[actionName] = handler;
  ***REMOVED***
  send(actionName, data, transfers***REMOVED*** {
    this.comObj.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: actionName,
      data
    ***REMOVED***, transfers***REMOVED***;
  ***REMOVED***
  sendWithPromise(actionName, data, transfers***REMOVED*** {
    const callbackId = this.callbackId++;
    const capability = Promise.withResolvers(***REMOVED***;
    this.callbackCapabilities[callbackId] = capability;
  ***REMOVED***
      this.comObj.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        callbackId,
        data
      ***REMOVED***, transfers***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      capability.reject(ex***REMOVED***;
    ***REMOVED***
    return capability.promise;
  ***REMOVED***
  sendWithStream(actionName, data, queueingStrategy, transfers***REMOVED*** {
    const streamId = this.streamId++,
      sourceName = this.sourceName,
      targetName = this.targetName,
      comObj = this.comObj;
    return new ReadableStream({
      start: controller => {
        const startCapability = Promise.withResolvers(***REMOVED***;
        this.streamControllers[streamId] = {
          controller,
          startCall: startCapability,
          pullCall: null,
          cancelCall: null,
          isClosed: false
        ***REMOVED***;
        comObj.postMessage({
          sourceName,
          targetName,
          action: actionName,
          streamId,
          data,
          desiredSize: controller.desiredSize
        ***REMOVED***, transfers***REMOVED***;
        return startCapability.promise;
      ***REMOVED***,
      pull: controller => {
        const pullCapability = Promise.withResolvers(***REMOVED***;
        this.streamControllers[streamId].pullCall = pullCapability;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.PULL,
          streamId,
          desiredSize: controller.desiredSize
        ***REMOVED******REMOVED***;
        return pullCapability.promise;
      ***REMOVED***,
      cancel: reason => {
        assert(reason instanceof Error, "cancel must have a valid reason"***REMOVED***;
        const cancelCapability = Promise.withResolvers(***REMOVED***;
        this.streamControllers[streamId].cancelCall = cancelCapability;
        this.streamControllers[streamId].isClosed = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CANCEL,
          streamId,
          reason: wrapReason(reason***REMOVED***
        ***REMOVED******REMOVED***;
        return cancelCapability.promise;
      ***REMOVED***
    ***REMOVED***, queueingStrategy***REMOVED***;
  ***REMOVED***
  #createStreamSink(data***REMOVED*** {
    const streamId = data.streamId,
      sourceName = this.sourceName,
      targetName = data.sourceName,
      comObj = this.comObj;
    const self = this,
      action = this.actionHandler[data.action];
    const streamSink = {
      enqueue(chunk, size = 1, transfers***REMOVED*** {
        if (this.isCancelled***REMOVED*** {
          return;
        ***REMOVED***
        const lastDesiredSize = this.desiredSize;
        this.desiredSize -= size;
        if (lastDesiredSize > 0 && this.desiredSize <= 0***REMOVED*** {
          this.sinkCapability = Promise.withResolvers(***REMOVED***;
          this.ready = this.sinkCapability.promise;
        ***REMOVED***
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.ENQUEUE,
          streamId,
          chunk
        ***REMOVED***, transfers***REMOVED***;
      ***REMOVED***,
      close(***REMOVED*** {
        if (this.isCancelled***REMOVED*** {
          return;
        ***REMOVED***
        this.isCancelled = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.CLOSE,
          streamId
        ***REMOVED******REMOVED***;
        delete self.streamSinks[streamId];
      ***REMOVED***,
      error(reason***REMOVED*** {
        assert(reason instanceof Error, "error must have a valid reason"***REMOVED***;
        if (this.isCancelled***REMOVED*** {
          return;
        ***REMOVED***
        this.isCancelled = true;
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.ERROR,
          streamId,
          reason: wrapReason(reason***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED***,
      sinkCapability: Promise.withResolvers(***REMOVED***,
      onPull: null,
      onCancel: null,
      isCancelled: false,
      desiredSize: data.desiredSize,
      ready: null
    ***REMOVED***;
    streamSink.sinkCapability.resolve(***REMOVED***;
    streamSink.ready = streamSink.sinkCapability.promise;
    this.streamSinks[streamId] = streamSink;
    Promise.try(action, data.data, streamSink***REMOVED***.then(function (***REMOVED*** {
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.START_COMPLETE,
        streamId,
        success: true
      ***REMOVED******REMOVED***;
    ***REMOVED***, function (reason***REMOVED*** {
      comObj.postMessage({
        sourceName,
        targetName,
        stream: StreamKind.START_COMPLETE,
        streamId,
        reason: wrapReason(reason***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #processStreamMessage(data***REMOVED*** {
    const streamId = data.streamId,
      sourceName = this.sourceName,
      targetName = data.sourceName,
      comObj = this.comObj;
    const streamController = this.streamControllers[streamId],
      streamSink = this.streamSinks[streamId];
    switch (data.stream***REMOVED*** {
      case StreamKind.START_COMPLETE:
        if (data.success***REMOVED*** {
          streamController.startCall.resolve(***REMOVED***;
        ***REMOVED*** else {
          streamController.startCall.reject(wrapReason(data.reason***REMOVED******REMOVED***;
        ***REMOVED***
        break;
      case StreamKind.PULL_COMPLETE:
        if (data.success***REMOVED*** {
          streamController.pullCall.resolve(***REMOVED***;
        ***REMOVED*** else {
          streamController.pullCall.reject(wrapReason(data.reason***REMOVED******REMOVED***;
        ***REMOVED***
        break;
      case StreamKind.PULL:
        if (!streamSink***REMOVED*** {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            success: true
          ***REMOVED******REMOVED***;
          break;
        ***REMOVED***
        if (streamSink.desiredSize <= 0 && data.desiredSize > 0***REMOVED*** {
          streamSink.sinkCapability.resolve(***REMOVED***;
        ***REMOVED***
        streamSink.desiredSize = data.desiredSize;
        Promise.try(streamSink.onPull || onFn***REMOVED***.then(function (***REMOVED*** {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            success: true
          ***REMOVED******REMOVED***;
        ***REMOVED***, function (reason***REMOVED*** {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId,
            reason: wrapReason(reason***REMOVED***
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        break;
      case StreamKind.ENQUEUE:
        assert(streamController, "enqueue should have stream controller"***REMOVED***;
        if (streamController.isClosed***REMOVED*** {
          break;
        ***REMOVED***
        streamController.controller.enqueue(data.chunk***REMOVED***;
        break;
      case StreamKind.CLOSE:
        assert(streamController, "close should have stream controller"***REMOVED***;
        if (streamController.isClosed***REMOVED*** {
          break;
        ***REMOVED***
        streamController.isClosed = true;
        streamController.controller.close(***REMOVED***;
        this.#deleteStreamController(streamController, streamId***REMOVED***;
        break;
      case StreamKind.ERROR:
        assert(streamController, "error should have stream controller"***REMOVED***;
        streamController.controller.error(wrapReason(data.reason***REMOVED******REMOVED***;
        this.#deleteStreamController(streamController, streamId***REMOVED***;
        break;
      case StreamKind.CANCEL_COMPLETE:
        if (data.success***REMOVED*** {
          streamController.cancelCall.resolve(***REMOVED***;
        ***REMOVED*** else {
          streamController.cancelCall.reject(wrapReason(data.reason***REMOVED******REMOVED***;
        ***REMOVED***
        this.#deleteStreamController(streamController, streamId***REMOVED***;
        break;
      case StreamKind.CANCEL:
        if (!streamSink***REMOVED*** {
          break;
        ***REMOVED***
        const dataReason = wrapReason(data.reason***REMOVED***;
        Promise.try(streamSink.onCancel || onFn, dataReason***REMOVED***.then(function (***REMOVED*** {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId,
            success: true
          ***REMOVED******REMOVED***;
        ***REMOVED***, function (reason***REMOVED*** {
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId,
            reason: wrapReason(reason***REMOVED***
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        streamSink.sinkCapability.reject(dataReason***REMOVED***;
        streamSink.isCancelled = true;
        delete this.streamSinks[streamId];
        break;
      default:
        throw new Error("Unexpected stream case"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async #deleteStreamController(streamController, streamId***REMOVED*** {
    await Promise.allSettled([streamController.startCall?.promise, streamController.pullCall?.promise, streamController.cancelCall?.promise]***REMOVED***;
    delete this.streamControllers[streamId];
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#messageAC?.abort(***REMOVED***;
    this.#messageAC = null;
  ***REMOVED***
***REMOVED***

;// ./src/display/canvas_factory.js

class BaseCanvasFactory {
  #enableHWA = false;
  constructor({
    enableHWA = false
  ***REMOVED******REMOVED*** {
    this.#enableHWA = enableHWA;
  ***REMOVED***
  create(width, height***REMOVED*** {
    if (width <= 0 || height <= 0***REMOVED*** {
      throw new Error("Invalid canvas size"***REMOVED***;
    ***REMOVED***
    const canvas = this._createCanvas(width, height***REMOVED***;
***REMOVED***
      canvas,
      context: canvas.getContext("2d", {
        willReadFrequently: !this.#enableHWA
      ***REMOVED******REMOVED***
    ***REMOVED***;
  ***REMOVED***
  reset(canvasAndContext, width, height***REMOVED*** {
    if (!canvasAndContext.canvas***REMOVED*** {
      throw new Error("Canvas is not specified"***REMOVED***;
    ***REMOVED***
    if (width <= 0 || height <= 0***REMOVED*** {
      throw new Error("Invalid canvas size"***REMOVED***;
    ***REMOVED***
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  ***REMOVED***
  destroy(canvasAndContext***REMOVED*** {
    if (!canvasAndContext.canvas***REMOVED*** {
      throw new Error("Canvas is not specified"***REMOVED***;
    ***REMOVED***
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  ***REMOVED***
  _createCanvas(width, height***REMOVED*** {
    unreachable("Abstract method `_createCanvas` called."***REMOVED***;
  ***REMOVED***
***REMOVED***
class DOMCanvasFactory extends BaseCanvasFactory {
  constructor({
    ownerDocument = globalThis.document,
    enableHWA = false
  ***REMOVED******REMOVED*** {
    super({
      enableHWA
    ***REMOVED******REMOVED***;
    this._document = ownerDocument;
  ***REMOVED***
  _createCanvas(width, height***REMOVED*** {
    const canvas = this._document.createElement("canvas"***REMOVED***;
    canvas.width = width;
    canvas.height = height;
    return canvas;
  ***REMOVED***
***REMOVED***

;// ./src/display/cmap_reader_factory.js


class BaseCMapReaderFactory {
  constructor({
    baseUrl = null,
    isCompressed = true
  ***REMOVED******REMOVED*** {
    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  ***REMOVED***
  async fetch({
    name
  ***REMOVED******REMOVED*** {
    if (!this.baseUrl***REMOVED*** {
      throw new Error("Ensure that the `cMapUrl` and `cMapPacked` API parameters are provided."***REMOVED***;
    ***REMOVED***
    if (!name***REMOVED*** {
      throw new Error("CMap name must be specified."***REMOVED***;
    ***REMOVED***
    const url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : ""***REMOVED***;
    return this._fetch(url***REMOVED***.then(cMapData => ({
      cMapData,
      isCompressed: this.isCompressed
    ***REMOVED******REMOVED******REMOVED***.catch(reason => {
      throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""***REMOVED***CMap at: ${url***REMOVED***`***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async _fetch(url***REMOVED*** {
    unreachable("Abstract method `_fetch` called."***REMOVED***;
  ***REMOVED***
***REMOVED***
class DOMCMapReaderFactory extends BaseCMapReaderFactory {
  async _fetch(url***REMOVED*** {
    const data = await fetchData(url, this.isCompressed ? "arraybuffer" : "text"***REMOVED***;
    return data instanceof ArrayBuffer ? new Uint8Array(data***REMOVED*** : stringToBytes(data***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/filter_factory.js


class BaseFilterFactory {
  addFilter(maps***REMOVED*** {
    return "none";
  ***REMOVED***
  addHCMFilter(fgColor, bgColor***REMOVED*** {
    return "none";
  ***REMOVED***
  addAlphaFilter(map***REMOVED*** {
    return "none";
  ***REMOVED***
  addLuminosityFilter(map***REMOVED*** {
    return "none";
  ***REMOVED***
  addHighlightHCMFilter(filterName, fgColor, bgColor, newFgColor, newBgColor***REMOVED*** {
    return "none";
  ***REMOVED***
  destroy(keepHCM = false***REMOVED*** {***REMOVED***
***REMOVED***
class DOMFilterFactory extends BaseFilterFactory {
  #baseUrl;
  #_cache;
  #_defs;
  #docId;
  #document;
  #_hcmCache;
  #id = 0;
  constructor({
    docId,
    ownerDocument = globalThis.document
  ***REMOVED******REMOVED*** {
    super(***REMOVED***;
    this.#docId = docId;
    this.#document = ownerDocument;
  ***REMOVED***
  get #cache(***REMOVED*** {
    return this.#_cache ||= new Map(***REMOVED***;
  ***REMOVED***
  get #hcmCache(***REMOVED*** {
    return this.#_hcmCache ||= new Map(***REMOVED***;
  ***REMOVED***
  get #defs(***REMOVED*** {
    if (!this.#_defs***REMOVED*** {
      const div = this.#document.createElement("div"***REMOVED***;
      const {
        style
      ***REMOVED*** = div;
      style.visibility = "hidden";
      style.contain = "strict";
      style.width = style.height = 0;
      style.position = "absolute";
      style.top = style.left = 0;
      style.zIndex = -1;
      const svg = this.#document.createElementNS(SVG_NS, "svg"***REMOVED***;
      svg.setAttribute("width", 0***REMOVED***;
      svg.setAttribute("height", 0***REMOVED***;
      this.#_defs = this.#document.createElementNS(SVG_NS, "defs"***REMOVED***;
      div.append(svg***REMOVED***;
      svg.append(this.#_defs***REMOVED***;
      this.#document.body.append(div***REMOVED***;
    ***REMOVED***
    return this.#_defs;
  ***REMOVED***
  #createTables(maps***REMOVED*** {
    if (maps.length === 1***REMOVED*** {
      const mapR = maps[0];
      const buffer = new Array(256***REMOVED***;
      for (let i = 0; i < 256; i++***REMOVED*** {
        buffer[i] = mapR[i] / 255;
      ***REMOVED***
      const table = buffer.join(","***REMOVED***;
      return [table, table, table];
    ***REMOVED***
    const [mapR, mapG, mapB] = maps;
    const bufferR = new Array(256***REMOVED***;
    const bufferG = new Array(256***REMOVED***;
    const bufferB = new Array(256***REMOVED***;
    for (let i = 0; i < 256; i++***REMOVED*** {
      bufferR[i] = mapR[i] / 255;
      bufferG[i] = mapG[i] / 255;
      bufferB[i] = mapB[i] / 255;
    ***REMOVED***
    return [bufferR.join(","***REMOVED***, bufferG.join(","***REMOVED***, bufferB.join(","***REMOVED***];
  ***REMOVED***
  #createUrl(id***REMOVED*** {
    if (this.#baseUrl === undefined***REMOVED*** {
      this.#baseUrl = "";
      const url = this.#document.URL;
      if (url !== this.#document.baseURI***REMOVED*** {
        if (isDataScheme(url***REMOVED******REMOVED*** {
          warn('#createUrl: ignore "data:"-URL for performance reasons.'***REMOVED***;
        ***REMOVED*** else {
          this.#baseUrl = url.split("#", 1***REMOVED***[0];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return `url(${this.#baseUrl***REMOVED***#${id***REMOVED******REMOVED***`;
  ***REMOVED***
  addFilter(maps***REMOVED*** {
    if (!maps***REMOVED*** {
      return "none";
    ***REMOVED***
    let value = this.#cache.get(maps***REMOVED***;
    if (value***REMOVED*** {
      return value;
    ***REMOVED***
    const [tableR, tableG, tableB] = this.#createTables(maps***REMOVED***;
    const key = maps.length === 1 ? tableR : `${tableR***REMOVED***${tableG***REMOVED***${tableB***REMOVED***`;
    value = this.#cache.get(key***REMOVED***;
    if (value***REMOVED*** {
      this.#cache.set(maps, value***REMOVED***;
      return value;
    ***REMOVED***
    const id = `g_${this.#docId***REMOVED***_transfer_map_${this.#id++***REMOVED***`;
    const url = this.#createUrl(id***REMOVED***;
    this.#cache.set(maps, url***REMOVED***;
    this.#cache.set(key, url***REMOVED***;
    const filter = this.#createFilter(id***REMOVED***;
    this.#addTransferMapConversion(tableR, tableG, tableB, filter***REMOVED***;
    return url;
  ***REMOVED***
  addHCMFilter(fgColor, bgColor***REMOVED*** {
    const key = `${fgColor***REMOVED***-${bgColor***REMOVED***`;
    const filterName = "base";
    let info = this.#hcmCache.get(filterName***REMOVED***;
    if (info?.key === key***REMOVED*** {
      return info.url;
    ***REMOVED***
    if (info***REMOVED*** {
      info.filter?.remove(***REMOVED***;
      info.key = key;
      info.url = "none";
      info.filter = null;
    ***REMOVED*** else {
      info = {
        key,
        url: "none",
        filter: null
      ***REMOVED***;
      this.#hcmCache.set(filterName, info***REMOVED***;
    ***REMOVED***
    if (!fgColor || !bgColor***REMOVED*** {
      return info.url;
    ***REMOVED***
    const fgRGB = this.#getRGB(fgColor***REMOVED***;
    fgColor = Util.makeHexColor(...fgRGB***REMOVED***;
    const bgRGB = this.#getRGB(bgColor***REMOVED***;
    bgColor = Util.makeHexColor(...bgRGB***REMOVED***;
    this.#defs.style.color = "";
    if (fgColor === "#000000" && bgColor === "#ffffff" || fgColor === bgColor***REMOVED*** {
      return info.url;
    ***REMOVED***
    const map = new Array(256***REMOVED***;
    for (let i = 0; i <= 255; i++***REMOVED*** {
      const x = i / 255;
      map[i] = x <= 0.03928 ? x / 12.92 : ((x + 0.055***REMOVED*** / 1.055***REMOVED*** ** 2.4;
    ***REMOVED***
    const table = map.join(","***REMOVED***;
    const id = `g_${this.#docId***REMOVED***_hcm_filter`;
    const filter = info.filter = this.#createFilter(id***REMOVED***;
    this.#addTransferMapConversion(table, table, table, filter***REMOVED***;
    this.#addGrayConversion(filter***REMOVED***;
    const getSteps = (c, n***REMOVED*** => {
      const start = fgRGB[c] / 255;
      const end = bgRGB[c] / 255;
      const arr = new Array(n + 1***REMOVED***;
      for (let i = 0; i <= n; i++***REMOVED*** {
        arr[i] = start + i / n * (end - start***REMOVED***;
      ***REMOVED***
      return arr.join(","***REMOVED***;
    ***REMOVED***;
    this.#addTransferMapConversion(getSteps(0, 5***REMOVED***, getSteps(1, 5***REMOVED***, getSteps(2, 5***REMOVED***, filter***REMOVED***;
    info.url = this.#createUrl(id***REMOVED***;
    return info.url;
  ***REMOVED***
  addAlphaFilter(map***REMOVED*** {
    let value = this.#cache.get(map***REMOVED***;
    if (value***REMOVED*** {
      return value;
    ***REMOVED***
    const [tableA] = this.#createTables([map]***REMOVED***;
    const key = `alpha_${tableA***REMOVED***`;
    value = this.#cache.get(key***REMOVED***;
    if (value***REMOVED*** {
      this.#cache.set(map, value***REMOVED***;
      return value;
    ***REMOVED***
    const id = `g_${this.#docId***REMOVED***_alpha_map_${this.#id++***REMOVED***`;
    const url = this.#createUrl(id***REMOVED***;
    this.#cache.set(map, url***REMOVED***;
    this.#cache.set(key, url***REMOVED***;
    const filter = this.#createFilter(id***REMOVED***;
    this.#addTransferMapAlphaConversion(tableA, filter***REMOVED***;
    return url;
  ***REMOVED***
  addLuminosityFilter(map***REMOVED*** {
    let value = this.#cache.get(map || "luminosity"***REMOVED***;
    if (value***REMOVED*** {
      return value;
    ***REMOVED***
    let tableA, key;
    if (map***REMOVED*** {
      [tableA] = this.#createTables([map]***REMOVED***;
      key = `luminosity_${tableA***REMOVED***`;
    ***REMOVED*** else {
      key = "luminosity";
    ***REMOVED***
    value = this.#cache.get(key***REMOVED***;
    if (value***REMOVED*** {
      this.#cache.set(map, value***REMOVED***;
      return value;
    ***REMOVED***
    const id = `g_${this.#docId***REMOVED***_luminosity_map_${this.#id++***REMOVED***`;
    const url = this.#createUrl(id***REMOVED***;
    this.#cache.set(map, url***REMOVED***;
    this.#cache.set(key, url***REMOVED***;
    const filter = this.#createFilter(id***REMOVED***;
    this.#addLuminosityConversion(filter***REMOVED***;
    if (map***REMOVED*** {
      this.#addTransferMapAlphaConversion(tableA, filter***REMOVED***;
    ***REMOVED***
    return url;
  ***REMOVED***
  addHighlightHCMFilter(filterName, fgColor, bgColor, newFgColor, newBgColor***REMOVED*** {
    const key = `${fgColor***REMOVED***-${bgColor***REMOVED***-${newFgColor***REMOVED***-${newBgColor***REMOVED***`;
    let info = this.#hcmCache.get(filterName***REMOVED***;
    if (info?.key === key***REMOVED*** {
      return info.url;
    ***REMOVED***
    if (info***REMOVED*** {
      info.filter?.remove(***REMOVED***;
      info.key = key;
      info.url = "none";
      info.filter = null;
    ***REMOVED*** else {
      info = {
        key,
        url: "none",
        filter: null
      ***REMOVED***;
      this.#hcmCache.set(filterName, info***REMOVED***;
    ***REMOVED***
    if (!fgColor || !bgColor***REMOVED*** {
      return info.url;
    ***REMOVED***
    const [fgRGB, bgRGB] = [fgColor, bgColor].map(this.#getRGB.bind(this***REMOVED******REMOVED***;
    let fgGray = Math.round(0.2126 * fgRGB[0] + 0.7152 * fgRGB[1] + 0.0722 * fgRGB[2]***REMOVED***;
    let bgGray = Math.round(0.2126 * bgRGB[0] + 0.7152 * bgRGB[1] + 0.0722 * bgRGB[2]***REMOVED***;
    let [newFgRGB, newBgRGB] = [newFgColor, newBgColor].map(this.#getRGB.bind(this***REMOVED******REMOVED***;
    if (bgGray < fgGray***REMOVED*** {
      [fgGray, bgGray, newFgRGB, newBgRGB] = [bgGray, fgGray, newBgRGB, newFgRGB];
    ***REMOVED***
    this.#defs.style.color = "";
    const getSteps = (fg, bg, n***REMOVED*** => {
      const arr = new Array(256***REMOVED***;
      const step = (bgGray - fgGray***REMOVED*** / n;
      const newStart = fg / 255;
      const newStep = (bg - fg***REMOVED*** / (255 * n***REMOVED***;
      let prev = 0;
      for (let i = 0; i <= n; i++***REMOVED*** {
        const k = Math.round(fgGray + i * step***REMOVED***;
        const value = newStart + i * newStep;
        for (let j = prev; j <= k; j++***REMOVED*** {
          arr[j] = value;
        ***REMOVED***
        prev = k + 1;
      ***REMOVED***
      for (let i = prev; i < 256; i++***REMOVED*** {
        arr[i] = arr[prev - 1];
      ***REMOVED***
      return arr.join(","***REMOVED***;
    ***REMOVED***;
    const id = `g_${this.#docId***REMOVED***_hcm_${filterName***REMOVED***_filter`;
    const filter = info.filter = this.#createFilter(id***REMOVED***;
    this.#addGrayConversion(filter***REMOVED***;
    this.#addTransferMapConversion(getSteps(newFgRGB[0], newBgRGB[0], 5***REMOVED***, getSteps(newFgRGB[1], newBgRGB[1], 5***REMOVED***, getSteps(newFgRGB[2], newBgRGB[2], 5***REMOVED***, filter***REMOVED***;
    info.url = this.#createUrl(id***REMOVED***;
    return info.url;
  ***REMOVED***
  destroy(keepHCM = false***REMOVED*** {
    if (keepHCM && this.#_hcmCache?.size***REMOVED*** {
      return;
    ***REMOVED***
    this.#_defs?.parentNode.parentNode.remove(***REMOVED***;
    this.#_defs = null;
    this.#_cache?.clear(***REMOVED***;
    this.#_cache = null;
    this.#_hcmCache?.clear(***REMOVED***;
    this.#_hcmCache = null;
    this.#id = 0;
  ***REMOVED***
  #addLuminosityConversion(filter***REMOVED*** {
    const feColorMatrix = this.#document.createElementNS(SVG_NS, "feColorMatrix"***REMOVED***;
    feColorMatrix.setAttribute("type", "matrix"***REMOVED***;
    feColorMatrix.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0.59 0.11 0 0"***REMOVED***;
    filter.append(feColorMatrix***REMOVED***;
  ***REMOVED***
  #addGrayConversion(filter***REMOVED*** {
    const feColorMatrix = this.#document.createElementNS(SVG_NS, "feColorMatrix"***REMOVED***;
    feColorMatrix.setAttribute("type", "matrix"***REMOVED***;
    feColorMatrix.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"***REMOVED***;
    filter.append(feColorMatrix***REMOVED***;
  ***REMOVED***
  #createFilter(id***REMOVED*** {
    const filter = this.#document.createElementNS(SVG_NS, "filter"***REMOVED***;
    filter.setAttribute("color-interpolation-filters", "sRGB"***REMOVED***;
    filter.setAttribute("id", id***REMOVED***;
    this.#defs.append(filter***REMOVED***;
    return filter;
  ***REMOVED***
  #appendFeFunc(feComponentTransfer, func, table***REMOVED*** {
    const feFunc = this.#document.createElementNS(SVG_NS, func***REMOVED***;
    feFunc.setAttribute("type", "discrete"***REMOVED***;
    feFunc.setAttribute("tableValues", table***REMOVED***;
    feComponentTransfer.append(feFunc***REMOVED***;
  ***REMOVED***
  #addTransferMapConversion(rTable, gTable, bTable, filter***REMOVED*** {
    const feComponentTransfer = this.#document.createElementNS(SVG_NS, "feComponentTransfer"***REMOVED***;
    filter.append(feComponentTransfer***REMOVED***;
    this.#appendFeFunc(feComponentTransfer, "feFuncR", rTable***REMOVED***;
    this.#appendFeFunc(feComponentTransfer, "feFuncG", gTable***REMOVED***;
    this.#appendFeFunc(feComponentTransfer, "feFuncB", bTable***REMOVED***;
  ***REMOVED***
  #addTransferMapAlphaConversion(aTable, filter***REMOVED*** {
    const feComponentTransfer = this.#document.createElementNS(SVG_NS, "feComponentTransfer"***REMOVED***;
    filter.append(feComponentTransfer***REMOVED***;
    this.#appendFeFunc(feComponentTransfer, "feFuncA", aTable***REMOVED***;
  ***REMOVED***
  #getRGB(color***REMOVED*** {
    this.#defs.style.color = color;
    return getRGB(getComputedStyle(this.#defs***REMOVED***.getPropertyValue("color"***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/standard_fontdata_factory.js


class BaseStandardFontDataFactory {
  constructor({
    baseUrl = null
  ***REMOVED******REMOVED*** {
    this.baseUrl = baseUrl;
  ***REMOVED***
  async fetch({
    filename
  ***REMOVED******REMOVED*** {
    if (!this.baseUrl***REMOVED*** {
      throw new Error("Ensure that the `standardFontDataUrl` API parameter is provided."***REMOVED***;
    ***REMOVED***
    if (!filename***REMOVED*** {
      throw new Error("Font filename must be specified."***REMOVED***;
    ***REMOVED***
    const url = `${this.baseUrl***REMOVED***${filename***REMOVED***`;
    return this._fetch(url***REMOVED***.catch(reason => {
      throw new Error(`Unable to load font data at: ${url***REMOVED***`***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  async _fetch(url***REMOVED*** {
    unreachable("Abstract method `_fetch` called."***REMOVED***;
  ***REMOVED***
***REMOVED***
class DOMStandardFontDataFactory extends BaseStandardFontDataFactory {
  async _fetch(url***REMOVED*** {
    const data = await fetchData(url, "arraybuffer"***REMOVED***;
    return new Uint8Array(data***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/node_utils.js





if (isNodeJS***REMOVED*** {
  warn("Please use the `legacy` build in Node.js environments."***REMOVED***;
***REMOVED***
async function node_utils_fetchData(url***REMOVED*** {
  const fs = process.getBuiltinModule("fs"***REMOVED***;
  const data = await fs.promises.readFile(url***REMOVED***;
  return new Uint8Array(data***REMOVED***;
***REMOVED***
class NodeFilterFactory extends BaseFilterFactory {***REMOVED***
class NodeCanvasFactory extends BaseCanvasFactory {
  _createCanvas(width, height***REMOVED*** {
    const require = process.getBuiltinModule("module"***REMOVED***.createRequire(import.meta.url***REMOVED***;
    const canvas = require("@napi-rs/canvas"***REMOVED***;
    return canvas.createCanvas(width, height***REMOVED***;
  ***REMOVED***
***REMOVED***
class NodeCMapReaderFactory extends BaseCMapReaderFactory {
  async _fetch(url***REMOVED*** {
    return node_utils_fetchData(url***REMOVED***;
  ***REMOVED***
***REMOVED***
class NodeStandardFontDataFactory extends BaseStandardFontDataFactory {
  async _fetch(url***REMOVED*** {
    return node_utils_fetchData(url***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/pattern_helper.js


const PathType = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
***REMOVED***;
function applyBoundingBox(ctx, bbox***REMOVED*** {
  if (!bbox***REMOVED*** {
    return;
  ***REMOVED***
  const width = bbox[2] - bbox[0];
  const height = bbox[3] - bbox[1];
  const region = new Path2D(***REMOVED***;
  region.rect(bbox[0], bbox[1], width, height***REMOVED***;
  ctx.clip(region***REMOVED***;
***REMOVED***
class BaseShadingPattern {
  getPattern(***REMOVED*** {
    unreachable("Abstract method `getPattern` called."***REMOVED***;
  ***REMOVED***
***REMOVED***
class RadialAxialShadingPattern extends BaseShadingPattern {
  constructor(IR***REMOVED*** {
    super(***REMOVED***;
    this._type = IR[1];
    this._bbox = IR[2];
    this._colorStops = IR[3];
    this._p0 = IR[4];
    this._p1 = IR[5];
    this._r0 = IR[6];
    this._r1 = IR[7];
    this.matrix = null;
  ***REMOVED***
  _createGradient(ctx***REMOVED*** {
    let grad;
    if (this._type === "axial"***REMOVED*** {
      grad = ctx.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]***REMOVED***;
    ***REMOVED*** else if (this._type === "radial"***REMOVED*** {
      grad = ctx.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1***REMOVED***;
    ***REMOVED***
    for (const colorStop of this._colorStops***REMOVED*** {
      grad.addColorStop(colorStop[0], colorStop[1]***REMOVED***;
    ***REMOVED***
    return grad;
  ***REMOVED***
  getPattern(ctx, owner, inverse, pathType***REMOVED*** {
    let pattern;
    if (pathType === PathType.STROKE || pathType === PathType.FILL***REMOVED*** {
      const ownerBBox = owner.current.getClippedPathBoundingBox(pathType, getCurrentTransform(ctx***REMOVED******REMOVED*** || [0, 0, 0, 0];
      const width = Math.ceil(ownerBBox[2] - ownerBBox[0]***REMOVED*** || 1;
      const height = Math.ceil(ownerBBox[3] - ownerBBox[1]***REMOVED*** || 1;
      const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", width, height***REMOVED***;
      const tmpCtx = tmpCanvas.context;
      tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height***REMOVED***;
      tmpCtx.beginPath(***REMOVED***;
      tmpCtx.rect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height***REMOVED***;
      tmpCtx.translate(-ownerBBox[0], -ownerBBox[1]***REMOVED***;
      inverse = Util.transform(inverse, [1, 0, 0, 1, ownerBBox[0], ownerBBox[1]]***REMOVED***;
      tmpCtx.transform(...owner.baseTransform***REMOVED***;
      if (this.matrix***REMOVED*** {
        tmpCtx.transform(...this.matrix***REMOVED***;
      ***REMOVED***
      applyBoundingBox(tmpCtx, this._bbox***REMOVED***;
      tmpCtx.fillStyle = this._createGradient(tmpCtx***REMOVED***;
      tmpCtx.fill(***REMOVED***;
      pattern = ctx.createPattern(tmpCanvas.canvas, "no-repeat"***REMOVED***;
      const domMatrix = new DOMMatrix(inverse***REMOVED***;
      pattern.setTransform(domMatrix***REMOVED***;
    ***REMOVED*** else {
      applyBoundingBox(ctx, this._bbox***REMOVED***;
      pattern = this._createGradient(ctx***REMOVED***;
    ***REMOVED***
    return pattern;
  ***REMOVED***
***REMOVED***
function drawTriangle(data, context, p1, p2, p3, c1, c2, c3***REMOVED*** {
  const coords = context.coords,
    colors = context.colors;
  const bytes = data.data,
    rowSize = data.width * 4;
  let tmp;
  if (coords[p1 + 1] > coords[p2 + 1]***REMOVED*** {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  ***REMOVED***
  if (coords[p2 + 1] > coords[p3 + 1]***REMOVED*** {
    tmp = p2;
    p2 = p3;
    p3 = tmp;
    tmp = c2;
    c2 = c3;
    c3 = tmp;
  ***REMOVED***
  if (coords[p1 + 1] > coords[p2 + 1]***REMOVED*** {
    tmp = p1;
    p1 = p2;
    p2 = tmp;
    tmp = c1;
    c1 = c2;
    c2 = tmp;
  ***REMOVED***
  const x1 = (coords[p1] + context.offsetX***REMOVED*** * context.scaleX;
  const y1 = (coords[p1 + 1] + context.offsetY***REMOVED*** * context.scaleY;
  const x2 = (coords[p2] + context.offsetX***REMOVED*** * context.scaleX;
  const y2 = (coords[p2 + 1] + context.offsetY***REMOVED*** * context.scaleY;
  const x3 = (coords[p3] + context.offsetX***REMOVED*** * context.scaleX;
  const y3 = (coords[p3 + 1] + context.offsetY***REMOVED*** * context.scaleY;
  if (y1 >= y3***REMOVED*** {
    return;
  ***REMOVED***
  const c1r = colors[c1],
    c1g = colors[c1 + 1],
    c1b = colors[c1 + 2];
  const c2r = colors[c2],
    c2g = colors[c2 + 1],
    c2b = colors[c2 + 2];
  const c3r = colors[c3],
    c3g = colors[c3 + 1],
    c3b = colors[c3 + 2];
  const minY = Math.round(y1***REMOVED***,
    maxY = Math.round(y3***REMOVED***;
  let xa, car, cag, cab;
  let xb, cbr, cbg, cbb;
  for (let y = minY; y <= maxY; y++***REMOVED*** {
    if (y < y2***REMOVED*** {
      const k = y < y1 ? 0 : (y1 - y***REMOVED*** / (y1 - y2***REMOVED***;
      xa = x1 - (x1 - x2***REMOVED*** * k;
      car = c1r - (c1r - c2r***REMOVED*** * k;
      cag = c1g - (c1g - c2g***REMOVED*** * k;
      cab = c1b - (c1b - c2b***REMOVED*** * k;
    ***REMOVED*** else {
      let k;
      if (y > y3***REMOVED*** {
        k = 1;
      ***REMOVED*** else if (y2 === y3***REMOVED*** {
        k = 0;
      ***REMOVED*** else {
        k = (y2 - y***REMOVED*** / (y2 - y3***REMOVED***;
      ***REMOVED***
      xa = x2 - (x2 - x3***REMOVED*** * k;
      car = c2r - (c2r - c3r***REMOVED*** * k;
      cag = c2g - (c2g - c3g***REMOVED*** * k;
      cab = c2b - (c2b - c3b***REMOVED*** * k;
    ***REMOVED***
    let k;
    if (y < y1***REMOVED*** {
      k = 0;
    ***REMOVED*** else if (y > y3***REMOVED*** {
      k = 1;
    ***REMOVED*** else {
      k = (y1 - y***REMOVED*** / (y1 - y3***REMOVED***;
    ***REMOVED***
    xb = x1 - (x1 - x3***REMOVED*** * k;
    cbr = c1r - (c1r - c3r***REMOVED*** * k;
    cbg = c1g - (c1g - c3g***REMOVED*** * k;
    cbb = c1b - (c1b - c3b***REMOVED*** * k;
    const x1_ = Math.round(Math.min(xa, xb***REMOVED******REMOVED***;
    const x2_ = Math.round(Math.max(xa, xb***REMOVED******REMOVED***;
    let j = rowSize * y + x1_ * 4;
    for (let x = x1_; x <= x2_; x++***REMOVED*** {
      k = (xa - x***REMOVED*** / (xa - xb***REMOVED***;
      if (k < 0***REMOVED*** {
        k = 0;
      ***REMOVED*** else if (k > 1***REMOVED*** {
        k = 1;
      ***REMOVED***
      bytes[j++] = car - (car - cbr***REMOVED*** * k | 0;
      bytes[j++] = cag - (cag - cbg***REMOVED*** * k | 0;
      bytes[j++] = cab - (cab - cbb***REMOVED*** * k | 0;
      bytes[j++] = 255;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function drawFigure(data, figure, context***REMOVED*** {
  const ps = figure.coords;
  const cs = figure.colors;
  let i, ii;
  switch (figure.type***REMOVED*** {
    case "lattice":
      const verticesPerRow = figure.verticesPerRow;
      const rows = Math.floor(ps.length / verticesPerRow***REMOVED*** - 1;
      const cols = verticesPerRow - 1;
      for (i = 0; i < rows; i++***REMOVED*** {
        let q = i * verticesPerRow;
        for (let j = 0; j < cols; j++, q++***REMOVED*** {
          drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]***REMOVED***;
          drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      break;
    case "triangles":
      for (i = 0, ii = ps.length; i < ii; i += 3***REMOVED*** {
        drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]***REMOVED***;
      ***REMOVED***
      break;
    default:
      throw new Error("illegal figure"***REMOVED***;
  ***REMOVED***
***REMOVED***
class MeshShadingPattern extends BaseShadingPattern {
  constructor(IR***REMOVED*** {
    super(***REMOVED***;
    this._coords = IR[2];
    this._colors = IR[3];
    this._figures = IR[4];
    this._bounds = IR[5];
    this._bbox = IR[7];
    this._background = IR[8];
    this.matrix = null;
  ***REMOVED***
  _createMeshCanvas(combinedScale, backgroundColor, cachedCanvases***REMOVED*** {
    const EXPECTED_SCALE = 1.1;
    const MAX_PATTERN_SIZE = 3000;
    const BORDER_SIZE = 2;
    const offsetX = Math.floor(this._bounds[0]***REMOVED***;
    const offsetY = Math.floor(this._bounds[1]***REMOVED***;
    const boundsWidth = Math.ceil(this._bounds[2]***REMOVED*** - offsetX;
    const boundsHeight = Math.ceil(this._bounds[3]***REMOVED*** - offsetY;
    const width = Math.min(Math.ceil(Math.abs(boundsWidth * combinedScale[0] * EXPECTED_SCALE***REMOVED******REMOVED***, MAX_PATTERN_SIZE***REMOVED***;
    const height = Math.min(Math.ceil(Math.abs(boundsHeight * combinedScale[1] * EXPECTED_SCALE***REMOVED******REMOVED***, MAX_PATTERN_SIZE***REMOVED***;
    const scaleX = boundsWidth / width;
    const scaleY = boundsHeight / height;
    const context = {
      coords: this._coords,
      colors: this._colors,
      offsetX: -offsetX,
      offsetY: -offsetY,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    ***REMOVED***;
    const paddedWidth = width + BORDER_SIZE * 2;
    const paddedHeight = height + BORDER_SIZE * 2;
    const tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight***REMOVED***;
    const tmpCtx = tmpCanvas.context;
    const data = tmpCtx.createImageData(width, height***REMOVED***;
    if (backgroundColor***REMOVED*** {
      const bytes = data.data;
      for (let i = 0, ii = bytes.length; i < ii; i += 4***REMOVED*** {
        bytes[i] = backgroundColor[0];
        bytes[i + 1] = backgroundColor[1];
        bytes[i + 2] = backgroundColor[2];
        bytes[i + 3] = 255;
      ***REMOVED***
    ***REMOVED***
    for (const figure of this._figures***REMOVED*** {
      drawFigure(data, figure, context***REMOVED***;
    ***REMOVED***
    tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE***REMOVED***;
    const canvas = tmpCanvas.canvas;
***REMOVED***
      canvas,
      offsetX: offsetX - BORDER_SIZE * scaleX,
      offsetY: offsetY - BORDER_SIZE * scaleY,
      scaleX,
      scaleY
    ***REMOVED***;
  ***REMOVED***
  getPattern(ctx, owner, inverse, pathType***REMOVED*** {
    applyBoundingBox(ctx, this._bbox***REMOVED***;
    let scale;
    if (pathType === PathType.SHADING***REMOVED*** {
      scale = Util.singularValueDecompose2dScale(getCurrentTransform(ctx***REMOVED******REMOVED***;
    ***REMOVED*** else {
      scale = Util.singularValueDecompose2dScale(owner.baseTransform***REMOVED***;
      if (this.matrix***REMOVED*** {
        const matrixScale = Util.singularValueDecompose2dScale(this.matrix***REMOVED***;
        scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
      ***REMOVED***
    ***REMOVED***
    const temporaryPatternCanvas = this._createMeshCanvas(scale, pathType === PathType.SHADING ? null : this._background, owner.cachedCanvases***REMOVED***;
    if (pathType !== PathType.SHADING***REMOVED*** {
      ctx.setTransform(...owner.baseTransform***REMOVED***;
      if (this.matrix***REMOVED*** {
        ctx.transform(...this.matrix***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY***REMOVED***;
    ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY***REMOVED***;
    return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat"***REMOVED***;
  ***REMOVED***
***REMOVED***
class DummyShadingPattern extends BaseShadingPattern {
  getPattern(***REMOVED*** {
    return "hotpink";
  ***REMOVED***
***REMOVED***
function getShadingPattern(IR***REMOVED*** {
  switch (IR[0]***REMOVED*** {
    case "RadialAxial":
      return new RadialAxialShadingPattern(IR***REMOVED***;
    case "Mesh":
      return new MeshShadingPattern(IR***REMOVED***;
    case "Dummy":
      return new DummyShadingPattern(***REMOVED***;
  ***REMOVED***
  throw new Error(`Unknown IR type: ${IR[0]***REMOVED***`***REMOVED***;
***REMOVED***
const PaintType = {
  COLORED: 1,
  UNCOLORED: 2
***REMOVED***;
class TilingPattern {
  static MAX_PATTERN_SIZE = 3000;
  constructor(IR, color, ctx, canvasGraphicsFactory, baseTransform***REMOVED*** {
    this.operatorList = IR[2];
    this.matrix = IR[3];
    this.bbox = IR[4];
    this.xstep = IR[5];
    this.ystep = IR[6];
    this.paintType = IR[7];
    this.tilingType = IR[8];
    this.color = color;
    this.ctx = ctx;
    this.canvasGraphicsFactory = canvasGraphicsFactory;
    this.baseTransform = baseTransform;
  ***REMOVED***
  createPatternCanvas(owner***REMOVED*** {
    const {
      bbox,
      operatorList,
      paintType,
      tilingType,
      color,
      canvasGraphicsFactory
    ***REMOVED*** = this;
    let {
      xstep,
      ystep
    ***REMOVED*** = this;
    xstep = Math.abs(xstep***REMOVED***;
    ystep = Math.abs(ystep***REMOVED***;
    info("TilingType: " + tilingType***REMOVED***;
    const x0 = bbox[0],
      y0 = bbox[1],
      x1 = bbox[2],
      y1 = bbox[3];
    const width = x1 - x0;
    const height = y1 - y0;
    const matrixScale = Util.singularValueDecompose2dScale(this.matrix***REMOVED***;
    const curMatrixScale = Util.singularValueDecompose2dScale(this.baseTransform***REMOVED***;
    const combinedScaleX = matrixScale[0] * curMatrixScale[0];
    const combinedScaleY = matrixScale[1] * curMatrixScale[1];
    let canvasWidth = width,
      canvasHeight = height,
      redrawHorizontally = false,
      redrawVertically = false;
    const xScaledStep = Math.ceil(xstep * combinedScaleX***REMOVED***;
    const yScaledStep = Math.ceil(ystep * combinedScaleY***REMOVED***;
    const xScaledWidth = Math.ceil(width * combinedScaleX***REMOVED***;
    const yScaledHeight = Math.ceil(height * combinedScaleY***REMOVED***;
    if (xScaledStep >= xScaledWidth***REMOVED*** {
      canvasWidth = xstep;
    ***REMOVED*** else {
      redrawHorizontally = true;
    ***REMOVED***
    if (yScaledStep >= yScaledHeight***REMOVED*** {
      canvasHeight = ystep;
    ***REMOVED*** else {
      redrawVertically = true;
    ***REMOVED***
    const dimx = this.getSizeAndScale(canvasWidth, this.ctx.canvas.width, combinedScaleX***REMOVED***;
    const dimy = this.getSizeAndScale(canvasHeight, this.ctx.canvas.height, combinedScaleY***REMOVED***;
    const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size***REMOVED***;
    const tmpCtx = tmpCanvas.context;
    const graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx***REMOVED***;
    graphics.groupLevel = owner.groupLevel;
    this.setFillAndStrokeStyleToContext(graphics, paintType, color***REMOVED***;
    tmpCtx.translate(-dimx.scale * x0, -dimy.scale * y0***REMOVED***;
    graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0***REMOVED***;
    tmpCtx.save(***REMOVED***;
    this.clipBbox(graphics, x0, y0, x1, y1***REMOVED***;
    graphics.baseTransform = getCurrentTransform(graphics.ctx***REMOVED***;
    graphics.executeOperatorList(operatorList***REMOVED***;
    graphics.endDrawing(***REMOVED***;
    tmpCtx.restore(***REMOVED***;
    if (redrawHorizontally || redrawVertically***REMOVED*** {
      const image = tmpCanvas.canvas;
      if (redrawHorizontally***REMOVED*** {
        canvasWidth = xstep;
      ***REMOVED***
      if (redrawVertically***REMOVED*** {
        canvasHeight = ystep;
      ***REMOVED***
      const dimx2 = this.getSizeAndScale(canvasWidth, this.ctx.canvas.width, combinedScaleX***REMOVED***;
      const dimy2 = this.getSizeAndScale(canvasHeight, this.ctx.canvas.height, combinedScaleY***REMOVED***;
      const xSize = dimx2.size;
      const ySize = dimy2.size;
      const tmpCanvas2 = owner.cachedCanvases.getCanvas("pattern-workaround", xSize, ySize***REMOVED***;
      const tmpCtx2 = tmpCanvas2.context;
      const ii = redrawHorizontally ? Math.floor(width / xstep***REMOVED*** : 0;
      const jj = redrawVertically ? Math.floor(height / ystep***REMOVED*** : 0;
      for (let i = 0; i <= ii; i++***REMOVED*** {
        for (let j = 0; j <= jj; j++***REMOVED*** {
          tmpCtx2.drawImage(image, xSize * i, ySize * j, xSize, ySize, 0, 0, xSize, ySize***REMOVED***;
        ***REMOVED***
      ***REMOVED***
  ***REMOVED***
        canvas: tmpCanvas2.canvas,
        scaleX: dimx2.scale,
        scaleY: dimy2.scale,
        offsetX: x0,
        offsetY: y0
      ***REMOVED***;
    ***REMOVED***
***REMOVED***
      canvas: tmpCanvas.canvas,
      scaleX: dimx.scale,
      scaleY: dimy.scale,
      offsetX: x0,
      offsetY: y0
    ***REMOVED***;
  ***REMOVED***
  getSizeAndScale(step, realOutputSize, scale***REMOVED*** {
    const maxSize = Math.max(TilingPattern.MAX_PATTERN_SIZE, realOutputSize***REMOVED***;
    let size = Math.ceil(step * scale***REMOVED***;
    if (size >= maxSize***REMOVED*** {
      size = maxSize;
    ***REMOVED*** else {
      scale = size / step;
    ***REMOVED***
***REMOVED***
      scale,
      size
    ***REMOVED***;
  ***REMOVED***
  clipBbox(graphics, x0, y0, x1, y1***REMOVED*** {
    const bboxWidth = x1 - x0;
    const bboxHeight = y1 - y0;
    graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight***REMOVED***;
    graphics.current.updateRectMinMax(getCurrentTransform(graphics.ctx***REMOVED***, [x0, y0, x1, y1]***REMOVED***;
    graphics.clip(***REMOVED***;
    graphics.endPath(***REMOVED***;
  ***REMOVED***
  setFillAndStrokeStyleToContext(graphics, paintType, color***REMOVED*** {
    const context = graphics.ctx,
      current = graphics.current;
    switch (paintType***REMOVED*** {
      case PaintType.COLORED:
        const ctx = this.ctx;
        context.fillStyle = ctx.fillStyle;
        context.strokeStyle = ctx.strokeStyle;
        current.fillColor = ctx.fillStyle;
        current.strokeColor = ctx.strokeStyle;
        break;
      case PaintType.UNCOLORED:
        const cssColor = Util.makeHexColor(color[0], color[1], color[2]***REMOVED***;
        context.fillStyle = cssColor;
        context.strokeStyle = cssColor;
        current.fillColor = cssColor;
        current.strokeColor = cssColor;
        break;
      default:
        throw new FormatError(`Unsupported paint type: ${paintType***REMOVED***`***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getPattern(ctx, owner, inverse, pathType***REMOVED*** {
    let matrix = inverse;
    if (pathType !== PathType.SHADING***REMOVED*** {
      matrix = Util.transform(matrix, owner.baseTransform***REMOVED***;
      if (this.matrix***REMOVED*** {
        matrix = Util.transform(matrix, this.matrix***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const temporaryPatternCanvas = this.createPatternCanvas(owner***REMOVED***;
    let domMatrix = new DOMMatrix(matrix***REMOVED***;
    domMatrix = domMatrix.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY***REMOVED***;
    domMatrix = domMatrix.scale(1 / temporaryPatternCanvas.scaleX, 1 / temporaryPatternCanvas.scaleY***REMOVED***;
    const pattern = ctx.createPattern(temporaryPatternCanvas.canvas, "repeat"***REMOVED***;
    pattern.setTransform(domMatrix***REMOVED***;
    return pattern;
  ***REMOVED***
***REMOVED***

;// ./src/shared/image_utils.js

function convertToRGBA(params***REMOVED*** {
  switch (params.kind***REMOVED*** {
    case ImageKind.GRAYSCALE_1BPP:
      return convertBlackAndWhiteToRGBA(params***REMOVED***;
    case ImageKind.RGB_24BPP:
      return convertRGBToRGBA(params***REMOVED***;
  ***REMOVED***
  return null;
***REMOVED***
function convertBlackAndWhiteToRGBA({
  src,
  srcPos = 0,
  dest,
  width,
  height,
  nonBlackColor = 0xffffffff,
  inverseDecode = false
***REMOVED******REMOVED*** {
  const black = util_FeatureTest.isLittleEndian ? 0xff000000 : 0x000000ff;
  const [zeroMapping, oneMapping] = inverseDecode ? [nonBlackColor, black] : [black, nonBlackColor];
  const widthInSource = width >> 3;
  const widthRemainder = width & 7;
  const srcLength = src.length;
  dest = new Uint32Array(dest.buffer***REMOVED***;
  let destPos = 0;
  for (let i = 0; i < height; i++***REMOVED*** {
    for (const max = srcPos + widthInSource; srcPos < max; srcPos++***REMOVED*** {
      const elem = srcPos < srcLength ? src[srcPos] : 255;
      dest[destPos++] = elem & 0b10000000 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b1000000 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b100000 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b10000 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b1000 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b100 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b10 ? oneMapping : zeroMapping;
      dest[destPos++] = elem & 0b1 ? oneMapping : zeroMapping;
    ***REMOVED***
    if (widthRemainder === 0***REMOVED*** {
      continue;
    ***REMOVED***
    const elem = srcPos < srcLength ? src[srcPos++] : 255;
    for (let j = 0; j < widthRemainder; j++***REMOVED*** {
      dest[destPos++] = elem & 1 << 7 - j ? oneMapping : zeroMapping;
    ***REMOVED***
  ***REMOVED***
  return {
    srcPos,
    destPos
  ***REMOVED***;
***REMOVED***
function convertRGBToRGBA({
  src,
  srcPos = 0,
  dest,
  destPos = 0,
  width,
  height
***REMOVED******REMOVED*** {
  let i = 0;
  const len = width * height * 3;
  const len32 = len >> 2;
  const src32 = new Uint32Array(src.buffer, srcPos, len32***REMOVED***;
  if (FeatureTest.isLittleEndian***REMOVED*** {
    for (; i < len32 - 2; i += 3, destPos += 4***REMOVED*** {
      const s1 = src32[i];
      const s2 = src32[i + 1];
      const s3 = src32[i + 2];
      dest[destPos] = s1 | 0xff000000;
      dest[destPos + 1] = s1 >>> 24 | s2 << 8 | 0xff000000;
      dest[destPos + 2] = s2 >>> 16 | s3 << 16 | 0xff000000;
      dest[destPos + 3] = s3 >>> 8 | 0xff000000;
    ***REMOVED***
    for (let j = i * 4, jj = srcPos + len; j < jj; j += 3***REMOVED*** {
      dest[destPos++] = src[j] | src[j + 1] << 8 | src[j + 2] << 16 | 0xff000000;
    ***REMOVED***
  ***REMOVED*** else {
    for (; i < len32 - 2; i += 3, destPos += 4***REMOVED*** {
      const s1 = src32[i];
      const s2 = src32[i + 1];
      const s3 = src32[i + 2];
      dest[destPos] = s1 | 0xff;
      dest[destPos + 1] = s1 << 24 | s2 >>> 8 | 0xff;
      dest[destPos + 2] = s2 << 16 | s3 >>> 16 | 0xff;
      dest[destPos + 3] = s3 << 8 | 0xff;
    ***REMOVED***
    for (let j = i * 4, jj = srcPos + len; j < jj; j += 3***REMOVED*** {
      dest[destPos++] = src[j] << 24 | src[j + 1] << 16 | src[j + 2] << 8 | 0xff;
    ***REMOVED***
  ***REMOVED***
  return {
    srcPos: srcPos + len,
    destPos
  ***REMOVED***;
***REMOVED***
function grayToRGBA(src, dest***REMOVED*** {
  if (FeatureTest.isLittleEndian***REMOVED*** {
    for (let i = 0, ii = src.length; i < ii; i++***REMOVED*** {
      dest[i] = src[i] * 0x10101 | 0xff000000;
    ***REMOVED***
  ***REMOVED*** else {
    for (let i = 0, ii = src.length; i < ii; i++***REMOVED*** {
      dest[i] = src[i] * 0x1010100 | 0x000000ff;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./src/display/canvas.js




const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 100;
const EXECUTION_TIME = 15;
const EXECUTION_STEPS = 10;
const MAX_SIZE_TO_COMPILE = 1000;
const FULL_CHUNK_HEIGHT = 16;
function mirrorContextOperations(ctx, destCtx***REMOVED*** {
  if (ctx._removeMirroring***REMOVED*** {
    throw new Error("Context is already forwarding operations."***REMOVED***;
  ***REMOVED***
  ctx.__originalSave = ctx.save;
  ctx.__originalRestore = ctx.restore;
  ctx.__originalRotate = ctx.rotate;
  ctx.__originalScale = ctx.scale;
  ctx.__originalTranslate = ctx.translate;
  ctx.__originalTransform = ctx.transform;
  ctx.__originalSetTransform = ctx.setTransform;
  ctx.__originalResetTransform = ctx.resetTransform;
  ctx.__originalClip = ctx.clip;
  ctx.__originalMoveTo = ctx.moveTo;
  ctx.__originalLineTo = ctx.lineTo;
  ctx.__originalBezierCurveTo = ctx.bezierCurveTo;
  ctx.__originalRect = ctx.rect;
  ctx.__originalClosePath = ctx.closePath;
  ctx.__originalBeginPath = ctx.beginPath;
  ctx._removeMirroring = (***REMOVED*** => {
    ctx.save = ctx.__originalSave;
    ctx.restore = ctx.__originalRestore;
    ctx.rotate = ctx.__originalRotate;
    ctx.scale = ctx.__originalScale;
    ctx.translate = ctx.__originalTranslate;
    ctx.transform = ctx.__originalTransform;
    ctx.setTransform = ctx.__originalSetTransform;
    ctx.resetTransform = ctx.__originalResetTransform;
    ctx.clip = ctx.__originalClip;
    ctx.moveTo = ctx.__originalMoveTo;
    ctx.lineTo = ctx.__originalLineTo;
    ctx.bezierCurveTo = ctx.__originalBezierCurveTo;
    ctx.rect = ctx.__originalRect;
    ctx.closePath = ctx.__originalClosePath;
    ctx.beginPath = ctx.__originalBeginPath;
    delete ctx._removeMirroring;
  ***REMOVED***;
  ctx.save = function ctxSave(***REMOVED*** {
    destCtx.save(***REMOVED***;
    this.__originalSave(***REMOVED***;
  ***REMOVED***;
  ctx.restore = function ctxRestore(***REMOVED*** {
    destCtx.restore(***REMOVED***;
    this.__originalRestore(***REMOVED***;
  ***REMOVED***;
  ctx.translate = function ctxTranslate(x, y***REMOVED*** {
    destCtx.translate(x, y***REMOVED***;
    this.__originalTranslate(x, y***REMOVED***;
  ***REMOVED***;
  ctx.scale = function ctxScale(x, y***REMOVED*** {
    destCtx.scale(x, y***REMOVED***;
    this.__originalScale(x, y***REMOVED***;
  ***REMOVED***;
  ctx.transform = function ctxTransform(a, b, c, d, e, f***REMOVED*** {
    destCtx.transform(a, b, c, d, e, f***REMOVED***;
    this.__originalTransform(a, b, c, d, e, f***REMOVED***;
  ***REMOVED***;
  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f***REMOVED*** {
    destCtx.setTransform(a, b, c, d, e, f***REMOVED***;
    this.__originalSetTransform(a, b, c, d, e, f***REMOVED***;
  ***REMOVED***;
  ctx.resetTransform = function ctxResetTransform(***REMOVED*** {
    destCtx.resetTransform(***REMOVED***;
    this.__originalResetTransform(***REMOVED***;
  ***REMOVED***;
  ctx.rotate = function ctxRotate(angle***REMOVED*** {
    destCtx.rotate(angle***REMOVED***;
    this.__originalRotate(angle***REMOVED***;
  ***REMOVED***;
  ctx.clip = function ctxRotate(rule***REMOVED*** {
    destCtx.clip(rule***REMOVED***;
    this.__originalClip(rule***REMOVED***;
  ***REMOVED***;
  ctx.moveTo = function (x, y***REMOVED*** {
    destCtx.moveTo(x, y***REMOVED***;
    this.__originalMoveTo(x, y***REMOVED***;
  ***REMOVED***;
  ctx.lineTo = function (x, y***REMOVED*** {
    destCtx.lineTo(x, y***REMOVED***;
    this.__originalLineTo(x, y***REMOVED***;
  ***REMOVED***;
  ctx.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y***REMOVED*** {
    destCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y***REMOVED***;
    this.__originalBezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y***REMOVED***;
  ***REMOVED***;
  ctx.rect = function (x, y, width, height***REMOVED*** {
    destCtx.rect(x, y, width, height***REMOVED***;
    this.__originalRect(x, y, width, height***REMOVED***;
  ***REMOVED***;
  ctx.closePath = function (***REMOVED*** {
    destCtx.closePath(***REMOVED***;
    this.__originalClosePath(***REMOVED***;
  ***REMOVED***;
  ctx.beginPath = function (***REMOVED*** {
    destCtx.beginPath(***REMOVED***;
    this.__originalBeginPath(***REMOVED***;
  ***REMOVED***;
***REMOVED***
class CachedCanvases {
  constructor(canvasFactory***REMOVED*** {
    this.canvasFactory = canvasFactory;
    this.cache = Object.create(null***REMOVED***;
  ***REMOVED***
  getCanvas(id, width, height***REMOVED*** {
    let canvasEntry;
    if (this.cache[id] !== undefined***REMOVED*** {
      canvasEntry = this.cache[id];
      this.canvasFactory.reset(canvasEntry, width, height***REMOVED***;
    ***REMOVED*** else {
      canvasEntry = this.canvasFactory.create(width, height***REMOVED***;
      this.cache[id] = canvasEntry;
    ***REMOVED***
    return canvasEntry;
  ***REMOVED***
  delete(id***REMOVED*** {
    delete this.cache[id];
  ***REMOVED***
  clear(***REMOVED*** {
    for (const id in this.cache***REMOVED*** {
      const canvasEntry = this.cache[id];
      this.canvasFactory.destroy(canvasEntry***REMOVED***;
      delete this.cache[id];
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function drawImageAtIntegerCoords(ctx, srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH***REMOVED*** {
  const [a, b, c, d, tx, ty] = getCurrentTransform(ctx***REMOVED***;
  if (b === 0 && c === 0***REMOVED*** {
    const tlX = destX * a + tx;
    const rTlX = Math.round(tlX***REMOVED***;
    const tlY = destY * d + ty;
    const rTlY = Math.round(tlY***REMOVED***;
    const brX = (destX + destW***REMOVED*** * a + tx;
    const rWidth = Math.abs(Math.round(brX***REMOVED*** - rTlX***REMOVED*** || 1;
    const brY = (destY + destH***REMOVED*** * d + ty;
    const rHeight = Math.abs(Math.round(brY***REMOVED*** - rTlY***REMOVED*** || 1;
    ctx.setTransform(Math.sign(a***REMOVED***, 0, 0, Math.sign(d***REMOVED***, rTlX, rTlY***REMOVED***;
    ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rWidth, rHeight***REMOVED***;
    ctx.setTransform(a, b, c, d, tx, ty***REMOVED***;
    return [rWidth, rHeight];
  ***REMOVED***
  if (a === 0 && d === 0***REMOVED*** {
    const tlX = destY * c + tx;
    const rTlX = Math.round(tlX***REMOVED***;
    const tlY = destX * b + ty;
    const rTlY = Math.round(tlY***REMOVED***;
    const brX = (destY + destH***REMOVED*** * c + tx;
    const rWidth = Math.abs(Math.round(brX***REMOVED*** - rTlX***REMOVED*** || 1;
    const brY = (destX + destW***REMOVED*** * b + ty;
    const rHeight = Math.abs(Math.round(brY***REMOVED*** - rTlY***REMOVED*** || 1;
    ctx.setTransform(0, Math.sign(b***REMOVED***, Math.sign(c***REMOVED***, 0, rTlX, rTlY***REMOVED***;
    ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, rHeight, rWidth***REMOVED***;
    ctx.setTransform(a, b, c, d, tx, ty***REMOVED***;
    return [rHeight, rWidth];
  ***REMOVED***
  ctx.drawImage(srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH***REMOVED***;
  const scaleX = Math.hypot(a, b***REMOVED***;
  const scaleY = Math.hypot(c, d***REMOVED***;
  return [scaleX * destW, scaleY * destH];
***REMOVED***
function compileType3Glyph(imgData***REMOVED*** {
  const {
    width,
    height
  ***REMOVED*** = imgData;
  if (width > MAX_SIZE_TO_COMPILE || height > MAX_SIZE_TO_COMPILE***REMOVED*** {
    return null;
  ***REMOVED***
  const POINT_TO_PROCESS_LIMIT = 1000;
  const POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]***REMOVED***;
  const width1 = width + 1;
  let points = new Uint8Array(width1 * (height + 1***REMOVED******REMOVED***;
  let i, j, j0;
  const lineSize = width + 7 & ~7;
  let data = new Uint8Array(lineSize * height***REMOVED***,
    pos = 0;
  for (const elem of imgData.data***REMOVED*** {
    let mask = 128;
    while (mask > 0***REMOVED*** {
      data[pos++] = elem & mask ? 0 : 255;
      mask >>= 1;
    ***REMOVED***
  ***REMOVED***
  let count = 0;
  pos = 0;
  if (data[pos] !== 0***REMOVED*** {
    points[0] = 1;
    ++count;
  ***REMOVED***
  for (j = 1; j < width; j++***REMOVED*** {
    if (data[pos] !== data[pos + 1]***REMOVED*** {
      points[j] = data[pos] ? 2 : 1;
      ++count;
    ***REMOVED***
    pos++;
  ***REMOVED***
  if (data[pos] !== 0***REMOVED*** {
    points[j] = 2;
    ++count;
  ***REMOVED***
  for (i = 1; i < height; i++***REMOVED*** {
    pos = i * lineSize;
    j0 = i * width1;
    if (data[pos - lineSize] !== data[pos]***REMOVED*** {
      points[j0] = data[pos] ? 1 : 8;
      ++count;
    ***REMOVED***
    let sum = (data[pos] ? 4 : 0***REMOVED*** + (data[pos - lineSize] ? 8 : 0***REMOVED***;
    for (j = 1; j < width; j++***REMOVED*** {
      sum = (sum >> 2***REMOVED*** + (data[pos + 1] ? 4 : 0***REMOVED*** + (data[pos - lineSize + 1] ? 8 : 0***REMOVED***;
      if (POINT_TYPES[sum]***REMOVED*** {
        points[j0 + j] = POINT_TYPES[sum];
        ++count;
      ***REMOVED***
      pos++;
    ***REMOVED***
    if (data[pos - lineSize] !== data[pos]***REMOVED*** {
      points[j0 + j] = data[pos] ? 2 : 4;
      ++count;
    ***REMOVED***
    if (count > POINT_TO_PROCESS_LIMIT***REMOVED*** {
      return null;
    ***REMOVED***
  ***REMOVED***
  pos = lineSize * (height - 1***REMOVED***;
  j0 = i * width1;
  if (data[pos] !== 0***REMOVED*** {
    points[j0] = 8;
    ++count;
  ***REMOVED***
  for (j = 1; j < width; j++***REMOVED*** {
    if (data[pos] !== data[pos + 1]***REMOVED*** {
      points[j0 + j] = data[pos] ? 4 : 8;
      ++count;
    ***REMOVED***
    pos++;
  ***REMOVED***
  if (data[pos] !== 0***REMOVED*** {
    points[j0 + j] = 4;
    ++count;
  ***REMOVED***
  if (count > POINT_TO_PROCESS_LIMIT***REMOVED*** {
    return null;
  ***REMOVED***
  const steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]***REMOVED***;
  const path = new Path2D(***REMOVED***;
  for (i = 0; count && i <= height; i++***REMOVED*** {
    let p = i * width1;
    const end = p + width;
    while (p < end && !points[p]***REMOVED*** {
      p++;
    ***REMOVED***
    if (p === end***REMOVED*** {
      continue;
    ***REMOVED***
    path.moveTo(p % width1, i***REMOVED***;
    const p0 = p;
    let type = points[p];
    do {
      const step = steps[type];
      do {
        p += step;
      ***REMOVED*** while (!points[p]***REMOVED***;
      const pp = points[p];
      if (pp !== 5 && pp !== 10***REMOVED*** {
        type = pp;
        points[p] = 0;
      ***REMOVED*** else {
        type = pp & 0x33 * type >> 4;
        points[p] &= type >> 2 | type << 2;
      ***REMOVED***
      path.lineTo(p % width1, p / width1 | 0***REMOVED***;
      if (!points[p]***REMOVED*** {
        --count;
      ***REMOVED***
    ***REMOVED*** while (p0 !== p***REMOVED***;
    --i;
  ***REMOVED***
  data = null;
  points = null;
  const drawOutline = function (c***REMOVED*** {
    c.save(***REMOVED***;
    c.scale(1 / width, -1 / height***REMOVED***;
    c.translate(0, -height***REMOVED***;
    c.fill(path***REMOVED***;
    c.beginPath(***REMOVED***;
    c.restore(***REMOVED***;
  ***REMOVED***;
  return drawOutline;
***REMOVED***
class CanvasExtraState {
  constructor(width, height***REMOVED*** {
    this.alphaIsShape = false;
    this.fontSize = 0;
    this.fontSizeScale = 1;
    this.textMatrix = IDENTITY_MATRIX;
    this.textMatrixScale = 1;
    this.fontMatrix = FONT_IDENTITY_MATRIX;
    this.leading = 0;
    this.x = 0;
    this.y = 0;
    this.lineX = 0;
    this.lineY = 0;
    this.charSpacing = 0;
    this.wordSpacing = 0;
    this.textHScale = 1;
    this.textRenderingMode = TextRenderingMode.FILL;
    this.textRise = 0;
    this.fillColor = "#000000";
    this.strokeColor = "#000000";
    this.patternFill = false;
    this.patternStroke = false;
    this.fillAlpha = 1;
    this.strokeAlpha = 1;
    this.lineWidth = 1;
    this.activeSMask = null;
    this.transferMaps = "none";
    this.startNewPathAndClipBox([0, 0, width, height]***REMOVED***;
  ***REMOVED***
  clone(***REMOVED*** {
    const clone = Object.create(this***REMOVED***;
    clone.clipBox = this.clipBox.slice(***REMOVED***;
    return clone;
  ***REMOVED***
  setCurrentPoint(x, y***REMOVED*** {
    this.x = x;
    this.y = y;
  ***REMOVED***
  updatePathMinMax(transform, x, y***REMOVED*** {
    [x, y] = Util.applyTransform([x, y], transform***REMOVED***;
    this.minX = Math.min(this.minX, x***REMOVED***;
    this.minY = Math.min(this.minY, y***REMOVED***;
    this.maxX = Math.max(this.maxX, x***REMOVED***;
    this.maxY = Math.max(this.maxY, y***REMOVED***;
  ***REMOVED***
  updateRectMinMax(transform, rect***REMOVED*** {
    const p1 = Util.applyTransform(rect, transform***REMOVED***;
    const p2 = Util.applyTransform(rect.slice(2***REMOVED***, transform***REMOVED***;
    const p3 = Util.applyTransform([rect[0], rect[3]], transform***REMOVED***;
    const p4 = Util.applyTransform([rect[2], rect[1]], transform***REMOVED***;
    this.minX = Math.min(this.minX, p1[0], p2[0], p3[0], p4[0]***REMOVED***;
    this.minY = Math.min(this.minY, p1[1], p2[1], p3[1], p4[1]***REMOVED***;
    this.maxX = Math.max(this.maxX, p1[0], p2[0], p3[0], p4[0]***REMOVED***;
    this.maxY = Math.max(this.maxY, p1[1], p2[1], p3[1], p4[1]***REMOVED***;
  ***REMOVED***
  updateScalingPathMinMax(transform, minMax***REMOVED*** {
    Util.scaleMinMax(transform, minMax***REMOVED***;
    this.minX = Math.min(this.minX, minMax[0]***REMOVED***;
    this.minY = Math.min(this.minY, minMax[1]***REMOVED***;
    this.maxX = Math.max(this.maxX, minMax[2]***REMOVED***;
    this.maxY = Math.max(this.maxY, minMax[3]***REMOVED***;
  ***REMOVED***
  updateCurvePathMinMax(transform, x0, y0, x1, y1, x2, y2, x3, y3, minMax***REMOVED*** {
    const box = Util.bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3, minMax***REMOVED***;
    if (minMax***REMOVED*** {
      return;
    ***REMOVED***
    this.updateRectMinMax(transform, box***REMOVED***;
  ***REMOVED***
  getPathBoundingBox(pathType = PathType.FILL, transform = null***REMOVED*** {
    const box = [this.minX, this.minY, this.maxX, this.maxY];
    if (pathType === PathType.STROKE***REMOVED*** {
      if (!transform***REMOVED*** {
        unreachable("Stroke bounding box must include transform."***REMOVED***;
      ***REMOVED***
      const scale = Util.singularValueDecompose2dScale(transform***REMOVED***;
      const xStrokePad = scale[0] * this.lineWidth / 2;
      const yStrokePad = scale[1] * this.lineWidth / 2;
      box[0] -= xStrokePad;
      box[1] -= yStrokePad;
      box[2] += xStrokePad;
      box[3] += yStrokePad;
    ***REMOVED***
    return box;
  ***REMOVED***
  updateClipFromPath(***REMOVED*** {
    const intersect = Util.intersect(this.clipBox, this.getPathBoundingBox(***REMOVED******REMOVED***;
    this.startNewPathAndClipBox(intersect || [0, 0, 0, 0]***REMOVED***;
  ***REMOVED***
  isEmptyClip(***REMOVED*** {
    return this.minX === Infinity;
  ***REMOVED***
  startNewPathAndClipBox(box***REMOVED*** {
    this.clipBox = box;
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = 0;
    this.maxY = 0;
  ***REMOVED***
  getClippedPathBoundingBox(pathType = PathType.FILL, transform = null***REMOVED*** {
    return Util.intersect(this.clipBox, this.getPathBoundingBox(pathType, transform***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
function putBinaryImageData(ctx, imgData***REMOVED*** {
  if (imgData instanceof ImageData***REMOVED*** {
    ctx.putImageData(imgData, 0, 0***REMOVED***;
    return;
  ***REMOVED***
  const height = imgData.height,
    width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight***REMOVED*** / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT***REMOVED***;
  let srcPos = 0,
    destPos;
  const src = imgData.data;
  const dest = chunkImgData.data;
  let i, j, thisChunkHeight, elemsInThisChunk;
  if (imgData.kind === util_ImageKind.GRAYSCALE_1BPP***REMOVED*** {
    const srcLength = src.byteLength;
    const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2***REMOVED***;
    const dest32DataLength = dest32.length;
    const fullSrcDiff = width + 7 >> 3;
    const white = 0xffffffff;
    const black = util_FeatureTest.isLittleEndian ? 0xff000000 : 0x000000ff;
    for (i = 0; i < totalChunks; i++***REMOVED*** {
      thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
      destPos = 0;
      for (j = 0; j < thisChunkHeight; j++***REMOVED*** {
        const srcDiff = srcLength - srcPos;
        let k = 0;
        const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
        const kEndUnrolled = kEnd & ~7;
        let mask = 0;
        let srcByte = 0;
        for (; k < kEndUnrolled; k += 8***REMOVED*** {
          srcByte = src[srcPos++];
          dest32[destPos++] = srcByte & 128 ? white : black;
          dest32[destPos++] = srcByte & 64 ? white : black;
          dest32[destPos++] = srcByte & 32 ? white : black;
          dest32[destPos++] = srcByte & 16 ? white : black;
          dest32[destPos++] = srcByte & 8 ? white : black;
          dest32[destPos++] = srcByte & 4 ? white : black;
          dest32[destPos++] = srcByte & 2 ? white : black;
          dest32[destPos++] = srcByte & 1 ? white : black;
        ***REMOVED***
        for (; k < kEnd; k++***REMOVED*** {
          if (mask === 0***REMOVED*** {
            srcByte = src[srcPos++];
            mask = 128;
          ***REMOVED***
          dest32[destPos++] = srcByte & mask ? white : black;
          mask >>= 1;
        ***REMOVED***
      ***REMOVED***
      while (destPos < dest32DataLength***REMOVED*** {
        dest32[destPos++] = 0;
      ***REMOVED***
      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else if (imgData.kind === util_ImageKind.RGBA_32BPP***REMOVED*** {
    j = 0;
    elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;
    for (i = 0; i < fullChunks; i++***REMOVED*** {
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk***REMOVED******REMOVED***;
      srcPos += elemsInThisChunk;
      ctx.putImageData(chunkImgData, 0, j***REMOVED***;
      j += FULL_CHUNK_HEIGHT;
    ***REMOVED***
    if (i < totalChunks***REMOVED*** {
      elemsInThisChunk = width * partialChunkHeight * 4;
      dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk***REMOVED******REMOVED***;
      ctx.putImageData(chunkImgData, 0, j***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else if (imgData.kind === util_ImageKind.RGB_24BPP***REMOVED*** {
    thisChunkHeight = FULL_CHUNK_HEIGHT;
    elemsInThisChunk = width * thisChunkHeight;
    for (i = 0; i < totalChunks; i++***REMOVED*** {
      if (i >= fullChunks***REMOVED*** {
        thisChunkHeight = partialChunkHeight;
        elemsInThisChunk = width * thisChunkHeight;
      ***REMOVED***
      destPos = 0;
      for (j = elemsInThisChunk; j--;***REMOVED*** {
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = src[srcPos++];
        dest[destPos++] = 255;
      ***REMOVED***
      ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else {
    throw new Error(`bad image kind: ${imgData.kind***REMOVED***`***REMOVED***;
  ***REMOVED***
***REMOVED***
function putBinaryImageMask(ctx, imgData***REMOVED*** {
  if (imgData.bitmap***REMOVED*** {
    ctx.drawImage(imgData.bitmap, 0, 0***REMOVED***;
    return;
  ***REMOVED***
  const height = imgData.height,
    width = imgData.width;
  const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  const fullChunks = (height - partialChunkHeight***REMOVED*** / FULL_CHUNK_HEIGHT;
  const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT***REMOVED***;
  let srcPos = 0;
  const src = imgData.data;
  const dest = chunkImgData.data;
  for (let i = 0; i < totalChunks; i++***REMOVED*** {
    const thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
    ({
      srcPos
    ***REMOVED*** = convertBlackAndWhiteToRGBA({
      src,
      srcPos,
      dest,
      width,
      height: thisChunkHeight,
      nonBlackColor: 0
    ***REMOVED******REMOVED******REMOVED***;
    ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT***REMOVED***;
  ***REMOVED***
***REMOVED***
function copyCtxState(sourceCtx, destCtx***REMOVED*** {
  const properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
  for (const property of properties***REMOVED*** {
    if (sourceCtx[property] !== undefined***REMOVED*** {
      destCtx[property] = sourceCtx[property];
    ***REMOVED***
  ***REMOVED***
  if (sourceCtx.setLineDash !== undefined***REMOVED*** {
    destCtx.setLineDash(sourceCtx.getLineDash(***REMOVED******REMOVED***;
    destCtx.lineDashOffset = sourceCtx.lineDashOffset;
  ***REMOVED***
***REMOVED***
function resetCtxToDefault(ctx***REMOVED*** {
  ctx.strokeStyle = ctx.fillStyle = "#000000";
  ctx.fillRule = "nonzero";
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.miterLimit = 10;
  ctx.globalCompositeOperation = "source-over";
  ctx.font = "10px sans-serif";
  if (ctx.setLineDash !== undefined***REMOVED*** {
    ctx.setLineDash([]***REMOVED***;
    ctx.lineDashOffset = 0;
  ***REMOVED***
  if (!isNodeJS***REMOVED*** {
    const {
      filter
    ***REMOVED*** = ctx;
    if (filter !== "none" && filter !== ""***REMOVED*** {
      ctx.filter = "none";
    ***REMOVED***
  ***REMOVED***
***REMOVED***
function getImageSmoothingEnabled(transform, interpolate***REMOVED*** {
  if (interpolate***REMOVED*** {
    return true;
  ***REMOVED***
  const scale = Util.singularValueDecompose2dScale(transform***REMOVED***;
  scale[0] = Math.fround(scale[0]***REMOVED***;
  scale[1] = Math.fround(scale[1]***REMOVED***;
  const actualScale = Math.fround((globalThis.devicePixelRatio || 1***REMOVED*** * PixelsPerInch.PDF_TO_CSS_UNITS***REMOVED***;
  return scale[0] <= actualScale && scale[1] <= actualScale;
***REMOVED***
const LINE_CAP_STYLES = ["butt", "round", "square"];
const LINE_JOIN_STYLES = ["miter", "round", "bevel"];
const NORMAL_CLIP = {***REMOVED***;
const EO_CLIP = {***REMOVED***;
class CanvasGraphics {
  constructor(canvasCtx, commonObjs, objs, canvasFactory, filterFactory, {
    optionalContentConfig,
    markedContentStack = null
  ***REMOVED***, annotationCanvasMap, pageColors***REMOVED*** {
    this.ctx = canvasCtx;
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height***REMOVED***;
    this.stateStack = [];
    this.pendingClip = null;
    this.pendingEOFill = false;
    this.res = null;
    this.xobjs = null;
    this.commonObjs = commonObjs;
    this.objs = objs;
    this.canvasFactory = canvasFactory;
    this.filterFactory = filterFactory;
    this.groupStack = [];
    this.processingType3 = null;
    this.baseTransform = null;
    this.baseTransformStack = [];
    this.groupLevel = 0;
    this.smaskStack = [];
    this.smaskCounter = 0;
    this.tempSMask = null;
    this.suspendedCtx = null;
    this.contentVisible = true;
    this.markedContentStack = markedContentStack || [];
    this.optionalContentConfig = optionalContentConfig;
    this.cachedCanvases = new CachedCanvases(this.canvasFactory***REMOVED***;
    this.cachedPatterns = new Map(***REMOVED***;
    this.annotationCanvasMap = annotationCanvasMap;
    this.viewportScale = 1;
    this.outputScaleX = 1;
    this.outputScaleY = 1;
    this.pageColors = pageColors;
    this._cachedScaleForStroking = [-1, 0];
    this._cachedGetSinglePixelWidth = null;
    this._cachedBitmapsMap = new Map(***REMOVED***;
  ***REMOVED***
  getObject(data, fallback = null***REMOVED*** {
    if (typeof data === "string"***REMOVED*** {
      return data.startsWith("g_"***REMOVED*** ? this.commonObjs.get(data***REMOVED*** : this.objs.get(data***REMOVED***;
    ***REMOVED***
    return fallback;
  ***REMOVED***
  beginDrawing({
    transform,
    viewport,
    transparency = false,
    background = null
  ***REMOVED******REMOVED*** {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    const savedFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = background || "#ffffff";
    this.ctx.fillRect(0, 0, width, height***REMOVED***;
    this.ctx.fillStyle = savedFillStyle;
    if (transparency***REMOVED*** {
      const transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height***REMOVED***;
      this.compositeCtx = this.ctx;
      this.transparentCanvas = transparentCanvas.canvas;
      this.ctx = transparentCanvas.context;
      this.ctx.save(***REMOVED***;
      this.ctx.transform(...getCurrentTransform(this.compositeCtx***REMOVED******REMOVED***;
    ***REMOVED***
    this.ctx.save(***REMOVED***;
    resetCtxToDefault(this.ctx***REMOVED***;
    if (transform***REMOVED*** {
      this.ctx.transform(...transform***REMOVED***;
      this.outputScaleX = transform[0];
      this.outputScaleY = transform[0];
    ***REMOVED***
    this.ctx.transform(...viewport.transform***REMOVED***;
    this.viewportScale = viewport.scale;
    this.baseTransform = getCurrentTransform(this.ctx***REMOVED***;
  ***REMOVED***
  executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper***REMOVED*** {
    const argsArray = operatorList.argsArray;
    const fnArray = operatorList.fnArray;
    let i = executionStartIdx || 0;
    const argsArrayLen = argsArray.length;
    if (argsArrayLen === i***REMOVED*** {
      return i;
    ***REMOVED***
    const chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
    const endTime = chunkOperations ? Date.now(***REMOVED*** + EXECUTION_TIME : 0;
    let steps = 0;
    const commonObjs = this.commonObjs;
    const objs = this.objs;
    let fnId;
    while (true***REMOVED*** {
      if (stepper !== undefined && i === stepper.nextBreakPoint***REMOVED*** {
        stepper.breakIt(i, continueCallback***REMOVED***;
        return i;
      ***REMOVED***
      fnId = fnArray[i];
      if (fnId !== OPS.dependency***REMOVED*** {
        this[fnId].apply(this, argsArray[i]***REMOVED***;
      ***REMOVED*** else {
        for (const depObjId of argsArray[i]***REMOVED*** {
          const objsPool = depObjId.startsWith("g_"***REMOVED*** ? commonObjs : objs;
          if (!objsPool.has(depObjId***REMOVED******REMOVED*** {
            objsPool.get(depObjId, continueCallback***REMOVED***;
            return i;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      i++;
      if (i === argsArrayLen***REMOVED*** {
        return i;
      ***REMOVED***
      if (chunkOperations && ++steps > EXECUTION_STEPS***REMOVED*** {
        if (Date.now(***REMOVED*** > endTime***REMOVED*** {
          continueCallback(***REMOVED***;
          return i;
        ***REMOVED***
        steps = 0;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #restoreInitialState(***REMOVED*** {
    while (this.stateStack.length || this.inSMaskMode***REMOVED*** {
      this.restore(***REMOVED***;
    ***REMOVED***
    this.current.activeSMask = null;
    this.ctx.restore(***REMOVED***;
    if (this.transparentCanvas***REMOVED*** {
      this.ctx = this.compositeCtx;
      this.ctx.save(***REMOVED***;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
      this.ctx.drawImage(this.transparentCanvas, 0, 0***REMOVED***;
      this.ctx.restore(***REMOVED***;
      this.transparentCanvas = null;
    ***REMOVED***
  ***REMOVED***
  endDrawing(***REMOVED*** {
    this.#restoreInitialState(***REMOVED***;
    this.cachedCanvases.clear(***REMOVED***;
    this.cachedPatterns.clear(***REMOVED***;
    for (const cache of this._cachedBitmapsMap.values(***REMOVED******REMOVED*** {
      for (const canvas of cache.values(***REMOVED******REMOVED*** {
        if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement***REMOVED*** {
          canvas.width = canvas.height = 0;
        ***REMOVED***
      ***REMOVED***
      cache.clear(***REMOVED***;
    ***REMOVED***
    this._cachedBitmapsMap.clear(***REMOVED***;
    this.#drawFilter(***REMOVED***;
  ***REMOVED***
  #drawFilter(***REMOVED*** {
    if (this.pageColors***REMOVED*** {
      const hcmFilterId = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background***REMOVED***;
      if (hcmFilterId !== "none"***REMOVED*** {
        const savedFilter = this.ctx.filter;
        this.ctx.filter = hcmFilterId;
        this.ctx.drawImage(this.ctx.canvas, 0, 0***REMOVED***;
        this.ctx.filter = savedFilter;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  _scaleImage(img, inverseTransform***REMOVED*** {
    const width = img.width ?? img.displayWidth;
    const height = img.height ?? img.displayHeight;
    let widthScale = Math.max(Math.hypot(inverseTransform[0], inverseTransform[1]***REMOVED***, 1***REMOVED***;
    let heightScale = Math.max(Math.hypot(inverseTransform[2], inverseTransform[3]***REMOVED***, 1***REMOVED***;
    let paintWidth = width,
      paintHeight = height;
    let tmpCanvasId = "prescale1";
    let tmpCanvas, tmpCtx;
    while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1***REMOVED*** {
      let newWidth = paintWidth,
        newHeight = paintHeight;
      if (widthScale > 2 && paintWidth > 1***REMOVED*** {
        newWidth = paintWidth >= 16384 ? Math.floor(paintWidth / 2***REMOVED*** - 1 || 1 : Math.ceil(paintWidth / 2***REMOVED***;
        widthScale /= paintWidth / newWidth;
      ***REMOVED***
      if (heightScale > 2 && paintHeight > 1***REMOVED*** {
        newHeight = paintHeight >= 16384 ? Math.floor(paintHeight / 2***REMOVED*** - 1 || 1 : Math.ceil(paintHeight***REMOVED*** / 2;
        heightScale /= paintHeight / newHeight;
      ***REMOVED***
      tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight***REMOVED***;
      tmpCtx = tmpCanvas.context;
      tmpCtx.clearRect(0, 0, newWidth, newHeight***REMOVED***;
      tmpCtx.drawImage(img, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight***REMOVED***;
      img = tmpCanvas.canvas;
      paintWidth = newWidth;
      paintHeight = newHeight;
      tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
    ***REMOVED***
***REMOVED***
      img,
      paintWidth,
      paintHeight
    ***REMOVED***;
  ***REMOVED***
  _createMaskCanvas(img***REMOVED*** {
    const ctx = this.ctx;
    const {
      width,
      height
    ***REMOVED*** = img;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    const currentTransform = getCurrentTransform(ctx***REMOVED***;
    let cache, cacheKey, scaled, maskCanvas;
    if ((img.bitmap || img.data***REMOVED*** && img.count > 1***REMOVED*** {
      const mainKey = img.bitmap || img.data.buffer;
      cacheKey = JSON.stringify(isPatternFill ? currentTransform : [currentTransform.slice(0, 4***REMOVED***, fillColor]***REMOVED***;
      cache = this._cachedBitmapsMap.get(mainKey***REMOVED***;
      if (!cache***REMOVED*** {
        cache = new Map(***REMOVED***;
        this._cachedBitmapsMap.set(mainKey, cache***REMOVED***;
      ***REMOVED***
      const cachedImage = cache.get(cacheKey***REMOVED***;
      if (cachedImage && !isPatternFill***REMOVED*** {
        const offsetX = Math.round(Math.min(currentTransform[0], currentTransform[2]***REMOVED*** + currentTransform[4]***REMOVED***;
        const offsetY = Math.round(Math.min(currentTransform[1], currentTransform[3]***REMOVED*** + currentTransform[5]***REMOVED***;
    ***REMOVED***
          canvas: cachedImage,
          offsetX,
          offsetY
        ***REMOVED***;
      ***REMOVED***
      scaled = cachedImage;
    ***REMOVED***
    if (!scaled***REMOVED*** {
      maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height***REMOVED***;
      putBinaryImageMask(maskCanvas.context, img***REMOVED***;
    ***REMOVED***
    let maskToCanvas = Util.transform(currentTransform, [1 / width, 0, 0, -1 / height, 0, 0]***REMOVED***;
    maskToCanvas = Util.transform(maskToCanvas, [1, 0, 0, 1, 0, -height]***REMOVED***;
    const [minX, minY, maxX, maxY] = Util.getAxialAlignedBoundingBox([0, 0, width, height], maskToCanvas***REMOVED***;
    const drawnWidth = Math.round(maxX - minX***REMOVED*** || 1;
    const drawnHeight = Math.round(maxY - minY***REMOVED*** || 1;
    const fillCanvas = this.cachedCanvases.getCanvas("fillCanvas", drawnWidth, drawnHeight***REMOVED***;
    const fillCtx = fillCanvas.context;
    const offsetX = minX;
    const offsetY = minY;
    fillCtx.translate(-offsetX, -offsetY***REMOVED***;
    fillCtx.transform(...maskToCanvas***REMOVED***;
    if (!scaled***REMOVED*** {
      scaled = this._scaleImage(maskCanvas.canvas, getCurrentTransformInverse(fillCtx***REMOVED******REMOVED***;
      scaled = scaled.img;
      if (cache && isPatternFill***REMOVED*** {
        cache.set(cacheKey, scaled***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    fillCtx.imageSmoothingEnabled = getImageSmoothingEnabled(getCurrentTransform(fillCtx***REMOVED***, img.interpolate***REMOVED***;
    drawImageAtIntegerCoords(fillCtx, scaled, 0, 0, scaled.width, scaled.height, 0, 0, width, height***REMOVED***;
    fillCtx.globalCompositeOperation = "source-in";
    const inverse = Util.transform(getCurrentTransformInverse(fillCtx***REMOVED***, [1, 0, 0, 1, -offsetX, -offsetY]***REMOVED***;
    fillCtx.fillStyle = isPatternFill ? fillColor.getPattern(ctx, this, inverse, PathType.FILL***REMOVED*** : fillColor;
    fillCtx.fillRect(0, 0, width, height***REMOVED***;
    if (cache && !isPatternFill***REMOVED*** {
      this.cachedCanvases.delete("fillCanvas"***REMOVED***;
      cache.set(cacheKey, fillCanvas.canvas***REMOVED***;
    ***REMOVED***
***REMOVED***
      canvas: fillCanvas.canvas,
      offsetX: Math.round(offsetX***REMOVED***,
      offsetY: Math.round(offsetY***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  setLineWidth(width***REMOVED*** {
    if (width !== this.current.lineWidth***REMOVED*** {
      this._cachedScaleForStroking[0] = -1;
    ***REMOVED***
    this.current.lineWidth = width;
    this.ctx.lineWidth = width;
  ***REMOVED***
  setLineCap(style***REMOVED*** {
    this.ctx.lineCap = LINE_CAP_STYLES[style];
  ***REMOVED***
  setLineJoin(style***REMOVED*** {
    this.ctx.lineJoin = LINE_JOIN_STYLES[style];
  ***REMOVED***
  setMiterLimit(limit***REMOVED*** {
    this.ctx.miterLimit = limit;
  ***REMOVED***
  setDash(dashArray, dashPhase***REMOVED*** {
    const ctx = this.ctx;
    if (ctx.setLineDash !== undefined***REMOVED*** {
      ctx.setLineDash(dashArray***REMOVED***;
      ctx.lineDashOffset = dashPhase;
    ***REMOVED***
  ***REMOVED***
  setRenderingIntent(intent***REMOVED*** {***REMOVED***
  setFlatness(flatness***REMOVED*** {***REMOVED***
  setGState(states***REMOVED*** {
    for (const [key, value] of states***REMOVED*** {
      switch (key***REMOVED*** {
        case "LW":
          this.setLineWidth(value***REMOVED***;
          break;
        case "LC":
          this.setLineCap(value***REMOVED***;
          break;
        case "LJ":
          this.setLineJoin(value***REMOVED***;
          break;
        case "ML":
          this.setMiterLimit(value***REMOVED***;
          break;
        case "D":
          this.setDash(value[0], value[1]***REMOVED***;
          break;
        case "RI":
          this.setRenderingIntent(value***REMOVED***;
          break;
        case "FL":
          this.setFlatness(value***REMOVED***;
          break;
        case "Font":
          this.setFont(value[0], value[1]***REMOVED***;
          break;
        case "CA":
          this.current.strokeAlpha = value;
          break;
        case "ca":
          this.current.fillAlpha = value;
          this.ctx.globalAlpha = value;
          break;
        case "BM":
          this.ctx.globalCompositeOperation = value;
          break;
        case "SMask":
          this.current.activeSMask = value ? this.tempSMask : null;
          this.tempSMask = null;
          this.checkSMaskState(***REMOVED***;
          break;
        case "TR":
          this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(value***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  get inSMaskMode(***REMOVED*** {
    return !!this.suspendedCtx;
  ***REMOVED***
  checkSMaskState(***REMOVED*** {
    const inSMaskMode = this.inSMaskMode;
    if (this.current.activeSMask && !inSMaskMode***REMOVED*** {
      this.beginSMaskMode(***REMOVED***;
    ***REMOVED*** else if (!this.current.activeSMask && inSMaskMode***REMOVED*** {
      this.endSMaskMode(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  beginSMaskMode(***REMOVED*** {
    if (this.inSMaskMode***REMOVED*** {
      throw new Error("beginSMaskMode called while already in smask mode"***REMOVED***;
    ***REMOVED***
    const drawnWidth = this.ctx.canvas.width;
    const drawnHeight = this.ctx.canvas.height;
    const cacheId = "smaskGroupAt" + this.groupLevel;
    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight***REMOVED***;
    this.suspendedCtx = this.ctx;
    this.ctx = scratchCanvas.context;
    const ctx = this.ctx;
    ctx.setTransform(...getCurrentTransform(this.suspendedCtx***REMOVED******REMOVED***;
    copyCtxState(this.suspendedCtx, ctx***REMOVED***;
    mirrorContextOperations(ctx, this.suspendedCtx***REMOVED***;
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]***REMOVED***;
  ***REMOVED***
  endSMaskMode(***REMOVED*** {
    if (!this.inSMaskMode***REMOVED*** {
      throw new Error("endSMaskMode called while not in smask mode"***REMOVED***;
    ***REMOVED***
    this.ctx._removeMirroring(***REMOVED***;
    copyCtxState(this.ctx, this.suspendedCtx***REMOVED***;
    this.ctx = this.suspendedCtx;
    this.suspendedCtx = null;
  ***REMOVED***
  compose(dirtyBox***REMOVED*** {
    if (!this.current.activeSMask***REMOVED*** {
      return;
    ***REMOVED***
    if (!dirtyBox***REMOVED*** {
      dirtyBox = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    ***REMOVED*** else {
      dirtyBox[0] = Math.floor(dirtyBox[0]***REMOVED***;
      dirtyBox[1] = Math.floor(dirtyBox[1]***REMOVED***;
      dirtyBox[2] = Math.ceil(dirtyBox[2]***REMOVED***;
      dirtyBox[3] = Math.ceil(dirtyBox[3]***REMOVED***;
    ***REMOVED***
    const smask = this.current.activeSMask;
    const suspendedCtx = this.suspendedCtx;
    this.composeSMask(suspendedCtx, smask, this.ctx, dirtyBox***REMOVED***;
    this.ctx.save(***REMOVED***;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height***REMOVED***;
    this.ctx.restore(***REMOVED***;
  ***REMOVED***
  composeSMask(ctx, smask, layerCtx, layerBox***REMOVED*** {
    const layerOffsetX = layerBox[0];
    const layerOffsetY = layerBox[1];
    const layerWidth = layerBox[2] - layerOffsetX;
    const layerHeight = layerBox[3] - layerOffsetY;
    if (layerWidth === 0 || layerHeight === 0***REMOVED*** {
      return;
    ***REMOVED***
    this.genericComposeSMask(smask.context, layerCtx, layerWidth, layerHeight, smask.subtype, smask.backdrop, smask.transferMap, layerOffsetX, layerOffsetY, smask.offsetX, smask.offsetY***REMOVED***;
    ctx.save(***REMOVED***;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
    ctx.drawImage(layerCtx.canvas, 0, 0***REMOVED***;
    ctx.restore(***REMOVED***;
  ***REMOVED***
  genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap, layerOffsetX, layerOffsetY, maskOffsetX, maskOffsetY***REMOVED*** {
    let maskCanvas = maskCtx.canvas;
    let maskX = layerOffsetX - maskOffsetX;
    let maskY = layerOffsetY - maskOffsetY;
    if (backdrop***REMOVED*** {
      const backdropRGB = Util.makeHexColor(...backdrop***REMOVED***;
      if (maskX < 0 || maskY < 0 || maskX + width > maskCanvas.width || maskY + height > maskCanvas.height***REMOVED*** {
        const canvas = this.cachedCanvases.getCanvas("maskExtension", width, height***REMOVED***;
        const ctx = canvas.context;
        ctx.drawImage(maskCanvas, -maskX, -maskY***REMOVED***;
        ctx.globalCompositeOperation = "destination-atop";
        ctx.fillStyle = backdropRGB;
        ctx.fillRect(0, 0, width, height***REMOVED***;
        ctx.globalCompositeOperation = "source-over";
        maskCanvas = canvas.canvas;
        maskX = maskY = 0;
      ***REMOVED*** else {
        maskCtx.save(***REMOVED***;
        maskCtx.globalAlpha = 1;
        maskCtx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
        const clip = new Path2D(***REMOVED***;
        clip.rect(maskX, maskY, width, height***REMOVED***;
        maskCtx.clip(clip***REMOVED***;
        maskCtx.globalCompositeOperation = "destination-atop";
        maskCtx.fillStyle = backdropRGB;
        maskCtx.fillRect(maskX, maskY, width, height***REMOVED***;
        maskCtx.restore(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    layerCtx.save(***REMOVED***;
    layerCtx.globalAlpha = 1;
    layerCtx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
    if (subtype === "Alpha" && transferMap***REMOVED*** {
      layerCtx.filter = this.filterFactory.addAlphaFilter(transferMap***REMOVED***;
    ***REMOVED*** else if (subtype === "Luminosity"***REMOVED*** {
      layerCtx.filter = this.filterFactory.addLuminosityFilter(transferMap***REMOVED***;
    ***REMOVED***
    const clip = new Path2D(***REMOVED***;
    clip.rect(layerOffsetX, layerOffsetY, width, height***REMOVED***;
    layerCtx.clip(clip***REMOVED***;
    layerCtx.globalCompositeOperation = "destination-in";
    layerCtx.drawImage(maskCanvas, maskX, maskY, width, height, layerOffsetX, layerOffsetY, width, height***REMOVED***;
    layerCtx.restore(***REMOVED***;
  ***REMOVED***
  save(***REMOVED*** {
    if (this.inSMaskMode***REMOVED*** {
      copyCtxState(this.ctx, this.suspendedCtx***REMOVED***;
      this.suspendedCtx.save(***REMOVED***;
    ***REMOVED*** else {
      this.ctx.save(***REMOVED***;
    ***REMOVED***
    const old = this.current;
    this.stateStack.push(old***REMOVED***;
    this.current = old.clone(***REMOVED***;
  ***REMOVED***
  restore(***REMOVED*** {
    if (this.stateStack.length === 0 && this.inSMaskMode***REMOVED*** {
      this.endSMaskMode(***REMOVED***;
    ***REMOVED***
    if (this.stateStack.length !== 0***REMOVED*** {
      this.current = this.stateStack.pop(***REMOVED***;
      if (this.inSMaskMode***REMOVED*** {
        this.suspendedCtx.restore(***REMOVED***;
        copyCtxState(this.suspendedCtx, this.ctx***REMOVED***;
      ***REMOVED*** else {
        this.ctx.restore(***REMOVED***;
      ***REMOVED***
      this.checkSMaskState(***REMOVED***;
      this.pendingClip = null;
      this._cachedScaleForStroking[0] = -1;
      this._cachedGetSinglePixelWidth = null;
    ***REMOVED***
  ***REMOVED***
  transform(a, b, c, d, e, f***REMOVED*** {
    this.ctx.transform(a, b, c, d, e, f***REMOVED***;
    this._cachedScaleForStroking[0] = -1;
    this._cachedGetSinglePixelWidth = null;
  ***REMOVED***
  constructPath(ops, args, minMax***REMOVED*** {
    const ctx = this.ctx;
    const current = this.current;
    let x = current.x,
      y = current.y;
    let startX, startY;
    const currentTransform = getCurrentTransform(ctx***REMOVED***;
    const isScalingMatrix = currentTransform[0] === 0 && currentTransform[3] === 0 || currentTransform[1] === 0 && currentTransform[2] === 0;
    const minMaxForBezier = isScalingMatrix ? minMax.slice(0***REMOVED*** : null;
    for (let i = 0, j = 0, ii = ops.length; i < ii; i++***REMOVED*** {
      switch (ops[i] | 0***REMOVED*** {
        case OPS.rectangle:
          x = args[j++];
          y = args[j++];
          const width = args[j++];
          const height = args[j++];
          const xw = x + width;
          const yh = y + height;
          ctx.moveTo(x, y***REMOVED***;
          if (width === 0 || height === 0***REMOVED*** {
            ctx.lineTo(xw, yh***REMOVED***;
          ***REMOVED*** else {
            ctx.lineTo(xw, y***REMOVED***;
            ctx.lineTo(xw, yh***REMOVED***;
            ctx.lineTo(x, yh***REMOVED***;
          ***REMOVED***
          if (!isScalingMatrix***REMOVED*** {
            current.updateRectMinMax(currentTransform, [x, y, xw, yh]***REMOVED***;
          ***REMOVED***
          ctx.closePath(***REMOVED***;
          break;
        case OPS.moveTo:
          x = args[j++];
          y = args[j++];
          ctx.moveTo(x, y***REMOVED***;
          if (!isScalingMatrix***REMOVED*** {
            current.updatePathMinMax(currentTransform, x, y***REMOVED***;
          ***REMOVED***
          break;
        case OPS.lineTo:
          x = args[j++];
          y = args[j++];
          ctx.lineTo(x, y***REMOVED***;
          if (!isScalingMatrix***REMOVED*** {
            current.updatePathMinMax(currentTransform, x, y***REMOVED***;
          ***REMOVED***
          break;
        case OPS.curveTo:
          startX = x;
          startY = y;
          x = args[j + 4];
          y = args[j + 5];
          ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y***REMOVED***;
          current.updateCurvePathMinMax(currentTransform, startX, startY, args[j], args[j + 1], args[j + 2], args[j + 3], x, y, minMaxForBezier***REMOVED***;
          j += 6;
          break;
        case OPS.curveTo2:
          startX = x;
          startY = y;
          ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]***REMOVED***;
          current.updateCurvePathMinMax(currentTransform, startX, startY, x, y, args[j], args[j + 1], args[j + 2], args[j + 3], minMaxForBezier***REMOVED***;
          x = args[j + 2];
          y = args[j + 3];
          j += 4;
          break;
        case OPS.curveTo3:
          startX = x;
          startY = y;
          x = args[j + 2];
          y = args[j + 3];
          ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y***REMOVED***;
          current.updateCurvePathMinMax(currentTransform, startX, startY, args[j], args[j + 1], x, y, x, y, minMaxForBezier***REMOVED***;
          j += 4;
          break;
        case OPS.closePath:
          ctx.closePath(***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED***
    if (isScalingMatrix***REMOVED*** {
      current.updateScalingPathMinMax(currentTransform, minMaxForBezier***REMOVED***;
    ***REMOVED***
    current.setCurrentPoint(x, y***REMOVED***;
  ***REMOVED***
  closePath(***REMOVED*** {
    this.ctx.closePath(***REMOVED***;
  ***REMOVED***
  stroke(consumePath = true***REMOVED*** {
    const ctx = this.ctx;
    const strokeColor = this.current.strokeColor;
    ctx.globalAlpha = this.current.strokeAlpha;
    if (this.contentVisible***REMOVED*** {
      if (typeof strokeColor === "object" && strokeColor?.getPattern***REMOVED*** {
        ctx.save(***REMOVED***;
        ctx.strokeStyle = strokeColor.getPattern(ctx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.STROKE***REMOVED***;
        this.rescaleAndStroke(false***REMOVED***;
        ctx.restore(***REMOVED***;
      ***REMOVED*** else {
        this.rescaleAndStroke(true***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (consumePath***REMOVED*** {
      this.consumePath(this.current.getClippedPathBoundingBox(***REMOVED******REMOVED***;
    ***REMOVED***
    ctx.globalAlpha = this.current.fillAlpha;
  ***REMOVED***
  closeStroke(***REMOVED*** {
    this.closePath(***REMOVED***;
    this.stroke(***REMOVED***;
  ***REMOVED***
  fill(consumePath = true***REMOVED*** {
    const ctx = this.ctx;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    let needRestore = false;
    if (isPatternFill***REMOVED*** {
      ctx.save(***REMOVED***;
      ctx.fillStyle = fillColor.getPattern(ctx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.FILL***REMOVED***;
      needRestore = true;
    ***REMOVED***
    const intersect = this.current.getClippedPathBoundingBox(***REMOVED***;
    if (this.contentVisible && intersect !== null***REMOVED*** {
      if (this.pendingEOFill***REMOVED*** {
        ctx.fill("evenodd"***REMOVED***;
        this.pendingEOFill = false;
      ***REMOVED*** else {
        ctx.fill(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (needRestore***REMOVED*** {
      ctx.restore(***REMOVED***;
    ***REMOVED***
    if (consumePath***REMOVED*** {
      this.consumePath(intersect***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  eoFill(***REMOVED*** {
    this.pendingEOFill = true;
    this.fill(***REMOVED***;
  ***REMOVED***
  fillStroke(***REMOVED*** {
    this.fill(false***REMOVED***;
    this.stroke(false***REMOVED***;
    this.consumePath(***REMOVED***;
  ***REMOVED***
  eoFillStroke(***REMOVED*** {
    this.pendingEOFill = true;
    this.fillStroke(***REMOVED***;
  ***REMOVED***
  closeFillStroke(***REMOVED*** {
    this.closePath(***REMOVED***;
    this.fillStroke(***REMOVED***;
  ***REMOVED***
  closeEOFillStroke(***REMOVED*** {
    this.pendingEOFill = true;
    this.closePath(***REMOVED***;
    this.fillStroke(***REMOVED***;
  ***REMOVED***
  endPath(***REMOVED*** {
    this.consumePath(***REMOVED***;
  ***REMOVED***
  clip(***REMOVED*** {
    this.pendingClip = NORMAL_CLIP;
  ***REMOVED***
  eoClip(***REMOVED*** {
    this.pendingClip = EO_CLIP;
  ***REMOVED***
  beginText(***REMOVED*** {
    this.current.textMatrix = IDENTITY_MATRIX;
    this.current.textMatrixScale = 1;
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  ***REMOVED***
  endText(***REMOVED*** {
    const paths = this.pendingTextPaths;
    const ctx = this.ctx;
    if (paths === undefined***REMOVED*** {
      ctx.beginPath(***REMOVED***;
      return;
    ***REMOVED***
    const newPath = new Path2D(***REMOVED***;
    const invTransf = ctx.getTransform(***REMOVED***.invertSelf(***REMOVED***;
    for (const {
      transform,
      x,
      y,
      fontSize,
      path
    ***REMOVED*** of paths***REMOVED*** {
      newPath.addPath(path, new DOMMatrix(transform***REMOVED***.preMultiplySelf(invTransf***REMOVED***.translate(x, y***REMOVED***.scale(fontSize, -fontSize***REMOVED******REMOVED***;
    ***REMOVED***
    ctx.clip(newPath***REMOVED***;
    ctx.beginPath(***REMOVED***;
    delete this.pendingTextPaths;
  ***REMOVED***
  setCharSpacing(spacing***REMOVED*** {
    this.current.charSpacing = spacing;
  ***REMOVED***
  setWordSpacing(spacing***REMOVED*** {
    this.current.wordSpacing = spacing;
  ***REMOVED***
  setHScale(scale***REMOVED*** {
    this.current.textHScale = scale / 100;
  ***REMOVED***
  setLeading(leading***REMOVED*** {
    this.current.leading = -leading;
  ***REMOVED***
  setFont(fontRefName, size***REMOVED*** {
    const fontObj = this.commonObjs.get(fontRefName***REMOVED***;
    const current = this.current;
    if (!fontObj***REMOVED*** {
      throw new Error(`Can't find font for ${fontRefName***REMOVED***`***REMOVED***;
    ***REMOVED***
    current.fontMatrix = fontObj.fontMatrix || FONT_IDENTITY_MATRIX;
    if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0***REMOVED*** {
      warn("Invalid font matrix for font " + fontRefName***REMOVED***;
    ***REMOVED***
    if (size < 0***REMOVED*** {
      size = -size;
      current.fontDirection = -1;
    ***REMOVED*** else {
      current.fontDirection = 1;
    ***REMOVED***
    this.current.font = fontObj;
    this.current.fontSize = size;
    if (fontObj.isType3Font***REMOVED*** {
      return;
    ***REMOVED***
    const name = fontObj.loadedName || "sans-serif";
    const typeface = fontObj.systemFontInfo?.css || `"${name***REMOVED***", ${fontObj.fallbackName***REMOVED***`;
    let bold = "normal";
    if (fontObj.black***REMOVED*** {
      bold = "900";
    ***REMOVED*** else if (fontObj.bold***REMOVED*** {
      bold = "bold";
    ***REMOVED***
    const italic = fontObj.italic ? "italic" : "normal";
    let browserFontSize = size;
    if (size < MIN_FONT_SIZE***REMOVED*** {
      browserFontSize = MIN_FONT_SIZE;
    ***REMOVED*** else if (size > MAX_FONT_SIZE***REMOVED*** {
      browserFontSize = MAX_FONT_SIZE;
    ***REMOVED***
    this.current.fontSizeScale = size / browserFontSize;
    this.ctx.font = `${italic***REMOVED*** ${bold***REMOVED*** ${browserFontSize***REMOVED***px ${typeface***REMOVED***`;
  ***REMOVED***
  setTextRenderingMode(mode***REMOVED*** {
    this.current.textRenderingMode = mode;
  ***REMOVED***
  setTextRise(rise***REMOVED*** {
    this.current.textRise = rise;
  ***REMOVED***
  moveText(x, y***REMOVED*** {
    this.current.x = this.current.lineX += x;
    this.current.y = this.current.lineY += y;
  ***REMOVED***
  setLeadingMoveText(x, y***REMOVED*** {
    this.setLeading(-y***REMOVED***;
    this.moveText(x, y***REMOVED***;
  ***REMOVED***
  setTextMatrix(a, b, c, d, e, f***REMOVED*** {
    this.current.textMatrix = [a, b, c, d, e, f];
    this.current.textMatrixScale = Math.hypot(a, b***REMOVED***;
    this.current.x = this.current.lineX = 0;
    this.current.y = this.current.lineY = 0;
  ***REMOVED***
  nextLine(***REMOVED*** {
    this.moveText(0, this.current.leading***REMOVED***;
  ***REMOVED***
  #getScaledPath(path, currentTransform, transform***REMOVED*** {
    const newPath = new Path2D(***REMOVED***;
    newPath.addPath(path, new DOMMatrix(transform***REMOVED***.invertSelf(***REMOVED***.multiplySelf(currentTransform***REMOVED******REMOVED***;
    return newPath;
  ***REMOVED***
  paintChar(character, x, y, patternFillTransform, patternStrokeTransform***REMOVED*** {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const textRenderingMode = current.textRenderingMode;
    const fontSize = current.fontSize / current.fontSizeScale;
    const fillStrokeMode = textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
    const isAddToPathSet = !!(textRenderingMode & TextRenderingMode.ADD_TO_PATH_FLAG***REMOVED***;
    const patternFill = current.patternFill && !font.missingFile;
    const patternStroke = current.patternStroke && !font.missingFile;
    let path;
    if (font.disableFontFace || isAddToPathSet || patternFill || patternStroke***REMOVED*** {
      path = font.getPathGenerator(this.commonObjs, character***REMOVED***;
    ***REMOVED***
    if (font.disableFontFace || patternFill || patternStroke***REMOVED*** {
      ctx.save(***REMOVED***;
      ctx.translate(x, y***REMOVED***;
      ctx.scale(fontSize, -fontSize***REMOVED***;
      if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE***REMOVED*** {
        if (patternFillTransform***REMOVED*** {
          const currentTransform = ctx.getTransform(***REMOVED***;
          ctx.setTransform(...patternFillTransform***REMOVED***;
          ctx.fill(this.#getScaledPath(path, currentTransform, patternFillTransform***REMOVED******REMOVED***;
        ***REMOVED*** else {
          ctx.fill(path***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE***REMOVED*** {
        if (patternStrokeTransform***REMOVED*** {
          const currentTransform = ctx.getTransform(***REMOVED***;
          ctx.setTransform(...patternStrokeTransform***REMOVED***;
          ctx.stroke(this.#getScaledPath(path, currentTransform, patternStrokeTransform***REMOVED******REMOVED***;
        ***REMOVED*** else {
          ctx.lineWidth /= fontSize;
          ctx.stroke(path***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      ctx.restore(***REMOVED***;
    ***REMOVED*** else {
      if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE***REMOVED*** {
        ctx.fillText(character, x, y***REMOVED***;
      ***REMOVED***
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE***REMOVED*** {
        ctx.strokeText(character, x, y***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (isAddToPathSet***REMOVED*** {
      const paths = this.pendingTextPaths ||= [];
      paths.push({
        transform: getCurrentTransform(ctx***REMOVED***,
        x,
        y,
        fontSize,
        path
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get isFontSubpixelAAEnabled(***REMOVED*** {
    const {
      context: ctx
    ***REMOVED*** = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10***REMOVED***;
    ctx.scale(1.5, 1***REMOVED***;
    ctx.fillText("I", 0, 10***REMOVED***;
    const data = ctx.getImageData(0, 0, 10, 10***REMOVED***.data;
    let enabled = false;
    for (let i = 3; i < data.length; i += 4***REMOVED*** {
      if (data[i] > 0 && data[i] < 255***REMOVED*** {
        enabled = true;
        break;
      ***REMOVED***
    ***REMOVED***
    return shadow(this, "isFontSubpixelAAEnabled", enabled***REMOVED***;
  ***REMOVED***
  showText(glyphs***REMOVED*** {
    const current = this.current;
    const font = current.font;
    if (font.isType3Font***REMOVED*** {
      return this.showType3Text(glyphs***REMOVED***;
    ***REMOVED***
    const fontSize = current.fontSize;
    if (fontSize === 0***REMOVED*** {
      return undefined;
    ***REMOVED***
    const ctx = this.ctx;
    const fontSizeScale = current.fontSizeScale;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const fontDirection = current.fontDirection;
    const textHScale = current.textHScale * fontDirection;
    const glyphsLength = glyphs.length;
    const vertical = font.vertical;
    const spacingDir = vertical ? 1 : -1;
    const defaultVMetrics = font.defaultVMetrics;
    const widthAdvanceScale = fontSize * current.fontMatrix[0];
    const simpleFillText = current.textRenderingMode === TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
    ctx.save(***REMOVED***;
    ctx.transform(...current.textMatrix***REMOVED***;
    ctx.translate(current.x, current.y + current.textRise***REMOVED***;
    if (fontDirection > 0***REMOVED*** {
      ctx.scale(textHScale, -1***REMOVED***;
    ***REMOVED*** else {
      ctx.scale(textHScale, 1***REMOVED***;
    ***REMOVED***
    let patternFillTransform, patternStrokeTransform;
    if (current.patternFill***REMOVED*** {
      ctx.save(***REMOVED***;
      const pattern = current.fillColor.getPattern(ctx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.FILL***REMOVED***;
      patternFillTransform = getCurrentTransform(ctx***REMOVED***;
      ctx.restore(***REMOVED***;
      ctx.fillStyle = pattern;
    ***REMOVED***
    if (current.patternStroke***REMOVED*** {
      ctx.save(***REMOVED***;
      const pattern = current.strokeColor.getPattern(ctx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.STROKE***REMOVED***;
      patternStrokeTransform = getCurrentTransform(ctx***REMOVED***;
      ctx.restore(***REMOVED***;
      ctx.strokeStyle = pattern;
    ***REMOVED***
    let lineWidth = current.lineWidth;
    const scale = current.textMatrixScale;
    if (scale === 0 || lineWidth === 0***REMOVED*** {
      const fillStrokeMode = current.textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
      if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE***REMOVED*** {
        lineWidth = this.getSinglePixelWidth(***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      lineWidth /= scale;
    ***REMOVED***
    if (fontSizeScale !== 1.0***REMOVED*** {
      ctx.scale(fontSizeScale, fontSizeScale***REMOVED***;
      lineWidth /= fontSizeScale;
    ***REMOVED***
    ctx.lineWidth = lineWidth;
    if (font.isInvalidPDFjsFont***REMOVED*** {
      const chars = [];
      let width = 0;
      for (const glyph of glyphs***REMOVED*** {
        chars.push(glyph.unicode***REMOVED***;
        width += glyph.width;
      ***REMOVED***
      ctx.fillText(chars.join(""***REMOVED***, 0, 0***REMOVED***;
      current.x += width * widthAdvanceScale * textHScale;
      ctx.restore(***REMOVED***;
      this.compose(***REMOVED***;
      return undefined;
    ***REMOVED***
    let x = 0,
      i;
    for (i = 0; i < glyphsLength; ++i***REMOVED*** {
      const glyph = glyphs[i];
      if (typeof glyph === "number"***REMOVED*** {
        x += spacingDir * glyph * fontSize / 1000;
        continue;
      ***REMOVED***
      let restoreNeeded = false;
      const spacing = (glyph.isSpace ? wordSpacing : 0***REMOVED*** + charSpacing;
      const character = glyph.fontChar;
      const accent = glyph.accent;
      let scaledX, scaledY;
      let width = glyph.width;
      if (vertical***REMOVED*** {
        const vmetric = glyph.vmetric || defaultVMetrics;
        const vx = -(glyph.vmetric ? vmetric[1] : width * 0.5***REMOVED*** * widthAdvanceScale;
        const vy = vmetric[2] * widthAdvanceScale;
        width = vmetric ? -vmetric[0] : width;
        scaledX = vx / fontSizeScale;
        scaledY = (x + vy***REMOVED*** / fontSizeScale;
      ***REMOVED*** else {
        scaledX = x / fontSizeScale;
        scaledY = 0;
      ***REMOVED***
      if (font.remeasure && width > 0***REMOVED*** {
        const measuredWidth = ctx.measureText(character***REMOVED***.width * 1000 / fontSize * fontSizeScale;
        if (width < measuredWidth && this.isFontSubpixelAAEnabled***REMOVED*** {
          const characterScaleX = width / measuredWidth;
          restoreNeeded = true;
          ctx.save(***REMOVED***;
          ctx.scale(characterScaleX, 1***REMOVED***;
          scaledX /= characterScaleX;
        ***REMOVED*** else if (width !== measuredWidth***REMOVED*** {
          scaledX += (width - measuredWidth***REMOVED*** / 2000 * fontSize / fontSizeScale;
        ***REMOVED***
      ***REMOVED***
      if (this.contentVisible && (glyph.isInFont || font.missingFile***REMOVED******REMOVED*** {
        if (simpleFillText && !accent***REMOVED*** {
          ctx.fillText(character, scaledX, scaledY***REMOVED***;
        ***REMOVED*** else {
          this.paintChar(character, scaledX, scaledY, patternFillTransform, patternStrokeTransform***REMOVED***;
          if (accent***REMOVED*** {
            const scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
            const scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
            this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternFillTransform, patternStrokeTransform***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      const charWidth = vertical ? width * widthAdvanceScale - spacing * fontDirection : width * widthAdvanceScale + spacing * fontDirection;
      x += charWidth;
      if (restoreNeeded***REMOVED*** {
        ctx.restore(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (vertical***REMOVED*** {
      current.y -= x;
    ***REMOVED*** else {
      current.x += x * textHScale;
    ***REMOVED***
    ctx.restore(***REMOVED***;
    this.compose(***REMOVED***;
    return undefined;
  ***REMOVED***
  showType3Text(glyphs***REMOVED*** {
    const ctx = this.ctx;
    const current = this.current;
    const font = current.font;
    const fontSize = current.fontSize;
    const fontDirection = current.fontDirection;
    const spacingDir = font.vertical ? 1 : -1;
    const charSpacing = current.charSpacing;
    const wordSpacing = current.wordSpacing;
    const textHScale = current.textHScale * fontDirection;
    const fontMatrix = current.fontMatrix || FONT_IDENTITY_MATRIX;
    const glyphsLength = glyphs.length;
    const isTextInvisible = current.textRenderingMode === TextRenderingMode.INVISIBLE;
    let i, glyph, width, spacingLength;
    if (isTextInvisible || fontSize === 0***REMOVED*** {
      return;
    ***REMOVED***
    this._cachedScaleForStroking[0] = -1;
    this._cachedGetSinglePixelWidth = null;
    ctx.save(***REMOVED***;
    ctx.transform(...current.textMatrix***REMOVED***;
    ctx.translate(current.x, current.y***REMOVED***;
    ctx.scale(textHScale, fontDirection***REMOVED***;
    for (i = 0; i < glyphsLength; ++i***REMOVED*** {
      glyph = glyphs[i];
      if (typeof glyph === "number"***REMOVED*** {
        spacingLength = spacingDir * glyph * fontSize / 1000;
        this.ctx.translate(spacingLength, 0***REMOVED***;
        current.x += spacingLength * textHScale;
        continue;
      ***REMOVED***
      const spacing = (glyph.isSpace ? wordSpacing : 0***REMOVED*** + charSpacing;
      const operatorList = font.charProcOperatorList[glyph.operatorListId];
      if (!operatorList***REMOVED*** {
        warn(`Type3 character "${glyph.operatorListId***REMOVED***" is not available.`***REMOVED***;
        continue;
      ***REMOVED***
      if (this.contentVisible***REMOVED*** {
        this.processingType3 = glyph;
        this.save(***REMOVED***;
        ctx.scale(fontSize, fontSize***REMOVED***;
        ctx.transform(...fontMatrix***REMOVED***;
        this.executeOperatorList(operatorList***REMOVED***;
        this.restore(***REMOVED***;
      ***REMOVED***
      const transformed = Util.applyTransform([glyph.width, 0], fontMatrix***REMOVED***;
      width = transformed[0] * fontSize + spacing;
      ctx.translate(width, 0***REMOVED***;
      current.x += width * textHScale;
    ***REMOVED***
    ctx.restore(***REMOVED***;
    this.processingType3 = null;
  ***REMOVED***
  setCharWidth(xWidth, yWidth***REMOVED*** {***REMOVED***
  setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury***REMOVED*** {
    this.ctx.rect(llx, lly, urx - llx, ury - lly***REMOVED***;
    this.ctx.clip(***REMOVED***;
    this.endPath(***REMOVED***;
  ***REMOVED***
  getColorN_Pattern(IR***REMOVED*** {
    let pattern;
    if (IR[0] === "TilingPattern"***REMOVED*** {
      const color = IR[1];
      const baseTransform = this.baseTransform || getCurrentTransform(this.ctx***REMOVED***;
      const canvasGraphicsFactory = {
        createCanvasGraphics: ctx => new CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
          optionalContentConfig: this.optionalContentConfig,
          markedContentStack: this.markedContentStack
        ***REMOVED******REMOVED***
      ***REMOVED***;
      pattern = new TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform***REMOVED***;
    ***REMOVED*** else {
      pattern = this._getPattern(IR[1], IR[2]***REMOVED***;
    ***REMOVED***
    return pattern;
  ***REMOVED***
  setStrokeColorN(***REMOVED*** {
    this.current.strokeColor = this.getColorN_Pattern(arguments***REMOVED***;
    this.current.patternStroke = true;
  ***REMOVED***
  setFillColorN(***REMOVED*** {
    this.current.fillColor = this.getColorN_Pattern(arguments***REMOVED***;
    this.current.patternFill = true;
  ***REMOVED***
  setStrokeRGBColor(r, g, b***REMOVED*** {
    this.ctx.strokeStyle = this.current.strokeColor = Util.makeHexColor(r, g, b***REMOVED***;
    this.current.patternStroke = false;
  ***REMOVED***
  setStrokeTransparent(***REMOVED*** {
    this.ctx.strokeStyle = this.current.strokeColor = "transparent";
    this.current.patternStroke = false;
  ***REMOVED***
  setFillRGBColor(r, g, b***REMOVED*** {
    this.ctx.fillStyle = this.current.fillColor = Util.makeHexColor(r, g, b***REMOVED***;
    this.current.patternFill = false;
  ***REMOVED***
  setFillTransparent(***REMOVED*** {
    this.ctx.fillStyle = this.current.fillColor = "transparent";
    this.current.patternFill = false;
  ***REMOVED***
  _getPattern(objId, matrix = null***REMOVED*** {
    let pattern;
    if (this.cachedPatterns.has(objId***REMOVED******REMOVED*** {
      pattern = this.cachedPatterns.get(objId***REMOVED***;
    ***REMOVED*** else {
      pattern = getShadingPattern(this.getObject(objId***REMOVED******REMOVED***;
      this.cachedPatterns.set(objId, pattern***REMOVED***;
    ***REMOVED***
    if (matrix***REMOVED*** {
      pattern.matrix = matrix;
    ***REMOVED***
    return pattern;
  ***REMOVED***
  shadingFill(objId***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const ctx = this.ctx;
    this.save(***REMOVED***;
    const pattern = this._getPattern(objId***REMOVED***;
    ctx.fillStyle = pattern.getPattern(ctx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.SHADING***REMOVED***;
    const inv = getCurrentTransformInverse(ctx***REMOVED***;
    if (inv***REMOVED*** {
      const {
        width,
        height
      ***REMOVED*** = ctx.canvas;
      const [x0, y0, x1, y1] = Util.getAxialAlignedBoundingBox([0, 0, width, height], inv***REMOVED***;
      this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0***REMOVED***;
    ***REMOVED*** else {
      this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10***REMOVED***;
    ***REMOVED***
    this.compose(this.current.getClippedPathBoundingBox(***REMOVED******REMOVED***;
    this.restore(***REMOVED***;
  ***REMOVED***
  beginInlineImage(***REMOVED*** {
    unreachable("Should not call beginInlineImage"***REMOVED***;
  ***REMOVED***
  beginImageData(***REMOVED*** {
    unreachable("Should not call beginImageData"***REMOVED***;
  ***REMOVED***
  paintFormXObjectBegin(matrix, bbox***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.save(***REMOVED***;
    this.baseTransformStack.push(this.baseTransform***REMOVED***;
    if (matrix***REMOVED*** {
      this.transform(...matrix***REMOVED***;
    ***REMOVED***
    this.baseTransform = getCurrentTransform(this.ctx***REMOVED***;
    if (bbox***REMOVED*** {
      const width = bbox[2] - bbox[0];
      const height = bbox[3] - bbox[1];
      this.ctx.rect(bbox[0], bbox[1], width, height***REMOVED***;
      this.current.updateRectMinMax(getCurrentTransform(this.ctx***REMOVED***, bbox***REMOVED***;
      this.clip(***REMOVED***;
      this.endPath(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  paintFormXObjectEnd(***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.restore(***REMOVED***;
    this.baseTransform = this.baseTransformStack.pop(***REMOVED***;
  ***REMOVED***
  beginGroup(group***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.save(***REMOVED***;
    if (this.inSMaskMode***REMOVED*** {
      this.endSMaskMode(***REMOVED***;
      this.current.activeSMask = null;
    ***REMOVED***
    const currentCtx = this.ctx;
    if (!group.isolated***REMOVED*** {
      info("TODO: Support non-isolated groups."***REMOVED***;
    ***REMOVED***
    if (group.knockout***REMOVED*** {
      warn("Knockout groups not supported."***REMOVED***;
    ***REMOVED***
    const currentTransform = getCurrentTransform(currentCtx***REMOVED***;
    if (group.matrix***REMOVED*** {
      currentCtx.transform(...group.matrix***REMOVED***;
    ***REMOVED***
    if (!group.bbox***REMOVED*** {
      throw new Error("Bounding box is required."***REMOVED***;
    ***REMOVED***
    let bounds = Util.getAxialAlignedBoundingBox(group.bbox, getCurrentTransform(currentCtx***REMOVED******REMOVED***;
    const canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
    bounds = Util.intersect(bounds, canvasBounds***REMOVED*** || [0, 0, 0, 0];
    const offsetX = Math.floor(bounds[0]***REMOVED***;
    const offsetY = Math.floor(bounds[1]***REMOVED***;
    const drawnWidth = Math.max(Math.ceil(bounds[2]***REMOVED*** - offsetX, 1***REMOVED***;
    const drawnHeight = Math.max(Math.ceil(bounds[3]***REMOVED*** - offsetY, 1***REMOVED***;
    this.current.startNewPathAndClipBox([0, 0, drawnWidth, drawnHeight]***REMOVED***;
    let cacheId = "groupAt" + this.groupLevel;
    if (group.smask***REMOVED*** {
      cacheId += "_smask_" + this.smaskCounter++ % 2;
    ***REMOVED***
    const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight***REMOVED***;
    const groupCtx = scratchCanvas.context;
    groupCtx.translate(-offsetX, -offsetY***REMOVED***;
    groupCtx.transform(...currentTransform***REMOVED***;
    if (group.smask***REMOVED*** {
      this.smaskStack.push({
        canvas: scratchCanvas.canvas,
        context: groupCtx,
        offsetX,
        offsetY,
        subtype: group.smask.subtype,
        backdrop: group.smask.backdrop,
        transferMap: group.smask.transferMap || null,
        startTransformInverse: null
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      currentCtx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
      currentCtx.translate(offsetX, offsetY***REMOVED***;
      currentCtx.save(***REMOVED***;
    ***REMOVED***
    copyCtxState(currentCtx, groupCtx***REMOVED***;
    this.ctx = groupCtx;
    this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]***REMOVED***;
    this.groupStack.push(currentCtx***REMOVED***;
    this.groupLevel++;
  ***REMOVED***
  endGroup(group***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.groupLevel--;
    const groupCtx = this.ctx;
    const ctx = this.groupStack.pop(***REMOVED***;
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    if (group.smask***REMOVED*** {
      this.tempSMask = this.smaskStack.pop(***REMOVED***;
      this.restore(***REMOVED***;
    ***REMOVED*** else {
      this.ctx.restore(***REMOVED***;
      const currentMtx = getCurrentTransform(this.ctx***REMOVED***;
      this.restore(***REMOVED***;
      this.ctx.save(***REMOVED***;
      this.ctx.setTransform(...currentMtx***REMOVED***;
      const dirtyBox = Util.getAxialAlignedBoundingBox([0, 0, groupCtx.canvas.width, groupCtx.canvas.height], currentMtx***REMOVED***;
      this.ctx.drawImage(groupCtx.canvas, 0, 0***REMOVED***;
      this.ctx.restore(***REMOVED***;
      this.compose(dirtyBox***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  beginAnnotation(id, rect, transform, matrix, hasOwnCanvas***REMOVED*** {
    this.#restoreInitialState(***REMOVED***;
    resetCtxToDefault(this.ctx***REMOVED***;
    this.ctx.save(***REMOVED***;
    this.save(***REMOVED***;
    if (this.baseTransform***REMOVED*** {
      this.ctx.setTransform(...this.baseTransform***REMOVED***;
    ***REMOVED***
    if (rect***REMOVED*** {
      const width = rect[2] - rect[0];
      const height = rect[3] - rect[1];
      if (hasOwnCanvas && this.annotationCanvasMap***REMOVED*** {
        transform = transform.slice(***REMOVED***;
        transform[4] -= rect[0];
        transform[5] -= rect[1];
        rect = rect.slice(***REMOVED***;
        rect[0] = rect[1] = 0;
        rect[2] = width;
        rect[3] = height;
        const [scaleX, scaleY] = Util.singularValueDecompose2dScale(getCurrentTransform(this.ctx***REMOVED******REMOVED***;
        const {
          viewportScale
        ***REMOVED*** = this;
        const canvasWidth = Math.ceil(width * this.outputScaleX * viewportScale***REMOVED***;
        const canvasHeight = Math.ceil(height * this.outputScaleY * viewportScale***REMOVED***;
        this.annotationCanvas = this.canvasFactory.create(canvasWidth, canvasHeight***REMOVED***;
        const {
          canvas,
          context
        ***REMOVED*** = this.annotationCanvas;
        this.annotationCanvasMap.set(id, canvas***REMOVED***;
        this.annotationCanvas.savedCtx = this.ctx;
        this.ctx = context;
        this.ctx.save(***REMOVED***;
        this.ctx.setTransform(scaleX, 0, 0, -scaleY, 0, height * scaleY***REMOVED***;
        resetCtxToDefault(this.ctx***REMOVED***;
      ***REMOVED*** else {
        resetCtxToDefault(this.ctx***REMOVED***;
        this.endPath(***REMOVED***;
        this.ctx.rect(rect[0], rect[1], width, height***REMOVED***;
        this.ctx.clip(***REMOVED***;
        this.ctx.beginPath(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.current = new CanvasExtraState(this.ctx.canvas.width, this.ctx.canvas.height***REMOVED***;
    this.transform(...transform***REMOVED***;
    this.transform(...matrix***REMOVED***;
  ***REMOVED***
  endAnnotation(***REMOVED*** {
    if (this.annotationCanvas***REMOVED*** {
      this.ctx.restore(***REMOVED***;
      this.#drawFilter(***REMOVED***;
      this.ctx = this.annotationCanvas.savedCtx;
      delete this.annotationCanvas.savedCtx;
      delete this.annotationCanvas;
    ***REMOVED***
  ***REMOVED***
  paintImageMaskXObject(img***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const count = img.count;
    img = this.getObject(img.data, img***REMOVED***;
    img.count = count;
    const ctx = this.ctx;
    const glyph = this.processingType3;
    if (glyph***REMOVED*** {
      if (glyph.compiled === undefined***REMOVED*** {
        glyph.compiled = compileType3Glyph(img***REMOVED***;
      ***REMOVED***
      if (glyph.compiled***REMOVED*** {
        glyph.compiled(ctx***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    const mask = this._createMaskCanvas(img***REMOVED***;
    const maskCanvas = mask.canvas;
    ctx.save(***REMOVED***;
    ctx.setTransform(1, 0, 0, 1, 0, 0***REMOVED***;
    ctx.drawImage(maskCanvas, mask.offsetX, mask.offsetY***REMOVED***;
    ctx.restore(***REMOVED***;
    this.compose(***REMOVED***;
  ***REMOVED***
  paintImageMaskXObjectRepeat(img, scaleX, skewX = 0, skewY = 0, scaleY, positions***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    img = this.getObject(img.data, img***REMOVED***;
    const ctx = this.ctx;
    ctx.save(***REMOVED***;
    const currentTransform = getCurrentTransform(ctx***REMOVED***;
    ctx.transform(scaleX, skewX, skewY, scaleY, 0, 0***REMOVED***;
    const mask = this._createMaskCanvas(img***REMOVED***;
    ctx.setTransform(1, 0, 0, 1, mask.offsetX - currentTransform[4], mask.offsetY - currentTransform[5]***REMOVED***;
    for (let i = 0, ii = positions.length; i < ii; i += 2***REMOVED*** {
      const trans = Util.transform(currentTransform, [scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]]***REMOVED***;
      const [x, y] = Util.applyTransform([0, 0], trans***REMOVED***;
      ctx.drawImage(mask.canvas, x, y***REMOVED***;
    ***REMOVED***
    ctx.restore(***REMOVED***;
    this.compose(***REMOVED***;
  ***REMOVED***
  paintImageMaskXObjectGroup(images***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const ctx = this.ctx;
    const fillColor = this.current.fillColor;
    const isPatternFill = this.current.patternFill;
    for (const image of images***REMOVED*** {
      const {
        data,
        width,
        height,
        transform
      ***REMOVED*** = image;
      const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height***REMOVED***;
      const maskCtx = maskCanvas.context;
      maskCtx.save(***REMOVED***;
      const img = this.getObject(data, image***REMOVED***;
      putBinaryImageMask(maskCtx, img***REMOVED***;
      maskCtx.globalCompositeOperation = "source-in";
      maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this, getCurrentTransformInverse(ctx***REMOVED***, PathType.FILL***REMOVED*** : fillColor;
      maskCtx.fillRect(0, 0, width, height***REMOVED***;
      maskCtx.restore(***REMOVED***;
      ctx.save(***REMOVED***;
      ctx.transform(...transform***REMOVED***;
      ctx.scale(1, -1***REMOVED***;
      drawImageAtIntegerCoords(ctx, maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1***REMOVED***;
      ctx.restore(***REMOVED***;
    ***REMOVED***
    this.compose(***REMOVED***;
  ***REMOVED***
  paintImageXObject(objId***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const imgData = this.getObject(objId***REMOVED***;
    if (!imgData***REMOVED*** {
      warn("Dependent image isn't ready yet"***REMOVED***;
      return;
    ***REMOVED***
    this.paintInlineImageXObject(imgData***REMOVED***;
  ***REMOVED***
  paintImageXObjectRepeat(objId, scaleX, scaleY, positions***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const imgData = this.getObject(objId***REMOVED***;
    if (!imgData***REMOVED*** {
      warn("Dependent image isn't ready yet"***REMOVED***;
      return;
    ***REMOVED***
    const width = imgData.width;
    const height = imgData.height;
    const map = [];
    for (let i = 0, ii = positions.length; i < ii; i += 2***REMOVED*** {
      map.push({
        transform: [scaleX, 0, 0, scaleY, positions[i], positions[i + 1]],
        x: 0,
        y: 0,
        w: width,
        h: height
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.paintInlineImageXObjectGroup(imgData, map***REMOVED***;
  ***REMOVED***
  applyTransferMapsToCanvas(ctx***REMOVED*** {
    if (this.current.transferMaps !== "none"***REMOVED*** {
      ctx.filter = this.current.transferMaps;
      ctx.drawImage(ctx.canvas, 0, 0***REMOVED***;
      ctx.filter = "none";
    ***REMOVED***
    return ctx.canvas;
  ***REMOVED***
  applyTransferMapsToBitmap(imgData***REMOVED*** {
    if (this.current.transferMaps === "none"***REMOVED*** {
      return imgData.bitmap;
    ***REMOVED***
    const {
      bitmap,
      width,
      height
    ***REMOVED*** = imgData;
    const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height***REMOVED***;
    const tmpCtx = tmpCanvas.context;
    tmpCtx.filter = this.current.transferMaps;
    tmpCtx.drawImage(bitmap, 0, 0***REMOVED***;
    tmpCtx.filter = "none";
    return tmpCanvas.canvas;
  ***REMOVED***
  paintInlineImageXObject(imgData***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const width = imgData.width;
    const height = imgData.height;
    const ctx = this.ctx;
    this.save(***REMOVED***;
    if (!isNodeJS***REMOVED*** {
      const {
        filter
      ***REMOVED*** = ctx;
      if (filter !== "none" && filter !== ""***REMOVED*** {
        ctx.filter = "none";
      ***REMOVED***
    ***REMOVED***
    ctx.scale(1 / width, -1 / height***REMOVED***;
    let imgToPaint;
    if (imgData.bitmap***REMOVED*** {
      imgToPaint = this.applyTransferMapsToBitmap(imgData***REMOVED***;
    ***REMOVED*** else if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data***REMOVED*** {
      imgToPaint = imgData;
    ***REMOVED*** else {
      const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height***REMOVED***;
      const tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData***REMOVED***;
      imgToPaint = this.applyTransferMapsToCanvas(tmpCtx***REMOVED***;
    ***REMOVED***
    const scaled = this._scaleImage(imgToPaint, getCurrentTransformInverse(ctx***REMOVED******REMOVED***;
    ctx.imageSmoothingEnabled = getImageSmoothingEnabled(getCurrentTransform(ctx***REMOVED***, imgData.interpolate***REMOVED***;
    drawImageAtIntegerCoords(ctx, scaled.img, 0, 0, scaled.paintWidth, scaled.paintHeight, 0, -height, width, height***REMOVED***;
    this.compose(***REMOVED***;
    this.restore(***REMOVED***;
  ***REMOVED***
  paintInlineImageXObjectGroup(imgData, map***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    const ctx = this.ctx;
    let imgToPaint;
    if (imgData.bitmap***REMOVED*** {
      imgToPaint = imgData.bitmap;
    ***REMOVED*** else {
      const w = imgData.width;
      const h = imgData.height;
      const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h***REMOVED***;
      const tmpCtx = tmpCanvas.context;
      putBinaryImageData(tmpCtx, imgData***REMOVED***;
      imgToPaint = this.applyTransferMapsToCanvas(tmpCtx***REMOVED***;
    ***REMOVED***
    for (const entry of map***REMOVED*** {
      ctx.save(***REMOVED***;
      ctx.transform(...entry.transform***REMOVED***;
      ctx.scale(1, -1***REMOVED***;
      drawImageAtIntegerCoords(ctx, imgToPaint, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1***REMOVED***;
      ctx.restore(***REMOVED***;
    ***REMOVED***
    this.compose(***REMOVED***;
  ***REMOVED***
  paintSolidColorImageMask(***REMOVED*** {
    if (!this.contentVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.ctx.fillRect(0, 0, 1, 1***REMOVED***;
    this.compose(***REMOVED***;
  ***REMOVED***
  markPoint(tag***REMOVED*** {***REMOVED***
  markPointProps(tag, properties***REMOVED*** {***REMOVED***
  beginMarkedContent(tag***REMOVED*** {
    this.markedContentStack.push({
      visible: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  beginMarkedContentProps(tag, properties***REMOVED*** {
    if (tag === "OC"***REMOVED*** {
      this.markedContentStack.push({
        visible: this.optionalContentConfig.isVisible(properties***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this.markedContentStack.push({
        visible: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.contentVisible = this.isContentVisible(***REMOVED***;
  ***REMOVED***
  endMarkedContent(***REMOVED*** {
    this.markedContentStack.pop(***REMOVED***;
    this.contentVisible = this.isContentVisible(***REMOVED***;
  ***REMOVED***
  beginCompat(***REMOVED*** {***REMOVED***
  endCompat(***REMOVED*** {***REMOVED***
  consumePath(clipBox***REMOVED*** {
    const isEmpty = this.current.isEmptyClip(***REMOVED***;
    if (this.pendingClip***REMOVED*** {
      this.current.updateClipFromPath(***REMOVED***;
    ***REMOVED***
    if (!this.pendingClip***REMOVED*** {
      this.compose(clipBox***REMOVED***;
    ***REMOVED***
    const ctx = this.ctx;
    if (this.pendingClip***REMOVED*** {
      if (!isEmpty***REMOVED*** {
        if (this.pendingClip === EO_CLIP***REMOVED*** {
          ctx.clip("evenodd"***REMOVED***;
        ***REMOVED*** else {
          ctx.clip(***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      this.pendingClip = null;
    ***REMOVED***
    this.current.startNewPathAndClipBox(this.current.clipBox***REMOVED***;
    ctx.beginPath(***REMOVED***;
  ***REMOVED***
  getSinglePixelWidth(***REMOVED*** {
    if (!this._cachedGetSinglePixelWidth***REMOVED*** {
      const m = getCurrentTransform(this.ctx***REMOVED***;
      if (m[1] === 0 && m[2] === 0***REMOVED*** {
        this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(m[0]***REMOVED***, Math.abs(m[3]***REMOVED******REMOVED***;
      ***REMOVED*** else {
        const absDet = Math.abs(m[0] * m[3] - m[2] * m[1]***REMOVED***;
        const normX = Math.hypot(m[0], m[2]***REMOVED***;
        const normY = Math.hypot(m[1], m[3]***REMOVED***;
        this._cachedGetSinglePixelWidth = Math.max(normX, normY***REMOVED*** / absDet;
      ***REMOVED***
    ***REMOVED***
    return this._cachedGetSinglePixelWidth;
  ***REMOVED***
  getScaleForStroking(***REMOVED*** {
    if (this._cachedScaleForStroking[0] === -1***REMOVED*** {
      const {
        lineWidth
      ***REMOVED*** = this.current;
      const {
        a,
        b,
        c,
        d
      ***REMOVED*** = this.ctx.getTransform(***REMOVED***;
      let scaleX, scaleY;
      if (b === 0 && c === 0***REMOVED*** {
        const normX = Math.abs(a***REMOVED***;
        const normY = Math.abs(d***REMOVED***;
        if (normX === normY***REMOVED*** {
          if (lineWidth === 0***REMOVED*** {
            scaleX = scaleY = 1 / normX;
          ***REMOVED*** else {
            const scaledLineWidth = normX * lineWidth;
            scaleX = scaleY = scaledLineWidth < 1 ? 1 / scaledLineWidth : 1;
          ***REMOVED***
        ***REMOVED*** else if (lineWidth === 0***REMOVED*** {
          scaleX = 1 / normX;
          scaleY = 1 / normY;
        ***REMOVED*** else {
          const scaledXLineWidth = normX * lineWidth;
          const scaledYLineWidth = normY * lineWidth;
          scaleX = scaledXLineWidth < 1 ? 1 / scaledXLineWidth : 1;
          scaleY = scaledYLineWidth < 1 ? 1 / scaledYLineWidth : 1;
        ***REMOVED***
      ***REMOVED*** else {
        const absDet = Math.abs(a * d - b * c***REMOVED***;
        const normX = Math.hypot(a, b***REMOVED***;
        const normY = Math.hypot(c, d***REMOVED***;
        if (lineWidth === 0***REMOVED*** {
          scaleX = normY / absDet;
          scaleY = normX / absDet;
        ***REMOVED*** else {
          const baseArea = lineWidth * absDet;
          scaleX = normY > baseArea ? normY / baseArea : 1;
          scaleY = normX > baseArea ? normX / baseArea : 1;
        ***REMOVED***
      ***REMOVED***
      this._cachedScaleForStroking[0] = scaleX;
      this._cachedScaleForStroking[1] = scaleY;
    ***REMOVED***
    return this._cachedScaleForStroking;
  ***REMOVED***
  rescaleAndStroke(saveRestore***REMOVED*** {
    const {
      ctx
    ***REMOVED*** = this;
    const {
      lineWidth
    ***REMOVED*** = this.current;
    const [scaleX, scaleY] = this.getScaleForStroking(***REMOVED***;
    ctx.lineWidth = lineWidth || 1;
    if (scaleX === 1 && scaleY === 1***REMOVED*** {
      ctx.stroke(***REMOVED***;
      return;
    ***REMOVED***
    const dashes = ctx.getLineDash(***REMOVED***;
    if (saveRestore***REMOVED*** {
      ctx.save(***REMOVED***;
    ***REMOVED***
    ctx.scale(scaleX, scaleY***REMOVED***;
    if (dashes.length > 0***REMOVED*** {
      const scale = Math.max(scaleX, scaleY***REMOVED***;
      ctx.setLineDash(dashes.map(x => x / scale***REMOVED******REMOVED***;
      ctx.lineDashOffset /= scale;
    ***REMOVED***
    ctx.stroke(***REMOVED***;
    if (saveRestore***REMOVED*** {
      ctx.restore(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  isContentVisible(***REMOVED*** {
    for (let i = this.markedContentStack.length - 1; i >= 0; i--***REMOVED*** {
      if (!this.markedContentStack[i].visible***REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    return true;
  ***REMOVED***
***REMOVED***
for (const op in OPS***REMOVED*** {
  if (CanvasGraphics.prototype[op] !== undefined***REMOVED*** {
    CanvasGraphics.prototype[OPS[op]] = CanvasGraphics.prototype[op];
  ***REMOVED***
***REMOVED***

;// ./src/display/worker_options.js
class GlobalWorkerOptions {
  static #port = null;
  static #src = "";
  static get workerPort(***REMOVED*** {
    return this.#port;
  ***REMOVED***
  static set workerPort(val***REMOVED*** {
    if (!(typeof Worker !== "undefined" && val instanceof Worker***REMOVED*** && val !== null***REMOVED*** {
      throw new Error("Invalid `workerPort` type."***REMOVED***;
    ***REMOVED***
    this.#port = val;
  ***REMOVED***
  static get workerSrc(***REMOVED*** {
    return this.#src;
  ***REMOVED***
  static set workerSrc(val***REMOVED*** {
    if (typeof val !== "string"***REMOVED*** {
      throw new Error("Invalid `workerSrc` type."***REMOVED***;
    ***REMOVED***
    this.#src = val;
  ***REMOVED***
***REMOVED***

;// ./src/display/metadata.js

class Metadata {
  #metadataMap;
  #data;
  constructor({
    parsedData,
    rawData
  ***REMOVED******REMOVED*** {
    this.#metadataMap = parsedData;
    this.#data = rawData;
  ***REMOVED***
  getRaw(***REMOVED*** {
    return this.#data;
  ***REMOVED***
  get(name***REMOVED*** {
    return this.#metadataMap.get(name***REMOVED*** ?? null;
  ***REMOVED***
  getAll(***REMOVED*** {
    return objectFromMap(this.#metadataMap***REMOVED***;
  ***REMOVED***
  has(name***REMOVED*** {
    return this.#metadataMap.has(name***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/optional_content_config.js


const INTERNAL = Symbol("INTERNAL"***REMOVED***;
class OptionalContentGroup {
  #isDisplay = false;
  #isPrint = false;
  #userSet = false;
  #visible = true;
  constructor(renderingIntent, {
    name,
    intent,
    usage,
    rbGroups
  ***REMOVED******REMOVED*** {
    this.#isDisplay = !!(renderingIntent & RenderingIntentFlag.DISPLAY***REMOVED***;
    this.#isPrint = !!(renderingIntent & RenderingIntentFlag.PRINT***REMOVED***;
    this.name = name;
    this.intent = intent;
    this.usage = usage;
    this.rbGroups = rbGroups;
  ***REMOVED***
  get visible(***REMOVED*** {
    if (this.#userSet***REMOVED*** {
      return this.#visible;
    ***REMOVED***
    if (!this.#visible***REMOVED*** {
      return false;
    ***REMOVED***
    const {
      print,
      view
    ***REMOVED*** = this.usage;
    if (this.#isDisplay***REMOVED*** {
      return view?.viewState !== "OFF";
    ***REMOVED*** else if (this.#isPrint***REMOVED*** {
      return print?.printState !== "OFF";
    ***REMOVED***
    return true;
  ***REMOVED***
  _setVisible(internal, visible, userSet = false***REMOVED*** {
    if (internal !== INTERNAL***REMOVED*** {
      unreachable("Internal method `_setVisible` called."***REMOVED***;
    ***REMOVED***
    this.#userSet = userSet;
    this.#visible = visible;
  ***REMOVED***
***REMOVED***
class OptionalContentConfig {
  #cachedGetHash = null;
  #groups = new Map(***REMOVED***;
  #initialHash = null;
  #order = null;
  constructor(data, renderingIntent = RenderingIntentFlag.DISPLAY***REMOVED*** {
    this.renderingIntent = renderingIntent;
    this.name = null;
    this.creator = null;
    if (data === null***REMOVED*** {
      return;
    ***REMOVED***
    this.name = data.name;
    this.creator = data.creator;
    this.#order = data.order;
    for (const group of data.groups***REMOVED*** {
      this.#groups.set(group.id, new OptionalContentGroup(renderingIntent, group***REMOVED******REMOVED***;
    ***REMOVED***
    if (data.baseState === "OFF"***REMOVED*** {
      for (const group of this.#groups.values(***REMOVED******REMOVED*** {
        group._setVisible(INTERNAL, false***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    for (const on of data.on***REMOVED*** {
      this.#groups.get(on***REMOVED***._setVisible(INTERNAL, true***REMOVED***;
    ***REMOVED***
    for (const off of data.off***REMOVED*** {
      this.#groups.get(off***REMOVED***._setVisible(INTERNAL, false***REMOVED***;
    ***REMOVED***
    this.#initialHash = this.getHash(***REMOVED***;
  ***REMOVED***
  #evaluateVisibilityExpression(array***REMOVED*** {
    const length = array.length;
    if (length < 2***REMOVED*** {
      return true;
    ***REMOVED***
    const operator = array[0];
    for (let i = 1; i < length; i++***REMOVED*** {
      const element = array[i];
      let state;
      if (Array.isArray(element***REMOVED******REMOVED*** {
        state = this.#evaluateVisibilityExpression(element***REMOVED***;
      ***REMOVED*** else if (this.#groups.has(element***REMOVED******REMOVED*** {
        state = this.#groups.get(element***REMOVED***.visible;
      ***REMOVED*** else {
        warn(`Optional content group not found: ${element***REMOVED***`***REMOVED***;
        return true;
      ***REMOVED***
      switch (operator***REMOVED*** {
        case "And":
          if (!state***REMOVED*** {
            return false;
          ***REMOVED***
          break;
        case "Or":
          if (state***REMOVED*** {
            return true;
          ***REMOVED***
          break;
        case "Not":
          return !state;
        default:
          return true;
      ***REMOVED***
    ***REMOVED***
    return operator === "And";
  ***REMOVED***
  isVisible(group***REMOVED*** {
    if (this.#groups.size === 0***REMOVED*** {
      return true;
    ***REMOVED***
    if (!group***REMOVED*** {
      info("Optional content group not defined."***REMOVED***;
      return true;
    ***REMOVED***
    if (group.type === "OCG"***REMOVED*** {
      if (!this.#groups.has(group.id***REMOVED******REMOVED*** {
        warn(`Optional content group not found: ${group.id***REMOVED***`***REMOVED***;
        return true;
      ***REMOVED***
      return this.#groups.get(group.id***REMOVED***.visible;
    ***REMOVED*** else if (group.type === "OCMD"***REMOVED*** {
      if (group.expression***REMOVED*** {
        return this.#evaluateVisibilityExpression(group.expression***REMOVED***;
      ***REMOVED***
      if (!group.policy || group.policy === "AnyOn"***REMOVED*** {
        for (const id of group.ids***REMOVED*** {
          if (!this.#groups.has(id***REMOVED******REMOVED*** {
            warn(`Optional content group not found: ${id***REMOVED***`***REMOVED***;
            return true;
          ***REMOVED***
          if (this.#groups.get(id***REMOVED***.visible***REMOVED*** {
            return true;
          ***REMOVED***
        ***REMOVED***
        return false;
      ***REMOVED*** else if (group.policy === "AllOn"***REMOVED*** {
        for (const id of group.ids***REMOVED*** {
          if (!this.#groups.has(id***REMOVED******REMOVED*** {
            warn(`Optional content group not found: ${id***REMOVED***`***REMOVED***;
            return true;
          ***REMOVED***
          if (!this.#groups.get(id***REMOVED***.visible***REMOVED*** {
            return false;
          ***REMOVED***
        ***REMOVED***
        return true;
      ***REMOVED*** else if (group.policy === "AnyOff"***REMOVED*** {
        for (const id of group.ids***REMOVED*** {
          if (!this.#groups.has(id***REMOVED******REMOVED*** {
            warn(`Optional content group not found: ${id***REMOVED***`***REMOVED***;
            return true;
          ***REMOVED***
          if (!this.#groups.get(id***REMOVED***.visible***REMOVED*** {
            return true;
          ***REMOVED***
        ***REMOVED***
        return false;
      ***REMOVED*** else if (group.policy === "AllOff"***REMOVED*** {
        for (const id of group.ids***REMOVED*** {
          if (!this.#groups.has(id***REMOVED******REMOVED*** {
            warn(`Optional content group not found: ${id***REMOVED***`***REMOVED***;
            return true;
          ***REMOVED***
          if (this.#groups.get(id***REMOVED***.visible***REMOVED*** {
            return false;
          ***REMOVED***
        ***REMOVED***
        return true;
      ***REMOVED***
      warn(`Unknown optional content policy ${group.policy***REMOVED***.`***REMOVED***;
      return true;
    ***REMOVED***
    warn(`Unknown group type ${group.type***REMOVED***.`***REMOVED***;
    return true;
  ***REMOVED***
  setVisibility(id, visible = true, preserveRB = true***REMOVED*** {
    const group = this.#groups.get(id***REMOVED***;
    if (!group***REMOVED*** {
      warn(`Optional content group not found: ${id***REMOVED***`***REMOVED***;
      return;
    ***REMOVED***
    if (preserveRB && visible && group.rbGroups.length***REMOVED*** {
      for (const rbGroup of group.rbGroups***REMOVED*** {
        for (const otherId of rbGroup***REMOVED*** {
          if (otherId !== id***REMOVED*** {
            this.#groups.get(otherId***REMOVED***?._setVisible(INTERNAL, false, true***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    group._setVisible(INTERNAL, !!visible, true***REMOVED***;
    this.#cachedGetHash = null;
  ***REMOVED***
  setOCGState({
    state,
    preserveRB
  ***REMOVED******REMOVED*** {
    let operator;
    for (const elem of state***REMOVED*** {
      switch (elem***REMOVED*** {
        case "ON":
        case "OFF":
        case "Toggle":
          operator = elem;
          continue;
      ***REMOVED***
      const group = this.#groups.get(elem***REMOVED***;
      if (!group***REMOVED*** {
        continue;
      ***REMOVED***
      switch (operator***REMOVED*** {
        case "ON":
          this.setVisibility(elem, true, preserveRB***REMOVED***;
          break;
        case "OFF":
          this.setVisibility(elem, false, preserveRB***REMOVED***;
          break;
        case "Toggle":
          this.setVisibility(elem, !group.visible, preserveRB***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED***
    this.#cachedGetHash = null;
  ***REMOVED***
  get hasInitialVisibility(***REMOVED*** {
    return this.#initialHash === null || this.getHash(***REMOVED*** === this.#initialHash;
  ***REMOVED***
  getOrder(***REMOVED*** {
    if (!this.#groups.size***REMOVED*** {
      return null;
    ***REMOVED***
    if (this.#order***REMOVED*** {
      return this.#order.slice(***REMOVED***;
    ***REMOVED***
    return [...this.#groups.keys(***REMOVED***];
  ***REMOVED***
  getGroups(***REMOVED*** {
    return this.#groups.size > 0 ? objectFromMap(this.#groups***REMOVED*** : null;
  ***REMOVED***
  getGroup(id***REMOVED*** {
    return this.#groups.get(id***REMOVED*** || null;
  ***REMOVED***
  getHash(***REMOVED*** {
    if (this.#cachedGetHash !== null***REMOVED*** {
      return this.#cachedGetHash;
    ***REMOVED***
    const hash = new MurmurHash3_64(***REMOVED***;
    for (const [id, group] of this.#groups***REMOVED*** {
      hash.update(`${id***REMOVED***:${group.visible***REMOVED***`***REMOVED***;
    ***REMOVED***
    return this.#cachedGetHash = hash.hexdigest(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/transport_stream.js


class PDFDataTransportStream {
  constructor(pdfDataRangeTransport, {
    disableRange = false,
    disableStream = false
  ***REMOVED******REMOVED*** {
    assert(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.'***REMOVED***;
    const {
      length,
      initialData,
      progressiveDone,
      contentDispositionFilename
    ***REMOVED*** = pdfDataRangeTransport;
    this._queuedChunks = [];
    this._progressiveDone = progressiveDone;
    this._contentDispositionFilename = contentDispositionFilename;
    if (initialData?.length > 0***REMOVED*** {
      const buffer = initialData instanceof Uint8Array && initialData.byteLength === initialData.buffer.byteLength ? initialData.buffer : new Uint8Array(initialData***REMOVED***.buffer;
      this._queuedChunks.push(buffer***REMOVED***;
    ***REMOVED***
    this._pdfDataRangeTransport = pdfDataRangeTransport;
    this._isStreamingSupported = !disableStream;
    this._isRangeSupported = !disableRange;
    this._contentLength = length;
    this._fullRequestReader = null;
    this._rangeReaders = [];
    pdfDataRangeTransport.addRangeListener((begin, chunk***REMOVED*** => {
      this._onReceiveData({
        begin,
        chunk
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    pdfDataRangeTransport.addProgressListener((loaded, total***REMOVED*** => {
      this._onProgress({
        loaded,
        total
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    pdfDataRangeTransport.addProgressiveReadListener(chunk => {
      this._onReceiveData({
        chunk
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    pdfDataRangeTransport.addProgressiveDoneListener((***REMOVED*** => {
      this._onProgressiveDone(***REMOVED***;
    ***REMOVED******REMOVED***;
    pdfDataRangeTransport.transportReady(***REMOVED***;
  ***REMOVED***
  _onReceiveData({
    begin,
    chunk
  ***REMOVED******REMOVED*** {
    const buffer = chunk instanceof Uint8Array && chunk.byteLength === chunk.buffer.byteLength ? chunk.buffer : new Uint8Array(chunk***REMOVED***.buffer;
    if (begin === undefined***REMOVED*** {
      if (this._fullRequestReader***REMOVED*** {
        this._fullRequestReader._enqueue(buffer***REMOVED***;
      ***REMOVED*** else {
        this._queuedChunks.push(buffer***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      const found = this._rangeReaders.some(function (rangeReader***REMOVED*** {
        if (rangeReader._begin !== begin***REMOVED*** {
          return false;
        ***REMOVED***
        rangeReader._enqueue(buffer***REMOVED***;
        return true;
      ***REMOVED******REMOVED***;
      assert(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found."***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get _progressiveDataLength(***REMOVED*** {
    return this._fullRequestReader?._loaded ?? 0;
  ***REMOVED***
  _onProgress(evt***REMOVED*** {
    if (evt.total === undefined***REMOVED*** {
      this._rangeReaders[0]?.onProgress?.({
        loaded: evt.loaded
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this._fullRequestReader?.onProgress?.({
        loaded: evt.loaded,
        total: evt.total
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _onProgressiveDone(***REMOVED*** {
    this._fullRequestReader?.progressiveDone(***REMOVED***;
    this._progressiveDone = true;
  ***REMOVED***
  _removeRangeReader(reader***REMOVED*** {
    const i = this._rangeReaders.indexOf(reader***REMOVED***;
    if (i >= 0***REMOVED*** {
      this._rangeReaders.splice(i, 1***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getFullReader(***REMOVED*** {
    assert(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once."***REMOVED***;
    const queuedChunks = this._queuedChunks;
    this._queuedChunks = null;
    return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone, this._contentDispositionFilename***REMOVED***;
  ***REMOVED***
  getRangeReader(begin, end***REMOVED*** {
    if (end <= this._progressiveDataLength***REMOVED*** {
      return null;
    ***REMOVED***
    const reader = new PDFDataTransportStreamRangeReader(this, begin, end***REMOVED***;
    this._pdfDataRangeTransport.requestDataRange(begin, end***REMOVED***;
    this._rangeReaders.push(reader***REMOVED***;
    return reader;
  ***REMOVED***
  cancelAllRequests(reason***REMOVED*** {
    this._fullRequestReader?.cancel(reason***REMOVED***;
    for (const reader of this._rangeReaders.slice(0***REMOVED******REMOVED*** {
      reader.cancel(reason***REMOVED***;
    ***REMOVED***
    this._pdfDataRangeTransport.abort(***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFDataTransportStreamReader {
  constructor(stream, queuedChunks, progressiveDone = false, contentDispositionFilename = null***REMOVED*** {
    this._stream = stream;
    this._done = progressiveDone || false;
    this._filename = isPdfFile(contentDispositionFilename***REMOVED*** ? contentDispositionFilename : null;
    this._queuedChunks = queuedChunks || [];
    this._loaded = 0;
    for (const chunk of this._queuedChunks***REMOVED*** {
      this._loaded += chunk.byteLength;
    ***REMOVED***
    this._requests = [];
    this._headersReady = Promise.resolve(***REMOVED***;
    stream._fullRequestReader = this;
    this.onProgress = null;
  ***REMOVED***
  _enqueue(chunk***REMOVED*** {
    if (this._done***REMOVED*** {
      return;
    ***REMOVED***
    if (this._requests.length > 0***REMOVED*** {
      const requestCapability = this._requests.shift(***REMOVED***;
      requestCapability.resolve({
        value: chunk,
        done: false
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this._queuedChunks.push(chunk***REMOVED***;
    ***REMOVED***
    this._loaded += chunk.byteLength;
  ***REMOVED***
  get headersReady(***REMOVED*** {
    return this._headersReady;
  ***REMOVED***
  get filename(***REMOVED*** {
    return this._filename;
  ***REMOVED***
  get isRangeSupported(***REMOVED*** {
    return this._stream._isRangeSupported;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._stream._isStreamingSupported;
  ***REMOVED***
  get contentLength(***REMOVED*** {
    return this._stream._contentLength;
  ***REMOVED***
  async read(***REMOVED*** {
    if (this._queuedChunks.length > 0***REMOVED*** {
      const chunk = this._queuedChunks.shift(***REMOVED***;
  ***REMOVED***
        value: chunk,
        done: false
      ***REMOVED***;
    ***REMOVED***
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    const requestCapability = Promise.withResolvers(***REMOVED***;
    this._requests.push(requestCapability***REMOVED***;
    return requestCapability.promise;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._done = true;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
  ***REMOVED***
  progressiveDone(***REMOVED*** {
    if (this._done***REMOVED*** {
      return;
    ***REMOVED***
    this._done = true;
  ***REMOVED***
***REMOVED***
class PDFDataTransportStreamRangeReader {
  constructor(stream, begin, end***REMOVED*** {
    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  ***REMOVED***
  _enqueue(chunk***REMOVED*** {
    if (this._done***REMOVED*** {
      return;
    ***REMOVED***
    if (this._requests.length === 0***REMOVED*** {
      this._queuedChunk = chunk;
    ***REMOVED*** else {
      const requestsCapability = this._requests.shift(***REMOVED***;
      requestsCapability.resolve({
        value: chunk,
        done: false
      ***REMOVED******REMOVED***;
      for (const requestCapability of this._requests***REMOVED*** {
        requestCapability.resolve({
          value: undefined,
          done: true
        ***REMOVED******REMOVED***;
      ***REMOVED***
      this._requests.length = 0;
    ***REMOVED***
    this._done = true;
    this._stream._removeRangeReader(this***REMOVED***;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return false;
  ***REMOVED***
  async read(***REMOVED*** {
    if (this._queuedChunk***REMOVED*** {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
  ***REMOVED***
        value: chunk,
        done: false
      ***REMOVED***;
    ***REMOVED***
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    const requestCapability = Promise.withResolvers(***REMOVED***;
    this._requests.push(requestCapability***REMOVED***;
    return requestCapability.promise;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._done = true;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    this._stream._removeRangeReader(this***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/content_disposition.js

function getFilenameFromContentDispositionHeader(contentDisposition***REMOVED*** {
  let needsEncodingFixup = true;
  let tmp = toParamRegExp("filename\\*", "i"***REMOVED***.exec(contentDisposition***REMOVED***;
  if (tmp***REMOVED*** {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp***REMOVED***;
    filename = unescape(filename***REMOVED***;
    filename = rfc5987decode(filename***REMOVED***;
    filename = rfc2047decode(filename***REMOVED***;
    return fixupEncoding(filename***REMOVED***;
  ***REMOVED***
  tmp = rfc2231getparam(contentDisposition***REMOVED***;
  if (tmp***REMOVED*** {
    const filename = rfc2047decode(tmp***REMOVED***;
    return fixupEncoding(filename***REMOVED***;
  ***REMOVED***
  tmp = toParamRegExp("filename", "i"***REMOVED***.exec(contentDisposition***REMOVED***;
  if (tmp***REMOVED*** {
    tmp = tmp[1];
    let filename = rfc2616unquote(tmp***REMOVED***;
    filename = rfc2047decode(filename***REMOVED***;
    return fixupEncoding(filename***REMOVED***;
  ***REMOVED***
  function toParamRegExp(attributePattern, flags***REMOVED*** {
    return new RegExp("(?:^|;***REMOVED***\\s*" + attributePattern + "\\s*=\\s*" + "(" + '[^";\\s][^;\\s]*' + "|" + '"(?:[^"\\\\]|\\\\"?***REMOVED***+"?' + "***REMOVED***", flags***REMOVED***;
  ***REMOVED***
  function textdecode(encoding, value***REMOVED*** {
    if (encoding***REMOVED*** {
      if (!/^[\x00-\xFF]+$/.test(value***REMOVED******REMOVED*** {
        return value;
      ***REMOVED***
    ***REMOVED***
        const decoder = new TextDecoder(encoding, {
          fatal: true
        ***REMOVED******REMOVED***;
        const buffer = stringToBytes(value***REMOVED***;
        value = decoder.decode(buffer***REMOVED***;
        needsEncodingFixup = false;
      ***REMOVED*** catch {***REMOVED***
    ***REMOVED***
    return value;
  ***REMOVED***
  function fixupEncoding(value***REMOVED*** {
    if (needsEncodingFixup && /[\x80-\xff]/.test(value***REMOVED******REMOVED*** {
      value = textdecode("utf-8", value***REMOVED***;
      if (needsEncodingFixup***REMOVED*** {
        value = textdecode("iso-8859-1", value***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return value;
  ***REMOVED***
  function rfc2231getparam(contentDispositionStr***REMOVED*** {
    const matches = [];
    let match;
    const iter = toParamRegExp("filename\\*((?!0\\d***REMOVED***\\d+***REMOVED***(\\*?***REMOVED***", "ig"***REMOVED***;
    while ((match = iter.exec(contentDispositionStr***REMOVED******REMOVED*** !== null***REMOVED*** {
      let [, n, quot, part] = match;
      n = parseInt(n, 10***REMOVED***;
      if (n in matches***REMOVED*** {
        if (n === 0***REMOVED*** {
          break;
        ***REMOVED***
        continue;
      ***REMOVED***
      matches[n] = [quot, part];
    ***REMOVED***
    const parts = [];
    for (let n = 0; n < matches.length; ++n***REMOVED*** {
      if (!(n in matches***REMOVED******REMOVED*** {
        break;
      ***REMOVED***
      let [quot, part] = matches[n];
      part = rfc2616unquote(part***REMOVED***;
      if (quot***REMOVED*** {
        part = unescape(part***REMOVED***;
        if (n === 0***REMOVED*** {
          part = rfc5987decode(part***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      parts.push(part***REMOVED***;
    ***REMOVED***
    return parts.join(""***REMOVED***;
  ***REMOVED***
  function rfc2616unquote(value***REMOVED*** {
    if (value.startsWith('"'***REMOVED******REMOVED*** {
      const parts = value.slice(1***REMOVED***.split('\\"'***REMOVED***;
      for (let i = 0; i < parts.length; ++i***REMOVED*** {
        const quotindex = parts[i].indexOf('"'***REMOVED***;
        if (quotindex !== -1***REMOVED*** {
          parts[i] = parts[i].slice(0, quotindex***REMOVED***;
          parts.length = i + 1;
        ***REMOVED***
        parts[i] = parts[i].replaceAll(/\\(.***REMOVED***/g, "$1"***REMOVED***;
      ***REMOVED***
      value = parts.join('"'***REMOVED***;
    ***REMOVED***
    return value;
  ***REMOVED***
  function rfc5987decode(extvalue***REMOVED*** {
    const encodingend = extvalue.indexOf("'"***REMOVED***;
    if (encodingend === -1***REMOVED*** {
      return extvalue;
    ***REMOVED***
    const encoding = extvalue.slice(0, encodingend***REMOVED***;
    const langvalue = extvalue.slice(encodingend + 1***REMOVED***;
    const value = langvalue.replace(/^[^']*'/, ""***REMOVED***;
    return textdecode(encoding, value***REMOVED***;
  ***REMOVED***
  function rfc2047decode(value***REMOVED*** {
    if (!value.startsWith("=?"***REMOVED*** || /[\x00-\x19\x80-\xff]/.test(value***REMOVED******REMOVED*** {
      return value;
    ***REMOVED***
    return value.replaceAll(/=\?([\w-]****REMOVED***\?([QqBb]***REMOVED***\?((?:[^?]|\?(?!=***REMOVED******REMOVED*******REMOVED***\?=/g, function (matches, charset, encoding, text***REMOVED*** {
      if (encoding === "q" || encoding === "Q"***REMOVED*** {
        text = text.replaceAll("_", " "***REMOVED***;
        text = text.replaceAll(/=([0-9a-fA-F]{2***REMOVED******REMOVED***/g, function (match, hex***REMOVED*** {
          return String.fromCharCode(parseInt(hex, 16***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        return textdecode(charset, text***REMOVED***;
      ***REMOVED***
    ***REMOVED***
        text = atob(text***REMOVED***;
      ***REMOVED*** catch {***REMOVED***
      return textdecode(charset, text***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  return "";
***REMOVED***

;// ./src/display/network_utils.js



function createHeaders(isHttp, httpHeaders***REMOVED*** {
  const headers = new Headers(***REMOVED***;
  if (!isHttp || !httpHeaders || typeof httpHeaders !== "object"***REMOVED*** {
    return headers;
  ***REMOVED***
  for (const key in httpHeaders***REMOVED*** {
    const val = httpHeaders[key];
    if (val !== undefined***REMOVED*** {
      headers.append(key, val***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return headers;
***REMOVED***
function getResponseOrigin(url***REMOVED*** {
***REMOVED***
    return new URL(url***REMOVED***.origin;
  ***REMOVED*** catch {***REMOVED***
  return null;
***REMOVED***
function validateRangeRequestCapabilities({
  responseHeaders,
  isHttp,
  rangeChunkSize,
  disableRange
***REMOVED******REMOVED*** {
  const returnValues = {
    allowRangeRequests: false,
    suggestedLength: undefined
  ***REMOVED***;
  const length = parseInt(responseHeaders.get("Content-Length"***REMOVED***, 10***REMOVED***;
  if (!Number.isInteger(length***REMOVED******REMOVED*** {
    return returnValues;
  ***REMOVED***
  returnValues.suggestedLength = length;
  if (length <= 2 * rangeChunkSize***REMOVED*** {
    return returnValues;
  ***REMOVED***
  if (disableRange || !isHttp***REMOVED*** {
    return returnValues;
  ***REMOVED***
  if (responseHeaders.get("Accept-Ranges"***REMOVED*** !== "bytes"***REMOVED*** {
    return returnValues;
  ***REMOVED***
  const contentEncoding = responseHeaders.get("Content-Encoding"***REMOVED*** || "identity";
  if (contentEncoding !== "identity"***REMOVED*** {
    return returnValues;
  ***REMOVED***
  returnValues.allowRangeRequests = true;
  return returnValues;
***REMOVED***
function extractFilenameFromHeader(responseHeaders***REMOVED*** {
  const contentDisposition = responseHeaders.get("Content-Disposition"***REMOVED***;
  if (contentDisposition***REMOVED*** {
    let filename = getFilenameFromContentDispositionHeader(contentDisposition***REMOVED***;
    if (filename.includes("%"***REMOVED******REMOVED*** {
    ***REMOVED***
        filename = decodeURIComponent(filename***REMOVED***;
      ***REMOVED*** catch {***REMOVED***
    ***REMOVED***
    if (isPdfFile(filename***REMOVED******REMOVED*** {
      return filename;
    ***REMOVED***
  ***REMOVED***
  return null;
***REMOVED***
function createResponseStatusError(status, url***REMOVED*** {
  if (status === 404 || status === 0 && url.startsWith("file:"***REMOVED******REMOVED*** {
    return new MissingPDFException('Missing PDF "' + url + '".'***REMOVED***;
  ***REMOVED***
  return new UnexpectedResponseException(`Unexpected server response (${status***REMOVED******REMOVED*** while retrieving PDF "${url***REMOVED***".`, status***REMOVED***;
***REMOVED***
function validateResponseStatus(status***REMOVED*** {
  return status === 200 || status === 206;
***REMOVED***

;// ./src/display/fetch_stream.js


function createFetchOptions(headers, withCredentials, abortController***REMOVED*** {
  return {
    method: "GET",
    headers,
    signal: abortController.signal,
    mode: "cors",
    credentials: withCredentials ? "include" : "same-origin",
    redirect: "follow"
  ***REMOVED***;
***REMOVED***
function getArrayBuffer(val***REMOVED*** {
  if (val instanceof Uint8Array***REMOVED*** {
    return val.buffer;
  ***REMOVED***
  if (val instanceof ArrayBuffer***REMOVED*** {
    return val;
  ***REMOVED***
  warn(`getArrayBuffer - unexpected data format: ${val***REMOVED***`***REMOVED***;
  return new Uint8Array(val***REMOVED***.buffer;
***REMOVED***
class PDFFetchStream {
  _responseOrigin = null;
  constructor(source***REMOVED*** {
    this.source = source;
    this.isHttp = /^https?:/i.test(source.url***REMOVED***;
    this.headers = createHeaders(this.isHttp, source.httpHeaders***REMOVED***;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  ***REMOVED***
  get _progressiveDataLength(***REMOVED*** {
    return this._fullRequestReader?._loaded ?? 0;
  ***REMOVED***
  getFullReader(***REMOVED*** {
    assert(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."***REMOVED***;
    this._fullRequestReader = new PDFFetchStreamReader(this***REMOVED***;
    return this._fullRequestReader;
  ***REMOVED***
  getRangeReader(begin, end***REMOVED*** {
    if (end <= this._progressiveDataLength***REMOVED*** {
      return null;
    ***REMOVED***
    const reader = new PDFFetchStreamRangeReader(this, begin, end***REMOVED***;
    this._rangeRequestReaders.push(reader***REMOVED***;
    return reader;
  ***REMOVED***
  cancelAllRequests(reason***REMOVED*** {
    this._fullRequestReader?.cancel(reason***REMOVED***;
    for (const reader of this._rangeRequestReaders.slice(0***REMOVED******REMOVED*** {
      reader.cancel(reason***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class PDFFetchStreamReader {
  constructor(stream***REMOVED*** {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    this._filename = null;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._contentLength = source.length;
    this._headersCapability = Promise.withResolvers(***REMOVED***;
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange***REMOVED*** {
      this._disableRange = true;
    ***REMOVED***
    this._abortController = new AbortController(***REMOVED***;
    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    const headers = new Headers(stream.headers***REMOVED***;
    const url = source.url;
    fetch(url, createFetchOptions(headers, this._withCredentials, this._abortController***REMOVED******REMOVED***.then(response => {
      stream._responseOrigin = getResponseOrigin(response.url***REMOVED***;
      if (!validateResponseStatus(response.status***REMOVED******REMOVED*** {
        throw createResponseStatusError(response.status, url***REMOVED***;
      ***REMOVED***
      this._reader = response.body.getReader(***REMOVED***;
      this._headersCapability.resolve(***REMOVED***;
      const responseHeaders = response.headers;
      const {
        allowRangeRequests,
        suggestedLength
      ***REMOVED*** = validateRangeRequestCapabilities({
        responseHeaders,
        isHttp: stream.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      ***REMOVED******REMOVED***;
      this._isRangeSupported = allowRangeRequests;
      this._contentLength = suggestedLength || this._contentLength;
      this._filename = extractFilenameFromHeader(responseHeaders***REMOVED***;
      if (!this._isStreamingSupported && this._isRangeSupported***REMOVED*** {
        this.cancel(new AbortException("Streaming is disabled."***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***.catch(this._headersCapability.reject***REMOVED***;
    this.onProgress = null;
  ***REMOVED***
  get headersReady(***REMOVED*** {
    return this._headersCapability.promise;
  ***REMOVED***
  get filename(***REMOVED*** {
    return this._filename;
  ***REMOVED***
  get contentLength(***REMOVED*** {
    return this._contentLength;
  ***REMOVED***
  get isRangeSupported(***REMOVED*** {
    return this._isRangeSupported;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._isStreamingSupported;
  ***REMOVED***
  async read(***REMOVED*** {
    await this._headersCapability.promise;
    const {
      value,
      done
    ***REMOVED*** = await this._reader.read(***REMOVED***;
    if (done***REMOVED*** {
  ***REMOVED***
        value,
        done
      ***REMOVED***;
    ***REMOVED***
    this._loaded += value.byteLength;
    this.onProgress?.({
      loaded: this._loaded,
      total: this._contentLength
    ***REMOVED******REMOVED***;
***REMOVED***
      value: getArrayBuffer(value***REMOVED***,
      done: false
    ***REMOVED***;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._reader?.cancel(reason***REMOVED***;
    this._abortController.abort(***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFFetchStreamRangeReader {
  constructor(stream, begin, end***REMOVED*** {
    this._stream = stream;
    this._reader = null;
    this._loaded = 0;
    const source = stream.source;
    this._withCredentials = source.withCredentials || false;
    this._readCapability = Promise.withResolvers(***REMOVED***;
    this._isStreamingSupported = !source.disableStream;
    this._abortController = new AbortController(***REMOVED***;
    const headers = new Headers(stream.headers***REMOVED***;
    headers.append("Range", `bytes=${begin***REMOVED***-${end - 1***REMOVED***`***REMOVED***;
    const url = source.url;
    fetch(url, createFetchOptions(headers, this._withCredentials, this._abortController***REMOVED******REMOVED***.then(response => {
      const responseOrigin = getResponseOrigin(response.url***REMOVED***;
      if (responseOrigin !== stream._responseOrigin***REMOVED*** {
        throw new Error(`Expected range response-origin "${responseOrigin***REMOVED***" to match "${stream._responseOrigin***REMOVED***".`***REMOVED***;
      ***REMOVED***
      if (!validateResponseStatus(response.status***REMOVED******REMOVED*** {
        throw createResponseStatusError(response.status, url***REMOVED***;
      ***REMOVED***
      this._readCapability.resolve(***REMOVED***;
      this._reader = response.body.getReader(***REMOVED***;
    ***REMOVED******REMOVED***.catch(this._readCapability.reject***REMOVED***;
    this.onProgress = null;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._isStreamingSupported;
  ***REMOVED***
  async read(***REMOVED*** {
    await this._readCapability.promise;
    const {
      value,
      done
    ***REMOVED*** = await this._reader.read(***REMOVED***;
    if (done***REMOVED*** {
  ***REMOVED***
        value,
        done
      ***REMOVED***;
    ***REMOVED***
    this._loaded += value.byteLength;
    this.onProgress?.({
      loaded: this._loaded
    ***REMOVED******REMOVED***;
***REMOVED***
      value: getArrayBuffer(value***REMOVED***,
      done: false
    ***REMOVED***;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._reader?.cancel(reason***REMOVED***;
    this._abortController.abort(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/network.js


const OK_RESPONSE = 200;
const PARTIAL_CONTENT_RESPONSE = 206;
function network_getArrayBuffer(xhr***REMOVED*** {
  const data = xhr.response;
  if (typeof data !== "string"***REMOVED*** {
    return data;
  ***REMOVED***
  return stringToBytes(data***REMOVED***.buffer;
***REMOVED***
class NetworkManager {
  _responseOrigin = null;
  constructor({
    url,
    httpHeaders,
    withCredentials
  ***REMOVED******REMOVED*** {
    this.url = url;
    this.isHttp = /^https?:/i.test(url***REMOVED***;
    this.headers = createHeaders(this.isHttp, httpHeaders***REMOVED***;
    this.withCredentials = withCredentials || false;
    this.currXhrId = 0;
    this.pendingRequests = Object.create(null***REMOVED***;
  ***REMOVED***
  request(args***REMOVED*** {
    const xhr = new XMLHttpRequest(***REMOVED***;
    const xhrId = this.currXhrId++;
    const pendingRequest = this.pendingRequests[xhrId] = {
      xhr
    ***REMOVED***;
    xhr.open("GET", this.url***REMOVED***;
    xhr.withCredentials = this.withCredentials;
    for (const [key, val] of this.headers***REMOVED*** {
      xhr.setRequestHeader(key, val***REMOVED***;
    ***REMOVED***
    if (this.isHttp && "begin" in args && "end" in args***REMOVED*** {
      xhr.setRequestHeader("Range", `bytes=${args.begin***REMOVED***-${args.end - 1***REMOVED***`***REMOVED***;
      pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
    ***REMOVED*** else {
      pendingRequest.expectedStatus = OK_RESPONSE;
    ***REMOVED***
    xhr.responseType = "arraybuffer";
    assert(args.onError, "Expected `onError` callback to be provided."***REMOVED***;
    xhr.onerror = (***REMOVED*** => {
      args.onError(xhr.status***REMOVED***;
    ***REMOVED***;
    xhr.onreadystatechange = this.onStateChange.bind(this, xhrId***REMOVED***;
    xhr.onprogress = this.onProgress.bind(this, xhrId***REMOVED***;
    pendingRequest.onHeadersReceived = args.onHeadersReceived;
    pendingRequest.onDone = args.onDone;
    pendingRequest.onError = args.onError;
    pendingRequest.onProgress = args.onProgress;
    xhr.send(null***REMOVED***;
    return xhrId;
  ***REMOVED***
  onProgress(xhrId, evt***REMOVED*** {
    const pendingRequest = this.pendingRequests[xhrId];
    if (!pendingRequest***REMOVED*** {
      return;
    ***REMOVED***
    pendingRequest.onProgress?.(evt***REMOVED***;
  ***REMOVED***
  onStateChange(xhrId, evt***REMOVED*** {
    const pendingRequest = this.pendingRequests[xhrId];
    if (!pendingRequest***REMOVED*** {
      return;
    ***REMOVED***
    const xhr = pendingRequest.xhr;
    if (xhr.readyState >= 2 && pendingRequest.onHeadersReceived***REMOVED*** {
      pendingRequest.onHeadersReceived(***REMOVED***;
      delete pendingRequest.onHeadersReceived;
    ***REMOVED***
    if (xhr.readyState !== 4***REMOVED*** {
      return;
    ***REMOVED***
    if (!(xhrId in this.pendingRequests***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    delete this.pendingRequests[xhrId];
    if (xhr.status === 0 && this.isHttp***REMOVED*** {
      pendingRequest.onError(xhr.status***REMOVED***;
      return;
    ***REMOVED***
    const xhrStatus = xhr.status || OK_RESPONSE;
    const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;
    if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus***REMOVED*** {
      pendingRequest.onError(xhr.status***REMOVED***;
      return;
    ***REMOVED***
    const chunk = network_getArrayBuffer(xhr***REMOVED***;
    if (xhrStatus === PARTIAL_CONTENT_RESPONSE***REMOVED*** {
      const rangeHeader = xhr.getResponseHeader("Content-Range"***REMOVED***;
      const matches = /bytes (\d+***REMOVED***-(\d+***REMOVED***\/(\d+***REMOVED***/.exec(rangeHeader***REMOVED***;
      if (matches***REMOVED*** {
        pendingRequest.onDone({
          begin: parseInt(matches[1], 10***REMOVED***,
          chunk
        ***REMOVED******REMOVED***;
      ***REMOVED*** else {
        warn(`Missing or invalid "Content-Range" header.`***REMOVED***;
        pendingRequest.onError(0***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (chunk***REMOVED*** {
      pendingRequest.onDone({
        begin: 0,
        chunk
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      pendingRequest.onError(xhr.status***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getRequestXhr(xhrId***REMOVED*** {
    return this.pendingRequests[xhrId].xhr;
  ***REMOVED***
  isPendingRequest(xhrId***REMOVED*** {
    return xhrId in this.pendingRequests;
  ***REMOVED***
  abortRequest(xhrId***REMOVED*** {
    const xhr = this.pendingRequests[xhrId].xhr;
    delete this.pendingRequests[xhrId];
    xhr.abort(***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFNetworkStream {
  constructor(source***REMOVED*** {
    this._source = source;
    this._manager = new NetworkManager(source***REMOVED***;
    this._rangeChunkSize = source.rangeChunkSize;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  ***REMOVED***
  _onRangeRequestReaderClosed(reader***REMOVED*** {
    const i = this._rangeRequestReaders.indexOf(reader***REMOVED***;
    if (i >= 0***REMOVED*** {
      this._rangeRequestReaders.splice(i, 1***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getFullReader(***REMOVED*** {
    assert(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."***REMOVED***;
    this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source***REMOVED***;
    return this._fullRequestReader;
  ***REMOVED***
  getRangeReader(begin, end***REMOVED*** {
    const reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end***REMOVED***;
    reader.onClosed = this._onRangeRequestReaderClosed.bind(this***REMOVED***;
    this._rangeRequestReaders.push(reader***REMOVED***;
    return reader;
  ***REMOVED***
  cancelAllRequests(reason***REMOVED*** {
    this._fullRequestReader?.cancel(reason***REMOVED***;
    for (const reader of this._rangeRequestReaders.slice(0***REMOVED******REMOVED*** {
      reader.cancel(reason***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class PDFNetworkStreamFullRequestReader {
  constructor(manager, source***REMOVED*** {
    this._manager = manager;
    this._url = source.url;
    this._fullRequestId = manager.request({
      onHeadersReceived: this._onHeadersReceived.bind(this***REMOVED***,
      onDone: this._onDone.bind(this***REMOVED***,
      onError: this._onError.bind(this***REMOVED***,
      onProgress: this._onProgress.bind(this***REMOVED***
    ***REMOVED******REMOVED***;
    this._headersCapability = Promise.withResolvers(***REMOVED***;
    this._disableRange = source.disableRange || false;
    this._contentLength = source.length;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange***REMOVED*** {
      this._disableRange = true;
    ***REMOVED***
    this._isStreamingSupported = false;
    this._isRangeSupported = false;
    this._cachedChunks = [];
    this._requests = [];
    this._done = false;
    this._storedError = undefined;
    this._filename = null;
    this.onProgress = null;
  ***REMOVED***
  _onHeadersReceived(***REMOVED*** {
    const fullRequestXhrId = this._fullRequestId;
    const fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId***REMOVED***;
    this._manager._responseOrigin = getResponseOrigin(fullRequestXhr.responseURL***REMOVED***;
    const rawResponseHeaders = fullRequestXhr.getAllResponseHeaders(***REMOVED***;
    const responseHeaders = new Headers(rawResponseHeaders ? rawResponseHeaders.trimStart(***REMOVED***.replace(/[^\S ]+$/, ""***REMOVED***.split(/[\r\n]+/***REMOVED***.map(x => {
      const [key, ...val] = x.split(": "***REMOVED***;
      return [key, val.join(": "***REMOVED***];
    ***REMOVED******REMOVED*** : []***REMOVED***;
    const {
      allowRangeRequests,
      suggestedLength
    ***REMOVED*** = validateRangeRequestCapabilities({
      responseHeaders,
      isHttp: this._manager.isHttp,
      rangeChunkSize: this._rangeChunkSize,
      disableRange: this._disableRange
    ***REMOVED******REMOVED***;
    if (allowRangeRequests***REMOVED*** {
      this._isRangeSupported = true;
    ***REMOVED***
    this._contentLength = suggestedLength || this._contentLength;
    this._filename = extractFilenameFromHeader(responseHeaders***REMOVED***;
    if (this._isRangeSupported***REMOVED*** {
      this._manager.abortRequest(fullRequestXhrId***REMOVED***;
    ***REMOVED***
    this._headersCapability.resolve(***REMOVED***;
  ***REMOVED***
  _onDone(data***REMOVED*** {
    if (data***REMOVED*** {
      if (this._requests.length > 0***REMOVED*** {
        const requestCapability = this._requests.shift(***REMOVED***;
        requestCapability.resolve({
          value: data.chunk,
          done: false
        ***REMOVED******REMOVED***;
      ***REMOVED*** else {
        this._cachedChunks.push(data.chunk***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this._done = true;
    if (this._cachedChunks.length > 0***REMOVED*** {
      return;
    ***REMOVED***
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
  ***REMOVED***
  _onError(status***REMOVED*** {
    this._storedError = createResponseStatusError(status, this._url***REMOVED***;
    this._headersCapability.reject(this._storedError***REMOVED***;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.reject(this._storedError***REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    this._cachedChunks.length = 0;
  ***REMOVED***
  _onProgress(evt***REMOVED*** {
    this.onProgress?.({
      loaded: evt.loaded,
      total: evt.lengthComputable ? evt.total : this._contentLength
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get filename(***REMOVED*** {
    return this._filename;
  ***REMOVED***
  get isRangeSupported(***REMOVED*** {
    return this._isRangeSupported;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._isStreamingSupported;
  ***REMOVED***
  get contentLength(***REMOVED*** {
    return this._contentLength;
  ***REMOVED***
  get headersReady(***REMOVED*** {
    return this._headersCapability.promise;
  ***REMOVED***
  async read(***REMOVED*** {
    await this._headersCapability.promise;
    if (this._storedError***REMOVED*** {
      throw this._storedError;
    ***REMOVED***
    if (this._cachedChunks.length > 0***REMOVED*** {
      const chunk = this._cachedChunks.shift(***REMOVED***;
  ***REMOVED***
        value: chunk,
        done: false
      ***REMOVED***;
    ***REMOVED***
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    const requestCapability = Promise.withResolvers(***REMOVED***;
    this._requests.push(requestCapability***REMOVED***;
    return requestCapability.promise;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._done = true;
    this._headersCapability.reject(reason***REMOVED***;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    if (this._manager.isPendingRequest(this._fullRequestId***REMOVED******REMOVED*** {
      this._manager.abortRequest(this._fullRequestId***REMOVED***;
    ***REMOVED***
    this._fullRequestReader = null;
  ***REMOVED***
***REMOVED***
class PDFNetworkStreamRangeRequestReader {
  constructor(manager, begin, end***REMOVED*** {
    this._manager = manager;
    this._url = manager.url;
    this._requestId = manager.request({
      begin,
      end,
      onHeadersReceived: this._onHeadersReceived.bind(this***REMOVED***,
      onDone: this._onDone.bind(this***REMOVED***,
      onError: this._onError.bind(this***REMOVED***,
      onProgress: this._onProgress.bind(this***REMOVED***
    ***REMOVED******REMOVED***;
    this._requests = [];
    this._queuedChunk = null;
    this._done = false;
    this._storedError = undefined;
    this.onProgress = null;
    this.onClosed = null;
  ***REMOVED***
  _onHeadersReceived(***REMOVED*** {
    const responseOrigin = getResponseOrigin(this._manager.getRequestXhr(this._requestId***REMOVED***?.responseURL***REMOVED***;
    if (responseOrigin !== this._manager._responseOrigin***REMOVED*** {
      this._storedError = new Error(`Expected range response-origin "${responseOrigin***REMOVED***" to match "${this._manager._responseOrigin***REMOVED***".`***REMOVED***;
      this._onError(0***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _close(***REMOVED*** {
    this.onClosed?.(this***REMOVED***;
  ***REMOVED***
  _onDone(data***REMOVED*** {
    const chunk = data.chunk;
    if (this._requests.length > 0***REMOVED*** {
      const requestCapability = this._requests.shift(***REMOVED***;
      requestCapability.resolve({
        value: chunk,
        done: false
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      this._queuedChunk = chunk;
    ***REMOVED***
    this._done = true;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    this._close(***REMOVED***;
  ***REMOVED***
  _onError(status***REMOVED*** {
    this._storedError ??= createResponseStatusError(status, this._url***REMOVED***;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.reject(this._storedError***REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    this._queuedChunk = null;
  ***REMOVED***
  _onProgress(evt***REMOVED*** {
    if (!this.isStreamingSupported***REMOVED*** {
      this.onProgress?.({
        loaded: evt.loaded
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return false;
  ***REMOVED***
  async read(***REMOVED*** {
    if (this._storedError***REMOVED*** {
      throw this._storedError;
    ***REMOVED***
    if (this._queuedChunk !== null***REMOVED*** {
      const chunk = this._queuedChunk;
      this._queuedChunk = null;
  ***REMOVED***
        value: chunk,
        done: false
      ***REMOVED***;
    ***REMOVED***
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    const requestCapability = Promise.withResolvers(***REMOVED***;
    this._requests.push(requestCapability***REMOVED***;
    return requestCapability.promise;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    this._done = true;
    for (const requestCapability of this._requests***REMOVED*** {
      requestCapability.resolve({
        value: undefined,
        done: true
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this._requests.length = 0;
    if (this._manager.isPendingRequest(this._requestId***REMOVED******REMOVED*** {
      this._manager.abortRequest(this._requestId***REMOVED***;
    ***REMOVED***
    this._close(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/node_stream.js

const urlRegex = /^[a-z][a-z0-9\-+.]+:/i;
function parseUrlOrPath(sourceUrl***REMOVED*** {
  if (urlRegex.test(sourceUrl***REMOVED******REMOVED*** {
    return new URL(sourceUrl***REMOVED***;
  ***REMOVED***
  const url = process.getBuiltinModule("url"***REMOVED***;
  return new URL(url.pathToFileURL(sourceUrl***REMOVED******REMOVED***;
***REMOVED***
class PDFNodeStream {
  constructor(source***REMOVED*** {
    this.source = source;
    this.url = parseUrlOrPath(source.url***REMOVED***;
    assert(this.url.protocol === "file:", "PDFNodeStream only supports file:// URLs."***REMOVED***;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  ***REMOVED***
  get _progressiveDataLength(***REMOVED*** {
    return this._fullRequestReader?._loaded ?? 0;
  ***REMOVED***
  getFullReader(***REMOVED*** {
    assert(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."***REMOVED***;
    this._fullRequestReader = new PDFNodeStreamFsFullReader(this***REMOVED***;
    return this._fullRequestReader;
  ***REMOVED***
  getRangeReader(start, end***REMOVED*** {
    if (end <= this._progressiveDataLength***REMOVED*** {
      return null;
    ***REMOVED***
    const rangeReader = new PDFNodeStreamFsRangeReader(this, start, end***REMOVED***;
    this._rangeRequestReaders.push(rangeReader***REMOVED***;
    return rangeReader;
  ***REMOVED***
  cancelAllRequests(reason***REMOVED*** {
    this._fullRequestReader?.cancel(reason***REMOVED***;
    for (const reader of this._rangeRequestReaders.slice(0***REMOVED******REMOVED*** {
      reader.cancel(reason***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class PDFNodeStreamFsFullReader {
  constructor(stream***REMOVED*** {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    const source = stream.source;
    this._contentLength = source.length;
    this._loaded = 0;
    this._filename = null;
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange***REMOVED*** {
      this._disableRange = true;
    ***REMOVED***
    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._readableStream = null;
    this._readCapability = Promise.withResolvers(***REMOVED***;
    this._headersCapability = Promise.withResolvers(***REMOVED***;
    const fs = process.getBuiltinModule("fs"***REMOVED***;
    fs.promises.lstat(this._url***REMOVED***.then(stat => {
      this._contentLength = stat.size;
      this._setReadableStream(fs.createReadStream(this._url***REMOVED******REMOVED***;
      this._headersCapability.resolve(***REMOVED***;
    ***REMOVED***, error => {
      if (error.code === "ENOENT"***REMOVED*** {
        error = new MissingPDFException(`Missing PDF "${this._url***REMOVED***".`***REMOVED***;
      ***REMOVED***
      this._storedError = error;
      this._headersCapability.reject(error***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get headersReady(***REMOVED*** {
    return this._headersCapability.promise;
  ***REMOVED***
  get filename(***REMOVED*** {
    return this._filename;
  ***REMOVED***
  get contentLength(***REMOVED*** {
    return this._contentLength;
  ***REMOVED***
  get isRangeSupported(***REMOVED*** {
    return this._isRangeSupported;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._isStreamingSupported;
  ***REMOVED***
  async read(***REMOVED*** {
    await this._readCapability.promise;
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    if (this._storedError***REMOVED*** {
      throw this._storedError;
    ***REMOVED***
    const chunk = this._readableStream.read(***REMOVED***;
    if (chunk === null***REMOVED*** {
      this._readCapability = Promise.withResolvers(***REMOVED***;
      return this.read(***REMOVED***;
    ***REMOVED***
    this._loaded += chunk.length;
    this.onProgress?.({
      loaded: this._loaded,
      total: this._contentLength
    ***REMOVED******REMOVED***;
    const buffer = new Uint8Array(chunk***REMOVED***.buffer;
***REMOVED***
      value: buffer,
      done: false
    ***REMOVED***;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    if (!this._readableStream***REMOVED*** {
      this._error(reason***REMOVED***;
      return;
    ***REMOVED***
    this._readableStream.destroy(reason***REMOVED***;
  ***REMOVED***
  _error(reason***REMOVED*** {
    this._storedError = reason;
    this._readCapability.resolve(***REMOVED***;
  ***REMOVED***
  _setReadableStream(readableStream***REMOVED*** {
    this._readableStream = readableStream;
    readableStream.on("readable", (***REMOVED*** => {
      this._readCapability.resolve(***REMOVED***;
    ***REMOVED******REMOVED***;
    readableStream.on("end", (***REMOVED*** => {
      readableStream.destroy(***REMOVED***;
      this._done = true;
      this._readCapability.resolve(***REMOVED***;
    ***REMOVED******REMOVED***;
    readableStream.on("error", reason => {
      this._error(reason***REMOVED***;
    ***REMOVED******REMOVED***;
    if (!this._isStreamingSupported && this._isRangeSupported***REMOVED*** {
      this._error(new AbortException("streaming is disabled"***REMOVED******REMOVED***;
    ***REMOVED***
    if (this._storedError***REMOVED*** {
      this._readableStream.destroy(this._storedError***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class PDFNodeStreamFsRangeReader {
  constructor(stream, start, end***REMOVED*** {
    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    this._loaded = 0;
    this._readableStream = null;
    this._readCapability = Promise.withResolvers(***REMOVED***;
    const source = stream.source;
    this._isStreamingSupported = !source.disableStream;
    const fs = process.getBuiltinModule("fs"***REMOVED***;
    this._setReadableStream(fs.createReadStream(this._url, {
      start,
      end: end - 1
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  get isStreamingSupported(***REMOVED*** {
    return this._isStreamingSupported;
  ***REMOVED***
  async read(***REMOVED*** {
    await this._readCapability.promise;
    if (this._done***REMOVED*** {
  ***REMOVED***
        value: undefined,
        done: true
      ***REMOVED***;
    ***REMOVED***
    if (this._storedError***REMOVED*** {
      throw this._storedError;
    ***REMOVED***
    const chunk = this._readableStream.read(***REMOVED***;
    if (chunk === null***REMOVED*** {
      this._readCapability = Promise.withResolvers(***REMOVED***;
      return this.read(***REMOVED***;
    ***REMOVED***
    this._loaded += chunk.length;
    this.onProgress?.({
      loaded: this._loaded
    ***REMOVED******REMOVED***;
    const buffer = new Uint8Array(chunk***REMOVED***.buffer;
***REMOVED***
      value: buffer,
      done: false
    ***REMOVED***;
  ***REMOVED***
  cancel(reason***REMOVED*** {
    if (!this._readableStream***REMOVED*** {
      this._error(reason***REMOVED***;
      return;
    ***REMOVED***
    this._readableStream.destroy(reason***REMOVED***;
  ***REMOVED***
  _error(reason***REMOVED*** {
    this._storedError = reason;
    this._readCapability.resolve(***REMOVED***;
  ***REMOVED***
  _setReadableStream(readableStream***REMOVED*** {
    this._readableStream = readableStream;
    readableStream.on("readable", (***REMOVED*** => {
      this._readCapability.resolve(***REMOVED***;
    ***REMOVED******REMOVED***;
    readableStream.on("end", (***REMOVED*** => {
      readableStream.destroy(***REMOVED***;
      this._done = true;
      this._readCapability.resolve(***REMOVED***;
    ***REMOVED******REMOVED***;
    readableStream.on("error", reason => {
      this._error(reason***REMOVED***;
    ***REMOVED******REMOVED***;
    if (this._storedError***REMOVED*** {
      this._readableStream.destroy(this._storedError***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

;// ./src/display/text_layer.js


const MAX_TEXT_DIVS_TO_RENDER = 100000;
const DEFAULT_FONT_SIZE = 30;
const DEFAULT_FONT_ASCENT = 0.8;
class TextLayer {
  #capability = Promise.withResolvers(***REMOVED***;
  #container = null;
  #disableProcessItems = false;
  #fontInspectorEnabled = !!globalThis.FontInspector?.enabled;
  #lang = null;
  #layoutTextParams = null;
  #pageHeight = 0;
  #pageWidth = 0;
  #reader = null;
  #rootContainer = null;
  #rotation = 0;
  #scale = 0;
  #styleCache = Object.create(null***REMOVED***;
  #textContentItemsStr = [];
  #textContentSource = null;
  #textDivs = [];
  #textDivProperties = new WeakMap(***REMOVED***;
  #transform = null;
  static #ascentCache = new Map(***REMOVED***;
  static #canvasContexts = new Map(***REMOVED***;
  static #canvasCtxFonts = new WeakMap(***REMOVED***;
  static #minFontSize = null;
  static #pendingTextLayers = new Set(***REMOVED***;
  constructor({
    textContentSource,
    container,
    viewport
  ***REMOVED******REMOVED*** {
    if (textContentSource instanceof ReadableStream***REMOVED*** {
      this.#textContentSource = textContentSource;
    ***REMOVED*** else if (typeof textContentSource === "object"***REMOVED*** {
      this.#textContentSource = new ReadableStream({
        start(controller***REMOVED*** {
          controller.enqueue(textContentSource***REMOVED***;
          controller.close(***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      throw new Error('No "textContentSource" parameter specified.'***REMOVED***;
    ***REMOVED***
    this.#container = this.#rootContainer = container;
    this.#scale = viewport.scale * (globalThis.devicePixelRatio || 1***REMOVED***;
    this.#rotation = viewport.rotation;
    this.#layoutTextParams = {
      div: null,
      properties: null,
      ctx: null
    ***REMOVED***;
    const {
      pageWidth,
      pageHeight,
      pageX,
      pageY
    ***REMOVED*** = viewport.rawDims;
    this.#transform = [1, 0, 0, -1, -pageX, pageY + pageHeight];
    this.#pageWidth = pageWidth;
    this.#pageHeight = pageHeight;
    TextLayer.#ensureMinFontSizeComputed(***REMOVED***;
    setLayerDimensions(container, viewport***REMOVED***;
    this.#capability.promise.finally((***REMOVED*** => {
      TextLayer.#pendingTextLayers.delete(this***REMOVED***;
      this.#layoutTextParams = null;
      this.#styleCache = null;
    ***REMOVED******REMOVED***.catch((***REMOVED*** => {***REMOVED******REMOVED***;
  ***REMOVED***
  static get fontFamilyMap(***REMOVED*** {
    const {
      isWindows,
      isFirefox
    ***REMOVED*** = util_FeatureTest.platform;
    return shadow(this, "fontFamilyMap", new Map([["sans-serif", `${isWindows && isFirefox ? "Calibri, " : ""***REMOVED***sans-serif`], ["monospace", `${isWindows && isFirefox ? "Lucida Console, " : ""***REMOVED***monospace`]]***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    const pump = (***REMOVED*** => {
      this.#reader.read(***REMOVED***.then(({
        value,
        done
      ***REMOVED******REMOVED*** => {
        if (done***REMOVED*** {
          this.#capability.resolve(***REMOVED***;
          return;
        ***REMOVED***
        this.#lang ??= value.lang;
        Object.assign(this.#styleCache, value.styles***REMOVED***;
        this.#processItems(value.items***REMOVED***;
        pump(***REMOVED***;
      ***REMOVED***, this.#capability.reject***REMOVED***;
    ***REMOVED***;
    this.#reader = this.#textContentSource.getReader(***REMOVED***;
    TextLayer.#pendingTextLayers.add(this***REMOVED***;
    pump(***REMOVED***;
    return this.#capability.promise;
  ***REMOVED***
  update({
    viewport,
    onBefore = null
  ***REMOVED******REMOVED*** {
    const scale = viewport.scale * (globalThis.devicePixelRatio || 1***REMOVED***;
    const rotation = viewport.rotation;
    if (rotation !== this.#rotation***REMOVED*** {
      onBefore?.(***REMOVED***;
      this.#rotation = rotation;
      setLayerDimensions(this.#rootContainer, {
        rotation
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (scale !== this.#scale***REMOVED*** {
      onBefore?.(***REMOVED***;
      this.#scale = scale;
      const params = {
        div: null,
        properties: null,
        ctx: TextLayer.#getCtx(this.#lang***REMOVED***
      ***REMOVED***;
      for (const div of this.#textDivs***REMOVED*** {
        params.properties = this.#textDivProperties.get(div***REMOVED***;
        params.div = div;
        this.#layout(params***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  cancel(***REMOVED*** {
    const abortEx = new AbortException("TextLayer task cancelled."***REMOVED***;
    this.#reader?.cancel(abortEx***REMOVED***.catch((***REMOVED*** => {***REMOVED******REMOVED***;
    this.#reader = null;
    this.#capability.reject(abortEx***REMOVED***;
  ***REMOVED***
  get textDivs(***REMOVED*** {
    return this.#textDivs;
  ***REMOVED***
  get textContentItemsStr(***REMOVED*** {
    return this.#textContentItemsStr;
  ***REMOVED***
  #processItems(items***REMOVED*** {
    if (this.#disableProcessItems***REMOVED*** {
      return;
    ***REMOVED***
    this.#layoutTextParams.ctx ??= TextLayer.#getCtx(this.#lang***REMOVED***;
    const textDivs = this.#textDivs,
      textContentItemsStr = this.#textContentItemsStr;
    for (const item of items***REMOVED*** {
      if (textDivs.length > MAX_TEXT_DIVS_TO_RENDER***REMOVED*** {
        warn("Ignoring additional textDivs for performance reasons."***REMOVED***;
        this.#disableProcessItems = true;
        return;
      ***REMOVED***
      if (item.str === undefined***REMOVED*** {
        if (item.type === "beginMarkedContentProps" || item.type === "beginMarkedContent"***REMOVED*** {
          const parent = this.#container;
          this.#container = document.createElement("span"***REMOVED***;
          this.#container.classList.add("markedContent"***REMOVED***;
          if (item.id !== null***REMOVED*** {
            this.#container.setAttribute("id", `${item.id***REMOVED***`***REMOVED***;
          ***REMOVED***
          parent.append(this.#container***REMOVED***;
        ***REMOVED*** else if (item.type === "endMarkedContent"***REMOVED*** {
          this.#container = this.#container.parentNode;
        ***REMOVED***
        continue;
      ***REMOVED***
      textContentItemsStr.push(item.str***REMOVED***;
      this.#appendText(item***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #appendText(geom***REMOVED*** {
    const textDiv = document.createElement("span"***REMOVED***;
    const textDivProperties = {
      angle: 0,
      canvasWidth: 0,
      hasText: geom.str !== "",
      hasEOL: geom.hasEOL,
      fontSize: 0
    ***REMOVED***;
    this.#textDivs.push(textDiv***REMOVED***;
    const tx = Util.transform(this.#transform, geom.transform***REMOVED***;
    let angle = Math.atan2(tx[1], tx[0]***REMOVED***;
    const style = this.#styleCache[geom.fontName];
    if (style.vertical***REMOVED*** {
      angle += Math.PI / 2;
    ***REMOVED***
    let fontFamily = this.#fontInspectorEnabled && style.fontSubstitution || style.fontFamily;
    fontFamily = TextLayer.fontFamilyMap.get(fontFamily***REMOVED*** || fontFamily;
    const fontHeight = Math.hypot(tx[2], tx[3]***REMOVED***;
    const fontAscent = fontHeight * TextLayer.#getAscent(fontFamily, this.#lang***REMOVED***;
    let left, top;
    if (angle === 0***REMOVED*** {
      left = tx[4];
      top = tx[5] - fontAscent;
    ***REMOVED*** else {
      left = tx[4] + fontAscent * Math.sin(angle***REMOVED***;
      top = tx[5] - fontAscent * Math.cos(angle***REMOVED***;
    ***REMOVED***
    const scaleFactorStr = "calc(var(--scale-factor***REMOVED****";
    const divStyle = textDiv.style;
    if (this.#container === this.#rootContainer***REMOVED*** {
      divStyle.left = `${(100 * left / this.#pageWidth***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
      divStyle.top = `${(100 * top / this.#pageHeight***REMOVED***.toFixed(2***REMOVED******REMOVED***%`;
    ***REMOVED*** else {
      divStyle.left = `${scaleFactorStr***REMOVED***${left.toFixed(2***REMOVED******REMOVED***px***REMOVED***`;
      divStyle.top = `${scaleFactorStr***REMOVED***${top.toFixed(2***REMOVED******REMOVED***px***REMOVED***`;
    ***REMOVED***
    divStyle.fontSize = `${scaleFactorStr***REMOVED***${(TextLayer.#minFontSize * fontHeight***REMOVED***.toFixed(2***REMOVED******REMOVED***px***REMOVED***`;
    divStyle.fontFamily = fontFamily;
    textDivProperties.fontSize = fontHeight;
    textDiv.setAttribute("role", "presentation"***REMOVED***;
    textDiv.textContent = geom.str;
    textDiv.dir = geom.dir;
    if (this.#fontInspectorEnabled***REMOVED*** {
      textDiv.dataset.fontName = style.fontSubstitutionLoadedName || geom.fontName;
    ***REMOVED***
    if (angle !== 0***REMOVED*** {
      textDivProperties.angle = angle * (180 / Math.PI***REMOVED***;
    ***REMOVED***
    let shouldScaleText = false;
    if (geom.str.length > 1***REMOVED*** {
      shouldScaleText = true;
    ***REMOVED*** else if (geom.str !== " " && geom.transform[0] !== geom.transform[3]***REMOVED*** {
      const absScaleX = Math.abs(geom.transform[0]***REMOVED***,
        absScaleY = Math.abs(geom.transform[3]***REMOVED***;
      if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY***REMOVED*** / Math.min(absScaleX, absScaleY***REMOVED*** > 1.5***REMOVED*** {
        shouldScaleText = true;
      ***REMOVED***
    ***REMOVED***
    if (shouldScaleText***REMOVED*** {
      textDivProperties.canvasWidth = style.vertical ? geom.height : geom.width;
    ***REMOVED***
    this.#textDivProperties.set(textDiv, textDivProperties***REMOVED***;
    this.#layoutTextParams.div = textDiv;
    this.#layoutTextParams.properties = textDivProperties;
    this.#layout(this.#layoutTextParams***REMOVED***;
    if (textDivProperties.hasText***REMOVED*** {
      this.#container.append(textDiv***REMOVED***;
    ***REMOVED***
    if (textDivProperties.hasEOL***REMOVED*** {
      const br = document.createElement("br"***REMOVED***;
      br.setAttribute("role", "presentation"***REMOVED***;
      this.#container.append(br***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #layout(params***REMOVED*** {
    const {
      div,
      properties,
      ctx
    ***REMOVED*** = params;
    const {
      style
    ***REMOVED*** = div;
    let transform = "";
    if (TextLayer.#minFontSize > 1***REMOVED*** {
      transform = `scale(${1 / TextLayer.#minFontSize***REMOVED******REMOVED***`;
    ***REMOVED***
    if (properties.canvasWidth !== 0 && properties.hasText***REMOVED*** {
      const {
        fontFamily
      ***REMOVED*** = style;
      const {
        canvasWidth,
        fontSize
      ***REMOVED*** = properties;
      TextLayer.#ensureCtxFont(ctx, fontSize * this.#scale, fontFamily***REMOVED***;
      const {
        width
      ***REMOVED*** = ctx.measureText(div.textContent***REMOVED***;
      if (width > 0***REMOVED*** {
        transform = `scaleX(${canvasWidth * this.#scale / width***REMOVED******REMOVED*** ${transform***REMOVED***`;
      ***REMOVED***
    ***REMOVED***
    if (properties.angle !== 0***REMOVED*** {
      transform = `rotate(${properties.angle***REMOVED***deg***REMOVED*** ${transform***REMOVED***`;
    ***REMOVED***
    if (transform.length > 0***REMOVED*** {
      style.transform = transform;
    ***REMOVED***
  ***REMOVED***
  static cleanup(***REMOVED*** {
    if (this.#pendingTextLayers.size > 0***REMOVED*** {
      return;
    ***REMOVED***
    this.#ascentCache.clear(***REMOVED***;
    for (const {
      canvas
    ***REMOVED*** of this.#canvasContexts.values(***REMOVED******REMOVED*** {
      canvas.remove(***REMOVED***;
    ***REMOVED***
    this.#canvasContexts.clear(***REMOVED***;
  ***REMOVED***
  static #getCtx(lang = null***REMOVED*** {
    let ctx = this.#canvasContexts.get(lang ||= ""***REMOVED***;
    if (!ctx***REMOVED*** {
      const canvas = document.createElement("canvas"***REMOVED***;
      canvas.className = "hiddenCanvasElement";
      canvas.lang = lang;
      document.body.append(canvas***REMOVED***;
      ctx = canvas.getContext("2d", {
        alpha: false,
        willReadFrequently: true
      ***REMOVED******REMOVED***;
      this.#canvasContexts.set(lang, ctx***REMOVED***;
      this.#canvasCtxFonts.set(ctx, {
        size: 0,
        family: ""
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return ctx;
  ***REMOVED***
  static #ensureCtxFont(ctx, size, family***REMOVED*** {
    const cached = this.#canvasCtxFonts.get(ctx***REMOVED***;
    if (size === cached.size && family === cached.family***REMOVED*** {
      return;
    ***REMOVED***
    ctx.font = `${size***REMOVED***px ${family***REMOVED***`;
    cached.size = size;
    cached.family = family;
  ***REMOVED***
  static #ensureMinFontSizeComputed(***REMOVED*** {
    if (this.#minFontSize !== null***REMOVED*** {
      return;
    ***REMOVED***
    const div = document.createElement("div"***REMOVED***;
    div.style.opacity = 0;
    div.style.lineHeight = 1;
    div.style.fontSize = "1px";
    div.style.position = "absolute";
    div.textContent = "X";
    document.body.append(div***REMOVED***;
    this.#minFontSize = div.getBoundingClientRect(***REMOVED***.height;
    div.remove(***REMOVED***;
  ***REMOVED***
  static #getAscent(fontFamily, lang***REMOVED*** {
    const cachedAscent = this.#ascentCache.get(fontFamily***REMOVED***;
    if (cachedAscent***REMOVED*** {
      return cachedAscent;
    ***REMOVED***
    const ctx = this.#getCtx(lang***REMOVED***;
    ctx.canvas.width = ctx.canvas.height = DEFAULT_FONT_SIZE;
    this.#ensureCtxFont(ctx, DEFAULT_FONT_SIZE, fontFamily***REMOVED***;
    const metrics = ctx.measureText(""***REMOVED***;
    let ascent = metrics.fontBoundingBoxAscent;
    let descent = Math.abs(metrics.fontBoundingBoxDescent***REMOVED***;
    if (ascent***REMOVED*** {
      const ratio = ascent / (ascent + descent***REMOVED***;
      this.#ascentCache.set(fontFamily, ratio***REMOVED***;
      ctx.canvas.width = ctx.canvas.height = 0;
      return ratio;
    ***REMOVED***
    ctx.strokeStyle = "red";
    ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE***REMOVED***;
    ctx.strokeText("g", 0, 0***REMOVED***;
    let pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE***REMOVED***.data;
    descent = 0;
    for (let i = pixels.length - 1 - 3; i >= 0; i -= 4***REMOVED*** {
      if (pixels[i] > 0***REMOVED*** {
        descent = Math.ceil(i / 4 / DEFAULT_FONT_SIZE***REMOVED***;
        break;
      ***REMOVED***
    ***REMOVED***
    ctx.clearRect(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE***REMOVED***;
    ctx.strokeText("A", 0, DEFAULT_FONT_SIZE***REMOVED***;
    pixels = ctx.getImageData(0, 0, DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZE***REMOVED***.data;
    ascent = 0;
    for (let i = 0, ii = pixels.length; i < ii; i += 4***REMOVED*** {
      if (pixels[i] > 0***REMOVED*** {
        ascent = DEFAULT_FONT_SIZE - Math.floor(i / 4 / DEFAULT_FONT_SIZE***REMOVED***;
        break;
      ***REMOVED***
    ***REMOVED***
    ctx.canvas.width = ctx.canvas.height = 0;
    const ratio = ascent ? ascent / (ascent + descent***REMOVED*** : DEFAULT_FONT_ASCENT;
    this.#ascentCache.set(fontFamily, ratio***REMOVED***;
    return ratio;
  ***REMOVED***
***REMOVED***

;// ./src/display/xfa_text.js
class XfaText {
  static textContent(xfa***REMOVED*** {
    const items = [];
    const output = {
      items,
      styles: Object.create(null***REMOVED***
    ***REMOVED***;
    function walk(node***REMOVED*** {
      if (!node***REMOVED*** {
        return;
      ***REMOVED***
      let str = null;
      const name = node.name;
      if (name === "#text"***REMOVED*** {
        str = node.value;
      ***REMOVED*** else if (!XfaText.shouldBuildText(name***REMOVED******REMOVED*** {
        return;
      ***REMOVED*** else if (node?.attributes?.textContent***REMOVED*** {
        str = node.attributes.textContent;
      ***REMOVED*** else if (node.value***REMOVED*** {
        str = node.value;
      ***REMOVED***
      if (str !== null***REMOVED*** {
        items.push({
          str
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (!node.children***REMOVED*** {
        return;
      ***REMOVED***
      for (const child of node.children***REMOVED*** {
        walk(child***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    walk(xfa***REMOVED***;
    return output;
  ***REMOVED***
  static shouldBuildText(name***REMOVED*** {
    return !(name === "textarea" || name === "input" || name === "option" || name === "select"***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/api.js




















const DEFAULT_RANGE_CHUNK_SIZE = 65536;
const RENDERING_CANCELLED_TIMEOUT = 100;
const DELAYED_CLEANUP_TIMEOUT = 5000;
const DefaultCanvasFactory = isNodeJS ? NodeCanvasFactory : DOMCanvasFactory;
const DefaultCMapReaderFactory = isNodeJS ? NodeCMapReaderFactory : DOMCMapReaderFactory;
const DefaultFilterFactory = isNodeJS ? NodeFilterFactory : DOMFilterFactory;
const DefaultStandardFontDataFactory = isNodeJS ? NodeStandardFontDataFactory : DOMStandardFontDataFactory;
function getDocument(src = {***REMOVED******REMOVED*** {
  if (typeof src === "string" || src instanceof URL***REMOVED*** {
    src = {
      url: src
    ***REMOVED***;
  ***REMOVED*** else if (src instanceof ArrayBuffer || ArrayBuffer.isView(src***REMOVED******REMOVED*** {
    src = {
      data: src
    ***REMOVED***;
  ***REMOVED***
  const task = new PDFDocumentLoadingTask(***REMOVED***;
  const {
    docId
  ***REMOVED*** = task;
  const url = src.url ? getUrlProp(src.url***REMOVED*** : null;
  const data = src.data ? getDataProp(src.data***REMOVED*** : null;
  const httpHeaders = src.httpHeaders || null;
  const withCredentials = src.withCredentials === true;
  const password = src.password ?? null;
  const rangeTransport = src.range instanceof PDFDataRangeTransport ? src.range : null;
  const rangeChunkSize = Number.isInteger(src.rangeChunkSize***REMOVED*** && src.rangeChunkSize > 0 ? src.rangeChunkSize : DEFAULT_RANGE_CHUNK_SIZE;
  let worker = src.worker instanceof PDFWorker ? src.worker : null;
  const verbosity = src.verbosity;
  const docBaseUrl = typeof src.docBaseUrl === "string" && !isDataScheme(src.docBaseUrl***REMOVED*** ? src.docBaseUrl : null;
  const cMapUrl = typeof src.cMapUrl === "string" ? src.cMapUrl : null;
  const cMapPacked = src.cMapPacked !== false;
  const CMapReaderFactory = src.CMapReaderFactory || DefaultCMapReaderFactory;
  const standardFontDataUrl = typeof src.standardFontDataUrl === "string" ? src.standardFontDataUrl : null;
  const StandardFontDataFactory = src.StandardFontDataFactory || DefaultStandardFontDataFactory;
  const ignoreErrors = src.stopAtErrors !== true;
  const maxImageSize = Number.isInteger(src.maxImageSize***REMOVED*** && src.maxImageSize > -1 ? src.maxImageSize : -1;
  const isEvalSupported = src.isEvalSupported !== false;
  const isOffscreenCanvasSupported = typeof src.isOffscreenCanvasSupported === "boolean" ? src.isOffscreenCanvasSupported : !isNodeJS;
  const isImageDecoderSupported = typeof src.isImageDecoderSupported === "boolean" ? src.isImageDecoderSupported : !isNodeJS && (util_FeatureTest.platform.isFirefox || !globalThis.chrome***REMOVED***;
  const canvasMaxAreaInBytes = Number.isInteger(src.canvasMaxAreaInBytes***REMOVED*** ? src.canvasMaxAreaInBytes : -1;
  const disableFontFace = typeof src.disableFontFace === "boolean" ? src.disableFontFace : isNodeJS;
  const fontExtraProperties = src.fontExtraProperties === true;
  const enableXfa = src.enableXfa === true;
  const ownerDocument = src.ownerDocument || globalThis.document;
  const disableRange = src.disableRange === true;
  const disableStream = src.disableStream === true;
  const disableAutoFetch = src.disableAutoFetch === true;
  const pdfBug = src.pdfBug === true;
  const CanvasFactory = src.CanvasFactory || DefaultCanvasFactory;
  const FilterFactory = src.FilterFactory || DefaultFilterFactory;
  const enableHWA = src.enableHWA === true;
  const length = rangeTransport ? rangeTransport.length : src.length ?? NaN;
  const useSystemFonts = typeof src.useSystemFonts === "boolean" ? src.useSystemFonts : !isNodeJS && !disableFontFace;
  const useWorkerFetch = typeof src.useWorkerFetch === "boolean" ? src.useWorkerFetch : CMapReaderFactory === DOMCMapReaderFactory && StandardFontDataFactory === DOMStandardFontDataFactory && cMapUrl && standardFontDataUrl && isValidFetchUrl(cMapUrl, document.baseURI***REMOVED*** && isValidFetchUrl(standardFontDataUrl, document.baseURI***REMOVED***;
  const styleElement = null;
  setVerbosityLevel(verbosity***REMOVED***;
  const transportFactory = {
    canvasFactory: new CanvasFactory({
      ownerDocument,
      enableHWA
    ***REMOVED******REMOVED***,
    filterFactory: new FilterFactory({
      docId,
      ownerDocument
    ***REMOVED******REMOVED***,
    cMapReaderFactory: useWorkerFetch ? null : new CMapReaderFactory({
      baseUrl: cMapUrl,
      isCompressed: cMapPacked
    ***REMOVED******REMOVED***,
    standardFontDataFactory: useWorkerFetch ? null : new StandardFontDataFactory({
      baseUrl: standardFontDataUrl
    ***REMOVED******REMOVED***
  ***REMOVED***;
  if (!worker***REMOVED*** {
    const workerParams = {
      verbosity,
      port: GlobalWorkerOptions.workerPort
    ***REMOVED***;
    worker = workerParams.port ? PDFWorker.fromPort(workerParams***REMOVED*** : new PDFWorker(workerParams***REMOVED***;
    task._worker = worker;
  ***REMOVED***
  const docParams = {
    docId,
    apiVersion: "4.10.38",
    data,
    password,
    disableAutoFetch,
    rangeChunkSize,
    length,
    docBaseUrl,
    enableXfa,
    evaluatorOptions: {
      maxImageSize,
      disableFontFace,
      ignoreErrors,
      isEvalSupported,
      isOffscreenCanvasSupported,
      isImageDecoderSupported,
      canvasMaxAreaInBytes,
      fontExtraProperties,
      useSystemFonts,
      cMapUrl: useWorkerFetch ? cMapUrl : null,
      standardFontDataUrl: useWorkerFetch ? standardFontDataUrl : null
    ***REMOVED***
  ***REMOVED***;
  const transportParams = {
    disableFontFace,
    fontExtraProperties,
    ownerDocument,
    pdfBug,
    styleElement,
    loadingParams: {
      disableAutoFetch,
      enableXfa
    ***REMOVED***
  ***REMOVED***;
  worker.promise.then(function (***REMOVED*** {
    if (task.destroyed***REMOVED*** {
      throw new Error("Loading aborted"***REMOVED***;
    ***REMOVED***
    if (worker.destroyed***REMOVED*** {
      throw new Error("Worker was destroyed"***REMOVED***;
    ***REMOVED***
    const workerIdPromise = worker.messageHandler.sendWithPromise("GetDocRequest", docParams, data ? [data.buffer] : null***REMOVED***;
    let networkStream;
    if (rangeTransport***REMOVED*** {
      networkStream = new PDFDataTransportStream(rangeTransport, {
        disableRange,
        disableStream
      ***REMOVED******REMOVED***;
    ***REMOVED*** else if (!data***REMOVED*** {
      if (!url***REMOVED*** {
        throw new Error("getDocument - no `url` parameter provided."***REMOVED***;
      ***REMOVED***
      let NetworkStream;
      if (isNodeJS***REMOVED*** {
        if (isValidFetchUrl(url***REMOVED******REMOVED*** {
          if (typeof fetch === "undefined" || typeof Response === "undefined" || !("body" in Response.prototype***REMOVED******REMOVED*** {
            throw new Error("getDocument - the Fetch API was disabled in Node.js, see `--no-experimental-fetch`."***REMOVED***;
          ***REMOVED***
          NetworkStream = PDFFetchStream;
        ***REMOVED*** else {
          NetworkStream = PDFNodeStream;
        ***REMOVED***
      ***REMOVED*** else {
        NetworkStream = isValidFetchUrl(url***REMOVED*** ? PDFFetchStream : PDFNetworkStream;
      ***REMOVED***
      networkStream = new NetworkStream({
        url,
        length,
        httpHeaders,
        withCredentials,
        rangeChunkSize,
        disableRange,
        disableStream
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return workerIdPromise.then(workerId => {
      if (task.destroyed***REMOVED*** {
        throw new Error("Loading aborted"***REMOVED***;
      ***REMOVED***
      if (worker.destroyed***REMOVED*** {
        throw new Error("Worker was destroyed"***REMOVED***;
      ***REMOVED***
      const messageHandler = new MessageHandler(docId, workerId, worker.port***REMOVED***;
      const transport = new WorkerTransport(messageHandler, task, networkStream, transportParams, transportFactory***REMOVED***;
      task._transport = transport;
      messageHandler.send("Ready", null***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***.catch(task._capability.reject***REMOVED***;
  return task;
***REMOVED***
function getUrlProp(val***REMOVED*** {
  if (val instanceof URL***REMOVED*** {
    return val.href;
  ***REMOVED***
***REMOVED***
    return new URL(val, window.location***REMOVED***.href;
  ***REMOVED*** catch {
    if (isNodeJS && typeof val === "string"***REMOVED*** {
      return val;
    ***REMOVED***
  ***REMOVED***
  throw new Error("Invalid PDF url data: " + "either string or URL-object is expected in the url property."***REMOVED***;
***REMOVED***
function getDataProp(val***REMOVED*** {
  if (isNodeJS && typeof Buffer !== "undefined" && val instanceof Buffer***REMOVED*** {
    throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`."***REMOVED***;
  ***REMOVED***
  if (val instanceof Uint8Array && val.byteLength === val.buffer.byteLength***REMOVED*** {
    return val;
  ***REMOVED***
  if (typeof val === "string"***REMOVED*** {
    return stringToBytes(val***REMOVED***;
  ***REMOVED***
  if (val instanceof ArrayBuffer || ArrayBuffer.isView(val***REMOVED*** || typeof val === "object" && !isNaN(val?.length***REMOVED******REMOVED*** {
    return new Uint8Array(val***REMOVED***;
  ***REMOVED***
  throw new Error("Invalid PDF binary data: either TypedArray, " + "string, or array-like object is expected in the data property."***REMOVED***;
***REMOVED***
function isRefProxy(ref***REMOVED*** {
  return typeof ref === "object" && Number.isInteger(ref?.num***REMOVED*** && ref.num >= 0 && Number.isInteger(ref?.gen***REMOVED*** && ref.gen >= 0;
***REMOVED***
class PDFDocumentLoadingTask {
  static #docId = 0;
  constructor(***REMOVED*** {
    this._capability = Promise.withResolvers(***REMOVED***;
    this._transport = null;
    this._worker = null;
    this.docId = `d${PDFDocumentLoadingTask.#docId++***REMOVED***`;
    this.destroyed = false;
    this.onPassword = null;
    this.onProgress = null;
  ***REMOVED***
  get promise(***REMOVED*** {
    return this._capability.promise;
  ***REMOVED***
  async destroy(***REMOVED*** {
    this.destroyed = true;
  ***REMOVED***
      if (this._worker?.port***REMOVED*** {
        this._worker._pendingDestroy = true;
      ***REMOVED***
      await this._transport?.destroy(***REMOVED***;
    ***REMOVED*** catch (ex***REMOVED*** {
      if (this._worker?.port***REMOVED*** {
        delete this._worker._pendingDestroy;
      ***REMOVED***
      throw ex;
    ***REMOVED***
    this._transport = null;
    this._worker?.destroy(***REMOVED***;
    this._worker = null;
  ***REMOVED***
***REMOVED***
class PDFDataRangeTransport {
  constructor(length, initialData, progressiveDone = false, contentDispositionFilename = null***REMOVED*** {
    this.length = length;
    this.initialData = initialData;
    this.progressiveDone = progressiveDone;
    this.contentDispositionFilename = contentDispositionFilename;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._progressiveDoneListeners = [];
    this._readyCapability = Promise.withResolvers(***REMOVED***;
  ***REMOVED***
  addRangeListener(listener***REMOVED*** {
    this._rangeListeners.push(listener***REMOVED***;
  ***REMOVED***
  addProgressListener(listener***REMOVED*** {
    this._progressListeners.push(listener***REMOVED***;
  ***REMOVED***
  addProgressiveReadListener(listener***REMOVED*** {
    this._progressiveReadListeners.push(listener***REMOVED***;
  ***REMOVED***
  addProgressiveDoneListener(listener***REMOVED*** {
    this._progressiveDoneListeners.push(listener***REMOVED***;
  ***REMOVED***
  onDataRange(begin, chunk***REMOVED*** {
    for (const listener of this._rangeListeners***REMOVED*** {
      listener(begin, chunk***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  onDataProgress(loaded, total***REMOVED*** {
    this._readyCapability.promise.then((***REMOVED*** => {
      for (const listener of this._progressListeners***REMOVED*** {
        listener(loaded, total***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  onDataProgressiveRead(chunk***REMOVED*** {
    this._readyCapability.promise.then((***REMOVED*** => {
      for (const listener of this._progressiveReadListeners***REMOVED*** {
        listener(chunk***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  onDataProgressiveDone(***REMOVED*** {
    this._readyCapability.promise.then((***REMOVED*** => {
      for (const listener of this._progressiveDoneListeners***REMOVED*** {
        listener(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  transportReady(***REMOVED*** {
    this._readyCapability.resolve(***REMOVED***;
  ***REMOVED***
  requestDataRange(begin, end***REMOVED*** {
    unreachable("Abstract method PDFDataRangeTransport.requestDataRange"***REMOVED***;
  ***REMOVED***
  abort(***REMOVED*** {***REMOVED***
***REMOVED***
class PDFDocumentProxy {
  constructor(pdfInfo, transport***REMOVED*** {
    this._pdfInfo = pdfInfo;
    this._transport = transport;
  ***REMOVED***
  get annotationStorage(***REMOVED*** {
    return this._transport.annotationStorage;
  ***REMOVED***
  get canvasFactory(***REMOVED*** {
    return this._transport.canvasFactory;
  ***REMOVED***
  get filterFactory(***REMOVED*** {
    return this._transport.filterFactory;
  ***REMOVED***
  get numPages(***REMOVED*** {
    return this._pdfInfo.numPages;
  ***REMOVED***
  get fingerprints(***REMOVED*** {
    return this._pdfInfo.fingerprints;
  ***REMOVED***
  get isPureXfa(***REMOVED*** {
    return shadow(this, "isPureXfa", !!this._transport._htmlForXfa***REMOVED***;
  ***REMOVED***
  get allXfaHtml(***REMOVED*** {
    return this._transport._htmlForXfa;
  ***REMOVED***
  getPage(pageNumber***REMOVED*** {
    return this._transport.getPage(pageNumber***REMOVED***;
  ***REMOVED***
  getPageIndex(ref***REMOVED*** {
    return this._transport.getPageIndex(ref***REMOVED***;
  ***REMOVED***
  getDestinations(***REMOVED*** {
    return this._transport.getDestinations(***REMOVED***;
  ***REMOVED***
  getDestination(id***REMOVED*** {
    return this._transport.getDestination(id***REMOVED***;
  ***REMOVED***
  getPageLabels(***REMOVED*** {
    return this._transport.getPageLabels(***REMOVED***;
  ***REMOVED***
  getPageLayout(***REMOVED*** {
    return this._transport.getPageLayout(***REMOVED***;
  ***REMOVED***
  getPageMode(***REMOVED*** {
    return this._transport.getPageMode(***REMOVED***;
  ***REMOVED***
  getViewerPreferences(***REMOVED*** {
    return this._transport.getViewerPreferences(***REMOVED***;
  ***REMOVED***
  getOpenAction(***REMOVED*** {
    return this._transport.getOpenAction(***REMOVED***;
  ***REMOVED***
  getAttachments(***REMOVED*** {
    return this._transport.getAttachments(***REMOVED***;
  ***REMOVED***
  getJSActions(***REMOVED*** {
    return this._transport.getDocJSActions(***REMOVED***;
  ***REMOVED***
  getOutline(***REMOVED*** {
    return this._transport.getOutline(***REMOVED***;
  ***REMOVED***
  getOptionalContentConfig({
    intent = "display"
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const {
      renderingIntent
    ***REMOVED*** = this._transport.getRenderingIntent(intent***REMOVED***;
    return this._transport.getOptionalContentConfig(renderingIntent***REMOVED***;
  ***REMOVED***
  getPermissions(***REMOVED*** {
    return this._transport.getPermissions(***REMOVED***;
  ***REMOVED***
  getMetadata(***REMOVED*** {
    return this._transport.getMetadata(***REMOVED***;
  ***REMOVED***
  getMarkInfo(***REMOVED*** {
    return this._transport.getMarkInfo(***REMOVED***;
  ***REMOVED***
  getData(***REMOVED*** {
    return this._transport.getData(***REMOVED***;
  ***REMOVED***
  saveDocument(***REMOVED*** {
    return this._transport.saveDocument(***REMOVED***;
  ***REMOVED***
  getDownloadInfo(***REMOVED*** {
    return this._transport.downloadInfoCapability.promise;
  ***REMOVED***
  cleanup(keepLoadedFonts = false***REMOVED*** {
    return this._transport.startCleanup(keepLoadedFonts || this.isPureXfa***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    return this.loadingTask.destroy(***REMOVED***;
  ***REMOVED***
  cachedPageNumber(ref***REMOVED*** {
    return this._transport.cachedPageNumber(ref***REMOVED***;
  ***REMOVED***
  get loadingParams(***REMOVED*** {
    return this._transport.loadingParams;
  ***REMOVED***
  get loadingTask(***REMOVED*** {
    return this._transport.loadingTask;
  ***REMOVED***
  getFieldObjects(***REMOVED*** {
    return this._transport.getFieldObjects(***REMOVED***;
  ***REMOVED***
  hasJSActions(***REMOVED*** {
    return this._transport.hasJSActions(***REMOVED***;
  ***REMOVED***
  getCalculationOrderIds(***REMOVED*** {
    return this._transport.getCalculationOrderIds(***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFPageProxy {
  #delayedCleanupTimeout = null;
  #pendingCleanup = false;
  constructor(pageIndex, pageInfo, transport, pdfBug = false***REMOVED*** {
    this._pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this._transport = transport;
    this._stats = pdfBug ? new StatTimer(***REMOVED*** : null;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects(***REMOVED***;
    this._maybeCleanupAfterRender = false;
    this._intentStates = new Map(***REMOVED***;
    this.destroyed = false;
  ***REMOVED***
  get pageNumber(***REMOVED*** {
    return this._pageIndex + 1;
  ***REMOVED***
  get rotate(***REMOVED*** {
    return this._pageInfo.rotate;
  ***REMOVED***
  get ref(***REMOVED*** {
    return this._pageInfo.ref;
  ***REMOVED***
  get userUnit(***REMOVED*** {
    return this._pageInfo.userUnit;
  ***REMOVED***
  get view(***REMOVED*** {
    return this._pageInfo.view;
  ***REMOVED***
  getViewport({
    scale,
    rotation = this.rotate,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    return new PageViewport({
      viewBox: this.view,
      userUnit: this.userUnit,
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getAnnotations({
    intent = "display"
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const {
      renderingIntent
    ***REMOVED*** = this._transport.getRenderingIntent(intent***REMOVED***;
    return this._transport.getAnnotations(this._pageIndex, renderingIntent***REMOVED***;
  ***REMOVED***
  getJSActions(***REMOVED*** {
    return this._transport.getPageJSActions(this._pageIndex***REMOVED***;
  ***REMOVED***
  get filterFactory(***REMOVED*** {
    return this._transport.filterFactory;
  ***REMOVED***
  get isPureXfa(***REMOVED*** {
    return shadow(this, "isPureXfa", !!this._transport._htmlForXfa***REMOVED***;
  ***REMOVED***
  async getXfa(***REMOVED*** {
    return this._transport._htmlForXfa?.children[this._pageIndex] || null;
  ***REMOVED***
  render({
    canvasContext,
    viewport,
    intent = "display",
    annotationMode = AnnotationMode.ENABLE,
    transform = null,
    background = null,
    optionalContentConfigPromise = null,
    annotationCanvasMap = null,
    pageColors = null,
    printAnnotationStorage = null,
    isEditing = false
  ***REMOVED******REMOVED*** {
    this._stats?.time("Overall"***REMOVED***;
    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage, isEditing***REMOVED***;
    const {
      renderingIntent,
      cacheKey
    ***REMOVED*** = intentArgs;
    this.#pendingCleanup = false;
    this.#abortDelayedCleanup(***REMOVED***;
    optionalContentConfigPromise ||= this._transport.getOptionalContentConfig(renderingIntent***REMOVED***;
    let intentState = this._intentStates.get(cacheKey***REMOVED***;
    if (!intentState***REMOVED*** {
      intentState = Object.create(null***REMOVED***;
      this._intentStates.set(cacheKey, intentState***REMOVED***;
    ***REMOVED***
    if (intentState.streamReaderCancelTimeout***REMOVED*** {
      clearTimeout(intentState.streamReaderCancelTimeout***REMOVED***;
      intentState.streamReaderCancelTimeout = null;
    ***REMOVED***
    const intentPrint = !!(renderingIntent & RenderingIntentFlag.PRINT***REMOVED***;
    if (!intentState.displayReadyCapability***REMOVED*** {
      intentState.displayReadyCapability = Promise.withResolvers(***REMOVED***;
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false,
        separateAnnots: null
      ***REMOVED***;
      this._stats?.time("Page Request"***REMOVED***;
      this._pumpOperatorList(intentArgs***REMOVED***;
    ***REMOVED***
    const complete = error => {
      intentState.renderTasks.delete(internalRenderTask***REMOVED***;
      if (this._maybeCleanupAfterRender || intentPrint***REMOVED*** {
        this.#pendingCleanup = true;
      ***REMOVED***
      this.#tryCleanup(!intentPrint***REMOVED***;
      if (error***REMOVED*** {
        internalRenderTask.capability.reject(error***REMOVED***;
        this._abortOperatorList({
          intentState,
          reason: error instanceof Error ? error : new Error(error***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED*** else {
        internalRenderTask.capability.resolve(***REMOVED***;
      ***REMOVED***
      if (this._stats***REMOVED*** {
        this._stats.timeEnd("Rendering"***REMOVED***;
        this._stats.timeEnd("Overall"***REMOVED***;
        if (globalThis.Stats?.enabled***REMOVED*** {
          globalThis.Stats.add(this.pageNumber, this._stats***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
    const internalRenderTask = new InternalRenderTask({
      callback: complete,
      params: {
        canvasContext,
        viewport,
        transform,
        background
      ***REMOVED***,
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap,
      operatorList: intentState.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !intentPrint,
      pdfBug: this._pdfBug,
      pageColors
    ***REMOVED******REMOVED***;
    (intentState.renderTasks ||= new Set(***REMOVED******REMOVED***.add(internalRenderTask***REMOVED***;
    const renderTask = internalRenderTask.task;
    Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]***REMOVED***.then(([transparency, optionalContentConfig]***REMOVED*** => {
      if (this.destroyed***REMOVED*** {
        complete(***REMOVED***;
        return;
      ***REMOVED***
      this._stats?.time("Rendering"***REMOVED***;
      if (!(optionalContentConfig.renderingIntent & renderingIntent***REMOVED******REMOVED*** {
        throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` " + "and `PDFDocumentProxy.getOptionalContentConfig` methods."***REMOVED***;
      ***REMOVED***
      internalRenderTask.initializeGraphics({
        transparency,
        optionalContentConfig
      ***REMOVED******REMOVED***;
      internalRenderTask.operatorListChanged(***REMOVED***;
    ***REMOVED******REMOVED***.catch(complete***REMOVED***;
    return renderTask;
  ***REMOVED***
  getOperatorList({
    intent = "display",
    annotationMode = AnnotationMode.ENABLE,
    printAnnotationStorage = null,
    isEditing = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    function operatorListChanged(***REMOVED*** {
      if (intentState.operatorList.lastChunk***REMOVED*** {
        intentState.opListReadCapability.resolve(intentState.operatorList***REMOVED***;
        intentState.renderTasks.delete(opListTask***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const intentArgs = this._transport.getRenderingIntent(intent, annotationMode, printAnnotationStorage, isEditing, true***REMOVED***;
    let intentState = this._intentStates.get(intentArgs.cacheKey***REMOVED***;
    if (!intentState***REMOVED*** {
      intentState = Object.create(null***REMOVED***;
      this._intentStates.set(intentArgs.cacheKey, intentState***REMOVED***;
    ***REMOVED***
    let opListTask;
    if (!intentState.opListReadCapability***REMOVED*** {
      opListTask = Object.create(null***REMOVED***;
      opListTask.operatorListChanged = operatorListChanged;
      intentState.opListReadCapability = Promise.withResolvers(***REMOVED***;
      (intentState.renderTasks ||= new Set(***REMOVED******REMOVED***.add(opListTask***REMOVED***;
      intentState.operatorList = {
        fnArray: [],
        argsArray: [],
        lastChunk: false,
        separateAnnots: null
      ***REMOVED***;
      this._stats?.time("Page Request"***REMOVED***;
      this._pumpOperatorList(intentArgs***REMOVED***;
    ***REMOVED***
    return intentState.opListReadCapability.promise;
  ***REMOVED***
  streamTextContent({
    includeMarkedContent = false,
    disableNormalization = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    const TEXT_CONTENT_CHUNK_SIZE = 100;
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageIndex: this._pageIndex,
      includeMarkedContent: includeMarkedContent === true,
      disableNormalization: disableNormalization === true
    ***REMOVED***, {
      highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
      size(textContent***REMOVED*** {
        return textContent.items.length;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getTextContent(params = {***REMOVED******REMOVED*** {
    if (this._transport._htmlForXfa***REMOVED*** {
      return this.getXfa(***REMOVED***.then(xfa => XfaText.textContent(xfa***REMOVED******REMOVED***;
    ***REMOVED***
    const readableStream = this.streamTextContent(params***REMOVED***;
    return new Promise(function (resolve, reject***REMOVED*** {
      function pump(***REMOVED*** {
        reader.read(***REMOVED***.then(function ({
          value,
          done
        ***REMOVED******REMOVED*** {
          if (done***REMOVED*** {
            resolve(textContent***REMOVED***;
            return;
          ***REMOVED***
          textContent.lang ??= value.lang;
          Object.assign(textContent.styles, value.styles***REMOVED***;
          textContent.items.push(...value.items***REMOVED***;
          pump(***REMOVED***;
        ***REMOVED***, reject***REMOVED***;
      ***REMOVED***
      const reader = readableStream.getReader(***REMOVED***;
      const textContent = {
        items: [],
        styles: Object.create(null***REMOVED***,
        lang: null
      ***REMOVED***;
      pump(***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getStructTree(***REMOVED*** {
    return this._transport.getStructTree(this._pageIndex***REMOVED***;
  ***REMOVED***
  _destroy(***REMOVED*** {
    this.destroyed = true;
    const waitOn = [];
    for (const intentState of this._intentStates.values(***REMOVED******REMOVED*** {
      this._abortOperatorList({
        intentState,
        reason: new Error("Page was destroyed."***REMOVED***,
        force: true
      ***REMOVED******REMOVED***;
      if (intentState.opListReadCapability***REMOVED*** {
        continue;
      ***REMOVED***
      for (const internalRenderTask of intentState.renderTasks***REMOVED*** {
        waitOn.push(internalRenderTask.completed***REMOVED***;
        internalRenderTask.cancel(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.objs.clear(***REMOVED***;
    this.#pendingCleanup = false;
    this.#abortDelayedCleanup(***REMOVED***;
    return Promise.all(waitOn***REMOVED***;
  ***REMOVED***
  cleanup(resetStats = false***REMOVED*** {
    this.#pendingCleanup = true;
    const success = this.#tryCleanup(false***REMOVED***;
    if (resetStats && success***REMOVED*** {
      this._stats &&= new StatTimer(***REMOVED***;
    ***REMOVED***
    return success;
  ***REMOVED***
  #tryCleanup(delayed = false***REMOVED*** {
    this.#abortDelayedCleanup(***REMOVED***;
    if (!this.#pendingCleanup || this.destroyed***REMOVED*** {
      return false;
    ***REMOVED***
    if (delayed***REMOVED*** {
      this.#delayedCleanupTimeout = setTimeout((***REMOVED*** => {
        this.#delayedCleanupTimeout = null;
        this.#tryCleanup(false***REMOVED***;
      ***REMOVED***, DELAYED_CLEANUP_TIMEOUT***REMOVED***;
      return false;
    ***REMOVED***
    for (const {
      renderTasks,
      operatorList
    ***REMOVED*** of this._intentStates.values(***REMOVED******REMOVED*** {
      if (renderTasks.size > 0 || !operatorList.lastChunk***REMOVED*** {
        return false;
      ***REMOVED***
    ***REMOVED***
    this._intentStates.clear(***REMOVED***;
    this.objs.clear(***REMOVED***;
    this.#pendingCleanup = false;
    return true;
  ***REMOVED***
  #abortDelayedCleanup(***REMOVED*** {
    if (this.#delayedCleanupTimeout***REMOVED*** {
      clearTimeout(this.#delayedCleanupTimeout***REMOVED***;
      this.#delayedCleanupTimeout = null;
    ***REMOVED***
  ***REMOVED***
  _startRenderPage(transparency, cacheKey***REMOVED*** {
    const intentState = this._intentStates.get(cacheKey***REMOVED***;
    if (!intentState***REMOVED*** {
      return;
    ***REMOVED***
    this._stats?.timeEnd("Page Request"***REMOVED***;
    intentState.displayReadyCapability?.resolve(transparency***REMOVED***;
  ***REMOVED***
  _renderPageChunk(operatorListChunk, intentState***REMOVED*** {
    for (let i = 0, ii = operatorListChunk.length; i < ii; i++***REMOVED*** {
      intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]***REMOVED***;
      intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]***REMOVED***;
    ***REMOVED***
    intentState.operatorList.lastChunk = operatorListChunk.lastChunk;
    intentState.operatorList.separateAnnots = operatorListChunk.separateAnnots;
    for (const internalRenderTask of intentState.renderTasks***REMOVED*** {
      internalRenderTask.operatorListChanged(***REMOVED***;
    ***REMOVED***
    if (operatorListChunk.lastChunk***REMOVED*** {
      this.#tryCleanup(true***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _pumpOperatorList({
    renderingIntent,
    cacheKey,
    annotationStorageSerializable,
    modifiedIds
  ***REMOVED******REMOVED*** {
    const {
      map,
      transfer
    ***REMOVED*** = annotationStorageSerializable;
    const readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", {
      pageIndex: this._pageIndex,
      intent: renderingIntent,
      cacheKey,
      annotationStorage: map,
      modifiedIds
    ***REMOVED***, transfer***REMOVED***;
    const reader = readableStream.getReader(***REMOVED***;
    const intentState = this._intentStates.get(cacheKey***REMOVED***;
    intentState.streamReader = reader;
    const pump = (***REMOVED*** => {
      reader.read(***REMOVED***.then(({
        value,
        done
      ***REMOVED******REMOVED*** => {
        if (done***REMOVED*** {
          intentState.streamReader = null;
          return;
        ***REMOVED***
        if (this._transport.destroyed***REMOVED*** {
          return;
        ***REMOVED***
        this._renderPageChunk(value, intentState***REMOVED***;
        pump(***REMOVED***;
      ***REMOVED***, reason => {
        intentState.streamReader = null;
        if (this._transport.destroyed***REMOVED*** {
          return;
        ***REMOVED***
        if (intentState.operatorList***REMOVED*** {
          intentState.operatorList.lastChunk = true;
          for (const internalRenderTask of intentState.renderTasks***REMOVED*** {
            internalRenderTask.operatorListChanged(***REMOVED***;
          ***REMOVED***
          this.#tryCleanup(true***REMOVED***;
        ***REMOVED***
        if (intentState.displayReadyCapability***REMOVED*** {
          intentState.displayReadyCapability.reject(reason***REMOVED***;
        ***REMOVED*** else if (intentState.opListReadCapability***REMOVED*** {
          intentState.opListReadCapability.reject(reason***REMOVED***;
        ***REMOVED*** else {
          throw reason;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    pump(***REMOVED***;
  ***REMOVED***
  _abortOperatorList({
    intentState,
    reason,
    force = false
  ***REMOVED******REMOVED*** {
    if (!intentState.streamReader***REMOVED*** {
      return;
    ***REMOVED***
    if (intentState.streamReaderCancelTimeout***REMOVED*** {
      clearTimeout(intentState.streamReaderCancelTimeout***REMOVED***;
      intentState.streamReaderCancelTimeout = null;
    ***REMOVED***
    if (!force***REMOVED*** {
      if (intentState.renderTasks.size > 0***REMOVED*** {
        return;
      ***REMOVED***
      if (reason instanceof RenderingCancelledException***REMOVED*** {
        let delay = RENDERING_CANCELLED_TIMEOUT;
        if (reason.extraDelay > 0 && reason.extraDelay < 1000***REMOVED*** {
          delay += reason.extraDelay;
        ***REMOVED***
        intentState.streamReaderCancelTimeout = setTimeout((***REMOVED*** => {
          intentState.streamReaderCancelTimeout = null;
          this._abortOperatorList({
            intentState,
            reason,
            force: true
          ***REMOVED******REMOVED***;
        ***REMOVED***, delay***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    intentState.streamReader.cancel(new AbortException(reason.message***REMOVED******REMOVED***.catch((***REMOVED*** => {***REMOVED******REMOVED***;
    intentState.streamReader = null;
    if (this._transport.destroyed***REMOVED*** {
      return;
    ***REMOVED***
    for (const [curCacheKey, curIntentState] of this._intentStates***REMOVED*** {
      if (curIntentState === intentState***REMOVED*** {
        this._intentStates.delete(curCacheKey***REMOVED***;
        break;
      ***REMOVED***
    ***REMOVED***
    this.cleanup(***REMOVED***;
  ***REMOVED***
  get stats(***REMOVED*** {
    return this._stats;
  ***REMOVED***
***REMOVED***
class LoopbackPort {
  #listeners = new Map(***REMOVED***;
  #deferred = Promise.resolve(***REMOVED***;
  postMessage(obj, transfer***REMOVED*** {
    const event = {
      data: structuredClone(obj, transfer ? {
        transfer
      ***REMOVED*** : null***REMOVED***
    ***REMOVED***;
    this.#deferred.then((***REMOVED*** => {
      for (const [listener] of this.#listeners***REMOVED*** {
        listener.call(this, event***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  addEventListener(name, listener, options = null***REMOVED*** {
    let rmAbort = null;
    if (options?.signal instanceof AbortSignal***REMOVED*** {
      const {
        signal
      ***REMOVED*** = options;
      if (signal.aborted***REMOVED*** {
        warn("LoopbackPort - cannot use an `aborted` signal."***REMOVED***;
        return;
      ***REMOVED***
      const onAbort = (***REMOVED*** => this.removeEventListener(name, listener***REMOVED***;
      rmAbort = (***REMOVED*** => signal.removeEventListener("abort", onAbort***REMOVED***;
      signal.addEventListener("abort", onAbort***REMOVED***;
    ***REMOVED***
    this.#listeners.set(listener, rmAbort***REMOVED***;
  ***REMOVED***
  removeEventListener(name, listener***REMOVED*** {
    const rmAbort = this.#listeners.get(listener***REMOVED***;
    rmAbort?.(***REMOVED***;
    this.#listeners.delete(listener***REMOVED***;
  ***REMOVED***
  terminate(***REMOVED*** {
    for (const [, rmAbort] of this.#listeners***REMOVED*** {
      rmAbort?.(***REMOVED***;
    ***REMOVED***
    this.#listeners.clear(***REMOVED***;
  ***REMOVED***
***REMOVED***
class PDFWorker {
  static #fakeWorkerId = 0;
  static #isWorkerDisabled = false;
  static #workerPorts;
  static {
    if (isNodeJS***REMOVED*** {
      this.#isWorkerDisabled = true;
      GlobalWorkerOptions.workerSrc ||= "./pdf.worker.mjs";
    ***REMOVED***
    this._isSameOrigin = (baseUrl, otherUrl***REMOVED*** => {
      let base;
    ***REMOVED***
        base = new URL(baseUrl***REMOVED***;
        if (!base.origin || base.origin === "null"***REMOVED*** {
          return false;
        ***REMOVED***
      ***REMOVED*** catch {
        return false;
      ***REMOVED***
      const other = new URL(otherUrl, base***REMOVED***;
      return base.origin === other.origin;
    ***REMOVED***;
    this._createCDNWrapper = url => {
      const wrapper = `await import("${url***REMOVED***"***REMOVED***;`;
      return URL.createObjectURL(new Blob([wrapper], {
        type: "text/javascript"
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED***;
  ***REMOVED***
  constructor({
    name = null,
    port = null,
    verbosity = getVerbosityLevel(***REMOVED***
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    this.name = name;
    this.destroyed = false;
    this.verbosity = verbosity;
    this._readyCapability = Promise.withResolvers(***REMOVED***;
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;
    if (port***REMOVED*** {
      if (PDFWorker.#workerPorts?.has(port***REMOVED******REMOVED*** {
        throw new Error("Cannot use more than one PDFWorker per port."***REMOVED***;
      ***REMOVED***
      (PDFWorker.#workerPorts ||= new WeakMap(***REMOVED******REMOVED***.set(port, this***REMOVED***;
      this._initializeFromPort(port***REMOVED***;
      return;
    ***REMOVED***
    this._initialize(***REMOVED***;
  ***REMOVED***
  get promise(***REMOVED*** {
    return this._readyCapability.promise;
  ***REMOVED***
  #resolve(***REMOVED*** {
    this._readyCapability.resolve(***REMOVED***;
    this._messageHandler.send("configure", {
      verbosity: this.verbosity
    ***REMOVED******REMOVED***;
  ***REMOVED***
  get port(***REMOVED*** {
    return this._port;
  ***REMOVED***
  get messageHandler(***REMOVED*** {
    return this._messageHandler;
  ***REMOVED***
  _initializeFromPort(port***REMOVED*** {
    this._port = port;
    this._messageHandler = new MessageHandler("main", "worker", port***REMOVED***;
    this._messageHandler.on("ready", function (***REMOVED*** {***REMOVED******REMOVED***;
    this.#resolve(***REMOVED***;
  ***REMOVED***
  _initialize(***REMOVED*** {
    if (PDFWorker.#isWorkerDisabled || PDFWorker.#mainThreadWorkerMessageHandler***REMOVED*** {
      this._setupFakeWorker(***REMOVED***;
      return;
    ***REMOVED***
    let {
      workerSrc
    ***REMOVED*** = PDFWorker;
  ***REMOVED***
      if (!PDFWorker._isSameOrigin(window.location.href, workerSrc***REMOVED******REMOVED*** {
        workerSrc = PDFWorker._createCDNWrapper(new URL(workerSrc, window.location***REMOVED***.href***REMOVED***;
      ***REMOVED***
      const worker = new Worker(workerSrc, {
        type: "module"
      ***REMOVED******REMOVED***;
      const messageHandler = new MessageHandler("main", "worker", worker***REMOVED***;
      const terminateEarly = (***REMOVED*** => {
        ac.abort(***REMOVED***;
        messageHandler.destroy(***REMOVED***;
        worker.terminate(***REMOVED***;
        if (this.destroyed***REMOVED*** {
          this._readyCapability.reject(new Error("Worker was destroyed"***REMOVED******REMOVED***;
        ***REMOVED*** else {
          this._setupFakeWorker(***REMOVED***;
        ***REMOVED***
      ***REMOVED***;
      const ac = new AbortController(***REMOVED***;
      worker.addEventListener("error", (***REMOVED*** => {
        if (!this._webWorker***REMOVED*** {
          terminateEarly(***REMOVED***;
        ***REMOVED***
      ***REMOVED***, {
        signal: ac.signal
      ***REMOVED******REMOVED***;
      messageHandler.on("test", data => {
        ac.abort(***REMOVED***;
        if (this.destroyed || !data***REMOVED*** {
          terminateEarly(***REMOVED***;
          return;
        ***REMOVED***
        this._messageHandler = messageHandler;
        this._port = worker;
        this._webWorker = worker;
        this.#resolve(***REMOVED***;
      ***REMOVED******REMOVED***;
      messageHandler.on("ready", data => {
        ac.abort(***REMOVED***;
        if (this.destroyed***REMOVED*** {
          terminateEarly(***REMOVED***;
          return;
        ***REMOVED***
      ***REMOVED***
          sendTest(***REMOVED***;
        ***REMOVED*** catch {
          this._setupFakeWorker(***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
      const sendTest = (***REMOVED*** => {
        const testObj = new Uint8Array(***REMOVED***;
        messageHandler.send("test", testObj, [testObj.buffer]***REMOVED***;
      ***REMOVED***;
      sendTest(***REMOVED***;
      return;
    ***REMOVED*** catch {
      info("The worker has been disabled."***REMOVED***;
    ***REMOVED***
    this._setupFakeWorker(***REMOVED***;
  ***REMOVED***
  _setupFakeWorker(***REMOVED*** {
    if (!PDFWorker.#isWorkerDisabled***REMOVED*** {
      warn("Setting up fake worker."***REMOVED***;
      PDFWorker.#isWorkerDisabled = true;
    ***REMOVED***
    PDFWorker._setupFakeWorkerGlobal.then(WorkerMessageHandler => {
      if (this.destroyed***REMOVED*** {
        this._readyCapability.reject(new Error("Worker was destroyed"***REMOVED******REMOVED***;
        return;
      ***REMOVED***
      const port = new LoopbackPort(***REMOVED***;
      this._port = port;
      const id = `fake${PDFWorker.#fakeWorkerId++***REMOVED***`;
      const workerHandler = new MessageHandler(id + "_worker", id, port***REMOVED***;
      WorkerMessageHandler.setup(workerHandler, port***REMOVED***;
      this._messageHandler = new MessageHandler(id, id + "_worker", port***REMOVED***;
      this.#resolve(***REMOVED***;
    ***REMOVED******REMOVED***.catch(reason => {
      this._readyCapability.reject(new Error(`Setting up fake worker failed: "${reason.message***REMOVED***".`***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.destroyed = true;
    this._webWorker?.terminate(***REMOVED***;
    this._webWorker = null;
    PDFWorker.#workerPorts?.delete(this._port***REMOVED***;
    this._port = null;
    this._messageHandler?.destroy(***REMOVED***;
    this._messageHandler = null;
  ***REMOVED***
  static fromPort(params***REMOVED*** {
    if (!params?.port***REMOVED*** {
      throw new Error("PDFWorker.fromPort - invalid method signature."***REMOVED***;
    ***REMOVED***
    const cachedPort = this.#workerPorts?.get(params.port***REMOVED***;
    if (cachedPort***REMOVED*** {
      if (cachedPort._pendingDestroy***REMOVED*** {
        throw new Error("PDFWorker.fromPort - the worker is being destroyed.\n" + "Please remember to await `PDFDocumentLoadingTask.destroy(***REMOVED***`-calls."***REMOVED***;
      ***REMOVED***
      return cachedPort;
    ***REMOVED***
    return new PDFWorker(params***REMOVED***;
  ***REMOVED***
  static get workerSrc(***REMOVED*** {
    if (GlobalWorkerOptions.workerSrc***REMOVED*** {
      return GlobalWorkerOptions.workerSrc;
    ***REMOVED***
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.'***REMOVED***;
  ***REMOVED***
  static get #mainThreadWorkerMessageHandler(***REMOVED*** {
  ***REMOVED***
      return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
    ***REMOVED*** catch {
      return null;
    ***REMOVED***
  ***REMOVED***
  static get _setupFakeWorkerGlobal(***REMOVED*** {
    const loader = async (***REMOVED*** => {
      if (this.#mainThreadWorkerMessageHandler***REMOVED*** {
        return this.#mainThreadWorkerMessageHandler;
      ***REMOVED***
      const worker = await import(/*webpackIgnore: true*/this.workerSrc***REMOVED***;
      return worker.WorkerMessageHandler;
    ***REMOVED***;
    return shadow(this, "_setupFakeWorkerGlobal", loader(***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
class WorkerTransport {
  #methodPromises = new Map(***REMOVED***;
  #pageCache = new Map(***REMOVED***;
  #pagePromises = new Map(***REMOVED***;
  #pageRefCache = new Map(***REMOVED***;
  #passwordCapability = null;
  constructor(messageHandler, loadingTask, networkStream, params, factory***REMOVED*** {
    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects(***REMOVED***;
    this.fontLoader = new FontLoader({
      ownerDocument: params.ownerDocument,
      styleElement: params.styleElement
    ***REMOVED******REMOVED***;
    this.loadingParams = params.loadingParams;
    this._params = params;
    this.canvasFactory = factory.canvasFactory;
    this.filterFactory = factory.filterFactory;
    this.cMapReaderFactory = factory.cMapReaderFactory;
    this.standardFontDataFactory = factory.standardFontDataFactory;
    this.destroyed = false;
    this.destroyCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.downloadInfoCapability = Promise.withResolvers(***REMOVED***;
    this.setupMessageHandler(***REMOVED***;
  ***REMOVED***
  #cacheSimpleMethod(name, data = null***REMOVED*** {
    const cachedPromise = this.#methodPromises.get(name***REMOVED***;
    if (cachedPromise***REMOVED*** {
      return cachedPromise;
    ***REMOVED***
    const promise = this.messageHandler.sendWithPromise(name, data***REMOVED***;
    this.#methodPromises.set(name, promise***REMOVED***;
    return promise;
  ***REMOVED***
  get annotationStorage(***REMOVED*** {
    return shadow(this, "annotationStorage", new AnnotationStorage(***REMOVED******REMOVED***;
  ***REMOVED***
  getRenderingIntent(intent, annotationMode = AnnotationMode.ENABLE, printAnnotationStorage = null, isEditing = false, isOpList = false***REMOVED*** {
    let renderingIntent = RenderingIntentFlag.DISPLAY;
    let annotationStorageSerializable = SerializableEmpty;
    switch (intent***REMOVED*** {
      case "any":
        renderingIntent = RenderingIntentFlag.ANY;
        break;
      case "display":
        break;
      case "print":
        renderingIntent = RenderingIntentFlag.PRINT;
        break;
      default:
        warn(`getRenderingIntent - invalid intent: ${intent***REMOVED***`***REMOVED***;
    ***REMOVED***
    const annotationStorage = renderingIntent & RenderingIntentFlag.PRINT && printAnnotationStorage instanceof PrintAnnotationStorage ? printAnnotationStorage : this.annotationStorage;
    switch (annotationMode***REMOVED*** {
      case AnnotationMode.DISABLE:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_DISABLE;
        break;
      case AnnotationMode.ENABLE:
        break;
      case AnnotationMode.ENABLE_FORMS:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_FORMS;
        break;
      case AnnotationMode.ENABLE_STORAGE:
        renderingIntent += RenderingIntentFlag.ANNOTATIONS_STORAGE;
        annotationStorageSerializable = annotationStorage.serializable;
        break;
      default:
        warn(`getRenderingIntent - invalid annotationMode: ${annotationMode***REMOVED***`***REMOVED***;
    ***REMOVED***
    if (isEditing***REMOVED*** {
      renderingIntent += RenderingIntentFlag.IS_EDITING;
    ***REMOVED***
    if (isOpList***REMOVED*** {
      renderingIntent += RenderingIntentFlag.OPLIST;
    ***REMOVED***
    const {
      ids: modifiedIds,
      hash: modifiedIdsHash
    ***REMOVED*** = annotationStorage.modifiedIds;
    const cacheKeyBuf = [renderingIntent, annotationStorageSerializable.hash, modifiedIdsHash];
***REMOVED***
      renderingIntent,
      cacheKey: cacheKeyBuf.join("_"***REMOVED***,
      annotationStorageSerializable,
      modifiedIds
    ***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    if (this.destroyCapability***REMOVED*** {
      return this.destroyCapability.promise;
    ***REMOVED***
    this.destroyed = true;
    this.destroyCapability = Promise.withResolvers(***REMOVED***;
    this.#passwordCapability?.reject(new Error("Worker was destroyed during onPassword callback"***REMOVED******REMOVED***;
    const waitOn = [];
    for (const page of this.#pageCache.values(***REMOVED******REMOVED*** {
      waitOn.push(page._destroy(***REMOVED******REMOVED***;
    ***REMOVED***
    this.#pageCache.clear(***REMOVED***;
    this.#pagePromises.clear(***REMOVED***;
    this.#pageRefCache.clear(***REMOVED***;
    if (this.hasOwnProperty("annotationStorage"***REMOVED******REMOVED*** {
      this.annotationStorage.resetModified(***REMOVED***;
    ***REMOVED***
    const terminated = this.messageHandler.sendWithPromise("Terminate", null***REMOVED***;
    waitOn.push(terminated***REMOVED***;
    Promise.all(waitOn***REMOVED***.then((***REMOVED*** => {
      this.commonObjs.clear(***REMOVED***;
      this.fontLoader.clear(***REMOVED***;
      this.#methodPromises.clear(***REMOVED***;
      this.filterFactory.destroy(***REMOVED***;
      TextLayer.cleanup(***REMOVED***;
      this._networkStream?.cancelAllRequests(new AbortException("Worker was terminated."***REMOVED******REMOVED***;
      this.messageHandler?.destroy(***REMOVED***;
      this.messageHandler = null;
      this.destroyCapability.resolve(***REMOVED***;
    ***REMOVED***, this.destroyCapability.reject***REMOVED***;
    return this.destroyCapability.promise;
  ***REMOVED***
  setupMessageHandler(***REMOVED*** {
    const {
      messageHandler,
      loadingTask
    ***REMOVED*** = this;
    messageHandler.on("GetReader", (data, sink***REMOVED*** => {
      assert(this._networkStream, "GetReader - no `IPDFStream` instance available."***REMOVED***;
      this._fullReader = this._networkStream.getFullReader(***REMOVED***;
      this._fullReader.onProgress = evt => {
        this._lastProgress = {
          loaded: evt.loaded,
          total: evt.total
        ***REMOVED***;
      ***REMOVED***;
      sink.onPull = (***REMOVED*** => {
        this._fullReader.read(***REMOVED***.then(function ({
          value,
          done
        ***REMOVED******REMOVED*** {
          if (done***REMOVED*** {
            sink.close(***REMOVED***;
            return;
          ***REMOVED***
          assert(value instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."***REMOVED***;
          sink.enqueue(new Uint8Array(value***REMOVED***, 1, [value]***REMOVED***;
        ***REMOVED******REMOVED***.catch(reason => {
          sink.error(reason***REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***;
      sink.onCancel = reason => {
        this._fullReader.cancel(reason***REMOVED***;
        sink.ready.catch(readyReason => {
          if (this.destroyed***REMOVED*** {
            return;
          ***REMOVED***
          throw readyReason;
        ***REMOVED******REMOVED***;
      ***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("ReaderHeadersReady", async data => {
      await this._fullReader.headersReady;
      const {
        isStreamingSupported,
        isRangeSupported,
        contentLength
      ***REMOVED*** = this._fullReader;
      if (!isStreamingSupported || !isRangeSupported***REMOVED*** {
        if (this._lastProgress***REMOVED*** {
          loadingTask.onProgress?.(this._lastProgress***REMOVED***;
        ***REMOVED***
        this._fullReader.onProgress = evt => {
          loadingTask.onProgress?.({
            loaded: evt.loaded,
            total: evt.total
          ***REMOVED******REMOVED***;
        ***REMOVED***;
      ***REMOVED***
  ***REMOVED***
        isStreamingSupported,
        isRangeSupported,
        contentLength
      ***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("GetRangeReader", (data, sink***REMOVED*** => {
      assert(this._networkStream, "GetRangeReader - no `IPDFStream` instance available."***REMOVED***;
      const rangeReader = this._networkStream.getRangeReader(data.begin, data.end***REMOVED***;
      if (!rangeReader***REMOVED*** {
        sink.close(***REMOVED***;
        return;
      ***REMOVED***
      sink.onPull = (***REMOVED*** => {
        rangeReader.read(***REMOVED***.then(function ({
          value,
          done
        ***REMOVED******REMOVED*** {
          if (done***REMOVED*** {
            sink.close(***REMOVED***;
            return;
          ***REMOVED***
          assert(value instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."***REMOVED***;
          sink.enqueue(new Uint8Array(value***REMOVED***, 1, [value]***REMOVED***;
        ***REMOVED******REMOVED***.catch(reason => {
          sink.error(reason***REMOVED***;
        ***REMOVED******REMOVED***;
      ***REMOVED***;
      sink.onCancel = reason => {
        rangeReader.cancel(reason***REMOVED***;
        sink.ready.catch(readyReason => {
          if (this.destroyed***REMOVED*** {
            return;
          ***REMOVED***
          throw readyReason;
        ***REMOVED******REMOVED***;
      ***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("GetDoc", ({
      pdfInfo
    ***REMOVED******REMOVED*** => {
      this._numPages = pdfInfo.numPages;
      this._htmlForXfa = pdfInfo.htmlForXfa;
      delete pdfInfo.htmlForXfa;
      loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("DocException", ex => {
      loadingTask._capability.reject(wrapReason(ex***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("PasswordRequest", ex => {
      this.#passwordCapability = Promise.withResolvers(***REMOVED***;
    ***REMOVED***
        if (!loadingTask.onPassword***REMOVED*** {
          throw wrapReason(ex***REMOVED***;
        ***REMOVED***
        const updatePassword = password => {
          if (password instanceof Error***REMOVED*** {
            this.#passwordCapability.reject(password***REMOVED***;
          ***REMOVED*** else {
            this.#passwordCapability.resolve({
              password
            ***REMOVED******REMOVED***;
          ***REMOVED***
        ***REMOVED***;
        loadingTask.onPassword(updatePassword, ex.code***REMOVED***;
      ***REMOVED*** catch (err***REMOVED*** {
        this.#passwordCapability.reject(err***REMOVED***;
      ***REMOVED***
      return this.#passwordCapability.promise;
    ***REMOVED******REMOVED***;
    messageHandler.on("DataLoaded", data => {
      loadingTask.onProgress?.({
        loaded: data.length,
        total: data.length
      ***REMOVED******REMOVED***;
      this.downloadInfoCapability.resolve(data***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("StartRenderPage", data => {
      if (this.destroyed***REMOVED*** {
        return;
      ***REMOVED***
      const page = this.#pageCache.get(data.pageIndex***REMOVED***;
      page._startRenderPage(data.transparency, data.cacheKey***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("commonobj", ([id, type, exportedData]***REMOVED*** => {
      if (this.destroyed***REMOVED*** {
        return null;
      ***REMOVED***
      if (this.commonObjs.has(id***REMOVED******REMOVED*** {
        return null;
      ***REMOVED***
      switch (type***REMOVED*** {
        case "Font":
          const {
            disableFontFace,
            fontExtraProperties,
            pdfBug
          ***REMOVED*** = this._params;
          if ("error" in exportedData***REMOVED*** {
            const exportedError = exportedData.error;
            warn(`Error during font loading: ${exportedError***REMOVED***`***REMOVED***;
            this.commonObjs.resolve(id, exportedError***REMOVED***;
            break;
          ***REMOVED***
          const inspectFont = pdfBug && globalThis.FontInspector?.enabled ? (font, url***REMOVED*** => globalThis.FontInspector.fontAdded(font, url***REMOVED*** : null;
          const font = new FontFaceObject(exportedData, {
            disableFontFace,
            fontExtraProperties,
            inspectFont
          ***REMOVED******REMOVED***;
          this.fontLoader.bind(font***REMOVED***.catch((***REMOVED*** => messageHandler.sendWithPromise("FontFallback", {
            id
          ***REMOVED******REMOVED******REMOVED***.finally((***REMOVED*** => {
            if (!fontExtraProperties && font.data***REMOVED*** {
              font.data = null;
            ***REMOVED***
            this.commonObjs.resolve(id, font***REMOVED***;
          ***REMOVED******REMOVED***;
          break;
        case "CopyLocalImage":
          const {
            imageRef
          ***REMOVED*** = exportedData;
          assert(imageRef, "The imageRef must be defined."***REMOVED***;
          for (const pageProxy of this.#pageCache.values(***REMOVED******REMOVED*** {
            for (const [, data] of pageProxy.objs***REMOVED*** {
              if (data?.ref !== imageRef***REMOVED*** {
                continue;
              ***REMOVED***
              if (!data.dataLen***REMOVED*** {
                return null;
              ***REMOVED***
              this.commonObjs.resolve(id, structuredClone(data***REMOVED******REMOVED***;
              return data.dataLen;
            ***REMOVED***
          ***REMOVED***
          break;
        case "FontPath":
        case "Image":
        case "Pattern":
          this.commonObjs.resolve(id, exportedData***REMOVED***;
          break;
        default:
          throw new Error(`Got unknown common object type ${type***REMOVED***`***REMOVED***;
      ***REMOVED***
      return null;
    ***REMOVED******REMOVED***;
    messageHandler.on("obj", ([id, pageIndex, type, imageData]***REMOVED*** => {
      if (this.destroyed***REMOVED*** {
        return;
      ***REMOVED***
      const pageProxy = this.#pageCache.get(pageIndex***REMOVED***;
      if (pageProxy.objs.has(id***REMOVED******REMOVED*** {
        return;
      ***REMOVED***
      if (pageProxy._intentStates.size === 0***REMOVED*** {
        imageData?.bitmap?.close(***REMOVED***;
        return;
      ***REMOVED***
      switch (type***REMOVED*** {
        case "Image":
          pageProxy.objs.resolve(id, imageData***REMOVED***;
          if (imageData?.dataLen > MAX_IMAGE_SIZE_TO_CACHE***REMOVED*** {
            pageProxy._maybeCleanupAfterRender = true;
          ***REMOVED***
          break;
        case "Pattern":
          pageProxy.objs.resolve(id, imageData***REMOVED***;
          break;
        default:
          throw new Error(`Got unknown object type ${type***REMOVED***`***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    messageHandler.on("DocProgress", data => {
      if (this.destroyed***REMOVED*** {
        return;
      ***REMOVED***
      loadingTask.onProgress?.({
        loaded: data.loaded,
        total: data.total
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("FetchBuiltInCMap", async data => {
      if (this.destroyed***REMOVED*** {
        throw new Error("Worker was destroyed."***REMOVED***;
      ***REMOVED***
      if (!this.cMapReaderFactory***REMOVED*** {
        throw new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."***REMOVED***;
      ***REMOVED***
      return this.cMapReaderFactory.fetch(data***REMOVED***;
    ***REMOVED******REMOVED***;
    messageHandler.on("FetchStandardFontData", async data => {
      if (this.destroyed***REMOVED*** {
        throw new Error("Worker was destroyed."***REMOVED***;
      ***REMOVED***
      if (!this.standardFontDataFactory***REMOVED*** {
        throw new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter."***REMOVED***;
      ***REMOVED***
      return this.standardFontDataFactory.fetch(data***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getData(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetData", null***REMOVED***;
  ***REMOVED***
  saveDocument(***REMOVED*** {
    if (this.annotationStorage.size <= 0***REMOVED*** {
      warn("saveDocument called while `annotationStorage` is empty, " + "please use the getData-method instead."***REMOVED***;
    ***REMOVED***
    const {
      map,
      transfer
    ***REMOVED*** = this.annotationStorage.serializable;
    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: map,
      filename: this._fullReader?.filename ?? null
    ***REMOVED***, transfer***REMOVED***.finally((***REMOVED*** => {
      this.annotationStorage.resetModified(***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getPage(pageNumber***REMOVED*** {
    if (!Number.isInteger(pageNumber***REMOVED*** || pageNumber <= 0 || pageNumber > this._numPages***REMOVED*** {
      return Promise.reject(new Error("Invalid page request."***REMOVED******REMOVED***;
    ***REMOVED***
    const pageIndex = pageNumber - 1,
      cachedPromise = this.#pagePromises.get(pageIndex***REMOVED***;
    if (cachedPromise***REMOVED*** {
      return cachedPromise;
    ***REMOVED***
    const promise = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex
    ***REMOVED******REMOVED***.then(pageInfo => {
      if (this.destroyed***REMOVED*** {
        throw new Error("Transport destroyed"***REMOVED***;
      ***REMOVED***
      if (pageInfo.refStr***REMOVED*** {
        this.#pageRefCache.set(pageInfo.refStr, pageNumber***REMOVED***;
      ***REMOVED***
      const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.pdfBug***REMOVED***;
      this.#pageCache.set(pageIndex, page***REMOVED***;
      return page;
    ***REMOVED******REMOVED***;
    this.#pagePromises.set(pageIndex, promise***REMOVED***;
    return promise;
  ***REMOVED***
  getPageIndex(ref***REMOVED*** {
    if (!isRefProxy(ref***REMOVED******REMOVED*** {
      return Promise.reject(new Error("Invalid pageIndex request."***REMOVED******REMOVED***;
    ***REMOVED***
    return this.messageHandler.sendWithPromise("GetPageIndex", {
      num: ref.num,
      gen: ref.gen
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getAnnotations(pageIndex, intent***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex,
      intent
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getFieldObjects(***REMOVED*** {
    return this.#cacheSimpleMethod("GetFieldObjects"***REMOVED***;
  ***REMOVED***
  hasJSActions(***REMOVED*** {
    return this.#cacheSimpleMethod("HasJSActions"***REMOVED***;
  ***REMOVED***
  getCalculationOrderIds(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null***REMOVED***;
  ***REMOVED***
  getDestinations(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetDestinations", null***REMOVED***;
  ***REMOVED***
  getDestination(id***REMOVED*** {
    if (typeof id !== "string"***REMOVED*** {
      return Promise.reject(new Error("Invalid destination request."***REMOVED******REMOVED***;
    ***REMOVED***
    return this.messageHandler.sendWithPromise("GetDestination", {
      id
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getPageLabels(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetPageLabels", null***REMOVED***;
  ***REMOVED***
  getPageLayout(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetPageLayout", null***REMOVED***;
  ***REMOVED***
  getPageMode(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetPageMode", null***REMOVED***;
  ***REMOVED***
  getViewerPreferences(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null***REMOVED***;
  ***REMOVED***
  getOpenAction(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetOpenAction", null***REMOVED***;
  ***REMOVED***
  getAttachments(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetAttachments", null***REMOVED***;
  ***REMOVED***
  getDocJSActions(***REMOVED*** {
    return this.#cacheSimpleMethod("GetDocJSActions"***REMOVED***;
  ***REMOVED***
  getPageJSActions(pageIndex***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getStructTree(pageIndex***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getOutline(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetOutline", null***REMOVED***;
  ***REMOVED***
  getOptionalContentConfig(renderingIntent***REMOVED*** {
    return this.#cacheSimpleMethod("GetOptionalContentConfig"***REMOVED***.then(data => new OptionalContentConfig(data, renderingIntent***REMOVED******REMOVED***;
  ***REMOVED***
  getPermissions(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetPermissions", null***REMOVED***;
  ***REMOVED***
  getMetadata(***REMOVED*** {
    const name = "GetMetadata",
      cachedPromise = this.#methodPromises.get(name***REMOVED***;
    if (cachedPromise***REMOVED*** {
      return cachedPromise;
    ***REMOVED***
    const promise = this.messageHandler.sendWithPromise(name, null***REMOVED***.then(results => ({
      info: results[0],
      metadata: results[1] ? new Metadata(results[1]***REMOVED*** : null,
      contentDispositionFilename: this._fullReader?.filename ?? null,
      contentLength: this._fullReader?.contentLength ?? null
    ***REMOVED******REMOVED******REMOVED***;
    this.#methodPromises.set(name, promise***REMOVED***;
    return promise;
  ***REMOVED***
  getMarkInfo(***REMOVED*** {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null***REMOVED***;
  ***REMOVED***
  async startCleanup(keepLoadedFonts = false***REMOVED*** {
    if (this.destroyed***REMOVED*** {
      return;
    ***REMOVED***
    await this.messageHandler.sendWithPromise("Cleanup", null***REMOVED***;
    for (const page of this.#pageCache.values(***REMOVED******REMOVED*** {
      const cleanupSuccessful = page.cleanup(***REMOVED***;
      if (!cleanupSuccessful***REMOVED*** {
        throw new Error(`startCleanup: Page ${page.pageNumber***REMOVED*** is currently rendering.`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.commonObjs.clear(***REMOVED***;
    if (!keepLoadedFonts***REMOVED*** {
      this.fontLoader.clear(***REMOVED***;
    ***REMOVED***
    this.#methodPromises.clear(***REMOVED***;
    this.filterFactory.destroy(true***REMOVED***;
    TextLayer.cleanup(***REMOVED***;
  ***REMOVED***
  cachedPageNumber(ref***REMOVED*** {
    if (!isRefProxy(ref***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    const refStr = ref.gen === 0 ? `${ref.num***REMOVED***R` : `${ref.num***REMOVED***R${ref.gen***REMOVED***`;
    return this.#pageRefCache.get(refStr***REMOVED*** ?? null;
  ***REMOVED***
***REMOVED***
const INITIAL_DATA = Symbol("INITIAL_DATA"***REMOVED***;
class PDFObjects {
  #objs = Object.create(null***REMOVED***;
  #ensureObj(objId***REMOVED*** {
    return this.#objs[objId] ||= {
      ...Promise.withResolvers(***REMOVED***,
      data: INITIAL_DATA
    ***REMOVED***;
  ***REMOVED***
  get(objId, callback = null***REMOVED*** {
    if (callback***REMOVED*** {
      const obj = this.#ensureObj(objId***REMOVED***;
      obj.promise.then((***REMOVED*** => callback(obj.data***REMOVED******REMOVED***;
      return null;
    ***REMOVED***
    const obj = this.#objs[objId];
    if (!obj || obj.data === INITIAL_DATA***REMOVED*** {
      throw new Error(`Requesting object that isn't resolved yet ${objId***REMOVED***.`***REMOVED***;
    ***REMOVED***
    return obj.data;
  ***REMOVED***
  has(objId***REMOVED*** {
    const obj = this.#objs[objId];
    return !!obj && obj.data !== INITIAL_DATA;
  ***REMOVED***
  delete(objId***REMOVED*** {
    const obj = this.#objs[objId];
    if (!obj || obj.data === INITIAL_DATA***REMOVED*** {
      return false;
    ***REMOVED***
    delete this.#objs[objId];
    return true;
  ***REMOVED***
  resolve(objId, data = null***REMOVED*** {
    const obj = this.#ensureObj(objId***REMOVED***;
    obj.data = data;
    obj.resolve(***REMOVED***;
  ***REMOVED***
  clear(***REMOVED*** {
    for (const objId in this.#objs***REMOVED*** {
      const {
        data
      ***REMOVED*** = this.#objs[objId];
      data?.bitmap?.close(***REMOVED***;
    ***REMOVED***
    this.#objs = Object.create(null***REMOVED***;
  ***REMOVED***
  *[Symbol.iterator](***REMOVED*** {
    for (const objId in this.#objs***REMOVED*** {
      const {
        data
      ***REMOVED*** = this.#objs[objId];
      if (data === INITIAL_DATA***REMOVED*** {
        continue;
      ***REMOVED***
      yield [objId, data];
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class RenderTask {
  #internalRenderTask = null;
  constructor(internalRenderTask***REMOVED*** {
    this.#internalRenderTask = internalRenderTask;
    this.onContinue = null;
  ***REMOVED***
  get promise(***REMOVED*** {
    return this.#internalRenderTask.capability.promise;
  ***REMOVED***
  cancel(extraDelay = 0***REMOVED*** {
    this.#internalRenderTask.cancel(null, extraDelay***REMOVED***;
  ***REMOVED***
  get separateAnnots(***REMOVED*** {
    const {
      separateAnnots
    ***REMOVED*** = this.#internalRenderTask.operatorList;
    if (!separateAnnots***REMOVED*** {
      return false;
    ***REMOVED***
    const {
      annotationCanvasMap
    ***REMOVED*** = this.#internalRenderTask;
    return separateAnnots.form || separateAnnots.canvas && annotationCanvasMap?.size > 0;
  ***REMOVED***
***REMOVED***
class InternalRenderTask {
  #rAF = null;
  static #canvasInUse = new WeakSet(***REMOVED***;
  constructor({
    callback,
    params,
    objs,
    commonObjs,
    annotationCanvasMap,
    operatorList,
    pageIndex,
    canvasFactory,
    filterFactory,
    useRequestAnimationFrame = false,
    pdfBug = false,
    pageColors = null
  ***REMOVED******REMOVED*** {
    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.annotationCanvasMap = annotationCanvasMap;
    this.operatorListIdx = null;
    this.operatorList = operatorList;
    this._pageIndex = pageIndex;
    this.canvasFactory = canvasFactory;
    this.filterFactory = filterFactory;
    this._pdfBug = pdfBug;
    this.pageColors = pageColors;
    this.running = false;
    this.graphicsReadyCallback = null;
    this.graphicsReady = false;
    this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
    this.cancelled = false;
    this.capability = Promise.withResolvers(***REMOVED***;
    this.task = new RenderTask(this***REMOVED***;
    this._cancelBound = this.cancel.bind(this***REMOVED***;
    this._continueBound = this._continue.bind(this***REMOVED***;
    this._scheduleNextBound = this._scheduleNext.bind(this***REMOVED***;
    this._nextBound = this._next.bind(this***REMOVED***;
    this._canvas = params.canvasContext.canvas;
  ***REMOVED***
  get completed(***REMOVED*** {
    return this.capability.promise.catch(function (***REMOVED*** {***REMOVED******REMOVED***;
  ***REMOVED***
  initializeGraphics({
    transparency = false,
    optionalContentConfig
  ***REMOVED******REMOVED*** {
    if (this.cancelled***REMOVED*** {
      return;
    ***REMOVED***
    if (this._canvas***REMOVED*** {
      if (InternalRenderTask.#canvasInUse.has(this._canvas***REMOVED******REMOVED*** {
        throw new Error("Cannot use the same canvas during multiple render(***REMOVED*** operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed."***REMOVED***;
      ***REMOVED***
      InternalRenderTask.#canvasInUse.add(this._canvas***REMOVED***;
    ***REMOVED***
    if (this._pdfBug && globalThis.StepperManager?.enabled***REMOVED*** {
      this.stepper = globalThis.StepperManager.create(this._pageIndex***REMOVED***;
      this.stepper.init(this.operatorList***REMOVED***;
      this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint(***REMOVED***;
    ***REMOVED***
    const {
      canvasContext,
      viewport,
      transform,
      background
    ***REMOVED*** = this.params;
    this.gfx = new CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
      optionalContentConfig
    ***REMOVED***, this.annotationCanvasMap, this.pageColors***REMOVED***;
    this.gfx.beginDrawing({
      transform,
      viewport,
      transparency,
      background
    ***REMOVED******REMOVED***;
    this.operatorListIdx = 0;
    this.graphicsReady = true;
    this.graphicsReadyCallback?.(***REMOVED***;
  ***REMOVED***
  cancel(error = null, extraDelay = 0***REMOVED*** {
    this.running = false;
    this.cancelled = true;
    this.gfx?.endDrawing(***REMOVED***;
    if (this.#rAF***REMOVED*** {
      window.cancelAnimationFrame(this.#rAF***REMOVED***;
      this.#rAF = null;
    ***REMOVED***
    InternalRenderTask.#canvasInUse.delete(this._canvas***REMOVED***;
    this.callback(error || new RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1***REMOVED***`, extraDelay***REMOVED******REMOVED***;
  ***REMOVED***
  operatorListChanged(***REMOVED*** {
    if (!this.graphicsReady***REMOVED*** {
      this.graphicsReadyCallback ||= this._continueBound;
      return;
    ***REMOVED***
    this.stepper?.updateOperatorList(this.operatorList***REMOVED***;
    if (this.running***REMOVED*** {
      return;
    ***REMOVED***
    this._continue(***REMOVED***;
  ***REMOVED***
  _continue(***REMOVED*** {
    this.running = true;
    if (this.cancelled***REMOVED*** {
      return;
    ***REMOVED***
    if (this.task.onContinue***REMOVED*** {
      this.task.onContinue(this._scheduleNextBound***REMOVED***;
    ***REMOVED*** else {
      this._scheduleNext(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _scheduleNext(***REMOVED*** {
    if (this._useRequestAnimationFrame***REMOVED*** {
      this.#rAF = window.requestAnimationFrame((***REMOVED*** => {
        this.#rAF = null;
        this._nextBound(***REMOVED***.catch(this._cancelBound***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      Promise.resolve(***REMOVED***.then(this._nextBound***REMOVED***.catch(this._cancelBound***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async _next(***REMOVED*** {
    if (this.cancelled***REMOVED*** {
      return;
    ***REMOVED***
    this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper***REMOVED***;
    if (this.operatorListIdx === this.operatorList.argsArray.length***REMOVED*** {
      this.running = false;
      if (this.operatorList.lastChunk***REMOVED*** {
        this.gfx.endDrawing(***REMOVED***;
        InternalRenderTask.#canvasInUse.delete(this._canvas***REMOVED***;
        this.callback(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
const version = "4.10.38";
const build = "f9bea397f";

;// ./src/shared/scripting_utils.js
function makeColorComp(n***REMOVED*** {
  return Math.floor(Math.max(0, Math.min(1, n***REMOVED******REMOVED*** * 255***REMOVED***.toString(16***REMOVED***.padStart(2, "0"***REMOVED***;
***REMOVED***
function scaleAndClamp(x***REMOVED*** {
  return Math.max(0, Math.min(255, 255 * x***REMOVED******REMOVED***;
***REMOVED***
class ColorConverters {
  static CMYK_G([c, y, m, k]***REMOVED*** {
    return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k***REMOVED***];
  ***REMOVED***
  static G_CMYK([g]***REMOVED*** {
    return ["CMYK", 0, 0, 0, 1 - g];
  ***REMOVED***
  static G_RGB([g]***REMOVED*** {
    return ["RGB", g, g, g];
  ***REMOVED***
  static G_rgb([g]***REMOVED*** {
    g = scaleAndClamp(g***REMOVED***;
    return [g, g, g];
  ***REMOVED***
  static G_HTML([g]***REMOVED*** {
    const G = makeColorComp(g***REMOVED***;
    return `#${G***REMOVED***${G***REMOVED***${G***REMOVED***`;
  ***REMOVED***
  static RGB_G([r, g, b]***REMOVED*** {
    return ["G", 0.3 * r + 0.59 * g + 0.11 * b];
  ***REMOVED***
  static RGB_rgb(color***REMOVED*** {
    return color.map(scaleAndClamp***REMOVED***;
  ***REMOVED***
  static RGB_HTML(color***REMOVED*** {
    return `#${color.map(makeColorComp***REMOVED***.join(""***REMOVED******REMOVED***`;
  ***REMOVED***
  static T_HTML(***REMOVED*** {
    return "#00000000";
  ***REMOVED***
  static T_rgb(***REMOVED*** {
    return [null];
  ***REMOVED***
  static CMYK_RGB([c, y, m, k]***REMOVED*** {
    return ["RGB", 1 - Math.min(1, c + k***REMOVED***, 1 - Math.min(1, m + k***REMOVED***, 1 - Math.min(1, y + k***REMOVED***];
  ***REMOVED***
  static CMYK_rgb([c, y, m, k]***REMOVED*** {
    return [scaleAndClamp(1 - Math.min(1, c + k***REMOVED******REMOVED***, scaleAndClamp(1 - Math.min(1, m + k***REMOVED******REMOVED***, scaleAndClamp(1 - Math.min(1, y + k***REMOVED******REMOVED***];
  ***REMOVED***
  static CMYK_HTML(components***REMOVED*** {
    const rgb = this.CMYK_RGB(components***REMOVED***.slice(1***REMOVED***;
    return this.RGB_HTML(rgb***REMOVED***;
  ***REMOVED***
  static RGB_CMYK([r, g, b]***REMOVED*** {
    const c = 1 - r;
    const m = 1 - g;
    const y = 1 - b;
    const k = Math.min(c, m, y***REMOVED***;
    return ["CMYK", c, m, y, k];
  ***REMOVED***
***REMOVED***

;// ./src/display/svg_factory.js


class BaseSVGFactory {
  create(width, height, skipDimensions = false***REMOVED*** {
    if (width <= 0 || height <= 0***REMOVED*** {
      throw new Error("Invalid SVG dimensions"***REMOVED***;
    ***REMOVED***
    const svg = this._createSVG("svg:svg"***REMOVED***;
    svg.setAttribute("version", "1.1"***REMOVED***;
    if (!skipDimensions***REMOVED*** {
      svg.setAttribute("width", `${width***REMOVED***px`***REMOVED***;
      svg.setAttribute("height", `${height***REMOVED***px`***REMOVED***;
    ***REMOVED***
    svg.setAttribute("preserveAspectRatio", "none"***REMOVED***;
    svg.setAttribute("viewBox", `0 0 ${width***REMOVED*** ${height***REMOVED***`***REMOVED***;
    return svg;
  ***REMOVED***
  createElement(type***REMOVED*** {
    if (typeof type !== "string"***REMOVED*** {
      throw new Error("Invalid SVG element type"***REMOVED***;
    ***REMOVED***
    return this._createSVG(type***REMOVED***;
  ***REMOVED***
  _createSVG(type***REMOVED*** {
    unreachable("Abstract method `_createSVG` called."***REMOVED***;
  ***REMOVED***
***REMOVED***
class DOMSVGFactory extends BaseSVGFactory {
  _createSVG(type***REMOVED*** {
    return document.createElementNS(SVG_NS, type***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/xfa_layer.js

class XfaLayer {
  static setupStorage(html, id, element, storage, intent***REMOVED*** {
    const storedData = storage.getValue(id, {
      value: null
    ***REMOVED******REMOVED***;
    switch (element.name***REMOVED*** {
      case "textarea":
        if (storedData.value !== null***REMOVED*** {
          html.textContent = storedData.value;
        ***REMOVED***
        if (intent === "print"***REMOVED*** {
          break;
        ***REMOVED***
        html.addEventListener("input", event => {
          storage.setValue(id, {
            value: event.target.value
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        break;
      case "input":
        if (element.attributes.type === "radio" || element.attributes.type === "checkbox"***REMOVED*** {
          if (storedData.value === element.attributes.xfaOn***REMOVED*** {
            html.setAttribute("checked", true***REMOVED***;
          ***REMOVED*** else if (storedData.value === element.attributes.xfaOff***REMOVED*** {
            html.removeAttribute("checked"***REMOVED***;
          ***REMOVED***
          if (intent === "print"***REMOVED*** {
            break;
          ***REMOVED***
          html.addEventListener("change", event => {
            storage.setValue(id, {
              value: event.target.checked ? event.target.getAttribute("xfaOn"***REMOVED*** : event.target.getAttribute("xfaOff"***REMOVED***
            ***REMOVED******REMOVED***;
          ***REMOVED******REMOVED***;
        ***REMOVED*** else {
          if (storedData.value !== null***REMOVED*** {
            html.setAttribute("value", storedData.value***REMOVED***;
          ***REMOVED***
          if (intent === "print"***REMOVED*** {
            break;
          ***REMOVED***
          html.addEventListener("input", event => {
            storage.setValue(id, {
              value: event.target.value
            ***REMOVED******REMOVED***;
          ***REMOVED******REMOVED***;
        ***REMOVED***
        break;
      case "select":
        if (storedData.value !== null***REMOVED*** {
          html.setAttribute("value", storedData.value***REMOVED***;
          for (const option of element.children***REMOVED*** {
            if (option.attributes.value === storedData.value***REMOVED*** {
              option.attributes.selected = true;
            ***REMOVED*** else if (option.attributes.hasOwnProperty("selected"***REMOVED******REMOVED*** {
              delete option.attributes.selected;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
        html.addEventListener("input", event => {
          const options = event.target.options;
          const value = options.selectedIndex === -1 ? "" : options[options.selectedIndex].value;
          storage.setValue(id, {
            value
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  static setAttributes({
    html,
    element,
    storage = null,
    intent,
    linkService
  ***REMOVED******REMOVED*** {
    const {
      attributes
    ***REMOVED*** = element;
    const isHTMLAnchorElement = html instanceof HTMLAnchorElement;
    if (attributes.type === "radio"***REMOVED*** {
      attributes.name = `${attributes.name***REMOVED***-${intent***REMOVED***`;
    ***REMOVED***
    for (const [key, value] of Object.entries(attributes***REMOVED******REMOVED*** {
      if (value === null || value === undefined***REMOVED*** {
        continue;
      ***REMOVED***
      switch (key***REMOVED*** {
        case "class":
          if (value.length***REMOVED*** {
            html.setAttribute(key, value.join(" "***REMOVED******REMOVED***;
          ***REMOVED***
          break;
        case "dataId":
          break;
        case "id":
          html.setAttribute("data-element-id", value***REMOVED***;
          break;
        case "style":
          Object.assign(html.style, value***REMOVED***;
          break;
        case "textContent":
          html.textContent = value;
          break;
        default:
          if (!isHTMLAnchorElement || key !== "href" && key !== "newWindow"***REMOVED*** {
            html.setAttribute(key, value***REMOVED***;
          ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    if (isHTMLAnchorElement***REMOVED*** {
      linkService.addLinkAttributes(html, attributes.href, attributes.newWindow***REMOVED***;
    ***REMOVED***
    if (storage && attributes.dataId***REMOVED*** {
      this.setupStorage(html, attributes.dataId, element, storage***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  static render(parameters***REMOVED*** {
    const storage = parameters.annotationStorage;
    const linkService = parameters.linkService;
    const root = parameters.xfaHtml;
    const intent = parameters.intent || "display";
    const rootHtml = document.createElement(root.name***REMOVED***;
    if (root.attributes***REMOVED*** {
      this.setAttributes({
        html: rootHtml,
        element: root,
        intent,
        linkService
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const isNotForRichText = intent !== "richText";
    const rootDiv = parameters.div;
    rootDiv.append(rootHtml***REMOVED***;
    if (parameters.viewport***REMOVED*** {
      const transform = `matrix(${parameters.viewport.transform.join(","***REMOVED******REMOVED******REMOVED***`;
      rootDiv.style.transform = transform;
    ***REMOVED***
    if (isNotForRichText***REMOVED*** {
      rootDiv.setAttribute("class", "xfaLayer xfaFont"***REMOVED***;
    ***REMOVED***
    const textDivs = [];
    if (root.children.length === 0***REMOVED*** {
      if (root.value***REMOVED*** {
        const node = document.createTextNode(root.value***REMOVED***;
        rootHtml.append(node***REMOVED***;
        if (isNotForRichText && XfaText.shouldBuildText(root.name***REMOVED******REMOVED*** {
          textDivs.push(node***REMOVED***;
        ***REMOVED***
      ***REMOVED***
  ***REMOVED***
        textDivs
      ***REMOVED***;
    ***REMOVED***
    const stack = [[root, -1, rootHtml]];
    while (stack.length > 0***REMOVED*** {
      const [parent, i, html] = stack.at(-1***REMOVED***;
      if (i + 1 === parent.children.length***REMOVED*** {
        stack.pop(***REMOVED***;
        continue;
      ***REMOVED***
      const child = parent.children[++stack.at(-1***REMOVED***[1]];
      if (child === null***REMOVED*** {
        continue;
      ***REMOVED***
      const {
        name
      ***REMOVED*** = child;
      if (name === "#text"***REMOVED*** {
        const node = document.createTextNode(child.value***REMOVED***;
        textDivs.push(node***REMOVED***;
        html.append(node***REMOVED***;
        continue;
      ***REMOVED***
      const childHtml = child?.attributes?.xmlns ? document.createElementNS(child.attributes.xmlns, name***REMOVED*** : document.createElement(name***REMOVED***;
      html.append(childHtml***REMOVED***;
      if (child.attributes***REMOVED*** {
        this.setAttributes({
          html: childHtml,
          element: child,
          storage,
          intent,
          linkService
        ***REMOVED******REMOVED***;
      ***REMOVED***
      if (child.children?.length > 0***REMOVED*** {
        stack.push([child, -1, childHtml]***REMOVED***;
      ***REMOVED*** else if (child.value***REMOVED*** {
        const node = document.createTextNode(child.value***REMOVED***;
        if (isNotForRichText && XfaText.shouldBuildText(name***REMOVED******REMOVED*** {
          textDivs.push(node***REMOVED***;
        ***REMOVED***
        childHtml.append(node***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    for (const el of rootDiv.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"***REMOVED******REMOVED*** {
      el.setAttribute("readOnly", true***REMOVED***;
    ***REMOVED***
***REMOVED***
      textDivs
    ***REMOVED***;
  ***REMOVED***
  static update(parameters***REMOVED*** {
    const transform = `matrix(${parameters.viewport.transform.join(","***REMOVED******REMOVED******REMOVED***`;
    parameters.div.style.transform = transform;
    parameters.div.hidden = false;
  ***REMOVED***
***REMOVED***

;// ./src/display/annotation_layer.js






const DEFAULT_TAB_INDEX = 1000;
const annotation_layer_DEFAULT_FONT_SIZE = 9;
const GetElementsByNameSet = new WeakSet(***REMOVED***;
function getRectDims(rect***REMOVED*** {
  return {
    width: rect[2] - rect[0],
    height: rect[3] - rect[1]
  ***REMOVED***;
***REMOVED***
class AnnotationElementFactory {
  static create(parameters***REMOVED*** {
    const subtype = parameters.data.annotationType;
    switch (subtype***REMOVED*** {
      case AnnotationType.LINK:
        return new LinkAnnotationElement(parameters***REMOVED***;
      case AnnotationType.TEXT:
        return new TextAnnotationElement(parameters***REMOVED***;
      case AnnotationType.WIDGET:
        const fieldType = parameters.data.fieldType;
        switch (fieldType***REMOVED*** {
          case "Tx":
            return new TextWidgetAnnotationElement(parameters***REMOVED***;
          case "Btn":
            if (parameters.data.radioButton***REMOVED*** {
              return new RadioButtonWidgetAnnotationElement(parameters***REMOVED***;
            ***REMOVED*** else if (parameters.data.checkBox***REMOVED*** {
              return new CheckboxWidgetAnnotationElement(parameters***REMOVED***;
            ***REMOVED***
            return new PushButtonWidgetAnnotationElement(parameters***REMOVED***;
          case "Ch":
            return new ChoiceWidgetAnnotationElement(parameters***REMOVED***;
          case "Sig":
            return new SignatureWidgetAnnotationElement(parameters***REMOVED***;
        ***REMOVED***
        return new WidgetAnnotationElement(parameters***REMOVED***;
      case AnnotationType.POPUP:
        return new PopupAnnotationElement(parameters***REMOVED***;
      case AnnotationType.FREETEXT:
        return new FreeTextAnnotationElement(parameters***REMOVED***;
      case AnnotationType.LINE:
        return new LineAnnotationElement(parameters***REMOVED***;
      case AnnotationType.SQUARE:
        return new SquareAnnotationElement(parameters***REMOVED***;
      case AnnotationType.CIRCLE:
        return new CircleAnnotationElement(parameters***REMOVED***;
      case AnnotationType.POLYLINE:
        return new PolylineAnnotationElement(parameters***REMOVED***;
      case AnnotationType.CARET:
        return new CaretAnnotationElement(parameters***REMOVED***;
      case AnnotationType.INK:
        return new InkAnnotationElement(parameters***REMOVED***;
      case AnnotationType.POLYGON:
        return new PolygonAnnotationElement(parameters***REMOVED***;
      case AnnotationType.HIGHLIGHT:
        return new HighlightAnnotationElement(parameters***REMOVED***;
      case AnnotationType.UNDERLINE:
        return new UnderlineAnnotationElement(parameters***REMOVED***;
      case AnnotationType.SQUIGGLY:
        return new SquigglyAnnotationElement(parameters***REMOVED***;
      case AnnotationType.STRIKEOUT:
        return new StrikeOutAnnotationElement(parameters***REMOVED***;
      case AnnotationType.STAMP:
        return new StampAnnotationElement(parameters***REMOVED***;
      case AnnotationType.FILEATTACHMENT:
        return new FileAttachmentAnnotationElement(parameters***REMOVED***;
      default:
        return new AnnotationElement(parameters***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
class AnnotationElement {
  #updates = null;
  #hasBorder = false;
  #popupElement = null;
  constructor(parameters, {
    isRenderable = false,
    ignoreBorder = false,
    createQuadrilaterals = false
  ***REMOVED*** = {***REMOVED******REMOVED*** {
    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderForms = parameters.renderForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._fieldObjects = parameters.fieldObjects;
    this.parent = parameters.parent;
    if (isRenderable***REMOVED*** {
      this.container = this._createContainer(ignoreBorder***REMOVED***;
    ***REMOVED***
    if (createQuadrilaterals***REMOVED*** {
      this._createQuadrilaterals(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  static _hasPopupData({
    titleObj,
    contentsObj,
    richText
  ***REMOVED******REMOVED*** {
    return !!(titleObj?.str || contentsObj?.str || richText?.str***REMOVED***;
  ***REMOVED***
  get _isEditable(***REMOVED*** {
    return this.data.isEditable;
  ***REMOVED***
  get hasPopupData(***REMOVED*** {
    return AnnotationElement._hasPopupData(this.data***REMOVED***;
  ***REMOVED***
  updateEdited(params***REMOVED*** {
    if (!this.container***REMOVED*** {
      return;
    ***REMOVED***
    this.#updates ||= {
      rect: this.data.rect.slice(0***REMOVED***
    ***REMOVED***;
    const {
      rect
    ***REMOVED*** = params;
    if (rect***REMOVED*** {
      this.#setRectEdited(rect***REMOVED***;
    ***REMOVED***
    this.#popupElement?.popup.updateEdited(params***REMOVED***;
  ***REMOVED***
  resetEdited(***REMOVED*** {
    if (!this.#updates***REMOVED*** {
      return;
    ***REMOVED***
    this.#setRectEdited(this.#updates.rect***REMOVED***;
    this.#popupElement?.popup.resetEdited(***REMOVED***;
    this.#updates = null;
  ***REMOVED***
  #setRectEdited(rect***REMOVED*** {
    const {
      container: {
        style
      ***REMOVED***,
      data: {
        rect: currentRect,
        rotation
      ***REMOVED***,
      parent: {
        viewport: {
          rawDims: {
            pageWidth,
            pageHeight,
            pageX,
            pageY
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** = this;
    currentRect?.splice(0, 4, ...rect***REMOVED***;
    const {
      width,
      height
    ***REMOVED*** = getRectDims(rect***REMOVED***;
    style.left = `${100 * (rect[0] - pageX***REMOVED*** / pageWidth***REMOVED***%`;
    style.top = `${100 * (pageHeight - rect[3] + pageY***REMOVED*** / pageHeight***REMOVED***%`;
    if (rotation === 0***REMOVED*** {
      style.width = `${100 * width / pageWidth***REMOVED***%`;
      style.height = `${100 * height / pageHeight***REMOVED***%`;
    ***REMOVED*** else {
      this.setRotation(rotation***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _createContainer(ignoreBorder***REMOVED*** {
    const {
      data,
      parent: {
        page,
        viewport
      ***REMOVED***
    ***REMOVED*** = this;
    const container = document.createElement("section"***REMOVED***;
    container.setAttribute("data-annotation-id", data.id***REMOVED***;
    if (!(this instanceof WidgetAnnotationElement***REMOVED******REMOVED*** {
      container.tabIndex = DEFAULT_TAB_INDEX;
    ***REMOVED***
    const {
      style
    ***REMOVED*** = container;
    style.zIndex = this.parent.zIndex++;
    if (data.alternativeText***REMOVED*** {
      container.title = data.alternativeText;
    ***REMOVED***
    if (data.noRotate***REMOVED*** {
      container.classList.add("norotate"***REMOVED***;
    ***REMOVED***
    if (!data.rect || this instanceof PopupAnnotationElement***REMOVED*** {
      const {
        rotation
      ***REMOVED*** = data;
      if (!data.hasOwnCanvas && rotation !== 0***REMOVED*** {
        this.setRotation(rotation, container***REMOVED***;
      ***REMOVED***
      return container;
    ***REMOVED***
    const {
      width,
      height
    ***REMOVED*** = getRectDims(data.rect***REMOVED***;
    if (!ignoreBorder && data.borderStyle.width > 0***REMOVED*** {
      style.borderWidth = `${data.borderStyle.width***REMOVED***px`;
      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;
      if (horizontalRadius > 0 || verticalRadius > 0***REMOVED*** {
        const radius = `calc(${horizontalRadius***REMOVED***px * var(--scale-factor***REMOVED******REMOVED*** / calc(${verticalRadius***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
        style.borderRadius = radius;
      ***REMOVED*** else if (this instanceof RadioButtonWidgetAnnotationElement***REMOVED*** {
        const radius = `calc(${width***REMOVED***px * var(--scale-factor***REMOVED******REMOVED*** / calc(${height***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
        style.borderRadius = radius;
      ***REMOVED***
      switch (data.borderStyle.style***REMOVED*** {
        case AnnotationBorderStyleType.SOLID:
          style.borderStyle = "solid";
          break;
        case AnnotationBorderStyleType.DASHED:
          style.borderStyle = "dashed";
          break;
        case AnnotationBorderStyleType.BEVELED:
          warn("Unimplemented border style: beveled"***REMOVED***;
          break;
        case AnnotationBorderStyleType.INSET:
          warn("Unimplemented border style: inset"***REMOVED***;
          break;
        case AnnotationBorderStyleType.UNDERLINE:
          style.borderBottomStyle = "solid";
          break;
        default:
          break;
      ***REMOVED***
      const borderColor = data.borderColor || null;
      if (borderColor***REMOVED*** {
        this.#hasBorder = true;
        style.borderColor = Util.makeHexColor(borderColor[0] | 0, borderColor[1] | 0, borderColor[2] | 0***REMOVED***;
      ***REMOVED*** else {
        style.borderWidth = 0;
      ***REMOVED***
    ***REMOVED***
    const rect = Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]***REMOVED***;
    const {
      pageWidth,
      pageHeight,
      pageX,
      pageY
    ***REMOVED*** = viewport.rawDims;
    style.left = `${100 * (rect[0] - pageX***REMOVED*** / pageWidth***REMOVED***%`;
    style.top = `${100 * (rect[1] - pageY***REMOVED*** / pageHeight***REMOVED***%`;
    const {
      rotation
    ***REMOVED*** = data;
    if (data.hasOwnCanvas || rotation === 0***REMOVED*** {
      style.width = `${100 * width / pageWidth***REMOVED***%`;
      style.height = `${100 * height / pageHeight***REMOVED***%`;
    ***REMOVED*** else {
      this.setRotation(rotation, container***REMOVED***;
    ***REMOVED***
    return container;
  ***REMOVED***
  setRotation(angle, container = this.container***REMOVED*** {
    if (!this.data.rect***REMOVED*** {
      return;
    ***REMOVED***
    const {
      pageWidth,
      pageHeight
    ***REMOVED*** = this.parent.viewport.rawDims;
    const {
      width,
      height
    ***REMOVED*** = getRectDims(this.data.rect***REMOVED***;
    let elementWidth, elementHeight;
    if (angle % 180 === 0***REMOVED*** {
      elementWidth = 100 * width / pageWidth;
      elementHeight = 100 * height / pageHeight;
    ***REMOVED*** else {
      elementWidth = 100 * height / pageWidth;
      elementHeight = 100 * width / pageHeight;
    ***REMOVED***
    container.style.width = `${elementWidth***REMOVED***%`;
    container.style.height = `${elementHeight***REMOVED***%`;
    container.setAttribute("data-main-rotation", (360 - angle***REMOVED*** % 360***REMOVED***;
  ***REMOVED***
  get _commonActions(***REMOVED*** {
    const setColor = (jsName, styleName, event***REMOVED*** => {
      const color = event.detail[jsName];
      const colorType = color[0];
      const colorArray = color.slice(1***REMOVED***;
      event.target.style[styleName] = ColorConverters[`${colorType***REMOVED***_HTML`](colorArray***REMOVED***;
      this.annotationStorage.setValue(this.data.id, {
        [styleName]: ColorConverters[`${colorType***REMOVED***_rgb`](colorArray***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***;
    return shadow(this, "_commonActions", {
      display: event => {
        const {
          display
        ***REMOVED*** = event.detail;
        const hidden = display % 2 === 1;
        this.container.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          noView: hidden,
          noPrint: display === 1 || display === 2
        ***REMOVED******REMOVED***;
      ***REMOVED***,
      print: event => {
        this.annotationStorage.setValue(this.data.id, {
          noPrint: !event.detail.print
        ***REMOVED******REMOVED***;
      ***REMOVED***,
      hidden: event => {
        const {
          hidden
        ***REMOVED*** = event.detail;
        this.container.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          noPrint: hidden,
          noView: hidden
        ***REMOVED******REMOVED***;
      ***REMOVED***,
      focus: event => {
        setTimeout((***REMOVED*** => event.target.focus({
          preventScroll: false
        ***REMOVED******REMOVED***, 0***REMOVED***;
      ***REMOVED***,
      userName: event => {
        event.target.title = event.detail.userName;
      ***REMOVED***,
      readonly: event => {
        event.target.disabled = event.detail.readonly;
      ***REMOVED***,
      required: event => {
        this._setRequired(event.target, event.detail.required***REMOVED***;
      ***REMOVED***,
      bgColor: event => {
        setColor("bgColor", "backgroundColor", event***REMOVED***;
      ***REMOVED***,
      fillColor: event => {
        setColor("fillColor", "backgroundColor", event***REMOVED***;
      ***REMOVED***,
      fgColor: event => {
        setColor("fgColor", "color", event***REMOVED***;
      ***REMOVED***,
      textColor: event => {
        setColor("textColor", "color", event***REMOVED***;
      ***REMOVED***,
      borderColor: event => {
        setColor("borderColor", "borderColor", event***REMOVED***;
      ***REMOVED***,
      strokeColor: event => {
        setColor("strokeColor", "borderColor", event***REMOVED***;
      ***REMOVED***,
      rotation: event => {
        const angle = event.detail.rotation;
        this.setRotation(angle***REMOVED***;
        this.annotationStorage.setValue(this.data.id, {
          rotation: angle
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _dispatchEventFromSandbox(actions, jsEvent***REMOVED*** {
    const commonActions = this._commonActions;
    for (const name of Object.keys(jsEvent.detail***REMOVED******REMOVED*** {
      const action = actions[name] || commonActions[name];
      action?.(jsEvent***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _setDefaultPropertiesFromJS(element***REMOVED*** {
    if (!this.enableScripting***REMOVED*** {
      return;
    ***REMOVED***
    const storedData = this.annotationStorage.getRawValue(this.data.id***REMOVED***;
    if (!storedData***REMOVED*** {
      return;
    ***REMOVED***
    const commonActions = this._commonActions;
    for (const [actionName, detail] of Object.entries(storedData***REMOVED******REMOVED*** {
      const action = commonActions[actionName];
      if (action***REMOVED*** {
        const eventProxy = {
          detail: {
            [actionName]: detail
          ***REMOVED***,
          target: element
        ***REMOVED***;
        action(eventProxy***REMOVED***;
        delete storedData[actionName];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  _createQuadrilaterals(***REMOVED*** {
    if (!this.container***REMOVED*** {
      return;
    ***REMOVED***
    const {
      quadPoints
    ***REMOVED*** = this.data;
    if (!quadPoints***REMOVED*** {
      return;
    ***REMOVED***
    const [rectBlX, rectBlY, rectTrX, rectTrY] = this.data.rect.map(x => Math.fround(x***REMOVED******REMOVED***;
    if (quadPoints.length === 8***REMOVED*** {
      const [trX, trY, blX, blY] = quadPoints.subarray(2, 6***REMOVED***;
      if (rectTrX === trX && rectTrY === trY && rectBlX === blX && rectBlY === blY***REMOVED*** {
        return;
      ***REMOVED***
    ***REMOVED***
    const {
      style
    ***REMOVED*** = this.container;
    let svgBuffer;
    if (this.#hasBorder***REMOVED*** {
      const {
        borderColor,
        borderWidth
      ***REMOVED*** = style;
      style.borderWidth = 0;
      svgBuffer = ["url('data:image/svg+xml;utf8,", `<svg xmlns="http://www.w3.org/2000/svg"`, ` preserveAspectRatio="none" viewBox="0 0 1 1">`, `<g fill="transparent" stroke="${borderColor***REMOVED***" stroke-width="${borderWidth***REMOVED***">`];
      this.container.classList.add("hasBorder"***REMOVED***;
    ***REMOVED***
    const width = rectTrX - rectBlX;
    const height = rectTrY - rectBlY;
    const {
      svgFactory
    ***REMOVED*** = this;
    const svg = svgFactory.createElement("svg"***REMOVED***;
    svg.classList.add("quadrilateralsContainer"***REMOVED***;
    svg.setAttribute("width", 0***REMOVED***;
    svg.setAttribute("height", 0***REMOVED***;
    const defs = svgFactory.createElement("defs"***REMOVED***;
    svg.append(defs***REMOVED***;
    const clipPath = svgFactory.createElement("clipPath"***REMOVED***;
    const id = `clippath_${this.data.id***REMOVED***`;
    clipPath.setAttribute("id", id***REMOVED***;
    clipPath.setAttribute("clipPathUnits", "objectBoundingBox"***REMOVED***;
    defs.append(clipPath***REMOVED***;
    for (let i = 2, ii = quadPoints.length; i < ii; i += 8***REMOVED*** {
      const trX = quadPoints[i];
      const trY = quadPoints[i + 1];
      const blX = quadPoints[i + 2];
      const blY = quadPoints[i + 3];
      const rect = svgFactory.createElement("rect"***REMOVED***;
      const x = (blX - rectBlX***REMOVED*** / width;
      const y = (rectTrY - trY***REMOVED*** / height;
      const rectWidth = (trX - blX***REMOVED*** / width;
      const rectHeight = (trY - blY***REMOVED*** / height;
      rect.setAttribute("x", x***REMOVED***;
      rect.setAttribute("y", y***REMOVED***;
      rect.setAttribute("width", rectWidth***REMOVED***;
      rect.setAttribute("height", rectHeight***REMOVED***;
      clipPath.append(rect***REMOVED***;
      svgBuffer?.push(`<rect vector-effect="non-scaling-stroke" x="${x***REMOVED***" y="${y***REMOVED***" width="${rectWidth***REMOVED***" height="${rectHeight***REMOVED***"/>`***REMOVED***;
    ***REMOVED***
    if (this.#hasBorder***REMOVED*** {
      svgBuffer.push(`</g></svg>'***REMOVED***`***REMOVED***;
      style.backgroundImage = svgBuffer.join(""***REMOVED***;
    ***REMOVED***
    this.container.append(svg***REMOVED***;
    this.container.style.clipPath = `url(#${id***REMOVED******REMOVED***`;
  ***REMOVED***
  _createPopup(***REMOVED*** {
    const {
      data
    ***REMOVED*** = this;
    const popup = this.#popupElement = new PopupAnnotationElement({
      data: {
        color: data.color,
        titleObj: data.titleObj,
        modificationDate: data.modificationDate,
        contentsObj: data.contentsObj,
        richText: data.richText,
        parentRect: data.rect,
        borderStyle: 0,
        id: `popup_${data.id***REMOVED***`,
        rotation: data.rotation
      ***REMOVED***,
      parent: this.parent,
      elements: [this]
    ***REMOVED******REMOVED***;
    this.parent.div.append(popup.render(***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    unreachable("Abstract method `AnnotationElement.render` called"***REMOVED***;
  ***REMOVED***
  _getElementsByName(name, skipId = null***REMOVED*** {
    const fields = [];
    if (this._fieldObjects***REMOVED*** {
      const fieldObj = this._fieldObjects[name];
      if (fieldObj***REMOVED*** {
        for (const {
          page,
          id,
          exportValues
        ***REMOVED*** of fieldObj***REMOVED*** {
          if (page === -1***REMOVED*** {
            continue;
          ***REMOVED***
          if (id === skipId***REMOVED*** {
            continue;
          ***REMOVED***
          const exportValue = typeof exportValues === "string" ? exportValues : null;
          const domElement = document.querySelector(`[data-element-id="${id***REMOVED***"]`***REMOVED***;
          if (domElement && !GetElementsByNameSet.has(domElement***REMOVED******REMOVED*** {
            warn(`_getElementsByName - element not allowed: ${id***REMOVED***`***REMOVED***;
            continue;
          ***REMOVED***
          fields.push({
            id,
            exportValue,
            domElement
          ***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
      return fields;
    ***REMOVED***
    for (const domElement of document.getElementsByName(name***REMOVED******REMOVED*** {
      const {
        exportValue
      ***REMOVED*** = domElement;
      const id = domElement.getAttribute("data-element-id"***REMOVED***;
      if (id === skipId***REMOVED*** {
        continue;
      ***REMOVED***
      if (!GetElementsByNameSet.has(domElement***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      fields.push({
        id,
        exportValue,
        domElement
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return fields;
  ***REMOVED***
  show(***REMOVED*** {
    if (this.container***REMOVED*** {
      this.container.hidden = false;
    ***REMOVED***
    this.popup?.maybeShow(***REMOVED***;
  ***REMOVED***
  hide(***REMOVED*** {
    if (this.container***REMOVED*** {
      this.container.hidden = true;
    ***REMOVED***
    this.popup?.forceHide(***REMOVED***;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.container;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    const triggers = this.getElementsToTriggerPopup(***REMOVED***;
    if (Array.isArray(triggers***REMOVED******REMOVED*** {
      for (const element of triggers***REMOVED*** {
        element.classList.add("highlightArea"***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      triggers.classList.add("highlightArea"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _editOnDoubleClick(***REMOVED*** {
    if (!this._isEditable***REMOVED*** {
      return;
    ***REMOVED***
    const {
      annotationEditorType: mode,
      data: {
        id: editId
      ***REMOVED***
    ***REMOVED*** = this;
    this.container.addEventListener("dblclick", (***REMOVED*** => {
      this.linkService.eventBus?.dispatch("switchannotationeditormode", {
        source: this,
        mode,
        editId
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
class LinkAnnotationElement extends AnnotationElement {
  constructor(parameters, options = null***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: !!options?.ignoreBorder,
      createQuadrilaterals: true
    ***REMOVED******REMOVED***;
    this.isTooltipOnly = parameters.data.isTooltipOnly;
  ***REMOVED***
  render(***REMOVED*** {
    const {
      data,
      linkService
    ***REMOVED*** = this;
    const link = document.createElement("a"***REMOVED***;
    link.setAttribute("data-element-id", data.id***REMOVED***;
    let isBound = false;
    if (data.url***REMOVED*** {
      linkService.addLinkAttributes(link, data.url, data.newWindow***REMOVED***;
      isBound = true;
    ***REMOVED*** else if (data.action***REMOVED*** {
      this._bindNamedAction(link, data.action***REMOVED***;
      isBound = true;
    ***REMOVED*** else if (data.attachment***REMOVED*** {
      this.#bindAttachment(link, data.attachment, data.attachmentDest***REMOVED***;
      isBound = true;
    ***REMOVED*** else if (data.setOCGState***REMOVED*** {
      this.#bindSetOCGState(link, data.setOCGState***REMOVED***;
      isBound = true;
    ***REMOVED*** else if (data.dest***REMOVED*** {
      this._bindLink(link, data.dest***REMOVED***;
      isBound = true;
    ***REMOVED*** else {
      if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]***REMOVED*** && this.enableScripting && this.hasJSActions***REMOVED*** {
        this._bindJSAction(link, data***REMOVED***;
        isBound = true;
      ***REMOVED***
      if (data.resetForm***REMOVED*** {
        this._bindResetFormAction(link, data.resetForm***REMOVED***;
        isBound = true;
      ***REMOVED*** else if (this.isTooltipOnly && !isBound***REMOVED*** {
        this._bindLink(link, ""***REMOVED***;
        isBound = true;
      ***REMOVED***
    ***REMOVED***
    this.container.classList.add("linkAnnotation"***REMOVED***;
    if (isBound***REMOVED*** {
      this.container.append(link***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
  #setInternalLink(***REMOVED*** {
    this.container.setAttribute("data-internal-link", ""***REMOVED***;
  ***REMOVED***
  _bindLink(link, destination***REMOVED*** {
    link.href = this.linkService.getDestinationHash(destination***REMOVED***;
    link.onclick = (***REMOVED*** => {
      if (destination***REMOVED*** {
        this.linkService.goToDestination(destination***REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***;
    if (destination || destination === ""***REMOVED*** {
      this.#setInternalLink(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _bindNamedAction(link, action***REMOVED*** {
    link.href = this.linkService.getAnchorUrl(""***REMOVED***;
    link.onclick = (***REMOVED*** => {
      this.linkService.executeNamedAction(action***REMOVED***;
      return false;
    ***REMOVED***;
    this.#setInternalLink(***REMOVED***;
  ***REMOVED***
  #bindAttachment(link, attachment, dest = null***REMOVED*** {
    link.href = this.linkService.getAnchorUrl(""***REMOVED***;
    if (attachment.description***REMOVED*** {
      link.title = attachment.description;
    ***REMOVED***
    link.onclick = (***REMOVED*** => {
      this.downloadManager?.openOrDownloadData(attachment.content, attachment.filename, dest***REMOVED***;
      return false;
    ***REMOVED***;
    this.#setInternalLink(***REMOVED***;
  ***REMOVED***
  #bindSetOCGState(link, action***REMOVED*** {
    link.href = this.linkService.getAnchorUrl(""***REMOVED***;
    link.onclick = (***REMOVED*** => {
      this.linkService.executeSetOCGState(action***REMOVED***;
      return false;
    ***REMOVED***;
    this.#setInternalLink(***REMOVED***;
  ***REMOVED***
  _bindJSAction(link, data***REMOVED*** {
    link.href = this.linkService.getAnchorUrl(""***REMOVED***;
    const map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]***REMOVED***;
    for (const name of Object.keys(data.actions***REMOVED******REMOVED*** {
      const jsName = map.get(name***REMOVED***;
      if (!jsName***REMOVED*** {
        continue;
      ***REMOVED***
      link[jsName] = (***REMOVED*** => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: data.id,
            name
          ***REMOVED***
        ***REMOVED******REMOVED***;
        return false;
      ***REMOVED***;
    ***REMOVED***
    if (!link.onclick***REMOVED*** {
      link.onclick = (***REMOVED*** => false;
    ***REMOVED***
    this.#setInternalLink(***REMOVED***;
  ***REMOVED***
  _bindResetFormAction(link, resetForm***REMOVED*** {
    const otherClickAction = link.onclick;
    if (!otherClickAction***REMOVED*** {
      link.href = this.linkService.getAnchorUrl(""***REMOVED***;
    ***REMOVED***
    this.#setInternalLink(***REMOVED***;
    if (!this._fieldObjects***REMOVED*** {
      warn(`_bindResetFormAction - "resetForm" action not supported, ` + "ensure that the `fieldObjects` parameter is provided."***REMOVED***;
      if (!otherClickAction***REMOVED*** {
        link.onclick = (***REMOVED*** => false;
      ***REMOVED***
      return;
    ***REMOVED***
    link.onclick = (***REMOVED*** => {
      otherClickAction?.(***REMOVED***;
      const {
        fields: resetFormFields,
        refs: resetFormRefs,
        include
      ***REMOVED*** = resetForm;
      const allFields = [];
      if (resetFormFields.length !== 0 || resetFormRefs.length !== 0***REMOVED*** {
        const fieldIds = new Set(resetFormRefs***REMOVED***;
        for (const fieldName of resetFormFields***REMOVED*** {
          const fields = this._fieldObjects[fieldName] || [];
          for (const {
            id
          ***REMOVED*** of fields***REMOVED*** {
            fieldIds.add(id***REMOVED***;
          ***REMOVED***
        ***REMOVED***
        for (const fields of Object.values(this._fieldObjects***REMOVED******REMOVED*** {
          for (const field of fields***REMOVED*** {
            if (fieldIds.has(field.id***REMOVED*** === include***REMOVED*** {
              allFields.push(field***REMOVED***;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** else {
        for (const fields of Object.values(this._fieldObjects***REMOVED******REMOVED*** {
          allFields.push(...fields***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      const storage = this.annotationStorage;
      const allIds = [];
      for (const field of allFields***REMOVED*** {
        const {
          id
        ***REMOVED*** = field;
        allIds.push(id***REMOVED***;
        switch (field.type***REMOVED*** {
          case "text":
          ***REMOVED***
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value
              ***REMOVED******REMOVED***;
              break;
            ***REMOVED***
          case "checkbox":
          case "radiobutton":
          ***REMOVED***
              const value = field.defaultValue === field.exportValues;
              storage.setValue(id, {
                value
              ***REMOVED******REMOVED***;
              break;
            ***REMOVED***
          case "combobox":
          case "listbox":
          ***REMOVED***
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value
              ***REMOVED******REMOVED***;
              break;
            ***REMOVED***
          default:
            continue;
        ***REMOVED***
        const domElement = document.querySelector(`[data-element-id="${id***REMOVED***"]`***REMOVED***;
        if (!domElement***REMOVED*** {
          continue;
        ***REMOVED*** else if (!GetElementsByNameSet.has(domElement***REMOVED******REMOVED*** {
          warn(`_bindResetFormAction - element not allowed: ${id***REMOVED***`***REMOVED***;
          continue;
        ***REMOVED***
        domElement.dispatchEvent(new Event("resetform"***REMOVED******REMOVED***;
      ***REMOVED***
      if (this.enableScripting***REMOVED*** {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: "app",
            ids: allIds,
            name: "ResetForm"
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED***
      return false;
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
class TextAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("textAnnotation"***REMOVED***;
    const image = document.createElement("img"***REMOVED***;
    image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase(***REMOVED*** + ".svg";
    image.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"***REMOVED***;
    image.setAttribute("data-l10n-args", JSON.stringify({
      type: this.data.name
    ***REMOVED******REMOVED******REMOVED***;
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.append(image***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class WidgetAnnotationElement extends AnnotationElement {
  render(***REMOVED*** {
    return this.container;
  ***REMOVED***
  showElementAndHideCanvas(element***REMOVED*** {
    if (this.data.hasOwnCanvas***REMOVED*** {
      if (element.previousSibling?.nodeName === "CANVAS"***REMOVED*** {
        element.previousSibling.hidden = true;
      ***REMOVED***
      element.hidden = false;
    ***REMOVED***
  ***REMOVED***
  _getKeyModifier(event***REMOVED*** {
    return util_FeatureTest.platform.isMac ? event.metaKey : event.ctrlKey;
  ***REMOVED***
  _setEventListener(element, elementData, baseName, eventName, valueGetter***REMOVED*** {
    if (baseName.includes("mouse"***REMOVED******REMOVED*** {
      element.addEventListener(baseName, event => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event***REMOVED***,
            shift: event.shiftKey,
            modifier: this._getKeyModifier(event***REMOVED***
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      element.addEventListener(baseName, event => {
        if (baseName === "blur"***REMOVED*** {
          if (!elementData.focused || !event.relatedTarget***REMOVED*** {
            return;
          ***REMOVED***
          elementData.focused = false;
        ***REMOVED*** else if (baseName === "focus"***REMOVED*** {
          if (elementData.focused***REMOVED*** {
            return;
          ***REMOVED***
          elementData.focused = true;
        ***REMOVED***
        if (!valueGetter***REMOVED*** {
          return;
        ***REMOVED***
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event***REMOVED***
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  _setEventListeners(element, elementData, names, getter***REMOVED*** {
    for (const [baseName, eventName] of names***REMOVED*** {
      if (eventName === "Action" || this.data.actions?.[eventName]***REMOVED*** {
        if (eventName === "Focus" || eventName === "Blur"***REMOVED*** {
          elementData ||= {
            focused: false
          ***REMOVED***;
        ***REMOVED***
        this._setEventListener(element, elementData, baseName, eventName, getter***REMOVED***;
        if (eventName === "Focus" && !this.data.actions?.Blur***REMOVED*** {
          this._setEventListener(element, elementData, "blur", "Blur", null***REMOVED***;
        ***REMOVED*** else if (eventName === "Blur" && !this.data.actions?.Focus***REMOVED*** {
          this._setEventListener(element, elementData, "focus", "Focus", null***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  _setBackgroundColor(element***REMOVED*** {
    const color = this.data.backgroundColor || null;
    element.style.backgroundColor = color === null ? "transparent" : Util.makeHexColor(color[0], color[1], color[2]***REMOVED***;
  ***REMOVED***
  _setTextStyle(element***REMOVED*** {
    const TEXT_ALIGNMENT = ["left", "center", "right"];
    const {
      fontColor
    ***REMOVED*** = this.data.defaultAppearanceData;
    const fontSize = this.data.defaultAppearanceData.fontSize || annotation_layer_DEFAULT_FONT_SIZE;
    const style = element.style;
    let computedFontSize;
    const BORDER_SIZE = 2;
    const roundToOneDecimal = x => Math.round(10 * x***REMOVED*** / 10;
    if (this.data.multiLine***REMOVED*** {
      const height = Math.abs(this.data.rect[3] - this.data.rect[1] - BORDER_SIZE***REMOVED***;
      const numberOfLines = Math.round(height / (LINE_FACTOR * fontSize***REMOVED******REMOVED*** || 1;
      const lineHeight = height / numberOfLines;
      computedFontSize = Math.min(fontSize, roundToOneDecimal(lineHeight / LINE_FACTOR***REMOVED******REMOVED***;
    ***REMOVED*** else {
      const height = Math.abs(this.data.rect[3] - this.data.rect[1] - BORDER_SIZE***REMOVED***;
      computedFontSize = Math.min(fontSize, roundToOneDecimal(height / LINE_FACTOR***REMOVED******REMOVED***;
    ***REMOVED***
    style.fontSize = `calc(${computedFontSize***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
    style.color = Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]***REMOVED***;
    if (this.data.textAlignment !== null***REMOVED*** {
      style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    ***REMOVED***
  ***REMOVED***
  _setRequired(element, isRequired***REMOVED*** {
    if (isRequired***REMOVED*** {
      element.setAttribute("required", true***REMOVED***;
    ***REMOVED*** else {
      element.removeAttribute("required"***REMOVED***;
    ***REMOVED***
    element.setAttribute("aria-required", isRequired***REMOVED***;
  ***REMOVED***
***REMOVED***
class TextWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters***REMOVED*** {
    const isRenderable = parameters.renderForms || parameters.data.hasOwnCanvas || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, {
      isRenderable
    ***REMOVED******REMOVED***;
  ***REMOVED***
  setPropertyOnSiblings(base, key, value, keyInStorage***REMOVED*** {
    const storage = this.annotationStorage;
    for (const element of this._getElementsByName(base.name, base.id***REMOVED******REMOVED*** {
      if (element.domElement***REMOVED*** {
        element.domElement[key] = value;
      ***REMOVED***
      storage.setValue(element.id, {
        [keyInStorage]: value
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  render(***REMOVED*** {
    const storage = this.annotationStorage;
    const id = this.data.id;
    this.container.classList.add("textWidgetAnnotation"***REMOVED***;
    let element = null;
    if (this.renderForms***REMOVED*** {
      const storedData = storage.getValue(id, {
        value: this.data.fieldValue
      ***REMOVED******REMOVED***;
      let textContent = storedData.value || "";
      const maxLen = storage.getValue(id, {
        charLimit: this.data.maxLen
      ***REMOVED******REMOVED***.charLimit;
      if (maxLen && textContent.length > maxLen***REMOVED*** {
        textContent = textContent.slice(0, maxLen***REMOVED***;
      ***REMOVED***
      let fieldFormattedValues = storedData.formattedValue || this.data.textContent?.join("\n"***REMOVED*** || null;
      if (fieldFormattedValues && this.data.comb***REMOVED*** {
        fieldFormattedValues = fieldFormattedValues.replaceAll(/\s+/g, ""***REMOVED***;
      ***REMOVED***
      const elementData = {
        userValue: textContent,
        formattedValue: fieldFormattedValues,
        lastCommittedValue: null,
        commitKey: 1,
        focused: false
      ***REMOVED***;
      if (this.data.multiLine***REMOVED*** {
        element = document.createElement("textarea"***REMOVED***;
        element.textContent = fieldFormattedValues ?? textContent;
        if (this.data.doNotScroll***REMOVED*** {
          element.style.overflowY = "hidden";
        ***REMOVED***
      ***REMOVED*** else {
        element = document.createElement("input"***REMOVED***;
        element.type = "text";
        element.setAttribute("value", fieldFormattedValues ?? textContent***REMOVED***;
        if (this.data.doNotScroll***REMOVED*** {
          element.style.overflowX = "hidden";
        ***REMOVED***
      ***REMOVED***
      if (this.data.hasOwnCanvas***REMOVED*** {
        element.hidden = true;
      ***REMOVED***
      GetElementsByNameSet.add(element***REMOVED***;
      element.setAttribute("data-element-id", id***REMOVED***;
      element.disabled = this.data.readOnly;
      element.name = this.data.fieldName;
      element.tabIndex = DEFAULT_TAB_INDEX;
      this._setRequired(element, this.data.required***REMOVED***;
      if (maxLen***REMOVED*** {
        element.maxLength = maxLen;
      ***REMOVED***
      element.addEventListener("input", event => {
        storage.setValue(id, {
          value: event.target.value
        ***REMOVED******REMOVED***;
        this.setPropertyOnSiblings(element, "value", event.target.value, "value"***REMOVED***;
        elementData.formattedValue = null;
      ***REMOVED******REMOVED***;
      element.addEventListener("resetform", event => {
        const defaultValue = this.data.defaultFieldValue ?? "";
        element.value = elementData.userValue = defaultValue;
        elementData.formattedValue = null;
      ***REMOVED******REMOVED***;
      let blurListener = event => {
        const {
          formattedValue
        ***REMOVED*** = elementData;
        if (formattedValue !== null && formattedValue !== undefined***REMOVED*** {
          event.target.value = formattedValue;
        ***REMOVED***
        event.target.scrollLeft = 0;
      ***REMOVED***;
      if (this.enableScripting && this.hasJSActions***REMOVED*** {
        element.addEventListener("focus", event => {
          if (elementData.focused***REMOVED*** {
            return;
          ***REMOVED***
          const {
            target
          ***REMOVED*** = event;
          if (elementData.userValue***REMOVED*** {
            target.value = elementData.userValue;
          ***REMOVED***
          elementData.lastCommittedValue = target.value;
          elementData.commitKey = 1;
          if (!this.data.actions?.Focus***REMOVED*** {
            elementData.focused = true;
          ***REMOVED***
        ***REMOVED******REMOVED***;
        element.addEventListener("updatefromsandbox", jsEvent => {
          this.showElementAndHideCanvas(jsEvent.target***REMOVED***;
          const actions = {
            value(event***REMOVED*** {
              elementData.userValue = event.detail.value ?? "";
              storage.setValue(id, {
                value: elementData.userValue.toString(***REMOVED***
              ***REMOVED******REMOVED***;
              event.target.value = elementData.userValue;
            ***REMOVED***,
            formattedValue(event***REMOVED*** {
              const {
                formattedValue
              ***REMOVED*** = event.detail;
              elementData.formattedValue = formattedValue;
              if (formattedValue !== null && formattedValue !== undefined && event.target !== document.activeElement***REMOVED*** {
                event.target.value = formattedValue;
              ***REMOVED***
              storage.setValue(id, {
                formattedValue
              ***REMOVED******REMOVED***;
            ***REMOVED***,
            selRange(event***REMOVED*** {
              event.target.setSelectionRange(...event.detail.selRange***REMOVED***;
            ***REMOVED***,
            charLimit: event => {
              const {
                charLimit
              ***REMOVED*** = event.detail;
              const {
                target
              ***REMOVED*** = event;
              if (charLimit === 0***REMOVED*** {
                target.removeAttribute("maxLength"***REMOVED***;
                return;
              ***REMOVED***
              target.setAttribute("maxLength", charLimit***REMOVED***;
              let value = elementData.userValue;
              if (!value || value.length <= charLimit***REMOVED*** {
                return;
              ***REMOVED***
              value = value.slice(0, charLimit***REMOVED***;
              target.value = elementData.userValue = value;
              storage.setValue(id, {
                value
              ***REMOVED******REMOVED***;
              this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id,
                  name: "Keystroke",
                  value,
                  willCommit: true,
                  commitKey: 1,
                  selStart: target.selectionStart,
                  selEnd: target.selectionEnd
                ***REMOVED***
              ***REMOVED******REMOVED***;
            ***REMOVED***
          ***REMOVED***;
          this._dispatchEventFromSandbox(actions, jsEvent***REMOVED***;
        ***REMOVED******REMOVED***;
        element.addEventListener("keydown", event => {
          elementData.commitKey = 1;
          let commitKey = -1;
          if (event.key === "Escape"***REMOVED*** {
            commitKey = 0;
          ***REMOVED*** else if (event.key === "Enter" && !this.data.multiLine***REMOVED*** {
            commitKey = 2;
          ***REMOVED*** else if (event.key === "Tab"***REMOVED*** {
            elementData.commitKey = 3;
          ***REMOVED***
          if (commitKey === -1***REMOVED*** {
            return;
          ***REMOVED***
          const {
            value
          ***REMOVED*** = event.target;
          if (elementData.lastCommittedValue === value***REMOVED*** {
            return;
          ***REMOVED***
          elementData.lastCommittedValue = value;
          elementData.userValue = value;
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id,
              name: "Keystroke",
              value,
              willCommit: true,
              commitKey,
              selStart: event.target.selectionStart,
              selEnd: event.target.selectionEnd
            ***REMOVED***
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
        const _blurListener = blurListener;
        blurListener = null;
        element.addEventListener("blur", event => {
          if (!elementData.focused || !event.relatedTarget***REMOVED*** {
            return;
          ***REMOVED***
          if (!this.data.actions?.Blur***REMOVED*** {
            elementData.focused = false;
          ***REMOVED***
          const {
            value
          ***REMOVED*** = event.target;
          elementData.userValue = value;
          if (elementData.lastCommittedValue !== value***REMOVED*** {
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                willCommit: true,
                commitKey: elementData.commitKey,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              ***REMOVED***
            ***REMOVED******REMOVED***;
          ***REMOVED***
          _blurListener(event***REMOVED***;
        ***REMOVED******REMOVED***;
        if (this.data.actions?.Keystroke***REMOVED*** {
          element.addEventListener("beforeinput", event => {
            elementData.lastCommittedValue = null;
            const {
              data,
              target
            ***REMOVED*** = event;
            const {
              value,
              selectionStart,
              selectionEnd
            ***REMOVED*** = target;
            let selStart = selectionStart,
              selEnd = selectionEnd;
            switch (event.inputType***REMOVED*** {
              case "deleteWordBackward":
              ***REMOVED***
                  const match = value.substring(0, selectionStart***REMOVED***.match(/\w*[^\w]*$/***REMOVED***;
                  if (match***REMOVED*** {
                    selStart -= match[0].length;
                  ***REMOVED***
                  break;
                ***REMOVED***
              case "deleteWordForward":
              ***REMOVED***
                  const match = value.substring(selectionStart***REMOVED***.match(/^[^\w]*\w*/***REMOVED***;
                  if (match***REMOVED*** {
                    selEnd += match[0].length;
                  ***REMOVED***
                  break;
                ***REMOVED***
              case "deleteContentBackward":
                if (selectionStart === selectionEnd***REMOVED*** {
                  selStart -= 1;
                ***REMOVED***
                break;
              case "deleteContentForward":
                if (selectionStart === selectionEnd***REMOVED*** {
                  selEnd += 1;
                ***REMOVED***
                break;
            ***REMOVED***
            event.preventDefault(***REMOVED***;
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                change: data || "",
                willCommit: false,
                selStart,
                selEnd
              ***REMOVED***
            ***REMOVED******REMOVED***;
          ***REMOVED******REMOVED***;
        ***REMOVED***
        this._setEventListeners(element, elementData, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.value***REMOVED***;
      ***REMOVED***
      if (blurListener***REMOVED*** {
        element.addEventListener("blur", blurListener***REMOVED***;
      ***REMOVED***
      if (this.data.comb***REMOVED*** {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / maxLen;
        element.classList.add("comb"***REMOVED***;
        element.style.letterSpacing = `calc(${combWidth***REMOVED***px * var(--scale-factor***REMOVED*** - 1ch***REMOVED***`;
      ***REMOVED***
    ***REMOVED*** else {
      element = document.createElement("div"***REMOVED***;
      element.textContent = this.data.fieldValue;
      element.style.verticalAlign = "middle";
      element.style.display = "table-cell";
      if (this.data.hasOwnCanvas***REMOVED*** {
        element.hidden = true;
      ***REMOVED***
    ***REMOVED***
    this._setTextStyle(element***REMOVED***;
    this._setBackgroundColor(element***REMOVED***;
    this._setDefaultPropertiesFromJS(element***REMOVED***;
    this.container.append(element***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class SignatureWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: !!parameters.data.hasOwnCanvas
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***
class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: parameters.renderForms
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.exportValue === data.fieldValue
    ***REMOVED******REMOVED***.value;
    if (typeof value === "string"***REMOVED*** {
      value = value !== "Off";
      storage.setValue(id, {
        value
      ***REMOVED******REMOVED***;
    ***REMOVED***
    this.container.classList.add("buttonWidgetAnnotation", "checkBox"***REMOVED***;
    const element = document.createElement("input"***REMOVED***;
    GetElementsByNameSet.add(element***REMOVED***;
    element.setAttribute("data-element-id", id***REMOVED***;
    element.disabled = data.readOnly;
    this._setRequired(element, this.data.required***REMOVED***;
    element.type = "checkbox";
    element.name = data.fieldName;
    if (value***REMOVED*** {
      element.setAttribute("checked", true***REMOVED***;
    ***REMOVED***
    element.setAttribute("exportValue", data.exportValue***REMOVED***;
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      ***REMOVED*** = event.target;
      for (const checkbox of this._getElementsByName(name, id***REMOVED******REMOVED*** {
        const curChecked = checked && checkbox.exportValue === data.exportValue;
        if (checkbox.domElement***REMOVED*** {
          checkbox.domElement.checked = curChecked;
        ***REMOVED***
        storage.setValue(checkbox.id, {
          value: curChecked
        ***REMOVED******REMOVED***;
      ***REMOVED***
      storage.setValue(id, {
        value: checked
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue || "Off";
      event.target.checked = defaultValue === data.exportValue;
    ***REMOVED******REMOVED***;
    if (this.enableScripting && this.hasJSActions***REMOVED*** {
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event***REMOVED*** {
            event.target.checked = event.detail.value !== "Off";
            storage.setValue(id, {
              value: event.target.checked
            ***REMOVED******REMOVED***;
          ***REMOVED***
        ***REMOVED***;
        this._dispatchEventFromSandbox(actions, jsEvent***REMOVED***;
      ***REMOVED******REMOVED***;
      this._setEventListeners(element, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked***REMOVED***;
    ***REMOVED***
    this._setBackgroundColor(element***REMOVED***;
    this._setDefaultPropertiesFromJS(element***REMOVED***;
    this.container.append(element***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: parameters.renderForms
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton"***REMOVED***;
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.fieldValue === data.buttonValue
    ***REMOVED******REMOVED***.value;
    if (typeof value === "string"***REMOVED*** {
      value = value !== data.buttonValue;
      storage.setValue(id, {
        value
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (value***REMOVED*** {
      for (const radio of this._getElementsByName(data.fieldName, id***REMOVED******REMOVED*** {
        storage.setValue(radio.id, {
          value: false
        ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const element = document.createElement("input"***REMOVED***;
    GetElementsByNameSet.add(element***REMOVED***;
    element.setAttribute("data-element-id", id***REMOVED***;
    element.disabled = data.readOnly;
    this._setRequired(element, this.data.required***REMOVED***;
    element.type = "radio";
    element.name = data.fieldName;
    if (value***REMOVED*** {
      element.setAttribute("checked", true***REMOVED***;
    ***REMOVED***
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      ***REMOVED*** = event.target;
      for (const radio of this._getElementsByName(name, id***REMOVED******REMOVED*** {
        storage.setValue(radio.id, {
          value: false
        ***REMOVED******REMOVED***;
      ***REMOVED***
      storage.setValue(id, {
        value: checked
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue;
      event.target.checked = defaultValue !== null && defaultValue !== undefined && defaultValue === data.buttonValue;
    ***REMOVED******REMOVED***;
    if (this.enableScripting && this.hasJSActions***REMOVED*** {
      const pdfButtonValue = data.buttonValue;
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value: event => {
            const checked = pdfButtonValue === event.detail.value;
            for (const radio of this._getElementsByName(event.target.name***REMOVED******REMOVED*** {
              const curChecked = checked && radio.id === id;
              if (radio.domElement***REMOVED*** {
                radio.domElement.checked = curChecked;
              ***REMOVED***
              storage.setValue(radio.id, {
                value: curChecked
              ***REMOVED******REMOVED***;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***;
        this._dispatchEventFromSandbox(actions, jsEvent***REMOVED***;
      ***REMOVED******REMOVED***;
      this._setEventListeners(element, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked***REMOVED***;
    ***REMOVED***
    this._setBackgroundColor(element***REMOVED***;
    this._setDefaultPropertiesFromJS(element***REMOVED***;
    this.container.append(element***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      ignoreBorder: parameters.data.hasAppearance
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    const container = super.render(***REMOVED***;
    container.classList.add("buttonWidgetAnnotation", "pushButton"***REMOVED***;
    const linkElement = container.lastChild;
    if (this.enableScripting && this.hasJSActions && linkElement***REMOVED*** {
      this._setDefaultPropertiesFromJS(linkElement***REMOVED***;
      linkElement.addEventListener("updatefromsandbox", jsEvent => {
        this._dispatchEventFromSandbox({***REMOVED***, jsEvent***REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return container;
  ***REMOVED***
***REMOVED***
class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: parameters.renderForms
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("choiceWidgetAnnotation"***REMOVED***;
    const storage = this.annotationStorage;
    const id = this.data.id;
    const storedData = storage.getValue(id, {
      value: this.data.fieldValue
    ***REMOVED******REMOVED***;
    const selectElement = document.createElement("select"***REMOVED***;
    GetElementsByNameSet.add(selectElement***REMOVED***;
    selectElement.setAttribute("data-element-id", id***REMOVED***;
    selectElement.disabled = this.data.readOnly;
    this._setRequired(selectElement, this.data.required***REMOVED***;
    selectElement.name = this.data.fieldName;
    selectElement.tabIndex = DEFAULT_TAB_INDEX;
    let addAnEmptyEntry = this.data.combo && this.data.options.length > 0;
    if (!this.data.combo***REMOVED*** {
      selectElement.size = this.data.options.length;
      if (this.data.multiSelect***REMOVED*** {
        selectElement.multiple = true;
      ***REMOVED***
    ***REMOVED***
    selectElement.addEventListener("resetform", event => {
      const defaultValue = this.data.defaultFieldValue;
      for (const option of selectElement.options***REMOVED*** {
        option.selected = option.value === defaultValue;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    for (const option of this.data.options***REMOVED*** {
      const optionElement = document.createElement("option"***REMOVED***;
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;
      if (storedData.value.includes(option.exportValue***REMOVED******REMOVED*** {
        optionElement.setAttribute("selected", true***REMOVED***;
        addAnEmptyEntry = false;
      ***REMOVED***
      selectElement.append(optionElement***REMOVED***;
    ***REMOVED***
    let removeEmptyEntry = null;
    if (addAnEmptyEntry***REMOVED*** {
      const noneOptionElement = document.createElement("option"***REMOVED***;
      noneOptionElement.value = " ";
      noneOptionElement.setAttribute("hidden", true***REMOVED***;
      noneOptionElement.setAttribute("selected", true***REMOVED***;
      selectElement.prepend(noneOptionElement***REMOVED***;
      removeEmptyEntry = (***REMOVED*** => {
        noneOptionElement.remove(***REMOVED***;
        selectElement.removeEventListener("input", removeEmptyEntry***REMOVED***;
        removeEmptyEntry = null;
      ***REMOVED***;
      selectElement.addEventListener("input", removeEmptyEntry***REMOVED***;
    ***REMOVED***
    const getValue = isExport => {
      const name = isExport ? "value" : "textContent";
      const {
        options,
        multiple
      ***REMOVED*** = selectElement;
      if (!multiple***REMOVED*** {
        return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
      ***REMOVED***
      return Array.prototype.filter.call(options, option => option.selected***REMOVED***.map(option => option[name]***REMOVED***;
    ***REMOVED***;
    let selectedValues = getValue(false***REMOVED***;
    const getItems = event => {
      const options = event.target.options;
      return Array.prototype.map.call(options, option => ({
        displayValue: option.textContent,
        exportValue: option.value
      ***REMOVED******REMOVED******REMOVED***;
    ***REMOVED***;
    if (this.enableScripting && this.hasJSActions***REMOVED*** {
      selectElement.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event***REMOVED*** {
            removeEmptyEntry?.(***REMOVED***;
            const value = event.detail.value;
            const values = new Set(Array.isArray(value***REMOVED*** ? value : [value]***REMOVED***;
            for (const option of selectElement.options***REMOVED*** {
              option.selected = values.has(option.value***REMOVED***;
            ***REMOVED***
            storage.setValue(id, {
              value: getValue(true***REMOVED***
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          multipleSelection(event***REMOVED*** {
            selectElement.multiple = true;
          ***REMOVED***,
          remove(event***REMOVED*** {
            const options = selectElement.options;
            const index = event.detail.remove;
            options[index].selected = false;
            selectElement.remove(index***REMOVED***;
            if (options.length > 0***REMOVED*** {
              const i = Array.prototype.findIndex.call(options, option => option.selected***REMOVED***;
              if (i === -1***REMOVED*** {
                options[0].selected = true;
              ***REMOVED***
            ***REMOVED***
            storage.setValue(id, {
              value: getValue(true***REMOVED***,
              items: getItems(event***REMOVED***
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          clear(event***REMOVED*** {
            while (selectElement.length !== 0***REMOVED*** {
              selectElement.remove(0***REMOVED***;
            ***REMOVED***
            storage.setValue(id, {
              value: null,
              items: []
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          insert(event***REMOVED*** {
            const {
              index,
              displayValue,
              exportValue
            ***REMOVED*** = event.detail.insert;
            const selectChild = selectElement.children[index];
            const optionElement = document.createElement("option"***REMOVED***;
            optionElement.textContent = displayValue;
            optionElement.value = exportValue;
            if (selectChild***REMOVED*** {
              selectChild.before(optionElement***REMOVED***;
            ***REMOVED*** else {
              selectElement.append(optionElement***REMOVED***;
            ***REMOVED***
            storage.setValue(id, {
              value: getValue(true***REMOVED***,
              items: getItems(event***REMOVED***
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          items(event***REMOVED*** {
            const {
              items
            ***REMOVED*** = event.detail;
            while (selectElement.length !== 0***REMOVED*** {
              selectElement.remove(0***REMOVED***;
            ***REMOVED***
            for (const item of items***REMOVED*** {
              const {
                displayValue,
                exportValue
              ***REMOVED*** = item;
              const optionElement = document.createElement("option"***REMOVED***;
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.append(optionElement***REMOVED***;
            ***REMOVED***
            if (selectElement.options.length > 0***REMOVED*** {
              selectElement.options[0].selected = true;
            ***REMOVED***
            storage.setValue(id, {
              value: getValue(true***REMOVED***,
              items: getItems(event***REMOVED***
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          indices(event***REMOVED*** {
            const indices = new Set(event.detail.indices***REMOVED***;
            for (const option of event.target.options***REMOVED*** {
              option.selected = indices.has(option.index***REMOVED***;
            ***REMOVED***
            storage.setValue(id, {
              value: getValue(true***REMOVED***
            ***REMOVED******REMOVED***;
            selectedValues = getValue(false***REMOVED***;
          ***REMOVED***,
          editable(event***REMOVED*** {
            event.target.disabled = !event.detail.editable;
          ***REMOVED***
        ***REMOVED***;
        this._dispatchEventFromSandbox(actions, jsEvent***REMOVED***;
      ***REMOVED******REMOVED***;
      selectElement.addEventListener("input", event => {
        const exportValue = getValue(true***REMOVED***;
        const change = getValue(false***REMOVED***;
        storage.setValue(id, {
          value: exportValue
        ***REMOVED******REMOVED***;
        event.preventDefault(***REMOVED***;
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id,
            name: "Keystroke",
            value: selectedValues,
            change,
            changeEx: exportValue,
            willCommit: false,
            commitKey: 1,
            keyDown: false
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
      this._setEventListeners(selectElement, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], event => event.target.value***REMOVED***;
    ***REMOVED*** else {
      selectElement.addEventListener("input", function (event***REMOVED*** {
        storage.setValue(id, {
          value: getValue(true***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (this.data.combo***REMOVED*** {
      this._setTextStyle(selectElement***REMOVED***;
    ***REMOVED*** else {***REMOVED***
    this._setBackgroundColor(selectElement***REMOVED***;
    this._setDefaultPropertiesFromJS(selectElement***REMOVED***;
    this.container.append(selectElement***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class PopupAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    const {
      data,
      elements
    ***REMOVED*** = parameters;
    super(parameters, {
      isRenderable: AnnotationElement._hasPopupData(data***REMOVED***
    ***REMOVED******REMOVED***;
    this.elements = elements;
    this.popup = null;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("popupAnnotation"***REMOVED***;
    const popup = this.popup = new PopupElement({
      container: this.container,
      color: this.data.color,
      titleObj: this.data.titleObj,
      modificationDate: this.data.modificationDate,
      contentsObj: this.data.contentsObj,
      richText: this.data.richText,
      rect: this.data.rect,
      parentRect: this.data.parentRect || null,
      parent: this.parent,
      elements: this.elements,
      open: this.data.open
    ***REMOVED******REMOVED***;
    const elementIds = [];
    for (const element of this.elements***REMOVED*** {
      element.popup = popup;
      element.container.ariaHasPopup = "dialog";
      elementIds.push(element.data.id***REMOVED***;
      element.addHighlightArea(***REMOVED***;
    ***REMOVED***
    this.container.setAttribute("aria-controls", elementIds.map(id => `${AnnotationPrefix***REMOVED***${id***REMOVED***`***REMOVED***.join(","***REMOVED******REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class PopupElement {
  #boundKeyDown = this.#keyDown.bind(this***REMOVED***;
  #boundHide = this.#hide.bind(this***REMOVED***;
  #boundShow = this.#show.bind(this***REMOVED***;
  #boundToggle = this.#toggle.bind(this***REMOVED***;
  #color = null;
  #container = null;
  #contentsObj = null;
  #dateObj = null;
  #elements = null;
  #parent = null;
  #parentRect = null;
  #pinned = false;
  #popup = null;
  #position = null;
  #rect = null;
  #richText = null;
  #titleObj = null;
  #updates = null;
  #wasVisible = false;
  constructor({
    container,
    color,
    elements,
    titleObj,
    modificationDate,
    contentsObj,
    richText,
    parent,
    rect,
    parentRect,
    open
  ***REMOVED******REMOVED*** {
    this.#container = container;
    this.#titleObj = titleObj;
    this.#contentsObj = contentsObj;
    this.#richText = richText;
    this.#parent = parent;
    this.#color = color;
    this.#rect = rect;
    this.#parentRect = parentRect;
    this.#elements = elements;
    this.#dateObj = PDFDateString.toDateObject(modificationDate***REMOVED***;
    this.trigger = elements.flatMap(e => e.getElementsToTriggerPopup(***REMOVED******REMOVED***;
    for (const element of this.trigger***REMOVED*** {
      element.addEventListener("click", this.#boundToggle***REMOVED***;
      element.addEventListener("mouseenter", this.#boundShow***REMOVED***;
      element.addEventListener("mouseleave", this.#boundHide***REMOVED***;
      element.classList.add("popupTriggerArea"***REMOVED***;
    ***REMOVED***
    for (const element of elements***REMOVED*** {
      element.container?.addEventListener("keydown", this.#boundKeyDown***REMOVED***;
    ***REMOVED***
    this.#container.hidden = true;
    if (open***REMOVED*** {
      this.#toggle(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  render(***REMOVED*** {
    if (this.#popup***REMOVED*** {
      return;
    ***REMOVED***
    const popup = this.#popup = document.createElement("div"***REMOVED***;
    popup.className = "popup";
    if (this.#color***REMOVED*** {
      const baseColor = popup.style.outlineColor = Util.makeHexColor(...this.#color***REMOVED***;
      if (CSS.supports("background-color", "color-mix(in srgb, red 30%, white***REMOVED***"***REMOVED******REMOVED*** {
        popup.style.backgroundColor = `color-mix(in srgb, ${baseColor***REMOVED*** 30%, white***REMOVED***`;
      ***REMOVED*** else {
        const BACKGROUND_ENLIGHT = 0.7;
        popup.style.backgroundColor = Util.makeHexColor(...this.#color.map(c => Math.floor(BACKGROUND_ENLIGHT * (255 - c***REMOVED*** + c***REMOVED******REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    const header = document.createElement("span"***REMOVED***;
    header.className = "header";
    const title = document.createElement("h1"***REMOVED***;
    header.append(title***REMOVED***;
    ({
      dir: title.dir,
      str: title.textContent
    ***REMOVED*** = this.#titleObj***REMOVED***;
    popup.append(header***REMOVED***;
    if (this.#dateObj***REMOVED*** {
      const modificationDate = document.createElement("span"***REMOVED***;
      modificationDate.classList.add("popupDate"***REMOVED***;
      modificationDate.setAttribute("data-l10n-id", "pdfjs-annotation-date-time-string"***REMOVED***;
      modificationDate.setAttribute("data-l10n-args", JSON.stringify({
        dateObj: this.#dateObj.valueOf(***REMOVED***
      ***REMOVED******REMOVED******REMOVED***;
      header.append(modificationDate***REMOVED***;
    ***REMOVED***
    const html = this.#html;
    if (html***REMOVED*** {
      XfaLayer.render({
        xfaHtml: html,
        intent: "richText",
        div: popup
      ***REMOVED******REMOVED***;
      popup.lastChild.classList.add("richText", "popupContent"***REMOVED***;
    ***REMOVED*** else {
      const contents = this._formatContents(this.#contentsObj***REMOVED***;
      popup.append(contents***REMOVED***;
    ***REMOVED***
    this.#container.append(popup***REMOVED***;
  ***REMOVED***
  get #html(***REMOVED*** {
    const richText = this.#richText;
    const contentsObj = this.#contentsObj;
    if (richText?.str && (!contentsObj?.str || contentsObj.str === richText.str***REMOVED******REMOVED*** {
      return this.#richText.html || null;
    ***REMOVED***
    return null;
  ***REMOVED***
  get #fontSize(***REMOVED*** {
    return this.#html?.attributes?.style?.fontSize || 0;
  ***REMOVED***
  get #fontColor(***REMOVED*** {
    return this.#html?.attributes?.style?.color || null;
  ***REMOVED***
  #makePopupContent(text***REMOVED*** {
    const popupLines = [];
    const popupContent = {
      str: text,
      html: {
        name: "div",
        attributes: {
          dir: "auto"
        ***REMOVED***,
        children: [{
          name: "p",
          children: popupLines
        ***REMOVED***]
      ***REMOVED***
    ***REMOVED***;
    const lineAttributes = {
      style: {
        color: this.#fontColor,
        fontSize: this.#fontSize ? `calc(${this.#fontSize***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***` : ""
      ***REMOVED***
    ***REMOVED***;
    for (const line of text.split("\n"***REMOVED******REMOVED*** {
      popupLines.push({
        name: "span",
        value: line,
        attributes: lineAttributes
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return popupContent;
  ***REMOVED***
  _formatContents({
    str,
    dir
  ***REMOVED******REMOVED*** {
    const p = document.createElement("p"***REMOVED***;
    p.classList.add("popupContent"***REMOVED***;
    p.dir = dir;
    const lines = str.split(/(?:\r\n?|\n***REMOVED***/***REMOVED***;
    for (let i = 0, ii = lines.length; i < ii; ++i***REMOVED*** {
      const line = lines[i];
      p.append(document.createTextNode(line***REMOVED******REMOVED***;
      if (i < ii - 1***REMOVED*** {
        p.append(document.createElement("br"***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return p;
  ***REMOVED***
  #keyDown(event***REMOVED*** {
    if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey***REMOVED*** {
      return;
    ***REMOVED***
    if (event.key === "Enter" || event.key === "Escape" && this.#pinned***REMOVED*** {
      this.#toggle(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateEdited({
    rect,
    popupContent
  ***REMOVED******REMOVED*** {
    this.#updates ||= {
      contentsObj: this.#contentsObj,
      richText: this.#richText
    ***REMOVED***;
    if (rect***REMOVED*** {
      this.#position = null;
    ***REMOVED***
    if (popupContent***REMOVED*** {
      this.#richText = this.#makePopupContent(popupContent***REMOVED***;
      this.#contentsObj = null;
    ***REMOVED***
    this.#popup?.remove(***REMOVED***;
    this.#popup = null;
  ***REMOVED***
  resetEdited(***REMOVED*** {
    if (!this.#updates***REMOVED*** {
      return;
    ***REMOVED***
    ({
      contentsObj: this.#contentsObj,
      richText: this.#richText
    ***REMOVED*** = this.#updates***REMOVED***;
    this.#updates = null;
    this.#popup?.remove(***REMOVED***;
    this.#popup = null;
    this.#position = null;
  ***REMOVED***
  #setPosition(***REMOVED*** {
    if (this.#position !== null***REMOVED*** {
      return;
    ***REMOVED***
    const {
      page: {
        view
      ***REMOVED***,
      viewport: {
        rawDims: {
          pageWidth,
          pageHeight,
          pageX,
          pageY
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** = this.#parent;
    let useParentRect = !!this.#parentRect;
    let rect = useParentRect ? this.#parentRect : this.#rect;
    for (const element of this.#elements***REMOVED*** {
      if (!rect || Util.intersect(element.data.rect, rect***REMOVED*** !== null***REMOVED*** {
        rect = element.data.rect;
        useParentRect = true;
        break;
      ***REMOVED***
    ***REMOVED***
    const normalizedRect = Util.normalizeRect([rect[0], view[3] - rect[1] + view[1], rect[2], view[3] - rect[3] + view[1]]***REMOVED***;
    const HORIZONTAL_SPACE_AFTER_ANNOTATION = 5;
    const parentWidth = useParentRect ? rect[2] - rect[0] + HORIZONTAL_SPACE_AFTER_ANNOTATION : 0;
    const popupLeft = normalizedRect[0] + parentWidth;
    const popupTop = normalizedRect[1];
    this.#position = [100 * (popupLeft - pageX***REMOVED*** / pageWidth, 100 * (popupTop - pageY***REMOVED*** / pageHeight];
    const {
      style
    ***REMOVED*** = this.#container;
    style.left = `${this.#position[0]***REMOVED***%`;
    style.top = `${this.#position[1]***REMOVED***%`;
  ***REMOVED***
  #toggle(***REMOVED*** {
    this.#pinned = !this.#pinned;
    if (this.#pinned***REMOVED*** {
      this.#show(***REMOVED***;
      this.#container.addEventListener("click", this.#boundToggle***REMOVED***;
      this.#container.addEventListener("keydown", this.#boundKeyDown***REMOVED***;
    ***REMOVED*** else {
      this.#hide(***REMOVED***;
      this.#container.removeEventListener("click", this.#boundToggle***REMOVED***;
      this.#container.removeEventListener("keydown", this.#boundKeyDown***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #show(***REMOVED*** {
    if (!this.#popup***REMOVED*** {
      this.render(***REMOVED***;
    ***REMOVED***
    if (!this.isVisible***REMOVED*** {
      this.#setPosition(***REMOVED***;
      this.#container.hidden = false;
      this.#container.style.zIndex = parseInt(this.#container.style.zIndex***REMOVED*** + 1000;
    ***REMOVED*** else if (this.#pinned***REMOVED*** {
      this.#container.classList.add("focused"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #hide(***REMOVED*** {
    this.#container.classList.remove("focused"***REMOVED***;
    if (this.#pinned || !this.isVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.#container.hidden = true;
    this.#container.style.zIndex = parseInt(this.#container.style.zIndex***REMOVED*** - 1000;
  ***REMOVED***
  forceHide(***REMOVED*** {
    this.#wasVisible = this.isVisible;
    if (!this.#wasVisible***REMOVED*** {
      return;
    ***REMOVED***
    this.#container.hidden = true;
  ***REMOVED***
  maybeShow(***REMOVED*** {
    if (!this.#wasVisible***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#popup***REMOVED*** {
      this.#show(***REMOVED***;
    ***REMOVED***
    this.#wasVisible = false;
    this.#container.hidden = false;
  ***REMOVED***
  get isVisible(***REMOVED*** {
    return this.#container.hidden === false;
  ***REMOVED***
***REMOVED***
class FreeTextAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
    this.textContent = parameters.data.textContent;
    this.textPosition = parameters.data.textPosition;
    this.annotationEditorType = AnnotationEditorType.FREETEXT;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("freeTextAnnotation"***REMOVED***;
    if (this.textContent***REMOVED*** {
      const content = document.createElement("div"***REMOVED***;
      content.classList.add("annotationTextContent"***REMOVED***;
      content.setAttribute("role", "comment"***REMOVED***;
      for (const line of this.textContent***REMOVED*** {
        const lineSpan = document.createElement("span"***REMOVED***;
        lineSpan.textContent = line;
        content.append(lineSpan***REMOVED***;
      ***REMOVED***
      this.container.append(content***REMOVED***;
    ***REMOVED***
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this._editOnDoubleClick(***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class LineAnnotationElement extends AnnotationElement {
  #line = null;
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("lineAnnotation"***REMOVED***;
    const data = this.data;
    const {
      width,
      height
    ***REMOVED*** = getRectDims(data.rect***REMOVED***;
    const svg = this.svgFactory.create(width, height, true***REMOVED***;
    const line = this.#line = this.svgFactory.createElement("svg:line"***REMOVED***;
    line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]***REMOVED***;
    line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]***REMOVED***;
    line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]***REMOVED***;
    line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]***REMOVED***;
    line.setAttribute("stroke-width", data.borderStyle.width || 1***REMOVED***;
    line.setAttribute("stroke", "transparent"***REMOVED***;
    line.setAttribute("fill", "transparent"***REMOVED***;
    svg.append(line***REMOVED***;
    this.container.append(svg***REMOVED***;
    if (!data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#line;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
***REMOVED***
class SquareAnnotationElement extends AnnotationElement {
  #square = null;
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("squareAnnotation"***REMOVED***;
    const data = this.data;
    const {
      width,
      height
    ***REMOVED*** = getRectDims(data.rect***REMOVED***;
    const svg = this.svgFactory.create(width, height, true***REMOVED***;
    const borderWidth = data.borderStyle.width;
    const square = this.#square = this.svgFactory.createElement("svg:rect"***REMOVED***;
    square.setAttribute("x", borderWidth / 2***REMOVED***;
    square.setAttribute("y", borderWidth / 2***REMOVED***;
    square.setAttribute("width", width - borderWidth***REMOVED***;
    square.setAttribute("height", height - borderWidth***REMOVED***;
    square.setAttribute("stroke-width", borderWidth || 1***REMOVED***;
    square.setAttribute("stroke", "transparent"***REMOVED***;
    square.setAttribute("fill", "transparent"***REMOVED***;
    svg.append(square***REMOVED***;
    this.container.append(svg***REMOVED***;
    if (!data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#square;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
***REMOVED***
class CircleAnnotationElement extends AnnotationElement {
  #circle = null;
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("circleAnnotation"***REMOVED***;
    const data = this.data;
    const {
      width,
      height
    ***REMOVED*** = getRectDims(data.rect***REMOVED***;
    const svg = this.svgFactory.create(width, height, true***REMOVED***;
    const borderWidth = data.borderStyle.width;
    const circle = this.#circle = this.svgFactory.createElement("svg:ellipse"***REMOVED***;
    circle.setAttribute("cx", width / 2***REMOVED***;
    circle.setAttribute("cy", height / 2***REMOVED***;
    circle.setAttribute("rx", width / 2 - borderWidth / 2***REMOVED***;
    circle.setAttribute("ry", height / 2 - borderWidth / 2***REMOVED***;
    circle.setAttribute("stroke-width", borderWidth || 1***REMOVED***;
    circle.setAttribute("stroke", "transparent"***REMOVED***;
    circle.setAttribute("fill", "transparent"***REMOVED***;
    svg.append(circle***REMOVED***;
    this.container.append(svg***REMOVED***;
    if (!data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#circle;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
***REMOVED***
class PolylineAnnotationElement extends AnnotationElement {
  #polyline = null;
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
    this.containerClassName = "polylineAnnotation";
    this.svgElementName = "svg:polyline";
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add(this.containerClassName***REMOVED***;
    const {
      data: {
        rect,
        vertices,
        borderStyle,
        popupRef
      ***REMOVED***
    ***REMOVED*** = this;
    if (!vertices***REMOVED*** {
      return this.container;
    ***REMOVED***
    const {
      width,
      height
    ***REMOVED*** = getRectDims(rect***REMOVED***;
    const svg = this.svgFactory.create(width, height, true***REMOVED***;
    let points = [];
    for (let i = 0, ii = vertices.length; i < ii; i += 2***REMOVED*** {
      const x = vertices[i] - rect[0];
      const y = rect[3] - vertices[i + 1];
      points.push(`${x***REMOVED***,${y***REMOVED***`***REMOVED***;
    ***REMOVED***
    points = points.join(" "***REMOVED***;
    const polyline = this.#polyline = this.svgFactory.createElement(this.svgElementName***REMOVED***;
    polyline.setAttribute("points", points***REMOVED***;
    polyline.setAttribute("stroke-width", borderStyle.width || 1***REMOVED***;
    polyline.setAttribute("stroke", "transparent"***REMOVED***;
    polyline.setAttribute("fill", "transparent"***REMOVED***;
    svg.append(polyline***REMOVED***;
    this.container.append(svg***REMOVED***;
    if (!popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#polyline;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
***REMOVED***
class PolygonAnnotationElement extends PolylineAnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters***REMOVED***;
    this.containerClassName = "polygonAnnotation";
    this.svgElementName = "svg:polygon";
  ***REMOVED***
***REMOVED***
class CaretAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("caretAnnotation"***REMOVED***;
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    return this.container;
  ***REMOVED***
***REMOVED***
class InkAnnotationElement extends AnnotationElement {
  #polylinesGroupElement = null;
  #polylines = [];
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
    this.containerClassName = "inkAnnotation";
    this.svgElementName = "svg:polyline";
    this.annotationEditorType = this.data.it === "InkHighlight" ? AnnotationEditorType.HIGHLIGHT : AnnotationEditorType.INK;
  ***REMOVED***
  #getTransform(rotation, rect***REMOVED*** {
    switch (rotation***REMOVED*** {
      case 90:
    ***REMOVED***
          transform: `rotate(90***REMOVED*** translate(${-rect[0]***REMOVED***,${rect[1]***REMOVED******REMOVED*** scale(1,-1***REMOVED***`,
          width: rect[3] - rect[1],
          height: rect[2] - rect[0]
        ***REMOVED***;
      case 180:
    ***REMOVED***
          transform: `rotate(180***REMOVED*** translate(${-rect[2]***REMOVED***,${rect[1]***REMOVED******REMOVED*** scale(1,-1***REMOVED***`,
          width: rect[2] - rect[0],
          height: rect[3] - rect[1]
        ***REMOVED***;
      case 270:
    ***REMOVED***
          transform: `rotate(270***REMOVED*** translate(${-rect[2]***REMOVED***,${rect[3]***REMOVED******REMOVED*** scale(1,-1***REMOVED***`,
          width: rect[3] - rect[1],
          height: rect[2] - rect[0]
        ***REMOVED***;
      default:
    ***REMOVED***
          transform: `translate(${-rect[0]***REMOVED***,${rect[3]***REMOVED******REMOVED*** scale(1,-1***REMOVED***`,
          width: rect[2] - rect[0],
          height: rect[3] - rect[1]
        ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add(this.containerClassName***REMOVED***;
    const {
      data: {
        rect,
        rotation,
        inkLists,
        borderStyle,
        popupRef
      ***REMOVED***
    ***REMOVED*** = this;
    const {
      transform,
      width,
      height
    ***REMOVED*** = this.#getTransform(rotation, rect***REMOVED***;
    const svg = this.svgFactory.create(width, height, true***REMOVED***;
    const g = this.#polylinesGroupElement = this.svgFactory.createElement("svg:g"***REMOVED***;
    svg.append(g***REMOVED***;
    g.setAttribute("stroke-width", borderStyle.width || 1***REMOVED***;
    g.setAttribute("stroke-linecap", "round"***REMOVED***;
    g.setAttribute("stroke-linejoin", "round"***REMOVED***;
    g.setAttribute("stroke-miterlimit", 10***REMOVED***;
    g.setAttribute("stroke", "transparent"***REMOVED***;
    g.setAttribute("fill", "transparent"***REMOVED***;
    g.setAttribute("transform", transform***REMOVED***;
    for (let i = 0, ii = inkLists.length; i < ii; i++***REMOVED*** {
      const polyline = this.svgFactory.createElement(this.svgElementName***REMOVED***;
      this.#polylines.push(polyline***REMOVED***;
      polyline.setAttribute("points", inkLists[i].join(","***REMOVED******REMOVED***;
      g.append(polyline***REMOVED***;
    ***REMOVED***
    if (!popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.append(svg***REMOVED***;
    this._editOnDoubleClick(***REMOVED***;
    return this.container;
  ***REMOVED***
  updateEdited(params***REMOVED*** {
    super.updateEdited(params***REMOVED***;
    const {
      thickness,
      points,
      rect
    ***REMOVED*** = params;
    const g = this.#polylinesGroupElement;
    if (thickness >= 0***REMOVED*** {
      g.setAttribute("stroke-width", thickness || 1***REMOVED***;
    ***REMOVED***
    if (points***REMOVED*** {
      for (let i = 0, ii = this.#polylines.length; i < ii; i++***REMOVED*** {
        this.#polylines[i].setAttribute("points", points[i].join(","***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (rect***REMOVED*** {
      const {
        transform,
        width,
        height
      ***REMOVED*** = this.#getTransform(this.data.rotation, rect***REMOVED***;
      const root = g.parentElement;
      root.setAttribute("viewBox", `0 0 ${width***REMOVED*** ${height***REMOVED***`***REMOVED***;
      g.setAttribute("transform", transform***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#polylines;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
***REMOVED***
class HighlightAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    ***REMOVED******REMOVED***;
    this.annotationEditorType = AnnotationEditorType.HIGHLIGHT;
  ***REMOVED***
  render(***REMOVED*** {
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.classList.add("highlightAnnotation"***REMOVED***;
    this._editOnDoubleClick(***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class UnderlineAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.classList.add("underlineAnnotation"***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class SquigglyAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.classList.add("squigglyAnnotation"***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class StrikeOutAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true,
      createQuadrilaterals: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this.container.classList.add("strikeoutAnnotation"***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class StampAnnotationElement extends AnnotationElement {
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true,
      ignoreBorder: true
    ***REMOVED******REMOVED***;
    this.annotationEditorType = AnnotationEditorType.STAMP;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("stampAnnotation"***REMOVED***;
    this.container.setAttribute("role", "img"***REMOVED***;
    if (!this.data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED***
    this._editOnDoubleClick(***REMOVED***;
    return this.container;
  ***REMOVED***
***REMOVED***
class FileAttachmentAnnotationElement extends AnnotationElement {
  #trigger = null;
  constructor(parameters***REMOVED*** {
    super(parameters, {
      isRenderable: true
    ***REMOVED******REMOVED***;
    const {
      file
    ***REMOVED*** = this.data;
    this.filename = file.filename;
    this.content = file.content;
    this.linkService.eventBus?.dispatch("fileattachmentannotation", {
      source: this,
      ...file
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    this.container.classList.add("fileAttachmentAnnotation"***REMOVED***;
    const {
      container,
      data
    ***REMOVED*** = this;
    let trigger;
    if (data.hasAppearance || data.fillAlpha === 0***REMOVED*** {
      trigger = document.createElement("div"***REMOVED***;
    ***REMOVED*** else {
      trigger = document.createElement("img"***REMOVED***;
      trigger.src = `${this.imageResourcesPath***REMOVED***annotation-${/paperclip/i.test(data.name***REMOVED*** ? "paperclip" : "pushpin"***REMOVED***.svg`;
      if (data.fillAlpha && data.fillAlpha < 1***REMOVED*** {
        trigger.style = `filter: opacity(${Math.round(data.fillAlpha * 100***REMOVED******REMOVED***%***REMOVED***;`;
      ***REMOVED***
    ***REMOVED***
    trigger.addEventListener("dblclick", this.#download.bind(this***REMOVED******REMOVED***;
    this.#trigger = trigger;
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    container.addEventListener("keydown", evt => {
      if (evt.key === "Enter" && (isMac ? evt.metaKey : evt.ctrlKey***REMOVED******REMOVED*** {
        this.#download(***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
    if (!data.popupRef && this.hasPopupData***REMOVED*** {
      this._createPopup(***REMOVED***;
    ***REMOVED*** else {
      trigger.classList.add("popupTriggerArea"***REMOVED***;
    ***REMOVED***
    container.append(trigger***REMOVED***;
    return container;
  ***REMOVED***
  getElementsToTriggerPopup(***REMOVED*** {
    return this.#trigger;
  ***REMOVED***
  addHighlightArea(***REMOVED*** {
    this.container.classList.add("highlightArea"***REMOVED***;
  ***REMOVED***
  #download(***REMOVED*** {
    this.downloadManager?.openOrDownloadData(this.content, this.filename***REMOVED***;
  ***REMOVED***
***REMOVED***
class AnnotationLayer {
  #accessibilityManager = null;
  #annotationCanvasMap = null;
  #editableAnnotations = new Map(***REMOVED***;
  #structTreeLayer = null;
  constructor({
    div,
    accessibilityManager,
    annotationCanvasMap,
    annotationEditorUIManager,
    page,
    viewport,
    structTreeLayer
  ***REMOVED******REMOVED*** {
    this.div = div;
    this.#accessibilityManager = accessibilityManager;
    this.#annotationCanvasMap = annotationCanvasMap;
    this.#structTreeLayer = structTreeLayer || null;
    this.page = page;
    this.viewport = viewport;
    this.zIndex = 0;
    this._annotationEditorUIManager = annotationEditorUIManager;
  ***REMOVED***
  hasEditableAnnotations(***REMOVED*** {
    return this.#editableAnnotations.size > 0;
  ***REMOVED***
  async #appendElement(element, id***REMOVED*** {
    const contentElement = element.firstChild || element;
    const annotationId = contentElement.id = `${AnnotationPrefix***REMOVED***${id***REMOVED***`;
    const ariaAttributes = await this.#structTreeLayer?.getAriaAttributes(annotationId***REMOVED***;
    if (ariaAttributes***REMOVED*** {
      for (const [key, value] of ariaAttributes***REMOVED*** {
        contentElement.setAttribute(key, value***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.div.append(element***REMOVED***;
    this.#accessibilityManager?.moveElementInDOM(this.div, element, contentElement, false***REMOVED***;
  ***REMOVED***
  async render(params***REMOVED*** {
    const {
      annotations
    ***REMOVED*** = params;
    const layer = this.div;
    setLayerDimensions(layer, this.viewport***REMOVED***;
    const popupToElements = new Map(***REMOVED***;
    const elementParams = {
      data: null,
      layer,
      linkService: params.linkService,
      downloadManager: params.downloadManager,
      imageResourcesPath: params.imageResourcesPath || "",
      renderForms: params.renderForms !== false,
      svgFactory: new DOMSVGFactory(***REMOVED***,
      annotationStorage: params.annotationStorage || new AnnotationStorage(***REMOVED***,
      enableScripting: params.enableScripting === true,
      hasJSActions: params.hasJSActions,
      fieldObjects: params.fieldObjects,
      parent: this,
      elements: null
    ***REMOVED***;
    for (const data of annotations***REMOVED*** {
      if (data.noHTML***REMOVED*** {
        continue;
      ***REMOVED***
      const isPopupAnnotation = data.annotationType === AnnotationType.POPUP;
      if (!isPopupAnnotation***REMOVED*** {
        const {
          width,
          height
        ***REMOVED*** = getRectDims(data.rect***REMOVED***;
        if (width <= 0 || height <= 0***REMOVED*** {
          continue;
        ***REMOVED***
      ***REMOVED*** else {
        const elements = popupToElements.get(data.id***REMOVED***;
        if (!elements***REMOVED*** {
          continue;
        ***REMOVED***
        elementParams.elements = elements;
      ***REMOVED***
      elementParams.data = data;
      const element = AnnotationElementFactory.create(elementParams***REMOVED***;
      if (!element.isRenderable***REMOVED*** {
        continue;
      ***REMOVED***
      if (!isPopupAnnotation && data.popupRef***REMOVED*** {
        const elements = popupToElements.get(data.popupRef***REMOVED***;
        if (!elements***REMOVED*** {
          popupToElements.set(data.popupRef, [element]***REMOVED***;
        ***REMOVED*** else {
          elements.push(element***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      const rendered = element.render(***REMOVED***;
      if (data.hidden***REMOVED*** {
        rendered.style.visibility = "hidden";
      ***REMOVED***
      await this.#appendElement(rendered, data.id***REMOVED***;
      if (element._isEditable***REMOVED*** {
        this.#editableAnnotations.set(element.data.id, element***REMOVED***;
        this._annotationEditorUIManager?.renderAnnotationElement(element***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#setAnnotationCanvasMap(***REMOVED***;
  ***REMOVED***
  update({
    viewport
  ***REMOVED******REMOVED*** {
    const layer = this.div;
    this.viewport = viewport;
    setLayerDimensions(layer, {
      rotation: viewport.rotation
    ***REMOVED******REMOVED***;
    this.#setAnnotationCanvasMap(***REMOVED***;
    layer.hidden = false;
  ***REMOVED***
  #setAnnotationCanvasMap(***REMOVED*** {
    if (!this.#annotationCanvasMap***REMOVED*** {
      return;
    ***REMOVED***
    const layer = this.div;
    for (const [id, canvas] of this.#annotationCanvasMap***REMOVED*** {
      const element = layer.querySelector(`[data-annotation-id="${id***REMOVED***"]`***REMOVED***;
      if (!element***REMOVED*** {
        continue;
      ***REMOVED***
      canvas.className = "annotationContent";
      const {
        firstChild
      ***REMOVED*** = element;
      if (!firstChild***REMOVED*** {
        element.append(canvas***REMOVED***;
      ***REMOVED*** else if (firstChild.nodeName === "CANVAS"***REMOVED*** {
        firstChild.replaceWith(canvas***REMOVED***;
      ***REMOVED*** else if (!firstChild.classList.contains("annotationContent"***REMOVED******REMOVED*** {
        firstChild.before(canvas***REMOVED***;
      ***REMOVED*** else {
        firstChild.after(canvas***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#annotationCanvasMap.clear(***REMOVED***;
  ***REMOVED***
  getEditableAnnotations(***REMOVED*** {
    return Array.from(this.#editableAnnotations.values(***REMOVED******REMOVED***;
  ***REMOVED***
  getEditableAnnotation(id***REMOVED*** {
    return this.#editableAnnotations.get(id***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/freetext.js




const EOL_PATTERN = /\r\n?|\n/g;
class FreeTextEditor extends AnnotationEditor {
  #color;
  #content = "";
  #editorDivId = `${this.id***REMOVED***-editor`;
  #editModeAC = null;
  #fontSize;
  static _freeTextDefaultContent = "";
  static _internalPadding = 0;
  static _defaultColor = null;
  static _defaultFontSize = 10;
  static get _keyboardManager(***REMOVED*** {
    const proto = FreeTextEditor.prototype;
    const arrowChecker = self => self.isEmpty(***REMOVED***;
    const small = AnnotationEditorUIManager.TRANSLATE_SMALL;
    const big = AnnotationEditorUIManager.TRANSLATE_BIG;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], proto.commitOrRemove, {
      bubbles: true
    ***REMOVED***], [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], proto.commitOrRemove], [["ArrowLeft", "mac+ArrowLeft"], proto._translateEmpty, {
      args: [-small, 0],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], proto._translateEmpty, {
      args: [-big, 0],
      checker: arrowChecker
    ***REMOVED***], [["ArrowRight", "mac+ArrowRight"], proto._translateEmpty, {
      args: [small, 0],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], proto._translateEmpty, {
      args: [big, 0],
      checker: arrowChecker
    ***REMOVED***], [["ArrowUp", "mac+ArrowUp"], proto._translateEmpty, {
      args: [0, -small],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], proto._translateEmpty, {
      args: [0, -big],
      checker: arrowChecker
    ***REMOVED***], [["ArrowDown", "mac+ArrowDown"], proto._translateEmpty, {
      args: [0, small],
      checker: arrowChecker
    ***REMOVED***], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], proto._translateEmpty, {
      args: [0, big],
      checker: arrowChecker
    ***REMOVED***]]***REMOVED******REMOVED***;
  ***REMOVED***
  static _type = "freetext";
  static _editorType = AnnotationEditorType.FREETEXT;
  constructor(params***REMOVED*** {
    super({
      ...params,
      name: "freeTextEditor"
    ***REMOVED******REMOVED***;
    this.#color = params.color || FreeTextEditor._defaultColor || AnnotationEditor._defaultLineColor;
    this.#fontSize = params.fontSize || FreeTextEditor._defaultFontSize;
  ***REMOVED***
  static initialize(l10n, uiManager***REMOVED*** {
    AnnotationEditor.initialize(l10n, uiManager***REMOVED***;
    const style = getComputedStyle(document.documentElement***REMOVED***;
    this._internalPadding = parseFloat(style.getPropertyValue("--freetext-padding"***REMOVED******REMOVED***;
  ***REMOVED***
  static updateDefaultParams(type, value***REMOVED*** {
    switch (type***REMOVED*** {
      case AnnotationEditorParamsType.FREETEXT_SIZE:
        FreeTextEditor._defaultFontSize = value;
        break;
      case AnnotationEditorParamsType.FREETEXT_COLOR:
        FreeTextEditor._defaultColor = value;
        break;
    ***REMOVED***
  ***REMOVED***
  updateParams(type, value***REMOVED*** {
    switch (type***REMOVED*** {
      case AnnotationEditorParamsType.FREETEXT_SIZE:
        this.#updateFontSize(value***REMOVED***;
        break;
      case AnnotationEditorParamsType.FREETEXT_COLOR:
        this.#updateColor(value***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  static get defaultPropertiesToUpdate(***REMOVED*** {
    return [[AnnotationEditorParamsType.FREETEXT_SIZE, FreeTextEditor._defaultFontSize], [AnnotationEditorParamsType.FREETEXT_COLOR, FreeTextEditor._defaultColor || AnnotationEditor._defaultLineColor]];
  ***REMOVED***
  get propertiesToUpdate(***REMOVED*** {
    return [[AnnotationEditorParamsType.FREETEXT_SIZE, this.#fontSize], [AnnotationEditorParamsType.FREETEXT_COLOR, this.#color]];
  ***REMOVED***
  #updateFontSize(fontSize***REMOVED*** {
    const setFontsize = size => {
      this.editorDiv.style.fontSize = `calc(${size***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
      this.translate(0, -(size - this.#fontSize***REMOVED*** * this.parentScale***REMOVED***;
      this.#fontSize = size;
      this.#setEditorDimensions(***REMOVED***;
    ***REMOVED***;
    const savedFontsize = this.#fontSize;
    this.addCommands({
      cmd: setFontsize.bind(this, fontSize***REMOVED***,
      undo: setFontsize.bind(this, savedFontsize***REMOVED***,
      post: this._uiManager.updateUI.bind(this._uiManager, this***REMOVED***,
      mustExec: true,
      type: AnnotationEditorParamsType.FREETEXT_SIZE,
      overwriteIfSameType: true,
      keepUndo: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  #updateColor(color***REMOVED*** {
    const setColor = col => {
      this.#color = this.editorDiv.style.color = col;
    ***REMOVED***;
    const savedColor = this.#color;
    this.addCommands({
      cmd: setColor.bind(this, color***REMOVED***,
      undo: setColor.bind(this, savedColor***REMOVED***,
      post: this._uiManager.updateUI.bind(this._uiManager, this***REMOVED***,
      mustExec: true,
      type: AnnotationEditorParamsType.FREETEXT_COLOR,
      overwriteIfSameType: true,
      keepUndo: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _translateEmpty(x, y***REMOVED*** {
    this._uiManager.translateSelectedEditors(x, y, true***REMOVED***;
  ***REMOVED***
  getInitialTranslation(***REMOVED*** {
    const scale = this.parentScale;
    return [-FreeTextEditor._internalPadding * scale, -(FreeTextEditor._internalPadding + this.#fontSize***REMOVED*** * scale];
  ***REMOVED***
  rebuild(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    super.rebuild(***REMOVED***;
    if (this.div === null***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.isAttachedToDOM***REMOVED*** {
      this.parent.add(this***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  enableEditMode(***REMOVED*** {
    if (this.isInEditMode(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this.parent.setEditingState(false***REMOVED***;
    this.parent.updateToolbar(AnnotationEditorType.FREETEXT***REMOVED***;
    super.enableEditMode(***REMOVED***;
    this.overlayDiv.classList.remove("enabled"***REMOVED***;
    this.editorDiv.contentEditable = true;
    this._isDraggable = false;
    this.div.removeAttribute("aria-activedescendant"***REMOVED***;
    this.#editModeAC = new AbortController(***REMOVED***;
    const signal = this._uiManager.combinedSignal(this.#editModeAC***REMOVED***;
    this.editorDiv.addEventListener("keydown", this.editorDivKeydown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.editorDiv.addEventListener("focus", this.editorDivFocus.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.editorDiv.addEventListener("blur", this.editorDivBlur.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.editorDiv.addEventListener("input", this.editorDivInput.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.editorDiv.addEventListener("paste", this.editorDivPaste.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  disableEditMode(***REMOVED*** {
    if (!this.isInEditMode(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this.parent.setEditingState(true***REMOVED***;
    super.disableEditMode(***REMOVED***;
    this.overlayDiv.classList.add("enabled"***REMOVED***;
    this.editorDiv.contentEditable = false;
    this.div.setAttribute("aria-activedescendant", this.#editorDivId***REMOVED***;
    this._isDraggable = true;
    this.#editModeAC?.abort(***REMOVED***;
    this.#editModeAC = null;
    this.div.focus({
      preventScroll: true
    ***REMOVED******REMOVED***;
    this.isEditing = false;
    this.parent.div.classList.add("freetextEditing"***REMOVED***;
  ***REMOVED***
  focusin(event***REMOVED*** {
    if (!this._focusEventsAllowed***REMOVED*** {
      return;
    ***REMOVED***
    super.focusin(event***REMOVED***;
    if (event.target !== this.editorDiv***REMOVED*** {
      this.editorDiv.focus(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  onceAdded(focus***REMOVED*** {
    if (this.width***REMOVED*** {
      return;
    ***REMOVED***
    this.enableEditMode(***REMOVED***;
    if (focus***REMOVED*** {
      this.editorDiv.focus(***REMOVED***;
    ***REMOVED***
    if (this._initialOptions?.isCentered***REMOVED*** {
      this.center(***REMOVED***;
    ***REMOVED***
    this._initialOptions = null;
  ***REMOVED***
  isEmpty(***REMOVED*** {
    return !this.editorDiv || this.editorDiv.innerText.trim(***REMOVED*** === "";
  ***REMOVED***
  remove(***REMOVED*** {
    this.isEditing = false;
    if (this.parent***REMOVED*** {
      this.parent.setEditingState(true***REMOVED***;
      this.parent.div.classList.add("freetextEditing"***REMOVED***;
    ***REMOVED***
    super.remove(***REMOVED***;
  ***REMOVED***
  #extractText(***REMOVED*** {
    const buffer = [];
    this.editorDiv.normalize(***REMOVED***;
    let prevChild = null;
    for (const child of this.editorDiv.childNodes***REMOVED*** {
      if (prevChild?.nodeType === Node.TEXT_NODE && child.nodeName === "BR"***REMOVED*** {
        continue;
      ***REMOVED***
      buffer.push(FreeTextEditor.#getNodeContent(child***REMOVED******REMOVED***;
      prevChild = child;
    ***REMOVED***
    return buffer.join("\n"***REMOVED***;
  ***REMOVED***
  #setEditorDimensions(***REMOVED*** {
    const [parentWidth, parentHeight] = this.parentDimensions;
    let rect;
    if (this.isAttachedToDOM***REMOVED*** {
      rect = this.div.getBoundingClientRect(***REMOVED***;
    ***REMOVED*** else {
      const {
        currentLayer,
        div
      ***REMOVED*** = this;
      const savedDisplay = div.style.display;
      const savedVisibility = div.classList.contains("hidden"***REMOVED***;
      div.classList.remove("hidden"***REMOVED***;
      div.style.display = "hidden";
      currentLayer.div.append(this.div***REMOVED***;
      rect = div.getBoundingClientRect(***REMOVED***;
      div.remove(***REMOVED***;
      div.style.display = savedDisplay;
      div.classList.toggle("hidden", savedVisibility***REMOVED***;
    ***REMOVED***
    if (this.rotation % 180 === this.parentRotation % 180***REMOVED*** {
      this.width = rect.width / parentWidth;
      this.height = rect.height / parentHeight;
    ***REMOVED*** else {
      this.width = rect.height / parentWidth;
      this.height = rect.width / parentHeight;
    ***REMOVED***
    this.fixAndSetPosition(***REMOVED***;
  ***REMOVED***
  commit(***REMOVED*** {
    if (!this.isInEditMode(***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    super.commit(***REMOVED***;
    this.disableEditMode(***REMOVED***;
    const savedText = this.#content;
    const newText = this.#content = this.#extractText(***REMOVED***.trimEnd(***REMOVED***;
    if (savedText === newText***REMOVED*** {
      return;
    ***REMOVED***
    const setText = text => {
      this.#content = text;
      if (!text***REMOVED*** {
        this.remove(***REMOVED***;
        return;
      ***REMOVED***
      this.#setContent(***REMOVED***;
      this._uiManager.rebuild(this***REMOVED***;
      this.#setEditorDimensions(***REMOVED***;
    ***REMOVED***;
    this.addCommands({
      cmd: (***REMOVED*** => {
        setText(newText***REMOVED***;
      ***REMOVED***,
      undo: (***REMOVED*** => {
        setText(savedText***REMOVED***;
      ***REMOVED***,
      mustExec: false
    ***REMOVED******REMOVED***;
    this.#setEditorDimensions(***REMOVED***;
  ***REMOVED***
  shouldGetKeyboardEvents(***REMOVED*** {
    return this.isInEditMode(***REMOVED***;
  ***REMOVED***
  enterInEditMode(***REMOVED*** {
    this.enableEditMode(***REMOVED***;
    this.editorDiv.focus(***REMOVED***;
  ***REMOVED***
  dblclick(event***REMOVED*** {
    this.enterInEditMode(***REMOVED***;
  ***REMOVED***
  keydown(event***REMOVED*** {
    if (event.target === this.div && event.key === "Enter"***REMOVED*** {
      this.enterInEditMode(***REMOVED***;
      event.preventDefault(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  editorDivKeydown(event***REMOVED*** {
    FreeTextEditor._keyboardManager.exec(this, event***REMOVED***;
  ***REMOVED***
  editorDivFocus(event***REMOVED*** {
    this.isEditing = true;
  ***REMOVED***
  editorDivBlur(event***REMOVED*** {
    this.isEditing = false;
  ***REMOVED***
  editorDivInput(event***REMOVED*** {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty(***REMOVED******REMOVED***;
  ***REMOVED***
  disableEditing(***REMOVED*** {
    this.editorDiv.setAttribute("role", "comment"***REMOVED***;
    this.editorDiv.removeAttribute("aria-multiline"***REMOVED***;
  ***REMOVED***
  enableEditing(***REMOVED*** {
    this.editorDiv.setAttribute("role", "textbox"***REMOVED***;
    this.editorDiv.setAttribute("aria-multiline", true***REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    if (this.div***REMOVED*** {
      return this.div;
    ***REMOVED***
    let baseX, baseY;
    if (this.width***REMOVED*** {
      baseX = this.x;
      baseY = this.y;
    ***REMOVED***
    super.render(***REMOVED***;
    this.editorDiv = document.createElement("div"***REMOVED***;
    this.editorDiv.className = "internal";
    this.editorDiv.setAttribute("id", this.#editorDivId***REMOVED***;
    this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text2"***REMOVED***;
    this.editorDiv.setAttribute("data-l10n-attrs", "default-content"***REMOVED***;
    this.enableEditing(***REMOVED***;
    this.editorDiv.contentEditable = true;
    const {
      style
    ***REMOVED*** = this.editorDiv;
    style.fontSize = `calc(${this.#fontSize***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
    style.color = this.#color;
    this.div.append(this.editorDiv***REMOVED***;
    this.overlayDiv = document.createElement("div"***REMOVED***;
    this.overlayDiv.classList.add("overlay", "enabled"***REMOVED***;
    this.div.append(this.overlayDiv***REMOVED***;
    bindEvents(this, this.div, ["dblclick", "keydown"]***REMOVED***;
    if (this.width***REMOVED*** {
      const [parentWidth, parentHeight] = this.parentDimensions;
      if (this.annotationElementId***REMOVED*** {
        const {
          position
        ***REMOVED*** = this._initialData;
        let [tx, ty] = this.getInitialTranslation(***REMOVED***;
        [tx, ty] = this.pageTranslationToScreen(tx, ty***REMOVED***;
        const [pageWidth, pageHeight] = this.pageDimensions;
        const [pageX, pageY] = this.pageTranslation;
        let posX, posY;
        switch (this.rotation***REMOVED*** {
          case 0:
            posX = baseX + (position[0] - pageX***REMOVED*** / pageWidth;
            posY = baseY + this.height - (position[1] - pageY***REMOVED*** / pageHeight;
            break;
          case 90:
            posX = baseX + (position[0] - pageX***REMOVED*** / pageWidth;
            posY = baseY - (position[1] - pageY***REMOVED*** / pageHeight;
            [tx, ty] = [ty, -tx];
            break;
          case 180:
            posX = baseX - this.width + (position[0] - pageX***REMOVED*** / pageWidth;
            posY = baseY - (position[1] - pageY***REMOVED*** / pageHeight;
            [tx, ty] = [-tx, -ty];
            break;
          case 270:
            posX = baseX + (position[0] - pageX - this.height * pageHeight***REMOVED*** / pageWidth;
            posY = baseY + (position[1] - pageY - this.width * pageWidth***REMOVED*** / pageHeight;
            [tx, ty] = [-ty, tx];
            break;
        ***REMOVED***
        this.setAt(posX * parentWidth, posY * parentHeight, tx, ty***REMOVED***;
      ***REMOVED*** else {
        this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight***REMOVED***;
      ***REMOVED***
      this.#setContent(***REMOVED***;
      this._isDraggable = true;
      this.editorDiv.contentEditable = false;
    ***REMOVED*** else {
      this._isDraggable = false;
      this.editorDiv.contentEditable = true;
    ***REMOVED***
    return this.div;
  ***REMOVED***
  static #getNodeContent(node***REMOVED*** {
    return (node.nodeType === Node.TEXT_NODE ? node.nodeValue : node.innerText***REMOVED***.replaceAll(EOL_PATTERN, ""***REMOVED***;
  ***REMOVED***
  editorDivPaste(event***REMOVED*** {
    const clipboardData = event.clipboardData || window.clipboardData;
    const {
      types
    ***REMOVED*** = clipboardData;
    if (types.length === 1 && types[0] === "text/plain"***REMOVED*** {
      return;
    ***REMOVED***
    event.preventDefault(***REMOVED***;
    const paste = FreeTextEditor.#deserializeContent(clipboardData.getData("text"***REMOVED*** || ""***REMOVED***.replaceAll(EOL_PATTERN, "\n"***REMOVED***;
    if (!paste***REMOVED*** {
      return;
    ***REMOVED***
    const selection = window.getSelection(***REMOVED***;
    if (!selection.rangeCount***REMOVED*** {
      return;
    ***REMOVED***
    this.editorDiv.normalize(***REMOVED***;
    selection.deleteFromDocument(***REMOVED***;
    const range = selection.getRangeAt(0***REMOVED***;
    if (!paste.includes("\n"***REMOVED******REMOVED*** {
      range.insertNode(document.createTextNode(paste***REMOVED******REMOVED***;
      this.editorDiv.normalize(***REMOVED***;
      selection.collapseToStart(***REMOVED***;
      return;
    ***REMOVED***
    const {
      startContainer,
      startOffset
    ***REMOVED*** = range;
    const bufferBefore = [];
    const bufferAfter = [];
    if (startContainer.nodeType === Node.TEXT_NODE***REMOVED*** {
      const parent = startContainer.parentElement;
      bufferAfter.push(startContainer.nodeValue.slice(startOffset***REMOVED***.replaceAll(EOL_PATTERN, ""***REMOVED******REMOVED***;
      if (parent !== this.editorDiv***REMOVED*** {
        let buffer = bufferBefore;
        for (const child of this.editorDiv.childNodes***REMOVED*** {
          if (child === parent***REMOVED*** {
            buffer = bufferAfter;
            continue;
          ***REMOVED***
          buffer.push(FreeTextEditor.#getNodeContent(child***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
      bufferBefore.push(startContainer.nodeValue.slice(0, startOffset***REMOVED***.replaceAll(EOL_PATTERN, ""***REMOVED******REMOVED***;
    ***REMOVED*** else if (startContainer === this.editorDiv***REMOVED*** {
      let buffer = bufferBefore;
      let i = 0;
      for (const child of this.editorDiv.childNodes***REMOVED*** {
        if (i++ === startOffset***REMOVED*** {
          buffer = bufferAfter;
        ***REMOVED***
        buffer.push(FreeTextEditor.#getNodeContent(child***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#content = `${bufferBefore.join("\n"***REMOVED******REMOVED***${paste***REMOVED***${bufferAfter.join("\n"***REMOVED******REMOVED***`;
    this.#setContent(***REMOVED***;
    const newRange = new Range(***REMOVED***;
    let beforeLength = bufferBefore.reduce((acc, line***REMOVED*** => acc + line.length, 0***REMOVED***;
    for (const {
      firstChild
    ***REMOVED*** of this.editorDiv.childNodes***REMOVED*** {
      if (firstChild.nodeType === Node.TEXT_NODE***REMOVED*** {
        const length = firstChild.nodeValue.length;
        if (beforeLength <= length***REMOVED*** {
          newRange.setStart(firstChild, beforeLength***REMOVED***;
          newRange.setEnd(firstChild, beforeLength***REMOVED***;
          break;
        ***REMOVED***
        beforeLength -= length;
      ***REMOVED***
    ***REMOVED***
    selection.removeAllRanges(***REMOVED***;
    selection.addRange(newRange***REMOVED***;
  ***REMOVED***
  #setContent(***REMOVED*** {
    this.editorDiv.replaceChildren(***REMOVED***;
    if (!this.#content***REMOVED*** {
      return;
    ***REMOVED***
    for (const line of this.#content.split("\n"***REMOVED******REMOVED*** {
      const div = document.createElement("div"***REMOVED***;
      div.append(line ? document.createTextNode(line***REMOVED*** : document.createElement("br"***REMOVED******REMOVED***;
      this.editorDiv.append(div***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #serializeContent(***REMOVED*** {
    return this.#content.replaceAll("\xa0", " "***REMOVED***;
  ***REMOVED***
  static #deserializeContent(content***REMOVED*** {
    return content.replaceAll(" ", "\xa0"***REMOVED***;
  ***REMOVED***
  get contentDiv(***REMOVED*** {
    return this.editorDiv;
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    let initialData = null;
    if (data instanceof FreeTextAnnotationElement***REMOVED*** {
      const {
        data: {
          defaultAppearanceData: {
            fontSize,
            fontColor
          ***REMOVED***,
          rect,
          rotation,
          id,
          popupRef
        ***REMOVED***,
        textContent,
        textPosition,
        parent: {
          page: {
            pageNumber
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** = data;
      if (!textContent || textContent.length === 0***REMOVED*** {
        return null;
      ***REMOVED***
      initialData = data = {
        annotationType: AnnotationEditorType.FREETEXT,
        color: Array.from(fontColor***REMOVED***,
        fontSize,
        value: textContent.join("\n"***REMOVED***,
        position: textPosition,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0***REMOVED***,
        rotation,
        id,
        deleted: false,
        popupRef
      ***REMOVED***;
    ***REMOVED***
    const editor = await super.deserialize(data, parent, uiManager***REMOVED***;
    editor.#fontSize = data.fontSize;
    editor.#color = Util.makeHexColor(...data.color***REMOVED***;
    editor.#content = FreeTextEditor.#deserializeContent(data.value***REMOVED***;
    editor.annotationElementId = data.id || null;
    editor._initialData = initialData;
    return editor;
  ***REMOVED***
  serialize(isForCopying = false***REMOVED*** {
    if (this.isEmpty(***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    if (this.deleted***REMOVED*** {
      return this.serializeDeleted(***REMOVED***;
    ***REMOVED***
    const padding = FreeTextEditor._internalPadding * this.parentScale;
    const rect = this.getRect(padding, padding***REMOVED***;
    const color = AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv***REMOVED***.color : this.#color***REMOVED***;
    const serialized = {
      annotationType: AnnotationEditorType.FREETEXT,
      color,
      fontSize: this.#fontSize,
      value: this.#serializeContent(***REMOVED***,
      pageIndex: this.pageIndex,
      rect,
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId
    ***REMOVED***;
    if (isForCopying***REMOVED*** {
      return serialized;
    ***REMOVED***
    if (this.annotationElementId && !this.#hasElementChanged(serialized***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    serialized.id = this.annotationElementId;
    return serialized;
  ***REMOVED***
  #hasElementChanged(serialized***REMOVED*** {
    const {
      value,
      fontSize,
      color,
      pageIndex
    ***REMOVED*** = this._initialData;
    return this._hasBeenMoved || serialized.value !== value || serialized.fontSize !== fontSize || serialized.color.some((c, i***REMOVED*** => c !== color[i]***REMOVED*** || serialized.pageIndex !== pageIndex;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    const content = super.renderAnnotationElement(annotation***REMOVED***;
    if (this.deleted***REMOVED*** {
      return content;
    ***REMOVED***
    const {
      style
    ***REMOVED*** = content;
    style.fontSize = `calc(${this.#fontSize***REMOVED***px * var(--scale-factor***REMOVED******REMOVED***`;
    style.color = this.#color;
    content.replaceChildren(***REMOVED***;
    for (const line of this.#content.split("\n"***REMOVED******REMOVED*** {
      const div = document.createElement("div"***REMOVED***;
      div.append(line ? document.createTextNode(line***REMOVED*** : document.createElement("br"***REMOVED******REMOVED***;
      content.append(div***REMOVED***;
    ***REMOVED***
    const padding = FreeTextEditor._internalPadding * this.parentScale;
    annotation.updateEdited({
      rect: this.getRect(padding, padding***REMOVED***,
      popupContent: this.#content
    ***REMOVED******REMOVED***;
    return content;
  ***REMOVED***
  resetAnnotationElement(annotation***REMOVED*** {
    super.resetAnnotationElement(annotation***REMOVED***;
    annotation.resetEdited(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/drawers/outline.js

class Outline {
  static PRECISION = 1e-4;
  toSVGPath(***REMOVED*** {
    unreachable("Abstract method `toSVGPath` must be implemented."***REMOVED***;
  ***REMOVED***
  get box(***REMOVED*** {
    unreachable("Abstract getter `box` must be implemented."***REMOVED***;
  ***REMOVED***
  serialize(_bbox, _rotation***REMOVED*** {
    unreachable("Abstract method `serialize` must be implemented."***REMOVED***;
  ***REMOVED***
  static _rescale(src, tx, ty, sx, sy, dest***REMOVED*** {
    dest ||= new Float32Array(src.length***REMOVED***;
    for (let i = 0, ii = src.length; i < ii; i += 2***REMOVED*** {
      dest[i] = tx + src[i] * sx;
      dest[i + 1] = ty + src[i + 1] * sy;
    ***REMOVED***
    return dest;
  ***REMOVED***
  static _rescaleAndSwap(src, tx, ty, sx, sy, dest***REMOVED*** {
    dest ||= new Float32Array(src.length***REMOVED***;
    for (let i = 0, ii = src.length; i < ii; i += 2***REMOVED*** {
      dest[i] = tx + src[i + 1] * sx;
      dest[i + 1] = ty + src[i] * sy;
    ***REMOVED***
    return dest;
  ***REMOVED***
  static _translate(src, tx, ty, dest***REMOVED*** {
    dest ||= new Float32Array(src.length***REMOVED***;
    for (let i = 0, ii = src.length; i < ii; i += 2***REMOVED*** {
      dest[i] = tx + src[i];
      dest[i + 1] = ty + src[i + 1];
    ***REMOVED***
    return dest;
  ***REMOVED***
  static svgRound(x***REMOVED*** {
    return Math.round(x * 10000***REMOVED***;
  ***REMOVED***
  static _normalizePoint(x, y, parentWidth, parentHeight, rotation***REMOVED*** {
    switch (rotation***REMOVED*** {
      case 90:
        return [1 - y / parentWidth, x / parentHeight];
      case 180:
        return [1 - x / parentWidth, 1 - y / parentHeight];
      case 270:
        return [y / parentWidth, 1 - x / parentHeight];
      default:
        return [x / parentWidth, y / parentHeight];
    ***REMOVED***
  ***REMOVED***
  static _normalizePagePoint(x, y, rotation***REMOVED*** {
    switch (rotation***REMOVED*** {
      case 90:
        return [1 - y, x];
      case 180:
        return [1 - x, 1 - y];
      case 270:
        return [y, 1 - x];
      default:
        return [x, y];
    ***REMOVED***
  ***REMOVED***
  static createBezierPoints(x1, y1, x2, y2, x3, y3***REMOVED*** {
    return [(x1 + 5 * x2***REMOVED*** / 6, (y1 + 5 * y2***REMOVED*** / 6, (5 * x2 + x3***REMOVED*** / 6, (5 * y2 + y3***REMOVED*** / 6, (x2 + x3***REMOVED*** / 2, (y2 + y3***REMOVED*** / 2];
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/drawers/freedraw.js


class FreeDrawOutliner {
  #box;
  #bottom = [];
  #innerMargin;
  #isLTR;
  #top = [];
  #last = new Float32Array(18***REMOVED***;
  #lastX;
  #lastY;
  #min;
  #min_dist;
  #scaleFactor;
  #thickness;
  #points = [];
  static #MIN_DIST = 8;
  static #MIN_DIFF = 2;
  static #MIN = FreeDrawOutliner.#MIN_DIST + FreeDrawOutliner.#MIN_DIFF;
  constructor({
    x,
    y
  ***REMOVED***, box, scaleFactor, thickness, isLTR, innerMargin = 0***REMOVED*** {
    this.#box = box;
    this.#thickness = thickness * scaleFactor;
    this.#isLTR = isLTR;
    this.#last.set([NaN, NaN, NaN, NaN, x, y], 6***REMOVED***;
    this.#innerMargin = innerMargin;
    this.#min_dist = FreeDrawOutliner.#MIN_DIST * scaleFactor;
    this.#min = FreeDrawOutliner.#MIN * scaleFactor;
    this.#scaleFactor = scaleFactor;
    this.#points.push(x, y***REMOVED***;
  ***REMOVED***
  isEmpty(***REMOVED*** {
    return isNaN(this.#last[8]***REMOVED***;
  ***REMOVED***
  #getLastCoords(***REMOVED*** {
    const lastTop = this.#last.subarray(4, 6***REMOVED***;
    const lastBottom = this.#last.subarray(16, 18***REMOVED***;
    const [x, y, width, height] = this.#box;
    return [(this.#lastX + (lastTop[0] - lastBottom[0]***REMOVED*** / 2 - x***REMOVED*** / width, (this.#lastY + (lastTop[1] - lastBottom[1]***REMOVED*** / 2 - y***REMOVED*** / height, (this.#lastX + (lastBottom[0] - lastTop[0]***REMOVED*** / 2 - x***REMOVED*** / width, (this.#lastY + (lastBottom[1] - lastTop[1]***REMOVED*** / 2 - y***REMOVED*** / height];
  ***REMOVED***
  add({
    x,
    y
  ***REMOVED******REMOVED*** {
    this.#lastX = x;
    this.#lastY = y;
    const [layerX, layerY, layerWidth, layerHeight] = this.#box;
    let [x1, y1, x2, y2] = this.#last.subarray(8, 12***REMOVED***;
    const diffX = x - x2;
    const diffY = y - y2;
    const d = Math.hypot(diffX, diffY***REMOVED***;
    if (d < this.#min***REMOVED*** {
      return false;
    ***REMOVED***
    const diffD = d - this.#min_dist;
    const K = diffD / d;
    const shiftX = K * diffX;
    const shiftY = K * diffY;
    let x0 = x1;
    let y0 = y1;
    x1 = x2;
    y1 = y2;
    x2 += shiftX;
    y2 += shiftY;
    this.#points?.push(x, y***REMOVED***;
    const nX = -shiftY / diffD;
    const nY = shiftX / diffD;
    const thX = nX * this.#thickness;
    const thY = nY * this.#thickness;
    this.#last.set(this.#last.subarray(2, 8***REMOVED***, 0***REMOVED***;
    this.#last.set([x2 + thX, y2 + thY], 4***REMOVED***;
    this.#last.set(this.#last.subarray(14, 18***REMOVED***, 12***REMOVED***;
    this.#last.set([x2 - thX, y2 - thY], 16***REMOVED***;
    if (isNaN(this.#last[6]***REMOVED******REMOVED*** {
      if (this.#top.length === 0***REMOVED*** {
        this.#last.set([x1 + thX, y1 + thY], 2***REMOVED***;
        this.#top.push(NaN, NaN, NaN, NaN, (x1 + thX - layerX***REMOVED*** / layerWidth, (y1 + thY - layerY***REMOVED*** / layerHeight***REMOVED***;
        this.#last.set([x1 - thX, y1 - thY], 14***REMOVED***;
        this.#bottom.push(NaN, NaN, NaN, NaN, (x1 - thX - layerX***REMOVED*** / layerWidth, (y1 - thY - layerY***REMOVED*** / layerHeight***REMOVED***;
      ***REMOVED***
      this.#last.set([x0, y0, x1, y1, x2, y2], 6***REMOVED***;
      return !this.isEmpty(***REMOVED***;
    ***REMOVED***
    this.#last.set([x0, y0, x1, y1, x2, y2], 6***REMOVED***;
    const angle = Math.abs(Math.atan2(y0 - y1, x0 - x1***REMOVED*** - Math.atan2(shiftY, shiftX***REMOVED******REMOVED***;
    if (angle < Math.PI / 2***REMOVED*** {
      [x1, y1, x2, y2] = this.#last.subarray(2, 6***REMOVED***;
      this.#top.push(NaN, NaN, NaN, NaN, ((x1 + x2***REMOVED*** / 2 - layerX***REMOVED*** / layerWidth, ((y1 + y2***REMOVED*** / 2 - layerY***REMOVED*** / layerHeight***REMOVED***;
      [x1, y1, x0, y0] = this.#last.subarray(14, 18***REMOVED***;
      this.#bottom.push(NaN, NaN, NaN, NaN, ((x0 + x1***REMOVED*** / 2 - layerX***REMOVED*** / layerWidth, ((y0 + y1***REMOVED*** / 2 - layerY***REMOVED*** / layerHeight***REMOVED***;
      return true;
    ***REMOVED***
    [x0, y0, x1, y1, x2, y2] = this.#last.subarray(0, 6***REMOVED***;
    this.#top.push(((x0 + 5 * x1***REMOVED*** / 6 - layerX***REMOVED*** / layerWidth, ((y0 + 5 * y1***REMOVED*** / 6 - layerY***REMOVED*** / layerHeight, ((5 * x1 + x2***REMOVED*** / 6 - layerX***REMOVED*** / layerWidth, ((5 * y1 + y2***REMOVED*** / 6 - layerY***REMOVED*** / layerHeight, ((x1 + x2***REMOVED*** / 2 - layerX***REMOVED*** / layerWidth, ((y1 + y2***REMOVED*** / 2 - layerY***REMOVED*** / layerHeight***REMOVED***;
    [x2, y2, x1, y1, x0, y0] = this.#last.subarray(12, 18***REMOVED***;
    this.#bottom.push(((x0 + 5 * x1***REMOVED*** / 6 - layerX***REMOVED*** / layerWidth, ((y0 + 5 * y1***REMOVED*** / 6 - layerY***REMOVED*** / layerHeight, ((5 * x1 + x2***REMOVED*** / 6 - layerX***REMOVED*** / layerWidth, ((5 * y1 + y2***REMOVED*** / 6 - layerY***REMOVED*** / layerHeight, ((x1 + x2***REMOVED*** / 2 - layerX***REMOVED*** / layerWidth, ((y1 + y2***REMOVED*** / 2 - layerY***REMOVED*** / layerHeight***REMOVED***;
    return true;
  ***REMOVED***
  toSVGPath(***REMOVED*** {
    if (this.isEmpty(***REMOVED******REMOVED*** {
      return "";
    ***REMOVED***
    const top = this.#top;
    const bottom = this.#bottom;
    if (isNaN(this.#last[6]***REMOVED*** && !this.isEmpty(***REMOVED******REMOVED*** {
      return this.#toSVGPathTwoPoints(***REMOVED***;
    ***REMOVED***
    const buffer = [];
    buffer.push(`M${top[4]***REMOVED*** ${top[5]***REMOVED***`***REMOVED***;
    for (let i = 6; i < top.length; i += 6***REMOVED*** {
      if (isNaN(top[i]***REMOVED******REMOVED*** {
        buffer.push(`L${top[i + 4]***REMOVED*** ${top[i + 5]***REMOVED***`***REMOVED***;
      ***REMOVED*** else {
        buffer.push(`C${top[i]***REMOVED*** ${top[i + 1]***REMOVED*** ${top[i + 2]***REMOVED*** ${top[i + 3]***REMOVED*** ${top[i + 4]***REMOVED*** ${top[i + 5]***REMOVED***`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#toSVGPathEnd(buffer***REMOVED***;
    for (let i = bottom.length - 6; i >= 6; i -= 6***REMOVED*** {
      if (isNaN(bottom[i]***REMOVED******REMOVED*** {
        buffer.push(`L${bottom[i + 4]***REMOVED*** ${bottom[i + 5]***REMOVED***`***REMOVED***;
      ***REMOVED*** else {
        buffer.push(`C${bottom[i]***REMOVED*** ${bottom[i + 1]***REMOVED*** ${bottom[i + 2]***REMOVED*** ${bottom[i + 3]***REMOVED*** ${bottom[i + 4]***REMOVED*** ${bottom[i + 5]***REMOVED***`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#toSVGPathStart(buffer***REMOVED***;
    return buffer.join(" "***REMOVED***;
  ***REMOVED***
  #toSVGPathTwoPoints(***REMOVED*** {
    const [x, y, width, height] = this.#box;
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = this.#getLastCoords(***REMOVED***;
    return `M${(this.#last[2] - x***REMOVED*** / width***REMOVED*** ${(this.#last[3] - y***REMOVED*** / height***REMOVED*** L${(this.#last[4] - x***REMOVED*** / width***REMOVED*** ${(this.#last[5] - y***REMOVED*** / height***REMOVED*** L${lastTopX***REMOVED*** ${lastTopY***REMOVED*** L${lastBottomX***REMOVED*** ${lastBottomY***REMOVED*** L${(this.#last[16] - x***REMOVED*** / width***REMOVED*** ${(this.#last[17] - y***REMOVED*** / height***REMOVED*** L${(this.#last[14] - x***REMOVED*** / width***REMOVED*** ${(this.#last[15] - y***REMOVED*** / height***REMOVED*** Z`;
  ***REMOVED***
  #toSVGPathStart(buffer***REMOVED*** {
    const bottom = this.#bottom;
    buffer.push(`L${bottom[4]***REMOVED*** ${bottom[5]***REMOVED*** Z`***REMOVED***;
  ***REMOVED***
  #toSVGPathEnd(buffer***REMOVED*** {
    const [x, y, width, height] = this.#box;
    const lastTop = this.#last.subarray(4, 6***REMOVED***;
    const lastBottom = this.#last.subarray(16, 18***REMOVED***;
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = this.#getLastCoords(***REMOVED***;
    buffer.push(`L${(lastTop[0] - x***REMOVED*** / width***REMOVED*** ${(lastTop[1] - y***REMOVED*** / height***REMOVED*** L${lastTopX***REMOVED*** ${lastTopY***REMOVED*** L${lastBottomX***REMOVED*** ${lastBottomY***REMOVED*** L${(lastBottom[0] - x***REMOVED*** / width***REMOVED*** ${(lastBottom[1] - y***REMOVED*** / height***REMOVED***`***REMOVED***;
  ***REMOVED***
  newFreeDrawOutline(outline, points, box, scaleFactor, innerMargin, isLTR***REMOVED*** {
    return new FreeDrawOutline(outline, points, box, scaleFactor, innerMargin, isLTR***REMOVED***;
  ***REMOVED***
  getOutlines(***REMOVED*** {
    const top = this.#top;
    const bottom = this.#bottom;
    const last = this.#last;
    const [layerX, layerY, layerWidth, layerHeight] = this.#box;
    const points = new Float32Array((this.#points?.length ?? 0***REMOVED*** + 2***REMOVED***;
    for (let i = 0, ii = points.length - 2; i < ii; i += 2***REMOVED*** {
      points[i] = (this.#points[i] - layerX***REMOVED*** / layerWidth;
      points[i + 1] = (this.#points[i + 1] - layerY***REMOVED*** / layerHeight;
    ***REMOVED***
    points[points.length - 2] = (this.#lastX - layerX***REMOVED*** / layerWidth;
    points[points.length - 1] = (this.#lastY - layerY***REMOVED*** / layerHeight;
    if (isNaN(last[6]***REMOVED*** && !this.isEmpty(***REMOVED******REMOVED*** {
      return this.#getOutlineTwoPoints(points***REMOVED***;
    ***REMOVED***
    const outline = new Float32Array(this.#top.length + 24 + this.#bottom.length***REMOVED***;
    let N = top.length;
    for (let i = 0; i < N; i += 2***REMOVED*** {
      if (isNaN(top[i]***REMOVED******REMOVED*** {
        outline[i] = outline[i + 1] = NaN;
        continue;
      ***REMOVED***
      outline[i] = top[i];
      outline[i + 1] = top[i + 1];
    ***REMOVED***
    N = this.#getOutlineEnd(outline, N***REMOVED***;
    for (let i = bottom.length - 6; i >= 6; i -= 6***REMOVED*** {
      for (let j = 0; j < 6; j += 2***REMOVED*** {
        if (isNaN(bottom[i + j]***REMOVED******REMOVED*** {
          outline[N] = outline[N + 1] = NaN;
          N += 2;
          continue;
        ***REMOVED***
        outline[N] = bottom[i + j];
        outline[N + 1] = bottom[i + j + 1];
        N += 2;
      ***REMOVED***
    ***REMOVED***
    this.#getOutlineStart(outline, N***REMOVED***;
    return this.newFreeDrawOutline(outline, points, this.#box, this.#scaleFactor, this.#innerMargin, this.#isLTR***REMOVED***;
  ***REMOVED***
  #getOutlineTwoPoints(points***REMOVED*** {
    const last = this.#last;
    const [layerX, layerY, layerWidth, layerHeight] = this.#box;
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = this.#getLastCoords(***REMOVED***;
    const outline = new Float32Array(36***REMOVED***;
    outline.set([NaN, NaN, NaN, NaN, (last[2] - layerX***REMOVED*** / layerWidth, (last[3] - layerY***REMOVED*** / layerHeight, NaN, NaN, NaN, NaN, (last[4] - layerX***REMOVED*** / layerWidth, (last[5] - layerY***REMOVED*** / layerHeight, NaN, NaN, NaN, NaN, lastTopX, lastTopY, NaN, NaN, NaN, NaN, lastBottomX, lastBottomY, NaN, NaN, NaN, NaN, (last[16] - layerX***REMOVED*** / layerWidth, (last[17] - layerY***REMOVED*** / layerHeight, NaN, NaN, NaN, NaN, (last[14] - layerX***REMOVED*** / layerWidth, (last[15] - layerY***REMOVED*** / layerHeight], 0***REMOVED***;
    return this.newFreeDrawOutline(outline, points, this.#box, this.#scaleFactor, this.#innerMargin, this.#isLTR***REMOVED***;
  ***REMOVED***
  #getOutlineStart(outline, pos***REMOVED*** {
    const bottom = this.#bottom;
    outline.set([NaN, NaN, NaN, NaN, bottom[4], bottom[5]], pos***REMOVED***;
    return pos += 6;
  ***REMOVED***
  #getOutlineEnd(outline, pos***REMOVED*** {
    const lastTop = this.#last.subarray(4, 6***REMOVED***;
    const lastBottom = this.#last.subarray(16, 18***REMOVED***;
    const [layerX, layerY, layerWidth, layerHeight] = this.#box;
    const [lastTopX, lastTopY, lastBottomX, lastBottomY] = this.#getLastCoords(***REMOVED***;
    outline.set([NaN, NaN, NaN, NaN, (lastTop[0] - layerX***REMOVED*** / layerWidth, (lastTop[1] - layerY***REMOVED*** / layerHeight, NaN, NaN, NaN, NaN, lastTopX, lastTopY, NaN, NaN, NaN, NaN, lastBottomX, lastBottomY, NaN, NaN, NaN, NaN, (lastBottom[0] - layerX***REMOVED*** / layerWidth, (lastBottom[1] - layerY***REMOVED*** / layerHeight], pos***REMOVED***;
    return pos += 24;
  ***REMOVED***
***REMOVED***
class FreeDrawOutline extends Outline {
  #box;
  #bbox = new Float32Array(4***REMOVED***;
  #innerMargin;
  #isLTR;
  #points;
  #scaleFactor;
  #outline;
  constructor(outline, points, box, scaleFactor, innerMargin, isLTR***REMOVED*** {
    super(***REMOVED***;
    this.#outline = outline;
    this.#points = points;
    this.#box = box;
    this.#scaleFactor = scaleFactor;
    this.#innerMargin = innerMargin;
    this.#isLTR = isLTR;
    this.lastPoint = [NaN, NaN];
    this.#computeMinMax(isLTR***REMOVED***;
    const [x, y, width, height] = this.#bbox;
    for (let i = 0, ii = outline.length; i < ii; i += 2***REMOVED*** {
      outline[i] = (outline[i] - x***REMOVED*** / width;
      outline[i + 1] = (outline[i + 1] - y***REMOVED*** / height;
    ***REMOVED***
    for (let i = 0, ii = points.length; i < ii; i += 2***REMOVED*** {
      points[i] = (points[i] - x***REMOVED*** / width;
      points[i + 1] = (points[i + 1] - y***REMOVED*** / height;
    ***REMOVED***
  ***REMOVED***
  toSVGPath(***REMOVED*** {
    const buffer = [`M${this.#outline[4]***REMOVED*** ${this.#outline[5]***REMOVED***`];
    for (let i = 6, ii = this.#outline.length; i < ii; i += 6***REMOVED*** {
      if (isNaN(this.#outline[i]***REMOVED******REMOVED*** {
        buffer.push(`L${this.#outline[i + 4]***REMOVED*** ${this.#outline[i + 5]***REMOVED***`***REMOVED***;
        continue;
      ***REMOVED***
      buffer.push(`C${this.#outline[i]***REMOVED*** ${this.#outline[i + 1]***REMOVED*** ${this.#outline[i + 2]***REMOVED*** ${this.#outline[i + 3]***REMOVED*** ${this.#outline[i + 4]***REMOVED*** ${this.#outline[i + 5]***REMOVED***`***REMOVED***;
    ***REMOVED***
    buffer.push("Z"***REMOVED***;
    return buffer.join(" "***REMOVED***;
  ***REMOVED***
  serialize([blX, blY, trX, trY], rotation***REMOVED*** {
    const width = trX - blX;
    const height = trY - blY;
    let outline;
    let points;
    switch (rotation***REMOVED*** {
      case 0:
        outline = Outline._rescale(this.#outline, blX, trY, width, -height***REMOVED***;
        points = Outline._rescale(this.#points, blX, trY, width, -height***REMOVED***;
        break;
      case 90:
        outline = Outline._rescaleAndSwap(this.#outline, blX, blY, width, height***REMOVED***;
        points = Outline._rescaleAndSwap(this.#points, blX, blY, width, height***REMOVED***;
        break;
      case 180:
        outline = Outline._rescale(this.#outline, trX, blY, -width, height***REMOVED***;
        points = Outline._rescale(this.#points, trX, blY, -width, height***REMOVED***;
        break;
      case 270:
        outline = Outline._rescaleAndSwap(this.#outline, trX, trY, -width, -height***REMOVED***;
        points = Outline._rescaleAndSwap(this.#points, trX, trY, -width, -height***REMOVED***;
        break;
    ***REMOVED***
***REMOVED***
      outline: Array.from(outline***REMOVED***,
      points: [Array.from(points***REMOVED***]
    ***REMOVED***;
  ***REMOVED***
  #computeMinMax(isLTR***REMOVED*** {
    const outline = this.#outline;
    let lastX = outline[4];
    let lastY = outline[5];
    let minX = lastX;
    let minY = lastY;
    let maxX = lastX;
    let maxY = lastY;
    let lastPointX = lastX;
    let lastPointY = lastY;
    const ltrCallback = isLTR ? Math.max : Math.min;
    for (let i = 6, ii = outline.length; i < ii; i += 6***REMOVED*** {
      if (isNaN(outline[i]***REMOVED******REMOVED*** {
        minX = Math.min(minX, outline[i + 4]***REMOVED***;
        minY = Math.min(minY, outline[i + 5]***REMOVED***;
        maxX = Math.max(maxX, outline[i + 4]***REMOVED***;
        maxY = Math.max(maxY, outline[i + 5]***REMOVED***;
        if (lastPointY < outline[i + 5]***REMOVED*** {
          lastPointX = outline[i + 4];
          lastPointY = outline[i + 5];
        ***REMOVED*** else if (lastPointY === outline[i + 5]***REMOVED*** {
          lastPointX = ltrCallback(lastPointX, outline[i + 4]***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else {
        const bbox = Util.bezierBoundingBox(lastX, lastY, ...outline.slice(i, i + 6***REMOVED******REMOVED***;
        minX = Math.min(minX, bbox[0]***REMOVED***;
        minY = Math.min(minY, bbox[1]***REMOVED***;
        maxX = Math.max(maxX, bbox[2]***REMOVED***;
        maxY = Math.max(maxY, bbox[3]***REMOVED***;
        if (lastPointY < bbox[3]***REMOVED*** {
          lastPointX = bbox[2];
          lastPointY = bbox[3];
        ***REMOVED*** else if (lastPointY === bbox[3]***REMOVED*** {
          lastPointX = ltrCallback(lastPointX, bbox[2]***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      lastX = outline[i + 4];
      lastY = outline[i + 5];
    ***REMOVED***
    const bbox = this.#bbox;
    bbox[0] = minX - this.#innerMargin;
    bbox[1] = minY - this.#innerMargin;
    bbox[2] = maxX - minX + 2 * this.#innerMargin;
    bbox[3] = maxY - minY + 2 * this.#innerMargin;
    this.lastPoint = [lastPointX, lastPointY];
  ***REMOVED***
  get box(***REMOVED*** {
    return this.#bbox;
  ***REMOVED***
  newOutliner(point, box, scaleFactor, thickness, isLTR, innerMargin = 0***REMOVED*** {
    return new FreeDrawOutliner(point, box, scaleFactor, thickness, isLTR, innerMargin***REMOVED***;
  ***REMOVED***
  getNewOutline(thickness, innerMargin***REMOVED*** {
    const [x, y, width, height] = this.#bbox;
    const [layerX, layerY, layerWidth, layerHeight] = this.#box;
    const sx = width * layerWidth;
    const sy = height * layerHeight;
    const tx = x * layerWidth + layerX;
    const ty = y * layerHeight + layerY;
    const outliner = this.newOutliner({
      x: this.#points[0] * sx + tx,
      y: this.#points[1] * sy + ty
    ***REMOVED***, this.#box, this.#scaleFactor, thickness, this.#isLTR, innerMargin ?? this.#innerMargin***REMOVED***;
    for (let i = 2; i < this.#points.length; i += 2***REMOVED*** {
      outliner.add({
        x: this.#points[i] * sx + tx,
        y: this.#points[i + 1] * sy + ty
      ***REMOVED******REMOVED***;
    ***REMOVED***
    return outliner.getOutlines(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/drawers/highlight.js


class HighlightOutliner {
  #box;
  #lastPoint;
  #verticalEdges = [];
  #intervals = [];
  constructor(boxes, borderWidth = 0, innerMargin = 0, isLTR = true***REMOVED*** {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const NUMBER_OF_DIGITS = 4;
    const EPSILON = 10 ** -NUMBER_OF_DIGITS;
    for (const {
      x,
      y,
      width,
      height
    ***REMOVED*** of boxes***REMOVED*** {
      const x1 = Math.floor((x - borderWidth***REMOVED*** / EPSILON***REMOVED*** * EPSILON;
      const x2 = Math.ceil((x + width + borderWidth***REMOVED*** / EPSILON***REMOVED*** * EPSILON;
      const y1 = Math.floor((y - borderWidth***REMOVED*** / EPSILON***REMOVED*** * EPSILON;
      const y2 = Math.ceil((y + height + borderWidth***REMOVED*** / EPSILON***REMOVED*** * EPSILON;
      const left = [x1, y1, y2, true];
      const right = [x2, y1, y2, false];
      this.#verticalEdges.push(left, right***REMOVED***;
      minX = Math.min(minX, x1***REMOVED***;
      maxX = Math.max(maxX, x2***REMOVED***;
      minY = Math.min(minY, y1***REMOVED***;
      maxY = Math.max(maxY, y2***REMOVED***;
    ***REMOVED***
    const bboxWidth = maxX - minX + 2 * innerMargin;
    const bboxHeight = maxY - minY + 2 * innerMargin;
    const shiftedMinX = minX - innerMargin;
    const shiftedMinY = minY - innerMargin;
    const lastEdge = this.#verticalEdges.at(isLTR ? -1 : -2***REMOVED***;
    const lastPoint = [lastEdge[0], lastEdge[2]];
    for (const edge of this.#verticalEdges***REMOVED*** {
      const [x, y1, y2] = edge;
      edge[0] = (x - shiftedMinX***REMOVED*** / bboxWidth;
      edge[1] = (y1 - shiftedMinY***REMOVED*** / bboxHeight;
      edge[2] = (y2 - shiftedMinY***REMOVED*** / bboxHeight;
    ***REMOVED***
    this.#box = new Float32Array([shiftedMinX, shiftedMinY, bboxWidth, bboxHeight]***REMOVED***;
    this.#lastPoint = lastPoint;
  ***REMOVED***
  getOutlines(***REMOVED*** {
    this.#verticalEdges.sort((a, b***REMOVED*** => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]***REMOVED***;
    const outlineVerticalEdges = [];
    for (const edge of this.#verticalEdges***REMOVED*** {
      if (edge[3]***REMOVED*** {
        outlineVerticalEdges.push(...this.#breakEdge(edge***REMOVED******REMOVED***;
        this.#insert(edge***REMOVED***;
      ***REMOVED*** else {
        this.#remove(edge***REMOVED***;
        outlineVerticalEdges.push(...this.#breakEdge(edge***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return this.#getOutlines(outlineVerticalEdges***REMOVED***;
  ***REMOVED***
  #getOutlines(outlineVerticalEdges***REMOVED*** {
    const edges = [];
    const allEdges = new Set(***REMOVED***;
    for (const edge of outlineVerticalEdges***REMOVED*** {
      const [x, y1, y2] = edge;
      edges.push([x, y1, edge], [x, y2, edge]***REMOVED***;
    ***REMOVED***
    edges.sort((a, b***REMOVED*** => a[1] - b[1] || a[0] - b[0]***REMOVED***;
    for (let i = 0, ii = edges.length; i < ii; i += 2***REMOVED*** {
      const edge1 = edges[i][2];
      const edge2 = edges[i + 1][2];
      edge1.push(edge2***REMOVED***;
      edge2.push(edge1***REMOVED***;
      allEdges.add(edge1***REMOVED***;
      allEdges.add(edge2***REMOVED***;
    ***REMOVED***
    const outlines = [];
    let outline;
    while (allEdges.size > 0***REMOVED*** {
      const edge = allEdges.values(***REMOVED***.next(***REMOVED***.value;
      let [x, y1, y2, edge1, edge2] = edge;
      allEdges.delete(edge***REMOVED***;
      let lastPointX = x;
      let lastPointY = y1;
      outline = [x, y2];
      outlines.push(outline***REMOVED***;
      while (true***REMOVED*** {
        let e;
        if (allEdges.has(edge1***REMOVED******REMOVED*** {
          e = edge1;
        ***REMOVED*** else if (allEdges.has(edge2***REMOVED******REMOVED*** {
          e = edge2;
        ***REMOVED*** else {
          break;
        ***REMOVED***
        allEdges.delete(e***REMOVED***;
        [x, y1, y2, edge1, edge2] = e;
        if (lastPointX !== x***REMOVED*** {
          outline.push(lastPointX, lastPointY, x, lastPointY === y1 ? y1 : y2***REMOVED***;
          lastPointX = x;
        ***REMOVED***
        lastPointY = lastPointY === y1 ? y2 : y1;
      ***REMOVED***
      outline.push(lastPointX, lastPointY***REMOVED***;
    ***REMOVED***
    return new HighlightOutline(outlines, this.#box, this.#lastPoint***REMOVED***;
  ***REMOVED***
  #binarySearch(y***REMOVED*** {
    const array = this.#intervals;
    let start = 0;
    let end = array.length - 1;
    while (start <= end***REMOVED*** {
      const middle = start + end >> 1;
      const y1 = array[middle][0];
      if (y1 === y***REMOVED*** {
        return middle;
      ***REMOVED***
      if (y1 < y***REMOVED*** {
        start = middle + 1;
      ***REMOVED*** else {
        end = middle - 1;
      ***REMOVED***
    ***REMOVED***
    return end + 1;
  ***REMOVED***
  #insert([, y1, y2]***REMOVED*** {
    const index = this.#binarySearch(y1***REMOVED***;
    this.#intervals.splice(index, 0, [y1, y2]***REMOVED***;
  ***REMOVED***
  #remove([, y1, y2]***REMOVED*** {
    const index = this.#binarySearch(y1***REMOVED***;
    for (let i = index; i < this.#intervals.length; i++***REMOVED*** {
      const [start, end] = this.#intervals[i];
      if (start !== y1***REMOVED*** {
        break;
      ***REMOVED***
      if (start === y1 && end === y2***REMOVED*** {
        this.#intervals.splice(i, 1***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
    for (let i = index - 1; i >= 0; i--***REMOVED*** {
      const [start, end] = this.#intervals[i];
      if (start !== y1***REMOVED*** {
        break;
      ***REMOVED***
      if (start === y1 && end === y2***REMOVED*** {
        this.#intervals.splice(i, 1***REMOVED***;
        return;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  #breakEdge(edge***REMOVED*** {
    const [x, y1, y2] = edge;
    const results = [[x, y1, y2]];
    const index = this.#binarySearch(y2***REMOVED***;
    for (let i = 0; i < index; i++***REMOVED*** {
      const [start, end] = this.#intervals[i];
      for (let j = 0, jj = results.length; j < jj; j++***REMOVED*** {
        const [, y3, y4] = results[j];
        if (end <= y3 || y4 <= start***REMOVED*** {
          continue;
        ***REMOVED***
        if (y3 >= start***REMOVED*** {
          if (y4 > end***REMOVED*** {
            results[j][1] = end;
          ***REMOVED*** else {
            if (jj === 1***REMOVED*** {
              return [];
            ***REMOVED***
            results.splice(j, 1***REMOVED***;
            j--;
            jj--;
          ***REMOVED***
          continue;
        ***REMOVED***
        results[j][2] = start;
        if (y4 > end***REMOVED*** {
          results.push([x, end, y4]***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    return results;
  ***REMOVED***
***REMOVED***
class HighlightOutline extends Outline {
  #box;
  #outlines;
  constructor(outlines, box, lastPoint***REMOVED*** {
    super(***REMOVED***;
    this.#outlines = outlines;
    this.#box = box;
    this.lastPoint = lastPoint;
  ***REMOVED***
  toSVGPath(***REMOVED*** {
    const buffer = [];
    for (const polygon of this.#outlines***REMOVED*** {
      let [prevX, prevY] = polygon;
      buffer.push(`M${prevX***REMOVED*** ${prevY***REMOVED***`***REMOVED***;
      for (let i = 2; i < polygon.length; i += 2***REMOVED*** {
        const x = polygon[i];
        const y = polygon[i + 1];
        if (x === prevX***REMOVED*** {
          buffer.push(`V${y***REMOVED***`***REMOVED***;
          prevY = y;
        ***REMOVED*** else if (y === prevY***REMOVED*** {
          buffer.push(`H${x***REMOVED***`***REMOVED***;
          prevX = x;
        ***REMOVED***
      ***REMOVED***
      buffer.push("Z"***REMOVED***;
    ***REMOVED***
    return buffer.join(" "***REMOVED***;
  ***REMOVED***
  serialize([blX, blY, trX, trY], _rotation***REMOVED*** {
    const outlines = [];
    const width = trX - blX;
    const height = trY - blY;
    for (const outline of this.#outlines***REMOVED*** {
      const points = new Array(outline.length***REMOVED***;
      for (let i = 0; i < outline.length; i += 2***REMOVED*** {
        points[i] = blX + outline[i] * width;
        points[i + 1] = trY - outline[i + 1] * height;
      ***REMOVED***
      outlines.push(points***REMOVED***;
    ***REMOVED***
    return outlines;
  ***REMOVED***
  get box(***REMOVED*** {
    return this.#box;
  ***REMOVED***
  get classNamesForOutlining(***REMOVED*** {
    return ["highlightOutline"];
  ***REMOVED***
***REMOVED***
class FreeHighlightOutliner extends FreeDrawOutliner {
  newFreeDrawOutline(outline, points, box, scaleFactor, innerMargin, isLTR***REMOVED*** {
    return new FreeHighlightOutline(outline, points, box, scaleFactor, innerMargin, isLTR***REMOVED***;
  ***REMOVED***
***REMOVED***
class FreeHighlightOutline extends FreeDrawOutline {
  newOutliner(point, box, scaleFactor, thickness, isLTR, innerMargin = 0***REMOVED*** {
    return new FreeHighlightOutliner(point, box, scaleFactor, thickness, isLTR, innerMargin***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/color_picker.js



class ColorPicker {
  #button = null;
  #buttonSwatch = null;
  #defaultColor;
  #dropdown = null;
  #dropdownWasFromKeyboard = false;
  #isMainColorPicker = false;
  #editor = null;
  #eventBus;
  #openDropdownAC = null;
  #uiManager = null;
  #type;
  static #l10nColor = null;
  static get _keyboardManager(***REMOVED*** {
    return shadow(this, "_keyboardManager", new KeyboardManager([[["Escape", "mac+Escape"], ColorPicker.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], ColorPicker.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], ColorPicker.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], ColorPicker.prototype._moveToPrevious], [["Home", "mac+Home"], ColorPicker.prototype._moveToBeginning], [["End", "mac+End"], ColorPicker.prototype._moveToEnd]]***REMOVED******REMOVED***;
  ***REMOVED***
  constructor({
    editor = null,
    uiManager = null
  ***REMOVED******REMOVED*** {
    if (editor***REMOVED*** {
      this.#isMainColorPicker = false;
      this.#type = AnnotationEditorParamsType.HIGHLIGHT_COLOR;
      this.#editor = editor;
    ***REMOVED*** else {
      this.#isMainColorPicker = true;
      this.#type = AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR;
    ***REMOVED***
    this.#uiManager = editor?._uiManager || uiManager;
    this.#eventBus = this.#uiManager._eventBus;
    this.#defaultColor = editor?.color || this.#uiManager?.highlightColors.values(***REMOVED***.next(***REMOVED***.value || "#FFFF98";
    ColorPicker.#l10nColor ||= Object.freeze({
      blue: "pdfjs-editor-colorpicker-blue",
      green: "pdfjs-editor-colorpicker-green",
      pink: "pdfjs-editor-colorpicker-pink",
      red: "pdfjs-editor-colorpicker-red",
      yellow: "pdfjs-editor-colorpicker-yellow"
    ***REMOVED******REMOVED***;
  ***REMOVED***
  renderButton(***REMOVED*** {
    const button = this.#button = document.createElement("button"***REMOVED***;
    button.className = "colorPicker";
    button.tabIndex = "0";
    button.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"***REMOVED***;
    button.setAttribute("aria-haspopup", true***REMOVED***;
    const signal = this.#uiManager._signal;
    button.addEventListener("click", this.#openDropdown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    button.addEventListener("keydown", this.#keyDown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    const swatch = this.#buttonSwatch = document.createElement("span"***REMOVED***;
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", true***REMOVED***;
    swatch.style.backgroundColor = this.#defaultColor;
    button.append(swatch***REMOVED***;
    return button;
  ***REMOVED***
  renderMainDropdown(***REMOVED*** {
    const dropdown = this.#dropdown = this.#getDropdownRoot(***REMOVED***;
    dropdown.setAttribute("aria-orientation", "horizontal"***REMOVED***;
    dropdown.setAttribute("aria-labelledby", "highlightColorPickerLabel"***REMOVED***;
    return dropdown;
  ***REMOVED***
  #getDropdownRoot(***REMOVED*** {
    const div = document.createElement("div"***REMOVED***;
    const signal = this.#uiManager._signal;
    div.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    div.className = "dropdown";
    div.role = "listbox";
    div.setAttribute("aria-multiselectable", false***REMOVED***;
    div.setAttribute("aria-orientation", "vertical"***REMOVED***;
    div.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown"***REMOVED***;
    for (const [name, color] of this.#uiManager.highlightColors***REMOVED*** {
      const button = document.createElement("button"***REMOVED***;
      button.tabIndex = "0";
      button.role = "option";
      button.setAttribute("data-color", color***REMOVED***;
      button.title = name;
      button.setAttribute("data-l10n-id", ColorPicker.#l10nColor[name]***REMOVED***;
      const swatch = document.createElement("span"***REMOVED***;
      button.append(swatch***REMOVED***;
      swatch.className = "swatch";
      swatch.style.backgroundColor = color;
      button.setAttribute("aria-selected", color === this.#defaultColor***REMOVED***;
      button.addEventListener("click", this.#colorSelect.bind(this, color***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
      div.append(button***REMOVED***;
    ***REMOVED***
    div.addEventListener("keydown", this.#keyDown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    return div;
  ***REMOVED***
  #colorSelect(color, event***REMOVED*** {
    event.stopPropagation(***REMOVED***;
    this.#eventBus.dispatch("switchannotationeditorparams", {
      source: this,
      type: this.#type,
      value: color
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _colorSelectFromKeyboard(event***REMOVED*** {
    if (event.target === this.#button***REMOVED*** {
      this.#openDropdown(event***REMOVED***;
      return;
    ***REMOVED***
    const color = event.target.getAttribute("data-color"***REMOVED***;
    if (!color***REMOVED*** {
      return;
    ***REMOVED***
    this.#colorSelect(color, event***REMOVED***;
  ***REMOVED***
  _moveToNext(event***REMOVED*** {
    if (!this.#isDropdownVisible***REMOVED*** {
      this.#openDropdown(event***REMOVED***;
      return;
    ***REMOVED***
    if (event.target === this.#button***REMOVED*** {
      this.#dropdown.firstChild?.focus(***REMOVED***;
      return;
    ***REMOVED***
    event.target.nextSibling?.focus(***REMOVED***;
  ***REMOVED***
  _moveToPrevious(event***REMOVED*** {
    if (event.target === this.#dropdown?.firstChild || event.target === this.#button***REMOVED*** {
      if (this.#isDropdownVisible***REMOVED*** {
        this._hideDropdownFromKeyboard(***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    if (!this.#isDropdownVisible***REMOVED*** {
      this.#openDropdown(event***REMOVED***;
    ***REMOVED***
    event.target.previousSibling?.focus(***REMOVED***;
  ***REMOVED***
  _moveToBeginning(event***REMOVED*** {
    if (!this.#isDropdownVisible***REMOVED*** {
      this.#openDropdown(event***REMOVED***;
      return;
    ***REMOVED***
    this.#dropdown.firstChild?.focus(***REMOVED***;
  ***REMOVED***
  _moveToEnd(event***REMOVED*** {
    if (!this.#isDropdownVisible***REMOVED*** {
      this.#openDropdown(event***REMOVED***;
      return;
    ***REMOVED***
    this.#dropdown.lastChild?.focus(***REMOVED***;
  ***REMOVED***
  #keyDown(event***REMOVED*** {
    ColorPicker._keyboardManager.exec(this, event***REMOVED***;
  ***REMOVED***
  #openDropdown(event***REMOVED*** {
    if (this.#isDropdownVisible***REMOVED*** {
      this.hideDropdown(***REMOVED***;
      return;
    ***REMOVED***
    this.#dropdownWasFromKeyboard = event.detail === 0;
    if (!this.#openDropdownAC***REMOVED*** {
      this.#openDropdownAC = new AbortController(***REMOVED***;
      window.addEventListener("pointerdown", this.#pointerDown.bind(this***REMOVED***, {
        signal: this.#uiManager.combinedSignal(this.#openDropdownAC***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    if (this.#dropdown***REMOVED*** {
      this.#dropdown.classList.remove("hidden"***REMOVED***;
      return;
    ***REMOVED***
    const root = this.#dropdown = this.#getDropdownRoot(***REMOVED***;
    this.#button.append(root***REMOVED***;
  ***REMOVED***
  #pointerDown(event***REMOVED*** {
    if (this.#dropdown?.contains(event.target***REMOVED******REMOVED*** {
      return;
    ***REMOVED***
    this.hideDropdown(***REMOVED***;
  ***REMOVED***
  hideDropdown(***REMOVED*** {
    this.#dropdown?.classList.add("hidden"***REMOVED***;
    this.#openDropdownAC?.abort(***REMOVED***;
    this.#openDropdownAC = null;
  ***REMOVED***
  get #isDropdownVisible(***REMOVED*** {
    return this.#dropdown && !this.#dropdown.classList.contains("hidden"***REMOVED***;
  ***REMOVED***
  _hideDropdownFromKeyboard(***REMOVED*** {
    if (this.#isMainColorPicker***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#isDropdownVisible***REMOVED*** {
      this.#editor?.unselect(***REMOVED***;
      return;
    ***REMOVED***
    this.hideDropdown(***REMOVED***;
    this.#button.focus({
      preventScroll: true,
      focusVisible: this.#dropdownWasFromKeyboard
    ***REMOVED******REMOVED***;
  ***REMOVED***
  updateColor(color***REMOVED*** {
    if (this.#buttonSwatch***REMOVED*** {
      this.#buttonSwatch.style.backgroundColor = color;
    ***REMOVED***
    if (!this.#dropdown***REMOVED*** {
      return;
    ***REMOVED***
    const i = this.#uiManager.highlightColors.values(***REMOVED***;
    for (const child of this.#dropdown.children***REMOVED*** {
      child.setAttribute("aria-selected", i.next(***REMOVED***.value === color***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#button?.remove(***REMOVED***;
    this.#button = null;
    this.#buttonSwatch = null;
    this.#dropdown?.remove(***REMOVED***;
    this.#dropdown = null;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/highlight.js







class HighlightEditor extends AnnotationEditor {
  #anchorNode = null;
  #anchorOffset = 0;
  #boxes;
  #clipPathId = null;
  #colorPicker = null;
  #focusOutlines = null;
  #focusNode = null;
  #focusOffset = 0;
  #highlightDiv = null;
  #highlightOutlines = null;
  #id = null;
  #isFreeHighlight = false;
  #lastPoint = null;
  #opacity;
  #outlineId = null;
  #text = "";
  #thickness;
  #methodOfCreation = "";
  static _defaultColor = null;
  static _defaultOpacity = 1;
  static _defaultThickness = 12;
  static _type = "highlight";
  static _editorType = AnnotationEditorType.HIGHLIGHT;
  static _freeHighlightId = -1;
  static _freeHighlight = null;
  static _freeHighlightClipId = "";
  static get _keyboardManager(***REMOVED*** {
    const proto = HighlightEditor.prototype;
    return shadow(this, "_keyboardManager", new KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], proto._moveCaret, {
      args: [0]
    ***REMOVED***], [["ArrowRight", "mac+ArrowRight"], proto._moveCaret, {
      args: [1]
    ***REMOVED***], [["ArrowUp", "mac+ArrowUp"], proto._moveCaret, {
      args: [2]
    ***REMOVED***], [["ArrowDown", "mac+ArrowDown"], proto._moveCaret, {
      args: [3]
    ***REMOVED***]]***REMOVED******REMOVED***;
  ***REMOVED***
  constructor(params***REMOVED*** {
    super({
      ...params,
      name: "highlightEditor"
    ***REMOVED******REMOVED***;
    this.color = params.color || HighlightEditor._defaultColor;
    this.#thickness = params.thickness || HighlightEditor._defaultThickness;
    this.#opacity = params.opacity || HighlightEditor._defaultOpacity;
    this.#boxes = params.boxes || null;
    this.#methodOfCreation = params.methodOfCreation || "";
    this.#text = params.text || "";
    this._isDraggable = false;
    if (params.highlightId > -1***REMOVED*** {
      this.#isFreeHighlight = true;
      this.#createFreeOutlines(params***REMOVED***;
      this.#addToDrawLayer(***REMOVED***;
    ***REMOVED*** else if (this.#boxes***REMOVED*** {
      this.#anchorNode = params.anchorNode;
      this.#anchorOffset = params.anchorOffset;
      this.#focusNode = params.focusNode;
      this.#focusOffset = params.focusOffset;
      this.#createOutlines(***REMOVED***;
      this.#addToDrawLayer(***REMOVED***;
      this.rotate(this.rotation***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get telemetryInitialData(***REMOVED*** {
***REMOVED***
      action: "added",
      type: this.#isFreeHighlight ? "free_highlight" : "highlight",
      color: this._uiManager.highlightColorNames.get(this.color***REMOVED***,
      thickness: this.#thickness,
      methodOfCreation: this.#methodOfCreation
    ***REMOVED***;
  ***REMOVED***
  get telemetryFinalData(***REMOVED*** {
***REMOVED***
      type: "highlight",
      color: this._uiManager.highlightColorNames.get(this.color***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  static computeTelemetryFinalData(data***REMOVED*** {
***REMOVED***
      numberOfColors: data.get("color"***REMOVED***.size
    ***REMOVED***;
  ***REMOVED***
  #createOutlines(***REMOVED*** {
    const outliner = new HighlightOutliner(this.#boxes, 0.001***REMOVED***;
    this.#highlightOutlines = outliner.getOutlines(***REMOVED***;
    [this.x, this.y, this.width, this.height] = this.#highlightOutlines.box;
    const outlinerForOutline = new HighlightOutliner(this.#boxes, 0.0025, 0.001, this._uiManager.direction === "ltr"***REMOVED***;
    this.#focusOutlines = outlinerForOutline.getOutlines(***REMOVED***;
    const {
      lastPoint
    ***REMOVED*** = this.#focusOutlines;
    this.#lastPoint = [(lastPoint[0] - this.x***REMOVED*** / this.width, (lastPoint[1] - this.y***REMOVED*** / this.height];
  ***REMOVED***
  #createFreeOutlines({
    highlightOutlines,
    highlightId,
    clipPathId
  ***REMOVED******REMOVED*** {
    this.#highlightOutlines = highlightOutlines;
    const extraThickness = 1.5;
    this.#focusOutlines = highlightOutlines.getNewOutline(this.#thickness / 2 + extraThickness, 0.0025***REMOVED***;
    if (highlightId >= 0***REMOVED*** {
      this.#id = highlightId;
      this.#clipPathId = clipPathId;
      this.parent.drawLayer.finalizeDraw(highlightId, {
        bbox: highlightOutlines.box,
        path: {
          d: highlightOutlines.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
      this.#outlineId = this.parent.drawLayer.drawOutline({
        rootClass: {
          highlightOutline: true,
          free: true
        ***REMOVED***,
        bbox: this.#focusOutlines.box,
        path: {
          d: this.#focusOutlines.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED***, true***REMOVED***;
    ***REMOVED*** else if (this.parent***REMOVED*** {
      const angle = this.parent.viewport.rotation;
      this.parent.drawLayer.updateProperties(this.#id, {
        bbox: HighlightEditor.#rotateBbox(this.#highlightOutlines.box, (angle - this.rotation + 360***REMOVED*** % 360***REMOVED***,
        path: {
          d: highlightOutlines.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
      this.parent.drawLayer.updateProperties(this.#outlineId, {
        bbox: HighlightEditor.#rotateBbox(this.#focusOutlines.box, angle***REMOVED***,
        path: {
          d: this.#focusOutlines.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const [x, y, width, height] = highlightOutlines.box;
    switch (this.rotation***REMOVED*** {
      case 0:
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        break;
      case 90:
      ***REMOVED***
          const [pageWidth, pageHeight] = this.parentDimensions;
          this.x = y;
          this.y = 1 - x;
          this.width = width * pageHeight / pageWidth;
          this.height = height * pageWidth / pageHeight;
          break;
        ***REMOVED***
      case 180:
        this.x = 1 - x;
        this.y = 1 - y;
        this.width = width;
        this.height = height;
        break;
      case 270:
      ***REMOVED***
          const [pageWidth, pageHeight] = this.parentDimensions;
          this.x = 1 - y;
          this.y = x;
          this.width = width * pageHeight / pageWidth;
          this.height = height * pageWidth / pageHeight;
          break;
        ***REMOVED***
    ***REMOVED***
    const {
      lastPoint
    ***REMOVED*** = this.#focusOutlines;
    this.#lastPoint = [(lastPoint[0] - x***REMOVED*** / width, (lastPoint[1] - y***REMOVED*** / height];
  ***REMOVED***
  static initialize(l10n, uiManager***REMOVED*** {
    AnnotationEditor.initialize(l10n, uiManager***REMOVED***;
    HighlightEditor._defaultColor ||= uiManager.highlightColors?.values(***REMOVED***.next(***REMOVED***.value || "#fff066";
  ***REMOVED***
  static updateDefaultParams(type, value***REMOVED*** {
    switch (type***REMOVED*** {
      case AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
        HighlightEditor._defaultColor = value;
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
        HighlightEditor._defaultThickness = value;
        break;
    ***REMOVED***
  ***REMOVED***
  translateInPage(x, y***REMOVED*** {***REMOVED***
  get toolbarPosition(***REMOVED*** {
    return this.#lastPoint;
  ***REMOVED***
  updateParams(type, value***REMOVED*** {
    switch (type***REMOVED*** {
      case AnnotationEditorParamsType.HIGHLIGHT_COLOR:
        this.#updateColor(value***REMOVED***;
        break;
      case AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
        this.#updateThickness(value***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  static get defaultPropertiesToUpdate(***REMOVED*** {
    return [[AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, HighlightEditor._defaultColor], [AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, HighlightEditor._defaultThickness]];
  ***REMOVED***
  get propertiesToUpdate(***REMOVED*** {
    return [[AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || HighlightEditor._defaultColor], [AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, this.#thickness || HighlightEditor._defaultThickness], [AnnotationEditorParamsType.HIGHLIGHT_FREE, this.#isFreeHighlight]];
  ***REMOVED***
  #updateColor(color***REMOVED*** {
    const setColorAndOpacity = (col, opa***REMOVED*** => {
      this.color = col;
      this.#opacity = opa;
      this.parent?.drawLayer.updateProperties(this.#id, {
        root: {
          fill: col,
          "fill-opacity": opa
        ***REMOVED***
      ***REMOVED******REMOVED***;
      this.#colorPicker?.updateColor(col***REMOVED***;
    ***REMOVED***;
    const savedColor = this.color;
    const savedOpacity = this.#opacity;
    this.addCommands({
      cmd: setColorAndOpacity.bind(this, color, HighlightEditor._defaultOpacity***REMOVED***,
      undo: setColorAndOpacity.bind(this, savedColor, savedOpacity***REMOVED***,
      post: this._uiManager.updateUI.bind(this._uiManager, this***REMOVED***,
      mustExec: true,
      type: AnnotationEditorParamsType.HIGHLIGHT_COLOR,
      overwriteIfSameType: true,
      keepUndo: true
    ***REMOVED******REMOVED***;
    this._reportTelemetry({
      action: "color_changed",
      color: this._uiManager.highlightColorNames.get(color***REMOVED***
    ***REMOVED***, true***REMOVED***;
  ***REMOVED***
  #updateThickness(thickness***REMOVED*** {
    const savedThickness = this.#thickness;
    const setThickness = th => {
      this.#thickness = th;
      this.#changeThickness(th***REMOVED***;
    ***REMOVED***;
    this.addCommands({
      cmd: setThickness.bind(this, thickness***REMOVED***,
      undo: setThickness.bind(this, savedThickness***REMOVED***,
      post: this._uiManager.updateUI.bind(this._uiManager, this***REMOVED***,
      mustExec: true,
      type: AnnotationEditorParamsType.INK_THICKNESS,
      overwriteIfSameType: true,
      keepUndo: true
    ***REMOVED******REMOVED***;
    this._reportTelemetry({
      action: "thickness_changed",
      thickness
    ***REMOVED***, true***REMOVED***;
  ***REMOVED***
  async addEditToolbar(***REMOVED*** {
    const toolbar = await super.addEditToolbar(***REMOVED***;
    if (!toolbar***REMOVED*** {
      return null;
    ***REMOVED***
    if (this._uiManager.highlightColors***REMOVED*** {
      this.#colorPicker = new ColorPicker({
        editor: this
      ***REMOVED******REMOVED***;
      toolbar.addColorPicker(this.#colorPicker***REMOVED***;
    ***REMOVED***
    return toolbar;
  ***REMOVED***
  disableEditing(***REMOVED*** {
    super.disableEditing(***REMOVED***;
    this.div.classList.toggle("disabled", true***REMOVED***;
  ***REMOVED***
  enableEditing(***REMOVED*** {
    super.enableEditing(***REMOVED***;
    this.div.classList.toggle("disabled", false***REMOVED***;
  ***REMOVED***
  fixAndSetPosition(***REMOVED*** {
    return super.fixAndSetPosition(this.#getRotation(***REMOVED******REMOVED***;
  ***REMOVED***
  getBaseTranslation(***REMOVED*** {
    return [0, 0];
  ***REMOVED***
  getRect(tx, ty***REMOVED*** {
    return super.getRect(tx, ty, this.#getRotation(***REMOVED******REMOVED***;
  ***REMOVED***
  onceAdded(focus***REMOVED*** {
    if (!this.annotationElementId***REMOVED*** {
      this.parent.addUndoableEditor(this***REMOVED***;
    ***REMOVED***
    if (focus***REMOVED*** {
      this.div.focus(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  remove(***REMOVED*** {
    this.#cleanDrawLayer(***REMOVED***;
    this._reportTelemetry({
      action: "deleted"
    ***REMOVED******REMOVED***;
    super.remove(***REMOVED***;
  ***REMOVED***
  rebuild(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    super.rebuild(***REMOVED***;
    if (this.div === null***REMOVED*** {
      return;
    ***REMOVED***
    this.#addToDrawLayer(***REMOVED***;
    if (!this.isAttachedToDOM***REMOVED*** {
      this.parent.add(this***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setParent(parent***REMOVED*** {
    let mustBeSelected = false;
    if (this.parent && !parent***REMOVED*** {
      this.#cleanDrawLayer(***REMOVED***;
    ***REMOVED*** else if (parent***REMOVED*** {
      this.#addToDrawLayer(parent***REMOVED***;
      mustBeSelected = !this.parent && this.div?.classList.contains("selectedEditor"***REMOVED***;
    ***REMOVED***
    super.setParent(parent***REMOVED***;
    this.show(this._isVisible***REMOVED***;
    if (mustBeSelected***REMOVED*** {
      this.select(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #changeThickness(thickness***REMOVED*** {
    if (!this.#isFreeHighlight***REMOVED*** {
      return;
    ***REMOVED***
    this.#createFreeOutlines({
      highlightOutlines: this.#highlightOutlines.getNewOutline(thickness / 2***REMOVED***
    ***REMOVED******REMOVED***;
    this.fixAndSetPosition(***REMOVED***;
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(this.width * parentWidth, this.height * parentHeight***REMOVED***;
  ***REMOVED***
  #cleanDrawLayer(***REMOVED*** {
    if (this.#id === null || !this.parent***REMOVED*** {
      return;
    ***REMOVED***
    this.parent.drawLayer.remove(this.#id***REMOVED***;
    this.#id = null;
    this.parent.drawLayer.remove(this.#outlineId***REMOVED***;
    this.#outlineId = null;
  ***REMOVED***
  #addToDrawLayer(parent = this.parent***REMOVED*** {
    if (this.#id !== null***REMOVED*** {
      return;
    ***REMOVED***
    ({
      id: this.#id,
      clipPathId: this.#clipPathId
    ***REMOVED*** = parent.drawLayer.draw({
      bbox: this.#highlightOutlines.box,
      root: {
        viewBox: "0 0 1 1",
        fill: this.color,
        "fill-opacity": this.#opacity
      ***REMOVED***,
      rootClass: {
        highlight: true,
        free: this.#isFreeHighlight
      ***REMOVED***,
      path: {
        d: this.#highlightOutlines.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***, false, true***REMOVED******REMOVED***;
    this.#outlineId = parent.drawLayer.drawOutline({
      rootClass: {
        highlightOutline: true,
        free: this.#isFreeHighlight
      ***REMOVED***,
      bbox: this.#focusOutlines.box,
      path: {
        d: this.#focusOutlines.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***, this.#isFreeHighlight***REMOVED***;
    if (this.#highlightDiv***REMOVED*** {
      this.#highlightDiv.style.clipPath = this.#clipPathId;
    ***REMOVED***
  ***REMOVED***
  static #rotateBbox([x, y, width, height], angle***REMOVED*** {
    switch (angle***REMOVED*** {
      case 90:
        return [1 - y - height, x, height, width];
      case 180:
        return [1 - x - width, 1 - y - height, width, height];
      case 270:
        return [y, 1 - x - width, height, width];
    ***REMOVED***
    return [x, y, width, height];
  ***REMOVED***
  rotate(angle***REMOVED*** {
    const {
      drawLayer
    ***REMOVED*** = this.parent;
    let box;
    if (this.#isFreeHighlight***REMOVED*** {
      angle = (angle - this.rotation + 360***REMOVED*** % 360;
      box = HighlightEditor.#rotateBbox(this.#highlightOutlines.box, angle***REMOVED***;
    ***REMOVED*** else {
      box = HighlightEditor.#rotateBbox([this.x, this.y, this.width, this.height], angle***REMOVED***;
    ***REMOVED***
    drawLayer.updateProperties(this.#id, {
      bbox: box,
      root: {
        "data-main-rotation": angle
      ***REMOVED***
    ***REMOVED******REMOVED***;
    drawLayer.updateProperties(this.#outlineId, {
      bbox: HighlightEditor.#rotateBbox(this.#focusOutlines.box, angle***REMOVED***,
      root: {
        "data-main-rotation": angle
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  render(***REMOVED*** {
    if (this.div***REMOVED*** {
      return this.div;
    ***REMOVED***
    const div = super.render(***REMOVED***;
    if (this.#text***REMOVED*** {
      div.setAttribute("aria-label", this.#text***REMOVED***;
      div.setAttribute("role", "mark"***REMOVED***;
    ***REMOVED***
    if (this.#isFreeHighlight***REMOVED*** {
      div.classList.add("free"***REMOVED***;
    ***REMOVED*** else {
      this.div.addEventListener("keydown", this.#keydown.bind(this***REMOVED***, {
        signal: this._uiManager._signal
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const highlightDiv = this.#highlightDiv = document.createElement("div"***REMOVED***;
    div.append(highlightDiv***REMOVED***;
    highlightDiv.setAttribute("aria-hidden", "true"***REMOVED***;
    highlightDiv.className = "internal";
    highlightDiv.style.clipPath = this.#clipPathId;
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(this.width * parentWidth, this.height * parentHeight***REMOVED***;
    bindEvents(this, this.#highlightDiv, ["pointerover", "pointerleave"]***REMOVED***;
    this.enableEditing(***REMOVED***;
    return div;
  ***REMOVED***
  pointerover(***REMOVED*** {
    if (!this.isSelected***REMOVED*** {
      this.parent?.drawLayer.updateProperties(this.#outlineId, {
        rootClass: {
          hovered: true
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  pointerleave(***REMOVED*** {
    if (!this.isSelected***REMOVED*** {
      this.parent?.drawLayer.updateProperties(this.#outlineId, {
        rootClass: {
          hovered: false
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #keydown(event***REMOVED*** {
    HighlightEditor._keyboardManager.exec(this, event***REMOVED***;
  ***REMOVED***
  _moveCaret(direction***REMOVED*** {
    this.parent.unselect(this***REMOVED***;
    switch (direction***REMOVED*** {
      case 0:
      case 2:
        this.#setCaret(true***REMOVED***;
        break;
      case 1:
      case 3:
        this.#setCaret(false***REMOVED***;
        break;
    ***REMOVED***
  ***REMOVED***
  #setCaret(start***REMOVED*** {
    if (!this.#anchorNode***REMOVED*** {
      return;
    ***REMOVED***
    const selection = window.getSelection(***REMOVED***;
    if (start***REMOVED*** {
      selection.setPosition(this.#anchorNode, this.#anchorOffset***REMOVED***;
    ***REMOVED*** else {
      selection.setPosition(this.#focusNode, this.#focusOffset***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  select(***REMOVED*** {
    super.select(***REMOVED***;
    if (!this.#outlineId***REMOVED*** {
      return;
    ***REMOVED***
    this.parent?.drawLayer.updateProperties(this.#outlineId, {
      rootClass: {
        hovered: false,
        selected: true
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  unselect(***REMOVED*** {
    super.unselect(***REMOVED***;
    if (!this.#outlineId***REMOVED*** {
      return;
    ***REMOVED***
    this.parent?.drawLayer.updateProperties(this.#outlineId, {
      rootClass: {
        selected: false
      ***REMOVED***
    ***REMOVED******REMOVED***;
    if (!this.#isFreeHighlight***REMOVED*** {
      this.#setCaret(false***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  get _mustFixPosition(***REMOVED*** {
    return !this.#isFreeHighlight;
  ***REMOVED***
  show(visible = this._isVisible***REMOVED*** {
    super.show(visible***REMOVED***;
    if (this.parent***REMOVED*** {
      this.parent.drawLayer.updateProperties(this.#id, {
        rootClass: {
          hidden: !visible
        ***REMOVED***
      ***REMOVED******REMOVED***;
      this.parent.drawLayer.updateProperties(this.#outlineId, {
        rootClass: {
          hidden: !visible
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #getRotation(***REMOVED*** {
    return this.#isFreeHighlight ? this.rotation : 0;
  ***REMOVED***
  #serializeBoxes(***REMOVED*** {
    if (this.#isFreeHighlight***REMOVED*** {
      return null;
    ***REMOVED***
    const [pageWidth, pageHeight] = this.pageDimensions;
    const [pageX, pageY] = this.pageTranslation;
    const boxes = this.#boxes;
    const quadPoints = new Float32Array(boxes.length * 8***REMOVED***;
    let i = 0;
    for (const {
      x,
      y,
      width,
      height
    ***REMOVED*** of boxes***REMOVED*** {
      const sx = x * pageWidth + pageX;
      const sy = (1 - y***REMOVED*** * pageHeight + pageY;
      quadPoints[i] = quadPoints[i + 4] = sx;
      quadPoints[i + 1] = quadPoints[i + 3] = sy;
      quadPoints[i + 2] = quadPoints[i + 6] = sx + width * pageWidth;
      quadPoints[i + 5] = quadPoints[i + 7] = sy - height * pageHeight;
      i += 8;
    ***REMOVED***
    return quadPoints;
  ***REMOVED***
  #serializeOutlines(rect***REMOVED*** {
    return this.#highlightOutlines.serialize(rect, this.#getRotation(***REMOVED******REMOVED***;
  ***REMOVED***
  static startHighlighting(parent, isLTR, {
    target: textLayer,
    x,
    y
  ***REMOVED******REMOVED*** {
    const {
      x: layerX,
      y: layerY,
      width: parentWidth,
      height: parentHeight
    ***REMOVED*** = textLayer.getBoundingClientRect(***REMOVED***;
    const ac = new AbortController(***REMOVED***;
    const signal = parent.combinedSignal(ac***REMOVED***;
    const pointerUpCallback = e => {
      ac.abort(***REMOVED***;
      this.#endHighlight(parent, e***REMOVED***;
    ***REMOVED***;
    window.addEventListener("blur", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("pointerup", pointerUpCallback, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("pointerdown", stopEvent, {
      capture: true,
      passive: false,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    textLayer.addEventListener("pointermove", this.#highlightMove.bind(this, parent***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this._freeHighlight = new FreeHighlightOutliner({
      x,
      y
    ***REMOVED***, [layerX, layerY, parentWidth, parentHeight], parent.scale, this._defaultThickness / 2, isLTR, 0.001***REMOVED***;
    ({
      id: this._freeHighlightId,
      clipPathId: this._freeHighlightClipId
    ***REMOVED*** = parent.drawLayer.draw({
      bbox: [0, 0, 1, 1],
      root: {
        viewBox: "0 0 1 1",
        fill: this._defaultColor,
        "fill-opacity": this._defaultOpacity
      ***REMOVED***,
      rootClass: {
        highlight: true,
        free: true
      ***REMOVED***,
      path: {
        d: this._freeHighlight.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***, true, true***REMOVED******REMOVED***;
  ***REMOVED***
  static #highlightMove(parent, event***REMOVED*** {
    if (this._freeHighlight.add(event***REMOVED******REMOVED*** {
      parent.drawLayer.updateProperties(this._freeHighlightId, {
        path: {
          d: this._freeHighlight.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  static #endHighlight(parent, event***REMOVED*** {
    if (!this._freeHighlight.isEmpty(***REMOVED******REMOVED*** {
      parent.createAndAddNewEditor(event, false, {
        highlightId: this._freeHighlightId,
        highlightOutlines: this._freeHighlight.getOutlines(***REMOVED***,
        clipPathId: this._freeHighlightClipId,
        methodOfCreation: "main_toolbar"
      ***REMOVED******REMOVED***;
    ***REMOVED*** else {
      parent.drawLayer.remove(this._freeHighlightId***REMOVED***;
    ***REMOVED***
    this._freeHighlightId = -1;
    this._freeHighlight = null;
    this._freeHighlightClipId = "";
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    let initialData = null;
    if (data instanceof HighlightAnnotationElement***REMOVED*** {
      const {
        data: {
          quadPoints,
          rect,
          rotation,
          id,
          color,
          opacity,
          popupRef
        ***REMOVED***,
        parent: {
          page: {
            pageNumber
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** = data;
      initialData = data = {
        annotationType: AnnotationEditorType.HIGHLIGHT,
        color: Array.from(color***REMOVED***,
        opacity,
        quadPoints,
        boxes: null,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0***REMOVED***,
        rotation,
        id,
        deleted: false,
        popupRef
      ***REMOVED***;
    ***REMOVED*** else if (data instanceof InkAnnotationElement***REMOVED*** {
      const {
        data: {
          inkLists,
          rect,
          rotation,
          id,
          color,
          borderStyle: {
            rawWidth: thickness
          ***REMOVED***,
          popupRef
        ***REMOVED***,
        parent: {
          page: {
            pageNumber
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** = data;
      initialData = data = {
        annotationType: AnnotationEditorType.HIGHLIGHT,
        color: Array.from(color***REMOVED***,
        thickness,
        inkLists,
        boxes: null,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0***REMOVED***,
        rotation,
        id,
        deleted: false,
        popupRef
      ***REMOVED***;
    ***REMOVED***
    const {
      color,
      quadPoints,
      inkLists,
      opacity
    ***REMOVED*** = data;
    const editor = await super.deserialize(data, parent, uiManager***REMOVED***;
    editor.color = Util.makeHexColor(...color***REMOVED***;
    editor.#opacity = opacity || 1;
    if (inkLists***REMOVED*** {
      editor.#thickness = data.thickness;
    ***REMOVED***
    editor.annotationElementId = data.id || null;
    editor._initialData = initialData;
    const [pageWidth, pageHeight] = editor.pageDimensions;
    const [pageX, pageY] = editor.pageTranslation;
    if (quadPoints***REMOVED*** {
      const boxes = editor.#boxes = [];
      for (let i = 0; i < quadPoints.length; i += 8***REMOVED*** {
        boxes.push({
          x: (quadPoints[i] - pageX***REMOVED*** / pageWidth,
          y: 1 - (quadPoints[i + 1] - pageY***REMOVED*** / pageHeight,
          width: (quadPoints[i + 2] - quadPoints[i]***REMOVED*** / pageWidth,
          height: (quadPoints[i + 1] - quadPoints[i + 5]***REMOVED*** / pageHeight
        ***REMOVED******REMOVED***;
      ***REMOVED***
      editor.#createOutlines(***REMOVED***;
      editor.#addToDrawLayer(***REMOVED***;
      editor.rotate(editor.rotation***REMOVED***;
    ***REMOVED*** else if (inkLists***REMOVED*** {
      editor.#isFreeHighlight = true;
      const points = inkLists[0];
      const point = {
        x: points[0] - pageX,
        y: pageHeight - (points[1] - pageY***REMOVED***
      ***REMOVED***;
      const outliner = new FreeHighlightOutliner(point, [0, 0, pageWidth, pageHeight], 1, editor.#thickness / 2, true, 0.001***REMOVED***;
      for (let i = 0, ii = points.length; i < ii; i += 2***REMOVED*** {
        point.x = points[i] - pageX;
        point.y = pageHeight - (points[i + 1] - pageY***REMOVED***;
        outliner.add(point***REMOVED***;
      ***REMOVED***
      const {
        id,
        clipPathId
      ***REMOVED*** = parent.drawLayer.draw({
        bbox: [0, 0, 1, 1],
        root: {
          viewBox: "0 0 1 1",
          fill: editor.color,
          "fill-opacity": editor._defaultOpacity
        ***REMOVED***,
        rootClass: {
          highlight: true,
          free: true
        ***REMOVED***,
        path: {
          d: outliner.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED***, true, true***REMOVED***;
      editor.#createFreeOutlines({
        highlightOutlines: outliner.getOutlines(***REMOVED***,
        highlightId: id,
        clipPathId
      ***REMOVED******REMOVED***;
      editor.#addToDrawLayer(***REMOVED***;
    ***REMOVED***
    return editor;
  ***REMOVED***
  serialize(isForCopying = false***REMOVED*** {
    if (this.isEmpty(***REMOVED*** || isForCopying***REMOVED*** {
      return null;
    ***REMOVED***
    if (this.deleted***REMOVED*** {
      return this.serializeDeleted(***REMOVED***;
    ***REMOVED***
    const rect = this.getRect(0, 0***REMOVED***;
    const color = AnnotationEditor._colorManager.convert(this.color***REMOVED***;
    const serialized = {
      annotationType: AnnotationEditorType.HIGHLIGHT,
      color,
      opacity: this.#opacity,
      thickness: this.#thickness,
      quadPoints: this.#serializeBoxes(***REMOVED***,
      outlines: this.#serializeOutlines(rect***REMOVED***,
      pageIndex: this.pageIndex,
      rect,
      rotation: this.#getRotation(***REMOVED***,
      structTreeParentId: this._structTreeParentId
    ***REMOVED***;
    if (this.annotationElementId && !this.#hasElementChanged(serialized***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    serialized.id = this.annotationElementId;
    return serialized;
  ***REMOVED***
  #hasElementChanged(serialized***REMOVED*** {
    const {
      color
    ***REMOVED*** = this._initialData;
    return serialized.color.some((c, i***REMOVED*** => c !== color[i]***REMOVED***;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    annotation.updateEdited({
      rect: this.getRect(0, 0***REMOVED***
    ***REMOVED******REMOVED***;
    return null;
  ***REMOVED***
  static canCreateNewEmptyEditor(***REMOVED*** {
    return false;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/draw.js



class DrawingOptions {
  #svgProperties = Object.create(null***REMOVED***;
  updateProperty(name, value***REMOVED*** {
    this[name] = value;
    this.updateSVGProperty(name, value***REMOVED***;
  ***REMOVED***
  updateProperties(properties***REMOVED*** {
    if (!properties***REMOVED*** {
      return;
    ***REMOVED***
    for (const [name, value] of Object.entries(properties***REMOVED******REMOVED*** {
      this.updateProperty(name, value***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateSVGProperty(name, value***REMOVED*** {
    this.#svgProperties[name] = value;
  ***REMOVED***
  toSVGProperties(***REMOVED*** {
    const root = this.#svgProperties;
    this.#svgProperties = Object.create(null***REMOVED***;
***REMOVED***
      root
    ***REMOVED***;
  ***REMOVED***
  reset(***REMOVED*** {
    this.#svgProperties = Object.create(null***REMOVED***;
  ***REMOVED***
  updateAll(options = this***REMOVED*** {
    this.updateProperties(options***REMOVED***;
  ***REMOVED***
  clone(***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
***REMOVED***
class DrawingEditor extends AnnotationEditor {
  #drawOutlines = null;
  #mustBeCommitted;
  _drawId = null;
  static _currentDrawId = -1;
  static _currentParent = null;
  static #currentDraw = null;
  static #currentDrawingAC = null;
  static #currentDrawingOptions = null;
  static #currentPointerId = NaN;
  static #currentPointerType = null;
  static #currentPointerIds = null;
  static #currentMoveTimestamp = NaN;
  static _INNER_MARGIN = 3;
  constructor(params***REMOVED*** {
    super(params***REMOVED***;
    this.#mustBeCommitted = params.mustBeCommitted || false;
    if (params.drawOutlines***REMOVED*** {
      this.#createDrawOutlines(params***REMOVED***;
      this.#addToDrawLayer(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #createDrawOutlines({
    drawOutlines,
    drawId,
    drawingOptions
  ***REMOVED******REMOVED*** {
    this.#drawOutlines = drawOutlines;
    this._drawingOptions ||= drawingOptions;
    if (drawId >= 0***REMOVED*** {
      this._drawId = drawId;
      this.parent.drawLayer.finalizeDraw(drawId, drawOutlines.defaultProperties***REMOVED***;
    ***REMOVED*** else {
      this._drawId = this.#createDrawing(drawOutlines, this.parent***REMOVED***;
    ***REMOVED***
    this.#updateBbox(drawOutlines.box***REMOVED***;
  ***REMOVED***
  #createDrawing(drawOutlines, parent***REMOVED*** {
    const {
      id
    ***REMOVED*** = parent.drawLayer.draw(DrawingEditor._mergeSVGProperties(this._drawingOptions.toSVGProperties(***REMOVED***, drawOutlines.defaultSVGProperties***REMOVED***, false, false***REMOVED***;
    return id;
  ***REMOVED***
  static _mergeSVGProperties(p1, p2***REMOVED*** {
    const p1Keys = new Set(Object.keys(p1***REMOVED******REMOVED***;
    for (const [key, value] of Object.entries(p2***REMOVED******REMOVED*** {
      if (p1Keys.has(key***REMOVED******REMOVED*** {
        Object.assign(p1[key], value***REMOVED***;
      ***REMOVED*** else {
        p1[key] = value;
      ***REMOVED***
    ***REMOVED***
    return p1;
  ***REMOVED***
  static getDefaultDrawingOptions(_options***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
  static get typesMap(***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
  static get isDrawer(***REMOVED*** {
    return true;
  ***REMOVED***
  static get supportMultipleDrawings(***REMOVED*** {
    return false;
  ***REMOVED***
  static updateDefaultParams(type, value***REMOVED*** {
    const propertyName = this.typesMap.get(type***REMOVED***;
    if (propertyName***REMOVED*** {
      this._defaultDrawingOptions.updateProperty(propertyName, value***REMOVED***;
    ***REMOVED***
    if (this._currentParent***REMOVED*** {
      DrawingEditor.#currentDraw.updateProperty(propertyName, value***REMOVED***;
      this._currentParent.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties(***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateParams(type, value***REMOVED*** {
    const propertyName = this.constructor.typesMap.get(type***REMOVED***;
    if (propertyName***REMOVED*** {
      this._updateProperty(type, propertyName, value***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  static get defaultPropertiesToUpdate(***REMOVED*** {
    const properties = [];
    const options = this._defaultDrawingOptions;
    for (const [type, name] of this.typesMap***REMOVED*** {
      properties.push([type, options[name]]***REMOVED***;
    ***REMOVED***
    return properties;
  ***REMOVED***
  get propertiesToUpdate(***REMOVED*** {
    const properties = [];
    const {
      _drawingOptions
    ***REMOVED*** = this;
    for (const [type, name] of this.constructor.typesMap***REMOVED*** {
      properties.push([type, _drawingOptions[name]]***REMOVED***;
    ***REMOVED***
    return properties;
  ***REMOVED***
  _updateProperty(type, name, value***REMOVED*** {
    const options = this._drawingOptions;
    const savedValue = options[name];
    const setter = val => {
      options.updateProperty(name, val***REMOVED***;
      const bbox = this.#drawOutlines.updateProperty(name, val***REMOVED***;
      if (bbox***REMOVED*** {
        this.#updateBbox(bbox***REMOVED***;
      ***REMOVED***
      this.parent?.drawLayer.updateProperties(this._drawId, options.toSVGProperties(***REMOVED******REMOVED***;
    ***REMOVED***;
    this.addCommands({
      cmd: setter.bind(this, value***REMOVED***,
      undo: setter.bind(this, savedValue***REMOVED***,
      post: this._uiManager.updateUI.bind(this._uiManager, this***REMOVED***,
      mustExec: true,
      type,
      overwriteIfSameType: true,
      keepUndo: true
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _onResizing(***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, DrawingEditor._mergeSVGProperties(this.#drawOutlines.getPathResizingSVGProperties(this.#convertToDrawSpace(***REMOVED******REMOVED***, {
      bbox: this.#rotateBox(***REMOVED***
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  _onResized(***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, DrawingEditor._mergeSVGProperties(this.#drawOutlines.getPathResizedSVGProperties(this.#convertToDrawSpace(***REMOVED******REMOVED***, {
      bbox: this.#rotateBox(***REMOVED***
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  _onTranslating(x, y***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      bbox: this.#rotateBox(x, y***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _onTranslated(***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, DrawingEditor._mergeSVGProperties(this.#drawOutlines.getPathTranslatedSVGProperties(this.#convertToDrawSpace(***REMOVED***, this.parentDimensions***REMOVED***, {
      bbox: this.#rotateBox(***REMOVED***
    ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  _onStartDragging(***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: true
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  _onStopDragging(***REMOVED*** {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: false
      ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  commit(***REMOVED*** {
    super.commit(***REMOVED***;
    this.disableEditMode(***REMOVED***;
    this.disableEditing(***REMOVED***;
  ***REMOVED***
  disableEditing(***REMOVED*** {
    super.disableEditing(***REMOVED***;
    this.div.classList.toggle("disabled", true***REMOVED***;
  ***REMOVED***
  enableEditing(***REMOVED*** {
    super.enableEditing(***REMOVED***;
    this.div.classList.toggle("disabled", false***REMOVED***;
  ***REMOVED***
  getBaseTranslation(***REMOVED*** {
    return [0, 0];
  ***REMOVED***
  get isResizable(***REMOVED*** {
    return true;
  ***REMOVED***
  onceAdded(focus***REMOVED*** {
    if (!this.annotationElementId***REMOVED*** {
      this.parent.addUndoableEditor(this***REMOVED***;
    ***REMOVED***
    this._isDraggable = true;
    if (this.#mustBeCommitted***REMOVED*** {
      this.#mustBeCommitted = false;
      this.commit(***REMOVED***;
      this.parent.setSelected(this***REMOVED***;
      if (focus && this.isOnScreen***REMOVED*** {
        this.div.focus(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  remove(***REMOVED*** {
    this.#cleanDrawLayer(***REMOVED***;
    super.remove(***REMOVED***;
  ***REMOVED***
  rebuild(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    super.rebuild(***REMOVED***;
    if (this.div === null***REMOVED*** {
      return;
    ***REMOVED***
    this.#addToDrawLayer(***REMOVED***;
    this.#updateBbox(this.#drawOutlines.box***REMOVED***;
    if (!this.isAttachedToDOM***REMOVED*** {
      this.parent.add(this***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  setParent(parent***REMOVED*** {
    let mustBeSelected = false;
    if (this.parent && !parent***REMOVED*** {
      this._uiManager.removeShouldRescale(this***REMOVED***;
      this.#cleanDrawLayer(***REMOVED***;
    ***REMOVED*** else if (parent***REMOVED*** {
      this._uiManager.addShouldRescale(this***REMOVED***;
      this.#addToDrawLayer(parent***REMOVED***;
      mustBeSelected = !this.parent && this.div?.classList.contains("selectedEditor"***REMOVED***;
    ***REMOVED***
    super.setParent(parent***REMOVED***;
    if (mustBeSelected***REMOVED*** {
      this.select(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #cleanDrawLayer(***REMOVED*** {
    if (this._drawId === null || !this.parent***REMOVED*** {
      return;
    ***REMOVED***
    this.parent.drawLayer.remove(this._drawId***REMOVED***;
    this._drawId = null;
    this._drawingOptions.reset(***REMOVED***;
  ***REMOVED***
  #addToDrawLayer(parent = this.parent***REMOVED*** {
    if (this._drawId !== null && this.parent === parent***REMOVED*** {
      return;
    ***REMOVED***
    if (this._drawId !== null***REMOVED*** {
      this.parent.drawLayer.updateParent(this._drawId, parent.drawLayer***REMOVED***;
      return;
    ***REMOVED***
    this._drawingOptions.updateAll(***REMOVED***;
    this._drawId = this.#createDrawing(this.#drawOutlines, parent***REMOVED***;
  ***REMOVED***
  #convertToParentSpace([x, y, width, height]***REMOVED*** {
    const {
      parentDimensions: [pW, pH],
      rotation
    ***REMOVED*** = this;
    switch (rotation***REMOVED*** {
      case 90:
        return [y, 1 - x, width * (pH / pW***REMOVED***, height * (pW / pH***REMOVED***];
      case 180:
        return [1 - x, 1 - y, width, height];
      case 270:
        return [1 - y, x, width * (pH / pW***REMOVED***, height * (pW / pH***REMOVED***];
      default:
        return [x, y, width, height];
    ***REMOVED***
  ***REMOVED***
  #convertToDrawSpace(***REMOVED*** {
    const {
      x,
      y,
      width,
      height,
      parentDimensions: [pW, pH],
      rotation
    ***REMOVED*** = this;
    switch (rotation***REMOVED*** {
      case 90:
        return [1 - y, x, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      case 180:
        return [1 - x, 1 - y, width, height];
      case 270:
        return [y, 1 - x, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      default:
        return [x, y, width, height];
    ***REMOVED***
  ***REMOVED***
  #updateBbox(bbox***REMOVED*** {
    [this.x, this.y, this.width, this.height] = this.#convertToParentSpace(bbox***REMOVED***;
    if (this.div***REMOVED*** {
      this.fixAndSetPosition(***REMOVED***;
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setDims(this.width * parentWidth, this.height * parentHeight***REMOVED***;
    ***REMOVED***
    this._onResized(***REMOVED***;
  ***REMOVED***
  #rotateBox(***REMOVED*** {
    const {
      x,
      y,
      width,
      height,
      rotation,
      parentRotation,
      parentDimensions: [pW, pH]
    ***REMOVED*** = this;
    switch ((rotation * 4 + parentRotation***REMOVED*** / 90***REMOVED*** {
      case 1:
        return [1 - y - height, x, height, width];
      case 2:
        return [1 - x - width, 1 - y - height, width, height];
      case 3:
        return [y, 1 - x - width, height, width];
      case 4:
        return [x, y - width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***];
      case 5:
        return [1 - y, x, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      case 6:
        return [1 - x - height * (pH / pW***REMOVED***, 1 - y, height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***];
      case 7:
        return [y - width * (pW / pH***REMOVED***, 1 - x - height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      case 8:
        return [x - width, y - height, width, height];
      case 9:
        return [1 - y, x - width, height, width];
      case 10:
        return [1 - x, 1 - y, width, height];
      case 11:
        return [y - height, 1 - x, height, width];
      case 12:
        return [x - height * (pH / pW***REMOVED***, y, height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***];
      case 13:
        return [1 - y - width * (pW / pH***REMOVED***, x - height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      case 14:
        return [1 - x, 1 - y - width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***, width * (pW / pH***REMOVED***];
      case 15:
        return [y, 1 - x, width * (pW / pH***REMOVED***, height * (pH / pW***REMOVED***];
      default:
        return [x, y, width, height];
    ***REMOVED***
  ***REMOVED***
  rotate(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    this.parent.drawLayer.updateProperties(this._drawId, DrawingEditor._mergeSVGProperties({
      bbox: this.#rotateBox(***REMOVED***
    ***REMOVED***, this.#drawOutlines.updateRotation((this.parentRotation - this.rotation + 360***REMOVED*** % 360***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***
  onScaleChanging(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    this.#updateBbox(this.#drawOutlines.updateParentDimensions(this.parentDimensions, this.parent.scale***REMOVED******REMOVED***;
  ***REMOVED***
  static onScaleChangingWhenDrawing(***REMOVED*** {***REMOVED***
  render(***REMOVED*** {
    if (this.div***REMOVED*** {
      return this.div;
    ***REMOVED***
    const div = super.render(***REMOVED***;
    div.classList.add("draw"***REMOVED***;
    const drawDiv = document.createElement("div"***REMOVED***;
    div.append(drawDiv***REMOVED***;
    drawDiv.setAttribute("aria-hidden", "true"***REMOVED***;
    drawDiv.className = "internal";
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(this.width * parentWidth, this.height * parentHeight***REMOVED***;
    this._uiManager.addShouldRescale(this***REMOVED***;
    this.disableEditing(***REMOVED***;
    return div;
  ***REMOVED***
  static createDrawerInstance(_x, _y, _parentWidth, _parentHeight, _rotation***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
  static startDrawing(parent, uiManager, _isLTR, event***REMOVED*** {
    const {
      target,
      offsetX: x,
      offsetY: y,
      pointerId,
      pointerType
    ***REMOVED*** = event;
    if (DrawingEditor.#currentPointerType && DrawingEditor.#currentPointerType !== pointerType***REMOVED*** {
      return;
    ***REMOVED***
    const {
      viewport: {
        rotation
      ***REMOVED***
    ***REMOVED*** = parent;
    const {
      width: parentWidth,
      height: parentHeight
    ***REMOVED*** = target.getBoundingClientRect(***REMOVED***;
    const ac = DrawingEditor.#currentDrawingAC = new AbortController(***REMOVED***;
    const signal = parent.combinedSignal(ac***REMOVED***;
    DrawingEditor.#currentPointerId ||= pointerId;
    DrawingEditor.#currentPointerType ??= pointerType;
    window.addEventListener("pointerup", e => {
      if (DrawingEditor.#currentPointerId === e.pointerId***REMOVED*** {
        this._endDraw(e***REMOVED***;
      ***REMOVED*** else {
        DrawingEditor.#currentPointerIds?.delete(e.pointerId***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("pointercancel", e => {
      if (DrawingEditor.#currentPointerId === e.pointerId***REMOVED*** {
        this._currentParent.endDrawingSession(***REMOVED***;
      ***REMOVED*** else {
        DrawingEditor.#currentPointerIds?.delete(e.pointerId***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("pointerdown", e => {
      if (DrawingEditor.#currentPointerType !== e.pointerType***REMOVED*** {
        return;
      ***REMOVED***
      (DrawingEditor.#currentPointerIds ||= new Set(***REMOVED******REMOVED***.add(e.pointerId***REMOVED***;
      if (DrawingEditor.#currentDraw.isCancellable(***REMOVED******REMOVED*** {
        DrawingEditor.#currentDraw.removeLastElement(***REMOVED***;
        if (DrawingEditor.#currentDraw.isEmpty(***REMOVED******REMOVED*** {
          this._currentParent.endDrawingSession(true***REMOVED***;
        ***REMOVED*** else {
          this._endDraw(null***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***, {
      capture: true,
      passive: false,
      signal
    ***REMOVED******REMOVED***;
    window.addEventListener("contextmenu", noContextMenu, {
      signal
    ***REMOVED******REMOVED***;
    target.addEventListener("pointermove", this._drawMove.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    target.addEventListener("touchmove", e => {
      if (e.timeStamp === DrawingEditor.#currentMoveTimestamp***REMOVED*** {
        stopEvent(e***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    parent.toggleDrawing(***REMOVED***;
    uiManager._editorUndoBar?.hide(***REMOVED***;
    if (DrawingEditor.#currentDraw***REMOVED*** {
      parent.drawLayer.updateProperties(this._currentDrawId, DrawingEditor.#currentDraw.startNew(x, y, parentWidth, parentHeight, rotation***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    uiManager.updateUIForDefaultProperties(this***REMOVED***;
    DrawingEditor.#currentDraw = this.createDrawerInstance(x, y, parentWidth, parentHeight, rotation***REMOVED***;
    DrawingEditor.#currentDrawingOptions = this.getDefaultDrawingOptions(***REMOVED***;
    this._currentParent = parent;
    ({
      id: this._currentDrawId
    ***REMOVED*** = parent.drawLayer.draw(this._mergeSVGProperties(DrawingEditor.#currentDrawingOptions.toSVGProperties(***REMOVED***, DrawingEditor.#currentDraw.defaultSVGProperties***REMOVED***, true, false***REMOVED******REMOVED***;
  ***REMOVED***
  static _drawMove(event***REMOVED*** {
    DrawingEditor.#currentMoveTimestamp = -1;
    if (!DrawingEditor.#currentDraw***REMOVED*** {
      return;
    ***REMOVED***
    const {
      offsetX,
      offsetY,
      pointerId
    ***REMOVED*** = event;
    if (DrawingEditor.#currentPointerId !== pointerId***REMOVED*** {
      return;
    ***REMOVED***
    if (DrawingEditor.#currentPointerIds?.size >= 1***REMOVED*** {
      this._endDraw(event***REMOVED***;
      return;
    ***REMOVED***
    this._currentParent.drawLayer.updateProperties(this._currentDrawId, DrawingEditor.#currentDraw.add(offsetX, offsetY***REMOVED******REMOVED***;
    DrawingEditor.#currentMoveTimestamp = event.timeStamp;
    stopEvent(event***REMOVED***;
  ***REMOVED***
  static _cleanup(all***REMOVED*** {
    if (all***REMOVED*** {
      this._currentDrawId = -1;
      this._currentParent = null;
      DrawingEditor.#currentDraw = null;
      DrawingEditor.#currentDrawingOptions = null;
      DrawingEditor.#currentPointerType = null;
      DrawingEditor.#currentMoveTimestamp = NaN;
    ***REMOVED***
    if (DrawingEditor.#currentDrawingAC***REMOVED*** {
      DrawingEditor.#currentDrawingAC.abort(***REMOVED***;
      DrawingEditor.#currentDrawingAC = null;
      DrawingEditor.#currentPointerId = NaN;
      DrawingEditor.#currentPointerIds = null;
    ***REMOVED***
  ***REMOVED***
  static _endDraw(event***REMOVED*** {
    const parent = this._currentParent;
    if (!parent***REMOVED*** {
      return;
    ***REMOVED***
    parent.toggleDrawing(true***REMOVED***;
    this._cleanup(false***REMOVED***;
    if (event***REMOVED*** {
      parent.drawLayer.updateProperties(this._currentDrawId, DrawingEditor.#currentDraw.end(event.offsetX, event.offsetY***REMOVED******REMOVED***;
    ***REMOVED***
    if (this.supportMultipleDrawings***REMOVED*** {
      const draw = DrawingEditor.#currentDraw;
      const drawId = this._currentDrawId;
      const lastElement = draw.getLastElement(***REMOVED***;
      parent.addCommands({
        cmd: (***REMOVED*** => {
          parent.drawLayer.updateProperties(drawId, draw.setLastElement(lastElement***REMOVED******REMOVED***;
        ***REMOVED***,
        undo: (***REMOVED*** => {
          parent.drawLayer.updateProperties(drawId, draw.removeLastElement(***REMOVED******REMOVED***;
        ***REMOVED***,
        mustExec: false,
        type: AnnotationEditorParamsType.DRAW_STEP
      ***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    this.endDrawing(false***REMOVED***;
  ***REMOVED***
  static endDrawing(isAborted***REMOVED*** {
    const parent = this._currentParent;
    if (!parent***REMOVED*** {
      return null;
    ***REMOVED***
    parent.toggleDrawing(true***REMOVED***;
    parent.cleanUndoStack(AnnotationEditorParamsType.DRAW_STEP***REMOVED***;
    if (!DrawingEditor.#currentDraw.isEmpty(***REMOVED******REMOVED*** {
      const {
        pageDimensions: [pageWidth, pageHeight],
        scale
      ***REMOVED*** = parent;
      const editor = parent.createAndAddNewEditor({
        offsetX: 0,
        offsetY: 0
      ***REMOVED***, false, {
        drawId: this._currentDrawId,
        drawOutlines: DrawingEditor.#currentDraw.getOutlines(pageWidth * scale, pageHeight * scale, scale, this._INNER_MARGIN***REMOVED***,
        drawingOptions: DrawingEditor.#currentDrawingOptions,
        mustBeCommitted: !isAborted
      ***REMOVED******REMOVED***;
      this._cleanup(true***REMOVED***;
      return editor;
    ***REMOVED***
    parent.drawLayer.remove(this._currentDrawId***REMOVED***;
    this._cleanup(true***REMOVED***;
    return null;
  ***REMOVED***
  createDrawingOptions(_data***REMOVED*** {***REMOVED***
  static deserializeDraw(_pageX, _pageY, _pageWidth, _pageHeight, _innerWidth, _data***REMOVED*** {
    unreachable("Not implemented"***REMOVED***;
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    const {
      rawDims: {
        pageWidth,
        pageHeight,
        pageX,
        pageY
      ***REMOVED***
    ***REMOVED*** = parent.viewport;
    const drawOutlines = this.deserializeDraw(pageX, pageY, pageWidth, pageHeight, this._INNER_MARGIN, data***REMOVED***;
    const editor = await super.deserialize(data, parent, uiManager***REMOVED***;
    editor.createDrawingOptions(data***REMOVED***;
    editor.#createDrawOutlines({
      drawOutlines
    ***REMOVED******REMOVED***;
    editor.#addToDrawLayer(***REMOVED***;
    editor.onScaleChanging(***REMOVED***;
    editor.rotate(***REMOVED***;
    return editor;
  ***REMOVED***
  serializeDraw(isForCopying***REMOVED*** {
    const [pageX, pageY] = this.pageTranslation;
    const [pageWidth, pageHeight] = this.pageDimensions;
    return this.#drawOutlines.serialize([pageX, pageY, pageWidth, pageHeight], isForCopying***REMOVED***;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    annotation.updateEdited({
      rect: this.getRect(0, 0***REMOVED***
    ***REMOVED******REMOVED***;
    return null;
  ***REMOVED***
  static canCreateNewEmptyEditor(***REMOVED*** {
    return false;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/drawers/inkdraw.js


class InkDrawOutliner {
  #last = new Float64Array(6***REMOVED***;
  #line;
  #lines;
  #rotation;
  #thickness;
  #points;
  #lastSVGPath = "";
  #lastIndex = 0;
  #outlines = new InkDrawOutline(***REMOVED***;
  #parentWidth;
  #parentHeight;
  constructor(x, y, parentWidth, parentHeight, rotation, thickness***REMOVED*** {
    this.#parentWidth = parentWidth;
    this.#parentHeight = parentHeight;
    this.#rotation = rotation;
    this.#thickness = thickness;
    [x, y] = this.#normalizePoint(x, y***REMOVED***;
    const line = this.#line = [NaN, NaN, NaN, NaN, x, y];
    this.#points = [x, y];
    this.#lines = [{
      line,
      points: this.#points
    ***REMOVED***];
    this.#last.set(line, 0***REMOVED***;
  ***REMOVED***
  updateProperty(name, value***REMOVED*** {
    if (name === "stroke-width"***REMOVED*** {
      this.#thickness = value;
    ***REMOVED***
  ***REMOVED***
  #normalizePoint(x, y***REMOVED*** {
    return Outline._normalizePoint(x, y, this.#parentWidth, this.#parentHeight, this.#rotation***REMOVED***;
  ***REMOVED***
  isEmpty(***REMOVED*** {
    return !this.#lines || this.#lines.length === 0;
  ***REMOVED***
  isCancellable(***REMOVED*** {
    return this.#points.length <= 10;
  ***REMOVED***
  add(x, y***REMOVED*** {
    [x, y] = this.#normalizePoint(x, y***REMOVED***;
    const [x1, y1, x2, y2] = this.#last.subarray(2, 6***REMOVED***;
    const diffX = x - x2;
    const diffY = y - y2;
    const d = Math.hypot(this.#parentWidth * diffX, this.#parentHeight * diffY***REMOVED***;
    if (d <= 2***REMOVED*** {
      return null;
    ***REMOVED***
    this.#points.push(x, y***REMOVED***;
    if (isNaN(x1***REMOVED******REMOVED*** {
      this.#last.set([x2, y2, x, y], 2***REMOVED***;
      this.#line.push(NaN, NaN, NaN, NaN, x, y***REMOVED***;
  ***REMOVED***
        path: {
          d: this.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
    if (isNaN(this.#last[0]***REMOVED******REMOVED*** {
      this.#line.splice(6, 6***REMOVED***;
    ***REMOVED***
    this.#last.set([x1, y1, x2, y2, x, y], 0***REMOVED***;
    this.#line.push(...Outline.createBezierPoints(x1, y1, x2, y2, x, y***REMOVED******REMOVED***;
***REMOVED***
      path: {
        d: this.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  end(x, y***REMOVED*** {
    const change = this.add(x, y***REMOVED***;
    if (change***REMOVED*** {
      return change;
    ***REMOVED***
    if (this.#points.length === 2***REMOVED*** {
  ***REMOVED***
        path: {
          d: this.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
    return null;
  ***REMOVED***
  startNew(x, y, parentWidth, parentHeight, rotation***REMOVED*** {
    this.#parentWidth = parentWidth;
    this.#parentHeight = parentHeight;
    this.#rotation = rotation;
    [x, y] = this.#normalizePoint(x, y***REMOVED***;
    const line = this.#line = [NaN, NaN, NaN, NaN, x, y];
    this.#points = [x, y];
    const last = this.#lines.at(-1***REMOVED***;
    if (last***REMOVED*** {
      last.line = new Float32Array(last.line***REMOVED***;
      last.points = new Float32Array(last.points***REMOVED***;
    ***REMOVED***
    this.#lines.push({
      line,
      points: this.#points
    ***REMOVED******REMOVED***;
    this.#last.set(line, 0***REMOVED***;
    this.#lastIndex = 0;
    this.toSVGPath(***REMOVED***;
    return null;
  ***REMOVED***
  getLastElement(***REMOVED*** {
    return this.#lines.at(-1***REMOVED***;
  ***REMOVED***
  setLastElement(element***REMOVED*** {
    if (!this.#lines***REMOVED*** {
      return this.#outlines.setLastElement(element***REMOVED***;
    ***REMOVED***
    this.#lines.push(element***REMOVED***;
    this.#line = element.line;
    this.#points = element.points;
    this.#lastIndex = 0;
***REMOVED***
      path: {
        d: this.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  removeLastElement(***REMOVED*** {
    if (!this.#lines***REMOVED*** {
      return this.#outlines.removeLastElement(***REMOVED***;
    ***REMOVED***
    this.#lines.pop(***REMOVED***;
    this.#lastSVGPath = "";
    for (let i = 0, ii = this.#lines.length; i < ii; i++***REMOVED*** {
      const {
        line,
        points
      ***REMOVED*** = this.#lines[i];
      this.#line = line;
      this.#points = points;
      this.#lastIndex = 0;
      this.toSVGPath(***REMOVED***;
    ***REMOVED***
***REMOVED***
      path: {
        d: this.#lastSVGPath
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  toSVGPath(***REMOVED*** {
    const firstX = Outline.svgRound(this.#line[4]***REMOVED***;
    const firstY = Outline.svgRound(this.#line[5]***REMOVED***;
    if (this.#points.length === 2***REMOVED*** {
      this.#lastSVGPath = `${this.#lastSVGPath***REMOVED*** M ${firstX***REMOVED*** ${firstY***REMOVED*** Z`;
      return this.#lastSVGPath;
    ***REMOVED***
    if (this.#points.length <= 6***REMOVED*** {
      const i = this.#lastSVGPath.lastIndexOf("M"***REMOVED***;
      this.#lastSVGPath = `${this.#lastSVGPath.slice(0, i***REMOVED******REMOVED*** M ${firstX***REMOVED*** ${firstY***REMOVED***`;
      this.#lastIndex = 6;
    ***REMOVED***
    if (this.#points.length === 4***REMOVED*** {
      const secondX = Outline.svgRound(this.#line[10]***REMOVED***;
      const secondY = Outline.svgRound(this.#line[11]***REMOVED***;
      this.#lastSVGPath = `${this.#lastSVGPath***REMOVED*** L ${secondX***REMOVED*** ${secondY***REMOVED***`;
      this.#lastIndex = 12;
      return this.#lastSVGPath;
    ***REMOVED***
    const buffer = [];
    if (this.#lastIndex === 0***REMOVED*** {
      buffer.push(`M ${firstX***REMOVED*** ${firstY***REMOVED***`***REMOVED***;
      this.#lastIndex = 6;
    ***REMOVED***
    for (let i = this.#lastIndex, ii = this.#line.length; i < ii; i += 6***REMOVED*** {
      const [c1x, c1y, c2x, c2y, x, y] = this.#line.slice(i, i + 6***REMOVED***.map(Outline.svgRound***REMOVED***;
      buffer.push(`C${c1x***REMOVED*** ${c1y***REMOVED*** ${c2x***REMOVED*** ${c2y***REMOVED*** ${x***REMOVED*** ${y***REMOVED***`***REMOVED***;
    ***REMOVED***
    this.#lastSVGPath += buffer.join(" "***REMOVED***;
    this.#lastIndex = this.#line.length;
    return this.#lastSVGPath;
  ***REMOVED***
  getOutlines(parentWidth, parentHeight, scale, innerMargin***REMOVED*** {
    const last = this.#lines.at(-1***REMOVED***;
    last.line = new Float32Array(last.line***REMOVED***;
    last.points = new Float32Array(last.points***REMOVED***;
    this.#outlines.build(this.#lines, parentWidth, parentHeight, scale, this.#rotation, this.#thickness, innerMargin***REMOVED***;
    this.#last = null;
    this.#line = null;
    this.#lines = null;
    this.#lastSVGPath = null;
    return this.#outlines;
  ***REMOVED***
  get defaultSVGProperties(***REMOVED*** {
***REMOVED***
      root: {
        viewBox: "0 0 10000 10000"
      ***REMOVED***,
      rootClass: {
        draw: true
      ***REMOVED***,
      bbox: [0, 0, 1, 1]
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
class InkDrawOutline extends Outline {
  #bbox;
  #currentRotation = 0;
  #innerMargin;
  #lines;
  #parentWidth;
  #parentHeight;
  #parentScale;
  #rotation;
  #thickness;
  build(lines, parentWidth, parentHeight, parentScale, rotation, thickness, innerMargin***REMOVED*** {
    this.#parentWidth = parentWidth;
    this.#parentHeight = parentHeight;
    this.#parentScale = parentScale;
    this.#rotation = rotation;
    this.#thickness = thickness;
    this.#innerMargin = innerMargin ?? 0;
    this.#lines = lines;
    this.#computeBbox(***REMOVED***;
  ***REMOVED***
  setLastElement(element***REMOVED*** {
    this.#lines.push(element***REMOVED***;
***REMOVED***
      path: {
        d: this.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  removeLastElement(***REMOVED*** {
    this.#lines.pop(***REMOVED***;
***REMOVED***
      path: {
        d: this.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  toSVGPath(***REMOVED*** {
    const buffer = [];
    for (const {
      line
    ***REMOVED*** of this.#lines***REMOVED*** {
      buffer.push(`M${Outline.svgRound(line[4]***REMOVED******REMOVED*** ${Outline.svgRound(line[5]***REMOVED******REMOVED***`***REMOVED***;
      if (line.length === 6***REMOVED*** {
        buffer.push("Z"***REMOVED***;
        continue;
      ***REMOVED***
      if (line.length === 12***REMOVED*** {
        buffer.push(`L${Outline.svgRound(line[10]***REMOVED******REMOVED*** ${Outline.svgRound(line[11]***REMOVED******REMOVED***`***REMOVED***;
        continue;
      ***REMOVED***
      for (let i = 6, ii = line.length; i < ii; i += 6***REMOVED*** {
        const [c1x, c1y, c2x, c2y, x, y] = line.subarray(i, i + 6***REMOVED***.map(Outline.svgRound***REMOVED***;
        buffer.push(`C${c1x***REMOVED*** ${c1y***REMOVED*** ${c2x***REMOVED*** ${c2y***REMOVED*** ${x***REMOVED*** ${y***REMOVED***`***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return buffer.join(""***REMOVED***;
  ***REMOVED***
  serialize([pageX, pageY, pageWidth, pageHeight], isForCopying***REMOVED*** {
    const serializedLines = [];
    const serializedPoints = [];
    const [x, y, width, height] = this.#getBBoxWithNoMargin(***REMOVED***;
    let tx, ty, sx, sy, x1, y1, x2, y2, rescaleFn;
    switch (this.#rotation***REMOVED*** {
      case 0:
        rescaleFn = Outline._rescale;
        tx = pageX;
        ty = pageY + pageHeight;
        sx = pageWidth;
        sy = -pageHeight;
        x1 = pageX + x * pageWidth;
        y1 = pageY + (1 - y - height***REMOVED*** * pageHeight;
        x2 = pageX + (x + width***REMOVED*** * pageWidth;
        y2 = pageY + (1 - y***REMOVED*** * pageHeight;
        break;
      case 90:
        rescaleFn = Outline._rescaleAndSwap;
        tx = pageX;
        ty = pageY;
        sx = pageWidth;
        sy = pageHeight;
        x1 = pageX + y * pageWidth;
        y1 = pageY + x * pageHeight;
        x2 = pageX + (y + height***REMOVED*** * pageWidth;
        y2 = pageY + (x + width***REMOVED*** * pageHeight;
        break;
      case 180:
        rescaleFn = Outline._rescale;
        tx = pageX + pageWidth;
        ty = pageY;
        sx = -pageWidth;
        sy = pageHeight;
        x1 = pageX + (1 - x - width***REMOVED*** * pageWidth;
        y1 = pageY + y * pageHeight;
        x2 = pageX + (1 - x***REMOVED*** * pageWidth;
        y2 = pageY + (y + height***REMOVED*** * pageHeight;
        break;
      case 270:
        rescaleFn = Outline._rescaleAndSwap;
        tx = pageX + pageWidth;
        ty = pageY + pageHeight;
        sx = -pageWidth;
        sy = -pageHeight;
        x1 = pageX + (1 - y - height***REMOVED*** * pageWidth;
        y1 = pageY + (1 - x - width***REMOVED*** * pageHeight;
        x2 = pageX + (1 - y***REMOVED*** * pageWidth;
        y2 = pageY + (1 - x***REMOVED*** * pageHeight;
        break;
    ***REMOVED***
    for (const {
      line,
      points
    ***REMOVED*** of this.#lines***REMOVED*** {
      serializedLines.push(rescaleFn(line, tx, ty, sx, sy, isForCopying ? new Array(line.length***REMOVED*** : null***REMOVED******REMOVED***;
      serializedPoints.push(rescaleFn(points, tx, ty, sx, sy, isForCopying ? new Array(points.length***REMOVED*** : null***REMOVED******REMOVED***;
    ***REMOVED***
***REMOVED***
      lines: serializedLines,
      points: serializedPoints,
      rect: [x1, y1, x2, y2]
    ***REMOVED***;
  ***REMOVED***
  static deserialize(pageX, pageY, pageWidth, pageHeight, innerMargin, {
    paths: {
      lines,
      points
    ***REMOVED***,
    rotation,
    thickness
  ***REMOVED******REMOVED*** {
    const newLines = [];
    let tx, ty, sx, sy, rescaleFn;
    switch (rotation***REMOVED*** {
      case 0:
        rescaleFn = Outline._rescale;
        tx = -pageX / pageWidth;
        ty = pageY / pageHeight + 1;
        sx = 1 / pageWidth;
        sy = -1 / pageHeight;
        break;
      case 90:
        rescaleFn = Outline._rescaleAndSwap;
        tx = -pageY / pageHeight;
        ty = -pageX / pageWidth;
        sx = 1 / pageHeight;
        sy = 1 / pageWidth;
        break;
      case 180:
        rescaleFn = Outline._rescale;
        tx = pageX / pageWidth + 1;
        ty = -pageY / pageHeight;
        sx = -1 / pageWidth;
        sy = 1 / pageHeight;
        break;
      case 270:
        rescaleFn = Outline._rescaleAndSwap;
        tx = pageY / pageHeight + 1;
        ty = pageX / pageWidth + 1;
        sx = -1 / pageHeight;
        sy = -1 / pageWidth;
        break;
    ***REMOVED***
    if (!lines***REMOVED*** {
      lines = [];
      for (const point of points***REMOVED*** {
        const len = point.length;
        if (len === 2***REMOVED*** {
          lines.push(new Float32Array([NaN, NaN, NaN, NaN, point[0], point[1]]***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        if (len === 4***REMOVED*** {
          lines.push(new Float32Array([NaN, NaN, NaN, NaN, point[0], point[1], NaN, NaN, NaN, NaN, point[2], point[3]]***REMOVED******REMOVED***;
          continue;
        ***REMOVED***
        const line = new Float32Array(3 * (len - 2***REMOVED******REMOVED***;
        lines.push(line***REMOVED***;
        let [x1, y1, x2, y2] = point.subarray(0, 4***REMOVED***;
        line.set([NaN, NaN, NaN, NaN, x1, y1], 0***REMOVED***;
        for (let i = 4; i < len; i += 2***REMOVED*** {
          const x = point[i];
          const y = point[i + 1];
          line.set(Outline.createBezierPoints(x1, y1, x2, y2, x, y***REMOVED***, (i - 2***REMOVED*** * 3***REMOVED***;
          [x1, y1, x2, y2] = [x2, y2, x, y];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
    for (let i = 0, ii = lines.length; i < ii; i++***REMOVED*** {
      newLines.push({
        line: rescaleFn(lines[i].map(x => x ?? NaN***REMOVED***, tx, ty, sx, sy***REMOVED***,
        points: rescaleFn(points[i].map(x => x ?? NaN***REMOVED***, tx, ty, sx, sy***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
    const outlines = new InkDrawOutline(***REMOVED***;
    outlines.build(newLines, pageWidth, pageHeight, 1, rotation, thickness, innerMargin***REMOVED***;
    return outlines;
  ***REMOVED***
  #getMarginComponents(thickness = this.#thickness***REMOVED*** {
    const margin = this.#innerMargin + thickness / 2 * this.#parentScale;
    return this.#rotation % 180 === 0 ? [margin / this.#parentWidth, margin / this.#parentHeight] : [margin / this.#parentHeight, margin / this.#parentWidth];
  ***REMOVED***
  #getBBoxWithNoMargin(***REMOVED*** {
    const [x, y, width, height] = this.#bbox;
    const [marginX, marginY] = this.#getMarginComponents(0***REMOVED***;
    return [x + marginX, y + marginY, width - 2 * marginX, height - 2 * marginY];
  ***REMOVED***
  #computeBbox(***REMOVED*** {
    const bbox = this.#bbox = new Float32Array([Infinity, Infinity, -Infinity, -Infinity]***REMOVED***;
    for (const {
      line
    ***REMOVED*** of this.#lines***REMOVED*** {
      if (line.length <= 12***REMOVED*** {
        for (let i = 4, ii = line.length; i < ii; i += 6***REMOVED*** {
          const [x, y] = line.subarray(i, i + 2***REMOVED***;
          bbox[0] = Math.min(bbox[0], x***REMOVED***;
          bbox[1] = Math.min(bbox[1], y***REMOVED***;
          bbox[2] = Math.max(bbox[2], x***REMOVED***;
          bbox[3] = Math.max(bbox[3], y***REMOVED***;
        ***REMOVED***
        continue;
      ***REMOVED***
      let lastX = line[4],
        lastY = line[5];
      for (let i = 6, ii = line.length; i < ii; i += 6***REMOVED*** {
        const [c1x, c1y, c2x, c2y, x, y] = line.subarray(i, i + 6***REMOVED***;
        Util.bezierBoundingBox(lastX, lastY, c1x, c1y, c2x, c2y, x, y, bbox***REMOVED***;
        lastX = x;
        lastY = y;
      ***REMOVED***
    ***REMOVED***
    const [marginX, marginY] = this.#getMarginComponents(***REMOVED***;
    bbox[0] = Math.min(1, Math.max(0, bbox[0] - marginX***REMOVED******REMOVED***;
    bbox[1] = Math.min(1, Math.max(0, bbox[1] - marginY***REMOVED******REMOVED***;
    bbox[2] = Math.min(1, Math.max(0, bbox[2] + marginX***REMOVED******REMOVED***;
    bbox[3] = Math.min(1, Math.max(0, bbox[3] + marginY***REMOVED******REMOVED***;
    bbox[2] -= bbox[0];
    bbox[3] -= bbox[1];
  ***REMOVED***
  get box(***REMOVED*** {
    return this.#bbox;
  ***REMOVED***
  updateProperty(name, value***REMOVED*** {
    if (name === "stroke-width"***REMOVED*** {
      return this.#updateThickness(value***REMOVED***;
    ***REMOVED***
    return null;
  ***REMOVED***
  #updateThickness(thickness***REMOVED*** {
    const [oldMarginX, oldMarginY] = this.#getMarginComponents(***REMOVED***;
    this.#thickness = thickness;
    const [newMarginX, newMarginY] = this.#getMarginComponents(***REMOVED***;
    const [diffMarginX, diffMarginY] = [newMarginX - oldMarginX, newMarginY - oldMarginY];
    const bbox = this.#bbox;
    bbox[0] -= diffMarginX;
    bbox[1] -= diffMarginY;
    bbox[2] += 2 * diffMarginX;
    bbox[3] += 2 * diffMarginY;
    return bbox;
  ***REMOVED***
  updateParentDimensions([width, height], scale***REMOVED*** {
    const [oldMarginX, oldMarginY] = this.#getMarginComponents(***REMOVED***;
    this.#parentWidth = width;
    this.#parentHeight = height;
    this.#parentScale = scale;
    const [newMarginX, newMarginY] = this.#getMarginComponents(***REMOVED***;
    const diffMarginX = newMarginX - oldMarginX;
    const diffMarginY = newMarginY - oldMarginY;
    const bbox = this.#bbox;
    bbox[0] -= diffMarginX;
    bbox[1] -= diffMarginY;
    bbox[2] += 2 * diffMarginX;
    bbox[3] += 2 * diffMarginY;
    return bbox;
  ***REMOVED***
  updateRotation(rotation***REMOVED*** {
    this.#currentRotation = rotation;
***REMOVED***
      path: {
        transform: this.rotationTransform
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  get viewBox(***REMOVED*** {
    return this.#bbox.map(Outline.svgRound***REMOVED***.join(" "***REMOVED***;
  ***REMOVED***
  get defaultProperties(***REMOVED*** {
    const [x, y] = this.#bbox;
***REMOVED***
      root: {
        viewBox: this.viewBox
      ***REMOVED***,
      path: {
        "transform-origin": `${Outline.svgRound(x***REMOVED******REMOVED*** ${Outline.svgRound(y***REMOVED******REMOVED***`
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  get rotationTransform(***REMOVED*** {
    const [,, width, height] = this.#bbox;
    let a = 0,
      b = 0,
      c = 0,
      d = 0,
      e = 0,
      f = 0;
    switch (this.#currentRotation***REMOVED*** {
      case 90:
        b = height / width;
        c = -width / height;
        e = width;
        break;
      case 180:
        a = -1;
        d = -1;
        e = width;
        f = height;
        break;
      case 270:
        b = -height / width;
        c = width / height;
        f = height;
        break;
      default:
        return "";
    ***REMOVED***
    return `matrix(${a***REMOVED*** ${b***REMOVED*** ${c***REMOVED*** ${d***REMOVED*** ${Outline.svgRound(e***REMOVED******REMOVED*** ${Outline.svgRound(f***REMOVED******REMOVED******REMOVED***`;
  ***REMOVED***
  getPathResizingSVGProperties([newX, newY, newWidth, newHeight]***REMOVED*** {
    const [marginX, marginY] = this.#getMarginComponents(***REMOVED***;
    const [x, y, width, height] = this.#bbox;
    if (Math.abs(width - marginX***REMOVED*** <= Outline.PRECISION || Math.abs(height - marginY***REMOVED*** <= Outline.PRECISION***REMOVED*** {
      const tx = newX + newWidth / 2 - (x + width / 2***REMOVED***;
      const ty = newY + newHeight / 2 - (y + height / 2***REMOVED***;
  ***REMOVED***
        path: {
          "transform-origin": `${Outline.svgRound(newX***REMOVED******REMOVED*** ${Outline.svgRound(newY***REMOVED******REMOVED***`,
          transform: `${this.rotationTransform***REMOVED*** translate(${tx***REMOVED*** ${ty***REMOVED******REMOVED***`
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
    const s1x = (newWidth - 2 * marginX***REMOVED*** / (width - 2 * marginX***REMOVED***;
    const s1y = (newHeight - 2 * marginY***REMOVED*** / (height - 2 * marginY***REMOVED***;
    const s2x = width / newWidth;
    const s2y = height / newHeight;
***REMOVED***
      path: {
        "transform-origin": `${Outline.svgRound(x***REMOVED******REMOVED*** ${Outline.svgRound(y***REMOVED******REMOVED***`,
        transform: `${this.rotationTransform***REMOVED*** scale(${s2x***REMOVED*** ${s2y***REMOVED******REMOVED*** ` + `translate(${Outline.svgRound(marginX***REMOVED******REMOVED*** ${Outline.svgRound(marginY***REMOVED******REMOVED******REMOVED*** scale(${s1x***REMOVED*** ${s1y***REMOVED******REMOVED*** ` + `translate(${Outline.svgRound(-marginX***REMOVED******REMOVED*** ${Outline.svgRound(-marginY***REMOVED******REMOVED******REMOVED***`
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  getPathResizedSVGProperties([newX, newY, newWidth, newHeight]***REMOVED*** {
    const [marginX, marginY] = this.#getMarginComponents(***REMOVED***;
    const bbox = this.#bbox;
    const [x, y, width, height] = bbox;
    bbox[0] = newX;
    bbox[1] = newY;
    bbox[2] = newWidth;
    bbox[3] = newHeight;
    if (Math.abs(width - marginX***REMOVED*** <= Outline.PRECISION || Math.abs(height - marginY***REMOVED*** <= Outline.PRECISION***REMOVED*** {
      const tx = newX + newWidth / 2 - (x + width / 2***REMOVED***;
      const ty = newY + newHeight / 2 - (y + height / 2***REMOVED***;
      for (const {
        line,
        points
      ***REMOVED*** of this.#lines***REMOVED*** {
        Outline._translate(line, tx, ty, line***REMOVED***;
        Outline._translate(points, tx, ty, points***REMOVED***;
      ***REMOVED***
  ***REMOVED***
        root: {
          viewBox: this.viewBox
        ***REMOVED***,
        path: {
          "transform-origin": `${Outline.svgRound(newX***REMOVED******REMOVED*** ${Outline.svgRound(newY***REMOVED******REMOVED***`,
          transform: this.rotationTransform || null,
          d: this.toSVGPath(***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
    const s1x = (newWidth - 2 * marginX***REMOVED*** / (width - 2 * marginX***REMOVED***;
    const s1y = (newHeight - 2 * marginY***REMOVED*** / (height - 2 * marginY***REMOVED***;
    const tx = -s1x * (x + marginX***REMOVED*** + newX + marginX;
    const ty = -s1y * (y + marginY***REMOVED*** + newY + marginY;
    if (s1x !== 1 || s1y !== 1 || tx !== 0 || ty !== 0***REMOVED*** {
      for (const {
        line,
        points
      ***REMOVED*** of this.#lines***REMOVED*** {
        Outline._rescale(line, tx, ty, s1x, s1y, line***REMOVED***;
        Outline._rescale(points, tx, ty, s1x, s1y, points***REMOVED***;
      ***REMOVED***
    ***REMOVED***
***REMOVED***
      root: {
        viewBox: this.viewBox
      ***REMOVED***,
      path: {
        "transform-origin": `${Outline.svgRound(newX***REMOVED******REMOVED*** ${Outline.svgRound(newY***REMOVED******REMOVED***`,
        transform: this.rotationTransform || null,
        d: this.toSVGPath(***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  getPathTranslatedSVGProperties([newX, newY], parentDimensions***REMOVED*** {
    const [newParentWidth, newParentHeight] = parentDimensions;
    const bbox = this.#bbox;
    const tx = newX - bbox[0];
    const ty = newY - bbox[1];
    if (this.#parentWidth === newParentWidth && this.#parentHeight === newParentHeight***REMOVED*** {
      for (const {
        line,
        points
      ***REMOVED*** of this.#lines***REMOVED*** {
        Outline._translate(line, tx, ty, line***REMOVED***;
        Outline._translate(points, tx, ty, points***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
      const sx = this.#parentWidth / newParentWidth;
      const sy = this.#parentHeight / newParentHeight;
      this.#parentWidth = newParentWidth;
      this.#parentHeight = newParentHeight;
      for (const {
        line,
        points
      ***REMOVED*** of this.#lines***REMOVED*** {
        Outline._rescale(line, tx, ty, sx, sy, line***REMOVED***;
        Outline._rescale(points, tx, ty, sx, sy, points***REMOVED***;
      ***REMOVED***
      bbox[2] *= sx;
      bbox[3] *= sy;
    ***REMOVED***
    bbox[0] = newX;
    bbox[1] = newY;
***REMOVED***
      root: {
        viewBox: this.viewBox
      ***REMOVED***,
      path: {
        d: this.toSVGPath(***REMOVED***,
        "transform-origin": `${Outline.svgRound(newX***REMOVED******REMOVED*** ${Outline.svgRound(newY***REMOVED******REMOVED***`
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  get defaultSVGProperties(***REMOVED*** {
    const bbox = this.#bbox;
***REMOVED***
      root: {
        viewBox: this.viewBox
      ***REMOVED***,
      rootClass: {
        draw: true
      ***REMOVED***,
      path: {
        d: this.toSVGPath(***REMOVED***,
        "transform-origin": `${Outline.svgRound(bbox[0]***REMOVED******REMOVED*** ${Outline.svgRound(bbox[1]***REMOVED******REMOVED***`,
        transform: this.rotationTransform || null
      ***REMOVED***,
      bbox
    ***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/ink.js





class InkDrawingOptions extends DrawingOptions {
  #viewParameters;
  constructor(viewerParameters***REMOVED*** {
    super(***REMOVED***;
    this.#viewParameters = viewerParameters;
    super.updateProperties({
      fill: "none",
      stroke: AnnotationEditor._defaultLineColor,
      "stroke-opacity": 1,
      "stroke-width": 1,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": 10
    ***REMOVED******REMOVED***;
  ***REMOVED***
  updateSVGProperty(name, value***REMOVED*** {
    if (name === "stroke-width"***REMOVED*** {
      value ??= this["stroke-width"];
      value *= this.#viewParameters.realScale;
    ***REMOVED***
    super.updateSVGProperty(name, value***REMOVED***;
  ***REMOVED***
  clone(***REMOVED*** {
    const clone = new InkDrawingOptions(this.#viewParameters***REMOVED***;
    clone.updateAll(this***REMOVED***;
    return clone;
  ***REMOVED***
***REMOVED***
class InkEditor extends DrawingEditor {
  static _type = "ink";
  static _editorType = AnnotationEditorType.INK;
  static _defaultDrawingOptions = null;
  constructor(params***REMOVED*** {
    super({
      ...params,
      name: "inkEditor"
    ***REMOVED******REMOVED***;
    this._willKeepAspectRatio = true;
  ***REMOVED***
  static initialize(l10n, uiManager***REMOVED*** {
    AnnotationEditor.initialize(l10n, uiManager***REMOVED***;
    this._defaultDrawingOptions = new InkDrawingOptions(uiManager.viewParameters***REMOVED***;
  ***REMOVED***
  static getDefaultDrawingOptions(options***REMOVED*** {
    const clone = this._defaultDrawingOptions.clone(***REMOVED***;
    clone.updateProperties(options***REMOVED***;
    return clone;
  ***REMOVED***
  static get supportMultipleDrawings(***REMOVED*** {
    return true;
  ***REMOVED***
  static get typesMap(***REMOVED*** {
    return shadow(this, "typesMap", new Map([[AnnotationEditorParamsType.INK_THICKNESS, "stroke-width"], [AnnotationEditorParamsType.INK_COLOR, "stroke"], [AnnotationEditorParamsType.INK_OPACITY, "stroke-opacity"]]***REMOVED******REMOVED***;
  ***REMOVED***
  static createDrawerInstance(x, y, parentWidth, parentHeight, rotation***REMOVED*** {
    return new InkDrawOutliner(x, y, parentWidth, parentHeight, rotation, this._defaultDrawingOptions["stroke-width"]***REMOVED***;
  ***REMOVED***
  static deserializeDraw(pageX, pageY, pageWidth, pageHeight, innerMargin, data***REMOVED*** {
    return InkDrawOutline.deserialize(pageX, pageY, pageWidth, pageHeight, innerMargin, data***REMOVED***;
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    let initialData = null;
    if (data instanceof InkAnnotationElement***REMOVED*** {
      const {
        data: {
          inkLists,
          rect,
          rotation,
          id,
          color,
          opacity,
          borderStyle: {
            rawWidth: thickness
          ***REMOVED***,
          popupRef
        ***REMOVED***,
        parent: {
          page: {
            pageNumber
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** = data;
      initialData = data = {
        annotationType: AnnotationEditorType.INK,
        color: Array.from(color***REMOVED***,
        thickness,
        opacity,
        paths: {
          points: inkLists
        ***REMOVED***,
        boxes: null,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0***REMOVED***,
        rotation,
        id,
        deleted: false,
        popupRef
      ***REMOVED***;
    ***REMOVED***
    const editor = await super.deserialize(data, parent, uiManager***REMOVED***;
    editor.annotationElementId = data.id || null;
    editor._initialData = initialData;
    return editor;
  ***REMOVED***
  onScaleChanging(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    super.onScaleChanging(***REMOVED***;
    const {
      _drawId,
      _drawingOptions,
      parent
    ***REMOVED*** = this;
    _drawingOptions.updateSVGProperty("stroke-width"***REMOVED***;
    parent.drawLayer.updateProperties(_drawId, _drawingOptions.toSVGProperties(***REMOVED******REMOVED***;
  ***REMOVED***
  static onScaleChangingWhenDrawing(***REMOVED*** {
    const parent = this._currentParent;
    if (!parent***REMOVED*** {
      return;
    ***REMOVED***
    super.onScaleChangingWhenDrawing(***REMOVED***;
    this._defaultDrawingOptions.updateSVGProperty("stroke-width"***REMOVED***;
    parent.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties(***REMOVED******REMOVED***;
  ***REMOVED***
  createDrawingOptions({
    color,
    thickness,
    opacity
  ***REMOVED******REMOVED*** {
    this._drawingOptions = InkEditor.getDefaultDrawingOptions({
      stroke: Util.makeHexColor(...color***REMOVED***,
      "stroke-width": thickness,
      "stroke-opacity": opacity
    ***REMOVED******REMOVED***;
  ***REMOVED***
  serialize(isForCopying = false***REMOVED*** {
    if (this.isEmpty(***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    if (this.deleted***REMOVED*** {
      return this.serializeDeleted(***REMOVED***;
    ***REMOVED***
    const {
      lines,
      points,
      rect
    ***REMOVED*** = this.serializeDraw(isForCopying***REMOVED***;
    const {
      _drawingOptions: {
        stroke,
        "stroke-opacity": opacity,
        "stroke-width": thickness
      ***REMOVED***
    ***REMOVED*** = this;
    const serialized = {
      annotationType: AnnotationEditorType.INK,
      color: AnnotationEditor._colorManager.convert(stroke***REMOVED***,
      opacity,
      thickness,
      paths: {
        lines,
        points
      ***REMOVED***,
      pageIndex: this.pageIndex,
      rect,
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId
    ***REMOVED***;
    if (isForCopying***REMOVED*** {
      return serialized;
    ***REMOVED***
    if (this.annotationElementId && !this.#hasElementChanged(serialized***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    serialized.id = this.annotationElementId;
    return serialized;
  ***REMOVED***
  #hasElementChanged(serialized***REMOVED*** {
    const {
      color,
      thickness,
      opacity,
      pageIndex
    ***REMOVED*** = this._initialData;
    return this._hasBeenMoved || this._hasBeenResized || serialized.color.some((c, i***REMOVED*** => c !== color[i]***REMOVED*** || serialized.thickness !== thickness || serialized.opacity !== opacity || serialized.pageIndex !== pageIndex;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    const {
      points,
      rect
    ***REMOVED*** = this.serializeDraw(false***REMOVED***;
    annotation.updateEdited({
      rect,
      thickness: this._drawingOptions["stroke-width"],
      points
    ***REMOVED******REMOVED***;
    return null;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/stamp.js




class StampEditor extends AnnotationEditor {
  #bitmap = null;
  #bitmapId = null;
  #bitmapPromise = null;
  #bitmapUrl = null;
  #bitmapFile = null;
  #bitmapFileName = "";
  #canvas = null;
  #resizeTimeoutId = null;
  #isSvg = false;
  #hasBeenAddedInUndoStack = false;
  static _type = "stamp";
  static _editorType = AnnotationEditorType.STAMP;
  constructor(params***REMOVED*** {
    super({
      ...params,
      name: "stampEditor"
    ***REMOVED******REMOVED***;
    this.#bitmapUrl = params.bitmapUrl;
    this.#bitmapFile = params.bitmapFile;
  ***REMOVED***
  static initialize(l10n, uiManager***REMOVED*** {
    AnnotationEditor.initialize(l10n, uiManager***REMOVED***;
  ***REMOVED***
  static get supportedTypes(***REMOVED*** {
    const types = ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"];
    return shadow(this, "supportedTypes", types.map(type => `image/${type***REMOVED***`***REMOVED******REMOVED***;
  ***REMOVED***
  static get supportedTypesStr(***REMOVED*** {
    return shadow(this, "supportedTypesStr", this.supportedTypes.join(","***REMOVED******REMOVED***;
  ***REMOVED***
  static isHandlingMimeForPasting(mime***REMOVED*** {
    return this.supportedTypes.includes(mime***REMOVED***;
  ***REMOVED***
  static paste(item, parent***REMOVED*** {
    parent.pasteEditor(AnnotationEditorType.STAMP, {
      bitmapFile: item.getAsFile(***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
  altTextFinish(***REMOVED*** {
    if (this._uiManager.useNewAltTextFlow***REMOVED*** {
      this.div.hidden = false;
    ***REMOVED***
    super.altTextFinish(***REMOVED***;
  ***REMOVED***
  get telemetryFinalData(***REMOVED*** {
***REMOVED***
      type: "stamp",
      hasAltText: !!this.altTextData?.altText
    ***REMOVED***;
  ***REMOVED***
  static computeTelemetryFinalData(data***REMOVED*** {
    const hasAltTextStats = data.get("hasAltText"***REMOVED***;
***REMOVED***
      hasAltText: hasAltTextStats.get(true***REMOVED*** ?? 0,
      hasNoAltText: hasAltTextStats.get(false***REMOVED*** ?? 0
    ***REMOVED***;
  ***REMOVED***
  #getBitmapFetched(data, fromId = false***REMOVED*** {
    if (!data***REMOVED*** {
      this.remove(***REMOVED***;
      return;
    ***REMOVED***
    this.#bitmap = data.bitmap;
    if (!fromId***REMOVED*** {
      this.#bitmapId = data.id;
      this.#isSvg = data.isSvg;
    ***REMOVED***
    if (data.file***REMOVED*** {
      this.#bitmapFileName = data.file.name;
    ***REMOVED***
    this.#createCanvas(***REMOVED***;
  ***REMOVED***
  #getBitmapDone(***REMOVED*** {
    this.#bitmapPromise = null;
    this._uiManager.enableWaiting(false***REMOVED***;
    if (!this.#canvas***REMOVED*** {
      return;
    ***REMOVED***
    if (this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && this.#bitmap***REMOVED*** {
      this._editToolbar.hide(***REMOVED***;
      this._uiManager.editAltText(this, true***REMOVED***;
      return;
    ***REMOVED***
    if (!this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && this.#bitmap***REMOVED*** {
      this._reportTelemetry({
        action: "pdfjs.image.image_added",
        data: {
          alt_text_modal: false,
          alt_text_type: "empty"
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
        this.mlGuessAltText(***REMOVED***;
      ***REMOVED*** catch {***REMOVED***
    ***REMOVED***
    this.div.focus(***REMOVED***;
  ***REMOVED***
  async mlGuessAltText(imageData = null, updateAltTextData = true***REMOVED*** {
    if (this.hasAltTextData(***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    const {
      mlManager
    ***REMOVED*** = this._uiManager;
    if (!mlManager***REMOVED*** {
      throw new Error("No ML."***REMOVED***;
    ***REMOVED***
    if (!(await mlManager.isEnabledFor("altText"***REMOVED******REMOVED******REMOVED*** {
      throw new Error("ML isn't enabled for alt text."***REMOVED***;
    ***REMOVED***
    const {
      data,
      width,
      height
    ***REMOVED*** = imageData || this.copyCanvas(null, null, true***REMOVED***.imageData;
    const response = await mlManager.guess({
      name: "altText",
      request: {
        data,
        width,
        height,
        channels: data.length / (width * height***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***;
    if (!response***REMOVED*** {
      throw new Error("No response from the AI service."***REMOVED***;
    ***REMOVED***
    if (response.error***REMOVED*** {
      throw new Error("Error from the AI service."***REMOVED***;
    ***REMOVED***
    if (response.cancel***REMOVED*** {
      return null;
    ***REMOVED***
    if (!response.output***REMOVED*** {
      throw new Error("No valid response from the AI service."***REMOVED***;
    ***REMOVED***
    const altText = response.output;
    await this.setGuessedAltText(altText***REMOVED***;
    if (updateAltTextData && !this.hasAltTextData(***REMOVED******REMOVED*** {
      this.altTextData = {
        alt: altText,
        decorative: false
      ***REMOVED***;
    ***REMOVED***
    return altText;
  ***REMOVED***
  #getBitmap(***REMOVED*** {
    if (this.#bitmapId***REMOVED*** {
      this._uiManager.enableWaiting(true***REMOVED***;
      this._uiManager.imageManager.getFromId(this.#bitmapId***REMOVED***.then(data => this.#getBitmapFetched(data, true***REMOVED******REMOVED***.finally((***REMOVED*** => this.#getBitmapDone(***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    if (this.#bitmapUrl***REMOVED*** {
      const url = this.#bitmapUrl;
      this.#bitmapUrl = null;
      this._uiManager.enableWaiting(true***REMOVED***;
      this.#bitmapPromise = this._uiManager.imageManager.getFromUrl(url***REMOVED***.then(data => this.#getBitmapFetched(data***REMOVED******REMOVED***.finally((***REMOVED*** => this.#getBitmapDone(***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    if (this.#bitmapFile***REMOVED*** {
      const file = this.#bitmapFile;
      this.#bitmapFile = null;
      this._uiManager.enableWaiting(true***REMOVED***;
      this.#bitmapPromise = this._uiManager.imageManager.getFromFile(file***REMOVED***.then(data => this.#getBitmapFetched(data***REMOVED******REMOVED***.finally((***REMOVED*** => this.#getBitmapDone(***REMOVED******REMOVED***;
      return;
    ***REMOVED***
    const input = document.createElement("input"***REMOVED***;
    input.type = "file";
    input.accept = StampEditor.supportedTypesStr;
    const signal = this._uiManager._signal;
    this.#bitmapPromise = new Promise(resolve => {
      input.addEventListener("change", async (***REMOVED*** => {
        if (!input.files || input.files.length === 0***REMOVED*** {
          this.remove(***REMOVED***;
        ***REMOVED*** else {
          this._uiManager.enableWaiting(true***REMOVED***;
          const data = await this._uiManager.imageManager.getFromFile(input.files[0]***REMOVED***;
          this._reportTelemetry({
            action: "pdfjs.image.image_selected",
            data: {
              alt_text_modal: this._uiManager.useNewAltTextFlow
            ***REMOVED***
          ***REMOVED******REMOVED***;
          this.#getBitmapFetched(data***REMOVED***;
        ***REMOVED***
        resolve(***REMOVED***;
      ***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
      input.addEventListener("cancel", (***REMOVED*** => {
        this.remove(***REMOVED***;
        resolve(***REMOVED***;
      ***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***.finally((***REMOVED*** => this.#getBitmapDone(***REMOVED******REMOVED***;
    input.click(***REMOVED***;
  ***REMOVED***
  remove(***REMOVED*** {
    if (this.#bitmapId***REMOVED*** {
      this.#bitmap = null;
      this._uiManager.imageManager.deleteId(this.#bitmapId***REMOVED***;
      this.#canvas?.remove(***REMOVED***;
      this.#canvas = null;
      if (this.#resizeTimeoutId***REMOVED*** {
        clearTimeout(this.#resizeTimeoutId***REMOVED***;
        this.#resizeTimeoutId = null;
      ***REMOVED***
    ***REMOVED***
    super.remove(***REMOVED***;
  ***REMOVED***
  rebuild(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      if (this.#bitmapId***REMOVED*** {
        this.#getBitmap(***REMOVED***;
      ***REMOVED***
      return;
    ***REMOVED***
    super.rebuild(***REMOVED***;
    if (this.div === null***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#bitmapId && this.#canvas === null***REMOVED*** {
      this.#getBitmap(***REMOVED***;
    ***REMOVED***
    if (!this.isAttachedToDOM***REMOVED*** {
      this.parent.add(this***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  onceAdded(focus***REMOVED*** {
    this._isDraggable = true;
    if (focus***REMOVED*** {
      this.div.focus(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  isEmpty(***REMOVED*** {
    return !(this.#bitmapPromise || this.#bitmap || this.#bitmapUrl || this.#bitmapFile || this.#bitmapId***REMOVED***;
  ***REMOVED***
  get isResizable(***REMOVED*** {
    return true;
  ***REMOVED***
  render(***REMOVED*** {
    if (this.div***REMOVED*** {
      return this.div;
    ***REMOVED***
    let baseX, baseY;
    if (this.width***REMOVED*** {
      baseX = this.x;
      baseY = this.y;
    ***REMOVED***
    super.render(***REMOVED***;
    this.div.hidden = true;
    this.div.setAttribute("role", "figure"***REMOVED***;
    this.addAltTextButton(***REMOVED***;
    if (this.#bitmap***REMOVED*** {
      this.#createCanvas(***REMOVED***;
    ***REMOVED*** else {
      this.#getBitmap(***REMOVED***;
    ***REMOVED***
    if (this.width && !this.annotationElementId***REMOVED*** {
      const [parentWidth, parentHeight] = this.parentDimensions;
      this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight***REMOVED***;
    ***REMOVED***
    this._uiManager.addShouldRescale(this***REMOVED***;
    return this.div;
  ***REMOVED***
  _onResized(***REMOVED*** {
    this.onScaleChanging(***REMOVED***;
  ***REMOVED***
  onScaleChanging(***REMOVED*** {
    if (!this.parent***REMOVED*** {
      return;
    ***REMOVED***
    if (this.#resizeTimeoutId !== null***REMOVED*** {
      clearTimeout(this.#resizeTimeoutId***REMOVED***;
    ***REMOVED***
    const TIME_TO_WAIT = 200;
    this.#resizeTimeoutId = setTimeout((***REMOVED*** => {
      this.#resizeTimeoutId = null;
      this.#drawBitmap(***REMOVED***;
    ***REMOVED***, TIME_TO_WAIT***REMOVED***;
  ***REMOVED***
  #createCanvas(***REMOVED*** {
    const {
      div
    ***REMOVED*** = this;
    let {
      width,
      height
    ***REMOVED*** = this.#bitmap;
    const [pageWidth, pageHeight] = this.pageDimensions;
    const MAX_RATIO = 0.75;
    if (this.width***REMOVED*** {
      width = this.width * pageWidth;
      height = this.height * pageHeight;
    ***REMOVED*** else if (width > MAX_RATIO * pageWidth || height > MAX_RATIO * pageHeight***REMOVED*** {
      const factor = Math.min(MAX_RATIO * pageWidth / width, MAX_RATIO * pageHeight / height***REMOVED***;
      width *= factor;
      height *= factor;
    ***REMOVED***
    const [parentWidth, parentHeight] = this.parentDimensions;
    this.setDims(width * parentWidth / pageWidth, height * parentHeight / pageHeight***REMOVED***;
    this._uiManager.enableWaiting(false***REMOVED***;
    const canvas = this.#canvas = document.createElement("canvas"***REMOVED***;
    canvas.setAttribute("role", "img"***REMOVED***;
    this.addContainer(canvas***REMOVED***;
    this.width = width / pageWidth;
    this.height = height / pageHeight;
    if (this._initialOptions?.isCentered***REMOVED*** {
      this.center(***REMOVED***;
    ***REMOVED*** else {
      this.fixAndSetPosition(***REMOVED***;
    ***REMOVED***
    this._initialOptions = null;
    if (!this._uiManager.useNewAltTextWhenAddingImage || !this._uiManager.useNewAltTextFlow || this.annotationElementId***REMOVED*** {
      div.hidden = false;
    ***REMOVED***
    this.#drawBitmap(***REMOVED***;
    if (!this.#hasBeenAddedInUndoStack***REMOVED*** {
      this.parent.addUndoableEditor(this***REMOVED***;
      this.#hasBeenAddedInUndoStack = true;
    ***REMOVED***
    this._reportTelemetry({
      action: "inserted_image"
    ***REMOVED******REMOVED***;
    if (this.#bitmapFileName***REMOVED*** {
      canvas.setAttribute("aria-label", this.#bitmapFileName***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  copyCanvas(maxDataDimension, maxPreviewDimension, createImageData = false***REMOVED*** {
    if (!maxDataDimension***REMOVED*** {
      maxDataDimension = 224;
    ***REMOVED***
    const {
      width: bitmapWidth,
      height: bitmapHeight
    ***REMOVED*** = this.#bitmap;
    const outputScale = new OutputScale(***REMOVED***;
    let bitmap = this.#bitmap;
    let width = bitmapWidth,
      height = bitmapHeight;
    let canvas = null;
    if (maxPreviewDimension***REMOVED*** {
      if (bitmapWidth > maxPreviewDimension || bitmapHeight > maxPreviewDimension***REMOVED*** {
        const ratio = Math.min(maxPreviewDimension / bitmapWidth, maxPreviewDimension / bitmapHeight***REMOVED***;
        width = Math.floor(bitmapWidth * ratio***REMOVED***;
        height = Math.floor(bitmapHeight * ratio***REMOVED***;
      ***REMOVED***
      canvas = document.createElement("canvas"***REMOVED***;
      const scaledWidth = canvas.width = Math.ceil(width * outputScale.sx***REMOVED***;
      const scaledHeight = canvas.height = Math.ceil(height * outputScale.sy***REMOVED***;
      if (!this.#isSvg***REMOVED*** {
        bitmap = this.#scaleBitmap(scaledWidth, scaledHeight***REMOVED***;
      ***REMOVED***
      const ctx = canvas.getContext("2d"***REMOVED***;
      ctx.filter = this._uiManager.hcmFilter;
      let white = "white",
        black = "#cfcfd8";
      if (this._uiManager.hcmFilter !== "none"***REMOVED*** {
        black = "black";
      ***REMOVED*** else if (window.matchMedia?.("(prefers-color-scheme: dark***REMOVED***"***REMOVED***.matches***REMOVED*** {
        white = "#8f8f9d";
        black = "#42414d";
      ***REMOVED***
      const boxDim = 15;
      const boxDimWidth = boxDim * outputScale.sx;
      const boxDimHeight = boxDim * outputScale.sy;
      const pattern = new OffscreenCanvas(boxDimWidth * 2, boxDimHeight * 2***REMOVED***;
      const patternCtx = pattern.getContext("2d"***REMOVED***;
      patternCtx.fillStyle = white;
      patternCtx.fillRect(0, 0, boxDimWidth * 2, boxDimHeight * 2***REMOVED***;
      patternCtx.fillStyle = black;
      patternCtx.fillRect(0, 0, boxDimWidth, boxDimHeight***REMOVED***;
      patternCtx.fillRect(boxDimWidth, boxDimHeight, boxDimWidth, boxDimHeight***REMOVED***;
      ctx.fillStyle = ctx.createPattern(pattern, "repeat"***REMOVED***;
      ctx.fillRect(0, 0, scaledWidth, scaledHeight***REMOVED***;
      ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, scaledWidth, scaledHeight***REMOVED***;
    ***REMOVED***
    let imageData = null;
    if (createImageData***REMOVED*** {
      let dataWidth, dataHeight;
      if (outputScale.symmetric && bitmap.width < maxDataDimension && bitmap.height < maxDataDimension***REMOVED*** {
        dataWidth = bitmap.width;
        dataHeight = bitmap.height;
      ***REMOVED*** else {
        bitmap = this.#bitmap;
        if (bitmapWidth > maxDataDimension || bitmapHeight > maxDataDimension***REMOVED*** {
          const ratio = Math.min(maxDataDimension / bitmapWidth, maxDataDimension / bitmapHeight***REMOVED***;
          dataWidth = Math.floor(bitmapWidth * ratio***REMOVED***;
          dataHeight = Math.floor(bitmapHeight * ratio***REMOVED***;
          if (!this.#isSvg***REMOVED*** {
            bitmap = this.#scaleBitmap(dataWidth, dataHeight***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      const offscreen = new OffscreenCanvas(dataWidth, dataHeight***REMOVED***;
      const offscreenCtx = offscreen.getContext("2d", {
        willReadFrequently: true
      ***REMOVED******REMOVED***;
      offscreenCtx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, dataWidth, dataHeight***REMOVED***;
      imageData = {
        width: dataWidth,
        height: dataHeight,
        data: offscreenCtx.getImageData(0, 0, dataWidth, dataHeight***REMOVED***.data
      ***REMOVED***;
    ***REMOVED***
***REMOVED***
      canvas,
      width,
      height,
      imageData
    ***REMOVED***;
  ***REMOVED***
  #scaleBitmap(width, height***REMOVED*** {
    const {
      width: bitmapWidth,
      height: bitmapHeight
    ***REMOVED*** = this.#bitmap;
    let newWidth = bitmapWidth;
    let newHeight = bitmapHeight;
    let bitmap = this.#bitmap;
    while (newWidth > 2 * width || newHeight > 2 * height***REMOVED*** {
      const prevWidth = newWidth;
      const prevHeight = newHeight;
      if (newWidth > 2 * width***REMOVED*** {
        newWidth = newWidth >= 16384 ? Math.floor(newWidth / 2***REMOVED*** - 1 : Math.ceil(newWidth / 2***REMOVED***;
      ***REMOVED***
      if (newHeight > 2 * height***REMOVED*** {
        newHeight = newHeight >= 16384 ? Math.floor(newHeight / 2***REMOVED*** - 1 : Math.ceil(newHeight / 2***REMOVED***;
      ***REMOVED***
      const offscreen = new OffscreenCanvas(newWidth, newHeight***REMOVED***;
      const ctx = offscreen.getContext("2d"***REMOVED***;
      ctx.drawImage(bitmap, 0, 0, prevWidth, prevHeight, 0, 0, newWidth, newHeight***REMOVED***;
      bitmap = offscreen.transferToImageBitmap(***REMOVED***;
    ***REMOVED***
    return bitmap;
  ***REMOVED***
  #drawBitmap(***REMOVED*** {
    const [parentWidth, parentHeight] = this.parentDimensions;
    const {
      width,
      height
    ***REMOVED*** = this;
    const outputScale = new OutputScale(***REMOVED***;
    const scaledWidth = Math.ceil(width * parentWidth * outputScale.sx***REMOVED***;
    const scaledHeight = Math.ceil(height * parentHeight * outputScale.sy***REMOVED***;
    const canvas = this.#canvas;
    if (!canvas || canvas.width === scaledWidth && canvas.height === scaledHeight***REMOVED*** {
      return;
    ***REMOVED***
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    const bitmap = this.#isSvg ? this.#bitmap : this.#scaleBitmap(scaledWidth, scaledHeight***REMOVED***;
    const ctx = canvas.getContext("2d"***REMOVED***;
    ctx.filter = this._uiManager.hcmFilter;
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, scaledWidth, scaledHeight***REMOVED***;
  ***REMOVED***
  getImageForAltText(***REMOVED*** {
    return this.#canvas;
  ***REMOVED***
  #serializeBitmap(toUrl***REMOVED*** {
    if (toUrl***REMOVED*** {
      if (this.#isSvg***REMOVED*** {
        const url = this._uiManager.imageManager.getSvgUrl(this.#bitmapId***REMOVED***;
        if (url***REMOVED*** {
          return url;
        ***REMOVED***
      ***REMOVED***
      const canvas = document.createElement("canvas"***REMOVED***;
      ({
        width: canvas.width,
        height: canvas.height
      ***REMOVED*** = this.#bitmap***REMOVED***;
      const ctx = canvas.getContext("2d"***REMOVED***;
      ctx.drawImage(this.#bitmap, 0, 0***REMOVED***;
      return canvas.toDataURL(***REMOVED***;
    ***REMOVED***
    if (this.#isSvg***REMOVED*** {
      const [pageWidth, pageHeight] = this.pageDimensions;
      const width = Math.round(this.width * pageWidth * PixelsPerInch.PDF_TO_CSS_UNITS***REMOVED***;
      const height = Math.round(this.height * pageHeight * PixelsPerInch.PDF_TO_CSS_UNITS***REMOVED***;
      const offscreen = new OffscreenCanvas(width, height***REMOVED***;
      const ctx = offscreen.getContext("2d"***REMOVED***;
      ctx.drawImage(this.#bitmap, 0, 0, this.#bitmap.width, this.#bitmap.height, 0, 0, width, height***REMOVED***;
      return offscreen.transferToImageBitmap(***REMOVED***;
    ***REMOVED***
    return structuredClone(this.#bitmap***REMOVED***;
  ***REMOVED***
  static async deserialize(data, parent, uiManager***REMOVED*** {
    let initialData = null;
    if (data instanceof StampAnnotationElement***REMOVED*** {
      const {
        data: {
          rect,
          rotation,
          id,
          structParent,
          popupRef
        ***REMOVED***,
        container,
        parent: {
          page: {
            pageNumber
          ***REMOVED***
        ***REMOVED***
      ***REMOVED*** = data;
      const canvas = container.querySelector("canvas"***REMOVED***;
      const imageData = uiManager.imageManager.getFromCanvas(container.id, canvas***REMOVED***;
      canvas.remove(***REMOVED***;
      const altText = (await parent._structTree.getAriaAttributes(`${AnnotationPrefix***REMOVED***${id***REMOVED***`***REMOVED******REMOVED***?.get("aria-label"***REMOVED*** || "";
      initialData = data = {
        annotationType: AnnotationEditorType.STAMP,
        bitmapId: imageData.id,
        bitmap: imageData.bitmap,
        pageIndex: pageNumber - 1,
        rect: rect.slice(0***REMOVED***,
        rotation,
        id,
        deleted: false,
        accessibilityData: {
          decorative: false,
          altText
        ***REMOVED***,
        isSvg: false,
        structParent,
        popupRef
      ***REMOVED***;
    ***REMOVED***
    const editor = await super.deserialize(data, parent, uiManager***REMOVED***;
    const {
      rect,
      bitmap,
      bitmapUrl,
      bitmapId,
      isSvg,
      accessibilityData
    ***REMOVED*** = data;
    if (bitmapId && uiManager.imageManager.isValidId(bitmapId***REMOVED******REMOVED*** {
      editor.#bitmapId = bitmapId;
      if (bitmap***REMOVED*** {
        editor.#bitmap = bitmap;
      ***REMOVED***
    ***REMOVED*** else {
      editor.#bitmapUrl = bitmapUrl;
    ***REMOVED***
    editor.#isSvg = isSvg;
    const [parentWidth, parentHeight] = editor.pageDimensions;
    editor.width = (rect[2] - rect[0]***REMOVED*** / parentWidth;
    editor.height = (rect[3] - rect[1]***REMOVED*** / parentHeight;
    editor.annotationElementId = data.id || null;
    if (accessibilityData***REMOVED*** {
      editor.altTextData = accessibilityData;
    ***REMOVED***
    editor._initialData = initialData;
    editor.#hasBeenAddedInUndoStack = !!initialData;
    return editor;
  ***REMOVED***
  serialize(isForCopying = false, context = null***REMOVED*** {
    if (this.isEmpty(***REMOVED******REMOVED*** {
      return null;
    ***REMOVED***
    if (this.deleted***REMOVED*** {
      return this.serializeDeleted(***REMOVED***;
    ***REMOVED***
    const serialized = {
      annotationType: AnnotationEditorType.STAMP,
      bitmapId: this.#bitmapId,
      pageIndex: this.pageIndex,
      rect: this.getRect(0, 0***REMOVED***,
      rotation: this.rotation,
      isSvg: this.#isSvg,
      structTreeParentId: this._structTreeParentId
    ***REMOVED***;
    if (isForCopying***REMOVED*** {
      serialized.bitmapUrl = this.#serializeBitmap(true***REMOVED***;
      serialized.accessibilityData = this.serializeAltText(true***REMOVED***;
      return serialized;
    ***REMOVED***
    const {
      decorative,
      altText
    ***REMOVED*** = this.serializeAltText(false***REMOVED***;
    if (!decorative && altText***REMOVED*** {
      serialized.accessibilityData = {
        type: "Figure",
        alt: altText
      ***REMOVED***;
    ***REMOVED***
    if (this.annotationElementId***REMOVED*** {
      const changes = this.#hasElementChanged(serialized***REMOVED***;
      if (changes.isSame***REMOVED*** {
        return null;
      ***REMOVED***
      if (changes.isSameAltText***REMOVED*** {
        delete serialized.accessibilityData;
      ***REMOVED*** else {
        serialized.accessibilityData.structParent = this._initialData.structParent ?? -1;
      ***REMOVED***
    ***REMOVED***
    serialized.id = this.annotationElementId;
    if (context === null***REMOVED*** {
      return serialized;
    ***REMOVED***
    context.stamps ||= new Map(***REMOVED***;
    const area = this.#isSvg ? (serialized.rect[2] - serialized.rect[0]***REMOVED*** * (serialized.rect[3] - serialized.rect[1]***REMOVED*** : null;
    if (!context.stamps.has(this.#bitmapId***REMOVED******REMOVED*** {
      context.stamps.set(this.#bitmapId, {
        area,
        serialized
      ***REMOVED******REMOVED***;
      serialized.bitmap = this.#serializeBitmap(false***REMOVED***;
    ***REMOVED*** else if (this.#isSvg***REMOVED*** {
      const prevData = context.stamps.get(this.#bitmapId***REMOVED***;
      if (area > prevData.area***REMOVED*** {
        prevData.area = area;
        prevData.serialized.bitmap.close(***REMOVED***;
        prevData.serialized.bitmap = this.#serializeBitmap(false***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    return serialized;
  ***REMOVED***
  #hasElementChanged(serialized***REMOVED*** {
    const {
      pageIndex,
      accessibilityData: {
        altText
      ***REMOVED***
    ***REMOVED*** = this._initialData;
    const isSamePageIndex = serialized.pageIndex === pageIndex;
    const isSameAltText = (serialized.accessibilityData?.alt || ""***REMOVED*** === altText;
***REMOVED***
      isSame: !this._hasBeenMoved && !this._hasBeenResized && isSamePageIndex && isSameAltText,
      isSameAltText
    ***REMOVED***;
  ***REMOVED***
  renderAnnotationElement(annotation***REMOVED*** {
    annotation.updateEdited({
      rect: this.getRect(0, 0***REMOVED***
    ***REMOVED******REMOVED***;
    return null;
  ***REMOVED***
***REMOVED***

;// ./src/display/editor/annotation_editor_layer.js







class AnnotationEditorLayer {
  #accessibilityManager;
  #allowClick = false;
  #annotationLayer = null;
  #clickAC = null;
  #editorFocusTimeoutId = null;
  #editors = new Map(***REMOVED***;
  #hadPointerDown = false;
  #isDisabling = false;
  #isEnabling = false;
  #drawingAC = null;
  #focusedElement = null;
  #textLayer = null;
  #textSelectionAC = null;
  #uiManager;
  static _initialized = false;
  static #editorTypes = new Map([FreeTextEditor, InkEditor, StampEditor, HighlightEditor].map(type => [type._editorType, type]***REMOVED******REMOVED***;
  constructor({
    uiManager,
    pageIndex,
    div,
    structTreeLayer,
    accessibilityManager,
    annotationLayer,
    drawLayer,
    textLayer,
    viewport,
    l10n
  ***REMOVED******REMOVED*** {
    const editorTypes = [...AnnotationEditorLayer.#editorTypes.values(***REMOVED***];
    if (!AnnotationEditorLayer._initialized***REMOVED*** {
      AnnotationEditorLayer._initialized = true;
      for (const editorType of editorTypes***REMOVED*** {
        editorType.initialize(l10n, uiManager***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    uiManager.registerEditorTypes(editorTypes***REMOVED***;
    this.#uiManager = uiManager;
    this.pageIndex = pageIndex;
    this.div = div;
    this.#accessibilityManager = accessibilityManager;
    this.#annotationLayer = annotationLayer;
    this.viewport = viewport;
    this.#textLayer = textLayer;
    this.drawLayer = drawLayer;
    this._structTree = structTreeLayer;
    this.#uiManager.addLayer(this***REMOVED***;
  ***REMOVED***
  get isEmpty(***REMOVED*** {
    return this.#editors.size === 0;
  ***REMOVED***
  get isInvisible(***REMOVED*** {
    return this.isEmpty && this.#uiManager.getMode(***REMOVED*** === AnnotationEditorType.NONE;
  ***REMOVED***
  updateToolbar(mode***REMOVED*** {
    this.#uiManager.updateToolbar(mode***REMOVED***;
  ***REMOVED***
  updateMode(mode = this.#uiManager.getMode(***REMOVED******REMOVED*** {
    this.#cleanup(***REMOVED***;
    switch (mode***REMOVED*** {
      case AnnotationEditorType.NONE:
        this.disableTextSelection(***REMOVED***;
        this.togglePointerEvents(false***REMOVED***;
        this.toggleAnnotationLayerPointerEvents(true***REMOVED***;
        this.disableClick(***REMOVED***;
        return;
      case AnnotationEditorType.INK:
        this.disableTextSelection(***REMOVED***;
        this.togglePointerEvents(true***REMOVED***;
        this.enableClick(***REMOVED***;
        break;
      case AnnotationEditorType.HIGHLIGHT:
        this.enableTextSelection(***REMOVED***;
        this.togglePointerEvents(false***REMOVED***;
        this.disableClick(***REMOVED***;
        break;
      default:
        this.disableTextSelection(***REMOVED***;
        this.togglePointerEvents(true***REMOVED***;
        this.enableClick(***REMOVED***;
    ***REMOVED***
    this.toggleAnnotationLayerPointerEvents(false***REMOVED***;
    const {
      classList
    ***REMOVED*** = this.div;
    for (const editorType of AnnotationEditorLayer.#editorTypes.values(***REMOVED******REMOVED*** {
      classList.toggle(`${editorType._type***REMOVED***Editing`, mode === editorType._editorType***REMOVED***;
    ***REMOVED***
    this.div.hidden = false;
  ***REMOVED***
  hasTextLayer(textLayer***REMOVED*** {
    return textLayer === this.#textLayer?.div;
  ***REMOVED***
  setEditingState(isEditing***REMOVED*** {
    this.#uiManager.setEditingState(isEditing***REMOVED***;
  ***REMOVED***
  addCommands(params***REMOVED*** {
    this.#uiManager.addCommands(params***REMOVED***;
  ***REMOVED***
  cleanUndoStack(type***REMOVED*** {
    this.#uiManager.cleanUndoStack(type***REMOVED***;
  ***REMOVED***
  toggleDrawing(enabled = false***REMOVED*** {
    this.div.classList.toggle("drawing", !enabled***REMOVED***;
  ***REMOVED***
  togglePointerEvents(enabled = false***REMOVED*** {
    this.div.classList.toggle("disabled", !enabled***REMOVED***;
  ***REMOVED***
  toggleAnnotationLayerPointerEvents(enabled = false***REMOVED*** {
    this.#annotationLayer?.div.classList.toggle("disabled", !enabled***REMOVED***;
  ***REMOVED***
  async enable(***REMOVED*** {
    this.#isEnabling = true;
    this.div.tabIndex = 0;
    this.togglePointerEvents(true***REMOVED***;
    const annotationElementIds = new Set(***REMOVED***;
    for (const editor of this.#editors.values(***REMOVED******REMOVED*** {
      editor.enableEditing(***REMOVED***;
      editor.show(true***REMOVED***;
      if (editor.annotationElementId***REMOVED*** {
        this.#uiManager.removeChangedExistingAnnotation(editor***REMOVED***;
        annotationElementIds.add(editor.annotationElementId***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (!this.#annotationLayer***REMOVED*** {
      this.#isEnabling = false;
      return;
    ***REMOVED***
    const editables = this.#annotationLayer.getEditableAnnotations(***REMOVED***;
    for (const editable of editables***REMOVED*** {
      editable.hide(***REMOVED***;
      if (this.#uiManager.isDeletedAnnotationElement(editable.data.id***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      if (annotationElementIds.has(editable.data.id***REMOVED******REMOVED*** {
        continue;
      ***REMOVED***
      const editor = await this.deserialize(editable***REMOVED***;
      if (!editor***REMOVED*** {
        continue;
      ***REMOVED***
      this.addOrRebuild(editor***REMOVED***;
      editor.enableEditing(***REMOVED***;
    ***REMOVED***
    this.#isEnabling = false;
  ***REMOVED***
  disable(***REMOVED*** {
    this.#isDisabling = true;
    this.div.tabIndex = -1;
    this.togglePointerEvents(false***REMOVED***;
    const changedAnnotations = new Map(***REMOVED***;
    const resetAnnotations = new Map(***REMOVED***;
    for (const editor of this.#editors.values(***REMOVED******REMOVED*** {
      editor.disableEditing(***REMOVED***;
      if (!editor.annotationElementId***REMOVED*** {
        continue;
      ***REMOVED***
      if (editor.serialize(***REMOVED*** !== null***REMOVED*** {
        changedAnnotations.set(editor.annotationElementId, editor***REMOVED***;
        continue;
      ***REMOVED*** else {
        resetAnnotations.set(editor.annotationElementId, editor***REMOVED***;
      ***REMOVED***
      this.getEditableAnnotation(editor.annotationElementId***REMOVED***?.show(***REMOVED***;
      editor.remove(***REMOVED***;
    ***REMOVED***
    if (this.#annotationLayer***REMOVED*** {
      const editables = this.#annotationLayer.getEditableAnnotations(***REMOVED***;
      for (const editable of editables***REMOVED*** {
        const {
          id
        ***REMOVED*** = editable.data;
        if (this.#uiManager.isDeletedAnnotationElement(id***REMOVED******REMOVED*** {
          continue;
        ***REMOVED***
        let editor = resetAnnotations.get(id***REMOVED***;
        if (editor***REMOVED*** {
          editor.resetAnnotationElement(editable***REMOVED***;
          editor.show(false***REMOVED***;
          editable.show(***REMOVED***;
          continue;
        ***REMOVED***
        editor = changedAnnotations.get(id***REMOVED***;
        if (editor***REMOVED*** {
          this.#uiManager.addChangedExistingAnnotation(editor***REMOVED***;
          if (editor.renderAnnotationElement(editable***REMOVED******REMOVED*** {
            editor.show(false***REMOVED***;
          ***REMOVED***
        ***REMOVED***
        editable.show(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    this.#cleanup(***REMOVED***;
    if (this.isEmpty***REMOVED*** {
      this.div.hidden = true;
    ***REMOVED***
    const {
      classList
    ***REMOVED*** = this.div;
    for (const editorType of AnnotationEditorLayer.#editorTypes.values(***REMOVED******REMOVED*** {
      classList.remove(`${editorType._type***REMOVED***Editing`***REMOVED***;
    ***REMOVED***
    this.disableTextSelection(***REMOVED***;
    this.toggleAnnotationLayerPointerEvents(true***REMOVED***;
    this.#isDisabling = false;
  ***REMOVED***
  getEditableAnnotation(id***REMOVED*** {
    return this.#annotationLayer?.getEditableAnnotation(id***REMOVED*** || null;
  ***REMOVED***
  setActiveEditor(editor***REMOVED*** {
    const currentActive = this.#uiManager.getActive(***REMOVED***;
    if (currentActive === editor***REMOVED*** {
      return;
    ***REMOVED***
    this.#uiManager.setActiveEditor(editor***REMOVED***;
  ***REMOVED***
  enableTextSelection(***REMOVED*** {
    this.div.tabIndex = -1;
    if (this.#textLayer?.div && !this.#textSelectionAC***REMOVED*** {
      this.#textSelectionAC = new AbortController(***REMOVED***;
      const signal = this.#uiManager.combinedSignal(this.#textSelectionAC***REMOVED***;
      this.#textLayer.div.addEventListener("pointerdown", this.#textLayerPointerDown.bind(this***REMOVED***, {
        signal
      ***REMOVED******REMOVED***;
      this.#textLayer.div.classList.add("highlighting"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  disableTextSelection(***REMOVED*** {
    this.div.tabIndex = 0;
    if (this.#textLayer?.div && this.#textSelectionAC***REMOVED*** {
      this.#textSelectionAC.abort(***REMOVED***;
      this.#textSelectionAC = null;
      this.#textLayer.div.classList.remove("highlighting"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  #textLayerPointerDown(event***REMOVED*** {
    this.#uiManager.unselectAll(***REMOVED***;
    const {
      target
    ***REMOVED*** = event;
    if (target === this.#textLayer.div || (target.getAttribute("role"***REMOVED*** === "img" || target.classList.contains("endOfContent"***REMOVED******REMOVED*** && this.#textLayer.div.contains(target***REMOVED******REMOVED*** {
      const {
        isMac
      ***REMOVED*** = util_FeatureTest.platform;
      if (event.button !== 0 || event.ctrlKey && isMac***REMOVED*** {
        return;
      ***REMOVED***
      this.#uiManager.showAllEditors("highlight", true, true***REMOVED***;
      this.#textLayer.div.classList.add("free"***REMOVED***;
      this.toggleDrawing(***REMOVED***;
      HighlightEditor.startHighlighting(this, this.#uiManager.direction === "ltr", {
        target: this.#textLayer.div,
        x: event.x,
        y: event.y
      ***REMOVED******REMOVED***;
      this.#textLayer.div.addEventListener("pointerup", (***REMOVED*** => {
        this.#textLayer.div.classList.remove("free"***REMOVED***;
        this.toggleDrawing(true***REMOVED***;
      ***REMOVED***, {
        once: true,
        signal: this.#uiManager._signal
      ***REMOVED******REMOVED***;
      event.preventDefault(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  enableClick(***REMOVED*** {
    if (this.#clickAC***REMOVED*** {
      return;
    ***REMOVED***
    this.#clickAC = new AbortController(***REMOVED***;
    const signal = this.#uiManager.combinedSignal(this.#clickAC***REMOVED***;
    this.div.addEventListener("pointerdown", this.pointerdown.bind(this***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    const pointerup = this.pointerup.bind(this***REMOVED***;
    this.div.addEventListener("pointerup", pointerup, {
      signal
    ***REMOVED******REMOVED***;
    this.div.addEventListener("pointercancel", pointerup, {
      signal
    ***REMOVED******REMOVED***;
  ***REMOVED***
  disableClick(***REMOVED*** {
    this.#clickAC?.abort(***REMOVED***;
    this.#clickAC = null;
  ***REMOVED***
  attach(editor***REMOVED*** {
    this.#editors.set(editor.id, editor***REMOVED***;
    const {
      annotationElementId
    ***REMOVED*** = editor;
    if (annotationElementId && this.#uiManager.isDeletedAnnotationElement(annotationElementId***REMOVED******REMOVED*** {
      this.#uiManager.removeDeletedAnnotationElement(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  detach(editor***REMOVED*** {
    this.#editors.delete(editor.id***REMOVED***;
    this.#accessibilityManager?.removePointerInTextLayer(editor.contentDiv***REMOVED***;
    if (!this.#isDisabling && editor.annotationElementId***REMOVED*** {
      this.#uiManager.addDeletedAnnotationElement(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  remove(editor***REMOVED*** {
    this.detach(editor***REMOVED***;
    this.#uiManager.removeEditor(editor***REMOVED***;
    editor.div.remove(***REMOVED***;
    editor.isAttachedToDOM = false;
  ***REMOVED***
  changeParent(editor***REMOVED*** {
    if (editor.parent === this***REMOVED*** {
      return;
    ***REMOVED***
    if (editor.parent && editor.annotationElementId***REMOVED*** {
      this.#uiManager.addDeletedAnnotationElement(editor.annotationElementId***REMOVED***;
      AnnotationEditor.deleteAnnotationElement(editor***REMOVED***;
      editor.annotationElementId = null;
    ***REMOVED***
    this.attach(editor***REMOVED***;
    editor.parent?.detach(editor***REMOVED***;
    editor.setParent(this***REMOVED***;
    if (editor.div && editor.isAttachedToDOM***REMOVED*** {
      editor.div.remove(***REMOVED***;
      this.div.append(editor.div***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  add(editor***REMOVED*** {
    if (editor.parent === this && editor.isAttachedToDOM***REMOVED*** {
      return;
    ***REMOVED***
    this.changeParent(editor***REMOVED***;
    this.#uiManager.addEditor(editor***REMOVED***;
    this.attach(editor***REMOVED***;
    if (!editor.isAttachedToDOM***REMOVED*** {
      const div = editor.render(***REMOVED***;
      this.div.append(div***REMOVED***;
      editor.isAttachedToDOM = true;
    ***REMOVED***
    editor.fixAndSetPosition(***REMOVED***;
    editor.onceAdded(!this.#isEnabling***REMOVED***;
    this.#uiManager.addToAnnotationStorage(editor***REMOVED***;
    editor._reportTelemetry(editor.telemetryInitialData***REMOVED***;
  ***REMOVED***
  moveEditorInDOM(editor***REMOVED*** {
    if (!editor.isAttachedToDOM***REMOVED*** {
      return;
    ***REMOVED***
    const {
      activeElement
    ***REMOVED*** = document;
    if (editor.div.contains(activeElement***REMOVED*** && !this.#editorFocusTimeoutId***REMOVED*** {
      editor._focusEventsAllowed = false;
      this.#editorFocusTimeoutId = setTimeout((***REMOVED*** => {
        this.#editorFocusTimeoutId = null;
        if (!editor.div.contains(document.activeElement***REMOVED******REMOVED*** {
          editor.div.addEventListener("focusin", (***REMOVED*** => {
            editor._focusEventsAllowed = true;
          ***REMOVED***, {
            once: true,
            signal: this.#uiManager._signal
          ***REMOVED******REMOVED***;
          activeElement.focus(***REMOVED***;
        ***REMOVED*** else {
          editor._focusEventsAllowed = true;
        ***REMOVED***
      ***REMOVED***, 0***REMOVED***;
    ***REMOVED***
    editor._structTreeParentId = this.#accessibilityManager?.moveElementInDOM(this.div, editor.div, editor.contentDiv, true***REMOVED***;
  ***REMOVED***
  addOrRebuild(editor***REMOVED*** {
    if (editor.needsToBeRebuilt(***REMOVED******REMOVED*** {
      editor.parent ||= this;
      editor.rebuild(***REMOVED***;
      editor.show(***REMOVED***;
    ***REMOVED*** else {
      this.add(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  addUndoableEditor(editor***REMOVED*** {
    const cmd = (***REMOVED*** => editor._uiManager.rebuild(editor***REMOVED***;
    const undo = (***REMOVED*** => {
      editor.remove(***REMOVED***;
    ***REMOVED***;
    this.addCommands({
      cmd,
      undo,
      mustExec: false
    ***REMOVED******REMOVED***;
  ***REMOVED***
  getNextId(***REMOVED*** {
    return this.#uiManager.getId(***REMOVED***;
  ***REMOVED***
  get #currentEditorType(***REMOVED*** {
    return AnnotationEditorLayer.#editorTypes.get(this.#uiManager.getMode(***REMOVED******REMOVED***;
  ***REMOVED***
  combinedSignal(ac***REMOVED*** {
    return this.#uiManager.combinedSignal(ac***REMOVED***;
  ***REMOVED***
  #createNewEditor(params***REMOVED*** {
    const editorType = this.#currentEditorType;
    return editorType ? new editorType.prototype.constructor(params***REMOVED*** : null;
  ***REMOVED***
  canCreateNewEmptyEditor(***REMOVED*** {
    return this.#currentEditorType?.canCreateNewEmptyEditor(***REMOVED***;
  ***REMOVED***
  pasteEditor(mode, params***REMOVED*** {
    this.#uiManager.updateToolbar(mode***REMOVED***;
    this.#uiManager.updateMode(mode***REMOVED***;
    const {
      offsetX,
      offsetY
    ***REMOVED*** = this.#getCenterPoint(***REMOVED***;
    const id = this.getNextId(***REMOVED***;
    const editor = this.#createNewEditor({
      parent: this,
      id,
      x: offsetX,
      y: offsetY,
      uiManager: this.#uiManager,
      isCentered: true,
      ...params
    ***REMOVED******REMOVED***;
    if (editor***REMOVED*** {
      this.add(editor***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  async deserialize(data***REMOVED*** {
    return (await AnnotationEditorLayer.#editorTypes.get(data.annotationType ?? data.annotationEditorType***REMOVED***?.deserialize(data, this, this.#uiManager***REMOVED******REMOVED*** || null;
  ***REMOVED***
  createAndAddNewEditor(event, isCentered, data = {***REMOVED******REMOVED*** {
    const id = this.getNextId(***REMOVED***;
    const editor = this.#createNewEditor({
      parent: this,
      id,
      x: event.offsetX,
      y: event.offsetY,
      uiManager: this.#uiManager,
      isCentered,
      ...data
    ***REMOVED******REMOVED***;
    if (editor***REMOVED*** {
      this.add(editor***REMOVED***;
    ***REMOVED***
    return editor;
  ***REMOVED***
  #getCenterPoint(***REMOVED*** {
    const {
      x,
      y,
      width,
      height
    ***REMOVED*** = this.div.getBoundingClientRect(***REMOVED***;
    const tlX = Math.max(0, x***REMOVED***;
    const tlY = Math.max(0, y***REMOVED***;
    const brX = Math.min(window.innerWidth, x + width***REMOVED***;
    const brY = Math.min(window.innerHeight, y + height***REMOVED***;
    const centerX = (tlX + brX***REMOVED*** / 2 - x;
    const centerY = (tlY + brY***REMOVED*** / 2 - y;
    const [offsetX, offsetY] = this.viewport.rotation % 180 === 0 ? [centerX, centerY] : [centerY, centerX];
***REMOVED***
      offsetX,
      offsetY
    ***REMOVED***;
  ***REMOVED***
  addNewEditor(***REMOVED*** {
    this.createAndAddNewEditor(this.#getCenterPoint(***REMOVED***, true***REMOVED***;
  ***REMOVED***
  setSelected(editor***REMOVED*** {
    this.#uiManager.setSelected(editor***REMOVED***;
  ***REMOVED***
  toggleSelected(editor***REMOVED*** {
    this.#uiManager.toggleSelected(editor***REMOVED***;
  ***REMOVED***
  unselect(editor***REMOVED*** {
    this.#uiManager.unselect(editor***REMOVED***;
  ***REMOVED***
  pointerup(event***REMOVED*** {
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac***REMOVED*** {
      return;
    ***REMOVED***
    if (event.target !== this.div***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#hadPointerDown***REMOVED*** {
      return;
    ***REMOVED***
    this.#hadPointerDown = false;
    if (this.#currentEditorType?.isDrawer && this.#currentEditorType.supportMultipleDrawings***REMOVED*** {
      return;
    ***REMOVED***
    if (!this.#allowClick***REMOVED*** {
      this.#allowClick = true;
      return;
    ***REMOVED***
    if (this.#uiManager.getMode(***REMOVED*** === AnnotationEditorType.STAMP***REMOVED*** {
      this.#uiManager.unselectAll(***REMOVED***;
      return;
    ***REMOVED***
    this.createAndAddNewEditor(event, false***REMOVED***;
  ***REMOVED***
  pointerdown(event***REMOVED*** {
    if (this.#uiManager.getMode(***REMOVED*** === AnnotationEditorType.HIGHLIGHT***REMOVED*** {
      this.enableTextSelection(***REMOVED***;
    ***REMOVED***
    if (this.#hadPointerDown***REMOVED*** {
      this.#hadPointerDown = false;
      return;
    ***REMOVED***
    const {
      isMac
    ***REMOVED*** = util_FeatureTest.platform;
    if (event.button !== 0 || event.ctrlKey && isMac***REMOVED*** {
      return;
    ***REMOVED***
    if (event.target !== this.div***REMOVED*** {
      return;
    ***REMOVED***
    this.#hadPointerDown = true;
    if (this.#currentEditorType?.isDrawer***REMOVED*** {
      this.startDrawingSession(event***REMOVED***;
      return;
    ***REMOVED***
    const editor = this.#uiManager.getActive(***REMOVED***;
    this.#allowClick = !editor || editor.isEmpty(***REMOVED***;
  ***REMOVED***
  startDrawingSession(event***REMOVED*** {
    this.div.focus(***REMOVED***;
    if (this.#drawingAC***REMOVED*** {
      this.#currentEditorType.startDrawing(this, this.#uiManager, false, event***REMOVED***;
      return;
    ***REMOVED***
    this.#uiManager.setCurrentDrawingSession(this***REMOVED***;
    this.#drawingAC = new AbortController(***REMOVED***;
    const signal = this.#uiManager.combinedSignal(this.#drawingAC***REMOVED***;
    this.div.addEventListener("blur", ({
      relatedTarget
    ***REMOVED******REMOVED*** => {
      if (relatedTarget && !this.div.contains(relatedTarget***REMOVED******REMOVED*** {
        this.#focusedElement = null;
        this.commitOrRemove(***REMOVED***;
      ***REMOVED***
    ***REMOVED***, {
      signal
    ***REMOVED******REMOVED***;
    this.#currentEditorType.startDrawing(this, this.#uiManager, false, event***REMOVED***;
  ***REMOVED***
  pause(on***REMOVED*** {
    if (on***REMOVED*** {
      const {
        activeElement
      ***REMOVED*** = document;
      if (this.div.contains(activeElement***REMOVED******REMOVED*** {
        this.#focusedElement = activeElement;
      ***REMOVED***
      return;
    ***REMOVED***
    if (this.#focusedElement***REMOVED*** {
      setTimeout((***REMOVED*** => {
        this.#focusedElement?.focus(***REMOVED***;
        this.#focusedElement = null;
      ***REMOVED***, 0***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  endDrawingSession(isAborted = false***REMOVED*** {
    if (!this.#drawingAC***REMOVED*** {
      return null;
    ***REMOVED***
    this.#uiManager.setCurrentDrawingSession(null***REMOVED***;
    this.#drawingAC.abort(***REMOVED***;
    this.#drawingAC = null;
    this.#focusedElement = null;
    return this.#currentEditorType.endDrawing(isAborted***REMOVED***;
  ***REMOVED***
  findNewParent(editor, x, y***REMOVED*** {
    const layer = this.#uiManager.findParent(x, y***REMOVED***;
    if (layer === null || layer === this***REMOVED*** {
      return false;
    ***REMOVED***
    layer.changeParent(editor***REMOVED***;
    return true;
  ***REMOVED***
  commitOrRemove(***REMOVED*** {
    if (this.#drawingAC***REMOVED*** {
      this.endDrawingSession(***REMOVED***;
      return true;
    ***REMOVED***
    return false;
  ***REMOVED***
  onScaleChanging(***REMOVED*** {
    if (!this.#drawingAC***REMOVED*** {
      return;
    ***REMOVED***
    this.#currentEditorType.onScaleChangingWhenDrawing(this***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.commitOrRemove(***REMOVED***;
    if (this.#uiManager.getActive(***REMOVED***?.parent === this***REMOVED*** {
      this.#uiManager.commitOrRemove(***REMOVED***;
      this.#uiManager.setActiveEditor(null***REMOVED***;
    ***REMOVED***
    if (this.#editorFocusTimeoutId***REMOVED*** {
      clearTimeout(this.#editorFocusTimeoutId***REMOVED***;
      this.#editorFocusTimeoutId = null;
    ***REMOVED***
    for (const editor of this.#editors.values(***REMOVED******REMOVED*** {
      this.#accessibilityManager?.removePointerInTextLayer(editor.contentDiv***REMOVED***;
      editor.setParent(null***REMOVED***;
      editor.isAttachedToDOM = false;
      editor.div.remove(***REMOVED***;
    ***REMOVED***
    this.div = null;
    this.#editors.clear(***REMOVED***;
    this.#uiManager.removeLayer(this***REMOVED***;
  ***REMOVED***
  #cleanup(***REMOVED*** {
    for (const editor of this.#editors.values(***REMOVED******REMOVED*** {
      if (editor.isEmpty(***REMOVED******REMOVED*** {
        editor.remove(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  render({
    viewport
  ***REMOVED******REMOVED*** {
    this.viewport = viewport;
    setLayerDimensions(this.div, viewport***REMOVED***;
    for (const editor of this.#uiManager.getEditors(this.pageIndex***REMOVED******REMOVED*** {
      this.add(editor***REMOVED***;
      editor.rebuild(***REMOVED***;
    ***REMOVED***
    this.updateMode(***REMOVED***;
  ***REMOVED***
  update({
    viewport
  ***REMOVED******REMOVED*** {
    this.#uiManager.commitOrRemove(***REMOVED***;
    this.#cleanup(***REMOVED***;
    const oldRotation = this.viewport.rotation;
    const rotation = viewport.rotation;
    this.viewport = viewport;
    setLayerDimensions(this.div, {
      rotation
    ***REMOVED******REMOVED***;
    if (oldRotation !== rotation***REMOVED*** {
      for (const editor of this.#editors.values(***REMOVED******REMOVED*** {
        editor.rotate(rotation***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  get pageDimensions(***REMOVED*** {
    const {
      pageWidth,
      pageHeight
    ***REMOVED*** = this.viewport.rawDims;
    return [pageWidth, pageHeight];
  ***REMOVED***
  get scale(***REMOVED*** {
    return this.#uiManager.viewParameters.realScale;
  ***REMOVED***
***REMOVED***

;// ./src/display/draw_layer.js


class DrawLayer {
  #parent = null;
  #id = 0;
  #mapping = new Map(***REMOVED***;
  #toUpdate = new Map(***REMOVED***;
  constructor({
    pageIndex
  ***REMOVED******REMOVED*** {
    this.pageIndex = pageIndex;
  ***REMOVED***
  setParent(parent***REMOVED*** {
    if (!this.#parent***REMOVED*** {
      this.#parent = parent;
      return;
    ***REMOVED***
    if (this.#parent !== parent***REMOVED*** {
      if (this.#mapping.size > 0***REMOVED*** {
        for (const root of this.#mapping.values(***REMOVED******REMOVED*** {
          root.remove(***REMOVED***;
          parent.append(root***REMOVED***;
        ***REMOVED***
      ***REMOVED***
      this.#parent = parent;
    ***REMOVED***
  ***REMOVED***
  static get _svgFactory(***REMOVED*** {
    return shadow(this, "_svgFactory", new DOMSVGFactory(***REMOVED******REMOVED***;
  ***REMOVED***
  static #setBox(element, [x, y, width, height]***REMOVED*** {
    const {
      style
    ***REMOVED*** = element;
    style.top = `${100 * y***REMOVED***%`;
    style.left = `${100 * x***REMOVED***%`;
    style.width = `${100 * width***REMOVED***%`;
    style.height = `${100 * height***REMOVED***%`;
  ***REMOVED***
  #createSVG(***REMOVED*** {
    const svg = DrawLayer._svgFactory.create(1, 1, true***REMOVED***;
    this.#parent.append(svg***REMOVED***;
    svg.setAttribute("aria-hidden", true***REMOVED***;
    return svg;
  ***REMOVED***
  #createClipPath(defs, pathId***REMOVED*** {
    const clipPath = DrawLayer._svgFactory.createElement("clipPath"***REMOVED***;
    defs.append(clipPath***REMOVED***;
    const clipPathId = `clip_${pathId***REMOVED***`;
    clipPath.setAttribute("id", clipPathId***REMOVED***;
    clipPath.setAttribute("clipPathUnits", "objectBoundingBox"***REMOVED***;
    const clipPathUse = DrawLayer._svgFactory.createElement("use"***REMOVED***;
    clipPath.append(clipPathUse***REMOVED***;
    clipPathUse.setAttribute("href", `#${pathId***REMOVED***`***REMOVED***;
    clipPathUse.classList.add("clip"***REMOVED***;
    return clipPathId;
  ***REMOVED***
  #updateProperties(element, properties***REMOVED*** {
    for (const [key, value] of Object.entries(properties***REMOVED******REMOVED*** {
      if (value === null***REMOVED*** {
        element.removeAttribute(key***REMOVED***;
      ***REMOVED*** else {
        element.setAttribute(key, value***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  draw(properties, isPathUpdatable = false, hasClip = false***REMOVED*** {
    const id = this.#id++;
    const root = this.#createSVG(***REMOVED***;
    const defs = DrawLayer._svgFactory.createElement("defs"***REMOVED***;
    root.append(defs***REMOVED***;
    const path = DrawLayer._svgFactory.createElement("path"***REMOVED***;
    defs.append(path***REMOVED***;
    const pathId = `path_p${this.pageIndex***REMOVED***_${id***REMOVED***`;
    path.setAttribute("id", pathId***REMOVED***;
    path.setAttribute("vector-effect", "non-scaling-stroke"***REMOVED***;
    if (isPathUpdatable***REMOVED*** {
      this.#toUpdate.set(id, path***REMOVED***;
    ***REMOVED***
    const clipPathId = hasClip ? this.#createClipPath(defs, pathId***REMOVED*** : null;
    const use = DrawLayer._svgFactory.createElement("use"***REMOVED***;
    root.append(use***REMOVED***;
    use.setAttribute("href", `#${pathId***REMOVED***`***REMOVED***;
    this.updateProperties(root, properties***REMOVED***;
    this.#mapping.set(id, root***REMOVED***;
***REMOVED***
      id,
      clipPathId: `url(#${clipPathId***REMOVED******REMOVED***`
    ***REMOVED***;
  ***REMOVED***
  drawOutline(properties, mustRemoveSelfIntersections***REMOVED*** {
    const id = this.#id++;
    const root = this.#createSVG(***REMOVED***;
    const defs = DrawLayer._svgFactory.createElement("defs"***REMOVED***;
    root.append(defs***REMOVED***;
    const path = DrawLayer._svgFactory.createElement("path"***REMOVED***;
    defs.append(path***REMOVED***;
    const pathId = `path_p${this.pageIndex***REMOVED***_${id***REMOVED***`;
    path.setAttribute("id", pathId***REMOVED***;
    path.setAttribute("vector-effect", "non-scaling-stroke"***REMOVED***;
    let maskId;
    if (mustRemoveSelfIntersections***REMOVED*** {
      const mask = DrawLayer._svgFactory.createElement("mask"***REMOVED***;
      defs.append(mask***REMOVED***;
      maskId = `mask_p${this.pageIndex***REMOVED***_${id***REMOVED***`;
      mask.setAttribute("id", maskId***REMOVED***;
      mask.setAttribute("maskUnits", "objectBoundingBox"***REMOVED***;
      const rect = DrawLayer._svgFactory.createElement("rect"***REMOVED***;
      mask.append(rect***REMOVED***;
      rect.setAttribute("width", "1"***REMOVED***;
      rect.setAttribute("height", "1"***REMOVED***;
      rect.setAttribute("fill", "white"***REMOVED***;
      const use = DrawLayer._svgFactory.createElement("use"***REMOVED***;
      mask.append(use***REMOVED***;
      use.setAttribute("href", `#${pathId***REMOVED***`***REMOVED***;
      use.setAttribute("stroke", "none"***REMOVED***;
      use.setAttribute("fill", "black"***REMOVED***;
      use.setAttribute("fill-rule", "nonzero"***REMOVED***;
      use.classList.add("mask"***REMOVED***;
    ***REMOVED***
    const use1 = DrawLayer._svgFactory.createElement("use"***REMOVED***;
    root.append(use1***REMOVED***;
    use1.setAttribute("href", `#${pathId***REMOVED***`***REMOVED***;
    if (maskId***REMOVED*** {
      use1.setAttribute("mask", `url(#${maskId***REMOVED******REMOVED***`***REMOVED***;
    ***REMOVED***
    const use2 = use1.cloneNode(***REMOVED***;
    root.append(use2***REMOVED***;
    use1.classList.add("mainOutline"***REMOVED***;
    use2.classList.add("secondaryOutline"***REMOVED***;
    this.updateProperties(root, properties***REMOVED***;
    this.#mapping.set(id, root***REMOVED***;
    return id;
  ***REMOVED***
  finalizeDraw(id, properties***REMOVED*** {
    this.#toUpdate.delete(id***REMOVED***;
    this.updateProperties(id, properties***REMOVED***;
  ***REMOVED***
  updateProperties(elementOrId, properties***REMOVED*** {
    if (!properties***REMOVED*** {
      return;
    ***REMOVED***
    const {
      root,
      bbox,
      rootClass,
      path
    ***REMOVED*** = properties;
    const element = typeof elementOrId === "number" ? this.#mapping.get(elementOrId***REMOVED*** : elementOrId;
    if (!element***REMOVED*** {
      return;
    ***REMOVED***
    if (root***REMOVED*** {
      this.#updateProperties(element, root***REMOVED***;
    ***REMOVED***
    if (bbox***REMOVED*** {
      DrawLayer.#setBox(element, bbox***REMOVED***;
    ***REMOVED***
    if (rootClass***REMOVED*** {
      const {
        classList
      ***REMOVED*** = element;
      for (const [className, value] of Object.entries(rootClass***REMOVED******REMOVED*** {
        classList.toggle(className, value***REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (path***REMOVED*** {
      const defs = element.firstChild;
      const pathElement = defs.firstChild;
      this.#updateProperties(pathElement, path***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  updateParent(id, layer***REMOVED*** {
    if (layer === this***REMOVED*** {
      return;
    ***REMOVED***
    const root = this.#mapping.get(id***REMOVED***;
    if (!root***REMOVED*** {
      return;
    ***REMOVED***
    layer.#parent.append(root***REMOVED***;
    this.#mapping.delete(id***REMOVED***;
    layer.#mapping.set(id, root***REMOVED***;
  ***REMOVED***
  remove(id***REMOVED*** {
    this.#toUpdate.delete(id***REMOVED***;
    if (this.#parent === null***REMOVED*** {
      return;
    ***REMOVED***
    this.#mapping.get(id***REMOVED***.remove(***REMOVED***;
    this.#mapping.delete(id***REMOVED***;
  ***REMOVED***
  destroy(***REMOVED*** {
    this.#parent = null;
    for (const root of this.#mapping.values(***REMOVED******REMOVED*** {
      root.remove(***REMOVED***;
    ***REMOVED***
    this.#mapping.clear(***REMOVED***;
    this.#toUpdate.clear(***REMOVED***;
  ***REMOVED***
***REMOVED***

;// ./src/pdf.js














const pdfjsVersion = "4.10.38";
const pdfjsBuild = "f9bea397f";
{
  globalThis.pdfjsTestingUtils = {
    HighlightOutliner: HighlightOutliner
  ***REMOVED***;
***REMOVED***

var __webpack_exports__AbortException = __webpack_exports__.AbortException;
var __webpack_exports__AnnotationEditorLayer = __webpack_exports__.AnnotationEditorLayer;
var __webpack_exports__AnnotationEditorParamsType = __webpack_exports__.AnnotationEditorParamsType;
var __webpack_exports__AnnotationEditorType = __webpack_exports__.AnnotationEditorType;
var __webpack_exports__AnnotationEditorUIManager = __webpack_exports__.AnnotationEditorUIManager;
var __webpack_exports__AnnotationLayer = __webpack_exports__.AnnotationLayer;
var __webpack_exports__AnnotationMode = __webpack_exports__.AnnotationMode;
var __webpack_exports__ColorPicker = __webpack_exports__.ColorPicker;
var __webpack_exports__DOMSVGFactory = __webpack_exports__.DOMSVGFactory;
var __webpack_exports__DrawLayer = __webpack_exports__.DrawLayer;
var __webpack_exports__FeatureTest = __webpack_exports__.FeatureTest;
var __webpack_exports__GlobalWorkerOptions = __webpack_exports__.GlobalWorkerOptions;
var __webpack_exports__ImageKind = __webpack_exports__.ImageKind;
var __webpack_exports__InvalidPDFException = __webpack_exports__.InvalidPDFException;
var __webpack_exports__MissingPDFException = __webpack_exports__.MissingPDFException;
var __webpack_exports__OPS = __webpack_exports__.OPS;
var __webpack_exports__OutputScale = __webpack_exports__.OutputScale;
var __webpack_exports__PDFDataRangeTransport = __webpack_exports__.PDFDataRangeTransport;
var __webpack_exports__PDFDateString = __webpack_exports__.PDFDateString;
var __webpack_exports__PDFWorker = __webpack_exports__.PDFWorker;
var __webpack_exports__PasswordResponses = __webpack_exports__.PasswordResponses;
var __webpack_exports__PermissionFlag = __webpack_exports__.PermissionFlag;
var __webpack_exports__PixelsPerInch = __webpack_exports__.PixelsPerInch;
var __webpack_exports__RenderingCancelledException = __webpack_exports__.RenderingCancelledException;
var __webpack_exports__TextLayer = __webpack_exports__.TextLayer;
var __webpack_exports__TouchManager = __webpack_exports__.TouchManager;
var __webpack_exports__UnexpectedResponseException = __webpack_exports__.UnexpectedResponseException;
var __webpack_exports__Util = __webpack_exports__.Util;
var __webpack_exports__VerbosityLevel = __webpack_exports__.VerbosityLevel;
var __webpack_exports__XfaLayer = __webpack_exports__.XfaLayer;
var __webpack_exports__build = __webpack_exports__.build;
var __webpack_exports__createValidAbsoluteUrl = __webpack_exports__.createValidAbsoluteUrl;
var __webpack_exports__fetchData = __webpack_exports__.fetchData;
var __webpack_exports__getDocument = __webpack_exports__.getDocument;
var __webpack_exports__getFilenameFromUrl = __webpack_exports__.getFilenameFromUrl;
var __webpack_exports__getPdfFilenameFromUrl = __webpack_exports__.getPdfFilenameFromUrl;
var __webpack_exports__getXfaPageViewport = __webpack_exports__.getXfaPageViewport;
var __webpack_exports__isDataScheme = __webpack_exports__.isDataScheme;
var __webpack_exports__isPdfFile = __webpack_exports__.isPdfFile;
var __webpack_exports__noContextMenu = __webpack_exports__.noContextMenu;
var __webpack_exports__normalizeUnicode = __webpack_exports__.normalizeUnicode;
var __webpack_exports__setLayerDimensions = __webpack_exports__.setLayerDimensions;
var __webpack_exports__shadow = __webpack_exports__.shadow;
var __webpack_exports__stopEvent = __webpack_exports__.stopEvent;
var __webpack_exports__version = __webpack_exports__.version;
export { __webpack_exports__AbortException as AbortException, __webpack_exports__AnnotationEditorLayer as AnnotationEditorLayer, __webpack_exports__AnnotationEditorParamsType as AnnotationEditorParamsType, __webpack_exports__AnnotationEditorType as AnnotationEditorType, __webpack_exports__AnnotationEditorUIManager as AnnotationEditorUIManager, __webpack_exports__AnnotationLayer as AnnotationLayer, __webpack_exports__AnnotationMode as AnnotationMode, __webpack_exports__ColorPicker as ColorPicker, __webpack_exports__DOMSVGFactory as DOMSVGFactory, __webpack_exports__DrawLayer as DrawLayer, __webpack_exports__FeatureTest as FeatureTest, __webpack_exports__GlobalWorkerOptions as GlobalWorkerOptions, __webpack_exports__ImageKind as ImageKind, __webpack_exports__InvalidPDFException as InvalidPDFException, __webpack_exports__MissingPDFException as MissingPDFException, __webpack_exports__OPS as OPS, __webpack_exports__OutputScale as OutputScale, __webpack_exports__PDFDataRangeTransport as PDFDataRangeTransport, __webpack_exports__PDFDateString as PDFDateString, __webpack_exports__PDFWorker as PDFWorker, __webpack_exports__PasswordResponses as PasswordResponses, __webpack_exports__PermissionFlag as PermissionFlag, __webpack_exports__PixelsPerInch as PixelsPerInch, __webpack_exports__RenderingCancelledException as RenderingCancelledException, __webpack_exports__TextLayer as TextLayer, __webpack_exports__TouchManager as TouchManager, __webpack_exports__UnexpectedResponseException as UnexpectedResponseException, __webpack_exports__Util as Util, __webpack_exports__VerbosityLevel as VerbosityLevel, __webpack_exports__XfaLayer as XfaLayer, __webpack_exports__build as build, __webpack_exports__createValidAbsoluteUrl as createValidAbsoluteUrl, __webpack_exports__fetchData as fetchData, __webpack_exports__getDocument as getDocument, __webpack_exports__getFilenameFromUrl as getFilenameFromUrl, __webpack_exports__getPdfFilenameFromUrl as getPdfFilenameFromUrl, __webpack_exports__getXfaPageViewport as getXfaPageViewport, __webpack_exports__isDataScheme as isDataScheme, __webpack_exports__isPdfFile as isPdfFile, __webpack_exports__noContextMenu as noContextMenu, __webpack_exports__normalizeUnicode as normalizeUnicode, __webpack_exports__setLayerDimensions as setLayerDimensions, __webpack_exports__shadow as shadow, __webpack_exports__stopEvent as stopEvent, __webpack_exports__version as version ***REMOVED***;

//# sourceMappingURL=pdf.mjs.map