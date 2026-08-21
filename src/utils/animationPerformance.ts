import { gsap } from 'gsap'

export function createAnimationVisibilityController(root: HTMLElement) {
  const targets: Element[] = [root, ...root.querySelectorAll('*')]
  let inViewport = true
  let disposed = false

  const update = () => {
    if (disposed) return
    const paused = !inViewport || document.hidden
    root.classList.toggle('animations-paused', paused)
    gsap.getTweensOf(targets).forEach((animation) => animation.paused(paused))
  }

  const observer = new IntersectionObserver(([entry]) => {
    inViewport = entry.isIntersecting
    update()
  }, { rootMargin: '120px 0px', threshold: 0.01 })

  const onVisibilityChange = () => update()

  observer.observe(root)
  document.addEventListener('visibilitychange', onVisibilityChange)
  update()

  return () => {
    disposed = true
    observer.disconnect()
    document.removeEventListener('visibilitychange', onVisibilityChange)
    root.classList.remove('animations-paused')
  }
}
