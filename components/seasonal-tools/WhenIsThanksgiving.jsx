'use client';

import { useState, useEffect } from 'react';

function getNthWeekday(year, month, weekday, n) {
  const first = new Date(year, month, 1);
  let day = 1 + ((weekday - first.getDay() + 7) % 7);
  day += (n - 1) * 7;
  return new Date(year, month, day);
}

function getUSThanksgiving(year) {
  return getNthWeekday(year, 10, 4, 4); // November, Thursday, 4th
}

function getCanadianThanksgiving(year) {
  return getNthWeekday(year, 9, 1, 2); // October, Monday, 2nd
}

const FACTS = [
  'The first Thanksgiving was celebrated in 1621 between Pilgrims and Native Americans.',
  'Turkey is the most popular Thanksgiving dish, with about 46 million turkeys consumed in the US annually.',
  'Thanksgiving is the busiest travel period in the US, with over 55 million Americans traveling.',
  'Canada celebrates Thanksgiving on the 2nd Monday of October, about 6 weeks before the US.',
  'President Abraham Lincoln made Thanksgiving a national holiday in 1863.',
  'The average Thanksgiving meal contains about 3,000 calories per person.',
  'More than 500 million pounds of turkey are consumed during Thanksgiving in the US.',
  'Thanksgiving week sees the highest volume of domestic air travel of any time of the year.'
];

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsThanksgiving() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  const getNextThanksgivingDates = () => {
    let usDate = getUSThanksgiving(currentYear);
    let canadaDate = getCanadianThanksgiving(currentYear);

    if (usDate < now) usDate = getUSThanksgiving(currentYear + 1);
    if (canadaDate < now) canadaDate = getCanadianThanksgiving(currentYear + 1);

    return { us: usDate, canada: canadaDate };
  };

  const nextDates = getNextThanksgivingDates();
  const nextDate = nextDates.canada < nextDates.us ? nextDates.canada : nextDates.us;

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

        const startDate = getCanadianThanksgiving(currentYear - 1);
        const endDate = nextDates.canada.getFullYear() === currentYear ? getCanadianThanksgiving(currentYear) : getCanadianThanksgiving(currentYear + 1);

        const totalDuration = endDate - startDate;
        const elapsed = now - startDate;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDate, nextDates.canada, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      years.push({
        year: i,
        canada: getCanadianThanksgiving(i),
        us: getUSThanksgiving(i)
      });
    }
    return years;
  };

  const downloadCalendar = (country, date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Thanksgiving Calendar//EN
BEGIN:VEVENT
UID:thanksgiving-${country}-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Thanksgiving (${country})
DESCRIPTION:Celebrate Thanksgiving with family and friends
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thanksgiving-${country}-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-200">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-orange-900 mb-2">
            Thanksgiving {nextDates.canada < nextDates.us ? '(Canada)' : '(US)'}
          </h2>
          <p className="text-gray-600">
            {nextDates.canada < nextDates.us ? formatDate(nextDates.canada) : formatDate(nextDates.us)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="font-mono text-2xl font-bold text-orange-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="font-mono text-2xl font-bold text-orange-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="font-mono text-2xl font-bold text-orange-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="font-mono text-2xl font-bold text-orange-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* Canada vs US Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇨🇦</span>
            <h3 className="font-heading font-bold text-lg text-red-900">Canadian Thanksgiving</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-red-600 mb-3">
            {formatDate(nextDates.canada)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            2nd Monday of October. Celebrates the autumn harvest earlier than the US.
          </p>
          <button
            onClick={() => downloadCalendar('Canada', nextDates.canada)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>

        <div className="bg-white rounded-lg border border-blue-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇺🇸</span>
            <h3 className="font-heading font-bold text-lg text-blue-900">US Thanksgiving</h3>
          </div>
          <p className="text-2xl font-mono font-bold text-blue-600 mb-3">
            {formatDate(nextDates.us)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            4th Thursday of November. The main US shopping holiday, followed by Black Friday.
          </p>
          <button
            onClick={() => downloadCalendar('US', nextDates.us)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>
      </div>

      {/* Timing Difference */}
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
        <h3 className="font-heading font-bold text-amber-900 mb-2">Why Different Dates?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Canada celebrates Thanksgiving in October because their harvest occurs earlier due to a shorter growing season. The US celebrates in November, a tradition dating back to the 1621 harvest celebration. The dates are now separated by about 6 weeks, allowing families across both borders to celebrate at different times.
        </p>
        <p className="text-sm text-gray-700">
          The 4th Thursday tradition in the US was established to avoid conflicts with other holidays and to give retailers more time before Christmas shopping season.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Thanksgiving Dates (Next 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Canada</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">US</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-3 font-mono font-semibold text-gray-900">{row.year}</td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.canada.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
