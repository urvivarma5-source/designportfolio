// ---------------------------------------------------------------------------
// ALL COPY FOR "MAKING A SENSOR STATION NAVIGABLE" (SMARTER, part 1 of 3).
// Layout is in SmarterNavPage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// VOICE: the Guide case studies' (§11c), not a spec sheet's. First person,
// active, and it tells the reader where they are before it tells them what was
// decided. An earlier version read as a rigid list of assertions with no
// context, which is the note Urvi gave on 2026-09-25. Concretely:
//
//   - Say what SMARTER is and who uses it before naming its parts.
//   - "I" and "we", not the passive voice.
//   - Emphasis lives in the data as { em } runs, exactly as guide1.js does it,
//     and rich.jsx turns them into markup. Bold italic in running prose, bold
//     inside a card.
//   - A little warmth is allowed. The Guide's copy has jokes in it.
//
// SHAPE: a section is a label, a title, at most two short paragraphs, then the
// content breaks into whatever form it actually is. TCTD sets the visual
// language, not the structure.
//
// NOTHING IS INVENTED. No outcome figures, because none exist: this shipped as
// a spec and a prototype and has not been tested with users. `stats` counts
// the work, not its effect, and the work card carries no `metrics` key.
//
// `metas` is filled from Urvi's own account (2026-09-25): lead product
// designer, plus some of the PM work on the SMARTER product side, and a team
// of seven over four months. It is not guessable from the repo, so do not
// "correct" it against anything else.
// ---------------------------------------------------------------------------

