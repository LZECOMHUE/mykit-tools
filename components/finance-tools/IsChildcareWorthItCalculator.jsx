'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function IsChildcareWorthItCalculator() {
  const [grossSalary, setGrossSalary] = useState(40000);
  const [childcareCostPerMonth, setChildcareCostPerMonth] = useState(500);
  const [numChildren, setNumChildren] = useState(1);
  const [taxBracket, setTaxBracket] = useState(20);
  const [lostBenefits, setLostBenefits] = useState(0);
  const [commutingCost, setCommutingCost] = useState(0);
  const [workingMonthsPerYear, setWorkingMonthsPerYear] = useState(12);

  const results = useMemo(() => {
    // Calculate tax and NI
    const personalAllowance = 12570;
    const taxableIncome = Math.max(0, grossSalary - personalAllowance);
    const incomeTax = (taxableIncome * taxBracket) / 100;

    // National Insurance (approximate)
    const niThreshold = 12570;
    const niableIncome = Math.max(0, grossSalary - niThreshold);
    const nationalInsurance = (niableIncome * 0.08);

    // Gross to net
    const grossMonthly = grossSalary / 12;
    const netMonthly = grossMonthly - (incomeTax / 12) - (nationalInsurance / 12);

    // Childcare costs
    const totalChildcareCost = childcareCostPerMonth * workingMonthsPerYear;

    // Other work costs
    const totalCommutingCost = commutingCost * workingMonthsPerYear;

    // Lost benefits/tax credits
    const totalLostBenefits = lostBenefits * workingMonthsPerYear;

    // Total costs of working
    const totalWorkingCosts = totalChildcareCost + totalCommutingCost + totalLostBenefits;

    // Total net income
    const totalNetIncome = netMonthly * workingMonthsPerYear;

    // Net gain
    const netGain = totalNetIncome - totalWorkingCosts;

    // Hourly breakdown (rough estimate: 40 hours/week * 48 weeks/year)
    const annualHours = 40 * 48;
    const effectiveHourlyRate = netGain > 0 ? netGain / annualHours : 0;

    return {
      incomeTax,
      nationalInsurance,
      netMonthly,
      totalNetIncome,
      totalChildcareCost,
      totalCommutingCost,
      totalLostBenefits,
      totalWorkingCosts,
      netGain,
      effectiveHourlyRate,
      worthIt: netGain > 0,
    };
  }, [
    grossSalary,
    childcareCostPerMonth,
    numChildren,
    taxBracket,
    lostBenefits,
    commutingCost,
    workingMonthsPerYear,
  ]);

  const reset = () => {
    setGrossSalary(40000);
    setChildcareCostPerMonth(500);
    setNumChildren(1);
    setTaxBracket(20);
    setLostBenefits(0);
    setCommutingCost(0);
    setWorkingMonthsPerYear(12);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Income & Tax */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Your Income
          </h2>

          <div className="space-y-4">
            <Input
              label="Gross salary (annual)"
              type="number"
              min={0}
              step={1000}
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Income tax rate (%)
              </label>
              <Select
                options={[
                  { value: '20', label: '20% (basic rate)' },
                  { value: '40', label: '40% (higher rate)' },
                  { value: '45', label: '45% (additional rate)' },
                ]}
                value={String(taxBracket)}
                onChange={(e) => setTaxBracket(Number(e.target.value))}
              />
            </div>

            <Input
              label="Months working per year"
              type="number"
              min={1}
              max={12}
              step={1}
              value={workingMonthsPerYear}
              onChange={(e) => setWorkingMonthsPerYear(Number(e.target.value))}
            />
          </div>
        </Card>

        {/* Costs */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Working Costs
          </h2>

          <div className="space-y-4">
            <Input
              label="Childcare cost per month (£)"
              type="number"
              min={0}
              step={10}
              value={childcareCostPerMonth}
              onChange={(e) => setChildcareCostPerMonth(Number(e.target.value))}
              helper="Nursery, childminder, au pair, etc."
            />

            <Input
              label="Commuting cost per month (£)"
              type="number"
              min={0}
              step={10}
              value={commutingCost}
              onChange={(e) => setCommutingCost(Number(e.target.value))}
              helper="Train, car, fuel"
            />

            <Input
              label="Lost benefits per month (£)"
              type="number"
              min={0}
              step={10}
              value={lostBenefits}
              onChange={(e) => setLostBenefits(Number(e.target.value))}
              helper="Tax credits, child benefit reduction"
            />
          </div>
        </Card>
      </div>

      {/* Results */}
      <Card className={`mb-6 ${results.worthIt ? 'bg-success/5 border-success/30' : 'bg-error/5 border-error/30'}`}>
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-2">Annual Decision</p>
          <p className={`font-heading text-4xl font-bold ${results.worthIt ? 'text-success' : 'text-error'} mb-4`}>
            {results.worthIt ? 'Worth It' : 'May Not Be Worth It'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-border">
              <p className="text-xs text-text-secondary mb-1">Net annual gain</p>
              <p className={`font-mono text-lg font-bold ${results.netGain >= 0 ? 'text-success' : 'text-error'}`}>
                £{results.netGain.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-white rounded-lg p-3 border border-border">
              <p className="text-xs text-text-secondary mb-1">Effective hourly rate</p>
              <p className={`font-mono text-lg font-bold ${results.effectiveHourlyRate >= 10 ? 'text-success' : 'text-error'}`}>
                £{results.effectiveHourlyRate.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}/hr
              </p>
            </div>
          </div>

          {results.netGain > 0 && (
            <p className="text-xs text-text-secondary">
              You keep £{results.netGain.toLocaleString('en-GB', { maximumFractionDigits: 0 })} per year after all childcare and work costs
            </p>
          )}

          {results.netGain <= 0 && (
            <p className="text-xs text-text-secondary">
              Working costs more than you earn (not including career progression or pension)
            </p>
          )}
        </div>
      </Card>

      {/* Breakdown */}
      <Card className="mb-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">Monthly Breakdown</h3>

        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-surface rounded-lg">
            <span className="text-text-secondary">Gross salary</span>
            <span className="font-mono font-bold text-text-primary">
              £{(grossSalary / 12).toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between p-3 bg-white border border-border rounded-lg">
            <span className="text-text-secondary">Income tax</span>
            <span className="font-mono font-bold text-error">
              -£{(results.incomeTax / 12).toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex justify-between p-3 bg-white border border-border rounded-lg">
            <span className="text-text-secondary">National Insurance</span>
            <span className="font-mono font-bold text-error">
              -£{(results.nationalInsurance / 12).toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex justify-between p-3 bg-white border border-border rounded-lg font-bold">
            <span className="text-text-primary">Net salary</span>
            <span className="font-mono text-accent">
              £{results.netMonthly.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between p-3 bg-surface rounded-lg">
            <span className="text-text-secondary">Childcare</span>
            <span className="font-mono font-bold text-error">
              -£{childcareCostPerMonth.toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {commutingCost > 0 && (
            <div className="flex justify-between p-3 bg-surface rounded-lg">
              <span className="text-text-secondary">Commuting</span>
              <span className="font-mono font-bold text-error">
                -£{commutingCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          {lostBenefits > 0 && (
            <div className="flex justify-between p-3 bg-surface rounded-lg">
              <span className="text-text-secondary">Lost benefits</span>
              <span className="font-mono font-bold text-error">
                -£{lostBenefits.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          <div className="flex justify-between p-3 bg-accent/5 border border-accent/30 rounded-lg font-bold">
            <span className="text-accent">Net after costs</span>
            <span className={`font-mono ${results.netGain >= 0 ? 'text-success' : 'text-error'}`}>
              £{(results.netGain / workingMonthsPerYear).toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="bg-info/5 border-info/20">
        <p className="text-xs text-text-secondary mb-2">
          <strong>Note:</strong> This calculation doesn't include:
        </p>
        <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
          <li>Career progression and future salary growth</li>
          <li>Pension contributions (which are valuable)</li>
          <li>Flexible working arrangement discounts</li>
          <li>Employer childcare schemes (e.g., childcare vouchers)</li>
          <li>Psychological benefits of work and independence</li>
        </ul>
      </Card>

      {/* Reset Button */}
      <Button onClick={reset} variant="secondary" className="w-full mt-4">
        Reset to defaults
      </Button>
    </div>
  );
}
