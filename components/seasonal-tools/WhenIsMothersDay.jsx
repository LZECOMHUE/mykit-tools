'use client';

import { useState, useEffect } from 'react';

// Easter algorithm (Computus)
function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getUKMothersDay(year) {
  const easter = getEasterDate(year);
  // Use date arithmetic instead of milliseconds to avoid DST issues
  const result = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() - 21);
  return result;
}

function getNthWeekday(year, month, weekday, n) {
  const first = new Date(year, month, 1);
  let day = 1 + ((weekday - first.getDay() + 7) % 7);
  day += (n - 1) * 7;
  return new Date(year, month, day);
}

function getUSMothersDay(year) {
  return getNthWeekday(year, 4, 0, 2); // May, Sunday, 2nd
}

const FACTS = [
  'Mother\'s Day originated as a Christian holiday to honor the Virgin Mary.',
  'In the UK, Mother\'s Day is called Mothering Sunday and dates back to the 16th century.',
  'Anna Jarvis campaigned to make Mother\'s Day an official US holiday in the early 1900s.',
  'Over 150 countries celebrate Mother\'s Day, though on different dates.',
  'The UK celebrates Mothering Sunday 3 weeks before Easter, which varies each year.',
  'In the US, Mother\'s Day is always the 2nd Sunday in May, making it more predictable.',
  'Carnations are the traditional flower associated with Mother\'s Day.',
  'Over 2.6 billion Mother\'s Day cards are sent annually worldwide.'
];

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsMothersDay() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  // Determine next Mother's Day (UK or US - show both)
  const getNextMothersDays = () => {
    let ukDate = getUKMothersDay(currentYear);
    let usDate = getUSMothersDay(currentYear);

    if (ukDate < now) ukDate = getUKMothersDay(currentYear + 1);
    if (usDate < now) usDate = getUSMothersDay(currentYear + 1);

    return { uk: ukDate, us: usDate };
  };

  const nextDates = getNextMothersDays();
  const nextDate = nextDates.uk < nextDates.us ? nextDates.uk : nextDates.us;

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextDate - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });

        // Calculate progress
        const ukStart = getUKMothersDay(currentYear - 1);
        const ukNext = nextDates.uk.getFullYear() === currentYear ? getUKMothersDay(currentYear) : getUKMothersDay(currentYear + 1);
        const usStart = getUSMothersDay(currentYear - 1);
        const usNext = nextDates.us.getFullYear() === currentYear ? getUSMothersDay(currentYear) : getUSMothersDay(currentYear + 1);

        const start = nextDates.uk < nextDates.us ? ukStart : usStart;
        const end = nextDates.uk < nextDates.us ? ukNext : usNext;

        const totalDuration = end - start;
        const elapsed = now - start;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDate, nextDates.uk, nextDates.us, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      years.push({
        year: i,
        uk: getUKMothersDay(i),
        us: getUSMothersDay(i)
      });
    }
    return years;
  };

  const downloadCalendar = (country, date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Mother's Day Calendar//EN
BEGIN:VEVENT
UID:mothers-day-${country}-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Mother's Day (${country})
DESCRIPTION:Celebrate Mother's Day
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mothers-day-${country}-${date.getFullYear()}.ics`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  const yearData = generateYearTable();

  return (
    <div className="space-y-6">
      {/* Hero Countdown Section */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 border border-pink-200">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-pink-900 mb-2">
            Mother's Day {nextDates.uk < nextDates.us ? '(UK)' : '(US)'}
          </h2>
          <p className="text-gray-600">
            {nextDates.uk < nextDates.us ? formatDate(nextDates.uk) : formatDate(nextDates.us)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
            <div className="font-mono text-2xl font-bold text-pink-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
            <div className="font-mono text-2xl font-bold text-pink-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
            <div className="font-mono text-2xl font-bold text-pink-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-pink-100">
            <div className="font-mono text-2xl font-bold text-pink-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-pink-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* UK vs US Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-blue-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇬🇧</span>
            <h3 className="font-heading font-bold text-lg text-blue-900">UK Mothering Sunday</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-blue-600 mb-3">
            {formatDate(nextDates.uk)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            4th Sunday of Lent, always 3 weeks before Easter Sunday. Varies each year.
          </p>
          <button
            onClick={() => downloadCalendar('UK', nextDates.uk)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>

        <div className="bg-white rounded-lg border border-rose-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇺🇸</span>
            <h3 className="font-heading font-bold text-lg text-rose-900">US Mother's Day</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-rose-600 mb-3">
            {formatDate(nextDates.us)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            2nd Sunday of May. Always consistent, second Sunday of the month.
          </p>
          <button
            onClick={() => downloadCalendar('US', nextDates.us)}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>
      </div>

      {/* Why the Difference */}
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
        <h3 className="font-heading font-bold text-amber-900 mb-2">Why Two Different Dates?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          The UK celebrates Mothering Sunday on the 4th Sunday of Lent, a Christian tradition dating back to the 16th century. This date varies each year because it's tied to Easter. The US celebrates Mother's Day on the 2nd Sunday of May, a secular tradition established in the early 1900s. Most other countries follow the US tradition on the second Sunday of May.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Mother's Day Dates (Next 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">UK (Mothering Sunday)</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">US (Mother's Day)</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-3 font-mono font-semibold text-gray-900">{row.year}</td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.uk.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.us.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
