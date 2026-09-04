import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CursorFollower from './components/CursorFollower'
import Home from './pages/Home'
import About from './pages/About'
import Stub from './pages/Stub'
import Project from './pages/Project'

// Scroll to the hash target on navigation, otherwise to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <CursorFollower />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/photography"
            element={<Stub title="Photography" note="Film work, coming soon." />}
          />
          <Route
            path="/contact"
            element={<Stub title="Get in touch" note="Contact details, coming soon." />}
          />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="*" element={<Project />} />
        </Routes>
      </main>
    </>
  )
}
