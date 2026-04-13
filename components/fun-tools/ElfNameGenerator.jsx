'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const elfJobTitles = [
  'Chief Present Wrapper',
  'Head Reindeer Trainer',
  'Master Toy Inspector',
  'Senior Candy Cane Manager',
  'Lead Sleigh Mechanic',
  'Decoration Design Chief',
  'Toy Assembly Supervisor',
  'Snow Quality Controller',
  'Jingle Bell Specialist',
  'Christmas Spirit Keeper',
];

const elfPersonalities = {
  jolly: {
    suffixes: ['Joy', 'Grin', 'Giggle', 'Cheer', 'Merry'],
    prefixes: ['Jolly', 'Happy', 'Merry', 'Cheerful', 'Jingle'],
    bios: [
      'loves spreading Christmas cheer and making everyone laugh',
      'is known for infectious laughter and holiday spirit',
      'spreads joy wherever they go with a constant smile',
      'is the heart and soul of the workshop celebrations',
    ],
  },
  mischievous: {
    suffixes: ['Misch', 'Trick', 'Prank', 'Sprite', 'Rascal'],
    prefixes: ['Sneaky', 'Tricky', 'Giggly', 'Sly', 'Mischief'],
    bios: [
      'is famous for pulling pranks and causing delightful chaos',
      'loves hiding toy parts and leaving mysterious notes',
      'is always plotting the next harmless mischief',
      'causes wonderful trouble throughout the workshop',
    ],
  },
  shy: {
    suffixes: ['Quiet', 'Soft', 'Sweet', 'Calm', 'Hope'],
    prefixes: ['Gentle', 'Shy', 'Quiet', 'Tender', 'Soft'],
    bios: [
      'quietly perfects every detail with care and dedication',
      'speaks softly but works with amazing precision',
      'is the silent hero of the workshop',
      'brings peaceful productivity to everything',
    ],
  },
  adventurous: {
    suffixes: ['Quest', 'Bold', 'Brave', 'Scout', 'Daring'],
    prefixes: ['Brave', 'Bold', 'Fearless', 'Wild', 'Adventur'],
    bios: [
      'dreams of exploring beyond the North Pole',
      'is always seeking new and exciting challenges',
      'brings thrilling energy to every workshop project',
      'inspires others to be more daring and bold',
    ],
  },
};

function generateElf(name, personality) {
  const personalityData = elfPersonalities[personality];
  const nameLower = name.toLowerCase();
  const letterSum = nameLower.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const suffix = personalityData.suffixes[letterSum % personalityData.suffixes.length];
  const prefix = personalityData.prefixes[letterSum % personalityData.prefixes.length];
  const job = elfJobTitles[letterSum % elfJobTitles.length];
  const bio = personalityData.bios[letterSum % personalityData.bios.length];

  return {
    elfName: `${prefix}${suffix}`,
    jobTitle: job,
    bio,
    realName: name,
  };
}

export default function ElfNameGenerator() {
  const [realName, setRealName] = useState('');
  const [personality, setPersonality] = useState('jolly');
  const [elfName, setElfName] = useState(null);

  const generateElfName = () => {
    const name = realName.trim() || 'Aragorn';
    setElfName(generateElf(name, personality));
  };

  // Auto-generate on mount with default name
  useEffect(() => {
    setRealName('Aragorn');
    setElfName(generateElf('Aragorn', 'jolly'));
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Your Name
          </label>
          <Input
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateElfName()}
            placeholder="e.g. Sarah, James, Emma"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Personality
          </label>
          <Select value={personality} onChange={(e) => setPersonality(e.target.value)}>
            <option value="jolly">Jolly</option>
            <option value="mischievous">Mischievous</option>
            <option value="shy">Shy</option>
            <option value="adventurous">Adventurous</option>
          </Select>
        </div>
        <Button onClick={generateElfName} className="bg-accent text-white px-6 whitespace-nowrap">
          Generate
        </Button>
      </div>

      {elfName && (
        <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-5 space-y-4">
          <div>
            <p className="text-text-secondary text-sm mb-2">Meet</p>
            <p className="font-heading text-4xl font-bold text-red-800">{elfName.elfName}</p>
            <p className="text-red-700 text-sm mt-1">The Christmas Elf version of {elfName.realName}</p>
          </div>

          <div className="border-t border-red-200 pt-4 space-y-3">
            <div>
              <p className="text-text-secondary text-xs font-medium mb-1">JOB TITLE</p>
              <p className="font-heading text-lg font-bold text-red-800">{elfName.jobTitle}</p>
            </div>

            <div>
              <p className="text-text-secondary text-xs font-medium mb-1">BIO</p>
              <p className="text-red-700">{elfName.bio}</p>
            </div>
          </div>

          <Button onClick={generateElfName} variant="secondary" className="bg-red-800 text-white w-full mt-4">
            Generate Another Elf
          </Button>
        </div>
      )}
    </div>
  );
}
