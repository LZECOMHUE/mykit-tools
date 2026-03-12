'use client';

import { useState, useMemo } from 'react';

const destinationCosts = {
  Thailand: { budget: 30, mid: 60, luxury: 150 },
  Vietnam: { budget: 25, mid: 50, luxury: 120 },
  Mexico: { budget: 35, mid: 65, luxury: 150 },
  Portugal: { budget: 40, mid: 75, luxury: 180 },
  Spain: { budget: 45, mid: 80, luxury: 200 },
  Italy: { budget: 50, mid: 90, luxury: 220 },
  Greece: { budget: 45, mid: 85, luxury: 200 },
  Japan: { budget: 60, mid: 100, luxury: 250 },
  Indonesia: { budget: 25, mid: 50, luxury: 120 },
  Philippines: { budget: 20, mid: 45, luxury: 100 },
  India: { budget: 20, mid: 40, luxury: 100 },
  Turkey: { budget: 30, mid: 60, luxury: 150 },
};

export default function TravelBudgetCalculator() {
  const [destination, setDestination] = useState('Thailand');
  const [duration, setDuration] = useState(7);
  const [style, setStyle] = useState('mid');
  const [transport, setTransport] = useState(200);
  const [customDaily, setCustomDaily] = useState('');

  const dailyRate = customDaily ? parseFloat(customDaily) : destinationCosts[destination]?.[style] || 50;

  const budget = useMemo(() => {
    const accommodation = dailyRate * 0.4;
    const food = dailyRate * 0.35;
    const activities = dailyRate * 0.15;
    const other = dailyRate * 0.1;
    const dailyTotal = dailyRate;

    const tripAccommodation = accommodation * duration;
    const tripFood = food * duration;
    const tripActivities = activities * duration;
    const tripOther = other * duration;
    const tripDaily = dailyTotal * duration;
    const total = tripDaily + transport;

    return {
      accommodation,
      food,
      activities,
      other,
      dailyTotal,
      tripAccommodation,
      tripFood,
      tripActivities,
      tripOther,
      tripDaily,
      total,
    };
  }, [dailyRate, duration, transport]);

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      {/* Configuration */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              {Object.keys(destinationCosts).map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Duration (days)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="365"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Travel Style</label>
          <div className="flex gap-2 flex-wrap">
            {['budget', 'mid', 'luxury'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStyle(s);
                  setCustomDaily('');
                }}
                className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors capitalize ${
                  style === s
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {s === 'budget' ? '💰' : s === 'mid' ? '🏨' : '✨'} {s}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-2">
            {style === 'budget' && 'Hostels, local food, basic activities'}
            {style === 'mid' && 'Mid-range hotels, mixed dining, some tours'}
            {style === 'luxury' && 'High-end hotels, fine dining, premium activities'}
          </p>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Transport Cost (flights, transfers)</label>
          <input
            type="number"
            value={transport}
            onChange={(e) => setTransport(parseFloat(e.target.value) || 0)}
            min="0"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Custom Daily Rate (optional)</label>
          <input
            type="number"
            value={customDaily}
            onChange={(e) => setCustomDaily(e.target.value)}
            placeholder={`Leave blank to use ${dailyRate} for ${destination}`}
            min="0"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Total Budget */}
      <div className="bg-accent-muted border-2 border-accent rounded-[var(--radius-card)] p-6 text-center space-y-2">
        <p className="text-text-secondary text-sm">Total Budget</p>
        <p className="font-mono-num text-4xl font-bold text-accent">{fmt(budget.total)}</p>
        <p className="text-text-secondary text-sm">
          {fmt(budget.total / duration)}/day for living expenses
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">Budget Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Daily Accommodation</p>
            <p className="font-mono-num text-lg font-bold text-text-primary">
              {fmtDec(budget.accommodation)}
            </p>
            <p className="text-xs text-text-muted mt-1">40% of daily</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Daily Food</p>
            <p className="font-mono-num text-lg font-bold text-text-primary">
              {fmtDec(budget.food)}
            </p>
            <p className="text-xs text-text-muted mt-1">35% of daily</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Daily Activities</p>
            <p className="font-mono-num text-lg font-bold text-text-primary">
              {fmtDec(budget.activities)}
            </p>
            <p className="text-xs text-text-muted mt-1">15% of daily</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Daily Other</p>
            <p className="font-mono-num text-lg font-bold text-text-primary">
              {fmtDec(budget.other)}
            </p>
            <p className="text-xs text-text-muted mt-1">10% of daily</p>
          </div>
        </div>
      </div>

      {/* Trip Totals */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
        <h4 className="text-text-primary font-semibold">Full Trip Breakdown ({duration} days)</h4>
        <div className="space-y-2">
          {[
            { label: 'Accommodation', value: budget.tripAccommodation },
            { label: 'Food & Dining', value: budget.tripFood },
            { label: 'Activities & Tours', value: budget.tripActivities },
            { label: 'Other (souvenirs, tips)', value: budget.tripOther },
            { label: 'Transport', value: transport, highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className={`flex justify-between py-2 px-3 rounded ${highlight ? 'bg-accent-muted' : ''}`}>
              <span className="text-text-secondary text-sm">{label}</span>
              <span className={`font-mono-num ${highlight ? 'font-bold text-accent' : 'text-text-primary'}`}>
                {fmt(value)}
              </span>
            </div>
          ))}
          <div className="flex justify-between py-2 px-3 bg-white border border-border rounded font-bold border-t-2">
            <span className="text-text-primary">Total</span>
            <span className="font-mono-num text-accent">{fmt(budget.total)}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-4 text-sm text-text-secondary space-y-2">
        <p className="font-medium text-text-primary">💡 Budget Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Add 10-15% buffer for unexpected costs</li>
          <li>Book accommodation and transport early for better rates</li>
          <li>Eat where locals eat for cheaper, better food</li>
          <li>Look for free attractions and walking tours</li>
          <li>Travel during shoulder season for better value</li>
        </ul>
      </div>
    </div>
  );
}
