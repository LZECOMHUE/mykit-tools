'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const superheroData = {
  cosmic: {
    heroNames: ['Quantum Strike', 'Stellar Sentinel', 'Cosmic Blaze', 'Nebula Guard', 'Void Champion'],
    alterEgos: ['Dr. Sarah Chen', 'Captain Marcus Webb', 'Dr. Elena Volkov', 'James Starfire', 'Dr. Zara Okonkwo'],
    origins: ['Cosmic radiation exposure', 'Alien artifact contact', 'Supernova proximity', 'Meteor impact', 'Wormhole accident'],
    powers: ['Energy projection', 'Faster than light flight', 'Force field creation', 'Cosmic sight', 'Matter restructuring'],
    weaknesses: ['Kryptonite analogues', 'Specific frequencies', 'Magic interference', 'Earth gravity limitation', 'Energy depletion'],
  },
  'street-level': {
    heroNames: ['Shadow Fist', 'The Vigilante', 'Night Guard', 'Street Strike', 'Urban Phantom'],
    alterEgos: ['Marcus Rivera', 'Alex Thompson', 'Kate Wellington', 'Sam Morgan', 'Chris Andrews'],
    origins: ['Martial arts mastery', 'Detective training', 'Military background', 'Street justice calling', 'Personal tragedy'],
    powers: ['Expert combat', 'Peak human strength', 'Investigation skills', 'Gadget mastery', 'Tactical analysis'],
    weaknesses: ['No super powers', 'Tech dependency', 'Emotional connections', 'Limited resources', 'Human limits'],
  },
  mystical: {
    heroNames: ['Arcane Protector', 'The Mystic', 'Spellward', 'Enchantress Guardian', 'Rune Keeper'],
    alterEgos: ['Miranda Ashford', 'Dr. Adrian Cole', 'Sophia Nightbrook', 'Theron Blackwell', 'Elena Starweaver'],
    origins: ['Ancient grimoire discovery', 'Magical bloodline awakening', 'Mystical artifact bonding', 'Spell accident transcendence', 'Interdimensional contact'],
    powers: ['Spell casting', 'Reality bending', 'Protective wards', 'Mystic sight', 'Dimensional travel'],
    weaknesses: ['Iron interference', 'Ritual interruption', 'Mana depletion', 'Binding circles', 'Holy symbols'],
  },
  tech: {
    heroNames: ['Irontech', 'Cyber Guardian', 'The Engineer', 'Tech Sentinel', 'Silicon Savior'],
    alterEgos: ['Dr. James Park', 'Natasha Kozlov', 'Devon Nakamura', 'Raj Patel', 'Sophie Leclerc'],
    origins: ['Advanced AI creation', 'Neural implant fusion', 'Nanotechnology infusion', 'Tech suit construction', 'Brain computer interface'],
    powers: ['Superhuman armor', 'Gadget creation', 'Hacking mastery', 'Weapon systems', 'AI assistance'],
    weaknesses: ['EMP pulses', 'Power source loss', 'Overheating', 'Software viruses', 'Extreme temperatures'],
  },
  elemental: {
    heroNames: ['Inferno King', 'Storm Bearer', 'Earth Guardian', 'Aqua Sentinel', 'Wind Dancer'],
    alterEgos: ['Dylan Cortez', 'Phoenix Wong', 'Kai Moana', 'Terra Jackson', 'Zephyr Storm'],
    origins: ['Elemental attunement', 'Natural disaster survival', 'Elemental spirit bonding', 'Mutation exposure', 'Balance restoration call'],
    powers: ['Element control', 'Transformation', 'Environmental sensing', 'Healing', 'Amplification'],
    weaknesses: ['Opposing elements', 'Energy exhaustion', 'Emotional instability', 'Environmental dependency', 'Natural disasters'],
  },
};

export default function SuperheroAlterEgoGenerator() {
  const [category, setCategory] = useState('cosmic');
  const [hero, setHero] = useState(null);

  const generateHero = () => {
    const data = superheroData[category];

    const heroName = data.heroNames[Math.floor(Math.random() * data.heroNames.length)];
    const alterEgo = data.alterEgos[Math.floor(Math.random() * data.alterEgos.length)];
    const origin = data.origins[Math.floor(Math.random() * data.origins.length)];
    const power = data.powers[Math.floor(Math.random() * data.powers.length)];
    const weakness = data.weaknesses[Math.floor(Math.random() * data.weaknesses.length)];

    setHero({
      heroName,
      alterEgo,
      origin,
      power,
      weakness,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Hero Type
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'cosmic', label: 'Cosmic' },
              { value: 'street-level', label: 'Street-Level' },
              { value: 'mystical', label: 'Mystical' },
              { value: 'tech', label: 'Tech' },
              { value: 'elemental', label: 'Elemental' },
            ]}
          />
        </div>

        <Button onClick={generateHero} className="bg-accent text-white w-full">
          Generate Superhero
        </Button>
      </div>

      {hero && (
        <div className="bg-blue-700 text-white border border-blue-600 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Hero Name</p>
            <p className="font-heading text-3xl font-bold">{hero.heroName}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-sm opacity-90 mb-2">Alter Ego</p>
            <p className="font-heading text-2xl font-bold">{hero.alterEgo}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Origin</p>
              <p className="text-lg font-medium">{hero.origin}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Primary Power</p>
              <p className="text-lg font-medium">{hero.power}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Weakness</p>
              <p className="text-lg font-medium">{hero.weakness}</p>
            </div>
          </div>

          <Button onClick={generateHero} variant="secondary" className="bg-white text-blue-700 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
