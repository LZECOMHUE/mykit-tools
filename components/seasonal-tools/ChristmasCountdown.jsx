'use client';

import { useState, useEffect, useMemo } from 'react';

export default function ChristmasCountdown() {
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
    return () => { clearInterval(timer); clearInterval(factTimer); };
  }, []);

  const countdown = useMemo(() => {
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25, 0, 0, 0);

    if (now > christmas) {
      return {
        christmas: new Date(currentYear + 1, 11, 25),
        isPast: true,
        year: currentYear + 1,
      };
    }

    return { christmas, isPast: false, year: currentYear };
  }, [now]);

  const diff = useMemo(() => {
    const distance = countdown.christmas - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: distance };
  }, [now, countdown]);

  const progressPercent = useMemo(() => {
    const year = countdown.year;
    const jan1 = new Date(year, 0, 1);
    const dec25 = new Date(year, 11, 25);
    const daysInYear = Math.floor((dec25 - jan1) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now - jan1) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, (daysPassed / daysInYear) * 100));
  }, [now, countdown.year]);

  const facts = [
    'Christmas is celebrated by over 2 billion people worldwide',
    'Santa Claus visits 2 billion homes on Christmas Eve',
    'The first artificial Christmas tree was made of goose feathers',
    'Christmas trees can live for up to 40 years',
    'Most mistletoe is harvested in the week before Christmas',
    'The song "Jingle Bells" was originally written for Thanksgiving',
    'A Christmas turkey can weigh up to 30 pounds',
  ];

  const sleeps = diff.days;
  const currentFact = facts[factIndex % facts.length];

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Main Countdown */}
      <div className="bg-gradient-to-br from-red-50 to-green-50 border-2 border-red-200 rounded-lg p-8 text-center space-y-6">
        <h2 className="text-4xl font-bold text-red-600">Christmas Countdown</h2>
        <p className="text-lg text-text-secondary">{sleeps} sleeps until Christmas {countdown.year}!</p>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Days', value: diff.days },
            { label: 'Hours', value: diff.hours.toString().padStart(2, '0') },
            { label: 'Minutes', value: diff.minutes.toString().padStart(2, '0') },
            { label: 'Seconds', value: diff.seconds.toString().padStart(2, '0') },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg p-4 border border-red-100">
              <p className="font-mono-num text-3xl font-bold text-red-600">
                {item.value}
              </p>
              <p className="text-text-muted text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Sleeps Display */}
        <div className="bg-white rounded-lg p-6 border border-red-200">
          <p className="text-text-muted text-sm mb-2">Only...</p>
          <p className="font-mono-num text-5xl font-bold text-green-600">{sleeps}</p>
          <p className="text-text-secondary mt-2">
            {sleeps === 1 ? 'Sleep' : 'Sleeps'} until Christmas!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Year Progress</h3>
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
        <p className="text-text-secondary transition-opacity duration-500">{currentFact}</p>
      </div>

      {/* Quick Facts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Christmas Facts</h3>
        <div className="space-y-3">
          {[
            { label: 'Days until Christmas', value: diff.days },
            { label: 'Hours remaining', value: (diff.days * 24 + diff.hours).toString() },
            { label: 'Minutes remaining', value: Math.floor(diff.total / 60000).toString() },
            { label: 'Year', value: countdown.year.toString() },
          ].map((fact) => (
            <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{fact.label}</span>
              <span className="font-mono-num font-semibold text-text-primary">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
