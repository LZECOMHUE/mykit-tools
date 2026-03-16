'use client';

import { useState, useMemo } from 'react';

export default function LineCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text) {
      return {
        totalLines: 0,
        nonBlankLines: 0,
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        avgWordsPerLine: 0,
      };
    }

    const lines = text.split('\n');
    const totalLines = lines.length;
    const nonBlankLines = lines.filter((line) => line.trim().length > 0).length;

    const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

    const avgWordsPerLine = nonBlankLines > 0 ? (words / nonBlankLines).toFixed(2) : 0;

    return {
      totalLines,
      nonBlankLines,
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      avgWordsPerLine,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here..."
          className="w-full min-h-[200px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Total Lines</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.totalLines}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Non-blank Lines</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.nonBlankLines}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Words</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.words}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Characters</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.characters}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Characters (no spaces)</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.charactersNoSpaces}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Sentences</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.sentences}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Paragraphs</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.paragraphs}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-muted text-xs mb-2">Avg Words/Line</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {stats.avgWordsPerLine}
          </p>
        </div>
      </div>

      <div className="text-sm text-text-muted">
        <p>Count lines, words, characters, and other text statistics in real-time.</p>
      </div>
    </div>
  );
}
