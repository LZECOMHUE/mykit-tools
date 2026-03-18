'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function AustraliaIncomeTaxCalculator() {
  const [salary, setSalary] = useState(65000);
  const [residencyStatus, setResidencyStatus] = useState('resident');
  const [hasPrivateHealth, setHasPrivateHealth] = useState(false);
  const [hasHECS, setHasHECS] = useState(false);
  const [hecsDebt, setHecsDebt] = useState(30000);

  const calculateTax = () => {
    let taxable = salary;
    let tax = 0;

    // Tax brackets 2024-25 (Stage 3 cuts)
    if (taxable > 190000) {
      tax += (taxable - 190000) * 0.45;
      taxable = 190000;
    }
    if (taxable > 135000) {
      tax += (taxable - 135000) * 0.37;
      taxable = 135000;
    }
    if (taxable > 45000) {
      tax += (taxable - 45000) * 0.30;
      taxable = 45000;
    }
    if (taxable > 18200) {
      tax += (taxable - 18200) * 0.16;
    }

    // Medicare Levy (2%)
    let medicareLevyAmount = 0;
    if (salary >= 26000) {
      medicareLevyAmount = salary * 0.02;
    }

    // Medicare Levy Surcharge (if no private health and income high enough)
    let surchargeAmount = 0;
    if (!hasPrivateHealth && salary > 97000) {
      if (salary <= 113000) {
        surchargeAmount = salary * 0.01;
      } else if (salary <= 151000) {
        surchargeAmount = salary * 0.0125;
      } else {
        surchargeAmount = salary * 0.015;
      }
    }

    // HECS-HELP repayment
    let hecsRepayment = 0;
    if (hasHECS && salary > 54435) {
      let repaymentRate = 0;
      if (salary >= 159663) repaymentRate = 0.1;
      else if (salary >= 157607) repaymentRate = 0.097;
      else if (salary >= 155584) repaymentRate = 0.094;
      else if (salary >= 153592) repaymentRate = 0.091;
      else if (salary >= 151632) repaymentRate = 0.088;
      else if (salary >= 149703) repaymentRate = 0.085;
      else if (salary >= 147805) repaymentRate = 0.082;
      else if (salary >= 145937) repaymentRate = 0.079;
      else if (salary >= 144099) repaymentRate = 0.076;
      else if (salary >= 142288) repaymentRate = 0.073;
      else if (salary >= 140506) repaymentRate = 0.07;
      else if (salary >= 138750) repaymentRate = 0.067;
      else if (salary >= 137020) repaymentRate = 0.064;
      else if (salary >= 135315) repaymentRate = 0.061;
      else if (salary >= 133635) repaymentRate = 0.058;
      else if (salary >= 131980) repaymentRate = 0.055;
      else if (salary >= 130348) repaymentRate = 0.052;
      else if (salary >= 128739) repaymentRate = 0.049;
      else if (salary >= 127153) repaymentRate = 0.046;
      else if (salary >= 125589) repaymentRate = 0.043;
      else if (salary >= 124046) repaymentRate = 0.04;
      else if (salary >= 122524) repaymentRate = 0.037;
      else if (salary >= 121022) repaymentRate = 0.034;
      else if (salary >= 119540) repaymentRate = 0.031;
      else if (salary >= 118077) repaymentRate = 0.028;
      else if (salary >= 116633) repaymentRate = 0.025;
      else if (salary >= 115206) repaymentRate = 0.024;
      else if (salary >= 113796) repaymentRate = 0.023;
      else if (salary >= 112403) repaymentRate = 0.022;
      else if (salary >= 111025) repaymentRate = 0.021;
      else if (salary >= 109663) repaymentRate = 0.02;
      else if (salary >= 108316) repaymentRate = 0.019;
      else if (salary >= 106983) repaymentRate = 0.018;
      else if (salary >= 105665) repaymentRate = 0.017;
      else if (salary >= 104361) repaymentRate = 0.016;
      else if (salary >= 103070) repaymentRate = 0.015;
      else if (salary >= 101793) repaymentRate = 0.014;
      else if (salary >= 100528) repaymentRate = 0.013;
      else if (salary >= 99276) repaymentRate = 0.012;
      else if (salary >= 98036) repaymentRate = 0.011;
      else if (salary >= 96808) repaymentRate = 0.01;
      else if (salary >= 95593) repaymentRate = 0.009;
      else if (salary >= 94389) repaymentRate = 0.008;
      else if (salary >= 93197) repaymentRate = 0.007;
      else if (salary >= 92016) repaymentRate = 0.006;
      else if (salary >= 90846) repaymentRate = 0.005;
      else if (salary >= 89688) repaymentRate = 0.035;
      else if (salary >= 88539) repaymentRate = 0.034;
      else if (salary >= 87401) repaymentRate = 0.033;
      else if (salary >= 86273) repaymentRate = 0.032;
      else if (salary >= 85156) repaymentRate = 0.031;
      else if (salary >= 84048) repaymentRate = 0.03;
      else if (salary >= 82950) repaymentRate = 0.029;
      else if (salary >= 81861) repaymentRate = 0.028;
      else if (salary >= 80782) repaymentRate = 0.027;
      else if (salary >= 79711) repaymentRate = 0.026;
      else if (salary >= 78649) repaymentRate = 0.025;
      else if (salary >= 77596) repaymentRate = 0.024;
      else if (salary >= 76551) repaymentRate = 0.023;
      else if (salary >= 75514) repaymentRate = 0.022;
      else if (salary >= 74485) repaymentRate = 0.021;
      else if (salary >= 73464) repaymentRate = 0.02;
      else if (salary >= 72451) repaymentRate = 0.019;
      else if (salary >= 71445) repaymentRate = 0.018;
      else if (salary >= 70447) repaymentRate = 0.017;
      else if (salary >= 69456) repaymentRate = 0.016;
      else if (salary >= 68472) repaymentRate = 0.015;
      else if (salary >= 67495) repaymentRate = 0.014;
      else if (salary >= 66525) repaymentRate = 0.013;
      else if (salary >= 65562) repaymentRate = 0.012;
      else if (salary >= 64651) repaymentRate = 0.025;
      else if (salary >= 60915) repaymentRate = 0.02;
      else if (salary >= 54435) repaymentRate = 0.01;

      hecsRepayment = salary * repaymentRate;
    }

    // Superannuation (employer pays 11.5% on top, not deducted)
    const superContribution = salary * 0.115;

    // Total deductions
    const totalDeductions = tax + medicareLevyAmount + surchargeAmount + hecsRepayment;

    // Take-home pay
    const takeHomePay = salary - totalDeductions;

    return {
      tax: Math.round(tax),
      medicareLevyAmount: Math.round(medicareLevyAmount),
      surchargeAmount: Math.round(surchargeAmount),
      hecsRepayment: Math.round(hecsRepayment),
      superContribution: Math.round(superContribution),
      totalDeductions: Math.round(totalDeductions),
      takeHomePay: Math.round(takeHomePay),
    };
  };

  const results = calculateTax();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Annual Income
        </h2>
        <Input
          type="number"
          label="Annual Salary (AUD)"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          placeholder="65000"
        />
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Residency & Insurance
        </h2>
        <div className="space-y-4">
          <Select
            label="Residency Status"
            value={residencyStatus}
            onChange={(e) => setResidencyStatus(e.target.value)}
            options={[
              { value: 'resident', label: 'Australian Tax Resident' },
              { value: 'non-resident', label: 'Non-Resident' },
              { value: 'working-holiday', label: 'Working Holiday Visa' },
            ]}
          />
          <Toggle
            label="Private Health Insurance"
            checked={hasPrivateHealth}
            onChange={setHasPrivateHealth}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          HECS-HELP Debt
        </h2>
        <div className="space-y-4">
          <Toggle
            label="Have HECS-HELP Debt"
            checked={hasHECS}
            onChange={setHasHECS}
          />
          {hasHECS && (
            <Input
              type="number"
              label="Current HECS-HELP Balance (AUD)"
              value={hecsDebt}
              onChange={(e) => setHecsDebt(Number(e.target.value))}
              placeholder="30000"
            />
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Tax Breakdown
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Income Tax</span>
              <span className="font-mono font-semibold text-primary">
                ${results.tax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Medicare Levy (2%)</span>
              <span className="font-mono font-semibold text-primary">
                ${results.medicareLevyAmount.toLocaleString()}
              </span>
            </div>
            {results.surchargeAmount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-secondary">Medicare Levy Surcharge</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.surchargeAmount.toLocaleString()}
                </span>
              </div>
            )}
            {results.hecsRepayment > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-secondary">HECS-HELP Repayment</span>
                <span className="font-mono font-semibold text-primary">
                  ${results.hecsRepayment.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-green-50 border border-green-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Total Deductions</span>
              <span className="font-mono font-semibold text-primary">
                ${results.totalDeductions.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Take-Home Pay</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.takeHomePay.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary">Employer Super Contribution</span>
              <span className="font-mono font-semibold text-primary">
                ${results.superContribution.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is based on the 2024-25 tax year (1 July 2024 - 30 June 2025). Tax laws change annually. For accurate tax advice, consult the ATO website or a licensed tax professional.
        </p>
      </Card>
    </div>
  );
}
