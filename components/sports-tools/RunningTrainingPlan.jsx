'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateTrainingPlanPDF } from '@/lib/worksheet-pdf';

// Research-backed race configs
// Sources: Hal Higdon, Jack Daniels Running Formula, Runner's World plans
const RACE_CONFIGS = {
  '5K': {
    distance: 5,
    weekOptions: { beginner: 8, intermediate: 6, advanced: 6 },
    peakWeekly: { beginner: 20, intermediate: 30, advanced: 40 },
    longRunPeak: { beginner: 8, intermediate: 10, advanced: 12 },
  },
  '10K': {
    distance: 10,
    weekOptions: { beginner: 12, intermediate: 10, advanced: 8 },
    peakWeekly: { beginner: 28, intermediate: 40, advanced: 55 },
    longRunPeak: { beginner: 12, intermediate: 16, advanced: 18 },
  },
  'Half Marathon': {
    distance: 21.1,
    weekOptions: { beginner: 16, intermediate: 12, advanced: 12 },
    peakWeekly: { beginner: 35, intermediate: 50, advanced: 65 },
    longRunPeak: { beginner: 18, intermediate: 22, advanced: 24 },
  },
  'Marathon': {
    distance: 42.2,
    weekOptions: { beginner: 20, intermediate: 18, advanced: 16 },
    peakWeekly: { beginner: 50, intermediate: 65, advanced: 85 },
    longRunPeak: { beginner: 32, intermediate: 35, advanced: 38 },
  },
};

