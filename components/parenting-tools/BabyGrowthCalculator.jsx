'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BabyGrowthCalculator() {
  const [ageMonths, setAgeMonths] = useState('');
  const [sex, setSex] = useState('male');
  const [weightValue, setWeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [lengthValue, setLengthValue] = useState('');
  const [lengthUnit, setLengthUnit] = useState('cm');

  // WHO growth chart data (50th percentile for months 0-24)
  const whoData = {
    weight: {
      male: {
        months: [0, 1, 2, 3, 4, 6, 9, 12, 15, 18, 21, 24],
        values: [3.3, 4.5, 5.6, 6.4, 7.0, 7.9, 8.9, 9.6, 10.3, 10.9, 11.5, 12.2],
      },
      female: {
        months: [0, 1, 2, 3, 4, 6, 9, 12, 15, 18, 21, 24],
        values: [3.2, 4.2, 5.1, 5.8, 6.4, 7.3, 8.2, 8.9, 9.6, 10.2, 10.9, 11.5],
      },
    },
    length: {
      male: {
        months: [0, 1, 2, 3, 4, 6, 9, 12, 15, 18, 21, 24],
        values: [49.9, 54.7, 58.4, 61.4, 63.9, 67.6, 72.0, 75.7, 79.1, 82.3, 85.1, 87.8],
      },
      female: {
        months: [0, 1, 2, 3, 4, 6, 9, 12, 15, 18, 21, 24],
        values: [49.1, 53.7, 57.1, 59.8, 62.1, 65.7, 70.1, 73.7, 77.0, 80.1, 82.7, 85.7],
      },
    },
  };

  // Percentile multipliers
  const percentileMultipliers = {
    p3: 0.82,
    p15: 0.90,
    p50: 1.0,
    p85: 1.10,
    p97: 1.18,
  };

  const lengthPercentileMultipliers = {
    p3: 0.94,
    p15: 0.97,
    p50: 1.0,
    p85: 1.03,
    p97: 1.06,
  };

  // Interpolate value at a given month
  const interpolateValue = (months, values, targetMonth) => {
    if (targetMonth < months[0]) return values[0];
    if (targetMonth >= months[months.length - 1]) return values[values.length - 1];

    for (let i = 0; i < months.length - 1; i++) {
      if (targetMonth >= months[i] && targetMonth <= months[i + 1]) {
        const ratio = (targetMonth - months[i]) / (months[i + 1] - months[i]);
        return values[i] + ratio * (values[i + 1] - values[i]);
      }
    }
    return values[values.length - 1];
  };

  // Calculate percentile
  const calculatePercentile = (measurement, percentileValues) => {
    const sorted = percentileValues.sort((a, b) => a - b);
    const pos = sorted.findIndex((v) => v >= measurement);
    if (pos === -1) return 97;
    if (pos === 0) return 3;
    const below = pos;
    const above = sorted.length - pos;
    const percentile = (below / sorted.length) * 100;
    return Math.round(percentile);
  };

  const results = useMemo(() => {
    const age = parseFloat(ageMonths) || 0;
    const weight = parseFloat(weightValue) || 0;
    const length = parseFloat(lengthValue) || 0;

    if (age < 0 || age > 24 || weight <= 0 || length <= 0) return null;

    // Convert to standard units (kg, cm)
    const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    const lengthCm = lengthUnit === 'cm' ? length : lengthUnit === 'mm' ? length / 10 : length * 2.54;

    const sexKey = sex === 'male' ? 'male' : 'female';

    // Get 50th percentile values
    const weight50 = interpolateValue(
      whoData.weight[sexKey].months,
      whoData.weight[sexKey].values,
      age
    );

    const length50 = interpolateValue(whoData.length[sexKey].months, whoData.length[sexKey].values, age);

    // Generate percentile curves
    const weightPercentiles = {
      p3: weight50 * percentileMultipliers.p3,
      p15: weight50 * percentileMultipliers.p15,
      p50: weight50,
      p85: weight50 * percentileMultipliers.p85,
      p97: weight50 * percentileMultipliers.p97,
    };

    const lengthPercentiles = {
      p3: length50 * lengthPercentileMultipliers.p3,
      p15: length50 * lengthPercentileMultipliers.p15,
      p50: length50,
      p85: length50 * lengthPercentileMultipliers.p85,
      p97: length50 * lengthPercentileMultipliers.p97,
    };

    // Calculate percentiles
    const weightPercentileValues = Object.values(weightPercentiles).sort((a, b) => a - b);
    const lengthPercentileValues = Object.values(lengthPercentiles).sort((a, b) => a - b);

    let weightPercentile = 50;
    if (weightKg < weightPercentiles.p3) weightPercentile = 3;
    else if (weightKg < weightPercentiles.p15) weightPercentile = 15;
    else if (weightKg <= weightPercentiles.p50) weightPercentile = Math.round(15 + (weightKg - weightPercentiles.p15) / (weightPercentiles.p50 - weightPercentiles.p15) * 35);
    else if (weightKg <= weightPercentiles.p85) weightPercentile = Math.round(50 + (weightKg - weightPercentiles.p50) / (weightPercentiles.p85 - weightPercentiles.p50) * 35);
    else if (weightKg <= weightPercentiles.p97) weightPercentile = Math.round(85 + (weightKg - weightPercentiles.p85) / (weightPercentiles.p97 - weightPercentiles.p85) * 12);
    else weightPercentile = 97;

    let lengthPercentile = 50;
    if (lengthCm < lengthPercentiles.p3) lengthPercentile = 3;
    else if (lengthCm < lengthPercentiles.p15) lengthPercentile = 15;
    else if (lengthCm <= lengthPercentiles.p50) lengthPercentile = Math.round(15 + (lengthCm - lengthPercentiles.p15) / (lengthPercentiles.p50 - lengthPercentiles.p15) * 35);
    else if (lengthCm <= lengthPercentiles.p85) lengthPercentile = Math.round(50 + (lengthCm - lengthPercentiles.p50) / (lengthPercentiles.p85 - lengthPercentiles.p50) * 35);
    else if (lengthCm <= lengthPercentiles.p97) lengthPercentile = Math.round(85 + (lengthCm - lengthPercentiles.p85) / (lengthPercentiles.p97 - lengthPercentiles.p85) * 12);
    else lengthPercentile = 97;

    // Determine status
    const getWeightStatus = (percentile) => {
      if (percentile >= 15 && percentile <= 85) return { label: 'Normal Range', colour: 'success' };
      if ((percentile >= 3 && percentile < 15) || (percentile > 85 && percentile <= 97)) return { label: 'Slightly Outside Normal', colour: 'warning' };
      return { label: 'Outside Normal Range', colour: 'error' };
    };

    const getLengthStatus = (percentile) => {
      if (percentile >= 15 && percentile <= 85) return { label: 'Normal Range', colour: 'success' };
      if ((percentile >= 3 && percentile < 15) || (percentile > 85 && percentile <= 97)) return { label: 'Slightly Outside Normal', colour: 'warning' };
      return { label: 'Outside Normal Range', colour: 'error' };
    };

    return {
      age,
      sex,
      weightKg,
      lengthCm,
      weight50,
      length50,
      weightPercentile,
      lengthPercentile,
      weightPercentiles,
      lengthPercentiles,
      weightStatus: getWeightStatus(weightPercentile),
      lengthStatus: getLengthStatus(lengthPercentile),
    };
  }, [ageMonths, sex, weightValue, weightUnit, lengthValue, lengthUnit]);

  const handleReset = () => {
    setAgeMonths('');
    setSex('male');
    setWeightValue('');
    setWeightUnit('kg');
    setLengthValue('');
    setLengthUnit('cm');
  };

  const renderChart = () => {
    if (!results) return null;

    const chartHeight = 300;
    const chartWidth = 600;
    const padding = 40;
    const plotWidth = chartWidth - padding * 2;
    const plotHeight = chartHeight - padding * 2;

    const maxAge = 24;
    const minWeight = 2;
    const maxWeight = 14;
    const weightRange = maxWeight - minWeight;

    const getX = (month) => padding + (month / maxAge) * plotWidth;
    const getY = (weight) => chartHeight - padding - ((weight - minWeight) / weightRange) * plotHeight;

    return (
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="border border-border rounded-lg">
        {/* Grid lines */}
        {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((month) => (
          <line
            key={`grid-${month}`}
            x1={getX(month)}
            y1={padding}
            x2={getX(month)}
            y2={chartHeight - padding}
            stroke="#e5e5e5"
            strokeDasharray="2"
          />
        ))}

        {/* Percentile curves */}
        {[
          { percentile: 'p3', colour: '#a3a3a3', opacity: 0.5 },
          { percentile: 'p15', colour: '#d97706', opacity: 0.6 },
          { percentile: 'p50', colour: '#2563eb', opacity: 0.8 },
          { percentile: 'p85', colour: '#d97706', opacity: 0.6 },
          { percentile: 'p97', colour: '#a3a3a3', opacity: 0.5 },
        ].map(({ percentile, colour, opacity }) => {
          const points = whoData.weight[results.sex === 'male' ? 'male' : 'female'].months
            .map((month, idx) => {
              const value =
                whoData.weight[results.sex === 'male' ? 'male' : 'female'].values[idx] *
                percentileMultipliers[percentile];
              return `${getX(month)},${getY(value)}`;
            })
            .join(' ');

          return (
            <polyline
              key={`curve-${percentile}`}
              points={points}
              fill="none"
              stroke={colour}
              strokeWidth="2"
              opacity={opacity}
            />
          );
        })}

        {/* Baby's measurement point */}
        <circle cx={getX(results.age)} cy={getY(results.weightKg)} r="5" fill="#2563eb" stroke="white" strokeWidth="2" />

        {/* Axes */}
        <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#1a1a1a" strokeWidth="2" />

        {/* Labels */}
        <text x={chartWidth / 2} y={chartHeight - 5} textAnchor="middle" className="text-xs fill-text-secondary">
          Age (months)
        </text>
        <text x="15" y={chartHeight / 2} textAnchor="middle" className="text-xs fill-text-secondary" transform={`rotate(-90 15 ${chartHeight / 2})`}>
          Weight (kg)
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Baby's Measurements</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Age (months, 0-24)</label>
              <input
                type="number"
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
                placeholder="12"
                min="0"
                max="24"
                step="0.1"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  placeholder="5.5"
                  min="0"
                  step="0.1"
                  className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="w-20 px-3 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Length / Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={lengthValue}
                  onChange={(e) => setLengthValue(e.target.value)}
                  placeholder="70"
                  min="0"
                  step="0.1"
                  className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value)}
                  className="w-20 px-3 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Weight Percentile */}
          <Card className={`border-2 border-${results.weightStatus.colour} bg-${results.weightStatus.colour}/5`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-text-primary font-semibold mb-2">Weight-for-Age</h3>
                <p className={`text-lg font-bold text-${results.weightStatus.colour}`}>{results.weightPercentile}th Percentile</p>
                <p className={`text-sm text-${results.weightStatus.colour} font-medium mt-1`}>{results.weightStatus.label}</p>
              </div>

              <p className="text-sm text-text-secondary">
                Your baby weighs more than approximately <strong>{results.weightPercentile}%</strong> of babies their age and sex. This is within the expected range for healthy growth.
              </p>

              <div className="text-xs text-text-secondary space-y-1 bg-white rounded-lg p-3">
                <p>
                  <strong>Current weight:</strong> {results.weightKg.toFixed(2)} kg
                </p>
                <p>
                  <strong>Expected weight (50th percentile):</strong> {results.weight50.toFixed(2)} kg
                </p>
              </div>
            </div>
          </Card>

          {/* Length Percentile */}
          <Card className={`border-2 border-${results.lengthStatus.colour} bg-${results.lengthStatus.colour}/5`}>
            <div className="space-y-4">
              <div>
                <h3 className="text-text-primary font-semibold mb-2">Length/Height-for-Age</h3>
                <p className={`text-lg font-bold text-${results.lengthStatus.colour}`}>{results.lengthPercentile}th Percentile</p>
                <p className={`text-sm text-${results.lengthStatus.colour} font-medium mt-1`}>{results.lengthStatus.label}</p>
              </div>

              <p className="text-sm text-text-secondary">
                Your baby is taller than approximately <strong>{results.lengthPercentile}%</strong> of babies their age and sex. This is within the expected range for healthy growth.
              </p>

              <div className="text-xs text-text-secondary space-y-1 bg-white rounded-lg p-3">
                <p>
                  <strong>Current length:</strong> {results.lengthCm.toFixed(1)} cm
                </p>
                <p>
                  <strong>Expected length (50th percentile):</strong> {results.length50.toFixed(1)} cm
                </p>
              </div>
            </div>
          </Card>

          {/* Growth Chart Visualization */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Weight Growth Chart (WHO Standards)</h3>
              <div className="overflow-x-auto">{renderChart()}</div>
              <p className="text-xs text-text-secondary text-center">
                Blue line = 50th percentile | Orange = 15th & 85th percentiles | Grey = 3rd & 97th percentiles | Blue dot = Your baby
              </p>
            </div>
          </Card>

          {/* Percentile Ranges */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Percentile Reference</h3>

              <div className="space-y-3 text-sm">
                <div className="bg-surface rounded-lg p-3">
                  <p className="font-medium text-text-primary mb-2">Weight (kg)</p>
                  <div className="space-y-1 text-text-secondary">
                    <div className="flex justify-between">
                      <span>3rd percentile:</span>
                      <span className="font-mono">{results.weightPercentiles.p3.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>15th percentile:</span>
                      <span className="font-mono">{results.weightPercentiles.p15.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between bg-accent/10 -mx-3 px-3 py-1">
                      <span className="font-medium">50th percentile (median):</span>
                      <span className="font-mono font-bold">{results.weightPercentiles.p50.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>85th percentile:</span>
                      <span className="font-mono">{results.weightPercentiles.p85.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>97th percentile:</span>
                      <span className="font-mono">{results.weightPercentiles.p97.toFixed(2)} kg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-lg p-3">
                  <p className="font-medium text-text-primary mb-2">Length (cm)</p>
                  <div className="space-y-1 text-text-secondary">
                    <div className="flex justify-between">
                      <span>3rd percentile:</span>
                      <span className="font-mono">{results.lengthPercentiles.p3.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>15th percentile:</span>
                      <span className="font-mono">{results.lengthPercentiles.p15.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between bg-accent/10 -mx-3 px-3 py-1">
                      <span className="font-medium">50th percentile (median):</span>
                      <span className="font-mono font-bold">{results.lengthPercentiles.p50.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>85th percentile:</span>
                      <span className="font-mono">{results.lengthPercentiles.p85.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>97th percentile:</span>
                      <span className="font-mono">{results.lengthPercentiles.p97.toFixed(1)} cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      {!results && (ageMonths || weightValue || lengthValue) && (
        <div className="bg-info/10 border border-info rounded-lg p-4 text-text-secondary text-sm">
          Enter age, weight, and length to calculate growth percentiles.
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-warning/10 border border-warning rounded-lg p-4 text-xs text-warning space-y-2">
        <p className="font-semibold">Important Disclaimer:</p>
        <p>
          This calculator is for informational purposes only and uses WHO growth standards. It is NOT a substitute for professional medical advice. Always consult your health visitor, GP, or paediatrician if you have concerns about your baby's growth, development, or health. Every baby grows at their own pace, and small variations are normal.
        </p>
      </div>
    </div>
  );
}
