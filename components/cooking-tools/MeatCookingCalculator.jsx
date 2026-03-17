'use client';

import { useState, useMemo } from 'react';

// Comprehensive meat cooking data
// ovenC: oven temperature in Celsius
// internalC: target internal temperature in Celsius
// minsBase: base time in minutes (for the first kg or flat items)
// minsPerKg: additional minutes per kg of weight
// restMins: resting time in minutes
const MEAT_DATA = {
  chicken: {
    label: 'Chicken',
    cuts: {
      whole: { label: 'Whole', ovenC: 190, internalC: 75, minsBase: 20, minsPerKg: 45, restMins: 15, tip: 'Place breast-side up. Juices should run clear when pierced between leg and body.' },
      breast: { label: 'Breast (boneless)', ovenC: 200, internalC: 75, minsBase: 25, minsPerKg: 0, restMins: 5, tip: 'Cover loosely with foil to prevent drying out. Rest before slicing.' },
      thighs: { label: 'Thighs (bone-in)', ovenC: 200, internalC: 75, minsBase: 35, minsPerKg: 0, restMins: 5, tip: 'Skin-side up for crispy skin. Internal temp should reach 75°C.' },
      drumsticks: { label: 'Drumsticks', ovenC: 200, internalC: 75, minsBase: 35, minsPerKg: 0, restMins: 5, tip: 'Turn halfway through cooking for even browning.' },
      wings: { label: 'Wings', ovenC: 220, internalC: 75, minsBase: 25, minsPerKg: 0, restMins: 5, tip: 'High heat gives crispy skin. Toss in sauce after cooking.' },
    },
  },
  beef: {
    label: 'Beef',
    cuts: {
      roast_rare: { label: 'Roasting Joint (Rare)', ovenC: 220, ovenCReduce: 170, internalC: 52, minsBase: 15, minsPerKg: 20, restMins: 20, tip: 'Sear at 220°C for 15 mins, then reduce to 170°C. Pink and juicy centre.' },
      roast_medium: { label: 'Roasting Joint (Medium)', ovenC: 220, ovenCReduce: 170, internalC: 60, minsBase: 15, minsPerKg: 25, restMins: 20, tip: 'Sear at 220°C for 15 mins, then reduce to 170°C. Pink centre with browned edges.' },
      roast_well: { label: 'Roasting Joint (Well Done)', ovenC: 220, ovenCReduce: 170, internalC: 72, minsBase: 15, minsPerKg: 30, restMins: 20, tip: 'Sear at 220°C for 15 mins, then reduce to 170°C. Cooked through, no pink.' },
      steak: { label: 'Steak (pan/griddle)', ovenC: null, internalC: 60, minsBase: 8, minsPerKg: 0, restMins: 5, tip: 'Hot pan, 3-4 mins per side for medium. Let rest on a warm plate.' },
      mince: { label: 'Mince (bolognese/chilli)', ovenC: null, internalC: 75, minsBase: 30, minsPerKg: 0, restMins: 0, tip: 'Brown mince first, then simmer with sauce for at least 30 minutes.' },
    },
  },
  pork: {
    label: 'Pork',
    cuts: {
      roast: { label: 'Roasting Joint', ovenC: 220, ovenCReduce: 180, internalC: 68, minsBase: 30, minsPerKg: 35, restMins: 20, tip: 'Score the skin and rub with salt for crackling. Start at 220°C for 30 mins, then 180°C.' },
      chops: { label: 'Chops', ovenC: 200, internalC: 63, minsBase: 25, minsPerKg: 0, restMins: 5, tip: 'Sear in a hot pan first, then finish in oven. Should be slightly pink inside.' },
      belly: { label: 'Belly', ovenC: 220, ovenCReduce: 160, internalC: 75, minsBase: 30, minsPerKg: 60, restMins: 15, tip: 'Low and slow after initial blast. Skin should be crispy, meat should be tender.' },
      tenderloin: { label: 'Tenderloin / Fillet', ovenC: 200, internalC: 63, minsBase: 25, minsPerKg: 0, restMins: 10, tip: 'Sear all sides first, then roast. Very lean so do not overcook.' },
      sausages: { label: 'Sausages', ovenC: 190, internalC: 75, minsBase: 25, minsPerKg: 0, restMins: 0, tip: 'Turn once during cooking. Should be golden brown all over.' },
    },
  },
  lamb: {
    label: 'Lamb',
    cuts: {
      leg_rare: { label: 'Leg (Rare/Pink)', ovenC: 220, ovenCReduce: 180, internalC: 55, minsBase: 20, minsPerKg: 25, restMins: 20, tip: 'Sear at 220°C for 20 mins, then reduce. Stud with garlic and rosemary.' },
      leg_medium: { label: 'Leg (Medium)', ovenC: 220, ovenCReduce: 180, internalC: 63, minsBase: 20, minsPerKg: 30, restMins: 20, tip: 'Sear at 220°C for 20 mins, then reduce. Pink in the centre.' },
      leg_well: { label: 'Leg (Well Done)', ovenC: 220, ovenCReduce: 180, internalC: 72, minsBase: 20, minsPerKg: 35, restMins: 20, tip: 'Sear at 220°C for 20 mins, then reduce. Cooked all the way through.' },
      shoulder: { label: 'Shoulder (slow roast)', ovenC: 160, internalC: 85, minsBase: 0, minsPerKg: 60, restMins: 20, tip: 'Low and slow. The meat should fall off the bone when done.' },
      chops: { label: 'Chops / Cutlets', ovenC: null, internalC: 63, minsBase: 10, minsPerKg: 0, restMins: 5, tip: 'Hot griddle or pan, 4-5 mins per side. Should be pink inside.' },
      rack: { label: 'Rack of Lamb', ovenC: 200, internalC: 60, minsBase: 25, minsPerKg: 0, restMins: 10, tip: 'Sear fat side down first, then roast. Cover bone tips with foil.' },
    },
  },
  turkey: {
    label: 'Turkey',
    cuts: {
      whole_small: { label: 'Whole (under 4kg)', ovenC: 190, internalC: 75, minsBase: 20, minsPerKg: 40, restMins: 30, tip: 'Cover breast with foil for first two-thirds of cooking. Remove foil to brown.' },
      whole_large: { label: 'Whole (4kg+)', ovenC: 180, internalC: 75, minsBase: 30, minsPerKg: 35, restMins: 45, tip: 'Calculate time carefully. Baste every 30-40 mins. Cover with foil and rest well.' },
      breast: { label: 'Breast Joint (boneless)', ovenC: 190, internalC: 75, minsBase: 20, minsPerKg: 30, restMins: 15, tip: 'Cover loosely with foil. Baste occasionally to keep moist.' },
      crown: { label: 'Crown', ovenC: 190, internalC: 75, minsBase: 20, minsPerKg: 35, restMins: 30, tip: 'Cover with butter and foil. Remove foil for last 30 mins to brown.' },
    },
  },
};