const LEVELS = [
  { value: 'beginner', label: 'Beginner (new to running or this distance)' },
  { value: 'intermediate', label: 'Intermediate (run 3+ times per week)' },
  { value: 'advanced', label: 'Advanced (race regularly, structured training)' },
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const WORKOUT_TYPES = {
  easy: { name: 'Easy Run', color: 'bg-blue-100 text-blue-800', icon: '🏃', desc: 'Conversational pace. You should be able to talk in full sentences. Builds aerobic base without excess fatigue.' },
  tempo: { name: 'Tempo Run', color: 'bg-yellow-100 text-yellow-800', icon: '⚡', desc: 'Comfortably hard pace you could hold for about an hour in a race. Improves lactate threshold.' },
  intervals: { name: 'Intervals', color: 'bg-red-100 text-red-800', icon: '🔥', desc: 'Fast repeats (e.g. 6x800m) with recovery jogs between. Builds speed and VO2 max.' },
  long: { name: 'Long Run', color: 'bg-purple-100 text-purple-800', icon: '🏅', desc: 'Slow and steady at easy pace. The cornerstone of endurance training. Builds stamina and mental toughness.' },
  cross: { name: 'Cross Training', color: 'bg-green-100 text-green-800', icon: '🚴', desc: 'Cycling, swimming, or strength work. Maintains fitness with lower impact on joints.' },
  rest: { name: 'Rest Day', color: 'bg-gray-100 text-gray-500', icon: '😴', desc: 'Complete rest or very easy walking. Essential for adaptation and injury prevention.' },
};

// Build a research-backed weekly schedule template
// Beginner: 3 runs/week, Intermediate: 4-5 runs, Advanced: 5-6 runs
function getWeekTemplate(level, phase) {
  // phase: 'base' | 'build' | 'peak' | 'taper'
  if (level === 'beginner') {
    if (phase === 'taper') return ['easy', 'rest', 'easy', 'rest', 'rest', 'easy', 'rest'];
    return ['easy', 'rest', 'easy', 'rest', 'rest', 'long', 'rest'];
  }
  if (level === 'intermediate') {
    if (phase === 'taper') return ['easy', 'rest', 'easy', 'rest', 'easy', 'rest', 'rest'];
    if (phase === 'base') return ['easy', 'rest', 'easy', 'rest', 'easy', 'long', 'rest'];
    // build/peak: add quality sessions
    return ['easy', 'tempo', 'rest', 'easy', 'rest', 'long', 'rest'];
  }
  // advanced
  if (phase === 'taper') return ['easy', 'tempo', 'rest', 'easy', 'rest', 'easy', 'rest'];
  if (phase === 'base') return ['easy', 'easy', 'tempo', 'rest', 'easy', 'long', 'rest'];
  // build/peak
  return ['easy', 'intervals', 'easy', 'tempo', 'rest', 'long', 'rest'];
}

function generatePlan(race, level) {
  const config = RACE_CONFIGS[race];
  const totalWeeks = config.weekOptions[level];
  const peakWeekly = config.peakWeekly[level];
  const longRunPeak = config.longRunPeak[level];

  // Phase breakdown (research standard):
  // Base: ~30% of weeks, Build: ~40%, Peak: ~15%, Taper: ~15% (min 2 weeks)
  const taperWeeks = Math.max(2, Math.round(totalWeeks * 0.12));
  const peakWeeks = Math.max(1, Math.round(totalWeeks * 0.15));
  const buildWeeks = Math.max(2, Math.round(totalWeeks * 0.40));
  const baseWeeks = totalWeeks - buildWeeks - peakWeeks - taperWeeks;

  const plan = [];

  for (let w = 0; w < totalWeeks; w++) {
    let phase = 'base';
    if (w >= baseWeeks + buildWeeks + peakWeeks) phase = 'taper';
    else if (w >= baseWeeks + buildWeeks) phase = 'peak';
    else if (w >= baseWeeks) phase = 'build';

    // Gradual progression with cutback weeks every 4th week
    const isCutback = (w + 1) % 4 === 0 && phase !== 'taper';
    const isTaper = phase === 'taper';

    // Calculate target weekly volume
    let weekProgress;
    if (phase === 'base') {
      // Ramp from 50% to 70% of peak
      weekProgress = 0.5 + (w / Math.max(1, baseWeeks - 1)) * 0.2;
    } else if (phase === 'build') {
      // Ramp from 70% to 90% of peak
      const buildIdx = w - baseWeeks;
      weekProgress = 0.7 + (buildIdx / Math.max(1, buildWeeks - 1)) * 0.2;
    } else if (phase === 'peak') {
      weekProgress = 1.0;
    } else {
      // Taper: reduce from 70% down to 40%
      const taperIdx = w - (baseWeeks + buildWeeks + peakWeeks);
      weekProgress = 0.7 - (taperIdx / Math.max(1, taperWeeks - 1)) * 0.3;
    }

    if (isCutback) weekProgress *= 0.75;

    const targetWeekly = Math.round(peakWeekly * weekProgress);

    // Long run distance (peaks at longRunPeak, tapers down)
    let longTarget;
    if (phase === 'taper') {
      longTarget = Math.round(longRunPeak * 0.5);
    } else if (phase === 'peak') {
      longTarget = longRunPeak;
    } else {
      // Gradual build: start at 40% of peak long run, build to peak
      const overallProgress = w / Math.max(1, baseWeeks + buildWeeks + peakWeeks - 1);
      longTarget = Math.round(longRunPeak * (0.4 + overallProgress * 0.6));
    }
    if (isCutback) longTarget = Math.round(longTarget * 0.7);

    const template = getWeekTemplate(level, phase);
    const runDays = template.filter(t => t !== 'rest' && t !== 'cross');
    const nonLongRuns = runDays.filter(t => t !== 'long');
    const remainingDistance = Math.max(0, targetWeekly - longTarget);
    const perRun = nonLongRuns.length > 0 ? remainingDistance / nonLongRuns.length : 0;

    // Distribute: tempo/interval runs get slightly more, easy gets slightly less
    const days = template.map((type, dayIdx) => {
      let distance = 0;
      if (type === 'long') {
        distance = longTarget;
      } else if (type === 'rest' || type === 'cross') {
        distance = 0;
      } else if (type === 'tempo' || type === 'intervals') {
        distance = Math.round(perRun * 1.1);
      } else {
        // easy run
        distance = Math.round(perRun * 0.9) || Math.round(perRun);
      }

      return {
        day: dayIdx, // 0=Mon ... 6=Sun
        type,
        workout: WORKOUT_TYPES[type].name,
        distance: Math.max(0, distance),
      };
    });

    // Recalculate actual total
    const weeklyTotal = days.reduce((sum, d) => sum + d.distance, 0);

    plan.push({
      week: w + 1,
      phase,
      days,
      weeklyTotal,
      longRun: longTarget,
      isTaper,
      isCutback,
    });
  }

  return plan;
}

export default function RunningTrainingPlan() {
  const [race, setRace] = useState('5K');
  const [level, setLevel] = useState('beginner');
  const [units, setUnits] = useState('km');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7)); // next Monday
    return d.toISOString().split('T')[0];
  });
  const [plan, setPlan] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);

  const config = RACE_CONFIGS[race];
  const totalWeeks = config.weekOptions[level];

  const handleGenerate = useCallback(() => {
    const generated = generatePlan(race, level);
    setPlan(generated);
    setSelectedWeek(0);
  }, [race, level]);

  const displayDistance = useCallback((km) => {
    if (units === 'mi') return Math.round(km * 0.621371);
    return km;
  }, [units]);

  const displayPlan = useMemo(() => {
    if (!plan) return null;
    return plan.map(week => ({
      ...week,
      weeklyTotal: displayDistance(week.weeklyTotal),
      longRun: displayDistance(week.longRun),
      days: week.days.map(d => ({
        ...d,
        distance: displayDistance(d.distance),
      })),
    }));
  }, [plan, displayDistance]);

  const downloadPlan = useCallback(() => {
    if (!displayPlan) return;
    // Pass workout names as strings for PDF compatibility
    const pdfPlan = displayPlan.map(week => ({
      ...week,
      days: week.days.map(d => ({
        ...d,
        day: DAY_NAMES[d.day] || String(d.day),
        workout: String(WORKOUT_TYPES[d.type]?.name || 'Rest'),
        distance: d.distance,
      })),
    }));
    generateTrainingPlanPDF({ race, plan: pdfPlan, units, startDate });
  }, [displayPlan, race, units, startDate]);

  const currentWeek = displayPlan ? displayPlan[selectedWeek] : null;

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Plan Your Training</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Goal Race</label>
            <select
              value={race}
              onChange={(e) => { setRace(e.target.value); setPlan(null); }}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:border-accent"
            >
              {Object.keys(RACE_CONFIGS).map(r => (
                <option key={r} value={r}>{r} ({RACE_CONFIGS[r].distance} km)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Experience Level</label>
            <select
              value={level}
              onChange={(e) => { setLevel(e.target.value); setPlan(null); }}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:border-accent"
            >
              {LEVELS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Units</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:border-accent"
            >
              <option value="km">Kilometres</option>
              <option value="mi">Miles</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Start Date (Monday)</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-surface rounded-[var(--radius-input)] text-sm text-text-secondary">
          <span className="font-medium text-text-primary">{totalWeeks}-week plan</span>
          {' '}for {race} at {LEVELS.find(l => l.value === level)?.label.split('(')[0].trim().toLowerCase()} level.
          Peak weekly volume: ~<span className="font-mono">{displayDistance(config.peakWeekly[level])}</span> {units}.
          Longest run: ~<span className="font-mono">{displayDistance(config.longRunPeak[level])}</span> {units}.
        </div>

        <Button onClick={handleGenerate} className="w-full mt-4">
          Generate Training Plan
        </Button>
      </Card>

      {displayPlan && (
        <>
          {/* Workout type key */}
          <Card>
            <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">Workout Types</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(WORKOUT_TYPES).map(([key, type]) => (
                <div key={key} className={`p-2 rounded-[var(--radius-input)] ${type.color}`}>
                  <div className="font-medium text-sm">{type.icon} {type.name}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Overview bar chart */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Weekly Volume Overview</h3>
            <div className="flex items-end gap-1 h-32">
              {displayPlan.map((week, idx) => {
                const maxVol = Math.max(...displayPlan.map(w => w.weeklyTotal));
                const height = maxVol > 0 ? (week.weeklyTotal / maxVol) * 100 : 0;
                const phaseColor = week.isTaper ? 'bg-green-400' : week.isCutback ? 'bg-amber-400' : week.phase === 'peak' ? 'bg-red-400' : week.phase === 'build' ? 'bg-blue-500' : 'bg-blue-300';
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedWeek(idx)}
                    className={`flex-1 rounded-t transition-all cursor-pointer ${phaseColor} ${selectedWeek === idx ? 'ring-2 ring-accent ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={`Week ${week.week}: ${week.weeklyTotal} ${units}`}
                  />
                );
              })}
            </div>
            <div className="flex gap-1 mt-1">
              {displayPlan.map((week, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <span className={`text-[10px] font-mono ${selectedWeek === idx ? 'font-bold text-accent' : 'text-text-muted'}`}>
                    {week.week}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-300 inline-block" /> Base</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block" /> Build</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> Peak</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> Taper</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Cutback</span>
            </div>
          </Card>

          {/* Selected week detail */}
          {currentWeek && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    Week {currentWeek.week}
                    <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${
                      currentWeek.isTaper ? 'bg-green-100 text-green-700' :
                      currentWeek.isCutback ? 'bg-amber-100 text-amber-700' :
                      currentWeek.phase === 'peak' ? 'bg-red-100 text-red-700' :
                      currentWeek.phase === 'build' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {currentWeek.isTaper ? 'Taper' : currentWeek.isCutback ? 'Cutback' : currentWeek.phase.charAt(0).toUpperCase() + currentWeek.phase.slice(1)}
                    </span>
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Total: <span className="font-mono font-bold">{currentWeek.weeklyTotal}</span> {units}
                    {' / '}Long run: <span className="font-mono font-bold">{currentWeek.longRun}</span> {units}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                    disabled={selectedWeek === 0}
                    className="px-3 py-1 text-sm border border-border rounded-[var(--radius-input)] disabled:opacity-30 hover:bg-surface cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setSelectedWeek(Math.min(displayPlan.length - 1, selectedWeek + 1))}
                    disabled={selectedWeek === displayPlan.length - 1}
                    className="px-3 py-1 text-sm border border-border rounded-[var(--radius-input)] disabled:opacity-30 hover:bg-surface cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Day cards */}
              <div className="space-y-2">
                {currentWeek.days.map((day, idx) => {
                  const type = WORKOUT_TYPES[day.type];
                  return (
                    <div key={idx} className={`flex items-center gap-3 p-3 rounded-[var(--radius-input)] border border-border ${day.type === 'rest' ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="w-10 text-center">
                        <div className="text-xs font-medium text-text-muted">{DAY_NAMES[day.day]}</div>
                        <div className="text-lg">{type.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-text-primary">{type.name}</div>
                        <div className="text-xs text-text-secondary mt-0.5">{type.desc}</div>
                      </div>
                      {day.distance > 0 && (
                        <div className="text-right">
                          <div className="font-mono font-bold text-lg text-accent">{day.distance}</div>
                          <div className="text-xs text-text-muted">{units}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Download */}
          <Button onClick={downloadPlan} className="w-full">
            Download Training Plan PDF
          </Button>

          {/* Training guidance */}
          <Card className="bg-blue-50 border-blue-200">
            <h4 className="font-heading font-bold text-text-primary mb-2">Training Guidance</h4>
            <div className="text-sm text-text-secondary space-y-2">
              <p><span className="font-medium text-text-primary">Easy runs</span> should feel genuinely easy. If you can't hold a conversation, slow down. Most of your running (about 80%) should be at this effort.</p>
              <p><span className="font-medium text-text-primary">Long runs</span> build endurance gradually. Run these at easy pace. Walk breaks are fine and encouraged for beginners.</p>
              <p><span className="font-medium text-text-primary">Tempo runs</span> are at your lactate threshold, roughly the pace you could race for an hour. They should feel comfortably hard.</p>
              <p><span className="font-medium text-text-primary">Intervals</span> are short fast efforts (e.g. 400m-1600m repeats) with recovery jogs. These build speed and VO2 max.</p>
              <p><span className="font-medium text-text-primary">Cutback weeks</span> reduce volume by ~25% every 4th week to let your body adapt. Do not skip these.</p>
              <p><span className="font-medium text-text-primary">Taper</span> in the final 2 weeks reduces volume significantly so you arrive at race day fresh, not fatigued.</p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
