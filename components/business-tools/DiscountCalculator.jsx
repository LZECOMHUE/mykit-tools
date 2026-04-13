'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function DiscountCalculator() {
  const [activeTab, setActiveTab] = useState('calculate');
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [finalPrice, setFinalPrice] = useState('');

  const discountResults = useMemo(() => {
    const original = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;

    if (original <= 0) return null;

    const discountAmount = (original * discount) / 100;
    const discounted = original - discountAmount;

    return {
      discountAmount,
      discountedPrice: discounted,
      percentSaved: discount,
    };
  }, [originalPrice, discountPercent]);

  const reverseResults = useMemo(() => {
    const original = parseFloat(originalPrice) || 0;
    const final = parseFloat(finalPrice) || 0;

    if (original <= 0 || final > original) return null;

    const saved = original - final;
    const discountRate = (saved / original) * 100;

    return {
      amountSaved: saved,
      discountRate,
    };
  }, [originalPrice, finalPrice]);

  const bulkDiscounts = [5, 10, 15, 20, 25, 30, 40, 50];

  const getBulkSavings = (percent) => {
    const original = parseFloat(originalPrice) || 0;
    if (original <= 0) return null;
    return {
      percent,
      saved: (original * percent) / 100,
      final: original - (original * percent) / 100,
    };
  };

  return (
    <div className="space-y-4">
      <Tabs
        tabs={[
          { id: 'calculate', label: 'Calculate Discount' },
          { id: 'reverse', label: 'Find Discount Rate' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Calculate Discount Tab */}
      {activeTab === 'calculate' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Calculate Discount
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Original Price
              </label>
              <Input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="100"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Discount Percentage
              </label>
              <Input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="20"
                min="0"
                max="100"
              />
            </div>
          </div>

          {discountResults && (
            <div className="space-y-4">
              <Card className="bg-accent-muted border-2 border-accent">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-accent text-xs mb-1">Amount Saved</p>
                    <p className="font-mono text-2xl font-bold text-accent">
                      £{discountResults.discountAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-accent text-xs mb-1">Final Price</p>
                    <p className="font-mono text-2xl font-bold text-accent">
                      £{discountResults.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Bulk Discount Table */}
              <div>
                <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">
                  Bulk Discount Reference
                </h3>
                <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-text-secondary text-left py-2 px-2 font-medium">
                          Discount
                        </th>
                        <th className="text-text-secondary text-right py-2 px-2 font-medium">
                          You Save
                        </th>
                        <th className="text-text-secondary text-right py-2 px-2 font-medium">
                          Final Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkDiscounts.map((percent) => {
                        const savings = getBulkSavings(percent);
                        if (!savings) return null;
                        return (
                          <tr
                            key={percent}
                            className="border-b border-border hover:bg-white transition-colors"
                          >
                            <td className="text-text-primary py-2 px-2 font-mono">
                              {percent}%
                            </td>
                            <td className="text-text-primary text-right py-2 px-2 font-mono">
                              £{savings.saved.toFixed(2)}
                            </td>
                            <td className="text-accent text-right py-2 px-2 font-mono font-bold">
                              £{savings.final.toFixed(2)}
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

      {/* Reverse Calculation Tab */}
      {activeTab === 'reverse' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Find Discount Rate
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Original Price
              </label>
              <Input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="100"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Final Price (after discount)
              </label>
              <Input
                type="number"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                placeholder="80"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {reverseResults && (
            <Card className="bg-accent-muted border-2 border-accent">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-accent text-xs mb-1">Discount Rate</p>
                  <p className="font-mono text-2xl font-bold text-accent">
                    {reverseResults.discountRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-accent text-xs mb-1">Amount Saved</p>
                  <p className="font-mono text-2xl font-bold text-accent">
                    £{reverseResults.amountSaved.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {reverseResults === null && finalPrice && (
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-4">
              <p className="text-red-600 text-sm">
                Final price must be less than original price.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
