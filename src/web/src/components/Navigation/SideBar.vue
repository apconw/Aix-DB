<script lang="tsx" setup>
const router = useRouter(***REMOVED***
const route = useRoute(***REMOVED***
const userStore = useUserStore(***REMOVED***


// 侧边栏图标组件
const SideBarItem = defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    ***REMOVED***,
    fill: {
      type: Boolean,
      default: false,
    ***REMOVED***,
    active: {
      type: Boolean,
      default: false,
    ***REMOVED***,
    disabled: {
      type: Boolean,
      default: false,
    ***REMOVED***,
  ***REMOVED***,
  emits: ['click'],
  setup(props, { emit ***REMOVED******REMOVED*** {
    const computedWrapperClassName = computed((***REMOVED*** => {
      if (props.fill***REMOVED*** {
        return 'c-white'
      ***REMOVED***

      if (props.disabled***REMOVED*** {
        return [
          'opacity-50',
    ***REMOVED***
      ***REMOVED***

      return [
        'c-#c6c4ff hover:c-white',
        props.active && 'c-white',
  ***REMOVED***
    ***REMOVED******REMOVED***

    const computedInnerClassName = computed((***REMOVED*** => {
      if (props.fill***REMOVED*** {
        return
      ***REMOVED***

      return [
        'p-10 rouned-50%',
        props.active && 'bg-#a6a2f3',
  ***REMOVED***
    ***REMOVED******REMOVED***

    const handleClick = (***REMOVED*** => {
      if (props.disabled***REMOVED*** {
        return
      ***REMOVED***
      emit('click'***REMOVED***
    ***REMOVED***

***REMOVED***
      computedWrapperClassName,
      computedInnerClassName,
      handleClick,
    ***REMOVED***
  ***REMOVED***,
  render(***REMOVED*** {
    return (
      <div
        flex="~ col gap-10 items-center"
        class={[
          'select-none transition-all-260',
          this.disabled
            ? 'cursor-not-allowed'
            : 'cursor-pointer',
          this.computedWrapperClassName,
    ***REMOVED******REMOVED***
        onClick={this.handleClick***REMOVED***
      >
        <div
          flex="~ justify-center items-center"
          class={[
            'transition-all-260',
            'size-40 rounded-50%',
            '[&>*]:size-full [&>*]:bg-no-repeat [&>*]:bg-center [&>*]:bg-cover',
            this.computedInnerClassName,
      ***REMOVED******REMOVED***
        >
        ***REMOVED***this.$slots.default?.(***REMOVED******REMOVED***
***REMOVED***
        <div class="font-bold">{this.label***REMOVED***</div>
***REMOVED***
    ***REMOVED***
  ***REMOVED***,
***REMOVED******REMOVED***

const sidebarItems = ref([
***REMOVED***
    label: '通问',
    key: 'SystemLogo',
    renderIcon(***REMOVED*** {
      return (
        <div class="i-my-svg:system-logo"></div>
      ***REMOVED***
    ***REMOVED***,
    onClick(***REMOVED*** {
      router.push('/'***REMOVED***
    ***REMOVED***,
    props: {
      fill: true,
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***
    label: '对话',
    key: 'ChatIndex',
    onClick(***REMOVED*** {
      router.push({
        name: this.key,
      ***REMOVED******REMOVED***
    ***REMOVED***,
    renderIcon(***REMOVED*** {
      return (
        <div class="i-my-svg:chat-index"></div>
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***
    label: '效率',
    key: 'TestAssitant',
    onClick(***REMOVED*** {
      router.push({
        name: this.key,
      ***REMOVED******REMOVED***
    ***REMOVED***,
    renderIcon(***REMOVED*** {
      return (
        <div class="i-my-svg:chat-efficiency"></div>
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***
    label: '智能体',
    key: 'McpChat',
    onClick(***REMOVED*** {
      router.push({
        name: this.key,
      ***REMOVED******REMOVED***
    ***REMOVED***,
    renderIcon(***REMOVED*** {
      return (
        <div class="i-my-svg:chat-agent"></div>
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***,
]***REMOVED***


const handleLogout = (***REMOVED*** => {
  userStore.logout(***REMOVED***
  setTimeout((***REMOVED*** => {
    router.replace('/login'***REMOVED***
  ***REMOVED***, 500***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
  <section
    flex="~ col justify-between"
    w-70
    h-full
    overflow-hidden
    relative
    :style="{
      background: `linear-gradient(
        to bottom,
        #8874f1,
        #588af9
      ***REMOVED***`,
    ***REMOVED***"
  >
    <!-- 最侧边图标设置 -->
    <div
      flex="1 ~ col gap-28"
      pt-24
    >
      <SideBarItem
        v-for="(sidebarItem***REMOVED*** in sidebarItems"
        :key="sidebarItem.key"
        :label="sidebarItem.label"
        :active="sidebarItem.key === route.name"
        v-bind="sidebarItem.props"
        @click="sidebarItem.onClick.call(sidebarItem***REMOVED***"
      >
        <component :is="sidebarItem.renderIcon" />
      </SideBarItem>
***REMOVED***

    <n-popover
      trigger="hover"
      placement="right-start"
    >
      <template #trigger>
        <SideBarItem
          fill
        >
***REMOVED***class="size-35 i-my-svg:avatar"></div>
        </SideBarItem>
      ***REMOVED***
      <n-button
        quaternary
        strong
        @click="handleLogout"
      >
        退出登录
      </n-button>
    </n-popover>
  </section>
***REMOVED***

<style lang="scss" scoped>

***REMOVED***
