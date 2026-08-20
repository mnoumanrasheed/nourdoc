import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { partnerCategories } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import heroImage from '../assets/06-partners-healthcare-collaboration.jpg'

export default function Partners() {
  usePageMeta('Partners', 'NourDoc works alongside hospitals, clinics, medical universities, health technology vendors and healthcare service partners.')
  return <>
    <PageHero variant="partners" image={heroImage} imageAlt="Healthcare professionals collaborating around clinical technology" imagePosition="center" eyebrow="Partners" title="Built to work alongside the healthcare ecosystem, not around it." text="NourDoc is positioned to work with the systems and organizations that already support healthcare delivery." />
    <section className="section container"><AnimatedSection><SectionHeader eyebrow="Healthcare ecosystem" title="Different organizations. One connected care environment." text="No invented logos or customer claims—only the partner categories central to NourDoc’s ecosystem approach." /></AnimatedSection><div className="partner-category-grid">{partnerCategories.map(({ title, icon: Icon }, i) => <AnimatedSection className="partner-category" key={title} variant="card" interactive index={i}><span>{(i + 1).toString().padStart(2, '0')}</span><Icon /><h3>{title}</h3></AnimatedSection>)}</div></section>
    <section className="section section-soft"><div className="container partner-journey"><AnimatedSection><span className="eyebrow">How partnership takes shape</span><h2>Start with the healthcare workflow.</h2></AnimatedSection><div>{['Understand the care environment', 'Identify the documentation opportunity', 'Align systems, roles and governance', 'Define a responsible path forward'].map((item, i) => <AnimatedSection key={item}><span>{i + 1}</span><p>{item}</p></AnimatedSection>)}</div></div></section>
    <section className="section container statement-band"><AnimatedSection><p>Partnership should make healthcare technology feel more connected—not create one more silo.</p><Link to="/contact" className="text-link">Start a partnership conversation<ArrowRight /></Link></AnimatedSection></section>
    <CTASection title="Become a NourDoc partner." text="Let’s explore how NourDoc can support the healthcare organizations and workflows you serve." label="Talk to Partnerships" />
  </>
}
