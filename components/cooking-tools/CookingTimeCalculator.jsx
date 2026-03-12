'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const MEAT_TYPES = {
  chicken_whole: { label: 'Chicken (whole)', temp: 200, formula: (kg) => kg * 20 + 20, unit: 'min/lb' },
  turkey: { label: 'Turkey', temp: 180, formula: (kg) => kg * 12.5 + 20, unit: 'min/lb' },
  beef_roast: { label: 'Beef (roast)', temp: 200, formula: (kg) => kg * 20, unit: 'min/lb', doneness: true },
  lamb_leg: { label: 'Lamb (leg)', temp: 190, formula: (kg) => kg * 18, unit: 'min/lb', doneness: true },
  lamb_shoulder: { label: 'Lamb (shoulder)', temp: 180, formula: (kg) => kg * 25, unit: 'min/lb', doneness: true },
  pork_roast: { label: 'Pork (roast)', temp: 190, formula: (kg) => kg * 20, unit: 'min/lb' },
  pork_belly: { label: 'Pork (belly)', temp: 160, formula: (kg) => kg * 30, unit: 'min/lb' },
  gammon: { label: 'Gammon', temp: 190, formula: (kg) => kg * 25, unit: 'min/lb' },
  duck: { label: 'Duck', temp: 200, formula: (kg) => kg * 15, unit: 'min/lb' },
};

const DONENESS_LEVELS = {
  rare: { label: 'Rare', temp: 50, time_adjust: 0.8 },
  medium_rare: { label: 'Medium-Rare', temp: 55, time_adjust: 0.9 },
  medium: { label: 'Medium', temp: 60, time_adjust: 1 },
  well_done: { label: 'Well-Done', temp: 70, time_adjust: 1.15 },
};

const SAFE_TEMPS = {
  chicken_whole: 75,
  turkey: 75,
  beef_roast: 60,
  lamb_leg: 60,
  lamb_shoulder: 60,
  pork_roast: 65,
  pork_belly: 65,
  gammon: 70,
  duck: 75,
};

export default function CookingTimeCalculator() {
  const [meatType, setMeatType] = useState('chicken_whole');
  const [weightKg, setWeightKg] = useState('1.5');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [doneness, setDoneness] = useState('medium');
  const [desiredServeTime, setDesiredServeTime] = useState('19:00');

  const meat = MEAT_TYPES[meatType];
  const showDoneness = meat.doneness;

  // Convert weight to kg if needed
  const weightInKg = useMemo(() => {
    const num = parseFloat(weightKg) || 0;
    return weightUnit === 'kg' ? num : num / 2.20462;
  }, [weightKg, weightUnit]);

  // Calculate cooking time
  const cookingMinutes = useMemo(() => {
    const baseTime = meat.formula(weightInKg);
    if (showDoneness) {
      const adjust = DONENESS_LEVELS[doneness]?.time_adjust || 1;
      return Math.round(baseTime * adjust);
    }
    return Math.round(baseTime);
  }, [weightInKg, meatType, doneness, showDoneness]);

  const restingMinutes = Math.round(cookingMinutes * 0.2) || 10;

  // Calculate timeline
  const timelineData = useMemo(() => {
    if (!desiredServeTime) return null;

    const [serveHour, serveMin] = desiredServeTime.split(':').map(Number);
    const serveDate = new Date();
    serveDate.setHours(serveHour, serveMin, 0);

    const takeOutTime = new Date(serveDate.getTime() - restingMinutes * 60000);
    const putInTime = new Date(takeOutTime.getTime() - cookingMinutes * 60000);

    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      putIn: formatTime(putInTime),
      takeOut: formatTime(takeOutTime),
      serve: desiredServeTime,
    };
  }, [desiredServeTime, cookingMinutes, restingMinutes]);

  const safeInternalTemp = SAFE_TEMPS[meatType];
  const donessTemp = showDoneness ? DONENESS_LEVELS[doneness]?.temp : null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Meat Details
        </h3>

        <div className="space-y-4">
          {/* Meat Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Meat Type
            </label>
            <select
              value={meatType}
              onChange={(e) => setMeatType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {Object.entries(MEAT_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Weight"
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g., 1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit
              </label>
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          {/* Doneness (if applicable) */}
          {showDoneness && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Doneness Level
              </label>
              <select
                value={doneness}
                onChange={(e) => setDoneness(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {Object.entries(DONENESS_LEVELS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Desired Serve Time */}
          <div>
            <Input
              label="What time do you want to serve?"
              type="time"
              value={desiredServeTime}
              onChange={(e) => setDesiredServeTime(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Cooking Times
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Preheat Temp */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Preheat Oven To</p>
            <p className="text-text-primary font-mono text-2xl font-bold">
              {meat.temp}°C
            </p>
            <p className="text-text-muted text-xs mt-1">
              ({Math.round((meat.temp * 9) / 5 + 32)}°F)
            </p>
          </div>

          {/* Cooking Time */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Cook For</p>
            <p className="text-text-primary font-mono text-2xl font-bold">
              {Math.floor(cookingMinutes / 60)}h {cookingMinutes % 60}m
            </p>
            <p className="text-text-muted text-xs mt-1">{cookingMinutes} minutes</p>
          </div>

          {/* Resting Time */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Rest For</p>
            <p className="text-text-primary font-mono text-2xl font-bold">
              {Math.floor(restingMinutes / 60)}h {restingMinutes % 60}m
            </p>
            <p className="text-text-muted text-xs mt-1">{restingMinutes} minutes</p>
          </div>
        </div>

        {/* Timeline */}
        {timelineData && (
          <div className="bg-accent-muted rounded-[var(--radius-input)] p-4 mb-4">
            <h4 className="font-medium text-accent mb-3 text-sm">Timeline</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">Put in:</span>
                <span className="font-mono text-text-primary">{timelineData.putIn}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">Take out:</span>
                <span className="font-mono text-text-primary">{timelineData.takeOut}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">Serve:</span>
                <span className="font-mono text-text-primary">{timelineData.serve}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Safety & Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-3">🌡️ Safe Temperatures</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Minimum safe internal temp:</span>
            <span className="font-mono font-bold text-text-primary">{safeInternalTemp}°C</span>
          </div>
          {donessTemp && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Your target ({DONENESS_LEVELS[doneness].label}):</span>
              <span className="font-mono font-bold text-text-primary">{donessTemp}°C</span>
            </div>
          )}
          <p className="text-text-muted text-xs mt-2 pt-2 border-t border-border">
            Always use a meat thermometer to check doneness. These are guidelines only.
          </p>
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-2">💡 Tips</h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Let meat rest after cooking to redistribute juices</li>
          <li>• For even cooking, remove from fridge 30 mins before cooking</li>
          <li>• Cooking times vary by oven and meat thickness</li>
          <li>• Larger cuts cook more slowly than the formula suggests</li>
          <li>• Always check internal temperature with a thermometer</li>
        </ul>
      </Card>
    </div>
  );
}
