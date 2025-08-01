<script lang="tsx" setup>
import { Transformer ***REMOVED*** from 'markmap-lib'
import { Toolbar ***REMOVED*** from 'markmap-toolbar'
import { Markmap ***REMOVED*** from 'markmap-view'
import * as GlobalAPI from '@/api'
import PdfViewer from './PdfViewer.vue'

const transformer = new Transformer(***REMOVED***
const initValue = ref(
  `# 大模型测试助手\n1. 上传需求文档\n2. 模型抽取需求\n3. 生成测试用例\n4. 导出测试用例`,
***REMOVED***
const mm = ref(***REMOVED***
const svgRef = ref(***REMOVED***

const update = (***REMOVED*** => {
  const { root ***REMOVED*** = transformer.transform(initValue.value***REMOVED***
  mm.value.setData(root***REMOVED***
  mm.value.fit(***REMOVED***
***REMOVED***
const container = ref(***REMOVED***
onMounted((***REMOVED*** => {
  query_test_assistant_records(***REMOVED***

  // 创建 Markmap 实例并传入 opts 参数
  mm.value = Markmap.create(svgRef.value, {
    autoFit: true, // 布尔值，如果为true，则自动调整视图以适应容器大小
    // color: (node***REMOVED*** => '#8276f2', // 函数，根据节点返回颜色字符串
    duration: 500, // 数字，动画持续时间，单位毫秒
    embedGlobalCSS: true, // 布尔值，是否嵌入全局CSS样式
    fitRatio: 1, // 数字，适配比例，用于调整自动缩放的程度
    // initialExpandLevel: 1, // 数字，初始展开层级，决定首次加载时展开的节点深度
    lineWidth: (node***REMOVED*** => 1, // 函数，根据节点返回线条宽度
    maxInitialScale: 2, // 数字，最大初始缩放比例
    maxWidth: 800, // 数字，思维导图的最大宽度
    nodeMinHeight: 20, // 数字，节点最小高度
    paddingX: 20, // 数字，水平内边距
    pan: true, // 布尔值，允许平移（拖拽）视图
    scrollForPan: true, // 布尔值，当视图到达边界时是否通过滚动来继续平移
    spacingHorizontal: 30, // 数字，水平间距
    spacingVertical: 20, // 数字，垂直间距
    // style: (id***REMOVED*** => `#custom-style`, // 函数，基于ID返回自定义样式
    toggleRecursively: true, // 布尔值，是否递归地切换子节点的可见性
    zoom: true, // 布尔值，允许缩放视图
  ***REMOVED******REMOVED***

  const { el ***REMOVED*** = Toolbar.create(mm.value***REMOVED***
  el.style.position = 'absolute'
  el.style.bottom = '1.5rem'
  el.style.right = '1rem'
  el.style.alignItems = 'center' // 垂直居中对齐子元素
  // el.style.border = '1px solid #ccc'
  el.style.display = 'flex' // 使用 flexbox 布局
  el.style.flexDirection = 'row' // 水平排列子元素
  el.style.alignItems = 'center' // 垂直居中对齐子元素
  el.style.width = '120px' // 确保容器宽度为100%
  el.style.justifyContent = 'space-between' // 子元素之间留有空间

  container.value.append(el***REMOVED***

  update(***REMOVED***
  // mm.value.handleClick = (e, d***REMOVED*** => {
  //     console.log(e, d***REMOVED***
  // ***REMOVED***
***REMOVED******REMOVED***

const query_test_assistant_records = async (***REMOVED*** => {
  const res = await GlobalAPI.query_test_assistant_records(1, 999999***REMOVED***
  const json = await res.json(***REMOVED***
  if (json?.data !== undefined***REMOVED*** {
    tableData.value = json.data.records
  ***REMOVED***
***REMOVED***

onBeforeUnmount((***REMOVED*** => {
  if (mm.value && typeof mm.value.destroy === 'function'***REMOVED*** {
    mm.value.destroy(***REMOVED*** // 确保Markmap实例被正确销毁
  ***REMOVED***
***REMOVED******REMOVED***

const collapsed = ref(false***REMOVED***
const toggleCollapsed = (***REMOVED*** => {
  collapsed.value = !collapsed.value
  query_test_assistant_records(***REMOVED***
***REMOVED***

const loading = ref(false***REMOVED***
const finish_upload = (res***REMOVED*** => {
  if (res.event.target.responseText***REMOVED*** {
    const json_data = JSON.parse(res.event.target.responseText***REMOVED***
    const kile_key = json_data.data.object_key
    if (json_data.code === 200***REMOVED*** {
      window.$ModalMessage.success(`文件上传成功`***REMOVED***
      collapsed.value = true
    ***REMOVED***
      word_to_md(kile_key***REMOVED***
    ***REMOVED*** else {
      window.$ModalMessage.error(`文件上传失败`***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

const word_to_md = async (file_key***REMOVED*** => {
  const res = await GlobalAPI.word_to_md(file_key***REMOVED***
  const json = await res.json(***REMOVED***
  if (json?.data !== undefined***REMOVED*** {
***REMOVED***
    initValue.value = json.data
    update(***REMOVED***
  ***REMOVED***
***REMOVED***

// 下拉菜单选项选择事件处理程序
const uploadDocRef = ref(null***REMOVED***
function handleDocClick(***REMOVED*** {
  // 使用 nextTick 确保 DOM 更新完成后执行
  nextTick((***REMOVED*** => {
    if (uploadDocRef.value***REMOVED*** {
      // 尝试直接调用 n-upload 的点击方法
      // 如果 n-upload 没有提供这样的方法，可以查找内部的 input 并调用 click 方法
      const fileInput
                = uploadDocRef.value.$el.querySelector('input[type="file"]'***REMOVED***
      if (fileInput***REMOVED*** {
        fileInput.click(***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***

const pdfUrl = ref(***REMOVED***
// 侧边栏对话历史
interface TableItem {
  id: number
  file_key: string
***REMOVED***
const tableData = ref<TableItem[]>([]***REMOVED***
const tableRef = ref(null***REMOVED***
// 表格行点击事件
const rowProps = (row: any***REMOVED*** => {
  return {
    onClick: (***REMOVED*** => {
      initValue.value = row.markdown
      pdfUrl.value = row.file_url
      update(***REMOVED***
    ***REMOVED***,
  ***REMOVED***
***REMOVED***

interface RefDocsItem {
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
// 准备好要传递给子组件的数据
const pdfDocument = ref<RefDocsItem>({
  filename: 'example.pdf',
  url: 'http://localhost:19000/filedata/%E6%B2%B3%E5%8D%97%E9%9C%80%E6%B1%82.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=sIR5eeDkiwoo779yNJbw%2F20250120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250120T071545Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=9e960555d54e0d35750297fc83b328b5c15ec81dcf8d8a45f987cbf47cd05dbe', // 替换为实际的PDF文件URL
  page_no: 1, // 指定要打开的页码
  content_pos: [
  ***REMOVED***
      page_no: 1,
      left_top: { x: 0, y: 0 ***REMOVED***,
      right_bottom: { x: 612, y: 792 ***REMOVED***, // A4纸大小的默认尺寸
    ***REMOVED***,
  ],
***REMOVED******REMOVED***
***REMOVED***

<script lang="ts">***REMOVED***

***REMOVED***
  <div size-full>
    <n-space vertical size="large">
      <n-layout
        has-sider
        style="margin-top: 10px; margin-right: 5px; border-radius: 10px"
      >
        <n-layout-sider
          collapse-mode="width"
          :collapsed-width="0"
          :width="260"
          :collapsed="collapsed"
          show-trigger="arrow-circle"
          content-style="padding: 24px;"
          bordered
          style="height: 98vh"
          @update:collapsed="toggleCollapsed"
        >
          <n-layout-header
            class="header flex items-center justify-start shrink-0 sticky top-0 z-1"
***REMOVED***
            <n-button
              type="primary"
              icon-placement="left"
              color="#5e58e7"
              strong
              class="w-140 h-36 mr-10 mb-10 text-center font-[Arial] font-600 text-14 rounded-20"
              @click="handleDocClick"
  ***REMOVED***
              <template #icon>
                <n-icon style="margin-right: 5px">
                  <svg
                    t="1737097386092"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="12487"
                    width="200"
                    height="200"
        ***REMOVED***
                    <path
                      d="M906.672 128H309.328A37.328 37.328 0 0 0 272 165.328V320l352 80 320-80v-154.672A37.328 37.328 0 0 0 906.672 128z"
                      fill="#41A5EE"
                      p-id="12488"
          ***REMOVED***
                    <path
                      d="M944 320H272v192l352 96 320-96V320z"
                      fill="#2B7CD3"
                      p-id="12489"
          ***REMOVED***
                    <path
                      d="M272 512v192l352 112 320-112V512H272z"
                      fill="#185ABD"
                      p-id="12490"
          ***REMOVED***
                    <path
                      d="M309.328 896h597.344A37.328 37.328 0 0 0 944 858.672V704H272v154.672A37.328 37.328 0 0 0 309.328 896z"
                      fill="#103F91"
                      p-id="12491"
          ***REMOVED***
                    <path
                      d="M528 325.28v421.44a27.744 27.744 0 0 1-0.64 6.4A37.024 37.024 0 0 1 490.72 784H272V288h218.72A37.216 37.216 0 0 1 528 325.28z"
                      p-id="12492"
          ***REMOVED***
                    <path
                      d="M544 325.28v389.44A53.792 53.792 0 0 1 490.72 768H272V272h218.72A53.472 53.472 0 0 1 544 325.28z"
                      p-id="12493"
          ***REMOVED***
                    <path
                      d="M528 325.28v389.44A37.216 37.216 0 0 1 490.72 752H272V288h218.72A37.216 37.216 0 0 1 528 325.28z"
                      p-id="12494"
          ***REMOVED***
                    <path
                      d="M512 325.28v389.44A37.216 37.216 0 0 1 474.72 752H272V288h202.72A37.216 37.216 0 0 1 512 325.28z"
                      p-id="12495"
          ***REMOVED***
                    <path
                      d="M64 288m37.328 0l373.344 0q37.328 0 37.328 37.328l0 373.344q0 37.328-37.328 37.328l-373.344 0q-37.328 0-37.328-37.328l0-373.344q0-37.328 37.328-37.328Z"
                      fill="#185ABD"
                      p-id="12496"
          ***REMOVED***
                    <path
                      d="M217.184 574.272q1.104 8.64 1.44 15.056h0.848q0.496-6.08 1.936-14.72t2.8-14.56l39.264-169.376h50.768l40.608 166.848a242.08 242.08 0 0 1 5.072 31.472h0.688a240.288 240.288 0 0 1 4.224-30.448l32.48-167.872h46.208l-56.864 242.656h-53.984L293.92 472.576q-1.68-6.944-3.808-18.112-2.112-11.168-2.624-16.24h-0.672q-0.672 5.92-2.624 17.6t-3.12 17.248l-36.384 160.256h-54.832L132.48 390.672h47.04l35.376 169.728q1.184 5.248 2.288 13.872z"
                      fill="#FFFFFF"
                      p-id="12497"
          ***REMOVED***
                  </svg>
                </n-icon>
              ***REMOVED***
              上传需求文档
            </n-button>
  ***REMOVED***class="icon-button">
              <n-icon size="17" class="icon">
      ***REMOVED***class="i-hugeicons:search-01"></div>
              </n-icon>
***REMOVED***
          </n-layout-header>
          <n-layout-content class="content">
            <n-data-table
              ref="tableRef"
              class="custom-table"
              :style="{
                'font-size': `14px`,
                '--n-td-color-hover': `#d5dcff`,
                'font-family': `-apple-system, BlinkMacSystemFont,
                  'Segoe UI', Roboto, 'Helvetica Neue', Arial,
                  sans-serif`,
              ***REMOVED***"
              size="small"
              :bordered="false"
              :bottom-bordered="false"
              :single-line="false"
              :columns="[
              ***REMOVED***
                  key: 'file_key',
                  align: 'left',
                  ellipsis: { tooltip: false ***REMOVED***,
                ***REMOVED***,
          ***REMOVED***"
              :data="tableData"
              :row-props="rowProps"
  ***REMOVED***
          </n-layout-content>
        </n-layout-sider>
        <n-layout-content>
          <n-spin
            w-full
            h-full
            content-class="w-full h-full flex"
            :show="loading"
            :rotate="false"
            class="bg-#ffffff"
            :style="{ '--n-opacity-spinning': '0' ***REMOVED***"
***REMOVED***
            <div
              ref="container"
              size-full
              flex="~ justify-center items-center"
              class="bg-#f6f7fb"
  ***REMOVED***
              <!-- 左边面板：显示 PDF -->
              <div
                clsas="w-50% h-full bg-#f6f7fb"
    ***REMOVED***
                <!-- 使用子组件并传递 dcsInfo 数据 -->
                <PdfViewer :dcsInfo="pdfDocument" />
  ***REMOVED***

              <!-- 右边面板：保持不变 -->
              <div
                flex="~ justify-center items-center"
                class="w-50% h-full bg-#f6f7fb"
    ***REMOVED***
                <svg
                  ref="svgRef"
                  style="height: 100%; width: 100%"
      ***REMOVED***
  ***REMOVED***
***REMOVED***
          </n-spin>
        </n-layout-content>
    ***REMOVED***
    </n-space>
    <n-upload
      ref="uploadDocRef"
      type="button"
      :show-file-list="false"
      action="sanic/file/upload_file"
      accept=".doc, .docx"
      style="display: none"
      @finish="finish_upload"
    >
      选择文件
    </n-upload>
  </div>
***REMOVED***

<style lang="scss" scoped>
.icon-button {
***REMOVED***
  align-items: center;
  justify-content: center;
***REMOVED***
  width: 38px; /* 可根据需要调整 */
  height: 38px; /* 与宽度相同，形成圆形 */
  border-radius: 100%; /* 圆形 */
  border: 1px solid #e8eaf3;
***REMOVED*** /* 按钮背景颜色 */
***REMOVED***
  transition: background-color 0.3s; /* 平滑过渡效果 */
  position: relative; /* 相对定位 */
***REMOVED***

.icon-button.selected {
  border: 1px solid #a48ef4;
***REMOVED***

.icon-button:hover {
  border: 1px solid #a48ef4; /* 鼠标悬停时的颜色 */
***REMOVED***

:deep(.mm-toolbar-brand***REMOVED*** {
  display: none !important;
***REMOVED***

:deep(.mm-toolbar-item:hover***REMOVED*** {
***REMOVED***
***REMOVED***

:deep(.mm-toolbar-item:active***REMOVED*** {
  background-color: #e0e0e0;
***REMOVED***

:deep(.custom-table .n-data-table-thead***REMOVED*** {
  display: none;
***REMOVED***

:deep(.custom-table td***REMOVED*** {
  color: #26244c;
  font-size: 14px;
  padding: 10px 6px;
  margin: 0 0 12px;
***REMOVED***
***REMOVED***
<!--
***REMOVED***
    <div class="docWrap">
        <div ref="wordFile"></div>
***REMOVED***
***REMOVED***

<script setup>
import { renderAsync ***REMOVED*** from 'docx-preview'

const wordFile = ref(null***REMOVED***
const docUrl = ref(
    'http://localhost:19000/filedata/input.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=sIR5eeDkiwoo779yNJbw%2F20250119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250119T121316Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d5c58187581cf74e7a628c54c8c8b12071eb49f689bd3b74933f0d6883102843'
***REMOVED*** // 替换为你的Word文档URL

onMounted((***REMOVED*** => {
    const xhr = new XMLHttpRequest(***REMOVED***
    xhr.open('get', docUrl.value***REMOVED***
    xhr.responseType = 'blob'
    xhr.onload = function (***REMOVED*** {
        const blob = new window.Blob([xhr.response], {
            type: 'application/docx'
        ***REMOVED******REMOVED***
        renderAsync(blob, wordFile.value***REMOVED***.then((***REMOVED*** => {
            // 添加事件监听
            wordFile.value.addEventListener('mouseup', handleSelection***REMOVED***
            wordFile.value.addEventListener('keyup', handleSelection***REMOVED***
        ***REMOVED******REMOVED***
    ***REMOVED***
    xhr.send(***REMOVED***
***REMOVED******REMOVED***

const handleSelection = (***REMOVED*** => {
    const selection = window.getSelection(***REMOVED***
    const selectedText = selection.toString(***REMOVED***.trim(***REMOVED***
    if (selectedText***REMOVED*** {
        console.log('选中的内容:', selectedText***REMOVED***
        // 可以在这里触发其他事件或进行其他操作
    ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
.docWrap {
  ***REMOVED***
  ***REMOVED***
    overflow: auto;
***REMOVED***
***REMOVED*** -->
