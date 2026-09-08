import { gsap } from 'gsap'

export function createSafeGsapContext(
  root: Element,
  setup: () => void,
  label = 'animation',
) {
  const elements = [root, ...root.querySelectorAll('*')]
  const originalStyles = elements.map((element) => element.getAttribute('style'))

  try {
    return gsap.context(setup, root)
  } catch (error) {
    elements.forEach((element, index) => {
      const style = originalStyles[index]
      if (style === null) element.removeAttribute('style')
      else element.setAttribute('style', style)
    })
    console.error(`${label} initialization failed; static content has been restored.`, error)
    return null
  }
}
