import { Link, useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import { getCaseStudy } from '../caseStudies'
import { getProject } from '../projects'

// Projects with a case study in src/caseStudies render it; the rest still show
// a title only, until their content exists.
export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  const CaseStudy = getCaseStudy(slug)

  return (
    <>
      <Nav inset />
      <article className="project">
        <Link className="project__back" to="/#work">
          &larr; Work
        </Link>

        {CaseStudy ? (
          <CaseStudy />
        ) : (
          <>
            <h1 className="project__title">{project ? project.title : 'Not found'}</h1>
            {!project && (
              <p className="project__note">No project matches &ldquo;{slug}&rdquo;.</p>
            )}
          </>
        )}
      </article>
    </>
  )
}
