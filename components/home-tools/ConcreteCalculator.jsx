'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ConcreteCalculator() {
  const [shapeType, setShapeType] = useState('rectangular'); // 'rectangular', 'circular', 'holes'
  const [length, setLength] = useState(3);
  const [width, setWidth] = useState(2);
  const [diameter, setDiameter] = useState(1);
  const [depth, setDepth] = useState(0.1);
  const [unit, setUnit] = useState('m');
  const [numHoles, setNumHoles] = useState(4);
  const [holeSize, setHoleSize] = useState(0.2);
  const [mixType, setMixType] = useState('general'); // 'general', 'custom'
  const [cementRatio, setCementRatio] = useState(1);
  const [sandRatio, setSandRatio] = useState(2);
  const [gravelRatio, setGravelRatio] = useState(3);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Calculate volume
  const volumeM3 = useMemo(() => {
    const conversion = unit === 'ft' ? 0.3048 : 1;
    const depthM = depth * conversion;

    if (shapeType === 'rectangular') {
      const lenM = length * conversion;
      const widM = width * conversion;
      return lenM * widM * depthM;
    } else if (shapeType === 'circular') {
      const diamM = diameter * conversion;
      const radiusM = diamM / 2;
      return Math.PI * radiusM * radiusM * depthM;
    } else if (shapeType === 'holes') {
      const diamM = holeSize * conversion;
      const radiusM = diamM / 2;
      const holeVolume = Math.PI * radiusM * radiusM * depthM;
      return holeVolume * numHoles;
    }
    return 0;
  }, [shapeType, length, width, diameter, depth, unit, numHoles, holeSize]);

  // Calculate bags of concrete
  const calculations = useMemo(() => {
    // Standard 20kg premix bag makes approximately 0.009m³ of concrete
    const bagsOf20kg = Math.ceil(volumeM3 / 0.009);

    // Weight per volume (concrete density ~2400 kg/m³)
    const totalWeight = volumeM3 * 2400;

    // Mix ratios (1:2:3 by volume means 1 part cement, 2 parts sand, 3 parts gravel)
    const totalParts = cementRatio + sandRatio + gravelRatio;
    const cementVolume = (volumeM3 * cementRatio) / totalParts;
    const sandVolume = (volumeM3 * sandRatio) / totalParts;
    const gravelVolume = (volumeM3 * gravelRatio) / totalParts;

    // Cement bags (assume 1 bag = 0.025m³, typical 50kg bag)
    const cementBags = Math.ceil(cementVolume / 0.025);

    // Sand and gravel volumes in litres for easier visualization
    const sandLitres = sandVolume * 1000;
    const gravelLitres = gravelVolume * 1000;

    // Cost estimates
    const costPremix = bagsOf20kg * 3.5; // £3.50 per 20kg bag
    const costCement = cementBags * 8; // £8 per 50kg bag
    const costSand = (sandVolume * 50); // £50 per m³
    const costGravel = (gravelVolume * 40); // £40 per m³
    const totalCostDIY = costCement + costSand + costGravel;
    const totalCostPremix = costPremix;

    return {
      volumeM3: volumeM3.toFixed(3),
      volumeLitres: (volumeM3 * 1000).toFixed(0),
      totalWeight: totalWeight.toFixed(0),
      bagsOf20kg,
      cementBags,
      cementVolume: cementVolume.toFixed(3),
      sandVolume: sandVolume.toFixed(3),
      gravelVolume: gravelVolume.toFixed(3),
      sandLitres: sandLitres.toFixed(0),
      gravelLitres: gravelLitres.toFixed(0),
      costPremix: totalCostPremix.toFixed(2),
      costDIY: totalCostDIY.toFixed(2),
    };
  }, [volumeM3, cementRatio, sandRatio, gravelRatio]);

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Shape Type</h2>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={shapeType === 'rectangular' ? 'primary' : 'secondary'}
            onClick={() => setShapeType('rectangular')}
            className="text-sm"
          >
            Slab (Rectangular)
          </Button>
          <Button
            variant={shapeType === 'circular' ? 'primary' : 'secondary'}
            onClick={() => setShapeType('circular')}
            className="text-sm"
          >
            Circular Pad
          </Button>
          <Button
            variant={shapeType === 'holes' ? 'primary' : 'secondary'}
            onClick={() => setShapeType('holes')}
            className="text-sm"
          >
            Post Holes
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Dimensions</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Unit</label>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="m">Metres</option>
              <option value="ft">Feet</option>
              <option value="cm">Centimetres</option>
            </Select>
          </div>

          {shapeType === 'rectangular' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Length ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
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
                  step="0.01"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  placeholder="Width"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Depth ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value) || 0)}
                  placeholder="Depth"
                />
              </div>
            </div>
          )}

          {shapeType === 'circular' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Diameter ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value) || 0)}
                  placeholder="Diameter"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Depth ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value) || 0)}
                  placeholder="Depth"
                />
              </div>
            </div>
          )}

          {shapeType === 'holes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Number of Holes
                </label>
                <Input
                  type="number"
                  min="1"
                  value={numHoles}
                  onChange={(e) => setNumHoles(parseInt(e.target.value) || 1)}
                  placeholder="Number of holes"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Hole Diameter ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={holeSize}
                  onChange={(e) => setHoleSize(parseFloat(e.target.value) || 0)}
                  placeholder="Hole diameter"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Depth ({unit})
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value) || 0)}
                  placeholder="Depth"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Concrete Mix</h2>
        <div className="mb-4">
          <label className="block text-text-secondary text-sm font-medium mb-2">Mix Type</label>
          <div className="flex gap-2">
            <Button
              variant={mixType === 'general' ? 'primary' : 'secondary'}
              onClick={() => setMixType('general')}
              className="text-sm"
            >
              General Purpose (1:2:3)
            </Button>
            <Button
              variant={mixType === 'custom' ? 'primary' : 'secondary'}
              onClick={() => setMixType('custom')}
              className="text-sm"
            >
              Custom Mix
            </Button>
          </div>
        </div>

        {mixType === 'general' && (
          <div className="bg-surface rounded p-3 space-y-2">
            <p className="text-text-primary font-medium">Standard Mix (1:2:3)</p>
            <p className="text-text-secondary text-sm">
              1 part cement : 2 parts sand : 3 parts aggregate
            </p>
            <p className="text-text-muted text-xs">Suitable for general slabs, paths, and foundations</p>
          </div>
        )}

        {mixType === 'custom' && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Cement</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={cementRatio}
                onChange={(e) => setCementRatio(parseFloat(e.target.value) || 0)}
                placeholder="Cement ratio"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Sand</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={sandRatio}
                onChange={(e) => setSandRatio(parseFloat(e.target.value) || 0)}
                placeholder="Sand ratio"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">Gravel</label>
              <Input
                type="number"
                step="0.1"
                min="0"
                value={gravelRatio}
                onChange={(e) => setGravelRatio(parseFloat(e.target.value) || 0)}
                placeholder="Gravel ratio"
              />
            </div>
          </div>
        )}
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Volume</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.volumeM3} m³
            </p>
            <p className="text-text-muted text-xs mt-1">
              ({calculations.volumeLitres} litres)
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Estimated Weight</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.totalWeight} kg
            </p>
            <p className="text-text-muted text-xs mt-1">
              (~{(parseFloat(calculations.totalWeight) / 1000).toFixed(1)} tonnes)
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">
            {mixType === 'general' ? 'Premix Bags Required' : 'DIY Mix Components'}
          </h3>

          {mixType === 'general' ? (
            <div className="space-y-3">
              <div className="flex justify-between bg-surface rounded p-3">
                <span className="text-text-primary font-bold">20kg Premix Bags</span>
                <span className="font-mono-num text-lg font-bold text-accent">
                  {calculations.bagsOf20kg}
                </span>
              </div>
              <p className="text-text-muted text-xs">
                Each 20kg bag makes ~0.009m³ of ready-to-use concrete (just add water)
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Cement (50kg bags)</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.cementBags}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Sand</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.sandLitres} L ({calculations.sandVolume} m³)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Gravel / Aggregate</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.gravelLitres} L ({calculations.gravelVolume} m³)
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <p className="text-text-muted text-xs">
                  Mix ratio: {cementRatio}:{sandRatio}:{gravelRatio} (cement:sand:gravel by volume)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface rounded p-4">
          <p className="text-text-secondary text-sm mb-3">Cost Estimate</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Premix Option</span>
              <span className="font-mono-num font-bold text-text-primary">
                {fmt(calculations.costPremix)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">DIY Mix Option</span>
              <span className="font-mono-num font-bold text-text-primary">
                {fmt(calculations.costDIY)}
              </span>
            </div>
            <div className="border-t border-border pt-2">
              <p className="text-text-muted text-xs">
                Estimated costs vary by supplier. DIY mix is usually cheaper but requires more labour.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-l-4 border-l-accent space-y-2">
        <h3 className="font-semibold text-text-primary">Concrete Tips</h3>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Standard concrete thickness: 100mm for paths, 150mm for driveways</li>
          <li>• Always add 10% extra for spillage and waste</li>
          <li>• Mix ratios: General (1:2:3), Strong (1:1.5:3), Lightweight (1:4:4)</li>
          <li>• Let concrete cure for at least 7 days before use</li>
          <li>• Premix bags are convenient for small projects; ready-mix trucks for large areas</li>
        </ul>
      </Card>
    </div>
  );
}
