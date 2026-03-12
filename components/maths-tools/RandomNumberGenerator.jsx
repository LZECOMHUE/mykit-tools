'use client';

import { useState, useMemo } from 'react';

const generateRandomNumbers = (min, max, quantity, allowDuplicates, allowDecimals, precision) => {
  const numbers = [];
  const set = new Set();

  for (let i = 0; i < quantity; i++) {
    let num;
    let attempts = 0;
    const maxAttempts = 1000;

    do {
      if (allowDecimals) {
        num = Math.random() * (max - min) + min;
        num = parseFloat(num.toFixed(precision));
      } else {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      attempts++;
    } while (!allowDuplicates && set.has(num) && attempts < maxAttempts);

    if (allowDuplicates || !set.has(num)) {
      numbers.push(num);
      set.add(num);
    }
  }

  return numbers;
};

const rollDice = (sides, quantity) => {
  const rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return rolls;
};

const flipCoin = (flips) => {
  const results = [];
  for (let i = 0; i < flips; i++) {
    results.push(Math.random() < 0.5 ? 'Heads' : 'Tails');
  }
  return results;
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function RandomNumberGenerator() {
  const [mode, setMode] = useState('numbers');
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [quantity, setQuantity] = useState('10');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [precision, setPrecision] = useState('2');

  const [diceType, setDiceType] = useState('d6');
  const [diceQuantity, setDiceQuantity] = useState('1');

  const [coinFlips, setCoinFlips] = useState('1');

  const [results, setResults] = useState(null);
  const [colorResults, setColorResults] = useState([]);

  const diceOptions = [
    { label: 'd4 (4-sided)', value: 'd4', sides: 4 },
    { label: 'd6 (6-sided)', value: 'd6', sides: 6 },
    { label: 'd8 (8-sided)', value: 'd8', sides: 8 },
    { label: 'd10 (10-sided)', value: 'd10', sides: 10 },
    { label: 'd12 (12-sided)', value: 'd12', sides: 12 },
    { label: 'd20 (20-sided)', value: 'd20', sides: 20 }
  ];

  const handleGenerate = () => {
    if (mode === 'numbers') {
      const minVal = parseFloat(min);
      const maxVal = parseFloat(max);
      const qty = parseInt(quantity);

      if (isNaN(minVal) || isNaN(maxVal) || isNaN(qty) || qty < 1 || qty > 100 || minVal >= maxVal) {
        return;
      }

      const nums = generateRandomNumbers(minVal, maxVal, qty, allowDuplicates, allowDecimals, parseInt(precision));
      setResults({ type: 'numbers', data: nums });
    } else if (mode === 'dice') {
      const diceQty = parseInt(diceQuantity);
      const selected = diceOptions.find((d) => d.value === diceType);

      if (isNaN(diceQty) || diceQty < 1 || diceQty > 100 || !selected) {
        return;
      }

      const rolls = rollDice(selected.sides, diceQty);
      const total = rolls.reduce((a, b) => a + b, 0);
      setResults({ type: 'dice', data: rolls, total, diceType: selected.label });
    } else if (mode === 'coin') {
      const flips = parseInt(coinFlips);

      if (isNaN(flips) || flips < 1 || flips > 100) {
        return;
      }

      const results = flipCoin(flips);
      const headsCount = results.filter((r) => r === 'Heads').length;
      setResults({ type: 'coin', data: results, headsCount, tailsCount: flips - headsCount });
    } else if (mode === 'color') {
      const colors = [];
      for (let i = 0; i < 10; i++) {
        colors.push(generateRandomColor());
      }
      setColorResults(colors);
    }
  };

  const handleReset = () => {
    setMin('1');
    setMax('100');
    setQuantity('10');
    setAllowDuplicates(true);
    setAllowDecimals(false);
    setPrecision('2');
    setDiceType('d6');
    setDiceQuantity('1');
    setCoinFlips('1');
    setResults(null);
    setColorResults([]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full bg-surface border border-border rounded-[var(--radius-card)] p-6">
      {/* Mode Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Generator Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'numbers', label: 'Numbers' },
            { id: 'dice', label: 'Dice' },
            { id: 'coin', label: 'Coin Flip' },
            { id: 'color', label: 'Color' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                handleReset();
              }}
              className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition-colors ${
                mode === m.id
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-gray-400'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Numbers Mode */}
      {mode === 'numbers' && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Minimum
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Maximum
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Quantity (1-100)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-text-primary">Allow Duplicates</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowDecimals}
                onChange={(e) => setAllowDecimals(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-text-primary">Allow Decimals</span>
            </label>
          </div>

          {allowDecimals && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Decimal Places
              </label>
              <input
                type="number"
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                min="1"
                max="6"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          )}
        </div>
      )}

      {/* Dice Mode */}
      {mode === 'dice' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Dice Type
            </label>
            <select
              value={diceType}
              onChange={(e) => setDiceType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            >
              {diceOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Number of Dice (1-100)
            </label>
            <input
              type="number"
              value={diceQuantity}
              onChange={(e) => setDiceQuantity(e.target.value)}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      {/* Coin Flip Mode */}
      {mode === 'coin' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Number of Flips (1-100)
          </label>
          <input
            type="number"
            value={coinFlips}
            onChange={(e) => setCoinFlips(e.target.value)}
            min="1"
            max="100"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-2 px-4 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700 transition-colors mb-6"
      >
        Generate
      </button>

      {/* Results */}
      {results && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
          {results.type === 'numbers' && (
            <div>
              <p className="text-text-secondary text-sm mb-3">Generated Numbers:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {results.data.map((num, idx) => (
                  <div
                    key={idx}
                    className="bg-accent/10 border border-accent/20 rounded-[var(--radius-input)] p-2 text-center cursor-pointer hover:bg-accent/20 transition-colors"
                    onClick={() => copyToClipboard(num.toString())}
                  >
                    <p className="font-mono-num text-text-primary font-semibold">
                      {num}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => copyToClipboard(results.data.join(', '))}
                className="w-full py-2 px-3 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-gray-50 transition-colors"
              >
                Copy All
              </button>
            </div>
          )}

          {results.type === 'dice' && (
            <div>
              <p className="text-text-secondary text-sm mb-3">{results.diceType}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {results.data.map((roll, idx) => (
                  <div
                    key={idx}
                    className="bg-accent/10 border border-accent/20 rounded-[var(--radius-input)] p-3 text-center"
                  >
                    <p className="font-mono-num text-text-primary font-semibold text-lg">
                      {roll}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-text-secondary text-sm mb-1">Total:</p>
                <p className="text-2xl font-bold text-accent font-mono-num">
                  {results.total}
                </p>
              </div>
            </div>
          )}

          {results.type === 'coin' && (
            <div>
              <p className="text-text-secondary text-sm mb-3">Coin Flips:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {results.data.map((flip, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-[var(--radius-input)] font-medium ${
                      flip === 'Heads'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {flip}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 border border-green-200 rounded-[var(--radius-input)] p-3 text-center">
                  <p className="text-text-secondary text-sm">Heads</p>
                  <p className="text-2xl font-bold text-green-700 font-mono-num">
                    {results.headsCount}
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-[var(--radius-input)] p-3 text-center">
                  <p className="text-text-secondary text-sm">Tails</p>
                  <p className="text-2xl font-bold text-red-700 font-mono-num">
                    {results.tailsCount}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Color Results */}
      {colorResults.length > 0 && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
          <p className="text-text-secondary text-sm mb-3">Generated Colors:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {colorResults.map((color, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(color)}
                className="cursor-pointer rounded-[var(--radius-input)] overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <div
                  className="h-16 w-full"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-center py-2 bg-white text-text-primary font-mono-num">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-gray-50 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
