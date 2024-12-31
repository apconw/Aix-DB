***REMOVED***
    <div class="button-container">
        <!-- 使用 v-for 指令循环渲染 n-button -->
        <n-button
            v-for="(text, index***REMOVED*** in buttonLabels"
            :key="index"
            @click="handleClick(index***REMOVED***"
            class="block-button"
        >
          ***REMOVED***{ text ***REMOVED******REMOVED***
        </n-button>
***REMOVED***
***REMOVED***

<script lang="ts" setup>
import { computed, defineProps, withDefaults ***REMOVED*** from 'vue'
import { NButton ***REMOVED*** from 'naive-ui'

// 定义 props 接口以获取类型检查
interface Props {
    labels?: string[]
***REMOVED***

// 使用 withDefaults 提供默认值
const props = withDefaults(defineProps<Props>(***REMOVED***, {
    labels: (***REMOVED*** => []
***REMOVED******REMOVED***

// 自定义事件用于 子父组件传递事件信息
const emit = defineEmits(['suggested']***REMOVED***

// 定义默认按钮文案
const defaultLabels = []

// 计算属性用于决定实际使用的按钮文案
const buttonLabels = computed((***REMOVED*** =>
    props.labels.length > 0 ? props.labels : defaultLabels
***REMOVED***

// 点击事件处理函数
const handleClick = (index: number***REMOVED*** => {
    emit('suggested', index***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
/* 添加一些样式以区分按钮 */
.button-container {
    /* 如果需要更复杂的布局，可以在这里添加更多样式 */
***REMOVED***

.block-button {
***REMOVED*** /* 使每个按钮独占一行 */
    margin: 10px 4px; /* 调整上下间距 */
  ***REMOVED***
  ***REMOVED***
    height: 38px;
  ***REMOVED***
    font-size: 13px;
    font-family: 'PMingLiU';
***REMOVED***
***REMOVED***
