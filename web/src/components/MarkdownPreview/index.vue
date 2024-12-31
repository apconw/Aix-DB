<script lang="ts" setup>
import MarkdownInstance from './plugins/markdown'
import MarkdownEcharts from './MarkdownEcharts.vue'
import QatypeIcon from '../IconFont/QatypeIcon.vue'

const { copy, copyDuration ***REMOVED*** = useClipText(***REMOVED***
import {
    type TransformStreamModelTypes,
    transformStreamValue
***REMOVED*** from './transform'
import MarkdownTable from './MarkdownTable.vue'
import { watch ***REMOVED*** from 'vue'
interface Props {
    isInit: boolean
    chartId: string
    qaType: string
    reader: ReadableStreamDefaultReader<Uint8Array> | null
    model?: TransformStreamModelTypes
    parentScollBottomMethod: (***REMOVED*** => void //父组件滚动方法
***REMOVED***

const props = withDefaults(defineProps<Props>(***REMOVED***, {
    isInit: false, //用于控制 页面渲染速度 初始化时快一点 问答时慢一点
    chartId: '', //用于区分多个图表实例
    reader: null,
    qaType: '', //问答类型
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
const emit = defineEmits([
    'failed',
    'completed',
    'update:reader',
    'chartready',
    'recycleQa',
    'praiseFeadBack',
    'belittleFeedback'
]***REMOVED***

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

//读取数据流
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

// 滚动到底部
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
                //这里只有需要显示图表数据时才显示图表
                let dataType = businessStore.writerList.dataType
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

// 复制文本
const handlePassClip = async (***REMOVED*** => {
    await copy(displayText.value***REMOVED***
    window.$ModalMessage.destroyAll(***REMOVED***
    window.$ModalMessage.success('已复制', {
        duration: copyDuration
    ***REMOVED******REMOVED***
***REMOVED***
//点赞反馈
const praiseFeedback = (***REMOVED*** => {
    emit('praiseFeadBack'***REMOVED***
***REMOVED***

// 踩 反馈
const belittleFeedback = (***REMOVED*** => {
    emit('belittleFeedback'***REMOVED***
***REMOVED***

// 重新提问
const handleRecycleAquestion = function (***REMOVED*** {
    emit('recycleQa'***REMOVED***
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
                    <div
                        v-if="isCompleted"
                        style="
                            background-color: #ffffff;
                            width: 80%;
                            margin-left: 10%;
                            margin-right: 10%;
                          ***REMOVED***
                          ***REMOVED***
                            justify-content: space-between;
                        "
          ***REMOVED***
              ***REMOVED***style="display: flex">
                            <QatypeIcon :qa_type="qaType" />
            ***REMOVED***

              ***REMOVED***style="display: flex">
                            <n-button
                                icon-placement="left"
                                type="default"
                                ghost
                                size="tiny"
                                :bordered="false"
                                style="margin-right: 15px"
                                @click="praiseFeedback"
                  ***REMOVED***
                                <template #icon>
                                    <n-icon size="20"
                              ***REMOVED***<svg
                                            t="1734514601988"
                                            class="icon"
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            p-id="13495"
                                            width="200"
                                            height="200"
                              ***REMOVED***
                                            <path
                                                d="M757.76 852.906667c36.906667-0.021333 72.832-30.208 79.296-66.56l51.093333-287.04c10.069333-56.469333-27.093333-100.522667-84.373333-100.096l-10.261333 0.085333a19972.266667 19972.266667 0 0 1-52.842667 0.362667 3552.853333 3552.853333 0 0 1-56.746667 0l-30.997333-0.426667 11.498667-28.8c10.24-25.642667 21.76-95.744 21.504-128.021333-0.618667-73.045333-31.36-114.858667-69.290667-114.410667-46.613333 0.554667-69.461333 23.466667-69.333333 91.136 0.213333 112.661333-102.144 226.112-225.130667 225.109333a1214.08 1214.08 0 0 0-20.629333 0l-3.52 0.042667c-0.192 0 0.64 409.109333 0.64 409.109333 0-0.085333 459.093333-0.490667 459.093333-0.490666z m-17.301333-495.914667a15332.288 15332.288 0 0 0 52.693333-0.362667l10.282667-0.085333c84.010667-0.618667 141.44 67.52 126.72 150.250667L879.061333 793.813333c-10.090667 56.661333-63.68 101.696-121.258666 101.76l-458.922667 0.384A42.666667 42.666667 0 0 1 256 853.546667l-0.853333-409.173334a42.624 42.624 0 0 1 42.346666-42.730666l3.669334-0.042667c5.909333-0.064 13.12-0.064 21.333333 0 98.176 0.789333 182.293333-92.437333 182.144-182.378667C504.469333 128.021333 546.24 86.186667 616.106667 85.333333c65.173333-0.768 111.68 62.506667 112.448 156.714667 0.256 28.48-6.848 78.826667-15.701334 115.050667 8.021333 0 17.28-0.042667 27.584-0.106667zM170.666667 448v405.333333h23.466666a21.333333 21.333333 0 0 1 0 42.666667H154.837333A26.709333 26.709333 0 0 1 128 869.333333v-437.333333c0-14.784 12.074667-26.666667 26.773333-26.666667h38.912a21.333333 21.333333 0 0 1 0 42.666667H170.666667z"
                                                fill="#3f3f3f"
                                                p-id="13496"
                                  ***REMOVED***</path>
                                        </svg>
                                    </n-icon>
                                ***REMOVED***
                            </n-button>
                            <n-button
                                icon-placement="left"
                                type="default"
                                ghost
                                size="tiny"
                                :bordered="false"
                                style="margin-right: 15px"
                                @click="belittleFeedback"
                  ***REMOVED***
                                <template #icon>
                                    <n-icon size="20"
                              ***REMOVED***<svg
                                            t="1734514913827"
                                            class="icon"
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            p-id="22122"
                                            width="200"
                                            height="200"
                              ***REMOVED***
                                            <path
                                                d="M936.6784 451.56352c21.48352 80.11776-26.24 162.75456-106.40896 184.23808-11.78624 3.1488-24.13056 4.62336-38.81984 4.62336l-100.63872 0.41472c12.50304 56.94976 14.55104 142.49472 14.55104 193.44896 0 59.30496-48.16896 107.4944-107.40224 107.4944-59.21792 0-107.4944-48.18944-107.4944-107.4944v-21.44256c0-118.49728-96.34816-214.89664-214.89664-214.89664a21.46816 21.46816 0 0 1-21.44256-21.4528 21.41696 21.41696 0 0 1 21.44256-21.51936c142.2592 0 257.87392 115.61472 257.87392 257.8688v21.44256c0 35.59424 28.92288 64.52224 64.51712 64.52224 35.54304 0 64.41984-28.92288 64.41984-64.52224 0-96.77824-7.46496-174.21312-20.0192-207.17056a21.44256 21.44256 0 0 1 2.31936-19.86048 21.51936 21.51936 0 0 1 17.66912-9.30304l128.96768-0.512c10.97216 0 19.82464-1.00352 27.83744-3.1488 57.24672-15.36512 91.33056-74.36288 76.01664-131.56864-17.1264-63.9744-104.93952-285.7472-113.2032-306.56-11.62752-19.13856-32.1536-30.56128-55.1168-30.61248-1.29536 0-2.59072-0.1536-3.80416-0.36352H404.51072c-11.86304 0-21.44256-9.65632-21.44256-21.53472a21.4528 21.4528 0 0 1 21.44256-21.44256h322.39104c1.46944 0 2.88768 0.15872 4.28032 0.4096 36.7616 1.50528 70.47168 21.65248 88.77568 53.30944 0.49664 0.91136 0.91648 1.83808 1.34656 2.80064 3.94752 9.91744 96.77824 243.67104 115.37408 312.832zM275.56864 82.21696c11.8784 0 21.53984 9.64608 21.53984 21.44256v472.84736c0 11.8016-9.66144 21.4528-21.53984 21.4528H168.17152c-47.42144 0-85.95456-38.5792-85.95456-85.95456V168.17664c0-47.44192 38.53312-85.95968 85.95456-85.95968h107.39712z m-21.43744 472.77056V125.19424H168.17152c-23.71072 0-42.97728 19.2512-42.97728 42.9824v343.82848c0 23.71072 19.26656 42.9824 42.97728 42.9824h85.95968z"
                                                fill="#3f3f3f"
                                                p-id="22123"
                                  ***REMOVED***</path>
                                        </svg>
                                    </n-icon>
                                ***REMOVED***
                            </n-button>

                            <n-button
                                ghost
                                size="tiny"
                                icon-placement="left"
                                type="default"
                                :bordered="false"
                                style="margin-right: 15px"
                                @click="handlePassClip(***REMOVED***"
                  ***REMOVED***
                                <template #icon>
                                    <n-icon size="20"
                              ***REMOVED***<svg
                                            t="1734515176870"
                                            class="icon"
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            p-id="26346"
                                            width="200"
                                            height="200"
                              ***REMOVED***
                                            <path
                                                d="M955.85804 265.068028l0 595.439364L195.018625 860.507392 195.018625 728.187761 62.698994 728.187761 62.698994 132.748397l760.839415 0 0 132.319631L955.85804 265.068028zM195.018625 695.108365 195.018625 265.068028l595.439364 0 0-99.240235L95.779414 165.827793l0 529.279548L195.018625 695.107341zM922.778644 298.148447 228.099045 298.148447 228.099045 827.427996l694.679599 0L922.778644 298.148447z"
                                                fill="#3f3f3f"
                                                p-id="26347"
                                  ***REMOVED***</path>
                                        </svg>
                                    </n-icon>
                                ***REMOVED***
                            </n-button>

                            <n-button
                                ghost
                                :bordered="false"
                                icon-placement="left"
                                type="default"
                                size="tiny"
                                @click="handleRecycleAquestion(***REMOVED***"
                  ***REMOVED***
                                <template #icon>
                                    <n-icon size="22">
                                        <svg
                                            t="1734598608672"
                                            class="icon"
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            p-id="60134"
                                            width="256"
                                            height="256"
                              ***REMOVED***
                                            <path
                                                d="M934.625972 772.390495l-66.949808-130.025379C814.153156 797.841144 670.155555 903.623375 505.826905 903.623375c-174.766372 0-327.506079-120.400161-371.418194-292.809859l27.833929-7.085372c40.686654 159.656233 181.963285 271.148513 343.584266 271.148513 153.86125 0 288.48946-100.409874 336.555176-247.354598l-137.110751 51.179636-10.044774-26.907836 175.818331-65.659419 89.115644 173.096337L934.625972 772.390495zM89.766978 234.477312l-25.927509 12.339026 81.259722 170.634262 176.954201-48.850591-7.631818-27.694759-139.03252 38.356586c53.03182-138.688689 182.650947-230.154867 330.437851-230.154867 156.344814 0 292.572452 102.429881 339.010087 254.889201l27.497261-8.361435c-50.155307-164.636664-197.436698-275.259134-366.507348-275.259134-157.678182 0-296.178583 96.150874-354.877473 242.543012L89.766978 234.477312z"
                                                p-id="60135"
                                                fill="#3f3f3f"
                                  ***REMOVED***</path>
                                        </svg>
                                    </n-icon>
                                ***REMOVED***
                            </n-button>
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
    background-color: #ffffff;
    // background: linear-gradient(to right, #f0effe, #d4eefc***REMOVED***;
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
    code {
      ***REMOVED***
        color: #333;
    ***REMOVED***

    .active-tab {
        // background: linear-gradient(to left, #f3f2ff, #e1e7fe***REMOVED***;
        background: linear-gradient(to left, #f0effe, #d4eefc***REMOVED***;
        border-color: #635eed;
        color: #635eed;
    ***REMOVED***
***REMOVED***
***REMOVED***
