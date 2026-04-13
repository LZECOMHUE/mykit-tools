'use client';

import { useState, useMemo } from 'react';

const PROVINCIAL_HST = {
  ON: 0.13,
  BC: 0.12,
  AB: 0.05,
  QC: 0.15,
  NS: 0.15,
  NB: 0.15,
  NL: 0.15,
  PE: 0.15,
  MB: 0.12,
  SK: 0.11,
};

export default function CanadaCarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(7000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [province, setProvince] = useState('ON');

  const results = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseFloat(loanTerm) || 0;

    // Sales tax on vehicle
    const salesTaxRate = PROVINCIAL_HST[province] || 0.13;
    const salesTax = price * salesTaxRate;
    const totalCost = price + salesTax;

    // Loan amount
    const principal = totalCost - down;

    // Monthly payment calculation (standard amortization)
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    } else if (months > 0) {
      monthlyPayment = principal / months;
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    return {
      vehiclePrice: price.toFixed(2),
      salesTax: salesTax.toFixed(2),
      salesTaxRate: (salesTaxRate * 100).toFixed(1),
      totalVehicleCost: totalCost.toFixed(2),
      downPayment: down.toFixed(2),
      downPaymentPercent: ((down / totalCost) * 100).toFixed(1),
      principal: principal.toFixed(2),
      monthlyRate: (monthlyRate * 100 * 12).toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      loanTerm: months.toFixed(0),
      totalPaid: totalPaid.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      effectiveRate: (rate * 100).toFixed(1),
    };
  }, [vehiclePrice, downPayment, interestRate, loanTerm, province]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Vehicle Price (CAD)
            </label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              placeholder="Enter vehicle price"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">Before sales tax</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Down Payment (CAD)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="Enter down payment"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.1"
                placeholder="Enter interest rate"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Loan Term (months)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <option value={24}>24 months (2 years)</option>
                <option value={36}>36 months (3 years)</option>
                <option value={48}>48 months (4 years)</option>
                <option value={60}>60 months (5 years)</option>
                <option value={72}>72 months (6 years)</option>
                <option value={84}>84 months (7 years)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Province
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                {Object.entries(PROVINCIAL_HST).map(([prov, rate]) => (
                  <option key={prov} value={prov}>
                    {prov} ({(rate * 100).toFixed(0)}% tax)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Cost Breakdown</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Vehicle Price:</span>
              <span className="font-mono font-semibold">
                ${results.vehiclePrice}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">
                Sales Tax ({results.salesTaxRate}%):
              </span>
              <span className="font-mono font-semibold">
                ${results.salesTax}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Total Vehicle Cost:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.totalVehicleCost}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">
                Down Payment ({results.downPaymentPercent}%):
              </span>
              <span className="font-mono font-semibold">
                ${results.downPayment}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Amount to Finance:</span>
              <span className="font-mono text-xl font-semibold text-accent">
                ${results.principal}
              </span>
            </div>
          </div>
        </div>

        {/* Loan Payment Summary */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Loan Payments</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Monthly Payment:</span>
              <span className="font-mono text-3xl font-semibold text-accent">
                ${results.monthlyPayment}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Loan Term:</span>
              <span className="font-mono font-semibold">
                {results.loanTerm} months ({(parseFloat(results.loanTerm) / 12).toFixed(1)} years)
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Total Amount Paid:</span>
              <span className="font-mono font-semibold">
                ${results.totalPaid}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-text-secondary">Total Interest Paid:</span>
              <span className="font-mono font-semibold text-error">
                ${results.totalInterest}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-text-secondary text-sm mb-1">Interest Rate (APR)</p>
            <p className="text-2xl font-mono font-semibold text-accent">
              {results.effectiveRate}%
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-text-secondary text-sm mb-1">Total Cost of Borrowing</p>
            <p className="text-2xl font-mono font-semibold text-error">
              ${results.totalInterest}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Sales tax rates vary by province (shown for 2025)</li>
            <li>Does not include licence, registration, or insurance</li>
            <li>Interest rates vary by lender and credit score</li>
            <li>Assumes fixed rate loan with no early repayment penalties</li>
            <li>Consult with lenders for actual rate quotes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
