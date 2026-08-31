// Layout for the "Filling Cabinets to Fingertips" case study. Every word comes
// from tctd.js; every colour and measurement from the `cs-` block in
// global.css. See DESIGN.md §11b for the fidelity rule this page follows:
// the artwork's own palette is kept, and only its serif is swapped for --serif.

import { icons } from './icons'
import { tctd } from './tctd'

/* ---------- small shared pieces ---------- */

const Icon = ({ name, className = 'cs-icon' }) => (
  <img className={className} src={icons[name]} alt="" aria-hidden="true" />
)

const Badge = ({ n }) => <span className="cs-badge">{n}</span>

/** The dashed connector used between a "before" and an "after" panel. */
const DashArrow = () => (
  <svg className="cs-arrow" viewBox="0 0 62 12" aria-hidden="true">
    <path d="M1 6h44" strokeDasharray="7 5" />
    <path d="M43 1.5 50.5 6 43 10.5" />
  </svg>
)

/** The solid connector used inside a principle card. */
const SolidArrow = () => (
  <svg className="cs-arrow cs-arrow--solid" viewBox="0 0 26 14" aria-hidden="true">
    <path d="M1 7h21" />
    <path d="M17 2 23 7l-6 5" />
  </svg>
)

const Lead = ({ num, heading, body }) => (
  <header className="cs-lead">
    <p className="cs-num">{num}</p>
    <h2 className="cs-h2">{heading}</h2>
    {body && <p className="cs-body">{body}</p>}
  </header>
)

/* ---------- the page ---------- */

