'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'military', label: 'Military', icon: '🎖️' },
  { value: 'scavenger', label: 'Scavenger', icon: '🔦' },
  { value: 'medic', label: 'Medic', icon: '🩺' },
  { value: 'leader', label: 'Leader', icon: '📢' },
  { value: 'lone-wolf', label: 'Lone Wolf', icon: '🐺' },
  { value: 'engineer', label: 'Engineer', icon: '🔧' },
];

const zombieData = {
  military: {
    names: ['Jake Rivera', 'Sarah Chen', 'Marcus Kane', 'Alex Thompson', 'Colonel James Reeves', 'Sergeant Diaz', 'Private Okafor'],
    callsigns: ['Ghost', 'Phantom', 'Reaper', 'Shadow', 'Wraith', 'Viper', 'Hawk'],
    specialties: ['Demolitions expert', 'Tactical command', 'Weapons specialist', 'Strategic planning', 'Combat operations', 'Sniper'],
    weapons: ['Modified assault rifle', 'Explosive charges', 'Combat shotgun', 'Precision sniper rifle', 'Heavy machine gun', 'Tactical crossbow'],
    bases: ['Fortified military base', 'Underground bunker', 'Armored compound', 'Secured fortress', 'Hidden outpost', 'Aircraft carrier deck'],
  },
  scavenger: {
    names: ['Ryan Cross', 'Lisa Winters', 'Devon Clarke', 'Maya Patterson', 'Tom Garrison', 'Juno Reese', 'Kai Delgado'],
    callsigns: ['Vulture', 'Rogue', 'Nomad', 'Drifter', 'Scout', 'Magpie', 'Crow'],
    specialties: ['Scavenging', 'Street smarts', 'Stealth', 'Lockpicking', 'Vehicle repair', 'Bartering'],
    weapons: ['Makeshift crossbow', 'Salvaged pistol', 'Crowbar', 'Molotov cocktails', 'Sharpened machete', 'Nail bat'],
    bases: ['Abandoned warehouse', 'Mobile convoy', 'Hidden RV camp', 'Rooftop hideout', 'Underground subway station', 'Shopping mall fortress'],
  },
  medic: {
    names: ['Dr. Elena Vasquez', 'Sam Mitchell', 'Casey Moore', 'Jordan Lee', 'Dr. David Hassan', 'Nurse Priya Shah', 'Dr. Osei'],
    callsigns: ['Doc', 'Healer', 'Lifeline', 'Savior', 'Angel', 'Stitch', 'Remedy'],
    specialties: ['First aid', 'Infection prevention', 'Surgery', 'Resource management', 'Research', 'Herbal medicine'],
    weapons: ['Surgical saw', 'Medical supplies as weapons', 'Flare gun', 'Improvised explosives', 'Defensive handgun', 'Tranquiliser darts'],
    bases: ['Hospital basement', 'Medical supply depot', 'Fortified clinic', 'Research facility', 'Mobile medical unit', 'Veterinary college'],
  },
  leader: {
    names: ['Colonel Victoria Stone', 'Mayor Robert Sutton', 'Rachel Owens', 'James Blackwell', 'Dr. Susan Morrison', 'Pastor Emmanuel', 'Chief Torres'],
    callsigns: ['Commander', 'The Boss', 'Warden', 'Stronghold', 'The Protector', 'Beacon', 'Iron Will'],
    specialties: ['Leadership', 'Negotiation', 'Strategy', 'Resource allocation', 'Community building', 'Morale'],
    weapons: ['Ceremonial sword', 'Leadership presence', 'Makeshift armor', 'Signal flare gun', 'Reputation as shield', 'Megaphone and machete'],
    bases: ['Sprawling settlement', 'Fortified mall', 'Walled community', 'Corporate tower base', 'Prison stronghold', 'Stadium compound'],
  },
  'lone-wolf': {
    names: ['Jackson Gray', 'Sophia North', 'Nathan Cross', 'Emma Stone', 'Victor Kane', 'Ren Tanaka', 'Ash Mercer'],
    callsigns: ['Lone Wolf', 'Ghost', 'Shadow', 'Nomad', 'Survivor', 'Phantom', 'Spectre'],
    specialties: ['Survival', 'Self-reliance', 'Stealth', 'Tracking', 'Evasion', 'Trapping'],
    weapons: ['Hunting knife', 'Silenced weapon', 'Crossbow', 'Handmade traps', 'Bare hands', 'Compound bow'],
    bases: ['Hidden cabin', 'Underground bunker', 'Isolated farmhouse', 'Mountain hideaway', 'Secret sanctuary', 'Treehouse network'],
  },
  engineer: {
    names: ['Felix Cho', 'Dana Kowalski', 'Hector Ruiz', 'Ingrid Larsen', 'Zeke Patel', 'Tamsin Obi', 'Lev Petrov'],
    callsigns: ['Wrench', 'Spark', 'Gears', 'Bolt', 'Tesla', 'Forge', 'Circuit'],
    specialties: ['Fortification building', 'Trap design', 'Electronics repair', 'Power generation', 'Water purification', 'Radio communications'],
    weapons: ['Electrified fence rig', 'Nail gun', 'Rigged car battery', 'Automated turret', 'Pipe bomb', 'Modified chainsaw'],
    bases: ['Power plant', 'Auto repair shop', 'Hardware store fortress', 'Radio tower compound', 'Dam control facility', 'Factory complex'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ZombieApocalypseNameGenerator() {
  const [type, setType] = useState('military');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = zombieData[type];
    setResult({
      name: pick(data.names),
      callsign: pick(data.callsigns),
      specialty: pick(data.specialties),
      weapon: pick(data.weapons),
      base: pick(data.bases),
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
        {result ? 'Generate Another' : 'Generate Survivor'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.name}</p>
            <p className="text-gray-400 text-sm mt-1">Callsign: "{result.callsign}"</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Specialty</p>
              <p className="font-medium text-sm text-text-primary">{result.specialty}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Primary Weapon</p>
              <p className="font-medium text-sm text-text-primary">{result.weapon}</p>
            </div>
            <div className="bg-white px-4 py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Safe Base</p>
              <p className="font-medium text-sm text-text-primary">{result.base}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
