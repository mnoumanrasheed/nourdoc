import storyImage from '../assets/pakistani-consultation.jpg'
import heroImage from '../assets/07-about-nourdoc-local-doctor-web.jpg'
import { CTASection } from '../components/common/CTASection'
import { PageHero } from '../components/common/PageHero'
import { SectionHeader } from '../components/common/SectionHeader'
import { ImageStory } from '../components/sections/ImageStory'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { buildGroups } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const roadmap = ['More specialty-specific documentation templates', 'Deeper EMR / HMIS integrations', 'Clinical AI agents', 'Expanded multilingual support']

export default function About() {
  usePageMeta('About', 'NourDoc was created to reduce documentation as a barrier between physicians and patients.')
  return <>
    <PageHero variant="about" image={heroImage} imageAlt="Physician in a patient-centered consultation" imagePosition="44% center" eyebrow="About NourDoc" title="Built with physicians, for the time they don’t have." text="NourDoc was created around the observation that clinicians spend substantial time documenting care. The product aims to reduce documentation as a barrier between physicians and patients." />
    <ImageStory image={storyImage} objectPosition="68% center" alt="Physician listening during a consultation" eyebrow="Origin story" title="The best clinical technology makes room for the human moment." text="NourDoc began with a simple observation: the record matters, but so does the conversation that creates it. The platform is designed to make those two needs work together." />
    <section className="section container mission-grid"><AnimatedSection variant="card" interactive><span className="eyebrow">Mission</span><h2>Return the exam room to the conversation.</h2><p>Build technology that removes documentation friction between physicians and patients.</p></AnimatedSection><AnimatedSection variant="card" interactive index={1}><span className="eyebrow">Vision</span><h2>Ambient intelligence as the standard of care.</h2><p>Clinical encounters captured accurately and completely with less manual documentation work from physicians.</p></AnimatedSection></section>
    <section className="section section-soft"><div className="container"><AnimatedSection><SectionHeader eyebrow="How we build" title="Clinical context meets technical craft." /></AnimatedSection><div className="build-grid">{buildGroups.map(({ title, icon: Icon }, index) => <AnimatedSection key={title} variant="card" interactive index={index}><Icon /><h3>{title}</h3></AnimatedSection>)}</div></div></section>
    <section className="section container roadmap"><AnimatedSection><span className="eyebrow">Future direction</span><h2>A roadmap, clearly described as a roadmap.</h2><p>These themes are future direction and should not be interpreted as currently available functionality.</p></AnimatedSection><div>{roadmap.map((item, i) => <AnimatedSection key={item}><span>0{i + 1}</span><h3>{item}</h3><span className="status-pill future">Roadmap</span></AnimatedSection>)}</div></section>
    <CTASection />
  </>
}
