import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Nav from './Nav'
import ParticleName from './ParticleName'
import { content } from '../content'

export default function Hero() {
  const copyRef = useRef(null)
  // measured boxes of each Devanagari word, so the Latin labels sit above them
  const [wordBoxes, setWordBoxes] = useState(null)

  const onLayout = useCallback((boxes) => setWordBoxes(boxes), [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !copyRef.current) return

    // Subtle parallax lift on the copy block as the hero scrolls away.
    const setY = gsap.quickTo(copyRef.current, 'y', { duration: 0.5, ease: 'power2' })
    const onScroll = () => setY(Math.min(window.scrollY, window.innerHeight) * 0.16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="top">
      <Nav />

      {/* The name gets its own band, so the sparkles can never collide with
          the copy below no matter how short the viewport is. */}
      <div className="namefield">
        <ParticleName text={content.name} onLayout={onLayout} />

        {wordBoxes && (
          <div className="namefield__labels" aria-hidden="true">
            {content.nameLatin.map((label, i) =>
              wordBoxes[i] ? (
                <span
                  key={label}
                  className="latin-label"
                  style={{ left: wordBoxes[i].left, top: wordBoxes[i].top }}
                >
                  {label}
                </span>
              ) : null,
            )}
          </div>
        )}
      </div>

      <div className="copy" ref={copyRef}>
        <p className="eyebrow" data-animate="eyebrow">
          {content.eyebrow.map((part, i) => (
            <span key={part}>
              {i > 0 && <em>·</em>}
              {part}
            </span>
          ))}
        </p>

        <h1 data-animate="headline">
          {content.headline.map((line, i) => (
            <span key={i} className={line.it ? 'line it' : 'line'}>
              {line.text}
            </span>
          ))}
        </h1>

        <p className="sub" data-animate="sub">
          {content.sub.map((line, i) => (
            <span key={i} className="line">
              {line}
            </span>
          ))}
        </p>

        {content.phNote && (
          <p className="ph-note" data-animate="note">
            {content.phNote}
          </p>
        )}
      </div>

      <ul className="strip" data-animate="strip">
        {content.strip.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <li className="cta">
          {content.ctas.map((cta) => (
            <a key={cta.label} href={cta.href}>
              {cta.label} <span className="arw">&rarr;</span>
            </a>
          ))}
        </li>
      </ul>
    </section>
  )
}
