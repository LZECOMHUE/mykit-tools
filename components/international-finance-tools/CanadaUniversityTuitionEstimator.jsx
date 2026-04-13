'use client';

import { useState, useMemo } from 'react';

const tuitionRates = {
  ON: {
    name: 'Ontario',
    domestic: { arts: 6500, science: 7500, engineering: 15000, medicine: 25000, law: 18000 },
    international: { arts: 25000, science: 28000, engineering: 40000, medicine: 60000, law: 50000 },
  },
  BC: {
    name: 'British Columbia',
    domestic: { arts: 5200, science: 6200, engineering: 14000, medicine: 23000, law: 16000 },
    international: { arts: 20000, science: 22000, engineering: 35000, medicine: 55000, law: 45000 },
  },
  AB: {
    name: 'Alberta',
    domestic: { arts: 5000, science: 6000, engineering: 13000, medicine: 20000, law: 15000 },
    international: { arts: 18000, science: 20000, engineering: 32000, medicine: 50000, law: 40000 },
  },
  QC: {
    name: 'Quebec',
    domestic: { arts: 2700, science: 3200, engineering: 7500, medicine: 10000, law: 8000 },
    international: { arts: 12000, science: 14000, engineering: 25000, medicine: 40000, law: 35000 },
  },
};

export default function CanadaUniversityTuitionEstimator() {
  const [province, setProvince] = useState('ON');
  const [program, setProgram] = useState('arts');
  const [studentType, setStudentType] = useState('domestic');
  const [years, setYears] = useState('4');

  const calculations = useMemo(() => {
    const data = tuitionRates[province];
    const annualTuition = data[studentType][program];
    const numYears = parseFloat(years) || 4;
    const totalTuition = annualTuition * numYears;

    // Estimate living expenses
    const livingPerYear = studentType === 'domestic' ? 18000 : 25000;
    const totalLiving = livingPerYear * numYears;

    // Estimate books and supplies
    const booksPerYear = 2000;
    const totalBooks = booksPerYear * numYears;

    const totalCost = totalTuition + totalLiving + totalBooks;

    return {
      annualTuition,
      totalTuition,
      livingPerYear,
      totalLiving,
      booksPerYear,
      totalBooks,
      totalCost,
      numYears,
    };
  }, [province, program, studentType, years]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const programs = Object.keys(tuitionRates[province].domestic);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Province
          </label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {Object.entries(tuitionRates).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Program
          </label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {programs.map((prog) => (
              <option key={prog} value={prog}>
                {prog.charAt(0).toUpperCase() + prog.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Student Type
          </label>
          <select
            value={studentType}
            onChange={(e) => setStudentType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Program Length (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="1"
            max="7"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">Annual Tuition</div>
          <div className="text-3xl font-mono font-bold text-blue-900">
            {formatCurrency(calculations.annualTuition)}
          </div>
          <div className="text-xs text-blue-700 mt-2">
            {years} years = {formatCurrency(calculations.totalTuition)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">Living Expenses/Year</div>
          <div className="text-3xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.livingPerYear)}
          </div>
          <div className="text-xs text-green-700 mt-2">
            {years} years = {formatCurrency(calculations.totalLiving)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
          <div className="text-sm text-orange-700 mb-2">Books/Supplies/Year</div>
          <div className="text-3xl font-mono font-bold text-orange-900">
            {formatCurrency(calculations.booksPerYear)}
          </div>
          <div className="text-xs text-orange-700 mt-2">
            {years} years = {formatCurrency(calculations.totalBooks)}
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
        <div className="text-sm text-purple-700 mb-2">
          Total Cost ({years} Years)
        </div>
        <div className="text-5xl font-mono font-bold text-purple-900">
          {formatCurrency(calculations.totalCost)}
        </div>
        <div className="text-sm text-purple-700 mt-3">
          Per year: {formatCurrency(calculations.totalCost / calculations.numYears)}
        </div>
      </div>

      {/* Tuition Comparison */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Annual Tuition by Program ({tuitionRates[province].name})
        </h3>
        <div className="space-y-2">
          {programs.map((prog) => {
            const domestic = tuitionRates[province].domestic[prog];
            const international = tuitionRates[province].international[prog];
            return (
              <div
                key={prog}
                className={`flex justify-between items-center p-3 rounded border ${
                  program === prog
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="capitalize font-medium text-text-primary">
                  {prog}
                </span>
                <div className="text-right space-y-1">
                  <div className="text-sm font-mono">
                    <span className="text-text-secondary">Domestic: </span>
                    <span className="font-bold text-text-primary">
                      {formatCurrency(domestic)}
                    </span>
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-text-secondary">Intl: </span>
                    <span className="font-bold text-accent">
                      {formatCurrency(international)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funding Options */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">💰 Funding Options</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• OSAP (Ontario) / Student Aid (other provinces)</li>
          <li>• Scholarships and grants (no repayment required)</li>
          <li>• Student loans (federal and provincial)</li>
          <li>• Work-study programs</li>
          <li>• Part-time employment</li>
          <li>• RRSP Lifelong Learning Plan (withdrawal from retirement savings)</li>
          <li>• Parent/family savings</li>
        </ul>
      </div>

      {/* Province Comparison */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">
          Annual Arts Tuition Comparison
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          {Object.entries(tuitionRates).map(([key, data]) => (
            <div
              key={key}
              className={`flex justify-between items-center p-3 rounded border ${
                province === key
                  ? 'bg-accent/10 border-accent'
                  : 'bg-surface border-border'
              }`}
            >
              <span className="text-text-secondary">{data.name}</span>
              <div>
                <div className="font-mono font-bold text-text-primary text-right">
                  Domestic: {formatCurrency(data.domestic.arts)}
                </div>
                <div className="font-mono text-accent text-right text-xs">
                  Intl: {formatCurrency(data.international.arts)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
