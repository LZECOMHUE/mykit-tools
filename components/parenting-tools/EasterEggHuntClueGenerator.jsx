'use client';
import { useState } from 'react';

// Pre-built clue sets for each age group and location
const CLUE_SETS = {
  '3-5': {
    indoor: {
      general: [
        'Look where we keep the cold things, look in a box with a door.',
        'Find where soft blankets live, on the big seat in front.',
        'Look where we wash our hands, under the sink is a treat.',
        'Search by the window with toys, hidden in the box below.',
        'Look inside the toy basket, where the blocks all sit.',
        'Find the place where we eat food, under the chair is your prize.',
        'Look behind the sofa where lost things hide.',
        'Search in the bathroom by the mirror high up.',
        'Find where we sleep, under the bed is waiting.',
        'Look in the kitchen in the cupboard by the door.',
        'Search the hallway in the coat closet dark.',
        'Find the living room by the lamp on the table.',
        'Look behind the curtains where the light comes in.',
        'Search the bookshelf in the corner of the room.',
        'Find the doorway, under the mat below.',
        'Look where pictures hang up on the wall.',
        'Search the plant pot by the window sill.',
        'Find the cushion on the chair, something waits inside.',
        'Look under the stairs in the space that is dark.',
        'Search the hallway closet where the shoes all stay.'
      ],
      pirates: [
        'Arrr, check where the cold treasure keeps, in a box with a door.',
        'The treasure chest lives where blankets sit, on the big seat.',
        'Shiver me timbers, look by the sink in the bathroom.'
      ]
    },
    garden: {
      general: [
        'Look by the garden gate where the flowers grow.',
        'Find the bench where we sit and rest.',
        'Search under the big tree trunk at the bottom.',
        'Look in the flower pot by the door.',
        'Find the shed door, your prize is by the handle.',
        'Search the fence post where it meets the ground.',
        'Look under the garden table on the flat part.',
        'Find the water tap, something hides beside it.',
        'Search the stone path where it starts.'
      ]
    }
  },
  '5-7': {
    indoor: {
      general: [
        'Where cold things live and ice cream goes, look on the shelf inside.',
        'In the room where we rest our heads, under the pillow you will find.',
        'Where soap and towels stay, high on the shelf above the sink.',
        'In the kitchen drawer where forks and spoons hide deep.',
        'Where the family sits together, under the cushion on the chair.',
        'In the hallway closet with shoes and hats and coats.',
        'Where we watch shows and relax, behind the cushion on the sofa.',
        'In the room with books on shelves, taped under a shelf you see.',
        'Where pencils and paper keep, inside the drawer at desk.',
        'In the bathroom cupboard where the brushes and combs live.',
        'Where we cook and make food, high on the cupboard above.',
        'In the hall by the mirror, under the small table there.',
        'Where the dog or cat might sleep, in their bed below.',
        'In the corner of the kitchen, behind the rubbish bin you go.',
        'Where we keep the cleaning things, but not where you normally play.',
        'In the lounge on the mantelpiece, behind a picture frame.',
        'Where the stairs go up and down, taped under the banister rail.',
        'In the room where guests will sit, under the window sill inside.',
        'Where the games and toys are kept, on the top shelf in the back.',
        'In the room with washing machine, taped under the sink pipe.'
      ],
      pirates: [
        'Arrr, where the captain keeps the rum, look in the cold chest with the door.',
        'On the pirate ship (the sofa), under the cushion be your prize.',
        'In the pirate cave (the cupboard under stairs), find your treasure hidden deep.',
        'Where the pirate washes (the bathroom), high on the shelf above.'
      ],
      dinosaurs: [
        'In the prehistoric cave (under the stairs), hidden where dinosaurs sleep.',
        'By the ancient watering hole (the sink), check the cupboard below.',
        'In the dinosaur nest (on the bed), under the pillow is treasure.'
      ]
    },
    garden: {
      general: [
        'Where the flowers grow tall, dig near the roots below.',
        'On the bench where we rest, check under the seat.',
        'By the garden shed, look under the wooden steps.',
        'Near the water tap outside, taped under the handle you go.',
        'Where the gate stands, check the post for tape or a bag.',
        'By the big tree, wrapped around the trunk so low.',
        'In the flower bed with soil, buried under the rocks.',
        'Near the garden fence, taped under the wooden rail.',
        'Where the path winds around, hidden under a stone.',
        'By the plant pots in rows, inside one of them below.'
      ]
    }
  },
  '7-9': {
    indoor: {
      general: [
        'In the room where we keep food, behind the largest box inside.',
        'Where we rest and sleep at night, taped under the bed frame low.',
        'In the room of books and learning, inside the tallest book on shelf.',
        'Where we clean and wash ourselves, under the sink behind the pipes.',
        'In the sitting room where family gathers, inside the seat of a chair.',
        'Where we keep our games and toys, in the back corner, tucked away.',
        'In the kitchen by the stove, taped underneath a drawer front.',
        'Where the stairs climb up and down, attached to the underside rail.',
        'In the hallway closet deep, taped inside a coat pocket there.',
        'Where the door frames meet the wall, behind the small shelf above.',
        'In the room with washing machine, inside a empty washing basket.',
        'Where the mirrors hang on walls, taped to the back of a frame.',
        'In the cupboard cold with food, behind a large box on a shelf.',
        'Where we eat our meals each day, taped under the table edge low.',
        'In the room with the front door, check behind the coat rack post.',
        'Where the telephone or phone lives, taped to the wall behind.',
        'In the closet near the coats, inside the pocket of one deep.',
        'Where the lighting switches are, on the wall behind one switch plate.',
        'In the bathroom with the tiles, inside a cupboard behind a cup.',
        'Where the sofa stands up tall, taped on the wooden frame below.'
      ],
      pirates: [
        'In the captain\'s quarters (bedroom), hidden inside a compass case.',
        'In the ship\'s hold (basement/cellar), beneath the wooden floorboards.',
        'By the treasure chest (under stairs), inside a leather pouch tied tight.'
      ],
      space: [
        'In the alien spaceship (bedroom), hidden behind the moon poster.',
        'On the planet surface (garden), buried under the moon rocks.',
        'In the space station (kitchen), inside a metallic box or tin.'
      ]
    },
    garden: {
      general: [
        'Where the garden meets the wall, check behind the drainpipe or corner.',
        'Under the bench where you sit, taped on the wooden slat below.',
        'By the garden shed or greenhouse, inside the door frame.',
        'Near the garden tap or hose, wrapped around the copper pipe.',
        'Where the fence post meets ground, buried in the soil nearby.',
        'Under the big tree\'s roots, wrapped around the lowest root.',
        'In the garden bed with soil, inside a terracotta pot turned.',
        'By the hedge or bush dense, hidden inside the branches thick.',
        'Where the path goes through, under a stepping stone below.',
        'Near the garden gate entrance, taped to the wooden post.'
      ]
    }
  },
  '9-12': {
    indoor: {
      general: [
        'In the appliance that stores heat and ice, check behind the largest shelf.',
        'Where water drains from surfaces high, look in the cabinet below.',
        'In the room where clothes get washed, inside a jar beneath the sink.',
        'Where books stand up in rows, between two volumes that are thick.',
        'In the place where we rest and dream, taped to the underside of frame.',
        'Behind the piece that hangs to show the time, check the wall behind.',
        'Inside the furniture where remote controls live, in the side compartment deep.',
        'Where the stairs ascend and descend, taped to the underside of rail.',
        'In the closet with clothes hung high, inside a shoe on the top shelf.',
        'Where heating happens in the walls, check behind the radiator or vent.',
        'Inside the room where we bathe, in a waterproof bag under sink.',
        'Behind the poster or artwork framed, taped to the wall in back.',
        'Where electrical switches are mounted, on the wall behind a switch plate.',
        'In the place where we prepare meals, inside the cupboard behind.'
      ],
      pirates: [
        'Deep in the captain\'s chambers, sealed in a leather pouch encrypted.',
        'In the treasure vault (safe), behind a false panel of wood.',
        'In the captain\'s log (journal), pressed between the pages yellowed.'
      ],
      detective: [
        'At the scene of the mystery (kitchen), hidden in a cereal box.',
        'In the suspect\'s hideout (bedroom), inside a book\'s dust jacket.',
        'Check the alibi (garage), behind a stack of boxes piled.'
      ]
    },
    garden: {
      general: [
        'Where the garden structure stands, inside the hollow post or frame.',
        'Near the base of the oldest tree, buried three hands deep in soil.',
        'By the garden watering system, taped inside the watering can.',
        'Where the fence meets the boundary line, check the post\'s crevice deep.',
        'In the garden bed arrangement, inside a small buried container.',
        'By the garden pathway stones, under one that is loose and lifts.',
        'Where the garden shed door swings, check the hinge or underneath.',
        'Near the compost or mulch pile, inside a bag that\'s buried.',
        'By the garden statue or ornament, taped to the back or underneath.',
        'Where the garden bench is placed, inside the storage underneath.'
      ]
    }
  }
};

