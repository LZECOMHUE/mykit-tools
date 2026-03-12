'use client';

import { useState, useMemo } from 'react';
import { downloadBmiCard } from '@/lib/export';

const BMI_CATEGORIES = [
  { label: 'Underweight', min: 0, max: 18.4, color: 'blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { label: 'Healthy weight', min: 18.5, max: 24.9, color: 'green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { label: 'Overweight', min: 25, max: 29.9, color: 'yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { label: 'Obese class I', min: 30, max: 34.9, color: 'orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { label: 'Obese class II', min: 35, max: 39.9, color: 'red-400', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  { label: 'Obese class III', min: 40, max: Infinity, color: 'red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300' },
];

const SCALE_SEGMENTS = [
  { range: [0, 18.5], color: 'bg-blue-500', label: 'Under' },
  { range: [18.5, 25], color: 'bg-green-600', label: 'Healthy' },
  { range: [25, 30], color: 'bg-yellow-600', label: 'Over' },
  { range: [30, 35], color: 'bg-orange-500', label: 'Obese I' },
  { range: [35, 40], color: 'bg-red-400', label: 'Obese II' },
  { range: [40, 60], color: 'bg-red-600', label: 'Obese III' },
];

export default function BMICalculator() {
  const [isMetric, setIsMetric] = useState(true);
  const [metricHeight, setMetricHeight] = useState('');
  const [metricWeight, setMetricWeight] = useState('');
  const [imperialFeet, setImperialFeet] = useState('');
  const [imperialInches, setImperialInches] = useState('');
  const [imperialStone, setImperialStone] = useState('');
  const [imperialLbs, setImperialLbs] = useState('');

  // Calculate BMI and related values
  const calculations = useMemo(() => {
    let bmi = null;
    let heightInCm = null;
    let weightInKg = null;
    let healthyWeightMin = null;
    let healthyWeightMax = null;
    let category = null;

    if (isMetric) {
      const h = parseFloat(metricHeight);
      const w = parseFloat(metricWeight);

      if (h > 0 && w > 0) {
        heightInCm = h;
        weightInKg = w;
        const heightInM = h / 100;
        bmi = w / (heightInM * heightInM);

        // Healthy weight range: BMI 18.5-24.9
        healthyWeightMin = 18.5 * (heightInM * heightInM);
        healthyWeightMax = 24.9 * (heightInM * heightInM);

        category = BMI_CATEGORIES.find(cat => bmi >= cat.min && bmi <= cat.max);
      }
    } else {
      const feet = parseFloat(imperialFeet) || 0;
      const inches = parseFloat(imperialInches) || 0;
      const stone = parseFloat(imperialStone) || 0;
      const lbs = parseFloat(imperialLbs) || 0;

      if (feet >= 1 && feet <= 8 && inches >= 0 && inches <= 11 && (stone > 0 || lbs > 0)) {
        const totalInches = feet * 12 + inches;
        const totalLbs = stone * 14 + lbs;

        if (totalLbs > 0) {
          bmi = (totalLbs * 703) / (totalInches * totalInches);

          // Convert to metric for display
          const heightInM = (totalInches * 0.0254);
          heightInCm = heightInM * 100;
          weightInKg = totalLbs * 0.453592;

          // Healthy weight range
          healthyWeightMin = 18.5 * (heightInM * heightInM);
          healthyWeightMax = 24.9 * (heightInM * heightInM);

          category = BMI_CATEGORIES.find(cat => bmi >= cat.min && bmi <= cat.max);
        }
      }
    }

    return {
      bmi: bmi ? parseFloat(bmi.toFixed(1)) : null,
      category,
      heightInCm,
      weightInKg,
      healthyWeightMin: healthyWeightMin ? parseFloat(healthyWeightMin.toFixed(1)) : null,
      healthyWeightMax: healthyWeightMax ? parseFloat(healthyWeightMax.toFixed(1)) : null,
      isValid: bmi !== null,
    };
  }, [isMetric, metricHeight, metricWeight, imperialFeet, imperialInches, imperialStone, imperialLbs]);

  // Calculate position on visual scale (0-100 for left positioning)
  const scalePosition = useMemo(() => {
    if (!calculations.bmi) return null;

    const minBmi = 15;
    const maxBmi = 50;
    const range = maxBmi - minBmi;
    const position = ((calculations.bmi - minBmi) / range) * 100;

    return Math.max(0, Math.min(100, position));
  }, [calculations.bmi]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setIsMetric(true)}
          className={`flex-1 px-4 py-2 rounded-full font-medium transition ${
            isMetric
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          Metric (kg, cm)
        </button>
        <button
          onClick={() => setIsMetric(false)}
          className={`flex-1 px-4 py-2 rounded-full font-medium transition ${
            !isMetric
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          Imperial (lbs, ft)
        </button>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 mb-6">
        {isMetric ? (
          <>
            {/* Metric Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={metricHeight}
                  onChange={(e) => setMetricHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={metricWeight}
                  onChange={(e) => setMetricWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Imperial Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Height
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={imperialFeet}
                      onChange={(e) => setImperialFeet(e.target.value)}
                      placeholder="Feet"
                      min="1"
                      max="8"
                      className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <span className="text-xs text-text-muted mt-1 block">ft</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={imperialInches}
                      onChange={(e) => setImperialInches(e.target.value)}
                      placeholder="Inches"
                      min="0"
                      max="11"
                      className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <span className="text-xs text-text-muted mt-1 block">in</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Weight
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={imperialStone}
                      onChange={(e) => setImperialStone(e.target.value)}
                      placeholder="Stone"
                      min="0"
                      className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <span className="text-xs text-text-muted mt-1 block">st</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={imperialLbs}
                      onChange={(e) => setImperialLbs(e.target.value)}
                      placeholder="Pounds"
                      min="0"
                      max="13"
                      className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <span className="text-xs text-text-muted mt-1 block">lbs</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Prompt when no input yet */}
      {!calculations.isValid && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 mb-6 text-center">
          <p className="text-text-secondary">
            Enter your height and weight above to calculate your BMI.
          </p>
        </div>
      )}

      {/* Results Card */}
      {calculations.isValid && (
        <div className={`rounded-[var(--radius-card)] p-6 mb-6 border ${calculations.category.borderColor} ${calculations.category.bgColor}`}>
          {/* BMI Number */}
          <div className="mb-4">
            <p className="text-text-muted text-sm mb-1">Your BMI</p>
            <p className={`text-4xl font-bold font-mono-num text-${calculations.category.color}`}>
              {calculations.bmi}
            </p>
            <p className={`text-lg font-medium text-${calculations.category.color} mt-2`}>
              {calculations.category.label}
            </p>
          </div>

          {/* Visual Scale */}
          <div className="mb-6 mt-6">
            <div className="flex h-6 rounded-full overflow-hidden border border-border">
              {SCALE_SEGMENTS.map((segment, idx) => (
                <div
                  key={idx}
                  className={`flex-1 ${segment.color}`}
                />
              ))}
            </div>
            {/* Marker */}
            <div className="relative -mt-5">
              <div
                style={{ left: `${scalePosition}%` }}
                className="absolute w-4 h-4 bg-white border-2 border-text-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Healthy Weight Range */}
          {calculations.healthyWeightMin && calculations.healthyWeightMax && (
            <div className="bg-white/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-text-secondary">
                For your height, a healthy weight is between{' '}
                <span className="font-mono-num font-semibold text-text-primary">
                  {calculations.healthyWeightMin}
                </span>
                {' '}and{' '}
                <span className="font-mono-num font-semibold text-text-primary">
                  {calculations.healthyWeightMax}
                </span>
                {' '}
                {isMetric ? 'kg' : 'lbs'}
              </p>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={() =>
              downloadBmiCard(
                calculations.bmi,
                calculations.category.label,
                calculations.heightInCm,
                calculations.weightInKg,
                calculations.healthyWeightMin,
                calculations.healthyWeightMax
              )
            }
            className="w-full mt-4 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-[var(--radius-input)] font-medium transition"
          >
            📸 Download Shareable Card
          </button>
        </div>
      )}

      {/* Category Reference Table */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] overflow-hidden mb-6">
        <div className="divide-y divide-border">
          {BMI_CATEGORIES.map((cat, idx) => {
            const rangeLabel = cat.min === 0
              ? `< ${cat.max + 0.1}`
              : cat.max === Infinity
                ? `≥ ${cat.min}`
                : `${cat.min} – ${cat.max}`;
            return (
              <div
                key={idx}
                className={`px-4 py-3 flex justify-between items-center ${
                  calculations.isValid && calculations.category === cat ? 'bg-accent/5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${cat.color}`} />
                  <span className="text-sm font-medium text-text-primary">
                    {cat.label}
                  </span>
                </div>
                <span className={`text-sm font-mono-num text-${cat.color}`}>
                  {rangeLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-text-muted leading-relaxed">
        <p>
          BMI is a general screening tool and doesn't account for muscle mass, age, gender,
          ethnicity, or body composition. It shouldn't be used as a sole indicator of health.
          Always consult a healthcare professional for personalized medical advice.
        </p>
      </div>
    </div>
  );
}
