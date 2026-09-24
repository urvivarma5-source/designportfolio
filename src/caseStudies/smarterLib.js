// ---------------------------------------------------------------------------
// ALL COPY FOR "A LIBRARY YOU CAN COMPARE SENSORS IN" (SMARTER, part 2 of 3).
// Layout is in SmarterLibPage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// Same shape rule as smarterNav.js: a label, a title, at most two short
// paragraphs, then cards, steps, bars, chips or bullets. Never a wall.
//
// Written from the high-fidelity screens in `Desktop/High Fidelity Screens/`,
// the component sheet `Instrument Tree/04 New Components.svg`, and the build
// record of the prototype in `Desktop/UU/CLAUDE PROTOTYPE/html/`.
//
// The figures in `stats` are the prototype's own data and code, not estimates.
// They count the build, not its effect, which is why the work card carries no
// `metrics` key.
//
// TODO (Urvi): `metas` holds the placeholders. Also, the comparison screen in
// §04 is the grid's specification, so its cells read "Value"; swap in a filled
// export if you have one.
// ---------------------------------------------------------------------------

export const smarterLib = {
  slug: 'smarter-sensor-library',

  hero: {
    title: 'A Library You Can Compare Sensors In',
    sub: 'Ninety environmental sensors, and a researcher who has to pick four of them. Browse, filter and comparison, on one component library.',
  },

  stats: [
    { icon: 'compare', v: '90', k: 'Sensors in the catalogue' },
    { icon: 'filter', v: '9', k: 'Categories' },
    { icon: 'states', v: '6', k: 'Sort options' },
    { icon: 'keyboard', v: '4', k: 'Responsive breakpoints' },
  ],

  metas: [
    { icon: 'role', title: 'Role', v: 'TODO: your title on the project' },
    { icon: 'context', title: 'Context', v: 'TODO: team, client, funder' },
    { icon: 'clock', title: 'Duration', v: 'TODO: e.g. Jan to Sep 2026' },
    { icon: 'gears', title: 'Methods', v: 'Component library, prototyping, accessibility pass' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'Three jobs that look like one catalogue',
    lede: [
      'Somebody planning a study has to do three different things with a sensor registry, and they are not the same job.',
      'Building it as a single catalogue would have made the first easy and the other two impossible.',
    ],
    jobs: [
      { icon: 'filter', t: 'Find', note: 'Browse and filter', d: 'Narrow ninety sensors to a shortlist without hitting a dead end.' },
      { icon: 'compare', t: 'Judge', note: 'Compare four', d: 'Set candidates side by side on the specifications that decide between them.' },
      { icon: 'problem', t: 'Add', note: 'Submit a sensor', d: 'Contribute one the catalogue is missing, with every field the detail page shows.' },
    ],
  },

  // -------------------------------------------------------------------------
  browse: {
    label: '02. Browse and Filter',
    title: 'A filter that cannot dead-end',
    lede: [
      'The first drawer greyed out options that would return nothing. It was rejected: a greyed option still occupies the list, still has to be read, and still invites the click it is refusing.',
      'So an option with no matches does not appear, one with matches carries its count, and an empty group disappears.',
    ],
    decisions: [
      { t: 'The listing remembers where you were', d: 'Sort, category, query and every drawer filter live in the URL. Scroll position and loaded cards return with you from a detail page.' },
      { t: 'Nothing reloads', d: 'Clicking a filter used to blink. The listing now morphs in place against a keyed diff, scrolls only when it needs to, and preloads images first.' },
    ],
    shots: [
      { img: 'browse', alt: 'The sensor library: a left sidebar of browse-by categories, a search field, and a column of sensor cards with property tags and a Compare button on each.', cap: 'The library, filtered to air quality. Properties are tags, so the list is scannable before anything is opened.' },
      { img: 'filter', alt: 'The filter drawer: grouped filter options, each with a count of matching sensors.', cap: 'Counts on every option. Options with none are not drawn at all.' },
    ],
  },

  // -------------------------------------------------------------------------
  select: {
    label: '03. Selection',
    title: 'One card, two modes, no mode indicator',
    lede: [
      'Reached from the library, a card opens the sensor. Reached from Browse Sensors on the empty comparison page, the same card only selects.',
    ],
    rules: [
      ['The tray appears on the first selection', 'Not after Compare is pressed. You should see the thing filling up while you fill it.'],
      ['A fifth sensor raises an error', 'Rather than silently swapping one out, or building a comparison the grid cannot draw.'],
      ['A dead zone around the checkbox', 'A 64 px safety area that toggles selection and never opens the card.'],
      ['Removals are undoable', 'Every removal puts an Undo in the toast.'],
      ['Clear selection is a link', 'Two filled buttons in one row would read as two equal choices.'],
    ],
  },

  // -------------------------------------------------------------------------
  compare: {
    label: '04. Comparison',
    title: 'Four across, grouped by what is measured',
    lede: [
      'Sensor headers stick, a switch marks the cells that disagree, and a shortlist saves under a name.',
      'One feature was built and removed: Hide identical rows. It made the table shorter and the comparison worse.',
    ],
    pullLabel: 'Why it came out',
    pull: '“The rows where four sensors agree are the reason you can trust the rows where they do not.”',
    img: 'compare',
    alt: 'The comparison dashboard: four sensor cards in a tray above a grouped table of measurement entities, with cells marked where values differ.',
    cap: 'The comparison template. Cells read “Value” because this is the grid’s specification, not a filled export, including the case it exists to prove: a value that runs to two lines.',
  },

  // -------------------------------------------------------------------------
  system: {
    label: '05. The Component Library',
    title: 'States live in the component name, not in a sheet of near-copies',
    lede: [
      'Every new component had to land where a developer would look for it, so the naming is a path, then a variant, then the states it carries.',
      'Writing states into the name is what keeps the library from doubling each time a row gains a behaviour.',
    ],
    shots: [
      { img: 'comp-rows', alt: 'The navigator row component at three levels, station, module and sensor, each with its default, hover, selected and keyboard focus states.', cap: 'One row, three levels, four states each. The level is a variant, not a separate component.' },
      { img: 'comp-spec', alt: 'Data display components: a spec row whose value wraps, a stacked spec row, and an entity card whose title wraps.', cap: 'The three cases long content produces, drawn rather than left to the implementation.' },
      { img: 'comp-scope', alt: 'The scope header component at station, module and sensor level, each showing the breadcrumb path above the name.', cap: 'The scope header: the panel’s answer to the navigator, at each level.' },
      { img: 'comp-accordion', alt: 'The section accordion component in its collapsed and expanded states.', cap: 'Section accordion, collapsed and expanded.' },
    ],
  },

  // -------------------------------------------------------------------------
  submit: {
    label: '06. Adding a Sensor',
    title: 'Every field it collects is a field the detail page shows',
    lede: [
      'A form that gathers something the catalogue cannot display produces data nobody reads. A page with a field the form never asks for produces a permanent blank.',
    ],
    decisions: [
      { t: 'Save by section', sub: 'Not all at the end', label: 'Why', body: 'Each section validates and saves on its own, with a progress bar across the form. A long intake that can only be submitted whole is one people abandon.' },
      { t: 'Leaving asks first', sub: 'Route and unload both guarded', label: 'Why', body: 'Navigating away from a dirty form raises “Leave without saving?”, on the route change as well as on the browser’s own unload.' },
      { t: 'Dropdowns are components', sub: 'Full keyboard support', label: 'Why', body: 'A custom dropdown that traps a keyboard user is worse than the native control it replaced.' },
    ],
    img: 'intake',
    alt: 'The submit-a-sensor intake form: a breadcrumb, a progress indicator, and grouped fields with custom dropdowns and file upload slots.',
    cap: 'The intake form, mirroring the detail page section for section.',
  },

  // -------------------------------------------------------------------------
  access: {
    label: '07. Accessibility',
    title: 'A pass over finished flows, not a feature',
    lede: [
      'Done last on purpose: it is the only way to catch what is actually broken rather than what was planned for.',
    ],
    items: [
      'Every clickable card and control is keyboard reachable with a visible focus ring.',
      'Focus is trapped inside the drawer, the sort popover and every dialog, and returns where it came from.',
      'Toasts are announced; errors carry role="alert" and mark their field invalid.',
      'A skip link, and prefers-reduced-motion honoured throughout.',
      'Below 1024 px the browse-by sidebar becomes a drawer, because a sidebar sitting on top of the content is not a sidebar.',
      'On phones each comparison row stacks and carries its sensor name, so a long row cannot lose its label.',
    ],
    img: 'detail',
    alt: 'The sensor detail page: a header with the sensor name and manufacturer, a sticky row of tabs, and the technical specifications beneath.',
    cap: 'The detail page every other surface points at.',
  },

  // -------------------------------------------------------------------------
  open: {
    label: '08. Still Open',
    title: 'Reasoning is not evidence',
    lede: [
      'A designed and built prototype, not a tested product. Its open questions are about evidence rather than execution.',
    ],
    items: [
      'None of it has been through usability testing.',
      'Whether four is the right cap for a comparison. It is the number the grid draws well, not a number anybody has checked.',
      'Whether an “already has a transform” flag should show while browsing, a question inherited from the process mapping.',
    ],
  },
}
