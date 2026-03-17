'use client';

import { useState, useMemo } from 'react';

const CATEGORIES = [
  { name: 'Miniatures and Figurines', desc: 'Small 28mm gaming miniatures, action figures, display models', min: 3, max: 15, icon: '🎮' },
  { name: 'Phone Cases and Covers', desc: 'Custom phone cases, protective sleeves, grips', min: 8, max: 20, icon: '📱' },
  { name: 'Replacement Parts', desc: 'Drawer pulls, connectors, brackets, clips', min: 5, max: 25, icon: '🔧' },
  { name: 'Desk Organisers', desc: 'Pen holders, cable organisers, desk accessories', min: 8, max: 35, icon: '📦' },
  { name: 'Cosplay Props', desc: 'Armour pieces, weapons, costume accessories', min: 20, max: 100, icon: '🎭' },
  { name: 'Planters and Containers', desc: 'Decorative pots, succulent planters, vases', min: 10, max: 40, icon: '🌱' },
  { name: 'Nameplates and Signs', desc: 'Door signs, desk nameplates, custom signs', min: 5, max: 15, icon: '📛' },
  { name: 'Jewellery and Accessories', desc: 'Rings, pendants, brooches, earrings', min: 8, max: 30, icon: '💍' },
  { name: 'Functional Household', desc: 'Drawer dividers, light covers, wall mounts', min: 10, max: 45, icon: '🏠' },
  { name: 'Prototypes and Models', desc: 'Functional prototypes, scaled models', min: 15, max: 75, icon: '🏗' },
];

function fmt(val) {
  return `\u00a3${Math.abs(val).toFixed(2)}`;
}

