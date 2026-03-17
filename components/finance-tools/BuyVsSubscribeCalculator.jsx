'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BuyVsSubscribeCalculator() {
  const [productName, setProductName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [monthlySubscription, setMonthlySubscription] = useState(0);
  const [durationMonths, setDurationMonths] = useState(12);

  const results = useMemo(() => {
    const totalSubscriptionCost = monthlySubscription * durationMonths;
    const difference = totalSubscriptionCost - purchasePrice;
    const breakeven = monthlySubscription > 0 ? Math.ceil(purchasePrice / monthlySubscription) : 0;
    const savings = difference > 0 ? difference : 0;
    const costDifference = difference < 0 ? Math.abs(difference) : 0;

    return {
      totalSubscriptionCost,
      difference,
      breakeven,
      savings,
      costDifference,
      isBetter: difference > 0 ? 'Buying' : 'Subscribing',
    };
  }, [purchasePrice, monthlySubscription, durationMonths]);

  const reset = () => {
    setProductName('');
    setPurchasePrice(0);
    setMonthlySubscription(0);
    setDurationMonths(12);
  };

  const hasInputs = productName && purchasePrice > 0 && monthlySubscription > 0;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
          Buy vs Subscribe Calculator
        </h2>

        <div className="space-y-4 mb-6">
          <Input
            label="What are you buying?"
            placeholder="e.g., Software, Camera, Coffee Maker"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <Input
            label="One-time purchase price (£)"
            type="number"
            min={0}
            step={1}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
          />

          <Input
            label="Monthly subscription cost (£)"
            type="number"
            min={0}
            step={0.01}
            value={monthlySubscription}
            onChange={(e) => setMonthlySubscription(Number(e.target.value))}
          />

          <Input
            label="How long will you use it? (months)"
            type="number"
            min={1}
            step={1}
            value={durationMonths}
            onChange={(e) => setDurationMonths(Number(e.target.value))}
          />
        </div>

        {hasInputs && (
          <Button onClick={reset} variant="secondary" className="w-full">
            Clear
          </Button>
        )}
      </Card>

      {/* Results */}
      {hasInputs && (
        <>
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-accent/30 bg-accent/5">
              <h3 className="text-sm text-text-secondary font-medium mb-2">Buy Now</h3>
              <p className="font-heading text-3xl font-bold text-text-primary mb-2">
                £{purchasePrice.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-text-secondary">One-time payment</p>
            </Card>

            <Card className="border-accent/30 bg-accent/5">
              <h3 className="text-sm text-text-secondary font-medium mb-2">Subscribe for {durationMonths} months</h3>
              <p className="font-heading text-3xl font-bold text-text-primary mb-2">
                £{results.totalSubscriptionCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-text-secondary">
                £{monthlySubscription.toLocaleString('en-GB', { maximumFractionDigits: 2 })}/month
              </p>
            </Card>
          </div>

          {/* Recommendation */}
          <Card className="mb-6 bg-success/5 border-success/30">
            <div className="text-center">
              <p className="text-text-secondary text-sm mb-2">Better choice</p>
              <p className="font-heading text-4xl font-bold text-success mb-3">
                {results.isBetter}
              </p>

              {results.savings > 0 && (
                <div className="bg-white rounded-lg p-3 border border-success/20">
                  <p className="text-text-secondary text-xs mb-1">Savings</p>
                  <p className="font-mono text-2xl font-bold text-success">
                    £{results.savings.toLocaleString('en-GB', {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              )}

              {results.costDifference > 0 && (
                <div className="bg-white rounded-lg p-3 border border-success/20">
                  <p className="text-text-secondary text-xs mb-1">Extra cost</p>
                  <p className="font-mono text-2xl font-bold text-accent">
                    £{results.costDifference.toLocaleString('en-GB', {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Breakeven Analysis */}
          {results.breakeven > 0 && (
            <Card>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
                Breakeven Analysis
              </h3>

              <div className="bg-surface p-4 rounded-lg mb-4">
                <p className="text-text-secondary text-sm mb-2">You break even after</p>
                <p className="font-heading text-3xl font-bold text-accent">
                  {results.breakeven} {results.breakeven === 1 ? 'month' : 'months'}
                </p>
              </div>

              <p className="text-xs text-text-secondary">
                After {results.breakeven} months of subscription, you will have paid the same as buying
                {productName && ` ${productName}`}. If you'll use it longer, buying is better value.
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
