import { Link } from 'react-router-dom'
import { projects } from '../projects'

export default function WorkGrid() {
  return (
    <ul className="work-grid">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link className="work-card" to={`/work/${p.slug}`}>
            <span className="work-card__title">{p.title}</span>
            <span className="work-card__arw" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
