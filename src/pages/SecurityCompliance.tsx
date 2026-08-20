import { CloudCog, Database, KeyRound, LifeBuoy, RefreshCcw, ShieldCheck } from 'lucide-react'
import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { securityTopics } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import heroImage from '../assets/05-security-clinical-data-workflow.jpg'

const additional = [
  { title: 'Encryption', text: 'Encryption is part of the existing security positioning; implementation specifics require confirmation.', icon: KeyRound },
  { title: 'Data residency', text: 'Deployment considerations can include where healthcare information is stored and processed.', icon: Database },
  { title: 'Zero trust architecture', text: 'The existing platform positioning includes a zero-trust security approach.', icon: ShieldCheck },
  { title: 'Disaster recovery', text: 'Resilience planning is part of the enterprise security conversation.', icon: RefreshCcw },
  { title: 'Business continuity', text: 'Operational continuity is considered alongside platform security.', icon: LifeBuoy },
  { title: 'Secure cloud infrastructure', text: 'Existing positioning describes hardened and monitored cloud infrastructure.', icon: CloudCog },
]

export default function SecurityCompliance() {
  usePageMeta('Security & Compliance', 'NourDoc security positioning covers HIPAA alignment, GDPR readiness, privacy by design, access control, audit logs and secure infrastructure.')
  return <>
    <PageHero variant="security" image={heroImage} imageAlt="Clinician working securely with a laptop in a healthcare environment" imagePosition="46% center" eyebrow="Security & Compliance" title="Built for the security bar healthcare enterprises require." text="Patient information requires strong privacy, access-control and governance practices. NourDoc positions security and privacy as foundational product requirements." />
    <section className="section container trust-markers"><AnimatedSection className="trust-marker" variant="card" interactive><span>US</span><div><span className="eyebrow">United States</span><h2>HIPAA Aligned</h2><p>Administrative, physical and technical safeguards aligned to HIPAA requirements for protected health information.</p></div></AnimatedSection><AnimatedSection className="trust-marker" variant="card" interactive index={1}><span>UK</span><div><span className="eyebrow">U.K. & international</span><h2>GDPR Ready</h2><p>Data-subject rights, lawful basis and processing agreements supported for international deployments.</p></div></AnimatedSection></section>
    <section className="section security-preview"><div className="container"><AnimatedSection><SectionHeader eyebrow="Trust framework" title="Privacy, access and accountability." text="These carefully scoped terms communicate product direction without claiming certifications that have not been confirmed." /></AnimatedSection><div className="security-grid">{securityTopics.map(({ title, text, icon: Icon }, index) => <AnimatedSection className="security-card" key={title} variant="card" interactive index={index}><Icon /><h3>{title}</h3><p>{text}</p></AnimatedSection>)}</div></div></section>
    <section className="section container"><AnimatedSection><SectionHeader eyebrow="Enterprise resilience" title="Security extends beyond the sign-in screen." text="Additional existing topics are presented at principle level; detailed implementation language should be validated before launch." /></AnimatedSection><div className="security-detail-list">{additional.map(({ title, text, icon: Icon }, index) => <AnimatedSection key={title} variant="left" index={index}><Icon /><div><h3>{title}</h3><p>{text}</p></div></AnimatedSection>)}</div></section>
    <section className="section section-soft"><div className="container privacy-principle"><AnimatedSection><span className="eyebrow">Patient Privacy By Design</span><h2>Consent before capture. Control by role. Review by clinician.</h2></AnimatedSection><AnimatedSection><p>NourDoc’s security story begins with the clinical workflow itself: consent-first recording, visible recording controls, limited access according to role and clinician review before documentation is accepted.</p></AnimatedSection></div></section>
    <CTASection title="Talk to us about your security requirements." text="Discuss deployment, privacy and governance expectations with the NourDoc team." />
  </>
}
