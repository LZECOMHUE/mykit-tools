'use client';

import { useState, useMemo } from 'react';

const FILAMENT_TYPES = {
  PLA:    { price: 18, label: 'PLA' },
  ABS:    { price: 20, label: 'ABS' },
  PETG:   { price: 22, label: 'PETG' },
  TPU:    { price: 28, label: 'TPU' },
  Nylon:  { price: 35, label: 'Nylon' },
  ASA:    { price: 25, label: 'ASA' },
  Resin:  { price: 30, label: 'Resin (per L)' },
};

const PRINTER_PRESETS = [
  { id: 'ender3v3',      name: 'Creality Ender 3 V3',  price: 200,  wattage: 350 },
  { id: 'crealityK1',    name: 'Creality K1',          price: 350,  wattage: 350 },
  { id: 'prusaMK4',      name: 'Prusa i3 MK4',         price: 800,  wattage: 120 },
  { id: 'prusaXL',       name: 'Prusa XL',             price: 1800, wattage: 200 },
  { id: 'bambuA1Mini',   name: 'Bambu Lab A1 Mini',    price: 250,  wattage: 150 },
  { id: 'bambuP1S',      name: 'Bambu Lab P1S',        price: 600,  wattage: 350 },
  { id: 'bambuX1C',      name: 'Bambu Lab X1C',        price: 1200, wattage: 350 },
  { id: 'elegooMars4',   name: 'Elegoo Mars 4 (resin)', price: 200,  wattage: 50 },
  { id: 'elegooSaturn3', name: 'Elegoo Saturn 3 (resin)', price: 450, wattage: 60 },
  { id: 'anycubicPhoton', name: 'Anycubic Photon Mono (resin)', price: 250, wattage: 50 },
  { id: 'formlabsForm4', name: 'Formlabs Form 4 (resin)', price: 3500, wattage: 80 },
  { id: 'custom',        name: 'Custom printer',       price: 0,    wattage: 0 },
];

function fmt(val) {
  return `\u00a3${Math.abs(val).toFixed(2)}`;
}

