'use client';

import { useState, useCallback } from 'react';

const categories = [
  { value: 'jolly', label: 'Jolly', icon: '😄' },
  { value: 'mischievous', label: 'Mischievous', icon: '😈' },
  { value: 'shy', label: 'Shy', icon: '🤫' },
  { value: 'adventurous', label: 'Adventurous', icon: '🗺️' },
  { value: 'crafty', label: 'Crafty', icon: '🔨' },
];

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
  'Cookie Quality Tester',
  'Gift Tag Calligrapher',
];

const elfPersonalities = {
  jolly: {
    suffixes: ['Joy', 'Grin', 'Giggle', 'Cheer', 'Merry', 'Sparkle'],
    prefixes: ['Jolly', 'Happy', 'Merry', 'Cheerful', 'Jingle', 'Sunny'],
    bios: [
      'loves spreading Christmas cheer and making everyone laugh',
      'is known for infectious laughter and holiday spirit',
      'spreads joy wherever they go with a constant smile',
      'is the heart and soul of the workshop celebrations',
      'once made even the Grinch crack a smile',
    ],
  },
  mischievous: {
    suffixes: ['Misch', 'Trick', 'Prank', 'Sprite', 'Rascal', 'Wink'],
    prefixes: ['Sneaky', 'Tricky', 'Giggly', 'Sly', 'Mischief', 'Cheeky'],
    bios: [
      'is famous for pulling pranks and causing delightful chaos',
      'loves hiding toy parts and leaving mysterious notes',
      'is always plotting the next harmless mischief',
      'causes wonderful trouble throughout the workshop',
      'once swapped all the gift labels on Christmas Eve',
    ],
  },
  shy: {
    suffixes: ['Quiet', 'Soft', 'Sweet', 'Calm', 'Hope', 'Whisper'],
    prefixes: ['Gentle', 'Shy', 'Quiet', 'Tender', 'Soft', 'Hush'],
    bios: [
      'quietly perfects every detail with care and dedication',
      'speaks softly but works with amazing precision',
      'is the silent hero of the workshop',
      'brings peaceful productivity to everything',
      'leaves anonymous encouraging notes for other elves',
    ],
  },
  adventurous: {
    suffixes: ['Quest', 'Bold', 'Brave', 'Scout', 'Daring', 'Blaze'],
    prefixes: ['Brave', 'Bold', 'Fearless', 'Wild', 'Adventur', 'Dash'],
    bios: [
      'dreams of exploring beyond the North Pole',
      'is always seeking new and exciting challenges',
      'brings thrilling energy to every workshop project',
      'inspires others to be more daring and bold',
      'once explored the caves beneath the workshop alone',
    ],
  },
  crafty: {
    suffixes: ['Forge', 'Stitch', 'Tinker', 'Build', 'Craft', 'Spark'],
    prefixes: ['Clever', 'Nimble', 'Quick', 'Handy', 'Maker', 'Artisan'],
    bios: [
      'can fix any toy with scraps and determination',
      'invented three new wrapping techniques last year',
      'builds the most intricate toys in the workshop',
      'once repaired the sleigh mid-flight with a candy cane',
      'teaches toy-making masterclasses to younger elves',
    ],
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ElfNameGenerator() {
  const [type, setType] = useState('jolly');
  const [realName, setRealName] = useState('');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => {
    const name = realName.trim() || 'Buddy';
    const data = elfPersonalities[type];
    const nameLower = name.toLowerCase();
    const letterSum = nameLower.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

    const prefix = data.prefixes[letterSum % data.prefixes.length];
    const suffix = data.suffixes[(letterSum * 3) % data.suffixes.length];
    const job = elfJobTitles[letterSum % elfJobTitles.length];
    const bio = pick(data.bios);

    setResult({
      elfName: `${prefix}${suffix}`,
      realName: name,
      jobTitle: job,
      bio,
    });
  }, [type, realName]);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
          placeholder="Enter your name (optional)"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c.value} onClick={() => { setType(c.value); setResult(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === c.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}>{c.icon} {c.label}</button>
        ))}
      </div>

      <button onClick={generate} className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors">
        {result ? 'Generate Another Elf' : 'Generate Elf Name'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.elfName}</p>
            <p className="text-gray-400 text-sm mt-1">The Christmas Elf version of {result.realName}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Job Title</p>
              <p className="font-medium text-sm text-text-primary">{result.jobTitle}</p>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Personality</p>
              <p className="font-medium text-sm text-text-primary capitalize">{type}</p>
            </div>
            <div className="bg-white px-4 py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Bio</p>
              <p className="font-medium text-sm text-text-primary">{result.elfName} {result.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
