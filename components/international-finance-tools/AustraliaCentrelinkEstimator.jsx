'use client';

import { useState, useMemo } from 'react';

// JobSeeker rates (2025) - fortnightly
const JOBSEEKER_SINGLE = 367.90;
const JOBSEEKER_COUPLE = 331.50;

// Youth Allowance rates (2025) - fortnightly
const YOUTH_ALLOWANCE_SINGLE = 328.00;
const YOUTH_ALLOWANCE_COUPLE = 289.50;

// Income test thresholds
const INCOME_FREE_THRESHOLD = 378; // Fortnightly
const INCOME_REDUCTION_RATE = 0.5; // 50 cents per dollar over threshold

// Asset test limits (generous)
const ASSET_LIMIT_SINGLE = 28670;
const ASSET_LIMIT_COUPLE = 40810;

export default function AustraliaCentrelinkEstimator() {
  const [income, setIncome] = useState(1000);
  const [assets, setAssets] = useState(50000);
  const [relationshipStatus, setRelationshipStatus] = useState('single');
  const [hasChildren, setHasChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [age, setAge] = useState(24);
  const [allowanceType, setAllowanceType] = useState('jobseeker');

  const results = useMemo(() => {
    const fortnightlyIncome = parseFloat(income) || 0;
    const assetsAmount = parseFloat(assets) || 0;
    const childCount = parseInt(numberOfChildren) || 0;
    const personAge = parseInt(age) || 24;

    // Determine base rate
    let baseRate = 0;
    let selectedAllowance = allowanceType;

    if (allowanceType === 'jobseeker') {
      baseRate =
        relationshipStatus === 'single' ? JOBSEEKER_SINGLE : JOBSEEKER_COUPLE;
    } else {
      baseRate =
        relationshipStatus === 'single'
          ? YOUTH_ALLOWANCE_SINGLE
          : YOUTH_ALLOWANCE_COUPLE;
    }

    // Income test - if income exceeds threshold, reduce payment
    const incomeTestThreshold = INCOME_FREE_THRESHOLD;
    const incomeOverThreshold = Math.max(0, fortnightlyIncome - incomeTestThreshold);
    const incomeReduction = incomeOverThreshold * INCOME_REDUCTION_RATE;
    const paymentAfterIncomeTest = Math.max(0, baseRate - incomeReduction);

    // Asset test - if assets exceed limit, may reduce or cancel payment
    const assetLimit =
      relationshipStatus === 'single' ? ASSET_LIMIT_SINGLE : ASSET_LIMIT_COUPLE;
    const isAssetTestFailed = assetsAmount > assetLimit;
    const excessAssets = Math.max(0, assetsAmount - assetLimit);

    // For simplicity, if asset test failed, payment reduced
    let paymentAfterAssetTest = paymentAfterIncomeTest;
    if (isAssetTestFailed) {
      // Asset test: for every $1,000 over limit, $1/fortnight reduction
      const assetTestReduction = excessAssets / 1000;
      paymentAfterAssetTest = Math.max(0, paymentAfterIncomeTest - assetTestReduction);
    }

    // Family Tax Benefits (if children)
    let ftbAPayment = 0;
    let ftbBPayment = 0;
    if (hasChildren && childCount > 0) {
      // FTB A: ~$7.80/week per child (simplified, no income test shown)
      ftbAPayment = (7.8 * childCount * 26) / 26; // Fortnightly
      // FTB B: ~$3.50/week for single parent or couple with one child
      if (relationshipStatus === 'single' || childCount === 1) {
        ftbBPayment = 3.5 * 2; // Fortnightly (2 weeks)
      }
    }

    const totalFortnightPayment =
      paymentAfterAssetTest + ftbAPayment + ftbBPayment;
    const annualPayment = totalFortnightPayment * 26;
    const weeklyPayment = totalFortnightPayment / 2;

    // Determine if eligible
    let eligibilityStatus = 'Likely eligible';
    if (isAssetTestFailed) {
      eligibilityStatus = 'May fail asset test';
    }
    if (paymentAfterIncomeTest === 0) {
      eligibilityStatus = 'Income exceeds limit - no payment';
    }
    if (paymentAfterAssetTest === 0 && isAssetTestFailed) {
      eligibilityStatus = 'Assets exceed limit - no payment';
    }

    return {
      baseRate: baseRate.toFixed(2),
      incomeOverThreshold: incomeOverThreshold.toFixed(2),
      incomeReduction: incomeReduction.toFixed(2),
      paymentAfterIncomeTest: paymentAfterIncomeTest.toFixed(2),
      isAssetTestFailed,
      assetLimit: assetLimit.toFixed(2),
      excessAssets: excessAssets.toFixed(2),
      paymentAfterAssetTest: paymentAfterAssetTest.toFixed(2),
      ftbAPayment: ftbAPayment.toFixed(2),
      ftbBPayment: ftbBPayment.toFixed(2),
      totalFortnightPayment: totalFortnightPayment.toFixed(2),
      weeklyPayment: weeklyPayment.toFixed(2),
      annualPayment: annualPayment.toFixed(2),
      eligibilityStatus,
    };
  }, [
    income,
    assets,
    relationshipStatus,
    hasChildren,
    numberOfChildren,
    age,
    allowanceType,
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Allowance Type
              </label>
              <select
                value={allowanceType}
                onChange={(e) => setAllowanceType(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <option value="jobseeker">JobSeeker</option>
                <option value="youth">Youth Allowance</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Relationship Status
              </label>
              <select
                value={relationshipStatus}
                onChange={(e) => setRelationshipStatus(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              >
                <option value="single">Single</option>
                <option value="couple">Couple</option>
                <option value="single-parent">Single parent</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Fortnightly Income (AUD)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter fortnightly income"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Total Liquid Assets (AUD)
            </label>
            <input
              type="number"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              placeholder="Enter total assets"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">
              Bank accounts, savings, shares, etc.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <label className="block text-text-primary font-medium mb-4">
              <input
                type="checkbox"
                checked={hasChildren}
                onChange={(e) => setHasChildren(e.target.checked)}
                className="mr-2"
              />
              Do you have dependent children?
            </label>

            {hasChildren && (
              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Number of Children
                </label>
                <input
                  type="number"
                  value={numberOfChildren}
                  onChange={(e) => setNumberOfChildren(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                />
              </div>
            )}
          </div>
        </div>

        {/* Eligibility Status */}
        <div className={`rounded-lg border ${
          results.eligibilityStatus.includes('eligible') && !results.eligibilityStatus.includes('fail')
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          <h2 className="text-text-primary font-semibold text-lg mb-2">
            Eligibility Status
          </h2>
          <p className="text-text-secondary">
            {results.eligibilityStatus}
          </p>
          <p className="text-text-muted text-sm mt-3">
            This is an estimate based on 2025 rates. Actual eligibility depends on many factors including citizenship, residency, and work history.
          </p>
        </div>

        {/* Income Test Breakdown */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Income Test</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Base Allowance:</span>
              <span className="font-mono font-semibold">
                ${results.baseRate}/fortnight
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Income-free threshold:</span>
              <span className="font-mono font-semibold">
                ${INCOME_FREE_THRESHOLD}/fortnight
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Your fortnightly income:</span>
              <span className="font-mono font-semibold">
                ${parseFloat(income).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Income over threshold:</span>
              <span className="font-mono font-semibold">
                ${results.incomeOverThreshold}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-red-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Reduction (50%):</span>
              <span className="font-mono font-semibold text-error">
                -${results.incomeReduction}
              </span>
            </div>
          </div>
        </div>

        {/* Asset Test Breakdown */}
        {parseFloat(assets) > 0 && (
          <div className={`rounded-lg border space-y-4 ${
            results.isAssetTestFailed ? 'bg-orange-50 border-orange-200' : 'bg-white border-border'
          }`}>
            <h2 className="text-text-primary font-semibold text-lg">Asset Test</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Asset limit:</span>
                <span className="font-mono font-semibold">
                  ${results.assetLimit}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary">Your total assets:</span>
                <span className="font-mono font-semibold">
                  ${parseFloat(assets).toFixed(0)}
                </span>
              </div>

              {results.isAssetTestFailed && (
                <div className="flex justify-between items-center pt-3 bg-red-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
                  <span className="text-text-primary font-semibold">
                    Assets over limit:
                  </span>
                  <span className="font-mono font-semibold text-error">
                    ${results.excessAssets}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-white rounded-lg border border-border space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Estimated Payment</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Allowance (after income test):</span>
              <span className="font-mono font-semibold">
                ${results.paymentAfterIncomeTest}
              </span>
            </div>

            {results.isAssetTestFailed && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Asset test reduction:</span>
                <span className="font-mono font-semibold text-error">
                  -${(parseFloat(results.paymentAfterIncomeTest) - parseFloat(results.paymentAfterAssetTest)).toFixed(2)}
                </span>
              </div>
            )}

            {parseFloat(results.ftbAPayment) > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Family Tax Benefit A:</span>
                <span className="font-mono font-semibold text-success">
                  +${results.ftbAPayment}
                </span>
              </div>
            )}

            {parseFloat(results.ftbBPayment) > 0 && (
              <div className="flex justify-between pb-3 border-b border-border">
                <span className="text-text-secondary">Family Tax Benefit B:</span>
                <span className="font-mono font-semibold text-success">
                  +${results.ftbBPayment}
                </span>
              </div>
            )}

            <div className="flex justify-between pt-3 bg-blue-50 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Fortnightly Payment:</span>
              <span className="font-mono text-xl font-semibold text-accent">
                ${results.totalFortnightPayment}
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-text-muted text-sm">
            <p>Weekly: <span className="font-mono">${results.weeklyPayment}</span></p>
            <p>Annual: <span className="font-mono">${results.annualPayment}</span></p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>This is an estimate based on 2025 rates</li>
            <li>Actual eligibility requires Australian residency and citizenship</li>
            <li>Work history and activity test requirements apply</li>
            <li>Personal and relationship income tests are simplified</li>
            <li>Asset test thresholds change each January 1</li>
            <li>Family Tax Benefit rates are approximations</li>
            <li>Check with Services Australia (humanservices.gov.au) for official estimates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
