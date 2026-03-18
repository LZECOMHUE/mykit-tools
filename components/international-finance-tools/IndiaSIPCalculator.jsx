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

export default function IndiaSIPCalculator() {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [investmentYears, setInvestmentYears] = useState(10);

  const calculations = useMemo(() => {
    const P = Math.max(0, monthlySIP);
    const annualRate = Math.max(0, annualReturn) / 100;
    const monthlyRate = annualRate / 12;
    const months = Math.max(1, investmentYears * 12);

    // SIP Future Value Formula: FV = P × [(1+r)^n - 1] / r × (1+r)
    // This accounts for the fact that each installment earns returns for different periods

    let totalValue = 0;
    let totalInvested = 0;
    const monthlyBreakdown = [];

    for (let month = 1; month <= months; month++) {
      const monthsRemaining = months - month + 1;
      const futureValueOfThisInstallment = P * Math.pow(1 + monthlyRate, monthsRemaining);
      totalValue += futureValueOfThisInstallment;
      totalInvested += P;

      // Store every 12th month for yearly summary
      if (month % 12 === 0) {
        monthlyBreakdown.push({
          year: month / 12,
          invested: totalInvested,
          value: totalValue,
        });
      }
    }

    const totalReturns = totalValue - totalInvested;
    const returnPercentage = (totalReturns / totalInvested) * 100;

    return {
      monthlySIP: P,
      totalInvested,
      totalReturns,
      totalValue,
      returnPercentage,
      monthlyBreakdown,
    };
  }, [monthlySIP, annualReturn, investmentYears]);

  const investedPercentage = (calculations.totalInvested / calculations.totalValue) * 100;
  const returnsPercentage = (calculations.totalReturns / calculations.totalValue) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">SIP Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly SIP Amount (₹)</label>
            <input
              type="number"
              value={monthlySIP}
              onChange={(e) => setMonthlySIP(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              step="0.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">Typical equity returns: 12-15%, Debt returns: 5-7%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Period (Years)</label>
            <input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(Math.max(1, Number(e.target.value)))}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">SIP Projection</h2>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Amount Invested</p>
            <p className="font-mono font-bold text-2xl text-gray-900">₹{formatINR(calculations.totalInvested)}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Estimated Returns</p>
            <p className="font-mono font-bold text-2xl text-green-900">₹{formatINR(calculations.totalReturns)}</p>
            <p className="text-sm text-green-700 mt-1">({calculations.returnPercentage.toFixed(1)}% growth)</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Value at Maturity</p>
            <p className="font-heading text-3xl font-bold text-blue-900">₹{formatINR(calculations.totalValue)}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Monthly SIP Amount</p>
            <p className="font-mono font-bold text-xl text-purple-900">₹{formatINR(calculations.monthlySIP)}</p>
            <p className="text-sm text-purple-700 mt-1">for {investmentYears} year{investmentYears !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Growth Visualization */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Invested Amount vs Returns</h3>
        <div className="flex items-end gap-2 h-40 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${investedPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Invested</p>
            <p className="text-xs text-gray-600 text-center">₹{formatINR(calculations.totalInvested)}</p>
            <p className="text-xs text-gray-600 text-center">{investedPercentage.toFixed(1)}%</p>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-green-500 rounded-t-lg" style={{ height: `${returnsPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Returns</p>
            <p className="text-xs text-gray-600 text-center">₹{formatINR(calculations.totalReturns)}</p>
            <p className="text-xs text-gray-600 text-center">{returnsPercentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Yearly Growth Projection</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-left px-3 py-2 font-semibold text-gray-900">Year</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Amount Invested (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Total Value (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Returns (₹)</th>
              </tr>
            </thead>
            <tbody>
              {calculations.monthlyBreakdown.map((row) => {
                const returns = row.value - row.invested;
                return (
                  <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.year}</td>
                    <td className="text-right px-3 py-2 font-mono text-gray-900">₹{formatINR(row.invested)}</td>
                    <td className="text-right px-3 py-2 font-mono text-gray-900">₹{formatINR(row.value)}</td>
                    <td className="text-right px-3 py-2 font-mono font-semibold text-green-700">₹{formatINR(returns)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">What is SIP?</p>
        <p className="mb-3">Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly (usually monthly) in mutual funds. It benefits from rupee cost averaging and the power of compound returns.</p>
        <p className="font-semibold text-blue-900 mb-2 mt-4">Benefits</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Disciplined investing with small amounts</li>
          <li>Power of compound returns over time</li>
          <li>Rupee cost averaging reduces impact of market volatility</li>
          <li>Flexibility to increase or stop anytime</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">Typical Annual Returns</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Equity Funds:</strong> 12-15% (higher risk, higher potential returns)</li>
          <li><strong>Balanced Funds:</strong> 8-10% (mix of stocks and bonds)</li>
          <li><strong>Debt Funds:</strong> 5-7% (lower risk, stable returns)</li>
          <li>Past performance does not guarantee future results</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on constant expected returns. Actual returns vary based on market conditions and fund performance. SIP investments are subject to market risks. Please consult a financial advisor before making investment decisions. Past performance does not guarantee future results.</p>
      </div>
    </div>
  );
}
