import { useLayoutEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from '../navigation/Navbar'

export function SiteLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <div key={pathname} className="page-transition">
          {outlet}
        </div>
      </main>
      <Footer />
    </>
  )
}
