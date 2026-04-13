'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function SolarBatteryPaybackCalculator() {
  const [solarSize, setSolarSize] = useState('5');
  const [usagePattern, setUsagePattern] = useState('balanced');
  const [batterySize, setBatterySize] = useState('5');
  const [batteryCost, setBatteryCost] = useState(5000);
  const [electricityTariff, setElectricityTariff] = useState(24.5);
  const [exportTariff, setExportTariff] = useState(15);

  const solarSizes = [
    { value: '3', label: '3 kW Solar System' },
    { value: '4', label: '4 kW Solar System' },
    { value: '5', label: '5 kW Solar System' },
    { value: '6', label: '6 kW Solar System' },
    { value: '8', label: '8 kW Solar System' },
  ];

  const patterns = [
    { value: 'day-heavy', label: 'Day Heavy (9am-5pm usage)' },
    { value: 'balanced', label: 'Balanced (throughout day)' },
    { value: 'evening-heavy', label: 'Evening Heavy (5pm-11pm usage)' },
  ];

  const batterySizes = [
    { value: '3', label: '3 kWh (compact)' },
    { value: '5', label: '5 kWh (popular)' },
    { value: '8', label: '8 kWh (large)' },
    { value: '10', label: '10 kWh (premium)' },
    { value: '13.5', label: '13.5 kWh (maximum)' },
  ];

  const calculations = useMemo(() => {
    const solarSizeKw = parseFloat(solarSize);
    const batterySizeKwh = parseFloat(batterySize);
    const costPerKwh = batteryCost / batterySizeKwh;

    // Annual solar generation (south-facing, 30 degrees, 1100 kWh/kW/year)
    const annualGeneration = solarSizeKw * 1100;

    // Daily generation profile (kWh per day)
    const avgDailyGeneration = annualGeneration / 365;

    // Self-consumption rate without battery
    const baseConsumptionRate = 0.45; // 45% self-consumed
    const withoutBatterySelfConsumption = avgDailyGeneration * baseConsumptionRate;
    const withoutBatteryExport = avgDailyGeneration - withoutBatterySelfConsumption;

    // Self-consumption rate with battery (varies by usage pattern)
    const consumptionByPattern = {
      'day-heavy': 0.65,
      'balanced': 0.75,
      'evening-heavy': 0.85,
    };

    const consumptionRate = consumptionByPattern[usagePattern];
    const withBatterySelfConsumption = avgDailyGeneration * consumptionRate;
    const withBatteryExport = avgDailyGeneration - withBatterySelfConsumption;

    // Battery enables additional self-consumption
    const additionalSelfConsumption = withBatterySelfConsumption - withoutBatterySelfConsumption;

    // Financial calculations
    const electricityRate = electricityTariff / 100;
    const exportRate = exportTariff / 100;

    const withoutBatteryDailySavings = (withoutBatterySelfConsumption * electricityRate) + (withoutBatteryExport * exportRate);
    const withBatteryDailySavings = (withBatterySelfConsumption * electricityRate) + (withBatteryExport * exportRate);

    const batterySavingsPerDay = withBatteryDailySavings - withoutBatteryDailySavings;
    const batterySavingsPerYear = batterySavingsPerDay * 365;

    // Payback period
    const paybackPeriod = batterySavingsPerYear > 0 ? batteryCost / batterySavingsPerYear : 999;

    // Degradation: battery loses ~0.5-1% capacity per year
    const degradation = 0.995; // 0.5% annual loss
    const degradationFactor = (year) => Math.pow(degradation, year);

    // 15-year projection (typical battery warranty)
    const years = Array.from({ length: 16 }, (_, i) => i);
    const projection = years.map(year => ({
      year,
      annualBenefit: batterySavingsPerYear * degradationFactor(year),
      cumulative: batterySavingsPerYear * Array.from({ length: year }, (_, y) => degradationFactor(y)).reduce((a, b) => a + b, 0) - (year > 0 ? batteryCost : 0),
      capacity: batterySizeKwh * degradationFactor(year),
    }));

    // Comparison scenarios
    const scenarioComparison = [
      {
        name: 'Solar Only',
        dailySelfConsumption: withoutBatterySelfConsumption,
        dailyExport: withoutBatteryExport,
        dailySavings: withoutBatteryDailySavings,
        annualSavings: withoutBatteryDailySavings * 365,
        systemCost: solarSizeKw * 2000,
      },
      {
        name: 'Solar + Battery',
        dailySelfConsumption: withBatterySelfConsumption,
        dailyExport: withBatteryExport,
        dailySavings: withBatteryDailySavings,
        annualSavings: withBatteryDailySavings * 365,
        systemCost: (solarSizeKw * 2000) + batteryCost,
      },
    ];

    return {
      solarGeneration: annualGeneration,
      avgDailyGeneration,
      additionalSelfConsumption,
      withoutBatterySelfConsumption,
      withBatterySelfConsumption,
      batterySavingsPerDay,
      batterySavingsPerYear,
      paybackPeriod,
      projection,
      scenarioComparison,
      costPerKwh,
    };
  }, [solarSize, batterySize, usagePattern, batteryCost, electricityTariff, exportTariff]);

  const maxCumulative = Math.max(
    ...calculations.projection.map(p => p.cumulative),
    0
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border space-y-4">


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Solar System Size"
            options={solarSizes}
            value={solarSize}
            onChange={(e) => setSolarSize(e.target.value)}
          />
          <Select
            label="Daily Usage Pattern"
            options={patterns}
            value={usagePattern}
            onChange={(e) => setUsagePattern(e.target.value)}
            helper="Affects self-consumption rate"
          />
          <Select
            label="Battery Size"
            options={batterySizes}
            value={batterySize}
            onChange={(e) => setBatterySize(e.target.value)}
            helper="Storage capacity in kWh"
          />
          <Input
            label="Battery Installation Cost (£)"
            type="number"
            value={batteryCost}
            onChange={(e) => setBatteryCost(parseFloat(e.target.value) || 0)}
            min="3000"
            step="500"
            helper="Installed cost"
          />
          <Input
            label="Electricity Import Tariff (p/kWh)"
            type="number"
            value={electricityTariff}
            onChange={(e) => setElectricityTariff(parseFloat(e.target.value) || 0)}
            step="0.5"
            helper="Price cap: 24.5p"
          />
          <Input
            label="Export Tariff (p/kWh)"
            type="number"
            value={exportTariff}
            onChange={(e) => setExportTariff(parseFloat(e.target.value) || 0)}
            step="0.5"
            helper="SEG rates: 12-20p"
          />
        </div>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Additional Daily Self-Consumption</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.additionalSelfConsumption.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">kWh/day from battery</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Battery Savings</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.batterySavingsPerYear)}
          </p>
          <p className="text-xs text-green-600 mt-1">per year</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Battery Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(batteryCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">Cost per kWh: {formatCurrency(calculations.costPerKwh)}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4">
          <p className="text-xs text-amber-700 uppercase font-semibold mb-1">Payback Period</p>
          <p className="text-2xl font-bold font-mono text-amber-600">
            {calculations.paybackPeriod < 50 ? calculations.paybackPeriod.toFixed(1) : '15+'}
          </p>
          <p className="text-xs text-amber-600 mt-1">years</p>
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Solar Only vs Solar + Battery</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculations.scenarioComparison.map((scenario, idx) => (
            <div key={idx} className="border border-border rounded-[8px] p-4">
              <h4 className="font-bold text-text-primary mb-3">{scenario.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Daily Self-Consumption</span>
                  <span className="font-mono font-bold text-text-primary">
                    {scenario.dailySelfConsumption.toFixed(1)} kWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Daily Export</span>
                  <span className="font-mono font-bold text-text-primary">
                    {scenario.dailyExport.toFixed(1)} kWh
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-text-secondary">Daily Savings</span>
                  <span className="font-mono font-bold text-green-600">
                    {formatCurrency(scenario.dailySavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-primary font-semibold">Annual Savings</span>
                  <span className="font-mono font-bold text-green-600">
                    {formatCurrency(scenario.annualSavings)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-text-secondary">System Cost</span>
                  <span className="font-mono font-bold text-text-primary">
                    {formatCurrency(scenario.systemCost)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-[8px]">
          <p className="text-sm text-blue-800">
            <span className="font-bold">Battery adds: </span>
            {formatCurrency(calculations.batterySavingsPerYear)}/year benefit, payback in {calculations.paybackPeriod < 50 ? calculations.paybackPeriod.toFixed(1) : '15+'} years
          </p>
        </div>
      </div>

      {/* 15-Year Projection */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">15-Year Cumulative Return</h3>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {calculations.projection.map((item) => {
            const isPositive = item.cumulative > 0;
            const width = maxCumulative > 0 ? (Math.abs(item.cumulative) / maxCumulative) * 100 : 0;

            return (
              <div key={item.year}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-text-secondary">
                    Year {item.year}
                    {item.year > 0 && ` (Capacity: ${item.capacity.toFixed(2)} kWh)`}
                  </span>
                  <span className="text-xs font-mono text-text-primary">
                    {isPositive ? '+' : ''}{formatCurrency(item.cumulative)}
                  </span>
                </div>
                <div className="w-full bg-surface rounded-[4px] overflow-hidden h-4">
                  <div
                    className={isPositive ? 'bg-green-500' : 'bg-red-500'}
                    style={{
                      width: `${width}%`,
                      marginLeft: isPositive ? '0' : 'auto',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-[8px]">
          <p className="text-sm text-green-800 font-semibold">
            Battery breaks even in year {calculations.projection.findIndex(p => p.cumulative > 0)}. After 15 years: {formatCurrency(calculations.projection[15].cumulative)} return
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Battery Benefits</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>Increase solar self-consumption from 45% to 75-85%</li>
          <li>Save an extra {formatCurrency(calculations.batterySavingsPerYear)} per year</li>
          <li>Payback period: {calculations.paybackPeriod < 50 ? calculations.paybackPeriod.toFixed(1) + ' years' : '15+ years (long-term investment)'}</li>
          <li>Energy independence: use solar power in evening</li>
          <li>Backup power in grid outages (if hybrid system)</li>
          <li>Flatten your consumption profile</li>
          <li>Export less = receive less low-rate export income</li>
          <li>Battery warranty: typically 10-15 years</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Battery Optimization</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>For day-heavy usage: smaller battery (3-5 kWh) is more cost-effective</li>
          <li>For evening-heavy usage: larger battery (8-13.5 kWh) captures morning generation</li>
          <li>Install smart controls to charge battery when export tariff is low</li>
          <li>Time your largest loads (laundry, EV charging) to battery discharge hours</li>
          <li>Consider time-of-use tariffs: charge battery during cheap hours, discharge during peak</li>
          <li>Monitor battery degradation (should be &lt;1% per year)</li>
          <li>Pair with smart meter to see real-time generation and usage</li>
          <li>Check if your installer offers battery upgrades after purchase</li>
        </ul>
      </div>

      {/* When to Add Battery */}
      <div className="bg-purple-50 border border-purple-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-purple-900 mb-4">When to Add Battery?</h3>
        <div className="space-y-3 text-sm text-purple-800">
          <p><span className="font-semibold">Add battery now if:</span></p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Payback period is under 10 years</li>
            <li>You have evening-heavy usage</li>
            <li>Export tariff is very low (under 10p/kWh)</li>
            <li>You want energy independence</li>
            <li>Grid outages are frequent in your area</li>
          </ul>

          <p><span className="font-semibold">Wait and add later if:</span></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Payback period is over 12 years</li>
            <li>You have day-heavy usage (most self-consumed already)</li>
            <li>Battery prices are dropping (historically 5-10% per year)</li>
            <li>Your household usage pattern may change</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
