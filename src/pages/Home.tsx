import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import localImage from '../assets/01-home-clinical-conversation.jpg'
import globalImage from '../assets/international-consultation.jpg'
import { CTASection } from '../components/common/CTASection'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { CinematicStory } from '../components/sections/CinematicStory'
import { WorkflowJourney } from '../components/sections/WorkflowJourney'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { capabilities, impactAreas, partnerCategories, securityTopics, workflow } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta('Ambient Clinical Intelligence', 'NourDoc turns natural doctor-patient conversations into structured clinical documentation for clinician review.')
  return (
    <>
      <CinematicStory />

      <section className="section container">
        <AnimatedSection><SectionHeader eyebrow="The platform" title="Everything needed to turn conversation into a complete clinical record." text="NourDoc brings ambient capture, clinical intelligence, review and structured documentation into a clinician-controlled workflow." /></AnimatedSection>
        <div className="feature-grid">{capabilities.map(({ title, text, icon: Icon }, index) => <AnimatedSection key={title} variant="card" interactive index={index} className={`feature-card capability-card capability-card-${index + 1} ${index === 0 ? 'feature-card-accent' : ''}`}><Icon /><span className="card-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p><span className="card-detail-indicator" aria-hidden="true" /></AnimatedSection>)}</div>
      </section>

      <section className="section workflow-section">
        <div className="container"><AnimatedSection><SectionHeader eyebrow="A clear clinical workflow" title="From visit to signed note in four clear steps." /></AnimatedSection>
          <WorkflowJourney steps={workflow} />
        </div>
      </section>

      <ImageStory priority image={localImage} objectPosition="48% center" alt="Physician speaking with a patient in a clinical consultation room" eyebrow="Healthcare impact" title="More time for care. Less time looking at screens." text="Documentation should support the clinical encounter rather than interrupt it. NourDoc is designed to reduce paperwork and allow clinicians to remain more focused on patients." points={['Less documentation burden', 'More patient attention', 'Clinician-controlled review']} />

      <section className="section section-soft"><div className="container"><AnimatedSection><SectionHeader eyebrow="Outcomes, not exaggeration" title="Designed to support the whole healthcare encounter." text="NourDoc focuses on practical improvements across the areas healthcare organizations care about—without relying on unverified headline statistics." /></AnimatedSection><div className="impact-grid">{impactAreas.map(({ title, text, icon: Icon }, index) => <AnimatedSection className="impact-card" key={title} variant="card" interactive index={index}><Icon /><h3>{title}</h3><p>{text}</p></AnimatedSection>)}</div></div></section>

      <section className="section container split-heading"><AnimatedSection><SectionHeader eyebrow="Why NourDoc" title="Built for clinical work, not just transcription." /></AnimatedSection><AnimatedSection className="differentiator-list">{['Natural clinical conversation', 'Structured SOAP documentation', 'Clinician-controlled review', 'Medical terminology support', 'Speaker separation', 'Security and privacy focus', 'Integration-oriented architecture'].map(x => <div key={x}><CheckCircle2 />{x}</div>)}</AnimatedSection></section>

      <section className="section security-preview"><div className="container"><AnimatedSection><SectionHeader eyebrow="Trust at the foundation" title="Privacy and security designed for healthcare expectations." text="NourDoc is positioned for local and international healthcare environments with clear, carefully worded privacy and regulatory-readiness principles." /></AnimatedSection><div className="security-grid">{securityTopics.map(({ title, text, icon: Icon }, index) => <AnimatedSection className="security-card" key={title} variant="card" interactive index={index}><Icon /><h3>{title}</h3><p>{text}</p></AnimatedSection>)}</div><Link className="text-link light-link" to="/security-compliance">Explore security & compliance<ArrowRight /></Link></div></section>

      <ImageStory reverse image={globalImage} objectPosition="38% center" alt="International physician in attentive conversation with a patient" eyebrow="Local relevance. Global readiness." title="Built around the expectations of modern healthcare." text="NourDoc brings Pakistani healthcare relevance together with the privacy, confidentiality and access-control priorities considered by U.S., U.K. and international organizations." />

      <section className="section container"><AnimatedSection><SectionHeader eyebrow="Healthcare ecosystem" title="Designed to work alongside the organizations that deliver care." text="We present partner categories—not invented customer logos—because meaningful healthcare transformation is built through real collaboration." /></AnimatedSection><div className="partner-strip">{partnerCategories.slice(0, 6).map(({ title, icon: Icon }) => <div key={title}><Icon /><span>{title}</span></div>)}</div><Link to="/partners" className="text-link">Explore partnerships<ArrowRight /></Link></section>
      <CTASection />
    </>
  )
}
