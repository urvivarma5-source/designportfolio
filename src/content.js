// ---------------------------------------------------------------------------
// ALL COPY LIVES HERE. Edit the words; the layout reflows on its own.
// Constraints: headline is exactly 3 lines, sub is exactly 2.
// ---------------------------------------------------------------------------

export const content = {
  // The name rendered as the multi-colour sparkle field, one entry per line.
  nameLines: ['URVI', 'VARMA'],
  nameRoman: 'Urvi Varma',
  logo: 'UV',

  // Work is the only one that is a section of the landing page; the rest are
  // their own routes. See DESIGN.md §7.1.
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/about' },
    { label: 'Photography', href: '/photography' },
    { label: 'Contact', href: '/contact' },
  ],

  // Small tracked label above the headline. Parts joined by a dimmed middot.
  eyebrow: ['Product Design', 'Research', 'Strategy'],

  // Exactly three lines. Display serif, deep blue. `it` = italic line.
  // WIDTH BUDGET: each line must fit the copy column unbroken. At the largest
  // step that is 660px at 68px type — roughly 20 characters. A longer line
  // silently wraps and the three-line composition breaks. Measure before
  // committing new wording; see DESIGN.md §9.8.
  headline: [
    { text: 'Turning complex' },
    { text: 'challenges into' },
    { text: 'intuitive experiences.', it: true },
  ],

  // Sub-headline. One sentence; it wraps naturally within the copy column.
  sub: [
    'I translate hard data and human behavior into interfaces that actually make sense to use.',
  ],

  // Real copy is in, so the placeholder note is hidden.
  phNote: null,

  // Dotted pills inside the copy column, under the sub copy.
  credentials: [
    'Currently at University of Utah Health',
    'Previously at Intuit',
    'MS HCI, University of Maryland',
  ],

}
