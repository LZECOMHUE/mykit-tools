'use client';

import { useState, useMemo } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { TAX_YEARS, CURRENT_TAX_YEAR } from '@/data/tax-rates';

export default function StudentLoanCalculator() {
  const [salary, setSalary] = useState(35000);
  const [selectedPlans, setSelectedPlans] = useState(['plan2']);
  const [balancePlan1, setBalancePlan1] = useState(0);
  const [balancePlan2, setBalancePlan2] = useState(40000);
  const [balancePlan4, setBalancePlan4] = useState(0);
  const [balancePlan5, setBalancePlan5] = useState(0);
  const [balancePostgrad, setBalancePostgrad] = useState(0);
  const [interestRate, setInterestRate] = useState(7.3);
  const [useAutoInterest, setUseAutoInterest] = useState(true);

  const taxYear = TAX_YEARS[CURRENT_TAX_YEAR];

  const results = useMemo(() => {
    const planDetails = {
      plan1: {
        name: 'Plan 1 (pre-2006)',
        threshold: taxYear.studentLoans.plan1.threshold,
        rate: taxYear.studentLoans.plan1.rate,
        writeOffYears: 25,
        balance: balancePlan1,
      },
      plan2: {
        name: 'Plan 2 (2006-2012)',
        threshold: taxYear.studentLoans.plan2.threshold,
        rate: taxYear.studentLoans.plan2.rate,
        writeOffYears: 40,
        balance: balancePlan2,
      },
      plan4: {
        name: 'Plan 4 (2023+)',
        threshold: taxYear.studentLoans.plan4.threshold,
        rate: taxYear.studentLoans.plan4.rate,
        writeOffYears: 40,
        balance: balancePlan4,
      },
      plan5: {
        name: 'Plan 5 (Postgrad)',
        threshold: taxYear.studentLoans.plan5.threshold,
        rate: taxYear.studentLoans.plan5.rate,
        writeOffYears: 35,
        balance: balancePlan5,
      },
      postgrad: {
        name: 'Postgraduate Loan',
        threshold: taxYear.studentLoans.postgrad.threshold,
        rate: taxYear.studentLoans.postgrad.rate,
        writeOffYears: 30,
        balance: balancePostgrad,
      },
    };

    const calculateRepayment = (planKey) => {
      const plan = planDetails[planKey];
      if (plan.balance === 0) return null;

      const amountAboveThreshold = Math.max(0, salary - plan.threshold);
      const monthlyRepayment = (amountAboveThreshold * plan.rate) / 12;
      const annualRepayment = amountAboveThreshold * plan.rate;

      // Project balance over years
      let balance = plan.balance;
      let yearsToRepay = 0;
      const rateDecimal = interestRate / 100;

      while (balance > 0 && yearsToRepay < plan.writeOffYears) {
        const interestCharged = balance * rateDecimal;
        const principalRepaid = annualRepayment - interestCharged;

        if (principalRepaid <= 0) {
          // Not earning enough to make progress
          yearsToRepay = plan.writeOffYears;
          balance = 0;
          break;
        }

        balance -= principalRepaid;
        if (balance < 0) balance = 0;
        yearsToRepay++;
      }

      if (yearsToRepay >= plan.writeOffYears) {
        balance = 0;
        yearsToRepay = plan.writeOffYears;
      }

      // Calculate total repaid over the years
      let totalRepaid = 0;
      let tempBalance = plan.balance;
      for (let i = 0; i < yearsToRepay; i++) {
        const interest = tempBalance * rateDecimal;
        const principal = annualRepayment - interest;
        totalRepaid += Math.max(0, annualRepayment);
        tempBalance -= Math.max(0, principal);
        if (tempBalance < 0) tempBalance = 0;
      }

      const totalInterest = Math.max(0, totalRepaid - plan.balance);

      return {
        plan: planKey,
        name: plan.name,
        threshold: plan.threshold,
        rate: plan.rate * 100,
        monthlyRepayment,
        annualRepayment,
        yearsToRepay,
        writeOffYears: plan.writeOffYears,
        totalRepaid,
        totalInterest,
        initialBalance: plan.balance,
      };
    };

    const planRepayments = selectedPlans
      .map((planKey) => calculateRepayment(planKey))
      .filter(Boolean);

    // Combined totals
    const totalMonthlyRepayment = planRepayments.reduce(
      (sum, r) => sum + r.monthlyRepayment,
      0
    );
    const totalAnnualRepayment = planRepayments.reduce(
      (sum, r) => sum + r.annualRepayment,
      0
    );
    const maxYearsToRepay = Math.max(...planRepayments.map((r) => r.yearsToRepay), 0);
    const totalInitialBalance = planRepayments.reduce(
      (sum, r) => sum + r.initialBalance,
      0
    );
    const totalRepaid = planRepayments.reduce((sum, r) => sum + r.totalRepaid, 0);
    const totalInterest = planRepayments.reduce((sum, r) => sum + r.totalInterest, 0);

    return {
      planRepayments,
      totalMonthlyRepayment,
      totalAnnualRepayment,
      maxYearsToRepay,
      totalInitialBalance,
      totalRepaid,
      totalInterest,
      salaryAboveThreshold: Math.max(0, salary - taxYear.studentLoans.plan2.threshold),
    };
  }, [
    salary,
    selectedPlans,
    balancePlan1,
    balancePlan2,
    balancePlan4,
    balancePlan5,
    balancePostgrad,
    interestRate,
    taxYear,
  ]);

  const handlePlanToggle = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan)
        ? prev.filter((p) => p !== plan)
        : [...prev, plan]
    );
  };

  const planOptions = [
    { key: 'plan1', label: 'Plan 1 (pre-2006)', balance: balancePlan1, setBalance: setBalancePlan1 },
    { key: 'plan2', label: 'Plan 2 (2006-2012)', balance: balancePlan2, setBalance: setBalancePlan2 },
    { key: 'plan4', label: 'Plan 4 (2023+)', balance: balancePlan4, setBalance: setBalancePlan4 },
    { key: 'plan5', label: 'Plan 5 (EU/Non-standard)', balance: balancePlan5, setBalance: setBalancePlan5 },
    { key: 'postgrad', label: 'Postgraduate Loan', balance: balancePostgrad, setBalance: setBalancePostgrad },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">UK Student Loan Repayment Calculator</h2>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] p-4 mb-6 text-sm text-text-primary">
        <p className="font-medium text-blue-900 mb-2">Student Loan Repayment</p>
        <p className="text-blue-800">Repayment is 9% of earnings above the plan threshold (6% for postgraduate loans). Repayments stop if earnings fall below the threshold. Balances are written off after a set number of years.</p>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual Salary (£)
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="1000"
          />
          <p className="text-xs text-text-muted mt-1">Gross salary before tax and National Insurance</p>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="useAutoInterest"
              checked={useAutoInterest}
              onChange={(e) => setUseAutoInterest(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <label htmlFor="useAutoInterest" className="text-sm font-medium text-text-primary">
              Auto-estimate interest rate (current market)
            </label>
          </div>
          {!useAutoInterest && (
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
              min="0"
              step="0.1"
              placeholder="Annual interest rate %"
            />
          )}
          {useAutoInterest && (
            <div className="mt-2 p-2 bg-white border border-border rounded-[var(--radius-input)] text-sm text-text-primary">
              Using estimated rate: {formatPercentage(interestRate, 1)}
            </div>
          )}
          <p className="text-xs text-text-muted mt-1">Interest on student loans accrues from graduation day</p>
        </div>

        {/* Loan Plans Selection */}
        <div>
          <p className="block text-sm font-medium text-text-primary mb-3">Which loan plans do you have?</p>
          <div className="space-y-2">
            {planOptions.map(({ key, label }) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    id={key}
                    checked={selectedPlans.includes(key)}
                    onChange={() => handlePlanToggle(key)}
                    className="w-4 h-4 accent-accent"
                  />
                  <label htmlFor={key} className="text-sm font-medium text-text-primary">
                    {label}
                  </label>
                </div>
                {selectedPlans.includes(key) && (
                  <input
                    type="number"
                    value={
                      key === 'plan1'
                        ? balancePlan1
                        : key === 'plan2'
                          ? balancePlan2
                          : key === 'plan4'
                            ? balancePlan4
                            : key === 'plan5'
                              ? balancePlan5
                              : balancePostgrad
                    }
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      if (key === 'plan1') setBalancePlan1(val);
                      else if (key === 'plan2') setBalancePlan2(val);
                      else if (key === 'plan4') setBalancePlan4(val);
                      else if (key === 'plan5') setBalancePlan5(val);
                      else if (key === 'postgrad') setBalancePostgrad(val);
                    }}
                    placeholder="Outstanding balance (£)"
                    className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent text-sm ml-6 mb-2"
                    min="0"
                    step="1000"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {results.planRepayments.length > 0 && (
        <>
          <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Monthly Repayment</p>
              <p className="text-3xl font-bold text-accent font-mono-num">
                {formatCurrency(results.totalMonthlyRepayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-secondary text-sm mb-1">Annual Repayment</p>
                <p className="text-xl font-bold text-text-primary font-mono-num">
                  {formatCurrency(results.totalAnnualRepayment)}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Years to Repay</p>
                <p className="text-xl font-bold text-text-primary font-mono-num">
                  {results.maxYearsToRepay} years
                </p>
              </div>
            </div>

            {results.totalInterest > 0 && (
              <div className="border-t border-border pt-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Total Interest Paid</p>
                    <p className="font-bold text-text-primary font-mono-num">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Total Amount Repaid</p>
                    <p className="font-bold text-text-primary font-mono-num">
                      {formatCurrency(results.totalRepaid)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plan Comparison Table */}
          <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-4">Repayment Details by Plan</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left text-text-secondary font-medium py-2">Loan Type</th>
                    <th className="text-right text-text-secondary font-medium py-2">Monthly</th>
                    <th className="text-right text-text-secondary font-medium py-2">Threshold</th>
                    <th className="text-right text-text-secondary font-medium py-2">Years</th>
                  </tr>
                </thead>
                <tbody>
                  {results.planRepayments.map((plan) => (
                    <tr key={plan.plan} className="border-b border-border hover:bg-blue-50">
                      <td className="text-text-primary font-medium py-3">{plan.name}</td>
                      <td className="text-right text-text-primary font-mono-num">
                        {formatCurrency(plan.monthlyRepayment)}
                      </td>
                      <td className="text-right text-text-secondary font-mono-num">
                        {formatCurrency(plan.threshold)}
                      </td>
                      <td className="text-right text-text-primary font-mono-num">
                        {plan.yearsToRepay}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Information */}
          <div className="bg-white rounded-[var(--radius-card)] p-4 border border-border text-xs text-text-muted space-y-2">
            <p><strong className="text-text-primary">Write-Off Dates (2025/26):</strong></p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li>Plan 1: 25 years after graduation</li>
              <li>Plan 2 & 4: 40 years after graduation</li>
              <li>Plan 5: 40 years after graduation</li>
              <li>Postgrad: 30 years from first repayment</li>
            </ul>
            <p className="pt-2"><strong className="text-text-primary">Repayment Thresholds (2025/26):</strong></p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li>Plan 1: {formatCurrency(taxYear.studentLoans.plan1.threshold)}</li>
              <li>Plan 2: {formatCurrency(taxYear.studentLoans.plan2.threshold)}</li>
              <li>Plan 4: {formatCurrency(taxYear.studentLoans.plan4.threshold)}</li>
              <li>Postgrad: {formatCurrency(taxYear.studentLoans.postgrad.threshold)}</li>
            </ul>
          </div>
        </>
      )}

      {results.planRepayments.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] p-6 text-center text-text-primary">
          <p className="font-medium">Select at least one loan plan to calculate repayment</p>
        </div>
      )}
    </div>
  );
}
