'use client';

import { useState, useEffect, useMemo } from 'react';

export default function NewYearCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
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

  const countdown = useMemo(() => {
    const currentYear = now.getFullYear();
    const nextNewYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

    const distance = nextNewYear - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Year progress calculation
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);
    const daysInYear = Math.floor((yearEnd - yearStart) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - yearStart) / (1000 * 60 * 60 * 24));
    const yearProgress = (daysPassed / daysInYear) * 100;

    return { days, hours, minutes, seconds, total: distance, yearProgress };
  }, [now]);

  const facts = [
    `Hours of ${now.getFullYear()} remaining: ${Math.floor((countdown.total) / (1000 * 60 * 60))}`,
    `You've lived through ${countdown.yearProgress.toFixed(1)}% of this year`,
    `${Math.floor(countdown.days / 7)} weeks and ${countdown.days % 7} days until the new year`,
    `Weekends left this year: ${Math.ceil(countdown.days / 7)}`,
    `Fridays left this year: ${Math.ceil(countdown.days / 7)}`,
    'New Year traditions: In Japan, families gather to celebrate with Osechi food',
    'In Spain, people eat 12 grapes at midnight, one for each month of the coming year',
    'In Scotland, Hogmanay includes torch processions and fire ceremonies',
    'In Brazil, people wear white clothes on New Year\'s Eve for peace and fresh starts',
    'In Greece, they throw pomegranates against the door for good luck',
  ];

  const currentFact = facts[factIndex % facts.length];

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
      {/* Main Countdown */}
      <div className="bg-gradient-to-br from-amber-50 to-neutral-50 border-2 border-amber-300 rounded-lg p-8 text-center space-y-6">
        <div className="text-5xl">✨</div>
        <h2 className="text-4xl font-bold text-amber-900">New Year Countdown</h2>
        <p className="text-lg text-text-secondary">Only {countdown.days} days until {now.getFullYear() + 1}!</p>

        {/* Big Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
              <p className="font-mono-num text-2xl sm:text-3xl font-bold text-amber-600">
                {item.value}
              </p>
              <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Year Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Year Progress</h3>
          <span className="text-text-muted text-sm">{countdown.yearProgress.toFixed(1)}% complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
            style={{ width: `${countdown.yearProgress}%` }}
          />
        </div>
      </div>

      {/* Fun Fact Rotation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500 min-h-[24px]">{currentFact}</p>
      </div>

      {/* New Year Facts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">New Year Stats</h3>
        <div className="space-y-3">
          {[
            { label: 'Days left this year', value: countdown.days },
            { label: 'Hours remaining', value: (countdown.days * 24 + countdown.hours).toString() },
            { label: 'Minutes to go', value: Math.floor(countdown.total / 60000).toString() },
            { label: 'Next year', value: (now.getFullYear() + 1).toString() },
          ].map((fact) => (
            <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{fact.label}</span>
              <span className="font-mono-num font-semibold text-text-primary">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspiration */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center">
        <p className="text-text-secondary italic">
          "The New Year stands before us like a chapter in a book, waiting to be written. We hold the pen."
        </p>
      </div>
    </div>
  );
}
