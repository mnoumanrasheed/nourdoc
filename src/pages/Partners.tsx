import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'

import { partnerCategories } from '../data/site'
import { useHeroVisualScroll } from '../hooks/useHeroVisualScroll'
import { usePageMeta } from '../hooks/usePageMeta'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

import { partnersImage as heroImage } from '../data/responsiveImages'

const partnerDescriptions: Record<string, string> = {
  Hospitals: 'Enterprise clinical environments',
  Clinics: 'Ambulatory care workflows',
  'Medical Universities': 'Education and clinical research',
  'EMR Vendors': 'Clinical system interoperability',
  'HMIS Vendors': 'Hospital information workflows',
  'Insurance Companies': 'Documentation and care administration',
  'Medical Coding Companies': 'Structured coding workflows',
  'Medical Transcription Companies': 'Documentation ecosystem',
  'RCM Companies': 'Revenue-cycle workflows',
  'System Integrators': 'Enterprise deployment support',
  'Technology Partners': 'Connected platform ecosystem',
}

export default function Partners() {
  const heroRef = useRef<HTMLDivElement>(null)
  useHeroVisualScroll(heroRef)
  const outerOrbitRef = useRef<HTMLDivElement>(null)
  const innerOrbitRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Partners',
    'NourDoc works alongside hospitals, clinics, medical universities, health technology vendors and healthcare service partners.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle floating motion
      gsap.to('.partners-network', {
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Outer ecosystem orbit
      gsap.to(outerOrbitRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Inner orbit opposite direction
      gsap.to(innerOrbitRef.current, {
        rotation: -360,
        duration: 17,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Connector flow
      gsap.to('.partner-flow-line', {
        strokeDashoffset: -150,
        duration: 6,
        repeat: -1,
        ease: 'none',
      })

      // Hub pulse
      gsap.to('.partner-core', {
        scale: 1.12,
        boxShadow:
          '0 0 18px rgba(235,255,255,1), 0 0 42px rgba(82,225,233,.9), 0 0 76px rgba(32,169,187,.58)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Partner node pulse
      gsap.to('.partner-node', {
        scale: 1.22,
        opacity: 1,
        duration: 1.1,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Incoming connection particles
      gsap.fromTo(
        '.partner-particle-one',
        {
          x: -155,
          y: -105,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.4,
          duration: 3.8,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.partner-particle-two',
        {
          x: 155,
          y: -100,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.35,
          duration: 4.2,
          delay: 0.7,
          repeat: -1,
          repeatDelay: 0.3,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.partner-particle-three',
        {
          x: 155,
          y: 105,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.6,
          delay: 1.2,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.partner-particle-four',
        {
          x: -155,
          y: 105,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 5,
          delay: 1.55,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      // Outer pulse
      gsap.fromTo(
        '.partner-pulse-one',
        {
          scale: 0.55,
          opacity: 0.68,
        },
        {
          scale: 1.85,
          opacity: 0,
          duration: 2.8,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      gsap.fromTo(
        '.partner-pulse-two',
        {
          scale: 0.55,
          opacity: 0.5,
        },
        {
          scale: 2.05,
          opacity: 0,
          duration: 2.8,
          delay: 1.4,
          repeat: -1,
          ease: 'power1.out',
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
        className="inner-page-hero inner-page-hero-partners"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="partners"
          image={heroImage}
          imageAlt="Healthcare professionals collaborating around clinical technology"
          imagePosition="center"
          eyebrow="Partners"
          title="Built to work alongside the healthcare ecosystem, not around it."
          text="NourDoc is positioned to work with the systems and organizations that already support healthcare delivery."
        />

        {/* PREMIUM PARTNER ECOSYSTEM NETWORK */}
        <div
          className="inner-page-hero-visual partners-network"
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
          {/* Contrast halo */}
          <div
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(3,24,31,.82) 0%, rgba(5,42,51,.56) 37%, rgba(8,55,64,.22) 61%, transparent 79%)',
              boxShadow:
                '0 0 70px rgba(0,18,25,.46), inset 0 0 46px rgba(48,181,195,.1)',
            }}
          />

          {/* Atmospheric glow */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(62,218,228,.18) 0%, rgba(37,169,184,.08) 42%, transparent 72%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Network lines */}
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
              className="partner-flow-line"
              d="M175 175 C135 135 98 101 54 67"
              fill="none"
              stroke="rgba(149,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="partner-flow-line"
              d="M175 175 C218 135 256 101 301 67"
              fill="none"
              stroke="rgba(149,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="partner-flow-line"
              d="M175 175 C218 216 257 249 301 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="partner-flow-line"
              d="M175 175 C134 216 97 249 54 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />
          </svg>

          {/* Pulse rings */}
          <div
            className="partner-pulse-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1.5px solid rgba(176,252,254,.82)',
            }}
          />

          <div
            className="partner-pulse-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1px solid rgba(97,228,236,.65)',
            }}
          />

          {/* Outer orbit */}
          <div
            ref={outerOrbitRef}
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(140,245,249,.7)',
              boxShadow: '0 0 24px rgba(66,213,224,.18)',
            }}
          >
            <span
              className="partner-node"
              style={{
                position: 'absolute',
                top: '-5px',
                left: '48%',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#E8FFFF',
                opacity: 0.78,
                boxShadow:
                  '0 0 8px #E8FFFF, 0 0 22px rgba(72,226,234,.96)',
              }}
            />

            <span
              className="partner-node"
              style={{
                position: 'absolute',
                right: '5%',
                bottom: '18%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#6DE1E8',
                opacity: 0.76,
                boxShadow:
                  '0 0 8px #6DE1E8, 0 0 19px rgba(42,195,208,.94)',
              }}
            />
          </div>

          {/* Inner orbit */}
          <div
            ref={innerOrbitRef}
            style={{
              position: 'absolute',
              inset: '27%',
              borderRadius: '50%',
              border: '1.3px solid rgba(121,236,241,.54)',
            }}
          >
            <span
              className="partner-node"
              style={{
                position: 'absolute',
                left: '18%',
                top: '4%',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#B9F8FA',
                opacity: 0.76,
                boxShadow:
                  '0 0 8px #B9F8FA, 0 0 18px rgba(59,210,221,.9)',
              }}
            />
          </div>

          {/* Central NourDoc hub */}
          <div
            className="partner-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '94px',
              height: '94px',
              marginLeft: '-47px',
              marginTop: '-47px',
              borderRadius: '24px',
              border: '1.5px solid rgba(158,247,250,.9)',
              background:
                'linear-gradient(145deg, rgba(12,71,81,.98), rgba(5,39,48,.98))',
              boxShadow:
                '0 0 20px rgba(85,228,236,.28), 0 0 45px rgba(30,168,185,.24)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 6,
            }}
          >
            <strong
              style={{
                color: '#F4FFFF',
                fontSize: '12px',
              }}
            >
              NourDoc
            </strong>

            <span
              style={{
                marginTop: '4px',
                color: '#76E1E7',
                fontSize: '8px',
                letterSpacing: '.11em',
                textTransform: 'uppercase',
              }}
            >
              Ecosystem
            </span>
          </div>

          {/* HOSPITALS */}
          <div
            className="partner-node"
            style={{
              position: 'absolute',
              left: '0%',
              top: '4%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDDE4',
                fontSize: '9px',
                letterSpacing: '.09em',
                marginBottom: '5px',
              }}
            >
              01
            </span>

            <strong
              style={{
                color: '#F6FFFF',
                fontSize: '11px',
              }}
            >
              Hospitals
            </strong>
          </div>

          {/* CLINICS */}
          <div
            className="partner-node"
            style={{
              position: 'absolute',
              right: '0%',
              top: '4%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDDE4',
                fontSize: '9px',
                letterSpacing: '.09em',
                marginBottom: '5px',
              }}
            >
              02
            </span>

            <strong
              style={{
                color: '#F6FFFF',
                fontSize: '11px',
              }}
            >
              Clinics
            </strong>
          </div>

          {/* TECHNOLOGY */}
          <div
            className="partner-node"
            style={{
              position: 'absolute',
              right: '0%',
              bottom: '3%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDDE4',
                fontSize: '9px',
                letterSpacing: '.09em',
                marginBottom: '5px',
              }}
            >
              03
            </span>

            <strong
              style={{
                color: '#F6FFFF',
                fontSize: '11px',
              }}
            >
              Health Tech
            </strong>
          </div>

          {/* ACADEMIC */}
          <div
            className="partner-node"
            style={{
              position: 'absolute',
              left: '0%',
              bottom: '3%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,15,22,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6EDDE4',
                fontSize: '9px',
                letterSpacing: '.09em',
                marginBottom: '5px',
              }}
            >
              04
            </span>

            <strong
              style={{
                color: '#F6FFFF',
                fontSize: '11px',
              }}
            >
              Universities
            </strong>
          </div>

          {/* Incoming data particles */}
          <span
            className="partner-particle-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F2FFFF',
              boxShadow:
                '0 0 9px #F2FFFF, 0 0 21px rgba(69,220,229,.98)',
              zIndex: 7,
            }}
          />

          <span
            className="partner-particle-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#69E1E8',
              boxShadow:
                '0 0 8px #69E1E8, 0 0 20px rgba(39,192,205,.96)',
              zIndex: 7,
            }}
          />

          <span
            className="partner-particle-three"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#B8F8FA',
              boxShadow:
                '0 0 8px #B8F8FA, 0 0 18px rgba(66,216,225,.94)',
              zIndex: 7,
            }}
          />

          <span
            className="partner-particle-four"
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

      {/* HEALTHCARE ECOSYSTEM */}
      <section className="section partners-ecosystem-section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Healthcare ecosystem"
              title="Different organizations. One connected care environment."
              text="No invented logos or customer claims—only the partner categories central to NourDoc’s ecosystem approach."
            />
          </AnimatedSection>

          <div className="partner-category-grid partner-ecosystem-grid">
            {partnerCategories.map(({ title, icon: Icon }, i) => (
              <AnimatedSection
                className="partner-category partner-ecosystem-card"
                key={title}
                variant="card"
                index={i}
              >
                <header>
                  <span className="partner-category-number">{(i + 1).toString().padStart(2, '0')}</span>
                  <span className="partner-category-icon"><Icon /></span>
                </header>
                <div>
                  <h3>{title}</h3>
                  <p>{partnerDescriptions[title]}</p>
                </div>
                <span className="partner-network-detail" aria-hidden="true"><i /><i /><i /></span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER JOURNEY */}
      <section className="section section-soft partner-journey-section">
        <div className="container partner-journey partner-journey-premium">
          <AnimatedSection>
            <span className="eyebrow">How partnership takes shape</span>
            <h2>Start with the healthcare workflow.</h2>
            <p>
              A focused path from understanding the care environment to a
              responsible implementation approach.
            </p>
          </AnimatedSection>

          <div className="partner-journey-track">
            {[
              ['Discovery', 'Understand the care environment'],
              ['Workflow', 'Identify the documentation opportunity'],
              ['Alignment', 'Align systems, roles and governance'],
              ['Direction', 'Define a responsible path forward'],
            ].map(([label, item], i) => (
              <AnimatedSection className="partner-journey-step" key={item}>
                <span>0{i + 1}</span>
                <div>
                  <small>{label}</small>
                  <h3>{item}</h3>
                </div>
                <i aria-hidden="true" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="section container statement-band">
        <AnimatedSection>
          <p>
            Partnership should make healthcare technology feel more
            connected—not create one more silo.
          </p>

          <Link to="/contact" className="text-link">
            Start a partnership conversation
            <ArrowRight />
          </Link>
        </AnimatedSection>
      </section>

      <CTASection
        title="Become a NourDoc partner."
        text="Let’s explore how NourDoc can support the healthcare organizations and workflows you serve."
        label="Talk to Partnerships"
      />
    </>
  )
}
