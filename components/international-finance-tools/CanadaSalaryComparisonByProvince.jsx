'use client';

import { useState, useMemo } from 'react';

const FEDERAL_TAX_BRACKETS = [
  { threshold: 55867, rate: 0.15 },
  { threshold: 111733, rate: 0.205 },
  { threshold: 173205, rate: 0.26 },
  { threshold: 246752, rate: 0.29 },
  { threshold: Infinity, rate: 0.33 },
];

const PROVINCIAL_BRACKETS = {
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
  SK: [
    { threshold: 51446, rate: 0.105 },
    { threshold: 102894, rate: 0.12 },
    { threshold: 147589, rate: 0.13 },
    { threshold: 252752, rate: 0.14 },
    { threshold: Infinity, rate: 0.15 },
  ],
  NS: [
    { threshold: 29590, rate: 0.0879 },
    { threshold: 59180, rate: 0.1495 },
    { threshold: 93000, rate: 0.1667 },
    { threshold: 150000, rate: 0.175 },
    { threshold: Infinity, rate: 0.21 },
  ],
};

const EI_RATES = {
  ON: 0.0158,
  BC: 0.0153,
  AB: 0.013,
  QC: 0.0166,
  SK: 0.0154,
  NS: 0.0181,
};

const CPP_EMPLOYEE_RATE = 0.0595; // Employee portion (2025)
const CPP_MAX_EARNINGS = 68500;
const CPP_EXEMPTION = 3500;

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

function calculateProvinceMetrics(salary, province) {
  const federalTax = calculateTax(salary, FEDERAL_TAX_BRACKETS);
  const provincialBrackets = PROVINCIAL_BRACKETS[province] || [];
  const provincialTax = calculateTax(salary, provincialBrackets);

  const cppEarnings = Math.min(
    Math.max(salary - CPP_EXEMPTION, 0),
    CPP_MAX_EARNINGS - CPP_EXEMPTION
  );
  const cpp = cppEarnings * CPP_EMPLOYEE_RATE;

  const eiRate = EI_RATES[province] || 0.015;
  const ei = salary * eiRate;

  const totalDeductions = federalTax + provincialTax + cpp + ei;
  const netIncome = salary - totalDeductions;
  const effectiveRate = (totalDeductions / salary) * 100;

  return {
    federalTax,
    provincialTax,
    cpp,
    ei,
    totalDeductions,
    netIncome,
    effectiveRate,
  };
}

export default function CanadaSalaryComparisonByProvince() {
  const [salary, setSalary] = useState(75000);
  const [selectedProvinces, setSelectedProvinces] = useState(['ON', 'BC', 'AB']);

  const provinceList = Object.keys(PROVINCIAL_BRACKETS).sort();

  const results = useMemo(() => {
    const salaryNum = parseFloat(salary) || 0;
    const comparison = {};

    selectedProvinces.forEach((prov) => {
      comparison[prov] = calculateProvinceMetrics(salaryNum, prov);
    });

    // Find best net income
    const bestProvince = selectedProvinces.reduce((best, curr) => {
      return comparison[curr].netIncome > comparison[best].netIncome ? curr : best;
    });

    return {
      comparison,
      bestProvince,
      salaryNum,
    };
  }, [salary, selectedProvinces]);

  const toggleProvince = (prov) => {
    if (selectedProvinces.includes(prov)) {
      setSelectedProvinces(selectedProvinces.filter((p) => p !== prov));
    } else {
      setSelectedProvinces([...selectedProvinces, prov]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Annual Salary (CAD)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Select Provinces to Compare
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {provinceList.map((prov) => (
                <label
                  key={prov}
                  className="flex items-center cursor-pointer p-2 rounded hover:bg-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedProvinces.includes(prov)}
                    onChange={() => toggleProvince(prov)}
                    className="mr-2"
                  />
                  <span className="text-text-primary text-sm">{prov}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedProvinces.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white border border-border">
                  <th className="text-left p-3 font-semibold text-text-primary">
                    Province
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Federal Tax
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Provincial Tax
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    CPP
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    EI
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Total Deductions
                  </th>
                  <th className="text-right p-3 font-semibold text-text-primary">
                    Net Take-Home
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedProvinces.map((prov) => {
                  const data = results.comparison[prov];
                  const isBest = prov === results.bestProvince;

                  return (
                    <tr
                      key={prov}
                      className={`border border-border ${
                        isBest ? 'bg-blue-50' : 'bg-white hover:bg-surface'
                      }`}
                    >
                      <td className="p-3 font-semibold text-text-primary">{prov}</td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        ${data.federalTax.toFixed(0)}
                      </td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        ${data.provincialTax.toFixed(0)}
                      </td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        ${data.cpp.toFixed(0)}
                      </td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        ${data.ei.toFixed(0)}
                      </td>
                      <td className="text-right p-3 font-mono text-text-primary">
                        ${data.totalDeductions.toFixed(0)}
                      </td>
                      <td
                        className={`text-right p-3 font-mono font-semibold ${
                          isBest ? 'text-accent text-lg' : 'text-text-primary'
                        }`}
                      >
                        ${data.netIncome.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Cards */}
        {selectedProvinces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedProvinces.map((prov) => {
              const data = results.comparison[prov];
              const isBest = prov === results.bestProvince;

              return (
                <div
                  key={prov}
                  className={`rounded-lg border p-4 ${
                    isBest
                      ? 'bg-blue-50 border-accent'
                      : 'bg-white border-border'
                  }`}
                >
                  <h3 className="font-semibold text-text-primary mb-4 text-lg">
                    {prov}
                    {isBest && <span className="text-accent ml-2">(Best)</span>}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Gross Salary:</span>
                      <span className="font-mono font-semibold">
                        ${results.salaryNum.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-text-secondary">Total Deductions:</span>
                      <span className="font-mono font-semibold text-error">
                        ${data.totalDeductions.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-text-primary font-semibold">Net Take-Home:</span>
                      <span className="font-mono text-lg font-semibold text-accent">
                        ${data.netIncome.toFixed(0)}
                      </span>
                    </div>
                    <p className="text-text-muted pt-2">
                      Effective rate: <span className="font-mono">{data.effectiveRate.toFixed(1)}%</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Based on 2025 federal and provincial tax rates</li>
            <li>Assumes employee contributions only (not self-employed)</li>
            <li>Does not include provincial tax credits or deductions</li>
            <li>Does not account for overtime, bonuses, or benefits</li>
            <li>Consult a tax professional for personalized analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
