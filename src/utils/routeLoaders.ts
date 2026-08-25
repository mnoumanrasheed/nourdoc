import {
  aboutDoctorImage,
  healthcareImpactImage,
  homeConsultationImage,
  partnersImage,
  productWorkflowImage,
  securityWorkflowImage,
  whyNourDocImage,
  type ResponsiveImageAsset,
} from '../data/responsiveImages'
import { preloadResponsiveImage } from './imagePreload'

const loaders = {
  '/why-nourdoc': () => import('../pages/WhyNourDoc'),
  '/product': () => import('../pages/Product'),
  '/healthcare-impact': () => import('../pages/HealthcareImpact'),
  '/security-compliance': () => import('../pages/SecurityCompliance'),
  '/partners': () => import('../pages/Partners'),
  '/about': () => import('../pages/About'),
  '/contact': () => import('../pages/Contact'),
}

const heroImages: Partial<Record<string, ResponsiveImageAsset>> = {
  '/': homeConsultationImage,
  '/why-nourdoc': whyNourDocImage,
  '/product': productWorkflowImage,
  '/healthcare-impact': healthcareImpactImage,
  '/security-compliance': securityWorkflowImage,
  '/partners': partnersImage,
  '/about': aboutDoctorImage,
}

const pendingRoutes = new Map<string, Promise<unknown>>()

export const routeLoaders = loaders

export function preloadRoute(path: string) {
  const loader = loaders[path as keyof typeof loaders]
  const heroImage = heroImages[path]

  if (loader && !pendingRoutes.has(path)) {
    const pending = loader().catch(() => {
      pendingRoutes.delete(path)
    })
    pendingRoutes.set(path, pending)
  }

  if (heroImage) void preloadResponsiveImage(heroImage)
}
