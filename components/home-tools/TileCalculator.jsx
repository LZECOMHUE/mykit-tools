'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const TILE_PRESETS = {
  small: { name: '300×300mm', width: 0.3, height: 0.3 },
  medium: { name: '450×450mm', width: 0.45, height: 0.45 },
  large: { name: '600×600mm', width: 0.6, height: 0.6 },
};

export default function TileCalculator() {
  const [roomDimensions, setRoomDimensions] = useState({
    length: 4,
    width: 3,
    unit: 'm', // 'm' or 'ft'
  });
  const [tileSize, setTileSize] = useState({
    preset: 'medium',
    customWidth: 0.45,
    customHeight: 0.45,
    useCustom: false,
  });
  const [wastagePercent, setWastagePercent] = useState(10);
  const [tilesPerBox, setTilesPerBox] = useState(10);
  const [priceOption, setPriceOption] = useState('per-tile'); // 'per-tile' or 'per-box'
  const [pricePerTile, setPricePerTile] = useState(1.5);
  const [pricePerBox, setPricePerBox] = useState(15);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Convert to metres
  const roomAreaMetres = useMemo(() => {
    const factor = roomDimensions.unit === 'ft' ? 0.3048 : 1;
    const lenM = roomDimensions.length * factor;
    const widM = roomDimensions.width * factor;
    return lenM * widM;
  }, [roomDimensions]);

  // Get tile dimensions
  const getCurrentTileSize = () => {
    if (tileSize.useCustom) {
      return {
        width: tileSize.customWidth,
        height: tileSize.customHeight,
      };
    }
    return TILE_PRESETS[tileSize.preset] || TILE_PRESETS.medium;
  };

  const tileArea = useMemo(() => {
    const tile = getCurrentTileSize();
    return tile.width * tile.height;
  }, [tileSize]);

  const calculations = useMemo(() => {
    const tilesWithoutWastage = Math.ceil(roomAreaMetres / tileArea);
    const wastageCount = Math.ceil(tilesWithoutWastage * (wastagePercent / 100));
    const totalTilesNeeded = tilesWithoutWastage + wastageCount;
    const boxesNeeded = Math.ceil(totalTilesNeeded / tilesPerBox);

    const costPerTileCalc = priceOption === 'per-tile' ? pricePerTile : pricePerBox / tilesPerBox;
    const totalCost = totalTilesNeeded * costPerTileCalc;
    const costByBox = boxesNeeded * (priceOption === 'per-box' ? pricePerBox : pricePerBox);

    return {
      floorArea: roomAreaMetres,
      tilesWithoutWastage,
      wastageCount,
      totalTilesNeeded,
      boxesNeeded,
      costPerTileCalc,
      totalCost,
      costByBox,
    };
  }, [roomAreaMetres, tileArea, wastagePercent, tilesPerBox, priceOption, pricePerTile, pricePerBox]);

  const tile = getCurrentTileSize();
  const tileSizeLabel = tileSize.useCustom
    ? `${(tile.width * 1000).toFixed(0)}×${(tile.height * 1000).toFixed(0)}mm`
    : TILE_PRESETS[tileSize.preset]?.name;

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Room Dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Length</label>
            <Input
              type="number"
              value={roomDimensions.length}
              onChange={(e) =>
                setRoomDimensions({ ...roomDimensions, length: parseFloat(e.target.value) || 0 })
              }
              placeholder="Length"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Width</label>
            <Input
              type="number"
              value={roomDimensions.width}
              onChange={(e) =>
                setRoomDimensions({ ...roomDimensions, width: parseFloat(e.target.value) || 0 })
              }
              placeholder="Width"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Unit</label>
            <Select
              value={roomDimensions.unit}
              onChange={(e) => setRoomDimensions({ ...roomDimensions, unit: e.target.value })}
            >
              <option value="m">Metres</option>
              <option value="ft">Feet</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Tile Size</h2>
        {!tileSize.useCustom && (
          <div className="mb-4">
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Preset Sizes
            </label>
            <div className="flex gap-3 flex-wrap mb-4">
              {Object.entries(TILE_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  variant={tileSize.preset === key ? 'primary' : 'secondary'}
                  onClick={() => setTileSize({ ...tileSize, preset: key })}
                  className="text-sm"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setTileSize({ ...tileSize, useCustom: true })}
              className="text-sm"
            >
              Enter Custom Size
            </Button>
          </div>
        )}

        {tileSize.useCustom && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Width (m)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={tileSize.customWidth}
                  onChange={(e) =>
                    setTileSize({ ...tileSize, customWidth: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Width"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-1">
                  Height (m)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={tileSize.customHeight}
                  onChange={(e) =>
                    setTileSize({ ...tileSize, customHeight: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="Height"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setTileSize({ ...tileSize, useCustom: false })}
              className="text-sm"
            >
              Back to Presets
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Coverage & Packaging</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Wastage (%)
            </label>
            <div className="flex gap-2 mb-3">
              {[5, 10, 15].map((val) => (
                <Button
                  key={val}
                  variant={wastagePercent === val ? 'primary' : 'secondary'}
                  onClick={() => setWastagePercent(val)}
                  className="text-sm"
                >
                  {val}%
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={wastagePercent}
              onChange={(e) => setWastagePercent(parseInt(e.target.value) || 0)}
              placeholder="Custom %"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Tiles Per Box
            </label>
            <Input
              type="number"
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(parseInt(e.target.value) || 1)}
              placeholder="Tiles per box"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Pricing</h2>
        <div className="mb-4">
          <label className="block text-text-secondary text-sm font-medium mb-1">Price Type</label>
          <div className="flex gap-3">
            <Button
              variant={priceOption === 'per-tile' ? 'primary' : 'secondary'}
              onClick={() => setPriceOption('per-tile')}
              className="text-sm"
            >
              Per Tile
            </Button>
            <Button
              variant={priceOption === 'per-box' ? 'primary' : 'secondary'}
              onClick={() => setPriceOption('per-box')}
              className="text-sm"
            >
              Per Box
            </Button>
          </div>
        </div>

        {priceOption === 'per-tile' && (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Tile (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerTile}
              onChange={(e) => setPricePerTile(parseFloat(e.target.value) || 0)}
              placeholder="Price per tile"
            />
          </div>
        )}

        {priceOption === 'per-box' && (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Box (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerBox}
              onChange={(e) => setPricePerBox(parseFloat(e.target.value) || 0)}
              placeholder="Price per box"
            />
          </div>
        )}
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Floor Area</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.floorArea.toFixed(2)} m²
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Tile Size</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {tileSizeLabel}
            </p>
            <p className="text-text-muted text-xs mt-1">{tileArea.toFixed(4)} m² per tile</p>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">Tile Count</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Tiles needed (no wastage)</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.tilesWithoutWastage}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Wastage allowance ({wastagePercent}%)</span>
              <span className="font-mono-num font-bold text-text-primary">
                +{calculations.wastageCount}
              </span>
            </div>
            <div className="flex justify-between bg-surface rounded p-3">
              <span className="text-text-primary font-bold">Total tiles needed</span>
              <span className="font-mono-num text-lg font-bold text-accent">
                {calculations.totalTilesNeeded}
              </span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Boxes needed ({tilesPerBox} tiles/box)</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.boxesNeeded}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">Cost</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">
                {priceOption === 'per-tile' ? 'Price per tile' : 'Price per box'}
              </span>
              <span className="font-mono-num font-bold text-text-primary">
                {fmt(priceOption === 'per-tile' ? pricePerTile : pricePerBox)}
              </span>
            </div>
            <div className="flex justify-between bg-surface rounded p-3">
              <span className="text-text-primary font-bold">Total Cost</span>
              <span className="font-mono-num text-lg font-bold text-accent">
                {fmt(calculations.totalCost)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
