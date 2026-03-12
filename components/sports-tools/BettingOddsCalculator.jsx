'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const ODDS_FORMATS = {
  FRACTIONAL: 'fractional',
  DECIMAL: 'decimal',
  AMERICAN: 'american',
};

const EACH_WAY_ODDS = [
  { label: '1/4 odds', divisor: 4 },
  { label: '1/5 odds', divisor: 5 },
  { label: '1/6 odds', divisor: 6 },
];

// Odds conversion functions
const convertToDecimal = (value, format) => {
  if (format === ODDS_FORMATS.DECIMAL) return parseFloat(value) || 0;
  if (format === ODDS_FORMATS.FRACTIONAL) {
    const [num, den] = value.split('/').map(Number);
    return isNaN(num) || isNaN(den) ? 0 : num / den + 1;
  }
  if (format === ODDS_FORMATS.AMERICAN) {
    const american = parseFloat(value) || 0;
    return american > 0 ? american / 100 + 1 : 100 / Math.abs(american) + 1;
  }
  return 0;
};

const convertFromDecimal = (decimal, format) => {
  if (format === ODDS_FORMATS.DECIMAL) return decimal.toFixed(2);
  if (format === ODDS_FORMATS.FRACTIONAL) {
    const num = (decimal - 1) * 1000;
    const den = 1000;
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.round(num), den);
    return `${Math.round(num) / divisor}/${den / divisor}`;
  }
  if (format === ODDS_FORMATS.AMERICAN) {
    return decimal > 2 ? `+${Math.round((decimal - 1) * 100)}` : `${Math.round(-100 / (decimal - 1))}`;
  }
  return '0';
};

const formatGBP = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(value);
};

