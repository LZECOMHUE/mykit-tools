'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CanadaTFSACalculator() {
  const [startYear, setStartYear] = useState(2015);
  const [currentBalance, setCurrentBalance] = useState(30000);
  const [annualContribution, setAnnualContribution] = useState(6000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(5);

  // TFSA contribution limits by year
  const tfasaLimitsByYear = {
    2009: 5000,
    2010: 5000,
    2011: 5000,
    2012: 5000,
    2013: 5500,
    2014: 5500,
    2015: 10000,
    2016: 5500,
    2017: 5500,
    2018: 5500,
    2019: 6000,
    2020: 6000,
    2021: 6000,
    2022: 6000,
    2023: 6500,
    2024: 7000,
    2025: 7000,
  };

  const currentYear = new Date().getFullYear();

  // Calculate cumulative contribution room
  const cumulativeContributionLimit = useMemo(() => {
    let total = 0;
    for (let year = startYear; year <= 2025; year++) {
      total += tfasaLimitsByYear[year] || 6000;
    }
    return total;
  }, [startYear]);

  const contributionRoomRemaining = cumulativeContributionLimit - currentBalance;

  // Project TFSA growth
  const projectionWithTFSA = useMemo(() => {
    let balance = currentBalance;
    const annualReturn = expectedReturnRate / 100;

    for (let year = 2025; year <= 2025 + 30; year++) {
      balance = balance * (1 + annualReturn);
      balance += Math.min(annualContribution, tfasaLimitsByYear[year] || 7000);
    }

    return Math.round(balance);
  }, [currentBalance, annualContribution, expectedReturnRate]);

  // Project taxable account (same contributions but taxed)
  const projectionTaxableAccount = useMemo(() => {
    let balance = currentBalance;
    const annualReturn = expectedReturnRate / 100;
    const afterTaxReturn = annualReturn * 0.7; // Assuming 30% marginal rate on gains

    for (let year = 2025; year <= 2025 + 30; year++) {
      balance = balance * (1 + afterTaxReturn);
      balance += annualContribution;
    }

    return Math.round(balance);
  }, [currentBalance, annualContribution, expectedReturnRate]);

  const taxAdvantage = projectionWithTFSA - projectionTaxableAccount;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          TFSA Details
        </h2>
        <div className="space-y-4">
          <Select
            label="Year You Started Contributing"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            options={[
              { value: 2009, label: '2009 (eligible since inception)' },
              { value: 2010, label: '2010' },
              { value: 2011, label: '2011' },
              { value: 2012, label: '2012' },
              { value: 2013, label: '2013' },
              { value: 2014, label: '2014' },
              { value: 2015, label: '2015' },
              { value: 2016, label: '2016' },
              { value: 2017, label: '2017' },
              { value: 2018, label: '2018' },
              { value: 2019, label: '2019' },
              { value: 2020, label: '2020' },
              { value: 2021, label: '2021' },
              { value: 2022, label: '2022' },
              { value: 2023, label: '2023' },
              { value: 2024, label: '2024' },
              { value: 2025, label: '2025' },
            ]}
          />
          <Input
            type="number"
            label="Current TFSA Balance ($ CAD)"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            placeholder="30000"
          />
          <Input
            type="number"
            label="Planned Annual Contribution ($ CAD)"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(Number(e.target.value))}
            placeholder="6000"
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
          Contribution Room
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Cumulative Limit Since {startYear}</span>
            <span className="font-mono font-bold text-primary">
              ${cumulativeContributionLimit.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Current Balance</span>
            <span className="font-mono font-semibold text-primary">
              ${currentBalance.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Remaining Contribution Room</span>
            <span className="font-mono font-bold text-lg text-accent">
              ${Math.max(0, contributionRoomRemaining).toLocaleString()}
            </span>
          </div>
          {startYear === 2009 && (
            <p className="text-xs text-secondary pt-2">
              Total cumulative limit if eligible since 2009: $102,000
            </p>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          30-Year Growth Projection
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">TFSA (Tax-Free Growth)</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${projectionWithTFSA.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Taxable Account (Tax Impact)</span>
            <span className="font-mono font-semibold text-primary">
              ${projectionTaxableAccount.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Tax Savings</span>
            <span className="font-mono font-bold text-lg text-accent">
              ${taxAdvantage.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-secondary pt-2">
            By using a TFSA instead of a taxable account, you could save ${taxAdvantage.toLocaleString()} in taxes over 30 years (assuming {expectedReturnRate}% annual return).
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          TFSA Key Features
        </h2>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Contributions are NOT tax-deductible</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>All growth and withdrawals are tax-free</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Unused contribution room carries forward</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Withdrawals replenish your room in January of next year</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Flexible: withdraw anytime, penalty-free</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">-</span>
            <span>Income from TFSA does not count toward income-tested benefits</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator provides estimates and does not account for inflation, market volatility, changes to contribution limits, or tax rate changes. TFSA rules are complex; verify your actual contribution room on the CRA website before contributing. For personalized financial advice, consult a certified financial advisor.
        </p>
      </Card>
    </div>
  );
}
