<script lang="tsx" setup>
/**
使用:
 
<Pagination
  v-model:page="currentPage"
  :page-count="100"
  @change="handleChangePage"
/>
 
const currentPage = ref(2***REMOVED***
const handleChangePage = (n: number***REMOVED*** => {
  console.log('nnnn', n***REMOVED***
***REMOVED***
 
 */

defineOptions({
  name: 'Pagination',
***REMOVED******REMOVED***
const props = defineProps({
  page: {
    type: Number,
    default: 1,
  ***REMOVED***,
  pageCount: {
    type: Number,
    default: 1,
  ***REMOVED***,
***REMOVED******REMOVED***

const emits = defineEmits([
  'update:page',
  'change',
]***REMOVED***

const {
  page,
  pageCount,
***REMOVED*** = toRefs(props***REMOVED***

/**
 * 当前页码（非数组下标）
 */
const activePage = ref(page.value***REMOVED***


watch(
  (***REMOVED*** => activePage.value,
  (***REMOVED*** => {
    emits('update:page', activePage.value***REMOVED***
  ***REMOVED***,
***REMOVED***

watch(
  (***REMOVED*** => page.value,
  (***REMOVED*** => {
    activePage.value = page.value
  ***REMOVED***,
***REMOVED***
    deep: true,
  ***REMOVED***,
***REMOVED***

const handleToChangePage = (***REMOVED*** => {
  emits('change', activePage.value***REMOVED***
***REMOVED***


/**
 * 当超过此数值时自动分组（包括此值）
 */
const overflowCount = 10

const overflowStartNumber = 6
const overflowEndNumber = 5

/**
 * 是否自动分组
 */
const showGroupsAuto = computed((***REMOVED*** => {
  if (pageCount.value < overflowCount***REMOVED*** {
    return false
  ***REMOVED***
  return true
***REMOVED******REMOVED***


const allPageNumbers = computed((***REMOVED*** => {
  return Array
    .from({
      length: pageCount.value,
    ***REMOVED******REMOVED***
    .map((_, idx***REMOVED*** => idx + 1***REMOVED***
***REMOVED******REMOVED***

/**
 * 是否展示快捷方式跳转 - prev
 */
const showOverflowPrev = computed((***REMOVED*** => {
  if (pageCount.value < overflowCount***REMOVED*** {
    return false
  ***REMOVED***

  if (activePage.value >= overflowStartNumber***REMOVED*** {
    return true
  ***REMOVED***

  return false
***REMOVED******REMOVED***

/**
 * 是否展示快捷方式跳转 - next
 */
const showOverflowNext = computed((***REMOVED*** => {
  if (pageCount.value < overflowCount***REMOVED*** {
    return false
  ***REMOVED***

  if (
    (
      pageCount.value - activePage.value
    ***REMOVED*** >= overflowEndNumber
  ***REMOVED*** {
    return true
  ***REMOVED***

  return false
***REMOVED******REMOVED***


/**
 * 获取分组展示的前后页码索引
 */
const groupPageRange = computed((***REMOVED*** => {
  let startIndex = 0
  let endIndex = pageCount.value
  const extendCenterSize = 3
  const extendBetweenSize = 7

  if (showOverflowPrev.value && showOverflowNext.value***REMOVED*** {
    startIndex = activePage.value - extendCenterSize
    endIndex = activePage.value + extendCenterSize - 1
  ***REMOVED***

  if (showOverflowPrev.value && !showOverflowNext.value***REMOVED*** {
    startIndex = pageCount.value - extendBetweenSize
    endIndex = pageCount.value
  ***REMOVED***

  if (!showOverflowPrev.value && showOverflowNext.value***REMOVED*** {
    startIndex = 0
    endIndex = extendBetweenSize
  ***REMOVED***

  return {
    startIndex,
    endIndex,
  ***REMOVED***
***REMOVED******REMOVED***

/**
 * 获取分组展示的前后页码的范围数组
 */
const getGroupPageNumbers = computed((***REMOVED*** => {
  const { startIndex, endIndex ***REMOVED*** = groupPageRange.value
  return allPageNumbers.value.slice(startIndex, endIndex***REMOVED***
***REMOVED******REMOVED***


/**
 * 上一页跳转
 */
const handleToPrev = (***REMOVED*** => {
  if (activePage.value - 1 <= 0***REMOVED*** {
    return
  ***REMOVED***
  activePage.value--
  handleToChangePage(***REMOVED***
***REMOVED***
/**
 * 下一页跳转
 */
const handleToNext = (***REMOVED*** => {
  if (activePage.value + 1 > pageCount.value***REMOVED*** {
    return
  ***REMOVED***
  activePage.value++
  handleToChangePage(***REMOVED***
***REMOVED***
/**
 * 上一页加速跳转
 */
const handleToQuickPrev = (***REMOVED*** => {
  const { startIndex ***REMOVED*** = groupPageRange.value
  activePage.value = startIndex
  handleToChangePage(***REMOVED***
***REMOVED***
/**
 * 下一页加速跳转
 */
const handleToQuickNext = (***REMOVED*** => {
  const { endIndex ***REMOVED*** = groupPageRange.value
  activePage.value = endIndex + 1
  handleToChangePage(***REMOVED***
***REMOVED***


interface SinglePageContainerType {
  active?: boolean
  disabled?: boolean
  onClick?: (***REMOVED*** => any
***REMOVED***


/**
 * 分页指示器外层盒子
 */
const RenderSinglePageContainer = ({
  active = false,
  disabled = false,
  onClick = (***REMOVED*** => { ***REMOVED***,
  ghost = false,
***REMOVED***: SinglePageContainerType & SetupContext['attrs'], VNode: SetupContext***REMOVED*** => {
  const slots = VNode.slots.default
    ? VNode.slots.default(***REMOVED***
    : null

  const defaultClassName = [
    'flex items-center justify-center min-w-30px h-30px c-primary cursor-pointer select-none',
    'rounded-3px c-#fff',
    'b',
  ]

  const activeClassName = active ? 'c-primary b-primary b-solid' : ''
  const disabledClassName = disabled ? 'cursor-not-allowed bg-#fafafc c-#c2c2c2 b-#e0e0e6' : ''

  return (
    <div
      onClick={onClick***REMOVED***
      class={
        [
          ...defaultClassName,
          activeClassName,
          disabledClassName,
    ***REMOVED***
      ***REMOVED***
    >{ slots ***REMOVED***</div>
  ***REMOVED***
***REMOVED***


/**
 * 页码容器
 */
const RenderSinglePageNumber = ({ num = 1, ...attrs ***REMOVED***: { num: number, key?: number ***REMOVED*** & SinglePageContainerType***REMOVED*** => {
  const onClick = (***REMOVED*** => {
    activePage.value = num
    handleToChangePage(***REMOVED***
  ***REMOVED***
  return (
    <RenderSinglePageContainer
      onClick={onClick***REMOVED***
    ***REMOVED***...attrs***REMOVED***
    >
    ***REMOVED*** num ***REMOVED***
    </RenderSinglePageContainer>
  ***REMOVED***
***REMOVED***


const RenderPartOfNavNumbers = (***REMOVED*** => {
  return (
    <>
    ***REMOVED***
        showOverflowPrev.value ? <RenderSinglePageNumber num={1***REMOVED*** /> : null
      ***REMOVED***
    ***REMOVED***
        showOverflowPrev.value
          ? (
              <RenderSinglePageContainer
                onClick={(***REMOVED*** => handleToQuickPrev(***REMOVED******REMOVED***
                class={'group'***REMOVED***
    ***REMOVED***
      ***REMOVED***class="i-bx:dots-horizontal-rounded group-hover:i-ic:twotone-keyboard-double-arrow-left"></div>
              </RenderSinglePageContainer>
            ***REMOVED***
          : null
      ***REMOVED***

    ***REMOVED***
        getGroupPageNumbers.value.map((num***REMOVED*** => (
          <RenderSinglePageNumber
            active={activePage.value === num***REMOVED***
            num={num***REMOVED***
***REMOVED***
        ***REMOVED******REMOVED***
      ***REMOVED***

    ***REMOVED***
        showOverflowNext.value
          ? (
              <RenderSinglePageContainer
                onClick={(***REMOVED*** => handleToQuickNext(***REMOVED******REMOVED***
                class={'group'***REMOVED***
    ***REMOVED***
      ***REMOVED***class="i-bx:dots-horizontal-rounded group-hover:i-ic:twotone-keyboard-double-arrow-right"></div>
              </RenderSinglePageContainer>
            ***REMOVED***
          : null
      ***REMOVED***
    ***REMOVED***
        showOverflowNext.value ? <RenderSinglePageNumber num={pageCount.value***REMOVED*** /> : null
      ***REMOVED***
    </>
  ***REMOVED***
***REMOVED***
***REMOVED***


***REMOVED***
  <div class="pagination-container">
    <RenderSinglePageContainer
      :disabled="activePage === 1"
      ghost
      @click="handleToPrev(***REMOVED***"
    >
      <div class="i-ic:twotone-keyboard-arrow-left"></div>
    </RenderSinglePageContainer>
    <template v-if="showGroupsAuto">
      <RenderPartOfNavNumbers />
    ***REMOVED***
    <template v-else>
      <RenderSinglePageNumber
        v-for="(num***REMOVED*** in allPageNumbers"
        :key="num"
        :active="activePage === num"
        :num="num"
      />
    ***REMOVED***
    <RenderSinglePageContainer
      :disabled="activePage === pageCount"
      @click="handleToNext(***REMOVED***"
    >
      <div class="i-ic:twotone-keyboard-arrow-right"></div>
    </RenderSinglePageContainer>
  </div>
***REMOVED***

<style lang="scss">
.pagination-container {
  --at-apply: py-10 flex justify-center items-center;

  & > * {
    --at-apply: ml-10px "first:ml-0px" text-14px;
  ***REMOVED***
***REMOVED***
***REMOVED***
