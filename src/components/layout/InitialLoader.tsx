import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../../assets/nourdoc-logo.png'

const LOADER_DURATION_SECONDS = 5

export function InitialLoader() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLOutputElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const preventScroll = (event: Event) => event.preventDefault()
    let scrollLocked = true

    document.body.setAttribute('aria-busy', 'true')
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

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
      unlockPage()
      setVisible(false)
    }

    const context = gsap.context(() => {
      const progress = { value: 0 }
      const renderProgress = () => {
        if (percentageRef.current) {
          percentageRef.current.textContent = `${Math.round(progress.value)}%`
        }
      }

      if (reduced) {
        gsap.timeline()
          .set('.initial-loader-logo', { opacity: 1, y: 0, filter: 'blur(0px)' })
          .set('.initial-loader-tagline', { opacity: 1 })
          .set('.initial-loader-progress-shell', { opacity: 1, y: 0 })
          .set('.initial-loader-progress-fill', { scaleX: 0, transformOrigin: 'left center' })
          .to(progress, { value: 100, duration: 4.15, ease: 'none', onUpdate: renderProgress }, 0)
          .to('.initial-loader-progress-fill', { scaleX: 1, duration: 4.15, ease: 'none' }, 0)
          .to('.initial-loader-progress-shell', { opacity: 0, y: 2, duration: .4 }, 4.2)
          .to(root, { opacity: 0, duration: .7, ease: 'power2.inOut' }, LOADER_DURATION_SECONDS - .7)
          .call(finish, [], LOADER_DURATION_SECONDS)
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
      })

      timeline
        .set(root, { opacity: 1 })
        .set('.initial-loader-logo', { opacity: 0, y: 8, filter: 'blur(4px)', scale: .99 })
        .set('.initial-loader-orbit-draw', { strokeDasharray: 553, strokeDashoffset: 553, opacity: 0 })
        .set('.initial-loader-orbit-detail', { opacity: 0, rotation: -12, transformOrigin: '50% 50%' })
        .set('.initial-loader-packet', { opacity: 0, rotation: 0, transformOrigin: '100px 100px' })
        .set('.initial-loader-node', { opacity: 0, scale: .7, transformOrigin: '50% 50%' })
        .set('.initial-loader-progress-fill', { scaleX: 0, transformOrigin: 'left center' })
        .set('.initial-loader-progress-shell', { opacity: 0, y: 7 })
        .set('.initial-loader-tagline', { opacity: 0, y: 5 })
        .set('.initial-loader-sweep', { opacity: 0, xPercent: -150 })
        .fromTo('.initial-loader-canvas', { opacity: .84 }, { opacity: 1, duration: 1, ease: 'sine.inOut' }, 0)
        .to('.initial-loader-glow', { opacity: .86, scale: 1, duration: 1.15, ease: 'sine.inOut' }, 0)
        .to('.initial-loader-network', { opacity: .26, duration: 1.1, ease: 'sine.inOut' }, .1)
        .to('.initial-loader-logo', { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'power3.out' }, .42)
        .to('.initial-loader-sweep', { opacity: .56, xPercent: 155, duration: 1.05, ease: 'power2.inOut' }, .62)
        .to('.initial-loader-sweep', { opacity: 0, duration: .25 }, 1.58)
        .to('.initial-loader-orbit-draw', { opacity: .76, strokeDashoffset: 0, duration: 1.55, ease: 'power2.inOut' }, .82)
        .to('.initial-loader-orbit-detail', { opacity: .46, rotation: 0, duration: 1.25, ease: 'sine.inOut' }, .95)
        .to('.initial-loader-node', { opacity: .5, scale: 1, duration: .9, stagger: .09, ease: 'sine.inOut' }, 1)
        .to('.initial-loader-packet', { opacity: 1, duration: .5 }, 1.16)
        .to('.initial-loader-packet', { rotation: 360, duration: 3, ease: 'power1.inOut' }, 1.16)
        .to('.initial-loader-tagline', { opacity: 1, y: 0, duration: .7, ease: 'power2.out' }, .75)
        .to('.initial-loader-progress-shell', { opacity: 1, y: 0, duration: .65, ease: 'power2.out' }, .9)
        .to(progress, { value: 100, duration: 3.25, ease: 'power1.inOut', onUpdate: renderProgress }, .95)
        .to('.initial-loader-progress-fill', { scaleX: 1, duration: 3.25, ease: 'power1.inOut' }, .95)
        .to('.initial-loader-glow', { scale: 1.055, opacity: 1, duration: 1.35, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 1.5)
        .to('.initial-loader-node', { opacity: .28, scale: .88, duration: .72, stagger: { each: .1, repeat: 1, yoyo: true }, ease: 'sine.inOut' }, 2.05)
        .to('.initial-loader-orbit-detail', { rotation: 28, opacity: .64, duration: 1.4, ease: 'sine.inOut' }, 2.75)
        .fromTo('.initial-loader-sweep', { opacity: 0, xPercent: -150 }, { opacity: .38, xPercent: 155, duration: 1.05, ease: 'power2.inOut' }, 3.02)
        .to('.initial-loader-sweep', { opacity: 0, duration: .2 }, 3.98)
        .to('.initial-loader-orbit, .initial-loader-node', { opacity: 0, duration: .68, ease: 'power2.inOut' }, 4.12)
        .to('.initial-loader-tagline, .initial-loader-progress-shell', { opacity: 0, y: 3, duration: .5, ease: 'power2.inOut' }, 4.2)
        .to('.initial-loader-logo', { opacity: .28, scale: .96, y: -2, duration: .7, ease: 'power3.inOut' }, 4.2)
        .to('.initial-loader-canvas', { opacity: .48, duration: .74, ease: 'power3.inOut' }, 4.2)
        .to(root, { opacity: 0, duration: .78, ease: 'power3.inOut' }, LOADER_DURATION_SECONDS - .78)
        .call(finish, [], LOADER_DURATION_SECONDS)
    }, root)

    return () => {
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
              <span className="initial-loader-logo-image"><img src={logo} alt="" /><i className="initial-loader-sweep" aria-hidden="true" /></span>
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
