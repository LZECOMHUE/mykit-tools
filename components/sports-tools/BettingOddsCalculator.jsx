'use client';

import { useState, useCallback, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

// ── Odds conversion utilities ──────────────────────────

function toDecimal(input, format) {
  const val = (input || '').toString().trim();
  if (!val) return 0;

  if (format === 'decimal') {
    const n = parseFloat(val);
    return isNaN(n) || n < 1 ? 0 : n;
  }

  if (format === 'fractional') {
    // Accept "5/1", "11/4", "evens"
    if (val.toLowerCase() === 'evens' || val === '1/1') return 2;
    const parts = val.split('/');
    if (parts.length !== 2) return 0;
    const [num, den] = parts.map(Number);
    if (isNaN(num) || isNaN(den) || den === 0) return 0;
    return num / den + 1;
  }

  if (format === 'american') {
    const n = parseFloat(val);
    if (isNaN(n) || n === 0) return 0;
    return n > 0 ? n / 100 + 1 : 100 / Math.abs(n) + 1;
  }

  return 0;
}

function fromDecimal(decimal, format) {
  if (decimal <= 1) return '';

  if (format === 'decimal') return decimal.toFixed(2);

  if (format === 'fractional') {
    if (decimal === 2) return 'Evens';
    // Find clean fraction
    const profit = decimal - 1;
    // Try common denominators
    for (const den of [1, 2, 4, 5, 8, 10, 20, 25, 50, 100]) {
      const num = profit * den;
      if (Math.abs(num - Math.round(num)) < 0.001) {
        return `${Math.round(num)}/${den}`;
      }
    }
    const num = Math.round(profit * 100);
    const den = 100;
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const d = gcd(num, den);
    return `${num / d}/${den / d}`;
  }

  if (format === 'american') {
    return decimal >= 2
      ? `+${Math.round((decimal - 1) * 100)}`
      : `${Math.round(-100 / (decimal - 1))}`;
  }

  return '';
}

function impliedProbability(decimalOdds) {
  return decimalOdds > 0 ? (1 / decimalOdds) * 100 : 0;
}

const formatGBP = (value) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(value);

// ── Quick stake buttons ──────────────────────────

const QUICK_STAKES = [1, 2, 5, 10, 20, 50];

function StakeInput({ value, onChange, label = 'Your Stake' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">£</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full pl-8 pr-3 py-2.5 border border-border rounded-[var(--radius-input)] text-text-primary font-mono text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
      <div className="flex gap-1.5 mt-2">
        {QUICK_STAKES.map((amt) => (
          <button
            key={amt}
            onClick={() => onChange(String(amt))}
            className={`flex-1 py-1 text-xs font-medium rounded border transition cursor-pointer ${
              value === String(amt)
                ? 'bg-accent text-white border-accent'
                : 'bg-white border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            £{amt}
          </button>
        ))}
      </div>
    </div>
  );
}

function OddsInput({ value, onChange, format, label = 'Odds' }) {
  const placeholder = format === 'fractional' ? 'e.g. 5/1' : format === 'decimal' ? 'e.g. 6.00' : 'e.g. +500';
  const hint = format === 'fractional' ? 'Fractional (5/1)' : format === 'decimal' ? 'Decimal (6.00)' : 'American (+500)';

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-border rounded-[var(--radius-input)] text-text-primary font-mono text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
      />
      <p className="text-xs text-text-muted mt-1">{hint}</p>
    </div>
  );
}

// ── Result display ──────────────────────────

function ResultCard({ label, value, highlight = false, sub }) {
  return (
    <div className={`rounded-[var(--radius-card)] p-4 text-center ${highlight ? 'bg-accent/5 border-2 border-accent' : 'bg-white border border-border'}`}>
      <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">{label}</p>
      <p className={`font-mono text-2xl font-bold ${highlight ? 'text-accent' : 'text-text-primary'}`}>{value}</p>
      {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
    </div>
  );
}

// ── Odds conversion display ──────────────────────────

function OddsConversion({ decimalOdds, currentFormat }) {
  if (decimalOdds <= 1) return null;
  const formats = ['fractional', 'decimal', 'american'];

  return (
    <div className="flex gap-3 py-2">
      {formats.map((fmt) => (
        <div key={fmt} className={`flex-1 text-center py-2 rounded-[var(--radius-input)] ${fmt === currentFormat ? 'bg-accent/10 border border-accent/20' : 'bg-surface'}`}>
          <p className="text-[10px] text-text-muted uppercase mb-0.5">{fmt}</p>
          <p className="font-mono font-bold text-sm text-text-primary">{fromDecimal(decimalOdds, fmt)}</p>
        </div>
      ))}
      <div className="flex-1 text-center py-2 rounded-[var(--radius-input)] bg-surface">
        <p className="text-[10px] text-text-muted uppercase mb-0.5">Implied Prob.</p>
        <p className="font-mono font-bold text-sm text-text-primary">{impliedProbability(decimalOdds).toFixed(1)}%</p>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────

const MODES = [
  { id: 'single', label: 'Single Bet', desc: 'One selection, one outcome' },
  { id: 'accumulator', label: 'Accumulator', desc: 'Multiple selections, all must win' },
  { id: 'eachway', label: 'Each-Way', desc: 'Win and place bet combined' },
];

const EW_TERMS = [
  { value: 4, label: '1/4 odds (most common)', desc: 'Handicap, most races 5-7 runners' },
  { value: 5, label: '1/5 odds', desc: 'Races with 8+ runners, big fields' },
  { value: 3, label: '1/3 odds', desc: 'Some festival races' },
];

export default function BettingOddsCalculator() {
  const [mode, setMode] = useState('single');
  const [oddsFormat, setOddsFormat] = useState('fractional');

  // Single bet
  const [singleStake, setSingleStake] = useState('10');
  const [singleOdds, setSingleOdds] = useState('5/1');

  // Accumulator
  const [accaStake, setAccaStake] = useState('5');
  const [accaLegs, setAccaLegs] = useState([
    { id: 1, odds: '2/1', name: '' },
    { id: 2, odds: '3/1', name: '' },
  ]);
  const [nextId, setNextId] = useState(3);

  // Each-way
  const [ewStake, setEwStake] = useState('10');
  const [ewOdds, setEwOdds] = useState('8/1');
  const [ewTerms, setEwTerms] = useState(4);

  // ── Single bet calc ──
  const singleResult = useMemo(() => {
    const stake = parseFloat(singleStake) || 0;
    const dec = toDecimal(singleOdds, oddsFormat);
    if (dec <= 0 || stake <= 0) return null;
    const returns = stake * dec;
    const profit = returns - stake;
    return { dec, returns, profit, probability: impliedProbability(dec) };
  }, [singleStake, singleOdds, oddsFormat]);

  // ── Accumulator calc ──
  const accaResult = useMemo(() => {
    const stake = parseFloat(accaStake) || 0;
    if (stake <= 0 || accaLegs.length === 0) return null;

    const decimals = accaLegs.map((leg) => toDecimal(leg.odds, oddsFormat));
    if (decimals.some((d) => d <= 0)) return null;

    const combinedDec = decimals.reduce((a, b) => a * b, 1);
    const returns = stake * combinedDec;
    const profit = returns - stake;
    const probability = decimals.reduce((a, d) => a * (1 / d), 1) * 100;

    return { combinedDec, returns, profit, probability, legs: accaLegs.length };
  }, [accaStake, accaLegs, oddsFormat]);

  // ── Each-way calc ──
  const ewResult = useMemo(() => {
    const totalStake = parseFloat(ewStake) || 0;
    if (totalStake <= 0) return null;

    const dec = toDecimal(ewOdds, oddsFormat);
    if (dec <= 0) return null;

    const halfStake = totalStake / 2;
    const placeOdds = (dec - 1) / ewTerms + 1;

    // If selection WINS: both win and place pay out
    const winReturns = halfStake * dec;
    const placeReturns = halfStake * placeOdds;
    const totalIfWin = winReturns + placeReturns;
    const profitIfWin = totalIfWin - totalStake;

    // If selection PLACES only: only place pays
    const totalIfPlace = placeReturns;
    const profitIfPlace = totalIfPlace - totalStake;

    return {
      dec,
      placeOdds,
      halfStake,
      totalIfWin,
      profitIfWin,
      totalIfPlace,
      profitIfPlace,
      winReturns,
      placeReturns,
    };
  }, [ewStake, ewOdds, ewTerms, oddsFormat]);

  // ── Acca handlers ──
  const addLeg = useCallback(() => {
    setAccaLegs((prev) => [...prev, { id: nextId, odds: oddsFormat === 'fractional' ? '2/1' : oddsFormat === 'decimal' ? '3.00' : '+200', name: '' }]);
    setNextId((n) => n + 1);
  }, [nextId, oddsFormat]);

  const removeLeg = useCallback((id) => {
    setAccaLegs((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));
  }, []);

  const updateLeg = useCallback((id, field, value) => {
    setAccaLegs((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }, []);

  return (
    <div className="space-y-5">
      {/* Mode selector */}
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`p-3 rounded-[var(--radius-card)] text-left transition cursor-pointer ${
              mode === m.id
                ? 'bg-accent text-white ring-2 ring-accent ring-offset-2'
                : 'bg-white border border-border text-text-primary hover:border-accent'
            }`}
          >
            <div className="font-medium text-sm">{m.label}</div>
            <div className={`text-xs mt-0.5 ${mode === m.id ? 'text-white/80' : 'text-text-muted'}`}>{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Odds format */}
      <div className="flex items-center gap-2 bg-surface rounded-[var(--radius-card)] p-3">
        <span className="text-sm font-medium text-text-secondary mr-2">Format:</span>
        {['fractional', 'decimal', 'american'].map((fmt) => (
          <button
            key={fmt}
            onClick={() => setOddsFormat(fmt)}
            className={`px-3 py-1.5 text-sm rounded-[var(--radius-input)] font-medium transition cursor-pointer ${
              oddsFormat === fmt
                ? 'bg-white border border-accent text-accent shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {fmt === 'fractional' ? '5/1' : fmt === 'decimal' ? '6.00' : '+500'}
          </button>
        ))}
      </div>

      {/* ── SINGLE BET ── */}
      {mode === 'single' && (
        <div className="space-y-4">
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              <StakeInput value={singleStake} onChange={setSingleStake} />
              <OddsInput value={singleOdds} onChange={setSingleOdds} format={oddsFormat} />
            </div>

            {singleResult && <OddsConversion decimalOdds={singleResult.dec} currentFormat={oddsFormat} />}
          </Card>

          {singleResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ResultCard label="Stake" value={formatGBP(parseFloat(singleStake) || 0)} />
              <ResultCard label="Total Return" value={formatGBP(singleResult.returns)} highlight />
              <ResultCard label="Profit" value={formatGBP(singleResult.profit)} highlight />
              <ResultCard label="Win Chance" value={`${singleResult.probability.toFixed(1)}%`} sub="Implied probability" />
            </div>
          )}
        </div>
      )}

      {/* ── ACCUMULATOR ── */}
      {mode === 'accumulator' && (
        <div className="space-y-4">
          <Card>
            <StakeInput value={accaStake} onChange={setAccaStake} />

            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary text-sm">Selections ({accaLegs.length} legs)</h4>
                <button
                  onClick={addLeg}
                  className="text-sm text-accent font-medium hover:underline cursor-pointer"
                >
                  + Add selection
                </button>
              </div>

              <div className="space-y-2">
                {accaLegs.map((leg, idx) => {
                  const dec = toDecimal(leg.odds, oddsFormat);
                  return (
                    <div key={leg.id} className="flex items-center gap-2 p-2.5 bg-surface rounded-[var(--radius-input)]">
                      <span className="text-xs font-bold text-text-muted w-5 text-center">{idx + 1}</span>
                      <input
                        type="text"
                        value={leg.name}
                        onChange={(e) => updateLeg(leg.id, 'name', e.target.value)}
                        placeholder={`Selection ${idx + 1}`}
                        className="flex-1 px-2 py-1.5 border border-border rounded text-sm bg-white focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        value={leg.odds}
                        onChange={(e) => updateLeg(leg.id, 'odds', e.target.value)}
                        placeholder={oddsFormat === 'fractional' ? '2/1' : '3.00'}
                        className="w-20 px-2 py-1.5 border border-border rounded text-sm font-mono bg-white text-center focus:outline-none focus:border-accent"
                      />
                      {dec > 0 && (
                        <span className="text-xs text-text-muted w-10 text-right font-mono">{impliedProbability(dec).toFixed(0)}%</span>
                      )}
                      {accaLegs.length > 1 && (
                        <button
                          onClick={() => removeLeg(leg.id)}
                          className="text-text-muted hover:text-error text-sm px-1 cursor-pointer"
                          title="Remove"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {accaResult && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ResultCard label="Combined Odds" value={fromDecimal(accaResult.combinedDec, oddsFormat)} sub={`${accaResult.combinedDec.toFixed(2)} decimal`} />
                <ResultCard label="Total Return" value={formatGBP(accaResult.returns)} highlight />
                <ResultCard label="Profit" value={formatGBP(accaResult.profit)} highlight />
                <ResultCard label="Win Chance" value={`${accaResult.probability.toFixed(2)}%`} sub={`All ${accaResult.legs} must win`} />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-3 text-sm text-amber-800">
                {accaResult.probability < 5
                  ? `With a ${accaResult.probability.toFixed(2)}% chance, this bet would win roughly ${Math.round(1 / (accaResult.probability / 100))} times out of ${Math.round(1 / (accaResult.probability / 100))} attempts on average.`
                  : `Combined probability: ${accaResult.probability.toFixed(1)}%. Every leg must win for a payout.`
                }
              </div>
            </>
          )}
        </div>
      )}

      {/* ── EACH-WAY ── */}
      {mode === 'eachway' && (
        <div className="space-y-4">
          <Card>
            <div className="grid sm:grid-cols-2 gap-4">
              <StakeInput value={ewStake} onChange={setEwStake} label="Total Stake (Win + Place)" />
              <OddsInput value={ewOdds} onChange={setEwOdds} format={oddsFormat} label="Win Odds" />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Place Terms</label>
              <div className="space-y-1.5">
                {EW_TERMS.map((term) => (
                  <label
                    key={term.value}
                    className={`flex items-center gap-3 p-2.5 rounded-[var(--radius-input)] border cursor-pointer transition ${
                      ewTerms === term.value ? 'border-accent bg-accent/5' : 'border-border bg-white hover:border-border-hover'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ew-terms"
                      checked={ewTerms === term.value}
                      onChange={() => setEwTerms(term.value)}
                      className="text-accent"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">{term.label}</span>
                      <span className="text-xs text-text-muted ml-2">{term.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </Card>

          {ewResult && (
            <>
              {/* How each-way works explanation */}
              <div className="bg-surface rounded-[var(--radius-card)] p-4 text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">How this works:</p>
                <p>Your £{parseFloat(ewStake).toFixed(2)} is split into two equal bets of {formatGBP(ewResult.halfStake)} each: one on the selection to <strong>win</strong> and one on it to <strong>place</strong> (typically top 2-4 finishers). The place odds are the win odds divided by {ewTerms}.</p>
              </div>

              {/* Win scenario */}
              <Card>
                <h4 className="font-medium text-sm text-text-primary mb-3">If your selection WINS:</h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-surface p-3 rounded-[var(--radius-input)]">
                    <p className="text-xs text-text-muted">Win bet returns</p>
                    <p className="font-mono font-bold text-lg text-text-primary">{formatGBP(ewResult.winReturns)}</p>
                    <p className="text-xs text-text-muted">{formatGBP(ewResult.halfStake)} at {fromDecimal(ewResult.dec, oddsFormat)}</p>
                  </div>
                  <div className="bg-surface p-3 rounded-[var(--radius-input)]">
                    <p className="text-xs text-text-muted">Place bet returns</p>
                    <p className="font-mono font-bold text-lg text-text-primary">{formatGBP(ewResult.placeReturns)}</p>
                    <p className="text-xs text-text-muted">{formatGBP(ewResult.halfStake)} at {ewResult.placeOdds.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-medium text-text-primary">Total return:</span>
                  <span className="font-mono text-2xl font-bold text-accent">{formatGBP(ewResult.totalIfWin)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Profit:</span>
                  <span className="font-mono font-bold text-accent">{formatGBP(ewResult.profitIfWin)}</span>
                </div>
              </Card>

              {/* Place-only scenario */}
              <Card>
                <h4 className="font-medium text-sm text-text-primary mb-3">If your selection PLACES only:</h4>
                <div className="bg-surface p-3 rounded-[var(--radius-input)] mb-3">
                  <p className="text-xs text-text-muted">Place bet returns</p>
                  <p className="font-mono font-bold text-lg text-text-primary">{formatGBP(ewResult.placeReturns)}</p>
                  <p className="text-xs text-text-muted">Win bet loses ({formatGBP(ewResult.halfStake)} lost)</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-medium text-text-primary">Total return:</span>
                  <span className="font-mono text-xl font-bold text-text-primary">{formatGBP(ewResult.totalIfPlace)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">
                    {ewResult.profitIfPlace >= 0 ? 'Profit:' : 'Loss:'}
                  </span>
                  <span className={`font-mono font-bold ${ewResult.profitIfPlace >= 0 ? 'text-success' : 'text-error'}`}>
                    {ewResult.profitIfPlace >= 0 ? formatGBP(ewResult.profitIfPlace) : `-${formatGBP(Math.abs(ewResult.profitIfPlace))}`}
                  </span>
                </div>
              </Card>
            </>
          )}
        </div>
      )}

      <GamblingDisclaimer type="betting" />
    </div>
  );
}
