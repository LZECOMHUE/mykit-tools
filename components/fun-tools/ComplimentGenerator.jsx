'use client';

import { useState } from 'react';

const compliments = {
  friends: [
    'You\'re the kind of friend everyone needs in their life.',
    'Your laugh is infectious and makes everyone around you happier.',
    'You always know how to brighten someone\'s day.',
    'You\'re genuinely one of the nicest people I know.',
    'Your sense of humor is incredible.',
    'You\'re a great listener and really care about what others say.',
    'You inspire people to be better versions of themselves.',
    'Your kindness is inspiring.',
    'You bring out the best in people around you.',
    'You\'re the glue that holds your friend group together.',
  ],
  partner: [
    'I fall for you more every single day.',
    'You make me want to be a better person.',
    'Your smile is my favorite thing in the world.',
    'I\'m so grateful to have you in my life.',
    'You\'re my person.',
    'Everything is better when you\'re around.',
    'You make me feel safe and loved.',
    'I love how you laugh at your own jokes.',
    'You\'re my favorite adventure.',
    'With you, I feel like I can be completely myself.',
  ],
  colleagues: [
    'You\'re a fantastic team member.',
    'Your work ethic is truly commendable.',
    'You have great ideas and aren\'t afraid to share them.',
    'You\'re someone I genuinely enjoy working with.',
    'You\'re incredibly professional and reliable.',
    'Your dedication to your work is inspiring.',
    'You\'re a problem-solver and I admire that.',
    'You bring positive energy to the workplace.',
    'You\'re a valuable asset to the team.',
    'I\'ve learned a lot from working with you.',
  ],
  self: [
    'You\'re stronger than you believe.',
    'Your potential is limitless.',
    'You\'re doing better than you think you are.',
    'You deserve all the good things coming your way.',
    'You\'re worthy of love and respect.',
    'You\'re capable of amazing things.',
    'You\'ve overcome challenges that would defeat others.',
    'You\'re growing and improving every day.',
    'You\'re enough exactly as you are.',
    'Your future is incredibly bright.',
  ],
};

export default function ComplimentGenerator() {
  const [category, setCategory] = useState('friends');
  const [currentCompliment, setCurrentCompliment] = useState(compliments.friends[0]);
  const [copied, setCopied] = useState(false);

  const generateCompliment = () => {
    const categoryCompliments = compliments[category];
    const randomIndex = Math.floor(Math.random() * categoryCompliments.length);
    setCurrentCompliment(categoryCompliments[randomIndex]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCompliment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-green-50 border border-green-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-green-700 font-bold text-sm mb-2">💚 Spread Kindness</p>
        <p className="text-text-secondary text-sm">
          Use these genuine compliments to brighten someone\'s day. A sincere compliment can mean more than you know.
        </p>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-2">For</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentCompliment(compliments[e.target.value][0]);
          }}
          className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="friends">Friends</option>
          <option value="partner">Partner/Spouse</option>
          <option value="colleagues">Colleagues</option>
          <option value="self">Yourself (Self-Affirmation)</option>
        </select>
      </div>

      <div className="bg-surface p-6 rounded-[var(--radius-card)] min-h-32 flex items-center justify-center">
        <p className="text-xl text-text-primary font-medium text-center leading-relaxed">
          {currentCompliment}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateCompliment}
          className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
        >
          Generate Another
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">Genuine</p>
          <p className="text-lg mt-1">✓</p>
        </div>
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">Warm</p>
          <p className="text-lg mt-1">✓</p>
        </div>
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">Kind</p>
          <p className="text-lg mt-1">✓</p>
        </div>
      </div>
    </div>
  );
}
