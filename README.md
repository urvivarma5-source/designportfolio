# उर्वी वर्मा — portfolio

Landing page revamp. React + Vite + GSAP. The name is rendered as a field of
~10k multi-colour sparkle particles on a `<canvas>`; a lagging pointer scatters
them and a spring pulls each one home (see `src/components/ParticleName.jsx`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # -> dist/
npm run preview     # serve the production build locally
```

## Editing copy

All text lives in [`src/content.js`](src/content.js). Everything marked
`PLACEHOLDER` is filler — replace it. Layout reflows automatically.

- `eyebrow` — one tracked label line
- `headline` — exactly 3 lines (Instrument Serif, deep blue `#001D57`)
- `sub` — exactly 2 lines
- `strip` — bottom credential fragments

Section stubs (Work / About / Contact) are wired to the nav in `src/App.jsx`.

## Deploy — GitHub Pages

1. Create a repo named **`urvivarma5-source.github.io`** on GitHub (public).
2. Push this project to its `main` branch.
3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml` and publishes to
   `https://urvivarma5-source.github.io/`.

`vite.config.js` has `base: '/'`, which is correct for the user site **and** for
a custom domain.

### Custom domain (later)

When the domain is ready:

1. Rename `public/CNAME.example` → `public/CNAME` and put the bare domain in it
   (e.g. `urvivarma.com`), one line, no protocol. It gets copied into `dist/`
   on build.
2. At your DNS provider:
   - apex domain → 4 `A` records to `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (and/or `AAAA` records)
   - or `www` subdomain → `CNAME` to `urvivarma5-source.github.io`
3. Repo → Settings → Pages → set the custom domain, enable **Enforce HTTPS**.
