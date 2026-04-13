'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ChildBenefitTaxCalculator() {
  const [children, setChildren] = useState('2');
  const [incomeSacrifice, setIncomeSacrifice] = useState('70000');
  const [result, setResult] = useState(null);

  const THRESHOLD = 60000;
  const WITHDRAWAL_RATE = 0.01; // 1% per £100 over threshold
  const FULL_WITHDRAWAL = 80000;

  // 2026/27 rates per week
  const FIRST_CHILD_WEEKLY = 26.05;
  const ADDITIONAL_CHILD_WEEKLY = 17.25;

  function calculate() {
    const numChildren = parseInt(children) || 1;
    const income = parseFloat(incomeSacrifice) || 0;

    // Total annual child benefit - first child + additional children
    const firstChildBenefit = FIRST_CHILD_WEEKLY * 52;
    const additionalChildrenBenefit = numChildren > 1 ? (numChildren - 1) * ADDITIONAL_CHILD_WEEKLY * 52 : 0;
    const totalBenefit = firstChildBenefit + additionalChildrenBenefit;

    // High Income Child Benefit Charge
    let charge = 0;
    if (income > THRESHOLD) {
      const excess = income - THRESHOLD;
      charge = totalBenefit * Math.min(1, excess / (FULL_WITHDRAWAL - THRESHOLD));
    }

    const netBenefit = totalBenefit - charge;
    const worthClaiming = netBenefit > 0;

    // Weekly breakdown
    const weeklyBenefit = (totalBenefit / 52).toFixed(2);
    const weeklyCharge = (charge / 52).toFixed(2);
    const weeklyNet = (netBenefit / 52).toFixed(2);

    setResult({
      children: numChildren,
      income: income.toFixed(2),
      totalBenefit: totalBenefit.toFixed(2),
      charge: charge.toFixed(2),
      netBenefit: netBenefit.toFixed(2),
      worthClaiming,
      weeklyBenefit,
      weeklyCharge,
      weeklyNet,
      percentageOver: income > THRESHOLD ? (((income - THRESHOLD) / (FULL_WITHDRAWAL - THRESHOLD)) * 100).toFixed(1) : '0',
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>

        <p className="text-secondary text-sm mb-4">
          Check if the High Income Child Benefit Charge means you should claim child benefit.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Number of Children
            </label>
            <Input
              type="number"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              placeholder="2"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Higher Earner's Adjusted Net Income (£)
            </label>
            <Input
              type="number"
              value={incomeSacrifice}
              onChange={(e) => setIncomeSacrifice(e.target.value)}
              placeholder="70000"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              This is the adjusted net income of the higher earning parent/carer for the tax year.
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Child Benefit
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className={`border-2 ${result.worthClaiming ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'}`}>
            <h3 className={`font-heading text-xl font-bold mb-4 ${result.worthClaiming ? 'text-green-700' : 'text-yellow-700'}`}>
              {result.worthClaiming ? 'Yes, Still Worth Claiming' : 'May Not Be Worth Claiming'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Annual Child Benefit</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.totalBenefit}
                </p>
                <p className="text-xs text-secondary mt-1">
                  For {result.children} child{result.children > 1 ? 'ren' : ''}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">High Income Charge</p>
                <p className="font-mono text-2xl font-bold text-error">
                  -£{result.charge}
                </p>
                <p className="text-xs text-secondary mt-1">
                  1% for every £100 over £60k
                </p>
              </div>
            </div>

            <div className={`mt-4 p-4 rounded-lg border ${result.worthClaiming ? 'bg-green-50 border-green-300' : 'bg-white border-border'}`}>
              <p className={`text-sm mb-2 ${result.worthClaiming ? 'text-green-700 font-bold' : 'text-secondary'}`}>
                Net Benefit After Tax
              </p>
              <p className={`font-mono text-2xl font-bold ${result.worthClaiming ? 'text-green-700' : 'text-primary'}`}>
                £{result.netBenefit}
              </p>
            </div>
          </Card>

          <Card className="bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Weekly Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Child benefit per week</span>
                <span className="font-mono font-bold">£{result.weeklyBenefit}</span>
              </div>

              <div className="flex justify-between p-3 bg-white rounded-lg border border-border">
                <span className="text-secondary">Tax charge per week</span>
                <span className="font-mono font-bold text-error">-£{result.weeklyCharge}</span>
              </div>

              <div className="flex justify-between p-3 bg-accent-muted rounded-lg border border-accent font-bold">
                <span className="text-primary">Net per week</span>
                <span className="font-mono text-accent">£{result.weeklyNet}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Key Information
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li><strong>Threshold:</strong> Charge applies when income exceeds £60,000</li>
              <li><strong>Calculation:</strong> 1% of child benefit for every £100 over £60k, up to 100% at £80k</li>
              <li><strong>Still claim:</strong> Even if you pay the charge, you still get the benefit back through tax relief if you do a self-assessment</li>
              <li><strong>Self-assessment:</strong> You must complete a tax return to claim the relief</li>
              <li><strong>Bank details:</strong> Your National Insurance record gets credit even if you don't claim</li>
              <li><strong>Multiple children:</strong> The charge applies to total benefit, not per child</li>
              <li><strong>Both partners:</strong> Charge based on higher earner only if married/in civil partnership</li>
            </ul>
          </Card>

          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Should You Claim?
            </h3>

            {result.worthClaiming ? (
              <div className="space-y-2 text-sm text-secondary">
                <p><strong>Yes, you should claim.</strong> Even after the charge, you receive £{result.netBenefit}/year (£{result.weeklyNet}/week).</p>
                <p>Additionally, claiming gives you credits towards your National Insurance record, which counts towards your state pension.</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-secondary">
                <p><strong>Consideration needed.</strong> The charge nearly wipes out the benefit, but claiming gives you National Insurance credits.</p>
                <p>If you do self-assessment, you can claim the charge back through tax relief, making it worthwhile.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
