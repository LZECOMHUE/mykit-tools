"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RandomNamePicker() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState([]);
  const [availableNames, setAvailableNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState([]);
  const [displayName, setDisplayName] = useState(null);

  const parseNames = (text) => {
    return text
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    const parsedNames = parseNames(text);
    setNames(parsedNames);
    setAvailableNames(parsedNames);
    setSelectedName(null);
    setDisplayName(null);
  };

  const pickName = async () => {
    if (availableNames.length === 0) return;

    setIsSpinning(true);
    setDisplayName(null);

    // Spin animation - flash through names quickly
    const spinDuration = 1500;
    const spinInterval = 50;
    const spinCount = spinDuration / spinInterval;

    for (let i = 0; i < spinCount; i++) {
      const randomIdx = Math.floor(Math.random() * availableNames.length);
      setDisplayName(availableNames[randomIdx]);
      await new Promise((resolve) => setTimeout(resolve, spinInterval));
    }

    // Pick the final winner
    const randomIdx = Math.floor(Math.random() * availableNames.length);
    const winner = availableNames[randomIdx];
    setSelectedName(winner);
    setDisplayName(winner);
    setHistory([...history, winner]);
    setIsSpinning(false);
  };

  const removePicked = () => {
    if (selectedName) {
      const newAvailable = availableNames.filter((name) => name !== selectedName);
      setAvailableNames(newAvailable);
      setSelectedName(null);
      setDisplayName(null);
    }
  };

  const reset = () => {
    setAvailableNames(names);
    setSelectedName(null);
    setDisplayName(null);
    setHistory([]);
  };

  const hasNames = names.length > 0;
  const hasAvailable = availableNames.length > 0;

  return (
    <div className="space-y-6">
      {/* Input Panel */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Enter Names (one per line)
            </label>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="John&#10;Sarah&#10;Mike&#10;Emma&#10;David"
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/10 min-h-[120px] text-sm font-mono"
            />
            <p className="text-xs text-text-muted mt-1">
              {hasNames ? `${names.length} names loaded` : "Paste or type names here"}
            </p>
          </div>

          {hasAvailable && selectedName === null && (
            <Button
              onClick={pickName}
              disabled={isSpinning || !hasAvailable}
              className="w-full"
              size="lg"
            >
              {isSpinning ? "Picking..." : "🎯 Pick a Random Name"}
            </Button>
          )}

          {selectedName && (
            <div className="flex gap-3">
              <Button
                onClick={pickName}
                disabled={isSpinning || !hasAvailable}
                className="flex-1"
                size="lg"
              >
                {isSpinning ? "Picking..." : "🎯 Pick Another"}
              </Button>
              <Button
                onClick={removePicked}
                variant="secondary"
                size="lg"
              >
                Remove
              </Button>
            </div>
          )}

          {hasNames && (
            <Button
              onClick={reset}
              variant="ghost"
              className="w-full"
            >
              Reset All
            </Button>
          )}
        </div>
      </Card>

      {/* Big Result Display */}
      {displayName && (
        <div
          className={`relative overflow-hidden rounded-lg ${
            selectedName === displayName
              ? "bg-gradient-to-br from-green-400 to-emerald-500"
              : "bg-gradient-to-br from-blue-300 to-blue-400"
          } p-8 sm:p-12 text-center shadow-lg`}
        >
          {/* Celebration elements */}
          {selectedName === displayName && (
            <>
              <div className="absolute top-4 left-4 text-3xl animate-bounce">
                🎉
              </div>
              <div className="absolute top-4 right-4 text-3xl animate-bounce" style={{ animationDelay: "0.1s" }}>
                🎉
              </div>
              <div className="absolute bottom-4 left-6 text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>
                🎊
              </div>
              <div className="absolute bottom-4 right-6 text-3xl animate-bounce" style={{ animationDelay: "0.1s" }}>
                🎊
              </div>
            </>
          )}

          <div className="relative z-10">
            {selectedName === displayName && (
              <div className="mb-4">
                <span className="inline-block bg-red-600 text-white rounded-full px-4 py-1 font-bold text-sm transform -rotate-2">
                  🏆 WINNER 🏆
                </span>
              </div>
            )}

            <p className="text-white text-sm opacity-90 font-semibold uppercase tracking-wider">
              Selected Name
            </p>

            <p
              className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black text-white drop-shadow-lg my-4 break-words"
              style={{
                animation: isSpinning ? "pulse 0.1s infinite" : "none",
              }}
            >
              {displayName}
            </p>

            {selectedName === displayName && (
              <p className="text-white text-sm opacity-90 font-semibold uppercase">
                ✨ Congratulations! ✨
              </p>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {hasNames && (
        <Card className="bg-blue-50 border border-blue-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-text-muted uppercase font-semibold">
                Total Names
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {names.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-text-muted uppercase font-semibold">
                Available
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {availableNames.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-text-muted uppercase font-semibold">
                Picked
              </p>
              <p className="text-2xl font-bold text-green-600">
                {history.length}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Pick History */}
      {history.length > 0 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-text-primary">
              📋 Pick History
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {history.map((name, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <span className="font-mono font-semibold text-text-primary">
                    {name}
                  </span>
                  <span className="text-xs bg-green-600 text-white rounded-full px-2 py-1 font-bold">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-amber-50 border border-amber-200">
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-text-primary">
            📖 How to Use
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
            <li>Paste or type a list of names (one per line)</li>
            <li>Click "Pick a Random Name" to select</li>
            <li>Watch the slot machine animation</li>
            <li>Click "Remove" to exclude from future picks</li>
            <li>View your pick history below</li>
            <li>Click "Reset All" to start over</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
