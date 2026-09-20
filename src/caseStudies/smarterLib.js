// ---------------------------------------------------------------------------
// ALL COPY FOR "A LIBRARY YOU CAN COMPARE SENSORS IN" (SMARTER, part 2 of 3).
// Layout is in SmarterLibPage.jsx; nothing below is styling. See DESIGN.md
// §11e.
//
// Like smarterNav.js this is written, not transcribed. There is no Figma
// case-study frame for SMARTER. The facts come from the high-fidelity screens
// in `Desktop/High Fidelity Screens/`, the component sheet
// `Instrument Tree/04 New Components.svg`, and the build record of the
// clickable prototype in `Desktop/UU/CLAUDE PROTOTYPE/html/`.
//
// The counts in §01 (90 sensors, 9 categories, 6 sort options, 4 breakpoints)
// are real: they are the prototype's own data and code, not estimates. They
// are the only figures on the page, and they measure the *build*, not its
// impact, which is why the work card still carries no `metrics` row.
//
// TODO (Urvi): the same three gaps as the navigation case study.
//   1. `hero.meta`: role, context and dates.
//   2. §08. Nothing here has been tested with users. If it is, that section
//      gains a result and the card finally gets its metrics.
//   3. The comparison screen shown in §04 is the design template, so its cells
//      read "Value". Swap in a filled export if you have one.
// ---------------------------------------------------------------------------

