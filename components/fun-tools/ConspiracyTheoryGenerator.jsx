'use client';

import { useState } from 'react';

const subjects = [
  'Pigeons',
  'Socks',
  'Clouds',
  'Squirrels',
  'Your neighbor',
  'Cheese',
  'The moon',
  'Penguins',
  'Toast',
  'Stairs',
];

const actions = [
  'are actually recording all conversations',
  'have formed a secret government',
  'are controlling our thoughts with frequencies',
  'are hiding the truth about gravity',
  'are in league with the toaster industry',
  'have been planning this for centuries',
  'are actually aliens in disguise',
  'control the weather patterns',
  'replaced everyone with robots',
  'are communicating through pigeons',
];

const reasons = [
  'to keep us buying their products',
  'for world domination',
  'to make us dance at midnight',
  'for their secret agenda',
  'because cheese is the key',
  'to prevent us from discovering the truth',
  'to keep us distracted from socks',
  'for profit and power',
  'because they forgot why anymore',
  'to ensure we never find the remote control',
];

export default function ConspiracyTheoryGenerator() {
  const [conspiracy, setConspiracy] = useState(() => ({
    subject: subjects[0],
    action: actions[0],
    reason: reasons[0],
  }));
  const [copied, setCopied] = useState(false);

  const generateConspiracy = () => {
    const newConspiracy = {
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
    };
    setConspiracy(newConspiracy);
  };

  const conspiracyText = `${conspiracy.subject} ${conspiracy.action} ${conspiracy.reason}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(conspiracyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-red-50 border border-red-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-red-700 font-bold text-sm mb-2">🛸 SATIRE ALERT 🛸</p>
        <p className="text-text-secondary text-sm">
          These conspiracy theories are entirely fictional and generated for entertainment purposes only. This is satire and should never be taken seriously!
        </p>
      </div>

      <div className="bg-surface p-6 rounded-[var(--radius-card)] min-h-40 flex items-center justify-center">
        <p className="text-lg text-text-primary font-medium text-center leading-relaxed italic">
          "{conspiracyText}"
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateConspiracy}
          className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-blue-600 transition"
        >
          Generate Theory
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

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)] space-y-2">
        <p className="text-text-secondary text-sm font-medium">How it was created</p>
        <div className="space-y-1 text-text-secondary text-xs font-mono">
          <p>Subject: {conspiracy.subject}</p>
          <p>Action: {conspiracy.action}</p>
          <p>Reason: {conspiracy.reason}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">100%</p>
          <p className="text-text-primary font-bold mt-1">Fictional</p>
        </div>
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">100%</p>
          <p className="text-text-primary font-bold mt-1">Absurd</p>
        </div>
        <div className="bg-surface p-3 rounded-[var(--radius-card)] text-center">
          <p className="text-text-secondary text-xs">100%</p>
          <p className="text-text-primary font-bold mt-1">Silly</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)] text-center">
        <p className="text-text-secondary text-sm">
          Trust real sources, think critically, and enjoy this absurdity responsibly!
        </p>
      </div>
    </div>
  );
}
