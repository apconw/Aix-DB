type EmptyObject = Record<string, never>
declare module '*.vue' {
  import type { DefineComponent ***REMOVED*** from 'vue'

  const component: DefineComponent<EmptyObject, EmptyObject, any>
  export default component
***REMOVED***

// 声明一个模块 '*.md'，设置为字符串类型
declare module '*.md' {
  const content: string
  export default content
***REMOVED***
