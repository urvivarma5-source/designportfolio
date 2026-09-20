// Every word on a work card lives here. See DESIGN.md §4.5 and §8.2.
//
// EVERY CARD LEADS WITH WHAT THE WORK ACHIEVED. `outcome` is that sentence, in
// words, and it is the point of the card. Urvi asked for impact rather than a
// pair of numbers (2026-09-20). `metrics` is optional and only ever carries
// figures the case study actually measured:
//
//   Filling Cabinets  outcome + metrics    tctd.js outcomes: "Result: Staff could
//                                          use the system on day one...", 78%, ~70%
//   Guide Part 1      outcome only         guide1.js sprint goals + users, mid-project,
//                                          nothing measured yet
//   Guide Part 2      outcome only         guide2.js testing roster, views, future
//   NGMA              outcome + live link  ngma.js overview, cohesion, outro prototype
//
// An earlier version put "8 users interviewed / 5 sprints" on the Guide cards.
// Those measure effort, not impact, and were cut for that reason.
//
// TAGS on the four projects with case studies are drawn from those case
// studies. Tags marked PLACEHOLDER are inferred from the title and description
// alone, because the project has no case study yet. Replace them when it does.
export const categories = [
  {
    id: 'product-design',
    label: 'Product Design',
    projects: [
      // The three SMARTER case studies. They were one empty `smarter-project`
      // card until 2026-09-20; they are three separate projects rather than
      // parts of one, because they share a product and nothing else: a
      // navigation component, a design system, and a process map are three
      // different kinds of work. `note` groups them in the UI instead.
      //
      // None of the three carries `metrics`. Nothing has been tested with
      // users yet, so every figure would be invented. See the rule at the top
      // of this file.
      {
        slug: 'smarter-station-navigator',
        title: 'Making a Sensor Station Navigable',
        note: 'SMARTER',
        desc: 'Turned a navigation card nobody could read into a component that says what every click will do. Three levels, one selection model, legible in greyscale and from the keyboard.',
        tags: ['Design systems', 'Information architecture', 'Accessibility'],
        outcome:
          'A detail page built for one sensor had to hold stations, modules and the sensors inside them. The navigator holds all three under one rule: it picks what you are viewing, the tabs pick which aspect. Handed to engineering with an interaction contract.',
      },
      {
        slug: 'smarter-sensor-library',
        title: 'A Library You Can Compare Sensors In',
        note: 'SMARTER',
        desc: 'Ninety sensors, and a researcher who has to pick four. Browse, filter and compare, built on one component library and a filter that never dead-ends.',
        tags: ['Design systems', 'Search & compare', 'Prototyping'],
        outcome:
          'Ninety environmental sensors, and researchers who need to shortlist four. Browse, filters that cannot dead-end and side-by-side comparison were designed as three jobs on one component library, specified for keyboard, screen reader and four widths.',
      },
      {
        slug: 'smarter-ehie-process-map',
        title: 'Mapping a Research Data Workflow',
        note: 'SMARTER',
        desc: 'Turned two meeting transcripts and a tentative swimlane into nine diagrams the team could finally argue with precisely, and shipped the six open questions alongside them.',
        tags: ['Service design', 'Process mapping', 'Stakeholder alignment'],
        outcome:
          'Two transcripts, one tentative swimlane, and a team that disagreed on what follows a study\'s conception. Nine diagrams built from the transcripts settled part of the workflow and named the six questions still open.',
      },
      {
        slug: 'search-experience-for-guide',
        title: 'Building a Robust Search Experience',
        // The product and the part both sit on the eyebrow line, so the title
        // is the work itself. Urvi's call, 2026-09-20.
        context: 'Guide App',
        note: 'Part 1',
        desc: 'Designing a search experience for a B2B learning platform to enable quick content discovery and personalized content assignment, from scratch.',
        tags: ['0 to 1 design', 'B2B platform', 'Search'],
        outcome:
          'Guide\'s training library had outgrown any way of searching it. Interviews with eight HR leads, business owners and employees set the information architecture now being built out over five sprints.',
      },
      {
        slug: 'search-experience-for-guide-2',
        title: 'Building a Robust Search Experience',
        context: 'Guide App',
        note: 'Part 2',
        desc: 'Designing a search and tracking experience for a learning platform that keeps patients engaged between therapy sessions.',
        tags: ['Mental health', 'Search & tracking', 'Usability testing'],
        outcome:
          'After Guide pivoted to mental health, therapists assigned content between sessions and patients lost track of it. Testing with ten therapists, patients and a clinical expert produced My Guide, one place showing what was assigned and what was watched.',
      },
      {
        slug: 'co-design-with-students-with-adhd',
        title: 'Co-Designing with Graduate Students with ADHD',
        desc: 'An in-depth look at a participatory UX research journey.',
        tags: ['Participatory design', 'Accessibility'], // PLACEHOLDER
      },
      {
        slug: 'filling-cabinets-to-fingertips',
        title: 'Filling Cabinets to Fingertips',
        context: 'Hospital patient management',
        desc: "Digitizing a 40-year-old paper-based patient management system in a public hospital's specialty clinic.",
        tags: ['Service design', 'Healthcare', 'Field research'],
        outcome:
          'A specialty department seeing 80 to 120 patients a day ran on paper records unchanged since the 1980s. Replacing them added no time to a consultation, which was the clinicians\' one condition, and staff needed no training.',
        metrics: [
          { value: '78%', label: 'Faster record retrieval' },
          { value: '~70%', label: 'Less repeat history-taking' },
        ],
      },
    ],
  },
  {
    id: 'visual-design',
    label: 'Visual Design',
    projects: [
      {
        slug: 'website-redesign-for-ngma-mumbai',
        title: 'Redesigning the National Gallery of Modern Art Website',
        context: 'NGMA Mumbai',
        desc: 'Exploring chaos to calm.',
        tags: ['Web redesign', 'Visual identity', 'Motion'],
        outcome:
          'The National Gallery of Modern Art needed a site as calm as its building. The gallery\'s own staircase became the organising motif for colour, typography and motion across a full clickable prototype.',
        // ngma.js outro: "Full Prototype Here"
        live: { label: 'View prototype', href: 'https://tinyurl.com/mrxm99fh' },
      },
      {
        slug: 'branding-for-sugar-rush',
        title: 'Branding for Sugar Rush',
        desc: 'A bakery in Mumbai.',
        tags: ['Branding', 'Identity'], // PLACEHOLDER
      },
    ],
  },
  {
    id: 'ux-research',
    label: 'UX Research',
    projects: [
      {
        slug: 'ux-research-and-design-with-ai',
        title: 'PeacePath: AI Augmented Research and Design',
        desc: 'Navigate with ease, find peace in every step.',
        tags: ['AI-augmented', 'Mixed methods'], // PLACEHOLDER
      },
      {
        slug: 'navigating-campus-spaces',
        title: 'Navigating Campus Spaces',
        desc: 'Understanding the iSchool student experience.',
        tags: ['Wayfinding', 'Field research'], // PLACEHOLDER
      },
      {
        // title is a placeholder, rename freely
        slug: 'employee-tool-use-at-intuit',
        title: 'Mapping Employee Tool Use at Intuit',
        tags: ['Internal tools', 'Research ops'], // PLACEHOLDER
      },
      {
        slug: 'elderease',
        title: 'ElderEase',
        desc: 'Where compassion meets cutting-edge convenience.',
        tags: ['Service design', 'Older adults'], // PLACEHOLDER
      },
    ],
  },
]

export const projects = categories.flatMap((c) =>
  c.projects.map((p) => ({ ...p, category: c.label })),
)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
