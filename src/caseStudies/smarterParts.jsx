// The pieces all three SMARTER pages are built from. They exist because the
// three pages are one design language, exactly as `.g`'s two pages are, and
// repeating this markup three times is how the three would drift apart.
//
// Every piece here mirrors one of the Guide's: `Banded` is `.g-card` with its
// tint band, `Hero` is `.g-hero`, `Metas` is `.g-metas`. See DESIGN.md §4.13.

import { icons, art, metaIcons } from './smarterArt'

export const Icon = ({ name, className = 'sm-icon' }) =>
  icons[name] ? (
    <img className={className} src={icons[name]} alt="" aria-hidden="true" />
  ) : null

/** A dashed card whose lower half carries the tint band. */
export const Banded = ({ head, children, className = 'sm-card' }) => (
  <div className={className}>
    {head}
    <div className="sm-band">{children}</div>
  </div>
)

/**
 * The hero: the drawing in its own column, the title and its banded sub-line
 * inside a dashed frame beside it. The title splits on its first colon so the
 * lead reads bold and the rest regular, which is how the Guide sets its own.
 */
export const Hero = ({ drawing, hero }) => {
  const [lead, ...rest] = hero.title.split(':')
  const tail = rest.join(':')

  return (
    <header className="sm-hero">
      <img className="sm-hero__art" src={art[drawing]} alt="" aria-hidden="true" />
      <div className="sm-hero__frame">
        <h1 className="sm-h1">
          {tail ? (
            <>
              <b>{lead}:</b>
              {tail}
            </>
          ) : (
            <b>{lead}</b>
          )}
        </h1>
        <p className="sm-hero__sub sm-band">{hero.sub}</p>
      </div>
    </header>
  )
}

/** The four meta cards. Same four, same order, same icons on every page. */
export const Metas = ({ meta }) => (
  <section className="sm-sec sm-metas">
    {meta.map((m, i) => (
      <Banded
        key={m.k}
        className="sm-card sm-meta"
        head={
          <>
            <Icon name={metaIcons[i]} className="sm-meta__icon" />
            <h2 className="sm-meta__title">{m.k}</h2>
          </>
        }
      >
        <p>{m.v}</p>
      </Banded>
    ))}
  </section>
)

/** A section's number and its slab-serif kicker, then its opening prose. */
export const Head = ({ n, title, body }) => (
  <>
    <header className="sm-head">
      <p className="sm-num">{n}</p>
      <h2 className="sm-kicker">{title}</h2>
    </header>
    {body && (
      <div className="sm-prose sm-lede">
        {body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    )}
  </>
)

/**
 * A row of named decisions, each a dashed card with its body on the band. The
 * `icon` is optional: the Guide only puts one on a card that opens a section.
 */
export const Cards = ({ items, wide = false }) => (
  <div className={wide ? 'sm-cards sm-cards--2' : 'sm-cards'}>
    {items.map((c) => (
      <Banded
        key={c.t}
        head={
          <>
            {c.icon && <Icon name={c.icon} className="sm-card__icon" />}
            <h3 className="sm-card__title">{c.t}</h3>
          </>
        }
      >
        <p>{c.d}</p>
        {c.src && <span className="sm-card__src">{c.src}</span>}
      </Banded>
    ))}
  </div>
)

export const Stats = ({ items }) => (
  <ul className="sm-stats">
    {items.map((s) => (
      <li key={s.k}>
        <span className="sm-stats__v">{s.v}</span>
        <span className="sm-stats__k">{s.k}</span>
      </li>
    ))}
  </ul>
)

export const Table = ({ head, rows }) => (
  <table className="sm-table">
    <thead>
      <tr>
        <th scope="col">{head[0]}</th>
        <th scope="col">{head[1]}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(([a, b]) => (
        <tr key={a}>
          <th scope="row">{a}</th>
          <td>{b}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export const OpenList = ({ items }) => (
  <ul className="sm-open">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
)

/**
 * The one question per page that was still open at handover. A dashed card
 * like any other; only its label is set in the prose red, so it reads as a
 * question rather than a finding.
 */
export const Ask = ({ label, body, after }) => (
  <Banded
    className="sm-card sm-ask"
    head={
      <>
        <Icon name="question" className="sm-card__icon" />
        <p className="sm-ask__label">{label}</p>
      </>
    }
  >
    <p>{body}</p>
    {after && <p className="sm-ask__after">{after}</p>}
  </Banded>
)
