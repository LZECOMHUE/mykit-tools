'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const PRODUCTS = {
  'spring-feed': { name: 'Spring Feed', defaultRate: 35, unit: 'g/m2' },
  'autumn-feed': { name: 'Autumn Feed', defaultRate: 35, unit: 'g/m2' },
  'weed-feed': { name: 'Weed & Feed', defaultRate: 30, unit: 'g/m2' },
  'lawn-seed': { name: 'Grass Seed', defaultRate: 35, unit: 'g/m2' },
  'moss-killer': { name: 'Moss Killer', defaultRate: 20, unit: 'g/m2' },
};

export default function LawnFeedCalculator() {
  const [areaType, setAreaType] = useState('dimensions');
  const [length, setLength] = useState('10');
  const [width, setWidth] = useState('8');
  const [totalArea, setTotalArea] = useState('');
  const [productType, setProductType] = useState('spring-feed');
  const [appRate, setAppRate] = useState('');
  const [packCoverage, setPackCoverage] = useState('200');
  const [packPrice, setPackPrice] = useState('12');

  const results = useMemo(() => {
    const product = PRODUCTS[productType];
    const appRateNum = parseFloat(appRate) || product.defaultRate;
    const coverage = parseFloat(packCoverage) || 0;
    const price = parseFloat(packPrice) || 0;

    let area = 0;
    if (areaType === 'dimensions') {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      area = l * w;
    } else {
      area = parseFloat(totalArea) || 0;
    }

    if (area <= 0 || appRateNum <= 0 || coverage <= 0 || price <= 0) return null;

    const productNeeded = (area * appRateNum) / 1000; // grams to kg
    const packsNeeded = Math.ceil(area / coverage);
    const totalCost = packsNeeded * price;

    return {
      area: area.toFixed(1),
      productNeeded: productNeeded.toFixed(2),
      packsNeeded,
      totalCost: totalCost.toFixed(2),
      appRate: appRateNum,
      packCoverage: coverage,
    };
  }, [areaType, length, width, totalArea, productType, appRate, packCoverage, packPrice]);

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const product = PRODUCTS[productType];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left Panel */}
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Measure by</label>
            <select value={areaType} onChange={(e) => setAreaType(e.target.value)} className={selectCls}>
              <option value="dimensions">Length & Width</option>
              <option value="total">Total Area (m2)</option>
            </select>
          </div>

          {areaType === 'dimensions' ? (
            <>
              <div>
                <label className="block text-text-primary text-[13px] font-medium mb-1">Length (m)</label>
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} min="0" step="0.5" className={inputCls} />
              </div>

              <div>
                <label className="block text-text-primary text-[13px] font-medium mb-1">Width (m)</label>
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="0" step="0.5" className={inputCls} />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-text-primary text-[13px] font-medium mb-1">Total Area (m2)</label>
              <input type="number" value={totalArea} onChange={(e) => setTotalArea(e.target.value)} min="0" step="1" className={inputCls} />
            </div>
          )}

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Product Type</label>
            <select value={productType} onChange={(e) => setProductType(e.target.value)} className={selectCls}>
              {Object.entries(PRODUCTS).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Application Rate ({product.unit})</label>
            <input
              type="number"
              value={appRate}
              onChange={(e) => setAppRate(e.target.value)}
              min="0"
              step="5"
              placeholder={product.defaultRate}
              className={inputCls}
            />
            {appRate === '' && <p className="text-text-muted text-[11px] mt-1">Using {product.defaultRate} default</p>}
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Pack Coverage (m2)</label>
            <input type="number" value={packCoverage} onChange={(e) => setPackCoverage(e.target.value)} min="1" step="10" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Pack Price</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={packPrice} onChange={(e) => setPackPrice(e.target.value)} min="0" step="0.50" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {results && (
          <div className="bg-accent-muted border border-border rounded-lg p-6 space-y-5">
            <div>
              <h3 className="text-text-secondary text-[13px] font-medium mb-2">Total Cost</h3>
              <p className="font-mono text-5xl font-bold text-accent">{fmt(results.totalCost)}</p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Lawn Area</span>
                <span className="font-mono font-semibold text-text-primary">{results.area} m2</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Product Needed</span>
                <span className="font-mono font-semibold text-text-primary">{results.productNeeded} kg</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Packs to Buy</span>
                <span className="font-mono font-semibold text-text-primary">{results.packsNeeded}</span>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Application Rate</span>
                  <span className="font-mono">{results.appRate} {product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Per Pack Coverage</span>
                  <span className="font-mono">{results.packCoverage} m2</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Application Tip</p>
              <p>Always follow product instructions for best results. Apply spring feed in March-April, autumn feed in September-October.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
