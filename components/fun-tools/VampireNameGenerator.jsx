'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const vampireData = {
  aristocratic: {
    titles: ['Count', 'Countess', 'Duke', 'Duchess', 'Prince'],
    firstNames: ['Vladislav', 'Demetrius', 'Selene', 'Aurelius', 'Isabeau'],
    surnames: ['Nightblood', 'Darkholm', 'Bloodstone', 'Evermore', 'Mortem'],
    eras: ['The Ancient One', 'Victorian Elite', 'Baroque Nobility', 'Renaissance Crown', 'Medieval Dynasty'],
    powers: ['Shadow Manipulation', 'Blood Control', 'Telepathy', 'Mind Domination', 'Eternal Youth'],
  },
  feral: {
    titles: ['Beast Lord', 'Fang Leader', 'Hunt Master', 'Alpha', 'Bloodborn'],
    firstNames: ['Snareth', 'Razek', 'Morghul', 'Vex', 'Skarath'],
    surnames: ['Ravenfang', 'Bonecrusher', 'Bloodmaw', 'Wildstrike', 'Primal'],
    eras: ['Ancient Hunter', 'Feral Kin', 'Wild Era', 'Dark Savage', 'Blood Moon'],
    powers: ['Superhuman Strength', 'Frenzy Rage', 'Beast Form', 'Heightened Senses', 'Pack Bond'],
  },
  seductive: {
    titles: ['Siren', 'Enchantress', 'The Temptress', 'Desire Master', 'Vamp'],
    firstNames: ['Liliana', 'Scarlett', 'Valerie', 'Cassandra', 'Evangeline'],
    surnames: ['Moonwhisper', 'Velvetthorne', 'Silk', 'Lureborn', 'Heartbreaker'],
    eras: ['Jazz Age', 'Gilded Era', 'Belle Epoque', 'Roaring Nights', 'Velvet Century'],
    powers: ['Charm Mastery', 'Hypnotic Gaze', 'Emotional Manipulation', 'Desire Projection', 'Siren Song'],
  },
  ancient: {
    titles: ['Primordial', 'The Eternal', 'Founder', 'Original', 'The Awakened'],
    firstNames: ['Amenhotep', 'Ashkahar', 'Mahskaara', 'Theron', 'Kalamdor'],
    surnames: ['Firstborn', 'Ancientblood', 'Eternal', 'Primrose', 'Ageless'],
    eras: ['Egyptian Dynasty', 'Mesopotamian Era', 'Roman Empire', 'Dark Antiquity', 'Genesis Age'],
    powers: ['Ancient Magic', 'Immortal Wisdom', 'Reality Bending', 'Death Command', 'Time Sight'],
  },
  shadow: {
    titles: ['Shade', 'The Phantom', 'Void Stalker', 'Shadow Knight', 'Wraith'],
    firstNames: ['Noctus', 'Umbrian', 'Solace', 'Eclipse', 'Obsidian'],
    surnames: ['Shadowveil', 'Darkbane', 'Stormborn', 'Twilight', 'Void'],
    eras: ['Twilight Age', 'Midnight Era', 'Shadow Realm', 'Dark Covenant', 'Void Ascension'],
    powers: ['Shadow Stepping', 'Darkness Control', 'Phase Shifting', 'Invisibility', 'Aura Draining'],
  },
};

export default function VampireNameGenerator() {
  const [category, setCategory] = useState('aristocratic');
  const [vampireName, setVampireName] = useState(null);

  const generateVampire = () => {
    const data = vampireData[category];

    const title = data.titles[Math.floor(Math.random() * data.titles.length)];
    const firstName = data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
    const surname = data.surnames[Math.floor(Math.random() * data.surnames.length)];
    const era = data.eras[Math.floor(Math.random() * data.eras.length)];
    const power = data.powers[Math.floor(Math.random() * data.powers.length)];

    setVampireName({
      title,
      firstName,
      surname,
      era,
      power,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Vampire Type
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'aristocratic', label: 'Aristocratic' },
              { value: 'feral', label: 'Feral' },
              { value: 'seductive', label: 'Seductive' },
              { value: 'ancient', label: 'Ancient' },
              { value: 'shadow', label: 'Shadow' },
            ]}
          />
        </div>

        <Button onClick={generateVampire} className="bg-accent text-white w-full">
          Generate Vampire Name
        </Button>
      </div>

      {vampireName && (
        <div className="bg-red-950 text-white border border-red-900 rounded-[var(--radius-card)] p-8 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Title</p>
            <p className="font-heading text-2xl font-bold">{vampireName.title}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="font-heading text-4xl font-bold">
              {vampireName.firstName} {vampireName.surname}
            </p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Era</p>
              <p className="text-lg font-medium">{vampireName.era}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Unique Power</p>
              <p className="text-lg font-medium">{vampireName.power}</p>
            </div>
          </div>

          <Button onClick={generateVampire} variant="secondary" className="bg-white text-red-950 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
