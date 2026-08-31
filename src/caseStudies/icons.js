// The case study's line art, extracted from the Figma PDF export as vector
// paths (see DESIGN.md §11b). Imported rather than referenced by path so Vite
// hashes them and prefixes the base path — an absolute `/assets/...` URL would
// 404 under /designportfolio/.
//
// The colours are baked into the paths, matching the artwork: the green icons
// are #2F6454, the coral ones #D6576B. They are drawn as <img>, so they cannot
// be recoloured from CSS. That is deliberate — §11b's fidelity rule keeps the
// artwork's own palette.

import cabinet from '../assets/tctd/hero-cabinet.svg'
import arrow from '../assets/tctd/hero-arrow.svg'
import board from '../assets/tctd/hero-board.svg'

import caduceus from '../assets/tctd/stat-caduceus.svg'
import calendar from '../assets/tctd/stat-calendar.svg'
import eye from '../assets/tctd/stat-eye.svg'
import trophy from '../assets/tctd/stat-trophy.svg'

import team from '../assets/tctd/meta-team.svg'
import duration from '../assets/tctd/meta-duration.svg'
import methods from '../assets/tctd/meta-methods.svg'
import role from '../assets/tctd/meta-role.svg'

import book from '../assets/tctd/challenge-book.svg'
import search from '../assets/tctd/challenge-search.svg'
import building from '../assets/tctd/challenge-building.svg'

import register from '../assets/tctd/journey-register.svg'
import token from '../assets/tctd/journey-token.svg'
import waiting from '../assets/tctd/journey-waiting.svg'
import consult from '../assets/tctd/journey-consult.svg'
import followup from '../assets/tctd/journey-followup.svg'

import crowd from '../assets/tctd/mock-crowd.svg'
import folder from '../assets/tctd/mock-folder.svg'
import bell from '../assets/tctd/mock-bell.svg'
import clerk from '../assets/tctd/mock-clerk.svg'

export const icons = {
  cabinet,
  arrow,
  board,
  caduceus,
  calendar,
  eye,
  trophy,
  team,
  duration,
  methods,
  role,
  book,
  search,
  building,
  register,
  token,
  waiting,
  consult,
  followup,
  crowd,
  folder,
  bell,
  clerk,
}
