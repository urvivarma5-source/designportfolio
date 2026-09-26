// ---------------------------------------------------------------------------
// ALL COPY FOR "MAPPING A RESEARCH DATA WORKFLOW" (SMARTER, part 3 of 3).
// Layout is in SmarterEhiePage.jsx; nothing below is styling. See DESIGN.md
// §4.13 and §11e.
//
// Same voice and shape rules as the other two: the Guide's register, first
// person, context before decisions, emphasis as { em } runs, and never more
// than two short paragraphs before the content breaks into structure.
//
// TWO RULES THIS ONE FOLLOWS THAT THE OTHERS DO NOT.
//
// 1. NO NAMES. This work involved a real disagreement with real colleagues.
//    Everyone is a role, and dates stand in where a name would otherwise go.
//    That mirrors the rule Urvi set on the deliverables themselves: callouts
//    cite dates, never people.
//
// 2. NO CLAIMED OUTCOMES. These diagrams were a starting point for an
//    argument, and the argument is what they produced. Where it changed
//    something it says so; where it is still running, it says that instead.
//
// `metas` is filled from Urvi's own account (2026-09-25). Note the role here
// is lead product designer only: the PM work she picks up is on the SMARTER
// product side, which is the other two case studies, not this workstream.
//
// Still outstanding: §06 ends with the phase structure unresolved. If it has
// since been settled, that is the section to finish.
// ---------------------------------------------------------------------------

