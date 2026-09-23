import { useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { Building2, Cpu, Microscope } from 'lucide-react'

import { PageHero } from '../components/common/PageHero'
import { ResponsivePicture } from '../components/common/ResponsivePicture'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { aboutDoctorImage as heroImage, humanMomentImage } from '../data/responsiveImages'

import { usePageMeta } from '../hooks/usePageMeta'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { createAnimationVisibilityController } from '../utils/animationPerformance'
import { createSafeGsapContext } from '../utils/animationSafety'

type AboutSectionProps = {
  children: ReactNode
  className: string
  id?: string
}

type EyebrowProps = {
  children: ReactNode
  light?: boolean
}

type GlassCardProps = {
  children: ReactNode
}

const collaborationCards = [
  {
    code: 'CA',
    title: 'Canadian Ownership & Global Vision',
    text: 'Canadian ownership gives NourDoc an international corporate foundation and a clear focus on global healthcare markets.',
    icon: Building2,
  },
  {
    code: 'PK',
    title: 'Pakistani AI Engineering',
    text: 'Our engineering team develops the artificial intelligence, machine learning, and product technology that power the NourDoc platform.',
    icon: Cpu,
  },
  {
    code: 'FI',
    title: 'Finnish Research & Clinical Perspectives',
    text: "Finnish research and clinical perspectives support the platform's evidence-informed, clinician-centered evolution.",
    icon: Microscope,
  },
]

const globalRegions = ['North America', 'Europe', 'Middle East', 'Asia']

const clinicianApproachCards = [
  'NourDoc uses Ambient Clinical Intelligence to understand doctor–patient conversations and transform them into structured clinical documentation and actionable clinical information.',
  'The platform is designed to support physicians throughout the clinical workflow, from intelligent documentation and medical coding assistance to the conversion of clinical encounters into structured, useful intelligence.',
  'Our goal is straightforward: reduce the administrative burden on healthcare professionals and give them more time and attention for what matters most—their patients.',
]


function AboutSection({ children, className, id }: AboutSectionProps) {
  return (
    <section id={id} className={`about-v2-section ${className}`}>
      <div className="container about-v2-container">{children}</div>
    </section>
  )
}

function Eyebrow({ children, light = false }: EyebrowProps) {
  return <span className={`about-v2-eyebrow${light ? ' is-light' : ''}`}>{children}</span>
}

function GlassCard({ children }: GlassCardProps) {
  return <div className="about-v2-glass-card">{children}</div>
}

function AboutHeroNetwork() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const context = createSafeGsapContext(root, () => {
      gsap.to('.about-v2-orbit-outer', { rotation: 360, duration: 28, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('.about-v2-orbit-inner', { rotation: -360, duration: 20, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('.about-v2-flow-line', { strokeDashoffset: -150, duration: 7, repeat: -1, ease: 'none' })
      gsap.to('.about-v2-network-core', { scale: 1.055, duration: 1.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.about-v2-network-node', { opacity: 1, duration: 1.4, stagger: { each: .28, repeat: -1, yoyo: true }, ease: 'sine.inOut' })
      gsap.fromTo('.about-v2-network-pulse', { scale: .6, opacity: .5 }, { scale: 1.72, opacity: 0, duration: 3.2, repeat: -1, ease: 'power1.out' })
    }, 'About hero network animation')

    const stopVisibilityControl = createAnimationVisibilityController(root)
    return () => {
      stopVisibilityControl()
      context?.revert()
    }
  }, [reducedMotion])

  return (
    <div ref={rootRef} className="about-v2-network" aria-hidden="true">
      <div className="about-v2-network-glow" />
      <svg viewBox="0 0 360 360" preserveAspectRatio="none">
        <path className="about-v2-flow-line" d="M180 180 C138 140 92 102 42 58" />
        <path className="about-v2-flow-line" d="M180 180 C222 140 268 102 318 58" />
        <path className="about-v2-flow-line" d="M180 180 C222 220 268 260 318 304" />
        <path className="about-v2-flow-line" d="M180 180 C138 220 92 260 42 304" />
      </svg>
      <div className="about-v2-orbit-outer"><i /></div>
      <div className="about-v2-orbit-inner"><i /></div>
      <div className="about-v2-network-pulse" />
      <div className="about-v2-network-core"><strong>NourDoc</strong><small>Human + AI</small></div>
      <span className="about-v2-network-node about-v2-node-one"><small>01</small><strong>Physician</strong></span>
      <span className="about-v2-network-node about-v2-node-two"><small>02</small><strong>Conversation</strong></span>
      <span className="about-v2-network-node about-v2-node-three"><small>03</small><strong>Clinical AI</strong></span>
      <span className="about-v2-network-node about-v2-node-four"><small>04</small><strong>Documentation</strong></span>
    </div>
  )
}

function ClinicianVisual() {
  const visualRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-10, 12])
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], [1.045, 1.02, 1.045])

  return (
    <AnimatedSection className="about-v2-clinician-visual" variant="right">
      <div ref={visualRef} className="about-v2-clinician-frame">
        <ResponsivePicture
          asset={humanMomentImage}
          sizes="(max-width: 900px) calc(100vw - 32px), 48vw"
          pictureClassName="about-v2-clinician-picture"
          alt="Clinician and patient sharing a focused healthcare conversation"
          loading="lazy"
          fetchPriority="auto"
          decoding="async"
          style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
        />
        <span className="about-v2-clinician-chip">Clinical context, understood</span>
      </div>
    </AnimatedSection>
  )
}

