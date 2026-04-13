'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PensionTaxFreeLumpSum() {
  const [pensionPot, setPensionPot] = useState('200000');
  const [age, setAge] = useState('65');
  const [taxBracket, setTaxBracket] = useState('20');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [result, setResult] = useState(null);

  const TAX_BRACKETS = [
    { value: '20', label: '20% (Basic rate)' },
    { value: '40', label: '40% (Higher rate)' },
    { value: '45', label: '45% (Additional rate)' },
  ];

  function calculate() {
    const pot = parseFloat(pensionPot) || 0;
    const bracket = parseFloat(taxBracket) || 20;
    const rate = parseFloat(withdrawalRate) || 4;

    // 25% can be taken as tax-free lump sum
    const taxFreeLumpSum = pot * 0.25;
    const remainingPot = pot - taxFreeLumpSum;

    // From remaining pot, estimate annual income
    const annualIncome = (remainingPot * rate) / 100;
    const monthlyIncome = annualIncome / 12;

    // Tax on income
    const taxOnIncome = (annualIncome * bracket) / 100;
    const netMonthlyIncome = (annualIncome - taxOnIncome) / 12;

    // Comparison: what if taking no lump sum?
    const noLumpSumAnnualIncome = (pot * rate) / 100;
    const noLumpSumTax = (noLumpSumAnnualIncome * bracket) / 100;
    const noLumpSumNetMonthly = (noLumpSumAnnualIncome - noLumpSumTax) / 12;

    // Lifetime benefit calculation (assume living to 85)
    const yearsToLive = 85 - parseInt(age);
    const lumpSumTotalIncome = annualIncome * yearsToLive;
    const lumpSumTotalTax = taxOnIncome * yearsToLive;
    const lumpSumTotalNet = (annualIncome - taxOnIncome) * yearsToLive;

    const noLumpSumTotalIncome = noLumpSumAnnualIncome * yearsToLive;
    const noLumpSumTotalTax = noLumpSumTax * yearsToLive;
    const noLumpSumTotalNet = (noLumpSumAnnualIncome - noLumpSumTax) * yearsToLive;

    setResult({
      taxFreeLumpSum: taxFreeLumpSum.toFixed(2),
      remainingPot: remainingPot.toFixed(2),
      annualIncome: annualIncome.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      monthlyTax: (taxOnIncome / 12).toFixed(2),
      netMonthlyIncome: netMonthlyIncome.toFixed(2),
      noLumpSumMonthly: noLumpSumNetMonthly.toFixed(2),
      monthlyDifference: (netMonthlyIncome - noLumpSumNetMonthly).toFixed(2),
      yearsToLive,
      age: parseInt(age),
      lumpSumTotalNet: lumpSumTotalNet.toFixed(2),
      noLumpSumTotalNet: noLumpSumTotalNet.toFixed(2),
      totalNetAdvantage: (lumpSumTotalNet - noLumpSumTotalNet).toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Total Pension Pot (£)
            </label>
            <Input
              type="number"
              value={pensionPot}
              onChange={(e) => setPensionPot(e.target.value)}
              placeholder="200000"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              The total value of your pension fund available at retirement.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Age at Retirement
            </label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="65"
              min="55"
              max="75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Tax Bracket
            </label>
            <Select
              options={TAX_BRACKETS}
              value={taxBracket}
              onChange={(e) => setTaxBracket(e.target.value)}
            />
          </div>

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
              The 4% rule is commonly recommended as sustainable
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Lump Sum Benefits
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Lump Sum Breakdown */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Tax-Free Lump Sum
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Tax-Free Lump Sum (25%)</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  £{result.taxFreeLumpSum}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Receive immediately, tax-free
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Remaining Pot (75%)</p>
                <p className="font-mono text-3xl font-bold text-primary">
                  £{result.remainingPot}
                </p>
                <p className="text-xs text-secondary mt-2">
                  For income or further growth
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-1">How it works:</p>
              <p>At retirement, you can take up to 25% of your pension as a tax-free lump sum. This is 1 of 4 available options under the flexible drawdown rules. The remaining 75% can be used for regular income (which is taxed) or left invested.</p>
            </div>
          </Card>

          {/* Monthly Income */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Monthly Income Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Scenario</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Gross</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Tax</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Net</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-accent-muted">
                    <td className="py-3 px-2 font-medium text-primary">With lump sum</td>
                    <td className="text-right font-mono text-primary">£{(parseFloat(result.annualIncome) / 12).toFixed(2)}</td>
                    <td className="text-right font-mono text-error">£{result.monthlyTax}</td>
                    <td className="text-right font-mono font-bold text-primary">£{result.netMonthlyIncome}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Without lump sum</td>
                    <td className="text-right font-mono text-secondary">-</td>
                    <td className="text-right font-mono text-secondary">-</td>
                    <td className="text-right font-mono">£{result.noLumpSumMonthly}</td>
                  </tr>
                  <tr className="bg-green-50 font-bold">
                    <td className="py-3 px-2 text-green-700">Monthly difference</td>
                    <td className="text-right font-mono text-green-700">-</td>
                    <td className="text-right font-mono text-green-700">-</td>
                    <td className="text-right font-mono text-green-700">£{result.monthlyDifference}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p>By taking the lump sum, your monthly after-tax income is reduced. However, you receive a one-off tax-free payment of £{result.taxFreeLumpSum} which you can use immediately.</p>
            </div>
          </Card>

          {/* Lifetime Benefits */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Lifetime Total (Age {result.age} to {result.age + result.yearsToLive})
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Scenario 1: With Lump Sum</p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Lump sum received:</span>
                    <span className="font-mono font-bold">£{result.taxFreeLumpSum}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Income over {result.yearsToLive} years:</span>
                    <span className="font-mono font-bold">£{(parseFloat(result.annualIncome) * result.yearsToLive).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-border pt-1 mt-1 font-bold">
                    <span>Total benefit (net)</span>
                    <span className="font-mono text-primary">£{result.lumpSumTotalNet}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Scenario 2: Without Lump Sum</p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Income over {result.yearsToLive} years:</span>
                    <span className="font-mono font-bold">£{(parseFloat(result.noLumpSumMonthly) * 12 * result.yearsToLive).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-border pt-1 mt-1 font-bold">
                    <span>Total benefit (net)</span>
                    <span className="font-mono text-primary">£{result.noLumpSumTotalNet}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent-muted rounded-lg border border-accent">
                <div className="flex justify-between font-bold">
                  <span className="text-primary">Taking lump sum is worth:</span>
                  <span className="font-mono text-accent">£{result.totalNetAdvantage}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Strategic Considerations */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Strategic Considerations
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li><strong>Use for immediate needs:</strong> Pay off debt, home improvements, or a car</li>
              <li><strong>Emergency fund:</strong> Build a 6-12 month financial cushion</li>
              <li><strong>Invest wisely:</strong> If you don't need it immediately, invest for additional returns</li>
              <li><strong>Tax efficiency:</strong> Taking the lump sum doesn't trigger income tax, unlike withdrawal from the pot</li>
              <li><strong>Flexibility:</strong> You have flexibility in how you use the remaining 75%</li>
              <li><strong>Life expectancy:</strong> If you expect longer life, keeping funds invested may be better</li>
              <li><strong>Family legacy:</strong> Unused pension can be passed to heirs (with tax considerations)</li>
              <li><strong>Care costs:</strong> Retain funds for potential long-term care needs</li>
            </ul>
          </Card>

          {/* Tax Considerations */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Tax Considerations
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>The 25% lump sum is always tax-free</li>
              <li>Income drawn from the remaining 75% is taxable income</li>
              <li>You must declare pension income on your tax return</li>
              <li>Personal allowance (£12,570 in 2026/27) applies first</li>
              <li>Withdrawing more than your allowance brings you into higher tax bands</li>
              <li>Consider spreading withdrawals across years to minimise tax</li>
              <li>Delaying income into a different tax year may be beneficial</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
