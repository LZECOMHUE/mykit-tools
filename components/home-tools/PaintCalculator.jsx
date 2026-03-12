'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PaintCalculator() {
  const [dimensions, setDimensions] = useState({
    length: 4,
    width: 3,
    height: 2.4,
    unit: 'm', // 'm' or 'ft'
  });
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(12); // m² per litre
  const [pricePerLitre, setPricePerLitre] = useState(8);
  const [tinOptions, setTinOptions] = useState([
    { size: 2.5, selected: true },
    { size: 5, selected: true },
  ]);

  // Convert feet to metres if needed
  const metreDimensions = useMemo(() => {
    const factor = dimensions.unit === 'ft' ? 0.3048 : 1;
    return {
      length: dimensions.length * factor,
      width: dimensions.width * factor,
      height: dimensions.height * factor,
    };
  }, [dimensions]);

  // Calculate areas
  const calculation = useMemo(() => {
    const { length, width, height } = metreDimensions;
    const perimeter = 2 * (length + width);
    const totalWallArea = perimeter * height;
    const doorArea = doors * 1.9;
    const windowArea = windows * 1.5;
    const paintableArea = totalWallArea - doorArea - windowArea;
    const litresNeeded = Math.ceil(paintableArea * coats / coverage);

    // Calculate tins needed
    const selectedTins = tinOptions.filter((t) => t.selected).sort((a, b) => b.size - a.size);
    let tinsNeeded = {};
    let remainingLitres = litresNeeded;

    selectedTins.forEach((tin) => {
      const count = Math.floor(remainingLitres / tin.size);
      if (count > 0) {
        tinsNeeded[tin.size] = count;
        remainingLitres -= count * tin.size;
      }
    });

    if (remainingLitres > 0 && selectedTins.length > 0) {
      const smallestTin = selectedTins[selectedTins.length - 1].size;
      tinsNeeded[smallestTin] = (tinsNeeded[smallestTin] || 0) + 1;
    }

    const totalCost = litresNeeded * pricePerLitre;

    return {
      totalWallArea: totalWallArea.toFixed(2),
      paintableArea: paintableArea.toFixed(2),
      litresNeeded,
      tinsNeeded,
      totalCost,
    };
  }, [metreDimensions, doors, windows, coats, coverage, pricePerLitre, tinOptions]);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleTinToggle = (size) => {
    setTinOptions((prev) =>
      prev.map((t) => (t.size === size ? { ...t, selected: !t.selected } : t))
    );
  };

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Room Dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Length</label>
            <Input
              type="number"
              value={dimensions.length}
              onChange={(e) =>
                setDimensions({ ...dimensions, length: parseFloat(e.target.value) || 0 })
              }
              placeholder="Length"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Width</label>
            <Input
              type="number"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })
              }
              placeholder="Width"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Height</label>
            <Input
              type="number"
              value={dimensions.height}
              onChange={(e) =>
                setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })
              }
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
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">
          Openings & Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Number of Doors
            </label>
            <Input
              type="number"
              min="0"
              value={doors}
              onChange={(e) => setDoors(parseInt(e.target.value) || 0)}
              placeholder="Doors"
            />
            <p className="text-text-muted text-xs mt-1">~1.9 m² each</p>
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Number of Windows
            </label>
            <Input
              type="number"
              min="0"
              value={windows}
              onChange={(e) => setWindows(parseInt(e.target.value) || 0)}
              placeholder="Windows"
            />
            <p className="text-text-muted text-xs mt-1">~1.5 m² each</p>
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Number of Coats
            </label>
            <Select value={coats} onChange={(e) => setCoats(parseInt(e.target.value))}>
              <option value="1">1 coat</option>
              <option value="2">2 coats</option>
              <option value="3">3 coats</option>
            </Select>
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Coverage (m² per litre)
            </label>
            <Input
              type="number"
              value={coverage}
              onChange={(e) => setCoverage(parseFloat(e.target.value) || 1)}
              placeholder="Coverage"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Paint Price</h2>
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Price per Litre (£)
          </label>
          <Input
            type="number"
            value={pricePerLitre}
            onChange={(e) => setPricePerLitre(parseFloat(e.target.value) || 0)}
            placeholder="Price per litre"
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Tin Sizes</h2>
        <div className="flex gap-3 flex-wrap mb-4">
          {tinOptions.map((tin) => (
            <Button
              key={tin.size}
              variant={tin.selected ? 'primary' : 'secondary'}
              onClick={() => handleTinToggle(tin.size)}
              className="text-sm"
            >
              {tin.size}L
            </Button>
          ))}
        </div>
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Wall Area</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculation.totalWallArea} m²
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Paintable Area</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculation.paintableArea} m²
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Litres Needed</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculation.litresNeeded}L
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Estimated Cost</p>
            <p className="font-mono-num text-2xl font-bold text-accent">
              {fmt(calculation.totalCost)}
            </p>
          </div>
        </div>

        {Object.keys(calculation.tinsNeeded).length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-text-secondary text-sm mb-4">Recommended Tins</p>
            <div className="space-y-2">
              {Object.entries(calculation.tinsNeeded).map(([size, count]) => (
                <div key={size} className="flex justify-between">
                  <span className="text-text-primary">{count}× {size}L tin{count > 1 ? 's' : ''}</span>
                  <span className="font-mono-num text-text-primary font-medium">
                    {fmt(parseFloat(size) * count * pricePerLitre)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
