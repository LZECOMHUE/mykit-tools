'use client';

import { useState, useMemo } from 'react';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const currentTipPercentage = customTip ? parseFloat(customTip) : tipPercentage;

  const results = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = Math.max(1, parseInt(numberOfPeople) || 1);
    const tipAmount = (bill * currentTipPercentage) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;

    return { tipAmount, total, perPerson, bill };
  }, [billAmount, currentTipPercentage, numberOfPeople]);

  const commonBills = [20, 50, 100, 150];

  const handlePreset = (percentage) => {
    setCustomTip('');
    setTipPercentage(percentage);
  };

  const handleCustomTip = (value) => {
    setCustomTip(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-6 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Bill Amount
          </label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Tip Percentage
          </label>
          <div className="flex gap-2 flex-wrap">
            {[10, 12.5, 15, 18, 20].map((pct) => (
              <button
                key={pct}
                onClick={() => handlePreset(pct)}
                className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors ${
                  !customTip && tipPercentage === pct
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={customTip}
            onChange={(e) => handleCustomTip(e.target.value)}
            placeholder="Custom %"
            className="w-full mt-3 px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Number of People
          </label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="1"
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Tip Amount</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {fmt(results.tipAmount)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Total</p>
          <p className="font-mono-num text-3xl font-bold text-accent">
            {fmt(results.total)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Per Person</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {fmt(results.perPerson)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Tip Percentage</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {currentTipPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h3 className="text-text-primary font-semibold mb-4">Quick Reference</h3>
        <div className="space-y-2">
          {commonBills.map((bill) => {
            const tip = (bill * currentTipPercentage) / 100;
            const total = bill + tip;
            return (
              <div key={bill} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="text-text-secondary">{fmt(bill)} bill</span>
                <div className="text-right">
                  <span className="font-mono-num text-text-primary mr-4">{fmt(tip)}</span>
                  <span className="font-mono-num font-bold text-accent">{fmt(total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
