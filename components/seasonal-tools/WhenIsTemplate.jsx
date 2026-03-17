'use client';

import { useState, useMemo } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';

export default function WhenIsTemplate({
  name,
  getDate,
  description,
  traditions,
  funFacts,
  relatedSlugs = [],
}) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate year options (current year + next 10)
  const yearOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i < 11; i++) {
      const year = currentYear + i;
      options.push({ value: String(year), label: String(year) });
    }
    return options;
  }, [currentYear]);

  // Get the primary date to display (this year, or next year if passed)
  const primaryDate = useMemo(() => {
    const thisYearDate = getDate(currentYear);
    const today = new Date();

    if (thisYearDate >= today) {
      return thisYearDate;
    }
    return getDate(currentYear + 1);
  }, [getDate, currentYear]);

  // Get date for selected year
  const selectedDate = useMemo(() => {
    return getDate(parseInt(selectedYear));
  }, [selectedYear, getDate]);

  // Calculate countdown
  const countdown = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(selectedDate);
    targetDate.setHours(0, 0, 0, 0);

    const diff = targetDate - today;
    const daysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return { isPast: true, daysAgo: Math.abs(daysRemaining) };
    }

    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const hours = totalHours % 24;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      isPast: false,
      days: daysRemaining,
      hours,
      minutes,
    };
  }, [selectedDate]);

  // Generate dates table for next 10 years
  const datesTable = useMemo(() => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      const date = getDate(year);
      const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
      const dateStr = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      rows.push({ year, dayName, dateStr });
    }
    return rows;
  }, [getDate, currentYear]);

  // Format primary date display
  const primaryDateFormatted = primaryDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const selectedDateFormatted = selectedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Primary Date Display */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-8">
        <h2 className="font-heading text-lg font-semibold text-text-secondary mb-2">
          Next occurrence of {name}
        </h2>
        <p className="font-mono text-4xl font-bold text-text-primary mb-4">
          {primaryDateFormatted}
        </p>

        {/* Countdown */}
        <div className="space-y-3">
          {countdown.isPast ? (
            <div className="text-text-secondary">
              It was {countdown.daysAgo} day{countdown.daysAgo !== 1 ? 's' : ''} ago
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-text-secondary">Time remaining:</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-accent">
                    {countdown.days}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    day{countdown.days !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-accent">
                    {countdown.hours}
                  </div>
                  <div className="text-xs text-text-muted mt-1">hour{countdown.hours !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-3xl font-bold text-accent">
                    {countdown.minutes}
                  </div>
                  <div className="text-xs text-text-muted mt-1">minute{countdown.minutes !== 1 ? 's' : ''}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Year Selector */}
      <Card className="p-6">
        <label className="block text-sm font-semibold text-text-primary mb-3">
          Select a different year
        </label>
        <Select
          options={yearOptions}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full"
        />
        {selectedYear !== String(currentYear) && (
          <p className="font-mono text-lg font-semibold text-text-primary mt-4 pt-4 border-t border-border">
            {name} in {selectedYear}: {selectedDateFormatted}
          </p>
        )}
      </Card>

      {/* What is this holiday? */}
      <Card className="p-6">
        <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
          What is {name}?
        </h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </Card>

      {/* Traditions */}
      {traditions && traditions.length > 0 && (
        <Card className="p-6">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
            Traditions
          </h3>
          <ul className="space-y-3">
            {traditions.map((tradition, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-accent font-bold text-lg mt-0.5">•</span>
                <span className="text-text-secondary">{tradition}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Fun Facts */}
      {funFacts && funFacts.length > 0 && (
        <Card className="p-6 bg-amber-50 border-amber-200">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
            Fun Facts
          </h3>
          <ul className="space-y-3">
            {funFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-accent-warm font-bold text-lg mt-0.5">✨</span>
                <span className="text-text-secondary">{fact}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Dates Table */}
      <Card className="p-6 overflow-x-auto">
        <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
          When is {name} each year?
        </h3>
        <table className="w-full text-sm">
          <thead className="border-b-2 border-border">
            <tr>
              <th className="text-left py-2 px-3 font-heading font-bold text-text-primary">
                Year
              </th>
              <th className="text-left py-2 px-3 font-heading font-bold text-text-primary">
                Date
              </th>
              <th className="text-left py-2 px-3 font-heading font-bold text-text-primary">
                Day
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {datesTable.map((row) => (
              <tr key={row.year} className="hover:bg-surface-hover transition-colors">
                <td className="py-3 px-3 font-mono font-semibold text-text-primary">
                  {row.year}
                </td>
                <td className="py-3 px-3 text-text-secondary">{row.dateStr}</td>
                <td className="py-3 px-3 text-text-secondary">{row.dayName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Related Tools */}
      {relatedSlugs && relatedSlugs.length > 0 && (
        <Card className="p-6">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
            Related Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedSlugs.map((slug) => (
              <a
                key={slug}
                href={`/${slug}`}
                className="inline-block px-4 py-2 rounded-lg bg-blue-100 text-accent hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
