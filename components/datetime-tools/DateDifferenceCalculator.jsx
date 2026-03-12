'use client';

import { useState, useMemo } from 'react';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const results = useMemo(() => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) return null;

    // Calculate total days
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate business days (weekdays only)
    let businessDays = 0;
    let weekendDays = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      } else if (current < end) {
        weekendDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      businessDays,
      weekendDays,
    };
  }, [startDate, endDate]);

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-text-primary mb-2">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-text-primary mb-2">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {results && (
        <div className="space-y-3">
          {/* Main Result */}
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <p className="text-text-muted text-sm font-medium mb-3">Duration</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Years</span>
                <span className="font-mono-num text-lg font-bold text-accent">{results.years}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Months</span>
                <span className="font-mono-num text-lg font-bold text-text-primary">{results.months}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Days</span>
                <span className="font-mono-num text-lg font-bold text-text-primary">{results.days}</span>
              </div>
            </div>
          </div>

          {/* Total Days & Weeks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Total Days</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                {results.totalDays}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Total Weeks</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                {results.totalWeeks}
              </p>
            </div>
          </div>

          {/* Business Days & Weekends */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Business Days</p>
              <p className="text-2xl font-mono-num font-bold text-accent mt-2">
                {results.businessDays}
              </p>
              <p className="text-xs text-text-muted mt-1">Weekdays only</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Weekend Days</p>
              <p className="text-2xl font-mono-num font-bold text-text-secondary mt-2">
                {results.weekendDays}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
