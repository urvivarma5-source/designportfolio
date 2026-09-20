// ---------------------------------------------------------------------------
// ALL COPY FOR "MAPPING A RESEARCH DATA WORKFLOW" (SMARTER, part 3 of 3).
// Layout is in SmarterEhiePage.jsx; nothing below is styling. See DESIGN.md
// §11e.
//
// Written, not transcribed, like the other two SMARTER case studies. The facts
// come from the deliverables in `Desktop/UU/Aim 4/BPMN revised/Aim4_FINAL/`:
// nine BPMN files, the plain-language guide, the open-questions register. It
// also draws on the record of the two EHIE Design Decisions meetings the
// work was built from.
//
// TWO RULES THIS ONE FOLLOWS THAT THE OTHERS DO NOT.
//
// 1. NO NAMES. The work involved a real disagreement with real colleagues, and
//    some of it is quoted here. Everyone is referred to by role ("the
//    principal investigator", "the team"), and dates are used where a name
//    would otherwise be needed. This mirrors the rule Urvi set on the
//    deliverables themselves: callouts cite dates, never people.
//
// 2. NO CLAIMED OUTCOMES. These diagrams were a starting point for a
//    discussion, and the discussion is what they produced. Where that
//    discussion changed something, it says so; where it is still running, it
//    says that instead.
//
// TODO (Urvi):
//   1. `hero.meta`: role, context and dates.
//   2. §06 ends with the phase-structure disagreement unresolved. If it has
//      since been settled, that is the section to finish.
// ---------------------------------------------------------------------------

