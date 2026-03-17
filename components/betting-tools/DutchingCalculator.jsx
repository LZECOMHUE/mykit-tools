'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function DutchingCalculator() {
  const [totalStake, setTotalStake] = useState('100');
  const [selections, setSelections] = useState([
    { id: 1, name: 'Selection A', odds: '3.0' },
    { id: 2, name: 'Selection B', odds: '4.0' },
  ]);
  const [nextId, setNextId] = useState(3);

  const addSelection = () => {
    if (selections.length < 10) {
      setSelections([
        ...selections,
        { id: nextId, name: `Selection ${String.fromCharCode(65 + selections.length)}`, odds: '2.0' },
      ]);
      setNextId(nextId + 1);
    }
  };

  const removeSelection = (id) => {
    if (selections.length > 2) {
      setSelections(selections.filter((s) => s.id !== id));
    }
  };

  const updateSelection = (id, field, value) => {
    setSelections(
      selections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculations = useMemo(() => {
    const total = parseFloat(totalStake) || 0;
    if (total <= 0 || selections.length === 0) return null;

    const odds = selections
      .map((s) => parseFloat(s.odds) || 0)
      .filter((o) => o > 1);

    if (odds.length !== selections.length) return null;

    // Calculate book percentage
    const bookPercentage = odds.reduce((sum, o) => sum + 1 / o, 0) * 100;

    if (bookPercentage <= 0) return null;

    // Calculate dutching stakes using proportional allocation
    const invOdds = odds.map((o) => 1 / o);
    const totalInvOdds = invOdds.reduce((sum, io) => sum + io, 0);
    const stakes = invOdds.map((io) => (io / totalInvOdds) * total);

    // Calculate uniform profit (what dutching guarantees)
    const profits = stakes.map((stake, idx) => {
      const return_ = stake * odds[idx];
      return return_ - total;
    });

    const uniformProfit = profits[0]; // All should be equal if math is right
    const uniformReturn = uniformProfit + total;

    // Overround/margin
    const overround = bookPercentage > 100 ? bookPercentage - 100 : 0;

    return {
      stakes,
      uniformProfit: uniformProfit.toFixed(2),
      uniformReturn: uniformReturn.toFixed(2),
      bookPercentage: bookPercentage.toFixed(2),
      overround: overround.toFixed(2),
      isValue: bookPercentage < 100,
    };
  }, [totalStake, selections]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          Dutching spreads your stake across multiple selections to guarantee the same profit regardless of which selection wins. Only profitable when the combined book percentage is under 100%.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selections */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Selections</h3>
          <div className="space-y-4">
            <Input
              label="Total Stake (£)"
              type="number"
              value={totalStake}
              onChange={(e) => setTotalStake(e.target.value)}
              placeholder="100"
              min="0"
              step="0.01"
            />

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selections.map((selection, idx) => (
                <div key={selection.id} className="flex gap-2">
                  <Input
                    label={idx === 0 ? 'Name (optional)' : ''}
                    type="text"
                    value={selection.name}
                    onChange={(e) => updateSelection(selection.id, 'name', e.target.value)}
                    placeholder="Selection name"
                    className="flex-1"
                  />
                  <Input
                    label={idx === 0 ? 'Decimal Odds' : ''}
                    type="number"
                    value={selection.odds}
                    onChange={(e) => updateSelection(selection.id, 'odds', e.target.value)}
                    placeholder="2.0"
                    min="1"
                    step="0.01"
                    className="w-32"
                  />
                  {selections.length > 2 && (
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        onClick={() => removeSelection(selection.id)}
                        className="px-2 py-1 text-error hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selections.length < 10 && (
              <Button
                onClick={addSelection}
                variant="secondary"
                className="w-full"
              >
                + Add Selection
              </Button>
            )}
          </div>
        </Card>

        {/* Results */}
        {calculations && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Results</h3>
            <div className="space-y-4">
              <div className={`rounded p-3 ${calculations.isValue ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="text-secondary text-xs mb-1">Book Percentage</p>
                <p className={`font-mono text-2xl font-bold ${calculations.isValue ? 'text-success' : 'text-error'}`}>
                  {calculations.bookPercentage}%
                </p>
                {calculations.isValue ? (
                  <p className="text-success text-xs mt-1">Value available (under 100%)</p>
                ) : (
                  <p className="text-error text-xs mt-1">No value (over 100%)</p>
                )}
              </div>

              {!calculations.isValue && (
                <div className="bg-amber-50 border border-warning rounded p-3">
                  <p className="text-secondary text-xs mb-1">Overround</p>
                  <p className="font-mono text-lg font-bold text-warning">
                    {calculations.overround}%
                  </p>
                  <p className="text-muted text-xs mt-1">
                    Built-in loss in the market
                  </p>
                </div>
              )}

              <div className="bg-blue-50 rounded p-3">
                <p className="text-secondary text-xs mb-1">Guaranteed Profit (Any Outcome)</p>
                <p className="font-mono text-xl font-bold text-success">
                  £{calculations.uniformProfit}
                </p>
                <p className="text-muted text-xs mt-1">
                  Total Return: £{calculations.uniformReturn}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading text-sm font-bold text-primary mb-3">
                  Stake per Selection
                </h4>
                <div className="space-y-2">
                  {selections.map((selection, idx) => (
                    <div key={selection.id} className="flex justify-between items-center">
                      <span className="text-secondary text-sm truncate mr-2">
                        {selection.name}
                      </span>
                      <span className="font-mono font-bold text-primary whitespace-nowrap">
                        £{calculations.stakes[idx].toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <GamblingDisclaimer type="betting" />
    </div>
  );
}
