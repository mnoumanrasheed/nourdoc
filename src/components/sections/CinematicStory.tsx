import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Activity, ArrowRight, ArrowUpRight, Check, CircleGauge, FileText, HeartPulse, LockKeyhole,
  Mic2, Network, Play, ShieldCheck, Sparkles, Stethoscope, Workflow,
} from 'lucide-react'
import {
  healthcareImpactImage as impactImage,
  homeConsultationImage as consultationImage,
  securityWorkflowImage as securityImage,
  whyNourDocImage as naturalCareImage,
  type ResponsiveImageAsset,
} from '../../data/responsiveImages'
import { PLAY_STORE_URL } from '../../data/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { signalCriticalHeroReady } from '../../utils/criticalAssets'
import { motionEase } from '../../utils/motion'
import { ResponsivePicture } from '../common/ResponsivePicture'

gsap.registerPlugin(ScrollTrigger)

const waveform = [18, 29, 44, 24, 52, 34, 63, 40, 57, 28, 48, 62, 36, 22, 43, 55, 31]

type VisualProps = { active: boolean }

function setTimelineState(timeline: gsap.core.Timeline | null, active: boolean) {
  if (!timeline) return

  if (active) {
    gsap.ticker.wake()
    timeline.play()
  } else {
    timeline.pause()
  }
}

function pathTraveller(path: SVGPathElement, dot: SVGCircleElement, duration: number, delay = 0) {
  const length = path.getTotalLength()
  const points = Array.from({ length: 61 }, (_, index) => path.getPointAtLength((index / 60) * length))
  const travel = { progress: 0 }
  const setX = gsap.quickSetter(dot, 'x', 'px')
  const setY = gsap.quickSetter(dot, 'y', 'px')
  const setOpacity = gsap.quickSetter(dot, 'opacity')
  const render = () => {
    const point = points[Math.min(60, Math.round(travel.progress * 60))]
    setX(point.x)
    setY(point.y)
    setOpacity(Math.sin(Math.PI * travel.progress) * .9)
  }
  render()
  return gsap.to(travel, { progress: 1, duration, delay, repeat: -1, repeatDelay: .3, ease: 'none', onUpdate: render })
}

function VisualShell({ label, icon, children, className = '', livePulse = false, active, reduced, rootRef }: { label: string; icon: ReactNode; children: ReactNode; className?: string; livePulse?: boolean; active: boolean; reduced: boolean; rootRef?: Ref<HTMLDivElement> }) {
  return (
    <div className={`scene-visual-shell ${className} ${active ? 'is-card-active' : ''}`}>
      <div ref={rootRef} className="scene-visual-motion">
        <div className="scene-shell-bar"><span>{icon}{label}</span>{livePulse ? <motion.i animate={!reduced && active ? { opacity: [1, .76, 1] } : { opacity: 1 }} transition={{ duration: 3.8, repeat: active ? Infinity : 0, ease: 'easeInOut' }}><b /> Live intelligence</motion.i> : <i><b /> Live intelligence</i>}</div>
        {children}
      </div>
    </div>
  )
}

