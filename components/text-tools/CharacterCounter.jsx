'use client';

import { useState, useMemo } from 'react';

function calculateStats(text) {
  const withSpaces = text.length;
  const withoutSpaces = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  const lines = text.split('\n').length;

  const uniqueWords = new Set(
    text.toLowerCase().split(/\s+/).filter((w) => w.length > 0)
  ).size;

  const avgWordLength = words > 0 ? (withoutSpaces / words).toFixed(2) : 0;

  // Character frequency
  const charFreq = {};
  for (const char of text.toLowerCase()) {
    if (/[a-z0-9]/.test(char)) {
      charFreq[char] = (charFreq[char] || 0) + 1;
    }
  }

  const topChars = Object.entries(charFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Flesch-Kincaid Reading Level
  const avgSentenceLength = sentences > 0 ? words / sentences : 0;
  const avgSyllablesPerWord = 1.5; // Simplified estimate
  const fleschKincaid =
    0.39 * avgSentenceLength +
    11.8 * avgSyllablesPerWord -
    15.59;

  let readingLevel = 'N/A';
  if (fleschKincaid < 6) readingLevel = 'Very Easy';
  else if (fleschKincaid < 9) readingLevel = 'Easy';
  else if (fleschKincaid < 12) readingLevel = 'Standard';
  else if (fleschKincaid < 14) readingLevel = 'Fairly Difficult';
  else if (fleschKincaid < 16) readingLevel = 'Difficult';
  else readingLevel = 'Very Difficult';

  return {
    withSpaces,
    withoutSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    uniqueWords,
    avgWordLength,
    topChars,
    readingLevel,
  };
}

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => calculateStats(text), [text]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text..."
          className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <StatCard
          label="Characters (with spaces)"
          value={stats.withSpaces}
        />
        <StatCard
          label="Characters (no spaces)"
          value={stats.withoutSpaces}
        />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Lines" value={stats.lines} />
        <StatCard label="Unique Words" value={stats.uniqueWords} />
        <StatCard label="Avg Word Length" value={stats.avgWordLength} />
      </div>

      {/* Reading Level */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <p className="text-sm text-text-muted mb-1">Reading Level</p>
        <p className="text-lg font-medium text-text-primary">
          {stats.readingLevel}
        </p>
      </div>

      {/* Character Frequency */}
      {stats.topChars.length > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-3">
          <p className="text-sm font-medium text-text-primary">
            Top 10 Most Used Characters
          </p>
          <div className="space-y-2">
            {stats.topChars.map(([char, count]) => (
              <div key={char} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    <span className="font-mono-num text-accent">"{char}"</span>
                    {' '}
                    <span className="text-text-muted">({count})</span>
                  </span>
                  <span className="text-xs text-text-muted">
                    {((count / stats.withoutSpaces) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{
                      width: `${(count / stats.topChars[0][1]) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-xl font-mono-num text-text-primary">{value}</p>
    </div>
  );
}