export default function Tctd() {
  const {
    hero,
    overview,
    challenge,
    research,
    system,
    findings,
    time,
    strategy,
    principles,
    translations,
    outcomes,
    reflections,
  } = tctd

  return (
    <article className="cs">
      {/* ---------------------------------------------------------------- hero */}
      <header className="cs-hero">
        <div className="cs-hero__art">
          <Icon name="cabinet" className="cs-hero__cabinet" />
          <Icon name="arrow" className="cs-hero__arrow" />
          <Icon name="board" className="cs-hero__board" />
        </div>

        <div className="cs-hero__frame">
          <h1 className="cs-h1">{hero.title}</h1>
          <p className="cs-hero__sub cs-band">{hero.sub}</p>
        </div>
      </header>

      {/* ------------------------------------------------------------ overview */}
      <section className="cs-sec">
        <header className="cs-lead">
          <p className="cs-num">{overview.eyebrow}</p>
          <h2 className="cs-h2">{overview.heading}</h2>
        </header>

        <ul className="cs-stats">
          {overview.stats.map((s) => (
            <li className="cs-stat" key={s.value + s.icon}>
              <Icon name={s.icon} className="cs-stat__icon" />
              <p className="cs-stat__value">{s.value}</p>
              <p className="cs-stat__label cs-band">
                {s.label.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <ul className="cs-meta">
          {overview.meta.map((m) => (
            <li className="cs-meta__item" key={m.title}>
              <Icon name={m.icon} className="cs-meta__icon" />
              <h3 className="cs-meta__title">{m.title}</h3>
              <p className="cs-meta__lines">
                {m.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- 01 challenge */}
      <section className="cs-sec">
        <Lead num={challenge.num} heading={challenge.heading} />
        <div className="cs-body cs-body--stack">
          {challenge.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="cs-probs">
          {challenge.cards.map((c) => (
            <li className="cs-prob" key={c.title}>
              <Icon name={c.icon} className="cs-prob__icon" />
              <h3 className="cs-prob__title">{c.title}</h3>
              <p className="cs-prob__note">{c.note}</p>
              <p className="cs-prob__text cs-band">
                {c.text}
                {c.strong && <strong>{c.strong}</strong>}
                {c.tail}
              </p>
            </li>
          ))}
        </ul>

        <div className="cs-depts">
          {challenge.departments.map((d) => (
            <section className="cs-card cs-dept" key={d.title}>
              <h3 className="cs-dept__title">{d.title}</h3>
              <p className="cs-dept__note">{d.note}</p>

              <h4 className="cs-caps">Patient Flow</h4>
              <ol className="cs-flow">
                {d.flow.map((step, i) => (
                  <li key={step + i}>
                    <span className="cs-chip">{step}</span>
                    {i < d.flow.length - 1 && (
                      <span className="cs-flow__sep" aria-hidden="true">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <h4 className="cs-caps">Key Issues Identified</h4>
              <ul className="cs-issues">
                {d.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="cs-pull">
          <p className="cs-num cs-num--center">{challenge.constraint.label}</p>
          <p className="cs-quote">{challenge.constraint.quote}</p>
        </div>
      </section>

      {/* ---------------------------------------------------------- 02 research */}
      <section className="cs-sec">
        <Lead num={research.num} heading={research.heading} body={research.body} />

        <ol className="cs-weeks">
          {research.weeks.map((w, i) => (
            <li className="cs-week" key={w.week} data-step={i + 1}>
              <div className="cs-week__band">
                <p className="cs-week__label">{w.week}</p>
                <p className="cs-week__title">{w.title}</p>
              </div>
              <p className="cs-week__count">{w.count}</p>
              <p className="cs-week__unit">{research.countLabel}</p>
            </li>
          ))}
        </ol>

        <ul className="cs-methods">
          {research.methods.map((m) => (
            <li className="cs-method" key={m.title}>
              <h3 className="cs-method__title">{m.title}</h3>
              <p className="cs-method__text">{m.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ 03 system */}
      <section className="cs-sec">
        <Lead num={system.num} heading={system.heading} body={system.body} />

        <ol className="cs-journey">
          {system.steps.map((s, i) => (
            <li className="cs-step" key={s.stage}>
              <span className="cs-step__n">{i + 1}</span>
              <h3 className="cs-step__stage">{s.stage}</h3>
              <Icon name={s.icon} className="cs-step__icon" />
              <p className="cs-step__artifact">{s.artifact}</p>
              <p className="cs-step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------- 04 findings */}
      <section className="cs-sec">
        <Lead num={findings.num} heading={findings.heading} body={findings.body} />

        <ul className="cs-grid2">
          {findings.items.map((f, i) => (
            <li className="cs-card cs-find" key={f.title}>
              <h3 className="cs-card__title">
                {f.title}
                <Badge n={i + 1} />
              </h3>
              {f.text.map((p) => (
                <p className="cs-card__text" key={p}>
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------------- 05 time */}
      <section className="cs-sec">
        <Lead num={time.num} heading={time.heading} body={time.body} />

        <div className="cs-timebox">
          <ul className="cs-times">
            {time.rows.map((r) => (
              <li className="cs-time" key={r.label}>
                <p className="cs-time__label">{r.label}</p>
                <div className="cs-time__track">
                  <span
                    className={r.peak ? 'cs-time__fill cs-time__fill--peak' : 'cs-time__fill'}
                    style={{ width: `${r.fill * 100}%` }}
                  />
                  <span className="cs-time__value">{r.value}</span>
                  <span className="cs-time__note">{r.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- 06 strategy */}
      <section className="cs-sec">
        <Lead num={strategy.num} heading={strategy.heading} body={strategy.body} />

        <div className="cs-translate">
          <div className="cs-translate__box cs-translate__box--paper">
            <p className="cs-translate__title">{strategy.from.title}</p>
            <p className="cs-translate__note">{strategy.from.note}</p>
          </div>

          <div className="cs-translate__link">
            <DashArrow />
            <p className="cs-translate__linkTitle">{strategy.link.title}</p>
            <p className="cs-translate__note">{strategy.link.note}</p>
          </div>

          <div className="cs-translate__box cs-translate__box--digital">
            <p className="cs-translate__title">{strategy.to.title}</p>
            <p className="cs-translate__note">{strategy.to.note}</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- 07 principles */}
      <section className="cs-sec">
        <Lead num={principles.num} heading={principles.heading} body={principles.body} />

        <ul className="cs-grid2">
          {principles.items.map((p, i) => (
            <li className="cs-card cs-principle" key={p.title}>
              <h3 className="cs-card__title">
                {p.title}
                <Badge n={i + 1} />
              </h3>
              <div className="cs-principle__pair">
                <div className="cs-panel cs-panel--pain">
                  <p className="cs-panel__label">{principles.painLabel}</p>
                  <p className="cs-panel__text">{p.pain}</p>
                </div>
                <SolidArrow />
                <div className="cs-panel cs-panel--principle">
                  <p className="cs-panel__label">{principles.principleLabel}</p>
                  <p className="cs-panel__text">{p.principle}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="cs-pull">
          <p className="cs-num cs-num--center">{principles.framing.label}</p>
          <p className="cs-pull__lead">{principles.framing.lead}</p>
          <p className="cs-quote cs-quote--light">{principles.framing.quote}</p>
        </div>
      </section>

      {/* ----------------------------------------------------- 08 translations */}
      <section className="cs-sec">
        <Lead num={translations.num} heading={translations.heading} body={translations.body} />

        <ul className="cs-grid2">
          {translations.items.map((t, i) => (
            <li className="cs-card cs-trans" key={t.id}>
              <h3 className="cs-card__title">
                {t.title}
                <Badge n={i + 1} />
              </h3>

              <div className="cs-trans__pair">
                <div className="cs-trans__side">
                  <p className="cs-trans__title">{t.before.title}</p>
                  <p className="cs-trans__note">{t.before.note}</p>
                  <div className="cs-mock cs-mock--paper">
                    <Mock id={t.id} side="before" data={t} />
                  </div>
                </div>

                <DashArrow />

                <div className="cs-trans__side">
                  <p className="cs-trans__title">{t.after.title}</p>
                  <p className="cs-trans__note">{t.after.note}</p>
                  <div className="cs-mock cs-mock--digital">
                    <Mock id={t.id} side="after" data={t} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="cs-pull">
          <p className="cs-num cs-num--center">{translations.result.label}</p>
          <p className="cs-pull__lead">{translations.result.lead}</p>
          <p className="cs-quote cs-quote--light">{translations.result.note}</p>
        </div>
      </section>

      {/* ---------------------------------------------------------- 09 outcomes */}
      <section className="cs-sec">
        <Lead num={outcomes.num} heading={outcomes.heading} body={outcomes.body} />

        <ul className="cs-compare">
          {outcomes.compare.map((c) => (
            <li className="cs-compare__item" key={c.label}>
              {c.cols ? (
                <div className="cs-compare__cols">
                  {c.cols.map((col) => (
                    <div key={col.head}>
                      <p className="cs-compare__head">{col.head}</p>
                      <p
                        className={
                          col.accent ? 'cs-compare__value cs-compare__value--after' : 'cs-compare__value'
                        }
                      >
                        {col.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cs-compare__single">
                  <p className="cs-compare__value cs-compare__value--after">{c.single.value}</p>
                  <p className="cs-compare__head cs-compare__head--under">{c.single.note}</p>
                </div>
              )}
              <p className="cs-compare__label">{c.label}</p>
            </li>
          ))}
        </ul>

        <ul className="cs-card cs-figures">
          {outcomes.quad.map((q) => (
            <li key={q.value + q.label[0]}>
              <p className="cs-figure__value">{q.value}</p>
              <p className="cs-figure__label">
                {q.label.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <ul className="cs-headline">
          {outcomes.headline.map((h) => (
            <li className="cs-headline__item" key={h.value}>
              <p className="cs-headline__value">{h.value}</p>
              <div>
                <p className="cs-headline__title">{h.title}</p>
                <p className="cs-headline__note">{h.note}</p>
                {h.bar && (
                  <p className="cs-headline__bar">
                    <span style={{ width: `${h.bar.fill * 100}%` }} />
                    <em>{h.bar.note}</em>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <ul className="cs-card cs-figures cs-figures--trio">
          {outcomes.trio.map((t) => (
            <li key={t.value}>
              <p className="cs-figure__value">{t.value}</p>
              <p className="cs-figure__label">
                {t.label.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------- 10 reflections */}
      <section className="cs-sec">
        <Lead num={reflections.num} heading={reflections.heading} body={reflections.body} />

        <ul className="cs-grid2">
          {reflections.items.map((r, i) => (
            <li className="cs-card cs-reflect" key={r.title}>
              <h3 className="cs-card__title">
                {r.title}
                <Badge n={i + 1} />
              </h3>
              {r.text.map((p) => (
                <p className="cs-card__text" key={p}>
                  {p}
                </p>
              ))}
              <p className="cs-reflect__takeaway">
                <span aria-hidden="true">→ </span>
                {r.takeaway}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

/* ---------------------------------------------------------------------------
   The six paper→digital mockups in §08. Each is a miniature of a real screen,
   so each is its own small piece of markup rather than a shared shape.
--------------------------------------------------------------------------- */
function Mock({ id, side, data }) {
  const before = side === 'before'

  if (id === 'status') {
    return before ? (
      <div className="cs-xls">
        <span className="cs-xls__head" />
        {['red', 'green', 'amber'].map((tone) => (
          <span className="cs-xls__row" key={tone}>
            <i data-tone={tone} />
            <b />
          </span>
        ))}
      </div>
    ) : (
      <ul className="cs-legend">
        {data.legend.map((l) => (
          <li key={l.label}>
            <i data-tone={l.tone} />
            <span>{l.label}</span>
            <b data-tone={l.tone}>{l.count}</b>
          </li>
        ))}
      </ul>
    )
  }

  if (id === 'scheduling') {
    return before ? (
      <div className="cs-crowd">
        <Icon name="crowd" className="cs-mock__icon" />
        <p className="cs-mock__big">{data.crowd.time}</p>
        <p className="cs-mock__warn">{data.crowd.note}</p>
      </div>
    ) : (
      <table className="cs-slots">
        <thead>
          <tr>
            {data.head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slots.map((s) => (
            <tr key={s.time}>
              <td>{s.time}</td>
              <td>
                <span className="cs-dots">{'▪'.repeat(s.dots)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (id === 'records') {
    return before ? (
      <div className="cs-paper">
        <Icon name="folder" className="cs-mock__icon" />
        <p className="cs-mock__warn">{data.paper}</p>
      </div>
    ) : (
      <div className="cs-record">
        <p className="cs-record__uid">{data.uid}</p>
        <span className="cs-record__line" />
        <span className="cs-record__line cs-record__line--short" />
        <p className="cs-record__synced">☁ {data.synced}</p>
      </div>
    )
  }

  if (id === 'reminders') {
    return before ? (
      <div className="cs-paper">
        <Icon name="bell" className="cs-mock__icon" />
        <p className="cs-mock__big cs-mock__big--sm">{data.paper.title}</p>
        <p className="cs-mock__warn">{data.paper.note}</p>
      </div>
    ) : (
      <div className="cs-sms">
        <p className="cs-sms__bubble">
          <strong>Reminder:</strong> {data.message.replace('Reminder: ', '')}
        </p>
        <p className="cs-sms__reply">{data.reply}</p>
      </div>
    )
  }

  if (id === 'cross-dept') {
    return before ? (
      <div className="cs-silo">
        <p>
          <span className="cs-tag" data-tone="blue">
            Dept A
          </span>
          <em aria-hidden="true">✕</em>
          <span className="cs-tag" data-tone="violet">
            Dept B
          </span>
        </p>
        <p className="cs-mock__warn cs-mock__warn--strong">{data.paper}</p>
      </div>
    ) : (
      <div className="cs-unified">
        <p className="cs-unified__head">{data.patient}</p>
        <div className="cs-unified__cols">
          {data.depts.map((d) => (
            <div key={d.name} data-tone={d.tone}>
              <p className="cs-unified__name">{d.name}</p>
              <p>{d.visits}</p>
              <p>{d.last}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // queue
  return before ? (
    <div className="cs-paper">
      <Icon name="clerk" className="cs-mock__icon" />
      <p className="cs-mock__big cs-mock__big--sm">{data.paper.title}</p>
      <p className="cs-mock__warn">{data.paper.note}</p>
    </div>
  ) : (
    <div className="cs-queue">
      <p className="cs-queue__now">
        <i /> {data.serving}
      </p>
      {data.queue.map((q) => (
        <p className="cs-queue__row" key={q}>
          {q}
        </p>
      ))}
    </div>
  )
}
