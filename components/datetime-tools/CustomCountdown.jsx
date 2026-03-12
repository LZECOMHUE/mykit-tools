'use client';

import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CustomCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [eventName, setEventName] = useState('My Event');
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('00:00');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Set default target date to 30 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    const dateStr = defaultDate.toISOString().split('T')[0];
    setTargetDate(dateStr);
    setIsCountingDown(true);
  }, []);

  useEffect(() => {
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
    if (!isCountingDown || !targetDate) return null;

    const [year, month, day] = targetDate.split('-').map(Number);
    const [hours, minutes] = targetTime.split(':').map(Number);
    const target = new Date(year, month - 1, day, hours, minutes, 0);

    const distance = target - now;
    if (distance <= 0) {
      return {
        days: 0, hours: 0, minutes: 0, seconds: 0,
        total: 0, isPast: true, target
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours_remaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes_remaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    return {
      days, hours: hours_remaining, minutes: minutes_remaining, seconds,
      total: distance, isPast: false, target, weeks, remainingDays
    };
  }, [now, targetDate, targetTime, isCountingDown]);

  const funFacts = [
    'Time flies when you\'re looking forward to something!',
    'Anticipation is half the fun of any countdown.',
    'Every second brings you closer to your event.',
    'Countdowns have been used to build excitement for centuries.',
    'The average person spends 90,000 hours of their life waiting.',
    'Patience is not the ability to wait, but the ability to maintain a good attitude while waiting.',
  ];

  const currentFact = funFacts[factIndex % funFacts.length];

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
      {/* Configuration Section */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Set Your Countdown</h3>
        <Input
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="e.g., My Holiday, Wedding Day, Exam"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Date"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
          <Input
            label="Time (optional)"
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCountingDown(true)}
          className="w-full"
        >
          Start Countdown
        </Button>
      </div>

      {countdown && !countdown.isPast ? (
        <>
          {/* Main Countdown Display */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">{eventName}</h2>

            {/* Big Countdown Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
                { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
                { label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-blue-100">
                  <p className="font-mono-num text-2xl sm:text-3xl font-bold text-blue-600">
                    {item.value}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Alternative Display */}
            {countdown.weeks > 0 && (
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-text-secondary text-sm mb-1">Also known as:</p>
                <p className="font-mono-num text-2xl font-bold text-purple-600">
                  {countdown.weeks} {countdown.weeks === 1 ? 'week' : 'weeks'} {countdown.remainingDays} {countdown.remainingDays === 1 ? 'day' : 'days'}
                </p>
              </div>
            )}
          </div>

          {/* Fun Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-text-muted text-xs sm:text-sm mb-1">Total Hours</p>
              <p className="font-mono-num text-2xl font-bold text-amber-600">
                {Math.floor(countdown.total / (1000 * 60 * 60)).toString()}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-text-muted text-xs sm:text-sm mb-1">Total Minutes</p>
              <p className="font-mono-num text-2xl font-bold text-green-600">
                {Math.floor(countdown.total / (1000 * 60)).toString()}
              </p>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-2">Did you know?</h3>
            <p className="text-text-secondary transition-opacity duration-500">{currentFact}</p>
          </div>
        </>
      ) : countdown && countdown.isPast ? (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-8 text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h2 className="text-3xl font-bold text-green-700">It's Here!</h2>
          <p className="text-lg text-text-secondary">Your event "{eventName}" is here. Enjoy every moment!</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Set a date and time to start your countdown</p>
        </div>
      )}
    </div>
  );
}
