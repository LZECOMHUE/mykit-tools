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

export default function IndiaGratuityCalculator() {
  const [monthlyBasic, setMonthlyBasic] = useState(50000);
  const [monthlyDA, setMonthlyDA] = useState(10000);
  const [yearsOfService, setYearsOfService] = useState(10);

  const calculations = useMemo(() => {
    const basicDA = Math.max(0, monthlyBasic) + Math.max(0, monthlyDA);
    const validYears = Math.max(0, yearsOfService);

    // Gratuity = (Basic + DA) × (15/26) × Years of Service
    // 26 is the number of working days per month
    const gratuity = basicDA * (15 / 26) * validYears;

    // Tax Exemption: Up to 20,00,000 for non-government employees
    const taxExemption = 2000000;
    const taxableGratuity = Math.max(0, gratuity - taxExemption);

    // If eligible for 5+ years
    const isEligible = validYears >= 5;

    // Calculate approximate tax (assuming 30% slab)
    const approximateTax = taxableGratuity * 0.3;

    // Year-by-year breakdown
    const yearlyBreakdown = [];
    for (let year = 5; year <= validYears; year += 1) {
      const yearlyGratuity = basicDA * (15 / 26) * year;
      yearlyBreakdown.push({
        year,
        gratuity: yearlyGratuity,
      });
    }

    return {
      monthlyBasic: Math.max(0, monthlyBasic),
      monthlyDA: Math.max(0, monthlyDA),
      basicDA,
      yearsOfService: validYears,
      gratuity,
      isEligible,
      taxExemption,
      taxableGratuity,
      approximateTax,
      yearlyBreakdown,
    };
  }, [monthlyBasic, monthlyDA, yearsOfService]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Gratuity Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Drawn Monthly Basic Salary (₹)</label>
            <input
              type="number"
              value={monthlyBasic}
              onChange={(e) => setMonthlyBasic(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Drawn Monthly Dearness Allowance (DA) (₹)</label>
            <input
              type="number"
              value={monthlyDA}
              onChange={(e) => setMonthlyDA(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Years of Service</label>
            <input
              type="number"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Math.max(0, Number(e.target.value)))}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 mt-1">Must be 5+ years to be eligible</p>
          </div>

          {!calculations.isEligible && calculations.yearsOfService > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900 font-semibold">Not Yet Eligible</p>
              <p className="text-xs text-amber-700 mt-1">Gratuity is payable only after 5 years of continuous service</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-gray-900">Gratuity Estimate</h2>

          {calculations.isEligible ? (
            <>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Monthly Basic + DA</p>
                <p className="font-mono font-bold text-2xl text-gray-900">₹{formatINR(calculations.basicDA)}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Gratuity Amount (15/26 × {calculations.yearsOfService} years)</p>
                <p className="font-heading text-3xl font-bold text-green-900">₹{formatINR(calculations.gratuity)}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Tax Exemption (Non-Government)</p>
                <p className="font-mono font-bold text-xl text-blue-900">₹{formatINR(calculations.taxExemption)}</p>
                <p className="text-xs text-blue-700 mt-2">Max tax-free amount for private employees</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Taxable Gratuity Amount</p>
                <p className="font-mono font-bold text-xl text-purple-900">₹{formatINR(calculations.taxableGratuity)}</p>
                {calculations.taxableGratuity > 0 && (
                  <p className="text-xs text-purple-700 mt-2">Approx tax (30% slab): ₹{formatINR(calculations.approximateTax)}</p>
                )}
              </div>
            </>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 col-span-1 md:col-span-2">
              <p className="text-center text-gray-600 font-semibold">Enter at least 5 years of service to calculate gratuity</p>
            </div>
          )}
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      {calculations.isEligible && calculations.yearlyBreakdown.length > 0 && (
        <div className="mb-8">
          <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Gratuity by Years of Service</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-900">Years of Service</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-900">Gratuity Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {calculations.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold text-gray-900">{row.year}</td>
                    <td className="text-right px-3 py-2 font-mono font-semibold text-gray-900">₹{formatINR(row.gratuity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 mb-4">
        <p className="font-semibold text-blue-900 mb-2">Gratuity Formula</p>
        <p className="font-mono bg-white px-3 py-2 rounded border border-blue-200 mb-3">
          Gratuity = (Basic + DA) × (15/26) × Years of Service
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>15 days:</strong> Salary per year of service</li>
          <li><strong>26 days:</strong> Standard working days per month</li>
          <li><strong>Basic + DA:</strong> Last drawn salary components</li>
          <li>Only completed years are counted (partial years are not eligible)</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 mb-4">
        <p className="font-semibold text-blue-900 mb-2">Eligibility & Key Facts</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Eligibility:</strong> Minimum 5 years of continuous service required</li>
          <li><strong>Tax-Free Amount:</strong> Up to ₹20,00,000 for non-government employees (unlimited for government employees)</li>
          <li><strong>Payment:</strong> Due within 30 days after resignation/retirement/termination</li>
          <li><strong>Components:</strong> Calculated on Basic Salary + Dearness Allowance only</li>
          <li><strong>Applicable to:</strong> All private sector and government employees</li>
          <li><strong>Partial Years:</strong> Not counted (you need to complete 5 full years)</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-blue-909 mb-2">Important Notes</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Gratuity is NOT part of salary; it's a one-time exit benefit</li>
          <li>If separated before 5 years, no gratuity is payable (except in specific cases)</li>
          <li>Gratuity amount is fully tax-free up to the specified limit</li>
          <li>Any amount above the limit is taxable as income</li>
          <li>This calculation applies to private sector employees; government rules may differ slightly</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold text-amber-900 mb-2">Disclaimer</p>
        <p>This calculator provides estimates based on the standard gratuity formula under the Payment of Gratuity Act, 1972. Actual gratuity entitlement may vary based on employment contracts, collective agreements, and specific organizational policies. Consult your HR department or an employment lawyer for accurate gratuity calculations based on your specific situation.</p>
      </div>
    </div>
  );
}
