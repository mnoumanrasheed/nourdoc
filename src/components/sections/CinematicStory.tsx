import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import homeImage from '../../assets/01-home-clinical-conversation.jpg'
import whyImage from '../../assets/02-why-nourdoc-local-clinician-web.jpg'
import impactImage from '../../assets/04-healthcare-impact-patient-care.jpg'
import securityImage from '../../assets/05-security-clinical-data-workflow.jpg'
import type { HeroVariant } from './HeroMotif'

const SCENE_DURATION = 5000
const SCENE_DURATION_SECONDS = SCENE_DURATION / 1000

function CinematicLines({ variant }: { variant: HeroVariant | 'home' }) {
  const paths = [
    'M-40 390 C180 330 235 170 520 210 S890 360 1240 125',
    'M-60 520 C170 430 330 500 550 330 S910 90 1260 205',
    'M90 720 C220 520 415 590 610 430 S940 360 1210 38',
    'M-25 160 C205 80 365 180 520 125 S850 55 1235 310',
  ]

  return (
    <svg className={`cinematic-lines cinematic-lines-${variant}`} viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((path, index) => <path className={`cinematic-line cinematic-line-${index + 1}`} d={path} pathLength="1" key={path} />)}
    </svg>
  )
}

function CinematicParticles({ variant }: { variant: HeroVariant | 'home' }) {
  return (
    <div className={`cinematic-particle-field cinematic-particles-${variant}`} aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => {
        const depth = index < 5 ? 'far' : index < 10 ? 'mid' : 'near'
        return <i className={`cinematic-particle cinematic-particle-${depth}`} key={index} />
      })}
    </div>
  )
}

type StoryScene = {
  eyebrow: string
  title: ReactNode
  text: string
  image: string
  imageAlt: string
  imagePosition: string
  variant: HeroVariant | 'home'
}

const scenes: StoryScene[] = [
  {
    eyebrow: 'Ambient Intelligence',
    title: <>Patient conversations,<br /><em>perfectly documented.</em></>,
    text: 'NourDoc listens to natural doctor-patient dialogue and creates structured clinical documentation, helping physicians reduce time spent on manual note-taking.',
    image: homeImage,
    imageAlt: 'Physician speaking with a patient in a clinical consultation room',
    imagePosition: '48% center',
    variant: 'home',
  },
  {
    eyebrow: 'Why NourDoc',
    title: 'Traditional documentation was never built for the volume clinicians face today.',
    text: 'Manual note-taking, dictation and human scribing solve different parts of the documentation workflow. NourDoc uses ambient AI to simplify the journey from clinical conversation to structured documentation.',
    image: whyImage,
    imageAlt: 'Clinician speaking with a patient in a professional healthcare environment',
    imagePosition: '62% center',
    variant: 'why',
  },
  {
    eyebrow: 'Healthcare Impact',
    title: 'Measured impact across clinical, financial, operational and patient outcomes.',
    text: 'NourDoc is designed to improve more than the documentation workflow by helping reduce clerical friction around the clinical encounter.',
    image: impactImage,
    imageAlt: 'Physician providing attentive care to a young patient',
    imagePosition: '38% center',
    variant: 'impact',
  },
  {
    eyebrow: 'Security & Compliance',
    title: 'Built for the security bar healthcare enterprises require.',
    text: 'Patient information requires strong privacy, access-control and governance practices. NourDoc positions security and privacy as foundational product requirements.',
    image: securityImage,
    imageAlt: 'Clinician working securely with a laptop in a healthcare environment',
    imagePosition: '46% center',
    variant: 'security',
  },
]

