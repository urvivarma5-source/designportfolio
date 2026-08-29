// The sparkle palette. Shared by every particle surface so they read as one
// material — the name and the scroll chevrons.
//
// Jewel tones on white: magenta, ruby, gold, amber, emerald, green,
// sapphire, indigo, violet, orchid.
export const PALETTE = [
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

/** ~14% of particles take this, tying the field to the headline. */
export const BLUE = '#001D57'

export const pickColour = () =>
  Math.random() < 0.14 ? BLUE : PALETTE[(Math.random() * PALETTE.length) | 0]
