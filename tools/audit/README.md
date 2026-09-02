# Responsive audit harnesses

Both are **development-time only** and must not live in `public/`, which ships.
Copy the one you need in, run it, then delete it:

```bash
cp tools/audit/audit.html public/__audit.html      # then open /__audit.html
cp tools/audit/mobile.html public/__mobile.html    # then open /__mobile.html?r=/a,/b
rm public/__audit.html public/__mobile.html
```

They have to be served from the dev server's own origin: both drive the site in
**same-origin iframes**, which is the only reliable way to test this site's
layout at a narrow width. See DESIGN.md §9.18 for why the obvious method — a
headless screenshot at `--window-size=390,…` — silently lies.

`audit.html` exposes `window.runAudit()`, which loads every route at every
width and returns, per combination: document scroll width, every element whose
box escapes the viewport, and the smallest rendered font size.

`mobile.html?r=/route,/route` stacks the given routes in 390px-wide iframes so
a single screenshot of the harness shows a true narrow-viewport rendering.
