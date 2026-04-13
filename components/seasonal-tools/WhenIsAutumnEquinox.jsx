'use client';

import { useState, useEffect } from 'react';

const AUTUMN_EQUINOX_DATA = {
  2026: { month: 8, day: 22 },
  2027: { month: 8, day: 23 },
  2028: { month: 8, day: 22 },
  2029: { month: 8, day: 22 },
  2030: { month: 8, day: 23 },
  2031: { month: 8, day: 23 },
  2032: { month: 8, day: 22 },
  2033: { month: 8, day: 22 },
  2034: { month: 8, day: 23 },
  2035: { month: 8, day: 23 },
  2036: { month: 8, day: 22 },
};

const FACTS = [
  'The autumn equinox is also called the autumnal equinox or the September equinox.',
  'Day and night are approximately equal length on the autumn equinox.',
  'The autumn equinox marks the astronomical beginning of autumn in the Northern Hemisphere.',
  'Mabon is a pagan celebration of the autumn equinox and the autumn harvest.',
  'The exact date varies between September 22 and September 23 depending on the year.',
  'Harvest festivals around the world are celebrated near the autumn equinox.',
  'The autumn equinox was traditionally the time for storing food before winter.',
  'In many ancient cultures, the autumn equinox marked the beginning of a new astrological year.'
];

function getAutumnEquinox(year) {
  if (AUTUMN_EQUINOX_DATA[year]) {
    const data = AUTUMN_EQUINOX_DATA[year];
    return new Date(year, data.month, data.day);
  }
  return new Date(year, 8, 22); // Default to September 22
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsAutumnEquinox() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  let nextEquinox = getAutumnEquinox(currentYear);
  if (nextEquinox < now) {
    nextEquinox = getAutumnEquinox(currentYear + 1);
  }

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextEquinox - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });

        const lastYear = getAutumnEquinox(currentYear - 1);
        const nextYear = nextEquinox.getFullYear() === currentYear ? getAutumnEquinox(currentYear) : getAutumnEquinox(currentYear + 1);

        const totalDuration = nextYear - lastYear;
        const elapsed = now - lastYear;
        const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(currentProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEquinox, currentYear]);

  useEffect(() => {
    setCurrentFact(Math.floor(Math.random() * FACTS.length));
  }, []);

  const generateYearTable = () => {
    const years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      const equinox = getAutumnEquinox(i);
      years.push({
        year: i,
        equinox: equinox
      });
    }
    return years;
  };

  const downloadCalendar = (date) => {
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Autumn Equinox Calendar//EN
BEGIN:VEVENT
UID:autumn-equinox-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Autumn Equinox (Autumnal Equinox)
DESCRIPTION:First day of autumn in Northern Hemisphere. Equal day and night.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autumn-equinox-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="text-center mb-4">
          <h2 className="font-heading text-2xl font-bold text-amber-900 mb-2">
            Autumn Equinox (Northern Hemisphere)
          </h2>
          <p className="text-gray-600">
            {formatDate(nextEquinox)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-amber-100">
            <div className="font-mono text-2xl font-bold text-amber-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* What is Autumn Equinox */}
      <div className="bg-white rounded-lg border border-amber-200">
        <h3 className="font-heading font-bold text-lg text-amber-900 mb-3">What is the Autumn Equinox?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          The autumn equinox (also called the autumnal equinox) is when day and night are approximately equal length in the Northern Hemisphere. It marks the astronomical beginning of autumn. The exact date varies between September 22 and September 23 depending on the year and time zone.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          In the Southern Hemisphere, the spring equinox occurs on the same date (their equal-length day). After the autumn equinox, nights gradually become longer until the winter solstice.
        </p>
        <button
          onClick={() => downloadCalendar(nextEquinox)}
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
        >
          Add to Calendar
        </button>
      </div>

      {/* Hemisphere Note */}
      <div className="bg-teal-50 rounded-lg border border-teal-200">
        <h3 className="font-heading font-bold text-teal-900 mb-2">Southern Hemisphere?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          When it's autumn equinox in the Northern Hemisphere (September), it's spring equinox in the Southern Hemisphere. Australia, South Africa, and parts of South America experience their spring equinox on this same date. They celebrate their autumn equinox around March 20-21.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Autumn Equinox Dates (Next 10 Years)</h3>
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
                    {row.equinox.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-gray-700">
                    {row.equinox.toLocaleDateString('en-US', { weekday: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Harvest Traditions */}
      <div className="bg-orange-50 rounded-lg border border-orange-200">
        <h3 className="font-heading font-bold text-orange-900 mb-3">Harvest and Thanksgiving</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-orange-600">•</span>
            <span>Mabon is a pagan festival celebrating the autumn equinox and the second harvest.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-600">•</span>
            <span>Thanksgiving in Canada (October 2nd Monday) follows traditions rooted in autumn harvests.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-600">•</span>
            <span>Many cultures celebrate harvest festivals around the autumn equinox.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-orange-600">•</span>
            <span>Historically, the autumn equinox marked the time to store food before winter.</span>
          </li>
        </ul>
      </div>

      {/* Transition and Reflection */}
      <div className="bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="font-heading font-bold text-indigo-900 mb-2">A Time of Transition</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          The autumn equinox is a powerful moment of balance between light and darkness. It marks the transition from the abundant growth of summer to the dormancy of winter. Many cultures view this time as one of reflection, gratitude for the harvest, and preparation for the darker months ahead.
        </p>
      </div>
    </div>
  );
}
