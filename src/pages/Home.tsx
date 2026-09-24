import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../components/common/CTASection'
import { SectionHeader } from '../components/common/SectionHeader'
import { CinematicStory } from '../components/sections/CinematicStory'
import { ImageStory } from '../components/sections/ImageStory'
import { WorkflowJourney } from '../components/sections/WorkflowJourney'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { partnerCategories, workflow } from '../data/site'
import { moreTimeForCareImage } from '../data/responsiveImages'
import { usePageMeta } from '../hooks/usePageMeta'

const whyNourDocHighlights = [
  'Built for clinical conversations',
  'Structured clinical documentation',
  'Clinician-controlled review',
]

const homePartnerCategories = [
  partnerCategories[0],
  partnerCategories[1],
  partnerCategories[10],
]

export default function Home() {
  usePageMeta(
    'NourDoc — AI-assisted Clinical Documentation & Intelligence Tool',
    'Meet the AI that listens, understands, and turns doctor–patient conversations into structured clinical notes.',
  )

  return (
    <>
      <CinematicStory />

      <section className="section workflow-section home-workflow-section">
        <div className="container home-workflow-inner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Product preview"
              title="From clinical conversation to clinician-reviewed documentation."
              text="A focused ambient workflow that helps clinicians listen, understand, draft and review."
            />
          </AnimatedSection>
          <WorkflowJourney steps={workflow} premium />
          <AnimatedSection>
            <Link className="text-link" style={{ marginTop: '32px' }} to="/product">
              Explore the Product
              <ArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <ImageStory
        editorial
        image={moreTimeForCareImage}
        objectPosition="50% center"
        alt="Physician checking a patient's blood pressure during an attentive consultation"
        eyebrow="Healthcare impact"
        title="More time for care. Less time looking at screens."
        text="NourDoc is designed to reduce documentation friction so clinicians can keep more attention on the patient encounter."
        points={[
          'Less documentation burden',
          'More patient attention',
          'A simpler path to reviewed notes',
        ]}
      />

      <section className="section container split-heading">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Why NourDoc"
            title="Built for clinical work, not just transcription."
            text="Purpose-built around the conversation, documentation structure and clinical oversight that care teams need."
          />
        </AnimatedSection>
        <AnimatedSection>
          <div className="differentiator-list">
            {whyNourDocHighlights.map((highlight) => (
              <div key={highlight}>
                <CheckCircle2 />
                {highlight}
              </div>
            ))}
          </div>
          <Link className="text-link" style={{ marginTop: '28px' }} to="/why-nourdoc">
            Why NourDoc
            <ArrowRight />
          </Link>
        </AnimatedSection>
      </section>

      <section className="section home-ecosystem-section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Healthcare ecosystem"
              title="A focused preview of the organizations NourDoc is built to work alongside."
              text="From care delivery to enabling technology, partnership keeps clinical workflows connected."
            />
          </AnimatedSection>
          <div className="partner-strip home-partner-strip">
            {homePartnerCategories.map(({ title, icon: Icon }, index) => (
              <AnimatedSection key={title} variant="card" interactive index={index}>
                <span className="home-partner-index">0{index + 1}</span>
                <span className="home-partner-icon">
                  <Icon />
                </span>
                <strong>{title}</strong>
                <span className="home-partner-network" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </AnimatedSection>
            ))}
          </div>
          <Link to="/partners" className="text-link home-ecosystem-link">
            Explore Partnerships
            <ArrowRight />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  )
}
