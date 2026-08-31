# Urvi Varma — portfolio

Landing page revamp. React + Vite + GSAP. The name is rendered as a field of
multi-colour sparkle particles on a `<canvas>`; a lagging pointer scatters them
and a spring pulls each one home (see `src/components/ParticleName.jsx`).

Live: **https://www.urvivarma.com**

## Working on this project

**Read [DESIGN.md](DESIGN.md) first.** It is the system of record: the design
system, every component's tokens, the hero's runtime measurement contracts, and
the traps already hit. [CLAUDE.md](CLAUDE.md) carries the working rules for
agents. Both must be updated in the same commit as any change they describe.

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

The site is served from the root of its custom domain, so there is no path
prefix. Three things depend on that and must stay in sync:

| Where | Value |
| --- | --- |
| `vite.config.js` | `base: '/'` |
| `src/main.jsx` | router `basename` (derived from `BASE_URL`) |
| `public/404.html` | `pathSegmentsToKeep = 0` |

`404.html` exists because Pages has no server-side rewrite: a deep link to
`/work/elderease` would otherwise 404. It encodes the path into a query string
and `index.html` decodes it back before React mounts.

### The custom domain

`public/CNAME` holds `www.urvivarma.com` and is copied into `dist/` by the
build — that file is what tells Pages to serve the domain, so **deleting it
un-sets the custom domain on the next deploy**. The DNS records and the
Settings → Pages steps are in [DESIGN.md §7.4](DESIGN.md#74-the-custom-domain).
