'use client';
import { useState } from 'react';

const CHRISTMAS_CLUES = {
  '3-5': [
    'Where we keep cold things and ice cream stays, look inside the box with a door.',
    'By the tree where presents sit, look under the green branches low.',
    'Where we sit and watch films, check under the cushions on the sofa.',
    'In the kitchen on the top, look in the cupboard way up high.',
    'Where we sleep and rest our heads, check under the pillow soft.',
    'Where stockings hang so pretty, look by the fireplace mantle.',
    'In the hall by the coat rack, find your gift hung way up.',
    'Under the kitchen table where we eat every meal.',
    'In the bathroom by the sink, look in the cupboard below.',
    'By the back door or patio, check outside on the step.',
    'In the toy basket where toys live, buried under them all.',
    'On the shelf by the window sill, wrapped up and ready to go.',
    'Inside the wardrobe in the bedroom, hidden behind the clothes.',
    'By the bookshelf tall with books, tucked behind the ones in front.',
    'In the laundry basket clean, hidden under the clean clothes inside.'
  ],
  '5-7': [
    'Where the frost keeps everything cold, check the highest shelf inside.',
    'Beneath the tree with lights so bright, buried under the tinsel and boughs.',
    'In the room where the family sits to watch, inside the armchair seat.',
    'By the crackling heat if you have fire, check the mantle where stockings hang.',
    'Where warm water comes for bathing clean, under the sink\'s pipes below.',
    'In the hallway by the front entrance, taped inside the coat cupboard door.',
    'Where we prepare all the festive meals, inside the largest cupboard deep.',
    'Behind the door of the room you sleep, on the back hanging from a hook.',
    'Where books stand up in rows so tall, pressed between the volumes thick.',
    'In the room where laundry waits, inside a pillowcase folded up.',
    'Under the stairs in the shadows deep, taped to the underside of the rail.',
    'By the window where stockings hang, inside the sill or ledge below.',
    'In the garden by the porch or step, buried in a pot or under the stone.',
    'Where we keep toys and games, in the very back corner dark.',
    'Behind the TV or in the cabinet, inside a box underneath the shelf.',
    'Where the heating is or the radiator stands, taped behind it carefully.',
    'In the bathroom mirror cupboard, behind other bottles and things.',
    'By the door of the garden shed, inside the small window frame.',
    'Under the bed in the darkest spot, in a box or bag so tight.',
    'Where decorations are kept away, in a box amongst the tinsel and lights.'
  ],
  '7-9': [
    'In the appliance where we store food cold, behind the largest shelf inside.',
    'Beneath the tree with all your presents, in a waterproof bag amongst branches.',
    'Where the fireplace holds the hearth, taped inside the mantle decoration.',
    'In the room where bathing happens, inside a waterproof bag under sink.',
    'Behind the stairs going up and down, taped to the underside of the rail strong.',
    'In the cupboard where food is stored, inside a container behind other tins.',
    'Where the washing machine spins and cleans, inside the detergent box hollow.',
    'In the hall by the front door entrance, inside an umbrella stand or coat hook.',
    'Where the books are stored in rows, between two volumes that are thick.',
    'Inside the bedroom wardrobe deep, taped to the back panel of wood.',
    'In the garage or storage space, inside a toolbox or storage bin.',
    'Behind the television or monitor, taped to the wall behind it safe.',
    'In the garden in a pot or planter, buried inside with soil and stones.',
    'Where the desk and studying happens, inside a locked drawer or box.',
    'Behind a picture frame or poster, taped to the wall in the back behind.',
    'In the attic or under the stairs, in a waterproof container sealed.',
    'Where the lighting is controlled, taped behind the switch plate cover.',
    'Inside a toy box or storage chest, at the very bottom beneath things.',
    'By the door to the garden outside, inside the door frame or hinge.',
    'Where music or games are stored, inside a games box or board game box.'
  ],
  '9-12': [
    'In the appliance maintaining temperature, sealed in a waterproof pouch behind.',
    'Beneath the tree with all its lights, in a carefully placed gift wrapped tight.',
    'Where the heating system is located, behind the radiator panel or cover.',
    'In the room of hygiene and bathing, inside a waterproof container under sink.',
    'Behind the staircase framework, taped inside the structure deep and dark.',
    'In the storage of food and provisions, inside a sealed container amongst others.',
    'Where laundry is cleaned and dried, inside a fabric bag on the shelf above.',
    'In the entrance hall by the exit, inside the cupboard behind a coat or bag.',
    'Where literature and knowledge live, inside the dust jacket of a specific book.',
    'Inside the sleeping quarters wardrobe, taped to the interior back wall.',
    'Where vehicles are parked or stored, inside a toolbox or storage container.',
    'Behind the electronic display screen, taped to the structural wall behind safely.',
    'Outside in the garden space, sealed in a waterproof container deep buried.',
    'Where education and work occurs, inside a locked compartment or drawer.',
    'Behind the wall decorations hung, taped to the actual wall in the back.',
    'In the space above or below stairs, sealed in a waterproof bag secured tight.',
    'Where electrical switches control, on the wall behind the switch plate removed.',
    'Inside the toy and game storage, at the bottom in a sealed container.',
    'By the threshold of outside entry, inside the door frame or underneath threshold.',
    'Where entertainment media lives, inside the case of a game or DVD box.'
  ]
};

export default function ChristmasTreasureHuntGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [childName, setChildName] = useState('');
  const [numClues, setNumClues] = useState('7');
  const [generated, setGenerated] = useState(false);
  const [clues, setClues] = useState([]);

  const generateHunt = () => {
    const clueSet = CHRISTMAS_CLUES[ageGroup] || CHRISTMAS_CLUES['5-7'];
    const count = parseInt(numClues);
    const shuffled = [...clueSet].sort(() => Math.random() - 0.5).slice(0, count);

    const personalizedClues = shuffled.map((clue, idx) => {
      let text = clue;
      if (childName && idx === shuffled.length - 1) {
        text = `The final clue leads you to your main gift, ${childName}. Check under the tree where all the presents are wrapped.`;
      }
      return text;
    });

    setClues(personalizedClues);
    setGenerated(true);
  };

  const printHunt = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Christmas Morning Hunt Setup</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Child's Age Group</label>
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
            <label className="block text-text-secondary text-sm font-medium">Child's Name (optional)</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="E.g. Emma"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Number of Clues</label>
            <input
              type="range"
              min="3"
              max="15"
              value={numClues}
              onChange={(e) => setNumClues(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numClues} clues</div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Hunt Type</label>
            <select className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary">
              <option>Find Hidden Presents</option>
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
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-xl font-bold text-text-primary">Your Hunt Clues</h2>
              <button
                onClick={printHunt}
                className="px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium text-sm transition-colors"
              >
                Print
              </button>
            </div>

            <div className="space-y-4">
              {clues.map((clue, idx) => (
                <div key={idx} className="bg-white border border-border rounded-[var(--radius-card)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-mono font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="text-text-primary leading-relaxed">{clue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-red-900 mb-2">Parent Planning Tips</h3>
            <ul className="text-sm text-red-900 space-y-1 list-disc list-inside">
              <li>Print clues on festive paper or card, one per page</li>
              <li>Number them so child finds in order</li>
              <li>Hide first clue by the Christmas tree on Christmas morning</li>
              <li>Place each present or clue in the location mentioned</li>
              <li>Adjust hiding spots based on your home layout</li>
              <li>For younger children, use easier locations they know well</li>
              <li>For older children, make clues more cryptic and challenging</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-green-900 mb-2">Quick Setup Checklist</h3>
            <div className="text-sm text-green-900 space-y-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="step1" className="rounded" />
                <label htmlFor="step1">Print all clues</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="step2" className="rounded" />
                <label htmlFor="step2">Gather all presents and small gifts</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="step3" className="rounded" />
                <label htmlFor="step3">Plan your hiding spots from the clues</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="step4" className="rounded" />
                <label htmlFor="step4">Hide presents in chosen locations</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="step5" className="rounded" />
                <label htmlFor="step5">Place first clue by the tree</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
