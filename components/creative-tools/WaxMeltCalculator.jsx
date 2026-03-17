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

export default function WaxMeltCalculator() {
  const [waxType, setWaxType] = useState('soy');
  const [weightPerMelt, setWeightPerMelt] = useState(25);
  const [meltsPerPack, setMeltsPerPack] = useState(6);
  const [fragPct, setFragPct] = useState(8);
  const [fragCostPer100g, setFragCostPer100g] = useState(3.50);
  const [clamshellCost, setClamshellCost] = useState(0.80);
  const [labelCost, setLabelCost] = useState(0.25);
  const [labourMins, setLabourMins] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(15);
  const [markup, setMarkup] = useState(65);
  const [numPacks, setNumPacks] = useState(1);

  const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const wax = WAX_TYPES.find(w => w.id === waxType) || WAX_TYPES[0];

  const r = useMemo(() => {
    const totalWeightPerPack = weightPerMelt * meltsPerPack;

    // Per melt costs
    const waxCost = (weightPerMelt / 1000) * wax.price;
    const fragWeight = weightPerMelt * (fragPct / 100);
    const fragCost = (fragWeight / 100) * fragCostPer100g;
    const clamPerMelt = clamshellCost / meltsPerPack;
    const labelPerMelt = labelCost / meltsPerPack;
    const materialPerMelt = waxCost + fragCost + clamPerMelt + labelPerMelt;

    // Labour per pack then per melt
    const labourPerPack = (labourMins / 60) * hourlyRate;
    const labourPerMelt = labourPerPack / meltsPerPack;

    const totalPerMelt = materialPerMelt + labourPerMelt;
    const markupPerMelt = totalPerMelt * (markup / 100);
    const pricePerMelt = totalPerMelt + markupPerMelt;

    // Per pack
    const costPerPack = materialPerMelt * meltsPerPack + labourPerPack;
    const packMarkup = costPerPack * (markup / 100);
    const pricePerPack = costPerPack + packMarkup;
    const margin = pricePerPack > 0 ? (packMarkup / pricePerPack) * 100 : 0;

    // Batch
    const batchCost = costPerPack * numPacks + labourPerPack * numPacks * 0.85;
    const batchRevenue = pricePerPack * numPacks;
    const batchProfit = batchRevenue - batchCost;

    // Cost split percentages
    const totalCostPack = costPerPack || 1;
    const waxTotal = waxCost * meltsPerPack;
    const fragTotal = fragCost * meltsPerPack;

    return {
      waxCost, fragCost, clamPerMelt, labelPerMelt, labourPerMelt,
      totalPerMelt, markupPerMelt, pricePerMelt,
      costPerPack, packMarkup, pricePerPack, margin,
      labourPerPack, totalWeightPerPack,
      batchCost, batchRevenue, batchProfit,
      pctWax: (waxTotal / totalCostPack) * 100,
      pctFrag: (fragTotal / totalCostPack) * 100,
      pctComponents: ((clamshellCost + labelCost) / totalCostPack) * 100,
      pctLabour: (labourPerPack / totalCostPack) * 100,
    };
  }, [waxType, weightPerMelt, meltsPerPack, fragPct, fragCostPer100g, clamshellCost, labelCost, labourMins, hourlyRate, markup, numPacks, wax.price]);

  const breakdownRows = [
    { label: 'Wax', val: r.waxCost * meltsPerPack, note: `${(weightPerMelt * meltsPerPack)}g @ ${fmt(wax.price)}/kg` },
    { label: 'Fragrance oil', val: r.fragCost * meltsPerPack, note: `${fragPct}% load` },
    { label: 'Clamshell', val: clamshellCost },
    { label: 'Label', val: labelCost },
    { label: 'Labour', val: r.labourPerPack, note: `${labourMins} mins` },
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

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Weight per melt (g)</label>
            <input type="number" min="5" step="5" value={weightPerMelt} onChange={(e) => setWeightPerMelt(parseFloat(e.target.value) || 0)} className={inputCls} />
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Melts per clamshell</label>
            <input type="number" min="1" step="1" value={meltsPerPack} onChange={(e) => setMeltsPerPack(Math.max(1, parseInt(e.target.value) || 1))} className={inputCls} />
          </div>
        </div>
        <p className="text-[10px] text-text-muted">Total pack weight: {weightPerMelt * meltsPerPack}g ({((weightPerMelt * meltsPerPack) / 1000).toFixed(2)} kg)</p>

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
            <label className="text-[13px] text-text-secondary mb-1 block">Cost per 100g ({'\u00a3'})</label>
            <input type="number" min="0" step="0.5" value={fragCostPer100g} onChange={(e) => setFragCostPer100g(parseFloat(e.target.value) || 0)} className={inputCls} />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Components</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Clamshell</label>
              <input type="number" min="0" step="0.01" value={clamshellCost} onChange={(e) => setClamshellCost(parseFloat(e.target.value) || 0)} className={inputCls} />
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
          <label className="text-[13px] text-text-secondary mb-1 block">Batch size (packs)</label>
          <input type="number" min="1" value={numPacks} onChange={(e) => setNumPacks(Math.max(1, parseInt(e.target.value) || 1))} className={inputCls} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Selling price per pack ({meltsPerPack} melts)</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono leading-tight text-accent">{fmt(r.pricePerPack)}</p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Cost: <span className="font-mono">{fmt(r.costPerPack)}</span></p>
            <p>Margin: <span className="font-mono">{r.margin.toFixed(1)}%</span></p>
            <p>Per melt: <span className="font-mono">{fmt(r.pricePerMelt)}</span></p>
            {numPacks > 1 && <p>Batch profit: <span className="font-mono font-medium text-green-700">{fmt(r.batchProfit)}</span></p>}
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
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Cost per Pack ({meltsPerPack} melts)</th>
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
                <td className="py-1.5 px-2 text-right font-mono text-text-primary">{fmt(r.costPerPack)}</td>
              </tr>
              <tr className="font-semibold bg-accent-muted">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Selling price ({markup}% markup)</td>
                <td className="py-1.5 px-2 text-right font-mono text-accent">{fmt(r.pricePerPack)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Per melt summary */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-text-muted uppercase font-medium tracking-wide mb-1">Per individual melt</p>
              <div className="flex gap-4 text-[13px]">
                <span className="text-text-secondary">Cost: <span className="font-mono font-medium text-text-primary">{fmt(r.totalPerMelt)}</span></span>
                <span className="text-text-secondary">Price: <span className="font-mono font-medium text-accent">{fmt(r.pricePerMelt)}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Batch summary */}
        {numPacks > 1 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">Batch of {numPacks} packs</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Total cost</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchCost)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Revenue ({numPacks} x {fmt(r.pricePerPack)})</td>
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

        {/* Tips */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-[13px] font-medium text-text-primary mb-2">Wax melt pricing tips</p>
          <div className="text-[13px] text-text-secondary space-y-1.5">
            <p>Wax melts have lower material costs than candles but need attractive packaging to stand out at craft fairs and online.</p>
            <p>Clamshell moulds are the most popular format. Snap bars and hearts are premium formats that justify higher prices.</p>
            <p>Fragrance load is your biggest variable cost. Buy fragrance oils in bulk (500ml+) to bring per-unit costs down significantly.</p>
            <p>Batch pouring 20+ packs at once cuts your per-pack labour time by 30-40% compared to making them one at a time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
