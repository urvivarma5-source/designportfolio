// Layout for "Making a Sensor Station Navigable". Every word comes from
// smarterNav.js; every colour and measurement from the `sm-` block in
// global.css, which follows TCTD. See DESIGN.md §4.13 and §11e.

import { smarterNav } from './smarterNav'
import { shots } from './smarterNavArt'
import {
  Ask, Bullets, Chips, Cards, Hero, Keymap, Metas, NCards, Probs,
  Pull, Section, Specs, Stats, Steps,
} from './smarterParts'

const Fig = ({ name, alt, cap, wide = true }) => (
  <figure className={wide ? 'sm-fig sm-fig--framed' : 'sm-fig sm-fig--framed'}>
    <img src={shots[name]} alt={alt} loading="lazy" />
    {cap && <figcaption>{cap}</figcaption>}
  </figure>
)

export default function SmarterNav() {
  const { hero, stats, metas, challenge, first, rule, click, states, rules, scope, situ, why, open } =
    smarterNav

  return (
    <article className="sm">
      <Hero drawing="nav" hero={hero} />

      <section className="sm-sec">
        <Stats items={stats} />
        <Metas items={metas} />
      </section>

      <section className="sm-sec">
        <Section {...challenge} />
        <Chips label={challenge.flowLabel} items={challenge.flow} />
        <p className="sm-note">{challenge.note}</p>
      </section>

      {/* The seven numbered cards carry the same numbering as the annotations
          printed on the sheet below them, so the two read together. */}
      <section className="sm-sec">
        <Section {...first} />
        <NCards items={first.problems} />
        <Fig name={first.img} alt={first.alt} />
      </section>

      <section className="sm-sec">
        <Section {...rule} />
        <Pull label={rule.pullLabel}>{rule.pull}</Pull>
        <Fig name={rule.img} alt={rule.alt} />
      </section>

      <section className="sm-sec">
        <Section {...click} />
        <Steps items={click.steps} />
        <Fig name={click.img} alt={click.alt} />
      </section>

      <section className="sm-sec">
        <Section {...states} />
        <Specs items={states.specs} />
        <p className="sm-note">{states.note}</p>
        <Fig name={states.img} alt={states.alt} />
      </section>

      <section className="sm-sec">
        <Section {...rules} />
        <Keymap groups={rules.keymap} />
      </section>

      <section className="sm-sec">
        <Section {...scope} />
        <Cards items={scope.moves} />
        <Ask {...scope.question} />
        <Fig name={scope.img} alt={scope.alt} />
      </section>

      <section className="sm-sec">
        <Section {...situ} />
        {situ.shots.map((s) => (
          <Fig key={s.img} name={s.img} alt={s.alt} cap={s.cap} />
        ))}
      </section>

      <section className="sm-sec">
        <Section {...why} />
        <Probs items={why.items} />
      </section>

      <section className="sm-sec">
        <Section {...open} />
        <Bullets items={open.items} />
      </section>
    </article>
  )
}
