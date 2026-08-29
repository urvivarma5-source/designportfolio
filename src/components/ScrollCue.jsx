import { useEffect, useRef } from 'react'
import { pickColour } from '../lib/palette'

/**
 * Two chevrons rendered in the same sparkle material as the name, as a quiet
 * scroll prompt. Same palette and twinkle; no pointer interaction, and a slow
 * vertical drift that runs down the pair so it reads as "keep going" without
 * waving at you.
 */
const W = 46
const H = 52

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
    for (const top of [10, 27]) {
      o.beginPath()
      o.moveTo(12, top)
      o.lineTo(W / 2, top + 11)
      o.lineTo(W - 12, top)
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

  return (
    <div className="scroll-cue" aria-hidden="true">
      <canvas ref={canvasRef} width={W} height={H} style={{ width: W, height: H }} />
    </div>
  )
}
