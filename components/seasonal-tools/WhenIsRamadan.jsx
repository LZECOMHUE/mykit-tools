'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const RAMADAN_DATES = {
  2024: { start: { month: 2, day: 11 }, end: { month: 3, day: 9 } },
  2025: { start: { month: 2, day: 1 }, end: { month: 2, day: 30 } },
  2026: { start: { month: 1, day: 18 }, end: { month: 2, day: 19 } },
  2027: { start: { month: 1, day: 8 }, end: { month: 2, day: 8 } },
  2028: { start: { month: 0, day: 28 }, end: { month: 1, day: 26 } },
  2029: { start: { month: 0, day: 16 }, end: { month: 1, day: 14 } },
  2030: { start: { month: 0, day: 6 }, end: { month: 1, day: 4 } },
  2031: { start: { month: 11, day: 26 }, end: { month: 0, day: 24 } },
  2032: { start: { month: 11, day: 15 }, end: { month: 0, day: 13 } },
  2033: { start: { month: 11, day: 4 }, end: { month: 0, day: 2 } },
  2034: { start: { month: 10, day: 23 }, end: { month: 11, day: 22 } },
  2035: { start: { month: 10, day: 12 }, end: { month: 11, day: 11 } },
};

function getRamadanDates(year) {
  const data = RAMADAN_DATES[year];
  if (!data) return null;

  const startDate = new Date(year, data.start.month, data.start.day);
  const endDate = new Date(year, data.end.month, data.end.day);

  return { startDate, endDate };
}

function getEidAlFitrDate(year) {
  const ramadan = getRamadanDates(year);
  if (!ramadan) return null;

  const eidDate = new Date(ramadan.endDate);
  eidDate.setDate(eidDate.getDate() + 1);
  return eidDate;
}

function getNextRamadan() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const ramadan = getRamadanDates(currentYear);

  if (ramadan && now <= ramadan.endDate) {
    return ramadan;
  }

  const nextRamadan = getRamadanDates(currentYear + 1);
  return nextRamadan || getRamadanDates(currentYear + 2);
}

function getRamadanProgress() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const ramadan = getRamadanDates(currentYear);

  if (!ramadan || now < ramadan.startDate) return null;
  if (now > ramadan.endDate) return null;

  const totalDuration = ramadan.endDate - ramadan.startDate;
  const elapsed = now - ramadan.startDate;
  const percentComplete = (elapsed / totalDuration) * 100;
  const daysComplete = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;

  return { percentComplete, daysComplete };
}

