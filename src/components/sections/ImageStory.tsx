import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useRef, useState, type SyntheticEvent } from 'react'
import type { ResponsiveImageAsset } from '../../data/responsiveImages'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { motionDurations, motionEase } from '../../utils/motion'
import { ResponsivePicture } from '../common/ResponsivePicture'
import { AnimatedSection } from '../ui/AnimatedSection'

type ImageStoryProps = {
  image: ResponsiveImageAsset
  alt: string
  eyebrow: string
  title: string
  text: string
  points?: string[]
  reverse?: boolean
  objectPosition?: string
  editorial?: boolean
}

export function ImageStory({
  image,
  alt,
  eyebrow,
  title,
  text,
  points,
  reverse = false,
  objectPosition = 'center',
  editorial = false,
}: ImageStoryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 760px)')
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-16, 16])
  const still = reduced || compact || editorial
  const [imageError, setImageError] = useState(false)

  const handleImageError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    console.error('ImageStory: Failed to load image', { image, error: event.currentTarget.src })
    setImageError(true)
  }, [image])

  const picture = imageError ? (
    <div className="image-story-picture image-story-error" role="img" aria-label={alt}>
      Image temporarily unavailable
    </div>
  ) : (
    <ResponsivePicture
      asset={image}
      sizes="(max-width: 760px) calc(100vw - 32px), 50vw"
      pictureClassName="image-story-picture"
      alt={alt}
      loading="lazy"
      fetchPriority="auto"
      decoding="async"
      style={{ objectPosition, y: still ? 0 : imageY }}
      initial={reduced ? false : { scale: 1.04 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={still ? undefined : { scale: 1.025 }}
      transition={{ duration: motionDurations.slow, ease: motionEase }}
      onError={handleImageError}
    />
  )

  return (
    <section ref={sectionRef} className="section container">
      <div className={`image-story ${editorial ? 'image-story-editorial' : ''} ${reverse ? 'image-story-reverse' : ''}`}>
        <motion.div
          className={`image-story-media ${editorial ? 'section-editorial-visual-entrance' : ''}`}
          initial={reduced ? false : editorial ? { opacity: 0, x: -28, scale: 0.97 } : { opacity: 0.55, clipPath: 'inset(0 0 100% 0 round 30px)' }}
          whileInView={editorial ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0 round 30px)' }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: editorial ? motionDurations.slow : motionDurations.slow * 1.1, ease: motionEase }}
        >
          {editorial ? (
            <motion.div
              className="section-editorial-visual"
              initial={false}
              whileInView={reduced ? undefined : { y: [0, -4, 0] }}
              viewport={{ once: false, amount: 0.18 }}
              transition={{ duration: 8.2, ease: 'easeInOut', repeat: Infinity, delay: 0.9 }}
            >
              {picture}
              <span className="image-story-sheen" aria-hidden="true" />
            </motion.div>
          ) : (
            <>
              {picture}
              <span className="image-story-sheen" aria-hidden="true" />
            </>
          )}
        </motion.div>
        <AnimatedSection className="image-story-copy" variant={reverse ? 'left' : 'right'}>
          <span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p>
          {points && <ul className="check-list">{points.map(point => <li key={point}>{point}</li>)}</ul>}
        </AnimatedSection>
      </div>
    </section>
  )
}
