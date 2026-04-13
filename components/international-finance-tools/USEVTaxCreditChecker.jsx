'use client';

import { useState, useMemo } from 'react';

const eligibleVehicles = [
  { make: 'Tesla', model: 'Model 3', year: '2023+', status: 'Eligible' },
  { make: 'Tesla', model: 'Model Y', year: '2023+', status: 'Eligible' },
  { make: 'Tesla', model: 'Model S', year: '2023+', status: 'Eligible' },
  { make: 'Tesla', model: 'Model X', year: '2023+', status: 'Eligible' },
  { make: 'Chevy', model: 'Bolt EV', year: '2023+', status: 'Eligible' },
  { make: 'Chevy', model: 'Equinox EV', year: '2024+', status: 'Eligible' },
  { make: 'Ford', model: 'Mustang Mach-E', year: '2023+', status: 'Eligible' },
  { make: 'Ford', model: 'F-150 Lightning', year: '2023+', status: 'Eligible' },
  { make: 'Hyundai', model: 'Ioniq 6', year: '2023+', status: 'Eligible' },
  { make: 'Kia', model: 'EV6', year: '2023+', status: 'Eligible' },
  { make: 'BMW', model: 'i4', year: '2023+', status: 'Eligible' },
  { make: 'Volkswagen', model: 'ID.4', year: '2023+', status: 'Eligible' },
  { make: 'Nissan', model: 'Leaf', year: '2023+', status: 'Limited' },
];

export default function USEVTaxCreditChecker() {
  const [make, setMake] = useState('Tesla');
  const [model, setModel] = useState('Model 3');
  const [year, setYear] = useState('2024');
  const [filingStatus, setFilingStatus] = useState('single');
  const [income, setIncome] = useState('75000');
  const [purchaseType, setPurchaseType] = useState('new');

  const creditAmount = useMemo(() => {
    // Simplified eligibility check
    const eligible = eligibleVehicles.some(
      (v) => v.make === make && v.model === model && v.status !== 'Not Eligible'
    );

    if (!eligible) return 0;

    // Income limits (simplified)
    const incomeLimits = {
      single: 55000,
      married: 110000,
      headOfHousehold: 82500,
    };

    const inc = parseFloat(income) || 0;
    const limit = incomeLimits[filingStatus] || 55000;

    if (inc > limit) return 0;

    // Credit amount
    if (purchaseType === 'new') return 7500;
    if (purchaseType === 'used') return 4000;
    return 0;
  }, [make, model, year, filingStatus, income, purchaseType]);

  const isEligible = creditAmount > 0;

  const uniqueMakes = Array.from(new Set(eligibleVehicles.map((v) => v.make))).sort();
  const modelsForMake = Array.from(
    new Set(
      eligibleVehicles.filter((v) => v.make === make).map((v) => v.model)
    )
  ).sort();

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Vehicle Selection */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Vehicle Information
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Make
            </label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                const firstModel = eligibleVehicles
                  .filter((v) => v.make === e.target.value)
                  .map((v) => v.model)[0];
                setModel(firstModel || 'Model');
              }}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              {uniqueMakes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              {modelsForMake.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              {[2024, 2023, 2022, 2021, 2020].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Eligibility Information */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Eligibility Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="headOfHousehold">Head of Household</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Modified Adjusted Gross Income
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Purchase Type
            </label>
            <select
              value={purchaseType}
              onChange={(e) => setPurchaseType(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              <option value="new">New Vehicle</option>
              <option value="used">Used Vehicle (2+ years old)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tax Credit Result */}
      <div
        className={`rounded-lg border-2 ${
          isEligible
            ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300'
            : 'bg-gradient-to-r from-red-50 to-red-100 border-red-300'
        }`}
      >
        <div
          className={`text-sm ${
            isEligible ? 'text-green-700' : 'text-red-700'
          } mb-2`}
        >
          {isEligible ? 'Eligible for Tax Credit' : 'Not Eligible'}
        </div>
        <div
          className={`text-5xl font-mono font-bold ${
            isEligible ? 'text-green-900' : 'text-red-900'
          }`}
        >
          {isEligible ? '+' : '-'} ${creditAmount.toLocaleString()}
        </div>
        {isEligible && (
          <div className={`text-sm ${isEligible ? 'text-green-700' : 'text-red-700'} mt-2`}>
            Reduces your federal income tax liability
          </div>
        )}
      </div>

      {/* Details */}
      {isEligible && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">How the Credit Works</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              • This credit reduces your federal income tax dollar-for-dollar
            </li>
            <li>
              • You can claim it when you file your 2024 tax return (tax year 2024)
            </li>
            <li>
              • The vehicle must be assembled in North America
            </li>
            <li>
              • There are additional battery component and mineral content requirements
            </li>
            <li>
              • For used vehicles, the car must be at least 2 years old and under $25,000
            </li>
          </ul>
        </div>
      )}

      {!isEligible && (
        <div className="bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-3">Why Ineligible</h3>
          <div className="text-sm text-red-800">
            {parseFloat(income) >
            (['single', 'married', 'headOfHousehold'][filingStatus === 'single' ? 0 : filingStatus === 'married' ? 1 : 2] === 'married'
              ? 110000
              : 55000) ? (
              <p>
                Your income exceeds the limit for your filing status. Consider
                filing jointly if married or waiting for income to decrease.
              </p>
            ) : (
              <p>
                This vehicle does not currently qualify for the federal EV tax
                credit. Check back as more vehicles become eligible.
              </p>
            )}
          </div>
        </div>
      )}

      {/* List of Eligible Vehicles */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4">
          Common Eligible Vehicles (2024)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-text-secondary font-medium">
                  Make
                </th>
                <th className="text-left py-2 px-3 text-text-secondary font-medium">
                  Model
                </th>
                <th className="text-left py-2 px-3 text-text-secondary font-medium">
                  Available Year
                </th>
                <th className="text-left py-2 px-3 text-text-secondary font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {eligibleVehicles.slice(0, 10).map((vehicle, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-surface"
                >
                  <td className="py-2 px-3 text-text-primary">
                    {vehicle.make}
                  </td>
                  <td className="py-2 px-3 text-text-primary">
                    {vehicle.model}
                  </td>
                  <td className="py-2 px-3 text-text-secondary">
                    {vehicle.year}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        vehicle.status === 'Eligible'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
