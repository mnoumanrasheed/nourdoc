import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../ui/AnimatedSection'

export function CTASection({ title = 'Give your physicians their time back.', text = 'See how NourDoc can fit into your clinical documentation workflow.', label = 'Book a Demo' }: { title?: string; text?: string; label?: string }) {
  return (
    <section className="section container">
      <AnimatedSection className="cta-panel" variant="scale">
        <span className="cta-ambient cta-ambient-one" aria-hidden="true" />
        <span className="cta-ambient cta-ambient-two" aria-hidden="true" />
        <div><span className="eyebrow eyebrow-light">Ready when you are</span><h2>{title}</h2><p>{text}</p></div>
        <Link to="/contact" className="button button-light">{label}<ArrowRight size={18} /></Link>
      </AnimatedSection>
    </section>
  )
}
