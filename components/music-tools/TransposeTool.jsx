'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const NOTE_SEQUENCE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const ALL_MAJOR_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Bb', 'Eb', 'Ab', 'Db'];

function getChordRoot(chord) {
  const match = chord.match(/^([A-G]#?b?)/);
  return match ? match[1] : null;
}

function getChordQuality(chord) {
  const root = getChordRoot(chord);
  return root ? chord.slice(root.length) : '';
}

function transposeNote(note, semitones) {
  const index = NOTE_SEQUENCE.indexOf(note);
  if (index === -1) return note;
  const newIndex = (index + semitones + 120) % 12;
  return NOTE_SEQUENCE[newIndex];
}

function transposeChord(chord, semitones) {
  const root = getChordRoot(chord);
  const quality = getChordQuality(chord);
  if (!root) return chord;
  const newRoot = transposeNote(root, semitones);
  return newRoot + quality;
}

function semitonesBetween(noteA, noteB) {
  const indexA = NOTE_SEQUENCE.indexOf(noteA);
  const indexB = NOTE_SEQUENCE.indexOf(noteB);
  if (indexA === -1 || indexB === -1) return 0;
  return (indexB - indexA + 12) % 12;
}

function getEasierCapoShapes(originalChords, targetKey) {
  const capoSuggestions = [];
  for (let capo = 1; capo <= 6; capo++) {
    const transposedUp = originalChords.map((c) => transposeChord(c, capo));
    const difficulty = transposedUp.join('').length;
    capoSuggestions.push({
      fret: capo,
      chords: transposedUp,
      difficulty,
    });
  }
  capoSuggestions.sort((a, b) => a.difficulty - b.difficulty);
  return capoSuggestions[0];
}

export default function TransposeTool() {
  const [input, setInput] = useState('G Em C D');
  const [transposition, setTransposition] = useState(0);
  const [capoPosition, setCapoPosition] = useState(0);
  const [targetKey, setTargetKey] = useState('');

  const originalChords = useMemo(() => {
    return input
      .split(/[\s,]+/)
      .filter((c) => c.trim().length > 0)
      .map((c) => c.trim());
  }, [input]);

  const transposedChords = useMemo(() => {
    return originalChords.map((chord) => transposeChord(chord, transposition));
  }, [originalChords, transposition]);

  const capoSuggestion = useMemo(() => {
    if (originalChords.length === 0) return null;
    return getEasierCapoShapes(originalChords, targetKey);
  }, [originalChords, targetKey]);

  const handleTargetKey = (key) => {
    if (originalChords.length === 0) return;
    const firstChordRoot = getChordRoot(originalChords[0]);
    if (!firstChordRoot) return;
    const semitones = semitonesBetween(firstChordRoot, key);
    setTransposition(semitones);
    setTargetKey(key);
  };

  const handleTranspositionChange = (semitones) => {
    setTransposition(semitones);
    setTargetKey('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Enter Chord Progression
        </label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., G Em C D (space or comma separated)"
          className="font-mono"
        />
        <p className="text-xs text-text-secondary mt-1">
          Separate chords with spaces or commas
        </p>
      </div>

      {originalChords.length > 0 && (
        <>
          <Card>
            <h3 className="font-heading font-semibold text-text-primary mb-3">
              Original Chords
            </h3>
            <div className="flex flex-wrap gap-3">
              {originalChords.map((chord, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-surface border border-border rounded-lg"
                >
                  <span className="font-mono text-lg font-bold text-text-primary">
                    {chord}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-3">
              Transpose
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((semitones) => (
                  <button
                    key={semitones}
                    onClick={() => handleTranspositionChange(semitones)}
                    className={`px-2 py-2 rounded font-mono text-sm font-bold transition-all ${
                      transposition === semitones
                        ? 'bg-accent text-white'
                        : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    {semitones > 0 ? '+' : ''}{semitones}
                  </button>
                ))}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Or choose target key
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {ALL_MAJOR_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleTargetKey(key)}
                      className={`px-3 py-2 rounded text-sm font-bold transition-all ${
                        targetKey === key
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-accent/5 border border-accent/10">
            <h3 className="font-heading font-semibold text-text-primary mb-3">
              Transposed to {transposition > 0 ? '+' : ''}{transposition} semitones
            </h3>
            <div className="flex flex-wrap gap-3">
              {transposedChords.map((chord, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-white border border-accent/10 rounded-lg"
                >
                  <span className="font-mono text-lg font-bold text-text-primary">
                    {chord}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {capoSuggestion && (
            <Card className="bg-accent-warm/5 border border-accent-warm/10">
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                Capo Suggestion
              </h3>
              <p className="text-text-primary font-mono text-lg font-bold mb-3">
                Capo on fret {capoSuggestion.fret}
              </p>
              <p className="text-sm text-text-secondary mb-3">
                Play these shapes at original pitch:
              </p>
              <div className="flex flex-wrap gap-3">
                {capoSuggestion.chords.map((chord, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white border border-accent-warm/10 rounded-lg"
                  >
                    <span className="font-mono font-bold text-text-primary">
                      {chord}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setInput('')} className="flex-1">
              Clear
            </Button>
          </div>
        </>
      )}

      {originalChords.length === 0 && (
        <p className="text-sm text-text-secondary italic">
          Enter a chord progression to transpose.
        </p>
      )}
    </div>
  );
}
