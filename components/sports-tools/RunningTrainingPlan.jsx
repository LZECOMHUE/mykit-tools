'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateTrainingPlanPDF } from '@/lib/worksheet-pdf';

const RACE_TYPES = {
  '5K': { distance: 5, weeks: [8, 12, 16] },
  '10K': { distance: 10, weeks: [10, 12, 16] },
  'Half Marathon': { distance: 21.1, weeks: [12, 16, 20] },
  'Marathon': { distance: 42.2, weeks: [16, 20] },
};

const FITNESS_LEVELS = {
  beginner: { label: 'Beginner (never run)', baseWeekly: 15, label_km: true },
  novice: { label: 'Novice (run occasionally)', baseWeekly: 25, label_km: true },
  intermediate: { label: 'Intermediate (run regularly)', baseWeekly: 35, label_km: true },
  advanced: { label: 'Advanced (race regularly)', baseWeekly: 45, label_km: true },
};

const WORKOUT_TYPES = {
  easy: { name: 'Easy Run', pace: 'Easy', color: 'bg-blue-100', icon: '🏃' },
  tempo: { name: 'Tempo Run', pace: 'Moderate', color: 'bg-yellow-100', icon: '⚡' },
  intervals: { name: 'Intervals', pace: 'Hard', color: 'bg-red-100', icon: '🔥' },
  long: { name: 'Long Run', pace: 'Easy-Moderate', color: 'bg-purple-100', icon: '🏅' },
  cross: { name: 'Cross Training', pace: 'Varied', color: 'bg-green-100', icon: '🚴' },
  rest: { name: 'Rest/Recovery', pace: 'Rest', color: 'bg-gray-100', icon: '😴' },
};

const generateTrainingPlan = (config) => {
  const { race, level, weeks, daysPerWeek, startDate, units } = config;
  const raceDistance = RACE_TYPES[race].distance;
  const baseWeekly = FITNESS_LEVELS[level].baseWeekly;
  const weeksDays = [];

  for (let w = 0; w < weeks; w++) {
    const isTaper = w >= weeks - 2;
    const isCutback = (w + 1) % 4 === 0 && !isTaper;
    const progressionFactor = isTaper ? 0.7 : isCutback ? 0.8 : 1 + (w / weeks) * 0.3;

    const weeklyDistance = baseWeekly * progressionFactor;
    const days = [];

    // Distribute workouts
    const workoutConfig = {
      3: ['easy', 'easy', 'long', 'rest', 'rest', 'rest', 'rest'],
      4: ['easy', 'tempo', 'easy', 'long', 'rest', 'rest', 'rest'],
      5: ['easy', 'tempo', 'easy', 'intervals', 'long', 'rest', 'rest'],
      6: ['easy', 'tempo', 'easy', 'intervals', 'easy', 'long', 'rest'],
    };

    const config_workouts = workoutConfig[daysPerWeek] || workoutConfig[3];

    let dailyTotal = 0;
    let longRunDistance = weeklyDistance * 0.35;

    for (let d = 0; d < 7; d++) {
      const workoutType = config_workouts[d];
      let distance = 0;

      if (workoutType === 'long') {
        distance = longRunDistance;
      } else if (workoutType === 'rest') {
        distance = 0;
      } else {
        const remaining = weeklyDistance - dailyTotal - longRunDistance;
        const activeRunDays = config_workouts.filter((w) => w !== 'rest' && w !== 'long').length;
        distance = remaining / activeRunDays;
      }

      days.push({
        day: d,
        type: workoutType,
        distance: parseFloat(distance.toFixed(1)),
      });

      if (workoutType !== 'rest') {
        dailyTotal += distance;
      }
    }

    weeksDays.push({
      week: w + 1,
      days,
      weeklyTotal: parseFloat(dailyTotal.toFixed(1)),
      isTaper,
      isCutback,
    });
  }

  return weeksDays;
};

const getWorkoutTips = (type) => {
  const tips = {
    easy: 'Should be conversational pace. Recover slowly if needed.',
    tempo: 'Comfortably hard. You can speak short sentences.',
    intervals: 'Fast repeats with recovery periods. Push hard on the fast sections.',
    long: 'Build endurance gradually. Start slow, finish strong.',
    cross: 'Swimming, cycling, strength training. Low impact recovery.',
    rest: 'Take the day off or very light activity like walking.',
  };
  return tips[type] || '';
};

