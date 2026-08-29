// Projects, grouped exactly as specified. Detail pages are still blank.
//
// Three entries are new and have no page content yet: smarter-project,
// branding-for-sugar-rush, and employee-tool-use-at-intuit — the last of which
// needed a name inventing (brief was "studying employee tool usage and
// identifying potential for AI integrations at Intuit").
export const categories = [
  {
    id: 'product-design',
    label: 'Product Design',
    projects: [
      { slug: 'smarter-project', title: 'SMARTER Project' },
      { slug: 'search-experience-for-guide', title: 'Search Experience for Guide' },
      { slug: 'co-design-with-students-with-adhd', title: 'Co-Design with Students with ADHD' },
      { slug: 'filling-cabinets-to-fingertips', title: 'Filling Cabinets to Fingertips' },
    ],
  },
  {
    id: 'visual-design',
    label: 'Visual Design',
    projects: [
      { slug: 'website-redesign-for-ngma-mumbai', title: 'Website Redesign for NGMA Mumbai' },
      {
        slug: 'branding-for-sugar-rush',
        title: 'Branding for Sugar Rush',
        note: 'A bakery in Mumbai',
      },
    ],
  },
  {
    id: 'ux-research',
    label: 'UX Research',
    projects: [
      { slug: 'ux-research-and-design-with-ai', title: 'UX Research and Design with AI' },
      { slug: 'navigating-campus-spaces', title: 'How Students Use Space on Campus' },
      {
        slug: 'employee-tool-use-at-intuit',
        title: 'Mapping Employee Tool Use at Intuit',
        note: 'Placeholder name — rename freely',
      },
    ],
  },
]

// Not in the supplied categorisation, so it is not shown. Kept here rather than
// deleted so it can be restored by moving it into a category above.
export const uncategorised = [{ slug: 'elderease', title: 'ElderEase' }]

export const projects = categories.flatMap((c) =>
  c.projects.map((p) => ({ ...p, category: c.label })),
)

export const getProject = (slug) =>
  projects.find((p) => p.slug === slug) || uncategorised.find((p) => p.slug === slug)
