import { Fragment } from 'react'

// The Guide case studies carry their emphasis in the data (see guide1.js), so
// this is the one place that turns it into markup. A value is a string, or an
// array whose members are strings and { em } objects.
//
// A newline inside a string is a line break the artwork actually has — the
// export sets those runs on separate lines and the copy files keep them — so
// it becomes a <br>, not collapsed whitespace.

const lines = (text, key) =>
  String(text)
    .split('\n')
    .map((line, i, all) => (
      <Fragment key={`${key}-${i}`}>
        {line}
        {i < all.length - 1 && <br />}
      </Fragment>
    ))

export default function Rich({ value }) {
  if (value == null) return null
  if (!Array.isArray(value)) return <>{lines(value, 's')}</>
  return (
    <>
      {value.map((part, i) =>
        typeof part === 'string' ? (
          <Fragment key={i}>{lines(part, i)}</Fragment>
        ) : (
          <em key={i}>{lines(part.em, i)}</em>
        ),
      )}
    </>
  )
}
