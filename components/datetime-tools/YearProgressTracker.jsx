'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';

export default function YearProgressTracker() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const calculateProgress = () => {
      const today = new Date();
      const year = today.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);

      const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
      const daysInYear = Math.floor((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
      const progressPercent = (dayOfYear / daysInYear) * 100;
      const daysRemaining = daysInYear - dayOfYear;

      // Week number
      const firstDay = new Date(year, 0, 1);
      const lastDay = new Date(today);
      const onejan = new Date(year, 0, 1);
      const millisecsPerDay = 86400000;
      const weekNumber = Math.ceil((((lastDay - onejan) / millisecsPerDay) + onejan.getDay() + 1) / 7);

      // Days until next weekend
      const daysUntilSunday = (7 - today.getDay()) % 7 || 7;
      const daysUntilMonday = daysUntilSunday + 1;

      // Days until next bank holiday (UK)
      const nextBankHoliday = getNextBankHoliday(today);

      // Quarter
      const quarter = Math.floor(today.getMonth() / 3) + 1;

      // Season
      const month = today.getMonth();
      let season = 'Winter';
      if (month >= 2 && month <= 4) season = 'Spring';
      if (month >= 5 && month <= 7) season = 'Summer';
      if (month >= 8 && month <= 10) season = 'Autumn';

      setProgress({
        year,
        dayOfYear,
        daysInYear,
        progressPercent,
        daysRemaining,
        weekNumber,
        daysUntilSunday,
        daysUntilMonday,
        nextBankHoliday,
        quarter,
        season,
        today: today.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    };

    calculateProgress();
  }, []);

  const getNextBankHoliday = (fromDate) => {
    // Simplified UK bank holidays for 2026
    const holidays = [
      { date: '2026-01-01', name: 'New Year Day' },
      { date: '2026-04-10', name: 'Good Friday' },
      { date: '2026-04-13', name: 'Easter Monday' },
      { date: '2026-05-04', name: 'Early May Bank Holiday' },
      { date: '2026-05-25', name: 'Spring Bank Holiday' },
      { date: '2026-08-31', name: 'Summer Bank Holiday' },
      { date: '2026-12-25', name: 'Christmas Day' },
      { date: '2026-12-26', name: 'Boxing Day' },
    ];

    const today = fromDate.toISOString().split('T')[0];
    const next = holidays.find(h => h.date >= today);

    if (next) {
      const nextDate = new Date(next.date);
      const daysUntil = Math.ceil((nextDate - fromDate) / (1000 * 60 * 60 * 24));
      return { ...next, daysUntil };
    }

    return null;
  };

  if (!progress) return <Card><p className="text-secondary">Loading...</p></Card>;

  return (
    <Card>
      <div className="space-y-4">
        <div className="text-center pb-4 border-b border-border">
          <p className="text-sm text-secondary mb-1">Today</p>
          <p className="font-heading text-xl font-bold text-primary">{progress.today}</p>
        </div>

        {/* Year progress */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-heading text-lg font-semibold text-primary">
              Year {progress.year} Progress
            </h3>
            <span className="font-mono font-bold text-accent">
              {progress.progressPercent.toFixed(1)}%
            </span>
          </div>

          <div className="w-full h-4 bg-border rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="p-2 bg-surface rounded-lg">
              <p className="font-mono text-lg font-bold text-primary">{progress.dayOfYear}</p>
              <p className="text-xs text-secondary">Day</p>
            </div>
            <div className="p-2 bg-surface rounded-lg">
              <p className="font-mono text-lg font-bold text-accent">{progress.daysRemaining}</p>
              <p className="text-xs text-secondary">Days left</p>
            </div>
            <div className="p-2 bg-surface rounded-lg">
              <p className="font-mono text-lg font-bold text-primary">{progress.daysInYear}</p>
              <p className="text-xs text-secondary">Total days</p>
            </div>
          </div>
        </div>

        {/* Time metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="font-mono text-2xl font-bold text-blue-600">{progress.weekNumber}</p>
            <p className="text-xs text-blue-700 mt-1">Week of year</p>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <p className="font-mono text-2xl font-bold text-purple-600">Q{progress.quarter}</p>
            <p className="text-xs text-purple-700 mt-1">Quarter</p>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-lg font-bold text-green-600">{progress.season}</p>
            <p className="text-xs text-green-700 mt-1">Current season</p>
          </div>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
            <p className="font-mono text-2xl font-bold text-orange-600">{progress.daysUntilSunday}</p>
            <p className="text-xs text-orange-700 mt-1">Days to weekend</p>
          </div>
        </div>

        {/* Next bank holiday */}
        {progress.nextBankHoliday && (
          <div className="p-4 bg-accent-muted border border-accent rounded-lg">
            <p className="text-sm text-secondary mb-1">Next bank holiday</p>
            <h4 className="font-heading text-lg font-semibold text-accent mb-1">
              {progress.nextBankHoliday.name}
            </h4>
            <p className="text-sm">
              <span className="font-mono font-bold">{progress.nextBankHoliday.daysUntil}</span> {' '}
              day{progress.nextBankHoliday.daysUntil !== 1 ? 's' : ''} away
            </p>
          </div>
        )}

        {/* Fun facts */}
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <p className="font-medium mb-2">📊 Fun facts:</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>You are on day {progress.dayOfYear} of {progress.daysInYear}</li>
            <li>You've completed {progress.progressPercent.toFixed(0)}% of the year</li>
            <li>You have {progress.daysRemaining} days remaining</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
