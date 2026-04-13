'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const PURITY_DATA = {
  '24ct': { name: '24 Carat', purity: 99.9, description: 'Investment, coins', defaultRate: 7500 },
  '22ct': { name: '22 Carat', purity: 91.6, description: 'Most jewellery in India', defaultRate: 6875 },
  '18ct': { name: '18 Carat', purity: 75, description: 'International jewellery', defaultRate: 5625 },
};

export default function IndiaGoldRateCalculator() {
  const [weight, setWeight] = useState('10');
  const [carat, setCarat] = useState('22ct');
  const [ratePerGram, setRatePerGram] = useState(PURITY_DATA['22ct'].defaultRate.toString());
  const [makingChargesPercent, setMakingChargesPercent] = useState('10');

  const calculations = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const rate = parseFloat(ratePerGram) || 0;
    const makingPercent = parseFloat(makingChargesPercent) || 0;

    if (w <= 0 || rate <= 0) {
      return { goldValue: 0, makingCharges: 0, totalPrice: 0, error: true };
    }

    const goldValue = w * rate;
    const makingCharges = (goldValue * makingPercent) / 100;
    const totalPrice = goldValue + makingCharges;

    return {
      goldValue: Math.round(goldValue),
      makingCharges: Math.round(makingCharges),
      totalPrice: Math.round(totalPrice),
      error: false,
    };
  }, [weight, ratePerGram, makingChargesPercent]);

  const handleCaratChange = (newCarat) => {
    setCarat(newCarat);
    setRatePerGram(PURITY_DATA[newCarat].defaultRate.toString());
  };

  const handleReset = () => {
    setWeight('10');
    setCarat('22ct');
    setRatePerGram(PURITY_DATA['22ct'].defaultRate.toString());
    setMakingChargesPercent('10');
  };

  const purityInfo = PURITY_DATA[carat];

  return (
    <div className="space-y-4">
      <Card className="bg-accent-muted">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Gold Purity
            </label>
            <div className="flex gap-3">
              {Object.entries(PURITY_DATA).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleCaratChange(key)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                    carat === key
                      ? 'border-accent bg-accent text-white'
                      : 'border-border bg-white text-primary hover:border-accent'
                  }`}
                >
                  {data.name}
                </button>
              ))}
            </div>
            <p className="text-sm text-secondary mt-2">
              {purityInfo.purity}% pure - {purityInfo.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Weight (grams)
            </label>
            <Input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Gold Rate (₹ per gram)
            </label>
            <Input
              type="number"
              value={ratePerGram}
              onChange={(e) => setRatePerGram(e.target.value)}
              placeholder="Enter current gold rate"
              className="w-full"
            />
            <p className="text-xs text-muted mt-1">Check current market rates for accuracy</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Making Charges (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={makingChargesPercent}
              onChange={(e) => setMakingChargesPercent(e.target.value)}
              placeholder="Enter making charges percentage"
              className="w-full"
            />
          </div>

          <Button onClick={handleReset} variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Card>

      {!calculations.error && (
        <>
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Gold Value ({weight}g @ ₹{parseFloat(ratePerGram).toLocaleString('en-IN')}/g)</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.goldValue.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Making Charges ({makingChargesPercent}%)</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.makingCharges.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-heading font-bold text-primary">Total Price</span>
                <span className="font-mono text-2xl font-bold text-accent">
                  ₹{calculations.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <p className="text-sm text-secondary">
              <strong>Note:</strong> Gold rates fluctuate based on market conditions. Always verify current rates with a jeweller or reliable source before making a purchase.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
