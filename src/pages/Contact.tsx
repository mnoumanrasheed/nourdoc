import { ArrowRight, Building2, Handshake, Headphones, LineChart, PlayCircle } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { usePageMeta } from '../hooks/usePageMeta'

const contactPaths = [
  { title: 'Book a Demo', text: 'Explore the product workflow with our team.', icon: PlayCircle },
  { title: 'Request a Trial', text: 'Discuss trial suitability and next steps.', icon: Building2 },
  { title: 'Support', text: 'Get help with NourDoc.', icon: Headphones },
  { title: 'Investor Relations', text: 'Start an investment conversation.', icon: LineChart },
  { title: 'Partnerships', text: 'Explore an ecosystem partnership.', icon: Handshake },
]

export default function Contact() {
  usePageMeta('Contact', 'Contact NourDoc for product demonstrations, trials, sales, support, partnerships or investment inquiries.')
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  return <>
    <PageHero variant="contact" eyebrow="Contact" title="Let’s talk about giving your physicians their time back." text="Contact NourDoc for product demonstrations, trials, sales, support, partnerships or investment inquiries." />
    <section className="section container"><AnimatedSection><SectionHeader eyebrow="Start in the right place" title="How can we help?" /></AnimatedSection><div className="contact-paths">{contactPaths.map(({ title, text, icon: Icon }, index) => <AnimatedSection key={title} variant="card" index={index}><a className="contact-path" href="#contact-form"><Icon /><h3>{title}</h3><p>{text}</p><ArrowRight /></a></AnimatedSection>)}</div></section>
    <section id="contact-form" className="section section-soft"><div className="container contact-grid"><AnimatedSection><span className="eyebrow">Send an inquiry</span><h2>Tell us what you’re working on.</h2><p>We’ll use your details only to respond to your inquiry. Public contact email addresses should be confirmed by the NourDoc team before launch.</p><div className="contact-note"><strong>Contact details pending launch confirmation</strong><span>The supplied brief lists multiple legacy and current support addresses, so none are published here as definitive.</span></div></AnimatedSection><AnimatedSection>
      {submitted ? <div className="form-success" role="status"><span>Thank you</span><h3>Your inquiry is ready for the NourDoc team.</h3><p>This frontend demonstration does not send data to a backend.</p><button type="button" className="button button-secondary" onClick={() => setSubmitted(false)}>Send another inquiry</button></div> : <form className="contact-form" onSubmit={submit}>
        <label>Full Name<input name="name" autoComplete="name" required /></label>
        <label>Work Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Organization<input name="organization" autoComplete="organization" required /></label>
        <label>Interest<select name="interest" required defaultValue=""><option value="" disabled>Select an interest</option>{['Book a Demo','Free Trial','Sales','Support','Investor Relations','Partnership'].map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="full-field">Message<textarea name="message" rows={5} required /></label>
        <button className="button button-primary full-field" type="submit">Send inquiry<ArrowRight /></button>
      </form>}
    </AnimatedSection></div></section>
    <section className="section container"><AnimatedSection><SectionHeader eyebrow="Common questions" title="A few useful starting points." /></AnimatedSection><div className="faq-grid">{[
      ['How quickly can we get started?', 'Practices can be onboarded quickly, while integration timing depends on complexity. Confirm timelines with the NourDoc team.'],
      ['Does NourDoc integrate with our existing EMR?', 'NourDoc has an integration-oriented platform position. Current EMR/HMIS and API availability should be confirmed for your environment.'],
      ['Is patient consent required?', 'The product content describes consent prompts and recording indicators.'],
      ['Who reviews generated documentation?', 'The clinician reviews and approves the generated documentation before the final record is accepted.'],
    ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  </>
}
