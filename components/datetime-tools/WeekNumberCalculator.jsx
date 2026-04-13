'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function WeekNumberCalculator() {
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const stats = useMemo(() => {
    if (!date) {
      return null;
    }

    const d = new Date(date + 'T00:00:00');
    const dayOfWeek = d.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const weekNumber = getWeekNumber(d);
    const dayOfYear = getDayOfYear(d);
    const daysInYear = new Date(d.getFullYear(), 11, 31).getDate();
    const daysRemaining = daysInYear - dayOfYear;

    const formatted = `${dayNames[dayOfWeek]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

    return {
      weekNumber,
      dayOfWeek: dayNames[dayOfWeek],
      dayOfYear,
      daysRemaining,
      formatted,
      year: d.getFullYear(),
      daysInYear,
    };
  }, [date]);

  const calendar = useMemo(() => {
    if (!date || !showCalendar) {
      return null;
    }

    const d = new Date(date + 'T00:00:00');
    const year = d.getFullYear();

    const weeks = [];
    const currentDate = new Date(Date.UTC(year, 0, 1));

    while (currentDate.getFullYear() === year) {
      const dayNum = currentDate.getUTCDay() || 7;
      const dateObj = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));

      if (dayNum === 1) {
        // Monday, calculate ISO week
        const d2 = new Date(dateObj);
        d2.setUTCDate(d2.getUTCDate() + 4);
        const yearStart = new Date(Date.UTC(d2.getUTCFullYear(), 0, 1));
        const weekNum = Math.ceil((((d2 - yearStart) / 86400000) + 1) / 7);

        const dateStr = currentDate.toISOString().split('T')[0];
        weeks.push({
          week: weekNum,
          date: dateStr,
          highlighted: dateStr === date,
        });
      }

      currentDate.setUTCDate(currentDate.getUTCDate() + 7);
    }

    return weeks;
  }, [date, showCalendar]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Date
        </label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={() => setDate(today)}
          className="text-sm text-accent hover:text-accent-hover mt-2"
        >
          Use today
        </button>
      </div>

      {stats && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">ISO Week</p>
              <p className="font-mono text-3xl font-bold text-text-primary">
                {stats.weekNumber}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Day of Week</p>
              <p className="font-mono text-lg font-bold text-text-primary">
                {stats.dayOfWeek}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Day of Year</p>
              <p className="font-mono text-3xl font-bold text-text-primary">
                {stats.dayOfYear}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Days Left</p>
              <p className="font-mono text-3xl font-bold text-text-primary">
                {stats.daysRemaining}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)]">
            <p className="text-sm font-medium text-text-secondary mb-2">Full Date</p>
            <p className="font-mono text-text-primary">{stats.formatted}</p>
          </div>

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="text-sm text-accent hover:text-accent-hover"
          >
            {showCalendar ? 'Hide' : 'Show'} week calendar for {stats.year}
          </button>

          {showCalendar && calendar && (
            <div className="bg-surface border border-border rounded-[var(--radius-card)]">
              <h3 className="text-sm font-medium text-text-secondary mb-4">Week Numbers for {stats.year}</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto">
                {calendar.map((week, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-[var(--radius-input)] text-center text-sm ${
                      week.highlighted
                        ? 'bg-accent text-white font-semibold'
                        : 'bg-white border border-border text-text-primary'
                    }`}
                  >
                    <p className="font-mono font-semibold">W{week.week}</p>
                    <p className="text-xs opacity-75">{week.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!date && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] text-center">
          <p className="text-text-muted">Select a date to see its week number and other details</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Find the ISO week number for any date, plus other calendar information.</p>
      </div>
    </div>
  );
}
