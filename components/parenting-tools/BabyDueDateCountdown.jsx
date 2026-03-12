'use client';

import { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const babySizeByWeek = {
  8: { size: 'Raspberry', cm: '1.6', notes: 'Heartbeat can be detected' },
  9: { size: 'Grape', cm: '2.3', notes: 'Fingers and toes starting to form' },
  10: { size: 'Prune', cm: '3.1', notes: 'All organs developing' },
  11: { size: 'Fig', cm: '4', notes: 'Fine hair appearing on body' },
  12: { size: 'Lime', cm: '5.4', notes: 'End of first trimester' },
  13: { size: 'Pea pod', cm: '7', notes: 'Baby can make facial expressions' },
  14: { size: 'Peach', cm: '8.7', notes: 'Second trimester begins' },
  15: { size: 'Navel orange', cm: '10.1', notes: 'Baby can hear sounds' },
  16: { size: 'Avocado', cm: '11.6', notes: 'Fingerprints forming' },
  17: { size: 'Turnip', cm: '13', notes: 'Vernix (protective coating) forming' },
  18: { size: 'Bell pepper', cm: '14.2', notes: 'Can yawn and hiccup' },
  19: { size: 'Mango', cm: '15.3', notes: 'Baby is moving more' },
  20: { size: 'Banana', cm: '16.4', notes: 'Halfway through pregnancy' },
  21: { size: 'Carrot', cm: '27.8', notes: 'Taste buds developing' },
  22: { size: 'Coconut', cm: '19', notes: 'Eyelids and eyebrows visible' },
  23: { size: 'Grapefruit', cm: '20.3', notes: 'Brain developing rapidly' },
  24: { size: 'Corn on cob', cm: '21.1', notes: 'Hearing fully developed' },
  25: { size: 'Cauliflower', cm: '22.3', notes: 'Skin starting to thicken' },
  26: { size: 'Zucchini', cm: '23.5', notes: 'Eyes starting to open' },
  27: { size: 'Lettuce head', cm: '24.8', notes: 'Lungs maturing' },
  28: { size: 'Eggplant', cm: '25.7', notes: 'Third trimester begins' },
  29: { size: 'Butternut squash', cm: '27', notes: 'Brain and nervous system maturing' },
  30: { size: 'Cabbage', cm: '27.8', notes: 'Baby responds to light' },
  31: { size: 'Coconut', cm: '28.3', notes: 'Toenails forming' },
  32: { size: 'Jicama', cm: '29.3', notes: 'Skin becoming smoother' },
  33: { size: 'Pineapple', cm: '30.3', notes: 'Bones hardening' },
  34: { size: 'Butternut squash', cm: '31.9', notes: 'Pupils dilating and constricting' },
  35: { size: 'Cantaloupe', cm: '32.7', notes: 'Baby putting on final weight' },
  36: { size: 'Romaine lettuce', cm: '33.6', notes: 'Lungs fully developed' },
  37: { size: 'Winter melon', cm: '34.3', notes: 'Baby is full term' },
  38: { size: 'Leek', cm: '35.2', notes: 'Ready for delivery' },
  39: { size: 'Watermelon', cm: '35.8', notes: 'Baby could arrive anytime' },
  40: { size: 'Watermelon', cm: '36.4', notes: 'Due date!' },
};

export default function BabyDueDateCountdown() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(new Date());
  const [useLMP, setUseLMP] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [lmp, setLMP] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Default due date to 270 days from now
    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 270);
    setDueDate(defaultDue.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLMPChange = (e) => {
    setLMP(e.target.value);
    if (e.target.value) {
      // Calculate due date as LMP + 280 days
      const [year, month, day] = e.target.value.split('-').map(Number);
      const lmpDate = new Date(year, month - 1, day);
      const due = new Date(lmpDate);
      due.setDate(due.getDate() + 280);
      setDueDate(due.toISOString().split('T')[0]);
    }
  };

  const countdown = useMemo(() => {
    if (!showCountdown || !dueDate) return null;

    const [year, month, day] = dueDate.split('-').map(Number);
    const due = new Date(year, month - 1, day, 0, 0, 0);

    const distance = due - now;

    if (distance <= 0) {
      return { isPast: true };
    }

    const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Calculate weeks and days pregnant
    let startDate = due;
    if (useLMP && lmp) {
      const [lmpYear, lmpMonth, lmpDay] = lmp.split('-').map(Number);
      startDate = new Date(lmpYear, lmpMonth - 1, lmpDay);
    } else {
      // Assume due date is 40 weeks
      startDate = new Date(due);
      startDate.setDate(startDate.getDate() - 280);
    }

    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const weeksPassed = Math.floor(daysPassed / 7);
    const dayOfWeekPassed = daysPassed % 7;

    // Determine trimester
    let trimester = 1;
    let trimesterLabel = '1st Trimester';
    if (weeksPassed > 12) {
      trimester = 2;
      trimesterLabel = '2nd Trimester';
    }
    if (weeksPassed > 27) {
      trimester = 3;
      trimesterLabel = '3rd Trimester';
    }

    // Get baby size
    const babySize = babySizeByWeek[weeksPassed] || babySizeByWeek[40];

    // Calculate progress percentage
    const progress = Math.min(100, (daysPassed / 280) * 100);

    // Milestone dates
    const scan12Week = new Date(startDate);
    scan12Week.setDate(scan12Week.getDate() + 84); // 12 weeks
    const scan20Week = new Date(startDate);
    scan20Week.setDate(scan20Week.getDate() + 140); // 20 weeks
    const trimester3Start = new Date(startDate);
    trimester3Start.setDate(trimester3Start.getDate() + 189); // 27 weeks

    return {
      totalDays, hours, minutes, seconds, distance, isPast: false,
      weeksPassed, dayOfWeekPassed, trimester, trimesterLabel, babySize,
      progress, daysPassed,
      dueDateFormatted: due.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      scan12WeekDays: Math.max(0, Math.floor((scan12Week - now) / (1000 * 60 * 60 * 24))),
      scan20WeekDays: Math.max(0, Math.floor((scan20Week - now) / (1000 * 60 * 60 * 24))),
      trimester3Days: Math.max(0, Math.floor((trimester3Start - now) / (1000 * 60 * 60 * 24))),
    };
  }, [now, dueDate, useLMP, lmp, showCountdown]);

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
        <h3 className="text-text-primary font-semibold">Track Your Pregnancy</h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={!useLMP}
              onChange={() => setUseLMP(false)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary">Due Date</span>
          </label>
          {!useLMP && (
            <Input
              label=""
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={useLMP}
              onChange={() => setUseLMP(true)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-primary">Last Menstrual Period (LMP)</span>
          </label>
          {useLMP && (
            <Input
              label=""
              type="date"
              value={lmp}
              onChange={handleLMPChange}
              helper="Due date will be calculated as LMP + 280 days"
            />
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => setShowCountdown(true)}
          className="w-full"
        >
          Show Pregnancy Timeline
        </Button>
      </div>

      {countdown && !countdown.isPast ? (
        <>
          {/* Main Display */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-300 rounded-lg p-8 text-center space-y-6">
            <div className="text-5xl">👶</div>
            <h2 className="text-3xl font-bold text-text-primary">Due Date</h2>
            <p className="text-lg text-text-secondary">{countdown.dueDateFormatted}</p>

            {/* Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Weeks', value: countdown.totalDays > 7 ? Math.floor(countdown.totalDays / 7) : 0 },
                { label: 'Days', value: countdown.totalDays % 7 },
                { label: 'Hours', value: countdown.hours.toString().padStart(2, '0') },
                { label: 'Minutes', value: countdown.minutes.toString().padStart(2, '0') },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 sm:p-4 border border-rose-100">
                  <p className="font-mono-num text-2xl sm:text-3xl font-bold text-rose-600">
                    {item.value}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Weeks Pregnant Display */}
            <div className="bg-white rounded-lg p-6 border border-rose-200">
              <p className="text-text-muted text-sm mb-2">Weeks & Days Pregnant</p>
              <p className="font-mono-num text-4xl font-bold text-rose-600">
                {countdown.weeksPassed}w {countdown.dayOfWeekPassed}d
              </p>
            </div>
          </div>

          {/* Trimester & Baby Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs sm:text-sm mb-1">Current Trimester</p>
              <p className="text-lg font-bold text-emerald-600">{countdown.trimesterLabel}</p>
              <p className="text-xs text-text-muted mt-1">Trimester {countdown.trimester} of 3</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs sm:text-sm mb-1">Baby Size</p>
              <p className="text-2xl font-bold text-purple-600">{countdown.babySize.size}</p>
              <p className="text-xs text-text-muted mt-1">~{countdown.babySize.cm} cm</p>
            </div>
          </div>

          {/* Baby Development Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-text-muted text-xs mb-1">Baby Update</p>
            <p className="text-text-secondary text-sm">{countdown.babySize.notes}</p>
          </div>

          {/* Pregnancy Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-text-primary font-semibold">Pregnancy Progress</h3>
              <span className="text-text-muted text-sm">{countdown.progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                style={{ width: `${countdown.progress}%` }}
              />
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-4">Upcoming Milestones</h3>
            <div className="space-y-3">
              {[
                { label: '12-week scan', daysUntil: countdown.scan12WeekDays, active: countdown.scan12WeekDays >= 0 },
                { label: '20-week scan', daysUntil: countdown.scan20WeekDays, active: countdown.scan20WeekDays >= 0 },
                { label: 'Third trimester starts', daysUntil: countdown.trimester3Days, active: countdown.trimester3Days >= 0 },
                { label: 'Due date', daysUntil: countdown.totalDays, active: true },
              ].map((milestone) => (
                <div key={milestone.label} className={`flex justify-between py-2 border-b border-border last:border-b-0 ${!milestone.active ? 'opacity-50' : ''}`}>
                  <span className="text-text-secondary">{milestone.label}</span>
                  <span className="font-mono-num font-semibold text-text-primary">
                    {milestone.daysUntil > 0 ? `${milestone.daysUntil} days` : 'Done!'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pregnancy Info */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
            <p className="text-text-secondary text-sm">
              You are <span className="font-semibold">{countdown.weeksPassed} weeks and {countdown.dayOfWeekPassed} days pregnant</span>.
              Your baby is approximately the size of a <span className="font-semibold">{countdown.babySize.size}</span> and your little one will be here in just <span className="font-semibold">{countdown.totalDays} days!</span>
            </p>
          </div>
        </>
      ) : countdown && countdown.isPast ? (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-400 rounded-lg p-8 text-center space-y-4">
          <div className="text-5xl">👶💕</div>
          <h2 className="text-3xl font-bold text-pink-700">Baby Has Arrived!</h2>
          <p className="text-lg text-text-secondary">Congratulations on your new bundle of joy!</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg p-6 text-center">
          <p className="text-text-secondary">Enter your due date or LMP to start tracking your pregnancy</p>
        </div>
      )}
    </div>
  );
}
