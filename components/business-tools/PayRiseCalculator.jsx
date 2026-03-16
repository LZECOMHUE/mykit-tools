'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function PayRiseCalculator() {
  const [activeTab, setActiveTab] = useState('amount');
  const [currentSalary, setCurrentSalary] = useState('40000');
  const [newSalary, setNewSalary] = useState('42000');
  const [percentIncrease, setPercentIncrease] = useState('');
  const [taxRate, setTaxRate] = useState('20');
  const [inflationRate, setInflationRate] = useState('3');

  const amountResults = useMemo(() => {
    const current = parseFloat(currentSalary) || 0;
    const newVal = parseFloat(newSalary) || 0;

    if (current <= 0) return null;

    const increase = newVal - current;
    const percentageIncrease = (increase / current) * 100;
    const tax = parseFloat(taxRate) || 0;
    const inflation = parseFloat(inflationRate) || 0;

    // Monthly and annual net difference
    const monthlyIncrease = increase / 12;
    const monthlyIncreaseTax = monthlyIncrease * (1 - tax / 100);
    const annualIncreaseTax = increase * (1 - tax / 100);

    // Real terms (accounting for inflation)
    const realIncrease = percentageIncrease - inflation;

    return {
      increase,
      percentageIncrease,
      monthlyIncrease,
      monthlyIncreaseTax,
      annualIncreaseTax,
      realIncrease,
      currentSalary: current,
      newSalary: newVal,
      taxRate: tax,
      inflationRate: inflation,
    };
  }, [currentSalary, newSalary, taxRate, inflationRate]);

  const percentResults = useMemo(() => {
    const current = parseFloat(currentSalary) || 0;
    const percent = parseFloat(percentIncrease) || 0;

    if (current <= 0) return null;

    const increase = (current * percent) / 100;
    const newVal = current + increase;
    const tax = parseFloat(taxRate) || 0;
    const inflation = parseFloat(inflationRate) || 0;

    // Monthly and annual net difference
    const monthlyIncrease = increase / 12;
    const monthlyIncreaseTax = monthlyIncrease * (1 - tax / 100);
    const annualIncreaseTax = increase * (1 - tax / 100);

    // Real terms (accounting for inflation)
    const realIncrease = percent - inflation;

    return {
      increase,
      percentageIncrease: percent,
      monthlyIncrease,
      monthlyIncreaseTax,
      annualIncreaseTax,
      realIncrease,
      currentSalary: current,
      newSalary: newVal,
      taxRate: tax,
      inflationRate: inflation,
    };
  }, [currentSalary, percentIncrease, taxRate, inflationRate]);

  const results = activeTab === 'amount' ? amountResults : percentResults;

  return (
    <div className="space-y-6">
      <Tabs
        tabs={[
          { id: 'amount', label: 'Calculate by Amount' },
          { id: 'percent', label: 'Calculate by Percentage' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Amount Tab */}
      {activeTab === 'amount' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Calculate Pay Rise Value
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Current Salary
              </label>
              <Input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                placeholder="40000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                New Salary
              </label>
              <Input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                placeholder="42000"
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Inflation Rate (%)
                </label>
                <Input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  placeholder="3"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {amountResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Monthly Pay Increase (after tax)</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{amountResults.monthlyIncreaseTax.toFixed(2)}
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Salary Increase</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{amountResults.increase.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Percentage Increase</span>
                    <span className="font-mono font-bold text-text-primary">
                      {amountResults.percentageIncrease.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Annual Net Increase (after tax)</span>
                    <span className="font-mono font-bold text-accent">
                      £{amountResults.annualIncreaseTax.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Real Terms Increase (vs inflation)</span>
                    <span className={`font-mono font-bold ${amountResults.realIncrease >= 0 ? 'text-accent' : 'text-red-600'}`}>
                      {amountResults.realIncrease >= 0 ? '+' : ''}{amountResults.realIncrease.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Percent Tab */}
      {activeTab === 'percent' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Calculate by Percentage
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Current Salary
              </label>
              <Input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                placeholder="40000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Percentage Increase
              </label>
              <Input
                type="number"
                value={percentIncrease}
                onChange={(e) => setPercentIncrease(e.target.value)}
                placeholder="5"
                min="0"
                step="0.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="20"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Inflation Rate (%)
                </label>
                <Input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  placeholder="3"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {percentResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">New Salary</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{percentResults.newSalary.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Salary Increase</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{percentResults.increase.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Monthly Net Increase (after tax)</span>
                    <span className="font-mono font-bold text-accent">
                      £{percentResults.monthlyIncreaseTax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Annual Net Increase (after tax)</span>
                    <span className="font-mono font-bold text-accent">
                      £{percentResults.annualIncreaseTax.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Real Terms Increase (vs inflation)</span>
                    <span className={`font-mono font-bold ${percentResults.realIncrease >= 0 ? 'text-accent' : 'text-red-600'}`}>
                      {percentResults.realIncrease >= 0 ? '+' : ''}{percentResults.realIncrease.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
