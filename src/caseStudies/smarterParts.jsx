// The pieces all three SMARTER pages are built from. They exist because the
// three pages are one design language and repeating this markup three times is
// how the three would drift apart.
//
// Every piece here mirrors one of TCTD's: `Section` is its label plus bold
// italic serif title, `Probs` is its dashed icon cards, `NCards` is its
// numbered solid cards, `Stats` is its figure row. Not everything here has a
// TCTD twin: `Specs` exists because the form should follow the content rather
// than the reference.
// See DESIGN.md §4.13.

import Rich from '../lib/rich'
import { icons, art } from './smarterArt'

/**
 * The dashed frame, drawn rather than bordered. CSS `border-style: dashed`
 * lets the browser pick the dash length; Urvi's stroke is an exact one (dash
 * 10, gap 10, flat cap, miter join), so it is an SVG rect whose user units are
 * CSS pixels. Infographics only: never round an image with this.
 */
export const DashFrame = ({ radius = 9 }) => (
  <svg className="sm-dashframe" aria-hidden="true" preserveAspectRatio="none">
    <rect rx={radius} />
  </svg>
)

export const Icon = ({ name, className }) =>
  icons[name] ? (
    <img className={className} src={icons[name]} alt="" aria-hidden="true" />
  ) : null

/** The hero: line art in a narrow column, the title in a dashed frame. */
export const Hero = ({ drawing, hero }) => (
  <header className="sm-hero">
    <img className="sm-hero__art" src={art[drawing]} alt="" aria-hidden="true" />
    <div className="sm-hero__frame">
      <DashFrame radius={10} />
      <h1 className="sm-h1">{hero.title}</h1>
      <p className="sm-hero__sub">
        <Rich value={hero.sub} />
      </p>
    </div>
  </header>
)

/** The four dashed figure cards. */
export const Stats = ({ items }) => (
  <ul className="sm-stats">
    {items.map((s) => (
      <li className="sm-stat" key={s.k}>
        <DashFrame />
        <Icon name={s.icon} className="sm-stat__icon" />
        <span className="sm-stat__v">{s.v}</span>
        <span className="sm-stat__k">{s.k}</span>
      </li>
    ))}
  </ul>
)

/** The four unframed meta items under the stat row. */
export const Metas = ({ items }) => (
  <ul className="sm-metas">
    {items.map((m) => (
      <li key={m.title}>
        <Icon name={m.icon} className="sm-meta__icon" />
        <p className="sm-meta__title">{m.title}</p>
        <p className="sm-meta__v">
          <Rich value={m.v} />
        </p>
      </li>
    ))}
  </ul>
)

/** A section's label, its bold italic serif title, and its short lede. */
export const Section = ({ label, title, lede }) => (
  <>
    <p className="sm-label">{label}</p>
    <h2 className="sm-title">{title}</h2>
    {lede && (
      <div className="sm-lede">
        {lede.map((p, i) => (
          <p key={i}>
            <Rich value={p} />
          </p>
        ))}
      </div>
    )}
  </>
)

/**
 * How many columns a card grid takes, and how far its last card stretches, so
 * a row is never left with one card sitting alone in it.
 *
 * Urvi's rule, 2026-09-26: "never have overflow items like this." A grid sized
 * by `auto-fit` picks its column count from the available width and ignores
 * how many cards there are, which is how seven cards ended up as 3 + 3 + 1.
 *
 * Columns divide the count where they can. Where they cannot, the last card
 * spans the empty cells, which reads as deliberate rather than left over:
 *
 *   2 -> 2 cols        3 -> 3 cols        4 -> 2 x 2
 *   5 -> 2 cols, last spans 2             6 -> 3 x 2
 *   7 -> 3 cols, last spans 3
 *
 * Cutting a card to reach a round number is the other fix, and it is the right
 * one when the card is weak. It is the wrong one when the count is load
 * bearing: nav §02 has seven because the §03 figure numbers seven problems
 * against seven answers. See DESIGN.md §4.13.
 */
const gridFit = (n) => {
  const cols = n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : n >= 6 ? 3 : 2
  const rem = n % cols
  return {
    '--cols': cols,
    '--last-span': rem ? cols - rem + 1 : 1,
    // The narrow breakpoint is always two columns, so the last card stretches
    // there whenever the count is odd.
    '--last-span-narrow': n % 2 ? 2 : 1,
  }
}

/** Numbered solid cards. The number is a counter, so order is the numbering. */
export const NCards = ({ items }) => (
  <ol className="sm-ncards" style={gridFit(items.length)}>
    {items.map((c) => (
      <li className="sm-ncard" key={c.t}>
        <div className="sm-ncard__head">
          <h3 className="sm-ncard__title">{c.t}</h3>
        </div>
        <p className="sm-ncard__body">
          <Rich value={c.d} />
        </p>
      </li>
    ))}
  </ol>
)

/** Dashed cards: icon, serif title, an orange note, prose on the tint band. */
export const Probs = ({ items }) => (
  <div className="sm-probs" style={gridFit(items.length)}>
    {items.map((p) => (
      <div className="sm-prob" key={p.t}>
        <DashFrame />
        <Icon name={p.icon} className="sm-prob__icon" />
        <h3 className="sm-prob__title">{p.t}</h3>
        <p className="sm-prob__note">{p.note || ' '}</p>
        <p className="sm-prob__text">
          <Rich value={p.d} />
        </p>
      </div>
    ))}
  </div>
)