export default function BettingOddsCalculator() {
  const [mode, setMode] = useState('single'); // single, accumulator, eachway
  const [oddsFormat, setOddsFormat] = useState(ODDS_FORMATS.DECIMAL);

  // Single bet state
  const [singleStake, setSingleStake] = useState('10');
  const [singleOdds, setSingleOdds] = useState('2.00');

  // Accumulator state
  const [accaSelections, setAccaSelections] = useState([
    { id: 1, odds: '2.00', name: 'Selection 1' },
  ]);
  const [accaStake, setAccaStake] = useState('10');
  const [nextAccaId, setNextAccaId] = useState(2);

  // Each-way state
  const [ewStake, setEwStake] = useState('10');
  const [ewOdds, setEwOdds] = useState('5.00');
  const [ewPlaceOddsDivisor, setEwPlaceOddsDivisor] = useState(4);

  // Calculations
  const singleCalc = useMemo(() => {
    const stake = parseFloat(singleStake) || 0;
    const decimalOdds = convertToDecimal(singleOdds, oddsFormat);
    const totalReturn = stake * decimalOdds;
    const profit = totalReturn - stake;
    return {
      decimalOdds,
      totalReturn: totalReturn >= 0 ? totalReturn : 0,
      profit: profit >= 0 ? profit : 0,
    };
  }, [singleStake, singleOdds, oddsFormat]);

  const accaCalc = useMemo(() => {
    const stake = parseFloat(accaStake) || 0;
    const decimalOdds = accaSelections.reduce((acc, sel) => {
      const odds = convertToDecimal(sel.odds, oddsFormat);
      return acc * odds;
    }, 1);
    const totalReturn = stake * decimalOdds;
    const profit = totalReturn - stake;
    return {
      decimalOdds,
      totalReturn: totalReturn >= 0 ? totalReturn : 0,
      profit: profit >= 0 ? profit : 0,
      selections: accaSelections.length,
    };
  }, [accaStake, accaSelections, oddsFormat]);

  const ewCalc = useMemo(() => {
    const stake = parseFloat(ewStake) || 0;
    const decimalOdds = convertToDecimal(ewOdds, oddsFormat);
    const winStake = stake / 2;
    const placeStake = stake / 2;
    const placeOdds = (decimalOdds - 1) / ewPlaceOddsDivisor + 1;

    const winReturn = winStake * decimalOdds;
    const placeReturn = placeStake * placeOdds;
    const totalReturn = winReturn + placeReturn;
    const profit = totalReturn - stake;

    return {
      decimalOdds,
      winReturn: winReturn >= 0 ? winReturn : 0,
      placeReturn: placeReturn >= 0 ? placeReturn : 0,
      totalReturn: totalReturn >= 0 ? totalReturn : 0,
      profit: profit >= 0 ? profit : 0,
      placeOdds: placeOdds.toFixed(2),
    };
  }, [ewStake, ewOdds, ewPlaceOddsDivisor, oddsFormat]);

  const handleAddSelection = useCallback(() => {
    setAccaSelections([...accaSelections, { id: nextAccaId, odds: '2.00', name: `Selection ${nextAccaId}` }]);
    setNextAccaId(nextAccaId + 1);
  }, [accaSelections, nextAccaId]);

  const handleRemoveSelection = useCallback(
    (id) => {
      if (accaSelections.length > 1) {
        setAccaSelections(accaSelections.filter((s) => s.id !== id));
      }
    },
    [accaSelections]
  );

  const handleUpdateSelection = useCallback(
    (id, field, value) => {
      setAccaSelections(accaSelections.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    },
    [accaSelections]
  );

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition ${
            mode === 'single'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
          }`}
        >
          Single Bet
        </button>
        <button
          onClick={() => setMode('accumulator')}
          className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition ${
            mode === 'accumulator'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
          }`}
        >
          Accumulator
        </button>
        <button
          onClick={() => setMode('eachway')}
          className={`px-4 py-2 rounded-[var(--radius-input)] font-medium transition ${
            mode === 'eachway'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
          }`}
        >
          Each-Way
        </button>
      </div>

      {/* Odds Format Selection */}
      <Card>
        <div className="flex flex-wrap gap-2">
          <span className="text-text-secondary text-sm font-medium">Odds format:</span>
          {Object.values(ODDS_FORMATS).map((format) => (
            <button
              key={format}
              onClick={() => setOddsFormat(format)}
              className={`px-3 py-1 text-sm rounded-[var(--radius-input)] transition ${
                oddsFormat === format
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
              }`}
            >
              {format === ODDS_FORMATS.FRACTIONAL && '5/1'}
              {format === ODDS_FORMATS.DECIMAL && '6.00'}
              {format === ODDS_FORMATS.AMERICAN && '+500'}
            </button>
          ))}
        </div>
      </Card>

      {/* SINGLE BET MODE */}
      {mode === 'single' && (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Single Bet Calculator</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Stake (£)</label>
                <input
                  type="number"
                  value={singleStake}
                  onChange={(e) => setSingleStake(e.target.value)}
                  placeholder="Enter stake"
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Odds ({oddsFormat === ODDS_FORMATS.FRACTIONAL ? '5/1' : oddsFormat === ODDS_FORMATS.DECIMAL ? '6.00' : '+500'})
                </label>
                <input
                  type="text"
                  value={singleOdds}
                  onChange={(e) => setSingleOdds(e.target.value)}
                  placeholder={oddsFormat === ODDS_FORMATS.FRACTIONAL ? '5/1' : oddsFormat === ODDS_FORMATS.DECIMAL ? '6.00' : '+500'}
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20"
                />
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Decimal Odds</div>
              <div className="font-mono text-2xl font-bold text-accent">{singleCalc.decimalOdds.toFixed(2)}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Potential Return</div>
              <div className="font-mono text-2xl font-bold text-text-primary">{formatGBP(singleCalc.totalReturn)}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Profit</div>
              <div className="font-mono text-2xl font-bold text-accent">{formatGBP(singleCalc.profit)}</div>
            </Card>
          </div>
        </div>
      )}

      {/* ACCUMULATOR MODE */}
      {mode === 'accumulator' && (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Accumulator Calculator</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Total Stake (£)</label>
              <input
                type="number"
                value={accaStake}
                onChange={(e) => setAccaStake(e.target.value)}
                placeholder="Enter stake"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20"
              />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-text-primary">Selections ({accaSelections.length})</h4>
                <Button onClick={handleAddSelection} variant="secondary" size="sm">
                  + Add Selection
                </Button>
              </div>

              {accaSelections.map((sel, idx) => (
                <div key={sel.id} className="p-3 bg-surface rounded-[var(--radius-input)] space-y-2">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-text-secondary mb-1">Selection {idx + 1} Name</label>
                      <input
                        type="text"
                        value={sel.name}
                        onChange={(e) => handleUpdateSelection(sel.id, 'name', e.target.value)}
                        placeholder="e.g., Man United to win"
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-text-secondary mb-1">Odds</label>
                      <input
                        type="text"
                        value={sel.odds}
                        onChange={(e) => handleUpdateSelection(sel.id, 'odds', e.target.value)}
                        placeholder="2.00"
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    {accaSelections.length > 1 && (
                      <Button
                        onClick={() => handleRemoveSelection(sel.id)}
                        variant="secondary"
                        size="sm"
                        className="px-2"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Results */}
          <div className="grid sm:grid-cols-4 gap-4">
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Combined Odds</div>
              <div className="font-mono text-2xl font-bold text-accent">{accaCalc.decimalOdds.toFixed(2)}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Legs</div>
              <div className="font-mono text-2xl font-bold text-text-primary">{accaCalc.selections}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Potential Return</div>
              <div className="font-mono text-2xl font-bold text-text-primary">{formatGBP(accaCalc.totalReturn)}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Profit</div>
              <div className="font-mono text-2xl font-bold text-accent">{formatGBP(accaCalc.profit)}</div>
            </Card>
          </div>

          {accaSelections.length > 1 && (
            <Card className="bg-warning bg-opacity-10 border border-warning">
              <p className="text-sm text-text-primary">
                <span className="font-medium">Break-even:</span> {accaSelections.length} of {accaSelections.length} selections need to win for profit.
              </p>
            </Card>
          )}
        </div>
      )}

      {/* EACH-WAY MODE */}
      {mode === 'eachway' && (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Each-Way Calculator</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Total Stake (£) — split equally between Win & Place</label>
                <input
                  type="number"
                  value={ewStake}
                  onChange={(e) => setEwStake(e.target.value)}
                  placeholder="Enter stake"
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Win Odds ({oddsFormat === ODDS_FORMATS.FRACTIONAL ? '5/1' : oddsFormat === ODDS_FORMATS.DECIMAL ? '6.00' : '+500'})
                </label>
                <input
                  type="text"
                  value={ewOdds}
                  onChange={(e) => setEwOdds(e.target.value)}
                  placeholder={oddsFormat === ODDS_FORMATS.FRACTIONAL ? '5/1' : oddsFormat === ODDS_FORMATS.DECIMAL ? '6.00' : '+500'}
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Place Odds Reduction</label>
                <select
                  value={ewPlaceOddsDivisor}
                  onChange={(e) => setEwPlaceOddsDivisor(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent"
                >
                  {EACH_WAY_ODDS.map((opt) => (
                    <option key={opt.divisor} value={opt.divisor}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Win Stake (£)</div>
              <div className="font-mono text-lg font-bold text-text-primary">
                {formatGBP(parseFloat(ewStake) / 2 || 0)}
              </div>
              <div className="text-xs text-text-muted mt-2">@ {ewCalc.decimalOdds.toFixed(2)}</div>
              <div className="font-mono text-xl font-bold text-accent mt-1">{formatGBP(ewCalc.winReturn)}</div>
            </Card>
            <Card className="bg-accent bg-opacity-5">
              <div className="text-xs font-medium text-text-secondary uppercase mb-2">Place Stake (£)</div>
              <div className="font-mono text-lg font-bold text-text-primary">
                {formatGBP(parseFloat(ewStake) / 2 || 0)}
              </div>
              <div className="text-xs text-text-muted mt-2">@ {ewCalc.placeOdds}</div>
              <div className="font-mono text-xl font-bold text-accent mt-1">{formatGBP(ewCalc.placeReturn)}</div>
            </Card>
          </div>

          <Card className="bg-accent bg-opacity-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Potential Return:</span>
                <span className="font-mono text-2xl font-bold text-text-primary">{formatGBP(ewCalc.totalReturn)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Profit:</span>
                <span className="font-mono text-2xl font-bold text-accent">{formatGBP(ewCalc.profit)}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Disclaimer */}
      <Card className="bg-warning bg-opacity-5 border border-warning">
        <p className="text-xs text-text-secondary leading-relaxed">
          <strong>Disclaimer:</strong> For entertainment and calculation purposes only. Please gamble responsibly. Contact{' '}
          <span className="font-medium">GambleAware.org</span> | <span className="font-medium">BeGambleAware.org</span> |{' '}
          <span className="font-medium">National Gambling Helpline: 0808 8020 133</span>
        </p>
      </Card>
    </div>
  );
}
