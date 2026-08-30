import { Suspense, useLayoutEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from '../navigation/Navbar'

export function SiteLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <div className="page-transition">
          <Suspense fallback={<div className="route-loading-shell" aria-hidden="true" />}>{outlet}</Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