function toF(c) { return Math.round(c * 9 / 5 + 32); }

function formatTime(mins) {
  if (mins < 60) return `${mins} mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} hr${h > 1 ? 's' : ''}`;
  return `${h} hr${h > 1 ? 's' : ''} ${m} mins`;
}

export default function MeatCookingCalculator() {
  const [meatType, setMeatType] = useState('chicken');
  const [cut, setCut] = useState('whole');
  const [weightKg, setWeightKg] = useState(1.5);
  const [unit, setUnit] = useState('kg');

  const meat = MEAT_DATA[meatType];
  const cuts = Object.entries(meat.cuts);
  const validCut = meat.cuts[cut] ? cut : cuts[0][0];
  const data = meat.cuts[validCut];

  // Weight-dependent cuts (roasts, whole birds) vs flat items (steaks, chops)
  const isWeightBased = data.minsPerKg > 0;
  const effectiveKg = unit === 'lbs' ? weightKg * 0.453592 : weightKg;

  const r = useMemo(() => {
    const cookMins = isWeightBased
      ? Math.ceil(data.minsBase + effectiveKg * data.minsPerKg)
      : data.minsBase;
    const totalMins = cookMins + data.restMins;
    return { cookMins, totalMins };
  }, [data, effectiveKg, isWeightBased]);

  const selectCls = "w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer";
  const inputCls = "w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono";

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Meat</label>
            <select value={meatType} onChange={(e) => { setMeatType(e.target.value); setCut(Object.keys(MEAT_DATA[e.target.value].cuts)[0]); }} className={selectCls}>
              {Object.entries(MEAT_DATA).map(([key, m]) => (
                <option key={key} value={key}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-text-primary mb-1.5">Cut / Style</label>
            <select value={validCut} onChange={(e) => setCut(e.target.value)} className={selectCls}>
              {cuts.map(([key, c]) => (
                <option key={key} value={key}>{c.label}</option>
              ))}
            </select>
          </div>
          {isWeightBased && (
            <>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Weight</label>
                <input type="number" min="0.1" step="0.1" value={weightKg} onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className={selectCls}>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-5 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          {meat.label} - {data.label}
          {isWeightBased && <span className="text-text-muted font-normal text-sm ml-2">({weightKg} {unit})</span>}
        </h3>

        {/* Oven temperature - the big one */}
        {data.ovenC && (
          <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4">
            <p className="text-sm font-medium text-amber-800 mb-1">Oven Temperature</p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-mono font-bold text-amber-700">{data.ovenC}°C</p>
              <p className="text-lg font-mono text-amber-600">/ {toF(data.ovenC)}°F</p>
              <p className="text-sm text-amber-600">/ Gas {Math.round((data.ovenC - 120) / 14)}</p>
            </div>
            {data.ovenCReduce && (
              <p className="text-sm text-amber-700 mt-2">
                Then reduce to <span className="font-mono font-semibold">{data.ovenCReduce}°C</span> / <span className="font-mono">{toF(data.ovenCReduce)}°F</span> after initial searing
              </p>
            )}
          </div>
        )}

        {!data.ovenC && (
          <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4">
            <p className="text-sm font-medium text-amber-800 mb-1">Cooking Method</p>
            <p className="text-lg font-semibold text-amber-700">Pan / Griddle (hob)</p>
          </div>
        )}

        {/* Timing cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-xs text-text-secondary mb-1">Cooking Time</p>
            <p className="text-xl font-mono font-bold text-accent">{formatTime(r.cookMins)}</p>
          </div>
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-xs text-text-secondary mb-1">Rest Time</p>
            <p className="text-xl font-mono font-bold text-text-primary">{formatTime(data.restMins)}</p>
          </div>
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-xs text-text-secondary mb-1">Total Time</p>
            <p className="text-xl font-mono font-bold text-accent">{formatTime(r.totalMins)}</p>
          </div>
        </div>

        {/* Internal temperature */}
        <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-blue-800 mb-1">Internal Temperature (Doneness)</p>
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-mono font-bold text-blue-700">{data.internalC}°C</p>
            <p className="text-lg font-mono text-blue-600">/ {toF(data.internalC)}°F</p>
          </div>
          <p className="text-sm text-blue-700 mt-1">Use a meat thermometer in the thickest part, away from bone</p>
        </div>

        {/* Tip */}
        {data.tip && (
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Tip: </span>{data.tip}
            </p>
          </div>
        )}

        {data.restMins > 0 && (
          <p className="text-xs text-text-muted">
            Resting lets juices redistribute through the meat. Cover loosely with foil and rest on a warm plate.
          </p>
        )}
      </div>

      {/* Quick reference table */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-5">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-3">
          {meat.label} Quick Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-2 pr-3 font-semibold text-text-primary">Cut</th>
                <th className="text-right py-2 px-2 font-semibold text-text-primary">Oven</th>
                <th className="text-right py-2 px-2 font-semibold text-text-primary">Internal</th>
                <th className="text-right py-2 px-2 font-semibold text-text-primary">Time</th>
              </tr>
            </thead>
            <tbody>
              {cuts.map(([key, c]) => {
                const t = isWeightBased && c.minsPerKg > 0
                  ? formatTime(Math.ceil(c.minsBase + effectiveKg * c.minsPerKg))
                  : formatTime(c.minsBase);
                return (
                  <tr key={key} className={`border-b border-border/50 ${key === validCut ? 'bg-accent-muted' : ''}`}>
                    <td className="py-2 pr-3 text-text-secondary">{c.label}</td>
                    <td className="py-2 px-2 text-right font-mono text-text-primary">
                      {c.ovenC ? `${c.ovenC}°C` : 'Pan'}
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-text-primary">{c.internalC}°C</td>
                    <td className="py-2 px-2 text-right font-mono text-text-primary">{t}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
