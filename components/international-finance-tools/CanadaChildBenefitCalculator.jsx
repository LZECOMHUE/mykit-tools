'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function CanadaChildBenefitCalculator() {
  const [childrenUnder6, setChildrenUnder6] = useState(1);
  const [children6To17, setChildren6To17] = useState(1);
  const [familyNetIncome, setFamilyNetIncome] = useState(50000);

  // 2024-25 CCB rates
  const RATE_UNDER_6 = 7787;
  const RATE_6_TO_17 = 6570;
  const CLAWBACK_THRESHOLD = 36502;

  // Calculate clawback percentage based on number of children
  const getClawbackRate = () => {
    const totalChildren = childrenUnder6 + children6To17;
    if (totalChildren === 0) return 0;
    if (totalChildren === 1) return 0.07; // 7%
    if (totalChildren === 2) return 0.135; // 13.5%
    if (totalChildren === 3) return 0.1915; // 19.15%
    return 0.2006; // 20.06% for 4+
  };

  const clawbackRate = getClawbackRate();

  // Calculate total base benefit
  const baseUnder6 = childrenUnder6 * RATE_UNDER_6;
  const base6To17 = children6To17 * RATE_6_TO_17;
  const totalBaseBenefit = baseUnder6 + base6To17;

  // Calculate clawback
  const incomeOverThreshold = Math.max(0, familyNetIncome - CLAWBACK_THRESHOLD);
  const clawbackAmount = Math.round(incomeOverThreshold * clawbackRate * 100) / 100;

  // Calculate net benefit
  const netAnnualBenefit = Math.max(0, totalBaseBenefit - clawbackAmount);
  const monthlyBenefit = Math.round((netAnnualBenefit / 12) * 100) / 100;

  // Find income threshold for zero benefit
  let zeroThreshold = 0;
  if (clawbackRate > 0) {
    zeroThreshold = CLAWBACK_THRESHOLD + totalBaseBenefit / clawbackRate;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Family Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Number of Children Under 6
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChildrenUnder6(Math.max(0, childrenUnder6 - 1))}
                className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-primary font-semibold"
              >
                -
              </button>
              <span className="font-mono text-3xl font-bold text-primary w-16 text-center">
                {childrenUnder6}
              </span>
              <button
                onClick={() => setChildrenUnder6(childrenUnder6 + 1)}
                className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-primary font-semibold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Number of Children Ages 6-17
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChildren6To17(Math.max(0, children6To17 - 1))}
                className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-primary font-semibold"
              >
                -
              </button>
              <span className="font-mono text-3xl font-bold text-primary w-16 text-center">
                {children6To17}
              </span>
              <button
                onClick={() => setChildren6To17(children6To17 + 1)}
                className="px-3 py-2 bg-surface border border-border rounded hover:bg-surface-hover text-primary font-semibold"
              >
                +
              </button>
            </div>
          </div>

          <Input
            type="number"
            label="Family Net Income ($ CAD)"
            value={familyNetIncome}
            onChange={(e) => setFamilyNetIncome(Number(e.target.value))}
            placeholder="50000"
          />
          <p className="text-xs text-muted">
            Use your total family net income from your most recent tax return (Line 23600 for parents, combined if married).
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Base Benefit (before clawback)
        </h2>
        <div className="space-y-3">
          {childrenUnder6 > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-secondary">
                {childrenUnder6} Child{childrenUnder6 !== 1 ? 'ren' : ''} Under 6 @ ${RATE_UNDER_6.toLocaleString()}/year
              </span>
              <span className="font-mono font-semibold text-primary">
                ${baseUnder6.toLocaleString()}
              </span>
            </div>
          )}
          {children6To17 > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-secondary">
                {children6To17} Child{children6To17 !== 1 ? 'ren' : ''} Ages 6-17 @ ${RATE_6_TO_17.toLocaleString()}/year
              </span>
              <span className="font-mono font-semibold text-primary">
                ${base6To17.toLocaleString()}
              </span>
            </div>
          )}
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Total Base Benefit</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${totalBaseBenefit.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-orange-50 border border-orange-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Clawback Calculation
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Family Net Income</span>
            <span className="font-mono font-semibold text-primary">
              ${familyNetIncome.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Clawback Threshold</span>
            <span className="font-mono font-semibold text-primary">
              ${CLAWBACK_THRESHOLD.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Income Over Threshold</span>
            <span className="font-mono font-semibold text-primary">
              ${incomeOverThreshold.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Clawback Rate</span>
            <span className="font-mono font-semibold text-primary">
              {(clawbackRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="border-t border-orange-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Annual Clawback Amount</span>
            <span className="font-mono font-bold text-primary">
              -${clawbackAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Your CCB Payment
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Annual Payment</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${netAnnualBenefit.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Monthly Payment</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${monthlyBenefit.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-secondary pt-2">
            CCB is paid monthly, usually deposited on the 20th of each month.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          CCB Information
        </h2>
        <div className="space-y-4 text-sm text-secondary">
          <div>
            <p className="font-semibold text-primary mb-1">What is the CCB?</p>
            <p>
              The Canada Child Benefit (CCB) is a monthly payment from the Government of Canada to eligible families with dependent children under age 18. It replaced several other benefits in 2015.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">2024-25 Payment Amounts</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Children under 6: max ${RATE_UNDER_6.toLocaleString()}/year</li>
              <li>Children 6-17: max ${RATE_6_TO_17.toLocaleString()}/year</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">Eligibility</p>
            <p>
              Must be a Canadian resident, responsible for the child's care, and the child must be under 18. Benefit is based on combined family net income.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">Clawback</p>
            <p>
              Benefit reduces on a sliding scale once family income exceeds $36,502. Higher clawback rates apply for larger families. Benefit phases out completely at higher income levels.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">How to Apply</p>
            <p>
              File your tax return with the CRA each year. If you have a new baby, contact Service Canada to register.
            </p>
          </div>
        </div>
      </Card>

      {zeroThreshold > 0 && (
        <Card className="p-6 bg-gray-50 border border-border">
          <p className="text-sm text-secondary">
            <strong>Zero Benefit Threshold:</strong> At a family net income of approximately ${zeroThreshold.toLocaleString('en-CA', { maximumFractionDigits: 0 })}, your CCB benefit would be reduced to zero due to clawback.
          </p>
        </Card>
      )}

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation based on 2024-25 CCB rates and is not official. Actual payments depend on your confirmed net income on your tax return and vary by province. For precise calculations and to apply, visit the Government of Canada website or contact Service Canada. The CRA updates rates annually in July.
        </p>
      </Card>
    </div>
  );
}
