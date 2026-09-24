import { content } from '../content'

// A site-wide notice above everything, on every route. The hero measures
// itself against the viewport minus this bar, so its height is a token rather
// than a magic number: see --banner-h in global.css and DESIGN.md §4.14.
//
// `role="status"` rather than `role="alert"`: a screen reader should mention it
// when it reaches it, not interrupt whatever it is already reading.
export default function Banner() {
  if (!content.banner) return null

  return (
    <div className="banner" role="status">
      <p className="banner__text">{content.banner}</p>
    </div>
  )
}
