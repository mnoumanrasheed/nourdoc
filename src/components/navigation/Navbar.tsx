import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, Play, X } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import logo from '../../assets/nourdoc-logo.png'
import { navItems } from '../../data/site'
import { preloadRoute } from '../../utils/routeLoaders'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.m3hive.medicalai&pli=1'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    if (!open) return
    const nav = mobileNavRef.current
    const focusable = nav?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const focusTimer = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 50)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <Link to="/" className="brand" onPointerEnter={() => preloadRoute('/')} onFocus={() => preloadRoute('/')} onTouchStart={() => preloadRoute('/')} onClick={() => setOpen(false)} aria-label="NourDoc home">
          <img src={logo} alt="" width="240" height="240" loading="eager" fetchPriority="high" decoding="async" /><span>Nour<span>Doc</span></span>
        </Link>
        <div className="desktop-nav">
          {navItems.map(item => <NavLink key={item.path} to={item.path} onPointerEnter={() => preloadRoute(item.path)} onFocus={() => preloadRoute(item.path)} onTouchStart={() => preloadRoute(item.path)}>{({ isActive }) => <>{item.label}{isActive && <motion.span className="nav-active-indicator" layoutId="nav-active" transition={{ type: 'spring', stiffness: 360, damping: 30 }} />}</>}</NavLink>)}
        </div>
        <motion.div className="nav-app-cta-wrap" whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .98 }}>
          <a className="nav-app-cta" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Play size={13} fill="currentColor" aria-hidden="true" />Try NourDoc
          </a>
        </motion.div>
        <motion.div className="nav-cta-wrap" whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .98 }}><Link to="/contact" className="button button-primary nav-cta" onPointerEnter={() => preloadRoute('/contact')} onFocus={() => preloadRoute('/contact')} onTouchStart={() => preloadRoute('/contact')} onClick={() => setOpen(false)}>Book a Demo<ArrowUpRight size={17} /></Link></motion.div>
        <motion.button whileTap={reduced ? undefined : { scale: .92 }} ref={menuButtonRef} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X /> : <Menu />}
        </motion.button>
      </nav>
      <div
        className={`mobile-nav-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        ref={mobileNavRef}
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-panel">
          <div className="mobile-nav-links">
            <NavLink
              ref={firstMobileLinkRef}
              to="/"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onPointerEnter={() => preloadRoute('/')}
              onTouchStart={() => preloadRoute('/')}
              onFocus={() => preloadRoute('/')}
              onClick={() => setOpen(false)}
            >
              <span>Home</span>
              <span className="mobile-nav-dot" aria-hidden="true" />
            </NavLink>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onPointerEnter={() => preloadRoute(item.path)}
                onTouchStart={() => preloadRoute(item.path)}
                onFocus={() => preloadRoute(item.path)}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <span className="mobile-nav-dot" aria-hidden="true" />
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onPointerEnter={() => preloadRoute('/contact')}
              onTouchStart={() => preloadRoute('/contact')}
              onFocus={() => preloadRoute('/contact')}
              onClick={() => setOpen(false)}
            >
              <span>Contact</span>
              <span className="mobile-nav-dot" aria-hidden="true" />
            </NavLink>
          </div>
          <a
            href={PLAY_STORE_URL}
            className="button mobile-nav-app-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <Play size={14} fill="currentColor" aria-hidden="true" />Try NourDoc
          </a>
          <Link
            to="/contact"
            className="button button-primary mobile-nav-cta"
            onPointerEnter={() => preloadRoute('/contact')}
            onTouchStart={() => preloadRoute('/contact')}
            onFocus={() => preloadRoute('/contact')}
            onClick={() => setOpen(false)}
          >
            Book a Demo<ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
