'use client';

import { useState, useMemo } from 'react';

const ageScreenTimeGuidelines = {
  '0-18m': { max: 0, note: 'No screen time recommended' },
  '18m-2y': { max: 1, note: 'Only high-quality programming, co-watch' },
  '2-5': { max: 1, note: 'Consistent limits, educational content' },
  '6-12': { max: 2, note: 'Balanced with other activities' },
  '13-18': { max: 2, note: 'Encourage responsible use' },
};

export default function ScreenTimeCalculator() {
  const [ageGroup, setAgeGroup] = useState('6-12');
  const [schoolHours, setSchoolHours] = useState(6);
  const [sleepHours, setSleepHours] = useState(10);
  const [mealTime, setMealTime] = useState(2);
  const [activities, setActivities] = useState({
    sports: 1,
    homework: 1.5,
    reading: 0.5,
    other: 1,
  });

  const guideline = ageScreenTimeGuidelines[ageGroup];

  const hoursCalculation = useMemo(() => {
    const awakeHours = 24 - sleepHours;
    const committedHours = schoolHours + mealTime + Object.values(activities).reduce((a, b) => a + b, 0);
    const discretionaryHours = awakeHours - committedHours;
    const recommendedScreen = guideline.max;

    return {
      awakeHours: awakeHours.toFixed(1),
      committedHours: committedHours.toFixed(1),
      discretionaryHours: discretionaryHours.toFixed(1),
      recommendedScreen: recommendedScreen.toFixed(1),
      screenVsDiscretionary: ((recommendedScreen / discretionaryHours) * 100).toFixed(0),
    };
  }, [ageGroup, schoolHours, sleepHours, mealTime, activities, guideline]);

  const handleActivityChange = (key, value) => {
    setActivities({
      ...activities,
      [key]: parseFloat(value) || 0,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Configuration */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Child's Age Group</label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          >
            <option value="0-18m">0-18 months</option>
            <option value="18m-2y">18 months - 2 years</option>
            <option value="2-5">2-5 years</option>
            <option value="6-12">6-12 years</option>
            <option value="13-18">13-18 years</option>
          </select>
          <p className="text-xs text-text-muted mt-1">WHO/AAP Guidelines</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Sleep (hours)</label>
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value) || 0)}
              min="6"
              max="14"
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">School (hours)</label>
            <input
              type="number"
              value={schoolHours}
              onChange={(e) => setSchoolHours(parseFloat(e.target.value) || 0)}
              min="0"
              max="8"
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Meals (hours)</label>
            <input
              type="number"
              value={mealTime}
              onChange={(e) => setMealTime(parseFloat(e.target.value) || 0)}
              min="0"
              max="5"
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Other Activities (hours/day)</label>
          <div className="space-y-2">
            {Object.entries(activities).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-text-secondary text-sm capitalize w-24">{key}:</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleActivityChange(key, e.target.value)}
                  min="0"
                  max="12"
                  step="0.5"
                  className="flex-1 px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guideline Alert */}
      <div className={`rounded-[var(--radius-card)] p-4 border ${
        guideline.max === 0 ? 'bg-warning/10 border-warning' : 'bg-info/10 border-info'
      }`}>
        <p className="text-sm font-medium text-text-primary">{guideline.note}</p>
        <p className="text-xs text-text-secondary mt-1">Recommended maximum: {guideline.max} hour{guideline.max !== 1 ? 's' : ''}/day</p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Awake Hours</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{hoursCalculation.awakeHours}h</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Committed Time</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{hoursCalculation.committedHours}h</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Discretionary Hours</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{hoursCalculation.discretionaryHours}h</p>
          </div>

          <div className="bg-accent-muted border border-accent rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-xs mb-1">Recommended Screen</p>
            <p className="font-mono-num text-2xl font-bold text-accent">{hoursCalculation.recommendedScreen}h</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-secondary text-sm mb-2">Screen Time as % of Discretionary Time</p>
          <div className="w-full bg-border rounded-full h-6 overflow-hidden">
            <div
              className="bg-accent h-full transition-all"
              style={{ width: `${Math.min(100, hoursCalculation.screenVsDiscretionary)}%` }}
            ></div>
          </div>
          <p className="text-text-primary font-mono-num text-sm mt-2">{hoursCalculation.screenVsDiscretionary}%</p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-2">
        <p className="text-text-primary font-semibold text-sm">📋 Tips for Screen Time Management:</p>
        <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
          <li>Set consistent limits on school nights and weekends</li>
          <li>No screens 1 hour before bedtime</li>
          <li>No screens during meals</li>
          <li>Choose educational, high-quality content</li>
          <li>Co-watch when possible to discuss content</li>
        </ul>
      </div>
    </div>
  );
}
