'use client';

import { useState, useMemo } from 'react';

const TIMEZONES = {
  'London': 'UTC+0',
  'Paris': 'UTC+1',
  'Berlin': 'UTC+1',
  'Dubai': 'UTC+4',
  'Mumbai': 'UTC+5:30',
  'Bangkok': 'UTC+7',
  'Singapore': 'UTC+8',
  'Hong Kong': 'UTC+8',
  'Tokyo': 'UTC+9',
  'Sydney': 'UTC+10',
  'Auckland': 'UTC+12',
  'Los Angeles': 'UTC-8',
  'Denver': 'UTC-7',
  'New York': 'UTC-5',
  'Toronto': 'UTC-5',
  'Mexico City': 'UTC-6',
  'São Paulo': 'UTC-3',
  'Buenos Aires': 'UTC-3',
};

const TIMEZONE_OFFSETS = {
  'UTC-8': -8, 'UTC-7': -7, 'UTC-6': -6, 'UTC-5': -5, 'UTC-4': -4,
  'UTC-3': -3, 'UTC-2': -2, 'UTC-1': -1, 'UTC+0': 0, 'UTC+1': 1,
  'UTC+2': 2, 'UTC+3': 3, 'UTC+4': 4, 'UTC+5': 5, 'UTC+5:30': 5.5,
  'UTC+6': 6, 'UTC+7': 7, 'UTC+8': 8, 'UTC+9': 9, 'UTC+10': 10,
  'UTC+11': 11, 'UTC+12': 12,
};

export default function JetLagCalculator() {
  const [origin, setOrigin] = useState('London');
  const [destination, setDestination] = useState('New York');
  const [useTimezones, setUseTimezones] = useState(false);
  const [customOriginTZ, setCustomOriginTZ] = useState('UTC+0');
  const [customDestinationTZ, setCustomDestinationTZ] = useState('UTC-5');

  const data = useMemo(() => {
    const originTZ = useTimezones
      ? customOriginTZ
      : TIMEZONES[origin];
    const destTZ = useTimezones
      ? customDestinationTZ
      : TIMEZONES[destination];

    const originOffset = TIMEZONE_OFFSETS[originTZ];
    const destOffset = TIMEZONE_OFFSETS[destTZ];

    const diff = Math.abs(destOffset - originOffset);
    const direction = destOffset > originOffset ? 'eastbound' : 'westbound';

    // Severity scoring
    let severity = 'mild';
    let recoveryDays = 1;
    if (diff > 4 && diff <= 8) {
      severity = 'moderate';
      recoveryDays = 3;
    } else if (diff > 8) {
      severity = 'severe';
      recoveryDays = Math.ceil(diff / 2);
    }

    return {
      originTZ,
      destTZ,
      diff,
      direction,
      severity,
      recoveryDays
    };
  }, [origin, destination, useTimezones, customOriginTZ, customDestinationTZ]);

  const tips = useMemo(() => {
    if (data.direction === 'eastbound') {
      return [
        'Arrive well-rested or sleep on the plane',
        'Seek morning light immediately upon arrival',
        'Avoid caffeine in the afternoon',
        'Take a short nap on arrival day if needed',
        'Go to bed early for a few days'
      ];
    } else {
      return [
        'Stay awake during flight if possible',
        'Seek afternoon light upon arrival',
        'Avoid caffeine in the evening',
        'Have a light breakfast next morning',
        'Try melatonin in the evening'
      ];
    }
  }, [data.direction]);

  const cities = Object.keys(TIMEZONES).sort();
  const tzOptions = Object.keys(TIMEZONE_OFFSETS).sort();

  return (
    <div className="w-full space-y-6">
      {/* Mode Toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={useTimezones}
          onChange={(e) => setUseTimezones(e.target.checked)}
          className="w-4 h-4 rounded accent-accent"
        />
        <span className="text-text-secondary text-sm font-medium">
          Enter Timezones Manually
        </span>
      </label>

      {/* City or Timezone Selection */}
      <div className="grid gap-4 sm:grid-cols-2">
        {useTimezones ? (
          <>
            <div>
              <label className="text-text-secondary text-sm font-medium">
                Origin Timezone
              </label>
              <select
                value={customOriginTZ}
                onChange={(e) => setCustomOriginTZ(e.target.value)}
                className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {tzOptions.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-text-secondary text-sm font-medium">
                Destination Timezone
              </label>
              <select
                value={customDestinationTZ}
                onChange={(e) => setCustomDestinationTZ(e.target.value)}
                className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {tzOptions.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-text-secondary text-sm font-medium">
                Origin City
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-text-secondary text-sm font-medium">
                Destination City
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {/* Timezone Diff */}
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Timezone Difference
          </p>
          <p className="font-mono text-text-primary text-lg mt-1">
            {data.diff} hours
          </p>
        </div>

        {/* Direction */}
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Direction
          </p>
          <p className="text-text-primary text-sm mt-1">
            {data.direction === 'eastbound' ? 'Eastbound (losing time)' : 'Westbound (gaining time)'}
          </p>
        </div>

        {/* Severity */}
        <div className={`rounded-[var(--radius-card)] border p-3 ${
          data.severity === 'severe'
            ? 'bg-error bg-opacity-10 border-error'
            : data.severity === 'moderate'
            ? 'bg-warning bg-opacity-10 border-warning'
            : 'bg-success bg-opacity-10 border-success'
        }`}>
          <p className="text-[11px] font-medium uppercase">Jet Lag Severity</p>
          <p className={`text-sm mt-1 font-medium ${
            data.severity === 'severe'
              ? 'text-error'
              : data.severity === 'moderate'
              ? 'text-warning'
              : 'text-success'
          }`}>
            {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
          </p>
        </div>

        {/* Recovery Time */}
        <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-3">
          <p className="text-text-secondary text-[11px] font-medium uppercase">
            Estimated Recovery Time
          </p>
          <p className="font-mono text-accent text-lg mt-1">
            {data.recoveryDays} day{data.recoveryDays > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <p className="text-text-secondary text-sm font-medium mb-3">
          Adjustment Tips
        </p>
        <ul className="space-y-2">
          {tips.map((tip, idx) => (
            <li key={idx} className="text-text-secondary text-sm flex gap-2">
              <span className="text-accent font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Info */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Recovery times vary by individual. Staying hydrated, exercising, and maintaining a regular sleep schedule helps with adjustment.
        </p>
      </div>
    </div>
  );
}
