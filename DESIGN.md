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
| a case-study page, its copy, or its artwork | [§4.9](#49-case-study--cs) / [§4.10](#410-guide-case-studies--g), and [§11b](#11b-case-studies) / [§11c](#11c-the-guide-case-studies) |
| anything that cost you >20 min to debug | [§9 Traps](#9-traps-that-have-already-bitten-us) |
| anything at all | [§11 Changelog](#11-changelog) — one line |

### 0.3 Rules that are not negotiable

- **Never hardcode the base path.** Derive it from `import.meta.env.BASE_URL`.
  See [§7.2](#72-the-base-path-contract).
- **Never add a colour outside the palette** in [§2.1](#21-colour). If a new one
  is genuinely needed, add it as a token here first, with a stated role. The one
  standing exception is a case study, which keeps its own artwork's palette in a
  block-scoped token set — see [§4.9](#49-case-study--cs) and
  [§11b](#11b-case-studies). Those tokens are never promoted to `:root`.
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
vite.config.js          base: '/'
public/
  404.html              Pages SPA shim (pathSegmentsToKeep = 0)
  CNAME                  www.urvivarma.com — the custom domain
  fonts/                 Self Modern woff2 files go here (absent by default)
src/
  main.jsx              Router basename from BASE_URL, loadSelfModern()
  fonts.js              Self Modern registration via FontFace API
  content.js            ALL hero copy
  projects.js           Project names + slugs
  App.jsx               Routes + ScrollManager
  lib/
    nameMetrics.js      Shared name geometry (Hero + ParticleName)
    palette.js          The sparkle palette (ParticleName + ScrollCue)
  styles/global.css     Every style in the project
  pages/
    Home.jsx            Hero + four sections
    Project.jsx         Blank detail page
  components/
    Hero.jsx            Hero composition, measurement, GSAP parallax
    Nav.jsx             UV mark + links
    ParticleName.jsx    The canvas particle system
    ScrollCue.jsx       Sparkle chevrons at the foot of the hero
    DashFrame.jsx       The shared dashed SVG frame
    CursorFollower.jsx  Lagging dot / "View" badge
    Section.jsx         Generic section wrapper
    WorkGrid.jsx        Project card list
    CardThumb.jsx       Slug → work-card artwork
  caseStudies/          One data file + one page per study — see §8.3
  assets/
    tctd/               "Filling Cabinets to Fingertips" line art (SVG)
    guide1/ guide2/     Guide line art (SVG) and screenshots (WebP)
tools/                  Figma-export extractors — see §11b, §11c
  extract_case_study.py         copy, out of /Type3 fonts
  extract_case_study_art.py     line art, as vector SVG
  extract_case_study_images.py  bitmaps, composited onto white as WebP
  render_case_study_regions.py  whole compositions, rendered via pdftoppm
  dump_pdf_boxes.py             the layout: every fill, every image placement
  *-regions.json                the region lists those three read
```

The `tools/` scripts are **development-time only** — nothing at build time
reads them or the PDFs, which are gitignored.

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
| `--rule-dash` | `#b3197a` | The dashed frame stroke. The reference SVG used `#D6576B`; **our accent is used instead**. |
| `--accent` | `#b3197a` | Magenta. Eyebrow text, nav hover underline, CTA underline, hover states. |

Case studies do **not** use this palette. `.cs` declares its own tokens, local
to that block, because §11b's fidelity rule keeps the source artwork's colours.
They live in [§4.9](#49-case-study--cs) and must not leak onto `:root`.

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
| `--sans` | `'Inter', -apple-system, …` | Nav, work cards, section notes |
| `--sans-copy` | `'Source Sans 3', 'Source Sans Pro', var(--sans)` | Hero left column (eyebrow, sub, pills) and the case studies. Google Fonts renamed Source Sans Pro to **Source Sans 3**; the old name stays in the stack for local installs |
| `--deva` | `'Mukta', system-ui, sans-serif` | The `UV` wordmark, and the particle glyph source |

`--cs-serif` (`'Roboto Serif'`) and `--cs-slab` (`'Roboto Slab'`) are declared
on `.cs`, not here. The case study uses **the artwork's own faces**, which are
not the site's — see [§4.9](#49-case-study--cs) and [§11b](#11b-case-studies).
`--serif` is not used anywhere inside `.cs`.

**Self Modern** (Velvetyne / Lucas Le Bihan, SIL OFL) is not on Google Fonts —
verified, the API returns HTTP 400. It is self-hosted and **currently absent**;
Newsreader stands in. Newsreader was chosen by rendering eight candidates against
the client's specimen: it matches the vertical stress, moderate contrast and fine
flat unbracketed serifs. Rejected: Literata and Source Serif (too slabby),
Playfair and Prata (contrast too high), DM Serif Display (thicks too heavy).

To activate Self Modern: drop `SelfModern-Regular.woff2` and
`SelfModern-Italic.woff2` into `public/fonts/`. Nothing else changes.

**Google Fonts loaded** (`index.html`), keep this list minimal:
`Newsreader` (ital 0/1, opsz 6–72, wght 400) · `Inter` (400/500/600) ·
`Roboto Serif` (ital 0/1, wght 400/500/600/700) · `Roboto Slab` (400/500/600/700) ·
`Source Sans 3` (ital 0/1, wght 400/500/600) · `Mukta` (400/600/800).

Roboto Serif is the case study's serif and the only reason its bold weights are
loaded. Newsreader is 400-only: nothing on the site sets it bold, and the
case study no longer borrows it.

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

`.nav--inset` adds `22px clamp(20px, 3.4vw, 46px) 0` of padding. The hero
supplies that inset through `.hero`'s own padding; a page without a hero has to
supply it itself, so `<Nav inset />` is what every non-hero page renders. **The
two values must stay in step with `.hero`'s padding** or the wordmark moves
between the landing page and a detail page. See
[§9.12](#912-the-navs-inset-was-the-heros-padding).

Wordmark is `UV`. There is no language toggle — it was removed deliberately.

### 4.2 Hero copy column — `.copy`

`z-index: 2`, `pointer-events: none`, `margin-block: auto`.

| Element | Property | Value |
| --- | --- | --- |
| `.copy` | max-width | `min(760px, 42vw)` — the copy must stay left of ~45% of the viewport |
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
| `.sub` | size | `clamp(13px, 0.88vw, 15px)` |
| | line-height / colour | `1.6` / `--muted` |
| | max-width | `none` — fills the column, so each sentence is one row rather than two |
| `.pills` | layout | flex, wrap, gap `8px`, margin-top `clamp(20px, 2.6vh, 32px)` |
| `.pills` | gap | `6px`, margin-top `clamp(14px, 1.9vh, 24px)`. Three pills; a fourth pushes them to two rows |
| `.pills li` | border | `1px dashed var(--accent)`, radius `3.5px` — **not** the card frame |
| | padding | `6px 10px` |
| | type | `11px` / `500`, `0.01em`, sentence case, `nowrap` |
| | colour | `--blue` |
| | hover | `box-shadow: 0 2px 10px rgba(0, 29, 87, 0.13)`, border `--blue`, `translateY(-1px)` |

Pills are **sentence case, not uppercase**, and sized to sit on a single row —
wrapping to two rows makes the copy column taller than the name can reach.

Pills follow the earlier SVG reference: `1px dashed #B3197A`, `rx 3.5`. Its drop
shadow was **explicitly dropped**; only the hover state carries one. The pills
are deliberately a lighter treatment than the card frame — see
[§9.10](#910-pill-geometry-feeds-the-hero-layout).

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
| border-top | **none** — sections are separated by whitespace only |
| layout | flex column, `justify-content: center` |
| `.section__title` | `--serif` `400`, `clamp(34px, 5vw, 68px)`, lh `1`, tracking `-0.012em`, **`--accent`** |
| | a `::after` hairline (`flex: 1`, `--rule`) runs from the text to the container edge — that rule is what makes it read as a heading rather than loose display type |
| `.section__note` | `clamp(15px, 1.25vw, 19px)`, lh `1.55`, `--muted`, `46ch`, margin-top `18px` |

**Sections carry no index numbers.** `01 —`, `02 —` etc. were removed
deliberately; do not reintroduce them.

### 4.5 Work — `.work` / `.work-card`

Projects are grouped into three labelled categories, each with a two-column
card grid. Modelled on the strangepixels work page.

| Element | Property | Value |
| --- | --- | --- |
| `.work` | layout | flex column, gap `clamp(48px, 8vh, 96px)` between categories |
| `.work-cat__label` | type | `--sans` `14px` / `600`, `0.2em`, `uppercase`, **`--blue`** |
| `.work-grid` | layout | `repeat(3, 1fr)`, `grid-auto-rows: 1fr`, gap `clamp(28px, 3.4vh, 56px) clamp(24px, 2.6vw, 44px)`; two columns at `≤1100px`, one at `≤700px` |
| `.work-grid li` | `display: flex` so the card fills its stretched cell |
| `.work-card` | frame | `<DashFrame />`, see [§4.6b](#46b-dashed-frame--dash-frame--dashframejsx) — the edge is on the **card**, so image and text sit inside one frame |
| | padding / radius | `16px` / `9px` |
| | hover | `translateY(-3px)` |
| | cursor | `none` — the follower stands in, see [§4.8](#48-cursor-follower--cursor) |
| `.work-card__media` | aspect | `4 / 3`, radius `2px`, no border |
| | background | `rgba(0, 29, 87, 0.06)` — the ground the artwork sits on, and the whole media block on a card that has none |
| `.card-art` | fill | absolute `inset: 0`, `place-content: center`, padding `9% 8%` |
| `.work-card__meta` | padding | `16px 4px 6px`, `flex: 1` |


| `.work-card__wave` | effect | soft `#004CE4` radial band, `opacity 0 → 1` on hover, drifting ±12% over `6s` alternate |
| `.work-card__title` | type | `--serif` `400`, `clamp(17px, 1.4vw, 23px)`, lh `1.15`; `--accent` on hover |
| `.work-card__note` | type | `9px` / `600`, `0.16em`, `uppercase`, `--accent` (e.g. "Part 1"); lh `1.2`, `min-height: 1.2em` |
| `.work-card__title` | reserve | `min-height: 2.3em` (two lines) |
| `.work-card__desc` | type | `13px`, lh `1.5`, `--muted`, `44ch`; `min-height: 4.5em` (three lines) |

**Every card is the same size.** `note` and `desc` are always rendered — empty
when absent — and each reserves fixed line-space, so cards match across
categories and leave whitespace rather than shrinking. `grid-auto-rows: 1fr`
alone is not enough: each category is its own grid, so it only equalises within
one. Measured: all 11 cards 516 × 551.

**Card artwork lives in `CardThumb.jsx`, not in `projects.js`.** It is a
slug → component map with a `getThumb(slug)` lookup, the same shape as
[§8.3](#83-srccasestudies)'s case-study registry, for the same reason: a card's
art is markup and CSS, not copy, and `projects.js` stays copy-only. A slug with
no entry renders the plain ground — still eight of the eleven, because those
projects have no source artwork in the repo at all.

"Filling Cabinets to Fingertips" reuses **its own case-study hero art**,
imported from `caseStudies/icons` rather than re-exported so each SVG is
imported once in the bundle. Its three pieces are laid out on the same
two-column grid as `.cs-hero__art`, sized as a share of the media block, so the
arrangement holds at every card width. The hero's **title panel is deliberately
not in the thumbnail** — the card prints the title and description directly
underneath it, and text baked into an image is neither selectable nor legible
at card size.

The two Guide cards take **one drawing each**, through `.card-art--single`,
which is `display: block` with `object-fit: contain` rather than the centred
grid the multi-piece TCTD thumbnail uses. The reason is
[§9.16](#916-an-extracted-svg-has-no-intrinsic-size): these SVGs carry a
viewBox and no width/height, so a box has to be given or the card renders
empty.

Part 1 takes its own hero drawing. **Part 2 takes the ship from its pivot
section, not its hero** — both Guide pages open with the same drawing, and two
identical thumbnails side by side in the grid read as a mistake. The car from
that same section is the stronger image, but its SVG is four times the size and
this is a 4:3 thumbnail on the home page.

The hover `.work-card__wave` still paints over the artwork; it is the grid's
hover language and is not per-card.

### 4.6b Dashed frame — `.dash-frame` / `DashFrame.jsx`

**Project cards only.** The credential pills keep their own `1px dashed
var(--accent)` at `3.5px` radius — applying this frame to them changed their
padding, which widened the copy column and moved the particle name. Do not
extend `DashFrame` to the pills.

Matches the supplied SVG reference exactly:

| Property | Value |
| --- | --- |
| `stroke` | `var(--rule-dash)` = `#B3197A`, our accent (the reference's `#D6576B` was not adopted) |
| `stroke-width` | `2` |
| `stroke-dasharray` | `10 10` |
| `rx` | `9px` |
| `fill` | `none` |
| Inset | `x/y: 1px`, `width/height: calc(100% - 2px)` — the reference's 283×202 rect in a 285×204 box |

**Why a real `<svg>` and not CSS.** Two earlier attempts failed:

- `border: dashed` derives dash length from `border-width`. There is no way to
  ask for 10/10.
- Repeating linear-gradients give arbitrary dash lengths but **cannot follow a
  rounded corner**, and the reference has `rx 9`.

The `<svg>` carries **no `viewBox`**, so SVG user units are CSS pixels and the
dashes never stretch with the box. Geometry is set from CSS rather than
presentation attributes because CSS allows `calc()`.

Host elements need `position: relative`.

### 4.7 Scroll cue — `.scroll-cue` / `ScrollCue.jsx`

Two chevrons rendered in **the same sparkle material as the name** — same
palette, same twinkle — as a quiet scroll prompt. An earlier label-plus-hairline
version was rejected as too literal.

**It is a `<button>`, not decoration.** Clicking it scrolls to `#work`, and it
is the only affordance in the hero, so it is keyboard reachable, carries an
`aria-label`, and takes a focus ring and a 10/16px hit area. The canvas inside
it is `aria-hidden`. It honours `prefers-reduced-motion` in how it *scrolls*
as well as how it animates — `behavior: 'auto'` rather than `'smooth'`.

**The chevrons are wide and shallow: a 44 × 9 V, not the 22 × 11 one this
started as.** At the steeper angle a pair of them reads as an arrowhead
pointing at something in particular; flattened out they read as "keep going",
which is what they mean.

| Property | Value |
| --- | --- |
| Canvas | `64 × 44` CSS, DPR-capped at 2 |
| Mask | two chevrons stroked at `3.4px`, round caps, `44` wide × `9` deep, tops at `9` and `24`, sampled at a 2px step, alpha > 120 |
| Colour | `pickColour()` from `lib/palette` — identical to the name |
| Twinkle | `0.35 + 0.6 × sin(t·sp − ph)`, `sp` 1.5–2.4 |
| Drift | `sin(t·0.9 − ph) × 0.8px`; phase runs down the pair so the shimmer travels **downward** |
| Position | absolute, centred, `clamp(14px, 2.6vh, 30px)` off the hero's bottom |

Static (no drift) under `prefers-reduced-motion`.

### 4.8 Cursor follower — `.cursor`

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

The frame every detail page sits in: `<Nav inset />`, a back link, then either a
case study from `src/caseStudies` or — for a slug with no case study yet — the
title alone.

| Element | Property | Value |
| --- | --- | --- |
| `.project` | padding | `clamp(26px, 4.5vh, 52px) clamp(20px, 3.4vw, 46px) 80px` |
| `.project__back` | size / weight | `11px` / `600`, `0.16em`, `uppercase` |
| | opacity | `0.6` → `1` on hover, colour → `--accent` |
| | margin-bottom | `clamp(22px, 4vh, 44px)` |
| `.project__title` | `--serif` `400`, `clamp(38px, 5.6vw, 84px)`, lh `1.06`, tracking `-0.012em`, `20ch` |
| `.project__note` | `--muted`, margin-top `18px` |

An unknown slug renders `Not found` plus the slug — it must never render blank.

The top padding used to be `clamp(96px, 18vh, 190px)`, propping the page down
because the nav was pinned to the very corner. `.nav--inset` fixed the cause, so
the padding is now an ordinary one. See [§9.12](#912-the-navs-inset-was-the-heros-padding).

---

### 4.9 Case study — `.cs`

One self-contained block per case study, currently only "Filling Cabinets to
Fingertips" (`src/caseStudies/TctdPage.jsx`). It is walled off from the rest of
the site on purpose: [§11b](#11b-case-studies)'s fidelity rule keeps the source
artwork's own colours, so `.cs` declares them locally and they appear nowhere
else.

| Token | Value | Role |
| --- | --- | --- |
| `--cs-green` | `#2f6454` | Body prose, the icon line art, the title |
| `--cs-dark` | `#1a3740` | Headings, card titles, figures, in-card prose |
| `--cs-coral` | `#d6576b` | Every dashed frame, the section numbers, numbered badges |
| `--cs-teal` | `#5b9aad` | Time-study bars, journey step discs, the "paper" panel |
| `--cs-deep` | `#2d5a4a` | The "digital" panel, mockup chrome, outcome figures |
| `--cs-band` | `#eef4f6` | The tint strip behind a row of text |
| `--cs-track` | `#d8dbd7` | Time-study bar track |
| `--cs-line` | `#e8eae9` | Solid card border |

| Element | Property | Value |
| --- | --- | --- |
| `.cs` | max-width | `1180px`, centred |
| | `--cs-k` | `0.787` — **the whole page's type scale** |
| | `--cs-serif` | `'Roboto Serif'` — **the artwork's own serif**, not the site's `--serif` |
| | `--cs-slab` | `'Roboto Slab'`, for `.cs-num` only |
| | `--cs-dash` | `2px dashed var(--cs-coral)` |
| | `--cs-radius` | `9px` |
| | `--cs-shadow` | `0 0 6px rgba(0, 0, 0, 0.09)` — the export's blur, **not** its alpha; see below |
| | `--cs-pad` | `26px` solid-card padding |
| solid card | | `1px` `--cs-line`, radius `12px`, `0 2px 12px rgba(26,55,64,0.05)` |
| `.cs-badge` | disc | `34pt`, `--cs-coral`, white numeral at `20pt` |
| `.cs-step__n` | disc | `38px`, `--cs-teal`, white numeral |

**`--cs-k` is the one number that resizes the page.** Every font-size in the
block is `calc(<the artwork's point size> * var(--cs-k))`, so the sizes in the
CSS read as the Figma frame's own values and the whole page retunes from one
place. The frame carries **1500pt of content** against this page's 1180px,
which is where `0.787` comes from — change the max-width and this must change
with it or the type stops being in proportion to the layout. The responsive
steps hold the same ratio at `0.7` and `0.656`.

**The artwork's type, from its own CSS export.** The Figma export names the
faces and their metrics, so these are transcribed rather than matched by eye:

| | Face | Weight | Size / line-height | Tracking | Colour |
| --- | --- | --- | --- | --- | --- |
| body, notes, labels | Source Sans | 400 (700 when emphasised) | `24 / 30` | `0.05em` | `--cs-dark`, `--cs-coral` for a note |
| card title | Roboto Serif | 600 | `28 / 25` | none | `--cs-dark` |

Two of those are set on `.cs` itself and inherit: **line-height `1.25`** and
**letter-spacing `0.05em`**. Without them the block read looser and tighter-
tracked than the artwork at every size — it was the single biggest reason the
page looked wrong. The serif is set solid, so every serif element resets the
tracking back to `normal` in one grouped rule.

**Gutters are per row, not global.** The artwork does not use one gutter: the
stat and meta rows sit on 27pt, the journey on 35pt, the department pair on
39pt, the problem cards on 51pt, the two-up card grid on 67pt, and the method
row on 71pt *inset* 37pt inside the content column. Each is written as
`calc(<pt> * var(--cs-k))` for the same reason as the type.

**Dashed frames.** One rule lists every dashed box and gives it `--cs-dash`,
`--cs-radius` and `--cs-shadow`; the sizes stay per row. The stroke and radius
are the export's (`2px dashed #D6576B`, `border-radius: 10px`, written here as
9px from the frame SVG — they disagree by a pixel and it does not show).

**The shadow's alpha is deliberately not the export's.** The export shadows
these cards with `drop-shadow(0 0 6px rgba(0,0,0,0.2))`, a filter that follows
the element's own alpha — for a dashed border that is *the dashes*, a broken
line of soft dots. A CSS `box-shadow` at the same alpha paints the whole card
instead, which reads several times heavier and looked wrong on the page.
`filter` cannot be substituted: it would shadow each card's text as well. So
the blur is the export's and the alpha is dropped to `0.09` to match the
weight. **If a card's shadow ever looks heavy, this is the number**; do not
raise it back to 20% on the grounds that the export says so.

The SVG's `stroke-dasharray="10 10"` has **no CSS equivalent**: `border-style:
dashed` lets the browser pick the dash length. If the dash rhythm ever has to
be exact, that means an SVG border in the style of `DashFrame` ([§4.6b](#46b-dashed-frame--dash-frame--dashframejsx)),
not a CSS border.

**The tint band.** `.cs-band` paints an **opaque** `--cs-band` strip that runs
`100vw` past its own box on both sides. Every cell in the row paints one, they
all overlap into a single unbroken strip, and the row (`.cs-stats`,
`.cs-probs`) clips it back with `overflow: clip` plus an
`overflow-clip-margin` of one gutter, which is the bleed the artwork has.

Three things about that are load-bearing:

- **The fill must stay opaque.** Every band overlaps every other one; a
  translucent fill would darken across the whole row.
- **`clip`, not `hidden`.** `hidden` would make the row a scroll container.
- **The clip margin is what lets the cards' shadows out.** Without it
  `overflow: clip` would cut `--cs-shadow` off at the row's edge.
- **It is `56px`, a literal.** Twice the export's 28pt bleed, so the strip
  reads as a deliberate full-width band. It cannot be written as a `calc()` —
  see [§9.15](#915-overflow-clip-margin-computes-to-0-from-a-calc).
- **The band's own depth is set per row.** The block default reaches further
  than the export does, and on `.cs-prob__text` it reached up over the coral
  note above the prose, so that row restates it: 7pt above the text and 11pt
  below, which is the export's `232-370` against a `239-359` text box. The
  30pt gap between note and prose is a margin on the **note**; as padding on
  the prose it would have been inside the band's box and pushed it back up
  over the note.

`.project` carries `overflow-x: clip` so that bleed can run into the page's
side padding without the page gaining a horizontal scrollbar — at ~900px the
gutter is narrower than the bleed. `clip`, not `hidden`, for the same reason as
the rows.

An earlier version bled each band by only half a gutter, which left it stranded
inside its own card's padding: three separate rectangles with white between
them instead of one band.

**Measures are set in the artwork's points, never in `ch`.** `ch` tracks the
font's zero-width, so a `ch` measure drifts the moment the face changes — and
it did: `.cs-body` at `62ch` was so much narrower than the artwork that every
section's opening paragraph ran three lines where the export runs two, and
`.cs-pull` at `62ch` broke the §01 constraint quote in half where the export
sets it on one line. Both now read from the export:

| | Artwork | Ours |
| --- | --- | --- |
| `.cs-body` | ~980pt of a 1492pt content column | `calc(980px * var(--cs-k))` |
| `.cs-pull` | longest line ~1214pt; the next block breaks before 1270pt | `calc(1270px * var(--cs-k))` |
| `.cs-hero__frame` inset | 37pt | `calc(37px * var(--cs-k))` |
| `.cs-hero__sub` band | clears the frame by 8pt each side | `calc(-45px * var(--cs-k))` |

The hero inset is load-bearing: a larger one wrapped the h1, which the artwork
sets on one line. So is the hero band's overhang — it runs 32pt past the frame
on each side in the artwork, so `.cs-hero__sub::before` is `-69pt` (37pt of
frame inset plus the 32pt).

**The numbered badge lives inside `.cs-card__title`, not on top of the card.**
The title is a flex row — title, then badge, `space-between` and centred — so
the badge is aligned to the title's own middle and its right edge falls on the
card's padding, making the two side insets equal by construction. Absolutely
positioned it could only be aligned to the card's corner, which put it below
the title's centre and, on the §08 cards, on top of the sub-heading beneath it.
Being in flow is also what stops it overlapping anything: it takes its own
space in the row.

`.cs-card__title` is **24pt, not the artwork's 28pt**. These cards are narrower
than the export's, so at 28pt the title crowded the card and dwarfed the panels
inside it.

**Card spacing is the export's, and its horizontal insets are not uniform.**
`.cs-prob` is a 464pt card with the icon 37pt down, the title block 30pt below
it, the note 6pt under the title, the prose 30pt below that and 34pt clear of
the bottom. The title block runs nearly the full card (3pt inset) while the
prose is inset 24pt — **that asymmetry is what keeps a card title on one
line**, and a uniform padding is what had them wrapping into their own notes.
`.cs-stat` uses the same 74pt icon and a 38pt gap on both sides of the value;
at 14px the value and its label read as one block.

**`.cs-time__label` is left-aligned at every width.** The artwork sets all six
time-study labels flush left on a common line; a right-aligned column reads as
a different layout, and the mobile step used to have to undo it.

---

### 4.10 Guide case studies — `.g`

**One block, two pages.** `Guide1Page.jsx` and `Guide2Page.jsx` are two halves
of one Figma document and one design language, so they share `.g`; `.cs`
([§4.9](#49-case-study--cs)) stays TCTD's alone. Part 2 adds `g--p2` for the
three things it genuinely does differently.

| Token | Value | Role |
| --- | --- | --- |
| `--g-navy` | `#1b235b` | Every heading, and prose set inside a card |
| `--g-slate` | `#364156` | The hero title, and nothing else |
| `--g-coral` | `#cc614d` | Running prose, quotes, the icon line art |
| `--g-plum` | `#260030` | Prose inside the four meta cards |
| `--g-green` | `#2d6a4f` | Every dashed frame, and the connector arrows |
| `--g-band` | `#f5f8ff` | The tint strip behind a row of text |
| `--g-coral` on `.g--p2` | `#b55644` | Part 2's darker prose coral |
| `--g-warm` on `.g--p2` | `#fbf6f5` | Part 2's second tint, behind the Feature Analysis cards |
| `--q-t` / `--q-p` / `--q-c` | `#f7e7e4` / `#e5f4e7` / `#f5f8ff` | Part 2's quote cards: therapist / patient / client |

| Element | Property | Value |
| --- | --- | --- |
| `.g` | max-width | `1180px`, centred |
| | `--g-k` | `0.7877` — **the whole page's type scale** |
| | `--g-bleed` | `calc(26px * var(--g-k))` — how far a band runs past its row |
| | `--g-clip` | the same 26pt as a **literal** (`20.5` / `17` / `16px`), because `overflow-clip-margin` computes a `calc()` to 0 — [§9.15](#915-overflow-clip-margin-computes-to-0-from-a-calc) |
| | `--g-dash` | `2px dashed var(--g-green)` |
| | `--g-radius` | `calc(14px * var(--g-k))` |
| | body | Source Sans `24/1.34` |
| `--g-slab` | | `'Roboto Slab'`, **every** heading on both pages |

**`--g-k` is the one number that resizes the page**, exactly as `--cs-k` does
for TCTD. The Guide frame carries **1498pt of content** against this page's
1180px, which is where `0.7877` comes from; change the max-width and this must
change with it. The responsive steps hold `0.66` and `0.62`.

**The faces are the export's own, identified from the render, not guessed.**
Every heading is **Roboto Slab Bold** — the blunt slab serifs, the spurred `G`
and the flat-terminal `a` are unmistakable at 300dpi — and everything else is
Source Sans, the face `--sans-copy` already loads. Neither page touches
`--serif`, so neither depends on Self Modern.

**The band is behind the frame, not inside it.** This is where `.g` differs
from `.cs`. In the Guide artwork the tint strip is a rectangle *under* the
dashed border, overhanging its card by about 26pt on each side, with the dashes
drawn over it — so `.g-band::before` bleeds by `--g-bleed` and keeps square
corners, and `.g-card` has no `overflow: hidden`. Two consequences are
load-bearing:

- **The four meta cards become one strip.** Their 26pt bleeds meet across a
  39pt gutter and overlap, which is exactly what the artwork draws. The fill
  must therefore stay **opaque** — a translucent one would darken where the
  bleeds overlap.
- **Rows whose bleed would reach the page edge set `overflow: clip`** (never
  `hidden`, which would make them scroll containers) with an
  `overflow-clip-margin` of one bleed — written as `--g-clip`, a literal, for
  the reason [§9.15](#915-overflow-clip-margin-computes-to-0-from-a-calc)
  gives. Keep the two in step at every breakpoint.

Three rows set `--g-bleed: 0` because the artwork gives each of their bands
exactly its own box: the three Key Questions columns, the Sprint Q cards, and a
framed panel's caption bar.

**Gutters are per row, not global**, same as `.cs`: the meta row is 39pt, the
overview pair 32pt, the insight cards 23pt, the panel grid 36pt. Each is
written `calc(<pt> * var(--g-k))`.

**Numbered image panels come in two kinds and they are not interchangeable.**
A *framed* panel (`framed: true` in the data) is a dashed box with its caption
on a short tint bar above it; a plain one is a tint panel with the caption
inside it, over the picture. Both put the coral connector arrow in the white
between one caption and the next, which is why the arrow is a flex sibling with
a negative right margin rather than something inside the bar.

**The 2×2 competitor map is placed off the artwork's own coordinates.** Marks
carry `x`/`y` percentages measured out of the export; the axes are two
`repeating-linear-gradient` rules crossing at 50/50 because that is where the
export puts them, and the four arrowheads are CSS triangles.

**Part 2's project timeline threads one coral rule through the ticks.** The
rule is a flexed `::after` on `.g-tl__tickrow` with a negative right margin, so
it runs on out of one panel and into the next; only the very last tick's rule
is suppressed.

---

### 4.11 NGMA case study — `.n`

`NgmaPage.jsx`. Its own block, not `.cs` or `.g`: those encode the TCTD and
Guide frames' grids and this artwork has neither. A visual-design case study
is a different shape — short commentary alternating with full-bleed mockups —
so the page is one column with the pictures running the full measure.

| Token | Value | Role |
| --- | --- | --- |
| `--n-navy` | `#091133` | Every heading, and the body copy |
| `--n-green` / `--n-blue` | `#43a363` / `#355592` | The gallery's own logo colours |
| `--n-yellow` / `--n-teal` | `#f5bd33` / `#58c3c3` | Mumbai, and the calm of the gallery |
| `--n-orange` / `--n-rose` | `#ff6a35` / `#f45b6a` | The accents |
| `--n-display` | `'Bodoni Moda'` | Standing in for Quiche Display — see [§11d](#11d-the-ngma-case-study) |
| `--n-body` | `'Figtree'` | Standing in for Articulat CF — same section |
| `--n-gap` | `clamp(56px, 8vw, 128px)` | The rhythm between sections |

**There is no `--n-k`.** The other two case studies scale from one number
because their artwork is a fixed-width frame of small components. This one is
mockups at whatever size the viewport allows, so it sizes with `clamp()`
against the viewport instead — which is also why it needed no legibility floor
([§9.17](#917-a-proportional-scale-is-not-a-legibility-floor)): nothing in it
is derived from a shrinking multiplier.

**Mockups take a hairline border.** Several of the frames start on white, and
without `1px solid rgba(9, 17, 51, 0.1)` they dissolve into the page.

---

### 4.12 About — `.about`

`pages/About.jsx`, from the `abt.pdf` export. Four sections, each a column of
prose beside a photo collage, the collage alternating sides — that structure is
the export's and is kept exactly.

**The palette and the faces are the site's, not the export's.** This is the
one page in `src/pages/` built from a Figma export, and it is deliberately
*not* under [§11b](#11b-case-studies)'s fidelity rule: a case study is an
artefact being shown, and this page is the site talking about itself. So the
headings are `--accent` and `--serif`, and the prose is `--ink` in
`--sans-copy`. The export sets its headings in its own crimson (`#ac003f`),
which would have put a second near-magenta in the palette for one page —
[§0.3](#03-rules-that-are-not-negotiable) forbids that without a stated reason,
and "one page's export used it" is not one.

| Element | Property | Value |
| --- | --- | --- |
| `.about` | max-width | `1180px` |
| `.about__title` | | `--serif`, `clamp(34px, 5vw, 60px)` |
| `.about__heading` | | `--serif`, `--accent`, `clamp(24px, 2.6vw, 36px)` |
| `.about__row` | columns | `1fr` / `1.02fr`, gap `clamp(28px, 5vw, 84px)` |
| | stacks at | `820px` |

**The collages are single images.** Each is a loose arrangement of overlapping
photographs, not a grid, so it is rendered whole out of the export by
`render_case_study_regions.py` rather than rebuilt. Each carries descriptive
`alt`.

**The side swap is `order`, not a second grid.** The markup stays in reading
order — heading and prose first, picture second — at every width, and stacked
the picture lands under the words that introduce it.

`Stub` (Photography, Contact) shares this block so the two routes that have no
content yet still land somewhere styled.

---

## 5. Particle system

`src/components/ParticleName.jsx`. The single most intricate part of the site.

### 5.1 What it does

Renders `lines` (currently `['URVI', 'VARMA']`) in **Mukta 800** into an
offscreen canvas, samples the glyph pixels on a grid, and turns each hit into a
particle. Particles spring toward their home pixel, are repelled by the pointer,
and twinkle continuously.

### 5.2 Colour

Lives in **`src/lib/palette.js`** and is shared by every particle surface — the
name and the scroll chevrons — so they read as one material.

| Constant | Value |
| --- | --- |
| `PALETTE` | `#B3197A` `#D6246B` `#E08A00` `#C25E00` `#0E7C6B` `#1E8A4D` `#0F6FA8` `#2A3FA8` `#5B2BA8` `#8A1FA0` |
| `BLUE` | `#001D57` — assigned to **14%** of particles, tying the field to the headline |
| `pickColour()` | the 14/86 draw, used by both surfaces |
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
edge at `0.985` of the hero width. Current: headline **68px at `--copy-scale: 1`** — the one-sentence
sub-headline made the copy column short enough that no shrink is needed at all.
Top +5, bottom −7.

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
| `/` | `Home` — the hero and Work, **and nothing else** |
| `/about` | `About` — see [§4.12](#412-about--about) |
| `/photography` | `Stub`, until there is film work to show |
| `/contact` | `Stub`, until there are contact details |
| `/work/:slug` | `Project` — the case study registered for that slug, else the title alone |
| `*` | `Project`, which renders `Not found` |

**The landing page is the hero and the work.** About, Photography and Contact
used to be placeholder *sections* in the home scroll, so scrolling past the
work ran into three empty headings. They are their own routes now, which is
why only one nav item is still a hash link: Work is a section of the landing
page and the other three are not.

`ScrollManager` in `App.jsx` scrolls to `hash` if present, else to top.
Nav and CTA hrefs are **absolute** (`/#work`, `/about`), so they work from a
detail page.

### 7.2 The base path contract

Served from the **custom domain root**, so there is no path prefix.
**Four places must agree** — change them together or the site breaks:

| Where | Value |
| --- | --- |
| `vite.config.js` | `base: '/'` |
| `src/main.jsx` | router `basename`, derived from `import.meta.env.BASE_URL` |
| `public/404.html` | `pathSegmentsToKeep = 0` |
| `src/fonts.js` | font URL built from `BASE_URL` |

Live at **https://www.urvivarma.com**

`public/CNAME` holds the domain and is what tells Pages to serve it. It is
copied verbatim into `dist/` by the build. **Deleting it un-sets the custom
domain in the repo's Pages settings on the next deploy**, which is the usual
way a working custom domain silently reverts.

This was `/designportfolio/` while the site lived on the project repo's Pages
URL. To go back, reverse the four rows above and remove `public/CNAME`.

### 7.3 The SPA shim

Pages has no server-side rewrite, so `/work/elderease` would 404. `public/404.html` encodes the path into a query string and redirects;
`index.html` decodes it before React mounts.

**Known and accepted:** deep links return an **HTTP 404 status** even though
they render correctly, because the redirect is client-side. Users never notice;
crawlers may. Fixing it would require pre-rendering.

### 7.4 The custom domain

`www.urvivarma.com` is the primary domain; the apex redirects to it. DNS is at
GoDaddy (`ns13`/`ns14.domaincontrol.com`).

| Type | Name | Value |
| --- | --- | --- |
| `CNAME` | `www` | `urvivarma5-source.github.io.` |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

The four apex `A` records are what let `urvivarma.com` redirect to the `www`
host; GitHub issues that redirect itself once both resolve. GoDaddy's parked
`A @` record must be **replaced**, and the stock `CNAME www → urvivarma.com`
**repointed** — left as it was, `www` resolves back to the parked page and the
site never appears.

Leave the `NS`, `SOA`, `_domainconnect` and `_dmarc` records alone; none of
them affect where the site is served from.

Then, in the repo: **Settings → Pages → Custom domain →** `www.urvivarma.com`,
wait for the DNS check to pass, then tick **Enforce HTTPS**. The certificate is
issued by Let's Encrypt and can take up to an hour after the check passes.

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
| `sub` | `string[]` | The sub-headline. One sentence; wraps within the copy column |
| `phNote` | `string \| null` | Placeholder marker. Currently `null` — real copy is in |
| `credentials` | `string[]` | Rendered as dashed pills **inside the copy column**. There is no bottom strip |

Hero copy is now real, not placeholder. `phNote` is `null`.

### 8.2 `src/projects.js`

Exports `categories` (the grouped, rendered structure), `projects` (a flat list
with `category` attached), and `getProject(slug)`. ElderEase is back in
UX Research — it appears in the supplied reference artwork.


Each project is `{ slug, title, note?, desc? }` — `desc` is the one-line
summary shown on the card, `note` a small accent label above the title (e.g.
"Part 1"). Titles and descriptions come from the supplied case-study artwork. Detail pages are still blank by
design. Slugs match the original Adobe Portfolio URLs where they existed; three
projects are new and have no page content: `smarter-project`,
`branding-for-sugar-rush`, `employee-tool-use-at-intuit`.

When adding metadata (year, role), add the fields here, extend `WorkGrid`, and
**document the new card tokens in [§4.5](#45-work-grid--work-grid--work-card)**.
Thumbnails are the exception — they are components in `CardThumb.jsx`, not a
field here. See [§4.5](#45-work-grid--work-grid--work-card).

### 8.3 `src/caseStudies/`

One folder, the same kinds of file per case study, and the same
copy-out-of-components rule as `content.js`:

| File | Holds |
| --- | --- |
| `index.js` | `caseStudies`, a slug → component map, and `getCaseStudy(slug)`. A slug absent from it renders the stub in [§4.6](#46-project-detail--project) |
| `tctd.js`, `guide1.js`, `guide2.js`, `ngma.js` | **Every word** of a case study, as structured data |
| `TctdPage.jsx`, `Guide1Page.jsx`, `Guide2Page.jsx`, `NgmaPage.jsx` | Layout only — each reads its data file and holds no copy |
| `icons.js`, `guide1Art.js`, `guide2Art.js`, `ngmaArt.js` | Import a page's artwork from `src/assets/<study>/` and re-export it as maps |
| `rich.jsx` | Turns the Guide files' `{ em }` runs into markup — the one place that happens |

**Emphasis lives in the data, not the layout.** In the Guide files a paragraph
is a string, or an array whose members are strings and `{ em }` objects; `em`
is the artwork's bold-italic run in running prose and its bold run inside a
card. One level only, because the artwork only ever has one. A `\n` inside a
string is a line break the artwork actually has, and `rich.jsx` renders it as
one — do not collapse them.

To add a case study: add `<slug>.js` (copy), `<Name>Page.jsx` (layout), its
assets, and one line in `index.js`. **Give the component file a name that does
not collide case-insensitively with the data file** — see
[§9.13](#913-tctdjsx-and-tctdjs-are-the-same-file-on-macos).

Artwork is imported, never referenced by path, so Vite hashes it and applies the
base path. An absolute `/assets/...` URL breaks the moment the base path is
not `/` — it has been, and could be again;
the JSX twin of [§9.4](#94-vite-does-not-rewrite-absolute-public-asset-urls-in-css).

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

### 9.10 Pill geometry feeds the hero layout

The credential pills sit inside `.copy`, so **their padding and font size feed
`nameLeftBound()` and the copy column's height** — which is what the particle
name is sized and positioned against. Changing pill padding by 1–2px silently
moves URVI/VARMA.

This bit once: restyling the pills to use the card's `DashFrame` changed their
padding from `6px 10px` to `7px 12px` and shifted the name. If you touch the
pills, re-measure the hero afterwards ([§10.2](#102-checklist-for-a-hero-change)).

### 9.11 `note` is UI copy, not a comment

`note` in `projects.js` renders as the accent label above a card title. A note
reading "Placeholder name, rename freely" shipped to the page as a visible
label. Annotations for a human reader belong in a `//` comment; `note` is only
for real labels like "Part 1".

### 9.12 The nav's inset was the hero's padding

`.nav` carried no padding of its own. On the landing page it did not need any:
it is the first child of `.hero`, and `.hero`'s `22px clamp(20px, 3.4vw, 46px)`
positioned it. On a detail page the same component rendered as a bare child of
`<main>` and landed flush in the top-left corner — a different-looking nav on
every page that is not the hero, with a large empty gap under it because
`.project` was compensating with `clamp(96px, 18vh, 190px)` of top padding.

The fix is `<Nav inset />` and `.nav--inset`, which restates the hero's padding.
**The two must be changed together.** If you retune `.hero`'s padding and not
`.nav--inset`, the wordmark shifts when you navigate to a detail page — which is
exactly the symptom that is easy to see and hard to attribute.

Check both, don't assume: `document.querySelector('.mark').getBoundingClientRect()`
must give the same `top` and `left` on `/` and on `/work/<slug>`.

### 9.13 `Tctd.jsx` and `tctd.js` are the same file on macOS

The case study's layout and its copy were first called `Tctd.jsx` and `tctd.js`.
The default macOS filesystem is case-insensitive, so `import Tctd from './Tctd'`
resolved to the **data** module and the app died with

> The requested module '/src/caseStudies/tctd.js' does not provide an export
> named 'default'

which reads like a broken export, not a name collision. Worse, it would have
worked on the case-sensitive filesystem a CI runner uses. Hence `TctdPage.jsx`.
Never let two files in one folder differ only by case.

### 9.14 Raster strategy: WebP, one format, no `<picture>`

The Guide case studies are the first pages with photographs and screenshots on
them, and they settle the open question §12 used to carry. The rules:

- **One format: WebP**, quality 82, no JPEG fallback and no `<picture>`. Every
  browser that can run this site can decode it, and a fallback would double the
  asset count for nothing.
- **Capped at 2200px wide**, rendered at 2× the artwork's points and clamped.
  That is retina at the widest step and still a few dozen KB per panel.
- **`loading="lazy"` on every one of them**, because both pages are long and
  the visitor sees perhaps a fifth of the images.
- **Imported, never referenced by path** — the JSX twin of
  [§9.4](#94-vite-does-not-rewrite-absolute-public-asset-urls-in-css).

The extraction and the trade-off between the two ways of getting a raster out
of a Figma export are in [§11c](#11c-the-guide-case-studies).

### 9.15 `overflow-clip-margin` computes to 0 from a `calc()`

`overflow-clip-margin: var(--cs-gap)` works. `overflow-clip-margin: calc(2 *
var(--cs-gap))` computes to **`0px`** in Chrome — no warning, no invalid-value
message in devtools. The row then clips the tint band flush at its own edge
and takes the cards' shadows with it, which looks like the band rule broke
rather than like a unit problem. Write the value as a literal.

### 9.16 An extracted SVG has no intrinsic size

`extract_case_study_art.py` writes `<svg viewBox="0 0 W H">` with **no `width`
or `height`**. An `<img>` of one therefore has no intrinsic size, and any CSS
that leans on that — `width: auto`, `max-width: 100%` with nothing to be 100%
*of* — collapses it to zero. The card renders as an empty grey block, which
looks like a missing file rather than a sizing bug.

The TCTD thumbnail never hit this because every piece of it is given an
explicit `width` as a share of the media block. `.card-art--single` has to do
the same thing: a definite box (`width`/`height` at 100% of a padded, absolutely
positioned parent) plus `object-fit: contain` to letterbox inside it.

Screenshots of the work grid are also not evidence here, for the reason
[§10](#10-verification-protocol) gives about the hero: the home page's hero is
`100vh`, so a tall headless capture inflates it and pushes the grid out of the
frame, and pane captures of this page come back blank. Measure instead — an
`<img>`'s `getBoundingClientRect()` and `naturalWidth` together say whether it
both laid out and loaded — or render the thumbnails on their own in a harness
page at the real card size.

### 9.17 A proportional scale is not a legibility floor

`--cs-k` and `--g-k` scale a whole case study from one number, which is what
keeps it in proportion to its Figma frame. They are the right tool for the
layout and the wrong one for the fine print: at the phone step `.cs`'s
`calc(10px * 0.656)` is **6.6px**, and the Guide pages' smallest labels land at
8.7px. Both pass every overflow check and neither can be read.

So each block sets a floor at its phone breakpoint — `font-size: max(12px,
calc(<pt> * var(--k)))` on every size that would otherwise fall under 12px.
Two things about it:

- **It is scoped to that breakpoint.** Applied at full size it would raise
  sizes the artwork deliberately sets small, which is the fidelity rule's
  whole point.
- **It has to come after the declaration it floors.** Three `.g--p2` sizes are
  declared *below* the shared block's media query, so a floor written there
  lost the cascade and silently did nothing. They are floored in the Part 2
  breakpoint instead.

`.work-card__note` is the same problem outside a case study: a 9px tracked
eyebrow, fine on a desktop card, floored to 11px under 700px.

### 9.18 A headless screenshot at a phone width is a lie

`--window-size=390,5200` does **not** give you a 390px layout. Chrome will not
lay out below its minimum window width; it lays the page out wide and hands
back a 390px-wide *crop*. The result looks exactly like a page that overflows
horribly on mobile — clipped mid-word, columns running off the edge — and it is
an artefact every time.

This cost a real detour: a capture of the TCTD page at 390 showed catastrophic
clipping while a DOM measurement of the same page at the same width showed
`.cs` at 350px wide inside a 390px viewport with nothing out of bounds. The
measurement was right.

Check a narrow viewport by putting the page in a **same-origin iframe** of that
width — media queries respond to the iframe's viewport, and the document inside
is fully measurable. `tools/audit/` holds both harnesses; its README says how
to run them.

### 9.19 A render region that overlaps live text prints it twice

`render_case_study_regions.py` rasterises a rectangle, and a rectangle drawn
around some artwork will happily include any *text* that shares those
coordinates. If that text is also rendered as live copy — which it is, because
the copy file has it — the page shows it twice: once baked into the picture,
once underneath in the real font.

It happened on NGMA's "Drawing from Architectural Elements": the motif row's
region reached left and down far enough to catch the aside paragraph beside it,
so the paragraph appeared inside the image *and* as live text below it. It is
easy to miss, because the image looks like a legitimate composition.

Two defences:

- **Check the text blocks before cutting a region.** `dump_pdf_boxes.py` gives
  every fill's bbox; Type3 glyph runs show up among them, so a region with no
  text in it has no fills where the copy is.
- **Prefer the vector extractor when the artwork is vector.** Both the motif
  row and the chevron are flat shapes: `extract_case_study_art.py` matches by
  *containment*, so it cannot drag in a neighbouring paragraph the way a
  rectangle crop can — and the result is sharp at any size and a tenth of the
  bytes.

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

### 10.2b Checking a case study end to end

A case-study page is 14–22k pixels tall, so scrolling and screenshotting it in
a preview pane is slow and — when the pane is hidden — returns stale frames
that look like missing content. Render the whole page in one shot instead:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=12000 --window-size=1400,22000 \
  --screenshot=out.png "http://localhost:<port>/work/<slug>"
```

Then slice `out.png` into readable strips and compare them against the same
strips cut out of the source PDF with `pdftoppm -r 72 -x/-y/-W/-H`, which puts
the two side by side at the artwork's own scale.

For overflow, measure rather than look:

```js
const w = document.documentElement.clientWidth
;[...document.querySelectorAll('.g *')].filter(e => e.getBoundingClientRect().right > w + 2)
```

Both Guide pages return zero at 430, 820 and 1120px. Run it after any change to
a bleed, a gutter, or a grid — the tint band's overhang is the thing that
escapes.

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
| _pending_ | NGMA: the aside paragraph was printing twice — a raster region had swallowed it (§9.19) — the mockups were soft at 1.44x and now render at a true 2x, and both stand-in faces are re-picked against the export (Bodoni Moda, Figtree) |
| _pending_ | About is a real page built from its own export (§4.12), and the landing page is the hero and the work alone — About, Photography and Contact are routes now, not empty sections in the home scroll (§7.1) |
| _pending_ | NGMA matches the published case study: the title's green fan and yellow asterisk and the pink band under every page heading were missing, and both CTAs — "Full Website Here" and "Full Prototype Here", which is what the export's orphan "Prototype" heading belongs to — were not there at all |
| _pending_ | Responsive pass over the whole site: `.cs` stacked at 760 so 768 still ran multi-column and *clipped* the overflow (§9.15's `overflow: clip`), and every block's fine print fell under 12px on a phone — both fixed, and §9.18 records why the screenshots that seemed to show mobile carnage were lying |
| _pending_ | Fourth case study: the NGMA website redesign — a visual-design piece, so its five page mockups are rendered images and the commentary is live text (§4.11, §11d); Prata stands in for Quiche Display |
| _pending_ | The Guide pages' `overflow-clip-margin` was a `calc()` and so computing to 0 — the tint band was being clipped flush at each row instead of overhanging it (§9.15) |
| _pending_ | Work cards for both Guide parts: Part 1 takes its hero drawing, Part 2 the ship from its pivot section; `.card-art--single` gives an extracted SVG the definite box it needs (§9.15) |
| _pending_ | Both Guide case studies built from their Figma exports: shared `.g` block (§4.10), `dump_pdf_boxes.py` for the layout and `render_case_study_regions.py` for the annotated compositions, WebP raster strategy (§9.14), and §11c for the whole pipeline |
| _pending_ | Site moves to the custom domain `www.urvivarma.com`: base path is now `/`, the 404 shim keeps no repo segment, and `public/CNAME` carries the domain (§7.2, §7.4) |
| _pending_ | Case-study cards: the numbered badge moves into the title row (smaller, centred on the title, equal side insets), card titles drop to 24pt, the tint band no longer reaches over the coral note, and its bleed doubles without scrolling the page |
| _pending_ | Case-study spacing and weight: card shadows lightened to match the export's `drop-shadow`, the hero band overhangs its frame as the artwork has it, and the stat and problem cards take the export's own gaps and insets |
| _pending_ | Case-study type comes from the Figma CSS export: the serif is Roboto Serif (its real face, not `--serif`), body is 24/30 at 0.05em, and the body and pull measures are the artwork's points instead of `ch` |
| _pending_ | Case study copy: three typos the Figma ships are corrected, and §08's reminders card gets labels that match its own artwork instead of the records card's |
| _pending_ | Work cards can carry artwork: `CardThumb.jsx` maps slug → art, and "Filling Cabinets to Fingertips" shows its own hero line art |
| _pending_ | Case study polish against the export: pull quotes take the artwork's measure so the §01 constraint quote is one line again, time-study labels are flush left at every width, and a time value no longer breaks after its range on mobile |
| _pending_ | Case study: dashed frames take the supplied SVG's radius/stroke/shadow, the tint band is one continuous strip again, `.cs-num` is Roboto Slab, per-row gutters and `--cs-k` now derive from the artwork's 1500pt frame, and em dashes are out of the copy |
| _pending_ | First real case study: "Filling Cabinets to Fingertips" built from the Figma PDF, artwork extracted to SVG; `.cs` block and §4.9 added; `Nav inset` fixes the detail-page nav |
| _pending_ | Sub-headline replaced with one sentence; copy column is now short enough that the headline needs no shrink (68px, scale 1.0) |
| _pending_ | Dash frame uses our accent, not the reference's rose; all cards forced to one size with reserved line-space; removed a placeholder note that was rendering as visible card copy |
| _pending_ | Reverted pills to their own 1px dashed accent border — the card `DashFrame` is for cards only; this also restores the particle name's position |
| `28fd08b` | Dashed edges unified into `DashFrame.jsx`, matching the supplied SVG exactly (2px, 10/10, rx 9, `#D6576B`); replaces both the CSS border and the gradient approach |
| `afe616c` | Section titles accent + heading rule; category labels blue at 14px; card is one dashed frame (gradient dashes, wider spacing) containing media and text; scroll cue replaced with sparkle chevrons; palette extracted to lib |
| `0eb3d8c` | Copy pulled back inside the 45% line; San Francisco pill dropped; scroll cue added; section rules removed; card titles/descriptions taken from the reference artwork; ElderEase restored; Guide App split into Part 1 and Part 2 |
| `b6d6bb6` | Copy column widened to 880 so the sub is one line per sentence; eyebrow separators became rules; pills 11px with hover shadow; em dashes removed from copy; work grid to three columns; `nameLeftBound()` unified so align and fit agree |
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

## 11b. Case studies

Source PDFs are Figma exports. They are **gitignored** — 18MB each, and nothing
at build time reads them.

`tools/extract_case_study.py` pulls the text out:

```bash
python3 tools/extract_case_study.py "TCTD CASE STUDY.pdf" out/
```

Figma exports text as **`/Type3` fonts** — glyph-drawing procedures with no
`/BaseFont` — so every ordinary check reports "this PDF has no text". It does;
it is recoverable through the `/ToUnicode` CMaps. Two traps, both documented in
the script: strings are literal with **octal escapes** inside `TJ` arrays, and
Figma **switches font subsets mid-block**, so the current font must be tracked
sequentially or later runs decode into convincing-looking garbage.

### The artwork

`tools/extract_case_study_art.py` pulls the line art out as **vector** SVGs,
against a region list in PDF page coordinates:

```bash
python3 tools/extract_case_study_art.py "TCTD CASE STUDY.pdf" \
    src/assets/tctd/ tools/tctd-art-regions.json
```

All 23 of this case study's icons came out that way — nothing was redrawn and
nothing is a screenshot. Three things about the format cost real time and are
worth knowing before touching the script:

1. **Resource scope is per form, not per page.** The icons are not one XObject
   each. `/X7 Do` on the page reaches a form whose own `/Resources` define
   another `/X1`. Resolve names against the page's map and every icon comes out
   as the same filing cabinet — which looks like a plausible result, so it is
   easy to miss.
2. **Nothing is stroked.** Figma outlines its strokes, so the page contains not
   a single `S`; it is 160k curve ops of `f` fills. Do not go looking for
   stroke ops to tell art from text.
3. **Type3 text is in the same soup.** Skipping everything between `BT`/`ET`
   is what keeps captions out of an icon that a region box overlaps.

Regions are matched by **containment**, so a box may overlap its neighbours
without pulling their art in; each SVG is then trimmed to its own art's real
bounding box. To re-cut one, edit `tools/tctd-art-regions.json` and rerun.

The fills are baked in, so the icons are drawn as `<img>` and cannot be
recoloured from CSS. That is the point — see the fidelity rule below.

### Fidelity rule

**Keep the Figma's own colours and its own faces.** The artwork's palette lives
in `.cs` as block-scoped tokens ([§4.9](#49-case-study--cs)) and is the one
documented exception to the palette rule in
[§0.3](#03-rules-that-are-not-negotiable).

The serif was originally swapped for the site's `--serif`, on the assumption
that the export's face was unavailable. It is not: a later CSS export from the
same Figma file names it as **Roboto Serif**, which is on Google Fonts, so the
case study now sets the real thing. That export also supplied the metrics in
[§4.9](#49-case-study--cs) — 24/30 Source Sans at `0.05em`, 28/25 Roboto Serif
at 600 — which are transcribed rather than guessed. **Nothing in the case study
depends on Self Modern any more.**

When a new case study arrives, ask for its CSS export before matching type by
eye. Figma's "Copy as CSS" gives family, weight, size, line-height, tracking
and colour per layer, and reading it took an afternoon of eyeballing off this
page.

One deliberate departure from the export, a substitution rather than a
redesign:

- **Dashed frames are CSS `border-style: dashed`**, not the site's `DashFrame`
  and not the export's exact dash geometry. `DashFrame` paints the site accent
  (`--rule-dash`), which is the wrong colour here.

**Copy departures.** The fidelity rule covers design, not defects. Four
corrections are made against the export, each marked `// FIXED` at its line in
`tctd.js` with what the export said:

| Where | Export | Page |
| --- | --- | --- |
| §01 body | "interdependant" | "interdependent" |
| Journey step 1 | "arrive at 08:3," | "arrive at 08:30," |
| Journey step 5 | "appointment dates. ." | "appointment dates." |
| §08 card 4 labels | the Patient Records card's labels, copy-pasted | "No reminder system / Nothing sent between visits" → "Automated reminders / Confirm or reschedule by reply" |

Em dashes are also out of the copy throughout, which is a house choice rather
than a correction. **Nothing else may be silently "corrected"** while editing
something near it — add a row here if it is.

§08 card 3 (Patient Records) still carries "Unified status system /
Auto-updated, shared legend" as its *after* label, which reads like the same
copy-paste. It is left as the export has it, pending a decision.

## 11c. The Guide case studies

Two pages from one Figma document: `Guide Pt 1.pdf` (a 1805×21344pt frame) and
`guide part 2.pdf` (1805×30981pt). Both are gitignored, like TCTD's.

Their **content column is 1498pt** — the frame is 1805pt wide with 154pt
margins — which is where `.g`'s `--g-k` of `0.7877` comes from
([§4.10](#410-guide-case-studies--g)).

### Getting the layout out, not just the copy

`tools/extract_case_study.py` recovers the copy, exactly as it does for TCTD
([§11b](#11b-case-studies)); it now also records each block's **x**, which is
what makes it possible to tell a left column from a right one.

The new piece is `tools/dump_pdf_boxes.py`, which answers "where is
everything?" — the question you have to answer to rebuild a frame at full
fidelity instead of eyeballing it:

```bash
python3 tools/dump_pdf_boxes.py "Guide Pt 1.pdf" out/boxes.json
```

It emits every filled path as `{colour, bbox}` and every image placement, all
in PDF page coordinates. Two things it gets right that cost time to learn:

1. **A dashed frame is one path, not many.** Figma outlines its strokes, so a
   dashed border arrives as a single filled path with dozens of subpaths and
   *one* `f`. Its bbox is the frame. That is why the whole page's geometry —
   every card, band, gutter and column — falls out of one pass.
2. **Figma masks with `W n`, and it masks constantly.** Half of Part 1's image
   placements are clipped. The dumper therefore reports two rects per image:
   `f`, the `cm` box the bitmap is laid into, and `b`, that box intersected
   with the clipping path in force. Use `b` to decide where something *is*;
   use `f` to place the bitmap and then crop to `b`. Ignore the clip and a
   screenshot comes out with its neighbour's content baked into it — which
   looks plausible, so it is easy to ship.

Colours read straight off the render with `pdftoppm`, not out of the content
stream: Figma writes fills through an ICC colourspace, and a naïve "last three
numbers before `scn`" read reports pure blue for the tint band.

### Getting the pictures out — two tools, and when each is right

| Tool | Use for | Why |
| --- | --- | --- |
| `tools/extract_case_study_images.py` | a panel that really is one picture | Resamples the **original bitmap**, so it is sharper and much smaller |
| `tools/render_case_study_regions.py` | a *composition* — screenshots with vector arrows and annotation boxes drawn over them | Pulling the bitmaps out would drop everything that explains them |

```bash
python3 tools/extract_case_study_images.py "Guide Pt 1.pdf" \
    out/boxes.json src/assets/guide1/ tools/guide1-image-regions.json
python3 tools/render_case_study_regions.py "guide part 2.pdf" \
    src/assets/guide2/ tools/guide2-render-regions.json
```

Both take a `{name: [x0, y0, x1, y1]}` region file in PDF page coordinates, the
same convention as the vector extractor's. Three things about the bitmap one:

- Regions are matched by an image's **centre**, then clipped — not by
  containment (which drops masked screenshots) and not by intersection (which
  drags in the neighbours).
- **Every image carries an `/SMask`**, a separate Flate `DeviceGray` alpha
  plane. It is composited onto white, because the page's ground is white.
- **A panel is often several placements** — a Miro board with photographs and
  video-call thumbnails over it. Compositing them at extraction time is what
  keeps the markup one `<img>` per panel.

`render_case_study_regions.py` needs poppler's `pdftoppm` on PATH
(`brew install poppler`). It renders at 150dpi and clamps to 2200px
([§9.14](#914-raster-strategy-webp-one-format-no-picture)).

The vector extractor is unchanged and did the rest: 24 SVGs for Part 1 and 13
for Part 2, plus five drawings and seven icons Part 2 **shares with Part 1** and
imports from `src/assets/guide1/` rather than duplicating.

### Fidelity rule, and where it was bent

Same rule as TCTD: **keep the Figma colours**, and here the Figma faces too —
both are on Google Fonts, so nothing is standing in.

Two deliberate departures, both documented rather than silent:

- **Dashed frames are CSS `border-style: dashed`.** The browser picks the dash
  length; the export's exact 10/10 geometry has no CSS equivalent. Same call as
  [§11b](#11b-case-studies).
- **Part 2's screen walkthroughs keep their explanatory text inside the
  image.** Those blocks are compositions, and a few of the export's own
  sentences sit *between* the screenshots being explained. Rather than crop
  them out and re-set them — which would have meant guessing at reading order —
  the composition is rendered whole and the sentence rides along inside it.
  Every such figure carries descriptive `alt`. Headings, descriptions, quotes
  and numbered captions are all live text. One quote — "No engagement analytics
  right now" [C1 - 13] — sits *over* the screenshots it belongs to in §1.4's
  fourth item, so it is inside that composition and deliberately not repeated
  as a live card underneath.

### Copy departures

The fidelity rule covers design, not defects. Each correction is marked
`// FIXED` at its line, with what the export said, and the file headers list
them. **Nothing else may be silently "corrected"** — add a row here if it is.

| Where | Export | Page |
| --- | --- | --- |
| Pt 1 competitor header | "LinkedIn Leaning" | "LinkedIn Learning" |
| Pt 1 §2, Pt 2 process | "Lightening Demos" | "Lightning Demos" |
| Pt 2 §1.1 description | "keyworsd" | "keywords" |
| Pt 2 Key Questions | "Fo which content to share" | "For which content to share" |
| Pt 2 §1.4 change 1 | "won't feel feel pressured" | "won't feel pressured" |
| Pt 2 My Role | "Testing Facillitator" | "Testing Facilitator" |
| Pt 2 patient §1.1 legend | "= Patient Quote (C)" | "= Patient Quote (P)" |

Kept as the export has them, because they are voice rather than slips: **"The
Overcome"** as the counterpart to "The Challenge", and **"Sprint Q 1"** spaced
as three words.

Two gaps in the source are surfaced on the page rather than filled in:

- **Both prototype CTAs have no URL.** The export draws "Link to Therapist
  Prototype" and "Link to Patient Prototype" as flat artwork, so the Figma
  prototype links are simply not in the file. They render with the artwork's
  styling and a marked "Link to come" placeholder, and are deliberately not
  `<a>` elements.
- **Two of the three Future Implementation cards have no copy.** All three ship
  the *same* Calendar Integration paragraph, which is a copy-paste in the
  source. The headings are real; the copy is not written yet, and the cards say
  so rather than repeating the paragraph or inventing two more.

## 11d. The NGMA case study

`VD Case Study.pdf` — a 1512 x 26847pt frame, gitignored like the others.

It is a **visual-design** case study and that changes what the page is. The
other three are process write-ups with small components; this one is five
full-page mockups of a redesigned website, with short commentary between them.
So the mockups are **rendered images**, through
`tools/render_case_study_regions.py`:

```bash
MAXW=1700 QUALITY=80 python3 tools/render_case_study_regions.py \
    "VD Case Study.pdf" src/assets/ngma/ tools/ngma-render-regions.json
```

Two reasons they are images rather than markup. They are photographs under
vector type, motifs and pattern bands — the bitmap extractor would pull out the
photographs and drop everything drawn over them. And they are frames of *a
different website*: rebuilding them as live markup would be reproducing the
artefact instead of showing it. Every one carries descriptive `alt`.

`MAXW` and `QUALITY` are overridable per run for exactly this page. The five
mockups render at **2360px** — the page's container is 1180px, so that is a
true 2x and nothing else will do: an earlier pass capped them at 1700 to save
bytes and every mockup was visibly soft on a retina screen at 1.44x. Check the
ratio by measuring, not by looking:

```js
[...document.images].map(i => i.naturalWidth / i.getBoundingClientRect().width)
```

…and measure at the real container width, not in a narrow preview pane, or the
ratio flatters itself. `QUALITY=76` keeps the tallest (7913px) under 1.5MB.

**The motif row and the green chevron are vector, not a crop** — see
[§9.19](#919-a-render-region-that-overlaps-live-text-prints-it-twice).

**The greeked copy stays inside the images.** The mockups' body text is
"Carrot cake jelly beans…" in the artwork — the author's own placeholder. None
of it is repeated as live text.

### Fidelity rule

Same as the others: the artwork's palette is kept, and its colours are also its
content — the Colour Scheme section's seven swatches are live, and each hex is
both the swatch and its caption.

One substitution, and it is the only one:

**Both faces are stand-ins, and both were picked by rendering the export beside
the candidates rather than by name.** The artwork's own type page names Quiche
Display and Articulat CF; both are commercial and neither is installed.

| Artwork | Ours | Why |
| --- | --- | --- |
| Quiche Display | **Bodoni Moda** | The export's hairlines are very thin and its bowls perfectly circular. Prata was the first pick and is visibly heavier with bracketed serifs; Playfair is closer but still more traditional. Bodoni Moda matches the contrast and the circular `o`/`d`/`b`. |
| Articulat CF | **Figtree** | A wide geometric grotesque. Inter was the first pick and is narrower and more neutral. |

The type page *also* names Inter, but that is the face used **inside the
mockups**, not for the case study's commentary — a distinction worth keeping if
these are ever revisited.

**If the real fonts are available, self-host them and delete both stand-ins.**
They are licensed faces the author designed with, so the files may well exist;
`--n-display` and `--n-body` are the only two places to change.

### One thing the export would not give up

The text stream contains a 64pt heading, **"Prototype"**, positioned through a
nested form; the coordinates put it between the Events mockup and the Permanent
Collection one, and a render of that region shows no such heading anywhere.
Rather than place it by guess it is left out, and noted in `ngma.js` and in
[§12](#12-open-threads).

## 12. Open threads

- **Six of ten project pages are still stubs.** "Filling Cabinets to
  Fingertips", the two Guide parts and the NGMA redesign are the case studies;
  the rest render a title until their content exists. See
  [§8.3](#83-srccasestudies) for how to add one.
- **The NGMA export's "Prototype" heading has no findable position** — see
  [§11d](#11d-the-ngma-case-study). If it belongs somewhere, put it back.
- **The two Guide prototype links are missing.** Both CTAs render as marked
  placeholders because the export carries no URL — see
  [§11c](#11c-the-guide-case-studies). Drop the two Figma prototype URLs into
  `guide2.js` `views[].prototype` and make them `<a>`s.
- **Two Future Implementation cards have no copy** — the export repeats the
  Calendar Integration paragraph under all three headings. See
  [§11c](#11c-the-guide-case-studies).
- **Part 1's Business Model Canvas image still reads "Waiting on client to send
  info"** in its Channels cell. It is in the artwork, so it is on the page;
  worth a look before this is shown to anyone.
- **The work card still carries no metadata** (year, role). Nothing needs it
  yet, but the decision is still open — see [§8.2](#82-srcprojectsjs).
- **Seven of eleven cards have no artwork.** The four case studies have
  thumbnails; the other seven show the plain ground and will keep doing so
  until there is source artwork for them — there is none in the repo. Add each as a
  component in `CardThumb.jsx` — see [§4.5](#45-work-grid--work-grid--work-card).
- **Self Modern is not installed.** Newsreader is standing in, for the site
  only — the case study sets its own serif and is unaffected.
- **No `photography` or `contact` content.** Both are their own routes now and
  render `Stub`. About is built — [§4.12](#412-about--about).
- ~~No photographic images anywhere yet.~~ Settled by the Guide case studies:
  WebP, capped at 2200px, lazy, imported not referenced — see
  [§9.14](#914-raster-strategy-webp-one-format-no-picture).
