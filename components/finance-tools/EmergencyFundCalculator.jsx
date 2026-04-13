'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function EmergencyFundCalculator() {
  const [housing, setHousing] = useState('1200');
  const [food, setFood] = useState('400');
  const [utilities, setUtilities] = useState('150');
  const [transport, setTransport] = useState('200');
  const [debt, setDebt] = useState('200');
  const [insurance, setInsurance] = useState('150');
  const [other, setOther] = useState('100');
  const [result, setResult] = useState(null);

  function calculate() {
    const essential = (parseFloat(housing) || 0) + (parseFloat(food) || 0) + (parseFloat(utilities) || 0) + (parseFloat(transport) || 0) + (parseFloat(debt) || 0) + (parseFloat(insurance) || 0) + (parseFloat(other) || 0);

    const three = essential * 3;
    const six = essential * 6;
    const twelve = essential * 12;

    const savingsToThree = three / 3;
    const savingsSix = six / 6;
    const savingsTwelve = twelve / 12;

    setResult({
      monthlyEssential: essential.toFixed(2),
      threeMonth: three.toFixed(2),
      sixMonth: six.toFixed(2),
      twelveMonth: twelve.toFixed(2),
      savingsThree: savingsToThree.toFixed(2),
      savingsSix: savingsSix.toFixed(2),
      savingsTwelve: savingsTwelve.toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>

        <p className="text-secondary text-sm mb-4">
          Calculate how much you need in your emergency fund based on your essential monthly expenses.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Housing (mortgage/rent, £)
            </label>
            <Input
              type="number"
              value={housing}
              onChange={(e) => setHousing(e.target.value)}
              placeholder="1200"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Food (groceries, £)
            </label>
            <Input
              type="number"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="400"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Utilities (gas, electric, water, £)
            </label>
            <Input
              type="number"
              value={utilities}
              onChange={(e) => setUtilities(e.target.value)}
              placeholder="150"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Transport (fuel, public transport, £)
            </label>
            <Input
              type="number"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              placeholder="200"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Debt payments (credit cards, loans, £)
            </label>
            <Input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              placeholder="200"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Insurance (car, home, health, £)
            </label>
            <Input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              placeholder="150"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Other essentials (childcare, medications, £)
            </label>
            <Input
              type="number"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="100"
              min="0"
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Emergency Fund Target
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Emergency Fund Targets
            </h3>

            <div className="mb-4 p-4 bg-white rounded-lg border border-border">
              <p className="text-secondary text-sm mb-2">Monthly Essential Expenses</p>
              <p className="font-mono text-3xl font-bold text-primary">
                £{result.monthlyEssential}
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">3-Month Target</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.threeMonth}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Save £{result.savingsThree}/month to reach in 3 months
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">6-Month Target</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.sixMonth}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Save £{result.savingsSix}/month to reach in 6 months
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-2">12-Month Target (Recommended)</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.twelveMonth}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Save £{result.savingsTwelve}/month to reach in 12 months
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Emergency Fund Tips
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li><strong>Start with 3 months:</strong> This covers most job loss scenarios</li>
              <li><strong>Build to 6 months:</strong> If you have dependents or unstable income</li>
              <li><strong>Aim for 12 months:</strong> For self-employed or freelancers</li>
              <li><strong>Keep it accessible:</strong> Use a savings account, not an investment account</li>
              <li><strong>Separate account:</strong> Open a dedicated account to avoid spending it</li>
              <li><strong>High interest savings:</strong> Get interest on your emergency fund</li>
              <li><strong>Only for emergencies:</strong> Car repairs, medical bills, job loss</li>
              <li><strong>Rebuild after use:</strong> Replenish it immediately after withdrawing</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
