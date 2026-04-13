'use client';

import { useState, useMemo } from 'react';

export default function USCarPaymentCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [tradeIn, setTradeIn] = useState('0');
  const [apr, setAPR] = useState('6.5');
  const [term, setTerm] = useState('60');
  const [salesTax, setSalesTax] = useState('8');

  const calculations = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const rate = parseFloat(apr) || 0;
    const months = parseFloat(term) || 60;
    const taxRate = parseFloat(salesTax) || 0;

    // Calculate loan amount
    const afterTax = price * (1 + taxRate / 100);
    const loanAmount = afterTax - down - trade;

    if (loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        loanAmount: 0,
        totalPaid: 0,
        totalInterest: 0,
        totalCost: price,
        taxAmount: price * (taxRate / 100),
      };
    }

    // Calculate monthly payment using formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    const monthlyRate = rate / 100 / 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    const monthlyPayment = loanAmount * (numerator / denominator);

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;
    const totalCost = price + totalInterest;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      loanAmount: Math.round(loanAmount),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      taxAmount: Math.round(price * (taxRate / 100)),
    };
  }, [vehiclePrice, downPayment, tradeIn, apr, term, salesTax]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const downPaymentPercent = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    return price > 0 ? ((down / price) * 100).toFixed(1) : 0;
  }, [vehiclePrice, downPayment]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Input Section */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Loan Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              label: 'Vehicle Price',
              value: vehiclePrice,
              setter: setVehiclePrice,
              prefix: '$',
            },
            {
              label: 'Down Payment',
              value: downPayment,
              setter: setDownPayment,
              prefix: '$',
              helper: `(${downPaymentPercent}%)`,
            },
            {
              label: 'Trade-in Value',
              value: tradeIn,
              setter: setTradeIn,
              prefix: '$',
            },
            {
              label: 'Sales Tax Rate',
              value: salesTax,
              setter: setSalesTax,
              suffix: '%',
            },
            {
              label: 'Interest Rate (APR)',
              value: apr,
              setter: setAPR,
              suffix: '%',
            },
            {
              label: 'Loan Term',
              value: term,
              setter: setTerm,
              suffix: 'months',
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {field.label}
                {field.helper && (
                  <span className="text-text-muted text-xs ml-2">{field.helper}</span>
                )}
              </label>
              <div className="flex gap-2">
                {field.prefix && (
                  <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                    {field.prefix}
                  </span>
                )}
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  step={field.suffix === '%' ? '0.1' : '500'}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                />
                {field.suffix && !field.prefix && (
                  <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-700 mb-2">Monthly Payment</div>
        <div className="text-5xl font-mono font-bold text-blue-900">
          {formatCurrency(calculations.monthlyPayment)}
        </div>
        <div className="text-sm text-blue-700 mt-3">
          Over {term} months
        </div>
      </div>

      {/* Loan Breakdown */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Loan Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Vehicle Price', value: vehiclePrice },
            { label: 'Sales Tax (' + salesTax + '%)', value: calculations.taxAmount },
            { label: 'Total Before Down Payment', value: parseFloat(vehiclePrice) + calculations.taxAmount },
            { label: 'Down Payment', value: downPayment, negative: true },
            { label: 'Trade-in Value', value: tradeIn, negative: true },
            { label: 'Loan Amount', value: calculations.loanAmount, highlight: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center py-2 ${
                idx < 5 ? 'border-b border-border' : 'border-t-2 border-accent pt-3'
              } ${item.highlight ? 'font-bold text-accent' : ''}`}
            >
              <span className={item.highlight ? 'text-accent' : 'text-text-secondary'}>
                {item.label}
              </span>
              <span
                className={`font-mono font-bold ${
                  item.highlight ? 'text-accent text-lg' : 'text-text-primary'
                }`}
              >
                {item.negative && '-'}
                {formatCurrency(Math.abs(item.value))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-lg">
          <div className="text-sm text-text-secondary mb-2">Total Amount Paid</div>
          <div className="text-3xl font-mono font-bold text-accent">
            {formatCurrency(calculations.totalPaid)}
          </div>
          <div className="text-xs text-text-muted mt-2">
            {term} monthly payments
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-700 mb-2">Total Interest</div>
          <div className="text-3xl font-mono font-bold text-red-600">
            {formatCurrency(calculations.totalInterest)}
          </div>
          <div className="text-xs text-red-600 mt-2">
            {((calculations.totalInterest / calculations.loanAmount) * 100).toFixed(1)}% of loan
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">Total Cost</div>
          <div className="text-3xl font-mono font-bold text-blue-600">
            {formatCurrency(calculations.totalCost)}
          </div>
          <div className="text-xs text-blue-600 mt-2">
            Price + interest
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">💡 Car Buying Tips</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• A larger down payment reduces your loan amount and total interest paid</li>
          <li>• Shorter loan terms mean less interest but higher monthly payments</li>
          <li>• APR varies based on credit score - shop around with different lenders</li>
          <li>• Consider certified pre-owned vehicles for better value</li>
          <li>• Factor in insurance, maintenance, and fuel costs in your budget</li>
          <li>• Don't forget registration and inspection fees (vary by state)</li>
        </ul>
      </div>
    </div>
  );
}
