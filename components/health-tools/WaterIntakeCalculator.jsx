'use client';

import { useState, useMemo } from 'react';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(75);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('temperate');

  const activityModifiers = {
    sedentary: 1.0,
    moderate: 1.2,
    active: 1.5,
    'very-active': 1.7,
  };

  const climateModifiers = {
    temperate: 1.0,
    hot: 1.2,
    humid: 1.15,
  };

  const calculations = useMemo(() => {
    const weightKg = weightUnit === 'kg' ? weight : weight * 0.453592;
    const baseIntake = weightKg * 30;
    const activityAdjusted = baseIntake * activityModifiers[activityLevel];
    const finalIntake = activityAdjusted * climateModifiers[climate];

    const liters = finalIntake / 1000;
    const glasses = Math.round(liters / 0.25);
    const cups = Math.round(liters / 0.24);
    const bottlesPerDay = Math.round(liters / 0.5);

    const hoursInDay = 16;
    const glassesPerHour = Math.round(glasses / hoursInDay);
    const mlPerReminder = Math.round((liters * 1000) / 8);

    return {
      mlPerDay: Math.round(finalIntake),
      litersPerDay: liters.toFixed(1),
      glassesPerDay: glasses,
      cupsPerDay: cups,
      bottlesPerDay: bottlesPerDay,
      glassesPerHour: Math.max(1, glassesPerHour),
      reminders: 8,
      mlPerReminder,
    };
  }, [weight, weightUnit, activityLevel, climate]);

  const activityLabels = {
    sedentary: 'Sedentary (little/no exercise)',
    moderate: 'Moderate (3-5 days/week)',
    active: 'Active (5-6 days/week)',
    'very-active': 'Very Active (daily exercise)',
  };

  const climateLabels = {
    temperate: 'Temperate (cool/mild)',
    hot: 'Hot/Dry Climate',
    humid: 'Humid Climate',
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Daily Water Intake Calculator</h2>

      <div className="space-y-4 mb-8">
        {/* Weight Unit Toggle */}
        <div className="flex gap-2">
          {['kg', 'lbs'].map((unit) => (
            <button
              key={unit}
              onClick={() => setWeightUnit(unit)}
              className={`px-3 py-1 text-xs rounded transition ${
                weightUnit === unit
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>

        {/* Body Weight */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Body Weight ({weightUnit})</label>
          <input
            type="number"
            min="20"
            max="300"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {Object.entries(activityLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Climate */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Climate</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {Object.entries(climateLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Main Result */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Daily Water Intake</p>
          <p className="font-mono-num text-3xl font-bold text-accent">{calculations.litersPerDay}</p>
          <p className="text-sm text-text-secondary mt-2">litres per day</p>
          <p className="text-xs text-text-muted mt-1">{calculations.mlPerDay} ml</p>
        </div>

        {/* Different Measures */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-2">Glasses (250ml)</p>
            <p className="font-mono-num text-xl font-bold text-blue-600">{calculations.glassesPerDay}</p>
          </div>

          <div className="p-4 bg-cyan-50 rounded-[var(--radius-input)] border border-cyan-200">
            <p className="text-xs text-cyan-700 font-medium mb-2">Cups (240ml)</p>
            <p className="font-mono-num text-xl font-bold text-cyan-600">{calculations.cupsPerDay}</p>
          </div>

          <div className="p-4 bg-teal-50 rounded-[var(--radius-input)] border border-teal-200">
            <p className="text-xs text-teal-700 font-medium mb-2">Bottles (500ml)</p>
            <p className="font-mono-num text-xl font-bold text-teal-600">{calculations.bottlesPerDay}</p>
          </div>
        </div>

        {/* Hourly Reminder */}
        <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
          <p className="text-xs text-green-700 font-medium mb-3">💧 Hourly Drinking Schedule</p>
          <p className="text-sm text-green-700 mb-2">
            Drink about <span className="font-mono-num font-bold">{calculations.glassesPerHour}</span> glass{calculations.glassesPerHour !== 1 ? 'es' : ''} every hour during the day
          </p>
          <p className="text-xs text-green-600">
            ({calculations.mlPerReminder} ml per reminder)
          </p>
          <div className="mt-3 p-3 bg-white rounded text-xs text-green-700">
            <p className="font-medium mb-1">Example Schedule:</p>
            <p>7am, 9am, 11am, 1pm, 3pm, 5pm, 7pm, 9pm</p>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-purple-50 rounded-[var(--radius-input)] border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-2">💡 Tips for Staying Hydrated</p>
          <ul className="text-xs text-purple-600 space-y-1">
            <li>• Drink water before you feel thirsty</li>
            <li>• Keep a water bottle with you throughout the day</li>
            <li>• Increase intake on hot days and during exercise</li>
            <li>• Herbal tea, coffee, and water-rich foods count toward hydration</li>
            <li>• Urine colour is a good indicator: pale = well hydrated, dark = need more water</li>
          </ul>
        </div>

        {/* Note */}
        <div className="p-4 bg-yellow-50 rounded-[var(--radius-input)] border border-yellow-200">
          <p className="text-xs text-yellow-700 font-medium mb-1">📋 Individual Needs Vary</p>
          <p className="text-xs text-yellow-600">
            This is a general guideline. Actual needs depend on climate, altitude, diet, and individual factors. Listen to your body and adjust accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
