'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const CHINESE_NEW_YEAR_DATES = {
  2024: { month: 1, day: 10, animal: 'Dragon' },
  2025: { month: 0, day: 29, animal: 'Snake' },
  2026: { month: 1, day: 17, animal: 'Horse' },
  2027: { month: 1, day: 6, animal: 'Goat' },
  2028: { month: 0, day: 26, animal: 'Monkey' },
  2029: { month: 1, day: 13, animal: 'Rooster' },
  2030: { month: 1, day: 3, animal: 'Dog' },
  2031: { month: 0, day: 23, animal: 'Pig' },
  2032: { month: 1, day: 11, animal: 'Rat' },
  2033: { month: 0, day: 31, animal: 'Ox' },
  2034: { month: 1, day: 19, animal: 'Tiger' },
  2035: { month: 1, day: 8, animal: 'Rabbit' },
  2036: { month: 0, day: 28, animal: 'Dragon' },
  2037: { month: 1, day: 15, animal: 'Snake' },
  2038: { month: 1, day: 4, animal: 'Horse' },
  2039: { month: 0, day: 24, animal: 'Goat' },
  2040: { month: 1, day: 12, animal: 'Monkey' },
};

const ZODIAC_ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

function getChineseNewYearDate(year) {
  const data = CHINESE_NEW_YEAR_DATES[year];
  if (!data) return null;
  return new Date(year, data.month, data.day);
}

function getNextChineseNewYear() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const cny = getChineseNewYearDate(currentYear);

  if (cny && now <= cny) {
    return cny;
  }

  return getChineseNewYearDate(currentYear + 1);
}

function getCurrentZodiacAnimal() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const cnyThisYear = getChineseNewYearDate(currentYear);

  if (cnyThisYear && now >= cnyThisYear) {
    const data = CHINESE_NEW_YEAR_DATES[currentYear];
    return data ? data.animal : null;
  }

  const cnyLastYear = getChineseNewYearDate(currentYear - 1);
  if (cnyLastYear) {
    const data = CHINESE_NEW_YEAR_DATES[currentYear - 1];
    return data ? data.animal : null;
  }

  return null;
}

function generateICS(event, animal) {
  const dtstart = event.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const dtend = new Date(event);
  dtend.setDate(dtend.getDate() + 1);
  const dtendStr = dtend.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyKit.tools//Chinese New Year Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${dtstart}
DTEND:${dtendStr}
SUMMARY:Chinese New Year - Year of the ${animal}
DESCRIPTION:Chinese New Year - Year of the ${animal}. Start of the lunar new year.
UID:cny-${animal}@mykit.tools
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chinese-new-year-${animal.toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const CNY_FACTS = [
  'Chinese New Year, also known as Lunar New Year or Spring Festival, marks the beginning of the lunar calendar year.',
  'The festival is celebrated for 15 days and includes family reunions, fireworks, dragon dances, and lion dances.',
  'Red envelopes (hongbao) filled with money are given to children and unmarried individuals as blessings for good luck.',
  'The Chinese zodiac cycles through 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig.',
  'Over 2 billion people worldwide celebrate Chinese New Year, making it one of the largest global celebrations.',
  'Each zodiac animal has associated personality traits and characteristics that influence people born in that year.',
  'Traditional foods eaten during Chinese New Year have symbolic meanings: fish represents prosperity, dumplings represent unity.',
  'The festival dates shift each year because it follows the lunar calendar, typically falling between January 21 and February 20.',
];

export default function WhenIsChineseNewYear() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentFact, setCurrentFact] = useState(0);
  const [nextCNY, setNextCNY] = useState(null);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [nextAnimal, setNextAnimal] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const next = getNextChineseNewYear();
    setNextCNY(next);

    const current = getCurrentZodiacAnimal();
    setCurrentAnimal(current);

    const nextData = CHINESE_NEW_YEAR_DATES[next.getFullYear()];
    setNextAnimal(nextData ? nextData.animal : null);
  }, []);

  useEffect(() => {
    if (!nextCNY) return;

    const updateCountdown = () => {
      const now = new Date();
      const distance = nextCNY - now;

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
  }, [nextCNY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % CNY_FACTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !nextCNY) return null;

  const progressPercent = Math.max(0, 100 - (countdown.days / 365) * 100);
  const cnyYear = nextCNY.getFullYear();

  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = cnyYear + i;
    const date = getChineseNewYearDate(year);
    const data = CHINESE_NEW_YEAR_DATES[year];
    if (date && data) {
      years.push({ year, date, animal: data.animal });
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Zodiac Animal */}
      {currentAnimal && (
        <Card className="bg-gradient-to-br from-red-50 to-yellow-50 border-red-200">
          <div className="text-center space-y-2">
            <p className="text-sm text-secondary">Current Zodiac Year</p>
            <div className="text-5xl mb-2">🧧</div>
            <h2 className="font-heading text-3xl font-bold text-primary">Year of the {currentAnimal}</h2>
          </div>
        </Card>
      )}

      {/* Countdown Card */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Next Chinese New Year</h2>
            {nextCNY && (
              <>
                <p className="text-secondary">
                  {nextCNY.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {nextAnimal && <p className="text-accent font-600 mt-1">Year of the {nextAnimal}</p>}
              </>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-4 text-center border border-red-100">
                <div className="font-mono text-3xl font-bold text-accent">{String(item.value).padStart(2, '0')}</div>
                <div className="text-xs text-secondary mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Progress Bar */}
      <Card>
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-primary">Progress to Chinese New Year</h3>
          <div className="w-full bg-surface rounded-full h-3 overflow-hidden border border-border">
            <div
              className="bg-gradient-to-r from-red-400 to-yellow-500 h-full transition-all duration-1000"
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
          <p className="text-secondary leading-relaxed">{CNY_FACTS[currentFact]}</p>
          <div className="flex gap-2 justify-center">
            {CNY_FACTS.map((_, i) => (
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
            Chinese New Year falls on the new moon that occurs between January 21 and February 20. It marks the beginning of the lunar calendar year. Unlike the Gregorian calendar, the lunar calendar is based on the moon's phases, which is why Chinese New Year shifts dates each year.
          </p>
          <p className="text-sm text-muted italic">
            Note: The exact date may vary by 1-2 days depending on moon sighting observations in different regions.
          </p>
        </div>
      </Card>

      {/* Multi-Year Table */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">Chinese New Year: Next 10 Years</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-600 text-secondary">Year</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Date</th>
                  <th className="text-left py-2 px-3 font-600 text-secondary">Zodiac Animal</th>
                </tr>
              </thead>
              <tbody>
                {years.map(({ year, date, animal }) => (
                  <tr key={year} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary">{year}</td>
                    <td className="py-3 px-3 font-mono text-secondary">
                      {date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-3 text-secondary font-500">{animal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Zodiac Animals Legend */}
      <Card className="bg-amber-50 border-amber-200">
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-bold text-primary">The 12 Zodiac Animals</h3>
          <div className="grid grid-cols-3 gap-3">
            {ZODIAC_ANIMALS.map((animal) => (
              <div
                key={animal}
                className={`p-3 rounded-lg text-sm font-500 text-center border transition-colors ${
                  animal === currentAnimal
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white border-amber-200 text-secondary hover:bg-amber-50'
                }`}
              >
                {animal}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Add to Calendar */}
      <Button onClick={() => nextCNY && generateICS(nextCNY, nextAnimal)} className="w-full">
        Add Chinese New Year to Calendar (ICS Download)
      </Button>
    </div>
  );
}
