'use client';

import { useState, useMemo } from 'react';

export default function USHealthInsuranceEstimator() {
  const [householdSize, setHouseholdSize] = useState(1);
  const [annualIncome, setAnnualIncome] = useState(40000);
  const [state, setState] = useState('CA');
  const [primaryAge, setPrimaryAge] = useState(35);

  const results = useMemo(() => {
    // ACA subsidy thresholds and calculation (simplified)
    const federalPovertyLine = 15000; // Single person 2025
    const householdPovertyMultiplier = {
      1: 15000,
      2: 20520,
      3: 25860,
      4: 31200,
      5: 36540,
    };

    const povertyLineForSize = householdPovertyMultiplier[householdSize] || 31200 + (householdSize - 4) * 5340;
    const incomeLimitForSubsidy = povertyLineForSize * 4; // Up to 400% of FPL

    // Base premium estimate (varies by age, state, plan)
    let basePremium = 150; // Bronze plan, single adult

    // Age adjustment
    const ageAdjustment = 1 + (Math.max(0, primaryAge - 21) / 21) * 3; // 3:1 age rating
    basePremium *= ageAdjustment;

    // Household size adjustment
    basePremium *= (1 + householdSize * 0.4);

    // State adjustment
    const stateMultipliers = {
      CA: 0.95, TX: 0.9, FL: 0.92, NY: 1.15, WA: 1.0,
    };
    const stateMultiplier = stateMultipliers[state] || 1.0;
    basePremium *= stateMultiplier;

    // Income-based subsidy
    let subsidyPercent = 0;
    if (annualIncome > 0 && annualIncome <= incomeLimitForSubsidy) {
      const incomePercent = (annualIncome / povertyLineForSize) * 100;
      if (incomePercent <= 150) {
        subsidyPercent = 0; // Full coverage under Medicaid in expansion states
      } else if (incomePercent <= 200) {
        subsidyPercent = 0.03;
      } else if (incomePercent <= 250) {
        subsidyPercent = 0.04;
      } else if (incomePercent <= 300) {
        subsidyPercent = 0.06;
      } else {
        subsidyPercent = 0.08;
      }
    }

    const subsidyAmount = basePremium * subsidyPercent * 12;
    const monthlyPremium = basePremium - subsidyAmount / 12;

    let planRecommendation = 'Silver';
    if (annualIncome < povertyLineForSize * 1.5) {
      planRecommendation = 'Gold or Medicaid';
    } else if (annualIncome < povertyLineForSize * 2.5) {
      planRecommendation = 'Silver (with subsidy)';
    } else if (annualIncome < povertyLineForSize * 3.5) {
      planRecommendation = 'Silver or Bronze';
    } else {
      planRecommendation = 'Bronze (lowest premium)';
    }

    // Deductible estimates by plan
    const deductibles = {
      Bronze: 7050,
      Silver: 4200,
      Gold: 1500,
      Platinum: 400,
    };

    return {
      monthlyPremium: Math.round(monthlyPremium),
      annualPremium: Math.round(monthlyPremium * 12),
      subsidyPerMonth: Math.round(subsidyAmount / 12),
      subsidyPerYear: Math.round(subsidyAmount),
      totalPremiumBeforeSubsidy: Math.round(basePremium),
      planRecommendation,
      estimatedDeductible: deductibles.Silver,
      eligibleForSubsidy: annualIncome <= incomeLimitForSubsidy,
      incomeLimitForSubsidy: Math.round(incomeLimitForSubsidy),
      medicalNeedsPercentOfPremium: 80, // Silver plan typical value
    };
  }, [householdSize, annualIncome, state, primaryAge]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Household Information</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Household Size
            </label>
            <select
              value={householdSize}
              onChange={(e) => setHouseholdSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Annual Household Income
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="40000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Primary Applicant Age
            </label>
            <input
              type="number"
              value={primaryAge}
              onChange={(e) => setPrimaryAge(Math.max(18, Math.min(99, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              min="18"
              max="99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="WA">Washington</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Insurance Estimate</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Monthly Premium (Silver Plan):</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.monthlyPremium.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Full Premium Before Subsidy:</span>
                <span className="font-mono text-text-muted">
                  ${results.totalPremiumBeforeSubsidy.toLocaleString()}
                </span>
              </div>

              {results.eligibleForSubsidy && results.subsidyPerMonth > 0 && (
                <>
                  <div className="flex justify-between text-success">
                    <span className="text-text-secondary">Monthly Subsidy:</span>
                    <span className="font-mono font-semibold">
                      - ${results.subsidyPerMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Annual Subsidy:</span>
                    <span className="font-mono font-semibold">
                      ${results.subsidyPerYear.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Estimated Deductible:</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.estimatedDeductible.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Recommended Plan Tier:</span>
                <span className="font-semibold text-accent">
                  {results.planRecommendation}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <p className="text-sm text-text-secondary mb-2">Annual Cost Estimate:</p>
              <p className="font-mono text-lg font-bold text-accent">
                ${results.annualPremium.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Subsidy Eligibility:</p>
          <p className="text-text-secondary">
            {results.eligibleForSubsidy
              ? `Your income qualifies for subsidies. Income limit for your household: $${results.incomeLimitForSubsidy.toLocaleString()}`
              : 'Your income exceeds the subsidy limit. You pay full price but can shop for competitive rates.'}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Open Enrollment:</p>
          <p className="text-text-secondary">
            Annual Open Enrollment typically runs Nov 1 - Dec 15. Qualifying life events (marriage,
            birth, job loss) may allow enrollment outside this window.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This is a rough estimate. Actual premiums vary by metal level, specific plan, and state
          marketplace. Subsidies depend on verified income and family size. Visit healthcare.gov
          for official quotes.
        </p>
      </div>
    </div>
  );
}
