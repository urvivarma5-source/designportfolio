// ---------------------------------------------------------------------------
// ALL COPY FOR "A LIBRARY YOU CAN COMPARE SENSORS IN" (SMARTER, part 2 of 3).
// Layout is in SmarterLibPage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// Same voice rules as smarterNav.js: the Guide's register, first person,
// context before decisions, emphasis as { em } runs. Same shape rules too: a
// label, a title, at most two short paragraphs, then structure.
//
// THIS IS THE ONE SMARTER CASE STUDY WITH REAL USER TESTING BEHIND IT.
// Three rounds on the library (internal team, then a six-person expert panel
// with SUS, then in-person interviews with sensor manufacturers at a
// conference booth), plus a separate internal round on the intake form with
// four domain experts. Sources: "Testing Protocol_gdoc-2.docx", "User
// Feedback_gdoc.docx" and "SMARTER- Testing , Qual Research with Sensor
// Developers _ Manufacturers.docx", supplied 2026-09-25.
//
// Because that testing exists, this study's work card is the only SMARTER one
// that carries `metrics`, and §10 no longer says nothing has been tested. The
// navigation and EHIE studies still have none, and theirs must stay empty.
//
// EVERY FIGURE BELOW IS FROM THE RESEARCH. The SUS score, the per-participant
// scores, the four task results and the quotes are transcribed, not rounded or
// improved. The 0% on task four is real and stays.
//
// `metas` is filled from Urvi's own account (2026-09-25), same as the other
// two. Still outstanding: the comparison screen in §04 is the grid's
// specification, so its cells read "Value". Swap in a filled export if one
// turns up.
// ---------------------------------------------------------------------------

