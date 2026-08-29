// Shared geometry for the particle name.
//
// Both Hero and ParticleName need these ratios: ParticleName to size the type,
// Hero to work out the tallest name the remaining width allows — and therefore
// how far the copy column must shrink so the two columns end on the same line.
// Keeping the maths in one place is what stops the two from disagreeing.

/** Gap between lines, as a ratio of cap height (the original 210/70 spec). */
export const GAP_RATIO = 70 / 210

export const NAME_FONT = (px) => `800 ${px}px Mukta, system-ui, sans-serif`

/**
 * Per-pixel-of-font-size ratios for a block of `lines`, measured once at 100px.
 * `heightR` spans cap-top to descender-bottom, i.e. the block's ink height.
 */
export function nameRatios(lines) {
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.font = NAME_FONT(100)
  ctx.textBaseline = 'alphabetic'

  const ms = lines.map((l) => ctx.measureText(l))
  const ascR = Math.max(...ms.map((m) => m.actualBoundingBoxAscent)) / 100
  const descR = Math.max(...ms.map((m) => m.actualBoundingBoxDescent)) / 100
  const widthR = Math.max(...ms.map((m) => m.width)) / 100
  const heightR = ascR + ascR * (1 + GAP_RATIO) * (lines.length - 1) + descR

  return { ascR, descR, widthR, heightR }
}
