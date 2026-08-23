import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import storyImage from '../assets/pakistani-consultation.jpg'
import heroImage from '../assets/07-about-nourdoc-local-doctor-web.jpg'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'

import { buildGroups } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { createAnimationVisibilityController } from '../utils/animationPerformance'

const buildDescriptions = [
  'Ground product decisions in real clinical workflows.',
  'Translate clinical needs into dependable product systems.',
  'Shape terminology, structure and documentation context.',
  'Connect implementation with care-delivery realities.',
]

const roadmap = [
  'More specialty-specific documentation templates',
  'Deeper EMR / HMIS integrations',
  'Clinical AI agents',
  'Expanded multilingual support',
]

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const outerOrbitRef = useRef<HTMLDivElement>(null)
  const innerOrbitRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'About',
    'NourDoc was created to reduce documentation as a barrier between physicians and patients.',
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Whole visual subtle float
      gsap.to('.about-hero-visual', {
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Outer orbit
      gsap.to(outerOrbitRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Inner orbit
      gsap.to(innerOrbitRef.current, {
        rotation: -360,
        duration: 17,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Moving connection lines
      gsap.to('.about-flow-line', {
        strokeDashoffset: -150,
        duration: 6,
        repeat: -1,
        ease: 'none',
      })

      // Central brand core
      gsap.to('.about-core', {
        scale: 1.12,
        boxShadow:
          '0 0 18px rgba(235,255,255,1), 0 0 44px rgba(82,225,233,.9), 0 0 82px rgba(31,167,185,.58)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Peripheral nodes
      gsap.to('.about-node', {
        scale: 1.2,
        opacity: 1,
        duration: 1.15,
        stagger: {
          each: 0.24,
          repeat: -1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      })

      // Pulse rings
      gsap.fromTo(
        '.about-pulse-one',
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
        '.about-pulse-two',
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

      // Flowing data particles
      gsap.fromTo(
        '.about-particle-one',
        {
          x: -150,
          y: -100,
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
        '.about-particle-two',
        {
          x: 150,
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
        '.about-particle-three',
        {
          x: 145,
          y: 105,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1.3,
          duration: 4.7,
          delay: 1.2,
          repeat: -1,
          ease: 'power1.inOut',
        },
      )

      gsap.fromTo(
        '.about-particle-four',
        {
          x: -145,
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
    }, heroRef)

    const stopVisibilityControl = createAnimationVisibilityController(heroRef.current!)
    return () => { stopVisibilityControl(); ctx.revert() }
  }, [])

  return (
    <>
      {/* HERO */}
      <div
        ref={heroRef}
        className="inner-page-hero inner-page-hero-about"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PageHero
          variant="about"
          image={heroImage}
          imageAlt="Physician in a patient-centered consultation"
          imagePosition="44% center"
          eyebrow="About NourDoc"
          title="Built with physicians, for the time they don’t have."
          text="NourDoc was created around the observation that clinicians spend substantial time documenting care. The product aims to reduce documentation as a barrier between physicians and patients."
        />

        {/* PREMIUM ABOUT VISUAL */}
        <div
          className="inner-page-hero-visual about-hero-visual"
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
                'radial-gradient(circle, rgba(3,24,31,.82) 0%, rgba(5,41,50,.55) 38%, rgba(9,55,64,.2) 61%, transparent 79%)',
              boxShadow:
                '0 0 70px rgba(0,18,25,.45), inset 0 0 46px rgba(52,184,198,.1)',
            }}
          />

          {/* Atmospheric glow */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(62,218,228,.18) 0%, rgba(38,170,185,.08) 42%, transparent 72%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Connection network */}
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
              className="about-flow-line"
              d="M175 175 C135 135 98 101 54 67"
              fill="none"
              stroke="rgba(150,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="about-flow-line"
              d="M175 175 C218 135 256 101 301 67"
              fill="none"
              stroke="rgba(150,246,250,.84)"
              strokeWidth="1.5"
              strokeDasharray="6 11"
            />

            <path
              className="about-flow-line"
              d="M175 175 C218 216 257 249 301 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />

            <path
              className="about-flow-line"
              d="M175 175 C134 216 97 249 54 286"
              fill="none"
              stroke="rgba(102,228,236,.74)"
              strokeWidth="1.4"
              strokeDasharray="6 11"
            />
          </svg>

          {/* Pulse rings */}
          <div
            className="about-pulse-one"
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
            className="about-pulse-two"
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
              className="about-node"
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
              className="about-node"
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
              className="about-node"
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

          {/* Central brand hub */}
          <div
            className="about-core"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              borderRadius: '28px',
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
                fontSize: '13px',
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
              Human + AI
            </span>
          </div>

          {/* PHYSICIAN */}
          <div
            className="about-node"
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Physician
            </strong>
          </div>

          {/* CONVERSATION */}
          <div
            className="about-node"
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Conversation
            </strong>
          </div>

          {/* CLINICAL AI */}
          <div
            className="about-node"
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Clinical AI
            </strong>
          </div>

          {/* DOCUMENTATION */}
          <div
            className="about-node"
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

            <strong style={{ color: '#F6FFFF', fontSize: '11px' }}>
              Documentation
            </strong>
          </div>

          {/* Flow particles */}
          <span
            className="about-particle-one"
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
            className="about-particle-two"
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
            className="about-particle-three"
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
            className="about-particle-four"
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

      {/* ORIGIN STORY */}
      <ImageStory
        image={storyImage}
        objectPosition="68% center"
        alt="Physician listening during a consultation"
        eyebrow="Origin story"
        title="The best clinical technology makes room for the human moment."
        text="NourDoc began with a simple observation: the record matters, but so does the conversation that creates it. The platform is designed to make those two needs work together."
      />

      {/* MISSION / VISION */}
      <section className="section container mission-grid">
        <AnimatedSection variant="card" interactive>
          <span className="eyebrow">Mission</span>
          <h2>Return the exam room to the conversation.</h2>
          <p>
            Build technology that removes documentation friction between
            physicians and patients.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="card" interactive index={1}>
          <span className="eyebrow">Vision</span>
          <h2>Ambient intelligence as the standard of care.</h2>
          <p>
            Clinical encounters captured accurately and completely with less
            manual documentation work from physicians.
          </p>
        </AnimatedSection>
      </section>

      {/* HOW WE BUILD */}
      <section className="section section-soft about-build-section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="How we build"
              title="Clinical context meets technical craft."
            />
          </AnimatedSection>

          <div className="build-grid build-grid-premium">
            {buildGroups.map(({ title, icon: Icon }, index) => (
              <AnimatedSection
                className="build-card-premium"
                key={title}
                variant="card"
                interactive
                index={index}
              >
                <header>
                  <span><Icon /></span>
                  <small>0{index + 1}</small>
                </header>
                <h3>{title}</h3>
                <p>{buildDescriptions[index]}</p>
                <i aria-hidden="true" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="section container roadmap">
        <AnimatedSection>
          <span className="eyebrow">Future direction</span>
          <h2>A roadmap, clearly described as a roadmap.</h2>
          <p>
            These themes are future direction and should not be interpreted as
            currently available functionality.
          </p>
        </AnimatedSection>

        <div>
          {roadmap.map((item, i) => (
            <AnimatedSection key={item}>
              <span>0{i + 1}</span>
              <h3>{item}</h3>
              <span className="status-pill future">Roadmap</span>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
