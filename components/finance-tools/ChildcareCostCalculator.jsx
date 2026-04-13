'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ChildcareCostCalculator() {
  const [childAge, setChildAge] = useState('3');
  const [childcareType, setChildcareType] = useState('nursery');
  const [hoursPerWeek, setHoursPerWeek] = useState('30');
  const [costPerHour, setCostPerHour] = useState('12');
  const [result, setResult] = useState(null);

  const CHILDCARE_TYPES = [
    { value: 'nursery', label: 'Nursery (£8-15/hour typical)' },
    { value: 'childminder', label: 'Childminder (£6-12/hour typical)' },
    { value: 'nanny', label: 'Nanny (£12-18/hour typical)' },
    { value: 'preschool', label: 'Preschool/Playgroup (£4-8/hour typical)' },
  ];

  const FREE_ENTITLEMENTS = {
    '2': 570,   // £570 per 3 months (15 hours/week for 38 weeks)
    '3': 1140,  // £1140 per 3 months (30 hours/week for 38 weeks)
    '4': 1140,  // £1140 per 3 months (30 hours/week for 38 weeks)
  };

  const TAX_FREE_CHILDCARE_MAX = 2000; // Per child per year

  function calculate() {
    const age = childAge;
    const hours = parseFloat(hoursPerWeek) || 0;
    const costHour = parseFloat(costPerHour) || 0;

    // Weekly cost
    const weeklyCost = hours * costHour;
    const monthlyCost = (weeklyCost * 52) / 12;
    const annualCost = weeklyCost * 52;

    // Free entitlements (apply to 3 and 4 year olds)
    let freeEntitlementValue = 0;
    let qualifiesFor30Hours = false;
    if (age === '3' || age === '4') {
      freeEntitlementValue = 1140 * 4; // 4 terms per year
      qualifiesFor30Hours = hours >= 30;
    }

    // Tax-Free Childcare benefit
    const tFCBenefit = Math.min(annualCost * 0.2, TAX_FREE_CHILDCARE_MAX);

    // UC childcare element (if eligible, max 85% costs up to £680/month first child)
    const ucMax = 680;
    const ucBenefit = Math.min(annualCost * 0.85 / 12, ucMax);

    // Net costs after support
    const costAfterFree = Math.max(0, annualCost - freeEntitlementValue);
    const costAfterTFC = Math.max(0, costAfterFree - tFCBenefit);
    const costAfterUC = Math.max(0, costAfterTFC - (ucBenefit * 12));

    setResult({
      weeklyCost: weeklyCost.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      annualCost: annualCost.toFixed(2),
      freeEntitlementValue: freeEntitlementValue.toFixed(2),
      qualifiesFor30Hours,
      tFCBenefit: tFCBenefit.toFixed(2),
      ucBenefit: (ucBenefit * 12).toFixed(2),
      costAfterSupport: costAfterTFC.toFixed(2),
      age,
      childcareType,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Child's Age
            </label>
            <Select
              options={[
                { value: '0', label: 'Under 2' },
                { value: '2', label: '2 years old' },
                { value: '3', label: '3 years old' },
                { value: '4', label: '4 years old' },
                { value: '5', label: '5+ years old' },
              ]}
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              Free childcare support available for 2, 3, and 4 year olds
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Type of Childcare
            </label>
            <Select
              options={CHILDCARE_TYPES}
              value={childcareType}
              onChange={(e) => setChildcareType(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Hours Per Week
            </label>
            <Input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              placeholder="30"
              min="0"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Cost Per Hour (£)
            </label>
            <Input
              type="number"
              value={costPerHour}
              onChange={(e) => setCostPerHour(e.target.value)}
              placeholder="12"
              min="0"
              step="0.50"
            />
            <p className="text-xs text-secondary mt-1">
              Check your local provider for typical rates
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Childcare Costs
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Childcare Costs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Week</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.weeklyCost}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Month</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.monthlyCost}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Year</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.annualCost}
                </p>
              </div>
            </div>
          </Card>

          {(result.age === '2' || result.age === '3' || result.age === '4') && (
            <Card className="bg-surface">
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                Available Government Support
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-2">Free Childcare Entitlement</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    £{result.freeEntitlementValue}/year
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    {result.qualifiesFor30Hours ? '30 hours per week, 38 weeks per year' : '15 hours per week, 38 weeks per year'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <p className="text-secondary text-sm mb-2">Tax-Free Childcare (20% government top-up)</p>
                  <p className="font-mono text-lg font-bold text-primary">
                    Up to £{result.tFCBenefit}/year
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    You save £1, government adds 20p (up to £2,000/year per child)
                  </p>
                </div>

                <div className="p-4 bg-accent-muted rounded-lg border border-accent">
                  <p className="text-secondary text-sm mb-2">Cost After Free Support</p>
                  <p className="font-mono text-xl font-bold text-accent">
                    £{result.costAfterSupport}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Childcare Support Eligibility
            </h3>

            <div className="text-sm text-secondary space-y-3">
              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Free Childcare (2/3/4 year olds)</p>
                <p>15 hours/week for all 2-4 year olds. Up to 30 hours/week if parents work.</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Tax-Free Childcare</p>
                <p>Up to £2,000/year per child. Parents must earn £15k+ but under £100k. Open a TFC account.</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Universal Credit Childcare Element</p>
                <p>Up to 85% of childcare costs (max £680/month first child). Must be on Universal Credit and working.</p>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg">
                <p className="font-bold text-primary mb-1">Employer Childcare Vouchers</p>
                <p>If available, save up to £2,916/year through payroll sacrifice (40% tax payers save more).</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
