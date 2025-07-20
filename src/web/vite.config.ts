import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

import IconsResolver from 'unplugin-icons/resolver'

import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver ***REMOVED*** from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig ***REMOVED*** from 'vite'

import raw from 'vite-raw-plugin'

export default defineConfig(({ mode ***REMOVED******REMOVED*** => {
  return {
    base: process.env.VITE_ROUTER_MODE === 'hash' ? '' : '/',
    server: {
      port: 2048,
      cors: true,
      proxy: {
        '/spark': {
          target: 'https://spark-api-open.xf-yun.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path***REMOVED*** => path.replace(/^\/spark/, ''***REMOVED***,
        ***REMOVED***,
        '/siliconflow': {
          target: 'https://api.siliconflow.cn',
          changeOrigin: true,
          ws: true,
          rewrite: (path***REMOVED*** => path.replace(/^\/siliconflow/, ''***REMOVED***,
        ***REMOVED***,
        '/sanic': {
          target: 'http://localhost:8088',
          changeOrigin: true,
          ws: true,
          rewrite: (path***REMOVED*** => path.replace(/^\/sanic/, ''***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
    plugins: [
      UnoCSS(***REMOVED***,
      vue(***REMOVED***,
      raw({
        fileRegex: /\.md$/,
      ***REMOVED******REMOVED***,
      vueJsx(***REMOVED***,
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue\??/],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ***REMOVED***
            'vue': ['createVNode', 'render'],
            'vue-router': [
              'createRouter',
              'createWebHistory',
              'useRouter',
              'useRoute',
        ***REMOVED***,
            'uuid': [['v4', 'uuidv4']],
            'lodash-es': [['*', '_']],
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
        ***REMOVED***,
          ***REMOVED***,
        ***REMOVED***
            from: 'vue',
            imports: [
              'App',
              'VNode',
              'ComponentInternalInstance',
              'GlobalComponents',
              'SetupContext',
              'PropType',
        ***REMOVED***,
            type: true,
          ***REMOVED***,
        ***REMOVED***
            from: 'vue-router',
            imports: ['RouteRecordRaw', 'RouteLocationRaw'],
            type: true,
          ***REMOVED***,
    ***REMOVED***,
        resolvers: mode === 'development' ? [] : [NaiveUiResolver(***REMOVED***],
        dirs: [
          './src/hooks',
          './src/store/business',
          './src/store/transform',
          './src/store/hooks/**',
    ***REMOVED***,
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        ***REMOVED***,
        vueTemplate: true,
      ***REMOVED******REMOVED***,
      Components({
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [
          IconsResolver({
            prefix: 'auto-icon',
          ***REMOVED******REMOVED***,
          NaiveUiResolver(***REMOVED***,
    ***REMOVED***,
      ***REMOVED******REMOVED***,
      // Auto use Iconify icon
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1.2,
        defaultStyle: '',
        defaultClass: 'unplugin-icon',
        jsx: 'react',
      ***REMOVED******REMOVED***,
***REMOVED***,
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.less',
        '.css',
  ***REMOVED***,
      alias: [
      ***REMOVED***
          find: '@',
          replacement: path.resolve(__dirname, 'src'***REMOVED***,
        ***REMOVED***,
  ***REMOVED***,
    ***REMOVED***,
    define: {
      'process.env': process.env,
    ***REMOVED***,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/naive-variables.scss' as *;`,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
  ***REMOVED***
***REMOVED******REMOVED***
