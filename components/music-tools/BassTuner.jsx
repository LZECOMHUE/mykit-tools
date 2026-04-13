'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const TUNINGS = [
  {
    id: 'standard4',
    name: 'Standard 4-String (EADG)',
    description: 'The standard tuning for 4-string bass guitar. Same as the bottom four strings of a guitar, one octave lower.',
    strings: [
      { note: 'E1', frequency: 41.20 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
    ],
  },
  {
    id: 'dropD4',
    name: 'Drop D 4-String',
    description: 'Low E string dropped to D. Popular in rock and metal for heavier riffs and power chords with one finger.',
    strings: [
      { note: 'D1', frequency: 36.71 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
    ],
  },
  {
    id: 'halfStep4',
    name: 'Half Step Down 4-String',
    description: 'Every string tuned down a half step. Slightly darker tone, easier string bending. Common in blues and grunge.',
    strings: [
      { note: 'Eb1', frequency: 38.89 },
      { note: 'Ab1', frequency: 51.91 },
      { note: 'Db2', frequency: 69.30 },
      { note: 'Gb2', frequency: 92.50 },
    ],
  },
  {
    id: 'standard5',
    name: 'Standard 5-String (BEADG)',
    description: 'Adds a low B string below standard tuning. The most common 5-string setup, extending range for modern styles.',
    strings: [
      { note: 'B0', frequency: 30.87 },
      { note: 'E1', frequency: 41.20 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
    ],
  },
  {
    id: 'standard6',
    name: 'Standard 6-String (BEADGC)',
    description: 'Full 6-string bass with low B and high C. Maximum range for solo bass, jazz, and progressive styles.',
    strings: [
      { note: 'B0', frequency: 30.87 },
      { note: 'E1', frequency: 41.20 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
      { note: 'C3', frequency: 130.81 },
    ],
  },
  {
    id: 'dropA5',
    name: 'Drop A 5-String',
    description: 'Low B dropped further to A. Used in heavy metal and djent for extremely low, aggressive tones.',
    strings: [
      { note: 'A0', frequency: 27.50 },
      { note: 'E1', frequency: 41.20 },
      { note: 'A1', frequency: 55.00 },
      { note: 'D2', frequency: 73.42 },
      { note: 'G2', frequency: 98.00 },
    ],
  },
];

export default function BassTuner() {
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainsRef = useRef([]);
  const [selectedTuning, setSelectedTuning] = useState('standard4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingString, setPlayingString] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [loopingString, setLoopingString] = useState(null);
  const loopTimeoutRef = useRef(null);

  const currentTuning = useMemo(() => {
    return TUNINGS.find((t) => t.id === selectedTuning) || TUNINGS[0];
  }, [selectedTuning]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const getFrequencyColor = (index) => {
    const colors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#16a34a', '#0891b2'];
    return colors[index % colors.length];
  };

  const playNote = (frequency, stringIndex) => {
    const ctx = getAudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    stopAllNotes();

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.35, ctx.currentTime);

    // Quick attack
    masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.02);
    // Bass strings ring longer - 3s decay for that deep rumble
    masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);

    // Harmonics for a round, deep bass tone
    // Bass has a stronger fundamental and less upper harmonics than guitar
    const harmonics = [
      { multiplier: 1, gain: 1.0 },
      { multiplier: 2, gain: 0.6 },
      { multiplier: 3, gain: 0.2 },
      { multiplier: 4, gain: 0.08 },
      { multiplier: 5, gain: 0.03 },
    ];

    const oscillators = [];
    const gains = [];

    harmonics.forEach(({ multiplier, gain }) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * multiplier, ctx.currentTime);

      const harmGain = ctx.createGain();
      harmGain.gain.setValueAtTime(gain * 0.6, ctx.currentTime);
      // Each harmonic decays a bit faster
      harmGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3 - multiplier * 0.15);

      osc.connect(harmGain);
      harmGain.connect(masterGain);

      osc.start(ctx.currentTime);
      oscillators.push(osc);
      gains.push(harmGain);
    });

    oscillatorsRef.current = oscillators;
    gainsRef.current = [masterGain, ...gains];

    setPlayingString(stringIndex);
    setIsPlaying(true);

    // Auto-stop after 3 seconds (bass rings longer)
    setTimeout(() => {
      stopAllNotes();
    }, 3000);
  };

  const stopAllNotes = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
    gainsRef.current = [];
    setIsPlaying(false);
    setPlayingString(null);
  };

  const handlePlayString = (index, frequency) => {
    if (isLooping && loopingString === index) {
      setIsLooping(false);
      setLoopingString(null);
      clearTimeout(loopTimeoutRef.current);
      stopAllNotes();
    } else {
      setIsLooping(true);
      setLoopingString(index);
      playNote(frequency, index);
    }
  };

  useEffect(() => {
    if (isLooping && loopingString !== null) {
      const frequency = currentTuning.strings[loopingString].frequency;
      loopTimeoutRef.current = setTimeout(() => {
        playNote(frequency, loopingString);
      }, 3200);

      return () => clearTimeout(loopTimeoutRef.current);
    }
  }, [isLooping, loopingString, currentTuning]);

  const handlePlayAll = () => {
    stopAllNotes();
    setIsLooping(false);
    setLoopingString(null);

    let stringIndex = 0;
    const playNext = () => {
      if (stringIndex < currentTuning.strings.length) {
        const string = currentTuning.strings[stringIndex];
        playNote(string.frequency, stringIndex);
        stringIndex++;
        setTimeout(playNext, 1200);
      } else {
        stopAllNotes();
      }
    };

    playNext();
  };

  const tuningOptions = TUNINGS.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const getComparisonIndicator = (index) => {
    const standardTuning = TUNINGS[0];
    if (index >= standardTuning.strings.length) return '';
    const currentFreq = currentTuning.strings[index].frequency;
    const standardFreq = standardTuning.strings[index].frequency;

    if (Math.abs(currentFreq - standardFreq) < 0.5) return '=';
    if (currentFreq > standardFreq) return '\u2191';
    return '\u2193';
  };

  // Dynamic SVG height based on number of strings
  const stringCount = currentTuning.strings.length;
  const svgHeight = 60 + stringCount * 55;
  const fretboardTop = 30;
  const fretboardHeight = svgHeight - 60;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4">
      {/* Controls Section */}
      <div className="space-y-4 mb-4">
        {/* Tuning Selector */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Tuning Preset"
            options={tuningOptions}
            value={selectedTuning}
            onChange={(e) => {
              setSelectedTuning(e.target.value);
              setIsLooping(false);
              setLoopingString(null);
              clearTimeout(loopTimeoutRef.current);
              stopAllNotes();
            }}
          />
          <div className="flex flex-col justify-end">
            <Button onClick={handlePlayAll} variant="primary" size="lg" className="w-full">
              Play All Strings
            </Button>
          </div>
        </div>

        {/* Tuning Description */}
        <div className="bg-accent/5 border border-accent/10 rounded-lg p-4">
          <h3 className="font-heading font-bold text-text-primary mb-1">
            {currentTuning.name}
          </h3>
          <p className="text-sm text-text-secondary">{currentTuning.description}</p>
        </div>
      </div>

      {/* Bass Fretboard */}
      <div className="mb-4 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
        <svg
          viewBox={`0 0 1000 ${svgHeight}`}
          className="w-full h-auto mb-4"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Fretboard background - darker rosewood for bass */}
          <defs>
            <linearGradient id="bassWoodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#292524', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#3b3633', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#292524', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Fretboard body */}
          <rect x="20" y={fretboardTop} width="960" height={fretboardHeight} fill="url(#bassWoodGradient)" rx="8" />

          {/* Frets (silver/chrome for bass) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((fret) => {
            const x = 100 + (fret * 60);
            return (
              <line
                key={`fret-${fret}`}
                x1={x}
                y1={fretboardTop + 10}
                x2={x}
                y2={fretboardTop + fretboardHeight - 10}
                stroke="#a8a29e"
                strokeWidth="2.5"
                opacity="0.5"
              />
            );
          })}

          {/* Fret dots (inlays) - side dots style */}
          {[3, 5, 7, 9, 12].map((fretNum) => {
            const x = 100 + fretNum * 60;
            const cy = fretboardTop + fretboardHeight / 2;
            const isDouble = fretNum === 12;
            if (isDouble) {
              return (
                <g key={`dot-${fretNum}`}>
                  <circle cx={x - 15} cy={cy} r="6" fill="#a8a29e" opacity="0.4" />
                  <circle cx={x + 15} cy={cy} r="6" fill="#a8a29e" opacity="0.4" />
                </g>
              );
            }
            return (
              <circle
                key={`dot-${fretNum}`}
                cx={x}
                cy={cy}
                r="6"
                fill="#a8a29e"
                opacity="0.4"
              />
            );
          })}

          {/* Headstock note labels */}
          {currentTuning.strings.map((string, index) => {
            const y = 65 + index * 55;
            return (
              <text
                key={`label-${index}`}
                x="35"
                y={y + 8}
                fontSize="18"
                fontWeight="bold"
                fill="#a8a29e"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
              >
                {string.note.replace(/\d/, '')}
              </text>
            );
          })}

          {/* Strings */}
          {currentTuning.strings.map((string, index) => {
            const y = 65 + index * 55;
            // Bass strings are thick - wound steel/nickel
            const thickness = 4.5 - index * 0.5;
            const isStringPlaying = playingString === index && isPlaying;
            const isLoopingThis = isLooping && loopingString === index;

            return (
              <g key={`string-${index}`}>
                {/* String line - silver/steel colour for bass */}
                <line
                  x1="100"
                  y1={y}
                  x2="880"
                  y2={y}
                  stroke="#d6d3d1"
                  strokeWidth={thickness}
                  opacity={isStringPlaying || isLoopingThis ? 1 : 0.65}
                  className={isStringPlaying || isLoopingThis ? 'animate-pulse' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePlayString(index, string.frequency)}
                />
                {/* Vibration animation */}
                {(isStringPlaying || isLoopingThis) && (
                  <circle
                    cx="500"
                    cy={y}
                    r="10"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* String Controls Grid */}
      <div className={`grid grid-cols-1 ${stringCount <= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4 mb-4`}>
        {currentTuning.strings.map((string, index) => {
          const isLoopingThis = isLooping && loopingString === index;
          const isPlayingThis = playingString === index && isPlaying;

          return (
            <button
              key={`string-${index}`}
              onClick={() => handlePlayString(index, string.frequency)}
              className={`p-4 rounded-lg transition-all transform ${
                isLoopingThis
                  ? 'bg-accent text-white shadow-lg scale-105'
                  : isPlayingThis
                  ? 'bg-accent/80 text-white'
                  : 'bg-surface border border-border hover:bg-surface-hover'
              } active:scale-95`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-heading font-bold text-lg">
                    String {index + 1}
                  </div>
                  <div className="font-mono text-sm mt-1">
                    {string.note}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="font-mono font-bold text-lg"
                    style={{ color: isLoopingThis || isPlayingThis ? 'inherit' : getFrequencyColor(index) }}
                  >
                    {string.frequency.toFixed(2)} Hz
                  </div>
                  {selectedTuning !== 'standard4' && index < TUNINGS[0].strings.length && (
                    <div className="text-xs mt-1 font-semibold">
                      {getComparisonIndicator(index)}
                    </div>
                  )}
                </div>
              </div>
              {isLoopingThis && (
                <div className="text-xs mt-2 opacity-90">Loop Active</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="bg-info/5 border border-info/20 rounded-lg p-4 space-y-3">
        <div>
          <h4 className="font-heading font-bold text-text-primary mb-2">How to Use</h4>
          <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
            <li>Click any string on the fretboard or the buttons below to hear its tone</li>
            <li>Click again to loop that string continuously while you tune</li>
            <li>Use "Play All Strings" to hear the full tuning in sequence</li>
            <li>Change tuning presets to explore 4, 5, and 6-string tunings</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold text-text-primary mb-2">About Bass Tuning</h4>
          <p className="text-sm text-text-secondary">
            Standard bass tuning (EADG) matches the lowest four guitar strings, one octave lower. 5-string basses add a low B for extended range, while 6-string basses add both a low B and a high C. Drop tunings lower the bottom string for heavier riffs and easier power chord shapes.
          </p>
        </div>
      </div>
    </div>
  );
}
