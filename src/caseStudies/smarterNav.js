// ---------------------------------------------------------------------------
// ALL COPY FOR "MAKING A SENSOR STATION NAVIGABLE" (SMARTER, part 1 of 3).
// Layout is in SmarterNavPage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// THE SHAPE OF THIS FILE IS THE POINT. A section is a label, a title, at most
// two short paragraphs, and then the content breaks into whatever form it
// actually is: cards, steps, a redline list, chips, bullets. An earlier
// version wrote every section as four or five paragraphs of running prose and
// the page read as a wall of text. If a section here grows past two paragraphs
// before its first card, it has gone wrong.
//
// TCTD sets the *visual* language, not the structure. Do not reach for one of
// its shapes because it is there: the row anatomy below is a redline list and
// not TCTD's time-study bar chart, because a bar implies a magnitude worth
// comparing and a row height against an icon size is not that.
//
// NOT A TRANSCRIPTION. The other four case studies are lifted out of a Figma
// case-study frame. There is no such frame for SMARTER, so this copy is
// written from the spec sheets in `Desktop/High Fidelity Screens/Instrument
// Tree/`, the two working prototypes, and the decision record in the design
// sessions. Every fact traces to one of those.
//
// NOTHING IS INVENTED. There are no outcome figures, because none exist: this
// shipped as a spec and a prototype and has not been tested with users. The
// figures in `stats` count the work, not its effect, and the work card carries
// no `metrics` key at all.
//
// TODO (Urvi): `metas` holds the only placeholders. Fill in role, context and
// duration; they render as visible "TODO" text until you do.
// ---------------------------------------------------------------------------

