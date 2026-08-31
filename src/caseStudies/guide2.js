// ---------------------------------------------------------------------------
// ALL COPY FOR "GUIDE APP: BUILDING A ROBUST SEARCH AND TRACK EXPERIENCE"
// (PART 2). Transcribed from the Figma export ("guide part 2.pdf") with
// tools/extract_case_study.py. Layout is in Guide2Page.jsx; nothing below is
// styling. See DESIGN.md §11c.
//
// Emphasis works exactly as in guide1.js: a value is a string, or an array
// whose members are strings and { em } objects.
//
// Wording and punctuation are the artwork's own, with the typos listed below
// fixed and marked FIXED. Nothing else may be "corrected" silently while
// editing something else. See DESIGN.md §11b.
//
//   FIXED  "keyworsd"                 -> "keywords"
//   FIXED  "Fo which content"         -> "For which content"
//   FIXED  "feel feel pressured"      -> "feel pressured"
//   FIXED  "Facillitator"             -> "Facilitator"
//   FIXED  "= Patient Quote (C)"      -> "= Patient Quote (P)"   (patient 1.1)
//
// TWO THINGS IN THE EXPORT ARE NOT TYPOS AND ARE NOT INVENTED HERE:
//
//   * `prototypes` below have no URL. The export renders both CTAs as flat
//     artwork, so the Figma prototype links are simply not in the file. They
//     render as marked placeholders until the real URLs exist — DESIGN.md §12.
//   * `future[1]` and `future[2]` carry `todo: true`. All three Future
//     Implementation cards ship the *same* Calendar Integration paragraph in
//     the export, which is a copy-paste in the source. Their headings are
//     real; their copy is not written yet, and inventing it here would be
//     putting words in the author's mouth.
// ---------------------------------------------------------------------------

