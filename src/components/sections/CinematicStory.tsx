import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import {
  Activity, ArrowLeft, ArrowRight, Check, CircleGauge, FileText, HeartPulse, LockKeyhole,
  Mic2, Network, ShieldCheck, Sparkles, Stethoscope, Workflow,
} from 'lucide-react'
import {
  healthcareImpactImage as impactImage,
  homeConsultationImage as consultationImage,
  securityWorkflowImage as securityImage,
  whyNourDocImage as naturalCareImage,
  type ResponsiveImageAsset,
} from '../../data/responsiveImages'
import { signalCriticalHeroReady } from '../../utils/criticalAssets'
import { ResponsivePicture } from '../common/ResponsivePicture'

const HERO_VISUAL_TEXT_STYLES = `
.rotating-scene-visual .scene-shell-bar { font-size: 12.5px !important; }
.rotating-scene-visual .scene-shell-bar > span,
.rotating-scene-visual .scene-shell-bar > i { font-size: 12px !important; }

.rotating-scene-visual .ambient-dialogue header b,
.rotating-scene-visual .ambient-note header b { font-size: 12.5px !important; }
.rotating-scene-visual .ambient-dialogue p,
.rotating-scene-visual .ambient-dialogue small,
.rotating-scene-visual .ambient-core span,
.rotating-scene-visual .ambient-core small,
.rotating-scene-visual .ambient-note-row p b,
.rotating-scene-visual .ambient-note-row p small,
.rotating-scene-visual .ambient-review { font-size: 11px !important; line-height: 1.35 !important; }
.rotating-scene-visual .ambient-dialogue p b { font-size: 10.5px !important; }

.rotating-scene-visual .context-card b { font-size: 12.5px !important; }
.rotating-scene-visual .context-card p { font-size: 11px !important; line-height: 1.4 !important; opacity: .82 !important; }
.rotating-scene-visual .context-core span { font-size: 11.5px !important; }

.rotating-scene-visual .security-node span { font-size: 11px !important; }
.rotating-scene-visual .secure-record div span b { font-size: 13px !important; }
.rotating-scene-visual .secure-record div span small,
.rotating-scene-visual .secure-record p,
.rotating-scene-visual .secure-record footer { font-size: 10.5px !important; line-height: 1.35 !important; }

/* Component-scoped fit and rhythm for the three narrative visualizations. */
.rotating-hero .ambient-visual .ambient-pipeline {
  grid-template-columns: minmax(0, 1fr) minmax(100px, .72fr) minmax(0, 1.35fr);
  align-items: center;
  gap: 12px;
  padding: 16px;
}
.rotating-hero .ambient-visual .ambient-stage,
.rotating-hero .ambient-visual .ambient-stage > .scene-glass-card { min-width: 0; max-height: 100%; }
.rotating-hero .ambient-visual .ambient-dialogue,
.rotating-hero .ambient-visual .ambient-note { padding: 12px 13px; }
.rotating-hero .ambient-visual .ambient-dialogue p,
.rotating-hero .ambient-visual .ambient-dialogue p b,
.rotating-hero .ambient-visual .ambient-note-row p,
.rotating-hero .ambient-visual .ambient-note-row b,
.rotating-hero .ambient-visual .ambient-note-row small {
  min-width: 0;
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
}
.rotating-hero .ambient-visual .ambient-dialogue p { font-size: clamp(8.5px, .68vw, 10px) !important; line-height: 1.42 !important; }
.rotating-hero .ambient-visual .ambient-dialogue p b { font-size: clamp(8.5px, .7vw, 10px) !important; }
.rotating-hero .ambient-visual .ambient-dialogue > div { grid-template-columns: 22px minmax(0, 1fr); gap: 7px; margin-top: 10px; }
.rotating-hero .ambient-visual .ambient-dialogue > div > i { width: 22px; height: 22px; }
.rotating-hero .ambient-visual .ambient-dialogue > small { margin-top: 10px; padding-top: 8px; font-size: 8px !important; }
.rotating-hero .ambient-visual .ambient-core { align-self: center; padding: 13px 8px; }
.rotating-hero .ambient-visual .ambient-core > span { font-size: clamp(8.5px, .68vw, 10px) !important; white-space: normal; }
.rotating-hero .ambient-visual .scene-waveform { width: 100%; height: 72px; gap: clamp(1px, .2vw, 3px); }
.rotating-hero .ambient-visual .scene-waveform i { max-height: 52px; }
.rotating-hero .ambient-visual .ambient-core > small { font-size: 7px !important; }
.rotating-hero .ambient-visual .ambient-note-row { grid-template-columns: 22px minmax(0, 1fr); gap: 6px; margin-top: 5px; padding: 5px 6px; }
.rotating-hero .ambient-visual .ambient-note-row > i { width: 22px; height: 22px; }
.rotating-hero .ambient-visual .ambient-note-row b { font-size: 9.5px !important; line-height: 1.25 !important; }
.rotating-hero .ambient-visual .ambient-note-row small { font-size: 7.5px !important; line-height: 1.25 !important; }
.rotating-hero .ambient-visual .ambient-review { margin-top: 7px; font-size: 8px !important; }
.rotating-hero .ambient-visual .ambient-connector-a { left: 29.5%; }
.rotating-hero .ambient-visual .ambient-connector-b { left: 58%; }

.rotating-hero .context-visual .context-card-grid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px 70px;
  padding: 18px 20px;
}
.rotating-hero .context-visual .context-card-float,
.rotating-hero .context-visual .context-card { min-width: 0; min-height: 0; }
.rotating-hero .context-visual .context-card { height: 100%; padding: 11px 13px; border-radius: 15px; }
.rotating-hero .context-visual .context-card > b { margin-top: 7px; font-size: 11.5px !important; line-height: 1.2 !important; overflow-wrap: normal; word-break: normal; }
.rotating-hero .context-visual .context-card > p { margin-top: 4px; font-size: 8.5px !important; line-height: 1.35 !important; overflow-wrap: normal; word-break: normal; }
.rotating-hero .context-visual .context-card > svg { width: 16px; height: 16px; }
.rotating-hero .context-visual .context-core {
  top: calc(50% + 24px);
  width: 74px;
  height: 74px;
  gap: 3px;
}
.rotating-hero .context-visual .context-core span { font-size: 9px !important; }
.rotating-hero .context-visual .context-core i { inset: 8px; }

.rotating-hero .security-visual .security-stage { padding: 16px 18px; }
.rotating-hero .security-visual .secure-record-stack {
  width: min(58%, 270px);
  height: auto;
  transform: translate(-50%, -50%) translateZ(48px);
}
.rotating-hero .security-visual .secure-layer { inset: 11px; border-radius: 16px; }
.rotating-hero .security-visual .secure-layer-back { transform: translate3d(14px, -10px, -40px); }
.rotating-hero .security-visual .secure-layer-mid { transform: translate3d(7px, -5px, -20px); }
.rotating-hero .security-visual .secure-record { position: relative; inset: auto; padding: 16px 17px; border-radius: 16px; }
.rotating-hero .security-visual .secure-record > div { gap: 9px; padding-bottom: 9px; }
.rotating-hero .security-visual .secure-record > div > svg { width: 23px; height: 23px; }
.rotating-hero .security-visual .secure-record > div span b { font-size: 12px !important; line-height: 1.2 !important; }
.rotating-hero .security-visual .secure-record > div span small { font-size: 8.5px !important; line-height: 1.3 !important; }
.rotating-hero .security-visual .secure-record > p { gap: 7px; margin: 6px 0; padding: 6px 7px; }
.rotating-hero .security-visual .secure-record > p { font-size: 9px !important; line-height: 1.3 !important; }
.rotating-hero .security-visual .secure-record footer { gap: 5px; padding-top: 8px; font-size: 8px !important; line-height: 1.3 !important; }
.rotating-hero .security-visual .security-node { z-index: 5; padding: 7px 9px; white-space: nowrap; }
.rotating-hero .security-visual .security-node-a { left: 4%; top: 8%; }
.rotating-hero .security-visual .security-node-b { right: 4%; top: 8%; }
.rotating-hero .security-visual .security-node-c { left: 5%; bottom: 8%; }
.rotating-hero .security-visual .security-node-d { right: 5%; bottom: 8%; }
.rotating-hero .security-visual .security-pulse { width: min(76%, 330px); height: auto; aspect-ratio: 1; }

@media (max-width: 900px) {
  .rotating-scene-visual .scene-shell-bar { font-size: 12px !important; }
  .rotating-scene-visual .ambient-dialogue p,
  .rotating-scene-visual .ambient-dialogue small,
  .rotating-scene-visual .ambient-core span,
  .rotating-scene-visual .ambient-core small,
  .rotating-scene-visual .ambient-note-row p b,
  .rotating-scene-visual .ambient-note-row p small,
  .rotating-scene-visual .ambient-review,
  .rotating-scene-visual .context-card p,
  .rotating-scene-visual .security-node span,
  .rotating-scene-visual .secure-record p,
  .rotating-scene-visual .secure-record footer { font-size: 10.5px !important; }

  .rotating-hero .ambient-visual .ambient-pipeline { grid-template-columns: minmax(0, .95fr) minmax(82px, .7fr) minmax(0, 1.3fr); gap: 8px; padding: 12px; }
  .rotating-hero .ambient-visual .ambient-dialogue,
  .rotating-hero .ambient-visual .ambient-note { padding: 9px 10px; }
  .rotating-hero .ambient-visual .ambient-dialogue p,
  .rotating-hero .ambient-visual .ambient-dialogue p b { font-size: 8px !important; }
  .rotating-hero .ambient-visual .ambient-note-row { margin-top: 4px; padding: 4px 5px; }
  .rotating-hero .ambient-visual .ambient-note-row b { font-size: 8px !important; }
  .rotating-hero .ambient-visual .ambient-note-row small { font-size: 6.5px !important; }
  .rotating-hero .ambient-visual .scene-waveform { height: 58px; }

  .rotating-hero .context-visual .context-card-grid { gap: 14px 54px; padding: 14px 16px; }
  .rotating-hero .context-visual .context-card { padding: 9px 10px; }
  .rotating-hero .context-visual .context-card > b { margin-top: 5px; font-size: 9.5px !important; }
  .rotating-hero .context-visual .context-card > p { font-size: 7.5px !important; }
  .rotating-hero .context-visual .context-core { width: 66px; height: 66px; }

  .rotating-hero .security-visual .security-stage { padding: 12px; }
  .rotating-hero .security-visual .secure-record-stack { width: min(58%, 235px); }
  .rotating-hero .security-visual .secure-record { padding: 12px 13px; }
  .rotating-hero .security-visual .secure-record > div span b { font-size: 11px !important; }
  .rotating-hero .security-visual .secure-record > div span small { font-size: 7.5px !important; }
  .rotating-hero .security-visual .secure-record > p { margin: 5px 0; padding: 5px 6px; }
  .rotating-hero .security-visual .secure-record > p { font-size: 8px !important; }
  .rotating-hero .security-visual .secure-record footer { font-size: 7.5px !important; }
  .rotating-hero .security-visual .security-node { padding: 6px 7px; }
}

@media (max-width: 700px) {
  .rotating-hero .ambient-visual .ambient-pipeline { grid-template-columns: minmax(0, .95fr) minmax(76px, .68fr) minmax(0, 1.3fr); gap: 6px; padding: 8px; }
  .rotating-hero .ambient-visual .ambient-stage { height: clamp(160px, calc(22vw + 85px), 190px); }
  .rotating-hero .ambient-visual .ambient-stage > .scene-glass-card { height: 100%; }
  .rotating-hero .ambient-visual .ambient-dialogue,
  .rotating-hero .ambient-visual .ambient-note { display: flex; flex-direction: column; padding: 7px 8px; }
  .rotating-hero .ambient-visual .ambient-dialogue > div { grid-template-columns: 18px minmax(0, 1fr); gap: 4px; margin-top: 7px; }
  .rotating-hero .ambient-visual .ambient-dialogue > div > i { width: 18px; height: 18px; }
  .rotating-hero .ambient-visual .ambient-dialogue > small { margin-top: auto; padding-top: 6px; font-size: 6px !important; }
  .rotating-hero .ambient-visual .ambient-core { display: grid; align-content: center; padding-inline: 4px; }
  .rotating-hero .ambient-visual .ambient-core > span { font-size: 7px !important; }
  .rotating-hero .ambient-visual .scene-waveform { height: 52px; }
  .rotating-hero .ambient-visual .ambient-note-row { grid-template-columns: 19px minmax(0, 1fr); padding: 4px; }
  .rotating-hero .ambient-visual .ambient-note-row:nth-of-type(1),
  .rotating-hero .ambient-visual .ambient-note-row:nth-of-type(2),
  .rotating-hero .ambient-visual .ambient-note-row:nth-of-type(3) { display: grid; }
  .rotating-hero .ambient-visual .ambient-note-row > i { width: 19px; height: 19px; }
  .rotating-hero .ambient-visual .ambient-note-row b { font-size: 7px !important; }
  .rotating-hero .ambient-visual .ambient-note-row small { font-size: 5.8px !important; }

  .rotating-hero .context-visual .context-card-grid { gap: 10px 44px; padding: 10px 12px; }
  .rotating-hero .context-visual .context-card { padding: 8px; }
  .rotating-hero .context-visual .context-card > b { font-size: 8px !important; }
  .rotating-hero .context-visual .context-card > p { font-size: 6.5px !important; }
  .rotating-hero .context-visual .context-core { top: calc(50% + 21px); width: 58px; height: 58px; }
  .rotating-hero .context-visual .context-core span { font-size: 7px !important; }

  .rotating-hero .security-visual .security-stage { padding: 9px; }
  .rotating-hero .security-visual .secure-record-stack { width: min(58%, 210px); }
  .rotating-hero .security-visual .secure-record { padding: 10px 11px; }
  .rotating-hero .security-visual .secure-record > div { padding-bottom: 7px; }
  .rotating-hero .security-visual .secure-record > div span b { font-size: 10.5px !important; }
  .rotating-hero .security-visual .secure-record > div span small { font-size: 7px !important; }
  .rotating-hero .security-visual .secure-record > p { margin: 4px 0; padding: 4px 5px; }
  .rotating-hero .security-visual .secure-record > p { font-size: 7.5px !important; }
  .rotating-hero .security-visual .secure-record footer { padding-top: 6px; font-size: 7px !important; }
  .rotating-hero .security-visual .security-node { padding: 5px 6px; }
}
`
const waveform = [18, 29, 44, 24, 52, 34, 63, 40, 57, 28, 48, 62, 36, 22, 43, 55, 31]

