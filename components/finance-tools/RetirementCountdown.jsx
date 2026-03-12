'use client';

import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RetirementCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [retirementAge, setRetirementAge] = useState('67');
  const [useSpecificDate, setUseSpecificDate] = useState(false);
  const [retirementDate, setRetirementDate] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set default DOB to 30 years ago
    const defaultDOB = new Date();
    defaultDOB.setFullYear(defaultDOB.getFullYear() - 30);
    setDateOfBirth(defaultDOB.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!showCountdown) return null;

    let retireDate;

    if (useSpecificDate && retirementDate) {
      const [year, month, day] = retirementDate.split('-').map(Number);
      retireDate = new Date(year, month - 1, day);
    } else if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split('-').map(Number);
      const dob = new Date(year, month - 1, day);
      retireDate = new Date(dob.getFullYear() + parseInt(retirementAge), dob.getMonth(), dob.getDate());
    } else {
      return null;
    }

    const distance = retireDate - now;

    if (distance <= 0) {
      return { isPast: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Calculate working days remaining (5-day weeks)
    let workingDays = 0;
    const current = new Date(now);
    while (current < retireDate) {
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        workingDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    // Calculate current age
    let age = now.getFullYear() - dateOfBirth.split('-')[0];
    const birthDate = new Date(dateOfBirth);
    if (now < new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      age--;
    }

    // Career progress (assume started at 18)
    const careerStart = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    const careerDays = (now - careerStart) / (1000 * 60 * 60 * 24);
    const totalCareerDays = (retireDate - careerStart) / (1000 * 60 * 60 * 24);
    const careerProgress = Math.min(100, (careerDays / totalCareerDays) * 100);

    return {
      days, hours, minutes, seconds, distance, isPast: false,
      retireDate: retireDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      workingDays, age, careerProgress
    };
  }, [now, dateOfBirth, retirementAge, useSpecificDate, retirementDate, showCountdown]);

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
        <h3 className="text-text-primary font-semibold">Calculate Your Retirement</h3>

        <Input
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={!useSpecificDate}
              onChange={() => setUseSpecificDate(false)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary">Retirement Age</span>
          </label>
          {!useSpecificDate && (
            <Input
              label=""
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="67"
              min="50"
              max="100"
            />
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={useSpecificDate}
              onChange={() => setUseSpecificDate(true)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary">Specific Retirement Date</span>
          </label>
          {useSpecificDate && (
            <Input
              label=""
              type="date"
              value={retirementDate}
              onChange={(e) => setRetirementDate(e.target.value)}
            />
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => setShowCountdown(true)}
          className="w-full"
        >
          Calculate Countdown
        </Button>
      </div>

      {countdown && !countdown.isPast ? (
        <>
          {/* Main Display */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg p-8 text-center space-y-6">
            <div className="text-5xl">🎊</div>
            <h2 className="text-3xl font-bold text-text-primary">Retirement Day</h2>
            <p className="text-lg text-text-secondary">{countdown.retireDate}</p>

            {/* Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Years', value: Math.floor(countdown.days / 365) },
                { label: 'Months', value: Math.floor((countdown.days % 365) / 30) },
                { label: 'Days', value: countdown.days % 30 },
                { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-emerald-100">
                  <p className="font-mono-num text-2xl sm:text-3xl font-bold text-emerald-600">
                    {item.value}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-text-primary font-semibold">Career Progress</h3>
              <span className="text-text-muted text-sm">{countdown.careerProgress.toFixed(1)}% complete</span>
            </div>
            <div className="w-full bg-border rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                style={{ width: `${countdown.careerProgress}%` }}
              />
            </div>
          </div>

          {/* Freedom Stats */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-4">Freedom Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Working days remaining', value: countdown.workingDays },
                { label: 'Only X more Monday mornings', value: Math.ceil(countdown.workingDays / 5) },
                { label: 'Commutes saved after retirement', value: Math.ceil(countdown.workingDays * 2) },
                { label: 'Work lunches remaining', value: countdown.workingDays },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-text-secondary">{fact.label}</span>
                  <span className="font-mono-num font-semibold text-text-primary">{fact.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retirement Age Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-2">Age Information</h3>
            <p className="text-text-secondary text-sm">
              You are currently <span className="font-semibold">{countdown.age} years old</span> and will retire at age{' '}
              <span className="font-semibold">{parseInt(retirementAge)}</span> ({countdown.days} days from now).
            </p>
          </div>
        </>
      ) : countdown && countdown.isPast ? (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-8 text-center space-y-4">
          <div className="text-5xl">🌴</div>
          <h2 className="text-3xl font-bold text-amber-900">Happy Retirement!</h2>
          <p className="text-lg text-text-secondary">Enjoy your well-deserved rest and relaxation!</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Enter your details to calculate your retirement countdown</p>
        </div>
      )}
    </div>
  );
}
