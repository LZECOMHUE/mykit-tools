'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LeaseVsBuyCarCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('25000');
  const [deposit, setDeposit] = useState('5000');
  const [financeAPR, setFinanceAPR] = useState('5.9');
  const [financeTerm, setFinanceTerm] = useState('48');
  const [monthlyLease, setMonthlyLease] = useState('350');
  const [leaseTerm, setLeaseTerm] = useState('36');
  const [annualMileage, setAnnualMileage] = useState('12000');
  const [depreciation, setDepreciation] = useState('50');
  const [estimatedRepairs, setEstimatedRepairs] = useState('80');
  const [insuranceBuy, setInsuranceBuy] = useState('500');
  const [insuranceLease, setInsuranceLease] = useState('550');
  const [ved, setVed] = useState('180');
  const [result, setResult] = useState(null);

  function calculate() {
    const price = parseFloat(purchasePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const apr = parseFloat(financeAPR) || 5.9;
    const months = parseInt(financeTerm) || 48;
    const monthLease = parseFloat(monthlyLease) || 0;
    const leaseMonths = parseInt(leaseTerm) || 36;
    const miles = parseFloat(annualMileage) || 12000;
    const depreciationPercent = parseFloat(depreciation) || 50;

    // BUYING COSTS
    // Finance cost calculation (simple interest approximation)
    const loanAmount = price - dep;
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalFinancePayment = monthlyPayment * months;
    const interestCost = totalFinancePayment - loanAmount;

    // Depreciation
    const depreciatedValue = price * (depreciationPercent / 100);

    // Running costs over period
    const buyMonths = months;
    const buyRepairsCost = (parseFloat(estimatedRepairs) || 80) * 12 * (buyMonths / 12);
    const buyInsuranceCost = (parseFloat(insuranceBuy) || 500) * (buyMonths / 12);
    const buyVedCost = (parseFloat(ved) || 180) * (buyMonths / 12);

    const totalBuyCost = dep + interestCost + depreciatedValue + buyRepairsCost + buyInsuranceCost + buyVedCost;

    // LEASING COSTS
    const leasePaymentsCost = monthLease * leaseMonths;
    const leaseInsuranceCost = (parseFloat(insuranceLease) || 550) * (leaseMonths / 12);
    // Leasing typically includes maintenance, so no repair costs

    const totalLeaseCost = leasePaymentsCost + leaseInsuranceCost;

    // Per mile costs
    const totalMilesBuy = miles * (buyMonths / 12);
    const totalMilesLease = miles * (leaseMonths / 12);

    const costPerMileBuy = (totalBuyCost / totalMilesBuy).toFixed(4);
    const costPerMileLease = (totalLeaseCost / totalMilesLease).toFixed(4);

    // Breakeven analysis
    const costDifference = totalBuyCost - totalLeaseCost;

    setResult({
      // Buy breakdown
      deposit: dep.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalFinancePayment: totalFinancePayment.toFixed(2),
      interestCost: interestCost.toFixed(2),
      depreciation: depreciatedValue.toFixed(2),
      buyRepairsCost: buyRepairsCost.toFixed(2),
      buyInsuranceCost: buyInsuranceCost.toFixed(2),
      buyVedCost: buyVedCost.toFixed(2),
      totalBuyCost: totalBuyCost.toFixed(2),

      // Lease breakdown
      leasePaymentsCost: leasePaymentsCost.toFixed(2),
      leaseInsuranceCost: leaseInsuranceCost.toFixed(2),
      totalLeaseCost: totalLeaseCost.toFixed(2),

      // Comparison
      monthlyPaymentBuy: monthlyPayment.toFixed(2),
      monthlyPaymentLease: monthLease.toFixed(2),
      monthlyDifference: Math.abs(monthlyPayment - monthLease).toFixed(2),
      costDifference: Math.abs(costDifference).toFixed(2),
      cheaper: costDifference > 0 ? 'lease' : 'buy',
      costPerMileBuy: costPerMileBuy,
      costPerMileLease: costPerMileLease,
      buyMonths,
      leaseMonths,
      totalMilesBuy: totalMilesBuy.toLocaleString(),
      totalMilesLease: totalMilesLease.toLocaleString(),
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Lease vs Buy Car Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Buy Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Buying
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Car Price (£)
              </label>
              <Input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="25000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Deposit (£)
              </label>
              <Input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="5000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Finance APR (%)
              </label>
              <Input
                type="number"
                value={financeAPR}
                onChange={(e) => setFinanceAPR(e.target.value)}
                placeholder="5.9"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Finance Term (months)
              </label>
              <Input
                type="number"
                value={financeTerm}
                onChange={(e) => setFinanceTerm(e.target.value)}
                placeholder="48"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Expected Residual Value (%)
              </label>
              <Input
                type="number"
                value={depreciation}
                onChange={(e) => setDepreciation(e.target.value)}
                placeholder="50"
                min="0"
                max="100"
              />
              <p className="text-xs text-secondary mt-1">
                Percentage of original price you expect to sell for after {financeTerm} months
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Monthly Repairs (£)
              </label>
              <Input
                type="number"
                value={estimatedRepairs}
                onChange={(e) => setEstimatedRepairs(e.target.value)}
                placeholder="80"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Insurance (£)
              </label>
              <Input
                type="number"
                value={insuranceBuy}
                onChange={(e) => setInsuranceBuy(e.target.value)}
                placeholder="500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual VED (£)
              </label>
              <Input
                type="number"
                value={ved}
                onChange={(e) => setVed(e.target.value)}
                placeholder="180"
                min="0"
              />
            </div>
          </div>

          {/* Lease Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Leasing
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Monthly Lease Cost (£)
              </label>
              <Input
                type="number"
                value={monthlyLease}
                onChange={(e) => setMonthlyLease(e.target.value)}
                placeholder="350"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Lease Term (months)
              </label>
              <Input
                type="number"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(e.target.value)}
                placeholder="36"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Insurance (£)
              </label>
              <Input
                type="number"
                value={insuranceLease}
                onChange={(e) => setInsuranceLease(e.target.value)}
                placeholder="550"
                min="0"
              />
            </div>

            <div className="p-4 bg-accent-muted rounded-lg">
              <p className="text-sm text-primary font-medium mb-2">
                Typically included in lease:
              </p>
              <ul className="text-xs text-secondary space-y-1">
                <li>✓ Maintenance and repairs</li>
                <li>✓ Roadside assistance</li>
                <li>✓ Vehicle replacement if breakdown</li>
                <li>✗ Insurance (separate)</li>
                <li>✗ Fuel</li>
                <li className="font-bold text-error">Excess mileage charges apply</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shared */}
        <div className="pt-6 border-t border-border space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary mb-4">
            Common Settings
          </h3>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Annual Mileage
            </label>
            <Input
              type="number"
              value={annualMileage}
              onChange={(e) => setAnnualMileage(e.target.value)}
              placeholder="12000"
              min="0"
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Compare Costs
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Main Comparison */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Comparison Result
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Buy Total Cost</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.totalBuyCost}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Over {result.buyMonths} months
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Lease Total Cost</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.totalLeaseCost}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Over {result.leaseMonths} months
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${result.cheaper === 'lease' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-accent'}`}>
                <p className="text-secondary text-sm mb-2">Cheaper Option</p>
                <p className={`font-mono text-2xl font-bold ${result.cheaper === 'lease' ? 'text-green-700' : 'text-accent'}`}>
                  {result.cheaper === 'lease' ? 'LEASE' : 'BUY'}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Save £{result.costDifference}
                </p>
              </div>
            </div>
          </Card>

          {/* Monthly Comparison */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Monthly Cost Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Cost Item</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Buy</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Lease</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Loan/Lease Payment</td>
                    <td className="text-right font-mono">£{result.monthlyPaymentBuy}</td>
                    <td className="text-right font-mono">£{result.monthlyPaymentLease}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Insurance</td>
                    <td className="text-right font-mono">£{(parseFloat(insuranceBuy) / 12).toFixed(2)}</td>
                    <td className="text-right font-mono">£{(parseFloat(insuranceLease) / 12).toFixed(2)}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Repairs</td>
                    <td className="text-right font-mono">£{result.estimatedRepairs}</td>
                    <td className="text-right font-mono">£0</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">VED</td>
                    <td className="text-right font-mono">£{(parseFloat(ved) / 12).toFixed(2)}</td>
                    <td className="text-right font-mono">£0</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Total Monthly</td>
                    <td className="text-right font-mono text-primary">£{((parseFloat(result.totalBuyCost) / result.buyMonths)).toFixed(2)}</td>
                    <td className="text-right font-mono text-primary">£{((parseFloat(result.totalLeaseCost) / result.leaseMonths)).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Cost Per Mile */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-6">
              Cost Per Mile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Buy Cost/Mile</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {(parseFloat(result.costPerMileBuy) * 100).toFixed(2)}p
                </p>
                <p className="text-xs text-secondary mt-1">
                  {result.totalMilesBuy} miles total
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Lease Cost/Mile</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {(parseFloat(result.costPerMileLease) * 100).toFixed(2)}p
                </p>
                <p className="text-xs text-secondary mt-1">
                  {result.totalMilesLease} miles total
                </p>
              </div>

              <div className="p-4 bg-accent-muted rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-2">Difference</p>
                <p className="font-mono text-lg font-bold text-accent">
                  {Math.abs((parseFloat(result.costPerMileBuy) - parseFloat(result.costPerMileLease)) * 100).toFixed(2)}p
                </p>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Important Considerations
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>Leases typically have mileage caps (usually 10,000-15,000 miles/year). Excess mileage fees apply.</li>
              <li>Lease vehicles must be returned in good condition. Wear and tear charges may apply.</li>
              <li>Buying allows unlimited mileage and customisation.</li>
              <li>Lease payments are predictable; buying costs vary with repairs and fuel prices.</li>
              <li>The residual value estimate significantly affects buy costs. Research typical values for your model.</li>
              <li>Insurance costs vary by driver age, location, and claims history.</li>
              <li>This calculator doesn't include fuel costs for buying.</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
