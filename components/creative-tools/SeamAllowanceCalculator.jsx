'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const inputCls = 'w-full px-3 py-2 text-[13px] border border-border bg-white rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50';
const selectCls = 'w-full px-3 py-2 text-[13px] border border-border bg-white rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50';
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';

export default function SeamAllowanceCalculator() {
  const [seamAllowance, setSeamAllowance] = useState('1');
  const [pieces, setPieces] = useState([
    { id: 1, name: 'Front Panel', length: 45, width: 30 },
    { id: 2, name: 'Back Panel', length: 45, width: 30 },
  ]);
  const [nextId, setNextId] = useState(3);

  const seamOptions = {
    '0.5': { cm: 0.5, label: '0.5 cm' },
    '1': { cm: 1, label: '1 cm' },
    '1.5': { cm: 1.5, label: '1.5 cm' },
    '1.6': { cm: 1.6, label: '5/8" (1.6 cm)' },
  };

  const seamCm = parseFloat(seamOptions[seamAllowance].cm);

  const calculation = useMemo(() => {
    return pieces.map((piece) => {
      const cutLength = piece.length + (seamCm * 2);
      const cutWidth = piece.width + (seamCm * 2);
      return {
        ...piece,
        cutLength: cutLength.toFixed(1),
        cutWidth: cutWidth.toFixed(1),
        totalIncrease: ((seamCm * 2).toFixed(1)),
      };
    });
  }, [pieces, seamCm]);

  const addPiece = () => {
    setPieces([...pieces, { id: nextId, name: `Piece ${nextId}`, length: 20, width: 20 }]);
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

  return (
    <div className="space-y-3">
      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Seam Allowance Setting</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[13px]">
          <div>
            <label className="block text-text-secondary text-[13px] mb-1 font-medium">Seam Allowance</label>
            <select value={seamAllowance} onChange={(e) => setSeamAllowance(e.target.value)} className={selectCls}>
              {Object.entries(seamOptions).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <p className="text-text-muted text-[11px] mt-1">
              {seamCm}cm will be added to all sides (total +{(seamCm * 2).toFixed(1)}cm per dimension)
            </p>
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Pieces</h2>
        <div className="space-y-3 mb-4 text-[13px]">
          {pieces.map((piece) => (
            <div key={piece.id} className="border border-border rounded-[var(--radius-input)] p-3">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-2">
                <div>
                  <label className="block text-text-secondary text-[13px] mb-1 font-medium">
                    Piece Name
                  </label>
                  <input
                    type="text"
                    value={piece.name}
                    onChange={(e) => updatePieceName(piece.id, e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[13px] mb-1 font-medium">
                    Finished Length (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={piece.length}
                    onChange={(e) => updatePiece(piece.id, 'length', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-[13px] mb-1 font-medium">
                    Finished Width (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={piece.width}
                    onChange={(e) => updatePiece(piece.id, 'width', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-end">
                  {pieces.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removePiece(piece.id)}
                      className="w-full text-xs"
                    >
                      Remove
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
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Cut Dimensions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Piece</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Finished (cm)</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Cut (cm)</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">+Seam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {calculation.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-2 text-text-primary">
                    <span className="font-medium">{item.name}</span>
                    <br />
                    <span className="text-text-muted text-[10px]">
                      L: {item.length}cm W: {item.width}cm
                    </span>
                  </td>
                  <td className="text-right py-2 px-2 font-mono text-text-primary">
                    {item.length} x {item.width}
                  </td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-accent">
                    {item.cutLength} x {item.cutWidth}
                  </td>
                  <td className="text-right py-2 px-2 text-text-secondary font-mono text-[11px]">
                    +{item.totalIncrease}cm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-text-secondary text-[11px]">
            <strong>Tip:</strong> Remember to add seam allowance before cutting. Most patchwork projects use 0.5cm or 1cm allowances.
          </p>
        </div>
      </div>
    </div>
  );
}
