// ---------------------------------------------------------------------------
// ALL COPY FOR "MAPPING A RESEARCH DATA WORKFLOW" (SMARTER, part 3 of 3).
// Layout is in SmarterEhiePage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// Same shape rule as the other two: a label, a title, at most two short
// paragraphs, then cards, steps, bullets or a diagram. Never a wall.
//
// Written from the deliverables in `Desktop/UU/Aim 4/BPMN revised/Aim4_FINAL/`
// (nine BPMN files, the plain-language guide, the open-questions register) and
// from the record of the two EHIE Design Decisions meetings.
//
// TWO RULES THIS ONE FOLLOWS THAT THE OTHERS DO NOT.
//
// 1. NO NAMES. The work involved a real disagreement with real colleagues.
//    Everyone is referred to by role, and dates are used where a name would
//    otherwise be needed. This mirrors the rule Urvi set on the deliverables:
//    callouts cite dates, never people.
//
// 2. NO CLAIMED OUTCOMES. These diagrams were a starting point for a
//    discussion. Where that discussion changed something it says so; where it
//    is still running, it says that instead.
//
// TODO (Urvi): `metas` holds the placeholders, and §06 ends with the phase
// structure unresolved. If it has since been settled, that is the section to
// finish.
// ---------------------------------------------------------------------------

