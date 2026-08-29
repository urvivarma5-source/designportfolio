# Urvi Varma — portfolio

Landing page revamp. React + Vite + GSAP. The name is rendered as a field of
multi-colour sparkle particles on a `<canvas>`; a lagging pointer scatters them
and a spring pulls each one home (see `src/components/ParticleName.jsx`).

Live: **https://urvivarma5-source.github.io/designportfolio/**

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # -> dist/
npm run preview    # serve the production build locally, at the real base path
```

## Editing copy

All text lives in [`src/content.js`](src/content.js). Everything marked
`PLACEHOLDER` is filler — replace it. Layout reflows automatically.

- `eyebrow` — the tracked label parts, joined by a dimmed middot
- `headline` — exactly 3 lines; `it: true` marks the italic one
- `sub` — exactly 2 lines
- `strip` — bottom credential fragments
- `phNote` — set to `null` once real copy is in, to hide the placeholder note

Projects are in [`src/projects.js`](src/projects.js) — names and slugs only for
now. Each renders a card on the home page linking to a blank
`/work/<slug>` detail page.

## Fonts

- **Newsreader** and **Inter** and **Mukta** load from Google Fonts.
- **Self Modern** (Velvetyne / Lucas Le Bihan, SIL OFL) is *not* on Google
  Fonts. Drop `SelfModern-Regular.woff2` and `SelfModern-Italic.woff2` into
  `public/fonts/` and it takes over the headline automatically — see
  [`src/fonts.js`](src/fonts.js). Until then Newsreader stands in.

## Deploy — GitHub Pages

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes `dist/`.

One-time setup: repo → **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

### Why the base path matters

This is a *project* repo, so Pages serves it from `/designportfolio/`, not the
domain root. Three things depend on that and must stay in sync:

| Where | Value |
| --- | --- |
| `vite.config.js` | `base: '/designportfolio/'` |
| `src/main.jsx` | router `basename` (derived from `BASE_URL`) |
| `public/404.html` | `pathSegmentsToKeep = 1` |

`404.html` exists because Pages has no server-side rewrite: a deep link to
`/designportfolio/work/elderease` would otherwise 404. It encodes the path into
a query string and `index.html` decodes it back before React mounts.

### Moving to a custom domain later

A custom domain serves from the root, so:

1. `vite.config.js` → `base: '/'`
2. `public/404.html` → `pathSegmentsToKeep = 0`
3. Rename `public/CNAME.example` → `public/CNAME`, containing just the bare
   domain (e.g. `urvivarma.com`), no protocol.
4. DNS: apex → four `A` records to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`; or `www` → `CNAME` to
   `urvivarma5-source.github.io`.
5. Repo → Settings → Pages → set the custom domain and enable **Enforce HTTPS**.

The router `basename` needs no change — it follows `BASE_URL`.
