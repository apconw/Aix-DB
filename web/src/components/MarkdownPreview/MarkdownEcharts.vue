***REMOVED***
    <div style="background-color: #fff">
        <n-card
            :title="currentChartTypeName"
            embedded
            bordered
            :content-style="{
                'background-color': '#ffffff'
            ***REMOVED***"
            :header-style="{
                color: '#666',
                height: '10px',
                'background-color': '#f0effe',
                'text-align': 'left',
                'font-size': '14px',
                'font-family': 'PMingLiU'
            ***REMOVED***"
            :footer-style="{
                color: '#666',
                'background-color': '#ffffff',
                'text-align': 'left',
                'font-size': '14px',
                'font-family': 'PMingLiU'
            ***REMOVED***"
        >
            <div
                style="
                  ***REMOVED***
                    height: 500px;
                    padding: 30px;
                    background-color: #ffffff;
                "
                :id="chartId"
  ***REMOVED***
            <template #footer>
                数据来源: 大模型生成的数据, 以上信息仅供参考
            ***REMOVED***
        </n-card>
***REMOVED***
***REMOVED***

<script lang="ts" setup>
import { onMounted, ref ***REMOVED*** from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
    chartId: {
        type: String,
        required: true
    ***REMOVED***
***REMOVED******REMOVED***

//全局存储
const businessStore = useBusinessStore(***REMOVED***

// 定义图表类型
const currentChartType = ref(''***REMOVED***
const currentChartTypeName = ref(''***REMOVED***

const tableHeaders = ref(***REMOVED***
const tableData = ref([]***REMOVED***
// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['chartRendered']***REMOVED***
// echart 示例不能使用vue3定义成响应式的,会影响tips显示
// 在组件挂载完成后初始化 ECharts
onMounted((***REMOVED*** => {
    let chartInstance = echarts.init(document.getElementById(props.chartId***REMOVED******REMOVED***

    currentChartType.value = businessStore.writerList.data.template_code

    // 初始化两个空数组
    let productArray: string[] = []
    let casesArray: number[] = []
    let currentChart = ''
    if (currentChartType.value === 'temp01'***REMOVED*** {
        //表格
        tableData.value = businessStore.writerList.data.data
        tableHeaders.value = Object.keys(tableData.value[0]***REMOVED***
        currentChartTypeName.value = '表格'
        return
    ***REMOVED*** else if (currentChartType.value === 'temp02'***REMOVED*** {
        // 饼图
        currentChart = 'pie'
        currentChartTypeName.value = '饼图'
    ***REMOVED*** else if (currentChartType.value === 'temp03'***REMOVED*** {
        //柱状图
        currentChart = 'bar'
        currentChartTypeName.value = '柱状图'
        // 移除第一行标题
        let data = businessStore.writerList.data.data
        data.shift(***REMOVED***

        // 遍历数据
        data.forEach((item***REMOVED*** => {
            const product = item[0]
            const cases = parseInt(item[1], 10***REMOVED***

            // 只当转换为数字成功时才添加到数组中
            if (!isNaN(cases***REMOVED******REMOVED*** {
                productArray.push(product***REMOVED***
                casesArray.push(cases***REMOVED***
            ***REMOVED***
        ***REMOVED******REMOVED***
    ***REMOVED*** else if (currentChartType.value === 'temp04'***REMOVED*** {
        //折线图
        currentChart = 'line'
        currentChartTypeName.value = '折线图'
    ***REMOVED***

    const options = reactive({
        line: {
            animation: 'auto',
            animationDuration: 1000,
            animationDurationUpdate: 500,
            animationEasing: 'cubicInOut',
            animationEasingUpdate: 'cubicInOut',
            animationThreshold: 2000,
            progressiveThreshold: 3000,
            progressive: 400,
            hoverLayerThreshold: 3000,
            useUTC: false,
            tateAnimation: {
                duration: 300,
                easing: 'cubicOut'
            ***REMOVED***,
            tooltip: {
                axisPointer: {
                    type: 'shadow'
                ***REMOVED***
            ***REMOVED***,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                height: 400,
                containLabel: true
            ***REMOVED***,
            xAxis: {
                type: 'category',
                data: businessStore.writerList.data.data[0],
                nameTextStyle: {
                    fontSize: 14,
                    fontFamily: 'PMingLiU',
                    fontWeight: 400
                ***REMOVED***
            ***REMOVED***,

            yAxis: {
                type: 'value'
            ***REMOVED***,
            series: [
              ***REMOVED***
                    data: businessStore.writerList.data.data[1],
                    type: 'line'
                ***REMOVED***
        ***REMOVED***
        ***REMOVED***,
        bar: {
            animation: 'auto',
            animationDuration: 1000,
            animationDurationUpdate: 500,
            animationEasing: 'cubicInOut',
            animationEasingUpdate: 'cubicInOut',
            animationThreshold: 2000,
            progressiveThreshold: 3000,
            progressive: 400,
            hoverLayerThreshold: 3000,
            useUTC: false,
            // legend: {
            //     data: ['案件数量'],
            //     left: 'left',
            //     padding: [0, 20, 10, 0] //设置图例的内边距，顺序是 [上, 右, 下, 左]
            // ***REMOVED***,
            tateAnimation: {
                duration: 300,
                easing: 'cubicOut'
            ***REMOVED***,
            tooltip: {
                axisPointer: {
                    type: 'shadow'
                ***REMOVED***
            ***REMOVED***,
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                height: 540,
                containLabel: true
            ***REMOVED***,
            xAxis: {
                type: 'category',
                data: productArray,
                axisLabel: {
                    //展示角度
                    rotate: 60
                ***REMOVED***,
                nameTextStyle: {
                    fontSize: 20,
                    fontFamily: 'PMingLiU',
                    fontWeight: 400
                ***REMOVED***,
                axisTick: {
                    alignWithLabel: true
                ***REMOVED***
            ***REMOVED***,
            yAxis: {
                type: 'value'
            ***REMOVED***,
            series: [
              ***REMOVED***
                    name: '案件数量',
                    type: 'bar',
                    barWidth: '60%',
                    data: casesArray
                ***REMOVED***
        ***REMOVED***
        ***REMOVED***,
        pie: {
            legend: {
                top: '1',
                left: 'center',
                bottom: 10,
                itemGap: 12, //图例的上下间距
                itemWidth: 10, //图例左侧图块的长度
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'PMingLiU',
                    fontWeight: 400
                ***REMOVED***
            ***REMOVED***,
            series: [
              ***REMOVED***
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        show: true,
                        position: 'center'
                    ***REMOVED***,
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        ***REMOVED***
                    ***REMOVED***,
                    labelLine: {
                        show: true
                    ***REMOVED***,
                    data: businessStore.writerList.data.data
                ***REMOVED***
        ***REMOVED***
        ***REMOVED***
    ***REMOVED******REMOVED***

    chartInstance.setOption(options[currentChart]***REMOVED***

    businessStore.clearWriterList(***REMOVED***
    emit('chartRendered'***REMOVED***
***REMOVED******REMOVED***
***REMOVED***
