'use client';

import { useState, useMemo } from 'react';

const SUPER_CONTRIBUTION_TAX = 0.15; // 15% tax on super contributions
const SUPER_CONCESSIONAL_LIMIT = 27500; // Annual limit 2025

const TAX_BRACKETS = [
  { threshold: 18200, rate: 0 },
  { threshold: 45000, rate: 0.19 },
  { threshold: 120000, rate: 0.325 },
  { threshold: 180000, rate: 0.37 },
  { threshold: Infinity, rate: 0.45 },
];

const MEDICARE_LEVY = 0.02; // 2% Medicare levy

function calculateTax(income) {
  let tax = 0;
  let previousThreshold = 0;

  for (const bracket of TAX_BRACKETS) {
    if (income <= previousThreshold) break;

    const currentThreshold = Math.min(bracket.threshold, income);
    if (bracket.rate > 0 && currentThreshold > previousThreshold) {
      const taxableInBracket = currentThreshold - previousThreshold;
      tax += taxableInBracket * bracket.rate;
    }
    previousThreshold = currentThreshold;
  }

  return tax;
}

export default function AustraliaSalarySacrificeCalculator() {
  const [grossSalary, setGrossSalary] = useState(80000);
  const [sacrificeAmount, setSacrificeAmount] = useState(10000);
  const [currentSuper, setCurrentSuper] = useState(200000);

  const results = useMemo(() => {
    const salary = parseFloat(grossSalary) || 0;
    const sacrifice = Math.min(parseFloat(sacrificeAmount) || 0, SUPER_CONCESSIONAL_LIMIT);
    const currentSuperBalance = parseFloat(currentSuper) || 0;

    // BEFORE salary sacrifice
    const incomeTaxBefore = calculateTax(salary);
    const medicareBefore = salary * MEDICARE_LEVY;
    const taxTotalBefore = incomeTaxBefore + medicareBefore;
    const takeHomeBefore = salary - taxTotalBefore;

    // AFTER salary sacrifice
    const reducedSalary = salary - sacrifice;
    const incomeTaxAfter = calculateTax(reducedSalary);
    const medicareAfter = reducedSalary * MEDICARE_LEVY;
    const taxTotalAfter = incomeTaxAfter + medicareAfter;
    const takeHomeAfter = reducedSalary - taxTotalAfter;

    // Superannuation
    const superContributionTax = sacrifice * SUPER_CONTRIBUTION_TAX;
    const superIncrease = sacrifice - superContributionTax;
    const newSuperBalance = currentSuperBalance + superIncrease;

    // Tax saving
    const incomeTaxSaving = incomeTaxBefore - incomeTaxAfter;
    const medicareSaving = medicareBefore - medicareAfter;
    const totalTaxSaving = incomeTaxSaving + medicareSaving;

    // Net take-home change
    const takeHomeDifference = takeHomeAfter - takeHomeBefore;

    // Effective cost of sacrifice
    const effectiveCost = sacrifice + takeHomeDifference;

    return {
      // Before sacrifice
      incomeTaxBefore: incomeTaxBefore.toFixed(2),
      medicareBefore: medicareBefore.toFixed(2),
      taxTotalBefore: taxTotalBefore.toFixed(2),
      takeHomeBefore: takeHomeBefore.toFixed(2),

      // After sacrifice
      reducedSalary: reducedSalary.toFixed(2),
      incomeTaxAfter: incomeTaxAfter.toFixed(2),
      medicareAfter: medicareAfter.toFixed(2),
      taxTotalAfter: taxTotalAfter.toFixed(2),
      takeHomeAfter: takeHomeAfter.toFixed(2),

      // Tax savings
      incomeTaxSaving: incomeTaxSaving.toFixed(2),
      medicareSaving: medicareSaving.toFixed(2),
      totalTaxSaving: totalTaxSaving.toFixed(2),

      // Super
      sacrificeAmount: sacrifice.toFixed(2),
      superContributionTax: superContributionTax.toFixed(2),
      superIncrease: superIncrease.toFixed(2),
      newSuperBalance: newSuperBalance.toFixed(2),
      superIncreaseFromBalance: (
        ((newSuperBalance - currentSuperBalance) / currentSuperBalance) *
        100
      ).toFixed(1),

      // Impact on take-home
      takeHomeDifference: takeHomeDifference.toFixed(2),
      takeHomeDifferencePercent: ((takeHomeDifference / takeHomeBefore) * 100).toFixed(1),
    };
  }, [grossSalary, sacrificeAmount, currentSuper]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Gross Annual Salary (AUD)
              </label>
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="Enter salary"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Sacrifice Amount/Year (AUD)
              </label>
              <input
                type="number"
                value={sacrificeAmount}
                onChange={(e) => setSacrificeAmount(e.target.value)}
                placeholder="Enter sacrifice amount"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
              <p className="text-text-muted text-sm mt-1">
                Max concessional: $27,500/year
              </p>
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Current Superannuation Balance (AUD)
            </label>
            <input
              type="number"
              value={currentSuper}
              onChange={(e) => setCurrentSuper(e.target.value)}
              placeholder="Enter current super balance"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white border border-border">
                <th className="text-left p-3 font-semibold text-text-primary">Item</th>
                <th className="text-right p-3 font-semibold text-text-primary">
                  Before Sacrifice
                </th>
                <th className="text-right p-3 font-semibold text-text-primary">
                  After Sacrifice
                </th>
                <th className="text-right p-3 font-semibold text-accent">
                  Saving / Change
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Gross Salary</td>
                <td className="text-right p-3 font-mono">${parseFloat(grossSalary).toFixed(0)}</td>
                <td className="text-right p-3 font-mono">${results.reducedSalary}</td>
                <td className="text-right p-3 font-mono text-error">
                  -${results.sacrificeAmount}
                </td>
              </tr>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Income Tax</td>
                <td className="text-right p-3 font-mono">${results.incomeTaxBefore}</td>
                <td className="text-right p-3 font-mono">${results.incomeTaxAfter}</td>
                <td className="text-right p-3 font-mono text-success">
                  -${results.incomeTaxSaving}
                </td>
              </tr>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Medicare Levy</td>
                <td className="text-right p-3 font-mono">${results.medicareBefore}</td>
                <td className="text-right p-3 font-mono">${results.medicareAfter}</td>
                <td className="text-right p-3 font-mono text-success">
                  -${results.medicareSaving}
                </td>
              </tr>
              <tr className="border border-border bg-blue-50">
                <td className="p-3 font-semibold text-text-primary">Take-Home Pay</td>
                <td className="text-right p-3 font-mono font-semibold">
                  ${results.takeHomeBefore}
                </td>
                <td className="text-right p-3 font-mono font-semibold">
                  ${results.takeHomeAfter}
                </td>
                <td className={`text-right p-3 font-mono font-semibold ${
                  parseFloat(results.takeHomeDifference) < 0 ? 'text-error' : 'text-success'
                }`}>
                  ${results.takeHomeDifference}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Superannuation Impact */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Superannuation Impact</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Salary Sacrifice Amount:</span>
              <span className="font-mono font-semibold">
                ${results.sacrificeAmount}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Super Contribution Tax (15%):</span>
              <span className="font-mono font-semibold text-error">
                -${results.superContributionTax}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Super Account Increase:</span>
              <span className="font-mono font-semibold text-success">
                +${results.superIncrease}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-text-secondary">Current Super Balance:</span>
              <span className="font-mono font-semibold">
                ${parseFloat(currentSuper).toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-green-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">New Super Balance:</span>
              <span className="font-mono text-xl font-semibold text-success">
                ${results.newSuperBalance}
              </span>
            </div>
          </div>

          <p className="text-text-secondary text-sm pt-2">
            Super balance increase: +{results.superIncreaseFromBalance}%
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <p className="text-text-secondary text-sm mb-2">Total Tax Saving</p>
            <p className="text-3xl font-mono font-semibold text-success">
              ${results.totalTaxSaving}
            </p>
            <p className="text-text-muted text-xs mt-2">
              Income tax + Medicare levy
            </p>
          </div>

          <div className={`rounded-lg border p-4 ${
            parseFloat(results.takeHomeDifference) < -100
              ? 'bg-orange-50 border-orange-200'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className="text-text-secondary text-sm mb-2">Take-Home Change</p>
            <p className={`text-3xl font-mono font-semibold ${
              parseFloat(results.takeHomeDifference) >= 0 ? 'text-success' : 'text-error'
            }`}>
              {parseFloat(results.takeHomeDifference) >= 0 ? '+' : ''} ${results.takeHomeDifference}
            </p>
            <p className="text-text-muted text-xs mt-2">
              {results.takeHomeDifferencePercent}% change
            </p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-blue-50 border border-accent rounded-lg p-6">
          <h3 className="text-text-primary font-semibold text-lg mb-3">Key Insight</h3>
          <p className="text-text-secondary mb-3">
            By sacrificing <span className="font-mono font-semibold">${results.sacrificeAmount}</span> to super, you:
          </p>
          <ul className="space-y-2 text-text-secondary text-sm">
            <li>
              - Save <span className="font-mono font-semibold">${results.totalTaxSaving}</span> in income tax and Medicare levy
            </li>
            <li>
              - Increase your super by <span className="font-mono font-semibold">${results.superIncrease}</span> (after 15% tax)
            </li>
            <li>
              - Your take-home changes by <span className="font-mono font-semibold">${results.takeHomeDifference}</span>
            </li>
            <li>
              - The tax saving reduces the effective cost of building super
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Based on 2025 tax rates and limits</li>
            <li>Concessional contribution limit is $27,500/year</li>
            <li>Does not include Medicare levy surcharge or other adjustments</li>
            <li>Assumes employer contributes 11.5% SG separately</li>
            <li>Consult a tax accountant for individual advice</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
