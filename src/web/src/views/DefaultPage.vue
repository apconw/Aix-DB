<script lang="ts" setup>
const hotSearchItems = [
  '① Text2SQL 文本转SQL 数据库查询',
  '② Echart图表增强且数据问答可视化',
  '③ Text2SQL与Echarts提供数据分析',
  '④ 结合Echarts和Text2SQL提升解读',
  '⑤ 基于大数据底座提升数据问答速度',
]
const headerTwoItems = [
  '① RAG模型优化问答系统流程',
  '② 向量技术提高数据检索效率',
  '③ 整合公网数据提升回答质量',
  '④ RAG框架实现精准通用问答',
  '⑤ 扩展方便对接三方开源系统',
]
const headerThreeItems = [
  '① 大模型解析文件实现智能问答',
  '② 统计学方法深入分析表格数据',
  '③ 表格数据结合大模型精准解读',
  '④ 支持更复杂表格计算增强统计',
  '⑤ 表格问答数据图表可视化展示',
]
***REMOVED***

***REMOVED***
  <div class="container">
    <div class="header">
      <div class="bg-primary rounded-50%">
        <div class="size-60 bg-white i-my-svg:system-logo"></div>
***REMOVED***
      <div class="header-text">
        <h1 class="header-title">你的全能AI数据助手</h1>
        <p class="header-subtitle">基于大模型的数据问答小助手</p>
***REMOVED***
***REMOVED***
    <div class="content">
      <div class="card-one">
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
      <div class="card-two">
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
      <div class="card-three">
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
  </div>
***REMOVED***

***REMOVED***
body {
  font-family: Arial, sans-serif;
  margin: 0;
***REMOVED***
  box-sizing: border-box;
***REMOVED***

.container {
***REMOVED***
  max-width: 900px;
***REMOVED***
***REMOVED***
***REMOVED***

.header {
  background-color: #f6f7fb;

  /* background: linear-gradient(to right, #f1f0fe, #f3f2ff***REMOVED***; */

***REMOVED***
  text-align: center;
***REMOVED***
  align-items: center;
  gap: 16px;
  margin-top: 6%;
  justify-content: center;
  padding: 15px;
***REMOVED***

.header-text {
***REMOVED***
***REMOVED***
  flex-grow: 1;
***REMOVED***

.header-title {
  margin: 0; /* Remove default margin */
***REMOVED*** /* Adjust as needed */
***REMOVED***

.header-subtitle {
  margin: 0; /* Remove default margin */
  font-size: 1em; /* Adjust as needed */
  margin-top: 3px; /* Add a small top margin for spacing between title and subtitle */
***REMOVED***

.header > div {
***REMOVED***
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
  margin: 0; /* Remove default margin */
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
