'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-3 py-2 border border-[#e5e5e5] rounded-[8px] text-[13px] text-[#1a1a1a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb12]';
const selectCls = 'w-full px-3 py-2 border border-[#e5e5e5] rounded-[8px] text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb12] bg-white cursor-pointer';
const cardCls = 'bg-white border border-[#e5e5e5] rounded-[12px] p-4';

export default function CurtainFabricCalculator() {
  const [windowWidth, setWindowWidth] = useState(120);
  const [dropType, setDropType] = useState('floor');
  const [customDrop, setCustomDrop] = useState(0);
  const [headingType, setHeadingType] = useState('pencil');
  const [numWindows, setNumWindows] = useState(1);
  const [pricePerMetre, setPricePerMetre] = useState(15);

  const dropOptions = {
    floor: { cm: 220, label: 'To floor' },
    sill: { cm: 180, label: 'To windowsill' },
    below: { cm: 220, label: 'Below sill (custom)' },
  };

  const headingOptions = {
    pencil: { multiplier: 2.0, label: 'Pencil pleat (2x fullness)' },
    eyelet: { multiplier: 1.5, label: 'Eyelet (1.5x fullness)' },
    tab: { multiplier: 1.5, label: 'Tab top (1.5x fullness)' },
    wave: { multiplier: 2.0, label: 'Wave (2x fullness)' },
    pinch: { multiplier: 2.5, label: 'Pinch pleat (2.5x fullness)' },
  };

  const getDrop = () => {
    if (dropType === 'below') return customDrop;
    return dropOptions[dropType].cm;
  };

  const calculation = useMemo(() => {
    const dropCm = getDrop();
    const fullnessMultiplier = headingOptions[headingType].multiplier;
    const totalWidthPerWindow = windowWidth * fullnessMultiplier;
    const standardFabricWidth = 137; // Standard curtain fabric width in cm
    const widthsPerWindow = Math.ceil(totalWidthPerWindow / standardFabricWidth);
    const totalFabricLength = (widthsPerWindow * standardFabricWidth * numWindows) / 100;
    const totalDropLength = (dropCm * numWindows) / 100;
    const totalFabricNeeded = totalDropLength + (totalFabricLength / 100);

    const liningNeeded = (totalFabricNeeded * 0.95).toFixed(2);
    const fabricCost = (totalFabricNeeded * pricePerMetre).toFixed(2);

    return {
      fullnessMultiplier: fullnessMultiplier.toFixed(1),
      totalWidthPerWindow: totalWidthPerWindow.toFixed(1),
      widthsNeeded: widthsPerWindow,
      totalFabricNeeded: totalFabricNeeded.toFixed(2),
      liningNeeded,
      fabricCost,
      dropCm: dropCm.toFixed(0),
    };
  }, [windowWidth, dropType, customDrop, headingType, numWindows, pricePerMetre]);

  return (
    <div className="space-y-3">
      <div className={cardCls}>
        <h2 className="text-[#1a1a1a] font-heading text-base font-bold mb-3">Window Measurements</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-[#525252] font-medium mb-1">Window Width (cm)</label>
            <input
              type="number"
              min="20"
              step="1"
              value={windowWidth}
              onChange={(e) => setWindowWidth(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
            <p className="text-[#a3a3a3] text-[11px] mt-1">Measure inside the frame</p>
          </div>

          <div>
            <label className="block text-[#525252] font-medium mb-1">Drop Type</label>
            <select value={dropType} onChange={(e) => setDropType(e.target.value)} className={selectCls}>
              {Object.entries(dropOptions).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          {dropType === 'below' && (
            <div>
              <label className="block text-[#525252] font-medium mb-1">Custom Drop (cm)</label>
              <input
                type="number"
                min="100"
                step="1"
                value={customDrop}
                onChange={(e) => setCustomDrop(parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
          )}

          <div>
            <label className="block text-[#525252] font-medium mb-1">Heading Type</label>
            <select value={headingType} onChange={(e) => setHeadingType(e.target.value)} className={selectCls}>
              {Object.entries(headingOptions).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#525252] font-medium mb-1">Number of Windows</label>
            <input
              type="number"
              min="1"
              max="4"
              value={numWindows}
              onChange={(e) => setNumWindows(parseInt(e.target.value) || 1)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-[#525252] font-medium mb-1">Price per Metre ({'\u00a3'})</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={pricePerMetre}
              onChange={(e) => setPricePerMetre(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className={`${cardCls} border-2 border-[#2563eb] bg-[#2563eb12]`}>
        <h2 className="text-[#1a1a1a] font-heading text-base font-bold mb-3">Fabric Required</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left py-2 px-2 text-[#525252] font-medium">Measurement</th>
                <th className="text-right py-2 px-2 text-[#525252] font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Window Width</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#1a1a1a]">
                  {windowWidth}cm
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Drop Length</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#1a1a1a]">
                  {calculation.dropCm}cm
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Fullness Multiplier</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#1a1a1a]">
                  {calculation.fullnessMultiplier}x
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Total Width with Fullness</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#2563eb]">
                  {calculation.totalWidthPerWindow}cm
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Fabric Widths Needed (per window)</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#1a1a1a]">
                  {calculation.widthsNeeded}
                </td>
              </tr>
              <tr className="bg-[#f0f0f0]">
                <td className="py-2 px-2 text-[#1a1a1a] font-bold">Total Fabric to Buy</td>
                <td className="text-right py-2 px-2 font-mono text-xl font-bold text-[#2563eb]">
                  {calculation.totalFabricNeeded}m
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-[#1a1a1a]">Lining Fabric</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-[#1a1a1a]">
                  {calculation.liningNeeded}m
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
          <p className="text-[#525252] text-[11px] mb-2">Estimated Cost (Main Fabric)</p>
          <p className="font-mono text-2xl font-bold text-[#2563eb]">{'\u00a3'}{calculation.fabricCost}</p>
          <p className="text-[#a3a3a3] text-[11px] mt-2">
            Plus cost of lining at {'\u00a3'}/m and heading tape
          </p>
        </div>
      </div>
    </div>
  );
}
