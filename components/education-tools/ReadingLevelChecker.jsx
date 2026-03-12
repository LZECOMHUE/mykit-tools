'use client';

import { useState, useMemo } from 'react';

export default function ReadingLevelChecker() {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return null;
    }

    // Count words, sentences, and syllables
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
    const wordCount = words.length;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Simple syllable counting
    const countSyllables = (word) => {
      word = word.toLowerCase();
      let syllableCount = 0;
      const vowels = 'aeiouy';
      let previousWasVowel = false;

      for (let char of word) {
        const isVowel = vowels.includes(char);
        if (isVowel && !previousWasVowel) {
          syllableCount++;
        }
        previousWasVowel = isVowel;
      }

      if (word.endsWith('e')) {
        syllableCount--;
      }
      if (word.endsWith('le')) {
        syllableCount++;
      }

      return Math.max(1, syllableCount);
    };

    let totalSyllables = 0;
    words.forEach((word) => {
      const cleanWord = word.replace(/[^a-z]/gi, '');
      if (cleanWord.length > 0) {
        totalSyllables += countSyllables(cleanWord);
      }
    });

    // Flesch-Kincaid Reading Ease
    const readingEase = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);

    // Flesch-Kincaid Grade Level
    const gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59;

    // Gunning Fog Index
    const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
    const gunningFog = 0.4 * (wordCount / sentenceCount + 100 * (complexWords / wordCount));

    // Coleman-Liau Index
    const charCount = text.replace(/[^a-zA-Z]/g, '').length;
    const colemanLiau = 0.0588 * charCount - 0.296 * sentenceCount - 15.8;

    const avgGrade = (gradeLevel + gunningFog + colemanLiau) / 3;

    const getReadingLevel = (grade) => {
      if (grade < 2) return { level: 'Kindergarten - Grade 1', audience: 'Very easy, simple sentences' };
      if (grade < 3) return { level: 'Grade 2-3', audience: 'Easy, age-appropriate' };
      if (grade < 5) return { level: 'Grade 4-5', audience: 'Elementary school' };
      if (grade < 7) return { level: 'Grade 6-7', audience: 'Middle school' };
      if (grade < 9) return { level: 'Grade 8-9', audience: 'High school' };
      if (grade < 13) return { level: 'Grade 10-12', audience: 'Advanced high school' };
      return { level: 'College+', audience: 'Academic/professional' };
    };

    return {
      wordCount,
      sentenceCount,
      totalSyllables,
      avgWordsPerSentence: (wordCount / sentenceCount).toFixed(1),
      avgSyllablesPerWord: (totalSyllables / wordCount).toFixed(2),
      readingEase: Math.max(0, Math.min(100, readingEase)).toFixed(1),
      gradeLevel: gradeLevel.toFixed(1),
      gunningFog: gunningFog.toFixed(1),
      colemanLiau: colemanLiau.toFixed(1),
      avgGrade: avgGrade.toFixed(1),
      readingLevel: getReadingLevel(avgGrade),
    };
  }, [text]);

  const getReadingEaseColor = (ease) => {
    const num = parseFloat(ease);
    if (num >= 80) return 'text-success';
    if (num >= 60) return 'text-accent';
    if (num >= 40) return 'text-warning';
    return 'text-error';
  };

  const getEaseDescription = (ease) => {
    const num = parseFloat(ease);
    if (num >= 90) return 'Very easy';
    if (num >= 80) return 'Easy';
    if (num >= 70) return 'Fairly easy';
    if (num >= 60) return 'Standard';
    if (num >= 50) return 'Fairly difficult';
    if (num >= 30) return 'Difficult';
    return 'Very difficult';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <label className="block text-text-secondary text-sm font-medium">Paste text to analyze:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste text here... (at least 100 words for accurate analysis)"
          rows={8}
          className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-card)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
        />
      </div>

      {analysis && (
        <>
          {/* Main Results */}
          <div className="bg-accent-muted border-2 border-accent rounded-[var(--radius-card)] p-6 space-y-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Reading Level</p>
              <p className="font-heading text-3xl font-bold text-accent mb-2">Grade {analysis.avgGrade}</p>
              <p className="text-text-primary font-medium">{analysis.readingLevel.level}</p>
              <p className="text-text-secondary text-sm">{analysis.readingLevel.audience}</p>
            </div>
          </div>

          {/* Readability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Flesch-Kincaid Reading Ease</p>
              <p className={`font-mono-num text-2xl font-bold mb-1 ${getReadingEaseColor(analysis.readingEase)}`}>
                {analysis.readingEase}
              </p>
              <p className="text-text-secondary text-xs">{getEaseDescription(analysis.readingEase)}</p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Flesch-Kincaid Grade</p>
              <p className="font-mono-num text-2xl font-bold text-text-primary">Grade {analysis.gradeLevel}</p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Gunning Fog Index</p>
              <p className="font-mono-num text-2xl font-bold text-text-primary">Grade {analysis.gunningFog}</p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Coleman-Liau Index</p>
              <p className="font-mono-num text-2xl font-bold text-text-primary">Grade {analysis.colemanLiau}</p>
            </div>
          </div>

          {/* Text Statistics */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h4 className="text-text-primary font-semibold mb-4">Text Statistics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-text-secondary text-xs mb-1">Words</p>
                <p className="font-mono-num text-xl font-bold text-text-primary">{analysis.wordCount}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Sentences</p>
                <p className="font-mono-num text-xl font-bold text-text-primary">{analysis.sentenceCount}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Avg Words/Sent</p>
                <p className="font-mono-num text-xl font-bold text-text-primary">{analysis.avgWordsPerSentence}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Syllables</p>
                <p className="font-mono-num text-xl font-bold text-text-primary">{analysis.totalSyllables}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Avg Syllables/Word</p>
                <p className="font-mono-num text-xl font-bold text-text-primary">{analysis.avgSyllablesPerWord}</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-4 text-sm">
            <p className="text-text-primary font-medium mb-2">📖 Reading Level Tips:</p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside">
              <li>Shorter sentences and simpler words = easier reading</li>
              <li>Longer sentences and complex vocabulary = harder reading</li>
              <li>Use 8-12 words per sentence for general audiences</li>
              <li>Aim for grade 8 level for clear communication</li>
            </ul>
          </div>
        </>
      )}

      {!analysis && text.trim() && (
        <div className="bg-warning/10 border border-warning rounded-[var(--radius-card)] p-4 text-text-secondary text-sm">
          Please enter more text for analysis (at least 100 words recommended)
        </div>
      )}
    </div>
  );
}
