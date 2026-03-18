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

export default function IndiaPPFCalculator() {
  const [annualContribution, setAnnualContribution] = useState(150000);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [yearsRemaining, setYearsRemaining] = useState(15);
  const [interestRate] = useState(7.1); // Current PPF rate

  const calculations = useMemo(() => {
    const contribution = Math.max(500, Math.min(1500000, annualContribution));
    const opening = Math.max(0, currentBalance);
    const years = Math.max(1, yearsRemaining);

    let balance = opening;
    const yearlyBreakdown = [];

    for (let year = 1; year <= years; year++) {
      // Interest on opening balance (compounded annually)
      const interest = balance * (interestRate / 100);
      balance += interest;

      // Contribution added (at the beginning of the year for calculation purposes)
      balance += contribution;

      yearlyBreakdown.push({
        year,
        contribution: contribution,
        interest: interest,
        balance: balance,
      });
    }

    const totalContributed = opening + (contribution * years);
    const totalInterest = balance - totalContributed;

    return {
      finalValue: balance,
      totalContributed,
      totalInterest,
      yearlyBreakdown,
      currentBalance: opening,
      annualContribution: contribution,
    };
  }, [annualContribution, currentBalance, yearsRemaining, interestRate]);

  const investedPercentage = (calculations.totalContributed / calculations.finalValue) * 100;
  const interestPercentage = (calculations.totalInterest / calculations.finalValue) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">PPF Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Contribution (₹)</label>
            <input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              min="500"
              max="1500000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">Min: ₹500, Max: ₹1,50,000</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current PPF Balance (₹)</label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years Remaining</label>
            <input
              type="number"
              value={yearsRemaining}
              onChange={(e) => setYearsRemaining(Math.max(1, Number(e.target.value)))}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">PPF maturity is 15 years, extendable in 5-year blocks</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-1">Current Interest Rate</p>
            <p className="font-mono font-bold text-2xl text-blue-900">{interestRate}% p.a.</p>
            <p className="text-xs text-blue-700 mt-2">Compounded annually, reviewed every quarter</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">PPF Projection</h2>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Contribution</p>
            <p className="font-mono font-bold text-2xl text-gray-900">₹{formatINR(calculations.totalContributed)}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Interest Earned</p>
            <p className="font-mono font-bold text-2xl text-green-900">₹{formatINR(calculations.totalInterest)}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Maturity Value</p>
            <p className="font-heading text-3xl font-bold text-blue-900">₹{formatINR(calculations.finalValue)}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
            <p className="font-mono font-bold text-2xl text-purple-900">{interestRate}%</p>
            <p className="text-xs text-purple-700 mt-1">Compounded annually</p>
          </div>
        </div>
      </div>

      {/* Contribution vs Interest Visualization */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Contribution vs Interest Earnings</h3>
        <div className="flex items-end gap-2 h-40 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${investedPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Contribution</p>
            <p className="text-xs text-gray-600 text-center">₹{formatINR(calculations.totalContributed)}</p>
            <p className="text-xs text-gray-600 text-center">{investedPercentage.toFixed(1)}%</p>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-green-500 rounded-t-lg" style={{ height: `${interestPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Interest</p>
            <p className="text-xs text-gray-600 text-center">₹{formatINR(calculations.totalInterest)}</p>
            <p className="text-xs text-gray-600 text-center">{interestPercentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-left px-3 py-2 font-semibold text-gray-900">Year</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Contribution (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Interest Earned (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {calculations.yearlyBreakdown.map((row) => (
                <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 font-semibold text-gray-900">{row.year}</td>
                  <td className="text-right px-3 py-2 font-mono text-gray-900">₹{formatINR(row.contribution)}</td>
                  <td className="text-right px-3 py-2 font-mono text-green-700 font-semibold">₹{formatINR(row.interest)}</td>
                  <td className="text-right px-3 py-2 font-mono font-semibold text-gray-900">₹{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">PPF: EEE Status (Tax Benefits)</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Exempt (E):</strong> Contributions are deductible under Section 80C (up to ₹1,50,000 with other 80C investments)</li>
          <li><strong>Exempt (E):</strong> Interest earned is completely tax-free</li>
          <li><strong>Exempt (E):</strong> Maturity amount is tax-free</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">PPF Key Features</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Lock-in Period:</strong> 15 years from opening</li>
          <li><strong>Partial Withdrawal:</strong> Allowed from 7th financial year onwards (50% of balance or previous year balance)</li>
          <li><strong>Loan Facility:</strong> Available from 4th to 6th financial year (up to 50% of balance)</li>
          <li><strong>Extension:</strong> After maturity, can extend in blocks of 5 years with or without contributions</li>
          <li><strong>Minimum Contribution:</strong> ₹500 per financial year</li>
          <li><strong>Maximum Contribution:</strong> ₹1,50,000 per financial year</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on the current PPF interest rate. The actual rate is reviewed quarterly by the government and may change. These projections are for informational purposes only. Consult a financial advisor for personalized investment planning.</p>
      </div>
    </div>
  );
}
