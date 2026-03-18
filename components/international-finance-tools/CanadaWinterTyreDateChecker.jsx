'use client';

import { useState } from 'react';

const winterTyreRules = {
  QC: {
    province: 'Quebec',
    required: true,
    startDate: 'Dec 1',
    endDate: 'Mar 15',
    penalty: '$60-300',
  },
  MB: {
    province: 'Manitoba',
    required: false,
    startDate: 'Oct 1',
    endDate: 'Mar 31',
    note: 'Required Dec 1 - Mar 31 in winter',
    penalty: 'Not mandated',
  },
  NB: {
    province: 'New Brunswick',
    required: false,
    startDate: 'Oct 1',
    endDate: 'Apr 30',
    note: 'Recommended Oct 1 - Apr 30',
    penalty: 'Not mandated',
  },
  NS: {
    province: 'Nova Scotia',
    required: false,
    startDate: 'N/A',
    endDate: 'N/A',
    note: 'Recommended in winter',
    penalty: 'Not mandated',
  },
  ON: {
    province: 'Ontario',
    required: false,
    startDate: 'N/A',
    endDate: 'N/A',
    note: 'Recommended Oct 1 - Apr 30',
    penalty: 'Not mandated',
  },
  BC: {
    province: 'British Columbia',
    required: true,
    startDate: 'Oct 1',
    endDate: 'Mar 31',
    penalty: 'Fines for non-compliance',
  },
  AB: {
    province: 'Alberta',
    required: false,
    startDate: 'N/A',
    endDate: 'N/A',
    note: 'Recommended year-round',
    penalty: 'Not mandated',
  },
};

export default function CanadaWinterTyreDateChecker() {
  const [selectedProvince, setSelectedProvince] = useState('QC');

  const rule = winterTyreRules[selectedProvince];

  const getMonthColor = (month) => {
    const winterMonths = ['December', 'January', 'February', 'March'];
    return winterMonths.includes(month) ? 'bg-blue-100' : 'bg-gray-100';
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Province Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Select Your Province
        </label>
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
        >
          {Object.entries(winterTyreRules).map(([key, { province }]) => (
            <option key={key} value={key}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* Rule Summary */}
      <div
        className={`rounded-lg p-8 border-2 ${
          rule.required
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        <div className="text-2xl font-semibold mb-2">
          {rule.required ? '❄️ Winter Tires Required' : '⚠️ Winter Tires Recommended'}
        </div>
        {rule.required && (
          <div className="text-lg font-semibold mb-3">
            {rule.startDate} - {rule.endDate}
          </div>
        )}
        {!rule.required && rule.note && (
          <div className="text-sm mb-3">{rule.note}</div>
        )}
        <div className={`text-lg font-semibold ${
          rule.required ? 'text-red-700' : 'text-yellow-700'
        }`}>
          Penalty: {rule.penalty}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Winter Tire Calendar
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {months.map((month, idx) => {
            const startIdx = months.indexOf(rule.startDate?.split(' ')[0] || 'January');
            const endIdx = months.indexOf(rule.endDate?.split(' ')[0] || 'March');

            let isWinterPeriod = false;
            if (rule.required) {
              if (startIdx > endIdx) {
                // Wraps around year (e.g., Dec to Mar)
                isWinterPeriod = idx >= startIdx || idx <= endIdx;
              } else {
                isWinterPeriod = idx >= startIdx && idx <= endIdx;
              }
            }

            return (
              <div
                key={month}
                className={`p-3 rounded text-center border ${
                  isWinterPeriod
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-50 border-border'
                }`}
              >
                <div className="text-xs font-medium text-text-primary">
                  {month.slice(0, 3)}
                </div>
                {isWinterPeriod && (
                  <div className="text-lg mt-1">❄️</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Winter Tire Facts */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">❄️ Winter Tire Facts</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>Tread Depth:</strong> Winter tires should have minimum 6/32 inch tread depth
          </p>
          <p>
            <strong>Temperature:</strong> Use winter tires when temperatures drop below 7°C (45°F) consistently
          </p>
          <p>
            <strong>Performance:</strong> Winter tires provide 25-40% better traction than all-season tires in snow
          </p>
          <p>
            <strong>All-Season:</strong> Not the same as winter tires - don't provide same winter performance
          </p>
          <p>
            <strong>Storage:</strong> Properly store off-season tires in cool, dry place away from direct sunlight
          </p>
        </div>
      </div>

      {/* Changeover Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          🔧 Tire Changeover Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2 text-text-secondary">
            <li>• Change tires before first snow</li>
            <li>• Have tires balanced and rotated</li>
            <li>• Check tire pressure (pressure drops in cold)</li>
            <li>• Inspect for damage or wear</li>
          </ul>
          <ul className="space-y-2 text-text-secondary">
            <li>• Keep receipt for reimbursement if required</li>
            <li>• Store all-season tires properly</li>
            <li>• Plan changeover 1-2 weeks before season</li>
            <li>• Budget $400-1000 per set of tires</li>
          </ul>
        </div>
      </div>

      {/* Provincial Comparison */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          Winter Tire Requirements by Province
        </h3>
        <div className="space-y-2 text-sm">
          {Object.values(winterTyreRules)
            .sort((a, b) => (b.required ? 1 : -1))
            .map((prov) => (
              <div
                key={prov.province}
                className={`flex justify-between items-center p-3 rounded border ${
                  prov.required
                    ? 'bg-red-50 border-red-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <span className="font-medium text-text-primary">
                  {prov.province}
                </span>
                <span className="text-xs font-bold">
                  {prov.required ? '❌ REQUIRED' : '⚠️ Recommended'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
