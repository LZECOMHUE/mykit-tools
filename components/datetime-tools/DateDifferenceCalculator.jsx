'use client';

import { useState, useMemo } from 'react';

const TABS = [
  { id: 'difference', label: 'Date Difference' },
  { id: 'add', label: 'Add / Subtract Days' },
];

function DateDifferenceTab() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [includeEndDate, setIncludeEndDate] = useState(false);

  const results = useMemo(() => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const reversed = start > end;
    const a = reversed ? end : start;
    const b = reversed ? start : end;

    // Total calendar days
    let totalDays = Math.floor((b - a) / (1000 * 60 * 60 * 24));
    if (includeEndDate) totalDays += 1;

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Business days and weekend days
    let businessDays = 0;
    let weekendDays = 0;
    const current = new Date(a);
    const limit = includeEndDate ? new Date(b.getTime() + 86400000) : new Date(b);

    while (current < limit) {
      const dow = current.getDay();
      if (dow !== 0 && dow !== 6) {
        businessDays++;
      } else {
        weekendDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Years, months, days breakdown
    let years = b.getFullYear() - a.getFullYear();
    let months = b.getMonth() - a.getMonth();
    let days = b.getDate() - a.getDate();
    if (includeEndDate) days += 1;

    if (days < 0) {
      months--;
      const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total months
    const totalMonths = years * 12 + months;

    // Hours, minutes, seconds
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Day of week for each date
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const startDayOfWeek = dayNames[a.getDay()];
    const endDayOfWeek = dayNames[b.getDay()];

    return {
      reversed,
      years, months, days,
      totalDays,
      totalWeeks, remainingDays,
      totalMonths,
      totalHours, totalMinutes, totalSeconds,
      businessDays, weekendDays,
      startDayOfWeek, endDayOfWeek,
    };
  }, [startDate, endDate, includeEndDate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diffStart" className="block text-sm font-medium text-text-primary mb-2">
            Start Date
          </label>
          <input
            id="diffStart"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="diffEnd" className="block text-sm font-medium text-text-primary mb-2">
            End Date
          </label>
          <input
            id="diffEnd"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
        <input
          type="checkbox"
          checked={includeEndDate}
          onChange={(e) => setIncludeEndDate(e.target.checked)}
          className="rounded border-border text-accent focus:ring-accent"
        />
        Include end date in count
      </label>

      {results && (
        <div className="space-y-3">
          {results.reversed && (
            <p className="text-xs text-warning bg-amber-50 border border-warning rounded-[var(--radius-input)] px-3 py-2">
              Start date is after end date. Showing absolute difference.
            </p>
          )}

          {/* Main result */}
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <p className="text-text-muted text-sm font-medium mb-3">Duration</p>
            <div className="text-center py-2">
              <div className="text-2xl font-heading font-bold text-text-primary">
                {results.years > 0 && <><span className="font-mono text-accent">{results.years}</span> {results.years === 1 ? 'year' : 'years'}, </>}
                {(results.months > 0 || results.years > 0) && <><span className="font-mono text-accent">{results.months}</span> {results.months === 1 ? 'month' : 'months'}, </>}
                <span className="font-mono text-accent">{results.days}</span> {results.days === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>

          {/* Totals grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Total Days</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{results.totalDays.toLocaleString()}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Weeks + Days</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{results.totalWeeks}w {results.remainingDays}d</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Total Months</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{results.totalMonths}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Business Days</p>
              <p className="text-2xl font-mono font-bold text-accent mt-1">{results.businessDays.toLocaleString()}</p>
              <p className="text-xs text-text-muted mt-1">Weekdays only</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Weekend Days</p>
              <p className="text-2xl font-mono font-bold text-text-secondary mt-1">{results.weekendDays.toLocaleString()}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 text-center">
              <p className="text-text-muted text-xs font-medium uppercase">Total Hours</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{results.totalHours.toLocaleString()}</p>
            </div>
          </div>

          {/* Day of week info */}
          <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4 text-sm text-text-secondary">
            <div className="flex justify-between">
              <span>Start date falls on a <span className="font-medium text-text-primary">{results.startDayOfWeek}</span></span>
              <span>End date falls on a <span className="font-medium text-text-primary">{results.endDayOfWeek}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddSubtractTab() {
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState('add');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('days');
  const [businessOnly, setBusinessOnly] = useState(false);

  const result = useMemo(() => {
    if (!baseDate || !amount || isNaN(parseInt(amount))) return null;

    const num = parseInt(amount);
    if (num < 0 || num > 99999) return null;
    const date = new Date(baseDate);
    const isAdd = operation === 'add';

    if (businessOnly && unit === 'days') {
      // Add/subtract business days only
      let remaining = num;
      const step = isAdd ? 1 : -1;
      const result = new Date(date);

      while (remaining > 0) {
        result.setDate(result.getDate() + step);
        const dow = result.getDay();
        if (dow !== 0 && dow !== 6) {
          remaining--;
        }
      }
      return result;
    }

    const multiplier = isAdd ? 1 : -1;

    if (unit === 'days') {
      date.setDate(date.getDate() + num * multiplier);
    } else if (unit === 'weeks') {
      date.setDate(date.getDate() + num * 7 * multiplier);
    } else if (unit === 'months') {
      date.setMonth(date.getMonth() + num * multiplier);
    } else if (unit === 'years') {
      date.setFullYear(date.getFullYear() + num * multiplier);
    }

    return date;
  }, [baseDate, amount, unit, operation, businessOnly]);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const formatDate = (d) => {
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Quick presets
  const presets = [
    { label: '30 days', amount: 30, unit: 'days' },
    { label: '60 days', amount: 60, unit: 'days' },
    { label: '90 days', amount: 90, unit: 'days' },
    { label: '6 months', amount: 6, unit: 'months' },
    { label: '1 year', amount: 1, unit: 'years' },
    { label: '10 weeks', amount: 10, unit: 'weeks' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="baseDate" className="block text-sm font-medium text-text-primary mb-2">
          Starting Date
        </label>
        <input
          id="baseDate"
          type="date"
          value={baseDate}
          onChange={(e) => setBaseDate(e.target.value)}
          className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setOperation('add')}
          className={`flex-1 py-2 px-4 rounded-[var(--radius-input)] text-sm font-medium transition-colors cursor-pointer ${
            operation === 'add'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
          }`}
        >
          + Add
        </button>
        <button
          onClick={() => setOperation('subtract')}
          className={`flex-1 py-2 px-4 rounded-[var(--radius-input)] text-sm font-medium transition-colors cursor-pointer ${
            operation === 'subtract'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
          }`}
        >
          - Subtract
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text-primary mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            max="99999"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 30"
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-text-primary mb-2">
            Unit
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      {unit === 'days' && (
        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={businessOnly}
            onChange={(e) => setBusinessOnly(e.target.checked)}
            className="rounded border-border text-accent focus:ring-accent"
          />
          Business days only (skip weekends)
        </label>
      )}

      {/* Quick presets */}
      <div>
        <p className="text-xs text-text-muted mb-2">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => { setAmount(String(p.amount)); setUnit(p.unit); setBusinessOnly(false); }}
              className="px-3 py-1 text-xs bg-surface border border-border rounded-full text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="rounded-[var(--radius-card)] bg-white border border-border p-5">
          <p className="text-text-muted text-sm font-medium mb-2">Result</p>
          <p className="text-2xl font-heading font-bold text-text-primary">
            {formatDate(result)}
          </p>
          <p className="text-sm text-text-secondary mt-2">
            {amount} {businessOnly ? 'business ' : ''}{unit} {operation === 'add' ? 'after' : 'before'} your starting date
          </p>
          <p className="text-xs text-text-muted mt-1 font-mono">
            {result.toISOString().split('T')[0]}
          </p>
        </div>
      )}
    </div>
  );
}

export default function DateDifferenceCalculator() {
  const [activeTab, setActiveTab] = useState('difference');

  return (
    <div className="w-full rounded-[var(--radius-card)] bg-surface">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border mb-5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px cursor-pointer ${
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'difference' && <DateDifferenceTab />}
      {activeTab === 'add' && <AddSubtractTab />}
    </div>
  );
}
