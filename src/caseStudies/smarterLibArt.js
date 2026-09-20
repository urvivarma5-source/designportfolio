// The sensor library case study's artwork. Imported, never referenced by path,
// so Vite hashes it and applies the base path. See DESIGN.md §8.3 and §9.4.
//
// Two sources, two tools, for the reason set out in §11e:
//
//   comp-*    renders of `Instrument Tree/04 New Components.svg`, made by
//             tools/render_svg_sheets.mjs. That sheet is live text in Inter,
//             so it cannot be imported as SVG and dropped in an <img>, see
//             §9.20.
//   the rest  crops of the high-fidelity PNGs in `High Fidelity Screens/`,
//             made by tools/crop_png_shots.mjs. These are already rendered
//             pictures; there is nothing to keep live about them.

import browse from '../assets/smarterLib/browse.webp'
import filter from '../assets/smarterLib/filter.webp'
import compare from '../assets/smarterLib/compare.webp'
import intake from '../assets/smarterLib/intake.webp'
import detail from '../assets/smarterLib/detail.webp'
import compRows from '../assets/smarterLib/comp-rows.webp'
import compSpec from '../assets/smarterLib/comp-spec.webp'
import compScope from '../assets/smarterLib/comp-scope.webp'
import compAccordion from '../assets/smarterLib/comp-accordion.webp'

export const shots = {
  browse,
  filter,
  compare,
  intake,
  detail,
  'comp-rows': compRows,
  'comp-spec': compSpec,
  'comp-scope': compScope,
  'comp-accordion': compAccordion,
}
