'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function CanadaRRSPCalculator() {
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [annualContribution, setAnnualContribution] = useState(10000);
  const [marginalTaxRate, setMarginalTaxRate] = useState(30);
  const [yearsToRetirement, setYearsToRetirement] = useState(25);
  const [expectedReturnRate, setExpectedReturnRate] = useState(5);

  const RRSP_LIMIT_2025 = 32490;

  // Calculate with RRSP contributions
  const projectionWithRRSP = useMemo(() => {
    let balance = currentBalance;
    const annualReturn = expectedReturnRate / 100;
    let totalTaxRefunds = 0;

    for (let year = 0; year < yearsToRetirement; year++) {
      // Add growth from previous year
      balance = balance * (1 + annualReturn);

      // Add annual contribution (capped at limit)
      const contribution = Math.min(annualContribution, RRSP_LIMIT_2025);
      balance += contribution;

      // Calculate tax refund (not added to RRSP, just tracked)
      const refund = contribution * (marginalTaxRate / 100);
      totalTaxRefunds += refund;
    }

    return {
      finalBalance: Math.round(balance),
      totalContributed: Math.round((currentBalance + annualContribution * yearsToRetirement)),
      totalGrowth: Math.round(balance - currentBalance - annualContribution * yearsToRetirement),
      totalTaxRefunds: Math.round(totalTaxRefunds),
    };
  }, [currentBalance, annualContribution, marginalTaxRate, yearsToRetirement, expectedReturnRate]);

  // Calculate without RRSP (taxable investment)
  const projectionWithoutRRSP = useMemo(() => {
    let balance = currentBalance;
    const annualReturn = expectedReturnRate / 100;
    const afterTaxReturn = annualReturn * (1 - marginalTaxRate / 100); // Taxed annually

    for (let year = 0; year < yearsToRetirement; year++) {
      balance = balance * (1 + afterTaxReturn);
      const afterTaxContribution = annualContribution * (1 - marginalTaxRate / 100);
      balance += afterTaxContribution;
    }

    return {
      finalBalance: Math.round(balance),
    };
  }, [currentBalance, annualContribution, marginalTaxRate, yearsToRetirement, expectedReturnRate]);

  const advantage = projectionWithRRSP.finalBalance - projectionWithoutRRSP.finalBalance;

  // Yearly breakdown for chart data
  const yearlyData = useMemo(() => {
    let balance = currentBalance;
    let balanceWithoutRRSP = currentBalance;
    const annualReturn = expectedReturnRate / 100;
    const afterTaxReturn = annualReturn * (1 - marginalTaxRate / 100);
    const data = [];

    for (let year = 0; year <= Math.min(yearsToRetirement, 30); year += Math.max(1, Math.floor(yearsToRetirement / 10))) {
      data.push({
        year,
        withRRSP: Math.round(balance),
        withoutRRSP: Math.round(balanceWithoutRRSP),
      });

      for (let i = 0; i < Math.max(1, Math.floor(yearsToRetirement / 10)); i++) {
        if (year + i < yearsToRetirement) {
          balance = balance * (1 + annualReturn) + Math.min(annualContribution, RRSP_LIMIT_2025);
          const afterTaxContribution = annualContribution * (1 - marginalTaxRate / 100);
          balanceWithoutRRSP = balanceWithoutRRSP * (1 + afterTaxReturn) + afterTaxContribution;
        }
      }
    }

    return data;
  }, [currentBalance, annualContribution, marginalTaxRate, yearsToRetirement, expectedReturnRate]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          RRSP Projection
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Current RRSP Balance ($ CAD)"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            placeholder="50000"
          />
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Annual Contribution ($ CAD)
            </label>
            <Input
              type="number"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              placeholder="10000"
            />
            <p className="text-xs text-muted mt-1">
              2025 limit: ${RRSP_LIMIT_2025.toLocaleString()} or 18% of previous year income (whichever is less)
            </p>
          </div>
          <Input
            type="number"
            label="Marginal Tax Rate (%)"
            value={marginalTaxRate}
            onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
            placeholder="30"
          />
          <Input
            type="number"
            label="Years to Retirement"
            value={yearsToRetirement}
            onChange={(e) => setYearsToRetirement(Number(e.target.value))}
            placeholder="25"
          />
          <Input
            type="number"
            label="Expected Annual Return (%)"
            value={expectedReturnRate}
            onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
            placeholder="5"
          />
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          RRSP Projection Results
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Projected RRSP Balance</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${projectionWithRRSP.finalBalance.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Total Contributions Made</span>
              <span className="font-mono font-semibold text-primary">
                ${projectionWithRRSP.totalContributed.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Investment Growth</span>
              <span className="font-mono font-semibold text-primary">
                ${projectionWithRRSP.totalGrowth.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Total Tax Refunds</span>
              <span className="font-mono font-semibold text-accent">
                ${projectionWithRRSP.totalTaxRefunds.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          RRSP vs Taxable Account
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">With RRSP</span>
            <span className="font-mono font-bold text-primary">
              ${projectionWithRRSP.finalBalance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Taxable Account (after-tax)</span>
            <span className="font-mono font-semibold text-primary">
              ${projectionWithoutRRSP.finalBalance.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">RRSP Advantage</span>
            <span className="font-mono font-bold text-lg text-accent">
              ${advantage.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-secondary pt-2">
            By contributing to an RRSP instead of a taxable investment account, you could accumulate an additional ${Math.abs(advantage).toLocaleString()} by retirement.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Projection Chart
        </h2>
        <div className="space-y-4">
          {yearlyData.length > 0 && (
            <div className="space-y-2">
              {yearlyData.map((row, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-secondary">Year {row.year}</span>
                    <span className="text-xs text-muted">
                      RRSP: ${row.withRRSP.toLocaleString()} | Taxable: ${row.withoutRRSP.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2 h-6">
                    <div
                      className="bg-blue-500 rounded"
                      style={{
                        width: `${(row.withRRSP / projectionWithRRSP.finalBalance) * 100}%`,
                      }}
                      title="RRSP"
                    />
                    <div
                      className="bg-green-500 rounded"
                      style={{
                        width: `${(row.withoutRRSP / projectionWithRRSP.finalBalance) * 100}%`,
                      }}
                      title="Taxable"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-4 text-xs pt-2 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span>With RRSP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Taxable Account</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator provides estimates based on your inputs and does not account for inflation, market volatility, withdrawal rates in retirement, or changes to tax rates. Tax refunds shown assume your marginal rate remains constant. For personalized retirement planning, consult a certified financial advisor or tax professional.
        </p>
      </Card>
    </div>
  );
}
