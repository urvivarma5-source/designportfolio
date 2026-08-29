// Self Modern — Velvetyne Type Foundry / Lucas Le Bihan, SIL OFL. It is not on
// Google Fonts, so it is self-hosted from public/fonts/.
//
// Registered here rather than with an @font-face rule because Vite does not
// rewrite absolute public-asset URLs in CSS: `url(/fonts/x.woff2)` would stay
// rooted at `/` and 404 under the `/designportfolio/` base. import.meta.env
// .BASE_URL always carries the right prefix, in dev and in build.
//
// Loading fails silently while the files are absent, and --serif falls back to
// Newsreader. Drop SelfModern-Regular.woff2 and SelfModern-Italic.woff2 into
// public/fonts/ and this picks them up with no other change.
export function loadSelfModern() {
  if (typeof window === 'undefined' || !('FontFace' in window)) return

  const base = import.meta.env.BASE_URL
  const faces = [
    ['SelfModern-Regular.woff2', 'normal'],
    ['SelfModern-Italic.woff2', 'italic'],
  ]

  for (const [file, style] of faces) {
    const face = new FontFace('Self Modern', `url(${base}fonts/${file})`, {
      style,
      weight: '400',
      display: 'swap',
    })
    face
      .load()
      .then((loaded) => document.fonts.add(loaded))
      .catch(() => {
        /* not installed yet — the fallback in --serif covers it */
      })
  }
}
