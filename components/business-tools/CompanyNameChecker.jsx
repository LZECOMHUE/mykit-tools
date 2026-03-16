'use client';

import { useState } from 'react';

export default function CompanyNameChecker() {
  const [companyName, setCompanyName] = useState('');
  const [checkedName, setCheckedName] = useState(null);

  const restrictedWords = [
    'Royal', 'Crown', 'Government', 'NHS', 'Police', 'Bank', 'Charity', 'University',
    'Trust', 'Authority', 'Council', 'Limited', 'Group', 'International',
  ];

  const offensiveWords = ['Explicit content patterns would go here'];

  const handleCheck = () => {
    const name = companyName.trim();
    if (!name) return;

    const warnings = [];
    const lowercase = name.toLowerCase();

    restrictedWords.forEach((word) => {
      if (lowercase.includes(word.toLowerCase())) {
        warnings.push(`"${word}" is a restricted word and may require special approval`);
      }
    });

    if (name.length < 2) {
      warnings.push('Company name must be at least 2 characters');
    }

    if (name.length > 200) {
      warnings.push('Company name exceeds 200 characters');
    }

    if (!/^[a-zA-Z0-9\s&.,'-]+$/.test(name)) {
      warnings.push('Contains special characters that may not be allowed');
    }

    setCheckedName({
      name,
      warnings,
      passed: warnings.length === 0,
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Proposed Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="e.g., Acme Innovations Ltd"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <button
          onClick={handleCheck}
          className="w-full px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
        >
          Check Name
        </button>
      </div>

      {checkedName && (
        <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
          <div className={`rounded-[var(--radius-input)] p-4 border-2 ${
            checkedName.passed
              ? 'border-success bg-green-50'
              : 'border-warning bg-orange-50'
          }`}>
            <p className="text-sm text-text-secondary mb-2">Status</p>
            <p className={`text-xl font-bold ${
              checkedName.passed ? 'text-success' : 'text-warning'
            }`}>
              {checkedName.passed ? 'Name Check Passed' : 'Issues Found'}
            </p>
          </div>

          {checkedName.warnings.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-text-primary mb-3">Issues</h3>
              <ul className="space-y-2">
                {checkedName.warnings.map((warning, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-warning">
                    <span className="text-warning">!</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {checkedName.passed && (
            <div className="mt-4 bg-green-100 rounded-[var(--radius-input)] p-3">
              <p className="text-sm text-success font-medium">
                Name appears to follow naming conventions. However, you must check Companies House availability.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Naming Rules
        </h3>

        <div className="space-y-3">
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary">Minimum Length</p>
            <p className="text-sm text-text-secondary">At least 2 characters required</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary">Restricted Words</p>
            <p className="text-sm text-text-secondary">Some words (Royal, Bank, etc.) require special approval</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary">Availability</p>
            <p className="text-sm text-text-secondary">Must be unique. Check Companies House register.</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary">Endings</p>
            <p className="text-sm text-text-secondary">Ltd, PLC, Limited, etc. must match your company type</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        This is a basic check only. Always verify availability on Companies House before registering. This tool is not legal advice.
      </p>
    </div>
  );
}
