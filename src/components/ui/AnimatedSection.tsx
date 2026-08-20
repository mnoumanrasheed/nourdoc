import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cardHover, motionDurations, motionEase, revealVariants } from '../../utils/motion'

type RevealVariant = keyof typeof revealVariants

export function AnimatedSection({ children, className = '', variant = 'section', index = 0, delay = 0, interactive = false, amount = 0.14 }: { children: ReactNode; className?: string; variant?: RevealVariant; index?: number; delay?: number; interactive?: boolean; amount?: number }) {
  const reduced = useReducedMotion()
  const staggerDelay = Math.min(index * 0.065, 0.32) + delay
  return (
    <motion.div
      className={`${className}${interactive ? ' motion-interactive' : ''}`}
      data-motion={variant}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      whileHover={!reduced && interactive ? cardHover : undefined}
      viewport={{ once: true, amount }}
      variants={revealVariants[variant]}
      transition={{ duration: variant === 'section' ? motionDurations.slow : motionDurations.base, ease: motionEase, delay: staggerDelay }}
    >
      {children}
    </motion.div>
  )
}
