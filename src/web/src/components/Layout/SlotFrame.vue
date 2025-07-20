<script lang="ts" setup>
/**
 * Slot: Top + Center + Bottom
 */
defineOptions({
  name: 'LayoutSlotFrame',
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <div class="slot-frame-layout-container">
    <div v-if="$slots.top" class="top">
      <slot name="top"></slot>
***REMOVED***
    <div class="center">
      <slot name="center"></slot>
***REMOVED***
    <div class="bottom">
      <slot name="bottom"></slot>
***REMOVED***
  </div>
***REMOVED***

<style lang="scss" scoped>
.slot-frame-layout-container {
  --at-apply: flex flex-col;
  --at-apply: h-full;
  --at-apply: overflow-hidden;

  .top,
  .bottom {
    --at-apply: w-full;

  ***REMOVED***
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    min-height: 0;
  ***REMOVED***

  .center {
    --at-apply: flex flex-1 min-w-0 overflow-hidden;
  ***REMOVED***
***REMOVED***
***REMOVED***
