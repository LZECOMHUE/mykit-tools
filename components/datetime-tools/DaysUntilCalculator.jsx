'use client';

import { useState, useMemo } from 'react';

const PRESETS = [
  { name: 'Christmas 2026', date: '2026-12-25' },
  { name: 'New Year 2027', date: '2027-01-01' },
  { name: 'Easter 2026', date: '2026-04-05' },
  { name: 'Summer Solstice 2026', date: '2026-06-21' },
  { name: 'Halloween 2026', date: '2026-10-31' },
];

export default function DaysUntilCalculator() {
  const [targetDate, setTargetDate] = useState('');
  const [eventName, setEventName] = useState('');

  const results = useMemo(() => {
    if (!targetDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    if (target < today) return null;

    const totalMs = target - today;
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);

    // Calculate percentage of year elapsed
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearEnd = new Date(today.getFullYear() + 1, 0, 1);
    const dayOfYear = Math.floor((today - yearStart) / (1000 * 60 * 60 * 24));
    const daysInYear = Math.floor((yearEnd - yearStart) / (1000 * 60 * 60 * 24));
    const yearElapsed = Math.round((dayOfYear / daysInYear) * 100);

    return {
      days,
      weeks,
      months,
      yearElapsed,
    };
  }, [targetDate]);

  const handlePreset = (date) => {
    setTargetDate(date);
  };

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-text-primary mb-2">
            Target Date
          </label>
          <input
            id="targetDate"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-text-primary mb-2">
            Event Name (optional)
          </label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Summer Holiday, Birthday"
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <p className="text-sm font-medium text-text-secondary mb-2">Quick Presets</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.date}
                onClick={() => handlePreset(preset.date)}
                className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:border-accent hover:text-text-primary transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {results && (
        <div className="space-y-3">
          {/* Main Display */}
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <div className="text-center">
              <p className="text-text-muted text-sm mb-2">
                {eventName ? `"${eventName}"` : 'Target Event'}
              </p>
              <div className="text-5xl font-mono-num font-bold text-accent">
                {results.days}
              </div>
              <p className="text-text-secondary mt-2">
                {results.days === 1 ? 'day' : 'days'} away
              </p>
            </div>
          </div>

          {/* Fun Sleeps Away */}
          <div className="rounded-[var(--radius-card)] bg-accent/10 border border-accent/20 p-4">
            <p className="text-center text-text-primary">
              That's{' '}
              <span className="font-mono-num font-bold text-accent">
                {results.days}
              </span>
              {' '}
              <span className="font-medium">sleeps away!</span>
            </p>
          </div>

          {/* Duration Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Weeks</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                {results.weeks}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Months</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                {results.months}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Days</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                {results.days % 30}
              </p>
            </div>
          </div>

          {/* Year Progress */}
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <p className="text-text-muted text-sm font-medium mb-3">Year Progress</p>
            <div className="mb-3 h-2 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${results.yearElapsed}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">{results.yearElapsed}% of 2026 elapsed</span>
              <span className="font-mono-num font-medium text-text-primary">
                {100 - results.yearElapsed}% remaining
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
