'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SalarySacrificeCarCalculator() {
  const [grossSalary, setGrossSalary] = useState('50000');
  const [p11dValue, setP11dValue] = useState('25000');
  const [monthlyCost, setMonthlyCost] = useState('450');
  const [co2, setCo2] = useState('120');
  const [fuelType, setFuelType] = useState('petrol');
  const [taxBracket, setTaxBracket] = useState('20');
  const [result, setResult] = useState(null);

  const FUEL_TYPES = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' },
  ];

  const TAX_BRACKETS = [
    { value: '20', label: '20% (Basic rate)' },
    { value: '40', label: '40% (Higher rate)' },
    { value: '45', label: '45% (Additional rate)' },
  ];

  const BIK_RATES = {
    petrol: 15,
    diesel: 18,
    hybrid: 12,
    electric: 2,
  };

  const NI_THRESHOLD_2026 = 12570;
  const NI_RATE = 0.08;
  const EMPLOYER_NI_THRESHOLD = 9100;
  const EMPLOYER_NI_RATE = 0.15;

  function calculate() {
    const salary = parseFloat(grossSalary) || 50000;
    const p11d = parseFloat(p11dValue) || 0;
    const monthly = parseFloat(monthlyCost) || 0;
    const bracket = parseFloat(taxBracket) || 20;
    const bikRate = BIK_RATES[fuelType] || 15;

    // Taxable benefit from BIK
    const bikValue = (p11d * bikRate) / 100;

    // Salary sacrifice reduction
    const annualSacrifice = monthly * 12;

    // Tax relief (income tax)
    const incomeTaxRelief = (annualSacrifice * bracket) / 100;

    // NI relief on gross salary reduction
    const contributionsOnSalary = salary - annualSacrifice;
    let niRelief = 0;
    if (salary > NI_THRESHOLD_2026) {
      const originalNI = (salary - NI_THRESHOLD_2026) * NI_RATE;
      const newNI = Math.max(0, (contributionsOnSalary - NI_THRESHOLD_2026) * NI_RATE);
      niRelief = originalNI - newNI;
    }

    // Total employee saving
    const totalSaving = incomeTaxRelief + niRelief;

    // Net monthly cost
    const netMonthlyCost = monthly - (totalSaving / 12);

    // Monthly breakdown
    const monthlyTaxRelief = incomeTaxRelief / 12;
    const monthlyNISaving = niRelief / 12;

    // BIK tax
    const bikTax = (bikValue * bracket) / 100;
    const monthlyBikTax = bikTax / 12;

    // True monthly cost (after tax relief, before BIK tax)
    const trueMonthlyBeforeBIK = monthly - monthlyTaxRelief - monthlyNISaving;
    const trueMonthlyWithBIK = trueMonthlyBeforeBIK + monthlyBikTax;

    // Comparison: personal lease at same monthly cost
    // Employee would need to pay from post-tax salary
    const requiredPreTaxForPersonalLease = monthly / (1 - bracket / 100);

    setResult({
      annualSacrifice: annualSacrifice.toFixed(2),
      incomeTaxRelief: incomeTaxRelief.toFixed(2),
      niRelief: niRelief.toFixed(2),
      totalAnnualSaving: totalSaving.toFixed(2),
      monthlyTaxRelief: monthlyTaxRelief.toFixed(2),
      monthlyNISaving: monthlyNISaving.toFixed(2),
      monthlyBikTax: monthlyBikTax.toFixed(2),
      netMonthlyCost: netMonthlyCost.toFixed(2),
      trueMonthlyWithBIK: trueMonthlyWithBIK.toFixed(2),
      bikValue: bikValue.toFixed(2),
      bikTax: bikTax.toFixed(2),
      requiredPreTaxForPersonalLease: requiredPreTaxForPersonalLease.toFixed(2),
      personalLeaseAfterTaxCost: (requiredPreTaxForPersonalLease * (1 - bracket / 100)).toFixed(2),
      netMonthlyAdvantage: (monthly - trueMonthlyWithBIK).toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Gross Annual Salary (£)
            </label>
            <Input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              placeholder="Enter gross salary"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Monthly Car Lease Cost (£)
            </label>
            <Input
              type="number"
              value={monthlyCost}
              onChange={(e) => setMonthlyCost(e.target.value)}
              placeholder="Enter monthly cost"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Car P11D Value (£)
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
            Calculate Savings
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Monthly Cost Breakdown */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Monthly Cost Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Lease cost</span>
                <span className="font-mono font-bold">£{monthlyCost}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Less: Income tax relief</span>
                <span className="font-mono font-bold text-accent">-£{result.monthlyTaxRelief}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Less: National Insurance saving</span>
                <span className="font-mono font-bold text-accent">-£{result.monthlyNISaving}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border bg-accent-muted p-3 rounded">
                <span className="font-medium text-primary">Net cost (before BIK tax)</span>
                <span className="font-mono font-bold text-primary">£{result.trueMonthlyBeforeBIK}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Plus: BIK tax liability</span>
                <span className="font-mono font-bold text-error">+£{result.monthlyBikTax}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-accent-muted rounded font-bold">
                <span className="text-primary">Total true monthly cost</span>
                <span className="font-mono text-accent">£{result.trueMonthlyWithBIK}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-border">
              <p className="font-bold text-accent mb-2">Monthly advantage over personal lease:</p>
              <p className="font-mono text-lg text-accent">£{result.netMonthlyAdvantage}</p>
              <p className="text-xs text-secondary mt-2">
                A personal lease at the same cost would require £{result.requiredPreTaxForPersonalLease} of gross salary, costing £{result.personalLeaseAfterTaxCost} net per month.
              </p>
            </div>
          </Card>

          {/* Annual Summary */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Annual Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Income Tax Relief</p>
                <p className="font-mono text-xl font-bold text-primary">£{result.incomeTaxRelief}</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">NI Saving</p>
                <p className="font-mono text-xl font-bold text-primary">£{result.niRelief}</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">BIK Tax Cost</p>
                <p className="font-mono text-xl font-bold text-error">£{result.bikTax}</p>
              </div>

              <div className="p-4 bg-accent-muted rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-2">Net Annual Saving</p>
                <p className="font-mono text-xl font-bold text-accent">
                  £{(parseFloat(result.totalAnnualSaving) - parseFloat(result.bikTax)).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-2">How this works:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>You sacrifice £{result.annualSacrifice} from gross salary</li>
                <li>This saves income tax (£{result.incomeTaxRelief}) and National Insurance (£{result.niRelief})</li>
                <li>The car is treated as a benefit, creating a BIK tax liability (£{result.bikTax})</li>
                <li>Overall net gain after BIK tax: £{(parseFloat(result.totalAnnualSaving) - parseFloat(result.bikTax)).toFixed(2)}</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
