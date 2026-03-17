'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function BoilerVsHeatPumpCalculator() {
  const [propertyType, setPropertyType] = useState('semi');
  const [propertySize, setPropertySize] = useState('medium');
  const [insulationLevel, setInsulationLevel] = useState('average');
  const [currentFuel, setCurrentFuel] = useState('gas');
  const [annualHeatingCost, setAnnualHeatingCost] = useState(1500);

  const propertyTypes = [
    { value: 'detached', label: 'Detached House' },
    { value: 'semi', label: 'Semi-Detached House' },
    { value: 'terrace', label: 'Terraced House' },
    { value: 'flat', label: 'Flat/Apartment' },
  ];

  const sizes = [
    { value: 'small', label: 'Small (1-2 bed)' },
    { value: 'medium', label: 'Medium (3-4 bed)' },
    { value: 'large', label: 'Large (5+ bed)' },
  ];

  const insulationLevels = [
    { value: 'poor', label: 'Poor (draughty, single glazing)' },
    { value: 'average', label: 'Average (some insulation)' },
    { value: 'good', label: 'Good (well insulated)' },
  ];

  const fuelTypes = [
    { value: 'gas', label: 'Gas Boiler' },
    { value: 'oil', label: 'Oil Boiler' },
    { value: 'lpg', label: 'LPG Boiler' },
    { value: 'electric', label: 'Electric Heating' },
  ];

  const calculations = useMemo(() => {
    // Gas boiler specs
    const gasBoilerCost = 2500;
    const gasEfficiency = 0.90;
    const gasBoilerLifespan = 15;
    const gasAnnualCost = annualHeatingCost;
    const gasMaintenanceCost = 150;
    const gasCarbonFactor = 6.0; // kg CO2 per £ spent

    // Heat pump specs
    const copByInsulation = { poor: 2.8, average: 3.2, good: 3.5 };
    const cop = copByInsulation[insulationLevel];
    const heatPumpCost = 10000;
    const heatPumpInstallationCost = 3000;
    const netHeatPumpCost = heatPumpCost + heatPumpInstallationCost;
    const busGrant = 7500;
    const netHeatPumpCostAfterGrant = netHeatPumpCost - busGrant;
    const heatPumpLifespan = 25;
    const heatPumpRunningCost = annualHeatingCost * (gasEfficiency / cop);
    const heatPumpMaintenanceCost = 100;
    const heatPumpCarbonFactor = 0.3; // kg CO2 per £ (grid electricity)

    // 10-year costs
    const years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const gasCosts = years.map(year => ({
      year,
      fuel: gasAnnualCost * year,
      maintenance: gasMaintenanceCost * year,
      equipment: gasBoilerCost + (year >= gasBoilerLifespan ? gasBoilerCost : 0),
      total: gasBoilerCost + (gasAnnualCost * year) + (gasMaintenanceCost * year) + (year >= gasBoilerLifespan ? gasBoilerCost : 0),
    }));

    const heatPumpCosts = years.map(year => ({
      year,
      fuel: heatPumpRunningCost * year,
      maintenance: heatPumpMaintenanceCost * year,
      equipment: netHeatPumpCostAfterGrant,
      total: netHeatPumpCostAfterGrant + (heatPumpRunningCost * year) + (heatPumpMaintenanceCost * year),
    }));

    // Carbon emissions
    const gasAnnualCarbon = annualHeatingCost * gasCarbonFactor;
    const heatPumpAnnualCarbon = heatPumpRunningCost * heatPumpCarbonFactor;

    // 10-year comparison
    const gasTotal10Year = gasCosts[10].total;
    const heatPumpTotal10Year = heatPumpCosts[10].total;

    // Find payback year
    let paybackYear = 0;
    for (let i = 0; i < years.length; i++) {
      if (gasCosts[i].total > heatPumpCosts[i].total) {
        paybackYear = years[i];
        break;
      }
    }

    return {
      gasBoiler: {
        installationCost: gasBoilerCost,
        annualRunningCost: gasAnnualCost,
        annualMaintenanceCost: gasMaintenanceCost,
        lifespan: gasBoilerLifespan,
        annualCarbon: gasAnnualCarbon,
      },
      heatPump: {
        installationCost: netHeatPumpCost,
        busGrant: busGrant,
        netInstallationCost: netHeatPumpCostAfterGrant,
        annualRunningCost: heatPumpRunningCost,
        annualMaintenanceCost: heatPumpMaintenanceCost,
        lifespan: heatPumpLifespan,
        annualCarbon: heatPumpAnnualCarbon,
        cop,
      },
      gasCosts,
      heatPumpCosts,
      gasTotal10Year,
      heatPumpTotal10Year,
      paybackYear,
      annualSaving: gasAnnualCost - heatPumpRunningCost,
      carbonReduction: gasAnnualCarbon - heatPumpAnnualCarbon,
    };
  }, [propertyType, propertySize, insulationLevel, currentFuel, annualHeatingCost]);

  const maxTotal = Math.max(
    ...calculations.gasCosts.map(c => c.total),
    ...calculations.heatPumpCosts.map(c => c.total)
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">Boiler vs Heat Pump Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Property Type"
            options={propertyTypes}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
          <Select
            label="Property Size"
            options={sizes}
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
          />
          <Select
            label="Insulation Level"
            options={insulationLevels}
            value={insulationLevel}
            onChange={(e) => setInsulationLevel(e.target.value)}
            helper="Affects heat pump efficiency (COP)"
          />
          <Select
            label="Current Fuel Type"
            options={fuelTypes}
            value={currentFuel}
            onChange={(e) => setCurrentFuel(e.target.value)}
          />
          <Input
            label="Annual Heating Cost (£)"
            type="number"
            value={annualHeatingCost}
            onChange={(e) => setAnnualHeatingCost(parseFloat(e.target.value) || 0)}
            min="500"
            step="100"
            helper="Your current annual bill"
          />
        </div>
      </div>

      {/* Quick Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-2">Annual Saving</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.annualSaving)}
          </p>
          <p className="text-xs text-text-secondary mt-1">with heat pump</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-2">Carbon Reduction</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {calculations.carbonReduction.toFixed(0)}
          </p>
          <p className="text-xs text-text-secondary mt-1">kg CO2 per year</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-2">Payback Year</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.paybackYear || '8-10'}
          </p>
          <p className="text-xs text-blue-600 mt-1">approximate</p>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Boiler Column */}
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-xl font-bold font-heading text-text-primary mb-4">Gas Boiler</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted uppercase font-semibold mb-1">Installation Cost</p>
              <p className="text-2xl font-bold font-mono text-text-primary">
                {formatCurrency(calculations.gasBoiler.installationCost)}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-muted uppercase font-semibold mb-3">Annual Costs</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Heating fuel</span>
                  <span className="font-mono font-bold text-text-primary">
                    {formatCurrency(calculations.gasBoiler.annualRunningCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Maintenance & servicing</span>
                  <span className="font-mono font-bold text-text-primary">
                    {formatCurrency(calculations.gasBoiler.annualMaintenanceCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-text-primary font-semibold">Total annual</span>
                  <span className="font-mono font-bold text-text-primary">
                    {formatCurrency(calculations.gasBoiler.annualRunningCost + calculations.gasBoiler.annualMaintenanceCost)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-muted uppercase font-semibold mb-2">Key Specs</p>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>Efficiency: 90%</li>
                <li>Lifespan: {calculations.gasBoiler.lifespan} years</li>
                <li>Emissions: {calculations.gasBoiler.annualCarbon.toFixed(0)} kg CO2/year</li>
                <li>Maintenance: Annual service required</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Heat Pump Column */}
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-xl font-bold font-heading text-green-900 mb-4">Air Source Heat Pump</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-green-700 uppercase font-semibold mb-1">Installation Cost</p>
              <p className="text-lg font-bold font-mono text-text-primary mb-1">
                {formatCurrency(calculations.heatPump.installationCost)}
              </p>
              <div className="flex justify-between text-xs text-green-700">
                <span>Less BUS grant:</span>
                <span className="font-bold">-£{calculations.heatPump.busGrant.toLocaleString()}</span>
              </div>
              <p className="text-lg font-bold font-mono text-green-600 mt-1">
                {formatCurrency(calculations.heatPump.netInstallationCost)} net
              </p>
            </div>

            <div className="pt-4 border-t border-green-200">
              <p className="text-sm text-green-700 uppercase font-semibold mb-3">Annual Costs</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-800">Electricity (heating)</span>
                  <span className="font-mono font-bold text-green-600">
                    {formatCurrency(calculations.heatPump.annualRunningCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Maintenance & servicing</span>
                  <span className="font-mono font-bold text-green-600">
                    {formatCurrency(calculations.heatPump.annualMaintenanceCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-200">
                  <span className="text-green-900 font-semibold">Total annual</span>
                  <span className="font-mono font-bold text-green-600">
                    {formatCurrency(calculations.heatPump.annualRunningCost + calculations.heatPump.annualMaintenanceCost)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-green-200">
              <p className="text-sm text-green-700 uppercase font-semibold mb-2">Key Specs</p>
              <ul className="space-y-1 text-sm text-green-800">
                <li>COP (efficiency): {calculations.heatPump.cop.toFixed(1)}</li>
                <li>Lifespan: {calculations.heatPump.lifespan} years</li>
                <li>Emissions: {calculations.heatPump.annualCarbon.toFixed(0)} kg CO2/year</li>
                <li>Maintenance: Minimal (annual check-up)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Year Cost Comparison */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-6">10-Year Total Cost Comparison</h3>

        <div className="space-y-4">
          {calculations.gasCosts.map((year, idx) => {
            const heatPump = calculations.heatPumpCosts[idx];
            const gasWidth = (year.total / maxTotal) * 100;
            const hpWidth = (heatPump.total / maxTotal) * 100;
            const heatPumpIsWinner = heatPump.total < year.total;

            return (
              <div key={year.year}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-text-secondary">Year {year.year}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="font-mono">Gas: {formatCurrency(year.total)}</span>
                    <span className={`font-mono ${heatPumpIsWinner ? 'text-green-600 font-bold' : ''}`}>
                      HP: {formatCurrency(heatPump.total)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 h-5">
                  <div className="flex-1 bg-blue-200 rounded-[4px] overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${gasWidth}%` }} />
                  </div>
                  <div className="flex-1 bg-green-200 rounded-[4px] overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${hpWidth}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-[2px]" />
            <span className="text-text-secondary">Gas Boiler</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-[2px]" />
            <span className="text-text-secondary">Heat Pump</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-[8px]">
          <p className="text-sm text-blue-800 font-semibold">
            {calculations.heatPumpTotal10Year < calculations.gasTotal10Year
              ? `Heat pump saves £${(calculations.gasTotal10Year - calculations.heatPumpTotal10Year).toFixed(0)} over 10 years`
              : `Gas boiler is cheaper by £${(calculations.heatPumpTotal10Year - calculations.gasTotal10Year).toFixed(0)} in first 10 years`}
          </p>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Gas Boiler Pros & Cons</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Pros</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>Lower upfront cost</li>
                <li>Proven, familiar technology</li>
                <li>No disruption to install</li>
                <li>Works with existing radiators</li>
                <li>Fast heat-up, instant hot water</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Cons</h4>
              <ul className="space-y-1 text-sm text-error">
                <li>Rising gas prices (5-15% per year)</li>
                <li>High carbon emissions</li>
                <li>Needs annual maintenance</li>
                <li>Boiler replacement needed every 15 years</li>
                <li>Vulnerable to future fuel taxes/bans</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Heat Pump Pros & Cons</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Pros</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>Lower running costs (30-50% cheaper)</li>
                <li>Minimal maintenance required</li>
                <li>25-year lifespan (longer than boiler)</li>
                <li>Low carbon emissions (grid-dependent)</li>
                <li>Works with solar for zero-cost heat</li>
                <li>Future-proofs against fuel bans</li>
                <li>Eligibility for BUS grant (£7,500)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-900 mb-2">Cons</h4>
              <ul className="space-y-1 text-sm text-green-900">
                <li>Higher upfront cost (£10-13k)</li>
                <li>Needs outdoor unit space</li>
                <li>Slightly lower comfort in very cold weather</li>
                <li>Requires quality insulation for best results</li>
                <li>Slightly longer heat-up time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* When to Choose Which */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">Which Should You Choose?</h3>

        <div className="space-y-3 text-sm text-amber-800">
          <div className="border-b border-amber-200 pb-3">
            <p className="font-bold text-amber-900">Choose Gas Boiler if:</p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
              <li>You need the lowest upfront cost</li>
              <li>You plan to move in 5-7 years</li>
              <li>Your property is poorly insulated</li>
              <li>Space is very limited for outdoor unit</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-amber-900">Choose Heat Pump if:</p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
              <li>You plan to stay 10+ years</li>
              <li>Your property is well insulated (or you'll improve it)</li>
              <li>You want lower running costs and carbon emissions</li>
              <li>You have space for outdoor unit</li>
              <li>You're eligible for BUS grant</li>
              <li>You already have or plan solar panels</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">💡 Best Approach</h3>
        <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li><span className="font-semibold">Improve insulation first:</span> Better insulation increases heat pump efficiency and reduces costs</li>
          <li><span className="font-semibold">Check BUS grant eligibility:</span> You may qualify for £7,500 towards heat pump</li>
          <li><span className="font-semibold">Get multiple quotes:</span> Prices vary significantly between installers</li>
          <li><span className="font-semibold">Consider timing:</span> Older boilers (10+ years) are good replacement candidates</li>
          <li><span className="font-semibold">Combine with solar:</span> Heat pump plus solar panels = near-zero heating costs</li>
          <li><span className="font-semibold">Plan for the long term:</span> Gas will likely be phased out by 2035</li>
        </ol>
      </div>
    </div>
  );
}
