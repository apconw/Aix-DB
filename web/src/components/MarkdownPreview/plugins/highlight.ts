import hljs from 'highlight.js'

function hljsDefineVue(***REMOVED*** {
  return {
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<!--', '-->', {
        relevance: 10,
      ***REMOVED******REMOVED***,
    ***REMOVED***
        begin: /^(\s****REMOVED***(<script>***REMOVED***/gm,
        end: /^(\s****REMOVED***(<\/script>***REMOVED***/gm,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true,
      ***REMOVED***,
    ***REMOVED***
        begin: /^(\s****REMOVED***(<script lang=["']ts["']>***REMOVED***/gm,
        end: /^(\s****REMOVED***(<\/script>***REMOVED***/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true,
      ***REMOVED***,
    ***REMOVED***
        begin: /^(\s****REMOVED***(<style(\sscoped***REMOVED***?>***REMOVED***/gm,
        end: /^(\s****REMOVED***(<\/style>***REMOVED***/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true,
      ***REMOVED***,
    ***REMOVED***
        begin: /^(\s****REMOVED***(<style lang=["'](scss|sass***REMOVED***["'](\sscoped***REMOVED***?>***REMOVED***/gm,
        end: /^(\s****REMOVED***(<\/style>***REMOVED***/gm,
        subLanguage: 'scss',
        excludeBegin: true,
        excludeEnd: true,
      ***REMOVED***,
    ***REMOVED***
        begin: /^(\s****REMOVED***(<style lang=["']stylus["'](\sscoped***REMOVED***?>***REMOVED***/gm,
        end: /^(\s****REMOVED***(<\/style>***REMOVED***/gm,
        subLanguage: 'stylus',
        excludeBegin: true,
        excludeEnd: true,
      ***REMOVED***,
***REMOVED***,
  ***REMOVED***
***REMOVED***

hljs.registerLanguage('vue', hljsDefineVue***REMOVED***

export default hljs
