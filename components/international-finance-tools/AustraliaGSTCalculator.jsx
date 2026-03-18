'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AustraliaGSTCalculator() {
  const [amount, setAmount] = useState(100);
  const [direction, setDirection] = useState('addGST');

  const GST_RATE = 0.1; // 10% GST in Australia

  const calculateGST = () => {
    if (direction === 'addGST') {
      const gstAmount = amount * GST_RATE;
      const total = amount + gstAmount;
      return {
        baseAmount: amount,
        gstAmount: gstAmount,
        totalAmount: total,
        type: 'add',
      };
    } else if (direction === 'removeGST') {
      const baseAmount = amount / (1 + GST_RATE);
      const gstAmount = amount - baseAmount;
      return {
        baseAmount: baseAmount,
        gstAmount: gstAmount,
        totalAmount: amount,
        type: 'remove',
      };
    } else if (direction === 'findGST') {
      const gstAmount = amount * GST_RATE;
      const baseAmount = amount;
      const total = amount + gstAmount;
      return {
        baseAmount: baseAmount,
        gstAmount: gstAmount,
        totalAmount: total,
        type: 'find',
      };
    }
  };

  const results = calculateGST();

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value.toFixed(2));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          GST Calculator
        </h2>
        <div className="space-y-4">
          <Select
            label="Calculation Type"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            options={[
              { value: 'addGST', label: 'Add 10% GST to amount' },
              { value: 'removeGST', label: 'Remove GST from total' },
              { value: 'findGST', label: 'Find GST on amount' },
            ]}
          />
          <Input
            type="number"
            label={
              direction === 'addGST'
                ? 'Amount Excluding GST (AUD)'
                : direction === 'removeGST'
                ? 'Amount Including GST (AUD)'
                : 'Amount (AUD)'
            }
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="100"
            step="0.01"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {direction === 'addGST' && (
          <Card className="p-6 bg-blue-50 border border-blue-200">
            <h2 className="font-heading text-lg font-bold text-primary mb-4">
              Add 10% GST
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary">Amount (excl. GST)</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.baseAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">GST (10%)</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                <span className="text-secondary font-semibold">Total (incl. GST)</span>
                <span className="font-mono font-bold text-lg text-primary">
                  ${results.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        )}

        {direction === 'removeGST' && (
          <Card className="p-6 bg-blue-50 border border-blue-200">
            <h2 className="font-heading text-lg font-bold text-primary mb-4">
              Remove 10% GST
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary">Amount (incl. GST)</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">GST Component (10%)</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                <span className="text-secondary font-semibold">Amount (excl. GST)</span>
                <span className="font-mono font-bold text-lg text-primary">
                  ${results.baseAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        )}

        {direction === 'findGST' && (
          <Card className="p-6 bg-blue-50 border border-blue-200">
            <h2 className="font-heading text-lg font-bold text-primary mb-4">
              Find GST Amount
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary">Base Amount</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.baseAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">GST @ 10%</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                <span className="text-secondary font-semibold">Total (incl. GST)</span>
                <span className="font-mono font-bold text-lg text-primary">
                  ${results.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-green-50 border border-green-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Quick Reference
          </h2>
          <div className="space-y-2 text-sm">
            <p className="text-secondary">
              <strong>GST Rate in Australia:</strong> 10% (Goods and Services Tax)
            </p>
            <p className="text-secondary">
              <strong>Formula:</strong> Amount with GST = Amount × 1.10
            </p>
            <p className="text-secondary">
              <strong>Reverse Formula:</strong> Amount without GST = Amount ÷ 1.10
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only. GST is 10% in Australia and applies to most goods and services. Some items are GST-free (basic food, medical supplies, etc.). For accurate calculations and GST compliance, consult the Australian Taxation Office (ATO) website.
        </p>
      </Card>
    </div>
  );
}
