'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ShouldIKeepMyOldCarCalculator() {
  const [currentCarValue, setCurrentCarValue] = useState('5000');
  const [annualRepairs, setAnnualRepairs] = useState('800');
  const [annualRunningCosts, setAnnualRunningCosts] = useState('1200');
  const [newCarPrice, setNewCarPrice] = useState('25000');
  const [monthlyPayment, setMonthlyPayment] = useState('400');
  const [newCarRunningCosts, setNewCarRunningCosts] = useState('800');
  const [yearsToKeep, setYearsToKeep] = useState('3');
  const [result, setResult] = useState(null);

  function calculate() {
    const carValue = parseFloat(currentCarValue) || 0;
    const repairs = parseFloat(annualRepairs) || 0;
    const running = parseFloat(annualRunningCosts) || 0;
    const newPrice = parseFloat(newCarPrice) || 0;
    const monthly = parseFloat(monthlyPayment) || 0;
    const newRunning = parseFloat(newCarRunningCosts) || 0;
    const years = parseInt(yearsToKeep) || 3;

    // Cost to keep old car for N years
    const keepRepairsTotal = repairs * years;
    const keepRunningTotal = running * years;
    // Assume car depreciates to near-zero over time period
    const keepDepreciation = carValue * 0.6; // assume 60% depreciation
    const keepTotal = keepRepairsTotal + keepRunningTotal + keepDepreciation;
    const keepAnnual = keepTotal / years;

    // Cost to buy new car
    const newCarMonthlyTotal = monthly + (newRunning / 12); // monthly payment + prorated annual running costs
    const newCarTotal = newCarMonthlyTotal * 12 * years;
    const newCarAnnual = newCarTotal / years;

    const difference = Math.abs(keepAnnual - newCarAnnual);
    const cheaper = keepAnnual < newCarAnnual ? 'keep' : 'replace';

    // Breakeven calculation - at what point is replacing better?
    // Breakeven when: annual keep cost = annual new car cost
    // This helps show when repair costs become unmanageable
    const breakEvenRepairsPerYear = newCarAnnual - running - (carValue * 0.6 / years);

    setResult({
      keepRepairsTotal: keepRepairsTotal.toFixed(2),
      keepRunningTotal: keepRunningTotal.toFixed(2),
      keepDepreciation: keepDepreciation.toFixed(2),
      keepTotal: keepTotal.toFixed(2),
      keepAnnual: keepAnnual.toFixed(2),
      newCarTotal: newCarTotal.toFixed(2),
      newCarAnnual: newCarAnnual.toFixed(2),
      difference: difference.toFixed(2),
      cheaper,
      years,
      breakEvenRepairsPerYear: breakEvenRepairsPerYear.toFixed(2),
      monthlyKeep: (keepAnnual / 12).toFixed(2),
      monthlyNew: (newCarAnnual / 12).toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Keep Old Car */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Keep Current Car
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Current Car Value (£)
              </label>
              <Input
                type="number"
                value={currentCarValue}
                onChange={(e) => setCurrentCarValue(e.target.value)}
                placeholder="5000"
                min="0"
              />
              <p className="text-xs text-secondary mt-1">
                Estimate current market value using Parkers or AutoTrader
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Expected Annual Repairs (£)
              </label>
              <Input
                type="number"
                value={annualRepairs}
                onChange={(e) => setAnnualRepairs(e.target.value)}
                placeholder="800"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Running Costs (£)
              </label>
              <Input
                type="number"
                value={annualRunningCosts}
                onChange={(e) => setAnnualRunningCosts(e.target.value)}
                placeholder="1200"
                min="0"
              />
              <p className="text-xs text-secondary mt-1">
                Insurance, fuel, tax, maintenance combined
              </p>
            </div>
          </div>

          {/* Buy New Car */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Buy New Car
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                New Car Price (£)
              </label>
              <Input
                type="number"
                value={newCarPrice}
                onChange={(e) => setNewCarPrice(e.target.value)}
                placeholder="25000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Monthly Payment (£)
              </label>
              <Input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="400"
                min="0"
              />
              <p className="text-xs text-secondary mt-1">
                Loan/finance payment only (not insurance/fuel)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Running Costs (£)
              </label>
              <Input
                type="number"
                value={newCarRunningCosts}
                onChange={(e) => setNewCarRunningCosts(e.target.value)}
                placeholder="800"
                min="0"
              />
              <p className="text-xs text-secondary mt-1">
                Insurance, fuel, tax combined (usually lower than old cars)
              </p>
            </div>
          </div>
        </div>

        {/* Time Frame */}
        <div className="pt-6 border-t border-border">
          <label className="block text-sm font-medium text-primary mb-4">
            Planning to keep for how many years?
          </label>
          <div className="flex gap-2 flex-wrap mb-4">
            {[1, 2, 3, 4, 5].map((year) => (
              <button
                key={year}
                onClick={() => setYearsToKeep(year.toString())}
                className={`px-4 py-2 rounded-lg border font-medium transition ${
                  yearsToKeep === year.toString()
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white border-border text-primary hover:border-accent'
                }`}
              >
                {year} year{year > 1 ? 's' : ''}
              </button>
            ))}
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate & Compare
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Main Recommendation */}
          <Card className={`border-2 ${result.cheaper === 'keep' ? 'bg-green-50 border-green-400' : 'bg-blue-50 border-accent'}`}>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Recommendation
            </h3>

            <div className={`text-center py-6 ${result.cheaper === 'keep' ? 'text-green-700' : 'text-accent'}`}>
              <p className="font-heading text-2xl font-bold mb-2">
                {result.cheaper === 'keep' ? 'KEEP YOUR OLD CAR' : 'REPLACE WITH NEW CAR'}
              </p>
              <p className="text-lg">
                Save approximately £{result.difference} per year
              </p>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-border text-sm text-secondary">
              <p>
                Over {result.years} years, keeping your car costs £{result.keepTotal} total.
                <br />
                Buying a new car costs £{result.newCarTotal} total.
              </p>
            </div>
          </Card>

          {/* Cost Breakdown */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Detailed Cost Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Cost Item</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Keep Car</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">New Car</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Repairs ({result.years}y)</td>
                    <td className="text-right font-mono">£{result.keepRepairsTotal}</td>
                    <td className="text-right font-mono">£0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Running Costs ({result.years}y)</td>
                    <td className="text-right font-mono">£{result.keepRunningTotal}</td>
                    <td className="text-right font-mono">£{(parseFloat(newCarRunningCosts) * result.years).toFixed(2)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Depreciation</td>
                    <td className="text-right font-mono">£{result.keepDepreciation}</td>
                    <td className="text-right font-mono">Higher</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Finance Cost ({result.years}y)</td>
                    <td className="text-right font-mono">£0</td>
                    <td className="text-right font-mono">£{(parseFloat(monthlyPayment) * 12 * result.years).toFixed(2)}</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Total {result.years}-Year Cost</td>
                    <td className="text-right font-mono text-primary">£{result.keepTotal}</td>
                    <td className="text-right font-mono text-primary">£{result.newCarTotal}</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Annual Cost</td>
                    <td className="text-right font-mono text-primary">£{result.keepAnnual}</td>
                    <td className="text-right font-mono text-primary">£{result.newCarAnnual}</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Monthly Cost</td>
                    <td className="text-right font-mono text-primary">£{result.monthlyKeep}</td>
                    <td className="text-right font-mono text-primary">£{result.monthlyNew}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Break-Even Analysis */}
          <Card className="bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Break-Even Analysis
            </h3>

            <div className="p-4 bg-white rounded-lg border border-border">
              <p className="text-secondary text-sm mb-3">
                At what annual repair cost would you break even?
              </p>
              <p className="font-mono text-xl font-bold text-primary">
                £{result.breakEvenRepairsPerYear}/year
              </p>
              <p className="text-xs text-secondary mt-3">
                If annual repairs exceed £{result.breakEvenRepairsPerYear}, replacing the car becomes more cost-effective.
              </p>
              <p className="text-xs text-secondary mt-2">
                Current estimated repairs: £{annualRepairs}/year
                {parseFloat(annualRepairs) > parseFloat(result.breakEvenRepairsPerYear)
                  ? ' (above break-even point)'
                  : ' (below break-even point)'}
              </p>
            </div>
          </Card>

          {/* Considerations */}
          <Card className="bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Other Factors to Consider
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>Reliability: Is your car likely to have major failures soon?</li>
              <li>Safety: Does a new car have better safety features you need?</li>
              <li>Emissions: Are you moving areas with stricter emission zones?</li>
              <li>Technology: Would new features (infotainment, connectivity) improve your driving?</li>
              <li>Warranty: Does a new car warranty peace of mind matter to you?</li>
              <li>Mileage: Are you doing high mileage where a newer car is more economical?</li>
              <li>Resale value: Will the old car become harder to sell as it ages?</li>
              <li>Insurance: New cars may have lower insurance due to safety features.</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
