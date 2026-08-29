import Hero from '../components/Hero'
import Section from '../components/Section'
import WorkGrid from '../components/WorkGrid'

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="work" title="Selected work">
        <WorkGrid />
      </Section>
      <Section id="about" title="About" note="Placeholder." />
      <Section id="photography" title="Photography" note="Placeholder." />
      <Section id="contact" title="Get in touch" note="Placeholder." />
    </>
  )
}
