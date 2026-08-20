import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motionDurations, motionEase, motionEaseSoft } from '../../utils/motion'
import type { HeroVariant } from '../sections/HeroMotif'

function HeroSignal({ variant, reduced }: { variant: HeroVariant; reduced: boolean | null }) {
  return (
    <motion.div className={`page-hero-signal page-hero-signal-${variant}`} aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .72, ease: motionEaseSoft }}>
      <svg viewBox="0 0 520 360" preserveAspectRatio="none">
        <path d="M-30 286 C112 252 134 91 271 134 S407 268 552 64" />
        <path d="M-18 116 C118 48 207 188 320 116 S445 74 548 214" />
        <path d="M72 388 C126 246 262 272 334 187 S430 142 500 -24" />
      </svg>
      {Array.from({ length: 5 }, (_, index) => <i key={index} />)}
      <span />
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

  return (
    <header ref={heroRef} className={`page-hero page-hero-theme page-hero-${variant}-theme section-grid-bg ${image ? 'page-hero-has-image' : ''}`}>
      {image && <motion.div className={`hero-media hero-media-${variant}`} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .04, ease: motionEaseSoft }}>
        <motion.img src={image} alt={imageAlt ?? ''} fetchPriority="high" style={{ objectPosition: imagePosition, x: still ? 0 : mediaX, y: still ? 0 : mediaY, rotateX: still ? 0 : mediaRotateX, rotateY: still ? 0 : mediaRotateY }} initial={reduced ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.5, delay: .04, ease: motionEaseSoft }} />
        <span className="hero-media-overlay" aria-hidden="true" />
        <HeroSignal variant={variant} reduced={reduced} />
      </motion.div>}
      <div className="hero-depth-particles" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
      </div>
      <motion.div className="page-hero-ambient" aria-hidden="true" initial={reduced ? false : { opacity: 0, scale: .98 }} animate={reduced ? undefined : { opacity: 1, scale: 1, x: [0, 18, 0], y: [0, -10, 0] }} transition={{ opacity: { duration: .8, delay: .16 }, scale: { duration: 1, delay: .16, ease: motionEaseSoft }, x: { duration: 12, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }} />
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
