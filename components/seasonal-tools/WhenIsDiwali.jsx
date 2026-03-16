'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const DIWALI_DATES = {
  2024: { month: 10, day: 1 },
  2025: { month: 9, day: 20 },
  2026: { month: 10, day: 8 },
  2027: { month: 9, day: 29 },
  2028: { month: 9, day: 17 },
  2029: { month: 10, day: 5 },
  2030: { month: 9, day: 26 },
  2031: { month: 9, day: 16 },
  2032: { month: 10, day: 2 },
  2033: { month: 9, day: 22 },
  2034: { month: 10, day: 10 },
  2035: { month: 9, day: 30 },
};

const DIWALI_DAYS = [
  { day: -2, name: 'Dhanteras', description: 'Day to buy precious metals and new utensils' },
  { day: -1, name: 'Chhoti Diwali', description: 'Small Diwali, day before the main festival' },
  { day: 0, name: 'Diwali', description: 'Festival of Lights, main celebration day' },
  { day: 1, name: 'Govardhan Puja', description: 'Worship of Lord Krishna and cattle' },
  { day: 2, name: 'Bhai Dooj', description: 'Celebration of brotherhood between siblings' },
];

function getDiwalDate(year) {
  const data = DIWALI_DATES[year];
  if (!data) return null;
  return new Date(year, data.month, data.day);
}

function getNextDiwali() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const diwali = getDiwalDate(currentYear);

  if (diwali && now <= diwali) {
    return diwali;
  }

  return getDiwalDate(currentYear + 1);
}

function generateICS(diwalDate) {
  const dtstart = diwalDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const dtend = new Date(diwalDate);
  dtend.setDate(dtend.getDate() + 1);
  const dtendStr = dtend.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Diwali Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${dtstart}
DTEND:${dtendStr}
SUMMARY:Diwali - Festival of Lights
DESCRIPTION:Diwali - Festival of Lights. Celebration of good over evil and light over darkness.
UID:diwali-${diwalDate.getFullYear()}@mykit.tools
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diwali-${diwalDate.getFullYear()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const DIWALI_FACTS = [
  'Diwali, also known as Deepavali (meaning row of lights), is the Festival of Lights celebrated across India and by millions worldwide.',
  'Diwali symbolizes the victory of light over darkness and good over evil. People light oil lamps (diyas) to celebrate this triumph.',
  'The festival is celebrated for five days, with the main day falling on the new moon (Amavasya) of the Hindu month Kartik (October-November).',
  'During Diwali, homes and buildings are decorated with colorful lights, candles, and lanterns (rangoli) to welcome prosperity and happiness.',
  'Fireworks are a traditional part of Diwali celebrations, symbolizing the victory and triumph of good. However, many now prefer eco-friendly alternatives.',
  'Exchanging sweets and gifts during Diwali strengthens relationships and spreads joy among family, friends, and community members.',
  'Diwali is celebrated by Hindus, Sikhs, Buddhists, and Jains, each with their own traditions but united in the theme of light and hope.',
  'New clothes are worn during Diwali, and homes are cleaned and whitewashed to symbolize a fresh start and new beginnings.',
];

export default function WhenIsDiwali() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [nextDiwali, setNextDiwali] = useState(null);
  const [divaliFestivalDates, setDivaliFestivalDates] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const next = getNextDiwali();
    setNextDiwali(next);

    if (next) {
      const festivalDates = DIWALI_DAYS.map((info) => {
        const date = new Date(next);
        date.setDate(date.getDate() + info.day);
        return { ...info, date };
      });
      setDivaliFestivalDates(festivalDates);
    }
  }, []);

  useEffect(() => {
    if (!nextDiwali) return;

    const updateCountdown = () => {
      const now = new Date();
      const distance = nextDiwali - now;

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
  }, [nextDiwali]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % DIWALI_FACTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !nextDiwali) return null;

  const progressPercent = Math.max(0, 100 - (countdown.days / 365) * 100);
  const diwalYear = nextDiwali.getFullYear();

  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = diwalYear + i;
    const date = getDiwalDate(year);
    if (date) {
      years.push({ year, date });
    }
  }

  return (
    <div className="space-y-6">
      {/* Countdown Card */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Next Diwali</h2>
            {nextDiwali && (
              <p className="text-secondary">
                {nextDiwali.toLocaleDateString('en-GB', {
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
              <div key={item.label} className="bg-white rounded-lg p-4 text-center border border-orange-100">
                <div className="font-mono text-3xl font-bold text-accent">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-secondary mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Diwali Festival Days */}
      {divaliFestivalDates.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">The 5 Days of Diwali</h3>
            <div className="space-y-3">
              {divaliFestivalDates.map((info) => (
                <div
                  key={info.day}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    info.day === 0
                      ? 'bg-orange-100 border-accent'
                      : 'bg-white border-amber-100 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-600 ${info.day === 0 ? 'text-accent' : 'text-primary'}`}>
                        {info.name}
                        {info.day === 0 && ' (Main Day)'}
                      </h4>
                      <p className="text-sm text-secondary mt-1">{info.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-primary">
                        {info.date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        {info.date.toLocaleDateString('en-GB', { weekday: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Progress Bar */}
      <Card>
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-primary">Progress to Diwali</h3>
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden border border-border">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-full transition-all duration-1000"
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
          <p className="text-secondary leading-relaxed">{DIWALI_FACTS[currentFact]}</p>
          <div className="flex gap-2 justify-center">
            {DIWALI_FACTS.map((_, i) => (
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
            Diwali falls on the darkest night (new moon or Amavasya) of the Hindu month of Kartik, which typically occurs in October or November on the Gregorian calendar. The exact date varies each year because the Hindu lunar calendar is based on the moon's phases rather than fixed dates.
          </p>
          <p className="text-sm text-muted italic">
            The main day of Diwali is observed with the 5-day festival that includes Dhanteras, Chhoti Diwali, Diwali, Govardhan Puja, and Bhai Dooj.
          </p>
        </div>
      </Card>

      {/* Multi-Year Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Diwali Dates: Next 10 Years</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-600 text-secondary">Year</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Diwali Date</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Day of Week</th>
                </tr>
              </thead>
              <tbody>
                {years.map(({ year, date }) => (
                  <tr key={year} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary">{year}</td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 text-secondary font-500">
                      {date.toLocaleDateString('en-GB', { weekday: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add to Calendar */}
      <Button onClick={() => nextDiwali && generateICS(nextDiwali)} className="w-full">
        Add Diwali to Calendar (ICS Download)
      </Button>
    </div>
  );
}
