'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function EVRangeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState('60');
  const [wltpRange, setWltpRange] = useState('300');
  const [drivingCondition, setDrivingCondition] = useState('mixed');
  const [temperature, setTemperature] = useState('mild');
  const [accessories, setAccessories] = useState('off');
  const [load, setLoad] = useState('light');
  const [result, setResult] = useState(null);

  const DRIVING_CONDITIONS = [
    { value: 'city', label: 'City (stop-start, low speeds)' },
    { value: 'mixed', label: 'Mixed (city + motorway)' },
    { value: 'motorway', label: 'Motorway (high speeds)' },
  ];

  const TEMPERATURES = [
    { value: 'cold', label: 'Cold (below 0°C)' },
    { value: 'mild', label: 'Mild (5-15°C)' },
    { value: 'warm', label: 'Warm (20+°C)' },
  ];

  const ACCESSORIES = [
    { value: 'off', label: 'Off (no heating/cooling)' },
    { value: 'heating', label: 'Heating on' },
    { value: 'cooling', label: 'Air conditioning on' },
  ];

  const LOADS = [
    { value: 'light', label: 'Light (1-2 occupants, minimal cargo)' },
    { value: 'medium', label: 'Medium (3-4 occupants, normal cargo)' },
    { value: 'heavy', label: 'Heavy (5+ occupants, full cargo)' },
  ];

  // Derating factors (as percentage of WLTP)
  const DERATING_FACTORS = {
    drivingCondition: {
      city: 0.95,
      mixed: 0.85,
      motorway: 0.70,
    },
    temperature: {
      cold: 0.75,
      mild: 1.0,
      warm: 0.95,
    },
    accessories: {
      off: 1.0,
      heating: 0.85,
      cooling: 0.90,
    },
    load: {
      light: 1.0,
      medium: 0.95,
      heavy: 0.85,
    },
  };

  function calculate() {
    const battery = parseFloat(batteryCapacity) || 60;
    const wltp = parseFloat(wltpRange) || 300;

    // Calculate efficiency from WLTP data
    const wltpEfficiency = wltp / battery; // miles per kWh

    // Apply derating factors
    const driveFactor = DERATING_FACTORS.drivingCondition[drivingCondition];
    const tempFactor = DERATING_FACTORS.temperature[temperature];
    const accFactor = DERATING_FACTORS.accessories[accessories];
    const loadFactor = DERATING_FACTORS.load[load];

    const combinedFactor = driveFactor * tempFactor * accFactor * loadFactor;
    const realisticRange = wltp * combinedFactor;

    // Range loss
    const rangeReduction = wltp - realisticRange;
    const percentageReduction = ((rangeReduction / wltp) * 100).toFixed(1);

    setResult({
      wltpRange: wltp.toFixed(0),
      batteryCapacity: battery.toFixed(1),
      wltpEfficiency: wltpEfficiency.toFixed(2),
      realisticRange: realisticRange.toFixed(0),
      rangeReduction: rangeReduction.toFixed(0),
      percentageReduction,
      combinedFactor: (combinedFactor * 100).toFixed(0),
      factors: {
        driving: (driveFactor * 100).toFixed(0),
        temperature: (tempFactor * 100).toFixed(0),
        accessories: (accFactor * 100).toFixed(0),
        load: (loadFactor * 100).toFixed(0),
      },
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          EV Range Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Battery Capacity (kWh)
            </label>
            <Input
              type="number"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
              placeholder="Enter battery capacity"
              min="0.1"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              Find this on your vehicle's battery nameplate or manual. Example: 60 kWh
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              WLTP Range (miles)
            </label>
            <Input
              type="number"
              value={wltpRange}
              onChange={(e) => setWltpRange(e.target.value)}
              placeholder="Enter WLTP range"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              Check your vehicle's official range from the manufacturer. WLTP is the official testing standard.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Typical Driving Condition
            </label>
            <Select
              options={DRIVING_CONDITIONS}
              value={drivingCondition}
              onChange={(e) => setDrivingCondition(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Outside Temperature
            </label>
            <Select
              options={TEMPERATURES}
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Heating or Cooling
            </label>
            <Select
              options={ACCESSORIES}
              value={accessories}
              onChange={(e) => setAccessories(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Vehicle Load
            </label>
            <Select
              options={LOADS}
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Realistic Range
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Main Result */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Your Realistic Range Estimate
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">WLTP Range</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {result.wltpRange} miles
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Realistic Range</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  {result.realisticRange} miles
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-error">
                <p className="text-secondary text-sm mb-2">Range Reduction</p>
                <p className="font-mono text-2xl font-bold text-error">
                  {result.percentageReduction}%
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p>
                In your typical conditions, you can expect around <strong>{result.realisticRange} miles</strong> of range, compared to the official WLTP rating of {result.wltpRange} miles.
              </p>
            </div>
          </Card>

          {/* Factors Breakdown */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Impact of Factors
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Driving Condition</span>
                <span className="font-mono font-bold text-primary">{result.factors.driving}%</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Temperature</span>
                <span className="font-mono font-bold text-primary">{result.factors.temperature}%</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Heating/Cooling</span>
                <span className="font-mono font-bold text-primary">{result.factors.accessories}%</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Vehicle Load</span>
                <span className="font-mono font-bold text-primary">{result.factors.load}%</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-accent-muted rounded-lg border border-accent font-bold">
                <span className="text-primary">Combined Impact</span>
                <span className="font-mono text-primary">{result.combinedFactor}%</span>
              </div>
            </div>
          </Card>

          {/* Efficiency */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Battery Efficiency
            </h3>

            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-secondary text-sm mb-2">Miles per kWh (WLTP)</p>
              <p className="font-mono text-xl font-bold text-primary">
                {result.wltpEfficiency} mi/kWh
              </p>
              <p className="text-xs text-secondary mt-2">
                Your {result.batteryCapacity} kWh battery has a nominal efficiency of {result.wltpEfficiency} miles per kilowatt-hour under WLTP test conditions.
              </p>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Tips for Maximising Range
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>Reduce speed on motorways to 55-60 mph for significant range gains</li>
              <li>Use eco or range modes when available</li>
              <li>Minimise heating and air conditioning use</li>
              <li>Keep tyres properly inflated (check manufacturer specs)</li>
              <li>Remove unnecessary weight from the vehicle</li>
              <li>Plan routes with charging stations for longer trips</li>
              <li>Avoid rapid acceleration and hard braking</li>
              <li>Precondition the battery while plugged in before departing</li>
              <li>Cold weather reduces range by 20-40%, so allow extra time in winter</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
