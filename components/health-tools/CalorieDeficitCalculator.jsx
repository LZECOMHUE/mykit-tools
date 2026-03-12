'use client';

import { useState, useMemo } from 'react';

export default function CalorieDeficitCalculator() {
  const [currentWeight, setCurrentWeight] = useState(100);
  const [goalWeight, setGoalWeight] = useState(85);
  const [timeframeWeeks, setTimeframeWeeks] = useState(12);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [weightUnit, setWeightUnit] = useState('kg');

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    'very-active': 1.725,
    'extremely-active': 1.9,
  };

  const activityLabels = {
    sedentary: 'Sedentary',
    light: 'Light Activity',
    moderate: 'Moderate Activity',
    'very-active': 'Very Active',
    'extremely-active': 'Extremely Active',
  };

  const calculations = useMemo(() => {
    const weightToLose = currentWeight - goalWeight;
    const weeksPositive = Math.max(1, timeframeWeeks);
    const weeklyLossTarget = weightToLose / weeksPositive;
    const dailyDeficitNeeded = (weeklyLossTarget * 7700) / 7;

    const bmr = 1700;
    const tdee = bmr * activityFactors[activityLevel];
    const dailyCalories = tdee - dailyDeficitNeeded;

    const isSafeDeficit = dailyDeficitNeeded <= 1000;
    const isReasonableDeficit = dailyDeficitNeeded <= 700;

    const estimatedWeeks = (weightToLose * 7700) / (dailyDeficitNeeded * 7);

    return {
      weightToLose: weightToLose.toFixed(1),
      weeklyLossTarget: weeklyLossTarget.toFixed(2),
      dailyDeficitNeeded: Math.round(dailyDeficitNeeded),
      dailyCalories: Math.round(dailyCalories),
      isSafeDeficit,
      isReasonableDeficit,
      tdee: Math.round(tdee),
      estimatedWeeks: Math.round(estimatedWeeks),
    };
  }, [currentWeight, goalWeight, timeframeWeeks, activityLevel, weightUnit]);

  const getMilestones = () => {
    const milestones = [];
    const weightRange = Math.abs(calculations.weightToLose);
    const steps = [25, 50, 75];
    const currentW = parseFloat(currentWeight);

    steps.forEach((step) => {
      if (step < weightRange) {
        const milestoneWeight = currentW - step;
        const weeksToMilestone = (step * 7700) / (calculations.dailyDeficitNeeded * 7);
        milestones.push({
          weight: milestoneWeight.toFixed(1),
          weeks: Math.round(weeksToMilestone),
          percent: Math.round((step / weightRange) * 100),
        });
      }
    });

    return milestones;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Calorie Deficit Calculator</h2>

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

        {/* Current Weight */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Current Weight ({weightUnit})</label>
          <input
            type="number"
            min="20"
            max="300"
            step="0.1"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Goal Weight */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Goal Weight ({weightUnit})</label>
          <input
            type="number"
            min="20"
            max="300"
            step="0.1"
            value={goalWeight}
            onChange={(e) => setGoalWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Timeframe */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Timeframe (weeks)</label>
          <input
            type="number"
            min="1"
            max="104"
            value={timeframeWeeks}
            onChange={(e) => setTimeframeWeeks(Math.max(1, parseInt(e.target.value) || 1))}
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
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Warning */}
        {!calculations.isSafeDeficit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-[var(--radius-input)]">
            <p className="text-sm font-medium text-red-700">⚠️ High Daily Deficit</p>
            <p className="text-xs text-red-600 mt-1">
              A deficit of {calculations.dailyDeficitNeeded} cal/day exceeds the safe limit of 1000 cal/day. Consider extending your timeframe.
            </p>
          </div>
        )}

        {/* Main Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Total Weight Loss</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{calculations.weightToLose}</p>
            <p className="text-xs text-text-secondary mt-1">{weightUnit} to lose</p>
          </div>

          <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Weekly Loss Target</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{calculations.weeklyLossTarget}</p>
            <p className="text-xs text-text-secondary mt-1">{weightUnit} per week</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 rounded-[var(--radius-input)] border border-orange-200">
            <p className="text-xs text-orange-700 font-medium mb-1">Daily Deficit Needed</p>
            <p className="font-mono-num text-2xl font-bold text-orange-600">{calculations.dailyDeficitNeeded}</p>
            <p className="text-xs text-orange-600 mt-1">calories/day</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
            <p className="text-xs text-blue-700 font-medium mb-1">Daily Calorie Target</p>
            <p className="font-mono-num text-2xl font-bold text-blue-600">{calculations.dailyCalories}</p>
            <p className="text-xs text-blue-600 mt-1">to consume</p>
          </div>
        </div>

        {/* Estimated Timeline */}
        <div className="p-4 bg-green-50 rounded-[var(--radius-input)] border border-green-200">
          <p className="text-xs text-green-700 font-medium mb-2">Estimated Timeline</p>
          <p className="font-mono-num text-lg font-bold text-green-600">{calculations.estimatedWeeks} weeks</p>
          <p className="text-xs text-green-600 mt-1">
            At {calculations.dailyDeficitNeeded} cal/day deficit
          </p>
        </div>

        {/* Milestones */}
        {getMilestones().length > 0 && (
          <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-3 font-medium">Milestone Targets</p>
            <div className="space-y-2">
              {getMilestones().map((milestone, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-text-primary font-medium">{milestone.weight} {weightUnit}</span>
                    <span className="text-text-muted ml-2">({milestone.percent}% progress)</span>
                  </div>
                  <span className="font-mono-num text-text-secondary">{milestone.weeks} weeks</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
