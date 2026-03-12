"use client";

import { useState, useMemo } from "react";
import { TAX_YEARS, DIVIDEND_TAX, CURRENT_TAX_YEAR } from "@/data/tax-rates";
import { formatCurrency, formatPercentage } from "@/lib/format";

const fmt = (n) => {
  if (n === null || isNaN(n)) return "—";
  return formatCurrency(n);
};

export default function DividendTaxCalculator() {
  const [salary, setSalary] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");
  const [taxYear, setTaxYear] = useState(CURRENT_TAX_YEAR);

  const taxYearData = useMemo(() => TAX_YEARS[taxYear], [taxYear]);
  const dividendData = useMemo(() => DIVIDEND_TAX[taxYear], [taxYear]);

  const results = useMemo(() => {
    const sal = parseFloat(salary) || 0;
    const div = parseFloat(dividendIncome) || 0;

    if (sal < 0 || div < 0) return null;
    if (div === 0) return null;

    const pa = taxYearData.personalAllowance;
    const bands = taxYearData.incomeTaxBands;
    const allowance = dividendData.allowance;
    const dividendRates = dividendData.rates;

    // Determine which tax band salary falls into
    let salaryInBand = sal - pa;
    if (salaryInBand < 0) salaryInBand = 0;

    let remainingBasicBand = Math.max(0, bands[0].to - Math.max(pa, 0) - salaryInBand);
    let remainingHigherBand = Math.max(0, bands[1].to - Math.max(bands[0].to, pa + salaryInBand));
    let additionalBandUsed = salaryInBand > remainingBasicBand + remainingHigherBand;

    // Tax-free dividend allowance
    let taxableDividends = Math.max(0, div - allowance);

    // Allocate dividends to bands
    let dividendAtBasic = 0;
    let dividendAtHigher = 0;
    let dividendAtAdditional = 0;

    if (taxableDividends > 0) {
      if (remainingBasicBand > 0) {
        dividendAtBasic = Math.min(taxableDividends, remainingBasicBand);
        taxableDividends -= dividendAtBasic;
      }

      if (taxableDividends > 0 && remainingHigherBand > 0) {
        dividendAtHigher = Math.min(taxableDividends, remainingHigherBand);
        taxableDividends -= dividendAtHigher;
      }

      if (taxableDividends > 0) {
        dividendAtAdditional = taxableDividends;
      }
    }

    const taxAtBasic = dividendAtBasic * dividendRates.basic;
    const taxAtHigher = dividendAtHigher * dividendRates.higher;
    const taxAtAdditional = dividendAtAdditional * dividendRates.additional;

    const totalTax = taxAtBasic + taxAtHigher + taxAtAdditional;
    const netIncome = div - totalTax;
    const effectiveRate = div > 0 ? (totalTax / div) * 100 : 0;

    return {
      allowance,
      taxableDividends: div - allowance,
      dividendAtBasic,
      dividendAtHigher,
      dividendAtAdditional,
      taxAtBasic,
      taxAtHigher,
      taxAtAdditional,
      totalTax,
      netIncome,
      effectiveRate,
      totalIncome: sal + div,
    };
  }, [salary, dividendIncome, taxYear, taxYearData, dividendData]);

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
              placeholder="e.g. 45000"
              className={`${inputStyle} pl-7`}
              step="any"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Enter your salary to see which tax band your dividends fall into
          </p>
        </div>

        {/* Dividend Income */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Total dividend income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">£</span>
            <input
              type="number"
              value={dividendIncome}
              onChange={(e) => setDividendIncome(e.target.value)}
              placeholder="e.g. 5000"
              className={`${inputStyle} pl-7`}
              step="any"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Include all dividend income from shares, investments, trusts
          </p>
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
                <p className="text-xs font-medium text-text-secondary mb-1">Dividend tax</p>
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
                <p className="text-xs font-medium text-text-secondary mb-1">Net dividend</p>
                <p className="text-2xl font-bold font-mono-num text-text-primary">
                  {fmt(results.netIncome)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Total income</p>
                <p className="text-2xl font-bold font-mono-num text-text-primary">
                  {fmt(results.totalIncome)}
                </p>
              </div>
            </div>
          </div>

          {/* Tax-free allowance info */}
          <div className="bg-accent-muted border border-accent/20 rounded-[var(--radius-card)] p-4">
            <p className="text-sm text-text-primary">
              <span className="font-medium">First {fmt(results.allowance)} is tax-free</span>
              <span className="text-text-secondary ml-1">
                — the dividend tax-free allowance for {taxYear}
              </span>
            </p>
          </div>

          {/* Breakdown by tax band */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-text-primary">Tax breakdown by band</h3>
            </div>
            <div className="divide-y divide-border">
              {/* Basic rate */}
              <div className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-primary">
                    Basic rate ({formatPercentage(dividendData.rates.basic * 100, 2)})
                  </p>
                  <p className="text-xs text-text-muted">
                    {fmt(results.dividendAtBasic)} × {formatPercentage(dividendData.rates.basic * 100, 2)}
                  </p>
                </div>
                <p className="text-sm font-semibold font-mono-num text-text-primary">
                  {fmt(results.taxAtBasic)}
                </p>
              </div>

              {/* Higher rate */}
              {results.dividendAtHigher > 0 && (
                <div className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">
                      Higher rate ({formatPercentage(dividendData.rates.higher * 100, 2)})
                    </p>
                    <p className="text-xs text-text-muted">
                      {fmt(results.dividendAtHigher)} × {formatPercentage(dividendData.rates.higher * 100, 2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold font-mono-num text-text-primary">
                    {fmt(results.taxAtHigher)}
                  </p>
                </div>
              )}

              {/* Additional rate */}
              {results.dividendAtAdditional > 0 && (
                <div className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">
                      Additional rate ({formatPercentage(dividendData.rates.additional * 100, 2)})
                    </p>
                    <p className="text-xs text-text-muted">
                      {fmt(results.dividendAtAdditional)} × {formatPercentage(dividendData.rates.additional * 100, 2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold font-mono-num text-text-primary">
                    {fmt(results.taxAtAdditional)}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="px-6 py-3 bg-surface flex items-center justify-between font-semibold">
                <p className="text-sm text-text-primary">Total dividend tax</p>
                <p className="font-mono-num text-text-primary">{fmt(results.totalTax)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information section */}
      <div className="bg-surface rounded-[var(--radius-card)] px-6 py-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-2">How dividend tax works</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            You get a dividend allowance (tax-free amount) each year. Dividends above this are taxed at different rates
            depending on your income tax band:
          </p>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Basic rate ({formatPercentage(dividendData.rates.basic * 100, 2)}):</span> If
              your total income falls in the basic rate band (up to {fmt(taxYearData.incomeTaxBands[0].to)})
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Higher rate ({formatPercentage(dividendData.rates.higher * 100, 2)}):</span> If
              your income enters the higher rate band ({fmt(taxYearData.incomeTaxBands[1].from)} to{" "}
              {fmt(taxYearData.incomeTaxBands[1].to)})
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-semibold">→</span>
            <span>
              <span className="font-medium text-text-primary">Additional rate ({formatPercentage(dividendData.rates.additional * 100, 2)}):</span> If
              your income exceeds {fmt(taxYearData.incomeTaxBands[1].to)}
            </span>
          </li>
        </ul>
        <p className="text-xs text-text-muted pt-2 border-t border-border">
          <span className="font-medium text-text-secondary">Tax year {taxYear}:</span> Personal allowance is{" "}
          {fmt(taxYearData.personalAllowance)}, dividend allowance is {fmt(dividendData.allowance)}. This tool
          calculates income tax on dividends only — it does not include National Insurance or other taxes.
        </p>
      </div>
    </div>
  );
}
