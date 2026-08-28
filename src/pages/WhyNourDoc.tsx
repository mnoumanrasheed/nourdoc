import { useEffect, useRef } from 'react'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import {
  pakistaniConsultationImage as localImage,
  whyNourDocImage as heroImage,
} from '../data/responsiveImages'

import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { WorkflowJourney } from '../components/sections/WorkflowJourney'

import { workflow } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

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

const impactCards = [
  {
    number: '01',
    label: 'Less Typing',
    className: 'impact-card-tl',
  },
  {
    number: '02',
    label: 'Patient Focus',
    className: 'impact-card-tr',
  },
  {
    number: '03',
    label: 'Structured Draft',
    className: 'impact-card-br',
  },
  {
    number: '04',
    label: 'Clinician Control',
    className: 'impact-card-bl',
  },
]

export default function WhyNourDoc() {
  const heroWrapRef = useRef<HTMLDivElement>(null)
  const visualShellRef = useRef<HTMLDivElement>(null)

  usePageMeta(
    'Why NourDoc',
    'See how NourDoc simplifies the journey from clinical conversation to structured, clinician-reviewed documentation.',
  )

  useEffect(() => {
    const hero = heroWrapRef.current
    const shell = visualShellRef.current

    if (!hero || !shell) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loops: gsap.core.Tween[] = []

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shell,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: 'power3.out' },
      )

      if (reducedMotion) return

      // Outer orbit: clockwise
      const outerOrbit = shell.querySelector<HTMLElement>('.why-impact-orbit-outer')
      if (outerOrbit) {
        gsap.set(outerOrbit, { transformOrigin: '50% 50%', rotation: 0 })
        loops.push(gsap.to(outerOrbit, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
        }))
      }

      // Middle orbit: counter-clockwise
      const middleOrbit = shell.querySelector<HTMLElement>('.why-impact-orbit-middle')
      if (middleOrbit) {
        gsap.set(middleOrbit, { transformOrigin: '50% 50%', rotation: 0 })
        loops.push(gsap.to(middleOrbit, {
          rotation: -360,
          duration: 8,
          repeat: -1,
          ease: 'none',
        }))
      }

      // Inner orbit: clockwise
      const innerOrbit = shell.querySelector<HTMLElement>('.why-impact-orbit-inner')
      if (innerOrbit) {
        gsap.set(innerOrbit, { transformOrigin: '50% 50%', rotation: 0 })
        loops.push(gsap.to(innerOrbit, {
          rotation: 360,
          duration: 5.8,
          repeat: -1,
          ease: 'none',
        }))
      }

      // Center hub float
      const center = shell.querySelector<HTMLElement>('.why-impact-center')
      if (center) {
        loops.push(gsap.to(center, {
          y: -4,
          scale: 1.025,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }))
      }

      // Core glow breathe
      const coreGlow = shell.querySelector<HTMLElement>('.why-impact-core-glow')
      if (coreGlow) {
        loops.push(gsap.to(coreGlow, {
          scale: 1.2,
          opacity: 1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }))
      }

      // Outer container float
      const floatEl = shell.querySelector<HTMLElement>('.why-impact-float')
      if (floatEl) {
        loops.push(gsap.to(floatEl, {
          x: 3,
          y: -8,
          scale: 1.008,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }))
      }

      // Orbit nodes pulse
      const nodes = gsap.utils.toArray<HTMLElement>('.why-impact-node', shell)
      nodes.forEach((node, i) => {
        loops.push(gsap.to(node, {
          scale: 1.65,
          opacity: 1,
          duration: 1.45,
          delay: i * 0.22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }))
      })

      // Pulse rings expand
      const pulseOne = shell.querySelector<HTMLElement>('.why-impact-pulse-one')
      const pulseTwo = shell.querySelector<HTMLElement>('.why-impact-pulse-two')
      if (pulseOne) {
        loops.push(gsap.fromTo(pulseOne,
          { scale: 0.65, opacity: 0.55 },
          { scale: 1.85, opacity: 0, duration: 2.6, repeat: -1, ease: 'power1.out' },
        ))
      }
      if (pulseTwo) {
        loops.push(gsap.fromTo(pulseTwo,
          { scale: 0.65, opacity: 0.55 },
          { scale: 1.85, opacity: 0, duration: 2.6, delay: 1.3, repeat: -1, ease: 'power1.out' },
        ))
      }

      // SVG connection line dash flow
      const flowPaths = gsap.utils.toArray<SVGPathElement>('.why-impact-flow', shell)
      flowPaths.forEach((path) => {
        gsap.set(path, { strokeDasharray: '8 14', strokeDashoffset: 0 })
        loops.push(gsap.to(path, {
          strokeDashoffset: -80,
          duration: 2.8,
          repeat: -1,
          ease: 'none',
        }))
      })

      // Corner cards gentle float
      const cardTL = shell.querySelector<HTMLElement>('.impact-card-tl')
      const cardTR = shell.querySelector<HTMLElement>('.impact-card-tr')
      const cardBR = shell.querySelector<HTMLElement>('.impact-card-br')
      const cardBL = shell.querySelector<HTMLElement>('.impact-card-bl')
      if (cardTL) loops.push(gsap.to(cardTL, { x: -4, y: -8, duration: 4.1, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      if (cardTR) loops.push(gsap.to(cardTR, { x: 4, y: -7, duration: 4.8, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      if (cardBR) loops.push(gsap.to(cardBR, { x: 4, y: 7, duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      if (cardBL) loops.push(gsap.to(cardBL, { x: -4, y: 7, duration: 5.1, repeat: -1, yoyo: true, ease: 'sine.inOut' }))

      // Particles float
      const pA = shell.querySelector<HTMLElement>('.why-impact-particle-a')
      const pB = shell.querySelector<HTMLElement>('.why-impact-particle-b')
      const pC = shell.querySelector<HTMLElement>('.why-impact-particle-c')
      if (pA) loops.push(gsap.to(pA, { x: 15, y: -12, scale: 1.35, opacity: 1, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' }))
      if (pB) loops.push(gsap.to(pB, { x: -12, y: 15, scale: 1.25, opacity: 1, duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 }))
      if (pC) loops.push(gsap.to(pC, { x: 11, y: 12, scale: 1.3, opacity: 1, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.0 }))

    }, hero)

    // Start playing immediately (shell is visible on page load)
    gsap.ticker.wake()

    // Pause when scrolled off-screen, resume when back in view
    const observer = new IntersectionObserver(([entry]) => {
      loops.forEach((loop) => {
        if (entry.isIntersecting) {
          gsap.ticker.wake()
          loop.resume()
        } else {
          loop.pause()
        }
      })
    }, { threshold: 0.05 })
    observer.observe(shell)

    return () => {
      observer.disconnect()
      loops.forEach((loop) => loop.kill())
      ctx.revert()
    }
  }, [])

  return (
    <>
      <div
        ref={heroWrapRef}
        className="inner-page-hero inner-page-hero-why why-impact-hero"
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

        <div
          ref={visualShellRef}
          className="why-impact-shell"
          aria-hidden="true"
        >
          <div className="why-impact-float">
            <div className="why-impact-ambient" />
            <div className="why-impact-glass-disc" />

            <svg
              className="why-impact-connections"
              viewBox="0 0 400 400"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                className="why-impact-flow"
                d="M82 91 C128 52 164 58 200 101"
              />

              <path
                className="why-impact-flow"
                d="M200 101 C240 57 279 57 318 91"
              />

              <path
                className="why-impact-flow"
                d="M318 309 C280 344 240 341 200 301"
              />

              <path
                className="why-impact-flow"
                d="M200 301 C160 341 119 341 82 307"
              />
            </svg>

            <div className="why-impact-pulse why-impact-pulse-one" />
            <div className="why-impact-pulse why-impact-pulse-two" />

            <div className="why-impact-orbit why-impact-orbit-outer">
              <span className="why-impact-node node-outer-one" />
              <span className="why-impact-node node-outer-two" />
              <span className="why-impact-node node-outer-three" />
            </div>

            <div className="why-impact-orbit why-impact-orbit-middle">
              <span className="why-impact-node node-middle-one" />
              <span className="why-impact-node node-middle-two" />
            </div>

            <div className="why-impact-orbit why-impact-orbit-inner">
              <span className="why-impact-node node-inner-one" />
            </div>

            <div className="why-impact-center">
              <div className="why-impact-core-glow" />

              <div className="why-impact-core">
                <strong>NourDoc</strong>
                <span>WHY IT MATTERS</span>
              </div>
            </div>

            {impactCards.map((card) => (
              <div
                key={card.number}
                className={`why-impact-card ${card.className}`}
              >
                <span>{card.number}</span>
                <strong>{card.label}</strong>
              </div>
            ))}

            <span className="why-impact-particle why-impact-particle-a" />
            <span className="why-impact-particle why-impact-particle-b" />
            <span className="why-impact-particle why-impact-particle-c" />
          </div>
        </div>
      </div>

      <section className="section container problem-grid">
        <AnimatedSection>
          <span className="eyebrow">
            The documentation gap
          </span>

          <h2>
            Care happens in conversation. Records still demand a
            separate workflow.
          </h2>
        </AnimatedSection>

        <AnimatedSection className="large-copy">
          <p>
            When documentation competes with the patient encounter,
            clinicians must divide their attention or finish the work
            later. NourDoc is designed around a simpler idea: let the
            natural conversation become the starting point.
          </p>
        </AnimatedSection>
      </section>

      <section className="section section-soft why-workflow-section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              eyebrow="A different workflow"
              title="From fragmented tasks to one clinician-controlled journey."
            />
          </AnimatedSection>

          <WorkflowJourney
            steps={workflow}
            premium
          />
        </div>
      </section>

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

          {comparison.map(
            ([dimension, traditional, nourdoc]) => (
              <div
                className="comparison-row"
                key={dimension}
              >
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
            ),
          )}
        </AnimatedSection>
      </section>

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

      <section className="section container statement-band">
        <AnimatedSection>
          <p>
            Clinical intelligence should feel less like another system
            to manage—and more like documentation quietly keeping pace.
          </p>

          <Link
            to="/product"
            className="text-link"
          >
            See the product workflow
            <ArrowRight />
          </Link>
        </AnimatedSection>
      </section>

      <CTASection
        title="See the difference in your own workflow."
        label="Book a Demo"
      />

      <style>{`
        .why-impact-hero {
          position: relative;
          overflow: hidden;
        }

        /* =========================================================
           POSITION LIKE PRODUCT PAGE
        ========================================================= */

        .why-impact-shell {
          position: absolute;

          right: 2.3%;
          bottom: 3%;

          width: clamp(285px, 25vw, 350px);
          aspect-ratio: 1;

          z-index: 5;

          pointer-events: none;

          will-change: transform, opacity;
        }

        .why-impact-float {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        /* =========================================================
           ATMOSPHERE
        ========================================================= */

        .why-impact-ambient {
          position: absolute;

          inset: -9%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(67, 211, 222, .21) 0%,
              rgba(38, 145, 160, .12) 34%,
              rgba(5, 37, 47, .16) 58%,
              transparent 76%
            );

          filter: blur(12px);
        }

        .why-impact-glass-disc {
          position: absolute;

          inset: 4%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 42% 35%,
              rgba(194, 250, 250, .11),
              rgba(37, 130, 144, .14) 32%,
              rgba(3, 31, 40, .26) 68%,
              rgba(3, 22, 29, .38) 100%
            );

          border:
            1px solid rgba(135, 230, 235, .14);

          box-shadow:
            inset 0 0 55px rgba(80, 218, 226, .08),
            0 22px 62px rgba(0, 14, 20, .25);

          backdrop-filter: blur(4px);
        }

        /* =========================================================
           CONNECTION LINES
        ========================================================= */

        .why-impact-connections {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: visible;
        }

        .why-impact-flow {
          stroke: rgba(103, 224, 232, .82);
          stroke-width: 1.4;
          stroke-dasharray: 4 8;
          stroke-linecap: round;
          filter: drop-shadow(0 0 4px rgba(91, 224, 232, .38));
        }

        /* =========================================================
           ORBITS
        ========================================================= */

        .why-impact-orbit {
          position: absolute;
          border-radius: 50%;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .why-impact-orbit-outer {
          width: 66%;
          height: 66%;
          left: 17%;
          top: 17%;
          border: 1px dashed rgba(104, 226, 234, .82);
          box-shadow:
            0 0 24px rgba(55, 201, 213, .13),
            inset 0 0 25px rgba(55, 201, 213, .07);
        }

        .why-impact-orbit-middle {
          width: 46%;
          height: 46%;
          left: 27%;
          top: 27%;
          border: 1px solid rgba(111, 227, 234, .68);
        }

        .why-impact-orbit-inner {
          width: 29%;
          height: 29%;
          left: 35.5%;
          top: 35.5%;
          border: 1px dashed rgba(171, 245, 248, .86);
        }

        /* =========================================================
           ORBIT DOTS
        ========================================================= */

        .why-impact-node {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ebffff;
          opacity: .55;
          box-shadow:
            0 0 8px rgba(234, 255, 255, 1),
            0 0 18px rgba(72, 224, 233, .95),
            0 0 28px rgba(72, 224, 233, .45);
          will-change: transform, opacity;
        }

        .node-outer-one {
          top: -4px;
          left: 48%;
        }

        .node-outer-two {
          right: 8%;
          bottom: 18%;
          animation-delay: .3s !important;
        }

        .node-outer-three {
          left: 2%;
          top: 39%;
          animation-delay: .65s !important;
        }

        .node-middle-one {
          right: -4px;
          top: 48%;
          animation-delay: .22s !important;
        }

        .node-middle-two {
          left: 13%;
          top: 9%;
          animation-delay: .55s !important;
        }

        .node-inner-one {
          left: 48%;
          bottom: -4px;
          animation-delay: .8s !important;
        }

        /* =========================================================
           CENTER
        ========================================================= */

        .why-impact-center {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 92px;
          height: 92px;
          margin-left: -46px;
          margin-top: -46px;
          z-index: 8;
          will-change: transform;
        }

        .why-impact-core-glow {
          position: absolute;
          inset: -18%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(84, 231, 238, .24),
              rgba(27, 141, 158, .12) 45%,
              transparent 72%
            );
          border: 1px solid rgba(99, 230, 237, .25);
          box-shadow: 0 0 28px rgba(71, 218, 228, .18);
          opacity: .72;
          will-change: transform, opacity;
        }

        .why-impact-core {
          position: absolute;

          inset: 0;

          border-radius: 50%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              145deg,
              rgba(5, 55, 67, .98),
              rgba(3, 32, 42, .99)
            );

          border:
            1.5px solid rgba(100, 238, 243, .9);

          box-shadow:
            inset 0 0 20px rgba(61, 215, 224, .1),
            0 0 18px rgba(48, 203, 215, .22);

          color: #f4ffff;
        }

        .why-impact-core strong {
          font-size: 11px;
          line-height: 1;

          font-weight: 700;

          letter-spacing: -.02em;
        }

        .why-impact-core span {
          margin-top: 6px;

          font-size: 5px;

          font-weight: 700;

          letter-spacing: .11em;

          color: #68dbe3;
        }

        /* =========================================================
           PULSES
        ========================================================= */

        .why-impact-pulse {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 90px;
          height: 90px;

          margin-left: -45px;
          margin-top: -45px;

          border-radius: 50%;

          border:
            1px solid rgba(103, 229, 237, .52);

          transform-origin: center;

          will-change: transform, opacity;
        }

        .why-impact-pulse-one {
          will-change: transform, opacity;
        }

        .why-impact-pulse-two {
          will-change: transform, opacity;
        }

        /* =========================================================
           CARDS
        ========================================================= */

        .why-impact-card {
          position: absolute;

          z-index: 12;

          width: 88px;
          min-height: 52px;

          padding: 9px 10px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          border-radius: 10px;

          background:
            linear-gradient(
              145deg,
              rgba(8, 62, 74, .97),
              rgba(3, 42, 52, .98)
            );

          border:
            1px solid rgba(99, 222, 230, .28);

          box-shadow:
            0 12px 28px rgba(0, 16, 24, .32),
            inset 0 1px 0 rgba(255, 255, 255, .05);

          backdrop-filter: blur(12px);

          color: #f3ffff;

          will-change: transform;
        }

        .why-impact-card span {
          color: #70e0e7;

          font-size: 7px;

          line-height: 1;

          font-weight: 700;

          letter-spacing: .08em;
        }

        .why-impact-card strong {
          margin-top: 8px;

          font-size: 8px;

          line-height: 1.15;

          font-weight: 650;

          white-space: normal;
        }

        .impact-card-tl {
          top: 8%;
          left: 0;
          will-change: transform;
        }

        .impact-card-tr {
          top: 8%;
          right: 0;
          will-change: transform;
        }

        .impact-card-br {
          right: 0;
          bottom: 8%;

          will-change: transform;
        }

        .impact-card-bl {
          left: 0;
          bottom: 8%;
          will-change: transform;
        }

        /* =========================================================
           PARTICLES
        ========================================================= */

        .why-impact-particle {
          position: absolute;

          border-radius: 50%;

          background:
            rgba(116, 232, 238, .92);

          box-shadow:
            0 0 8px rgba(107, 229, 236, .8);

          z-index: 5;

          will-change: transform, opacity;
        }

        .why-impact-particle-a {
          width: 5px;
          height: 5px;
          left: 22%;
          top: 44%;
          opacity: .45;
          will-change: transform, opacity;
        }

        .why-impact-particle-b {
          width: 4px;
          height: 4px;
          right: 18%;
          top: 34%;
          opacity: .45;
          will-change: transform, opacity;
        }

        .why-impact-particle-c {
          width: 5px;
          height: 5px;
          right: 24%;
          bottom: 25%;
          opacity: .45;
          will-change: transform, opacity;
        }



        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 1100px) {
          .why-impact-shell {
            right: 1.5%;
            bottom: 4%;

            width: clamp(270px, 27vw, 320px);
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 768px) {
          .why-impact-shell {
            position: relative;

            right: auto;
            bottom: auto;

            width: min(86vw, 310px);

            margin: 22px auto 8px;

            z-index: 4;
          }

          .why-impact-float {
            animation: none;
          }

          .why-impact-card {
            width: 74px;
            min-height: 48px;

            padding: 8px;

            border-radius: 9px;
          }

          .why-impact-card strong {
            font-size: 7.5px;
          }

          .why-impact-center {
            width: 82px;
            height: 82px;

            margin-left: -41px;
            margin-top: -41px;
          }
        }

        @keyframes whyImpactMobileFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -4px, 0);
          }
        }

        @media (max-width: 430px) {
          .why-impact-shell {
            width: min(90vw, 290px);
          }

          .why-impact-card {
            width: 68px;
            min-height: 45px;

            padding: 7px;
          }

          .why-impact-card strong {
            font-size: 7px;
          }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .why-impact-float,
          .why-impact-orbit,
          .why-impact-center,
          .why-impact-core-glow,
          .why-impact-pulse,
          .why-impact-card,
          .why-impact-node,
          .why-impact-particle,
          .why-impact-flow {
            animation: none !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}