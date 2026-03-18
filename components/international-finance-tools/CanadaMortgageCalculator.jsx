'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CanadaMortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const mortgageAmount = homePrice - downPaymentAmount;

  // Calculate monthly payment using standard mortgage formula
  const getPaymentAmount = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = amortizationYears * 12;

    if (monthlyRate === 0) {
      return mortgageAmount / numberOfPayments;
    }

    const monthlyPayment =
      (mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Convert to selected frequency
    const frequencyMultipliers = {
      weekly: 12 / 52,
      biweekly: 12 / 26,
      semimonthly: 12 / 24,
      monthly: 1,
    };

    return monthlyPayment / frequencyMultipliers[paymentFrequency];
  };

  const paymentAmount = getPaymentAmount();

  // Calculate total interest
  const getPaymentsPerYear = () => {
    const frequencies = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
    };
    return frequencies[paymentFrequency];
  };

  const totalPayments = paymentAmount * getPaymentsPerYear() * amortizationYears;
  const totalInterest = totalPayments - mortgageAmount;
  const totalCost = homePrice + totalInterest;

  // Stress test calculation
  const stressTestRate = Math.max(interestRate + 2, 5.25);
  const stressTestMonthlyRate = stressTestRate / 100 / 12;
  const stressTestMonthlyPayment =
    (mortgageAmount * (stressTestMonthlyRate * Math.pow(1 + stressTestMonthlyRate, amortizationYears * 12))) /
    (Math.pow(1 + stressTestMonthlyRate, amortizationYears * 12) - 1);

  const frequencyMultipliers = {
    weekly: 12 / 52,
    biweekly: 12 / 26,
    semimonthly: 12 / 24,
    monthly: 1,
  };

  const stressTestPayment = stressTestMonthlyPayment / frequencyMultipliers[paymentFrequency];

  // Check if need CMHC insurance (down payment < 20%)
  const needsMortgageInsurance = downPaymentPercent < 20;
  const mortgageInsuranceRate = downPaymentPercent < 10 ? 0.0380 : downPaymentPercent < 15 ? 0.0260 : 0.0160;
  const mortgageInsuranceAmount = needsMortgageInsurance ? mortgageAmount * mortgageInsuranceRate : 0;

  const maxDownPaymentForMaxAmortization = downPaymentPercent < 20;
  const maxAmortization = maxDownPaymentForMaxAmortization ? 25 : 30;

  const frequencyLabels = {
    weekly: 'Weekly',
    biweekly: 'Bi-Weekly',
    semimonthly: 'Semi-Monthly',
    monthly: 'Monthly',
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Mortgage Details
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Home Price ($ CAD)"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            placeholder="500000"
          />
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Down Payment: {downPaymentPercent}%
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-muted mt-1">
              Amount: ${downPaymentAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <Input
            type="number"
            label="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            placeholder="5.5"
            step="0.01"
          />
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Amortization Period (years)
            </label>
            <Select
              value={amortizationYears}
              onChange={(e) => setAmortizationYears(Number(e.target.value))}
              options={[
                { value: 15, label: '15 years' },
                { value: 20, label: '20 years' },
                { value: 25, label: '25 years' },
                ...(downPaymentPercent >= 20 ? [{ value: 30, label: '30 years' }] : []),
              ]}
            />
            {downPaymentPercent < 20 && (
              <p className="text-xs text-muted mt-1">
                Maximum 25 years with down payment less than 20%
              </p>
            )}
          </div>
          <Select
            label="Payment Frequency"
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'biweekly', label: 'Bi-Weekly' },
              { value: 'semimonthly', label: 'Semi-Monthly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Payment Details
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Home Price</span>
            <span className="font-mono font-semibold text-primary">
              ${homePrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Down Payment</span>
            <span className="font-mono font-semibold text-primary">
              ${downPaymentAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Mortgage Amount</span>
            <span className="font-mono font-semibold text-primary">
              ${mortgageAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </span>
          </div>
          {needsMortgageInsurance && (
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">CMHC Insurance</span>
              <span className="font-mono font-semibold text-primary">
                ${mortgageInsuranceAmount.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
              </span>
            </div>
          )}
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">{frequencyLabels[paymentFrequency]} Payment</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${paymentAmount.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Mortgage Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Amortization Period</span>
            <span className="font-mono font-semibold text-primary">
              {amortizationYears} years
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Interest Rate</span>
            <span className="font-mono font-semibold text-primary">
              {interestRate}%
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary">Total Interest Paid</span>
            <span className="font-mono font-semibold text-primary">
              ${totalInterest.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Total Cost</span>
            <span className="font-mono font-semibold text-primary">
              ${totalCost.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-orange-50 border border-orange-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Mortgage Stress Test
        </h2>
        <p className="text-sm text-secondary mb-4">
          Canadian lenders require you to qualify at a higher rate. You must be able to afford payments at the greater of:
        </p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary text-sm">Contract Rate + 2%</span>
            <span className="font-mono font-semibold text-primary">
              {(interestRate + 2).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary text-sm">Bank of Canada Qualifying Rate (5.25%)</span>
            <span className="font-mono font-semibold text-primary">
              5.25%
            </span>
          </div>
          <div className="border-t border-orange-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Stress Test Rate</span>
            <span className="font-mono font-bold text-primary">
              {stressTestRate.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary font-semibold">Required {frequencyLabels[paymentFrequency]} Payment</span>
            <span className="font-mono font-bold text-lg text-orange-600">
              ${stressTestPayment.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-secondary pt-2">
            You must demonstrate you can afford ${stressTestPayment.toLocaleString('en-CA', { maximumFractionDigits: 2 })} {frequencyLabels[paymentFrequency].toLowerCase()} to qualify for this mortgage.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation only. Actual mortgage payments depend on your credit score, lender fees, property taxes, insurance, HOA fees, and current lending rates. Canadian mortgages typically have 5-year terms with automatic renewal or refinancing every 5 years within the amortization period. Consult a mortgage broker or your bank for personalized pre-qualification and exact terms.
        </p>
      </Card>
    </div>
  );
}
