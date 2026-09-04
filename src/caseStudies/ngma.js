// ---------------------------------------------------------------------------
// ALL COPY FOR "REDESIGNING THE NATIONAL GALLERY OF MODERN ART WEBSITE".
// Transcribed from the Figma export ("VD Case Study.pdf") with
// tools/extract_case_study.py. Layout is in NgmaPage.jsx; nothing below is
// styling. See DESIGN.md §11d.
//
// This is a *visual design* case study, so its shape is different from the
// other three: short commentary sections alternating with full-bleed mockups
// of the redesigned site. The mockups are rendered images — they are Figma
// frames of a website, not this site's own UI, and rebuilding them as live
// markup would be reproducing the artefact rather than showing it.
//
// The export's orphan "Prototype" heading is resolved: the published version of
// this case study ends with a "Full Prototype Here" call to action, which is
// what that heading belongs to. It is `outro` below.
//
// The mockups' body copy is greeked ("Carrot cake jelly beans…") in the
// artwork. That is the artwork's own placeholder and it stays inside the
// images; none of it is repeated as live text here.
// ---------------------------------------------------------------------------

export const ngma = {
  slug: 'website-redesign-for-ngma-mumbai',

  hero: {
    title: 'Redesigning the National Gallery of Modern Art Website:',
    sub: 'Exploring Chaos to Calm',
    cta: { label: 'Full Website Here', href: 'https://tinyurl.com/mrxm99fh' },
  },

  // The published case study closes on this, and it is what the export's
  // orphan "Prototype" heading belongs to.
  outro: { title: 'Full Prototype Here', cta: { label: 'Full Website', href: 'https://tinyurl.com/mrxm99fh' } },

  // The two opening notes sit side by side in the artwork, the second set
  // right-aligned against the drawing between them.
  overview: {
    title: 'Overview',
    body: 'The National Gallery of Modern Art in Mumbai, a renowned cultural institution, required a website redesign to capture the essence of its architectural marvel and transform the online experience for visitors. This project aimed to create a visually striking and engaging digital presence that seamlessly transitioned from the chaos of the bustling city to the tranquil sanctuary of the gallery.',
  },

  inspiration: {
    title: 'Inspiration',
    body: 'Inspired by the iconic staircase of the National Gallery of Modern Art, I embarked on a journey to translate the architectural grandeur into a dynamic web design. The staircase, a symphony of geometric shapes and lines, served as the catalyst for a series of motifs and graphics that permeated the website, creating a cohesive and immersive experience.',
  },

  moodboard: {
    title: 'Moodboard',
    body: "The website's design embodies a captivating visual narrative, transitioning from the chaos of Mumbai's bustling cityscape to the serene sanctuary of the gallery. The bold and vibrant landing page, with its dynamic graphics and colors, represents the energy and vibrancy of the city. As visitors navigate deeper into the website, the design gradually shifts to a minimalist white backdrop, punctuated by bursts of color, reflecting the tranquil atmosphere of the gallery space.",
    img: 'moodboard',
    alt: 'Moodboard: photographs of crowded Mumbai streets and markets on the left, a yellow double chevron, and calm white gallery interiors on the right.',
  },

  architecture: {
    title: 'Drawing from Architectural Elements',
    body: [
      "The National Gallery of Modern Art's staircase, a masterpiece of modern architecture, captured my imagination with its bold lines, sharp angles, and intricate patterns. I meticulously studied its design elements, translating the physical forms into digital graphics that echoed the gallery's essence. These motifs became the foundation of the website's visual language, infusing each page with a sense of artistic expression and cultural richness.",
    ],
    aside: [
      'Incorporating architectural elements into web design is a powerful way to create an immersive and authentic experience. By drawing inspiration from the physical structure of the National Gallery of Modern Art, the redesigned website becomes an extension of the gallery itself, inviting visitors to explore the digital realm while connecting with the tangible essence of the space.',
      'Each design pattern, color choice, and graphic element employed in the redesign holds symbolic significance and deeper meaning. For example, the recurring geometric motifs pay homage to the modernist architectural style of the gallery, while the colors draw inspiration from the vibrant hues found in the artwork displayed within its walls.',
    ],
    photos: { img: 'arch-photos', alt: 'Two photographs of the gallery’s spiral staircase and semi-circular galleries.' },
    // Vector, not a crop: an earlier raster cut of this area swallowed the
    // aside text beside it and printed it twice on the page.
    motifs: { alt: 'The motif set drawn from the staircase: rosettes, concentric rings, stepped blocks, bursts and asterisks.' },
  },

  cohesion: {
    title: 'Creating Cohesion through Systems',
    body: 'To maintain a cohesive and consistent user experience throughout the website, I established a systematic approach to my design elements. This involved the development of recurring patterns, symbols, and color schemes that were consistently applied across various pages and sections. By adhering to these visual systems, I ensured a harmonious and unified aesthetic, enhancing the overall user journey.',
    img: 'cohesion',
    alt: 'The pattern system: wave, chevron and scallop bands built from the motifs, applied across page sections.',
  },

  colour: {
    title: 'Colour Scheme',
    body: [
      "The color scheme of the redesigned National Gallery of Modern Art website serves as a visual narrative, seamlessly guiding visitors from the vibrant chaos of Mumbai's cityscape to the serene sanctuary of the gallery.",
      "Anchored in the gallery's logo, the green and deep indigo blue establish a foundation rooted in its branding. Users also encounter the energetic mustard yellow, mirroring the bustling streets of Mumbai.",
      "Turquoise and midnight blue tones evoke clarity and sophistication, reflecting the gallery's tranquil atmosphere. Tangerine orange and dusty rose accents add depth, symbolizing the passion of artists and the gallery's balance between tradition and modernity.",
      'This carefully curated palette not only establishes a cohesive visual language but also creates a captivating narrative, mirroring the transformative journey experienced within the walls of the National Gallery of Modern Art.',
    ],
    // Five over two, as the artwork lays them out. The hex values are the
    // export's own labels, so they are the swatch and the caption both.
    swatches: [
      ['43A363', '355592', 'F5BD33', '58C3C3', '091133'],
      ['FF6A35', 'F45B6A'],
    ],
  },

  type: {
    title: 'Type',
    body: [
      'The selection of Quiche Display as the primary font for the redesigned National Gallery of Modern Art website was a deliberate choice that aimed to infuse the digital experience with a modern yet whimsical energy.',
      "This contemporary typeface strikes a perfect balance between clean, minimalist lines and playful, organic curves, mirroring the gallery's dedication to showcasing cutting-edge artistic expressions while maintaining a sense of wonder and creativity.",
      "The font's distinct character gives the website a sense of sophistication and elegance, while its quirky details inject a touch of whimsy, inviting visitors to embark on a journey of artistic discovery.",
    ],
    img: 'type-specimen',
    alt: 'Type specimen: Quiche Display Medium and Articulat CF Regular set against a page of the redesign.',
  },

  // Each mockup is one rendered image of a Figma frame.
  pages: [
    {
      title: 'Landing Page',
      img: 'mock-landing',
      alt: 'The redesigned landing page: the gallery name over a painted background, then bold coloured bands announcing the collection and weekly events.',
    },
    {
      title: 'About Us Page',
      img: 'mock-about',
      alt: 'The About page, telling the gallery’s history in large numerals — 1996, 1456 artworks, the 1950s — against photographs of the building.',
    },
    {
      title: 'Exhibitions Page',
      img: 'mock-exhibitions',
      alt: 'The Exhibitions page: a featured show with ticket and virtual-tour buttons, then a grid of ongoing exhibitions.',
    },
    {
      title: 'Events Page',
      img: 'mock-events',
      alt: 'The Events page: a title block over a wave band, then a two-column grid of events with dates, venues and admission.',
    },
    {
      title: 'Permanent Collection Page',
      img: 'mock-collection',
      alt: 'The Permanent Collection page: a long grid of artworks, each framed by coloured corner brackets drawn from the motif set.',
    },
  ],
}
