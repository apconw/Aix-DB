<script lang="ts" setup>
/**
 * Slot: Left + Right
 */
defineOptions({
  name: 'LayoutSlotArea',
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <main class="slot-area-layout-container">
    <div class="area-left">
      <slot name="left"></slot>
***REMOVED***
    <div class="area-right">
      <slot name="right"></slot>
***REMOVED***
  </main>
***REMOVED***

<style lang="scss" scoped>
.slot-area-layout-container {
  --at-apply: flex flex-1 min-w-0 overflow-hidden;
  --at-apply: bg-#f9fbfc;

  .area-left {
    --at-apply: min-w-0 h-full;
  ***REMOVED***

  .area-right {
    --at-apply: flex-1 overflow-y-auto;

    // --at-apply: b-2 b-purple b-solid;
  ***REMOVED***
***REMOVED***
***REMOVED***
