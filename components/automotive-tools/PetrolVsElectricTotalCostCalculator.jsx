'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PetrolVsElectricTotalCostCalculator() {
  const [petrolPrice, setPetrolPrice] = useState('20000');
  const [evPrice, setEvPrice] = useState('35000');
  const [petrolMpg, setPetrolMpg] = useState('45');
  const [evMiKwh, setEvMiKwh] = useState('3.5');
  const [annualMileage, setAnnualMileage] = useState('12000');
  const [fuelPrice, setFuelPrice] = useState('1.35');
  const [electricityPrice, setElectricityPrice] = useState('0.28');
  const [petrolInsurance, setPetrolInsurance] = useState('500');
  const [evInsurance, setEvInsurance] = useState('550');
  const [petrolVed, setPetrolVed] = useState('190');
  const [evVed, setEvVed] = useState('0');
  const [petrolMaintenance, setPetrolMaintenance] = useState('80');
  const [evMaintenance, setEvMaintenance] = useState('40');
  const [timeframe, setTimeframe] = useState('3');
  const [result, setResult] = useState(null);

  const TIMEFRAMES = [
    { value: '3', label: '3 years' },
    { value: '5', label: '5 years' },
    { value: '7', label: '7 years' },
  ];

  const DEPRECIATION_RATES = {
    3: { petrol: 0.65, ev: 0.60 },
    5: { petrol: 0.50, ev: 0.45 },
    7: { petrol: 0.40, ev: 0.35 },
  };

  function calculate() {
    const years = parseInt(timeframe) || 3;
    const mileage = parseFloat(annualMileage) || 12000;
    const totalMiles = mileage * years;

    // Fuel costs
    const petrolLitres = totalMiles / (parseFloat(petrolMpg) || 45);
    const petrolFuelTotal = petrolLitres * (parseFloat(fuelPrice) || 1.35);

    const evKwh = totalMiles / (parseFloat(evMiKwh) || 3.5);
    const evFuelTotal = evKwh * (parseFloat(electricityPrice) || 0.28);

    // Insurance
    const petrolInsuranceTotal = parseFloat(petrolInsurance) || 500;
    const evInsuranceTotal = parseFloat(evInsurance) || 550;
    const petrolInsuranceCost = petrolInsuranceTotal * years;
    const evInsuranceCost = evInsuranceTotal * years;

    // VED
    const petrolVedTotal = (parseFloat(petrolVed) || 190) * years;
    const evVedTotal = (parseFloat(evVed) || 0) * years;

    // Maintenance
    const petrolMaintenanceTotal = (parseFloat(petrolMaintenance) || 80) * 12 * years;
    const evMaintenanceTotal = (parseFloat(evMaintenance) || 40) * 12 * years;

    // Depreciation
    const depRates = DEPRECIATION_RATES[years] || DEPRECIATION_RATES['3'];
    const petrolResidual = (parseFloat(petrolPrice) || 0) * depRates.petrol;
    const evResidual = (parseFloat(evPrice) || 0) * depRates.ev;
    const petrolDepreciation = (parseFloat(petrolPrice) || 0) - petrolResidual;
    const evDepreciation = (parseFloat(evPrice) || 0) - evResidual;

    // Totals
    const petrolTotal = petrolDepreciation + petrolFuelTotal + petrolInsuranceCost + petrolVedTotal + petrolMaintenanceTotal;
    const evTotal = evDepreciation + evFuelTotal + evInsuranceCost + evVedTotal + evMaintenanceTotal;

    const savings = petrolTotal - evTotal;
    const costPerMile = {
      petrol: (petrolTotal / totalMiles).toFixed(4),
      ev: (evTotal / totalMiles).toFixed(4),
    };

    setResult({
      years,
      totalMiles: totalMiles.toLocaleString(),
      petrolDepreciation: petrolDepreciation.toFixed(2),
      evDepreciation: evDepreciation.toFixed(2),
      petrolFuelTotal: petrolFuelTotal.toFixed(2),
      evFuelTotal: evFuelTotal.toFixed(2),
      fuelSavings: (petrolFuelTotal - evFuelTotal).toFixed(2),
      petrolInsuranceCost: petrolInsuranceCost.toFixed(2),
      evInsuranceCost: evInsuranceCost.toFixed(2),
      insuranceSavings: (petrolInsuranceCost - evInsuranceCost).toFixed(2),
      petrolVedTotal: petrolVedTotal.toFixed(2),
      evVedTotal: evVedTotal.toFixed(2),
      vedSavings: (petrolVedTotal - evVedTotal).toFixed(2),
      petrolMaintenanceTotal: petrolMaintenanceTotal.toFixed(2),
      evMaintenanceTotal: evMaintenanceTotal.toFixed(2),
      maintenanceSavings: (petrolMaintenanceTotal - evMaintenanceTotal).toFixed(2),
      petrolTotal: petrolTotal.toFixed(2),
      evTotal: evTotal.toFixed(2),
      savings: savings.toFixed(2),
      costPerMilePetrol: costPerMile.petrol,
      costPerMileEv: costPerMile.ev,
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          Petrol vs Electric Total Cost of Ownership
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Petrol Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Petrol Vehicle
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Purchase Price (£)
              </label>
              <Input
                type="number"
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(e.target.value)}
                placeholder="20000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Fuel Efficiency (mpg)
              </label>
              <Input
                type="number"
                value={petrolMpg}
                onChange={(e) => setPetrolMpg(e.target.value)}
                placeholder="45"
                min="0.1"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Insurance (£)
              </label>
              <Input
                type="number"
                value={petrolInsurance}
                onChange={(e) => setPetrolInsurance(e.target.value)}
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
                value={petrolVed}
                onChange={(e) => setPetrolVed(e.target.value)}
                placeholder="190"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Monthly Maintenance (£)
              </label>
              <Input
                type="number"
                value={petrolMaintenance}
                onChange={(e) => setPetrolMaintenance(e.target.value)}
                placeholder="80"
                min="0"
              />
            </div>
          </div>

          {/* EV Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Electric Vehicle
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Purchase Price (£)
              </label>
              <Input
                type="number"
                value={evPrice}
                onChange={(e) => setEvPrice(e.target.value)}
                placeholder="35000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Efficiency (miles/kWh)
              </label>
              <Input
                type="number"
                value={evMiKwh}
                onChange={(e) => setEvMiKwh(e.target.value)}
                placeholder="3.5"
                min="0.1"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual Insurance (£)
              </label>
              <Input
                type="number"
                value={evInsurance}
                onChange={(e) => setEvInsurance(e.target.value)}
                placeholder="550"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Annual VED (£)
              </label>
              <Input
                type="number"
                value={evVed}
                onChange={(e) => setEvVed(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Monthly Maintenance (£)
              </label>
              <Input
                type="number"
                value={evMaintenance}
                onChange={(e) => setEvMaintenance(e.target.value)}
                placeholder="40"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Shared inputs */}
        <div className="pt-6 border-t border-border space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary mb-4">
            Common Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Fuel Price (£/litre)
              </label>
              <Input
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="1.35"
                min="0.01"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Electricity (£/kWh)
              </label>
              <Input
                type="number"
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(e.target.value)}
                placeholder="0.28"
                min="0.01"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Ownership Period
              </label>
              <Select
                options={TIMEFRAMES}
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Total Cost
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Detailed Cost Breakdown */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              {result.years}-Year Cost Breakdown
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Cost Item</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Petrol</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Electric</th>
                    <th className="text-right py-2 px-2 font-medium text-accent">EV Saving</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Depreciation</td>
                    <td className="text-right font-mono">£{result.petrolDepreciation}</td>
                    <td className="text-right font-mono">£{result.evDepreciation}</td>
                    <td className="text-right font-mono text-accent font-bold">
                      £{(parseFloat(result.petrolDepreciation) - parseFloat(result.evDepreciation)).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Fuel/Electricity</td>
                    <td className="text-right font-mono">£{result.petrolFuelTotal}</td>
                    <td className="text-right font-mono">£{result.evFuelTotal}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.fuelSavings}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Insurance</td>
                    <td className="text-right font-mono">£{result.petrolInsuranceCost}</td>
                    <td className="text-right font-mono">£{result.evInsuranceCost}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.insuranceSavings}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">VED (Road Tax)</td>
                    <td className="text-right font-mono">£{result.petrolVedTotal}</td>
                    <td className="text-right font-mono">£{result.evVedTotal}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.vedSavings}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Maintenance</td>
                    <td className="text-right font-mono">£{result.petrolMaintenanceTotal}</td>
                    <td className="text-right font-mono">£{result.evMaintenanceTotal}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.maintenanceSavings}</td>
                  </tr>
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Total Cost</td>
                    <td className="text-right font-mono text-primary">£{result.petrolTotal}</td>
                    <td className="text-right font-mono text-primary">£{result.evTotal}</td>
                    <td className="text-right font-mono text-accent">£{result.savings}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-border">
              <p className="text-secondary text-sm mb-2">Cost per mile (pence)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary text-xs">Petrol</p>
                  <p className="font-mono font-bold text-primary">{(parseFloat(result.costPerMilePetrol) * 100).toFixed(2)}p</p>
                </div>
                <div>
                  <p className="text-secondary text-xs">Electric</p>
                  <p className="font-mono font-bold text-primary">{(parseFloat(result.costPerMileEv) * 100).toFixed(2)}p</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Total Summary */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Total {result.years}-Year Cost Comparison
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Petrol Total</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.petrolTotal}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Electric Total</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.evTotal}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-2">EV Saving</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.savings}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p>Total miles driven: {result.totalMiles}</p>
              <p className="mt-2">
                {parseFloat(result.savings) > 0
                  ? `The electric vehicle is more cost-effective by £${result.savings} over ${result.years} years.`
                  : `The petrol vehicle is more cost-effective by £${Math.abs(parseFloat(result.savings))} over ${result.years} years.`}
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
