"use client";

import { useState, useMemo } from "react";
import { TAX_YEARS, CGT_RATES, CURRENT_TAX_YEAR } from "@/data/tax-rates";
import { formatCurrency, formatPercentage } from "@/lib/format";

const fmt = (n) => {
  if (n === null || isNaN(n)) return "—";
  return formatCurrency(n);
};

export default function CapitalGainsTaxCalculator() {
  const [salary, setSalary] = useState("");
  const [capitalGain, setCapitalGain] = useState("");
  const [assetType, setAssetType] = useState("shares");
  const [useBusinessAssetsRelief, setUseBusinessAssetsRelief] = useState(false);
  const [businessAssetsReliefUsed, setBusinessAssetsReliefUsed] = useState("");
  const [taxYear, setTaxYear] = useState(CURRENT_TAX_YEAR);

  const taxYearData = useMemo(() => TAX_YEARS[taxYear], [taxYear]);
  const cgtData = useMemo(() => CGT_RATES[taxYear], [taxYear]);

  const results = useMemo(() => {
    const sal = parseFloat(salary) || 0;
    const gain = parseFloat(capitalGain) || 0;

    if (sal < 0 || gain < 0) return null;
    if (gain === 0) return null;

    const pa = taxYearData.personalAllowance;
    const bands = taxYearData.incomeTaxBands;
    const aea = cgtData.annualExemptAmount;

    // Determine tax band from salary
    let salaryInBand = sal - pa;
    if (salaryInBand < 0) salaryInBand = 0;

    const basicRateBandTop = bands[0].to;
    const higherRateBandTop = bands[1].to;

    let remainingBasicBand = Math.max(0, basicRateBandTop - Math.max(pa, 0) - salaryInBand);
    let remainingHigherBand = Math.max(0, higherRateBandTop - Math.max(basicRateBandTop, pa + salaryInBand));

    // Apply annual exempt amount
    let taxableGain = Math.max(0, gain - aea);

    // Determine base CGT rate by asset type
    let baseBasicRate = assetType === "residential" ? cgtData.residentialBasicRate : cgtData.basicRate;
    let baseHigherRate = assetType === "residential" ? cgtData.residentialHigherRate : cgtData.higherRate;

    // Apply Business Assets Relief if applicable
    let reliefApplied = 0;
    let gainAfterRelief = taxableGain;

    if (useBusinessAssetsRelief && taxableGain > 0) {
      const reliefAllocation = parseFloat(businessAssetsReliefUsed) || 0;
      reliefApplied = Math.min(reliefAllocation, cgtData.businessAssetsReliefLifetimeLimit);
      gainAfterRelief = Math.max(0, taxableGain - reliefApplied);

      // Gains with relief are taxed at 14% (lower than normal rates)
      const taxOnRelief = reliefApplied * cgtData.businessAssetsReliefRate;
      let gainWithoutRelief = gainAfterRelief;

      // Allocate remaining gain to bands
      let gainAtBasic = 0;
      let gainAtHigher = 0;

      if (gainWithoutRelief > 0) {
        if (remainingBasicBand > 0) {
          gainAtBasic = Math.min(gainWithoutRelief, remainingBasicBand);
          gainWithoutRelief -= gainAtBasic;
        }
        if (gainWithoutRelief > 0) {
          gainAtHigher = gainWithoutRelief;
        }
      }

      const taxAtBasic = gainAtBasic * baseBasicRate;
      const taxAtHigher = gainAtHigher * baseHigherRate;

      const totalTax = taxOnRelief + taxAtBasic + taxAtHigher;
      const netGain = gain - totalTax;
      const effectiveRate = gain > 0 ? (totalTax / gain) * 100 : 0;

      return {
        aea,
        beforeAEA: gain,
        taxableGain: taxableGain,
        reliefApplied,
        gainWithRelief: reliefApplied,
        taxOnRelief,
        gainAtBasic,
        gainAtHigher,
        taxAtBasic,
        taxAtHigher,
        totalTax,
        netGain,
        effectiveRate,
        hasRelief: true,
      };
    }

    // No relief: straight allocation to bands
    let gainAtBasic = 0;
    let gainAtHigher = 0;

    if (taxableGain > 0) {
      if (remainingBasicBand > 0) {
        gainAtBasic = Math.min(taxableGain, remainingBasicBand);
        taxableGain -= gainAtBasic;
      }
      if (taxableGain > 0) {
        gainAtHigher = taxableGain;
      }
    }

    const taxAtBasic = gainAtBasic * baseBasicRate;
    const taxAtHigher = gainAtHigher * baseHigherRate;

    const totalTax = taxAtBasic + taxAtHigher;
    const netGain = gain - totalTax;
    const effectiveRate = gain > 0 ? (totalTax / gain) * 100 : 0;

    return {
      aea,
      beforeAEA: gain,
      taxableGain: gain - aea,
      reliefApplied: 0,
      gainWithRelief: 0,
      taxOnRelief: 0,
      gainAtBasic,
      gainAtHigher,
      taxAtBasic,
      taxAtHigher,
      totalTax,
      netGain,
      effectiveRate,
      hasRelief: false,
    };
  }, [salary, capitalGain, assetType, useBusinessAssetsRelief, businessAssetsReliefUsed, taxYear, taxYearData, cgtData]);

  const inputStyle =
    "w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono-num";
  const selectStyle =
    "w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  return (
    <div className="max-w-2xl space-y-6">
      {/* Input card */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual salary (optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">£</span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 60000"
              className={`${inputStyle} pl-7`}
              step="any"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Enter your salary to determine which CGT rate applies to your gains
          </p>
        </div>

        {/* Capital gain */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Capital gain
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">£</span>
            <input
              type="number"
              value={capitalGain}
              onChange={(e) => setCapitalGain(e.target.value)}
              placeholder="e.g. 25000"
              className={`${inputStyle} pl-7`}
              step="any"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">
            The profit from selling the asset (selling price minus cost)
          </p>
        </div>

        {/* Asset type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Asset type
          </label>
          <select value={assetType} onChange={(e) => setAssetType(e.target.value)} className={selectStyle}>
            <option value="shares">Shares and other investments</option>
            <option value="residential">Residential property (second homes, BTL)</option>
          </select>
          <p className="text-xs text-text-muted mt-1">
            Main residence is exempt from CGT. Residential property has higher rates.
          </p>
        </div>

        {/* Business Assets Relief */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="useRelief"
              checked={useBusinessAssetsRelief}
              onChange={(e) => setUseBusinessAssetsRelief(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-accent"
            />
            <label htmlFor="useRelief" className="text-sm font-medium text-text-primary cursor-pointer">
              Use Business Assets Relief (14% rate)
            </label>
          </div>

          {useBusinessAssetsRelief && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Gain qualifying for relief
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">£</span>
                <input
                  type="number"
                  value={businessAssetsReliefUsed}
                  onChange={(e) => setBusinessAssetsReliefUsed(e.target.value)}
                  placeholder="e.g. 10000"
                  className={`${inputStyle} pl-7`}
                  step="any"
                />
              </div>
              <p className="text-xs text-text-muted mt-1">
                Maximum lifetime allowance: {fmt(cgtData.businessAssetsReliefLifetimeLimit)}
              </p>
            </div>
          )}
        </div>

        {/* Tax year selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tax year
          </label>
          <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className={selectStyle}>
            <option value="2025/26">2025/26 (current)</option>
            <option value="2024/25">2024/25</option>
            <option value="2023/24">2023/24</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Summary card */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Capital gains tax</p>
                <p className="text-2xl font-bold font-mono-num text-text-primary">
                  {fmt(results.totalTax)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Effective rate</p>
                <p className="text-2xl font-bold font-mono-num text-accent">
                  {formatPercentage(results.effectiveRate, 2)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Net gain</p>
                <p className="text-2xl font-bold font-mono-num text-text-primary">
                  {fmt(results.netGain)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">AEA remaining</p>
                <p className="text-sm font-mono-num text-text-secondary">
                  {fmt(Math.max(0, results.aea - (results.beforeAEA - results.aea)))}
                </p>
              </div>
            </div>
          </div>

          {/* Annual Exempt Amount info */}
          <div className="bg-accent-muted border border-accent/20 rounded-[var(--radius-card)] p-4">
            <p className="text-sm text-text-primary">
              <span className="font-medium">First {fmt(results.aea)} is tax-free</span>
              <span className="text-text-secondary ml-1">
                — the annual exempt amount (AEA) for {taxYear}
              </span>
            </p>
          </div>

          {/* Breakdown by tax band */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-text-primary">Tax breakdown by band</h3>
            </div>
            <div className="divide-y divide-border">
              {/* Business Assets Relief section (if used) */}
              {results.hasRelief && results.gainWithRelief > 0 && (
                <div className="px-6 py-3 flex items-center justify-between bg-green-50">
                  <div>
                    <p className="text-sm text-text-primary font-medium">Business Assets Relief (14%)</p>
                    <p className="text-xs text-text-muted">
                      {fmt(results.gainWithRelief)} × 14%
                    </p>
                  </div>
                  <p className="text-sm font-semibold font-mono-num text-text-primary">
                    {fmt(results.taxOnRelief)}
                  </p>
                </div>
              )}

              {/* Basic rate */}
              {results.gainAtBasic > 0 && (
                <div className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">
                      Basic rate {assetType === "residential" ? "(18%)" : "(10%)"}
                    </p>
                    <p className="text-xs text-text-muted">
                      {fmt(results.gainAtBasic)} × {formatPercentage((assetType === "residential" ? cgtData.residentialBasicRate : cgtData.basicRate) * 100, 0)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold font-mono-num text-text-primary">
                    {fmt(results.taxAtBasic)}
                  </p>
                </div>
              )}

              {/* Higher rate */}
              {results.gainAtHigher > 0 && (
                <div className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">
                      Higher rate {assetType === "residential" ? "(24%)" : "(20%)"}
                    </p>
                    <p className="text-xs text-text-muted">
                      {fmt(results.gainAtHigher)} × {formatPercentage((assetType === "residential" ? cgtData.residentialHigherRate : cgtData.higherRate) * 100, 0)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold font-mono-num text-text-primary">
                    {fmt(results.taxAtHigher)}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="px-6 py-3 bg-surface flex items-center justify-between font-semibold">
                <p className="text-sm text-text-primary">Total CGT</p>
                <p className="font-mono-num text-text-primary">{fmt(results.totalTax)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information section */}
      <div className="bg-surface rounded-[var(--radius-card)] px-6 py-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-2">How capital gains tax works</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            You get an annual exempt amount (AEA) — gains below this are tax-free. Gains above the AEA are taxed based
            on your income tax band:
          </p>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Basic rate:</span> Gains within your basic rate band are
              taxed at {formatPercentage(cgtData.basicRate * 100, 0)} (shares) or {formatPercentage(cgtData.residentialBasicRate * 100, 0)}%
              (residential property)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Higher rate:</span> Any remaining gains are taxed at{" "}
              {formatPercentage(cgtData.higherRate * 100, 0)} (shares) or {formatPercentage(cgtData.residentialHigherRate * 100, 0)}%
              (residential property)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Business Assets Relief:</span> If you qualify, gains up to
              the lifetime limit ({fmt(cgtData.businessAssetsReliefLifetimeLimit)}) are taxed at the lower rate of{" "}
              {formatPercentage(cgtData.businessAssetsReliefRate * 100, 0)}%
            </span>
          </li>
        </ul>
        <p className="text-xs text-text-muted pt-2 border-t border-border">
          <span className="font-medium text-text-secondary">Important:</span> Your main residence is exempt from CGT.
          This calculator is for gains on shares, investments, and second properties. Report gains on your Self
          Assessment tax return if required.
        </p>
      </div>
    </div>
  );
}
