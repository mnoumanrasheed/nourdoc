import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from '../navigation/Navbar'
import { motionDurations, motionEase, pageTransition } from '../../utils/motion'

export function SiteLayout() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return <><a className="skip-link" href="#main-content">Skip to main content</a><Navbar /><main id="main-content"><AnimatePresence mode="wait" initial={false}><motion.div className="page-transition" key={pathname} initial={reduced ? false : pageTransition.initial} animate={pageTransition.animate} exit={reduced ? undefined : pageTransition.exit} transition={{ duration: reduced ? 0 : motionDurations.base, ease: motionEase }}><Outlet /></motion.div></AnimatePresence></main><Footer /></>
}
