import { Link } from 'react-router-dom'
import { content } from '../content'

export default function Nav() {
  return (
    <nav className="nav">
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
