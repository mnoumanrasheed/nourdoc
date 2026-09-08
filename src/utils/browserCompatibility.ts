export function subscribeToMediaQuery(
  mediaQuery: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) {
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }

  // Safari versions before MediaQueryList inherited EventTarget use this API.
  mediaQuery.addListener(listener)
  return () => mediaQuery.removeListener(listener)
}

export function ensureBrowserCompatibility() {
  if (typeof window.IntersectionObserver === 'function') return

  class VisibleIntersectionObserver implements IntersectionObserver {
    readonly root: Document | Element | null
    readonly rootMargin: string
    readonly scrollMargin: string
    readonly thresholds: readonly number[]
    private readonly callback: IntersectionObserverCallback

    constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
      this.callback = callback
      this.root = options.root ?? null
      this.rootMargin = options.rootMargin ?? '0px'
      this.scrollMargin = options.scrollMargin ?? '0px'
      this.thresholds = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold ?? 0]
    }

    observe(element: Element) {
      const bounds = element.getBoundingClientRect()
      this.callback([{
        time: Date.now(),
        target: element,
        rootBounds: null,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        isIntersecting: true,
        intersectionRatio: 1,
      }], this)
    }

    disconnect() {}
    unobserve() {}
    takeRecords() { return [] }
  }

  window.IntersectionObserver = VisibleIntersectionObserver
}

export function observeElementVisibility(
  element: Element,
  listener: (isVisible: boolean) => void,
  options?: IntersectionObserverInit,
) {
  if (typeof window.IntersectionObserver !== 'function') {
    listener(true)
    return () => undefined
  }

  try {
    const observer = new IntersectionObserver(([entry]) => {
      listener(entry?.isIntersecting ?? true)
    }, options)
    observer.observe(element)
    return () => observer.disconnect()
  } catch (error) {
    console.error('Visibility observer initialization failed; animations will remain active.', error)
    listener(true)
    return () => undefined
  }
}
