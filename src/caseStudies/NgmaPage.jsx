// Layout for "Redesigning the National Gallery of Modern Art Website". Every
// word comes from ngma.js; every colour and measurement from the `n-` block in
// global.css. See DESIGN.md §11d.
//
// This page is shaped by what it is: a visual-design case study. It alternates
// short commentary sections with full-bleed mockups of the redesigned site,
// and it does not share `.g` or `.cs` — those two encode the Guide and TCTD
// frames' own grids, and this artwork has neither.

import { ngma } from './ngma'
import { art, shots } from './ngmaArt'

const Shot = ({ name, alt = '', className = 'n-shot' }) => (
  <img className={className} src={shots[name]} alt={alt} loading="lazy" />
)

/**
 * A mockup: the page's name over the artwork's pink triangle band, then the
 * frame itself, full width. The band is under every page heading in the
 * export and is the thing that marks a mockup off from the commentary.
 */
const Mock = ({ page }) => (
  <figure className="n-mock">
    <h2 className="n-h2 n-h2--band">{page.title}</h2>
    <img className="n-band" src={art.bandTriangles} alt="" aria-hidden="true" />
    <Shot name={page.img} alt={page.alt} className="n-shot n-shot--mock" />
  </figure>
)

export default function Ngma() {
  const { hero, outro, overview, inspiration, moodboard, architecture, cohesion, colour, type, pages } =
    ngma
  const [landing, about, exhibitions, events, collection] = pages

  return (
    <article className="n">
      {/* The green fan and the yellow asterisk flank the title in the export;
          the asterisk sits on the colon's line, which is why it is inside the
          heading rather than beside it. */}
      <header className="n-hero">
        <img className="n-fan" src={art.heroFan} alt="" aria-hidden="true" />
        <div>
          <h1 className="n-h1">
            <span className="n-h1__main">
              {hero.title}
              <img className="n-asterisk" src={art.heroAsterisk} alt="" aria-hidden="true" />
            </span>
            <span className="n-h1__sub">{hero.sub}</span>
          </h1>
          <a className="n-cta" href={hero.cta.href} target="_blank" rel="noreferrer">
            {hero.cta.label}
          </a>
        </div>
      </header>

      {/* The two opening notes, with the staircase motif between them. */}
      <section className="n-sec n-open">
        <div>
          <h2 className="n-h2">{overview.title}</h2>
          <p>{overview.body}</p>
        </div>
        <Shot name="art-motif" alt="" className="n-motif" />
        <div className="n-open__end">
          <h2 className="n-h2">{inspiration.title}</h2>
          <p>{inspiration.body}</p>
        </div>
      </section>

      <section className="n-sec">
        <h2 className="n-h2">{moodboard.title}</h2>
        <p className="n-lede">{moodboard.body}</p>
        <Shot name={moodboard.img} alt={moodboard.alt} className="n-shot n-shot--pad" />
      </section>

      <Mock page={landing} />

      <section className="n-sec">
        <h2 className="n-h2">{architecture.title}</h2>
        <div className="n-arch">
          <div>
            {architecture.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Shot {...{ name: architecture.photos.img, alt: architecture.photos.alt }} />
          </div>
          <div>
            {architecture.aside.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Shot {...{ name: architecture.motifs.img, alt: architecture.motifs.alt }} />
          </div>
        </div>
      </section>

      <Mock page={about} />

      <section className="n-sec">
        <h2 className="n-h2">{cohesion.title}</h2>
        <p className="n-lede">{cohesion.body}</p>
        <Shot name={cohesion.img} alt={cohesion.alt} className="n-shot n-shot--pad" />
      </section>

      <Mock page={exhibitions} />

      {/* The palette. Each swatch is its own hex, which is also its caption. */}
      <section className="n-sec n-split">
        <div>
          <h2 className="n-h2">{colour.title}</h2>
          {colour.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="n-swatches">
          {colour.swatches.map((row, i) => (
            <ul key={i}>
              {row.map((hex) => (
                <li key={hex}>
                  <span className="n-swatch" style={{ background: `#${hex}` }} />
                  <span className="n-swatch__hex">{hex}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="n-sec">
        <div className="n-split n-split--type">
          <h2 className="n-h2">{type.title}</h2>
          <div>
            {type.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <Shot name={type.img} alt={type.alt} className="n-shot n-shot--mock" />
      </section>

      <Mock page={events} />
      <Mock page={collection} />

      <footer className="n-outro">
        <h2 className="n-h2">{outro.title}</h2>
        <a className="n-cta" href={outro.cta.href} target="_blank" rel="noreferrer">
          {outro.cta.label}
        </a>
      </footer>
    </article>
  )
}