type VisualProps = { active: boolean }

function setTimelineState(timeline: gsap.core.Timeline | null, active: boolean) {
  if (!timeline) return

  if (active) {
    // Restart the active scene from a clean state. This prevents repeated/infinite
    // child tweens from resuming from a stale browser-throttled frame.
    gsap.ticker.wake()
    timeline.timeScale(1).restart(true)
  } else {
    // Reset inactive scenes instead of leaving their infinite tweens suspended
    // at an arbitrary point in the animation.
    timeline.pause(0)
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
  return gsap.to(travel, { progress: 1, duration, delay, repeat: -1, repeatDelay: .3, ease: 'none', onUpdate: render })
}

function VisualShell({ label, icon, children, className = '', livePulse = false, active, reduced, rootRef }: { label: string; icon: ReactNode; children: ReactNode; className?: string; livePulse?: boolean; active: boolean; reduced: boolean | null; rootRef?: Ref<HTMLDivElement> }) {
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
  const reduced = false
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const initialActiveRef = useRef(active)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const timeline = gsap.timeline({ paused: true })
    const context = gsap.context(() => {
      const connectors = gsap.utils.toArray<HTMLElement>('.ambient-connector', root)
      connectors.forEach((connector, connectorIndex) => {
        const signals = gsap.utils.toArray<HTMLElement>('i', connector)
        signals.forEach((signal, signalIndex) => {
          gsap.set(signal, { x: -8, opacity: 0 })
          timeline.add(gsap.to(signal, {
            x: () => connector.clientWidth + 8,
            keyframes: { opacity: [0, 1, 1, 0] },
            duration: 1.55,
            delay: connectorIndex * .22 + signalIndex * .72,
            repeat: -1,
            repeatDelay: .25,
            ease: 'none',
          }), 0)
        })
      })

      const particles = gsap.utils.toArray<HTMLElement>('.ambient-data-particles i', root)
      particles.forEach((particle, index) => {
        timeline.add(gsap.fromTo(particle,
          { x: index % 2 ? -5 : 5, y: 10, opacity: .08, scale: .7 },
          { x: index % 2 ? 12 : -10, y: -28, opacity: .72, scale: 1.25, duration: 3.4 + index * .28, delay: index * .68, repeat: -1, yoyo: true, ease: 'sine.inOut' },
        ), 0)
      })

      const scan = root.querySelector('.ambient-core-scan')
      if (scan) timeline.add(gsap.fromTo(scan,
        { xPercent: -135, opacity: 0 },
        { xPercent: 135, opacity: .88, duration: 2.25, repeat: -1, repeatDelay: .55, ease: 'power1.inOut' },
      ), 0)

      gsap.utils.toArray<HTMLElement>('.scene-waveform i', root).forEach((bar, index) => {
        timeline.add(gsap.fromTo(bar,
          { scaleY: .28 + index % 3 * .08 },
          { scaleY: 1.42, duration: .34 + index % 5 * .055, delay: index * .025, repeat: -1, yoyo: true, ease: 'sine.inOut' },
        ), 0)
      })

      gsap.utils.toArray<HTMLElement>('.scene-shell-bar>i b, .ambient-status-dot, .ambient-core>small b', root).forEach((indicator, index) => {
        timeline.add(gsap.to(indicator, { scale: 1.5, opacity: 1, duration: .82, delay: index * .3, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      })

      gsap.utils.toArray<HTMLElement>('.ambient-stage', root).forEach((stage, index) => {
        timeline.add(gsap.to(stage, { y: index % 2 ? 4 : -4, duration: 3.6 + index * .3, delay: index * .22, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      })
    }, root)

    timelineRef.current = timeline
    setTimelineState(timeline, initialActiveRef.current)
    return () => { timelineRef.current = null; timeline.kill(); context.revert() }
  }, [reduced])

  useLayoutEffect(() => {
    if (!reduced) setTimelineState(timelineRef.current, active)
  }, [active, reduced])

  return (
    <div className="ambient-float-wrap">
      <VisualShell rootRef={rootRef} label="Ambient encounter" icon={<Stethoscope size={14} />} className="ambient-visual" livePulse active={active} reduced={reduced}>
        <div className="ambient-data-particles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="ambient-pipeline">
          <div className="ambient-stage ambient-stage-conversation">
            <motion.div className="ambient-dialogue scene-glass-card" animate={!reduced && active ? { transform: ['translate3d(0,0,0)', 'translate3d(0,-2px,0)', 'translate3d(0,0,0)'] } : { transform: 'translate3d(0,0,0)' }} whileHover={reduced ? undefined : { y: -3, transition: { duration: .28, repeat: 0 } }} transition={{ duration: 6.8, repeat: active ? Infinity : 0, ease: 'easeInOut' }}>
              <header><span>01</span><b>Conversation</b><Mic2 size={14} /></header>
              <div><i>DR</i><p><b>Doctor</b>How have you been feeling since your last visit?</p></div>
              <div><i>PT</i><p><b>Patient</b>The discomfort started three days ago.</p></div>
              <small><ShieldCheck size={11} /> Consent confirmed <i className="ambient-status-dot" /></small>
            </motion.div>
          </div>
          <div className="ambient-connector ambient-connector-a" aria-hidden="true"><i /><i /></div>
          <div className="ambient-stage ambient-stage-ai">
            <motion.div className="ambient-core scene-glass-card" animate={!reduced && active ? { transform: ['translate3d(0,0,0)', 'translate3d(0,1.5px,0)', 'translate3d(0,0,0)'] } : { transform: 'translate3d(0,0,0)' }} transition={{ duration: 7.4, repeat: active ? Infinity : 0, ease: 'easeInOut', delay: .7 }}>
              <i className="ambient-core-scan" aria-hidden="true" />
              <span><Sparkles size={13} /> AI understanding</span>
              <div className="scene-waveform" aria-hidden="true">{waveform.map((height, index) => <i key={`${height}-${index}`} style={{ height }} />)}</div>
              <small>Speakers separated <b /> Medical context</small>
            </motion.div>
          </div>
          <div className="ambient-connector ambient-connector-b" aria-hidden="true"><i /><i /></div>
          <div className="ambient-stage ambient-stage-note">
            <motion.div className="ambient-note scene-glass-card" animate={!reduced && active ? { transform: ['translate3d(0,0,0)', 'translate3d(0,-1.5px,0)', 'translate3d(0,0,0)'] } : { transform: 'translate3d(0,0,0)' }} whileHover={reduced ? undefined : { y: -3, transition: { duration: .28, repeat: 0 } }} transition={{ duration: 7.1, repeat: active ? Infinity : 0, ease: 'easeInOut', delay: 1.1 }}>
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
  const reduced = false
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const initialActiveRef = useRef(active)
  const cards = [
    ['Conversation', 'Natural dialogue retained', Mic2],
    ['Clinical context', 'Meaning across the encounter', Stethoscope],
    ['Medical terminology', 'Specialized language recognized', Sparkles],
    ['Structured documentation', 'Ready for clinician review', FileText],
  ] as const

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const timeline = gsap.timeline({ paused: true })
    const context = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.context-flow-path', root)
      const packets = gsap.utils.toArray<SVGCircleElement>('.context-packet', root)
      paths.forEach((path, index) => {
        timeline.add(gsap.to(path, { strokeDashoffset: -76, duration: 2.9 + index * .25, repeat: -1, ease: 'none' }), 0)
        if (packets[index]) timeline.add(pathTraveller(path, packets[index], 2.25 + index * .22, index * .24), 0)
      })
      timeline.add(gsap.to(root.querySelector('.context-core'), { scale: 1.025, duration: 1.35, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      gsap.utils.toArray<HTMLElement>('.context-card-float', root).forEach((card, index) => {
        timeline.add(gsap.to(card, { y: index % 2 ? 4 : -4, duration: 3.3 + index * .25, delay: index * .28, repeat: -1, yoyo: true, ease: 'sine.inOut' }), 0)
      })
    }, root)
    timelineRef.current = timeline
    setTimelineState(timeline, initialActiveRef.current)
    return () => { timelineRef.current = null; timeline.kill(); context.revert() }
  }, [reduced])

  useLayoutEffect(() => {
    if (!reduced) setTimelineState(timelineRef.current, active)
  }, [active, reduced])

  return (
    <VisualShell rootRef={rootRef} label="Clinical context engine" icon={<Workflow size={14} />} className="context-visual" active={active} reduced={reduced}>
      <svg className="context-connections" viewBox="0 0 600 430" aria-hidden="true"><path className="context-flow-path" d="M110 105 C235 105 205 215 300 215" /><path className="context-flow-path" d="M490 105 C365 105 395 215 300 215" /><path className="context-flow-path" d="M110 325 C235 325 205 215 300 215" /><path className="context-flow-path" d="M490 325 C365 325 395 215 300 215" /><circle className="context-packet" r="4" /><circle className="context-packet" r="4" /><circle className="context-packet" r="4" /><circle className="context-packet" r="4" /></svg>
      <div className="context-core"><Sparkles size={18} /><span>Clinical AI</span><i /></div>
      <div className="context-card-grid">
        {cards.map(([title, text, Icon], index) => <div className="context-card-float" key={title}><motion.div className="context-card scene-glass-card" whileHover={reduced ? undefined : { y: -3 }} transition={{ type: 'spring', stiffness: 210, damping: 20 }}><span>0{index + 1}</span><Icon size={17} /><b>{title}</b><p>{text}</p></motion.div></div>)}
      </div>
    </VisualShell>
  )
}

function ImpactVisual({ active }: VisualProps) {
  const reduced = false
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const initialActiveRef = useRef(active)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const timeline = gsap.timeline({ paused: true })
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

      gsap.utils.toArray<HTMLElement>('.impact-status-dot', root).forEach((indicator, index) => {
        timeline.to(indicator, {
          scale: 1.55,
          opacity: 1,
          duration: .8,
          delay: index * .28,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
      })

      gsap.utils.toArray<HTMLElement>('.impact-kpi-card', root).forEach((card, index) => {
        timeline.to(card, {
          y: index % 2 ? 2.5 : -2.5,
          duration: 3 + index * .25,
          delay: index * .2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
      })
    }, root)

    timelineRef.current = timeline
    setTimelineState(timeline, initialActiveRef.current)

    return () => {
      timelineRef.current = null
      timeline.kill()
      context.revert()
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (!reduced) setTimelineState(timelineRef.current, active)
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
  const reduced = false
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const initialActiveRef = useRef(active)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const timeline = gsap.timeline({ paused: true })
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

      gsap.utils.toArray<HTMLElement>('.secure-record>p i', root).forEach((indicator, index) => {
        timeline.to(indicator, {
          scale: 1.75,
          opacity: 1,
          duration: .72,
          delay: index * .28,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
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

      const pulse = root.querySelector<HTMLElement>('.security-pulse')
      if (pulse) {
        timeline.to(pulse, {
          scale: 1.025,
          opacity: .9,
          duration: 1.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
      }

      gsap.utils.toArray<HTMLElement>('.security-node', root).forEach((node, index) => {
        timeline.to(node, {
          y: index % 2 ? 4 : -4,
          duration: 2.7 + index * .18,
          delay: index * .14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0)
      })

      timeline.to('.secure-record', {
        y: -3,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }, 0)

    }, root)

    timelineRef.current = timeline
    setTimelineState(timeline, initialActiveRef.current)

    return () => {
      timelineRef.current = null
      timeline.kill()
      context.revert()
    }
  }, [reduced])

  useLayoutEffect(() => {
    if (!reduced) setTimelineState(timelineRef.current, active)
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

type Scene = { eyebrow: string; shortLabel: string; title: string; description: string; image: ResponsiveImageAsset; position: string; visual: (active: boolean) => ReactNode }
type SceneRequestPriority = 'high' | 'low'

const scenes: Scene[] = [
  { eyebrow: 'Ambient Intelligence', shortLabel: 'Ambient', title: 'Patient conversations, perfectly documented.', description: 'NourDoc listens to natural doctor-patient dialogue and creates structured clinical documentation, helping physicians reduce time spent on manual note-taking.', image: consultationImage, position: '52% center', visual: (active) => <AmbientVisual active={active} /> },
  { eyebrow: 'Why NourDoc', shortLabel: 'Why NourDoc', title: 'Technology that stays out of the clinical conversation.', description: 'NourDoc works quietly around the encounter, helping clinicians stay present while ambient AI organizes the conversation into useful clinical context.', image: naturalCareImage, position: '62% center', visual: (active) => <ContextVisual active={active} /> },
  { eyebrow: 'Healthcare Impact', shortLabel: 'Impact', title: 'Better documentation. Better clinical focus.', description: 'Reduce clerical friction around the encounter so more attention remains available for the patient, the clinical decision and the care that follows.', image: impactImage, position: '40% center', visual: (active) => <ImpactVisual active={active} /> },
  { eyebrow: 'Security & Compliance', shortLabel: 'Security', title: 'Clinical intelligence built for trusted healthcare.', description: 'Patient information requires strong privacy, access-control and governance practices. NourDoc positions security and privacy as foundational requirements.', image: securityImage, position: '48% center', visual: (active) => <SecurityVisual active={active} /> },
]

export function CinematicStory() {
  const rootRef = useRef<HTMLElement>(null)
  const activeRef = useRef(0)
  const transitionRef = useRef<gsap.core.Timeline | null>(null)
  const backgroundRef = useRef<gsap.core.Tween | null>(null)
  const goToRef = useRef<(index: number) => void>(() => undefined)
  const readyScenesRef = useRef(new Set<number>())
  const pendingSceneRef = useRef<number | null>(null)
  const preloadStartedRef = useRef(false)
  const idleHandlesRef = useRef<number[]>([])
  const pageReadyListenerRef = useRef<(() => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [requestedScenes, setRequestedScenes] = useState<Record<number, SceneRequestPriority>>({ 0: 'high' })
  const reduced = false

  const requestScene = useCallback((index: number, priority: SceneRequestPriority) => {
    setRequestedScenes((current) => {
      if (current[index] === 'high' || current[index] === priority) return current
      return { ...current, [index]: priority }
    })
  }, [])

  const scheduleIdleScenes = useCallback(() => {
    if (preloadStartedRef.current) return
    preloadStartedRef.current = true
    const requestIdle = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 16 }), 1))
    idleHandlesRef.current.push(requestIdle(() => requestScene(2, 'low'), { timeout: 1800 }))
    idleHandlesRef.current.push(requestIdle(() => requestScene(3, 'low'), { timeout: 2600 }))
  }, [requestScene])

  const handleSceneDecoded = useCallback((index: number) => {
    if (readyScenesRef.current.has(index)) return
    readyScenesRef.current.add(index)

    if (index === 0) {
      signalCriticalHeroReady()
      requestScene(1, 'low')

      if (document.body.hasAttribute('aria-busy')) {
        const onPageReady = () => {
          pageReadyListenerRef.current = null
          scheduleIdleScenes()
        }
        pageReadyListenerRef.current = onPageReady
        window.addEventListener('nourdoc:ready', onPageReady, { once: true })
      } else {
        scheduleIdleScenes()
      }
    }

    if (pendingSceneRef.current === index) {
      pendingSceneRef.current = null
      window.requestAnimationFrame(() => goToRef.current(index))
    }
  }, [requestScene, scheduleIdleScenes])

  useEffect(() => () => {
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout
    idleHandlesRef.current.forEach((handle) => cancelIdle(handle))
    if (pageReadyListenerRef.current) window.removeEventListener('nourdoc:ready', pageReadyListenerRef.current)
    delete document.documentElement.dataset.heroReady
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const mobile = window.matchMedia('(max-width: 700px)').matches

    const context = gsap.context(() => {
      const sceneElements = gsap.utils.toArray<HTMLElement>('.rotating-scene', root)
      const intensity = mobile ? .45 : 1

      gsap.set(sceneElements, { autoAlpha: 0, zIndex: 0, transformPerspective: 1400, transformOrigin: 'center center' })
      gsap.set(sceneElements[0], { autoAlpha: 1, zIndex: 2 })
      let intro: gsap.core.Timeline | null = null

      const stopBackground = () => {
        backgroundRef.current?.kill(); backgroundRef.current = null
      }

      const startBackground = (scene: HTMLElement) => {
        const image = scene.querySelector<HTMLElement>('.rotating-scene-image')
        if (!image || document.hidden) return

        backgroundRef.current?.kill()
        gsap.set(image, { scale: reduced ? 1 : 1.025, x: 0, y: 0, willChange: reduced ? 'auto' : 'transform' })
        if (!reduced) {
          backgroundRef.current = gsap.to(image, {
            scale: 1.07,
            x: mobile ? -1 : -5,
            y: mobile ? 1 : 3,
            duration: 18,
            ease: 'sine.inOut',
            force3D: true,
            overwrite: 'auto',
          })
        }
      }

      const goTo = (requested: number) => {
        const next = (requested + sceneElements.length) % sceneElements.length
        const current = activeRef.current
        if (transitionRef.current?.isActive()) return
        if (next === current) return
        if (!readyScenesRef.current.has(next)) {
          pendingSceneRef.current = next
          requestScene(next, 'high')
          return
        }

        intro?.kill(); intro = null
        stopBackground()
        const outgoing = sceneElements[current]
        const incoming = sceneElements[next]
        const incomingImage = incoming.querySelector('.rotating-scene-image')
        const outgoingImage = outgoing.querySelector('.rotating-scene-image')
        const incomingSequence = incoming.querySelectorAll<HTMLElement>('[data-scene-sequence]')
        const incomingVisual = incoming.querySelector('.scene-visual-shell')
        const sweep = incoming.querySelector('.scene-light-sweep')

        gsap.set([outgoing, incoming], { willChange: 'transform,opacity' })
        gsap.set([outgoingImage, incomingImage], { willChange: 'transform' })

        activeRef.current = next
        setActiveIndex(next)

        const duration = reduced ? .26 : .95
        const timeline = gsap.timeline({
          defaults: { ease: reduced ? 'power1.out' : 'power3.inOut' },
          onComplete: () => {
            gsap.set(outgoing, { autoAlpha: 0, zIndex: 0, clearProps: 'transform,willChange' })
            gsap.set(outgoingImage, { clearProps: 'willChange' })
            gsap.set(incoming, { autoAlpha: 1, zIndex: 2, clearProps: 'transform,willChange' })
            gsap.set(incomingImage, { clearProps: 'willChange' })
            transitionRef.current = null
            startBackground(incoming)
          },
        })
        transitionRef.current = timeline

        timeline
          .set(incoming, { autoAlpha: 0, zIndex: 3, rotateY: reduced ? 0 : 2.6 * intensity, rotateX: reduced ? 0 : -.45 * intensity, scale: reduced ? 1 : .975, z: reduced ? 0 : -38 * intensity, force3D: true })
          .set(incomingImage, { scale: reduced ? 1 : 1.03, x: reduced ? 0 : 8 * intensity, y: reduced ? 0 : -4 * intensity })
          .set(incomingSequence, { opacity: 0, y: reduced ? 0 : 24 })
          .set(incomingVisual, { opacity: 0, x: reduced ? 0 : 34 * intensity, scale: reduced ? 1 : .97 })
          .set(sweep, { opacity: 0, xPercent: -120 })
          .to(outgoing, { rotateY: reduced ? 0 : -2.6 * intensity, rotateX: reduced ? 0 : .45 * intensity, scale: reduced ? 1 : 1.025, z: reduced ? 0 : 30 * intensity, autoAlpha: 0, duration, force3D: true }, 0)
          .to(outgoingImage, { scale: reduced ? 1 : 1.075, x: reduced ? 0 : -8 * intensity, y: reduced ? 0 : 4 * intensity, duration }, 0)
          .to(incoming, { rotateY: 0, rotateX: 0, scale: 1, z: 0, autoAlpha: 1, duration, force3D: true }, 0)
          .to(incomingImage, { scale: reduced ? 1 : 1.025, x: 0, y: 0, duration }, 0)
          .to(incomingSequence, { opacity: 1, y: 0, duration: reduced ? .22 : .58, stagger: reduced ? 0 : .075, ease: 'power3.out', force3D: true }, reduced ? .04 : .34)
          .to(incomingVisual, { opacity: 1, x: 0, scale: 1, duration: reduced ? .25 : .72, ease: 'power3.out' }, reduced ? .05 : .48)
          .to(sweep, { opacity: reduced ? 0 : .32, xPercent: 120, duration: .9, ease: 'power2.inOut' }, .22)
          .to(sweep, { opacity: 0, duration: .18, ease: 'power1.out' }, 1.12)
      }

      goToRef.current = goTo

      const first = sceneElements[0]
      const firstSequence = first.querySelectorAll<HTMLElement>('[data-scene-sequence]')
      const firstVisual = first.querySelector('.scene-visual-shell')
      if (reduced) {
        gsap.set([firstSequence, firstVisual], { opacity: 1, clearProps: 'transform,filter' })
        startBackground(first)
      } else {
        gsap.set(first.querySelector('.rotating-scene-image'), { willChange: 'transform' })
        intro = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => startBackground(first) })
        intro.from(first.querySelector('.rotating-scene-image'), { scale: 1.03, x: 7, duration: 1.15 }, 0)
          .from(firstSequence, { y: 12, duration: .45, stagger: .045, force3D: true }, 0)
          .fromTo(firstVisual,
            { opacity: .84, x: 16, scale: .985 },
            { opacity: 1, x: 0, scale: 1, duration: .64, clearProps: 'opacity,transform' },
            .04,
          )
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

        const target = event.target as HTMLElement | null
        if (target?.matches('input, textarea, select, [contenteditable="true"]')) return

        const bounds = root.getBoundingClientRect()
        if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return

        event.preventDefault()
        goTo(event.key === 'ArrowLeft' ? activeRef.current - 1 : activeRef.current + 1)
      }

      let pointerStart: { x: number; y: number; id: number } | null = null
      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'mouse') return
        pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId }
      }
      const onPointerUp = (event: PointerEvent) => {
        if (!pointerStart || pointerStart.id !== event.pointerId) return
        const deltaX = event.clientX - pointerStart.x
        const deltaY = event.clientY - pointerStart.y
        pointerStart = null
        if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return
        goTo(deltaX > 0 ? activeRef.current - 1 : activeRef.current + 1)
      }
      const onPointerCancel = () => { pointerStart = null }

      window.addEventListener('keydown', onKeyDown)
      root.addEventListener('pointerdown', onPointerDown)
      root.addEventListener('pointerup', onPointerUp)
      root.addEventListener('pointercancel', onPointerCancel)
      return () => {
        window.removeEventListener('keydown', onKeyDown)
        root.removeEventListener('pointerdown', onPointerDown)
        root.removeEventListener('pointerup', onPointerUp)
        root.removeEventListener('pointercancel', onPointerCancel)
        intro?.kill(); stopBackground(); transitionRef.current?.kill()
      }
    }, root)

    return () => context.revert()
  }, [reduced, requestScene])

  return (
    <section ref={rootRef} className="rotating-hero" aria-label="NourDoc clinical intelligence overview">
      <style>{HERO_VISUAL_TEXT_STYLES}</style>
      <div className="rotating-hero-viewport">
        {scenes.map((scene, index) => (
          <article className={`rotating-scene rotating-scene-${index + 1}`} key={scene.eyebrow} aria-hidden={activeIndex !== index}>
            <div className="rotating-scene-bg" aria-hidden="true">
              {requestedScenes[index] && (
                <ResponsivePicture
                  asset={scene.image}
                  sizes="100vw"
                  pictureClassName="rotating-scene-picture"
                  className="rotating-scene-image"
                  alt=""
                  loading="eager"
                  fetchPriority={requestedScenes[index]}
                  decoding="async"
                  style={{ objectPosition: scene.position }}
                  onDecoded={() => handleSceneDecoded(index)}
                />
              )}
            </div>
            <div className="rotating-scene-overlay" aria-hidden="true" /><div className="scene-atmosphere" aria-hidden="true" /><div className="scene-light-sweep" aria-hidden="true" />
            <svg className="scene-data-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M0 690 C300 650 400 510 685 520 S1080 690 1440 410" /><path d="M610 0 C610 230 820 290 955 370 S1230 420 1440 225" /><circle cx="685" cy="520" r="3" /><circle cx="955" cy="370" r="3" /><circle cx="1215" cy="535" r="3" /></svg>
            <div className="scene-depth-nodes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
            <div className="container rotating-scene-layout">
              <div className="rotating-scene-copy">
                <span className="eyebrow" data-scene-sequence><i />{scene.eyebrow}</span>
                {index === 0 ? <h1 data-scene-sequence>{scene.title}</h1> : <h2 data-scene-sequence>{scene.title}</h2>}
                <p data-scene-sequence>{scene.description}</p>
                <div className="scene-actions" data-scene-sequence>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: .985 }}><Link tabIndex={activeIndex === index ? 0 : -1} className="button scene-primary-action" to="/contact">Book a Demo<ArrowRight size={17} /></Link></motion.div>
                  <motion.div whileHover={{ x: 3 }}><Link tabIndex={activeIndex === index ? 0 : -1} className="scene-secondary-action" to="/product">Explore the platform<ArrowRight size={16} /></Link></motion.div>
                </div>
              </div>
              <div className="rotating-scene-visual">{scene.visual(activeIndex === index)}</div>
            </div>
          </article>
        ))}
        <div className="container rotation-controls">
          <div className="rotation-indicators" aria-label="Choose hero scene">
            {scenes.map((scene, index) => <button type="button" key={scene.eyebrow} className={`rotation-control ${activeIndex === index ? 'is-active' : ''}`} onClick={() => goToRef.current(index)} aria-current={activeIndex === index ? 'true' : undefined} aria-label={`Show scene ${index + 1}: ${scene.eyebrow}`}><span><b>0{index + 1}</b>{scene.shortLabel}</span><i><em className="rotation-progress-fill" /></i></button>)}
          </div>
          <div className="rotation-arrows" aria-label="Navigate hero scenes">
            <button type="button" onClick={() => goToRef.current(activeRef.current - 1)} aria-label="Previous scene"><ArrowLeft aria-hidden="true" /><span>Previous Scene</span></button>
            <button type="button" onClick={() => goToRef.current(activeRef.current + 1)} aria-label="Next scene"><ArrowRight aria-hidden="true" /><span>Next Scene</span></button>
          </div>
        </div>
      </div>
    </section>
  )
}
