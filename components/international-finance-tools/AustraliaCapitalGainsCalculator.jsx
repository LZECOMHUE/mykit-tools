'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

export default function AustraliaCapitalGainsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [salePrice, setSalePrice] = useState(400000);
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(24);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [assetType, setAssetType] = useState('shares');
  const [isMainResidence, setIsMainResidence] = useState(false);

  const calculateCGT = () => {
    const capitalGain = salePrice - purchasePrice;

    // If main residence, CGT is 0
    if (isMainResidence) {
      return {
        capitalGain,
        cgtDiscount: 0,
        cgtDiscountAmount: 0,
        taxableGain: 0,
        marginalRate: 0,
        estimatedCGT: 0,
        netProceeds: salePrice,
        isMainResidence: true,
        message: 'Main Residence Exemption: No CGT payable',
      };
    }

    // CGT discount if held > 12 months (50% for individuals)
    let cgtDiscountPercentage = 0;
    if (holdingPeriodMonths > 12) {
      cgtDiscountPercentage = 50;
    }

    const cgtDiscountAmount = capitalGain * (cgtDiscountPercentage / 100);
    const taxableGain = capitalGain - cgtDiscountAmount;

    // Determine marginal tax rate based on annual income
    let marginalRate = 0;
    if (annualIncome <= 18200) marginalRate = 0;
    else if (annualIncome <= 45000) marginalRate = 0.16;
    else if (annualIncome <= 135000) marginalRate = 0.30;
    else if (annualIncome <= 190000) marginalRate = 0.37;
    else marginalRate = 0.45;

    const estimatedCGT = taxableGain * marginalRate;
    const netProceeds = salePrice - estimatedCGT;

    return {
      capitalGain,
      cgtDiscount: cgtDiscountPercentage,
      cgtDiscountAmount,
      taxableGain,
      marginalRate: (marginalRate * 100).toFixed(0),
      estimatedCGT: Math.round(estimatedCGT),
      netProceeds: Math.round(netProceeds),
      isMainResidence: false,
      message: null,
    };
  };

  const results = calculateCGT();
  const holdingYears = (holdingPeriodMonths / 12).toFixed(1);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Asset Details
        </h2>
        <div className="space-y-4">
          <Input
            type="number"
            label="Purchase Price (AUD)"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            placeholder="300000"
          />
          <Input
            type="number"
            label="Sale Price (AUD)"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            placeholder="400000"
          />
          <Input
            type="number"
            label="Holding Period (months)"
            value={holdingPeriodMonths}
            onChange={(e) => setHoldingPeriodMonths(Number(e.target.value))}
            placeholder="24"
          />
          <p className="text-sm text-muted">
            Holding period: {holdingYears} years
            {holdingPeriodMonths > 12 && ' (qualifies for 50% discount)'}
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">
          Tax Situation
        </h2>
        <div className="space-y-4">
          <Select
            label="Asset Type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            options={[
              { value: 'shares', label: 'Shares' },
              { value: 'property', label: 'Investment Property' },
              { value: 'crypto', label: 'Cryptocurrency' },
              { value: 'other', label: 'Other Asset' },
            ]}
          />
          <Input
            type="number"
            label="Annual Income (AUD)"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            placeholder="80000"
          />
          <Toggle
            label="Is This Your Main Residence?"
            checked={isMainResidence}
            onChange={setIsMainResidence}
          />
          {isMainResidence && (
            <p className="text-xs text-muted">
              Main Residence Exemption: Your principal place of residence is exempt from CGT.
            </p>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        {results.message ? (
          <Card className="p-6 bg-green-50 border border-green-200">
            <h2 className="font-heading text-lg font-bold text-success mb-2">
              {results.message}
            </h2>
            <p className="text-secondary text-sm">
              You do not need to include this capital gain in your tax return.
            </p>
          </Card>
        ) : (
          <>
            <Card className="p-6 bg-blue-50 border border-blue-200">
              <h2 className="font-heading text-lg font-bold text-primary mb-4">
                Capital Gain Calculation
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Sale Price</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.capitalGain + purchasePrice > 0 ? salePrice.toLocaleString() : salePrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">- Purchase Price</span>
                  <span className="font-mono font-semibold text-primary">
                    -${purchasePrice.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-blue-300 pt-3 flex justify-between items-center">
                  <span className="text-secondary font-semibold">Capital Gain</span>
                  <span className={`font-mono font-bold text-lg ${results.capitalGain >= 0 ? 'text-primary' : 'text-error'}`}>
                    ${results.capitalGain.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border border-green-200">
              <h2 className="font-heading text-lg font-bold text-primary mb-4">
                CGT Discount
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Capital Gain</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.capitalGain.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">
                    {results.cgtDiscount > 0
                      ? `- CGT Discount (${results.cgtDiscount}%)`
                      : 'No CGT Discount'}
                  </span>
                  <span className="font-mono font-semibold text-primary">
                    -${results.cgtDiscountAmount.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-green-300 pt-3 flex justify-between items-center">
                  <span className="text-secondary font-semibold">Taxable Gain</span>
                  <span className="font-mono font-bold text-lg text-primary">
                    ${results.taxableGain.toLocaleString()}
                  </span>
                </div>
                {results.cgtDiscount > 0 && (
                  <p className="text-xs text-muted pt-2">
                    Assets held longer than 12 months qualify for a 50% CGT discount
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-orange-50 border border-orange-200">
              <h2 className="font-heading text-lg font-bold text-primary mb-4">
                Estimated Tax
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Taxable Gain</span>
                  <span className="font-mono font-semibold text-primary">
                    ${results.taxableGain.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Your Marginal Tax Rate</span>
                  <span className="font-mono font-semibold text-primary">
                    {results.marginalRate}%
                  </span>
                </div>
                <div className="border-t border-orange-300 pt-3 flex justify-between items-center">
                  <span className="text-secondary font-semibold">Estimated Capital Gains Tax</span>
                  <span className="font-mono font-bold text-lg text-primary">
                    ${results.estimatedCGT.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-purple-50 border border-purple-200">
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
                <div className="flex justify-between items-center">
                  <span className="text-secondary">- Estimated CGT</span>
                  <span className="font-mono font-semibold text-primary">
                    -${results.estimatedCGT.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-purple-300 pt-3 flex justify-between items-center">
                  <span className="text-secondary font-semibold">Net Proceeds (After Tax)</span>
                  <span className="font-mono font-bold text-lg text-primary">
                    ${results.netProceeds.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <Card className="p-6 bg-amber-50 border border-amber-200">
        <p className="text-sm text-secondary mb-2">
          <strong>Disclaimer:</strong> This calculator is for estimation purposes only. Capital gains tax is complex and depends on your individual circumstances. The calculation assumes the standard 50% CGT discount for assets held over 12 months and does not account for CGT concessions, losses, or timing of gains across tax years. Consult a licensed tax accountant or the ATO for advice on your specific situation.
        </p>
        <p className="text-sm text-secondary">
          <strong>Additional Considerations:</strong> You must report all CGT in your tax return. Losses from other assets can offset gains. The financial year runs July 1 to June 30.
        </p>
      </Card>
    </div>
  );
}
