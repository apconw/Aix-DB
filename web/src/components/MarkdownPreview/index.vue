<script lang="ts" setup>
import { isMockDevelopment ***REMOVED*** from '@/config'
import MarkdownInstance from './plugins/markdown'
import MarkdownEcharts from './MarkdownEcharts.vue'

import {
    type TransformStreamModelTypes,
    transformStreamValue
***REMOVED*** from './transform'
import MarkdownTable from './MarkdownTable.vue'
import { watch ***REMOVED*** from 'vue'

interface Props {
    isInit: boolean
    chartId: string
    reader: ReadableStreamDefaultReader<Uint8Array> | null
    model?: TransformStreamModelTypes
    parentScollBottomMethod: (***REMOVED*** => void //父组件滚动方法
***REMOVED***

const props = withDefaults(defineProps<Props>(***REMOVED***, {
    isInit: false, //用于控制 页面渲染速度 初始化时快一点 问答时慢一点
    chartId: '', //用于区分多个图表实例
    reader: null,
    model: 'standard',
    parentScollBottomMethod: (***REMOVED*** => {***REMOVED***
***REMOVED******REMOVED***

// 解构 props
const { parentScollBottomMethod ***REMOVED*** = toRefs(props***REMOVED***

// 定义响应式变量
const displayText = ref(''***REMOVED***
const textBuffer = ref(''***REMOVED***

const readerLoading = ref(false***REMOVED***

const isAbort = ref(false***REMOVED***

const isCompleted = ref(false***REMOVED***

// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['failed', 'completed', 'update:reader', 'chartready']***REMOVED***

const refWrapperContent = ref<HTMLElement>(***REMOVED***

let typingAnimationFrame: number | null = null

//全局存储
const businessStore = useBusinessStore(***REMOVED***

/**
 * reader 读取是否结束
 */
const readIsOver = ref(false***REMOVED***

const renderedMarkdown = computed((***REMOVED*** => {
    return MarkdownInstance.render(displayText.value***REMOVED***
***REMOVED******REMOVED***

const renderedContent = computed((***REMOVED*** => {
    // 在 renderedMarkdown 末尾插入光标标记
    return `${renderedMarkdown.value***REMOVED***`
***REMOVED******REMOVED***

const abortReader = (***REMOVED*** => {
    if (props.reader***REMOVED*** {
        props.reader.cancel(***REMOVED***
    ***REMOVED***

    isAbort.value = true
    readIsOver.value = false
    emit('update:reader', null***REMOVED***
    initializeEnd(***REMOVED***
    isCompleted.value = true
***REMOVED***

const resetStatus = (***REMOVED*** => {
    isAbort.value = false
    isCompleted.value = false
    readIsOver.value = false

    emit('update:reader', null***REMOVED***

    initializeEnd(***REMOVED***
    displayText.value = ''
    textBuffer.value = ''
    readerLoading.value = false
    if (typingAnimationFrame***REMOVED*** {
        cancelAnimationFrame(typingAnimationFrame***REMOVED***
        typingAnimationFrame = null
    ***REMOVED***
***REMOVED***

/**
 * 检查是否有实际内容
 */
function hasActualContent(html***REMOVED*** {
    const text = html.replace(/<[^>]*>/g, ''***REMOVED***
    return /\S/.test(text***REMOVED***
***REMOVED***

const showCopy = computed((***REMOVED*** => {
    if (!isCompleted.value***REMOVED*** return false

    if (hasActualContent(displayText.value***REMOVED******REMOVED*** {
        return true
    ***REMOVED***

    return false
***REMOVED******REMOVED***

const initialized = ref(false***REMOVED***

const initializeStart = (***REMOVED*** => {
    initialized.value = true
***REMOVED***

const initializeEnd = (***REMOVED*** => {
    initialized.value = false
***REMOVED***

// 定义图表类型
const currentChartType = ref(''***REMOVED***
const readTextStream = async (***REMOVED*** => {
    if (!props.reader***REMOVED*** return

    const textDecoder = new TextDecoder('utf-8'***REMOVED***
    readerLoading.value = true
    while (true***REMOVED*** {
        if (isAbort.value***REMOVED*** {
            break
        ***REMOVED***
      ***REMOVED***
            if (!props.reader***REMOVED*** {
                readIsOver.value = true
                break
            ***REMOVED***
            const { value, done ***REMOVED*** = await props.reader.read(***REMOVED***
            if (!props.reader***REMOVED*** {
                readIsOver.value = true
                break
            ***REMOVED***
            if (done***REMOVED*** {
                readIsOver.value = true
                break
            ***REMOVED***

            const transformer = transformStreamValue[props.model]
            if (!transformer***REMOVED*** {
                break
            ***REMOVED***

            const stream = transformer.call(
                transformStreamValue,
                value,
                textDecoder
            ***REMOVED***
            if (stream.done***REMOVED*** {
                readIsOver.value = true

                break
            ***REMOVED***
            //每条消息换行显示
            textBuffer.value += stream.content + '\n'

            if (typingAnimationFrame === null***REMOVED*** {
                showText(***REMOVED***
            ***REMOVED***
        ***REMOVED*** catch (error***REMOVED*** {
            console.log('渲染失败信息', error***REMOVED***
            readIsOver.value = true
            emit('failed', error***REMOVED***
            resetStatus(***REMOVED***
            break
        ***REMOVED*** finally {
            initializeEnd(***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***

const scrollToBottom = async (***REMOVED*** => {
    await nextTick(***REMOVED***
    if (!refWrapperContent.value***REMOVED*** return

    refWrapperContent.value.scrollTop = refWrapperContent.value.scrollHeight
***REMOVED***
const scrollToBottomByThreshold = async (***REMOVED*** => {
    if (!refWrapperContent.value***REMOVED*** return

    const threshold = 100
    const distanceToBottom =
        refWrapperContent.value.scrollHeight -
        refWrapperContent.value.scrollTop -
        refWrapperContent.value.clientHeight
    if (distanceToBottom <= threshold***REMOVED*** {
        scrollToBottom(***REMOVED***
    ***REMOVED***
***REMOVED***

const scrollToBottomIfAtBottom = async (***REMOVED*** => {
    scrollToBottomByThreshold(***REMOVED***
***REMOVED***

/**
 * 读取 buffer 内容，逐字追加到 displayText
 */
const runReadBuffer = (readCallback = (***REMOVED*** => {***REMOVED***, endCallback = (***REMOVED*** => {***REMOVED******REMOVED*** => {
    if (textBuffer.value.length > 0***REMOVED*** {
        const lengthToExtract = props.isInit ? 1000 : 1
        const nextChunk = textBuffer.value.substring(0, lengthToExtract***REMOVED***
        displayText.value += nextChunk
        textBuffer.value = textBuffer.value.substring(lengthToExtract***REMOVED***
        readCallback(***REMOVED***
    ***REMOVED*** else {
        endCallback(***REMOVED***
    ***REMOVED***

    //动态渲染时实时调用父组件滚动条至最底端
    parentScollBottomMethod.value(***REMOVED***
***REMOVED***

const showText = (***REMOVED*** => {
    if (isAbort.value && typingAnimationFrame***REMOVED*** {
        cancelAnimationFrame(typingAnimationFrame***REMOVED***
        typingAnimationFrame = null
        readerLoading.value = false
        return
    ***REMOVED***

    // 若 reader 还没结束，则保持打字行为
    if (!readIsOver.value***REMOVED*** {
        runReadBuffer(***REMOVED***
        typingAnimationFrame = requestAnimationFrame(showText***REMOVED***
    ***REMOVED*** else {
        // 读取剩余的 buffer
        runReadBuffer(
            (***REMOVED*** => {
                typingAnimationFrame = requestAnimationFrame(showText***REMOVED***
            ***REMOVED***,
            (***REMOVED*** => {
                let dataType = businessStore.writerList.dataType
                //这里只有需要显示图表数据时才显示图表
                if (dataType && dataType === 't04'***REMOVED*** {
                    currentChartType.value =
                        businessStore.writerList.data.template_code
                ***REMOVED***

                emit('update:reader', null***REMOVED***
                emit('completed'***REMOVED***
                emit('chartready'***REMOVED***
                readerLoading.value = false
                isCompleted.value = true
                nextTick((***REMOVED*** => {
                    readIsOver.value = false
                ***REMOVED******REMOVED***
                typingAnimationFrame = null
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    scrollToBottomIfAtBottom(***REMOVED***
***REMOVED***

watch(
    (***REMOVED*** => props.reader,
    (***REMOVED*** => {
        if (props.reader***REMOVED*** {
            readTextStream(***REMOVED***
        ***REMOVED***
    ***REMOVED***,
  ***REMOVED***
        immediate: true,
        deep: true
    ***REMOVED***
***REMOVED***

onUnmounted((***REMOVED*** => {
    resetStatus(***REMOVED***
***REMOVED******REMOVED***

defineExpose({
    abortReader,
    resetStatus,
    initializeStart,
    initializeEnd
***REMOVED******REMOVED***

const showLoading = computed((***REMOVED*** => {
    if (initialized.value***REMOVED*** {
        return true
    ***REMOVED***

    if (!props.reader***REMOVED*** {
        return false
    ***REMOVED***

    if (!readerLoading***REMOVED*** {
        return false
    ***REMOVED***
    if (displayText.value***REMOVED*** {
        return false
    ***REMOVED***

    return false
***REMOVED******REMOVED***

const refClipBoard = ref(***REMOVED***
const handlePassClip = (***REMOVED*** => {
    if (refClipBoard.value***REMOVED*** {
        refClipBoard.value.copyText(***REMOVED***
    ***REMOVED***
***REMOVED***

// 监控表格图表是否渲染完毕
const onTableCompletedReader = function (***REMOVED*** {
    emit('chartready'***REMOVED***
***REMOVED***
// 监控表格图表是否渲染完毕
const onChartCompletedReader = function (***REMOVED*** {
    emit('chartready'***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
    <n-spin
        relative
        flex="1 ~"
        min-h-0
        w-full
        h-full
        content-class="w-full h-full flex"
        :show="showLoading"
        :rotate="false"
        class="bg-#f6f7fb"
        :style="{
            '--n-opacity-spinning': '0.3'
        ***REMOVED***"
    >
        <transition name="fade">
            <n-float-button
                v-if="showCopy"
                position="absolute"
                :top="30"
                :right="30"
                color
                class="c-warning bg-#fff/80 hover:bg-#fff/90 transition-all-200 z-2"
                @click="handlePassClip(***REMOVED***"
  ***REMOVED***
                <clip-board
                    ref="refClipBoard"
                    :auto-color="false"
                    no-copy
                    :text="displayText"
      ***REMOVED***
            </n-float-button>
        </transition>
        <template #icon>
  ***REMOVED***class="i-svg-spinners:3-dots-rotate"></div>
        ***REMOVED***
        <!-- b="~ solid #ddd" -->
        <div
            flex="1 ~"
            min-w-0
            min-h-0
            :class="[reader ? '' : 'justify-center items-center']"
        >
            <div
                text-16
                class="w-full h-full overflow-hidden"
                :class="[!displayText && 'flex items-center justify-center']"
  ***REMOVED***
                <n-empty v-if="!displayText" size="large" class="font-bold">
                    <!-- 
                        显示默认文本
                    <div
                        whitespace-break-spaces
                        text-center
                        v-html="emptyPlaceholder"
          ***REMOVED***</div> -->
                    <template #icon>
                        <n-icon>
                  ***REMOVED***class="i-hugeicons:ai-chat-02"></div>
                        </n-icon>
                    ***REMOVED***
                </n-empty>
                <div
                    v-else
                    ref="refWrapperContent"
                    text-16
                    class="w-full h-full overflow-y-auto"
                    p-24px
      ***REMOVED***
                    <div
                        class="markdown-wrapper"
                        v-html="renderedContent"
          ***REMOVED***</div>

                    <div
                        v-if="readerLoading"
                        size-24
                        style="margin-left: 10%"
                        class="i-svg-spinners:pulse-3"
          ***REMOVED***</div>

                    <div
                        v-if="
                            currentChartType &&
                            currentChartType != 'temp01' &&
                            isCompleted
                        "
                        whitespace-break-spaces
                        text-center
                        style="
                            align-items: center;
                            width: 80%;
                            margin-left: 10%;
                            margin-right: 10%;
                        "
          ***REMOVED***
                        <MarkdownEcharts
                            :chart-id="props.chartId"
                            @chartRendered="(***REMOVED*** => onChartCompletedReader(***REMOVED***"
              ***REMOVED***
        ***REMOVED***

                    <div
                        v-if="
                            currentChartType &&
                            currentChartType == 'temp01' &&
                            isCompleted
                        "
                        whitespace-break-spaces
                        text-center
                        style="
                            align-items: center;
                            width: 80%;
                            margin-left: 10%;
                            margin-right: 10%;
                        "
          ***REMOVED***
                        <MarkdownTable
                            @tableRendered="(***REMOVED*** => onTableCompletedReader(***REMOVED***"
              ***REMOVED***
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
    </n-spin>
***REMOVED***

<style lang="scss">
***REMOVED***
    margin-left: 10%;
    margin-right: 10%;
    // background-color: #ffffff;
    background: linear-gradient(to right, #f0effe, #d4eefc***REMOVED***;
    padding: 30px;
    // font-family: 'PMingLiU';
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
    h1 {
      ***REMOVED***
    ***REMOVED***

    h2 {
      ***REMOVED***
        padding-bottom: 0.3em;
        border-bottom: 1px solid #f6f7fb;
    ***REMOVED***

    h3 {
        font-size: 1.25em;
    ***REMOVED***

    h4 {
        font-size: 1em;
    ***REMOVED***

    h5 {
        font-size: 0.875em;
    ***REMOVED***

    h6 {
        font-size: 0.85em;
    ***REMOVED***

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ***REMOVED***
        line-height: 1.25;
        margin-top: 20px; /* 添加顶部外边距，这里设置为20像素，你可以根据需要调整这个值 */
      ***REMOVED***
    ***REMOVED***

    & ul,
    ol {
        padding-left: 1.5em;
        line-height: 0.8;
    ***REMOVED***

    & ul,
    li,
    ol {
        list-style-position: outside;
        white-space: normal;
    ***REMOVED***

    li {
        line-height: 2;
    ***REMOVED***

    ol ol {
        padding-left: 20px;
    ***REMOVED***

    ul ul {
        padding-left: 20px;
    ***REMOVED***

    hr {
        margin: 16px 0;
    ***REMOVED***

    a {
        color: $color-default;
        font-weight: bolder;
        text-decoration: underline;
        padding: 0 3px;
    ***REMOVED***

    p {
        line-height: 2;
        & > code {
            --at-apply: 'bg-#e5e5e5';
            --at-apply: whitespace-pre mx-4px px-6px py-3px rounded-5px;
        ***REMOVED***

        img {
            display: inline-block;
        ***REMOVED***
    ***REMOVED***

    li > p {
        line-height: 2;
    ***REMOVED***

    blockquote {
      ***REMOVED***
        margin: 20px 0;
        border-left: 5px solid #ccc;
        background-color: #f9f9f9;
        color: #555;

        & > p {
            margin: 0;
        ***REMOVED***
    ***REMOVED***

    table {
      ***REMOVED*** /* 合并相邻单元格的边框 */
      ***REMOVED***
    ***REMOVED***
    th,
    td {
        border: 1px solid #f6f7fb; /* 将边框颜色设为红色 */
        padding: 8px;
      ***REMOVED***
    ***REMOVED***
    th {
        background-color: #f2f2f2; /* 可选：给表头设置背景色 */
    ***REMOVED***
***REMOVED***
***REMOVED***
