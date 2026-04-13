'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function CanadaPaycheckCalculator() {
  const [salaryType, setSalaryType] = useState('salary');
  const [amount, setAmount] = useState(65000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [province, setProvince] = useState('on');
  const [rrspDeductionPerPeriod, setRrspDeductionPerPeriod] = useState(0);

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

  const getAnnualSalary = () => {
    if (salaryType === 'salary') {
      return amount;
    } else {
      return hourlyRate * hoursPerWeek * 52;
    }
  };

  const getPeriodsPerYear = () => {
    const periods = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
    };
    return periods[payFrequency] || 26;
  };

  const calculateFederalTaxOnAmount = (taxableAmount) => {
    const BPA = 16129 / getPeriodsPerYear();
    const federallyTaxable = Math.max(0, taxableAmount - BPA);
    let tax = 0;

    // Simplified calculation for one period
    const annualEquivalent = federallyTaxable * getPeriodsPerYear();
    if (annualEquivalent > 220000) {
      tax = ((annualEquivalent - 220000) * 0.33 +
             (220000 - 158468) * 0.29 +
             (158468 - 114750) * 0.26 +
             (114750 - 57375) * 0.205 +
             57375 * 0.15) / getPeriodsPerYear();
    } else if (annualEquivalent > 158468) {
      tax = ((annualEquivalent - 158468) * 0.29 +
             (158468 - 114750) * 0.26 +
             (114750 - 57375) * 0.205 +
             57375 * 0.15) / getPeriodsPerYear();
    } else if (annualEquivalent > 114750) {
      tax = ((annualEquivalent - 114750) * 0.26 +
             (114750 - 57375) * 0.205 +
             57375 * 0.15) / getPeriodsPerYear();
    } else if (annualEquivalent > 57375) {
      tax = ((annualEquivalent - 57375) * 0.205 + 57375 * 0.15) / getPeriodsPerYear();
    } else {
      tax = (annualEquivalent * 0.15) / getPeriodsPerYear();
    }

    return Math.max(0, tax);
  };

  const calculateProvincialTaxOnAmount = (taxableAmount) => {
    // Ontario example - simplified
    let rate = 0.0505;
    if (province === 'ab') rate = 0.1;
    else if (province === 'bc') rate = 0.0506;
    else if (province === 'qc') rate = 0.15;
    else if (province === 'sk') rate = 0.105;

    return taxableAmount * rate;
  };

  const annualSalary = getAnnualSalary();
  const periodsPerYear = getPeriodsPerYear();
  const grossPerPeriod = annualSalary / periodsPerYear;
  const taxablePerPeriod = Math.max(0, grossPerPeriod - rrspDeductionPerPeriod);

  const federalTaxPerPeriod = calculateFederalTaxOnAmount(taxablePerPeriod);
  const provincialTaxPerPeriod = calculateProvincialTaxOnAmount(taxablePerPeriod);

  // CPP and EI are based on annual amounts
  const cppAnnual = province === 'qc' ? 0 : Math.min(annualSalary * 0.0595, 4034);
  const eiAnnual = Math.min(annualSalary * 0.0164, 1077);

  const cppPerPeriod = cppAnnual / periodsPerYear;
  const eiPerPeriod = eiAnnual / periodsPerYear;

  const totalDeductionsPerPeriod = federalTaxPerPeriod + provincialTaxPerPeriod + cppPerPeriod + eiPerPeriod + rrspDeductionPerPeriod;
  const netPayPerPeriod = Math.max(0, grossPerPeriod - totalDeductionsPerPeriod);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Income Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Income Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="salary"
                  checked={salaryType === 'salary'}
                  onChange={(e) => setSalaryType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-secondary">Annual Salary</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="hourly"
                  checked={salaryType === 'hourly'}
                  onChange={(e) => setSalaryType(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-secondary">Hourly Rate</span>
              </label>
            </div>
          </div>

          {salaryType === 'salary' ? (
            <Input
              type="number"
              label="Annual Salary ($ CAD)"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="65000"
            />
          ) : (
            <>
              <Input
                type="number"
                label="Hourly Rate ($ CAD)"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                placeholder="25"
              />
              <Input
                type="number"
                label="Hours Per Week"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                placeholder="40"
              />
            </>
          )}

          <Select
            label="Pay Frequency"
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value)}
            options={[
              { value: 'weekly', label: 'Weekly (52 pays/year)' },
              { value: 'biweekly', label: 'Bi-Weekly (26 pays/year)' },
              { value: 'semimonthly', label: 'Semi-Monthly (24 pays/year)' },
              { value: 'monthly', label: 'Monthly (12 pays/year)' },
            ]}
          />

          <Select
            label="Province/Territory"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            options={provinces}
          />

          <Input
            type="number"
            label={`RRSP Deduction Per ${payFrequency === 'weekly' ? 'Week' : payFrequency === 'biweekly' ? 'Two Weeks' : payFrequency === 'semimonthly' ? 'Half-Month' : 'Month'} ($ CAD)`}
            value={rrspDeductionPerPeriod}
            onChange={(e) => setRrspDeductionPerPeriod(Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Paycheck Breakdown
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Gross Pay</span>
            <span className="font-mono font-semibold text-primary">
              ${grossPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Federal Income Tax</span>
              <span className="font-mono font-semibold text-primary">
                -${federalTaxPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Provincial Income Tax</span>
              <span className="font-mono font-semibold text-primary">
                -${provincialTaxPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">CPP Contribution</span>
              <span className="font-mono font-semibold text-primary">
                -${cppPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">EI Premium</span>
              <span className="font-mono font-semibold text-primary">
                -${eiPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
            {rrspDeductionPerPeriod > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">RRSP Deduction</span>
                <span className="font-mono font-semibold text-primary">
                  -${rrspDeductionPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Net Pay</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${netPayPerPeriod.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-green-50 border border-green-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Annual Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Annual Gross Income</span>
            <span className="font-mono font-semibold text-primary">
              ${annualSalary.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Annual Net Income</span>
            <span className="font-mono font-semibold text-primary">
              ${(netPayPerPeriod * periodsPerYear).toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between items-center">
            <span className="text-secondary">Annual Deductions</span>
            <span className="font-mono font-semibold text-primary">
              ${(totalDeductionsPerPeriod * periodsPerYear).toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only based on 2025 Canadian tax rates. Actual paycheck deductions may vary due to personal tax credits, provincial variations, and employer-specific deductions. For precise payroll information, consult your employer's HR department or the Canada Revenue Agency (CRA).
        </p>
      </Card>
    </div>
  );
}
