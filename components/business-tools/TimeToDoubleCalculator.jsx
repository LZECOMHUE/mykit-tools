'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function TimeToDoubleCalculator() {
  const [activeTab, setActiveTab] = useState('byRate');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('');

  const byRateResults = useMemo(() => {
    const rate = parseFloat(interestRate) || 0;

    if (rate <= 0) return null;

    // Rule of 72: years to double = 72 / rate
    // More precise formula: ln(2) / ln(1 + r)
    const yearsToDouble = Math.log(2) / Math.log(1 + rate / 100);
    const ruleOf72 = 72 / rate;

    return {
      yearsToDouble,
      ruleOf72,
      rate,
    };
  }, [interestRate]);

  const byYearsResults = useMemo(() => {
    const period = parseFloat(years) || 0;

    if (period <= 0) return null;

    // Reverse calculation: rate = (2^(1/years) - 1) * 100
    const requiredRate = (Math.pow(2, 1 / period) - 1) * 100;
    const ruleOf72Rate = 72 / period;

    return {
      requiredRate,
      ruleOf72Rate,
      years: period,
    };
  }, [years]);

  const comparisonRates = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20];

  const getTimeToDouble = (rate) => {
    if (rate <= 0) return null;
    return Math.log(2) / Math.log(1 + rate / 100);
  };

  return (
    <div className="space-y-4">
      <Tabs
        tabs={[
          { id: 'byRate', label: 'Find Time to Double by Rate' },
          { id: 'byYears', label: 'Find Required Rate by Years' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* By Rate Tab */}
      {activeTab === 'byRate' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              How Long to Double Your Money?
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Annual Interest Rate (%)
              </label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="7"
                min="0"
                step="0.1"
              />
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
              <p className="text-blue-900 text-sm">
                <strong>Rule of 72:</strong> Divide 72 by the interest rate to estimate how many years it takes to double your money. At 7%, roughly 72/7 = 10 years.
              </p>
            </div>
          </div>

          {byRateResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Time to Double</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    {byRateResults.yearsToDouble.toFixed(2)} years
                  </p>
                  <p className="text-text-muted text-xs mt-2">
                    at {byRateResults.rate.toFixed(2)}% annual interest
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Actual Time to Double</span>
                    <span className="font-mono font-bold text-text-primary">
                      {byRateResults.yearsToDouble.toFixed(2)} years
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Rule of 72 Estimate</span>
                    <span className="font-mono font-bold text-text-primary">
                      {byRateResults.ruleOf72.toFixed(2)} years
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* By Years Tab */}
      {activeTab === 'byYears' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              What Rate to Double in X Years?
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Number of Years
              </label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
                min="0.1"
                step="0.1"
              />
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
              <p className="text-blue-900 text-sm">
                <strong>Rule of 72:</strong> Divide 72 by the number of years to find the required rate. To double in 10 years, you need roughly 72/10 = 7.2% annual return.
              </p>
            </div>
          </div>

          {byYearsResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Required Annual Rate</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    {byYearsResults.requiredRate.toFixed(2)}%
                  </p>
                  <p className="text-text-muted text-xs mt-2">
                    to double your money in {byYearsResults.years.toFixed(2)} years
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Actual Required Rate</span>
                    <span className="font-mono font-bold text-text-primary">
                      {byYearsResults.requiredRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Rule of 72 Estimate</span>
                    <span className="font-mono font-bold text-text-primary">
                      {byYearsResults.ruleOf72Rate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Comparison Table */}
      <div>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">
          Time to Double at Various Rates
        </h3>
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-text-secondary text-left py-2 px-2 font-medium">
                  Annual Rate
                </th>
                <th className="text-text-secondary text-right py-2 px-2 font-medium">
                  Time to Double
                </th>
                <th className="text-text-secondary text-right py-2 px-2 font-medium">
                  Rule of 72
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRates.map((rate) => {
                const time = getTimeToDouble(rate);
                if (!time) return null;
                const rule72 = 72 / rate;
                return (
                  <tr
                    key={rate}
                    className={`border-b border-border hover:bg-white transition-colors ${
                      (activeTab === 'byRate' && parseFloat(interestRate) === rate) ||
                      (activeTab === 'byYears' && parseFloat(years) > 0 && Math.abs(byYearsResults?.requiredRate - rate) < 0.5)
                        ? 'bg-accent-muted'
                        : ''
                    }`}
                  >
                    <td className="text-text-primary py-2 px-2 font-mono">
                      {rate}%
                    </td>
                    <td className="text-text-primary text-right py-2 px-2 font-mono">
                      {time.toFixed(2)} years
                    </td>
                    <td className="text-text-muted text-right py-2 px-2 font-mono">
                      {rule72.toFixed(2)} years
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Box */}
      <Card className="bg-blue-50 border border-blue-200">
        <h3 className="font-heading text-sm font-semibold text-blue-900 mb-2">
          About the Rule of 72
        </h3>
        <p className="text-blue-900 text-sm mb-2">
          The Rule of 72 is a quick way to estimate how long an investment takes to double. Divide 72 by the annual interest rate.
        </p>
        <p className="text-blue-900 text-xs">
          Formula: Years to Double = 72 / Annual Rate. The actual formula is more precise: Years = ln(2) / ln(1 + r), but Rule of 72 gives a good approximation for rates between 1% and 10%.
        </p>
      </Card>
    </div>
  );
}
