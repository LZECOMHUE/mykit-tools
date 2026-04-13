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
  const [showBreakdown, setShowBreakdown] = useState(false);

  const generateConspiracy = () => {
    const newConspiracy = {
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
    };
    setConspiracy(newConspiracy);
    setShowBreakdown(false);
  };

  const conspiracyText = `${conspiracy.subject} ${conspiracy.action} ${conspiracy.reason}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(conspiracyText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="bg-surface rounded-[var(--radius-card)] min-h-40 flex items-center justify-center">
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

      <div>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-text-secondary text-xs hover:text-text-primary transition"
        >
          {showBreakdown ? 'Hide' : 'Show'} breakdown
        </button>
        {showBreakdown && (
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono text-text-secondary">
            <span className="px-2 py-1 bg-surface rounded">Subject: {conspiracy.subject}</span>
            <span className="px-2 py-1 bg-surface rounded">Action: {conspiracy.action}</span>
            <span className="px-2 py-1 bg-surface rounded">Reason: {conspiracy.reason}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted text-center">100% fictional - generated for entertainment only</p>
    </div>
  );
}
