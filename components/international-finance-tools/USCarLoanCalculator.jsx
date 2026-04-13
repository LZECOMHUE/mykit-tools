'use client';

import { useState, useMemo } from 'react';

export default function USCarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(7000);
  const [tradeIn, setTradeIn] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [state, setState] = useState('CA');

  // State sales tax rates
  const saleTaxRates = {
    CA: 0.0725, TX: 0.0625, FL: 0.06, NY: 0.04, WA: 0.065,
  };

  const results = useMemo(() => {
    const salesTaxRate = saleTaxRates[state] || 0.07;
    const salesTax = vehiclePrice * salesTaxRate;
    const salesTaxOnFinanced = salesTax;

    const loanAmount = vehiclePrice - downPayment - tradeIn + salesTaxOnFinanced;

    // Monthly payment calculation (amortization formula)
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / loanTerm
        : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
          (Math.pow(1 + monthlyRate, loanTerm) - 1);

    const totalPaid = monthlyPayment * loanTerm;
    const totalInterest = totalPaid - loanAmount;

    return {
      vehiclePrice: Math.round(vehiclePrice),
      salesTax: Math.round(salesTax),
      salesTaxRate: (salesTaxRate * 100).toFixed(2),
      totalPrice: Math.round(vehiclePrice + salesTax),
      downPayment: Math.round(downPayment),
      tradeIn: Math.round(tradeIn),
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      downPaymentPercent: ((downPayment / vehiclePrice) * 100).toFixed(1),
    };
  }, [vehiclePrice, downPayment, tradeIn, interestRate, loanTerm, state]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Vehicle & Finance Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Vehicle Price
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="35000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Down Payment
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="7000"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">{results.downPaymentPercent}% of vehicle price</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Trade-In Value
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={tradeIn}
                onChange={(e) => setTradeIn(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Interest Rate (% APR)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              placeholder="6.5"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Loan Term (months)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={60}>60 months (5 years)</option>
              <option value={72}>72 months (6 years)</option>
              <option value={84}>84 months (7 years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="WA">Washington</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Loan Summary</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Vehicle Price:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.vehiclePrice.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Sales Tax ({results.salesTaxRate}%):</span>
                <span className="font-mono">
                  ${results.salesTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-sm font-semibold">
                <span className="text-text-primary">Total Price:</span>
                <span className="font-mono">
                  ${results.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Down Payment:</span>
                <span className="font-mono">- ${results.downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Trade-In:</span>
                <span className="font-mono">- ${results.tradeIn.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-text-primary">Loan Amount:</span>
                <span className="font-mono text-lg font-bold text-accent">
                  ${results.loanAmount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2 text-sm border-t border-accent/20 pt-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monthly Payment:</span>
                  <span className="font-mono font-bold text-accent">
                    ${results.monthlyPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Loan Term:</span>
                  <span className="font-mono font-semibold">
                    {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Interest Rate:</span>
                  <span className="font-mono font-semibold">
                    {interestRate}% APR
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-text-secondary">Total Interest:</span>
                <span className="font-mono font-semibold text-warning">
                  ${results.totalInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Amount Paid:</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.totalPaid.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Pro Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>A larger down payment reduces your monthly payment and total interest.</li>
          <li>Shorter loan terms cost more per month but save interest over time.</li>
          <li>Shop around for interest rates - credit unions often beat dealer rates.</li>
          <li>This does not include insurance, maintenance, registration, or fuel costs.</li>
        </ul>
      </div>
    </div>
  );
}
