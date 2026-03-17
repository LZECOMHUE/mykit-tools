'use client';

import { useState, useMemo } from 'react';

const CATEGORIES = [
  { value: 'general', label: 'General (15%)' },
  { value: 'clothing', label: 'Clothing & Accessories' },
  { value: 'electronics', label: 'Electronics (7%)' },
  { value: 'computers', label: 'Computers (7%)' },
  { value: 'games', label: 'Video Games & Consoles (8%)' },
  { value: 'grocery', label: 'Grocery' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'books', label: 'Books (15%)' },
  { value: 'pets', label: 'Pet Products' },
  { value: 'automotive', label: 'Automotive (12%)' },
  { value: 'baby', label: 'Baby Products' },
];

const PACKAGE_SIZES = [
  { value: 'small-envelope', label: 'Small Envelope (up to 80g)', fee: 1.69 },
  { value: 'standard-envelope', label: 'Std Envelope (81-200g)', fee: 1.90 },
  { value: 'large-envelope', label: 'Large Envelope (201-460g)', fee: 2.24 },
  { value: 'small-parcel', label: 'Small Parcel (up to 150g)', fee: 2.65 },
  { value: 'standard-parcel', label: 'Std Parcel (151g-1kg)', fee: 3.07 },
  { value: 'large-parcel', label: 'Large Parcel (1-2kg)', fee: 3.68 },
  { value: 'extra-large', label: 'Extra Large (2-5kg)', fee: 4.85 },
  { value: 'heavy', label: 'Heavy (5-10kg)', fee: 6.15 },
];

const FULFILLMENT_FEES = Object.fromEntries(PACKAGE_SIZES.map(p => [p.value, p.fee]));

function getReferralRate(price, category) {
  if (category === 'clothing') return price <= 15 ? 5 : price <= 20 ? 10 : 15;
  if (category === 'electronics' || category === 'computers') return 7;
  if (category === 'games') return 8;
  if (category === 'grocery') return price <= 10 ? 5 : 8;
  if (category === 'home') return price <= 20 ? 8 : 15;
  if (category === 'pets') return price <= 10 ? 5 : 15;
  if (category === 'baby') return price <= 10 ? 8 : 15;
  if (category === 'automotive') return 12;
  return 15;
}

function fmt(val) {
  const abs = Math.abs(val);
  return `${val < 0 ? '-' : ''}\u00a3${abs.toFixed(2)}`;
}

