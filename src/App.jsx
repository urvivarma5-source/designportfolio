import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Section from './components/Section'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Section
          id="work"
          index="01 — Work"
          title="Selected work"
          note="Placeholder — case studies land here. Migrating from the old Adobe Portfolio."
        />
        <Section
          id="about"
          index="02 — About"
          title="About"
          note="Placeholder — short bio, background, and how I work."
        />
        <Section
          id="contact"
          index="03 — Contact"
          title="Get in touch"
          note="Placeholder — email, LinkedIn, résumé."
        />
      </main>
    </>
  )
}
