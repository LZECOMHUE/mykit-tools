'use client';

import { useState, useMemo } from 'react';
import { getFederalTax, getStateTax, getSocialSecurityTax, getMedicareTax, STATE_TAX_RATES } from '@/data/us-tax-rates';

export default function USPaycheckCalculator() {
  const [incomeType, setIncomeType] = useState('annual');
  const [income, setIncome] = useState('60000');
  const [hourlyRate, setHourlyRate] = useState('30');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [state, setState] = useState('CA');
  const [filingStatus, setFilingStatus] = useState('single');
  const [contribution401k, setContribution401k] = useState('5');
  const [additionalWithholding, setAdditionalWithholding] = useState('0');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const payFrequencyMap = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  };

  const calculations = useMemo(() => {
    let annualGross = 0;

    if (incomeType === 'annual') {
      annualGross = parseFloat(income) || 0;
    } else {
      const hourly = parseFloat(hourlyRate) || 0;
      const hours = parseFloat(hoursPerWeek) || 0;
      annualGross = hourly * hours * 52;
    }

    if (annualGross <= 0) return null;

    const periodsPerYear = payFrequencyMap[payFrequency] || 26;
    const grossPerPeriod = annualGross / periodsPerYear;

    // 401k contribution (pre-tax)
    const contribution401kPercent = parseFloat(contribution401k) || 0;
    const preTax401k = grossPerPeriod * (contribution401kPercent / 100);
    const taxableIncome = grossPerPeriod - preTax401k;

    // Federal income tax (annualized)
    const annualFederalTax = getFederalTax(annualGross - preTax401k * periodsPerYear, filingStatus);
    const federalTaxPerPeriod = annualFederalTax / periodsPerYear;

    // State income tax
    const stateCode = state;
    const annualStateTax = getStateTax(annualGross - preTax401k * periodsPerYear, stateCode);
    const stateTaxPerPeriod = annualStateTax / periodsPerYear;

    // FICA taxes (calculated on gross, not reduced by 401k)
    const annualSocialSecurity = getSocialSecurityTax(annualGross);
    const socialSecurityPerPeriod = annualSocialSecurity / periodsPerYear;

    const annualMedicare = getMedicareTax(annualGross, filingStatus);
    const medicarePerPeriod = annualMedicare / periodsPerYear;

    // Additional withholding
    const additionalWithholdingAmount = parseFloat(additionalWithholding) || 0;

    const netPerPeriod =
      grossPerPeriod -
      preTax401k -
      federalTaxPerPeriod -
      stateTaxPerPeriod -
      socialSecurityPerPeriod -
      medicarePerPeriod -
      additionalWithholdingAmount;

    return {
      annualGross,
      grossPerPeriod,
      preTax401k,
      federalTaxPerPeriod,
      stateTaxPerPeriod,
      socialSecurityPerPeriod,
      medicarePerPeriod,
      additionalWithholdingAmount,
      totalDeductions:
        preTax401k +
        federalTaxPerPeriod +
        stateTaxPerPeriod +
        socialSecurityPerPeriod +
        medicarePerPeriod +
        additionalWithholdingAmount,
      netPerPeriod: Math.max(0, netPerPeriod),
      periodsPerYear,
      annualNet: Math.max(0, netPerPeriod) * periodsPerYear,
    };
  }, [incomeType, income, hourlyRate, hoursPerWeek, payFrequency, state, filingStatus, contribution401k, additionalWithholding]);

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <p className="text-text-secondary">Enter your income to calculate your paycheck</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-blue-900 mb-1">Disclaimer</p>
        <p>This calculator provides estimates only and does not account for all deductions, credits, or tax situations. Consult a tax professional for accurate calculations.</p>
      </div>

      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-text-primary">US Paycheck Calculator</h2>

        {/* Income Type Toggle */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Income Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setIncomeType('annual')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                incomeType === 'annual'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Annual Salary
            </button>
            <button
              onClick={() => setIncomeType('hourly')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                incomeType === 'hourly'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Hourly Rate
            </button>
          </div>
        </div>

        {/* Income Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incomeType === 'annual' ? (
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Annual Salary ($)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  step="0.5"
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">Hours Per Week</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                />
              </div>
            </>
          )}
        </div>

        {/* Pay Frequency */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Pay Frequency</label>
          <select
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          >
            <option value="weekly">Weekly (52 pay periods)</option>
            <option value="biweekly">Bi-weekly (26 pay periods)</option>
            <option value="semimonthly">Semi-monthly (24 pay periods)</option>
            <option value="monthly">Monthly (12 pay periods)</option>
          </select>
        </div>

        {/* State and Filing Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              {Object.entries(STATE_TAX_RATES)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, state]) => (
                  <option key={code} value={code}>
                    {state.name} ({code})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="single">Single</option>
              <option value="married_filing_jointly">Married Filing Jointly</option>
              <option value="married_filing_separately">Married Filing Separately</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </div>
        </div>

        {/* 401k and Additional Withholding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">401(k) Contribution (%)</label>
            <input
              type="number"
              value={contribution401k}
              onChange={(e) => setContribution401k(e.target.value)}
              step="0.5"
              min="0"
              max="30"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">
              Annual max: $23,500 (2025)
            </p>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Additional Withholding ($)</label>
            <input
              type="number"
              value={additionalWithholding}
              onChange={(e) => setAdditionalWithholding(e.target.value)}
              step="1"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Gross Per Period</p>
          <p className="font-mono text-2xl font-bold text-blue-600">{fmt(calculations.grossPerPeriod)}</p>
          <p className="text-text-muted text-xs mt-2">Annual: {fmt(calculations.annualGross)}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Deductions</p>
          <p className="font-mono text-2xl font-bold text-orange-600">{fmt(calculations.totalDeductions)}</p>
          <p className="text-text-muted text-xs mt-2">
            {((calculations.totalDeductions / calculations.grossPerPeriod) * 100).toFixed(1)}% of gross
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Net Pay Per Period</p>
          <p className="font-mono text-2xl font-bold text-green-600">{fmt(calculations.netPerPeriod)}</p>
          <p className="text-text-muted text-xs mt-2">Annual: {fmt(calculations.annualNet)}</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Paycheck Breakdown (Per Period)</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Gross Pay</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.grossPerPeriod)}</span>
          </div>

          <div className="pl-4 space-y-3">
            <h4 className="text-sm font-semibold text-text-primary mt-3">Pre-tax Deductions:</h4>

            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">401(k) Contribution</span>
              <span className="font-mono text-sm text-text-primary">{fmt(calculations.preTax401k)}</span>
            </div>

            <h4 className="text-sm font-semibold text-text-primary mt-3">Taxes:</h4>

            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">Federal Income Tax</span>
              <span className="font-mono text-sm text-text-primary">{fmt(calculations.federalTaxPerPeriod)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">State Income Tax</span>
              <span className="font-mono text-sm text-text-primary">{fmt(calculations.stateTaxPerPeriod)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">Social Security (6.2%)</span>
              <span className="font-mono text-sm text-text-primary">{fmt(calculations.socialSecurityPerPeriod)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary text-sm">Medicare (1.45%)</span>
              <span className="font-mono text-sm text-text-primary">{fmt(calculations.medicarePerPeriod)}</span>
            </div>

            {calculations.additionalWithholdingAmount > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary text-sm">Additional Withholding</span>
                <span className="font-mono text-sm text-text-primary">{fmt(calculations.additionalWithholdingAmount)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border mt-3 font-semibold">
            <span className="text-text-primary">NET PAY</span>
            <span className="font-mono text-lg text-green-600">{fmt(calculations.netPerPeriod)}</span>
          </div>
        </div>
      </div>

      {/* Effective Tax Rate */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Tax Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Federal Tax Rate</span>
            <span className="font-mono font-semibold text-text-primary">
              {((calculations.federalTaxPerPeriod / calculations.grossPerPeriod) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">State Tax Rate</span>
            <span className="font-mono font-semibold text-text-primary">
              {((calculations.stateTaxPerPeriod / calculations.grossPerPeriod) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">FICA Tax Rate (Social Security + Medicare)</span>
            <span className="font-mono font-semibold text-text-primary">
              {(
                ((calculations.socialSecurityPerPeriod + calculations.medicarePerPeriod) /
                  calculations.grossPerPeriod) *
                100
              ).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-border pt-2">
            <span className="text-text-secondary font-semibold">Total Effective Tax Rate</span>
            <span className="font-mono font-semibold text-accent">
              {(((calculations.grossPerPeriod - calculations.netPerPeriod) / calculations.grossPerPeriod) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Important Notes</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ This calculation uses estimated federal brackets and doesn't account for standard deduction or credits</li>
          <li>✓ 401(k) contributions reduce taxable income but not FICA taxes</li>
          <li>✓ Social Security stops after $176,100 in annual wages (2025)</li>
          <li>✓ Additional Medicare tax applies to high earners</li>
          <li>✓ Actual withholding depends on your W-4 form and life changes</li>
          <li>✓ This is an estimate only - consult a tax professional for accuracy</li>
        </ul>
      </div>
    </div>
  );
}
