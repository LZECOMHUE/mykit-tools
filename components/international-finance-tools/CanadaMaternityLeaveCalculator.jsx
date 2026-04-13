'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CanadaMaternityLeaveCalculator() {
  const [config, setConfig] = useState({
    weeklyEarnings: '800',
    planType: 'standard',
    province: 'ontario',
  });

  const results = useMemo(() => {
    const weeklyEarnings = parseFloat(config.weeklyEarnings) || 0;
    const maxWeekly = 668; // 2025 max EI benefit
    const insurable = Math.min(weeklyEarnings, maxWeekly);

    const maternityWeeks = 15;
    const maternityRate = 0.55;
    const maternityBenefit = maternityWeeks * (insurable * maternityRate);

    let parentalWeeks = 0;
    let parentalRate = 0;
    if (config.planType === 'standard') {
      parentalWeeks = 40;
      parentalRate = 0.55;
    } else {
      parentalWeeks = 69;
      parentalRate = 0.33;
    }

    const parentalBenefit = parentalWeeks * (insurable * parentalRate);
    const totalBenefit = maternityBenefit + parentalBenefit;
    const totalWeeks = maternityWeeks + parentalWeeks;

    // Employer top-up varies by employer
    const topUpInfo = {
      ontario: 'Many employers offer 93-100% top-up',
      bc: 'Top-up policies vary widely',
      alberta: 'Limited top-up programs',
      quebec: 'Quebec Parental Insurance Plan (QPIP) available',
      federal: 'Federal public service offers 93% top-up',
    };

    return {
      weeklyInsurable: insurable,
      maternityWeeks,
      maternityWeeklyRate: maternityRate,
      maternityWeeklyAmount: insurable * maternityRate,
      maternityTotal: maternityBenefit,
      parentalWeeks,
      parentalWeeklyRate: parentalRate,
      parentalWeeklyAmount: insurable * parentalRate,
      parentalTotal: parentalBenefit,
      totalBenefit,
      totalWeeks,
      waitingPeriod: 1,
      topUpNote: topUpInfo[config.province] || 'Contact your employer for top-up details',
    };
  }, [config]);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Your Information
        </h2>

        <div className="space-y-4">
          <Input
            label="Average Weekly Insurable Earnings (CAD)"
            type="number"
            value={config.weeklyEarnings}
            onChange={(e) => setConfig({ ...config, weeklyEarnings: e.target.value })}
            placeholder="e.g., 800"
            helperText="Your insurable earnings up to the maximum insurable earnings limit"
          />

          <Select
            label="Maternity + Parental Plan Type"
            value={config.planType}
            onChange={(e) => setConfig({ ...config, planType: e.target.value })}
            options={[
              { value: 'standard', label: 'Standard (15 weeks maternity + 40 weeks parental = 55 weeks total)' },
              { value: 'extended', label: 'Extended (15 weeks maternity + 69 weeks parental = 84 weeks total)' },
            ]}
          />

          <Select
            label="Province (for top-up information)"
            value={config.province}
            onChange={(e) => setConfig({ ...config, province: e.target.value })}
            options={[
              { value: 'ontario', label: 'Ontario' },
              { value: 'bc', label: 'British Columbia' },
              { value: 'alberta', label: 'Alberta' },
              { value: 'quebec', label: 'Quebec' },
              { value: 'federal', label: 'Federal (Canada)' },
            ]}
          />
        </div>
      </Card>

      <Card className="bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          Total Leave Duration
        </h2>
        <p className="text-3xl font-mono font-bold text-primary mb-2">
          {results.totalWeeks} weeks
        </p>
        <p className="text-secondary">
          Approximately <span className="font-medium">{Math.round(results.totalWeeks / 4.3)} months</span> of combined maternity and parental leave
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-heading font-semibold text-primary mb-4">Maternity Benefits</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Duration</span>
              <span className="font-mono font-medium text-primary">{results.maternityWeeks} weeks</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Rate</span>
              <span className="font-mono font-medium text-primary">{(results.maternityRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Weekly amount</span>
              <span className="font-mono font-medium text-primary">
                ${results.maternityWeeklyAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-accent">
              <span className="font-medium text-primary">Total</span>
              <span className="font-mono font-bold text-accent">
                ${results.maternityTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading font-semibold text-primary mb-4">Parental Benefits</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Duration</span>
              <span className="font-mono font-medium text-primary">{results.parentalWeeks} weeks</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Rate</span>
              <span className="font-mono font-medium text-primary">{(results.parentalWeeklyRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-secondary">Weekly amount</span>
              <span className="font-mono font-medium text-primary">
                ${results.parentalWeeklyAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-accent">
              <span className="font-medium text-primary">Total</span>
              <span className="font-mono font-bold text-accent">
                ${results.parentalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-2 border-accent">
        <h3 className="font-heading font-semibold text-accent mb-3">Total Benefits</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-primary">Combined maternity + parental:</span>
          <span className="text-3xl font-mono font-bold text-accent">
            ${results.totalBenefit.toFixed(2)}
          </span>
        </div>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Important Information</h3>
        <div className="space-y-3 text-sm text-secondary">
          <div>
            <p className="font-medium text-primary mb-1">Waiting Period</p>
            <p>There is a 1-week unpaid waiting period before benefits begin.</p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Employer Top-Up</p>
            <p>{results.topUpNote}</p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Maximum Insurable Earnings</p>
            <p>The maximum insurable amount is ${results.weeklyInsurable.toFixed(2)} per week.</p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Partner Sharing</p>
            <p>Parental benefits can be split between partners if both are eligible.</p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Quebec Residents</p>
            <p>Quebec has its own parental insurance plan (QPIP) with different rates and durations.</p>
          </div>
        </div>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Plan Comparison</h3>
        <div className="space-y-2 text-sm text-secondary">
          <p className="font-medium text-primary">Standard Plan (55 weeks total)</p>
          <p className="ml-4">- 15 weeks maternity at 55% pay</p>
          <p className="ml-4">- 40 weeks parental at 55% pay</p>
          <p className="ml-4">- Shorter total time, higher weekly rate</p>

          <p className="font-medium text-primary mt-4">Extended Plan (84 weeks total)</p>
          <p className="ml-4">- 15 weeks maternity at 55% pay</p>
          <p className="ml-4">- 69 weeks parental at 33% pay</p>
          <p className="ml-4">- Longer total time, lower weekly rate</p>
        </div>
      </Card>
    </div>
  );
}
