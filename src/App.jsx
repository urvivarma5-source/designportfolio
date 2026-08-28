import { useEffect } from 'react'
import Hero from './components/Hero'
import Section from './components/Section'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <main>
      <Hero />
      <Section
        id="work"
        index="01 — Work"
        title="Selected work"
        note="Placeholder — case studies land here, migrated from the Adobe Portfolio site."
      />
      <Section
        id="about"
        index="02 — About"
        title="About"
        note="Placeholder — short bio, background, and how I work."
      />
      <Section
        id="photography"
        index="03 — Photography"
        title="Photography"
        note="Placeholder — a selection of personal photographic work."
      />
      <Section
        id="contact"
        index="04 — Contact"
        title="Get in touch"
        note="Placeholder — email, LinkedIn, résumé."
      />
    </main>
  )
}
