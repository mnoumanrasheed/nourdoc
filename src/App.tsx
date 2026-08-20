import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'

const Home = lazy(() => import('./pages/Home'))
const WhyNourDoc = lazy(() => import('./pages/WhyNourDoc'))
const Product = lazy(() => import('./pages/Product'))
const HealthcareImpact = lazy(() => import('./pages/HealthcareImpact'))
const SecurityCompliance = lazy(() => import('./pages/SecurityCompliance'))
const Partners = lazy(() => import('./pages/Partners'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  return (
    <Suspense fallback={<div className="page-loader" role="status"><span>Loading NourDoc</span></div>}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/why-nourdoc" element={<WhyNourDoc />} />
          <Route path="/product" element={<Product />} />
          <Route path="/healthcare-impact" element={<HealthcareImpact />} />
          <Route path="/security-compliance" element={<SecurityCompliance />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
