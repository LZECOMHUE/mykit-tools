'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const BIK_RATES_2025 = {
  'petrol': {
    0: 0,
    1: 10,
    50: 11,
    75: 12,
    100: 13,
    125: 14,
    150: 15,
    155: 16,
    170: 17,
    190: 18,
    210: 19,
    225: 20,
    245: 21,
    270: 22,
  },
  'diesel': {
    0: 0,
    1: 11,
    50: 12,
    75: 13,
    100: 14,
    125: 15,
    150: 16,
    155: 17,
    170: 18,
    190: 19,
    210: 20,
    225: 21,
    245: 22,
    270: 23,
  },
  'hybrid': {
    0: 0,
    1: 10,
    50: 11,
    75: 12,
    100: 13,
    125: 14,
    150: 15,
    155: 16,
    170: 17,
    190: 18,
  },
  'electric': 2,
};

export default function CompanyCarTaxCalculator() {
  const [p11dValue, setP11dValue] = useState('25000');
  const [co2, setCo2] = useState('120');
  const [fuelType, setFuelType] = useState('petrol');
  const [electricRange, setElectricRange] = useState('');
  const [taxYear, setTaxYear] = useState('2025/26');
  const [taxBracket, setTaxBracket] = useState('20');
  const [result, setResult] = useState(null);

  const TAX_BRACKETS = [
    { value: '20', label: '20% (Basic rate)' },
    { value: '40', label: '40% (Higher rate)' },
    { value: '45', label: '45% (Additional rate)' },
  ];

  const FUEL_TYPES = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' },
  ];

  const TAX_YEARS = [
    { value: '2025/26', label: '2025/26' },
    { value: '2026/27', label: '2026/27' },
  ];

  function getBIKPercentage() {
    const co2Num = parseInt(co2) || 0;

    if (fuelType === 'electric') {
      return BIK_RATES_2025.electric;
    }

    const rates = BIK_RATES_2025[fuelType];
    const co2Bands = Object.keys(rates).map(Number).sort((a, b) => a - b);

    for (let i = co2Bands.length - 1; i >= 0; i--) {
      if (co2Num >= co2Bands[i]) {
        return rates[co2Bands[i]];
      }
    }
    return rates[0];
  }

  function calculate() {
    const p11d = parseFloat(p11dValue) || 0;
    const bracket = parseFloat(taxBracket) || 20;

    const bikPercentage = getBIKPercentage();
    const taxableBenefit = (p11d * bikPercentage) / 100;
    const annualTax = (taxableBenefit * bracket) / 100;
    const monthlyTax = annualTax / 12;

    setResult({
      bikPercentage,
      taxableBenefit: taxableBenefit.toFixed(2),
      annualTax: annualTax.toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Company Car Tax Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              P11D Value (£)
            </label>
            <Input
              type="number"
              value={p11dValue}
              onChange={(e) => setP11dValue(e.target.value)}
              placeholder="Enter P11D value"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              CO2 Emissions (g/km)
            </label>
            <Input
              type="number"
              value={co2}
              onChange={(e) => setCo2(e.target.value)}
              placeholder="Enter CO2 emissions"
              min="0"
            />
          </div>

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

          {fuelType === 'hybrid' && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Electric Range (miles)
              </label>
              <Input
                type="number"
                value={electricRange}
                onChange={(e) => setElectricRange(e.target.value)}
                placeholder="Optional: Enter electric range"
                min="0"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Tax Year
            </label>
            <Select
              options={TAX_YEARS}
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Tax Bracket
            </label>
            <Select
              options={TAX_BRACKETS}
              value={taxBracket}
              onChange={(e) => setTaxBracket(e.target.value)}
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Tax
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6 bg-surface">
          <h3 className="font-heading text-xl font-bold text-primary mb-4">
            Your Tax Results
          </h3>

          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <p className="text-secondary text-sm mb-1">BIK Percentage</p>
              <p className="font-mono text-2xl font-bold text-primary">
                {result.bikPercentage.toFixed(1)}%
              </p>
            </div>

            <div className="border-b border-border pb-4">
              <p className="text-secondary text-sm mb-1">Taxable Benefit</p>
              <p className="font-mono text-2xl font-bold text-primary">
                £{result.taxableBenefit}
              </p>
            </div>

            <div className="border-b border-border pb-4">
              <p className="text-secondary text-sm mb-1">Annual Tax Cost</p>
              <p className="font-mono text-2xl font-bold text-accent">
                £{result.annualTax}
              </p>
            </div>

            <div>
              <p className="text-secondary text-sm mb-1">Monthly Tax Cost</p>
              <p className="font-mono text-2xl font-bold text-accent">
                £{result.monthlyTax}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent-muted rounded-lg">
            <p className="text-xs text-secondary">
              This calculation uses the 2025/26 BIK rates. Electric vehicles attract a lower rate to encourage adoption.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
