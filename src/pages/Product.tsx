import { useEffect, useRef } from 'react'
import {
  Activity,
  AudioLines,
  ClipboardCheck,
  Copy,
  FileDown,
  ListChecks,
  Mail,
  MessageSquareText,
  Pause,
  Play,
  RotateCcw,
  Square,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react'
import gsap from 'gsap'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { usePageMeta } from '../hooks/usePageMeta'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

import heroImage from '../assets/03-product-clinical-workflow.jpg'

const productSteps = [
  {
    title: 'Ambient listening',
    text: 'Capture a natural, consented physician-patient conversation without requiring a separate dictation.',
    tag: '01',
  },
  {
    title: 'AI speech-to-text',
    text: 'Convert the doctor-patient conversation into text for the documentation workflow.',
    tag: '02',
  },
  {
    title: 'Create or select consultations',
    text: 'Start a new consultation or return to an existing one.',
    tag: '03',
  },
  {
    title: 'Patient information',
    text: 'Enter patient details such as name, age, medical history and condition.',
    tag: '04',
  },
]

const soapSections = [
  {
    letter: 'S',
    title: 'Subjective',
    icon: MessageSquareText,
    status: 'Drafted',
    rows: ['Symptoms and history summary', 'Patient-reported concerns', 'Relevant context captured'],
  },
  {
    letter: 'O',
    title: 'Objective',
    icon: Activity,
    status: 'Ready for review',
    rows: ['Observed clinical findings', 'Vitals and examination fields', 'Supporting observations'],
  },
  {
    letter: 'A',
    title: 'Assessment',
    icon: Stethoscope,
    status: 'Drafted',
    rows: ['Clinical impression placeholder', 'Context for clinician review', 'Assessment summary field'],
  },
  {
    letter: 'P',
    title: 'Plan',
    icon: ListChecks,
    status: 'Ready for review',
    rows: ['Next-step documentation', 'Follow-up and instructions', 'Orders or referrals if applicable'],
  },
]

const speakerRows = [
  { speaker: 'Doctor', initials: 'DR', time: '00:08', bars: [24, 44, 31, 58, 39, 66, 47, 29, 52, 36, 61, 42] },
  { speaker: 'Patient', initials: 'PT', time: '00:19', bars: [38, 22, 49, 34, 57, 29, 45, 64, 37, 51, 26, 43] },
  { speaker: 'Doctor', initials: 'DR', time: '00:31', bars: [28, 51, 37, 63, 43, 32, 56, 41, 67, 35, 48, 30] },
]

export default function Product() {
  const heroRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Product',
    'Explore NourDoc ambient listening, AI transcription, SOAP note generation, review controls and consultation management.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Whole visualization subtle float
      gsap.to('.product-ai-visual', {
        y: -5,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Continuous connector movement
      gsap.to('.product-flow-line', {
        strokeDashoffset: -120,
        duration: 6,
        repeat: -1,
        ease: 'none',
      })

      // Live processing core pulse
      gsap.to('.product-core', {
        scale: 1.18,
        boxShadow:
          '0 0 16px rgba(178,251,253,1), 0 0 42px rgba(72,225,234,.95), 0 0 80px rgba(34,169,187,.65)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Orbit rings
      gsap.to('.product-orbit-one', {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to('.product-orbit-two', {
        rotation: -360,
        duration: 13,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Processing nodes
      gsap.to('.product-node', {
        scale: 1.7,
        opacity: 1,
        duration: 1.1,
        stagger: {
          each: 0.24,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Data travelling through workflow
      gsap.fromTo(
        '.product-data-one',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: -155,
          y: -92,
          opacity: 1,
          scale: 1.4,
          duration: 3.7,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.product-data-two',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: 162,
          y: -98,
          opacity: 1,
          scale: 1.5,
          duration: 4.2,
          delay: 0.7,
          repeat: -1,
          repeatDelay: 0.3,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.product-data-three',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: 145,
          y: 100,
          opacity: 1,
          scale: 1.35,
          duration: 4.7,
          delay: 1.3,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      // Live waveform
      gsap.to('.product-wave-bar', {
        scaleY: () => gsap.utils.random(0.35, 1.2),
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.07,
          from: 'random',
        },
        ease: 'sine.inOut',
      })

      // Light scanning sweep
      gsap.fromTo(
        '.product-scan',
        {
          x: '-130%',
          opacity: 0,
        },
        {
          x: '230%',
          opacity: 0.75,
          duration: 3.8,
          repeat: -1,
          repeatDelay: 1.2,
          ease: 'power1.inOut',
        },
      )
    }, heroRef)

    const stopVisibilityControl = createAnimationVisibilityController(heroRef.current!)
    return () => { stopVisibilityControl(); ctx.revert() }
  }, [])

  return (
    <>
      {/* HERO */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="product"
          image={heroImage}
          imageAlt="Clinical team reviewing information on a tablet"
          imagePosition="center 42%"
          eyebrow="Platform"
          title="One ambient layer across the entire clinical encounter."
          text="NourDoc supports the documentation lifecycle from spoken clinical conversation to structured documentation for clinician review."
        />

        {/* PREMIUM PRODUCT WORKFLOW ANIMATION */}
        <div
          className="product-ai-visual"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '2.8%',
            bottom: '4%',
            width: '350px',
            height: '350px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {/* Dark contrast halo */}
          <div
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(3,25,34,.78) 0%, rgba(5,43,53,.52) 38%, rgba(10,59,68,.2) 60%, transparent 78%)',
              boxShadow:
                '0 0 70px rgba(2,21,28,.42), inset 0 0 48px rgba(55,190,204,.1)',
            }}
          />

          {/* Connector network */}
          <svg
            viewBox="0 0 350 350"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <path
              className="product-flow-line"
              d="M175 175 C126 137 93 102 55 66"
              fill="none"
              stroke="rgba(137,243,248,.85)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />

            <path
              className="product-flow-line"
              d="M175 175 C218 134 255 103 300 68"
              fill="none"
              stroke="rgba(137,243,248,.78)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />

            <path
              className="product-flow-line"
              d="M175 175 C217 214 255 247 298 287"
              fill="none"
              stroke="rgba(93,225,234,.72)"
              strokeWidth="1.4"
              strokeDasharray="5 11"
            />
          </svg>

          {/* Outer orbit */}
          <div
            className="product-orbit-one"
            style={{
              position: 'absolute',
              inset: '16%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(132,244,249,.65)',
              boxShadow: '0 0 22px rgba(69,218,229,.18)',
            }}
          >
            <span
              className="product-node"
              style={{
                position: 'absolute',
                left: '48%',
                top: '-5px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#DAFDFF',
                opacity: 0.75,
                boxShadow:
                  '0 0 9px #DAFDFF, 0 0 24px rgba(75,228,236,.95)',
              }}
            />

            <span
              className="product-node"
              style={{
                position: 'absolute',
                right: '4%',
                top: '30%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#79E8ED',
                opacity: 0.7,
                boxShadow:
                  '0 0 9px #79E8ED, 0 0 20px rgba(47,197,210,.95)',
              }}
            />
          </div>

          {/* Inner orbit */}
          <div
            className="product-orbit-two"
            style={{
              position: 'absolute',
              inset: '29%',
              borderRadius: '50%',
              border: '1.3px solid rgba(116,236,241,.52)',
            }}
          >
            <span
              className="product-node"
              style={{
                position: 'absolute',
                left: '18%',
                top: '3%',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#B9F8FA',
                opacity: 0.7,
                boxShadow:
                  '0 0 8px #B9F8FA, 0 0 18px rgba(60,211,222,.92)',
              }}
            />
          </div>

          {/* Central processing core */}
          <div
            className="product-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '88px',
              height: '88px',
              marginLeft: '-44px',
              marginTop: '-44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(150,246,249,.85)',
              background:
                'radial-gradient(circle, rgba(17,69,80,.98), rgba(8,43,52,.96))',
              boxShadow:
                '0 0 20px rgba(101,235,241,.34), 0 0 45px rgba(32,169,186,.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              overflow: 'hidden',
            }}
          >
            {/* Scanner sweep */}
            <div
              className="product-scan"
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-25%',
                width: '30%',
                height: '145%',
                transform: 'rotate(16deg)',
                background:
                  'linear-gradient(90deg, transparent, rgba(159,248,251,.32), transparent)',
                filter: 'blur(2px)',
              }}
            />

            {/* Mini waveform */}
            <div
              style={{
                display: 'flex',
                gap: '3px',
                alignItems: 'center',
                height: '34px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {[14, 24, 18, 31, 22, 28, 17, 25, 15].map(
                (height, index) => (
                  <span
                    key={index}
                    className="product-wave-bar"
                    style={{
                      display: 'block',
                      width: '3px',
                      height: `${height}px`,
                      borderRadius: '4px',
                      background: '#8CECF1',
                      transformOrigin: 'center',
                      boxShadow: '0 0 8px rgba(94,229,236,.6)',
                    }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Workflow endpoint — conversation */}
          <div
            style={{
              position: 'absolute',
              left: '2%',
              top: '6%',
              width: '112px',
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid rgba(133,235,240,.35)',
              background: 'rgba(5,31,39,.72)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.18)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '.08em',
                color: '#78DDE4',
                marginBottom: '6px',
              }}
            >
              01
            </div>

            <strong
              style={{
                display: 'block',
                fontSize: '12px',
                color: '#F6FFFF',
              }}
            >
              Conversation
            </strong>

            <span
              style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '9px',
                color: 'rgba(230,249,250,.6)',
              }}
            >
              Ambient capture
            </span>
          </div>

          {/* Workflow endpoint — AI context */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              top: '7%',
              width: '112px',
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid rgba(133,235,240,.35)',
              background: 'rgba(5,31,39,.72)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.18)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '.08em',
                color: '#78DDE4',
                marginBottom: '6px',
              }}
            >
              02
            </div>

            <strong
              style={{
                display: 'block',
                fontSize: '12px',
                color: '#F6FFFF',
              }}
            >
              Clinical AI
            </strong>

            <span
              style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '9px',
                color: 'rgba(230,249,250,.6)',
              }}
            >
              Context processing
            </span>
          </div>

          {/* Workflow endpoint — structured note */}
          <div
            style={{
              position: 'absolute',
              right: '1%',
              bottom: '4%',
              width: '118px',
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid rgba(133,235,240,.35)',
              background: 'rgba(5,31,39,.72)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.18)',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '.08em',
                color: '#78DDE4',
                marginBottom: '6px',
              }}
            >
              03
            </div>

            <strong
              style={{
                display: 'block',
                fontSize: '12px',
                color: '#F6FFFF',
              }}
            >
              Structured note
            </strong>

            <span
              style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '9px',
                color: 'rgba(230,249,250,.6)',
              }}
            >
              Ready for review
            </span>
          </div>

          {/* Moving data particles */}
          <span
            className="product-data-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#F0FFFF',
              boxShadow:
                '0 0 8px #F0FFFF, 0 0 20px rgba(74,222,230,.98)',
              zIndex: 7,
            }}
          />

          <span
            className="product-data-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#6EE5EB',
              boxShadow:
                '0 0 8px #6EE5EB, 0 0 20px rgba(42,195,208,.98)',
              zIndex: 7,
            }}
          />

          <span
            className="product-data-three"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#BFF9FB',
              boxShadow:
                '0 0 8px #BFF9FB, 0 0 18px rgba(71,218,227,.95)',
              zIndex: 7,
            }}
          />
        </div>
      </div>

      {/* AMBIENT LISTENING */}
      <section className="section container">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Ambient listening"
            title="Documentation that starts the moment the visit does."
            text="Natural conversation becomes the input. Consent prompts and recording indicators help keep capture explicit, while desktop, tablet and mobile usage support the clinical setting."
          />
        </AnimatedSection>

        <div className="story-rail">
          {productSteps.map((step, index) => (
            <AnimatedSection
              className="story-row"
              key={step.tag}
              variant="left"
              index={index}
            >
              <span>{step.tag}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* RECORDING CONTROLS */}
      <section className="section section-soft">
        <div className="container product-control-grid">
          <AnimatedSection variant="left">
            <span className="eyebrow">Recording controls</span>
            <h2>Clear control throughout capture.</h2>

            <p>
              Clinicians can pause, discard or end a recording from within the
              current application workflow.
            </p>

            <div className="control-buttons">
              <span>
                <Pause />
                Pause
              </span>

              <span>
                <RotateCcw />
                Discard
              </span>

              <span>
                <Square />
                End
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection
            className="review-panel"
            variant="scale"
            interactive
          >
            <UserRoundCheck />

            <span className="eyebrow">Doctor acknowledgment</span>

            <h3>Review before the record is saved.</h3>

            <p>
              The clinician reviews and confirms the consultation summary
              before saving.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* SOAP */}
      <section className="section container product-soap-section">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Automatic SOAP notes"
            title="A familiar structure, without fabricated patient content."
            text="NourDoc converts voice data into four structured documentation sections for clinician review."
            align="center"
          />
        </AnimatedSection>

        <div className="soap-grid soap-grid-clinical">
          {soapSections.map(({ letter, title, icon: Icon, status, rows }, index) => (
            <AnimatedSection
              className="soap-card soap-note-card"
              key={letter}
              variant="card"
              index={index}
            >
              <header>
                <span className="soap-letter">{letter}</span>
                <Icon />
              </header>
              <h3>{title}</h3>
              <div className="soap-note-rows">
                {rows.map((row) => <p key={row}><i />{row}</p>)}
              </div>
              <footer><i />{status}</footer>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* REVIEW & ACT */}
      <section className="section security-preview">
        <div className="container product-detail-grid">
          <AnimatedSection variant="left">
            <span className="eyebrow eyebrow-light">Review & act</span>
            <h2>Documentation stays useful after the draft.</h2>
            <p>The current app listing confirms a focused set of note actions.</p>
          </AnimatedSection>

          <div className="action-grid">
            {[
              [ClipboardCheck, 'Edit'],
              [Copy, 'Copy'],
              [FileDown, 'Save as PDF'],
              [Mail, 'Email'],
            ].map(([Icon, label], index) => {
              const ActionIcon = Icon as typeof ClipboardCheck

              return (
                <AnimatedSection
                  className="action-card"
                  key={label as string}
                  variant="card"
                  interactive
                  index={index}
                >
                  <ActionIcon />
                  <span>{label as string}</span>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* SPEAKER SEPARATION */}
      <section className="section container split-feature product-speaker-section">
        <AnimatedSection variant="left">
          <span className="eyebrow">Speaker separation</span>
          <h2>Review the conversation by speaker.</h2>

          <p>
            NourDoc distinguishes Speaker 1 / Doctor and Speaker 2 / Patient,
            with separate voice playback available for review.
          </p>
        </AnimatedSection>

        <AnimatedSection
          className="speaker-visual speaker-transcript-panel"
          variant="scale"
        >
          <header className="speaker-panel-header">
            <span><AudioLines /> Live transcript</span>
            <small><i /> 2 speakers detected</small>
          </header>
          <div className="speaker-playback"><span /><i /></div>
          <div className="speaker-turns">
            {speakerRows.map((row, rowIndex) => (
              <article className="speaker-turn" key={`${row.speaker}-${row.time}`}>
                <span className="speaker-avatar">{row.initials}</span>
                <div className="speaker-turn-content">
                  <header><b>{row.speaker}</b><small>{row.time}</small></header>
                  <div className="speaker-waveform" aria-hidden="true">
                    {row.bars.map((height, barIndex) => <i key={`${height}-${barIndex}`} style={{ height: `${height}%`, animationDelay: `${rowIndex * .18 + barIndex * .045}s` }} />)}
                  </div>
                </div>
                <button type="button" aria-label={`Play ${row.speaker} segment`}><Play /></button>
                <i className="speaker-turn-status" aria-hidden="true" style={{ animationDelay: `${rowIndex * 2}s` }} />
              </article>
            ))}
          </div>
          <footer><span><i /> Speaker separated</span><small>Consent-aware review</small></footer>
        </AnimatedSection>
      </section>

      {/* CONSULTATION MANAGEMENT */}
      <section className="section section-soft">
        <div className="container verification-grid">
          <AnimatedSection>
            <span className="status-pill confirmed">
              Confirmed in current app listing
            </span>

            <h2>Consultation management</h2>

            <p>
              Access and organize consultations, manage recordings, review
              transcripts and create structured SOAP documentation.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <span className="status-pill future">
              Platform direction — verify availability
            </span>

            <h2>Enterprise capabilities</h2>

            <p>
              Deeper EMR/HMIS integrations, API/FHIR availability, ICD
              suggestions and other legacy platform claims require product-team
              confirmation before being presented as currently available.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  )
}
