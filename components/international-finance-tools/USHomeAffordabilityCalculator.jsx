'use client';

import { useState, useMemo } from 'react';

export default function USHomeAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [downPayment, setDownPayment] = useState('60000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.1');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState('1200');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const calculations = useMemo(() => {
    const monthlyIncome = parseFloat(annualIncome) / 12 || 0;
    const otherMonthlyDebts = parseFloat(monthlyDebts) || 0;
    const downPaymentAmount = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 6.5;
    const taxRate = parseFloat(propertyTaxRate) || 1.1;
    const insurance = parseFloat(homeInsuranceAnnual) || 0;

    // 28% rule: housing should be max 28% of gross monthly income
    const max28Percent = monthlyIncome * 0.28;

    // 36% rule: total debt max 36% of gross monthly income
    // Available for housing = 36% of income - other debts
    const max36Percent = monthlyIncome * 0.36 - otherMonthlyDebts;

    // Housing payment budget is the lower of the two
    const maxHousingPayment = Math.min(max28Percent, max36Percent);

    // Now work backwards to find max home price
    // Housing payment = mortgage payment + property tax + insurance
    // Mortgage payment depends on home price
    // This requires iteration, so we'll use a search algorithm

    let maxHomePrice = 0;
    let bestPrice = 100000;
    let bestPayment = 0;

    for (let testPrice = 50000; testPrice <= 2000000; testPrice += 5000) {
      const principal = Math.max(0, testPrice - downPaymentAmount);
      const months = 360; // 30-year mortgage
      const monthlyRate = rate / 100 / 12;

      let monthlyPI = 0;
      if (monthlyRate === 0) {
        monthlyPI = principal / months;
      } else {
        monthlyPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
      }

      const monthlyPropertyTax = (testPrice * taxRate / 100) / 12;
      const monthlyInsurance = insurance / 12;
      const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance;

      if (totalMonthlyPayment <= maxHousingPayment) {
        bestPrice = testPrice;
        bestPayment = totalMonthlyPayment;
      } else {
        break;
      }
    }

    maxHomePrice = bestPrice;

    // Calculate the actual payment for the max home price
    const maxPrincipal = Math.max(0, maxHomePrice - downPaymentAmount);
    const months = 360;
    const monthlyRate = rate / 100 / 12;

    let monthlyPI = 0;
    if (monthlyRate === 0) {
      monthlyPI = maxPrincipal / months;
    } else {
      monthlyPI = (maxPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const monthlyPropertyTax = (maxHomePrice * taxRate / 100) / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance;

    const totalMonthlyObligations = totalMonthlyPayment + otherMonthlyDebts;
    const debtToIncomeRatio = ((totalMonthlyObligations / monthlyIncome) * 100).toFixed(1);
    const housingCostRatio = ((totalMonthlyPayment / monthlyIncome) * 100).toFixed(1);

    return {
      monthlyIncome: monthlyIncome.toFixed(2),
      maxHomePrice: maxHomePrice.toFixed(0),
      maxMonthlyPayment: totalMonthlyPayment.toFixed(2),
      monthlyPI: monthlyPI.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      downPaymentAmount: downPaymentAmount.toFixed(2),
      otherMonthlyDebts: otherMonthlyDebts.toFixed(2),
      totalMonthlyObligations: totalMonthlyObligations.toFixed(2),
      debtToIncomeRatio,
      housingCostRatio,
      max28Percent: max28Percent.toFixed(2),
      max36Percent: max36Percent.toFixed(2),
    };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, propertyTaxRate, homeInsuranceAnnual]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Home Affordability Calculator</h2>

        {/* Annual Income */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Annual Household Income ($)</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              step="5000"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="75000"
            />
          </div>
        </div>

        {/* Monthly Debts */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Monthly Debt Payments ($)</label>
          <p className="text-xs text-text-muted mb-2">Car loans, student loans, credit cards, etc.</p>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(e.target.value)}
              step="50"
              min="0"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="500"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Down Payment ($)</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              step="10000"
              min="0"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="60000"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Interest Rate (%)</label>
          <div className="flex">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.1"
              className="flex-1 px-4 py-3 bg-white border border-r-0 border-border rounded-l-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="6.5"
            />
            <span className="inline-flex items-center px-4 bg-white border border-border border-l-0 rounded-r-lg text-text-secondary font-medium">
              %
            </span>
          </div>
        </div>

        {/* Property Tax Rate */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Annual Property Tax Rate (%)</label>
          <p className="text-xs text-text-muted mb-2">Varies by location (1-2% typically)</p>
          <div className="flex">
            <input
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(e.target.value)}
              step="0.1"
              min="0"
              className="flex-1 px-4 py-3 bg-white border border-r-0 border-border rounded-l-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="1.1"
            />
            <span className="inline-flex items-center px-4 bg-white border border-border border-l-0 rounded-r-lg text-text-secondary font-medium">
              %
            </span>
          </div>
        </div>

        {/* Home Insurance */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Annual Home Insurance ($)</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={homeInsuranceAnnual}
              onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
              step="100"
              min="0"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="1200"
            />
          </div>
        </div>
      </div>

      {/* Max Home Price Result */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-600 text-sm font-medium mb-1">Maximum Home Price</p>
        <p className="font-mono text-4xl font-bold text-blue-700">{fmt(calculations.maxHomePrice)}</p>
        <p className="text-blue-600 text-xs mt-2">Based on 28/36 debt-to-income rules</p>
      </div>

      {/* Monthly Payment */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="text-green-600 text-sm font-medium mb-1">Estimated Monthly Payment</p>
        <p className="font-mono text-3xl font-bold text-green-700">{fmt(calculations.maxMonthlyPayment)}</p>
        <p className="text-green-600 text-xs mt-2">Principal, interest, taxes, and insurance</p>
      </div>

      {/* Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Payment Breakdown (Monthly)</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Principal & Interest</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyPI)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Property Tax</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyPropertyTax)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Home Insurance</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyInsurance)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Total Housing Payment</span>
            <span className="font-mono text-lg text-green-600">{fmt(calculations.maxMonthlyPayment)}</span>
          </div>
        </div>
      </div>

      {/* Debt Ratios */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Debt-to-Income Ratios</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Monthly Income</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.monthlyIncome)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Housing Cost Ratio</span>
            <span className="font-mono font-semibold text-text-primary">{calculations.housingCostRatio}%</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Other Monthly Debts</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.otherMonthlyDebts)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Total Debt-to-Income Ratio</span>
            <span className="font-mono text-lg text-accent">{calculations.debtToIncomeRatio}%</span>
          </div>
        </div>
      </div>

      {/* Rules Explanation */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">28/36 Rule Explained</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• <strong>28% Rule:</strong> Housing costs should not exceed 28% of gross monthly income</li>
          <li>• <strong>36% Rule:</strong> Total debt payments (including housing) should not exceed 36% of gross monthly income</li>
          <li>• <strong>Lender Requirement:</strong> Most lenders use both rules. Your max home price is limited by whichever is lower</li>
          <li>• <strong>Important:</strong> This calculator shows lending guidelines, not your actual affordability. Consider your personal financial situation</li>
        </ul>
      </div>
    </div>
  );
}
