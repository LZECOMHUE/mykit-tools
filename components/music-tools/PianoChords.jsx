'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const DISPLAY_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const CHORD_FORMULAS = {
  major:  { semitones: [0, 4, 7],         label: 'Major (1 3 5)' },
  minor:  { semitones: [0, 3, 7],         label: 'Minor (1 b3 5)' },
  7:      { semitones: [0, 4, 7, 10],     label: 'Dominant 7 (1 3 5 b7)' },
  maj7:   { semitones: [0, 4, 7, 11],     label: 'Major 7 (1 3 5 7)' },
  min7:   { semitones: [0, 3, 7, 10],     label: 'Minor 7 (1 b3 5 b7)' },
  dim:    { semitones: [0, 3, 6],         label: 'Diminished (1 b3 b5)' },
  aug:    { semitones: [0, 4, 8],         label: 'Augmented (1 3 #5)' },
  sus2:   { semitones: [0, 2, 7],         label: 'Sus 2 (1 2 5)' },
  sus4:   { semitones: [0, 5, 7],         label: 'Sus 4 (1 4 5)' },
  min9:   { semitones: [0, 3, 7, 10, 14], label: 'Minor 9 (1 b3 5 b7 9)' },
  9:      { semitones: [0, 4, 7, 10, 14], label: 'Dominant 9 (1 3 5 b7 9)' },
  add9:   { semitones: [0, 4, 7, 14],     label: 'Add 9 (1 3 5 9)' },
};

// MIDI note 60 = C4 (middle C)
function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Build 2 octaves of piano keys starting from C4 (MIDI 60)
function buildPianoKeys() {
  const keys = [];
  const startMidi = 60; // C4
  const endMidi = 84;   // C6

  // White key note indices within an octave: C=0, D=2, E=4, F=5, G=7, A=9, B=11
  const whiteNoteIndices = [0, 2, 4, 5, 7, 9, 11];
  // Black key note indices: C#=1, D#=3, F#=6, G#=8, A#=10
  const blackNoteIndices = [1, 3, 6, 8, 10];

  let whiteIdx = 0;

  for (let midi = startMidi; midi <= endMidi; midi++) {
    const noteInOctave = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    const isBlack = blackNoteIndices.includes(noteInOctave);

    if (!isBlack) {
      keys.push({
        midi,
        note: ALL_NOTES[noteInOctave],
        displayNote: DISPLAY_NOTES[noteInOctave],
        octave,
        isBlack: false,
        whiteIndex: whiteIdx,
      });
      whiteIdx++;
    }
  }

  // Add black keys separately so we know white key positions
  for (let midi = startMidi; midi <= endMidi; midi++) {
    const noteInOctave = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    const isBlack = blackNoteIndices.includes(noteInOctave);

    if (isBlack) {
      // Find the white key just below this black key
      const whiteBelow = keys.find(k => !k.isBlack && k.midi === midi - 1);
      keys.push({
        midi,
        note: ALL_NOTES[noteInOctave],
        displayNote: DISPLAY_NOTES[noteInOctave],
        octave,
        isBlack: true,
        whiteIndexBefore: whiteBelow ? whiteBelow.whiteIndex : 0,
      });
    }
  }

  return keys;
}

const PIANO_KEYS = buildPianoKeys();

