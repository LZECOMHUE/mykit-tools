'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const tavernData = {
  cozy: {
    names: ['The Rusty Dragon', 'The Hearth House', 'The Wanderer\'s Rest', 'The Cozy Crown', 'The Traveller\'s Home'],
    drinks: ['Dragon\'s Breath Ale', 'Honeyed Mead', 'Spiced Mulled Wine', 'Comfort Cider', 'Warm Tavern Blend'],
    innkeepers: ['Old Grimsby the One-Eyed', 'Friendly Maggie Thornwell', 'Kindly Tobias Warmhearth', 'Grandmother Elspeth', 'Jolly Marcus Goldleaf'],
    rumours: ['A lost treasure map is hidden in the cellar', 'A mysterious bard visits every full moon', 'The innkeeper knows everyone\'s secrets', 'Strange glowing lights appear at midnight', 'Every meal brings good fortune'],
  },
  rowdy: {
    names: ['The Boar\'s Tusks', 'The Breakbone Tavern', 'The Thundering Hall', 'The Wild Beast', 'The Hellfire Inn'],
    drinks: ['Orc Crushbrew', 'Warrior\'s Fury Mead', 'Brawler\'s Black Ale', 'Dragon Slayer Whiskey', 'Blacksmith\'s Hammer'],
    innkeepers: ['Brutal Barrick the Scarred', 'Fierce Fiona Bloodfist', 'Axeman\'s Axel', 'Crusher McGraw', 'Red-faced Rodney'],
    rumours: ['The strongest fighter gets free drinks', 'Someone once defeated three giants here', 'Arm wrestling contests happen nightly', 'The tavern has survived three wars intact', 'Lost treasures are buried nearby'],
  },
  mysterious: {
    names: ['The Shadowed Wyvern', 'The Silent Serpent', 'The Whisper\'s Rest', 'The Veiled Mirror', 'The Midnight Crossing'],
    drinks: ['Moonshade Elixir', 'Phantom\'s Shadow Wine', 'Whispernight Liquor', 'Veil of Secrets Potion', 'Darkwood Brew'],
    innkeepers: ['The Mysterious Keeper', 'Silvia Nightshade', 'The Cloaked One', 'Keeper of Secrets', 'The Enigma'],
    rumours: ['A secret passage leads to forgotten temples', 'The innkeeper is not what they seem', 'Ghosts walk these halls after midnight', 'A prophecy was fulfilled here once', 'Dark magic protects this place'],
  },
  elegant: {
    names: ['The Golden Goblet', 'The Noble\'s Paradise', 'The Starlight Salon', 'The Velvet Crown', 'The Crystal Hall'],
    drinks: ['Aged Golden Wine', 'Noble\'s Reserve Brandy', 'Starlight Champagne', 'Royal Velvet Mead', 'Crystal Pure Spirits'],
    innkeepers: ['Lord Ashworth the Refined', 'Lady Victoria Goldenseal', 'Master of Ceremonies Eduard', 'Baroness Silverwind', 'Duke Fairchild'],
    rumours: ['Nobility from across the realm dines here', 'A love story began in these halls', 'Priceless art hangs on every wall', 'Royal decrees are made here', 'The finest wines in existence are stored below'],
  },
  cursed: {
    names: ['The Hanged Man\'s Hut', 'The Plague Bearer', 'The Cursed Crown', 'The Doomed Soul', 'The Sorrow\'s Nest'],
    drinks: ['Cursed Bloodwine', 'Doom\'s Elixir', 'Sorrow\'s Draught', 'Hex Honey Mead', 'Damnation Dark Ale'],
    innkeepers: ['The Cursed Keeper', 'Damned Darius Blackwell', 'The Wretched One', 'Sorrow\'s Eternal Keeper', 'The Doomed Innkeeper'],
    rumours: ['A terrible curse haunts these walls', 'No one who drinks here escapes unharmed', 'A dark ritual was performed here', 'The innkeeper sold their soul long ago', 'Disaster follows those who stay the night'],
  },
};

export default function FantasyTavernNameGenerator() {
  const [category, setCategory] = useState('cozy');
  const [tavern, setTavern] = useState(null);

  const generateTavern = () => {
    const data = tavernData[category];

    const name = data.names[Math.floor(Math.random() * data.names.length)];
    const drink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
    const innkeeper = data.innkeepers[Math.floor(Math.random() * data.innkeepers.length)];
    const rumour = data.rumours[Math.floor(Math.random() * data.rumours.length)];

    setTavern({
      name,
      drink,
      innkeeper,
      rumour,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Tavern Atmosphere
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'cozy', label: 'Cozy' },
              { value: 'rowdy', label: 'Rowdy' },
              { value: 'mysterious', label: 'Mysterious' },
              { value: 'elegant', label: 'Elegant' },
              { value: 'cursed', label: 'Cursed' },
            ]}
          />
        </div>

        <Button onClick={generateTavern} className="bg-accent text-white w-full">
          Generate Tavern
        </Button>
      </div>

      {tavern && (
        <div className="bg-amber-900 text-white border border-amber-800 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="font-heading text-4xl font-bold">{tavern.name}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Specialty Drink</p>
            <p className="text-lg font-medium">{tavern.drink}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Innkeeper</p>
              <p className="text-lg font-medium">{tavern.innkeeper}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Local Rumour</p>
              <p className="text-lg font-medium">{tavern.rumour}</p>
            </div>
          </div>

          <Button onClick={generateTavern} variant="secondary" className="bg-white text-amber-900 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
