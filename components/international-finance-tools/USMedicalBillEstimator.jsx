'use client';

import { useState, useMemo } from 'react';

const procedures = {
  'appendectomy': {
    label: 'Appendectomy',
    costRange: [15000, 25000],
    avgLength: 'Outpatient or 1 day',
  },
  'mri-brain': {
    label: 'MRI - Brain',
    costRange: [1200, 2500],
    avgLength: 'Outpatient',
  },
  'ct-scan': {
    label: 'CT Scan',
    costRange: [1500, 3000],
    avgLength: 'Outpatient',
  },
  'er-visit': {
    label: 'Emergency Room Visit',
    costRange: [1000, 3000],
    avgLength: 'Same day',
  },
  'childbirth': {
    label: 'Vaginal Delivery (Hospital)',
    costRange: [8000, 15000],
    avgLength: '2 days',
  },
  'csection': {
    label: 'Cesarean Section',
    costRange: [15000, 30000],
    avgLength: '3 days',
  },
  'hip-replacement': {
    label: 'Hip Replacement Surgery',
    costRange: [30000, 50000],
    avgLength: '3 days',
  },
  'colonoscopy': {
    label: 'Colonoscopy',
    costRange: [2000, 4000],
    avgLength: 'Outpatient',
  },
  'knee-arthroscopy': {
    label: 'Knee Arthroscopy',
    costRange: [5000, 10000],
    avgLength: 'Outpatient or 1 day',
  },
  'pneumonia-treatment': {
    label: 'Pneumonia Hospital Stay (3 days)',
    costRange: [12000, 25000],
    avgLength: '3 days',
  },
  'broken-arm': {
    label: 'Broken Arm (X-ray, cast, follow-up)',
    costRange: [1500, 3500],
    avgLength: 'Multiple visits',
  },
  'root-canal': {
    label: 'Root Canal',
    costRange: [1000, 2500],
    avgLength: 'Dental office',
  },
};

export default function USMedicalBillEstimator() {
  const [procedure, setProcedure] = useState('appendectomy');
  const [hasInsurance, setHasInsurance] = useState(true);
  const [deductible, setDeductible] = useState('1500');
  const [coinsurance, setCoinsurance] = useState('20');

  const estimates = useMemo(() => {
    const proc = procedures[procedure];
    const avgCost = (proc.costRange[0] + proc.costRange[1]) / 2;
    const low = proc.costRange[0];
    const high = proc.costRange[1];

    if (!hasInsurance) {
      return {
        low,
        high,
        avg: avgCost,
        deductible: 0,
        afterInsurance: {
          low,
          high,
          avg: avgCost,
        },
      };
    }

    const ded = parseFloat(deductible) || 0;
    const coins = parseFloat(coinsurance) || 20;

    const calcInsured = (cost) => {
      if (cost <= ded) return cost;
      const afterDed = cost - ded;
      const coinsuranceAmount = (afterDed * coins) / 100;
      return ded + coinsuranceAmount;
    };

    return {
      low,
      high,
      avg: avgCost,
      deductible: ded,
      coinsurance: coins,
      afterInsurance: {
        low: calcInsured(low),
        high: calcInsured(high),
        avg: calcInsured(avgCost),
      },
    };
  }, [procedure, hasInsurance, deductible, coinsurance]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const savings = useMemo(() => {
    if (!hasInsurance) return 0;
    return estimates.avg - estimates.afterInsurance.avg;
  }, [estimates, hasInsurance]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Procedure Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Medical Procedure
        </label>
        <select
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent mb-2"
        >
          {Object.entries(procedures).map(([key, proc]) => (
            <option key={key} value={key}>
              {proc.label}
            </option>
          ))}
        </select>
        {procedures[procedure] && (
          <div className="text-xs text-text-muted mt-2">
            {procedures[procedure].avgLength}
          </div>
        )}
      </div>

      {/* Insurance Configuration */}
      <div className="bg-white border border-border rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="checkbox"
            checked={hasInsurance}
            onChange={(e) => setHasInsurance(e.target.checked)}
            className="w-5 h-5 rounded"
          />
          <label className="font-medium text-text-primary cursor-pointer">
            I Have Health Insurance
          </label>
        </div>

        {hasInsurance && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Deductible
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                  $
                </span>
                <input
                  type="number"
                  value={deductible}
                  onChange={(e) => setDeductible(e.target.value)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Coinsurance (Your %)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={coinsurance}
                  onChange={(e) => setCoinsurance(e.target.value)}
                  min="0"
                  max="100"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                />
                <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                  %
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cost Ranges */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-4 text-lg">
          Typical Cost Range
        </h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-red-700 mb-1">Low</div>
            <div className="text-2xl font-mono font-bold text-red-900">
              {formatCurrency(estimates.low)}
            </div>
          </div>
          <div>
            <div className="text-sm text-red-700 mb-1">Average</div>
            <div className="text-3xl font-mono font-bold text-red-900">
              {formatCurrency(estimates.avg)}
            </div>
          </div>
          <div>
            <div className="text-sm text-red-700 mb-1">High</div>
            <div className="text-2xl font-mono font-bold text-red-900">
              {formatCurrency(estimates.high)}
            </div>
          </div>
        </div>
      </div>

      {/* Your Cost */}
      {hasInsurance && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-4 text-lg">
            Your Cost After Insurance
          </h3>
          <div className="space-y-4 mb-4">
            <div>
              <div className="text-sm text-green-700 mb-1">Low</div>
              <div className="text-2xl font-mono font-bold text-green-900">
                {formatCurrency(estimates.afterInsurance.low)}
              </div>
            </div>
            <div>
              <div className="text-sm text-green-700 mb-1">Average</div>
              <div className="text-3xl font-mono font-bold text-green-900">
                {formatCurrency(estimates.afterInsurance.avg)}
              </div>
            </div>
            <div>
              <div className="text-sm text-green-700 mb-1">High</div>
              <div className="text-2xl font-mono font-bold text-green-900">
                {formatCurrency(estimates.afterInsurance.high)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded p-3">
            <div className="text-sm text-text-secondary mb-1">Insurance Savings</div>
            <div className="text-2xl font-mono font-bold text-green-600">
              {formatCurrency(savings)}
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">⚠️ Important Notes</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• These are estimated costs - actual bills vary widely by location and hospital</li>
          <li>• Costs don't include surgeon fees, anesthesia, or other specialists</li>
          <li>• Out-of-network providers may cost significantly more</li>
          <li>• Ask for an itemized bill and check for errors</li>
          <li>• You may be able to negotiate payment plans with hospitals</li>
          <li>• Emergency procedures may have different billing rules</li>
        </ul>
      </div>

      {/* Billing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Healthcare Cost Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Get a quote in writing before the procedure</li>
          <li>✓ Compare prices at multiple facilities</li>
          <li>✓ Ask about financial assistance programs</li>
          <li>✓ Review your Explanation of Benefits carefully</li>
          <li>✓ Appeal insurance denials if you disagree</li>
          <li>✓ Some nonprofits help negotiate medical bills</li>
        </ul>
      </div>
    </div>
  );
}
