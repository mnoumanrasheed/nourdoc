import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../components/common/CTASection'
import { ResponsivePicture } from '../components/common/ResponsivePicture'
import { SectionHeader } from '../components/common/SectionHeader'
import { CinematicStory } from '../components/sections/CinematicStory'
import { ImageStory } from '../components/sections/ImageStory'
import { WorkflowJourney } from '../components/sections/WorkflowJourney'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { partnerCategories, securityTopics, workflow } from '../data/site'
import {
  globalHealthcareReadinessImage,
  moreTimeForCareImage,
} from '../data/responsiveImages'
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
  const reducedMotion = useReducedMotion()

  usePageMeta(
    'Ambient Clinical Intelligence',
    'NourDoc turns natural doctor-patient conversations into structured clinical documentation for clinician review.',
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

      <section className="section security-preview global-readiness-section">
        <div className="container global-readiness-layout">
          <AnimatedSection className="global-readiness-copy" variant="left">
            <span className="eyebrow eyebrow-light">Trust at the foundation. Global readiness.</span>
            <h2>Healthcare trust, from local relevance to global readiness.</h2>
            <p>
              NourDoc brings Pakistani healthcare relevance together with the
              privacy, confidentiality and access-control priorities considered
              by U.S., U.K. and international organizations.
            </p>
            <div className="differentiator-list" style={{ marginTop: '24px' }}>
              {securityTopics.slice(0, 3).map(({ title, icon: Icon }) => (
                <div key={title}>
                  <Icon />
                  {title}
                </div>
              ))}
            </div>
            <Link className="text-link light-link" to="/security-compliance">
              Explore Security
              <ArrowRight />
            </Link>
          </AnimatedSection>

          <motion.div
            className="global-readiness-visual"
            initial={reducedMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="global-readiness-frame"
              initial={false}
              whileInView={reducedMotion ? undefined : { y: [0, -3, 0] }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
            >
              <ResponsivePicture
                asset={globalHealthcareReadinessImage}
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1200px) 46vw, 620px"
                pictureClassName="global-readiness-picture"
                alt="Healthcare professional using a connected clinical workflow in a modern care setting"
                loading="lazy"
                fetchPriority="auto"
                decoding="async"
                style={{ objectPosition: '55% center' }}
              />
              <span className="global-readiness-badge">Global-ready care</span>
              <span className="global-readiness-sheen" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
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
