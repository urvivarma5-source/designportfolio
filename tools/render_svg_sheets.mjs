#!/usr/bin/env node
// Rasterise a live-text design SVG to web-ready WebP.
//
//   node tools/render_svg_sheets.mjs <out-dir> <spec.json>
//
// The spec is {"asset-name": "path/to/sheet.svg"} or
// {"asset-name": {"src": "...", "crop": [x, y, w, h], "pins": [...]}} in the
// SVG's own user units, for pulling one panel off a multi-panel sheet. A
// relative `src` resolves against the repository root, so the spec does not
// depend on anything outside it.
//
// CROP WIDTH SETS LEGIBILITY, NOT `SCALE`. The raster is always fitted to the
// 1180px case-study column, so one SVG user unit lands on
//
//     1180 / crop-width   CSS pixels
//
// and a label drawn at 13 units in a 1440-unit sheet reads at 10.7px on the
// page, under the 12px floor §9.17 sets for everything else. `SCALE` only
// buys sharpness. Narrowing the crop is the only thing that buys size.
// See DESIGN.md §9.24.
//
// `pins` draws numbered callouts over the sheet, in sheet coordinates:
//
//     {"n": 1, "x": 436, "y": 858}                 a badge
//     {"n": 2, "x": 790, "y": 538, "to": [690, 538]}  a badge with a leader
//
// The badge is only the number. Its text is live HTML in the figure's key, so
// it holds the 12px floor and stays selectable; see `Fig` in smarterParts.jsx.
//
// Why Chrome and not a plain SVG import: these sheets are *live text* in Inter
// and Roboto. An <img src="x.svg"> renders in an isolated context that cannot
// reach the page's webfonts, so every label would silently fall back to
// Helvetica and the absolutely-positioned text would overrun its boxes. Here
// the SVG is inlined into a page that links Google Fonts, so it rasterises
// with the faces it was drawn in. See DESIGN.md §11e.
//
// Needs Google Chrome and cwebp (`brew install webp`).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
/* SCALE is high enough that MAXW, not SCALE, decides every output width: a
   narrow crop would otherwise rasterise below 2x and look soft on a retina
   screen next to its wider neighbours. `before` at 706pt and SCALE 3 came out
   2118px for a 1180px slot, which is 1.79x. */
const SCALE = Number(process.env.SCALE || 4)
const MAXW = Number(process.env.MAXW || 2600)
const QUALITY = Number(process.env.QUALITY || 82)
/* The case-study column, from `.sm` in global.css. Only used to report the
   effective size of a sheet's smallest type, so a bad crop is caught here
   rather than on the page. */
const COLUMN = Number(process.env.COLUMN || 1180)
const FLOOR = 12

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [outDir, specFile] = process.argv.slice(2)
const spec = JSON.parse(readFileSync(specFile, 'utf8'))
mkdirSync(outDir, { recursive: true })

/* The marker vocabulary of the sheets themselves: a solid orange disc with a
   bold white number, ringed in white so it reads over a tint or a border. */
const pinSvg = (pins = []) =>
  pins
    .map((p) => {
      const leader = p.to
        ? `<line x1="${p.x}" y1="${p.y}" x2="${p.to[0]}" y2="${p.to[1]}" ` +
          `stroke="#DC6B01" stroke-width="1.5" stroke-dasharray="4 3"/>`
        : ''
      return (
        leader +
        `<circle cx="${p.x}" cy="${p.y}" r="11" fill="#DC6B01" stroke="#FFFFFF" stroke-width="2"/>` +
        `<text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="12" font-weight="700" ` +
        `fill="#FFFFFF" font-family="Inter, system-ui, sans-serif">${p.n}</text>`
      )
    })
    .join('')

const work = join(tmpdir(), 'svg-sheets-' + process.pid)
mkdirSync(work, { recursive: true })

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700' +
  '&family=Roboto:wght@300;400;500;700&display=block'

