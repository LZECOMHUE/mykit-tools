'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const KEYS = [
  { major: 'C',  minor: 'Am',  sig: '0',  sigLabel: 'No sharps or flats' },
  { major: 'G',  minor: 'Em',  sig: '1#', sigLabel: '1 sharp (F#)' },
  { major: 'D',  minor: 'Bm',  sig: '2#', sigLabel: '2 sharps (F#, C#)' },
  { major: 'A',  minor: 'F#m', sig: '3#', sigLabel: '3 sharps (F#, C#, G#)' },
  { major: 'E',  minor: 'C#m', sig: '4#', sigLabel: '4 sharps (F#, C#, G#, D#)' },
  { major: 'B',  minor: 'G#m', sig: '5#', sigLabel: '5 sharps (F#, C#, G#, D#, A#)' },
  { major: 'F#', minor: 'D#m', sig: '6#', sigLabel: '6 sharps (F#, C#, G#, D#, A#, E#)' },
  { major: 'Db', minor: 'Bbm', sig: '5b', sigLabel: '5 flats (Bb, Eb, Ab, Db, Gb)' },
  { major: 'Ab', minor: 'Fm',  sig: '4b', sigLabel: '4 flats (Bb, Eb, Ab, Db)' },
  { major: 'Eb', minor: 'Cm',  sig: '3b', sigLabel: '3 flats (Bb, Eb, Ab)' },
  { major: 'Bb', minor: 'Gm',  sig: '2b', sigLabel: '2 flats (Bb, Eb)' },
  { major: 'F',  minor: 'Dm',  sig: '1b', sigLabel: '1 flat (Bb)' },
];

// Scale patterns in semitones from root
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];
const SCALE_DEGREES_MAJOR = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u00B0'];
const CHORD_QUALITIES_MAJOR = ['Major', 'Minor', 'Minor', 'Major', 'Major', 'Minor', 'Diminished'];

// Segment colours for the circle - warm to cool gradient around the wheel
const SEGMENT_COLORS = [
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e', '#ef4444',
  '#f97316', '#eab308', '#84cc16', '#22c55e',
];

const INTERVALS = [
  { name: 'Unison', short: 'P1', semitones: 0, example: 'C - C', character: 'Perfect, identical' },
  { name: 'Minor 2nd', short: 'm2', semitones: 1, example: 'C - Db', character: 'Dissonant, tense' },
  { name: 'Major 2nd', short: 'M2', semitones: 2, example: 'C - D', character: 'Bright, stepping' },
  { name: 'Minor 3rd', short: 'm3', semitones: 3, example: 'C - Eb', character: 'Sad, warm, minor' },
  { name: 'Major 3rd', short: 'M3', semitones: 4, example: 'C - E', character: 'Happy, bright, major' },
  { name: 'Perfect 4th', short: 'P4', semitones: 5, example: 'C - F', character: 'Open, hymn-like' },
  { name: 'Tritone', short: 'TT', semitones: 6, example: 'C - F#', character: 'Tense, unstable' },
  { name: 'Perfect 5th', short: 'P5', semitones: 7, example: 'C - G', character: 'Open, powerful' },
  { name: 'Minor 6th', short: 'm6', semitones: 8, example: 'C - Ab', character: 'Bittersweet' },
  { name: 'Major 6th', short: 'M6', semitones: 9, example: 'C - A', character: 'Warm, pleasant' },
  { name: 'Minor 7th', short: 'm7', semitones: 10, example: 'C - Bb', character: 'Bluesy, soulful' },
  { name: 'Major 7th', short: 'M7', semitones: 11, example: 'C - B', character: 'Dreamy, leading' },
  { name: 'Octave', short: 'P8', semitones: 12, example: 'C - C', character: 'Perfect, same tone' },
];

