'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';

const NOTE_NAMES = ['C', 'C#/Db', 'D', 'Eb', 'E', 'F', 'F#/Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const CHORD_TYPES = ['Major', 'Minor', '7', 'Maj7', 'Min7', 'Sus2', 'Sus4', 'Dim', 'Aug', 'Add9', '6', 'm6', 'Power'];

// Open string MIDI values (low E to high E)
const STRING_MIDI = [40, 45, 50, 55, 59, 64];

// Chord voicings for C - transposed to other keys via fret offset
// frets: -1 = muted, 0 = open, 1+ = fret number
const C_CHORDS = {
  Major:  { voicings: [
    { frets: [0,3,2,0,1,0], name: 'Open' },
    { frets: [3,3,2,0,1,0], name: 'Alt Open' },
    { frets: [8,10,10,9,8,8], name: 'Barre 8th', barre: 8 },
  ], notes: ['C','E','G'], intervals: ['1','3','5'], tip: 'Bright, happy, resolved. The foundation of Western harmony.' },
  Minor:  { voicings: [
    { frets: [-1,3,1,0,1,0], name: 'Open' },
    { frets: [8,10,10,8,8,8], name: 'Barre 8th', barre: 8 },
  ], notes: ['C','Eb','G'], intervals: ['1','b3','5'], tip: 'Sad, dark, introspective. Lowered third creates the minor quality.' },
  '7':    { voicings: [
    { frets: [0,3,2,3,1,0], name: 'Open' },
    { frets: [8,10,8,9,8,8], name: 'Barre 8th', barre: 8 },
  ], notes: ['C','E','G','Bb'], intervals: ['1','3','5','b7'], tip: 'Dominant seventh. Bluesy tension that wants to resolve.' },
  Maj7:   { voicings: [
    { frets: [0,3,2,0,0,0], name: 'Open' },
  ], notes: ['C','E','G','B'], intervals: ['1','3','5','7'], tip: 'Major seventh. Jazzy, sophisticated, dreamy.' },
  Min7:   { voicings: [
    { frets: [-1,3,1,3,1,0], name: 'Open' },
    { frets: [8,10,8,8,8,8], name: 'Barre 8th', barre: 8 },
  ], notes: ['C','Eb','G','Bb'], intervals: ['1','b3','5','b7'], tip: 'Minor seventh. Smooth, warm, soulful.' },
  Sus2:   { voicings: [
    { frets: [-1,3,0,0,1,0], name: 'Open' },
  ], notes: ['C','D','G'], intervals: ['1','2','5'], tip: 'Suspended second. Open, airy, unresolved.' },
  Sus4:   { voicings: [
    { frets: [-1,3,3,0,1,0], name: 'Open' },
  ], notes: ['C','F','G'], intervals: ['1','4','5'], tip: 'Suspended fourth. Tense, wants to fall to major.' },
  Dim:    { voicings: [
    { frets: [-1,3,1,2,1,-1], name: 'Position 1' },
  ], notes: ['C','Eb','Gb'], intervals: ['1','b3','b5'], tip: 'Diminished. Tense, eerie, unstable.' },
  Aug:    { voicings: [
    { frets: [-1,3,2,1,1,0], name: 'Open' },
  ], notes: ['C','E','G#'], intervals: ['1','3','#5'], tip: 'Augmented. Mysterious, dreamlike, unresolved.' },
  Add9:   { voicings: [
    { frets: [0,3,2,0,3,0], name: 'Open' },
  ], notes: ['C','E','G','D'], intervals: ['1','3','5','9'], tip: 'Add ninth. Rich, shimmering colour added to major.' },
  '6':    { voicings: [
    { frets: [-1,3,2,2,1,0], name: 'Open' },
  ], notes: ['C','E','G','A'], intervals: ['1','3','5','6'], tip: 'Sixth chord. Warm, jazzy, retro.' },
  m6:     { voicings: [
    { frets: [-1,3,1,2,1,0], name: 'Open' },
  ], notes: ['C','Eb','G','A'], intervals: ['1','b3','5','6'], tip: 'Minor sixth. Smooth, bittersweet.' },
  Power:  { voicings: [
    { frets: [-1,3,5,-1,-1,-1], name: 'Root on A' },
    { frets: [8,-1,-1,10,-1,-1], name: 'Root on E' },
  ], notes: ['C','G'], intervals: ['1','5'], tip: 'Power chord. No third - neither major nor minor. Rock and metal staple.' },
};

function transposeVoicing(voicing, semitones) {
  if (semitones === 0) return voicing;

  // For barre chords, just shift the barre position
  if (voicing.barre != null) {
    const newBarre = voicing.barre + semitones;
    const baseFret = voicing.barre;
    return {
      ...voicing,
      barre: newBarre,
      frets: voicing.frets.map(f => f === -1 ? -1 : f + semitones),
      name: `Barre ${newBarre}${newBarre === 1 ? 'st' : newBarre === 2 ? 'nd' : newBarre === 3 ? 'rd' : 'th'}`,
    };
  }

  // For open chords with semitones <= 4, shift to barre shape
  if (semitones > 0) {
    return {
      ...voicing,
      barre: semitones,
      frets: voicing.frets.map(f => f === -1 ? -1 : f + semitones),
      name: semitones <= 3 ? `Fret ${semitones}` : `Barre ${semitones}${semitones === 2 ? 'nd' : semitones === 3 ? 'rd' : 'th'}`,
    };
  }

  return voicing;
}

export default function ChordLibrary() {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedType, setSelectedType] = useState('Major');
  const audioContextRef = useRef(null);

  const rootIdx = NOTE_NAMES.indexOf(selectedRoot);
  const chordDef = C_CHORDS[selectedType];

  const voicings = useMemo(() => {
    if (!chordDef) return [];
    return chordDef.voicings.map(v => transposeVoicing(v, rootIdx));
  }, [chordDef, rootIdx]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
    return audioContextRef.current;
  };

  const playChord = (frets) => {
    const ctx = getAudioContext();

    const frequencies = frets.map((fret, i) => {
      if (fret === -1) return null;
      return 440 * Math.pow(2, (STRING_MIDI[i] + fret - 69) / 12);
    }).filter(Boolean);

    frequencies.forEach((freq, i) => {
      const startTime = ctx.currentTime + i * 0.04; // strum delay

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.12, startTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + 2);

      // Harmonics for plucked string sound
      [
        { mult: 1, g: 1.0 },
        { mult: 2, g: 0.45 },
        { mult: 3, g: 0.2 },
        { mult: 4, g: 0.08 },
      ].forEach(({ mult, g }) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, startTime);
        const hg = ctx.createGain();
        hg.gain.setValueAtTime(g * 0.5, startTime);
        hg.gain.exponentialRampToValueAtTime(0.001, startTime + 2 - mult * 0.1);
        osc.connect(hg);
        hg.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + 2);
      });
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-4">
      {/* Root Note */}
      <div className="mb-4">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Root Note</p>
        <div className="flex flex-wrap gap-1.5">
          {NOTE_NAMES.map((note, i) => (
            <button
              key={note}
              onClick={() => setSelectedRoot(note)}
              className={`px-3 py-2 rounded-lg text-sm font-mono font-bold transition-all ${
                selectedRoot === note
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-surface border border-border hover:bg-surface-hover text-text-primary'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Chord Type */}
      <div className="mb-5">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Chord Type</p>
        <div className="flex flex-wrap gap-1.5">
          {CHORD_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-accent text-white'
                  : 'border border-border hover:bg-surface-hover text-text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Chord info bar */}
      {chordDef && (
        <div className="mb-5 p-4 bg-surface border border-border rounded-xl flex flex-wrap items-center gap-4 sm:gap-4">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide">Notes</p>
            <p className="font-mono font-bold text-text-primary">{chordDef.notes.join('  ')}</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide">Intervals</p>
            <p className="font-mono font-bold text-text-primary">{chordDef.intervals.join('  ')}</p>
          </div>
          <div className="flex-1 min-w-[150px]">
            <p className="text-[10px] text-text-muted uppercase tracking-wide">Character</p>
            <p className="text-sm text-text-secondary">{chordDef.tip}</p>
          </div>
        </div>
      )}

      {/* Chord Diagrams */}
      {voicings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
          {voicings.map((voicing, idx) => (
            <ChordDiagram
              key={`${selectedRoot}-${selectedType}-${idx}`}
              voicing={voicing}
              onPlay={() => playChord(voicing.frets)}
            />
          ))}
        </div>
      )}

      {/* How to read */}
      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
        <h4 className="font-heading font-bold text-text-primary mb-2">How to Read</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">2</span>
            <span>Fretted note (finger number)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center text-green-600 text-[10px] font-bold">O</span>
            <span>Open string</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center text-red-500 font-bold text-sm">X</span>
            <span>Muted / don't play</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-1.5 rounded-full bg-accent inline-block" />
            <span>Barre (hold flat)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'E'];

// ── Chord Diagram SVG ──
function ChordDiagram({ voicing, onPlay }) {
  const w = 150;
  const h = 195;
  const padL = 24;
  const padT = 22;
  const strSpc = 20;  // string spacing
  const fretH = 28;   // fret height
  const frets = 4;
  const strings = 6;
  const neckW = (strings - 1) * strSpc;
  const neckH = frets * fretH;

  // Determine if we need a barre / starting fret
  const playedFrets = voicing.frets.filter(f => f > 0);
  const minFret = playedFrets.length > 0 ? Math.min(...playedFrets) : 0;
  const isAtNut = minFret <= 3 && !voicing.barre;
  const startFret = isAtNut ? 1 : (voicing.barre || minFret);

  const getY = (fretNum) => {
    const relative = fretNum - startFret + 1;
    return padT + (relative - 0.5) * fretH;
  };

  return (
    <button
      onClick={onPlay}
      className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-xl hover:border-accent/30 hover:shadow-md transition-all group"
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[180px]">
        {/* Dark fretboard background */}
        <rect x={padL - 4} y={padT - 2} width={neckW + 8} height={neckH + 4} fill="#3d2b1f" rx="3" />

        {/* Nut (thick bar at top if at first position) */}
        {isAtNut && (
          <rect x={padL - 2} y={padT - 3} width={neckW + 4} height={5} fill="#e8dcc8" rx="1" />
        )}

        {/* Frets */}
        {Array.from({ length: frets + 1 }).map((_, i) => (
          <line
            key={`fr-${i}`}
            x1={padL} y1={padT + i * fretH}
            x2={padL + neckW} y2={padT + i * fretH}
            stroke="#c9a961" strokeWidth={i === 0 && isAtNut ? 0 : 1.5} opacity="0.6"
          />
        ))}

        {/* Strings */}
        {Array.from({ length: strings }).map((_, i) => (
          <line
            key={`st-${i}`}
            x1={padL + i * strSpc} y1={padT}
            x2={padL + i * strSpc} y2={padT + neckH}
            stroke="#c8a882" strokeWidth={2 - i * 0.15} opacity="0.7"
          />
        ))}

        {/* Starting fret number */}
        {!isAtNut && (
          <text
            x={padL - 10}
            y={padT + fretH * 0.5 + 4}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fontFamily="'JetBrains Mono', monospace"
            fill="#a8a29e"
          >
            {startFret}
          </text>
        )}

        {/* Barre indicator */}
        {voicing.barre != null && (() => {
          const barreStrings = voicing.frets.reduce((acc, f, i) => {
            if (f === voicing.barre) acc.push(i);
            return acc;
          }, []);
          if (barreStrings.length >= 2) {
            const first = Math.min(...barreStrings);
            const last = Math.max(...barreStrings);
            const by = getY(voicing.barre);
            return (
              <rect
                x={padL + first * strSpc - 6}
                y={by - 5}
                width={(last - first) * strSpc + 12}
                height={10}
                rx="5"
                fill="#3b82f6"
                opacity="0.8"
              />
            );
          }
          return null;
        })()}

        {/* Finger dots */}
        {voicing.frets.map((fret, si) => {
          if (fret <= 0) return null;
          const cx = padL + si * strSpc;
          const cy = getY(fret);
          const isRoot = si === voicing.frets.indexOf(Math.min(...voicing.frets.filter(f => f > 0)));

          return (
            <g key={`dot-${si}`}>
              <circle cx={cx} cy={cy} r="7" fill="#3b82f6" />
              <text
                x={cx} y={cy + 3.5}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fontFamily="'JetBrains Mono', monospace"
                fill="white"
              >
                {fret}
              </text>
            </g>
          );
        })}

        {/* Open / muted markers above */}
        {voicing.frets.map((fret, si) => {
          const cx = padL + si * strSpc;
          const cy = padT - 12;

          if (fret === -1) {
            return (
              <text key={`m-${si}`} x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444">
                X
              </text>
            );
          }
          if (fret === 0) {
            return (
              <circle key={`o-${si}`} cx={cx} cy={cy} r="5" fill="none" stroke="#22c55e" strokeWidth="2" />
            );
          }
          return null;
        })}

        {/* String note labels below */}
        {STRING_NAMES.map((name, si) => (
          <text
            key={`sn-${si}`}
            x={padL + si * strSpc}
            y={padT + neckH + 14}
            textAnchor="middle"
            fontSize="8"
            fontWeight="500"
            fontFamily="'JetBrains Mono', monospace"
            fill="#a8a29e"
          >
            {name}
          </text>
        ))}
      </svg>

      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{voicing.name}</p>
        <p className="text-[10px] text-text-muted group-hover:text-accent transition-colors">Click to play</p>
      </div>
    </button>
  );
}
