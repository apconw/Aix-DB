<script lang="ts" setup>
const router = useRouter(***REMOVED***


const testRoutesNavs = computed((***REMOVED*** => {
  const routes = router.getRoutes(***REMOVED***
  const _routes = routes.filter((routeItem***REMOVED*** => {
    return (routeItem.name !== 'UserLogin'***REMOVED***
      && !routeItem.redirect
      && routeItem?.meta?.title
  ***REMOVED******REMOVED***
  return _routes.sort((prev, next***REMOVED*** => {
    return prev.meta.title! > next.meta.title!
      ? 1
      : -1
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***

/**
 * 随机生成测试 params hash
 */
const extractParamsFromRoute = (routePath***REMOVED*** => {
  const paramRegex = /:([^/?]+***REMOVED***/g
  const params = {***REMOVED***

  routePath.replace(paramRegex, (__, paramName***REMOVED*** => {
    params[paramName] = uuidv4(***REMOVED***
    return ''
  ***REMOVED******REMOVED***

  return params
***REMOVED***

const handleNavigateTo = (routeItem: RouteRecordRaw***REMOVED*** => {
  router.push({
    name: routeItem.name,
    params: extractParamsFromRoute(routeItem.path***REMOVED***,
  ***REMOVED******REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
  <aside
    class="navigation-nav-sidebar-container"
  >
    <div>该侧边栏路由仅用作开发初期调试</div>
    <n-button
      v-for="(routeItem***REMOVED*** in testRoutesNavs"
      :key="routeItem.path"
      type="primary"
      :dashed="routeItem.name !== $route.name"
      @click="handleNavigateTo(routeItem***REMOVED***"
    >
    ***REMOVED***{ routeItem.meta.title ***REMOVED******REMOVED***
    </n-button>
  </aside>
***REMOVED***

<style lang="scss" scoped>
.navigation-nav-sidebar-container {
  --at-apply: flex flex-col;
  --at-apply: w-full h-full overflow-y-auto b-1 b-solid;
  --at-apply: b-1 b-solid;
  --at-apply: p-20;

  & > * {
    --at-apply: flex justify-start;
    --at-apply: mb-20px;

    &:last-child {
      --at-apply: mb-0;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