export const smarterEhie = {
  slug: 'smarter-ehie-process-map',

  hero: {
    title: 'Mapping a Research Data Workflow',
    sub: 'Two meeting transcripts and one tentative swimlane, turned into nine diagrams a research team could argue with precisely.',
  },

  stats: [
    { icon: 'diagram', v: '9', k: 'Diagrams, 00 to 08' },
    { icon: 'problem', v: '2', k: 'Meeting transcripts' },
    { icon: 'compare', v: '2', k: 'Routes through the workflow' },
    { icon: 'question', v: '6', k: 'Questions left open on purpose' },
  ],

  metas: [
    { icon: 'role', title: 'Role', v: 'TODO: your title on the project' },
    { icon: 'context', title: 'Context', v: 'TODO: team, client, funder' },
    { icon: 'clock', title: 'Duration', v: 'TODO: e.g. Aug to Sep 2026' },
    { icon: 'gears', title: 'Methods', v: 'Transcript analysis, BPMN, stakeholder review' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'The process existed in different versions, in different heads',
    lede: [
      'EHIE takes in what a researcher wants to measure and hands back a dataset they can analyse. SMARTER, the registry in the other two case studies, lives inside it.',
      'A diagram and a swimlane already existed, and two long design meetings had happened since. Neither artefact matched the meetings, and the meetings did not entirely match each other.',
    ],
    pullLabel: 'What was actually missing',
    pull: '“Not a diagram. One shared description that people could point at and disagree with precisely.”',
  },

  // -------------------------------------------------------------------------
  method: {
    label: '02. Approach',
    title: 'The transcripts are the source, not the old diagram',
    lede: [
      'The existing diagram was treated as one more opinion. Every step traces to something somebody said on 6 or 20 August, or to the swimlane from sitting with a researcher.',
      'That had a consequence: where the transcripts were vague, the diagram had to be vague and say so.',
    ],
    decisions: [
      { icon: 'diagram', t: 'Nine, not one', note: 'One overview, eight sub-processes', d: 'A single diagram is unreadable at the level of detail the arguments were about.' },
      { icon: 'context', t: 'Lanes are people and systems', note: 'Still an open choice', d: 'A lane is whoever does the work: a person, or a part of the system.' },
      { icon: 'problem', t: 'What does not exist is marked', note: 'Flagged in red', d: 'The workflow depends on components nobody has built or funded. A map that assumes them is a map of a system that does not exist.' },
    ],
  },

  // -------------------------------------------------------------------------
  guide: {
    label: '03. The Guide',
    title: 'Written for a research team, not for process analysts',
    lede: [
      'The diagrams shipped with a document that teaches its own notation: seven rules for reading any of the nine, a key, then every step numbered and written out in a sentence.',
    ],
    steps: [
      { t: 'Explanation beside the diagram', d: 'On a pane that pans and zooms, so you can read a step and look at it at once.' },
      { t: 'Click a step to highlight it', d: 'The text and the picture stay tied together rather than sitting in two places.' },
      { t: 'A chip for every sub-process', d: '“→ 07” makes the set read as one document rather than nine files.' },
    ],
    img: 'guide-top',
    alt: 'The opening of the plain-language guide: a sticky section nav, the title “How the Aim 4 workflow actually works”, seven numbered rules for reading the diagrams, and a key of pool colours and arrow types.',
    cap: 'The guide opens by teaching its own notation. Seven rules, then a key. No BPMN knowledge assumed.',
  },

  // -------------------------------------------------------------------------
  diagrams: {
    label: '04. The Set',
    title: 'One map, eight boxes that open',
    lede: [
      'Diagram 00 runs a study from conception to a delivered dataset across two pools. Everything else opens one of its boxes.',
    ],
    shots: [
      { img: 'd00-overview', alt: 'Diagram 00, the study lifecycle: a study-team pool above an EHIE pool, running from “study conceived” through planning, deployment, operations and aggregation to a delivered dataset, with a revision loop.', cap: '00 · The whole lifecycle. The study team’s lane is thin on purpose, and that asymmetry was itself a finding.' },
      { img: 'd01-planning', alt: 'Diagram 01, planning and design: the intake form, deciding which variables need sensors, browsing and comparing in SMARTER, verifying metadata, and finding or writing a transform for each sensor.', cap: '01 · Planning & Design, where SMARTER’s browse and compare flow is actually used.' },
      { img: 'd05-transforms', alt: 'Diagram 05, running transforms and assimilating: serving sensor metadata and transform logic, running transforms over raw readings, combining with clinical events and storing standardised events.', cap: '05 · Run transforms and assimilate. Every step here is currently a person doing it by hand.' },
      { img: 'd07-intake', alt: 'Diagram 07, the intake clarification loop: a back-and-forth between the researcher and the use-case navigator until the study goals are clear enough to build from.', cap: '07 · The intake loop. A conversation, drawn as a loop, because that is what it is.' },
      { img: 'd08-reentry', alt: 'Diagram 08, determining the re-entry point: working out how far back a rejected dataset has to go, to transforms, to aggregation, or to the study design.', cap: '08 · Where a rejected dataset re-enters. This one proposes an answer rather than recording one.' },
    ],
  },

  // -------------------------------------------------------------------------
  calls: {
    label: '05. Editorial Decisions',
    title: 'Most of the work was deciding what belonged in the picture',
    lede: [
      'Several of these were reversed after the first review.',
    ],
    items: [
      { t: 'Cut the granularity', d: 'A whole pass spent removing boxes. A map for a discussion carries the steps people will argue about and nothing else.' },
      { t: 'Every box gets a number and a sentence', d: 'If a box is worth drawing it is worth explaining. If it is not worth explaining it should not be drawn.' },
      { t: 'Dates, never names', d: 'Callouts cite “20 August”. A map circulated inside a team should not read as a record of who said what.' },
      { t: 'Cut the glossary', d: 'Written, reviewed, corrected, then deleted. A term that needs a glossary entry is the wrong term; the words were changed to the ones the transcripts use.' },
    ],
  },

  // -------------------------------------------------------------------------
  disagreement: {
    label: '06. When the Map Disagreed',
    title: 'A citation instead of two recollections',
    lede: [
      'Review proposed folding everything below study configuration into a single Operations phase, with no decision boxes in the overview.',
      'Part of that was right and was accepted: the overview is a container, not a decision aid, so the diamonds came out. Part contradicted what was agreed on 20 August.',
    ],
    question: {
      label: 'How it was resolved, and what is still open',
      body: 'Rather than re-arguing from memory, the 20 August transcript was searched for the exact exchange and the reply quoted it: here is what we agreed, here is where the proposal differs, happy to get on a call.',
      after: 'Still open. The diagrams hold the agreed structure, with the proposal recorded as a question rather than silently adopted or silently ignored.',
    },
  },

  // -------------------------------------------------------------------------
  open: {
    label: '07. Still Open',
    title: 'The six questions the diagrams do not answer',
    lede: [
      'These shipped as part of the deliverable rather than as a private list. A map that hides its own uncertainty is worse than no map, because it gets built.',
    ],
    items: [
      'How a researcher gets back to EHIE after choosing sensors. Analysts want an API, researchers want the interface, the team wants both.',
      'Whether lanes should be people and systems, or activities. Nobody has committed.',
      'Where the transform store lives: its own store, or inside EHIE’s general metadata registry.',
      'Which step a rejected dataset re-enters at. Diagram 08 proposes rather than records.',
      'Whether an “already has a transform” flag should show while browsing sensors.',
      'Who builds and funds fleet management, the one component the workflow depends on and nobody owns.',
    ],
  },
}