export const smarterLib = {
  slug: 'smarter-sensor-library',

  hero: {
    title: 'A Library You Can Compare Sensors In',
    sub: [
      'Ninety environmental sensors, and a researcher who has to walk away with ',
      { em: 'four' },
      '. Browse, filter and comparison, on one component library.',
    ],
  },

  stats: [
    { icon: 'compare', v: '90', k: 'Sensors in the catalogue' },
    { icon: 'filter', v: '9', k: 'Categories' },
    { icon: 'states', v: '6', k: 'Sort options' },
    { icon: 'keyboard', v: '4', k: 'Responsive breakpoints' },
  ],

  metas: [
    { icon: 'role', title: 'My Role', v: ['Lead Product Designer,\n', { em: 'plus some of the PM work' }] },
    { icon: 'context', title: 'Team', v: 'Seven of us: two PIs, a PM,\nthree engineers, and me' },
    { icon: 'clock', title: 'Duration', v: '4 months' },
    { icon: 'gears', title: 'Methods', v: 'Component library, prototyping, accessibility pass' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'Three different jobs, not one catalogue',
    lede: [
      'Calling this "the catalogue" made it sound like one screen. Somebody planning an environmental study does three quite different things here, and only one of them is browsing.',
      [
        'Built as a single catalogue, the first job would have been easy and the other two ',
        { em: 'impossible' },
        '. Comparison is not browsing with extra columns, and submitting is not the detail page with the text boxes switched on.',
      ],
    ],
    jobs: [
      { icon: 'filter', t: 'Find', note: 'Browse and filter', d: 'Get ninety sensors down to a shortlist without ever hitting a dead end.' },
      { icon: 'compare', t: 'Judge', note: 'Compare four', d: 'Put the candidates side by side on the specifications that actually decide between them.' },
      { icon: 'problem', t: 'Add', note: 'Submit a sensor', d: 'Contribute one the catalogue is missing, with every field the detail page is going to show.' },
    ],
  },

  // -------------------------------------------------------------------------
  browse: {
    label: '02. Browse and Filter',
    title: 'A filter that cannot dead-end',
    lede: [
      'The first drawer greyed out any option that would have returned nothing, which felt tidy and helpful right up until someone in a review clicked one anyway and asked why it was there.',
      'It is a fair question. A greyed option still takes up room, still has to be read, and still invites the click it is about to refuse. So now an option with no matches simply is not drawn, one with matches carries its count, and a group with nothing left in it disappears.',
    ],
    decisions: [
      { t: 'It remembers where you were', d: ['Sort, category, query and every drawer filter live in the URL, and your scroll position and loaded cards come back with you from a detail page. Looking at one sensor should not cost you ', { em: 'the shortlist you just built' }, '.'] },
      { t: 'Nothing reloads', d: 'Clicking a filter used to blink, which felt like the page reloading every time you changed your mind. It now morphs in place against a keyed diff, scrolls only when it has to, and loads the images before it swaps anything in.' },
    ],
    shots: [
      { img: 'browse', alt: 'The sensor library: a left sidebar of browse-by categories, a search field, and a column of sensor cards with property tags and a Compare button on each.', cap: 'The library, filtered down to air quality. Properties sit on the card as tags, so you can scan the list without opening anything.' },
      { img: 'filter', alt: 'The filter drawer: grouped filter options, each with a count of matching sensors.', cap: 'Counts on every option, and the ones with nothing behind them are not drawn at all.' },
    ],
  },

  // -------------------------------------------------------------------------
  select: {
    label: '03. Selection',
    title: 'The same card has to do two different things',
    lede: [
      'Arrive at a card from the library and it opens the sensor. Arrive at the same card from the empty comparison page and it only selects. It reads like a footnote and it set the most intricate two weeks of the build.',
      'The card cannot announce which mode it is in without a badge on every tile, so everything below is about making the mode obvious from what happens when you touch it.',
    ],
    rules: [
      ['The tray shows up on the first pick', 'Not once you press Compare. You should watch the thing filling up while you fill it.'],
      ['A fifth sensor gets an error', 'Rather than quietly dropping one of your four, or building a comparison the grid cannot draw.'],
      ['There is a dead zone round the checkbox', ['A 64 px safety area that toggles selection and ', { em: 'never' }, ' opens the card. Clicking near a checkbox means the checkbox.']],
      ['Anything you remove can come back', 'Every removal puts an Undo in the toast, so a mis-click never costs you the shortlist you just built.'],
      ['Clear selection is a link, not a button', 'Two filled buttons sitting in one row would have read as two equally good ideas.'],
    ],
  },

  // -------------------------------------------------------------------------
  compare: {
    label: '04. Comparison',
    title: 'Four across, grouped by what is being measured',
    lede: [
      'This is the screen the whole library exists to get you to, so it gets the most furniture: sticky sensor headers, a switch that marks the cells that disagree, and a save so a shortlist outlives the browser tab.',
      'I built one feature here, demoed it, and then took it out again. Hide identical rows made the table considerably shorter and the comparison noticeably worse.',
    ],
    pullLabel: 'Why it came out again',
    pull: '“The rows where all four sensors agree are the reason you can trust the rows where they do not.”',
    img: 'compare',
    alt: 'The comparison dashboard: four sensor cards in a tray above a grouped table of measurement entities, with cells marked where values differ.',
    cap: 'The comparison template. The cells read “Value” because this is the specification for the grid rather than a filled export, including the case it exists to prove: a value that runs to two lines.',
  },

  // -------------------------------------------------------------------------
  system: {
    label: '05. The Component Library',
    title: 'Naming components so a developer can find them',
    lede: [
      'None of the above survives handover if a developer cannot find the piece they need, so I put every new component where somebody would think to look for it. The name gives the path first, then the variant, then the states it can be in.',
      [
        'Putting states in the name matters more than it sounds. Drawn as separate components instead, the library ',
        { em: 'doubles in size' },
        ' every time a row learns one new behaviour.',
      ],
    ],
    shots: [
      { img: 'comp-rows', alt: 'The navigator row component at three levels, station, module and sensor, each with its default, hover, selected and keyboard focus states.', cap: 'One row, three levels, four states each. The level is a variant rather than a component of its own.' },
      { img: 'comp-spec', alt: 'Data display components: a spec row whose value wraps, a stacked spec row, and an entity card whose title wraps.', cap: 'The three things long content does, drawn out rather than left for the build to discover.' },
      { img: 'comp-scope', alt: 'The scope header component at station, module and sensor level, each showing the breadcrumb path above the name.', cap: 'The scope header: the panel answering back, at each of the three levels.' },
      { img: 'comp-accordion', alt: 'The section accordion component in its collapsed and expanded states.', cap: 'Section accordion, closed and open.' },
    ],
  },

  // -------------------------------------------------------------------------
  submit: {
    label: '06. Adding a Sensor',
    title: 'The form and the detail page ask for the same things',
    lede: [
      'I built the form with the detail page open beside it, section by section, because the two drift apart the moment you stop looking. A form that collects something the catalogue cannot display produces data nobody reads, and a page with a field the form never asks about produces a blank that never fills in.',
    ],
    testedLabel: 'Tested separately, with four domain experts',
    tested: 'A walkthrough and think-aloud round on the form alone produced eighteen recommendations in six themes. The three biggest: people wanted a progress bar because they could not tell how much was left, they wanted open text fields turned into dropdowns so the data arrives clean, and they wanted the subjective terms defined. “Low cost” and “harsh conditions” mean different things to different researchers.',
    decisions: [
      { t: 'Save as you go', sub: 'Not all at the end', label: 'Why', body: 'Each section validates and saves on its own, with a progress bar across the whole form. A long intake you can only submit in one piece is a long intake people abandon.' },
      { t: 'Leaving asks first', sub: 'On the route and on unload', label: 'Why', body: '“Leave without saving?” catches a half-finished form whether you navigate away inside the app or close the tab on it.' },
      { t: 'The dropdowns are real components', sub: 'Keyboard and all', label: 'Why', body: 'A custom dropdown that traps a keyboard user is worse than the plain select it replaced, so this one takes arrow keys, Enter and Escape.' },
    ],
    img: 'intake',
    alt: 'The submit-a-sensor intake form: a breadcrumb, a progress indicator, and grouped fields with custom dropdowns and file upload slots.',
    cap: 'The intake form, mirroring the detail page section for section.',
  },

  // -------------------------------------------------------------------------
  access: {
    label: '07. Accessibility',
    title: 'Checked against finished flows, on purpose',
    lede: [
      'The accessibility pass ran at the end by design. Done early, it only checks what you planned for. Done against finished flows, it checks what you actually built.',
    ],
    items: [
      'Every clickable card and control is reachable by keyboard, with a focus ring you can see.',
      'Focus is trapped inside the drawer, the sort popover and every dialog, and goes back where it came from on close.',
      'Toasts are announced, and errors carry role="alert" and mark their own field invalid.',
      'There is a skip link, and prefers-reduced-motion is honoured throughout.',
      'Below 1024 px the browse-by sidebar becomes a drawer, because a sidebar sitting on top of the content has stopped being a sidebar.',
      'On phones each comparison row stacks and carries its sensor name, so a long row cannot lose track of what it belongs to.',
    ],
    img: 'detail',
    alt: 'The sensor detail page: a header with the sensor name and manufacturer, a sticky row of tabs, and the technical specifications beneath.',
    cap: 'The detail page that every other surface here is pointing at.',
  },

  // -------------------------------------------------------------------------
  testing: {
    label: '08. Testing',
    title: 'Two rounds in the lab, and a Grade A from the panel',
    lede: [
      'Everything above is an argument until somebody who did not build it tries to use it. The internal team went first, because that round is cheap and clears the obvious things before an expert has to sit through them.',
      'Then six subject matter experts, forty-five minutes each: fifteen on open exploration, twenty on four set tasks, ten on feedback and a System Usability Scale questionnaire.',
    ],
    rounds: [
      { t: 'The internal team', d: 'Run first, so the experts were not spending their time on typos and broken links.' },
      { t: 'Six expert panelists', d: 'Moderated and task-based, with SUS at the end. Scores ran from 85 to a perfect 100.' },
    ],
    stats: [
      { icon: 'eye', v: '90.4', k: 'Average SUS score, Grade A' },
      { icon: 'compare', v: '68', k: 'Industry average, for comparison' },
      { icon: 'context', v: '6', k: 'Expert panelists, scoring 85 to 100' },
      { icon: 'clock', v: '45', k: 'Minutes per session' },
    ],
    pullLabel: 'Where that sits',
    pull: '“Anything above 80.3 is a Grade A. The average system scores 68, so 90.4 puts the library well clear of the benchmark.”',
  },

  // -------------------------------------------------------------------------
  found: {
    label: '09. What Testing Found',
    title: 'Three tasks at 100%, and one the testing sent back',
    lede: [
      'The SUS score says people liked it. The task results say where the next sprint goes, which is the question that changes the build.',
    ],
    tasks: [
      ['Find a sensor', ['100%', ' · Filtering to indoor relative humidity, under $500, minimal participant interaction. ', { em: '“The filters are really good. I really like this.”' }]],
      ['Vet it in detail', ['100%', ' · Maintenance needs, quality grade, indoor suitability. Minor friction: people looked for “indoor” in the tabs, not the header.']],
      ['Compare three sensors', ['100%', ' · Side by side in the comparison tool. They asked for sensor images and clickable links in that view.']],
      ['Contribute missing data', ['0%', ' · Adding a transmission frequency to an existing entry. ', { em: '“I never saw that until you told me. Make it more prominent.”' }]],
    ],
    issues: [
      { t: 'Contribute belongs in the primary flow', d: 'Every participant went past the control. The contribution loop the catalogue runs on needs to sit in the path people already take, not beside it.' },
      { t: 'Banner blindness on the main nav', d: 'People scrolled straight past the top navigation, which is the same instinct that makes us ignore adverts.' },
      { t: 'Terminology needed definitions in place', d: 'Not a glossary somewhere else. Tooltips where the term is, for the words researchers each read differently.' },
      { t: 'Technical attributes were missing', d: 'Experts went looking for specifications the catalogue did not hold at all, which is a data model problem rather than an interface one.' },
    ],
    strengthsLabel: 'What held up',
    strengths: [
      'Every participant praised the visual design without being asked about it.',
      'Filtering was intuitive enough that nobody needed it explained.',
      'The side-by-side comparison worked, which was the riskiest thing in the build.',
      'Nobody needed technical support to operate the system.',
    ],
  },

  // -------------------------------------------------------------------------
  // The conference round. NOTE: the protocol for this one is written up in
  // "SMARTER- Testing , Qual Research with Sensor Developers _ Manufacturers.docx",
  // but its note-taking template and Notable Quotes section are still blank, so
  // there are no findings to report yet. This section therefore describes the
  // method and why the round existed, and says plainly that the results are not
  // in. Do not fill them in from the other rounds; different population,
  // different questions.
  booth: {
    label: '10. Taking It to the Manufacturers',
    title: 'Asking the people who would fill it in',
    lede: [
      'A catalogue is only as good as what people put into it, and everyone tested so far was a person who would read it. Nobody had asked the people whose instruments it describes whether they would fill it in.',
      'So the last round was thirty minutes at a conference booth, prototype open on a laptop, talking to sensor developers and hardware engineers between sessions.',
    ],
    asks: [
      { icon: 'question', t: 'What do you do today?', note: 'Current practice', d: 'How a new sensor gets documented now, and the most frustrating part of that. You cannot design a replacement for a process you have not heard described.' },
      { icon: 'compare', t: 'What would you hold back?', note: 'Sharing boundaries', d: 'Which fields they would publish openly, which they would keep private, and what draws that line. The honest answer decides what the catalogue can ever contain.' },
      { icon: 'context', t: 'What would earn your trust?', note: 'Barriers and skepticism', d: 'What would have to be true about who runs the platform and who controls the data, and how likely they are to contribute on a scale of one to five.' },
    ],
    note: 'Sessions were consented and anonymised, with a standing promise that no proprietary product information leaves the study. Compensation was a branded notebook, which is conference currency.',
    statusLabel: 'Where this round stands',
    status: 'The interviews have been run, but the notes are not written up yet, so there are no findings on this page. When they are, they belong here and nowhere else: this was a different population answering different questions, and folding the results into the panel numbers above would misrepresent both.',
  },

  // -------------------------------------------------------------------------
  open: {
    label: '11. Still Open',
    title: 'What the next round has to answer',
    lede: [
      'The 90.4 confirms the interface works. The 0% on Contribute is what sets the next round. Everything below is either a question the rounds raised or one they never got to.',
    ],
    items: [
      'Whether making Contribute prominent actually fixes it, or whether people simply do not expect a catalogue to be editable. That is a mental model problem, and it needs its own round.',
      'Whether four is the right cap for a comparison. It is the number the grid draws well, which is not the same as the number researchers want.',
      'What manufacturers will actually share. The booth round in §10 was built to answer exactly this, and its notes are still to be written up.',
      'Whether an “already has a transform” flag should show while you browse. That one came out of the process mapping and is still open there too.',
    ],
  },
}
