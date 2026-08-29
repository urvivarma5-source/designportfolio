import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import ParticleName from './ParticleName'
import { content } from '../content'
import { nameRatios } from '../lib/nameMetrics'

/** Gutter between the copy column's text and the name. */
const GUTTER = 40

/**
 * The x the name may start from: the right edge of the copy's widest *text*
 * (not its box, which is usually wider than the text fills) plus the gutter.
 * align() and the fit pass must use the same value or they size the name
 * differently and it stops reaching the bottom of the band.
 */
function nameLeftBound(copy, heroBox) {
  let textRight = 0
  for (const el of copy.querySelectorAll('.eyebrow, h1 .line, .sub .line, .pills')) {
    const r = document.createRange()
    r.selectNodeContents(el)
    textRight = Math.max(textRight, r.getBoundingClientRect().right - heroBox.left)
  }
  return textRight + GUTTER
}

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
  // The band is the copy column's own extent, so the two columns start and end
  // on the same lines. The canvas is inset:0 within .hero, so both share the
  // hero's padding edge as their origin.
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
    return { top: chain + cap, bottom: floor, left: nameLeftBound(copy, heroBox) }
  }, [])

  // ------------------------------------------------------------------
  // Make the two columns end on the same line.
  //
  // The name is right-aligned into whatever width is left beside the copy,
  // which caps how tall it can be. When the copy is taller than that cap the
  // name cannot reach the bottom — so the copy is scaled down to meet it.
  // Without this the columns are misaligned by however much the name falls
  // short (measured at 87px before this existed).
  // ------------------------------------------------------------------
  useLayoutEffect(() => {
    const copy = copyRef.current
    const hero = copy?.closest('.hero')
    if (!copy || !hero) return

    let cancelled = false
    // fit() dispatches a resize so the canvas re-reads geometry; this flag
    // stops our own resize listener from re-entering fit() forever.
    let selfDispatched = false

    const copyBand = () => {
      const first = copy.firstElementChild
      const last = copy.lastElementChild
      if (!first || !last) return 0
      const cap = capTopOf(first) ?? 0
      return last.offsetTop + last.offsetHeight - (first.offsetTop + cap)
    }

    const fit = () => {
      if (cancelled) return
      copy.style.setProperty('--copy-scale', '1')

      const heroBox = hero.getBoundingClientRect()
      const availW = heroBox.width * 0.985 - nameLeftBound(copy, heroBox)
      const { widthR, heightR } = nameRatios(content.nameLines)
      const maxNameH = (availW / widthR) * heightR

      const natural = copyBand()
      // Shrink only, and only gently. Crushing the headline to force a perfect
      // bottom match reads far worse than a small residual gap — the reference
      // tolerates ~12px. MIN_SCALE keeps the headline near full size.
      const MIN_SCALE = 0.88
      if (natural > 0 && maxNameH > 0 && maxNameH < natural) {
        let scale = 1
        for (let i = 0; i < 8; i++) {
          const h = copyBand()
          if (Math.abs(h - maxNameH) <= 2 || scale <= MIN_SCALE) break
          scale = Math.max(MIN_SCALE, Math.min(1, scale * (maxNameH / h)))
          copy.style.setProperty('--copy-scale', String(scale))
        }
      }

      // let the canvas re-read the settled geometry
      selfDispatched = true
      window.dispatchEvent(new Event('resize'))
      selfDispatched = false
    }

    const run = () => (document.fonts?.ready ? document.fonts.ready.then(fit) : fit())
    run()

    let t
    const onResize = () => {
      if (selfDispatched) return
      clearTimeout(t)
      t = setTimeout(fit, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
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
              {i > 0 && <em aria-hidden="true" />}
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

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__label">Scroll</span>
        <span className="scroll-cue__line" />
      </div>
    </section>
  )
}
