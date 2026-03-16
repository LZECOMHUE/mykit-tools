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

function getBlackFriday(year) {
  const thanksgiving = getUSThanksgiving(year);
  return new Date(thanksgiving.getTime() + 24 * 60 * 60 * 1000); // Next day (Friday)
}

function getCyberMonday(year) {
  const thanksgiving = getUSThanksgiving(year);
  return new Date(thanksgiving.getTime() + 4 * 24 * 60 * 60 * 1000); // 4 days after Thursday (Monday)
}

const FACTS = [
  'Black Friday is the day after Thanksgiving and traditionally marks the start of the holiday shopping season.',
  'The term "Black Friday" refers to retailers moving from red (loss) to black (profit) on their accounting books.',
  'Black Friday sales now often start in October, weeks before the actual day.',
  'Online Black Friday sales have surpassed in-store sales in recent years.',
  'Cyber Monday follows Black Friday and focuses on online shopping deals.',
  'Black Friday 2023 saw over $9 billion in online sales in the US alone.',
  'Black Friday deals now typically run for the entire week, not just one day.',
  'The biggest discounts are often found on electronics, clothing, and home goods.'
];

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsBlackFriday() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  let thanksgiving = getUSThanksgiving(currentYear);
  let blackFriday = getBlackFriday(currentYear);
  let cyberMonday = getCyberMonday(currentYear);

  if (blackFriday < now) {
    thanksgiving = getUSThanksgiving(currentYear + 1);
    blackFriday = getBlackFriday(currentYear + 1);
    cyberMonday = getCyberMonday(currentYear + 1);
  }

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = blackFriday - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });

        const lastYear = getBlackFriday(currentYear - 1);
        const nextYear = blackFriday.getFullYear() === currentYear ? getBlackFriday(currentYear) : getBlackFriday(currentYear + 1);

        const totalDuration = nextYear - lastYear;
        const elapsed = now - lastYear;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blackFriday, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      years.push({
        year: i,
        thanksgiving: getUSThanksgiving(i),
        blackFriday: getBlackFriday(i),
        cyberMonday: getCyberMonday(i)
      });
    }
    return years;
  };

  const downloadCalendar = (type, date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const eventName = type === 'blackfriday' ? 'Black Friday' : 'Cyber Monday';
    const description = type === 'blackfriday'
      ? 'Biggest shopping day of the year. Great deals across all categories.'
      : 'Online shopping deals continue. Focus on digital and tech items.';

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Shopping Calendar//EN
BEGIN:VEVENT
UID:${type}-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:${eventName}
DESCRIPTION:${description}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-red-900 mb-2">
            Black Friday
          </h2>
          <p className="text-gray-600">
            {formatDate(blackFriday)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-red-100">
            <div className="font-mono text-2xl font-bold text-red-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-red-100">
            <div className="font-mono text-2xl font-bold text-red-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-red-100">
            <div className="font-mono text-2xl font-bold text-red-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-red-100">
            <div className="font-mono text-2xl font-bold text-red-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* Black Friday & Cyber Monday */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-red-200 p-6">
          <h3 className="font-heading font-bold text-lg text-red-900 mb-3">Black Friday</h3>
          <p className="text-2xl font-mono font-bold text-red-600 mb-3">
            {formatDate(blackFriday)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            The day after Thanksgiving is the biggest shopping day of the year. In-store and online deals on virtually everything.
          </p>
          <button
            onClick={() => downloadCalendar('blackfriday', blackFriday)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>

        <div className="bg-white rounded-lg border border-blue-200 p-6">
          <h3 className="font-heading font-bold text-lg text-blue-900 mb-3">Cyber Monday</h3>
          <p className="text-2xl font-mono font-bold text-blue-600 mb-3">
            {formatDate(cyberMonday)}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Three days after Thanksgiving. Continues shopping deals with focus on online retailers and digital products.
          </p>
          <button
            onClick={() => downloadCalendar('cybermonday', cyberMonday)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Add to Calendar
          </button>
        </div>
      </div>

      {/* When Did It Start */}
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
        <h3 className="font-heading font-bold text-amber-900 mb-2">What is Black Friday?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Black Friday is the day after US Thanksgiving (4th Thursday of November), traditionally marking the official start of the holiday shopping season. The name comes from accounting ledgers where red ink meant loss and black ink meant profit. Retailers would move from red to black on this busy shopping day.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Black Friday has evolved beyond one day, with deals now often starting in October and running throughout November. Cyber Monday (the Monday after Black Friday) has become equally important for online shopping deals.
        </p>
      </div>

      {/* Modern Evolution */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Black Friday & Cyber Monday Dates (Next 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Thanksgiving</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Black Friday</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Cyber Monday</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-3 font-mono font-semibold text-gray-900">{row.year}</td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.thanksgiving.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.blackFriday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.cyberMonday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shopping Tips */}
      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <h3 className="font-heading font-bold text-green-900 mb-3">Shopping During Black Friday</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Best deals on electronics, TVs, laptops, and tech gadgets throughout the week.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Deals now start weeks in advance online, not just on the day itself.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Cyber Monday often has better online exclusive deals than Black Friday.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Many retailers extend deals into the following week (Cyber Week).</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
