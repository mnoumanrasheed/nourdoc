import { useEffect } from 'react'

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | NourDoc`
    const upsert = (selector: string, attr: string, value: string, content: string) => {
      let node = document.head.querySelector<HTMLMetaElement>(selector)
      if (!node) {
        node = document.createElement('meta')
        node.setAttribute(attr, value)
        document.head.appendChild(node)
      }
      node.content = content
    }
    upsert('meta[name="description"]', 'name', 'description', description)
    upsert('meta[property="og:title"]', 'property', 'og:title', `${title} | NourDoc`)
    upsert('meta[property="og:description"]', 'property', 'og:description', description)
    upsert('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsert('meta[property="og:url"]', 'property', 'og:url', window.location.href)
    upsert('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsert('meta[name="twitter:title"]', 'name', 'twitter:title', `${title} | NourDoc`)
    upsert('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`
  }, [title, description])
}
