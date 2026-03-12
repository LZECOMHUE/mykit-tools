'use client';

import { useState, useMemo, useEffect } from 'react';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState(null);

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampResults = useMemo(() => {
    if (!timestamp) return null;

    const ts = parseInt(timestamp);
    if (isNaN(ts)) return null;

    const date = new Date(ts * 1000);

    // Local timezone
    const localString = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    // UTC
    const utcString = date.toUTCString();

    // ISO format
    const isoString = date.toISOString();

    return {
      localString,
      utcString,
      isoString,
      timestamp: ts,
    };
  }, [timestamp]);

  const dateTimeResults = useMemo(() => {
    if (!dateTimeInput || !dateInput) return null;

    const [hours, mins] = dateTimeInput.split(':').map(Number);
    if (isNaN(hours) || isNaN(mins)) return null;

    const date = new Date(dateInput);
    date.setHours(hours, mins, 0, 0);

    const unixTimestamp = Math.floor(date.getTime() / 1000);

    return {
      timestamp: unixTimestamp,
      display: date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    };
  }, [dateTimeInput, dateInput]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      {/* Two-way converter tabs */}
      <div className="space-y-3">
        {/* Timestamp to Date */}
        <div className="rounded-[var(--radius-card)] bg-white border border-border p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Unix Timestamp → Date</h3>

          <div className="mb-4">
            <label htmlFor="timestamp" className="block text-sm font-medium text-text-primary mb-2">
              Enter Timestamp (seconds)
            </label>
            <input
              id="timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="e.g., 1704067200"
              className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {timestampResults && (
            <div className="space-y-3">
              <div className="rounded-[var(--radius-card)] bg-surface p-3">
                <p className="text-xs text-text-muted font-medium mb-2">Local Time</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono-num font-medium text-text-primary">
                    {timestampResults.localString}
                  </p>
                  <button
                    onClick={() => handleCopy(timestampResults.localString, 'local')}
                    className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {copied === 'local' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] bg-surface p-3">
                <p className="text-xs text-text-muted font-medium mb-2">UTC Time</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono-num text-xs font-medium text-text-primary">
                    {timestampResults.utcString}
                  </p>
                  <button
                    onClick={() => handleCopy(timestampResults.utcString, 'utc')}
                    className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {copied === 'utc' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] bg-surface p-3">
                <p className="text-xs text-text-muted font-medium mb-2">ISO Format</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono-num text-xs font-medium text-text-primary">
                    {timestampResults.isoString}
                  </p>
                  <button
                    onClick={() => handleCopy(timestampResults.isoString, 'iso')}
                    className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {copied === 'iso' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="rounded-[var(--radius-card)] bg-white border border-border p-6">
          <h3 className="text-sm font-medium text-text-primary mb-4">Date → Unix Timestamp</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dateInput" className="block text-sm font-medium text-text-primary mb-2">
                Date
              </label>
              <input
                id="dateInput"
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="dateTimeInput" className="block text-sm font-medium text-text-primary mb-2">
                Time
              </label>
              <input
                id="dateTimeInput"
                type="time"
                value={dateTimeInput}
                onChange={(e) => setDateTimeInput(e.target.value)}
                className="w-full rounded-[var(--radius-input)] border border-border bg-white px-4 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {dateTimeResults && (
            <div className="space-y-3">
              <div className="rounded-[var(--radius-card)] bg-surface p-3">
                <p className="text-xs text-text-muted font-medium mb-2">Date & Time</p>
                <p className="text-sm text-text-primary mb-3">{dateTimeResults.display}</p>
              </div>

              <div className="rounded-[var(--radius-card)] bg-surface p-3">
                <p className="text-xs text-text-muted font-medium mb-2">Unix Timestamp</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono-num font-bold text-accent text-lg">
                    {dateTimeResults.timestamp}
                  </p>
                  <button
                    onClick={() => handleCopy(dateTimeResults.timestamp.toString(), 'datetime')}
                    className="text-xs px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {copied === 'datetime' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Timestamp */}
      <div className="rounded-[var(--radius-card)] bg-accent/10 border border-accent/20 p-6">
        <h3 className="text-sm font-medium text-text-primary mb-4">Current Timestamp (Live)</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">Right now:</p>
            <p className="font-mono-num font-bold text-accent text-lg">
              {currentTimestamp}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">Local time:</p>
            <p className="text-sm text-text-primary">{currentDateString}</p>
          </div>
          <button
            onClick={() => handleCopy(currentTimestamp.toString(), 'current')}
            className="w-full mt-3 rounded-[var(--radius-input)] bg-accent text-white px-4 py-2 font-medium hover:opacity-90 transition-opacity"
          >
            {copied === 'current' ? '✓ Copied Current Timestamp' : 'Copy Current Timestamp'}
          </button>
        </div>
      </div>
    </div>
  );
}
