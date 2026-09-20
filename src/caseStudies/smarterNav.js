// ---------------------------------------------------------------------------
// ALL COPY FOR "MAKING A SENSOR STATION NAVIGABLE" (SMARTER, part 1 of 3).
// Layout is in SmarterNavPage.jsx; nothing below is styling. See DESIGN.md
// §11e.
//
// THIS ONE IS NOT A TRANSCRIPTION. The other four case studies are lifted out
// of a finished Figma case-study frame with tools/extract_case_study.py. There
// is no such frame for SMARTER: the source is the design work itself: the
// spec sheets in `Desktop/High Fidelity Screens/Instrument Tree/`, the two
// working prototypes, and the decision record in the design sessions. So the
// copy here is written rather than transcribed, and §11e's fidelity rule is
// the narrower one: every *fact* (a token, a measurement, a rejected
// option, a heuristic cited) comes from the sheets or the record, and nothing is
// added to round out a story.
//
// NOTHING IS INVENTED. In particular there are no outcome figures anywhere
// below, because none exist yet: this work shipped as a spec and a prototype,
// and it has not been tested with users. A `metrics` key on the work card
// would have to be made up, so the card carries none. That is the same rule
// projects.js states at the top of its own file.
//
// TODO (Urvi): three things I could not source and did not guess.
//   1. `hero.meta`: the team, the client and the dates are marked TODO below.
//   2. §09, what happened when this went to the team. The record ends at the
//      handover, with the scope question still open with your boss.
//   3. Any usability testing. If the navigator gets tested, that is §10 and it
//      is also where the card's `metrics` would finally come from.
// ---------------------------------------------------------------------------

