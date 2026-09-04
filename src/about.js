// ---------------------------------------------------------------------------
// ALL COPY FOR THE ABOUT PAGE. Transcribed from the Figma export ("abt.pdf")
// with tools/extract_case_study.py. Layout is in pages/About.jsx.
//
// Emphasis is carried in the data, the same convention the Guide case studies
// use: a paragraph is a string, or an array whose members are strings and
// { em } objects. `em` is the export's bold-italic run.
//
// Unlike a case study this page is the *site's* own, so it takes the site's
// palette and faces rather than the export's — see DESIGN.md §4.12. The
// export's structure is kept exactly: four sections, each a column of prose
// beside a photo collage, alternating sides.
// ---------------------------------------------------------------------------

export const about = {
  title: 'About',

  sections: [
    {
      id: 'intro',
      heading: 'Hi! I’m Urvi!',
      side: 'right', // which side the collage sits on
      collage: 'collage-intro',
      alt: 'Photographs from the University of Maryland: receiving an award, presenting at UXTerps, with the Testudo mascot, and with the iSchool cohort.',
      body: [
        'I’m a Product Designer and Researcher, with an MS in Human Computer Interaction from The University of Maryland.',
        [
          "I currently lead all User Experience efforts for the NIH-backed SMARTER Project at the University of Utah's Department of Biomedical Informatics, where we're ",
          { em: 'developing community-driven metadata and data management tools to support reproducible environmental exposure health research.' },
        ],
        [
          'In the past, I have also supported design education across multiple disciplines, from game design to health informatics, helping students develop solutions that make an impact- ',
          { em: 'for the better.' },
        ],
        [
          { em: "My passion: Decoding human behavior to create experiences that don't just work—they resonate." },
        ],
      ],
    },
    {
      id: 'journey',
      heading: 'My Design Journey',
      side: 'left',
      collage: 'collage-journey',
      alt: 'Architecture school work: physical models, interior renders, a section drawing, and site photographs from Mumbai.',
      body: [
        'It all began in 2017 in architecture school. I was skeptical about it at first, but by the end of the first day, I knew I was supposed to be a designer.',
        'I spent the next 10 semesters working on a massive variety of design problems, ranging from filmmaking to heritage conservation to digital design. I spent days (and nights) finding inspiration in everything I laid eyes on.',
        'I then decided to go to design school (again). When something’s that nice, you gotta do it twice!',
        [
          { em: "I learned that everything anyone interacts with was once just a sketch on a drawing board. I've loved every moment of being a designer and researcher since." },
        ],
      ],
    },
    {
      id: 'architecture',
      heading: 'Architecture > UX',
      side: 'right',
      collage: 'collage-ux',
      alt: 'Research and workshop photographs: affinity mapping on a wall of sticky notes, a whiteboard session, and a group workshop in progress.',
      body: [
        "This perspective really changed how I see design's impact, and eventually led me toward the human-centered world of UX design.",
        "Working across a variety of different disciplines taught me something important—good design is really just about solving human problems, no matter what you're designing.",
        [
          'My architectural training ',
          { em: 'gives me both a systematic way to tackle complex problems and an eye for balancing form with function.' },
        ],
        [
          "These core principles still guide my design approach today as I've moved into UX, where ",
          { em: 'understanding people through research drives every decision I make.' },
        ],
      ],
    },
    {
      id: 'beyond',
      heading: 'Beyond the Drawing Board',
      side: 'left',
      collage: 'collage-beyond',
      alt: 'Away from the desk: a darkroom print, a live music venue, drumming, and hiking in the mountains with a film camera.',
      body: [
        "When I'm not sketching interfaces or conducting research, you'll find me exploring other creative pursuits. I've been a drummer for years, finding rhythm in unexpected places.",
        "Film photography has become my contemplative practice—there's something magical about spending hours in the darkroom, developing film and watching images slowly emerge on paper.",
        'Nature is my ultimate reset button. Hiking through forests and mountains lets me disconnect from screens completely, giving my mind space to wander and recharge. These moments among the trees are essential to keeping my perspective fresh and my creativity flowing.',
        [
          { em: "I've found that this intentional balance between digital and analog experiences keeps me ready to tackle any design challenge that comes my way." },
        ],
      ],
    },
  ],
}
