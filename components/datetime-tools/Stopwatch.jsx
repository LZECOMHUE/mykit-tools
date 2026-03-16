'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';

export default function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;

    lastTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;
      setTime((prev) => prev + delta);
    }, 10);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const pad = (n, len = 2) => String(n).padStart(len, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    if (isRunning || time > 0) {
      setLaps((prev) => [
        ...prev,
        {
          id: Date.now(),
          time,
          lapTime: prev.length > 0 ? time - prev[prev.length - 1].time : time,
        },
      ]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const fastestLap = laps.length > 0 ? Math.min(...laps.map((l) => l.lapTime)) : 0;
  const slowestLap = laps.length > 0 ? Math.max(...laps.map((l) => l.lapTime)) : 0;

  return (
    <div className="space-y-6">
      {/* Main Timer Display */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center">
        <p className="font-mono text-6xl font-bold text-text-primary mb-4">
          {formatTime(time)}
        </p>
        <p className="text-text-muted text-sm">hh:mm:ss.ms</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {!isRunning ? (
          <Button onClick={handleStart} className="col-span-2">
            Start
          </Button>
        ) : (
          <Button onClick={handleStop} className="col-span-2">
            Pause
          </Button>
        )}
        <Button onClick={handleLap} variant="secondary" disabled={time === 0}>
          Lap
        </Button>
        <Button onClick={handleReset} variant="secondary">
          Reset
        </Button>
      </div>

      {/* Lap Times */}
      {laps.length > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-text-secondary">Lap Times</h3>
            <p className="text-xs text-text-muted">
              {laps.length} lap{laps.length !== 1 ? 's' : ''}
            </p>
          </div>

          {fastestLap > 0 && (
            <div className="grid grid-cols-2 gap-4 text-xs mb-4">
              <div className="bg-green-50 border border-green-200 rounded-[var(--radius-input)] p-3">
                <p className="text-green-700 font-semibold">Fastest</p>
                <p className="font-mono text-green-900">{formatTime(fastestLap)}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-[var(--radius-input)] p-3">
                <p className="text-red-700 font-semibold">Slowest</p>
                <p className="font-mono text-red-900">{formatTime(slowestLap)}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {[...laps].reverse().map((lap, idx) => {
              const lapNumber = laps.length - idx;
              const isFastest = lap.lapTime === fastestLap;
              const isSlowest = lap.lapTime === slowestLap;

              return (
                <div
                  key={lap.id}
                  className={`flex justify-between items-center p-3 rounded-[var(--radius-input)] text-sm ${
                    isFastest
                      ? 'bg-green-50 border border-green-200'
                      : isSlowest
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-white border border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-text-secondary">Lap {lapNumber}</span>
                    <span className="font-mono text-text-primary">{formatTime(lap.lapTime)}</span>
                  </div>
                  <span className="font-mono text-text-secondary text-xs">
                    {formatTime(lap.time)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {laps.length === 0 && time > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted text-sm">Tap "Lap" to start recording lap times</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>A simple stopwatch timer with lap recording functionality.</p>
      </div>
    </div>
  );
}