function GlobalVisionMotif() {
  return (
    <svg className="about-v2-globe" viewBox="0 0 420 420" aria-hidden="true">
      <circle cx="210" cy="210" r="156" />
      <ellipse cx="210" cy="210" rx="86" ry="156" />
      <ellipse cx="210" cy="210" rx="156" ry="64" />
      <path d="M54 210h312M210 54v312" />
      <g>
        <circle cx="118" cy="152" r="5" />
        <circle cx="210" cy="116" r="5" />
        <circle cx="273" cy="202" r="5" />
        <circle cx="318" cy="250" r="5" />
      </g>
    </svg>
  )
}

export default function About() {
  usePageMeta(
    'About',
    'NourDoc is a Canadian-owned HealthTech company developing the next generation of Ambient Clinical Intelligence for healthcare.',
  )

  return (
    <div className="about-page-v2">
      <div className="about-v2-hero about-v2-hero-classic inner-page-hero inner-page-hero-about">
        <PageHero
          variant="about"
          image={heroImage}
          imageAlt="Physician in a patient-centered consultation"
          imagePosition="44% center"
          eyebrow="ABOUT NOURDOC"
          title="Canadian-owned. Globally ambitious. Built by experts in AI and healthcare."
          text="NourDoc is a Canadian-owned HealthTech company developing the next generation of Ambient Clinical Intelligence for healthcare."
        />
        <AboutHeroNetwork />
      </div>

      <AboutSection id="about-approach" className="about-v2-approach">
        <div className="about-v2-approach-grid">
          <AnimatedSection className="about-v2-approach-copy" variant="left">
            <Eyebrow>OUR APPROACH</Eyebrow>
            <h2>Technology Built Around Clinicians</h2>
            <blockquote>We believe healthcare AI should be designed around the realities of clinical practice—not simply around what technology can do.</blockquote>
            <div className="about-v2-body-copy">
              {clinicianApproachCards.map((text, index) => (
                <AnimatedSection className="about-v2-approach-card" variant="card" interactive index={index} key={text}>
                  <span className="about-v2-approach-card-number">0{index + 1}</span>
                  <p>{text}</p>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          <ClinicianVisual />
        </div>
      </AboutSection>

      <AboutSection className="about-v2-collaboration">
        <AnimatedSection className="about-v2-section-heading about-v2-collaboration-heading">
          <div>
            <Eyebrow light>GLOBAL COLLABORATION</Eyebrow>
            <h2>A Global Collaboration Behind NourDoc</h2>
          </div>
          <div className="about-v2-heading-copy">
            <p className="about-v2-section-lead">NourDoc brings together complementary expertise and perspectives from Canada, Pakistan, and Finland.</p>
            <p>The platform is developed by a highly skilled Pakistani AI engineering team with expertise in artificial intelligence, machine learning, natural language processing, and healthcare technology. Its evolution is informed by Finnish research and clinical perspectives, bringing research-led thinking and real-world clinical insight to the platform.</p>
          </div>
        </AnimatedSection>

        <div className="about-v2-cards" role="list">
          {collaborationCards.map((card, index) => {
            const Icon = card.icon
            return (
              <AnimatedSection className="about-v2-card-reveal" variant="card" interactive index={index} key={card.code}>
                <GlassCard>
                  <div className="about-v2-card-meta">
                    <span className="about-v2-card-number">0{index + 1}</span>
                    <span className="about-v2-country-code">{card.code}</span>
                    <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </GlassCard>
              </AnimatedSection>
            )
          })}
        </div>
      </AboutSection>

      <AboutSection className="about-v2-vision">
        <GlobalVisionMotif />
        <div className="about-v2-vision-grid">
          <AnimatedSection className="about-v2-vision-heading" variant="left">
            <Eyebrow light>GLOBAL VISION</Eyebrow>
            <h2>Our Global Vision</h2>
            <p className="about-v2-vision-subheading">Clinical intelligence should create more room for care.</p>
          </AnimatedSection>

          <AnimatedSection className="about-v2-vision-copy" variant="right">
            <p className="about-v2-vision-lead">Healthcare professionals should not have to choose between spending time with their patients and keeping up with documentation.</p>
            <p>Our vision is to make clinical intelligence ambient, accessible, and useful—helping healthcare organizations capture greater value from every patient encounter while reducing the administrative workload placed on clinicians.</p>
            <p>NourDoc is being built for a global healthcare landscape, with ambitions to support physicians, healthcare professionals, and healthcare organizations across North America, Europe, the Middle East, Asia, and other international markets.</p>
            <div className="about-v2-region-list" aria-label="Global regions">
              {globalRegions.map((region) => <span key={region}>{region}</span>)}
            </div>
          </AnimatedSection>
        </div>

      </AboutSection>
    </div>
  )
}
