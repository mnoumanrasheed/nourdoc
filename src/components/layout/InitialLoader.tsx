import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../../assets/nourdoc-logo.png'

const MIN_LOADER_SECONDS = 1.8
const MAX_LOADER_SECONDS = 4

export function InitialLoader() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLOutputElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const preventScroll = (event: Event) => event.preventDefault()
    const progress = { value: 0 }
    let scrollLocked = true
    let finished = false
    let minimumElapsed = false
    let heroReady = document.documentElement.dataset.heroReady === 'true'
    let mainTimeline: gsap.core.Timeline | null = null
    let exitTimeline: gsap.core.Timeline | null = null

    document.body.setAttribute('aria-busy', 'true')
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    const renderProgress = () => {
      if (percentageRef.current) {
        percentageRef.current.textContent = `${Math.round(progress.value)}%`
      }
    }

    const unlockPage = () => {
      if (!scrollLocked) return
      scrollLocked = false
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      document.documentElement.classList.remove('initial-loading')
      document.body.removeAttribute('aria-busy')
      window.dispatchEvent(new Event('nourdoc:ready'))
    }

    const finish = () => {
      if (finished) return
      finished = true
      unlockPage()
      setVisible(false)
    }

    const completeEarly = () => {
      if (!minimumElapsed || !heroReady || finished || !mainTimeline) return
      if (mainTimeline.time() >= MAX_LOADER_SECONDS - .45) return

      mainTimeline.pause()
      exitTimeline?.kill()
      exitTimeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
        .to(progress, { value: 100, duration: .16, onUpdate: renderProgress }, 0)
        .to('.initial-loader-progress-fill', { scaleX: 1, duration: .16 }, 0)
        .to('.initial-loader-orbit, .initial-loader-node, .initial-loader-tagline, .initial-loader-progress-shell', { opacity: 0, y: 2, duration: .22 }, .04)
        .to('.initial-loader-logo', { opacity: .42, scale: .98, duration: .24 }, .04)
        .to(root, { opacity: 0, duration: .32 }, .08)
        .call(finish, [], .4)
    }

    const onHeroReady = () => {
      heroReady = true
      completeEarly()
    }
    window.addEventListener('nourdoc:hero-ready', onHeroReady)

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
      mainTimeline = timeline

      timeline
        .set(root, { opacity: 1 })
        .set('.initial-loader-progress-fill', { scaleX: 0, transformOrigin: 'left center' })

      if (reduced) {
        timeline
          .set('.initial-loader-logo', { opacity: 1, y: 0, filter: 'blur(0px)' })
          .set('.initial-loader-tagline', { opacity: 1 })
          .set('.initial-loader-progress-shell', { opacity: 1, y: 0 })
          .to(progress, { value: 100, duration: 3.2, ease: 'none', onUpdate: renderProgress }, .2)
          .to('.initial-loader-progress-fill', { scaleX: 1, duration: 3.2, ease: 'none' }, .2)
          .to('.initial-loader-tagline, .initial-loader-progress-shell', { opacity: 0, duration: .25 }, 3.35)
          .to(root, { opacity: 0, duration: .4, ease: 'power2.inOut' }, 3.6)
          .call(finish, [], MAX_LOADER_SECONDS)
        return
      }

      timeline
        .set('.initial-loader-logo', { opacity: 0, y: 8, filter: 'blur(4px)', scale: .99 })
        .set('.initial-loader-orbit-draw', { strokeDasharray: 553, strokeDashoffset: 553, opacity: 0 })
        .set('.initial-loader-orbit-detail', { opacity: 0, rotation: -12, transformOrigin: '50% 50%' })
        .set('.initial-loader-packet', { opacity: 0, rotation: 0, transformOrigin: '100px 100px' })
        .set('.initial-loader-node', { opacity: 0, scale: .7, transformOrigin: '50% 50%' })
        .set('.initial-loader-progress-shell', { opacity: 0, y: 7 })
        .set('.initial-loader-tagline', { opacity: 0, y: 5 })
        .set('.initial-loader-sweep', { opacity: 0, xPercent: -150 })
        .fromTo('.initial-loader-canvas', { opacity: .84 }, { opacity: 1, duration: .65, ease: 'sine.inOut' }, 0)
        .to('.initial-loader-glow', { opacity: .86, scale: 1, duration: .8, ease: 'sine.inOut' }, 0)
        .to('.initial-loader-network', { opacity: .26, duration: .75, ease: 'sine.inOut' }, .05)
        .to('.initial-loader-logo', { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: .65, ease: 'power3.out' }, .2)
        .to('.initial-loader-sweep', { opacity: .56, xPercent: 155, duration: .72, ease: 'power2.inOut' }, .32)
        .to('.initial-loader-sweep', { opacity: 0, duration: .16 }, 1.02)
        .to('.initial-loader-orbit-draw', { opacity: .76, strokeDashoffset: 0, duration: 1.05, ease: 'power2.inOut' }, .42)
        .to('.initial-loader-orbit-detail', { opacity: .46, rotation: 0, duration: .9, ease: 'sine.inOut' }, .5)
        .to('.initial-loader-node', { opacity: .5, scale: 1, duration: .55, stagger: .07, ease: 'sine.inOut' }, .55)
        .to('.initial-loader-packet', { opacity: 1, duration: .3 }, .7)
        .to('.initial-loader-packet', { rotation: 360, duration: 2, ease: 'power1.inOut' }, .7)
        .to('.initial-loader-tagline', { opacity: 1, y: 0, duration: .45, ease: 'power2.out' }, .38)
        .to('.initial-loader-progress-shell', { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, .5)
        .to(progress, { value: 100, duration: 2.75, ease: 'power1.inOut', onUpdate: renderProgress }, .55)
        .to('.initial-loader-progress-fill', { scaleX: 1, duration: 2.75, ease: 'power1.inOut' }, .55)
        .to('.initial-loader-glow', { scale: 1.045, opacity: 1, duration: 1.1, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 1.15)
        .to('.initial-loader-node', { opacity: .28, scale: .9, duration: .55, stagger: { each: .07, repeat: 1, yoyo: true }, ease: 'sine.inOut' }, 1.5)
        .to('.initial-loader-orbit-detail', { rotation: 24, opacity: .62, duration: .9, ease: 'sine.inOut' }, 2.1)
        .fromTo('.initial-loader-sweep', { opacity: 0, xPercent: -150 }, { opacity: .38, xPercent: 155, duration: .7, ease: 'power2.inOut' }, 2.45)
        .to('.initial-loader-sweep', { opacity: 0, duration: .15 }, 3.12)
        .to('.initial-loader-orbit, .initial-loader-node', { opacity: 0, duration: .35, ease: 'power2.inOut' }, 3.25)
        .to('.initial-loader-tagline, .initial-loader-progress-shell', { opacity: 0, y: 3, duration: .28, ease: 'power2.inOut' }, 3.35)
        .to('.initial-loader-logo', { opacity: .32, scale: .97, y: -2, duration: .4, ease: 'power3.inOut' }, 3.42)
        .to('.initial-loader-canvas', { opacity: .48, duration: .4, ease: 'power3.inOut' }, 3.5)
        .to(root, { opacity: 0, duration: .4, ease: 'power3.inOut' }, 3.6)
        .call(finish, [], MAX_LOADER_SECONDS)
    }, root)

    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true
      completeEarly()
    }, MIN_LOADER_SECONDS * 1000)

    return () => {
      window.clearTimeout(minimumTimer)
      window.removeEventListener('nourdoc:hero-ready', onHeroReady)
      exitTimeline?.kill()
      context.revert()
      unlockPage()
    }
  }, [])

  if (!visible) return null

  return (
    <div ref={rootRef} className="initial-loader" role="status" aria-label="Loading NourDoc">
      <div className="initial-loader-canvas">
        <div className="initial-loader-glow" aria-hidden="true" />
        <svg className="initial-loader-network" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-60 650 C280 570 390 705 695 515 S1110 360 1500 445" />
          <path d="M210 -30 C360 190 590 210 720 430 S960 750 1270 940" />
          <path d="M1180 -40 C1040 190 1070 330 850 455 S520 570 405 930" />
        </svg>
        <div className="initial-loader-nodes" aria-hidden="true">
          <i className="initial-loader-node" /><i className="initial-loader-node" />
          <i className="initial-loader-node" /><i className="initial-loader-node" />
          <i className="initial-loader-node" /><i className="initial-loader-node" />
        </div>

        <div className="initial-loader-stage">
          <div className="initial-loader-mark">
            <svg className="initial-loader-orbit" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="initial-loader-orbit-quiet" cx="100" cy="100" r="88" />
              <circle className="initial-loader-orbit-draw" cx="100" cy="100" r="88" />
              <circle className="initial-loader-orbit-detail" cx="100" cy="100" r="74" />
              <g className="initial-loader-packet"><circle cx="100" cy="12" r="3.6" /></g>
            </svg>
            <div className="initial-loader-logo" role="img" aria-label="NourDoc">
              <span className="initial-loader-logo-image"><img src={logo} alt="" width="240" height="240" loading="eager" fetchPriority="high" decoding="async" /><i className="initial-loader-sweep" aria-hidden="true" /></span>
              <strong>Nour<span>Doc</span></strong>
            </div>
          </div>

          <p className="initial-loader-tagline">Ambient clinical intelligence</p>
          <div className="initial-loader-progress-shell">
            <div className="initial-loader-progress-meta">
              <span className="initial-loader-status"><i aria-hidden="true" />Preparing your experience</span>
              <output ref={percentageRef} className="initial-loader-percentage" aria-hidden="true">0%</output>
            </div>
            <div className="initial-loader-progress" aria-hidden="true"><i className="initial-loader-progress-fill" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
