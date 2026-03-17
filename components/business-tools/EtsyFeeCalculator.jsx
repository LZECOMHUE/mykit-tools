'use client';

import { useState, useMemo } from 'react';

const CURRENCIES = {
  GBP: { symbol: '\u00a3', label: 'GBP (\u00a3)' },
  USD: { symbol: '$', label: 'USD ($)' },
  EUR: { symbol: '\u20ac', label: 'EUR (\u20ac)' },
};

const FEE_RATES = {
  listing: { GBP: 0.16, USD: 0.20, EUR: 0.18 },
  transaction: 0.065,
  payment: {
    GBP: { pct: 0.04, fixed: 0.20 },
    USD: { pct: 0.03, fixed: 0.25 },
    EUR: { pct: 0.04, fixed: 0.30 },
  },
  offsiteAds: 0.15,
  regulatory: 0.003,
};

function fmt(val, sym) {
  const abs = Math.abs(val);
  return `${val < 0 ? '-' : ''}${sym}${abs.toFixed(2)}`;
}

export default function EtsyFeeCalculator() {
  const [price, setPrice] = useState(25);
  const [shipping, setShipping] = useState(0);
  const [cost, setCost] = useState(8);
  const [shipCost, setShipCost] = useState(2);
  const [currency, setCurrency] = useState('GBP');
  const [offsiteAds, setOffsiteAds] = useState(false);
  const [qty, setQty] = useState(1);

  const sym = CURRENCIES[currency].symbol;
  const isUkEu = currency === 'GBP' || currency === 'EUR';
  const inputCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const r = useMemo(() => {
    const saleTotal = price + shipping;
    const listing = FEE_RATES.listing[currency];
    const transaction = saleTotal * FEE_RATES.transaction;
    const pp = FEE_RATES.payment[currency];
    const payment = saleTotal * pp.pct + pp.fixed;
    const regulatory = isUkEu ? saleTotal * FEE_RATES.regulatory : 0;
    const offsite = offsiteAds ? price * FEE_RATES.offsiteAds : 0;
    const totalFees = listing + transaction + payment + regulatory + offsite;
    const profit = price - cost - shipCost - totalFees;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    const feePct = saleTotal > 0 ? (totalFees / saleTotal) * 100 : 0;

    return { saleTotal, listing, transaction, payment, regulatory, offsite, totalFees, profit, margin, feePct };
  }, [price, shipping, cost, shipCost, currency, offsiteAds, isUkEu]);

  const feeRows = [
    { label: 'Listing fee', val: r.listing, note: `${sym}${FEE_RATES.listing[currency].toFixed(2)} flat` },
    { label: 'Transaction fee', val: r.transaction, note: '6.5% of sale' },
    { label: 'Payment processing', val: r.payment, note: `${(FEE_RATES.payment[currency].pct * 100).toFixed(0)}% + ${sym}${FEE_RATES.payment[currency].fixed.toFixed(2)}` },
    ...(r.regulatory > 0 ? [{ label: 'Regulatory fee', val: r.regulatory, note: '0.3%' }] : []),
    ...(r.offsite > 0 ? [{ label: 'Offsite ads', val: r.offsite, note: '15% of price' }] : []),
  ];

  const profitRows = [
    { label: 'Sale price', val: price, cls: '' },
    { label: 'Your costs', val: -(cost + shipCost), cls: '' },
    { label: 'Etsy fees', val: -r.totalFees, cls: '' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Selling price</label>
          <div className="flex gap-1.5">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">{sym}</span>
              <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-6`} />
            </div>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={selectCls} style={{ flex: '0 0 90px' }}>
              {Object.entries(CURRENCIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Shipping charge</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{sym}</span>
              <input type="number" min="0" step="0.01" value={shipping} onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                className={`${inputCls} w-full pl-5`} />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Quantity</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(parseInt(e.target.value) || 1)}
              className={`${inputCls} w-full`} />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Your costs</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Materials</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{sym}</span>
                <input type="number" min="0" step="0.01" value={cost} onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                  className={`${inputCls} w-full pl-5`} />
              </div>
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Shipping cost</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">{sym}</span>
                <input type="number" min="0" step="0.01" value={shipCost} onChange={(e) => setShipCost(parseFloat(e.target.value) || 0)}
                  className={`${inputCls} w-full pl-5`} />
              </div>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1">
          <input type="checkbox" checked={offsiteAds} onChange={(e) => setOffsiteAds(e.target.checked)}
            className="w-3.5 h-3.5 accent-accent cursor-pointer" />
          <span className="text-[13px] text-text-primary">Offsite ads (15%)</span>
        </label>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          Based on Etsy fees as of 2026. Rates may vary.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Profit per item</p>
            <p className={`text-2xl sm:text-3xl font-bold font-mono leading-tight ${r.profit >= 0 ? 'text-accent' : 'text-error'}`}>
              {fmt(r.profit, sym)}
            </p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Margin: <span className="font-mono">{r.margin.toFixed(1)}%</span></p>
            <p>Fees: <span className="font-mono">{fmt(r.totalFees, sym)}</span> ({r.feePct.toFixed(1)}%)</p>
            {qty > 1 && <p>Total profit ({qty}x): <span className="font-mono font-medium text-text-primary">{fmt(r.profit * qty, sym)}</span></p>}
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="space-y-1.5">
            <div className="flex rounded-full overflow-hidden h-3">
              {r.profit > 0 && <div className="bg-green-400 transition-all duration-500" style={{ width: `${(r.profit / r.saleTotal) * 100}%` }} />}
              <div className="bg-amber-400 transition-all duration-500" style={{ width: `${((cost + shipCost) / r.saleTotal) * 100}%` }} />
              <div className="bg-rose-400 transition-all duration-500" style={{ width: `${(r.totalFees / r.saleTotal) * 100}%` }} />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-green-400" />Profit</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-amber-400" />Your costs</span>
              <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-rose-400" />Etsy fees</span>
            </div>
          </div>
        </div>

        {/* Fee breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Etsy Fee Breakdown</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-16">Rate</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Per item</th>
                {qty > 1 && <th className="text-right py-1.5 pl-2 font-semibold text-text-primary">x{qty}</th>}
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className="py-1.5 px-2 text-right text-text-muted text-[12px]">{row.note}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(row.val, sym)}</td>
                  {qty > 1 && <td className="py-1.5 pl-2 text-right font-mono text-red-600">-{fmt(row.val * qty, sym)}</td>}
                </tr>
              ))}
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total Etsy fees</td>
                <td className="py-1.5 px-2 text-right font-mono text-red-600">-{fmt(r.totalFees, sym)}</td>
                {qty > 1 && <td className="py-1.5 pl-2 text-right font-mono text-red-600">-{fmt(r.totalFees * qty, sym)}</td>}
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
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Per item</th>
                {qty > 1 && <th className="text-right py-1.5 pl-2 font-semibold text-text-primary">x{qty}</th>}
              </tr>
            </thead>
            <tbody>
              {profitRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className={`py-1.5 px-2 text-right font-mono ${row.val < 0 ? 'text-red-600' : ''}`}>
                    {fmt(row.val, sym)}
                  </td>
                  {qty > 1 && (
                    <td className={`py-1.5 pl-2 text-right font-mono ${row.val < 0 ? 'text-red-600' : ''}`}>
                      {fmt(row.val * qty, sym)}
                    </td>
                  )}
                </tr>
              ))}
              <tr className={`border-t-2 border-border font-semibold ${r.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <td className="py-1.5 pr-2 text-text-primary">Your profit</td>
                <td className={`py-1.5 px-2 text-right font-mono ${r.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {fmt(r.profit, sym)}
                </td>
                {qty > 1 && (
                  <td className={`py-1.5 pl-2 text-right font-mono ${r.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {fmt(r.profit * qty, sym)}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Effective rate */}
        <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 flex items-center justify-between">
          <span className="text-[13px] text-text-secondary">Effective Etsy fee rate</span>
          <span className="text-[15px] font-semibold font-mono text-text-primary">{r.feePct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
