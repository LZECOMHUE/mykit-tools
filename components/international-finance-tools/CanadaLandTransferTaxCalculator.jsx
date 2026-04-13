'use client';

import { useState, useMemo } from 'react';

const TAX_BRACKETS = {
  ON: [
    { threshold: 55000, rate: 0.005, label: 'First $55,000' },
    { threshold: 250000, rate: 0.01, label: '$55,001 to $250,000' },
    { threshold: 400000, rate: 0.015, label: '$250,001 to $400,000' },
    { threshold: 800000, rate: 0.02, label: '$400,001 to $800,000' },
    { threshold: Infinity, rate: 0.025, label: 'Over $800,000' },
  ],
  BC: [
    { threshold: 200000, rate: 0.01, label: 'First $200,000' },
    { threshold: 2000000, rate: 0.02, label: '$200,001 to $2,000,000' },
    { threshold: Infinity, rate: 0.03, label: 'Over $2,000,000' },
  ],
  AB: [
    { threshold: 150000, rate: 0.01, label: 'First $150,000' },
    { threshold: 300000, rate: 0.02, label: '$150,001 to $300,000' },
    { threshold: Infinity, rate: 0.03, label: 'Over $300,000' },
  ],
  QC: [
    { threshold: 50000, rate: 0.005, label: 'First $50,000' },
    { threshold: Infinity, rate: 0.01, label: 'Over $50,000' },
  ],
  NS: [
    { threshold: 150000, rate: 0.01, label: 'First $150,000' },
    { threshold: Infinity, rate: 0.015, label: 'Over $150,000' },
  ],
};

export default function CanadaLandTransferTaxCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [province, setProvince] = useState('ON');
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isToronto, setIsToronto] = useState(false);

  const results = useMemo(() => {
    const price = parseFloat(propertyPrice) || 0;
    const brackets = TAX_BRACKETS[province] || TAX_BRACKETS.ON;

    let tax = 0;
    let previousThreshold = 0;

    for (const bracket of brackets) {
      const currentThreshold = Math.min(bracket.threshold, price);
      if (currentThreshold > previousThreshold) {
        const taxableInThisBracket = currentThreshold - previousThreshold;
        tax += taxableInThisBracket * bracket.rate;
      }
      previousThreshold = currentThreshold;
      if (price <= bracket.threshold) break;
    }

    // First-time buyer rebates (varies by province)
    let rebate = 0;
    if (isFirstTimeBuyer) {
      if (province === 'ON' && price <= 400000) {
        rebate = Math.min(tax, 4000); // Max $4,000 rebate
      } else if (province === 'BC' && price <= 500000) {
        rebate = Math.min(tax, 8000); // Max $8,000 rebate
      } else if (province === 'AB' && price <= 500000) {
        rebate = Math.min(tax, 5000); // Max $5,000 rebate
      } else if (province === 'QC' && price <= 250000) {
        rebate = Math.min(tax, 1500); // Max $1,500 rebate
      }
    }

    // Toronto municipal LTT (additional)
    let torontoLTT = 0;
    if (isToronto && province === 'ON') {
      let torontoTax = 0;
      const toruntoBrackets = [
        { threshold: 55000, rate: 0.0075 },
        { threshold: 250000, rate: 0.01 },
        { threshold: 400000, rate: 0.015 },
        { threshold: Infinity, rate: 0.02 },
      ];

      let torontoPrevious = 0;
      for (const bracket of toruntoBrackets) {
        const currentThreshold = Math.min(bracket.threshold, price);
        if (currentThreshold > torontoPrevious) {
          const taxableInThisBracket = currentThreshold - torontoPrevious;
          torontoTax += taxableInThisBracket * bracket.rate;
        }
        torontoPrevious = currentThreshold;
        if (price <= bracket.threshold) break;
      }
      torontoLTT = torontoTax;
    }

    const finalTax = tax + torontoLTT - rebate;

    return {
      provincialTax: tax.toFixed(2),
      firstTimeBuyerRebate: rebate.toFixed(2),
      torontoLTT: torontoLTT.toFixed(2),
      totalTax: finalTax.toFixed(2),
      effectiveRate: ((finalTax / price) * 100).toFixed(2),
    };
  }, [propertyPrice, province, isFirstTimeBuyer, isToronto]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Property Price (CAD)
            </label>
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              placeholder="Enter property price"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Province
            </label>
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                if (e.target.value !== 'ON') setIsToronto(false);
              }}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              {Object.keys(TAX_BRACKETS).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          {province === 'ON' && (
            <div>
              <label className="block text-text-primary font-medium mb-2">
                <input
                  type="checkbox"
                  checked={isToronto}
                  onChange={(e) => setIsToronto(e.target.checked)}
                  className="mr-2"
                />
                Property is in Toronto (additional municipal LTT)
              </label>
            </div>
          )}

          <div>
            <label className="block text-text-primary font-medium mb-2">
              <input
                type="checkbox"
                checked={isFirstTimeBuyer}
                onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                className="mr-2"
              />
              First-Time Home Buyer
            </label>
            <p className="text-text-muted text-sm mt-1">
              Eligible for rebate (varies by province)
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Land Transfer Tax</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Provincial Tax:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.provincialTax}
              </span>
            </div>

            {isToronto && parseFloat(results.torontoLTT) > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Toronto Municipal Tax:</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.torontoLTT}
                </span>
              </div>
            )}

            {isFirstTimeBuyer && parseFloat(results.firstTimeBuyerRebate) > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">First-Time Buyer Rebate:</span>
                <span className="font-mono font-semibold text-success">
                  -${results.firstTimeBuyerRebate}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Total LTT:</span>
              <span className="font-mono text-2xl font-semibold text-accent">
                ${results.totalTax}
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-text-muted text-sm">
            <p>Effective tax rate: <span className="font-mono">{results.effectiveRate}%</span></p>
            <p>Plus property appraisal, legal fees, and inspection costs</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Rates are current as of 2025</li>
            <li>First-time buyer rebate eligibility varies by province</li>
            <li>Toronto municipal tax applies only in Toronto</li>
            <li>Consult a real estate lawyer for accurate calculations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
