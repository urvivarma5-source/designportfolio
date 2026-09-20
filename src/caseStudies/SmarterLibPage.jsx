// Layout for "A library you can compare sensors in". Every word comes from
// smarterLib.js; every colour and measurement from the `sm-` block in
// global.css. See DESIGN.md §4.13 and §11e.
//
// The only thing this page adds is `.sm-pair`, the wide-plus-narrow figure row
// in §02: the browse listing and the filter drawer are one decision shown
// twice, and reading them apart loses the point.

import { smarterLib } from './smarterLib'
import { shots } from './smarterLibArt'
import { Cards, Head, Hero, Metas, OpenList, Stats, Table } from './smarterParts'

const Fig = ({ name, alt, cap, wide = false }) => (
  <figure className={wide ? 'sm-fig sm-fig--wide sm-fig--framed' : 'sm-fig sm-fig--framed'}>
    <img src={shots[name]} alt={alt} loading="lazy" />
    {cap && <figcaption>{cap}</figcaption>}
  </figure>
)

export default function SmarterLib() {
  const { hero, brief, browse, select, compare, system, submit, access, open } = smarterLib

  return (
    <article className="sm">
      <Hero drawing="lib" hero={hero} />
      <Metas meta={hero.meta} />

      <section className="sm-sec">
        <Head n={brief.n} title={brief.title} body={brief.body} />
        {/* The prototype's own counts. They measure the build, not its impact,
            which is why the work card still carries no metrics row. */}
        <Stats items={brief.stats} />
      </section>

      <section className="sm-sec">
        <Head n={browse.n} title={browse.title} body={browse.body} />
        <Cards
          wide
          items={browse.decisions.map((d, i) => ({ ...d, icon: i === 0 ? 'filter' : undefined }))}
        />
        <div className="sm-pair">
          {browse.shots.map((s) => (
            <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} />
          ))}
        </div>
      </section>

      <section className="sm-sec">
        <Head n={select.n} title={select.title} body={select.body} />
        <Table head={['The rule', 'Why']} rows={select.rules} />
      </section>

      <section className="sm-sec">
        <Head n={compare.n} title={compare.title} body={compare.body} />
        <Fig name={compare.img} alt={compare.alt} cap={compare.cap} wide />
      </section>

      <section className="sm-sec">
        <Head n={system.n} title={system.title} body={system.body} />
        {system.shots.map((s) => (
          <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} wide />
        ))}
      </section>

      <section className="sm-sec">
        <Head n={submit.n} title={submit.title} body={submit.body} />
        <Cards items={submit.decisions} />
        <Fig name={submit.img} alt={submit.alt} cap={submit.cap} wide />
      </section>

      <section className="sm-sec">
        <Head n={access.n} title={access.title} body={access.body} />
        <OpenList items={access.items} />
        <Fig name={access.img} alt={access.alt} cap={access.cap} wide />
      </section>

      <section className="sm-sec">
        <Head n={open.n} title={open.title} body={open.body} />
        <OpenList items={open.items} />
      </section>
    </article>
  )
}