function AmbientVisual({ active }: VisualProps) {
  const reducedMotionPref = useReducedMotion()
  const reduced = reducedMotionPref === true
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const timeline = gsap.timeline({ paused: !active })
    const context = gsap.context(() => {
      const connectors = gsap.utils.toArray<HTMLElement>('.ambient-connector', root)
      connectors.forEach((connector, connectorIndex) => {
        const signals = gsap.utils.toArray<HTMLElement>('i', connector)
        signals.forEach((signal, signalIndex) => {
          gsap.set(signal, { x: -8, opacity: 0 })
          timeline.add(gsap.to(signal, {
            x: () => connector.clientWidth + 8,
            keyframes: { opacity: [0, 1, 1, 0] },
            duration: 1.35,
            delay: connectorIndex * .22 + signalIndex * .72,
            repeat: -1,
            repeatDelay: .25,
            ease: 'none',
          }), 0)
        })
      })

      gsap.utils.toArray<HTMLElement>('.scene-waveform i', root).forEach((bar, index) => {
        timeline.add(gsap.fromTo(bar,
          { scaleY: .22 + index % 3 * .08 },
          { scaleY: 1.18 + index % 4 * .12, duration: .46 + index % 5 * .06, delay: index * .025, repeat: -1, yoyo: true, ease: 'sine.inOut' },
        ), 0)
      })
    }, root)

    timelineRef.current = timeline
    if (active) {
      gsap.ticker.wake()
      timeline.play()
    } else {
      timeline.pause()
    }

    return () => { timelineRef.current = null; timeline.kill(); context.revert() }
  }, [reduced])

  useLayoutEffect(() => {
    if (timelineRef.current) {
      setTimelineState(timelineRef.current, active)
    }
  }, [active, reduced])

  return (
    <div className="ambient-float-wrap">
      <VisualShell rootRef={rootRef} label="Ambient encounter" icon={<Stethoscope size={14} />} className="ambient-visual" livePulse active={active} reduced={reduced}>
        <div className="ambient-pipeline">
          <div className="ambient-stage ambient-stage-conversation">
            <motion.div className="ambient-dialogue scene-glass-card" whileHover={reduced ? undefined : { y: -3 }} transition={{ duration: .28 }}>
              <header><span>01</span><b>Conversation</b><Mic2 size={14} /></header>
              <div><i>DR</i><p><b>Doctor</b>How have you been feeling since your last visit?</p></div>
              <div><i>PT</i><p><b>Patient</b>The discomfort started three days ago.</p></div>
              <small><ShieldCheck size={11} /> Consent confirmed <i className="ambient-status-dot" /></small>
            </motion.div>
          </div>
          <div className="ambient-connector ambient-connector-a" aria-hidden="true"><i /><i /></div>
          <div className="ambient-stage ambient-stage-ai">
            <motion.div className="ambient-core scene-glass-card">
              <span><Sparkles size={13} /> AI understanding</span>
              <div className="scene-waveform" aria-hidden="true">{waveform.map((height, index) => <i key={`${height}-${index}`} style={{ height }} />)}</div>
              <small>Speakers separated <b /> Medical context</small>
            </motion.div>
          </div>
          <div className="ambient-connector ambient-connector-b" aria-hidden="true"><i /><i /></div>
          <div className="ambient-stage ambient-stage-note">
            <motion.div className="ambient-note scene-glass-card" whileHover={reduced ? undefined : { y: -3 }} transition={{ duration: .28 }}>
              <header><span>02</span><b>SOAP note</b><FileText size={14} /></header>
              {['Subjective', 'Objective', 'Assessment', 'Plan'].map((item, index) => <motion.div className="ambient-note-row" key={item} initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.15 + index * .14, duration: .45 }}><i>{item[0]}</i><p><b>{item}</b><small>{index === 0 ? 'Symptoms began three days ago...' : 'Structured for clinician review...'}</small></p></motion.div>)}
              <small className="ambient-review"><Check size={11} /> Clinician review required</small>
            </motion.div>
          </div>
        </div>
      </VisualShell>
    </div>
  )
}

