'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WorkplacePensionCalculator() {
  const [annualSalary, setAnnualSalary] = useState('30000');
  const [employeePercent, setEmployeePercent] = useState('5');
  const [employerPercent, setEmployerPercent] = useState('3');
  const [taxBracket, setTaxBracket] = useState('20');
  const [salarySacrifice, setSalarySacrifice] = useState(false);
  const [yearsToRetirement, setYearsToRetirement] = useState('30');
  const [growth, setGrowth] = useState('6');
  const [result, setResult] = useState(null);

  const TAX_BRACKETS = [
    { value: '20', label: '20% (Basic rate)' },
    { value: '40', label: '40% (Higher rate)' },
    { value: '45', label: '45% (Additional rate)' },
  ];

  function calculate() {
    const salary = parseFloat(annualSalary) || 0;
    const empPercent = parseFloat(employeePercent) || 5;
    const empPercent2 = parseFloat(employerPercent) || 3;
    const bracket = parseFloat(taxBracket) || 20;
    const years = parseInt(yearsToRetirement) || 30;
    const growthRate = parseFloat(growth) || 6;

    // Employee contribution
    let employeeContribution = (salary * empPercent) / 100;

    // With salary sacrifice, this comes from gross salary
    // Tax relief calculation
    let taxRelief = 0;
    if (salarySacrifice) {
      // Full tax relief - salary is reduced before tax
      taxRelief = (employeeContribution * bracket) / 100;
    } else {
      // Relief at source - 20% automatic, but higher rate payers get more
      const automaticRelief = (employeeContribution * 0.20);
      const additionalRelief = bracket > 20 ? (employeeContribution * (bracket - 20)) / 100 : 0;
      taxRelief = automaticRelief + additionalRelief;
    }

    const employerContribution = (salary * empPercent2) / 100;
    const totalAnnualContribution = employeeContribution + employerContribution;
    const effectiveCost = employeeContribution - taxRelief; // what you actually pay

    // National Insurance relief (salary sacrifice only)
    let niRelief = 0;
    if (salarySacrifice) {
      // 8% NI on the employee contribution
      niRelief = (employeeContribution * 0.08);
    }

    const totalSavings = taxRelief + niRelief;
    const netCost = employeeContribution - totalSavings;

    // Projection to retirement
    const monthlyContribution = totalAnnualContribution / 12;
    let projectedPot = 0;
    for (let i = 0; i < years; i++) {
      projectedPot *= (1 + growthRate / 100);
      projectedPot += totalAnnualContribution;
    }

    setResult({
      employeeAnnual: employeeContribution.toFixed(2),
      employeeMonthly: (employeeContribution / 12).toFixed(2),
      employerAnnual: employerContribution.toFixed(2),
      employerMonthly: (employerContribution / 12).toFixed(2),
      totalAnnual: totalAnnualContribution.toFixed(2),
      totalMonthly: monthlyContribution.toFixed(2),
      taxRelief: taxRelief.toFixed(2),
      niRelief: niRelief.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      effectiveCost: Math.max(0, effectiveCost).toFixed(2),
      projectedPot: projectedPot.toFixed(2),
      years,
      grossSalaryReduction: salarySacrifice ? employeeContribution.toFixed(2) : '0',
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Workplace Pension Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Annual Salary (£)
            </label>
            <Input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              placeholder="30000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Employee Contribution (%)
            </label>
            <Input
              type="number"
              value={employeePercent}
              onChange={(e) => setEmployeePercent(e.target.value)}
              placeholder="5"
              min="0"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              Minimum is usually 0.5%, though most people contribute 5-10%
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Employer Contribution (%)
            </label>
            <Input
              type="number"
              value={employerPercent}
              onChange={(e) => setEmployerPercent(e.target.value)}
              placeholder="3"
              min="0"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              Minimum employer matching is 3% on band earnings
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Tax Bracket (%)
            </label>
            <Select
              options={TAX_BRACKETS}
              value={taxBracket}
              onChange={(e) => setTaxBracket(e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={salarySacrifice}
                onChange={(e) => setSalarySacrifice(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-primary">
                Salary Sacrifice Scheme
              </span>
            </label>
            <p className="text-xs text-secondary mt-2 ml-6">
              Check if your employer offers salary sacrifice. This provides additional National Insurance savings.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Years Until Retirement
            </label>
            <Input
              type="number"
              value={yearsToRetirement}
              onChange={(e) => setYearsToRetirement(e.target.value)}
              placeholder="30"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Expected Annual Growth (%)
            </label>
            <Input
              type="number"
              value={growth}
              onChange={(e) => setGrowth(e.target.value)}
              placeholder="6"
              min="0"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              Conservative: 4%, Moderate: 6%, Optimistic: 8%
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Pension
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Projected Pot */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Projected Pension Pot
            </h3>

            <div className="text-center py-6">
              <p className="text-secondary text-sm mb-2">In {result.years} years at {growth}% growth</p>
              <p className="font-mono text-4xl font-bold text-accent">
                £{result.projectedPot}
              </p>
              <p className="text-xs text-secondary mt-4">
                At 4% withdrawal rate, this could give you £{(parseFloat(result.projectedPot) * 0.04).toFixed(2)}/year
              </p>
            </div>
          </Card>

          {/* Annual Contributions */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Annual Contributions
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Source</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Annual</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Your contribution</td>
                    <td className="text-right font-mono">£{result.employeeAnnual}</td>
                    <td className="text-right font-mono">£{result.employeeMonthly}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Employer contribution</td>
                    <td className="text-right font-mono">£{result.employerAnnual}</td>
                    <td className="text-right font-mono">£{result.employerMonthly}</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Total going in</td>
                    <td className="text-right font-mono text-primary">£{result.totalAnnual}</td>
                    <td className="text-right font-mono text-primary">£{result.totalMonthly}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Tax Relief & Savings */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Tax Relief and Savings
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Income Tax Relief</p>
                <p className="font-mono text-lg font-bold text-accent">
                  £{result.taxRelief}/year
                </p>
                <p className="text-xs text-secondary mt-1">
                  Tax saved on your contribution
                </p>
              </div>

              {salarySacrifice && (
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-2">National Insurance Saving</p>
                  <p className="font-mono text-lg font-bold text-accent">
                    £{result.niRelief}/year
                  </p>
                  <p className="text-xs text-secondary mt-1">
                    8% NI saving on salary sacrificed amount
                  </p>
                </div>
              )}

              <div className="p-4 bg-accent-muted rounded-lg border border-accent font-bold">
                <p className="text-secondary text-sm mb-2">Total Annual Saving</p>
                <p className="font-mono text-lg text-accent">
                  £{result.totalSavings}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-300">
                <p className="text-secondary text-sm mb-2">Your Effective Cost</p>
                <p className="font-mono text-lg font-bold text-green-700">
                  £{result.effectiveCost}/year
                </p>
                <p className="text-xs text-green-600 mt-1">
                  What you actually pay out of pocket (£{result.employeeAnnual} minus £{result.totalSavings})
                </p>
              </div>
            </div>
          </Card>

          {/* Comparison */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              What You're Getting
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li><strong>Free money from employer:</strong> £{result.employerAnnual}/year</li>
              <li><strong>Tax relief on your contribution:</strong> £{result.taxRelief}/year</li>
              {salarySacrifice && <li><strong>National Insurance saving:</strong> £{result.niRelief}/year</li>}
              <li><strong>Total company/government contribution:</strong> £{(parseFloat(result.employerAnnual) + parseFloat(result.taxRelief) + parseFloat(result.niRelief)).toFixed(2)}/year</li>
              <li><strong>For every £1 you contribute:</strong> You get £{(1 + (parseFloat(result.employerAnnual) + parseFloat(result.taxRelief) + parseFloat(result.niRelief)) / parseFloat(result.employeeAnnual)).toFixed(2)}</li>
              <li><strong>Over {result.years} years:</strong> Your pot grows to approximately £{result.projectedPot}</li>
            </ul>
          </Card>

          {/* Notes */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Notes
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>This projection assumes consistent growth and no withdrawals</li>
              <li>Investment returns vary year to year and are not guaranteed</li>
              <li>The actual fund value depends on how your employer invests the contributions</li>
              <li>You cannot normally access your pension until age 55 (rising to 57 in 2028)</li>
              <li>Increasing your contributions is one of the best ways to build wealth</li>
              <li>Higher earners get more tax relief (40% or 45% relief vs 20%)</li>
              <li>If eligible for salary sacrifice, the NI saving makes it significantly more valuable</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
