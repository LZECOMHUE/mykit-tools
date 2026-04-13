'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CanadaGSTHSTCalculator() {
  const [amount, setAmount] = useState(100);
  const [province, setProvince] = useState('on');
  const [direction, setDirection] = useState('add');

  const taxRates = {
    ab: { rate: 0.05, name: 'GST' },
    bc: { rate: 0.12, name: 'GST + PST (5% + 7%)' },
    mb: { rate: 0.12, name: 'GST + RST (5% + 7%)' },
    nb: { rate: 0.15, name: 'HST' },
    nl: { rate: 0.15, name: 'HST' },
    ns: { rate: 0.15, name: 'HST' },
    nt: { rate: 0.05, name: 'GST' },
    nu: { rate: 0.05, name: 'GST' },
    on: { rate: 0.13, name: 'HST' },
    pe: { rate: 0.15, name: 'HST' },
    qc: { rate: 0.14975, name: 'GST + QST (5% + 9.975%)' },
    sk: { rate: 0.11, name: 'GST + PST (5% + 6%)' },
    yt: { rate: 0.05, name: 'GST' },
  };

  const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
  ];

  const taxRate = taxRates[province];

  let pretaxAmount, taxAmount, totalAmount;

  if (direction === 'add') {
    pretaxAmount = amount;
    taxAmount = amount * taxRate.rate;
    totalAmount = amount + taxAmount;
  } else if (direction === 'remove') {
    totalAmount = amount;
    pretaxAmount = amount / (1 + taxRate.rate);
    taxAmount = totalAmount - pretaxAmount;
  } else if (direction === 'find') {
    totalAmount = amount;
    pretaxAmount = amount / (1 + taxRate.rate);
    taxAmount = totalAmount - pretaxAmount;
  }

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Tax Calculator
        </h2>
        <div className="space-y-4">
          <Select
            label="Province/Territory"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            options={provinces}
          />
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Calculate
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="add"
                  checked={direction === 'add'}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-secondary">Add tax to amount</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="remove"
                  checked={direction === 'remove'}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-secondary">Remove tax from amount</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="find"
                  checked={direction === 'find'}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-secondary">Find tax component</span>
              </label>
            </div>
          </div>
          <Input
            type="number"
            label={
              direction === 'add'
                ? 'Amount Before Tax ($ CAD)'
                : direction === 'remove'
                  ? 'Total Amount ($ CAD)'
                  : 'Total Amount ($ CAD)'
            }
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="100"
            step="0.01"
          />
        </div>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Tax Rate
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Province/Territory</span>
            <span className="font-mono font-semibold text-primary">
              {provinces.find((p) => p.value === province)?.label}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Tax Type</span>
            <span className="font-mono font-semibold text-primary">
              {taxRate.name}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Total Rate</span>
            <span className="font-mono font-bold text-lg text-primary">
              {(taxRate.rate * 100).toFixed(3)}%
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Calculation Results
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Amount Before Tax</span>
            <span className="font-mono font-semibold text-primary">
              ${pretaxAmount.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">
              Tax ({(taxRate.rate * 100).toFixed(3)}%)
            </span>
            <span className="font-mono font-semibold text-primary">
              ${taxAmount.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Total Amount</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${totalAmount.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Canadian Sales Tax Rates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-secondary font-semibold">
                  Province/Territory
                </th>
                <th className="text-right py-2 px-2 text-secondary font-semibold">
                  Rate
                </th>
                <th className="text-left py-2 px-2 text-secondary font-semibold">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Alberta</td>
                <td className="text-right py-2 px-2 font-mono text-primary">5%</td>
                <td className="py-2 px-2 text-secondary text-sm">GST only</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">British Columbia</td>
                <td className="text-right py-2 px-2 font-mono text-primary">12%</td>
                <td className="py-2 px-2 text-secondary text-sm">5% GST + 7% PST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Manitoba</td>
                <td className="text-right py-2 px-2 font-mono text-primary">12%</td>
                <td className="py-2 px-2 text-secondary text-sm">5% GST + 7% RST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">New Brunswick</td>
                <td className="text-right py-2 px-2 font-mono text-primary">15%</td>
                <td className="py-2 px-2 text-secondary text-sm">HST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Newfoundland & Labrador</td>
                <td className="text-right py-2 px-2 font-mono text-primary">15%</td>
                <td className="py-2 px-2 text-secondary text-sm">HST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Nova Scotia</td>
                <td className="text-right py-2 px-2 font-mono text-primary">15%</td>
                <td className="py-2 px-2 text-secondary text-sm">HST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Northwest Territories</td>
                <td className="text-right py-2 px-2 font-mono text-primary">5%</td>
                <td className="py-2 px-2 text-secondary text-sm">GST only</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Nunavut</td>
                <td className="text-right py-2 px-2 font-mono text-primary">5%</td>
                <td className="py-2 px-2 text-secondary text-sm">GST only</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Ontario</td>
                <td className="text-right py-2 px-2 font-mono text-primary">13%</td>
                <td className="py-2 px-2 text-secondary text-sm">HST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Prince Edward Island</td>
                <td className="text-right py-2 px-2 font-mono text-primary">15%</td>
                <td className="py-2 px-2 text-secondary text-sm">HST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Quebec</td>
                <td className="text-right py-2 px-2 font-mono text-primary">14.975%</td>
                <td className="py-2 px-2 text-secondary text-sm">5% GST + 9.975% QST</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2 px-2 text-primary">Saskatchewan</td>
                <td className="text-right py-2 px-2 font-mono text-primary">11%</td>
                <td className="py-2 px-2 text-secondary text-sm">5% GST + 6% PST</td>
              </tr>
              <tr className="hover:bg-surface">
                <td className="py-2 px-2 text-primary">Yukon</td>
                <td className="text-right py-2 px-2 font-mono text-primary">5%</td>
                <td className="py-2 px-2 text-secondary text-sm">GST only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator uses current tax rates as of March 2025. Sales tax rates are subject to change. Some items are exempt from sales tax (groceries, medicine, etc.). For business purposes, consult the Canada Revenue Agency (CRA) website or a tax accountant for detailed tax compliance requirements.
        </p>
      </Card>
    </div>
  );
}
