'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const TUNINGS = [
  {
    id: 'standard',
    name: 'Standard gCEA (Re-entrant)',
    description: 'The most common ukulele tuning. The G string is high (re-entrant), giving the ukulele its bright, happy sound.',
    strings: [
      { note: 'G4', frequency: 392.00 },
      { note: 'C4', frequency: 261.63 },
      { note: 'E4', frequency: 329.63 },
      { note: 'A4', frequency: 440.00 },
    ],
  },
  {
    id: 'low-g',
    name: 'Low G',
    description: 'Same as standard but with a low G string. Gives a wider range and warmer tone, popular for fingerpicking.',
    strings: [
      { note: 'G3', frequency: 196.00 },
      { note: 'C4', frequency: 261.63 },
      { note: 'E4', frequency: 329.63 },
      { note: 'A4', frequency: 440.00 },
    ],
  },
  {
    id: 'd-tuning',
    name: 'D Tuning (ADF#B)',
    description: 'One whole step higher than standard. Brighter sound, common in older Hawaiian music.',
    strings: [
      { note: 'A4', frequency: 440.00 },
      { note: 'D4', frequency: 293.66 },
      { note: 'F#4', frequency: 369.99 },
      { note: 'B4', frequency: 493.88 },
    ],
  },
  {
    id: 'baritone',
    name: 'Baritone (DGBE)',
    description: 'Same as the top four strings of a guitar. Deeper, mellower tone. Used on baritone ukuleles.',
    strings: [
      { note: 'D3', frequency: 146.83 },
      { note: 'G3', frequency: 196.00 },
      { note: 'B3', frequency: 246.94 },
      { note: 'E4', frequency: 329.63 },
    ],
  },
  {
    id: 'slack-key-c',
    name: 'Slack Key Open C (GCEG)',
    description: 'Open C major tuning. Strum all open strings for a C chord. Used in Hawaiian slack-key style.',
    strings: [
      { note: 'G4', frequency: 392.00 },
      { note: 'C4', frequency: 261.63 },
      { note: 'E4', frequency: 329.63 },
      { note: 'G4', frequency: 392.00 },
    ],
  },
];

export default function UkuleleTuner() {
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainsRef = useRef([]);
  const [selectedTuning, setSelectedTuning] = useState('standard');
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
    const colors = ['#dc2626', '#ea580c', '#16a34a', '#0891b2'];
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
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);

    // Quick attack
    masterGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    // Slightly more sustained decay than guitar (2.5s vs 2s) for that ringing uke sound
    masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);

    // Harmonics for a brighter, nylon-string plucked sound
    const harmonics = [
      { multiplier: 1, gain: 1.0 },
      { multiplier: 2, gain: 0.45 },
      { multiplier: 3, gain: 0.25 },
      { multiplier: 4, gain: 0.1 },
      { multiplier: 5, gain: 0.05 },
    ];

    const oscillators = [];
    const gains = [];

    harmonics.forEach(({ multiplier, gain }) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * multiplier, ctx.currentTime);

      const harmGain = ctx.createGain();
      harmGain.gain.setValueAtTime(gain * 0.6, ctx.currentTime);
      harmGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5 - multiplier * 0.12);

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

    setTimeout(() => {
      stopAllNotes();
    }, 2500);
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
      }, 2700);

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
        setTimeout(playNext, 1000);
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
    const currentFreq = currentTuning.strings[index].frequency;
    const standardFreq = standardTuning.strings[index].frequency;

    if (Math.abs(currentFreq - standardFreq) < 0.5) return '=';
    if (currentFreq > standardFreq) return '\u2191';
    return '\u2193';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8">
      {/* Controls Section */}
      <div className="space-y-6 mb-8">
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

      {/* Ukulele Fretboard */}
      <div className="mb-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <svg
          viewBox="0 0 1000 300"
          className="w-full h-auto mb-6"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Fretboard background */}
          <defs>
            <linearGradient id="ukeWoodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#78350f', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#92400e', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#78350f', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Fretboard body */}
          <rect x="20" y="30" width="960" height="240" fill="url(#ukeWoodGradient)" rx="10" />

          {/* Frets */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((fret) => {
            const x = 100 + (fret * 60);
            return (
              <line
                key={`fret-${fret}`}
                x1={x}
                y1="45"
                x2={x}
                y2="255"
                stroke="#d4af37"
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}

          {/* Fret dots (inlays) */}
          {[3, 5, 7, 10, 12].map((fretNum) => {
            const x = 100 + fretNum * 60;
            const isDouble = fretNum === 12;
            if (isDouble) {
              return (
                <g key={`dot-${fretNum}`}>
                  <circle cx={x - 15} cy="150" r="6" fill="#d4af37" opacity="0.5" />
                  <circle cx={x + 15} cy="150" r="6" fill="#d4af37" opacity="0.5" />
                </g>
              );
            }
            return (
              <circle
                key={`dot-${fretNum}`}
                cx={x}
                cy="150"
                r="6"
                fill="#d4af37"
                opacity="0.5"
              />
            );
          })}

          {/* Headstock note labels */}
          {currentTuning.strings.map((string, index) => {
            const y = 80 + index * 50;
            return (
              <text
                key={`label-${index}`}
                x="35"
                y={y + 8}
                fontSize="18"
                fontWeight="bold"
                fill="#fbbf24"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
              >
                {string.note.replace(/\d/, '')}
              </text>
            );
          })}

          {/* Strings */}
          {currentTuning.strings.map((string, index) => {
            const y = 80 + index * 50;
            // Ukulele strings are thinner and more uniform than guitar
            const thickness = 2.2 - index * 0.2;
            const isStringPlaying = playingString === index && isPlaying;
            const isLoopingThis = isLooping && loopingString === index;

            return (
              <g key={`string-${index}`}>
                {/* String line - nylon colour */}
                <line
                  x1="100"
                  y1={y}
                  x2="880"
                  y2={y}
                  stroke="#e8dcc8"
                  strokeWidth={thickness}
                  opacity={isStringPlaying || isLoopingThis ? 1 : 0.7}
                  className={isStringPlaying || isLoopingThis ? 'animate-pulse' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePlayString(index, string.frequency)}
                />
                {/* Vibration animation */}
                {(isStringPlaying || isLoopingThis) && (
                  <circle
                    cx="500"
                    cy={y}
                    r="8"
                    fill="none"
                    stroke="#fbbf24"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                  {selectedTuning !== 'standard' && (
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
            <li>Change tuning presets to explore different ukulele tunings</li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold text-text-primary mb-2">About Ukulele Tuning</h4>
          <p className="text-sm text-text-secondary">
            Standard ukulele tuning (gCEA) is re-entrant, meaning the G string is higher in pitch than the C string below it. This gives the ukulele its distinctive bright, jangly character. Baritone ukuleles use DGBE tuning, the same as the top four guitar strings.
          </p>
        </div>
      </div>
    </div>
  );
}
