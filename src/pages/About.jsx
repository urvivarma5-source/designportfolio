import Nav from '../components/Nav'
import Rich from '../lib/rich'
import { about } from '../about'

import collageIntro from '../assets/about/collage-intro.webp'
import collageJourney from '../assets/about/collage-journey.webp'
import collageUx from '../assets/about/collage-ux.webp'
import collageBeyond from '../assets/about/collage-beyond.webp'

// The four photo collages, rendered out of the Figma export as single images:
// each is a loose arrangement of overlapping photographs, so it is one picture
// rather than a grid this page could rebuild. See DESIGN.md §4.12.
const collages = {
  'collage-intro': collageIntro,
  'collage-journey': collageJourney,
  'collage-ux': collageUx,
  'collage-beyond': collageBeyond,
}

/**
 * The About page. Four sections, each a column of prose beside a collage, with
 * the collage alternating sides — the export's structure, set in the site's own
 * palette and faces rather than the export's, because this is the site's page
 * and not a case study under §11b's fidelity rule.
 */
export default function About() {
  return (
    <>
      <Nav inset />
      <article className="about">
        <h1 className="about__title">{about.title}</h1>

        {about.sections.map((s) => (
          <section className={`about__row about__row--${s.side}`} key={s.id}>
            <div className="about__col">
              <h2 className="about__heading">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>
                  <Rich value={p} />
                </p>
              ))}
            </div>
            <img className="about__collage" src={collages[s.collage]} alt={s.alt} loading="lazy" />
          </section>
        ))}
      </article>
    </>
  )
}
