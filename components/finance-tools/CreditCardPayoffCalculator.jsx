'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('5000');
  const [apr, setApr] = useState('19.9');
  const [minPaymentPercent, setMinPaymentPercent] = useState('2');
  const [extraPayment, setExtraPayment] = useState('50');
  const [result, setResult] = useState(null);

  function calculate() {
    const bal = parseFloat(balance) || 0;
    const monthlyRate = parseFloat(apr) / 100 / 12;
    const minPercent = parseFloat(minPaymentPercent) / 100;
    const extra = parseFloat(extraPayment) || 0;

    let balMinOnly = bal;
    let monthsMinOnly = 0;
    let totalPaidMinOnly = 0;
    let totalInterestMinOnly = 0;

    while (balMinOnly > 0.01 && monthsMinOnly < 600) {
      const interest = balMinOnly * monthlyRate;
      totalInterestMinOnly += interest;
      const minPayment = Math.max(balMinOnly * minPercent, 25);
      balMinOnly = balMinOnly + interest - minPayment;
      totalPaidMinOnly += minPayment;
      monthsMinOnly++;
      if (balMinOnly < 0) balMinOnly = 0;
    }

    let remaining = bal;
    let monthCount = 0;
    let totalPaid = 0;
    let totalInterest = 0;

    while (remaining > 0.01 && monthCount < 600) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      const minPayment = Math.max(remaining * minPercent, 25);
      const totalPayment = minPayment + extra;
      remaining = remaining + interest - totalPayment;
      totalPaid += totalPayment;
      monthCount++;
      if (remaining < 0) remaining = 0;
    }

    const yearsMinOnly = Math.floor(monthsMinOnly / 12);
    const monthsRemainderMinOnly = monthsMinOnly % 12;
    const yearsWithExtra = Math.floor(monthCount / 12);
    const monthsRemainder2 = monthCount % 12;
    const interestSaved = totalInterestMinOnly - totalInterest;
    const timesSaved = monthsMinOnly - monthCount;

    setResult({
      balance: bal.toFixed(2),
      apr,
      minPaymentPercent,
      monthsMinOnly,
      yearsMinOnly,
      monthsRemainderMinOnly,
      totalPaidMinOnly: totalPaidMinOnly.toFixed(2),
      totalInterestMinOnly: totalInterestMinOnly.toFixed(2),
      monthsWithExtra: monthCount,
      yearsWithExtra,
      monthsRemainder2,
      totalPaidWithExtra: totalPaid.toFixed(2),
      totalInterestWithExtra: totalInterest.toFixed(2),
      interestSaved: interestSaved.toFixed(2),
      timeSaved: timesSaved,
      yearsSaved: Math.floor(timesSaved / 12),
      monthsLeftSaved: timesSaved % 12,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Credit Card Payoff Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Credit Card Balance (£)
            </label>
            <Input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="5000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              APR (Annual Percentage Rate %)
            </label>
            <Input
              type="number"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              placeholder="19.9"
              min="0"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              UK average is 19 to 22%. Find yours on your statement.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Minimum Payment (% of balance)
            </label>
            <Input
              type="number"
              value={minPaymentPercent}
              onChange={(e) => setMinPaymentPercent(e.target.value)}
              placeholder="2"
              min="0.1"
              step="0.1"
            />
            <p className="text-xs text-secondary mt-1">
              Typically 2 to 3% of the balance, minimum of £25
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Extra Payment Per Month (£)
            </label>
            <Input
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              placeholder="50"
              min="0"
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Payoff Plan
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Payoff Comparison
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-3">Minimum Payment Only</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Time to clear:</span>
                    <span className="font-mono font-bold">
                      {result.yearsMinOnly}y {result.monthsRemainderMinOnly}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Total paid:</span>
                    <span className="font-mono font-bold">£{result.totalPaidMinOnly}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-bold text-primary">Interest:</span>
                    <span className="font-mono font-bold text-error">£{result.totalInterestMinOnly}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-3">
                  With Extra £{extraPayment}/month
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Time to clear:</span>
                    <span className="font-mono font-bold">
                      {result.yearsWithExtra}y {result.monthsRemainder2}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Total paid:</span>
                    <span className="font-mono font-bold">£{result.totalPaidWithExtra}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-bold text-primary">Interest:</span>
                    <span className="font-mono font-bold text-success">£{result.totalInterestWithExtra}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              By Paying Extra, You Save
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Interest Saved</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  £{result.interestSaved}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Time Saved</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  {result.yearsSaved}y {result.monthsLeftSaved}m
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-sm text-secondary">
              <p>
                Save <strong>£{result.interestSaved}</strong> and become debt-free <strong>{result.yearsSaved}y {result.monthsLeftSaved}m</strong> sooner.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
