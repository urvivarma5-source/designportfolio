// Layout for "A Library You Can Compare Sensors In". Every word comes from
// smarterLib.js; every colour and measurement from the `sm-` block in
// global.css. See DESIGN.md §4.13 and §11e.
//
// The one thing this page adds is `.sm-pair`, the wide-plus-narrow figure row
// in §02: the listing and the filter drawer are one decision seen twice.

import { smarterLib } from './smarterLib'
import { shots } from './smarterLibArt'
import { Bullets, Cards, Hero, Metas, NCards, Probs, Pull, Section, Stats, Table } from './smarterParts'

const Fig = ({ name, alt, cap, wide = true }) => (
  <figure className={wide ? 'sm-fig sm-fig--wide sm-fig--framed' : 'sm-fig sm-fig--framed'}>
    <img src={shots[name]} alt={alt} loading="lazy" />
    {cap && <figcaption>{cap}</figcaption>}
  </figure>
)

export default function SmarterLib() {
  const { hero, stats, metas, challenge, browse, select, compare, system, submit, access, open } =
    smarterLib

  return (
    <article className="sm">
      <Hero drawing="lib" hero={hero} />

      <section className="sm-sec">
        <Stats items={stats} />
        <Metas items={metas} />
      </section>

      <section className="sm-sec">
        <Section {...challenge} />
        <Probs items={challenge.jobs} />
      </section>

      <section className="sm-sec">
        <Section {...browse} />
        <NCards items={browse.decisions} />
        <div className="sm-pair">
          {browse.shots.map((s) => (
            <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} wide={false} />
          ))}
        </div>
      </section>

      <section className="sm-sec">
        <Section {...select} />
        <Table head={['The rule', 'Why']} rows={select.rules} />
      </section>

      <section className="sm-sec">
        <Section {...compare} />
        <Pull label={compare.pullLabel}>{compare.pull}</Pull>
        <Fig name={compare.img} alt={compare.alt} cap={compare.cap} />
      </section>

      <section className="sm-sec">
        <Section {...system} />
        {system.shots.map((s) => (
          <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} />
        ))}
      </section>

      <section className="sm-sec">
        <Section {...submit} />
        <Cards items={submit.decisions} />
        <Fig name={submit.img} alt={submit.alt} cap={submit.cap} />
      </section>

      <section className="sm-sec">
        <Section {...access} />
        <Bullets items={access.items} />
        <Fig name={access.img} alt={access.alt} cap={access.cap} />
      </section>

      <section className="sm-sec">
        <Section {...open} />
        <Bullets items={open.items} />
      </section>
    </article>
  )
}
