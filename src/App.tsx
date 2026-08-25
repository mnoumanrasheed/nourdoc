import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import Home from './pages/Home'
import { routeLoaders } from './utils/routeLoaders'

const WhyNourDoc = lazy(routeLoaders['/why-nourdoc'])
const Product = lazy(routeLoaders['/product'])
const HealthcareImpact = lazy(routeLoaders['/healthcare-impact'])
const SecurityCompliance = lazy(routeLoaders['/security-compliance'])
const Partners = lazy(routeLoaders['/partners'])
const About = lazy(routeLoaders['/about'])
const Contact = lazy(routeLoaders['/contact'])

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
