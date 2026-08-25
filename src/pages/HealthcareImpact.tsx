import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import {
  healthcareImpactImage as heroImage,
  internationalConsultationImage as patientExperienceImage,
  pakistaniConsultationImage as localImage,
} from '../data/responsiveImages'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'

import { impactAreas } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

export default function HealthcareImpact() {
  const heroRef = useRef<HTMLDivElement>(null)
  const outerRingRef = useRef<HTMLDivElement>(null)
  const innerRingRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Healthcare Impact',
    'Explore how NourDoc is designed to reduce clerical friction across clinical, patient, operational, financial and compliance workflows.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overall floating visual
      gsap.to('.impact-visual', {
        y: -5,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Rotating outer ring
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Counter rotating inner ring
      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 17,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Animated connector lines
      gsap.to('.impact-flow-line', {
        strokeDashoffset: -140,
        duration: 6,
        repeat: -1,
        ease: 'none',
      })

      // Central impact core
      gsap.to('.impact-core', {
        scale: 1.16,
        boxShadow:
          '0 0 18px rgba(213,255,255,1), 0 0 42px rgba(80,225,233,.9), 0 0 78px rgba(32,173,190,.58)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Endpoint nodes
      gsap.to('.impact-node', {
        scale: 1.35,
        opacity: 1,
        duration: 1.3,
        stagger: {
          each: 0.3,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Pulse rings
      gsap.fromTo(
        '.impact-pulse-one',
        {
          scale: 0.5,
          opacity: 0.75,
        },
        {
          scale: 1.9,
          opacity: 0,
          duration: 2.8,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      gsap.fromTo(
        '.impact-pulse-two',
        {
          scale: 0.5,
          opacity: 0.6,
        },
        {
          scale: 2.15,
          opacity: 0,
          duration: 2.8,
          delay: 1.4,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      // Moving impact particles
      gsap.fromTo(
        '.impact-particle-one',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: -150,
          y: -105,
          opacity: 1,
          scale: 1.4,
          duration: 3.8,
          repeat: -1,
          repeatDelay: 0.3,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.impact-particle-two',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: 155,
          y: -90,
          opacity: 1,
          scale: 1.4,
          duration: 4.2,
          delay: 0.65,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.impact-particle-three',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: 145,
          y: 112,
          opacity: 1,
          scale: 1.3,
          duration: 4.6,
          delay: 1.15,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.impact-particle-four',
        {
          x: 0,
          y: 0,
          opacity: 0,
        },
        {
          x: -142,
          y: 108,
          opacity: 1,
          scale: 1.3,
          duration: 5,
          delay: 1.55,
          repeat: -1,
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
        className="inner-page-hero inner-page-hero-impact"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="impact"
          image={heroImage}
          imageAlt="Physician providing attentive care to a young patient"
          imagePosition="38% center"
          eyebrow="Healthcare Impact"
          title="Measured impact across clinical, financial, operational and patient outcomes."
          text="NourDoc is designed to improve more than the documentation workflow by helping reduce clerical friction around the clinical encounter."
        />

        {/* PREMIUM IMPACT CONSTELLATION */}
        <div
          className="inner-page-hero-visual impact-visual"
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
          {/* Contrast halo for light background */}
          <div
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(3,26,33,.78) 0%, rgba(5,43,50,.54) 36%, rgba(9,55,63,.21) 61%, transparent 79%)',
              boxShadow:
                '0 0 68px rgba(0,22,28,.4), inset 0 0 44px rgba(52,182,195,.1)',
            }}
          />

          {/* Soft atmospheric glow */}
          <div
            style={{
              position: 'absolute',
              inset: '13%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(71,225,233,.18) 0%, rgba(42,179,193,.08) 40%, transparent 72%)',
              filter: 'blur(10px)',
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
              className="impact-flow-line"
              d="M175 175 C135 139 98 105 55 70"
              fill="none"
              stroke="rgba(142,246,250,.82)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="impact-flow-line"
              d="M175 175 C217 138 255 104 300 70"
              fill="none"
              stroke="rgba(142,246,250,.8)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="impact-flow-line"
              d="M175 175 C215 214 255 248 298 286"
              fill="none"
              stroke="rgba(103,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="impact-flow-line"
              d="M175 175 C135 216 99 248 54 287"
              fill="none"
              stroke="rgba(103,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />
          </svg>

          {/* Pulse rings */}
          <div
            className="impact-pulse-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '95px',
              height: '95px',
              marginLeft: '-47.5px',
              marginTop: '-47.5px',
              borderRadius: '50%',
              border: '1.5px solid rgba(176,252,254,.82)',
            }}
          />

          <div
            className="impact-pulse-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '95px',
              height: '95px',
              marginLeft: '-47.5px',
              marginTop: '-47.5px',
              borderRadius: '50%',
              border: '1px solid rgba(101,229,237,.66)',
            }}
          />

          {/* Outer orbit */}
          <div
            ref={outerRingRef}
            style={{
              position: 'absolute',
              inset: '11%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(136,245,249,.68)',
              boxShadow: '0 0 24px rgba(64,210,221,.16)',
            }}
          >
            <span
              className="impact-node"
              style={{
                position: 'absolute',
                top: '-5px',
                left: '48%',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#EAFFFF',
                opacity: 0.8,
                boxShadow:
                  '0 0 8px #EAFFFF, 0 0 22px rgba(70,226,234,.95)',
              }}
            />

            <span
              className="impact-node"
              style={{
                position: 'absolute',
                right: '5%',
                bottom: '19%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#70E4EA',
                opacity: 0.75,
                boxShadow:
                  '0 0 8px #70E4EA, 0 0 19px rgba(46,196,209,.94)',
              }}
            />
          </div>

          {/* Inner orbit */}
          <div
            ref={innerRingRef}
            style={{
              position: 'absolute',
              inset: '27%',
              borderRadius: '50%',
              border: '1.3px solid rgba(122,236,241,.52)',
            }}
          >
            <span
              className="impact-node"
              style={{
                position: 'absolute',
                left: '18%',
                top: '5%',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#B8F8FA',
                opacity: 0.76,
                boxShadow:
                  '0 0 8px #B8F8FA, 0 0 18px rgba(59,211,221,.9)',
              }}
            />
          </div>

          {/* Central impact core */}
          <div
            className="impact-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '92px',
              height: '92px',
              marginLeft: '-46px',
              marginTop: '-46px',
              borderRadius: '50%',
              border: '1.5px solid rgba(157,247,250,.88)',
              background:
                'radial-gradient(circle, rgba(16,72,81,.98), rgba(6,40,48,.97))',
              boxShadow:
                '0 0 18px rgba(87,228,236,.28), 0 0 46px rgba(31,168,185,.24)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 6,
            }}
          >
            <strong
              style={{
                fontSize: '12px',
                color: '#F3FFFF',
                letterSpacing: '.02em',
              }}
            >
              NourDoc
            </strong>

            <span
              style={{
                marginTop: '3px',
                fontSize: '8px',
                textTransform: 'uppercase',
                letterSpacing: '.11em',
                color: '#7DE5EA',
              }}
            >
              Impact
            </span>
          </div>

          {/* CLINICAL */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              top: '4%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(135,237,241,.38)',
              background: 'rgba(4,31,38,.78)',
              backdropFilter: 'blur(9px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.2)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDCE3',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              01
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Clinical
            </strong>
          </div>

          {/* PATIENT */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              top: '4%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(135,237,241,.38)',
              background: 'rgba(4,31,38,.78)',
              backdropFilter: 'blur(9px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.2)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDCE3',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              02
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Patient
            </strong>
          </div>

          {/* OPERATIONAL */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              bottom: '3%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(135,237,241,.38)',
              background: 'rgba(4,31,38,.78)',
              backdropFilter: 'blur(9px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.2)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDCE3',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              03
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Operational
            </strong>
          </div>

          {/* FINANCIAL */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              bottom: '3%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(135,237,241,.38)',
              background: 'rgba(4,31,38,.78)',
              backdropFilter: 'blur(9px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.2)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDCE3',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              04
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Financial
            </strong>
          </div>

          {/* Moving particles */}
          <span
            className="impact-particle-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F1FFFF',
              boxShadow:
                '0 0 9px #F1FFFF, 0 0 20px rgba(70,223,231,.96)',
              zIndex: 7,
            }}
          />

          <span
            className="impact-particle-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#68E0E7',
              boxShadow:
                '0 0 8px #68E0E7, 0 0 20px rgba(42,194,207,.95)',
              zIndex: 7,
            }}
          />

          <span
            className="impact-particle-three"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#B8F8FA',
              boxShadow:
                '0 0 8px #B8F8FA, 0 0 18px rgba(67,216,225,.93)',
              zIndex: 7,
            }}
          />

          <span
            className="impact-particle-four"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#86EBEF',
              boxShadow:
                '0 0 8px #86EBEF, 0 0 18px rgba(55,204,215,.92)',
              zIndex: 7,
            }}
          />
        </div>
      </div>

      {/* PATIENT EXPERIENCE */}
      <ImageStory
        image={patientExperienceImage}
        objectPosition="50% center"
        alt="Physician listening attentively during a patient consultation"
        eyebrow="Patient experience"
        title="Visits that feel like conversations again."
        text="When physicians spend less time typing during consultations, more attention can remain on the patient interaction."
        points={[
          'Physician attentiveness',
          'Less screen time',
          'Reduced documentation burden',
        ]}
      />

      {/* AREAS OF IMPACT */}
      <section className="section section-soft">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Areas of impact"
              title="Practical outcomes across the care environment."
              text="The platform is positioned around workflow benefits rather than unverified numerical claims."
            />
          </AnimatedSection>

          <div className="impact-editorial">
            {impactAreas.map(({ title, text, icon: Icon }, i) => (
              <AnimatedSection
                className="impact-editorial-card"
                key={title}
                variant="card"
                interactive
                index={i}
              >
                <span>0{i + 1}</span>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL ATTENTION */}
      <ImageStory
        reverse
        image={localImage}
        objectPosition="68% center"
        alt="Pakistani doctor listening during a consultation"
        eyebrow="Clinical attention"
        title="Documentation should support the visit—not interrupt it."
        text="NourDoc is designed to reduce the manual documentation surrounding care so the clinical team can keep more of its attention where it belongs."
      />

      {/* EVIDENCE STANDARD */}
      <section className="section container">
        <AnimatedSection className="principle-panel">
          <span className="eyebrow">A clear evidence standard</span>

          <h2>Claims should earn trust.</h2>

          <p>
            We do not publish legacy headline statistics until their source and
            applicability are validated. NourDoc’s public story stays focused
            on the product workflow and the outcomes it is designed to support.
          </p>
        </AnimatedSection>
      </section>

      <CTASection />
    </>
  )
}
