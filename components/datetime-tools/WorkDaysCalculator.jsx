'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';

const UK_BANK_HOLIDAYS_2025_2026 = [
  '2025-01-01', // New Year's Day
  '2025-04-18', // Good Friday
  '2025-04-21', // Easter Monday
  '2025-05-05', // Early May bank holiday
  '2025-05-26', // Spring bank holiday
  '2025-08-25', // Summer bank holiday
  '2025-12-25', // Christmas Day
  '2025-12-26', // Boxing Day
  '2026-01-01', // New Year's Day
  '2026-04-10', // Good Friday
  '2026-04-13', // Easter Monday
  '2026-05-04', // Early May bank holiday
  '2026-05-25', // Spring bank holiday
  '2026-08-31', // Summer bank holiday
  '2026-12-25', // Christmas Day
  '2026-12-28', // Boxing Day (observed)
];

export default function WorkDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excludeHolidays, setExcludeHolidays] = useState(true);

  const result = useMemo(() => {
    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return null;
    }

    let workDays = 0;
    let weekendDays = 0;
    let holidays = 0;
    let totalDays = 0;

    const current = new Date(start);
    while (current <= end) {
      const dateString = current.toISOString().split('T')[0];
      const dayOfWeek = current.getDay();

      totalDays++;

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend
        weekendDays++;
      } else if (excludeHolidays && UK_BANK_HOLIDAYS_2025_2026.includes(dateString)) {
        // Bank holiday
        holidays++;
      } else {
        // Working day
        workDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    return {
      totalDays,
      workDays,
      weekendDays,
      holidays,
    };
  }, [startDate, endDate, excludeHolidays]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Start Date
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            End Date
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <Toggle
        label="Exclude UK Bank Holidays"
        checked={excludeHolidays}
        onChange={setExcludeHolidays}
      />

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Total Days</p>
              <p className="font-mono text-3xl font-bold text-text-primary">
                {result.totalDays}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Working Days</p>
              <p className="font-mono text-3xl font-bold text-green-600">
                {result.workDays}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Weekends</p>
              <p className="font-mono text-3xl font-bold text-orange-600">
                {result.weekendDays}
              </p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-muted text-xs mb-2">Bank Holidays</p>
              <p className="font-mono text-3xl font-bold text-red-600">
                {result.holidays}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)]">
            <h3 className="text-sm font-medium text-text-secondary mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <p>
                From <span className="font-mono text-text-primary">{startDate}</span> to <span className="font-mono text-text-primary">{endDate}</span>
              </p>
              <p className="text-text-secondary">
                That's <span className="font-mono font-semibold text-text-primary">{result.workDays}</span> working days (Monday-Friday)
                {excludeHolidays && result.holidays > 0 && (
                  <> excluding <span className="font-mono font-semibold text-text-primary">{result.holidays}</span> bank holiday{result.holidays !== 1 ? 's' : ''}</>
                )}
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {!startDate && !endDate && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] text-center">
          <p className="text-text-muted">Select start and end dates to calculate working days</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Calculate the number of working days between two dates, excluding weekends and UK bank holidays.</p>
      </div>
    </div>
  );
}
