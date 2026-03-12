'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const APPLIANCE_PRESETS = {
  kettle: { name: 'Kettle', wattage: 3000 },
  oven: { name: 'Oven', wattage: 2000 },
  tv: { name: 'TV', wattage: 100 },
  washingMachine: { name: 'Washing Machine', wattage: 500 },
  laptop: { name: 'Laptop', wattage: 65 },
  fridge: { name: 'Fridge', wattage: 150 },
  tumbleDryer: { name: 'Tumble Dryer', wattage: 2500 },
  dishwasher: { name: 'Dishwasher', wattage: 1800 },
  gamingPC: { name: 'Gaming PC', wattage: 500 },
  heater: { name: 'Electric Heater', wattage: 2000 },
};

export default function ElectricityCostCalculator() {
  const [appliances, setAppliances] = useState([
    { id: 1, wattage: 2000, hoursPerDay: 2, name: 'Example Appliance' },
  ]);
  const [ratePerKWh, setRatePerKWh] = useState(24.5); // pence
  const [nextId, setNextId] = useState(2);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { id: nextId, wattage: 2000, hoursPerDay: 1, name: 'New Appliance' },
    ]);
    setNextId(nextId + 1);
  };

  const removeAppliance = (id) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter((a) => a.id !== id));
    }
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(
      appliances.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const selectPreset = (id, presetKey) => {
    const preset = APPLIANCE_PRESETS[presetKey];
    updateAppliance(id, 'wattage', preset.wattage);
    updateAppliance(id, 'name', preset.name);
  };

  const calculations = useMemo(() => {
    return appliances.map((appliance) => {
      const kwhPerDay = (appliance.wattage / 1000) * appliance.hoursPerDay;
      const kwhPerWeek = kwhPerDay * 7;
      const kwhPerMonth = kwhPerDay * 30;
      const kwhPerYear = kwhPerDay * 365;

      const costPerDay = (kwhPerDay * ratePerKWh) / 100;
      const costPerWeek = (kwhPerWeek * ratePerKWh) / 100;
      const costPerMonth = (kwhPerMonth * ratePerKWh) / 100;
      const costPerYear = (kwhPerYear * ratePerKWh) / 100;
      const costPerHour = (appliance.wattage / 1000 * ratePerKWh) / 100;

      return {
        ...appliance,
        kwhPerDay,
        kwhPerWeek,
        kwhPerMonth,
        kwhPerYear,
        costPerHour,
        costPerDay,
        costPerWeek,
        costPerMonth,
        costPerYear,
      };
    });
  }, [appliances, ratePerKWh]);

  const totals = useMemo(() => {
    const totalKwhPerDay = calculations.reduce((sum, a) => sum + a.kwhPerDay, 0);
    const totalKwhPerWeek = calculations.reduce((sum, a) => sum + a.kwhPerWeek, 0);
    const totalKwhPerMonth = calculations.reduce((sum, a) => sum + a.kwhPerMonth, 0);
    const totalKwhPerYear = calculations.reduce((sum, a) => sum + a.kwhPerYear, 0);
    const totalCostPerDay = calculations.reduce((sum, a) => sum + a.costPerDay, 0);
    const totalCostPerWeek = calculations.reduce((sum, a) => sum + a.costPerWeek, 0);
    const totalCostPerMonth = calculations.reduce((sum, a) => sum + a.costPerMonth, 0);
    const totalCostPerYear = calculations.reduce((sum, a) => sum + a.costPerYear, 0);

    return {
      totalKwhPerDay,
      totalKwhPerWeek,
      totalKwhPerMonth,
      totalKwhPerYear,
      totalCostPerDay,
      totalCostPerWeek,
      totalCostPerMonth,
      totalCostPerYear,
    };
  }, [calculations]);

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">
          Electricity Rate
        </h2>
        <div className="max-w-xs">
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Rate (pence per kWh)
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step="0.1"
              value={ratePerKWh}
              onChange={(e) => setRatePerKWh(parseFloat(e.target.value) || 0)}
              placeholder="Rate in pence"
              className="flex-1"
            />
            <span className="text-text-muted text-sm">p/kWh</span>
          </div>
          <p className="text-text-muted text-xs mt-2">UK average 2025: ~24.5p</p>
        </div>
      </Card>

      {calculations.map((calc, idx) => (
        <Card key={calc.id} className="border border-border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-text-primary font-heading text-lg font-bold">
              Appliance {idx + 1}
            </h3>
            {appliances.length > 1 && (
              <Button variant="ghost" onClick={() => removeAppliance(calc.id)} className="text-sm">
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                value={calc.name}
                onChange={(e) => updateAppliance(calc.id, 'name', e.target.value)}
                placeholder="Appliance name"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Quick Select
              </label>
              <Select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) selectPreset(calc.id, e.target.value);
                }}
              >
                <option value="">Common appliances...</option>
                {Object.entries(APPLIANCE_PRESETS).map(([key, preset]) => (
                  <option key={key} value={key}>
                    {preset.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Wattage (W)
              </label>
              <Input
                type="number"
                value={calc.wattage}
                onChange={(e) => updateAppliance(calc.id, 'wattage', parseFloat(e.target.value) || 0)}
                placeholder="Watts"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Hours Used Per Day
              </label>
              <Input
                type="number"
                step="0.5"
                value={calc.hoursPerDay}
                onChange={(e) => updateAppliance(calc.id, 'hoursPerDay', parseFloat(e.target.value) || 0)}
                placeholder="Hours"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-surface rounded-lg border border-border">
            <div>
              <p className="text-text-muted text-xs mb-1">Per Hour</p>
              <p className="font-mono-num text-sm font-bold text-text-primary">
                {fmt(calc.costPerHour)}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Per Day</p>
              <p className="font-mono-num text-sm font-bold text-text-primary">
                {fmt(calc.costPerDay)}
              </p>
              <p className="text-text-muted text-xs mt-1">{calc.kwhPerDay.toFixed(2)}kWh</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Per Week</p>
              <p className="font-mono-num text-sm font-bold text-text-primary">
                {fmt(calc.costPerWeek)}
              </p>
              <p className="text-text-muted text-xs mt-1">{calc.kwhPerWeek.toFixed(2)}kWh</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Per Month</p>
              <p className="font-mono-num text-sm font-bold text-text-primary">
                {fmt(calc.costPerMonth)}
              </p>
              <p className="text-text-muted text-xs mt-1">{calc.kwhPerMonth.toFixed(2)}kWh</p>
            </div>
            <div>
              <p className="text-text-muted text-xs mb-1">Per Year</p>
              <p className="font-mono-num text-sm font-bold text-text-primary">
                {fmt(calc.costPerYear)}
              </p>
              <p className="text-text-muted text-xs mt-1">{calc.kwhPerYear.toFixed(2)}kWh</p>
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={addAppliance} variant="secondary" className="w-full">
        + Add Another Appliance
      </Button>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Total Household Cost</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-2">Per Day</p>
            <p className="font-mono-num text-xl font-bold text-accent">
              {fmt(totals.totalCostPerDay)}
            </p>
            <p className="text-text-muted text-xs mt-1">{totals.totalKwhPerDay.toFixed(2)}kWh</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-2">Per Week</p>
            <p className="font-mono-num text-xl font-bold text-accent">
              {fmt(totals.totalCostPerWeek)}
            </p>
            <p className="text-text-muted text-xs mt-1">{totals.totalKwhPerWeek.toFixed(2)}kWh</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-2">Per Month</p>
            <p className="font-mono-num text-xl font-bold text-accent">
              {fmt(totals.totalCostPerMonth)}
            </p>
            <p className="text-text-muted text-xs mt-1">{totals.totalKwhPerMonth.toFixed(2)}kWh</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-2">Per Year</p>
            <p className="font-mono-num text-xl font-bold text-accent">
              {fmt(totals.totalCostPerYear)}
            </p>
            <p className="text-text-muted text-xs mt-1">{totals.totalKwhPerYear.toFixed(2)}kWh</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
