'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const HANUKKAH_DATES = {
  2024: { start: { month: 11, day: 25 }, end: { month: 0, day: 2 } },
  2025: { start: { month: 11, day: 14 }, end: { month: 11, day: 22 } },
  2026: { start: { month: 11, day: 4 }, end: { month: 11, day: 12 } },
  2027: { start: { month: 11, day: 24 }, end: { month: 0, day: 1 } },
  2028: { start: { month: 11, day: 12 }, end: { month: 11, day: 20 } },
  2029: { start: { month: 11, day: 1 }, end: { month: 11, day: 9 } },
  2030: { start: { month: 11, day: 20 }, end: { month: 11, day: 28 } },
  2031: { start: { month: 11, day: 9 }, end: { month: 11, day: 17 } },
  2032: { start: { month: 10, day: 28 }, end: { month: 11, day: 6 } },
  2033: { start: { month: 11, day: 16 }, end: { month: 11, day: 24 } },
  2034: { start: { month: 11, day: 6 }, end: { month: 11, day: 14 } },
  2035: { start: { month: 11, day: 24 }, end: { month: 0, day: 1 } },
};

function getHanukkahDates(year) {
  const data = HANUKKAH_DATES[year];
  if (!data) return null;

  const startDate = new Date(year, data.start.month, data.start.day);
  const endDate = new Date(year, data.end.month, data.end.day);

  return { startDate, endDate };
}

function getNextHanukkah() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const hanukkah = getHanukkahDates(currentYear);

  if (hanukkah && now <= hanukkah.endDate) {
    return hanukkah;
  }

  const nextHanukkah = getHanukkahDates(currentYear + 1);
  return nextHanukkah || getHanukkahDates(currentYear + 2);
}

function getHanukkahProgress() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const hanukkah = getHanukkahDates(currentYear);

  if (!hanukkah || now < hanukkah.startDate) return null;
  if (now > hanukkah.endDate) return null;

  const totalDuration = hanukkah.endDate - hanukkah.startDate;
  const elapsed = now - hanukkah.startDate;
  const percentComplete = (elapsed / totalDuration) * 100;
  const nightNumber = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;

  return { percentComplete, nightNumber };
}