function ContextVisual({ active }: VisualProps) {
  const reducedMotionPref = useReducedMotion()
  const reduced = reducedMotionPref === true
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const cards = [
    ['Conversation', 'Natural dialogue retained', Mic2],
    ['Clinical context', 'Meaning across the encounter', Stethoscope],
    ['Medical terminology', 'Specialized language recognized', Sparkles],
    ['Structured documentation', 'Ready for clinician review', FileText],
  ] as const

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const timeline = gsap.timeline({ paused: !active })
    const context = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.context-flow-path', root)
      const packets = gsap.utils.toArray<SVGCircleElement>('.context-packet', root)

      paths.forEach((path, index) => {
        gsap.set(path, { strokeDasharray: '6 8', strokeDashoffset: 0 })
        timeline.add(gsap.to(path, { strokeDashoffset: -84, duration: 2.8 + index * .25, repeat: -1, ease: 'none' }), 0)
        if (packets[index]) {
          timeline.add(pathTraveller(path, packets[index], 2.25 + index * .22, index * .24), 0)
        }
      })

      const core = root.querySelector('.context-core')
      if (core) {
        timeline.add(gsap.to(core, { scale: 1.04, duration: 1.55, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      }

      gsap.utils.toArray<HTMLElement>('.context-card-drift', root).forEach((card, index) => {
        timeline.add(gsap.to(card, { y: index % 2 ? 6 : -6, duration: 3.5 + index * .3, delay: index * .28, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      })
    }, root)

    timelineRef.current = timeline
    if (active) {
      gsap.ticker.wake()
      timeline.play()
    } else {
      timeline.pause()
    }

    return () => {
      timelineRef.current = null
      timeline.kill()
      context.revert()
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (timelineRef.current) {
      setTimelineState(timelineRef.current, active)
    }
  }, [active, reduced])

  return (
    <VisualShell rootRef={rootRef} label="Clinical context engine" icon={<Workflow size={14} />} className="context-visual" active={active} reduced={reduced}>
      <svg className="context-connections" viewBox="0 0 600 430" aria-hidden="true">
        <path className="context-flow-path" d="M110 105 C235 105 205 215 300 215" />
        <path className="context-flow-path" d="M490 105 C365 105 395 215 300 215" />
        <path className="context-flow-path" d="M110 325 C235 325 205 215 300 215" />
        <path className="context-flow-path" d="M490 325 C365 325 395 215 300 215" />
        <circle className="context-packet" r="4" fill="#82e9ee" />
        <circle className="context-packet" r="4" fill="#aaf8fb" />
        <circle className="context-packet" r="4" fill="#79e5ea" />
        <circle className="context-packet" r="4" fill="#bafcfd" />
      </svg>
      <div className="context-core"><Sparkles size={18} /><span>Clinical AI</span><i /></div>
      <div className="context-card-grid">
        {cards.map(([title, text, Icon], index) => (
          <div className={`context-card-float${index === 0 || index === 3 ? ' context-card-drift' : ''}`} key={title}>
            <motion.div className="context-card scene-glass-card" whileHover={reduced ? undefined : { y: -3 }} transition={{ type: 'spring', stiffness: 210, damping: 20 }}>
              <span>0{index + 1}</span>
              <Icon size={17} />
              <b>{title}</b>
              <p>{text}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </VisualShell>
  )
}

function ImpactVisual({ active }: VisualProps) {
  const reducedMotionPref = useReducedMotion()
  const reduced = reducedMotionPref === true
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const timeline = gsap.timeline({ paused: !active })
    const context = gsap.context(() => {
      const ring = root.querySelector<SVGCircleElement>('.impact-ring-value')
      const ringHalo = root.querySelector<SVGCircleElement>('.impact-ring-halo')
      const line = root.querySelector<SVGPathElement>('.chart-line')
      const point = root.querySelector<SVGCircleElement>('.impact-chart-point')
      const scan = root.querySelector<HTMLElement>('.impact-chart-scan')
      const bridgePacket = root.querySelector<HTMLElement>('.impact-bridge-packet')

      if (ring) {
        gsap.set(ring, {
          strokeDasharray: 302,
          strokeDashoffset: 58,
          transformOrigin: '50% 50%',
          rotate: -90,
        })
        timeline.to(ring, {
          strokeDashoffset: 22,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
      }

      if (ringHalo) {
        gsap.set(ringHalo, {
          transformOrigin: '50% 50%',
          rotate: -90,
          strokeDasharray: '14 288',
          strokeDashoffset: 0,
        })
        timeline.to(ringHalo, {
          rotation: 270,
          duration: 4.8,
          repeat: -1,
          ease: 'none',
        }, 0)
      }

      if (line) {
        gsap.set(line, { strokeDasharray: '8 8', strokeDashoffset: 0 })
        timeline.to(line, {
          strokeDashoffset: -96,
          duration: 2.6,
          repeat: -1,
          ease: 'none',
        }, 0)

        if (point) {
          timeline.add(pathTraveller(line, point, 2.45, .08), 0)
        }
      }

      if (scan) {
        timeline.fromTo(scan,
          { xPercent: -150, opacity: 0 },
          {
            xPercent: 155,
            opacity: .72,
            duration: 2.2,
            repeat: -1,
            repeatDelay: .7,
            ease: 'power1.inOut',
          },
          0,
        )
      }

      if (bridgePacket) {
        timeline.fromTo(bridgePacket,
          { x: 0, opacity: 0, scale: .7 },
          {
            x: 118,
            opacity: 1,
            scale: 1.25,
            duration: 2.1,
            repeat: -1,
            repeatDelay: 1,
            ease: 'power1.inOut',
          },
          0,
        )
      }

    }, root)

    timelineRef.current = timeline
    if (active) {
      gsap.ticker.wake()
      timeline.play()
    } else {
      timeline.pause()
    }

    return () => {
      timelineRef.current = null
      timeline.kill()
      context.revert()
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (timelineRef.current) {
      setTimelineState(timelineRef.current, active)
    }
  }, [active, reduced])

  return (
    <VisualShell
      rootRef={rootRef}
      label="Encounter outcomes"
      icon={<Activity size={14} />}
      className="impact-visual"
      livePulse
      active={active}
      reduced={reduced}
    >
      <div
        className="impact-dashboard"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 34fr) minmax(0, 66fr)',
          gridTemplateRows: '1fr auto',
          gap: 12,
          minHeight: 0,
          padding: 16,
        }}
      >
        <div
          className="impact-score scene-glass-card impact-kpi-card"
          style={{
            position: 'relative',
            padding: 16,
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          <span style={{ display: 'block', fontSize: 13, opacity: .82, marginBottom: 8 }}>Documentation flow</span>

          <div className="impact-ring" style={{ position: 'relative', width: 104, height: 104, margin: '8px auto 10px' }}>
            <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
              <circle cx="60" cy="60" r="48" />
              <circle className="impact-ring-value" cx="60" cy="60" r="48" />
              <circle
                className="impact-ring-halo"
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="rgba(164,248,250,.95)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <b style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 28 }}>
              86<small style={{ fontSize: 11, marginLeft: 2 }}>%</small>
            </b>
          </div>

          <p style={{ display: 'flex', alignItems: 'center', gap: 7, margin: 0, fontSize: 12, opacity: .82 }}>
            <i className="impact-status-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#67bda8', display: 'inline-block' }} />
            Workflow signal improving
          </p>

          <i
            className="impact-bridge-packet"
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 14,
              top: '48%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#9cf5f7',
              boxShadow: '0 0 16px rgba(108,228,234,.9)',
            }}
          />
        </div>

        <div
          className="impact-chart scene-glass-card impact-kpi-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 16,
            minHeight: 0,
          }}
        >
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Clinical focus</span>
            <b style={{ fontSize: 11, color: '#7fd7c6', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="impact-status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#67bda8', display: 'inline-block' }} />
              Live trend
            </b>
          </header>

          <div style={{ position: 'relative', minHeight: 112, overflow: 'hidden', borderRadius: 12 }}>
            <svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: 112 }}>
              <defs>
                <linearGradient id="impactAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(90,219,229,.26)" />
                  <stop offset="100%" stopColor="rgba(90,219,229,0)" />
                </linearGradient>
              </defs>
              {[26, 52, 78, 104].map((y) => (
                <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(158,224,229,.08)" strokeWidth="1" />
              ))}
              <path
                className="chart-area"
                d="M0 112 C45 104 64 91 104 94 S166 64 202 69 S257 36 320 25 L320 130 L0 130Z"
                fill="url(#impactAreaFill)"
              />
              <path
                className="chart-line"
                d="M0 112 C45 104 64 91 104 94 S166 64 202 69 S257 36 320 25"
                fill="none"
                stroke="#6fd5e2"
                strokeWidth="2.2"
              />
              <circle className="impact-chart-point" r="4.2" fill="#c9ffff" />
            </svg>

            <i
              className="impact-chart-scan"
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-10% auto -10% -12%',
                width: '18%',
                transform: 'skewX(-14deg)',
                background: 'linear-gradient(90deg, transparent, rgba(123,238,244,.17), transparent)',
                filter: 'blur(1px)',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 8, fontSize: 10, opacity: .7 }}>
            <span>Encounter</span>
            <span>Draft</span>
            <span>Review</span>
            <span style={{ textAlign: 'right' }}>Sign</span>
          </div>
        </div>

        <div
          className="impact-metrics"
          style={{
            gridColumn: '1 / -1',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 10,
          }}
        >
          {[
            [HeartPulse, 'Clinical focus', 'Active'],
            [CircleGauge, 'Workflow progress', '4 stages'],
            [Check, 'Clinician review', 'Required'],
          ].map(([Icon, title, text]) => {
            const MetricIcon = Icon as typeof HeartPulse
            return (
              <div
                className="scene-glass-card impact-kpi-card"
                key={String(title)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '24px minmax(0, 1fr)',
                  alignItems: 'center',
                  gap: 7,
                  minHeight: 42,
                  padding: '6px 8px',
                }}
              >
                <span style={{ width: 24, height: 24, borderRadius: 7, display: 'grid', placeItems: 'center', background: 'rgba(83,171,193,.12)' }}>
                  <MetricIcon size={13} />
                </span>
                <p style={{ margin: 0 }}>
                  <b style={{ display: 'block', fontSize: 10.5 }}>{String(title)}</b>
                  <small style={{ fontSize: 9, opacity: .72 }}>{String(text)}</small>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </VisualShell>
  )
}

function SecurityVisual({ active }: VisualProps) {
  const reducedMotionPref = useReducedMotion()
  const reduced = reducedMotionPref === true
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const timeline = gsap.timeline({ paused: !active })
    const context = gsap.context(() => {
      gsap.set([
        '.security-stage',
        '.security-node',
        '.secure-record-stack',
        '.secure-record',
        '.security-pulse',
        '.security-connections',
      ], {
        autoAlpha: 1,
      })

      const paths = gsap.utils.toArray<SVGPathElement>('.security-flow-path', root)
      const packets = gsap.utils.toArray<SVGCircleElement>('.security-packet', root)

      paths.forEach((path, index) => {
        gsap.set(path, {
          strokeDasharray: '7 11',
          strokeDashoffset: 0,
          opacity: .72,
        })
        timeline.to(path, {
          strokeDashoffset: -94,
          duration: 2.5 + index * .18,
          repeat: -1,
          ease: 'none',
        }, 0)

        if (packets[index]) {
          timeline.add(pathTraveller(path, packets[index], 2 + index * .18, index * .18), 0)
        }
      })

      const scan = root.querySelector<HTMLElement>('.secure-record-scan')
      if (scan) {
        timeline.fromTo(scan,
          { xPercent: -150, opacity: 0 },
          {
            xPercent: 150,
            opacity: .92,
            duration: 1.9,
            repeat: -1,
            repeatDelay: .55,
            ease: 'power1.inOut',
          },
          0,
        )
      }
    }, root)

    timelineRef.current = timeline
    if (active) {
      gsap.ticker.wake()
      timeline.play()
    } else {
      timeline.pause()
    }

    return () => {
      timelineRef.current = null
      timeline.kill()
      context.revert()
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (timelineRef.current) {
      setTimelineState(timelineRef.current, active)
    }
  }, [active, reduced])

  return (
    <VisualShell
      rootRef={rootRef}
      label="Protected clinical record"
      icon={<ShieldCheck size={14} />}
      className="security-visual"
      livePulse
      active={active}
      reduced={reduced}
    >
      <div
        className="security-stage"
        style={{
          opacity: 1,
          visibility: 'visible',
          position: 'relative',
          minHeight: 0,
        }}
      >
        <svg
          className="security-connections"
          viewBox="0 0 600 430"
          aria-hidden="true"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          <path className="security-flow-path" d="M65 120 C178 120 188 210 300 210" />
          <path className="security-flow-path" d="M535 120 C422 120 412 210 300 210" />
          <path className="security-flow-path" d="M85 350 C180 350 200 250 300 230" />
          <path className="security-flow-path" d="M515 350 C420 350 400 250 300 230" />
          <circle className="security-packet" r="4.5" fill="#aaf8fb" />
          <circle className="security-packet" r="4.5" fill="#79e5ea" />
          <circle className="security-packet" r="4.5" fill="#bafcfd" />
          <circle className="security-packet" r="4.5" fill="#82e9ee" />
        </svg>

        <div className="security-node security-node-a" style={{ opacity: 1, visibility: 'visible' }}>
          <Network size={14} />
          <span>Clinical workflow</span>
        </div>

        <div className="security-node security-node-b" style={{ opacity: 1, visibility: 'visible' }}>
          <LockKeyhole size={14} />
          <span>Encrypted</span>
        </div>

        <div className="security-node security-node-c" style={{ opacity: 1, visibility: 'visible' }}>
          <FileText size={14} />
          <span>Audit</span>
        </div>

        <div className="security-node security-node-d" style={{ opacity: 1, visibility: 'visible' }}>
          <Check size={14} />
          <span>Verified</span>
        </div>

        <motion.div
          className="secure-record-stack"
          style={{
            opacity: 1,
            visibility: 'visible',
          }}
        >
          <i className="secure-layer secure-layer-back" />
          <i className="secure-layer secure-layer-mid" />

          <div
            className="secure-record scene-glass-card"
            style={{
              opacity: 1,
              visibility: 'visible',
              overflow: 'hidden',
            }}
          >
            <i className="secure-record-scan" aria-hidden="true" />

            <div>
              <ShieldCheck size={27} />
              <span>
                <b>Protected record</b>
                <small>End-to-end clinical safeguards</small>
              </span>
            </div>

            <p><i /> Patient information</p>
            <p><i /> Clinical documentation</p>
            <p><i /> Authorized access only</p>

            <footer>
              <LockKeyhole size={12} />
              Encrypted in transit &amp; at rest
            </footer>
          </div>
        </motion.div>

        <div className="security-pulse" style={{ opacity: 1, visibility: 'visible' }}>
          <span />
          <i />
        </div>
      </div>
    </VisualShell>
  )
}

type StorySceneDefinition = {
  eyebrow: string
  title: string
  description: string
  image: ResponsiveImageAsset
  position: string
  visual: (active: boolean) => ReactNode
}

const storyScenes: StorySceneDefinition[] = [
  { eyebrow: 'Ambient Intelligence', title: 'Patient conversations, perfectly documented.', description: 'NourDoc listens to natural doctor-patient dialogue and creates structured clinical documentation, helping physicians reduce time spent on manual note-taking.', image: consultationImage, position: '52% center', visual: (active) => <AmbientVisual active={active} /> },
  { eyebrow: 'Why NourDoc', title: 'Technology that stays out of the clinical conversation.', description: 'NourDoc works quietly around the encounter, helping clinicians stay present while ambient AI organizes the conversation into useful clinical context.', image: naturalCareImage, position: '62% center', visual: (active) => <ContextVisual active={active} /> },
  { eyebrow: 'Healthcare Impact', title: 'Better documentation. Better clinical focus.', description: 'Reduce clerical friction around the encounter so more attention remains available for the patient, the clinical decision and the care that follows.', image: impactImage, position: '40% center', visual: (active) => <ImpactVisual active={active} /> },
  { eyebrow: 'Security & Compliance', title: 'Clinical intelligence built for trusted healthcare.', description: 'Patient information requires strong privacy, access-control and governance practices. NourDoc positions security and privacy as foundational requirements.', image: securityImage, position: '48% center', visual: (active) => <SecurityVisual active={active} /> },
]

const copyVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: .08, delayChildren: .06 } },
}

const copyItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: .76, ease: motionEase } },
}

const visualFloatConfigs = [
  { x: 0, y: -8, scale: 1.008, duration: 5.2 },
  { x: 3, y: -7, scale: 1.008, duration: 6.1 },
  { x: 1.5, y: -6, scale: 1.01, duration: 4.8 },
  { x: 2, y: -9, scale: 1.008, duration: 6.6 },
] as const

type StorySceneProps = {
  scene: StorySceneDefinition
  index: number
  compact: boolean
  layered: boolean
  active: boolean
  registerScene: (index: number, node: HTMLElement | null) => void
}

function StoryScene({ scene, index, compact, layered, active, registerScene }: StorySceneProps) {
  const sceneRef = useRef<HTMLElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const reducedMotionPref = useReducedMotion()
  const reduced = reducedMotionPref === true
  const inView = useInView(sceneRef, { amount: .12, margin: '-5% 0px -5% 0px' })
  const visualActive = layered ? active : inView
  const floatConfig = visualFloatConfigs[index]
  const setSceneRef = useCallback((node: HTMLElement | null) => {
    sceneRef.current = node
    registerScene(index, node)
  }, [index, registerScene])

  useLayoutEffect(() => {
    const float = floatRef.current
    if (!float) return
    const x = compact ? Math.min(floatConfig.x, 1.5) : floatConfig.x
    const y = compact ? Math.max(floatConfig.y, -5) : floatConfig.y
    const scale = compact ? Math.min(floatConfig.scale, 1.004) : floatConfig.scale
    const context = gsap.context(() => {
      gsap.to(float, {
        x,
        y,
        scale,
        duration: floatConfig.duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
      })
      float.style.willChange = 'transform'
    }, float)

    return () => {
      float.style.willChange = 'auto'
      context.revert()
    }
  }, [compact, floatConfig])

  return (
    <article
      ref={setSceneRef}
      className={`hero-scene rotating-scene scrolling-story-scene rotating-scene-${index + 1}`}
      aria-hidden={layered && !active ? true : undefined}
      inert={layered && !active ? true : undefined}
    >
      <div className="rotating-scene-bg" aria-hidden="true">
        <ResponsivePicture
          asset={scene.image}
          sizes="100vw"
          pictureClassName="rotating-scene-picture"
          className="rotating-scene-image"
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition: scene.position }}
          onDecoded={index === 0 ? signalCriticalHeroReady : undefined}
        />
      </div>
      <div className="rotating-scene-overlay" aria-hidden="true" />
      <div className="scene-atmosphere" aria-hidden="true" />
      <div className="scene-light-sweep" aria-hidden="true" />
      <svg className="scene-data-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M0 690 C300 650 400 510 685 520 S1080 690 1440 410" /><path d="M610 0 C610 230 820 290 955 370 S1230 420 1440 225" /><circle cx="685" cy="520" r="3" /><circle cx="955" cy="370" r="3" /><circle cx="1215" cy="535" r="3" /></svg>
      <div className="scene-depth-nodes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="container rotating-scene-layout">
        <motion.div className="rotating-scene-copy" initial={!layered && !reduced ? 'hidden' : false} whileInView={!layered && !reduced ? 'visible' : undefined} viewport={{ once: true, amount: .3 }} variants={copyVariants}>
          <motion.span className="eyebrow" variants={copyItemVariants}><i />{scene.eyebrow}</motion.span>
          {index === 0 ? <motion.h1 variants={copyItemVariants}>{scene.title}</motion.h1> : <motion.h2 variants={copyItemVariants}>{scene.title}</motion.h2>}
          <motion.p variants={copyItemVariants}>{scene.description}</motion.p>
          <motion.div className="scene-actions" variants={copyItemVariants}>
            <motion.div whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .985 }}><Link className="button scene-primary-action" to="/contact">Book a Demo<ArrowRight size={17} /></Link></motion.div>
            <motion.div whileHover={reduced ? undefined : { x: 3 }}><Link className="scene-secondary-action" to="/product">Explore the platform<ArrowRight size={16} /></Link></motion.div>
          </motion.div>
          {index === 0 && (
            <motion.a
              className="hero-app-access"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={copyItemVariants}
              aria-label="Try the NourDoc app on Google Play"
            >
              <span className="hero-app-access-icon"><Play size={14} fill="currentColor" aria-hidden="true" /></span>
              <span className="hero-app-access-copy">
                <strong>NourDoc App</strong>
                <small>Trial available on Google Play</small>
              </span>
              <ArrowUpRight className="hero-app-access-arrow" size={15} aria-hidden="true" />
            </motion.a>
          )}
        </motion.div>
        <div className="rotating-scene-visual hero-visual-scroll">
          <div ref={floatRef} className="hero-visual-float">
            <div className="hero-visual-content">{scene.visual(visualActive)}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function CinematicStory() {
  const compact = useMediaQuery('(max-width: 768px)')
  const storyRef = useRef<HTMLElement>(null)
  const sceneRefs = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSceneRef = useRef(0)
  // The four-scene stack is the Home hero architecture on every viewport.
  // `compact` only tunes layout/scrub performance; it never disables layering.
  const layered = true

  const registerScene = useCallback((index: number, node: HTMLElement | null) => {
    sceneRefs.current[index] = node
  }, [])

  useLayoutEffect(() => {
    const story = storyRef.current
    const scenes = sceneRefs.current.filter((scene): scene is HTMLElement => Boolean(scene))

    if (!story || !layered || scenes.length !== storyScenes.length) {
      activeSceneRef.current = 0
      setActiveIndex(0)
      return
    }

    activeSceneRef.current = 0
    setActiveIndex(0)
    let refreshFrame = 0

    const context = gsap.context(() => {
      /*
       * GSAP is the ONLY owner of scene transforms in layered mode.
       * CSS positions the four cards on the same sticky stage but does not
       * pre-translate Scenes 2–4. This prevents a CSS translateY(100%) from
       * being parsed as pixel `y` and then combined with GSAP `yPercent: 100`.
       */
      gsap.set(scenes, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        pointerEvents: 'none',
        transformOrigin: '50% 50%',
        force3D: true,
      })

      gsap.set(scenes[0], {
        yPercent: 0,
        pointerEvents: 'auto',
        zIndex: 1,
      })

      gsap.set(scenes.slice(1), {
        yPercent: 100,
      })

      scenes.slice(1).forEach((scene, index) => {
        gsap.set(scene, { zIndex: index + 2 })
      })

      const setActiveScene = (nextIndex: number) => {
        if (nextIndex === activeSceneRef.current) return

        activeSceneRef.current = nextIndex
        setActiveIndex(nextIndex)

        scenes.forEach((scene, index) => {
          scene.style.pointerEvents = index === nextIndex ? 'auto' : 'none'
        })
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: story,
          start: 'top top',
          end: 'bottom bottom',
          scrub: compact ? 0.18 : 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Start the incoming scene's internal animation as soon as that layer enters.
            // This prevents a half-transition where the visible incoming card looks frozen.
            if (self.progress >= 2 / 3) {
              setActiveScene(3)
            } else if (self.progress >= 1 / 3) {
              setActiveScene(2)
            } else if (self.progress > 0.012) {
              setActiveScene(1)
            } else {
              setActiveScene(0)
            }
          },
        },
      })

      // True layered scroll: the previous card stays in place while the next
      // card physically rises from below and covers it.
      timeline
        .to(scenes[1], { yPercent: 0, duration: 1 }, 0)
        .to(scenes[2], { yPercent: 0, duration: 1 }, 1)
        .to(scenes[3], { yPercent: 0, duration: 1 }, 2)

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, story)

    return () => {
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame)
      context.revert()
    }
  }, [layered, compact])

  return (
    <section
      ref={storyRef}
      className={`hero-story rotating-hero scrolling-story ${layered ? 'is-layered' : 'is-static'}`}
      aria-label="NourDoc clinical intelligence overview"
    >
      <div className="hero-stage rotating-hero-viewport">
        {storyScenes.map((scene, index) => (
          <StoryScene
            scene={scene}
            index={index}
            compact={compact}
            layered={layered}
            active={activeIndex === index}
            registerScene={registerScene}
            key={scene.eyebrow}
          />
        ))}
      </div>
    </section>
  )
}
