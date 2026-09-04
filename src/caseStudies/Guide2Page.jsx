// Layout for "Guide App: Building a Robust Search and Track Experience"
// (Part 2). Every word comes from guide2.js; every colour and measurement from
// the `g-` block in global.css, which this page shares with Part 1 under the
// `g--p2` modifier — Part 2 sets its running prose a shade darker and adds the
// colour-coded quote cards. See DESIGN.md §11c.

import Rich from '../lib/rich'
import { guide2 } from './guide2'
import { art, icons, shots } from './guide2Art'

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

const Title = ({ lines, className = 'g-display' }) => (
  <h2 className={className}>
    {(Array.isArray(lines) ? lines : [lines]).map((l) => (
      <span key={l}>{l}</span>
    ))}
  </h2>
)

const Banded = ({ head, children, className = 'g-card' }) => (
  <div className={className}>
    {head}
    <div className="g-band">{children}</div>
  </div>
)

const Arrow = () => (
  <svg className="g-arrow" viewBox="0 0 265 12" aria-hidden="true">
    <path d="M0 6h252" />
    <path d="M251 1.5 264 6l-13 4.5z" strokeWidth="0" fill="currentColor" />
  </svg>
)

/** A quote card, tinted by who said it — the artwork's own colour code. */
const Quote = ({ quote }) => (
  <blockquote className={`g-quotecard g-quotecard--${quote.who.toLowerCase()}`}>
    <Rich value={quote.text} />
  </blockquote>
)

const LEGEND = {
  P: '= Patient Quote (P)',
  T: '= Therapist Quote (T)',
  C: '= Client Quote (C)',
}

const Legend = ({ keys }) => (
  <ul className="g-legend">
    {keys.map((k) => (
      <li key={k}>
        <span className={`g-legend__swatch g-legend__swatch--${k.toLowerCase()}`} />
        {LEGEND[k]}
      </li>
    ))}
  </ul>
)

/** One numbered "what we changed" item: a chip, a line of copy, a picture. */
const Change = ({ item }) => (
  <figure className={'g-change' + (item.wide ? ' g-change--wide' : '')}>
    <figcaption className="g-change__cap">
      <span className="g-change__n">{item.n}</span>
      <span>{item.text}</span>
    </figcaption>
    <Shot name={item.img} alt={item.alt} />
    {item.note && <p className="g-change__note">{item.note}</p>}
  </figure>
)

/* ---------- one feature walkthrough ---------- */

const Feature = ({ feature }) => (
  <section className="g-sec g-feat">
    <h3 className="g-phase__title">{feature.title}</h3>
    {feature.desc && (
      <div className="g-frame g-feat__desc">
        <p>{feature.desc}</p>
      </div>
    )}

    <div className="g-feat__top">
      {feature.hero && <Shot name={feature.hero.img} alt={feature.hero.alt} className="g-shot g-feat__hero" />}
      <div className="g-feat__quotes">
        {feature.descAside && <p className="g-feat__aside">{feature.descAside}</p>}
        {feature.quotes.map((q, i) => (
          <Quote quote={q} key={i} />
        ))}
        {feature.legend && <Legend keys={feature.legend} />}
      </div>
    </div>

    {feature.updated && (
      <>
        {feature.updated.title && (
          <h4 className="g-updated">
            <span>Updated</span> {feature.updated.title.replace(/^Updated\s*/, '')}
          </h4>
        )}
        <div className="g-changes">
          {feature.updated.items.map((it) => (
            <Change item={it} key={it.img} />
          ))}
        </div>
      </>
    )}

    {feature.sub && (
      <div className="g-feat__sub">
        <h4 className="g-kicker g-kicker--xl">{feature.sub.title}</h4>
        <p className="g-feat__aside">{feature.sub.desc}</p>
        <div className="g-feat__top">
          <Shot name={feature.sub.img} alt={feature.sub.alt} className="g-shot g-feat__hero" />
          <div className="g-feat__quotes">
            {feature.sub.quotes.map((q, i) => (
              <Quote quote={q} key={i} />
            ))}
            <Legend keys={feature.sub.legend} />
          </div>
        </div>
      </div>
    )}

    {feature.tail && (
      <div className="g-feat__tail">
        <p className="g-feat__mark" aria-hidden="true">
          {feature.tail.mark}
        </p>
        <div className="g-feat__quotes">
          {feature.tail.quotes.map((q, i) => (
            <Quote quote={q} key={i} />
          ))}
          <Legend keys={feature.tail.legend} />
        </div>
      </div>
    )}
  </section>
)

/* ---------- the page ---------- */

