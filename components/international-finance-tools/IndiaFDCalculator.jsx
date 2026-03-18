'use client';

import { useState, useMemo } from 'react';

const formatINR = (amount) => {
  if (amount < 0) return '-' + formatINR(-amount);
  const str = Math.round(amount).toString();
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 2) {
    result = remaining.slice(-2) + ',' + result;
    remaining = remaining.slice(0, -2);
  }
  if (remaining) result = remaining + ',' + result;
  return result;
};

export default function IndiaFDCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [years, setYears] = useState(2);
  const [months, setMonths] = useState(0);
  const [compounding, setCompounding] = useState('quarterly');
  const [seniorCitizen, setSeniorCitizen] = useState(false);

  const calculations = useMemo(() => {
    const P = Math.max(0, principal);
    const baseRate = Math.max(0, interestRate);
    const rateBonus = seniorCitizen ? 0.5 : 0;
    const rate = baseRate + rateBonus;
    const totalMonths = Math.max(1, years * 12 + months);
    const totalYears = totalMonths / 12;

    let compoundingFrequency = 1;
    let compoundingLabel = 'Annually';

    switch (compounding) {
      case 'monthly':
        compoundingFrequency = 12;
        compoundingLabel = 'Monthly';
        break;
      case 'quarterly':
        compoundingFrequency = 4;
        compoundingLabel = 'Quarterly';
        break;
      case 'annual':
        compoundingFrequency = 1;
        compoundingLabel = 'Annually';
        break;
      default:
        compoundingFrequency = 4;
        compoundingLabel = 'Quarterly';
    }

    // Compound Interest Formula: A = P(1 + r/(100*n))^(n*t)
    const amount = P * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * totalYears);
    const interest = amount - P;

    // TDS Calculation: 10% if interest > 40,000 (50,000 for seniors)
    const tdsThreshold = seniorCitizen ? 50000 : 40000;
    const tdsDue = interest > tdsThreshold ? interest * 0.1 : 0;
    const amountAfterTDS = amount - tdsDue;

    return {
      principal: P,
      rate,
      totalMonths,
      totalYears,
      amount,
      interest,
      compoundingLabel,
      baseRate,
      rateBonus,
      tdsDue,
      tdsThreshold,
      amountAfterTDS,
    };
  }, [principal, interestRate, years, months, compounding, seniorCitizen]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">FD Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%) p.a.</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {seniorCitizen && (
              <p className="text-xs text-green-700 mt-1">+0.5% bonus for senior citizens included</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Months</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(Math.max(0, Math.min(11, Number(e.target.value))))}
                min="0"
                max="11"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compounding Frequency</label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annually</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="senior"
              checked={seniorCitizen}
              onChange={(e) => setSeniorCitizen(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="senior" className="text-sm font-medium text-gray-700">
              Senior Citizen (60+ years)
            </label>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">FD Returns</h2>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
            <p className="font-mono font-bold text-2xl text-gray-900">₹{formatINR(calculations.principal)}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Interest Earned</p>
            <p className="font-mono font-bold text-2xl text-green-900">₹{formatINR(calculations.interest)}</p>
            <p className="text-xs text-green-700 mt-1">At {calculations.rate}% p.a. ({calculations.compoundingLabel})</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Maturity Amount</p>
            <p className="font-heading text-3xl font-bold text-blue-900">₹{formatINR(calculations.amount)}</p>
          </div>

          {calculations.tdsDue > 0 && (
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-600 mb-1">TDS Deducted (10%)</p>
              <p className="font-mono font-bold text-lg text-amber-900">₹{formatINR(calculations.tdsDue)}</p>
              <p className="text-xs text-amber-700 mt-2">Amount After TDS:</p>
              <p className="font-mono font-bold text-lg text-amber-900">₹{formatINR(calculations.amountAfterTDS)}</p>
            </div>
          )}

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Duration</p>
            <p className="font-mono font-bold text-xl text-purple-900">
              {calculations.totalYears.toFixed(2)} years ({calculations.totalMonths} months)
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 mb-4">
        <p className="font-semibold text-blue-900 mb-2">How Compounding Works</p>
        <p className="mb-3">Interest earned in each period is added to the principal for the next period, earning interest on interest:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Quarterly:</strong> Interest calculated and added 4 times per year (most common for banks)</li>
          <li><strong>Monthly:</strong> Interest calculated and added 12 times per year (higher returns)</li>
          <li><strong>Annually:</strong> Interest calculated and added once per year (lower returns)</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 mb-4">
        <p className="font-semibold text-blue-900 mb-2">Tax Deducted at Source (TDS)</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>10% TDS</strong> is deducted if annual interest exceeds ₹40,000 (for general citizens)</li>
          <li><strong>₹50,000 threshold</strong> for senior citizens (aged 60+)</li>
          <li>TDS is deposited to the income tax department on your behalf</li>
          <li>You can claim credit for TDS paid while filing your income tax return</li>
          <li>TDS is only a tax advance; you may still owe tax or get a refund when filing returns</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">Senior Citizen Benefits (Age 60+)</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Extra 0.5% interest rate on FDs (offered by most banks)</li>
          <li>Higher TDS threshold (₹50,000 instead of ₹40,000)</li>
          <li>Special FD schemes with higher rates at some banks</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on the entered interest rate and compounding frequency. Actual FD returns vary by bank and their specific terms. Interest rates are subject to change. Consult your bank for exact FD rates and terms applicable to you. TDS laws may vary based on your individual tax situation.</p>
      </div>
    </div>
  );
}
