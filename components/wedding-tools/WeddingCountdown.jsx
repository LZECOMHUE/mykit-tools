'use client';

import { useState, useEffect, useMemo } from 'react';

const milestones = [
  { months: 12, title: '12 Months Out', tasks: ['Set budget', 'Make guest list', 'Book venue', 'Book photographer'] },
  { months: 6, title: '6 Months Out', tasks: ['Send save-the-dates', 'Plan menu', 'Book catering', 'Order invitations'] },
  { months: 3, title: '3 Months Out', tasks: ['Send formal invitations', 'Plan ceremony', 'Book florist', 'Arrange music'] },
  { months: 1, title: '1 Month Out', tasks: ['Final headcount', 'Plan seating', 'Confirm all vendors', 'Arrange rehearsal'] },
  { months: 0.25, title: '1 Week Out', tasks: ['Final confirmations', 'Prepare timeline', 'Arrange transportation', 'Prepare emergency kit'] },
];

export default function WeddingCountdown() {
  const [weddingDate, setWeddingDate] = useState('');
  const [couple, setCouple] = useState('');
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!weddingDate) return null;

    const wedding = new Date(weddingDate);
    const distance = wedding - now;

    if (distance < 0) {
      return {
        isPast: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      isPast: false,
      days,
      hours,
      minutes,
      seconds,
      total: distance,
    };
  }, [weddingDate, now]);

  const upcomingMilestones = useMemo(() => {
    if (!countdown) return [];

    const daysUntilWedding = countdown.days;
    const daysAsMonths = daysUntilWedding / 30;

    return milestones
      .filter((m) => daysAsMonths <= m.months)
      .sort((a, b) => b.months - a.months);
  }, [countdown]);

  const completedMilestones = useMemo(() => {
    if (!countdown) return [];

    const daysUntilWedding = countdown.days;
    const daysAsMonths = daysUntilWedding / 30;

    return milestones
      .filter((m) => daysAsMonths > m.months)
      .sort((a, b) => a.months - b.months);
  }, [countdown]);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Setup */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Wedding Countdown</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Wedding Date
            </label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Couple Names (optional)
            </label>
            <input
              type="text"
              value={couple}
              onChange={(e) => setCouple(e.target.value)}
              placeholder="e.g., Sarah & John"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>
      </div>

      {/* Countdown */}
      {countdown && !countdown.isPast && (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg p-8 space-y-6">
          {couple && (
            <h2 className="text-3xl font-bold text-pink-600 text-center">
              {couple}'s Wedding
            </h2>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Days', value: countdown.days.toString().padStart(2, '0') },
              { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
              { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
              { label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0') },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg p-4 border border-pink-100">
                <p className="font-mono-num text-3xl font-bold text-pink-600">
                  {item.value}
                </p>
                <p className="text-text-muted text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 border border-pink-200 text-center">
            <p className="text-text-secondary text-sm mb-1">Only</p>
            <p className="font-mono-num text-5xl font-bold text-pink-600">
              {countdown.days}
            </p>
            <p className="text-text-secondary mt-2">
              {countdown.days === 1 ? 'day' : 'days'} until the big day!
            </p>
          </div>
        </div>
      )}

      {countdown && countdown.isPast && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center space-y-2">
          <p className="text-3xl font-bold text-green-600">Congratulations!</p>
          <p className="text-text-secondary">The wedding date has arrived!</p>
        </div>
      )}

      {/* Milestone Checklist */}
      {upcomingMilestones.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="text-text-primary font-semibold">Upcoming Planning Milestones</h3>
          <div className="space-y-4">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.months} className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-text-primary mb-2">{milestone.title}</h4>
                <ul className="space-y-2">
                  {milestone.tasks.map((task) => (
                    <li key={task} className="flex items-center gap-2 text-text-secondary text-sm">
                      <input type="checkbox" className="rounded cursor-pointer" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Milestones */}
      {completedMilestones.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
          <h3 className="text-text-primary font-semibold">Completed Milestones</h3>
          <div className="space-y-2">
            {completedMilestones.map((milestone) => (
              <div key={milestone.months} className="flex items-center gap-2 py-2">
                <span className="text-green-600">✓</span>
                <span className="text-text-secondary">{milestone.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Dates */}
      {weddingDate && countdown && !countdown.isPast && (
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-text-primary font-semibold">Key Dates</h3>
          <div className="space-y-3">
            {[
              {
                label: 'Wedding Day',
                date: new Date(weddingDate).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              },
              {
                label: '6 Months Before',
                date: new Date(new Date(weddingDate).getTime() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              },
              {
                label: '3 Months Before',
                date: new Date(new Date(weddingDate).getTime() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="text-text-secondary">{item.label}</span>
                <span className="font-semibold text-text-primary">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Planning Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Book your venue 9-12 months in advance</li>
          <li>✓ Send invitations 6-8 weeks before the wedding</li>
          <li>✓ Confirm all vendors 2-3 weeks before</li>
          <li>✓ Create a detailed timeline for the day</li>
          <li>✓ Stay organised with a checklist or planning app</li>
          <li>✓ Remember to enjoy the planning process!</li>
        </ul>
      </div>
    </div>
  );
}
