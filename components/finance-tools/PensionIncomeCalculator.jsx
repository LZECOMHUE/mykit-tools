'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PensionIncomeCalculator() {
  const [pensionPot, setPensionPot] = useState('200000');
  const [retirementAge, setRetirementAge] = useState('65');
  const [lifeExpectancy, setLifeExpectancy] = useState('90');
  const [strategy, setStrategy] = useState('drawdown');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [result, setResult] = useState(null);

  const STRATEGIES = [
    { value: 'drawdown', label: 'Drawdown (withdraw percentage annually)' },
    { value: 'annuity', label: 'Annuity (fixed income for life)' },
  ];

  // Typical annuity rates by age (approximate 2026/27 rates)
  const ANNUITY_RATES = {
    55: 3.8,
    60: 4.5,
    65: 5.3,
    70: 6.8,
    75: 8.5,
  };

  function getAnnuityRate(age) {
    const ages = Object.keys(ANNUITY_RATES).map(Number).sort((a, b) => a - b);

    for (let i = 0; i < ages.length; i++) {
      if (age <= ages[i]) {
        if (i === 0) return ANNUITY_RATES[ages[i]];
        // Interpolate
        const age1 = ages[i - 1];
        const age2 = ages[i];
        const rate1 = ANNUITY_RATES[age1];
        const rate2 = ANNUITY_RATES[age2];
        const ratio = (age - age1) / (age2 - age1);
        return rate1 + (rate2 - rate1) * ratio;
      }
    }
    return ANNUITY_RATES[75];
  }

  function calculate() {
    const pot = parseFloat(pensionPot) || 0;
    const age = parseInt(retirementAge) || 65;
    const lifeExp = parseInt(lifeExpectancy) || 90;
    const years = lifeExp - age;

    let monthlyIncome, annualIncome, details;

    if (strategy === 'annuity') {
      const rate = getAnnuityRate(age);
      annualIncome = (pot * rate) / 100;
      monthlyIncome = annualIncome / 12;

      details = {
        annuityRate: rate.toFixed(2),
        annualIncome: annualIncome.toFixed(2),
        monthlyIncome: monthlyIncome.toFixed(2),
        totalRetirement: (annualIncome * years).toFixed(2),
        guaranteedFor: 'lifetime',
        potDepletion: 'never',
      };
    } else {
      // Drawdown strategy
      const withdrawalRatePercent = parseFloat(withdrawalRate) || 4;
      annualIncome = (pot * withdrawalRatePercent) / 100;
      monthlyIncome = annualIncome / 12;

      // Simulate pot depletion
      let remainingPot = pot;
      let depletionYear = null;
      const growthRate = 0.05; // assume 5% growth

      for (let y = 0; y <= years; y++) {
        remainingPot = remainingPot * (1 + growthRate) - annualIncome;
        if (remainingPot <= 0 && !depletionYear) {
          depletionYear = y + age;
        }
      }

      details = {
        withdrawalRate: withdrawalRatePercent,
        annualIncome: annualIncome.toFixed(2),
        monthlyIncome: monthlyIncome.toFixed(2),
        totalRetirement: (annualIncome * years).toFixed(2),
        remainingPot: Math.max(0, remainingPot).toFixed(2),
        potDepletion: depletionYear ? `Age ${depletionYear}` : 'Survives to age ' + lifeExp,
        growthAssumption: '5% per annum',
      };
    }

    setResult({
      pot: pot.toFixed(2),
      age,
      lifeExp,
      years,
      strategy,
      ...details,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Pension Pot (£)
            </label>
            <Input
              type="number"
              value={pensionPot}
              onChange={(e) => setPensionPot(e.target.value)}
              placeholder="200000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Retirement Age
            </label>
            <Input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="65"
              min="55"
              max="75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Life Expectancy Age
            </label>
            <Input
              type="number"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(e.target.value)}
              placeholder="90"
              min="65"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Income Strategy
            </label>
            <Select
              options={STRATEGIES}
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            />
          </div>

          {strategy === 'drawdown' && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Withdrawal Rate (%)
              </label>
              <Input
                type="number"
                value={withdrawalRate}
                onChange={(e) => setWithdrawalRate(e.target.value)}
                placeholder="4"
                min="0.1"
                step="0.1"
              />
              <p className="text-xs text-secondary mt-1">
                The 4% rule suggests withdrawing 4% in year 1, then adjusting for inflation. 3-4% is considered sustainable.
              </p>
            </div>
          )}

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Income
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Income Summary */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Income Projection ({result.strategy === 'annuity' ? 'Annuity' : 'Drawdown'})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Monthly Income</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.monthlyIncome}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Annual Income</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.annualIncome}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">
                  Total Over {result.years} Years
                </p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.totalRetirement}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p>
                From age {result.age} to {result.lifeExp} ({result.years} years)
              </p>
            </div>
          </Card>

          {/* Strategy Details */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              {result.strategy === 'annuity' ? 'Annuity Details' : 'Drawdown Details'}
            </h3>

            {result.strategy === 'annuity' ? (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Annuity Rate at Age {result.age}</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    {result.annuityRate}% per annum
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Guaranteed Income</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    Lifetime
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    Your income is fixed and guaranteed, regardless of how long you live
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Pension Pot After Purchase</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    £0
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    Your capital is converted to income. You don't leave a pension pot to heirs.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Annual Withdrawal Rate</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    {result.withdrawalRate}%
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Pot Depletion</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    {result.potDepletion}
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    Based on {result.growthAssumption} investment growth
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-1">Remaining Pot at Age {result.lifeExp}</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    £{result.remainingPot}
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    Can be left to heirs or used for care costs
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Comparison */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Annuity vs Drawdown Comparison
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Factor</th>
                    <th className="text-left py-2 px-2 font-medium text-primary">Annuity</th>
                    <th className="text-left py-2 px-2 font-medium text-primary">Drawdown</th>
                  </tr>
                </thead>
                <tbody className="text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-2">Income</td>
                    <td className="py-2 px-2">Fixed and guaranteed</td>
                    <td className="py-2 px-2">Variable based on performance</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-2">Inheritance</td>
                    <td className="py-2 px-2">Limited options</td>
                    <td className="py-2 px-2">Pass remaining pot to heirs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-2">Flexibility</td>
                    <td className="py-2 px-2">None (locked in)</td>
                    <td className="py-2 px-2">Full control of withdrawals</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-2">Inflation Protection</td>
                    <td className="py-2 px-2">Optional (costs more)</td>
                    <td className="py-2 px-2">Up to you</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Longevity Risk</td>
                    <td className="py-2 px-2">None (provider's risk)</td>
                    <td className="py-2 px-2">Risk if you live longer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Notes */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Notes
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>These are estimates based on assumed growth rates and life expectancy</li>
              <li>Actual investment returns will vary year to year</li>
              <li>The 4% withdrawal rule is not guaranteed to work in all scenarios</li>
              <li>You may be able to take 25% of your pension pot as tax-free cash</li>
              <li>Income from drawdown is subject to income tax</li>
              <li>Annuity rates change based on interest rates and life expectancy tables</li>
              <li>Consider your health, family history, and financial needs when deciding</li>
              <li>Seek financial advice before making final decisions</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
