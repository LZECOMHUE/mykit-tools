'use client';

import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function HolidayCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set default departure to 60 days from now
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 60);
    setDepartureDate(defaultDate.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!showCountdown || !departureDate) return null;

    const [year, month, day] = departureDate.split('-').map(Number);
    const departure = new Date(year, month - 1, day, 0, 0, 0);

    const distance = departure - now;

    if (distance <= 0) {
      return { isPast: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Calculate work days only
    let workDays = 0;
    const current = new Date(now);
    while (current < departure) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        workDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Get packing reminder milestones
    const packingMilestones = [
      { days: 21, title: 'Book airport parking', action: 'Reserve your spot' },
      { days: 14, title: 'Start packing list', action: 'Plan what to bring' },
      { days: 7, title: 'Check passport', action: 'Ensure it\'s valid' },
      { days: 3, title: 'Final packing', action: 'Pack your bags' },
      { days: 1, title: 'Check in online', action: 'Online check-in opens' },
    ];

    return {
      days, hours, minutes, seconds, distance, isPast: false,
      departureFormatted: departure.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      workDays,
      packingMilestones,
    };
  }, [now, departureDate, showCountdown]);

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
      {/* Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Plan Your Holiday</h3>

        <Input
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Paris, Bali, New York"
        />

        <Input
          label="Departure Date"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={() => setShowCountdown(true)}
          className="w-full"
        >
          Start Countdown
        </Button>
      </div>

      {countdown && !countdown.isPast ? (
        <>
          {/* Main Countdown */}
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-300 rounded-lg p-8 text-center space-y-6">
            <div className="text-5xl">✈️</div>
            <h2 className="text-3xl font-bold text-text-primary">
              {destination ? `Holiday to ${destination}` : 'Your Holiday'}
            </h2>
            <p className="text-lg text-text-secondary">{countdown.departureFormatted}</p>

            {/* Big Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
                { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
                { label: 'Seconds', value: countdown.seconds.toString().padStart(2, '0') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-cyan-100">
                  <p className="font-mono-num text-2xl sm:text-3xl font-bold text-cyan-600">
                    {item.value}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Work Days Stat */}
            <div className="bg-white rounded-lg p-4 border border-cyan-200">
              <p className="text-text-muted text-sm mb-1">Only X more work days until your holiday!</p>
              <p className="font-mono-num text-3xl font-bold text-cyan-600">{countdown.workDays}</p>
            </div>
          </div>

          {/* Packing Reminders */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-4">Packing Reminders</h3>
            <div className="space-y-3">
              {countdown.packingMilestones.map((milestone) => {
                const isActive = countdown.days <= milestone.days;
                return (
                  <div
                    key={milestone.days}
                    className={`flex items-start justify-between p-3 rounded-lg border ${
                      isActive
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-surface-hover border-border opacity-50'
                    }`}
                  >
                    <div>
                      <p className={`font-semibold ${isActive ? 'text-amber-900' : 'text-text-secondary'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{milestone.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono-num font-semibold text-text-primary">
                        {countdown.days > milestone.days ? `${countdown.days - milestone.days}d` : 'Now!'}
                      </p>
                      <p className="text-xs text-text-muted">with {milestone.days}d</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-2">About Your Trip</h3>
            <p className="text-text-secondary text-sm mb-3">
              {destination ? (
                <>
                  📍 <span className="font-semibold">{destination}</span><br />
                  Check the forecast closer to your trip for packing tips
                </>
              ) : (
                'Add a destination to get destination-specific tips!'
              )}
            </p>
          </div>

          {/* Holiday Stats */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-4">Holiday Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Days until departure', value: countdown.days },
                { label: 'Hours remaining', value: (countdown.days * 24 + countdown.hours).toString() },
                { label: 'Work days until holiday', value: countdown.workDays },
                { label: 'Weekends before departure', value: Math.ceil(countdown.days / 7) },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-text-secondary">{fact.label}</span>
                  <span className="font-mono-num font-semibold text-text-primary">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Trip Checklist */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-3">Quick Pre-Trip Checklist</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="text-lg">✓</span> Passport valid for 6 months
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✓</span> Travel insurance booked
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✓</span> Flights confirmed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✓</span> Accommodation booked
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✓</span> Notify your bank of travel
              </li>
            </ul>
          </div>
        </>
      ) : countdown && countdown.isPast ? (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-400 rounded-lg p-8 text-center space-y-4">
          <div className="text-5xl">🏖️</div>
          <h2 className="text-3xl font-bold text-cyan-700">Happy Holidays!</h2>
          <p className="text-lg text-text-secondary">Enjoy your well-deserved break! Take lots of photos and make amazing memories.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Enter your destination and departure date to start counting down!</p>
        </div>
      )}
    </div>
  );
}
