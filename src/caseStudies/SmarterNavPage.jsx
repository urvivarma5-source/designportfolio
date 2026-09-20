// Layout for "Making a sensor station navigable". Every word comes from
// smarterNav.js; every colour and measurement from the `sm-` block in
// global.css, which is `.g` with the SMARTER palette. See DESIGN.md §4.13
// and §11e.
//
// Icons are chosen here, not in the data file, for the same reason work-card
// art lives in `CardThumb.jsx` rather than in `projects.js`: a section's icon
// is markup, not copy.

import { smarterNav } from './smarterNav'
import { shots } from './smarterNavArt'
import { Ask, Cards, Head, Hero, Metas, OpenList, Stats, Table } from './smarterParts'
import { icons } from './smarterArt'

const ruleIcon = icons.rule

const Fig = ({ name, alt, cap, wide = false }) => (
  <figure className={wide ? 'sm-fig sm-fig--wide sm-fig--framed' : 'sm-fig sm-fig--framed'}>
    <img src={shots[name]} alt={alt} loading="lazy" />
    {cap && <figcaption>{cap}</figcaption>}
  </figure>
)

export default function SmarterNav() {
  const { hero, brief, first, rule, click, states, rules, scope, situ, why, open } = smarterNav

  return (
    <article className="sm">
      <Hero drawing="nav" hero={hero} />
      <Metas meta={hero.meta} />

      <section className="sm-sec">
        <Head n={brief.n} title={brief.title} body={brief.body} />
        <p className="sm-note">{brief.note}</p>
      </section>

      {/* The seven problems are numbered to match the annotations printed on
          the sheet below them, so the list and the picture read together. */}
      <section className="sm-sec">
        <Head n={first.n} title={first.title} body={first.body} />
        <ol className="sm-problems">
          {first.problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <Fig name={first.img} alt={first.alt} wide />
      </section>

      <section className="sm-sec">
        <Head n={rule.n} title={rule.title} body={rule.body} />
        {/* A framed quote rather than a titled card: giving it a heading
            would mean writing a heading the work does not have. */}
        <div className="sm-frame sm-quote-wrap">
          <img className="sm-card__icon" src={ruleIcon} alt="" aria-hidden="true" />
          <p className="sm-quote sm-ink">{rule.pull}</p>
        </div>
        <Fig name={rule.img} alt={rule.alt} wide />
      </section>

      <section className="sm-sec">
        <Head n={click.n} title={click.title} body={click.body} />
        <Fig name={click.img} alt={click.alt} wide />
      </section>

      <section className="sm-sec">
        <Head n={states.n} title={states.title} body={states.body} />
        <Stats items={states.specs.map((s) => ({ v: s.v, k: s.k }))} />
        <p className="sm-note">{states.note}</p>
        <Fig name={states.img} alt={states.alt} wide />
      </section>

      <section className="sm-sec">
        <Head n={rules.n} title={rules.title} body={rules.body} />
        <Table head={['When you', 'The navigator']} rows={rules.table} />
      </section>

      <section className="sm-sec">
        <Head n={scope.n} title={scope.title} body={scope.body} />
        <Cards
          wide
          items={scope.moves.map((m, i) => ({ ...m, icon: i === 0 ? 'states' : 'filter' }))}
        />
        <Ask {...scope.question} />
        <Fig name={scope.img} alt={scope.alt} wide />
      </section>

      <section className="sm-sec">
        <Head n={situ.n} title={situ.title} body={situ.body} />
        {situ.shots.map((s) => (
          <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} wide />
        ))}
      </section>

      <section className="sm-sec">
        <Head n={why.n} title={why.title} />
        <Cards items={why.items.map((i, n) => ({ ...i, icon: n === 0 ? 'problem' : undefined }))} />
      </section>

      <section className="sm-sec">
        <Head n={open.n} title={open.title} body={open.body} />
        <OpenList items={open.items} />
      </section>
    </article>
  )
}
