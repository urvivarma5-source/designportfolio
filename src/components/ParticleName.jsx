import { useEffect, useRef } from 'react'

/**
 * ParticleName
 * ------------
 * Renders `text` (Devanagari) as a field of ~8k jewel-tone particles sampled
 * from the glyph outlines, on a full-bleed <canvas>. A lagging pointer pushes
 * particles out of the way; a spring pulls each one home; every particle
 * twinkles. A brighter "glint" layer sits on top for sparkle.
 *
 * Mirrors the strangepixels.co reference, re-tuned for a white background.
 */

// jewel tones — magenta, ruby, gold, emerald, teal, sapphire, violet.
// Repeated entries = higher spawn weight (keeps gold from dominating on white).
const PALETTE = [
  '#d81b8c', '#d81b8c', // magenta
  '#b5123f', // ruby
  '#e0a200', // gold  (single weight)
  '#1f9d57', '#1f9d57', // emerald
  '#0f9aa6', '#0f9aa6', // teal
  '#1f5fd0', '#1f5fd0', // sapphire
  '#7b3fe4', '#7b3fe4', // violet
]
// brighter, hotter jewels for the sparkle layer (must pop on white)
const GLINTS = ['#ff2ea6', '#ff5cc8', '#7b3fe4', '#00c2b2', '#ffb800']
const INK = '#001d57' // ~14% of particles — ties the name to the headline

const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const rand = (a, b) => a + Math.random() * (b - a)

