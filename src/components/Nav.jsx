import { content } from '../content'

export default function Nav() {
  return (
    <nav className="nav">
      <a className="mark" href="#top" aria-label={content.nameRoman}>
        {content.logo}
      </a>

      <div className="nav-links">
        {content.nav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
