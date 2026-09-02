import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Headphones,
  LineChart,
  Mail,
  PlayCircle,
} from 'lucide-react'
import gsap from 'gsap'
// @ts-expect-error The installed package does not include TypeScript declarations.
import ReCAPTCHA from 'react-google-recaptcha'
import { useSearchParams } from 'react-router-dom'

import { DemoBookingFlow } from '../components/contact/DemoBookingFlow'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { useHeroVisualScroll } from '../hooks/useHeroVisualScroll'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  getContactEmailMeta,
  getDefaultInterestForIntent,
  resolveContactIntent,
} from '../utils/contactIntent'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

const departmentContacts = [
  {
    title: 'Sales',
    description: 'For product demonstrations and commercial enquiries.',
    email: 'hello@nour-doc.com',
    ariaLabel: 'Email NourDoc Sales',
    icon: PlayCircle,
  },
  {
    title: 'Support',
    description: 'For product assistance and support enquiries.',
    email: 'support@nour-doc.com',
    ariaLabel: 'Email NourDoc Support',
    icon: Headphones,
  },
  {
    title: 'Partnerships',
    description: 'For strategic, healthcare, and technology partnerships.',
    email: 'hello@nour-doc.com',
    ariaLabel: 'Email NourDoc Partnerships',
    icon: Handshake,
  },
  {
    title: 'Investors',
    description: 'For investor and corporate enquiries.',
    email: 'hello@nour-doc.com',
    ariaLabel: 'Email NourDoc Investors',
    icon: LineChart,
  },
]

type ReCaptchaHandle = {
  reset: () => void
}

