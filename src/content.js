// ---------------------------------------------------------------------------
// ALL COPY LIVES HERE. Everything marked PLACEHOLDER is temporary filler —
// swap in real words and the layout will reflow on its own.
// ---------------------------------------------------------------------------

export const content = {
  // The name rendered as the multi-colour sparkle field (Devanagari).
  name: 'उर्वी वर्मा',
  nameRoman: 'Urvi Varma',
  markSuffix: 'उर्वी',

  nav: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Photography', href: '#photography' },
    { label: 'Contact', href: '#contact' },
  ],

  langs: [
    { label: 'EN', href: '#', active: true },
    { label: 'HI', href: '#', active: false },
  ],

  // Small tracked label above the headline. Parts joined by a dimmed middot.
  eyebrow: ['Product Design', 'Research', 'Systems'],

  // Exactly three lines. Big Instrument Serif, deep blue. `it` = italic line.
  headline: [
    { text: 'Three lines of big' }, // PLACEHOLDER
    { text: 'headline copy go' }, // PLACEHOLDER
    { text: 'right here.', it: true }, // PLACEHOLDER
  ],

  // Exactly two lines. Smaller supporting copy.
  sub: [
    'Two lines of smaller supporting copy sit underneath —', // PLACEHOLDER
    'enough room for a sentence and a half about the work.', // PLACEHOLDER
  ],

  // Set to null once the real copy is in.
  phNote: "Placeholder — paste your copy and I'll drop it in",

  // Bottom credential strip.
  strip: [
    'Product Designer',
    'Currently at —', // PLACEHOLDER
    'Research → Shipped',
    'College Park, MD',
  ],

  ctas: [
    { label: 'See selected work', href: '#work' },
    { label: 'Get in touch', href: '#contact' },
  ],
}
