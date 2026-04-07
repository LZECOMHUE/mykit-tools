'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function HeatPumpSavingsCalculator() {
  const [currentHeatingType, setCurrentHeatingType] = useState('gas');
  const [annualHeatingCost, setAnnualHeatingCost] = useState(1500);
  const [propertyType, setPropertyType] = useState('semi');
  const [insulationLevel, setInsulationLevel] = useState('average');

  const heatingTypes = [
    { value: 'gas', label: 'Gas Boiler' },
    { value: 'oil', label: 'Oil Boiler' },
    { value: 'lpg', label: 'LPG Boiler' },
    { value: 'electric', label: 'Electric Heating' },
  ];

  const propertyTypes = [
    { value: 'detached', label: 'Detached House' },
    { value: 'semi', label: 'Semi-Detached House' },
    { value: 'terrace', label: 'Terraced House' },
    { value: 'flat', label: 'Flat/Apartment' },
  ];

  const insulationLevels = [
    { value: 'poor', label: 'Poor (draughty, single glazing)' },
    { value: 'average', label: 'Average (some insulation)' },
    { value: 'good', label: 'Good (well insulated)' },
  ];

  const calculations = useMemo(() => {
    // COP ranges by insulation level
    const copByInsulation = {
      poor: 2.8,
      average: 3.2,
      good: 3.5,
    };

    const cop = copByInsulation[insulationLevel];

    // Calculate current efficiency by fuel type
    const boilerEfficiency = {
      gas: 0.90,
      oil: 0.85,
      lpg: 0.90,
      electric: 1.0,
    }[currentHeatingType];

    // Heat pump annual cost using COP
    const heatPumpCost = annualHeatingCost * (boilerEfficiency / cop);

    // Annual savings
    const annualSavings = annualHeatingCost - heatPumpCost;

    // Installation costs by property type
    const installationCosts = {
      detached: 12000,
      semi: 10000,
      terrace: 9500,
      flat: 8000,
    };

    const installationCost = installationCosts[propertyType];

    // BUS grant (£7,500 in 2026/27)
    const busGrant = 7500;

    // Net installation cost
    const netInstallationCost = installationCost - busGrant;

    // Payback period
    const paybackPeriod = netInstallationCost > 0 ? netInstallationCost / annualSavings : 0;

    // 10-year comparison
    const years = Array.from({ length: 11 }, (_, i) => i);
    const costComparison = years.map(year => ({
      year,
      current: annualHeatingCost * year,
      heatPump: heatPumpCost * year + (year > 0 ? netInstallationCost : 0),
    }));

    // Carbon emissions (kg CO2 per year)
    const carbonByFuel = {
      gas: 6.0, // kg CO2 per £ spent (approximately)
      oil: 7.5,
      lpg: 6.5,
      electric: 0.3, // Grid average
    };

    const carbonFactor = carbonByFuel[currentHeatingType];
    const currentCarbon = annualHeatingCost * carbonFactor;
    const heatPumpCarbon = heatPumpCost * 0.3; // Heat pump uses grid electricity

    return {
      cop,
      heatPumpCost,
      annualSavings,
      installationCost,
      busGrant,
      netInstallationCost,
      paybackPeriod,
      costComparison,
      currentCarbon,
      heatPumpCarbon,
    };
  }, [currentHeatingType, annualHeatingCost, propertyType, insulationLevel]);

  const maxCost = Math.max(
    ...calculations.costComparison.map(c => Math.max(c.current, c.heatPump))
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">Heat Pump Savings Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Current Heating Type"
            options={heatingTypes}
            value={currentHeatingType}
            onChange={(e) => setCurrentHeatingType(e.target.value)}
          />
          <Select
            label="Property Type"
            options={propertyTypes}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
          <Select
            label="Insulation Level"
            options={insulationLevels}
            value={insulationLevel}
            onChange={(e) => setInsulationLevel(e.target.value)}
          />
          <Input
            label="Annual Heating Cost (£)"
            type="number"
            value={annualHeatingCost}
            onChange={(e) => setAnnualHeatingCost(parseFloat(e.target.value) || 0)}
            min="500"
            step="50"
            helper="Your current annual heating bill"
          />
        </div>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Heat Pump COP</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.cop.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">Efficiency rating</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Annual Heating Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.heatPumpCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">With heat pump</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Savings</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.annualSavings)}
          </p>
          <p className="text-xs text-green-600 mt-1">vs current heating</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4">
          <p className="text-xs text-amber-700 uppercase font-semibold mb-1">Payback Period</p>
          <p className="text-2xl font-bold font-mono text-amber-600">
            {calculations.paybackPeriod.toFixed(1)}
          </p>
          <p className="text-xs text-amber-600 mt-1">years (net of BUS grant)</p>
        </div>
      </div>

      {/* Installation & Costs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Installation Costs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">System & Installation</span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.installationCost)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">BUS Grant (2026/27)</span>
              <span className="font-mono font-bold text-green-600">
                -£{calculations.busGrant.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-amber-50 px-3 py-2 rounded-[8px]">
              <span className="text-text-primary font-semibold">Net Cost</span>
              <span className="font-mono text-lg font-bold text-amber-600">
                {formatCurrency(calculations.netInstallationCost)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Carbon Emissions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Current System</span>
              <span className="font-mono font-bold text-text-primary">
                {calculations.currentCarbon.toFixed(0)} kg CO2/yr
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">With Heat Pump</span>
              <span className="font-mono font-bold text-text-primary">
                {calculations.heatPumpCarbon.toFixed(0)} kg CO2/yr
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-green-50 px-3 py-2 rounded-[8px]">
              <span className="text-text-primary font-semibold">Reduction</span>
              <span className="font-mono text-lg font-bold text-green-600">
                {(calculations.currentCarbon - calculations.heatPumpCarbon).toFixed(0)} kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Year Cost Comparison Chart */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-6">10-Year Cost Comparison</h3>

        <div className="space-y-4">
          {calculations.costComparison.map((item) => {
            const currentWidth = (item.current / maxCost) * 100;
            const heatPumpWidth = (item.heatPump / maxCost) * 100;

            return (
              <div key={item.year}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">Year {item.year}</span>
                  <span className="text-xs text-text-muted">
                    Current: {formatCurrency(item.current)} vs Heat Pump: {formatCurrency(item.heatPump)}
                  </span>
                </div>
                <div className="flex gap-2 h-5">
                  <div className="flex-1 bg-blue-200 rounded-[4px] overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${currentWidth}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-green-200 rounded-[4px] overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${heatPumpWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-[2px]" />
            <span className="text-text-secondary">Current System</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-[2px]" />
            <span className="text-text-secondary">Heat Pump</span>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Heat Pump Benefits</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>Lower running costs (saves {formatCurrency(calculations.annualSavings)}/year)</li>
          <li>Reduced carbon emissions (save {(calculations.currentCarbon - calculations.heatPumpCarbon).toFixed(0)} kg CO2/year)</li>
          <li>BUS grant available: {formatCurrency(calculations.busGrant)}</li>
          <li>Payback period of {calculations.paybackPeriod.toFixed(1)} years (after grant)</li>
          <li>Works with existing radiators (no major disruption)</li>
          <li>Can provide summer cooling if space-cool capable</li>
          <li>Qualifies for SEG (Smart Export Guarantee) payments if paired with solar</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Tips to Maximize Savings</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>Improve insulation first (loft, cavity walls, windows) to lower heat demand</li>
          <li>Better insulation = higher heat pump COP = faster payback</li>
          <li>Pair with solar panels for cheaper electricity to run the heat pump</li>
          <li>Install a smart thermostat to optimize heating schedules</li>
          <li>Use time-of-use tariffs: run heat pump during cheap rate periods</li>
          <li>Add thermal storage (immersion tank) to shift heating to off-peak hours</li>
        </ul>
      </div>
    </div>
  );
}
