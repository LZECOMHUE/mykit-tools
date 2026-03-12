'use client';

import { useState, useMemo } from 'react';
import { downloadLifeStatsCard } from '@/lib/export';

const GENERATIONS = [
  { name: 'Baby Boomer', range: [1946, 1964], description: 'Born into post-war optimism and economic growth' },
  { name: 'Generation X', range: [1965, 1980], description: 'Independent, pragmatic, bridged analog and digital' },
  { name: 'Millennial', range: [1981, 1996], description: 'Connected, idealistic, shaped by the internet' },
  { name: 'Generation Z', range: [1997, 2012], description: 'Digital natives, socially conscious, always online' },
  { name: 'Generation Alpha', range: [2013, 2025], description: 'Growing up in an AI-driven world' },
];

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function LifeStats() {
  const [birthDate, setBirthDate] = useState('');

  const stats = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    // Calculate days alive
    const daysAlive = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const hoursAlive = daysAlive * 24;
    const minutesAlive = hoursAlive * 60;

    // Age breakdown
    const years = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 365.25));
    const monthsRemainder = Math.floor(((today - birth) % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const daysRemainder = Math.floor(((today - birth) % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    // Life stats calculations
    const heartbeats = daysAlive * 24 * 60 * 72; // 72 bpm avg
    const breaths = daysAlive * 24 * 60 * 16; // 16/min avg
    const hoursSleep = daysAlive * 8; // 8 hrs/day avg
    const mealEaten = daysAlive * 3;
    const timesSmiled = daysAlive * 20; // 20/day avg
    const timesBlinked = daysAlive * 16 * 60 * 17; // 17/min during 16 waking hours
    const tripsAroundSun = (daysAlive / 365.25).toFixed(2);
    const fullMoons = Math.floor(daysAlive / 29.53);
    const stepsTaken = daysAlive * 6000; // 6000 steps/day avg
    const wordsSpoken = daysAlive * 16000; // 16000/day avg
    const dreamsBad = daysAlive * 5; // 4-6 dreams/night

    // Format large numbers
    const formatLargeNumber = (num) => {
      if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B';
      }
      if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M';
      }
      return Math.floor(num).toLocaleString();
    };

    // Milestones
    const milestones = [];

    // 10,000 days old
    const tenKDaysDate = new Date(birth);
    tenKDaysDate.setDate(tenKDaysDate.getDate() + 10000);
    const tenKDaysDiff = Math.floor((tenKDaysDate - today) / (1000 * 60 * 60 * 24));
    milestones.push({
      label: '10,000 days old',
      date: tenKDaysDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: tenKDaysDiff,
    });

    // 1 billion seconds old (11,574.07 days)
    const billionSecsDate = new Date(birth);
    billionSecsDate.setDate(billionSecsDate.getDate() + 11574.07);
    const billionSecsDiff = Math.floor((billionSecsDate - today) / (1000 * 60 * 60 * 24));
    milestones.push({
      label: '1 billion seconds old',
      date: billionSecsDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: billionSecsDiff,
    });

    // 20,000 days old
    const twentyKDaysDate = new Date(birth);
    twentyKDaysDate.setDate(twentyKDaysDate.getDate() + 20000);
    const twentyKDaysDiff = Math.floor((twentyKDaysDate - today) / (1000 * 60 * 60 * 24));
    milestones.push({
      label: '20,000 days old',
      date: twentyKDaysDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: twentyKDaysDiff,
    });

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const birthdayDays = Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));
    milestones.push({
      label: 'Next birthday',
      date: nextBirthday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      days: birthdayDays,
    });

    // Generation
    const birthYear = birth.getFullYear();
    const generation = GENERATIONS.find((g) => birthYear >= g.range[0] && birthYear <= g.range[1]);

    // Day of week born
    const dayOfWeek = DAYS_OF_WEEK[birth.getDay()];

    return {
      years,
      monthsRemainder,
      daysRemainder,
      daysAlive,
      hoursAlive,
      minutesAlive,
      heartbeats: formatLargeNumber(heartbeats),
      breaths: formatLargeNumber(breaths),
      hoursSleep: formatLargeNumber(hoursSleep),
      mealEaten: formatLargeNumber(mealEaten),
      timesSmiled: formatLargeNumber(timesSmiled),
      timesBlinked: formatLargeNumber(timesBlinked),
      tripsAroundSun,
      fullMoons: fullMoons.toLocaleString(),
      stepsTaken: formatLargeNumber(stepsTaken),
      wordsSpoken: formatLargeNumber(wordsSpoken),
      dreamsBad: formatLargeNumber(dreamsBad),
      milestones: milestones.sort((a, b) => a.days - b.days),
      generation,
      dayOfWeek,
    };
  }, [birthDate]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="birthdate" className="block text-sm font-medium text-text-secondary mb-3">
          Enter your date of birth
        </label>
        <input
          id="birthdate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-3 rounded-[var(--radius-input,8px)] bg-white border border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
          style={{
            '--radius-input': '8px',
          }}
        />
      </div>

      {stats ? (
        <div className="space-y-3">
          {/* Age Display */}
          <div className="bg-white border border-border rounded-[var(--radius-card,12px)] p-6 text-center" style={{ '--radius-card': '12px' }}>
            <p className="text-text-muted text-sm mb-2">You are</p>
            <h2 className="text-3xl font-bold text-text-primary">
              {stats.years} years, {stats.monthsRemainder} months, {stats.daysRemainder} days old
            </h2>
            <p className="text-text-secondary text-sm mt-3">
              You were born on a <span className="font-semibold text-text-primary">{stats.dayOfWeek}</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🫀', number: stats.heartbeats, label: 'Heartbeats' },
              { icon: '🌬️', number: stats.breaths, label: 'Breaths taken' },
              { icon: '😴', number: stats.hoursSleep, label: 'Hours slept' },
              { icon: '🍽️', number: stats.mealEaten, label: 'Meals eaten' },
              { icon: '😊', number: stats.timesSmiled, label: 'Times smiled' },
              { icon: '👁️', number: stats.timesBlinked, label: 'Times blinked' },
              { icon: '🌍', number: stats.tripsAroundSun, label: 'Trips around sun' },
              { icon: '🌕', number: stats.fullMoons, label: 'Full moons' },
              { icon: '🚶', number: stats.stepsTaken, label: 'Steps taken' },
              { icon: '🗣️', number: stats.wordsSpoken, label: 'Words spoken' },
              { icon: '💤', number: stats.dreamsBad, label: 'Dreams had' },
              { icon: '📅', number: stats.daysAlive.toLocaleString(), label: 'Days alive' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-[var(--radius-card,12px)] p-4 text-center border border-border hover:bg-white transition"
                style={{ '--radius-card': '12px' }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-mono-num text-lg font-bold text-text-primary">{stat.number}</div>
                <div className="text-[11px] text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => downloadLifeStatsCard(stats, birthDate)}
              className="px-6 py-3 rounded-[var(--radius-button,8px)] bg-accent hover:bg-accent-hover text-white font-medium transition inline-flex items-center gap-2"
              style={{ '--radius-button': '8px' }}
            >
              📸 Download Shareable Card
            </button>
          </div>

          {/* Milestones Card */}
          <div className="bg-white border border-border rounded-[var(--radius-card,12px)] p-6" style={{ '--radius-card': '12px' }}>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wide">Life Milestones</h3>
            <div className="space-y-3">
              {stats.milestones.map((milestone, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm border-b border-border pb-3 last:border-b-0">
                  <div>
                    <p className="font-medium text-text-primary">{milestone.label}</p>
                    <p className="text-text-muted text-xs mt-1">{milestone.date}</p>
                  </div>
                  <div className="text-right font-mono-num font-semibold text-accent">
                    {milestone.days > 0 ? `in ${milestone.days} days` : `${Math.abs(milestone.days)} days ago`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generation Card */}
          {stats.generation && (
            <div className="bg-white border border-border rounded-[var(--radius-card,12px)] p-6" style={{ '--radius-card': '12px' }}>
              <h3 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wide">Your Generation</h3>
              <p className="text-lg font-semibold text-accent mb-2">{stats.generation.name}</p>
              <p className="text-text-secondary text-sm">{stats.generation.description}</p>
              <p className="text-text-muted text-xs mt-3">({stats.generation.range[0]} – {stats.generation.range[1]})</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-muted">Enter your date of birth to see your life stats</p>
        </div>
      )}
    </div>
  );
}
