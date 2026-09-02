import { icons } from '../caseStudies/icons'
import scout from '../assets/guide1/art-scout.svg'
import ship from '../assets/guide2/art-ship-thumb.svg'
import ngma from '../assets/ngma/thumb.webp'

// Artwork for a work card's media block, keyed by slug. A project without an
// entry keeps the plain placeholder ground — see WorkGrid.
//
// Each thumbnail is its own case study's drawing, imported straight from the
// asset folder (or from caseStudies/icons where that map already holds it), so
// a given SVG is one module and one URL in the bundle however many places use
// it. The hero's title panel is deliberately never part of the thumbnail: the
// card prints the title and the description directly underneath it.
//
// The two Guide parts open with the *same* drawing, so Part 2 takes the ship
// from its own pivot section instead. Two identical thumbnails side by side in
// the grid would be worse than a slightly less literal one. The car from that
// section reads better still, but its SVG is 4× the size and this is a
// 4:3 thumbnail on the home page.
//
// It uses `art-ship-thumb`, a second cut of that drawing: on the page the
// ship's pale blob runs 120pt further right than the ship and the dashed
// outline both, which is fine at full size and reads as a badly-centred
// thumbnail at card size. The thumb cut stops at the dashed outline.

const TctdThumb = () => (
  <span className="card-art card-art--tctd">
    <img className="card-art__cabinet" src={icons.cabinet} alt="" />
    <img className="card-art__arrow" src={icons.arrow} alt="" />
    <img className="card-art__board" src={icons.board} alt="" />
  </span>
)

const Single = ({ src }) => (
  <span className="card-art card-art--single">
    <img src={src} alt="" />
  </span>
)

/** A thumbnail that is a picture, not a drawing: it fills the media block. */
const Cover = ({ src }) => (
  <span className="card-art card-art--cover">
    <img src={src} alt="" />
  </span>
)

const thumbs = {
  'filling-cabinets-to-fingertips': TctdThumb,
  'search-experience-for-guide': () => <Single src={scout} />,
  'search-experience-for-guide-2': () => <Single src={ship} />,
  // A visual-design case study, so its card shows the design rather than a
  // drawing about it: the redesigned landing page's hero, cropped to 4:3.
  'website-redesign-for-ngma-mumbai': () => <Cover src={ngma} />,
}

export const getThumb = (slug) => thumbs[slug]