for (const [name, entry] of Object.entries(spec)) {
  if (name.startsWith('_')) continue // a note in the spec, not a figure
  const { src, crop, pins } = typeof entry === 'string' ? { src: entry } : entry
  let svg = readFileSync(resolve(ROOT, src), 'utf8')
  // Some exports carry an <?xml ...?> declaration, so the root is found rather
  // than anchored at position 0, and everything before it is dropped.
  svg = svg.slice(svg.indexOf('<svg'))

  const openTag = /^<svg[^>]*>/.exec(svg)[0]
  const w0 = Number(/\swidth="(\d+(?:\.\d+)?)"/.exec(openTag)[1])
  const h0 = Number(/\sheight="(\d+(?:\.\d+)?)"/.exec(openTag)[1])
  // The default crop is the sheet's own viewBox, not [0, 0, w, h]: the BPMN
  // exports have a non-zero origin, and assuming zero would shift every
  // diagram up and left by its own inset.
  const vb = /\sviewBox="([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)"/.exec(openTag)
  const [cx, cy, cw, ch] =
    crop || (vb ? vb.slice(1).map(Number) : [0, 0, w0, h0])

  // Re-frame rather than clip: rewriting the root viewBox keeps every child's
  // own coordinates intact, which a wrapper <g transform> would not for the
  // filters and gradients these sheets use.
  const reframed =
    openTag.replace(/\s(?:width|height|viewBox)="[^"]*"/g, '') .replace(
      /^<svg/,
      `<svg width="${cw}" height="${ch}" viewBox="${cx} ${cy} ${cw} ${ch}"`
    )
  svg = reframed + svg.slice(openTag.length)
  // Pins go last so they paint over the sheet rather than under a card fill.
  if (pins) svg = svg.replace(/<\/svg>\s*$/, `<g id="Pins">${pinSvg(pins)}</g></svg>`)

  const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="${FONTS}">
<style>html,body{margin:0;padding:0;background:#fff}
svg{display:block;width:${cw}px;height:${ch}px}</style>
${svg}`

  const page = join(work, name + '.html')
  const png = join(work, name + '.png')
  writeFileSync(page, html)

  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    `--force-device-scale-factor=${SCALE}`,
    `--window-size=${Math.ceil(cw)},${Math.ceil(ch)}`,
    '--virtual-time-budget=8000',
    `--screenshot=${png}`,
    'file://' + page,
  ], { stdio: ['ignore', 'ignore', 'pipe'] })

  const out = join(outDir, name + '.webp')
  const args = ['-q', String(QUALITY), '-mt']
  if (cw * SCALE > MAXW) args.push('-resize', String(MAXW), '0')
  execFileSync('cwebp', [...args, png, '-o', out], { stdio: ['ignore', 'ignore', 'pipe'] })

  // What the type inside *this crop* will measure on the page. A sheet that
  // fails this is not fixable in CSS, because the size is baked into the
  // raster: re-crop it narrower. See DESIGN.md §9.24.
  const k = COLUMN / cw
  const eff = (v) => (v * k).toFixed(1)
  const sizes = []
  for (const m of svg.matchAll(/<text\b[^>]*>/g)) {
    const t = m[0]
    const fs = /\sfont-size="([\d.]+)"/.exec(t)
    const tx = /\sx="([-\d.]+)"/.exec(t)
    const ty = /\sy="([-\d.]+)"/.exec(t)
    if (!fs || !tx || !ty) continue
    const [x, y] = [Number(tx[1]), Number(ty[1])]
    if (x < cx || x > cx + cw || y < cy || y > cy + ch) continue
    sizes.push(Number(fs[1]))
  }
  // The modal size, which is the sheet's body text, and the smallest run.
  const tally = sizes.reduce((a, s) => ((a[s] = (a[s] || 0) + 1), a), {})
  const body = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0]
  const min = sizes.length ? Math.min(...sizes) : null

  const kb = (readFileSync(out).length / 1024).toFixed(0)
  const warn = min !== null && min * k < FLOOR ? `  ** under the ${FLOOR}px floor` : ''
  console.log(
    `${name}.webp  ${Math.round(cw)}x${Math.round(ch)}pt  ${kb}KB  x${k.toFixed(3)}  ` +
      (sizes.length ? `body ${body}->${eff(body)}px  min ${min}->${eff(min)}px${warn}` : 'no text'),
  )
}

rmSync(work, { recursive: true, force: true })
