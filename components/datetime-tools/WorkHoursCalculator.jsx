'use client';

import { useState, useMemo } from 'react';

export default function WorkHoursCalculator() {
  const [mode, setMode] = useState('daily'); // 'daily' or 'weekly'
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakDuration, setBreakDuration] = useState('30');
  const [weeklyHours, setWeeklyHours] = useState({
    monday: 8,
    tuesday: 8,
    wednesday: 8,
    thursday: 8,
    friday: 8,
  });

  const dailyResults = useMemo(() => {
    if (mode !== 'daily' || !startTime || !endTime) return null;

    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);

    const startTotalMins = startHours * 60 + startMins;
    const endTotalMins = endHours * 60 + endMins;

    const diffMins = endTotalMins - startTotalMins;
    if (diffMins < 0) return null;

    const workMins = diffMins - parseInt(breakDuration);
    const decimalHours = parseFloat((workMins / 60).toFixed(2));
    const hours = Math.floor(workMins / 60);
    const mins = workMins % 60;

    const hhmmFormat = `${hours}:${mins.toString().padStart(2, '0')}`;
    const weeklyTotal = decimalHours * 5;
    const monthlyEstimate = weeklyTotal * 4.33;
    const overtime = weeklyTotal > 40 ? weeklyTotal - 40 : 0;

    return {
      decimalHours,
      hhmmFormat,
      weeklyTotal: parseFloat(weeklyTotal.toFixed(2)),
      monthlyEstimate: parseFloat(monthlyEstimate.toFixed(2)),
      overtime: parseFloat(overtime.toFixed(2)),
      weeklyOvertimePercentage: weeklyTotal > 40,
    };
  }, [mode, startTime, endTime, breakDuration]);

  const weeklyResults = useMemo(() => {
    if (mode !== 'weekly') return null;

    const hours = Object.values(weeklyHours).reduce((a, b) => a + b, 0);
    const monthlyEstimate = hours * 4.33;
    const overtime = hours > 40 ? hours - 40 : 0;

    return {
      total: parseFloat(hours.toFixed(2)),
      monthlyEstimate: parseFloat(monthlyEstimate.toFixed(2)),
      overtime: parseFloat(overtime.toFixed(2)),
      isOvertime: hours > 40,
    };
  }, [mode, weeklyHours]);

  const handleWeeklyChange = (day, value) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('daily')}
          className={`flex-1 rounded-[var(--radius-input)] px-4 py-2 font-medium transition-colors ${
            mode === 'daily'
              ? 'bg-accent text-white'
              : 'border border-border bg-white text-text-secondary hover:text-text-primary'
          }`}
        >
          Daily Mode
        </button>
        <button
          onClick={() => setMode('weekly')}
          className={`flex-1 rounded-[var(--radius-input)] px-4 py-2 font-medium transition-colors ${
            mode === 'weekly'
              ? 'bg-accent text-white'
              : 'border border-border bg-white text-text-secondary hover:text-text-primary'
          }`}
        >
          Weekly Mode
        </button>
      </div>

      {mode === 'daily' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-text-primary mb-2">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-text-primary mb-2">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="breakDuration" className="block text-sm font-medium text-text-primary mb-2">
              Break Duration (minutes)
            </label>
            <input
              id="breakDuration"
              type="number"
              min="0"
              value={breakDuration}
              onChange={(e) => setBreakDuration(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {dailyResults && (
            <div className="space-y-4">
              {/* Daily Hours */}
              <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                <p className="text-text-muted text-sm font-medium mb-3">Daily Work Hours</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Decimal Format</span>
                    <span className="font-mono-num text-2xl font-bold text-accent">
                      {dailyResults.decimalHours} hrs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">HH:MM Format</span>
                    <span className="font-mono-num text-xl font-bold text-text-primary">
                      {dailyResults.hhmmFormat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weekly & Monthly */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                  <p className="text-text-muted text-xs font-medium uppercase">Weekly Total</p>
                  <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                    {dailyResults.weeklyTotal}
                  </p>
                  <p className="text-xs text-text-muted mt-1">hrs (Mon-Fri)</p>
                </div>
                <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                  <p className="text-text-muted text-xs font-medium uppercase">Monthly Est.</p>
                  <p className="text-2xl font-mono-num font-bold text-text-primary mt-2">
                    {dailyResults.monthlyEstimate}
                  </p>
                  <p className="text-xs text-text-muted mt-1">hrs/month</p>
                </div>
              </div>

              {/* Overtime */}
              {dailyResults.weeklyOvertimePercentage && (
                <div className="rounded-[var(--radius-card)] bg-amber-50 border border-amber-200 p-4">
                  <p className="text-text-muted text-sm font-medium mb-1">Overtime Alert</p>
                  <p className="font-mono-num text-xl font-bold text-amber-600">
                    +{dailyResults.overtime} hrs/week
                  </p>
                  <p className="text-xs text-amber-700 mt-1">Over 40 hours per week</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'weekly' && (
        <div className="space-y-4">
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
            <div key={day}>
              <label
                htmlFor={day}
                className="block text-sm font-medium text-text-primary capitalize mb-2"
              >
                {day}
              </label>
              <input
                id={day}
                type="number"
                min="0"
                step="0.5"
                value={weeklyHours[day]}
                onChange={(e) => handleWeeklyChange(day, e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          ))}

          {weeklyResults && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Weekly Total */}
              <div className="rounded-[var(--radius-card)] bg-white border border-border p-4">
                <p className="text-text-muted text-sm font-medium mb-3">Weekly Summary</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Total Hours</span>
                    <span className="font-mono-num text-2xl font-bold text-accent">
                      {weeklyResults.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Monthly Est.</span>
                    <span className="font-mono-num text-xl font-bold text-text-primary">
                      {weeklyResults.monthlyEstimate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Overtime */}
              {weeklyResults.isOvertime && (
                <div className="rounded-[var(--radius-card)] bg-amber-50 border border-amber-200 p-4">
                  <p className="text-text-muted text-sm font-medium mb-1">Overtime Alert</p>
                  <p className="font-mono-num text-xl font-bold text-amber-600">
                    +{weeklyResults.overtime} hrs
                  </p>
                  <p className="text-xs text-amber-700 mt-1">Over 40 hours per week</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
