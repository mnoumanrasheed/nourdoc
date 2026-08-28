import { useEffect, type RefObject } from 'react'

const VISUAL_SELECTOR = '.inner-page-hero-visual, .rotating-scene-visual'

export function useHeroVisualScroll(
  heroRef: RefObject<HTMLElement | null>,
  selector = VISUAL_SELECTOR,
) {
  useEffect(() => {
    const hero = heroRef.current
    const visual = hero?.querySelector<HTMLElement>(selector)
    if (!hero || !visual) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactQuery = window.matchMedia('(max-width: 768px)')
    let frame = 0

    const reset = () => {
      visual.style.setProperty('--hero-scroll-x', '0px')
      visual.style.setProperty('--hero-scroll-y', '0px')
      visual.style.setProperty('--hero-scroll-scale', '1')
      visual.style.setProperty('--hero-scroll-opacity', '1')
    }

    const render = () => {
      frame = 0
      if (motionQuery.matches) {
        reset()
        return
      }

      const bounds = hero.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)))
      const compact = compactQuery.matches
      visual.style.setProperty('--hero-scroll-x', `${progress * (compact ? -3 : -8)}px`)
      visual.style.setProperty('--hero-scroll-y', `${progress * (compact ? 9 : 20)}px`)
      visual.style.setProperty('--hero-scroll-scale', String(1 - progress * (compact ? 0.008 : 0.014)))
      visual.style.setProperty('--hero-scroll-opacity', String(1 - progress * 0.14))
    }

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    visual.classList.add('hero-scroll-visual')
    reset()
    render()
    window.addEventListener('scroll', scheduleRender, { passive: true })
    window.addEventListener('resize', scheduleRender)
    motionQuery.addEventListener('change', scheduleRender)
    compactQuery.addEventListener('change', scheduleRender)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleRender)
      window.removeEventListener('resize', scheduleRender)
      motionQuery.removeEventListener('change', scheduleRender)
      compactQuery.removeEventListener('change', scheduleRender)
      visual.classList.remove('hero-scroll-visual')
      visual.style.removeProperty('--hero-scroll-x')
      visual.style.removeProperty('--hero-scroll-y')
      visual.style.removeProperty('--hero-scroll-scale')
      visual.style.removeProperty('--hero-scroll-opacity')
    }
  }, [heroRef, selector])
}
