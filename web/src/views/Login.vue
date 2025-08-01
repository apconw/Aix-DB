<script lang="tsx" setup>
import { useMessage ***REMOVED*** from 'naive-ui'
import * as GlobalAPI from '@/api'

// 定义表单数据
const form = ref({
  username: 'admin',
  password: '123456',
***REMOVED******REMOVED***
const formRef = ref(null***REMOVED***
const message = useMessage(***REMOVED***
const router = useRouter(***REMOVED***
const userStore = useUserStore(***REMOVED***

onMounted((***REMOVED*** => {
  // 获取用户信息，如果已经登录，则直接跳转首页
  if (userStore.isLoggedIn***REMOVED*** {
    router.push('/'***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***

// 登录处理函数
const handleLogin = (***REMOVED*** => {
  if (form.value.username && form.value.password***REMOVED*** {
    GlobalAPI.login(form.value.username, form.value.password***REMOVED***.then(
      async (res***REMOVED*** => {
        if (res.body***REMOVED*** {
          const responseData = await res.json(***REMOVED*** // 解析为JSON对象
          if (responseData.code === 200***REMOVED*** {
            const user = {
              token: responseData.data.token,
            ***REMOVED***
            // 存储用户信息到 store
            userStore.login(user***REMOVED***

            setTimeout((***REMOVED*** => {
              router.push('/'***REMOVED***
            ***REMOVED***, 500***REMOVED*** // 2000毫秒等于2秒
          ***REMOVED*** else {
            message.error('登录失败，请检查用户名或密码'***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED*** else {
    message.error('请填写完整信息'***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
  <div class="login-container">
    <transition name="fade" mode="out-in">
      <n-card
        v-if="!userStore.isLoggedIn"
        class="w-400 max-w-90vw"
        :style="{
          background: `linear-gradient(to bottom, #e2e1fb, white***REMOVED***`,
        ***REMOVED***"
        title="登录"
      >
        <n-form ref="formRef" @submit.prevent="handleLogin">
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="form.username"
              placeholder="请输入用户名"
              default-value="admin"
  ***REMOVED***
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder="请输入密码"
  ***REMOVED***
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              :onclick="handleLogin"
              :block="true"
  ***REMOVED***
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </transition>
  </div>
***REMOVED***

***REMOVED***
/* 保持原有的样式 */

.login-container {
***REMOVED***
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器高度为视口高度 */
  background: linear-gradient(to bottom, #5e58e7, white***REMOVED***;
***REMOVED***

body,
html {
  margin: 0;
***REMOVED***
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
***REMOVED***

/* 添加新的动画样式 */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
***REMOVED***

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
***REMOVED***
***REMOVED***
