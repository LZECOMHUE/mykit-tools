'use client';

import { useState, useRef } from 'react';

export default function CookingTimer() {
  const [timers, setTimers] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newMinutes, setNewMinutes] = useState(5);
  const [newSeconds, setNewSeconds] = useState(0);
  const audioRef = useRef(null);

  const addTimer = () => {
    if (newMinutes > 0 || newSeconds > 0) {
      setTimers([
        ...timers,
        {
          id: Date.now(),
          label: newLabel || `Timer ${timers.length + 1}`,
          totalSeconds: newMinutes * 60 + newSeconds,
          remainingSeconds: newMinutes * 60 + newSeconds,
          isActive: false,
        },
      ]);
      setNewLabel('');
      setNewMinutes(5);
      setNewSeconds(0);
    }
  };

  const toggleTimer = (id) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, isActive: !timer.isActive } : timer
      )
    );
  };

  const removeTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const resetTimer = (id) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id
          ? { ...timer, remainingSeconds: timer.totalSeconds, isActive: false }
          : timer
      )
    );
  };

  // Simple timer update logic (in production would use useEffect)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Add New Timer
        </h3>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Label
          </label>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g., Pasta, Rice, Vegetables"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Minutes
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={newMinutes}
              onChange={(e) => setNewMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Seconds
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={newSeconds}
              onChange={(e) => setNewSeconds(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <button
          onClick={addTimer}
          className="w-full px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
        >
          Add Timer
        </button>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Active Timers
        </h3>

        {timers.length === 0 ? (
          <p className="text-center text-text-secondary py-4">No timers yet</p>
        ) : (
          <div className="space-y-3">
            {timers.map((timer) => (
              <div
                key={timer.id}
                className="bg-surface rounded-[var(--radius-input)] p-4 border border-border"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-text-primary">{timer.label}</h4>
                  <button
                    onClick={() => removeTimer(timer.id)}
                    className="text-error hover:bg-red-100 px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-3xl md:text-4xl font-mono font-bold text-accent text-center mb-4">
                  {formatTime(timer.remainingSeconds)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTimer(timer.id)}
                    className="flex-1 px-3 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium text-sm hover:bg-blue-700"
                  >
                    {timer.isActive ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={() => resetTimer(timer.id)}
                    className="flex-1 px-3 py-2 border border-border text-text-primary rounded-[var(--radius-input)] font-medium text-sm hover:bg-surface"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Note: Timers do not continue if you close this page. Keep the page open while timing.
      </p>
    </div>
  );
}
