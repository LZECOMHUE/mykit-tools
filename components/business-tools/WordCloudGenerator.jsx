'use client';

import { useState } from 'react';

export default function WordCloudGenerator() {
  const [text, setText] = useState('');
  const [minFrequency, setMinFrequency] = useState(2);

  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'or', 'an', 'are', 'was', 'is',
    'been', 'will', 'can', 'them', 'they', 'were', 'has', 'her', 'she', 'me', 'my', 'what', 'which', 'when',
  ]);

  const getWordFrequency = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq = {};

    words.forEach((word) => {
      if (word.length > 2 && !stopWords.has(word)) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .filter(([_, count]) => count >= minFrequency)
      .sort((a, b) => b[1] - a[1]);
  };

  const wordFreq = getWordFrequency();
  const maxFreq = wordFreq.length > 0 ? wordFreq[0][1] : 1;

  const getSize = (freq) => {
    const minSize = 12;
    const maxSize = 48;
    return minSize + ((freq / maxFreq) * (maxSize - minSize));
  };

  const getColor = (index, total) => {
    const hue = (index / total) * 360;
    return `hsl(${hue}, 65%, 55%)`;
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Paste Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here to generate a word cloud..."
            className="w-full h-32 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Minimum Frequency: {minFrequency}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={minFrequency}
            onChange={(e) => setMinFrequency(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-text-muted mt-1">Only show words that appear at least this many times</p>
        </div>
      </div>

      {wordFreq.length > 0 && (
        <div className="bg-white rounded-[var(--radius-card)] border border-border">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
            Word Cloud
          </h3>

          <div className="flex flex-wrap gap-4 justify-center items-center bg-surface rounded-[var(--radius-input)] min-h-64">
            {wordFreq.slice(0, 50).map(([word, freq], idx) => (
              <span
                key={word}
                style={{
                  fontSize: `${getSize(freq)}px`,
                  color: getColor(idx, wordFreq.length),
                  fontWeight: freq > maxFreq / 2 ? 'bold' : 'normal',
                }}
                className="whitespace-nowrap"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {wordFreq.length > 0 && (
        <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
            Top Words
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {wordFreq.slice(0, 20).map(([word, freq], idx) => (
              <div key={word} className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
                <span className="font-medium text-text-primary">{idx + 1}. {word}</span>
                <span className="font-mono text-accent font-bold">{freq}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {text && wordFreq.length === 0 && (
        <p className="text-center text-text-secondary bg-surface rounded-[var(--radius-input)] p-4">
          No words found matching your frequency threshold. Try lowering the minimum frequency.
        </p>
      )}
    </div>
  );
}
