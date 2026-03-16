'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate, getOrdinalDate } from '@/lib/format';

function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function getGoodFridayDate(year) {
  const easter = getEasterDate(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(goodFriday.getDate() - 2);
  return goodFriday;
}

function getNextEasterDates() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const easter = getEasterDate(currentYear);
  let nextEaster = easter;

  if (now > easter) {
    nextEaster = getEasterDate(currentYear + 1);
  }

  const goodFriday = getGoodFridayDate(nextEaster.getFullYear());

  return { nextEaster, goodFriday };
}

function generateICS(event) {
  const dtstart = event.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const dtend = new Date(event);
  dtend.setDate(dtend.getDate() + 1);
  const dtendStr = dtend.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Easter Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${dtstart}
DTEND:${dtendStr}
SUMMARY:Easter Sunday
DESCRIPTION:Easter Sunday - Resurrection of Jesus Christ
UID:easter-sunday@mykit.tools
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'easter.ics';
  a.click();
  URL.revokeObjectURL(url);
}

const EASTER_FACTS = [
  'Easter is the most important Christian festival, celebrating the resurrection of Jesus Christ.',
  'The word "Easter" comes from Eostre, the Anglo-Saxon goddess of spring.',
  'Easter eggs symbolize rebirth and renewal, and the tradition dates back to ancient times.',
  'Hot cross buns eaten on Good Friday traditionally contain currants representing the nails of the crucifixion.',
  'The Easter Bunny tradition originated in Germany in the 1600s.',
  'Easter is a moveable feast that can fall anywhere between March 22 and April 25.',
  'Many churches hold sunrise services on Easter morning to commemorate the resurrection.',
  'In some countries, Easter Monday is also a public holiday with celebrations continuing.',
];

export default function WhenIsEaster() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [easterDates, setEasterDates] = useState({ nextEaster: null, goodFriday: null });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const { nextEaster, goodFriday } = getNextEasterDates();
    setEasterDates({ nextEaster, goodFriday });
  }, []);

  useEffect(() => {
    if (!easterDates.nextEaster) return;

    const updateCountdown = () => {
      const now = new Date();
      const distance = easterDates.nextEaster - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [easterDates.nextEaster]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % EASTER_FACTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const easterYear = easterDates.nextEaster?.getFullYear() || new Date().getFullYear();
  const progressPercent = Math.max(0, 100 - (countdown.days / 365) * 100);

  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = easterYear + i;
    const easter = getEasterDate(year);
    const goodFriday = getGoodFridayDate(year);
    years.push({ year, easter, goodFriday });
  }

  return (
    <div className="space-y-6">
      {/* Countdown Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Next Easter</h2>
            {easterDates.nextEaster && (
              <p className="text-secondary">
                {easterDates.nextEaster.toLocaleDateString('en-GB', {
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
              <div key={item.label} className="bg-white rounded-lg p-4 text-center border border-purple-100">
                <div className="font-mono text-3xl font-bold text-accent">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-secondary mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Related Dates */}
      {easterDates.goodFriday && (
        <Card className="border-amber-200 bg-amber-50">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-primary">Related Dates</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <div className="text-sm text-secondary mb-1">Good Friday</div>
                <div className="font-mono font-bold text-primary">
                  {easterDates.goodFriday.toLocaleDateString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <div className="text-sm text-secondary mb-1">Easter Monday</div>
                <div className="font-mono font-bold text-primary">
                  {new Date(easterDates.nextEaster.getTime() + 86400000).toLocaleDateString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Bar */}
      <Card>
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-primary">Progress to Easter</h3>
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden border border-border">
            <div
              className="bg-gradient-to-r from-purple-400 to-indigo-500 h-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-secondary">{Math.round(progressPercent)}% of the year has passed</p>
        </div>
      </Card>

      {/* Fun Fact */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Did You Know?</h3>
          <p className="text-secondary leading-relaxed">{EASTER_FACTS[currentFact]}</p>
          <div className="flex gap-2 justify-center">
            {EASTER_FACTS.map((_, i) => (
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
            Easter falls on the first Sunday following the first full moon that occurs on or after the spring equinox (March 21). This is known as the Computus. The calculation uses the Anonymous Gregorian algorithm, which accounts for lunar and solar cycles to ensure Easter is celebrated on the correct date each year.
          </p>
          <p className="text-sm text-muted italic">
            This is why Easter changes dates each year, ranging from March 22 to April 25.
          </p>
        </div>
      </Card>

      {/* Multi-Year Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Easter Dates: Next 10 Years</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-600 text-secondary">Year</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Good Friday</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Easter Sunday</th>
                </tr>
              </thead>
              <tbody>
                {years.map(({ year, easter, goodFriday }) => (
                  <tr key={year} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary">{year}</td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {goodFriday.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {easter.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
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
        onClick={() => easterDates.nextEaster && generateICS(easterDates.nextEaster)}
        className="w-full"
      >
        Add Easter to Calendar (ICS Download)
      </Button>
    </div>
  );
}
