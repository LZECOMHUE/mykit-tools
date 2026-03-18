'use client';

import { useState, useMemo } from 'react';

export default function USMortgageCalculator() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPaymentType, setDownPaymentType] = useState('percent');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [downPaymentDollar, setDownPaymentDollar] = useState('60000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.1');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState('1200');
  const [pmiMonthly, setPmiMonthly] = useState('0');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const calculations = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 30;

    let downPayment = 0;
    if (downPaymentType === 'percent') {
      downPayment = price * (parseFloat(downPaymentPercent) || 0) / 100;
    } else {
      downPayment = parseFloat(downPaymentDollar) || 0;
    }

    const principal = Math.max(0, price - downPayment);
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    // Calculate monthly principal + interest payment
    let monthlyPaymentPI = 0;
    if (monthlyRate === 0) {
      monthlyPaymentPI = principal / months;
    } else {
      monthlyPaymentPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    // Property tax (monthly)
    const monthlyPropertyTax = (price * parseFloat(propertyTaxRate) / 100) / 12;

    // Home insurance (monthly)
    const monthlyInsurance = (parseFloat(homeInsuranceAnnual) || 0) / 12;

    // PMI (monthly)
    const monthlyPMI = parseFloat(pmiMonthly) || 0;

    // Total monthly payment
    const totalMonthlyPayment = monthlyPaymentPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

    // Totals over life of loan
    const totalPrincipalInterest = monthlyPaymentPI * months;
    const totalInterest = totalPrincipalInterest - principal;
    const totalPropertyTax = monthlyPropertyTax * months;
    const totalInsurance = monthlyInsurance * months;
    const totalPMI = monthlyPMI * months;
    const totalCost = totalPrincipalInterest + totalPropertyTax + totalInsurance + totalPMI;

    // Amortization key milestones
    const amortizationMilestones = [];
    const milestoneLengths = [1, 5, 10, Math.ceil(years / 2), years];

    for (const years of milestoneLengths) {
      if (years > loanTerm) continue;

      const monthsElapsed = years * 12;
      let principalPaid = 0;
      let interestPaid = 0;
      let balance = principal;

      for (let i = 0; i < monthsElapsed; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPaymentPI - interestPayment;
        principalPaid += principalPayment;
        interestPaid += interestPayment;
        balance -= principalPayment;
      }

      amortizationMilestones.push({
        year: years,
        principalPaid: principalPaid.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });
    }

    return {
      homePrice: price,
      downPayment: downPayment.toFixed(2),
      downPaymentPercent: downPayment > 0 ? ((downPayment / price) * 100).toFixed(1) : '0',
      principal: principal.toFixed(2),
      interestRate: rate,
      loanTerm: years,
      monthlyPaymentPI: monthlyPaymentPI.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      monthlyPMI: monthlyPMI.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPropertyTax: totalPropertyTax.toFixed(2),
      totalInsurance: totalInsurance.toFixed(2),
      totalPMI: totalPMI.toFixed(2),
      totalCost: totalCost.toFixed(2),
      months,
      amortizationMilestones,
    };
  }, [homePrice, downPaymentType, downPaymentPercent, downPaymentDollar, interestRate, loanTerm, propertyTaxRate, homeInsuranceAnnual, pmiMonthly]);

  const handleQuickDownPayment = (percent) => {
    setDownPaymentType('percent');
    setDownPaymentPercent(percent.toString());
  };

  const handleQuickPrice = (price) => {
    setHomePrice(price.toString());
  };

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-text-secondary">Enter a home price to calculate</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-blue-900 mb-1">Disclaimer</p>
        <p>This is an estimate. Your actual payment may differ due to property taxes, insurance, HOA fees, and other costs. Consult a mortgage professional.</p>
      </div>

      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">US Mortgage Calculator</h2>

        {/* Home Price */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Home Price ($)</label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Down Payment</label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setDownPaymentType('percent')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                downPaymentType === 'percent'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Percentage
            </button>
            <button
              onClick={() => setDownPaymentType('dollar')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                downPaymentType === 'dollar'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Dollar Amount
            </button>
          </div>

          {downPaymentType === 'percent' ? (
            <input
              type="number"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          ) : (
            <input
              type="number"
              value={downPaymentDollar}
              onChange={(e) => setDownPaymentDollar(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          )}

          {/* Quick down payment buttons */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {[5, 10, 15, 20, 25].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickDownPayment(pct)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  downPaymentType === 'percent' && downPaymentPercent === pct.toString()
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate and Loan Term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Interest Rate (% annual)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Loan Term</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLoanTerm('15')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  loanTerm === '15'
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                15 Years
              </button>
              <button
                onClick={() => setLoanTerm('30')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  loanTerm === '30'
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                30 Years
              </button>
            </div>
          </div>
        </div>

        {/* Property Tax and Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Annual Property Tax Rate (%)</label>
            <input
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(e.target.value)}
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">Typical US average: 1.1%</p>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Annual Home Insurance ($)</label>
            <input
              type="number"
              value={homeInsuranceAnnual}
              onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        </div>

        {/* PMI */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Monthly PMI (if applicable) ($)</label>
          <input
            type="number"
            value={pmiMonthly}
            onChange={(e) => setPmiMonthly(e.target.value)}
            step="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
          <p className="text-text-muted text-xs mt-1">
            {parseFloat(calculations.downPaymentPercent) < 20
              ? `Down payment is ${calculations.downPaymentPercent}% - PMI required if lender requires it`
              : 'No PMI needed with 20%+ down payment'}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Monthly Payment (P&I)</p>
          <p className="font-mono text-2xl font-bold text-blue-600">{fmt(calculations.monthlyPaymentPI)}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Monthly Payment</p>
          <p className="font-mono text-2xl font-bold text-orange-600">{fmt(calculations.totalMonthlyPayment)}</p>
          <p className="text-text-muted text-xs mt-2">Including tax, insurance, PMI</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Interest Paid</p>
          <p className="font-mono text-2xl font-bold text-green-600">{fmt(calculations.totalInterest)}</p>
          <p className="text-text-muted text-xs mt-2">Over {calculations.loanTerm} years</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Monthly Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Principal + Interest</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyPaymentPI)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Property Tax</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyPropertyTax)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Home Insurance</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyInsurance)}</span>
          </div>

          {parseFloat(calculations.monthlyPMI) > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">PMI</span>
              <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyPMI)}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">TOTAL MONTHLY</span>
            <span className="font-mono text-lg text-accent">{fmt(calculations.totalMonthlyPayment)}</span>
          </div>
        </div>
      </div>

      {/* Loan Summary */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Loan Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Home Price</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.homePrice)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Down Payment ({calculations.downPaymentPercent}%)</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.downPayment)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Loan Amount</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.principal)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Interest Rate</span>
            <span className="font-mono font-semibold text-text-primary">{calculations.interestRate}%</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Loan Term</span>
            <span className="font-mono font-semibold text-text-primary">{calculations.loanTerm} years</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Total Interest Paid</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.totalInterest)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Total Property Tax</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.totalPropertyTax)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Total Insurance</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.totalInsurance)}</span>
          </div>

          {parseFloat(calculations.totalPMI) > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Total PMI</span>
              <span className="font-mono font-semibold text-text-primary">{fmt(calculations.totalPMI)}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">TOTAL COST</span>
            <span className="font-mono text-lg text-accent">{fmt(calculations.totalCost)}</span>
          </div>
        </div>
      </div>

      {/* Amortization Milestones */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Amortization Milestones</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Year</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Principal Paid</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Interest Paid</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {calculations.amortizationMilestones.map((row) => (
                <tr key={row.year} className="border-b border-border hover:bg-white">
                  <td className="py-2 px-2 text-text-secondary font-semibold">{row.year}</td>
                  <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(row.principalPaid)}</td>
                  <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(row.interestPaid)}</td>
                  <td className="py-2 px-2 text-right font-mono font-semibold text-text-primary">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Home Prices */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Quick Home Prices</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[150000, 250000, 300000, 400000, 500000, 600000, 750000, 1000000].map((price) => (
            <button
              key={price}
              onClick={() => handleQuickPrice(price)}
              className="px-3 py-2 rounded-lg bg-white border border-border text-text-primary hover:bg-accent hover:text-white hover:border-accent font-medium transition-colors text-sm"
            >
              {fmt(price)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