function generateICS(startDate, endDate) {
  const dtstart = startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endDateFinal = new Date(endDate);
  endDateFinal.setDate(endDateFinal.getDate() + 1);
  const dtend = endDateFinal.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Hanukkah Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:Hanukkah - Festival of Lights
DESCRIPTION:Hanukkah - Festival of Lights. Eight nights of celebration and remembrance.
UID:hanukkah-${startDate.getFullYear()}@mykit.tools
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hanukkah-${startDate.getFullYear()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const HANUKKAH_FACTS = [
  'Hanukkah, also known as the Festival of Lights, is an eight-night Jewish celebration commemorating the rededication of the Second Temple in Jerusalem.',
  'The holiday begins on 25 Kislev in the Hebrew calendar, which typically falls in late November or December on the Gregorian calendar.',
  'The menorah (candelabrum) is the central symbol of Hanukkah. One candle is lit each night, plus a helper candle (the shamash), for a total of eight nights.',
  'Hanukkah celebrates the victory of a small group of Jewish fighters (the Maccabees) against a much larger invading force.',
  'The holiday is also known for the "Miracle of the Oil" - a one-day supply of oil supposedly lasted eight days in the rededicated temple.',
  'Latkes (fried potato pancakes) and sufganiyot (fried jelly doughnuts) are traditional foods eaten during Hanukkah, symbolizing remembrance of the oil.',
  'Dreidel (a spinning top) is a popular children\'s game played during Hanukkah. Each side of the dreidel has a Hebrew letter representing "A great miracle happened there."',
  'Gelt (chocolate coins) are given as gifts during Hanukkah, especially to children, and are also used in dreidel games.',
];

export default function WhenIsHanukkah() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [hanukkah, setHanukkah] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const next = getNextHanukkah();
    setHanukkah(next);

    const prog = getHanukkahProgress();
    if (prog) {
      setIsActive(true);
      setProgress(prog);
    }
  }, []);

  useEffect(() => {
    if (!hanukkah) return;

    const updateCountdown = () => {
      const now = new Date();

      if (isActive) {
        const distance = hanukkah.endDate - now;

        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60),
          });
        }
      } else {
        const distance = hanukkah.startDate - now;

        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60),
          });
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [hanukkah, isActive]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % HANUKKAH_FACTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !hanukkah) return null;

  const hanukkahYear = hanukkah.startDate.getFullYear();
  const progressPercent = isActive && progress ? progress.percentComplete : 100 - (countdown.days / 365) * 100;

  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = hanukkahYear + i;
    const dates = getHanukkahDates(year);
    if (dates) {
      years.push({ year, startDate: dates.startDate, endDate: dates.endDate });
    }
  }

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      {isActive && progress && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center space-y-2">
            <p className="text-sm text-secondary mb-1">We are currently celebrating</p>
            <h2 className="font-heading text-3xl font-bold text-primary">Hanukkah {hanukkahYear}</h2>
            <p className="text-accent font-600 mt-2">Night {progress.nightNumber} of 8</p>
          </div>
        </Card>
      )}

      {/* Countdown Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">
              {isActive ? 'End of Hanukkah' : 'Next Hanukkah'}
            </h2>
            {hanukkah && (
              <p className="text-secondary">
                {(isActive ? hanukkah.endDate : hanukkah.startDate).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-4 text-center border border-blue-100">
                <div className="font-mono text-3xl font-bold text-accent">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-secondary mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Hanukkah Dates */}
      <Card className="border-amber-200 bg-amber-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Hanukkah {hanukkahYear}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-sm text-secondary mb-2">First Night (25 Kislev)</div>
              <div className="font-mono font-bold text-primary">
                {hanukkah.startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-sm text-secondary mb-2">Last Night (2 Tevet)</div>
              <div className="font-mono font-bold text-primary">
                {hanukkah.endDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Progress */}
      {isActive && progress && (
        <Card className="border-accent border-2">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">Progress Through Hanukkah</h3>
            <div className="w-full bg-surface rounded-full h-4 overflow-hidden border border-accent">
              <div
                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-full transition-all duration-1000"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </div>
            <p className="text-sm text-secondary">
              {Math.round(progress.percentComplete)}% complete (Night {progress.nightNumber} of 8)
            </p>
          </div>
        </Card>
      )}

      {/* Fun Fact */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Did You Know?</h3>
          <p className="text-secondary leading-relaxed">{HANUKKAH_FACTS[currentFact]}</p>
          <div className="flex gap-2 justify-center">
            {HANUKKAH_FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentFact(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentFact ? 'bg-accent w-6' : 'bg-border w-2 hover:bg-border-hover'
                }`}
                aria-label={`Fact ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* How the Date is Determined */}
      <Card className="bg-green-50 border-green-200">
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-primary">How the Date is Calculated</h3>
          <p className="text-secondary leading-relaxed">
            Hanukkah begins on 25 Kislev in the Hebrew calendar and lasts for eight nights. The Hebrew calendar is a lunar calendar, so Hanukkah dates shift on the Gregorian calendar each year, typically occurring between late November and December.
          </p>
          <p className="text-sm text-muted italic">
            Each night of Hanukkah, one additional candle is lit on the menorah, starting with the shamash (helper candle) and one other candle on the first night, increasing by one candle each subsequent night.
          </p>
        </div>
      </Card>

      {/* Multi-Year Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Hanukkah Dates: Next 10 Years</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-600 text-secondary">Year</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">First Night</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Last Night</th>
                </tr>
              </thead>
              <tbody>
                {years.map(({ year, startDate, endDate }) => (
                  <tr key={year} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary">{year}</td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {endDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add to Calendar */}
      <Button
        onClick={() => hanukkah && generateICS(hanukkah.startDate, hanukkah.endDate)}
        className="w-full"
      >
        Add Hanukkah to Calendar (ICS Download)
      </Button>
    </div>
  );
}
