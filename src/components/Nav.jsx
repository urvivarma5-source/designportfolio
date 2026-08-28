import { content } from '../content'

export default function Nav() {
  return (
    <nav className="nav">
      <a className="mark" href="#top">
        {content.nameRoman} <span>{content.markSuffix}</span>
      </a>

      <div className="nav-links">
        {content.nav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <div className="nav-utils">
        {content.langs.map((l) => (
          <a key={l.label} href={l.href} className={l.active ? 'on' : undefined}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
