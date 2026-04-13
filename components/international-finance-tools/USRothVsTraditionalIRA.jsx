'use client';

import { useState, useMemo } from 'react';

export default function USRothVsTraditionalIRA() {
  const [currentTaxBracket, setCurrentTaxBracket] = useState(22);
  const [retirementTaxBracket, setRetirementTaxBracket] = useState(12);
  const [contributionAmount, setContributionAmount] = useState(7000);
  const [yearsToRetirement, setYearsToRetirement] = useState(25);
  const [annualReturn, setAnnualReturn] = useState(7);

  const results = useMemo(() => {
    // Calculate future value with compound interest
    const futureValue =
      contributionAmount * Math.pow(1 + annualReturn / 100, yearsToRetirement);

    // Traditional IRA
    const traditionalTaxSavingsNow = contributionAmount * (currentTaxBracket / 100);
    const traditionalTaxOwedAtRetirement = futureValue * (retirementTaxBracket / 100);
    const traditionalNetAtRetirement = futureValue - traditionalTaxOwedAtRetirement;

    // Roth IRA
    const rothAfterTaxCost = contributionAmount; // Already paid taxes
    const rothNetAtRetirement = futureValue; // Tax-free growth

    const difference = rothNetAtRetirement - traditionalNetAtRetirement;

    return {
      futureValue: Math.round(futureValue),
      traditionalTaxSavingsNow: Math.round(traditionalTaxSavingsNow),
      traditionalTaxOwedAtRetirement: Math.round(traditionalTaxOwedAtRetirement),
      traditionalNetAtRetirement: Math.round(traditionalNetAtRetirement),
      rothNetAtRetirement: Math.round(rothNetAtRetirement),
      difference: Math.round(difference),
      betterOption: difference > 0 ? 'Roth' : difference < 0 ? 'Traditional' : 'Equal',
      totalGrowth: Math.round(futureValue - contributionAmount),
    };
  }, [currentTaxBracket, retirementTaxBracket, contributionAmount, yearsToRetirement, annualReturn]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Account Assumptions</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Tax Bracket (%)
            </label>
            <input
              type="number"
              value={currentTaxBracket}
              onChange={(e) => setCurrentTaxBracket(Math.max(0, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Expected Retirement Tax Bracket (%)
            </label>
            <input
              type="number"
              value={retirementTaxBracket}
              onChange={(e) => setRetirementTaxBracket(Math.max(0, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Annual Contribution
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="7000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Years to Retirement
            </label>
            <input
              type="number"
              value={yearsToRetirement}
              onChange={(e) => setYearsToRetirement(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              step="0.1"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Comparison at Retirement</h3>

          <div className="bg-surface p-4 rounded-lg space-y-4">
            {/* Traditional IRA */}
            <div className="border border-border rounded-lg p-3">
              <h4 className="font-semibold text-text-primary mb-2">Traditional IRA</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax savings now:</span>
                  <span className="font-mono font-semibold text-accent">
                    ${results.traditionalTaxSavingsNow.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Future value:</span>
                  <span className="font-mono font-semibold">
                    ${results.futureValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-warning">
                  <span className="text-text-secondary">Taxes owed:</span>
                  <span className="font-mono font-semibold">
                    - ${results.traditionalTaxOwedAtRetirement.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Net at retirement:</span>
                  <span className="font-mono text-text-primary">
                    ${results.traditionalNetAtRetirement.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Roth IRA */}
            <div className="border border-border rounded-lg p-3 bg-success/5">
              <h4 className="font-semibold text-text-primary mb-2">Roth IRA</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">After-tax contribution:</span>
                  <span className="font-mono font-semibold">
                    ${contributionAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Future value:</span>
                  <span className="font-mono font-semibold">
                    ${results.futureValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-success">
                  <span className="text-text-secondary">Taxes owed:</span>
                  <span className="font-mono font-semibold">$0</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Net at retirement:</span>
                  <span className="font-mono text-success">
                    ${results.rothNetAtRetirement.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Winner */}
            <div className="bg-accent/10 -mx-4 px-4 py-3 rounded border border-accent">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-text-secondary">Better Option</p>
                  <p className="font-semibold text-text-primary">{results.betterOption} IRA</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Advantage</p>
                  <p className="font-mono font-bold text-accent">
                    ${Math.abs(results.difference).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Note:</p>
        <p>
          This comparison assumes a single annual contribution. Roth conversions, income limits,
          and catch-up contributions are not considered. Consult a tax advisor for personalized
          advice.
        </p>
      </div>
    </div>
  );
}
