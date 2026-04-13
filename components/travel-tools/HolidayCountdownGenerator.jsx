'use client';
import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function HolidayCountdownGenerator() {
  const [eventName, setEventName] = useState('My Holiday');
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  const [pastEvent, setPastEvent] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(targetDate);

      if (target < now) {
        setPastEvent(true);
        return;
      }

      setPastEvent(false);

      const difference = target.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        totalDays: days,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getMilestones = (totalDays) => {
    const milestones = [];

    if (totalDays > 1000) milestones.push('Over 1000 days to go!');
    if (totalDays > 365) milestones.push(`That's more than ${Math.floor(totalDays / 365)} year away!`);
    if (totalDays > 100) milestones.push(`Only ${totalDays} sleeps!`);
    if (totalDays > 30) {
      const weeks = Math.floor(totalDays / 7);
      milestones.push(`${weeks} weeks to go!`);
    }
    if (totalDays > 14) milestones.push(`Just ${Math.ceil(totalDays / 7)} weeks away!`);
    if (totalDays > 7) milestones.push(`Less than 2 weeks!`);
    if (totalDays > 2) milestones.push(`Only ${totalDays} days left!`);
    if (totalDays > 1) milestones.push(`It's almost here!`);
    if (totalDays === 0) milestones.push(`🎉 It's today!`);

    return milestones;
  };

  const milestonesText = getMilestones(countdown.totalDays);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Event Name
          </label>
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Summer Holiday, Wedding, Birthday"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Target Date
          </label>
          <Input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            min={getTodayDate()}
          />
        </div>
      </div>

      {targetDate && !pastEvent ? (
        <>
          <div className="bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-card)] space-y-4">
            <h2 className="font-heading text-2xl font-bold text-center text-text-primary">
              {eventName}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-accent">
                  {String(countdown.days).padStart(2, '0')}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {countdown.days === 1 ? 'day' : 'days'}
                </p>
              </div>

              <div className="bg-white border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-accent">
                  {String(countdown.hours).padStart(2, '0')}
                </p>
                <p className="text-xs text-text-secondary mt-1">hours</p>
              </div>

              <div className="bg-white border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-accent">
                  {String(countdown.minutes).padStart(2, '0')}
                </p>
                <p className="text-xs text-text-secondary mt-1">minutes</p>
              </div>

              <div className="bg-white border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-accent">
                  {String(countdown.seconds).padStart(2, '0')}
                </p>
                <p className="text-xs text-text-secondary mt-1">seconds</p>
              </div>
            </div>

            {milestonesText.length > 0 && (
              <div className="text-center space-y-2">
                {milestonesText.map((milestone, idx) => (
                  <p key={idx} className="text-sm font-medium text-accent">
                    {milestone}
                  </p>
                ))}
              </div>
            )}
          </div>

          <Card>
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                Additional Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-secondary">Total Days</p>
                  <p className="font-mono font-semibold text-text-primary mt-1">
                    {countdown.totalDays}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Total Weeks</p>
                  <p className="font-mono font-semibold text-text-primary mt-1">
                    {Math.floor(countdown.totalDays / 7)}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Total Hours</p>
                  <p className="font-mono font-semibold text-text-primary mt-1">
                    {countdown.totalDays * 24 + countdown.hours}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Total Minutes</p>
                  <p className="font-mono font-semibold text-text-primary mt-1">
                    {(countdown.totalDays * 24 + countdown.hours) * 60 + countdown.minutes}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : targetDate && pastEvent ? (
        <Card>
          <div className="text-center space-y-2">
            <p className="text-lg font-bold text-text-primary">🎉 {eventName} has passed!</p>
            <p className="text-sm text-text-secondary">
              Select a future date to start counting down.
            </p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Enter an event name and date above to start the countdown.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
