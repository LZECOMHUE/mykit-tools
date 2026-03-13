'use client';
import { useState } from 'react';

const HUNT_ITEMS = {
  'not-scary': {
    indoor: [
      'A pumpkin decoration',
      'Something orange',
      'A black cat picture',
      'A witch hat',
      'A bat decoration',
      'Candy corn',
      'A ghost decoration',
      'Autumn leaves',
      'A skull decoration (friendly looking)',
      'A spider web',
      'A lantern',
      'A potion bottle prop'
    ],
    garden: [
      'A fallen leaf',
      'A acorn or conker',
      'Something orange you found outside',
      'A stick shaped like a wand',
      'A pretty pebble',
      'Moss or lichen',
      'A flower or herb',
      'Something round',
      'Tree bark rubbing',
      'A feather'
    ],
    neighbourhood: [
      'A house decorated for Halloween',
      'A jack-o-lantern',
      'A decoration with a spider',
      'A decoration with a ghost',
      'Something orange on a house',
      'A skeleton decoration',
      'Autumn leaves on a tree',
      'A house with lights on',
      'A pumpkin patch',
      'A house with a wreath'
    ]
  },
  'mildly-spooky': {
    indoor: [
      'A creepy mask',
      'A mummy wrapped in bandages (toy)',
      'A Frankenstein decoration',
      'A vampire cape or decoration',
      'A dracula decoration',
      'A skeleton bone',
      'A black cat (decoration)',
      'A potion with a label',
      'A coffin decoration',
      'A candle in a spooky holder',
      'A witch broom',
      'A spell book (decorated book)'
    ],
    garden: [
      'A gravestone decoration',
      'A skeleton bone hidden in soil',
      'A cobweb',
      'A dark corner',
      'A creepy tree',
      'Something that looks like a ghost in a sheet',
      'A shadow on the ground',
      'A spooky plant (like thorns)',
      'Decaying leaves',
      'A dark hole or hollow'
    ],
    neighbourhood: [
      'A zombie decoration',
      'A monster decoration',
      'A scary mask displayed',
      'A creepy yard display',
      'A house with fog machine',
      'A grave yard display',
      'A skeleton in a window',
      'A mummy decoration',
      'A monster hand at the window',
      'A house with scary sounds (listen carefully!)'
    ]
  },
  'full-halloween': {
    indoor: [
      'A gothic decoration',
      'A witch figurine',
      'A cauldron prop',
      'An eyeball decoration',
      'A severed hand prop',
      'A fake blood decoration',
      'A demon decoration',
      'A curse note',
      'A horror movie poster',
      'A mechanical monster',
      'A fog machine or dry ice',
      'A skull with real-looking detail'
    ],
    garden: [
      'A prop corpse or skeleton',
      'A graveyard setup',
      'A creepy path',
      'A dark tunnel or archway',
      'A full-size monster',
      'Fog or mist effects',
      'A jumping prop',
      'A scary decoration hidden in bushes',
      'A motion-sensing decoration',
      'A life-size figure'
    ],
    neighbourhood: [
      'A full house transformation',
      'A professional graveyard',
      'A monster light show',
      'A scary sound system',
      'A house known for great decorations',
      'A horror movie themed house',
      'A glowing monster display',
      'A projection mapping display',
      'A interactive haunted house',
      'A house with actor in costume'
    ]
  }
};

export default function HalloweenScavengerHunt() {
  const [config, setConfig] = useState({
    ageGroup: '7-9',
    location: 'indoor',
    itemCount: '10',
    scareLevel: 'not-scary'
  });

  const [hunt, setHunt] = useState(null);

  const handleGenerate = () => {
    const scare = config.scareLevel;
    const loc = config.location;
    const count = parseInt(config.itemCount);

    const items = HUNT_ITEMS[scare][loc];
    const selected = [];

    for (let i = 0; i < count && i < items.length; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const item = items[randomIndex];
      if (!selected.includes(item)) {
        selected.push(item);
      }
    }

    // If we need more items, just take the first few from the list
    if (selected.length < count) {
      for (let i = 0; i < items.length && selected.length < count; i++) {
        if (!selected.includes(items[i])) {
          selected.push(items[i]);
        }
      }
    }

    setHunt(selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Age Group</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['3-5', '5-7', '7-9', '9-12'].map(age => (
              <button
                key={age}
                onClick={() => setConfig(c => ({ ...c, ageGroup: age }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.ageGroup === age
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Location</label>
          <div className="grid grid-cols-3 gap-2">
            {['indoor', 'garden', 'neighbourhood'].map(loc => (
              <button
                key={loc}
                onClick={() => setConfig(c => ({ ...c, location: loc }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize ${
                  config.location === loc
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Scare Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { value: 'not-scary', label: 'Fun, Not Scary' },
              { value: 'mildly-spooky', label: 'Mildly Spooky' },
              { value: 'full-halloween', label: 'Full Halloween' }
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setConfig(c => ({ ...c, scareLevel: opt.value }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition text-sm ${
                  config.scareLevel === opt.value
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Number of Items</label>
          <div className="grid grid-cols-4 gap-2">
            {['8', '10', '12', '15'].map(count => (
              <button
                key={count}
                onClick={() => setConfig(c => ({ ...c, itemCount: count }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.itemCount === count
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Create Scavenger Hunt
        </button>
      </div>

      {hunt && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
              Halloween Scavenger Hunt Checklist
            </h2>
            <p className="text-text-secondary mb-6">
              Find and check off all {hunt.length} items. Good luck!
            </p>

            <div className="space-y-3">
              {hunt.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border border-border rounded-[var(--radius-input)] p-3 hover:bg-accent-muted transition"
                >
                  <input
                    type="checkbox"
                    id={`item-${i}`}
                    className="w-5 h-5 mt-1 cursor-pointer accent-accent"
                  />
                  <label htmlFor={`item-${i}`} className="flex-1 cursor-pointer text-text-secondary">
                    {item}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-[var(--radius-input)]">
              <h3 className="font-heading font-semibold text-orange-900 mb-2">Tips for Success</h3>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>- Work together as a team and help younger kids find items</li>
                <li>- Take photos of found items if you can</li>
                <li>- Set a time limit to make it more exciting</li>
                <li>- Reward the team when all items are found</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGenerate}
              className="bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
            >
              Create Another Hunt
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white border border-border text-text-primary py-3 rounded-[var(--radius-input)] font-medium hover:bg-surface transition"
            >
              Print This List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
