// Layout for "Mapping a Research Data Workflow". Every word comes from
// smarterEhie.js; every colour and measurement from the `sm-` block in
// global.css. See DESIGN.md §4.13 and §11e.
//
// The one thing this page adds is `sm-fig--pan`, for the BPMN diagrams: they
// are 2300 to 5800pt wide, so they scroll sideways at a size the labels
// survive rather than being shrunk to fit the column.

import { smarterEhie } from './smarterEhie'
import { shots } from './smarterEhieArt'
import { Ask, Bullets, Hero, Metas, NCards, Probs, Pull, Section, Stats, Steps } from './smarterParts'

/**
 * A diagram wider than the page. The scroller is focusable and labelled,
 * because a region that only reveals its content by scrolling has to be
 * reachable by keyboard.
 */
const Diagram = ({ shot }) => (
  <figure className="sm-fig sm-fig--pan">
    <div className="sm-pan" tabIndex="0" role="group" aria-label={shot.cap}>
      <img src={shots[shot.img]} alt={shot.alt} loading="lazy" />
    </div>
    <figcaption>{shot.cap}</figcaption>
  </figure>
)

export default function SmarterEhie() {
  const { hero, stats, metas, challenge, method, guide, diagrams, calls, disagreement, open } =
    smarterEhie

  return (
    <article className="sm">
      <Hero drawing="ehie" hero={hero} />

      <section className="sm-sec">
        <Stats items={stats} />
        <Metas items={metas} />
      </section>

      <section className="sm-sec">
        <Section {...challenge} />
        <Pull label={challenge.pullLabel}>{challenge.pull}</Pull>
      </section>

      <section className="sm-sec">
        <Section {...method} />
        <Probs items={method.decisions} />
      </section>

      <section className="sm-sec">
        <Section {...guide} />
        <Steps items={guide.steps} />
        <figure className="sm-fig sm-fig--framed">
          <img src={shots[guide.img]} alt={guide.alt} loading="lazy" />
          <figcaption>{guide.cap}</figcaption>
        </figure>
      </section>

      <section className="sm-sec">
        <Section {...diagrams} />
        {diagrams.shots.map((s) => (
          <Diagram key={s.img} shot={s} />
        ))}
      </section>

      <section className="sm-sec">
        <Section {...calls} />
        <NCards items={calls.items} />
      </section>

      <section className="sm-sec">
        <Section {...disagreement} />
        <Ask {...disagreement.question} />
      </section>

      <section className="sm-sec">
        <Section {...open} />
        <Bullets items={open.items} />
      </section>
    </article>
  )
}