export default function EasterEggHuntClueGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [location, setLocation] = useState('indoor');
  const [numClues, setNumClues] = useState('5');
  const [theme, setTheme] = useState('general');
  const [generated, setGenerated] = useState(false);
  const [clues, setClues] = useState([]);
  const [hidingSpots, setHidingSpots] = useState([]);

  const HIDING_SPOT_SUGGESTIONS = {
    '3-5-indoor': ['Inside the toy basket', 'On the bookshelf low', 'Under the coffee table', 'In the cushions on the sofa', 'By the window on a sill', 'In a pot plant pot', 'Under the kitchen table', 'Inside the bathroom cabinet', 'Behind the bedroom door', 'In a kitchen drawer'],
    '5-7-indoor': ['Behind a picture frame', 'Inside a cereal box', 'Under the bed frame', 'Taped under a table edge', 'Inside a shoes box', 'Behind the curtains', 'In a cookie jar', 'Inside a pillow case', 'Under a chair cushion', 'Inside a book'],
    '7-9-indoor': ['Inside the freezer behind food', 'Taped under a drawer handle', 'Inside a pencil case', 'Behind books on a shelf', 'Inside a lamp shade', 'Under the sink pipe', 'Taped inside a coat pocket', 'Inside a puzzle box', 'Behind a poster', 'Inside a sports bag'],
    '9-12-indoor': ['Behind a switch plate cover', 'Inside a desk drawer deep', 'Taped under the banister rail', 'Inside a book spine', 'Behind a radiator grill', 'Inside a storage box labeled other', 'Under the TV stand', 'Inside a musical instrument case', 'Behind a piece of artwork', 'Inside a shoe on a shelf'],
    '3-5-garden': ['Under the garden bench', 'By the flower pots', 'Under a big rock', 'By the garden gate', 'Under a bush', 'By the water tap', 'Under the garden table', 'In a plant pot', 'By the fence corner', 'Under the shed door'],
    '5-7-garden': ['Inside a flower pot buried', 'Under a stepping stone', 'By the garden shed', 'Under a log or stick', 'In the hedge', 'By the fence post', 'Under mulch or bark', 'By the tree roots', 'Under a garden stone', 'In a plastic box buried'],
    '7-9-garden': ['Buried under the tree roots', 'Inside a terracotta pot', 'Under a loose stepping stone', 'Inside the shed by door frame', 'Wrapped around fence post', 'Inside a buried container', 'By the drainpipe corner', 'Under compost pile', 'Inside a water barrel', 'By the garden bench leg'],
    '9-12-garden': ['Sealed in a waterproof box buried', 'Inside the garden post crevice', 'Under the wooden bench seat', 'Inside the shed roof overhang', 'By the boundary fence corner', 'Inside a buried PVC pipe', 'Under the garden pathway', 'Inside the water butt', 'By the garden ornament', 'Under the hedge root']
  };

  const generateHunt = () => {
    const clueSet = CLUE_SETS[ageGroup]?.[location]?.[theme] || CLUE_SETS[ageGroup]?.indoor?.general;
    const count = parseInt(numClues);

    const shuffled = [...clueSet].sort(() => Math.random() - 0.5).slice(0, count);
    setClues(shuffled);

    const spotKey = `${ageGroup}-${location}`;
    const spots = (HIDING_SPOT_SUGGESTIONS[spotKey] || HIDING_SPOT_SUGGESTIONS['5-7-indoor']).sort(() => Math.random() - 0.5).slice(0, count);
    setHidingSpots(spots);
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
              {['indoor', 'garden'].map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
                    location === loc
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {loc === 'indoor' ? 'Indoor' : 'Garden'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Number of Clues</label>
            <input
              type="range"
              min="5"
              max="20"
              value={numClues}
              onChange={(e) => setNumClues(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numClues} clues</div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary"
            >
              <option value="general">General Hunt</option>
              {ageGroup >= '5-7' && <option value="pirates">Pirates</option>}
              {ageGroup >= '5-7' && <option value="dinosaurs">Dinosaurs</option>}
              {ageGroup >= '7-9' && <option value="space">Space</option>}
              {ageGroup >= '9-12' && <option value="detective">Detective</option>}
            </select>
          </div>
        </div>

        <button
          onClick={generateHunt}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Hunt
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-xl font-bold text-text-primary">Rhyming Clues</h2>
            <div className="space-y-3">
              {clues.map((clue, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold">
                    {idx + 1}
                  </div>
                  <p className="flex-grow text-text-primary leading-relaxed pt-1">{clue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-xl font-bold text-text-primary">Parent Cheat Sheet - Hiding Spots</h2>
            <p className="text-text-secondary text-sm">Use these as inspiration for where to hide the eggs. Adjust based on your home or garden.</p>
            <div className="space-y-2">
              {hidingSpots.map((spot, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="font-mono font-bold text-accent">{idx + 1}.</span>
                  <p className="text-text-primary">{spot}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4">
            <p className="text-sm text-amber-900"><span className="font-bold">Pro tip:</span> Print the clues on colourful paper or egg-shaped cards for extra fun. Number them so children find them in order.</p>
          </div>
        </div>
      )}
    </div>
  );
}
