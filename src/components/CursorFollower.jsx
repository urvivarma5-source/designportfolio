import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A lagging dot that follows the pointer, and swells into a filled "VIEW"
 * badge over anything marked `data-cursor="view"`.
 *
 * Pointer-only: hidden entirely for coarse pointers and reduced motion, where
 * the native cursor is left alone.
 */
export default function CursorFollower() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 })
    const toX = gsap.quickTo(dot, 'x', { duration: 0.42, ease: 'power3' })
    const toY = gsap.quickTo(dot, 'y', { duration: 0.42, ease: 'power3' })

    let shown = false
    const onMove = (e) => {
      if (!shown) {
        shown = true
        gsap.to(dot, { opacity: 1, duration: 0.25 })
        gsap.set(dot, { x: e.clientX, y: e.clientY })
      }
      toX(e.clientX)
      toY(e.clientY)

      // hit-test rather than per-card listeners, so cards added later just work
      const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-cursor="view"]')
      dot.classList.toggle('is-view', Boolean(over))
    }

    const onLeave = () => {
      shown = false
      gsap.to(dot, { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="cursor" ref={dotRef} aria-hidden="true">
      <span className="cursor__label">View</span>
    </div>
  )
}
