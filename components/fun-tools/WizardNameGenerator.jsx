'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'wise', label: 'Wise', icon: '📖' },
  { value: 'mischievous', label: 'Mischievous', icon: '🃏' },
  { value: 'dark', label: 'Dark', icon: '🖤' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'fire', label: 'Fire', icon: '🔥' },
  { value: 'ice', label: 'Ice', icon: '❄️' },
];

const wizardData = {
  wise: {
    titles: ['Archmage', 'Sage', 'Keeper of Secrets', 'Master of Spells', 'Oracle', 'Grand Magus'],
    firstNames: ['Aldus', 'Erimus', 'Thorin', 'Gandor', 'Silvanus', 'Ealdred', 'Mercius'],
    surnames: ['Starwhisper', 'Moonbringer', 'Spellweaver', 'Ashborn', 'Dragonkeeper', 'Lorewalker'],
    realms: ['Crystalline Peaks', 'Whispering Woods', 'Arcane Tower', 'Starfall Vale', 'The Ivory Sanctum'],
    specialties: ['Time Magic', 'Elemental Control', 'Enchantment', 'Divination', 'Transmutation', 'Cosmic Awareness'],
  },
  mischievous: {
    titles: ['Trickster', 'Chaos Weaver', 'Prankmaster', 'Spell Bender', 'Illusion Master', 'The Jester Mage'],
    firstNames: ['Zephyr', 'Puck', 'Rascal', 'Nimbus', 'Jester', 'Fizwick', 'Twick'],
    surnames: ['Shadowquick', 'Whiskerwick', 'Trickybrew', 'Mischief', 'Glimmergold', 'Sparkfizzle'],
    realms: ['Laughing Vale', 'Tangled Forest', "Jester's Court", "Prankster's Peak", 'The Funhouse Dimension'],
    specialties: ['Illusion', 'Transmutation', 'Trickery', 'Chaos Magic', 'Sleight of Hand', 'Charm Spells'],
  },
  dark: {
    titles: ['Warlock', 'Dark Lord', 'Shadow Master', 'Necromancer', 'Void Walker', 'The Accursed'],
    firstNames: ['Malachai', 'Noctus', 'Shadowborn', 'Grimhold', 'Umbra', 'Morvain', 'Dreadmore'],
    surnames: ['Blackthorn', 'Nightshade', 'Deathbringer', 'Voidcaller', 'Stormborn', 'Gravewhisper'],
    realms: ['Shadow Realm', 'Obsidian Wastes', 'Twilight Citadel', "Abyss's Edge", 'The Necropoleum'],
    specialties: ['Dark Arts', 'Necromancy', 'Curses', 'Shadow Magic', 'Soul Binding', 'Blood Rites'],
  },
  nature: {
    titles: ['Druid', "Nature's Guardian", 'Beastmaster', 'Grove Keeper', 'Wild Mage', 'Verdant Sage'],
    firstNames: ['Oakwin', 'Sylvan', 'Rootward', 'Breezewhisper', 'Fernson', 'Ashlea', 'Willowmere'],
    surnames: ['Greenthorne', 'Leafborne', 'Beastcaller', 'Naturebinder', 'Wildwood', 'Mossbeard'],
    realms: ['Enchanted Forest', 'Green Vale', 'Sacred Grove', 'Wilderness Beyond', 'The Living Canopy'],
    specialties: ['Plant Control', 'Animal Speak', 'Nature Healing', 'Weather Magic', 'Beast Summoning', 'Earthsong'],
  },
  fire: {
    titles: ['Infernomancer', 'Flame Lord', 'Pyromancer', 'Blaze Master', 'Ember King', 'Ash Warden'],
    firstNames: ['Ignis', 'Blaze', 'Solaris', 'Emberus', 'Flammeus', 'Cindra', 'Vulkane'],
    surnames: ['Firefury', 'Flameheart', 'Infernus', 'Emberborne', 'Dragonfire', 'Ashstorm'],
    realms: ['Volcanic Peaks', 'Blaze Kingdom', 'Ember Lands', 'Infernal Citadel', 'The Molten Core'],
    specialties: ['Fire Magic', 'Heat Control', 'Flame Summoning', 'Combustion', 'Phoenix Binding', 'Lava Shaping'],
  },
  ice: {
    titles: ['Frostweaver', 'Glacial Sage', 'Blizzard Lord', 'Winter Mage', 'The Frozen One', 'Permafrost Keeper'],
    firstNames: ['Glacius', 'Frostwyn', 'Boreal', 'Cryon', 'Nivea', 'Tundric', 'Rime'],
    surnames: ['Frostbane', 'Iceveil', 'Winterborn', 'Snowdrift', 'Coldforge', 'Hailstorm'],
    realms: ['The Frozen Spire', 'Glacier Sanctum', 'Blizzard Peaks', 'The Ice Throne', 'Permafrost Wastes'],
    specialties: ['Cryomancy', 'Blizzard Summoning', 'Frost Shield', 'Ice Constructs', 'Absolute Zero', 'Snow Sight'],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function WizardNameGenerator() {
  const [type, setType] = useState('wise');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const data = wizardData[type];
    setResult({
      title: pick(data.titles),
      firstName: pick(data.firstNames),
      surname: pick(data.surnames),
      realm: pick(data.realms),
      specialty: pick(data.specialties),
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
        {result ? 'Generate Another' : 'Generate Wizard Name'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="text-gray-400 text-sm">{result.title}</p>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.firstName} {result.surname}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Realm</p>
              <p className="font-medium text-sm text-text-primary">{result.realm}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Magical Specialty</p>
              <p className="font-medium text-sm text-text-primary">{result.specialty}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
