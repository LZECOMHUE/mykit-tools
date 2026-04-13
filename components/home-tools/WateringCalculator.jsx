'use client';

import { useState, useMemo } from 'react';

const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const PLANT_DATA = {
  monstera: {
    name: 'Monstera',
    spring: { days: 7, amount: 250 },
    summer: { days: 5, amount: 300 },
    autumn: { days: 10, amount: 200 },
    winter: { days: 14, amount: 150 },
    overwater: 'Yellow leaves, root rot, wilting',
    underwater: 'Brown leaf tips, wilting, slow growth',
  },
  pothos: {
    name: 'Pothos (Devil\'s Ivy)',
    spring: { days: 7, amount: 150 },
    summer: { days: 5, amount: 200 },
    autumn: { days: 10, amount: 100 },
    winter: { days: 14, amount: 75 },
    overwater: 'Root rot, yellowing leaves',
    underwater: 'Brown leaf edges, wilting',
  },
  'peace-lily': {
    name: 'Peace Lily',
    spring: { days: 5, amount: 200 },
    summer: { days: 4, amount: 250 },
    autumn: { days: 7, amount: 150 },
    winter: { days: 10, amount: 100 },
    overwater: 'Leaf yellowing, fungal issues',
    underwater: 'Drooping, brown tips, wilting quickly',
  },
  'snake-plant': {
    name: 'Snake Plant',
    spring: { days: 14, amount: 100 },
    summer: { days: 10, amount: 150 },
    autumn: { days: 14, amount: 100 },
    winter: { days: 21, amount: 50 },
    overwater: 'Root rot, mushy base, yellowing',
    underwater: 'Slow growth, wrinkled leaves',
  },
  'spider-plant': {
    name: 'Spider Plant',
    spring: { days: 7, amount: 150 },
    summer: { days: 5, amount: 200 },
    autumn: { days: 10, amount: 100 },
    winter: { days: 14, amount: 75 },
    overwater: 'Brown leaf tips, wilting',
    underwater: 'Crispy leaves, slow growth',
  },
  'fiddle-leaf-fig': {
    name: 'Fiddle Leaf Fig',
    spring: { days: 7, amount: 300 },
    summer: { days: 5, amount: 400 },
    autumn: { days: 10, amount: 250 },
    winter: { days: 14, amount: 150 },
    overwater: 'Brown spots, leaf drop, root rot',
    underwater: 'Brown edges, wilting, leaf drop',
  },
  'cactus-succulent': {
    name: 'Cactus/Succulent',
    spring: { days: 21, amount: 50 },
    summer: { days: 14, amount: 75 },
    autumn: { days: 21, amount: 50 },
    winter: { days: 30, amount: 25 },
    overwater: 'Root rot, mushy stems',
    underwater: 'Slow growth (normal), shrivelling',
  },
  herbs: {
    name: 'Herbs (Basil, Mint, etc)',
    spring: { days: 3, amount: 200 },
    summer: { days: 2, amount: 250 },
    autumn: { days: 5, amount: 150 },
    winter: { days: 7, amount: 100 },
    overwater: 'Fungal issues, root rot',
    underwater: 'Wilting, slow leaf production',
  },
  tomato: {
    name: 'Tomato',
    spring: { days: 2, amount: 400 },
    summer: { days: 1, amount: 500 },
    autumn: { days: 3, amount: 300 },
    winter: { days: 5, amount: 200 },
    overwater: 'Blossom end rot, root issues',
    underwater: 'Wilting, cracked fruit, slow growth',
  },
  'general-houseplant': {
    name: 'General Houseplant',
    spring: { days: 7, amount: 200 },
    summer: { days: 5, amount: 250 },
    autumn: { days: 10, amount: 150 },
    winter: { days: 14, amount: 100 },
    overwater: 'Yellowing, root rot, fungal issues',
    underwater: 'Wilting, brown tips, slow growth',
  },
  'general-outdoor': {
    name: 'General Outdoor Plant',
    spring: { days: 3, amount: 500 },
    summer: { days: 2, amount: 750 },
    autumn: { days: 5, amount: 400 },
    winter: { days: 7, amount: 200 },
    overwater: 'Root rot, yellowing, fungal disease',
    underwater: 'Wilting, stunted growth, leaf scorch',
  },
};