export const smarterNav = {
  slug: 'smarter-station-navigator',

  hero: {
    title: 'Making a Sensor Station Navigable',
    sub: [
      'A page that quietly outgrew itself. It was designed for ',
      { em: 'one sensor' },
      ', and then the sensors started arriving five to a box.',
    ],
  },

  stats: [
    { icon: 'states', v: '3', k: 'Levels of hierarchy' },
    { icon: 'problem', v: '7', k: 'Problems in the first pass' },
    { icon: 'keyboard', v: '9', k: 'Interaction rules specified' },
    { icon: 'shipped', v: '2', k: 'Clickable prototypes' },
  ],

  metas: [
    { icon: 'role', title: 'My Role', v: ['Lead Product Designer,\n', { em: 'plus some of the PM work' }] },
    { icon: 'context', title: 'Team', v: 'Seven of us: two PIs, a PM,\nthree engineers, and me' },
    { icon: 'clock', title: 'Duration', v: '4 months' },
    { icon: 'gears', title: 'Methods', v: 'Heuristic review, component spec, prototyping' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'Built for one sensor, used for a whole station',
    lede: [
      'SMARTER is a catalogue of environmental sensors. A researcher planning a study comes here to decide what she will measure the air or the weather with, and this page is where she makes up her mind. Get it wrong and she finds out eighteen months later, in the data.',
      [
        'I inherited a page drawn around ',
        { em: 'one instrument' },
        ': a header, a row of tabs, a column of specifications. Then the first real deployment landed on my desk, and a real deployment is not one instrument. It is a station holding modules, and modules holding sensors, with the specifications belonging to a different level at every step.',
      ],
    ],
    flowLabel: 'So the page had to carry three levels at once',
    flow: ['EnviroStation Pro 5000', 'AQ-Module 300', 'PMS7003'],
    note: 'The station, modules and sensors named throughout are the ones the spec sheets use, so the screens and the words match.',
  },

  // -------------------------------------------------------------------------
  first: {
    label: '02. What Went Wrong First',
    title: 'It showed you the structure, but never what a click would do',
    lede: [
      [
        'My first pass was a card called Instrument Tree, styled to match the page it sat beside. I liked it for about a day. Then I walked a colleague through it, watched him hesitate over which rows he was allowed to click, and went back to the drawing board with seven notes. Reading them back, ',
        { em: 'they were all the same failure wearing different clothes' },
        '.',
      ],
    ],
    problems: [
      { t: 'Three fills, no meanings', d: 'Grey, pale grey, navy. Nothing anywhere said what any of them meant, so a selected row and a container looked like the same kind of thing.' },
      { t: 'Two things claiming to be “you are here”', d: 'The selected row copied the active tab pill sitting right above it. Both were telling you where you were, and they disagreed.' },
      { t: 'Indented pills that read as buttons', d: 'Rows were pills of different widths stacked up. Platform to module was twelve pixels of indent, which is not enough to read as a level.' },
      { t: 'One column doing three jobs', d: 'The right-hand column held a level, a category and a manufacturer, with nothing to tell you which one you were looking at.' },
      { t: 'No way to fold anything', d: 'Modules contained sensors, but there was no chevron and no way to collapse them. On a big station that is a very long list.' },
      { t: 'No idea what was clickable', d: 'Filled rows looked like buttons and sensor rows looked like plain text, so the things you most wanted to click looked the least clickable.' },
      { t: 'A name from the database', d: '“Instrument tree” describes the data structure. Nobody arrives at this page looking for a tree.' },
    ],
    img: 'tree-old',
    alt: 'The first Instrument Tree component sheet: the assembled card, its states, redlines, overflow behaviour and the tokens it used.',
  },

  // -------------------------------------------------------------------------
  rule: {
    label: '03. Design Strategy',
    title: 'Giving the two controls different jobs',
    lede: [
      [
        'All seven turned out to be ',
        { em: 'one problem' },
        ': the navigator and the tabs were both trying to tell you where you were, and neither of them was winning.',
      ],
      'So I gave them different jobs. The navigator picks the subject, which is the station, a module or a sensor. The tabs pick the aspect of it: specifications, deployment, data, network. Once that was settled, selection had to stop imitating the tab pill, which is how it ended up as a tint, a bar and a change of weight rather than a filled shape.',
    ],
    pullLabel: 'The floor I set for it',
    pull: '“Selection is a bar and a weight change as well as a tint, and levels are carried by icon shape. Both of those survive greyscale, so neither depends on anyone seeing colour.”',
    img: 'before-after',
    alt: 'Before and after, side by side: the old Instrument Tree card with its seven numbered problems, and the Station Navigator with the seven numbered answers.',
  },

  // -------------------------------------------------------------------------
  click: {
    label: '04. What a Click Does',
    title: 'The navigator and the panel say the same words',
    lede: [
      [
        'Splitting the jobs only works if you can see it working, so I made the two say the same words: whatever you click is named again at the top of what you get. Folding stays out of it entirely. It tidies the tree and ',
        { em: 'never moves your selection' },
        '.',
      ],
    ],
    steps: [
      { t: 'Pick the station', d: 'You get the specs shared by the whole station, and no path line, because this is the top of the tree.' },
      { t: 'Pick a module', d: 'It unfolds, and the panel header takes its name so you can see the swap happen.' },
      { t: 'Pick a sensor', d: 'The path grows a third level. Fold its parent afterwards and a dot marks where you left your selection.' },
    ],
    img: 'click-does',
    alt: 'Three states side by side, station selected then module selected then sensor selected with MetStation folded, each with the panel header it produces underneath.',
  },

  // -------------------------------------------------------------------------
  states: {
    label: '05. Row Anatomy',
    title: 'One row, six states, no exceptions',
    lede: [
      'The old card had rows of four different widths, which is how you end up guessing what is clickable. So I made them all identical: same height, same hover, same hit area, nothing shrinking on you as you go deeper.',
      'Hierarchy comes from where a row sits, not from how heavily it is filled in.',
    ],
    // A redline list, not a bar chart. These are specification values, not
    // magnitudes worth comparing against each other.
    specs: [
      { k: 'Row height', v: '48 px', note: 'Identical at all three levels' },
      { k: 'Indent step', v: '20 px', note: 'Text starts at +42' },
      { k: 'Selection bar', v: '3 × 28', note: 'Carries selection without colour' },
      { k: 'Icon', v: '16 px', note: 'Its shape is what tells you the level' },
      { k: 'Chevron slot', v: '16 px', note: 'Held even on rows that cannot fold' },
      { k: 'Corner radius', v: '6 px', note: 'Borrowed from the panel card' },
    ],
    note: 'Hover is #F3F4F6, which was already in the system rather than something new. Focus is a 2 px navy ring, so anyone driving this with arrow keys can see where they are.',
    img: 'row-states',
    alt: 'The six row states, default, hover, selected, keyboard focus, folded and contains selection, beside an anatomy diagram showing the 20 px indent steps.',
  },

  // -------------------------------------------------------------------------
  rules: {
    label: '06. The Interaction Contract',
    title: 'The interaction rules, written out in full',
    lede: [
      'A tree that behaves almost like every other tree is worse than one that behaves exactly like them, so this follows the WAI-ARIA tree view pattern and the keyboard map is the one people already have in their fingers.',
      'Writing it out in full was the point. Everything above is a picture of the component; this is the table I actually handed the developer.',
    ],
    table: [
      ['Click a row', 'Selects it. If it has children, it unfolds too.'],
      ['Click a chevron', 'Folds or unfolds, and nothing else. Your selection stays put.'],
      ['Fold a parent you are inside', ['The selection survives. The parent turns navy and grows a dot, so you can see ', { em: 'where you left it' }, '.']],
      ['Up and down', 'Move focus between the rows you can currently see.'],
      ['Right', 'Unfolds a parent, or steps into its first child.'],
      ['Left', 'Folds a parent, or steps back out to it.'],
      ['Enter or space', 'Selects whatever has focus.'],
      ['Reload, share the link, hit Back', 'All three keep your place, because the selection lives in the URL.'],
      ['Narrower than 1024 px', 'The navigator collapses into a “Showing” dropdown above the panel.'],
    ],
  },

  // -------------------------------------------------------------------------
  scope: {
    label: '07. Scope',
    title: 'Scoping the navigator to the tab that needs it',
    lede: [
      'Somewhere around the third round of screens it stopped being a drawing problem. Technical Specifications change from one sensor to the next, but Deployment, Data and Network describe the whole instrument and stay put whichever sensor you pick.',
      'So on three of the four tabs the navigator has nothing left to control, and the right move is to let it stand down.',
    ],
    moves: [
      {
        t: 'Scope it to the tab that needs it',
        sub: 'It collapses at Deployment',
        label: 'What it does',
        body: ['It shows up on Technical Specifications and folds away when you scroll into Deployment, which is the exact point where it stops being able to change anything. The cards narrow ', { em: 'only inside that tab' }, ', so nothing below shifts around.'],
      },
      {
        t: 'Skip to a section, never filter one out',
        sub: 'Everything stays on the page',
        label: 'What I tried first',
        body: 'A dropdown version came first and did not survive review: it hid the structure it was there to explain. The navigator moves you through the page; it does not get to decide what the page contains.',
      },
    ],
    question: {
      label: 'A question drawing could not settle',
      body: 'Deployment & Operation holds Calibration Guideline, Maintenance Method and Maintenance Frequency. On a real station a particle sensor and a gas sensor are serviced quite differently, so if any of those three do vary per sensor, they belong over in Technical Specifications where the navigator can reach them.',
      after: 'That changes the information architecture rather than the component, so it went to the people who run the stations rather than being settled in Figma. It was still open when I handed this over.',
    },
    img: 'scope-dropdown',
    alt: 'The specs scope dropdown: the collapsed navigator sitting above the technical specifications panel as a single “Showing” control.',
  },

  // -------------------------------------------------------------------------
  situ: {
    label: '08. In Place',
    title: 'How it holds up on the real page',
    lede: [
      'A component sheet is a friendly place. Everything on it is the length you made it. So before I handed anything over I dropped the navigator into the real page and went looking for the places it would break.',
      'It carries a station overview with sub-cards of its own, and specification values long enough to wrap, stack or truncate, usually all three at once.',
    ],
    shots: [
      { img: 'station-overview', alt: 'The station overview: shared specifications for the whole station, with a sub-card for each module underneath.', cap: 'Station overview, which is where you land, and the only state with no path line above it.' },
      { img: 'detail-in-situ', alt: 'The full sensor detail page with the Station Navigator in the left column and technical specifications beside it.', cap: 'The navigator in the page it was drawn to match.' },
      { img: 'long-content', alt: 'The same detail page with long specification values, showing value wrap, the stacked spec row and title truncation.', cap: 'The awkward cases: values wrap, spec rows stack, and long names truncate instead of reflowing the whole tree.' },
    ],
  },

  // -------------------------------------------------------------------------
  why: {
    label: '09. Why These Choices',
    title: 'The principle behind each decision',
    lede: [
      'None of this was invented on the day. Every call above answers to something well established, which is mostly what let me defend them in review without falling back on taste.',
    ],
    items: [
      { icon: 'eye', t: 'Visibility of status', note: 'Nielsen 1', d: 'The panel header repeats the exact name you clicked, right where you were already looking.' },
      { icon: 'question', t: 'Recognition over recall', note: 'Nielsen 6', d: '“OX-B431” means nothing on its own. “O₃ · NO₂” underneath it means everything.' },
      { icon: 'compare', t: 'Never colour alone', note: 'WCAG 1.4.1', d: 'Selection is a bar and a weight change as well as a tint, and levels are icon shapes.' },
      { icon: 'states', t: 'Big, even targets', note: 'Fitts’s law', d: 'Full-width rows give every node the same generous hit area, rather than pills that shrink with depth.' },
      { icon: 'keyboard', t: 'Selecting is not folding', note: 'WAI-ARIA', d: 'Folding is housekeeping, so it never gets to change what the panel is showing you.' },
      { icon: 'rule', t: 'If it needs a legend, fix the control', note: null, d: 'The old card shipped with a Tree Key to explain it. The new one does not need one, so there is not one.' },
    ],
  },

  // -------------------------------------------------------------------------
  open: {
    label: '10. Still Open',
    title: 'What I would want to know next',
    lede: [
      'This left my hands as a specification and two clickable prototypes. It has not met a real researcher yet, and none of the three things below is something I can settle on my own.',
    ],
    items: [
      'Whether calibration and maintenance really do vary per sensor, which decides how far the navigator should reach.',
      'What happens below 1024 px in practice. The dropdown fallback is written down but has not been drawn or built.',
      'Whether three levels holds up for instruments that are just one instrument with sensors inside, rather than a station of modules.',
    ],
  },
}
