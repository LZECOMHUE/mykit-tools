'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function CanadaCapitalGainsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [salePrice, setSalePrice] = useState(500000);
  const [province, setProvince] = useState('on');
  const [marginalTaxRate, setMarginalTaxRate] = useState(30);
  const [isPrincipalResidence, setIsPrincipalResidence] = useState(false);

  const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
  ];

  const capitalGain = Math.max(0, salePrice - purchasePrice);
  const inclusionRate = 0.5; // 50% inclusion rate for all gains

  let taxableCapitalGain = 0;
  if (isPrincipalResidence) {
    taxableCapitalGain = 0;
  } else {
    taxableCapitalGain = capitalGain * inclusionRate;
  }

  const estimatedTax = taxableCapitalGain * (marginalTaxRate / 100);
  const netProceeds = salePrice - estimatedTax;

  const effectiveTaxRate = capitalGain > 0 ? (estimatedTax / capitalGain) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Property or Investment Sale
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Purchase Price ($ CAD)"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            placeholder="400000"
          />
          <Input
            type="number"
            label="Sale Price ($ CAD)"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            placeholder="500000"
          />
          <Select
            label="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            options={provinces}
          />
          <Input
            type="number"
            label="Your Marginal Tax Rate (%)"
            value={marginalTaxRate}
            onChange={(e) => setMarginalTaxRate(Number(e.target.value))}
            placeholder="30"
          />
          <Toggle
            label="Principal Residence Exemption (exempt from capital gains)"
            checked={isPrincipalResidence}
            onChange={setIsPrincipalResidence}
          />
          {isPrincipalResidence && (
            <p className="text-xs text-accent">
              If you designate this property as your principal residence, the capital gain is fully exempt from tax (no capital gains tax).
            </p>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Capital Gain Calculation
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Sale Price</span>
            <span className="font-mono font-semibold text-primary">
              ${salePrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Purchase Price</span>
            <span className="font-mono font-semibold text-primary">
              -${purchasePrice.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Capital Gain</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${capitalGain.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      {!isPrincipalResidence && (
        <Card className="p-6 bg-green-50 border border-green-200">
          <h2 className="font-heading text-lg font-bold text-primary mb-4">
            Tax on Capital Gain
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Capital Gain</span>
              <span className="font-mono font-semibold text-primary">
                ${capitalGain.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Inclusion Rate</span>
              <span className="font-mono font-semibold text-primary">
                {(inclusionRate * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Taxable Capital Gain</span>
              <span className="font-mono font-semibold text-primary">
                ${taxableCapitalGain.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-green-300 pt-3 flex justify-between items-center">
              <span className="text-secondary">Marginal Tax Rate</span>
              <span className="font-mono font-semibold text-primary">
                {marginalTaxRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary font-semibold">Estimated Tax Owing</span>
              <span className="font-mono font-bold text-lg text-primary">
                ${estimatedTax.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary text-sm">Effective Tax Rate</span>
              <span className="font-mono font-semibold text-primary">
                {effectiveTaxRate.toFixed(2)}%
              </span>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-orange-50 border border-orange-200">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Net Proceeds
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Sale Price</span>
            <span className="font-mono font-semibold text-primary">
              ${salePrice.toLocaleString()}
            </span>
          </div>
          {!isPrincipalResidence && (
            <div className="flex justify-between items-center">
              <span className="text-secondary">Capital Gains Tax</span>
              <span className="font-mono font-semibold text-primary">
                -${estimatedTax.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
          <div className="border-t border-orange-300 pt-3 flex justify-between items-center">
            <span className="text-secondary font-semibold">Net Proceeds to You</span>
            <span className="font-mono font-bold text-lg text-primary">
              ${netProceeds.toLocaleString('en-CA', { maximumFractionDigits: 2 })}
            </span>
          </div>
          {isPrincipalResidence && (
            <p className="text-xs text-secondary pt-2">
              With the Principal Residence Exemption, you pay no capital gains tax on this sale.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-lg font-bold text-primary mb-4">
          Capital Gains Information
        </h2>
        <div className="space-y-4 text-sm text-secondary">
          <div>
            <p className="font-semibold text-primary mb-1">Capital Gains Inclusion Rate</p>
            <p>
              In Canada, only 50% of capital gains are included in your taxable income. You are taxed on the 50% inclusion, not the full gain. This applies to all capital gains as of March 2025.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">Principal Residence Exemption</p>
            <p>
              If you designate a property as your principal residence (the home where you normally live), the entire capital gain is exempt from tax. Each person can only designate one property per year.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">Reporting to CRA</p>
            <p>
              You must report capital gains on your tax return even if you do not owe tax. Use Form T776 for rental properties or Schedule 3 for other capital gains.
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary mb-1">Costs to Deduct</p>
            <p>
              You can reduce your capital gain by eligible expenses: real estate commission, legal fees, transfer taxes, inspection costs, and home improvements (but not maintenance).
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary">
          <strong>Disclaimer:</strong> This calculator is for estimation only and does not include acquisition costs, sale fees, or eligible deductions that could reduce your gain. The 50% inclusion rate applies as of March 2025. For investment properties, rental income considerations, and complex situations, consult the Canada Revenue Agency (CRA) website or a tax professional. Your actual tax liability may differ.
        </p>
      </Card>
    </div>
  );
}
