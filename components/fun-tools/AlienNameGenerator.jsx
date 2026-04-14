'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'warrior', label: 'Warrior', icon: '⚔️' },
  { value: 'scientist', label: 'Scientist', icon: '🔬' },
  { value: 'diplomat', label: 'Diplomat', icon: '🕊️' },
  { value: 'hive-mind', label: 'Hive-Mind', icon: '🧠' },
  { value: 'shapeshifter', label: 'Shapeshifter', icon: '🦎' },
  { value: 'explorer', label: 'Explorer', icon: '🚀' },
];

const alienData = {
  warrior: {
    names: ["Zyx'thal", "Kra'vor", "Throm'dex", "Val'karn", "Skarrax", "Drak'moth", "Gor'venn", "Xal'thar"],
    species: ['The Vortari', 'The Krell Dominion', 'The Zythian Collective', 'The Skorvian Empire', 'The Vendral Horde', 'The Ironclaw Legion'],
    homeworlds: ['Nebula Prime', 'Kragos Seven', 'The Scorched Void', "Titan's Crucible", 'War Moon Alpha', 'Blood Nebula Station'],
    tech: ['Plasma blade technology', 'Phase-shift propulsion', 'Molecular cannon systems', 'Energy shield matrices', 'Quantum teleportation', 'Gravity pulse weapons'],
    greetings: ['Greetings, fellow warrior', 'May your battles be glorious', 'Honor through combat', 'Strength defines us', 'Victory or death awaits', 'Steel sharpens steel'],
  },
  scientist: {
    names: ["Zyx'la", "Mri'tosh", "Kelix'vor", "Sendra'nim", "Taal'vex", "Quor'nim", "Pex'lith"],
    species: ['The Eggheads of Nexus', 'The Cerebral Caste', 'The Knowledge Keepers', 'The Ascended Minds', 'The Quantum Scholars', 'The Data Swarm'],
    homeworlds: ['Knowledge Nexus', 'Singularity Station', 'The Archive Sphere', 'Research Prime', 'Enlightenment Core', 'Library Dimension Beta'],
    tech: ['Quantum computing cores', 'Dimensional analysis devices', 'Genetic manipulation systems', 'Nano-technology synthesis', 'Artificial intelligence hosts', 'Temporal research arrays'],
    greetings: ['Fascinating specimen', 'What knowledge do you possess', 'Interesting hypothesis', 'Shall we conduct experiments', 'Knowledge is eternal', 'Your biology intrigues us'],
  },
  diplomat: {
    names: ["Syx'mara", "Krell'anda", "Vel'tarian", "Astra'vim", "Lyr'dona", "Pax'vera", "Elu'thane"],
    species: ['The Harmonious Alliance', 'The Peaceful Collective', 'The Council of Stars', 'The Bridge Builders', 'The Unified Worlds', 'The Accord Speakers'],
    homeworlds: ['Harmony Station', 'Peace Central', 'Council Circle', 'The Neutral Zone', 'Unity Prime', 'Embassy World Theta'],
    tech: ['Universal translation matrices', 'Empathy amplification fields', 'Temporal peace networks', 'Consensus decision engines', 'Universal aid technology', 'Cultural harmony beacons'],
    greetings: ['Greetings in friendship', 'Let us seek understanding', 'Peace through communication', 'We come bearing gifts', 'Unity in diversity', 'May our words build bridges'],
  },
  'hive-mind': {
    names: ['Collective Zyx', 'The Unified We', 'Hive Consciousness Prime', 'The Connected Many', 'Distributed Entity', 'Overmind Kael', 'The Chorus'],
    species: ['The Borg-like Collective', 'The Hive Concordance', 'The United Consciousness', 'The Merged Intelligence', 'The Collective Organism', 'The Neural Bloom'],
    homeworlds: ['The Hive Nexus', 'Connected Space Station', 'The Unified Realm', 'The Synchronized Sphere', 'Collective Home', 'Node World Prime'],
    tech: ['Neural link networks', 'Shared consciousness tech', 'Assimilation systems', 'Unified will propulsion', 'Networked defense matrices', 'Thought-speed communication'],
    greetings: ['We are many becoming one', 'Join the collective', 'Your knowledge will be shared', 'Assimilation is inevitable', 'We speak as one', 'Resistance is... discouraged'],
  },
  shapeshifter: {
    names: ["Morph'vor", "Shif'tara", "Flux'eon", "Chamel'thex", "Adapt'nimis", "Mir'age", "Proto'flux"],
    species: ['The Adaptors', 'The Changeling Race', 'The Polymorphs', 'The Shifter Collective', 'The Reality Shapers', 'The Formless Ones'],
    homeworlds: ['Flux World', 'The Ever-Changing Realm', 'Morph Prime', 'The Shifting Dimension', 'Adaptation Central', 'Liquid Surface Nine'],
    tech: ['Genetic restructuring', 'Matter state manipulation', 'Form-lock technology', 'Bio-mimetic systems', 'Reality warping tech', 'Cellular reprogramming'],
    greetings: ['We are whatever you need', 'Form means nothing to us', 'We adapt, we survive', 'Become one with us', 'Shapeshifting transcends all', 'You cannot trust your eyes'],
  },
  explorer: {
    names: ["Voy'ax", "Trel'dara", "Nav'ithos", "Seek'rin", "Ori'pex", "Xan'drift", "Far'lume"],
    species: ['The Pathfinders', 'The Starbound', 'The Cartographers Guild', 'The Frontier Seekers', 'The Void Walkers', 'The Discovery Enclave'],
    homeworlds: ['Waypoint Zero', 'The Drifting Archive', 'Compass Nebula', 'Frontier Station Omega', 'The Wandering Moon', 'Deep Space Relay Zeta'],
    tech: ['Warp fold engines', 'Dimensional cartography', 'Universal habitat suits', 'First contact protocols', 'Deep space beacons', 'Chrono-navigation arrays'],
    greetings: ['We seek the unknown', 'New worlds await', 'Discovery is our purpose', 'The stars call to us', 'We chart the uncharted', 'Beyond the edge lies truth'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function AlienNameGenerator() {
  const [type, setType] = useState('warrior');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = alienData[type];
    setResult({
      name: pick(data.names),
      species: pick(data.species),
      homeworld: pick(data.homeworlds),
      technology: pick(data.tech),
      greeting: pick(data.greetings),
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
        {result ? 'Generate Another' : 'Generate Alien Character'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.name}</p>
            <p className="text-gray-400 text-sm mt-1">{result.species}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Homeworld</p>
              <p className="font-medium text-sm text-text-primary">{result.homeworld}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Technology</p>
              <p className="font-medium text-sm text-text-primary">{result.technology}</p>
            </div>
            <div className="bg-white px-4 py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Standard Greeting</p>
              <p className="font-medium text-sm text-text-primary italic">"{result.greeting}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
