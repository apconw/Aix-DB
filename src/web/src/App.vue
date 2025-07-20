<script lang="ts" setup>
import { dateZhCN, zhCN ***REMOVED*** from 'naive-ui'
import NaiveProvider from './NaiveProvider.vue'

defineOptions({
  name: 'App',
***REMOVED******REMOVED***

const { defaultTheme, themeOverrides ***REMOVED*** = useTheme(***REMOVED***

useCopyCode(***REMOVED***
***REMOVED***

***REMOVED***
  <NConfigProvider
    class="h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="defaultTheme"
    :theme-overrides="themeOverrides"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
***REMOVED***

<style lang="scss">
@use '@/styles/index.scss';
***REMOVED***
