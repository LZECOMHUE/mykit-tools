"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

const DICE_TYPES = [
  { value: "d4", label: "d4 (4-sided)" },
  { value: "d6", label: "d6 (6-sided)" },
  { value: "d8", label: "d8 (8-sided)" },
  { value: "d10", label: "d10 (10-sided)" },
  { value: "d12", label: "d12 (12-sided)" },
  { value: "d20", label: "d20 (20-sided)" },
  { value: "d100", label: "d100 (100-sided)" },
];

export default function DiceRoller() {
  const [diceType, setDiceType] = useState("d6");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState([]);
  const [isRolling, setIsRolling] = useState(false);

  const getDiceMax = (type) => parseInt(type.slice(1));

  const rollDice = () => {
    setIsRolling(true);
    const max = getDiceMax(diceType);
    const newResults = [];

    for (let i = 0; i < Math.min(quantity, 10); i++) {
      newResults.push(Math.floor(Math.random() * max) + 1);
    }

    setResults(newResults);

    setTimeout(() => {
      setIsRolling(false);
    }, 600);
  };

  const total = results.reduce((a, b) => a + b, 0);
  const quantityNum = Math.min(Math.max(parseInt(quantity) || 1, 1), 10);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Dice Type"
              value={diceType}
              onChange={(e) => setDiceType(e.target.value)}
              options={DICE_TYPES}
            />
            <Input
              label="Quantity (1-10)"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <Button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full"
            size="lg"
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card hover className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Results
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center rounded-lg p-3 font-mono font-semibold text-white transition-transform ${
                    isRolling
                      ? "animate-pulse bg-accent"
                      : "bg-accent hover:scale-105"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-accent-muted border border-accent/20">
              <p className="text-sm text-text-secondary">Total Roll</p>
              <p className="font-mono text-3xl font-bold text-accent">
                {total}
              </p>
            </div>

            {quantityNum > 1 && (
              <div className="p-3 rounded-lg bg-surface">
                <p className="text-sm text-text-secondary">Average</p>
                <p className="font-mono text-lg font-semibold text-text-primary">
                  {(total / quantityNum).toFixed(1)}
                </p>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            onClick={rollDice}
            disabled={isRolling}
            className="w-full"
          >
            Roll Again
          </Button>
        </Card>
      )}
    </div>
  );
}
