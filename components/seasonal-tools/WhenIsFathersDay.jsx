'use client';

import { useState, useEffect } from 'react';

function getNthWeekday(year, month, weekday, n) {
  const first = new Date(year, month, 1);
  let day = 1 + ((weekday - first.getDay() + 7) % 7);
  day += (n - 1) * 7;
  return new Date(year, month, day);
}

function getFathersDay(year) {
  return getNthWeekday(year, 5, 0, 3); // June, Sunday, 3rd
}

function getAustraliaFathersDay(year) {
  return getNthWeekday(year, 8, 0, 1); // September, Sunday, 1st
}

const FACTS = [
  'Father\'s Day is celebrated in over 100 countries, though on different dates.',
  'In the US and UK, Father\'s Day is always the 3rd Sunday of June.',
  'Australia celebrates Father\'s Day on the first Sunday of September (their spring).',
  'The tradition of Father\'s Day originated in the United States in the early 1900s.',
  'Sonora Dodd campaigned to establish Father\'s Day after hearing a Mother\'s Day sermon.',
  'Ties are the most common Father\'s Day gift, followed by clothing and grooming products.',
  'Father\'s Day became an official US holiday in 1972 under President Richard Nixon.',
  'More Father\'s Day cards are sent than any greeting except Christmas.'
];

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsFathersDay() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  const getNextFathersDays = () => {
    let ukDate = getFathersDay(currentYear);
    let auDate = getAustraliaFathersDay(currentYear);

    if (ukDate < now) ukDate = getFathersDay(currentYear + 1);
    if (auDate < now) auDate = getAustraliaFathersDay(currentYear + 1);

    return { uk: ukDate, au: auDate };
  };

  const nextDates = getNextFathersDays();
  const nextDate = nextDates.uk < nextDates.au ? nextDates.uk : nextDates.au;

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

        const ukStart = getFathersDay(currentYear - 1);
        const ukNext = nextDates.uk.getFullYear() === currentYear ? getFathersDay(currentYear) : getFathersDay(currentYear + 1);

        const totalDuration = ukNext - ukStart;
        const elapsed = now - ukStart;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDate, nextDates.uk, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      years.push({
        year: i,
        uk: getFathersDay(i),
        au: getAustraliaFathersDay(i)
      });
    }
    return years;
  };

  const downloadCalendar = (country, date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const countryName = country === 'UK' ? 'UK and US' : 'Australia';
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Father's Day Calendar//EN
BEGIN:VEVENT
UID:fathers-day-${country}-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Father's Day (${countryName})
DESCRIPTION:Celebrate Father's Day
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fathers-day-${country}-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-8 border border-blue-200">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-blue-900 mb-2">
            Father's Day {nextDates.uk < nextDates.au ? '(UK & US)' : '(Australia)'}
          </h2>
          <p className="text-gray-600">
            {nextDates.uk < nextDates.au ? formatDate(nextDates.uk) : formatDate(nextDates.au)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="font-mono text-2xl font-bold text-blue-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="font-mono text-2xl font-bold text-blue-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="font-mono text-2xl font-bold text-blue-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="font-mono text-2xl font-bold text-blue-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-sky-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* UK & US vs Australia Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-blue-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇬🇧 🇺🇸</span>
            <h3 className="font-heading font-bold text-lg text-blue-900">UK & US Father's Day</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-blue-600 mb-3">
            {formatDate(nextDates.uk)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            3rd Sunday of June. Consistent across the UK, US, and many other countries.
          </p>
          <button
            onClick={() => downloadCalendar('UK', nextDates.uk)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇦🇺</span>
            <h3 className="font-heading font-bold text-lg text-green-900">Australia Father's Day</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-green-600 mb-3">
            {formatDate(nextDates.au)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            1st Sunday of September (their spring). Varies by a month from the Northern Hemisphere.
          </p>
          <button
            onClick={() => downloadCalendar('AU', nextDates.au)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>
      </div>

      {/* Global Variation Note */}
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
        <h3 className="font-heading font-bold text-amber-900 mb-2">Global Variations</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Most countries celebrate Father's Day on the 3rd Sunday of June (UK, US, Europe, and many others). However, some countries have chosen different dates: Australia and New Zealand celebrate on the 1st Sunday of September, while some countries like Thailand celebrate on December 5th. The tradition itself originated in the US in the early 1900s.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Father's Day Dates (Next 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">UK & US</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Australia</th>
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
                    {row.au.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
