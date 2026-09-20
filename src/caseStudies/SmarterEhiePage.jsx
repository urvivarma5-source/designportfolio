// Layout for "Mapping a research data workflow". Every word comes from
// smarterEhie.js; every colour and measurement from the `sm-` block in
// global.css. See DESIGN.md §4.13 and §11e.
//
// The only thing this page adds is `sm-fig--pan`, for the BPMN diagrams: they
// are 2300 to 5800pt wide and a page column cannot hold one at a readable
// size, so they scroll sideways inside their own figure rather than being
// shrunk until the labels vanish.

import { smarterEhie } from './smarterEhie'
import { shots } from './smarterEhieArt'
import { Ask, Cards, Head, Hero, Metas, OpenList, Stats } from './smarterParts'

/**
 * A diagram wider than the page. The scroller is focusable and labelled,
 * because a region that only reveals its content by scrolling has to be
 * reachable by keyboard.
 */
const Diagram = ({ shot }) => (
  <figure className="sm-fig sm-fig--wide sm-fig--pan">
    <div className="sm-pan" tabIndex="0" role="group" aria-label={shot.cap}>
      <img src={shots[shot.img]} alt={shot.alt} loading="lazy" />
    </div>
    <figcaption>{shot.cap}</figcaption>
  </figure>
)

export default function SmarterEhie() {
  const { hero, brief, method, guide, diagrams, calls, disagreement, open } = smarterEhie

  return (
    <article className="sm">
      <Hero drawing="ehie" hero={hero} />
      <Metas meta={hero.meta} />

      <section className="sm-sec">
        <Head n={brief.n} title={brief.title} body={brief.body} />
        <Stats items={brief.stats} />
      </section>

      <section className="sm-sec">
        <Head n={method.n} title={method.title} body={method.body} />
        <Cards
          items={method.decisions.map((d, i) => ({
            ...d,
            icon: ['diagram', 'states', 'problem'][i],
          }))}
        />
      </section>

      <section className="sm-sec">
        <Head n={guide.n} title={guide.title} body={guide.body} />
        <figure className="sm-fig sm-fig--wide sm-fig--framed">
          <img src={shots[guide.img]} alt={guide.alt} loading="lazy" />
          <figcaption>{guide.cap}</figcaption>
        </figure>
      </section>

      <section className="sm-sec">
        <Head n={diagrams.n} title={diagrams.title} body={diagrams.body} />
        {diagrams.shots.map((s) => (
          <Diagram key={s.img} shot={s} />
        ))}
      </section>

      <section className="sm-sec">
        <Head n={calls.n} title={calls.title} body={calls.body} />
        <Cards items={calls.items} />
      </section>

      <section className="sm-sec">
        <Head
          n={disagreement.n}
          title={disagreement.title}
          body={disagreement.body}
        />
        <Ask {...disagreement.method} />
      </section>

      <section className="sm-sec">
        <Head n={open.n} title={open.title} body={open.body} />
        <OpenList items={open.items} />
      </section>
    </article>
  )
}
