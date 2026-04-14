'use client';

import { useState, useCallback } from 'react';

const superheroData = {
  cosmic: {
    heroNames: ['Quantum Strike', 'Stellar Sentinel', 'Cosmic Blaze', 'Nebula Guard', 'Void Champion', 'Nova Flux', 'Pulsar Knight', 'Galactic Warden', 'Starborn', 'Comet Fury'],
    alterEgos: ['Dr. Sarah Chen', 'Captain Marcus Webb', 'Dr. Elena Volkov', 'James Starfire', 'Dr. Zara Okonkwo', 'Professor Liam Reyes', 'Ava Solaris', 'Colonel Nadia Orlov'],
    origins: ['Cosmic radiation exposure', 'Alien artifact contact', 'Supernova proximity', 'Meteor impact', 'Wormhole accident', 'Deep space rescue gone wrong', 'Experimental FTL drive failure'],
    powers: ['Energy projection', 'Faster than light flight', 'Force field creation', 'Cosmic sight', 'Matter restructuring', 'Gravity manipulation', 'Star energy absorption'],
    weaknesses: ['Specific mineral allergy', 'Certain frequencies', 'Magic interference', 'Earth gravity limitation', 'Energy depletion', 'Solar eclipses'],
  },
  'street-level': {
    heroNames: ['Shadow Fist', 'The Vigilante', 'Night Guard', 'Street Strike', 'Urban Phantom', 'The Reckoner', 'Iron Will', 'The Watcher', 'Nightfall', 'Black Viper'],
    alterEgos: ['Marcus Rivera', 'Alex Thompson', 'Kate Wellington', 'Sam Morgan', 'Chris Andrews', 'Jordan Blake', 'Detective Mia Torres', 'Dr. Daniel Hart'],
    origins: ['Martial arts mastery', 'Detective training', 'Military background', 'Street justice calling', 'Personal tragedy', 'Witness protection gone rogue', 'Failed by the system'],
    powers: ['Expert combat', 'Peak human strength', 'Investigation skills', 'Gadget mastery', 'Tactical analysis', 'Interrogation expertise', 'Stealth mastery'],
    weaknesses: ['No super powers', 'Tech dependency', 'Emotional connections', 'Limited resources', 'Human limits', 'Old injuries', 'Trust issues'],
  },
  mystical: {
    heroNames: ['Arcane Protector', 'The Mystic', 'Spellward', 'Enchantress Guardian', 'Rune Keeper', 'Hex Sentinel', 'The Oracle', 'Shadow Mage', 'Grimoire', 'Moonbane'],
    alterEgos: ['Miranda Ashford', 'Dr. Adrian Cole', 'Sophia Nightbrook', 'Theron Blackwell', 'Elena Starweaver', 'Professor Lysander Greyholm', 'Sister Katarina Voss'],
    origins: ['Ancient grimoire discovery', 'Magical bloodline awakening', 'Mystical artifact bonding', 'Spell accident transcendence', 'Interdimensional contact', 'Cursed by a dying sorcerer'],
    powers: ['Spell casting', 'Reality bending', 'Protective wards', 'Mystic sight', 'Dimensional travel', 'Soul reading', 'Time glimpse'],
    weaknesses: ['Iron interference', 'Ritual interruption', 'Mana depletion', 'Binding circles', 'Holy symbols', 'Spoken true name'],
  },
  tech: {
    heroNames: ['Irontech', 'Cyber Guardian', 'The Engineer', 'Tech Sentinel', 'Silicon Savior', 'Mainframe', 'Overclock', 'Neon Edge', 'Proxy', 'Circuit Breaker'],
    alterEgos: ['Dr. James Park', 'Natasha Kozlov', 'Devon Nakamura', 'Raj Patel', 'Sophie Leclerc', 'Aiden Zhao', 'Dr. Freya Lindstrom'],
    origins: ['Advanced AI creation', 'Neural implant fusion', 'Nanotechnology infusion', 'Tech suit construction', 'Brain computer interface', 'Corporate lab accident', 'Stolen military prototype'],
    powers: ['Superhuman armor', 'Gadget creation', 'Hacking mastery', 'Weapon systems', 'AI assistance', 'Drone swarm control', 'Holographic decoys'],
    weaknesses: ['EMP pulses', 'Power source loss', 'Overheating', 'Software viruses', 'Extreme temperatures', 'Quantum interference'],
  },
  elemental: {
    heroNames: ['Inferno King', 'Storm Bearer', 'Earth Guardian', 'Aqua Sentinel', 'Wind Dancer', 'Frost Monarch', 'Tremor', 'Typhoon', 'Cinderstorm', 'Rootwarden'],
    alterEgos: ['Dylan Cortez', 'Phoenix Wong', 'Kai Moana', 'Terra Jackson', 'Zephyr Storm', 'Marina Delacroix', 'Ash Thornton'],
    origins: ['Elemental attunement', 'Natural disaster survival', 'Elemental spirit bonding', 'Mutation exposure', 'Balance restoration call', 'Ancient temple ritual', 'Climate catastrophe survivor'],
    powers: ['Element control', 'Transformation', 'Environmental sensing', 'Healing', 'Amplification', 'Weather manipulation', 'Elemental constructs'],
    weaknesses: ['Opposing elements', 'Energy exhaustion', 'Emotional instability', 'Environmental dependency', 'Natural disasters', 'Polluted environments'],
  },
};

const categories = [
  { value: 'cosmic', label: 'Cosmic', icon: '🌟' },
  { value: 'street-level', label: 'Street-Level', icon: '🌃' },
  { value: 'mystical', label: 'Mystical', icon: '🔮' },
  { value: 'tech', label: 'Tech', icon: '🤖' },
  { value: 'elemental', label: 'Elemental', icon: '🌊' },
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SuperheroAlterEgoGenerator() {
  const [category, setCategory] = useState('cosmic');
  const [hero, setHero] = useState(null);

  const generate = useCallback(() => {
    const data = superheroData[category];
    setHero({
      heroName: pick(data.heroNames),
      alterEgo: pick(data.alterEgos),
      origin: pick(data.origins),
      power: pick(data.powers),
      weakness: pick(data.weaknesses),
    });
  }, [category]);

  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => { setCategory(c.value); setHero(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === c.value
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
      >
        {hero ? 'Generate Another' : 'Generate Superhero'}
      </button>

      {/* Result */}
      {hero && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Hero name - big and bold */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Hero Name</p>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{hero.heroName}</p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Alter Ego</p>
              <p className="font-medium text-sm text-text-primary">{hero.alterEgo}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Origin</p>
              <p className="font-medium text-sm text-text-primary">{hero.origin}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Primary Power</p>
              <p className="font-medium text-sm text-accent">{hero.power}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Weakness</p>
              <p className="font-medium text-sm text-red-600">{hero.weakness}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
