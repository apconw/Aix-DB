import MarkdownIt from 'markdown-it'
import markdownItHighlight from 'markdown-it-highlightjs'

import hljs from './highlight'
import { preWrapperPlugin ***REMOVED*** from './preWrapper'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
***REMOVED******REMOVED***

// Customize the image rendering rule
md.renderer.rules.image = function (tokens, idx, options, env, self***REMOVED*** {
  const token = tokens[idx]
  token.attrPush(['referrerpolicy', 'no-referrer']***REMOVED***
  return self.renderToken(tokens, idx, options***REMOVED***
***REMOVED***

md.use(markdownItHighlight, {
  hljs,
***REMOVED******REMOVED***.use(preWrapperPlugin, {
  hasSingleTheme: true,
***REMOVED******REMOVED***

export default md
