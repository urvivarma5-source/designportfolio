// ---------------------------------------------------------------------------
// ALL COPY FOR THE "FILLING CABINETS TO FINGERTIPS" CASE STUDY LIVES HERE.
// Transcribed from the Figma export (TCTD CASE STUDY.pdf) with
// tools/extract_case_study.py. Layout is in Tctd.jsx; nothing below is styling.
//
// Wording and punctuation are the artwork's own, with four deliberate
// exceptions, all of them marked FIXED below: three typos the export ships
// ("interdependant", "08:3", a stray second full stop) and one pair of labels
// the export copy-pasted onto the wrong card. Nothing else may be "corrected"
// silently while editing something else. See DESIGN.md §11b.
// ---------------------------------------------------------------------------

export const tctd = {
  slug: 'filling-cabinets-to-fingertips',

  hero: {
    title: 'Filling Cabinets to Fingertips',
    sub: "Digitizing a 40-year-old paper-based patient management system in a public hospital's specialty clinic",
  },

  overview: {
    eyebrow: 'Overview',
    heading: 'Research, methods and results',
    stats: [
      { icon: 'caduceus', value: '5', label: ['Specialists', 'Shadowed'] },
      { icon: 'calendar', value: '4', label: ['Weeks of Field', 'Research'] },
      { icon: 'eye', value: '112', label: ['Patient Visits', 'Observed'] },
      { icon: 'trophy', value: '78%', label: ['Faster Record', 'Retrieval'] },
    ],
    meta: [
      { icon: 'team', title: 'Team', lines: ['2 Design and Researchers', '2 Developers'] },
      { icon: 'duration', title: 'Duration', lines: ['5 Months'] },
      {
        icon: 'methods',
        title: 'Methods',
        lines: ['Shadowing, Contextual', 'Inquiry, Service Blueprints'],
      },
      { icon: 'role', title: 'My Role', lines: ['Lead: Design and', 'Research'] },
    ],
  },

  challenge: {
    num: '01. The Challenge',
    heading: "A filing cabinet couldn't scale to serve 80-120 patients daily",
    body: [
      // FIXED: the export spells this "interdependant".
      'A 2 part, interdependent, specialty department at a large public hospital served 80-120 patients daily using a paper-based system unchanged since the 80’s.',
      'Patient records lived in filing cabinets, appointments were tracked in handwritten registers, and the queue was managed through a rudimentary token system.',
    ],
    // `strong` marks the run inside `text` that is set bold.
    cards: [
      {
        icon: 'book',
        title: 'Fragmented Patient Records',
        note: 'Patient-maintained files',
        text: 'Each patient kept their own medical file at home. ',
        strong: 'If they forgot it or it got damaged, their entire history was lost, and no backup existed.',
      },
      {
        icon: 'search',
        title: 'Manual Queue Coordination',
        note: 'Hourly list handoffs',
        text: 'Every hour, someone ',
        strong: 'physically walked patient lists to the token caller.',
        tail: ' Each doctor had their own queue to manage.',
      },
      {
        icon: 'building',
        title: 'Siloed Departments',
        note: 'Zero cross-visibility',
        strong: "Department A couldn't see Department B’s records",
        tail: ' and vice versa, which is critical for patients with overlapping conditions.',
      },
    ],
    departments: [
      {
        title: 'Department A (Surgical)',
        note: 'Focused on procedures, surgeries, and post-op follow-ups',
        flow: [
          'New Patient',
          'History',
          'Investigation',
          'Follow-up',
          'Scans',
          'Procedure',
        ],
        issues: [
          'Patients traveling long distances only to be sent back',
          'No tracking of how many times a patient has followed up without resolution',
          'Appointments tracked in a color-coded spreadsheet (red = unreachable, green/yellow = completed)',
          'No reminders sent for post-procedure follow-ups',
        ],
      },
      {
        title: 'Department B (Medical)',
        note: 'Condition-specific OPD days, lab coordination',
        flow: [
          'Token',
          'Exam',
          'External Scans',
          'Follow-up',
          'Internal Lab Testing',
          'Report + Treatment',
        ],
        issues: [
          '3 consultation tables with inconsistent doctor availability',
          'Patients not assigned to same table for continuity (discontinued due to queue impatience)',
          'Miscommunication between lab, clerks, and doctors on appointment dates',
          'Different file colors for new vs. follow-up patients, but disorganized',
        ],
      },
    ],
    constraint: {
      label: 'The Non-Negotiable Constraint',
      quote: '"Any solution that slows down consultation time will not be adopted by the doctors."',
    },
  },

  research: {
    num: '02. Research Approach',
    heading: '4 weeks embedded in the clinic',
    body: 'Instead of running interviews, I became a fixture in both departments. I started and ended the day with clinic staff, and observed everything: the routines, the shortcuts, the workarounds that staff had developed over years of practice.',
    weeks: [
      { week: 'WEEK 1', title: 'Silent Observation', count: '12' },
      { week: 'WEEK 2', title: 'Artifact Documentation', count: '15' },
      { week: 'WEEK 3', title: 'Think-Aloud Sessions', count: '08' },
      { week: 'WEEK 4', title: 'Pattern Synthesis', count: '10' },
    ],
    countLabel: 'Visits Observed',
    methods: [
      {
        title: 'Shadowing',
        text: 'Followed 5 specialists through complete consultation cycles without interruption',
      },
      {
        title: 'Artifact Analysis',
        text: 'Photographed patient files, entry registers, token systems, spreadsheets, and form variations',
      },
      {
        title: 'Contextual Inquiry',
        text: 'Asked doctors and clerks to verbalize their process, especially around scheduling conflicts',
      },
      {
        title: 'Flow Mapping',
        text: 'Created detailed flow diagrams for both departments, identifying handoff points, breakdowns',
      },
    ],
  },

  system: {
    num: '03. Understanding the Existing System',
    heading: 'Mapping the patient journey',
    body: 'Before designing anything, we needed to understand exactly how patients moved through the system and what artifacts were involved at each step. My research revealed the following flow:',
    steps: [
      {
        icon: 'register',
        stage: 'REGISTRATION',
        artifact: 'Entry Register',
        // FIXED: the export truncates this to "08:3".
        text: 'Patients arrive at 08:30, writes name, date, and phone number. Tokens are given first come first serve.',
      },
      {
        icon: 'token',
        stage: 'TOKEN ASSIGNMENT',
        artifact: 'Table-Specific Queue',
        text: 'Token shows position in queue for a specific consultation table.',
      },
      {
        icon: 'waiting',
        stage: 'WAITING',
        artifact: 'Hourly List Handoff',
        text: 'Every hour, staff walks the patient list to the person calling tokens.',
      },
      {
        icon: 'consult',
        stage: 'CONSULTATION',
        artifact: 'Patient Brings File',
        text: 'Patient hands their file to the doctor. Notes are written on blank paper & added to file.',
      },
      {
        icon: 'followup',
        stage: 'FOLLOW UPS',
        artifact: 'Assigned by Many',
        // FIXED: the export ends this with a stray second full stop.
        text: 'Lab, clerks, and doctors each give patients different appointment dates.',
      },
    ],
  },

  findings: {
    num: '04. Key Research Findings',
    heading: 'The paper system was smarter than it looked',
    body: "My observations revealed that decades of daily use had shaped the paper system into something highly optimized for certain constraints, but brittle in ways that weren't obvious until we looked closely.",
    items: [
      {
        title: 'The "8:30am Problem"',
        text: [
          'All patients were given the same appointment time, 8:30am, when the hospital opened. This created extreme crowding that lasted until 5:30pm.',
          'There was no system to stagger appointments, predict daily load, or give patients a realistic arrival time.',
        ],
      },
      {
        title: 'Three Sources of Truth, Zero Alignment',
        text: [
          "Lab, clerks, and doctors each gave patients different appointment dates. The lab shouldn't have been scheduling at all, but patients asked, so they did.",
          'No one had visibility into what others had promised. Patients arrived on the "wrong" day and were turned away.',
        ],
      },
      {
        title: 'Patient History Had to Be Repeated Every Time',
        text: [
          'When patients saw a different doctor, they had to verbally repeat their entire medical history. No consolidated summary existed.',
          'Each visit started from scratch, wasting consultation time and risking missed information.',
        ],
      },
      {
        title: 'Transfers Happened Without Instructions',
        text: [
          'Patients were shifted from one department to another without clear guidance on what to do next, where to go, or what documents to bring.',
          'They wandered, asked around, and often ended up in the wrong queue',
        ],
      },
    ],
  },

  time: {
    num: '05. Time Study Results',
    heading: 'Where the time actually went',
    body: 'The data confirmed our hypothesis: consultation time was efficient; everything around it was not. Our design focused on compressing the before and after, not the consultation itself.',
    // `fill` is the share of the bar the accent occupies, 0–1.
    rows: [
      {
        label: 'REGISTRATION & TOKEN',
        value: '2–3 min',
        note: 'Entry register + token assignment',
        fill: 0.008,
      },
      {
        label: 'WAITING (ALL AT 8:30AM)',
        value: '1–8 hrs',
        note: 'No staggered scheduling: major bottleneck',
        fill: 1,
        peak: true,
      },
      {
        label: 'FILE REVIEW (NEW DOC)',
        value: '4–6 min',
        note: 'Patient repeats entire history',
        fill: 0.011,
      },
      {
        label: 'CONSULTATION',
        value: '6–10 min',
        note: 'Patient repeats entire history',
        fill: 0.026,
      },
      {
        label: 'SCHEDULING NEXT VISIT',
        value: '2–4 min',
        note: 'Conflicting dates from lab/clerk/doctor',
        fill: 0.008,
      },
      {
        label: 'QUEUE COORDINATION',
        value: '5 min / hr',
        note: 'Patient repeats entire history',
        fill: 0.023,
      },
    ],
  },

  strategy: {
    num: '06. Design Strategy',
    heading: "Translate, don't replace",
    body: 'Our insight: the paper system worked because of learned behaviors built over years. Rather than asking staff to learn a new system, we would translate the paper logic into digital form, preserving the cognitive patterns while eliminating the bottlenecks.',
    from: { title: 'Paper Behavior', note: 'How staff actually work' },
    link: { title: 'TRANSLATE', note: 'Preserve the logic' },
    to: { title: 'Digital Equivalent', note: 'Same mental model, faster' },
  },

  principles: {
    num: '07. Core Design Principles',
    heading: 'Four principles that guided every design decision',
    body: 'These principles emerged directly from our research findings; each one designed to structurally prevent a systemic failure we observed, not just improve it.',
    items: [
      {
        title: 'Design for the Exception',
        pain: 'Substitute doctors, lost files, cancelled slots, wasted trips; edge cases broke the system.',
        principle: 'Optimize for when things go wrong. Build fallbacks into every flow.',
      },
      {
        title: 'Visibility Over Communication',
        pain: "Doctors couldn't see other depts' notes. Clerks couldn't see what lab had promised.",
        principle:
          'Shared visibility replaces communication. Everyone sees it, miscommunication is  reduced.',
      },
      {
        title: 'Eliminate the Ability to Conflict',
        pain: 'Three people gave three different dates. Coordination failed constantly.',
        principle: "One calendar. One owner. The system doesn't allow contradictions.",
      },
      {
        title: 'Reduce Trips, Not Just Time',
        pain: 'Patients traveled hours only to be told "come back later." No warnings, no recourse.',
        principle: 'Realistic, data backed time slots. Proactive rescheduling, automated reminders.',
      },
    ],
    painLabel: 'Pain Point',
    principleLabel: 'Principle',
    framing: {
      label: 'How this Shaped the Design Process',
      lead: 'These four principles gave us a decision-making framework for every feature debate. When in doubt, we asked:',
      quote:
        '“Does this prevent conflicts, increase visibility, handle exceptions, or reduce unnecessary trips?”',
    },
  },

  translations: {
    num: '08. Key Design Translations',
    heading: 'Paper patterns → Digital features',
    body: 'Staff recognized their workflows in the new system, preserving the logic while eliminating the bottlenecks.',
    items: [
      {
        id: 'status',
        title: 'Status Tracking',
        before: { title: 'Color-coded Excel', note: 'Inconsistent meanings' },
        after: { title: 'Unified status system', note: 'Auto-updated, shared legend' },
        legend: [
          { label: 'Confirmed', count: '2', tone: 'green' },
          { label: 'Unreachable', count: '3', tone: 'red' },
          { label: 'Pending', count: '8', tone: 'amber' },
        ],
      },
      {
        id: 'scheduling',
        title: 'Appointment Scheduling',
        before: { title: 'Same time, all patients', note: '9-hour wait times' },
        after: { title: 'Staggered time slots', note: 'Predictable wait times' },
        crowd: { time: '8:30 AM', note: 'Everyone arrives together' },
        head: ['TIME', 'SLOTS'],
        slots: [
          { time: '9:00', dots: 4 },
          { time: '10:00', dots: 3 },
          { time: '11:00', dots: 5 },
        ],
      },
      {
        id: 'records',
        title: 'Patient Records',
        before: { title: 'Patient-maintained file', note: 'No backup exists' },
        after: { title: 'Unified status system', note: 'Auto-updated, shared legend' },
        paper: 'Patient maintained files can be lost or forgotten',
        uid: 'UID: 2024-0847',
        synced: 'Synced',
      },
      {
        id: 'reminders',
        title: 'Appointment Reminders',
        // FIXED: the export copy-pastes the Patient Records card's labels onto
        // this one, where they contradict its own artwork. These two are taken
        // from the card's own panels.
        before: { title: 'No reminder system', note: 'Nothing sent between visits' },
        after: { title: 'Automated reminders', note: 'Confirm or reschedule by reply' },
        paper: { title: 'No reminders sent', note: 'High no-show rate' },
        message: 'Reminder: Appointment tomorrow at 10:30 AM',
        reply: 'Reply with “YES” to confirm, with “NO” to reschedule',
      },
      {
        id: 'cross-dept',
        title: 'Cross-Department Visibility',
        before: { title: 'Siloed departments', note: 'Repeat history at each department' },
        after: { title: 'Unified patient view', note: 'Full history, any department' },
        paper: 'No shared records',
        patient: 'Patient #2024-0847',
        depts: [
          { name: 'Dept A', visits: '3 visits', last: 'Last: 12 Dec', tone: 'blue' },
          { name: 'Dept B', visits: '5 visits', last: 'Last: 18 Dec', tone: 'violet' },
        ],
      },
      {
        id: 'queue',
        title: 'Queue Management',
        before: { title: 'Hourly list handoff', note: 'Manual queue sync' },
        after: { title: 'Real-time queue display', note: 'Instant updates, no handoffs' },
        paper: { title: 'Every hour', note: 'Changes lag behind' },
        serving: 'Now serving: #14',
        queue: ['#15 - Waiting (2 min)', '#16 - Waiting (8 min)', '#17 - Waiting (12 min)'],
      },
    ],
    result: {
      label: 'The Result',
      lead: 'Result: Staff could use the system on day one because it mirrored their existing mental models.',
      note: 'Patients received confirmations and reminders automatically. Cross-department visibility became instant instead of impossible.',
    },
  },

  outcomes: {
    num: '09. Outcomes & Impact',
    heading: 'Measured results after 6 weeks',
    body: 'Estimated impact based on observed improvements during pilot rollout.',
    compare: [
      {
        cols: [
          { head: 'BEFORE', value: '~8 mins' },
          { head: 'AFTER', value: '~3.2 mins', accent: true },
        ],
        label: 'Average check-in time per patient',
      },
      {
        single: { value: '0 seconds', note: 'added to consultation' },
        label: 'Core constraint met: doctors saw no slowdown',
      },
      {
        cols: [
          { head: 'ESTIMATED', value: '2 weeks' },
          { head: 'ACTUAL', value: '5 days', accent: true },
        ],
        label: 'Time to staff proficiency',
      },
    ],
    quad: [
      { value: '~60%', label: ['reduction in "wrong day"', 'arrivals'] },
      { value: '~35%', label: ['reduction in wasted trips', '(long-distance patients)'] },
      { value: '~40 hrs', label: ['saved per month in manual', 'queue coordination'] },
      { value: '100%', label: ['cross-department', 'visibility (from 0%)'] },
    ],
    headline: [
      {
        value: '~3 hr',
        title: 'Reduction in average wait time',
        note: 'Staggered scheduling vs. 8:30am crush',
        bar: { fill: 0.3, note: 'est. 70% shorter' },
      },
      {
        value: '~70%',
        title: 'Reduction in repeat history-taking',
        note: 'Unified patient records across departments',
      },
    ],
    trio: [
      { value: '1,847', label: ['patient records digitized', 'in 2 months'] },
      { value: '4.2/5', label: ['staff satisfaction score', '(n=12 staff surveyed)'] },
      { value: '0', label: ['hourly list handoffs needed', 'fully automated queue sync'] },
    ],
  },

  reflections: {
    num: '10. Reflections & Learning',
    heading: 'What this project taught me',
    body: "Four principles I'll carry into every future project.",
    items: [
      {
        title: 'Watch Before You Ask',
        text: [
          'Doctors said "the software is too complicated."',
          'Observation revealed the real problems: conflicting appointment dates, no reminders, no cross-department visibility, wasted patient trips.',
        ],
        takeaway: 'Stated problems rarely reveal root causes.',
      },
      {
        title: 'Preserve the Logic, Fix the Gaps',
        text: [
          "Staff had invented color-coded tracking, table assignments, and hourly handoff rituals over decades. These weren't inefficiencies; they were solutions to real constraints.",
        ],
        takeaway: 'Legacy systems encode hard-won knowledge. Extract before rebuilding.',
      },
      {
        title: 'Design Out the Problem',
        text: [
          "The biggest pain point was conflicting dates from lab, clerks, and doctors. The fix wasn't better coordination training; it was removing the ability to create conflicts. One calendar, one owner, one answer.",
        ],
        takeaway: 'If a mistake is possible, it will happen. Remove possible points of friction instead.',
      },
      {
        title: 'Measure What Matters to Patients',
        text: [
          'We could have celebrated faster check-ins. But the real win was preventing a 6-hour trip for nothing. The metrics that matter aren\'t always the ones easiest to measure.',
        ],
        takeaway: 'Efficiency inside the building means little if the journey there is broken.',
      },
    ],
  },
}