function generateICS(startDate, endDate, title) {
  const dtstart = startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endDateFinal = new Date(endDate);
  endDateFinal.setDate(endDateFinal.getDate() + 1);
  const dtend = endDateFinal.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Ramadan Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${title}
DESCRIPTION:${title} - The holy month of the Islamic calendar
UID:ramadan-${startDate.getFullYear()}@mykit.tools
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ramadan-${startDate.getFullYear()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const RAMADAN_FACTS = [
  'Ramadan is the ninth month of the Islamic calendar and is considered the holiest month in Islam.',
  'Muslims fast from dawn (Fajr) to sunset (Maghrib) during the entire month, abstaining from food, drink, and other physical needs.',
  'Fasting during Ramadan is one of the Five Pillars of Islam, the core tenets of Islamic faith.',
  'The Quran was first revealed to the Prophet Muhammad during Ramadan, specifically on the Night of Power (Laylat al-Qadr).',
  'Breaking the fast each evening is called Iftar, often done with family and friends. It traditionally begins with dates.',
  'During Ramadan, Muslims increase their focus on prayer, with special evening prayers called Taraweeh held in mosques.',
  'Eid al-Fitr is celebrated on the day after Ramadan ends, marked by prayers, feasting, and spending time with family.',
  'The Islamic calendar is based on lunar months, so Ramadan shifts approximately 11 days earlier each year on the Gregorian calendar.',
];

export default function WhenIsRamadan() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [ramadan, setRamadan] = useState(null);
  const [eidDate, setEidDate] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const next = getNextRamadan();
    setRamadan(next);

    if (next) {
      const eid = getEidAlFitrDate(next.startDate.getFullYear());
      setEidDate(eid);
    }

    const prog = getRamadanProgress();
    if (prog) {
      setIsActive(true);
      setProgress(prog);
    }
  }, []);

  useEffect(() => {
    if (!ramadan) return;

    const updateCountdown = () => {
      const now = new Date();

      if (isActive && ramadan.endDate) {
        const distance = ramadan.endDate - now;

        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60),
          });
        }
      } else {
        const distance = ramadan.startDate - now;

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
  }, [ramadan, isActive]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % RAMADAN_FACTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !ramadan) return null;

  const ramadanYear = ramadan.startDate.getFullYear();

  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = ramadanYear + i;
    const dates = getRamadanDates(year);
    const eid = getEidAlFitrDate(year);
    if (dates && eid) {
      years.push({ year, startDate: dates.startDate, endDate: dates.endDate, eid });
    }
  }

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      {isActive && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="text-center">
            <p className="text-sm text-secondary mb-1">We are currently in</p>
            <h2 className="font-heading text-3xl font-bold text-primary">Ramadan 1445 AH</h2>
            {progress && <p className="text-accent font-600 mt-2">Day {progress.daysComplete} of 29-30 days</p>}
          </div>
        </Card>
      )}

      {/* Countdown Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">
              {isActive ? 'End of Ramadan' : 'Next Ramadan'}
            </h2>
            {ramadan && (
              <p className="text-secondary">
                {(isActive ? ramadan.endDate : ramadan.startDate).toLocaleDateString('en-GB', {
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
              <div key={item.label} className="bg-white rounded-lg p-4 text-center border border-green-100">
                <div className="font-mono text-3xl font-bold text-accent">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-secondary mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Ramadan Dates */}
      <Card className="border-amber-200 bg-amber-50">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Ramadan {ramadanYear}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-sm text-secondary mb-2">Start Date</div>
              <div className="font-mono font-bold text-primary">
                {ramadan.startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-sm text-secondary mb-2">End Date</div>
              <div className="font-mono font-bold text-primary">
                {ramadan.endDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-sm text-secondary mb-2">Eid al-Fitr</div>
              {eidDate && <div className="font-mono font-bold text-primary">{eidDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</div>}
            </div>
          </div>
        </div>
      </Card>

      {/* Active Progress */}
      {isActive && progress && (
        <Card className="border-accent border-2">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">Progress Through Ramadan</h3>
            <div className="w-full bg-surface rounded-full h-4 overflow-hidden border border-accent">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-1000"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </div>
            <p className="text-sm text-secondary">{Math.round(progress.percentComplete)}% complete</p>
          </div>
        </Card>
      )}

      {/* Fun Fact */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Did You Know?</h3>
          <p className="text-secondary leading-relaxed">{RAMADAN_FACTS[currentFact]}</p>
          <div className="flex gap-2 justify-center">
            {RAMADAN_FACTS.map((_, i) => (
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
            Ramadan falls on the ninth month of the Islamic lunar calendar. The Islamic calendar is based on the moon's phases, with each month beginning when the new moon is sighted. This means Ramadan shifts approximately 11 days earlier each year on the Gregorian calendar.
          </p>
          <p className="text-sm text-muted italic">
            Important: The exact start and end dates of Ramadan may vary by 1-2 days depending on official moon sighting in different countries and regions. The dates shown here are estimates based on astronomical calculations.
          </p>
        </div>
      </Card>

      {/* Multi-Year Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Ramadan & Eid Dates: Next 10 Years</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-600 text-secondary">Year</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Ramadan Starts</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Eid al-Fitr</th>
                </tr>
              </thead>
              <tbody>
                {years.map(({ year, startDate, eid }) => (
                  <tr key={year} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary">{year}</td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {eid.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
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
        onClick={() => ramadan && generateICS(ramadan.startDate, ramadan.endDate, 'Ramadan')}
        className="w-full"
      >
        Add Ramadan to Calendar (ICS Download)
      </Button>
    </div>
  );
}
