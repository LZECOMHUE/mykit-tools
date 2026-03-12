'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ReadabilityChecker() {
  const [text, setText] = useState('');

  // Count syllables using a heuristic approach
  const countSyllables = (word) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;

    let syllables = 0;
    let vowels = false;

    for (let i = 0; i < word.length; i++) {
      const isVowel = 'aeiouy'.includes(word[i]);

      if (isVowel && !vowels) {
        syllables++;
      }

      vowels = isVowel;
    }

    // Handle silent-e
    if (word.endsWith('e')) {
      syllables--;
    }

    // Handle silent-le
    if (word.endsWith('le') && word.length > 2 && !['aeiou'].includes(word[word.length - 3])) {
      syllables++;
    }

    return Math.max(1, syllables);
  };

  const results = useMemo(() => {
    if (!text.trim()) return null;

    // Basic stats
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
    const wordCount = words.length;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Calculate syllables
    let totalSyllables = 0;
    words.forEach((word) => {
      totalSyllables += countSyllables(word);
    });

    const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

    // Flesch Reading Ease
    const flesch = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    const fleschClamped = Math.max(0, Math.min(100, flesch));

    // Flesch-Kincaid Grade Level
    const kincaid = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    const kincaidClamped = Math.max(0, kincaid);

    // Gunning Fog Index
    const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
    const gunningFog = 0.4 * (avgWordsPerSentence + (100 * complexWords) / wordCount);
    const gunningFogClamped = Math.max(0, gunningFog);

    // SMOG Index
    const polysyllabic = words.filter((w) => countSyllables(w) >= 3).length;
    const smog = 1.0430 * Math.sqrt(polysyllabic * (30 / sentenceCount)) + 3.1291;
    const smogClamped = Math.max(0, smog);

    // Coleman-Liau Index
    const characters = text.replace(/\s/g, '').length;
    const colemanLiau = 0.0588 * characters - 0.296 * sentenceCount - 15.8;
    const colemanLiauClamped = Math.max(0, colemanLiau);

    // Average grade level
    const avgGrade = (kincaidClamped + gunningFogClamped + smogClamped + colemanLiauClamped) / 4;

    // Determine reading level
    const getReadingLevel = (score) => {
      if (score < 6) return { level: 'Very Easy', colour: 'success' };
      if (score < 7) return { level: 'Easy', colour: 'success' };
      if (score < 8) return { level: 'Fairly Easy', colour: 'success' };
      if (score < 9) return { level: 'Standard', colour: 'warning' };
      if (score < 11) return { level: 'Fairly Difficult', colour: 'warning' };
      if (score < 13) return { level: 'Difficult', colour: 'error' };
      return { level: 'Very Difficult', colour: 'error' };
    };

    const readingLevel = getReadingLevel(avgGrade);

    // Estimate reading time
    const wordsPerMinute = 200;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    const readingTime = readingTimeMinutes === 1 ? '1 minute' : `${readingTimeMinutes} minutes`;

    // Get improvement tips
    const tips = [];
    if (avgWordsPerSentence > 15) {
      tips.push('Break long sentences into shorter ones');
    }
    if (avgSyllablesPerWord > 1.5) {
      tips.push('Replace complex words with simpler alternatives');
    }
    if (complexWords > wordCount * 0.1) {
      tips.push('Reduce the number of polysyllabic words');
    }
    if (sentenceCount < 3) {
      tips.push('Add more sentences to break up the text');
    }

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordsPerSentence,
      avgSyllablesPerWord,
      flesch: fleschClamped,
      kincaid: kincaidClamped,
      gunningFog: gunningFogClamped,
      smog: smogClamped,
      colemanLiau: colemanLiauClamped,
      avgGrade,
      readingLevel,
      readingTime,
      tips: tips.length > 0 ? tips : null,
    };
  }, [text]);

  const handleReset = () => {
    setText('');
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.log('Unable to paste from clipboard');
    }
  };

  const getFleschColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'success';
    if (score >= 70) return 'success';
    if (score >= 60) return 'warning';
    if (score >= 50) return 'warning';
    if (score >= 30) return 'error';
    return 'error';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Textarea */}
      <Card>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-text-secondary text-sm font-medium">Paste Your Text</label>
            <Button variant="ghost" size="sm" onClick={handlePaste}>
              Paste from Clipboard
            </Button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here to analyse readability..."
            className="w-full px-4 py-4 bg-white border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10 font-sans resize-none h-48"
          />

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleReset}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {results && (
        <>
          {/* Primary Metrics */}
          <Card className="border-2 border-accent bg-accent/5">
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-text-secondary text-xs mb-1">Word Count</p>
                  <p className="font-mono text-2xl font-bold text-accent">{results.wordCount}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-1">Sentence Count</p>
                  <p className="font-mono text-2xl font-bold text-accent">{results.sentenceCount}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-1">Paragraph Count</p>
                  <p className="font-mono text-2xl font-bold text-accent">{results.paragraphCount}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-1">Avg Words/Sentence</p>
                  <p className="font-mono text-2xl font-bold text-text-primary">{results.avgWordsPerSentence.toFixed(1)}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-1">Avg Syllables/Word</p>
                  <p className="font-mono text-2xl font-bold text-text-primary">{results.avgSyllablesPerWord.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-text-secondary text-xs mb-1">Est. Reading Time</p>
                  <p className="font-mono text-lg font-bold text-text-primary">{results.readingTime}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Readability Scores */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Readability Scores</h3>

              <div className="space-y-4">
                {/* Flesch Reading Ease */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-text-secondary text-sm font-medium">Flesch Reading Ease</label>
                    <span className="font-mono text-lg font-bold text-text-primary">{results.flesch.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                    <div className={`h-full bg-${getFleschColor(results.flesch)}`} style={{ width: `${(results.flesch / 100) * 100}%` }} />
                  </div>
                  <p className="text-xs text-text-muted mt-1">0-30 = Very Hard | 30-50 = Hard | 50-60 = Standard | 60-70 = Fairly Easy | 70-100 = Very Easy</p>
                </div>

                {/* Grade Levels */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-text-secondary text-xs mb-1">Flesch-Kincaid Grade</p>
                    <p className="font-mono font-bold text-text-primary">{results.kincaid.toFixed(1)}</p>
                  </div>

                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-text-secondary text-xs mb-1">Gunning Fog Index</p>
                    <p className="font-mono font-bold text-text-primary">{results.gunningFog.toFixed(1)}</p>
                  </div>

                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-text-secondary text-xs mb-1">SMOG Index</p>
                    <p className="font-mono font-bold text-text-primary">{results.smog.toFixed(1)}</p>
                  </div>

                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-text-secondary text-xs mb-1">Coleman-Liau Index</p>
                    <p className="font-mono font-bold text-text-primary">{results.colemanLiau.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Overall Reading Level */}
          <Card className={`border-2 border-${results.readingLevel.colour} bg-${results.readingLevel.colour}/5`}>
            <div className="text-center space-y-2">
              <p className="text-text-secondary text-sm">Overall Reading Level</p>
              <p className={`text-4xl font-bold text-${results.readingLevel.colour}`}>{results.readingLevel.level}</p>
              <p className="text-text-secondary text-sm">Grade level: {results.avgGrade.toFixed(1)}</p>
            </div>
          </Card>

          {/* Improvement Tips */}
          {results.tips && (
            <Card className="bg-info/10 border border-info">
              <div className="space-y-3">
                <h3 className="text-text-primary font-semibold">Suggestions to Improve Readability</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {results.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-info font-bold">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {/* Help Section */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Understanding the Scores</h3>

              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <p className="font-medium text-text-primary mb-1">Flesch Reading Ease (0-100)</p>
                  <p>Higher scores indicate easier text. 60-70 is considered "standard" readability, suitable for most general audiences.</p>
                </div>

                <div>
                  <p className="font-medium text-text-primary mb-1">Grade Levels</p>
                  <p>
                    These represent the US grade level required to understand the text. A score of 8 means the text is suitable for an 8th-grade student (approximately 13-14 years old).
                  </p>
                </div>

                <div>
                  <p className="font-medium text-text-primary mb-1">Tips for Improvement</p>
                  <p>Shorter sentences, simpler words, and clear paragraph breaks all improve readability. Aim for an average sentence length of 15-20 words.</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      {!results && text.trim() && (
        <div className="bg-info/10 border border-info rounded-lg p-4 text-text-secondary text-sm">
          Analysing text...
        </div>
      )}

      {!results && !text.trim() && (
        <div className="bg-surface border border-border rounded-lg p-6 text-center text-text-secondary">
          <p>Paste or type text above to analyse its readability.</p>
        </div>
      )}
    </div>
  );
}
