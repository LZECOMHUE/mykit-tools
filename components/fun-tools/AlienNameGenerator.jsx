'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const alienData = {
  warrior: {
    names: ['Zyx\'thal', 'Kra\'vor', 'Throm\'dex', 'Val\'karn', 'Skarrax'],
    species: ['The Vortari', 'The Krell Dominion', 'The Zythian Collective', 'The Skorvian Empire', 'The Vendral Horde'],
    homeworlds: ['Nebula Prime', 'Kragos Seven', 'The Scorched Void', 'Titan\'s Crucible', 'War Moon Alpha'],
    tech: ['Plasma blade technology', 'Phase-shift propulsion', 'Molecular cannon systems', 'Energy shield matrices', 'Quantum teleportation'],
    greetings: ['Greetings, fellow warrior', 'May your battles be glorious', 'Honor through combat', 'Strength defines us', 'Victory or death awaits'],
  },
  scientist: {
    names: ['Zyx\'la', 'Mri\'tosh', 'Kelix\'vor', 'Sendra\'nim', 'Taal\'vex'],
    species: ['The Eggheads of Nexus', 'The Cerebral Caste', 'The Knowledge Keepers', 'The Ascended Minds', 'The Quantum Scholars'],
    homeworlds: ['Knowledge Nexus', 'Singularity Station', 'The Archive Sphere', 'Research Prime', 'Enlightenment Core'],
    tech: ['Quantum computing cores', 'Dimensional analysis devices', 'Genetic manipulation systems', 'Nano-technology synthesis', 'Artificial intelligence hosts'],
    greetings: ['Fascinating specimen', 'What knowledge do you possess', 'Interesting hypothesis', 'Shall we conduct experiments', 'Knowledge is eternal'],
  },
  diplomat: {
    names: ['Syx\'mara', 'Krell\'anda', 'Vel\'tarian', 'Astra\'vim', 'Lyr\'dona'],
    species: ['The Harmonious Alliance', 'The Peaceful Collective', 'The Council of Stars', 'The Bridge Builders', 'The Unified Worlds'],
    homeworlds: ['Harmony Station', 'Peace Central', 'Council Circle', 'The Neutral Zone', 'Unity Prime'],
    tech: ['Universal translation matrices', 'Empathy amplification fields', 'Temporal peace networks', 'Consensus decision engines', 'Universal aid technology'],
    greetings: ['Greetings in friendship', 'Let us seek understanding', 'Peace through communication', 'We come bearing gifts', 'Unity in diversity'],
  },
  'hive-mind': {
    names: ['Collective Zyx', 'The Unified We', 'Hive Consciousness Prime', 'The Connected Many', 'Distributed Entity'],
    species: ['The Borg-like Collective', 'The Hive Concordance', 'The United Consciousness', 'The Merged Intelligence', 'The Collective Organism'],
    homeworlds: ['The Hive Nexus', 'Connected Space Station', 'The Unified Realm', 'The Synchronized Sphere', 'Collective Home'],
    tech: ['Neural link networks', 'Shared consciousness tech', 'Assimilation systems', 'Unified will propulsion', 'Networked defense matrices'],
    greetings: ['We are many becoming one', 'Join the collective', 'Your knowledge will be shared', 'Assimilation is inevitable', 'We speak as one'],
  },
  shapeshifter: {
    names: ['Morph\'vor', 'Shif\'tara', 'Flux\'eon', 'Chamel\'thex', 'Adapt\'nimis'],
    species: ['The Adaptors', 'The Changeling Race', 'The Polymorphs', 'The Shifter Collective', 'The Reality Shapers'],
    homeworlds: ['Flux World', 'The Ever-Changing Realm', 'Morph Prime', 'The Shifting Dimension', 'Adaptation Central'],
    tech: ['Genetic restructuring', 'Matter state manipulation', 'Form-lock technology', 'Bio-mimetic systems', 'Reality warping tech'],
    greetings: ['We are whatever you need', 'Form means nothing to us', 'We adapt, we survive', 'Become one with us', 'Shapeshifting transcends all'],
  },
};

export default function AlienNameGenerator() {
  const [category, setCategory] = useState('warrior');
  const [alien, setAlien] = useState(null);

  const generateAlien = () => {
    const data = alienData[category];

    const name = data.names[Math.floor(Math.random() * data.names.length)];
    const species = data.species[Math.floor(Math.random() * data.species.length)];
    const homeworld = data.homeworlds[Math.floor(Math.random() * data.homeworlds.length)];
    const technology = data.tech[Math.floor(Math.random() * data.tech.length)];
    const greeting = data.greetings[Math.floor(Math.random() * data.greetings.length)];

    setAlien({
      name,
      species,
      homeworld,
      technology,
      greeting,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Alien Species Type
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'warrior', label: 'Warrior' },
              { value: 'scientist', label: 'Scientist' },
              { value: 'diplomat', label: 'Diplomat' },
              { value: 'hive-mind', label: 'Hive-Mind' },
              { value: 'shapeshifter', label: 'Shapeshifter' },
            ]}
          />
        </div>

        <Button onClick={generateAlien} className="bg-accent text-white w-full">
          Generate Alien Character
        </Button>
      </div>

      {alien && (
        <div className="bg-cyan-700 text-white border border-cyan-600 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Alien Name</p>
            <p className="font-heading text-3xl font-bold">{alien.name}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Species</p>
            <p className="text-lg font-medium">{alien.species}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Homeworld</p>
              <p className="text-lg font-medium">{alien.homeworld}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Technology Specialty</p>
              <p className="text-lg font-medium">{alien.technology}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Standard Greeting</p>
              <p className="text-lg font-medium italic">{alien.greeting}</p>
            </div>
          </div>

          <Button onClick={generateAlien} variant="secondary" className="bg-white text-cyan-700 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
