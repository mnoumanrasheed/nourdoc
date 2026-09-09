import { DemoBookingFlow } from '../components/contact/DemoBookingFlow'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Contact() {
  usePageMeta(
    'Book a Demo',
    'Request a focused NourDoc demonstration shaped around your healthcare organisation and clinical workflow.',
  )

  return <DemoBookingFlow />
}

