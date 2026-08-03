import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'
import hljs from './highlight'
import { preWrapperPlugin } from './preWrapper'

function escapeHtml(source: string) {
  return source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}

function renderHighlightedCode(code: string, language: string) {
  const normalizedLanguage = language.trim().toLowerCase()

  try {
    if (normalizedLanguage && hljs.getLanguage(normalizedLanguage)) {
      const highlighted = hljs.highlight(code, {
        language: normalizedLanguage,
        ignoreIllegals: true,
      }).value

      return `<pre class="hljs"><code class="language-${normalizedLanguage}">${highlighted}</code></pre>`
    }

    const highlighted = hljs.highlightAuto(code).value
    return `<pre class="hljs"><code>${highlighted}</code></pre>`
  } catch {
    return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`
  }
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, language) => renderHighlightedCode(code, language || ''),
})


// Customize the image rendering rule
md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  token.attrPush(['referrerpolicy', 'no-referrer'])
  return self.renderToken(tokens, idx, options)
}

md.use(preWrapperPlugin, {
  hasSingleTheme: true,
})

const originalRender = md.render.bind(md)
md.render = (src: string, env?: any) => {
  return DOMPurify.sanitize(originalRender(src, env))
}

export default md