const POT_SIZES = {
  '10': 10,
  '15': 15,
  '20': 20,
  '25': 25,
  '30': 30,
  '40': 40,
};

export default function WateringCalculator() {
  const [plantType, setPlantType] = useState('monstera');
  const [potSize, setPotSize] = useState('20');
  const [season, setSeason] = useState('summer');
  const [location, setLocation] = useState('indoor');

  const plant = PLANT_DATA[plantType];
  const seasonData = plant[season];

  const results = useMemo(() => {
    if (!seasonData) return null;

    let daysAdjusted = seasonData.days;
    let amountAdjusted = seasonData.amount;

    // Adjust based on pot size (larger = more water)
    const potSizeNum = parseFloat(potSize) || 20;
    const sizeMultiplier = potSizeNum / 20; // 20cm is the base
    amountAdjusted = Math.round(seasonData.amount * sizeMultiplier);

    // Adjust based on location
    if (location === 'outdoor') {
      daysAdjusted = Math.max(1, Math.round(daysAdjusted * 0.6)); // Outdoors needs more water
      amountAdjusted = Math.round(amountAdjusted * 1.3);
    }

    return {
      days: daysAdjusted,
      amount: amountAdjusted,
      frequency: Math.ceil(7 / daysAdjusted),
      perWeek: (7 / daysAdjusted).toFixed(1),
    };
  }, [plantType, potSize, season, location, seasonData]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4 space-y-4">
      {/* Configuration */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <div>
          <label className="block text-text-primary text-[13px] font-medium mb-1">Plant Type</label>
          <select value={plantType} onChange={(e) => setPlantType(e.target.value)} className={selectCls}>
            {Object.entries(PLANT_DATA).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Pot Size (cm)</label>
            <select value={potSize} onChange={(e) => setPotSize(e.target.value)} className={selectCls}>
              {Object.keys(POT_SIZES).map(size => (
                <option key={size} value={size}>{size}cm</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Season</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)} className={selectCls}>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-text-primary text-[13px] font-medium mb-1">Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Hero Card */}
          <div className="bg-accent-muted border border-border rounded-lg space-y-3">
            <h3 className="text-text-secondary text-[13px] font-medium">Water Every</h3>
            <p className="font-mono text-5xl font-bold text-accent">{results.days} days</p>
            <p className="text-text-secondary text-sm">Approximately {results.perWeek} times per week</p>
          </div>

          {/* Amount Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-text-secondary text-[13px] font-medium mb-2">Water Amount</p>
            <p className="font-mono text-3xl font-bold text-blue-600">{results.amount} ml</p>
            <p className="text-text-muted text-xs mt-1">Per watering session</p>
          </div>

          {/* Plant Info Card */}
          <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-text-primary text-sm mb-2">Signs of Overwatering</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{plant.overwater}</p>
            </div>

            <hr className="border-border" />

            <div>
              <h4 className="font-medium text-text-primary text-sm mb-2">Signs of Underwatering</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{plant.underwater}</p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <p className="font-medium text-text-primary text-sm">Quick Tips</p>
            <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside">
              <li>Feel the soil before watering - it should be slightly moist, not soggy</li>
              <li>Water less in winter when growth slows</li>
              <li>Outdoor plants need more frequent watering than indoor</li>
              <li>Use room temperature water, never cold</li>
              <li>Water in the morning to reduce fungal issues</li>
            </ul>
          </div>

          {/* Context */}
          <div className="text-center text-text-muted text-xs p-3 bg-surface rounded-lg">
            <p>These are general guidelines. Adjust based on your local climate, humidity, soil type, and whether the pot has drainage holes.</p>
          </div>
        </div>
      )}
    </div>
  );
}
