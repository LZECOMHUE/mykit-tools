'use client';

import { useState, useMemo } from 'react';

export default function USChildTaxCreditCalculator() {
  const [numberOfChildren, setNumberOfChildren] = useState(2);
  const [filingStatus, setFilingStatus] = useState('single');
  const [agi, setAgi] = useState(100000);

  const results = useMemo(() => {
    // Child Tax Credit: $2,000 per qualifying child under 17
    const creditPerChild = 2000;
    const totalCredit = numberOfChildren * creditPerChild;

    // Phase-out thresholds (2025)
    const phaseOutThreshold =
      filingStatus === 'single' ? 400000 : filingStatus === 'married' ? 600000 : 450000;

    const phaseOutRate = 50; // $50 for each $1,000 over threshold

    let finalCredit = totalCredit;
    if (agi > phaseOutThreshold) {
      const excessIncome = agi - phaseOutThreshold;
      const phaseOutAmount = Math.ceil(excessIncome / 1000) * phaseOutRate;
      finalCredit = Math.max(0, totalCredit - phaseOutAmount);
    }

    const phaseOutPercent =
      agi > phaseOutThreshold ? ((phaseOutAmount / totalCredit) * 100).toFixed(1) : 0;

    return {
      numberOfChildren,
      creditPerChild,
      totalCredit,
      phaseOutThreshold,
      agiExcess: Math.max(0, agi - phaseOutThreshold),
      phaseOutAmount: Math.max(0, totalCredit - finalCredit),
      finalCredit: Math.round(finalCredit),
      phaseOutPercent,
      isFullyPhased: finalCredit === 0,
      isPartiallyPhased: finalCredit > 0 && finalCredit < totalCredit,
    };
  }, [numberOfChildren, filingStatus, agi]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Filing Information</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Qualifying Children (Under 17)
            </label>
            <select
              value={numberOfChildren}
              onChange={(e) => setNumberOfChildren(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'child' : 'children'}
                </option>
              ))}
            </select>
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
              <option value="headOfHouse">Head of Household</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Adjusted Gross Income (AGI)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={agi}
                onChange={(e) => setAgi(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="100000"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Credit Calculation</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Children Qualifying:</span>
              <span className="font-mono font-semibold text-text-primary">
                {results.numberOfChildren}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Credit per Child:</span>
                <span className="font-mono font-semibold">
                  ${results.creditPerChild.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-text-primary">Total Credit:</span>
                <span className="font-mono text-accent">
                  ${results.totalCredit.toLocaleString()}
                </span>
              </div>
            </div>

            {results.agiExcess > 0 && (
              <div className="border-t border-border pt-3 bg-warning/10 -mx-4 px-4 py-3 rounded">
                <p className="text-sm font-semibold text-text-primary mb-2">Phase-Out Applied</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Phase-Out Threshold:</span>
                    <span className="font-mono">
                      ${results.phaseOutThreshold.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Income Over Threshold:</span>
                    <span className="font-mono">
                      ${results.agiExcess.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-warning">
                    <span className="text-text-secondary">Credit Reduction:</span>
                    <span className="font-mono font-semibold">
                      - ${results.phaseOutAmount.toLocaleString()} ({results.phaseOutPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Final Tax Credit:</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${results.finalCredit.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-2">
                {results.finalCredit === 0
                  ? 'Your income exceeds the maximum threshold'
                  : results.isPartiallyPhased
                  ? 'Your credit has been reduced due to high income'
                  : 'You qualify for the full credit'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details and Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Qualifying Children</p>
          <p className="text-text-secondary">
            To qualify, the child must be a U.S. citizen, national, or resident alien, under age
            17 at the end of the year, and claimed as a dependent on your tax return.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Phase-Out Rules</p>
          <p className="text-text-secondary">
            The credit reduces by $50 for every $1,000 (or fraction thereof) of income above the
            threshold. Higher earners may not qualify for the full credit.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Refundable Portion</p>
          <p className="text-text-secondary">
            Up to $1,700 of the credit is refundable (the Additional Child Tax Credit), meaning
            you can get a refund even if you owe no taxes.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Other Dependents</p>
          <p className="text-text-secondary">
            Other dependents over 17 (such as adult children or elderly parents) qualify for a
            $500 dependent credit instead.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Important:</p>
        <p>
          This is a simplified estimate. Actual tax credits depend on your complete tax return,
          including all income sources and deductions. Consult a tax professional or use IRS
          Publication 972 for official guidance.
        </p>
      </div>
    </div>
  );
}
