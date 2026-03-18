'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const MAJOR_KEYS = {
  'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
  'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'],
  'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
  'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
  'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
  'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
};

const RELATIVE_MINOR = {
  'C': 'Am', 'G': 'Em', 'D': 'Bm', 'A': 'F#m', 'E': 'C#m', 'B': 'G#m',
  'F#': 'D#m', 'F': 'Dm', 'Bb': 'Gm', 'Eb': 'Cm', 'Ab': 'Fm', 'Db': 'Bbm',
};

const ROMAN_NUMERALS = {
  'C': { 'C': 'I', 'Dm': 'ii', 'Em': 'iii', 'F': 'IV', 'G': 'V', 'Am': 'vi', 'Bdim': 'vii°' },
  'G': { 'G': 'I', 'Am': 'ii', 'Bm': 'iii', 'C': 'IV', 'D': 'V', 'Em': 'vi', 'F#dim': 'vii°' },
  'D': { 'D': 'I', 'Em': 'ii', 'F#m': 'iii', 'G': 'IV', 'A': 'V', 'Bm': 'vi', 'C#dim': 'vii°' },
  'A': { 'A': 'I', 'Bm': 'ii', 'C#m': 'iii', 'D': 'IV', 'E': 'V', 'F#m': 'vi', 'G#dim': 'vii°' },
  'E': { 'E': 'I', 'F#m': 'ii', 'G#m': 'iii', 'A': 'IV', 'B': 'V', 'C#m': 'vi', 'D#dim': 'vii°' },
  'B': { 'B': 'I', 'C#m': 'ii', 'D#m': 'iii', 'E': 'IV', 'F#': 'V', 'G#m': 'vi', 'A#dim': 'vii°' },
  'F#': { 'F#': 'I', 'G#m': 'ii', 'A#m': 'iii', 'B': 'IV', 'C#': 'V', 'D#m': 'vi', 'E#dim': 'vii°' },
  'F': { 'F': 'I', 'Gm': 'ii', 'Am': 'iii', 'Bb': 'IV', 'C': 'V', 'Dm': 'vi', 'Edim': 'vii°' },
  'Bb': { 'Bb': 'I', 'Cm': 'ii', 'Dm': 'iii', 'Eb': 'IV', 'F': 'V', 'Gm': 'vi', 'Adim': 'vii°' },
  'Eb': { 'Eb': 'I', 'Fm': 'ii', 'Gm': 'iii', 'Ab': 'IV', 'Bb': 'V', 'Cm': 'vi', 'Ddim': 'vii°' },
  'Ab': { 'Ab': 'I', 'Bbm': 'ii', 'Cm': 'iii', 'Db': 'IV', 'Eb': 'V', 'Fm': 'vi', 'Gdim': 'vii°' },
  'Db': { 'Db': 'I', 'Ebm': 'ii', 'Fm': 'iii', 'Gb': 'IV', 'Ab': 'V', 'Bbm': 'vi', 'Cdim': 'vii°' },
};

const COMMON_CHORDS = [
  'C', 'Cm', 'C7', 'Cmaj7',
  'D', 'Dm', 'D7', 'Dmaj7',
  'E', 'Em', 'E7', 'Emaj7',
  'F', 'Fm', 'F7', 'Fmaj7',
  'G', 'Gm', 'G7', 'Gmaj7',
  'A', 'Am', 'A7', 'Amaj7',
  'B', 'Bm', 'B7', 'Bmaj7',
  'Bb', 'Bbm',
  'Ab', 'Abm',
  'Eb', 'Ebm',
  'F#', 'F#m',
  'C#', 'C#m',
  'G#', 'G#m',
  'D#', 'D#m',
  'A#', 'A#m',
];

const PROGRESSIONS = {
  'I-V-vi-IV': 'Pop progression',
  'vi-IV-I-V': 'Pop variation',
  'I-IV-V': 'Classic blues',
  'I-vi-IV-V': 'Doo-wop',
  'ii-V-I': 'Jazz standard',
};

export default function KeyFinder() {
  const [selectedChords, setSelectedChords] = useState([]);

  const toggleChord = (chord) => {
    setSelectedChords((prev) =>
      prev.includes(chord) ? prev.filter((c) => c !== chord) : [...prev, chord]
    );
  };

  const analysis = useMemo(() => {
    if (selectedChords.length === 0) return null;

    let bestKey = null;
    let bestMatch = 0;

    Object.entries(MAJOR_KEYS).forEach(([key, diatonic]) => {
      const matches = selectedChords.filter((chord) => {
        const baseChord = chord.replace(/7|maj7|add9|sus|#|b/g, '');
        return diatonic.some((d) => d.startsWith(baseChord));
      }).length;

      if (matches > bestMatch) {
        bestMatch = matches;
        bestKey = key;
      }
    });

    const confidence = bestKey ? Math.round((bestMatch / selectedChords.length) * 100) : 0;
    const relativeMinor = bestKey ? RELATIVE_MINOR[bestKey] : null;
    const keyDiatonic = bestKey ? MAJOR_KEYS[bestKey] : [];
    const romanMap = bestKey ? ROMAN_NUMERALS[bestKey] : {};

    const chordAnalysis = selectedChords.map((chord) => {
      const roman = romanMap[chord] || '?';
      return `${chord}=${roman}`;
    }).join(', ');

    let progressionName = 'Unknown';
    if (selectedChords.length >= 3) {
      const chordSequence = selectedChords.slice(0, 4).join('-');
      for (const [prog, name] of Object.entries(PROGRESSIONS)) {
        if (chordSequence.includes(prog.split('-').join(''))) {
          progressionName = name;
          break;
        }
      }
    }

    return {
      key: bestKey,
      relativeMinor,
      confidence,
      chordAnalysis,
      diatonic: keyDiatonic,
      progressionName,
    };
  }, [selectedChords]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
          Select Chords Used
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMMON_CHORDS.map((chord) => (
            <button
              key={chord}
              onClick={() => toggleChord(chord)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedChords.includes(chord)
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
              }`}
            >
              {chord}
            </button>
          ))}
        </div>
      </div>

      {selectedChords.length > 0 && (
        <Card className="bg-accent/5 border border-accent/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-text-primary">
                {analysis?.key} Major / {analysis?.relativeMinor} Minor
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Confidence: {analysis?.confidence}%
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-text-primary">
                {Math.round((analysis?.confidence || 0) / 10) * 10}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-2">
                Roman Numeral Analysis
              </h4>
              <p className="font-mono text-sm text-text-primary bg-white p-3 rounded border border-accent/10">
                {analysis?.chordAnalysis}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-2">
                Progression
              </h4>
              <p className="text-sm text-text-secondary">
                {analysis?.progressionName}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-2">
                All Diatonic Chords in {analysis?.key}
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis?.diatonic.map((chord) => (
                  <span
                    key={chord}
                    className="px-3 py-1 bg-white border border-accent/10 rounded text-sm text-text-primary"
                  >
                    {chord}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {selectedChords.length > 0 && (
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setSelectedChords([])}
            className="flex-1"
          >
            Clear All
          </Button>
        </div>
      )}

      {selectedChords.length === 0 && (
        <p className="text-sm text-text-secondary italic">
          Click on chord buttons to analyze the key of your song.
        </p>
      )}
    </div>
  );
}
