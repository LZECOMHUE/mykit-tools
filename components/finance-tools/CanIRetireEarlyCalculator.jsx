'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CanIRetireEarlyCalculator() {
  const [currentAge, setCurrentAge] = useState('45');
  const [targetRetirementAge, setTargetRetirementAge] = useState('55');
  const [currentPot, setCurrentPot] = useState('150000');
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [growthRate, setGrowthRate] = useState('6');
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState('30000');
  const [result, setResult] = useState(null);

  const GROWTH_OPTIONS = [
    { value: '4', label: 'Conservative (4%)' },
    { value: '6', label: 'Moderate (6%)' },
    { value: '8', label: 'Optimistic (8%)' },
  ];

  function calculate() {
    const age = parseInt(currentAge) || 45;
    const target = parseInt(targetRetirementAge) || 55;
    const pot = parseFloat(currentPot) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(growthRate) || 6;
    const desired = parseFloat(desiredAnnualIncome) || 30000;

    const yearsToTarget = target - age;
    const monthsToTarget = yearsToTarget * 12;

    // Project pot at target retirement age
    let projectedPot = pot;
    for (let i = 0; i < monthsToTarget; i++) {
      projectedPot += monthly;
      projectedPot *= (1 + rate / 100 / 12);
    }

    // Sustainable income at 4% rule
    const sustainableIncome = (projectedPot * 0.04);
    const gap = desired - sustainableIncome;
    const canRetire = sustainableIncome >= desired;

    // Calculate what's needed to bridge gap
    let neededPot = desired / 0.04;
    let additionalMonthly = 0;

    if (gap > 0) {
      // How much more would we need to contribute?
      // Using approximation: need extra contribution to grow to gap amount
      const potNeeded = gap / 0.04;
      const additionalNeeded = potNeeded - projectedPot;

      // Rough calculation: spread over remaining months
      if (additionalNeeded > 0) {
        let testPot = pot;
        for (let m = 0.1; m <= 5000; m += 10) {
          let test = pot;
          for (let i = 0; i < monthsToTarget; i++) {
            test += monthly + m;
            test *= (1 + rate / 100 / 12);
          }
          if (test >= potNeeded) {
            additionalMonthly = m;
            break;
          }
        }
      }
    }

    // Scenario: can you retire at different ages?
    const retirementAges = [55, 60, 65];
    const ageScenarios = retirementAges.map((retireAge) => {
      if (retireAge < age) return null;
      const y = retireAge - age;
      const m = y * 12;
      let p = pot;
      for (let i = 0; i < m; i++) {
        p += monthly;
        p *= (1 + rate / 100 / 12);
      }
      return {
        age: retireAge,
        pot: p,
        income: p * 0.04,
        canAfford: p * 0.04 >= desired,
      };
    }).filter(Boolean);

    setResult({
      yearsToTarget,
      projectedPot: projectedPot.toFixed(2),
      sustainableIncome: sustainableIncome.toFixed(2),
      desiredIncome: desired.toFixed(2),
      gap: gap.toFixed(2),
      canRetire,
      additionalMonthly: additionalMonthly.toFixed(2),
      neededForGap: Math.max(0, gap).toFixed(2),
      targetAge: target,
      ageScenarios,
      potAt85: (projectedPot * Math.pow(1 + rate / 100, 85 - target)).toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Can I Retire Early? Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Current Age
            </label>
            <Input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="45"
              min="18"
              max="70"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Target Retirement Age
            </label>
            <Input
              type="number"
              value={targetRetirementAge}
              onChange={(e) => setTargetRetirementAge(e.target.value)}
              placeholder="55"
              min="18"
              max="75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Current Pension Pot (£)
            </label>
            <Input
              type="number"
              value={currentPot}
              onChange={(e) => setCurrentPot(e.target.value)}
              placeholder="150000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Monthly Contribution (£)
            </label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="1000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Expected Growth Rate
            </label>
            <Select
              options={GROWTH_OPTIONS}
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Desired Annual Retirement Income (£)
            </label>
            <Input
              type="number"
              value={desiredAnnualIncome}
              onChange={(e) => setDesiredAnnualIncome(e.target.value)}
              placeholder="30000"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              After tax, this is what you need to live on per year
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Check Early Retirement Plan
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Main Result */}
          <Card className={`p-6 border-2 ${result.canRetire ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}`}>
            <h3 className={`font-heading text-xl font-bold mb-6 ${result.canRetire ? 'text-green-700' : 'text-yellow-700'}`}>
              {result.canRetire ? 'Yes, You Can Retire!' : 'Not Quite Yet'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Projected Pot at Age {result.targetAge}</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.projectedPot}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Sustainable Annual Income (4% rule)</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.sustainableIncome}
                </p>
              </div>
            </div>

            {!result.canRetire && (
              <div className="p-4 bg-white rounded-lg border border-yellow-300">
                <p className="text-secondary text-sm mb-2">Income Shortfall</p>
                <p className="font-mono text-lg font-bold text-error">
                  £{result.gap}/year
                </p>
                <p className="text-xs text-secondary mt-2">
                  You need £{result.desiredIncome}/year but your pot would only generate £{result.sustainableIncome}
                </p>
              </div>
            )}

            {result.gap > 0 && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">To Bridge the Gap, Contribute Extra:</p>
                <p className="font-mono text-lg font-bold text-accent">
                  £{result.additionalMonthly}/month
                </p>
                <p className="text-xs text-secondary mt-2">
                  Total contribution would be £{(parseFloat(monthlyContribution) + parseFloat(result.additionalMonthly)).toFixed(2)}/month
                </p>
              </div>
            )}
          </Card>

          {/* Projected Pot at Different Ages */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              What If You Retire at Different Ages?
            </h3>

            <div className="space-y-3">
              {result.ageScenarios.map((scenario) => (
                <div key={scenario.age} className={`p-4 rounded-lg border ${scenario.canAfford ? 'bg-green-50 border-green-300' : 'bg-white border-border'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`font-bold ${scenario.canAfford ? 'text-green-700' : 'text-primary'}`}>
                        Age {scenario.age}
                      </p>
                      <p className="text-xs text-secondary">
                        {scenario.age - parseInt(currentAge)} years from now
                      </p>
                    </div>
                    {scenario.canAfford && <span className="text-green-700 font-bold">✓ Feasible</span>}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary">Projected pot:</span>
                      <span className="font-mono font-bold">£{scenario.pot.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Annual income:</span>
                      <span className="font-mono font-bold">£{scenario.income.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-opacity-30 border-current">
                      <span className="text-secondary">vs desired:</span>
                      <span className={`font-mono font-bold ${scenario.canAfford ? 'text-green-700' : 'text-error'}`}>
                        {scenario.canAfford ? '+' : '-'}£{Math.abs(scenario.income - parseFloat(desiredAnnualIncome)).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Longevity Check */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Will Your Money Last?
            </h3>

            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-secondary text-sm mb-2">Projected Pot at Age 85</p>
              <p className="font-mono text-2xl font-bold text-primary">
                £{result.potAt85}
              </p>
              <p className="text-xs text-secondary mt-3">
                If you retire at {result.targetAge} and live to 85, your pot would have grown (or shrunk) to this amount, assuming you withdraw 4% annually and remain invested at {growthRate}%.
              </p>
            </div>
          </Card>

          {/* Considerations */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Considerations
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>Pension access: You cannot access most pensions until age 55 (rising to 57 in 2028)</li>
              <li>State pension: You won't receive state pension until 66-68 depending on birth year</li>
              <li>Healthcare costs: Budget for increased healthcare needs in retirement</li>
              <li>Inflation: Your desired income should increase with inflation</li>
              <li>Investment risk: The 4% rule assumes reasonable market conditions</li>
              <li>Longevity: If you live past 90, your pot needs to last even longer</li>
              <li>Life changes: Marriage, children, or health issues can affect plans</li>
              <li>Tax: Withdrawals above your personal allowance are taxable</li>
              <li>Other income: State pension, buy-to-let, or other income can supplement</li>
            </ul>
          </Card>

          {/* Action Plan */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Paths Forward
            </h3>

            <div className="space-y-3 text-sm text-secondary">
              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Increase contributions</p>
                <p>Boost your monthly savings to reach your goal sooner</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Adjust retirement age</p>
                <p>Working a few extra years significantly increases your pot due to compound growth</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Reduce target income</p>
                <p>Plan for a more modest retirement lifestyle initially, with flexibility to increase spending later</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Supplementary income</p>
                <p>Plan for part-time work, rental income, or other revenue sources in early retirement</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