export default function RunningTrainingPlan() {
  const [race, setRace] = useState('5K');
  const [level, setLevel] = useState('beginner');
  const [weeks, setWeeks] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [units, setUnits] = useState('km');
  const [plan, setPlan] = useState(null);
  const [expandedTips, setExpandedTips] = useState(new Set());

  const handleGeneratePlan = useCallback(() => {
    const generatedPlan = generateTrainingPlan({
      race,
      level,
      weeks: parseInt(weeks),
      daysPerWeek: parseInt(daysPerWeek),
      startDate,
      units,
    });
    setPlan(generatedPlan);
  }, [race, level, weeks, daysPerWeek, startDate, units]);

  const raceTypeWeeks = useMemo(() => {
    return RACE_TYPES[race]?.weeks || [8, 12, 16];
  }, [race]);

  const downloadPlan = useCallback(() => {
    if (!plan) return;
    generateTrainingPlanPDF({ race, plan, units, startDate });
  }, [plan, race, units, startDate]);

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Training Plan Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Goal Race</label>
            <select
              value={race}
              onChange={(e) => setRace(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            >
              {Object.keys(RACE_TYPES).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Current Fitness Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            >
              {Object.entries(FITNESS_LEVELS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Training Weeks</label>
            <select
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            >
              {raceTypeWeeks.map((w) => (
                <option key={w} value={w}>
                  {w} weeks
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Days Per Week</label>
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            >
              {[3, 4, 5, 6].map((d) => (
                <option key={d} value={d}>
                  {d} days/week
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Units</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="km">Kilometres</option>
              <option value="mi">Miles</option>
            </select>
          </div>
        </div>

        <Button onClick={handleGeneratePlan} className="w-full mt-4">
          Generate Training Plan
        </Button>
      </Card>

      {/* Workout Type Reference */}
      {plan && (
        <Card>
          <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase">Workout Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(WORKOUT_TYPES).map(([key, type]) => (
              <div key={key} className={`p-2 rounded-[var(--radius-input)] ${type.color}`}>
                <div className="font-medium text-sm text-text-primary">{type.icon} {type.name}</div>
                <div className="text-xs text-text-secondary">{type.pace}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Training Plan */}
      {plan && (
        <>
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">{race} Plan</h3>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {plan.map((week) => (
                <div
                  key={week.week}
                  className={`p-4 rounded-[var(--radius-input)] border ${
                    week.isTaper
                      ? 'bg-success bg-opacity-5 border-success'
                      : week.isCutback
                      ? 'bg-warning bg-opacity-5 border-warning'
                      : 'bg-surface border-border'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-bold text-text-primary">Week {week.week}</h4>
                      <p className="text-sm text-text-secondary">
                        {week.weeklyTotal}{units}/week
                        {week.isTaper && ' (Taper)'}
                        {week.isCutback && ' (Cutback)'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 bg-white rounded-lg border border-border flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono font-bold text-2xl text-accent">{week.weeklyTotal}</div>
                          <div className="text-xs text-text-muted">{units}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {week.days.map((day, idx) => {
                      const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                      const type = WORKOUT_TYPES[day.type];
                      return (
                        <div key={idx} className="text-center">
                          <div className="text-xs font-medium text-text-secondary mb-1">{dayNames[day.day]}</div>
                          <div
                            className={`rounded-[var(--radius-input)] p-2 min-h-16 flex flex-col items-center justify-center ${type.color}`}
                          >
                            {day.type !== 'rest' ? (
                              <>
                                <div className="text-sm">{type.icon}</div>
                                <div className="font-mono font-bold text-sm text-text-primary mt-1">
                                  {day.distance}
                                </div>
                              </>
                            ) : (
                              <div className="text-lg">💤</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Expandable Tips */}
                  <div className="mt-3 space-y-1">
                    {week.days
                      .filter((d) => d.type !== 'rest')
                      .map((day, idx) => {
                        const tipKey = `${week.week}-${day.day}`;
                        const isExpanded = expandedTips.has(tipKey);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const newExpanded = new Set(expandedTips);
                              if (isExpanded) {
                                newExpanded.delete(tipKey);
                              } else {
                                newExpanded.add(tipKey);
                              }
                              setExpandedTips(newExpanded);
                            }}
                            className="w-full text-left p-2 rounded text-xs bg-white border border-border hover:bg-surface transition"
                          >
                            <span className="font-medium text-text-primary">
                              {WORKOUT_TYPES[day.type]?.name}
                            </span>
                            {isExpanded && (
                              <div className="mt-2 text-text-secondary">{getWorkoutTips(day.type)}</div>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={downloadPlan} className="w-full">
            Download PDF
          </Button>

          <Card className="bg-info bg-opacity-5 border border-info">
            <h4 className="font-medium text-text-primary mb-2">Training Tips</h4>
            <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>Follow the pace guidance for each workout type</li>
              <li>The final 2 weeks are tapered to peak for race day</li>
              <li>Every 4th week is a cutback week for recovery</li>
              <li>Listen to your body and adjust if needed</li>
              <li>Strength training and stretching recommended on rest days</li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
