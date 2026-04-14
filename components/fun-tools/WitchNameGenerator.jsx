'use client';

import { useState, useCallback } from 'react';

const witchData = {
  'hedge-witch': {
    titles: ['Herbalist', 'Wise Woman', 'Garden Keeper', 'Hearth Witch', 'Green Sage'],
    firstNames: ['Hazel', 'Rosemary', 'Sage', 'Willow', 'Iris', 'Fern', 'Juniper', 'Briar'],
    surnames: ['Threadbare', 'Dustwillow', 'Greenfinger', 'Moonwhisper', 'Bonebrush', 'Thornwick', 'Ashvale'],
    covens: ['The Cottage Circle', 'Wildroot Coven', 'Hedgerow Haven', 'Kitchen Hearth', 'Forest Keepers'],
    specialties: ['Herbology', 'Kitchen Magic', 'Garden Spellwork', 'Healing Brews', 'Plant Lore'],
  },
  'dark-witch': {
    titles: ['Shadowcaster', 'Curse Weaver', 'Dark Priestess', 'Spell Binder', 'Void Keeper'],
    firstNames: ['Morgana', 'Isabelle', 'Ravenna', 'Sable', 'Hecate', 'Vesper', 'Nyx', 'Belladonna'],
    surnames: ['Blackthorn', 'Nightbane', 'Sorrowborn', 'Veilwalker', 'Doomweaver', 'Gravemist', 'Ashblood'],
    covens: ['The Shadow Circle', 'Obsidian Coven', 'Dark Moon Sisterhood', 'Curse Keepers', 'Void Walkers'],
    specialties: ['Curses', 'Dark Binding', 'Soul Magic', 'Shadow Work', 'Hex Craft'],
  },
  'sea-witch': {
    titles: ['Tide Caller', 'Wave Keeper', 'Ocean Priestess', 'Salt Sage', 'Siren'],
    firstNames: ['Marina', 'Coral', 'Pearl', 'Nixie', 'Undine', 'Nerida', 'Selkie', 'Tempest'],
    surnames: ['Wavecrest', 'Saltborne', 'Deepwhisper', 'Tidalveil', 'Seaborn', 'Stormtide', 'Reefsong'],
    covens: ['The Tidal Circle', 'Coral Coven', "Ocean's Breath", 'Wave Dancers', 'Salt Sisters'],
    specialties: ['Water Magic', 'Tide Control', 'Ocean Healing', 'Siren Lore', 'Storm Weaving'],
  },
  'kitchen-witch': {
    titles: ['Hearth Keeper', 'Cook Sage', 'Feast Weaver', 'Comfort Caster', 'Home Guardian'],
    firstNames: ['Lily', 'Clover', 'Honey', 'Ginger', 'Thyme', 'Cinnamon', 'Maple', 'Saffron'],
    surnames: ['Bakestone', 'Honeyhearth', 'Spicebind', 'Warmth', 'Comfrey', 'Kettlebrew', 'Sugarlock'],
    covens: ['The Kitchen Circle', 'Hearth Coven', 'Comfort Keepers', 'Feast Dancers', 'Honey Sisters'],
    specialties: ['Cooking Magic', 'Food Spellwork', 'Comfort Crafting', 'Nourishment', 'Home Blessing'],
  },
  'celestial-witch': {
    titles: ['Star Sage', 'Moon Priestess', 'Cosmic Weaver', 'Zodiac Keeper', 'Starlight Caster'],
    firstNames: ['Luna', 'Aurora', 'Stella', 'Celeste', 'Nova', 'Lyra', 'Soleil', 'Astrid'],
    surnames: ['Starweaver', 'Moonwhisper', 'Cosmicborn', 'Eclipseveil', 'Astrallight', 'Dawnfire', 'Nebulae'],
    covens: ['The Starlight Circle', 'Lunar Coven', 'Cosmic Sisters', 'Zodiac Dancers', 'Celestial Keepers'],
    specialties: ['Astrology', 'Moon Magic', 'Planetary Work', 'Star Divination', 'Cosmic Healing'],
  },
};

const types = [
  { value: 'hedge-witch', label: 'Hedge', icon: '🌿' },
  { value: 'dark-witch', label: 'Dark', icon: '🖤' },
  { value: 'sea-witch', label: 'Sea', icon: '🌊' },
  { value: 'kitchen-witch', label: 'Kitchen', icon: '🍯' },
  { value: 'celestial-witch', label: 'Celestial', icon: '✨' },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function WitchNameGenerator() {
  const [type, setType] = useState('hedge-witch');
  const [witch, setWitch] = useState(null);

  const generate = useCallback(() => {
    const data = witchData[type];
    setWitch({
      title: pick(data.titles),
      firstName: pick(data.firstNames),
      surname: pick(data.surnames),
      coven: pick(data.covens),
      specialty: pick(data.specialties),
    });
  }, [type]);

  return (
    <div className="space-y-4">
      {/* Type pills */}
      <div className="flex flex-wrap gap-1.5">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => { setType(t.value); setWitch(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === t.value
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
      >
        {witch ? 'Generate Another' : 'Generate Witch Name'}
      </button>

      {witch && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Name - big and bold */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{witch.title}</p>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">
              {witch.firstName} {witch.surname}
            </p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Coven</p>
              <p className="font-medium text-sm text-text-primary">{witch.coven}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Specialty</p>
              <p className="font-medium text-sm text-accent">{witch.specialty}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
