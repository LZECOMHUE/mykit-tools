"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";

const PRESETS = [
  { label: "1-10", min: 1, max: 10 },
  { label: "1-100", min: 1, max: 100 },
  { label: "1-1000", min: 1, max: 1000 },
];

export default function RandomNumberPicker() {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [noRepeat, setNoRepeat] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [history, setHistory] = useState([]);

  const minInt = Math.min(
    parseInt(minValue) || 1,
    parseInt(maxValue) || 100
  );
  const maxInt = Math.max(
    parseInt(minValue) || 1,
    parseInt(maxValue) || 100
  );

  const availableNumbers = [];
  for (let i = minInt; i <= maxInt; i++) {
    if (!noRepeat || !usedNumbers.has(i)) {
      availableNumbers.push(i);
    }
  }

  const canPick = availableNumbers.length > 0;

  const pickNumber = async () => {
    if (!canPick) return;

    setIsSpinning(true);
    setDisplayNumber(null);

    // Spin animation - rapidly changing numbers
    const spinDuration = 2000;
    const spinInterval = 40;
    const spinCount = spinDuration / spinInterval;

    for (let i = 0; i < spinCount; i++) {
      const randomIdx = Math.floor(Math.random() * availableNumbers.length);
      setDisplayNumber(availableNumbers[randomIdx]);
      await new Promise((resolve) => setTimeout(resolve, spinInterval));
    }

    // Pick the final winner with deceleration
    const decelerationSteps = 8;
    const decelInterval = 100;

    for (let step = 0; step < decelerationSteps; step++) {
      const randomIdx = Math.floor(Math.random() * availableNumbers.length);
      setDisplayNumber(availableNumbers[randomIdx]);
      await new Promise((resolve) =>
        setTimeout(resolve, decelInterval + step * 50)
      );
    }

    // Pick final number
    const randomIdx = Math.floor(Math.random() * availableNumbers.length);
    const winner = availableNumbers[randomIdx];
    setSelectedNumber(winner);
    setDisplayNumber(winner);
    setHistory([...history, winner]);

    if (noRepeat) {
      const newUsed = new Set(usedNumbers);
      newUsed.add(winner);
      setUsedNumbers(newUsed);
    }

    setIsSpinning(false);
  };

  const setPreset = (preset) => {
    setMinValue(preset.min);
    setMaxValue(preset.max);
    setSelectedNumber(null);
    setDisplayNumber(null);
    setHistory([]);
    setUsedNumbers(new Set());
  };

  const reset = () => {
    setSelectedNumber(null);
    setDisplayNumber(null);
    setHistory([]);
    setUsedNumbers(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap justify-center">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            onClick={() => setPreset(preset)}
            variant={
              minValue === preset.min && maxValue === preset.max
                ? "primary"
                : "secondary"
            }
            size="sm"
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Configuration Panel */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum"
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
            <Input
              label="Maximum"
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <Toggle
              label="No Repeats"
              checked={noRepeat}
              onChange={setNoRepeat}
              helper={noRepeat ? `${availableNumbers.length} numbers left` : undefined}
            />
          </div>

          {canPick ? (
            <Button
              onClick={pickNumber}
              disabled={isSpinning}
              className="w-full"
              size="lg"
            >
              {isSpinning ? "🎲 Spinning..." : "🎲 Pick a Number"}
            </Button>
          ) : (
            <Button disabled className="w-full" size="lg">
              No Numbers Available
            </Button>
          )}
        </div>
      </Card>

      {/* HUGE Number Display */}
      {displayNumber !== null && (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-xl overflow-hidden shadow-2xl">
          <div className="relative p-8 sm:p-12 text-center">
            {/* Animated Background Elements */}
            {selectedNumber !== null && selectedNumber === displayNumber && (
              <>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 text-4xl animate-bounce">
                    ⭐
                  </div>
                  <div className="absolute top-8 right-6 text-4xl animate-bounce" style={{ animationDelay: "0.1s" }}>
                    ⭐
                  </div>
                  <div className="absolute bottom-6 left-8 text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>
                    ✨
                  </div>
                  <div className="absolute bottom-8 right-4 text-4xl animate-bounce" style={{ animationDelay: "0.15s" }}>
                    ✨
                  </div>
                </div>
              </>
            )}

            <div className="relative z-10">
              {selectedNumber === displayNumber && (
                <div className="mb-4">
                  <span className="inline-block bg-green-600 text-white rounded-full px-4 py-1 font-bold text-sm transform rotate-3">
                    🎉 WINNER 🎉
                  </span>
                </div>
              )}

              {/* THE BIG NUMBER */}
              <p
                className="font-mono text-7xl sm:text-8xl lg:text-9xl font-black text-white drop-shadow-2xl"
                style={{
                  animation: isSpinning ? "pulse 0.05s infinite" : "none",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {displayNumber}
              </p>

              {selectedNumber === displayNumber && (
                <p className="text-white text-lg opacity-95 font-bold uppercase tracking-widest mt-4">
                  ✨ Your Lucky Number ✨
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <Card className="bg-purple-50 border border-purple-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-text-muted uppercase font-semibold">
              Range
            </p>
            <p className="text-lg font-bold text-text-primary">
              {minInt}-{maxInt}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted uppercase font-semibold">
              Total Numbers
            </p>
            <p className="text-lg font-bold text-text-primary">
              {maxInt - minInt + 1}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted uppercase font-semibold">
              Picks
            </p>
            <p className="text-lg font-bold text-text-primary">
              {history.length}
            </p>
          </div>
        </div>
      </Card>

      {/* Pick History */}
      {history.length > 0 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-text-primary">
              📊 Pick History
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {history.map((num, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3 text-center font-mono font-bold ${
                    idx === history.length - 1
                      ? "bg-yellow-100 border-2 border-yellow-500 text-yellow-700"
                      : "bg-blue-50 border border-blue-200 text-blue-600"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {noRepeat && availableNumbers.length === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700 font-semibold">
                  All numbers have been picked!
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Actions */}
      {(selectedNumber !== null || history.length > 0) && (
        <div className="flex gap-3">
          <Button
            onClick={pickNumber}
            disabled={isSpinning || !canPick}
            className="flex-1"
            size="lg"
          >
            Pick Again
          </Button>
          <Button
            onClick={reset}
            variant="secondary"
            className="flex-1"
            size="lg"
          >
            Reset
          </Button>
        </div>
      )}

      {/* Instructions */}
      <Card className="bg-amber-50 border border-amber-200">
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-text-primary">
            📖 How to Use
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
            <li>Choose a range or set your own min and max</li>
            <li>Toggle "No Repeats" if you don't want duplicate numbers</li>
            <li>Click "Pick a Number" to generate a random selection</li>
            <li>Watch the animated number spinner</li>
            <li>Your picked number is displayed large and prominent</li>
            <li>View all previously picked numbers in the history</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
