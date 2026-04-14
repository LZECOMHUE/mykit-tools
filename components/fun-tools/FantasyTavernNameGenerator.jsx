'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'cozy', label: 'Cozy', icon: '🏠' },
  { value: 'rowdy', label: 'Rowdy', icon: '🍺' },
  { value: 'mysterious', label: 'Mysterious', icon: '🌙' },
  { value: 'elegant', label: 'Elegant', icon: '👑' },
  { value: 'cursed', label: 'Cursed', icon: '💀' },
  { value: 'pirate', label: 'Pirate', icon: '🏴‍☠️' },
];

const tavernData = {
  cozy: {
    names: ["The Rusty Dragon", "The Hearth House", "The Wanderer's Rest", "The Cozy Crown", "The Traveller's Home", "The Warm Kettle", "The Shepherd's Nook"],
    drinks: ["Dragon's Breath Ale", 'Honeyed Mead', 'Spiced Mulled Wine', 'Comfort Cider', 'Warm Tavern Blend', 'Fireside Porter', 'Buttered Rum Toddy'],
    innkeepers: ['Old Grimsby the One-Eyed', 'Friendly Maggie Thornwell', 'Kindly Tobias Warmhearth', 'Grandmother Elspeth', 'Jolly Marcus Goldleaf', 'Big-Hearted Berta'],
    rumours: ['A lost treasure map is hidden in the cellar', 'A mysterious bard visits every full moon', "The innkeeper knows everyone's secrets", 'Strange glowing lights appear at midnight', 'Every meal brings good fortune', 'The fireplace never goes out - even without wood'],
  },
  rowdy: {
    names: ["The Boar's Tusks", 'The Breakbone Tavern', 'The Thundering Hall', 'The Wild Beast', 'The Hellfire Inn', "The Brawler's Barrel", "The Shattered Shield"],
    drinks: ['Orc Crushbrew', "Warrior's Fury Mead", "Brawler's Black Ale", 'Dragon Slayer Whiskey', "Blacksmith's Hammer", 'Troll Sweat Stout', 'Dwarven Fire Shot'],
    innkeepers: ['Brutal Barrick the Scarred', 'Fierce Fiona Bloodfist', "Axeman's Axel", 'Crusher McGraw', 'Red-faced Rodney', 'Ironjaw Pete'],
    rumours: ['The strongest fighter gets free drinks', 'Someone once defeated three giants here', 'Arm wrestling contests happen nightly', 'The tavern has survived three wars intact', 'Lost treasures are buried nearby', 'The floorboards hide a fighting pit'],
  },
  mysterious: {
    names: ['The Shadowed Wyvern', 'The Silent Serpent', "The Whisper's Rest", 'The Veiled Mirror', 'The Midnight Crossing', "The Raven's Riddle", 'The Shrouded Lantern'],
    drinks: ['Moonshade Elixir', "Phantom's Shadow Wine", 'Whispernight Liquor', 'Veil of Secrets Potion', 'Darkwood Brew', 'Starless Night Absinthe', 'Memory Mist Tonic'],
    innkeepers: ['The Mysterious Keeper', 'Silvia Nightshade', 'The Cloaked One', 'Keeper of Secrets', 'The Enigma', 'Madam Whisper'],
    rumours: ['A secret passage leads to forgotten temples', 'The innkeeper is not what they seem', 'Ghosts walk these halls after midnight', 'A prophecy was fulfilled here once', 'Dark magic protects this place', 'The mirrors show a different room'],
  },
  elegant: {
    names: ['The Golden Goblet', "The Noble's Paradise", 'The Starlight Salon', 'The Velvet Crown', 'The Crystal Hall', "The Gilded Harp", "The Sapphire Chalice"],
    drinks: ['Aged Golden Wine', "Noble's Reserve Brandy", 'Starlight Champagne', 'Royal Velvet Mead', 'Crystal Pure Spirits', "Emperor's Ambrosia", 'Rose Petal Cordial'],
    innkeepers: ['Lord Ashworth the Refined', 'Lady Victoria Goldenseal', 'Master of Ceremonies Eduard', 'Baroness Silverwind', 'Duke Fairchild', 'Countess Aurelie'],
    rumours: ['Nobility from across the realm dines here', 'A love story began in these halls', 'Priceless art hangs on every wall', 'Royal decrees are made here', 'The finest wines in existence are stored below', 'A secret royal court meets at midnight'],
  },
  cursed: {
    names: ["The Hanged Man's Hut", 'The Plague Bearer', 'The Cursed Crown', 'The Doomed Soul', "The Sorrow's Nest", "The Bleeding Door", "The Wailing Flask"],
    drinks: ['Cursed Bloodwine', "Doom's Elixir", "Sorrow's Draught", 'Hex Honey Mead', 'Damnation Dark Ale', 'Wormwood Tears', "Reaper's Reserve"],
    innkeepers: ['The Cursed Keeper', 'Damned Darius Blackwell', 'The Wretched One', "Sorrow's Eternal Keeper", 'The Doomed Innkeeper', 'Hollow-Eyed Hester'],
    rumours: ['A terrible curse haunts these walls', 'No one who drinks here escapes unharmed', 'A dark ritual was performed here', 'The innkeeper sold their soul long ago', 'Disaster follows those who stay the night', 'The building is older than the town itself'],
  },
  pirate: {
    names: ["The Salty Dog", "The Anchor's End", "The Barnacle Barrel", "The Kraken's Maw", "The Captain's Quarters", "The Drunken Mermaid", "The Stormwreck"],
    drinks: ['Kraken Ink Rum', "Captain's Dark Reserve", 'Salted Grog', "Mermaid's Kiss", 'Cannonball Porter', 'Treasure Chest Punch', 'Bilgewater Bitter'],
    innkeepers: ['One-Leg Lenny', 'Barnacle Betty', 'Captain Retired Rourke', 'Salty Sal the Smuggler', 'Pegboard Pete', 'Madam Anchor'],
    rumours: ['A treasure map is carved into a table', 'The rum is smuggled from a ghost ship', 'A sea monster surfaces in the harbour weekly', 'Half the patrons are wanted by the Crown', 'The cellar connects to smuggler tunnels', 'A kraken lives beneath the dock'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FantasyTavernNameGenerator() {
  const [type, setType] = useState('cozy');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = tavernData[type];
    setResult({
      name: pick(data.names),
      drink: pick(data.drinks),
      innkeeper: pick(data.innkeepers),
      rumour: pick(data.rumours),
    });
  }, [type]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c.value} onClick={() => { setType(c.value); setResult(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === c.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}>{c.icon} {c.label}</button>
        ))}
      </div>

      <button onClick={generate} className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors">
        {result ? 'Generate Another' : 'Generate Tavern'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Specialty Drink</p>
              <p className="font-medium text-sm text-text-primary">{result.drink}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Innkeeper</p>
              <p className="font-medium text-sm text-text-primary">{result.innkeeper}</p>
            </div>
            <div className="bg-white px-4 py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Local Rumour</p>
              <p className="font-medium text-sm text-text-primary italic">"{result.rumour}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