export const smarterNav = {
  slug: 'smarter-station-navigator',

  hero: {
    title: 'Making a Sensor Station Navigable',
    sub: 'Redesigning the navigation for a sensor detail page that had to hold a station, its modules, and the sensors inside them.',
  },

  // Four dashed stat cards. Each counts something real in the delivered work;
  // none of them claims an outcome.
  stats: [
    { icon: 'states', v: '3', k: 'Levels of hierarchy' },
    { icon: 'problem', v: '7', k: 'Problems in the first pass' },
    { icon: 'keyboard', v: '9', k: 'Interaction rules specified' },
    { icon: 'shipped', v: '2', k: 'Clickable prototypes' },
  ],

  metas: [
    { icon: 'role', title: 'Role', v: 'TODO: your title on the project' },
    { icon: 'context', title: 'Context', v: 'TODO: team, client, funder' },
    { icon: 'clock', title: 'Duration', v: 'TODO: e.g. Jan to Sep 2026' },
    { icon: 'gears', title: 'Methods', v: 'Heuristic review, component spec, prototyping' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'A page built for one sensor had to hold a station of them',
    lede: [
      'SMARTER catalogues environmental sensors. Its detail page was designed around a single instrument: a header, a row of tabs, a column of specifications.',
      'Real deployments are not single instruments. A station holds modules, and modules hold sensors, with specifications belonging to a different level at each step.',
    ],
    flowLabel: 'The hierarchy the page had to carry',
    flow: ['EnviroStation Pro 5000', 'AQ-Module 300', 'PMS7003'],
    note: 'The station, modules and sensors named throughout are the ones the spec sheets use.',
  },

  // -------------------------------------------------------------------------
  // The seven problems as numbered cards. The numbers match the annotations
  // printed on the sheet below them, so the list and the picture read together.
  first: {
    label: '02. What the First Component Got Wrong',
    title: 'It showed the structure but never said what a click would do',
    lede: [
      'The first pass was a card called Instrument Tree, styled to match the page beside it. Read back against the interface it served, the same failure kept reappearing in different forms.',
    ],
    problems: [
      { t: 'Three fills, no stated meaning', d: 'Grey, pale grey and navy read as three states, so “selected” could not be told apart from “container”.' },
      { t: 'Two “you are here” signals', d: 'The selected row copied the active tab pill above it. Both claimed to say where you were.' },
      { t: 'Indented pills read as buttons', d: 'Rows were pills of different widths. Platform to module was only 12 px of indent.' },
      { t: 'One column, three meanings', d: 'The right-hand column held a level, a category and a manufacturer, with nothing to tell them apart.' },
      { t: 'No way to fold a module', d: 'Modules contained sensors, but there was no chevron and no way to collapse them.' },
      { t: 'Unclear what was clickable', d: 'Filled rows looked like buttons; sensor rows looked like plain text.' },
      { t: 'System language on the label', d: '“Instrument tree” names the data structure, not the thing the reader is looking for.' },
    ],
    img: 'tree-old',
    alt: 'The first Instrument Tree component sheet: the assembled card, its states, redlines, overflow behaviour and the tokens it used.',
  },

  // -------------------------------------------------------------------------
  rule: {
    label: '03. Design Strategy',
    title: 'Give the two controls different jobs',
    lede: [
      'Every problem above is one problem: two controls were both trying to say where you were.',
      'So the navigator picks the subject and the tabs pick the aspect of it. Selection had to look nothing like the active tab pill, which is why it became a tint, a bar and a weight change rather than a filled pill.',
    ],
    pullLabel: 'The accessibility floor this set',
    pull: '“Selection is a bar and a weight change as well as a tint. Levels are carried by icon shape. Both survive greyscale.”',
    img: 'before-after',
    alt: 'Before and after, side by side: the old Instrument Tree card with its seven numbered problems, and the Station Navigator with the seven numbered answers.',
  },

  // -------------------------------------------------------------------------
  click: {
    label: '04. What a Click Does',
    title: 'The navigator and the panel header use the same words',
    lede: [
      'Set side by side, the two let you check the system against itself. Folding is housekeeping: it never moves the selection.',
    ],
    steps: [
      { t: 'Select the station', d: 'The panel shows station-wide specs. No path line, because this is the top.' },
      { t: 'Select a module', d: 'It unfolds, and the panel header takes its name.' },
      { t: 'Select a sensor', d: 'The path grows a third level. A folded parent holding the selection shows a dot.' },
    ],
    img: 'click-does',
    alt: 'Three states side by side, station selected then module selected then sensor selected with MetStation folded, each with the panel header it produces underneath.',
  },

  // -------------------------------------------------------------------------
  states: {
    label: '05. Row Anatomy',
    title: 'One row, six states, no exceptions',
    lede: [
      'Every row is the same target with the same hover fill and the same hit area, so nothing shrinks as you go deeper. Hierarchy comes from position, not from fill.',
    ],
    // A redline list, not a bar chart. These are specification values, not
    // magnitudes worth comparing against each other.
    specs: [
      { k: 'Row height', v: '48 px', note: 'The same at every level' },
      { k: 'Indent step', v: '20 px', note: 'Text starts at +42' },
      { k: 'Selection bar', v: '3 × 28', note: 'Carries selection without colour' },
      { k: 'Icon', v: '16 px', note: 'Icon shape carries the level' },
      { k: 'Chevron slot', v: '16 px', note: 'Reserved even when empty' },
      { k: 'Corner radius', v: '6 px', note: 'Shared with the panel card' },
    ],
    note: 'Hover is #F3F4F6, an existing token rather than a new one. Focus is a 2 px navy ring, so keyboard users can see where the arrow keys are.',
    img: 'row-states',
    alt: 'The six row states, default, hover, selected, keyboard focus, folded and contains selection, beside an anatomy diagram showing the 20 px indent steps.',
  },

  // -------------------------------------------------------------------------
  rules: {
    label: '06. The Interaction Contract',
    title: 'What decides whether this is one component or several',
    lede: [
      'Tree behaviour follows the WAI-ARIA tree view pattern, so the keyboard map is the one people already have.',
    ],
    table: [
      ['Click a row', 'Selects it. A parent also unfolds.'],
      ['Click a chevron', 'Folds or unfolds only. The selection does not move.'],
      ['Fold a parent holding the selection', 'Selection stays. The parent turns navy and shows a dot.'],
      ['Up / Down', 'Moves focus between visible rows.'],
      ['Right', 'Unfolds a parent, or steps into its first child.'],
      ['Left', 'Folds a parent, or steps out to the parent.'],
      ['Enter / Space', 'Selects the focused row.'],
      ['Reload, share a link, press Back', 'The selection lives in the URL, so all three keep it.'],
      ['Below 1024 px', 'The navigator becomes a “Showing” dropdown above the panel.'],
    ],
  },

  // -------------------------------------------------------------------------
  scope: {
    label: '07. Scope',
    title: 'The navigator was not needed everywhere',
    lede: [
      'Technical Specifications vary by sensor. Deployment, Data and Network describe the whole instrument, so on those tabs a component picker is a control with nothing to pick.',
    ],
    moves: [
      {
        t: 'Scope it to the tab that needs it',
        sub: 'Collapses at Deployment',
        label: 'Behaviour',
        body: 'It appears on Technical Specifications and collapses when you scroll to Deployment, the point at which it stops being able to change anything. Card width narrows only inside that tab.',
      },
      {
        t: 'Skip to section, never filter',
        sub: 'All information stays visible',
        label: 'Rejected alternative',
        body: 'A dropdown was built and rejected: it hid the structure it was meant to explain. The navigator moves you through the page; it does not decide what the page contains.',
      },
    ],
    question: {
      label: 'Escalated to the team, still open',
      body: 'Deployment & Operation holds Calibration Guideline, Maintenance Method and Maintenance Frequency. A particle sensor and a gas sensor are serviced differently. If any of those three vary per sensor, they belong in Technical Specifications.',
      after: 'The answer changes the information architecture, not the component, which is why it went to the people who run the stations rather than being resolved in Figma.',
    },
    img: 'scope-dropdown',
    alt: 'The specs scope dropdown: the collapsed navigator sitting above the technical specifications panel as a single “Showing” control.',
  },

  // -------------------------------------------------------------------------
  situ: {
    label: '08. In Place',
    title: 'Against the page, not the sheet',
    lede: [
      'The component had to survive a station overview with its own sub-cards, and specification values long enough to wrap or stack.',
    ],
    shots: [
      { img: 'station-overview', alt: 'The station overview: shared specifications for the whole station, with a sub-card for each module underneath.', cap: 'Station overview: the state you land on, and the only one with no path line.' },
      { img: 'detail-in-situ', alt: 'The full sensor detail page with the Station Navigator in the left column and technical specifications beside it.', cap: 'The navigator in the detail page it was drawn to match.' },
      { img: 'long-content', alt: 'The same detail page with long specification values, showing value wrap, the stacked spec row and title truncation.', cap: 'Long content: values wrap, spec rows stack, names truncate rather than reflowing the tree.' },
    ],
  },

  // -------------------------------------------------------------------------
  why: {
    label: '09. Why These Choices',
    title: 'Each one answers a named principle',
    items: [
      { icon: 'eye', t: 'Visibility of system status', note: 'Nielsen 1', d: 'The panel header repeats the exact name you clicked, where you were already looking.' },
      { icon: 'question', t: 'Recognition, not recall', note: 'Nielsen 6', d: '“OX-B431” means nothing alone. “O₃ · NO₂” underneath it does.' },
      { icon: 'compare', t: 'Never colour alone', note: 'WCAG 1.4.1', d: 'Selection is a bar and a weight change as well as a tint; levels are icon shapes.' },
      { icon: 'states', t: 'Big, uniform targets', note: 'Fitts’s law', d: 'Full-width rows give every node the same hit area, instead of pills that shrink with depth.' },
      { icon: 'keyboard', t: 'Split select from fold', note: 'WAI-ARIA', d: 'Folding is housekeeping. It must never change what the panel shows.' },
      { icon: 'rule', t: 'If it needs a legend, fix the control', note: null, d: 'The old card needed a Tree Key to be understood. The new one does not, so the key is gone.' },
    ],
  },

  // -------------------------------------------------------------------------
  open: {
    label: '10. Still Open',
    title: 'What this shipped without',
    lede: [
      'A specification and two prototypes, not a tested product. None of the three below is a drawing problem.',
    ],
    items: [
      'Whether calibration and maintenance fields vary per sensor, which decides how far the navigator reaches.',
      'What happens below 1024 px in practice. The dropdown fallback is specified but not drawn or built.',
      'Whether the three-level model holds for instruments that are one instrument with sensors inside.',
    ],
  },
}
