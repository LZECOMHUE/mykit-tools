'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BoardFootCalculator() {
  const [pieces, setPieces] = useState([
    { id: 1, name: 'Board 1', thickness: 1, width: 6, length: 8 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [pricePerBf, setPricePerBf] = useState(6);

  const calculation = useMemo(() => {
    let totalBf = 0;
    let pieces_calc = [];

    pieces.forEach((piece) => {
      const bf = (piece.thickness * piece.width * piece.length) / 144;
      const cost = (bf * pricePerBf).toFixed(2);

      pieces_calc.push({
        id: piece.id,
        name: piece.name,
        thickness: piece.thickness,
        width: piece.width,
        length: piece.length,
        boardFeet: bf.toFixed(3),
        cost,
      });

      totalBf += bf;
    });

    const totalCost = (totalBf * pricePerBf).toFixed(2);

    return {
      pieces: pieces_calc,
      totalBf: totalBf.toFixed(3),
      totalCost,
    };
  }, [pieces, pricePerBf]);

  const addPiece = () => {
    setPieces([
      ...pieces,
      { id: nextId, name: `Board ${nextId}`, thickness: 1, width: 6, length: 8 },
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
        p.id === id ? { ...p, [field]: parseFloat(value) || 0 } : p
      )
    );
  };

  const updatePieceName = (id, value) => {
    setPieces(pieces.map((p) => (p.id === id ? { ...p, name: value } : p)));
  };

  const thicknessOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Price Settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary font-medium mb-1">Price per Board Foot (£)</label>
            <Input
              type="number"
              min="0"
              step="0.5"
              value={pricePerBf}
              onChange={(e) => setPricePerBf(parseFloat(e.target.value) || 0)}
            />
            <p className="text-text-muted text-[11px] mt-1">Board Foot = T×W×L / 144 (inches)</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Boards</h2>
        <div className="space-y-3 mb-4 text-[13px]">
          {pieces.map((piece) => (
            <div key={piece.id} className="border border-border rounded-[var(--radius-input)] p-3">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 mb-2">
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Name</label>
                  <Input
                    type="text"
                    value={piece.name}
                    onChange={(e) => updatePieceName(piece.id, e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Thickness (inches)</label>
                  <select
                    value={piece.thickness}
                    onChange={(e) => updatePiece(piece.id, 'thickness', e.target.value)}
                    className="w-full px-2 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary text-[12px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  >
                    {thicknessOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}"
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Width (inches)</label>
                  <Input
                    type="number"
                    min="1"
                    step="0.5"
                    value={piece.width}
                    onChange={(e) => updatePiece(piece.id, 'width', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Length (feet)</label>
                  <Input
                    type="number"
                    min="1"
                    step="0.5"
                    value={piece.length}
                    onChange={(e) => updatePiece(piece.id, 'length', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[11px] font-medium mb-1">Board Feet</label>
                  <div className="px-2 py-2 bg-surface border border-border rounded-[var(--radius-input)] font-mono font-bold text-text-primary text-[13px]">
                    {pieces.find((p) => p.id === piece.id) && calculation.pieces.find((c) => c.id === piece.id)?.boardFeet}
                  </div>
                </div>
                {pieces.length > 1 && (
                  <div className="flex items-end">
                    <Button
                      variant="secondary"
                      onClick={() => removePiece(piece.id)}
                      className="w-full text-xs px-2 py-2"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" onClick={addPiece} className="w-full text-sm">
          + Add Another Board
        </Button>
      </Card>

      <Card className="border-2 border-accent bg-accent-muted">
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Calculation Results</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-[12px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Board</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">T x W x L</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Board Feet</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {calculation.pieces.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-2 text-text-primary font-medium">{item.name}</td>
                  <td className="text-right py-2 px-2 text-text-secondary text-[11px]">
                    {item.thickness}" x {item.width}" x {item.length}'
                  </td>
                  <td className="text-right py-2 px-2 font-mono text-text-primary">BF {item.boardFeet}</td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-accent">£{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between text-text-primary">
            <span className="font-medium">Total Board Feet</span>
            <span className="font-mono font-bold text-[13px]">{calculation.totalBf} BF</span>
          </div>
          <div className="flex justify-between text-accent text-base">
            <span className="font-bold">Total Cost</span>
            <span className="font-mono font-bold text-lg">£{calculation.totalCost}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
