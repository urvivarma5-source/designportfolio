import Hero from '../components/Hero'
import Section from '../components/Section'
import WorkGrid from '../components/WorkGrid'

// The landing page is the hero and the work, and nothing else. About,
// Photography and Contact used to be placeholder sections in this scroll; they
// are their own routes now, so scrolling the landing page shows work only.
// See DESIGN.md §7.1.
export default function Home() {
  return (
    <>
      <Hero />
      <Section id="work" title="Selected work">
        <WorkGrid />
      </Section>
    </>
  )
}
