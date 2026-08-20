import { motion, useReducedMotion } from 'framer-motion'
import { motionDurations, motionEase, staggerContainer, staggerItem } from '../../utils/motion'

type WorkflowStep = { n: string; title: string; text: string }

export function WorkflowJourney({ steps }: { steps: WorkflowStep[] }) {
  const reduced = useReducedMotion()

  return (
    <motion.div className="workflow-line" initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.24 }} variants={staggerContainer}>
      <motion.div aria-hidden="true" className="workflow-progress workflow-progress-horizontal" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: motionDurations.slow * 1.45, ease: motionEase, delay: 0.12 }} />
      <motion.div aria-hidden="true" className="workflow-progress workflow-progress-vertical" initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: motionDurations.slow * 1.45, ease: motionEase, delay: 0.12 }} />
      {steps.map((step, index) => (
        <motion.article className="workflow-step" key={step.n} variants={staggerItem}>
          <motion.span className="workflow-dot" aria-hidden="true" initial={reduced ? false : { scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: motionDurations.base, ease: motionEase, delay: index * 0.11 }} />
          <span className="workflow-number">{step.n}</span>
          <div><h3>{step.title}</h3><p>{step.text}</p></div>
        </motion.article>
      ))}
    </motion.div>
  )
}
