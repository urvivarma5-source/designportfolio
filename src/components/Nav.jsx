import { Link } from 'react-router-dom'
import { content } from '../content'

/**
 * `inset` adds the padding the hero would otherwise supply, so the nav sits on
 * the same lines on a page that is not the hero. Without it a detail page's nav
 * lands flush against the top-left corner — see DESIGN.md §9.12.
 */
export default function Nav({ inset = false }) {
  return (
    <nav className={inset ? 'nav nav--inset' : 'nav'}>
      <Link className="mark" to="/" aria-label={content.nameRoman}>
        {content.logo}
      </Link>

      <div className="nav-links">
        {content.nav.map((item) => (
          <Link key={item.label} to={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
