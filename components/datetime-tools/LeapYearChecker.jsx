'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export default function LeapYearChecker() {
  const [year, setYear] = useState('');

  const result = useMemo(() => {
    if (!year || year.length !== 4) {
      return null;
    }

    const y = parseInt(year);
    const leap = isLeapYear(y);

    const nextLeaps = [];
    let current = y + 1;
    while (nextLeaps.length < 10) {
      if (isLeapYear(current)) {
        nextLeaps.push(current);
      }
      current++;
    }

    const prevLeaps = [];
    current = y - 1;
    while (prevLeaps.length < 10) {
      if (isLeapYear(current)) {
        prevLeaps.unshift(current);
      }
      current--;
    }

    return {
      year: y,
      isLeap: leap,
      nextLeaps,
      prevLeaps,
    };
  }, [year]);

  const getExplanation = () => {
    if (!result) return '';

    if (result.isLeap) {
      return `${result.year} is a leap year. It has 366 days with February having 29 days.`;
    } else {
      return `${result.year} is not a leap year. It has 365 days with February having 28 days.`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Year
        </label>
        <Input
          type="number"
          min="1900"
          max="2100"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="YYYY"
        />
      </div>

      {result && (
        <div className="space-y-4">
          <div className={`border rounded-[var(--radius-card)] p-6 ${
            result.isLeap
              ? 'bg-green-50 border-green-200'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 font-mono ${
              result.isLeap ? 'text-green-900' : 'text-blue-900'
            }`}>
              {result.year}
            </h3>
            <p className={`text-lg font-semibold ${
              result.isLeap ? 'text-green-800' : 'text-blue-800'
            }`}>
              {result.isLeap ? 'Leap Year' : 'Not a Leap Year'}
            </p>
            <p className={`text-sm mt-3 ${
              result.isLeap ? 'text-green-700' : 'text-blue-700'
            }`}>
              {getExplanation()}
            </p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">Leap Year Rule</h3>
            <div className="space-y-2 text-sm text-text-primary">
              <p>A year is a leap year if:</p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary">
                <li>It is divisible by 4, AND</li>
                <li>It is not divisible by 100, UNLESS</li>
                <li>It is also divisible by 400</li>
              </ul>
              <p className="mt-3 text-text-muted text-xs">
                Examples: 2000 is leap (divisible by 400), 1900 is not (divisible by 100 but not 400), 2024 is leap (divisible by 4, not by 100)
              </p>
            </div>
          </div>

          {result.year && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">Previous Leap Years</h3>
                <div className="flex flex-wrap gap-2">
                  {result.prevLeaps.map((y) => (
                    <span
                      key={y}
                      className="px-3 py-1 bg-white border border-border rounded-[var(--radius-input)] text-sm font-mono text-text-primary"
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">Next Leap Years</h3>
                <div className="flex flex-wrap gap-2">
                  {result.nextLeaps.map((y) => (
                    <span
                      key={y}
                      className="px-3 py-1 bg-white border border-border rounded-[var(--radius-input)] text-sm font-mono text-text-primary"
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-100 border border-accent rounded-[var(--radius-card)] p-4">
            <p className="text-sm text-text-primary">
              <strong>Fun fact:</strong> Leap years keep our calendar aligned with Earth's orbit. Without leap years, the calendar would drift by about 24 days every century!
            </p>
          </div>
        </div>
      )}

      {!result && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">Enter a year to check if it's a leap year</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Check if a year is a leap year and learn about the leap year rule.</p>
      </div>
    </div>
  );
}
