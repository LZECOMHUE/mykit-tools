'use client';

import { useState, useEffect } from 'react';

const WINTER_SOLSTICE_DATA = {
  2026: { month: 11, day: 21 },
  2027: { month: 11, day: 21 },
  2028: { month: 11, day: 20 },
  2029: { month: 11, day: 21 },
  2030: { month: 11, day: 21 },
  2031: { month: 11, day: 21 },
  2032: { month: 11, day: 20 },
  2033: { month: 11, day: 21 },
  2034: { month: 11, day: 21 },
  2035: { month: 11, day: 21 },
  2036: { month: 11, day: 20 },
};

const FACTS = [
  'The winter solstice is the shortest day and longest night of the year in the Northern Hemisphere.',
  'Yule is a pagan festival celebrating the winter solstice and the return of the sun.',
  'The winter solstice marks the astronomical beginning of winter.',
  'Ancient Romans celebrated Saturnalia around the winter solstice.',
  'After the winter solstice, daylight hours gradually increase until summer solstice.',
  'The Newgrange monument in Ireland is aligned with the sunrise on the winter solstice.',
  'In the Arctic Circle, the winter solstice marks the beginning of polar night.',
  'The exact date of winter solstice varies between December 21 and December 22.'
];

function getWinterSolstice(year) {
  if (WINTER_SOLSTICE_DATA[year]) {
    const data = WINTER_SOLSTICE_DATA[year];
    return new Date(year, data.month, data.day);
  }
  return new Date(year, 11, 21); // Default to December 21
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsWinterSolstice() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  let nextSolstice = getWinterSolstice(currentYear);
  if (nextSolstice < now) {
    nextSolstice = getWinterSolstice(currentYear + 1);
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

        const lastYear = getWinterSolstice(currentYear - 1);
        const nextYear = nextSolstice.getFullYear() === currentYear ? getWinterSolstice(currentYear) : getWinterSolstice(currentYear + 1);

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
      const solstice = getWinterSolstice(i);
      years.push({
        year: i,
        solstice: solstice
      });
    }
    return years;
  };

  const downloadCalendar = (date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Winter Solstice Calendar//EN
BEGIN:VEVENT
UID:winter-solstice-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Winter Solstice
DESCRIPTION:First day of winter in Northern Hemisphere. Shortest day of the year.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `winter-solstice-${date.getFullYear()}.ics`;
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
    <div className="space-y-4">
      {/* Hero Countdown Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
        <div className="text-center mb-4">
          <h2 className="font-heading text-2xl font-bold text-blue-900 mb-2">
            Winter Solstice (Northern Hemisphere)
          </h2>
          <p className="text-gray-600">
            {formatDate(nextSolstice)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-4">
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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* What is Winter Solstice */}
      <div className="bg-white rounded-lg border border-blue-200">
        <h3 className="font-heading font-bold text-lg text-blue-900 mb-3">What is the Winter Solstice?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          The winter solstice is the shortest day and longest night of the year in the Northern Hemisphere. It occurs when Earth's axial tilt is most inclined away from the Sun, minimizing daylight hours. The exact date varies between December 21 and December 22 depending on the year and time zone.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          In the Southern Hemisphere, the summer solstice occurs on the same date (their longest day). The winter solstice marks the astronomical beginning of winter and the turning point after which days gradually become longer.
        </p>
        <button
          onClick={() => downloadCalendar(nextSolstice)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
        >
          Add to Calendar
        </button>
      </div>

      {/* Hemisphere Note */}
      <div className="bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Southern Hemisphere?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          When it's winter solstice in the Northern Hemisphere (December), it's summer solstice in the Southern Hemisphere. Australia, South Africa, and parts of South America experience their longest day on this same date. They celebrate their winter solstice around June 20-21.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Winter Solstice Dates (Next 10 Years)</h3>
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
      <div className="bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="font-heading font-bold text-indigo-900 mb-3">Solstice Traditions</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-indigo-600">•</span>
            <span>Yule is a pagan festival celebrating the return of the sun after the longest night.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600">•</span>
            <span>Ancient Romans celebrated Saturnalia around the winter solstice, honouring the god Saturn.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600">•</span>
            <span>The Newgrange monument in Ireland is precisely aligned with the winter solstice sunrise.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600">•</span>
            <span>In the Arctic, polar night begins, with continuous darkness lasting until spring.</span>
          </li>
        </ul>
      </div>

      {/* Hope and Renewal */}
      <div className="bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="font-heading font-bold text-amber-900 mb-2">The Return of the Sun</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          The winter solstice has been celebrated for thousands of years as a turning point. After the shortest day, daylight gradually increases, making it a symbol of hope, renewal, and the return of warmth. Many winter holidays and festivals are centred around this astronomical event.
        </p>
      </div>
    </div>
  );
}
