'use client';

import { useState, useMemo } from 'react';

export default function CanadaTippingCalculator() {
  const [billAmount, setBillAmount] = useState('75.00');
  const [tipPercent, setTipPercent] = useState('18');
  const [numPeople, setNumPeople] = useState('1');
  const [splitEvenly, setSplitEvenly] = useState(true);

  const calculations = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const percent = parseFloat(tipPercent) || 18;
    const people = parseFloat(numPeople) || 1;

    const tipAmount = bill * (percent / 100);
    const total = bill + tipAmount;
    const perPerson = splitEvenly ? total / people : total;
    const tipPerPerson = splitEvenly ? tipAmount / people : tipAmount;

    return {
      billAmount: bill,
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      people,
    };
  }, [billAmount, tipPercent, numPeople, splitEvenly]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Bill Amount (Before Tax)
          </label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              $
            </span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              step="0.01"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Tip Percentage
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              step="0.5"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              %
            </span>
          </div>
          <div className="flex gap-1 flex-wrap">
            {[15, 18, 20, 25].map((pct) => (
              <button
                key={pct}
                onClick={() => setTipPercent(pct.toString())}
                className="px-2 py-1 text-xs bg-accent/10 text-accent rounded hover:bg-accent/20"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Number of People
          </label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent mb-2"
          />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={splitEvenly}
              onChange={(e) => setSplitEvenly(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-text-secondary">Split evenly</span>
          </label>
        </div>
      </div>

      {/* Main Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="text-sm text-blue-700 mb-2">Tip Amount</div>
          <div className="text-4xl font-mono font-bold text-blue-900">
            {formatCurrency(calculations.tipAmount)}
          </div>
          {calculations.people > 1 && splitEvenly && (
            <div className="text-sm text-blue-700 mt-2">
              {formatCurrency(calculations.tipPerPerson)} per person
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="text-sm text-green-700 mb-2">Total (Bill + Tip)</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.total)}
          </div>
          {calculations.people > 1 && splitEvenly && (
            <div className="text-sm text-green-700 mt-2">
              {formatCurrency(calculations.perPerson)} per person
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Tip Suggestions
        </h3>
        <div className="space-y-2">
          {[
            { percent: 15, situation: 'Average service' },
            { percent: 18, situation: 'Good service (standard)' },
            { percent: 20, situation: 'Excellent service' },
            { percent: 25, situation: 'Exceptional service' },
          ].map((item) => {
            const tipAmount = (
              (parseFloat(billAmount) * item.percent) /
              100
            ).toFixed(2);
            const total = (parseFloat(billAmount) + parseFloat(tipAmount)).toFixed(2);
            return (
              <div
                key={item.percent}
                className={`flex justify-between items-center p-3 rounded border ${
                  parseInt(tipPercent) === item.percent
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="text-text-secondary">{item.situation}</span>
                <div className="text-right">
                  <span className="font-mono font-bold text-text-primary">
                    {formatCurrency(tipAmount)}
                  </span>
                  <div className="text-xs text-text-muted">
                    Total: {formatCurrency(total)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canadian Tipping Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🍁 Canadian Tipping Guide</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <strong>Restaurants:</strong> 15-20% for dine-in service
          </div>
          <div>
            <strong>Takeout:</strong> 10-15% (usually just service charge)
          </div>
          <div>
            <strong>Delivery:</strong> 10-15% or $2-5 depending on distance
          </div>
          <div>
            <strong>Bars:</strong> $1-2 per drink or 15-20% of bill
          </div>
          <div>
            <strong>Taxi/Rideshare:</strong> 15-20%
          </div>
          <div>
            <strong>Hair Salon:</strong> 15-20% for service provider
          </div>
          <div>
            <strong>Hotel Housekeeping:</strong> $2-5 per night
          </div>
        </div>
      </div>

      {/* About Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          Important Notes
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Some restaurants add automatic gratuity for large groups (usually 18-20%)</li>
          <li>• Tipping is voluntary in Canada but is an expected courtesy</li>
          <li>• Tax is not included in the bill amount shown</li>
          <li>• You can adjust the tip amount if service was exceptional or poor</li>
          <li>• Digital payment systems often ask for tip at payment terminal</li>
        </ul>
      </div>
    </div>
  );
}
