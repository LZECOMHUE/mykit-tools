'use client';

import { useState, useEffect } from 'react';

const SPRING_EQUINOX_DATA = {
  2026: { month: 2, day: 20 },
  2027: { month: 2, day: 20 },
  2028: { month: 2, day: 20 },
  2029: { month: 2, day: 20 },
  2030: { month: 2, day: 20 },
  2031: { month: 2, day: 20 },
  2032: { month: 2, day: 20 },
  2033: { month: 2, day: 20 },
  2034: { month: 2, day: 20 },
  2035: { month: 2, day: 20 },
  2036: { month: 2, day: 20 },
};

const FACTS = [
  'The spring equinox is also called the vernal equinox or the March equinox.',
  'Day and night are approximately equal length on the spring equinox.',
  'The spring equinox marks the astronomical beginning of spring in the Northern Hemisphere.',
  'Nowruz is the Persian New Year celebration centred on the spring equinox.',
  'Holi, the Festival of Colours, is traditionally celebrated near the spring equinox in India.',
  'The exact date varies between March 19 and March 21 depending on the year.',
  'Ancient cultures built monuments aligned with the spring equinox sunrise.',
  'The spring equinox was used by many civilisations to mark the beginning of a new year.'
];

function getSpringEquinox(year) {
  if (SPRING_EQUINOX_DATA[year]) {
    const data = SPRING_EQUINOX_DATA[year];
    return new Date(year, data.month, data.day);
  }
  return new Date(year, 2, 20); // Default to March 20
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function WhenIsSpringEquinox() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  let nextEquinox = getSpringEquinox(currentYear);
  if (nextEquinox < now) {
    nextEquinox = getSpringEquinox(currentYear + 1);
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

        const lastYear = getSpringEquinox(currentYear - 1);
        const nextYear = nextEquinox.getFullYear() === currentYear ? getSpringEquinox(currentYear) : getSpringEquinox(currentYear + 1);

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
      const equinox = getSpringEquinox(i);
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
PRODID:-//MyKit.tools//Spring Equinox Calendar//EN
BEGIN:VEVENT
UID:spring-equinox-${date.getFullYear()}@mykit.tools
DTSTAMP:${new Date().toISOString().split('T')[0].replace(/-/g, '')}T000000Z
DTSTART:${dateStr}
SUMMARY:Spring Equinox (Vernal Equinox)
DESCRIPTION:First day of spring in Northern Hemisphere. Equal day and night.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spring-equinox-${date.getFullYear()}.ics`;
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
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="text-center mb-4">
          <h2 className="font-heading text-2xl font-bold text-green-900 mb-2">
            Spring Equinox (Northern Hemisphere)
          </h2>
          <p className="text-gray-600">
            {formatDate(nextEquinox)}
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-lg p-4 text-center border border-green-100">
            <div className="font-mono text-2xl font-bold text-green-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-100">
            <div className="font-mono text-2xl font-bold text-green-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-100">
            <div className="font-mono text-2xl font-bold text-green-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-100">
            <div className="font-mono text-2xl font-bold text-green-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {Math.round(progress)}% of the way through the year
          </p>
        </div>
      </div>

      {/* What is Spring Equinox */}
      <div className="bg-white rounded-lg border border-green-200">
        <h3 className="font-heading font-bold text-lg text-green-900 mb-3">What is the Spring Equinox?</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          The spring equinox (also called the vernal equinox) is when day and night are approximately equal length in the Northern Hemisphere. It marks the astronomical beginning of spring. The exact date varies between March 19 and March 21 depending on the year and time zone.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          In the Southern Hemisphere, the autumn equinox occurs on the same date (their equal-length day). After the spring equinox, days gradually become longer until the summer solstice.
        </p>
        <button
          onClick={() => downloadCalendar(nextEquinox)}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
        >
          Add to Calendar
        </button>
      </div>

      {/* Hemisphere Note */}
      <div className="bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="font-heading font-bold text-amber-900 mb-2">Southern Hemisphere?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          When it's spring equinox in the Northern Hemisphere (March), it's autumn equinox in the Southern Hemisphere. Australia, South Africa, and parts of South America experience their autumn equinox on this same date. They celebrate their spring equinox around September 22-23.
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-heading font-bold text-purple-900 mb-2">Did You Know?</h3>
        <p className="text-sm text-gray-700">{FACTS[currentFact]}</p>
      </div>

      {/* Multi-Year Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Spring Equinox Dates (Next 10 Years)</h3>
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

      {/* Global Celebrations */}
      <div className="bg-rose-50 rounded-lg border border-rose-200">
        <h3 className="font-heading font-bold text-rose-900 mb-3">Global Spring Celebrations</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-rose-600">•</span>
            <span>Nowruz is the Persian New Year, celebrated on the spring equinox across Iran and Central Asia.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-rose-600">•</span>
            <span>Holi, the Festival of Colours, is traditionally celebrated near the spring equinox in India.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-rose-600">•</span>
            <span>Many ancient cultures used the spring equinox to mark the beginning of their new year.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-rose-600">•</span>
            <span>Easter in Christian traditions is calculated based on the spring equinox.</span>
          </li>
        </ul>
      </div>

      {/* Renewal and Rebirth */}
      <div className="bg-teal-50 rounded-lg border border-teal-200">
        <h3 className="font-heading font-bold text-teal-900 mb-2">Renewal and Rebirth</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          The spring equinox has long been a symbol of renewal, rebirth, and hope. As nature awakens from winter's slumber and daylight increases, it marks a powerful turning point. Many cultures and religions have centred their most important festivals and celebrations around this astronomical event.
        </p>
      </div>
    </div>
  );
}
