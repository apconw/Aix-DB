import MarkdownIt from 'markdown-it'
import hljs from './highlight'

import markdownItHighlight from 'markdown-it-highlightjs'
import { preWrapperPlugin ***REMOVED*** from './preWrapper'

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
***REMOVED******REMOVED***

md.use(markdownItHighlight, {
    hljs
***REMOVED******REMOVED***.use(preWrapperPlugin, {
    hasSingleTheme: true
***REMOVED******REMOVED***

export default md