export const smarterEhie = {
  slug: 'smarter-ehie-process-map',

  hero: {
    title: 'Mapping a Research Data Workflow',
    sub: [
      'Nobody on the team described the workflow the same way. ',
      { em: 'Nine diagrams' },
      ', built from two working sessions, gave everyone one version to work from.',
    ],
  },

  stats: [
    { icon: 'diagram', v: '9', k: 'Diagrams, 00 to 08' },
    { icon: 'problem', v: '2', k: 'Working sessions with the team' },
    { icon: 'compare', v: '2', k: 'Routes through the workflow' },
    { icon: 'question', v: '6', k: 'Questions left open on purpose' },
  ],

  metas: [
    { icon: 'role', title: 'My Role', v: 'Lead Product Designer' },
    { icon: 'context', title: 'Team', v: 'Seven of us: two PIs, a PM,\nthree engineers, and me' },
    { icon: 'clock', title: 'Duration', v: '4 months' },
    { icon: 'gears', title: 'Methods', v: 'Stakeholder sessions, BPMN, design review' },
  ],

  // -------------------------------------------------------------------------
  challenge: {
    label: '01. The Challenge',
    title: 'Everyone described the workflow differently',
    lede: [
      'EHIE is the platform a research study runs on. A researcher says what they want to measure, and months later it hands back a dataset they can analyse. SMARTER, the sensor registry from my other two case studies, lives inside it.',
      [
        'Everyone could describe how it worked, but no two people described it the same way. Two whiteboarding sessions had been held to settle it, and they produced ',
        { em: 'a third version nobody wrote down' },
        '.',
      ],
    ],
    pullLabel: 'What was missing',
    pull: '“The team did not need a diagram. It needed one description precise enough to argue with.”',
  },

  // -------------------------------------------------------------------------
  method: {
    label: '02. Approach',
    title: 'Starting from what the team actually said',
    lede: [
      'The existing diagram became one input rather than the baseline. Every step in the new set traces to something said in the August workshops, or to a session spent walking through a researcher’s week.',
      'Where the team had never agreed, that rule left the disagreement visible, so several boxes shipped with an open question attached.',
    ],
    decisions: [
      { icon: 'diagram', t: 'Nine, not one', note: 'An overview and eight sub-processes', d: 'One diagram of the whole lifecycle is unreadable at the level of detail people were arguing about. Nine lets the argument happen at the right zoom.' },
      { icon: 'context', t: 'Lanes are people and systems', note: 'Still an open choice', d: 'A lane is whoever does the work, whether that is a person or a part of the platform. Drawing lanes as activities instead is still on the table.' },
      { icon: 'problem', t: 'Flag what does not exist yet', note: 'Marked in red', d: ['The workflow leans on components nobody has built or funded. A map that quietly assumes them is a map of ', { em: 'a system that does not exist' }, '.'] },
    ],
  },

  // -------------------------------------------------------------------------
  guide: {
    label: '03. The Guide',
    title: 'A guide for people who do not read BPMN',
    lede: [
      'Almost nobody on the team reads BPMN, and a notation people have to decode is one they will skip.',
      'So the diagrams ship inside a document that teaches its own notation first: seven rules, a key, and every step numbered and written out as a plain sentence.',
    ],
    steps: [
      { t: 'Explanation beside the picture', d: 'On a pane that pans and zooms, so you can read a step and look at it at the same time.' },
      { t: 'Click a step to light it up', d: 'The words and the diagram stay tied together instead of sitting in two different places.' },
      { t: 'A chip on every sub-process', d: '“→ 07” turns nine separate diagrams into one document you can follow.' },
    ],
    img: 'guide-top',
    alt: 'The opening of the plain-language guide: a sticky section nav, the title “How the Aim 4 workflow actually works”, seven numbered rules for reading the diagrams, and a key of pool colours and arrow types.',
    cap: 'The guide starts by teaching its own notation. Seven rules, then a key, and no BPMN assumed.',
  },

  // -------------------------------------------------------------------------
  diagrams: {
    label: '04. The Set',
    title: 'One overview, and eight diagrams inside it',
    lede: [
      'Diagram 00 runs a study from first idea to delivered dataset across two pools. Every other diagram is one of its boxes, opened up.',
    ],
    shots: [
      { img: 'd00-overview', alt: 'Diagram 00, the study lifecycle: a study-team pool above an EHIE pool, running from “study conceived” through planning, deployment, operations and aggregation to a delivered dataset, with a revision loop.', cap: '00 · The whole lifecycle. The study team’s lane is thin, which is itself a finding.' },
      { img: 'd01-planning', alt: 'Diagram 01, planning and design: the intake form, deciding which variables need sensors, browsing and comparing in SMARTER, verifying metadata, and finding or writing a transform for each sensor.', cap: '01 · Planning & Design, which is where the browse and compare flow from the other case study actually gets used.' },
      { img: 'd05-transforms', alt: 'Diagram 05, running transforms and assimilating: serving sensor metadata and transform logic, running transforms over raw readings, combining with clinical events and storing standardised events.', cap: '05 · Running transforms. Every step on this one is currently a person doing it by hand.' },
      { img: 'd07-intake', alt: 'Diagram 07, the intake clarification loop: a back-and-forth between the researcher and the use-case navigator until the study goals are clear enough to build from.', cap: '07 · The intake loop: a back-and-forth until the study goals are clear enough to build from.' },
      { img: 'd08-reentry', alt: 'Diagram 08, determining the re-entry point: working out how far back a rejected dataset has to go, to transforms, to aggregation, or to the study design.', cap: '08 · Where a rejected dataset comes back in. This one proposes an answer rather than recording one.' },
    ],
  },

  // -------------------------------------------------------------------------
  calls: {
    label: '05. Editorial Decisions',
    title: 'What earned a place in the picture',
    lede: [
      'Deciding what belonged in the picture took longer than drawing it, and the first review changed several of these calls.',
    ],
    items: [
      { t: 'Cut the granularity', d: 'A whole pass went on removing boxes. A map for a discussion should carry the steps people will argue about, and nothing else.' },
      { t: 'Every box gets a number and a sentence', d: 'If a box is worth drawing it is worth explaining. If it is not worth explaining, it should not have been drawn.' },
      { t: 'Dates, never names', d: 'Callouts cite “20 August”. A map going round a team should not read as a record of who said what.' },
      { t: 'Cut the glossary', d: 'I wrote one, had it reviewed, corrected it, then deleted it. A term that needs a glossary entry is the wrong term, so the words changed to the ones the team already uses when they talk to each other.' },
    ],
  },

  // -------------------------------------------------------------------------
  disagreement: {
    label: '06. When the Map Disagreed',
    title: 'Going back to what we agreed',
    lede: [
      'Then the review came back, and it wanted diagram 00 rebuilt: fold everything below study configuration into a single Operations phase, and lose the decision boxes.',
      [
        'Half of that was plainly right and I took it straight away. The other half contradicted something I was fairly sure we had all agreed on, standing at a whiteboard, on 20 August. ',
        { em: 'Fairly sure is not sure' },
        '.',
      ],
    ],
    question: {
      label: 'How I handled it, and where it stands',
      body: 'So instead of re-arguing it from memory, I went back through the 20 August workshop, found the exact point where we had settled it, and quoted that back: here is what we agreed, here is where this proposal differs, happy to get on a call about it.',
      after: 'It is still open, and I would rather it stayed open than be closed by whoever remembered hardest. The diagrams hold the agreed structure with the proposal sitting beside them as a question.',
    },
  },

  // -------------------------------------------------------------------------
  open: {
    label: '07. Still Open',
    title: 'The six questions the diagrams hand on',
    lede: [
      'These went over with the diagrams rather than staying with me. A map that hides what it is unsure about is worse than no map, because sooner or later somebody builds it.',
    ],
    items: [
      'How a researcher gets back to EHIE after choosing sensors. Analysts want an API, researchers want the interface, and the team wants both.',
      'Whether lanes should be people and systems, or activities. Nobody has committed either way.',
      'Where the transform store actually lives: its own store, or inside EHIE’s general metadata registry.',
      'Which step a rejected dataset re-enters at. Diagram 08 proposes rather than records.',
      'Whether an “already has a transform” flag should show while you browse sensors.',
      'Who builds and funds fleet management, which is the one component the whole workflow leans on and nobody owns.',
    ],
  },
}
