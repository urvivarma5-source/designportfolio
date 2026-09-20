#!/usr/bin/env node
// Rasterise a live-text design SVG to web-ready WebP.
//
//   node tools/render_svg_sheets.mjs <out-dir> <spec.json>
//
// The spec is {"asset-name": "/abs/path/to/sheet.svg"} or
// {"asset-name": {"src": "...", "crop": [x, y, w, h]}} in the SVG's own user
// units, for pulling one panel off a multi-panel sheet.
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
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SCALE = Number(process.env.SCALE || 2)
const MAXW = Number(process.env.MAXW || 2200)
const QUALITY = Number(process.env.QUALITY || 82)

const [outDir, specFile] = process.argv.slice(2)
const spec = JSON.parse(readFileSync(specFile, 'utf8'))
mkdirSync(outDir, { recursive: true })

const work = join(tmpdir(), 'svg-sheets-' + process.pid)
mkdirSync(work, { recursive: true })

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700' +
  '&family=Roboto:wght@300;400;500;700&display=block'

for (const [name, entry] of Object.entries(spec)) {
  const { src, crop } = typeof entry === 'string' ? { src: entry } : entry
  let svg = readFileSync(src, 'utf8')
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

  const kb = (readFileSync(out).length / 1024).toFixed(0)
  console.log(`${name}.webp  ${Math.round(cw)}x${Math.round(ch)}pt  ${kb}KB`)
}

rmSync(work, { recursive: true, force: true })
