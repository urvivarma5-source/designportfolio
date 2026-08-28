import { useEffect, useRef } from 'react'

/**
 * ParticleName
 * ------------
 * Renders `text` (Devanagari, Mukta 800) as a field of jewel-tone particles
 * sampled from the glyph outlines onto a full-bleed <canvas>.
 *
 * Each particle springs toward its home pixel with a soft stiffness, so the
 * field settles slowly and stays alive. The pointer repels anything within
 * ~108px. Drawing is batched into one path per colour — roughly 11 fill()
 * calls a frame instead of 12k — plus a sparse layer of brighter "glints"
 * that pop above a twinkle threshold.
 */

// Jewel tones on white: magenta, ruby, gold, amber, emerald, green,
// sapphire, indigo, violet, orchid.
const PALETTE = [
  '#B3197A',
  '#D6246B',
  '#E08A00',
  '#C25E00',
  '#0E7C6B',
  '#1E8A4D',
  '#0F6FA8',
  '#2A3FA8',
  '#5B2BA8',
  '#8A1FA0',
]
const BLUE = '#001D57' // ~14% of particles, anchoring the name to the headline

const REPEL_R = 108
const REPEL_R2 = REPEL_R * REPEL_R

export default function ParticleName({ text, id = 'sparkles' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let DPR = 1
    let particles = []
    let byColor = new Map()
    let raf = 0
    let cancelled = false
    const mouse = { x: -9999, y: -9999, active: false }
    const t0 = performance.now()

    // ---- sample the glyphs into a list of home coordinates ---------------
    function sampleText() {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d', { willReadFrequently: true })
      off.width = Math.max(320, Math.floor(W))
      off.height = Math.max(240, Math.floor(H))

      // fit the name to ~90% of the viewport width
      const targetW = off.width * (off.width < 760 ? 0.92 : 0.88)
      let size = 400
      octx.font = '800 ' + size + 'px Mukta, system-ui, sans-serif'
      const m = octx.measureText(text)
      size = Math.max(48, Math.floor(size * (targetW / m.width)))
      // cap so it never floods the viewport height
      size = Math.min(size, Math.floor(off.height * 0.46))
      octx.font = '800 ' + size + 'px Mukta, system-ui, sans-serif'

      octx.fillStyle = '#000'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      const cx = off.width / 2
      const cy = off.height * (off.width < 760 ? 0.4 : 0.435)
      octx.fillText(text, cx, cy)

      const data = octx.getImageData(0, 0, off.width, off.height).data
      const step = off.width < 760 ? 5 : off.width > 1700 ? 5 : 4

      const pts = []
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 140) pts.push(x, y)
        }
      }
      return pts
    }

    function build() {
      const pts = sampleText()
      particles = []
      const n = pts.length / 2
      for (let i = 0; i < n; i++) {
        const hx = pts[i * 2]
        const hy = pts[i * 2 + 1]
        // colour: mostly jewel tones, a minority anchored in the deep blue
        const color =
          Math.random() < 0.14 ? BLUE : PALETTE[(Math.random() * PALETTE.length) | 0]
        const ang = Math.random() * Math.PI * 2
        const rad = 60 + Math.random() * Math.max(W, H) * 0.5
        particles.push({
          hx,
          hy,
          x: reduced ? hx : hx + Math.cos(ang) * rad,
          y: reduced ? hy : hy + Math.sin(ang) * rad,
          vx: 0,
          vy: 0,
          c: color,
          base: 0.85 + Math.random() * 1.25,
          ph: Math.random() * Math.PI * 2,
          sp: 0.7 + Math.random() * 1.6,
          k: 0.01 + Math.random() * 0.02, // spring stiffness
          bright: Math.random() < 0.035,
        })
      }
      // group indices by colour so each frame is ~11 fill() calls, not 12k
      byColor = new Map()
      particles.forEach((p, i) => {
        if (!byColor.has(p.c)) byColor.set(p.c, [])
        byColor.get(p.c).push(i)
      })
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.floor(W * DPR)
      canvas.height = Math.floor(H * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      build()
    }

    // ---- draw ----------------------------------------------------------
    function draw(t) {
      ctx.clearRect(0, 0, W, H)

      ctx.globalAlpha = 1
      byColor.forEach((idxs, color) => {
        ctx.fillStyle = color
        ctx.beginPath()
        for (let j = 0; j < idxs.length; j++) {
          const p = particles[idxs[j]]
          const tw = 0.55 + 0.45 * Math.sin(t * p.sp + p.ph)
          const s = p.base * (0.5 + tw * 0.95)
          ctx.rect(p.x - s / 2, p.y - s / 2, s, s)
        }
        ctx.fill()
      })

      // a sparse layer of brighter "glints"
      ctx.globalCompositeOperation = 'source-over'
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!p.bright) continue
        const tw = Math.sin(t * p.sp * 1.4 + p.ph)
        if (tw < 0.72) continue
        const s = p.base * 2.6 * tw
        ctx.globalAlpha = ((tw - 0.72) / 0.28) * 0.9
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function frame(now) {
      if (cancelled) return
      const t = (now - t0) / 1000
      const mx = mouse.x
      const my = mouse.y
      const act = mouse.active

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // spring home
        p.vx += (p.hx - p.x) * p.k
        p.vy += (p.hy - p.y) * p.k

        if (act) {
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_R2 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = 1 - d / REPEL_R
            const push = f * f * 7.5
            p.vx += (dx / d) * push
            p.vy += (dy / d) * push
          }
        }

        p.vx *= 0.865
        p.vy *= 0.865
        p.x += p.vx
        p.y += p.vy
      }

      draw(t)
      raf = requestAnimationFrame(frame)
    }

    // ---- events -------------------------------------------------------
    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = true
    }
    const onOut = () => {
      mouse.active = false
    }

    let rt
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(() => {
        resize()
        draw((performance.now() - t0) / 1000)
      }, 180)
    }

    function start() {
      if (cancelled) return
      resize()
      // paint once synchronously so the name is present before the first rAF
      draw(0)
      if (!reduced) raf = requestAnimationFrame(frame)

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onMove, { passive: true })
      window.addEventListener('pointerleave', onOut)
      document.addEventListener('mouseleave', onOut)
      window.addEventListener('resize', onResize)
    }

    // wait for the Devanagari face so the sampled shapes are correct
    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('800 100px Mukta', text).then(() => document.fonts.ready),
        new Promise((res) => setTimeout(res, 2500)),
      ]).then(start)
    } else {
      setTimeout(start, 400)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(rt)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      window.removeEventListener('pointerleave', onOut)
      document.removeEventListener('mouseleave', onOut)
      window.removeEventListener('resize', onResize)
    }
  }, [text])

  return <canvas ref={canvasRef} id={id} aria-hidden="true" />
}
