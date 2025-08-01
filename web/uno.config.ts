import path from 'node:path'
import { FileSystemIconLoader ***REMOVED*** from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerAttributifyJsx,
  transformerDirectives,
***REMOVED*** from 'unocss'


export default defineConfig({
  presets: [
    presetWind3(***REMOVED***,
    presetAttributify(***REMOVED***,
    presetIcons({
      customizations: {
        transform(svg***REMOVED*** {
          return svg.replace(/#fff/, 'currentColor'***REMOVED***
        ***REMOVED***,
      ***REMOVED***,
      collections: {
        'my-svg': FileSystemIconLoader(
          path.join(__dirname, 'src/assets/svg'***REMOVED***,
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED******REMOVED***,
    presetRemToPx({
      baseFontSize: 4,
    ***REMOVED******REMOVED***,
  ],
  transformers: [
    transformerDirectives(***REMOVED***,
    transformerAttributifyJsx(***REMOVED***,
  ],
  theme: {
    colors: {
      primary: '#692ee6',
      success: '#52c41a',
      warning: '#fe7d18',
      danger: '#fa5555',
      info: '#909399',
      bgcolor: '#f2ecee',
    ***REMOVED***,
  ***REMOVED***,
  rules: [
    [
      'navbar-shadow', {
        'box-shadow': '0 1px 4px rgb(0 21 41 / 8%***REMOVED***',
      ***REMOVED***,
***REMOVED***,
  ],
***REMOVED******REMOVED***
