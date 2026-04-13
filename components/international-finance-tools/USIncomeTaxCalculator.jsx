'use client';

import { useState, useMemo } from 'react';
import { US_TAX_DATA_2025 } from '@/data/tax/us/2025';

export default function USIncomeTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState('single');
  const [grossIncome, setGrossIncome] = useState(75000);
  const [state, setState] = useState('NY');
  const [pretax401k, setPretax401k] = useState(6500);
  const [traditionalIra, setTraditionalIra] = useState(0);
  const [hsa, setHsa] = useState(0);
  const [dependents, setDependents] = useState(0);

  const taxData = US_TAX_DATA_2025;
  const statusData = taxData.filingStatuses[filingStatus];
  const stateData = taxData.states[state];
  const ficaData = taxData.fica;

  const calculations = useMemo(() => {
    const totalPreTaxDeductions = pretax401k + traditionalIra + hsa;
    const adjustedGrossIncome = Math.max(0, grossIncome - totalPreTaxDeductions);
    const taxableIncome = Math.max(
      0,
      adjustedGrossIncome - statusData.standardDeduction
    );

    // Calculate federal income tax
    let federalTax = 0;
    for (const bracket of statusData.brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        federalTax += taxableInThisBracket * bracket.rate;
      }
    }

    // Apply child tax credit
    const childTaxCredit = Math.min(
      dependents * taxData.childTaxCredit.perChild,
      federalTax
    );
    federalTax = Math.max(0, federalTax - childTaxCredit);

    // Calculate state income tax
    let stateTax = 0;
    if (stateData.hasIncomeTax) {
      const stateAgi = adjustedGrossIncome;
      for (const bracket of stateData.brackets) {
        if (stateAgi > bracket.min) {
          const taxableInThisBracket = Math.min(stateAgi, bracket.max) - bracket.min;
          stateTax += taxableInThisBracket * bracket.rate;
        }
      }
    }

    // Calculate Social Security tax
    const socialSecurityWages = Math.min(
      grossIncome,
      ficaData.socialSecurity.wageBase
    );
    const socialSecurityTax = socialSecurityWages * ficaData.socialSecurity.rate;

    // Calculate Medicare tax
    let medicareTax = grossIncome * ficaData.medicare.rate;
    const additionalThreshold = ficaData.medicare.additionalThreshold[filingStatus];
    if (grossIncome > additionalThreshold) {
      const additionalMedicareWages = grossIncome - additionalThreshold;
      medicareTax += additionalMedicareWages * ficaData.medicare.additionalRate;
    }

    const totalTax =
      federalTax + stateTax + socialSecurityTax + medicareTax;
    const takeHomePay = grossIncome - totalTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    // Find marginal rate
    let marginalRate = statusData.brackets[0].rate;
    for (const bracket of statusData.brackets) {
      if (taxableIncome >= bracket.min) {
        marginalRate = bracket.rate;
      }
    }

    return {
      adjustedGrossIncome,
      taxableIncome,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      totalTax,
      takeHomePay,
      effectiveRate,
      marginalRate,
      monthlyTakeHome: takeHomePay / 12,
      biweeklyTakeHome: takeHomePay / 26,
      weeklyTakeHome: takeHomePay / 52,
    };
  }, [filingStatus, grossIncome, state, pretax401k, traditionalIra, hsa, dependents]);

  const stateOptions = Object.entries(taxData.states).map(([code, data]) => ({
    code,
    name: data.name,
  }));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getTaxBreakdownPercentages = () => {
    const total = calculations.totalTax;
    return {
      federal: total > 0 ? (calculations.federalTax / total) * 100 : 0,
      state: total > 0 ? (calculations.stateTax / total) * 100 : 0,
      socialSecurity: total > 0 ? (calculations.socialSecurityTax / total) * 100 : 0,
      medicare: total > 0 ? (calculations.medicareTax / total) * 100 : 0,
    };
  };

  const breakdownPercentages = getTaxBreakdownPercentages();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* INPUT SECTION */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Filing Status */}
              <div>
                <label className="block text-sm font-medium text-primary mb-3">
                  Filing Status
                </label>
                <div className="space-y-2">
                  {Object.entries(taxData.filingStatuses).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="filingStatus"
                        value={key}
                        checked={filingStatus === key}
                        onChange={(e) => setFilingStatus(e.target.value)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="ml-3 text-sm text-secondary">{value.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gross Income */}
              <div>
                <label htmlFor="grossIncome" className="block text-sm font-medium text-primary mb-1">
                  Annual Gross Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-secondary">$</span>
                  <input
                    id="grossIncome"
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-primary mb-1">
                  State
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {stateOptions.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pre-tax 401(k) */}
              <div>
                <label htmlFor="pretax401k" className="block text-sm font-medium text-primary mb-1">
                  Pre-tax 401(k) Contributions
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-secondary">$</span>
                  <input
                    id="pretax401k"
                    type="number"
                    value={pretax401k}
                    onChange={(e) => setPretax401k(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* Traditional IRA */}
              <div>
                <label htmlFor="traditionalIra" className="block text-sm font-medium text-primary mb-1">
                  Traditional IRA Contributions
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-secondary">$</span>
                  <input
                    id="traditionalIra"
                    type="number"
                    value={traditionalIra}
                    onChange={(e) => setTraditionalIra(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* HSA */}
              <div>
                <label htmlFor="hsa" className="block text-sm font-medium text-primary mb-1">
                  HSA Contributions
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-secondary">$</span>
                  <input
                    id="hsa"
                    type="number"
                    value={hsa}
                    onChange={(e) => setHsa(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* Dependents */}
              <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-primary mb-1">
                  Number of Dependents (under 17)
                </label>
                <input
                  id="dependents"
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-2">
            {/* Summary Card */}
            <div className="bg-surface rounded-lg border border-border mb-4">
              <p className="text-sm text-secondary mb-2">Annual Take-Home Pay</p>
              <p className="font-mono text-4xl font-bold text-primary mb-4">
                {formatCurrency(calculations.takeHomePay)}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted mb-1">Monthly</p>
                  <p className="font-mono text-lg font-semibold text-primary">
                    {formatCurrency(calculations.monthlyTakeHome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Bi-weekly</p>
                  <p className="font-mono text-lg font-semibold text-primary">
                    {formatCurrency(calculations.biweeklyTakeHome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Weekly</p>
                  <p className="font-mono text-lg font-semibold text-primary">
                    {formatCurrency(calculations.weeklyTakeHome)}
                  </p>
                </div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="space-y-4 mb-4">
              {/* Federal Income Tax */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-primary">Federal Income Tax</span>
                  <span className="font-mono text-base font-semibold text-primary">
                    {formatCurrency(calculations.federalTax)}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{
                      width: `${Math.min(100, (breakdownPercentages.federal / 100) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted mt-2">
                  <span>{formatNumber(calculations.marginRate * 100)}% marginal rate</span>
                  <span>{formatNumber(calculations.effectiveRate)}% effective rate</span>
                </div>
              </div>

              {/* State Income Tax */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-primary">
                    {stateData.name} State Income Tax
                  </span>
                  <span className="font-mono text-base font-semibold text-primary">
                    {formatCurrency(calculations.stateTax)}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full"
                    style={{
                      width: `${Math.min(100, (breakdownPercentages.state / 100) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted mt-2">
                  {stateData.hasIncomeTax
                    ? `Top rate: ${formatNumber(stateData.topRate * 100)}%`
                    : 'No state income tax'}
                </p>
              </div>

              {/* Social Security Tax */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-primary">Social Security Tax</span>
                  <span className="font-mono text-base font-semibold text-primary">
                    {formatCurrency(calculations.socialSecurityTax)}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-orange-600 h-full"
                    style={{
                      width: `${Math.min(100, (breakdownPercentages.socialSecurity / 100) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted mt-2">6.2% up to $176,100 wage base</p>
              </div>

              {/* Medicare Tax */}
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-primary">Medicare Tax</span>
                  <span className="font-mono text-base font-semibold text-primary">
                    {formatCurrency(calculations.medicareTax)}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-600 h-full"
                    style={{
                      width: `${Math.min(100, (breakdownPercentages.medicare / 100) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted mt-2">
                  1.45% + 0.9% additional above threshold
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-surface rounded-lg border border-border">
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Detailed Breakdown
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Gross Income</span>
                  <span className="font-mono font-semibold text-primary">
                    {formatCurrency(grossIncome)}
                  </span>
                </div>
                {(pretax401k > 0 || traditionalIra > 0 || hsa > 0) && (
                  <>
                    {pretax401k > 0 && (
                      <div className="flex justify-between">
                        <span className="text-secondary">Pre-tax 401(k)</span>
                        <span className="font-mono font-semibold text-primary">
                          -{formatCurrency(pretax401k)}
                        </span>
                      </div>
                    )}
                    {traditionalIra > 0 && (
                      <div className="flex justify-between">
                        <span className="text-secondary">Traditional IRA</span>
                        <span className="font-mono font-semibold text-primary">
                          -{formatCurrency(traditionalIra)}
                        </span>
                      </div>
                    )}
                    {hsa > 0 && (
                      <div className="flex justify-between">
                        <span className="text-secondary">HSA</span>
                        <span className="font-mono font-semibold text-primary">
                          -{formatCurrency(hsa)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-secondary">Adjusted Gross Income</span>
                        <span className="font-mono font-semibold text-primary">
                          {formatCurrency(calculations.adjustedGrossIncome)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-secondary">Standard Deduction</span>
                  <span className="font-mono font-semibold text-primary">
                    -{formatCurrency(statusData.standardDeduction)}
                  </span>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-secondary">Taxable Income</span>
                    <span className="font-mono font-semibold text-primary">
                      {formatCurrency(calculations.taxableIncome)}
                    </span>
                  </div>
                </div>
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-primary">Total Tax</span>
                    <span className="font-mono text-primary">
                      {formatCurrency(calculations.totalTax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted">
                    <span>Effective Tax Rate</span>
                    <span>{formatNumber(calculations.effectiveRate)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted mt-6 leading-relaxed p-4 bg-surface rounded-lg border border-border">
              This calculator provides estimates for informational purposes only. Consult a
              tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