export const smarterLib = {
  slug: 'smarter-sensor-library',

  hero: {
    eyebrow: 'SMARTER · Product design',
    title: 'A library you can compare sensors in',
    sub: 'Ninety environmental sensors, and a researcher who has to pick four of them. Browse, filter and comparison, and the component library underneath.',
    meta: [
      { k: 'Role', v: 'TODO: your title on the project' },
      { k: 'Context', v: 'TODO: team, client, funder' },
      { k: 'Dates', v: 'TODO: e.g. Jan to Sep 2026' },
      { k: 'Shipped', v: 'High-fidelity screens, a component library, and a full clickable prototype' },
    ],
  },

  // -------------------------------------------------------------------------
  brief: {
    n: '01',
    title: 'Three jobs, not one',
    body: [
      'SMARTER is a registry of environmental sensors. Somebody planning a study has to do three different things with it, and they are not the same job: find the sensors that could work, judge them against each other, and add one that is missing.',
      'Designing it as a single catalogue would have made the first job easy and the other two impossible: comparison is not browsing with more columns, and submitting is not the detail page with inputs. So the library is three connected surfaces that share one component set.',
    ],
    stats: [
      { v: '90', k: 'Sensors in the catalogue' },
      { v: '9', k: 'Categories' },
      { v: '6', k: 'Sort options' },
      { v: '4', k: 'Responsive breakpoints' },
    ],
  },

  // -------------------------------------------------------------------------
  browse: {
    n: '02',
    title: 'Filters that cannot dead-end',
    body: [
      'The first version of the filter drawer greyed out options that would return nothing. It was rejected, and the reason is worth keeping: a greyed option still occupies the list, still has to be read, and still invites the click it is refusing. Hiding it is the smaller lie.',
      'So an option with no matches does not appear, an option with matches carries its count, and a filter group with nothing in it disappears entirely. The result count sits with the breadcrumbs on every listing, not only on searches, so each filter shows its own effect.',
    ],
    decisions: [
      {
        t: 'The listing remembers where you were',
        d: 'Sort, category, query and every drawer filter live in the URL. Scroll position and the number of loaded cards come back with you from a detail page, so looking at one sensor does not cost you the shortlist you built.',
      },
      {
        t: 'Nothing reloads',
        d: 'Clicking a filter used to blink. Two causes: a full markup swap plus a jump to the top, and new cards appearing before their photographs had loaded. The listing now morphs in place against a keyed diff, scrolls only when it needs to, and preloads the images first.',
      },
    ],
    shots: [
      { img: 'browse', alt: 'The sensor library: a left sidebar of browse-by categories, a search field, and a column of sensor cards with property tags and a Compare button on each.', cap: 'The library, filtered to air quality. Every card carries its measured properties as tags, so the list is scannable before anything is opened.' },
      { img: 'filter', alt: 'The filter drawer: grouped filter options, each with a count of matching sensors.', cap: 'The drawer. Counts on every option; options with none are not drawn at all.' },
    ],
  },

  // -------------------------------------------------------------------------
  select: {
    n: '03',
    title: 'Selecting four things without losing your place',
    body: [
      'Comparison holds four sensors. Getting four of them chosen sounds trivial and was the fiddliest part of the whole flow, because the same card has to do two different things depending on how you arrived at it.',
      'Reached from the library, a card opens the sensor. Reached from Browse Sensors on the empty comparison page, the same card only selects. One card, two modes, and the mode has to be obvious without a mode indicator.',
    ],
    rules: [
      ['The comparison tray appears on the first selection', 'Not after Compare is pressed. You should see the thing filling up while you fill it.'],
      ['Selecting a fifth sensor raises an error', 'Rather than silently swapping one out, or letting you build a comparison the dashboard cannot draw.'],
      ['There is a dead zone around the checkbox', 'A 64 px safety area that toggles selection and never opens the card. Clicking near a checkbox means the checkbox.'],
      ['Removals are undoable', 'Removing a saved sensor, a comparison item or the whole selection puts an Undo in the toast.'],
      ['Clear selection is a link, not a button', 'It shares a row with Compare, and two filled buttons would have read as two equal choices. It also returns you to the empty comparison state, not to the full listing. The state you are in is the one you were clearing.'],
    ],
  },

  // -------------------------------------------------------------------------
  compare: {
    n: '04',
    title: 'The comparison dashboard',
    body: [
      'Four sensors across, specifications down, grouped by what is being measured. The sensor headers stick as you scroll, a Highlight differences switch marks the cells that disagree, and the whole thing saves under a name so a shortlist survives the session.',
      'One feature was built and then removed: Hide identical rows. It made the table shorter and the comparison worse. The rows where four sensors agree are the reason you can trust the rows where they do not.',
    ],
    img: 'compare',
    alt: 'The comparison dashboard: four sensor cards in a tray above a grouped table of measurement entities, with cells marked where values differ.',
    cap: 'The comparison template. The cells read “Value” because this is the specification for the grid, not a filled export. It includes the case it exists to prove, a value that runs to two lines.',
  },

  // -------------------------------------------------------------------------
  // The section I would want someone to read: small calls, stated reasons.
  system: {
    n: '05',
    title: 'The component library underneath',
    body: [
      'Everything above is assembled from one set of components, and every new one had to land somewhere a developer would look for it. The naming is the design system’s own: a path, then a variant, then the states it carries. `Navigation / Navigator Row / Level=Module`, with `State: Default / Hover / Selected / Focus` and `Expanded: true / false`.',
      'Writing states into the component name rather than drawing a sheet of near-identical cards is what keeps the library from doubling every time a row gains a behaviour.',
    ],
    shots: [
      { img: 'comp-rows', alt: 'The navigator row component at three levels, station, module and sensor, each with its default, hover, selected and keyboard focus states.', cap: 'One row, three levels, four states each. The level is a variant, not a separate component.' },
      { img: 'comp-spec', alt: 'Data display components: a spec row whose value wraps, a stacked spec row, and an entity card whose title wraps.', cap: 'The three cases long content produces, drawn rather than left to the implementation.' },
      { img: 'comp-scope', alt: 'The scope header component at station, module and sensor level, each showing the breadcrumb path above the name.', cap: 'The scope header: the panel’s answer to the navigator, at each of the three levels.' },
      { img: 'comp-accordion', alt: 'The section accordion component in its collapsed and expanded states.', cap: 'Section accordion, collapsed and expanded.' },
    ],
  },

  // -------------------------------------------------------------------------
  submit: {
    n: '06',
    title: 'Adding a sensor that is missing',
    body: [
      'The intake form has one hard constraint: every field it collects must be a field the detail page displays. A form that gathers something the catalogue cannot show produces data nobody reads; a detail page with a field the form never asks for produces a permanent blank.',
      'So the form was built against the detail page field by field, and the fields that were missing were added to whichever section of the page they belonged in rather than dropped.',
    ],
    decisions: [
      { t: 'Save by section, not at the end', d: 'Each section validates and saves on its own, with a progress bar across the whole form. A long intake that can only be submitted whole is one people abandon.' },
      { t: 'Leaving asks first', d: 'Navigating away from a dirty form raises “Leave without saving?”, guarded on the route change as well as on the browser’s own unload.' },
      { t: 'Dropdowns are components, not selects', d: 'The design specifies a dropdown with its own chevron and list styling, so it is built as one, with full keyboard support, because a custom dropdown that traps a keyboard user is worse than the native control it replaced.' },
    ],
    img: 'intake',
    alt: 'The submit-a-sensor intake form: a breadcrumb, a progress indicator, and grouped fields with custom dropdowns and file upload slots.',
    cap: 'The intake form, mirroring the detail page section for section.',
  },

  // -------------------------------------------------------------------------
  access: {
    n: '07',
    title: 'Keyboard, screen reader, and four widths',
    body: [
      'The accessibility work was done as a pass over the finished flows rather than as a feature, which is the only way it catches the things that are actually broken.',
    ],
    items: [
      'Every clickable card and control is reachable by keyboard and shows a visible focus ring.',
      'Focus is trapped inside the filter drawer, the sort popover, the browse drawer and every dialog, and returns to where it came from on close.',
      'Toasts are announced; errors carry role="alert" and mark their field invalid.',
      'A skip link, and prefers-reduced-motion honoured throughout.',
      'Four breakpoints: 1280, 1024, 900 and 760. At 1024 and below the browse-by sidebar becomes a drawer behind a Browse by control, because a sidebar that sits on top of the content is not a sidebar.',
      'On phones each comparison row stacks and carries its sensor name, so a long row cannot lose its label.',
    ],
    img: 'detail',
    alt: 'The sensor detail page: a header with the sensor name and manufacturer, a sticky row of tabs, and the technical specifications beneath.',
    cap: 'The detail page every other surface points at.',
  },

  // -------------------------------------------------------------------------
  open: {
    n: '08',
    title: 'What is still open',
    body: [
      'This is a designed and built prototype, not a tested product. Its open questions are about evidence rather than execution.',
    ],
    items: [
      'None of it has been through usability testing. Every decision in §03 and §04 is reasoned, and reasoning is not evidence.',
      'Whether four is the right cap for a comparison. It is the number the grid draws well; nobody has checked whether it is the number researchers want.',
      'Whether an “already has a transform” flag should appear while browsing, so a researcher can see which sensors are ready to use. That question came out of the process mapping, and still open there too.',
    ],
  },
}
