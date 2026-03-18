'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';

const EMI_PRESETS = {
  homeLoan: { name: 'Home Loan', min: 8, max: 10, default: 9 },
  carLoan: { name: 'Car Loan', min: 7, max: 12, default: 9.5 },
  personalLoan: { name: 'Personal Loan', min: 10, max: 18, default: 14 },
  educationLoan: { name: 'Education Loan', min: 8, max: 14, default: 11 },
};

export default function IndiaEMICalculator() {
  const [amount, setAmount] = useState('2500000');
  const [rate, setRate] = useState('9');
  const [tenure, setTenure] = useState('240');
  const [tenureType, setTenureType] = useState('months');
  const [selectedPreset, setSelectedPreset] = useState('homeLoan');

  const totalMonths = useMemo(() => {
    const val = parseInt(tenure) || 0;
    return tenureType === 'years' ? val * 12 : val;
  }, [tenure, tenureType]);

  const calculations = useMemo(() => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const months = totalMonths;

    if (P <= 0 || annualRate < 0 || months <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0, error: true };
    }

    const monthlyRate = annualRate / 100 / 12;

    let emi;
    if (monthlyRate === 0) {
      emi = P / months;
    } else {
      const numerator = P * monthlyRate * Math.pow(1 + monthlyRate, months);
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      emi = numerator / denominator;
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      error: false,
    };
  }, [amount, rate, totalMonths]);

  const handlePresetSelect = (presetKey) => {
    setSelectedPreset(presetKey);
    const preset = EMI_PRESETS[presetKey];
    setRate(preset.default.toString());
  };

  const handleReset = () => {
    setAmount('2500000');
    setRate('9');
    setTenure('240');
    setTenureType('months');
    setSelectedPreset('homeLoan');
  };

  const principalPercent =
    calculations.totalPayment > 0
      ? (parseFloat(amount) / calculations.totalPayment) * 100
      : 0;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="space-y-6">
      <Tabs
        tabs={Object.entries(EMI_PRESETS).map(([key, preset]) => ({
          id: key,
          label: preset.name,
          content: null,
        }))}
        activeTab={selectedPreset}
        onTabChange={handlePresetSelect}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Loan Amount (₹)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Annual Interest Rate (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Loan Tenure
              </label>
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Duration Type
              </label>
              <Select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value)}
                options={[
                  { value: 'months', label: 'Months' },
                  { value: 'years', label: 'Years' },
                ]}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {!calculations.error && (
        <>
          <Card className="p-6 bg-accent-muted">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Monthly EMI
            </h3>
            <p className="font-mono text-3xl font-bold text-accent">
              ₹{calculations.emi.toLocaleString('en-IN')}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <p className="text-sm text-secondary mb-1">Total Interest Payable</p>
              <p className="font-mono text-xl font-bold text-primary">
                ₹{calculations.totalInterest.toLocaleString('en-IN')}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-secondary mb-1">Total Payment</p>
              <p className="font-mono text-xl font-bold text-primary">
                ₹{calculations.totalPayment.toLocaleString('en-IN')}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Principal vs Interest Breakdown
            </h3>
            <div className="flex gap-3 h-12 rounded-lg overflow-hidden border border-border">
              <div
                className="bg-accent flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${principalPercent}%` }}
              >
                {principalPercent > 10 && `${principalPercent.toFixed(0)}%`}
              </div>
              <div
                className="bg-warning flex items-center justify-center text-white font-bold text-sm"
                style={{ width: `${interestPercent}%` }}
              >
                {interestPercent > 10 && `${interestPercent.toFixed(0)}%`}
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent rounded"></div>
                <span className="text-secondary">
                  Principal: ₹{parseFloat(amount).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-secondary">
                  Interest: ₹{calculations.totalInterest.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
