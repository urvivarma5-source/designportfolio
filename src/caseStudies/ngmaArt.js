// The NGMA case study's artwork. Imported, never referenced by path, so Vite
// hashes it and applies the base path — see DESIGN.md §8.3 and §9.4.
//
// Everything here is raster, and all of it comes from
// tools/render_case_study_regions.py rather than the bitmap extractor: the
// page mockups are *compositions* — photographs under vector type, motifs and
// pattern bands — and pulling the bitmaps out would leave the photographs
// without the design drawn over them. See §11d.
//
// The five mockups are rendered at a 1700px cap rather than the usual 2200,
// because they are full-page frames up to 5000pt tall and the tallest was a
// 1.6MB image on its own. The supporting artwork keeps the 2200 cap.

// Three pieces of the artwork are vector and are pulled out as paths by
// extract_case_study_art.py: the green fan and yellow asterisk that flank the
// title, and the pink triangle band that sits under every page heading.
import heroFan from '../assets/ngma/hero-fan.svg'
import heroAsterisk from '../assets/ngma/hero-asterisk.svg'
import bandTriangles from '../assets/ngma/band-triangles.svg'

import artMotif from '../assets/ngma/art-motif.webp'
import moodboard from '../assets/ngma/moodboard.webp'
import archPhotos from '../assets/ngma/arch-photos.webp'
import archMotifs from '../assets/ngma/arch-motifs.webp'
import cohesion from '../assets/ngma/cohesion.webp'
import typeSpecimen from '../assets/ngma/type-specimen.webp'
import mockLanding from '../assets/ngma/mock-landing.webp'
import mockAbout from '../assets/ngma/mock-about.webp'
import mockExhibitions from '../assets/ngma/mock-exhibitions.webp'
import mockEvents from '../assets/ngma/mock-events.webp'
import mockCollection from '../assets/ngma/mock-collection.webp'

export const art = { heroFan, heroAsterisk, bandTriangles }

export const shots = {
  'art-motif': artMotif,
  moodboard,
  'arch-photos': archPhotos,
  'arch-motifs': archMotifs,
  cohesion,
  'type-specimen': typeSpecimen,
  'mock-landing': mockLanding,
  'mock-about': mockAbout,
  'mock-exhibitions': mockExhibitions,
  'mock-events': mockEvents,
  'mock-collection': mockCollection,
}
