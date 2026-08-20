import { motion, useReducedMotion } from 'framer-motion'
import { FileText, HeartPulse, MessagesSquare, Network, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { motionEase, motionEaseSoft } from '../../utils/motion'

export type HeroVariant = 'why' | 'product' | 'impact' | 'security' | 'partners' | 'about' | 'contact'

const icons = {
  why: Sparkles,
  product: FileText,
  impact: HeartPulse,
  security: ShieldCheck,
  partners: Network,
  about: UsersRound,
  contact: MessagesSquare,
}

const nodePositions = [
  { left: '12%', top: '22%' },
  { left: '75%', top: '17%' },
  { left: '82%', top: '68%' },
  { left: '18%', top: '76%' },
]

export function HeroMotif({ variant }: { variant: HeroVariant }) {
  const reduced = useReducedMotion()
  const Icon = icons[variant]
  const enter = reduced ? false : { opacity: 0, scale: .94, y: 18 }

  return (
    <motion.div className={`hero-motif hero-motif-${variant}`} aria-hidden="true" initial={enter} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .52, ease: motionEaseSoft }}>
      <div className="hero-motif-grid" />
      <div className="hero-motif-orbit hero-motif-orbit-outer" />
      <div className="hero-motif-orbit hero-motif-orbit-inner" />
      <svg className="hero-motif-paths" viewBox="0 0 520 420">
        <motion.path d="M76 106 C168 34 350 43 438 103" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: .78, ease: motionEase }} />
        <motion.path d="M438 103 C488 189 471 305 421 337" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .9, delay: 1.02, ease: motionEase }} />
        <motion.path d="M421 337 C317 393 166 382 91 337" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.18, ease: motionEase }} />
        <motion.path d="M91 337 C36 258 39 169 76 106" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .9, delay: 1.36, ease: motionEase }} />
      </svg>
      {nodePositions.map((position, index) => <motion.span key={index} className={`hero-motif-node hero-motif-node-${index + 1}`} style={position} initial={reduced ? false : { opacity: 0, scale: .4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, delay: .85 + index * .12, ease: motionEase }} />)}
      <motion.div className="hero-motif-core" animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="hero-motif-core-ring" /><Icon />
      </motion.div>
      <div className="hero-motif-detail hero-motif-detail-a"><i /><i /><i /></div>
      <div className="hero-motif-detail hero-motif-detail-b"><i /><i /><i /><i /></div>
    </motion.div>
  )
}