export const smarterEhie = {
  slug: 'smarter-ehie-process-map',

  hero: {
    eyebrow: 'SMARTER · Service & process design',
    title: 'Mapping a research data workflow',
    sub: 'Two meeting transcripts, one tentative swimlane, and a team that did not yet agree on what happens after a study is conceived. Nine diagrams, built to be argued with.',
    meta: [
      { k: 'Role', v: 'TODO: your title on the project' },
      { k: 'Context', v: 'TODO: team, client, funder' },
      { k: 'Dates', v: 'TODO: e.g. Aug to Sep 2026' },
      { k: 'Shipped', v: 'Nine BPMN diagrams, a plain-language guide, an editable draw.io set and an open-questions register' },
    ],
  },

  // -------------------------------------------------------------------------
  brief: {
    n: '01',
    title: 'The process existed. It just existed in different versions, in different heads.',
    body: [
      'EHIE is the platform a research study runs on: it takes in what a researcher wants to measure and hands back a dataset they can analyse. SMARTER, the sensor registry in the other two case studies, lives inside it.',
      'There was already a BPMN diagram and a swimlane sketch, and two long design meetings had happened since. Neither artefact matched what had been said in those meetings, and the meetings did not entirely match each other. What was missing was not a diagram; it was one shared description that people could point at and disagree with precisely.',
    ],
    stats: [
      { v: '9', k: 'Diagrams, 00 – 08' },
      { v: '2', k: 'Meeting transcripts' },
      { v: '2', k: 'Routes: prospective and retrospective' },
      { v: '6', k: 'Questions left open on purpose' },
    ],
  },

  // -------------------------------------------------------------------------
  method: {
    n: '02',
    title: 'Reading the transcripts as the source, not the diagram',
    body: [
      'The existing diagram was treated as one more opinion rather than as the baseline. Every step in the new set traces to something somebody actually said in the 6 August or 20 August meeting, or to the swimlane that came out of sitting with a researcher and walking through how they work today.',
      'That had one immediate consequence: where the transcripts were vague, the diagram had to be vague too, and say so. Steps that nobody had settled were drawn as steps with a question attached, rather than resolved quietly in the drawing so the picture would look finished.',
    ],
    decisions: [
      {
        t: 'Nine diagrams, not one',
        d: 'One overview and eight sub-processes it opens into. A single diagram of the whole lifecycle is unreadable at the level of detail the arguments were actually about; nine lets a discussion happen at the right zoom.',
      },
      {
        t: 'Lanes are people and systems',
        d: 'A lane is whoever does the work: a person (“EHIE analyst”) or a part of the system (“Transform store”). Drawing lanes as activities instead was seriously considered and remains an open question; the set is internally consistent, which is what mattered for a first reading.',
      },
      {
        t: 'What does not exist yet is marked',
        d: 'The workflow depends on components nobody has built or funded. Those are drawn, flagged in red, and listed. A process map that quietly assumes them is a map of a system that does not exist.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  guide: {
    n: '03',
    title: 'A guide for people who do not read BPMN',
    body: [
      'The audience was a research team, not process analysts. So the diagrams shipped with a document that explains them in plain language: seven rules for reading any of the nine, a key, and then every step numbered and written out in a sentence.',
      'The layout is the point. The explanation sits beside the diagram rather than under it, on a pane that pans and zooms, so you can read a step and look at it at the same time. The first version put the text above the picture and the whole thing was unusable at the size these diagrams need.',
      'Clicking a step highlights it in the diagram. Anything with its own sub-process carries a chip, “→ 07”, so the set reads as one document rather than nine files.',
    ],
    img: 'guide-top',
    alt: 'The opening of the plain-language guide: a sticky section nav, the title “How the Aim 4 workflow actually works”, seven numbered rules for reading the diagrams, and a key of pool colours and arrow types.',
    cap: 'The guide opens by teaching its own notation. Seven rules, then a key. No BPMN knowledge assumed.',
  },

  // -------------------------------------------------------------------------
  diagrams: {
    n: '04',
    title: 'The set',
    body: [
      'Diagram 00 is the map. A study runs from conception to a delivered dataset across two pools, the study team and EHIE. Everything else opens one of its boxes.',
    ],
    shots: [
      {
        img: 'd00-overview',
        alt: 'Diagram 00, the study lifecycle: a study-team pool above an EHIE pool, running from “study conceived” through planning, deployment, operations and aggregation to a delivered dataset, with a revision loop.',
        cap: '00 · The whole lifecycle. The study team’s lane is thin on purpose. Most of the work is EHIE’s, and that asymmetry was itself a finding.',
      },
      {
        img: 'd01-planning',
        alt: 'Diagram 01, planning and design: the intake form, deciding which variables need sensors, browsing and comparing in SMARTER, verifying metadata, and finding or writing a transform for each sensor.',
        cap: '01 · Planning & Design, where SMARTER’s browse and compare flow is actually used.',
      },
      {
        img: 'd05-transforms',
        alt: 'Diagram 05, running transforms and assimilating: serving sensor metadata and transform logic, running transforms over raw readings, combining with clinical events and storing standardised events.',
        cap: '05 · Run transforms and assimilate. Every step here is currently a person doing it by hand.',
      },
      {
        img: 'd07-intake',
        alt: 'Diagram 07, the intake clarification loop: a back-and-forth between the researcher and the use-case navigator until the study goals are clear enough to build from.',
        cap: '07 · The intake loop. A conversation, drawn as a loop, because that is what it is.',
      },
      {
        img: 'd08-reentry',
        alt: 'Diagram 08, determining the re-entry point: working out how far back a rejected dataset has to go: to transforms, to aggregation, or to the study design.',
        cap: '08 · Where a rejected dataset re-enters. This diagram proposes an answer to a question the team had not settled.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // The section that makes this a design case study rather than a drawing job.
  calls: {
    n: '05',
    title: 'The editorial decisions',
    body: [
      'Most of the work was not drawing. It was deciding what belonged in the picture at all, and several of those calls were reversed after the first review.',
    ],
    items: [
      {
        t: 'Cut the granularity',
        d: 'The first set had steps nobody needed. A process map for a discussion should carry the steps people will argue about and nothing else, so a whole pass was spent removing boxes rather than adding them.',
      },
      {
        t: 'Every box gets a number and a sentence',
        d: 'Unnumbered boxes had crept in, and each one was a step with no plain-language explanation beside it. If a box is worth drawing it is worth explaining; if it is not worth explaining it should not be drawn.',
      },
      {
        t: 'Dates, never names',
        d: 'Callouts cite “20 August” rather than a person. A process map circulated inside a team should not read as a record of who said what.',
      },
      {
        t: 'Cut the glossary',
        d: 'A glossary was written, reviewed, corrected and then deleted. If a term needs a glossary entry to be understood in the diagram, the diagram should use a different term. The terms were changed to the ones the transcripts actually use.',
      },
      {
        t: 'Plain words',
        d: 'Editorial notes asked for “wildly” and similar to come out. The register is deliberately flat: these diagrams get read by people deciding whether they are wrong, and colour in the prose reads as advocacy.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // The disagreement, told straight.
  disagreement: {
    n: '06',
    title: 'When the map disagreed with a reviewer',
    body: [
      'Review came back proposing a different phase structure for diagram 00: everything from study configuration downwards folded into a single Operations phase, with no decision boxes in the overview.',
      'Part of that was plainly right and was accepted: the overview is a container for sub-processes, not a decision aid, so the decision diamonds came out. Part of it contradicted what the team had agreed in the 20 August meeting, where Deployment was to stand as its own phase alongside Planning & Design, Operations, and Aggregation & Provision.',
    ],
    // The method is the point here, not who was right.
    method: {
      label: 'How it was resolved',
      body: 'Rather than re-arguing it from memory, the 20 August transcript was searched for the exact exchange, and the reply quoted it: here is what we agreed, here is where the proposal differs, happy to get on a call. The disagreement became a citation instead of two recollections.',
      after: 'Still open at the point this case study was written. The diagrams hold the agreed structure, with the proposal recorded as a question rather than silently adopted or silently ignored.',
    },
  },

  // -------------------------------------------------------------------------
  open: {
    n: '07',
    title: 'The six questions the diagrams do not answer',
    body: [
      'These shipped as part of the deliverable rather than as a private list. A process map that hides its own uncertainty is worse than no map, because it gets built.',
    ],
    items: [
      'How a researcher gets back to EHIE after choosing sensors: a redirect, an API call, or a saved list fetched by ID. Analysts want the API, researchers want the interface, and the team wants both. The largest unresolved item.',
      'Whether lanes should be people and systems, or activities. The set uses people and systems; nobody has committed.',
      'Where the transform store actually lives: its own store, or inside EHIE’s general metadata registry.',
      'Which step a rejected dataset re-enters at. Diagram 08 proposes an answer rather than recording one.',
      'Whether an “already has a transform” flag should show while browsing sensors, so a researcher can see which are ready to use. This is a SMARTER interface question that the process mapping surfaced.',
      'Who builds and funds fleet management: the one component the whole workflow depends on and nobody owns.',
    ],
  },
}
