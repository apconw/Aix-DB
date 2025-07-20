<script lang="ts" setup>
import type { DataTableColumns ***REMOVED*** from 'naive-ui'

interface Props {
  columns: DataTableColumns<any>
  loading: boolean
  data: Array<any>
***REMOVED***

const props = withDefaults(defineProps<Props>(***REMOVED***, {
  loading: false,
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <n-spin
    :show="loading"
    :rotate="false"
    class="bg-#fff:80 h-full"
    :style="{
      '--n-opacity-spinning': '0.5',
    ***REMOVED***"
  >
    <template #icon>
      <div class="i-svg-spinners:tadpole"></div>
    ***REMOVED***
    <n-data-table
      v-if="data.length"
      :columns="columns"
      :data="data"
      :bordered="false"
      :single-line="false"
      :scroll-x="2200"
      class="bg-#fff"
      v-bind="$attrs"
    />
    <section v-else flex="~ col items-center justify-center" select-none>
      <img
        class="w-260"
        select-none
        src="@/assets/svg/empty-status.svg"
      >
      <span class="text-16 c-#909399">
        <slot name="emptyText"></slot>
      </span>
    </section>
  </n-spin>
***REMOVED***

<style lang="scss" scoped>***REMOVED***
