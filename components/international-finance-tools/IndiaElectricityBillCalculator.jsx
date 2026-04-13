'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const SLAB_DATA = {
  maharashtra: {
    name: 'Maharashtra (MSEDCL)',
    slabs: [
      { max: 100, rate: 4.71, fixed: 50 },
      { max: 300, rate: 9.81 },
      { max: 500, rate: 12.89 },
      { max: Infinity, rate: 14.55 },
    ],
    duty: 12,
  },
  delhi: {
    name: 'Delhi (TPDDL)',
    slabs: [
      { max: 200, rate: 3, fixed: 75 },
      { max: 400, rate: 4.5 },
      { max: 800, rate: 6.5 },
      { max: Infinity, rate: 7 },
    ],
    duty: 5,
  },
  karnataka: {
    name: 'Karnataka (BESCOM)',
    slabs: [
      { max: 30, rate: 4.1, fixed: 40 },
      { max: 100, rate: 5.55 },
      { max: 200, rate: 7.1 },
      { max: Infinity, rate: 8.15 },
    ],
    duty: 10,
  },
  tamilnadu: {
    name: 'Tamil Nadu (TANGEDCO)',
    slabs: [
      { max: 100, rate: 0, fixed: 0 },
      { max: 200, rate: 2.25 },
      { max: 500, rate: 4.5 },
      { max: Infinity, rate: 6.6 },
    ],
    duty: 14,
  },
  uttar_pradesh: {
    name: 'Uttar Pradesh (UPPCL)',
    slabs: [
      { max: 150, rate: 3.85, fixed: 45 },
      { max: 300, rate: 4.8 },
      { max: 500, rate: 5.55 },
      { max: Infinity, rate: 6.5 },
    ],
    duty: 8,
  },
  gujarat: {
    name: 'Gujarat',
    slabs: [
      { max: 50, rate: 3.2, fixed: 50 },
      { max: 200, rate: 3.8 },
      { max: 500, rate: 4.7 },
      { max: Infinity, rate: 5.2 },
    ],
    duty: 9,
  },
};

function calculateSlabCharge(units, slabs) {
  let charge = 0;
  let previousMax = 0;

  for (const slab of slabs) {
    const slabUnits = Math.min(units - previousMax, slab.max - previousMax);
    if (slabUnits <= 0) break;

    charge += slabUnits * slab.rate;
    previousMax = slab.max;

    if (units <= slab.max) break;
  }

  return Math.round(charge);
}

export default function IndiaElectricityBillCalculator() {
  const [units, setUnits] = useState('200');
  const [state, setState] = useState('maharashtra');

  const calculations = useMemo(() => {
    const u = parseFloat(units) || 0;
    if (u < 0) return { error: true };

    const stateData = SLAB_DATA[state];
    const slabs = stateData.slabs;

    let chargeWithoutFixed = calculateSlabCharge(u, slabs);
    const fixedCharge = slabs[0].fixed || 0;
    const totalCharge = chargeWithoutFixed + fixedCharge;
    const duty = Math.round(totalCharge * (stateData.duty / 100));
    const fuelSurcharge = Math.round(totalCharge * 0.05); // Approximate 5%
    const totalBill = totalCharge + duty + fuelSurcharge;

    return {
      chargeWithoutFixed,
      fixedCharge,
      totalCharge,
      duty,
      fuelSurcharge,
      totalBill,
      error: false,
    };
  }, [units, state]);

  const handleReset = () => {
    setUnits('200');
    setState('maharashtra');
  };

  const stateData = SLAB_DATA[state];

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              State / Distribution Company
            </label>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={Object.entries(SLAB_DATA).map(([key, data]) => ({
                value: key,
                label: data.name,
              }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Units Consumed (kWh)
            </label>
            <Input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Enter units consumed"
              className="w-full"
            />
          </div>

          <Button onClick={handleReset} variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Card>

      {!calculations.error && (
        <>
          <Card className="bg-accent-muted">
            <h3 className="font-heading text-lg font-bold text-primary mb-2">
              Estimated Monthly Bill
            </h3>
            <p className="font-mono text-4xl font-bold text-accent">
              ₹{calculations.totalBill.toLocaleString('en-IN')}
            </p>
          </Card>

          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Bill Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Energy Charges</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.chargeWithoutFixed.toLocaleString('en-IN')}
                </span>
              </div>

              {calculations.fixedCharge > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-secondary">Fixed Charges</span>
                  <span className="font-mono font-bold text-primary">
                    ₹{calculations.fixedCharge.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Subtotal</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.totalCharge.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Electricity Duty ({stateData.duty}%)</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.duty.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-secondary">Fuel Surcharge (approx. 5%)</span>
                <span className="font-mono font-bold text-primary">
                  ₹{calculations.fuelSurcharge.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-heading font-bold text-primary">Total Bill</span>
                <span className="font-mono text-2xl font-bold text-accent">
                  ₹{calculations.totalBill.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-3">
              Slab Structure - {stateData.name}
            </h3>
            <div className="space-y-2 text-sm">
              {stateData.slabs.map((slab, idx) => (
                <div key={idx} className="flex justify-between text-secondary">
                  <span>
                    {idx === 0 && stateData.slabs[0].fixed ? (
                      <>0-{slab.max} units: ₹{slab.rate}/unit + Fixed ₹{slab.fixed}</>
                    ) : (
                      <>
                        {stateData.slabs[idx - 1]?.max + 1 || 0}-
                        {slab.max === Infinity ? 'Above' : slab.max} units
                      </>
                    )}
                  </span>
                  {slab.max !== Infinity && slab.rate > 0 && (
                    <span>₹{slab.rate}/unit</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <p className="text-sm text-secondary">
              <strong>Note:</strong> These are approximate rates based on residential tariffs. Actual bills may vary depending on your distribution company, recent tariff changes, and applicable surcharges or discounts. Check your previous bill or contact your local electricity provider for exact rates.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
