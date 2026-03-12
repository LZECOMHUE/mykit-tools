'use client';

import { useState, useMemo, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DIETS = {
  balanced: {
    name: 'Balanced',
    description: 'Standard healthy eating — suits most people',
    protein: 0.30, carbs: 0.40, fat: 0.30,
    color: '#2563eb',
    icon: '⚖️',
  },
  keto: {
    name: 'Keto',
    description: 'Very low carb, high fat — promotes ketosis',
    protein: 0.25, carbs: 0.05, fat: 0.70,
    color: '#7c3aed',
    icon: '🥑',
  },
  lowCarb: {
    name: 'Low Carb',
    description: 'Moderate carb reduction — easier to sustain than keto',
    protein: 0.30, carbs: 0.20, fat: 0.50,
    color: '#0891b2',
    icon: '🥩',
  },
  highProtein: {
    name: 'High Protein',
    description: 'Maximise muscle retention and growth',
    protein: 0.40, carbs: 0.35, fat: 0.25,
    color: '#dc2626',
    icon: '💪',
  },
  mediterranean: {
    name: 'Mediterranean',
    description: 'Heart-healthy with olive oil, fish, whole grains',
    protein: 0.20, carbs: 0.50, fat: 0.30,
    color: '#ea580c',
    icon: '🫒',
  },
  paleo: {
    name: 'Paleo',
    description: 'Whole foods, no grains or dairy',
    protein: 0.30, carbs: 0.25, fat: 0.45,
    color: '#65a30d',
    icon: '🦴',
  },
  vegan: {
    name: 'Vegan',
    description: 'Plant-based with adequate protein emphasis',
    protein: 0.25, carbs: 0.50, fat: 0.25,
    color: '#16a34a',
    icon: '🌱',
  },
  zone: {
    name: 'Zone (40/30/30)',
    description: 'The Zone Diet — balanced hormone response',
    protein: 0.30, carbs: 0.40, fat: 0.30,
    color: '#d97706',
    icon: '🎯',
  },
  carnivore: {
    name: 'Carnivore',
    description: 'Animal products only — very high protein and fat',
    protein: 0.35, carbs: 0.05, fat: 0.60,
    color: '#991b1b',
    icon: '🥓',
  },
  custom: {
    name: 'Custom',
    description: 'Set your own macro split',
    protein: 0.30, carbs: 0.40, fat: 0.30,
    color: '#6b7280',
    icon: '⚙️',
  },
};

const ACTIVITY_LEVELS = [
  { value: 1.2, label: 'Sedentary', desc: 'Desk job, little exercise' },
  { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 1.725, label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
  { value: 1.9, label: 'Extremely Active', desc: 'Athlete / physical job + training' },
];

const GOALS = [
  { value: -0.20, label: 'Lose Weight', desc: '−20% deficit', color: '#2563eb' },
  { value: -0.10, label: 'Slow Cut', desc: '−10% deficit', color: '#0891b2' },
  { value: 0, label: 'Maintain', desc: 'No change', color: '#16a34a' },
  { value: 0.10, label: 'Lean Bulk', desc: '+10% surplus', color: '#d97706' },
  { value: 0.20, label: 'Gain Weight', desc: '+20% surplus', color: '#dc2626' },
];

export default function MacroCalculator() {
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState(30);
  const [units, setUnits] = useState('metric');
  const [heightCm, setHeightCm] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightKg, setWeightKg] = useState(75);
  const [weightLbs, setWeightLbs] = useState(165);
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [goal, setGoal] = useState(0);
  const [diet, setDiet] = useState('balanced');
  const [customProtein, setCustomProtein] = useState(30);
  const [customCarbs, setCustomCarbs] = useState(40);
  const [customFat, setCustomFat] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const resultsRef = useRef(null);
  const canvasRef = useRef(null);

  const macroSplit = useMemo(() => {
    if (diet === 'custom') {
      const total = customProtein + customCarbs + customFat;
      return {
        protein: customProtein / total,
        carbs: customCarbs / total,
        fat: customFat / total,
      };
    }
    return DIETS[diet];
  }, [diet, customProtein, customCarbs, customFat]);

  const results = useMemo(() => {
    const wKg = units === 'metric' ? weightKg : weightLbs * 0.453592;
    const hCm = units === 'metric' ? heightCm : (heightFt * 30.48) + (heightIn * 2.54);

    // Mifflin-St Jeor
    let bmr;
    if (sex === 'male') {
      bmr = (10 * wKg) + (6.25 * hCm) - (5 * age) + 5;
    } else {
      bmr = (10 * wKg) + (6.25 * hCm) - (5 * age) - 161;
    }

    const tdee = bmr * activityLevel;
    const targetCalories = Math.round(tdee * (1 + goal));

    const proteinCals = targetCalories * macroSplit.protein;
    const carbsCals = targetCalories * macroSplit.carbs;
    const fatCals = targetCalories * macroSplit.fat;

    const proteinG = Math.round(proteinCals / 4);
    const carbsG = Math.round(carbsCals / 4);
    const fatG = Math.round(fatCals / 9);

    const proteinPerKg = (proteinG / wKg).toFixed(1);
    const proteinPerLb = (proteinG / (wKg * 2.20462)).toFixed(1);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      protein: { grams: proteinG, cals: Math.round(proteinCals), pct: Math.round(macroSplit.protein * 100) },
      carbs: { grams: carbsG, cals: Math.round(carbsCals), pct: Math.round(macroSplit.carbs * 100) },
      fat: { grams: fatG, cals: Math.round(fatCals), pct: Math.round(macroSplit.fat * 100) },
      proteinPerKg,
      proteinPerLb,
      perMeal: {
        calories: Math.round(targetCalories / mealsPerDay),
        protein: Math.round(proteinG / mealsPerDay),
        carbs: Math.round(carbsG / mealsPerDay),
        fat: Math.round(fatG / mealsPerDay),
      },
    };
  }, [sex, age, units, heightCm, heightFt, heightIn, weightKg, weightLbs, activityLevel, goal, macroSplit, mealsPerDay]);

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const downloadCard = () => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvasRef.current = canvas;
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    const dietInfo = DIETS[diet];
    const mainColor = dietInfo.color;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 1000);

    // Header gradient
    const grad = ctx.createLinearGradient(0, 0, 800, 200);
    grad.addColorStop(0, mainColor);
    grad.addColorStop(1, mainColor + 'cc');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 200);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('My Daily Macros', 400, 70);

    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffffcc';
    ctx.fillText(`${dietInfo.icon} ${dietInfo.name} Diet`, 400, 110);

    // Target calories
    ctx.font = 'bold 56px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${results.targetCalories.toLocaleString()}`, 400, 170);
    ctx.font = '18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffffbb';
    ctx.fillText('calories / day', 400, 195);

    // Macro donut chart
    const centerX = 400;
    const centerY = 380;
    const radius = 100;
    const lineWidth = 30;

    const macros = [
      { label: 'Protein', grams: results.protein.grams, pct: results.protein.pct, color: '#3b82f6', cal: 4 },
      { label: 'Carbs', grams: results.carbs.grams, pct: results.carbs.pct, color: '#f59e0b', cal: 4 },
      { label: 'Fat', grams: results.fat.grams, pct: results.fat.pct, color: '#ef4444', cal: 9 },
    ];

    let startAngle = -Math.PI / 2;
    macros.forEach((m) => {
      const sliceAngle = (m.pct / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.strokeStyle = m.color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'butt';
      ctx.stroke();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${results.targetCalories}`, centerX, centerY - 5);
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#525252';
    ctx.fillText('kcal/day', centerX, centerY + 18);

    // Macro boxes
    const boxY = 520;
    const boxWidth = 220;
    const boxHeight = 120;
    const boxGap = 25;
    const startX = (800 - (3 * boxWidth + 2 * boxGap)) / 2;

    macros.forEach((m, i) => {
      const x = startX + i * (boxWidth + boxGap);

      // Box background
      ctx.fillStyle = m.color + '15';
      ctx.beginPath();
      ctx.roundRect(x, boxY, boxWidth, boxHeight, 12);
      ctx.fill();

      // Border
      ctx.strokeStyle = m.color + '40';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, boxY, boxWidth, boxHeight, 12);
      ctx.stroke();

      // Color dot
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.arc(x + 18, boxY + 22, 6, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#525252';
      ctx.font = '16px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(m.label, x + 32, boxY + 28);

      // Grams
      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${m.grams}g`, x + boxWidth / 2, boxY + 72);

      // Percentage & cals
      ctx.fillStyle = '#525252';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillText(`${m.pct}% — ${m.grams * m.cal} kcal`, x + boxWidth / 2, boxY + 100);
    });

    // Per-meal section
    const mealY = 680;
    ctx.fillStyle = '#f8f8f8';
    ctx.beginPath();
    ctx.roundRect(40, mealY, 720, 100, 12);
    ctx.fill();

    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Per Meal (${mealsPerDay} meals/day)`, 400, mealY + 35);

    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#525252';
    const mealText = `${results.perMeal.calories} kcal  •  ${results.perMeal.protein}g protein  •  ${results.perMeal.carbs}g carbs  •  ${results.perMeal.fat}g fat`;
    ctx.fillText(mealText, 400, mealY + 65);

    // Details
    const detY = 820;
    ctx.fillStyle = '#a3a3a3';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';

    const goalLabel = GOALS.find(g => g.value === goal)?.label || 'Maintain';
    const actLabel = ACTIVITY_LEVELS.find(a => a.value === activityLevel)?.label || '';
    ctx.fillText(`BMR: ${results.bmr} kcal  •  TDEE: ${results.tdee} kcal  •  Goal: ${goalLabel}  •  ${actLabel}`, 400, detY);

    ctx.fillText(`Protein: ${results.proteinPerKg}g/kg (${results.proteinPerLb}g/lb) body weight`, 400, detY + 25);

    // Footer
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText('Generated by MyKit.tools — Nutrition Macro Calculator', 400, 960);
    ctx.fillText('Based on Mifflin-St Jeor equation. Consult a professional for personalised advice.', 400, 980);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `macros-${dietInfo.name.toLowerCase().replace(/\s/g, '-')}-${results.targetCalories}kcal.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const currentDiet = DIETS[diet];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Personal Details */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-4">About You</h2>

        {/* Sex toggle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">Biological Sex</label>
          <div className="flex gap-2">
            {['male', 'female'].map((s) => (
              <button
                key={s}
                onClick={() => setSex(s)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  sex === s
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-surface text-text-secondary hover:bg-surface-hover border border-border'
                }`}
              >
                {s === 'male' ? '♂ Male' : '♀ Female'}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            min={14}
            max={100}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>

        {/* Units */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">Units</label>
          <div className="flex gap-2">
            {[{ v: 'metric', l: 'Metric (kg/cm)' }, { v: 'imperial', l: 'Imperial (lbs/ft)' }].map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setUnits(v)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  units === v
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-surface text-text-secondary hover:bg-surface-hover border border-border'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">Height</label>
          {units === 'metric' ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                min={100}
                max={250}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <span className="text-text-muted text-sm whitespace-nowrap">cm</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
                min={3}
                max={8}
                className="w-24 px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <span className="text-text-muted text-sm">ft</span>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)}
                min={0}
                max={11}
                className="w-24 px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <span className="text-text-muted text-sm">in</span>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">Weight</label>
          {units === 'metric' ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                min={30}
                max={300}
                step={0.5}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <span className="text-text-muted text-sm whitespace-nowrap">kg</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                min={60}
                max={600}
                step={1}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
              <span className="text-text-muted text-sm whitespace-nowrap">lbs</span>
            </div>
          )}
        </div>
      </Card>

      {/* Activity Level */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Activity Level</h2>
        <div className="space-y-2">
          {ACTIVITY_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setActivityLevel(level.value)}
              className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                activityLevel === level.value
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-white hover:bg-surface'
              }`}
            >
              <span className={`font-medium text-sm ${activityLevel === level.value ? 'text-accent' : 'text-text-primary'}`}>
                {level.label}
              </span>
              <span className="text-text-muted text-sm ml-2">— {level.desc}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Goal */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Goal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {GOALS.map((g) => (
            <button
              key={g.value}
              onClick={() => setGoal(g.value)}
              className={`p-3 rounded-lg border text-center transition-all ${
                goal === g.value
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-white hover:bg-surface'
              }`}
            >
              <div className={`text-sm font-semibold ${goal === g.value ? 'text-accent' : 'text-text-primary'}`}>
                {g.label}
              </div>
              <div className="text-xs text-text-muted mt-0.5">{g.desc}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Diet Type */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Diet Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(DIETS).map(([key, d]) => (
            <button
              key={key}
              onClick={() => setDiet(key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                diet === key
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{d.icon}</span>
                <span className={`text-sm font-semibold ${diet === key ? 'text-accent' : 'text-text-primary'}`}>
                  {d.name}
                </span>
              </div>
              <div className="text-xs text-text-muted mt-1">{d.description}</div>
              {key !== 'custom' && (
                <div className="text-xs text-text-muted mt-1.5 font-mono">
                  P{Math.round(d.protein * 100)} / C{Math.round(d.carbs * 100)} / F{Math.round(d.fat * 100)}
                </div>
              )}
            </button>
          ))}
        </div>

        {diet === 'custom' && (
          <div className="mt-4 p-4 bg-surface rounded-lg border border-border">
            <p className="text-sm text-text-secondary mb-3">Set your own percentages (they will be normalised to 100%):</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Protein %', val: customProtein, set: setCustomProtein, color: '#3b82f6' },
                { label: 'Carbs %', val: customCarbs, set: setCustomCarbs, color: '#f59e0b' },
                { label: 'Fat %', val: customFat, set: setCustomFat, color: '#ef4444' },
              ].map(({ label, val, set, color }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => set(parseInt(e.target.value) || 0)}
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary text-center font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    style={{ borderColor: color + '60' }}
                  />
                </div>
              ))}
            </div>
            {customProtein + customCarbs + customFat !== 100 && (
              <p className="text-xs text-text-muted mt-2 text-center">
                Total: {customProtein + customCarbs + customFat}% — will be normalised to 100%
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Meals Per Day */}
      <Card>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Meals Per Day</h2>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setMealsPerDay(n)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mealsPerDay === n
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface text-text-secondary hover:bg-surface-hover border border-border'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Card>

      {/* Calculate Button */}
      <Button onClick={handleCalculate} className="w-full bg-accent text-white py-3 text-lg font-semibold">
        Calculate My Macros
      </Button>

      {/* Results */}
      {showResults && (
        <div ref={resultsRef} className="space-y-6">
          {/* Calorie Summary */}
          <Card className="border-2" style={{ borderColor: currentDiet.color + '40' }}>
            <div className="text-center mb-6">
              <span className="text-3xl mb-2 block">{currentDiet.icon}</span>
              <h2 className="text-xl font-semibold text-text-primary">{currentDiet.name} Diet</h2>
              <p className="text-text-muted text-sm mt-1">{currentDiet.description}</p>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-bold font-mono text-text-primary">
                {results.targetCalories.toLocaleString()}
              </div>
              <div className="text-text-muted text-sm mt-1">calories per day</div>
            </div>

            <div className="flex justify-center gap-6 text-sm text-text-secondary mb-6">
              <div className="text-center">
                <div className="font-mono text-text-muted">{results.bmr}</div>
                <div className="text-xs">BMR</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-text-muted">{results.tdee}</div>
                <div className="text-xs">TDEE</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-text-muted">{goal > 0 ? '+' : ''}{Math.round(goal * 100)}%</div>
                <div className="text-xs">Adjustment</div>
              </div>
            </div>

            {/* Visual macro bar */}
            <div className="h-6 rounded-full overflow-hidden flex mb-6">
              <div
                className="h-full transition-all"
                style={{ width: `${results.protein.pct}%`, backgroundColor: '#3b82f6' }}
              />
              <div
                className="h-full transition-all"
                style={{ width: `${results.carbs.pct}%`, backgroundColor: '#f59e0b' }}
              />
              <div
                className="h-full transition-all"
                style={{ width: `${results.fat.pct}%`, backgroundColor: '#ef4444' }}
              />
            </div>

            {/* Macro cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Protein', g: results.protein.grams, pct: results.protein.pct, cals: results.protein.cals, color: '#3b82f6', emoji: '🥩' },
                { label: 'Carbs', g: results.carbs.grams, pct: results.carbs.pct, cals: results.carbs.cals, color: '#f59e0b', emoji: '🍚' },
                { label: 'Fat', g: results.fat.grams, pct: results.fat.pct, cals: results.fat.cals, color: '#ef4444', emoji: '🫒' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4 text-center border"
                  style={{ backgroundColor: m.color + '08', borderColor: m.color + '30' }}
                >
                  <div className="text-xl mb-1">{m.emoji}</div>
                  <div className="text-xs font-medium text-text-secondary">{m.label}</div>
                  <div className="text-2xl font-bold font-mono text-text-primary mt-1">{m.g}g</div>
                  <div className="text-xs text-text-muted mt-1">{m.pct}% — {m.cals} kcal</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Per Meal Breakdown */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Per Meal ({mealsPerDay} meals/day)
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Calories', val: results.perMeal.calories, unit: 'kcal', color: '#1a1a1a' },
                { label: 'Protein', val: results.perMeal.protein, unit: 'g', color: '#3b82f6' },
                { label: 'Carbs', val: results.perMeal.carbs, unit: 'g', color: '#f59e0b' },
                { label: 'Fat', val: results.perMeal.fat, unit: 'g', color: '#ef4444' },
              ].map((m) => (
                <div key={m.label} className="text-center p-3 rounded-lg bg-surface">
                  <div className="text-xs text-text-muted">{m.label}</div>
                  <div className="text-xl font-bold font-mono mt-1" style={{ color: m.color }}>
                    {m.val}
                  </div>
                  <div className="text-xs text-text-muted">{m.unit}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Protein context */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Protein Context</h3>
            <div className="flex gap-4 text-center">
              <div className="flex-1 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-2xl font-bold font-mono text-blue-600">{results.proteinPerKg}</div>
                <div className="text-xs text-text-muted mt-1">g per kg</div>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-2xl font-bold font-mono text-blue-600">{results.proteinPerLb}</div>
                <div className="text-xs text-text-muted mt-1">g per lb</div>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-3">
              Research suggests 1.6-2.2g/kg for muscle building, 1.2-1.6g/kg for general fitness, and 0.8g/kg minimum for sedentary adults.
            </p>
          </Card>

          {/* Sample food ideas per diet */}
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {currentDiet.icon} {currentDiet.name} Food Ideas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {getFoodIdeas(diet).map((group, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface">
                  <div className="text-sm font-semibold text-text-primary mb-2">{group.title}</div>
                  <ul className="text-xs text-text-secondary space-y-1">
                    {group.foods.map((f, j) => (
                      <li key={j}>• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Download */}
          <div className="flex gap-3">
            <Button onClick={downloadCard} className="flex-1 bg-accent text-white">
              Download Macro Card
            </Button>
            <Button onClick={() => { setShowResults(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} variant="secondary" className="flex-1">
              Recalculate
            </Button>
          </div>

          <p className="text-xs text-text-muted text-center">
            Calculated using the Mifflin-St Jeor equation. These are estimates — individual needs vary. Consult a registered dietitian or nutritionist for personalised advice.
          </p>
        </div>
      )}
    </div>
  );
}

function getFoodIdeas(diet) {
  const ideas = {
    balanced: [
      { title: 'Protein', foods: ['Chicken breast', 'Greek yoghurt', 'Eggs', 'Salmon', 'Lentils'] },
      { title: 'Carbs', foods: ['Brown rice', 'Sweet potato', 'Oats', 'Whole grain bread', 'Fruits'] },
      { title: 'Fats', foods: ['Olive oil', 'Avocado', 'Nuts', 'Nut butter', 'Seeds'] },
    ],
    keto: [
      { title: 'Protein', foods: ['Steak', 'Chicken thighs', 'Eggs', 'Salmon', 'Bacon'] },
      { title: 'Low-Carb Veg', foods: ['Spinach', 'Broccoli', 'Cauliflower', 'Courgette', 'Peppers'] },
      { title: 'Fats', foods: ['Butter', 'Coconut oil', 'Cheese', 'Avocado', 'Double cream'] },
    ],
    lowCarb: [
      { title: 'Protein', foods: ['Chicken', 'Turkey mince', 'Prawns', 'Cottage cheese', 'Tofu'] },
      { title: 'Low-Carb Veg', foods: ['Leafy greens', 'Mushrooms', 'Asparagus', 'Green beans', 'Tomatoes'] },
      { title: 'Fats', foods: ['Olive oil', 'Almonds', 'Cheese', 'Avocado', 'Egg yolks'] },
    ],
    highProtein: [
      { title: 'Lean Protein', foods: ['Chicken breast', 'White fish', 'Egg whites', 'Turkey', 'Protein powder'] },
      { title: 'Carbs', foods: ['Rice', 'Potatoes', 'Oats', 'Pasta', 'Bagels'] },
      { title: 'Lean Fats', foods: ['Olive oil', 'Almonds', 'Peanut butter', 'Avocado', 'Flaxseed'] },
    ],
    mediterranean: [
      { title: 'Protein', foods: ['Grilled fish', 'Chickpeas', 'White beans', 'Feta cheese', 'Chicken'] },
      { title: 'Carbs', foods: ['Whole grain bread', 'Couscous', 'Farro', 'Fresh fruit', 'Vegetables'] },
      { title: 'Fats', foods: ['Extra virgin olive oil', 'Olives', 'Walnuts', 'Tahini', 'Avocado'] },
    ],
    paleo: [
      { title: 'Protein', foods: ['Grass-fed beef', 'Wild salmon', 'Free-range eggs', 'Chicken', 'Venison'] },
      { title: 'Carbs', foods: ['Sweet potato', 'Berries', 'Plantain', 'Squash', 'Beetroot'] },
      { title: 'Fats', foods: ['Coconut oil', 'Avocado', 'Macadamia nuts', 'Ghee', 'Olive oil'] },
    ],
    vegan: [
      { title: 'Protein', foods: ['Tofu', 'Tempeh', 'Lentils', 'Chickpeas', 'Seitan'] },
      { title: 'Carbs', foods: ['Quinoa', 'Brown rice', 'Sweet potato', 'Oats', 'Bananas'] },
      { title: 'Fats', foods: ['Avocado', 'Tahini', 'Walnuts', 'Chia seeds', 'Coconut oil'] },
    ],
    zone: [
      { title: 'Protein', foods: ['Chicken', 'Fish', 'Turkey', 'Lean beef', 'Cottage cheese'] },
      { title: 'Carbs', foods: ['Vegetables', 'Berries', 'Apples', 'Oatmeal', 'Sweet potato'] },
      { title: 'Fats', foods: ['Olive oil', 'Almonds', 'Avocado', 'Macadamia nuts', 'Fish oil'] },
    ],
    carnivore: [
      { title: 'Beef', foods: ['Ribeye steak', 'Ground beef', 'Bone marrow', 'Liver', 'Brisket'] },
      { title: 'Other Meats', foods: ['Chicken thighs', 'Pork belly', 'Lamb chops', 'Salmon', 'Bacon'] },
      { title: 'Animal Fats', foods: ['Butter', 'Tallow', 'Egg yolks', 'Bone broth', 'Cheese'] },
    ],
    custom: [
      { title: 'Protein', foods: ['Chicken', 'Fish', 'Eggs', 'Greek yoghurt', 'Legumes'] },
      { title: 'Carbs', foods: ['Rice', 'Potatoes', 'Oats', 'Fruit', 'Bread'] },
      { title: 'Fats', foods: ['Olive oil', 'Nuts', 'Avocado', 'Seeds', 'Cheese'] },
    ],
  };
  return ideas[diet] || ideas.balanced;
}
