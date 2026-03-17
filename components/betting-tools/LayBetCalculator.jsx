'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function LayBetCalculator() {
  const [layOdds, setLayOdds] = useState('3.0');
  const [layStake, setLayStake] = useState('20');
  const [commission, setCommission] = useState('5');

  const calculations = useMemo(() => {
    const odds = parseFloat(layOdds) || 0;
    const stake = parseFloat(layStake) || 0;
    const comm = parseFloat(commission) || 0;

    if (odds <= 1 || stake <= 0 || comm < 0) return null;

    const liability = stake * (odds - 1);
    const commMultiplier = 1 - comm / 100;
    const profitIfSelectionLoses = stake * commMultiplier;
    const lossIfSelectionWins = liability;
    const requiredBalance = stake + liability;

    return {
      liability: liability.toFixed(2),
      requiredBalance: requiredBalance.toFixed(2),
      profitIfLoses: profitIfSelectionLoses.toFixed(2),
      lossIfWins: (-lossIfSelectionWins).toFixed(2),
      commission: (stake * (comm / 100)).toFixed(2),
    };
  }, [layOdds, layStake, commission]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          A lay bet is betting against a selection on a betting exchange. You collect the stake if the selection loses, but must pay out the liability if it wins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Configuration</h3>
          <div className="space-y-4">
            <Input
              label="Lay Odds (Decimal)"
              type="number"
              value={layOdds}
              onChange={(e) => setLayOdds(e.target.value)}
              placeholder="3.0"
              min="1.01"
              step="0.01"
              helperText="The odds you're laying against"
            />

            <Input
              label="Lay Stake (£)"
              type="number"
              value={layStake}
              onChange={(e) => setLayStake(e.target.value)}
              placeholder="20"
              min="0"
              step="0.01"
              helperText="Amount you're risking"
            />

            <Input
              label="Exchange Commission (%)"
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              placeholder="5"
              min="0"
              max="100"
              step="0.1"
              helperText="Usually 5% (Betfair), 2% (Smarkets/Betdaq)"
            />

            <div className="bg-blue-50 border border-accent rounded p-3">
              <p className="text-secondary text-xs font-bold mb-1">What is Liability?</p>
              <p className="text-muted text-xs">
                The amount you must pay out if the selection wins. You need this much in your exchange account to place the lay bet.
              </p>
            </div>
          </div>
        </Card>

        {/* Results */}
        {calculations && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Liability</p>
                <p className="font-mono text-2xl font-bold text-error">
                  £{calculations.liability}
                </p>
                <p className="text-muted text-xs mt-1">
                  If selection wins, you pay this
                </p>
              </div>

              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Required Balance</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{calculations.requiredBalance}
                </p>
                <p className="text-muted text-xs mt-1">
                  Minimum needed in exchange account
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading text-sm font-bold text-primary mb-3">
                  Scenarios
                </h4>

                <div className="space-y-3">
                  <div className="bg-red-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">If Selection Wins</p>
                    <p className="font-mono text-lg font-bold text-error">
                      {calculations.lossIfWins}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      You pay out the liability
                    </p>
                  </div>

                  <div className="bg-green-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">If Selection Loses</p>
                    <p className="font-mono text-lg font-bold text-success">
                      +£{calculations.profitIfLoses}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Commission: £{calculations.commission}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-warning rounded p-3">
                <p className="text-secondary text-xs font-bold mb-2">Back vs Lay</p>
                <div className="space-y-1 text-muted text-xs">
                  <p>
                    <span className="font-bold">Back:</span> Selection to win (normal betting)
                  </p>
                  <p>
                    <span className="font-bold">Lay:</span> Selection to lose (exchange betting)
                  </p>
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
