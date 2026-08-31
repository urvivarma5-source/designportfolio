// Slug → case-study component. A project with an entry here renders its own
// page; one without falls back to the title-only stub in pages/Project.jsx.
import Tctd from './TctdPage'
import { tctd } from './tctd'
import Guide1 from './Guide1Page'
import { guide1 } from './guide1'
import Guide2 from './Guide2Page'
import { guide2 } from './guide2'

export const caseStudies = {
  [tctd.slug]: Tctd,
  [guide1.slug]: Guide1,
  [guide2.slug]: Guide2,
}

export const getCaseStudy = (slug) => caseStudies[slug]
