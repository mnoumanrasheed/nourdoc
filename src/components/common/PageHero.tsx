import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motionDurations, motionEase, motionEaseSoft } from '../../utils/motion'
import type { HeroVariant } from '../sections/HeroMotif'

const signalPaths: Record<HeroVariant, string[]> = {
  why: ['M-30 286 C112 252 134 91 271 134 S407 268 552 64', 'M-18 116 C118 48 207 188 320 116 S445 74 548 214', 'M72 388 C126 246 262 272 334 187 S430 142 500 -24'],
  product: ['M-25 310 C92 188 174 290 265 172 S420 76 552 118', 'M-20 92 C105 164 182 54 286 128 S418 276 548 190', 'M82 382 C164 288 157 173 282 204 S430 126 498 -28'],
  impact: ['M-32 274 C85 112 180 112 270 220 S420 298 550 104', 'M-18 154 C104 246 202 58 312 126 S424 188 548 72', 'M58 382 C138 314 220 268 298 172 S430 112 506 -26'],
  security: ['M-28 302 C102 246 132 94 260 132 S406 242 550 70', 'M-20 86 C102 38 188 196 290 118 S426 58 548 202', 'M78 390 C142 258 244 282 326 190 S438 130 500 -30'],
  partners: ['M-28 244 C96 310 166 88 274 144 S414 228 552 106', 'M-18 126 C116 78 190 258 306 166 S432 98 548 236', 'M64 382 C162 248 238 316 320 204 S430 146 506 -26'],
  about: ['M-32 292 C86 182 182 250 264 146 S402 102 552 198', 'M-20 108 C104 208 206 60 302 154 S430 252 548 102', 'M72 384 C136 278 236 286 322 186 S432 122 504 -28'],
  contact: ['M-26 276 C104 96 186 228 278 136 S414 172 550 82', 'M-20 122 C102 58 206 244 316 146 S438 116 548 226', 'M66 382 C156 302 226 230 318 184 S438 100 506 -26'],
}

function HeroSignal({ variant, reduced }: { variant: HeroVariant; reduced: boolean | null }) {
  const signalRef = useRef<HTMLDivElement>(null)
  const paths = signalPaths[variant]

  useLayoutEffect(() => {
    const root = signalRef.current
    if (!root || reduced) return
    const loops: gsap.core.Animation[] = []
    const context = gsap.context(() => {
      const pathElements = gsap.utils.toArray<SVGPathElement>('.page-hero-signal-path', root)
      const travellers = gsap.utils.toArray<SVGCircleElement>('.page-hero-traveller', root)

      pathElements.forEach((path, index) => {
        loops.push(gsap.to(path, { strokeDashoffset: index % 2 ? 180 : -180, duration: 14 + index * 4, repeat: -1, ease: 'none' }))
      })

      travellers.forEach((traveller, index) => {
        const path = pathElements[index % pathElements.length]
        const length = path.getTotalLength()
        const state = { progress: index / travellers.length }
        const render = () => {
          const point = path.getPointAtLength((state.progress % 1) * length)
          traveller.setAttribute('cx', String(point.x))
          traveller.setAttribute('cy', String(point.y))
        }
        render()
        loops.push(gsap.to(state, { progress: state.progress + 1, duration: 7.5 + index * 1.15, repeat: -1, ease: 'none', onUpdate: render }))
      })

      loops.push(gsap.to('.page-hero-orbit-outer', { rotation: 360, duration: 42, repeat: -1, ease: 'none', transformOrigin: '50% 50%' }))
      loops.push(gsap.to('.page-hero-orbit-inner', { rotation: -360, duration: 31, repeat: -1, ease: 'none', transformOrigin: '50% 50%' }))
      loops.push(gsap.to('.page-hero-signal-node', { scale: 1.55, opacity: .95, duration: 2.1, stagger: { each: .34, repeat: -1, yoyo: true }, ease: 'sine.inOut' }))
      loops.push(gsap.fromTo('.page-hero-scan', { xPercent: -145, opacity: 0 }, { xPercent: 145, opacity: .42, duration: 4.2, repeat: -1, repeatDelay: 2.2, ease: 'power1.inOut' }))
    }, root)

    const observer = new IntersectionObserver(([entry]) => {
      loops.forEach((loop) => entry.isIntersecting ? loop.resume() : loop.pause())
    }, { threshold: .08 })
    observer.observe(root)

    return () => { observer.disconnect(); context.revert() }
  }, [paths, reduced])

  return (
    <motion.div ref={signalRef} className={`page-hero-signal page-hero-signal-${variant}`} aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .72, ease: motionEaseSoft }}>
      <svg viewBox="0 0 520 360" preserveAspectRatio="none">
        {paths.map((path) => <path className="page-hero-signal-path" d={path} key={path} />)}
        {Array.from({ length: 5 }, (_, index) => <circle className="page-hero-traveller" r={index % 2 ? 3 : 3.8} key={index} />)}
      </svg>
      {Array.from({ length: 5 }, (_, index) => <i className="page-hero-signal-node" key={index} />)}
      <div className="page-hero-orbits"><span className="page-hero-orbit-outer" /><span className="page-hero-orbit-inner" /><b /></div>
      <span className="page-hero-scan" />
    </motion.div>
  )
}

