// Layout for "Making a Sensor Station Navigable". Every word comes from
// smarterNav.js; every colour and measurement from the `sm-` block in
// global.css, which follows TCTD. See DESIGN.md §4.13 and §11e.
//
// Two kinds of figure, and the difference is where the words live:
//
//   - A DRAWN SHEET writes its own annotations, so it takes a caption and no
//     key. §02, §03, §04 and §05 are these.
//   - A PRODUCT SCREEN has no margin to write in, so it takes numbered pins
//     from tools/smarter-nav-regions.json and a `keys` list that renders as
//     live text under it. §07 and §08 are these.
//
// The second kind exists because four of these figures used to be unannotated
// full-page screenshots at 0.82 scale: 3800px of grey that said nothing and
// could not be read. See DESIGN.md §9.24.

import { smarterNav } from './smarterNav'
import { shots } from './smarterNavArt'
import {
  Ask, Bullets, Chips, Cards, Fig, Hero, Keymap, Metas, NCards, Probs,
  Pull, Section, Specs, Stats, Steps,
} from './smarterParts'

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

      {/* The sheet pins seven notes; the cards list six. The seventh is the
          component's name, and it is in the caption rather than the grid,
          because a name is not a thing you can draw a row to fix. */}
      <section className="sm-sec">
        <Section {...first} />
        <NCards items={first.problems} />
        <Fig src={shots[first.img]} alt={first.alt} cap={first.cap} />
      </section>

      <section className="sm-sec">
        <Section {...rule} />
        <Pull label={rule.pullLabel}>{rule.pull}</Pull>
        <Fig src={shots[rule.img]} alt={rule.alt} cap={rule.cap} />
      </section>

      <section className="sm-sec">
        <Section {...click} />
        <Steps items={click.steps} />
        <Fig src={shots[click.img]} alt={click.alt} cap={click.cap} />
      </section>

      <section className="sm-sec">
        <Section {...states} />
        <Specs items={states.specs} />
        <p className="sm-note">{states.note}</p>
        <Fig src={shots[states.img]} alt={states.alt} cap={states.cap} />
      </section>

      <section className="sm-sec">
        <Section {...rules} />
        <Keymap groups={rules.keymap} />
      </section>

      <section className="sm-sec">
        <Section {...scope} />
        <Cards items={scope.moves} />
        <Ask {...scope.question} />
        <Fig src={shots[scope.img]} alt={scope.alt} cap={scope.cap} keys={scope.keys} />
      </section>

      <section className="sm-sec">
        <Section {...situ} />
        {situ.shots.map((s) => (
          <Fig key={s.img} src={shots[s.img]} alt={s.alt} cap={s.cap} keys={s.keys} />
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
