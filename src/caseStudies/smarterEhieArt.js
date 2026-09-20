// The EHIE process-map case study's artwork. Imported, never referenced by
// path, so Vite hashes it and applies the base path. See DESIGN.md §8.3 and
// §9.4.
//
// d00–d08 are renders of the BPMN exports in
// `UU/Aim 4/BPMN revised/Aim4_FINAL/Images/`, made by
// tools/render_svg_sheets.mjs. Those exports carry an <?xml?> declaration and
// a non-zero viewBox origin, which is why the renderer finds its root element
// rather than anchoring at the start of the file and defaults its crop to the
// viewBox rather than to [0, 0, w, h].
//
// `guide-top` is a Chrome capture of GUIDE_plain_language.html in the same
// folder. Only its opening is shown: the guide's diagram panes pan and zoom on
// interaction and render empty in a headless capture, so a shot of a diagram
// section would show an empty box. The diagrams themselves are the d00–d08
// renders, at full fidelity.
//
// `Aim4_Outline_View` is deliberately absent from this map. Both its SVG and
// its PNG export are broken in the source folder, overlapping boxes and
// content running past the right edge, so neither is usable. If that export
// is ever regenerated it belongs in §04.

import d00 from '../assets/smarterEhie/d00-overview.webp'
import d01 from '../assets/smarterEhie/d01-planning.webp'
import d03 from '../assets/smarterEhie/d03-operations.webp'
import d05 from '../assets/smarterEhie/d05-transforms.webp'
import d07 from '../assets/smarterEhie/d07-intake.webp'
import d08 from '../assets/smarterEhie/d08-reentry.webp'
import guideTop from '../assets/smarterEhie/guide-top.webp'

export const shots = {
  'd00-overview': d00,
  'd01-planning': d01,
  'd03-operations': d03,
  'd05-transforms': d05,
  'd07-intake': d07,
  'd08-reentry': d08,
  'guide-top': guideTop,
}
