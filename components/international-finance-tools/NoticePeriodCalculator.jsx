'use client';

import { useState } from 'react';

const noticePeriods = {
  CA: {
    country: 'Canada',
    notice: '2 weeks',
    details: 'Federal: 2 weeks. Some provinces require more (varies by province)',
  },
  US: {
    country: 'United States',
    notice: 'None required',
    details: 'At-will employment. No legal requirement, but 2 weeks is customary',
  },
  AU: {
    country: 'Australia',
    notice: '1-4 weeks',
    details: 'Depends on years of service. Full-time: 1 week (under 1 yr), 2 weeks (1-5 yrs), 4 weeks (5+ yrs)',
  },
  UK: {
    country: 'United Kingdom',
    notice: 'Minimum 1 week',
    details: 'After first month. Longer if contract specifies. Statutory minimum: 1 week',
  },
  NZ: {
    country: 'New Zealand',
    notice: 'Reasonable notice',
    details: 'Typical: 1-2 weeks for 1-5 years service, 2-4 weeks for longer service',
  },
  DE: {
    country: 'Germany',
    notice: '4 weeks',
    details: 'Standard: 4 weeks to 15th or end of month. Dismissal requires longer (4 weeks to end of calendar month)',
  },
  FR: {
    country: 'France',
    notice: '2+ weeks',
    details: 'Depends on service length and position. Minimum 2 weeks for blue-collar, more for managers',
  },
  JP: {
    country: 'Japan',
    notice: 'Case-by-case',
    details: 'Varies by contract. Common: 2 weeks to 1 month. Some companies require longer',
  },
  IE: {
    country: 'Ireland',
    notice: 'Minimum 1 week',
    details: 'After 13 weeks employment. Standard: 1-2 weeks',
  },
  SG: {
    country: 'Singapore',
    notice: '1 week - 1 month',
    details: 'Depends on contract and tenure. Standard: 1 month for standard employment',
  },
};

export default function NoticePeriodCalculator() {
  const [country, setCountry] = useState('CA');
  const [yearsService, setYearsService] = useState('3');
  const [contractType, setContractType] = useState('permanent');

  const data = noticePeriods[country];

  const handleQuickSelect = (code) => {
    setCountry(code);
  };

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Country Selection */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Country
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent mb-4"
        >
          {Object.entries(noticePeriods).map(([key, { country }]) => (
            <option key={key} value={key}>
              {country}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {['CA', 'US', 'AU', 'UK', 'NZ'].map((code) => (
            <button
              key={code}
              onClick={() => handleQuickSelect(code)}
              className={`p-2 rounded text-sm font-medium transition ${
                country === code
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Employment Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Years of Service
          </label>
          <input
            type="number"
            value={yearsService}
            onChange={(e) => setYearsService(e.target.value)}
            step="0.5"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Contract Type
          </label>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="permanent">Permanent / Full-time</option>
            <option value="fixed-term">Fixed-term Contract</option>
            <option value="casual">Casual / Part-time</option>
            <option value="probation">Probation Period</option>
          </select>
        </div>
      </div>

      {/* Notice Period Display */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-700 mb-2">Legal Notice Period</div>
        <div className="text-4xl font-bold text-blue-900 mb-4">
          {data.notice}
        </div>
        <div className="text-sm text-blue-800">
          {data.country}
          {parseInt(yearsService) > 0 && ` - ${yearsService} years service`}
        </div>
      </div>

      {/* Details */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3 text-lg">
          Notice Requirements
        </h3>
        <p className="text-text-secondary text-sm mb-4">{data.details}</p>

        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-medium text-text-primary mb-2 text-sm">
            Key Considerations:
          </h4>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• Check your employment contract for specific terms</li>
            <li>• Notice can sometimes be waived with mutual agreement</li>
            <li>• Payment in lieu of notice (PILON) may be an option</li>
            <li>• Employee notice may differ from employer notice</li>
            <li>• Probation periods may have different rules</li>
          </ul>
        </div>
      </div>

      {/* Global Comparison */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Notice Periods Worldwide
        </h3>
        <div className="space-y-2">
          {Object.entries(noticePeriods)
            .sort((a, b) => a[1].country.localeCompare(b[1].country))
            .map(([key, data]) => (
              <div
                key={key}
                className={`flex justify-between items-start p-3 rounded border ${
                  country === key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <div>
                  <div className="font-medium text-text-primary">
                    {data.country}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {data.notice}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Resignation Process */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">
          📋 Steps When Resigning
        </h3>
        <ol className="space-y-2 text-sm text-blue-800">
          <li>1. Review your employment contract and local laws</li>
          <li>2. Prepare a resignation letter with last working day</li>
          <li>3. Speak with your manager in person if possible</li>
          <li>4. Submit formal resignation to HR</li>
          <li>5. Keep a copy of resignation confirmation</li>
          <li>6. Clarify final paycheck and benefits details</li>
          <li>7. Plan knowledge transfer with team</li>
          <li>8. Follow any company exit procedures</li>
        </ol>
      </div>

      {/* Legal Advice Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-2">
          ⚠️ Important Disclaimer
        </h3>
        <p className="text-sm text-yellow-800">
          This tool provides general information only. Employment laws vary significantly
          by country, region, industry, and individual contract terms. Always consult
          your employment contract and/or local employment authority for accurate legal
          advice specific to your situation. This is not legal advice.
        </p>
      </div>

      {/* Resources */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">
          📞 Resources by Country
        </h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-green-800">
          {[
            { country: 'Canada', org: 'Labour Canada (dept.justice.gc.ca)' },
            { country: 'US', org: 'Department of Labor (dol.gov)' },
            { country: 'Australia', org: 'Fair Work Commission (fwc.gov.au)' },
            { country: 'UK', org: 'ACAS (acas.org.uk)' },
            { country: 'New Zealand', org: 'Employment Court (employmentcourt.govt.nz)' },
            { country: 'EU countries', org: 'National labour authorities' },
          ].map((item) => (
            <div key={item.country} className="bg-white rounded p-2 border border-green-100">
              <div className="font-medium text-green-900">{item.country}</div>
              <div className="text-xs">{item.org}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
