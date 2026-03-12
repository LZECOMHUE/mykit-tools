'use client';

import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { downloadBirthdayCard } from '@/lib/export';

const zodiacSigns = [
  { month: 1, day: 20, sign: '♑ Capricorn', range: 'Dec 22 - Jan 19' },
  { month: 2, day: 19, sign: '♒ Aquarius', range: 'Jan 20 - Feb 18' },
  { month: 3, day: 21, sign: '♓ Pisces', range: 'Feb 19 - Mar 20' },
  { month: 4, day: 20, sign: '♈ Aries', range: 'Mar 21 - Apr 19' },
  { month: 5, day: 21, sign: '♉ Taurus', range: 'Apr 20 - May 20' },
  { month: 6, day: 21, sign: '♊ Gemini', range: 'May 21 - Jun 20' },
  { month: 7, day: 23, sign: '♋ Cancer', range: 'Jun 21 - Jul 22' },
  { month: 8, day: 23, sign: '♌ Leo', range: 'Jul 23 - Aug 22' },
  { month: 9, day: 23, sign: '♍ Virgo', range: 'Aug 23 - Sep 22' },
  { month: 10, day: 23, sign: '♎ Libra', range: 'Sep 23 - Oct 22' },
  { month: 11, day: 22, sign: '♏ Scorpio', range: 'Oct 23 - Nov 21' },
  { month: 12, day: 22, sign: '♐ Sagittarius', range: 'Nov 22 - Dec 21' },
];

function getZodiacSign(month, day) {
  for (let i = 0; i < zodiacSigns.length; i++) {
    const current = zodiacSigns[i];
    const next = zodiacSigns[(i + 1) % 12];

    if (current.month === 12) {
      if ((month === 12 && day >= current.day) || (month === 1 && day < next.day)) {
        return current;
      }
    } else if (month === current.month) {
      if (day < (zodiacSigns[(i + 1) % 12].month === current.month + 1 ? zodiacSigns[(i + 1) % 12].day : 32)) {
        return current;
      }
    }
  }

  // Fallback
  if (month === 1 || month === 12) return zodiacSigns[0];
  return zodiacSigns[month - 1];
}

export default function BirthdayCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [birthMonth, setBirthMonth] = useState('1');
  const [birthDay, setBirthDay] = useState('1');
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!showCountdown) return null;

    const currentYear = now.getFullYear();
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);

    let nextBirthday = new Date(currentYear, month - 1, day, 0, 0, 0);

    if (nextBirthday < now) {
      nextBirthday = new Date(currentYear + 1, month - 1, day, 0, 0, 0);
    }

    const distance = nextBirthday - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Calculate current age
    const birthYearForAge = currentYear - 25; // Default for calculation
    const birthdayThisYear = new Date(currentYear, month - 1, day);
    let age = 25;
    if (birthdayThisYear < now) {
      age = 26;
    }

    // Days lived (rough estimate)
    const daysLived = age * 365 + Math.floor(age / 4);

    return {
      days, hours, minutes, seconds, distance,
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      age,
      daysLived
    };
  }, [now, birthMonth, birthDay, showCountdown]);

  const zodiac = getZodiacSign(parseInt(birthMonth), parseInt(birthDay));
  const dayOfWeek = countdown?.nextBirthday.split(',')[0] || 'a special day';

  const handleDownload = () => {
    if (!countdown) return;

    const zodiacParts = zodiac.sign.split(' ');
    const symbol = zodiacParts[0];
    const name = zodiacParts[1];

    downloadBirthdayCard({
      days: countdown.days,
      hours: countdown.hours,
      minutes: countdown.minutes,
      age: countdown.age,
      nextBirthday: countdown.nextBirthday,
      zodiac: { symbol, name },
      daysLived: countdown.daysLived,
    });
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
      {/* Birthday Setup */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Enter Your Birthday</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1.5">Month</label>
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary min-h-[38px] focus:ring-2 focus:ring-accent/10 focus:border-accent"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i, 1).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-1.5">Day</label>
            <select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary min-h-[38px] focus:ring-2 focus:ring-accent/10 focus:border-accent"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCountdown(true)}
          className="w-full"
        >
          Calculate Birthday
        </Button>
      </div>

      {countdown && (
        <>
          {/* Main Countdown */}
          <div className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-300 rounded-lg p-8 text-center space-y-6">
            <div className="text-5xl">🎂</div>
            <h2 className="text-3xl font-bold text-text-primary">Your Next Birthday</h2>
            <p className="text-lg text-text-secondary">{countdown.nextBirthday}</p>

            {/* Big Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
                { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
                { label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-pink-100">
                  <p className="font-mono-num text-2xl sm:text-3xl font-bold text-pink-600">
                    {item.value}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Age & Zodiac Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs sm:text-sm mb-1">You'll turn</p>
              <p className="font-mono-num text-4xl font-bold text-blue-600">{countdown.age}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs sm:text-sm mb-1">Zodiac Sign</p>
              <p className="text-2xl font-bold text-purple-600">{zodiac.sign}</p>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-4">Fun Birthday Facts</h3>
            <div className="space-y-3">
              {[
                { label: 'Days until birthday', value: countdown.days },
                { label: 'Days you\'ve lived (approx)', value: countdown.daysLived },
                { label: 'Estimated heartbeats', value: (countdown.daysLived * 100000).toLocaleString() },
                { label: 'Your next birthday falls on a', value: dayOfWeek },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-text-secondary">{fact.label}</span>
                  <span className="font-mono-num font-semibold text-text-primary">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zodiac Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-2">Your Zodiac Sign</h3>
            <p className="text-lg font-semibold text-purple-600 mb-2">{zodiac.sign}</p>
            <p className="text-text-secondary text-sm">{zodiac.range}</p>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition"
          >
            📸 Download Shareable Card
          </button>
        </>
      )}
    </div>
  );
}
