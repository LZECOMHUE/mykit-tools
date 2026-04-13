'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';

export default function AustraliaSuperCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(67);
  const [currentBalance, setCurrentBalance] = useState(150000);
  const [salary, setSalary] = useState(65000);
  const [employerRate, setEmployerRate] = useState(11.5);
  const [voluntaryContribution, setVoluntaryContribution] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const calculateSuper = () => {
    let balance = currentBalance;
    const years = retirementAge - currentAge;
    let employerTotal = 0;
    let voluntaryTotal = 0;
    let growthTotal = 0;

    for (let i = 0; i < years; i++) {
      // Employer contribution at current salary (assume static for simplicity)
      const employerContribution = salary * (employerRate / 100);
      employerTotal += employerContribution;
      balance += employerContribution;

      // Voluntary contribution
      const voluntaryAmount = voluntaryContribution;
      voluntaryTotal += voluntaryAmount;
      balance += voluntaryAmount;

      // Growth on the balance
      const growth = balance * (expectedReturn / 100);
      growthTotal += growth;
      balance += growth;
    }

    // Calculate scenario without extra voluntary contributions
    let balanceNoVoluntary = currentBalance;
    for (let i = 0; i < years; i++) {
      const employerContribution = salary * (employerRate / 100);
      balanceNoVoluntary += employerContribution;
      const growth = balanceNoVoluntary * (expectedReturn / 100);
      balanceNoVoluntary += growth;
    }

    return {
      projectedBalance: Math.round(balance),
      employerContributions: Math.round(employerTotal),
      voluntaryContributions: Math.round(voluntaryTotal),
      investmentGrowth: Math.round(growthTotal),
      balanceWithoutExtra: Math.round(balanceNoVoluntary),
      extraBenefit: Math.round(balance - balanceNoVoluntary),
    };
  };

  const results = calculateSuper();
  const preservationAge = currentAge >= 1964 ? 60 : 60; // Simplified

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Personal Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Current Age: <span className="font-mono font-semibold text-primary">{currentAge}</span>
            </label>
            <Slider
              min={18}
              max={70}
              value={currentAge}
              onChange={setCurrentAge}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Retirement Age: <span className="font-mono font-semibold text-primary">{retirementAge}</span>
            </label>
            <Slider
              min={currentAge + 1}
              max={75}
              value={retirementAge}
              onChange={setRetirementAge}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Super Balance & Income
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Current Super Balance (AUD)"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(Number(e.target.value))}
            placeholder="150000"
          />
          <Input
            type="number"
            label="Current Annual Salary (AUD)"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            placeholder="65000"
          />
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Contributions
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Employer Contribution Rate: <span className="font-mono font-semibold text-primary">{employerRate}%</span>
            </label>
            <Slider
              min={9.5}
              max={12}
              value={employerRate}
              step={0.5}
              onChange={setEmployerRate}
            />
            <p className="text-xs text-muted mt-1">
              Superannuation Guarantee: 11.5% (2024-25)
            </p>
          </div>
          <Input
            type="number"
            label="Extra Voluntary Contribution Per Year (AUD)"
            value={voluntaryContribution}
            onChange={(e) => setVoluntaryContribution(Number(e.target.value))}
            placeholder="5000"
          />
          <p className="text-xs text-muted">
            Concessional cap: $30,000/year | Non-concessional cap: $120,000/year
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Investment Return
        </h2>
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Expected Annual Return: <span className="font-mono font-semibold text-primary">{expectedReturn}%</span>
          </label>
          <Slider
            min={3}
            max={10}
            value={expectedReturn}
            step={0.5}
            onChange={setExpectedReturn}
          />
          <p className="text-xs text-muted mt-1">
            Long-term average: 6-8% per annum
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="bg-blue-50 border border-blue-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Projected Super Balance at Age {retirementAge}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Starting Balance</span>
              <span className="font-mono font-semibold text-primary">
                ${currentBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Employer Contributions ({retirementAge - currentAge} years)</span>
              <span className="font-mono font-semibold text-primary">
                ${results.employerContributions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Your Voluntary Contributions</span>
              <span className="font-mono font-semibold text-primary">
                ${results.voluntaryContributions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Investment Growth</span>
              <span className="font-mono font-semibold text-primary">
                ${results.investmentGrowth.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Projected Total</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.projectedBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {voluntaryContribution > 0 && (
          <Card className="bg-green-50 border border-green-200">
            <h2 className="font-heading text-lg font-bold text-primary mb-4">
              Impact of Extra Contributions
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary">Without Extra Voluntary Contributions</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.balanceWithoutExtra.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">With Extra Contributions</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.projectedBalance.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-green-300 pt-3 flex justify-between items-center">
                <span className="text-secondary font-semibold">Extra Benefit</span>
                <span className="font-mono font-bold text-lg text-success">
                  +${results.extraBenefit.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary mb-2">
          <strong>Disclaimer:</strong> This is a projection based on assumptions and for estimation purposes only. Actual superannuation balances depend on investment performance, market conditions, and contribution rates. For detailed advice, consult a licensed financial adviser.
        </p>
        <p className="text-sm text-secondary">
          <strong>Preservation Age:</strong> You generally cannot access super until preservation age (60 for those born after 1964).
        </p>
      </Card>
    </div>
  );
}
