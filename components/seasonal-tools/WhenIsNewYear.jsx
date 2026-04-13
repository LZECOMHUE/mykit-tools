'use client';

import { useState, useEffect, useMemo } from 'react';

export default function WhenIsNewYear() {
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    const factTimer = setInterval(() => {
      setFactIndex(prev => prev + 1);
    }, 10000);
    return () => {
      clearInterval(timer);
      clearInterval(factTimer);
    };
  }, []);

  const newyearData = useMemo(() => {
    const currentYear = now.getFullYear();
    const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

    return {
      nextNewYear: newYear,
      year: currentYear + 1,
    };
  }, [now]);

  const diff = useMemo(() => {
    const distance = newyearData.nextNewYear - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: distance };
  }, [now, newyearData]);

  const yearProgress = useMemo(() => {
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const dec31 = new Date(now.getFullYear(), 11, 31);
    const daysInYear = Math.floor((dec31 - jan1) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - jan1) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (daysPassed / daysInYear) * 100));
  }, [now]);

  const facts = [
    'The Babylonians were the first to celebrate New Year around 4000 BC',
    'In Japan, families gather for Osechi, a special meal with symbolic foods',
    'In Spain, people eat 12 grapes at midnight, one for each month of the coming year',
    'In Scotland, Hogmanay includes torch processions and fire ceremonies',
    'In Brazil, people wear white clothes on New Year\'s Eve for peace and fresh starts',
    'In Greece, they throw pomegranates against the door for good luck and abundance',
    'In Denmark, people jump off chairs at midnight to leap into the New Year',
    'The tradition of New Year\'s resolutions dates back to the Babylonians around 4000 BC',
  ];

  const getNewYearForYear = (year) => {
    const date = new Date(year, 0, 1);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      date,
      dayName: dayNames[date.getDay()],
      display: `Jan 1, ${year} (${dayNames[date.getDay()]})`
    };
  };

  const yearTable = useMemo(() => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(getNewYearForYear(newyearData.year + i));
    }
    return years;
  }, [newyearData.year]);

  const currentFact = facts[factIndex % facts.length];
  const currentNewYear = getNewYearForYear(newyearData.year);

  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//New Year Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:New Year
X-WR-TIMEZONE:UTC
BEGIN:VEVENT
UID:newyear-${newyearData.year}@mykit.tools
DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${newyearData.year}0101T000000Z
DTEND:${newyearData.year}0102T000000Z
SUMMARY:New Year's Day
DESCRIPTION:New Year's Day celebration and fresh start
LOCATION:Worldwide
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `NewYear-${newyearData.year}.ics`;
    link.click();
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 space-y-4">
        <div className="bg-surface border border-border rounded-lg text-center">
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 space-y-4">
      {/* Main Countdown Card */}
      <div className="bg-gradient-to-br from-amber-50 to-neutral-50 border-2 border-amber-300 rounded-lg sm:p-4 text-center space-y-4">
        <div className="text-4xl sm:text-5xl">✨</div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-amber-900 mb-1">New Year {newyearData.year}</h2>
          <p className="text-text-secondary text-sm sm:text-base">{currentNewYear.dayName}, January 1</p>
        </div>

        {/* Countdown Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Days', value: diff.days },
            { label: 'Hours', value: diff.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: diff.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: diff.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-amber-600">
                {item.value}
              </p>
              <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Countdown to Midnight */}
        <div className="bg-white rounded-lg p-4 sm:p-4 border border-amber-200">
          <p className="text-text-muted text-xs sm:text-sm mb-2">Time until fresh start...</p>
          <p className="font-mono text-4xl sm:text-5xl font-bold text-amber-600">{diff.days}</p>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            {diff.days === 1 ? 'Day' : 'Days'} left in this year!
          </p>
        </div>
      </div>

      {/* Year Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Current Year Progress</h3>
          <span className="text-text-muted text-sm">{yearProgress.toFixed(1)}% complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
            style={{ width: `${yearProgress}%` }}
          />
        </div>
      </div>

      {/* Fun Fact */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500 text-sm sm:text-base">{currentFact}</p>
      </div>

      {/* Year Table */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">New Year Dates (Next 10 Years)</h3>
        <div className="space-y-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-muted font-semibold pb-2">Year</th>
                <th className="text-right text-text-muted font-semibold pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {yearTable.map((entry, idx) => (
                <tr key={idx} className="border-b border-border last:border-b-0">
                  <td className="py-3 text-text-primary font-mono">{entry.date.getFullYear()}</td>
                  <td className="py-3 text-right text-text-secondary">{entry.dayName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add to Calendar Button */}
      <button
        onClick={downloadCalendar}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
      >
        Add to Calendar
      </button>

      {/* Quick Facts */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">Quick Facts</h3>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Days left in this year', value: diff.days },
            { label: 'Hours remaining', value: (diff.days * 24 + diff.hours).toString() },
            { label: 'Minutes to go', value: Math.floor(diff.total / 60000).toString() },
            { label: 'Next year', value: newyearData.year.toString() },
          ].map((fact) => (
            <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{fact.label}</span>
              <span className="font-mono font-semibold text-text-primary">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspiration Quote */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-center">
        <p className="text-text-secondary italic text-sm sm:text-base">
          "The New Year stands before us like a chapter in a book, waiting to be written. We hold the pen."
        </p>
      </div>
    </div>
  );
}
