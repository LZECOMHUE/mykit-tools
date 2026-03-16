'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const witchData = {
  'hedge-witch': {
    titles: ['Herbalist', 'Wise Woman', 'Garden Keeper', 'Hearth Witch', 'Green Sage'],
    firstNames: ['Hazel', 'Rosemary', 'Sage', 'Willow', 'Iris'],
    surnames: ['Threadbare', 'Dustwillow', 'Greenfinger', 'Moonwhisper', 'Bonebrush'],
    covens: ['The Cottage Circle', 'Wildroot Coven', 'Hedgerow Haven', 'Kitchen Hearth', 'Forest Keepers'],
    specialties: ['Herbology', 'Kitchen Magic', 'Garden Spellwork', 'Healing Brews', 'Plant Lore'],
  },
  'dark-witch': {
    titles: ['Shadowcaster', 'Curse Weaver', 'Dark Priestess', 'Spell Binder', 'Void Keeper'],
    firstNames: ['Morgana', 'Isabelle', 'Ravenna', 'Sable', 'Hecate'],
    surnames: ['Blackthorn', 'Nightbane', 'Sorrowborn', 'Veilwalker', 'Doomweaver'],
    covens: ['The Shadow Circle', 'Obsidian Coven', 'Dark Moon Sisterhood', 'Curse Keepers', 'Void Walkers'],
    specialties: ['Curses', 'Dark Binding', 'Soul Magic', 'Shadow Work', 'Hex Craft'],
  },
  'sea-witch': {
    titles: ['Tide Caller', 'Wave Keeper', 'Ocean Priestess', 'Salt Sage', 'Siren'],
    firstNames: ['Marina', 'Coral', 'Pearl', 'Nixie', 'Undine'],
    surnames: ['Wavecrest', 'Saltborne', 'Deepwhisper', 'Tidalveil', 'Seaborn'],
    covens: ['The Tidal Circle', 'Coral Coven', 'Ocean\'s Breath', 'Wave Dancers', 'Salt Sisters'],
    specialties: ['Water Magic', 'Tide Control', 'Ocean Healing', 'Siren Lore', 'Storm Weaving'],
  },
  'kitchen-witch': {
    titles: ['Hearth Keeper', 'Cook Sage', 'Feast Weaver', 'Comfort Caster', 'Home Guardian'],
    firstNames: ['Lily', 'Clover', 'Honey', 'Ginger', 'Thyme'],
    surnames: ['Bakestone', 'Honeyhearth', 'Spicebind', 'Warmth', 'Comfrey'],
    covens: ['The Kitchen Circle', 'Hearth Coven', 'Comfort Keepers', 'Feast Dancers', 'Honey Sisters'],
    specialties: ['Cooking Magic', 'Food Spellwork', 'Comfort Crafting', 'Nourishment', 'Home Blessing'],
  },
  'celestial-witch': {
    titles: ['Star Sage', 'Moon Priestess', 'Cosmic Weaver', 'Zodiac Keeper', 'Starlight Caster'],
    firstNames: ['Luna', 'Aurora', 'Stella', 'Celeste', 'Nova'],
    surnames: ['Starweaver', 'Moonwhisper', 'Cosmicborn', 'Eclipseveil', 'Astrallight'],
    covens: ['The Starlight Circle', 'Lunar Coven', 'Cosmic Sisters', 'Zodiac Dancers', 'Celestial Keepers'],
    specialties: ['Astrology', 'Moon Magic', 'Planetary Work', 'Star Divination', 'Cosmic Healing'],
  },
};

export default function WitchNameGenerator() {
  const [category, setCategory] = useState('hedge-witch');
  const [witchName, setWitchName] = useState(null);

  const generateWitch = () => {
    const data = witchData[category];

    const title = data.titles[Math.floor(Math.random() * data.titles.length)];
    const firstName = data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
    const surname = data.surnames[Math.floor(Math.random() * data.surnames.length)];
    const coven = data.covens[Math.floor(Math.random() * data.covens.length)];
    const specialty = data.specialties[Math.floor(Math.random() * data.specialties.length)];

    setWitchName({
      title,
      firstName,
      surname,
      coven,
      specialty,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Witch Type
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'hedge-witch', label: 'Hedge Witch' },
              { value: 'dark-witch', label: 'Dark Witch' },
              { value: 'sea-witch', label: 'Sea Witch' },
              { value: 'kitchen-witch', label: 'Kitchen Witch' },
              { value: 'celestial-witch', label: 'Celestial Witch' },
            ]}
          />
        </div>

        <Button onClick={generateWitch} className="bg-accent text-white w-full">
          Generate Witch Name
        </Button>
      </div>

      {witchName && (
        <div className="bg-purple-900 text-white border border-purple-800 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Title</p>
            <p className="font-heading text-2xl font-bold">{witchName.title}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="font-heading text-4xl font-bold">
              {witchName.firstName} {witchName.surname}
            </p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Coven</p>
              <p className="text-lg font-medium">{witchName.coven}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Specialty</p>
              <p className="text-lg font-medium">{witchName.specialty}</p>
            </div>
          </div>

          <Button onClick={generateWitch} variant="secondary" className="bg-white text-purple-900 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
