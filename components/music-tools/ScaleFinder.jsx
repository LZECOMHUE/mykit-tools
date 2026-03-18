'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SCALES = [
  { id: 'major',        name: 'Major (Ionian)',      intervals: [0,2,4,5,7,9,11], mood: 'Bright, happy, resolved',           formula: 'W W H W W W H',     chords: ['I','ii','iii','IV','V','vi','vii\u00B0'] },
  { id: 'minor',        name: 'Natural Minor',        intervals: [0,2,3,5,7,8,10], mood: 'Dark, sad, introspective',           formula: 'W H W W H W W',     chords: ['i','ii\u00B0','III','iv','v','VI','VII'] },
  { id: 'pent-maj',     name: 'Pentatonic Major',     intervals: [0,2,4,7,9],       mood: 'Open, folk, simple',                 formula: 'W W 1.5 W 1.5',     chords: ['I','ii','iii','V','vi'] },
  { id: 'pent-min',     name: 'Pentatonic Minor',     intervals: [0,3,5,7,10],      mood: 'Bluesy, soulful, expressive',        formula: '1.5 W W 1.5 W',     chords: ['i','III','iv','v','VII'] },
  { id: 'blues',        name: 'Blues',                 intervals: [0,3,5,6,7,10],    mood: 'Gritty, soulful, bluesy',            formula: '1.5 W H H 1.5 W',   chords: ['I7','IV7','V7'] },
  { id: 'harm-min',     name: 'Harmonic Minor',        intervals: [0,2,3,5,7,8,11], mood: 'Exotic, dramatic, dark',             formula: 'W H W W H 1.5 H',   chords: ['i','ii\u00B0','III+','iv','V','VI','vii\u00B07'] },
  { id: 'mel-min',      name: 'Melodic Minor',         intervals: [0,2,3,5,7,9,11], mood: 'Sophisticated, jazzy',               formula: 'W H W W W W H',     chords: ['i','ii','III+','IV','V','vi\u00B0','vii\u00B07'] },
  { id: 'dorian',       name: 'Dorian',                intervals: [0,2,3,5,7,9,10], mood: 'Cool, jazzy, slightly dark',         formula: 'W H W W W H W',     chords: ['i','ii','III','IV','v','vi\u00B0','VII'] },
  { id: 'mixolydian',   name: 'Mixolydian',            intervals: [0,2,4,5,7,9,10], mood: 'Bluesy, funky, groovy',              formula: 'W W H W W H W',     chords: ['I','ii','iii\u00B0','IV','v','vi','VII'] },
  { id: 'phrygian',     name: 'Phrygian',              intervals: [0,1,3,5,7,8,10], mood: 'Exotic, Spanish, intense',           formula: 'H W W W H W W',     chords: ['i','II','III','iv','v\u00B0','VI','vii'] },
  { id: 'lydian',       name: 'Lydian',                intervals: [0,2,4,6,7,9,11], mood: 'Ethereal, dreamy, bright',           formula: 'W W W H W W H',     chords: ['I','II','iii','#iv\u00B0','V','vi','vii'] },
  { id: 'locrian',      name: 'Locrian',               intervals: [0,1,3,5,6,8,10], mood: 'Dark, dissonant, tense',             formula: 'H W W H W W W',     chords: ['i\u00B0','II','iii','iv','V','VI','vii'] },
  { id: 'whole-tone',   name: 'Whole Tone',            intervals: [0,2,4,6,8,10],   mood: 'Floating, dreamlike',                formula: 'W W W W W W',       chords: null },
  { id: 'chromatic',    name: 'Chromatic',             intervals: [0,1,2,3,4,5,6,7,8,9,10,11], mood: 'All pitches',            formula: 'H H H H H H H H H H H H', chords: null },
];

// Standard tuning open string note indices
const TUNING = [
  { note: 'E', noteIdx: 4 },  // low E (string 6)
  { note: 'A', noteIdx: 9 },
  { note: 'D', noteIdx: 2 },
  { note: 'G', noteIdx: 7 },
  { note: 'B', noteIdx: 11 },
  { note: 'E', noteIdx: 4 },  // high E (string 1)
];

const FRET_COUNT = 15;