export default function ThreeDPrintCostCalculator() {
  const [filament, setFilament] = useState('PLA');
  const [grams, setGrams] = useState(50);
  const [printHrs, setPrintHrs] = useState(2);
  const [printMins, setPrintMins] = useState(0);
  const [preset, setPreset] = useState('ender3v3');
  const [customPrice, setCustomPrice] = useState(300);
  const [customWatt, setCustomWatt] = useState(350);
  const [elecRate, setElecRate] = useState(0.28);
  const [lifespan, setLifespan] = useState(5000);
  const [failRate, setFailRate] = useState(10);
  const [postMins, setPostMins] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(12);
  const [markup, setMarkup] = useState(40);
  const [batch, setBatch] = useState(1);

  const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
  const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

  const p = PRINTER_PRESETS.find(x => x.id === preset) || PRINTER_PRESETS[0];
  const printerCost = preset === 'custom' ? customPrice : p.price;
  const printerWatt = preset === 'custom' ? customWatt : p.wattage;
  const totalPrintHrs = printHrs + printMins / 60;

  const r = useMemo(() => {
    const material = (grams / 1000) * (FILAMENT_TYPES[filament]?.price || 18);
    const electricity = (printerWatt / 1000) * totalPrintHrs * elecRate;
    const depreciation = lifespan > 0 ? (printerCost / lifespan) * totalPrintHrs : 0;
    const subtotal = material + electricity + depreciation;
    const failOverhead = subtotal * (failRate / 100);
    const labour = (postMins / 60) * hourlyRate;
    const totalCost = subtotal + failOverhead + labour;
    const sellingPrice = totalCost * (1 + markup / 100);
    const profit = sellingPrice - totalCost;

    // Batch: post-processing time per unit drops slightly
    const batchLabour = batch > 1 ? ((postMins * 0.7 * (batch - 1) + postMins) / 60) * hourlyRate : labour;
    const batchTotal = (subtotal + failOverhead) * batch + batchLabour;
    const batchUnitCost = batchTotal / batch;
    const batchUnitPrice = batchUnitCost * (1 + markup / 100);

    const costPerGram = grams > 0 ? totalCost / grams : 0;
    const costPerHour = totalPrintHrs > 0 ? totalCost / totalPrintHrs : 0;

    const total = totalCost || 1;
    return {
      material, electricity, depreciation, failOverhead, labour,
      totalCost, sellingPrice, profit,
      batchTotal, batchUnitCost, batchUnitPrice,
      costPerGram, costPerHour,
      pctMaterial: (material / total) * 100,
      pctElec: (electricity / total) * 100,
      pctDeprec: (depreciation / total) * 100,
      pctFail: (failOverhead / total) * 100,
      pctLabour: (labour / total) * 100,
    };
  }, [grams, filament, totalPrintHrs, printerWatt, printerCost, elecRate, lifespan, failRate, postMins, hourlyRate, markup, batch]);

  const unitPrice = batch > 1 ? r.batchUnitPrice : r.sellingPrice;
  const unitCost = batch > 1 ? r.batchUnitCost : r.totalCost;

  const breakdownRows = [
    { label: 'Material', val: r.material, pct: r.pctMaterial, color: 'bg-blue-400' },
    { label: 'Electricity', val: r.electricity, pct: r.pctElec, color: 'bg-yellow-400' },
    { label: 'Depreciation', val: r.depreciation, pct: r.pctDeprec, color: 'bg-purple-400' },
    { label: `Failure overhead (+${failRate}%)`, val: r.failOverhead, pct: r.pctFail, color: 'bg-rose-400' },
    { label: `Labour (${postMins} mins @ £${hourlyRate}/hr)`, val: r.labour, pct: r.pctLabour, color: 'bg-green-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Filament type</label>
          <select value={filament} onChange={(e) => setFilament(e.target.value)} className={selectCls}>
            {Object.entries(FILAMENT_TYPES).map(([k, v]) => (
              <option key={k} value={k}>{v.label} ({'\u00a3'}{v.price}/kg)</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[13px] font-medium text-text-primary mb-1 block">Filament used (grams)</label>
          <input type="number" min="0" step="1" value={grams} onChange={(e) => setGrams(parseFloat(e.target.value) || 0)} className={inputCls} />
          <p className="text-[10px] text-text-muted mt-0.5">Your slicer gives this number</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Print time (hrs)</label>
            <input type="number" min="0" value={printHrs} onChange={(e) => setPrintHrs(parseInt(e.target.value) || 0)} className={inputCls} />
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Minutes</label>
            <input type="number" min="0" max="59" value={printMins} onChange={(e) => setPrintMins(parseInt(e.target.value) || 0)} className={inputCls} />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Printer</p>
          <label className="text-[13px] text-text-secondary mb-1 block">Printer preset</label>
          <select value={preset} onChange={(e) => setPreset(e.target.value)} className={selectCls}>
            {PRINTER_PRESETS.map((pr) => (
              <option key={pr.id} value={pr.id}>
                {pr.name}{pr.price > 0 ? ` ({'\u00a3'}${pr.price}, ${pr.wattage}W)` : ''}
              </option>
            ))}
          </select>
        </div>

        {preset === 'custom' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Price ({'\u00a3'})</label>
              <input type="number" min="0" value={customPrice} onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Wattage</label>
              <input type="number" min="0" value={customWatt} onChange={(e) => setCustomWatt(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Elec. rate ({'\u00a3'}/kWh)</label>
            <input type="number" min="0" step="0.01" value={elecRate} onChange={(e) => setElecRate(parseFloat(e.target.value) || 0)} className={inputCls} />
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Lifespan (hrs)</label>
            <input type="number" min="1" value={lifespan} onChange={(e) => setLifespan(parseInt(e.target.value) || 1)} className={inputCls} />
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Labour and overheads</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Failure rate (%)</label>
              <input type="number" min="0" max="100" value={failRate} onChange={(e) => setFailRate(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Post-processing (mins)</label>
              <input type="number" min="0" value={postMins} onChange={(e) => setPostMins(parseInt(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Hourly rate ({'\u00a3'})</label>
              <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Markup (%)</label>
              <input type="number" min="0" value={markup} onChange={(e) => setMarkup(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <label className="text-[13px] text-text-secondary mb-1 block">Batch size (number of prints)</label>
          <input type="number" min="1" value={batch} onChange={(e) => setBatch(Math.max(1, parseInt(e.target.value) || 1))} className={inputCls} />
        </div>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          UK average electricity rate: 28p/kWh. Adjust for your tariff.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">{batch > 1 ? 'Selling price per unit' : 'Selling price'}</p>
            <p className="text-2xl sm:text-3xl font-bold font-mono leading-tight text-accent">
              {fmt(unitPrice)}
            </p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Cost: <span className="font-mono">{fmt(unitCost)}</span></p>
            <p>Profit: <span className="font-mono">{fmt(unitPrice - unitCost)}</span> ({markup}%)</p>
            {batch > 1 && <p>Batch total: <span className="font-mono font-medium text-text-primary">{fmt(r.batchTotal * (1 + markup / 100))}</span></p>}
          </div>
        </div>

        {/* Insight callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] px-4 py-2.5">
          <p className="text-[13px] text-amber-800">
            Most people only count material ({fmt(r.material)}). Your real cost is <span className="font-mono font-semibold">{fmt(unitCost)}</span>.
          </p>
        </div>

        {/* Breakdown bar */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <p className="text-[12px] font-medium text-text-primary mb-2">Where the money goes</p>
          <div className="flex rounded-full overflow-hidden h-3 mb-2">
            {breakdownRows.map((row) => (
              <div key={row.label} className={`${row.color} transition-all duration-500`} style={{ width: `${row.pct}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {breakdownRows.map((row) => (
              <span key={row.label} className="flex items-center gap-1 text-[11px] text-text-muted">
                <span className={`w-2 h-2 rounded-full ${row.color}`} />{row.label.split(' (')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Cost breakdown table */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Cost Breakdown</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-16">Share</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              {breakdownRows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{row.label}</td>
                  <td className="py-1.5 px-2 text-right text-text-muted text-[12px]">{row.pct.toFixed(0)}%</td>
                  <td className="py-1.5 px-2 text-right font-mono text-text-primary">{fmt(row.val)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-border font-semibold">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Total cost per print</td>
                <td className="py-1.5 px-2 text-right font-mono text-text-primary">{fmt(unitCost)}</td>
              </tr>
              <tr className="font-semibold bg-accent-muted">
                <td className="py-1.5 pr-2 text-text-primary" colSpan={2}>Selling price ({markup}% markup)</td>
                <td className="py-1.5 px-2 text-right font-mono text-accent">{fmt(unitPrice)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 border border-border">
            <span className="text-[12px] text-text-secondary block">Cost per gram</span>
            <span className="text-[15px] font-semibold font-mono text-text-primary">{fmt(r.costPerGram)}</span>
          </div>
          <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 border border-border">
            <span className="text-[12px] text-text-secondary block">Cost per print hour</span>
            <span className="text-[15px] font-semibold font-mono text-text-primary">{fmt(r.costPerHour)}</span>
          </div>
        </div>

        {/* Batch summary */}
        {batch > 1 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">Batch of {batch} prints</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Total production cost</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchTotal)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Cost per unit</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchUnitCost)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Revenue ({batch} x {fmt(r.batchUnitPrice)})</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.batchTotal * (1 + markup / 100))}</td>
                </tr>
                <tr className="font-semibold bg-green-50">
                  <td className="py-1.5 text-green-800">Batch profit</td>
                  <td className="py-1.5 text-right font-mono text-green-700">{fmt(r.batchTotal * (markup / 100))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