export function PageHero({ eyebrow, title, text, variant, image, imageAlt, imagePosition = 'center' }: { eyebrow: string; title: string; text: string; variant: HeroVariant; image?: string; imageAlt?: string; imagePosition?: string }) {
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 900px)')
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 18])
  const mediaX = useTransform(scrollYProgress, [0, 1], [0, -8])
  const mediaRotateX = useTransform(scrollYProgress, [0, 1], [0, -1.5])
  const mediaRotateY = useTransform(scrollYProgress, [0, 1], [0, .8])
  const still = reduced || compact

  useLayoutEffect(() => {
    const root = heroRef.current
    if (!root || reduced || !image) return
    let drift: gsap.core.Tween | null = null
    const context = gsap.context(() => {
      const plane = root.querySelector('.hero-media-image-plane')
      if (!plane) return
      gsap.set(plane, { scale: 1.03, x: 0, y: 0 })
      drift = gsap.to(plane, { scale: 1.075, x: compact ? -2 : -5, y: compact ? 1.5 : 3, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, root)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) drift?.resume()
      else drift?.pause()
    }, { threshold: .05 })
    observer.observe(root)

    return () => { observer.disconnect(); context.revert() }
  }, [compact, image, reduced])

  return (
    <header ref={heroRef} className={`page-hero page-hero-theme page-hero-${variant}-theme section-grid-bg ${image ? 'page-hero-has-image' : ''}`}>
      {image && <motion.div className={`hero-media hero-media-${variant}`} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .04, ease: motionEaseSoft }}>
        <div className="hero-media-image-plane">
          <motion.img src={image} alt={imageAlt ?? ''} fetchPriority="high" style={{ objectPosition: imagePosition, x: still ? 0 : mediaX, y: still ? 0 : mediaY, rotateX: still ? 0 : mediaRotateX, rotateY: still ? 0 : mediaRotateY }} />
        </div>
        <span className="hero-media-overlay" aria-hidden="true" />
        <HeroSignal variant={variant} reduced={reduced} />
      </motion.div>}
      <div className="hero-depth-particles" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
      </div>
      <motion.div className="page-hero-ambient" aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: .98 }} animate={reduced ? undefined : { opacity: 1, scale: [1, 1.06, 1], x: [0, 18, 0], y: [0, -10, 0] }} transition={{ opacity: { duration: .8, delay: .16 }, scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 15, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 15, repeat: Infinity, ease: 'easeInOut' } }} />
      <motion.div className={`container page-hero-inner page-hero-${variant}`} initial={reduced ? false : 'hidden'} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .11, delayChildren: image ? .36 : .06 } } }}>
        <div className="page-hero-content">
          <motion.span className="eyebrow" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: motionDurations.base, ease: motionEase } } }}>{eyebrow}</motion.span>
          <div className="page-hero-title-mask"><motion.h1 variants={{ hidden: { opacity: 0, y: '32%' }, visible: { opacity: 1, y: 0, transition: { duration: .86, ease: motionEaseSoft } } }}>{title}</motion.h1></div>
        </div>
        <motion.div className="page-hero-copy" variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .68, ease: motionEase } } }}>
          <p>{text}</p>
          <motion.div variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: motionEase } } }}><ArrowDown aria-hidden="true" /></motion.div>
        </motion.div>
        {!image && <HeroSignal variant={variant} reduced={reduced} />}
      </motion.div>
    </header>
  )
}
