import gsap from 'gsap'

type PacketConfig = {
  selector: string
  pathIndex: number
  duration: number
  delay?: number
  direction?: 'out' | 'in'
  scale?: number
}

export function animatePacketsOnPaths(root: HTMLElement, pathSelector: string, packets: PacketConfig[]) {
  const paths = gsap.utils.toArray<SVGPathElement>(pathSelector, root)

  packets.forEach(({ selector, pathIndex, duration, delay = 0, direction = 'out', scale = 1.25 }) => {
    const packet = root.querySelector<HTMLElement>(selector)
    const path = paths[pathIndex]
    if (!packet || !path) return

    const pathLength = path.getTotalLength()
    const state = { progress: direction === 'in' ? 1 : 0 }
    const render = () => {
      const svg = path.ownerSVGElement
      const parent = packet.offsetParent as HTMLElement | null
      if (!svg || !parent) return
      const point = path.getPointAtLength(state.progress * pathLength)
      const viewBox = svg.viewBox.baseVal
      const svgRect = svg.getBoundingClientRect()
      const parentRect = parent.getBoundingClientRect()
      const targetX = svgRect.left - parentRect.left + ((point.x - viewBox.x) / viewBox.width) * svgRect.width
      const targetY = svgRect.top - parentRect.top + ((point.y - viewBox.y) / viewBox.height) * svgRect.height
      gsap.set(packet, {
        x: targetX - packet.offsetLeft - packet.offsetWidth / 2,
        y: targetY - packet.offsetTop - packet.offsetHeight / 2,
      })
    }

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: .28, delay })
    timeline
      .set(packet, { opacity: 0, scale: .72 })
      .set(state, { progress: direction === 'in' ? 1 : 0, onComplete: render })
      .to(state, { progress: direction === 'in' ? 0 : 1, duration, ease: 'none', onUpdate: render }, 0)
      .to(packet, { scale, duration: Math.min(.6, duration * .2), ease: 'power1.out' }, 0)
      .to(packet, { opacity: .98, duration: .32, ease: 'power1.out' }, 0)
      .to(packet, { opacity: 0, duration: .42, ease: 'power1.in' }, Math.max(.1, duration - .42))
  })
}

export function shouldReduceHeroMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
