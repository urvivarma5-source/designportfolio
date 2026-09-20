#!/usr/bin/env node
// Crop and downscale a design PNG to a web-ready WebP.
//
//   node tools/crop_png_shots.mjs <out-dir> <spec.json>
//
// The spec is {"asset-name": {"src": "...", "crop": [x, y, w, h], "w": 1440}}
// in the PNG's own pixels; `crop` and `w` are both optional.
//
// Used where the design exists as a rendered PNG rather than a live-text SVG
// sheet, the browse, filter, comparison and intake screens. Sheets that are
// live text go through tools/render_svg_sheets.mjs instead, which keeps their
// webfonts.
//
// The crop runs through Chrome rather than sips because sips crops from the
// centre, and every box here is given from the top-left. Chrome also gets the
// downscale filtering right on screens this large.
import { readFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const QUALITY = Number(process.env.QUALITY || 80)

const [outDir, specFile] = process.argv.slice(2)
const spec = JSON.parse(readFileSync(specFile, 'utf8'))
mkdirSync(outDir, { recursive: true })
const work = join(tmpdir(), 'png-shots-' + process.pid)
mkdirSync(work, { recursive: true })

// Native pixel size, so a spec may leave `crop` out.
const size = (p) => {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', p], {
    encoding: 'utf8',
  })
  return [/pixelWidth: (\d+)/.exec(out)[1], /pixelHeight: (\d+)/.exec(out)[1]].map(Number)
}

for (const [name, e] of Object.entries(spec)) {
  const src = resolve(e.src)
  const [nw, nh] = size(src)
  const [x, y, cw, ch] = e.crop || [0, 0, nw, nh]
  const outW = e.w || 1440
  const scale = outW / cw

  const page = join(work, name + '.html')
  const png = join(work, name + '.png')
  writeFileSync(page, `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;background:#fff}
#v{width:${cw}px;height:${ch}px;overflow:hidden;position:relative}
#v img{position:absolute;left:${-x}px;top:${-y}px;width:${nw}px;height:${nh}px;
image-rendering:auto}</style>
<div id="v"><img src="file://${encodeURI(src)}"></div>`)

  execFileSync(CHROME, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--no-sandbox',
    `--force-device-scale-factor=${scale}`,
    `--window-size=${Math.ceil(cw)},${Math.ceil(ch)}`,
    '--virtual-time-budget=8000',
    `--screenshot=${png}`,
    'file://' + page,
  ], { stdio: ['ignore', 'ignore', 'pipe'] })

  const out = join(outDir, name + '.webp')
  execFileSync('cwebp', ['-q', String(QUALITY), '-mt', png, '-o', out],
    { stdio: ['ignore', 'ignore', 'pipe'] })
  console.log(`${name}.webp  ${Math.round(cw * scale)}x${Math.round(ch * scale)}  ` +
    `${(readFileSync(out).length / 1024).toFixed(0)}KB`)
}

rmSync(work, { recursive: true, force: true })