export default function ScaleFinder() {
  const [rootNote, setRootNote] = useState('C');
  const [scaleId, setScaleId] = useState('pent-min');
  const [displayMode, setDisplayMode] = useState('notes');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const playTimeoutRef = useRef(null);

  const scale = useMemo(() => SCALES.find(s => s.id === scaleId) || SCALES[0], [scaleId]);
  const rootIdx = NOTES.indexOf(rootNote);

  // Which note indices (0-11) are in the scale
  const scaleNoteSet = useMemo(() => {
    return new Set(scale.intervals.map(i => (rootIdx + i) % 12));
  }, [scale, rootIdx]);

  // Named scale notes
  const scaleNoteNames = useMemo(() => {
    return scale.intervals.map(i => NOTES[(rootIdx + i) % 12]);
  }, [scale, rootIdx]);

  // Get interval number for a note (1-indexed)
  const getInterval = (noteIdx) => {
    const semis = (noteIdx - rootIdx + 12) % 12;
    const idx = scale.intervals.indexOf(semis);
    return idx >= 0 ? idx + 1 : null;
  };

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
    return audioContextRef.current;
  };

  const handlePlayScale = () => {
    const ctx = getAudioContext();
    setIsPlaying(true);
    if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);

    const baseFreq = 261.63 * Math.pow(2, rootIdx / 12); // root in octave 4

    scale.intervals.forEach((semis, i) => {
      const freq = baseFreq * Math.pow(2, semis / 12);
      const startTime = ctx.currentTime + i * 0.3;

      // Fundamental + one harmonic for warmth
      [1, 2].forEach((mult, mi) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, startTime);
        gain.gain.setValueAtTime(mi === 0 ? 0.18 : 0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    });

    playTimeoutRef.current = setTimeout(() => setIsPlaying(false), scale.intervals.length * 300 + 500);
  };

  // Dot colour based on interval
  const getDotColor = (noteIdx) => {
    if (noteIdx === rootIdx) return { bg: '#dc2626', border: '#991b1b' }; // red root
    const semis = (noteIdx - rootIdx + 12) % 12;
    // Fifth = green, third = amber, others = blue
    if (semis === 7) return { bg: '#16a34a', border: '#166534' };
    if (semis === 3 || semis === 4) return { bg: '#d97706', border: '#92400e' };
    return { bg: '#3b82f6', border: '#1e40af' };
  };

  // Scale selector options
  const scaleOptions = SCALES.map(s => ({ value: s.id, label: s.name }));

  // SVG dimensions
  const stringSpacing = 30;
  const fretWidth = 52;
  const nutX = 45;      // x where nut sits
  const openX = 20;     // x for open string dots
  const topPad = 20;
  const svgH = topPad + 5 * stringSpacing + 30;
  const svgW = nutX + FRET_COUNT * fretWidth + 20;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* ── Controls ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {/* Root note */}
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Root Note</p>
          <div className="flex flex-wrap gap-1">
            {NOTES.map(note => (
              <button
                key={note}
                onClick={() => setRootNote(note)}
                className={`w-9 h-9 rounded-lg font-mono text-sm font-bold transition-all ${
                  rootNote === note
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-surface border border-border hover:bg-surface-hover text-text-primary'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Scale type */}
        <div>
          <Select
            label="Scale"
            options={scaleOptions}
            value={scaleId}
            onChange={(e) => setScaleId(e.target.value)}
          />
          <p className="text-xs text-text-muted mt-1.5">{scale.mood}</p>
        </div>

        {/* Display mode + play */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Display</p>
          <div className="flex gap-1">
            {[
              { value: 'notes', label: 'Notes' },
              { value: 'intervals', label: 'Degrees' },
            ].map(m => (
              <button
                key={m.value}
                onClick={() => setDisplayMode(m.value)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  displayMode === m.value
                    ? 'bg-accent text-white'
                    : 'border border-border hover:bg-surface-hover text-text-primary'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <Button
            onClick={handlePlayScale}
            disabled={isPlaying}
            variant="primary"
            className="w-full"
          >
            {isPlaying ? 'Playing...' : 'Play Scale'}
          </Button>
        </div>
      </div>

      {/* ── Scale notes bar ── */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {scaleNoteNames.map((note, i) => {
          const noteIdx = (rootIdx + scale.intervals[i]) % 12;
          const colors = getDotColor(noteIdx);
          return (
            <div
              key={i}
              className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white"
              style={{ backgroundColor: colors.bg }}
            >
              {note}
            </div>
          );
        })}
        <div className="flex items-center ml-2 gap-3 text-[10px] text-text-muted">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Root</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> 3rd</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" /> 5th</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Other</span>
        </div>
      </div>

      {/* ── Fretboard ── */}
      <div className="mb-5 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-800 p-3 sm:p-4 shadow-xl overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto"
          style={{ minWidth: '650px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Fretboard wood */}
          <defs>
            <linearGradient id="sfWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#3d2b1f', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#4a3728', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3d2b1f', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <rect
            x={nutX}
            y={topPad - 8}
            width={FRET_COUNT * fretWidth}
            height={5 * stringSpacing + 16}
            fill="url(#sfWood)"
            rx="4"
          />

          {/* Nut */}
          <rect x={nutX - 3} y={topPad - 8} width={6} height={5 * stringSpacing + 16} fill="#e8dcc8" rx="1" />

          {/* Frets */}
          {Array.from({ length: FRET_COUNT }).map((_, f) => {
            const x = nutX + (f + 1) * fretWidth;
            return (
              <line
                key={`f-${f}`}
                x1={x} y1={topPad - 6}
                x2={x} y2={topPad + 5 * stringSpacing + 6}
                stroke="#c9a961" strokeWidth="2.5" opacity="0.6"
              />
            );
          })}

          {/* Fret numbers */}
          {Array.from({ length: FRET_COUNT }).map((_, f) => (
            <text
              key={`fn-${f}`}
              x={nutX + (f + 0.5) * fretWidth}
              y={topPad + 5 * stringSpacing + 24}
              textAnchor="middle"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
              fill="#a8a29e"
            >
              {f + 1}
            </text>
          ))}

          {/* Inlay dots */}
          {[3, 5, 7, 9].map(f => (
            <circle
              key={`inlay-${f}`}
              cx={nutX + (f - 0.5) * fretWidth}
              cy={topPad + 2.5 * stringSpacing}
              r="4" fill="#6b5b4a" opacity="0.5"
            />
          ))}
          {/* Double dot at 12 */}
          <circle cx={nutX + 11.5 * fretWidth} cy={topPad + 1.5 * stringSpacing} r="4" fill="#6b5b4a" opacity="0.5" />
          <circle cx={nutX + 11.5 * fretWidth} cy={topPad + 3.5 * stringSpacing} r="4" fill="#6b5b4a" opacity="0.5" />

          {/* Strings + dots */}
          {TUNING.map((str, si) => {
            const y = topPad + si * stringSpacing;
            const thickness = 2.8 - si * 0.3;

            return (
              <g key={`s-${si}`}>
                {/* String line */}
                <line
                  x1={nutX}
                  y1={y}
                  x2={nutX + FRET_COUNT * fretWidth}
                  y2={y}
                  stroke="#c8a882"
                  strokeWidth={thickness}
                  opacity="0.6"
                />

                {/* String label */}
                <text
                  x={8}
                  y={y + 4}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="'JetBrains Mono', monospace"
                  fill="#a8a29e"
                >
                  {str.note}
                </text>

                {/* Open string dot */}
                {scaleNoteSet.has(str.noteIdx) && (() => {
                  const colors = getDotColor(str.noteIdx);
                  const intervalNum = getInterval(str.noteIdx);
                  const label = displayMode === 'notes' ? str.note : (intervalNum || '');
                  return (
                    <g>
                      <circle cx={openX + 12} cy={y} r="10" fill={colors.bg} opacity="0.9" />
                      <text
                        x={openX + 12} y={y + 4}
                        textAnchor="middle" fill="white"
                        fontSize="9" fontWeight="700"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        {label}
                      </text>
                    </g>
                  );
                })()}

                {/* Fretted dots */}
                {Array.from({ length: FRET_COUNT }).map((_, f) => {
                  const noteIdx = (str.noteIdx + f + 1) % 12;
                  if (!scaleNoteSet.has(noteIdx)) return null;

                  const cx = nutX + (f + 0.5) * fretWidth;
                  const colors = getDotColor(noteIdx);
                  const intervalNum = getInterval(noteIdx);
                  const label = displayMode === 'notes' ? NOTES[noteIdx] : (intervalNum || '');

                  return (
                    <g key={`d-${si}-${f}`}>
                      <circle cx={cx} cy={y} r="10" fill={colors.bg} opacity="0.9" />
                      <circle cx={cx} cy={y} r="10" fill="none" stroke={colors.border} strokeWidth="1" opacity="0.4" />
                      <text
                        x={cx} y={y + 4}
                        textAnchor="middle" fill="white"
                        fontSize="9" fontWeight="700"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        {label}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Info panels ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-surface border border-border rounded-xl">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Formula</p>
          <p className="font-mono text-xs text-text-primary">{scale.formula}</p>
        </div>
        <div className="p-3 bg-surface border border-border rounded-xl">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Notes</p>
          <p className="font-mono text-xs text-text-primary">{scaleNoteNames.join('  ')}</p>
        </div>
        <div className="p-3 bg-surface border border-border rounded-xl">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Character</p>
          <p className="text-xs text-text-secondary">{scale.mood}</p>
        </div>
        <div className="p-3 bg-surface border border-border rounded-xl">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Chords</p>
          <p className="font-mono text-xs text-text-primary">
            {scale.chords ? scale.chords.join('  ') : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
