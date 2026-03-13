'use client';

import { useState, useMemo } from 'react';

function secondsToTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function SwimPaceCalculator() {
  const [poolLength, setPoolLength] = useState('50');
  const [laps, setLaps] = useState('10');
  const [timeMinutes, setTimeMinutes] = useState('10');
  const [timeSeconds, setTimeSeconds] = useState('30');

  const data = useMemo(() => {
    const pool = parseFloat(poolLength) || 0;
    const numLaps = parseFloat(laps) || 0;
    const mins = parseFloat(timeMinutes) || 0;
    const secs = parseFloat(timeSeconds) || 0;

    if (pool <= 0 || numLaps <= 0 || (mins === 0 && secs === 0)) return null;

    const totalSeconds = mins * 60 + secs;
    const totalDistance = pool * numLaps;

    // Pace per 100m
    const secondsPer100 = (totalSeconds / totalDistance) * 100;
    const pacePer100 = secondsToTime(secondsPer100);

    // Estimated times for standard distances
    const times = {
      '400m': secondsToTime((secondsPer100 / 100) * 400),
      '750m': secondsToTime((secondsPer100 / 100) * 750),
      '1500m': secondsToTime((secondsPer100 / 100) * 1500),
    };

    return {
      totalDistance,
      totalSeconds,
      pacePer100,
      times,
      speedMPerSec: (totalDistance / totalSeconds).toFixed(2)
    };
  }, [poolLength, laps, timeMinutes, timeSeconds]);

  return (
    <div className="w-full space-y-6">
      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Pool Length (meters)
          </label>
          <select
            value={poolLength}
            onChange={(e) => setPoolLength(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="25">25m</option>
            <option value="50">50m</option>
            <option value="openwater">Open Water (use custom)</option>
          </select>
          {poolLength === 'openwater' && (
            <input
              type="number"
              value={poolLength === 'openwater' ? '' : poolLength}
              onChange={(e) => setPoolLength(e.target.value)}
              placeholder="Custom distance in meters"
              min="0"
              className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          )}
        </div>

        <div>
          <label className="text-text-secondary text-sm font-medium">
            Number of Laps
          </label>
          <input
            type="number"
            value={laps}
            onChange={(e) => setLaps(e.target.value)}
            min="0"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="text-text-secondary text-sm font-medium">
            Time Taken
          </label>
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <input
                type="number"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                min="0"
                placeholder="Minutes"
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-[11px] text-text-muted mt-1">Minutes</p>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(e.target.value)}
                min="0"
                max="59"
                placeholder="Seconds"
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-[11px] text-text-muted mt-1">Seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {data && (
        <>
          {/* Main Pace */}
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Pace per 100m
            </p>
            <p className="text-4xl font-bold font-mono text-accent">
              {data.pacePer100}
            </p>
          </div>

          {/* Summary */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Total Distance
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {data.totalDistance}m
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Speed
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {data.speedMPerSec} m/s
              </p>
            </div>
          </div>

          {/* Standard Distance Times */}
          <div>
            <p className="text-text-secondary text-sm font-medium mb-3">
              Estimated Times for Standard Distances
            </p>
            <div className="space-y-2">
              {Object.entries(data.times).map(([distance, time]) => (
                <div
                  key={distance}
                  className="rounded-[var(--radius-card)] bg-surface border border-border p-3 flex items-center justify-between"
                >
                  <p className="text-text-primary font-medium">{distance}</p>
                  <p className="font-mono text-text-primary font-bold">{time}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Info */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Tip: Track your pace regularly to monitor improvement. Rest intervals and set variety help improve both speed and endurance.
        </p>
      </div>
    </div>
  );
}