/** Three short steps side by side, for a sequence that must not be prose. */
export const Steps = ({ items }) => (
  <ol className="sm-steps">
    {items.map((s, i) => (
      <li className="sm-step" key={s.t}>
        <span className="sm-step__n">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="sm-step__t">{s.t}</h3>
        <p className="sm-step__d">
          <Rich value={s.d} />
        </p>
      </li>
    ))}
  </ol>
)

/**
 * A set of specification values. Deliberately not TCTD's bar chart: a bar
 * implies a magnitude worth comparing, and a row height against an icon size
 * is not that. Same visual language, honest form.
 */
export const Specs = ({ items }) => (
  <div className="sm-specs">
    <DashFrame />
    {items.map((b) => (
      <div className="sm-spec" key={b.k}>
        <span className="sm-spec__k">{b.k}</span>
        <span className="sm-spec__v">{b.v}</span>
        <span className="sm-spec__note">{b.note}</span>
      </div>
    ))}
  </div>
)

/** A flow set as chips with arrows between, never as a sentence. */
export const Chips = ({ label, items }) => (
  <div className="sm-flow">
    {label && <p className="sm-card__label">{label}</p>}
    <ul className="sm-chips">
      {items.map((c) => (
        <li key={c}>
          <span className="sm-chip">{c}</span>
        </li>
      ))}
    </ul>
  </div>
)

export const Bullets = ({ items }) => (
  <ul className="sm-bullets">
    {items.map((i) => (
      <li key={i}>
        <Rich value={i} />
      </li>
    ))}
  </ul>
)

/** Solid cards with a labelled block inside, TCTD's Department A / B shape. */
export const Cards = ({ items }) => (
  <div className="sm-cards">
    {items.map((c) => (
      <div className="sm-card" key={c.t}>
        <h3 className="sm-card__title">{c.t}</h3>
        {c.sub && <p className="sm-card__sub">{c.sub}</p>}
        {c.label && <p className="sm-card__label">{c.label}</p>}
        <p className="sm-card__body">
          <Rich value={c.body} />
        </p>
      </div>
    ))}
  </div>
)

export const Pull = ({ label, children }) => (
  <div className="sm-pull-wrap">
    {label && <p className="sm-label">{label}</p>}
    <p className="sm-pull">{children}</p>
  </div>
)

/** The one question per page that was still open at handover. */
export const Ask = ({ label, body, after }) => (
  <aside className="sm-ask">
    <DashFrame />
    <p className="sm-ask__label">{label}</p>
    <p>
      <Rich value={body} />
    </p>
    {after && <p className="sm-ask__after">{after}</p>}
  </aside>
)

/**
 * An input map: what you press or click, and what the component does. Grouped
 * by what you are touching, with the trigger drawn as a key rather than set as
 * bold text.
 *
 * This replaced a two-column table. The table was correct and unreadable: nine
 * rows of bold phrase against sentence, where four of the nine are arrow keys
 * that a reader recognises as a shape far faster than as the word "Right".
 * A `<kbd>` is also the right element for it, which the table's `<th>` was not.
 */
export const Keymap = ({ groups }) => (
  <div className="sm-keymap">
    {groups.map((g) => (
      <section className="sm-keygroup" key={g.label}>
        <h3 className="sm-keygroup__head">
          <Icon name={g.icon} className="sm-keygroup__icon" />
          {g.label}
        </h3>
        <dl className="sm-keyrows">
          {g.rows.map((r) => (
            <div className="sm-keyrow" key={r.keys.join('+')}>
              <dt className="sm-keyrow__keys">
                {r.keys.map((k) =>
                  // A condition is not something you press, so it is a plain
                  // chip and a <span>. `<kbd>` means keyboard input, and
                  // "Under 1024 px" is not that.
                  g.kind === 'state' ? (
                    <span className="sm-cond" key={k}>
                      {k}
                    </span>
                  ) : (
                    // A single glyph gets a square cap; a phrase keeps its width.
                    <kbd className={k.length === 1 ? 'sm-key sm-key--glyph' : 'sm-key'} key={k}>
                      {k}
                    </kbd>
                  ),
                )}
              </dt>
              <dd className="sm-keyrow__d">
                <Rich value={r.d} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </div>
)

/**
 * Task results with a completion rate. The bar is the point: three tasks at
 * 100% and one at 0% is the finding of the round, and a row of bars says it
 * before the sentences do.
 *
 * The bar is `aria-hidden` and the figure is real text beside it, so the
 * number is never only a length.
 */
export const Results = ({ items }) => (
  <ol className="sm-results">
    {items.map((r) => (
      <li className={r.pct ? 'sm-result' : 'sm-result sm-result--zero'} key={r.t}>
        <div className="sm-result__head">
          <h3 className="sm-result__t">{r.t}</h3>
          <span className="sm-result__pct">{r.pct}%</span>
        </div>
        <div className="sm-result__track" aria-hidden="true">
          <span className="sm-result__fill" style={{ width: `${r.pct}%` }} />
        </div>
        <p className="sm-result__d">
          <Rich value={r.d} />
        </p>
        {r.quote && <p className="sm-result__quote">{r.quote}</p>}
      </li>
    ))}
  </ol>
)
