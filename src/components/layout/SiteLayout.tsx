import { Suspense, useLayoutEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from '../navigation/Navbar'

export function SiteLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <div className="page-transition">
          <Suspense fallback={null}>{outlet}</Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
