'use client';

import { useState, useEffect } from 'react';

const SUMMER_SOLSTICE_DATA = {
  2026: { month: 5, day: 21 },
  2027: { month: 5, day: 21 },
  2028: { month: 5, day: 20 },
  2029: { month: 5, day: 21 },
  2030: { month: 5, day: 21 },
  2031: { month: 5, day: 21 },
  2032: { month: 5, day: 20 },
  2033: { month: 5, day: 21 },
  2034: { month: 5, day: 21 },
  2035: { month: 5, day: 21 },
  2036: { month: 5, day: 20 },
};

const FACTS = [
  'The summer solstice is the longest day of the year in the Northern Hemisphere.',
  'Stonehenge in England aligns with the sunrise on the summer solstice.',
  'In the Arctic Circle, the summer solstice marks the beginning of the midnight sun.',
  'The summer solstice occurs when Earth\'s axial tilt is most inclined toward the Sun.',
  'Midsummer festivals are celebrated around the summer solstice in Scandinavia.',
  'The summer solstice is also called the vernal solstice or first day of summer.',
  'At the summer solstice, the day length difference between equator and poles is maximum.',
  'Ancient cultures used the summer solstice to mark important agricultural dates.'
];

function getSummerSolstice(year) {
  if (SUMMER_SOLSTICE_DATA[year]) {
    const data = SUMMER_SOLSTICE_DATA[year];
    return new Date(year, data.month, data.day);
  }
  return new Date(year, 5, 21); // Default to June 21
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsSummerSolstice() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  let nextSolstice = getSummerSolstice(currentYear);
  if (nextSolstice < now) {
    nextSolstice = getSummerSolstice(currentYear + 1);
  }

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextSolstice - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });

        const lastYear = getSummerSolstice(currentYear - 1);
        const nextYear = nextSolstice.getFullYear() === currentYear ? getSummerSolstice(currentYear) : getSummerSolstice(currentYear + 1);

        const totalDuration = nextYear - lastYear;
        const elapsed = now - lastYear;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextSolstice, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      const solstice = getSummerSolstice(i);
      years.push({
        year: i,
        solstice: solstice,
        hemisphere: 'Northern'
      });
    }
    return years;
  };

  const downloadCalendar = (date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Summer Solstice Calendar//EN
BEGIN:VEVENT
UID:summer-solstice-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Summer Solstice
DESCRIPTION:First day of summer in Northern Hemisphere. Longest day of the year.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summer-solstice-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 border border-yellow-200">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-yellow-900 mb-2">
            Summer Solstice (Northern Hemisphere)
          </h2>
          <p className="text-gray-600">
            {formatDate(nextSolstice)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-yellow-100">
            <div className="font-mono text-2xl font-bold text-yellow-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-yellow-100">
            <div className="font-mono text-2xl font-bold text-yellow-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-yellow-100">
            <div className="font-mono text-2xl font-bold text-yellow-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-yellow-100">
            <div className="font-mono text-2xl font-bold text-yellow-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* What is Summer Solstice */}
      <div className="bg-white rounded-lg border border-yellow-200 p-6">
        <h3 className="font-heading font-bold text-lg text-yellow-900 mb-3">What is the Summer Solstice?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          The summer solstice is the longest day and shortest night of the year in the Northern Hemisphere. It occurs when Earth's axial tilt is most inclined toward the Sun, maximizing daylight hours. The exact date varies between June 20 and June 22 depending on the year and time zone.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          In the Southern Hemisphere, the winter solstice occurs on the same date (their shortest day). The summer solstice marks the astronomical beginning of summer.
        </p>
        <button
          onClick={() => downloadCalendar(nextSolstice)}
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
        >
          Add to Calendar
        </button>
      </div>

      {/* Hemisphere Note */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-heading font-bold text-blue-900 mb-2">Southern Hemisphere?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          When it's summer solstice in the Northern Hemisphere (June), it's winter solstice in the Southern Hemisphere. Australia, South Africa, and parts of South America experience their shortest day on this same date. They celebrate their summer solstice around December 21.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Summer Solstice Dates (Next 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Year</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Date</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Day of Week</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-3 font-mono font-semibold text-gray-900">{row.year}</td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.solstice.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.solstice.toLocaleDateString('en-US', { weekday: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traditions */}
      <div className="bg-green-50 rounded-lg border border-green-200 p-6">
        <h3 className="font-heading font-bold text-green-900 mb-3">Solstice Traditions</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Stonehenge in England is aligned so the sunrise aligns with the stones on the summer solstice.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Midsummer festivals are celebrated throughout Scandinavia around this date.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>In the Arctic Circle, the midnight sun phenomenon begins, with 24-hour daylight.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">•</span>
            <span>Ancient cultures used the solstice to plan agricultural calendars and important ceremonies.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
