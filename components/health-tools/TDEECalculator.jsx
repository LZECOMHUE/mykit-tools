'use client';

import { useState, useMemo } from 'react';

export default function TDEECalculator() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [height, setHeight] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [weight, setWeight] = useState(75);
  const [weightSt, setWeightSt] = useState(11);
  const [weightLbs, setWeightLbs] = useState(12);
  const [activityLevel, setActivityLevel] = useState('moderate');

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    'very-active': 1.725,
    'extremely-active': 1.9,
  };

  const activityLabels = {
    sedentary: 'Sedentary (little/no exercise)',
    light: 'Light (1-3 days/week)',
    moderate: 'Moderate (3-5 days/week)',
    'very-active': 'Very Active (6-7 days/week)',
    'extremely-active': 'Extremely Active (2x/day)',
  };

  const calculations = useMemo(() => {
    let weightKg = weightUnit === 'kg' ? weight : (weightSt * 6.35029) + (weightLbs * 0.453592);
    let heightCm = heightUnit === 'cm' ? height : (heightFt * 30.48) + (heightIn * 2.54);

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const tdee = bmr * activityFactors[activityLevel];
    const loss = tdee - 500;
    const gain = tdee + 500;

    const proteinPercentage = 0.25;
    const carbPercentage = 0.45;
    const fatPercentage = 0.3;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loss: Math.round(loss),
      gain: Math.round(gain),
      protein: Math.round((tdee * proteinPercentage) / 4),
      carbs: Math.round((tdee * carbPercentage) / 4),
      fats: Math.round((tdee * fatPercentage) / 9),
    };
  }, [age, gender, height, heightFt, heightIn, heightUnit, weight, weightSt, weightLbs, weightUnit, activityLevel]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">TDEE Calculator</h2>

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

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Gender</label>
          <div className="flex gap-4">
            {['male', 'female'].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-accent"
                />
                <span className="text-text-primary capitalize">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Height */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">Height</label>
            <div className="flex gap-2">
              {['cm', 'ft/in'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setHeightUnit(unit)}
                  className={`px-3 py-1 text-xs rounded transition ${
                    heightUnit === unit
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {heightUnit === 'cm' ? (
            <input
              type="number"
              min="50"
              max="250"
              value={height}
              onChange={(e) => setHeight(Math.max(50, parseInt(e.target.value) || 50))}
              placeholder="cm"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="8"
                value={heightFt}
                onChange={(e) => setHeightFt(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="ft"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <input
                type="number"
                min="0"
                max="11"
                value={heightIn}
                onChange={(e) => setHeightIn(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                placeholder="in"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">Weight</label>
            <div className="flex gap-2">
              {['kg', 'st/lbs'].map((unit) => (
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
          </div>
          {weightUnit === 'kg' ? (
            <input
              type="number"
              min="20"
              max="300"
              value={weight}
              onChange={(e) => setWeight(Math.max(20, parseInt(e.target.value) || 20))}
              placeholder="kg"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={weightSt}
                onChange={(e) => setWeightSt(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="st"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <input
                type="number"
                min="0"
                max="13"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Math.max(0, Math.min(13, parseInt(e.target.value) || 0)))}
                placeholder="lbs"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}
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
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Basal Metabolic Rate</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{calculations.bmr}</p>
            <p className="text-xs text-text-secondary mt-1">calories/day at rest</p>
          </div>

          <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Daily Energy Expenditure</p>
            <p className="font-mono-num text-2xl font-bold text-accent">{calculations.tdee}</p>
            <p className="text-xs text-text-secondary mt-1">maintenance calories</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-[var(--radius-input)] border border-red-200">
            <p className="text-xs text-red-700 font-medium mb-1">Weight Loss Goal</p>
            <p className="font-mono-num text-xl font-bold text-red-600">{calculations.loss}</p>
            <p className="text-xs text-red-600 mt-1">-500 cal/day</p>
          </div>

          <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
            <p className="text-xs text-green-700 font-medium mb-1">Weight Gain Goal</p>
            <p className="font-mono-num text-xl font-bold text-green-600">{calculations.gain}</p>
            <p className="text-xs text-green-600 mt-1">+500 cal/day</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <p className="text-xs text-blue-700 font-medium mb-3 uppercase">Macro Split (at maintenance)</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-primary">Protein (25%)</span>
              <span className="font-mono-num font-bold text-blue-600">{calculations.protein}g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-primary">Carbs (45%)</span>
              <span className="font-mono-num font-bold text-blue-600">{calculations.carbs}g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-primary">Fats (30%)</span>
              <span className="font-mono-num font-bold text-blue-600">{calculations.fats}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
