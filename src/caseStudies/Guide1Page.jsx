// Layout for "Guide App: Building a Robust Search Experience" (Part 1). Every
// word comes from guide1.js; every colour and measurement from the `g-` block
// in global.css. The Part 2 page shares that block — see DESIGN.md §11c.
//
// The artwork's frame is 1498pt of content against this page's 1180px, so the
// sizes in the CSS are the export's own point values times --g-k. Rows that
// look asymmetric here are asymmetric in the artwork: it alternates a wide
// text column with a narrow one holding a slab-serif title and a drawing.

import Rich from './rich'
import { guide1 } from './guide1'
import { art, icons, logos, marks, shots } from './guide1Art'

/* ---------- small shared pieces ---------- */

const Icon = ({ name, className = 'g-icon' }) => (
  <img className={className} src={icons[name]} alt="" aria-hidden="true" />
)

const Art = ({ name, className = 'g-art' }) => (
  <img className={className} src={art[name]} alt="" aria-hidden="true" />
)

const Shot = ({ name, alt = '', className = 'g-shot' }) => (
  <img className={className} src={shots[name]} alt={alt} loading="lazy" />
)

/** The slab-serif display title that sits beside a text column. */
const Title = ({ lines, className = 'g-display' }) => (
  <h2 className={className}>
    {(Array.isArray(lines) ? lines : [lines]).map((l) => (
      <span key={l}>{l}</span>
    ))}
  </h2>
)

/** A dashed card whose lower half carries the tint band. */
const Banded = ({ head, children, className = 'g-card' }) => (
  <div className={className}>
    {head}
    <div className="g-band">{children}</div>
  </div>
)

/** The coral connector the artwork draws between two numbered panels. */
const Arrow = () => (
  <svg className="g-arrow" viewBox="0 0 265 12" aria-hidden="true">
    <path d="M0 6h252" />
    <path d="M251 1.5 264 6l-13 4.5z" strokeWidth="0" fill="currentColor" />
  </svg>
)

/**
 * One numbered image panel. The artwork has two kinds and they are not
 * interchangeable: a *framed* panel is a dashed box with its caption on a
 * short tint bar above it, and a plain one is a tint panel with the caption
 * sitting inside it, above the picture. Both put the connector arrow in the
 * white between this panel's caption and the next one's.
 */
const Cap = ({ panel }) => (
  <figcaption className="g-panel__cap">
    <span className="g-panel__n">{panel.n}</span>
    <span>
      <b>{panel.label}</b>
      {panel.rest}
    </span>
  </figcaption>
)

const Panel = ({ panel }) => (
  <figure className={'g-panel' + (panel.wide ? ' g-panel--wide' : '')}>
    {panel.framed ? (
      <>
        <div className="g-panel__caprow">
          <div className="g-band">
            <Cap panel={panel} />
          </div>
          {panel.arrow && <Arrow />}
        </div>
        <div className="g-panel__art g-panel__art--framed">
          <Shot name={panel.img} />
        </div>
      </>
    ) : (
      <div className="g-panel__art">
        <div className="g-panel__caprow">
          <Cap panel={panel} />
          {panel.arrow && <Arrow />}
        </div>
        <Shot name={panel.img} />
      </div>
    )}
  </figure>
)

/* ---------- the page ---------- */

