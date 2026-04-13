'use client';

import { useState, useMemo } from 'react';

const formatINR = (amount) => {
  if (amount < 0) return '-' + formatINR(-amount);
  const str = Math.round(amount).toString();
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 2) {
    result = remaining.slice(-2) + ',' + result;
    remaining = remaining.slice(0, -2);
  }
  if (remaining) result = remaining + ',' + result;
  return result;
};

export default function IndiaIncomeTaxCalculator() {
  const [salary, setSalary] = useState(1000000);
  const [ageGroup, setAgeGroup] = useState('below-60');
  const [hra, setHra] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [city, setCity] = useState('metro');
  const [deductions80C, setDeductions80C] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [npsContribution, setNpsContribution] = useState(0);

  const calculations = useMemo(() => {
    // Validate inputs
    const validatedSalary = Math.max(0, salary);
    const validatedHra = Math.min(hra, validatedSalary);
    const validatedRent = rentPaid;
    const validated80C = Math.min(deductions80C, 150000);
    const validated80D = Math.min(healthInsurance, ageGroup === 'below-60' ? 25000 : 50000);
    const validatedHomeLoan = Math.min(homeLoanInterest, 200000);
    const validatedNps = Math.min(npsContribution, 50000);

    // HRA EXEMPTION CALCULATION
    const basicSalary = validatedSalary * 0.4; // Assuming basic is 40% of CTC
    const hraExemption1 = validatedHra;
    const hraExemption2 = city === 'metro' ? basicSalary * 0.5 : basicSalary * 0.4;
    const hraExemption3 = Math.max(0, validatedRent - basicSalary * 0.1);
    const hraExemption = Math.min(hraExemption1, hraExemption2, hraExemption3);
    const taxableHra = Math.max(0, validatedHra - hraExemption);

    // NEW REGIME
    const newRegimeStandardDeduction = 75000;
    const newRegimeTaxableIncome = Math.max(0, validatedSalary - taxableHra - newRegimeStandardDeduction);

    let newRegimeTax = 0;
    if (newRegimeTaxableIncome <= 400000) {
      newRegimeTax = 0;
    } else if (newRegimeTaxableIncome <= 800000) {
      newRegimeTax = (newRegimeTaxableIncome - 400000) * 0.05;
    } else if (newRegimeTaxableIncome <= 1200000) {
      newRegimeTax = 20000 + (newRegimeTaxableIncome - 800000) * 0.1;
    } else if (newRegimeTaxableIncome <= 1600000) {
      newRegimeTax = 60000 + (newRegimeTaxableIncome - 1200000) * 0.15;
    } else if (newRegimeTaxableIncome <= 2000000) {
      newRegimeTax = 120000 + (newRegimeTaxableIncome - 1600000) * 0.2;
    } else if (newRegimeTaxableIncome <= 2400000) {
      newRegimeTax = 200000 + (newRegimeTaxableIncome - 2000000) * 0.25;
    } else {
      newRegimeTax = 300000 + (newRegimeTaxableIncome - 2400000) * 0.3;
    }

    // Apply Rebate 87A - Full rebate if income up to 12 lakhs
    if (newRegimeTaxableIncome <= 1200000) {
      newRegimeTax = 0;
    }

    // OLD REGIME
    const oldRegimeStandardDeduction = 50000;
    const basicExemption = ageGroup === 'below-60' ? 250000 : ageGroup === '60-80' ? 300000 : 500000;
    const oldRegimeTaxableIncome = Math.max(0, validatedSalary - taxableHra - newRegimeStandardDeduction - validated80C - validated80D - validatedHomeLoan);

    let oldRegimeTax = 0;
    if (oldRegimeTaxableIncome <= basicExemption) {
      oldRegimeTax = 0;
    } else if (oldRegimeTaxableIncome <= 500000) {
      oldRegimeTax = (oldRegimeTaxableIncome - basicExemption) * 0.05;
    } else if (oldRegimeTaxableIncome <= 1000000) {
      oldRegimeTax = (basicExemption > 500000 ? 0 : (500000 - basicExemption) * 0.05) +
                     Math.max(0, oldRegimeTaxableIncome - Math.max(basicExemption, 500000)) * 0.2;
    } else {
      oldRegimeTax = (basicExemption > 500000 ? 0 : (500000 - basicExemption) * 0.05) +
                     Math.max(0, Math.min(1000000, oldRegimeTaxableIncome) - Math.max(basicExemption, 500000)) * 0.2 +
                     Math.max(0, oldRegimeTaxableIncome - 1000000) * 0.3;
    }

    // Health & Education Cess - 4% on tax
    const newRegimeCess = newRegimeTax * 0.04;
    const oldRegimeCess = oldRegimeTax * 0.04;

    const newRegimeTotalTax = newRegimeTax + newRegimeCess;
    const oldRegimeTotalTax = oldRegimeTax + oldRegimeCess;

    const savings = Math.abs(newRegimeTotalTax - oldRegimeTotalTax);
    const betterRegime = newRegimeTotalTax < oldRegimeTotalTax ? 'New Regime' : oldRegimeTotalTax < newRegimeTotalTax ? 'Old Regime' : 'Same';

    return {
      hraExemption,
      taxableHra,
      newRegimeTaxableIncome,
      newRegimeTax,
      newRegimeCess,
      newRegimeTotalTax,
      oldRegimeTaxableIncome,
      oldRegimeTax,
      oldRegimeCess,
      oldRegimeTotalTax,
      savings,
      betterRegime,
    };
  }, [salary, ageGroup, hra, rentPaid, city, deductions80C, healthInsurance, homeLoanInterest, npsContribution]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Left Column - Inputs */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Income Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary (CTC in ₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="below-60">Below 60 years</option>
              <option value="60-80">60 to 80 years</option>
              <option value="above-80">Above 80 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City Type</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="metro">Metro (Delhi, Mumbai, etc.)</option>
              <option value="non-metro">Non-Metro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HRA Received (Annual in ₹)</label>
            <input
              type="number"
              value={hra}
              onChange={(e) => setHra(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rent Paid (Monthly in ₹)</label>
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <h2 className="font-heading text-xl font-bold text-gray-900 pt-4">Deductions (Old Regime)</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section 80C (Max ₹1,50,000)</label>
            <input
              type="number"
              value={deductions80C}
              onChange={(e) => setDeductions80C(Math.min(150000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section 80D Health Insurance (Max ₹{ageGroup === 'below-60' ? '25,000' : '50,000'})</label>
            <input
              type="number"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Loan Interest (Max ₹2,00,000)</label>
            <input
              type="number"
              value={homeLoanInterest}
              onChange={(e) => setHomeLoanInterest(Math.min(200000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NPS Contribution 80CCD(1B) (Max ₹50,000)</label>
            <input
              type="number"
              value={npsContribution}
              onChange={(e) => setNpsContribution(Math.min(50000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Comparison</h2>

          {/* Which is Better */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Better Option</p>
            <p className="font-heading text-2xl font-bold text-blue-900">{calculations.betterRegime}</p>
            <p className="text-lg font-mono font-bold text-blue-700 mt-2">Save ₹{formatINR(calculations.savings)}</p>
          </div>

          {/* New Regime */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-heading font-bold text-gray-900 mb-3">New Regime</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Taxable Income:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.newRegimeTaxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Income Tax:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.newRegimeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Health & Edu Cess:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.newRegimeCess)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                <span className="text-gray-900 font-semibold">Total Tax:</span>
                <span className="font-mono font-bold text-lg">₹{formatINR(calculations.newRegimeTotalTax)}</span>
              </div>
            </div>
          </div>

          {/* Old Regime */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-heading font-bold text-gray-900 mb-3">Old Regime</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Taxable Income:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.oldRegimeTaxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Income Tax:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.oldRegimeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Health & Edu Cess:</span>
                <span className="font-mono font-semibold">₹{formatINR(calculations.oldRegimeCess)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                <span className="text-gray-900 font-semibold">Total Tax:</span>
                <span className="font-mono font-bold text-lg">₹{formatINR(calculations.oldRegimeTotalTax)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on FY 2025-26 tax slabs. Actual tax liability may vary based on additional income sources, capital gains, and individual circumstances. Consult a tax professional for personalized advice.</p>
      </div>
    </div>
  );
}
