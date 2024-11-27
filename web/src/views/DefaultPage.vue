***REMOVED***
    <div class="container">
        <div class="header">
            <n-icon
                size="60"
                style="
                    margin-right: 15px;
                    background-color: #716bea;
                    border-radius: 100%;
                "
  ***REMOVED***
                <svg
                    t="1730167173147"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="29304"
      ***REMOVED***
                    <path
                        d="M964.266667 609.848889a48.298667 48.298667 0 0 0-2.844445-3.982222l-113.379555-198.656 50.915555-89.315556a26.510222 26.510222 0 0 0 5.347556-32.711111l-64.967111-112.469333a25.144889 25.144889 0 0 0-21.959111-12.8H588.8l-52.053333-90.225778A25.144889 25.144889 0 0 0 514.503111 56.888889H395.776a25.6 25.6 0 0 0-24.177778 17.351111L257.991111 272.839111H152.291556a20.821333 20.821333 0 0 0-5.859556-0.568889 25.144889 25.144889 0 0 0-22.186667 13.084445L60.245333 398.449778a26.510222 26.510222 0 0 0 0 25.884444l114.460445 200.362667-51.2 90.567111a26.510222 26.510222 0 0 0 0 25.884444l59.164444 104.163556a25.201778 25.201778 0 0 0 27.306667 12.231111h226.304l55.352889 96.768a25.6 25.6 0 0 0 20.821333 12.8h1.706667l129.137778-0.568889c9.045333 0 17.408-4.892444 21.902222-12.8l114.176-200.647111h103.082666a26.396444 26.396444 0 0 0 21.959112-13.368889l59.335111-104.220444a26.510222 26.510222 0 0 0 0-25.884445l0.455111 0.284445z m-143.758223 12.515555l-62.407111-109.226666-244.167111 428.657778-62.748444-109.624889H206.279111l60.359111-105.813334h124.359111l-244.053333-427.52h125.838222L395.548444 83.626667l60.416 105.870222-62.407111 109.340444h486.855111l-61.952 108.430223 122.652445 215.210666h-120.832l0.227555-0.056889z"
                        p-id="29305"
                        fill="#ffffff"
          ***REMOVED***</path>
                    <path
                        d="M512.170667 663.722667l151.552-246.556445H360.277333z"
                        p-id="29306"
                        fill="#ffffff"
          ***REMOVED***</path>
                </svg>
            </n-icon>
  ***REMOVED***class="header-text">
                <h1 class="header-title">你的全能AI数据助手</h1>
                <p class="header-subtitle">基于大模型的数据问答小助手</p>
***REMOVED***
***REMOVED***
        <div class="content">
  ***REMOVED***class="card-one">
                <h4 class="title">通用问答</h4>
                <p class="card-subtitle">基于RAG大模型的通用问答</p>
                <ul>
                    <li
                        v-for="(item, index***REMOVED*** in headerTwoItems"
                        :key="index"
                        class="list-item"
          ***REMOVED***
                      ***REMOVED***{ item ***REMOVED******REMOVED***
                    </li>
                </ul>
***REMOVED***
  ***REMOVED***class="card-two">
                <h4 class="title">数据问答</h4>
                <p class="card-subtitle">基于大模型的数据问答</p>
                <ul>
                    <li
                        v-for="(item, index***REMOVED*** in hotSearchItems"
                        :key="index"
                        class="list-item"
          ***REMOVED***
                      ***REMOVED***{ item ***REMOVED******REMOVED***
                    </li>
                </ul>
***REMOVED***
  ***REMOVED***class="card-three">
                <h4 class="title">表格问答</h4>
                <p class="card-subtitle">基于大模型的表格问答</p>
                <ul>
                    <li
                        v-for="(item, index***REMOVED*** in headerThreeItems"
                        :key="index"
                        class="list-item"
          ***REMOVED***
                      ***REMOVED***{ item ***REMOVED******REMOVED***
                    </li>
                </ul>
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

<script lang="tsx" setup>
const hotSearchItems = [
    '① Text2SQL 文本转SQL 数据库查询',
    '② Echart图表增强且数据问答可视化',
    '③ Text2SQL与Echarts提供数据分析',
    '④ 结合Echarts和Text2SQL提升解读',
    '⑤ 基于大数据底座提升数据问答速度'
]
const headerTwoItems = [
    '① RAG模型优化问答系统流程',
    '② 向量技术提高数据检索效率',
    '③ 整合公网数据提升回答质量',
    '④ RAG框架实现精准通用问答',
    '⑤ 扩展方便对接三方开源系统'
]
const headerThreeItems = [
    '① 大模型解析文件实现智能问答',
    '② 统计学方法深入分析表格数据',
    '③ 表格数据结合大模型精准解读',
    '④ 支持更复杂表格计算增强统计',
    '⑤ 表格问答数据图表可视化展示'
]
***REMOVED***

***REMOVED***
body {
    font-family: Arial, sans-serif;
    margin: 0;
  ***REMOVED***
    box-sizing: border-box;
***REMOVED***

.container {
    max-width: 900px;
  ***REMOVED***
  ***REMOVED***
***REMOVED***

.header {
    background-color: #f6f7fb;
  ***REMOVED***
    text-align: center;
  ***REMOVED***
    align-items: center;
    margin-top: 6%;
    justify-content: center;
    padding: 15px;
***REMOVED***
.header-text {
  ***REMOVED***
    flex-grow: 1;
***REMOVED***

.header-title {
***REMOVED***/* Remove default margin */
  ***REMOVED*** /* Adjust as needed */
***REMOVED***

.header-subtitle {
***REMOVED***/* Remove default margin */
    font-size: 1em; /* Adjust as needed */
    margin-top: 3px; /* Add a small top margin for spacing between title and subtitle */
***REMOVED***

.header > div {
  ***REMOVED***
    flex-grow: 1;
***REMOVED***

.content {
    display: grid;
    grid-template-columns: repeat(3, 1fr***REMOVED***;
    gap: 20px;
  ***REMOVED***
***REMOVED***
.card-one {
  ***REMOVED***
  ***REMOVED***
    background: linear-gradient(to bottom, #f0effe, #d4eefc***REMOVED***;
***REMOVED***
.card-two {
  ***REMOVED***
  ***REMOVED***
    background: linear-gradient(to right, #f0effe, #d4eefc***REMOVED***;
***REMOVED***
.card-three {
  ***REMOVED***
  ***REMOVED***
    background: linear-gradient(to left, #f0effe, #d4eefc***REMOVED***;
***REMOVED***
.card-subtitle {
***REMOVED***/* Remove default margin */
    font-size: 13px; /* Adjust as needed */
    color: #6c757d; /* Optional: to match the color of .header-subtitle */
***REMOVED***

.title {
    color: #333;
    font-size: 17px;
    margin-bottom: 5px;
***REMOVED***

.list-item {
    list-style-type: none;
    margin-bottom: 20px;
  ***REMOVED***
***REMOVED***
***REMOVED***