export default function PianoChords() {
  const [rootNote, setRootNote] = useState(0);
  const [chordType, setChordType] = useState('major');
  const [inversion, setInversion] = useState('root');
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainsRef = useRef([]);

  const chordFormula = CHORD_FORMULAS[chordType];

  // Calculate chord MIDI notes
  const chordMidiNotes = useMemo(() => {
    const baseMidi = 60 + rootNote; // Root in octave 4
    let midiNotes = chordFormula.semitones.map(s => baseMidi + s);

    // Apply inversions by raising the bottom notes up an octave
    if (inversion === 'first' && midiNotes.length > 1) {
      midiNotes[0] += 12;
      midiNotes.sort((a, b) => a - b);
    } else if (inversion === 'second' && midiNotes.length > 2) {
      midiNotes[0] += 12;
      midiNotes[1] += 12;
      midiNotes.sort((a, b) => a - b);
    }

    return midiNotes;
  }, [rootNote, chordType, inversion, chordFormula]);

  const chordNoteNames = useMemo(() => {
    return chordMidiNotes.map(midi => DISPLAY_NOTES[midi % 12]);
  }, [chordMidiNotes]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const stopAll = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    oscillatorsRef.current = [];
    gainsRef.current = [];
  };

  const playChord = () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    stopAll();

    chordMidiNotes.forEach((midi, i) => {
      const freq = midiToFreq(midi);

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      // Piano-like harmonics
      const harmonics = [
        { mult: 1, g: 1.0 },
        { mult: 2, g: 0.4 },
        { mult: 3, g: 0.15 },
        { mult: 4, g: 0.06 },
      ];

      harmonics.forEach(({ mult, g }) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, ctx.currentTime);

        const hGain = ctx.createGain();
        hGain.gain.setValueAtTime(g * 0.5, ctx.currentTime);
        hGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5 - mult * 0.1);

        osc.connect(hGain);
        hGain.connect(masterGain);
        osc.start(ctx.currentTime + i * 0.02);
        osc.stop(ctx.currentTime + 2.5);

        oscillatorsRef.current.push(osc);
      });

      gainsRef.current.push(masterGain);
    });
  };

  // SVG layout
  const ww = 36;  // white key width
  const wh = 160; // white key height
  const bw = 22;  // black key width
  const bh = 100; // black key height
  const whiteKeys = PIANO_KEYS.filter(k => !k.isBlack);
  const blackKeys = PIANO_KEYS.filter(k => k.isBlack);
  const totalWidth = whiteKeys.length * ww;
  const svgHeight = wh + 28; // extra for labels

  const isHighlighted = (midi) => chordMidiNotes.includes(midi);
  const isRoot = (midi) => midi % 12 === rootNote && chordMidiNotes.includes(midi);

  const rootNoteOptions = DISPLAY_NOTES.map((note, idx) => ({
    value: String(idx),
    label: note,
  }));

  const chordTypeOptions = Object.entries(CHORD_FORMULAS).map(([key, { label }]) => ({
    value: key,
    label,
  }));

  const inversionOptions = [
    { value: 'root', label: 'Root Position' },
    { value: 'first', label: '1st Inversion' },
    { value: 'second', label: '2nd Inversion' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Select
          label="Root Note"
          options={rootNoteOptions}
          value={String(rootNote)}
          onChange={(e) => setRootNote(Number(e.target.value))}
        />
        <Select
          label="Chord Type"
          options={chordTypeOptions}
          value={chordType}
          onChange={(e) => setChordType(e.target.value)}
        />
        <Select
          label="Inversion"
          options={inversionOptions}
          value={inversion}
          onChange={(e) => setInversion(e.target.value)}
        />
      </div>

      {/* Chord Info */}
      <div className="mb-6 p-4 bg-surface border border-border rounded-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-heading font-bold text-2xl text-text-primary">
                {DISPLAY_NOTES[rootNote]}
              </span>
              <span className="font-mono text-lg text-accent">
                {chordType === 'major' ? '' : chordType === 'minor' ? 'm' : chordType}
              </span>
              {inversion !== 'root' && (
                <span className="text-sm text-text-muted ml-1">
                  ({inversion === 'first' ? '1st inv.' : '2nd inv.'})
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Notes:</span>
              <div className="flex gap-1.5">
                {chordNoteNames.map((note, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-sm ${
                      i === 0
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-accent/10 text-accent border border-accent/20'
                    }`}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={playChord} variant="primary" size="lg">
            Play Chord
          </Button>
        </div>
      </div>

      {/* Piano Keyboard */}
      <div className="mb-6 overflow-x-auto rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-800 p-4 shadow-xl">
        <svg
          viewBox={`0 0 ${totalWidth} ${svgHeight}`}
          className="w-full h-auto"
          style={{ minWidth: '500px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* White keys first (background layer) */}
          {whiteKeys.map((key) => {
            const x = key.whiteIndex * ww;
            const highlighted = isHighlighted(key.midi);
            const root = isRoot(key.midi);

            return (
              <g key={`w-${key.midi}`}>
                <rect
                  x={x + 1}
                  y={0}
                  width={ww - 2}
                  height={wh}
                  rx={3}
                  fill={root ? '#ef4444' : highlighted ? '#3b82f6' : '#ffffff'}
                  stroke={root || highlighted ? 'transparent' : '#d4d4d4'}
                  strokeWidth="1"
                />
                {/* Bottom rounded corners simulation */}
                <rect
                  x={x + 1}
                  y={0}
                  width={ww - 2}
                  height={wh - 4}
                  fill={root ? '#ef4444' : highlighted ? '#3b82f6' : '#ffffff'}
                  stroke={root || highlighted ? 'transparent' : '#d4d4d4'}
                  strokeWidth="1"
                />
                <rect
                  x={x + 1}
                  y={wh - 8}
                  width={ww - 2}
                  height={8}
                  rx={3}
                  fill={root ? '#dc2626' : highlighted ? '#2563eb' : '#f5f5f5'}
                />
                {/* Note label */}
                <text
                  x={x + ww / 2}
                  y={wh + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={highlighted ? '700' : '500'}
                  fontFamily="'JetBrains Mono', monospace"
                  fill={highlighted ? '#ffffff' : '#a3a3a3'}
                >
                  {key.displayNote}
                </text>
              </g>
            );
          })}

          {/* Black keys (foreground layer) */}
          {blackKeys.map((key) => {
            const x = (key.whiteIndexBefore + 1) * ww - bw / 2;
            const highlighted = isHighlighted(key.midi);
            const root = isRoot(key.midi);

            return (
              <g key={`b-${key.midi}`}>
                <rect
                  x={x}
                  y={0}
                  width={bw}
                  height={bh}
                  rx={3}
                  fill={root ? '#ef4444' : highlighted ? '#3b82f6' : '#1a1a1a'}
                  stroke={root || highlighted ? 'transparent' : '#000000'}
                  strokeWidth="0.5"
                />
                {/* Subtle highlight on top of black key */}
                <rect
                  x={x + 2}
                  y={1}
                  width={bw - 4}
                  height={bh * 0.6}
                  rx={2}
                  fill={root ? '#f87171' : highlighted ? '#60a5fa' : '#2a2a2a'}
                  opacity="0.5"
                />
                {/* Bottom shadow on black key */}
                <rect
                  x={x}
                  y={bh - 6}
                  width={bw}
                  height={6}
                  rx={3}
                  fill={root ? '#b91c1c' : highlighted ? '#1d4ed8' : '#0a0a0a'}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span>Root</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent" />
          <span>Chord tones</span>
        </div>
      </div>

      {/* Formula info */}
      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
        <h4 className="font-heading font-bold text-text-primary mb-2">Interval Formula</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {chordFormula.semitones.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-10 rounded-lg bg-surface border border-border flex items-center justify-center font-mono font-bold text-text-primary">
                {s}
              </div>
              <div className="text-[10px] text-text-muted mt-1">{chordNoteNames[i]}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-secondary">
          Numbers show semitones from the root. Each semitone is one piano key (including black keys) up from the root note.
        </p>
      </div>
    </div>
  );
}