export default function Guide1() {
  const {
    hero,
    meta,
    overview,
    hmw,
    competitors,
    insights,
    vision,
    users,
    findings,
    journeys,
    sprint,
    phases,
    outro,
  } = guide1

  const [mapping, sketching, deciding, prototyping, testing] = phases

  return (
    <article className="g">
      {/* ---------------------------------------------------------------- hero */}
      <header className="g-hero">
        <Art name="scout" className="g-hero__art" />
        <div className="g-hero__frame">
          <h1 className="g-h1">
            <b>{hero.lead}</b> {hero.title}
          </h1>
          <p className="g-hero__sub g-band">
            <Rich value={hero.sub} />
          </p>
        </div>
      </header>

      {/* ---------------------------------------------------------------- meta */}
      <section className="g-sec g-metas">
        {meta.map((m) => (
          <Banded key={m.title} className="g-card g-meta" head={
            <>
              <Icon name={m.icon} className="g-meta__icon" />
              <h2 className="g-meta__title">{m.title}</h2>
            </>
          }>
            {m.lines.map((l, i) => (
              <p key={i}>
                <Rich value={l} />
              </p>
            ))}
            {m.note && (
              <p className="g-meta__note">
                <Rich value={m.note} />
              </p>
            )}
          </Banded>
        ))}
      </section>

      {/* ------------------------------------------------------------ overview */}
      <section className="g-sec g-split">
        <div className="g-split__wide">
          <h2 className="g-kicker">{overview.kicker}</h2>
          <div className="g-prose">
            {overview.body.map((p, i) => (
              <p key={i}>
                <Rich value={p} />
              </p>
            ))}
          </div>
          <div className="g-pair">
            {overview.pair.map((c) => (
              <div className="g-pair__item" key={c.title}>
                <h3 className="g-kicker">{c.title}</h3>
                <div className="g-frame g-frame--tight">
                  <p className="g-ink">
                    <Rich value={c.text} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="g-split__narrow">
          <Title lines={overview.title} />
          <Art name="balloon" />
        </div>
      </section>

      {/* ----------------------------------------------------------------- hmw */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <h2 className="g-kicker g-kicker--lg">{hmw.kicker}</h2>
          <Art name="puzzle" />
        </div>
        <div className="g-split__wide">
          <Banded className="g-card" head={<h3 className="g-kicker g-kicker--lg">{hmw.title}</h3>}>
            <p>{hmw.body}</p>
          </Banded>
        </div>
      </section>

      {/* --------------------------------------------------------- competitors */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow">
          <Title lines={competitors.title} />
          <Art name="question" />
        </div>
        <div className="g-split__wide">
          <h2 className="g-kicker">{competitors.kicker}</h2>
          <p className="g-prose">{competitors.body}</p>
          <table className="g-table">
            <thead>
              <tr>
                <th scope="col">{competitors.rowHead}</th>
                {competitors.columns.map((c) => (
                  <th scope="col" key={c}>
                    <Rich value={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.has.map((yes, i) => (
                    <td key={i}>
                      <img
                        src={yes ? marks.check : marks.cross}
                        alt={yes ? 'yes' : 'no'}
                        className="g-mark"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* -------------------------------------------------------- key insights */}
      <section className="g-sec g-split g-split--insights">
        <div>
          <h2 className="g-kicker">{insights.title}</h2>
          <ul className="g-insights">
            {insights.cards.map((c) => (
              <li key={c.title}>
                <Banded className="g-card" head={<h3 className="g-card__title">{c.title}</h3>}>
                  <p className="g-small">
                    <b>Gap:</b> {c.gap}
                    <br />
                    <b>Opportunity:</b> {c.opportunity}
                  </p>
                </Banded>
              </li>
            ))}
          </ul>
        </div>

        {/* The 2×2 map. Marks are placed off the artwork's own coordinates. */}
        <div className="g-map">
          <p className="g-map__y g-map__y--high">
            <span className="g-map__axis">{insights.map.yAxis.title}</span>
            <span>{insights.map.yAxis.high}</span>
          </p>
          <p className="g-map__y g-map__y--low">{insights.map.yAxis.low}</p>
          <p className="g-map__x g-map__x--low">
            <span className="g-map__axis">{insights.map.xAxis.title}</span>
            <span>{insights.map.xAxis.low}</span>
          </p>
          <p className="g-map__x g-map__x--high">{insights.map.xAxis.high}</p>
          <div className="g-map__plot">
            {insights.map.marks.map((m) => (
              <figure
                className="g-map__mark"
                key={m.logo}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <img src={logos[m.logo]} alt="" aria-hidden="true" />
                <figcaption>{m.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- vision */}
      <section className="g-sec g-split">
        <div className="g-split__wide">
          <h2 className="g-kicker">{vision.kicker}</h2>
          <div className="g-prose">
            {vision.body.map((p, i) => (
              <p key={i}>
                <Rich value={p} />
              </p>
            ))}
          </div>
          <ul className="g-quotes">
            {vision.quotes.map((q) => (
              <li key={q.title}>
                <Banded className="g-card" head={<h3 className="g-card__title">{q.title}</h3>}>
                  <p className="g-quote">
                    <Rich value={q.text} />
                  </p>
                </Banded>
              </li>
            ))}
          </ul>
        </div>
        <div className="g-split__narrow">
          <Title lines={vision.title} />
          <Art name="gear" />
        </div>
      </section>

      <section className="g-sec g-sec--tight">
        <h3 className="g-kicker g-kicker--xl">{vision.canvasTitle}</h3>
        <Shot
          name="business-model-canvas"
          alt="Business model canvas for Guide, filled in across all nine blocks."
          className="g-shot g-shot--full"
        />
      </section>

      {/* --------------------------------------------------------------- users */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow">
          <Title lines={users.title} />
          <Art name="bears" />
        </div>
        <div className="g-split__wide">
          <h2 className="g-kicker">{users.kicker}</h2>
          <p className="g-prose">
            <b>{users.strategyLabel}</b>
            {users.strategyRest}
          </p>

          <div className="g-who">
            <Banded className="g-card" head={
              <>
                <Icon name={users.from.icon} className="g-who__icon" />
                <h3 className="g-kicker g-kicker--lg">{users.from.title}</h3>
              </>
            }>
              <ul className="g-bullets">
                {users.from.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Banded>

            <p className="g-who__link">
              <span>{users.connector}</span>
              <Arrow />
            </p>

            <Banded className="g-card" head={
              <>
                <Icon name={users.to.icon} className="g-who__icon" />
                <h3 className="g-kicker g-kicker--lg">{users.to.title}</h3>
              </>
            }>
              <ul className="g-bullets">
                {users.to.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Banded>
          </div>

          <p className="g-prose g-prose--lead">
            <b>{users.questionsLabel}</b>
            {users.questionsRest}
          </p>
          <ul className="g-questions">
            {users.questions.map((q) => (
              <li key={q.title}>
                <Icon name={q.icon} className="g-questions__icon" />
                <h3 className="g-kicker g-kicker--lg">{q.title}</h3>
                <p className="g-band g-small">
                  <Rich value={q.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ findings */}
      <section className="g-sec g-split g-split--findings">
        <ul className="g-findings">
          {findings.cards.map((c) => (
            <li key={c.title}>
              <Banded className="g-card" head={
                <>
                  <h3 className="g-finding__head">
                    <Icon name={c.icon} className="g-finding__icon" />
                    {c.title}
                  </h3>
                  <p className="g-ink">
                    <Rich value={c.text} />
                  </p>
                </>
              }>
                {c.quotes.map((q) => (
                  <p key={q}>{q}</p>
                ))}
              </Banded>
            </li>
          ))}
        </ul>
        <div className="g-split__narrow">
          <Title lines={findings.title} />
          <Art name="film" />
        </div>
      </section>

      {/* ------------------------------------------------------------ journeys */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <h2 className="g-kicker g-kicker--lg">{journeys.title}</h2>
          <Art name="puzzle" />
        </div>
        <div className="g-split__wide">
          <Banded className="g-card" head={<h3 className="g-kicker g-kicker--lg">{journeys.cardTitle}</h3>}>
            <p>
              <Rich value={journeys.body} />
            </p>
          </Banded>
        </div>
      </section>

      <section className="g-sec g-sec--tight g-journeymaps">
        {journeys.maps.map((m) => (
          <Shot key={m.img} name={m.img} alt={m.alt} className="g-shot g-shot--full" />
        ))}
      </section>

      {/* -------------------------------------------------------------- sprint */}
      <section className="g-sec g-split g-split--sprint">
        <div>
          <Banded className="g-card" head={<h2 className="g-kicker g-kicker--lg">{sprint.cardTitle}</h2>}>
            <p>
              <Rich value={sprint.body} />
            </p>
          </Banded>
          <Shot
            name="sprint-strip"
            alt="Hand-lettered strip: Map, Sketch, Decide, Prototype, Test."
            className="g-shot g-sprintstrip"
          />
        </div>
        <div className="g-split__narrow">
          <Title lines={sprint.title} />
          <Art name="reader" />
        </div>
      </section>

      {/* ---------------------------------------------------------- 1. mapping */}
      <section className="g-sec g-phase">
        <h2 className="g-phase__title">
          {mapping.num} {mapping.title}
        </h2>
        <div className="g-mapping">
          <Banded className="g-card" head={
            <p>
              <Rich value={mapping.lead} />
            </p>
          }>
            <h3 className="g-kicker g-kicker--lg">{mapping.goal.title}</h3>
            <p>
              <Rich value={mapping.goal.text} />
            </p>
          </Banded>
          <ul className="g-sprintqs">
            {mapping.questions.map((q) => (
              <li className="g-band" key={q.title}>
                <h3 className="g-kicker g-kicker--lg">{q.title}</h3>
                <p>{q.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="g-panels">
          {mapping.panels.map((p) => (
            <Panel key={p.img} panel={p} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- 2. sketching */}
      <section className="g-sec g-phase">
        <h2 className="g-phase__title">
          {sketching.num} {sketching.title}
        </h2>
        <div className="g-frame g-phase__lead">
          <p>
            <Rich value={sketching.lead} />
          </p>
        </div>
        <div className="g-panels">
          {sketching.panels.map((p) => (
            <Panel key={p.img} panel={p} />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- 3. deciding */}
      <section className="g-sec g-phase">
        <h2 className="g-phase__title">
          {deciding.num} {deciding.title}
        </h2>
        <div className="g-frame g-phase__lead">
          <p>
            <Rich value={deciding.lead} />
          </p>
        </div>
        <div className="g-panels">
          {deciding.panels.map((p) => (
            <Panel key={p.img} panel={p} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ 4. prototyping */}
      <section className="g-sec g-phase">
        <h2 className="g-phase__title">
          {prototyping.num} {prototyping.title}
        </h2>
        <div className="g-frame g-phase__lead">
          <p>{prototyping.lead}</p>
        </div>
        <div className="g-screens">
          <div className="g-screens__col">
            {prototyping.screens.left.map((s) => (
              <Shot key={s.img} name={s.img} alt={s.alt} />
            ))}
          </div>
          <div className="g-screens__col">
            <Shot {...{ name: prototyping.screens.mid.img, alt: prototyping.screens.mid.alt }} />
          </div>
          <div className="g-screens__col">
            {prototyping.screens.right.map((s) => (
              <Shot key={s.img} name={s.img} alt={s.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 5. testing */}
      <section className="g-sec g-phase">
        <h2 className="g-phase__title">
          {testing.num} {testing.title}
        </h2>
        <div className="g-frame g-phase__lead">
          <p>
            <Rich value={testing.lead} />
          </p>
        </div>
        <ul className="g-tests">
          {testing.cards.map((c) => (
            <li key={c.title}>
              <Banded className="g-card" head={
                <>
                  <h3 className="g-finding__head">
                    <Icon name={c.icon} className="g-finding__icon" />
                    {c.title}
                  </h3>
                  <p className="g-ink">
                    <Rich value={c.text} />
                  </p>
                </>
              }>
                <p>
                  <Rich value={c.quote} />
                </p>
              </Banded>
            </li>
          ))}
        </ul>
      </section>

      <p className="g-outro">{outro}</p>
    </article>
  )
}
