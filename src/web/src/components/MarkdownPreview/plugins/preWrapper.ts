import type MarkdownIt from 'markdown-it'
import PrismJsComponents from 'prismjs/components'

export interface Options {
  codeCopyButtonTitle: string
  hasSingleTheme: boolean
***REMOVED***

// 使用正则表达式匹配字符串的第一个字符，并将其转换为大写
function capitalizeFirstLetter(str***REMOVED*** {
  return str.replace(/^\w/, (match***REMOVED*** => match.toUpperCase(***REMOVED******REMOVED***
***REMOVED***

const getBaseLanguageName = (nameOrAlias, components = PrismJsComponents***REMOVED*** => {
  const _nameOrAlias = nameOrAlias.toLowerCase(***REMOVED***

  const allLanguages = components.languages
  const allLanguageKeys = Object.keys(allLanguages***REMOVED***

  const lang = {
    value: capitalizeFirstLetter(nameOrAlias || 'markdown'***REMOVED***,
  ***REMOVED***

  for (let index = 0; index < allLanguageKeys.length; index++***REMOVED*** {
    const languageKey = allLanguageKeys[index]
    const languageItem = allLanguages[languageKey]

    const { title, alias, aliasTitles ***REMOVED*** = languageItem

    if (languageKey === _nameOrAlias***REMOVED*** {
      lang.value = title
      break
    ***REMOVED***

    if (!alias***REMOVED*** {
      continue
    ***REMOVED***

    if (Array.isArray(alias***REMOVED******REMOVED*** {
      if (aliasTitles && aliasTitles[_nameOrAlias]***REMOVED*** {
        lang.value = aliasTitles[_nameOrAlias]
        break
      ***REMOVED***

      if (alias.includes(_nameOrAlias***REMOVED******REMOVED*** {
        lang.value = title
        break
      ***REMOVED***
    ***REMOVED*** else {
      if (alias === _nameOrAlias***REMOVED*** {
        lang.value = title
        break
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  return lang.value
***REMOVED***

export function preWrapperPlugin(md: MarkdownIt, options: Options***REMOVED*** {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args***REMOVED*** => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // remove title from info
    token.info = token.info.replace(/\[.*\]/, ''***REMOVED***

    const active = / active( |$***REMOVED***/.test(token.info***REMOVED*** ? ' active' : ''
    token.info = token.info.replace(/ active$/, ''***REMOVED***.replace(/ active /, ' '***REMOVED***

    const lang = extractLang(token.info***REMOVED***

    const content = fence(...args***REMOVED***
    return (
***REMOVED***
      <div class="markdown-code-wrapper flex language-${lang***REMOVED***${getAdaptiveThemeMarker(options***REMOVED******REMOVED***${active***REMOVED***">
        <div class="markdown-code-header">
          <span class="markdown-code-lang">${getBaseLanguageName(lang***REMOVED******REMOVED***</span>
          <button class="markdown-code-copy">
  ***REMOVED***class="markdown-copy-icon"></div>
            <span class="markdown-copy-text default">复制代码</span>
            <span class="markdown-copy-text done">已复制</span>
***REMOVED***
***REMOVED***
        ${content***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

export function getAdaptiveThemeMarker(options: Options***REMOVED*** {
  return options.hasSingleTheme ? '' : ' xx-adaptive-theme'
***REMOVED***

export function extractTitle(info: string, html = false***REMOVED*** {
  if (html***REMOVED*** {
    return (
      info.replace(/<!--[\s\S]*?-->/g, ''***REMOVED***.match(/data-title="(.*?***REMOVED***"/***REMOVED***?.[1] || ''
    ***REMOVED***
  ***REMOVED***
  return info.match(/\[(.****REMOVED***\]/***REMOVED***?.[1] || extractLang(info***REMOVED*** || 'txt'
***REMOVED***

function extractLang(info: string***REMOVED*** {
  return info
    .trim(***REMOVED***
    .replace(/=(\d****REMOVED***/, ''***REMOVED***
    .replace(/:(no-***REMOVED***?line-numbers(\{| |$|=\d****REMOVED***.*/, ''***REMOVED***
    .replace(/(-vue|\{| ***REMOVED***.*$/, ''***REMOVED***
    .replace(/^vue-html$/, 'template'***REMOVED***
    .replace(/^ansi$/, ''***REMOVED***
***REMOVED***
