import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import Home from './pages/Home'
import WhyNourDoc from './pages/WhyNourDoc'
import Product from './pages/Product'
import HealthcareImpact from './pages/HealthcareImpact'
import SecurityCompliance from './pages/SecurityCompliance'
import Partners from './pages/Partners'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
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
  )
}
