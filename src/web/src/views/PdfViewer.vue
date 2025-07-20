***REMOVED***
export interface RefDocsItem {
  filename: string
  url: string
  page_no: number
  content_pos: {
    page_no: number
    left_top: {
      x: number
      y: number
    ***REMOVED***
    right_bottom: {
      x: number
      y: number
    ***REMOVED***
  ***REMOVED***[]
***REMOVED***
interface Props {
  dcsInfo: RefDocsItem
***REMOVED***
const props = defineProps<Props>(***REMOVED***
const pdfUrl = ref(''***REMOVED*** // pdf文件地址
const fileUrl = '/pdfjs-4.10.38-dist/web/viewer.html?file=' // pdfjs文件地址
const isRender = ref(false***REMOVED*** // 是否渲染
// 源码渲染函数修改的位置在下面两个函数中
// 初次渲染：setInitialView(storedHash, { rotation, sidebarView, scrollMode, spreadMode ***REMOVED*** = {***REMOVED******REMOVED***
// 更新渲染：#updateUIState(resetNumPages = false***REMOVED***
// 跳转函数位置: scrollPageIntoView
onMounted((***REMOVED*** => {
  // encodeURIComponent(***REMOVED*** 函数可把字符串作为 URI 组件进行编码。
  // 核心就是将 iframe 的 src 属性设置为 pdfjs 的地址，然后将 pdf 文件的地址作为参数传递给 pdfjs
  // 例如：http://localhost:8080/pdfjs-4.0.189-dist/web/viewer.html?file=http%3A%2F%2Flocalhost%3A8080%2Fpdf%2Ftest.pdf
  pdfUrl.value
        = `${fileUrl
        + encodeURIComponent(props.dcsInfo.url***REMOVED***
    ***REMOVED***&page=${props.dcsInfo.page_no***REMOVED***`
    + `&content_pos=${encodeURIComponent(
      JSON.stringify(props.dcsInfo.content_pos***REMOVED***,
    ***REMOVED******REMOVED***`
  console.log('pdfUrl===>', pdfUrl.value***REMOVED***

  nextTick((***REMOVED*** => {
    isRender.value = true
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***
const myIframe = ref
// pdf 资源发生改变
watch(
  (***REMOVED*** => props.dcsInfo,
  (val, old***REMOVED*** => {
    // 判断是否需要重新渲染，因为有些只是跳页
    if (isRender.value***REMOVED*** {
      // 同一个文件，跳转到指定位置
      if (pdfUrl.value !== '' && val.filename === old.filename***REMOVED*** {
        // @ts-ignore
        const pdfFrame = myIframe.contentWindow
        // 传递参数
        pdfFrame.PDFViewerApplication.pdfViewer.scrollPageIntoView({
          pageNumber: props.dcsInfo.page_no,
          content_pos: props.dcsInfo.content_pos,
        ***REMOVED******REMOVED***
      ***REMOVED*** else {
        pdfUrl.value
                    = `${fileUrl
                    + encodeURIComponent(props.dcsInfo.url***REMOVED***
          ***REMOVED***&page=${props.dcsInfo.page_no***REMOVED***`
          + `&content_pos=${encodeURIComponent(
            JSON.stringify(props.dcsInfo.content_pos***REMOVED***,
          ***REMOVED******REMOVED***`
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED***
***REMOVED***

***REMOVED***
  <div class="container">
    <iframe
      id="myIframe"
      ref="myIframe"
      :src="pdfUrl"
      width="100%"
      height="100%"
    ></iframe>
  </div>
***REMOVED***

<style scoped lang="scss">
.container {
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
