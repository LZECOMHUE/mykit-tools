'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MaternityPayCalculator() {
  const [weeklyEarnings, setWeeklyEarnings] = useState('500');
  const [employmentStartDate, setEmploymentStartDate] = useState('2022-01-15');
  const [babyDueDate, setBabyDueDate] = useState('2026-06-15');
  const [result, setResult] = useState(null);

  const STATUTORY_RATE_2025 = 184.03; // 2025/26 statutory rate
  const THRESHOLD_EARNINGS = 123;

  function calculate() {
    const weekly = parseFloat(weeklyEarnings) || 0;
    const empStart = new Date(employmentStartDate);
    const dueDate = new Date(babyDueDate);

    // Qualifying week (15 weeks before due date)
    const qualifyingDate = new Date(dueDate);
    qualifyingDate.setDate(qualifyingDate.getDate() - 105); // 15 weeks

    // Check employment eligibility (26 weeks before end of 4th week before EDD)
    const eligibilityDate = new Date(dueDate);
    eligibilityDate.setDate(eligibilityDate.getDate() - (7 * 4 + 7 * 26)); // 30 weeks

    const qualifies = empStart <= eligibilityDate && weekly >= THRESHOLD_EARNINGS;

    // SMP calculation
    const smpStartDate = new Date(dueDate);
    smpStartDate.setDate(smpStartDate.getDate() - 28); // Can start up to 4 weeks before

    // First 6 weeks at 90% of earnings
    const smp90Percent = Math.min(weekly * 0.9, weekly); // 90% but capped at actual earnings
    const weeks90 = 6;
    const total90 = smp90Percent * weeks90;

    // Next 33 weeks at statutory rate (or 90% if lower)
    const smpRate = Math.min(smp90Percent, STATUTORY_RATE_2025);
    const weeks33 = 33;
    const total33 = smpRate * weeks33;

    // Total SMP
    const totalSMP = total90 + total33;
    const weeklyAverage = (totalSMP / 39).toFixed(2);
    const monthlyAverage = (totalSMP / 9).toFixed(2);

    setResult({
      qualifies,
      weeklyEarnings: weekly.toFixed(2),
      qualifyingDate: qualifyingDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      smpStartDate: smpStartDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      smpEndDate: new Date(smpStartDate.getTime() + 39 * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      smp90Percent: smp90Percent.toFixed(2),
      weeks90,
      total90: total90.toFixed(2),
      smpRate: smpRate.toFixed(2),
      weeks33,
      total33: total33.toFixed(2),
      totalSMP: totalSMP.toFixed(2),
      weeklyAverage,
      monthlyAverage,
      belowThreshold: weekly < THRESHOLD_EARNINGS,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          UK Maternity Pay Calculator
        </h2>

        <p className="text-secondary text-sm mb-6">
          Calculate your Statutory Maternity Pay (SMP) for 2025/26.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Average Weekly Earnings (£)
            </label>
            <Input
              type="number"
              value={weeklyEarnings}
              onChange={(e) => setWeeklyEarnings(e.target.value)}
              placeholder="500"
              min="0"
              step="10"
            />
            <p className="text-xs text-secondary mt-1">
              Average from 8 weeks before the qualifying week. Minimum £{THRESHOLD_EARNINGS} to qualify.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Employment Start Date
            </label>
            <Input
              type="date"
              value={employmentStartDate}
              onChange={(e) => setEmploymentStartDate(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              You must have worked for your employer continuously for 26 weeks before the qualifying week.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Expected Due Date
            </label>
            <Input
              type="date"
              value={babyDueDate}
              onChange={(e) => setBabyDueDate(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              SMP can start up to 4 weeks before your due date.
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Maternity Pay
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {result.qualifies ? (
            <>
              <Card className="p-6 bg-green-50 border-2 border-green-400">
                <h3 className="font-heading text-xl font-bold text-green-700 mb-6">
                  You Qualify for Statutory Maternity Pay
                </h3>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-secondary text-sm mb-2">Total SMP (39 weeks)</p>
                    <p className="font-mono text-3xl font-bold text-primary">
                      £{result.totalSMP}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-secondary text-sm mb-1">Weekly Average</p>
                      <p className="font-mono text-lg font-bold">£{result.weeklyAverage}</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-secondary text-sm mb-1">Monthly Average</p>
                      <p className="font-mono text-lg font-bold">£{result.monthlyAverage}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-surface">
                <h3 className="font-heading text-lg font-bold text-primary mb-6">
                  Payment Breakdown
                </h3>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="font-bold text-primary mb-3">Weeks 1-6: 90% of your earnings</p>
                    <div className="space-y-1 text-sm text-secondary">
                      <div className="flex justify-between">
                        <span>Weekly rate:</span>
                        <span className="font-mono font-bold">£{result.smp90Percent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of weeks:</span>
                        <span className="font-mono font-bold">{result.weeks90}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border font-bold">
                        <span>Total:</span>
                        <span className="font-mono">£{result.total90}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="font-bold text-primary mb-3">Weeks 7-39: Statutory rate (or 90% if lower)</p>
                    <div className="space-y-1 text-sm text-secondary">
                      <div className="flex justify-between">
                        <span>Weekly rate:</span>
                        <span className="font-mono font-bold">£{result.smpRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of weeks:</span>
                        <span className="font-mono font-bold">{result.weeks33}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border font-bold">
                        <span>Total:</span>
                        <span className="font-mono">£{result.total33}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent-muted rounded-lg border border-accent font-bold">
                    <div className="flex justify-between">
                      <span className="text-primary">39-week total</span>
                      <span className="font-mono text-accent">£{result.totalSMP}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-surface">
                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                  Maternity Leave Timeline
                </h3>

                <div className="space-y-2 text-sm text-secondary">
                  <div className="flex justify-between p-2 border-b border-border">
                    <span>Qualifying week (15 weeks before due date)</span>
                    <span className="font-mono text-primary">{result.qualifyingDate}</span>
                  </div>

                  <div className="flex justify-between p-2 border-b border-border">
                    <span>SMP can start from</span>
                    <span className="font-mono text-primary">{result.smpStartDate}</span>
                  </div>

                  <div className="flex justify-between p-2 bg-accent-muted p-3 rounded">
                    <span className="font-bold text-primary">SMP ends</span>
                    <span className="font-mono font-bold text-accent">{result.smpEndDate}</span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6 bg-yellow-50 border-2 border-yellow-400">
              <h3 className="font-heading text-lg font-bold text-yellow-700 mb-4">
                You May Not Qualify for Statutory Maternity Pay
              </h3>

              <div className="space-y-3 text-sm text-secondary">
                {result.belowThreshold && (
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <p className="font-bold text-primary mb-1">Earnings Below Threshold</p>
                    <p>Your weekly earnings (£{result.weeklyEarnings}) are below the minimum of £{THRESHOLD_EARNINGS}.</p>
                  </div>
                )}

                <div className="p-3 bg-white rounded-lg border border-border">
                  <p className="font-bold text-primary mb-1">Employment Duration</p>
                  <p>You need to have worked for your employer for 26 continuous weeks before the qualifying week.</p>
                </div>

                <div className="p-3 bg-accent-muted rounded-lg border border-border">
                  <p className="font-bold text-primary mb-1">Other Support Available</p>
                  <p>You may be eligible for Maternity Allowance if you're self-employed or don't qualify for SMP.</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Information
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>SMP 2025/26 statutory rate is £{STATUTORY_RATE_2025}/week</li>
              <li>First 6 weeks paid at 90% of your normal earnings (no cap)</li>
              <li>Remaining 33 weeks paid at statutory rate or 90%, whichever is lower</li>
              <li>You can start SMP up to 4 weeks before your expected due date</li>
              <li>Statutory maternity leave is 52 weeks, but only 39 weeks are paid</li>
              <li>Some employers offer enhanced maternity pay on top of SMP</li>
              <li>You must notify your employer at least 15 weeks before due date</li>
              <li>Statutory rate may increase if the National Living Wage rises</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
