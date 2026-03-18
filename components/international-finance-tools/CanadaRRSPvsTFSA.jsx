'use client';

import { useState, useMemo } from 'react';

export default function CanadaRRSPvsTFSA() {
  const [currentIncome, setCurrentIncome] = useState(80000);
  const [retirementIncome, setRetirementIncome] = useState(40000);
  const [contributionAmount, setContributionAmount] = useState(7000);
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [yearsUntilRetirement, setYearsUntilRetirement] = useState(25);

  const results = useMemo(() => {
    const current = parseFloat(currentIncome) || 0;
    const retired = parseFloat(retirementIncome) || 0;
    const contribution = parseFloat(contributionAmount) || 0;
    const returnRate = expectedReturn / 100;
    const years = parseFloat(yearsUntilRetirement) || 0;

    // Rough marginal tax rates based on income brackets
    const getCurrentMarginalRate = (income) => {
      if (income < 55867) return 0.15; // Federal 15%
      if (income < 111733) return 0.205; // Federal 20.5%
      if (income < 173205) return 0.26; // Federal 26%
      return 0.29;
    };

    const getRetirementMarginalRate = (income) => {
      if (income < 55867) return 0.15; // Federal 15%
      if (income < 111733) return 0.205; // Federal 20.5%
      return 0.26;
    };

    const currentMarginal = getCurrentMarginalRate(current);
    const retirementMarginal = getRetirementMarginalRate(retired);

    // RRSP analysis
    // Tax deduction now: contribution * current marginal rate
    const rrspTaxSavingsNow = contribution * currentMarginal;
    // Contribution grows tax-free
    const rrspAtRetirement =
      contribution * Math.pow(1 + returnRate, years);
    // Withdrawn at retirement, taxed at marginal rate
    const rrspWithdrawalTax = rrspAtRetirement * retirementMarginal;
    const rrspNetAtRetirement = rrspAtRetirement - rrspWithdrawalTax;

    // Effective RRSP benefit
    // You get tax saving now, pay tax on withdrawal later
    const rrspEffectiveBenefit = rrspTaxSavingsNow - rrspWithdrawalTax;

    // TFSA analysis
    // No tax deduction now
    const tfsaTaxSavingsNow = 0;
    // Grows tax-free (same as RRSP)
    const tfsaAtRetirement =
      contribution * Math.pow(1 + returnRate, years);
    // Withdrawn tax-free at retirement
    const tfsaWithdrawalTax = 0;
    const tfsaNetAtRetirement = tfsaAtRetirement;

    // Effective TFSA benefit
    const tfsaEffectiveBenefit = contribution;

    // Compare dollar amounts at retirement (after-tax)
    const rrspAfterTax = rrspNetAtRetirement;
    const tfsaAfterTax = tfsaNetAtRetirement;

    // Gross vs net after tax
    const rrspDifference = rrspAfterTax - tfsaAfterTax;

    // Which is better?
    let recommendation = '';
    if (currentMarginal > retirementMarginal) {
      recommendation = 'RRSP is likely better - you\'re in a higher tax bracket now than in retirement';
    } else if (retirementMarginal > currentMarginal) {
      recommendation = 'TFSA is likely better - you\'ll be in a higher tax bracket in retirement';
    } else {
      recommendation = 'Either option is roughly equivalent from a tax perspective';
    }

    return {
      rrspTaxSavingsNow: rrspTaxSavingsNow.toFixed(2),
      rrspGrowth: (rrspAtRetirement - contribution).toFixed(2),
      rrspAtRetirement: rrspAtRetirement.toFixed(2),
      rrspWithdrawalTax: rrspWithdrawalTax.toFixed(2),
      rrspNetAtRetirement: rrspNetAtRetirement.toFixed(2),
      tfsaAtRetirement: tfsaAtRetirement.toFixed(2),
      tfsaNetAtRetirement: tfsaNetAtRetirement.toFixed(2),
      rrspDifference: rrspDifference.toFixed(2),
      rrspDifferencePct: (
        (rrspDifference / Math.abs(tfsaAtRetirement)) *
        100
      ).toFixed(1),
      currentMarginal: (currentMarginal * 100).toFixed(0),
      retirementMarginal: (retirementMarginal * 100).toFixed(0),
      recommendation,
    };
  }, [
    currentIncome,
    retirementIncome,
    contributionAmount,
    expectedReturn,
    yearsUntilRetirement,
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Current Annual Income (CAD)
              </label>
              <input
                type="number"
                value={currentIncome}
                onChange={(e) => setCurrentIncome(e.target.value)}
                placeholder="Enter current income"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Expected Retirement Annual Income (CAD)
              </label>
              <input
                type="number"
                value={retirementIncome}
                onChange={(e) => setRetirementIncome(e.target.value)}
                placeholder="Enter retirement income"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Annual Contribution (CAD)
              </label>
              <input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                placeholder="Enter contribution amount"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                step="0.5"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Years Until Retirement
            </label>
            <input
              type="number"
              value={yearsUntilRetirement}
              onChange={(e) => setYearsUntilRetirement(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Tax Rate Comparison */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-text-primary font-semibold text-lg mb-4">
            Tax Bracket Comparison
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-text-secondary text-sm mb-2">Current Marginal Rate</p>
              <p className="text-3xl font-mono font-semibold text-accent">
                {results.currentMarginal}%
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-2">Retirement Marginal Rate</p>
              <p className="text-3xl font-mono font-semibold text-accent">
                {results.retirementMarginal}%
              </p>
            </div>
          </div>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* RRSP */}
          <div className="bg-white rounded-lg border border-border p-6 space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">RRSP</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Initial Contribution:</span>
                <span className="font-mono font-semibold">
                  ${parseFloat(contributionAmount).toFixed(0)}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Tax Savings Now:</span>
                <span className="font-mono font-semibold text-success">
                  +${results.rrspTaxSavingsNow}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Investment Growth:</span>
                <span className="font-mono font-semibold">
                  ${results.rrspGrowth}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Balance at Retirement:</span>
                <span className="font-mono font-semibold">
                  ${results.rrspAtRetirement}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Withdrawal Tax:</span>
                <span className="font-mono font-semibold text-error">
                  -${results.rrspWithdrawalTax}
                </span>
              </div>

              <div className="flex justify-between pt-2 bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                <span className="text-text-primary font-semibold">Net After Tax:</span>
                <span className="font-mono text-lg font-semibold text-accent">
                  ${results.rrspNetAtRetirement}
                </span>
              </div>
            </div>
          </div>

          {/* TFSA */}
          <div className="bg-white rounded-lg border border-border p-6 space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">TFSA</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Initial Contribution:</span>
                <span className="font-mono font-semibold">
                  ${parseFloat(contributionAmount).toFixed(0)}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Tax Savings Now:</span>
                <span className="font-mono font-semibold">$0</span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Investment Growth:</span>
                <span className="font-mono font-semibold">
                  ${results.rrspGrowth}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Balance at Retirement:</span>
                <span className="font-mono font-semibold">
                  ${results.tfsaAtRetirement}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Withdrawal Tax:</span>
                <span className="font-mono font-semibold">$0</span>
              </div>

              <div className="flex justify-between pt-2 bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                <span className="text-text-primary font-semibold">Net After Tax:</span>
                <span className="font-mono text-lg font-semibold text-accent">
                  ${results.tfsaNetAtRetirement}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 border border-accent rounded-lg p-6 space-y-3">
          <h3 className="text-text-primary font-semibold text-lg">Recommendation</h3>
          <p className="text-text-secondary">{results.recommendation}</p>
          <p className="text-sm text-text-muted">
            Difference at retirement (after tax): <span className="font-mono font-semibold">${results.rrspDifference}</span>
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Marginal rates are simplified federal estimates</li>
            <li>Assumes consistent return rate (markets vary)</li>
            <li>Does not account for provincial credits or deductions</li>
            <li>TFSA contribution room is limited</li>
            <li>RRSP has income limits for some taxpayers</li>
            <li>Consult a financial advisor for your specific situation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
