'use client';

import { useState, useEffect } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const wizardData = {
  wise: {
    titles: ['Archmage', 'Sage', 'Keeper of Secrets', 'Master of Spells', 'Oracle'],
    firstNames: ['Aldus', 'Erimus', 'Thorin', 'Gandor', 'Silvanus', 'Ealdred'],
    surnames: ['Starwhisper', 'Moonbringer', 'Spellweaver', 'Ashborn', 'Dragonkeeper'],
    realms: ['Crystalline Peaks', 'Whispering Woods', 'Arcane Tower', 'Starfall Vale'],
    specialties: ['Time Magic', 'Elemental Control', 'Enchantment', 'Divination', 'Transmutation'],
  },
  mischievous: {
    titles: ['Trickster', 'Chaos Weaver', 'Prankmaster', 'Spell Bender', 'Illusion Master'],
    firstNames: ['Zephyr', 'Puck', 'Rascal', 'Nimbus', 'Jester'],
    surnames: ['Shadowquick', 'Whiskerwick', 'Trickybrew', 'Mischief', 'Glimmergold'],
    realms: ['Laughing Vale', 'Tangled Forest', 'Jester\'s Court', 'Prankster\'s Peak'],
    specialties: ['Illusion', 'Transmutation', 'Trickery', 'Chaos Magic', 'Sleight of Hand'],
  },
  dark: {
    titles: ['Warlock', 'Dark Lord', 'Shadow Master', 'Necromancer', 'Void Walker'],
    firstNames: ['Malachai', 'Noctus', 'Shadowborn', 'Grimhold', 'Umbra'],
    surnames: ['Blackthorn', 'Nightshade', 'Deathbringer', 'Voidcaller', 'Stormborn'],
    realms: ['Shadow Realm', 'Obsidian Wastes', 'Twilight Citadel', 'Abyss\'s Edge'],
    specialties: ['Dark Arts', 'Necromancy', 'Curses', 'Shadow Magic', 'Soul Binding'],
  },
  nature: {
    titles: ['Druid', 'Nature\'s Guardian', 'Beastmaster', 'Grove Keeper', 'Wild Mage'],
    firstNames: ['Oakwin', 'Sylvan', 'Rootward', 'Breezewhisper', 'Fernson'],
    surnames: ['Greenthorne', 'Leafborne', 'Beastcaller', 'Naturebinder', 'Wildwood'],
    realms: ['Enchanted Forest', 'Green Vale', 'Sacred Grove', 'Wilderness Beyond'],
    specialties: ['Plant Control', 'Animal Speak', 'Nature Healing', 'Weather Magic', 'Beast Summoning'],
  },
  fire: {
    titles: ['Infernomancer', 'Flame Lord', 'Pyromancer', 'Blaze Master', 'Ember King'],
    firstNames: ['Ignis', 'Blaze', 'Solaris', 'Emberus', 'Flammeus'],
    surnames: ['Firefury', 'Flameheart', 'Infernus', 'Emberborne', 'Dragonfire'],
    realms: ['Volcanic Peaks', 'Blaze Kingdom', 'Ember Lands', 'Infernal Citadel'],
    specialties: ['Fire Magic', 'Heat Control', 'Flame Summoning', 'Combustion', 'Phoenix Binding'],
  },
};

function generateFromData(data) {
  const title = data.titles[Math.floor(Math.random() * data.titles.length)];
  const firstName = data.firstNames[Math.floor(Math.random() * data.firstNames.length)];
  const surname = data.surnames[Math.floor(Math.random() * data.surnames.length)];
  const realm = data.realms[Math.floor(Math.random() * data.realms.length)];
  const specialty = data.specialties[Math.floor(Math.random() * data.specialties.length)];
  return { title, firstName, surname, realm, specialty };
}

export default function WizardNameGenerator() {
  const [personality, setPersonality] = useState('wise');
  const [wizardName, setWizardName] = useState(null);

  const generateWizard = () => {
    setWizardName(generateFromData(wizardData[personality]));
  };

  // Auto-generate on mount
  useEffect(() => {
    setWizardName(generateFromData(wizardData[personality]));
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Personality Type
          </label>
          <Select value={personality} onChange={(e) => setPersonality(e.target.value)} className="w-full">
            <option value="wise">Wise</option>
            <option value="mischievous">Mischievous</option>
            <option value="dark">Dark</option>
            <option value="nature">Nature</option>
            <option value="fire">Fire</option>
          </Select>
        </div>
        <Button onClick={generateWizard} className="bg-accent text-white px-6 whitespace-nowrap">
          Generate
        </Button>
      </div>

      {wizardName && (
        <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-5 space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Title</p>
            <p className="font-heading text-2xl font-bold">{wizardName.title}</p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4">
            <p className="font-heading text-4xl font-bold">
              {wizardName.firstName} {wizardName.surname}
            </p>
          </div>

          <div className="border-t border-white border-opacity-20 pt-4 space-y-3">
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Realm</p>
              <p className="text-lg font-medium">{wizardName.realm}</p>
            </div>
            <div>
              <p className="text-xs opacity-75 uppercase tracking-wider">Magical Specialty</p>
              <p className="text-lg font-medium">{wizardName.specialty}</p>
            </div>
          </div>

          <Button onClick={generateWizard} variant="secondary" className="bg-white text-accent w-full mt-4">
            Generate Another
          </Button>
        </div>
      )}
    </div>
  );
}
