import { useEffect, useRef } from 'react'
import {
  CloudCog,
  Database,
  KeyRound,
  LifeBuoy,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'
import gsap from 'gsap'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { securityTopics } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

import { securityWorkflowImage as heroImage } from '../data/responsiveImages'

const additional = [
  {
    title: 'Encryption',
    text: 'Encryption is part of the existing security positioning; implementation specifics require confirmation.',
    icon: KeyRound,
  },
  {
    title: 'Data residency',
    text: 'Deployment considerations can include where healthcare information is stored and processed.',
    icon: Database,
  },
  {
    title: 'Zero trust architecture',
    text: 'The existing platform positioning includes a zero-trust security approach.',
    icon: ShieldCheck,
  },
  {
    title: 'Disaster recovery',
    text: 'Resilience planning is part of the enterprise security conversation.',
    icon: RefreshCcw,
  },
  {
    title: 'Business continuity',
    text: 'Operational continuity is considered alongside platform security.',
    icon: LifeBuoy,
  },
  {
    title: 'Secure cloud infrastructure',
    text: 'Existing positioning describes hardened and monitored cloud infrastructure.',
    icon: CloudCog,
  },
]

export default function SecurityCompliance() {
  const heroRef = useRef<HTMLDivElement>(null)
  const outerRingRef = useRef<HTMLDivElement>(null)
  const middleRingRef = useRef<HTMLDivElement>(null)
  const innerRingRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Security & Compliance',
    'NourDoc security positioning covers HIPAA alignment, GDPR readiness, privacy by design, access control, audit logs and secure infrastructure.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entire security visual subtle float
      gsap.to('.security-hero-visual', {
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Security perimeter rings
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to(middleRingRef.current, {
        rotation: -360,
        duration: 16,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to(innerRingRef.current, {
        rotation: 360,
        duration: 11,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Security data lines
      gsap.to('.security-flow-line', {
        strokeDashoffset: -140,
        duration: 5.8,
        repeat: -1,
        ease: 'none',
      })

      // Security nodes
      gsap.to('.security-node', {
        scale: 1.65,
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.23,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Central shield breathing
      gsap.to('.security-core', {
        scale: 1.12,
        boxShadow:
          '0 0 18px rgba(226,255,255,1), 0 0 46px rgba(86,226,233,.92), 0 0 86px rgba(20,153,173,.6)',
        duration: 1.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Lock pulse
      gsap.to('.security-lock', {
        scale: 1.15,
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Expanding trust rings
      gsap.fromTo(
        '.security-pulse-one',
        {
          scale: 0.55,
          opacity: 0.75,
        },
        {
          scale: 1.9,
          opacity: 0,
          duration: 2.7,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      gsap.fromTo(
        '.security-pulse-two',
        {
          scale: 0.55,
          opacity: 0.55,
        },
        {
          scale: 2.15,
          opacity: 0,
          duration: 2.7,
          delay: 1.35,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      // Scanner beam
      gsap.to('.security-scan', {
        rotation: 360,
        duration: 5.5,
        repeat: -1,
        ease: 'none',
        transformOrigin: '0% 100%',
      })

      // Moving verified data packets
      gsap.fromTo(
        '.security-packet-one',
        {
          x: -165,
          y: -102,
          opacity: 0,
          scale: 0.7,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.35,
          duration: 3.6,
          repeat: -1,
          repeatDelay: 0.4,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.security-packet-two',
        {
          x: 165,
          y: -95,
          opacity: 0,
          scale: 0.7,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.35,
          duration: 4,
          delay: 0.7,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.security-packet-three',
        {
          x: 150,
          y: 112,
          opacity: 0,
          scale: 0.7,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.4,
          delay: 1.2,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.security-packet-four',
        {
          x: -150,
          y: 110,
          opacity: 0,
          scale: 0.7,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.8,
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
        className="inner-page-hero inner-page-hero-security"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="security"
          image={heroImage}
          imageAlt="Clinician working securely with a laptop in a healthcare environment"
          imagePosition="46% center"
          eyebrow="Security & Compliance"
          title="Built for the security bar healthcare enterprises require."
          text="Patient information requires strong privacy, access-control and governance practices. NourDoc positions security and privacy as foundational product requirements."
        />

        {/* PREMIUM SECURITY VISUAL */}
        <div
          className="inner-page-hero-visual security-hero-visual"
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
          {/* Dark contrast halo */}
          <div
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(2,22,30,.84) 0%, rgba(4,39,49,.58) 37%, rgba(8,54,64,.23) 61%, transparent 79%)',
              boxShadow:
                '0 0 72px rgba(0,17,24,.48), inset 0 0 50px rgba(55,185,199,.1)',
            }}
          />

          {/* Atmospheric security glow */}
          <div
            style={{
              position: 'absolute',
              inset: '11%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(57,218,228,.19) 0%, rgba(28,161,178,.08) 40%, transparent 72%)',
              filter: 'blur(10px)',
            }}
          />

          {/* CONNECTION NETWORK */}
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
              className="security-flow-line"
              d="M175 175 C134 135 98 102 54 68"
              fill="none"
              stroke="rgba(151,247,250,.82)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="security-flow-line"
              d="M175 175 C218 135 256 102 300 68"
              fill="none"
              stroke="rgba(151,247,250,.82)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="security-flow-line"
              d="M175 175 C218 215 256 250 300 286"
              fill="none"
              stroke="rgba(101,230,238,.72)"
              strokeWidth="1.4"
              strokeDasharray="5 11"
            />

            <path
              className="security-flow-line"
              d="M175 175 C134 215 98 250 54 286"
              fill="none"
              stroke="rgba(101,230,238,.72)"
              strokeWidth="1.4"
              strokeDasharray="5 11"
            />
          </svg>

          {/* EXPANDING TRUST PULSES */}
          <div
            className="security-pulse-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1.5px solid rgba(173,251,253,.88)',
            }}
          />

          <div
            className="security-pulse-two"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '50%',
              border: '1px solid rgba(92,228,236,.66)',
            }}
          />

          {/* OUTER SECURITY PERIMETER */}
          <div
            ref={outerRingRef}
            style={{
              position: 'absolute',
              inset: '8%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(144,246,249,.75)',
              boxShadow:
                '0 0 26px rgba(66,214,224,.2), inset 0 0 28px rgba(39,175,192,.06)',
            }}
          >
            <span
              className="security-node"
              style={{
                position: 'absolute',
                top: '-5px',
                left: '48%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#E9FFFF',
                opacity: 0.82,
                boxShadow:
                  '0 0 9px #E9FFFF, 0 0 24px rgba(72,227,235,.98)',
              }}
            />

            <span
              className="security-node"
              style={{
                position: 'absolute',
                right: '4%',
                bottom: '19%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#69E0E8',
                opacity: 0.78,
                boxShadow:
                  '0 0 8px #69E0E8, 0 0 20px rgba(39,192,206,.96)',
              }}
            />
          </div>

          {/* MIDDLE SECURITY PERIMETER */}
          <div
            ref={middleRingRef}
            style={{
              position: 'absolute',
              inset: '22%',
              borderRadius: '50%',
              border: '1.4px solid rgba(119,235,241,.58)',
            }}
          >
            <span
              className="security-node"
              style={{
                position: 'absolute',
                left: '15%',
                top: '5%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#C6FAFB',
                opacity: 0.8,
                boxShadow:
                  '0 0 8px #C6FAFB, 0 0 19px rgba(62,211,222,.92)',
              }}
            />
          </div>

          {/* INNER SECURITY PERIMETER */}
          <div
            ref={innerRingRef}
            style={{
              position: 'absolute',
              inset: '34%',
              borderRadius: '50%',
              border: '1.3px dashed rgba(184,252,253,.75)',
            }}
          >
            <span
              className="security-node"
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '-5px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#F5FFFF',
                opacity: 0.95,
                boxShadow:
                  '0 0 9px #F5FFFF, 0 0 22px rgba(82,226,234,.98)',
              }}
            />
          </div>

          {/* SCANNING BEAM */}
          <div
            className="security-scan"
            style={{
              position: 'absolute',
              left: '50%',
              top: '9%',
              width: '2px',
              height: '41%',
              background:
                'linear-gradient(to top, rgba(215,255,255,1), rgba(74,222,231,.88), transparent)',
              boxShadow: '0 0 13px rgba(87,231,238,.95)',
              transformOrigin: 'bottom center',
            }}
          />

          {/* CENTRAL SECURITY CORE */}
          <div
            className="security-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '96px',
              height: '96px',
              marginLeft: '-48px',
              marginTop: '-48px',
              borderRadius: '26px',
              border: '1.5px solid rgba(160,247,250,.9)',
              background:
                'linear-gradient(145deg, rgba(10,63,74,.98), rgba(4,34,43,.98))',
              boxShadow:
                '0 0 22px rgba(76,226,234,.3), 0 0 48px rgba(24,162,180,.26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 6,
            }}
          >
            <div
              className="security-lock"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '16px',
                border: '1px solid rgba(181,252,254,.82)',
                background:
                  'linear-gradient(145deg, rgba(25,101,112,.95), rgba(9,58,68,.95))',
                boxShadow:
                  '0 0 16px rgba(122,239,244,.28), inset 0 0 14px rgba(136,244,248,.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DFFFFF',
              }}
            >
              <KeyRound size={22} strokeWidth={1.7} />
            </div>
          </div>

          {/* PRIVACY */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              top: '4%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(3,29,37,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,14,21,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6FDEE5',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              01
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Privacy
            </strong>
          </div>

          {/* ACCESS */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              top: '4%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(3,29,37,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,14,21,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6FDEE5',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              02
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Access
            </strong>
          </div>

          {/* AUDIT */}
          <div
            style={{
              position: 'absolute',
              right: '0%',
              bottom: '3%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(3,29,37,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,14,21,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6FDEE5',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              03
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Audit
            </strong>
          </div>

          {/* RESILIENCE */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              bottom: '3%',
              width: '108px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(3,29,37,.82)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 12px 30px rgba(0,14,21,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                color: '#6FDEE5',
                fontSize: '9px',
                marginBottom: '5px',
                letterSpacing: '.09em',
              }}
            >
              04
            </span>

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Resilience
            </strong>
          </div>

          {/* MOVING VERIFIED DATA PACKETS */}
          <span
            className="security-packet-one"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F0FFFF',
              boxShadow:
                '0 0 9px #F0FFFF, 0 0 21px rgba(68,220,229,.98)',
              zIndex: 7,
            }}
          />

          <span
            className="security-packet-two"
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
            className="security-packet-three"
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
            className="security-packet-four"
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

      {/* TRUST MARKERS */}
      <section className="section container trust-markers">
        <AnimatedSection
          className="trust-marker"
          variant="card"
          interactive
        >
          <span>US</span>

          <div>
            <span className="eyebrow">United States</span>
            <h2>HIPAA Aligned</h2>

            <p>
              Administrative, physical and technical safeguards aligned to
              HIPAA requirements for protected health information.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="trust-marker"
          variant="card"
          interactive
          index={1}
        >
          <span>UK</span>

          <div>
            <span className="eyebrow">U.K. & international</span>
            <h2>GDPR Ready</h2>

            <p>
              Data-subject rights, lawful basis and processing agreements
              supported for international deployments.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* TRUST FRAMEWORK */}
      <section className="section security-preview">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Trust framework"
              title="Privacy, access and accountability."
              text="These carefully scoped terms communicate product direction without claiming certifications that have not been confirmed."
            />
          </AnimatedSection>

          <div className="security-grid">
            {securityTopics.map(({ title, text, icon: Icon }, index) => (
              <AnimatedSection
                className="security-card"
                key={title}
                variant="card"
                interactive
                index={index}
              >
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE RESILIENCE */}
      <section className="section container">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Enterprise resilience"
            title="Security extends beyond the sign-in screen."
            text="Additional existing topics are presented at principle level; detailed implementation language should be validated before launch."
          />
        </AnimatedSection>

        <div className="security-detail-list">
          {additional.map(({ title, text, icon: Icon }, index) => (
            <AnimatedSection key={title} variant="left" index={index}>
              <Icon />

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* PRIVACY PRINCIPLE */}
      <section className="section section-soft">
        <div className="container privacy-principle">
          <AnimatedSection>
            <span className="eyebrow">Patient Privacy By Design</span>

            <h2>
              Consent before capture. Control by role. Review by clinician.
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <p>
              NourDoc’s security story begins with the clinical workflow itself:
              consent-first recording, visible recording controls, limited
              access according to role and clinician review before documentation
              is accepted.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        title="Talk to us about your security requirements."
        text="Discuss deployment, privacy and governance expectations with the NourDoc team."
      />
    </>
  )
}
