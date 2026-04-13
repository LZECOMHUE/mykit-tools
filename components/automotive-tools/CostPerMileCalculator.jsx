'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CostPerMileCalculator() {
  const [fuelType, setFuelType] = useState('petrol');
  const [efficiency, setEfficiency] = useState('45');
  const [fuelPrice, setFuelPrice] = useState('1.35');
  const [result, setResult] = useState(null);

  const FUEL_TYPES = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const MILEAGES = [5000, 10000, 15000, 20000];
  const HMRC_RATE_PETROL = 0.45; // First 10k
  const HMRC_RATE_AFTER = 0.25; // After 10k

  function calculate() {
    const eff = parseFloat(efficiency) || 1;
    const price = parseFloat(fuelPrice) || 0;

    let costPerMile, unit;

    if (fuelType === 'electric') {
      // Efficiency is in miles per kWh
      costPerMile = price / eff;
      unit = '£/kWh';
    } else {
      // Efficiency is in mpg
      costPerMile = price / eff;
      unit = '£/litre';
    }

    const costPerHundredMiles = costPerMile * 100;

    setResult({
      costPerMile: (costPerMile * 100).toFixed(2),
      costPerHundredMiles: costPerHundredMiles.toFixed(2),
      annualCosts: MILEAGES.map((miles) => ({
        miles,
        cost: (costPerMile * miles).toFixed(2),
      })),
      hmrcComparison: {
        hmrcPence: fuelType === 'petrol' ? HMRC_RATE_PETROL * 100 : 25,
        actualPence: (costPerMile * 100).toFixed(2),
      },
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Fuel Type
            </label>
            <Select
              options={FUEL_TYPES}
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              {fuelType === 'electric' ? 'Efficiency (miles/kWh)' : 'Fuel Efficiency (mpg)'}
            </label>
            <Input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              placeholder={fuelType === 'electric' ? '3 to 4 typical' : '40 to 50 typical'}
              min="0.1"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              {fuelType === 'electric' ? 'Electricity Price (£/kWh)' : 'Fuel Price (£/litre)'}
            </label>
            <Input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder={fuelType === 'electric' ? '0.28' : '1.35'}
              min="0.01"
              step="0.01"
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Cost
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Main Results */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Cost Per Mile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Pence Per Mile</p>
                <p className="font-mono text-3xl font-bold text-primary">
                  {result.costPerMile}p
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Cost Per 100 Miles</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  £{result.costPerHundredMiles}
                </p>
              </div>
            </div>
          </Card>

          {/* Annual Mileage Costs */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Annual Costs at Different Mileages
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Annual Miles</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Annual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {result.annualCosts.map((row) => (
                    <tr key={row.miles} className="border-b border-border">
                      <td className="py-3 px-2 text-secondary">{row.miles.toLocaleString()}</td>
                      <td className="text-right font-mono font-bold text-primary">
                        £{row.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* HMRC Comparison */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Comparison with HMRC Mileage Rate
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">HMRC Allowance Rate</p>
                <p className="font-mono text-xl font-bold text-primary">
                  {result.hmrcComparison.hmrcPence}p
                </p>
                <p className="text-xs text-secondary mt-2">
                  {fuelType === 'petrol'
                    ? 'First 10,000 miles per year at 45p'
                    : 'Standard comparison rate'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Your Actual Cost</p>
                <p className="font-mono text-xl font-bold text-primary">
                  {result.hmrcComparison.actualPence}p
                </p>
                <p className="text-xs text-secondary mt-2">
                  {parseFloat(result.hmrcComparison.actualPence) < result.hmrcComparison.hmrcPence
                    ? 'Lower than HMRC allowance'
                    : 'Higher than HMRC allowance'}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-2">What this means:</p>
              {parseFloat(result.hmrcComparison.actualPence) < result.hmrcComparison.hmrcPence ? (
                <p>
                  Your actual fuel costs ({result.hmrcComparison.actualPence}p/mile) are below the HMRC allowance ({result.hmrcComparison.hmrcPence}p/mile). If you're self-employed, you could claim the HMRC rate for a tax deduction, even though your actual costs are lower.
                </p>
              ) : (
                <p>
                  Your actual fuel costs ({result.hmrcComparison.actualPence}p/mile) exceed the HMRC allowance ({result.hmrcComparison.hmrcPence}p/mile). You can only claim the HMRC allowance as a tax deduction, not your actual costs.
                </p>
              )}
            </div>
          </Card>

          {/* Notes */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Notes
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>This calculation shows fuel costs only, not maintenance, insurance, or depreciation</li>
              <li>HMRC mileage allowance includes fuel, wear and tear, and insurance</li>
              <li>Actual efficiency varies based on driving conditions, traffic, and vehicle load</li>
              <li>Electricity prices vary by supplier and time of use tariffs</li>
              <li>Fuel prices fluctuate regularly</li>
              <li>For tax purposes, use HMRC approved mileage rates</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
