'use client';

import { useState, useMemo } from 'react';

export default function AustraliaRentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(600000);
  const [weeklyRent, setWeeklyRent] = useState(400);
  const [councilRates, setCouncilRates] = useState(1800);
  const [insuranceCost, setInsuranceCost] = useState(1500);
  const [managementFee, setManagementFee] = useState(8);
  const [maintenance, setMaintenance] = useState(100);
  const [vacancy, setVacancy] = useState(5);

  const results = useMemo(() => {
    const property = parseFloat(propertyValue) || 0;
    const rent = parseFloat(weeklyRent) || 0;
    const rates = parseFloat(councilRates) || 0;
    const insurance = parseFloat(insuranceCost) || 0;
    const mgmtPercent = parseFloat(managementFee) || 0;
    const maint = parseFloat(maintenance) || 0;
    const vacancyPercent = parseFloat(vacancy) || 0;

    // Annual rent
    const annualRent = rent * 52;

    // Vacancy loss
    const vacancyLoss = (annualRent * vacancyPercent) / 100;

    // Effective rent
    const effectiveRent = annualRent - vacancyLoss;

    // Management fee (typically % of collected rent)
    const mgmtCost = (effectiveRent * mgmtPercent) / 100;

    // Monthly maintenance cost (annual)
    const annualMaintenance = maint * 12;

    // Total expenses
    const totalExpenses = rates + insurance + mgmtCost + annualMaintenance;

    // Net rental income
    const netIncome = effectiveRent - totalExpenses;

    // Gross rental yield
    const grossYield = (annualRent / property) * 100;

    // Net rental yield
    const netYield = (netIncome / property) * 100;

    // Cash-on-cash (assumes 20% down payment)
    const downPayment = property * 0.2;
    const cashOnCash = downPayment > 0 ? (netIncome / downPayment) * 100 : 0;

    // Negative gearing
    const isNegativeGearing = netIncome < 0;
    const negativGearingBenefit = isNegativeGearing ? Math.abs(netIncome) : 0;

    return {
      annualRent: annualRent.toFixed(2),
      vacancyLoss: vacancyLoss.toFixed(2),
      effectiveRent: effectiveRent.toFixed(2),
      councilRates: rates.toFixed(2),
      insurance: insurance.toFixed(2),
      managementFee: mgmtCost.toFixed(2),
      maintenance: annualMaintenance.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      netIncome: netIncome.toFixed(2),
      grossYield: grossYield.toFixed(2),
      netYield: netYield.toFixed(2),
      cashOnCash: cashOnCash.toFixed(2),
      isNegativeGearing,
      negativGearingBenefit: negativGearingBenefit.toFixed(2),
      monthlyNetIncome: (netIncome / 12).toFixed(2),
    };
  }, [
    propertyValue,
    weeklyRent,
    councilRates,
    insuranceCost,
    managementFee,
    maintenance,
    vacancy,
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Property Value (AUD)
              </label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="Enter property value"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Weekly Rent (AUD)
              </label>
              <input
                type="number"
                value={weeklyRent}
                onChange={(e) => setWeeklyRent(e.target.value)}
                placeholder="Enter weekly rent"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-6">
            <p className="text-text-primary font-medium mb-4">Annual Expenses</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Council Rates/Year (AUD)
                </label>
                <input
                  type="number"
                  value={councilRates}
                  onChange={(e) => setCouncilRates(e.target.value)}
                  placeholder="Council rates"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Insurance/Year (AUD)
                </label>
                <input
                  type="number"
                  value={insuranceCost}
                  onChange={(e) => setInsuranceCost(e.target.value)}
                  placeholder="Insurance cost"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Management Fee (% of rent)
                </label>
                <input
                  type="number"
                  value={managementFee}
                  onChange={(e) => setManagementFee(e.target.value)}
                  step="0.5"
                  placeholder="Management fee %"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Maintenance/Month (AUD)
                </label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  placeholder="Monthly maintenance"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Vacancy Rate (%)
              </label>
              <input
                type="number"
                value={vacancy}
                onChange={(e) => setVacancy(e.target.value)}
                step="0.5"
                placeholder="Vacancy rate"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Income Summary */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Income Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Gross Annual Rent:</span>
              <span className="font-mono font-semibold">
                ${results.annualRent}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Vacancy Loss ({vacancy}%):</span>
              <span className="font-mono font-semibold text-error">
                -${results.vacancyLoss}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Effective Rent:</span>
              <span className="font-mono text-xl font-semibold text-accent">
                ${results.effectiveRent}
              </span>
            </div>
          </div>
        </div>

        {/* Expenses Summary */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Annual Expenses</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Council Rates:</span>
              <span className="font-mono font-semibold">${results.councilRates}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Insurance:</span>
              <span className="font-mono font-semibold">${results.insurance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Management Fee:</span>
              <span className="font-mono font-semibold">
                ${results.managementFee}
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-text-secondary">Maintenance:</span>
              <span className="font-mono font-semibold">${results.maintenance}</span>
            </div>

            <div className="flex justify-between pt-3 bg-red-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <span className="text-text-primary font-semibold">Total Expenses:</span>
              <span className="font-mono text-lg font-semibold text-error">
                ${results.totalExpenses}
              </span>
            </div>
          </div>
        </div>

        {/* Yields and Returns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Gross Yield (Annual)</p>
            <p className="text-3xl font-mono font-semibold text-accent">
              {results.grossYield}%
            </p>
            <p className="text-text-muted text-xs mt-2">
              (Gross rent / property value)
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Net Yield (Annual)</p>
            <p className={`text-3xl font-mono font-semibold ${
              parseFloat(results.netYield) >= 0 ? 'text-accent' : 'text-error'
            }`}>
              {results.netYield}%
            </p>
            <p className="text-text-muted text-xs mt-2">
              (Net income / property value)
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Cash-on-Cash Return (20% down)</p>
            <p className={`text-3xl font-mono font-semibold ${
              parseFloat(results.cashOnCash) >= 0 ? 'text-accent' : 'text-error'
            }`}>
              {results.cashOnCash}%
            </p>
            <p className="text-text-muted text-xs mt-2">
              (Annual net / down payment)
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-4">
            <p className="text-text-secondary text-sm mb-2">Monthly Net Income</p>
            <p className={`text-3xl font-mono font-semibold ${
              parseFloat(results.monthlyNetIncome) >= 0 ? 'text-accent' : 'text-error'
            }`}>
              ${results.monthlyNetIncome}
            </p>
            {results.isNegativeGearing && (
              <p className="text-text-muted text-xs mt-2">
                Negative gearing: -${results.negativGearingBenefit}/year
              </p>
            )}
          </div>
        </div>

        {/* Net Income Summary */}
        <div className={`rounded-lg border p-6 ${
          parseFloat(results.netIncome) >= 0
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          <h3 className="text-text-primary font-semibold text-lg mb-2">Annual Net Income</h3>
          <p className={`text-4xl font-mono font-semibold ${
            parseFloat(results.netIncome) >= 0 ? 'text-success' : 'text-error'
          }`}>
            {parseFloat(results.netIncome) >= 0 ? '+' : ''} ${results.netIncome}
          </p>
          {results.isNegativeGearing && (
            <p className="text-text-secondary text-sm mt-2">
              This property is negatively geared. You're paying more in expenses than receiving in rent.
              Tax deductions may apply for the shortfall.
            </p>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Does not include mortgage interest or loan repayment</li>
            <li>Does not account for capital growth or depreciation</li>
            <li>Does not include body corporate fees (units)</li>
            <li>Vacancy rates vary by property and market</li>
            <li>Management fees and expenses vary by location</li>
            <li>Consult a tax accountant for negative gearing deductions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
