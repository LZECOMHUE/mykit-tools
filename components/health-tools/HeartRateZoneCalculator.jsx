'use client';

import { useState, useMemo } from 'react';

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState(30);
  const [useRHR, setUseRHR] = useState(false);
  const [restingHeartRate, setRestingHeartRate] = useState(70);

  const calculations = useMemo(() => {
    const maxHR = 220 - age;

    const zones = useRHR
      ? [
          {
            name: 'Recovery Zone',
            percentage: '50-60%',
            min: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.5),
            max: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.6),
            benefit: 'Active recovery, building base',
            color: 'bg-blue-100 border-blue-300',
            textColor: 'text-blue-700',
          },
          {
            name: 'Fat Burn Zone',
            percentage: '60-70%',
            min: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.6),
            max: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.7),
            benefit: 'Fat loss, endurance building',
            color: 'bg-green-100 border-green-300',
            textColor: 'text-green-700',
          },
          {
            name: 'Aerobic Zone',
            percentage: '70-80%',
            min: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.7),
            max: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.8),
            benefit: 'Cardiovascular improvement',
            color: 'bg-yellow-100 border-yellow-300',
            textColor: 'text-yellow-700',
          },
          {
            name: 'Anaerobic Zone',
            percentage: '80-90%',
            min: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.8),
            max: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.9),
            benefit: 'High-intensity training',
            color: 'bg-orange-100 border-orange-300',
            textColor: 'text-orange-700',
          },
          {
            name: 'VO2 Max Zone',
            percentage: '90-100%',
            min: Math.round(restingHeartRate + (maxHR - restingHeartRate) * 0.9),
            max: maxHR,
            benefit: 'Maximum effort, peak performance',
            color: 'bg-red-100 border-red-300',
            textColor: 'text-red-700',
          },
        ]
      : [
          {
            name: 'Recovery Zone',
            percentage: '50-60%',
            min: Math.round(maxHR * 0.5),
            max: Math.round(maxHR * 0.6),
            benefit: 'Active recovery, building base',
            color: 'bg-blue-100 border-blue-300',
            textColor: 'text-blue-700',
          },
          {
            name: 'Fat Burn Zone',
            percentage: '60-70%',
            min: Math.round(maxHR * 0.6),
            max: Math.round(maxHR * 0.7),
            benefit: 'Fat loss, endurance building',
            color: 'bg-green-100 border-green-300',
            textColor: 'text-green-700',
          },
          {
            name: 'Aerobic Zone',
            percentage: '70-80%',
            min: Math.round(maxHR * 0.7),
            max: Math.round(maxHR * 0.8),
            benefit: 'Cardiovascular improvement',
            color: 'bg-yellow-100 border-yellow-300',
            textColor: 'text-yellow-700',
          },
          {
            name: 'Anaerobic Zone',
            percentage: '80-90%',
            min: Math.round(maxHR * 0.8),
            max: Math.round(maxHR * 0.9),
            benefit: 'High-intensity training',
            color: 'bg-orange-100 border-orange-300',
            textColor: 'text-orange-700',
          },
          {
            name: 'VO2 Max Zone',
            percentage: '90-100%',
            min: Math.round(maxHR * 0.9),
            max: maxHR,
            benefit: 'Maximum effort, peak performance',
            color: 'bg-red-100 border-red-300',
            textColor: 'text-red-700',
          },
        ];

    return {
      maxHR,
      zones,
    };
  }, [age, useRHR, restingHeartRate]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Heart Rate Zone Calculator</h2>

      <div className="space-y-4 mb-8">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Age</label>
          <input
            type="number"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Resting Heart Rate Option */}
        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={useRHR}
              onChange={(e) => setUseRHR(e.target.checked)}
              className="w-4 h-4 text-accent"
            />
            <span className="text-sm font-medium text-blue-700">Use Karvonen method (more accurate)</span>
          </label>

          {useRHR && (
            <div>
              <label className="block text-xs text-blue-700 font-medium mb-2">Resting Heart Rate (bpm)</label>
              <input
                type="number"
                min="30"
                max="120"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(Math.max(30, parseInt(e.target.value) || 30))}
                className="w-full px-3 py-2 border border-blue-200 rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-xs text-blue-600 mt-1">
                Measure your pulse for 60 seconds first thing in the morning
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Max Heart Rate */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Maximum Heart Rate</p>
          <p className="font-mono-num text-3xl font-bold text-accent">{calculations.maxHR}</p>
          <p className="text-xs text-text-secondary mt-2">bpm (beats per minute)</p>
          {useRHR && (
            <p className="text-xs text-blue-600 mt-2">
              Calculated using Karvonen method for greater accuracy
            </p>
          )}
        </div>

        {/* Training Zones */}
        <div>
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-3">Training Zones</p>
          <div className="space-y-3">
            {calculations.zones.map((zone, idx) => (
              <div key={idx} className={`p-4 rounded-[var(--radius-input)] border ${zone.color}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`text-sm font-bold ${zone.textColor}`}>{zone.name}</h4>
                    <p className="text-xs text-text-secondary mt-1">{zone.percentage} of max HR</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-num text-lg font-bold text-text-primary">
                      {zone.min}-{zone.max}
                    </p>
                    <p className="text-xs text-text-muted">bpm</p>
                  </div>
                </div>
                <p className={`text-xs ${zone.textColor}`}>{zone.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Guide */}
        <div className="p-4 bg-purple-50 rounded-[var(--radius-input)] border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-2">📊 How to Use These Zones</p>
          <ul className="text-xs text-purple-600 space-y-1">
            <li>• <span className="font-medium">Recovery:</span> Light walking, warm-up, cool-down</li>
            <li>• <span className="font-medium">Fat Burn:</span> Steady-state cardio, long runs</li>
            <li>• <span className="font-medium">Aerobic:</span> Hard cardio, tempo runs, group fitness</li>
            <li>• <span className="font-medium">Anaerobic:</span> Sprints, HIIT, competitive efforts</li>
            <li>• <span className="font-medium">VO2 Max:</span> Maximum effort, all-out sprints (short duration)</li>
          </ul>
        </div>

        {/* How to Measure */}
        <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
          <p className="text-xs text-green-700 font-medium mb-2">✓ How to Measure Heart Rate</p>
          <ul className="text-xs text-green-600 space-y-1">
            <li>• During exercise: use a chest strap monitor or smartwatch for accuracy</li>
            <li>• Stop and check pulse: count beats for 15 seconds, multiply by 4</li>
            <li>• Within 5-10 seconds of stopping exercise for accurate reading</li>
          </ul>
        </div>

        {/* Note */}
        <div className="p-4 bg-yellow-50 rounded-[var(--radius-input)] border border-yellow-200">
          <p className="text-xs text-yellow-700 font-medium mb-1">📋 Individual Variation</p>
          <p className="text-xs text-yellow-600">
            The 220-age formula is an estimate. Your actual max HR may vary by ±10-15 bpm. If using medication or have heart conditions, consult your doctor.
          </p>
        </div>
      </div>
    </div>
  );
}
