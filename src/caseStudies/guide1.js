// ---------------------------------------------------------------------------
// ALL COPY FOR "GUIDE APP: BUILDING A ROBUST SEARCH EXPERIENCE" (PART 1).
// Transcribed from the Figma export ("Guide Pt 1.pdf") with
// tools/extract_case_study.py. Layout is in Guide1Page.jsx; nothing below is
// styling. See DESIGN.md §11c.
//
// Emphasis is carried in the data, not the layout: a paragraph is a string, or
// an array whose members are strings and { em } objects. `em` is the artwork's
// bold-italic run inside running prose, and its bold run inside a card. One
// element, because the artwork only ever has one level of emphasis.
//
// Wording and punctuation are the artwork's own, with the typos listed below
// fixed and marked FIXED. Nothing else may be "corrected" silently while
// editing something else — same rule as tctd.js. See DESIGN.md §11b.
//
//   FIXED  "Leaning"          -> "Learning"   (competitor column header)
//   FIXED  "Lightening Demos" -> "Lightning Demos"
//
// Two of the artwork's own quirks are deliberately KEPT, because they are the
// author's voice rather than slips: "The Overcome" as the counterpart to "The
// Challenge", and "Sprint Q 1" spaced as three words.
// ---------------------------------------------------------------------------

export const guide1 = {
  slug: 'search-experience-for-guide',

  hero: {
    lead: 'Guide App:',
    title: 'Building a Robust Search Experience',
    sub: [
      'Designing a search experience for a B2B learning platform to enable quick content discovery and personalized content assignment- ',
      { em: 'from scratch' },
    ],
  },

  // The four dashed cards under the hero. `lines` is the banded lower half.
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
      lines: ['6 Months'],
      note: '5 Sprints\n(2 down, 3 to go!)',
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
      lines: ['1. Lead Researcher', '2. Project Manager', '3. Facilitator', '4. Designer'],
    },
  ],

  overview: {
    kicker: 'What’s this all about?',
    title: ['Project', 'Overview'],
    body: [
      [
        'Guide is a corporate learning platform where ',
        { em: 'companies uploaded bite-sized training videos' },
        ' for employee development—think "TikTok for Business."',
      ],
      [
        'It helps organizations ',
        { em: 'attract, onboard, train, and keep talent engaged through quick, episodic content.' },
      ],
      [
        'But as Guide grew, it hit a snag: with ',
        { em: 'no real search function,' },
        ' users ended up scrolling endlessly through content, hunting for what they actually needed.',
      ],
    ],
    pair: [
      {
        title: 'The Challenge',
        text: [
          'Training teams and staff depend on Guide for learning materials, but ',
          { em: 'without solid search capabilities, they waste valuable time hunting for the right content' },
          ' in a sea of videos.',
        ],
      },
      {
        title: 'The Overcome',
        text: [
          'Created a ',
          { em: 'sleek, scalable search system' },
          " tailored to Guide's business learners, featuring ",
          { em: 'intelligent filters and custom content suggestions' },
          ' that boost platform engagement and efficiency.',
        ],
      },
    ],
  },

  hmw: {
    kicker: 'What are we solving for?',
    title: 'How Might We',
    body: 'Build a search system for Guide that makes finding the right training videos effortless, keeps navigation simple, and keeps different types of professionals coming back for more?',
  },

  competitors: {
    kicker: 'Who are Guide’s competitors and how do they approach Search?',
    body: "An analysis of Guide's competitors was conducted to identify industry standards and understand their search functionalities, informing our approach to search design.",
    title: ['Where Does', 'Guide Stand?'],
    // FIXED: the export's header reads "LinkedIn Leaning".
    columns: ['Guide', 'SkillJar', 'LinkedIn\nLearning', 'Talent LMS', 'Zensai', 'Absorb LMS'],
    rowHead: 'Search Feature',
    // true = the artwork's green check, false = its red cross.
    rows: [
      { label: 'Navigational', has: [false, true, true, true, true, true] },
      { label: 'Browse-Based', has: [false, true, true, false, true, true] },
      { label: 'AI Suggestions', has: [false, true, true, true, true, true] },
      { label: 'Search Analytics', has: [false, true, false, false, true, true] },
      { label: 'Faceted Search', has: [false, true, false, false, false, true] },
      { label: 'Personalized', has: [false, true, true, true, true, false] },
    ],
  },

  insights: {
    title: 'Key Insights',
    cards: [
      {
        title: 'Personalized Recommendations',
        gap: 'Most platforms lack user-specific content suggestions',
        opportunity: 'Implement recommendations based on past activity and popular courses',
      },
      {
        title: 'Learning Journeys',
        gap: 'Focus on individual content rather than connected experiences',
        opportunity: 'Guided learning paths based on search keywords,  user behavior',
      },
      {
        title: 'Predictive Search',
        gap: 'Basic search exists but intelligent prediction is missing',
        opportunity: 'Add autocomplete with smart suggestions to reduce search time',
      },
      {
        title: 'Content Previews',
        gap: 'Users must open full courses to determine relevance',
        opportunity: 'Integrate microlearning previews in search results for quick evaluation',
      },
    ],
    // The 2×2 map. x/y are percentages of the plot box, measured off the
    // artwork; the axes cross at (50, 50) because that is where the export
    // puts them, not because the data is centred.
    map: {
      yAxis: { title: 'Content Size', high: 'Long Form', low: 'Short Form' },
      xAxis: { title: 'Search Complexity', low: 'Least Complex', high: 'Most Complex' },
      marks: [
        { logo: 'skilljar', label: 'SkillJar', x: 26.4, y: 28.5 },
        { logo: 'linkedin', label: 'LinkedIn Learning', x: 88.8, y: 28.0 },
        { logo: 'absorb', label: 'AbsorbLMS', x: 50.1, y: 49.8 },
        { logo: 'zensai', label: 'Zensai', x: 61.2, y: 50.1 },
        { logo: 'cornerstone', label: 'Cornerstone', x: 80.1, y: 50.2 },
        { logo: 'talent', label: 'Talent LMS', x: 35.8, y: 77.7 },
        { logo: 'guide', label: 'Guide', x: 7.7, y: 89.8 },
      ],
    },
  },

  vision: {
    kicker: 'How did we understand Guide’s vision?',
    title: ['Understanding', 'Guide'],
    body: [
      [
        'We ',
        { em: 'mapped out a complete business model based' },
        ' on everything we uncovered through our field research, competitor deep-dives, and our conversations with the founding team.',
      ],
      [
        "By sitting down with Guide's co-founders, we ",
        { em: 'captured their big-picture vision' },
        ' and understood how they believe their platform ',
        { em: 'transforms experiences, for both individual users and entire organizations.' },
      ],
    ],
    quotes: [
      {
        title: 'Elevating Content Discovery',
        text: [
          '"Our primary goal is to ',
          { em: 'implement an intuitive search feature' },
          ' that will be ',
          { em: 'at the forefront' },
          ' of making content ',
          { em: 'easily discoverable' },
          '. This will enhance the user experience by enabling people to ',
          { em: 'find specific video content directly.”' },
          ' -Guide’s Co-Founder',
        ],
      },
      {
        title: 'Reimagining Workplace Learning',
        text: [
          '"The vision is to transform training from ',
          { em: 'passive content consumption to engaging, interactive experiences' },
          ' that employees genuinely enjoy—where they ',
          { em: 'actively participate with both the material and their colleagues.' },
          '" -Guide’s Co-Founder',
        ],
      },
    ],
    canvasTitle: 'Business Model Canvas',
  },

  users: {
    kicker: 'How did we understand pain points and workflows?',
    title: ['Understanding', 'Our Users'],
    strategyLabel: 'Interview Strategy:',
    strategyRest: ' Conducted in-depth interviews with:',
    from: {
      icon: 'users',
      title: '8 Users',
      lines: ['2 business owners', '2 employees', '4 HR professionals'],
    },
    connector: 'To Understand:',
    to: {
      icon: 'experiences',
      title: 'Experiences with:',
      lines: ['productivity', 'learning management tools', '  in workplace settings.'],
    },
    questionsLabel: 'Key Questions:',
    questionsRest: ' Asked participants about:',
    questions: [
      {
        icon: 'factors',
        title: 'Factors prioritized',
        text: [
          { em: 'When evaluating training content:' },
          ' Relevance, length, quality, and how users balance these criteria',
        ],
      },
      {
        icon: 'preferences',
        title: 'Preferences for',
        text: [
          { em: 'Content recommendation:' },
          ' Personalized suggestions based on history, role, industry benchmarks',
        ],
      },
      {
        icon: 'strategies',
        title: 'Strategies for',
        text: [
          { em: 'Managing content, discovering relevant resources:' },
          ' search functions, filters, content organization',
        ],
      },
    ],
  },

  findings: {
    title: ['Key Research', 'Findings'],
    cards: [
      {
        icon: 'target',
        title: 'Curated Recommendations',
        text: [
          'Users want ',
          { em: 'search results' },
          ' and ',
          { em: 'recommendations tailored specifically' },
          ' to their role, responsibilities, and context.',
        ],
        quotes: [
          '"I prefer the platform to make recommendations so I can stay hands-off." [P3-17]',
          '"I only want to see content that is relevant to my role." [P4-06]',
        ],
      },
      {
        icon: 'preview',
        title: 'Content Previews',
        text: [
          'Users want the ability to ',
          { em: 'preview content before committing to watching it' },
          ' entirely.',
        ],
        quotes: [
          '"Having preview options for training content would be helpful in deciding whether to include it in modules." [P8-28]',
        ],
      },
      {
        icon: 'funnel',
        title: 'Comprehensive Filtering Options',
        text: [
          'Users want ',
          { em: 'robust filtering capabilities' },
          ' to narrow down search results by various criteria such as ',
          { em: 'date, format, and content type' },
        ],
        quotes: [
          '"I want to be able to filter search results by different criteria, such as date, author, and topic." [P4-08]',
        ],
      },
    ],
  },

  journeys: {
    title: 'Journey Mapping',
    cardTitle: 'Why did we map journeys?',
    body: [
      { em: "To trace our users' daily workflows:" },
      ' helping us see where employees face problems, implement creative alternatives, and meet friction points during their interactions with learning tools.',
    ],
    maps: [
      { img: 'journey-owner', alt: 'Journey map for Micheal, a compliance-focused business owner.' },
      { img: 'journey-employee', alt: 'Journey map for Tina, an employee balancing multiple projects.' },
    ],
  },

  sprint: {
    cardTitle: 'Following the “Sprint” Methodology,',
    body: [
      'We followed the process of ',
      { em: 'Map, Sketch, Decide, Prototype, Test.' },
      '\nTo ideate, validate and iterate our design decisions.',
    ],
    title: ['Discovery >', 'Design'],
  },

  // The five sprint phases. `panels` are the artwork's numbered image blocks;
  // a panel with `wide: true` runs the full content column.
  phases: [
    {
      num: '1.',
      title: 'Mapping',
      lead: [
        'Mapped user journeys to ',
        { em: 'identify pain points, and opportunities.' },
        ' Validated insights with clients and ',
        { em: 'transformed them into prioritized "How Might We" questions' },
        ' to guide design strategy.',
      ],
      goal: {
        title: 'Long Term Goal',
        text: [
          'Design an ',
          { em: 'intuitive search experience' },
          ' for Guide over 5 sprints to help Guide users find relevant training content more ',
          { em: 'quickly and with high accuracy.' },
        ],
      },
      questions: [
        { title: 'Sprint Q 1', text: 'How can we establish a structured information architecture to inform Guide’s search experience?' },
        { title: 'Sprint Q 2', text: ' How can we create a phased design approach to scale Guide’s search experience over time?' },
        { title: 'Sprint Q 3', text: 'What features would users consider essential or desirable in a search experience for learning?' },
        { title: 'Sprint Q 4', text: 'How can we validate our assumptions around user needs in this part of the journey?' },
      ],
      panels: [
        { n: '1.', label: 'Create + Group HMW Notes:', rest: ' Based on Journey Maps', img: 'map-hmw-notes', framed: true, arrow: true },
        { n: '2.', label: 'Dot Voting with Client:', rest: ' To prioritize features', img: 'map-dot-voting', framed: true },
        { n: '3.', label: 'How Might We Notes:', rest: ' With votes and vetoes from the team and client', img: 'map-hmw-wall', wide: true, framed: true },
      ],
    },
    {
      num: '2.',
      title: 'Sketching',
      lead: [
        'Our goal with this phase was to ',
        { em: 'take pen to paper' },
        ' and come up with ',
        { em: 'design ideas through rapid iteration.' },
        ' This allowed for a variety of different individual approaches to be brought together cohesively.',
      ],
      panels: [
        // FIXED: the export spells this "Lightening Demos".
        { n: '1.', label: 'Lightning Demos:', rest: '  To understand best practices', img: 'sketch-demos', arrow: true },
        { n: '2.', label: 'Notes & Sketches:', rest: ' For initial ideation, one sketch per team member', img: 'sketch-notes' },
        { n: '3.', label: 'Crazy Eights:', rest: '  To rapidly iterate upon ideas', img: 'sketch-crazy-eights', arrow: true },
        { n: '4.', label: 'Solution Sketch:', rest: ' To expand on one idea in detail', img: 'sketch-solution' },
      ],
    },
    {
      num: '3.',
      title: 'Deciding',
      lead: [
        'Our goal with this phase was to ',
        { em: 'take pen to paper' },
        ' and come up with ',
        { em: 'design ideas through rapid iteration.' },
        ' This allowed for a variety of different individual approaches to be brought together cohesively.',
      ],
      panels: [
        { n: '1.', label: 'Target How Might We’s', rest: '', img: 'decide-target-hmw', wide: true, framed: true },
        { n: '1.', label: 'Art Wall + Heat Map:', rest: ' To vote on most the team’s preferred features', img: 'decide-art-wall', arrow: true },
        { n: '2.', label: 'Straw Poll with Client:', rest: ' To understand the clients’ priorities', img: 'decide-straw-poll' },
        { n: '3.', label: 'Super Vote with client', rest: ': To discover “non-negotiable” features for the product.', img: 'decide-super-vote', wide: true },
      ],
    },
    {
      num: '4.',
      title: 'Prototyping',
      lead: 'On understanding requirements and features, we built a mid-fidelity prototype to bring our ideas to life. This allowed us to understand and validate the feasibility of our features.',
      screens: {
        left: [
          { img: 'proto-search', alt: 'Search with an open suggestions dropdown and a My Guide panel.' },
          { img: 'proto-leadership', alt: 'The Leadership category page with filters down the left.' },
        ],
        mid: { img: 'proto-my-guide', alt: 'The My Guide modal: assigned, in-progress and saved trainings.' },
        right: [
          { img: 'proto-results', alt: 'Search results for “Leadership”, split into videos and courses.' },
          { img: 'proto-browse', alt: 'Browse, grouped by topic and by job role.' },
        ],
      },
    },
    {
      num: '5.',
      title: 'Testing',
      lead: [
        'We tested the prototype with ',
        { em: '5 users. 3 employees and 2 HR personnel.' },
        ' The prototypes were tested to understand friction points that existed within the product. Insights are as follows:',
      ],
      cards: [
        {
          icon: 'eye',
          title: 'My Guide Visibility',
          text: [
            'Make ',
            { em: 'My Guide permanently visible and accessible' },
            '- possibly from the home/landing page - with key user information and recent activity',
          ],
          quote: '"I want that [MyGuide] there all the time... This is everything that I need as soon as I get in."',
        },
        {
          icon: 'compass',
          title: 'Navigation Context',
          text: [
            'Implement ',
            { em: 'breadcrumb navigation system- consistent across all pages' },
            ' of the flow’s experience',
          ],
          quote: '"Breadcrumbs would help me know where I am and how to go back easily without starting over."',
        },
        {
          icon: 'sitemap',
          title: 'Content Structure Clarity',
          text: [
            ' Add ',
            { em: 'clear visual indicators for series' },
            ' vs standalone content- some sort of ',
            { em: 'imagery or iconography- consistent across all categories.' },
          ],
          quote:
            '"Isn’t clear if this is part of a series or just a standalone video. \nIf it\'s a playlist, show me that upfront—or, I have to guess."',
        },
        {
          icon: 'phone',
          title: 'Homepage Personalization',
          text: [
            'Create personalized view of trainings and progress (',
            { em: 'MyGuide with the required modifications) on homepage' },
          ],
          quote: '"Homepages are supposed to have what you need right now available."',
        },
      ],
    },
  ],

  outro: 'Stay Tuned for Sprint 3, 4 and 5!',
}