const CHORD_TYPES = [
  { name: 'Major', symbol: '', formula: '1  3  5', semitones: [0, 4, 7], character: 'Bright, happy, resolved' },
  { name: 'Minor', symbol: 'm', formula: '1  b3  5', semitones: [0, 3, 7], character: 'Dark, sad, introspective' },
  { name: 'Dominant 7', symbol: '7', formula: '1  3  5  b7', semitones: [0, 4, 7, 10], character: 'Bluesy, wants to resolve' },
  { name: 'Major 7', symbol: 'maj7', formula: '1  3  5  7', semitones: [0, 4, 7, 11], character: 'Jazzy, sophisticated' },
  { name: 'Minor 7', symbol: 'm7', formula: '1  b3  5  b7', semitones: [0, 3, 7, 10], character: 'Smooth, warm, funky' },
  { name: 'Diminished', symbol: 'dim', formula: '1  b3  b5', semitones: [0, 3, 6], character: 'Tense, eerie, unstable' },
  { name: 'Augmented', symbol: 'aug', formula: '1  3  #5', semitones: [0, 4, 8], character: 'Mysterious, dreamlike' },
  { name: 'Sus2', symbol: 'sus2', formula: '1  2  5', semitones: [0, 2, 7], character: 'Open, airy, floating' },
  { name: 'Sus4', symbol: 'sus4', formula: '1  4  5', semitones: [0, 5, 7], character: 'Tense, wants to resolve' },
  { name: 'Add9', symbol: 'add9', formula: '1  3  5  9', semitones: [0, 4, 7, 14], character: 'Rich, shimmering' },
  { name: 'Minor 9', symbol: 'm9', formula: '1  b3  5  b7  9', semitones: [0, 3, 7, 10, 14], character: 'Deep, jazzy, lush' },
  { name: 'Dominant 9', symbol: '9', formula: '1  3  5  b7  9', semitones: [0, 4, 7, 10, 14], character: 'Funky, soulful' },
];

function getScaleNotes(rootNote, scalePattern) {
  const rootIdx = NOTES.indexOf(rootNote) !== -1 ? NOTES.indexOf(rootNote) : NOTE_NAMES_FLAT.indexOf(rootNote);
  if (rootIdx === -1) return [];
  const useFlats = NOTE_NAMES_FLAT.includes(rootNote) && !NOTES.includes(rootNote) || ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'].includes(rootNote);
  const source = useFlats ? NOTE_NAMES_FLAT : NOTES;
  return scalePattern.map(s => source[(rootIdx + s) % 12]);
}

