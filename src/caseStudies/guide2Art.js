// Part 2's artwork. Same rules as guide1Art.js: everything is imported so Vite
// hashes it and applies the base path (DESIGN.md §8.3, §9.4).
//
// Five drawings and four icons are the *same* art as Part 1's — the two decks
// share an illustration set — so they are imported from guide1 rather than
// extracted twice. Only the art Part 2 introduces lives in src/assets/guide2/.
//
// `shots` mixes two kinds of raster, and the distinction matters when you
// re-cut one (DESIGN.md §11c):
//   * plain screenshots, pulled out as bitmaps by extract_case_study_images.py
//   * whole compositions — screenshots plus the vector arrows and annotation
//     boxes drawn over them — rendered by render_case_study_regions.py, because
//     pulling the bitmaps out would drop everything that explains them

import scout from '../assets/guide1/art-scout.svg'
import balloon from '../assets/guide1/art-balloon.svg'
import bears from '../assets/guide1/art-bears.svg'
import film from '../assets/guide1/art-film.svg'
import reader from '../assets/guide1/art-reader.svg'

import car from '../assets/guide2/art-car.svg'
import ship from '../assets/guide2/art-ship.svg'
import shop from '../assets/guide2/art-shop.svg'
import cats from '../assets/guide2/art-cats.svg'
import future from '../assets/guide2/art-future.svg'
import puzzle from '../assets/guide2/art-puzzle.webp'

import team from '../assets/guide1/icon-team.svg'
import duration from '../assets/guide1/icon-duration.svg'
import tools from '../assets/guide1/icon-tools.svg'
import role from '../assets/guide1/icon-role.svg'
import factors from '../assets/guide1/icon-factors.svg'
import preferences from '../assets/guide1/icon-preferences.svg'
import strategies from '../assets/guide1/icon-strategies.svg'

import users from '../assets/guide2/icon-users.svg'
import areas from '../assets/guide2/icon-areas.svg'
import target from '../assets/guide2/icon-target.svg'
import categorize from '../assets/guide2/icon-categorize.svg'
import direct from '../assets/guide2/icon-direct.svg'
import adhoc from '../assets/guide2/icon-adhoc.svg'
import products from '../assets/guide2/icon-products.svg'
import method from '../assets/guide2/icon-method.svg'

import faAnnotated from '../assets/guide2/fa-annotated.webp'
import faSearchBar from '../assets/guide2/fa-search-bar.webp'
import dpVoting from '../assets/guide2/dp-voting.webp'
import dpDemos from '../assets/guide2/dp-demos.webp'
import dpSketchVote from '../assets/guide2/dp-sketch-vote.webp'
import dpLofi from '../assets/guide2/dp-lofi.webp'
import dpCollab from '../assets/guide2/dp-collab.webp'
import t11Hero from '../assets/guide2/t11-hero.webp'
import t11u1 from '../assets/guide2/t11-updated-1.webp'
import t11u2 from '../assets/guide2/t11-updated-2.webp'
import t11u3 from '../assets/guide2/t11-updated-3.webp'
import t12Hero from '../assets/guide2/t12-hero.webp'
import t12u1 from '../assets/guide2/t12-updated-1.webp'
import t12u2 from '../assets/guide2/t12-updated-2.webp'
import t12u3 from '../assets/guide2/t12-updated-3.webp'
import t13Hero from '../assets/guide2/t13-hero.webp'
import t13u1 from '../assets/guide2/t13-updated-1.webp'
import t13u2 from '../assets/guide2/t13-updated-2.webp'
import t14Hero from '../assets/guide2/t14-hero.webp'
import t14u1 from '../assets/guide2/t14-updated-1.webp'
import t14u2 from '../assets/guide2/t14-updated-2.webp'
import t14u3 from '../assets/guide2/t14-updated-3.webp'
import t14u4 from '../assets/guide2/t14-updated-4.webp'
import p11Hero from '../assets/guide2/p11-hero.webp'
import p12Hero from '../assets/guide2/p12-hero.webp'
import p12Retrieving from '../assets/guide2/p12-retrieving.webp'
import p21Hero from '../assets/guide2/p21-hero.webp'
import p21Sort from '../assets/guide2/p21-sort.webp'

export const art = { scout, balloon, bears, film, reader, car, ship, shop, cats, future, puzzle }

export const icons = {
  team,
  duration,
  tools,
  role,
  factors,
  preferences,
  strategies,
  users,
  areas,
  target,
  categorize,
  direct,
  adhoc,
  products,
  method,
}

export const shots = {
  'fa-annotated': faAnnotated,
  'fa-search-bar': faSearchBar,
  'dp-voting': dpVoting,
  'dp-demos': dpDemos,
  'dp-sketch-vote': dpSketchVote,
  'dp-lofi': dpLofi,
  'dp-collab': dpCollab,
  't11-hero': t11Hero,
  't11-updated-1': t11u1,
  't11-updated-2': t11u2,
  't11-updated-3': t11u3,
  't12-hero': t12Hero,
  't12-updated-1': t12u1,
  't12-updated-2': t12u2,
  't12-updated-3': t12u3,
  't13-hero': t13Hero,
  't13-updated-1': t13u1,
  't13-updated-2': t13u2,
  't14-hero': t14Hero,
  't14-updated-1': t14u1,
  't14-updated-2': t14u2,
  't14-updated-3': t14u3,
  't14-updated-4': t14u4,
  'p11-hero': p11Hero,
  'p12-hero': p12Hero,
  'p12-retrieving': p12Retrieving,
  'p21-hero': p21Hero,
  'p21-sort': p21Sort,
}
