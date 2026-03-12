'use client';

import { useState, useMemo } from 'react';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
  'not', 'no', 'if', 'as', 'so', 'at', 'by', 'for', 'from', 'in',
  'into', 'of', 'on', 'to', 'with', 'that', 'this', 'it', 'i', 'you',
  'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'its',
  'me', 'him', 'us', 'them'
]);

export default function WordCounter() {
  const [text, setText] = useState('');

  // Calculate all stats with useMemo
  const stats = useMemo(() => {
    const trimmedText = text.trim();

    // Basic counts
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = trimmedText.length === 0 ? 0 : trimmedText.split(/\s+/).length;
    const sentenceCount = trimmedText.length === 0 ? 0 : (trimmedText.match(/[.!?]+/g) || []).length;
    const paragraphCount = trimmedText.length === 0 ? 0 : trimmedText.split(/\n\n+/).filter(p => p.trim()).length;

    // Average word length
    const avgWordLength = wordCount === 0 ? 0 : (characterCountNoSpaces / wordCount).toFixed(1);

    // Reading time (words / 200)
    const readingTimeSeconds = wordCount === 0 ? 0 : Math.ceil((wordCount / 200) * 60);
    const readingTimeMin = Math.floor(readingTimeSeconds / 60);
    const readingTimeSec = readingTimeSeconds % 60;
    const readingTime = readingTimeMin > 0
      ? `${readingTimeMin} min ${readingTimeSec} sec`
      : `${readingTimeSec} sec`;

    // Speaking time (words / 130)
    const speakingTimeSeconds = wordCount === 0 ? 0 : Math.ceil((wordCount / 130) * 60);
    const speakingTimeMin = Math.floor(speakingTimeSeconds / 60);
    const speakingTimeSec = speakingTimeSeconds % 60;
    const speakingTime = speakingTimeMin > 0
      ? `${speakingTimeMin} min ${speakingTimeSec} sec`
      : `${speakingTimeSec} sec`;

    // Top 5 most frequent words
    const topWords = [];
    if (trimmedText.length > 0) {
      const wordFreq = {};
      const words = trimmedText.toLowerCase().split(/\s+/);

      words.forEach(word => {
        const cleanWord = word.replace(/[^a-z0-9]/g, '');
        if (cleanWord.length > 0 && !STOP_WORDS.has(cleanWord)) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });

      topWords.push(...Object.entries(wordFreq)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word, count]) => ({ word, count })));
    }

    return {
      characters: characterCount,
      charactersNoSpaces: characterCountNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      avgWordLength,
      readingTime,
      speakingTime,
      topWords
    };
  }, [text]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Show brief feedback (could add toast here)
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="w-full">
      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full min-h-[200px] rounded-[var(--radius-input)] border border-border bg-white p-4 font-sans text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 resize-none"
      />

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 rounded-[var(--radius-card)] bg-white border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface transition-colors"
        >
          Copy
        </button>
        <button
          onClick={handleClear}
          className="flex-1 rounded-[var(--radius-card)] bg-white border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Words */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.words}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Words</div>
        </div>

        {/* Characters */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.characters}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Characters</div>
        </div>

        {/* Characters (no spaces) */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.charactersNoSpaces}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">No Spaces</div>
        </div>

        {/* Sentences */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.sentences}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Sentences</div>
        </div>

        {/* Paragraphs */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.paragraphs}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Paragraphs</div>
        </div>

        {/* Average Word Length */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.avgWordLength}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Avg Length</div>
        </div>

        {/* Reading Time */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.readingTime}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Read Time</div>
        </div>

        {/* Speaking Time */}
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-3 text-center">
          <div className="text-lg font-bold font-mono-num text-text-primary">
            {stats.speakingTime}
          </div>
          <div className="mt-0.5 text-[11px] text-text-muted">Speak Time</div>
        </div>
      </div>

      {/* Top Words */}
      {stats.topWords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-text-primary mb-2">
            Most Frequent Words
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map(({ word, count }) => (
              <span
                key={word}
                className="rounded-full bg-surface px-2 py-0.5 text-[11px] text-text-secondary"
              >
                {word} <span className="text-text-muted">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
