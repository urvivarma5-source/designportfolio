import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ParticleName from './ParticleName'
import { content } from '../content'

export default function Hero() {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cleanups = []

    // --- lagging cursor dot (the follower from the reference) --------------
    const dot = dotRef.current
    if (dot && finePointer && !reduce) {
      gsap.set(dot, { opacity: 0, xPercent: -50, yPercent: -50 })
      const quickX = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3' })
      const quickY = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3' })
      const onMove = (e) => {
        gsap.to(dot, { opacity: 1, duration: 0.3, overwrite: 'auto' })
        quickX(e.clientX)
        quickY(e.clientY)
      }
      const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.3 })
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerleave', onLeave)
      })
    }

    // --- subtle scroll parallax on the hero copy -------------------------
    if (!reduce && contentRef.current) {
      const setY = gsap.quickTo(contentRef.current, 'y', { duration: 0.4, ease: 'power2' })
      const onScroll = () => setY(Math.min(window.scrollY, window.innerHeight) * 0.18)
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <header className="hero" id="top" ref={rootRef}>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <ParticleName text={content.name} className="hero__canvas" />

      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow" data-animate="eyebrow">
          {content.eyebrow}
        </p>

        <h1 className="hero__headline" data-animate="headline">
          {content.headline.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>

        <p className="hero__sub" data-animate="sub">
          {content.sub.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </p>

        <div className="hero__ctas" data-animate="ctas">
          {content.ctas.map((cta) => (
            <a key={cta.href} href={cta.href} className="hero__cta">
              {cta.label} <span>&rarr;</span>
            </a>
          ))}
        </div>
      </div>

      <div className="hero__strip" data-animate="strip">
        {content.strip.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </header>
  )
}
