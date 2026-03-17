'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function QuiltCalculator() {
  const [quiltSize, setQuiltSize] = useState('lap');
  const [customLength, setCustomLength] = useState(50);
  const [customWidth, setCustomWidth] = useState(65);
  const [blockSize, setBlockSize] = useState(6);
  const [numColours, setNumColours] = useState(4);
  const [borderWidth, setBorderWidth] = useState(4);
  const [pricePerMetre, setPricePerMetre] = useState(10);

  const sizes = {
    baby: { name: 'Baby (36x52")', length: 36, width: 52 },
    lap: { name: 'Lap (50x65")', length: 50, width: 65 },
    twin: { name: 'Twin (68x86")', length: 68, width: 86 },
    queen: { name: 'Queen (86x86")', length: 86, width: 86 },
    king: { name: 'King (104x92")', length: 104, width: 92 },
  };

  const currentSize = quiltSize === 'custom'
    ? { length: customLength, width: customWidth }
    : sizes[quiltSize];

  const calculation = useMemo(() => {
    const lengthInches = currentSize.length;
    const widthInches = currentSize.width;

    const lengthWithoutBorder = lengthInches - (borderWidth * 2);
    const widthWithoutBorder = widthInches - (borderWidth * 2);

    const rowsNeeded = Math.floor(lengthWithoutBorder / blockSize);
    const colsNeeded = Math.floor(widthWithoutBorder / blockSize);
    const totalBlocks = rowsNeeded * colsNeeded;
    const blocksPerColour = Math.ceil(totalBlocks / numColours);

    const inchesToMetres = 0.0254;
    const blockMetres = blockSize * inchesToMetres;

    const fabricPerBlock = (blockMetres * blockMetres * 1.2) * inchesToMetres * 10;
    const fabricPerColour = (fabricPerBlock * blocksPerColour).toFixed(2);

    const sashingWidth = 2;
    const horSashingLength = (lengthWithoutBorder + (colsNeeded + 1) * sashingWidth) * inchesToMetres;
    const vertSashingLength = (widthWithoutBorder + (rowsNeeded + 1) * sashingWidth) * inchesToMetres;
    const totalSashing = (horSashingLength + vertSashingLength).toFixed(2);

    const borderLength = lengthInches * inchesToMetres;
    const borderWidthM = borderWidth * inchesToMetres;
    const borderMetres = ((borderLength * 2) + (widthInches * inchesToMetres * 2)) * borderWidthM;
    const borderFabric = (borderMetres / 0.5).toFixed(2);

    const backingLength = lengthInches * inchesToMetres;
    const backingWidth = widthInches * inchesToMetres;
    const backingFabric = (backingLength * backingWidth / 0.9144).toFixed(2);

    const battingLength = lengthInches * inchesToMetres;
    const battingWidth = widthInches * inchesToMetres;
    const battingSize = `${(battingLength).toFixed(2)}m x ${(battingWidth).toFixed(2)}m`;

    const totalFabricCost = (
      (numColours * parseFloat(fabricPerColour)) +
      parseFloat(totalSashing) +
      parseFloat(borderFabric) +
      parseFloat(backingFabric)
    ) * pricePerMetre;

    return {
      rowsNeeded,
      colsNeeded,
      totalBlocks,
      blocksPerColour,
      fabricPerColour: parseFloat(fabricPerColour).toFixed(2),
      totalSashing,
      borderFabric,
      backingFabric,
      battingSize,
      totalFabricCost: totalFabricCost.toFixed(2),
    };
  }, [currentSize.length, currentSize.width, blockSize, numColours, borderWidth, pricePerMetre]);

  return (
    <div className="space-y-3">
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Quilt Specifications</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary font-medium mb-1">Quilt Size</label>
            <select className={selectCls} value={quiltSize} onChange={(e) => setQuiltSize(e.target.value)}>
              {Object.entries(sizes).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
              <option value="custom">Custom Size</option>
            </select>
          </div>

          {quiltSize === 'custom' && (
            <>
              <div>
                <label className="block text-text-secondary font-medium mb-1">Length (inches)</label>
                <input
                  className={inputCls}
                  type="number"
                  min="10"
                  value={customLength}
                  onChange={(e) => setCustomLength(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-text-secondary font-medium mb-1">Width (inches)</label>
                <input
                  className={inputCls}
                  type="number"
                  min="10"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 0)}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-text-secondary font-medium mb-1">Block Size (inches)</label>
            <input
              className={inputCls}
              type="number"
              min="2"
              step="0.5"
              value={blockSize}
              onChange={(e) => setBlockSize(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-text-secondary font-medium mb-1">Number of Colours</label>
            <input
              className={inputCls}
              type="number"
              min="1"
              max="12"
              value={numColours}
              onChange={(e) => setNumColours(parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <label className="block text-text-secondary font-medium mb-1">Border Width (inches)</label>
            <input
              className={inputCls}
              type="number"
              min="0"
              step="0.5"
              value={borderWidth}
              onChange={(e) => setBorderWidth(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-text-secondary font-medium mb-1">Price per Metre ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              min="0"
              step="0.5"
              value={pricePerMetre}
              onChange={(e) => setPricePerMetre(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 border-2 border-accent bg-accent-muted">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Block Layout</h2>
        <div className="grid grid-cols-3 gap-2 text-[13px]">
          <div>
            <p className="text-text-secondary text-[11px]">Rows</p>
            <p className="font-mono text-xl font-bold text-text-primary">{calculation.rowsNeeded}</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px]">Columns</p>
            <p className="font-mono text-xl font-bold text-text-primary">{calculation.colsNeeded}</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px]">Total Blocks</p>
            <p className="font-mono text-xl font-bold text-accent">{calculation.totalBlocks}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 border-2 border-accent bg-accent-muted">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Fabric Requirements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Component</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Metres Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 px-2 text-text-primary">Fabric per Colour ({numColours}x)</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {(parseFloat(calculation.fabricPerColour) * numColours).toFixed(2)}m
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-primary">Sashing (2" strips)</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {calculation.totalSashing}m
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-primary">Border ({borderWidth}")</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {calculation.borderFabric}m
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-text-primary">Backing Fabric</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                  {calculation.backingFabric}m
                </td>
              </tr>
              <tr className="bg-surface-hover">
                <td className="py-2 px-2 text-text-primary font-bold">Batting Size</td>
                <td className="text-right py-2 px-2 font-mono font-bold text-accent">
                  {calculation.battingSize}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-text-secondary text-[11px] mb-2">Total Estimated Cost</p>
          <p className="font-mono text-2xl font-bold text-accent">{'\u00a3'}{calculation.totalFabricCost}</p>
        </div>
      </div>
    </div>
  );
}
