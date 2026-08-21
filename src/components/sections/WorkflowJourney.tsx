import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardCheck, FileText, Mic2, Sparkles } from 'lucide-react'
import { motionDurations, motionEase, staggerContainer, staggerItem } from '../../utils/motion'

type WorkflowStep = { n: string; title: string; text: string }

const premiumDetails = [
  { label: 'Consented capture', icon: Mic2 },
  { label: 'Clinical context', icon: Sparkles },
  { label: 'Structured documentation', icon: FileText },
  { label: 'Clinician control', icon: ClipboardCheck },
]

export function WorkflowJourney({ steps, premium = false }: { steps: WorkflowStep[]; premium?: boolean }) {
  const reduced = useReducedMotion()

  return (
    <motion.div className={`workflow-line${premium ? ' workflow-line-premium' : ''}`} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.24 }} variants={staggerContainer}>
      <motion.div aria-hidden="true" className="workflow-progress workflow-progress-horizontal" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: motionDurations.slow * 1.45, ease: motionEase, delay: 0.12 }} />
      <motion.div aria-hidden="true" className="workflow-progress workflow-progress-vertical" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: motionDurations.slow * 1.45, ease: motionEase, delay: 0.12 }} />
      {premium && <span className="workflow-data-packet" aria-hidden="true" />}
      {steps.map((step, index) => {
        const detail = premiumDetails[index]
        const Icon = detail?.icon
        return (
          <motion.article className="workflow-step" key={step.n} variants={staggerItem}>
            <motion.span className="workflow-dot" aria-hidden="true" initial={reduced ? false : { scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: motionDurations.base, ease: motionEase, delay: index * 0.11 }}>
              {premium && step.n}
            </motion.span>
            {!premium && <span className="workflow-number">{step.n}</span>}
            {premium && Icon && <span className="workflow-step-icon"><Icon /></span>}
            <div>
              {premium && <small>{detail.label}</small>}
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}
