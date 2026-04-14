'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'aristocratic', label: 'Aristocratic', icon: '🏰' },
  { value: 'feral', label: 'Feral', icon: '🐺' },
  { value: 'seductive', label: 'Seductive', icon: '🌹' },
  { value: 'ancient', label: 'Ancient', icon: '🏛️' },
  { value: 'shadow', label: 'Shadow', icon: '🌑' },
  { value: 'psychic', label: 'Psychic', icon: '🔮' },
];

const vampireData = {
  aristocratic: {
    titles: ['Count', 'Countess', 'Duke', 'Duchess', 'Prince', 'Baron', 'Marquess'],
    firstNames: ['Vladislav', 'Demetrius', 'Selene', 'Aurelius', 'Isabeau', 'Lucian', 'Anastasia'],
    surnames: ['Nightblood', 'Darkholm', 'Bloodstone', 'Evermore', 'Mortem', 'Ravencroft', 'Von Carstein'],
    eras: ['The Ancient One', 'Victorian Elite', 'Baroque Nobility', 'Renaissance Crown', 'Medieval Dynasty', 'Gilded Age'],
    powers: ['Shadow Manipulation', 'Blood Control', 'Telepathy', 'Mind Domination', 'Eternal Youth', 'Hypnotic Gaze'],
  },
  feral: {
    titles: ['Beast Lord', 'Fang Leader', 'Hunt Master', 'Alpha', 'Bloodborn', 'Savage'],
    firstNames: ['Snareth', 'Razek', 'Morghul', 'Vex', 'Skarath', 'Gnarl', 'Thrak'],
    surnames: ['Ravenfang', 'Bonecrusher', 'Bloodmaw', 'Wildstrike', 'Primal', 'Ironjaw', 'Thornback'],
    eras: ['Ancient Hunter', 'Feral Kin', 'Wild Era', 'Dark Savage', 'Blood Moon', 'Primal Age'],
    powers: ['Superhuman Strength', 'Frenzy Rage', 'Beast Form', 'Heightened Senses', 'Pack Bond', 'Regeneration'],
  },
  seductive: {
    titles: ['Siren', 'Enchantress', 'The Temptress', 'Desire Master', 'Vamp', 'Muse', 'The Beguiling'],
    firstNames: ['Liliana', 'Scarlett', 'Valerie', 'Cassandra', 'Evangeline', 'Desiree', 'Vivienne'],
    surnames: ['Moonwhisper', 'Velvetthorne', 'Silk', 'Lureborn', 'Heartbreaker', 'Nightrose', 'Allure'],
    eras: ['Jazz Age', 'Gilded Era', 'Belle Epoque', 'Roaring Nights', 'Velvet Century', 'Art Deco Age'],
    powers: ['Charm Mastery', 'Hypnotic Gaze', 'Emotional Manipulation', 'Desire Projection', 'Siren Song', 'Dream Walking'],
  },
  ancient: {
    titles: ['Primordial', 'The Eternal', 'Founder', 'Original', 'The Awakened', 'Elder'],
    firstNames: ['Amenhotep', 'Ashkahar', 'Mahskaara', 'Theron', 'Kalamdor', 'Zuriel', 'Elyon'],
    surnames: ['Firstborn', 'Ancientblood', 'Eternal', 'Primrose', 'Ageless', 'Timeless', 'Undying'],
    eras: ['Egyptian Dynasty', 'Mesopotamian Era', 'Roman Empire', 'Dark Antiquity', 'Genesis Age', 'Before Memory'],
    powers: ['Ancient Magic', 'Immortal Wisdom', 'Reality Bending', 'Death Command', 'Time Sight', 'Blood Prophecy'],
  },
  shadow: {
    titles: ['Shade', 'The Phantom', 'Void Stalker', 'Shadow Knight', 'Wraith', 'Umbra'],
    firstNames: ['Noctus', 'Umbrian', 'Solace', 'Eclipse', 'Obsidian', 'Vesper', 'Onyx'],
    surnames: ['Shadowveil', 'Darkbane', 'Stormborn', 'Twilight', 'Void', 'Nightcloak', 'Duskwalker'],
    eras: ['Twilight Age', 'Midnight Era', 'Shadow Realm', 'Dark Covenant', 'Void Ascension', 'Eclipse Period'],
    powers: ['Shadow Stepping', 'Darkness Control', 'Phase Shifting', 'Invisibility', 'Aura Draining', 'Void Summoning'],
  },
  psychic: {
    titles: ['The Seer', 'Mind Sovereign', 'Thought Weaver', 'The Oracle', 'Psi Lord', 'The Telepath'],
    firstNames: ['Cerebus', 'Mentara', 'Psynth', 'Cognita', 'Precia', 'Mindel', 'Vestra'],
    surnames: ['Thoughtbane', 'Mindfire', 'Dreamwalk', 'Psion', 'Brainweave', 'Soulpiercer', 'Visionborn'],
    eras: ['Age of Awakening', 'Psychic Dawn', 'The Mindscape Era', 'Astral Period', 'Convergence Age', 'Third Eye Epoch'],
    powers: ['Telekinesis', 'Mind Reading', 'Astral Projection', 'Psychic Scream', 'Memory Erasure', 'Future Sight'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function VampireNameGenerator() {
  const [type, setType] = useState('aristocratic');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = vampireData[type];
    setResult({
      title: pick(data.titles),
      firstName: pick(data.firstNames),
      surname: pick(data.surnames),
      era: pick(data.eras),
      power: pick(data.powers),
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
        {result ? 'Generate Another' : 'Generate Vampire Name'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="text-gray-400 text-sm">{result.title}</p>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.firstName} {result.surname}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Era</p>
              <p className="font-medium text-sm text-text-primary">{result.era}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Unique Power</p>
              <p className="font-medium text-sm text-text-primary">{result.power}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
