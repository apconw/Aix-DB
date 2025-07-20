<script lang="tsx" setup>
import { systemTitle ***REMOVED*** from '@/base'

interface Props {
  transparent?: boolean
  hasBorder?: boolean
***REMOVED***
withDefaults(defineProps<Props>(***REMOVED***, {
  transparent: true,
  hasBorder: true,
***REMOVED******REMOVED***

const handleToRepo = (***REMOVED*** => {
  const link = ref('https://github.com/apconw/sanic-web'***REMOVED***
  window.open(link.value, '_blank'***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
  <header
    class="navigation-nav-header-container b-b"
    :class="[
      transparent ? 'bg-bgcolor' : 'bg-transparent',
      hasBorder ? 'b-b-#000/8 b-b-solid' : 'b-b-transparent',
***REMOVED***"
  >
    <div class="header-left"></div>
    <div class="flex-1">
      <div flex="~ col items-center justify-center" px-36px>
        <div
          flex="~ items-center justify-center"
          :style="{
            'font-family': `-apple-system, BlinkMacSystemFont,
              'Segoe UI', Roboto, 'Helvetica Neue', Arial,
              sans-serif`,
            'font-size': `17px`,
            'font-weight': `bold`,
            'color': `#6a30e6`,
          ***REMOVED***"
          select-none
          cursor-pointer
          @click="handleToRepo(***REMOVED***"
        >
***REMOVED***class="size-26 i-hugeicons:ai-chat-02"></div>
***REMOVED***class="flex-1 text-center">
          ***REMOVED***{ systemTitle ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***
        <slot name="bottom"></slot>
***REMOVED***
***REMOVED***

    <div class="header-right"></div>
  </header>
***REMOVED***

<style lang="scss" scoped>
.navigation-nav-header-container {
  --at-apply: w-full flex items-center justify-center py-10;

  height: 60px;
  border-bottom: 0;

  .header-left,
  .header-right {
    --at-apply: flex items-center h-full text-16;
  ***REMOVED***

  .header-left {
    --at-apply: h-50px;
  ***REMOVED***

  .header-right {
    --at-apply: flex items-center h-full text-16;
  ***REMOVED***

  // 添加具体的背景颜色

  &.bg-bgcolor {
    // background-color: #f0effe;
    // background: linear-gradient(to right, #f0effe, #ddeefe***REMOVED***;

    background-color: #f6f7fb;

    // 替换为你的颜色
  ***REMOVED***

  &.bg-transparent {
  ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
