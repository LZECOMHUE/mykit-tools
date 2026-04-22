'use client';

import { useState, useMemo } from 'react';

// Format a number as GBP currency
function fmt(n) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
}

export default function ShouldIPayOffDebtOrSave() {
  const [debtBalance, setDebtBalance] = useState('5000');
  const [debtRate, setDebtRate] = useState('18.9');
  const [savingsRate, setSavingsRate] = useState('4.5');
  const [monthlyAmount, setMonthlyAmount] = useState('200');

  const result = useMemo(() => {
    const balance = parseFloat(debtBalance) || 0;
    const dr = parseFloat(debtRate) || 0;
    const sr = parseFloat(savingsRate) || 0;
    const monthly = parseFloat(monthlyAmount) || 0;

    if (balance <= 0 || monthly <= 0) return null;

    const monthlyDebtRate = dr / 100 / 12;
    const monthlySavingsRate = sr / 100 / 12;

    // Simulate 10 years (120 months) for each strategy
    const MAX_MONTHS = 120;

    // Strategy A: Pay off debt first, then save
    let debtBalanceA = balance;
    let savingsA = 0;
    let debtPaidOffMonth = null;
    let totalDebtInterestA = 0;

    for (let m = 1; m <= MAX_MONTHS; m++) {
      if (debtBalanceA > 0) {
        const interest = debtBalanceA * monthlyDebtRate;
        totalDebtInterestA += interest;
        debtBalanceA += interest;
        const payment = Math.min(monthly, debtBalanceA);
        debtBalanceA -= payment;
        if (debtBalanceA <= 0) {
          debtBalanceA = 0;
          if (debtPaidOffMonth === null) debtPaidOffMonth = m;
          // Leftover cash this month goes to savings
          const leftover = monthly - payment;
          savingsA = savingsA * (1 + monthlySavingsRate) + leftover;
        }
      } else {
        savingsA = savingsA * (1 + monthlySavingsRate) + monthly;
      }
    }

    // Strategy B: Save everything, ignore debt
    let debtBalanceB = balance;
    let savingsB = 0;
    let totalDebtInterestB = 0;

    for (let m = 1; m <= MAX_MONTHS; m++) {
      const interest = debtBalanceB * monthlyDebtRate;
      totalDebtInterestB += interest;
      debtBalanceB += interest;
      savingsB = savingsB * (1 + monthlySavingsRate) + monthly;
    }
    // Net position B: savings minus remaining debt
    const netB = savingsB - debtBalanceB;

    // Net position A: savings minus any remaining debt (should be 0)
    const netA = savingsA - debtBalanceA;

    const diff = netA - netB;
    const absImprovement = Math.abs(netA - netB);
    const interestAvoided = totalDebtInterestB - totalDebtInterestA;

    // Verdict logic
    let verdict, verdictSub;
    if (dr <= sr + 0.5) {
      verdict = 'Close call - consider your priorities';
      verdictSub = 'Your debt rate and savings rate are similar. Focus on which matters more: peace of mind or liquidity.';
    } else if (diff > 100) {
      verdict = 'Pay off debt first';
      verdictSub = `Tackling debt saves ${fmt(absImprovement)} more over 10 years than saving alone.`;
    } else {
      verdict = 'Save first';
      verdictSub = `Your savings rate outpaces your debt cost - investing wins by ${fmt(absImprovement)} over 10 years.`;
    }

    return {
      verdict,
      verdictSub,
      debtPaidOffMonth,
      netA: Math.round(netA),
      netB: Math.round(netB),
      interestAvoided: Math.round(Math.max(0, interestAvoided)),
      savingsAtEnd: Math.round(savingsA),
      diff: Math.round(diff),
      absImprovement: Math.round(absImprovement),
    };
  }, [debtBalance, debtRate, savingsRate, monthlyAmount]);

  const fieldClass =
    'w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent';
  const labelClass = 'text-xs text-text-muted block mb-1';

  return (
    <div className="space-y-4">
      {/* Inputs: debt side vs savings side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Debt panel */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="font-heading font-bold text-sm text-text-primary mb-3">Your Debt</p>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Debt balance (£)</label>
              <input
                type="number"
                min="0"
                step="100"
                value={debtBalance}
                onChange={(e) => setDebtBalance(e.target.value)}
                placeholder="5000"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Annual interest rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={debtRate}
                onChange={(e) => setDebtRate(e.target.value)}
                placeholder="18.9"
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Savings panel */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="font-heading font-bold text-sm text-text-primary mb-3">Your Savings</p>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Savings/investment rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={savingsRate}
                onChange={(e) => setSavingsRate(e.target.value)}
                placeholder="4.5"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Monthly amount available (£)</label>
              <input
                type="number"
                min="0"
                step="10"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="200"
                className={fieldClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verdict card - always visible */}
      {result ? (
        <>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Recommendation</p>
              <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.verdict}</p>
              <p className="text-sm text-gray-300 mt-1">{result.verdictSub}</p>
            </div>
            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-white px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Interest avoided</p>
                <p className="font-mono text-sm font-bold text-text-primary">{fmt(result.interestAvoided)}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">10yr savings (pay debt first)</p>
                <p className="font-mono text-sm font-bold text-text-primary">{fmt(result.savingsAtEnd)}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Net benefit</p>
                <p className={`font-mono text-sm font-bold ${result.diff >= 0 ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {result.diff >= 0 ? '+' : ''}{fmt(result.diff)}
                </p>
              </div>
            </div>
          </div>

          {/* Debt payoff timeline + assumption note */}
          {result.debtPaidOffMonth && (
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Debt cleared in</p>
                  <p className="font-mono text-xl font-bold text-text-primary">
                    {result.debtPaidOffMonth} {result.debtPaidOffMonth === 1 ? 'month' : 'months'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Then saving</p>
                  <p className="font-mono text-xl font-bold text-text-primary">{fmt(parseFloat(monthlyAmount) || 0)}/mo</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Net position (save-only)</p>
                  <p className="font-mono text-xl font-bold text-text-primary">{fmt(result.netB)}</p>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-text-muted">
            Assumes compound interest calculated monthly over 10 years. Savings rate is annual (e.g. ISA or investment return). Results are illustrative - actual returns may vary.
          </p>
        </>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-sm text-text-muted text-center">Enter your debt balance and monthly amount above to see the recommendation.</p>
        </div>
      )}
    </div>
  );
}
