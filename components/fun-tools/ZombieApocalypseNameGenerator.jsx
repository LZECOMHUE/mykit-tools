'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const zombieData = {
  military: {
    names: ['Jake Rivera', 'Sarah Chen', 'Marcus Kane', 'Alex Thompson', 'Colonel James Reeves'],
    callsigns: ['Ghost', 'Phantom', 'Reaper', 'Shadow', 'Wraith'],
    specialties: ['Demolitions expert', 'Tactical command', 'Weapons specialist', 'Strategic planning', 'Combat operations'],
    weapons: ['Modified assault rifle', 'Explosive charges', 'Combat shotgun', 'Precision sniper rifle', 'Heavy machine gun'],
    bases: ['Fortified military base', 'Underground bunker', 'Armored compound', 'Secured fortress', 'Hidden outpost'],
  },
  scavenger: {
    names: ['Ryan Cross', 'Lisa Winters', 'Devon Clarke', 'Maya Patterson', 'Tom Garrison'],
    callsigns: ['Vulture', 'Rogue', 'Nomad', 'Drifter', 'Scout'],
    specialties: ['Scavenging', 'Street smarts', 'Stealth', 'Lockpicking', 'Vehicle repair'],
    weapons: ['Makeshift crossbow', 'Salvaged pistol', 'Crowbar', 'Molotov cocktails', 'Sharpened machete'],
    bases: ['Abandoned warehouse', 'Mobile convoy', 'Hidden RV camp', 'Rooftop hideout', 'Underground subway station'],
  },
  medic: {
    names: ['Dr. Elena Vasquez', 'Sam Mitchell', 'Casey Moore', 'Jordan Lee', 'Dr. David Hassan'],
    callsigns: ['Doc', 'Healer', 'Lifeline', 'Savior', 'Angel'],
    specialties: ['First aid', 'Infection prevention', 'Surgery', 'Resource management', 'Research'],
    weapons: ['Surgical saw', 'Medical supplies as weapons', 'Flare gun', 'Improvised explosives', 'Defensive handgun'],
    bases: ['Hospital basement', 'Medical supply depot', 'Fortified clinic', 'Research facility', 'Mobile medical unit'],
  },
  leader: {
    names: ['Colonel Victoria Stone', 'Mayor Robert Sutton', 'Rachel Owens', 'James Blackwell', 'Dr. Susan Morrison'],
    callsigns: ['Commander', 'The Boss', 'Warden', 'Stronghold', 'The Protector'],
    specialties: ['Leadership', 'Negotiation', 'Strategy', 'Resource allocation', 'Community building'],
    weapons: ['Ceremonial sword', 'Leadership presence', 'Makeshift armor', 'Signal flare gun', 'Reputation as shield'],
    bases: ['Sprawling settlement', 'Fortified mall', 'Walled community', 'Corporate tower base', 'Prison stronghold'],
  },
  'lone-wolf': {
    names: ['Jackson Gray', 'Sophia North', 'Nathan Cross', 'Emma Stone', 'Victor Kane'],
    callsigns: ['Lone Wolf', 'Ghost', 'Shadow', 'Nomad', 'Survivor'],
    specialties: ['Survival', 'Self-reliance', 'Stealth', 'Tracking', 'Evasion'],
    weapons: ['Hunting knife', 'Silenced weapon', 'Crossbow', 'Handmade traps', 'Bare hands'],
    bases: ['Hidden cabin', 'Underground bunker', 'Isolated farmhouse', 'Mountain hideaway', 'Secret sanctuary'],
  },
};

export default function ZombieApocalypseNameGenerator() {
  const [category, setCategory] = useState('military');
  const [survivor, setSurvivor] = useState(null);

  const generateSurvivor = () => {
    const data = zombieData[category];

    const name = data.names[Math.floor(Math.random() * data.names.length)];
    const callsign = data.callsigns[Math.floor(Math.random() * data.callsigns.length)];
    const specialty = data.specialties[Math.floor(Math.random() * data.specialties.length)];
    const weapon = data.weapons[Math.floor(Math.random() * data.weapons.length)];
    const base = data.bases[Math.floor(Math.random() * data.bases.length)];

    setSurvivor({
      name,
      callsign,
      specialty,
      weapon,
      base,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Survivor Role
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'military', label: 'Military' },
              { value: 'scavenger', label: 'Scavenger' },
              { value: 'medic', label: 'Medic' },
              { value: 'leader', label: 'Leader' },
              { value: 'lone-wolf', label: 'Lone Wolf' },
            ]}
          />
        </div>

        <Button onClick={generateSurvivor} className="bg-accent text-white w-full">
          Generate Survivor
        </Button>
      </div>

      {survivor && (
        <div className="bg-orange-950 text-white border border-orange-900 rounded-[var(--radius-card)] space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Name</p>
            <p className="font-heading text-3xl font-bold">{survivor.name}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Callsign</p>
            <p className="text-2xl font-bold">"{survivor.callsign}"</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Specialty</p>
              <p className="text-lg font-medium">{survivor.specialty}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Primary Weapon</p>
              <p className="text-lg font-medium">{survivor.weapon}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Safe Base</p>
              <p className="text-lg font-medium">{survivor.base}</p>
            </div>
          </div>

          <Button onClick={generateSurvivor} variant="secondary" className="bg-white text-orange-950 w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
