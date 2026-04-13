'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function EVvsPetrolCompanyCarCalculator() {
  const [evP11d, setEvP11d] = useState('35000');
  const [evCo2, setEvCo2] = useState('0');
  const [petrolP11d, setPetrolP11d] = useState('28000');
  const [petrolCo2, setPetrolCo2] = useState('140');
  const [annualMileage, setAnnualMileage] = useState('12000');
  const [fuelCostPerLitre, setFuelCostPerLitre] = useState('1.35');
  const [electricityCost, setElectricityCost] = useState('0.28');
  const [petrolMpg, setPetrolMpg] = useState('45');
  const [evMiKwh, setEvMiKwh] = useState('3.5');
  const [taxBracket, setTaxBracket] = useState('20');
  const [result, setResult] = useState(null);

  const TAX_BRACKETS = [
    { value: '20', label: '20% (Basic rate)' },
    { value: '40', label: '40% (Higher rate)' },
    { value: '45', label: '45% (Additional rate)' },
  ];

  const BIK_RATES = {
    ev: 2,
    petrol: 15,
  };

  function calculate() {
    const bracket = parseFloat(taxBracket) || 20;
    const mileage = parseFloat(annualMileage) || 12000;

    // EV fuel cost
    const evKwhNeeded = mileage / (parseFloat(evMiKwh) || 3.5);
    const evFuelCost = evKwhNeeded * (parseFloat(electricityCost) || 0.28);

    // Petrol fuel cost
    const petrolLitres = mileage / (parseFloat(petrolMpg) || 45);
    const petrolFuelCost = petrolLitres * (parseFloat(fuelCostPerLitre) || 1.35);

    // BIK calculations
    const evBikValue = (parseFloat(evP11d) || 0) * (BIK_RATES.ev / 100);
    const evBikTax = evBikValue * (bracket / 100);

    const petrolBikValue = (parseFloat(petrolP11d) || 0) * (BIK_RATES.petrol / 100);
    const petrolBikTax = petrolBikValue * (bracket / 100);

    // Total annual cost comparison
    const evTotal = evBikTax + evFuelCost;
    const petrolTotal = petrolBikTax + petrolFuelCost;

    // 3-year total
    const evThreeYear = evTotal * 3;
    const petrolThreeYear = petrolTotal * 3;

    setResult({
      evFuelCost: evFuelCost.toFixed(2),
      petrolFuelCost: petrolFuelCost.toFixed(2),
      fuelSavings: (petrolFuelCost - evFuelCost).toFixed(2),
      evBikTax: evBikTax.toFixed(2),
      petrolBikTax: petrolBikTax.toFixed(2),
      bikSavings: (petrolBikTax - evBikTax).toFixed(2),
      evTotal: evTotal.toFixed(2),
      petrolTotal: petrolTotal.toFixed(2),
      annualSavings: (petrolTotal - evTotal).toFixed(2),
      evThreeYear: evThreeYear.toFixed(2),
      petrolThreeYear: petrolThreeYear.toFixed(2),
      threeYearSavings: (petrolThreeYear - evThreeYear).toFixed(2),
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EV Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Electric Vehicle
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                P11D Value (£)
              </label>
              <Input
                type="number"
                value={evP11d}
                onChange={(e) => setEvP11d(e.target.value)}
                placeholder="Enter P11D value"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                CO2 Emissions (g/km)
              </label>
              <Input
                type="number"
                value={evCo2}
                onChange={(e) => setEvCo2(e.target.value)}
                placeholder="0 for electric"
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
                placeholder="Typical: 3-4"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>

          {/* Petrol Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-primary">
              Petrol Vehicle
            </h3>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                P11D Value (£)
              </label>
              <Input
                type="number"
                value={petrolP11d}
                onChange={(e) => setPetrolP11d(e.target.value)}
                placeholder="Enter P11D value"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                CO2 Emissions (g/km)
              </label>
              <Input
                type="number"
                value={petrolCo2}
                onChange={(e) => setPetrolCo2(e.target.value)}
                placeholder="Enter CO2 emissions"
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
                placeholder="Typical: 45"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Shared Inputs */}
        <div className="mt-8 pt-8 border-t border-border space-y-4">
          <h3 className="font-heading text-lg font-bold text-primary">
            Common Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                value={fuelCostPerLitre}
                onChange={(e) => setFuelCostPerLitre(e.target.value)}
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
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                placeholder="0.28"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Tax Bracket
            </label>
            <Select
              options={TAX_BRACKETS}
              value={taxBracket}
              onChange={(e) => setTaxBracket(e.target.value)}
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Compare Costs
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Annual Comparison */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Annual Cost Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Cost Factor</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">EV</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Petrol</th>
                    <th className="text-right py-2 px-2 font-medium text-accent">Saving</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Fuel Cost</td>
                    <td className="text-right font-mono">£{result.evFuelCost}</td>
                    <td className="text-right font-mono">£{result.petrolFuelCost}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.fuelSavings}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">BIK Tax</td>
                    <td className="text-right font-mono">£{result.evBikTax}</td>
                    <td className="text-right font-mono">£{result.petrolBikTax}</td>
                    <td className="text-right font-mono text-accent font-bold">£{result.bikSavings}</td>
                  </tr>
                  <tr className="bg-accent-muted">
                    <td className="py-3 px-2 font-bold text-primary">Total Annual Cost</td>
                    <td className="text-right font-mono font-bold">£{result.evTotal}</td>
                    <td className="text-right font-mono font-bold">£{result.petrolTotal}</td>
                    <td className="text-right font-mono font-bold text-accent">£{result.annualSavings}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* 3-Year Projection */}
          <Card className="bg-surface">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              3-Year Total Cost
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-1">EV Total</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.evThreeYear}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-1">Petrol Total</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.petrolThreeYear}
                </p>
              </div>

              <div className="p-4 bg-accent-muted rounded-lg border border-accent">
                <p className="text-secondary text-sm mb-1">EV Saving</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.threeYearSavings}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p>Note: This comparison includes fuel costs and BIK tax only. Other costs such as insurance, maintenance, and depreciation vary by model.</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
