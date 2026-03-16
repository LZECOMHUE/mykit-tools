'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function VatCalculator() {
  const [activeTab, setActiveTab] = useState('add');
  const [amount, setAmount] = useState('100');
  const [vatRate, setVatRate] = useState('standard');
  const [removeAmount, setRemoveAmount] = useState('120');

  const vatRates = {
    standard: { rate: 20, label: 'Standard (20%)' },
    reduced: { rate: 5, label: 'Reduced (5%)' },
    zero: { rate: 0, label: 'Zero Rated (0%)' },
  };

  const addResults = useMemo(() => {
    const value = parseFloat(amount) || 0;
    const rate = vatRates[vatRate].rate;

    if (value <= 0) return null;

    const vat = (value * rate) / 100;
    const gross = value + vat;

    return {
      net: value,
      vat,
      gross,
      rate,
    };
  }, [amount, vatRate]);

  const removeResults = useMemo(() => {
    const value = parseFloat(removeAmount) || 0;
    const rate = vatRates[vatRate].rate;

    if (value <= 0) return null;

    // Gross = Net * (1 + rate/100)
    // So Net = Gross / (1 + rate/100)
    const net = value / (1 + rate / 100);
    const vat = value - net;

    return {
      net,
      vat,
      gross: value,
      rate,
    };
  }, [removeAmount, vatRate]);

  const commonAmounts = [10, 50, 100, 500, 1000];

  const getVatBreakdown = (amt) => {
    const rate = vatRates[vatRate].rate;
    const vat = (amt * rate) / 100;
    return {
      net: amt,
      vat,
      gross: amt + vat,
    };
  };

  return (
    <div className="space-y-6">
      <Tabs
        tabs={[
          { id: 'add', label: 'Add VAT' },
          { id: 'remove', label: 'Remove VAT' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Add VAT Tab */}
      {activeTab === 'add' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Add VAT to Price
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Net Price (before VAT)
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                VAT Rate
              </label>
              <Select
                value={vatRate}
                onChange={setVatRate}
                options={[
                  { value: 'standard', label: 'Standard (20%)' },
                  { value: 'reduced', label: 'Reduced (5%)' },
                  { value: 'zero', label: 'Zero Rated (0%)' },
                ]}
              />
            </div>
          </div>

          {addResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Gross Price (with VAT)</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{addResults.gross.toFixed(2)}
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Net Price</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{addResults.net.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">VAT Amount ({addResults.rate}%)</span>
                    <span className="font-mono font-bold text-accent">
                      £{addResults.vat.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Reference Table */}
              <div>
                <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">
                  Quick Reference
                </h3>
                <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-text-secondary text-left py-2 px-2 font-medium">
                          Net
                        </th>
                        <th className="text-text-secondary text-right py-2 px-2 font-medium">
                          VAT
                        </th>
                        <th className="text-text-secondary text-right py-2 px-2 font-medium">
                          Gross
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {commonAmounts.map((amt) => {
                        const breakdown = getVatBreakdown(amt);
                        return (
                          <tr
                            key={amt}
                            className="border-b border-border hover:bg-white transition-colors"
                          >
                            <td className="text-text-primary py-2 px-2 font-mono">
                              £{breakdown.net.toFixed(2)}
                            </td>
                            <td className="text-text-primary text-right py-2 px-2 font-mono">
                              £{breakdown.vat.toFixed(2)}
                            </td>
                            <td className="text-accent text-right py-2 px-2 font-mono font-bold">
                              £{breakdown.gross.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Remove VAT Tab */}
      {activeTab === 'remove' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Remove VAT from Price
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Gross Price (including VAT)
              </label>
              <Input
                type="number"
                value={removeAmount}
                onChange={(e) => setRemoveAmount(e.target.value)}
                placeholder="120"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                VAT Rate
              </label>
              <Select
                value={vatRate}
                onChange={setVatRate}
                options={[
                  { value: 'standard', label: 'Standard (20%)' },
                  { value: 'reduced', label: 'Reduced (5%)' },
                  { value: 'zero', label: 'Zero Rated (0%)' },
                ]}
              />
            </div>
          </div>

          {removeResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Net Price (without VAT)</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{removeResults.net.toFixed(2)}
                  </p>
                </div>
              </Card>

              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Gross Price</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{removeResults.gross.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">VAT Amount ({removeResults.rate}%)</span>
                    <span className="font-mono font-bold text-accent">
                      £{removeResults.vat.toFixed(2)}
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
