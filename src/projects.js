// Names only for now — enough to wire up and test navigation.
// Each detail page is intentionally blank; content comes later.
export const projects = [
  { slug: 'search-experience-for-guide', title: 'Search Experience for Guide' },
  { slug: 'co-design-with-students-with-adhd', title: 'Co-Design with Students with ADHD' },
  { slug: 'filling-cabinets-to-fingertips', title: 'Filling Cabinets to Fingertips' },
  { slug: 'website-redesign-for-ngma-mumbai', title: 'Website Redesign for NGMA Mumbai' },
  { slug: 'navigating-campus-spaces', title: 'How Students Use Space on Campus' },
  { slug: 'ux-research-and-design-with-ai', title: 'UX Research and Design with AI' },
  { slug: 'elderease', title: 'ElderEase' },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
