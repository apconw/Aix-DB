<script lang="ts" setup>
import type { IconifyIcon, IconifyRenderMode ***REMOVED*** from '@iconify/vue'
import { Icon ***REMOVED*** from '@iconify/vue'

interface IconProps {
  icon: IconifyIcon | string
  mode?: IconifyRenderMode
  color?: string
  flip?: string
  width?: string
  height?: string
***REMOVED***

const props = defineProps<IconProps>(***REMOVED***
***REMOVED***

***REMOVED***
  <Icon
    :style="{
      'font-size': '1.2em',
    ***REMOVED***"
    v-bind="{
      ...props,
      ...$attrs,
    ***REMOVED***"
  />
***REMOVED***
