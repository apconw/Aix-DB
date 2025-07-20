<script lang="ts" setup>
interface Props {
  active?: boolean
***REMOVED***
withDefaults(defineProps<Props>(***REMOVED***, {
  active: false,
***REMOVED******REMOVED***

const emit = defineEmits(['click', 'edit', 'remove']***REMOVED***
***REMOVED***

***REMOVED***
  <div
    flex="~ justify-between"
    py="10px"
    px="14px"
    rounded-8px
    cursor-pointer
    class="group font-bold transition-colors-260 b b-solid"
    :class="[
      active
        ? 'c-primary b-primary'
        : 'hover:b-info/50 c-#303133 b-transparent',
***REMOVED***"
    @click="emit('click'***REMOVED***"
  >
    <div flex="1" text-nowrap text-ellipsis overflow-x-hidden pr-6px>
      <slot></slot>
***REMOVED***
    <div
      class="opacity-0 transition-colors-200 text-16"
      px="4"
      :class="[
        active
          ? 'opacity-100 c-primary/60 hover:c-primary'
          : 'group-hover:opacity-100 c-#303133/60 hover:c-primary',
  ***REMOVED***"
      flex="~ justify-center items-center"
      @click.stop="emit('edit'***REMOVED***"
    >
      <div class="i-mingcute:pencil-2-line"></div>
***REMOVED***
    <n-popconfirm @positive-click="emit('remove'***REMOVED***">
      <template #trigger>
        <div
          class="opacity-0 transition-colors-200 text-16"
          px="4"
          :class="[
            active
              ? 'opacity-100 c-primary/60 hover:c-primary'
              : 'group-hover:opacity-100 c-#303133/60 hover:c-primary',
      ***REMOVED***"
          flex="~ justify-center items-center"
          @click.stop
        >
***REMOVED***class="i-mingcute:delete-2-line"></div>
***REMOVED***
      ***REMOVED***
      确认删除？
    </n-popconfirm>
  </div>
***REMOVED***

<style lang="scss" scoped>***REMOVED***
