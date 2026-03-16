'use client';

import { useState, useEffect, useMemo } from 'react';

export default function WhenIsValentinesDay() {
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

  const valentinesData = useMemo(() => {
    const currentYear = now.getFullYear();
    const valentines = new Date(currentYear, 1, 14, 0, 0, 0);

    if (now > valentines) {
      return {
        nextValentines: new Date(currentYear + 1, 1, 14),
        year: currentYear + 1,
      };
    }

    return { nextValentines: valentines, year: currentYear };
  }, [now]);

  const diff = useMemo(() => {
    const distance = valentinesData.nextValentines - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: distance };
  }, [now, valentinesData]);

  const progressPercent = useMemo(() => {
    const jan1 = new Date(valentinesData.year, 0, 1);
    const feb14 = new Date(valentinesData.year, 1, 14);
    const daysInYear = Math.floor((feb14 - jan1) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - jan1) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (daysPassed / daysInYear) * 100));
  }, [now, valentinesData.year]);

  const facts = [
    'Valentine\'s Day is named after Saint Valentine, an early Christian martyr',
    'Over 145 million Valentine\'s Day cards are sent each year worldwide',
    'The tradition of giving roses on Valentine\'s Day comes from Victorian times',
    'Cupid is the Roman god of love and is often depicted with a bow and arrow',
    'The red rose symbolizes deep love and respect in the Victorian language of flowers',
    'In the Middle Ages, people believed that birds chose their mates on February 14th',
    'Teacher is the most popular profession to receive Valentine\'s Day cards',
    'Over 58 million pounds of chocolate are purchased for Valentine\'s Day annually',
  ];

  const getValentinesDayForYear = (year) => {
    const date = new Date(year, 1, 14);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      date,
      dayName: dayNames[date.getDay()],
      display: `Feb 14, ${year} (${dayNames[date.getDay()]})`
    };
  };

  const yearTable = useMemo(() => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(getValentinesDayForYear(valentinesData.year + i));
    }
    return years;
  }, [valentinesData.year]);

  const currentFact = facts[factIndex % facts.length];
  const currentValentines = getValentinesDayForYear(valentinesData.year);

  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Valentine's Day Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Valentine's Day
X-WR-TIMEZONE:UTC
BEGIN:VEVENT
UID:valentines-${valentinesData.year}@mykit.tools
DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${valentinesData.year}0214T000000Z
DTEND:${valentinesData.year}0215T000000Z
SUMMARY:Valentine's Day
DESCRIPTION:Valentine's Day celebration of love and friendship
LOCATION:Worldwide
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ValentinesDay-${valentinesData.year}.ics`;
    link.click();
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Main Countdown Card */}
      <div className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-300 rounded-lg p-6 sm:p-8 text-center space-y-6">
        <div className="text-4xl sm:text-5xl">💘</div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-pink-600 mb-1">Valentine's Day {valentinesData.year}</h2>
          <p className="text-text-secondary text-sm sm:text-base">{currentValentines.dayName}, February 14</p>
        </div>

        {/* Countdown Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Days', value: diff.days },
            { label: 'Hours', value: diff.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: diff.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: diff.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-pink-200">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-pink-600">
                {item.value}
              </p>
              <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Days Until */}
        <div className="bg-white rounded-lg p-4 sm:p-6 border border-pink-200">
          <p className="text-text-muted text-xs sm:text-sm mb-2">Spread the love in...</p>
          <p className="font-mono text-4xl sm:text-5xl font-bold text-red-600">{diff.days}</p>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            {diff.days === 1 ? 'Day' : 'Days'} until Valentine's Day!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Year Progress to Valentine's Day</h3>
          <span className="text-text-muted text-sm">{progressPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-red-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Fun Fact */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500 text-sm sm:text-base">{currentFact}</p>
      </div>

      {/* Year Table */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Valentine's Day Dates (Next 10 Years)</h3>
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
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
      >
        Add to Calendar
      </button>

      {/* Quick Facts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Quick Facts</h3>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Days until Valentine\'s Day', value: diff.days },
            { label: 'Hours remaining', value: (diff.days * 24 + diff.hours).toString() },
            { label: 'Minutes to go', value: Math.floor(diff.total / 60000).toString() },
            { label: 'Year', value: valentinesData.year.toString() },
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