export function CinematicStory() {
  const rootRef = useRef<HTMLElement>(null)
  const currentIndexRef = useRef(0)
  const transitionRef = useRef<gsap.core.Timeline | null>(null)
  const cycleRef = useRef<gsap.core.Timeline | null>(null)
  const goToRef = useRef<(index: number) => void>(() => undefined)
  const pauseRef = useRef<() => void>(() => undefined)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sceneElements = gsap.utils.toArray<HTMLElement>('.cinematic-scene', root)
    const fills = gsap.utils.toArray<HTMLElement>('.cinematic-progress-fill', root)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 600px)').matches
    const context = gsap.context(() => {
      gsap.set(sceneElements, { autoAlpha: 0, zIndex: 0 })
      gsap.set(sceneElements[0], { autoAlpha: 1, zIndex: 1 })
      gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' })

      const stopCycle = () => {
        cycleRef.current?.kill()
        cycleRef.current = null
      }

      const startCycle = () => {
        stopCycle()
        if (document.hidden) return
        gsap.set(fills, { scaleX: 0 })
        const activeFill = fills[currentIndexRef.current]
        cycleRef.current = gsap.timeline({
          onComplete: () => goToRef.current((currentIndexRef.current + 1) % sceneElements.length),
        }).to(activeFill, { scaleX: 1, duration: SCENE_DURATION_SECONDS, ease: 'none' })
      }

      const goTo = (requestedIndex: number) => {
        const nextIndex = (requestedIndex + sceneElements.length) % sceneElements.length
        const currentIndex = currentIndexRef.current
        if (nextIndex === currentIndex) {
          startCycle()
          return
        }

        stopCycle()
        transitionRef.current?.kill()

        const outgoing = sceneElements[currentIndex]
        const incoming = sceneElements[nextIndex]
        const outgoingPhoto = outgoing.querySelector('.cinematic-photo')
        const incomingPhoto = incoming.querySelector('.cinematic-photo')
        const outgoingGrid = outgoing.querySelector('.cinematic-grid')
        const incomingGrid = incoming.querySelector('.cinematic-grid')
        const outgoingLines = outgoing.querySelector('.cinematic-lines')
        const incomingLines = incoming.querySelector('.cinematic-lines')
        const outgoingParticles = outgoing.querySelector('.cinematic-particle-field')
        const incomingParticles = incoming.querySelector('.cinematic-particle-field')
        const outgoingLight = outgoing.querySelector('.cinematic-light')
        const incomingLight = incoming.querySelector('.cinematic-light')
        const outgoingParagraph = outgoing.querySelector('.cinematic-copy > p')
        const outgoingEyebrow = outgoing.querySelector('.cinematic-copy > .eyebrow')
        const outgoingHeading = outgoing.querySelector('.cinematic-copy > h1, .cinematic-copy > h2')
        const outgoingActions = outgoing.querySelector('.cinematic-copy > .cinematic-scene-meta')
        const incomingEyebrow = incoming.querySelector('.cinematic-copy > .eyebrow')
        const incomingHeading = incoming.querySelector('.cinematic-copy > h1, .cinematic-copy > h2')
        const incomingParagraph = incoming.querySelector('.cinematic-copy > p')
        const incomingActions = incoming.querySelector('.cinematic-copy > .cinematic-scene-meta')
        const depth = reduced ? 0 : mobile ? 10 : 28
        const incomingScale = reduced ? 1 : mobile ? 1.025 : 1.06
        const outgoingScale = reduced ? 1 : mobile ? 1.025 : 1.05

        setActiveIndex(nextIndex)
        currentIndexRef.current = nextIndex

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            gsap.set(outgoing, { autoAlpha: 0, zIndex: 0 })
            gsap.set(incoming, { autoAlpha: 1, zIndex: 1 })
          },
        })
        transitionRef.current = timeline

        timeline
          .set(incoming, { autoAlpha: 0, zIndex: 2 })
          .set(incomingPhoto, { scale: incomingScale, x: reduced ? 0 : mobile ? 4 : 12, y: reduced ? 0 : mobile ? 3 : 9, rotateX: reduced || mobile ? 0 : -1.2, rotateY: reduced || mobile ? 0 : .7, filter: 'brightness(1) blur(0px)', opacity: 1 })
          .set(incomingGrid, { opacity: reduced ? 1 : 0, x: reduced ? 0 : -10, y: reduced ? 0 : 7 })
          .set(incomingLines, { opacity: 0, x: reduced ? 0 : mobile ? -4 : -12, y: reduced ? 0 : mobile ? 3 : 8, scale: reduced ? 1 : .98 })
          .set(incomingParticles, { opacity: reduced ? .28 : 0, x: reduced ? 0 : mobile ? 3 : 9, y: reduced ? 0 : mobile ? 4 : 12, scale: reduced ? 1 : .94 })
          .set(incomingLight, { opacity: 0, x: reduced ? 0 : mobile ? 4 : 14, y: reduced ? 0 : -8 })
          .set([incomingEyebrow, incomingHeading, incomingParagraph, incomingActions], { opacity: 0, y: reduced ? 0 : depth })
          .set(incomingHeading, { filter: reduced ? 'blur(0px)' : 'blur(1.5px)' })
          .to(incoming, { autoAlpha: 1, duration: reduced ? .68 : .84 }, 0)
          .to(outgoingParagraph, { opacity: 0, y: reduced ? 0 : -14, duration: .24 }, 0)
          .to(outgoingEyebrow, { opacity: 0, y: reduced ? 0 : -18, duration: .28 }, .06)
          .to(outgoingHeading, { opacity: 0, y: reduced ? 0 : -20, rotateX: reduced || mobile ? 0 : 1.2, filter: reduced ? 'blur(0px)' : 'blur(1.5px)', duration: .4 }, .1)
          .to(outgoingActions, { opacity: 0, y: reduced ? 0 : -16, duration: .26 }, 0)
          .to(outgoingPhoto, { scale: outgoingScale, x: reduced ? 0 : mobile ? -3 : -7, y: reduced ? 0 : -6, rotateX: reduced || mobile ? 0 : 1.1, filter: reduced ? 'brightness(1) blur(0px)' : 'brightness(1.025) blur(1px)', opacity: .52, duration: reduced ? .68 : .96 }, 0)
          .to(outgoingGrid, { opacity: 0, x: reduced ? 0 : 12, y: reduced ? 0 : -6, duration: .48 }, .04)
          .to(outgoingLines, { opacity: 0, x: reduced ? 0 : mobile ? 5 : 16, y: reduced ? 0 : -10, scale: reduced ? 1 : 1.025, duration: reduced ? .45 : .62 }, .02)
          .to(outgoingParticles, { opacity: 0, x: reduced ? 0 : mobile ? -5 : -14, y: reduced ? 0 : mobile ? -6 : -18, scale: reduced ? 1 : 1.06, duration: reduced ? .42 : .68 }, 0)
          .to(outgoingLight, { opacity: 0, x: reduced ? 0 : -18, y: reduced ? 0 : 10, duration: .58 }, .04)
          .to(outgoing, { autoAlpha: 0, duration: reduced ? .56 : .72 }, .22)
          .to(incomingPhoto, { scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, duration: reduced ? .7 : 1.08, ease: 'power3.out' }, 0)
          .to(incomingGrid, { opacity: 1, x: 0, y: 0, duration: .54 }, .12)
          .to(incomingLight, { opacity: 1, x: 0, y: 0, duration: .64 }, .12)
          .to(incomingEyebrow, { opacity: 1, y: 0, duration: .36, ease: 'power3.out' }, .26)
          .to(incomingHeading, { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: .54, ease: 'power3.out' }, .33)
          .to(incomingParagraph, { opacity: 1, y: 0, duration: .42, ease: 'power3.out' }, .49)
          .to(incomingActions, { opacity: 1, y: 0, scale: 1, duration: .42, ease: 'power3.out' }, .62)
          .to(incomingParticles, { opacity: 1, x: 0, y: 0, scale: 1, duration: reduced ? .4 : .64, ease: 'power3.out' }, .58)
          .to(incomingLines, { opacity: 1, x: 0, y: 0, scale: 1, duration: reduced ? .4 : .7, ease: 'power3.out' }, .66)

        startCycle()
      }

      goToRef.current = goTo
      pauseRef.current = stopCycle

      const intro = gsap.timeline()
        .from(sceneElements[0].querySelector('.cinematic-photo'), { scale: reduced ? 1 : mobile ? 1.025 : 1.06, opacity: .6, duration: reduced ? .65 : 1.15, ease: 'power3.out' })
        .from(sceneElements[0].querySelector('.cinematic-grid'), { opacity: 0, x: reduced ? 0 : -9, duration: .48 }, .12)
        .from(sceneElements[0].querySelector('.cinematic-lines'), { opacity: 0, x: reduced ? 0 : -12, scale: reduced ? 1 : .98, duration: .7 }, .58)
        .from(sceneElements[0].querySelector('.cinematic-particle-field'), { opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .94, duration: .7 }, .52)

      startCycle()

      const handleVisibility = () => document.hidden ? stopCycle() : startCycle()
      document.addEventListener('visibilitychange', handleVisibility)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibility)
        intro.kill()
        stopCycle()
        transitionRef.current?.kill()
      }
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className="cinematic-story" aria-label="NourDoc clinical intelligence story">
      <div className="cinematic-story-viewport">
        {scenes.map((scene, index) => (
          <article className={`cinematic-scene cinematic-scene-${scene.variant}`} key={scene.eyebrow} aria-hidden={activeIndex !== index}>
            <div className="cinematic-photo-plane" aria-hidden="true"><img className="cinematic-photo" src={scene.image} alt="" style={{ objectPosition: scene.imagePosition }} fetchPriority={index === 0 ? 'high' : 'auto'} /></div>
            <div className="cinematic-overlay" aria-hidden="true" /><div className="cinematic-grid" aria-hidden="true" /><div className="cinematic-light" aria-hidden="true" />
            <CinematicLines variant={scene.variant} />
            <CinematicParticles variant={scene.variant} />
            <div className="container cinematic-scene-inner"><div className="cinematic-copy">
              <span className="eyebrow">{scene.eyebrow}</span>
              {index === 0 ? <h1>{scene.title}</h1> : <h2>{scene.title}</h2>}
              <p>{scene.text}</p>
              <div className="cinematic-scene-meta">
                {index === 0 && <div className="hero-actions"><Link className="button button-primary" to="/contact">Book a Demo<ArrowRight size={18} /></Link><Link className="text-link" to="/product">Explore the platform<ArrowRight size={17} /></Link></div>}
                {scene.variant === 'security' && <div className="cinematic-trust"><span>HIPAA Aligned</span><span>GDPR Ready</span></div>}
              </div>
            </div></div>
            <span className="sr-only">{scene.imageAlt}</span>
          </article>
        ))}
        <div className="cinematic-controls" onPointerDown={() => pauseRef.current()}>
          <span className="cinematic-counter" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / 04</span>
          <div className="cinematic-progress" aria-label="Choose hero scene">
            {scenes.map((scene, index) => <button type="button" className={`cinematic-progress-dot ${activeIndex === index ? 'is-active' : ''}`} aria-label={`Show scene ${index + 1}: ${scene.eyebrow}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goToRef.current(index)} key={scene.eyebrow}><span className="cinematic-progress-track"><i className="cinematic-progress-fill" /></span></button>)}
          </div>
        </div>
      </div>
    </section>
  )
}
