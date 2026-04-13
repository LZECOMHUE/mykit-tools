'use client';

import { useState, useMemo } from 'react';

export default function USStudentLoanCalculator() {
  const [loanBalance, setLoanBalance] = useState('50000');
  const [interestRate, setInterestRate] = useState('5.5');
  const [repaymentMode, setRepaymentMode] = useState('standard');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [extraPayment, setExtraPayment] = useState('0');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Standard repayment: 10 years (120 months)
  const STANDARD_MONTHS = 120;

  const calculations = useMemo(() => {
    const balance = parseFloat(loanBalance) || 0;
    const rate = parseFloat(interestRate) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (balance <= 0 || rate < 0) return null;

    const monthlyRate = rate / 100 / 12;

    // Calculate standard monthly payment (10 year)
    let standardMonthlyPayment = 0;
    if (monthlyRate === 0) {
      standardMonthlyPayment = balance / STANDARD_MONTHS;
    } else {
      standardMonthlyPayment =
        (balance * (monthlyRate * Math.pow(1 + monthlyRate, STANDARD_MONTHS))) /
        (Math.pow(1 + monthlyRate, STANDARD_MONTHS) - 1);
    }

    // Graduated: starts at 50% of standard, increases over 10 years
    const graduatedStartPayment = standardMonthlyPayment * 0.5;

    // Extended: 25 year (300 months)
    const extendedMonths = 300;
    let extendedMonthlyPayment = 0;
    if (monthlyRate === 0) {
      extendedMonthlyPayment = balance / extendedMonths;
    } else {
      extendedMonthlyPayment =
        (balance * (monthlyRate * Math.pow(1 + monthlyRate, extendedMonths))) /
        (Math.pow(1 + monthlyRate, extendedMonths) - 1);
    }

    // Custom payment (user specified)
    let customMonthlyPayment = parseFloat(monthlyPayment) || standardMonthlyPayment;

    // Calculate repayment schedule
    const calculateRepayment = (initialPayment, months_cap = null) => {
      let remaining = balance;
      let months = 0;
      let totalInterest = 0;
      let totalPayments = 0;
      const schedule = [];

      const payment = initialPayment + extra;

      while (remaining > 0 && (months_cap === null || months < months_cap)) {
        months++;

        const interestPayment = remaining * monthlyRate;
        const principalPayment = Math.min(payment - interestPayment, remaining);
        const actualPayment = principalPayment + interestPayment;

        remaining = Math.max(0, remaining - principalPayment);
        totalInterest += interestPayment;
        totalPayments += actualPayment;

        if (months <= 12 || months % 12 === 0 || remaining < 100) {
          schedule.push({
            month: months,
            payment: actualPayment.toFixed(2),
            principal: principalPayment.toFixed(2),
            interest: interestPayment.toFixed(2),
            balance: remaining.toFixed(2),
          });
        }

        if (remaining <= 0) break;
      }

      const years = months / 12;
      const payoffMonth = months % 12;

      return {
        months,
        years: Math.floor(years),
        months_remaining: payoffMonth,
        totalPayments: totalPayments.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        monthlyPayment: (totalPayments / months).toFixed(2),
        schedule,
      };
    };

    let selectedRepayment = null;

    if (repaymentMode === 'standard') {
      selectedRepayment = calculateRepayment(standardMonthlyPayment, STANDARD_MONTHS);
    } else if (repaymentMode === 'graduated') {
      selectedRepayment = calculateRepayment(graduatedStartPayment, STANDARD_MONTHS);
    } else if (repaymentMode === 'extended') {
      selectedRepayment = calculateRepayment(extendedMonthlyPayment, extendedMonths);
    } else if (repaymentMode === 'custom') {
      selectedRepayment = calculateRepayment(customMonthlyPayment);
    }

    // With extra payments
    const withExtra = calculateRepayment(customMonthlyPayment || standardMonthlyPayment);

    return {
      loanBalance: balance,
      interestRate: rate,
      standardMonthlyPayment: standardMonthlyPayment.toFixed(2),
      graduatedStartPayment: graduatedStartPayment.toFixed(2),
      extendedMonthlyPayment: extendedMonthlyPayment.toFixed(2),
      selectedRepayment,
      withExtra,
      standardRepayment: calculateRepayment(standardMonthlyPayment, STANDARD_MONTHS),
      monthSavingsWithExtra: Math.max(0, (parseFloat(selectedRepayment.totalInterest) - parseFloat(withExtra.totalInterest))).toFixed(2),
      monthsSavedWithExtra: Math.max(0, selectedRepayment.months - withExtra.months),
    };
  }, [loanBalance, interestRate, repaymentMode, monthlyPayment, extraPayment]);

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <p className="text-text-secondary">Enter your loan details to calculate repayment</p>
      </div>
    );
  }

  const selected = calculations.selectedRepayment;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Student Loan Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Total Loan Balance ($)</label>
            <input
              type="number"
              value={loanBalance}
              onChange={(e) => setLoanBalance(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Interest Rate (% annual)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>

        {/* Repayment Mode Selection */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Repayment Plan</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'standard', label: 'Standard (10yr)', desc: 'Fixed payments' },
              { id: 'graduated', label: 'Graduated (10yr)', desc: 'Low start, increases' },
              { id: 'extended', label: 'Extended (25yr)', desc: 'Lower monthly' },
              { id: 'custom', label: 'Custom', desc: 'Your payment' },
            ].map((plan) => (
              <button
                key={plan.id}
                onClick={() => setRepaymentMode(plan.id)}
                className={`px-3 py-3 rounded-lg text-sm transition-colors ${
                  repaymentMode === plan.id
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                <div className="font-semibold">{plan.label}</div>
                <div className="text-xs opacity-75">{plan.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom payment input */}
        {repaymentMode === 'custom' && (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Monthly Payment ($)</label>
            <input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              step="10"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder={fmt(calculations.standardMonthlyPayment)}
            />
            {!monthlyPayment && (
              <p className="text-text-muted text-xs mt-1">Default: {fmt(calculations.standardMonthlyPayment)}</p>
            )}
          </div>
        )}

        {/* Extra payment option */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Extra Monthly Payment ($)</label>
          <input
            type="number"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
            step="10"
            min="0"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
          <p className="text-text-muted text-xs mt-1">Add this amount to your regular payment</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Monthly Payment</p>
          <p className="font-mono text-2xl font-bold text-blue-600">
            {fmt(repaymentMode === 'custom' ? monthlyPayment || calculations.standardMonthlyPayment : selected.schedule[0]?.payment || fmt(selected.monthlyPayment))}
          </p>
          <p className="text-text-muted text-xs mt-2">
            {selected.years} years {selected.months_remaining} months
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Interest</p>
          <p className="font-mono text-2xl font-bold text-green-600">{fmt(selected.totalInterest)}</p>
          <p className="text-text-muted text-xs mt-2">Over loan term</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Amount Paid</p>
          <p className="font-mono text-2xl font-bold text-purple-600">{fmt(selected.totalPayments)}</p>
          <p className="text-text-muted text-xs mt-2">Principal + Interest</p>
        </div>
      </div>

      {/* Extra Payment Benefit */}
      {parseFloat(extraPayment) > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-text-primary font-bold mb-2">By Paying Extra...</h3>
          <p className="text-text-secondary mb-3">
            You'll save <span className="font-mono font-bold text-green-600">{fmt(calculations.monthSavingsWithExtra)}</span> in interest and pay off your loan{' '}
            <span className="font-mono font-bold text-green-600">{calculations.monthsSavedWithExtra} months</span> earlier!
          </p>
        </div>
      )}

      {/* Repayment Schedule */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Repayment Schedule</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Loan Amount</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.loanBalance)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Interest Rate</span>
            <span className="font-mono font-semibold text-text-primary">{calculations.interestRate}%</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Repayment Plan</span>
            <span className="font-mono font-semibold text-text-primary capitalize">{repaymentMode}</span>
          </div>

          {repaymentMode !== 'custom' && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Monthly Payment</span>
              <span className="font-mono font-semibold text-accent">{fmt(selected.schedule[0]?.payment || selected.monthlyPayment)}</span>
            </div>
          )}

          {parseFloat(extraPayment) > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Extra Monthly Payment</span>
              <span className="font-mono font-semibold text-accent">{fmt(extraPayment)}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Total Interest Paid</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(selected.totalInterest)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Payoff Date</span>
            <span className="font-mono text-lg text-accent">
              {selected.years} years {selected.months_remaining} months
            </span>
          </div>
        </div>
      </div>

      {/* Detailed amortization */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Payment Details (Selected Months)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Month</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Payment</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Principal</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Interest</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {selected.schedule.slice(0, 25).map((row) => (
                <tr key={row.month} className="border-b border-border hover:bg-white">
                  <td className="py-2 px-2 text-text-secondary">{row.month}</td>
                  <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(row.payment)}</td>
                  <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(row.principal)}</td>
                  <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(row.interest)}</td>
                  <td className="py-2 px-2 text-right font-mono font-semibold text-text-primary">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected.schedule.length > 25 && (
          <p className="text-text-muted text-xs text-center">Showing first 25 months... repayment continues</p>
        )}
      </div>

      {/* Repayment plan comparison */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Compare Repayment Plans</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Standard (10 years)</span>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{fmt(calculations.standardRepayment.monthlyPayment)}/mo</p>
              <p className="text-text-muted text-xs">{fmt(calculations.standardRepayment.totalInterest)} interest</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Graduated (10 years, starts lower)</span>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">
                {fmt(calculations.graduatedStartPayment)}/mo (increasing)
              </p>
              <p className="text-text-muted text-xs">Similar interest to standard</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Extended (25 years, lower monthly)</span>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{fmt(calculations.extendedMonthlyPayment)}/mo</p>
              <p className="text-text-muted text-xs">More interest paid overall</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Loan Repayment Notes</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Federal student loans have various repayment options (Standard, Graduated, Extended, Income-Based)</li>
          <li>✓ This calculator assumes simple repayment - Income-Based plans adjust based on earnings</li>
          <li>✓ Public Service Loan Forgiveness (PSLF) forgives after 120 qualifying payments</li>
          <li>✓ Extra payments go directly to principal, saving interest</li>
          <li>✓ Parent PLUS loans have different terms</li>
          <li>✓ Loan forgiveness may have tax implications</li>
          <li>✓ Consult Federal Student Aid (studentaid.gov) for official guidance</li>
        </ul>
      </div>
    </div>
  );
}
