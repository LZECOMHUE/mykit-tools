'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const VED_BANDS_PRE_2017 = {
  0: 0,
  40: 130,
  50: 140,
  60: 150,
  70: 160,
  80: 170,
  90: 180,
  110: 190,
  130: 200,
  150: 210,
  170: 220,
  190: 235,
  210: 260,
  225: 285,
  245: 310,
  270: 335,
};

const VED_BANDS_POST_2017 = {
  0: 0,
  50: 10,
  75: 20,
  100: 130,
  110: 145,
  120: 160,
  130: 175,
  140: 190,
  150: 205,
  160: 220,
  170: 235,
  180: 250,
  190: 265,
  200: 285,
  210: 310,
  225: 335,
  245: 360,
  270: 395,
};

const PREMIUM_SUPPLEMENT_THRESHOLD = 40000;
const PREMIUM_SUPPLEMENT_YEARS = 5;
const PREMIUM_SUPPLEMENT_AMOUNT = 320;

export default function CarTaxChecker() {
  const [registrationDate, setRegistrationDate] = useState('2026-01-15');
  const [co2, setCo2] = useState('120');
  const [fuelType, setFuelType] = useState('petrol');
  const [listPrice, setListPrice] = useState('0');
  const [result, setResult] = useState(null);

  const FUEL_TYPES = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'alternative', label: 'Alternative fuel (LPG, etc)' },
  ];

  function getBandRate(bands, co2Value) {
    const co2Num = parseInt(co2Value) || 0;
    const bandKeys = Object.keys(bands).map(Number).sort((a, b) => a - b);

    for (let i = bandKeys.length - 1; i >= 0; i--) {
      if (co2Num >= bandKeys[i]) {
        return bands[bandKeys[i]];
      }
    }
    return bands[0];
  }

  function calculate() {
    const regDate = new Date(registrationDate);
    const cutoffDate = new Date('2017-04-01');
    const isPost2017 = regDate >= cutoffDate;

    const co2Value = parseInt(co2) || 120;
    const price = parseFloat(listPrice) || 0;

    let firstYearRate, standardRate;

    if (isPost2017) {
      firstYearRate = getBandRate(VED_BANDS_POST_2017, co2Value);
      standardRate = 165; // Standard rate for post-2017 cars
    } else {
      firstYearRate = getBandRate(VED_BANDS_PRE_2017, co2Value);
      standardRate = 145; // Standard rate for pre-2017 cars
    }

    // Premium supplement for cars over £40k
    let premiumSupplement = 0;
    if (isPost2017 && price > PREMIUM_SUPPLEMENT_THRESHOLD) {
      premiumSupplement = PREMIUM_SUPPLEMENT_AMOUNT;
    }

    const firstYearTotal = firstYearRate + premiumSupplement;

    // Calculate 6-year cost (first year + 5 years at standard rate)
    const yearsToPay = 5;
    const standardYearCost = standardRate + premiumSupplement;
    const sixYearTotal = firstYearTotal + (standardYearCost * yearsToPay);

    setResult({
      isPost2017,
      registrationYear: regDate.getFullYear(),
      co2Band: co2Value,
      firstYearRate,
      standardRate,
      premiumSupplement,
      firstYearTotal,
      yearsToPay,
      standardYearCost,
      sixYearTotal,
      yearlyAfterFirst: standardYearCost,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Registration Date
            </label>
            <Input
              type="date"
              value={registrationDate}
              onChange={(e) => setRegistrationDate(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              The tax rules changed on 1 April 2017. Enter the date your vehicle was registered.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              CO2 Emissions (g/km)
            </label>
            <Input
              type="number"
              value={co2}
              onChange={(e) => setCo2(e.target.value)}
              placeholder="Enter CO2 emissions"
              min="0"
            />
            <p className="text-xs text-secondary mt-1">
              Find this on your V5 registration document or the manufacturer specifications.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Fuel Type
            </label>
            <Select
              options={FUEL_TYPES}
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            />
          </div>

          {/* Post-2017 cars get premium supplement if over £40k */}
          {new Date(registrationDate) >= new Date('2017-04-01') && (
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                List Price (£) - Optional
              </label>
              <Input
                type="number"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                placeholder="Enter list price if over £40,000"
                min="0"
              />
              <p className="text-xs text-secondary mt-1">
                Cars over £40,000 pay an additional £320/year for 5 years from first registration.
              </p>
            </div>
          )}

          <Button onClick={calculate} className="w-full mt-6">
            Check Tax Rate
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Tax Rate Details */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Vehicle Tax Rates
            </h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Registration Period</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {result.isPost2017 ? 'Post-April 2017' : 'Pre-April 2017'}
                </p>
                <p className="text-xs text-secondary mt-1">
                  Registered: {result.registrationYear}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">CO2 Emissions Band</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {result.co2Band} g/km
                </p>
              </div>

              <div className="bg-accent-muted p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">First Year Tax Rate</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.firstYearRate}
                </p>
                {result.premiumSupplement > 0 && (
                  <p className="text-xs text-secondary mt-2">
                    + £{result.premiumSupplement} premium supplement (cars over £40k)
                  </p>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">First Year Total</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{result.firstYearTotal}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Standard Rate (Year 2 onwards)</p>
                <p className="font-mono text-lg font-bold text-primary">
                  £{result.standardRate}
                </p>
                {result.premiumSupplement > 0 && (
                  <p className="text-xs text-secondary mt-2">
                    + £{result.premiumSupplement} premium supplement
                  </p>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Annual Cost (Year 2+)</p>
                <p className="font-mono text-lg font-bold text-primary">
                  £{result.yearlyAfterFirst}
                </p>
              </div>
            </div>
          </Card>

          {/* Cost Projection */}
          <Card className="bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              {result.yearsToPay + 1}-Year Cost Projection
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">Year</th>
                    <th className="text-right py-2 px-2 font-medium text-primary">Annual Tax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-accent-muted">
                    <td className="py-3 px-2 font-medium text-primary">Year 1</td>
                    <td className="text-right font-mono font-bold text-primary">
                      £{result.firstYearTotal}
                    </td>
                  </tr>
                  {Array.from({ length: result.yearsToPay }, (_, i) => (
                    <tr key={i + 2} className="border-b border-border">
                      <td className="py-3 px-2">Year {i + 2}</td>
                      <td className="text-right font-mono">£{result.yearlyAfterFirst}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent-muted font-bold">
                    <td className="py-3 px-2 text-primary">Total (Years 1-{result.yearsToPay + 1})</td>
                    <td className="text-right font-mono text-accent">
                      £{result.sixYearTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-2">How Vehicle Tax Works:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The first year rate depends on CO2 emissions</li>
                <li>From year 2 onwards, most cars pay the standard rate</li>
                <li>Cars registered after April 2017 pay a premium supplement for the first 5 years if the list price exceeds £40,000</li>
                <li>Zero-emission vehicles pay £0 VED for the first year, then standard rates apply</li>
                <li>Rates are set by the government and may change annually</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
