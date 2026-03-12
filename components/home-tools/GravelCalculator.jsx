'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const GRAVEL_TYPES = [
  { name: 'Decorative Gravel', density: 1.5 },
  { name: 'Pea Gravel', density: 1.6 },
  { name: 'Slate Chippings', density: 1.5 },
  { name: 'MOT Type 1', density: 2.1 },
  { name: 'Sharp Sand', density: 1.6 },
  { name: 'Ballast', density: 1.8 },
];

const DEPTH_PRESETS = [
  { value: 25, label: '25mm (light coverage)' },
  { value: 50, label: '50mm (standard)' },
  { value: 75, label: '75mm (thick)' },
  { value: 100, label: '100mm (very thick)' },
];

export default function GravelCalculator() {
  const [areaType, setAreaType] = useState('dimensions'); // 'dimensions' or 'area'
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const [totalArea, setTotalArea] = useState(50);
  const [unit, setUnit] = useState('m');
  const [depth, setDepth] = useState(50); // in mm
  const [customDepth, setCustomDepth] = useState(false);
  const [gravelType, setGravelType] = useState('Pea Gravel');
  const [includeWastage, setIncludeWastage] = useState(true);
  const [pricePerTonne, setPricePerTonne] = useState(25);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get gravel density
  const gravelDensity = useMemo(() => {
    const gravel = GRAVEL_TYPES.find((g) => g.name === gravelType);
    return gravel ? gravel.density : 1.5;
  }, [gravelType]);

  // Calculate area
  const areaM2 = useMemo(() => {
    if (areaType === 'area') {
      return totalArea;
    }

    const conversion = unit === 'ft' ? 0.3048 : 1;
    const lenM = length * conversion;
    const widM = width * conversion;
    return lenM * widM;
  }, [areaType, length, width, totalArea, unit]);

  // Calculate volume and weight
  const calculations = useMemo(() => {
    const depthMetres = depth / 1000; // convert mm to m
    const volumeM3 = areaM2 * depthMetres;

    // Weight with density
    let weight = volumeM3 * gravelDensity;

    // Add wastage (10%)
    if (includeWastage) {
      weight = weight * 1.1;
    }

    // Bulk bags (0.85 tonnes each)
    const bulkBagsNeeded = Math.ceil(weight / 0.85);

    // Mini bags (25kg each)
    const miniBAGsNeeded = Math.ceil((weight * 1000) / 25);

    // Cost
    const totalCost = weight * pricePerTonne;

    return {
      volumeM3: volumeM3.toFixed(3),
      weight: weight.toFixed(2),
      bulkBagsNeeded,
      miniBagsNeeded: miniBAGsNeeded,
      totalCost,
      depthMetres: depthMetres.toFixed(3),
    };
  }, [areaM2, depth, gravelDensity, includeWastage, pricePerTonne]);

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Area to Cover</h2>
        <div className="mb-4">
          <label className="block text-text-secondary text-sm font-medium mb-2">Measurement Type</label>
          <div className="flex gap-2">
            <Button
              variant={areaType === 'dimensions' ? 'primary' : 'secondary'}
              onClick={() => setAreaType('dimensions')}
              className="text-sm"
            >
              Length × Width
            </Button>
            <Button
              variant={areaType === 'area' ? 'primary' : 'secondary'}
              onClick={() => setAreaType('area')}
              className="text-sm"
            >
              Total m²
            </Button>
          </div>
        </div>

        {areaType === 'dimensions' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Length ({unit})
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                placeholder="Length"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Width ({unit})
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                placeholder="Width"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Unit</label>
              <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="m">Metres</option>
                <option value="ft">Feet</option>
              </Select>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Total Area (m²)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              value={totalArea}
              onChange={(e) => setTotalArea(parseFloat(e.target.value) || 0)}
              placeholder="Total area in square metres"
            />
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Depth</h2>
        {!customDepth && (
          <>
            <div className="flex gap-2 flex-wrap mb-4">
              {DEPTH_PRESETS.map((preset) => (
                <Button
                  key={preset.value}
                  variant={depth === preset.value ? 'primary' : 'secondary'}
                  onClick={() => setDepth(preset.value)}
                  className="text-sm"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setCustomDepth(true)}
              className="text-sm"
            >
              Custom Depth
            </Button>
          </>
        )}

        {customDepth && (
          <div className="space-y-3">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Depth (mm)
              </label>
              <Input
                type="number"
                step="1"
                min="0"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value) || 0)}
                placeholder="Depth in millimetres"
              />
            </div>
            <Button
              variant="ghost"
              onClick={() => setCustomDepth(false)}
              className="text-sm"
            >
              Use Presets
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Gravel Type</h2>
        <Select value={gravelType} onChange={(e) => setGravelType(e.target.value)}>
          {GRAVEL_TYPES.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name} ({type.density} t/m³)
            </option>
          ))}
        </Select>
        <p className="text-text-muted text-xs mt-2">
          Density: <span className="font-mono-num">{gravelDensity}</span> tonnes per cubic metre
        </p>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Options & Pricing</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includeWastage}
              onChange={(e) => setIncludeWastage(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border border-border accent-accent"
            />
            <div>
              <p className="text-text-primary font-medium">Include 10% Wastage</p>
              <p className="text-text-muted text-xs">For spillage, settling, and levelling</p>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Tonne (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerTonne}
              onChange={(e) => setPricePerTonne(parseFloat(e.target.value) || 0)}
              placeholder="Price per tonne"
            />
          </div>
        </div>
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Area to Cover</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {areaM2.toFixed(2)} m²
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Depth</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {depth}mm
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Volume</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.volumeM3} m³
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Weight</p>
            <p className="font-mono-num text-2xl font-bold text-accent">
              {calculations.weight} tonnes
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">Quantities</h3>
          <div className="space-y-3">
            <div className="flex justify-between bg-surface rounded p-3">
              <span className="text-text-primary font-bold">Bulk Bags (0.85t each)</span>
              <span className="font-mono-num text-lg font-bold text-accent">
                {calculations.bulkBagsNeeded}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Mini Bags (25kg each)</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.miniBagsNeeded}
              </span>
            </div>
            {includeWastage && (
              <p className="text-text-muted text-xs mt-2">
                ✓ Includes 10% wastage allowance in weight calculations
              </p>
            )}
          </div>
        </div>

        {/* Visual Depth Representation */}
        <div className="border-t border-border pt-6 mb-6">
          <h3 className="text-text-primary font-heading text-sm font-bold mb-3">Depth Visualization</h3>
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <div
                className="bg-accent rounded-t"
                style={{
                  width: '100%',
                  height: Math.min(100, depth / 2) + 'px',
                }}
              ></div>
            </div>
            <p className="text-text-muted text-xs">
              {depth}mm = {calculations.depthMetres}m depth
            </p>
          </div>
        </div>

        <div className="bg-surface rounded p-4">
          <p className="text-text-secondary text-sm mb-2">Total Cost</p>
          <p className="font-mono-num text-3xl font-bold text-accent">{fmt(calculations.totalCost)}</p>
          <p className="text-text-muted text-xs mt-2">
            {calculations.weight} tonnes × {fmt(pricePerTonne)}/tonne
          </p>
        </div>
      </Card>

      <Card className="p-4 bg-amber-50 border-l-4 border-l-accent space-y-2">
        <h3 className="font-semibold text-text-primary">Gravel Tips</h3>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Standard depth is 50mm for pathways and driveways</li>
          <li>• Use 75-100mm for high-traffic areas</li>
          <li>• MOT Type 1 is ideal for stabilising base layers</li>
          <li>• Decorative gravel works best on top of landscape fabric</li>
        </ul>
      </Card>
    </div>
  );
}
