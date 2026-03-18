'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const TEMPO_PRESETS = [
  { label: 'Largo', bpm: 50 },
  { label: 'Adagio', bpm: 70 },
  { label: 'Andante', bpm: 92 },
  { label: 'Moderato', bpm: 114 },
  { label: 'Allegro', bpm: 138 },
  { label: 'Presto', bpm: 184 },
];

const TIME_SIGNATURES = [
  { beats: 2, division: 4, label: '2/4' },
  { beats: 3, division: 4, label: '3/4' },
  { beats: 4, division: 4, label: '4/4' },
  { beats: 5, division: 4, label: '5/4' },
  { beats: 6, division: 8, label: '6/8' },
  { beats: 7, division: 8, label: '7/8' },
];

const SUBDIVISIONS = [
  { value: 'none', label: 'None' },
  { value: 'eighths', label: '8ths' },
  { value: 'triplets', label: 'Triplets' },
  { value: 'sixteenths', label: '16ths' },
];

export default function Metronome() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState(TIME_SIGNATURES[2]); // 4/4
  const [soundType, setSoundType] = useState('click');
  const [subdivision, setSubdivision] = useState('none');
  const [currentBeat, setCurrentBeat] = useState(0);
  const [showSpeedTrainer, setShowSpeedTrainer] = useState(false);

  // Speed trainer
  const [speedTrainerStart, setSpeedTrainerStart] = useState(80);
  const [speedTrainerEnd, setSpeedTrainerEnd] = useState(160);
  const [speedTrainerDuration, setSpeedTrainerDuration] = useState(5);
  const [speedTrainerActive, setSpeedTrainerActive] = useState(false);
  const [speedTrainerProgress, setSpeedTrainerProgress] = useState(0);

  // Tap tempo
  const [tapTimes, setTapTimes] = useState([]);
  const tapTimeoutRef = useRef(null);

  // Audio refs
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const currentNoteRef = useRef(0);
  const schedulerIdRef = useRef(null);
  const speedTrainerStartTimeRef = useRef(null);

  const getSubdivisionCount = useCallback((type) => {
    switch (type) {
      case 'eighths': return 2;
      case 'triplets': return 3;
      case 'sixteenths': return 4;
      default: return 1;
    }
  }, []);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((isAccent, ctx) => {
    if (!ctx) return;
    const now = ctx.currentTime;

    if (soundType === 'woodblock') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(isAccent ? 1600 : 1200, now);
      osc.frequency.exponentialRampToValueAtTime(isAccent ? 400 : 300, now + 0.1);
      osc.type = 'square';
      gain.gain.setValueAtTime(isAccent ? 0.6 : 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (soundType === 'cowbell') {
      const freqs = isAccent ? [800, 1200, 1600] : [600, 1000, 1400];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        gain.gain.setValueAtTime((isAccent ? 0.5 : 0.3) / freqs.length, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = isAccent ? 1200 : 800;
      osc.type = 'sine';
      gain.gain.setValueAtTime(isAccent ? 0.5 : 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (isAccent ? 0.12 : 0.08));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  }, [soundType]);

  const scheduleNote = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const subCount = getSubdivisionCount(subdivision);
    const totalSubBeats = timeSignature.beats * subCount;
    const absSub = currentNoteRef.current;
    const beatIndex = Math.floor(absSub / subCount);
    const subBeatInBeat = absSub % subCount;
    const isMainBeat = subBeatInBeat === 0;
    const isAccent = isMainBeat && beatIndex === 0;

    if (isMainBeat || subdivision !== 'none') {
      playSound(isAccent, ctx);
    }
    if (isMainBeat) {
      setCurrentBeat(beatIndex);
    }

    currentNoteRef.current = (currentNoteRef.current + 1) % totalSubBeats;
  }, [timeSignature, subdivision, getSubdivisionCount, playSound]);

  const scheduler = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    let effectiveBpm = bpm;
    if (speedTrainerActive && speedTrainerStartTimeRef.current) {
      const elapsed = (Date.now() - speedTrainerStartTimeRef.current) / 1000 / 60;
      const progress = Math.min(elapsed / speedTrainerDuration, 1);
      effectiveBpm = speedTrainerStart + (speedTrainerEnd - speedTrainerStart) * progress;
      setSpeedTrainerProgress(progress * 100);
      if (progress >= 1) {
        setIsPlaying(false);
        setSpeedTrainerActive(false);
      }
    }

    const secPerSub = 60 / effectiveBpm / getSubdivisionCount(subdivision);
    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      scheduleNote();
      nextNoteTimeRef.current += secPerSub;
    }
  }, [bpm, speedTrainerActive, speedTrainerStart, speedTrainerEnd, speedTrainerDuration, subdivision, getSubdivisionCount, scheduleNote]);

  const handleStart = useCallback(() => {
    const ctx = initAudioContext();
    setIsPlaying(true);
    nextNoteTimeRef.current = ctx.currentTime;
    currentNoteRef.current = 0;
    setCurrentBeat(0);
    schedulerIdRef.current = setInterval(scheduler, 25);
  }, [initAudioContext, scheduler]);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setSpeedTrainerActive(false);
    setSpeedTrainerProgress(0);
    if (schedulerIdRef.current) {
      clearInterval(schedulerIdRef.current);
      schedulerIdRef.current = null;
    }
  }, []);

  const handleTapTempo = useCallback(() => {
    const now = Date.now();
    const newTaps = [...tapTimes, now].slice(-6);
    setTapTimes(newTaps);
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (newTaps.length > 1) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) intervals.push(newTaps[i] - newTaps[i - 1]);
      const avg = intervals.reduce((a, b) => a + b) / intervals.length;
      const calc = Math.round(60000 / avg);
      if (calc >= 20 && calc <= 300) setBpm(calc);
    }

    tapTimeoutRef.current = setTimeout(() => setTapTimes([]), 1500);
  }, [tapTimes]);

  const handleStartSpeedTrainer = useCallback(() => {
    if (!isPlaying) {
      setSpeedTrainerActive(true);
      speedTrainerStartTimeRef.current = Date.now();
      handleStart();
    }
  }, [isPlaying, handleStart]);

  useEffect(() => {
    return () => {
      handleStop();
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    };
  }, [handleStop]);

  // Small pill button helper
  const Pill = ({ active, onClick, disabled, children, className = '' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors disabled:opacity-50 ${
        active
          ? 'bg-accent text-white'
          : 'border border-border hover:bg-surface-hover text-text-primary'
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* ── Main Control: BPM + Beat counter + Play ── */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-4">
        {/* Beat dots row */}
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: timeSignature.beats }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full font-mono font-bold text-sm flex items-center justify-center transition-all ${
                isPlaying && currentBeat === i
                  ? i === 0
                    ? 'bg-accent text-white scale-110 shadow-lg shadow-accent/30'
                    : 'bg-accent/70 text-white scale-105'
                  : 'bg-background border border-border text-text-muted'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* BPM display */}
        <div className="text-center mb-3">
          <span className="font-mono text-6xl font-bold text-text-primary leading-none">{bpm}</span>
          <span className="text-text-muted text-sm ml-2">BPM</span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="20"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          disabled={isPlaying}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:opacity-50 mb-3"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((bpm - 20) / 280) * 100}%, #e5e5e5 ${((bpm - 20) / 280) * 100}%, #e5e5e5 100%)`,
          }}
        />

        {/* BPM input + tap + play/stop row */}
        <div className="flex gap-2">
          <input
            type="number"
            min="20"
            max="300"
            value={bpm}
            onChange={(e) => {
              let v = parseInt(e.target.value) || 20;
              setBpm(Math.max(20, Math.min(300, v)));
            }}
            disabled={isPlaying}
            className="w-20 px-2 py-2 border border-border rounded-lg font-mono text-sm text-center disabled:opacity-50"
          />
          <button
            onClick={handleTapTempo}
            disabled={isPlaying}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface-hover disabled:opacity-50 transition-colors"
          >
            Tap{tapTimes.length > 0 ? ` (${tapTimes.length})` : ''}
          </button>
          <button
            onClick={isPlaying ? handleStop : handleStart}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 ${
              isPlaying
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-accent text-white hover:bg-accent-hover'
            }`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* ── Options: compact 2-col grid ── */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Time Signature */}
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">Time</p>
          <div className="flex flex-wrap gap-1">
            {TIME_SIGNATURES.map((sig) => (
              <Pill
                key={sig.label}
                active={timeSignature.label === sig.label}
                disabled={isPlaying}
                onClick={() => {
                  setTimeSignature(sig);
                  currentNoteRef.current = 0;
                  setCurrentBeat(0);
                }}
              >
                {sig.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* Subdivisions */}
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">Subdivision</p>
          <div className="flex flex-wrap gap-1">
            {SUBDIVISIONS.map((sub) => (
              <Pill
                key={sub.value}
                active={subdivision === sub.value}
                disabled={isPlaying}
                onClick={() => {
                  setSubdivision(sub.value);
                  currentNoteRef.current = 0;
                }}
              >
                {sub.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">Sound</p>
          <div className="flex flex-wrap gap-1">
            {['click', 'woodblock', 'cowbell'].map((s) => (
              <Pill
                key={s}
                active={soundType === s}
                disabled={isPlaying}
                onClick={() => setSoundType(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Pill>
            ))}
          </div>
        </div>

        {/* Tempo presets */}
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">Preset</p>
          <div className="flex flex-wrap gap-1">
            {TEMPO_PRESETS.map((p) => (
              <Pill
                key={p.label}
                active={bpm === p.bpm}
                disabled={isPlaying}
                onClick={() => setBpm(p.bpm)}
              >
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      {/* ── Speed Trainer (collapsible) ── */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSpeedTrainer(!showSpeedTrainer)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
        >
          <span>Speed Trainer</span>
          <span className="text-text-muted text-xs">{showSpeedTrainer ? '\u25B2' : '\u25BC'}</span>
        </button>

        {showSpeedTrainer && (
          <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-text-muted uppercase mb-1">From</label>
                <input
                  type="number" min="20" max="299"
                  value={speedTrainerStart}
                  onChange={(e) => setSpeedTrainerStart(parseInt(e.target.value) || 80)}
                  disabled={isPlaying}
                  className="w-full px-2 py-1.5 border border-border rounded-lg font-mono text-sm text-center disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] text-text-muted uppercase mb-1">To</label>
                <input
                  type="number" min="21" max="300"
                  value={speedTrainerEnd}
                  onChange={(e) => setSpeedTrainerEnd(parseInt(e.target.value) || 160)}
                  disabled={isPlaying}
                  className="w-full px-2 py-1.5 border border-border rounded-lg font-mono text-sm text-center disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[10px] text-text-muted uppercase mb-1">Minutes</label>
                <input
                  type="number" min="1" max="60"
                  value={speedTrainerDuration}
                  onChange={(e) => setSpeedTrainerDuration(parseInt(e.target.value) || 5)}
                  disabled={isPlaying}
                  className="w-full px-2 py-1.5 border border-border rounded-lg font-mono text-sm text-center disabled:opacity-50"
                />
              </div>
            </div>

            {speedTrainerProgress > 0 && (
              <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                <div className="bg-accent h-full transition-all" style={{ width: `${speedTrainerProgress}%` }} />
              </div>
            )}

            <button
              onClick={handleStartSpeedTrainer}
              disabled={isPlaying}
              className="w-full py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              Start Speed Trainer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
