<script lang="ts" setup>
// 引入所需的组件
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader ***REMOVED*** from 'naive-ui'
***REMOVED***

***REMOVED***
  <n-layout class="custom-layout">
    <n-layout-header class="header">上</n-layout-header>
    <n-layout-content class="content">中</n-layout-content>
    <n-layout-footer class="footer">下</n-layout-footer>
***REMOVED***
***REMOVED***

***REMOVED***
.custom-layout {
  width: 240px;
***REMOVED***
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: gray;
***REMOVED***
***REMOVED***

.header,
.footer {
  background-color: darkgray;
  padding: 8px;
***REMOVED***

.content {
  background-color: lightgray;
  padding: 8px;
***REMOVED***
***REMOVED***
