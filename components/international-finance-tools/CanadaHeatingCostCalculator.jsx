'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CanadaHeatingCostCalculator() {
  const [config, setConfig] = useState({
    province: 'ontario',
    homeSize: '1500',
    heatingType: 'gas',
    insulation: 'average',
  });

  // Annual heating costs for 1500 sqft home (baseline)
  const baselineAnnualCosts = {
    ontario: { gas: 1800, electric: 2400, oil: 2200, 'heat-pump': 1600 },
    alberta: { gas: 1500, electric: 2200, oil: 2000, 'heat-pump': 1400 },
    bc: { gas: 1400, electric: 1800, oil: 1900, 'heat-pump': 1200 },
    quebec: { gas: 1700, electric: 1600, oil: 2100, 'heat-pump': 1400 },
    manitoba: { gas: 2000, electric: 2600, oil: 2400, 'heat-pump': 1700 },
    saskatchewan: { gas: 2200, electric: 2800, oil: 2600, 'heat-pump': 1900 },
  };

  const insulationMultiplier = {
    poor: 1.3,
    average: 1.0,
    good: 0.85,
    excellent: 0.7,
  };

  const results = useMemo(() => {
    const homeSize = parseFloat(config.homeSize) || 1500;
    const baseLine1500 = baselineAnnualCosts[config.province]?.[config.heatingType] || 1800;
    const baselineForHomeSize = (baseLine1500 / 1500) * homeSize;
    const insMultiplier = insulationMultiplier[config.insulation] || 1.0;
    const adjustedAnnual = baselineForHomeSize * insMultiplier;
    const monthly = adjustedAnnual / 12;

    // Build comparison with all heating types
    const comparisonData = {};
    const provinceData = baselineAnnualCosts[config.province] || baselineAnnualCosts.ontario;
    Object.entries(provinceData).forEach(([type, baseCost]) => {
      const sizedCost = (baseCost / 1500) * homeSize;
      const adjusted = sizedCost * insMultiplier;
      comparisonData[type] = {
        annual: adjusted,
        monthly: adjusted / 12,
      };
    });

    return {
      monthlyEstimate: monthly,
      annualEstimate: adjustedAnnual,
      comparisonData,
      homeSize,
      insulationLevel: config.insulation,
    };
  }, [config]);

  const heatingTypeLabels = {
    gas: 'Natural Gas',
    electric: 'Electric',
    oil: 'Oil',
    'heat-pump': 'Heat Pump',
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Your Information
        </h2>

        <div className="space-y-4">
          <Select
            label="Province"
            value={config.province}
            onChange={(e) => setConfig({ ...config, province: e.target.value })}
            options={[
              { value: 'ontario', label: 'Ontario' },
              { value: 'alberta', label: 'Alberta' },
              { value: 'bc', label: 'British Columbia' },
              { value: 'quebec', label: 'Quebec' },
              { value: 'manitoba', label: 'Manitoba' },
              { value: 'saskatchewan', label: 'Saskatchewan' },
            ]}
          />

          <Input
            label="Home Size (square feet)"
            type="number"
            value={config.homeSize}
            onChange={(e) => setConfig({ ...config, homeSize: e.target.value })}
            placeholder="e.g., 1500"
            helperText="Typical Canadian home: 1500-2000 sqft"
          />

          <Select
            label="Primary Heating Type"
            value={config.heatingType}
            onChange={(e) => setConfig({ ...config, heatingType: e.target.value })}
            options={[
              { value: 'gas', label: 'Natural Gas (most common)' },
              { value: 'electric', label: 'Electric Baseboard/Furnace' },
              { value: 'oil', label: 'Oil Furnace' },
              { value: 'heat-pump', label: 'Heat Pump (most efficient)' },
            ]}
          />

          <Select
            label="Home Insulation Quality"
            value={config.insulation}
            onChange={(e) => setConfig({ ...config, insulation: e.target.value })}
            options={[
              { value: 'poor', label: 'Poor (older home, minimal insulation)' },
              { value: 'average', label: 'Average (typical 1970s-2000s home)' },
              { value: 'good', label: 'Good (newer home, decent insulation)' },
              { value: 'excellent', label: 'Excellent (modern, well-insulated, high-efficiency)' },
            ]}
          />
        </div>
      </Card>

      <Card className="p-6 bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          Estimated Heating Cost
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-secondary mb-1">Monthly</p>
            <p className="text-3xl font-mono font-bold text-primary">
              ${results.monthlyEstimate.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Annual</p>
            <p className="text-3xl font-mono font-bold text-accent">
              ${results.annualEstimate.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="text-sm text-secondary mt-4">
          For a {results.homeSize.toLocaleString()} sqft home with {results.insulationLevel} insulation
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-semibold text-primary mb-4">
          Heating Type Comparison
        </h3>
        <div className="space-y-3">
          {Object.entries(results.comparisonData).map(([type, costs]) => (
            <div
              key={type}
              className={`p-4 rounded-lg border-2 ${
                type === config.heatingType
                  ? 'border-accent bg-accent-muted'
                  : 'border-border bg-surface'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-primary">{heatingTypeLabels[type]}</p>
                  <p className="text-sm text-secondary">
                    {type === 'gas' && 'Most common, moderate cost'}
                    {type === 'electric' && 'Higher cost, good reliability'}
                    {type === 'oil' && 'Higher cost, less common in cities'}
                    {type === 'heat-pump' && 'Lowest cost, very efficient'}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary">Monthly:</span>
                <span className="font-mono font-medium text-primary">
                  ${costs.monthly.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary">Annual:</span>
                <span className="font-mono font-bold text-accent">
                  ${costs.annual.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h3 className="font-heading font-semibold text-primary mb-3">
          Ways to Reduce Heating Costs
        </h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Improve insulation: adds cost upfront but saves ~15-30% annually</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Install a heat pump: most efficient, especially effective for moderate climates</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Seal air leaks: windows, doors, basement (low cost, high impact)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Use a programmable thermostat: 10-15% savings by optimizing schedule</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Lower thermostat by 2 degrees: 3% savings per degree</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Check eligibility for government rebates (provincial/federal insulation programs)</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <h3 className="font-heading font-semibold text-primary mb-3">
          Insulation Quality Impact
        </h3>
        <div className="space-y-2 text-sm text-secondary">
          <div className="flex justify-between">
            <span>Poor insulation (30% increase)</span>
            <span className="font-mono">+{((1.3 - 1.0) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Average insulation (baseline)</span>
            <span className="font-mono">0%</span>
          </div>
          <div className="flex justify-between">
            <span>Good insulation (15% decrease)</span>
            <span className="font-mono">{((0.85 - 1.0) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Excellent insulation (30% decrease)</span>
            <span className="font-mono">{((0.7 - 1.0) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-green-50 border border-green-200">
        <h3 className="font-heading font-semibold text-primary mb-3">
          Provincial Climate Context
        </h3>
        <div className="space-y-2 text-sm text-secondary">
          {config.province === 'manitoba' && (
            <p>Manitoba has long, harsh winters. Heating costs are among the highest in Canada. Insulation upgrades are highly valuable.</p>
          )}
          {config.province === 'saskatchewan' && (
            <p>Saskatchewan experiences very cold winters with significant heating demand. Heat pump efficiency may be lower than in milder provinces.</p>
          )}
          {config.province === 'ontario' && (
            <p>Ontario has moderate winters. Natural gas is the standard. Many homes benefit from heat pump upgrades.</p>
          )}
          {config.province === 'bc' && (
            <p>BC has milder winters than the prairies, especially coastal regions. Heat pumps are very effective here.</p>
          )}
          {config.province === 'quebec' && (
            <p>Quebec has cold winters but very cheap hydro electricity, making electric heating cost-effective. Many homes use electric baseboards.</p>
          )}
          {config.province === 'alberta' && (
            <p>Alberta has cold winters and natural gas is readily available and relatively affordable.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
