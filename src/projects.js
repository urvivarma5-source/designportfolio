// Projects, grouped as specified, with descriptions taken from the supplied
// case-study artwork.
//
// Three have no reference content and carry no description yet: smarter-project,
// branding-for-sugar-rush, employee-tool-use-at-intuit — the last of which
// needed a name inventing.
export const categories = [
  {
    id: 'product-design',
    label: 'Product Design',
    projects: [
      { slug: 'smarter-project', title: 'SMARTER Project' },
      {
        slug: 'search-experience-for-guide',
        title: 'Guide App: Building a Robust Search Experience',
        note: 'Part 1',
        desc: 'Designing a search experience for a B2B learning platform to enable quick content discovery and personalized content assignment, from scratch.',
      },
      {
        slug: 'search-experience-for-guide-2',
        title: 'Guide App: Building a Robust Search Experience',
        note: 'Part 2',
        desc: 'Designing a search and tracking experience for a learning platform that keeps patients engaged between therapy sessions.',
      },
      {
        slug: 'co-design-with-students-with-adhd',
        title: 'Co-Designing with Graduate Students with ADHD',
        desc: 'An in-depth look at a participatory UX research journey.',
      },
      {
        slug: 'filling-cabinets-to-fingertips',
        title: 'Filling Cabinets to Fingertips',
        desc: "Digitizing a 40-year-old paper-based patient management system in a public hospital's specialty clinic.",
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
        desc: 'Exploring chaos to calm.',
      },
      {
        slug: 'branding-for-sugar-rush',
        title: 'Branding for Sugar Rush',
        desc: 'A bakery in Mumbai.',
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
      },
      {
        slug: 'navigating-campus-spaces',
        title: 'Navigating Campus Spaces',
        desc: 'Understanding the iSchool student experience.',
      },
      // title is a placeholder — rename freely
      { slug: 'employee-tool-use-at-intuit', title: 'Mapping Employee Tool Use at Intuit' },
      {
        slug: 'elderease',
        title: 'ElderEase',
        desc: 'Where compassion meets cutting-edge convenience.',
      },
    ],
  },
]

export const projects = categories.flatMap((c) =>
  c.projects.map((p) => ({ ...p, category: c.label })),
)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
