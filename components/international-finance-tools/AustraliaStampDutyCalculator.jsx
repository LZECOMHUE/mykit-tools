'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function AustraliaStampDutyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [state, setState] = useState('NSW');
  const [isFirstHome, setIsFirstHome] = useState(false);
  const [propertyType, setPropertyType] = useState('primary');

  const calculateStampDuty = () => {
    let duty = 0;

    if (state === 'NSW') {
      if (propertyPrice <= 15000) duty = 0;
      else if (propertyPrice <= 33000) duty = propertyPrice * 0.0125;
      else if (propertyPrice <= 89000) duty = propertyPrice * 0.015;
      else if (propertyPrice <= 320000) duty = propertyPrice * 0.0175;
      else if (propertyPrice <= 1120000) duty = propertyPrice * 0.035;
      else if (propertyPrice <= 3320000) duty = propertyPrice * 0.045;
      else duty = propertyPrice * 0.055;

      // First home buyer exemption/concession
      if (isFirstHome) {
        if (propertyPrice <= 800000) duty = 0;
        else if (propertyPrice <= 1000000) {
          duty = (propertyPrice - 800000) * 0.05;
        }
      }
    } else if (state === 'VIC') {
      if (propertyPrice <= 25000) duty = 0;
      else if (propertyPrice <= 40000) duty = propertyPrice * 0.014;
      else if (propertyPrice <= 570000) duty = propertyPrice * 0.025;
      else if (propertyPrice <= 750000) duty = propertyPrice * 0.04;
      else if (propertyPrice <= 2000000) duty = propertyPrice * 0.05;
      else duty = propertyPrice * 0.055;

      if (isFirstHome) {
        if (propertyPrice <= 600000) duty = 0;
        else if (propertyPrice <= 750000) {
          duty = (propertyPrice - 600000) * 0.04;
        }
      }
    } else if (state === 'QLD') {
      if (propertyPrice <= 5000) duty = 0;
      else if (propertyPrice <= 75000) duty = propertyPrice * 0.01;
      else if (propertyPrice <= 540000) duty = propertyPrice * 0.03;
      else if (propertyPrice <= 1000000) duty = propertyPrice * 0.04;
      else duty = propertyPrice * 0.0575;

      if (isFirstHome && propertyPrice <= 700000) {
        duty = 0;
      }
    } else if (state === 'WA') {
      if (propertyPrice <= 7000) duty = 0;
      else if (propertyPrice <= 14000) duty = propertyPrice * 0.019;
      else if (propertyPrice <= 360000) duty = propertyPrice * 0.025;
      else if (propertyPrice <= 725000) duty = propertyPrice * 0.035;
      else if (propertyPrice <= 3000000) duty = propertyPrice * 0.04;
      else duty = propertyPrice * 0.0515;

      if (isFirstHome && propertyPrice <= 430000) {
        duty = 0;
      }
    } else if (state === 'SA') {
      if (propertyPrice <= 7000) duty = 0;
      else if (propertyPrice <= 30000) duty = propertyPrice * 0.015;
      else if (propertyPrice <= 75000) duty = propertyPrice * 0.02;
      else if (propertyPrice <= 500000) duty = propertyPrice * 0.025;
      else duty = propertyPrice * 0.04;

      if (isFirstHome && propertyPrice <= 500000) {
        duty = duty * 0.5;
      }
    } else if (state === 'TAS') {
      if (propertyPrice <= 3000) duty = 0;
      else if (propertyPrice <= 20000) duty = propertyPrice * 0.01;
      else if (propertyPrice <= 60000) duty = propertyPrice * 0.02;
      else if (propertyPrice <= 540000) duty = propertyPrice * 0.03;
      else duty = propertyPrice * 0.035;

      if (isFirstHome && propertyPrice <= 600000) {
        duty = 0;
      }
    } else if (state === 'ACT') {
      if (propertyPrice <= 7500) duty = 0;
      else if (propertyPrice <= 30000) duty = propertyPrice * 0.015;
      else if (propertyPrice <= 540000) duty = propertyPrice * 0.025;
      else duty = propertyPrice * 0.03;

      if (isFirstHome && propertyPrice <= 575000) {
        duty = 0;
      }
    } else if (state === 'NT') {
      if (propertyPrice <= 14000) duty = 0;
      else if (propertyPrice <= 75000) duty = propertyPrice * 0.02;
      else if (propertyPrice <= 540000) duty = propertyPrice * 0.035;
      else duty = propertyPrice * 0.04;

      if (isFirstHome && propertyPrice <= 600000) {
        duty = duty * 0.5;
      }
    }

    return {
      stampDuty: Math.round(duty),
      disclaimer: isFirstHome ? ' (First home buyer concession applied)' : '',
    };
  };

  const results = calculateStampDuty();

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Property Details
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Property Price (AUD)"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            placeholder="500000"
          />
          <Select
            label="State/Territory"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={[
              { value: 'NSW', label: 'New South Wales (NSW)' },
              { value: 'VIC', label: 'Victoria (VIC)' },
              { value: 'QLD', label: 'Queensland (QLD)' },
              { value: 'WA', label: 'Western Australia (WA)' },
              { value: 'SA', label: 'South Australia (SA)' },
              { value: 'TAS', label: 'Tasmania (TAS)' },
              { value: 'ACT', label: 'Australian Capital Territory (ACT)' },
              { value: 'NT', label: 'Northern Territory (NT)' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Buyer Status
        </h2>
        <div className="space-y-4">
          <Toggle
            label="First Home Buyer"
            checked={isFirstHome}
            onChange={setIsFirstHome}
          />
          <Select
            label="Property Type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            options={[
              { value: 'primary', label: 'Primary Residence' },
              { value: 'investment', label: 'Investment Property' },
            ]}
          />
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="bg-blue-50 border border-blue-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Stamp Duty Calculation
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Property Price ({state})</span>
              <span className="font-mono font-semibold text-primary">
                ${propertyPrice.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Stamp Duty</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${results.stampDuty.toLocaleString()}
              </span>
            </div>
            {isFirstHome && (
              <p className="text-xs text-muted">
                First home buyer exemption/concession applied
              </p>
            )}
          </div>
        </Card>

        <Card className="bg-green-50 border border-green-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Estimated Total Upfront Costs
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Property Price</span>
              <span className="font-mono font-semibold text-primary">
                ${propertyPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">+ Stamp Duty</span>
              <span className="font-mono font-semibold text-primary">
                ${results.stampDuty.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary font-semibold">Total with Stamp Duty</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${(propertyPrice + results.stampDuty).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted pt-2">
              Note: Other costs not included (settlement, legal fees, building inspections, insurance, etc.)
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary mb-2">
          <strong>Disclaimer:</strong> Stamp duty rates vary by state and are subject to change. These calculations are for estimation only. Rates shown are from 2024-25. First home buyer concessions vary significantly by state. Consult your state revenue office or a conveyancer for accurate advice.
        </p>
        <p className="text-sm text-secondary">
          <strong>Additional Costs:</strong> Budget for legal fees (typically $800-$1,500), building inspection, home insurance, and settlement fees.
        </p>
      </Card>
    </div>
  );
}
