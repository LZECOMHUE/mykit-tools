'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function AustraliaHECSCalculator() {
  const [debtBalance, setDebtBalance] = useState(50000);
  const [annualIncome, setAnnualIncome] = useState(65000);
  const [indexationRate, setIndexationRate] = useState(3);

  const getRepaymentRate = (income) => {
    if (income >= 159663) return 0.1;
    if (income >= 157607) return 0.097;
    if (income >= 155584) return 0.094;
    if (income >= 153592) return 0.091;
    if (income >= 151632) return 0.088;
    if (income >= 149703) return 0.085;
    if (income >= 147805) return 0.082;
    if (income >= 145937) return 0.079;
    if (income >= 144099) return 0.076;
    if (income >= 142288) return 0.073;
    if (income >= 140506) return 0.07;
    if (income >= 138750) return 0.067;
    if (income >= 137020) return 0.064;
    if (income >= 135315) return 0.061;
    if (income >= 133635) return 0.058;
    if (income >= 131980) return 0.055;
    if (income >= 130348) return 0.052;
    if (income >= 128739) return 0.049;
    if (income >= 127153) return 0.046;
    if (income >= 125589) return 0.043;
    if (income >= 124046) return 0.04;
    if (income >= 122524) return 0.037;
    if (income >= 121022) return 0.034;
    if (income >= 119540) return 0.031;
    if (income >= 118077) return 0.028;
    if (income >= 116633) return 0.025;
    if (income >= 115206) return 0.024;
    if (income >= 113796) return 0.023;
    if (income >= 112403) return 0.022;
    if (income >= 111025) return 0.021;
    if (income >= 109663) return 0.02;
    if (income >= 108316) return 0.019;
    if (income >= 106983) return 0.018;
    if (income >= 105665) return 0.017;
    if (income >= 104361) return 0.016;
    if (income >= 103070) return 0.015;
    if (income >= 101793) return 0.014;
    if (income >= 100528) return 0.013;
    if (income >= 99276) return 0.012;
    if (income >= 98036) return 0.011;
    if (income >= 96808) return 0.01;
    if (income >= 95593) return 0.009;
    if (income >= 94389) return 0.008;
    if (income >= 93197) return 0.007;
    if (income >= 92016) return 0.006;
    if (income >= 90846) return 0.005;
    if (income >= 89688) return 0.035;
    if (income >= 88539) return 0.034;
    if (income >= 87401) return 0.033;
    if (income >= 86273) return 0.032;
    if (income >= 85156) return 0.031;
    if (income >= 84048) return 0.03;
    if (income >= 82950) return 0.029;
    if (income >= 81861) return 0.028;
    if (income >= 80782) return 0.027;
    if (income >= 79711) return 0.026;
    if (income >= 78649) return 0.025;
    if (income >= 77596) return 0.024;
    if (income >= 76551) return 0.023;
    if (income >= 75514) return 0.022;
    if (income >= 74485) return 0.021;
    if (income >= 73464) return 0.02;
    if (income >= 72451) return 0.019;
    if (income >= 71445) return 0.018;
    if (income >= 70447) return 0.017;
    if (income >= 69456) return 0.016;
    if (income >= 68472) return 0.015;
    if (income >= 67495) return 0.014;
    if (income >= 66525) return 0.013;
    if (income >= 65562) return 0.012;
    if (income >= 64651) return 0.025;
    if (income >= 60915) return 0.02;
    if (income >= 54435) return 0.01;
    return 0;
  };

  const calculateHECS = () => {
    const repaymentRate = getRepaymentRate(annualIncome);
    const annualRepayment = Math.round(annualIncome * repaymentRate);

    if (annualRepayment === 0) {
      return {
        annualRepayment: 0,
        repaymentRate: 0,
        monthlyRepayment: 0,
        yearsToPayoff: null,
        totalRepaid: debtBalance,
        belowThreshold: true,
      };
    }

    let remainingDebt = debtBalance;
    let totalRepaid = 0;
    let years = 0;

    while (remainingDebt > 0 && years < 100) {
      years++;
      const repayment = annualRepayment;
      const indexation = remainingDebt * (indexationRate / 100);

      remainingDebt += indexation;
      remainingDebt -= repayment;
      totalRepaid += repayment;
    }

    return {
      annualRepayment,
      repaymentRate: (repaymentRate * 100).toFixed(2),
      monthlyRepayment: Math.round(annualRepayment / 12),
      yearsToPayoff: years,
      totalRepaid: Math.round(totalRepaid),
      belowThreshold: false,
    };
  };

  const results = calculateHECS();

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          HECS-HELP Details
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Current HECS-HELP Debt (AUD)"
            value={debtBalance}
            onChange={(e) => setDebtBalance(Number(e.target.value))}
            placeholder="50000"
          />
          <Input
            type="number"
            label="Annual Income (AUD)"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            placeholder="65000"
          />
          <Input
            type="number"
            label="Annual Indexation Rate (%)"
            value={indexationRate}
            onChange={(e) => setIndexationRate(Number(e.target.value))}
            placeholder="3"
            step="0.1"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {results.belowThreshold ? (
          <Card className="bg-green-50 border border-green-200">
            <h2 className="font-heading text-lg font-bold text-success mb-4">
              No Repayment Required
            </h2>
            <p className="text-secondary">
              Your income of ${annualIncome.toLocaleString()} is below the repayment threshold of $54,435. You are not required to make HECS-HELP repayments at this income level.
            </p>
            <p className="text-xs text-muted mt-3">
              Your debt will be indexed annually by the indexation rate ({indexationRate}%) but no repayments are due until your income reaches the threshold.
            </p>
          </Card>
        ) : (
          <>
            <Card className="bg-blue-50 border border-blue-200">
              <h2 className="font-heading text-lg font-bold text-primary mb-4">
                Annual Repayment
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Annual Repayment</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.annualRepayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Monthly Repayment</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.monthlyRepayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Repayment Rate</span>
                  <span className="font-mono font-semibold text-primary">
                    {results.repaymentRate}%
                  </span>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50 border border-green-200">
              <h2 className="font-heading text-lg font-bold text-primary mb-4">
                Payoff Projection
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Current Debt</span>
                  <span className="font-mono font-semibold text-primary">
                    ${debtBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Estimated Years to Payoff</span>
                  <span className="font-mono font-semibold text-primary">
                    {results.yearsToPayoff} years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Total Amount Repaid</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.totalRepaid.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-green-300 pt-3 flex justify-between items-center">
                  <span className="text-secondary">Extra Paid Due to Indexation</span>
                  <span className="font-mono font-semibold text-primary">
                    ${(results.totalRepaid - debtBalance).toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary mb-2">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only. It assumes a static income and does not account for variable future earnings. HECS-HELP repayments are indexed annually to the Consumer Price Index (CPI). For authoritative information, check the ATO website.
        </p>
        <p className="text-sm text-secondary">
          <strong>Repayment Threshold:</strong> No repayment is required if your income is below $54,435 (2024-25).
        </p>
      </Card>
    </div>
  );
}
