'use client';

import { useState, useMemo } from 'react';

const CPP_RATE = 0.119; // Employee + employer portions (2025)
const CPP_EXEMPTION = 3500;
const CPP_MAX_EARNINGS = 68500;

const FEDERAL_TAX_BRACKETS = [
  { threshold: 55867, rate: 0.15 },
  { threshold: 111733, rate: 0.205 },
  { threshold: 173205, rate: 0.26 },
  { threshold: 246752, rate: 0.29 },
  { threshold: Infinity, rate: 0.33 },
];

const PROVINCIAL_RATES = {
  ON: [
    { threshold: 51446, rate: 0.0505 },
    { threshold: 102894, rate: 0.0915 },
    { threshold: 150000, rate: 0.1116 },
    { threshold: 220000, rate: 0.1216 },
    { threshold: Infinity, rate: 0.1316 },
  ],
  BC: [
    { threshold: 45654, rate: 0.0506 },
    { threshold: 91310, rate: 0.0770 },
    { threshold: 105616, rate: 0.105 },
    { threshold: 181232, rate: 0.1229 },
    { threshold: 252752, rate: 0.147 },
    { threshold: Infinity, rate: 0.205 },
  ],
  AB: [
    { threshold: 148269, rate: 0.10 },
    { threshold: 177922, rate: 0.12 },
    { threshold: 237230, rate: 0.13 },
    { threshold: 355845, rate: 0.14 },
    { threshold: Infinity, rate: 0.15 },
  ],
  QC: [
    { threshold: 49275, rate: 0.015 },
    { threshold: 98540, rate: 0.20 },
    { threshold: 119910, rate: 0.24 },
    { threshold: 179749, rate: 0.2575 },
    { threshold: Infinity, rate: 0.2975 },
  ],
};

function calculateTax(income, brackets) {
  let tax = 0;
  let previousThreshold = 0;

  for (const bracket of brackets) {
    const currentThreshold = Math.min(bracket.threshold, income);
    if (currentThreshold > previousThreshold) {
      const taxableInBracket = currentThreshold - previousThreshold;
      tax += taxableInBracket * bracket.rate;
    }
    previousThreshold = currentThreshold;
    if (income <= bracket.threshold) break;
  }

  return tax;
}

export default function CanadaSelfEmploymentTax() {
  const [businessIncome, setBusinessIncome] = useState(80000);
  const [expenses, setExpenses] = useState(20000);
  const [province, setProvince] = useState('ON');

  const results = useMemo(() => {
    const income = parseFloat(businessIncome) || 0;
    const exp = parseFloat(expenses) || 0;
    const netIncome = Math.max(0, income - exp);

    // CPP calculation (both employee and employer portions)
    const cppEarnings = Math.min(
      Math.max(netIncome - CPP_EXEMPTION, 0),
      CPP_MAX_EARNINGS - CPP_EXEMPTION
    );
    const cpp = cppEarnings * CPP_RATE;

    // Federal tax
    const federalTax = calculateTax(netIncome, FEDERAL_TAX_BRACKETS);

    // Provincial tax
    const provincialBrackets = PROVINCIAL_RATES[province] || PROVINCIAL_RATES.ON;
    const provincialTax = calculateTax(netIncome, provincialBrackets);

    // Total tax
    const totalTax = federalTax + provincialTax + cpp;
    const effectiveTaxRate = netIncome > 0 ? (totalTax / netIncome) * 100 : 0;

    return {
      netIncome: netIncome.toFixed(2),
      federalTax: federalTax.toFixed(2),
      provincialTax: provincialTax.toFixed(2),
      cpp: cpp.toFixed(2),
      totalTax: totalTax.toFixed(2),
      takeHome: (netIncome - totalTax).toFixed(2),
      effectiveRate: effectiveTaxRate.toFixed(2),
    };
  }, [businessIncome, expenses, province]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Gross Business Income (CAD)
            </label>
            <input
              type="number"
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
              placeholder="Enter gross income"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Total Business Expenses (CAD)
            </label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Enter total expenses"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">
              Includes supplies, rent, utilities, equipment depreciation, etc.
            </p>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              {Object.keys(PROVINCIAL_RATES).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Tax Calculation</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Net Income:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.netIncome}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Federal Income Tax:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.federalTax}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Provincial Income Tax:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.provincialTax}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">CPP (both portions):</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.cpp}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Take-Home Income:</span>
              <span className="font-mono text-2xl font-semibold text-accent">
                ${results.takeHome}
              </span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-text-muted text-sm">
            <p>Total Tax & CPP: <span className="font-mono">${results.totalTax}</span></p>
            <p>Effective tax rate: <span className="font-mono">{results.effectiveRate}%</span></p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-2">CPP Contribution:</p>
            <p>
              Self-employed individuals pay both employee and employer portions (11.9% total).
              This is not split with an employer.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Rates are for 2025 tax year</li>
              <li>Does not include GST/HST if registered</li>
              <li>Quarterly instalments may be required for high income</li>
              <li>Consult a tax professional for deductions and planning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
