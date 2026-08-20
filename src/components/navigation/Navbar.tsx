import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import logo from '../../assets/nourdoc-logo.png'
import { navItems } from '../../data/site'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="container navbar" aria-label="Primary navigation">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="NourDoc home">
          <img src={logo} alt="" /><span>Nour<span>Doc</span></span>
        </Link>
        <div className="desktop-nav">
          {navItems.map(item => <NavLink key={item.path} to={item.path}>{item.label}</NavLink>)}
        </div>
        <Link to="/contact" className="button button-primary nav-cta">Book a Demo<ArrowUpRight size={17} /></Link>
        <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <nav ref={mobileNavRef} id="mobile-navigation" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label="Mobile navigation">
        <div className="container">
          <NavLink ref={firstMobileLinkRef} to="/" onClick={() => setOpen(false)}>Home</NavLink>
          {navItems.map(item => <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          <Link to="/contact" className="button button-primary" onClick={() => setOpen(false)}>Book a Demo<ArrowUpRight size={17} /></Link>
        </div>
      </nav>
    </header>
  )
}