export const guide2 = {
  slug: 'search-experience-for-guide-2',

  hero: {
    lead: 'Guide App:',
    title: 'Building a Robust Search and Track Experience',
    sub: 'Designing a search and tracking experience for learning platform that keeps patients engaged between therapy sessions.',
  },

  pivot: {
    kicker: 'SCREEECH..! PROJECT PIVOT!',
    body: [
      [
        'Halfway through our project, our client had a complete change of heart. What started as a "TikTok for Business" style learning platform for corporate training videos ',
        { em: 'transformed into a therapy companion app.' },
      ],
      [
        'The client decided to pivot entirely, ',
        { em: 'reimagining Guide as a tool for therapists to keep their patients engaged between sessions' },
        ' instead of helping HR teams manage training content.',
      ],
      [{ em: 'Talk about a dramatic plot twist in the development journey! This called for:' }],
    ],
    cards: [
      {
        icon: 'team',
        title: 'Research Redo',
        text: 'Start fresh by diving into the world of therapists, patients and the tools they use.',
      },
      {
        icon: 'team',
        title: 'Team Refocus',
        text: 'Our team pivoted on a dime, swiftly embracing the new direction to build a platform that helps people heal.',
      },
    ],
    rally: {
      title: 'When the going gets tough, the tough get going!',
      body: [
        'The team ',
        { em: 'SWIFTLY shifted gears' },
        ' and with all hands on deck, we powered on, full steam ahead!\nI even got ',
        { em: '4 interviews done and dusted in a single day!' },
      ],
    },
  },

  meta: [
    {
      icon: 'team',
      title: 'Team',
      lines: [['We stand ', { em: '6' }, ' strong!']],
      note: 'A diverse mix of engineers, architects and marketing professionals, with a fantastic sense of humor!',
    },
    {
      icon: 'duration',
      title: 'Duration',
      lines: ['3 Months'],
      note: '2 Sprints',
    },
    {
      icon: 'tools',
      title: 'Tools',
      lines: [
        ['The Usual Suspects:'],
        [{ em: 'Figma, Miro, Illustrator' }],
        [' '],
        ['Fresh Faces:'],
        [{ em: 'ChatGPT, ClaudeAI' }],
      ],
    },
    {
      icon: 'role',
      title: 'My Role',
      // FIXED: the export spells the second line "Testing Facillitator".
      lines: [[{ em: '1. Lead: Design and Research' }], ['2. Testing Facilitator'], ['3. Project Manager']],
    },
  ],

  overview: {
    kicker: 'How does Guide work?',
    title: ['Project', 'Overview'],
    body: [
      [
        'Guide is a digital platform bridging the gap between therapy sessions by allowing mental health providers to ',
        { em: 'share and track personalized content for their clients.' },
      ],
      [
        'By extending care beyond session rooms, Guide ',
        { em: 'creates a continuous treatment experience' },
        ' that improves outcomes and gives providers valuable insights into client progress.',
      ],
    ],
    problemTitle: 'Problem Statement',
    problem: [
      [
        'Mental health providers ',
        { em: 'lack effective tools to maintain patient engagement between sessions.' },
        ' Without a streamlined way to ',
        { em: 'share content and track completion' },
        ', therapy effectiveness suffers.',
      ],
      [
        'Patients experience uncertainty about their between-session work and ',
        { em: 'have no structured way to demonstrate engagement.' },
        ' This gap in care continuity reduces treatment effectiveness for both providers and patients.',
      ],
    ],
    audienceTitle: 'Target Audience',
    audience: [
      [
        { em: 'Guide’s stakeholders/ client' },
        ' aim to enhance therapy outcomes by extending engagement beyond sessions.',
      ],
      [
        { em: 'Therapists/ Mental Health Providers' },
        ' need simple tools to assign content and track patient progress without adding to their workload.',
      ],
      [
        { em: 'Patients/ Users' },
        ' seek clarity and structure in their between-session journey to stay engaged and supported.',
      ],
    ],
  },

  timeline: {
    title: '🕰️ Project Timeline',
    // `tone` picks the panel fill: the artwork paints sprints 1–2 grey and the
    // later two on the tint, and only the later two are dashed.
    phases: [
      {
        label: 'Sprint 1 & 2',
        tone: 'grey',
        steps: [
          {
            head: '🗺️Map',
            sprint: 'Sprint 1',
            items: ['Validate assumptions', 'Develop HMW questions', 'Prioritize key focus areas'],
          },
          {
            head: '🎨Sketch',
            sprint: 'Sprint 2',
            items: ['Generate quick design concepts', 'Refine best ideas'],
          },
          {
            head: '📝Decide',
            sprint: 'Sprint 2',
            items: ['Critique sketches', 'Identify focus for prototypes'],
          },
          {
            head: '💻Prototype',
            sprint: 'Sprint 2',
            items: [
              'Develop iteration 1 prototype',
              'Test across target users',
              'Identify refinements',
            ],
          },
        ],
      },
      {
        label: 'Sprint 3 & 4',
        tone: 'band',
        steps: [
          {
            head: '🔍Research',
            sprint: 'Sprint 3',
            items: ['User/Expert Interviews', 'AI Simulated Research', 'Feature Analysis'],
          },
          {
            head: '✍️Design & Test',
            sprint: 'Sprint 4',
            items: ['Apply research insights', 'Gather Possible Users', 'Test our Hi-Fi designs'],
          },
        ],
      },
      {
        label: 'Sprint 5',
        tone: 'band',
        steps: [
          {
            head: '',
            sprint: 'Sprint 5',
            items: [
              'Incorporate feedback',
              'Final design iterations',
              'Project documentation',
              'Knowledge transfer',
            ],
          },
        ],
      },
    ],
  },

  users: {
    kicker: 'How did we discover user needs and current solutions?',
    title: ['Understanding', 'Our Users'],
    strategyLabel: 'Interview Strategy:',
    strategyRest: ' Conducted in-depth interviews with:',
    rows: [
      {
        icon: 'users',
        title: '6 Users',
        items: [
          '3 Primary care providers',
          '2 Occupational therapists ',
          '1 Psychologist with 37 yrs exp.',
        ],
      },
      {
        icon: 'areas',
        title: 'Key Areas Explored',
        items: [
          'Patient engagement between sessions',
          'Resource management and sharing workflows',
          'Content assignment and tracking',
          'Treatment plan implementation',
          'Documentation processes',
        ],
      },
    ],
    questionsLabel: 'Key Questions:',
    questionsRest: ' Asked participants about:',
    questions: [
      {
        icon: 'factors',
        title: 'Factors prioritized',
        // FIXED: the export reads "Fo which content to share".
        text: 'For which content to share (based on diagnosis, time commitment, complexity)',
      },
      {
        icon: 'preferences',
        title: 'Preferences for',
        text: 'Tracking whether patients engaged with shared resources',
      },
      {
        icon: 'strategies',
        title: 'Strategies to',
        text: 'Find and evaluate mental health resources for patients',
      },
    ],
  },

  findings: {
    title: ['Key Research', 'Findings'],
    cards: [
      {
        icon: 'categorize',
        title: 'Providers Need Content Categorization',
        text: 'Mental health professionals prefer resources organized around categories like diagnoses, duration to cater to specific patient needs.',
        quotes: [
          [
            '"I start by ',
            { em: 'categorizing resources by diagnosis' },
            ' to find relevant treatments." (P1-21)',
          ],
          [
            '"A search tool should have ',
            { em: 'filters based on diagnosis, levels, and duration.' },
            '" (P3c-126)',
          ],
        ],
      },
      {
        icon: 'direct',
        title: 'Direct Access Increases Engagement',
        text: "Patients are more likely to use resources when they're provided with direct links rather than general suggestions that require additional effort.",
        quotes: [
          [
            '"Verbally suggesting resources rarely worked—',
            { em: 'patients need direct links' },
            ' because searching on their own is too much effort." (P1-17)',
          ],
          [
            '"Patients express interest but ',
            { em: 'rarely follow through without direct links' },
            ' to resources." (P1-65)',
          ],
        ],
      },
      {
        icon: 'adhoc',
        title: 'Resource Management Is Largely Ad Hoc',
        text: 'Providers lack systematic approaches to organizing, tracking, sharing mental health resources, instead relying on informal personal collections and memory.',
        quotes: [
          [
            '"I have ',
            { em: 'no standardized system for resources' },
            '—just my own curated collection of materials that have worked for patients." (P1-13)',
          ],
          [
            '"My resource organization is a ',
            { em: 'mix of email bookmarks and memory—not efficient,' },
            " but I've adapted to find what I need.\" (P1-19)",
          ],
        ],
      },
    ],
  },

  featureAnalysis: {
    kicker: 'Feature Analysis',
    whyTitle: 'Why a Feature Analysis?',
    why: [
      [
        'To identify and document ',
        { em: 'industry-standard features' },
        ', providing us with ',
        { em: 'clear benchmarks' },
      ],
      ['To discover ', { em: 'feature gaps' }, ' in the current market that can inspire our UVP.'],
    ],
    title: 'Feature Analysis',
    products: {
      icon: 'products',
      title: 'What Products did we look at?',
      left: ['1. TherapistAid', '2. carepatron.com', '3. Psychology Tools'],
      right: ['4. Talk Space', '5. Amwell'],
    },
    methodology: {
      icon: 'method',
      title: 'Methodology Details',
      text: [
        'Systematic ',
        { em: 'annotated documentation of key features' },
        ' and implementation of services from our competitors.',
      ],
    },
    shots: [
      { img: 'fa-annotated', caption: 'Implementation of Filters' },
      { img: 'fa-search-bar', caption: 'Search Bar Implementation' },
    ],
  },

  process: {
    kicker: 'The Design Process',
    cardTitle: 'What was our process?',
    cardBody: [
      'We used the sprint methodology- but adapted for time. ',
      { em: 'User flows' },
      ' instead of storyboards and ',
      { em: 'rapid collaborative iteration' },
      ' was the name of our game!',
    ],
    title: 'The Design Process',
    lead: [
      'Our goal with this phase was to ',
      { em: 'take pen to paper' },
      ' and come up with ',
      { em: 'design ideas through rapid iteration.' },
      ' This allowed for a variety of different individual approaches to be brought together cohesively.',
    ],
    panels: [
      { n: '1.', label: 'Voting on flows and IA-', rest: ' To prioritize features and create structure', img: 'dp-voting', arrow: true },
      // FIXED: the export spells this "Lightening Demos".
      { n: '2.', label: 'Lightning Demos and Crazy 8’s-', rest: ' To brainstorm and rapidly iterate', img: 'dp-demos' },
      { n: '3.', label: 'Sketch and Vote:', rest: ' For detailed ideation, one sketch per team member', img: 'dp-sketch-vote', arrow: true },
      { n: '4.', label: 'Low-Fi Designs:', rest: ' For detailed ideation, one sketch per team member', img: 'dp-lofi' },
      { n: '5.', label: 'Collaborative Design and Iteration for Testing', rest: '', img: 'dp-collab', wide: true },
    ],
  },

  testing: {
    title: 'Time to Put it to the Test',
    cards: [
      { title: 'Who did we test with?', items: ['5 Therapists, 4 Patients, 1 Expert/ Client'] },
      {
        title: 'What was the goal?',
        ordered: true,
        items: [
          ['To capture ', { em: 'authentic, nuanced user perspectives' }],
          ['To ', { em: 'build empathy' }, ' and human connection with our actual users'],
        ],
      },
      {
        title: 'Methodology Details',
        items: [
          'Structured Interviews with space for follow ups',
          '60 Minute sessions to fully grasp user behavior',
        ],
      },
    ],
  },

  // Two view walkthroughs, same shape. `who` on a quote is the artwork's own
  // colour code: T therapist (pink), P patient (green), C client (blue).
  views: [
    {
      id: 'therapist',
      title: 'Therapist View',
      index: [
        { title: 'Search Feature', items: ['1.1. Keyword Based Search', '1.2. Browse Based Search ', '1.3. Filters & Sort', '1.4. Share Content Feature'] },
        { title: 'My Guide', items: ['2.1. Patient View & Track', '2.2. Remind & Message Feature'] },
      ],
      features: [
        {
          title: '1.1 Keyword Based Search',
          // FIXED: the export reads "keyworsd".
          desc: 'Enables quick access to relevant content through keywords',
          hero: { img: 't11-hero', alt: 'The search field open, with suggestions and a Recommended list.' },
          quotes: [
            { who: 'C', text: ['“Search is gonna be on the forefront of ', { em: 'making things easier to discover.' }, '” [C1 - 42]'] },
            { who: 'T', text: ['“', { em: "When the time comes I'm not going to be scrolling through things." }, ' I want to go through my search bar, put the information that I need and that just makes things extremely simpler for me.” [T1-14]'] },
            { who: 'P', text: ['“', { em: 'I typically go to the search bar first on any website if I don’t see exactly what I’m looking for' }, ' on the main page. It’s just the easiest and most efficient way to find something.” [P6-21]'] },
            { who: 'T', text: ['“I love search bars. I think just the search bar having like not as much of like a caps lock, or lower ', { em: 'case sensitivity would help.' }, '”\n[T1-54]'] },
          ],
          legend: ['P', 'T', 'C'],
          updated: {
            title: 'Updated Keyword Based Search',
            items: [
              { n: '1.', text: 'Updated the placeholder text in search bar', img: 't11-updated-1', alt: 'The placeholder changing from “Search” to “Search by topic, creator, or keyword”.', wide: true },
              { n: '2.', text: 'Refined the “Recommended” section in search dropdown results', img: 't11-updated-2', alt: 'The search dropdown with a numbered Recommended list.' },
              { n: '3.', text: 'Added the number of search results displayed on results page', img: 't11-updated-3', alt: 'A results page headed “Showing 42 results — Results for “Anxiety””.' },
            ],
          },
        },
        {
          title: '1.2 Browse Based Search',
          hero: { img: 't12-hero', alt: 'The content library browsing all content, with topics down the left.' },
          quotes: [
            { who: 'T', text: ['“It ', { em: 'would be helpful to have content tagged' }, ' with additional attributes. The same piece of content might be helpful for multiple things.”\nT2-21'] },
            { who: 'T', text: ["“I think that's an important feature for all of them, ", { em: "because sometimes it's not something specific." }, ' I want to see all the content..”\n[T1-48]'] },
            { who: 'C', text: ['"We want to expand the scope of search to ', { em: 'include categorization and browsing options' }, ' on the homepage." \n[C2 - 19]'] },
            { who: 'T', text: ['“I like that ', { em: 'the platform has chapters in the particular video,' }, ' making it easy to navigate specific sections.”\n[T2-58]'] },
            { who: 'P', text: ['“It would be nice to have ', { em: 'an option to see all videos without filtering by topic.' }, '” [P8-32]'] },
          ],
          legend: ['P', 'T', 'C'],
          updated: {
            title: '',
            items: [
              { n: '1.', text: 'Updated the tags on the card to show the number of chapters in a  playlist, for clarity.', img: 't12-updated-1', alt: 'A content card before and after, the tag now reading “5 min | 2 videos”.' },
              { n: '2.', text: 'Added related ‘keywords’ on videos for better content tagging & user exploration', img: 't12-updated-2', alt: 'A video page gaining a “Keywords associated with this content” block.' },
              { n: '3.', text: 'Added an ‘All Content’ section to the topics dropdown on the left-side navigation', img: 't12-updated-3', alt: 'The topic navigation gaining an “All Content” entry above the topics.' },
            ],
          },
        },
        {
          title: '1.3. Filters & Sort',
          desc: 'Lets therapists refine and organize results by type, duration, recency, and more.',
          hero: { img: 't13-hero', alt: 'The filter bar and every filter dropdown open at once.' },
          quotes: [
            { who: 'C', text: ['"', { em: 'Adding filters and text search together' }, ' will make the platform’s search more precise and effective." [C2 - 41]'] },
            { who: 'T', text: ['“When I thought it was ', { em: 'learning style, my 1st idea was it would have been audio/visual,' }, ' just audio, or something like that.” [T1-27]'] },
            { who: 'P', text: ['"', { em: 'I would condense some of these options' }, ' just a little like less than 30 min, and then maybe another category. Yeah, just maybe like 3 or 4. Max."\n[P7-19]'] },
            { who: 'P', text: ['"Do they (i.e. filters) apply to everything on this page or just like, yeah, ', { em: 'would they apply to every all 3 sections on this page?' }, '"\n[P7-66]'] },
          ],
          legend: ['P', 'T', 'C'],
          updated: {
            title: 'Updated Filter & Sort',
            items: [
              { n: '1.', text: 'Updated the dropdown in ‘Learning Style’ to what users expect to see, such as audio/visual', img: 't13-updated-1', alt: 'The Learning Style dropdown changing to Visual, Auditory, Sensory-Focused.' },
              { n: '2.', text: 'Reduced the number of items in each filter dropdown to reduce cognitive load on users', img: 't13-updated-2', alt: 'The Duration dropdown reduced from seven options to four.' },
            ],
          },
        },
        {
          title: '1.4 Share Content Feature',
          hero: { img: 't14-hero', alt: 'Assigning content to a patient from the content library.' },
          quotes: [
            { who: 'C', text: ['“Use the word ', { em: '‘Share’ instead of ‘Assign.’' }, '”\n[C1 - 3]'] },
            { who: 'T', text: ['“', { em: 'Group assignment is not something that we regularly would do,' }, ' I think.” [T3-33]'] },
            { who: 'T', text: ['“', { em: 'Adding notes when assigning content might be helpful' }, ' because sometimes if you tell someone something verbally, they might forget.” [T2-09]'] },
            { who: 'T', text: ['“If ', { em: 'we want to set different assignment dates for multiple patients when batch assigning,' }, " I'm not seeing how to do that.” [T1-76]"] },
          ],
          legend: ['T', 'C'],
          updated: {
            title: '',
            items: [
              // FIXED: the export reads "won’t feel feel pressured".
              { n: '1.', text: 'Updated the word ‘Assign’ to ‘Share’ so therapists don’t come off as authoritarian and patients won’t feel pressured by a list of videos to watch.', img: 't14-updated-1', alt: 'A content card whose Assign button becomes a Share button.', note: 'The card now has a hover effect to indicate it’s clickable, so we removed the secondary ‘View’ button in the updated card design!' },
              { n: '2.', text: 'Provided an optional ‘Group Assign’ feature, including personalized notes & due dates for individual clients.', img: 't14-updated-2', alt: 'The share panel gaining group assignment with per-client notes and due dates.' },
              { n: '3.', text: 'Updated the ‘Assign’ popup to a slide-in view for better visibility and function.', img: 't14-updated-3', alt: 'The assign popup becoming a slide-in Share panel, with an Unshare button added.' },
              { n: '4.', text: 'Remind and message: enables therapists to leave notes with videos and gentle reminders to keep patients engaged with content shared with them.', img: 't14-updated-4', alt: 'The reminder and message composer a therapist sends with shared content.' },
            ],
          },
          tail: {
            mark: '🚫',
            // The artwork sets "No engagement analytics right now, maybe in
            // the future." [C1 - 13] *inside* item 4's composition, over the
            // screenshots — so it is already on the page, in the picture, and
            // is not repeated here. See DESIGN.md §11c.
            quotes: [
              { who: 'T', text: ['“I need to get qualitative feedback from patients on content. If a patient doesn\'t complete content, I want to know: ', { em: 'did they not find it engaging enough' }, ' or is there some other reason?” [T2-61]'] },
              { who: 'C', text: ['"Notes from therapist ', { em: 'should be integrated into the email itself,' }, ' it doesn’t need to be complex. Just a simple subject line and message body, and patients shouldn’t be able to reply." [C1 - 16]'] },
            ],
            legend: ['T', 'C'],
          },
        },
      ],
      prototype: { title: 'Link to Therapist Prototype', cta: 'Click here to see clickable screens!' },
    },
    {
      id: 'patient',
      title: 'Patient View',
      index: [
        { title: 'Search Feature', items: ['1.1 Filters & Sort', '1.2 Bookmarking Feature'] },
        { title: 'My Guide', items: ['2.1 View Shared Content', '2.2 Video Player ', '2.3 User Profile'] },
      ],
      features: [
        {
          title: '1.1 Filters and Sort',
          desc: 'Lets patients refine and organize results by type, duration, recency, emotions and more.',
          descAside: 'Lets patients refine and organize results by how they’re feeling.',
          hero: { img: 'p11-hero', alt: 'The patient filter bar with an Emotions filter open.' },
          quotes: [
            { who: 'T', text: '“...introduced a picture [based] communication system for him [the patient] to be able to communicate [what he was feeling]"\n(T2-80)' },
            { who: 'P', text: ['"I liked that ', { em: 'I could sort by what I was looking for.' }, ' For example, if someone was dealing with a specific emotion, that filter is really helpful."-P5-14'] },
            { who: 'P', text: ['"I think this ', { em: 'emotions one is really nice.' }, ' I think the emojis are nice thing to include."-P7-23:'] },
          ],
          // FIXED: the export's legend reads "= Patient Quote (C)".
          legend: ['T', 'P'],
        },
        {
          title: '1.2 Bookmarking Feature',
          desc: 'Lets patients save videos from the content library, to be watched later.',
          hero: { img: 'p12-hero', alt: 'A patient bookmarking a video from the content library.' },
          quotes: [
            { who: 'T', text: ['"If that can be a feature of the app where I know that this is some kind of content that maybe on a later date can be assigned to this particular patient. ', { em: 'Just making note of that somewhere' }, ' would would be really great." [T1-23]'] },
            { who: 'P', text: ['"', { em: 'The bookmark feature is very simple and straightforward.' }, " It's easily accessible.\" - P8-41"] },
            { who: 'T', text: ['"I think ', { em: 'saving it to a playlist' }, ' would be would be nice. It would really be nice." - T1-24'] },
            { who: 'P', text: ['"A whole other page for bookmarks would look just the same as this page, ', { em: 'which already looks very good.' }, '" -P8-31'] },
          ],
          legend: ['T', 'P'],
          sub: {
            title: 'Retrieving Bookmarks',
            desc: 'Allows patients to access content that they have saved for later',
            img: 'p12-retrieving',
            alt: 'The bookmarks collected on the patient’s own page.',
            quotes: [
              { who: 'T', text: 'T1-24: "I think saving it to a playlist would be would be nice. It would really be nice."' },
              { who: 'P', text: '"A whole other page for bookmarks would look just the same as this page, which already looks very good." -P8-31' },
              { who: 'T', text: "T4-21: \"After bookmarking a few things, I couldn't figure out where to go to see them. There didn't seem to be a central place where my bookmarks were collected.\"" },
            ],
            legend: ['T', 'P'],
          },
        },
        {
          title: '2.1 My Guide',
          desc: 'Lets patients view content that has been shared and keep track of what they have watched.',
          hero: { img: 'p21-hero', alt: 'My Guide for a patient: in-progress and shared content, with progress bars.' },
          quotes: [
            { who: 'P', text: 'P8-40: "I would access Content Library for interest in other things.. but My Guide would be what I value most."' },
            { who: 'P', text: 'P8-07: "I like that the first content shown is things already in progress that I\'m in the middle of doing."' },
            { who: 'T', text: 'T1-66: I would use the word like collaborate or share. I would not say assign. That gives me a lot of power I\'m not assigning.' },
            { who: 'P', text: 'P6-13: "The \'My Guide\' section caught my attention right away. It felt like a central hub for what was most relevant to me as a user."' },
          ],
          legend: ['T', 'P'],
          sub: {
            title: 'Revised Sort Feature',
            desc: 'The category based sort was changed to a universal sort to avoid confusion and repetition of tasks',
            img: 'p21-sort',
            alt: 'The per-category sort replaced by one universal Sort By control.',
            quotes: [
              { who: 'P', text: 'P7-66: "I guess I\'m wondering.. how does the sort work? Because there’s only one filter..' },
              { who: 'P', text: 'P8-09: "I don\'t understand how the \'In Progress\' would work in the \'Sort by\' option since there\'s already a specific tab for it."' },
            ],
            legend: ['P'],
          },
        },
      ],
      prototype: { title: 'Link to Patient Prototype', cta: 'Click here to see clickable screens!' },
    },
  ],

  future: {
    title: ['Future', 'Implementation'],
    cards: [
      {
        title: 'Calendar Integration',
        text: 'Calendar Integration with Appointment Management: Implement the calendar integration. This would automatically set due dates based on upcoming appointments and integrate content assignment with session notes.',
      },
      // See the header note: the export repeats the Calendar Integration
      // paragraph under both of these headings.
      { title: 'Content Analytics', todo: true },
      { title: 'Therapist Content Sharing', todo: true },
    ],
  },
}
