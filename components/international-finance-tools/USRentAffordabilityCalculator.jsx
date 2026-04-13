'use client';

import { useState, useMemo } from 'react';

export default function USRentAffordabilityCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(5000);
  const [otherDebts, setOtherDebts] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(500);

  const results = useMemo(() => {
    // 30% rule - max rent should be 30% of gross monthly income
    const maxAffordableRent = grossMonthlyIncome * 0.3;

    // Debt-to-income ratio (28/36 rule)
    // 28% for housing expenses, 36% for all debt
    const maxRentWithDebtRatio = grossMonthlyIncome * 0.28 - otherDebts;
    const comfortableRent = Math.min(maxAffordableRent, Math.max(0, maxRentWithDebtRatio));

    // Stretch rent - what you could afford if you really needed to
    const stretchRent = grossMonthlyIncome * 0.35;

    // Annual amounts
    const annualIncome = grossMonthlyIncome * 12;

    return {
      maxAffordableRent: Math.round(maxAffordableRent),
      comfortableRent: Math.round(comfortableRent),
      stretchRent: Math.round(stretchRent),
      annualIncome: Math.round(annualIncome),
      debtPaymentRatio: otherDebts > 0 ? ((otherDebts / grossMonthlyIncome) * 100).toFixed(1) : 0,
      remainingAfterMaxRent: Math.round(grossMonthlyIncome - maxAffordableRent - otherDebts),
      remainingAfterComfortRent: Math.round(grossMonthlyIncome - comfortableRent - otherDebts),
      remainingAfterStretchRent: Math.round(grossMonthlyIncome - stretchRent - otherDebts),
    };
  }, [grossMonthlyIncome, otherDebts, savingsGoal]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Income & Obligations</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gross Monthly Income
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={grossMonthlyIncome}
                onChange={(e) => setGrossMonthlyIncome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="5000"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              Annual: ${results.annualIncome.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Other Monthly Debt Payments
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={otherDebts}
                onChange={(e) => setOtherDebts(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              (car loans, student loans, credit cards)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Monthly Savings Goal
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="500"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              (emergency fund, retirement, etc.)
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Rent Budget Guidelines</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            {/* Maximum Affordable */}
            <div className="border border-warning rounded-lg p-3 bg-warning/5">
              <p className="text-sm text-text-secondary mb-1">Max Affordable (30% rule)</p>
              <p className="font-mono text-2xl font-bold text-warning">
                ${results.maxAffordableRent.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {results.remainingAfterMaxRent < 0
                  ? 'Tight budget - limited flexibility'
                  : `${results.remainingAfterMaxRent < 500 ? 'Minimal' : 'Reasonable'} cushion remaining`}
              </p>
            </div>

            {/* Comfortable Range */}
            <div className="border border-accent rounded-lg p-3 bg-accent/5">
              <p className="text-sm text-text-secondary mb-1">Comfortable Budget (Recommended)</p>
              <p className="font-mono text-2xl font-bold text-accent">
                ${results.comfortableRent.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">
                Leaves room for savings and unexpected expenses
              </p>
            </div>

            {/* Stretch Maximum */}
            <div className="border border-error rounded-lg p-3 bg-error/5">
              <p className="text-sm text-text-secondary mb-1">Stretch Maximum (if necessary)</p>
              <p className="font-mono text-2xl font-bold text-error">
                ${results.stretchRent.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted mt-1">
                Only if temporary - limits savings and safety net
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success rounded-lg p-4">
          <p className="text-sm text-text-secondary mb-2">With Comfortable Rent</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Monthly Income:</span>
              <span className="font-mono font-semibold">
                ${grossMonthlyIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-warning">
              <span>- Rent:</span>
              <span className="font-mono">
                - ${results.comfortableRent.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-error">
              <span>- Other Debt:</span>
              <span className="font-mono">
                - ${otherDebts.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-success pt-1 flex justify-between font-semibold">
              <span>Remaining:</span>
              <span className="font-mono text-success">
                ${results.remainingAfterComfortRent.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-text-primary mb-2">The 30% Rule</p>
          <p className="text-sm text-text-secondary">
            Rent should not exceed 30% of gross monthly income. This helps ensure you can cover
            other living expenses while saving for emergencies.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-text-primary mb-2">Debt-to-Income</p>
          <p className="text-sm text-text-secondary">
            Lenders prefer housing + all debts under 36% of income. Your current debt is{' '}
            {results.debtPaymentRatio}% of income.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Important:</p>
        <p>
          This calculation assumes gross monthly income. Actual available funds are lower after
          taxes, insurance, utilities, food, and transportation. Plan conservatively and ensure
          you can cover unexpected expenses.
        </p>
      </div>
    </div>
  );
}
