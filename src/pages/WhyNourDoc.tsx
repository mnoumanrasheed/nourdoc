import { ArrowRight, Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import localImage from '../assets/pakistani-consultation.jpg'
import heroImage from '../assets/02-why-nourdoc-local-clinician-web.jpg'
import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { WorkflowJourney } from '../components/sections/WorkflowJourney'
import { workflow } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const comparison = [
  ['Speed', 'Separate documentation step', 'Conversation-to-draft workflow'],
  ['Accuracy', 'Depends on recall and manual capture', 'Structured draft with clinician review'],
  ['Documentation burden', 'Typing or separate dictation', 'Reduced typing'],
  ['Patient experience', 'Attention can shift toward documentation', 'More attention available for the encounter'],
  ['Coding readiness', 'Varies with note consistency', 'Consistent, structured documentation'],
  ['Revenue workflow', 'Documentation may remain fragmented', 'Supports a more structured workflow'],
  ['Compliance', 'Process-dependent controls', 'Consent, review and privacy in the workflow'],
]

export default function WhyNourDoc() {
  usePageMeta('Why NourDoc', 'See how NourDoc simplifies the journey from clinical conversation to structured, clinician-reviewed documentation.')
  return <>
    <PageHero variant="why" image={heroImage} imageAlt="Clinician speaking with a patient in a professional healthcare environment" imagePosition="62% center" eyebrow="Why NourDoc" title="Traditional documentation was never built for the volume clinicians face today." text="Manual note-taking, dictation and human scribing solve different parts of the documentation workflow. NourDoc uses ambient AI to simplify the journey from clinical conversation to structured documentation." />
    <section className="section container problem-grid"><AnimatedSection><span className="eyebrow">The documentation gap</span><h2>Care happens in conversation. Records still demand a separate workflow.</h2></AnimatedSection><AnimatedSection className="large-copy"><p>When documentation competes with the patient encounter, clinicians must divide their attention or finish the work later. NourDoc is designed around a simpler idea: let the natural conversation become the starting point.</p></AnimatedSection></section>
    <section className="section section-soft"><div className="container"><AnimatedSection><SectionHeader eyebrow="A different workflow" title="From fragmented tasks to one clinician-controlled journey." /></AnimatedSection><WorkflowJourney steps={workflow} /></div></section>
    <section className="section container"><AnimatedSection><SectionHeader eyebrow="A practical comparison" title="Less process around the process." text="These are workflow comparisons, not unsupported performance claims." /></AnimatedSection><AnimatedSection className="comparison-table" >
      <div className="comparison-head"><span>Dimension</span><span>Traditional workflow</span><span>NourDoc approach</span></div>
      {comparison.map(([dimension, traditional, nourdoc]) => <div className="comparison-row" key={dimension}><strong>{dimension}</strong><span><small className="comparison-mobile-label">Traditional workflow</small><Minus />{traditional}</span><span><small className="comparison-mobile-label">NourDoc approach</small><Check />{nourdoc}</span></div>)}
    </AnimatedSection></section>
    <ImageStory image={localImage} objectPosition="68% center" alt="Pakistani clinician giving full attention to a patient" eyebrow="Clinician control" title="AI drafts. Clinicians decide." text="NourDoc keeps the clinician responsible for reviewing, editing and approving the final record. The technology supports clinical work without replacing professional judgment." points={['Review before saving', 'Edit generated documentation', 'Approve the final record']} />
    <section className="section container statement-band"><AnimatedSection><p>Clinical intelligence should feel less like another system to manage—and more like documentation quietly keeping pace.</p><Link to="/product" className="text-link">See the product workflow<ArrowRight /></Link></AnimatedSection></section>
    <CTASection title="See the difference in your own workflow." label="Book a Demo" />
  </>
}
