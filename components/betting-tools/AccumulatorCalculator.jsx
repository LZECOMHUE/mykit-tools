'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function AccumulatorCalculator() {
  const [totalStake, setTotalStake] = useState('10');
  const [legs, setLegs] = useState([
    { id: 1, name: 'Leg 1', odds: '2.5', result: 'pending' },
    { id: 2, name: 'Leg 2', odds: '3.0', result: 'pending' },
  ]);
  const [nextId, setNextId] = useState(3);
  const [useRule4, setUseRule4] = useState(false);
  const [rule4Deduction, setRule4Deduction] = useState('5');

  const addLeg = () => {
    if (legs.length < 20) {
      setLegs([
        ...legs,
        {
          id: nextId,
          name: `Leg ${legs.length + 1}`,
          odds: '2.0',
          result: 'pending',
        },
      ]);
      setNextId(nextId + 1);
    }
  };

  const removeLeg = (id) => {
    if (legs.length > 2) {
      setLegs(legs.filter((leg) => leg.id !== id));
    }
  };

  const updateLeg = (id, field, value) => {
    setLegs(legs.map((leg) => (leg.id === id ? { ...leg, [field]: value } : leg)));
  };

  const calculations = useMemo(() => {
    const stake = parseFloat(totalStake) || 0;
    if (stake <= 0 || legs.length === 0) return null;

    const validLegs = legs.filter((leg) => {
      const odds = parseFloat(leg.odds) || 0;
      return odds > 1;
    });

    if (validLegs.length !== legs.length) return null;

    // Calculate combined odds
    let combinedOdds = 1;
    validLegs.forEach((leg) => {
      const odds = parseFloat(leg.odds) || 1;
      if (leg.result === 'won') {
        combinedOdds *= odds;
      } else if (leg.result === 'lost') {
        combinedOdds = 0;
      }
    });

    // Apply Rule 4 if enabled and any leg is pending
    if (useRule4 && validLegs.some((leg) => leg.result === 'pending')) {
      const deduction = parseFloat(rule4Deduction) || 0;
      const deductionMultiplier = 1 - deduction / 100;
      combinedOdds *= deductionMultiplier;
    }

    const totalReturn = (stake * combinedOdds).toFixed(2);
    const profit = (totalReturn - stake).toFixed(2);

    // Calculate "if one leg loses" scenarios
    const ifOneLosesScenarios = validLegs
      .map((legToLose, idx) => {
        let odds = 1;
        validLegs.forEach((leg, legIdx) => {
          if (legIdx !== idx && leg.result !== 'lost') {
            odds *= parseFloat(leg.odds) || 1;
          }
        });
        return {
          legName: legToLose.name,
          odds: odds.toFixed(2),
          return: (stake * odds).toFixed(2),
        };
      })
      .filter((s) => parseFloat(s.odds) > 0);

    const allWon = validLegs.every((leg) => leg.result === 'won' || leg.result === 'pending');
    const anyLost = validLegs.some((leg) => leg.result === 'lost');

    return {
      combinedOdds: combinedOdds.toFixed(2),
      totalReturn,
      profit,
      pendingCount: validLegs.filter((leg) => leg.result === 'pending').length,
      wonCount: validLegs.filter((leg) => leg.result === 'won').length,
      lostCount: validLegs.filter((leg) => leg.result === 'lost').length,
      ifOneLosesScenarios,
      isWon: anyLost ? false : allWon,
      isLost: anyLost,
    };
  }, [totalStake, legs, useRule4, rule4Deduction]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          An accumulator combines multiple selections into one bet where odds multiply together. Every selection must win for the bet to return anything.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Legs */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Legs</h3>
          <div className="space-y-4">
            <Input
              label="Total Stake (£)"
              type="number"
              value={totalStake}
              onChange={(e) => setTotalStake(e.target.value)}
              placeholder="10"
              min="0"
              step="0.01"
            />

            <div className="border-t border-border pt-4">
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={useRule4}
                  onChange={(e) => setUseRule4(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-secondary text-sm">Apply Rule 4 (horse racing)</span>
              </label>

              {useRule4 && (
                <Input
                  label="Rule 4 Deduction (%)"
                  type="number"
                  value={rule4Deduction}
                  onChange={(e) => setRule4Deduction(e.target.value)}
                  placeholder="5"
                  min="0"
                  max="100"
                  step="0.1"
                  helperText="Odds reduction if selection withdrawn"
                  className="mb-4"
                />
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {legs.map((leg, idx) => (
                <div key={leg.id} className="bg-surface rounded p-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      label={idx === 0 ? 'Leg Name (optional)' : ''}
                      type="text"
                      value={leg.name}
                      onChange={(e) => updateLeg(leg.id, 'name', e.target.value)}
                      placeholder="Leg name"
                      className="flex-1"
                    />
                    {legs.length > 2 && (
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          onClick={() => removeLeg(leg.id)}
                          className="px-2 py-1 text-error hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      label={idx === 0 ? 'Decimal Odds' : ''}
                      type="number"
                      value={leg.odds}
                      onChange={(e) => updateLeg(leg.id, 'odds', e.target.value)}
                      placeholder="2.0"
                      min="1"
                      step="0.01"
                      className="flex-1"
                    />
                    <div className={idx === 0 ? 'pt-6' : ''}>
                      <Select
                        options={[
                          { value: 'pending', label: 'Pending' },
                          { value: 'won', label: 'Won' },
                          { value: 'lost', label: 'Lost' },
                        ]}
                        value={leg.result}
                        onChange={(e) => updateLeg(leg.id, 'result', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {legs.length < 20 && (
              <Button onClick={addLeg} variant="secondary" className="w-full">
                + Add Leg
              </Button>
            )}
          </div>
        </Card>

        {/* Results */}
        {calculations && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Combined Odds</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {calculations.combinedOdds}
                </p>
              </div>

              <div className={`rounded p-3 ${
                calculations.isLost
                  ? 'bg-red-50'
                  : calculations.isWon
                    ? 'bg-green-50'
                    : 'bg-blue-50'
              }`}>
                <p className="text-secondary text-xs mb-1">Potential Return</p>
                <p className={`font-mono text-xl font-bold ${
                  calculations.isLost ? 'text-error' : 'text-success'
                }`}>
                  £{calculations.totalReturn}
                </p>
              </div>

              <div className={`rounded p-3 ${
                parseFloat(calculations.profit) >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="text-secondary text-xs mb-1">Potential Profit</p>
                <p className={`font-mono text-xl font-bold ${
                  parseFloat(calculations.profit) >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {parseFloat(calculations.profit) >= 0 ? '+' : ''}
                  £{calculations.profit}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-bold mb-2">Leg Status</p>
                <div className="flex gap-2 mb-4">
                  <div className="text-center">
                    <p className="font-mono font-bold text-success">
                      {calculations.wonCount}
                    </p>
                    <p className="text-muted text-xs">Won</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono font-bold text-primary">
                      {calculations.pendingCount}
                    </p>
                    <p className="text-muted text-xs">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono font-bold text-error">
                      {calculations.lostCount}
                    </p>
                    <p className="text-muted text-xs">Lost</p>
                  </div>
                </div>
              </div>

              {calculations.ifOneLosesScenarios.length > 0 &&
                calculations.pendingCount > 0 && (
                  <div className="bg-amber-50 border border-warning rounded p-3">
                    <p className="text-secondary text-xs font-bold mb-2">
                      If One More Leg Loses
                    </p>
                    <div className="space-y-1 text-muted text-xs max-h-40 overflow-y-auto">
                      {calculations.ifOneLosesScenarios.slice(0, 3).map(
                        (scenario, idx) => (
                          <p key={idx}>
                            <span className="text-primary font-bold">
                              {scenario.legName}
                            </span>
                            : £{scenario.return}
                          </p>
                        )
                      )}
                      {calculations.ifOneLosesScenarios.length > 3 && (
                        <p className="text-muted">
                          ...+ {calculations.ifOneLosesScenarios.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </Card>
        )}
      </div>

      <GamblingDisclaimer type="betting" />
    </div>
  );
}
