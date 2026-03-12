'use client';

import { useState } from 'react';

export default function TimeCalculator() {
  // Mode state
  const [mode, setMode] = useState('add-subtract');

  // Add/Subtract mode state
  const [entries, setEntries] = useState([
    { id: 1, operation: '+', hours: '', minutes: '', seconds: '' },
    { id: 2, operation: '+', hours: '', minutes: '', seconds: '' },
  ]);
  const [nextId, setNextId] = useState(3);

  // Time Between mode state
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [crossesMidnight, setCrossesMidnight] = useState(false);

  // Calculate total time from entries
  const calculateTotal = () => {
    let totalSeconds = 0;
    entries.forEach((entry) => {
      const hours = parseInt(entry.hours) || 0;
      const minutes = parseInt(entry.minutes) || 0;
      const seconds = parseInt(entry.seconds) || 0;
      const entrySeconds = hours * 3600 + minutes * 60 + seconds;
      totalSeconds += entry.operation === '+' ? entrySeconds : -entrySeconds;
    });
    return Math.max(0, totalSeconds);
  };

  // Calculate time difference
  const calculateTimeBetween = () => {
    if (!startTime || !endTime) return 0;

    const parseTime24h = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 3600 + (minutes || 0) * 60;
    };

    const parse12h = (timeStr) => {
      const match = timeStr.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)?$/);
      if (!match) return 0;
      let [, hours, minutes, ampm] = match;
      hours = parseInt(hours);
      minutes = parseInt(minutes) || 0;

      if (ampm) {
        const isPM = ampm.toUpperCase() === 'PM';
        if (hours === 12) {
          hours = isPM ? 12 : 0;
        } else {
          hours = isPM ? hours + 12 : hours;
        }
      }

      return hours * 3600 + minutes * 60;
    };

    const parse = timeFormat === '24h' ? parseTime24h : parse12h;
    let startSecs = parse(startTime);
    let endSecs = parse(endTime);

    if (crossesMidnight && endSecs < startSecs) {
      endSecs += 24 * 3600;
    }

    return Math.max(0, endSecs - startSecs);
  };

  const totalSeconds =
    mode === 'add-subtract' ? calculateTotal() : calculateTimeBetween();

  const formatTimeDisplay = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return {
      hhmmss: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      decimalHours: (totalSecs / 3600).toFixed(2),
      totalMinutes: Math.floor(totalSecs / 60),
      totalSeconds: totalSecs,
    };
  };

  const display = formatTimeDisplay(totalSeconds);

  // Handlers
  const handleAddRow = () => {
    setEntries([
      ...entries,
      { id: nextId, operation: '+', hours: '', minutes: '', seconds: '' },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveRow = (id) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleClearAll = () => {
    setEntries([
      { id: 1, operation: '+', hours: '', minutes: '', seconds: '' },
      { id: 2, operation: '+', hours: '', minutes: '', seconds: '' },
    ]);
    setNextId(3);
  };

  const handleEntryChange = (id, field, value) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleQuickAdd = (amount) => {
    const totalSecs = calculateTotal();
    const newTotalSecs = totalSecs + amount;
    const hours = Math.floor(newTotalSecs / 3600);
    const minutes = Math.floor((newTotalSecs % 3600) / 60);
    const seconds = newTotalSecs % 60;

    setEntries([
      {
        id: nextId,
        operation: '+',
        hours: hours ? String(hours) : '',
        minutes: minutes ? String(minutes) : '',
        seconds: seconds ? String(seconds) : '',
      },
    ]);
    setNextId(nextId + 1);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        <button
          onClick={() => setMode('add-subtract')}
          className={`px-4 py-2 font-medium transition-colors ${
            mode === 'add-subtract'
              ? 'border-b-2 border-accent text-text-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Add & Subtract
        </button>
        <button
          onClick={() => setMode('time-between')}
          className={`px-4 py-2 font-medium transition-colors ${
            mode === 'time-between'
              ? 'border-b-2 border-accent text-text-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Time Between
        </button>
      </div>

      {/* Result Card */}
      <div
        className={`p-6 rounded-[var(--radius-card)] border border-border mb-6 transition-colors ${
          totalSeconds > 0
            ? 'bg-accent bg-opacity-10 border-accent'
            : 'bg-surface'
        }`}
      >
        <div className="mb-4">
          <p className="text-text-muted text-sm mb-1">Total Time</p>
          <p className={`font-mono-num text-4xl font-bold ${
            totalSeconds > 0 ? 'text-accent' : 'text-text-primary'
          }`}>
            {display.hhmmss}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-text-muted text-xs">Decimal Hours</p>
            <p className="font-mono-num text-lg font-semibold text-text-primary">
              {display.decimalHours}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Total Minutes</p>
            <p className="font-mono-num text-lg font-semibold text-text-primary">
              {display.totalMinutes}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Total Seconds</p>
            <p className="font-mono-num text-lg font-semibold text-text-primary">
              {display.totalSeconds}
            </p>
          </div>
        </div>
      </div>

      {/* Add/Subtract Mode */}
      {mode === 'add-subtract' && (
        <>
          {/* Quick Add Presets */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickAdd(15 * 60)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +15 min
            </button>
            <button
              onClick={() => handleQuickAdd(30 * 60)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +30 min
            </button>
            <button
              onClick={() => handleQuickAdd(60 * 60)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +1 hr
            </button>
            <button
              onClick={() => handleQuickAdd(90 * 60)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +1.5 hr
            </button>
            <button
              onClick={() => handleQuickAdd(120 * 60)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +2 hr
            </button>
            <button
              onClick={() => handleQuickAdd(8 * 3600)}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-sm font-medium text-text-primary hover:bg-accent hover:text-white transition-colors"
            >
              +8 hr (workday)
            </button>
          </div>

          {/* Time Entries */}
          <div className="space-y-4 mb-6">
            {entries.map((entry) => (
              <div key={entry.id} className="flex gap-3 items-end">
                {/* Operation Toggle */}
                <div className="flex gap-1 bg-surface rounded-[var(--radius-input)] p-1">
                  <button
                    onClick={() =>
                      handleEntryChange(entry.id, 'operation', '+')
                    }
                    className={`w-10 h-10 rounded font-bold transition-colors ${
                      entry.operation === '+'
                        ? 'bg-accent text-white'
                        : 'bg-transparent text-text-primary hover:bg-border'
                    }`}
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handleEntryChange(entry.id, 'operation', '-')
                    }
                    className={`w-10 h-10 rounded font-bold transition-colors ${
                      entry.operation === '-'
                        ? 'bg-accent text-white'
                        : 'bg-transparent text-text-primary hover:bg-border'
                    }`}
                  >
                    −
                  </button>
                </div>

                {/* Hours Input */}
                <div className="flex-1">
                  <label className="block text-text-muted text-xs mb-1">
                    Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={entry.hours}
                    onChange={(e) =>
                      handleEntryChange(entry.id, 'hours', e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono-num"
                  />
                </div>

                {/* Minutes Input */}
                <div className="flex-1">
                  <label className="block text-text-muted text-xs mb-1">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={entry.minutes}
                    onChange={(e) =>
                      handleEntryChange(entry.id, 'minutes', e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono-num"
                  />
                </div>

                {/* Seconds Input */}
                <div className="flex-1">
                  <label className="block text-text-muted text-xs mb-1">
                    Seconds
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={entry.seconds}
                    onChange={(e) =>
                      handleEntryChange(entry.id, 'seconds', e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono-num"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveRow(entry.id)}
                  disabled={entries.length === 1}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-[var(--radius-input)] text-text-secondary hover:text-error hover:border-error disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddRow}
              className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-accent hover:opacity-90 transition-opacity"
            >
              Add Row
            </button>
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-3 border border-border text-text-primary font-medium rounded-[var(--radius-input)] hover:bg-surface transition-colors"
            >
              Clear All
            </button>
          </div>
        </>
      )}

      {/* Time Between Mode */}
      {mode === 'time-between' && (
        <>
          {/* Format Selection */}
          <div className="mb-6 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="timeFormat"
                value="24h"
                checked={timeFormat === '24h'}
                onChange={(e) => setTimeFormat(e.target.value)}
                className="accent-accent"
              />
              <span className="text-text-primary">24-hour format</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="timeFormat"
                value="12h"
                checked={timeFormat === '12h'}
                onChange={(e) => setTimeFormat(e.target.value)}
                className="accent-accent"
              />
              <span className="text-text-primary">12-hour format (AM/PM)</span>
            </label>
          </div>

          {/* Time Inputs */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Start Time
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder={timeFormat === '24h' ? 'HH:MM' : 'HH:MM AM/PM'}
                className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono-num text-lg"
              />
              <p className="text-text-muted text-xs mt-2">
                {timeFormat === '24h'
                  ? 'Enter time as HH:MM (e.g., 14:30)'
                  : 'Enter time as HH:MM AM/PM (e.g., 2:30 PM)'}
              </p>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                End Time
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder={timeFormat === '24h' ? 'HH:MM' : 'HH:MM AM/PM'}
                className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono-num text-lg"
              />
              <p className="text-text-muted text-xs mt-2">
                {timeFormat === '24h'
                  ? 'Enter time as HH:MM (e.g., 17:45)'
                  : 'Enter time as HH:MM AM/PM (e.g., 5:45 PM)'}
              </p>
            </div>
          </div>

          {/* Crosses Midnight Toggle */}
          <label className="flex items-center gap-3 mb-6 cursor-pointer p-3 bg-surface rounded-[var(--radius-input)] border border-border">
            <input
              type="checkbox"
              checked={crossesMidnight}
              onChange={(e) => setCrossesMidnight(e.target.checked)}
              className="w-5 h-5 accent-accent rounded cursor-pointer"
            />
            <span className="text-text-primary font-medium">
              End time is next day (crosses midnight)
            </span>
          </label>
        </>
      )}
    </div>
  );
}
