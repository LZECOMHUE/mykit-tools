'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function EachWayCalculator() {
  const [stake, setStake] = useState('5');
  const [odds, setOdds] = useState('10');
  const [placeOdds, setPlaceOdds] = useState('1/4');
  const [places, setPlaces] = useState('3');
  const [preset, setPreset] = useState('');

  const presets = [
    { label: '2-4 runners: Win only', value: 'preset1' },
    { label: '5-7 runners: 1/4 odds, 2 places', value: 'preset2' },
    { label: '8-15 runners: 1/5 odds, 3 places', value: 'preset3' },
    { label: '16+ runners handicap: 1/4 odds, 4 places', value: 'preset4' },
  ];

  const applyPreset = (presetValue) => {
    setPreset(presetValue);
    switch (presetValue) {
      case 'preset1':
        setPlaceOdds('1/1');
        setPlaces('0');
        break;
      case 'preset2':
        setPlaceOdds('1/4');
        setPlaces('2');
        break;
      case 'preset3':
        setPlaceOdds('1/5');
        setPlaces('3');
        break;
      case 'preset4':
        setPlaceOdds('1/4');
        setPlaces('4');
        break;
      default:
        break;
    }
  };

  const calculations = useMemo(() => {
    const stakePerPart = parseFloat(stake) || 0;
    const winOdds = parseFloat(odds) || 0;
    const numPlaces = parseInt(places) || 0;

    if (stakePerPart <= 0 || winOdds <= 0) return null;

    // Parse place odds (e.g., "1/4" becomes 0.25)
    const [placeNum, placeDen] = placeOdds.split('/').map(parseFloat);
    const placeOddsDecimal = placeNum / placeDen || 0;

    const totalOutlay = stakePerPart * 2;
    const winPartReturn = stakePerPart * winOdds;
    const winPartProfit = winPartReturn - stakePerPart;
    const winAndPlace = winPartReturn + stakePerPart * (1 + placeOddsDecimal) - stakePerPart;

    const placePartWinIfPlace = stakePerPart * (1 + placeOddsDecimal);
    const placePartProfit = placePartWinIfPlace - stakePerPart;

    return {
      totalOutlay: totalOutlay.toFixed(2),
      // Scenario 1: Wins
      winReturn: winPartReturn.toFixed(2),
      winAndPlaceReturn: (winPartReturn + placePartWinIfPlace).toFixed(2),
      winAndPlaceProfit: (winPartReturn + placePartWinIfPlace - totalOutlay).toFixed(2),
      // Scenario 2: Places only
      placeReturn: placePartWinIfPlace.toFixed(2),
      placeProfit: (placePartWinIfPlace - totalOutlay).toFixed(2),
      // Scenario 3: Loses
      lossAmount: (-totalOutlay).toFixed(2),
      winOdds: winOdds.toFixed(2),
      placeOddsStr: `${placeNum}/${placeDen}`,
      places: numPlaces,
    };
  }, [stake, odds, placeOdds, places]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          Each-way bets split your stake equally between a win bet and a place bet. You win if the selection wins, or make a reduced profit if it places.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Inputs */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Configuration</h3>
          <div className="space-y-4">
            <Input
              label="Stake per Part (£)"
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="5"
              min="0"
              step="0.01"
              helperText="Total bet is 2x this amount"
            />

            <Input
              label="Win Odds"
              type="number"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              placeholder="10"
              min="1"
              step="0.1"
              helperText="Decimal format (e.g., 5.0)"
            />

            <Input
              label="Place Odds (Fractional)"
              type="text"
              value={placeOdds}
              onChange={(e) => setPlaceOdds(e.target.value)}
              placeholder="1/4"
              helperText="Format: 1/4 or 1/5"
            />

            <Input
              label="Number of Places Paid"
              type="number"
              value={places}
              onChange={(e) => setPlaces(e.target.value)}
              placeholder="3"
              min="0"
              step="1"
            />

            <div className="border-t border-border pt-4">
              <p className="text-secondary text-xs mb-2 font-bold">Quick Presets</p>
              <div className="space-y-2">
                {presets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => applyPreset(p.value)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                      preset === p.value
                        ? 'bg-accent text-white'
                        : 'bg-surface hover:bg-surface-hover text-secondary'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        {calculations && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Total Stake</p>
                <p className="font-mono text-xl font-bold text-primary">
                  £{calculations.totalOutlay}
                </p>
                <p className="text-muted text-xs mt-1">
                  {stake} (win) + {stake} (place)
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading text-sm font-bold text-primary mb-3">
                  Scenarios
                </h4>

                <div className="space-y-3">
                  <div className="bg-green-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">Selection Wins</p>
                    <p className="font-mono text-lg font-bold text-success">
                      +£{calculations.winAndPlaceProfit}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Win part: £{calculations.winReturn} + Place part: £{calculations.placeReturn}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">Selection Places (No Win)</p>
                    <p className="font-mono text-lg font-bold text-primary">
                      {parseFloat(calculations.placeProfit) >= 0 ? '+' : ''}
                      £{calculations.placeProfit}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Place return: £{calculations.placeReturn}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">Selection Loses</p>
                    <p className="font-mono text-lg font-bold text-error">
                      £{calculations.lossAmount}
                    </p>
                    <p className="text-muted text-xs mt-1">Entire stake lost</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface rounded p-3 border border-border">
                <p className="text-secondary text-xs mb-2 font-bold">Bet Details</p>
                <div className="space-y-1 text-muted text-xs font-mono">
                  <p>Win odds: {calculations.winOdds}</p>
                  <p>Place odds: {calculations.placeOddsStr}</p>
                  <p>Places paid: {calculations.places}</p>
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