export default function MusicTheoryReference() {
  const [activeTab, setActiveTab] = useState('fifths');
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const [hoveredKeyIndex, setHoveredKeyIndex] = useState(null);
  const [showMinor, setShowMinor] = useState(false);
  const [selectedChordRoot, setSelectedChordRoot] = useState('C');
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const selectedKey = KEYS[selectedKeyIndex];

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playNote = (frequency, delay = 0, duration = 0.8) => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    // Add harmonics for warmth
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime + delay);
    gain2.gain.setValueAtTime(0.08, ctx.currentTime + delay);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + delay);
    osc2.stop(ctx.currentTime + delay + duration);

    gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);

    oscillatorsRef.current.push(osc, osc2);
  };

  const stopAll = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  const playInterval = (semitones) => {
    stopAll();
    const base = 261.63;
    playNote(base, 0, 1.2);
    if (semitones > 0) {
      playNote(base * Math.pow(2, semitones / 12), 0.3, 1.2);
    }
  };

  const playChord = (semitoneArray) => {
    stopAll();
    const rootIdx = NOTES.indexOf(selectedChordRoot) !== -1
      ? NOTES.indexOf(selectedChordRoot)
      : NOTE_NAMES_FLAT.indexOf(selectedChordRoot);
    const base = 261.63 * Math.pow(2, rootIdx / 12);
    semitoneArray.forEach((s, i) => {
      playNote(base * Math.pow(2, s / 12), i * 0.05, 1.5);
    });
  };

  const playScale = (rootNote, pattern) => {
    stopAll();
    const rootIdx = NOTES.indexOf(rootNote) !== -1 ? NOTES.indexOf(rootNote) : NOTE_NAMES_FLAT.indexOf(rootNote);
    const base = 261.63 * Math.pow(2, rootIdx / 12);
    pattern.forEach((s, i) => {
      playNote(base * Math.pow(2, s / 12), i * 0.3, 0.5);
    });
  };

  // Scale notes for selected key
  const scaleNotes = useMemo(() => {
    return getScaleNotes(selectedKey.major, MAJOR_SCALE);
  }, [selectedKey]);

  const minorScaleNotes = useMemo(() => {
    const minorRoot = selectedKey.minor.replace('m', '');
    return getScaleNotes(minorRoot, MINOR_SCALE);
  }, [selectedKey]);

  // SVG dimensions
  const cx = 200;
  const cy = 200;
  const outerR = 175;
  const innerR = 120;
  const minorR = 80;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      {/* Tab buttons */}
      <div className="flex gap-1 border-b border-border mb-4">
        {[
          { id: 'fifths', label: 'Circle of Fifths' },
          { id: 'intervals', label: 'Intervals' },
          { id: 'chords', label: 'Chord Construction' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ───── Circle of Fifths ───── */}
      {activeTab === 'fifths' && (
        <div className="mt-6">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`text-sm font-medium ${!showMinor ? 'text-text-primary' : 'text-text-muted'}`}>Major</span>
            <button
              onClick={() => setShowMinor(!showMinor)}
              className={`relative w-12 h-6 rounded-full transition-colors ${showMinor ? 'bg-accent' : 'bg-border'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${showMinor ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-medium ${showMinor ? 'text-text-primary' : 'text-text-muted'}`}>Minor</span>
          </div>

          {/* Circle SVG */}
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 400 400"
              className="w-full max-w-md"
              style={{ maxHeight: '400px' }}
            >
              <defs>
                {/* Shadow filter */}
                <filter id="segShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Outer segments (major keys) */}
              {KEYS.map((key, idx) => {
                const startAngle = (idx / 12) * Math.PI * 2 - Math.PI / 2 - Math.PI / 12;
                const endAngle = startAngle + Math.PI / 6;
                const midAngle = (startAngle + endAngle) / 2;
                const isSelected = idx === selectedKeyIndex;
                const isHovered = idx === hoveredKeyIndex;
                const active = isSelected || isHovered;

                // Outer arc path
                const x1o = cx + Math.cos(startAngle) * outerR;
                const y1o = cy + Math.sin(startAngle) * outerR;
                const x2o = cx + Math.cos(endAngle) * outerR;
                const y2o = cy + Math.sin(endAngle) * outerR;
                const x1i = cx + Math.cos(startAngle) * innerR;
                const y1i = cy + Math.sin(startAngle) * innerR;
                const x2i = cx + Math.cos(endAngle) * innerR;
                const y2i = cy + Math.sin(endAngle) * innerR;

                const segPath = [
                  `M ${x1i} ${y1i}`,
                  `L ${x1o} ${y1o}`,
                  `A ${outerR} ${outerR} 0 0 1 ${x2o} ${y2o}`,
                  `L ${x2i} ${y2i}`,
                  `A ${innerR} ${innerR} 0 0 0 ${x1i} ${y1i}`,
                  'Z',
                ].join(' ');

                // Label position
                const labelR = (outerR + innerR) / 2;
                const lx = cx + Math.cos(midAngle) * labelR;
                const ly = cy + Math.sin(midAngle) * labelR;

                return (
                  <g
                    key={`seg-${idx}`}
                    onClick={() => setSelectedKeyIndex(idx)}
                    onMouseEnter={() => setHoveredKeyIndex(idx)}
                    onMouseLeave={() => setHoveredKeyIndex(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={segPath}
                      fill={active ? SEGMENT_COLORS[idx] : `${SEGMENT_COLORS[idx]}30`}
                      stroke="white"
                      strokeWidth="2"
                      filter={active ? 'url(#segShadow)' : undefined}
                      style={{ transition: 'fill 0.2s ease' }}
                    />
                    <text
                      x={lx}
                      y={ly + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={active ? '16' : '14'}
                      fontWeight="700"
                      fontFamily="'DM Sans', sans-serif"
                      fill={active ? '#ffffff' : '#1a1a1a'}
                      style={{ transition: 'all 0.2s ease', pointerEvents: 'none' }}
                    >
                      {key.major}
                    </text>
                  </g>
                );
              })}

              {/* Inner segments (minor keys) */}
              {KEYS.map((key, idx) => {
                const startAngle = (idx / 12) * Math.PI * 2 - Math.PI / 2 - Math.PI / 12;
                const endAngle = startAngle + Math.PI / 6;
                const midAngle = (startAngle + endAngle) / 2;
                const isSelected = idx === selectedKeyIndex;
                const isHovered = idx === hoveredKeyIndex;
                const active = isSelected || isHovered;

                const x1o = cx + Math.cos(startAngle) * innerR;
                const y1o = cy + Math.sin(startAngle) * innerR;
                const x2o = cx + Math.cos(endAngle) * innerR;
                const y2o = cy + Math.sin(endAngle) * innerR;
                const x1i = cx + Math.cos(startAngle) * minorR;
                const y1i = cy + Math.sin(startAngle) * minorR;
                const x2i = cx + Math.cos(endAngle) * minorR;
                const y2i = cy + Math.sin(endAngle) * minorR;

                const segPath = [
                  `M ${x1i} ${y1i}`,
                  `L ${x1o} ${y1o}`,
                  `A ${innerR} ${innerR} 0 0 1 ${x2o} ${y2o}`,
                  `L ${x2i} ${y2i}`,
                  `A ${minorR} ${minorR} 0 0 0 ${x1i} ${y1i}`,
                  'Z',
                ].join(' ');

                const labelR = (innerR + minorR) / 2;
                const lx = cx + Math.cos(midAngle) * labelR;
                const ly = cy + Math.sin(midAngle) * labelR;

                return (
                  <g
                    key={`minor-seg-${idx}`}
                    onClick={() => setSelectedKeyIndex(idx)}
                    onMouseEnter={() => setHoveredKeyIndex(idx)}
                    onMouseLeave={() => setHoveredKeyIndex(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={segPath}
                      fill={active ? `${SEGMENT_COLORS[idx]}cc` : `${SEGMENT_COLORS[idx]}15`}
                      stroke="white"
                      strokeWidth="1.5"
                      style={{ transition: 'fill 0.2s ease' }}
                    />
                    <text
                      x={lx}
                      y={ly + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={active ? '12' : '11'}
                      fontWeight="600"
                      fontFamily="'JetBrains Mono', monospace"
                      fill={active ? '#ffffff' : '#525252'}
                      style={{ transition: 'all 0.2s ease', pointerEvents: 'none' }}
                    >
                      {key.minor}
                    </text>
                  </g>
                );
              })}

              {/* Centre */}
              <circle cx={cx} cy={cy} r={minorR - 2} fill="#f8f8f8" stroke="#e5e5e5" strokeWidth="1" />
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontFamily="'DM Sans', sans-serif"
                fill="#a3a3a3"
              >
                {showMinor ? 'Minor' : 'Major'}
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="22"
                fontWeight="700"
                fontFamily="'Fraunces', serif"
                fill="#1a1a1a"
              >
                {showMinor ? selectedKey.minor : selectedKey.major}
              </text>

              {/* Arrow labels */}
              <text x={cx + 30} y={30} textAnchor="start" fontSize="10" fill="#a3a3a3" fontFamily="'DM Sans', sans-serif">
                Sharps {'\u2192'}
              </text>
              <text x={cx - 30} y={30} textAnchor="end" fontSize="10" fill="#a3a3a3" fontFamily="'DM Sans', sans-serif">
                {'\u2190'} Flats
              </text>
            </svg>
          </div>

          {/* Key Info Panel */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-text-primary">
                  {showMinor ? `${selectedKey.minor.replace('m', '')} Minor` : `${selectedKey.major} Major`}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{selectedKey.sigLabel}</p>
              </div>
              <Button
                onClick={() => playScale(
                  showMinor ? selectedKey.minor.replace('m', '') : selectedKey.major,
                  showMinor ? MINOR_SCALE : MAJOR_SCALE
                )}
                variant="primary"
                size="sm"
              >
                Play Scale
              </Button>
            </div>

            {/* Scale notes */}
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide mb-2">
                {showMinor ? 'Natural Minor Scale' : 'Major Scale'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(showMinor ? minorScaleNotes : scaleNotes).map((note, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                    style={{
                      backgroundColor: `${SEGMENT_COLORS[selectedKeyIndex]}20`,
                      color: SEGMENT_COLORS[selectedKeyIndex],
                      border: `1.5px solid ${SEGMENT_COLORS[selectedKeyIndex]}40`,
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Diatonic chords */}
            {!showMinor && (
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Chords in {selectedKey.major} Major</p>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {scaleNotes.map((note, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-text-muted font-mono mb-1">{SCALE_DEGREES_MAJOR[i]}</div>
                      <div className="font-mono font-bold text-sm text-text-primary">
                        {note}{CHORD_QUALITIES_MAJOR[i] === 'Minor' ? 'm' : CHORD_QUALITIES_MAJOR[i] === 'Diminished' ? 'dim' : ''}
                      </div>
                      <div className="text-[10px] text-text-muted mt-0.5">{CHORD_QUALITIES_MAJOR[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related keys */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-2 bg-background rounded-lg">
                <p className="text-[10px] text-text-muted uppercase">Relative {showMinor ? 'Major' : 'Minor'}</p>
                <p className="font-mono font-bold text-text-primary mt-0.5">
                  {showMinor ? selectedKey.major : selectedKey.minor}
                </p>
              </div>
              <div className="text-center p-2 bg-background rounded-lg">
                <p className="text-[10px] text-text-muted uppercase">Fifth (V)</p>
                <p className="font-mono font-bold text-text-primary mt-0.5">
                  {KEYS[(selectedKeyIndex + 1) % 12].major}
                </p>
              </div>
              <div className="text-center p-2 bg-background rounded-lg">
                <p className="text-[10px] text-text-muted uppercase">Fourth (IV)</p>
                <p className="font-mono font-bold text-text-primary mt-0.5">
                  {KEYS[(selectedKeyIndex + 11) % 12].major}
                </p>
              </div>
              <div className="text-center p-2 bg-background rounded-lg">
                <p className="text-[10px] text-text-muted uppercase">Key Signature</p>
                <p className="font-mono font-bold text-text-primary mt-0.5">{selectedKey.sig === '0' ? 'None' : selectedKey.sig}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───── Intervals ───── */}
      {activeTab === 'intervals' && (
        <div className="mt-6">
          <p className="text-text-secondary mb-4">
            An interval is the distance between two notes, measured in semitones. Click any row to hear it from middle C.
          </p>

          {/* Visual piano-style interval display */}
          <div className="space-y-2 mb-4">
            {INTERVALS.map((interval, idx) => {
              const widthPct = ((interval.semitones) / 12) * 100;
              return (
                <button
                  key={idx}
                  onClick={() => playInterval(interval.semitones)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-surface border border-border hover:bg-surface-hover transition-all group text-left"
                >
                  {/* Semitone bar */}
                  <div className="w-24 sm:w-32 h-6 bg-border/50 rounded-full overflow-hidden flex-shrink-0">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.max(widthPct, 4)}%`,
                        backgroundColor: SEGMENT_COLORS[interval.semitones % 12],
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-text-primary text-sm">{interval.name}</span>
                      <span className="font-mono text-xs text-text-muted">{interval.short}</span>
                    </div>
                    <div className="text-xs text-text-secondary mt-0.5 hidden sm:block">{interval.character}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-sm font-bold text-text-primary">{interval.semitones}</div>
                    <div className="text-[10px] text-text-muted">semitones</div>
                  </div>
                  <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-sm flex-shrink-0">
                    Play
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ───── Chord Construction ───── */}
      {activeTab === 'chords' && (
        <div className="mt-6">
          <p className="text-text-secondary mb-4">
            Every chord is built by stacking intervals from a root note. Choose a root and click any chord to hear how it sounds.
          </p>

          {/* Root note selector */}
          <div className="mb-4">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Root Note</p>
            <div className="flex flex-wrap gap-1.5">
              {['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map((note) => (
                <button
                  key={note}
                  onClick={() => setSelectedChordRoot(note)}
                  className={`w-10 h-10 rounded-lg font-mono text-sm font-bold transition-all ${
                    selectedChordRoot === note
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-surface border border-border hover:bg-surface-hover text-text-primary'
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* Chord cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHORD_TYPES.map((chord, idx) => (
              <button
                key={idx}
                onClick={() => playChord(chord.semitones)}
                className="p-4 bg-surface rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-heading font-bold text-lg text-text-primary">
                    {selectedChordRoot}
                  </span>
                  <span className="font-mono text-sm text-accent">{chord.symbol}</span>
                  <span className="ml-auto text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                    Play
                  </span>
                </div>
                <p className="text-xs text-text-secondary mb-3">{chord.character}</p>

                {/* Visual interval blocks */}
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 13 }).map((_, s) => {
                    const isActive = chord.semitones.includes(s) || chord.semitones.includes(s + 12);
                    return (
                      <div
                        key={s}
                        className="flex-1 h-3 rounded-sm transition-all"
                        style={{
                          backgroundColor: isActive ? SEGMENT_COLORS[s % 12] : '#e5e5e520',
                          border: isActive ? 'none' : '1px solid #e5e5e540',
                        }}
                      />
                    );
                  })}
                </div>

                <div className="font-mono text-xs text-text-muted">{chord.formula}</div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          <div className="mt-6 bg-accent/5 border border-accent/10 rounded-xl p-4">
            <h4 className="font-heading font-bold text-text-primary mb-2">How to Read Chord Formulas</h4>
            <p className="text-sm text-text-secondary">
              Numbers refer to scale degrees. <span className="font-mono">1</span> is the root,{' '}
              <span className="font-mono">3</span> is the major third, <span className="font-mono">5</span> is the perfect fifth.
              A <span className="font-mono">b</span> means flatten (lower by one semitone) and{' '}
              <span className="font-mono">#</span> means sharpen (raise by one semitone).
              So <span className="font-mono">b3</span> is a minor third and <span className="font-mono">#5</span> is an augmented fifth.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
