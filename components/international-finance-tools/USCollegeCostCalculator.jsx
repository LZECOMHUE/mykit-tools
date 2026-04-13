'use client';

import { useState, useMemo } from 'react';

const collegeCosts = {
  'in-state-public': {
    label: 'In-State Public University',
    avgTuition: 10500,
  },
  'out-of-state-public': {
    label: 'Out-of-State Public University',
    avgTuition: 29500,
  },
  private: {
    label: 'Private University',
    avgTuition: 42000,
  },
};

export default function USCollegeCostCalculator() {
  const [schoolType, setSchoolType] = useState('in-state-public');
  const [tuition, setTuition] = useState('10500');
  const [roomBoard, setRoomBoard] = useState('12500');
  const [books, setBooks] = useState('1200');
  const [living, setLiving] = useState('3000');
  const [financialAid, setFinancialAid] = useState('0');

  const costs = useMemo(() => {
    const t = parseFloat(tuition) || 0;
    const rb = parseFloat(roomBoard) || 0;
    const b = parseFloat(books) || 0;
    const l = parseFloat(living) || 0;
    const aid = parseFloat(financialAid) || 0;

    const annualCost = t + rb + b + l;
    const fourYearCost = annualCost * 4;
    const fourYearAfterAid = Math.max(0, fourYearCost - aid * 4);

    return {
      annual: annualCost,
      fourYear: fourYearCost,
      fourYearAfterAid,
      breakdown: {
        tuition: t,
        roomBoard: rb,
        books: b,
        living: l,
      },
    };
  }, [tuition, roomBoard, books, books, living, financialAid]);

  const handleSchoolTypeChange = (type) => {
    setSchoolType(type);
    setTuition(collegeCosts[type].avgTuition.toString());
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* School Type Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          University Type
        </label>
        <div className="grid sm:grid-cols-3 gap-2">
          {Object.entries(collegeCosts).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => handleSchoolTypeChange(key)}
              className={`p-3 rounded-lg border-2 font-medium text-sm transition ${
                schoolType === key
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-primary hover:border-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { label: 'Annual Tuition & Fees', value: tuition, setter: setTuition },
          { label: 'Room & Board', value: roomBoard, setter: setRoomBoard },
          { label: 'Books & Supplies', value: books, setter: setBooks },
          { label: 'Living Expenses', value: living, setter: setLiving },
          { label: 'Financial Aid Per Year', value: financialAid, setter: setFinancialAid },
        ].map((input) => (
          <div key={input.label}>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {input.label}
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={input.value}
                onChange={(e) => input.setter(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Annual Cost Breakdown
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Tuition & Fees', value: costs.breakdown.tuition },
            { label: 'Room & Board', value: costs.breakdown.roomBoard },
            { label: 'Books & Supplies', value: costs.breakdown.books },
            { label: 'Living Expenses', value: costs.breakdown.living },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-mono font-bold text-text-primary">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-accent">
            <span className="font-semibold text-text-primary">Total Annual Cost</span>
            <span className="font-mono font-bold text-lg text-accent">
              {formatCurrency(costs.annual)}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Year Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">4-Year Total (Before Aid)</div>
          <div className="text-4xl font-mono font-bold text-blue-900">
            {formatCurrency(costs.fourYear)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">4-Year After Aid</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(costs.fourYearAfterAid)}
          </div>
          {parseFloat(financialAid) > 0 && (
            <div className="text-sm text-green-700 mt-2">
              Savings: {formatCurrency(costs.fourYear - costs.fourYearAfterAid)}
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">💡 College Funding Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• Apply for FAFSA as early as possible for maximum aid eligibility</li>
          <li>• Compare net cost across schools, not just sticker price</li>
          <li>• Look into work-study programs and on-campus employment</li>
          <li>• Consider community college for first 2 years to reduce costs</li>
          <li>• Scholarships can significantly reduce your out-of-pocket expenses</li>
        </ul>
      </div>
    </div>
  );
}
