<script lang="tsx" setup>
const props = withDefaults(
  defineProps<Props>(***REMOVED***,
***REMOVED***
    text: '',
    autoColor: true,
    noCopy: false,
  ***REMOVED***,
***REMOVED***

const { copy, copied, copyDuration ***REMOVED*** = useClipText(***REMOVED***

interface Props {
  text: string
  autoColor?: boolean
  noCopy?: boolean
***REMOVED***
const copyText = async (***REMOVED*** => {
  if (copied.value***REMOVED*** {
    return
  ***REMOVED***

  await copy(props.text***REMOVED***
  window.$ModalMessage.destroyAll(***REMOVED***
  window.$ModalMessage.success('已复制', {
    duration: copyDuration,
  ***REMOVED******REMOVED***
***REMOVED***

defineExpose({
  copyText,
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <template
    v-if="$slots.default"
  >
    <slot
      name="default"
      v-bind="{
        copyText,
        copied,
      ***REMOVED***"
    ></slot>
  ***REMOVED***
  <div
    v-else
    class="size-20"
    :class="[
      copied
        ? `cursor-initial i-ic:baseline-check ${autoColor && 'c-primary'***REMOVED***`
        : 'cursor-pointer i-ci:copy',
***REMOVED***"
    v-bind="{
      onClick: !noCopy ? copyText : (***REMOVED*** => {***REMOVED***,
    ***REMOVED***"
  ></div>
***REMOVED***

<style lang="scss" scoped>

***REMOVED***
