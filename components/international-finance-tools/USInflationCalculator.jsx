'use client';

import { useState, useMemo } from 'react';

// Simplified CPI data (base year 2020 = 100)
const cpiData = {
  2000: 70.4,
  2005: 77.3,
  2010: 83.8,
  2015: 89.6,
  2020: 100.0,
  2021: 104.7,
  2022: 113.0,
  2023: 120.5,
  2024: 127.4,
  2025: 132.1,
};

export default function USInflationCalculator() {
  const [amount, setAmount] = useState('100');
  const [startYear, setStartYear] = useState('2020');
  const [endYear, setEndYear] = useState('2025');

  const years = Object.keys(cpiData).map(Number).sort();

  const calculations = useMemo(() => {
    const amountVal = parseFloat(amount) || 100;
    const startYearVal = parseInt(startYear) || 2020;
    const endYearVal = parseInt(endYear) || 2025;

    const startCPI = cpiData[startYearVal] || 100;
    const endCPI = cpiData[endYearVal] || 100;

    const equivalentValue = (amountVal * endCPI) / startCPI;
    const inflationAmount = equivalentValue - amountVal;
    const inflationPercent = ((inflationAmount / amountVal) * 100).toFixed(1);

    return {
      originalAmount: amountVal,
      startYear: startYearVal,
      startCPI,
      endYear: endYearVal,
      endCPI,
      equivalentValue: equivalentValue.toFixed(2),
      inflationAmount: inflationAmount.toFixed(2),
      inflationPercent,
      annualRate: ((Math.pow(endCPI / startCPI, 1 / (endYearVal - startYearVal)) - 1) * 100).toFixed(2),
    };
  }, [amount, startYear, endYear]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const purchasingPowerChange = useMemo(() => {
    const startCPI = cpiData[parseInt(startYear)];
    const endCPI = cpiData[parseInt(endYear)];
    const change = ((startCPI / endCPI) * 100 - 100).toFixed(1);
    return change;
  }, [startYear, endYear]);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Inputs */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Inflation Calculator
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Dollar Amount
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-surface border border-border rounded-lg text-text-muted">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="10"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Start Year
            </label>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              End Year
            </label>
            <select
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Result */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="text-sm text-blue-700 mb-2">Original Value</div>
            <div className="text-4xl font-mono font-bold text-blue-900">
              {formatCurrency(calculations.originalAmount)}
            </div>
            <div className="text-sm text-blue-700 mt-1">in {calculations.startYear}</div>
          </div>

          <div className="text-2xl text-blue-700 font-bold hidden md:block">→</div>

          <div>
            <div className="text-sm text-blue-700 mb-2">Equivalent Value</div>
            <div className="text-4xl font-mono font-bold text-blue-900">
              {formatCurrency(calculations.equivalentValue)}
            </div>
            <div className="text-sm text-blue-700 mt-1">in {calculations.endYear}</div>
          </div>
        </div>
      </div>

      {/* Inflation Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-700 mb-2">Inflation Amount</div>
          <div className="text-3xl font-mono font-bold text-red-900">
            +{formatCurrency(calculations.inflationAmount)}
          </div>
          <div className="text-sm text-red-700 mt-2">
            Additional cost due to inflation
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg">
          <div className="text-sm text-orange-700 mb-2">Total Inflation</div>
          <div className="text-3xl font-mono font-bold text-orange-900">
            {calculations.inflationPercent}%
          </div>
          <div className="text-sm text-orange-700 mt-2">
            Over {calculations.endYear - calculations.startYear} years
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-700 mb-2">Average Annual Rate</div>
          <div className="text-3xl font-mono font-bold text-yellow-900">
            {calculations.annualRate}%
          </div>
          <div className="text-sm text-yellow-700 mt-2">
            Yearly average inflation
          </div>
        </div>
      </div>

      {/* Purchasing Power */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-4">
          Purchasing Power Change
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-green-700 mb-2">What {calculations.startYear} dollars could buy:</div>
            <div className="text-2xl font-mono font-bold text-green-900">
              {formatCurrency(calculations.originalAmount)}
            </div>
          </div>
          <div>
            <div className="text-sm text-green-700 mb-2">What those same items cost in {calculations.endYear}:</div>
            <div className="text-2xl font-mono font-bold text-green-900">
              {formatCurrency(calculations.equivalentValue)}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-green-700 mb-2">Your money's buying power decreased by:</div>
            <div className="text-2xl font-mono font-bold text-red-600">
              {purchasingPowerChange}%
            </div>
            <div className="text-sm text-green-700 mt-1">
              A dollar in {calculations.startYear} is worth{' '}
              {(100 + parseFloat(purchasingPowerChange)).toFixed(2)}¢ in {calculations.endYear}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Inflation */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          CPI Index History
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {years.map((year) => (
            <div
              key={year}
              className={`p-3 rounded text-center border ${
                (year.toString() === startYear || year.toString() === endYear)
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-surface'
              }`}
            >
              <div className="text-sm font-medium text-text-primary">{year}</div>
              <div className="font-mono font-bold text-accent text-lg">
                {cpiData[year].toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inflation Breakdown by Category */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Typical Inflation by Category (2024 data)
        </h3>
        <div className="space-y-2">
          {[
            { category: 'Energy / Gasoline', rate: '2.8%' },
            { category: 'Food & Beverages', rate: '2.4%' },
            { category: 'Housing', rate: '4.2%' },
            { category: 'Medical Care', rate: '3.1%' },
            { category: 'Transportation', rate: '2.1%' },
            { category: 'Clothing', rate: '0.5%' },
          ].map((item) => (
            <div
              key={item.category}
              className="flex justify-between items-center p-3 bg-surface rounded"
            >
              <span className="text-text-secondary">{item.category}</span>
              <span className="font-mono font-bold text-text-primary">
                {item.rate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">📊 About Inflation</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>
            <strong>CPI (Consumer Price Index)</strong> measures the average change in prices paid by consumers over time
          </p>
          <p>
            <strong>Inflation</strong> is when the general price level of goods and services increases, reducing purchasing power
          </p>
          <p>
            This calculator uses the U.S. Consumer Price Index data to estimate how much money from one year is worth in another year
          </p>
          <p>
            The Federal Reserve targets an inflation rate of about 2% annually as optimal for economic growth
          </p>
        </div>
      </div>
    </div>
  );
}
