import { useEffect, useRef } from 'react'
import { GAP_RATIO, nameRatios } from '../lib/nameMetrics'

/**
 * ParticleName
 * ------------
 * Renders `lines` (Mukta 800) as a field of jewel-tone particles sampled from
 * the glyph outlines onto a <canvas> that fills its parent. Multiple lines are
 * stacked and right-aligned on wide screens, centred when narrow.
 *
 * Each particle springs toward its home pixel with a soft stiffness, so the
 * field settles slowly and stays alive. The pointer repels anything within
 * ~108px. Drawing is batched into one path per colour — roughly 11 fill()
 * calls a frame instead of 12k — plus a sparse layer of brighter "glints"
 * that pop above a twinkle threshold.
 *
 * On wide viewports the name is pushed to the right so the copy column on the
 * left stays on clean white — legibility comes from the layout, not from
 * dimming the sparkles.
 *
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

// Crisp glyph-shaped backing behind the particles. Not a blur — the edges
// stay sharp, which is what separates this from the soft shadow we removed.
const BACKING = 'rgba(0, 76, 228, 0.03)' // #004CE4 @ 3%

export default function ParticleName({ lines, id = 'sparkles', align }) {
  const canvasRef = useRef(null)
  const key = lines.join('\n')
  const alignRef = useRef(align)
  alignRef.current = align

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let DPR = 1
    let particles = []
    let byColor = new Map()
    let backing = null // pre-rendered crisp glyph fill behind the particles
    let raf = 0
    let cancelled = false
    const mouse = { x: -9999, y: -9999, active: false }
    const t0 = performance.now()

    const fontAt = (px) => '800 ' + px + 'px Mukta, system-ui, sans-serif'

    // ---- sample the glyphs into home coordinates -------------------------
    function sampleText() {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d', { willReadFrequently: true })
      off.width = Math.max(320, Math.floor(W))
      off.height = Math.max(200, Math.floor(H))

      const narrow = off.width < 900

      octx.fillStyle = '#000'
      octx.textAlign = narrow ? 'center' : 'right'
      octx.textBaseline = 'alphabetic'

      const widest = (px) => {
        octx.font = fontAt(px)
        return Math.max(...lines.map((l) => octx.measureText(l).width))
      }

      // Wide: the ink top is pinned to the headline's cap height so the two
      // columns start on the same optical line.
      // Narrow: the copy stacks underneath, so it just needs a tight ceiling.
      const pin = narrow ? null : alignRef.current?.()
      const usePin = pin && Number.isFinite(pin.top) && Number.isFinite(pin.bottom)
      const topInset = usePin ? pin.top : narrow ? 76 : Math.max(off.height * 0.16, 78)
      const bottomLimit = usePin ? pin.bottom : off.height * (narrow ? 0.34 : 0.97)

      // Wide: everything to the right of the copy column is the name's to use.
      // Narrow: it centres and the copy simply stacks below it.
      const rightEdge = off.width * 0.96
      const targetW = narrow
        ? off.width * 0.92
        : Math.max(160, rightEdge - (usePin && Number.isFinite(pin.left) ? pin.left : off.width * 0.52))

      // Fill the band rather than targeting a fixed cap height: the name and
      // the copy column share the same top and bottom lines, so the type grows
      // or shrinks to meet them. Ratios are measured once at 100px, so the
      // solve is direct — no iteration.
      const { heightR } = nameRatios(lines)
      const bandH = Math.max(40, bottomLimit - topInset)
      let size = Math.max(24, Math.floor(bandH / heightR))

      // ...but never wider than the space beside the copy column.
      const w = widest(size)
      if (w > targetW) size = Math.max(24, Math.floor((size * targetW) / w))

      octx.font = fontAt(size)
      const ms = lines.map((l) => octx.measureText(l))
      const asc = Math.max(...ms.map((m) => m.actualBoundingBoxAscent))
      const lh = asc * (1 + GAP_RATIO)

      const x = narrow ? off.width / 2 : off.width * 0.96
      lines.forEach((line, i) => {
        octx.fillText(line, x, topInset + asc + i * lh)
      })

      renderBacking(size, x, topInset + asc, lh, narrow)

      const data = octx.getImageData(0, 0, off.width, off.height).data
      const step = narrow ? 5 : off.width > 1700 ? 5 : 4

      const pts = []
      for (let y = 0; y < off.height; y += step) {
        for (let x2 = 0; x2 < off.width; x2 += step) {
          if (data[(y * off.width + x2) * 4 + 3] > 140) pts.push(x2, y)
        }
      }
      return pts
    }

    // One crisp pass of the glyphs at 5% alpha, rendered per resize and
    // blitted behind the particles — one drawImage a frame, no filter.
    function renderBacking(size, x, firstBaseline, lh, narrow) {
      const bc = document.createElement('canvas')
      bc.width = Math.floor(W * DPR)
      bc.height = Math.floor(H * DPR)
      const bctx = bc.getContext('2d')
      bctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      bctx.fillStyle = BACKING
      bctx.textAlign = narrow ? 'center' : 'right'
      bctx.textBaseline = 'alphabetic'
      bctx.font = fontAt(size)
      lines.forEach((line, i) => bctx.fillText(line, x, firstBaseline + i * lh))
      backing = bc
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

      if (backing) ctx.drawImage(backing, 0, 0, W, H)

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
        document.fonts.load('800 100px Mukta', key).then(() => document.fonts.ready),
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
  }, [key])

  return <canvas ref={canvasRef} id={id} aria-hidden="true" />
}