export default function PrintPricingGuide() {
  const [materialCost, setMaterialCost] = useState(1.50);
  const [electricityCost, setElectricityCost] = useState(0.20);
  const [depreciationCost, setDepreciationCost] = useState(0.30);
  const [failureRate, setFailureRate] = useState(10);
  const [postProcessMins, setPostProcessMins] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(12);
  const [markup, setMarkup] = useState(50);
  const [platformFee, setPlatformFee] = useState(12.5);
  const [postage, setPostage] = useState(3.50);

  const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";

  const r = useMemo(() => {
    const machineSubtotal = materialCost + electricityCost + depreciationCost;
    const failOverhead = machineSubtotal * (failureRate / 100);
    const labour = (postProcessMins / 60) * hourlyRate;
    const totalCost = machineSubtotal + failOverhead + labour;
    const sellingPrice = totalCost * (1 + markup / 100);
    const fees = sellingPrice * (platformFee / 100);
    const netAfterFees = sellingPrice - fees;
    const profit = netAfterFees - totalCost - postage;

    return {
      machineSubtotal, failOverhead, labour, totalCost,
      sellingPrice, fees, netAfterFees, profit,
      profitPct: sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0,
    };
  }, [materialCost, electricityCost, depreciationCost, failureRate, postProcessMins, hourlyRate, markup, platformFee, postage]);

  return (
    <div className="space-y-6">
      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-3">
          <p className="text-[11px] text-text-muted uppercase font-medium tracking-wide">Print costs (from your slicer)</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Material ({'\u00a3'})</label>
              <input type="number" min="0" step="0.1" value={materialCost} onChange={(e) => setMaterialCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Electricity ({'\u00a3'})</label>
              <input type="number" min="0" step="0.01" value={electricityCost} onChange={(e) => setElectricityCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Depreciation ({'\u00a3'})</label>
              <input type="number" min="0" step="0.01" value={depreciationCost} onChange={(e) => setDepreciationCost(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Failure rate (%)</label>
              <input type="number" min="0" max="50" value={failureRate} onChange={(e) => setFailureRate(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
          <p className="text-[10px] text-text-muted">Use the <a href="/3d-print-cost-calculator" className="text-accent underline">3D Print Cost Calculator</a> to get these numbers</p>

          <div className="border-t border-border pt-3">
            <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Your labour</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[13px] text-text-secondary mb-1 block">Post-processing (mins)</label>
                <input type="number" min="0" value={postProcessMins} onChange={(e) => setPostProcessMins(parseInt(e.target.value) || 0)} className={inputCls} />
                <p className="text-[10px] text-text-muted mt-0.5">Sanding, supports, painting</p>
              </div>
              <div>
                <label className="text-[13px] text-text-secondary mb-1 block">Hourly rate ({'\u00a3'})</label>
                <input type="number" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} className={inputCls} />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-[11px] text-text-muted mb-2 uppercase font-medium tracking-wide">Selling</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[13px] text-text-secondary mb-1 block">Markup (%)</label>
                <input type="number" min="0" value={markup} onChange={(e) => setMarkup(parseFloat(e.target.value) || 0)} className={inputCls} />
              </div>
              <div>
                <label className="text-[13px] text-text-secondary mb-1 block">Platform fee (%)</label>
                <input type="number" min="0" max="30" step="0.5" value={platformFee} onChange={(e) => setPlatformFee(parseFloat(e.target.value) || 0)} className={inputCls} />
                <p className="text-[10px] text-text-muted mt-0.5">Etsy ~12.5%, eBay ~12.8%</p>
              </div>
            </div>
            <div className="mt-2">
              <label className="text-[13px] text-text-secondary mb-1 block">Postage cost ({'\u00a3'})</label>
              <input type="number" min="0" step="0.5" value={postage} onChange={(e) => setPostage(parseFloat(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
          {/* Hero */}
          <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] text-text-secondary">Minimum selling price</p>
              <p className="text-2xl sm:text-3xl font-bold font-mono leading-tight text-accent">{fmt(r.sellingPrice)}</p>
            </div>
            <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
              <p>Cost: <span className="font-mono">{fmt(r.totalCost)}</span></p>
              <p>Fees: <span className="font-mono">-{fmt(r.fees)}</span></p>
              <p>Postage: <span className="font-mono">-{fmt(postage)}</span></p>
              <p className={`font-medium ${r.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                Profit: <span className="font-mono">{fmt(r.profit)}</span>
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">Your Price Breakdown</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Machine costs (material + elec. + depreciation)</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.machineSubtotal)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Failure overhead (+{failureRate}%)</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.failOverhead)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Labour ({postProcessMins} mins @ {'\u00a3'}{hourlyRate}/hr)</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.labour)}</td>
                </tr>
                <tr className="border-t-2 border-border font-semibold">
                  <td className="py-1.5 text-text-primary">Total cost</td>
                  <td className="py-1.5 text-right font-mono">{fmt(r.totalCost)}</td>
                </tr>
                <tr className="font-semibold bg-accent-muted">
                  <td className="py-1.5 text-text-primary">Selling price ({markup}% markup)</td>
                  <td className="py-1.5 text-right font-mono text-accent">{fmt(r.sellingPrice)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Platform fees ({platformFee}%)</td>
                  <td className="py-1.5 text-right font-mono text-red-600">-{fmt(r.fees)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 text-text-secondary">Postage</td>
                  <td className="py-1.5 text-right font-mono text-red-600">-{fmt(postage)}</td>
                </tr>
                <tr className={`font-semibold ${r.profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <td className="py-1.5 text-text-primary">Your profit per sale</td>
                  <td className={`py-1.5 text-right font-mono ${r.profit >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmt(r.profit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Pricing Grid */}
      <div>
        <h2 className="font-heading font-bold text-xl text-text-primary mb-4">Market price ranges by category</h2>
        <p className="text-[13px] text-text-secondary mb-4">Typical selling prices on Etsy, eBay and craft marketplaces. Your price is compared against each category.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const inRange = r.sellingPrice >= cat.min && r.sellingPrice <= cat.max;
            const below = r.sellingPrice < cat.min;
            const above = r.sellingPrice > cat.max;
            const barMax = cat.max * 1.3;

            return (
              <div key={cat.name} className="border border-border rounded-[var(--radius-card)] p-4 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-heading font-bold text-text-primary">{cat.name}</p>
                    <p className="text-[11px] text-text-secondary">{cat.desc}</p>
                  </div>
                  <span className="text-xl ml-2">{cat.icon}</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] text-text-secondary">Market range</span>
                    <span className="font-mono text-[13px] font-semibold text-text-primary">{'\u00a3'}{cat.min} - {'\u00a3'}{cat.max}</span>
                  </div>

                  {/* Range bar */}
                  <div className="relative h-4 bg-surface rounded-full border border-border mb-2">
                    <div
                      className="absolute h-full bg-blue-200 rounded-full"
                      style={{ left: `${(cat.min / barMax) * 100}%`, width: `${((cat.max - cat.min) / barMax) * 100}%` }}
                    />
                    {/* Your price marker */}
                    <div
                      className="absolute top-0 h-full w-0.5 bg-accent"
                      style={{ left: `${Math.min((r.sellingPrice / barMax) * 100, 100)}%` }}
                      title={`Your price: ${fmt(r.sellingPrice)}`}
                    >
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-white" />
                    </div>
                  </div>

                  <div className={`rounded-[var(--radius-input)] px-2 py-1.5 text-[12px] ${
                    inRange ? 'bg-green-50 text-green-800 border border-green-200' :
                    below ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <span className="font-mono font-medium">{fmt(r.sellingPrice)}</span>
                    {' '}
                    {inRange && 'is within market range'}
                    {below && 'is below market (room to increase)'}
                    {above && 'is above market (premium positioning needed)'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <p className="text-[13px] font-medium text-text-primary mb-2">Pricing tips for 3D print sellers</p>
        <div className="text-[13px] text-text-secondary space-y-1.5">
          <p>Print time is machine time, not your labour. Only count the hands-on work: removing supports, sanding, painting, assembly and packing.</p>
          <p>Complex post-processing (multi-colour painting, acetone smoothing, assembly) justifies higher markups of 50-100%.</p>
          <p>Batch orders let you drop per-unit prices while keeping profits healthy since setup and post-processing time is shared.</p>
          <p>Premium materials (Nylon, TPU, resin) let you command higher prices in categories where strength or flexibility matters.</p>
        </div>
      </div>
    </div>
  );
}
