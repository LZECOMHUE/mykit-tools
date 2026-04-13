'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function AustraliaPayCalculator() {
  const [payType, setPayType] = useState('salary');
  const [amount, setAmount] = useState(65000);
  const [hourlyRate, setHourlyRate] = useState(32.5);
  const [payFrequency, setPayFrequency] = useState('fortnightly');
  const [superIncluded, setSuperIncluded] = useState(false);

  const calculatePay = () => {
    let annualSalary = payType === 'salary' ? amount : hourlyRate * 38 * 52;

    // If super is included, remove it to get base salary
    if (superIncluded) {
      annualSalary = annualSalary / 1.115;
    }

    // Calculate periods per year
    let periodsPerYear = 26; // fortnightly
    if (payFrequency === 'weekly') periodsPerYear = 52;
    if (payFrequency === 'monthly') periodsPerYear = 12;

    // Gross pay per period
    const grossPayPerPeriod = annualSalary / periodsPerYear;

    // Tax calculation (simplified withholding)
    let annualTax = 0;
    let taxable = annualSalary;

    if (taxable > 190000) {
      annualTax += (taxable - 190000) * 0.45;
      taxable = 190000;
    }
    if (taxable > 135000) {
      annualTax += (taxable - 135000) * 0.37;
      taxable = 135000;
    }
    if (taxable > 45000) {
      annualTax += (taxable - 45000) * 0.30;
      taxable = 45000;
    }
    if (taxable > 18200) {
      annualTax += (taxable - 18200) * 0.16;
    }

    const taxPerPeriod = annualTax / periodsPerYear;

    // Medicare Levy
    let medicareLevyPerPeriod = 0;
    if (annualSalary >= 26000) {
      medicareLevyPerPeriod = (annualSalary * 0.02) / periodsPerYear;
    }

    // Superannuation
    const superPerPeriod = (annualSalary * 0.115) / periodsPerYear;

    // Net pay
    const netPayPerPeriod = grossPayPerPeriod - taxPerPeriod - medicareLevyPerPeriod;

    // Annual totals
    const annualGross = annualSalary;
    const annualTaxTotal = annualTax;
    const annualMedicare = (annualSalary >= 26000) ? annualSalary * 0.02 : 0;
    const annualSuper = annualSalary * 0.115;
    const annualNetPay = annualSalary - annualTaxTotal - annualMedicare;

    return {
      grossPayPerPeriod: Math.round(grossPayPerPeriod),
      taxPerPeriod: Math.round(taxPerPeriod),
      medicareLevyPerPeriod: Math.round(medicareLevyPerPeriod),
      superPerPeriod: Math.round(superPerPeriod),
      netPayPerPeriod: Math.round(netPayPerPeriod),
      annualGross: Math.round(annualGross),
      annualTaxTotal: Math.round(annualTaxTotal),
      annualMedicare: Math.round(annualMedicare),
      annualSuper: Math.round(annualSuper),
      annualNetPay: Math.round(annualNetPay),
    };
  };

  const results = calculatePay();

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Income Type
        </h2>
        <Select
          label="Pay Type"
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
          options={[
            { value: 'salary', label: 'Annual Salary' },
            { value: 'hourly', label: 'Hourly Rate' },
          ]}
        />
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Income Details
        </h2>
        <div className="space-y-4">
          {payType === 'salary' ? (
            <Input
              type="number"
              label="Annual Salary (AUD)"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="65000"
            />
          ) : (
            <Input
              type="number"
              label="Hourly Rate (AUD)"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              placeholder="32.50"
              step="0.50"
            />
          )}
          <Select
            label="Pay Frequency"
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value)}
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'fortnightly', label: 'Fortnightly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
          <Toggle
            label="Super Included in Stated Salary"
            checked={superIncluded}
            onChange={setSuperIncluded}
          />
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="bg-blue-50 border border-blue-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Per {payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1)}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Gross Pay</span>
              <span className="font-mono font-semibold text-primary">
                ${results.grossPayPerPeriod.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">- Tax Withheld</span>
              <span className="font-mono font-semibold text-primary">
                -${results.taxPerPeriod.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">- Medicare Levy</span>
              <span className="font-mono font-semibold text-primary">
                -${results.medicareLevyPerPeriod.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Net Pay</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.netPayPerPeriod.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-secondary">+ Employer Super (11.5%)</span>
              <span className="font-mono font-semibold text-primary">
                ${results.superPerPeriod.toLocaleString()}
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
              <span className="text-secondary">Gross Annual Income</span>
              <span className="font-mono font-semibold text-primary">
                ${results.annualGross.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">- Income Tax</span>
              <span className="font-mono font-semibold text-primary">
                -${results.annualTaxTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">- Medicare Levy</span>
              <span className="font-mono font-semibold text-primary">
                -${results.annualMedicare.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Annual Net Pay</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.annualNetPay.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary">+ Annual Super Contribution</span>
              <span className="font-mono font-semibold text-primary">
                ${results.annualSuper.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only. Actual tax withholding depends on your tax file number, Medicare details, and HELP debt status. For accurate advice, contact the ATO or your employer.
        </p>
      </Card>
    </div>
  );
}
