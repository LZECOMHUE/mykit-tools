'use client';
import { useState } from 'react';

const TREASURE_CLUES = {
  pirates: {
    '3-5': [
      'Arrr, check where we keep the cold things, look in the box with a door.',
      'The pirate ship (the sofa) holds treasure, look under the cushions.',
      'By the window where the light comes in, check behind the curtains.',
      'In the bathroom where we wash, look on the shelf up high.',
      'Under the big bed where pirates sleep, check the darkest spot.',
      'By the toy basket, buried under all the toys inside.',
      'In the kitchen cupboard, look behind the plates and bowls.',
      'Behind the door in the hallway, check what\'s hung on hooks.',
      'By the big chair where we sit, look under the cushions soft.',
      'In the plant pot by the window, dig around inside it.'
    ],
    '5-7': [
      'Arrr, where the captain keeps treasure, look in the box of cold.',
      'In the captain\'s quarters (bedroom), check under the pillow high.',
      'In the pirate cave (under the stairs), find the hidden spot.',
      'By the ship\'s wheel (the steering something round), check nearby.',
      'Where the pirate washes (bathroom), look in the cupboard deep.',
      'In the pirate\'s chest (toy box), buried at the very bottom.',
      'By the ship\'s mast (tall furniture), check the space behind.',
      'In the crow\'s nest (high shelf), look at the back so high.',
      'Where the pirate cooks (kitchen), check the cupboard by the door.',
      'By the pirate\'s map (picture on wall), check what\'s behind it there.',
      'In the hold (basement or cellar), hidden in a dark corner.',
      'Where the rope is kept (garage), look wrapped around something.',
      'By the pirate flag (anything hanging), check what\'s under it.',
      'In the treasure map case (a container), look inside carefully.',
      'Where the pirate sleeps (bed), check inside the pillowcase.'
    ],
    '7-9': [
      'In the captain\'s quarters, the treasure lies behind the door frame.',
      'By the ship\'s helm (furniture with drawers), check inside the smallest drawer.',
      'Where the pirate washes, inside a waterproof bag under the sink.',
      'In the treasure chamber (basement), buried in a wooden box.',
      'By the ship\'s log (books), inside a specific book spine.',
      'In the galley (kitchen), inside a cupboard behind spice jars.',
      'Where the sails are stored (garage/shed), wrapped in canvas cloth.',
      'By the ship\'s figurehead (statue or large object), taped to the back.',
      'In the crow\'s nest (attic or high place), inside a leather pouch.',
      'Where the hold opens (storage), inside a locked box with a key.',
      'By the pirate\'s hammock (bed), taped to the underside of the frame.',
      'In the cannon room (cellar), inside a metal box.',
      'Where the pirate map is (wall), behind the picture frame.',
      'In the captain\'s safe (any locked container), hidden with the key nearby.',
      'By the ship\'s anchor (heavy object), underneath it or behind it.'
    ],
    '9-12': [
      'In the captain\'s quarters, sealed in a waterproof pouch within the furniture structure.',
      'By the ship\'s wheel (rotate the concept to something complex), cryptically located.',
      'In the captain\'s log (journal or diary), pressed between specific pages numbered.',
      'Where the treasure map is displayed, behind the frame in an envelope.',
      'In the ship\'s hold (deep storage), inside a locked chest requiring all clues to open.',
      'By the pirate\'s quarters, inside the space within the bed frame.',
      'In the captain\'s vault (a cupboard), behind a false wall or removable panel.',
      'Where the ship is docked (entrance area), inside something with maritime significance.',
      'By the treasure map table, underneath the table surface taped securely.',
      'In the lowest level (basement/cellar), inside a box matching the theme.'
    ]
  },
  space: {
    '3-5': [
      'On the alien planet (living room), look by the sofa cushions.',
      'In the spaceship (bedroom), check under the bed.',
      'By the moon (light fixture), look on the shelf.',
      'In the alien cave (cupboard), look inside carefully.',
      'Where the astronaut sleeps (bed), check under the pillow.',
      'By the stars (decorations), look on the wall nearby.',
      'In the rocket ship (toy box), look inside.',
      'By the planet rock (any rock/stone), look near it.',
      'In the space station (kitchen), check the cupboard.',
      'Where the aliens live (bathroom), look under the sink.'
    ],
    '5-7': [
      'On planet Earth (living room), check inside something round.',
      'In the spacecraft (bedroom), hidden behind the door.',
      'By the moon base (window), check behind the curtains.',
      'In the alien ship (basement), look in a corner.',
      'Where the astronaut suit is kept (closet), check a shelf.',
      'By the meteor field (garden), buried under something.',
      'In the control room (office), look in a drawer.',
      'Where the stars are stored (any high place), check carefully.',
      'By the rocket launch pad (entrance), look nearby.',
      'In the space station (kitchen), check inside a cupboard door.'
    ],
    '7-9': [
      'In the intergalactic control centre, hidden in a locked drawer or compartment.',
      'By the alien transmission device (radio or speaker), taped behind it.',
      'In the space suit locker (wardrobe), inside a pocket of a jacket.',
      'Where the launch codes are stored (computer area), inside a book.',
      'By the asteroid field (garden area), buried in soil in a waterproof container.',
      'In the alien spacecraft engine room (garage), hidden amongst tools.',
      'Where the space helmets rest (shelf), inside one of the decorative pieces.',
      'By the warp drive controls (furniture with buttons/switches), underneath or behind.',
      'In the crew quarters (bedroom), taped inside the bed frame.',
      'By the communication antenna (tall object), wrapped around the base.'
    ],
    '9-12': [
      'In the spacecraft command centre, sealed inside a puzzle or encoded container.',
      'By the alien archive (storage), inside a specific filed location.',
      'In the space station core (central location), hidden within the structure.',
      'Where intergalactic coordinates are kept, inside a sealed envelope.',
      'By the propulsion system (mechanical area), inside a secured box.',
      'In the alien dimension (abstract location), requiring puzzle solving to find.',
      'Where the warp core is housed (special location), behind a removable panel.',
      'By the communication satellites (high area), inside a waterproof container.',
      'In the deep space vault (locked area), requiring a key from another clue.',
      'Where the time capsule is kept, sealed and requiring all clues to access.'
    ]
  },
  nature: {
    '3-5': [
      'By the big tree, look under the branches.',
      'Under the rock, search nearby.',
      'In the bush, look inside carefully.',
      'By the flower garden, check under the plants.',
      'Under the log, peek underneath.',
      'By the water, look on the bank.',
      'In the grass, hidden amongst the tall bits.',
      'Under the garden table, look below.',
      'By the fence, check behind it.',
      'In the garden shed, look on a shelf.'
    ],
    '5-7': [
      'By the ancient oak tree, look in the hollow of the trunk.',
      'Under the mossy rock, buried in soil nearby.',
      'In the woodland clearing, search the circle of trees.',
      'By the stream or water, check the bank.',
      'Under the fallen log, buried in the soil.',
      'In the tall grass patch, hidden deep inside.',
      'By the hedgerow, look within the branches.',
      'Under the garden bench, taped underneath.',
      'By the fence corner, buried at the post.',
      'In the flower bed, hidden under mulch or bark.'
    ],
    '7-9': [
      'In the ancient woodland, buried at the base of the oldest tree.',
      'By the natural stream, inside a waterproof container on the bank.',
      'Under the woodland canopy (thick tree branches), hanging from a low branch.',
      'In the meadow circle (natural clearing), buried in soil at the centre.',
      'By the natural rock formation, inside a crevice or under the rock.',
      'Under the ancient log (decaying wood), hidden beneath in the soil.',
      'In the hedge boundary, taped to a thick branch inside.',
      'Where the wild plants grow thick, buried amongst the roots.',
      'By the natural pool or water feature, in a waterproof bag on the edge.',
      'In the woodland floor (amongst leaves and debris), buried shallow in soil.'
    ],
    '9-12': [
      'In the old growth woodland, sealed in a waterproof container at the tree base.',
      'By the natural water source, inside a secured container requiring puzzle solving.',
      'Under the limestone outcrop (rock formation), in a crevice secured safely.',
      'In the ancient grove, buried at a marked spot with natural landmarks.',
      'Where the woodland stream runs, inside a waterproof case on a particular bank marker.',
      'By the natural springs area, hidden amongst the water features safely.',
      'In the meadow\'s centre, at coordinates provided by previous clues.',
      'Under the protective canopy, in a location marked by natural features.',
      'By the habitat zone (special natural area), inside a container matching the environment.',
      'In the designated nature area, requiring knowledge of the location to find.'
    ]
  },
  detective: {
    '3-5': [
      'Check where the witness saw something, look for clues.',
      'By the crime scene (your room), look under something.',
      'In the suspect\'s hideout (kitchen), check the cupboard.',
      'Where evidence was found (living room), look by a chair.',
      'In the detective\'s office (your office), check the desk.',
      'By the clue board (wall), look underneath.',
      'In the interrogation room (dining room), check the table.',
      'Where the suspect was last seen (hallway), look around.',
      'By the evidence locker (cupboard), check inside.',
      'In the safe house (bedroom), look under the bed.'
    ],
    '5-7': [
      'At the primary crime scene, check for hidden evidence.',
      'In the suspect\'s safe house, look in the most logical place.',
      'Where the witness hid (any location), check around carefully.',
      'By the evidence marker (any object), search the immediate area.',
      'In the detective\'s headquarters (office), check the filing system.',
      'Where the getaway route leads (hallway/path), look along it.',
      'By the surveillance point (window), check what\'s nearby.',
      'In the alibi location (room the suspect claims to be in), check carefully.',
      'Where the clue leads (based on previous clues), search methodically.',
      'By the final location (entrance or central point), look around carefully.'
    ],
    '7-9': [
      'At the primary crime scene, inside a locked drawer requiring investigation.',
      'In the suspect\'s hideout (specific room), hidden behind an obvious object.',
      'Where the detective was stationed (office), inside a filing cabinet.',
      'By the evidence collection point, in a marked evidence bag.',
      'In the interrogation room (meeting place), under the table surface.',
      'Where the witness testified from (window), look at that exact spot.',
      'By the crime scene tape (marked area), inside a sealed container.',
      'In the secure evidence locker (safe place), requiring previous clues to access.',
      'Where the detective noted inconsistencies (specific room), check that area.',
      'By the case file location (office area), inside a folder or envelope.'
    ],
    '9-12': [
      'At the crime scene, inside a location requiring deductive reasoning to determine.',
      'In the suspect\'s residence, hidden using misdirection and logic puzzles.',
      'Where the witness evidence points (calculated location), in a sealed container.',
      'By the surveillance data (calculated position), inside a code-protected box.',
      'In the evidence archive, requiring access via solving investigative clues.',
      'Where the detective\'s analysis led (final location), behind a removable panel.',
      'By the case closure point (final area), sealed with a cryptic lock.',
      'In the secure evidence vault, requiring all clues solved to access.',
      'Where the guilty party would logically be (determined location), inside.',
      'By the detective\'s conclusion, in the location matching the case profile.'
    ]
  },
  general: {
    '3-5': [
      'Look where we keep toys, in the toy basket.',
      'Check the bookshelf, look at the bottom.',
      'Under the bed, search the dark spot.',
      'In the cupboard, look on a shelf.',
      'By the window, check behind the curtains.',
      'On the sofa, look under the cushions.',
      'In the kitchen, check the cupboard.',
      'By the door, look on the hooks.',
      'In the garden, check under the bench.',
      'By the stairs, look underneath.'
    ],
    '5-7': [
      'Where we keep the cold things, check behind something.',
      'In the hallway, look inside the coat cupboard.',
      'Under the stairs, search the space carefully.',
      'By the fireplace, check behind the mantle.',
      'In the bedroom, look inside the wardrobe.',
      'By the bookshelf, search behind the books.',
      'In the bathroom, check under the sink.',
      'By the window sill, look in the pot plant.',
      'In the garden, buried under the rocks.',
      'By the fence, check the post carefully.'
    ],
    '7-9': [
      'In the appliance that keeps things cold, check the highest shelf.',
      'By the entertainment centre, look behind the equipment.',
      'Under the stairs, inside a waterproof bag.',
      'In the bedroom wardrobe, inside the top shelf back.',
      'By the desk or study area, inside a locked drawer.',
      'In the basement or cellar, hidden in a corner.',
      'By the garage or shed, inside a toolbox.',
      'In the garden, buried in soil under a stone.',
      'By the patio or decking, underneath a board.',
      'In the attic or upper storage, inside a box.'
    ],
    '9-12': [
      'In the climate control system area, sealed in a waterproof container.',
      'By the secure document storage, inside a locked file.',
      'Under the structural stairs, inside a secured compartment.',
      'In the personal quarters, hidden using spatial reasoning.',
      'By the work station, inside a locked drawer requiring a key.',
      'In the lower level storage, inside a container matching the clue.',
      'By the vehicle storage area, inside something practical.',
      'In the outdoor area, buried at coordinates calculated from clues.',
      'By the deck or platform, underneath a removable section.',
      'In the attic or high storage, sealed in a container requiring puzzle solving.'
    ]
  }
};

