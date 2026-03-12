'use client';

import { useState, useMemo } from 'react';

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState(75);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [goal, setGoal] = useState('muscle-gain');
  const [includeBodyFat, setIncludeBodyFat] = useState(false);
  const [bodyFatPercent, setBodyFatPercent] = useState(25);

  const goalOptions = {
    'sedentary': { label: 'Sedentary (0.8g/kg)', ratio: 0.8 },
    'maintenance': { label: 'Maintenance (1.0g/kg)', ratio: 1.0 },
    'muscle-gain': { label: 'Muscle Gain (1.6-2.2g/kg)', ratio: 1.9 },
    'athlete': { label: 'Athlete/Heavy Training (2.0-2.4g/kg)', ratio: 2.2 },
    'weight-loss': { label: 'Weight Loss (1.6-2.2g/kg)', ratio: 1.9 },
  };

  const foodEquivalents = {
    'chicken-breast': { protein: 31, amount: '100g' },
    'salmon': { protein: 25, amount: '100g' },
    'egg': { protein: 6, amount: '1 large' },
    'greek-yogurt': { protein: 10, amount: '100g' },
    'cottage-cheese': { protein: 11, amount: '100g' },
    'beef': { protein: 26, amount: '100g' },
    'tuna': { protein: 29, amount: '100g' },
    'tofu': { protein: 15, amount: '100g' },
    'lentils': { protein: 9, amount: '100g cooked' },
    'nuts': { protein: 6, amount: '30g' },
  };

  const calculations = useMemo(() => {
    const weightKg = weightUnit === 'kg' ? weight : weight * 0.453592;

    let targetProteinGrams;
    if (includeBodyFat && bodyFatPercent > 0) {
      const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
      targetProteinGrams = leanMassKg * goalOptions[goal].ratio;
    } else {
      targetProteinGrams = weightKg * goalOptions[goal].ratio;
    }

    const mealsPerDay = 4;
    const proteinPerMeal = targetProteinGrams / mealsPerDay;

    return {
      totalProtein: Math.round(targetProteinGrams),
      proteinPerMeal: Math.round(proteinPerMeal),
      targetRatio: goalOptions[goal].ratio,
      weightKg: weightKg.toFixed(1),
    };
  }, [weight, weightUnit, goal, includeBodyFat, bodyFatPercent]);

  const getEquivalents = () => {
    const equivalents = [];
    Object.entries(foodEquivalents).forEach(([key, food]) => {
      const portions = Math.round(calculations.totalProtein / food.protein);
      equivalents.push({
        name: key,
        portions,
        food,
      });
    });
    return equivalents.slice(0, 4);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Protein Intake Calculator</h2>

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

        {/* Goal Selection */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {Object.entries(goalOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Body Fat Optional */}
        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={includeBodyFat}
              onChange={(e) => setIncludeBodyFat(e.target.checked)}
              className="w-4 h-4 text-accent"
            />
            <span className="text-sm font-medium text-blue-700">Calculate based on lean mass (optional)</span>
          </label>

          {includeBodyFat && (
            <div>
              <label className="block text-xs text-blue-700 font-medium mb-2">Body Fat %</label>
              <input
                type="number"
                min="5"
                max="50"
                step="0.5"
                value={bodyFatPercent}
                onChange={(e) => setBodyFatPercent(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-blue-200 rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Main Result */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Daily Protein Target</p>
          <p className="font-mono-num text-3xl font-bold text-accent">{calculations.totalProtein}g</p>
          <p className="text-xs text-text-secondary mt-2">
            {calculations.targetRatio}g per kg of body weight
          </p>
        </div>

        {/* Per Meal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
            <p className="text-xs text-green-700 font-medium mb-1">Per Meal (4 meals/day)</p>
            <p className="font-mono-num text-2xl font-bold text-green-600">{calculations.proteinPerMeal}g</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-[var(--radius-input)] border border-orange-200">
            <p className="text-xs text-orange-700 font-medium mb-1">Body Weight</p>
            <p className="font-mono-num text-2xl font-bold text-orange-600">{calculations.weightKg}</p>
            <p className="text-xs text-orange-600 mt-1">kg</p>
          </div>
        </div>

        {/* Food Equivalents */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-3">
            What {calculations.totalProtein}g Protein Looks Like
          </p>
          <div className="space-y-2">
            {getEquivalents().map((equiv) => (
              <div key={equiv.name} className="flex justify-between items-center text-sm pb-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="text-text-primary font-medium capitalize">
                    {equiv.name.split('-').join(' ')}
                  </span>
                  <span className="text-text-muted text-xs ml-2">({equiv.food.amount})</span>
                </div>
                <span className="font-mono-num text-text-primary font-semibold">
                  ~{equiv.portions} {equiv.portions === 1 ? 'serving' : 'servings'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <p className="text-xs text-blue-700 font-medium mb-2">💡 Tips</p>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• Spread protein evenly across meals for optimal muscle protein synthesis</li>
            <li>• Combine with resistance training for maximum muscle gain</li>
            <li>• Whole foods are preferable to supplements when possible</li>
            <li>• Individual needs may vary; adjust based on results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
