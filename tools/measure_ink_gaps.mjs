// Measure a case study's vertical rhythm from PIXELS, not from the DOM.
//
// Why this exists: the published artwork for a case study is a stack of
// flattened PNG slices (Adobe Portfolio, no live text), so there is no
// stylesheet to read the intended spacing out of. The only way to compare the
// site against it is to measure both the same way: find the rows that carry
// ink, and report the blank runs between them.
//
// A DOM margin is NOT comparable to an artwork gap. A margin excludes the
// font's own ascender and descender slack; ink does not. Measuring both sides
// as ink is what makes the two numbers mean the same thing.
//
// Usage:
//   node tools/measure_ink_gaps.mjs <png> [--content-width=1180] [--measured=N]
//
// It prints, per section head found by the coral label colour:
//   label -> title, title -> lede, and the rhythm above the label,
// normalised so the image's content column equals --content-width.
//
// --measured overrides the source content column, which is otherwise the
// widest inked span in the image. PASS IT FOR A SITE CAPTURE: the site's
// full-bleed banner is wider than the 1180px case-study column, so the
// auto-detected span is the viewport and every gap comes out scaled down by
// 1180/1440. The artwork slices have no such element, so they auto-detect
// correctly and need no flag.
//
// Capture the site side with:
//   chrome --headless --window-size=1440,22000 --screenshot=out.png <url>
//   node tools/measure_ink_gaps.mjs out.png --measured=1180
//
// See DESIGN.md §9.22 and §10.
import { decode, rowRuns, colExtent } from './png_read.mjs'

const [file, ...flags] = process.argv.slice(2)
if (!file) {
  console.error('usage: node tools/measure_ink_gaps.mjs <png> [--content-width=1180]')
  process.exit(1)
}
const flag = (name, fallback) =>
  Number(flags.find((f) => f.startsWith(`--${name}=`))?.split('=')[1] ?? fallback)
const target = flag('content-width', 1180)

const img = decode(file)
const [lo, hi] = colExtent(img)
const measured = flag('measured', hi - lo + 1)
const scale = target / measured
const runs = rowRuns(img)

/** Mean colour of the inked pixels in a row band. */
const tint = (a, b) => {
  const { w, ch, data } = img
  let r = 0, g = 0, bl = 0, n = 0
  for (let y = a; y <= b; y++) for (let x = lo; x <= hi; x++) {
    const i = (y * w + x) * ch
    if (ch === 4 && data[i + 3] < 200) continue
    if (255 - data[i] > 40 || 255 - data[i + 1] > 40 || 255 - data[i + 2] > 40) {
      r += data[i]; g += data[i + 1]; bl += data[i + 2]; n++
    }
  }
  return n ? [r / n | 0, g / n | 0, bl / n | 0] : null
}

// The section label is the only coral run of its size on the page.
const isLabel = (c, h) => c && c[0] > 170 && c[0] - c[1] > 70 && c[0] - c[2] > 50 && h >= 12 && h <= 20

const px = (n) => Math.round(n * scale)
const rows = []
runs.forEach((r, i) => {
  const h = px(r[1] - r[0] + 1)
  if (!isLabel(tint(r[0], r[1]), h) || i + 2 >= runs.length) return
  rows.push({
    y: r[0],
    rhythm: i ? px(r[0] - runs[i - 1][1] - 1) : null,
    labelToTitle: px(runs[i + 1][0] - r[1] - 1),
    titleToLede: px(runs[i + 2][0] - runs[i + 1][1] - 1),
  })
})

console.log(`${file}  content ${measured}px -> ${target}px  (x${scale.toFixed(4)})`)
console.log('     y   rhythm  label>title  title>lede')
for (const r of rows) {
  console.log(
    String(r.y).padStart(6),
    String(r.rhythm ?? '-').padStart(8),
    String(r.labelToTitle).padStart(12),
    String(r.titleToLede).padStart(11),
  )
}
const med = (k) => {
  const v = rows.map((r) => r[k]).filter((n) => n != null).sort((a, b) => a - b)
  return v.length ? v[v.length >> 1] : null
}
console.log('median', String(med('rhythm')).padStart(8), String(med('labelToTitle')).padStart(12), String(med('titleToLede')).padStart(11))
