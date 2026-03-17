'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function MatchedBettingCalculator() {
  const [mode, setMode] = useState('normal');
  const [backStake, setBackStake] = useState('10');
  const [backOdds, setBackOdds] = useState('2.5');
  const [layOdds, setLayOdds] = useState('2.4');
  const [commission, setCommission] = useState('5');
  const [freeBetValue, setFreeBetValue] = useState('10');

  const commissionPresets = [
    { label: 'Betfair (5%)', value: '5' },
    { label: 'Smarkets (2%)', value: '2' },
    { label: 'Betdaq (2.5%)', value: '2.5' },
  ];

  const calculations = useMemo(() => {
    const back = parseFloat(backStake) || 0;
    const bOdds = parseFloat(backOdds) || 0;
    const lOdds = parseFloat(layOdds) || 0;
    const comm = parseFloat(commission) || 0;
    const fbValue = parseFloat(freeBetValue) || 0;

    if (back <= 0 || bOdds <= 1 || lOdds <= 1 || comm < 0) {
      return null;
    }

    const commMultiplier = 1 - comm / 100;

    if (mode === 'normal') {
      // Normal qualifying bet
      const layStake = (back * bOdds) / lOdds;
      const backWinReturn = back * bOdds;
      const backWinProfit = backWinReturn - back - layStake;
      const layWinReturn = layStake * commMultiplier;
      const layWinProfit = layWinReturn - back;
      const avgProfit = (backWinProfit + layWinProfit) / 2;

      return {
        layStake: layStake.toFixed(2),
        backWinReturn: backWinReturn.toFixed(2),
        backWinProfit: backWinProfit.toFixed(2),
        layWinReturn: layWinReturn.toFixed(2),
        layWinProfit: layWinProfit.toFixed(2),
        avgProfit: avgProfit.toFixed(2),
        liability: (layStake * (lOdds - 1)).toFixed(2),
      };
    } else if (mode === 'snr') {
      // Free bet SNR (Stake Not Returned)
      const layStake = (fbValue * (bOdds - 1)) / (lOdds - commMultiplier);
      const backWinReturn = fbValue * bOdds;
      const backWinProfit = backWinReturn - layStake;
      const layWinReturn = layStake * commMultiplier;
      const layWinProfit = layWinReturn;
      const avgProfit = (backWinProfit + layWinProfit) / 2;

      return {
        layStake: layStake.toFixed(2),
        backWinReturn: backWinReturn.toFixed(2),
        backWinProfit: backWinProfit.toFixed(2),
        layWinReturn: layWinReturn.toFixed(2),
        layWinProfit: layWinProfit.toFixed(2),
        avgProfit: avgProfit.toFixed(2),
        liability: (layStake * (lOdds - 1)).toFixed(2),
      };
    } else if (mode === 'sr') {
      // Free bet SR (Stake Returned)
      const layStake = (fbValue * bOdds) / (lOdds - commMultiplier);
      const backWinReturn = fbValue * bOdds;
      const backWinProfit = fbValue + backWinReturn - layStake;
      const layWinReturn = layStake * commMultiplier;
      const layWinProfit = layWinReturn + fbValue;
      const avgProfit = (backWinProfit + layWinProfit) / 2;

      return {
        layStake: layStake.toFixed(2),
        backWinReturn: backWinReturn.toFixed(2),
        backWinProfit: backWinProfit.toFixed(2),
        layWinReturn: layWinReturn.toFixed(2),
        layWinProfit: layWinProfit.toFixed(2),
        avgProfit: avgProfit.toFixed(2),
        liability: (layStake * (lOdds - 1)).toFixed(2),
      };
    }

    return null;
  }, [mode, backStake, backOdds, layOdds, commission, freeBetValue]);

  const tabOptions = [
    { value: 'normal', label: 'Normal (Qualifying)' },
    { value: 'snr', label: 'Free Bet (SNR)' },
    { value: 'sr', label: 'Free Bet (SR)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          Matched betting eliminates the sportsbook edge by backing a selection at one bookmaker and laying it at an exchange, guaranteeing profit from free bets and promotional offers.
        </p>
      </div>

      <div className="flex gap-1 border-b border-border">
        {tabOptions.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setMode(tab.value)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              mode === tab.value
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Configuration</h3>
          <div className="space-y-4">
            {mode === 'normal' && (
              <>
                <Input
                  label="Back Stake (£)"
                  type="number"
                  value={backStake}
                  onChange={(e) => setBackStake(e.target.value)}
                  placeholder="10"
                  min="0"
                  step="0.01"
                />
                <Input
                  label="Back Odds (Decimal)"
                  type="number"
                  value={backOdds}
                  onChange={(e) => setBackOdds(e.target.value)}
                  placeholder="2.5"
                  min="1"
                  step="0.01"
                />
                <Input
                  label="Lay Odds (Decimal)"
                  type="number"
                  value={layOdds}
                  onChange={(e) => setLayOdds(e.target.value)}
                  placeholder="2.4"
                  min="1"
                  step="0.01"
                />
              </>
            )}

            {(mode === 'snr' || mode === 'sr') && (
              <>
                <Input
                  label="Free Bet Value (£)"
                  type="number"
                  value={freeBetValue}
                  onChange={(e) => setFreeBetValue(e.target.value)}
                  placeholder="10"
                  min="0"
                  step="0.01"
                />
                <Input
                  label="Back Odds (Decimal)"
                  type="number"
                  value={backOdds}
                  onChange={(e) => setBackOdds(e.target.value)}
                  placeholder="2.5"
                  min="1"
                  step="0.01"
                />
                <Input
                  label="Lay Odds (Decimal)"
                  type="number"
                  value={layOdds}
                  onChange={(e) => setLayOdds(e.target.value)}
                  placeholder="2.4"
                  min="1"
                  step="0.01"
                />
              </>
            )}

            <Select
              label="Exchange Commission"
              options={commissionPresets.map((p) => ({ value: p.value, label: p.label }))}
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />

            {!commissionPresets.some((p) => p.value === commission) && (
              <Input
                label="Custom Commission (%)"
                type="number"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                placeholder="5"
                min="0"
                max="100"
                step="0.1"
              />
            )}
          </div>
        </Card>

        {/* Results */}
        {calculations && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Lay Stake</p>
                <p className="font-mono text-xl font-bold text-primary">£{calculations.layStake}</p>
              </div>

              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Liability</p>
                <p className="font-mono text-xl font-bold text-primary">£{calculations.liability}</p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading text-sm font-bold text-primary mb-3">Scenarios</h4>

                <div className="space-y-3">
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">If Back Bet Wins</p>
                    <p className="font-mono text-lg font-bold text-primary">
                      +£{calculations.backWinProfit}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Return: £{calculations.backWinReturn}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">If Lay Bet Loses</p>
                    <p className="font-mono text-lg font-bold text-primary">
                      +£{calculations.layWinProfit}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Return: £{calculations.layWinReturn}
                    </p>
                  </div>
                </div>

                <div className={`mt-4 rounded p-3 ${parseFloat(calculations.avgProfit) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-secondary text-xs mb-1">Expected Profit</p>
                  <p className={`font-mono text-xl font-bold ${parseFloat(calculations.avgProfit) >= 0 ? 'text-success' : 'text-error'}`}>
                    £{calculations.avgProfit}
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
