// The Station Navigator case study's artwork. Imported, never referenced by
// path, so Vite hashes it and applies the base path. See DESIGN.md §8.3 and
// §9.4.
//
// Every file here is a render of one of the design sheets in
// `Desktop/High Fidelity Screens/Instrument Tree/`, produced by
// tools/render_svg_sheets.mjs from tools/smarter-nav-regions.json.
//
// Those sheets are *live text* in Inter, not outlined paths, so they cannot be
// imported as SVG and dropped in an <img>: an SVG in an <img> renders in an
// isolated context that cannot reach the page's webfonts, every label would
// fall back to Helvetica, and the text is absolutely positioned with no
// wrapping, so it would overrun its boxes. The renderer inlines each sheet
// into a page that links Google Fonts and screenshots it in Chrome instead.
// See DESIGN.md §11e and §9.20.

import treeOld from '../assets/smarterNav/tree-old.webp'
import beforeAfter from '../assets/smarterNav/before-after.webp'
import clickDoes from '../assets/smarterNav/click-does.webp'
import rowStates from '../assets/smarterNav/row-states.webp'
import detailInSitu from '../assets/smarterNav/detail-in-situ.webp'
import longContent from '../assets/smarterNav/long-content.webp'
import scopeDropdown from '../assets/smarterNav/scope-dropdown.webp'
import stationOverview from '../assets/smarterNav/station-overview.webp'

export const shots = {
  'tree-old': treeOld,
  'before-after': beforeAfter,
  'click-does': clickDoes,
  'row-states': rowStates,
  'detail-in-situ': detailInSitu,
  'long-content': longContent,
  'scope-dropdown': scopeDropdown,
  'station-overview': stationOverview,
}
