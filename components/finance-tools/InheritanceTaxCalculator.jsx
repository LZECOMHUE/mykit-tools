'use client';

import { useState, useMemo } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/format';
import { IHT_RATES } from '@/data/tax-rates';

export default function InheritanceTaxCalculator() {
  const [estateValue, setEstateValue] = useState(750000);
  const [residenceValue, setResidenceValue] = useState(350000);
  const [includesResidence, setIncludesResidence] = useState(true);
  const [passToChildren, setPassToChildren] = useState(true);
  const [isMarried, setIsMarried] = useState(false);
  const [unusedAllowance, setUnusedAllowance] = useState(false);
  const [giftsInLast7Years, setGiftsInLast7Years] = useState(0);
  const [charityPercentage, setCharityPercentage] = useState(0);

  const results = useMemo(() => {
    // Start with the estate value
    let taxableEstate = estateValue;

    // Apply gifts made in last 7 years (reduce the nil-rate band)
    const giftAllowance = Math.max(0, IHT_RATES.nilRateBand - giftsInLast7Years);

    // Calculate nil-rate band
    let nilRateBand = IHT_RATES.nilRateBand;
    if (isMarried && unusedAllowance) {
      nilRateBand = IHT_RATES.nilRateBand * 2; // £650,000
    }

    // Calculate residence nil-rate band (RNRB)
    let residenceNilRateBand = 0;
    if (includesResidence && passToChildren) {
      residenceNilRateBand = IHT_RATES.residenceNilRateBand; // £175,000
      if (isMarried && unusedAllowance) {
        residenceNilRateBand = IHT_RATES.residenceNilRateBand * 2; // £350,000
      }

      // Apply RNRB taper for estates over £2m
      if (estateValue > IHT_RATES.taperThreshold) {
        const excessAmount = estateValue - IHT_RATES.taperThreshold;
        const rnrbTaper = excessAmount * IHT_RATES.taperRate;
        residenceNilRateBand = Math.max(0, residenceNilRateBand - rnrbTaper);
      }
    }

    // Total allowances
    const totalAllowances = nilRateBand + residenceNilRateBand;

    // Taxable amount (after allowances)
    let ihtBillBefore = Math.max(0, taxableEstate - totalAllowances);

    // Determine IHT rate based on charity bequest
    let ihtRate = IHT_RATES.standardRate;
    let charityAmount = 0;

    if (charityPercentage > 0) {
      charityAmount = (taxableEstate * charityPercentage) / 100;
      if (charityPercentage >= 10) {
        ihtRate = IHT_RATES.charityRate; // 36% instead of 40%
      }
    }

    // Calculate IHT on the taxable amount
    const ihtBill = ihtBillBefore * ihtRate;

    // Calculate effective rate
    const effectiveRate = estateValue > 0 ? (ihtBill / estateValue) * 100 : 0;

    // Tax-free amount
    const taxFreeAmount = Math.min(totalAllowances, taxableEstate);

    // Amount subject to tax
    const taxableAmount = Math.max(0, taxableEstate - totalAllowances);

    return {
      nilRateBand,
      residenceNilRateBand,
      totalAllowances,
      charityAmount,
      ihtRate: ihtRate * 100,
      ihtBill,
      effectiveRate,
      taxFreeAmount,
      taxableAmount,
      giftsUsedAllowance: Math.min(giftsInLast7Years, IHT_RATES.nilRateBand),
    };
  }, [estateValue, residenceValue, includesResidence, passToChildren, isMarried, unusedAllowance, giftsInLast7Years, charityPercentage]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">UK Inheritance Tax Calculator</h2>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] p-4 mb-6 text-sm text-text-primary">
        <p className="font-medium text-blue-900 mb-2">About Inheritance Tax</p>
        <p className="text-blue-800">This calculator estimates IHT based on 2025/26 thresholds. It does not account for business property relief, agricultural property relief, or other complex reliefs. Always seek professional advice.</p>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Estate Value */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Total Estate Value (£)
          </label>
          <input
            type="number"
            value={estateValue}
            onChange={(e) => setEstateValue(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="10000"
          />
          <p className="text-xs text-text-muted mt-1">Property, savings, investments, pensions (some exceptions), insurance payouts</p>
        </div>

        {/* Main Residence Value and Toggle */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="includesResidence"
              checked={includesResidence}
              onChange={(e) => setIncludesResidence(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <label htmlFor="includesResidence" className="text-sm font-medium text-text-primary">
              Estate includes main residence
            </label>
          </div>
          {includesResidence && (
            <input
              type="number"
              value={residenceValue}
              onChange={(e) => setResidenceValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
              min="0"
              step="10000"
              placeholder="Main residence value"
            />
          )}
          <p className="text-xs text-text-muted mt-1">Unlocks residence nil-rate band (RNRB) of £175,000 per person</p>
        </div>

        {/* Passing to Direct Descendants */}
        {includesResidence && (
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="passToChildren"
                checked={passToChildren}
                onChange={(e) => setPassToChildren(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="passToChildren" className="text-sm font-medium text-text-primary">
                Residence passes to direct descendants (children, grandchildren)
              </label>
            </div>
            <p className="text-xs text-text-muted mt-1">Required to claim RNRB. Does not apply if passed to spouse/civil partner</p>
          </div>
        )}

        {/* Married/Civil Partnership */}
        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isMarried"
              checked={isMarried}
              onChange={(e) => setIsMarried(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <label htmlFor="isMarried" className="text-sm font-medium text-text-primary">
              Married or in a civil partnership
            </label>
          </div>
          <p className="text-xs text-text-muted mt-1">Allows use of spouse's unused allowances</p>
        </div>

        {/* Unused Spouse Allowance */}
        {isMarried && (
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="unusedAllowance"
                checked={unusedAllowance}
                onChange={(e) => setUnusedAllowance(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="unusedAllowance" className="text-sm font-medium text-text-primary">
                Spouse/partner had unused nil-rate band when they died
              </label>
            </div>
            <p className="text-xs text-text-muted mt-1">Doubles your allowances if their full allowance was unused</p>
          </div>
        )}

        {/* Gifts Made in Last 7 Years */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gifts Made in Last 7 Years (£) <span className="text-text-muted">Optional</span>
          </label>
          <input
            type="number"
            value={giftsInLast7Years}
            onChange={(e) => setGiftsInLast7Years(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="10000"
          />
          <p className="text-xs text-text-muted mt-1">Reduce available nil-rate band (£3,000 annual exemption applies first)</p>
        </div>

        {/* Charity Bequest */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Percentage Passing to Charity (%) <span className="text-text-muted">Optional</span>
          </label>
          <input
            type="number"
            value={charityPercentage}
            onChange={(e) => setCharityPercentage(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            max="100"
            step="1"
          />
          <p className="text-xs text-text-muted mt-1">10%+ reduces rate to 36%. No IHT on charitable gifts</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">Estimated Inheritance Tax Bill</p>
          <p className="text-3xl font-bold text-accent font-mono-num">
            {formatCurrency(results.ihtBill)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-1">Effective Tax Rate</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatPercentage(results.effectiveRate, 2)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Tax-Free Amount</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatCurrency(results.taxFreeAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border">
        <h3 className="text-lg font-bold text-text-primary mb-4">Tax-Free Allowances Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-text-secondary">Nil-Rate Band</span>
            <span className="font-mono-num font-bold text-text-primary">
              {formatCurrency(results.nilRateBand)}
            </span>
          </div>

          {results.residenceNilRateBand > 0 && (
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-text-secondary">Residence Nil-Rate Band (RNRB)</span>
              <span className="font-mono-num font-bold text-text-primary">
                {formatCurrency(results.residenceNilRateBand)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 bg-blue-50 px-3 py-2 rounded">
            <span className="text-text-primary font-medium">Total Tax-Free Allowance</span>
            <span className="font-mono-num font-bold text-text-primary">
              {formatCurrency(results.totalAllowances)}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between items-center pb-3">
              <span className="text-text-secondary">Estate Value</span>
              <span className="font-mono-num font-bold text-text-primary">
                {formatCurrency(estateValue)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3">
              <span className="text-text-secondary">Less: Tax-Free Allowances</span>
              <span className="font-mono-num text-text-primary">
                −{formatCurrency(results.taxFreeAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-t border-border pt-3">
              <span className="text-text-secondary">Taxable Amount</span>
              <span className="font-mono-num font-bold text-text-primary">
                {formatCurrency(results.taxableAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">IHT Rate Applied</span>
              <span className="font-mono-num font-bold text-accent">
                {formatPercentage(results.ihtRate, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="bg-white rounded-[var(--radius-card)] p-4 border border-border text-xs text-text-muted space-y-2">
        <p><strong className="text-text-primary">Key Facts:</strong></p>
        <ul className="list-disc list-inside space-y-1 text-text-secondary">
          <li>IHT applies to estates over the nil-rate band (£325,000 in 2025/26)</li>
          <li>RNRB increases if main residence passes to direct descendants</li>
          <li>Married couples can inherit unused allowances (up to £650,000 each)</li>
          <li>10%+ to charity reduces rate from 40% to 36%</li>
          <li>This is an estimate. Seek professional advice for complex estates</li>
        </ul>
      </div>
    </div>
  );
}
