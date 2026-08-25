import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ResponsiveImageAsset } from '../../data/responsiveImages'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motionDurations, motionEase } from '../../utils/motion'
import { ResponsivePicture } from '../common/ResponsivePicture'
import { AnimatedSection } from '../ui/AnimatedSection'

export function ImageStory({ image, alt, eyebrow, title, text, points, reverse = false, objectPosition = 'center' }: { image: ResponsiveImageAsset; alt: string; eyebrow: string; title: string; text: string; points?: string[]; reverse?: boolean; objectPosition?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 760px)')
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-16, 16])
  const still = reduced || compact

  return (
    <section ref={sectionRef} className="section container">
      <div className={`image-story ${reverse ? 'image-story-reverse' : ''}`}>
        <motion.div className="image-story-media" initial={reduced ? false : { opacity: 0.55, clipPath: 'inset(0 0 100% 0 round 30px)' }} whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 30px)' }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: motionDurations.slow * 1.1, ease: motionEase }}>
          <ResponsivePicture asset={image} sizes="(max-width: 760px) calc(100vw - 32px), 50vw" pictureClassName="image-story-picture" alt={alt} loading="lazy" fetchPriority="auto" decoding="async" style={{ objectPosition, y: still ? 0 : imageY }} initial={reduced ? false : { scale: 1.04 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.15 }} whileHover={still ? undefined : { scale: 1.025 }} transition={{ duration: motionDurations.slow, ease: motionEase }} />
          <span className="image-story-sheen" aria-hidden="true" />
        </motion.div>
        <AnimatedSection className="image-story-copy" variant={reverse ? 'left' : 'right'}>
          <span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p>
          {points && <ul className="check-list">{points.map(point => <li key={point}>{point}</li>)}</ul>}
        </AnimatedSection>
      </div>
    </section>
  )
}
