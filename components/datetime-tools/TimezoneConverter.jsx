'use client';

import { useState, useMemo } from 'react';

const TIMEZONES = [
  { name: 'GMT (London)', value: 'Europe/London', offset: 0 },
  { name: 'CET (Paris, Berlin)', value: 'Europe/Paris', offset: 1 },
  { name: 'EET (Cairo, Athens)', value: 'Europe/Athens', offset: 2 },
  { name: 'MSK (Moscow)', value: 'Europe/Moscow', offset: 3 },
  { name: 'GST (Dubai, Gulf)', value: 'Asia/Dubai', offset: 4 },
  { name: 'IST (India)', value: 'Asia/Kolkata', offset: 5.5 },
  { name: 'CST (Beijing)', value: 'Asia/Shanghai', offset: 8 },
  { name: 'JST (Tokyo)', value: 'Asia/Tokyo', offset: 9 },
  { name: 'AEST (Sydney)', value: 'Australia/Sydney', offset: 10 },
  { name: 'NZST (Auckland)', value: 'Pacific/Auckland', offset: 12 },
  { name: 'EST (New York)', value: 'America/New_York', offset: -5 },
  { name: 'CST (Chicago)', value: 'America/Chicago', offset: -6 },
  { name: 'MST (Denver)', value: 'America/Denver', offset: -7 },
  { name: 'PST (Los Angeles)', value: 'America/Los_Angeles', offset: -8 },
  { name: 'HST (Honolulu)', value: 'Pacific/Honolulu', offset: -10 },
  { name: 'ART (Buenos Aires)', value: 'America/Argentina/Buenos_Aires', offset: -3 },
  { name: 'BRT (Rio de Janeiro)', value: 'America/Sao_Paulo', offset: -3 },
  { name: 'SAST (South Africa)', value: 'Africa/Johannesburg', offset: 2 },
  { name: 'SGT (Singapore)', value: 'Asia/Singapore', offset: 8 },
  { name: 'HKT (Hong Kong)', value: 'Asia/Hong_Kong', offset: 8 },
];

const QUICK_CONVERSIONS = [
  { name: 'London → New York', from: 'Europe/London', to: 'America/New_York' },
  { name: 'London → Tokyo', from: 'Europe/London', to: 'Asia/Tokyo' },
  { name: 'New York → London', from: 'America/New_York', to: 'Europe/London' },
  { name: 'New York → Tokyo', from: 'America/New_York', to: 'Asia/Tokyo' },
  { name: 'Singapore → London', from: 'Asia/Singapore', to: 'Europe/London' },
  { name: 'Sydney → New York', from: 'Australia/Sydney', to: 'America/New_York' },
];

export default function TimezoneConverter() {
  const [time, setTime] = useState('12:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceTimezone, setSourceTimezone] = useState('Europe/London');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');

  const results = useMemo(() => {
    if (!time || !date) return null;

    const [hours, mins] = time.split(':').map(Number);

    // Create a date object in the source timezone
    const sourceDate = new Date(`${date}T${time}:00`);

    try {
      // Get formatter for source and target timezones
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      // Create a date in source timezone and get UTC
      const parts = formatter.formatToParts(sourceDate);
      const year = parseInt(parts.find((p) => p.type === 'year').value);
      const month = parseInt(parts.find((p) => p.type === 'month').value);
      const day = parseInt(parts.find((p) => p.type === 'day').value);
      const sourceHours = parseInt(parts.find((p) => p.type === 'hour').value);
      const sourceMinutes = parseInt(parts.find((p) => p.type === 'minute').value);

      // Adjust to actual UTC
      const utcDate = new Date(sourceDate);
      utcDate.setHours(sourceHours, sourceMinutes);

      // Format in target timezone
      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTimezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const sourceFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceTimezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const targetTime = targetFormatter.format(sourceDate);
      const sourceTime = sourceFormatter.format(sourceDate);

      // Get timezone offsets (approximate)
      const sourceTimezoneObj = TIMEZONES.find((tz) => tz.value === sourceTimezone);
      const targetTimezoneObj = TIMEZONES.find((tz) => tz.value === targetTimezone);

      const offsetDiff = (targetTimezoneObj?.offset || 0) - (sourceTimezoneObj?.offset || 0);

      return {
        sourceTime,
        targetTime,
        sourceTimezone,
        targetTimezone,
        offsetDiff: offsetDiff !== 0 ? (offsetDiff > 0 ? `+${offsetDiff}` : offsetDiff) : '0',
      };
    } catch (error) {
      return null;
    }
  }, [time, date, sourceTimezone, targetTimezone]);

  const handleQuickConversion = (from, to) => {
    setSourceTimezone(from);
    setTargetTimezone(to);
  };

  const sourceTzName = TIMEZONES.find((tz) => tz.value === sourceTimezone)?.name || sourceTimezone;
  const targetTzName = TIMEZONES.find((tz) => tz.value === targetTimezone)?.name || targetTimezone;

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-primary mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-text-primary mb-2">
              Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Timezone Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sourceTimezone" className="block text-sm font-medium text-text-primary mb-2">
              From (Source)
            </label>
            <select
              id="sourceTimezone"
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="targetTimezone" className="block text-sm font-medium text-text-primary mb-2">
              To (Target)
            </label>
            <select
              id="targetTimezone"
              value={targetTimezone}
              onChange={(e) => setTargetTimezone(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <p className="text-text-muted text-xs font-medium uppercase mb-3">Conversion Result</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">{sourceTzName}</p>
                <p className="text-2xl font-mono-num font-bold text-text-primary">
                  {results.sourceTime}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-px flex-1 bg-border"></div>
                <span className="px-3 text-text-muted text-sm">→</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">{targetTzName}</p>
                <p className="text-2xl font-mono-num font-bold text-accent">
                  {results.targetTime}
                </p>
              </div>
            </div>
          </div>

          {/* Offset Info */}
          <div className="rounded-[var(--radius-card)] bg-surface p-3">
            <p className="text-xs text-text-muted font-medium">Timezone Offset</p>
            <p className="text-sm text-text-primary mt-1">
              {results.offsetDiff === '0' ? 'Same timezone' : `${results.offsetDiff} hours difference`}
            </p>
          </div>
        </div>
      )}

      {/* Quick Conversions */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text-primary">Quick Conversions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUICK_CONVERSIONS.map((conversion) => (
            <button
              key={conversion.name}
              onClick={() => handleQuickConversion(conversion.from, conversion.to)}
              className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:border-accent hover:text-text-primary transition-colors text-left"
            >
              {conversion.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
