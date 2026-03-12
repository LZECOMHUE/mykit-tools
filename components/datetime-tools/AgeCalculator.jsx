'use client';

import { useState, useMemo } from 'react';

const ZODIAC_SIGNS = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

const CHINESE_ZODIAC = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
];

const GENERATIONS = [
  { name: 'Gen Z', start: 1997 },
  { name: 'Millennial', start: 1981 },
  { name: 'Gen X', start: 1965 },
  { name: 'Baby Boomer', start: 1946 },
  { name: 'Silent Generation', start: 0 },
];

export default function AgeCalculator() {
  const [dob, setDob] = useState('');

  const results = useMemo(() => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthYear = birthDate.getFullYear();

    // Calculate age in years, months, days
    let years = currentYear - birthYear;
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days alive
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday countdown
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const daysUntilBirthday = Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Day of week born
    const dayOfWeek = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Zodiac sign
    const zodiac = ZODIAC_SIGNS.find((sign) => {
      const month = birthDate.getMonth() + 1;
      const date = birthDate.getDate();
      const [startMonth, startDate] = sign.start;
      const [endMonth, endDate] = sign.end;

      if (startMonth <= endMonth) {
        return (month > startMonth || (month === startMonth && date >= startDate)) &&
               (month < endMonth || (month === endMonth && date <= endDate));
      } else {
        return (month > startMonth || (month === startMonth && date >= startDate)) ||
               (month < endMonth || (month === endMonth && date <= endDate));
      }
    });

    // Chinese zodiac
    const chineseIndex = (birthYear - 1900) % 12;
    const chineseZodiac = CHINESE_ZODIAC[chineseIndex < 0 ? chineseIndex + 12 : chineseIndex];

    // Generation
    const generation = GENERATIONS.find((gen) => birthYear >= gen.start);

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysUntilBirthday,
      dayOfWeek,
      zodiac: zodiac?.name || 'Unknown',
      chineseZodiac,
      generation: generation?.name || 'Unknown',
    };
  }, [dob]);

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-text-primary mb-2">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {results && (
        <div className="space-y-3">
          {/* Main Age Display */}
          <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
            <div className="text-center">
              <div className="text-5xl font-mono-num font-bold text-accent">
                {results.years}
              </div>
              <p className="text-text-secondary mt-2">
                {results.years === 1 ? 'year' : 'years'},
                {' '}{results.months} {results.months === 1 ? 'month' : 'months'},
                {' '}{results.days} {results.days === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Life Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Total Days</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-1">
                {results.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Total Weeks</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-1">
                {results.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-xs font-medium uppercase">Total Months</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary mt-1">
                {results.totalMonths.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Birthday & Zodiac */}
          <div className="space-y-3">
            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-sm font-medium">Days Until Next Birthday</p>
              <p className="text-3xl font-mono-num font-bold text-accent mt-2">
                {results.daysUntilBirthday}
              </p>
            </div>

            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-sm font-medium">Born on a</p>
              <p className="text-xl font-medium text-text-primary mt-2">{results.dayOfWeek}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                <p className="text-text-muted text-xs font-medium uppercase">Zodiac Sign</p>
                <p className="text-lg font-medium text-text-primary mt-2">{results.zodiac}</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                <p className="text-text-muted text-xs font-medium uppercase">Chinese Zodiac</p>
                <p className="text-lg font-medium text-text-primary mt-2">{results.chineseZodiac}</p>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
              <p className="text-text-muted text-sm font-medium">Generation</p>
              <p className="text-lg font-medium text-text-primary mt-2">{results.generation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
