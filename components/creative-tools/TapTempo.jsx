'use client';

import { useState, useRef, useMemo } from 'react';

export default function TapTempo() {
  const [taps, setTaps] = useState([]);
  const [bpm, setBpm] = useState(0);
  const tapTimeoutRef = useRef(null);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now].slice(-8);
    setTaps(newTaps);

    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
    }

    // Reset after 3 seconds of inactivity
    clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = setTimeout(() => {
      setTaps([]);
      setBpm(0);
    }, 3000);
  };

  const handleReset = () => {
    setTaps([]);
    setBpm(0);
    clearTimeout(tapTimeoutRef.current);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-4 flex flex-col items-center justify-center space-y-4">
      {/* BPM Display */}
      <div className="text-center space-y-2 w-full">
        <p className="text-text-secondary text-sm font-medium">BPM</p>
        <p className="font-mono text-7xl font-bold text-accent">
          {bpm || '—'}
        </p>
      </div>

      {/* Tap Button */}
      <button
        onClick={handleTap}
        className="w-full py-12 bg-accent hover:bg-accent-hover text-white rounded-lg font-heading text-3xl font-bold transition-all active:scale-95 shadow-lg"
      >
        TAP
      </button>

      {/* Tap Count */}
      {taps.length > 0 && (
        <div className="text-center">
          <p className="text-text-secondary text-sm">Taps: {taps.length}</p>
          <p className="text-text-muted text-xs">Keep tapping to update BPM</p>
        </div>
      )}

      {/* Reset Button */}
      {taps.length > 0 && (
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-surface border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors"
        >
          Reset
        </button>
      )}

      {/* Info */}
      <div className="bg-info/10 border border-info rounded-lg p-4 text-center text-sm text-text-secondary max-w-xs">
        <p className="font-medium text-text-primary mb-2">How to Use</p>
        <p>Tap the button in rhythm with the beat. The BPM updates after at least 2 taps. Tap continuously to refine the calculation.</p>
      </div>
    </div>
  );
}
