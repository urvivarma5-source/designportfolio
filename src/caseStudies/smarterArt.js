// Artwork shared by all three SMARTER case studies: the icon set and the three
// hero drawings. Imported, never referenced by path, so Vite hashes it and
// applies the base path. See DESIGN.md §8.3 and §9.4.
//
// These are drawn for this project rather than exported from anywhere. The
// Guide case studies set the idiom and these follow it: single-weight line
// art, round caps and joins, an organic dashed outline round each hero drawing
// with a flat tint inside it.
//
// The colour is baked into each file rather than inherited, because `.sm-icon`
// renders them through an `<img>` and an `<img>` cannot reach `currentColor`.
// That is the same arrangement the Guide's icons use. The two values are the
// palette's own: the line art is Orange #DC6B01, and the hero drawings'
// structure is 90% Black #414042 with the dashed outline in the same, so a
// drawing reads as one of the page's own dashed frames.
//
// If the palette changes, these files change with it. There is no token here
// to update.

import iconRole from '../assets/smarter/icon-role.svg'
import iconContext from '../assets/smarter/icon-context.svg'
import iconDates from '../assets/smarter/icon-dates.svg'
import iconShipped from '../assets/smarter/icon-shipped.svg'
import iconProblem from '../assets/smarter/icon-problem.svg'
import iconRule from '../assets/smarter/icon-rule.svg'
import iconStates from '../assets/smarter/icon-states.svg'
import iconKeyboard from '../assets/smarter/icon-keyboard.svg'
import iconQuestion from '../assets/smarter/icon-question.svg'
import iconDiagram from '../assets/smarter/icon-diagram.svg'
import iconFilter from '../assets/smarter/icon-filter.svg'
import iconCompare from '../assets/smarter/icon-compare.svg'
import iconEye from '../assets/smarter/icon-eye.svg'
import iconClock from '../assets/smarter/icon-clock.svg'
import iconGears from '../assets/smarter/icon-gears.svg'

import artNav from '../assets/smarter/art-nav.svg'
import artLib from '../assets/smarter/art-lib.svg'
import artEhie from '../assets/smarter/art-ehie.svg'

export const icons = {
  role: iconRole,
  context: iconContext,
  dates: iconDates,
  shipped: iconShipped,
  problem: iconProblem,
  rule: iconRule,
  states: iconStates,
  keyboard: iconKeyboard,
  question: iconQuestion,
  diagram: iconDiagram,
  filter: iconFilter,
  compare: iconCompare,
  eye: iconEye,
  clock: iconClock,
  gears: iconGears,
}

export const art = {
  nav: artNav,
  lib: artLib,
  ehie: artEhie,
}

