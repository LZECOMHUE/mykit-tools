'use client';

import { useState, useMemo } from 'react';

function countSyllables(word) {
  word = word.toLowerCase();
  let count = 0;
  let vowels = false;
  for (let i = 0; i < word.length; i++) {
    const isVowel = /[aeiouy]/.test(word[i]);
    if (isVowel && !vowels) {
      count++;
    }
    vowels = isVowel;
  }
  if (word.endsWith('e')) {
    count--;
  }
  if (word.endsWith('le') && word.length > 2 && !/[lsz]/.test(word[word.length - 3])) {
    count++;
  }
  return Math.max(1, count);
}

function calculateReadability(text) {
  if (!text.trim()) {
    return null;
  }

  // Count words
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Count sentences
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Count syllables
  let totalSyllables = 0;
  words.forEach((word) => {
    totalSyllables += countSyllables(word);
  });

  // Count characters
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;

  if (wordCount === 0 || sentenceCount === 0) {
    return null;
  }

  // Flesch Reading Ease
  const flesch = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);

  // Flesch-Kincaid Grade Level
  const kincaid = 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59;

  // Gunning Fog Index
  const complexWords = words.filter((w) => countSyllables(w) > 2).length;
  const gunningFog = 0.4 * (wordCount / sentenceCount + 100 * (complexWords / wordCount));

  // Coleman-Liau Index
  const colemanLiau = 0.0588 * charCountNoSpaces - 0.296 * sentenceCount - 15.8;

  return {
    wordCount,
    sentenceCount,
    charCount,
    charCountNoSpaces,
    syllableCount: totalSyllables,
    avgWordsPerSentence: (wordCount / sentenceCount).toFixed(2),
    avgSyllablesPerWord: (totalSyllables / wordCount).toFixed(2),
    flesch: flesch.toFixed(1),
    kincaid: Math.max(0, kincaid.toFixed(1)),
    gunningFog: Math.max(0, gunningFog.toFixed(1)),
    colemanLiau: Math.max(0, colemanLiau.toFixed(1)),
  };
}

function getScoreLevelColor(score, isEaseScore = true) {
  if (isEaseScore) {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-green-400';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 30) return 'text-orange-500';
    return 'text-red-600';
  } else {
    if (score <= 6) return 'text-green-600';
    if (score <= 9) return 'text-yellow-500';
    if (score <= 12) return 'text-orange-500';
    return 'text-red-600';
  }
}

function getScoreLevelLabel(score, isEaseScore = true) {
  if (isEaseScore) {
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  } else {
    if (score <= 6) return 'Easy';
    if (score <= 9) return 'Standard';
    if (score <= 12) return 'Advanced';
    return 'Very Advanced';
  }
}

export default function ReadabilityScoreChecker() {
  const [text, setText] = useState('');

  const stats = useMemo(() => calculateReadability(text), [text]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Paste Your Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here to check readability scores..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      {stats && (
        <div className="space-y-4">
          {/* Basic Stats */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)]">
            <h3 className="text-lg font-medium text-text-primary mb-4">Text Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-text-muted text-sm">Words</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.wordCount}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Sentences</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.sentenceCount}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Characters</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.charCount}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Avg Words/Sentence</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.avgWordsPerSentence}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Avg Syllables/Word</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.avgSyllablesPerWord}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-sm">Total Syllables</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {stats.syllableCount}
                </p>
              </div>
            </div>
          </div>

          {/* Readability Scores */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)]">
            <h3 className="text-lg font-medium text-text-primary mb-4">Readability Scores</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary">Flesch Reading Ease</p>
                  <span className={`font-mono text-lg font-semibold ${getScoreLevelColor(parseFloat(stats.flesch), true)}`}>
                    {stats.flesch}
                  </span>
                </div>
                <p className={`text-sm ${getScoreLevelColor(parseFloat(stats.flesch), true)}`}>
                  {getScoreLevelLabel(parseFloat(stats.flesch), true)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  0-100 scale. Higher = easier to read.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary">Flesch-Kincaid Grade</p>
                  <span className={`font-mono text-lg font-semibold ${getScoreLevelColor(parseFloat(stats.kincaid), false)}`}>
                    {stats.kincaid}
                  </span>
                </div>
                <p className={`text-sm ${getScoreLevelColor(parseFloat(stats.kincaid), false)}`}>
                  {getScoreLevelLabel(parseFloat(stats.kincaid), false)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  Grade level required to understand.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary">Gunning Fog Index</p>
                  <span className={`font-mono text-lg font-semibold ${getScoreLevelColor(parseFloat(stats.gunningFog), false)}`}>
                    {stats.gunningFog}
                  </span>
                </div>
                <p className={`text-sm ${getScoreLevelColor(parseFloat(stats.gunningFog), false)}`}>
                  {getScoreLevelLabel(parseFloat(stats.gunningFog), false)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  Years of education needed.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-text-secondary">Coleman-Liau Index</p>
                  <span className={`font-mono text-lg font-semibold ${getScoreLevelColor(parseFloat(stats.colemanLiau), false)}`}>
                    {stats.colemanLiau}
                  </span>
                </div>
                <p className={`text-sm ${getScoreLevelColor(parseFloat(stats.colemanLiau), false)}`}>
                  {getScoreLevelLabel(parseFloat(stats.colemanLiau), false)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  Grade level based on character count.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] text-center">
          <p className="text-text-muted">Paste text to see readability analysis</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Check how easy your text is to read with multiple readability metrics.</p>
      </div>
    </div>
  );
}
