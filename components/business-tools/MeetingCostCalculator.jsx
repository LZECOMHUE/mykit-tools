'use client';

import { useState, useMemo, useEffect } from 'react';

export default function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Person 1', hourlyRate: 30 },
    { id: 2, name: 'Person 2', hourlyRate: 25 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [meetingMinutes, setMeetingMinutes] = useState(60);
  const [startTime, setStartTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMeetingMinutes((prev) => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isRunning]);

  const costs = useMemo(() => {
    const hours = meetingMinutes / 60;
    let totalCost = 0;
    const attendeeCosts = attendees.map((a) => {
      const cost = a.hourlyRate * hours;
      totalCost += cost;
      return {
        ...a,
        cost,
      };
    });

    const avgHourlyRate = attendees.length > 0 ? attendees.reduce((sum, a) => sum + a.hourlyRate, 0) / attendees.length : 0;
    const costPerMinute = totalCost / meetingMinutes;

    return {
      attendeeCosts,
      totalCost,
      costPerMinute,
      avgHourlyRate,
      meetingHours: hours,
    };
  }, [attendees, meetingMinutes]);

  const addAttendee = () => {
    setAttendees([
      ...attendees,
      { id: nextId, name: `Person ${nextId}`, hourlyRate: 25 },
    ]);
    setNextId(nextId + 1);
  };

  const removeAttendee = (id) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter((a) => a.id !== id));
    }
  };

  const updateAttendee = (id, field, value) => {
    setAttendees(
      attendees.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  const hours = Math.floor(meetingMinutes / 60);
  const minutes = meetingMinutes % 60;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      {/* Live Cost Display */}
      <div className="bg-error/10 border-2 border-error rounded-[var(--radius-card)] p-6 text-center space-y-3">
        <p className="text-text-secondary text-sm">This meeting has cost</p>
        <p className="font-mono-num text-5xl font-bold text-error">{fmt(costs.totalCost)}</p>
        <p className="text-text-secondary text-sm">
          {hours}h {minutes}m | {fmt(costs.costPerMinute)}/min | {attendees.length} attendees
        </p>
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded-[var(--radius-input)] font-medium text-white transition-colors ${
              isRunning ? 'bg-error hover:bg-red-700' : 'bg-accent hover:bg-blue-700'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Start Timer'}
          </button>
          <button
            onClick={() => setMeetingMinutes(0)}
            className="px-6 py-2 rounded-[var(--radius-input)] font-medium bg-white border border-border text-text-primary hover:bg-surface transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Duration Control */}
      <div className="space-y-3 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <label className="block text-text-secondary text-sm font-medium">Meeting Duration</label>
        <div className="flex gap-3">
          <input
            type="number"
            value={hours}
            onChange={(e) => setMeetingMinutes(parseInt(e.target.value) * 60 + minutes)}
            placeholder="Hours"
            className="flex-1 px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMeetingMinutes(hours * 60 + parseInt(e.target.value))}
            placeholder="Minutes"
            min="0"
            max="59"
            className="flex-1 px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Attendees */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">Attendees & Rates</h3>
          <span className="text-text-secondary text-xs">Avg: {fmt(costs.avgHourlyRate)}/hr</span>
        </div>

        <div className="space-y-2">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="flex gap-2 items-end">
              <input
                type="text"
                value={attendee.name}
                onChange={(e) => updateAttendee(attendee.id, 'name', e.target.value)}
                placeholder="Name"
                className="flex-1 px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
              <div className="w-32">
                <label className="block text-text-secondary text-xs mb-1 font-medium">Hourly Rate</label>
                <div className="flex items-center">
                  <span className="text-text-secondary mr-2">£</span>
                  <input
                    type="number"
                    value={attendee.hourlyRate}
                    onChange={(e) => updateAttendee(attendee.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    step="5"
                    className="flex-1 px-3 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                  <span className="text-text-secondary ml-2 text-xs">/hr</span>
                </div>
              </div>
              {attendees.length > 1 && (
                <button
                  onClick={() => removeAttendee(attendee.id)}
                  className="px-3 py-3 text-error hover:bg-error/10 rounded-[var(--radius-input)] font-medium transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addAttendee}
          className="w-full px-6 py-3 border-2 border-dashed border-border text-text-secondary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
        >
          + Add Attendee
        </button>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
        <h4 className="text-text-primary font-semibold">Cost Breakdown</h4>
        <div className="space-y-2">
          {costs.attendeeCosts.map((a) => (
            <div key={a.id} className="flex justify-between items-center py-2 px-3 border-b border-border last:border-b-0">
              <div>
                <p className="text-text-primary font-medium">{a.name}</p>
                <p className="text-text-secondary text-xs">{fmt(a.hourlyRate)}/hour</p>
              </div>
              <p className="font-mono-num font-bold text-text-primary">{fmt(a.cost)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center py-3 px-3 bg-white rounded-[var(--radius-input)] border border-border font-bold border-t-2 mt-2">
            <span className="text-text-primary">Total</span>
            <span className="font-mono-num text-error">{fmt(costs.totalCost)}</span>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 text-center">
          <p className="text-text-secondary text-xs mb-1">Per Person</p>
          <p className="font-mono-num text-xl font-bold text-text-primary">
            {fmt(costs.totalCost / attendees.length)}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 text-center">
          <p className="text-text-secondary text-xs mb-1">Per Minute</p>
          <p className="font-mono-num text-xl font-bold text-text-primary">
            {fmt(costs.costPerMinute)}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 text-center">
          <p className="text-text-secondary text-xs mb-1">Per Hour</p>
          <p className="font-mono-num text-xl font-bold text-text-primary">
            {fmt(costs.avgHourlyRate * attendees.length)}
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-4 text-sm text-text-secondary space-y-2">
        <p className="font-medium text-text-primary">💡 Meeting Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Have an agenda — every minute wasted costs real money</li>
          <li>Keep meetings short: 30 mins is often better than 60</li>
          <li>Invite only essential attendees</li>
          <li>Can this be an email instead?</li>
        </ul>
      </div>
    </div>
  );
}
