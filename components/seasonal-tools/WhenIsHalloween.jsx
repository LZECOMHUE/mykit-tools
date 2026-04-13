'use client';

import { useState, useEffect, useMemo } from 'react';

export default function WhenIsHalloween() {
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

  const halloweenData = useMemo(() => {
    const currentYear = now.getFullYear();
    const halloween = new Date(currentYear, 9, 31, 0, 0, 0);

    if (now > halloween) {
      return {
        nextHalloween: new Date(currentYear + 1, 9, 31),
        year: currentYear + 1,
      };
    }

    return { nextHalloween: halloween, year: currentYear };
  }, [now]);

  const diff = useMemo(() => {
    const distance = halloweenData.nextHalloween - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: distance };
  }, [now, halloweenData]);

  const progressPercent = useMemo(() => {
    const jan1 = new Date(halloweenData.year, 0, 1);
    const oct31 = new Date(halloweenData.year, 9, 31);
    const daysInYear = Math.floor((oct31 - jan1) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - jan1) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (daysPassed / daysInYear) * 100));
  }, [now, halloweenData.year]);

  const facts = [
    'Halloween has Celtic roots dating back 2,000 years to Samhain, a Celtic festival',
    'Jack-o-lanterns originally used turnips instead of pumpkins in Ireland',
    'Over 600 million pounds of candy corn are produced for Halloween each year',
    'The word "witch" comes from the Old English word "wicce" meaning "wise woman"',
    'Ireland is credited with starting the Halloween tradition of carving jack-o-lanterns',
    'Black cats are associated with Halloween due to ancient superstitions',
    'The color orange for Halloween represents pumpkins, while black represents death and darkness',
    'It is believed that wearing costumes on Halloween protects you from evil spirits',
  ];

  const getHalloweenDateForYear = (year) => {
    const date = new Date(year, 9, 31);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      date,
      dayName: dayNames[date.getDay()],
      display: `Oct 31, ${year} (${dayNames[date.getDay()]})`
    };
  };

  const yearTable = useMemo(() => {
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(getHalloweenDateForYear(halloweenData.year + i));
    }
    return years;
  }, [halloweenData.year]);

  const currentFact = facts[factIndex % facts.length];
  const currentHalloween = getHalloweenDateForYear(halloweenData.year);

  const downloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Halloween Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Halloween
X-WR-TIMEZONE:UTC
BEGIN:VEVENT
UID:halloween-${halloweenData.year}@mykit.tools
DTSTAMP:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${halloweenData.year}1031T000000Z
DTEND:${halloweenData.year}1101T000000Z
SUMMARY:Halloween
DESCRIPTION:Halloween celebration and trick-or-treating
LOCATION:Worldwide
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Halloween-${halloweenData.year}.ics`;
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
      <div className="bg-gradient-to-br from-orange-50 to-purple-50 border-2 border-orange-300 rounded-lg sm:p-4 text-center space-y-4">
        <div className="text-4xl sm:text-5xl">🎃</div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-orange-600 mb-1">Halloween {halloweenData.year}</h2>
          <p className="text-text-secondary text-sm sm:text-base">{currentHalloween.dayName}, October 31</p>
        </div>

        {/* Countdown Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Days', value: diff.days },
            { label: 'Hours', value: diff.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: diff.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: diff.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-orange-200">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-orange-600">
                {item.value}
              </p>
              <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Days Until */}
        <div className="bg-white rounded-lg p-4 sm:p-4 border border-orange-200">
          <p className="text-text-muted text-xs sm:text-sm mb-2">Get ready to spook...</p>
          <p className="font-mono text-4xl sm:text-5xl font-bold text-purple-600">{diff.days}</p>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            {diff.days === 1 ? 'Day' : 'Days'} until Halloween!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Year Progress to Halloween</h3>
          <span className="text-text-muted text-sm">{progressPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Fun Fact */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500 text-sm sm:text-base">{currentFact}</p>
      </div>

      {/* Year Table */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">Halloween Dates (Next 10 Years)</h3>
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
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base"
      >
        Add to Calendar
      </button>

      {/* Quick Facts */}
      <div className="bg-surface border border-border rounded-lg">
        <h3 className="text-text-primary font-semibold mb-4">Quick Facts</h3>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Days until Halloween', value: diff.days },
            { label: 'Hours remaining', value: (diff.days * 24 + diff.hours).toString() },
            { label: 'Minutes to go', value: Math.floor(diff.total / 60000).toString() },
            { label: 'Year', value: halloweenData.year.toString() },
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
