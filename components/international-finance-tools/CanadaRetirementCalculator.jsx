'use client';

import { useState, useMemo } from 'react';

export default function CanadaRetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [rrspBalance, setRrspBalance] = useState(100000);
  const [tfsaBalance, setTfsaBalance] = useState(50000);
  const [currentSalary, setCurrentSalary] = useState(80000);
  const [annualSavings, setAnnualSavings] = useState(12000);
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);

  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const returnRate = expectedReturn / 100;

    // Calculate RRSP growth
    const rrspAtRetirement =
      parseFloat(rrspBalance) * Math.pow(1 + returnRate, yearsToRetirement) +
      parseFloat(annualSavings) *
        (Math.pow(1 + returnRate, yearsToRetirement) - 1) /
        returnRate;

    // Calculate TFSA growth (same calculation)
    const tfsaAtRetirement =
      parseFloat(tfsaBalance) * Math.pow(1 + returnRate, yearsToRetirement) +
      (parseFloat(annualSavings) * 0.5) *
        (Math.pow(1 + returnRate, yearsToRetirement) - 1) /
        returnRate;

    // CPP/OAS (rough estimates for 2025)
    // Average CPP: ~15,000/year at 65 (max ~19,000)
    // OAS: ~7,300/year at 65
    const cppEstimate = 15000;
    const oasEstimate = 7300;
    const governmentIncome = (cppEstimate + oasEstimate) * yearsInRetirement;

    // Total capital at retirement
    const totalCapital = rrspAtRetirement + tfsaAtRetirement;

    // Drawdown strategy: 4% rule
    const annualDrawdown = totalCapital * 0.04;
    const totalRetirementIncome =
      annualDrawdown * yearsInRetirement +
      cppEstimate * yearsInRetirement +
      oasEstimate * yearsInRetirement;

    // Simple life expectancy check
    const capitalDrawnPerYear = annualDrawdown;
    const totalYearsCapitalLasts =
      totalCapital > 0
        ? (totalCapital / Math.max(capitalDrawnPerYear, 1)) * (1 / 0.04)
        : 0;

    return {
      yearsToRetirement: yearsToRetirement.toFixed(0),
      rrspAtRetirement: rrspAtRetirement.toFixed(2),
      tfsaAtRetirement: tfsaAtRetirement.toFixed(2),
      totalCapital: totalCapital.toFixed(2),
      cppAnnual: cppEstimate.toFixed(2),
      oasAnnual: oasEstimate.toFixed(2),
      governmentIncomeTotal: governmentIncome.toFixed(2),
      annualDrawdown: annualDrawdown.toFixed(2),
      yearsInRetirement: yearsInRetirement.toFixed(0),
      totalRetirementIncome: totalRetirementIncome.toFixed(2),
      annualRetirementIncome: (
        totalRetirementIncome / yearsInRetirement
      ).toFixed(2),
    };
  }, [
    currentAge,
    retirementAge,
    rrspBalance,
    tfsaBalance,
    currentSalary,
    annualSavings,
    expectedReturn,
    lifeExpectancy,
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Retirement Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Current RRSP Balance (CAD)
              </label>
              <input
                type="number"
                value={rrspBalance}
                onChange={(e) => setRrspBalance(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Current TFSA Balance (CAD)
              </label>
              <input
                type="number"
                value={tfsaBalance}
                onChange={(e) => setTfsaBalance(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Annual Savings (CAD)
              </label>
              <input
                type="number"
                value={annualSavings}
                onChange={(e) => setAnnualSavings(e.target.value)}
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
              Life Expectancy (Age)
            </label>
            <input
              type="number"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-border space-y-4">
            <h2 className="text-text-primary font-semibold text-lg">
              At Retirement (Age {retirementAge})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-text-secondary text-sm mb-2">RRSP Balance</p>
                <p className="text-2xl font-mono font-semibold text-accent">
                  ${results.rrspAtRetirement}
                </p>
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-2">TFSA Balance</p>
                <p className="text-2xl font-mono font-semibold text-accent">
                  ${results.tfsaAtRetirement}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-text-secondary text-sm mb-2">Total Capital</p>
              <p className="text-3xl font-mono font-semibold text-accent">
                ${results.totalCapital}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border space-y-4">
            <h2 className="text-text-primary font-semibold text-lg">
              Annual Retirement Income (4% withdrawal rule)
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Investment Drawdown:</span>
                <span className="font-mono font-semibold">
                  ${results.annualDrawdown}/year
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary">CPP (estimated):</span>
                <span className="font-mono font-semibold">
                  ${results.cppAnnual}/year
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">OAS (estimated):</span>
                <span className="font-mono font-semibold">
                  ${results.oasAnnual}/year
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
                <span className="text-text-primary font-semibold">
                  Total Annual Income:
                </span>
                <span className="font-mono text-2xl font-semibold text-accent">
                  ${results.annualRetirementIncome}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CPP and OAS estimates are rough averages</li>
            <li>Assumes consistent return rate (markets vary)</li>
            <li>4% withdrawal rule is a guideline, not guaranteed</li>
            <li>Does not account for inflation or tax on withdrawals</li>
            <li>Consult a financial advisor for personalized planning</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
