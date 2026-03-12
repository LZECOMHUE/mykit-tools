'use client';

import { useState, useMemo } from 'react';

export default function CarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('25000');
  const [deposit, setDeposit] = useState('5000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanTerm, setLoanTerm] = useState('60');

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculations = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseFloat(loanTerm) || 0;

    if (!price || !months) return null;

    const principal = Math.max(0, price - dep);
    const monthlyRate = rate / 100 / 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      principal: principal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      depositPercent: ((dep / price) * 100).toFixed(1),
      balanceToPay: (price - dep).toFixed(2),
    };
  }, [vehiclePrice, deposit, interestRate, loanTerm]);

  const amortization = useMemo(() => {
    if (!calculations) return [];

    const price = parseFloat(vehiclePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseFloat(loanTerm) || 0;

    const principal = price - dep;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = parseFloat(calculations.monthlyPayment);

    const schedule = [];
    let remainingBalance = principal;

    for (let i = 1; i <= Math.min(months, 12); i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, remainingBalance).toFixed(2),
      });
    }

    return schedule;
  }, [calculations, vehiclePrice, deposit, interestRate, loanTerm]);

  const handleDepositPercent = (percent) => {
    const price = parseFloat(vehiclePrice) || 0;
    const newDeposit = (price * percent) / 100;
    setDeposit(newDeposit.toFixed(2));
  };

  const handleQuickPrice = (price) => {
    setVehiclePrice(price.toString());
  };

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-text-secondary">Enter a vehicle price to calculate</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Car Loan Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Vehicle Price
            </label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Deposit
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
              <div className="text-text-secondary text-sm py-3">
                {calculations.depositPercent}%
              </div>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Interest Rate (% annual)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Loan Term (months)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>

        {/* Quick Deposit Buttons */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Quick Deposit %
          </label>
          <div className="flex gap-2 flex-wrap">
            {[10, 20, 25, 33].map((pct) => (
              <button
                key={pct}
                onClick={() => handleDepositPercent(pct)}
                className="px-4 py-2 rounded-lg bg-white border border-border text-text-primary hover:bg-surface font-medium transition-colors"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Monthly Payment</p>
          <p className="font-mono-num text-2xl font-bold text-blue-600">
            {fmt(calculations.monthlyPayment)}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Interest</p>
          <p className="font-mono-num text-2xl font-bold text-green-600">
            {fmt(calculations.totalInterest)}
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Cost</p>
          <p className="font-mono-num text-2xl font-bold text-purple-600">
            {fmt(calculations.totalPayment)}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Amount Financed</p>
          <p className="font-mono-num text-2xl font-bold text-orange-600">
            {fmt(calculations.principal)}
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Loan Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: 'Vehicle Price', value: vehiclePrice },
            { label: 'Deposit', value: deposit },
            { label: 'Amount to Borrow', value: calculations.principal },
            { label: 'Total Interest', value: calculations.totalInterest },
            { label: 'Total Amount Paid', value: calculations.totalPayment },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-mono-num font-semibold text-text-primary">
                {fmt(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Amortization Schedule (First 12 months) */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Payment Schedule (First 12 Months)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Month</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Payment</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Principal</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Interest</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortization.map((row) => (
                <tr key={row.month} className="border-b border-border hover:bg-white">
                  <td className="py-2 px-2 text-text-secondary">{row.month}</td>
                  <td className="py-2 px-2 text-right font-mono-num text-text-primary">{fmt(row.payment)}</td>
                  <td className="py-2 px-2 text-right font-mono-num text-text-primary">{fmt(row.principal)}</td>
                  <td className="py-2 px-2 text-right font-mono-num text-text-primary">{fmt(row.interest)}</td>
                  <td className="py-2 px-2 text-right font-mono-num font-semibold text-text-primary">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Loan Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ A larger deposit reduces monthly payments and total interest</li>
          <li>✓ Compare rates from multiple lenders</li>
          <li>✓ Shorter terms mean less interest but higher monthly payments</li>
          <li>✓ Factor in insurance, tax, and maintenance costs</li>
        </ul>
      </div>

      {/* Quick Prices */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Quick Vehicle Prices</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000].map((price) => (
            <button
              key={price}
              onClick={() => handleQuickPrice(price)}
              className="px-3 py-2 rounded-lg bg-white border border-border text-text-primary hover:bg-accent hover:text-white hover:border-accent font-medium transition-colors"
            >
              {fmt(price)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
