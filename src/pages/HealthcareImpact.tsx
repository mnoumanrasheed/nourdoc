import localImage from '../assets/pakistani-consultation.jpg'
import patientExperienceImage from '../assets/international-consultation.jpg'
import heroImage from '../assets/04-healthcare-impact-patient-care.jpg'
import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { impactAreas } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function HealthcareImpact() {
  usePageMeta('Healthcare Impact', 'Explore how NourDoc is designed to reduce clerical friction across clinical, patient, operational, financial and compliance workflows.')
  return <>
    <PageHero variant="impact" image={heroImage} imageAlt="Physician providing attentive care to a young patient" imagePosition="38% center" eyebrow="Healthcare Impact" title="Measured impact across clinical, financial, operational and patient outcomes." text="NourDoc is designed to improve more than the documentation workflow by helping reduce clerical friction around the clinical encounter." />
    <ImageStory image={patientExperienceImage} objectPosition="50% center" alt="Physician listening attentively during a patient consultation" eyebrow="Patient experience" title="Visits that feel like conversations again." text="When physicians spend less time typing during consultations, more attention can remain on the patient interaction." points={['Physician attentiveness', 'Less screen time', 'Reduced documentation burden']} />
    <section className="section section-soft"><div className="container"><AnimatedSection><SectionHeader eyebrow="Areas of impact" title="Practical outcomes across the care environment." text="The platform is positioned around workflow benefits rather than unverified numerical claims." /></AnimatedSection><div className="impact-editorial">{impactAreas.map(({ title, text, icon: Icon }, i) => <AnimatedSection className="impact-editorial-card" key={title} variant="card" interactive index={i}><span>0{i + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></AnimatedSection>)}</div></div></section>
    <ImageStory reverse image={localImage} objectPosition="68% center" alt="Pakistani doctor listening during a consultation" eyebrow="Clinical attention" title="Documentation should support the visit—not interrupt it." text="NourDoc is designed to reduce the manual documentation surrounding care so the clinical team can keep more of its attention where it belongs." />
    <section className="section container"><AnimatedSection className="principle-panel"><span className="eyebrow">A clear evidence standard</span><h2>Claims should earn trust.</h2><p>We do not publish legacy headline statistics until their source and applicability are validated. NourDoc’s public story stays focused on the product workflow and the outcomes it is designed to support.</p></AnimatedSection></section>
    <CTASection />
  </>
}
