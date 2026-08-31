// The Part 1 case study's artwork, in one map per kind. Everything here is
// imported rather than referenced by path, so Vite hashes it and prefixes the
// base path — an absolute `/assets/...` URL breaks the moment the base path
// is not `/`, which it has been and could be again.
// See DESIGN.md §8.3 and §9.4.
//
// `art` and `icons` are vector, pulled out of the PDF as paths by
// tools/extract_case_study_art.py; their colours are baked in and cannot be
// recoloured from CSS, which is the point (§11b's fidelity rule).
// `shots` is raster — screenshots, Miro boards and workshop photographs —
// composited onto white and re-encoded as WebP by
// tools/extract_case_study_images.py. See §9.14 for why WebP alone.

import scout from '../assets/guide1/art-scout.svg'
import balloon from '../assets/guide1/art-balloon.svg'
import gear from '../assets/guide1/art-gear.svg'
import bears from '../assets/guide1/art-bears.svg'
import film from '../assets/guide1/art-film.svg'
import reader from '../assets/guide1/art-reader.svg'
import puzzle from '../assets/guide1/art-puzzle.webp'
import question from '../assets/guide1/art-question.webp'

import team from '../assets/guide1/icon-team.svg'
import duration from '../assets/guide1/icon-duration.svg'
import tools from '../assets/guide1/icon-tools.svg'
import role from '../assets/guide1/icon-role.svg'
import users from '../assets/guide1/icon-users.svg'
import experiences from '../assets/guide1/icon-experiences.svg'
import factors from '../assets/guide1/icon-factors.svg'
import preferences from '../assets/guide1/icon-preferences.svg'
import strategies from '../assets/guide1/icon-strategies.svg'
import target from '../assets/guide1/icon-target.svg'
import preview from '../assets/guide1/icon-preview.svg'
import funnel from '../assets/guide1/icon-funnel.svg'
import eye from '../assets/guide1/icon-eye.svg'
import compass from '../assets/guide1/icon-compass.svg'
import sitemap from '../assets/guide1/icon-sitemap.svg'
import phone from '../assets/guide1/icon-phone.svg'

import check from '../assets/guide1/mark-check.svg'
import cross from '../assets/guide1/mark-cross.svg'

import guide from '../assets/guide1/logo-guide.svg'
import skilljar from '../assets/guide1/logo-skilljar.webp'
import linkedin from '../assets/guide1/logo-linkedin.webp'
import absorb from '../assets/guide1/logo-absorb.webp'
import zensai from '../assets/guide1/logo-zensai.webp'
import cornerstone from '../assets/guide1/logo-cornerstone.webp'
import talent from '../assets/guide1/logo-talent.webp'

import businessModelCanvas from '../assets/guide1/business-model-canvas.webp'
import journeyOwner from '../assets/guide1/journey-owner.webp'
import journeyEmployee from '../assets/guide1/journey-employee.webp'
import sprintStrip from '../assets/guide1/sprint-strip.webp'
import mapHmwNotes from '../assets/guide1/map-hmw-notes.webp'
import mapDotVoting from '../assets/guide1/map-dot-voting.webp'
import mapHmwWall from '../assets/guide1/map-hmw-wall.webp'
import sketchDemos from '../assets/guide1/sketch-demos.webp'
import sketchNotes from '../assets/guide1/sketch-notes.webp'
import sketchCrazyEights from '../assets/guide1/sketch-crazy-eights.webp'
import sketchSolution from '../assets/guide1/sketch-solution.webp'
import decideTargetHmw from '../assets/guide1/decide-target-hmw.webp'
import decideArtWall from '../assets/guide1/decide-art-wall.webp'
import decideStrawPoll from '../assets/guide1/decide-straw-poll.webp'
import decideSuperVote from '../assets/guide1/decide-super-vote.webp'
import protoSearch from '../assets/guide1/proto-search.webp'
import protoLeadership from '../assets/guide1/proto-leadership.webp'
import protoMyGuide from '../assets/guide1/proto-my-guide.webp'
import protoResults from '../assets/guide1/proto-results.webp'
import protoBrowse from '../assets/guide1/proto-browse.webp'

export const art = { scout, balloon, gear, bears, film, reader, puzzle, question }

export const icons = {
  team,
  duration,
  tools,
  role,
  users,
  experiences,
  factors,
  preferences,
  strategies,
  target,
  preview,
  funnel,
  eye,
  compass,
  sitemap,
  phone,
}

export const marks = { check, cross }

export const logos = { guide, skilljar, linkedin, absorb, zensai, cornerstone, talent }

export const shots = {
  'business-model-canvas': businessModelCanvas,
  'journey-owner': journeyOwner,
  'journey-employee': journeyEmployee,
  'sprint-strip': sprintStrip,
  'map-hmw-notes': mapHmwNotes,
  'map-dot-voting': mapDotVoting,
  'map-hmw-wall': mapHmwWall,
  'sketch-demos': sketchDemos,
  'sketch-notes': sketchNotes,
  'sketch-crazy-eights': sketchCrazyEights,
  'sketch-solution': sketchSolution,
  'decide-target-hmw': decideTargetHmw,
  'decide-art-wall': decideArtWall,
  'decide-straw-poll': decideStrawPoll,
  'decide-super-vote': decideSuperVote,
  'proto-search': protoSearch,
  'proto-leadership': protoLeadership,
  'proto-my-guide': protoMyGuide,
  'proto-results': protoResults,
  'proto-browse': protoBrowse,
}
