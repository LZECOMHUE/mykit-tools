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

export default function IndiaHRACalculator() {
  const [basicSalary, setBasicSalary] = useState(600000);
  const [hraReceived, setHraReceived] = useState(240000);
  const [rentPaid, setRentPaid] = useState(20000);
  const [city, setCity] = useState('metro');

  const calculations = useMemo(() => {
    const annualRent = rentPaid * 12;

    // Three conditions to determine HRA exemption
    const condition1 = hraReceived;
    const condition2 = city === 'metro' ? basicSalary * 0.5 : basicSalary * 0.4;
    const condition3 = Math.max(0, annualRent - basicSalary * 0.1);

    // HRA exemption is the minimum of the three
    const hraExemption = Math.min(condition1, condition2, condition3);
    const taxableHra = Math.max(0, hraReceived - hraExemption);

    // Determine which condition applies
    let applicableCondition = '';
    if (hraExemption === condition1) {
      applicableCondition = 'Actual HRA Received';
    } else if (hraExemption === condition2) {
      applicableCondition = city === 'metro' ? '50% of Basic Salary (Metro)' : '40% of Basic Salary (Non-Metro)';
    } else {
      applicableCondition = 'Rent Paid - 10% of Basic Salary';
    }

    return {
      condition1,
      condition2,
      condition3,
      hraExemption,
      taxableHra,
      applicableCondition,
      annualRent,
    };
  }, [basicSalary, hraReceived, rentPaid, city]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">HRA Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Basic Salary (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual HRA Received (₹)</label>
            <input
              type="number"
              value={hraReceived}
              onChange={(e) => setHraReceived(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent Paid (₹)</label>
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City Type</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="metro">Metro (Delhi, Mumbai, Chennai, Kolkata)</option>
              <option value="non-metro">Non-Metro</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">HRA Exemption Calculation</h2>

          {/* Three Conditions */}
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Condition 1: Actual HRA Received</p>
              <p className="font-mono font-bold text-lg text-gray-900">₹{formatINR(calculations.condition1)}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Condition 2: {city === 'metro' ? '50%' : '40%'} of Basic Salary</p>
              <p className="font-mono font-bold text-lg text-gray-900">₹{formatINR(calculations.condition2)}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Condition 3: Rent Paid - 10% of Basic</p>
              <p className="text-xs text-gray-600 mb-1">₹{formatINR(calculations.annualRent)} - ₹{formatINR(basicSalary * 0.1)}</p>
              <p className="font-mono font-bold text-lg text-gray-900">₹{formatINR(calculations.condition3)}</p>
            </div>
          </div>

          {/* Result */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">HRA Exemption (Minimum of 3 conditions)</p>
            <p className="font-heading text-2xl font-bold text-blue-900">₹{formatINR(calculations.hraExemption)}</p>
            <p className="text-xs text-blue-700 mt-2">Applies: {calculations.applicableCondition}</p>
          </div>

          {/* Taxable HRA */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-600 mb-1">Taxable HRA Amount</p>
            <p className="font-heading text-2xl font-bold text-amber-900">₹{formatINR(calculations.taxableHra)}</p>
            <p className="text-xs text-amber-700 mt-2">This portion is included in taxable income</p>
          </div>

          {/* Tax Saving */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Approximate Tax Saving (at 30% slab)</p>
            <p className="font-heading text-xl font-bold text-green-900">₹{formatINR(calculations.hraExemption * 0.3)}</p>
            <p className="text-xs text-green-700 mt-1">Actual saving depends on your tax slab</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-2">How HRA Exemption Works</p>
        <p className="mb-3">The exemption is the minimum of these three amounts:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Actual HRA received from your employer</li>
          <li>{city === 'metro' ? '50%' : '40%'} of your basic salary (metro or non-metro rates)</li>
          <li>Rent paid minus 10% of basic salary</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Important Notes</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>HRA exemption requires rent receipts or proof if demanded by income tax department</li>
          <li>Self-owned property: You may not be eligible for HRA exemption if you receive HRA</li>
          <li>This is applicable only under old tax regime; new regime has no HRA exemption</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator is for informational purposes. Actual HRA exemption depends on your specific circumstances and supporting documentation. Consult a tax professional for guidance on your situation.</p>
      </div>
    </div>
  );
}