export default function Guide2() {
  const {
    hero,
    pivot,
    meta,
    overview,
    timeline,
    users,
    findings,
    featureAnalysis,
    process,
    testing,
    views,
    future,
  } = guide2

  return (
    <article className="g g--p2">
      {/* ---------------------------------------------------------------- hero */}
      <header className="g-hero">
        <Art name="scout" className="g-hero__art" />
        <div className="g-hero__frame">
          <h1 className="g-h1">
            <b>{hero.lead}</b> {hero.title}
          </h1>
          <p className="g-hero__sub g-band">{hero.sub}</p>
        </div>
      </header>

      {/* --------------------------------------------------------------- pivot */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <Art name="car" />
        </div>
        <div className="g-split__wide">
          <h2 className="g-kicker">{pivot.kicker}</h2>
          <div className="g-prose">
            {pivot.body.map((p, i) => (
              <p key={i}>
                <Rich value={p} />
              </p>
            ))}
          </div>
          <div className="g-pair">
            {pivot.cards.map((c) => (
              <Banded
                key={c.title}
                className="g-card g-meta"
                head={
                  <>
                    <Icon name={c.icon} className="g-meta__icon" />
                    <h3 className="g-meta__title">{c.title}</h3>
                  </>
                }
              >
                <p>{c.text}</p>
              </Banded>
            ))}
          </div>
        </div>
      </section>

      <section className="g-sec g-split">
        <div className="g-split__wide">
          <h2 className="g-rally">{pivot.rally.title}</h2>
          <p className="g-prose">
            <Rich value={pivot.rally.body} />
          </p>
        </div>
        <div className="g-split__narrow">
          <Art name="ship" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- meta */}
      <section className="g-sec g-metas">
        {meta.map((m) => (
          <Banded
            key={m.title}
            className="g-card g-meta"
            head={
              <>
                <Icon name={m.icon} className="g-meta__icon" />
                <h2 className="g-meta__title">{m.title}</h2>
              </>
            }
          >
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

          <h3 className="g-kicker">{overview.problemTitle}</h3>
          <div className="g-frame">
            {overview.problem.map((p, i) => (
              <p className="g-ink" key={i}>
                <Rich value={p} />
              </p>
            ))}
          </div>

          <h3 className="g-kicker g-kicker--lg">{overview.audienceTitle}</h3>
          <div className="g-audience g-band">
            <Icon name="target" className="g-audience__icon" />
            <ul>
              {overview.audience.map((a, i) => (
                <li key={i}>
                  <Rich value={a} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="g-split__narrow">
          <Title lines={overview.title} />
          <Art name="balloon" />
        </div>
      </section>

      {/* ------------------------------------------------------------ timeline */}
      <section className="g-sec">
        <h2 className="g-display g-display--center">{timeline.title}</h2>
        <div className="g-timeline">
          {timeline.phases.map((phase) => (
            <div
              className={`g-tl g-tl--${phase.tone}`}
              key={phase.label}
              style={{ '--tl-cols': phase.steps.length }}
            >
              <h3 className="g-tl__label">{phase.label}</h3>
              <div className="g-tl__panel">
                {phase.steps.map((s, i) => (
                  <div className="g-tl__step" key={s.sprint + i}>
                    <p className="g-tl__head">{s.head}</p>
                    <span className="g-tl__tickrow" aria-hidden="true">
                      <svg className="g-tl__tick" viewBox="0 0 24 24">
                        <rect x="1.5" y="1.5" width="21" height="21" rx="5" />
                        <path d="M6.5 12.4l3.9 3.9 7.1-8.2" />
                      </svg>
                    </span>
                    <p className="g-tl__sprint">{s.sprint}</p>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
          {users.rows.map((r) => (
            <div className="g-userrow g-card" key={r.title}>
              <div className="g-userrow__side">
                <Icon name={r.icon} className="g-who__icon" />
                <h3 className="g-kicker g-kicker--lg">{r.title}</h3>
              </div>
              <ul className="g-bullets">
                {r.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}

          <p className="g-prose g-prose--lead">
            <b>{users.questionsLabel}</b>
            {users.questionsRest}
          </p>
          <ul className="g-questions">
            {users.questions.map((q) => (
              <li key={q.title}>
                <Icon name={q.icon} className="g-questions__icon" />
                <h3 className="g-kicker g-kicker--lg">{q.title}</h3>
                <p className="g-band g-small">{q.text}</p>
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
              <Banded
                className="g-card"
                head={
                  <>
                    <h3 className="g-finding__head">
                      <Icon name={c.icon} className="g-finding__icon" />
                      {c.title}
                    </h3>
                    <p className="g-ink">{c.text}</p>
                  </>
                }
              >
                {c.quotes.map((q, i) => (
                  <p key={i}>
                    <Rich value={q} />
                  </p>
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

      {/* ---------------------------------------------------- feature analysis */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <h2 className="g-kicker g-kicker--xl">{featureAnalysis.kicker}</h2>
          <Art name="shop" />
        </div>
        <div className="g-split__wide">
          <Banded
            className="g-card"
            head={<h3 className="g-kicker g-kicker--lg">{featureAnalysis.whyTitle}</h3>}
          >
            <ul className="g-bullets">
              {featureAnalysis.why.map((w, i) => (
                <li key={i}>
                  <Rich value={w} />
                </li>
              ))}
            </ul>
          </Banded>
        </div>
      </section>

      <section className="g-sec g-fa">
        <div className="g-fa__side">
          <h2 className="g-phase__title">{featureAnalysis.title}</h2>
          <Banded
            className="g-card g-card--warm"
            head={
              <h3 className="g-finding__head">
                <Icon name={featureAnalysis.products.icon} className="g-finding__icon" />
                {featureAnalysis.products.title}
              </h3>
            }
          >
            <div className="g-fa__products">
              <ul>
                {featureAnalysis.products.left.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul>
                {featureAnalysis.products.right.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Banded>
          <Banded
            className="g-card g-card--warm"
            head={
              <h3 className="g-finding__head">
                <Icon name={featureAnalysis.methodology.icon} className="g-finding__icon" />
                {featureAnalysis.methodology.title}
              </h3>
            }
          >
            <p className="g-ink">
              <Rich value={featureAnalysis.methodology.text} />
            </p>
          </Banded>
        </div>
        <div className="g-fa__shots">
          {featureAnalysis.shots.map((s) => (
            <figure key={s.img}>
              <Shot name={s.img} alt={s.caption} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- process */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <h2 className="g-kicker g-kicker--xl">{process.kicker}</h2>
          <Art name="puzzle" />
        </div>
        <div className="g-split__wide">
          <Banded className="g-card" head={<h3 className="g-kicker g-kicker--lg">{process.cardTitle}</h3>}>
            <p>
              <Rich value={process.cardBody} />
            </p>
          </Banded>
        </div>
      </section>

      <section className="g-sec g-phase">
        <h2 className="g-phase__title">{process.title}</h2>
        <div className="g-frame g-phase__lead">
          <p>
            <Rich value={process.lead} />
          </p>
        </div>
        <div className="g-panels">
          {process.panels.map((p) => (
            <figure
              className={'g-panel' + (p.wide ? ' g-panel--wide' : '')}
              key={p.img}
            >
              <div className="g-panel__art">
                <div className="g-panel__caprow">
                  <figcaption className="g-panel__cap">
                    <span className="g-panel__n">{p.n}</span>
                    <span>
                      <b>{p.label}</b>
                      {p.rest}
                    </span>
                  </figcaption>
                  {p.arrow && <Arrow />}
                </div>
                <Shot name={p.img} />
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- testing */}
      <section className="g-sec g-split g-split--flip">
        <div className="g-split__narrow g-split__narrow--wide">
          <h2 className="g-kicker g-kicker--xl">{testing.title}</h2>
          <Art name="cats" />
        </div>
        <div className="g-split__wide g-testcards">
          {testing.cards.map((c) => (
            <Banded key={c.title} className="g-card" head={<h3 className="g-kicker g-kicker--lg">{c.title}</h3>}>
              {c.ordered ? (
                <ol className="g-numbered">
                  {c.items.map((it, i) => (
                    <li key={i}>
                      <Rich value={it} />
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="g-bullets">
                  {c.items.map((it, i) => (
                    <li key={i}>
                      <Rich value={it} />
                    </li>
                  ))}
                </ul>
              )}
            </Banded>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- the two views */}
      {views.map((view) => (
        <div key={view.id}>
          <section className="g-sec g-split">
            <div className="g-viewindex">
              {view.index.map((g) => (
                <div key={g.title}>
                  <h3 className="g-kicker g-kicker--xl">{g.title}</h3>
                  <ul className="g-bullets">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="g-split__narrow">
              <h2 className="g-kicker g-kicker--xl">{view.title}</h2>
              <Art name="reader" />
            </div>
          </section>

          {view.features.map((f) => (
            <Feature feature={f} key={f.title} />
          ))}

          {/* The export ships these CTAs as flat artwork with no URL behind
              them, so they render as marked placeholders. See guide2.js. */}
          <p className="g-proto">
            <span className="g-proto__title">{view.prototype.title}</span>
            <span className="g-proto__cta" aria-disabled="true">
              {view.prototype.cta}
            </span>
            <span className="g-proto__todo">Link to come</span>
          </p>
        </div>
      ))}

      {/* -------------------------------------------------------------- future */}
      <section className="g-sec g-split">
        <ul className="g-future">
          {future.cards.map((c) => (
            <li key={c.title}>
              <h3 className="g-kicker g-kicker--lg">{c.title}</h3>
              {c.todo ? (
                <p className="g-todo">
                  Copy for this card is still to be written — the Figma export repeats the
                  Calendar Integration paragraph here.
                </p>
              ) : (
                <p className="g-band">{c.text}</p>
              )}
            </li>
          ))}
        </ul>
        <div className="g-split__narrow">
          <Title lines={future.title} />
          <Art name="future" />
        </div>
      </section>
    </article>
  )
}
