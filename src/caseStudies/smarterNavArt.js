// The Station Navigator case study's artwork. Imported, never referenced by
// path, so Vite hashes it and applies the base path. See DESIGN.md §8.3 and
// §9.4.
//
// Every file here is a render of one of the design sheets in
// `art/smarter-nav/`, produced by tools/render_svg_sheets.mjs from
// tools/smarter-nav-regions.json. The sheets used to be read from a Desktop
// folder, which was reorganised out from under this comment: a figure whose
// source has moved is a figure nobody can fix, so they live in the repository
// now.
//
// Those sheets are *live text* in Inter, not outlined paths, so they cannot be
// imported as SVG and dropped in an <img>: an SVG in an <img> renders in an
// isolated context that cannot reach the page's webfonts, every label would
// fall back to Helvetica, and the text is absolutely positioned with no
// wrapping, so it would overrun its boxes. The renderer inlines each sheet
// into a page that links Google Fonts and screenshots it in Chrome instead.
// See DESIGN.md §11e and §9.20.
//
// WHAT A CROP COSTS. The raster is fitted to the 1180px column, so one of the
// sheet's user units lands on 1180 / crop-width CSS pixels. `before` and
// `after` are the two halves of one 1400-unit sheet, cropped apart because
// together they put their 13px annotations on the page at 11px, under the
// floor §9.17 sets everywhere else; apart they read at 21.7px. The renderer
// prints the figure for every crop. See DESIGN.md §9.24.

import before from '../assets/smarterNav/before.webp'
import after from '../assets/smarterNav/after.webp'
import clickDoes from '../assets/smarterNav/click-does.webp'
import rowStates from '../assets/smarterNav/row-states.webp'
import navInPage from '../assets/smarterNav/nav-in-page.webp'
import longContent from '../assets/smarterNav/long-content.webp'
import scopeDropdown from '../assets/smarterNav/scope-dropdown.webp'
import stationOverview from '../assets/smarterNav/station-overview.webp'

export const shots = {
  before,
  after,
  'click-does': clickDoes,
  'row-states': rowStates,
  'nav-in-page': navInPage,
  'long-content': longContent,
  'scope-dropdown': scopeDropdown,
  'station-overview': stationOverview,
}
