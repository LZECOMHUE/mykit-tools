'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const ROLL_PRESETS = {
  standard: { name: 'Standard UK (10.05m × 0.53m)', length: 10.05, width: 0.53 },
  wide: { name: 'Wide UK (10.05m × 1.06m)', length: 10.05, width: 1.06 },
};

export default function WallpaperCalculator() {
  const [dimensions, setDimensions] = useState({
    type: 'perimeter', // 'perimeter' or 'length-width'
    perimeter: 12,
    length: 4,
    width: 3,
    height: 2.4,
    unit: 'm',
  });
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [rollSize, setRollSize] = useState({
    preset: 'standard',
    customLength: 10.05,
    customWidth: 0.53,
    useCustom: false,
  });
  const [patternRepeat, setPatternRepeat] = useState(0); // in cm
  const [pricePerRoll, setPricePerRoll] = useState(12);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get current roll size
  const getCurrentRoll = () => {
    if (rollSize.useCustom) {
      return {
        length: rollSize.customLength,
        width: rollSize.customWidth,
      };
    }
    return ROLL_PRESETS[rollSize.preset] || ROLL_PRESETS.standard;
  };

  // Calculate perimeter in metres
  const perimeterMetres = useMemo(() => {
    const conversion = dimensions.unit === 'ft' ? 0.3048 : 1;
    if (dimensions.type === 'perimeter') {
      return dimensions.perimeter * conversion;
    } else {
      return 2 * (dimensions.length * conversion + dimensions.width * conversion);
    }
  }, [dimensions]);

  // Calculate wall height in metres
  const heightMetres = useMemo(() => {
    const conversion = dimensions.unit === 'ft' ? 0.3048 : 1;
    return dimensions.height * conversion;
  }, [dimensions]);

  // Deduct for doors and windows
  const deductedHeight = useMemo(() => {
    const doorArea = doors * 2; // standard 2m doors
    const windowArea = windows * 1.5; // standard 1.5m windows
    const deductedMetres = (doorArea + windowArea) / heightMetres;
    return Math.max(0, deductedMetres);
  }, [doors, windows, heightMetres]);

  // Calculate wallpaper needed
  const calculations = useMemo(() => {
    const roll = getCurrentRoll();

    // Net perimeter to cover
    const netPerimeter = Math.max(0, perimeterMetres - deductedHeight);

    // Height to cover (add 10cm for trimming/overlap)
    const heightWithTrim = heightMetres + 0.1;

    // Strips needed
    const stripWidth = roll.width;
    const stripsNeeded = Math.ceil(netPerimeter / stripWidth);

    // Drops per strip (accounting for pattern repeat)
    let dropsPerStrip = 1;
    if (patternRepeat > 0) {
      // Add wastage for pattern matching
      const patternsInDrop = Math.ceil(heightWithTrim / (patternRepeat / 100));
      const dropHeight = patternsInDrop * (patternRepeat / 100);
      dropsPerStrip = Math.ceil(roll.length / dropHeight);
    } else {
      dropsPerStrip = Math.ceil(roll.length / heightWithTrim);
    }

    // Total drops needed
    const totalDropsNeeded = stripsNeeded;

    // Rolls needed
    const rollsNeeded = Math.ceil(totalDropsNeeded / dropsPerStrip);

    // Pattern waste percentage
    let patternWaste = 0;
    if (patternRepeat > 0) {
      const dropsUsed = totalDropsNeeded;
      const totalLength = dropsUsed * heightWithTrim;
      const materialNeeded = rollsNeeded * roll.length;
      patternWaste = ((materialNeeded - totalLength) / totalLength) * 100;
    }

    const totalCost = rollsNeeded * pricePerRoll;

    return {
      netPerimeter: netPerimeter.toFixed(2),
      heightWithTrim: heightWithTrim.toFixed(2),
      stripsNeeded,
      dropsPerRoll: dropsPerStrip,
      totalDropsNeeded,
      rollsNeeded,
      patternWaste: patternWaste.toFixed(1),
      totalCost,
    };
  }, [perimeterMetres, deductedHeight, heightMetres, patternRepeat, rollSize, pricePerRoll]);

  const roll = getCurrentRoll();
  const rollLabel = rollSize.useCustom
    ? `${rollSize.customLength.toFixed(2)}m × ${(rollSize.customWidth * 100).toFixed(0)}cm`
    : ROLL_PRESETS[rollSize.preset]?.name;

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Room Dimensions</h2>
        <div className="mb-4">
          <label className="block text-text-secondary text-sm font-medium mb-2">Measurement Type</label>
          <div className="flex gap-2">
            <Button
              variant={dimensions.type === 'perimeter' ? 'primary' : 'secondary'}
              onClick={() => setDimensions({ ...dimensions, type: 'perimeter' })}
              className="text-sm"
            >
              Perimeter
            </Button>
            <Button
              variant={dimensions.type === 'length-width' ? 'primary' : 'secondary'}
              onClick={() => setDimensions({ ...dimensions, type: 'length-width' })}
              className="text-sm"
            >
              Length & Width
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dimensions.type === 'perimeter' ? (
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Perimeter ({dimensions.unit})
              </label>
              <Input
                type="number"
                step="0.1"
                value={dimensions.perimeter}
                onChange={(e) => setDimensions({ ...dimensions, perimeter: parseFloat(e.target.value) || 0 })}
                placeholder="Perimeter"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Length ({dimensions.unit})
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({ ...dimensions, length: parseFloat(e.target.value) || 0 })}
                  placeholder="Length"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Width ({dimensions.unit})
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })}
                  placeholder="Width"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Height ({dimensions.unit})
            </label>
            <Input
              type="number"
              step="0.1"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })}
              placeholder="Height"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Unit</label>
            <Select
              value={dimensions.unit}
              onChange={(e) => setDimensions({ ...dimensions, unit: e.target.value })}
            >
              <option value="m">Metres</option>
              <option value="ft">Feet</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Doors</label>
            <Input
              type="number"
              min="0"
              value={doors}
              onChange={(e) => setDoors(parseInt(e.target.value) || 0)}
              placeholder="Number of doors"
            />
            <p className="text-text-muted text-xs mt-1">Standard: 2m height</p>
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Windows</label>
            <Input
              type="number"
              min="0"
              value={windows}
              onChange={(e) => setWindows(parseInt(e.target.value) || 0)}
              placeholder="Number of windows"
            />
            <p className="text-text-muted text-xs mt-1">Standard: 1.5m height</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Roll Size</h2>
        {!rollSize.useCustom && (
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap mb-4">
              {Object.entries(ROLL_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  variant={rollSize.preset === key ? 'primary' : 'secondary'}
                  onClick={() => setRollSize({ ...rollSize, preset: key })}
                  className="text-sm"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setRollSize({ ...rollSize, useCustom: true })}
              className="text-sm"
            >
              Custom Size
            </Button>
          </div>
        )}

        {rollSize.useCustom && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">Length (m)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={rollSize.customLength}
                  onChange={(e) => setRollSize({ ...rollSize, customLength: parseFloat(e.target.value) || 0 })}
                  placeholder="Length"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">Width (cm)</label>
                <Input
                  type="number"
                  step="1"
                  value={rollSize.customWidth * 100}
                  onChange={(e) =>
                    setRollSize({ ...rollSize, customWidth: parseFloat(e.target.value) / 100 || 0 })
                  }
                  placeholder="Width in cm"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setRollSize({ ...rollSize, useCustom: false })}
              className="text-sm"
            >
              Back to Presets
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Pattern & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Pattern Repeat (cm, 0 for plain)
            </label>
            <Input
              type="number"
              step="1"
              min="0"
              value={patternRepeat}
              onChange={(e) => setPatternRepeat(parseInt(e.target.value) || 0)}
              placeholder="Pattern repeat in cm"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Price Per Roll (£)</label>
            <Input
              type="number"
              step="0.01"
              value={pricePerRoll}
              onChange={(e) => setPricePerRoll(parseFloat(e.target.value) || 0)}
              placeholder="Price per roll"
            />
          </div>
        </div>
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Room Perimeter</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.netPerimeter} m
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Wall Height (with trim)</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.heightWithTrim} m
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Roll Size</p>
            <p className="font-mono-num text-sm font-bold text-text-primary">
              {rollLabel}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Drops Per Roll</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.dropsPerRoll}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">Roll Calculation</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total strips needed</span>
              <span className="font-mono-num font-bold text-text-primary">{calculations.stripsNeeded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Drops per roll</span>
              <span className="font-mono-num font-bold text-text-primary">{calculations.dropsPerRoll}</span>
            </div>
            {patternRepeat > 0 && (
              <div className="flex justify-between text-text-secondary">
                <span>Pattern waste</span>
                <span className="font-mono-num font-bold">{calculations.patternWaste}%</span>
              </div>
            )}
            <div className="flex justify-between bg-surface rounded p-3">
              <span className="text-text-primary font-bold">Rolls needed</span>
              <span className="font-mono-num text-lg font-bold text-accent">
                {calculations.rollsNeeded}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded p-4">
          <p className="text-text-secondary text-sm mb-2">Total Cost</p>
          <p className="font-mono-num text-3xl font-bold text-accent">{fmt(calculations.totalCost)}</p>
          <p className="text-text-muted text-xs mt-2">{calculations.rollsNeeded} rolls × {fmt(pricePerRoll)}</p>
        </div>
      </Card>
    </div>
  );
}
