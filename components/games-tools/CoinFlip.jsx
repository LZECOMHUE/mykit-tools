"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CoinFlip() {
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState([]);

  const flipCoin = () => {
    setIsFlipping(true);
    const flips = Math.min(Math.max(parseInt(quantity) || 1, 1), 10);
    const newResults = Array.from({ length: flips }, () =>
      Math.random() < 0.5 ? "heads" : "tails"
    );

    setResults(newResults);
    setHistory((prev) => [newResults, ...prev.slice(0, 9)]);

    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  const heads = results.filter((r) => r === "heads").length;
  const tails = results.filter((r) => r === "tails").length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="space-y-4">
          <Input
            label="Number of Coins (1-10)"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button
            onClick={flipCoin}
            disabled={isFlipping}
            className="w-full"
            size="lg"
          >
            {isFlipping ? "Flipping..." : "Flip Coin"}
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card hover className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Results
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center rounded-lg p-4 font-semibold text-white transition-transform ${
                  isFlipping
                    ? "animate-spin"
                    : result === "heads"
                      ? "bg-blue-500 hover:scale-105"
                      : "bg-rose-500 hover:scale-105"
                }`}
              >
                {result === "heads" ? "🪙 H" : "🪙 T"}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-text-secondary">Heads</p>
              <p className="font-mono text-2xl font-bold text-blue-600">
                {heads}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <p className="text-sm text-text-secondary">Tails</p>
              <p className="font-mono text-2xl font-bold text-rose-600">
                {tails}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={flipCoin}
            disabled={isFlipping}
            className="w-full"
          >
            Flip Again
          </Button>
        </Card>
      )}

      {history.length > 1 && (
        <Card>
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Flip History
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((flip, idx) => {
                const h = flip.filter((r) => r === "heads").length;
                const t = flip.filter((r) => r === "tails").length;
                return (
                  <div
                    key={idx}
                    className="p-2 rounded bg-surface text-sm text-text-secondary"
                  >
                    {`${h}H : ${t}T`}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
