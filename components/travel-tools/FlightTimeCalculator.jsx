'use client';

import { useState, useMemo } from 'react';

// City pairs with approximate distances in km
const CITY_PAIRS = {
  'London - New York': 5570,
  'London - Los Angeles': 8600,
  'London - Tokyo': 9570,
  'London - Sydney': 17000,
  'London - Dubai': 5460,
  'London - Bangkok': 9530,
  'London - Singapore': 10900,
  'London - Paris': 343,
  'London - Amsterdam': 358,
  'London - Frankfurt': 593,
  'London - Rome': 1400,
  'London - Madrid': 1256,
  'London - Barcelona': 1240,
  'New York - Los Angeles': 3944,
  'New York - Miami': 1280,
  'New York - Toronto': 560,
  'New York - Mexico City': 2100,
  'Los Angeles - Tokyo': 8800,
  'Los Angeles - Sydney': 12050,
  'Los Angeles - Honolulu': 3840,
  'Paris - Rome': 1375,
  'Paris - Barcelona': 830,
  'Paris - Berlin': 877,
  'Tokyo - Sydney': 7823,
  'Dubai - Singapore': 3160,
  'Bangkok - Singapore': 1290,
  'Toronto - Vancouver': 3360,
  'Sydney - Melbourne': 714,
  'Amsterdam - Berlin': 577,
  'Madrid - Barcelona': 600
};

export default function FlightTimeCalculator() {
  const [selectedPair, setSelectedPair] = useState('London - New York');
  const [customDistance, setCustomDistance] = useState('');
  const [unit, setUnit] = useState('km');

  const distanceKm = useMemo(() => {
    if (customDistance && !isNaN(parseFloat(customDistance))) {
      const dist = parseFloat(customDistance);
      return unit === 'km' ? dist : dist * 1.60934;
    }
    return CITY_PAIRS[selectedPair] || 0;
  }, [selectedPair, customDistance, unit]);

  const flightData = useMemo(() => {
    if (distanceKm <= 0) return null;

    const cruiseSpeed = 850; // km/h average
    const overhead = 30; // minutes for takeoff and landing
    const cruiseTime = distanceKm / cruiseSpeed;
    const totalTimeHours = cruiseTime + overhead / 60;

    const hours = Math.floor(totalTimeHours);
    const minutes = Math.round((totalTimeHours - hours) * 60);

    const distanceMiles = distanceKm * 0.621371;

    return {
      distance: {
        km: distanceKm.toFixed(0),
        miles: distanceMiles.toFixed(0)
      },
      time: {
        hours,
        minutes,
        formatted: `${hours}h ${minutes}m`
      }
    };
  }, [distanceKm]);

  return (
    <div className="w-full space-y-6">
      {/* Preset Cities */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Common Routes
        </label>
        <select
          value={selectedPair}
          onChange={(e) => {
            setSelectedPair(e.target.value);
            setCustomDistance('');
          }}
          className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {Object.keys(CITY_PAIRS).map(pair => (
            <option key={pair} value={pair}>{pair}</option>
          ))}
        </select>
      </div>

      {/* Custom Distance */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Or Enter Custom Distance
        </label>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            value={customDistance}
            onChange={(e) => setCustomDistance(e.target.value)}
            placeholder="Distance"
            min="0"
            className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {flightData && (
        <>
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Estimated Flight Time
            </p>
            <p className="text-4xl font-bold font-mono text-accent">
              {flightData.time.formatted}
            </p>
            <p className="text-text-secondary text-sm mt-2">
              at ~850 km/h average speed
            </p>
          </div>

          {/* Distance Details */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Distance (km)
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {flightData.distance.km}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Distance (miles)
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {flightData.distance.miles}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
            <p className="text-text-secondary text-sm font-medium mb-3">
              Time Breakdown
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Takeoff & Landing:</span>
                <span className="font-mono text-text-primary">30 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Cruise Time:</span>
                <span className="font-mono text-text-primary">
                  {Math.round((flightData.distance.km / 850) * 60)} min
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
            <p className="text-text-secondary text-[11px]">
              Note: Actual flight times vary based on wind, aircraft type, and routing. This is an estimate for flight-only time, not including airport procedures or layovers.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
