'use client';

import { useState, useMemo } from 'react';

const closingCostPercentages = {
  origination: 0.01,
  discount: 0.005,
  appraisal: 0.004,
  creditReport: 0.0005,
  processing: 0.004,
  underwriting: 0.002,
  titleSearch: 0.003,
  titleInsurance: 0.006,
  survey: 0.002,
  recording: 0.001,
  transfer: 0.01,
  attorney: 0.008,
  inspections: 0.003,
  prepaidTaxes: 0.03, // estimate
  prepaidInsurance: 0.01,
};

export default function USClosingCostsCalculator() {
  const [homePrice, setHomePrice] = useState('350000');
  const [loanAmount, setLoanAmount] = useState('280000');
  const [state, setState] = useState('CA');
  const [loanType, setLoanType] = useState('conventional');

  const calculations = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const loan = parseFloat(loanAmount) || 0;

    // Calculate closing costs
    const closingCosts = {};
    let totalClosing = 0;

    Object.entries(closingCostPercentages).forEach(([key, percentage]) => {
      let cost = 0;

      if (['prepaidTaxes', 'prepaidInsurance'].includes(key)) {
        // Annual costs divided by 12 months, prorated
        const annualCost = price * percentage;
        cost = annualCost * 0.25; // Estimate 3 months prorated
      } else if (key === 'titleInsurance') {
        // Title insurance is usually 0.6% of price
        cost = price * 0.006;
      } else {
        cost = loan * percentage;
      }

      if (cost > 0) {
        closingCosts[key] = Math.round(cost);
        totalClosing += cost;
      }
    });

    // Add state-specific costs
    const stateTransferTax = state === 'CA' ? price * 0.011 : price * 0.005;
    closingCosts.stateTransferTax = Math.round(stateTransferTax);
    totalClosing += stateTransferTax;

    // LoanType adjustments
    if (loanType === 'fha') {
      closingCosts.mip = Math.round(loan * 0.0085); // FHA mortgage insurance premium
      totalClosing += closingCosts.mip;
    } else if (loanType === 'va') {
      closingCosts.fundingFee = Math.round(loan * 0.02);
      totalClosing += closingCosts.fundingFee;
    }

    const totalAsPercentage = (totalClosing / price) * 100;

    return {
      closingCosts,
      totalClosing: Math.round(totalClosing),
      totalAsPercentage: totalAsPercentage.toFixed(2),
      homePrice: price,
      loanAmount: loan,
      downPayment: Math.round(price - loan),
    };
  }, [homePrice, loanAmount, state, loanType]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const mainCategoryItems = [
    { label: 'Loan Origination Fee', key: 'origination' },
    { label: 'Discount Points', key: 'discount' },
    { label: 'Home Appraisal', key: 'appraisal' },
    { label: 'Title Search & Insurance', key: 'titleInsurance' },
    { label: 'Survey', key: 'survey' },
    { label: 'Attorney Fees', key: 'attorney' },
    { label: 'Inspections', key: 'inspections' },
    { label: 'Recording & Transfer Fees', key: 'transfer' },
    { label: 'Prepaid Property Taxes', key: 'prepaidTaxes' },
    { label: 'Prepaid Homeowners Insurance', key: 'prepaidInsurance' },
  ];

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Inputs */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Property Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Home Purchase Price
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Loan Amount
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div className="text-xs text-accent font-mono mt-1">
              Down Payment: {formatCurrency(calculations.downPayment)} (
              {((calculations.downPayment / calculations.homePrice) * 100).toFixed(1)}%)
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Loan Type
            </label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="va">VA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="NY">New York</option>
              <option value="FL">Florida</option>
              <option value="IL">Illinois</option>
            </select>
          </div>
        </div>
      </div>

      {/* Total Closing Costs */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="text-sm text-red-700 mb-1">Total Closing Costs</div>
            <div className="text-5xl font-mono font-bold text-red-900">
              {formatCurrency(calculations.totalClosing)}
            </div>
            <div className="text-sm text-red-700 mt-2">
              {calculations.totalAsPercentage}% of home price
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-text-secondary mb-1">Cost Range</div>
            <div className="text-sm text-text-primary">
              Typically 2% - 5% of home price
            </div>
            <div className="text-2xl font-mono font-bold text-accent mt-2">
              {formatCurrency(
                (calculations.homePrice * 0.02)
              )} - {formatCurrency((calculations.homePrice * 0.05))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Closing Cost Breakdown
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {mainCategoryItems
            .filter((item) => calculations.closingCosts[item.key])
            .map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center py-2 px-3 border-b border-border hover:bg-surface"
              >
                <span className="text-text-secondary">{item.label}</span>
                <span className="font-mono font-bold text-text-primary">
                  {formatCurrency(calculations.closingCosts[item.key])}
                </span>
              </div>
            ))}

          {calculations.closingCosts.stateTransferTax && (
            <div className="flex justify-between items-center py-2 px-3 border-b border-border hover:bg-surface">
              <span className="text-text-secondary">
                State Transfer Tax ({state})
              </span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.closingCosts.stateTransferTax)}
              </span>
            </div>
          )}

          {calculations.closingCosts.mip && (
            <div className="flex justify-between items-center py-2 px-3 border-b border-border hover:bg-surface">
              <span className="text-text-secondary">
                FHA Mortgage Insurance Premium
              </span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.closingCosts.mip)}
              </span>
            </div>
          )}

          {calculations.closingCosts.fundingFee && (
            <div className="flex justify-between items-center py-2 px-3 border-b border-border hover:bg-surface">
              <span className="text-text-secondary">VA Funding Fee</span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(calculations.closingCosts.fundingFee)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-3 px-3 bg-accent/10 rounded mt-2 font-bold text-accent">
            <span>Total</span>
            <span className="font-mono text-lg">
              {formatCurrency(calculations.totalClosing)}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="text-sm text-text-secondary mb-2">Home Price</div>
          <div className="text-2xl font-mono font-bold text-text-primary">
            {formatCurrency(calculations.homePrice)}
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="text-sm text-text-secondary mb-2">Down Payment</div>
          <div className="text-2xl font-mono font-bold text-accent">
            {formatCurrency(calculations.downPayment)}
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="text-sm text-text-secondary mb-2">Loan Amount</div>
          <div className="text-2xl font-mono font-bold text-text-primary">
            {formatCurrency(calculations.loanAmount)}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">💡 Closing Cost Tips</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Get a Loan Estimate within 3 days of applying - it shows estimated closing costs</li>
          <li>• Get a Closing Disclosure 3 days before closing to review actual costs</li>
          <li>• Some fees can be negotiated with the lender</li>
          <li>• Compare quotes from multiple lenders to reduce costs</li>
          <li>• Ask about No-Cost loans (fees rolled into mortgage) vs. reduced fees</li>
          <li>• Some costs may be tax-deductible (property taxes, mortgage interest)</li>
        </ul>
      </div>
    </div>
  );
}
