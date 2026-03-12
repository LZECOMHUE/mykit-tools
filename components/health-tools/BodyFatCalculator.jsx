'use client';

import { useState, useMemo } from 'react';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [height, setHeight] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [neckUnit, setNeckUnit] = useState('cm');
  const [neckCirc, setNeckCirc] = useState(38);
  const [neckCircIn, setNeckCircIn] = useState(15);
  const [waistUnit, setWaistUnit] = useState('cm');
  const [waistCirc, setWaistCirc] = useState(85);
  const [waistCircIn, setWaistCircIn] = useState(33.5);
  const [hipCirc, setHipCirc] = useState(95);
  const [hipCircIn, setHipCircIn] = useState(37.5);
  const [weight, setWeight] = useState(75);
  const [weightUnit, setWeightUnit] = useState('kg');

  const bodyFatCategories = {
    male: [
      { min: 0, max: 6, label: 'Essential', color: 'text-blue-600' },
      { min: 6, max: 13, label: 'Athlete', color: 'text-green-600' },
      { min: 13, max: 17, label: 'Fitness', color: 'text-emerald-600' },
      { min: 17, max: 24, label: 'Average', color: 'text-yellow-600' },
      { min: 24, max: Infinity, label: 'Obese', color: 'text-red-600' },
    ],
    female: [
      { min: 0, max: 13, label: 'Essential', color: 'text-blue-600' },
      { min: 13, max: 20, label: 'Athlete', color: 'text-green-600' },
      { min: 20, max: 24, label: 'Fitness', color: 'text-emerald-600' },
      { min: 24, max: 31, label: 'Average', color: 'text-yellow-600' },
      { min: 31, max: Infinity, label: 'Obese', color: 'text-red-600' },
    ],
  };

  const calculations = useMemo(() => {
    let heightCm = heightUnit === 'cm' ? height : (heightFt * 30.48) + (heightIn * 2.54);
    let neckCm = neckUnit === 'cm' ? neckCirc : neckCircIn * 2.54;
    let waistCm = waistUnit === 'cm' ? waistCirc : waistCircIn * 2.54;
    let hipCm = gender === 'female' ? (hipCirc || 95) : 0;
    let weightKg = weightUnit === 'kg' ? weight : weight * 0.453592;

    let bodyFatPercent;

    if (gender === 'male') {
      bodyFatPercent =
        495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFatPercent =
        495 /
        (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) -
        450;
    }

    bodyFatPercent = Math.max(0, Math.min(100, bodyFatPercent));

    const fatMassKg = weightKg * (bodyFatPercent / 100);
    const leanMassKg = weightKg - fatMassKg;

    const category = bodyFatCategories[gender].find(
      (cat) => bodyFatPercent >= cat.min && bodyFatPercent <= cat.max
    );

    return {
      bodyFatPercent: bodyFatPercent.toFixed(1),
      fatMassKg: fatMassKg.toFixed(1),
      fatMassLbs: (fatMassKg * 2.20462).toFixed(1),
      leanMassKg: leanMassKg.toFixed(1),
      leanMassLbs: (leanMassKg * 2.20462).toFixed(1),
      category: category || { label: 'Unknown', color: 'text-gray-600' },
    };
  }, [
    gender,
    height,
    heightFt,
    heightIn,
    heightUnit,
    neckCirc,
    neckCircIn,
    neckUnit,
    waistCirc,
    waistCircIn,
    waistUnit,
    hipCirc,
    hipCircIn,
    weight,
    weightUnit,
  ]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Body Fat Calculator (US Navy Method)</h2>

      <div className="space-y-4 mb-8">
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
          </div>
          <input
            type="number"
            min="20"
            max="300"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Neck Circumference */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">Neck Circumference</label>
            <div className="flex gap-2">
              {['cm', 'in'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setNeckUnit(unit)}
                  className={`px-3 py-1 text-xs rounded transition ${
                    neckUnit === unit
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {neckUnit === 'cm' ? (
            <input
              type="number"
              min="20"
              max="50"
              step="0.1"
              value={neckCirc}
              onChange={(e) => setNeckCirc(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ) : (
            <input
              type="number"
              min="8"
              max="20"
              step="0.1"
              value={neckCircIn}
              onChange={(e) => setNeckCircIn(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          )}
        </div>

        {/* Waist Circumference */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">Waist Circumference</label>
            <div className="flex gap-2">
              {['cm', 'in'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setWaistUnit(unit)}
                  className={`px-3 py-1 text-xs rounded transition ${
                    waistUnit === unit
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {waistUnit === 'cm' ? (
            <input
              type="number"
              min="40"
              max="150"
              step="0.1"
              value={waistCirc}
              onChange={(e) => setWaistCirc(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          ) : (
            <input
              type="number"
              min="15"
              max="60"
              step="0.1"
              value={waistCircIn}
              onChange={(e) => setWaistCircIn(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          )}
        </div>

        {/* Hip Circumference (female only) */}
        {gender === 'female' && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Hip Circumference</label>
            <input
              type="number"
              min="60"
              max="150"
              step="0.1"
              value={hipCirc}
              onChange={(e) => setHipCirc(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Main Result */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Body Fat Percentage</p>
          <p className="font-mono-num text-4xl font-bold text-accent">{calculations.bodyFatPercent}%</p>
          <p className={`text-sm font-medium mt-2 ${calculations.category.color}`}>
            {calculations.category.label}
          </p>
        </div>

        {/* Body Composition */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-[var(--radius-input)] border border-red-200">
            <p className="text-xs text-red-700 font-medium mb-2">Fat Mass</p>
            <p className="font-mono-num text-xl font-bold text-red-600">{calculations.fatMassKg}</p>
            <p className="text-xs text-red-600 mt-1">kg</p>
            <p className="text-xs text-red-500 mt-2">{calculations.fatMassLbs} lbs</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-2">Lean Mass</p>
            <p className="font-mono-num text-xl font-bold text-blue-600">{calculations.leanMassKg}</p>
            <p className="text-xs text-blue-600 mt-1">kg</p>
            <p className="text-xs text-blue-500 mt-2">{calculations.leanMassLbs} lbs</p>
          </div>
        </div>

        {/* Category Ranges */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-3">Category Ranges</p>
          <div className="space-y-1 text-sm">
            {bodyFatCategories[gender].map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className={`font-medium ${cat.color}`}>{cat.label}</span>
                <span className="font-mono-num text-text-secondary">
                  {cat.min}% - {cat.max === Infinity ? '50%+' : `${cat.max}%`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 rounded-[var(--radius-input)] border border-yellow-200">
          <p className="text-xs text-yellow-700 font-medium mb-1">⚠️ Accuracy Note</p>
          <p className="text-xs text-yellow-600">
            The US Navy method is an estimate. Actual body composition is best determined via DEXA, hydrostatic weighing, or other advanced methods.
          </p>
        </div>
      </div>
    </div>
  );
}
