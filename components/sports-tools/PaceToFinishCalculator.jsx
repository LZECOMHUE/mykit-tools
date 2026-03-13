'use client';

import { useState, useMemo } from 'react';

function parseTime(timeStr) {
  const parts = timeStr.split(':');
  if (parts.length !== 2) return null;
  const mins = parseInt(parts[0]) || 0;
  const secs = parseInt(parts[1]) || 0;
  return mins * 60 + secs;
}

function secondsToTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function PaceToFinishCalculator() {
  const [paceMinutes, setPaceMinutes] = useState('5');
  const [paceSeconds, setPaceSeconds] = useState('30');
  const [unit, setUnit] = useState('km');

  const paceInSeconds = useMemo(() => {
    const mins = parseInt(paceMinutes) || 0;
    const secs = parseInt(paceSeconds) || 0;
    return mins * 60 + secs;
  }, [paceMinutes, paceSeconds]);

  const races = useMemo(() => {
    if (paceInSeconds <= 0) return [];

    return [
      { name: '5K', distance: 5 },
      { name: '10K', distance: 10 },
      { name: 'Half Marathon', distance: 21.0975 },
      { name: 'Marathon', distance: 42.195 },
    ].map(race => {
      const totalSeconds = paceInSeconds * race.distance;
      return {
        ...race,
        time: secondsToTime(totalSeconds),
        totalSeconds
      };
    });
  }, [paceInSeconds]);

  const pacePerUnit = secondsToTime(paceInSeconds);

  return (
    <div className="w-full space-y-6">
      {/* Pace Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Your Pace (per {unit})
        </label>
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <input
              type="number"
              value={paceMinutes}
              onChange={(e) => setPaceMinutes(e.target.value)}
              min="0"
              placeholder="Minutes"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-[11px] text-text-muted mt-1">Minutes</p>
          </div>
          <div className="flex-1">
            <input
              type="number"
              value={paceSeconds}
              onChange={(e) => setPaceSeconds(e.target.value)}
              min="0"
              max="59"
              placeholder="Seconds"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-[11px] text-text-muted mt-1">Seconds</p>
          </div>
          <div className="flex-1">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="km">km</option>
              <option value="mile">mile</option>
            </select>
            <p className="text-[11px] text-text-muted mt-1">Unit</p>
          </div>
        </div>
      </div>

      {/* Current Pace Display */}
      {paceInSeconds > 0 && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Pace per {unit}
          </p>
          <p className="font-mono text-text-primary text-xl mt-1">
            {pacePerUnit}
          </p>
        </div>
      )}

      {/* Race Predictions */}
      {races.length > 0 && (
        <div className="space-y-2">
          <p className="text-text-secondary text-sm font-medium">
            Finish Times
          </p>
          {races.map((race) => (
            <div
              key={race.name}
              className="rounded-[var(--radius-card)] bg-surface border border-border p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-text-primary font-medium">{race.name}</p>
                <p className="text-text-secondary text-[12px]">
                  {race.distance.toFixed(2)} {unit}
                </p>
              </div>
              <p className="font-mono text-text-primary text-lg font-bold">
                {race.time}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Custom Distance */}
      <CustomDistanceCalculator
        paceInSeconds={paceInSeconds}
        unit={unit}
      />

      {/* Note */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Note: These are estimates based on maintaining a constant pace. Actual race times will vary based on terrain, weather, and fitness on race day.
        </p>
      </div>
    </div>
  );
}

function CustomDistanceCalculator({ paceInSeconds, unit }) {
  const [customDistance, setCustomDistance] = useState('');
  const [customUnit, setCustomUnit] = useState('km');

  const result = useMemo(() => {
    if (!customDistance || isNaN(parseFloat(customDistance))) return null;

    let distanceInKm = parseFloat(customDistance);
    if (customUnit === 'mile') {
      distanceInKm *= 1.60934;
    }

    // Convert to target unit
    let distanceInTargetUnit = distanceInKm;
    if (unit === 'mile') {
      distanceInTargetUnit = distanceInKm / 1.60934;
    }

    const totalSeconds = paceInSeconds * distanceInTargetUnit;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.round(totalSeconds % 60);

    const timeStr = hrs > 0
      ? `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      : `${mins}:${String(secs).padStart(2, '0')}`;

    return timeStr;
  }, [customDistance, customUnit, paceInSeconds, unit]);

  return (
    <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
      <p className="text-text-secondary text-sm font-medium mb-3">
        Custom Distance
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          value={customDistance}
          onChange={(e) => setCustomDistance(e.target.value)}
          placeholder="Distance"
          min="0"
          step="0.1"
          className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={customUnit}
          onChange={(e) => setCustomUnit(e.target.value)}
          className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="km">km</option>
          <option value="mile">mile</option>
        </select>
      </div>
      {result && (
        <div className="mt-3 text-center">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Finish Time
          </p>
          <p className="font-mono text-text-primary text-lg mt-1">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
