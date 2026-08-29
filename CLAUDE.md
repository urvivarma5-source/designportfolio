# Instructions for agents working in this repo

## Read DESIGN.md first

**[DESIGN.md](DESIGN.md) is the system of record for this project.** Read it
before writing any code. It carries the full design system, every component's
tokens, the runtime measurement contracts in the hero, and a list of bugs that
have already cost real debugging time.

Do not infer the design from the code. The code is the implementation;
`DESIGN.md` is the intent, and it explains *why* values that look arbitrary are
not.

## Update DESIGN.md in the same commit

Any change that alters what `DESIGN.md` describes must update it **in the same
commit as the code**. A PR that changes a token, a component's look, particle
behaviour, routing, or the content model, and does not touch `DESIGN.md`, is
incomplete.

`DESIGN.md` §0.2 has the mapping from "what you changed" to "what to update".
At minimum, add a line to the changelog in §11.

## Project shape

React 18 · Vite 6 · GSAP 3 · react-router 7. No CSS framework, no component
library, no state manager.

- **All styles are in `src/styles/global.css`.** One file, sectioned by comment
  banners. Do not add CSS modules, styled-components, Tailwind, or `<style>`
  blocks.
- **All hero copy is in `src/content.js`.** Never hardcode copy in a component.
- **Projects are in `src/projects.js`.**

## Hard rules

1. **Never hardcode the base path.** This deploys to a GitHub Pages *project*
   repo at `/designportfolio/`. Derive paths from `import.meta.env.BASE_URL`.
   Four files must agree — see `DESIGN.md` §7.2.
2. **Never reference a public asset by absolute path in CSS.** Vite does not
   rewrite `url(/fonts/x.woff2)`, so it 404s under the base path. See §9.4.
3. **Never measure with `getBoundingClientRect()` anything the particle field
   aligns to vertically.** `.copy` carries a scroll transform. Use the
   `offsetTop` chain. See §9.3.
4. **Never put the entrance animation back into JS.** It is CSS keyframes so a
   stalled ticker cannot leave the page blank. See §9.1.
5. **Never add a colour outside the palette** in §2.1 without adding it as a
   token there first, with a stated role.
6. **No dark mode.** The sparkle palette is tuned for a white ground. This is a
   deliberate single-look design.
7. **When adding a key to `content.js`, save that file before the component that
   reads it.** The reverse order crashes the app through HMR. See §9.2.

## Verifying your work

**Screenshots of the particle field are not evidence.** The preview pane
throttles `requestAnimationFrame`, so a capture routinely shows a half-settled
field that looks broken but is not. Measure the DOM and the canvas instead —
`DESIGN.md` §10 has the trimmed-percentile technique and the checklists.

For routing or deploy changes, `npm run preview` and load the **base path**, not
`/`. The dev server is more forgiving than Pages.

## Verify before you report

State what you actually checked. If something is untested, say so. If a build or
a check fails, report it with the output rather than describing the change as
done.
