'use client';

import { useState } from 'react';

const roasts = {
  general: [
    'You\'re the human equivalent of a typo in a text message.',
    'I\'d roast you harder, but my comedy is too sophisticated for your audience.',
    'You\'re so unremarkable, autocorrect thinks you\'re a typo of someone interesting.',
    'Your jokes are like a broken clock... except even a broken clock is right twice a day.',
    'If you were a cereal, you\'d be plain cheerios.',
    'You\'re proof that evolution can go in reverse.',
    'I\'d tell you to go to hell, but I wouldn\'t wish that on anyone.',
    'You\'re like a human version of a Walmart parking lot on a Sunday.',
    'Your life is like a GPS with no destination set.',
    'You\'re the reason they made instructions more complicated.',
  ],
  tech: [
    'Your coding skills are like Internet Explorer... outdated.',
    'You debug like a person with a broken keyboard smashing random keys.',
    'Your algorithm is as efficient as dial-up internet.',
    'You\'re the kind of programmer who uses var for everything.',
    'Your pull requests are scarier than a horror movie.',
    'You don\'t know the difference between a class and a function... and it shows.',
    'Your GitCommit messages are more cryptic than Morse code.',
    'You\'re the reason we need code reviews.',
    'Your version control is just hoping nothing breaks.',
    'You\'re writing code like it\'s your first day... after a year.',
  ],
  food: [
    'You have the cooking skills of a microwave that\'s afraid of heat.',
    'Your recipes are instructions on how not to eat.',
    'You could burn water if you tried hard enough.',
    'Your kitchen is a crime scene waiting to happen.',
    'You make instant ramen look complicated.',
    'Your cooking is a valid form of self-sabotage.',
    'You\'re the reason takeout was invented.',
    'Your food has committed crimes against flavor.',
    'You cook like your stove is your first time seeing fire.',
    'Your meals need their own warning label.',
  ],
  sports: [
    'Your athletic prowess is legendary... in your head.',
    'You run like you\'re carrying invisible luggage.',
    'Your sports commentary is as accurate as a broken compass.',
    'You throw like you\'re trying to pet the ball gently.',
    'Your fitness routine is mostly sitting down.',
    'You\'re the participation trophy of athletes.',
    'Your warm-up takes longer than the actual game.',
    'Your jump is measured in millimeters.',
    'You\'re faster than a three-legged turtle... slower than a three-legged turtle.',
    'Your athletic ability exists only in theory.',
  ],
  fashion: [
    'Your fashion sense was rejected by a thrift store.',
    'You dress like you grabbed clothes with your eyes closed.',
    'Your outfit says "I lost a bet."',
    'You\'re a walking cautionary tale about the sales section.',
    'Your wardrobe looks like a laundry accident.',
    'You dress like a GPS without directions.',
    'Your style is best described as "experimental failure."',
    'You make neon patterns look subtle.',
    'Your fashion choices need their own support group.',
    'You\'re proof that sale signs shouldn\'t determine outfits.',
  ],
};

export default function RoastGenerator() {
  const [category, setCategory] = useState('general');
  const [currentRoast, setCurrentRoast] = useState(roasts.general[0]);
  const [copied, setCopied] = useState(false);

  const generateRoast = () => {
    const categoryRoasts = roasts[category];
    const randomIndex = Math.floor(Math.random() * categoryRoasts.length);
    setCurrentRoast(categoryRoasts[randomIndex]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentRoast).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block text-text-primary font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentRoast(roasts[e.target.value][0]);
          }}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="general">General</option>
          <option value="tech">Tech</option>
          <option value="food">Food</option>
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
        </select>
      </div>

      <div className="bg-surface rounded-[var(--radius-card)] min-h-32 flex items-center justify-center">
        <p className="text-lg text-text-primary font-medium text-center leading-relaxed">
          {currentRoast}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateRoast}
          className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
        >
          Bring Another Heat
        </button>

        <button
          onClick={handleCopy}
          className={`flex-1 px-4 py-3 font-medium rounded-[var(--radius-input)] transition ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <p className="text-xs text-text-muted text-center">For entertainment only - all roasts are light-hearted and meant to be funny</p>
    </div>
  );
}
