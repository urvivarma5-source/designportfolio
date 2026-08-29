import { Link, useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import { getProject } from '../projects'

// Deliberately blank for now — the title is here only so navigation is
// testable. Case-study content comes later.
export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)

  return (
    <>
      <Nav />
      <article className="project">
        <Link className="project__back" to="/#work">
          &larr; Work
        </Link>
        <h1 className="project__title">{project ? project.title : 'Not found'}</h1>
        {!project && (
          <p className="project__note">No project matches &ldquo;{slug}&rdquo;.</p>
        )}
      </article>
    </>
  )
}
