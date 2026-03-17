'use client';

import { useState, useMemo } from 'react';

const inputCls = 'px-2 py-1.5 border border-border rounded-[var(--radius-input)] text-text-primary text-[13px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted w-full';
const selectCls = 'px-2 py-1.5 border border-border rounded-[var(--radius-input)] text-text-primary text-[13px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted w-full';
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';

export default function WoodFinishingCalculator() {
  const [surfaceArea, setSurfaceArea] = useState(5);
  const [finishType, setFinishType] = useState('varnish');
  const [numCoats, setNumCoats] = useState(2);
  const [tinSize, setTinSize] = useState(1);
  const [pricePerLitre, setPricePerLitre] = useState(12);

  const finishOptions = {
    varnish: {
      name: 'Varnish',
      coverage: 12,
      defaultCoats: 3,
      dryingTime: '4-6 hours',
      description: 'Protective clear finish, water & scratch resistant',
    },
    oil: {
      name: 'Oil (Danish/Tung)',
      coverage: 15,
      defaultCoats: 2,
      dryingTime: '24 hours',
      description: 'Penetrating finish, enhances wood grain',
    },
    wax: {
      name: 'Wax',
      coverage: 20,
      defaultCoats: 2,
      dryingTime: '1 hour',
      description: 'Natural finish, food-safe on tables',
    },
    paint: {
      name: 'Paint',
      coverage: 10,
      defaultCoats: 2,
      dryingTime: '2-4 hours',
      description: 'Opaque finish, many colour options',
    },
    stain: {
      name: 'Stain',
      coverage: 15,
      defaultCoats: 1,
      dryingTime: '2-8 hours',
      description: 'Colour without opacity, often used before varnish',
    },
    lacquer: {
      name: 'Lacquer',
      coverage: 12,
      defaultCoats: 3,
      dryingTime: '15-30 mins',
      description: 'Fast-drying protective finish, professional look',
    },
  };

  const tinSizes = [0.5, 1, 2, 5, 10];

  const currentFinish = finishOptions[finishType];

  const calculation = useMemo(() => {
    const coverage = currentFinish.coverage;
    const litresPerCoat = surfaceArea / coverage;
    const totalLitres = litresPerCoat * numCoats;
    const coatsRequired = Math.ceil(totalLitres / tinSize);
    const actualTinsToBuy = coatsRequired;
    const totalCost = (actualTinsToBuy * tinSize * pricePerLitre).toFixed(2);
    const totalProductNeeded = totalLitres.toFixed(2);

    const dryingHours = parseInt(currentFinish.dryingTime.split('-')[1]) || 4;
    const timeBetweenCoats = dryingHours;
    const totalProjectHours = (timeBetweenCoats * (numCoats - 1)) + 2;

    return {
      coverage,
      litresPerCoat: litresPerCoat.toFixed(2),
      totalLitres: totalProductNeeded,
      tinsNeeded: actualTinsToBuy,
      totalCost,
      timeBetweenCoats,
      totalProjectHours: Math.ceil(totalProjectHours),
      dryingTime: currentFinish.dryingTime,
    };
  }, [surfaceArea, finishType, numCoats, tinSize, pricePerLitre, currentFinish]);

  return (
    <div className="space-y-3">
      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Project Surface</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary text-[13px] mb-1">Surface Area (m²)</label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={surfaceArea}
              onChange={(e) => setSurfaceArea(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
            <p className="text-text-muted text-[11px] mt-1">Example: 2m x 1.5m table = 3m² (one side)</p>
          </div>

          <div>
            <label className="block text-text-secondary font-medium mb-1">For rectangular surfaces</label>
            <div className="flex gap-2 text-[11px]">
              <input
                type="number"
                placeholder="Length"
                min="0"
                step="0.1"
                className="flex-1 px-2 py-1 border border-border rounded-[var(--radius-input)] text-text-primary"
                onChange={(e) => {
                  const len = parseFloat(e.target.value) || 0;
                  const width = (parseFloat(document.getElementById('width')?.value) || 0);
                  if (len > 0 && width > 0) setSurfaceArea(len * width);
                }}
              />
              <span className="text-text-secondary">x</span>
              <input
                id="width"
                type="number"
                placeholder="Width"
                min="0"
                step="0.1"
                className="flex-1 px-2 py-1 border border-border rounded-[var(--radius-input)] text-text-primary"
                onChange={(e) => {
                  const width = parseFloat(e.target.value) || 0;
                  const len = (parseFloat(document.querySelector('input[placeholder="Length"]')?.value) || 0);
                  if (len > 0 && width > 0) setSurfaceArea(len * width);
                }}
              />
              <span className="text-text-secondary">m²</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Finish Type</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary text-[13px] mb-1">Finish Type</label>
            <select value={finishType} onChange={(e) => setFinishType(e.target.value)} className={selectCls}>
              {Object.entries(finishOptions).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
            <p className="text-text-muted text-[11px] mt-1">{currentFinish.description}</p>
          </div>

          <div>
            <label className="block text-text-secondary text-[13px] mb-1">Number of Coats</label>
            <input
              type="number"
              min="1"
              max="5"
              value={numCoats}
              onChange={(e) => setNumCoats(parseInt(e.target.value) || 1)}
              className={inputCls}
            />
            <p className="text-text-muted text-[11px] mt-1">Typical: {currentFinish.defaultCoats} coats for this finish</p>
          </div>

          <div>
            <label className="block text-text-secondary text-[13px] mb-1">Tin Size (litres)</label>
            <select value={tinSize} onChange={(e) => setTinSize(parseFloat(e.target.value))} className={selectCls}>
              {tinSizes.map((size) => (
                <option key={size} value={size}>{size}L</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-[13px] mb-1">Price per Litre ({'\u00a3'})</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={pricePerLitre}
              onChange={(e) => setPricePerLitre(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className={`${cardCls} border-2 border-accent bg-accent-muted`}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Coverage &amp; Cost</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-[12px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-2 text-text-secondary">Surface Area</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">{surfaceArea}m²</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-secondary">Coverage Rate</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {calculation.coverage}m²/litre
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-secondary">Per Coat</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {calculation.litresPerCoat}L
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-secondary">Total Product Needed ({numCoats} coats)</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-accent">
                  {calculation.totalLitres}L
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-secondary">Tins to Buy ({tinSize}L each)</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-accent">
                  {calculation.tinsNeeded}
                </td>
              </tr>
              <tr className="bg-surface-hover">
                <td className="py-2 px-2 text-text-primary font-bold">Total Cost</td>
                <td className="text-right py-2 px-2 font-mono text-lg font-bold text-accent">
                  £{calculation.totalCost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <div>
            <p className="text-text-secondary text-[11px] mb-1">Drying Time Between Coats</p>
            <p className="font-mono font-bold text-text-primary">{calculation.dryingTime}</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px] mb-1">Estimated Total Project Time</p>
            <p className="font-mono font-bold text-accent">
              ~{calculation.totalProjectHours} hours (including drying)
            </p>
          </div>
          <p className="text-text-muted text-[10px] mt-3">
            <strong>Note:</strong> Allow extra time for sanding between coats. Final coat should cure for 24-48 hours before use.
          </p>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Application Tips</h2>
        <ul className="space-y-2 text-[12px] text-text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Always sand lightly between coats for better adhesion</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Ensure good ventilation during application</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Stir thoroughly before use, especially for varnish</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Keep rags/brushes in a sealed container while drying between coats</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Temperature should be 15-25°C for optimal drying</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
