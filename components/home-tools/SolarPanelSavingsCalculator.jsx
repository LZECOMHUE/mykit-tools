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

export default function SolarPanelSavingsCalculator() {
  const [roofDirection, setRoofDirection] = useState('S');
  const [roofAngle, setRoofAngle] = useState('30');
  const [systemSize, setSystemSize] = useState('5');
  const [annualElectricityUsage, setAnnualElectricityUsage] = useState(3500);
  const [electricityTariff, setElectricityTariff] = useState(24.5);
  const [exportTariff, setExportTariff] = useState(15);

  const directions = [
    { value: 'N', label: 'North' },
    { value: 'NE', label: 'North-East' },
    { value: 'E', label: 'East' },
    { value: 'SE', label: 'South-East' },
    { value: 'S', label: 'South' },
    { value: 'SW', label: 'South-West' },
    { value: 'W', label: 'West' },
    { value: 'NW', label: 'North-West' },
  ];

  const angles = [
    { value: 'flat', label: 'Flat Roof (0 degrees)' },
    { value: '15', label: '15 degrees' },
    { value: '30', label: '30 degrees (Optimal)' },
    { value: '45', label: '45 degrees' },
  ];

  const systemSizes = [
    { value: '3', label: '3 kW (8 panels)' },
    { value: '4', label: '4 kW (10 panels)' },
    { value: '5', label: '5 kW (13 panels)' },
    { value: '6', label: '6 kW (16 panels)' },
    { value: '8', label: '8 kW (21 panels)' },
    { value: '10', label: '10 kW (26 panels)' },
  ];

  const calculations = useMemo(() => {
    // Performance factors by direction and angle
    const performanceFactors = {
      N: { flat: 0.60, 15: 0.65, 30: 0.68, 45: 0.65 },
      NE: { flat: 0.75, 15: 0.82, 30: 0.85, 45: 0.82 },
      E: { flat: 0.80, 15: 0.88, 30: 0.90, 45: 0.87 },
      SE: { flat: 0.88, 15: 0.95, 30: 0.97, 45: 0.94 },
      S: { flat: 0.95, 15: 1.0, 30: 1.0, 45: 0.97 },
      SW: { flat: 0.88, 15: 0.95, 30: 0.97, 45: 0.94 },
      W: { flat: 0.80, 15: 0.88, 30: 0.90, 45: 0.87 },
      NW: { flat: 0.75, 15: 0.82, 30: 0.85, 45: 0.82 },
    };

    const sizeKw = parseFloat(systemSize);
    const angle = roofAngle;
    const direction = roofDirection;

    // Base UK irradiance: ~1100 kWh/kW/year for south-facing 30 degrees
    const baseIrradiance = 1100;
    const performanceFactor = performanceFactors[direction][angle];
    const estimatedGeneration = baseIrradiance * sizeKw * performanceFactor;

    // Self-consumption assumptions: typically 40-50% depending on usage pattern
    const selfConsumptionRate = 0.45;
    const selfConsumedKwh = estimatedGeneration * selfConsumptionRate;
    const exportedKwh = estimatedGeneration - selfConsumedKwh;

    // Financial calculations
    const electricityRate = electricityTariff / 100;
    const exportRate = exportTariff / 100;

    const selfConsumptionSavings = selfConsumedKwh * electricityRate;
    const exportIncome = exportedKwh * exportRate;
    const totalAnnualBenefit = selfConsumptionSavings + exportIncome;

    // System cost (approximately £1800-2200 per kW installed in 2026/27)
    const costPerKw = 2000;
    const systemCost = sizeKw * costPerKw;

    // Government grants/loans (£5000 SHDF grant possible, but uncertain - show what's possible)
    const potentialGrant = 5000;

    // Payback period
    const netCost = systemCost - potentialGrant;
    const paybackPeriod = netCost > 0 ? netCost / totalAnnualBenefit : 0;

    // 25-year projection
    const years = Array.from({ length: 26 }, (_, i) => i);
    const systemProjection = years.map(year => ({
      year,
      cumulative: totalAnnualBenefit * year - (year > 0 ? systemCost : 0),
      generation: estimatedGeneration,
    }));

    return {
      estimatedGeneration,
      selfConsumedKwh,
      exportedKwh,
      selfConsumptionSavings,
      exportIncome,
      totalAnnualBenefit,
      systemCost,
      potentialGrant,
      netCost,
      paybackPeriod,
      systemProjection,
      performanceFactor,
    };
  }, [roofDirection, roofAngle, systemSize, annualElectricityUsage, electricityTariff, exportTariff]);

  const maxCumulative = Math.max(
    ...calculations.systemProjection.map(p => Math.abs(p.cumulative))
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border space-y-4">


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Roof Direction"
            options={directions}
            value={roofDirection}
            onChange={(e) => setRoofDirection(e.target.value)}
            helper="South-facing is optimal"
          />
          <Select
            label="Roof Angle/Pitch"
            options={angles}
            value={roofAngle}
            onChange={(e) => setRoofAngle(e.target.value)}
            helper="30 degrees is ideal for UK"
          />
          <Select
            label="System Size"
            options={systemSizes}
            value={systemSize}
            onChange={(e) => setSystemSize(e.target.value)}
            helper="Typical domestic system"
          />
          <Input
            label="Electricity Import Tariff (p/kWh)"
            type="number"
            value={electricityTariff}
            onChange={(e) => setElectricityTariff(parseFloat(e.target.value) || 0)}
            min="10"
            step="0.5"
            helper="Current cap rate: 24.5p"
          />
          <Input
            label="Export Tariff (p/kWh)"
            type="number"
            value={exportTariff}
            onChange={(e) => setExportTariff(parseFloat(e.target.value) || 0)}
            min="5"
            step="0.5"
            helper="SEG rates: typically 12-20p"
          />
          <Input
            label="Annual Electricity Usage (kWh)"
            type="number"
            value={annualElectricityUsage}
            onChange={(e) => setAnnualElectricityUsage(parseFloat(e.target.value) || 0)}
            min="1000"
            step="200"
            helper="For reference only"
          />
        </div>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-[12px] p-4">
          <p className="text-xs text-yellow-700 uppercase font-semibold mb-1">Annual Generation</p>
          <p className="text-2xl font-bold font-mono text-yellow-600">
            {calculations.estimatedGeneration.toFixed(0)}
          </p>
          <p className="text-xs text-yellow-600 mt-1">kWh/year</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Benefit</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.totalAnnualBenefit)}
          </p>
          <p className="text-xs text-green-600 mt-1">savings + exports</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">System Cost</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.systemCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">before grants</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Payback Period</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.paybackPeriod.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">years</p>
        </div>
      </div>

      {/* Generation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-[12px]">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Annual Generation</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Total Generation</span>
              <span className="font-mono font-bold text-text-primary">
                {calculations.estimatedGeneration.toFixed(0)} kWh
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Self-Consumed</span>
              <span className="font-mono font-bold text-text-primary">
                {calculations.selfConsumedKwh.toFixed(0)} kWh
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-amber-50 px-3 py-2 rounded-[8px]">
              <span className="text-text-primary font-semibold">Exported to Grid</span>
              <span className="font-mono font-bold text-amber-600">
                {calculations.exportedKwh.toFixed(0)} kWh
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">
            <p>Performance factor: <span className="font-bold text-text-primary">{(calculations.performanceFactor * 100).toFixed(0)}%</span></p>
            <p className="text-xs mt-1">Based on direction and angle</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-[12px]">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Annual Income</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Self-Consumption Savings</span>
              <span className="font-mono font-bold text-green-600">
                {formatCurrency(calculations.selfConsumptionSavings)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Export Income (SEG)</span>
              <span className="font-mono font-bold text-green-600">
                {formatCurrency(calculations.exportIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-green-50 px-3 py-2 rounded-[8px]">
              <span className="text-text-primary font-semibold">Total Benefit</span>
              <span className="font-mono text-lg font-bold text-green-600">
                {formatCurrency(calculations.totalAnnualBenefit)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment & Payback */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Investment & Payback</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-text-secondary mb-2">System Installation Cost</p>
            <p className="text-2xl font-bold font-mono text-text-primary">
              {formatCurrency(calculations.systemCost)}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-2">Potential Grant/Loan</p>
            <p className="text-2xl font-bold font-mono text-green-600">
              {formatCurrency(calculations.potentialGrant)}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-[8px] p-4">
            <p className="text-sm text-blue-700 font-semibold mb-2">Net Cost</p>
            <p className="text-2xl font-bold font-mono text-blue-600">
              {formatCurrency(calculations.netCost)}
            </p>
            <p className="text-xs text-blue-600 mt-1">Payback: {calculations.paybackPeriod.toFixed(1)} years</p>
          </div>
        </div>
      </div>

      {/* 25-Year Projection */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">25-Year Cumulative Return</h3>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {calculations.systemProjection.map((item) => {
            const isPositive = item.cumulative > 0;
            const width = Math.abs((item.cumulative / maxCumulative) * 100);

            return (
              <div key={item.year}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-text-secondary">Year {item.year}</span>
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
            After 25 years, your solar system will have saved you approximately {formatCurrency(calculations.totalAnnualBenefit * 25)}
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Solar Panel Benefits</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>Annual savings of {formatCurrency(calculations.totalAnnualBenefit)} from day one</li>
          <li>Generate {(calculations.estimatedGeneration / 1000).toFixed(1)} MWh clean electricity per year</li>
          <li>Payback in {calculations.paybackPeriod.toFixed(1)} years</li>
          <li>25-year lifespan with minimal maintenance</li>
          <li>Export excess power to grid via Smart Export Guarantee (SEG)</li>
          <li>Reduce carbon footprint by ~4 tonnes per year</li>
          <li>Increase home value (typically adds 3-4% to property value)</li>
          <li>Protection against rising electricity prices</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Optimization Tips</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>Combine with battery storage to increase self-consumption rate</li>
          <li>Time high-consumption activities (laundry, dishwasher) for midday solar peak</li>
          <li>Install smart meter to track generation and consumption</li>
          <li>Pair with heat pump for cheaper winter heating</li>
          <li>Clean panels annually for optimal output</li>
          <li>Get multiple quotes from MCS-accredited installers</li>
          <li>Check your feed-in tariff options (SEG rates vary by provider)</li>
        </ul>
      </div>
    </div>
  );
}
