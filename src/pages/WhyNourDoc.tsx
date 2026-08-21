import { useEffect, useRef } from 'react'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

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
import { createAnimationVisibilityController } from '../utils/animationPerformance'

const comparison = [
  ['Speed', 'Separate documentation step', 'Conversation-to-draft workflow'],
  [
    'Accuracy',
    'Depends on recall and manual capture',
    'Structured draft with clinician review',
  ],
  ['Documentation burden', 'Typing or separate dictation', 'Reduced typing'],
  [
    'Patient experience',
    'Attention can shift toward documentation',
    'More attention available for the encounter',
  ],
  [
    'Coding readiness',
    'Varies with note consistency',
    'Consistent, structured documentation',
  ],
  [
    'Revenue workflow',
    'Documentation may remain fragmented',
    'Supports a more structured workflow',
  ],
  [
    'Compliance',
    'Process-dependent controls',
    'Consent, review and privacy in the workflow',
  ],
]

export default function WhyNourDoc() {
  const heroWrapRef = useRef<HTMLDivElement>(null)
  const outerOrbitRef = useRef<HTMLDivElement>(null)
  const middleOrbitRef = useRef<HTMLDivElement>(null)
  const innerOrbitRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Why NourDoc',
    'See how NourDoc simplifies the journey from clinical conversation to structured, clinician-reviewed documentation.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very subtle overall hero movement
      gsap.to('.why-hero-motion', {
        y: -3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Outer orbit clockwise
      gsap.to(outerOrbitRef.current, {
        rotation: 360,
        duration: 19,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Middle orbit counter-clockwise
      gsap.to(middleOrbitRef.current, {
        rotation: -360,
        duration: 14,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Inner orbit faster
      gsap.to(innerOrbitRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Bright orbit nodes
      gsap.to('.why-orbit-node', {
        scale: 2,
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Center breathing effect
      gsap.to('.why-orbit-core', {
        scale: 1.6,
        opacity: 1,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Radar pulse 1
      gsap.fromTo(
        '.why-radar-pulse-one',
        {
          scale: 0.45,
          opacity: 0.85,
        },
        {
          scale: 1.85,
          opacity: 0,
          duration: 2.5,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      // Radar pulse 2
      gsap.fromTo(
        '.why-radar-pulse-two',
        {
          scale: 0.45,
          opacity: 0.7,
        },
        {
          scale: 2.1,
          opacity: 0,
          duration: 2.5,
          delay: 1.2,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      // Continuous scanner
      gsap.fromTo(
        '.why-scan-beam',
        {
          rotation: 0,
        },
        {
          rotation: 360,
          duration: 5,
          repeat: -1,
          ease: 'none',
          transformOrigin: '0% 100%',
        },
      )

      // Travelling particles
      gsap.fromTo(
        '.why-data-particle-one',
        {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: -185,
          y: -115,
          opacity: 1,
          scale: 1.6,
          duration: 3.7,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.why-data-particle-two',
        {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: 165,
          y: -125,
          opacity: 1,
          scale: 1.5,
          duration: 4.3,
          delay: 0.65,
          repeat: -1,
          repeatDelay: 0.3,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.why-data-particle-three',
        {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: -130,
          y: 110,
          opacity: 1,
          scale: 1.4,
          duration: 4.8,
          delay: 1.1,
          repeat: -1,
          repeatDelay: 0.25,
          ease: 'power1.inOut',
        },
      )
    }, heroWrapRef)

    const stopVisibilityControl = createAnimationVisibilityController(heroWrapRef.current!)
    return () => { stopVisibilityControl(); ctx.revert() }
  }, [])

  return (
    <>
      {/* HERO */}
      <div
        ref={heroWrapRef}
        className="why-hero-motion"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="why"
          image={heroImage}
          imageAlt="Clinician speaking with a patient in a professional healthcare environment"
          imagePosition="62% center"
          eyebrow="Why NourDoc"
          title="Traditional documentation was never built for the volume clinicians face today."
          text="Manual note-taking, dictation and human scribing solve different parts of the documentation workflow. NourDoc uses ambient AI to simplify the journey from clinical conversation to structured documentation."
        />

        {/* CLINICAL AI RADAR */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '2.5%',
            bottom: '4%',
            width: '350px',
            height: '350px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {/* Dark contrast halo — important for white/light image background */}
          <div
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(4,25,32,.74) 0%, rgba(5,38,47,.55) 34%, rgba(8,46,55,.23) 58%, transparent 78%)',
              boxShadow:
                '0 0 65px rgba(0,20,27,.42), inset 0 0 50px rgba(39,169,185,.1)',
            }}
          />

          {/* Secondary cyan atmospheric glow */}
          <div
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(58,216,226,.2) 0%, rgba(47,178,192,.09) 36%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          {/* RADAR PULSE 1 */}
          <div
            className="why-radar-pulse-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1.5px solid rgba(176,251,253,.92)',
              boxShadow: '0 0 26px rgba(75,225,234,.42)',
            }}
          />

          {/* RADAR PULSE 2 */}
          <div
            className="why-radar-pulse-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1.5px solid rgba(93,228,237,.72)',
            }}
          />

          {/* OUTER ORBIT */}
          <div
            ref={outerOrbitRef}
            style={{
              position: 'absolute',
              inset: '2%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(134,246,250,.82)',
              boxShadow:
                '0 0 25px rgba(64,213,225,.32), inset 0 0 32px rgba(43,178,194,.08)',
            }}
          >
            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                left: '48%',
                top: '-5px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#E1FEFF',
                opacity: 0.8,
                boxShadow:
                  '0 0 8px #E1FEFF, 0 0 20px rgba(79,229,236,.98), 0 0 36px rgba(25,180,198,.85)',
              }}
            />

            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                right: '4%',
                top: '24%',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#91F1F5',
                opacity: 0.8,
                boxShadow:
                  '0 0 8px #91F1F5, 0 0 20px rgba(72,218,229,.98)',
              }}
            />

            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                left: '8%',
                bottom: '18%',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#54D7E1',
                opacity: 0.85,
                boxShadow:
                  '0 0 8px #54D7E1, 0 0 20px rgba(37,190,204,.98)',
              }}
            />
          </div>

          {/* MIDDLE ORBIT */}
          <div
            ref={middleOrbitRef}
            style={{
              position: 'absolute',
              inset: '18%',
              borderRadius: '50%',
              border: '1.5px solid rgba(117,237,242,.72)',
              boxShadow: '0 0 18px rgba(62,213,224,.16)',
            }}
          >
            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                right: '-6px',
                top: '48%',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: '#F4FFFF',
                opacity: 0.95,
                boxShadow:
                  '0 0 10px #F4FFFF, 0 0 25px rgba(74,228,236,1)',
              }}
            />

            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                left: '17%',
                top: '4%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#6FE5EB',
                opacity: 0.85,
                boxShadow:
                  '0 0 8px #6FE5EB, 0 0 19px rgba(48,199,211,.95)',
              }}
            />
          </div>

          {/* INNER ORBIT */}
          <div
            ref={innerOrbitRef}
            style={{
              position: 'absolute',
              inset: '33%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(186,251,253,.86)',
            }}
          >
            <span
              className="why-orbit-node"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '-5px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#F5FFFF',
                opacity: 0.95,
                boxShadow:
                  '0 0 9px #F5FFFF, 0 0 22px rgba(85,229,237,.98)',
              }}
            />
          </div>

          {/* SCANNING BEAM */}
          <div
            className="why-scan-beam"
            style={{
              position: 'absolute',
              left: '50%',
              top: '9%',
              width: '2px',
              height: '41%',
              background:
                'linear-gradient(to top, rgba(215,255,255,1), rgba(81,225,234,.9), transparent)',
              boxShadow: '0 0 12px rgba(86,231,239,.95)',
              transformOrigin: 'bottom center',
            }}
          />

          {/* CENTER CORE */}
          <div
            className="why-orbit-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '-10px',
              marginTop: '-10px',
              borderRadius: '50%',
              background: '#F5FFFF',
              border: '2px solid rgba(143,244,248,.98)',
              boxShadow:
                '0 0 12px #F5FFFF, 0 0 30px rgba(73,227,235,1), 0 0 65px rgba(29,177,193,.95)',
              zIndex: 6,
            }}
          />

          {/* DATA PARTICLE 1 */}
          <span
            className="why-data-particle-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#F0FFFF',
              boxShadow:
                '0 0 9px #F0FFFF, 0 0 21px rgba(69,219,228,.98)',
              zIndex: 5,
            }}
          />

          {/* DATA PARTICLE 2 */}
          <span
            className="why-data-particle-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#69E1E8',
              boxShadow:
                '0 0 9px #69E1E8, 0 0 22px rgba(39,191,205,.98)',
              zIndex: 5,
            }}
          />

          {/* DATA PARTICLE 3 */}
          <span
            className="why-data-particle-three"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#B7F8FA',
              boxShadow:
                '0 0 8px #B7F8FA, 0 0 19px rgba(69,219,228,.95)',
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* DOCUMENTATION GAP */}
      <section className="section container problem-grid">
        <AnimatedSection>
          <span className="eyebrow">The documentation gap</span>
          <h2>
            Care happens in conversation. Records still demand a separate
            workflow.
          </h2>
        </AnimatedSection>

        <AnimatedSection className="large-copy">
          <p>
            When documentation competes with the patient encounter, clinicians
            must divide their attention or finish the work later. NourDoc is
            designed around a simpler idea: let the natural conversation become
            the starting point.
          </p>
        </AnimatedSection>
      </section>

      {/* WORKFLOW */}
      <section className="section section-soft why-workflow-section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="A different workflow"
              title="From fragmented tasks to one clinician-controlled journey."
            />
          </AnimatedSection>

          <WorkflowJourney steps={workflow} premium />
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section container">
        <AnimatedSection>
          <SectionHeader
            eyebrow="A practical comparison"
            title="Less process around the process."
            text="These are workflow comparisons, not unsupported performance claims."
          />
        </AnimatedSection>

        <AnimatedSection className="comparison-table">
          <div className="comparison-head">
            <span>Dimension</span>
            <span>Traditional workflow</span>
            <span>NourDoc approach</span>
          </div>

          {comparison.map(([dimension, traditional, nourdoc]) => (
            <div className="comparison-row" key={dimension}>
              <strong>{dimension}</strong>

              <span>
                <small className="comparison-mobile-label">
                  Traditional workflow
                </small>
                <Minus />
                {traditional}
              </span>

              <span>
                <small className="comparison-mobile-label">
                  NourDoc approach
                </small>
                <Check />
                {nourdoc}
              </span>
            </div>
          ))}
        </AnimatedSection>
      </section>

      {/* CLINICIAN CONTROL */}
      <ImageStory
        image={localImage}
        objectPosition="68% center"
        alt="Pakistani clinician giving full attention to a patient"
        eyebrow="Clinician control"
        title="AI drafts. Clinicians decide."
        text="NourDoc keeps the clinician responsible for reviewing, editing and approving the final record. The technology supports clinical work without replacing professional judgment."
        points={[
          'Review before saving',
          'Edit generated documentation',
          'Approve the final record',
        ]}
      />

      {/* STATEMENT BAND */}
      <section className="section container statement-band">
        <AnimatedSection>
          <p>
            Clinical intelligence should feel less like another system to
            manage—and more like documentation quietly keeping pace.
          </p>

          <Link to="/product" className="text-link">
            See the product workflow
            <ArrowRight />
          </Link>
        </AnimatedSection>
      </section>

      <CTASection
        title="See the difference in your own workflow."
        label="Book a Demo"
      />
    </>
  )
}
