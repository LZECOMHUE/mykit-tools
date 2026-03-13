'use client';

import { useState, useMemo } from 'react';

// MET values for different cycling intensities
const CYCLING_METS = {
  leisurely: 4,
  moderate: 8,
  vigorous: 12,
  race: 16
};

export default function CyclingCalorieCalculator() {
  const [distance, setDistance] = useState('20');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [speed, setSpeed] = useState('20');
  const [speedUnit, setSpeedUnit] = useState('kmh');
  const [weight, setWeight] = useState('70');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [terrain, setTerrain] = useState('flat');

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const spd = parseFloat(speed) || 0;
    const wt = parseFloat(weight) || 0;

    if (dist <= 0 || spd <= 0 || wt <= 0) return null;

    // Convert to consistent units (km, kmh, kg)
    const distKm = distanceUnit === 'km' ? dist : dist * 1.60934;
    const speedKmh = speedUnit === 'kmh' ? spd : spd * 1.60934;
    const weightKg = weightUnit === 'kg' ? wt : wt * 0.453592;

    // Calculate duration in hours
    const durationHours = distKm / speedKmh;

    // Base MET calculation
    let baseMet = CYCLING_METS.moderate;

    if (speedKmh < 15) {
      baseMet = CYCLING_METS.leisurely;
    } else if (speedKmh >= 15 && speedKmh < 25) {
      baseMet = CYCLING_METS.moderate;
    } else if (speedKmh >= 25 && speedKmh < 32) {
      baseMet = CYCLING_METS.vigorous;
    } else {
      baseMet = CYCLING_METS.race;
    }

    // Terrain multiplier
    let terrainMult = 1.0;
    if (terrain === 'hilly') terrainMult = 1.3;
    if (terrain === 'mountain') terrainMult = 1.6;

    const met = baseMet * terrainMult;

    // Calories = MET * weight (kg) * duration (hours)
    const calories = Math.round(met * weightKg * durationHours);

    return {
      calories,
      durationHours: durationHours.toFixed(2),
      met: met.toFixed(1),
      distKm: distKm.toFixed(2),
      speedKmh: speedKmh.toFixed(1)
    };
  }, [distance, distanceUnit, speed, speedUnit, weight, weightUnit, terrain]);

  return (
    <div className="w-full space-y-6">
      {/* Inputs */}
      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Distance
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              min="0"
              step="0.1"
              className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={distanceUnit}
              onChange={(e) => setDistanceUnit(e.target.value)}
              className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="km">km</option>
              <option value="miles">miles</option>
            </select>
          </div>
        </div>

        {/* Speed */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Average Speed
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              min="0"
              step="0.1"
              className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
              className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Your Weight
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
              className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        {/* Terrain */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Terrain
          </label>
          <select
            value={terrain}
            onChange={(e) => setTerrain(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="flat">Flat</option>
            <option value="hilly">Hilly</option>
            <option value="mountain">Mountain</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Main Result */}
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Estimated Calories Burned
            </p>
            <p className="text-4xl font-bold font-mono text-accent">
              {result.calories}
            </p>
            <p className="text-text-secondary text-sm mt-1">
              kcal
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Duration
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.durationHours} h
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                MET Value
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.met}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Distance (km)
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.distKm}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Speed (km/h)
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.speedKmh}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Note */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Note: Calorie burn estimates vary based on individual metabolism, fitness level, and conditions. These values are approximate.
        </p>
      </div>
    </div>
  );
}
