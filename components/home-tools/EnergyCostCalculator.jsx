'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function EnergyCostCalculator() {
  const [electricity, setElectricity] = useState(24.5);
  const [appliances, setAppliances] = useState([
    { id: 1, name: 'Kettle', wattage: 3000, hoursPerDay: 0.25 },
    { id: 2, name: 'TV', wattage: 100, hoursPerDay: 4 },
    { id: 3, name: 'Washing Machine', wattage: 500, hoursPerDay: 0.5 },
  ]);
  const [nextId, setNextId] = useState(4);

  const commonAppliances = [
    { name: 'Kettle', wattage: 3000 },
    { name: 'Oven', wattage: 2000 },
    { name: 'Washing Machine', wattage: 500 },
    { name: 'Dishwasher', wattage: 1800 },
    { name: 'Tumble Dryer', wattage: 3000 },
    { name: 'Microwave', wattage: 1000 },
    { name: 'Fridge', wattage: 150 },
    { name: 'Freezer', wattage: 150 },
    { name: 'TV', wattage: 100 },
    { name: 'Laptop', wattage: 65 },
    { name: 'Mobile Charger', wattage: 5 },
    { name: 'Heating (30kW)', wattage: 3000 },
    { name: 'Air Conditioning', wattage: 2500 },
    { name: 'Shower (Electric)', wattage: 8000 },
    { name: 'Cooker (Single Ring)', wattage: 2000 },
    { name: 'Bathroom Fan', wattage: 50 },
    { name: 'Lights (LED - 10 bulbs)', wattage: 100 },
    { name: 'Lights (Incandescent - 10 bulbs)', wattage: 500 },
    { name: 'Toaster', wattage: 1500 },
    { name: 'Vacuum Cleaner', wattage: 1500 },
  ];

  const formatCurrency = (value) => {
    if (value < 1) {
      return 'p' + (value * 100).toFixed(1);
    }
    return '£' + value.toFixed(2);
  };

  const addAppliance = (template) => {
    setAppliances([
      ...appliances,
      { id: nextId, name: template.name, wattage: template.wattage, hoursPerDay: 1 },
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
    const costPerKwh = electricity / 100;

    const applianceCosts = appliances.map(app => {
      const kwh = (app.wattage / 1000) * app.hoursPerDay;
      const hourly = kwh * costPerKwh;
      const daily = hourly * 24;
      const weekly = daily * 7;
      const monthly = daily * 30.44;
      const annual = daily * 365;

      return {
        id: app.id,
        name: app.name,
        hourly,
        daily,
        weekly,
        monthly,
        annual,
        kwh,
      };
    });

    const totals = {
      hourly: applianceCosts.reduce((sum, a) => sum + a.hourly, 0),
      daily: applianceCosts.reduce((sum, a) => sum + a.daily, 0),
      weekly: applianceCosts.reduce((sum, a) => sum + a.weekly, 0),
      monthly: applianceCosts.reduce((sum, a) => sum + a.monthly, 0),
      annual: applianceCosts.reduce((sum, a) => sum + a.annual, 0),
    };

    return { applianceCosts, totals };
  }, [appliances, electricity]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Settings */}
      <div className="bg-surface rounded-[12px] border border-border p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Energy Cost Calculator</h2>

        <div className="max-w-xs">
          <Input
            label="Electricity Rate (pence per kWh)"
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
            helper="UK typical rate is 24.5p (as of March 2026)"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Hour</p>
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(calculations.totals.hourly)}
          </p>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-4 text-center">
          <p className="text-xs text-text-muted uppercase mb-1">Per Day</p>
          <p className="text-xl font-bold text-accent font-mono">
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
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(calculations.totals.monthly)}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4 text-center">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Per Year</p>
          <p className="text-xl font-bold text-blue-600 font-mono">
            {formatCurrency(calculations.totals.annual)}
          </p>
        </div>
      </div>

      {/* Quick Add Common Appliances */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Add Common Appliances</h3>
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
        <h3 className="text-lg font-bold text-text-primary mb-4">Your Appliances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Appliance</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Wattage (W)</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Hours/Day</th>
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
                        value={appliance.hoursPerDay}
                        onChange={(e) => updateAppliance(appliance.id, 'hoursPerDay', e.target.value)}
                        min="0"
                        step="0.25"
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

      {/* Total Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Cost Breakdown</h3>
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
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4">💡 Money Saving Tips</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>Switch to LED bulbs (use 75% less energy)</li>
            <li>Use the eco-mode on washing machines and dishwashers</li>
            <li>Turn off standby features on electronics</li>
            <li>Use a timer on heating and hot water</li>
            <li>Keep fridges and freezers well-stocked</li>
            <li>Close doors when heating rooms</li>
            <li>Use a pressure cooker to reduce cooking time</li>
          </ul>
        </div>
      </div>

      {/* Top Energy Users */}
      {appliances.length > 0 && (
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Top Energy Consumers</h3>
          <div className="space-y-3">
            {calculations.applianceCosts
              .slice()
              .sort((a, b) => b.annual - a.annual)
              .slice(0, 5)
              .map((cost, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{cost.name}</p>
                    <p className="text-xs text-text-muted">
                      {(cost.kwh * 365).toFixed(0)} kWh/year
                    </p>
                  </div>
                  <div className="w-32 bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-full"
                      style={{
                        width: `${
                          (cost.annual / calculations.totals.annual) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="font-mono font-bold text-text-primary w-20 text-right">
                    {formatCurrency(cost.annual)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
