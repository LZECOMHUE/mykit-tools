'use client';

import { useState, useMemo } from 'react';

export default function USCapitalGainsTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(10000);
  const [salePrice, setSalePrice] = useState(15000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [incomeLevel, setIncomeLevel] = useState('standard');
  const [holdingPeriod, setHoldingPeriod] = useState('long');
  const [isCrypto, setIsCrypto] = useState(false);

  const results = useMemo(() => {
    const gain = salePrice - purchasePrice;

    let taxRate = 0;
    let description = '';

    if (isCrypto || holdingPeriod === 'short') {
      // Short-term gains - ordinary income tax rates
      if (filingStatus === 'single') {
        if (incomeLevel === 'low') taxRate = 0.1;
        else if (incomeLevel === 'middle') taxRate = 0.22;
        else taxRate = 0.37;
      } else {
        if (incomeLevel === 'low') taxRate = 0.1;
        else if (incomeLevel === 'middle') taxRate = 0.22;
        else taxRate = 0.35;
      }
      description = 'Taxed as ordinary income';
    } else {
      // Long-term capital gains - preferential rates
      if (filingStatus === 'single') {
        if (incomeLevel === 'low') taxRate = 0.0;
        else if (incomeLevel === 'middle') taxRate = 0.15;
        else taxRate = 0.2;
      } else {
        if (incomeLevel === 'low') taxRate = 0.0;
        else if (incomeLevel === 'middle') taxRate = 0.15;
        else taxRate = 0.2;
      }
      description = 'Long-term capital gains rate';
    }

    const federalTax = Math.max(0, gain * taxRate);
    const stateTax = 0; // Varies by state, set to 0 for simplicity
    const totalTax = federalTax + stateTax;
    const netProceeds = salePrice - totalTax;

    return {
      gain,
      gainPercent: purchasePrice > 0 ? ((gain / purchasePrice) * 100).toFixed(1) : 0,
      taxRate: (taxRate * 100).toFixed(1),
      federalTax: Math.round(federalTax),
      stateTax: Math.round(stateTax),
      totalTax: Math.round(totalTax),
      netProceeds: Math.round(netProceeds),
      description,
      holdingType: holdingPeriod === 'long' ? 'Long-term (>1 year)' : 'Short-term (<=1 year)',
    };
  }, [purchasePrice, salePrice, filingStatus, incomeLevel, holdingPeriod, isCrypto]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Investment Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Purchase Price
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Sale Price
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="15000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Holding Period
            </label>
            <div className="space-y-2">
              {['short', 'long'].map((period) => (
                <label key={period} className="flex items-center">
                  <input
                    type="radio"
                    name="holdingPeriod"
                    value={period}
                    checked={holdingPeriod === period}
                    onChange={(e) => setHoldingPeriod(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-text-secondary">
                    {period === 'short' ? 'Short-term (<=1 year)' : 'Long-term (>1 year)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Income Level
            </label>
            <select
              value={incomeLevel}
              onChange={(e) => setIncomeLevel(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="low">Low Income</option>
              <option value="middle">Middle Income</option>
              <option value="high">High Income</option>
            </select>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isCrypto}
              onChange={(e) => setIsCrypto(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-text-secondary">Crypto/Digital Asset</span>
          </label>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Tax Calculation</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Capital Gain:</span>
              <div className="text-right">
                <div className="font-mono font-semibold text-text-primary">
                  ${results.gain.toLocaleString()}
                </div>
                <div className="text-sm text-text-secondary font-mono">
                  {results.gainPercent}% return
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="text-sm text-text-secondary mb-2">{results.description}</div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Holding Period:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {results.holdingType}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Tax Rate:</span>
                <span className="font-mono font-semibold text-accent">
                  {results.taxRate}%
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Federal Tax:</span>
                <span className="font-mono font-semibold text-accent">
                  ${results.federalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">State Tax:</span>
                <span className="font-mono font-semibold text-accent">
                  ${results.stateTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-lg">
                <span className="font-semibold text-text-primary">Total Tax:</span>
                <span className="font-mono font-bold text-accent">
                  ${results.totalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between bg-success/10 -mx-4 px-4 py-2 rounded">
                <span className="font-semibold text-text-primary">Net Proceeds:</span>
                <span className="font-mono font-bold text-success">
                  ${results.netProceeds.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This estimate does not include NIIT (3.8% tax on investment income) for high earners,
          state taxes, or other factors. Consult a tax professional for accurate calculations.
        </p>
      </div>
    </div>
  );
}
