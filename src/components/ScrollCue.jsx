import { useEffect, useRef } from 'react'
import { pickColour } from '../lib/palette'

/**
 * Two chevrons rendered in the same sparkle material as the name, as a quiet
 * scroll prompt, and the button that acts on it: clicking scrolls to the work
 * section. Same palette and twinkle as the name, and a slow vertical drift
 * that runs down the pair so it reads as "keep going" without waving at you.
 *
 * The chevrons are wide and shallow — a 44 x 9 V, not the 22 x 11 one this
 * started as. At the steeper angle a pair of them reads as an arrowhead
 * pointing at something; flattened out they read as a hint to keep going,
 * which is what they are.
 */
const W = 64
const H = 44
const SPAN = 10 // x inset of each chevron's ends
const DEPTH = 9 // how far the middle drops below the ends

export default function ScrollCue() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // mask: two chevrons, stroked then sampled
    const off = document.createElement('canvas')
    off.width = W
    off.height = H
    const o = off.getContext('2d', { willReadFrequently: true })
    o.strokeStyle = '#000'
    o.lineWidth = 3.4
    o.lineCap = 'round'
    o.lineJoin = 'round'
    for (const top of [9, 24]) {
      o.beginPath()
      o.moveTo(SPAN, top)
      o.lineTo(W / 2, top + DEPTH)
      o.lineTo(W - SPAN, top)
      o.stroke()
    }

    const data = o.getImageData(0, 0, W, H).data
    const particles = []
    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        if (data[(y * W + x) * 4 + 3] > 120) {
          particles.push({
            x: x + (Math.random() - 0.5),
            y: y + (Math.random() - 0.5),
            // phase runs down the pair, so the shimmer travels downward
            ph: (y / H) * Math.PI * 2 + Math.random() * 0.7,
            sp: 1.5 + Math.random() * 0.9,
            size: 0.8 + Math.random() * 1.1,
            c: pickColour(),
          })
        }
      }
    }

    let raf = 0
    const t0 = performance.now()

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        const tw = 0.5 + 0.5 * Math.sin(t * p.sp - p.ph)
        const drift = reduced ? 0 : Math.sin(t * 0.9 - p.ph) * 0.8
        ctx.globalAlpha = 0.35 + 0.6 * tw
        ctx.fillStyle = p.c
        const s = p.size
        ctx.fillRect(p.x - s / 2, p.y + drift - s / 2, s, s)
      }
      ctx.globalAlpha = 1
    }

    draw(0)
    if (!reduced) {
      const frame = (now) => {
        draw((now - t0) / 1000)
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    return () => cancelAnimationFrame(raf)
  }, [])

  // The cue is the only affordance at the foot of the hero, so it is a real
  // button rather than decoration: keyboard reachable, labelled, and honouring
  // reduced motion in how it scrolls as well as how it animates.
  const toWork = () => {
    const el = document.getElementById('work')
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button className="scroll-cue" type="button" onClick={toWork} aria-label="Scroll to selected work">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: W, height: H }}
        aria-hidden="true"
      />
    </button>
  )
}
