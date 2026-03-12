'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function MortgageOverpaymentCalculator() {
  const [mortgageBalance, setMortgageBalance] = useState(200000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [remainingYears, setRemainingYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(1200);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(100);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = remainingYears * 12;

    // Calculate original payoff scenario
    let originalBalance = mortgageBalance;
    let originalTotalInterest = 0;
    let originalMonths = 0;

    for (let i = 0; i < totalMonths * 2; i++) {
      if (originalBalance <= 0) break;
      const interest = originalBalance * monthlyRate;
      originalTotalInterest += interest;
      originalBalance -= (monthlyPayment - interest);
      originalMonths++;
    }

    // Calculate with overpayment
    let newBalance = mortgageBalance;
    let newTotalInterest = 0;
    let newMonths = 0;
    const monthlyBreakdown = [];

    for (let i = 0; i < totalMonths * 2; i++) {
      if (newBalance <= 0) break;
      const interest = newBalance * monthlyRate;
      newTotalInterest += interest;
      const payment = monthlyPayment + monthlyOverpayment;
      newBalance -= (payment - interest);
      newMonths++;

      if (i < 12 || i > newMonths - 6) {
        monthlyBreakdown.push({
          month: i + 1,
          balance: Math.max(0, newBalance),
          interest,
          principal: payment - interest,
        });
      }
    }

    const monthsSaved = originalMonths - newMonths;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonths = monthsSaved % 12;
    const interestSaved = originalTotalInterest - newTotalInterest;

    const originalDate = new Date();
    originalDate.setMonth(originalDate.getMonth() + originalMonths);

    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + newMonths);

    return {
      interestSaved,
      monthsSaved,
      yearsSaved,
      remainingMonths,
      originalDate,
      newDate,
      originalMonths,
      newMonths,
      newTotalInterest,
      originalTotalInterest,
      monthlyBreakdown,
    };
  }, [mortgageBalance, interestRate, remainingYears, monthlyPayment, monthlyOverpayment]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-surface rounded-[12px] border border-border p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Mortgage Overpayment Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Current Mortgage Balance (£)"
            type="number"
            value={mortgageBalance}
            onChange={(e) => setMortgageBalance(parseFloat(e.target.value) || 0)}
            min="0"
            step="10000"
            helper="Amount still outstanding on your mortgage"
          />

          <Input
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
            helper="Your current interest rate per annum"
          />

          <Input
            label="Remaining Term (Years)"
            type="number"
            value={remainingYears}
            onChange={(e) => setRemainingYears(parseFloat(e.target.value) || 0)}
            min="1"
            step="1"
            helper="Years left on your mortgage"
          />

          <Input
            label="Monthly Payment (£)"
            type="number"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
            min="0"
            step="50"
            helper="Your current monthly payment"
          />

          <Input
            label="Monthly Overpayment (£)"
            type="number"
            value={monthlyOverpayment}
            onChange={(e) => setMonthlyOverpayment(parseFloat(e.target.value) || 0)}
            min="0"
            step="10"
            helper="Extra amount to pay each month"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">Total Interest Saved</p>
          <p className="text-3xl font-bold text-accent font-mono">{formatCurrency(results.interestSaved)}</p>
          <p className="text-xs text-text-muted mt-2">By paying an extra {formatCurrency(monthlyOverpayment)}/month</p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-6">
          <p className="text-sm text-text-secondary mb-2 uppercase tracking-wide">Time Saved</p>
          <p className="text-3xl font-bold text-accent font-mono">
            {results.yearsSaved}y {results.remainingMonths}m
          </p>
          <p className="text-xs text-text-muted mt-2">
            {results.monthsSaved} months total
          </p>
        </div>
      </div>

      {/* Payoff Dates */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Payoff Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-text-secondary mb-1">Without Overpayment</p>
            <p className="text-lg font-bold text-text-primary">
              {results.originalDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {results.originalMonths} months from now
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">With Overpayment</p>
            <p className="text-lg font-bold text-accent">
              {results.newDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {results.newMonths} months from now
            </p>
          </div>
        </div>
      </div>

      {/* Interest Comparison */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Total Interest Paid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-surface rounded-[8px]">
            <p className="text-sm text-text-secondary mb-1">Without Overpayment</p>
            <p className="font-mono text-xl font-bold text-text-primary">
              {formatCurrency(results.originalTotalInterest)}
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-[8px]">
            <p className="text-sm text-green-700 mb-1">With Overpayment</p>
            <p className="font-mono text-xl font-bold text-green-600">
              {formatCurrency(results.newTotalInterest)}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Term Comparison */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Mortgage Term Comparison</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-text-secondary">Original Term</p>
              <p className="text-sm font-bold text-text-primary">{results.originalMonths} months</p>
            </div>
            <div className="w-full bg-surface rounded-full h-8 overflow-hidden">
              <div className="bg-accent-muted h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-text-secondary">With Overpayment</p>
              <p className="text-sm font-bold text-text-primary">{results.newMonths} months</p>
            </div>
            <div className="w-full bg-surface rounded-full h-8 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${(results.newMonths / results.originalMonths) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Monthly Breakdown (First 12 Months + Final Months)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Month</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Interest</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Principal</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {results.monthlyBreakdown.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="px-3 py-2 text-text-primary">{row.month}</td>
                  <td className="text-right px-3 py-2 font-mono text-text-primary">
                    {formatCurrency(row.interest)}
                  </td>
                  <td className="text-right px-3 py-2 font-mono text-text-primary">
                    {formatCurrency(row.principal)}
                  </td>
                  <td className="text-right px-3 py-2 font-mono font-bold text-text-primary">
                    {formatCurrency(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
