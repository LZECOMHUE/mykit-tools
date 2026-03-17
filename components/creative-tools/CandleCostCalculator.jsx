'use client';

import { useState, useMemo } from 'react';

const WAX_TYPES = [
  { id: 'soy', label: 'Soy', price: 8.00 },
  { id: 'paraffin', label: 'Paraffin', price: 6.00 },
  { id: 'beeswax', label: 'Beeswax', price: 15.00 },
  { id: 'coconut', label: 'Coconut', price: 12.00 },
];

function fmt(val) {
  return `\u00a3${Math.abs(val).toFixed(2)}`;
}

export default function CandleCostCalculator() {
  const [waxType, setWaxType] = useState('soy');
  const [containerMl, setContainerMl] = useState(200);
  const [fragPct, setFragPct] = useState(8);
  const [fragCostPer100, setFragCostPer100] = useState(4.50);
  const [wickCost, setWickCost] = useState(0.50);
  const [containerCost, setContainerCost] = useState(1.20);
  const [labelCost, setLabelCost] = useState(0.30);
  const [labourMins, setLabourMins] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(12);
  const [markup, setMarkup] = useState(60);
  const [batch, setBatch] = useState(1);

  const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const wax = WAX_TYPES.find(w => w.id === waxType) || WAX_TYPES[0];

  const r = useMemo(() => {
    const waxKg = (containerMl * 0.9) / 1000;
    const waxCost = waxKg * wax.price;
    const fragWeight = (containerMl * fragPct) / 100;
    const fragCost = (fragWeight / 100) * fragCostPer100;
    const materialTotal = waxCost + fragCost + wickCost + containerCost + labelCost;
    const labour = (labourMins / 60) * hourlyRate;
    const totalCost = materialTotal + labour;
    const markupAmt = totalCost * (markup / 100);
    const sellingPrice = totalCost + markupAmt;
    const margin = sellingPrice > 0 ? (markupAmt / sellingPrice) * 100 : 0;

    // Batch
    const batchMaterials = materialTotal * batch;
    const batchLabour = labour * batch * 0.85; // slight efficiency gain
    const batchCost = batchMaterials + batchLabour;
    const batchRevenue = sellingPrice * batch;
    const batchProfit = batchRevenue - batchCost;

    return {
      waxCost, fragCost, materialTotal, labour, totalCost, markupAmt, sellingPrice, margin, waxKg,
      batchCost, batchRevenue, batchProfit,
      pctWax: (waxCost / (totalCost || 1)) * 100,
      pctFrag: (fragCost / (totalCost || 1)) * 100,
      pctComponents: ((wickCost + containerCost + labelCost) / (totalCost || 1)) * 100,
      pctLabour: (labour / (totalCost || 1)) * 100,
    };
  }, [waxType, containerMl, fragPct, fragCostPer100, wickCost, containerCost, labelCost, labourMins, hourlyRate, markup, batch, wax.price]);

  const breakdownRows = [
    { label: 'Wax', val: r.waxCost, note: `${(r.waxKg * 1000).toFixed(0)}g @ ${fmt(wax.price)}/kg` },
    { label: 'Fragrance oil', val: r.fragCost, note: `${fragPct}% load` },
    { label: 'Wick', val: wickCost },
    { label: 'Container', val: containerCost },
    { label: 'Label', val: labelCost },
    { label: 'Labour', val: r.labour, note: `${labourMins} mins` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Wax type</label>
          <select
            value={waxType}
            onChange={(e) => setWaxType(e.target.value)}
            className={selectCls}
          >
            {WAX_TYPES.map(w => (
              <option key={w.id} value={w.id}>{w.label} ({fmt(w.price)}/kg)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Container size (ml)</label>
          <input type="number" min="50" step="10" value={containerMl} onChange={(e) => setContainerMl(parseFloat(e.target.value) || 0)} className={inputCls} />
          <p className="text-[10px] text-text-muted mt-0.5">~{(containerMl * 0.9 / 1000).toFixed(2)} kg wax per candle</p>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Fragrance</p>
          <div className="flex items-center gap-2 mb-1">
            <label className="text-[13px] text-text-secondary">Load:</label>
            <span className="text-[13px] font-mono font-medium text-text-primary">{fragPct.toFixed(1)}%</span>
          </div>
          <input type="range" min="1" max="12" step="0.5" value={fragPct} onChange={(e) => setFragPct(parseFloat(e.target.value))}
            className="w-full accent-accent" />
          <p className="text-[10px] text-text-muted mt-0.5">Safe range: soy 8-12%, paraffin 6-10%, beeswax 4-6%</p>
          <div className="mt-2">
            <label className="text-[13px] text-text-secondary mb-1 block">Cost per 100ml ({'\u00a3'})</label>
            <input type="number" min="0" step="0.5" value={fragCostPer100} onChange={(e) => setFragCostPer100(parseFloat(e.target.value) || 0)} className={inputCls} />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Components</p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Wick</label>
              <input type="number" min="0" step="0.01" value={wickCost} onChange={(e) => setWickCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Container</label>
              <input type="number" min="0" step="0.01" value={containerCost} onChange={(e) => setContainerCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Label</label>
              <input type="number" min="0" step="0.01" value={labelCost} onChange={(e) => setLabelCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Labour and pricing</p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Mins</label>
              <input type="number" min="0" value={labourMins} onChange={(e) => setLabourMins(parseInt(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">{'\u00a3'}/hr</label>
              <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Markup %</label>
              <input type="number" min="0" value={markup} onChange={(e) => setMarkup(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <label className="text-[13px] text-text-secondary mb-1 block">Batch size</label>
          <input type="number" min="1" value={batch} onChange={(e) => setBatch(Math.max(1, parseInt(e.target.value) || 1))} className={inputCls} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Selling price per candle</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono leading-tight text-accent">{fmt(r.sellingPrice)}</p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Cost: <span className="font-mono">{fmt(r.totalCost)}</span></p>
            <p>Margin: <span className="font-mono">{r.margin.toFixed(1)}%</span></p>
            {batch > 1 && <p>Batch profit: <span className="font-mono font-medium text-green-700">{fmt(r.batchProfit)}</span></p>}
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="flex rounded-full overflow-hidden h-3 mb-2">
            <div className="bg-amber-400 transition-all duration-500" style={{ width: `${r.pctWax}%` }} />
            <div className="bg-purple-400 transition-all duration-500" style={{ width: `${r.pctFrag}%` }} />
            <div className="bg-blue-400 transition-all duration-500" style={{ width: `${r.pctComponents}%` }} />
            <div className="bg-green-400 transition-all duration-500" style={{ width: `${r.pctLabour}%` }} />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-amber-400" />Wax</span>
            <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-purple-400" />Fragrance</span>
            <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-blue-400" />Components</span>
            <span className="flex items-center gap-1 text-[11px] text-text-muted"><span className="w-2 h-2 rounded-full bg-green-400" />Labour</span>
          </div>
        </div>

        {/* Cost breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Cost Breakdown</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-20">Note</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              {breakdownRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className="py-1.5 px-2 text-right text-text-muted text-[11px]">{row.note || ''}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-text-primary">{fmt(row.val)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total cost</td>
                <td className="py-1.5 px-2 text-right font-mono text-text-primary">{fmt(r.totalCost)}</td>
              </tr>
              <tr className="font-semibold bg-accent-muted">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Selling price ({markup}% markup)</td>
                <td className="py-1.5 px-2 text-right font-mono text-accent">{fmt(r.sellingPrice)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Batch summary */}
        {batch > 1 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">Batch of {batch} candles</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Total cost</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchCost)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Revenue ({batch} x {fmt(r.sellingPrice)})</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchRevenue)}</td>
                </tr>
                <tr className="font-semibold bg-green-50">
                  <td className="py-1.5 text-green-800">Profit</td>
                  <td className="py-1.5 text-right font-mono text-green-700">{fmt(r.batchProfit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
