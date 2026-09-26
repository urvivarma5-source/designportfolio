// Artwork shared by all three SMARTER case studies: the icon set and the three
// hero illustrations. Imported, never referenced by path, so Vite hashes them
// and applies the base path. See DESIGN.md §8.3 and §9.4.
//
// THESE ARE URVI'S OWN LICENSED SETS, not drawings of mine. She supplied them
// on 2026-09-25 from `Desktop/UU/CLAUDE PROTOTYPE/jehq/ICON SVGS/`:
//
//   icons  Streamline Freehand, the same hand-drawn family the Guide case
//          studies use. Source files are named by subject, so the mapping
//          below records which one each slot takes.
//   art    the ILLUSTRATIONS folder in the same set.
//
// An earlier version of this file held icons I drew to match. They were close
// but not the real thing, and there is no reason to imitate a set she owns.
// If a slot needs a new icon, take it from that folder rather than drawing one.
//
// COLOUR IS RECOLOURED ON COPY, not inherited: both sets ship as monochrome
// `fill="black"`, and these render through an `<img>`, which cannot reach
// `currentColor`. Icons become Orange #DC6B01, illustrations Primary Dark
// #0F1419. If the palette changes, re-copy from source with the new values.
//
// Slot            Source file
// role            human-resources-businessman
// context         collaboration-meeting-team-file
// clock           time-stopwatch
// gears           settings-cog-double-1
// shipped         archive-box
// states          layers-stacked-1
// problem         zoom-in-magnifier-1
// keyboard        keyboard
// question        help-question-circle
// diagram         programming-flowchart
// filter          filter
// compare         business-workflow-compare
// eye             view-eye-1
// rule            grid-ruler
// hierarchy       hierarchy
// art.nav         ILLUSTRATIONS/wireframe
// art.lib         ILLUSTRATIONS/analyze-data
// art.ehie        ILLUSTRATIONS/business-presentation

import iconRole from '../assets/smarter/icon-role.svg'
import iconContext from '../assets/smarter/icon-context.svg'
import iconShipped from '../assets/smarter/icon-shipped.svg'
import iconProblem from '../assets/smarter/icon-problem.svg'
import iconRule from '../assets/smarter/icon-rule.svg'
import iconStates from '../assets/smarter/icon-states.svg'
import iconKeyboard from '../assets/smarter/icon-keyboard.svg'
import iconQuestion from '../assets/smarter/icon-question.svg'
import iconDiagram from '../assets/smarter/icon-diagram.svg'
import iconFilter from '../assets/smarter/icon-filter.svg'
import iconCompare from '../assets/smarter/icon-compare.svg'
import iconHierarchy from '../assets/smarter/icon-hierarchy.svg'
import iconEye from '../assets/smarter/icon-eye.svg'
import iconClock from '../assets/smarter/icon-clock.svg'
import iconGears from '../assets/smarter/icon-gears.svg'

import artNav from '../assets/smarter/art-nav.svg'
import artLib from '../assets/smarter/art-lib.svg'
import artEhie from '../assets/smarter/art-ehie.svg'

export const icons = {
  role: iconRole,
  context: iconContext,
  shipped: iconShipped,
  problem: iconProblem,
  rule: iconRule,
  states: iconStates,
  keyboard: iconKeyboard,
  question: iconQuestion,
  diagram: iconDiagram,
  filter: iconFilter,
  compare: iconCompare,
  hierarchy: iconHierarchy,
  eye: iconEye,
  clock: iconClock,
  gears: iconGears,
}

export const art = {
  nav: artNav,
  lib: artLib,
  ehie: artEhie,
}

