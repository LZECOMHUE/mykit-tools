'use client';

import { useState, useEffect, useMemo } from 'react';

export default function WhenIsChristmas() {
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

  const christmasData = useMemo(() => {
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25, 0, 0, 0);

    if (now > christmas) {
      return {
        nextChristmas: new Date(currentYear + 1, 11, 25),
        year: currentYear + 1,
      };
    }

    return { nextChristmas: christmas, year: currentYear };
  }, [now]);

  const diff = useMemo(() => {
    const distance = christmasData.nextChristmas - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: distance };
  }, [now, christmasData]);

  const progressPercent = useMemo(() => {
    const jan1 = new Date(christmasData.year, 0, 1);
    const dec25 = new Date(christmasData.year, 11, 25);
    const daysInYear = Math.floor((dec25 - jan1) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - jan1) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (daysPassed / daysInYear) * 100));
  }, [now, christmasData.year]);

  const facts = [
    'Christmas is celebrated by over 2 billion people worldwide',
    'The first artificial Christmas tree was made of goose feathers in 16th century Germany',
    'Christmas trees can live for up to 40 years in nature',
    'Most mistletoe is harvested in the week before Christmas for decorations',
    'The song "Jingle Bells" was originally written for Thanksgiving, not Christmas',
    'A typical Christmas turkey can weigh up to 30 pounds',
    'In Finland, Christmas Eve is an official public holiday',
    'The tradition of Christmas stockings comes from Saint Nicholas filling stockings with gold coins',
  ];

  const getChristmasDateForYear = (year) => {
    const date = new Date(year, 11, 25);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      date,
      dayName: dayNames[date.getDay()],
      display: `Dec 25, ${year} (${dayNames[date.getDay()]})`
    };
  };

  const yearTable = useMemo(() => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(getChristmasDateForYear(christmasData.year + i));
    }
    return years;
  }, [christmasData.year]);

  const currentFact = facts[factIndex % facts.length];
  const currentChristmas = getChristmasDateForYear(christmasData.year);
  const sleeps = diff.days;

  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Christmas Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Christmas
X-WR-TIMEZONE:UTC
BEGIN:VEVENT
UID:christmas-${christmasData.year}@mykit.tools
DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${christmasData.year}1225T000000Z
DTEND:${christmasData.year}1226T000000Z
SUMMARY:Christmas Day
DESCRIPTION:Christmas celebration
LOCATION:Worldwide
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Christmas-${christmasData.year}.ics`;
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
      <div className="bg-gradient-to-br from-red-50 to-green-50 border-2 border-red-200 rounded-lg sm:p-4 text-center space-y-4">
        <div className="text-4xl sm:text-5xl">🎄</div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-red-600 mb-1">Christmas {christmasData.year}</h2>
          <p className="text-text-secondary text-sm sm:text-base">{currentChristmas.dayName}, December 25</p>
        </div>

        {/* Countdown Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Days', value: diff.days },
            { label: 'Hours', value: diff.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: diff.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: diff.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-red-100">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-red-600">
                {item.value}
              </p>
              <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Sleeps Display */}
        <div className="bg-white rounded-lg p-4 sm:p-4 border border-red-200">
          <p className="text-text-muted text-xs sm:text-sm mb-2">Only...</p>
          <p className="font-mono text-4xl sm:text-5xl font-bold text-green-600">{sleeps}</p>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            {sleeps === 1 ? 'Sleep' : 'Sleeps'} until Christmas!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Year Progress to Christmas</h3>
          <span className="text-text-muted text-sm">{progressPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Fun Fact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500 text-sm sm:text-base">{currentFact}</p>
      </div>

      {/* Year Table */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">Christmas Dates (Next 10 Years)</h3>
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
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
      >
        Add to Calendar
      </button>

      {/* Quick Facts */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">Quick Facts</h3>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Days until Christmas', value: diff.days },
            { label: 'Hours remaining', value: (diff.days * 24 + diff.hours).toString() },
            { label: 'Minutes to go', value: Math.floor(diff.total / 60000).toString() },
            { label: 'Year', value: christmasData.year.toString() },
          ].map((fact) => (
            <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{fact.label}</span>
              <span className="font-mono font-semibold text-text-primary">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
