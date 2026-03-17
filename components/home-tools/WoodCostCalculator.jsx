'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const inputCls = 'w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent-muted';
const selectCls = 'w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-[13px] text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent-muted';

export default function WoodCostCalculator() {
  const [pieces, setPieces] = useState([
    { id: 1, name: 'Leg', length: 1000, width: 50, thickness: 50, woodType: 'pine', quantity: 4 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [wasteFactor, setWasteFactor] = useState(15);

  const woodTypes = {
    pine: { name: 'Pine', pricePerM: 3, unit: 'linear metre' },
    oak: { name: 'Oak', pricePerM: 12, unit: 'linear metre' },
    walnut: { name: 'Walnut', pricePerM: 18, unit: 'linear metre' },
    plywood: { name: 'Plywood 1220x2440mm', pricePerM: 15, unit: 'sheet' },
    mdf: { name: 'MDF 1220x2440mm', pricePerM: 8, unit: 'sheet' },
  };

  const calculation = useMemo(() => {
    let totalCost = 0;
    let totalLinearMetres = 0;
    let pieces_breakdown = [];

    pieces.forEach((piece) => {
      const lengthMetres = piece.length / 1000;
      const widthMetres = piece.width / 1000;
      const thicknessMetres = piece.thickness / 1000;

      let linearMetres = lengthMetres;
      if (['plywood', 'mdf'].includes(piece.woodType)) {
        linearMetres = 1;
      }

      const subtotal = linearMetres * piece.quantity * woodTypes[piece.woodType].pricePerM;
      const woodInfo = woodTypes[piece.woodType];

      pieces_breakdown.push({
        id: piece.id,
        name: piece.name,
        qty: piece.quantity,
        linearMetres: (linearMetres * piece.quantity).toFixed(2),
        subtotal: subtotal.toFixed(2),
        pricePerUnit: woodInfo.pricePerM,
        woodName: woodInfo.name,
      });

      totalLinearMetres += linearMetres * piece.quantity;
      totalCost += subtotal;
    });

    const wasteAmount = (totalCost * wasteFactor) / 100;
    const totalWithWaste = totalCost + wasteAmount;

    return {
      pieces: pieces_breakdown,
      totalLinearMetres: totalLinearMetres.toFixed(2),
      totalCost: totalCost.toFixed(2),
      wasteFactor,
      wasteAmount: wasteAmount.toFixed(2),
      totalWithWaste: totalWithWaste.toFixed(2),
    };
  }, [pieces, wasteFactor]);

  const addPiece = () => {
    setPieces([
      ...pieces,
      { id: nextId, name: `Piece ${nextId}`, length: 500, width: 50, thickness: 25, woodType: 'pine', quantity: 1 },
    ]);
    setNextId(nextId + 1);
  };

  const removePiece = (id) => {
    if (pieces.length > 1) {
      setPieces(pieces.filter((p) => p.id !== id));
    }
  };

  const updatePiece = (id, field, value) => {
    setPieces(
      pieces.map((p) =>
        p.id === id ? { ...p, [field]: field === 'quantity' ? parseInt(value) || 0 : parseFloat(value) || 0 } : p
      )
    );
  };

  const updatePieceName = (id, value) => {
    setPieces(pieces.map((p) => (p.id === id ? { ...p, name: value } : p)));
  };

  return (
    <div className="space-y-3">
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Waste Factor</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary font-medium mb-1">Waste Factor (%)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={wasteFactor}
              onChange={(e) => setWasteFactor(parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
            <p className="text-text-muted text-[11px] mt-1">Typical: 10-15% for rough timber, 5% for prepared stock</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Cut List</h2>
        <div className="space-y-3 mb-4 text-[13px]">
          {pieces.map((piece) => (
            <div key={piece.id} className="border border-border rounded-[var(--radius-input)] p-3">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 mb-2">
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={piece.name}
                    onChange={(e) => updatePieceName(piece.id, e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Length (mm)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={piece.length}
                    onChange={(e) => updatePiece(piece.id, 'length', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Width (mm)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={piece.width}
                    onChange={(e) => updatePiece(piece.id, 'width', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Thickness (mm)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={piece.thickness}
                    onChange={(e) => updatePiece(piece.id, 'thickness', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Wood Type</label>
                  <select
                    value={piece.woodType}
                    onChange={(e) => updatePiece(piece.id, 'woodType', e.target.value)}
                    className={selectCls}
                  >
                    {Object.entries(woodTypes).map(([key, val]) => (
                      <option key={key} value={key}>{val.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-1 items-end">
                  <div className="flex-1">
                    <label className="block text-text-secondary text-[11px] font-medium mb-1">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={piece.quantity}
                      onChange={(e) => updatePiece(piece.id, 'quantity', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  {pieces.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removePiece(piece.id)}
                      className="text-xs px-2 py-2"
                    >
                      X
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" onClick={addPiece} className="w-full text-sm">
          + Add Another Piece
        </Button>
      </div>

      <div className="bg-white border-2 border-accent bg-accent-muted rounded-[var(--radius-card)] p-4">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Cost Breakdown</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-[12px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Piece</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Wood</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Qty</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Linear M</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {calculation.pieces.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-2 text-text-primary font-medium">{item.name}</td>
                  <td className="text-right py-2 px-2 text-text-secondary text-[11px]">{item.woodName}</td>
                  <td className="text-right py-2 px-2 font-mono text-text-primary">{item.qty}</td>
                  <td className="text-right py-2 px-2 font-mono text-text-primary">{item.linearMetres}m</td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-accent">{'\u00a3'}{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between text-text-primary">
            <span className="text-[11px]">Timber Cost</span>
            <span className="font-mono font-bold text-[13px]">{'\u00a3'}{calculation.totalCost}</span>
          </div>
          <div className="flex justify-between text-text-primary">
            <span className="text-[11px]">+ Waste ({calculation.wasteFactor}%)</span>
            <span className="font-mono font-bold text-[13px]">{'\u00a3'}{calculation.wasteAmount}</span>
          </div>
          <div className="flex justify-between text-accent text-base">
            <span className="font-bold">Total Cost</span>
            <span className="font-mono font-bold text-lg">{'\u00a3'}{calculation.totalWithWaste}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
