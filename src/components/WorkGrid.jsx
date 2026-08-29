import { Link } from 'react-router-dom'
import DashFrame from './DashFrame'
import { categories } from '../projects'

// Two-column card grid per category. The media block is a placeholder until
// real images exist — add an `image` field per project and swap the div for an
// <img> when they do.
export default function WorkGrid() {
  return (
    <div className="work">
      {categories.map((cat) => (
        <section className="work-cat" key={cat.id}>
          <h3 className="work-cat__label">{cat.label}</h3>

          <ul className="work-grid">
            {cat.projects.map((p) => (
              <li key={p.slug}>
                <Link className="work-card" to={`/work/${p.slug}`} data-cursor="view">
                  <DashFrame />
                  <span className="work-card__media" aria-hidden="true">
                    <span className="work-card__wave" />
                  </span>
                  {/* note and desc are always rendered, empty when absent, so
                      every card reserves the same space and they all match
                      height across categories */}
                  <span className="work-card__meta">
                    <span className="work-card__note">{p.note || ''}</span>
                    <span className="work-card__title">{p.title}</span>
                    <span className="work-card__desc">{p.desc || ''}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
