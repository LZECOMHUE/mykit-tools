'use client';

import { useState, useMemo } from 'react';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(3000);
  const [apr, setApr] = useState(18.9);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const [paymentMode, setPaymentMode] = useState('fixed');

  const results = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    let remaining = balance;
    let totalInterest = 0;
    let months = 0;

    const minPaymentPercent = 0.02;

    while (remaining > 0 && months < 360) {
      months++;
      const interest = remaining * monthlyRate;
      totalInterest += interest;

      let payment;
      if (paymentMode === 'minimum') {
        payment = Math.max(remaining + interest, balance * minPaymentPercent);
      } else {
        payment = monthlyPayment;
      }

      remaining = remaining + interest - payment;
      if (remaining < 0) remaining = 0;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return {
      months,
      payoffTime: `${years}y ${remainingMonths}m`,
      totalInterest,
      totalPaid: balance + totalInterest,
      monthlyRate,
      effective: paymentMode === 'minimum',
    };
  }, [balance, apr, monthlyPayment, paymentMode]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            APR (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Payment Mode
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setPaymentMode('minimum')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                paymentMode === 'minimum'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Minimum Payment (2%)
            </button>
            <button
              onClick={() => setPaymentMode('fixed')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                paymentMode === 'fixed'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Fixed Payment
            </button>
          </div>
        </div>

        {paymentMode === 'fixed' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Monthly Payment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-primary">£</span>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Payoff Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Time to Pay Off</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {results.payoffTime}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Interest Paid</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Amount Paid</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalPaid.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {results.months >= 360 && (
          <div className="bg-red-100 border border-error border-opacity-30 rounded-[var(--radius-input)] p-3">
            <p className="text-sm text-text-primary font-medium">
              At this payment level, it will take 30+ years to pay off. Increase your payment to reduce the debt faster.
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-3">
          <p className="text-sm text-text-primary">
            <span className="font-medium">Example:</span> Paying £{(monthlyPayment + 50).toLocaleString('en-GB')} instead of £{monthlyPayment.toLocaleString('en-GB')} would save months and reduce interest significantly.
          </p>
        </div>
      </div>
    </div>
  );
}
