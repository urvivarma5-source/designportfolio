# DESIGN.md — system of record

**Every agent working in this repo reads this file before writing code, and
updates it in the same commit as any change it describes.** See
[§0 Working agreement](#0-working-agreement).

This is the single source of truth for how the site looks, moves and is put
together. Where this file and the code disagree, that is a bug — fix one or the
other, never leave them out of sync.

Last verified against commit `0cc76da`.

---

## 0. Working agreement

### 0.1 Before you change anything

1. Read this file top to bottom. It is long on purpose; the values here were
   arrived at by measurement, not taste, and several look arbitrary but are not.
2. Read [§9 Traps](#9-traps-that-have-already-bitten-us). Every entry is a real
   bug that shipped or nearly shipped. Do not rediscover them.
3. If your change touches the hero, read [§6 Hero layout coupling](#6-hero-layout-coupling)
   in full. The hero's pieces measure each other at runtime; changing one value
   in isolation usually breaks another.

### 0.2 After you change something

Update this file **in the same commit**. Specifically:

| If you changed… | Update… |
| --- | --- |
| any CSS custom property | [§2 Foundation tokens](#2-foundation-tokens) |
| any component's visual values | that component's table in [§4](#4-component-tokens) |
| particle behaviour or sizing | [§5 Particle system](#5-particle-system) |
| how hero pieces measure each other | [§6 Hero layout coupling](#6-hero-layout-coupling) |
| routes, base path, deploy | [§7 Routing and deployment invariants](#7-routing-and-deployment-invariants) |
| the shape of `content.js` / `projects.js` | [§8 Content model](#8-content-model) |
| anything that cost you >20 min to debug | [§9 Traps](#9-traps-that-have-already-bitten-us) |
| anything at all | [§11 Changelog](#11-changelog) — one line |

### 0.3 Rules that are not negotiable

- **Never hardcode the base path.** Derive it from `import.meta.env.BASE_URL`.
  See [§7.2](#72-the-base-path-contract).
- **Never add a colour outside the palette** in [§2.1](#21-colour). If a new one
  is genuinely needed, add it as a token here first, with a stated role.
- **Never use `getBoundingClientRect()` to measure anything the particle field
  aligns to.** Use the `offsetTop` chain. See [§9.3](#93-parallax-poisons-getboundingclientrect).
- **Verify by measurement, not by screenshot.** The preview pane throttles
  `requestAnimationFrame`, so particle screenshots routinely show a half-settled
  field that looks broken but is not. See [§10 Verification](#10-verification-protocol).
- **Do not introduce a dark mode.** The sparkle palette is tuned for a white
  ground and would need a second palette. This is a deliberate single-look design.

### 0.4 Design intent, in one paragraph

A near-silent white page. All the energy is in one gesture: the name rendered
as a field of jewel-toned particles that scatter from the cursor and drift home.
Everything else — the type, the rules, the micro-labels — is quiet, tightly
tracked, and deep navy. The reference is `strangepixels.co` inverted to light,
with the layout doing the work of legibility rather than any scrim or shadow.

---

## 1. Stack and file map

React 18 · Vite 6 · GSAP 3 · react-router 7. No CSS framework, no component
library, no state manager. One stylesheet.

```
index.html              Google Fonts link, SPA-redirect decoder
vite.config.js          base: '/designportfolio/'
public/
  404.html              Pages SPA shim (pathSegmentsToKeep = 1)
  CNAME.example          rename to CNAME for a custom domain
  fonts/                 Self Modern woff2 files go here (absent by default)
src/
  main.jsx              Router basename from BASE_URL, loadSelfModern()
  fonts.js              Self Modern registration via FontFace API
  content.js            ALL hero copy
  projects.js           Project names + slugs
  App.jsx               Routes + ScrollManager
  styles/global.css     Every style in the project
  pages/
    Home.jsx            Hero + four sections
    Project.jsx         Blank detail page
  components/
    Hero.jsx            Hero composition, measurement, GSAP parallax
    Nav.jsx             UV mark + links
    ParticleName.jsx    The canvas particle system
    Section.jsx         Generic section wrapper
    WorkGrid.jsx        Project card list
```

**All styles live in `src/styles/global.css`.** Do not add CSS modules,
styled-components, or `<style>` blocks. One file, sectioned by comment banners.

---

## 2. Foundation tokens

Declared on `:root` in `global.css`. These are the only global tokens; component
values live in [§4](#4-component-tokens).

### 2.1 Colour

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#ffffff` | Page ground. The sparkle palette is tuned against this exact white. |
| `--blue` | `#001d57` | Primary ink. Headlines, nav, marks, strip. |
| `--ink` | `#001d57` | Alias of `--blue`, set as `body` colour. |
| `--muted` | `#4a5875` | Secondary prose only (`.sub`, `.section__note`, `.project__note`). |
| `--rule` | `rgba(0, 29, 87, 0.14)` | Every hairline divider. Always this, never a solid grey. |
| `--rule-strong` | `rgba(0, 29, 87, 0.3)` | Dotted/dashed edges only (the credential pills). A dotted edge at 14% is effectively invisible. |
| `--accent` | `#b3197a` | Magenta. Eyebrow text, nav hover underline, CTA underline, hover states. |

**Opacity is a token too.** Hierarchy below `--blue` is expressed as opacity on
`--blue`, not as new colours:

| Opacity | Used for |
| --- | --- |
| `1` | Headlines, titles, active nav |
| `0.72` | Nav links at rest |
| `0.6` | Project back-link at rest |
| `0.55` | Strip items |
| `0.72` | Credential pills |
| `0.45` | Eyebrow separators (`·`) |

### 2.2 Type

| Token | Stack | Used for |
| --- | --- | --- |
| `--serif` | `'Self Modern', 'Newsreader', Georgia, 'Times New Roman', serif` | All display type: h1, section titles, work-card titles, project titles |
| `--sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` | Body, all micro-type, UI |
| `--deva` | `'Mukta', system-ui, sans-serif` | The `UV` wordmark, and the particle glyph source |

**Self Modern** (Velvetyne / Lucas Le Bihan, SIL OFL) is not on Google Fonts —
verified, the API returns HTTP 400. It is self-hosted and **currently absent**;
Newsreader stands in. Newsreader was chosen by rendering eight candidates against
the client's specimen: it matches the vertical stress, moderate contrast and fine
flat unbracketed serifs. Rejected: Literata and Source Serif (too slabby),
Playfair and Prata (contrast too high), DM Serif Display (thicks too heavy).

To activate Self Modern: drop `SelfModern-Regular.woff2` and
`SelfModern-Italic.woff2` into `public/fonts/`. Nothing else changes.

**Google Fonts loaded** (`index.html`), keep this list minimal:
`Newsreader` (ital, opsz 6–72, wght 400) · `Inter` (400/500/600) ·
`Mukta` (400/600/800).

### 2.3 Spacing and rhythm

There is no spacing scale. Spacing is **fluid `clamp()` throughout** — this is
deliberate, the layout is composed against the viewport rather than a grid.

| Purpose | Value |
| --- | --- |
| Page gutter (hero, sections, project) | `clamp(20px, 3.4vw, 46px)` |
| Section vertical padding | `clamp(80px, 14vh, 160px)` |
| Strip inter-item gap | `8px clamp(18px, 2.6vw, 40px)` |
| Nav link gap | `clamp(18px, 2.4vw, 34px)` |

### 2.4 Motion

| Token | Value | Used for |
| --- | --- | --- |
| Standard ease | `cubic-bezier(0.2, 0.7, 0.3, 1)` | Hover transforms, underline sweeps |
| Entrance ease | `cubic-bezier(0.2, 0.7, 0.2, 1)` | The `rise` keyframe |
| Micro transition | `0.2s` | Colour and opacity changes |
| Hover transform | `0.25s`–`0.3s` | Arrow slides, card indent |

**Entrance is CSS, not GSAP.** The `rise` keyframe runs on `[data-animate]`
elements with staggered `animation-delay`. This is deliberate: a CSS animation
always completes, whereas a stalled JS ticker would leave the hero blank. See
[§9.1](#91-a-stalled-ticker-must-never-leave-the-page-blank).

| `data-animate` value | Delay |
| --- | --- |
| `eyebrow` | `0.25s` |
| `headline` | `0.38s` |
| `sub` | `0.58s` |
| `pills` | `0.72s` |

`rise` = `opacity 0→1`, `translateY(22px)→0`, `0.8s`.
`#sparkles` uses `fade` = `opacity 0→1`, `1s ease 0.15s`.

**GSAP is used for exactly one thing:** the scroll parallax on `.copy`
(`quickTo` on `y`, `0.5s`, `power2`, factor `0.16` of scrollY, capped at one
viewport height). If that is ever removed, drop the GSAP dependency.

**Reduced motion:** `prefers-reduced-motion: reduce` kills all transitions,
both keyframes, and the particle animation loop (particles render once at their
home positions).

---

## 3. Layout primitives

| Rule | Value |
| --- | --- |
| Hero height | `min-height: 100svh` (`svh`, not `vh` — mobile browser chrome) |
| Section height | `min-height: 78vh` |
| Project page height | `min-height: 100svh` |
| Prose measure | `max-width: 46ch` |
| Project title measure | `max-width: 20ch` |
| Copy column | `max-width: min(660px, 46vw)`, released at `≤900px` |

**Breakpoints.** Only two, and they do different jobs:

| Breakpoint | What changes |
| --- | --- |
| `≤900px` | `.copy` max-width released. **Also the JS `narrow` threshold** in `ParticleName` — the particle block switches from right-aligned to centred. These two must stay equal. |
| `≤820px` | Nav gap and tracking tighten; CTA drops to its own full-width row. |

---

## 4. Component tokens

### 4.1 Nav — `.nav`

Flex row, `z-index: 3`, `justify-content: space-between`, gap `16px`.

| Element | Property | Value |
| --- | --- | --- |
| `.mark` | family / weight / size | `--deva` / `800` / `21px` |
| | letter-spacing | `0.12em` |
| | line-height | `1` |
| | colour | `--blue` |
| `.nav-links` | gap | `clamp(18px, 2.4vw, 34px)` |
| | alignment | `margin-left: auto` (right-aligned) |
| `.nav-links a` | size / weight | `11px` / `500` |
| | letter-spacing | `0.16em`, → `0.1em` at `≤820px` |
| | transform | `uppercase` |
| | opacity | `0.72` → `1` on hover |
| | padding-bottom | `3px` |
| `.nav-links a::after` | underline | `1px` `--accent`, `width 0→100%` over `0.28s` standard ease |

Wordmark is `UV`. There is no language toggle — it was removed deliberately.

### 4.2 Hero copy column — `.copy`

`z-index: 2`, `pointer-events: none`, `margin-block: auto`.

| Element | Property | Value |
| --- | --- | --- |
| `.copy` | max-width | `min(880px, 54vw)` |
| | padding-bottom | `calc(var(--overhang, 0px) + clamp(24px, 5vh, 72px))` |
| `.eyebrow` | size / weight | `11px` / `600` |
| | letter-spacing | `0.2em`, `uppercase` |
| | colour | `--accent` |
| | margin | `0 0 14px` |
| `.eyebrow em` | separator | a **rule**, not a middot: `2px × 13px`, `--accent`, `margin: 0 12px`. Rendered as an empty `<em>`. Height is fixed px on purpose — an `em`-based height collapses to 0 if `font-size` is zeroed |
| `.copy h1` | family / weight | `--serif` / `400` |
| | size | `clamp(36px, 4.4vw, 68px)` |
| | line-height | `1.14` |
| | letter-spacing | `0.005em` |
| | word-spacing | `0.06em` |
| | margin | `0 0 18px` |
| `.copy h1 .it` | third line | `font-style: italic` |
| `.sub` | size | `clamp(14px, 1.05vw, 17px)` |
| | line-height / colour | `1.6` / `--muted` |
| | max-width | `none` — fills the column, so each sentence is one row rather than two |
| `.pills` | layout | flex, wrap, gap `8px`, margin-top `clamp(20px, 2.6vh, 32px)` |
| `.pills` | gap | `6px`, margin-top `clamp(14px, 1.9vh, 24px)` |
| `.pills li` | border | `1px dashed var(--accent)`, radius `3.5px` |
| | shadow | **none** — flat, same line weight as the cards |
| | padding | `6px 10px` |
| | type | `11px` / `500`, `0.01em`, sentence case, `nowrap` |
| | colour | `--blue` |
| | hover | `box-shadow: 0 2px 10px rgba(0, 29, 87, 0.13)`, border `--blue`, `translateY(-1px)` |

Pills are **sentence case, not uppercase**, and sized to sit on a single row —
wrapping to two rows makes the copy column taller than the name can reach.

Pills follow a supplied SVG: `rx 3.5`, `stroke #B3197A`, `stroke-dasharray 4 4`.
The SVG's drop shadow was **explicitly dropped** — no shadows anywhere.

`.copy h1` and `.sub` are multiplied by **`var(--copy-scale, 1)`**, set from JS
— see [§6.2](#62-fitting-the-two-columns-to-one-band).

`padding-bottom: clamp(24px, 5vh, 72px)` is an intentional optical lift above
true centre.

### 4.3 Bottom strip — removed

The CTA row and credential strip are **gone**. Credentials are pills in the copy
column; there is no bottom rule. Do not reintroduce a strip without checking
[§6.2](#62-fitting-the-two-columns-to-one-band) — it changes the band the name
is fitted to.

### 4.4 Section — `.section`

| Property | Value |
| --- | --- |
| min-height | `78vh` |
| padding | `clamp(80px, 14vh, 160px) clamp(20px, 3.4vw, 46px)` |
| border-top | `1px solid var(--rule)` |
| layout | flex column, `justify-content: center` |
| `.section__title` | `--serif` `400`, `clamp(34px, 5vw, 68px)`, lh `1`, tracking `-0.012em` |
| `.section__note` | `clamp(15px, 1.25vw, 19px)`, lh `1.55`, `--muted`, `46ch`, margin-top `18px` |

**Sections carry no index numbers.** `01 —`, `02 —` etc. were removed
deliberately; do not reintroduce them.

### 4.5 Work — `.work` / `.work-card`

Projects are grouped into three labelled categories, each with a two-column
card grid. Modelled on the strangepixels work page.

| Element | Property | Value |
| --- | --- | --- |
| `.work` | layout | flex column, gap `clamp(48px, 8vh, 96px)` between categories |
| `.work-cat__label` | type | `--sans` `11px` / `600`, `0.2em`, `uppercase`, `--accent` |
| `.work-grid` | layout | `repeat(3, 1fr)`, gap `clamp(28px, 3.4vh, 56px) clamp(24px, 2.6vw, 44px)`; two columns at `≤1100px`, one at `≤700px` |
| `.work-card` | cursor | `none` — the follower stands in, see [§4.7](#47-cursor-follower--cursor) |
| `.work-card__media` | aspect | `4 / 3` |
| | border | `1px dashed var(--accent)`, radius `3.5px` — same line as the pills, **no shadow** |
| | background | `rgba(0, 29, 87, 0.06)` placeholder |
| `.work-card__wave` | effect | soft `#004CE4` radial band, `opacity 0 → 1` on hover, drifting ±12% over `6s` alternate |
| `.work-card__title` | type | `--serif` `400`, `clamp(17px, 1.4vw, 23px)`, lh `1.15`; `--accent` on hover |
| `.work-card__cat` | type | `10px` / `500`, `0.15em`, `uppercase`, `--blue` at `0.5` |

`.work-card__media` is a **placeholder**. When real images exist, add an
`image` field per project and swap the div for an `<img>` — the aspect ratio
and border stay.

### 4.7 Cursor follower — `.cursor`

A lagging dot that swells into a "View" badge over anything carrying
`data-cursor="view"`.

| State | Value |
| --- | --- |
| Rest | `10px` circle, `--accent` |
| Over a card (`.is-view`) | `84px` circle, label `opacity 0 → 1` |
| Transition | `0.28s` standard ease |
| Follow | GSAP `quickTo`, `0.42s`, `power3` |
| Label | `--sans` `10px` / `600`, `0.14em`, `uppercase`, white |

Hover is detected by `elementFromPoint(...).closest('[data-cursor="view"]')` on
pointermove rather than per-card listeners, so cards rendered later need no
wiring. Hidden entirely for coarse pointers and reduced motion, where the
native cursor is left alone.

### 4.6 Project detail — `.project`

Intentionally near-empty: title and a back link only.

| Element | Property | Value |
| --- | --- | --- |
| `.project` | padding | `clamp(96px, 18vh, 190px) clamp(20px, 3.4vw, 46px) 80px` |
| `.project__back` | size / weight | `11px` / `600`, `0.16em`, `uppercase` |
| | opacity | `0.6` → `1` on hover, colour → `--accent` |
| | margin-bottom | `clamp(22px, 4vh, 44px)` |
| `.project__title` | `--serif` `400`, `clamp(38px, 5.6vw, 84px)`, lh `1.06`, tracking `-0.012em`, `20ch` |
| `.project__note` | `--muted`, margin-top `18px` |

An unknown slug renders `Not found` plus the slug — it must never render blank.

---

## 5. Particle system

`src/components/ParticleName.jsx`. The single most intricate part of the site.

### 5.1 What it does

Renders `lines` (currently `['URVI', 'VARMA']`) in **Mukta 800** into an
offscreen canvas, samples the glyph pixels on a grid, and turns each hit into a
particle. Particles spring toward their home pixel, are repelled by the pointer,
and twinkle continuously.

### 5.2 Colour

| Constant | Value |
| --- | --- |
| `PALETTE` | `#B3197A` `#D6246B` `#E08A00` `#C25E00` `#0E7C6B` `#1E8A4D` `#0F6FA8` `#2A3FA8` `#5B2BA8` `#8A1FA0` |
| `BLUE` | `#001D57` — assigned to **14%** of particles, tying the field to the headline |
| Glint layer | **3.5%** of particles (`bright: Math.random() < 0.035`) |

Ten jewel tones: magenta, ruby, gold, amber, emerald, green, sapphire, indigo,
violet, orchid. Tuned for white — do not reuse on a dark ground.

### 5.3 Sizing — fills the band

The name and the copy column **share one band**: same top line, same bottom
line. The type is solved to fill that band rather than targeting a fixed size.

| Constant | Value | Meaning |
| --- | --- | --- |
| `GAP_RATIO` | `70 / 210` | Gap between lines as a ratio of cap height (from the original 210/70 spec) |

Ratios are measured once at 100px, so the solve is **direct, not iterative**:

```
blockPerPx = ascR + ascR × (1 + GAP_RATIO) × (lines − 1) + descR
size       = (bottomLimit − topInset) / blockPerPx
```

Then one width clamp: if the widest line exceeds `targetW`, scale down.
`targetW` is everything right of the copy column plus a **72px gutter**, passed
in as `pin.left` — never a fixed viewport fraction (see [§9.6](#96-fixed-width-fractions-cannot-hold-a-cap-height-spec)).

Because the name can only ever be *shorter* than the band (never taller), it
cannot hang below the copy — which is why the old overhang mechanism was removed.

### 5.3b Backing

A **crisp** glyph-shaped fill sits behind the particles:

| Constant | Value |
| --- | --- |
| `BACKING` | `rgba(0, 76, 228, 0.03)` — `#004CE4` at 3% |

Rendered once per resize into its own canvas and blitted with a single
`drawImage` per frame. **No blur** — the edges stay sharp. This is deliberately
unlike the soft shadow that was tried and removed; if you find yourself adding
a `filter`, you are re-introducing that mistake.

Verified by pixel readback: dominant backing pixel at alpha `8` (8/255 = 3.1%).
Small RGB drift from `0,76,228` on readback is canvas premultiplied-alpha
quantization at low alpha, not a colour error.

### 5.4 Physics

| Parameter | Value |
| --- | --- |
| Spring stiffness `k` | `0.01 + random × 0.02` (per particle) |
| Damping | `×0.865` per frame on both axes |
| Repel radius | `108px` |
| Repel force | `(1 − d/R)² × 7.5` |
| Particle size `base` | `0.85 + random × 1.25` |
| Twinkle speed `sp` | `0.7 + random × 1.6` |
| Twinkle phase `ph` | `random × 2π` |
| Entry scatter | `60 + random × 0.5 × max(W,H)` px from home, random angle |

Springs are deliberately **soft** — the field settles slowly and never looks
locked. A stiffer spring reads as mechanical.

Glints: drawn only when `sin(t × sp × 1.4 + ph) ≥ 0.72`, as an arc of radius
`base × 2.6 × tw`, alpha ramped from the threshold.

### 5.5 Rendering

- **Sampling step:** `5px` when narrow or `width > 1700`, else `4px`. Alpha
  threshold `> 140`.
- **Batched draw:** particles are grouped by colour and drawn as one path per
  colour — ~11 `fill()` calls per frame instead of one per particle.
- **DPR** capped at `2`.
- A frame is painted **synchronously** on boot before the first `rAF`, so the
  name is never missing on a throttled or backgrounded tab.
- Fonts are awaited (`document.fonts.load('800 100px Mukta', …)`) with a
  **2500ms** timeout before sampling — sampling before the face loads yields
  fallback-font shapes.

### 5.6 Props

| Prop | Purpose |
| --- | --- |
| `lines` | Array of strings, one per rendered line |
| `id` | Canvas id, defaults `sparkles` |
| `align()` | Returns `{ top, bottom, left }` in canvas-local px — the band and left bound |
| `onMetrics({top, bottom})` | Reports the band actually occupied, after sizing |
| `rebuildRef` | Populated with a rebuild function so the parent can re-run sizing |

---

## 6. Hero layout coupling

**Read this before touching the hero.** Four pieces measure each other at
runtime; changing one in isolation will break another.

### 6.1 The alignment contract

The particle block's **ink top is pinned to the top of the copy column** (the
eyebrow's cap height), so eyebrow, headline, sub, note and the name all sit
inside one band.

`Hero.jsx` supplies this via `align()`:

| Field | Derivation |
| --- | --- |
| `top` | `offsetTopWithin(eyebrow, hero) + capTopOf(eyebrow)` |
| `bottom` | `copyTop + last.offsetTop + last.offsetHeight` — the copy column's own bottom. A **target**, not a floor: the name fills to it |
| `left` | `copy.getBoundingClientRect().right − hero.left + 72` |

`capTopOf()` computes the **true optical cap top**, not the line-box top:

```
halfLeading = (lineHeight − (fontAscent + fontDescent)) / 2
baseline    = halfLeading + fontAscent
capTop      = baseline − actualBoundingBoxAscent
```

At the current headline size these differ by ~10px — aligning to the line-box
top looks visibly wrong.

### 6.2 Fitting the two columns to one band

**This is the part that was repeatedly got wrong, so read it before changing
either column.**

The name is right-aligned into whatever width is left beside the copy column.
That width **caps how tall the name can be**:

```
availW    = heroW × 0.96 − (copyRight + 72)
maxNameH  = (availW / widthR) × heightR      // ratios from lib/nameMetrics
```

If the copy is taller than `maxNameH`, the name physically cannot reach the
bottom of the band and the columns end on different lines. Growing the name
does not help — it is width-bound, not height-bound.

So `Hero` runs a layout pass that **shrinks the copy to the name's achievable
height**, via `--copy-scale` on the headline and sub, iterating at most 8 times
to within 2px. Then the band `[copy cap top, copy bottom]` is handed to
`ParticleName`, which fills it exactly.

Measured at 1728×970: before this, copy `220–697` vs name `228–610` — **87px
adrift at the bottom.** After: copy `273–673`, name `279–665`, both deltas
within the 4px sampling step.

The ratio maths lives in `src/lib/nameMetrics.js` and is imported by *both*
`Hero` and `ParticleName`, so the two cannot disagree about the geometry.

**Both sides must measure the name's left bound identically.** `nameLeftBound()`
is the single source: the right edge of the copy's widest **text** (a `Range`,
not the column box — the box is wider than the text fills) plus `GUTTER = 40`.
`align()` and the fit pass both call it. When they disagreed — the fit pass
measuring text, `align()` measuring the box plus 72 — the name was sized more
conservatively than the fit assumed and sat 46px short at the bottom. That is
subtle and was mistaken for a sizing problem three times.

**Only ever shrink, and only gently.** `MIN_SCALE = 0.88`. Crushing the
headline to force a perfect bottom match reads far worse than a small residual
gap — a supplied WRONG/RIGHT comparison made this explicit: the RIGHT version
keeps the headline near full size and tolerates ~12px of mismatch. An earlier
build shrank the headline from 68px to 49px to close the gap, and that was
rejected. Current: headline 63px, residual gap 18px.

The other levers, used before touching scale: keep the pills on **one row**,
keep each sub sentence to **one line**, `GUTTER = 40`, and the name's right
edge at `0.985` of the hero width. Current: headline 63px, top +5, bottom −6.

### 6.3 Legibility comes from layout

On wide viewports the copy sits left on clean white and the name occupies the
right field. There is **no scrim, no shadow, no dimming** — a soft shadow was
tried and explicitly removed. If they ever overlap, fix the geometry.

Measured at 1440×820: copy text ends `x=513`, sparkle ink starts `x=783`.

---

## 7. Routing and deployment invariants

### 7.1 Routes

| Path | Renders |
| --- | --- |
| `/` | `Home` — hero + Work, About, Photography, Contact |
| `/work/:slug` | `Project` — blank detail page |
| `*` | `Project`, which renders `Not found` |

`ScrollManager` in `App.jsx` scrolls to `hash` if present, else to top.
Nav and CTA hrefs are **absolute** (`/#work`), so they work from a detail page.

### 7.2 The base path contract

Deployed to a **project** repo, so Pages serves from `/designportfolio/`.
**Four places must agree** — change them together or the site breaks:

| Where | Value |
| --- | --- |
| `vite.config.js` | `base: '/designportfolio/'` |
| `src/main.jsx` | router `basename`, derived from `import.meta.env.BASE_URL` |
| `public/404.html` | `pathSegmentsToKeep = 1` |
| `src/fonts.js` | font URL built from `BASE_URL` |

Live at **https://urvivarma5-source.github.io/designportfolio/**

### 7.3 The SPA shim

Pages has no server-side rewrite, so `/designportfolio/work/elderease` would
404. `public/404.html` encodes the path into a query string and redirects;
`index.html` decodes it before React mounts.

**Known and accepted:** deep links return an **HTTP 404 status** even though
they render correctly, because the redirect is client-side. Users never notice;
crawlers may. Fixing it would require pre-rendering.

### 7.4 Moving to a custom domain

1. `vite.config.js` → `base: '/'`
2. `public/404.html` → `pathSegmentsToKeep = 0`
3. Rename `public/CNAME.example` → `public/CNAME`, bare domain only
4. DNS: apex → `185.199.108.153` `.109.153` `.110.153` `.111.153`; or `www` →
   CNAME to `urvivarma5-source.github.io`
5. Settings → Pages → set domain, enable Enforce HTTPS

The router `basename` needs no change — it follows `BASE_URL`.

---

## 8. Content model

### 8.1 `src/content.js`

**All hero copy lives here.** Never hardcode copy in a component.

| Key | Shape | Notes |
| --- | --- | --- |
| `nameLines` | `string[]` | One entry per particle line. Currently `['URVI','VARMA']` |
| `nameRoman` | `string` | Accessible label |
| `logo` | `string` | Wordmark, currently `UV` |
| `nav` | `{label, href}[]` | Hrefs absolute (`/#work`) |
| `eyebrow` | `string[]` | Joined with a dimmed `·`. Currently Product Design · Research · Strategy |
| `headline` | `{text, it?}[]` | **Exactly 3**, each ≤ ~20 chars so it cannot wrap — see [§9.8](#98-headline-lines-silently-wrap-and-the-usual-wrap-check-is-a-lie). `it: true` marks the italic line |
| `sub` | `string[]` | **Exactly 2** |
| `phNote` | `string \| null` | Placeholder marker. Currently `null` — real copy is in |
| `credentials` | `string[]` | Rendered as dashed pills **inside the copy column**. There is no bottom strip |

Hero copy is now real, not placeholder. `phNote` is `null`.

### 8.2 `src/projects.js`

Exports `categories` (the grouped, rendered structure), `uncategorised`
(projects deliberately not shown — currently ElderEase, kept rather than
deleted so it can be restored by moving it into a category), `projects` (a flat
list with `category` attached), and `getProject(slug)` which searches both.


Each project is `{ slug, title, note? }`. Detail pages are still blank by
design. Slugs match the original Adobe Portfolio URLs where they existed; three
projects are new and have no page content: `smarter-project`,
`branding-for-sugar-rush`, `employee-tool-use-at-intuit`.

When adding metadata (year, role, thumbnail), add the fields here, extend
`WorkGrid`, and **document the new card tokens in [§4.5](#45-work-grid--work-grid--work-card)**.

---

## 9. Traps that have already bitten us

### 9.1 A stalled ticker must never leave the page blank

The entrance was originally GSAP `.from()` tweens. When the ticker didn't run,
the hero stayed invisible. Entrance is now **pure CSS keyframes**. Do not move
it back into JS.

### 9.2 Save the data file before the components that read it

Saving `Hero.jsx` referencing `content.logo` *before* saving `content.js`
crashed the app through HMR (`Cannot read properties of undefined`). When adding
a content key: **write `content.js` first.**

### 9.3 Parallax poisons `getBoundingClientRect`

`.copy` carries a GSAP scroll transform, so `getBoundingClientRect()` returns a
shifted position mid-scroll. All vertical measurement uses the `offsetTop`
chain (`offsetTopWithin`), which ignores transforms. `left` may use rects
because the parallax is vertical only.

### 9.4 Vite does not rewrite absolute public-asset URLs in CSS

`url(/fonts/x.woff2)` in an `@font-face` stayed rooted at `/` and 404'd under
the base path. Fonts are now registered via the **FontFace API** in `fonts.js`
using `BASE_URL`. Never reference a public asset by absolute path in CSS.

### 9.5 The strip's margin broke optical centring

`ul.strip` had `margin-top: clamp(40px, 7vh, 86px)`, which sat inside the space
the copy's auto margins were dividing, pushing the composition off centre. It is
now `margin: 0`; the `border-top` does the separating. **Keep it at 0.**

### 9.6 Fixed width fractions cannot hold a cap-height spec

A fixed `44vw` allowance silently prevented the 210px cap from ever being
reached. The name now claims the real remaining width beside the copy column.
Size specs and width fractions fight; let the measured space win.

### 9.7 Sampling before the font loads gives fallback shapes

Always await `document.fonts.load(...)` (with a timeout) before sampling glyphs.

### 9.8 Headline lines silently wrap, and the usual wrap check is a lie

`headline` in `content.js` is three *authored* lines, but each is a block that
will wrap if it exceeds the column. The three-line composition then quietly
becomes five and nobody notices in a thumbnail.

**Width budget:** each line must fit the copy column unbroken. At the largest
step that is **660px at 68px type — roughly 20 characters.** Measure new
wording before committing it.

`getClientRects().length` **does not detect this.** `.line` spans are
`display: block`, so they always return exactly one rect no matter how many
text rows they contain. Check either of these instead:

```js
// rendered rows
Math.round(span.getBoundingClientRect().height / lineHeight) === 1
// or true text width, via a Range — the block's own rect is full-column
const r = document.createRange(); r.selectNodeContents(span)
r.getBoundingClientRect().width <= columnWidth
```

---

### 9.9 A fit pass that dispatches `resize` will re-enter itself

`Hero`'s fit pass dispatches a synthetic `resize` so the canvas re-reads the
settled geometry — and `Hero` also *listens* for `resize` to re-fit. Without a
guard that is an infinite loop. A `selfDispatched` flag brackets the dispatch;
`dispatchEvent` is synchronous, so listeners run before the flag resets.

If you add another listener-plus-dispatch pair, guard it the same way.

## 10. Verification protocol

**Screenshots of the particle field are not evidence.** The preview pane
throttles `requestAnimationFrame`; a capture routinely shows a half-settled
field that looks broken but is fine. Verify by **measuring the DOM and canvas**.

### 10.1 Measuring the particle band

Read the canvas pixels and take a **trimmed percentile**, not raw min/max —
in-flight particles are outliers that inflate the bounding box:

```js
const rows = new Float64Array(c.height); let total = 0
for (let y = 0; y < c.height; y += 2)
  for (let x = 0; x < c.width; x += 2)
    if (img[(y * c.width + x) * 4 + 3] > 90) { rows[y]++; total++ }
const pct = p => { let a = 0; for (let y = 0; y < c.height; y++) { a += rows[y]; if (a >= total * p) return y } }
const inkTop = pct(0.01) / dpr, inkBottom = pct(0.99) / dpr
```

### 10.2 Checklist for a hero change

- [ ] `sparkleInkTop ≈ eyebrowTop` (within the sampling step, ~8px)
- [ ] Copy's rightmost text < sparkle ink left edge
- [ ] Nothing overlaps the strip
- [ ] Space above the band ≈ space below it
- [ ] Checked at wide (2000×1263), mid (1440×820) and mobile (375×812)
- [ ] Each headline line still renders as **one** row (see §9.8 — not `getClientRects`)
- [ ] Name top **and bottom** are within ~8px of the copy column's — the bottom
      is the one that drifts (see §6.2)
- [ ] `prefers-reduced-motion` still renders the name

### 10.3 Checklist for a routing or deploy change

- [ ] `npm run build` clean
- [ ] `npm run preview`, then load the **base path**, not `/`
- [ ] A deep link renders and the query string is cleaned
- [ ] No request 404s except the known absent Self Modern files
- [ ] Every nav/CTA href carries the base prefix

---

## 11. Changelog

Newest first. One line per meaningful change, with the commit.

| Commit | Change |
| --- | --- |
| _pending_ | Copy column widened to 880 so the sub is one line per sentence; eyebrow separators became rules; pills 11px with hover shadow; em dashes removed from copy; work grid to three columns; `nameLeftBound()` unified so align and fit agree |
| `7443d04` | Work grouped into three categories with a two-column card grid; cursor follower with "View" badge and card wave; pill shadows and caps removed; headline no longer crushed (MIN_SCALE 0.92) |
| `2675800` | Columns fitted to one band via `--copy-scale`; CTA row removed; pills restyled to the supplied SVG; backing 5% → 3%; shared `lib/nameMetrics` |
| `2501dd1` | Eyebrow → Strategy; credentials moved into dotted pills in the copy column; sub reduced; name now fills the shared band; crisp `#004CE4` 5% backing behind the letters; overhang loop removed |
| `97871a4` | Real hero copy in (Currently / Previously / MS HCI). Headline reworded to fit the column width budget; §9.8 added |
| `54fbd1f` | Added DESIGN.md, CLAUDE.md, AGENTS.md |
| `0cc76da` | Configured for the `designportfolio` project repo: base path, router basename, 404 shim, FontFace loading |
| `0be7cce` | Self Modern set up self-hosted with Newsreader stand-in; name pinned to the copy column's top so everything shares one band; composition lifted above true centre |
| `c25c3c1` | Hero centred rather than bottom-pinned; name sized to a 210px cap / 70px gap spec; serif broadened |
| `8c37283` | Name aligned to the copy column's optical top and bottom |
| `2ba9c16` | Particle name became `URVI / VARMA`; micro Latin labels removed |
| `9018b24` | Two-column hero, soft shadow removed, project routes wired up |
| `510c45e` | Full-bleed name, soft shadow (later removed), shirorekha-anchored labels |
| `3b1f872` | Name/copy overlap resolved, Latin labels added, UV mark, right-aligned nav |
| `246df23` | Matched the approved hero design: Mukta sparkles, magenta accent |
| `4fc394c` | Initial landing page: particle name hero |

---

## 12. Open threads

- **Hero copy is placeholder.** Real words go in `content.js`.
- **Project detail pages are blank by design.** Awaiting case-study content and
  a decision on metadata fields.
- **Self Modern is not installed.** Newsreader is standing in.
- **No `about` / `photography` / `contact` content** — stub sections only.
- **No images anywhere yet.** No image loading strategy has been chosen; decide
  one (sizes, formats, lazy loading) before adding the first one, and document
  it here.
