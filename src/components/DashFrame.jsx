/**
 * The dashed frame from the supplied SVG reference:
 *   rx 9, stroke #D6576B, stroke-width 2, stroke-dasharray 10 10
 *
 * Drawn as a real <svg> rather than a CSS border or gradients, because:
 *   - `border: dashed` derives dash length from border-width; there is no way
 *     to ask for 10/10
 *   - repeating gradients can do arbitrary dash lengths but cannot follow a
 *     rounded corner, and the reference has rx 9
 *
 * The rect has no viewBox, so SVG user units are CSS pixels and the dashes
 * never stretch with the box. Geometry (x/y/width/height/rx) is set from CSS,
 * where `calc()` is available — see `.dash-frame rect` in global.css.
 */
export default function DashFrame() {
  return (
    <svg className="dash-frame" aria-hidden="true" focusable="false">
      <rect />
    </svg>
  )
}
