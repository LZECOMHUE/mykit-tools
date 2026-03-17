'use client';

import { useState, useMemo } from 'react';

const CATEGORIES = [
  { value: '12.8', label: 'Most categories (12.8%)' },
  { value: '12.8', label: 'Clothing & Accessories (12.8%)' },
  { value: '10.8', label: 'Business & Industrial (10.8%)' },
  { value: '9.8', label: 'Musical Instruments (9.8%)' },
  { value: '3.0', label: 'Heavy Equipment (3%)' },
  { value: '1.0', label: 'Property (1%)' },
];

function fmt(val) {
  const abs = Math.abs(val);
  return `${val < 0 ? '-' : ''}\u00a3${abs.toFixed(2)}`;
}

export default function EbayFeeCalculator() {
  const [sellingPrice, setSellingPrice] = useState(50);
  const [postageCharge, setPostageCharge] = useState(0);
  const [itemCost, setItemCost] = useState(15);
  const [postageCost, setPostageCost] = useState(2.5);
  const [feePercentage, setFeePercentage] = useState('12.8');
  const [sellerType, setSellerType] = useState('private');
  const [useFreeAllowance, setUseFreeAllowance] = useState(true);
  const [isInternational, setIsInternational] = useState(false);

  const inputCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const r = useMemo(() => {
    const price = sellingPrice;
    const postage = postageCharge;
    const cost = itemCost;
    const postCost = postageCost;
    const feeRate = parseFloat(feePercentage) || 12.8;

    const grossAmount = price + postage;
    const finalValueFee = (grossAmount * feeRate) / 100;
    const perOrderFee = price > 10 ? 0.40 : 0.30;
    const insertionFee = useFreeAllowance ? 0 : 0.35;
    const internationalFee = isInternational ? (grossAmount * 1.3) / 100 : 0;
    const feeSubtotal = finalValueFee + perOrderFee + insertionFee + internationalFee;
    const vat = sellerType === 'business' ? (feeSubtotal * 20) / 100 : 0;
    const totalFees = feeSubtotal + vat;
    const totalCosts = cost + postCost + totalFees;
    const profit = price - totalCosts;
    const profitMargin = price > 0 ? (profit / price) * 100 : 0;
    const feePct = price > 0 ? (totalFees / price) * 100 : 0;

    return { grossAmount, finalValueFee, feeRate, perOrderFee, insertionFee, internationalFee, feeSubtotal, vat, totalFees, totalCosts, profit, profitMargin, feePct, price, cost: cost + postCost };
  }, [sellingPrice, postageCharge, itemCost, postageCost, feePercentage, sellerType, useFreeAllowance, isInternational]);

  const feeRows = [
    { label: 'Final value fee', val: r.finalValueFee, note: `${r.feeRate}% of ${fmt(r.grossAmount)}` },
    { label: 'Per-order fee', val: r.perOrderFee, note: sellingPrice > 10 ? 'Orders over \u00a310' : 'Orders up to \u00a310' },
    ...(r.insertionFee > 0 ? [{ label: 'Insertion fee', val: r.insertionFee, note: '\u00a30.35 per listing' }] : []),
    ...(r.internationalFee > 0 ? [{ label: 'International fee', val: r.internationalFee, note: '1.3% of gross' }] : []),
    ...(r.vat > 0 ? [{ label: 'VAT on fees (20%)', val: r.vat, note: 'Business seller' }] : []),
  ];

  const profitRows = [
    { label: 'Selling price', val: sellingPrice },
    { label: 'Your costs', val: -(itemCost + postageCost) },
    { label: 'eBay fees', val: -r.totalFees },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Selling price</label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">{'\u00a3'}</span>
            <input type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className={`${inputCls} w-full pl-6`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Postage charge</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{'\u00a3'}</span>
              <input type="number" min="0" step="0.01" value={postageCharge} onChange={(e) => setPostageCharge(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Postage cost</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{'\u00a3'}</span>
              <input type="number" min="0" step="0.01" value={postageCost} onChange={(e) => setPostageCost(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[13px] text-text-secondary mb-1 block">Item cost</label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{'\u00a3'}</span>
            <input type="number" min="0" step="0.01" value={itemCost} onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
              className={`${inputCls} w-full pl-5`} />
          </div>
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Category</label>
            <select value={feePercentage} onChange={(e) => setFeePercentage(e.target.value)} className={`${selectCls} w-full`}>
              {CATEGORIES.map((c, i) => <option key={i} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Seller type</label>
            <select value={sellerType} onChange={(e) => setSellerType(e.target.value)} className={`${selectCls} w-full`}>
              <option value="private">Private Seller</option>
              <option value="business">Business Seller (+20% VAT on fees)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useFreeAllowance} onChange={(e) => setUseFreeAllowance(e.target.checked)}
              className="w-3.5 h-3.5 accent-accent cursor-pointer" />
            <span className="text-[13px] text-text-primary">Free listing allowance</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isInternational} onChange={(e) => setIsInternational(e.target.checked)}
              className="w-3.5 h-3.5 accent-accent cursor-pointer" />
            <span className="text-[13px] text-text-primary">International sale (+1.3%)</span>
          </label>
        </div>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          Based on eBay UK fees as of 2026. Rates may vary.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Your profit</p>
            <p className={`text-2xl sm:text-3xl font-bold font-mono leading-tight ${r.profit >= 0 ? 'text-accent' : 'text-error'}`}>
              {fmt(r.profit)}
            </p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Margin: <span className="font-mono">{r.profitMargin.toFixed(1)}%</span></p>
            <p>Fees: <span className="font-mono">{fmt(r.totalFees)}</span> ({r.feePct.toFixed(1)}%)</p>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="space-y-1.5">
            <div className="flex rounded-full overflow-hidden h-3">
              {r.profit > 0 && <div className="bg-green-400 transition-all duration-500" style={{ width: `${(r.profit / sellingPrice) * 100}%` }} />}
              <div className="bg-amber-400 transition-all duration-500" style={{ width: `${(r.cost / sellingPrice) * 100}%` }} />
              <div className="bg-rose-400 transition-all duration-500" style={{ width: `${(r.totalFees / sellingPrice) * 100}%` }} />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-green-400" />Profit</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-amber-400" />Your costs</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-rose-400" />eBay fees</span>
            </div>
          </div>
        </div>

        {/* Fee breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">eBay Fee Breakdown</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-28">Rate</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className="py-1.5 px-2 text-right text-text-muted text-[12px]">{row.note}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(row.val)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total eBay fees</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.totalFees)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Profit summary table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Profit Summary</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              {profitRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className={`py-1.5 px-2 text-right font-mono ${row.val < 0 ? 'text-red-600' : ''}`}>
                    {fmt(row.val)}
                  </td>
                </tr>
              ))}
              <tr className={`border-t-2 border-border font-semibold ${r.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <td className="py-1.5 pr-2 text-text-primary">Your profit</td>
                <td className={`py-1.5 px-2 text-right font-mono ${r.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {fmt(r.profit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Effective rate */}
        <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 flex items-center justify-between">
          <span className="text-[13px] text-text-secondary">Effective eBay fee rate</span>
          <span className="text-[15px] font-semibold font-mono text-text-primary">{r.feePct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