export default function AmazonFbaCalculator() {
  const [sellingPrice, setSellingPrice] = useState(24.99);
  const [itemCost, setItemCost] = useState(8.5);
  const [category, setCategory] = useState('general');
  const [packageSize, setPackageSize] = useState('standard-parcel');
  const [storageAmount, setStorageAmount] = useState(0.1);
  const [storageSeason, setStorageSeason] = useState('standard');
  const [fulfillment, setFulfillment] = useState('fba');
  const [isMedia, setIsMedia] = useState(false);

  const inputCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const r = useMemo(() => {
    const price = sellingPrice;
    const cost = itemCost;

    const referralPct = getReferralRate(price, category);
    const referralFee = price * (referralPct / 100);
    const fbaFee = fulfillment === 'fba' ? (FULFILLMENT_FEES[packageSize] || 0) : 0;
    const storageRate = storageSeason === 'peak' ? 1.50 : 0.75;
    const storageFee = storageAmount * storageRate;
    const closingFee = isMedia ? 0.50 : 0;
    const totalFees = referralFee + fbaFee + storageFee + closingFee;
    const profit = price - cost - totalFees;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const feePct = price > 0 ? (totalFees / price) * 100 : 0;

    return { referralFee, referralPct, fbaFee, storageFee, closingFee, totalFees, profit, margin, roi, feePct, price, cost };
  }, [sellingPrice, itemCost, category, packageSize, storageAmount, storageSeason, fulfillment, isMedia]);

  const feeRows = [
    { label: 'Referral fee', val: r.referralFee, note: `${r.referralPct}% of price` },
    ...(fulfillment === 'fba' ? [{ label: 'FBA fulfilment', val: r.fbaFee, note: fmt(r.fbaFee) + ' flat' }] : []),
    ...(r.storageFee > 0 ? [{ label: 'Monthly storage', val: r.storageFee, note: `${storageAmount} cu ft` }] : []),
    ...(r.closingFee > 0 ? [{ label: 'Media closing fee', val: r.closingFee, note: '\u00a30.50 flat' }] : []),
  ];

  const profitRows = [
    { label: 'Selling price', val: r.price },
    { label: 'Item cost', val: -r.cost },
    { label: 'Amazon fees', val: -r.totalFees },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1 block">Selling price</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">{'\u00a3'}</span>
              <input type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-6`} />
            </div>
          </div>
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-1 block">Item cost</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">{'\u00a3'}</span>
              <input type="number" min="0" step="0.01" value={itemCost} onChange={(e) => setItemCost(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-6`} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[13px] text-text-secondary mb-1 block">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${selectCls} w-full`}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Fulfilment</p>
          <div className="space-y-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Method</label>
              <select value={fulfillment} onChange={(e) => setFulfillment(e.target.value)} className={`${selectCls} w-full`}>
                <option value="fba">FBA (Fulfilled by Amazon)</option>
                <option value="fbm">FBM (Fulfilled by Merchant)</option>
              </select>
            </div>
            {fulfillment === 'fba' && (
              <div>
                <label className="text-[13px] text-text-secondary mb-1 block">Package size</label>
                <select value={packageSize} onChange={(e) => setPackageSize(e.target.value)} className={`${selectCls} w-full`}>
                  {PACKAGE_SIZES.map((p) => <option key={p.value} value={p.value}>{p.label} - {fmt(p.fee)}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Storage</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Cubic feet</label>
              <input type="number" min="0" step="0.1" value={storageAmount} onChange={(e) => setStorageAmount(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full`} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Season</label>
              <select value={storageSeason} onChange={(e) => setStorageSeason(e.target.value)} className={`${selectCls} w-full`}>
                <option value="standard">Jan-Sep (\u00a30.75)</option>
                <option value="peak">Oct-Dec (\u00a31.50)</option>
              </select>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1">
          <input type="checkbox" checked={isMedia} onChange={(e) => setIsMedia(e.target.checked)}
            className="w-3.5 h-3.5 accent-accent cursor-pointer" />
          <span className="text-[13px] text-text-primary">Media item (+\u00a30.50)</span>
        </label>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          Based on Amazon UK fees as of 2026. Rates may vary.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Profit per unit</p>
            <p className={`text-2xl sm:text-3xl font-bold font-mono leading-tight ${r.profit >= 0 ? 'text-accent' : 'text-error'}`}>
              {fmt(r.profit)}
            </p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Margin: <span className="font-mono">{r.margin.toFixed(1)}%</span></p>
            <p>ROI: <span className="font-mono">{r.roi.toFixed(1)}%</span></p>
            <p>Fees: <span className="font-mono">{fmt(r.totalFees)}</span> ({r.feePct.toFixed(1)}%)</p>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="space-y-1.5">
            <div className="flex rounded-full overflow-hidden h-3">
              {r.profit > 0 && <div className="bg-green-400 transition-all duration-500" style={{ width: `${(r.profit / r.price) * 100}%` }} />}
              <div className="bg-amber-400 transition-all duration-500" style={{ width: `${(r.cost / r.price) * 100}%` }} />
              <div className="bg-rose-400 transition-all duration-500" style={{ width: `${(r.totalFees / r.price) * 100}%` }} />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-green-400" />Profit</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-amber-400" />Item cost</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-rose-400" />Amazon fees</span>
            </div>
          </div>
        </div>

        {/* Fee breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Amazon Fee Breakdown</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-24">Rate</th>
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
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total Amazon fees</td>
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
          <span className="text-[13px] text-text-secondary">Effective Amazon fee rate</span>
          <span className="text-[15px] font-semibold font-mono text-text-primary">{r.feePct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
