import type { Transition, Variants } from 'framer-motion'

export const motionEase = [0.22, 1, 0.36, 1] as const
export const motionEaseSoft = [0.16, 1, 0.3, 1] as const

export const motionDurations = {
  fast: 0.24,
  base: 0.56,
  slow: 0.82,
} as const

export const revealVariants: Record<'section' | 'card' | 'fade' | 'scale' | 'left' | 'right', Variants> = {
  section: {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  card: {
    hidden: { opacity: 0, y: 22, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.965 },
    visible: { opacity: 1, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: motionDurations.base, ease: motionEase } },
}

export const revealTransition: Transition = {
  duration: motionDurations.base,
  ease: motionEase,
}

export const cardHover = {
  y: -6,
  scale: 1.006,
  transition: { duration: motionDurations.fast, ease: motionEase },
}
