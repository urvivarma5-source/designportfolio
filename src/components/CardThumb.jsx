import { icons } from '../caseStudies/icons'

// Artwork for a work card's media block, keyed by slug. A project without an
// entry keeps the plain placeholder ground — see WorkGrid.
//
// The art is the case study's own hero line art, reused from caseStudies/icons
// rather than re-exported, so there is one import of each SVG in the bundle.
// The hero's title panel is deliberately not part of the thumbnail: the card
// prints the title and the description directly underneath it.

const TctdThumb = () => (
  <span className="card-art card-art--tctd">
    <img className="card-art__cabinet" src={icons.cabinet} alt="" />
    <img className="card-art__arrow" src={icons.arrow} alt="" />
    <img className="card-art__board" src={icons.board} alt="" />
  </span>
)

const thumbs = {
  'filling-cabinets-to-fingertips': TctdThumb,
}

export const getThumb = (slug) => thumbs[slug]
