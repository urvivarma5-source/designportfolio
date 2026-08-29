import { useEffect, useRef } from 'react'

/**
 * ParticleName
 * ------------
 * Renders `text` (Devanagari, Mukta 800) as a field of jewel-tone particles
 * sampled from the glyph outlines onto a <canvas> that fills its parent.
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
 * `onLayout` receives the measured box of each whitespace-separated word in
 * CSS pixels, so the Latin labels can be pinned above them. `bar` is the
 * shirorekha (the horizontal headstroke) — the labels hang off that, not off
 * the tallest matra:
 *   [{ left, width, top, bar }, ...]
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

export default function ParticleName({ text, id = 'sparkles', onLayout }) {
  const canvasRef = useRef(null)
  const layoutRef = useRef(onLayout)
  layoutRef.current = onLayout

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

    const fontAt = (px) => '800 ' + px + 'px Mukta, system-ui, sans-serif'

    // ---- sample the glyphs into home coordinates + per-word boxes ---------
    function sampleText() {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d', { willReadFrequently: true })
      off.width = Math.max(320, Math.floor(W))
      off.height = Math.max(200, Math.floor(H))

      const narrow = off.width < 900

      octx.fillStyle = '#000'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'

      // Wide: the name takes the right-hand field, clear of the copy column.
      // Narrow: it centres and the copy simply sits below it.
      const targetW = off.width * (narrow ? 0.92 : 0.58)
      let size = 400
      octx.font = fontAt(size)
      size = Math.max(40, Math.floor(size * (targetW / octx.measureText(text).width)))
      size = Math.min(size, Math.floor(off.height * (narrow ? 0.4 : 0.62)))

      // Anchor off the real ink box rather than a guessed fraction: reserve a
      // strip at the top for the nav and the Latin labels, and keep the
      // descenders clear of the copy below. Shrink until both hold.
      const topInset = Math.max(off.height * 0.19, 92)
      const bottomLimit = off.height * (narrow ? 0.72 : 0.8)
      let cy = topInset
      for (let attempt = 0; attempt < 12; attempt++) {
        octx.font = fontAt(size)
        const m = octx.measureText(text)
        cy = topInset + m.actualBoundingBoxAscent
        if (cy + m.actualBoundingBoxDescent <= bottomLimit || size <= 40) break
        size = Math.floor(size * 0.92)
      }

      octx.font = fontAt(size)
      // right-align the block to a 96% gutter on wide screens
      const cx = narrow
        ? off.width / 2
        : off.width * 0.96 - octx.measureText(text).width / 2
      octx.fillText(text, cx, cy)

      // measure where each word starts, so labels can be pinned above them
      const full = octx.measureText(text).width
      const spaceW = octx.measureText(' ').width
      const words = text.split(' ')
      let run = cx - full / 2
      const boxes = words.map((w) => {
        const width = octx.measureText(w).width
        const box = { left: run, width, top: Infinity, bar: 0, rows: new Map() }
        run += width + spaceW
        return box
      })

      const data = octx.getImageData(0, 0, off.width, off.height).data
      const step = narrow ? 5 : off.width > 1700 ? 5 : 4

      const pts = []
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 140) {
            pts.push(x, y)
            // per word: highest ink, and an ink-per-row tally so the
            // shirorekha (the densest row) can be found
            for (let b = 0; b < boxes.length; b++) {
              const bx = boxes[b]
              if (x >= bx.left && x <= bx.left + bx.width) {
                if (y < bx.top) bx.top = y
                bx.rows.set(y, (bx.rows.get(y) || 0) + 1)
              }
            }
          }
        }
      }

      // the headstroke is the row carrying the most ink
      boxes.forEach((b) => {
        let best = 0
        b.rows.forEach((count, y) => {
          if (count > best) {
            best = count
            b.bar = y
          }
        })
        delete b.rows
      })

      const valid = boxes.every((b) => Number.isFinite(b.top) && b.bar > 0)
      layoutRef.current?.(valid ? boxes : null)

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
