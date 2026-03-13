"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function FlooringCalculator() {
  const [roomLength, setRoomLength] = useState("5");
  const [roomWidth, setRoomWidth] = useState("4");
  const [wastagePercent, setWastagePercent] = useState("10");
  const [packCoverage, setPackCoverage] = useState("2.2");
  const [pricePerPack, setPricePerPack] = useState("35");

  const length = parseFloat(roomLength) || 0;
  const width = parseFloat(roomWidth) || 0;
  const wastage = parseFloat(wastagePercent) || 0;
  const coverage = parseFloat(packCoverage) || 0;
  const price = parseFloat(pricePerPack) || 0;

  const isValidInput = length > 0 && width > 0 && coverage > 0;

  const roomArea = length * width;
  const wastedArea = roomArea * (wastage / 100);
  const totalArea = roomArea + wastedArea;
  const packsNeeded = Math.ceil(totalArea / coverage);
  const totalCost = packsNeeded * price;
  const costPerSqM = roomArea > 0 ? totalCost / roomArea : 0;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-primary mb-4">
            Room Dimensions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Room Length (metres)
              </label>
              <Input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                placeholder="Enter length"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Room Width (metres)
              </label>
              <Input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                placeholder="Enter width"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-primary mb-4">
            Flooring Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Wastage Allowance (%)
              </label>
              <Input
                type="number"
                value={wastagePercent}
                onChange={(e) => setWastagePercent(e.target.value)}
                placeholder="Enter wastage %"
                min="0"
                step="0.5"
              />
              <p className="text-xs text-text-muted mt-1">
                Typical: 10% for straight lay, 15% for diagonal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Pack Coverage (sq m)
              </label>
              <Input
                type="number"
                value={packCoverage}
                onChange={(e) => setPackCoverage(e.target.value)}
                placeholder="Enter coverage"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price Per Pack (GBP)
              </label>
              <Input
                type="number"
                value={pricePerPack}
                onChange={(e) => setPricePerPack(e.target.value)}
                placeholder="Enter price"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </Card>

      {isValidInput && (
        <>
          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              Calculation Results
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-text-secondary">Room Area</span>
                <span className="font-mono font-bold text-text-primary">
                  {roomArea.toFixed(2)} m²
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-text-secondary">
                  Wastage ({wastage}%)
                </span>
                <span className="font-mono font-bold text-text-primary">
                  {wastedArea.toFixed(2)} m²
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-text-secondary">Total Area Needed</span>
                <span className="font-mono font-bold text-text-primary">
                  {totalArea.toFixed(2)} m²
                </span>
              </div>

              <div className="bg-surface p-4 rounded-lg border border-border mt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-text-secondary">Packs Required</span>
                  <span className="font-mono text-2xl font-bold text-primary">
                    {packsNeeded}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  ({coverage} m² per pack)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              Cost Estimate
            </h3>
            <div className="space-y-3">
              <div className="bg-accent-muted p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-2">Total Cost</p>
                <p className="text-3xl font-bold text-primary font-mono">
                  GBP {totalCost.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-text-secondary">Cost Per Pack</span>
                <span className="font-mono text-text-primary">
                  GBP {price.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-text-secondary">Cost Per sq m</span>
                <span className="font-mono text-text-primary font-bold">
                  GBP {costPerSqM.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              Tips for Accurate Estimates
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
              <li>
                Measure your room carefully, including alcoves and corners
              </li>
              <li>
                Add extra wastage if cutting complex angles or using directional
                patterns
              </li>
              <li>
                For diagonal layouts, use 15% wastage instead of 10%
              </li>
              <li>
                Always round up the number of packs to ensure you have enough
              </li>
              <li>
                Check with your supplier for exact pack coverage and pricing
              </li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
