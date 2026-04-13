'use client';

import { useState, useMemo } from 'react';

const taxBrackets = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
  ],
};

const getTaxRate = (income) => {
  for (const bracket of taxBrackets.single) {
    if (income >= bracket.min && income < bracket.max) {
      return bracket.rate;
    }
  }
  return 0.24;
};

export default function USW2vs1099Comparison() {
  const [income, setIncome] = useState('75000');
  const [state, setState] = useState('CA');

  const calculations = useMemo(() => {
    const grossIncome = parseFloat(income) || 0;

    // W-2 (Employee) Calculations
    const federalTaxRate = getTaxRate(grossIncome);
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;

    const federalTax = grossIncome * federalTaxRate;
    const socialSecurityTax = grossIncome * socialSecurityRate;
    const medicareTax = grossIncome * medicareRate;
    const w2Taxes = federalTax + socialSecurityTax + medicareTax;

    const w2NetPay = grossIncome - w2Taxes;

    const w2Benefits = {
      health: 8000,
      dental: 500,
      retirement: 3000,
      pto: 5000,
    };

    const w2TotalBenefits = Object.values(w2Benefits).reduce((a, b) => a + b, 0);

    // 1099 (Contractor) Calculations
    const seIncome = grossIncome * 0.9235; // Deductible portion
    const seTaxRate = 0.153;
    const seTax = seIncome * seTaxRate;

    const federalTax1099 = (grossIncome - seTax / 2) * federalTaxRate;
    const totalTaxes1099 = seTax + federalTax1099;

    const deductionEstimate = 5000; // Estimated business deductions
    const taxableIncome1099 = grossIncome - deductionEstimate - seTax / 2;
    const federalTax1099Adjusted = Math.max(0, taxableIncome1099 * federalTaxRate);
    const totalTaxes1099Adjusted = seTax + federalTax1099Adjusted;

    const netPay1099 = grossIncome - totalTaxes1099Adjusted;

    return {
      w2: {
        grossIncome,
        federalTax: Math.round(federalTax),
        socialSecurityTax: Math.round(socialSecurityTax),
        medicareTax: Math.round(medicareTax),
        totalTaxes: Math.round(w2Taxes),
        netPay: Math.round(w2NetPay),
        benefits: w2Benefits,
        totalBenefits: w2TotalBenefits,
        totalCompensation: Math.round(w2NetPay + w2TotalBenefits),
      },
      '1099': {
        grossIncome,
        seTax: Math.round(seTax),
        federalTax: Math.round(federalTax1099Adjusted),
        totalTaxes: Math.round(totalTaxes1099Adjusted),
        netPay: Math.round(netPay1099),
        benefits: 0,
        deductions: deductionEstimate,
      },
      difference: {
        taxesDifference: Math.round(totalTaxes1099Adjusted - w2Taxes),
        netPayDifference: Math.round(netPay1099 - w2NetPay),
      },
    };
  }, [income]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Income Input */}
      <div className="bg-white border border-border rounded-lg">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Gross Annual Income
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

      {/* Side-by-Side Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* W-2 Employee */}
        <div className="bg-white border border-border rounded-lg space-y-4">
          <h3 className="font-semibold text-text-primary text-lg">W-2 Employee</h3>

          <div className="bg-blue-50 rounded p-3">
            <div className="text-sm text-blue-700 mb-1">Gross Income</div>
            <div className="text-2xl font-mono font-bold text-blue-900">
              {formatCurrency(calculations.w2.grossIncome)}
            </div>
          </div>

          <div className="space-y-2 border-t border-b border-border py-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Federal Income Tax</span>
              <span className="font-mono text-text-primary">
                -{formatCurrency(calculations.w2.federalTax)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Social Security (6.2%)</span>
              <span className="font-mono text-text-primary">
                -{formatCurrency(calculations.w2.socialSecurityTax)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Medicare (1.45%)</span>
              <span className="font-mono text-text-primary">
                -{formatCurrency(calculations.w2.medicareTax)}
              </span>
            </div>
          </div>

          <div className="bg-green-50 rounded p-3">
            <div className="text-sm text-green-700 mb-1">Net Pay (Take-Home)</div>
            <div className="text-2xl font-mono font-bold text-green-900">
              {formatCurrency(calculations.w2.netPay)}
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="font-medium text-text-primary mb-2 text-sm">
              Typical Benefits
            </div>
            {Object.entries(calculations.w2.benefits).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm text-text-secondary mb-1">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-mono">{formatCurrency(value)}</span>
              </div>
            ))}
            <div className="border-t border-border mt-2 pt-2 flex justify-between font-medium text-sm text-accent">
              <span>Benefits Value</span>
              <span className="font-mono">
                +{formatCurrency(calculations.w2.totalBenefits)}
              </span>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded p-3">
            <div className="text-sm text-accent mb-1 font-medium">Total Compensation</div>
            <div className="text-3xl font-mono font-bold text-accent">
              {formatCurrency(calculations.w2.totalCompensation)}
            </div>
          </div>

          <div className="text-xs text-text-muted bg-blue-50 p-2 rounded">
            Employer also pays ~7.65% in matching payroll taxes
          </div>
        </div>

        {/* 1099 Contractor */}
        <div className="bg-white border border-border rounded-lg space-y-4">
          <h3 className="font-semibold text-text-primary text-lg">1099 Contractor</h3>

          <div className="bg-orange-50 rounded p-3">
            <div className="text-sm text-orange-700 mb-1">Gross Income</div>
            <div className="text-2xl font-mono font-bold text-orange-900">
              {formatCurrency(calculations['1099'].grossIncome)}
            </div>
          </div>

          <div className="space-y-2 border-t border-b border-border py-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Self-Employment Tax (15.3%)</span>
              <span className="font-mono text-text-primary">
                -{formatCurrency(calculations['1099'].seTax)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Federal Income Tax</span>
              <span className="font-mono text-text-primary">
                -{formatCurrency(calculations['1099'].federalTax)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
              <span>Business Deductions (est.)</span>
              <span className="font-mono">-{formatCurrency(calculations['1099'].deductions)}</span>
            </div>
          </div>

          <div className="bg-red-50 rounded p-3">
            <div className="text-sm text-red-700 mb-1">Net Pay (Take-Home)</div>
            <div className="text-2xl font-mono font-bold text-red-900">
              {formatCurrency(calculations['1099'].netPay)}
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="font-medium text-text-primary mb-2 text-sm">
              Your Responsibility
            </div>
            <div className="text-sm text-text-secondary space-y-1">
              <div>✓ Health insurance (no employer match)</div>
              <div>✓ Retirement savings (no match)</div>
              <div>✓ Disability insurance</div>
              <div>✓ Quarterly tax payments</div>
              <div>✓ Professional development</div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded p-3">
            <div className="text-sm text-orange-700 mb-1 font-medium">
              Total Costs to Budget For
            </div>
            <div className="text-sm text-orange-800">
              Health insurance (~$400-600/mo)
              <div className="text-xs text-orange-600">+ Medicare tax (2.9%)</div>
              <div className="text-xs text-orange-600">+ Office supplies/software</div>
            </div>
          </div>

          <div className="text-xs text-text-muted bg-orange-50 p-2 rounded">
            You pay the full 15.3% self-employment tax (employer + employee)
          </div>
        </div>
      </div>

      {/* Difference Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`rounded-lg border-2 ${
            calculations.difference.netPayDifference > 0
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div
            className={`text-sm mb-2 ${
              calculations.difference.netPayDifference > 0
                ? 'text-green-700'
                : 'text-red-700'
            }`}
          >
            Net Pay Difference
          </div>
          <div
            className={`text-3xl font-mono font-bold ${
              calculations.difference.netPayDifference > 0
                ? 'text-green-900'
                : 'text-red-900'
            }`}
          >
            {calculations.difference.netPayDifference > 0 ? '+' : ''}
            {formatCurrency(calculations.difference.netPayDifference)}
          </div>
          <div
            className={`text-sm mt-2 ${
              calculations.difference.netPayDifference > 0
                ? 'text-green-700'
                : 'text-red-700'
            }`}
          >
            {calculations.difference.netPayDifference > 0
              ? 'Contractor earns more'
              : 'Employee earns more'}
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg">
          <div className="text-sm text-text-secondary mb-2">Tax Difference</div>
          <div className="text-3xl font-mono font-bold text-accent">
            {calculations.difference.taxesDifference > 0 ? '+' : ''}
            {formatCurrency(Math.abs(calculations.difference.taxesDifference))}
          </div>
          <div className="text-sm text-text-secondary mt-2">
            {calculations.difference.taxesDifference > 0
              ? 'Contractor pays more in taxes'
              : 'Employee pays more in taxes'}
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4">Key Differences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2 text-sm">W-2 Advantages</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>✓ Employer-provided benefits</li>
              <li>✓ Employer matches taxes</li>
              <li>✓ Stable income & job security</li>
              <li>✓ Unemployment insurance</li>
              <li>✓ Paid time off</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2 text-sm">1099 Advantages</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>✓ Flexibility and independence</li>
              <li>✓ Multiple income streams</li>
              <li>✓ Business expense deductions</li>
              <li>✓ Tax-advantaged retirement plans</li>
              <li>✓ Higher earning potential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