export default function TreasureHuntClueGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [theme, setTheme] = useState('general');
  const [location, setLocation] = useState('both');
  const [numClues, setNumClues] = useState('8');
  const [generated, setGenerated] = useState(false);
  const [clues, setClues] = useState([]);

  const generateClues = () => {
    const clueSet = TREASURE_CLUES[theme]?.[ageGroup] || TREASURE_CLUES.general[ageGroup];
    const count = parseInt(numClues);

    const filtered = clueSet.filter(clue => {
      if (location === 'indoor') return !clue.toLowerCase().includes('garden') && !clue.toLowerCase().includes('outdoor') && !clue.toLowerCase().includes('yard');
      if (location === 'outdoor') return clue.toLowerCase().includes('garden') || clue.toLowerCase().includes('outdoor') || clue.toLowerCase().includes('yard') || clue.toLowerCase().includes('bench');
      return true;
    });

    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, count);
    setClues(shuffled);
    setGenerated(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Hunt Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Age Group</label>
            <div className="flex gap-2">
              {['3-5', '5-7', '7-9', '9-12'].map(age => (
                <button
                  key={age}
                  onClick={() => setAgeGroup(age)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors ${
                    ageGroup === age
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Location</label>
            <div className="flex gap-2">
              {['both', 'indoor', 'outdoor'].map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
                    location === loc
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {loc === 'both' ? 'Both' : loc === 'indoor' ? 'Indoor' : 'Outdoor'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary"
            >
              <option value="general">General Hunt</option>
              <option value="pirates">Pirates</option>
              <option value="space">Space</option>
              <option value="nature">Nature</option>
              {ageGroup >= '7-9' && <option value="detective">Detective</option>}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Number of Clues</label>
            <input
              type="range"
              min="5"
              max="15"
              value={numClues}
              onChange={(e) => setNumClues(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numClues} clues</div>
          </div>
        </div>

        <button
          onClick={generateClues}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Treasure Hunt
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-xl font-bold text-text-primary">Treasure Clues</h2>
            <div className="space-y-3">
              {clues.map((clue, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-[var(--radius-card)] border border-border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold">
                    {idx + 1}
                  </div>
                  <p className="flex-grow text-text-primary leading-relaxed pt-1">{clue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-blue-900 mb-2">Setup Tips</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Print each clue on a card or piece of paper</li>
              <li>Number them so children follow the sequence</li>
              <li>Place the treasure (small prize or reward) at the final location</li>
              <li>Have adults positioned to help younger children if needed</li>
              <li>Consider a time limit to make it more challenging for older children</li>
              <li>Adapt hiding spots based on your actual home or space</li>
            </ul>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium transition-colors"
          >
            Print Clues
          </button>
        </div>
      )}
    </div>
  );
}