export const smarterNav = {
  slug: 'smarter-station-navigator',

  hero: {
    eyebrow: 'SMARTER · Product design',
    title: 'Making a sensor station navigable',
    sub: 'A detail page built for one sensor had to hold a station containing modules containing sensors. This is the navigation that let it.',
    // TODO (Urvi): fill these four in. I have left them as placeholders rather
    // than guessing at a team size, a client name or a date range.
    meta: [
      { k: 'Role', v: 'TODO: your title on the project' },
      { k: 'Context', v: 'TODO: team, client, funder' },
      { k: 'Dates', v: 'TODO: e.g. Jan to Sep 2026' },
      {
        k: 'Shipped',
        v: 'Two navigation specs, a component sheet, and two clickable prototypes',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 01
  // -------------------------------------------------------------------------
  brief: {
    n: '01',
    title: 'The page was built for one sensor. Then the sensors arrived in boxes.',
    body: [
      'SMARTER catalogues environmental sensors: what each one measures, how it is deployed, what it costs to run. The detail page was designed around a single instrument: a header, a row of tabs, and a long column of specifications underneath.',
      'Real deployments are not single instruments. An EnviroStation Pro 5000 is a station that holds an AQ-Module 300 and a MetStation 200; those modules hold five sensors between them: PMS7003, OX-B431, SHT45, an 05103 Wind Monitor and a BMP390. Three levels, and specifications that belong to a different level at each step.',
      'So the page needed a way to say which of those things you were reading about, without becoming a second site.',
    ],
    note: 'The station, the modules and the sensors in this case study are the ones the spec sheets use throughout.',
  },

  // -------------------------------------------------------------------------
  // 02. The rejected first component
  // -------------------------------------------------------------------------
  first: {
    n: '02',
    title: 'The first component, and the seven things wrong with it',
    body: [
      'The first pass was a card called Instrument Tree, styled to match the detail page it sat next to. It listed the station, its modules and their sensors, and it did not work. Reading it back against the interface it was meant to serve, the same failure kept appearing in different forms: the card showed structure but never said what a click would do.',
    ],
    // Each of these is one of the seven numbered annotations on
    // "05 Navigation Redesign.svg". The image below carries the same numbers.
    problems: [
      'Three fills, grey, pale grey and navy, with no stated meaning. They read as three states, so “selected” could not be told apart from “container”.',
      'The selected row copied the active tab pill above it. Two “you are here” signals competing for the same job.',
      'Rows were indented pills of different widths, which reads as a stack of buttons. Platform to module was only 12 px of indent.',
      'The right-hand column meant three different things: a level (“Platform”), a category (“Air Quality”), a manufacturer (“Plantower”).',
      'Modules contained sensors, but nothing said so. No chevron, and no way to fold them.',
      'Filled rows looked like buttons; sensor rows looked like plain text. Which of these could you click?',
      '“Instrument tree” is system language, and nothing said what a click would do.',
    ],
    img: 'tree-old',
    alt: 'The first Instrument Tree component sheet: the assembled card, its states, redlines, overflow behaviour and the tokens it used.',
  },

  // -------------------------------------------------------------------------
  // 03. The rule
  // -------------------------------------------------------------------------
  rule: {
    n: '03',
    title: 'One rule: the navigator picks what, the tabs pick which aspect of it',
    body: [
      'Every problem above is a version of the same one: two controls were both trying to tell you where you were. The fix was to give them different jobs and make them look different enough that you could not confuse them.',
      'The navigator chooses the subject: the station, a module, or a sensor. The tabs choose the aspect: technical specifications, deployment, data, network. Selection in the navigator therefore had to look nothing like the active tab pill, which is why it became a tint, a 3 px bar and a bold navy name rather than a filled pill.',
      'The panel beside it then answers with a header named after the row you clicked, so the result of every click is visible without scrolling.',
    ],
    pull: 'Selection is carried by a bar and a weight change as well as a tint, and levels by icon shape. Both survive greyscale and colour-blindness.',
    img: 'before-after',
    alt: 'Before and after, side by side: the old Instrument Tree card with its seven numbered problems, and the Station Navigator with the seven numbered answers.',
  },

  // -------------------------------------------------------------------------
  // 04
  // -------------------------------------------------------------------------
  click: {
    n: '04',
    title: 'What a click does',
    body: [
      'The navigator and the panel header use the same words, side by side, so you can check the system against itself. Select the station and the panel shows station-wide specs with no path line, because this is the top. Select a module and it unfolds, and the panel header takes its name. Select a sensor and the path grows a third level.',
      'Folding is housekeeping, not navigation: folding a parent never moves the selection. A folded parent that still holds the selected row says so with a navy name and a dot.',
    ],
    img: 'click-does',
    alt: 'Three states side by side, station selected then module selected then sensor selected with MetStation folded, each with the panel header it produces underneath.',
  },

  // -------------------------------------------------------------------------
  // 05
  // -------------------------------------------------------------------------
  states: {
    n: '05',
    title: 'Row states, and the geometry underneath them',
    body: [
      'Six states, one row. Every row in the tree, whether station, module or sensor, is the same 48 px full-width target with the same hover fill and the same hit area, so everything clickable looks the same and nothing shrinks as you go deeper.',
      'Hierarchy comes from position rather than fill: indent steps of 20 px with guide lines, and text starting at +42.',
    ],
    specs: [
      { k: 'Row', v: '48' },
      { k: 'Radius', v: '6' },
      { k: 'Selection bar', v: '3 × 28' },
      { k: 'Icon', v: '16' },
      { k: 'Chevron slot', v: '16' },
      { k: 'Indent step', v: '20' },
    ],
    note: 'Hover is #F3F4F6, an existing token rather than a new one. Focus is a 2 px navy ring, so keyboard users can see where the arrow keys are.',
    img: 'row-states',
    alt: 'The six row states, default, hover, selected, keyboard focus, folded and contains selection, beside an anatomy diagram showing the 20 px indent steps.',
  },

  // -------------------------------------------------------------------------
  // 06. The interaction contract
  // -------------------------------------------------------------------------
  rules: {
    n: '06',
    title: 'The interaction contract',
    body: [
      'Tree behaviour follows the WAI-ARIA tree view pattern, so the keyboard map is the one people already have. Writing it out as a table was the point: it is the part a developer implements, and the part that decides whether the component is one thing or several.',
    ],
    // Transcribed from §4 of "05 Navigation Redesign.svg".
    table: [
      ['Click a row', 'Selects it. A parent also unfolds.'],
      ['Click a chevron', 'Folds or unfolds only. The selection does not move.'],
      ['Fold a parent that holds the selection', 'Selection stays. The parent’s name turns navy and shows a dot.'],
      ['↑ / ↓', 'Moves focus between visible rows.'],
      ['→', 'Unfolds a parent, or steps into its first child.'],
      ['←', 'Folds a parent, or steps out to the parent.'],
      ['Enter / Space', 'Selects the focused row.'],
      ['Reload, share a link, press Back', 'The selection lives in the URL (?component=aq-module-300), so all three keep it.'],
      ['Window narrower than 1024 px', 'The navigator becomes a “Showing: AQ-Module 300” dropdown above the panel.'],
    ],
  },

  // -------------------------------------------------------------------------
  // 07. The scope question. This is the part of the work I would want read.
  // -------------------------------------------------------------------------
  scope: {
    n: '07',
    title: 'The question the design could not answer on its own',
    body: [
      'Partway through it became clear the navigator was not needed everywhere. Technical Specifications vary by sensor. Deployment, Data and Network describe the whole instrument and do not change from one sensor to the next, so on those tabs a component picker would be a control with nothing to pick.',
      'That produced two design moves and one question I could not settle by drawing.',
    ],
    moves: [
      {
        t: 'Scope the navigator to the tab that needs it',
        d: 'It appears on Technical Specifications and collapses automatically when you scroll to Deployment, the point at which it stops being able to change anything. Card width narrows only inside that tab; everything below Deployment keeps its full width.',
      },
      {
        t: 'Make it a skip-to-section control, never a filter',
        d: 'All the information stays visible at all times. The navigator moves you through the page; it does not decide what the page contains. A dropdown was built and rejected for exactly this reason: it hid the structure it was supposed to explain.',
      },
    ],
    // The escalation is the honest centre of this section and is quoted as a
    // question, not as a finding: at the point the record ends it was still
    // open.
    question: {
      label: 'Escalated to the team, still open',
      body: 'Deployment & Operation holds Calibration Guideline, Maintenance Method and Maintenance Frequency. On real stations a particle sensor and a gas sensor are serviced differently. If any of those three vary per sensor, they belong in Technical Specifications. If they do not, that tab is correctly out of the navigator’s reach.',
      after: 'The answer changes the information architecture, not the component, which is why it went to the people who run the stations rather than being resolved in Figma.',
    },
    img: 'scope-dropdown',
    alt: 'The specs scope dropdown: the collapsed navigator sitting above the technical specifications panel as a single “Showing” control.',
  },

  // -------------------------------------------------------------------------
  // 08
  // -------------------------------------------------------------------------
  situ: {
    n: '08',
    title: 'In place',
    body: [
      'The navigator had to survive the page it sits in rather than the sheet it was drawn on: a station overview with its own sub-cards, and specification rows whose values run long enough to wrap or stack.',
    ],
    shots: [
      {
        img: 'station-overview',
        alt: 'The station overview: shared specifications for the whole station, with a sub-card for each module underneath.',
        cap: 'Station overview: the state you land on, and the only one with no path line.',
      },
      {
        img: 'detail-in-situ',
        alt: 'The full sensor detail page with the Station Navigator in the left column and technical specifications beside it.',
        cap: 'The navigator in the detail page it was drawn to match.',
      },
      {
        img: 'long-content',
        alt: 'The same detail page with long specification values, showing value wrap, the stacked spec row and title truncation.',
        cap: 'Long content: values wrap, spec rows stack, and names truncate at a fixed point rather than reflowing the tree.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 09. The reasoning, stated plainly. Each of these is on the spec sheet.
  // -------------------------------------------------------------------------
  why: {
    n: '09',
    title: 'Why these choices',
    items: [
      {
        t: 'Visibility of system status',
        d: 'The panel header repeats the exact name you clicked, so the result of every click is visible where you were already looking.',
        src: 'Nielsen heuristic 1',
      },
      {
        t: 'Recognition rather than recall',
        d: '“OX-B431” means nothing on its own; “O₃ · NO₂” underneath it does. Every subtitle says what that part measures.',
        src: 'Nielsen heuristic 6',
      },
      {
        t: 'Never colour alone',
        d: 'Selection is a bar and a weight change as well as a tint; levels are carried by icon shape. Both survive greyscale.',
        src: 'WCAG 1.4.1',
      },
      {
        t: 'Big, uniform targets',
        d: 'Full-width rows give every node the same generous hit area, instead of pills that shrink as you go deeper.',
        src: 'Fitts’s law',
      },
      {
        t: 'Split select from fold',
        d: 'Folding is navigation housekeeping; it must never change what the panel shows.',
        src: 'WAI-ARIA tree view',
      },
      {
        t: 'If it needs a legend, fix the control',
        d: 'The old card needed a Tree Key to be understood. The new one does not, so the key is gone.',
        src: null,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 10. What the work left open. Written as open questions on purpose.
  // -------------------------------------------------------------------------
  open: {
    n: '10',
    title: 'What is still open',
    body: [
      'This shipped as a specification and two clickable prototypes, not as a tested product. Three things are unresolved, and none of them are drawing problems.',
    ],
    items: [
      'Whether calibration and maintenance fields vary per sensor. That is the scope question in §07, and it decides how far the navigator reaches.',
      'What happens below 1024 px in practice. The dropdown fallback is specified but has not been drawn or built.',
      'Whether the three-level model holds for instruments that are one instrument with sensors inside, rather than a station of modules. The component was adapted for that case; it has not been checked against a real one.',
    ],
  },
}
