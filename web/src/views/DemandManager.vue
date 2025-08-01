<script setup>
import { marked ***REMOVED*** from 'marked' // 引入 marked 库
import { NLayout, NLayoutContent, NLayoutHeader ***REMOVED*** from 'naive-ui'
import * as GlobalAPI from '@/api'

const router = useRouter(***REMOVED***

// 文件上传
const uploadDocRef = ref(***REMOVED***
const finish_upload = (res***REMOVED*** => {
  if (res.event.target.responseText***REMOVED*** {
    const json_data = JSON.parse(res.event.target.responseText***REMOVED***
    const file_key = json_data.data.object_key
    if (json_data.code === 200***REMOVED*** {
      window.$ModalMessage.success(`文件上传成功`***REMOVED***
      projectForm.value.file_key = file_key
      projectForm.value.doc_name = file_key.split('.'***REMOVED***[0]
      projectForm.value.doc_desc = file_key.split('.'***REMOVED***[0]
    ***REMOVED*** else {
      window.$ModalMessage.error(`文件上传失败`***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

// 抽取信息
const showAbModal = ref(false***REMOVED***
const progress = ref(null***REMOVED***
const messages = ref([]***REMOVED***
const realTimeContent = ref(null***REMOVED*** // 引用容器元素

function startExtraction(itemId***REMOVED*** {
  showAbModal.value = true
  progress.value = 0 // 初始化进度为0
  const eventSource = new EventSource(
    `${location.origin***REMOVED***/sanic/ta/abstract_doc_func/${itemId***REMOVED***`,
  ***REMOVED***

  eventSource.onmessage = function (event***REMOVED*** {
    const data = JSON.parse(event.data***REMOVED***
    if (data.type === 'progress'***REMOVED*** {
      // 更新进度条
      progress.value = data.progress
      // messages.value.push(`进度: ${data.progress***REMOVED***%`***REMOVED***
    ***REMOVED*** else if (data.type === 'log'***REMOVED*** {
      // 显示日志信息
      messages.value.push(data.message***REMOVED***
    ***REMOVED*** else if (data.type === 'complete'***REMOVED*** {
      // 关闭模态框
      messages.value.push('任务完成'***REMOVED***
      eventSource.close(***REMOVED***
      setTimeout((***REMOVED*** => {
        showAbModal.value = false
        messages.value = []
        query_demand_records(***REMOVED***
      ***REMOVED***, 1000***REMOVED***
    ***REMOVED***
    scrollToBottom(***REMOVED*** // 每次收到消息后滚动到底部
  ***REMOVED***

  eventSource.onerror = function (error***REMOVED*** {
    console.error('EventSource failed:', error***REMOVED***
    messages.value = []
    // messages.value.push('发生错误，请稍后再试'***REMOVED***
    eventSource.close(***REMOVED***
    showAbModal.value = false
  ***REMOVED***
***REMOVED***

// 滚动到底部的函数
function scrollToBottom(***REMOVED*** {
  if (realTimeContent.value***REMOVED*** {
    realTimeContent.value.scrollTop
            = realTimeContent.value.scrollHeight + 20
  ***REMOVED***
***REMOVED***

onMounted((***REMOVED*** => {
  // 页面加载时也可以调用一次滚动到底部
  scrollToBottom(***REMOVED***
***REMOVED******REMOVED***

// Form表单
const showModal = ref(false***REMOVED***
const items = ref([]***REMOVED***

const projectForm = ref({
  doc_name: '',
  doc_desc: '',
  file_key: '',
***REMOVED******REMOVED***
const submitProject = async (***REMOVED*** => {
  const res = await GlobalAPI.insert_demand_manager(projectForm.value***REMOVED***
  const json = await res.json(***REMOVED***
  if (json?.data !== undefined && json?.data***REMOVED*** {
    window.$ModalMessage.success(`项目创建成功`***REMOVED***
    closeModal(***REMOVED***
  ***REMOVED***

  query_demand_records(***REMOVED***
***REMOVED***

const closeModal = (***REMOVED*** => {
  showModal.value = false
  // 清空表单
  projectForm.value = {
    doc_name: '',
    doc_desc: '',
    file_key: '',
  ***REMOVED***
***REMOVED***

const dropdownOptions = [
***REMOVED***
    label: '抽取',
    key: 'abstract',
  ***REMOVED***,
***REMOVED***
    label: '编辑',
    key: 'edit',
  ***REMOVED***,
***REMOVED***
    label: '删除',
    key: 'delete',
  ***REMOVED***,
]

const handleSelect = async (key, index***REMOVED*** => {
  switch (key***REMOVED*** {
    // 抽取功能
    case 'abstract':
      console.log(`Editing item at index ${index***REMOVED***`***REMOVED***
      startExtraction(index***REMOVED***
      break
    case 'edit':
      console.log(`Editing item at index ${index***REMOVED***`***REMOVED***
      // 编辑项目的逻辑
      break
    case 'delete':
      GlobalAPI.delete_demand_records(`${index***REMOVED***`***REMOVED***
      await query_demand_records(***REMOVED***
      break
    default:
      console.log(`Selected option not handled: ${key***REMOVED***`***REMOVED***
  ***REMOVED***
***REMOVED***

const query_demand_records = async (***REMOVED*** => {
  const res = await GlobalAPI.query_demand_records(1, 999999***REMOVED***
  const json = await res.json(***REMOVED***
  if (json?.data !== undefined***REMOVED*** {
    items.value = json.data.records
  ***REMOVED*** else {
    items.value = []
  ***REMOVED***
***REMOVED***

onMounted((***REMOVED*** => {
  query_demand_records(***REMOVED***
***REMOVED******REMOVED***

function navigateToDetail(id***REMOVED*** {
  router.push({ name: 'UaDetail', params: { id ***REMOVED*** ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
  <n-layout
    class="h-full"
  >
    <n-layout-header class="header">
      <div class="header-content">
        <!-- 这里可以放置一些顶部的内容或导航 -->
***REMOVED***
      <button class="create-project-btn" @click="showModal = true">
        + 创建项目
      </button>
    </n-layout-header>
    <n-layout-content>
      <div class="container">
        <div
          v-for="(item, index***REMOVED*** in items"
          :key="index"
          class="card"
          @click="navigateToDetail(item.id***REMOVED***"
        >
***REMOVED***class="card-header">
            <n-icon style="margin-right: 5px" size="18">
    ***REMOVED***class="i-formkit:filedoc"></div>
            </n-icon>
            <span class="card-title">需求</span>
***REMOVED***
***REMOVED***class="card-body">
            <p>{{ item.doc_desc ***REMOVED******REMOVED***</p>
***REMOVED***
***REMOVED***class="card-footer">
            <span class="card-info">功能点: {{ item.fun_num ***REMOVED******REMOVED***</span>
            <span class="card-date">{{
              item.update_time
            ***REMOVED******REMOVED***</span>
            <!-- 使用 n-dropdown 组件替换原有的按钮 -->
            <n-dropdown
              trigger="click"
              :options="dropdownOptions"
              @select="(key***REMOVED*** => handleSelect(key, item.id***REMOVED***"
  ***REMOVED***
              <button class="card-button" @click.stop>
                ...
    ***REMOVED***
            </n-dropdown>
***REMOVED***
***REMOVED***
***REMOVED***
    </n-layout-content>
***REMOVED***

  <!-- 模态框 -->
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="创建新项目"
    style="width: 600px"
    @close="closeModal"
  >
    <n-form :model="projectForm">
      <n-form-item label="项目名称" required>
        <n-input
          v-model:value="projectForm.doc_name"
          placeholder="请输入项目名称"
        />
      </n-form-item>
      <n-form-item label="项目描述" required>
        <n-input
          v-model:value="projectForm.doc_desc"
          type="textarea"
          placeholder="请输入项目描述"
        />
      </n-form-item>
      <n-form-item label="项目附件" hidden>
        <n-input v-model:value="projectForm.file_key" />
      </n-form-item>
      <n-upload
        ref="uploadDocRef"
        multiple
        :show-file-list="true"
        action="sanic/file/upload_file"
        accept=".doc, .docx"
        @finish="finish_upload"
      >
        <n-button>上传附件</n-button>
      </n-upload>
    </n-form>
    <template #action>
      <n-button @click="submitProject">提交</n-button>
      <n-button @click="closeModal">取消</n-button>
    ***REMOVED***
  </n-modal>

  <n-modal
    v-model:show="showAbModal"
    :closable="false"
    preset="dialog"
    title="抽取功能"
    :mask-closable="false"
    style="width: 800px"
  >
    <div v-if="progress !== null">
      <n-progress type="line" :percentage="progress" />
***REMOVED***
    <div v-else>正在准备...</div>

    <!-- 实时显示推送的内容 -->
    <div ref="realTimeContent" class="real-time-content">
      <p
        v-for="(message, index***REMOVED*** in messages"
        :key="index"
        v-html="marked(message***REMOVED***"
      ></p>
***REMOVED***
    <div
      class="i-svg-spinners:pulse-2 c-#26244c"
      style="width: 30px; height: 30px; margin-left: -8px"
    ></div>
  </n-modal>
***REMOVED***

***REMOVED***
.header {
***REMOVED***
  justify-content: space-between;
  align-items: center;
***REMOVED*** /* 调整padding以适应设计 */
  background-color: #f6f7fb; /* 根据需要调整背景颜色 */
***REMOVED***

.header-content {
  /* 这里可以添加任何必要的样式，比如logo或导航链接 */
***REMOVED***

.create-project-btn {
  background-color: #2c7be5;
  color: #fff;
***REMOVED***
***REMOVED***
  border-radius: 20px;
***REMOVED***
  font-size: 14px;
***REMOVED***

.container {
***REMOVED***
  flex-wrap: wrap;
  gap: 20px;
***REMOVED***
***REMOVED***

.card {
  width: 250px;
***REMOVED***
***REMOVED***
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%***REMOVED***;
***REMOVED***
  overflow: hidden;
***REMOVED***

.card-header {
***REMOVED***
  align-items: center;
***REMOVED***
  background-color: #f9f9f9;
***REMOVED***

.card-icon {
  width: 20px;
  height: 20px;
***REMOVED***
***REMOVED***

.card-title {
  font-weight: bold;
***REMOVED***

.card-body {
***REMOVED***
***REMOVED***

.card-footer {
***REMOVED***
  justify-content: space-between;
***REMOVED***
***REMOVED***
***REMOVED***

.card-info,
.card-date {
  font-size: 12px;
***REMOVED***
***REMOVED***

.card-button {
  background-color: #e0e0e0;
***REMOVED***
  padding: 5px 10px;
***REMOVED***
***REMOVED***
  font-size: 12px;
***REMOVED***

form-item-inline {
***REMOVED***
  align-items: center;
***REMOVED***

.form-item-inline .n-form-item__label {
  width: 120px; /* 设置标签宽度 */
  margin-right: 15px; /* 设置标签与输入框之间的间距 */
***REMOVED***

/* 滚动条整体部分 */

::-webkit-scrollbar {
  width: 8px; /* 竖向滚动条宽度 */
  height: 8px; /* 横向滚动条高度 */
***REMOVED***

/* 滚动条的轨道 */

::-webkit-scrollbar-track {
  background: #fff; /* 轨道背景色 */
***REMOVED***

/* 滚动条的滑块 */

::-webkit-scrollbar-thumb {
  background: #cac9f9; /* 滑块颜色 */
***REMOVED*** /* 滑块圆角 */
***REMOVED***

/* 滚动条的滑块在悬停状态下的样式 */

::-webkit-scrollbar-thumb:hover {
  background: #cac9f9; /* 悬停时滑块颜色 */
***REMOVED***

.real-time-content {
***REMOVED***
  max-height: 300px;
  overflow-y: hidden;
  border: 0 solid #ccc;
  padding-top: 10px;
***REMOVED*** /* 黑色背景 */
  color: #26244c;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
***REMOVED***

/* 当鼠标悬停时改变overflow-y属性 */

.real-time-content:hover {
***REMOVED***
***REMOVED***
***REMOVED***
