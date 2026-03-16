'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function ROICalculator() {
  const [activeTab, setActiveTab] = useState('finalValue');
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('12500');
  const [annualReturn, setAnnualReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('2');
  const [baselineRate, setBaselineRate] = useState('4');

  const finalValueResults = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const years = parseFloat(timePeriod) || 1;

    if (initial <= 0) return null;

    const totalProfit = final - initial;
    const roiPercent = (totalProfit / initial) * 100;
    const annualisedReturn = (Math.pow(final / initial, 1 / years) - 1) * 100;

    return {
      totalProfit,
      roiPercent,
      annualisedReturn,
      initialInvestment: initial,
      finalValue: final,
      years,
    };
  }, [initialInvestment, finalValue, timePeriod]);

  const annualReturnResults = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const annual = parseFloat(annualReturn) || 0;
    const years = parseFloat(timePeriod) || 1;

    if (initial <= 0) return null;

    // Compound interest formula: A = P(1 + r)^n
    const final = initial * Math.pow(1 + annual / 100, years);
    const totalProfit = final - initial;
    const totalRoiPercent = (totalProfit / initial) * 100;

    return {
      totalProfit,
      roiPercent: totalRoiPercent,
      annualisedReturn: annual,
      finalValue: final,
      initialInvestment: initial,
      years,
    };
  }, [initialInvestment, annualReturn, timePeriod]);

  const results = activeTab === 'finalValue' ? finalValueResults : annualReturnResults;

  const comparisonRates = [1, 2, 3, 4, 5, 6, 7, 8];

  const getGrowthAt = (rate, years) => {
    const initial = parseFloat(initialInvestment) || 1;
    return initial * Math.pow(1 + rate / 100, years);
  };

  return (
    <div className="space-y-6">
      <Tabs
        tabs={[
          { id: 'finalValue', label: 'Calculate by Final Value' },
          { id: 'annualReturn', label: 'Calculate by Annual Return' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Final Value Tab */}
      {activeTab === 'finalValue' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Calculate ROI from Final Value
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Initial Investment
              </label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="10000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Final Value
              </label>
              <Input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="12500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Time Period (years)
              </label>
              <Input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="2"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>

          {finalValueResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-xs mb-1">Total ROI</p>
                    <p className="font-mono text-2xl font-bold text-accent">
                      {finalValueResults.roiPercent.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">Annualised Return</p>
                    <p className="font-mono text-2xl font-bold text-accent">
                      {finalValueResults.annualisedReturn.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Initial Investment</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{finalValueResults.initialInvestment.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Final Value</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{finalValueResults.finalValue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Total Profit</span>
                    <span className="font-mono font-bold text-accent">
                      £{finalValueResults.totalProfit.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Annual Return Tab */}
      {activeTab === 'annualReturn' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Calculate Growth from Annual Return
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Initial Investment
              </label>
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="10000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Annual Return Rate (%)
              </label>
              <Input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="5"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Time Period (years)
              </label>
              <Input
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="2"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>

          {annualReturnResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Final Value</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{annualReturnResults.finalValue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Initial Investment</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{annualReturnResults.initialInvestment.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Total Profit</span>
                    <span className="font-mono font-bold text-accent">
                      £{annualReturnResults.totalProfit.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Total ROI</span>
                    <span className="font-mono font-bold text-text-primary">
                      {annualReturnResults.roiPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Comparison Table */}
      {results && (
        <div>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">
            Compare with Other Rates
          </h3>
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-text-secondary text-left py-2 px-2 font-medium">
                    Annual Rate
                  </th>
                  <th className="text-text-secondary text-right py-2 px-2 font-medium">
                    Final Value
                  </th>
                  <th className="text-text-secondary text-right py-2 px-2 font-medium">
                    vs Your Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRates.map((rate) => {
                  const value = getGrowthAt(rate, parseFloat(timePeriod));
                  const diff = value - parseFloat(finalValue || 0);
                  const isHigher = diff > 0;
                  return (
                    <tr
                      key={rate}
                      className={`border-b border-border hover:bg-white transition-colors ${
                        rate === parseFloat(activeTab === 'annualReturn' ? annualReturn : '0')
                          ? 'bg-accent-muted'
                          : ''
                      }`}
                    >
                      <td className="text-text-primary py-2 px-2 font-mono">
                        {rate}%
                      </td>
                      <td className="text-text-primary text-right py-2 px-2 font-mono">
                        £{value.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </td>
                      <td className={`text-right py-2 px-2 font-mono ${isHigher ? 'text-green-600' : 'text-red-600'}`}>
                        {isHigher ? '+' : ''}£{diff.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
