'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import Slider from '@/components/ui/Slider';

export default function AustraliaMortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [deposit, setDeposit] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);
  const [includeStampDuty, setIncludeStampDuty] = useState(true);
  const [state, setState] = useState('NSW');

  const calculateStampDuty = (price) => {
    let duty = 0;
    if (state === 'NSW') {
      if (price <= 15000) duty = 0;
      else if (price <= 33000) duty = price * 0.0125;
      else if (price <= 89000) duty = price * 0.015;
      else if (price <= 320000) duty = price * 0.0175;
      else if (price <= 1120000) duty = price * 0.035;
      else if (price <= 3320000) duty = price * 0.045;
      else duty = price * 0.055;
    } else if (state === 'VIC') {
      if (price <= 25000) duty = 0;
      else if (price <= 40000) duty = price * 0.014;
      else if (price <= 570000) duty = price * 0.025;
      else if (price <= 750000) duty = price * 0.04;
      else if (price <= 2000000) duty = price * 0.05;
      else duty = price * 0.055;
    } else if (state === 'QLD') {
      if (price <= 5000) duty = 0;
      else if (price <= 75000) duty = price * 0.01;
      else if (price <= 540000) duty = price * 0.03;
      else if (price <= 1000000) duty = price * 0.04;
      else duty = price * 0.0575;
    } else if (state === 'WA') {
      if (price <= 7000) duty = 0;
      else if (price <= 14000) duty = price * 0.019;
      else if (price <= 360000) duty = price * 0.025;
      else if (price <= 725000) duty = price * 0.035;
      else if (price <= 3000000) duty = price * 0.04;
      else duty = price * 0.0515;
    } else if (state === 'SA') {
      if (price <= 7000) duty = 0;
      else if (price <= 30000) duty = price * 0.015;
      else if (price <= 75000) duty = price * 0.02;
      else if (price <= 500000) duty = price * 0.025;
      else duty = price * 0.04;
    } else if (state === 'TAS') {
      if (price <= 3000) duty = 0;
      else if (price <= 20000) duty = price * 0.01;
      else if (price <= 60000) duty = price * 0.02;
      else if (price <= 540000) duty = price * 0.03;
      else duty = price * 0.035;
    } else if (state === 'ACT') {
      if (price <= 7500) duty = 0;
      else if (price <= 30000) duty = price * 0.015;
      else if (price <= 540000) duty = price * 0.025;
      else duty = price * 0.03;
    } else if (state === 'NT') {
      if (price <= 14000) duty = 0;
      else if (price <= 75000) duty = price * 0.02;
      else if (price <= 540000) duty = price * 0.035;
      else duty = price * 0.04;
    }
    return duty;
  };

  const calculateMortgage = () => {
    const stampDutyAmount = calculateStampDuty(propertyPrice);
    const depositAmount = deposit;
    let totalCosts = deposit;

    if (includeStampDuty) {
      totalCosts += stampDutyAmount;
    }

    const loanAmount = propertyPrice - deposit;
    const depositPercentage = (deposit / propertyPrice) * 100;

    // LMI calculation (rough estimate)
    let lmiAmount = 0;
    if (depositPercentage < 20) {
      const ltvRatio = (loanAmount / propertyPrice) * 100;
      if (ltvRatio >= 95) lmiAmount = loanAmount * 0.04;
      else if (ltvRatio >= 90) lmiAmount = loanAmount * 0.03;
      else if (ltvRatio >= 85) lmiAmount = loanAmount * 0.02;
      else if (ltvRatio >= 80) lmiAmount = loanAmount * 0.01;
    }

    // Monthly mortgage calculation
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalInterest = monthlyPayment * numberOfPayments - loanAmount;
    const totalRepaid = loanAmount + totalInterest;

    return {
      propertyPrice: Math.round(propertyPrice),
      depositAmount: Math.round(deposit),
      depositPercentage: depositPercentage.toFixed(1),
      loanAmount: Math.round(loanAmount),
      stampDutyAmount: Math.round(stampDutyAmount),
      lmiAmount: Math.round(lmiAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalRepaid: Math.round(totalRepaid),
      totalUpfrontCosts: Math.round(totalCosts + lmiAmount),
    };
  };

  const results = calculateMortgage();

  const depositPercentage = (deposit / propertyPrice) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Property & Loan Details
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Property Price (AUD)"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            placeholder="500000"
          />
          <Input
            type="number"
            label="Deposit Amount (AUD)"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            placeholder="100000"
          />
          <p className="text-sm text-muted">
            Deposit: {depositPercentage.toFixed(1)}% of property price
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Loan Terms
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Interest Rate: <span className="font-mono font-semibold text-primary">{interestRate}%</span>
            </label>
            <Slider
              min={2}
              max={10}
              step={0.25}
              value={interestRate}
              onChange={setInterestRate}
            />
          </div>
          <Select
            label="Loan Term"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            options={[
              { value: 25, label: '25 years' },
              { value: 30, label: '30 years' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Additional Costs
        </h2>
        <div className="space-y-4">
          <Toggle
            label="Include Stamp Duty in Loan Costs"
            checked={includeStampDuty}
            onChange={setIncludeStampDuty}
          />
          <Select
            label="State/Territory (for Stamp Duty)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={[
              { value: 'NSW', label: 'New South Wales (NSW)' },
              { value: 'VIC', label: 'Victoria (VIC)' },
              { value: 'QLD', label: 'Queensland (QLD)' },
              { value: 'WA', label: 'Western Australia (WA)' },
              { value: 'SA', label: 'South Australia (SA)' },
              { value: 'TAS', label: 'Tasmania (TAS)' },
              { value: 'ACT', label: 'Australian Capital Territory (ACT)' },
              { value: 'NT', label: 'Northern Territory (NT)' },
            ]}
          />
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="bg-blue-50 border border-blue-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Monthly Repayment
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Loan Amount</span>
              <span className="font-mono font-semibold text-primary">
                ${results.loanAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Interest Rate</span>
              <span className="font-mono font-semibold text-primary">
                {interestRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Loan Term</span>
              <span className="font-mono font-semibold text-primary">
                {loanTerm} years
              </span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Monthly Payment</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.monthlyPayment.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border border-green-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Total Interest Over Loan Term
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Total Repaid</span>
              <span className="font-mono font-semibold text-primary">
                ${results.totalRepaid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Loan Principal</span>
              <span className="font-mono font-semibold text-primary">
                ${results.loanAmount.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Total Interest</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.totalInterest.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {results.lmiAmount > 0 && (
          <Card className="bg-orange-50 border border-orange-200">
            <h2 className="font-heading text-lg font-bold text-primary mb-4">
              Lenders Mortgage Insurance (LMI)
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-secondary">
                Your deposit is less than 20% of the property price. LMI may be required.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-secondary">Estimated LMI Cost</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.lmiAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        )}

        <Card className="bg-purple-50 border border-purple-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Upfront Costs Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Deposit</span>
              <span className="font-mono font-semibold text-primary">
                ${results.depositAmount.toLocaleString()}
              </span>
            </div>
            {results.stampDutyAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-secondary">Stamp Duty</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.stampDutyAmount.toLocaleString()}
                </span>
              </div>
            )}
            {results.lmiAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-secondary">LMI</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.lmiAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="border-t border-purple-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Total Upfront</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.totalUpfrontCosts.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary mb-2">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only. Actual monthly payments may vary based on fees, offset accounts, extra payments, and interest rate changes. Lenders mortgage insurance costs are estimates. Consult a mortgage broker or lender for accurate quotes.
        </p>
        <p className="text-sm text-secondary">
          <strong>Additional Costs Not Included:</strong> Building inspections, legal fees, settlement costs, home insurance, property management fees (if investment), and council rates.
        </p>
      </Card>
    </div>
  );
}
