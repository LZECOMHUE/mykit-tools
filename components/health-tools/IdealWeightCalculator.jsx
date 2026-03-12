'use client';

import { useState, useMemo } from 'react';

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState('male');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [height, setHeight] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [frameSize, setFrameSize] = useState('medium');

  const frameSizeDescriptions = {
    small: 'Small frame (wrist circumference < 15cm or < 6in)',
    medium: 'Medium frame (wrist circumference 15-18cm or 6-7in)',
    large: 'Large frame (wrist circumference > 18cm or > 7in)',
  };

  const calculations = useMemo(() => {
    let heightCm = heightUnit === 'cm' ? height : (heightFt * 30.48) + (heightIn * 2.54);
    let heightInches = heightCm / 2.54;

    const devine = gender === 'male'
      ? 50 + 2.3 * (heightInches - 60)
      : 45.5 + 2.3 * (heightInches - 60);

    const robinson = gender === 'male'
      ? 52 + 1.9 * (heightInches - 60)
      : 49 + 1.7 * (heightInches - 60);

    const miller = gender === 'male'
      ? 56.2 + 1.41 * (heightInches - 60)
      : 53.1 + 1.36 * (heightInches - 60);

    const hamwi = gender === 'male'
      ? 48 + 2.7 * (heightInches - 60)
      : 45.5 + 2.2 * (heightInches - 60);

    const formulaResults = [
      { name: 'Devine', weight: devine.toFixed(1), ratio: gender === 'male' ? 50 : 45.5 },
      { name: 'Robinson', weight: robinson.toFixed(1), ratio: gender === 'male' ? 52 : 49 },
      { name: 'Miller', weight: miller.toFixed(1), ratio: gender === 'male' ? 56.2 : 53.1 },
      { name: 'Hamwi', weight: hamwi.toFixed(1), ratio: gender === 'male' ? 48 : 45.5 },
    ];

    const weights = formulaResults.map(f => parseFloat(f.weight));
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const avgWeight = (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1);

    let rangeAdjustment = 0;
    if (frameSize === 'small') {
      rangeAdjustment = -5;
    } else if (frameSize === 'large') {
      rangeAdjustment = 5;
    }

    const adjustedMin = (minWeight + rangeAdjustment).toFixed(1);
    const adjustedMax = (maxWeight + rangeAdjustment).toFixed(1);
    const adjustedAvg = (parseFloat(avgWeight) + rangeAdjustment).toFixed(1);

    return {
      formulaResults,
      minWeight: minWeight.toFixed(1),
      maxWeight: maxWeight.toFixed(1),
      avgWeight,
      adjustedMin,
      adjustedMax,
      adjustedAvg,
      heightCm: heightCm.toFixed(1),
    };
  }, [gender, height, heightFt, heightIn, heightUnit, frameSize]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Ideal Weight Calculator</h2>

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

        {/* Frame Size */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Frame Size</label>
          <select
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="small">Small Frame</option>
            <option value="medium">Medium Frame</option>
            <option value="large">Large Frame</option>
          </select>
          <p className="text-xs text-text-muted mt-2">{frameSizeDescriptions[frameSize]}</p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Primary Result */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Ideal Weight Range</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono-num text-3xl font-bold text-accent">{calculations.adjustedMin}</span>
            <span className="text-lg text-text-secondary">–</span>
            <span className="font-mono-num text-3xl font-bold text-accent">{calculations.adjustedMax}</span>
            <span className="text-sm text-text-secondary">kg</span>
          </div>
          <p className="text-sm text-text-primary font-medium">
            Target: <span className="font-mono-num text-lg text-accent">{calculations.adjustedAvg} kg</span>
          </p>
          <p className="text-xs text-text-muted mt-2">
            Height: {calculations.heightCm} cm
          </p>
        </div>

        {/* Formula Breakdown */}
        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <p className="text-xs text-blue-700 font-medium mb-3">Formula Comparison</p>
          <div className="space-y-2">
            {calculations.formulaResults.map((result, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-blue-100 last:border-b-0">
                <span className="text-sm text-text-primary">{result.name}</span>
                <span className="font-mono-num font-semibold text-blue-600">{result.weight} kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Adjustment */}
        <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
          <p className="text-xs text-green-700 font-medium mb-2">📊 Frame Size Adjustment</p>
          <p className="text-sm text-green-700">
            {frameSize === 'small'
              ? 'Small frame: approximately 5 kg below average'
              : frameSize === 'large'
                ? 'Large frame: approximately 5 kg above average'
                : 'Medium frame: no adjustment needed'}
          </p>
          <div className="mt-3 p-3 bg-white rounded text-xs text-green-700">
            <p className="font-medium mb-1">Without adjustment:</p>
            <p className="font-mono-num">
              {calculations.minWeight} – {calculations.maxWeight} kg
            </p>
          </div>
        </div>

        {/* How to Measure Frame Size */}
        <div className="p-4 bg-purple-50 rounded-[var(--radius-input)] border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-2">📏 How to Measure Frame Size</p>
          <ol className="text-xs text-purple-600 space-y-1">
            <li><span className="font-medium">1.</span> Stretch one arm straight out, bend the elbow 90°</li>
            <li><span className="font-medium">2.</span> Place fingers of other hand across the inner wrist bone</li>
            <li><span className="font-medium">3.</span> Measure the distance between bones</li>
            <li><span className="font-medium">4.</span> Compare to: Small &lt;15cm, Medium 15-18cm, Large &gt;18cm</li>
          </ol>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-yellow-50 rounded-[var(--radius-input)] border border-yellow-200">
          <p className="text-xs text-yellow-700 font-medium mb-2">💡 Important</p>
          <ul className="text-xs text-yellow-600 space-y-1">
            <li>• These are estimates based on population data</li>
            <li>• Muscle weighs more than fat; athletes may be above range</li>
            <li>• Ideal weight depends on fitness goals and personal health</li>
            <li>• Body composition matters more than the number on the scale</li>
            <li>• Consult a healthcare provider for personalized guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
