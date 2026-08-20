import { motion, useReducedMotion } from 'framer-motion'
import { Check, FileText, MessageCircleMore, Sparkles } from 'lucide-react'
import { motionEase, motionEaseSoft } from '../../utils/motion'

const bars = [18, 34, 54, 28, 66, 40, 78, 46, 62, 30, 56, 72, 36, 22]

export function HeroIntelligence() {
  const reduced = useReducedMotion()
  return (
    <motion.div className="intelligence-visual" aria-label="Abstract illustration showing conversation becoming structured documentation" initial={reduced ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .16, ease: motionEaseSoft }}>
      <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
      <div className="clinical-particles" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <motion.i key={index} animate={reduced ? undefined : { y: [0, index % 2 ? 8 : -8, 0], opacity: [.35, .85, .35] }} transition={{ duration: 4.8 + index * .35, repeat: Infinity, ease: 'easeInOut', delay: index * .18 }} />)}</div>
      <motion.div className="concept-card conversation-card" initial={reduced ? false : { opacity: 0, x: -26, rotate: -4 }} animate={reduced ? { opacity: 1, x: 0, rotate: -2 } : { opacity: 1, x: 0, rotate: -2, y: [0, -6, 0] }} transition={reduced ? { duration: .55 } : { opacity: { delay: .42, duration: .65, ease: motionEase }, x: { delay: .42, duration: .65, ease: motionEase }, rotate: { delay: .42, duration: .65, ease: motionEase }, y: { delay: 1.3, duration: 6.4, repeat: Infinity, ease: 'easeInOut' } }}>
        <div className="concept-label"><MessageCircleMore size={15} /> Conversation</div>
        <div className="waveform" aria-hidden="true">{bars.map((height, i) => <motion.span key={i} style={{ height }} animate={reduced ? undefined : { scaleY: [0.55, 1, 0.7] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * .07 }} />)}</div>
        <span className="consent-dot"><i /> Consented capture</span>
      </motion.div>
      <div className="transform-core-motion"><motion.div className="transform-core" initial={reduced ? false : { opacity: 0, scale: .75 }} animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1, 1.035, 1] }} transition={reduced ? { duration: .5 } : { opacity: { delay: .65, duration: .5 }, scale: { delay: .85, duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }}><Sparkles size={22} /><span>Clinical<br />intelligence</span></motion.div></div>
      <motion.div className="concept-card document-card" initial={reduced ? false : { opacity: 0, x: 26, rotate: 4 }} animate={reduced ? { opacity: 1, x: 0, rotate: 2 } : { opacity: 1, x: 0, rotate: 2, y: [0, 6, 0] }} transition={reduced ? { duration: .55 } : { opacity: { delay: .62, duration: .68, ease: motionEase }, x: { delay: .62, duration: .68, ease: motionEase }, rotate: { delay: .62, duration: .68, ease: motionEase }, y: { delay: 1.5, duration: 7.2, repeat: Infinity, ease: 'easeInOut' } }}>
        <div className="concept-label"><FileText size={15} /> Structured documentation</div>
        <div className="document-lines">{[0, 1, 2, 3].map(i => <motion.span key={i} initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .55, delay: .95 + i * .1, ease: motionEase }} />)}</div>
        <div className="soap-tags">{['S', 'O', 'A', 'P'].map((tag, i) => <motion.span key={tag} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.16 + i * .07, duration: .4 }}>{tag}</motion.span>)}</div>
        <motion.span className="review-chip" initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.44 }}><Check size={13} /> Clinician review</motion.span>
      </motion.div>
      <svg className="flow-line" viewBox="0 0 640 300" aria-hidden="true"><motion.path d="M188 142 C245 40 388 42 449 139" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: .72, ease: motionEase }} /><motion.path className="flow-line-pulse" d="M188 142 C245 40 388 42 449 139" initial={{ pathLength: 0 }} animate={reduced ? { pathLength: 0 } : { pathLength: [0, .24, 0], pathOffset: [0, .76, 1] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1.8, ease: 'linear' }} /></svg>
    </motion.div>
  )
}
