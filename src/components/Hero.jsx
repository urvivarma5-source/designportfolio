import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import ParticleName from './ParticleName'
import { content } from '../content'

/** Offset of `el` from `ancestor`'s padding edge, walking the offsetParent
 *  chain. Transform-independent, unlike getBoundingClientRect. */
function offsetTopWithin(el, ancestor) {
  let y = 0
  let node = el
  while (node && node !== ancestor) {
    y += node.offsetTop
    node = node.offsetParent
  }
  return node === ancestor ? y : null
}

/**
 * Y of the cap-height line of an element's first line of text, relative to its
 * own box. Added to the offset chain it gives the exact optical top of the
 * text — the line the particle block should align to.
 */
function capTopOf(el) {
  const cs = getComputedStyle(el)
  const fontSize = parseFloat(cs.fontSize)
  const lineHeight = cs.lineHeight === 'normal' ? fontSize * 1.2 : parseFloat(cs.lineHeight)

  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`
  const m = ctx.measureText(el.textContent.trim() || 'T')
  if (!Number.isFinite(m.fontBoundingBoxAscent)) return null

  // The font box is centred in the line box; the baseline sits one ascent down.
  const halfLeading = (lineHeight - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2
  const baseline = halfLeading + m.fontBoundingBoxAscent
  return baseline - m.actualBoundingBoxAscent
}

export default function Hero() {
  const copyRef = useRef(null)
  const headlineRef = useRef(null)

  // The band the particle block may occupy: from the headline's cap height
  // down to the credential strip. The name is sized to spec, so this floor is
  // only a safety stop on short viewports. The canvas is inset:0 within .hero,
  // so both share the hero's padding edge as their origin.
  const align = useCallback(() => {
    const h1 = headlineRef.current
    const copy = copyRef.current
    const hero = h1?.closest('.hero')
    if (!h1 || !copy || !hero) return null

    // Pin to the TOP of the copy column (the eyebrow), not the headline, so
    // every element sits inside the same band.
    const eyebrow = copy.querySelector('.eyebrow')
    const anchor = eyebrow || h1.querySelector('.line') || h1
    const chain = offsetTopWithin(anchor, hero)
    const cap = capTopOf(anchor)
    if (chain == null || cap == null) return null

    // The name fills the same band as the copy column, so the two columns
    // start and end on the same lines.
    const last = copy.lastElementChild
    const copyTop = offsetTopWithin(copy, hero)
    const floor =
      copyTop == null || !last ? hero.clientHeight : copyTop + last.offsetTop + last.offsetHeight

    // Left bound: the name may use everything to the right of the copy
    // column plus a gutter. Giving it the real remaining width (rather than a
    // fixed fraction) lets it reach the 210px cap height on wide screens.
    const heroBox = hero.getBoundingClientRect()
    const copyBox = copy.getBoundingClientRect()
    const left = copyBox.right - heroBox.left + 72

    return { top: chain + cap, bottom: floor, left }
  }, [])

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

      {/* Full-bleed backdrop; on wide screens it occupies the right-hand
          field so the copy column below stays on clean white. */}
      <div className="namefield">
        <ParticleName lines={content.nameLines} align={align} />
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

        <h1 data-animate="headline" ref={headlineRef}>
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

        <ul className="pills" data-animate="pills">
          {content.credentials.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <ul className="strip" data-animate="strip">
        <li className="cta">
          {content.ctas.map((cta) => (
            <Link key={cta.label} to={cta.href}>
              {cta.label} <span className="arw">&rarr;</span>
            </Link>
          ))}
        </li>
      </ul>
    </section>
  )
}
