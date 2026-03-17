'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';

export default function ShouldIRentOrBuy() {
  const [monthlyRent, setMonthlyRent] = useState(1000);
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [depositAvailable, setDepositAvailable] = useState(60000);
  const [mortgageRate, setMortgageRate] = useState(5.5);
  const [propertyGrowth, setPropertyGrowth] = useState(2.5);
  const [investmentReturn, setInvestmentReturn] = useState(6);
  const [yearsToCompare, setYearsToCompare] = useState(10);
  const [loanTerm, setLoanTerm] = useState(25);

  const results = useMemo(() => {
    // Renting calculations
    const totalRent = monthlyRent * 12 * yearsToCompare;

    // Buying calculations
    const depositPercent = (depositAvailable / propertyPrice) * 100;
    const loanAmount = propertyPrice - depositAvailable;

    // Mortgage payment calculation (monthly)
    const monthlyRate = mortgageRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Total mortgage payments over comparison period
    const paymentsInPeriod = Math.min(yearsToCompare * 12, numberOfPayments);
    const totalMortgagePayments = monthlyPayment * paymentsInPeriod;

    // Property value after years
    const propertyValueAfter =
      propertyPrice * Math.pow(1 + propertyGrowth / 100, yearsToCompare);
    const propertyGain = propertyValueAfter - propertyPrice;

    // Remaining mortgage balance
    const remainingPayments = Math.max(0, numberOfPayments - paymentsInPeriod);
    const remainingBalance =
      (monthlyPayment * (Math.pow(1 + monthlyRate, remainingPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, remainingPayments));

    // Equity built
    const equityBuilt = loanAmount - remainingBalance;

    // If you invest the deposit instead of buying
    const investmentValue =
      depositAvailable * Math.pow(1 + investmentReturn / 100, yearsToCompare);
    const investmentGain = investmentValue - depositAvailable;

    // Opportunity cost of deposit (invested at investment return rate)
    const depositInvested = depositAvailable * Math.pow(1 + investmentReturn / 100, yearsToCompare);

    // Home insurance, maintenance, taxes (rough estimates)
    const annualPropertyTax = propertyPrice * 0.002; // Rough estimate
    const annualMaintenance = propertyPrice * 0.01; // Rough estimate
    const annualHomeInsurance = propertyPrice * 0.003; // Rough estimate
    const totalOwningCosts = (annualPropertyTax + annualMaintenance + annualHomeInsurance) * yearsToCompare;

    // Total cost of buying
    const totalBuyingCost =
      totalMortgagePayments + totalOwningCosts - propertyGain;

    // Total cost of renting
    const totalRentingCost = totalRent;

    // Breakeven analysis
    let breakevenYear = null;
    for (let year = 1; year <= yearsToCompare; year++) {
      const rentCostYear = monthlyRent * 12 * year;
      const propValue = propertyPrice * Math.pow(1 + propertyGrowth / 100, year);
      const paymentsYear = monthlyPayment * Math.min(year * 12, numberOfPayments);
      const costYear = paymentsYear + (annualPropertyTax + annualMaintenance + annualHomeInsurance) * year;
      const equityYear = Math.min(loanAmount, costYear - annualPropertyTax * year - annualMaintenance * year - annualHomeInsurance * year);

      if (propValue + equityYear - depositAvailable > rentCostYear) {
        if (breakevenYear === null) breakevenYear = year;
      }
    }

    return {
      totalRent,
      totalMortgagePayments,
      totalOwningCosts,
      totalBuyingCost,
      totalRentingCost,
      propertyValueAfter,
      propertyGain,
      equityBuilt,
      remainingBalance,
      depositInvested,
      investmentGain,
      breakevenYear,
      monthlyPayment,
      depositPercent,
      loanAmount,
    };
  }, [
    monthlyRent,
    propertyPrice,
    depositAvailable,
    mortgageRate,
    propertyGrowth,
    investmentReturn,
    yearsToCompare,
    loanTerm,
  ]);

  const recommendation = results.totalBuyingCost < results.totalRentingCost ? 'Buying' : 'Renting';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Inputs */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Your Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Monthly rent
              </label>
              <Input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Property price
              </label>
              <Input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Deposit available
              </label>
              <Input
                type="number"
                value={depositAvailable}
                onChange={(e) => setDepositAvailable(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mortgage rate (%) - {mortgageRate.toFixed(2)}%
              </label>
              <Slider
                min={2}
                max={10}
                step={0.1}
                value={mortgageRate}
                onChange={(e) => setMortgageRate(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mortgage term (years)
              </label>
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        {/* Assumptions */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Assumptions
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Annual property growth (%) - {propertyGrowth.toFixed(1)}%
              </label>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={propertyGrowth}
                onChange={(e) => setPropertyGrowth(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Annual investment return (%) - {investmentReturn.toFixed(1)}%
              </label>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Years to compare
              </label>
              <Input
                type="number"
                min={1}
                max={50}
                value={yearsToCompare}
                onChange={(e) => setYearsToCompare(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Results */}
      <Card className="mb-6 bg-accent/5 border-accent/30">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Renting Summary */}
          <div>
            <h3 className="text-sm text-text-secondary font-medium mb-2">Renting</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total rent paid:</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.totalRent.toLocaleString('en-GB', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Wealth after:</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.depositInvested.toLocaleString('en-GB', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Buying Summary */}
          <div>
            <h3 className="text-sm text-text-secondary font-medium mb-2">Buying</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total costs:</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.totalBuyingCost.toLocaleString('en-GB', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Home + equity worth:</span>
                <span className="font-mono font-bold text-text-primary">
                  £{(results.propertyValueAfter + results.equityBuilt).toLocaleString('en-GB', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-text-secondary text-sm mb-1">Recommendation</p>
          <p className="font-heading text-2xl font-bold text-accent">{recommendation}</p>
          <p className="text-text-secondary text-xs mt-2">
            Based on a {yearsToCompare}-year comparison period
          </p>
        </div>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface p-3 rounded-lg">
            <p className="text-xs text-text-secondary mb-1">Monthly mortgage payment</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              £{results.monthlyPayment.toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="bg-surface p-3 rounded-lg">
            <p className="text-xs text-text-secondary mb-1">Deposit (LTV)</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              {results.depositPercent.toFixed(1)}%
            </p>
          </div>

          <div className="bg-surface p-3 rounded-lg">
            <p className="text-xs text-text-secondary mb-1">Equity built in {yearsToCompare} years</p>
            <p className="font-mono text-lg font-bold text-success">
              £{results.equityBuilt.toLocaleString('en-GB', {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="bg-surface p-3 rounded-lg">
            <p className="text-xs text-text-secondary mb-1">Property growth</p>
            <p className="font-mono text-lg font-bold text-success">
              £{results.propertyGain.toLocaleString('en-GB', {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
