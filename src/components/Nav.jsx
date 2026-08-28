import { content } from '../content'

export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="nav__mark" aria-label={`${content.nameRoman} — home`}>
        {content.name}
      </a>
      <div className="nav__links">
        {content.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