type ContactResponse = {
  success?: boolean
  message?: string
  error?: string
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  const reducedMotion = useReducedMotion()
  const [searchParams] = useSearchParams()
  const intent = resolveContactIntent(searchParams.get('intent'))
  const isDemoIntent = intent === 'demo'
  const defaultInterest = getDefaultInterestForIntent(intent)

  const heroRef = useRef<HTMLDivElement>(null)
  useHeroVisualScroll(heroRef)
  const outerRingRef = useRef<HTMLDivElement>(null)
  const innerRingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCaptchaHandle | null>(null)

  usePageMeta(
    isDemoIntent ? 'Book a Demo' : 'Contact',
    isDemoIntent
      ? 'Request a focused NourDoc demonstration shaped around your healthcare organisation and clinical workflow.'
      : 'Contact NourDoc for product demonstrations, trials, sales, support, partnerships or investment inquiries.',
  )

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    const token = recaptchaToken
    if (!token) {
      setRecaptchaError(true)
      return
    }

    setRecaptchaError(false)
    setSubmitError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const organization = String(formData.get('organization') ?? '').trim()
    const emailMeta = getContactEmailMeta(intent, organization)
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      organization,
      intent,
      interest: String(formData.get('interest') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      recaptchaToken: token,
      emailSubject: emailMeta.subject,
      emailHeading: emailMeta.heading,
      submissionType: emailMeta.submissionType,
      replyTo: String(formData.get('email') ?? '').trim(),
    }

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let result: ContactResponse = {}
      try {
        result = await response.json() as ContactResponse
      } catch {
        // The status check below supplies a safe message for invalid responses.
      }

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.error
          || result.message
          || 'We could not send your inquiry. Please try again.',
        )
      }

      formRef.current?.reset()
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
      setSubmitted(true)
    } catch (error) {
      setSubmitted(false)
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'A network error occurred. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overall hero visual float
      gsap.to('.contact-network', {
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Rotating rings
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Flowing route lines
      gsap.to('.contact-flow-line', {
        strokeDashoffset: -150,
        duration: 5.8,
        repeat: -1,
        ease: 'none',
      })

      // Core pulse
      gsap.to('.contact-core', {
        scale: 1.12,
        boxShadow:
          '0 0 18px rgba(236,255,255,1), 0 0 44px rgba(82,225,233,.9), 0 0 82px rgba(31,167,185,.58)',
        duration: 1.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Contact nodes
      gsap.to('.contact-node', {
        scale: 1.18,
        opacity: 1,
        duration: 1.1,
        stagger: {
          each: 0.22,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Pulse waves
      gsap.fromTo(
        '.contact-pulse-one',
        {
          scale: 0.55,
          opacity: 0.68,
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
        '.contact-pulse-two',
        {
          scale: 0.55,
          opacity: 0.5,
        },
        {
          scale: 2.1,
          opacity: 0,
          duration: 2.8,
          delay: 1.4,
          repeat: -1,
          ease: 'power1.out',
        },
      )

      // Incoming inquiry particles
      gsap.fromTo(
        '.contact-particle-one',
        {
          x: -158,
          y: -102,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.4,
          duration: 3.7,
          repeat: -1,
          repeatDelay: 0.35,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.contact-particle-two',
        {
          x: 158,
          y: -100,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.35,
          duration: 4.1,
          delay: 0.7,
          repeat: -1,
          repeatDelay: 0.3,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.contact-particle-three',
        {
          x: 150,
          y: 110,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.5,
          delay: 1.15,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.contact-particle-four',
        {
          x: -150,
          y: 110,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.9,
          delay: 1.5,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      // Center scanner sweep
      gsap.fromTo(
        '.contact-scan',
        {
          x: '-140%',
          opacity: 0,
        },
        {
          x: '240%',
          opacity: 0.75,
          duration: 3.6,
          repeat: -1,
          repeatDelay: 1,
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
        className="inner-page-hero inner-page-hero-contact"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          className="contact-hero-background"
          aria-hidden="true"
          initial={false}
          animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }}
          transition={reducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <PageHero
          variant="contact"
          eyebrow={isDemoIntent ? 'Book a Demo' : 'Contact'}
          title={isDemoIntent
            ? 'See NourDoc in the context of your clinical workflow.'
            : 'Let’s talk about giving your physicians their time back.'}
          text={isDemoIntent
            ? 'Tell us what matters to your organisation so our team can prepare a focused, relevant demonstration.'
            : 'Contact NourDoc for product demonstrations, trials, sales, support, partnerships or investment inquiries.'}
        />

        {isDemoIntent && (
          <a className="contact-demo-scroll-cue" href="#demo-booking-title" aria-label="Scroll to begin the demo booking flow">
            <span>Scroll to begin</span>
            <i aria-hidden="true">
              <b />
            </i>
          </a>
        )}

        {/* PREMIUM CONTACT ROUTING NETWORK */}
        <div
          className="inner-page-hero-visual contact-network"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '3%',
            bottom: '4%',
            width: '350px',
            height: '350px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {/* Background halo */}
          <div
            style={{
              position: 'absolute',
              inset: '-9%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(3,26,33,.92) 0%, rgba(5,42,51,.72) 38%, rgba(8,55,64,.32) 62%, transparent 80%)',
              boxShadow:
                '0 0 74px rgba(0,18,25,.52), inset 0 0 50px rgba(53,184,198,.11)',
            }}
          />

          {/* Atmospheric cyan glow */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(64,222,231,.2) 0%, rgba(38,170,185,.09) 42%, transparent 73%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Routing lines */}
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
              className="contact-flow-line"
              d="M175 175 C135 135 98 101 54 67"
              fill="none"
              stroke="rgba(150,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="contact-flow-line"
              d="M175 175 C218 135 256 101 301 67"
              fill="none"
              stroke="rgba(150,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="contact-flow-line"
              d="M175 175 C218 216 257 249 301 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="contact-flow-line"
              d="M175 175 C134 216 97 249 54 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />
          </svg>

          {/* Pulse rings */}
          <div
            className="contact-pulse-one"
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
            className="contact-pulse-two"
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

          {/* Outer ring */}
          <div
            ref={outerRingRef}
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              border: '1.5px dashed rgba(140,245,249,.72)',
              boxShadow: '0 0 24px rgba(66,213,224,.18)',
            }}
          >
            <span
              className="contact-node"
              style={{
                position: 'absolute',
                top: '-5px',
                left: '48%',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#E8FFFF',
                opacity: 0.8,
                boxShadow:
                  '0 0 8px #E8FFFF, 0 0 22px rgba(72,226,234,.96)',
              }}
            />

            <span
              className="contact-node"
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

          {/* Inner ring */}
          <div
            ref={innerRingRef}
            style={{
              position: 'absolute',
              inset: '27%',
              borderRadius: '50%',
              border: '1.3px solid rgba(121,236,241,.54)',
            }}
          >
            <span
              className="contact-node"
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

          {/* Central inquiry hub */}
          <div
            className="contact-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '108px',
              height: '108px',
              marginLeft: '-54px',
              marginTop: '-54px',
              borderRadius: '26px',
              border: '1.5px solid rgba(158,247,250,.9)',
              background:
                'linear-gradient(145deg, rgba(12,71,81,.98), rgba(5,39,48,.98))',
              boxShadow:
                '0 0 20px rgba(85,228,236,.28), 0 0 45px rgba(30,168,185,.24)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 6,
            }}
          >
            {/* Scan */}
            <div
              className="contact-scan"
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-25%',
                width: '28%',
                height: '145%',
                transform: 'rotate(15deg)',
                background:
                  'linear-gradient(90deg, transparent, rgba(159,248,251,.34), transparent)',
                filter: 'blur(2px)',
              }}
            />

            <strong
              style={{
                position: 'relative',
                zIndex: 2,
                color: '#F4FFFF',
                fontSize: '13px',
              }}
            >
              NourDoc
            </strong>

            <span
              style={{
                position: 'relative',
                zIndex: 2,
                marginTop: '4px',
                color: '#76E1E7',
                fontSize: '8px',
                letterSpacing: '.11em',
                textTransform: 'uppercase',
              }}
            >
              Connect
            </span>
          </div>

          {/* DEMO */}
          <div
            className="contact-node"
            style={{
              position: 'absolute',
              left: '0%',
              top: '4%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.84)',
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Demo
            </strong>
          </div>

          {/* TRIAL */}
          <div
            className="contact-node"
            style={{
              position: 'absolute',
              right: '0%',
              top: '4%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.84)',
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Trial
            </strong>
          </div>

          {/* SUPPORT */}
          <div
            className="contact-node"
            style={{
              position: 'absolute',
              right: '0%',
              bottom: '3%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.84)',
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Support
            </strong>
          </div>

          {/* PARTNERSHIPS */}
          <div
            className="contact-node"
            style={{
              position: 'absolute',
              left: '0%',
              bottom: '3%',
              width: '112px',
              padding: '11px 13px',
              borderRadius: '14px',
              border: '1px solid rgba(137,238,242,.38)',
              background: 'rgba(4,31,39,.84)',
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Partnerships
            </strong>
          </div>

          {/* Flow particles */}
          <span
            className="contact-particle-one"
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
            className="contact-particle-two"
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
            className="contact-particle-three"
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
            className="contact-particle-four"
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

      {isDemoIntent ? (
        <DemoBookingFlow />
      ) : (
        <>
      {/* CONTACT THE RIGHT TEAM */}
      <section
        className="section"
        style={{
          background:
            'radial-gradient(circle at 85% 10%, rgba(53,171,193,.08), transparent 28%), linear-gradient(180deg, #f7fbfb 0%, #f2f7f6 100%)',
          borderTop: '1px solid rgba(18,55,61,.06)',
          borderBottom: '1px solid rgba(18,55,61,.06)',
        }}
      >
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Direct Channels"
              title="Contact the Right Team"
              text="Connect directly with our specialized teams for product demonstrations, technical support, strategic partnerships, or investor relations."
            />
          </AnimatedSection>

          <div className="team-contact-grid">
            {departmentContacts.map(({ title, description, email, ariaLabel, icon: Icon }, index) => (
              <AnimatedSection key={title} variant="card" index={index}>
                <div className="team-contact-card">
                  <div className="team-contact-header">
                    <span className="team-contact-icon">
                      <Icon size={20} />
                    </span>
                    <span className="team-contact-badge">{`0${index + 1}`}</span>
                  </div>

                  <div className="team-contact-body">
                    <h3 className="team-contact-title">{title}</h3>
                    <p className="team-contact-desc">{description}</p>
                  </div>

                  <a
                    href={`mailto:${email}`}
                    className="team-contact-email-link"
                    aria-label={ariaLabel}
                  >
                    <Mail size={15} className="team-contact-mail-icon" />
                    <span>{email}</span>
                    <ArrowUpRight size={14} className="team-contact-arrow" />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="section section-soft">
        <div className="container contact-grid">
          <AnimatedSection>
            <span className="eyebrow">Send an inquiry</span>

            <h2>Tell us what you’re working on.</h2>

            <p>
              We’ll use your details only to respond to your inquiry. Share your
              goals and requirements with our team, and we’ll get back to you promptly.
            </p>

            <div className="contact-note">
              <strong>Prefer direct email?</strong>

              <span>
                Reach our dedicated department teams directly at our published email
                addresses above or via the footer directory.
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="form-success" role="status">
                <span>Thank you</span>

                <h3>Your inquiry is ready for the NourDoc team.</h3>

                <p>
                  Your inquiry has been sent successfully. The NourDoc team
                  will review it and respond as soon as possible.
                </p>

                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={submit}>
                <label>
                  Full Name
                  <input name="name" autoComplete="name" required />
                </label>

                <label>
                  Work Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  Organization
                  <input
                    name="organization"
                    autoComplete="organization"
                    required
                  />
                </label>

                <label>
                  Interest
                  <select name="interest" required defaultValue={defaultInterest}>
                    <option value="" disabled>
                      Select an interest
                    </option>

                    {[
                      'Book a Demo',
                      'Free Trial',
                      'Sales',
                      'Support',
                      'Investor Relations',
                      'Partnership',
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>

                <label className="full-field">
                  Message
                  <textarea name="message" rows={5} required />
                </label>

                <div className="recaptcha-field full-field">
                  <div className="recaptcha-frame">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={(token: string | null) => {
                        setRecaptchaToken(token)
                        if (token) setRecaptchaError(false)
                      }}
                      onExpired={() => setRecaptchaToken(null)}
                      onErrored={() => setRecaptchaToken(null)}
                    />
                  </div>

                  {recaptchaError && (
                    <p className="recaptcha-error" role="alert">
                      Please verify that you are not a robot.
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="form-submit-error full-field" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  className="button button-primary full-field"
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Sending inquiry…' : 'Send inquiry'}
                  <ArrowRight />
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section"
        style={{
          background:
            'radial-gradient(circle at 12% 0%, rgba(53,171,193,.07), transparent 26%), #f7faf9',
          borderTop: '1px solid rgba(18,55,61,.06)',
        }}
      >
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Common questions"
              title="A few useful starting points."
              text="Quick answers to the questions teams most often ask before starting a NourDoc conversation."
            />
          </AnimatedSection>

          <div
            className="faq-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 14,
              marginTop: 34,
            }}
          >
            {[
              [
                'How quickly can we get started?',
                'Practices can be onboarded quickly, while integration timing depends on complexity. Confirm timelines with the NourDoc team.',
              ],
              [
                'Does NourDoc integrate with our existing EMR?',
                'NourDoc has an integration-oriented platform position. Current EMR/HMIS and API availability should be confirmed for your environment.',
              ],
              [
                'Is patient consent required?',
                'The product content describes consent prompts and recording indicators.',
              ],
              [
                'Who reviews generated documentation?',
                'The clinician reviews and approves the generated documentation before the final record is accepted.',
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                style={{
                  borderRadius: 18,
                  border: '1px solid rgba(19,121,139,.12)',
                  background: '#ffffff',
                  boxShadow: '0 14px 34px rgba(16,47,53,.045)',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    padding: '22px 24px',
                    color: '#173d43',
                    fontWeight: 700,
                    fontSize: '.98rem',
                  }}
                >
                  {q}
                </summary>

                <p
                  style={{
                    margin: 0,
                    padding: '0 24px 22px',
                    color: '#667d80',
                    lineHeight: 1.7,
                    fontSize: '.93rem',
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>

          <style>{`
            @media (max-width: 760px) {
              .faq-grid {
                grid-template-columns: 1fr !important;
              }
            }

            .recaptcha-field {
              min-width: 0;
              overflow: hidden;
            }

            .recaptcha-frame {
              width: 304px;
              transform-origin: left top;
            }

            .recaptcha-error {
              margin: 8px 0 0;
              color: #a23d45;
              font-size: .86rem;
              line-height: 1.45;
            }

            .form-submit-error {
              margin: 0;
              color: #a23d45;
              font-size: .86rem;
              line-height: 1.45;
            }

            .contact-form .button:disabled {
              cursor: wait;
              opacity: .7;
            }

            @media (max-width: 360px) {
              .recaptcha-field {
                min-height: 64px;
              }

              .recaptcha-frame {
                transform: scale(.8);
              }
            }

            .faq-grid summary::-webkit-details-marker {
              display: none;
            }

            .faq-grid summary::after {
              content: '+';
              float: right;
              width: 24px;
              height: 24px;
              display: inline-grid;
              place-items: center;
              border-radius: 50%;
              color: #16879a;
              background: rgba(83,171,193,.09);
              border: 1px solid rgba(83,171,193,.14);
              transition: transform .25s ease;
            }

            .faq-grid details[open] summary::after {
              transform: rotate(45deg);
            }
          `}</style>
        </div>
      </section>
        </>
      )}
    </>
  )
}
