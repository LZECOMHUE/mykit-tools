'use client';

import { useState, useMemo } from 'react';

export default function USTipCalculator() {
  const [billAmount, setBillAmount] = useState('50');
  const [tipPercent, setTipPercent] = useState('18');
  const [customTipPercent, setCustomTipPercent] = useState('');
  const [numPeople, setNumPeople] = useState('1');
  const [roundToNearest, setRoundToNearest] = useState('no');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculations = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = Math.max(1, parseInt(numPeople) || 1);

    let tip_percent = parseFloat(tipPercent) || 0;
    if (customTipPercent) {
      tip_percent = parseFloat(customTipPercent) || 0;
    }

    let tipAmount = bill * (tip_percent / 100);
    let total = bill + tipAmount;

    // Apply rounding if selected
    if (roundToNearest === 'yes') {
      tipAmount = Math.ceil(tipAmount);
      total = bill + tipAmount;
    }

    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    return {
      billAmount: bill,
      tipPercent: tip_percent,
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      numPeople: people,
    };
  }, [billAmount, tipPercent, customTipPercent, numPeople, roundToNearest]);

  const handleQuickTip = (percent) => {
    setTipPercent(percent.toString());
    setCustomTipPercent('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Bill Amount Input */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Tip Calculator</h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Bill Amount ($)</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              step="0.01"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="50.00"
            />
          </div>
        </div>

        {/* Quick Tip Buttons */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Tip Percentage</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[15, 18, 20].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickTip(pct)}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                  tipPercent === pct.toString() && !customTipPercent
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {[22, 25, 30].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickTip(pct)}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                  tipPercent === pct.toString() && !customTipPercent
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Custom Tip */}
          <div>
            <label className="block text-text-secondary text-xs font-medium mb-1">Custom Percentage</label>
            <div className="flex">
              <input
                type="number"
                value={customTipPercent}
                onChange={(e) => {
                  setCustomTipPercent(e.target.value);
                  if (e.target.value) setTipPercent('');
                }}
                step="0.1"
                className="flex-1 px-4 py-3 bg-white border border-r-0 border-border rounded-l-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                placeholder="Custom %"
              />
              <span className="inline-flex items-center px-4 bg-white border border-border border-l-0 rounded-r-lg text-text-secondary font-medium">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Split Between (people)</label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        {/* Rounding Option */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Round Tip to Nearest Dollar</label>
          <div className="flex gap-2">
            <button
              onClick={() => setRoundToNearest('no')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                roundToNearest === 'no'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              No
            </button>
            <button
              onClick={() => setRoundToNearest('yes')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                roundToNearest === 'yes'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="space-y-4">
        {/* Tip Amount */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-sm font-medium mb-1">Tip Amount</p>
          <p className="font-mono text-4xl font-bold text-blue-700">{fmt(calculations.tipAmount)}</p>
          <p className="text-blue-600 text-xs mt-2">{(parseFloat(customTipPercent || tipPercent) || 0).toFixed(1)}% of bill</p>
        </div>

        {/* Total */}
        <div className="bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm font-medium mb-1">Total Amount</p>
          <p className="font-mono text-4xl font-bold text-green-700">{fmt(calculations.total)}</p>
          <p className="text-green-600 text-xs mt-2">Bill + Tip</p>
        </div>

        {/* Per Person (if splitting) */}
        {calculations.numPeople > 1 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-600 text-sm font-medium mb-1">Per Person</p>
            <p className="font-mono text-4xl font-bold text-purple-700">{fmt(calculations.perPerson)}</p>
            <p className="text-purple-600 text-xs mt-2">
              Total split {calculations.numPeople} ways (Tip: {fmt(calculations.tipPerPerson)} per person)
            </p>
          </div>
        )}
      </div>

      {/* Breakdown Table */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Bill Amount</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.billAmount)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">
              Tip ({(parseFloat(customTipPercent || tipPercent) || 0).toFixed(1)}%)
            </span>
            <span className="font-mono font-semibold text-accent">{fmt(calculations.tipAmount)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Total</span>
            <span className="font-mono text-lg text-green-600">{fmt(calculations.total)}</span>
          </div>

          {calculations.numPeople > 1 && (
            <>
              <div className="flex justify-between items-center py-2 border-b border-border mt-3">
                <span className="text-text-secondary">Number of People</span>
                <span className="font-mono font-semibold text-text-primary">{calculations.numPeople}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
                <span className="text-text-primary">Per Person</span>
                <span className="font-mono text-lg text-purple-600">{fmt(calculations.perPerson)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tipping Guide */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Tipping Guide</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ <strong>15%:</strong> Standard for adequate service</li>
          <li>✓ <strong>18%:</strong> Good service (most common)</li>
          <li>✓ <strong>20%:</strong> Excellent service</li>
          <li>✓ <strong>22-25%:</strong> Exceptional service or fine dining</li>
          <li>✓ <strong>30%+:</strong> Outstanding experience</li>
          <li>✓ Adjust lower for self-service or takeout</li>
          <li>✓ Consider local customs and service quality</li>
        </ul>
      </div>
    </div>
  );
}
