import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getThumb } from './CardThumb'
import { getCaseStudy } from '../caseStudies'
import { categories } from '../projects'

// One large card per project, stacked, under a row of category tabs. Modelled
// on nicolearoberts.com's case-study list — see DESIGN.md §4.5.
//
// The tabs are a real WAI-ARIA tablist rather than a row of buttons: arrow
// keys move between them and only the selected tab is in the tab order, so the
// whole control is one stop. A pill row that answers clicks alone is a
// mouse-only control.

const TABS = [{ id: 'all', label: 'All' }, ...categories.map((c) => ({ id: c.id, label: c.label }))]

// Flattened once, carrying the category down so a card can print it as its
// eyebrow and the tabs can filter on it.
const ALL = categories.flatMap((c) =>
  c.projects.map((p) => ({ ...p, category: c.label, categoryId: c.id })),
)

/** Projects for a tab, finished case studies first. Array.sort is stable, so
 *  each group keeps its projects.js order. */
const forTab = (tabId) => {
  const list = tabId === 'all' ? ALL : ALL.filter((p) => p.categoryId === tabId)
  const ready = (p) => (getCaseStudy(p.slug) ? 0 : 1)
  return [...list].sort((a, b) => ready(a) - ready(b))
}

function Card({ project }) {
  const Thumb = getThumb(project.slug)
  // "Coming soon" is derived, never stored: publishing a case study flips its
  // card with no edit to projects.js, and a card can never promise a page that
  // does not exist.
  const href = getCaseStudy(project.slug) ? `/work/${project.slug}` : null

  return (
    <article className={Thumb ? 'work-card' : 'work-card work-card--text'}>
      <div className="work-card__body">
        {/* category · context · note, the middots drawn by CSS. `context` is
            the product or domain (Guide App, NGMA Mumbai); `note` is a
            sequence label (Part 1) and takes the accent. */}
        <p className="work-card__eyebrow">
          {project.category}
          {project.context && <span className="work-card__context">{project.context}</span>}
          {project.note && <span className="work-card__note">{project.note}</span>}
        </p>

        <h3 className="work-card__title">{project.title}</h3>

        {/* One paragraph, not two. `outcome` says what the work achieved and
            supersedes the one-line `desc`, which is all a project without a
            case study has. Rendering both made the card a wall of text. */}
        {(project.outcome || project.desc) && (
          <p className="work-card__outcome">{project.outcome || project.desc}</p>
        )}

        {project.tags && (
          <ul className="work-card__tags">
            {project.tags.map((tag) => (
              <li className="work-card__tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* a <dl>, so each label belongs to its figure. .work-card__metric is
            column-reverse to put the figure on top — see DESIGN.md §4.5 */}
        {project.metrics && (
          <dl className="work-card__metrics">
            {project.metrics.map((metric) => (
              <div className="work-card__metric" key={metric.label}>
                <dt className="work-card__label">{metric.label}</dt>
                <dd className="work-card__value">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="work-card__actions">
          {href ? (
            <Link className="work-btn work-btn--primary" to={href}>
              View case study
            </Link>
          ) : (
            <span className="work-btn work-btn--soon" aria-disabled="true">
              Case study coming soon
            </span>
          )}

          {project.live && (
            <a
              className="work-btn work-btn--secondary"
              href={project.live.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.live.label}
              <span className="work-btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          )}
        </div>
      </div>

      {/* The art is the same link as the button above, so it is hidden from
          assistive tech and taken out of the tab order: keyboard and screen
          reader users meet the destination once, with a real label. */}
      {Thumb &&
        (href ? (
          <Link
            className="work-card__media"
            to={href}
            aria-hidden="true"
            tabIndex={-1}
            data-cursor="view"
          >
            <Thumb />
          </Link>
        ) : (
          <span className="work-card__media" aria-hidden="true">
            <Thumb />
          </span>
        ))}
    </article>
  )
}

export default function WorkGrid() {
  // Opens on the first real category rather than "All": Product Design is the
  // work Urvi wants seen first (2026-09-24). "All" stays as a tab.
  const [active, setActive] = useState(categories[0].id)
  const tabRefs = useRef([])

  // Arrow keys move and select in one step, which is the expected behaviour
  // for a tablist whose panels are cheap to render.
  const onKeyDown = (event) => {
    const last = TABS.length - 1
    const i = TABS.findIndex((t) => t.id === active)
    let next = null

    if (event.key === 'ArrowRight') next = i === last ? 0 : i + 1
    else if (event.key === 'ArrowLeft') next = i === 0 ? last : i - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return

    event.preventDefault()
    setActive(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  const shown = forTab(active)

  return (
    <div className="work">
      <div className="work-tabs" role="tablist" aria-label="Project categories" onKeyDown={onKeyDown}>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`work-tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls="work-panel"
            tabIndex={active === tab.id ? 0 : -1}
            ref={(el) => (tabRefs.current[i] = el)}
            className="work-tab"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="work-list" id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${active}`}>
        {shown.map((project) => (
          <li key={project.slug}>
            <Card project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}
