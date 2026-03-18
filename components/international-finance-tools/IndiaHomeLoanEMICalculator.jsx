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

export default function IndiaHomeLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculations = useMemo(() => {
    const principal = Math.max(0, loanAmount);
    const rate = Math.max(0, interestRate) / 100 / 12;
    const months = Math.max(1, tenure * 12);

    // EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    // Year-by-year breakdown
    const yearBreakdown = [];
    let remainingBalance = principal;

    for (let year = 1; year <= tenure; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 0; month < 12 && remainingBalance > 0; month++) {
        const interestPayment = remainingBalance * rate;
        const principalPayment = emi - interestPayment;

        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        remainingBalance -= principalPayment;
      }

      yearBreakdown.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, remainingBalance),
      });
    }

    // Tax benefit calculation (Section 24 - interest up to 2L, Section 80C - principal up to 1.5L)
    const interestTaxBenefit = Math.min(200000, totalInterest);
    const principalTaxBenefit = Math.min(150000, principal);
    const totalTaxBenefit = interestTaxBenefit + principalTaxBenefit;

    return {
      emi: Math.round(emi),
      totalPayable: Math.round(totalPayable),
      totalInterest: Math.round(totalInterest),
      principal,
      yearBreakdown,
      interestTaxBenefit,
      principalTaxBenefit,
      totalTaxBenefit,
    };
  }, [loanAmount, interestRate, tenure]);

  const principalPercentage = (calculations.principal / calculations.totalPayable) * 100;
  const interestPercentage = (calculations.totalInterest / calculations.totalPayable) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Loan Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Math.max(1, Math.min(30, Number(e.target.value))))}
              min="1"
              max="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Loan Summary</h2>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
            <p className="font-mono font-bold text-3xl text-blue-900">₹{formatINR(calculations.emi)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Principal Amount</p>
              <p className="font-mono font-bold text-lg text-gray-900">₹{formatINR(calculations.principal)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="font-mono font-bold text-lg text-gray-900">₹{formatINR(calculations.totalInterest)}</p>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
            <p className="font-mono font-bold text-2xl text-green-900">₹{formatINR(calculations.totalPayable)}</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600 mb-1">Potential Tax Benefit (per year)</p>
            <p className="font-mono font-bold text-lg text-amber-900">₹{formatINR(calculations.totalTaxBenefit / tenure)}</p>
            <p className="text-xs text-amber-700 mt-1">Sec 24 (interest): ₹{formatINR(calculations.interestTaxBenefit)}</p>
            <p className="text-xs text-amber-700">Sec 80C (principal): ₹{formatINR(calculations.principalTaxBenefit)}</p>
          </div>
        </div>
      </div>

      {/* Principal vs Interest Visualization */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Principal vs Interest Split</h3>
        <div className="flex items-end gap-2 h-32 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${principalPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Principal</p>
            <p className="text-xs text-gray-600 text-center">{principalPercentage.toFixed(1)}%</p>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-green-500 rounded-t-lg" style={{ height: `${interestPercentage}%` }}></div>
            <p className="text-xs font-semibold text-gray-900 text-center mt-2">Interest</p>
            <p className="text-xs text-gray-600 text-center">{interestPercentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Year-by-Year Amortization</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-left px-3 py-2 font-semibold text-gray-900">Year</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Principal (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Interest (₹)</th>
                <th className="text-right px-3 py-2 font-semibold text-gray-900">Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {calculations.yearBreakdown.map((row) => (
                <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 font-semibold text-gray-900">{row.year}</td>
                  <td className="text-right px-3 py-2 font-mono text-gray-900">₹{formatINR(row.principal)}</td>
                  <td className="text-right px-3 py-2 font-mono text-gray-900">₹{formatINR(row.interest)}</td>
                  <td className="text-right px-3 py-2 font-mono font-semibold text-gray-900">₹{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">Tax Benefits on Home Loans</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><strong>Section 24:</strong> Home loan interest up to ₹2,00,000 per year (only for self-occupied property)</li>
          <li><strong>Section 80C:</strong> Principal repayment up to ₹1,50,000 per year (across all 80C investments)</li>
          <li>These benefits are available in both old and new tax regimes</li>
          <li>Self-occupied property gets full interest relief; let-out property has no limit on interest deduction</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on the information entered. Actual EMI may vary based on processing fees, insurance, exact interest rates, and payment terms from your lender. Always verify with your bank before making financial decisions.</p>
      </div>
    </div>
  );
}
