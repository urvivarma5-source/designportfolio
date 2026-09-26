// Minimal PNG reader: 8-bit, non-interlaced, colour type 2 (RGB) or 6 (RGBA).
// Enough to measure ink rows in the TCTD reference renders.
import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

export function decode(path) {
  const buf = readFileSync(path)
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png')
  let off = 8, w = 0, h = 0, depth = 0, type = 0
  let plte = null, trns = null
  const idat = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const tag = buf.toString('ascii', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (tag === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4)
      depth = data[8]; type = data[9]
      if (depth !== 8 || ![0, 2, 3, 4, 6].includes(type)) throw new Error(`unsupported depth ${depth} type ${type}`)
      if (data[12] !== 0) throw new Error('interlaced')
    } else if (tag === 'PLTE') plte = Buffer.from(data)
    else if (tag === 'tRNS') trns = Buffer.from(data)
    else if (tag === 'IDAT') idat.push(data)
    else if (tag === 'IEND') break
    off += 12 + len
  }
  // Channels in the *stored* scanline, which is not the channel count we return.
  const srcCh = type === 6 ? 4 : type === 2 ? 3 : type === 4 ? 2 : 1
  const raw = inflateSync(Buffer.concat(idat))
  const ch = srcCh
  const stride = w * srcCh
  const out = Buffer.alloc(h * stride)
  let p = 0
  for (let y = 0; y < h; y++) {
    const filter = raw[p++]
    const line = raw.subarray(p, p + stride); p += stride
    const cur = out.subarray(y * stride, (y + 1) * stride)
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : null
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0
      const b = prev ? prev[x] : 0
      const c = prev && x >= ch ? prev[x - ch] : 0
      let v = line[x]
      if (filter === 1) v += a
      else if (filter === 2) v += b
      else if (filter === 3) v += (a + b) >> 1
      else if (filter === 4) {
        const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c)
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      }
      cur[x] = v & 0xff
    }
  }
  if (type !== 3) return { w, h, ch: srcCh, data: out }

  // Expand the palette to RGBA so every caller sees the same shape.
  const rgba = Buffer.alloc(w * h * 4)
  for (let i = 0, j = 0; i < w * h; i++, j += 4) {
    const idx = out[i]
    rgba[j] = plte[idx * 3]
    rgba[j + 1] = plte[idx * 3 + 1]
    rgba[j + 2] = plte[idx * 3 + 2]
    rgba[j + 3] = trns && idx < trns.length ? trns[idx] : 255
  }
  return { w, h, ch: 4, data: rgba }
}

/** Rows carrying ink, as [start, end] pairs, plus the blank gaps between. */
export function rowRuns(img, { tol = 12, minInk = 1, x0 = 0, x1 = img.w } = {}) {
  const { w, ch, data } = img
  const ink = new Uint8Array(img.h)
  for (let y = 0; y < img.h; y++) {
    let n = 0
    for (let x = x0; x < x1; x++) {
      const i = (y * w + x) * ch
      if (ch === 4 && data[i + 3] < 200) continue
      if (255 - data[i] > tol || 255 - data[i + 1] > tol || 255 - data[i + 2] > tol) { n++; if (n >= minInk) break }
    }
    ink[y] = n >= minInk ? 1 : 0
  }
  const runs = []
  let s = -1
  for (let y = 0; y < img.h; y++) {
    if (ink[y] && s < 0) s = y
    else if (!ink[y] && s >= 0) { runs.push([s, y - 1]); s = -1 }
  }
  if (s >= 0) runs.push([s, img.h - 1])
  return runs
}

/** Leftmost and rightmost inked column across the whole image. */
export function colExtent(img, { tol = 12 } = {}) {
  const { w, h, ch, data } = img
  let lo = w, hi = -1
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * ch
    if (ch === 4 && data[i + 3] < 200) continue
    if (255 - data[i] > tol || 255 - data[i + 1] > tol || 255 - data[i + 2] > tol) {
      if (x < lo) lo = x
      if (x > hi) hi = x
    }
  }
  return [lo, hi]
}
