'use client';

import { useState, useMemo } from 'react';

const SLEEP_CYCLE_DURATION = 90; // minutes
const FALL_ASLEEP_TIME = 15; // minutes

export default function SleepCalculator() {
  const [mode, setMode] = useState('wakeup'); // 'wakeup' or 'bedtime'
  const [targetTime, setTargetTime] = useState('07:00');

  const results = useMemo(() => {
    if (!targetTime) return null;

    const [hours, mins] = targetTime.split(':').map(Number);
    const targetMinutes = hours * 60 + mins;

    const options = [];

    for (let cycles = 3; cycles <= 6; cycles++) {
      const totalSleepMins = cycles * SLEEP_CYCLE_DURATION + FALL_ASLEEP_TIME;

      if (mode === 'wakeup') {
        // Calculate bedtime
        const bedtimeMinutes = (targetMinutes - totalSleepMins + 24 * 60) % (24 * 60);
        const bedHours = Math.floor(bedtimeMinutes / 60);
        const bedMins = bedtimeMinutes % 60;

        let status;
        if (cycles === 6) status = 'optimal';
        else if (cycles === 5) status = 'good';
        else if (cycles === 4) status = 'fair';
        else status = 'minimal';

        options.push({
          cycles,
          time: `${bedHours.toString().padStart(2, '0')}:${bedMins.toString().padStart(2, '0')}`,
          totalMins: totalSleepMins,
          status,
        });
      } else {
        // Calculate wake time
        const wakeMinutes = (targetMinutes + totalSleepMins) % (24 * 60);
        const wakeHours = Math.floor(wakeMinutes / 60);
        const wakeMins = wakeMinutes % 60;

        let status;
        if (cycles === 6) status = 'optimal';
        else if (cycles === 5) status = 'good';
        else if (cycles === 4) status = 'fair';
        else status = 'minimal';

        options.push({
          cycles,
          time: `${wakeHours.toString().padStart(2, '0')}:${wakeMins.toString().padStart(2, '0')}`,
          totalMins: totalSleepMins,
          status,
        });
      }
    }

    return options;
  }, [targetTime, mode]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-50 border-green-200';
      case 'good':
        return 'bg-green-50 border-green-200';
      case 'fair':
        return 'bg-amber-50 border-amber-200';
      case 'minimal':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-white border-border';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'optimal':
      case 'good':
        return 'text-green-700';
      case 'fair':
        return 'text-amber-700';
      case 'minimal':
        return 'text-red-700';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'optimal':
        return '✓ Optimal (6 cycles)';
      case 'good':
        return '✓ Good (5 cycles)';
      case 'fair':
        return '⚠ Fair (4 cycles)';
      case 'minimal':
        return '✗ Minimal (3 cycles)';
      default:
        return '';
    }
  };

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('wakeup')}
          className={`flex-1 rounded-[var(--radius-input)] px-4 py-2 font-medium transition-colors ${
            mode === 'wakeup'
              ? 'bg-accent text-white'
              : 'border border-border bg-white text-text-secondary hover:text-text-primary'
          }`}
        >
          I need to wake at...
        </button>
        <button
          onClick={() => setMode('bedtime')}
          className={`flex-1 rounded-[var(--radius-input)] px-4 py-2 font-medium transition-colors ${
            mode === 'bedtime'
              ? 'bg-accent text-white'
              : 'border border-border bg-white text-text-secondary hover:text-text-primary'
          }`}
        >
          I'm going to bed at...
        </button>
      </div>

      {/* Time Input */}
      <div>
        <label htmlFor="targetTime" className="block text-sm font-medium text-text-primary mb-2">
          {mode === 'wakeup' ? 'Wake-Up Time' : 'Bedtime'}
        </label>
        <input
          id="targetTime"
          type="time"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Info Banner */}
      <div className="rounded-[var(--radius-card)] bg-accent/10 border border-accent/20 p-4">
        <p className="text-sm text-text-primary">
          Based on {SLEEP_CYCLE_DURATION}-minute sleep cycles ({FALL_ASLEEP_TIME} min to fall asleep)
        </p>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-3">
          {results.map((option) => (
            <div
              key={option.cycles}
              className={`rounded-[var(--radius-card)] border p-4 ${getStatusColor(option.status)}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-mono-num font-bold ${getStatusTextColor(option.status)}`}>
                    {option.time}
                  </p>
                  <p className={`text-xs font-medium mt-1 ${getStatusTextColor(option.status)}`}>
                    {getStatusLabel(option.status)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">
                    {Math.floor(option.totalMins / 60)}h {option.totalMins % 60}m
                  </p>
                  <p className={`text-xs font-medium mt-1 ${getStatusTextColor(option.status)}`}>
                    {option.cycles} {option.cycles === 1 ? 'cycle' : 'cycles'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="rounded-[var(--radius-card)] bg-white border border-border p-4 space-y-3">
        <p className="text-sm font-medium text-text-primary">💡 Sleep Tips</p>
        <ul className="space-y-2 text-xs text-text-secondary">
          <li>• Aim for 5-6 complete cycles for best rest</li>
          <li>• One 90-minute cycle includes all sleep stages</li>
          <li>• 4 cycles is the minimum for feeling rested</li>
          <li>• Less than 3 cycles may cause grogginess</li>
          <li>• Keep your bedtime and wake time consistent</li>
        </ul>
      </div>
    </div>
  );
}
