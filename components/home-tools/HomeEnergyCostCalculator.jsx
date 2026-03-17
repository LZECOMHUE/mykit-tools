'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function HomeEnergyCostCalculator() {
  const [electricityRate, setElectricityRate] = useState(24.5);
  const [appliances, setAppliances] = useState([
    { id: 1, name: 'Central Heating (30kW)', wattage: 3000, hoursPerWeek: 80 },
    { id: 2, name: 'Hot Water (immersion)', wattage: 3000, hoursPerWeek: 10 },
    { id: 3, name: 'Oven', wattage: 2000, hoursPerWeek: 4 },
    { id: 4, name: 'Hob', wattage: 3000, hoursPerWeek: 8 },
    { id: 5, name: 'Fridge (continuous)', wattage: 150, hoursPerWeek: 168 },
    { id: 6, name: 'Freezer (continuous)', wattage: 150, hoursPerWeek: 168 },
    { id: 7, name: 'Washing Machine', wattage: 2000, hoursPerWeek: 2 },
    { id: 8, name: 'Tumble Dryer', wattage: 3000, hoursPerWeek: 1 },
    { id: 9, name: 'Dishwasher', wattage: 1800, hoursPerWeek: 2 },
    { id: 10, name: 'TV', wattage: 120, hoursPerWeek: 35 },
    { id: 11, name: 'Computer', wattage: 200, hoursPerWeek: 30 },
    { id: 12, name: 'Lighting (20 bulbs)', wattage: 200, hoursPerWeek: 70 },
    { id: 13, name: 'EV Charger (home)', wattage: 7000, hoursPerWeek: 3 },
  ]);
  const [nextId, setNextId] = useState(14);

  const commonAppliances = [
    { name: 'Kettle', wattage: 3000 },
    { name: 'Microwave', wattage: 1000 },
    { name: 'Toaster', wattage: 1500 },
    { name: 'Shower (Electric)', wattage: 8000 },
    { name: 'Cooker Ring', wattage: 2000 },
    { name: 'Dehumidifier', wattage: 300 },
    { name: 'Air Fryer', wattage: 1500 },
    { name: 'Coffee Maker', wattage: 1000 },
    { name: 'Vacuum Cleaner', wattage: 1500 },
    { name: 'Iron', wattage: 2000 },
    { name: 'Hair Dryer', wattage: 1800 },
    { name: 'Pool Pump', wattage: 1000 },
  ];

  const addAppliance = (template) => {
    setAppliances([
      ...appliances,
      { id: nextId, name: template.name, wattage: template.wattage, hoursPerWeek: 1 },
    ]);
    setNextId(nextId + 1);
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(appliances.map(a =>
      a.id === id ? { ...a, [field]: field === 'name' ? value : parseFloat(value) || 0 } : a
    ));
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const calculations = useMemo(() => {
    const costPerKwh = electricityRate / 100;

    const applianceCosts = appliances.map(app => {
      const kwhPerHour = app.wattage / 1000;
      const weeklyKwh = kwhPerHour * app.hoursPerWeek;
      const hourly = kwhPerHour * costPerKwh;
      const daily = (weeklyKwh / 7) * costPerKwh;
      const weekly = weeklyKwh * costPerKwh;
      const monthly = weekly * 4.33;
      const annual = weekly * 52;

      return {
        id: app.id,
        name: app.name,
        hourly,
        daily,
        weekly,
        monthly,
        annual,
        weeklyKwh,
      };
    });

    const totals = {
      hourly: applianceCosts.reduce((sum, a) => sum + a.hourly, 0),
      daily: applianceCosts.reduce((sum, a) => sum + a.daily, 0),
      weekly: applianceCosts.reduce((sum, a) => sum + a.weekly, 0),
      monthly: applianceCosts.reduce((sum, a) => sum + a.monthly, 0),
      annual: applianceCosts.reduce((sum, a) => sum + a.annual, 0),
    };

    // Total kWh
    const weeklyKwh = applianceCosts.reduce((sum, a) => sum + a.weeklyKwh, 0);
    const annualKwh = weeklyKwh * 52;

    return { applianceCosts, totals, weeklyKwh, annualKwh };
  }, [appliances, electricityRate]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Settings */}
      <div className="bg-surface rounded-[12px] border border-border p-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary mb-6">Home Energy Cost Calculator</h2>

        <div className="max-w-xs">
          <Input
            label="Electricity Rate (pence per kWh)"
            type="number"
            value={electricityRate}
            onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
            helper="UK price cap (Mar 2026): 24.5p"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Day</p>
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(calculations.totals.daily)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Week</p>
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(calculations.totals.weekly)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Month</p>
          <p className="text-xl font-bold text-accent font-mono">
            {formatCurrency(calculations.totals.monthly)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Year</p>
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(calculations.totals.annual)}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4 text-center">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Annual kWh</p>
          <p className="text-xl font-bold text-blue-600 font-mono">
            {calculations.annualKwh.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Add Appliances */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Add Common Appliances</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {commonAppliances.map((appliance, idx) => (
            <button
              key={idx}
              onClick={() => addAppliance(appliance)}
              className="px-3 py-2 text-sm font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border rounded-[8px] transition"
            >
              + {appliance.name}
            </button>
          ))}
        </div>
      </div>

      {/* Appliances Table */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Your Appliances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Appliance</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Wattage (W)</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Hours/Week</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Daily Cost</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Monthly Cost</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Annual Cost</th>
                <th className="text-center px-3 py-2 text-text-primary font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance, idx) => {
                const cost = calculations.applianceCosts[idx];
                return (
                  <tr key={appliance.id} className="border-b border-border hover:bg-surface">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={appliance.name}
                        onChange={(e) => updateAppliance(appliance.id, 'name', e.target.value)}
                        placeholder="Appliance name"
                        className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary"
                      />
                    </td>
                    <td className="text-right px-3 py-2">
                      <input
                        type="number"
                        value={appliance.wattage}
                        onChange={(e) => updateAppliance(appliance.id, 'wattage', e.target.value)}
                        min="0"
                        step="100"
                        className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary text-right"
                      />
                    </td>
                    <td className="text-right px-3 py-2">
                      <input
                        type="number"
                        value={appliance.hoursPerWeek}
                        onChange={(e) => updateAppliance(appliance.id, 'hoursPerWeek', e.target.value)}
                        min="0"
                        step="0.5"
                        className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary text-right"
                      />
                    </td>
                    <td className="text-right px-3 py-2 font-mono text-text-primary">
                      {formatCurrency(cost.daily)}
                    </td>
                    <td className="text-right px-3 py-2 font-mono text-text-primary">
                      {formatCurrency(cost.monthly)}
                    </td>
                    <td className="text-right px-3 py-2 font-mono font-bold text-text-primary">
                      {formatCurrency(cost.annual)}
                    </td>
                    <td className="text-center px-3 py-2">
                      <button
                        onClick={() => removeAppliance(appliance.id)}
                        className="text-error hover:text-error text-sm font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Daily Cost</span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.totals.daily)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Weekly Cost</span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.totals.weekly)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Monthly Cost</span>
              <span className="font-mono font-bold text-accent">
                {formatCurrency(calculations.totals.monthly)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-text-primary font-semibold">Annual Cost</span>
              <span className="font-mono text-lg font-bold text-accent">
                {formatCurrency(calculations.totals.annual)}
              </span>
            </div>
            <div className="pt-3 border-t border-border text-sm">
              <p className="text-text-secondary">Annual kWh: {calculations.annualKwh.toFixed(0)}</p>
              <p className="text-text-secondary">Average daily: {calculations.totals.daily > 0 ? (calculations.annualKwh / 365).toFixed(1) : '0'} kWh</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">💡 Money-Saving Tips</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>Switch to LED bulbs (save 75% on lighting)</li>
            <li>Use eco-modes on appliances (10-20% saving)</li>
            <li>Turn off standby features (save 5-10%)</li>
            <li>Use timer-controlled heating/water</li>
            <li>Run full loads in washing machines/dishwashers</li>
            <li>Close doors when heating individual rooms</li>
            <li>Unplug chargers when not in use</li>
            <li>Use air fryer instead of oven (30% less energy)</li>
            <li>Insulate hot water pipes (reduce heat loss)</li>
            <li>Install smart thermostat (auto optimization)</li>
          </ul>
        </div>
      </div>

      {/* Top Energy Users */}
      {appliances.length > 0 && (
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Top Energy Consumers</h3>
          <div className="space-y-3">
            {calculations.applianceCosts
              .slice()
              .sort((a, b) => b.annual - a.annual)
              .slice(0, 8)
              .map((cost, idx) => {
                const percentage = calculations.totals.annual > 0 ? (cost.annual / calculations.totals.annual) * 100 : 0;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{cost.name}</p>
                      <p className="text-xs text-text-muted">
                        {(cost.weeklyKwh * 52).toFixed(0)} kWh/year ({percentage.toFixed(0)}% of total)
                      </p>
                    </div>
                    <div className="w-32 bg-surface rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="font-mono font-bold text-text-primary w-20 text-right">
                      {formatCurrency(cost.annual)}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Appliance Wattage Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">Typical Appliance Wattages</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <p className="font-semibold mb-2">High Power (2000+W)</p>
            <ul className="space-y-1 text-xs">
              <li>Oven: 2000W</li>
              <li>Hob: 3000W</li>
              <li>Tumble Dryer: 3000W</li>
              <li>Shower (Electric): 8000W</li>
              <li>EV Charger: 7000W</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">Medium Power (500-2000W)</p>
            <ul className="space-y-1 text-xs">
              <li>Washing Machine: 2000W</li>
              <li>Dishwasher: 1800W</li>
              <li>Microwave: 1000W</li>
              <li>Kettle: 3000W</li>
              <li>Hair Dryer: 1800W</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">Low Power (under 500W)</p>
            <ul className="space-y-1 text-xs">
              <li>TV: 100-120W</li>
              <li>Computer: 200-400W</li>
              <li>Laptop: 50-100W</li>
              <li>Fridge: 150W</li>
              <li>Freezer: 150W</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