export default function ParticleName({ text, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let dpr = 1
    let particles = []
    let raf = 0
    let startedAt = 0

    const pointer = { x: -9999, y: -9999, active: false, lastMove: -9999 }
    const eased = { x: -9999, y: -9999 }

    // ---- build the particle set from sampled glyph pixels -----------------
    function build() {
      const rect = canvas.getBoundingClientRect()
      W = Math.max(1, Math.round(rect.width))
      H = Math.max(1, Math.round(rect.height))
      dpr = clamp(window.devicePixelRatio || 1, 1, 2)

      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = W < 720

      // offscreen mask
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      octx.fillStyle = '#000'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'

      let fontSize = clamp(W * (isMobile ? 0.22 : 0.19), 90, 360)
      const measure = () => {
        octx.font = `400 ${fontSize}px "Rozha One", "Tiro Devanagari Hindi", serif`
        return octx.measureText(text).width
      }
      const maxW = W * (isMobile ? 0.9 : 0.82)
      while (measure() > maxW && fontSize > 40) fontSize -= 4

      const cx = W / 2
      const cy = H * (isMobile ? 0.36 : 0.4)
      octx.fillText(text, cx, cy)
      const data = octx.getImageData(0, 0, W, H).data

      // count ink to pick a sampling step that lands near the target count
      let ink = 0
      for (let i = 3; i < data.length; i += 16) if (data[i] > 110) ink += 4
      const targetCount = isMobile ? 4400 : 9200
      const step = clamp(Math.round(Math.sqrt(Math.max(ink, 1) / targetCount)), 2, 7)

      const pts = []
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 110) {
            pts.push([x + rand(-1, 1) * step * 0.45, y + rand(-1, 1) * step * 0.45])
          }
        }
      }

      particles = pts.map(([hx, hy]) => {
        const isGlint = Math.random() < 0.05
        const isInk = !isGlint && Math.random() < 0.14
        const ang = Math.random() * Math.PI * 2
        const dist = rand(30, 150)
        return {
          hx,
          hy,
          x: hx + Math.cos(ang) * dist,
          y: hy + Math.sin(ang) * dist,
          vx: 0,
          vy: 0,
          col: isGlint
            ? GLINTS[(Math.random() * GLINTS.length) | 0]
            : isInk
              ? INK
              : PALETTE[(Math.random() * PALETTE.length) | 0],
          glint: isGlint,
          size: isGlint ? rand(1.5, 2.7) : rand(0.9, 2.0),
          spring: rand(0.12, 0.2),
          twPhase: Math.random() * Math.PI * 2,
          twSpeed: rand(1.4, 3.4) * (isGlint ? 1.8 : 1),
        }
      })
      // glints last so they render on top
      particles.sort((a, b) => (a.glint === b.glint ? 0 : a.glint ? 1 : -1))

      // pre-warm: settle most of the way home before the first paint so the
      // name is legible on frame 1 even if the display is running at a low
      // frame rate. Motion/twinkle then only adds life on top.
      for (let s = 0; s < 60; s++) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.vx += (p.hx - p.x) * p.spring
          p.vy += (p.hy - p.y) * p.spring
          p.vx *= 0.8
          p.vy *= 0.8
          p.x += p.vx
          p.y += p.vy
        }
      }
    }

    // ---- frame ---------------------------------------------------------
    function frame(now) {
      if (!startedAt) startedAt = now
      const t = now * 0.001

      ctx.clearRect(0, 0, W, H)

      if (pointer.active) {
        eased.x += (pointer.x - eased.x) * 0.16
        eased.y += (pointer.y - eased.y) * 0.16
      }
      const idle = now - pointer.lastMove > 2600
      const R = 130
      const R2 = R * R

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (pointer.active && !idle) {
          const dx = p.x - eased.x
          const dy = p.y - eased.y
          const d2 = dx * dx + dy * dy
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1
            const f = 1 - d / R
            const push = f * f * 6
            p.vx += (dx / d) * push
            p.vy += (dy / d) * push
          }
        } else if (idle) {
          p.vx += Math.sin(t * 1.3 + p.hy * 0.05) * 0.012
          p.vy += Math.cos(t * 1.1 + p.hx * 0.05) * 0.012
        }

        p.vx += (p.hx - p.x) * p.spring
        p.vy += (p.hy - p.y) * p.spring
        p.vx *= 0.8
        p.vy *= 0.8
        p.x += p.vx
        p.y += p.vy

        const tw = 0.5 + 0.5 * Math.sin(t * p.twSpeed + p.twPhase)

        if (p.glint) {
          const s = p.size * (0.7 + 0.6 * tw)
          ctx.fillStyle = p.col
          ctx.globalAlpha = 0.1 + 0.16 * tw
          ctx.beginPath()
          ctx.arc(p.x, p.y, s * 2.4, 0, 6.2832)
          ctx.fill()
          ctx.globalAlpha = 0.55 + 0.45 * tw
          ctx.beginPath()
          ctx.arc(p.x, p.y, s, 0, 6.2832)
          ctx.fill()
        } else {
          const s = p.size
          ctx.globalAlpha = 0.6 + 0.34 * tw
          ctx.fillStyle = p.col
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    function renderStatic() {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        ctx.globalAlpha = p.glint ? 0.85 : 0.82
        ctx.fillStyle = p.col
        if (p.glint) {
          ctx.beginPath()
          ctx.arc(p.hx, p.hy, p.size, 0, 6.2832)
          ctx.fill()
        } else {
          ctx.fillRect(p.hx - p.size / 2, p.hy - p.size / 2, p.size, p.size)
        }
      }
      ctx.globalAlpha = 1
    }

    // ---- events ------------------------------------------------------
    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.lastMove = performance.now()
      if (!pointer.active) {
        pointer.active = true
        eased.x = pointer.x
        eased.y = pointer.y
      }
    }
    const onLeave = () => {
      pointer.active = false
    }

    let resizeTimer = 0
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        renderStatic()
      }, 180)
    }

    // ---- boot (after the Devanagari font is ready) -----------------
    let cancelled = false
    const boot = () => {
      if (cancelled) return
      build()
      // Always paint one frame synchronously so the name is on screen even
      // before requestAnimationFrame delivers its first tick.
      renderStatic()
      if (!reduce) {
        raf = requestAnimationFrame(frame)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onMove, { passive: true })
      canvas.addEventListener('pointerleave', onLeave)
      window.addEventListener('resize', onResize)
    }

    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('400 120px "Rozha One"', text).then(() => document.fonts.ready),
        new Promise((r) => setTimeout(r, 2000)),
      ]).then(boot)
    } else {
      boot()
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [text])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
